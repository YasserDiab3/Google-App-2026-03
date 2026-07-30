const Clinic={state:{activeTab:"medications",activeVisitType:"employees",activeInjuryType:"employees",filters:{medications:{search:"",status:"all",dateFrom:"",dateTo:""},visits:{search:""},sickLeave:{search:"",department:"",dateFrom:"",dateTo:""},injuries:{search:"",status:"all",department:"",injuryType:"all",injuryBodyPart:"all",dateFrom:"",dateTo:""},attendance:{search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"}},currentInjuryAttachments:[],medicationAlertsNotified:new Set,initialized:!1},_clinicVisitsLoadPromise:null,_visitsBackendFetchOk:!1,_supplyRequestActionTimeoutMs:6e4,getUserDisplayName(e){if(!e)return"-";if(typeof e=="object"&&e!==null){if(e.name&&typeof e.name=="string"&&e.name.trim())return e.name.trim();if(e=e.email||e.id||"",!e)return"-"}const t=String(e).toLowerCase().trim();if(!t)return"-";if(t==="system"||t==="\u0627\u0644\u0646\u0638\u0627\u0645"||t==="admin")return"\u0627\u0644\u0646\u0638\u0627\u0645";if(AppState&&AppState.appData&&Array.isArray(AppState.appData.users)){const a=AppState.appData.users.find(i=>String(i.email||"").toLowerCase().trim()===t||String(i.id||"").toLowerCase().trim()===t||String(i.name||"").toLowerCase().trim()===t);if(a&&a.name)return a.name}return String(e)},processAttachmentUrl(e){if(!e||typeof e!="string")return null;let t=e.trim();const a=/https?:\/\/drive\.google\.com\/uc\?export=view&id=([a-zA-Z0-9_-]+)/,i=t.match(a);return i&&(t="https://lh3.googleusercontent.com/d/"+i[1]),t.startsWith("http://")||t.startsWith("https://")||t.startsWith("data:")?t:null},getCurrentLanguage(){try{return localStorage.getItem("language")||typeof AppState<"u"&&AppState?.currentLanguage||"ar"}catch{return"ar"}},applyModuleI18n(e){const t=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!t)return;const a=e||document.getElementById("clinic-section")||document;t.applyI18n(a),typeof t.applyLiteralTranslations=="function"&&t.applyLiteralTranslations(a)},getTranslations(){const e=this.getCurrentLanguage(),t=e==="ar",a={ar:{"table.employeeCode":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","table.contractorName":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","table.name":"\u0627\u0644\u0627\u0633\u0645","table.jobTitle":"\u0627\u0644\u0648\u0638\u064A\u0641\u0629","table.factory":"\u0627\u0644\u0645\u0635\u0646\u0639","table.workplace":"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644","table.entryTime":"\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644","table.exitTime":"\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C","table.totalTime":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A","table.reason":"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629","table.diagnosis":"\u0627\u0644\u062A\u0634\u062E\u064A\u0635","table.medications":"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","table.medicationType":"\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621","table.quantity":"\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","table.dispenseDate":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641","table.patientName":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636","table.department":"\u0627\u0644\u0625\u062F\u0627\u0631\u0629","table.medicationStatus":"\u062D\u0627\u0644\u0629 \u0627\u0644\u062F\u0648\u0627\u0621","table.notes":"\u0645\u0644\u0627\u062D\u0638\u0627\u062A","table.actions":"\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A","table.notRecorded":"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647","btn.registerVisit":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629","btn.refresh":"\u062A\u062D\u062F\u064A\u062B","btn.exportExcel":"\u062A\u0635\u062F\u064A\u0631 Excel","btn.exportPDF":"\u062A\u0635\u062F\u064A\u0631 PDF","btn.reset":"\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646","btn.view":"\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","btn.edit":"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629","tab.visits":"\u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629","tab.employees":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646","tab.contractors":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","tab.dispensedLog":"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","filter.search":"\u0627\u0644\u0628\u062D\u062B","filter.factory":"\u0627\u0644\u0645\u0635\u0646\u0639","filter.jobTitle":"\u0627\u0644\u0648\u0638\u064A\u0641\u0629","filter.workplace":"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644","filter.all":"\u0627\u0644\u0643\u0644","filter.searchPlaceholder":"\u0627\u0628\u062D\u062B \u0641\u064A \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...","empty.noResults":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0628\u062D\u062B\u0643.","empty.noEmployeeVisits":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0633\u062C\u0644\u0629.","empty.noContractorVisits":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0633\u062C\u0644\u0629.","time.lessThanMinute":"\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629","time.minutes":"\u062F\u0642\u064A\u0642\u0629","time.hours":"\u0633\u0627\u0639\u0629","time.days":"\u064A\u0648\u0645"},en:{"table.employeeCode":"Employee Code","table.contractorName":"Contractor Name","table.name":"Name","table.jobTitle":"Job Title","table.factory":"Factory","table.workplace":"Workplace","table.entryTime":"Entry Time","table.exitTime":"Exit Time","table.totalTime":"Total Time","table.reason":"Reason for Visit","table.diagnosis":"Diagnosis","table.medications":"Dispensed Medications","table.medicationType":"Medication Type","table.quantity":"Dispensed Quantity","table.dispenseDate":"Dispense Date","table.patientName":"Patient Name","table.department":"Department","table.medicationStatus":"Medication Status","table.notes":"Notes","table.actions":"Actions","table.notRecorded":"Not Recorded","btn.registerVisit":"Register Visit","btn.refresh":"Refresh","btn.exportExcel":"Export Excel","btn.exportPDF":"Export PDF","btn.reset":"Reset","btn.view":"View Details","btn.edit":"Edit Visit","tab.visits":"Clinic Attendance Record","tab.employees":"Employees","tab.contractors":"Contractors","tab.dispensedLog":"Dispensed Medications Log","filter.search":"Search","filter.factory":"Factory","filter.jobTitle":"Job Title","filter.workplace":"Workplace","filter.all":"All","filter.searchPlaceholder":"Search all data...","empty.noResults":"No results match your search.","empty.noEmployeeVisits":"No employee visits recorded.","empty.noContractorVisits":"No contractor visits recorded.","time.lessThanMinute":"Less than a minute","time.minutes":"minute","time.hours":"hour","time.days":"day"}};return{t:i=>a[e]?.[i]||i,isRTL:t,lang:e}},clinicAnalysisCharts:null,getClinicAnalysisStorageKeys(){return{cards:"clinic_infoCards",items:"clinic_analysisItems"}},getClinicDefaultAnalysisCards(){return[{id:"card_total_visits",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",icon:"fas fa-hospital-user",color:"blue",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629",enabled:!0,mode:"metric",metric:"totalVisits"},{id:"card_total_dispensed_qty",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641",icon:"fas fa-prescription-bottle-alt",color:"green",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0629 \u0645\u0646 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0639\u0628\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",enabled:!0,mode:"metric",metric:"totalDispensedQty"},{id:"card_expired_meds",title:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629",icon:"fas fa-exclamation-triangle",color:"red",description:"\u0639\u062F\u062F \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629",enabled:!0,mode:"metric",metric:"expiredMedications"},{id:"card_low_stock",title:"\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636",icon:"fas fa-box-open",color:"orange",description:"\u0639\u062F\u062F \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0630\u0627\u062A \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0646\u062E\u0641\u0636 (\u2264 10)",enabled:!0,mode:"metric",metric:"lowStockMedications"},{id:"card_visits_with_meds",title:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621",icon:"fas fa-capsules",color:"teal",description:"\u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0645 \u0641\u064A\u0647\u0627 \u0635\u0631\u0641 \u062F\u0648\u0627\u0621 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644",enabled:!1,mode:"metric",metric:"visitsWithMedications"},{id:"card_unique_dispensed",title:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",icon:"fas fa-pills",color:"purple",description:"\u0639\u062F\u062F \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0639\u0628\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",enabled:!1,mode:"metric",metric:"uniqueDispensedMedications"}]},getClinicDefaultAnalysisItems(){return[{id:"visits_by_reason",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",enabled:!0,dataset:"visits",field:"reason",chartType:"auto"},{id:"visits_by_personType",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A)",enabled:!0,dataset:"visits",field:"personType",chartType:"auto"},{id:"visits_by_factory",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0646\u0639",enabled:!1,dataset:"visits",field:"factoryName",chartType:"bar"},{id:"meds_by_status",label:"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!0,dataset:"medications",field:"status",chartType:"doughnut"},{id:"meds_by_type",label:"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",enabled:!1,dataset:"medications",field:"type",chartType:"bar"},{id:"disp_top_meds",label:"\u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0635\u0631\u0641\u0627\u064B (\u0645\u0631\u0627\u062A)",enabled:!0,dataset:"dispensedMedications",field:"medicationName",chartType:"bar"},{id:"disp_by_dept",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",enabled:!1,dataset:"dispensedMedications",field:"department",chartType:"bar"},{id:"disp_by_ptype",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635",enabled:!1,dataset:"dispensedMedications",field:"personType",chartType:"doughnut"},{id:"disp_by_reason",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",enabled:!1,dataset:"dispensedMedications",field:"visitReason",chartType:"bar"},{id:"injuries_by_type",label:"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",enabled:!1,dataset:"injuries",field:"injuryType",chartType:"bar"},{id:"sickleave_by_status",label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!1,dataset:"sickLeave",field:"status",chartType:"doughnut"},{id:"supply_by_status",label:"\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!1,dataset:"supplyRequests",field:"status",chartType:"doughnut"}]},async ensureChartJSLoaded(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"], script[src*="chartjs"]')?new Promise(t=>{const a=setInterval(()=>{typeof Chart<"u"&&(clearInterval(a),t(!0))},100);setTimeout(()=>{clearInterval(a),t(typeof Chart<"u")},5e3)}):new Promise(t=>{const a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",a.crossOrigin="anonymous";let i=!1;const n=s=>{i||(i=!0,t(!!s))};a.onload=()=>setTimeout(()=>n(typeof Chart<"u"),400),a.onerror=()=>{const s=document.createElement("script");s.type="text/javascript",s.async=!0,s.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js",s.crossOrigin="anonymous",s.onload=()=>setTimeout(()=>n(typeof Chart<"u"),400),s.onerror=()=>n(!1),document.head.appendChild(s)},setTimeout(()=>n(typeof Chart<"u"),8e3);try{document.head.appendChild(a)}catch{n(!1)}})},injectTableScrollbarStyles(){const e="clinic-table-scrollbar-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
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
                background: linear-gradient(135deg, #134e4a 0%, #0d9488 100%);
                box-shadow: 0 6px 20px rgba(13, 148, 136, 0.35);
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .clinic-attendance-quick-nav-toggle:hover {
                transform: translateY(-1px);
                box-shadow: 0 8px 24px rgba(13, 148, 136, 0.42);
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
                border: 1px solid #ccfbf1;
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
                background: #0d9488;
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
                background: #f0fdfa;
                color: #0f766e;
                outline: none;
            }
            .clinic-attendance-quick-nav-item i {
                color: #0d9488;
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
        `,document.head.appendChild(t)},setupTableScrollListeners(e){if(!e)return;const t=()=>{const a=e.scrollTop,i=e.scrollLeft,n=e.scrollHeight,s=e.scrollWidth,o=e.clientHeight,l=e.clientWidth;a===0?e.classList.add("scrolled-top"):e.classList.remove("scrolled-top"),a+o>=n-1?e.classList.add("scrolled-bottom"):e.classList.remove("scrolled-bottom"),i===0?e.classList.add("scrolled-left"):e.classList.remove("scrolled-left"),i+l>=s-1?e.classList.add("scrolled-right"):e.classList.remove("scrolled-right")};e.addEventListener("scroll",t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>{t()}).observe(e),t()},_clinicAttendanceScrollTable(e,t){return`<div class="table-wrapper clinic-table-wrapper clinic-attendance-scroll-table" style="overflow-x:auto;overflow-y:auto;max-height:${t||"42vh"};">${e}</div>`},renderAttendanceQuickNav(e){return!Array.isArray(e)||!e.length?"":`<div class="clinic-attendance-quick-nav" id="clinic-attendance-quick-nav">
            <button type="button" class="clinic-attendance-quick-nav-toggle" id="clinic-attendance-quick-nav-toggle" aria-expanded="false" title="\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0627\u0644\u062A\u0645\u0631\u064A\u0631">
                <span><i class="fas fa-list-ul ml-2"></i>\u0627\u0644\u0623\u0642\u0633\u0627\u0645</span>
                <i class="fas fa-chevron-up clinic-attendance-quick-nav-chevron"></i>
            </button>
            <div class="clinic-attendance-quick-nav-panel" id="clinic-attendance-quick-nav-panel" hidden>${e.map(a=>`
            <button type="button" class="clinic-attendance-quick-nav-item" data-target="${Utils.escapeAttr(a.id)}">
                <i class="fas ${Utils.escapeAttr(a.icon||"fa-circle")} ml-2"></i>${Utils.escapeHTML(a.label||"")}
            </button>
        `).join("")}</div>
        </div>`},bindAttendanceQuickNav(e){const t=e?.querySelector("#clinic-attendance-quick-nav");if(!t)return;const a=t.querySelector("#clinic-attendance-quick-nav-toggle"),i=t.querySelector("#clinic-attendance-quick-nav-panel"),n=()=>{t.classList.remove("open"),a&&a.setAttribute("aria-expanded","false"),i&&(i.hidden=!0)},s=()=>{t.classList.add("open"),a&&a.setAttribute("aria-expanded","true"),i&&(i.hidden=!1)};a?.addEventListener("click",o=>{o.stopPropagation(),t.classList.contains("open")?n():s()}),t.querySelectorAll(".clinic-attendance-quick-nav-item").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.target,r=l?document.getElementById(l):null;r&&(r.scrollIntoView({behavior:"smooth",block:"start"}),r.style.transition="box-shadow 0.3s",r.style.boxShadow="0 0 0 3px rgba(13,148,136,0.35)",setTimeout(()=>{r.style.boxShadow=""},1200)),n()})}),this._attendanceQuickNavDocListener||(this._attendanceQuickNavDocListener=o=>{const l=document.querySelector("#clinic-attendance-quick-nav.open");if(l&&!l.contains(o.target)){l.classList.remove("open");const r=l.querySelector("#clinic-attendance-quick-nav-toggle"),c=l.querySelector("#clinic-attendance-quick-nav-panel");r&&r.setAttribute("aria-expanded","false"),c&&(c.hidden=!0)}},document.addEventListener("click",this._attendanceQuickNavDocListener)),this._syncAttendanceQuickNavVisibility()},_syncAttendanceQuickNavVisibility(){const e=this.state?.activeTab==="attendance"&&this.canAccessAttendanceTab();document.querySelectorAll("#clinic-attendance-quick-nav").forEach(t=>{t.style.display=e?"":"none"})},initAttendanceTableScroll(e){this.injectTableScrollbarStyles(),e?.querySelectorAll(".clinic-table-wrapper").forEach(t=>this.setupTableScrollListeners(t))},loadClinicDataAnalysis(){if(!this.isCurrentUserAdmin())return;this.loadClinicInfoCards();const e=this.getClinicAnalysisStorageKeys(),t=localStorage.getItem(e.items)||"[]";let a=[];try{a=JSON.parse(t)||[]}catch{a=[]}(!Array.isArray(a)||a.length===0)&&(localStorage.setItem(e.items,JSON.stringify(this.getClinicDefaultAnalysisItems())),a=this.getClinicDefaultAnalysisItems());const i=document.getElementById("clinic-analysis-items-list");i&&(i.innerHTML=a.map(p=>`
                <div class="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                    <label class="flex items-center cursor-pointer flex-1">
                        <input type="checkbox" class="clinic-analysis-item-checkbox mr-2" data-item-id="${p.id}" ${p.enabled?"checked":""}>
                        <span>${Utils.escapeHTML(p.label||p.id)}</span>
                    </label>
                    <button class="btn-icon btn-icon-danger ml-2" onclick="Clinic.removeClinicAnalysisItem('${p.id}')" title="\u062D\u0630\u0641">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join(""),i.querySelectorAll(".clinic-analysis-item-checkbox").forEach(p=>{p.addEventListener("change",f=>{const u=f.target.getAttribute("data-item-id");this.toggleClinicAnalysisItem(u,f.target.checked)})}));const n=document.getElementById("clinic-manage-cards-btn");n&&(n.onclick=()=>this.showManageClinicCardsModal());const s=document.getElementById("clinic-add-analysis-item-btn");s&&(s.onclick=()=>this.addClinicAnalysisItemFromUI());const o=document.getElementById("clinic-new-analysis-dataset"),l=document.getElementById("clinic-new-analysis-field"),r=document.getElementById("clinic-custom-field-wrap"),c=document.getElementById("clinic-new-analysis-custom-field"),d=()=>{if(!l||!o)return;const p=o.value,u=this.getClinicAnalysisFieldsMap()[p]||[];l.innerHTML=u.map(m=>`<option value="${m.value}">${Utils.escapeHTML(m.label)}</option>`).join("")+'<option value="__custom__">\u062D\u0642\u0644 \u0645\u062E\u0635\u0635...</option>',r&&(r.style.display="none"),c&&(c.value="")};o&&(o.onchange=()=>d()),l&&(l.onchange=()=>{const p=l.value==="__custom__";r&&(r.style.display=p?"block":"none"),!p&&c&&(c.value="")}),o&&l&&l.options.length===0&&d(),this.updateClinicAnalysisResults()},getClinicAnalysisFieldsMap(){return{visits:[{value:"reason",label:"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"},{value:"diagnosis",label:"\u0627\u0644\u062A\u0634\u062E\u064A\u0635"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A)"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"employeePosition",label:"\u0627\u0644\u0648\u0638\u064A\u0641\u0629"},{value:"factoryName",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{value:"workplace",label:"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],medications:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"type",label:"\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621"},{value:"location",label:"\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u062E\u0632\u064A\u0646"}],sickLeave:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],injuries:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"injuryType",label:"\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629"},{value:"injuryLocation",label:"\u0645\u0648\u0642\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],supplyRequests:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"type",label:"\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628"},{value:"priority",label:"\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],dispensedMedications:[{value:"medicationName",label:"\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621"},{value:"department",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{value:"personType",label:"\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635"},{value:"visitReason",label:"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"},{value:"unit",label:"\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}]}},getClinicDatasetForAnalysis(e){switch(this.ensureData(),e){case"visits":return this.getActualClinicVisits_(AppState.appData.clinicVisits);case"medications":return(Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:[]).map(t=>this.normalizeMedicationRecord(t));case"sickLeave":return Array.isArray(AppState.appData.sickLeave)?AppState.appData.sickLeave:[];case"injuries":return Array.isArray(AppState.appData.injuries)?AppState.appData.injuries:[];case"supplyRequests":return Array.isArray(AppState.appData.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[];case"dispensedMedications":return this.getDispensedMedicationsDataset_(this.getClinicVisitsForAnalysis_());default:return[]}},isTestClinicVisit_(e){if(!e||typeof e!="object")return!1;const t=i=>String(e[i]||"").trim().toLowerCase(),a=t("factoryName")||t("factory");return t("id").startsWith("test-")||t("employeeCode")==="test001"||t("email")==="test@example.com"||t("userId")==="test-user-id"||a==="\u0645\u0635\u0646\u0639 \u0627\u062E\u062A\u0628\u0627\u0631"},getActualClinicVisits_(e){return(Array.isArray(e)?e:[]).filter(t=>!this.isTestClinicVisit_(t))},getClinicVisitsForAnalysis_(){const e=Array.isArray(AppState.appData.clinicVisits)?AppState.appData.clinicVisits:[],t=Array.isArray(AppState.appData.employeeVisits)?AppState.appData.employeeVisits:[],a=Array.isArray(AppState.appData.contractorVisits)?AppState.appData.contractorVisits:[],i=new Set,n=[];return[...e,...t,...a].forEach(s=>{if(!s||this.isTestClinicVisit_(s))return;const o=String(s.id||"").trim();o&&i.has(o)||(o&&i.add(o),n.push(s))}),n},getVisitMedicationsForAnalysis_(e){if(!e)return[];let t=[];if(e.medications&&(t=this.normalizeVisitMedications(e.medications)),(!t||t.length===0)&&e.medicationsDispensed){const a=this.normalizeVisitMedications(e.medicationsDispensed);a&&a.length>0&&(t=a)}if((!t||t.length===0)&&e.medicationsDispensedQty&&e.medicationsDispensedQty>0){const a=parseInt(e.medicationsDispensedQty,10)||0;a>0&&(t=[{medicationName:e.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:a,unit:"\u0648\u062D\u062F\u0629",notes:""}])}return Array.isArray(t)?t:[]},buildMedicationInventoryLookup_(){const e=Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:Array.isArray(AppState.appData.clinicInventory)?AppState.appData.clinicInventory:[],t={};return e.forEach(a=>{const i=this.normalizeMedicationRecord(a),n=String(i.name||i.medicationName||"").trim().toLowerCase();n&&!t[n]&&(t[n]=i)}),t},getDispensedMedicationsDataset_(e){const t=[];return(e||[]).forEach(a=>{const i=this.getVisitMedicationsForAnalysis_(a);if(!i.length)return;const n=String(a.employeeDepartment||a.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",s=String(a.personType||"").toLowerCase(),o=s==="contractor"||s==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",l=String(a.reason||a.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",r=a.visitDate||a.createdAt||"";i.forEach(c=>{t.push({medicationName:c.medicationName,quantity:parseInt(c.quantity,10)||1,unit:c.unit||"\u0648\u062D\u062F\u0629",personType:o,department:n,visitReason:l,visitDate:r,visitId:a.id||""})})}),t},analyzeDispensedMedications_(e,t){const a=this.buildMedicationInventoryLookup_(),i={};let n=0,s=0;const o=new Set,l={},r={\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},c={};(e||[]).forEach(g=>{const y=this.getVisitMedicationsForAnalysis_(g);if(!y.length)return;const v=String(g.id||"").trim()||JSON.stringify([g.visitDate,g.employeeName,g.contractorWorkerName]);o.add(v);const h=String(g.employeeDepartment||g.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",w=String(g.personType||"").toLowerCase(),D=w==="contractor"||w==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",L=new Date(g.visitDate||g.createdAt||""),b=isNaN(L.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${L.getFullYear()}-${String(L.getMonth()+1).padStart(2,"0")}`;y.forEach(A=>{const E=String(A.medicationName||"").trim();if(!E)return;const R=parseInt(A.quantity,10)||1,q=E.toLowerCase(),U=a[q]||null;i[q]||(i[q]={name:E,totalQty:0,dispenseCount:0,visits:new Set,type:U?.type||U?.medicationType||"\u2014",stockRemaining:U?.remainingQuantity??null,stockStatus:U?.status||"\u2014"}),i[q].totalQty+=R,i[q].dispenseCount+=1,i[q].visits.add(v),n+=R,s+=1,l[b]=(l[b]||0)+R,r[D]=(r[D]||0)+R,c[h]=(c[h]||0)+R})});const d=Object.values(i).map(g=>({name:g.name,totalQty:g.totalQty,dispenseCount:g.dispenseCount,visitsCount:g.visits.size,avgQty:g.dispenseCount>0?(g.totalQty/g.dispenseCount).toFixed(1):"0",type:g.type,stockRemaining:g.stockRemaining,stockStatus:g.stockStatus})).sort((g,y)=>y.totalQty-g.totalQty),p=[...d].sort((g,y)=>y.dispenseCount-g.dispenseCount),f=Object.entries(l).filter(([g])=>g!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").sort((g,y)=>g[0].localeCompare(y[0])).slice(-12),u=Object.entries(c).sort((g,y)=>y[1]-g[1]).slice(0,8),m=d.slice(0,10).filter(g=>g.stockRemaining!==null&&g.stockRemaining<=10).map(g=>({...g}));return{totalDispensedQty:n,dispenseLines:s,uniqueMedicines:d.length,visitsWithMedications:o.size,visitsWithoutMedications:Math.max(0,(e||[]).length-o.size),topByQuantity:d,topByFrequency:p,byMonth:{labels:f.map(g=>g[0]),data:f.map(g=>g[1])},byPersonType:r,byDepartment:{labels:u.map(g=>g[0]),data:u.map(g=>g[1])},lowStockHighDemand:m}},getClinicAnalysisValue(e,t,a){if(!a||typeof a!="object")return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(t==="byMonth"){const s=e==="visits"||e==="dispensedMedications"?a.visitDate||a.createdAt:e==="sickLeave"?a.startDate||a.createdAt:e==="injuries"?a.injuryDate||a.createdAt:e==="supplyRequests"?a.createdAt||a.requestDate:a.createdAt||"";if(!s)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const o=new Date(s);return isNaN(o.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}`}if(t==="personType"){const s=(a.personType||"").toString().toLowerCase();return s==="contractor"?"\u0645\u0642\u0627\u0648\u0644":s==="external"?"\u062E\u0627\u0631\u062C\u064A":s==="employee"||s===""?"\u0645\u0648\u0638\u0641":s.includes("\u0645\u0642\u0627\u0648\u0644")?"\u0645\u0642\u0627\u0648\u0644":s.includes("\u062E\u0627\u0631")?"\u062E\u0627\u0631\u062C\u064A":s.includes("\u0645\u0648\u0638")?"\u0645\u0648\u0638\u0641":a.personType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}if(e==="visits"&&t==="workplace")return a.employeeLocation||a.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const i=a[t],n=i==null||i===""?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":String(i).trim();return n&&n!=="null"&&n!=="undefined"?n:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},analyzeClinicByItem(e){const t=e.dataset,a=e.field,i=this.getClinicDatasetForAnalysis(t),n={};let s=0;return i.forEach(o=>{const l=this.getClinicAnalysisValue(t,a,o);n[l]=(n[l]||0)+1,s++}),Object.entries(n).map(([o,l])=>({label:o,count:l,percentage:s>0?(l/s*100).toFixed(1):"0.0"})).sort((o,l)=>l.count-o.count)},async updateClinicAnalysisResults(){const e=document.getElementById("clinic-analysis-results");if(!e)return;const t=this.getClinicAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(t.items)||"[]")||[]}catch{a=[]}const i=(Array.isArray(a)?a:[]).filter(s=>s.enabled);if(i.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0646\u0648\u062F \u0645\u0641\u0639\u0644\u0629 \u0644\u0644\u062A\u062D\u0644\u064A\u0644.</p>
                </div>
            `;return}this.calculateClinicCardValues();let n='<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">';i.forEach((s,o)=>{const l=this.analyzeClinicByItem(s),r=`clinic-chart-${s.id}-${o}`,c=`clinic-chart-container-${s.id}-${o}`;n+=`
                <div class="content-card">
                    <div class="card-header">
                        <h4 class="font-semibold text-lg">
                            <i class="fas fa-chart-bar ml-2"></i>
                            ${Utils.escapeHTML(s.label||s.id)}
                        </h4>
                        <p class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(s.dataset)} \u2022 ${Utils.escapeHTML(s.field)}</p>
                    </div>
                    <div class="card-body">
                        <div id="${c}" style="position: relative; height: 300px; margin-bottom: 20px;">
                            <canvas id="${r}"></canvas>
                        </div>
                        <div class="border-t pt-4">
                            <h5 class="font-semibold mb-3 text-sm text-gray-700">\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:</h5>
                            <div class="space-y-2">
                                ${l.slice(0,20).map(d=>`
                                    <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                        <span class="text-sm">${Utils.escapeHTML(d.label)}</span>
                                        <div class="flex items-center gap-3">
                                            <span class="font-semibold">${d.count}</span>
                                            <span class="text-xs text-gray-500">(${d.percentage}%)</span>
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    </div>
                </div>
            `}),n+="</div>",e.innerHTML=n,setTimeout(async()=>{if(await this.ensureChartJSLoaded()&&typeof Chart<"u")this.renderClinicAnalysisCharts(i);else{const o=document.createElement("div");o.className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4",o.innerHTML=`
                    <div class="flex items-center gap-2">
                        <i class="fas fa-exclamation-triangle text-yellow-600"></i>
                        <p class="text-sm text-yellow-800">
                            <strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u062D\u0627\u0644\u064A\u0627\u064B. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0623\u062F\u0646\u0627\u0647.
                        </p>
                    </div>
                `,e.prepend(o)}},250)},renderClinicAnalysisCharts(e){if(typeof Chart>"u")return;this.clinicAnalysisCharts&&Object.values(this.clinicAnalysisCharts).forEach(a=>{a&&typeof a.destroy=="function"&&a.destroy()}),this.clinicAnalysisCharts={};const t=["rgba(59, 130, 246, 0.8)","rgba(16, 185, 129, 0.8)","rgba(245, 158, 11, 0.8)","rgba(239, 68, 68, 0.8)","rgba(139, 92, 246, 0.8)","rgba(236, 72, 153, 0.8)","rgba(20, 184, 166, 0.8)","rgba(251, 146, 60, 0.8)"];e.forEach((a,i)=>{const n=`clinic-chart-${a.id}-${i}`,s=document.getElementById(n);if(!s)return;const o=this.analyzeClinicByItem(a),l=o.slice(0,12).map(p=>p.label),r=o.slice(0,12).map(p=>p.count),c=l.map((p,f)=>t[f%t.length]),d=a.chartType==="auto"?l.length>6?"bar":"doughnut":a.chartType||"bar";try{const p=new Chart(s,{type:d,data:{labels:l,datasets:[{label:a.label||a.id,data:r,backgroundColor:c,borderColor:c.map(f=>f.replace("0.8","1")),borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{padding:12,usePointStyle:!0}},tooltip:{callbacks:{label:function(f){const u=f.label||"",m=f.parsed||0,g=f.dataset.data.reduce((v,h)=>v+h,0),y=g>0?(m/g*100).toFixed(1):0;return`${u}: ${m} (${y}%)`}}}},...d==="bar"?{scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}:{}}});this.clinicAnalysisCharts[n]=p}catch{}})},loadClinicInfoCards(){const e=document.getElementById("clinic-info-cards-container");if(!e)return;const t=this.getClinicAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(t.cards)||"[]")||[]}catch{a=[]}(!Array.isArray(a)||a.length===0)&&(localStorage.setItem(t.cards,JSON.stringify(this.getClinicDefaultAnalysisCards())),a=this.getClinicDefaultAnalysisCards());const i=a.filter(s=>s.enabled);if(i.length===0){e.innerHTML='<p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0643\u0631\u0648\u062A \u0645\u0641\u0639\u0644\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 \u0632\u0631 "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0643\u0631\u0648\u062A" \u0644\u0625\u0636\u0627\u0641\u0629 \u0643\u0631\u0648\u062A \u062C\u062F\u064A\u062F\u0629.</p>';return}const n={blue:"bg-blue-50 border-blue-200 text-blue-800",green:"bg-green-50 border-green-200 text-green-800",red:"bg-red-50 border-red-200 text-red-800",orange:"bg-orange-50 border-orange-200 text-orange-800",purple:"bg-purple-50 border-purple-200 text-purple-800",yellow:"bg-yellow-50 border-yellow-200 text-yellow-800"};e.innerHTML=i.map(s=>{const o=n[s.color]||n.blue,l=s.color||"blue";return`
                <div class="content-card border-2 ${o}">
                    <div class="flex items-start justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <i class="${s.icon||"fas fa-info-circle"} text-${l}-600 text-xl"></i>
                            <h4 class="font-semibold">${Utils.escapeHTML(s.title||"")}</h4>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">${Utils.escapeHTML(s.description||"")}</p>
                    <div class="mt-3 pt-3 border-t border-gray-200">
                        <div id="clinic-card-value-${s.id}" class="text-2xl font-bold text-${l}-700">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                </div>
            `}).join(""),this.calculateClinicCardValues()},calculateClinicCardValues(){const e=this.getClinicAnalysisStorageKeys();let t=[];try{t=JSON.parse(localStorage.getItem(e.cards)||"[]")||[]}catch{t=[]}const a=(Array.isArray(t)?t:[]).filter(u=>u.enabled),i=this.getClinicVisitsForAnalysis_(),n=i.length,s=i.reduce((u,m)=>{const g=this.getVisitMedicationsForAnalysis_(m);return u+g.reduce((y,v)=>y+(parseInt(v.quantity,10)||0),0)},0),o=i.filter(u=>this.getVisitMedicationsForAnalysis_(u).length>0).length,l=new Set(i.flatMap(u=>this.getVisitMedicationsForAnalysis_(u).map(m=>String(m.medicationName||"").trim().toLowerCase()).filter(Boolean))).size,r=Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:Array.isArray(AppState.appData.clinicInventory)?AppState.appData.clinicInventory:[],c=r.filter(u=>(u.status||"")==="\u0645\u0646\u062A\u0647\u064A").length,d=r.filter(u=>(u.remainingQuantity??0)<=10&&(u.remainingQuantity??0)>0).length,p=r.length,f={totalVisits:n,totalDispensedQty:s,expiredMedications:c,lowStockMedications:d,totalMedications:p,visitsWithMedications:o,uniqueDispensedMedications:l};a.forEach(u=>{const m=document.getElementById(`clinic-card-value-${u.id}`);if(!m)return;let g=0;if(u.mode==="metric"&&u.metric)g=f[u.metric]??0;else if(u.mode==="countByField"){const y=u.dataset||"visits",v=u.field||"",h=(u.fieldValue||"").toString().trim();g=this.getClinicDatasetForAnalysis(y).filter(D=>{const L=this.getClinicAnalysisValue(y,v,D);if(!h)return L&&L!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const b=String(L||"").toLowerCase().trim(),A=String(h||"").toLowerCase().trim();if(b===A)return!0;if(v==="personType"){if(A==="employee"||A==="\u0645\u0648\u0638\u0641")return b==="\u0645\u0648\u0638\u0641";if(A==="contractor"||A==="\u0645\u0642\u0627\u0648\u0644"||A==="external")return b==="\u0645\u0642\u0627\u0648\u0644"}return b===A}).length}m.textContent=Number(g||0).toLocaleString("en-US")})},showManageClinicCardsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629");return}const e=this.getClinicAnalysisStorageKeys();let t=[];try{t=JSON.parse(localStorage.getItem(e.cards)||"[]")||[]}catch{t=[]}(!Array.isArray(t)||t.length===0)&&(t=this.getClinicDefaultAnalysisCards());const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
        `,document.body.appendChild(a);const i=()=>a.remove();a.querySelector(".modal-close")?.addEventListener("click",i),a.querySelector('[data-action="close"]')?.addEventListener("click",i),a.addEventListener("click",o=>{o.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&i()});const n=a.querySelector("#clinic-cards-list-container"),s=()=>{const o={id:`card_${Date.now()}`,title:"\u0643\u0631\u062A \u062C\u062F\u064A\u062F",icon:"fas fa-info-circle",color:"blue",description:"",enabled:!0,mode:"metric",metric:"totalVisits"},l=document.createElement("div");l.innerHTML=this.renderClinicCardEditForm(o,n?.children?.length||0),n?.appendChild(l.firstElementChild),this.bindClinicCardEditEvents(a)};a.querySelector("#clinic-add-new-card-btn")?.addEventListener("click",s),a.querySelector("#clinic-save-cards-btn")?.addEventListener("click",()=>{const o=a.querySelectorAll(".clinic-card-edit-form"),l=[];o.forEach(r=>{const c=r.getAttribute("data-card-id"),d=r.querySelector('[name="enabled"]')?.checked,p=r.querySelector('[name="title"]')?.value||"",f=r.querySelector('[name="description"]')?.value||"",u=r.querySelector('[name="icon"]')?.value||"fas fa-info-circle",m=r.querySelector('[name="color"]')?.value||"blue",g=r.querySelector('[name="mode"]')?.value||"metric",y=r.querySelector('[name="metric"]')?.value||"totalVisits",v=r.querySelector('[name="dataset"]')?.value||"visits",h=r.querySelector('[name="field"]')?.value||"",w=r.querySelector('[name="fieldValue"]')?.value||"";l.push({id:c,enabled:d,title:p,description:f,icon:u,color:m,mode:g,metric:y,dataset:v,field:h,fieldValue:w})}),localStorage.setItem(e.cards,JSON.stringify(l)),i(),this.loadClinicInfoCards(),this.calculateClinicCardValues(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0643\u0631\u0648\u062A \u0628\u0646\u062C\u0627\u062D")}),this.bindClinicCardEditEvents(a)},renderClinicCardEditForm(e,t){const a=s=>Utils.escapeHTML(s||""),i=[{value:"totalVisits",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A"},{value:"totalDispensedQty",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641"},{value:"totalMedications",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062F\u0648\u064A\u0629"},{value:"expiredMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629"},{value:"lowStockMedications",label:"\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636 (\u226410)"},{value:"visitsWithMedications",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621"},{value:"uniqueDispensedMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629 \u0645\u0646\u0635\u0631\u0641\u0629"}],n=[{value:"visits",label:"\u0632\u064A\u0627\u0631\u0627\u062A"},{value:"medications",label:"\u0623\u062F\u0648\u064A\u0629 (\u0645\u062E\u0632\u0648\u0646)"},{value:"dispensedMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 (\u0645\u0646 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A)"},{value:"sickLeave",label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629"},{value:"injuries",label:"\u0625\u0635\u0627\u0628\u0627\u062A"},{value:"supplyRequests",label:"\u0637\u0644\u0628\u0627\u062A \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A"}];return`
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
                            ${["blue","green","red","orange","purple","yellow"].map(s=>`<option value="${s}" ${e.color===s?"selected":""}>${s}</option>`).join("")}
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
                            ${i.map(s=>`<option value="${s.value}" ${e.metric===s.value?"selected":""}>${a(s.label)}</option>`).join("")}
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 clinic-card-field-wrap" style="display:${e.mode==="countByField"?"grid":"none"}">
                    <div>
                        <label for="clinic-card-${a(e.id)}-dataset" class="block text-sm font-medium mb-2">\u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</label>
                        <select id="clinic-card-${a(e.id)}-dataset" name="dataset" class="form-input">
                            ${n.map(s=>`<option value="${s.value}" ${e.dataset===s.value?"selected":""}>${a(s.label)}</option>`).join("")}
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
        `},bindClinicCardEditEvents(e){e.querySelectorAll(".clinic-remove-card-btn").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-card-id");confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0643\u0631\u062A\u061F")&&e.querySelector(`.clinic-card-edit-form[data-card-id="${a}"]`)?.remove()})}),e.querySelectorAll(".clinic-card-mode").forEach(t=>{t.addEventListener("change",()=>{const a=t.closest(".clinic-card-edit-form");if(!a)return;const i=a.querySelector(".clinic-card-metric-wrap"),n=a.querySelector(".clinic-card-field-wrap"),s=t.value;i&&(i.style.display=s==="metric"?"grid":"none"),n&&(n.style.display=s==="countByField"?"grid":"none")})})},addClinicAnalysisItemFromUI(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const e=document.getElementById("clinic-new-analysis-dataset"),t=document.getElementById("clinic-new-analysis-field"),a=document.getElementById("clinic-new-analysis-custom-field"),i=document.getElementById("clinic-new-analysis-label"),n=document.getElementById("clinic-new-analysis-charttype"),s=e?.value||"visits";let o=t?.value||"";o==="__custom__"&&(o=(a?.value||"").trim());const l=(i?.value||"").trim(),r=n?.value||"auto";if(!o){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631/\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062D\u0642\u0644");return}if(!l){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F");return}const c=this.getClinicAnalysisStorageKeys();let d=[];try{d=JSON.parse(localStorage.getItem(c.items)||"[]")||[]}catch{d=[]}Array.isArray(d)||(d=[]);const p={id:`custom_${Date.now()}`,label:l,enabled:!0,dataset:s,field:o,chartType:r};d.push(p),localStorage.setItem(c.items,JSON.stringify(d)),i&&(i.value=""),a&&(a.value=""),Notification?.success?.("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D"),this.loadClinicDataAnalysis()},toggleClinicAnalysisItem(e,t){if(!this.isCurrentUserAdmin())return;const a=this.getClinicAnalysisStorageKeys();let i=[];try{i=JSON.parse(localStorage.getItem(a.items)||"[]")||[]}catch{i=[]}const n=(Array.isArray(i)?i:[]).find(s=>s.id===e);n&&(n.enabled=t,localStorage.setItem(a.items,JSON.stringify(i)),this.updateClinicAnalysisResults())},removeClinicAnalysisItem(e){if(!this.isCurrentUserAdmin()||!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0646\u062F\u061F"))return;const t=this.getClinicAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(t.items)||"[]")||[]}catch{a=[]}const i=(Array.isArray(a)?a:[]).filter(n=>n.id!==e);localStorage.setItem(t.items,JSON.stringify(i)),this.loadClinicDataAnalysis(),Notification?.success?.("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")},calculateMedicationStatus(e){const t=new Date;t.setHours(0,0,0,0);let a=null;e.expiryDate&&(a=new Date(e.expiryDate),Number.isNaN(a.getTime())&&(a=new Date(e.expiryDate)),a.setHours(0,0,0,0));const n=parseFloat(e.remainingQuantity??e.quantity??0)>0;let s="\u0633\u0627\u0631\u064A",o=null;if(a&&!Number.isNaN(a.getTime())){const l=a.getTime()-t.getTime();o=Math.ceil(l/864e5),o<0?s="\u0645\u0646\u062A\u0647\u064A":o<=30&&(s=n?"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"\u0633\u0627\u0631\u064A")}return{status:s,daysRemaining:o}},getMedicationStatusClasses(e){return e==="\u0645\u0646\u062A\u0647\u064A"?"bg-red-100 text-red-700":e==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"bg-yellow-100 text-yellow-700":"bg-green-100 text-green-700"},getMedicationStatusHint(e={}){return!e||e.daysRemaining===null||e.daysRemaining===void 0?"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u062F\u0648\u0627\u0621":e.daysRemaining<0?"\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062F\u0648\u0627\u0621\u060C \u064A\u0631\u062C\u0649 \u0627\u062A\u062E\u0627\u0630 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0641\u0648\u0631\u0627\u064B":e.daysRemaining===0?"\u064A\u0646\u062A\u0647\u064A \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u064A\u0648\u0645\u060C \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0623\u0648 \u0627\u0644\u062A\u062E\u0644\u0635 \u0645\u0646\u0647 \u062D\u0633\u0628 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629":e.daysRemaining<=30?`\u062A\u0628\u0642\u0649 ${e.daysRemaining} \u064A\u0648\u0645${e.daysRemaining===1?"":"\u0627\u064B"} \u0639\u0644\u0649 \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629`:`\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0633\u0627\u0631\u064A\u0629\u060C \u064A\u062A\u0628\u0642\u0649 ${e.daysRemaining} \u064A\u0648\u0645\u064B\u0627 \u062A\u0642\u0631\u064A\u0628\u064B\u0627`},getInjuryStatusBadgeClass(e){return e==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"badge-success":e==="\u0645\u063A\u0644\u0642"?"badge-info":"badge-warning"},getInjuryRowClass(e){return e==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"bg-green-50":e==="\u0645\u063A\u0644\u0642"?"bg-gray-50":"bg-red-50"},viewInjuryRecord(e){const t=this.getInjuries().find(y=>y.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}const a=String(t.personType||"employee").toLowerCase(),i=a==="contractor"||a==="external",n=t.employeeName||t.personName||"",s=t.contractorName||"",o=t.employeeCode||t.employeeNumber||"",l=t.employeePosition||t.contractorPosition||"\u2014",r=t.department||t.employeeDepartment||"\u2014",c=t.factoryName||t.factory||"\u2014",d=t.subLocationName||t.subLocation||"\u2014",p=t.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",f=Array.isArray(t.attachments)?t.attachments:[],u=f.length?f.map((y,v)=>{const h=y.type&&(y.type.startsWith("image/")||/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(y.name||"")),w=this.processAttachmentUrl(y.data);return h&&w?`
                        <div class="bg-white border border-blue-100 rounded-xl p-3 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-image text-blue-500"></i>
                                    <div>
                                        <div class="text-sm font-medium text-gray-700">${Utils.escapeHTML(y.name||`\u0635\u0648\u0631\u0629 ${v+1}`)}</div>
                                        <div class="text-xs text-gray-500">${y.size||0} KB</div>
                                    </div>
                                </div>
                                <a href="${w}" download="${Utils.escapeHTML(y.name||`attachment-${v+1}`)}" class="btn-icon btn-icon-primary" title="\u062A\u062D\u0645\u064A\u0644">
                                    <i class="fas fa-download"></i>
                                </a>
                            </div>
                            <img src="${Utils.escapeHTML(w)}" alt="${Utils.escapeHTML(y.name||"")}" class="max-w-full h-auto rounded border" style="max-height: 250px;"
                                 onerror="this.onerror=null; this.style.display='none';">
                        </div>
                    `:`
                        <div class="flex items-center justify-between bg-white border border-blue-100 rounded-xl px-3 py-2 shadow-sm">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-paperclip text-blue-500"></i>
                                <div>
                                    <div class="text-sm font-medium text-gray-700">${Utils.escapeHTML(y.name||`\u0645\u0644\u0641 ${v+1}`)}</div>
                                    <div class="text-xs text-gray-500">${y.size||0} KB</div>
                                </div>
                            </div>
                            <a href="${w||y.data}" download="${Utils.escapeHTML(y.name||`attachment-${v+1}`)}" class="btn-icon btn-icon-primary" title="\u062A\u062D\u0645\u064A\u0644">
                                <i class="fas fa-download"></i>
                            </a>
                        </div>
                    `}).join(""):'<div class="text-sm text-gray-500 bg-white border border-dashed border-gray-300 rounded-xl p-3">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A \u0644\u0644\u062D\u0627\u0644\u0629.</div>',m=document.createElement("div");m.className="modal-overlay",m.innerHTML=`
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
                            <p class="text-gray-900 font-semibold mt-1">${i?"\u0645\u0642\u0627\u0648\u0644 / \u062E\u0627\u0631\u062C\u064A":"\u0645\u0648\u0638\u0641"}</p>
                        </div>
                        <div class="rounded-xl border border-blue-100 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-blue-700">${i?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"}</span>
                            <p class="text-gray-900 font-semibold mt-1">${Utils.escapeHTML(i?s||"\u2014":o||"\u2014")}</p>
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
                            <p class="text-gray-900 mt-1">${Utils.escapeHTML(d)}</p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629</span>
                            <p class="mt-1">
                                <span class="badge ${this.getInjuryStatusBadgeClass(p)}">${Utils.escapeHTML(p)}</span>
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
                            ${u}
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
        `,document.body.appendChild(m);const g=()=>m.remove();m.querySelectorAll(".modal-close, .modal-close-btn").forEach(y=>y.addEventListener("click",g)),m.querySelector(".modal-edit-btn")?.addEventListener("click",()=>{g(),this.showInjuryForm(t)}),m.addEventListener("click",y=>{y.target===m&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&g()})},editInjury(e){const t=this.getInjuries().find(a=>a.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}this.showInjuryForm(t)},exportInjuriesToExcel(){const e=this.getFilteredInjuries();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map(s=>({"\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628":s.employeeName||s.personName||"",\u0627\u0644\u0642\u0633\u0645:s.department||s.employeeDepartment||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629":this.formatDate(s.injuryDate,!0),"\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629":s.injuryType||"","\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629":s.injuryLocation||"",\u0627\u0644\u062D\u0627\u0644\u0629:s.status||"","\u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A":Array.isArray(s.attachments)?s.attachments.length:0,"\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629":s.actionsTaken||"",\u0627\u0644\u0639\u0644\u0627\u062C:s.treatment||""})),a=XLSX.utils.book_new(),i=XLSX.utils.json_to_sheet(t);XLSX.utils.book_append_sheet(a,i,"Injuries");const n=`Clinic_Injuries_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n)},exportInjuriesToPDF(){const e=this.getFilteredInjuries();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const a=`
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
                    ${e.map(s=>`
            <tr>
                <td>${Utils.escapeHTML(s.employeeName||s.personName||"")}</td>
                <td>${Utils.escapeHTML(s.department||s.employeeDepartment||"")}</td>
                <td>${this.formatDate(s.injuryDate,!0)}</td>
                <td>${Utils.escapeHTML(s.injuryType||"")}</td>
                <td>${Utils.escapeHTML(s.status||"")}</td>
                <td>${Array.isArray(s.attachments)?s.attachments.length:0}</td>
            </tr>
        `).join("")}
                </tbody>
            </table>
        `,i=`INJURIES-REPORT-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(i,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const s=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(s),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(s){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629:",s),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629")}},normalizeMedicationRecord(e={}){const t=(w,D=0)=>{if(w==null)return D;if(typeof w=="number")return Number.isFinite(w)?w:D;if(typeof w=="string"){const L=w.trim();if(!L)return D;const b=L.replace(/[, ]+/g,""),A=Number(b);return Number.isFinite(A)?A:D}return D},a=e.id||Utils.generateId("MED"),i=e.name||e.medicationName||"",n=e.type||e.medicationType||e.category||"",s=e.purchaseDate||e.buyDate||e.createdAt||new Date().toISOString(),o=e.productionDate||"",l=e.expiryDate||e.endDate||"",r=e.quantityAdded!==void 0&&e.quantityAdded!==null?t(e.quantityAdded,0):e.initialQuantity!==void 0&&e.initialQuantity!==null?t(e.initialQuantity,0):t(e.quantity,0),c=e.remainingQuantity!==void 0&&e.remainingQuantity!==null?t(e.remainingQuantity,0):e.quantityRemaining!==void 0&&e.quantityRemaining!==null?t(e.quantityRemaining,0):t(e.quantity,0),d=e.location||e.storageLocation||"",p=e.createdAt||new Date().toISOString(),f=e.updatedAt||p,u=typeof e.createdBy=="string"&&e.createdBy.trim()!==""?{id:e.createdById||"",name:e.createdBy.trim()}:e.createdBy||this.getCurrentUserSummary(e.createdBy),m=e.createdById||u?.id||AppState.currentUser?.id||"",g=typeof e.updatedBy=="string"&&e.updatedBy.trim()!==""?{id:"",name:e.updatedBy.trim()}:e.updatedBy||this.getCurrentUserSummary(e.updatedBy),y=e.notes||e.description||"",v=e.usage||"",h=this.calculateMedicationStatus({expiryDate:l});return{id:a,name:i,type:n,usage:v,purchaseDate:s,productionDate:o,expiryDate:l,quantityAdded:t(r,0),remainingQuantity:t(c,0),location:d,notes:y,createdBy:u,createdById:m,createdAt:p,updatedAt:f,updatedBy:g,status:e.status||h.status,daysRemaining:e.daysRemaining!==void 0?e.daysRemaining:h.daysRemaining}},normalizeSickLeaveRecord(e={}){const t=e.id||Utils.generateId("SICK_LEAVE"),a=e.personType||"employee",i=e.startDate?new Date(e.startDate).toISOString():new Date().toISOString(),n=e.endDate?new Date(e.endDate).toISOString():i,s=e.createdAt||new Date().toISOString(),o=e.updatedAt||s,l=e.createdBy||this.getCurrentUserSummary(e.createdBy),r=e.createdById||l?.id||AppState.currentUser?.id||"",c=e.updatedBy||this.getCurrentUserSummary(e.updatedBy),d=this.calculateSickLeaveDays(i,n);return{id:t,personType:a,employeeName:e.employeeName||e.personName||"",employeeCode:e.employeeCode||e.employeeNumber||"",employeeNumber:e.employeeNumber||e.employeeCode||"",employeePosition:e.employeePosition||e.position||"",employeeDepartment:e.employeeDepartment||e.department||"",reason:e.reason||"",medicalNotes:e.medicalNotes||e.notes||"",treatingDoctor:e.treatingDoctor||e.doctor||"",startDate:i,endDate:n,daysCount:d,createdBy:l,createdById:r,createdAt:s,updatedAt:o,updatedBy:c}},normalizeInjuryRecord(e={}){const t=e.id||Utils.generateId("INJURY"),a=e.personType||"employee",i=e.injuryDate?new Date(e.injuryDate).toISOString():new Date().toISOString(),n=e.createdAt||new Date().toISOString(),s=e.updatedAt||n,o=e.createdBy||this.getCurrentUserSummary(e.createdBy),l=e.createdById||o?.id||AppState.currentUser?.id||"",r=e.updatedBy||this.getCurrentUserSummary(e.updatedBy),c=Array.isArray(e.attachments)?e.attachments.map(d=>this.normalizeAttachment(d)).filter(Boolean):[];return{id:t,personType:a,employeeName:e.employeeName||"",contractorName:e.contractorName||"",personName:e.personName||e.employeeName||"",employeeCode:e.employeeCode||e.employeeNumber||"",employeeNumber:e.employeeNumber||e.employeeCode||"",employeePosition:e.employeePosition||e.contractorPosition||e.position||"",contractorPosition:e.contractorPosition||e.employeePosition||e.position||"",employeeDepartment:e.employeeDepartment||e.department||"",department:e.department||e.employeeDepartment||"",factory:e.factory||"",factoryName:e.factoryName||"",subLocation:e.subLocation||e.subLocationName||"",subLocationName:e.subLocationName||e.subLocation||"",injuryDate:i,injuryType:e.injuryType||e.type||"",injuryBodyPart:e.injuryBodyPart||"",injuryLocation:e.injuryLocation||e.location||"",injuryDescription:e.injuryDescription||e.description||"",actionsTaken:e.actionsTaken||e.actions||"",treatment:e.treatment||"",status:e.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",attachments:c,createdBy:o,createdById:l,createdAt:n,updatedAt:s,updatedBy:r}},normalizeAttachment(e){if(!e)return null;const t=e.data||e.base64||"";if(!t)return null;const a=e.size||Math.round(t.length*3/4/1024);return{id:e.id||Utils.generateId("ATT"),name:e.name||e.fileName||"attachment",type:e.type||e.mimeType||"application/octet-stream",data:t,size:a,uploadedAt:e.uploadedAt||new Date().toISOString()}},calculateSickLeaveDays(e,t){try{const a=new Date(e),i=new Date(t);if(Number.isNaN(a.getTime())||Number.isNaN(i.getTime()))return 1;const n=i.getTime()-a.getTime();return n>=0?Math.floor(n/864e5)+1:1}catch{return 1}},formatDate(e,t=!1){if(!e)return"-";try{return t?Utils.formatDateTime(e):Utils.formatDate(e)}catch{return"-"}},getMedications(){return Array.isArray(AppState.appData?.medications)&&AppState.appData.medications.length>0?AppState.appData.medications:Array.isArray(AppState.appData?.clinicMedications)&&AppState.appData.clinicMedications.length>0?AppState.appData.clinicMedications:Array.isArray(AppState.appData?.clinicInventory)&&AppState.appData.clinicInventory.length>0?AppState.appData.clinicInventory:[]},getSickLeaves(){return Array.isArray(AppState.appData?.sickLeave)?AppState.appData.sickLeave:[]},getInjuries(){return Array.isArray(AppState.appData?.injuries)?AppState.appData.injuries:[]},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((e,t)=>({id:e.id||e.siteId||Utils.generateId("SITE"),name:e.name||e.title||e.label||`\u0645\u0648\u0642\u0639 ${t+1}`})):[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",e),[]}},getPlaceOptions(e){try{if(!e)return[];if(!this.getSiteOptions().find(i=>i.id===e))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const i=Permissions.formSettingsState.sites.find(n=>n.id===e);if(i&&Array.isArray(i.places))return i.places.map(n=>({id:n.id,name:n.name}))}if(Array.isArray(AppState.appData?.observationSites)){const i=AppState.appData.observationSites.find(n=>(n.id||n.siteId)===e);if(i)return(Array.isArray(i.places)?i.places:Array.isArray(i.locations)?i.locations:Array.isArray(i.children)?i.children:Array.isArray(i.areas)?i.areas:[]).map((s,o)=>({id:s.id||s.placeId||s.value||Utils.generateId("PLACE"),name:s.name||s.placeName||s.title||s.label||s.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const i=DailyObservations.DEFAULT_SITES.find(n=>(n.id||n.siteId)===e);if(i)return(Array.isArray(i.places)?i.places:Array.isArray(i.locations)?i.locations:Array.isArray(i.children)?i.children:Array.isArray(i.areas)?i.areas:[]).map((s,o)=>({id:s.id||s.placeId||s.value||Utils.generateId("PLACE"),name:s.name||s.placeName||s.title||s.label||s.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}return[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 (\u0627\u0644\u0639\u064A\u0627\u062F\u0629):",t),[]}},setupClinicWorkplaceDatalist(e,t,a,i={}){const n=i.clearOnFactoryChange!==!1,s=document.getElementById(e),o=document.getElementById(t),l=document.getElementById(a);if(!s||!o||!l)return;const r=p=>{const f=(s.value||"").trim(),u=f?this.getPlaceOptions(f):[];l.innerHTML=u.map(m=>`<option value="${Utils.escapeHTML(m.name)}"></option>`).join(""),p&&(o.value="")},c="_clinicWorkplaceFactoryChange";s[c]&&s.removeEventListener("change",s[c]);const d=()=>r(n);s[c]=d,s.addEventListener("change",d),r(!1)},refreshSiteDropdowns(){try{const e=this.getSiteOptions(),t=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:i=>String(i??""),a=i=>'<option value="">'+(i||"\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")+"</option>"+(e||[]).map(n=>'<option value="'+t(n.id)+'">'+t(n.name)+"</option>").join("");["visits-filter-factory","visit-factory","visit-contractor-factory","enhanced-visit-factory"].forEach(i=>{const n=document.getElementById(i);if(n&&n.tagName==="SELECT"){const s=n.value;n.innerHTML=a("\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639"),s&&(n.value=s)}}),typeof this.setupClinicWorkplaceDatalist=="function"&&(this.setupClinicWorkplaceDatalist("visit-factory","visit-employee-location","visit-employee-location-datalist"),this.setupClinicWorkplaceDatalist("visit-contractor-factory","visit-work-area","visit-work-area-datalist"),this.setupClinicWorkplaceDatalist("enhanced-visit-factory","enhanced-visit-employee-location","enhanced-visit-employee-location-datalist"))}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic.refreshSiteDropdowns:",e)}},getExpiringMedications(){return this.getMedications().filter(e=>e.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"||e.status==="\u0645\u0646\u062A\u0647\u064A")},ensureDataStructure(){if(typeof AppState>"u"||!AppState.appData)return;const e=AppState.appData;e.clinicMedications||(e.clinicMedications=[]),e.injuries||(e.injuries=[]),e.sickLeave||(e.sickLeave=[]),e.clinicVisits||(e.clinicVisits=[]),e.clinicSupplyRequests||(e.clinicSupplyRequests=[])},notifyMedicationAlerts(){this.getExpiringMedications().forEach(t=>{this.state.medicationAlertsNotified.has(t.id)||(t.status==="\u0645\u0646\u062A\u0647\u064A"?Notification?.error?.(`\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062F\u0648\u0627\u0621 ${Utils.escapeHTML(t.name||"")}`):Notification?.warning?.(`\u0627\u0644\u062F\u0648\u0627\u0621 ${Utils.escapeHTML(t.name||"")} \u0633\u064A\u0646\u062A\u0647\u064A \u062E\u0644\u0627\u0644 ${t.daysRemaining??0} \u064A\u0648\u0645`),this.state.medicationAlertsNotified.add(t.id))})},getFilteredMedications(){const e=this.state.filters.medications||{},t=(e.search||"").toLowerCase().trim(),a=e.dateFrom?new Date(e.dateFrom):null,i=e.dateTo?new Date(e.dateTo):null,n=e.status||"all";return this.getMedications().map(s=>this.normalizeMedicationRecord(s)).filter(s=>{const o=[s.name,s.type,s.location,s.usage,s.notes,this.getUserDisplayName(s.createdBy)].map(r=>String(r||"").toLowerCase()).join(" ");if(!(!t||o.includes(t))||n!=="all"&&s.status!==n)return!1;if(a){const r=s.purchaseDate?new Date(s.purchaseDate):null;if(!r||r<a)return!1}if(i){const r=s.purchaseDate?new Date(s.purchaseDate):null;if(!r||r>i)return!1}return!0})},getFilteredSickLeaves(){const e=this.state.filters.sickLeave||{},t=this.normalizeArabicText(e.search||""),a=e.department||"",i=e.dateFrom?new Date(e.dateFrom):null,n=e.dateTo?new Date(e.dateTo):null;return this.getSickLeaves().filter(s=>{const o=this.normalizeArabicText([s.employeeName,s.personName,s.employeeCode,s.employeeNumber,s.employeeDepartment,s.employeePosition,s.position,s.treatingDoctor,s.reason].filter(Boolean).join(" "));if(!(!t||o.includes(t))||a&&s.employeeDepartment!==a)return!1;const r=s.startDate?new Date(s.startDate):null;return!(i&&(!r||r<i)||n&&(!r||r>n))})},getFilteredInjuries(){const e=this.state.filters.injuries||{},t=(e.search||"").toLowerCase(),a=e.status||"all",i=e.department||"",n=e.injuryType||"all",s=e.injuryBodyPart||"all",o=this.state.activeInjuryType||"employees",l=e.dateFrom?new Date(e.dateFrom):null,r=e.dateTo?new Date(e.dateTo):null;return this.getInjuries().filter(c=>{const d=[c.employeeCode,c.employeeNumber,c.employeeName,c.personName,c.contractorName,c.employeeDepartment,c.department,c.factoryName,c.factory,c.subLocationName,c.subLocation,c.injuryType,c.injuryBodyPart,c.injuryLocation,c.status,c.injuryDescription].map(m=>String(m||"").toLowerCase()).join(" ");if(!(!t||d.includes(t))||a!=="all"&&c.status!==a||n!=="all"&&(c.injuryType||"")!==n||s!=="all"&&(c.injuryBodyPart||"")!==s||i&&c.department!==i)return!1;const f=String(c.personType||"employee").toLowerCase();if(o==="employees"&&f!=="employee"||o==="contractors"&&f==="employee")return!1;const u=c.injuryDate?new Date(c.injuryDate):null;return!(l&&(!u||u<l)||r&&(!u||u>r))})},renderEmptyState(e){const{t,isRTL:a}=this.getTranslations(),i=a?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A":"No data available";return`
            <div class="empty-state" style="direction: ${a?"rtl":"ltr"}; text-align: ${a?"right":"left"};">
                <i class="fas fa-folder-open text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">${Utils.escapeHTML(e||i)}</p>
            </div>
        `},getClinicDepartments(){const e=new Set;return(AppState.appData?.employees||[]).forEach(t=>{const a=(t?.department||"").trim();a&&e.add(a)}),(AppState.appData?.sickLeave||[]).forEach(t=>{const a=(t?.employeeDepartment||t?.department||"").trim();a&&e.add(a)}),(AppState.appData?.injuries||[]).forEach(t=>{const a=(t?.employeeDepartment||t?.department||"").trim();a&&e.add(a)}),Array.from(e).sort((t,a)=>t.localeCompare(a,"ar"))},getMedicationBadgeClass(e){return e==="\u0645\u0646\u062A\u0647\u064A"?"badge-danger":e==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"badge-warning":"badge-success"},renderTabNavigation(){document.querySelectorAll(".clinic-tab-btn").forEach(t=>{t.getAttribute("data-tab")===this.state.activeTab?((t.classList.contains("btn-secondary")||t.classList.contains("btn-primary"))&&(t.classList.remove("btn-secondary"),t.classList.add("btn-primary")),!t.classList.contains("btn-secondary")&&!t.classList.contains("btn-primary")&&t.classList.add("active")):((t.classList.contains("btn-secondary")||t.classList.contains("btn-primary"))&&(t.classList.remove("btn-primary"),t.classList.add("btn-secondary")),!t.classList.contains("btn-secondary")&&!t.classList.contains("btn-primary")&&t.classList.remove("active"))})},bindTabEvents(){document.querySelectorAll(".clinic-tab-btn").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-tab");!a||a===this.state.activeTab||(this.state.activeTab=a,this.renderTabNavigation(),requestAnimationFrame(()=>{this._activateTabPanels(a),this.scheduleClinicTabRender(a,{delayMs:20})}))})})},_activateTabPanels(e){try{document.querySelectorAll(".clinic-tab-panel").forEach(a=>{a.getAttribute("data-tab-panel")===e?(a.classList.add("active"),a.style.display="block"):(a.classList.remove("active"),a.style.display="none")}),this._syncAttendanceQuickNavVisibility?.()}catch{}},_renderTabSkeleton(e,t){try{if(!e||(e.innerHTML||"").trim())return;const i=Utils.escapeHTML(t||"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");if(e.innerHTML=`
                <div class="content-card" style="margin:14px;">
                    <div class="card-body" style="display:flex;align-items:center;justify-content:center;min-height:210px;gap:12px;">
                        <div style="width:34px;height:34px;border:3px solid rgba(37,99,235,0.18);border-top-color:#2563eb;border-radius:50%;animation:hseSpin 0.9s linear infinite;"></div>
                        <div style="font-weight:600;color:#334155;">${i}</div>
                    </div>
                </div>
            `,this.applyModuleI18n(e),!document.getElementById("hse-mini-spinner-style")){const n=document.createElement("style");n.id="hse-mini-spinner-style",n.textContent="@keyframes hseSpin{to{transform:rotate(360deg);}}",document.head.appendChild(n)}}catch{}},scheduleClinicTabRender(e,{delayMs:t=0}={}){try{if(!e)return;this._tabRenderState||(this._tabRenderState={token:0,timers:{}});const a=this._tabRenderState;a.token+=1;const i=a.token,n=a.timers[e];n&&(clearTimeout(n),a.timers[e]=null);const s=document.querySelector(`.clinic-tab-panel[data-tab-panel="${e}"]`),o={visits:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F...",attendance:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u062D\u0636\u0648\u0631...",medications:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0623\u062F\u0648\u064A\u0629...",sickLeave:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629...","dispensed-medications":"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629...",injuries:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A...","supply-request":"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A...",approvals:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629..."};this._renderTabSkeleton(s,o[e]||"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");const l=()=>{!this._tabRenderState||i!==this._tabRenderState.token||setTimeout(()=>{if(!(!this._tabRenderState||i!==this._tabRenderState.token))try{this._renderTabByKey(e)}catch(c){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0631\u0646\u062F\u0631 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",e,c)}},0)},r=["visits","attendance"];requestAnimationFrame(()=>{if(r.includes(e)){l();return}typeof requestIdleCallback=="function"?requestIdleCallback(l,{timeout:900}):l()}),a.timers[e]=setTimeout(()=>{!this._tabRenderState||i!==this._tabRenderState.token||l()},Math.max(0,t))}catch{}},_renderTabByKey(e){if(e==="visits"){this.scheduleVisitsTabRender(!1,0);return}if(e==="medications")return this.renderMedicationsTab();if(e==="sickLeave")return this.renderSickLeaveTab();if(e==="injuries")return this.renderInjuriesTab();if(e==="approvals")return this.renderApprovalsTab();if(e==="dispensed-medications")return this.renderDispensedMedicationsTab();if(e==="analytics")return this.renderAnalyticsTab();if(e==="data-analysis")return this.renderDataAnalysisTab();if(e==="supply-request")return this.renderSupplyRequestTab();if(e==="attendance"){this.scheduleAttendanceTabRender(0);return}},renderActiveTabContent(){const e=this.state.activeTab||"medications";this._activateTabPanels(e),this.scheduleClinicTabRender(e,{delayMs:0})},renderMedicationsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]');if(!e)return;const t=document.activeElement?document.activeElement.id:null;let a=0,i=0;t==="medications-search"&&(a=document.activeElement.selectionStart,i=document.activeElement.selectionEnd);const n=this.state.filters.medications||{},s=this.getFilteredMedications(),o=this.isCurrentUserAdmin(),l=s.map(c=>{const d=this.calculateMedicationStatus(c),p=d.status||"\u0633\u0627\u0631\u064A",f=d.daysRemaining!==void 0&&d.daysRemaining!==null?d.daysRemaining:"\u2014",u=this.formatDate(c.purchaseDate),m=c.expiryDate?this.formatDate(c.expiryDate):"\u2014",g=this.getMedicationRowClass(p),y=c.quantityAdded??c.quantity??0,v=c.remainingQuantity??c.quantity??0,h=Math.max(0,y-v),w=c.usage||c.notes||"\u2014";let D="",L="";o&&(p==="\u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"||c.pendingUpdate)&&(D=`
                    <button type="button" class="btn-icon btn-icon-success" data-action="approve-medication" data-id="${Utils.escapeHTML(c.id||"")}" title="\u0627\u0639\u062A\u0645\u0627\u062F">
                        <i class="fas fa-check"></i>
                    </button>
                `,L=`
                    <button type="button" class="btn-icon btn-icon-danger" data-action="reject-medication" data-id="${Utils.escapeHTML(c.id||"")}" title="\u0631\u0641\u0636">
                        <i class="fas fa-times"></i>
                    </button>
                `);const b=`
                ${D}
                ${L}
                <button type="button" class="btn-icon btn-icon-primary" data-action="view-medication" data-id="${Utils.escapeHTML(c.id||"")}" title="\u0639\u0631\u0636">
                    <i class="fas fa-eye"></i>
                </button>
                <button type="button" class="btn-icon btn-icon-warning" data-action="edit-medication" data-id="${Utils.escapeHTML(c.id||"")}" title="\u062A\u0639\u062F\u064A\u0644">
                    <i class="fas fa-edit"></i>
                </button>
                ${o?`
                <button type="button" class="btn-icon btn-icon-danger" data-action="delete-medication" data-id="${Utils.escapeHTML(c.id||"")}" title="\u062D\u0630\u0641">
                    <i class="fas fa-trash"></i>
                </button>
                `:""}
            `;return`
                <tr class="${g}">
                    <td>${Utils.escapeHTML(c.name||"")}</td>
                    <td>${Utils.escapeHTML(c.type||"")}</td>
                    <td>${Utils.escapeHTML(w)}</td>
                    <td>${u}</td>
                    <td>${m}</td>
                    <td>
                        <span class="badge ${this.getMedicationBadgeClass(p)}">${Utils.escapeHTML(p)}</span>
                        ${c.pendingUpdate?'<br><span class="badge badge-warning" style="margin-top: 4px; font-size: 0.7rem;">\u062A\u0639\u062F\u064A\u0644 \u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</span>':""}
                    </td>
                    <td>${f}</td>
                    <td class="text-center font-semibold">${y}</td>
                    <td class="text-center font-semibold text-blue-600">${h}</td>
                    <td class="text-center font-semibold">${v}</td>
                    <td>${Utils.escapeHTML(this.getUserDisplayName(c.createdBy))}</td>
                    <td class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            ${b}
                        </div>
                    </td>
                </tr>
            `}).join(""),r=s.length?`
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
                    <button type="button" class="btn-primary" id="medications-add-btn">
                        <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u062C\u062F\u064A\u062F
                    </button>
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
                            ${n.status&&n.status!=="all"?`<span class="filter-count-badge" style="background-color: #10b981; color: white; border-radius: 9999px; padding: 2px 6px; font-size: 0.75rem; margin-right: 6px;">${s.length}</span>`:""}
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
        `,this.applyModuleI18n(e),this.bindMedicationsTabEvents(e),t){const c=e.querySelector(`#${t}`);c&&(c.focus(),t==="medications-search"&&(c.selectionStart=a,c.selectionEnd=i))}setTimeout(()=>{const c=e.querySelector(".clinic-table-wrapper");c&&this.setupTableScrollListeners(c)},100)},bindMedicationsTabEvents(e){const t=e.querySelector("#medications-search"),a=e.querySelector("#medications-status"),i=e.querySelector("#medications-date-from"),n=e.querySelector("#medications-date-to"),s=e.querySelector("#medications-reset-filters"),o=e.querySelector("#medications-add-btn"),l=e.querySelector("#medications-export-pdf-btn"),r=e.querySelector("#medications-export-excel-btn");t&&t.addEventListener("input",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.search=c.target.value,this.scheduleMedicationsTabRender(150)}),a&&a.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.status=c.target.value,this.scheduleMedicationsTabRender(50)}),i&&i.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.dateFrom=c.target.value,this.scheduleMedicationsTabRender(50)}),n&&n.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.dateTo=c.target.value,this.scheduleMedicationsTabRender(50)}),s&&s.addEventListener("click",()=>{this.state.filters=this.state.filters||{},this.state.filters.medications={search:"",status:"all",dateFrom:"",dateTo:""},this.scheduleMedicationsTabRender(0)}),o&&o.addEventListener("click",()=>this.showMedicationForm()),l&&l.addEventListener("click",()=>this.exportMedicationsToPDF()),r&&r.addEventListener("click",()=>this.exportMedicationsToExcel()),e.querySelectorAll('[data-action="approve-medication"]').forEach(c=>{c.addEventListener("click",()=>this.approveMedicationRequest(c.getAttribute("data-id")))}),e.querySelectorAll('[data-action="reject-medication"]').forEach(c=>{c.addEventListener("click",()=>this.rejectMedicationRequest(c.getAttribute("data-id")))}),e.querySelectorAll('[data-action="view-medication"]').forEach(c=>{c.addEventListener("click",()=>this.viewMedication(c.getAttribute("data-id")))}),e.querySelectorAll('[data-action="edit-medication"]').forEach(c=>{c.addEventListener("click",()=>this.editMedication(c.getAttribute("data-id")))}),e.querySelectorAll('[data-action="delete-medication"]').forEach(c=>{c.addEventListener("click",()=>this.deleteMedication(c.getAttribute("data-id")))})},async approveMedicationRequest(e){const t=this.getMedications().find(i=>i.id===e);if(!(!t||!confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0644\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(t.name)}"\u061F`))){Loading.show();try{let i={...t};if(t.pendingUpdate){Object.assign(i,t.pendingUpdate),delete i.pendingUpdate;const s=this.calculateMedicationStatus(i);i.status=s.status,i.daysRemaining=s.daysRemaining,i.updatedAt=new Date().toISOString(),i.updatedBy=this.getCurrentUserSummary()}else if(t.status==="\u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"){const s=this.calculateMedicationStatus(i);i.status=s.status}i=this.normalizeMedicationRecord(i);const n=AppState.appData.medications.findIndex(s=>s.id===e);n!==-1&&(AppState.appData.medications[n]=i),this.ensureData(),this.renderMedicationsTab(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.sendRequest({action:"updateMedication",data:{medicationId:e,updateData:i}}),Loading.hide(),Notification.success("\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D")}catch(i){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F: "+i.message)}}},async rejectMedicationRequest(e){const t=this.getMedications().find(i=>i.id===e);if(!(!t||!confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0631\u0641\u0636 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0644\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(t.name)}"\u061F

\u0644\u0646 \u064A\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0629.`))){Loading.show();try{if(t.status==="\u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")AppState.appData.medications=AppState.appData.medications.filter(i=>i.id!==e),await GoogleIntegration.sendRequest({action:"deleteMedication",data:{medicationId:e}});else if(t.pendingUpdate){let i={...t};delete i.pendingUpdate;const n=AppState.appData.medications.findIndex(s=>s.id===e);n!==-1&&(AppState.appData.medications[n]=i),await GoogleIntegration.sendRequest({action:"updateMedication",data:{medicationId:e,updateData:i}})}this.ensureData(),this.renderMedicationsTab(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D")}catch(i){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0631\u0641\u0636: "+i.message)}}},viewMedication(e){const t=this.getMedications().find(s=>s.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F");return}const a=t.status||"\u0633\u0627\u0631\u064A",i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
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
        `,document.body.appendChild(i);const n=()=>i.remove();i.querySelectorAll(".modal-close, .modal-close-btn").forEach(s=>{s.addEventListener("click",n)}),i.addEventListener("click",s=>{s.target===i&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&n()})},editMedication(e){const t=this.getMedications().find(a=>a.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062A\u0639\u062F\u064A\u0644\u0647");return}this.showMedicationForm(t)},async deleteMedication(e){const t=this.getMedications().find(i=>i.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062D\u0630\u0641\u0647");return}if(this.isCurrentUserAdmin()){if(!confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(t.name||"")}"\u061F

\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627.`))return;Loading.show();try{AppState.appData.medications=(AppState.appData.medications||[]).filter(n=>n.id!==e),AppState.appData.clinicMedications=(AppState.appData.clinicMedications||[]).filter(n=>n.id!==e),AppState.appData.clinicInventory=(AppState.appData.clinicInventory||[]).filter(n=>n.id!==e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.sendRequest({action:"deleteMedication",data:{medicationId:e}}),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"),this.renderMedicationsTab(),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:"\u062D\u0630\u0641",data:{id:e}}}))}catch(n){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621:",n),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621: "+(n.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}else{if(!confirm(`\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(t.name||"")}" \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`))return;Loading.show();try{const n={medicationId:e,medicationData:t,requestedBy:{id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""},requestedById:AppState.currentUser?.id||"",reason:"\u0637\u0644\u0628 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621"},s=await GoogleIntegration.sendRequest({action:"addMedicationDeletionRequest",data:n});if(s&&s.success)Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629"),this.notifyAdminAboutDeletionRequest(t),this.state.activeTab==="approvals"&&setTimeout(()=>{this.renderApprovalsTab()},500),this.renderMedicationsTab();else throw new Error(s.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}catch(n){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:",n),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(n.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}},isCurrentUserAdmin(){if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function")return Permissions.isCurrentUserAdmin();const e=(AppState.currentUser?.role||"").toLowerCase();return e==="admin"||e==="system_admin"||AppState.currentUser?.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||e==="\u0645\u062F\u064A\u0631"},_isUsersSheetAdminRecord(e){if(!e)return!1;if(typeof Permissions<"u"){if(typeof Permissions.isAdminRole=="function"&&Permissions.isAdminRole(e.role))return!0;const a=typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(e.permissions):e.permissions;if(a&&typeof a=="object"&&!Array.isArray(a)&&(Permissions.isAdminRole&&Permissions.isAdminRole(a.role)||a.admin===!0||a.isAdmin===!0||a["manage-modules"]===!0))return!0}const t=String(e.role||"").trim().toLowerCase();return t==="admin"||t==="system_admin"||e.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||e.role==="\u0645\u062F\u064A\u0631"},_invalidateApprovalsCache(){this._approvalsBackendFetchOk=!1;try{localStorage.removeItem("clinic_approvals_last_sync")}catch{}},_isApprovalTimeOffRequest(e){if(!e)return!1;if(e.approvalKind==="timeoff")return!0;const t=String(e.requestType||"").trim().toLowerCase();return t==="leave"||t==="permission"||t==="overtime"},_approvalRequestMatchesTypeFilter(e,t){return!e||!t||t==="all"?!0:t==="timeoff"?this._isApprovalTimeOffRequest(e):(e.approvalKind||e.requestType)===t},prefetchClinicAttendanceForAdminIfNeeded(e){return!this.isCurrentUserAdmin()||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest?Promise.resolve():this._adminAttendancePrefetchPromise&&!e?this._adminAttendancePrefetchPromise:(this._adminAttendancePrefetchPromise=(async()=>{try{await this._ensureClinicStaffLoadedForAttendance(),await this.loadClinicAttendanceData(!!e)&&(this._attendanceDataFetchedInSession=!0),this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!!e),this._leaveBalancesFetchedInSession=!0,this._updatePendingApprovalsBadgeFromLocal_(),typeof UI<"u"&&typeof UI.updateNotificationsBadge=="function"&&UI.updateNotificationsBadge(),this.state?.activeTab==="attendance"&&this.renderAttendanceTab({force:!0})}catch{}})().finally(()=>{this._adminAttendancePrefetchPromise=null}),this._adminAttendancePrefetchPromise)},prefetchClinicTimeOffApprovalsForAdminIfNeeded(){return this.prefetchClinicAttendanceForAdminIfNeeded(!1)},_updatePendingApprovalsBadgeFromLocal_(){const e=document.getElementById("pending-approvals-badge");if(!e)return;const t=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)?AppState.appData.clinicMedicationDeletionRequests:[],a=Array.isArray(AppState.appData?.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[],i=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],n=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[],s=[...t,...a,...i,...n].filter(o=>o&&String(o.status)==="pending").length;s>0?(e.textContent=String(s),e.style.display="inline-block"):e.style.display="none"},getClinicStaffLeaveBalancesList(){return Array.isArray(AppState.appData?.clinicStaffLeaveBalances)?AppState.appData.clinicStaffLeaveBalances:[]},_getLeaveBalancePeriodDefaults(){const e=this._getTodayLocalKey();return this.state=this.state||{},this.state.leaveBalanceMonth||(this.state.leaveBalanceMonth=e.substring(0,7)),this.state.leaveBalanceYear||(this.state.leaveBalanceYear=e.substring(0,4)),{month:this.state.leaveBalanceMonth,year:this.state.leaveBalanceYear}},_scheduleLeaveBalancesLoadIfNeeded(e){this.canAccessAttendanceTab()&&(this._leaveBalancesLoadPromise&&!e||!e&&this._leaveBalancesFetchedInSession||(this._leaveBalancesLoadPromise=this.loadClinicStaffLeaveBalances(!!e).then(()=>{this._leaveBalancesFetchedInSession=!0,this.state?.activeTab==="attendance"&&this.renderAttendanceTab({force:!0})}).catch(()=>{}).finally(()=>{this._leaveBalancesLoadPromise=null})))},_isLeaveBalancesLoading(){return!!this._leaveBalancesLoadPromise},async loadClinicStaffLeaveBalances(e){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return!1;const t=this._getLeaveBalancePeriodDefaults(),a=this.canViewAllAttendanceData();try{a&&await this._ensureClinicStaffLoadedForAttendance();const[i,n]=await Promise.all([GoogleIntegration.sendRequest({action:"getClinicStaffLeaveBalances",data:{month:t.month,year:t.year,skipCache:!!e}}),GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:e?{skipCache:!0}:{}})]);if(n?.success&&Array.isArray(n.data)&&(AppState.appData.clinicStaffTimeOffRequests=n.data),i?.success&&Array.isArray(i.data)?(AppState.appData.clinicStaffLeaveBalances=this._enrichLeaveBalancesFromLocal_(i.data,t),i.meta&&(this.state.leaveBalanceMonth=i.meta.month||t.month,this.state.leaveBalanceYear=i.meta.year||t.year)):a&&(AppState.appData.clinicStaffLeaveBalances=this._buildLeaveBalancesFromStaffAndRequests_(t)),AppState.appData.clinicStaffLeaveBalances&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}return!!(i?.success||a&&(AppState.appData.clinicStaffLeaveBalances||[]).length)}catch{return a?(AppState.appData.clinicStaffLeaveBalances=this._buildLeaveBalancesFromStaffAndRequests_(t),(AppState.appData.clinicStaffLeaveBalances||[]).length>0):!1}},_buildLeaveBalancePeriodFromItems_(e,t,a,i,n){const s=a.filter(c=>String(c.requestType).toLowerCase()==="leave").reduce((c,d)=>c+this._countLeaveDaysInPeriod_(d,e,t),0),o=a.filter(c=>String(c.requestType).toLowerCase()==="permission").length,l=i??0,r=n??0;return{periodType:e,periodKey:t,leaveEntitled:l,leaveConsumed:Math.round(s*100)/100,leaveRemaining:Math.max(0,Math.round((l-s)*100)/100),permissionEntitled:r,permissionConsumed:o,permissionRemaining:Math.max(0,r-o),approvedItems:a}},_buildLeaveBalancesFromStaffAndRequests_(e){const t=e?.month||"",a=e?.year||"",i=this.getClinicStaffLeaveBalancesList(),n=new Map(i.map(s=>[String(s.staffId),s]));return(this.getClinicStaffList()||[]).map(s=>{const o={id:s.id,staffId:s.id,userId:s.userId,userEmail:s.userEmail},l=n.get(String(s.id))||{},r=this._collectLocalApprovedTimeOffItems(o,"month",t),c=this._collectLocalApprovedTimeOffItems(o,"year",a);return{staffId:s.id,userId:s.userId||"",userName:s.userName||"",userEmail:s.userEmail||"",staffRole:s.staffRole||"",isActive:s.isActive,month:this._buildLeaveBalancePeriodFromItems_("month",t,r,l.month?.leaveEntitled,l.month?.permissionEntitled),year:this._buildLeaveBalancePeriodFromItems_("year",a,c,l.year?.leaveEntitled,l.year?.permissionEntitled)}})},_collectAllApprovedTimeOffForMonth_(e,t){const a=[],i=new Set,n=(s,o,l)=>{const r=String(s?.id||`${o}_${s?.dateFrom}_${s?.requestType}`).trim();r&&i.has(r)||(r&&i.add(r),a.push({...s,userName:o||s.userName||"\u2014",staffRole:l||s.staffRole}))};if((t||[]).forEach(s=>{(s.month?.approvedItems||[]).forEach(o=>{n(o,s.userName,s.staffRole)})}),this.canViewAllAttendanceData()){const s=new Map((this.getClinicStaffList()||[]).map(o=>[String(o.id),o]));this.getClinicStaffTimeOffRequestsList().forEach(o=>{if(!this._isTimeOffApprovedStatus(o.status)||!this._requestOverlapsPeriod(o,"month",e))return;const l=s.get(String(o.staffId))||{};n(o,o.userName||l.userName,l.staffRole)})}return a.sort((s,o)=>new Date(o.reviewedAt||o.requestedAt||o.createdAt)-new Date(s.reviewedAt||s.requestedAt||s.createdAt))},_isTimeOffApprovedStatus(e){const t=String(e||"").trim().toLowerCase();return t==="approved"||t==="\u0645\u0639\u062A\u0645\u062F"||t==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647"||t==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627"},_timeOffRequestMatchesStaffRow(e,t){if(!e||!t)return!1;if(t.staffId&&e.staffId&&String(t.staffId)===String(e.staffId)||t.id&&e.staffId&&String(t.id)===String(e.staffId))return!0;const a=String(t.userId||"").trim(),i=String(t.userEmail||"").trim().toLowerCase();return!!(a&&String(e.userId||"").trim()===a||i&&String(e.userEmail||"").trim().toLowerCase()===i)},_dateKeyInPeriod(e,t,a){const i=this._attendanceDayKey(e);return!i||!a?!1:t==="year"?i.substring(0,4)===String(a):i.substring(0,7)===String(a)},_requestOverlapsPeriod(e,t,a){if(!e||!a)return!1;const i=this._attendanceDayKey(e.dateFrom),n=this._attendanceDayKey(e.dateTo||e.dateFrom),s=i||this._attendanceDayKey(e.requestedAt||e.createdAt);if(!s)return!1;if(this._dateKeyInPeriod(s,t,a)||n&&this._dateKeyInPeriod(n,t,a))return!0;try{let o=new Date(s);const l=new Date(n||s);if(Number.isNaN(o.getTime()))return!1;let r=0;for(;o<=l&&r<400;){if(this._dateKeyInPeriod(o,t,a))return!0;o.setDate(o.getDate()+1),r++}}catch{}return!1},_countLeaveDaysInPeriod_(e,t,a){const i=this._attendanceDayKey(e.dateFrom),n=this._attendanceDayKey(e.dateTo||e.dateFrom);if(!i){const s=parseFloat(e.durationDays);return!isNaN(s)&&s>0?s:0}try{let s=new Date(i);const o=new Date(n||i);if(Number.isNaN(s.getTime()))return parseFloat(e.durationDays)||0;let l=0,r=0;for(;s<=o&&r<400;)this._dateKeyInPeriod(s,t,a)&&(l+=1),s.setDate(s.getDate()+1),r++;return l||parseFloat(e.durationDays)||0}catch{return parseFloat(e.durationDays)||0}},_collectLocalApprovedTimeOffItems(e,t,a){return(Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[]).filter(n=>!this._isTimeOffApprovedStatus(n.status)||!this._timeOffRequestMatchesStaffRow(n,e)?!1:this._requestOverlapsPeriod(n,t,a))},_enrichLeaveBalancesFromLocal_(e,t){const a=t?.month||"",i=t?.year||"";return(e||[]).map(n=>{const s={id:n.staffId,staffId:n.staffId,userId:n.userId,userEmail:n.userEmail},o=[...Array.isArray(n.month?.approvedItems)?n.month.approvedItems:[],...this._collectLocalApprovedTimeOffItems(s,"month",a)],l=[...Array.isArray(n.year?.approvedItems)?n.year.approvedItems:[],...this._collectLocalApprovedTimeOffItems(s,"year",i)],r=v=>{const h=new Map;return v.forEach(w=>{w?.id&&h.set(String(w.id),w)}),Array.from(h.values())},c=r(o),d=r(l),p=c.filter(v=>String(v.requestType).toLowerCase()==="leave").reduce((v,h)=>v+this._countLeaveDaysInPeriod_(h,"month",a),0),f=c.filter(v=>String(v.requestType).toLowerCase()==="permission").length,u=d.filter(v=>String(v.requestType).toLowerCase()==="leave").reduce((v,h)=>v+this._countLeaveDaysInPeriod_(h,"year",i),0),m=d.filter(v=>String(v.requestType).toLowerCase()==="permission").length,g={...n.month||{}},y={...n.year||{}};return c.length&&(g.leaveConsumed=Math.max(g.leaveConsumed||0,Math.round(p*100)/100),g.permissionConsumed=Math.max(g.permissionConsumed||0,f),g.leaveRemaining=Math.max(0,Math.round(((g.leaveEntitled||0)-g.leaveConsumed)*100)/100),g.permissionRemaining=Math.max(0,(g.permissionEntitled||0)-g.permissionConsumed),g.approvedItems=c),d.length&&(y.leaveConsumed=Math.max(y.leaveConsumed||0,Math.round(u*100)/100),y.permissionConsumed=Math.max(y.permissionConsumed||0,m),y.leaveRemaining=Math.max(0,Math.round(((y.leaveEntitled||0)-y.leaveConsumed)*100)/100),y.permissionRemaining=Math.max(0,(y.permissionEntitled||0)-y.permissionConsumed),y.approvedItems=d),{...n,month:g,year:y}})},renderApprovedTimeOffRequestsSection(e,t){const a=this._collectAllApprovedTimeOffForMonth_(t,e),i=a.length?a.map(n=>`
            <tr>
                <td>${Utils.escapeHTML(n.userName||"\u2014")}</td>
                <td><span class="badge badge-info">${Utils.escapeHTML(this.getTimeOffRequestTypeLabel(n.requestType))}</span></td>
                <td>${Utils.escapeHTML(this.formatTimeOffRequestDetails(n))}</td>
                <td class="text-sm">${Utils.escapeHTML(n.reason||"\u2014")}</td>
                <td>${this.formatDate(n.reviewedAt||n.requestedAt||n.createdAt,!0)}</td>
            </tr>
        `).join(""):`<tr><td colspan="5" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0627\u0632\u0627\u062A \u0623\u0648 \u0623\u0630\u0648\u0646\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 \u0641\u064A ${Utils.escapeHTML(t||"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631")}</td></tr>`;return`<div class="content-card mt-4" id="clinic-approved-timeoff-section">
            <div class="card-header" style="padding:12px 18px;border-bottom:1px solid #f1f5f9;">
                <h4 style="margin:0;font-size:0.92rem;font-weight:700;color:#134e4a;"><i class="fas fa-check-circle ml-2" style="color:#059669;"></i>\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0648\u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 (${Utils.escapeHTML(t||"")})</h4>
            </div>
            <div class="card-body" style="padding:0;">
                ${this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
                    <thead><tr><th>\u0627\u0644\u0645\u0633\u0626\u0648\u0644</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th><th>\u0627\u0644\u0633\u0628\u0628</th><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th></tr></thead>
                    <tbody>${i}</tbody>
                </table>`)}
            </div>
        </div>`},_renderBalanceTriplet(e,t,a){const i=e??0,n=t??0,s=a??0,o=i>0&&s<=0?"#dc2626":"#059669";return`<span style="font-size:0.76rem;white-space:nowrap;line-height:1.5;">
            <span style="color:#64748b;">\u0645\u0633\u062A\u062D\u0642 <strong>${i}</strong></span>
            <span style="color:#cbd5e1;"> \xB7 </span>
            <span style="color:#d97706;">\u0645\u0633\u062A\u0646\u0641\u0630 <strong>${n}</strong></span>
            <span style="color:#cbd5e1;"> \xB7 </span>
            <span style="color:${o};">\u0645\u062A\u0628\u0642\u064A <strong>${s}</strong></span>
        </span>`},renderClinicStaffLeaveBalancesSection(e){e=e||{};const t=e.balances||[],a=!!e.loading,i=e.month||"",n=e.year||"",s=this.canViewAllAttendanceData();if(!s&&!t.length&&!a)return"";const o=s?7:6,l=a&&!t.length?`<tr><td colspan="${o}" class="text-center text-gray-500 py-8"><i class="fas fa-spinner fa-spin ml-2" style="color:#0d9488;"></i>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0631\u0635\u062F\u0629...</td></tr>`:t.length?t.map(r=>{const c=r.month||{},d=r.year||{};return`<tr>
                    <td>${Utils.escapeHTML(r.userName||"\u2014")}</td>
                    <td>${Utils.escapeHTML(this.getStaffRoleLabel(r.staffRole))}</td>
                    <td>${this._renderBalanceTriplet(c.leaveEntitled,c.leaveConsumed,c.leaveRemaining)}</td>
                    <td>${this._renderBalanceTriplet(c.permissionEntitled,c.permissionConsumed,c.permissionRemaining)}</td>
                    <td>${this._renderBalanceTriplet(d.leaveEntitled,d.leaveConsumed,d.leaveRemaining)}</td>
                    <td>${this._renderBalanceTriplet(d.permissionEntitled,d.permissionConsumed,d.permissionRemaining)}</td>
                    ${s?`<td><button type="button" class="btn-secondary btn-sm clinic-leave-quota-edit-btn" data-staff-id="${Utils.escapeAttr(r.staffId)}" data-staff-name="${Utils.escapeAttr(r.userName||"")}"><i class="fas fa-edit ml-1"></i>\u062A\u0639\u062F\u064A\u0644</button></td>`:""}
                </tr>`}).join(""):`<tr><td colspan="${o}" class="text-center text-gray-500 py-6">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u0626\u0648\u0644\u0648\u0646</td></tr>`;return`<div class="content-card mt-4" id="clinic-leave-balances-section">
            <div class="card-header" style="padding:14px 18px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;align-items:center;">
                <h4 style="margin:0;font-size:0.95rem;font-weight:700;color:#134e4a;"><i class="fas fa-wallet ml-2" style="color:#0d9488;"></i>\u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0648\u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A</h4>
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                    <label style="font-size:0.72rem;color:#64748b;font-weight:600;">\u0627\u0644\u0634\u0647\u0631</label>
                    <input type="month" id="clinic-leave-balance-month" class="form-input" style="padding:6px 10px;font-size:0.8rem;width:auto;" value="${Utils.escapeAttr(i)}">
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
                        <th>\u0625\u062C\u0627\u0632\u0629 (${Utils.escapeHTML(i)})</th>
                        <th>\u0623\u0630\u0648\u0646\u0627\u062A (${Utils.escapeHTML(i)})</th>
                        <th>\u0625\u062C\u0627\u0632\u0629 (${Utils.escapeHTML(n)})</th>
                        <th>\u0623\u0630\u0648\u0646\u0627\u062A (${Utils.escapeHTML(n)})</th>
                        ${s?"<th>\u0625\u062C\u0631\u0627\u0621</th>":""}
                    </tr></thead>
                    <tbody>${l}</tbody>
                </table>`)}
            </div>
        </div>`},_isClinicRpcActionMissing_(e){const t=String(e||"");return/غير معترف|ACTION_NOT_RECOGNIZED|Action not recognized|الإجراء غير معروف/i.test(t)},async upsertClinicStaffLeaveQuotaOnServer_(e){if(!e?.staffId)return{success:!1,message:"\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0645\u0637\u0644\u0648\u0628"};try{return await GoogleIntegration.sendRequest({action:"upsertClinicStaffLeaveQuota",data:e})}catch(t){if(!this._isClinicRpcActionMissing_(t?.message))throw t;return this._upsertClinicStaffLeaveQuotaViaSheet_(e)}},async _upsertClinicStaffLeaveQuotaViaSheet_(e){if(!this.isCurrentUserAdmin())return{success:!1,message:"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0631\u0635\u064A\u062F \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637"};const t="ClinicStaffLeaveQuota",a=String(e.periodType||"month").trim().toLowerCase(),i=String(e.periodKey||"").trim();if(!i)return{success:!1,message:"\u062D\u062F\u062F \u0627\u0644\u0641\u062A\u0631\u0629"};await this._ensureClinicStaffLoadedForAttendance();const n=(AppState.appData.clinicStaff||[]).find(m=>m&&String(m.id)===String(e.staffId));if(!n)return{success:!1,message:"\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"};let s=parseFloat(e.leaveDaysQuota);(isNaN(s)||s<0)&&(s=0);let o=parseInt(e.permissionCountQuota,10);(isNaN(o)||o<0)&&(o=0),typeof GoogleIntegration.invalidateReadFromSheetCacheForSheets=="function"&&GoogleIntegration.invalidateReadFromSheetCacheForSheets(t);const l=await GoogleIntegration.readFromSheets(t,3e4),r=Array.isArray(l)?[...l]:[],c=r.findIndex(m=>m&&String(m.staffId)===String(e.staffId)&&String(m.periodType)===a&&String(m.periodKey)===i),d=AppState.currentUser||{},p=new Date().toISOString(),f={staffId:n.id,userId:n.userId||"",userEmail:n.userEmail||"",userName:n.userName||"",periodType:a,periodKey:i,leaveDaysQuota:s,permissionCountQuota:o,notes:String(e.notes||"").trim(),updatedById:d.id||d.userId||"",updatedByName:d.name||"",updatedAt:p};let u;return c>=0?(f.id=r[c].id,f.createdAt=r[c].createdAt||p,Object.assign(r[c],f),u=await GoogleIntegration.saveToSheets(t,r)):(f.id=typeof Utils<"u"&&Utils.generateSequentialId?Utils.generateSequentialId("CLQ",r):`CLQ-${Date.now()}`,f.createdAt=p,u=await GoogleIntegration.saveToSheets(t,[...r,f]),u?.success||(u=await GoogleIntegration.appendToSheets(t,f))),u?.success&&typeof GoogleIntegration.invalidateReadFromSheetCacheForSheets=="function"&&GoogleIntegration.invalidateReadFromSheetCacheForSheets(t),u?.success?{success:!0,data:c>=0?r[c]:f,message:"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u0646\u062C\u0627\u062D"}:u||{success:!1,message:"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F"}},showClinicStaffLeaveQuotaModal(e,t){if(!this.isCurrentUserAdmin()||!e)return;const i=this.getClinicStaffLeaveBalancesList().find(v=>String(v.staffId)===String(e))||{},n=this._getLeaveBalancePeriodDefaults(),s=i.month||{},o=i.year||{},l=document.getElementById("clinic-leave-quota-modal");l&&l.remove();const r=document.createElement("div");r.id="clinic-leave-quota-modal",r.className="modal-overlay",r.innerHTML=`
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
                            <input type="number" id="clinic-leave-quota-days" class="form-input" min="0" step="0.5" value="${s.leaveEntitled??0}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-1">\u0639\u062F\u062F \u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A</label>
                            <input type="number" id="clinic-leave-quota-perms" class="form-input" min="0" step="1" value="${s.permissionEntitled??0}">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                        <textarea id="clinic-leave-quota-notes" class="form-textarea" rows="2" placeholder="\u0627\u062E\u062A\u064A\u0627\u0631\u064A">${Utils.escapeHTML(s.quotaNotes||"")}</textarea>
                    </div>
                    <p class="text-xs text-gray-500">\u0627\u0644\u062D\u0627\u0644\u064A \u0634\u0647\u0631\u064A\u0627\u064B: \u0625\u062C\u0627\u0632\u0629 ${s.leaveConsumed??0}/${s.leaveEntitled??0} \xB7 \u0623\u0630\u0648\u0646\u0627\u062A ${s.permissionConsumed??0}/${s.permissionEntitled??0}</p>
                    <p class="text-xs text-gray-500">\u0627\u0644\u062D\u0627\u0644\u064A \u0633\u0646\u0648\u064A\u0627\u064B: \u0625\u062C\u0627\u0632\u0629 ${o.leaveConsumed??0}/${o.leaveEntitled??0} \xB7 \u0623\u0630\u0648\u0646\u0627\u062A ${o.permissionConsumed??0}/${o.permissionEntitled??0}</p>
                </div>
                <div class="modal-footer flex gap-2 justify-end">
                    <button type="button" class="btn-secondary" id="clinic-leave-quota-cancel">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" class="btn-primary" id="clinic-leave-quota-save"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F</button>
                </div>
            </div>`,document.body.appendChild(r);const c=r.querySelector("#clinic-leave-quota-period-type"),d=r.querySelector("#clinic-leave-quota-month-wrap"),p=r.querySelector("#clinic-leave-quota-year-wrap"),f=r.querySelector("#clinic-leave-quota-days"),u=r.querySelector("#clinic-leave-quota-perms"),m=r.querySelector("#clinic-leave-quota-notes"),g=()=>{const v=c.value==="year";d.classList.toggle("hidden",v),p.classList.toggle("hidden",!v);const h=v?o:s;f.value=h.leaveEntitled??0,u.value=h.permissionEntitled??0,m.value=h.quotaNotes||""};c.addEventListener("change",g),g();const y=()=>r.remove();r.querySelector("#clinic-leave-quota-close")?.addEventListener("click",y),r.querySelector("#clinic-leave-quota-cancel")?.addEventListener("click",y),r.addEventListener("click",v=>{v.target===r&&y()}),r.querySelector("#clinic-leave-quota-save")?.addEventListener("click",async()=>{const v=c.value,h=v==="year"?String(r.querySelector("#clinic-leave-quota-year")?.value||"").trim():String(r.querySelector("#clinic-leave-quota-month")?.value||"").trim();if(!h){Notification?.error?.("\u062D\u062F\u062F \u0627\u0644\u0634\u0647\u0631 \u0623\u0648 \u0627\u0644\u0633\u0646\u0629");return}Loading.show();try{const w=await this.upsertClinicStaffLeaveQuotaOnServer_({staffId:e,periodType:v,periodKey:h,leaveDaysQuota:f.value,permissionCountQuota:u.value,notes:m.value?.trim()||""});if(w?.success)this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!0),this._leaveBalancesFetchedInSession=!0,Loading.hide(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u0646\u062C\u0627\u062D"),y(),this.renderAttendanceTab({force:!0});else throw new Error(w?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(w){Loading.hide(),Notification?.error?.(w?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F")}})},bindClinicStaffLeaveBalanceEvents(e){if(!e)return;const t=()=>{const a=e.querySelector("#clinic-leave-balance-month")?.value||"",i=e.querySelector("#clinic-leave-balance-year")?.value||"";this.state.leaveBalanceMonth=a||this._getLeaveBalancePeriodDefaults().month,this.state.leaveBalanceYear=i||this._getLeaveBalancePeriodDefaults().year,this._leaveBalancesFetchedInSession=!1,this.loadClinicStaffLeaveBalances(!0).then(()=>{this._leaveBalancesFetchedInSession=!0,this.renderAttendanceTab({force:!0})})};e.querySelector("#clinic-leave-balance-month")?.addEventListener("change",t),e.querySelector("#clinic-leave-balance-year")?.addEventListener("change",t),e.querySelector("#clinic-leave-balance-refresh-btn")?.addEventListener("click",()=>{this._leaveBalancesFetchedInSession=!1,this.loadClinicStaffLeaveBalances(!0).then(()=>{this._leaveBalancesFetchedInSession=!0,this.renderAttendanceTab({force:!0})})}),e.querySelectorAll(".clinic-leave-quota-edit-btn").forEach(a=>{a.addEventListener("click",()=>{this.showClinicStaffLeaveQuotaModal(a.dataset.staffId,a.dataset.staffName)})})},_mergeAttendanceRowsByUserDay(e){if(!Array.isArray(e)||!e.length)return[];const t=new Map,a=[],i=s=>{let o="",l=1/0;return s.filter(Boolean).forEach(r=>{const c=new Date(r).getTime();!Number.isNaN(c)&&c<l&&(l=c,o=r)}),o},n=s=>{let o="",l=-1/0;return s.filter(Boolean).forEach(r=>{const c=new Date(r).getTime();!Number.isNaN(c)&&c>l&&(l=c,o=r)}),o};return e.forEach(s=>{if(!s)return;const o=this._attendanceDayKey(s.date),l=String(s.staffId||s.userId||s.userEmail||"").trim().toLowerCase(),r=`${o}|${l}`;if(!t.has(r)){t.set(r,{...s,date:o||s.date}),a.push(r);return}const c=t.get(r);if(c.checkIn=i([c.checkIn,s.checkIn])||c.checkIn||s.checkIn,c.checkOut=n([c.checkOut,s.checkOut])||c.checkOut||s.checkOut,c.checkIn&&c.checkOut){const d=new Date(c.checkIn).getTime(),p=new Date(c.checkOut).getTime();!Number.isNaN(d)&&!Number.isNaN(p)&&p>d&&(c.workDuration=Math.round((p-d)/36e5*100)/100)}}),a.map(s=>t.get(s))},async notifyAdminAboutDeletionRequest(e){try{const t=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(t&&t.success&&Array.isArray(t.data)){const a=t.data.filter(i=>this._isUsersSheetAdminRecord(i));for(const i of a)i.id&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:i.id,title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621",message:`\u0637\u0644\u0628 ${AppState.currentUser?.name||"\u0645\u0633\u062A\u062E\u062F\u0645"} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${e.name||""}"`,type:"approval_request",priority:"high",link:"#clinic-approvals",data:{module:"clinic",action:"medication_deletion",medicationId:e.id}}}).catch(n=>{Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",n)})}}catch(t){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A:",t)}},async notifyAdminAboutSupplyRequest(e){try{const t=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(t&&t.success&&Array.isArray(t.data)){const a=t.data.filter(n=>this._isUsersSheetAdminRecord(n)),i={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[e.type]||e.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";for(const n of a)n.id&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:n.id,title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u062D\u062A\u064A\u0627\u062C",message:`\u0637\u0644\u0628 ${AppState.currentUser?.name||"\u0645\u0633\u062A\u062E\u062F\u0645"} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 ${i}: "${e.itemName||""}"`,type:"approval_request",priority:e.priority==="urgent"?"high":"normal",link:"#clinic-approvals",data:{module:"clinic",action:"supply_request",requestId:e.id}}}).catch(s=>{Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",s)})}}catch(t){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A:",t)}},getMonthlyVisitsAlertThreshold(){try{const e=AppState.companySettings?.clinicMonthlyVisitsAlertThreshold;if(e==null||e==="")return 10;const t=parseInt(e,10);return isNaN(t)||t<1?10:Math.min(1e3,t)}catch{return 10}},DEFAULT_VISIT_TYPES:["\u0637\u0648\u0627\u0631\u0626","\u0627\u0635\u0627\u0628\u0629 \u0639\u0645\u0644","\u0645\u0631\u0636","\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629","\u0641\u062D\u0635 \u062F\u0648\u0631\u064A","\u0645\u062A\u0627\u0628\u0639\u0629","\u0641\u062D\u0635 \u0645\u0627\u0642\u0628\u0644 \u0627\u0644\u062A\u0639\u064A\u064A\u0646","\u062A\u062D\u0644\u064A\u0644 \u0645\u062E\u062F\u0627\u0631\u062A"],DEFAULT_CONTRACTOR_JOB_TITLES:["\u0645\u0647\u0646\u062F\u0633","\u0645\u0634\u0631\u0641","\u0639\u0627\u0645\u0644","\u0639\u0627\u0645\u0644\u0629","\u0641\u0646\u064A","\u0644\u062D\u0627\u0645","\u0628\u0631\u0627\u062F"],getVisitTypeOptions(){let e=AppState.companySettings?.clinicVisitTypes;if(typeof e=="string"){const a=e.trim();if(a)try{e=JSON.parse(a)}catch{e=a.split(/\n|,/).map(n=>n.trim()).filter(Boolean)}else e=[]}(!Array.isArray(e)||e.length===0)&&AppState.appData?.clinicVisitTypes&&(e=AppState.appData.clinicVisitTypes);const t=Array.isArray(e)&&e.length>0?e.map(a=>typeof a=="string"?a.trim():String(a)).filter(Boolean):(this.DEFAULT_VISIT_TYPES||[]).slice();return t.some(a=>this.normalizeArabicText(a)===this.normalizeArabicText("\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629"))||t.push("\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629"),t},getContractorJobTitleOptions(){let e=AppState.companySettings?.clinicContractorJobTitles;if(typeof e=="string"){const i=e.trim();if(i)try{e=JSON.parse(i)}catch{e=i.split(/\n|,/).map(s=>s.trim()).filter(Boolean)}else e=[]}(!Array.isArray(e)||e.length===0)&&Array.isArray(AppState.appData?.clinicContractorJobTitles)&&(e=AppState.appData.clinicContractorJobTitles);const t=Array.isArray(e)&&e.length>0?e:this.DEFAULT_CONTRACTOR_JOB_TITLES,a=new Set;return(t||[]).map(i=>String(i||"").trim()).filter(i=>{const n=this.normalizeArabicText(i);return!n||a.has(n)?!1:(a.add(n),!0)})},isMedicationDispenseVisitType_(e){return this.normalizeArabicText(e)===this.normalizeArabicText("\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629")},getVisitReasonSuggestions_(e={}){const t=f=>{const u=String(f||"").trim().toLowerCase();return u==="employee"||u.includes("\u0645\u0648\u0638")?"employee":u==="contractor"||u==="external"||u.includes("\u0645\u0642\u0627\u0648\u0644")||u.includes("\u062E\u0627\u0631\u062C")?"contractor":u},a=(Array.isArray(AppState.appData?.clinicVisits)?AppState.appData.clinicVisits:[]).concat(Array.isArray(AppState.appData?.clinicContractorVisits)?AppState.appData.clinicContractorVisits:[]),i=new Set,n=a.filter(f=>{if(!f)return!1;const u=String(f.id||"").trim();return u?i.has(u)?!1:(i.add(u),!0):!0}),s=t(e.personType),o=this.normalizeArabicText(e.visitType),l=String(e.employeeCode||"").trim().toLowerCase(),r=this.normalizeArabicText(e.contractorName),c=this.normalizeArabicText(e.contractorWorkerName),d=String(e.currentRecordId||"").trim(),p=new Map;return n.forEach(f=>{if(d&&String(f.id||"").trim()===d)return;const u=String(f.reason||f.visitReason||f.reasonForVisit||"").trim(),m=this.normalizeArabicText(u);if(!m||m==="-"||m===this.normalizeArabicText("\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"))return;const g=t(f.personType||(f.contractorName||f.externalName?"contractor":"employee")),y=this.normalizeArabicText(f.visitType||f.type),v=String(f.employeeCode||f.employeeNumber||"").trim().toLowerCase(),h=this.normalizeArabicText(f.contractorName||f.externalName||(g==="contractor"?f.employeeName:"")),w=this.normalizeArabicText(f.contractorWorkerName),D=f.visitDate||f.createdAt||f.updatedAt,L=D?new Date(D).getTime():0,b=L>0?Math.max(0,(Date.now()-L)/864e5):3650;let A=1+Math.max(0,3-b/180);s&&g===s&&(A+=5),o&&y===o&&(A+=4),s&&o&&g===s&&y===o&&(A+=3),l&&v===l&&(A+=9),r&&h===r&&(A+=6),c&&w===c&&(A+=8);const E=p.get(m)||{reason:u,count:0,score:0,latestAt:0};E.count+=1,E.score+=A,E.latestAt=Math.max(E.latestAt,L||0),L>=E.latestAt&&(E.reason=u),p.set(m,E)}),Array.from(p.values()).sort((f,u)=>u.score-f.score||u.count-f.count||u.latestAt-f.latestAt||f.reason.localeCompare(u.reason,"ar")).slice(0,30)},refreshVisitReasonSuggestions_(e=""){const t=document.getElementById("visit-reason"),a=document.getElementById("visit-reason-datalist"),i=document.getElementById("visit-reason-suggestion-panel"),n=document.getElementById("visit-reason-suggestions"),s=document.getElementById("visit-reason-suggestion-hint");if(!t||!a||!i||!n)return;const o=document.getElementById("visit-contractor-name-select"),l=this.getVisitReasonSuggestions_({personType:document.getElementById("visit-person-type")?.value||"",visitType:document.getElementById("visit-type")?.value||"",employeeCode:document.getElementById("visit-employee-code")?.value||"",contractorName:o?.value||document.getElementById("visit-employee-name")?.value||"",contractorWorkerName:document.getElementById("visit-contractor-worker")?.value||"",currentRecordId:e});a.innerHTML=l.map(c=>{const d=c.count>1?`\u0627\u0633\u062A\u062E\u062F\u0645 ${c.count} \u0645\u0631\u0627\u062A`:"\u0633\u0628\u0628 \u0633\u0627\u0628\u0642";return`<option value="${Utils.escapeHTML(c.reason)}" label="${Utils.escapeHTML(d)}"></option>`}).join("");const r=l.slice(0,6);i.style.display=r.length?"block":"none",n.innerHTML=r.map((c,d)=>`
            <button type="button" class="visit-reason-chip" data-reason="${Utils.escapeHTML(c.reason)}"
                style="display:inline-flex;align-items:center;gap:6px;border:1px solid ${d===0?"#0ea5e9":"#bae6fd"};background:${d===0?"#e0f2fe":"#fff"};color:#0c4a6e;border-radius:999px;padding:7px 11px;font-size:.78rem;font-weight:700;cursor:pointer;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease;">
                <i class="fas fa-history" aria-hidden="true" style="font-size:.68rem;color:#0284c7;"></i>
                <span>${Utils.escapeHTML(c.reason)}</span>
                ${c.count>1?`<small style="background:#0c4a6e;color:#fff;border-radius:999px;min-width:20px;padding:1px 5px;font-size:.64rem;">${c.count}</small>`:""}
            </button>
        `).join(""),s&&(s.textContent=l.length?`\u062A\u0645 \u062A\u0631\u062A\u064A\u0628 ${l.length} \u0633\u0628\u0628\u0627\u064B \u0633\u0627\u0628\u0642\u0627\u064B \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635 \u0648\u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0648\u0627\u0644\u062A\u0643\u0631\u0627\u0631.`:"\u0627\u0643\u062A\u0628 \u0627\u0644\u0633\u0628\u0628 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0648\u0633\u064A\u0638\u0647\u0631 \u0636\u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0641\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0642\u0627\u062F\u0645\u0629."),n.querySelectorAll(".visit-reason-chip").forEach(c=>{c.addEventListener("click",()=>{t.value=c.dataset.reason||"",t.dispatchEvent(new Event("input",{bubbles:!0})),t.focus()}),c.addEventListener("mouseenter",()=>{c.style.transform="translateY(-1px)",c.style.boxShadow="0 6px 16px rgba(14, 165, 233, .16)"}),c.addEventListener("mouseleave",()=>{c.style.transform="",c.style.boxShadow=""})})},normalizeArabicText(e){if(e==null)return"";let t=String(e).trim().toLowerCase();return t=t.replace(/[\u064B-\u065F\u0670]/g,""),t=t.replace(/[أإآ]/g,"\u0627"),t=t.replace(/ة/g,"\u0647"),t=t.replace(/[ى]/g,"\u064A"),t=t.replace(/\s+/g," "),t=t.replace(/[^\w\s\u0600-\u06FF]/g,""),t.trim()},getMonthlyVisitCountForPerson(e){try{if(!e||!e.visitDate)return 0;const t=new Date(e.visitDate);if(isNaN(t.getTime()))return 0;const a=t.getFullYear(),i=t.getMonth(),n=(AppState.appData.clinicVisits||[]).concat(Array.isArray(AppState.appData.clinicContractorVisits)?AppState.appData.clinicContractorVisits:[]),s=new Set,o=n.filter(f=>{if(!f)return!1;const u=String(f.id||"").trim();return u?s.has(u)?!1:(s.add(u),!0):!0}),l=f=>{if(!f||!f.visitDate)return!1;const u=new Date(f.visitDate);return isNaN(u.getTime())?!1:u.getFullYear()===a&&u.getMonth()===i},r=(e.personType||"employee").toString().toLowerCase();if(!(r==="contractor"||r==="external"||r.includes("\u0645\u0642\u0627\u0648\u0644")||r.includes("\u062E\u0627\u0631"))){const f=String(e.employeeCode||e.employeeNumber||"").trim();return f?o.filter(u=>{if(!l(u))return!1;const m=(u.personType||"").toString().toLowerCase();return m==="employee"||m===""||m.includes("\u0645\u0648\u0638")?String(u.employeeCode||u.employeeNumber||"").trim()===f:!1}).length:0}const d=this.normalizeArabicText(e.contractorName||e.externalName),p=this.normalizeArabicText(e.contractorWorkerName);return!d&&!p?0:o.filter(f=>{if(!l(f))return!1;const u=(f.personType||"").toString().toLowerCase();if(!(u==="contractor"||u==="external"||u.includes("\u0645\u0642\u0627\u0648\u0644")||u.includes("\u062E\u0627\u0631")))return!1;const g=this.normalizeArabicText(f.contractorName||f.externalName),y=this.normalizeArabicText(f.contractorWorkerName);return g===d&&y===p}).length}catch(t){return Utils.safeWarn("getMonthlyVisitCountForPerson:",t),0}},showVisitTypesSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getVisitTypeOptions(),t=document.createElement("div");t.className="modal-overlay";const a=s=>s.map((o,l)=>({id:"vt-"+Date.now()+"-"+l,text:String(o).trim()}));let i=a(e);const n=()=>{const s=document.getElementById("clinic-visit-types-list");s&&(s.innerHTML=i.map((o,l)=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-visit-type" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),s.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=i.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),s.querySelectorAll(".remove-visit-type").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");i=i.filter(r=>r.id!==l),n()})}))};t.innerHTML=`
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
        `,document.body.appendChild(t),n(),t.querySelector("#clinic-visit-types-add-row").addEventListener("click",()=>{i.push({id:"vt-"+Date.now()+"-"+i.length,text:""}),n()}),t.querySelector("#clinic-visit-types-reset").addEventListener("click",()=>{i=a(this.DEFAULT_VISIT_TYPES||[]),n()}),t.querySelector("#clinic-visit-types-save").addEventListener("click",async()=>{t.querySelectorAll("#clinic-visit-types-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=i.find(c=>c.id===l);r&&(r.text=o.value.trim())});const s=i.map(o=>o.text).filter(Boolean);if(s.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicVisitTypes=s,(!AppState.companySettings||typeof AppState.companySettings!="object")&&(AppState.companySettings={}),AppState.companySettings.clinicVisitTypes=s;try{const o=AppState.currentUser||{},l={...AppState.companySettings,clinicVisitTypes:s,userData:o},r=await GoogleIntegration.sendRequest({action:"saveCompanySettings",data:l});if(!r||r.success!==!0)throw new Error(r&&r.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}catch(o){Notification?.error?.(o?.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0648\u062A\u0639\u0645\u064A\u0645\u0647\u0627 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"),t.remove()}),t.querySelectorAll(".modal-close, .modal-close-btn").forEach(s=>{s.addEventListener("click",()=>t.remove())})},refreshContractorJobTitlesDatalist_(){const e=document.getElementById("visit-contractor-position-datalist"),t=document.getElementById("visit-contractor-position");if(!e||!t)return;const a=this.getContractorJobTitleOptions();e.innerHTML=a.map(i=>`<option value="${Utils.escapeHTML(i)}"></option>`).join("");try{t.dataset.allowedValues=JSON.stringify(a.map(i=>this.normalizeArabicText(i)))}catch{}},showContractorJobTitlesSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=document.createElement("div");e.className="modal-overlay";const t=n=>n.map((s,o)=>({id:`cjt-${Date.now()}-${o}`,text:String(s||"").trim()}));let a=t(this.getContractorJobTitleOptions());e.innerHTML=`
            <div class="modal-content" style="max-width:560px;border-radius:16px;overflow:hidden;">
                <div class="modal-header" style="background:linear-gradient(125deg,#173d6c,#0f766e);color:#fff;">
                    <h2 class="modal-title" style="color:#fff;"><i class="fas fa-briefcase ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</h2>
                    <button type="button" class="modal-close" style="color:#fff;"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" style="padding:20px;background:#f8fafc;">
                    <div style="padding:12px 14px;margin-bottom:14px;border:1px solid #bae6fd;border-radius:10px;background:#f0f9ff;color:#0c4a6e;font-size:.82rem;">
                        \u062A\u0638\u0647\u0631 \u0647\u0630\u0647 \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0641\u064A \u062D\u0642\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \xAB\u0645\u0642\u0627\u0648\u0644\xBB. \u064A\u0645\u0643\u0646 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0648\u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0648\u0627\u0644\u062D\u0630\u0641 \u062B\u0645 \u062D\u0641\u0638\u0647\u0627 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646.
                    </div>
                    <div id="clinic-contractor-job-titles-list"></div>
                    <button type="button" id="clinic-contractor-job-title-add" class="btn-secondary mt-2"><i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0648\u0638\u064A\u0641\u0629</button>
                    <div class="flex flex-wrap gap-2 justify-end mt-4 pt-4 border-t">
                        <button type="button" class="btn-secondary modal-close-btn">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" id="clinic-contractor-job-title-reset" class="btn-secondary">\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A</button>
                        <button type="button" id="clinic-contractor-job-title-save" class="btn-primary"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0648\u062A\u0639\u0645\u064A\u0645</button>
                    </div>
                </div>
            </div>`,document.body.appendChild(e);const i=()=>{const n=e.querySelector("#clinic-contractor-job-titles-list");n&&(n.innerHTML=a.map(s=>`
                <div class="flex items-center gap-2 mb-2" data-id="${s.id}">
                    <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:40px;border-radius:9px;background:#e0f2fe;color:#0369a1;"><i class="fas fa-user-tag"></i></span>
                    <input type="text" class="form-input flex-1 contractor-job-title-edit" data-id="${s.id}" value="${Utils.escapeHTML(s.text)}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u0629">
                    <button type="button" class="btn-icon btn-icon-danger remove-contractor-job-title" data-id="${s.id}" title="\u062D\u0630\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u0629"><i class="fas fa-trash"></i></button>
                </div>`).join(""),n.querySelectorAll(".contractor-job-title-edit").forEach(s=>{s.addEventListener("input",()=>{const o=a.find(l=>l.id===s.dataset.id);o&&(o.text=s.value.trim())})}),n.querySelectorAll(".remove-contractor-job-title").forEach(s=>{s.addEventListener("click",()=>{a=a.filter(o=>o.id!==s.dataset.id),i()})}))};i(),e.querySelector("#clinic-contractor-job-title-add")?.addEventListener("click",()=>{a.push({id:`cjt-${Date.now()}-${a.length}`,text:""}),i()}),e.querySelector("#clinic-contractor-job-title-reset")?.addEventListener("click",()=>{a=t(this.DEFAULT_CONTRACTOR_JOB_TITLES||[]),i()}),e.querySelector("#clinic-contractor-job-title-save")?.addEventListener("click",async n=>{const s=n.currentTarget,o=[],l=new Set;if(a.forEach(c=>{const d=String(c.text||"").trim(),p=this.normalizeArabicText(d);d&&p&&!l.has(p)&&(l.add(p),o.push(d))}),!o.length){Notification?.warning?.("\u0623\u0636\u0641 \u0648\u0638\u064A\u0641\u0629 \u0648\u0627\u062D\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629");return}const r=s.innerHTML;s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...';try{AppState.appData||(AppState.appData={}),(!AppState.companySettings||typeof AppState.companySettings!="object")&&(AppState.companySettings={}),AppState.appData.clinicContractorJobTitles=o,AppState.companySettings.clinicContractorJobTitles=o;const c=await GoogleIntegration.sendRequest({action:"saveCompanySettings",data:{...AppState.companySettings,clinicContractorJobTitles:o,userData:AppState.currentUser||{}}});if(!c||c.success!==!0)throw new Error(c?.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646");typeof DataManager<"u"&&DataManager.save&&DataManager.save(),this.refreshContractorJobTitlesDatalist_(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u062A\u0639\u0645\u064A\u0645\u0647\u0627 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"),e.remove()}catch(c){Notification?.error?.(c?.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"),s.disabled=!1,s.innerHTML=r}}),e.querySelectorAll(".modal-close, .modal-close-btn").forEach(n=>n.addEventListener("click",()=>e.remove()))},DEFAULT_INJURY_TYPES:["\u062C\u0631\u062D","\u0643\u0633\u0631","\u062D\u0631\u0648\u0642","\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u063A\u0629","\u0627\u0644\u062A\u0648\u0627\u0621","\u0623\u062E\u0631\u0649"],getInjuryTypeOptions(){const e=AppState.appData?.clinicInjuryTypes;return Array.isArray(e)&&e.length>0?e.map(t=>typeof t=="string"?t.trim():String(t)).filter(Boolean):(this.DEFAULT_INJURY_TYPES||[]).slice()},showInjuryTypesSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getInjuryTypeOptions(),t=document.createElement("div");t.className="modal-overlay";const a=s=>s.map((o,l)=>({id:"it-"+Date.now()+"-"+l,text:String(o).trim()}));let i=a(e);const n=()=>{const s=document.getElementById("clinic-injury-types-list");s&&(s.innerHTML=i.map(o=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-injury-type" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),s.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=i.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),s.querySelectorAll(".remove-injury-type").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");i=i.filter(r=>r.id!==l),n()})}))};t.innerHTML=`
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
        `,document.body.appendChild(t),n(),t.querySelector("#clinic-injury-types-add-row").addEventListener("click",()=>{i.push({id:"it-"+Date.now()+"-"+i.length,text:""}),n()}),t.querySelector("#clinic-injury-types-reset").addEventListener("click",()=>{i=a(this.DEFAULT_INJURY_TYPES||[]),n()}),t.querySelector("#clinic-injury-types-save").addEventListener("click",()=>{t.querySelectorAll("#clinic-injury-types-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=i.find(c=>c.id===l);r&&(r.text=o.value.trim())});const s=i.map(o=>o.text).filter(Boolean);if(s.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicInjuryTypes=s,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A"),this.state.activeTab==="injuries"&&this.renderInjuriesTab(),t.remove()}),t.querySelectorAll(".modal-close, .modal-close-btn").forEach(s=>{s.addEventListener("click",()=>t.remove())})},DEFAULT_INJURY_BODY_PARTS:["\u0627\u0644\u0631\u0623\u0633","\u0627\u0644\u0639\u064A\u0646","\u0627\u0644\u0648\u062C\u0647","\u0627\u0644\u0631\u0642\u0628\u0629","\u0627\u0644\u0643\u062A\u0641","\u0627\u0644\u0630\u0631\u0627\u0639","\u0627\u0644\u064A\u062F","\u0627\u0644\u0635\u062F\u0631","\u0627\u0644\u0638\u0647\u0631","\u0627\u0644\u0628\u0637\u0646","\u0627\u0644\u0633\u0627\u0642","\u0627\u0644\u0642\u062F\u0645","\u0623\u062E\u0631\u0649"],getInjuryBodyPartOptions(){const e=AppState.appData?.clinicInjuryBodyParts;return Array.isArray(e)&&e.length>0?e.map(t=>typeof t=="string"?t.trim():String(t)).filter(Boolean):(this.DEFAULT_INJURY_BODY_PARTS||[]).slice()},showInjuryBodyPartsSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getInjuryBodyPartOptions(),t=document.createElement("div");t.className="modal-overlay";const a=s=>s.map((o,l)=>({id:"ib-"+Date.now()+"-"+l,text:String(o).trim()}));let i=a(e);const n=()=>{const s=document.getElementById("clinic-injury-body-parts-list");s&&(s.innerHTML=i.map(o=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-injury-body-part" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),s.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=i.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),s.querySelectorAll(".remove-injury-body-part").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");i=i.filter(r=>r.id!==l),n()})}))};t.innerHTML=`
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
        `,document.body.appendChild(t),n(),t.querySelector("#clinic-injury-body-parts-add-row").addEventListener("click",()=>{i.push({id:"ib-"+Date.now()+"-"+i.length,text:""}),n()}),t.querySelector("#clinic-injury-body-parts-reset").addEventListener("click",()=>{i=a(this.DEFAULT_INJURY_BODY_PARTS||[]),n()}),t.querySelector("#clinic-injury-body-parts-save").addEventListener("click",()=>{t.querySelectorAll("#clinic-injury-body-parts-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=i.find(c=>c.id===l);r&&(r.text=o.value.trim())});const s=i.map(o=>o.text).filter(Boolean);if(s.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicInjuryBodyParts=s,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645"),this.state.activeTab==="injuries"&&this.renderInjuriesTab(),t.remove()}),t.querySelectorAll(".modal-close, .modal-close-btn").forEach(s=>{s.addEventListener("click",()=>t.remove())})},async notifyAdminsAboutHighClinicVisits(e,t){try{const a=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(!a||!a.success||!Array.isArray(a.data))return;const i=a.data.filter(r=>{const c=(r.role||"").toLowerCase();return c==="admin"||c==="\u0645\u062F\u064A\u0631"}),n=this.getMonthlyVisitsAlertThreshold(),s=(e.personType||"").toString().toLowerCase()==="employee"?e.employeeName||e.employeeCode||"\u0645\u0648\u0638\u0641":e.contractorWorkerName||e.contractorName||e.externalName||"\u0645\u0642\u0627\u0648\u0644/\u0639\u0627\u0645\u0644",o="\u062A\u0646\u0628\u064A\u0647: \u062A\u0631\u062F\u062F \u0639\u0627\u0644\u064D \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",l=`\u0627\u0644\u0645\u0648\u0638\u0641/\u0627\u0644\u0645\u0642\u0627\u0648\u0644 "${s}" \u0628\u0644\u063A \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A\u0647 \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 ${t} \u0632\u064A\u0627\u0631\u0629 (\u0627\u0644\u062D\u062F ${n}).`;for(const r of i)if(r.id||r.email)try{await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:r.id||r.email,title:o,message:l,type:"clinic_high_visits",priority:"high",link:"#clinic",data:{module:"clinic",action:"high_monthly_visits",personType:e.personType,monthlyCount:t,personLabel:s}}})}catch(c){Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0644\u0644\u0645\u062F\u064A\u0631:",c)}}catch(a){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646:",a)}},exportMedicationsToExcel(){const e=this.getFilteredMedications();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map(s=>{const o=s.quantityAdded??s.quantity??0,l=s.remainingQuantity??s.quantity??0,r=Math.max(0,o-l);return{"\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621":s.name||"","\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621":s.type||"",\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645:s.usage||s.notes||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621":s.purchaseDate?this.formatDate(s.purchaseDate):"","\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629":s.expiryDate?this.formatDate(s.expiryDate):"",\u0627\u0644\u062D\u0627\u0644\u0629:s.status||"\u0633\u0627\u0631\u064A","\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629":s.daysRemaining??"",\u0627\u0644\u0643\u0645\u064A\u0629:o,\u0627\u0644\u0645\u0646\u0635\u0631\u0641:r,\u0627\u0644\u0631\u0635\u064A\u062F:l}}),a=XLSX.utils.book_new(),i=XLSX.utils.json_to_sheet(t);XLSX.utils.book_append_sheet(a,i,"Medications");const n=`Clinic_Medications_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n)},async exportMedicationsToPDF(){const e=this.getFilteredMedications();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}try{Notification?.info?.("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const{success:t,doc:a}=await this._createClinicPdfWithFont({orientation:"landscape",format:"a4",fontUrl:"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf",fontFamily:"Amiri"});if(!t||!a)throw new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 PDF \u0623\u0648 \u0627\u0644\u062E\u0637 \u0627\u0644\u0639\u0631\u0628\u064A");const i=8,n=a.internal.pageSize.getWidth(),s=a.internal.pageSize.getHeight(),o=n/2,l=AppState?.companySettings?.name||AppState?.companySettings?.companyName||"\u0634\u0631\u0643\u0629",r=AppState?.companySettings?.secondaryName||"",c=AppState?.companySettings?.address||"",d=AppState?.companySettings?.phone||"",p=AppState?.companySettings?.email||"",f=AppState?.companySettings?.formVersion||"1.0",u=AppState?.companyLogo||"",m=`CLINIC-MED-${new Date().toISOString().slice(0,10)}`,g=new Date().toLocaleDateString("ar-SA");let y=8;if(u)try{a.addImage(u,"PNG",i,y-1,15,10)}catch{}const v=i+(u?18:0);a.setFontSize(10),a.setTextColor(15,23,42),a.text(l,v,y+3),r&&(a.setFontSize(7),a.setTextColor(107,114,128),a.text(r,v,y+9));const h=[c,d,p].filter(Boolean).join(" | ");h&&(a.setFontSize(5),a.setTextColor(148,163,184),a.text(h,v,r?y+15:y+9)),a.setFontSize(12),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",n-i,y+3,{align:"right"}),a.setFontSize(5),a.setTextColor(148,163,184),a.text(m,n-i,y+9,{align:"right"});const w=h?r?y+21:y+15:r?y+15:y+9;a.setDrawColor(0,56,101),a.setLineWidth(.6),a.line(i,w,n-i,w),y=w+4,a.setFillColor(0,56,101),a.rect(0,y,n,8,"F"),a.setFontSize(7),a.setTextColor(255),a.text(l,i,y+5.5),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,y+5.5,{align:"center"}),y+=12,a.setFontSize(14),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,y,{align:"center"}),a.setFontSize(7),a.setTextColor(100),a.text(`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631: ${g}`,i,y+7),a.text(`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${e.length}`,n-i,y+7,{align:"right"}),y+=11;const D=e.filter(x=>x.status==="\u0633\u0627\u0631\u064A").length,L=e.filter(x=>x.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621").length,b=e.filter(x=>x.status==="\u0645\u0646\u062A\u0647\u064A").length,A=e.length,E=[{label:"\u0633\u0627\u0631\u064A",value:D,bg:[232,245,233],accent:[46,125,50],tc:[27,94,32]},{label:"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",value:L,bg:[255,243,224],accent:[245,124,0],tc:[230,81,0]},{label:"\u0645\u0646\u062A\u0647\u064A",value:b,bg:[251,233,231],accent:[211,47,47],tc:[183,28,28]},{label:"\u0625\u062C\u0645\u0627\u0644\u064A",value:A,bg:[227,242,253],accent:[21,101,192],tc:[13,71,161]}],R=(n-2*i-9)/4,q=13;E.forEach((x,S)=>{const C=i+S*(R+3);a.setFillColor(x.bg[0],x.bg[1],x.bg[2]),a.setDrawColor(220),a.setLineWidth(.3),a.roundedRect(C,y,R,q,2,2,"FD"),a.setFillColor(x.accent[0],x.accent[1],x.accent[2]),a.rect(C,y,1.5,q,"F"),a.setFontSize(6),a.setTextColor(x.accent[0],x.accent[1],x.accent[2]),a.text(x.label,C+4,y+4.5),a.setFontSize(11),a.setTextColor(x.tc[0],x.tc[1],x.tc[2]),a.text(String(x.value),C+R-4,y+q-2.5,{align:"right"})}),y+=q+9;const U={\u0633\u0627\u0631\u064A:[46,125,50],"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":[255,152,0],\u0645\u0646\u062A\u0647\u064A:[198,40,40]};a.autoTable({startY:y,head:[["#","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621","\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","\u0627\u0644\u062D\u0627\u0644\u0629","\u0627\u0644\u0623\u064A\u0627\u0645","\u0627\u0644\u0643\u0645\u064A\u0629","\u0627\u0644\u0645\u0646\u0635\u0631\u0641","\u0627\u0644\u0631\u0635\u064A\u062F"]],body:e.map((x,S)=>{const C=x.quantityAdded??x.quantity??0,$=x.remainingQuantity??x.quantity??0,N=Math.max(0,C-$);return[S+1,x.name||"",x.type||"",x.usage||x.notes||"\u2014",this.formatDate(x.purchaseDate),x.expiryDate?this.formatDate(x.expiryDate):"\u2014",{content:x.status||"\u0633\u0627\u0631\u064A",styles:{textColor:U[x.status]||[0,0,0]}},x.daysRemaining??"\u2014",C,N,$]}),styles:{font:"Amiri",fontSize:6.5,cellPadding:1.5,halign:"right"},headStyles:{fillColor:[0,56,101],textColor:255,fontSize:7,halign:"center"},alternateRowStyles:{fillColor:[245,247,250]},columnStyles:{0:{halign:"center",cellWidth:8},6:{halign:"center"},7:{halign:"center"},8:{halign:"center",cellWidth:10},9:{halign:"center",cellWidth:10},10:{halign:"center",cellWidth:10}},margin:{left:i,right:i},didDrawPage:function(x){const S=a.internal.getNumberOfPages();a.setFillColor(0,56,101),a.rect(0,0,n,6,"F"),a.setFontSize(6),a.setTextColor(255),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,4.5,{align:"center"}),a.setDrawColor(0,56,101),a.setLineWidth(.3),a.line(i,s-9,n-i,s-9),a.setFontSize(5.5),a.setTextColor(148,163,184),a.text(`\u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${f}`,i,s-5),a.text(m,o,s-5,{align:"center"}),a.text(`${g} | \u0635\u0641\u062D\u0629 ${S}`,n-i,s-5,{align:"right"})}});const j=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_${new Date().toISOString().slice(0,10)}.pdf`;a.save(j),Notification?.success?.(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (${e.length} \u0633\u062C\u0644)`)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u062A\u062C\u0631\u0628\u0629 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",t),this._fallbackPrintMedicationsPDF(e)}},_fallbackPrintMedicationsPDF(e){const a=`<table><thead><tr>
            <th>\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621</th><th>\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621</th><th>\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</th>
            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621</th><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</th>
            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629</th>
            <th>\u0627\u0644\u0643\u0645\u064A\u0629</th><th>\u0627\u0644\u0645\u0646\u0635\u0631\u0641</th><th>\u0627\u0644\u0631\u0635\u064A\u062F</th>
        </tr></thead><tbody>${e.map(s=>{const o=s.quantityAdded??s.quantity??0,l=s.remainingQuantity??s.quantity??0,r=Math.max(0,o-l);return`<tr>
                <td>${Utils.escapeHTML(s.name||"")}</td>
                <td>${Utils.escapeHTML(s.type||"")}</td>
                <td>${Utils.escapeHTML(s.usage||s.notes||"\u2014")}</td>
                <td>${this.formatDate(s.purchaseDate)}</td>
                <td>${s.expiryDate?this.formatDate(s.expiryDate):"\u2014"}</td>
                <td>${Utils.escapeHTML(s.status||"\u0633\u0627\u0631\u064A")}</td>
                <td>${s.daysRemaining??"\u2014"}</td>
                <td class="text-center">${o}</td>
                <td class="text-center">${r}</td>
                <td class="text-center">${l}</td>
            </tr>`}).join("")}</tbody></table>`,i=`CLINIC-MED-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(i,"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const s=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(s),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(s){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",s),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629")}},async _createClinicPdfWithFont({orientation:e="portrait",format:t="a4",fontUrl:a,fontFamily:i}={}){const n=typeof Utils<"u"&&Utils.PdfExport?Utils.PdfExport.getJsPdfConstructor():window.jspdf?.jsPDF||window.jsPDF?.jsPDF||window.jsPDF||null;if(!n)return{success:!1};const s=[a,"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf","https://fonts.googleapis.com/css2?family=Amiri&display=swap"].filter(Boolean);try{if(!this._arabicFontBase64){let l=!1;for(const r of s)try{const c=await fetch(r,{cache:"force-cache"});if(!c.ok)continue;if(c.headers.get("content-type")?.includes("text/css")){const p=(await c.text()).match(/url\(([^)]+\.ttf)\)/);if(!p)continue;const f=await fetch(p[1],{cache:"force-cache"});if(!f.ok)continue;this._arabicFontBase64=await f.blob().then(u=>new Promise(m=>{const g=new FileReader;g.onload=()=>m(g.result.split(",")[1]),g.readAsDataURL(u)}))}else{const d=await c.blob();this._arabicFontBase64=await new Promise(p=>{const f=new FileReader;f.onload=()=>p(f.result.split(",")[1]),f.readAsDataURL(d)})}l=!0;break}catch{continue}if(!l)return{success:!1}}const o=new n(e,"mm",t);return o.addFileToVFS(i+".ttf",this._arabicFontBase64),o.addFont(i+".ttf",i,"normal"),o.setFont(i),{success:!0,doc:o}}catch(o){return Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 PDF:",o),{success:!1,error:o}}},renderSickLeaveTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="sickLeave"]');if(!e)return;const t=this.state.filters.sickLeave||{},a=this.getSickLeaves(),i=this.getFilteredSickLeaves(),n=this.getClinicDepartments(),s=["search","department","dateFrom","dateTo"].filter(p=>String(t[p]||"").trim()).length,o=i.reduce((p,f)=>{const u=f.daysCount??this.calculateSickLeaveDays(f.startDate,f.endDate);return p+(parseInt(u,10)||0)},0),l=i.length?(o/i.length).toFixed(1):"0",r=new Set(i.map(p=>p.employeeDepartment).filter(Boolean)).size,c=i.map((p,f)=>{const u=p.employeeName||p.personName||"",m=p.employeeDepartment||"\u2014",g=this.formatDate(p.startDate),y=this.formatDate(p.endDate),v=p.daysCount??this.calculateSickLeaveDays(p.startDate,p.endDate),h=p.treatingDoctor||"\u2014",w=p.employeeCode||p.employeeNumber||"",D=String(u||"\u061F").trim().charAt(0)||"\u061F";return`
                <tr>
                    <td class="sl-serial-cell"><span>${f+1}</span></td>
                    <td>
                        <div class="sl-person-cell">
                            <span class="sl-person-avatar">${Utils.escapeHTML(D)}</span>
                            <span class="sl-person-copy">
                                <strong>${Utils.escapeHTML(u||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</strong>
                                ${w?`<small><i class="fas fa-id-badge"></i>${Utils.escapeHTML(w)}</small>`:""}
                            </span>
                        </div>
                    </td>
                    <td><span class="sl-department-chip"><i class="fas fa-building"></i>${Utils.escapeHTML(m)}</span></td>
                    <td><span class="sl-date-cell"><i class="far fa-calendar-alt"></i>${g}</span></td>
                    <td><span class="sl-date-cell"><i class="far fa-calendar-check"></i>${y}</span></td>
                    <td class="text-center"><span class="sl-days-badge"><strong>${v}</strong><small>\u064A\u0648\u0645</small></span></td>
                    <td><span class="sl-doctor-cell"><i class="fas fa-user-md"></i>${Utils.escapeHTML(h)}</span></td>
                    <td class="text-center sl-actions-cell">
                        <div class="sl-row-actions">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-sick-leave" data-id="${Utils.escapeHTML(p.id||"")}" title="\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629" aria-label="\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button" class="btn-icon btn-icon-warning" data-action="edit-sick-leave" data-id="${Utils.escapeHTML(p.id||"")}" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629" aria-label="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `}).join(""),d=i.length?`
                <div class="sl-table-scroll clinic-table-wrapper">
                    <table class="sl-table">
                        <thead>
                            <tr>
                                <th class="text-center"><span class="sl-th"><i class="fas fa-hashtag"></i>\u0645</span></th>
                                <th><span class="sl-th"><i class="fas fa-user-injured"></i>\u0627\u0644\u0645\u0648\u0638\u0641</span></th>
                                <th><span class="sl-th"><i class="fas fa-sitemap"></i>\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</span></th>
                                <th><span class="sl-th"><i class="fas fa-calendar-plus"></i>\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</span></th>
                                <th><span class="sl-th"><i class="fas fa-calendar-check"></i>\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</span></th>
                                <th class="text-center"><span class="sl-th"><i class="fas fa-hourglass-half"></i>\u0627\u0644\u0645\u062F\u0629</span></th>
                                <th><span class="sl-th"><i class="fas fa-user-md"></i>\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C</span></th>
                                <th class="text-center"><span class="sl-th"><i class="fas fa-cogs"></i>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${c}
                        </tbody>
                    </table>
                </div>
            `:`
                <div class="sl-empty-state">
                    <span class="sl-empty-icon"><i class="fas fa-file-medical-alt"></i></span>
                    <h3>${s?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629 \u0645\u0633\u062C\u0644\u0629"}</h3>
                    <p>${s?"\u062C\u0631\u0651\u0628 \u062A\u0639\u062F\u064A\u0644 \u0643\u0644\u0645\u0627\u062A \u0627\u0644\u0628\u062D\u062B \u0623\u0648 \u0645\u0633\u062D \u0623\u062D\u062F \u0627\u0644\u0641\u0644\u0627\u062A\u0631.":"\u0633\u062A\u0638\u0647\u0631 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0647\u0646\u0627 \u0628\u0639\u062F \u0625\u0636\u0627\u0641\u062A\u0647\u0627."}</p>
                    ${s?'<button type="button" id="sick-leave-empty-reset" class="sl-reset-inline"><i class="fas fa-undo-alt"></i>\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631</button>':""}
                </div>`;e.innerHTML=`
            <style>
                #clinic-sick-leave-root{--sl-navy:#12365f;--sl-navy-deep:#0b2848;--sl-teal:#0f8b83;--sl-orange:#f59e0b;--sl-ink:#183047;--sl-muted:#64748b;--sl-line:#dbe7ef;--sl-pale:#f3f8fb;font-family:inherit;color:var(--sl-ink)}
                #clinic-sick-leave-root *{box-sizing:border-box}
                .sl-hero{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;padding:19px 22px;margin-bottom:14px;border-radius:16px;background:linear-gradient(128deg,var(--sl-navy-deep),var(--sl-navy) 62%,#176b73);color:#fff;box-shadow:0 9px 26px rgba(11,40,72,.19)}
                .sl-hero:after{content:"";position:absolute;width:210px;height:210px;left:-70px;top:-115px;border:28px solid rgba(255,255,255,.06);border-radius:50%;pointer-events:none}
                .sl-hero-title{position:relative;z-index:1;display:flex;align-items:center;gap:13px}
                .sl-hero-icon{width:48px;height:48px;border:1px solid rgba(255,255,255,.24);border-radius:14px;background:rgba(255,255,255,.13);display:grid;place-items:center;font-size:21px;box-shadow:inset 0 1px 0 rgba(255,255,255,.18)}
                .sl-hero h2{margin:0;font-size:1.12rem;font-weight:850;letter-spacing:.01em}.sl-hero p{margin:4px 0 0;font-size:.76rem;color:#d7eaf3}
                .sl-hero-actions{position:relative;z-index:1;display:flex;align-items:center;gap:7px;flex-wrap:wrap}.sl-action-btn{border:1px solid rgba(255,255,255,.26);border-radius:9px;padding:8px 12px;font-size:.76rem;font-weight:750;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:transform .18s ease,background .18s ease,box-shadow .18s ease}.sl-action-btn:hover{transform:translateY(-1px)}
                .sl-action-ghost{background:rgba(255,255,255,.11);color:#fff}.sl-action-ghost:hover{background:rgba(255,255,255,.2)}.sl-action-add{background:#fff;color:var(--sl-navy-deep);border-color:#fff;box-shadow:0 4px 12px rgba(0,0,0,.13)}
                .sl-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:14px}.sl-kpi{display:flex;align-items:center;gap:11px;padding:12px 14px;background:#fff;border:1px solid var(--sl-line);border-radius:12px;box-shadow:0 3px 12px rgba(15,46,72,.045)}.sl-kpi-icon{width:38px;height:38px;border-radius:10px;display:grid;place-items:center}.sl-kpi:nth-child(1) .sl-kpi-icon{background:#e0f2fe;color:#0369a1}.sl-kpi:nth-child(2) .sl-kpi-icon{background:#ccfbf1;color:#0f766e}.sl-kpi:nth-child(3) .sl-kpi-icon{background:#fff7ed;color:#c2410c}.sl-kpi:nth-child(4) .sl-kpi-icon{background:#f1f5f9;color:#475569}.sl-kpi small{display:block;color:var(--sl-muted);font-size:.68rem;font-weight:650}.sl-kpi strong{display:block;margin-top:2px;color:var(--sl-ink);font-size:1.05rem;font-weight:850}
                .sl-filter-shell{padding:14px 16px;margin-bottom:14px;border:1px solid #b9dbe2;border-radius:14px;background:linear-gradient(180deg,#f8fcfd,#f1f8fa)}.sl-filter-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:11px}.sl-filter-title{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:800;color:var(--sl-navy)}.sl-filter-count{padding:2px 8px;border-radius:999px;background:#d9f4f1;color:#0f766e;font-size:.66rem}.sl-clear-btn{border:1px solid #cbdce3;border-radius:8px;background:#fff;color:#536b7c;padding:6px 10px;font-size:.72rem;font-weight:700;cursor:pointer}.sl-clear-btn:disabled{opacity:.42;cursor:not-allowed}.sl-filter-grid{display:grid;grid-template-columns:minmax(220px,1.6fr) repeat(3,minmax(150px,1fr));gap:10px}.sl-field label{display:block;margin-bottom:5px;color:#536b7c;font-size:.68rem;font-weight:750}.sl-field label i{width:17px;color:var(--sl-teal)}.sl-input-wrap{position:relative}.sl-input-wrap>i{position:absolute;right:11px;top:50%;transform:translateY(-50%);color:#7b93a4;font-size:.76rem;pointer-events:none}.sl-filter-control{width:100%;min-height:39px;padding:8px 11px;border:1.5px solid #c9dce4;border-radius:9px;background:#fff;color:var(--sl-ink);font:inherit;font-size:.78rem;outline:none;transition:border-color .18s,box-shadow .18s}.sl-input-wrap .sl-filter-control{padding-right:34px}.sl-filter-control:focus{border-color:var(--sl-teal);box-shadow:0 0 0 3px rgba(15,139,131,.11)}
                .sl-table-card{overflow:hidden;border:1px solid var(--sl-line);border-radius:14px;background:#fff;box-shadow:0 5px 20px rgba(15,46,72,.06)}.sl-table-caption{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 15px;border-bottom:1px solid var(--sl-line);background:#fff}.sl-table-caption strong{font-size:.84rem;color:var(--sl-navy)}.sl-table-caption span{font-size:.7rem;color:var(--sl-muted)}.sl-result-pill{padding:4px 9px;border:1px solid #bce4df;border-radius:999px;background:#effcf9!important;color:#0f766e!important;font-weight:750}.sl-table-scroll{overflow:auto;max-height:68vh}.sl-table{width:100%;min-width:1040px;border-collapse:separate;border-spacing:0}.sl-table thead{position:sticky;top:0;z-index:4}.sl-table th{padding:12px 11px;background:linear-gradient(180deg,#163f6c,#11355e);color:#fff;border-left:1px solid rgba(255,255,255,.1);font-size:.72rem;font-weight:780;white-space:nowrap;text-align:right}.sl-table th:first-child{width:54px}.sl-table th:last-child{width:108px}.sl-th{display:inline-flex;align-items:center;gap:6px}.sl-th i{color:#6ee7dc;font-size:.71rem}.sl-table td{padding:11px;border-bottom:1px solid #e8eff4;color:#344b5f;font-size:.78rem;vertical-align:middle}.sl-table tbody tr:nth-child(even){background:#f8fbfd}.sl-table tbody tr:hover{background:#eef8f8}.sl-table tbody tr:last-child td{border-bottom:0}.sl-serial-cell{text-align:center}.sl-serial-cell span{display:inline-grid;place-items:center;width:27px;height:27px;border-radius:8px;background:#e8f1f7;color:var(--sl-navy);font-weight:850}.sl-person-cell{display:flex;align-items:center;gap:9px}.sl-person-avatar{flex:0 0 auto;width:34px;height:34px;border-radius:10px;background:linear-gradient(145deg,#d7edf4,#c7eee9);color:var(--sl-navy);display:grid;place-items:center;font-size:.85rem;font-weight:900}.sl-person-copy strong{display:block;color:#183047;font-size:.8rem}.sl-person-copy small{display:flex;align-items:center;gap:4px;margin-top:3px;color:#7890a1;font-size:.65rem}.sl-department-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 8px;border-radius:7px;background:#edf5f8;color:#34546a;font-weight:650}.sl-department-chip i{color:#0f8b83}.sl-date-cell,.sl-doctor-cell{display:inline-flex;align-items:center;gap:6px;white-space:nowrap}.sl-date-cell i{color:#7895a8}.sl-doctor-cell i{color:#0f8b83}.sl-days-badge{display:inline-flex;align-items:baseline;justify-content:center;gap:3px;min-width:58px;padding:5px 8px;border:1px solid #fed7aa;border-radius:999px;background:#fff7ed;color:#9a3412}.sl-days-badge strong{font-size:.84rem}.sl-days-badge small{font-size:.62rem}.sl-row-actions{display:flex;align-items:center;justify-content:center;gap:6px}.sl-actions-cell .btn-icon{width:32px;height:32px;border-radius:8px;box-shadow:none}.sl-empty-state{text-align:center;padding:54px 20px;color:var(--sl-muted)}.sl-empty-icon{display:grid;place-items:center;width:62px;height:62px;margin:0 auto 12px;border-radius:18px;background:#eaf4f8;color:var(--sl-teal);font-size:25px}.sl-empty-state h3{margin:0 0 5px;color:var(--sl-navy);font-size:.98rem}.sl-empty-state p{margin:0;font-size:.76rem}.sl-reset-inline{margin-top:14px;padding:7px 12px;border:1px solid #b9dbe2;border-radius:8px;background:#fff;color:var(--sl-teal);font-weight:750;cursor:pointer}
                @media(max-width:980px){.sl-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.sl-filter-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
                @media(max-width:620px){.sl-hero{padding:16px}.sl-hero-actions{width:100%}.sl-action-btn{flex:1;justify-content:center}.sl-kpis,.sl-filter-grid{grid-template-columns:1fr}.sl-kpi{padding:10px 12px}.sl-filter-shell{padding:12px}.sl-table-caption{align-items:flex-start;flex-direction:column}}
                @media(prefers-reduced-motion:reduce){.sl-action-btn,.sl-filter-control{transition:none}}
            </style>
            <div id="clinic-sick-leave-root">
                <section class="sl-hero" aria-labelledby="sick-leave-title">
                    <div class="sl-hero-title">
                        <span class="sl-hero-icon"><i class="fas fa-notes-medical"></i></span>
                        <div>
                            <h2 id="sick-leave-title">\u0633\u062C\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629</h2>
                            <p>\u0645\u062A\u0627\u0628\u0639\u0629 \u062F\u0642\u064A\u0642\u0629 \u0644\u0644\u0641\u062A\u0631\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0648\u0627\u0644\u062C\u0647\u0627\u062A \u0648\u0627\u0644\u0623\u0637\u0628\u0627\u0621 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u064A\u0646</p>
                        </div>
                    </div>
                    <div class="sl-hero-actions">
                        <button type="button" class="sl-action-btn sl-action-ghost" id="sick-leave-export-pdf-btn"><i class="fas fa-file-pdf"></i>PDF</button>
                        <button type="button" class="sl-action-btn sl-action-ghost" id="sick-leave-export-excel-btn"><i class="fas fa-file-excel"></i>Excel</button>
                        <button type="button" class="sl-action-btn sl-action-add" id="sick-leave-add-btn"><i class="fas fa-plus"></i>\u0625\u0636\u0627\u0641\u0629 \u0625\u062C\u0627\u0632\u0629</button>
                    </div>
                </section>
                <section class="sl-kpis" aria-label="\u0645\u0644\u062E\u0635 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629">
                    <div class="sl-kpi"><span class="sl-kpi-icon"><i class="fas fa-file-medical"></i></span><div><small>\u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629</small><strong>${i.length}</strong></div></div>
                    <div class="sl-kpi"><span class="sl-kpi-icon"><i class="fas fa-calendar-day"></i></span><div><small>\u0625\u062C\u0645\u0627\u0644\u064A \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A</small><strong>${o}</strong></div></div>
                    <div class="sl-kpi"><span class="sl-kpi-icon"><i class="fas fa-chart-line"></i></span><div><small>\u0645\u062A\u0648\u0633\u0637 \u0645\u062F\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</small><strong>${l} \u064A\u0648\u0645</strong></div></div>
                    <div class="sl-kpi"><span class="sl-kpi-icon"><i class="fas fa-building"></i></span><div><small>\u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0627\u0644\u0638\u0627\u0647\u0631\u0629</small><strong>${r}</strong></div></div>
                </section>
                <section class="sl-filter-shell" aria-label="\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629">
                    <div class="sl-filter-head">
                        <div class="sl-filter-title"><i class="fas fa-sliders-h"></i>\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0633\u062C\u0644 <span class="sl-filter-count">${i.length} \u0645\u0646 ${a.length}</span></div>
                        <button type="button" id="sick-leave-reset-filters" class="sl-clear-btn" ${s?"":"disabled"}><i class="fas fa-undo-alt ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631${s?` (${s})`:""}</button>
                    </div>
                    <div class="sl-filter-grid">
                        <div class="sl-field"><label for="sick-leave-search"><i class="fas fa-search"></i>\u0628\u062D\u062B \u0634\u0627\u0645\u0644</label><div class="sl-input-wrap"><i class="fas fa-search"></i><input type="search" id="sick-leave-search" class="sl-filter-control" placeholder="\u0627\u0644\u0627\u0633\u0645\u060C \u0627\u0644\u0643\u0648\u062F\u060C \u0627\u0644\u0625\u062F\u0627\u0631\u0629\u060C \u0627\u0644\u0637\u0628\u064A\u0628 \u0623\u0648 \u0627\u0644\u0633\u0628\u0628..." value="${Utils.escapeHTML(t.search||"")}" autocomplete="off"></div></div>
                        <div class="sl-field"><label for="sick-leave-department"><i class="fas fa-sitemap"></i>\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</label><select id="sick-leave-department" class="sl-filter-control"><option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>${n.map(p=>`<option value="${Utils.escapeHTML(p)}" ${t.department===p?"selected":""}>${Utils.escapeHTML(p)}</option>`).join("")}</select></div>
                        <div class="sl-field"><label for="sick-leave-date-from"><i class="fas fa-calendar-plus"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label><input type="date" id="sick-leave-date-from" class="sl-filter-control" value="${t.dateFrom||""}"></div>
                        <div class="sl-field"><label for="sick-leave-date-to"><i class="fas fa-calendar-check"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label><input type="date" id="sick-leave-date-to" class="sl-filter-control" value="${t.dateTo||""}"></div>
                    </div>
                </section>
                <section class="sl-table-card">
                    <div class="sl-table-caption"><div><strong>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629</strong><span> \u2014 \u0645\u0631\u062A\u0628\u0629 \u062D\u0633\u0628 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629</span></div><span class="sl-result-pill">${i.length} \u0633\u062C\u0644</span></div>
                    ${d}
                </section>
            </div>
        `,this.applyModuleI18n(e),this.bindSickLeaveTabEvents(e),setTimeout(()=>{const p=e.querySelector(".clinic-table-wrapper");p&&this.setupTableScrollListeners(p)},100)},bindSickLeaveTabEvents(e){const t=e.querySelector("#sick-leave-search"),a=e.querySelector("#sick-leave-department"),i=e.querySelector("#sick-leave-date-from"),n=e.querySelector("#sick-leave-date-to"),s=e.querySelector("#sick-leave-add-btn"),o=e.querySelector("#sick-leave-export-pdf-btn"),l=e.querySelector("#sick-leave-export-excel-btn"),r=e.querySelector("#sick-leave-reset-filters"),c=e.querySelector("#sick-leave-empty-reset"),d=()=>{this.state.filters.sickLeave={search:"",department:"",dateFrom:"",dateTo:""},this.renderSickLeaveTab()};t&&t.addEventListener("input",p=>{const f=p.target.value;clearTimeout(this._sickLeaveSearchTimer),this._sickLeaveSearchTimer=setTimeout(()=>{this.state.filters.sickLeave.search=f.trim(),this.renderSickLeaveTab(),requestAnimationFrame(()=>{const u=e.querySelector("#sick-leave-search");if(!u)return;u.focus({preventScroll:!0});const m=u.value.length;u.setSelectionRange?.(m,m)})},180)}),a&&a.addEventListener("change",p=>{this.state.filters.sickLeave.department=p.target.value,this.renderSickLeaveTab()}),i&&i.addEventListener("change",p=>{this.state.filters.sickLeave.dateFrom=p.target.value,this.renderSickLeaveTab()}),n&&n.addEventListener("change",p=>{this.state.filters.sickLeave.dateTo=p.target.value,this.renderSickLeaveTab()}),s?.addEventListener("click",()=>this.showSickLeaveForm()),o?.addEventListener("click",()=>this.exportSickLeaveToPDF()),l?.addEventListener("click",()=>this.exportSickLeaveToExcel()),r?.addEventListener("click",d),c?.addEventListener("click",d),e.querySelectorAll('[data-action="view-sick-leave"]').forEach(p=>{p.addEventListener("click",()=>this.viewSickLeaveRecord(p.getAttribute("data-id")))}),e.querySelectorAll('[data-action="edit-sick-leave"]').forEach(p=>{p.addEventListener("click",()=>this.editSickLeave(p.getAttribute("data-id")))})},viewSickLeaveRecord(e){const t=this.getSickLeaves().find(d=>d.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}const a=t.employeeName||t.personName||"",i=t.employeeDepartment||"\u2014",n=this.formatDate(t.startDate),s=this.formatDate(t.endDate),o=t.daysCount??this.calculateSickLeaveDays(t.startDate,t.endDate),l=t.treatingDoctor||"\u2014",r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
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
                            <p class="text-gray-800">${Utils.escapeHTML(i)}</p>
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
                            <p class="text-gray-800">${s}</p>
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
        `,document.body.appendChild(r);const c=()=>r.remove();r.querySelectorAll(".modal-close, .modal-close-btn").forEach(d=>d.addEventListener("click",c)),r.querySelector(".modal-edit-btn")?.addEventListener("click",()=>{c(),this.showSickLeaveForm(t)}),r.querySelector(".modal-print-btn")?.addEventListener("click",()=>this.printSickLeaveRecord(t.id)),r.addEventListener("click",d=>{d.target===r&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&c()})},editSickLeave(e){const t=this.getSickLeaves().find(a=>a.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629");return}this.showSickLeaveForm(t)},printSickLeaveRecord(e){const t=this.getSickLeaves().find(c=>c.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}const a=t.employeeName||t.personName||"",i=t.employeeDepartment||"\u2014",n=t.treatingDoctor||"\u2014",s=t.daysCount??this.calculateSickLeaveDays(t.startDate,t.endDate),o=`
            <table>
                <tr><th>\u0627\u0644\u0627\u0633\u0645</th><td>${Utils.escapeHTML(a)}</td></tr>
                <tr><th>\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</th><td>${Utils.escapeHTML(i)}</td></tr>
                ${t.employeeCode?`<tr><th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th><td>${Utils.escapeHTML(t.employeeCode)}</td></tr>`:""}
                <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629</th><td>${this.formatDate(t.startDate)}</td></tr>
                <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629</th><td>${this.formatDate(t.endDate)}</td></tr>
                <tr><th>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645</th><td>${s}</td></tr>
                <tr><th>\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C</th><td>${Utils.escapeHTML(n)}</td></tr>
            </table>
            <div class="section-title">\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</div>
            <div class="description">${Utils.escapeHTML(t.reason||"")}</div>
            ${t.medicalNotes?`
                <div class="section-title">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629</div>
                <div class="description">${Utils.escapeHTML(t.medicalNotes||"")}</div>
            `:""}
        `,l=`SICK-LEAVE-${t.id}`,r=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(l,"\u0646\u0645\u0648\u0630\u062C \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629",o,!1,!0,{},t.createdAt,t.updatedAt):`<html><body>${o}</body></html>`;try{const c=new Blob([r],{type:"text/html;charset=utf-8"}),d=URL.createObjectURL(c),p=window.open(d,"_blank");p?p.onload=()=>{setTimeout(()=>{p.print(),setTimeout(()=>URL.revokeObjectURL(d),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")}catch(c){Utils.safeError("\u0641\u0634\u0644 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",c),Notification?.error?.("\u062A\u0639\u0630\u0631 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629")}},exportSickLeaveToExcel(){const e=this.getFilteredSickLeaves();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map(s=>({\u0627\u0644\u0627\u0633\u0645:s.employeeName||s.personName||"",\u0627\u0644\u0642\u0633\u0645:s.employeeDepartment||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629":this.formatDate(s.startDate),"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629":this.formatDate(s.endDate),"\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645":s.daysCount??this.calculateSickLeaveDays(s.startDate,s.endDate),"\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C":s.treatingDoctor||"",\u0627\u0644\u0633\u0628\u0628:s.reason||"","\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629":s.medicalNotes||""})),a=XLSX.utils.book_new(),i=XLSX.utils.json_to_sheet(t);XLSX.utils.book_append_sheet(a,i,"SickLeave");const n=`Clinic_SickLeave_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n)},exportSickLeaveToPDF(){const e=this.getFilteredSickLeaves();if(e.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const a=`
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
                    ${e.map(s=>`
            <tr>
                <td>${Utils.escapeHTML(s.employeeName||s.personName||"")}</td>
                <td>${Utils.escapeHTML(s.employeeDepartment||"")}</td>
                <td>${this.formatDate(s.startDate)}</td>
                <td>${this.formatDate(s.endDate)}</td>
                <td>${s.daysCount??this.calculateSickLeaveDays(s.startDate,s.endDate)}</td>
                <td>${Utils.escapeHTML(s.treatingDoctor||"")}</td>
            </tr>
        `).join("")}
                </tbody>
            </table>
        `,i=`SICK-LEAVE-REPORT-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(i,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const s=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(s),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(s){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",s),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629")}},renderInjuriesTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="injuries"]');if(!e)return;const t=this.state.filters.injuries||{},a=this.getInjuries(),i=this.getFilteredInjuries(),n=this.getClinicDepartments(),s=this.getInjuryTypeOptions(),o=this.getInjuryBodyPartOptions(),l=this.state.activeInjuryType==="contractors",r=a.filter(f=>String(f.personType||"employee").toLowerCase()==="employee").length,c=a.length-r,d=i.map(f=>{const u=f.contractorName||"\u2014",m=f.employeeCode||f.employeeNumber||"\u2014",g=f.employeeName||f.personName||f.contractorWorkerName||"\u2014",y=f.factoryName||f.factory||"\u2014",v=f.subLocationName||f.subLocation||"\u2014",h=f.department||f.employeeDepartment||"\u2014",w=this.formatDate(f.injuryDate,!0),D=f.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",L=Array.isArray(f.attachments)?f.attachments.length:0;return`
                <tr class="${this.getInjuryRowClass(D)}">
                    ${l?`<td>${Utils.escapeHTML(u)}</td>`:`<td>${Utils.escapeHTML(m)}</td>`}
                    <td>${Utils.escapeHTML(g)}</td>
                    <td>${Utils.escapeHTML(y)}</td>
                    <td>${Utils.escapeHTML(v)}</td>
                    <td>${Utils.escapeHTML(h)}</td>
                    <td>${w}</td>
                    <td>${Utils.escapeHTML(f.injuryType||"")}</td>
                    <td>${Utils.escapeHTML(f.injuryBodyPart||"")}</td>
                    <td>
                        <span class="badge ${this.getInjuryStatusBadgeClass(D)}">${Utils.escapeHTML(D)}</span>
                    </td>
                    <td>${Utils.escapeHTML(this.getUserDisplayName(f.createdBy))}</td>
                    <td class="text-center">${L}</td>
                    <td class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-injury" data-id="${Utils.escapeHTML(f.id||"")}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button" class="btn-icon btn-icon-warning" data-action="edit-injury" data-id="${Utils.escapeHTML(f.id||"")}">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `}).join(""),p=i.length?`
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
                            ${d}
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
                            ${s.map(f=>`
                                <option value="${Utils.escapeHTML(f)}" ${(t.injuryType||"all")===f?"selected":""}>${Utils.escapeHTML(f)}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-body-part-filter">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645)</label>
                        <select id="injuries-body-part-filter" class="form-input filter-input">
                            <option value="all" ${(t.injuryBodyPart||"all")==="all"?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0645\u0627\u0643\u0646</option>
                            ${o.map(f=>`
                                <option value="${Utils.escapeHTML(f)}" ${(t.injuryBodyPart||"all")===f?"selected":""}>${Utils.escapeHTML(f)}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-department">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</label>
                        <select id="injuries-department" class="form-input filter-input">
                            <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>
                            ${n.map(f=>`
                                <option value="${Utils.escapeHTML(f)}" ${t.department===f?"selected":""}>${Utils.escapeHTML(f)}</option>
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
            ${p}
        `,this.applyModuleI18n(e),this.bindInjuriesTabEvents(e),setTimeout(()=>{const f=e.querySelector(".clinic-table-wrapper");f&&this.setupTableScrollListeners(f)},100)},bindInjuriesTabEvents(e){const t=e.querySelector("#injuries-search"),a=e.querySelector("#injuries-type-filter"),i=e.querySelector("#injuries-body-part-filter"),n=e.querySelector("#injuries-status"),s=e.querySelector("#injuries-department"),o=e.querySelector("#injuries-date-from"),l=e.querySelector("#injuries-date-to"),r=e.querySelector("#injuries-reset-filters"),c=e.querySelector("#injuries-types-settings-btn"),d=e.querySelector("#injuries-body-parts-settings-btn"),p=e.querySelector("#injuries-add-btn"),f=e.querySelector("#injuries-export-pdf-btn"),u=e.querySelector("#injuries-export-excel-btn");if(e.querySelectorAll(".injury-person-tab-btn").forEach(m=>{m.addEventListener("click",()=>{const g=m.getAttribute("data-tab")||"employees";this.state.activeInjuryType=g,this.renderInjuriesTab()})}),t){let m=!1;const g=(y,v=null)=>{this.state.filters.injuries.search=String(y||""),this._injurySearchDebounceTimer&&clearTimeout(this._injurySearchDebounceTimer),this._injurySearchDebounceTimer=setTimeout(()=>{this.renderInjuriesTab(),requestAnimationFrame(()=>{const h=document.getElementById("injuries-search");if(!h)return;h.focus();const w=typeof v=="number"?v:h.value.length;try{h.setSelectionRange(w,w)}catch{}})},120)};t.addEventListener("compositionstart",()=>{m=!0}),t.addEventListener("compositionend",y=>{m=!1,g(y.target.value,y.target.selectionStart)}),t.addEventListener("input",y=>{m||g(y.target.value,y.target.selectionStart)})}n&&n.addEventListener("change",m=>{this.state.filters.injuries.status=m.target.value,this.renderInjuriesTab()}),a&&a.addEventListener("change",m=>{this.state.filters.injuries.injuryType=m.target.value,this.renderInjuriesTab()}),i&&i.addEventListener("change",m=>{this.state.filters.injuries.injuryBodyPart=m.target.value,this.renderInjuriesTab()}),s&&s.addEventListener("change",m=>{this.state.filters.injuries.department=m.target.value,this.renderInjuriesTab()}),o&&o.addEventListener("change",m=>{this.state.filters.injuries.dateFrom=m.target.value,this.renderInjuriesTab()}),l&&l.addEventListener("change",m=>{this.state.filters.injuries.dateTo=m.target.value,this.renderInjuriesTab()}),p?.addEventListener("click",()=>this.showInjuryForm()),c?.addEventListener("click",()=>this.showInjuryTypesSettingsModal()),d?.addEventListener("click",()=>this.showInjuryBodyPartsSettingsModal()),r?.addEventListener("click",()=>{this.state.filters.injuries={search:"",status:"all",department:"",injuryType:"all",injuryBodyPart:"all",dateFrom:"",dateTo:""},this.renderInjuriesTab()}),f?.addEventListener("click",()=>this.exportInjuriesToPDF()),u?.addEventListener("click",()=>this.exportInjuriesToExcel()),e.querySelectorAll('[data-action="view-injury"]').forEach(m=>{m.addEventListener("click",()=>this.viewInjuryRecord(m.getAttribute("data-id")))}),e.querySelectorAll('[data-action="edit-injury"]').forEach(m=>{m.addEventListener("click",()=>this.editInjury(m.getAttribute("data-id")))})},analyzeClinicVisitsData(){const e=AppState.appData.clinicVisits||[],t=AppState.appData.sickLeave||[],a=AppState.appData.injuries||[],i=[...e.map(r=>({type:"\u0632\u064A\u0627\u0631\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.contractorName||r.externalName||"",jobTitle:r.employeePosition||r.position||"-",location:r.employeeLocation||r.workArea||"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.diagnosis||"-",date:r.visitDate||r.createdAt})),...t.map(r=>({type:"\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.personName||"",jobTitle:r.employeePosition||"-",location:"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.reason||"-",date:r.startDate||r.createdAt})),...a.map(r=>({type:"\u0625\u0635\u0627\u0628\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.personName||"",jobTitle:"-",location:r.injuryLocation||"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.injuryType||"-",date:r.injuryDate||r.createdAt}))],n={};i.forEach(r=>{const c=r.jobTitle;n[c]||(n[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),n[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&n[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&n[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&n[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&n[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&n[c].injuries++});const s={};i.forEach(r=>{const c=r.location;s[c]||(s[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),s[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&s[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&s[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&s[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&s[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&s[c].injuries++});const o={};i.forEach(r=>{const c=r.department;o[c]||(o[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),o[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&o[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&o[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&o[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&o[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&o[c].injuries++});const l={};return i.forEach(r=>{const c=r.diagnosis;l[c]||(l[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),l[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&l[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&l[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&l[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&l[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&l[c].injuries++}),{totalRecords:i.length,totalEmployees:i.filter(r=>r.personType==="\u0645\u0648\u0638\u0641").length,totalContractors:i.filter(r=>r.personType==="\u0645\u0642\u0627\u0648\u0644").length,totalVisits:e.length,totalSickLeaves:t.length,totalInjuries:a.length,byJobTitle:Object.entries(n).sort((r,c)=>c[1].total-r[1].total),byLocation:Object.entries(s).sort((r,c)=>c[1].total-r[1].total),byDepartment:Object.entries(o).sort((r,c)=>c[1].total-r[1].total),byDiagnosis:Object.entries(l).sort((r,c)=>c[1].total-r[1].total)}},renderAnalyticsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="analytics"]');if(!e)return;const t=this.analyzeClinicVisitsData(),a=(i,n,s)=>{if(!n||n.length===0)return`
                    <div class="content-card mb-4">
                        <div class="card-header">
                            <h3 class="card-title"><i class="${s} ml-2"></i>${i}</h3>
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
                        <h3 class="card-title"><i class="${s} ml-2"></i>${i}</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-wrapper" style="overflow-x: auto;">
                            <table class="data-table">
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
        `,this.applyModuleI18n(e),this.bindAnalyticsTabEvents(e)},bindAnalyticsTabEvents(e){const t=e.querySelector("#analytics-export-pdf-btn"),a=e.querySelector("#analytics-export-excel-btn");t?.addEventListener("click",()=>this.exportAnalyticsToPDF()),a?.addEventListener("click",()=>this.exportAnalyticsToExcel())},exportAnalyticsToExcel(){if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=this.analyzeClinicVisitsData(),t=XLSX.utils.book_new(),a=[["\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A","\u0627\u0644\u0639\u062F\u062F"],["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",e.totalRecords],["\u0645\u0648\u0638\u0641\u064A\u0646",e.totalEmployees],["\u0645\u0642\u0627\u0648\u0644\u064A\u0646",e.totalContractors],["\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629",e.totalVisits],["\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",e.totalSickLeaves],["\u0625\u0635\u0627\u0628\u0627\u062A",e.totalInjuries]],i=XLSX.utils.aoa_to_sheet(a);XLSX.utils.book_append_sheet(t,i,"\u0645\u0644\u062E\u0635 \u0639\u0627\u0645");const n=(o,l)=>{const r=[[l,"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0645\u0648\u0638\u0641\u064A\u0646","\u0645\u0642\u0627\u0648\u0644\u064A\u0646","\u0632\u064A\u0627\u0631\u0627\u062A","\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629","\u0625\u0635\u0627\u0628\u0627\u062A"]];return o.forEach(([c,d])=>{r.push([c,d.total,d.employees,d.contractors,d.visits,d.sickLeaves,d.injuries])}),XLSX.utils.aoa_to_sheet(r)};XLSX.utils.book_append_sheet(t,n(e.byJobTitle,"\u0627\u0644\u0648\u0638\u064A\u0641\u0629"),"\u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629"),XLSX.utils.book_append_sheet(t,n(e.byLocation,"\u0627\u0644\u0645\u0643\u0627\u0646"),"\u062D\u0633\u0628 \u0627\u0644\u0645\u0643\u0627\u0646"),XLSX.utils.book_append_sheet(t,n(e.byDepartment,"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"),"\u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"),XLSX.utils.book_append_sheet(t,n(e.byDiagnosis,"\u0627\u0644\u062A\u0634\u062E\u064A\u0635"),"\u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635");const s=`Clinic_Analytics_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(t,s),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},exportAnalyticsToPDF(){const e=this.analyzeClinicVisitsData(),t=(s,o)=>{if(!o||o.length===0)return"";const l=o.map(([r,c])=>`
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
                <div class="section-title">${s}</div>
                <table>
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
        `,i=`CLINIC-ANALYTICS-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(i,"\u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u0631\u062F\u062F\u064A\u0646 \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const s=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(s),l=window.open(o,"_blank");l?(l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0645\u0644\u0641 PDF \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(s){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",s),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A")}},analyzeAllClinicData(){try{this.ensureData()}catch(p){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A ensureData:",p)}const e=AppState.appData?.clinicVisits||[],t=AppState.appData?.clinicMedications||[],a=AppState.appData?.sickLeave||[],i=AppState.appData?.injuries||[],n=AppState.appData?.clinicSupplyRequests||[],s={total:t.length,byStatus:{},byType:{},expired:0,expiringSoon:0,totalQuantity:0,totalDispensed:0,byLocation:{}};t.forEach(p=>{const f=p.status||"\u0633\u0627\u0631\u064A",u=p.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",m=p.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";s.byStatus[f]=(s.byStatus[f]||0)+1,s.byType[u]=(s.byType[u]||0)+1,s.byLocation[m]=(s.byLocation[m]||0)+1,f==="\u0645\u0646\u062A\u0647\u064A"&&s.expired++,f==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"&&s.expiringSoon++;const g=p.remainingQuantity??p.quantity??0,y=p.quantityAdded??p.quantity??0;s.totalQuantity+=g,s.totalDispensed+=Math.max(0,y-g)});const o={total:e.length,byMonth:{},byReason:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0,\u062E\u0627\u0631\u062C\u064A:0},byDepartment:{},byLocation:{},averagePerMonth:0};e.forEach(p=>{try{const v=p.visitDate||p.createdAt;if(!v)return;const h=new Date(v);if(isNaN(h.getTime()))return;const w=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`;o.byMonth[w]=(o.byMonth[w]||0)+1}catch{}const f=p.reason||p.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byReason[f]=(o.byReason[f]||0)+1;const u=String(p.personType||"").toLowerCase().trim(),m=u==="contractor"||u==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";o.byPersonType[m]=(o.byPersonType[m]||0)+1;const g=p.employeeDepartment||p.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byDepartment[g]=(o.byDepartment[g]||0)+1;const y=p.employeeLocation||p.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byLocation[y]=(o.byLocation[y]||0)+1});const l=Object.keys(o.byMonth).length;o.averagePerMonth=l>0?(o.total/l).toFixed(1):0;const r={total:a.length,byMonth:{},byStatus:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},byDepartment:{},totalDays:0,averageDays:0};a.forEach(p=>{try{const g=p.startDate||p.createdAt;if(!g)return;const y=new Date(g);if(isNaN(y.getTime()))return;const v=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`;r.byMonth[v]=(r.byMonth[v]||0)+1}catch{}const f=p.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629";r.byStatus[f]=(r.byStatus[f]||0)+1;const u=p.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";r.byPersonType[u]=(r.byPersonType[u]||0)+1;const m=p.employeeDepartment||p.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(r.byDepartment[m]=(r.byDepartment[m]||0)+1,p.startDate&&p.endDate){const g=new Date(p.startDate),y=new Date(p.endDate),v=Math.ceil((y-g)/(1e3*60*60*24))+1;r.totalDays+=v}}),r.averageDays=r.total>0?(r.totalDays/r.total).toFixed(1):0;const c={total:i.length,byMonth:{},byType:{},byLocation:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},byDepartment:{},byStatus:{}};i.forEach(p=>{try{const v=p.injuryDate||p.createdAt;if(!v)return;const h=new Date(v);if(isNaN(h.getTime()))return;const w=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`;c.byMonth[w]=(c.byMonth[w]||0)+1}catch{}const f=p.injuryType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byType[f]=(c.byType[f]||0)+1;const u=p.injuryLocation||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byLocation[u]=(c.byLocation[u]||0)+1;const m=p.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";c.byPersonType[m]=(c.byPersonType[m]||0)+1;const g=p.employeeDepartment||p.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byDepartment[g]=(c.byDepartment[g]||0)+1;const y=p.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629";c.byStatus[y]=(c.byStatus[y]||0)+1});const d={total:n.length,byStatus:{},byType:{},byPriority:{},byMonth:{},pending:0,approved:0,rejected:0,fulfilled:0};return n.forEach(p=>{try{const f=p.status||"pending";d.byStatus[f]=(d.byStatus[f]||0)+1,f==="pending"&&d.pending++,f==="approved"&&d.approved++,f==="rejected"&&d.rejected++,f==="fulfilled"&&d.fulfilled++;const u=p.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";d.byType[u]=(d.byType[u]||0)+1;const m=p.priority||"normal";d.byPriority[m]=(d.byPriority[m]||0)+1;const g=p.createdAt||p.requestDate;if(g){const y=new Date(g);if(!isNaN(y.getTime())){const v=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`;d.byMonth[v]=(d.byMonth[v]||0)+1}}}catch{}}),{medications:s,visits:o,sickLeaves:r,injuries:c,supplyRequests:d,summary:{totalRecords:e.length+a.length+i.length,totalMedications:t.length,totalSupplyRequests:n.length,totalVisits:e.length,totalSickLeaves:a.length,totalInjuries:i.length}}},renderDataAnalysisTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="data-analysis"]');e&&(this.ensureChartJSLoaded().catch(()=>{}),e.innerHTML=`
        <div id="clinic-analytics-root" style="font-family:inherit;">

            <!-- \u2550\u2550 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u2550\u2550 -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#134e4a 0%,#0d9488 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(13,148,136,0.35);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-clinic-medical" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.85;">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u2022 \u0632\u064A\u0627\u0631\u0627\u062A \u2022 \u0623\u062F\u0648\u064A\u0629 \u2022 \u0625\u062C\u0627\u0632\u0627\u062A \u2022 \u0625\u0635\u0627\u0628\u0627\u062A \u2022 \u062A\u0635\u062F\u064A\u0631 PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-left:2px;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${["30","90","180","365","0"].map((t,a)=>{const i=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],n=(this._clinicPeriod||"0")===t;return`<button type="button" class="clinic-period-btn" data-period="${t}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${n?"#fff":"rgba(255,255,255,0.15)"};color:${n?"#134e4a":"#fff"};">${i[a]}</button>`}).join("")}
                    </div>
                    <button type="button" id="clinic-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                        <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span><span id="clinic-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">\u25CF</span>
                    </button>
                    <button type="button" id="clinic-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.25);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(0,0,0,0.4)'" onmouseout="this.style.background='rgba(0,0,0,0.25)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button type="button" id="clinic-analytics-refresh" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" title="\u062A\u062D\u062F\u064A\u062B">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <!-- \u2550\u2550 \u0644\u0648\u062D\u0629 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u2550\u2550 -->
            <div id="clinic-filter-panel" style="display:none;background:#f0fdfa;border:1.5px solid #99f6e4;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#0d9488;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#134e4a;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</span>
                        <span id="clinic-filter-count" style="background:#ccfbf1;color:#0f766e;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button type="button" id="clinic-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #99f6e4;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;" onmouseover="this.style.background='#f0fdfa';this.style.color='#0d9488'" onmouseout="this.style.background='#fff';this.style.color='#64748b'">
                        <i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
                    ${[{id:"clinic-af-factory",icon:"fas fa-industry",color:"#ec4899",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{id:"clinic-af-ptype",icon:"fas fa-id-badge",color:"#6366f1",label:"\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635"},{id:"clinic-af-dept",icon:"fas fa-building",color:"#0d9488",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{id:"clinic-af-loc",icon:"fas fa-map-marker-alt",color:"#f59e0b",label:"\u0627\u0644\u0645\u0648\u0642\u0639"},{id:"clinic-af-reason",icon:"fas fa-stethoscope",color:"#3b82f6",label:"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"}].map(t=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                                <i class="${t.icon}" style="color:${t.color};margin-left:4px;"></i>${t.label}
                            </label>
                            <select id="${t.id}" style="width:100%;padding:7px 10px;border:1.5px solid #99f6e4;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#0d9488'" onblur="this.style.borderColor='#99f6e4'">
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

            <!-- \u2550\u2550 Row 1: \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 + \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-user-circle" style="color:#3b82f6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="clinic-chart-ptype"></canvas>
                        <div id="clinic-chart-ptype-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-notes-medical" style="color:#f97316;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="clinic-chart-sl-status"></canvas>
                        <div id="clinic-chart-sl-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-chart-area" style="color:#8b5cf6;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u0632\u064A\u0627\u0631\u0627\u062A (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="clinic-chart-trend"></canvas>
                    <div id="clinic-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                </div>
            </div>

            <!-- \u2550\u2550 Row: \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u2550\u2550 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-industry" style="color:#0284c7;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062A\u0648\u0632\u064A\u0639 \u0648\u0646\u0633\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0627\u0646\u0639 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</span>
                    </div>
                    <span style="font-size:0.72rem;color:#64748b;">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064A \u0645\u0635\u0646\u0639 \u0644\u062A\u0635\u0641\u064A\u0629 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B</span>
                </div>
                <div id="clinic-factories-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;padding:16px;background:#f8fafc;">
                    <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</div>
                </div>
            </div>

            <!-- \u2550\u2550 Row 4: \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 + \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-stethoscope" style="color:#0d9488;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="clinic-chart-reason"></canvas>
                        <div id="clinic-chart-reason-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-user-injured" style="color:#ef4444;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="clinic-chart-inj-type"></canvas>
                        <div id="clinic-chart-inj-type-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u0635\u0627\u0628\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 Row 5: \u0627\u0644\u0645\u0648\u0642\u0639 + \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marker-alt" style="color:#3b82f6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0623\u0643\u062B\u0631 \u062A\u0631\u062F\u062F\u0627\u064B (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div id="clinic-locs-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-building" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062A\u0641\u0627\u0635\u064A\u0644 \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</span>
                    </div>
                    <div id="clinic-depts-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</div>
                    </div>
                </div>
            </div>

            <!-- \u2550\u2550 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 + \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u2550\u2550 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-pills" style="color:#10b981;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:300px;">
                        <canvas id="clinic-chart-med-status"></canvas>
                        <div id="clinic-chart-med-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0623\u062F\u0648\u064A\u0629</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
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
                        <span style="font-weight:800;font-size:1rem;color:#134e4a;">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0648\u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629</span>
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
                            <i class="fas fa-tablets" style="color:#0d9488;"></i>
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
                        <i class="fas fa-user-clock" style="color:#0d9488;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u064A\u0646 \u0644\u0639\u064A\u0627\u062F\u0629 (\u0623\u0639\u0644\u0649 15)</span>
                    </div>
                    <span id="clinic-top-visitors-count" style="background:#f0fdfa;color:#0f766e;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
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
        </div>`,this.applyModuleI18n(e),setTimeout(()=>{this.updateClinicAnalyticsDashboard(),this._clinicBindAnalyticsEvents()},80))},bindDataAnalysisTabEvents(e){},async updateClinicAnalyticsDashboard(){const e=document.getElementById("clinic-analytics-root");if(!e)return;try{this.ensureData()}catch{}const t=parseInt(this._clinicPeriod||"0",10),a=this.getActualClinicVisits_(AppState.appData?.clinicVisits),i=AppState.appData?.clinicMedications||[],n=AppState.appData?.sickLeave||[],s=AppState.appData?.injuries||[],o=AppState.appData?.clinicSupplyRequests||[],l=t>0?(()=>{const k=new Date;return k.setDate(k.getDate()-t),k})():null,r=(k,z)=>l?k.filter(W=>{const Q=new Date(W[z]||W.createdAt||"");return!isNaN(Q.getTime())&&Q>=l}):k,c=r(a,"visitDate"),d=r(n,"startDate"),p=r(s,"injuryDate");this._clinicPopulateFilters(c);const f=this._clinicApplyFilters(c),u=f.length,m=document.getElementById("clinic-filter-count");m&&(m.textContent=`${u} \u0632\u064A\u0627\u0631\u0629`);const g=f.filter(k=>String(k.personType||"").toLowerCase()!=="contractor"),y=f.filter(k=>String(k.personType||"").toLowerCase()==="contractor"),v=new Date,h=f.filter(k=>{const z=new Date(k.visitDate||k.createdAt||"");return z.getFullYear()===v.getFullYear()&&z.getMonth()===v.getMonth()}).length,w=i.filter(k=>k.status==="\u0645\u0646\u062A\u0647\u064A").length,D=i.filter(k=>k.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621").length,L=d.filter(k=>!k.status||k.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629").length,b=new Set(f.map(k=>{const z=new Date(k.visitDate||k.createdAt||"");return isNaN(z.getTime())?null:`${z.getFullYear()}-${z.getMonth()}`}).filter(Boolean)).size,A=b>0?(u/b).toFixed(1):0,E=this.analyzeDispensedMedications_(f,i),R=document.getElementById("clinic-kpi-strip");if(R){const k=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",value:u,icon:"fas fa-hospital-user",color:"#0d9488",bg:"#f0fdfa",border:"#99f6e4"},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",value:g.length,icon:"fas fa-user-tie",color:"#3b82f6",bg:"#eff6ff",border:"#bfdbfe"},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",value:y.length,icon:"fas fa-hard-hat",color:"#f97316",bg:"#fff7ed",border:"#fed7aa"},{label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",value:d.length,icon:"fas fa-notes-medical",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{label:"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",value:p.length,icon:"fas fa-user-injured",color:"#ef4444",bg:"#fef2f2",border:"#fecaca"},{label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629",value:w,icon:"fas fa-pills",color:"#dc2626",bg:"#fef2f2",border:"#fca5a5"},{label:"\u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",value:D,icon:"fas fa-exclamation",color:"#d97706",bg:"#fffbeb",border:"#fde68a"},{label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",value:L,icon:"fas fa-clock",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0634\u0647\u0631\u064A",value:A,icon:"fas fa-calendar-check",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"}];R.innerHTML=k.map(z=>`
                <div style="background:${z.bg};border:1px solid ${z.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${z.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${z.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${z.color};line-height:1;">${z.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${z.label}</div>
                    </div>
                </div>`).join("")}const q=document.getElementById("clinic-med-analysis-summary");q&&(q.textContent=E.totalDispensedQty>0?`${E.uniqueMedicines} \u062F\u0648\u0627\u0621 \u0645\u062E\u062A\u0644\u0641 \u2022 ${E.dispenseLines} \u0639\u0645\u0644\u064A\u0629 \u0635\u0631\u0641 \u2022 ${E.visitsWithMedications} \u0632\u064A\u0627\u0631\u0629 \u0628\u062F\u0648\u0627\u0621`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0636\u0645\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629");const U=document.getElementById("clinic-med-kpi-strip");if(U){const k=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",value:E.totalDispensedQty,icon:"fas fa-prescription-bottle-alt",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629",value:E.uniqueMedicines,icon:"fas fa-pills",color:"#059669",bg:"#f0fdf4",border:"#bbf7d0"},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621",value:E.visitsWithMedications,icon:"fas fa-capsules",color:"#0d9488",bg:"#f0fdfa",border:"#99f6e4"},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u062F\u0648\u0646 \u062F\u0648\u0627\u0621",value:E.visitsWithoutMedications,icon:"fas fa-hospital",color:"#64748b",bg:"#f8fafc",border:"#e2e8f0"},{label:"\u0639\u0645\u0644\u064A\u0627\u062A \u0635\u0631\u0641",value:E.dispenseLines,icon:"fas fa-hand-holding-medical",color:"#0891b2",bg:"#ecfeff",border:"#a5f3fc"}];U.innerHTML=k.map(z=>`
                <div style="background:${z.bg};border:1px solid ${z.border};border-radius:12px;padding:11px 12px;text-align:center;">
                    <i class="${z.icon}" style="color:${z.color};font-size:14px;"></i>
                    <div style="font-size:1.15rem;font-weight:800;color:${z.color};margin-top:4px;">${Number(z.value||0).toLocaleString("en-US")}</div>
                    <div style="font-size:0.65rem;color:#64748b;margin-top:2px;">${z.label}</div>
                </div>`).join("")}if(!await this.ensureChartJSLoaded()||typeof Chart>"u"){e.insertAdjacentHTML("afterbegin",'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629.</span></div>');return}const x={};f.forEach(k=>{const z=String(k.personType||"").toLowerCase()==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";x[z]=(x[z]||0)+1}),this._cDoughnut("clinic-chart-ptype",Object.keys(x),Object.values(x),["rgba(59,130,246,0.85)","rgba(249,115,22,0.85)"]),this._cTrend("clinic-chart-trend",a,"visitDate");const S=this._cGroupBy(f,k=>k.reason||k.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",10);this._cHBar("clinic-chart-reason",S.labels,S.data,"rgba(13,148,136,0.75)");const C=this._cGroupBy(f,k=>k.employeeLocation||k.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",10),$=document.getElementById("clinic-locs-list");$&&(u===0||C.labels.length===0?$.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>':$.innerHTML=C.labels.map((k,z)=>{const W=C.data[z],Q=Math.round(W/u*100);return`
                        <div style="display:flex;flex-direction:column;gap:5px;border-bottom:1px solid #f1f5f9;padding-bottom:8px;cursor:pointer;transition:background 0.2s;padding-left:4px;padding-right:4px;" 
                             onmouseover="this.style.background='#f0fdfa'" 
                             onmouseout="this.style.background='transparent'"
                             onclick="const el = document.getElementById('clinic-af-loc'); if(el){el.value='${Utils.escapeHTML(k)}'; el.dispatchEvent(new Event('change'));}">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
                                    <span style="background:#e0f2fe;color:#0369a1;font-size:0.68rem;padding:2px 8px;border-radius:6px;font-weight:700;white-space:nowrap;flex-shrink:0;">\u0645\u0648\u0642\u0639</span>
                                    <span style="font-size:0.78rem;font-weight:700;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${Utils.escapeHTML(k)}">${Utils.escapeHTML(k)}</span>
                                </div>
                                <span style="font-size:0.75rem;font-weight:700;color:#0369a1;flex-shrink:0;margin-right:8px;">${W} \u0632\u064A\u0627\u0631\u0629 (${Q}%)</span>
                            </div>
                            <div style="width:100%;height:6px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                                <div style="width:${Q}%;height:100%;background:linear-gradient(90deg, #38bdf8 0%, #0284c7 100%);border-radius:9999px;"></div>
                            </div>
                        </div>
                    `}).join(""));const N=this._cGroupBy(f,k=>k.employeeDepartment||k.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",10),H=document.getElementById("clinic-depts-list");H&&(u===0||N.labels.length===0?H.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>':H.innerHTML=N.labels.map((k,z)=>{const W=N.data[z],Q=Math.round(W/u*100);return`
                        <div style="cursor:pointer;padding:4px;border-radius:6px;transition:background 0.2s;" 
                             onmouseover="this.style.background='#eff6ff'" 
                             onmouseout="this.style.background='transparent'"
                             onclick="const el = document.getElementById('clinic-af-dept'); if(el){el.value='${Utils.escapeHTML(k)}'; el.dispatchEvent(new Event('change'));}">
                            <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:700;color:#374151;margin-bottom:4px;">
                                <span>${Utils.escapeHTML(k)}</span>
                                <span style="color:#2563eb;">${W} \u0632\u064A\u0627\u0631\u0629 (${Q}%)</span>
                            </div>
                            <div style="width:100%;height:8px;background:#e5e7eb;border-radius:9999px;overflow:hidden;">
                                <div style="width:${Q}%;height:100%;background:linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);border-radius:9999px;transition:width 0.5s ease-in-out;"></div>
                            </div>
                        </div>
                    `}).join(""));const O=document.getElementById("clinic-factories-cards");if(O)if(u===0)O.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>';else{const k=new Set(c.map(W=>String(W.factoryName||W.factory||"").trim()).filter(W=>W&&W!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")),z=Array.from(k).sort();z.length===0?O.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0635\u0627\u0646\u0639</div>':O.innerHTML=z.map((W,Q)=>{const J=f.filter(pe=>(pe.factoryName||pe.factory||"").trim()===W).length,ce=u>0?Math.round(J/u*100):0,de=[{primary:"#0284c7",light:"#e0f2fe",progress:"linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)"},{primary:"#059669",light:"#ecfdf5",progress:"linear-gradient(90deg, #34d399 0%, #059669 100%)"},{primary:"#7c3aed",light:"#f5f3ff",progress:"linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%)"},{primary:"#ea580c",light:"#fff7ed",progress:"linear-gradient(90deg, #fb923c 0%, #ea580c 100%)"},{primary:"#db2777",light:"#fdf2f8",progress:"linear-gradient(90deg, #f472b6 0%, #db2777 100%)"}],le=de[Q%de.length];return`
                            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:all .2s;cursor:pointer;" 
                                 onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)';this.style.borderColor='${le.primary}'" 
                                 onmouseout="this.style.transform='';this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)';this.style.borderColor='#e2e8f0'"
                                 onclick="const el = document.getElementById('clinic-af-factory'); if(el){el.value='${Utils.escapeHTML(W)}'; el.dispatchEvent(new Event('change'));}">
                                
                                <div style="display:flex;justify-content:space-between;align-items:center;">
                                    <div style="display:flex;align-items:center;gap:8px;">
                                        <div style="width:36px;height:36px;background:${le.light};border-radius:8px;display:flex;align-items:center;justify-content:center;color:${le.primary};">
                                            <i class="fas fa-industry" style="font-size:16px;"></i>
                                        </div>
                                        <span style="font-size:0.9rem;font-weight:800;color:#1e293b;">${Utils.escapeHTML(W)}</span>
                                    </div>
                                    <span style="font-size:1.15rem;font-weight:900;color:${le.primary};">${ce}%</span>
                                </div>
                                
                                <div style="width:100%;height:8px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                                    <div style="width:${ce}%;height:100%;background:${le.progress};border-radius:9999px;"></div>
                                </div>
                                
                                <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;color:#64748b;margin-top:2px;">
                                    <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A: <strong style="color:#334155;">${J}</strong></span>
                                </div>
                            </div>
                        `}).join("")}const B=f.filter(k=>{const z=String(k.contractorName||"").trim(),W=String(k.externalName||"").trim(),Q=String(k.personType||"").trim().toLowerCase();return z||W||Q==="contractor"||Q==="external"}),T=this._cGroupBy(B,k=>String(k.contractorName||k.externalName||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8),M=document.getElementById("clinic-chart-contractor-count");M&&(M.textContent=B.length>0?`${B.length} \u0632\u064A\u0627\u0631\u0629 \u2022 ${T.labels.length} \u0645\u0642\u0627\u0648\u0644`:""),this._cHBar("clinic-chart-contractor",T.labels,T.data,"rgba(8,145,178,0.75)");const I=this._cGroupBy(d,k=>k.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629"),P={\u0645\u0639\u062A\u0645\u062F\u0629:"rgba(16,185,129,0.85)",\u0645\u0631\u0641\u0648\u0636\u0629:"rgba(239,68,68,0.85)","\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629":"rgba(245,158,11,0.85)"};this._cDoughnut("clinic-chart-sl-status",I.labels,I.data,I.labels.map(k=>P[k]||"rgba(148,163,184,0.8)"));const _=this._cGroupBy(p,k=>k.injuryType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._cHBar("clinic-chart-inj-type",_.labels,_.data,"rgba(239,68,68,0.75)");const F=this._cGroupBy(i,k=>k.status||"\u0633\u0627\u0631\u064A"),V={\u0633\u0627\u0631\u064A:"rgba(16,185,129,0.85)",\u0645\u0646\u062A\u0647\u064A:"rgba(239,68,68,0.85)","\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"rgba(245,158,11,0.85)"};this._cDoughnut("clinic-chart-med-status",F.labels,F.data,F.labels.map(k=>V[k]||"rgba(148,163,184,0.8)")),this._cCompare("clinic-chart-compare",a,n,s);const X=E.topByQuantity.slice(0,10);this._cHBar("clinic-chart-med-top-qty",X.map(k=>k.name),X.map(k=>k.totalQty),"rgba(16,185,129,0.78)");const Y=E.byMonth.labels,ae=E.byMonth.data;if(Y.length&&ae.reduce((k,z)=>k+z,0)>0){const k=document.getElementById("clinic-chart-med-monthly"),z=document.getElementById("clinic-chart-med-monthly-empty");if(k){z&&(z.style.display="none"),k.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts["clinic-chart-med-monthly"]&&this._clinicCharts["clinic-chart-med-monthly"].destroy()}catch{}this._clinicCharts["clinic-chart-med-monthly"]=new Chart(k,{type:"line",data:{labels:Y,datasets:[{label:"\u0643\u0645\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",data:ae,borderColor:"rgba(5,150,105,0.9)",backgroundColor:"rgba(16,185,129,0.12)",borderWidth:2.5,pointRadius:4,tension:.35,fill:!0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}}}}})}}else{const k=document.getElementById("clinic-chart-med-monthly"),z=document.getElementById("clinic-chart-med-monthly-empty");k&&(k.style.display="none"),z&&(z.style.display="flex")}this._cDoughnut("clinic-chart-med-ptype",["\u0645\u0648\u0638\u0641","\u0645\u0642\u0627\u0648\u0644"],[E.byPersonType.\u0645\u0648\u0638\u0641||0,E.byPersonType.\u0645\u0642\u0627\u0648\u0644||0],["rgba(59,130,246,0.85)","rgba(249,115,22,0.85)"]),this._cHBar("clinic-chart-med-dept",E.byDepartment.labels,E.byDepartment.data,"rgba(99,102,241,0.75)");const Z=document.getElementById("clinic-med-table-count"),oe=document.getElementById("clinic-med-top-tbody"),ee=E.topByQuantity.slice(0,15);Z&&(Z.textContent=ee.length?`${ee.length} \u062F\u0648\u0627\u0621`:""),oe&&(oe.innerHTML=ee.length===0?'<tr><td colspan="9" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</td></tr>':ee.map((k,z)=>{const W=k.stockRemaining===null?"\u2014":Number(k.stockRemaining).toLocaleString("en-US"),Q=k.stockRemaining!==null&&k.stockRemaining<=10?"#dc2626":"#0f766e",G=k.stockStatus==="\u0645\u0646\u062A\u0647\u064A"?"#dc2626":k.stockStatus==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"#d97706":"#64748b",J=z%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${J};" onmouseover="this.style.background='#ecfdf5'" onmouseout="this.style.background='${J}'">
                        <td style="padding:9px 12px;font-weight:700;color:#64748b;">${z+1}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#047857;">${Utils.escapeHTML(k.name)}</td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;">${Number(k.totalQty).toLocaleString("en-US")}</td>
                        <td style="padding:9px 12px;text-align:center;">${k.dispenseCount}</td>
                        <td style="padding:9px 12px;text-align:center;">${k.visitsCount}</td>
                        <td style="padding:9px 12px;text-align:center;">${k.avgQty}</td>
                        <td style="padding:9px 12px;">${Utils.escapeHTML(k.type)}</td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${Q};">${W}</td>
                        <td style="padding:9px 12px;color:${G};">${Utils.escapeHTML(k.stockStatus)}</td>
                    </tr>`}).join(""));const te=document.getElementById("clinic-med-low-stock-alert"),se=document.getElementById("clinic-med-low-stock-list");te&&se&&(E.lowStockHighDemand.length>0?(te.style.display="block",se.innerHTML=E.lowStockHighDemand.map(k=>`<li><strong>${Utils.escapeHTML(k.name)}</strong>: \u0645\u0646\u0635\u0631\u0641 ${k.totalQty} \u2014 \u0645\u062E\u0632\u0648\u0646 ${k.stockRemaining??"\u2014"}</li>`).join("")):(te.style.display="none",se.innerHTML=""));const K={};f.forEach(k=>{const z=k.contractorWorkerName||k.employeeName||k.externalName||k.personName||k.name||"",W=String(z).trim(),Q=String(k.contractorName||"").trim(),G=W||(Q?Q+" (\u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0639\u0627\u0645\u0644)":"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");K[G]||(K[G]={count:0,dept:"",loc:""}),K[G].count++,K[G].dept||(K[G].dept=k.employeeDepartment||k.department||k.contractorName||k.contractorPosition||"\u2014"),K[G].loc||(K[G].loc=k.employeeLocation||k.workArea||k.factoryName||k.factory||"\u2014")});const ne=Object.entries(K).sort((k,z)=>z[1].count-k[1].count).slice(0,15),re=document.getElementById("clinic-top-visitors-count"),ie=document.getElementById("clinic-top-visitors-tbody");re&&(re.textContent=`${ne.length} \u0634\u062E\u0635`),ie&&(ie.innerHTML=ne.length===0?'<tr><td colspan="5" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0632\u064A\u0627\u0631\u0627\u062A</td></tr>':ne.map(([k,z],W)=>{const Q=W%2===0?"#fff":"#fafafa",G=z.count>=5?"#dc2626":z.count>=3?"#f59e0b":"#0d9488";return`<tr style="border-bottom:1px solid #f8fafc;background:${Q};" onmouseover="this.style.background='#f0fdfa'" onmouseout="this.style.background='${Q}'">
                        <td style="padding:9px 12px;font-weight:700;color:#64748b;">${W+1}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#0f766e;">${Utils.escapeHTML(k)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(z.dept)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(z.loc)}</td>
                        <td style="padding:9px 12px;text-align:center;"><span style="background:#f0fdfa;color:${G};padding:3px 10px;border-radius:20px;font-weight:700;font-size:0.82rem;">${z.count} \u0632\u064A\u0627\u0631\u0629</span></td>
                    </tr>`}).join(""))},_clinicApplyFilters(e){const t=c=>{const d=document.getElementById(c);return d?d.value.trim():""},a=t("clinic-af-factory"),i=t("clinic-af-ptype"),n=t("clinic-af-dept"),s=t("clinic-af-loc"),o=t("clinic-af-reason"),l=[a,i,n,s,o].some(c=>c!==""),r=document.getElementById("clinic-filter-badge");return r&&(r.style.display=l?"inline":"none"),e.filter(c=>!(a&&String(c.factoryName||c.factory||"").trim()!==a||i&&(String(c.personType||"").toLowerCase()==="contractor"?"contractor":"employee")!==i||n&&String(c.employeeDepartment||c.department||"").trim()!==n||s&&String(c.employeeLocation||c.workArea||"").trim()!==s||o&&String(c.reason||c.diagnosis||"").trim()!==o))},_clinicPopulateFilters(e){const t=n=>[...new Set(e.map(n).filter(Boolean))].sort(),a=(n,s)=>{const o=document.getElementById(n);if(!o)return;const l=o.value;o.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+s.map(r=>`<option value="${r}"${r===l?" selected":""}>${r}</option>`).join("")},i=document.getElementById("clinic-af-ptype");if(i){const n=i.value;i.innerHTML=`<option value="">\u0627\u0644\u0643\u0644</option><option value="employee"${n==="employee"?" selected":""}>\u0645\u0648\u0638\u0641</option><option value="contractor"${n==="contractor"?" selected":""}>\u0645\u0642\u0627\u0648\u0644</option>`}a("clinic-af-factory",t(n=>String(n.factoryName||n.factory||"").trim())),a("clinic-af-dept",t(n=>String(n.employeeDepartment||n.department||"").trim())),a("clinic-af-loc",t(n=>String(n.employeeLocation||n.workArea||"").trim())),a("clinic-af-reason",t(n=>String(n.reason||n.diagnosis||"").trim()))},_cGroupBy(e,t,a=0){const i={};e.forEach(s=>{const o=t(s)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";i[o]=(i[o]||0)+1});let n=Object.entries(i).sort((s,o)=>o[1]-s[1]);return a>0&&(n=n.slice(0,a)),{labels:n.map(s=>s[0]),data:n.map(s=>s[1])}},_cDoughnut(e,t,a,i){const n=document.getElementById(e),s=document.getElementById(e+"-empty");if(!n)return;if(!a.length||a.reduce((l,r)=>l+r,0)===0){n.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),n.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}const o=a.reduce((l,r)=>l+r,0);this._clinicCharts[e]=new Chart(n,{type:"doughnut",data:{labels:t,datasets:[{data:a,backgroundColor:i,borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.parsed} (${o>0?(l.parsed/o*100).toFixed(1):0}%)`}}}}})},_cHBar(e,t,a,i){const n=document.getElementById(e),s=document.getElementById(e+"-empty");if(n){if(!a.length||a.reduce((o,l)=>o+l,0)===0){n.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),n.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}this._clinicCharts[e]=new Chart(n,{type:"bar",data:{labels:t,datasets:[{data:a,backgroundColor:i||"rgba(13,148,136,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:o=>` ${o.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:o=>String(t[o]).length>18?String(t[o]).slice(0,17)+"\u2026":t[o]}}}}})}},_cTrend(e,t,a){const i=document.getElementById(e),n=document.getElementById(e+"-empty");if(!i)return;const s=new Date,o=[],l=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];for(let c=11;c>=0;c--){const d=new Date(s.getFullYear(),s.getMonth()-c,1);o.push({y:d.getFullYear(),m:d.getMonth(),label:`${l[d.getMonth()]} ${d.getFullYear()}`})}const r=o.map(c=>t.filter(d=>{const p=new Date(d[a]||d.createdAt||"");return!isNaN(p.getTime())&&p.getFullYear()===c.y&&p.getMonth()===c.m}).length);if(r.reduce((c,d)=>c+d,0)===0){i.style.display="none",n&&(n.style.display="flex");return}n&&(n.style.display="none"),i.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}this._clinicCharts[e]=new Chart(i,{type:"bar",data:{labels:o.map(c=>c.label),datasets:[{label:"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",data:r,backgroundColor:r.map(c=>c===Math.max(...r)?"rgba(13,148,136,0.9)":"rgba(13,148,136,0.5)"),borderRadius:5,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:r,type:"line",borderColor:"rgba(99,102,241,0.9)",backgroundColor:"rgba(99,102,241,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#6366f1",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_cCompare(e,t,a,i){const n=document.getElementById(e),s=document.getElementById(e+"-empty");if(!n)return;const o=new Date,l=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],r=[];for(let m=11;m>=0;m--){const g=new Date(o.getFullYear(),o.getMonth()-m,1);r.push({y:g.getFullYear(),m:g.getMonth(),label:`${l[g.getMonth()]}`})}const c=(m,g)=>r.map(y=>m.filter(v=>{const h=new Date(v[g]||v.createdAt||"");return!isNaN(h.getTime())&&h.getFullYear()===y.y&&h.getMonth()===y.m}).length),d=c(t,"visitDate"),p=c(a,"startDate"),f=c(i,"injuryDate");if(((m,g,y)=>m.reduce((v,h,w)=>v+h+g[w]+y[w],0))(d,p,f)===0){n.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),n.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[e]&&this._clinicCharts[e].destroy()}catch{}this._clinicCharts[e]=new Chart(n,{type:"bar",data:{labels:r.map(m=>m.label),datasets:[{label:"\u0632\u064A\u0627\u0631\u0627\u062A",data:d,backgroundColor:"rgba(13,148,136,0.75)",borderRadius:4,borderSkipped:!1},{label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",data:p,backgroundColor:"rgba(245,158,11,0.75)",borderRadius:4,borderSkipped:!1},{label:"\u0625\u0635\u0627\u0628\u0627\u062A",data:f,backgroundColor:"rgba(239,68,68,0.75)",borderRadius:4,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_clinicBindAnalyticsEvents(){const e=document.getElementById("clinic-analytics-root");if(!e)return;e.querySelectorAll(".clinic-period-btn").forEach(o=>{o.addEventListener("click",()=>{this._clinicPeriod=o.getAttribute("data-period"),e.querySelectorAll(".clinic-period-btn").forEach(l=>{const r=l===o;l.style.background=r?"#fff":"rgba(255,255,255,0.15)",l.style.color=r?"#134e4a":"#fff"}),this.updateClinicAnalyticsDashboard()})});const t=document.getElementById("clinic-analytics-refresh");t&&t.addEventListener("click",()=>this.updateClinicAnalyticsDashboard());const a=document.getElementById("clinic-export-pdf-btn");a&&a.addEventListener("click",()=>this._clinicExportPDF());const i=document.getElementById("clinic-toggle-filters-btn"),n=document.getElementById("clinic-filter-panel");i&&n&&i.addEventListener("click",()=>{const o=n.style.display!=="none";n.style.display=o?"none":"block",i.style.background=o?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const s=document.getElementById("clinic-filter-reset-btn");s&&s.addEventListener("click",()=>{["clinic-af-factory","clinic-af-ptype","clinic-af-dept","clinic-af-loc","clinic-af-reason"].forEach(o=>{const l=document.getElementById(o);l&&(l.value="")}),this.updateClinicAnalyticsDashboard()}),["clinic-af-factory","clinic-af-ptype","clinic-af-dept","clinic-af-loc","clinic-af-reason"].forEach(o=>{const l=document.getElementById(o);l&&l.addEventListener("change",()=>this.updateClinicAnalyticsDashboard())})},_prepareClinicAnalysisPdfHtmlContent(e){const t=`
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
        `;return typeof e!="string"?"":e.includes("</head>")?e.replace("</head>",t+"</head>"):t+e},async _clinicEnsureHtml2CanvasForPdf_(){return typeof html2canvas<"u"?!0:(await new Promise((e,t)=>{const a=document.createElement("script");a.src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",a.onload=()=>e(),a.onerror=()=>t(new Error("html2canvas")),document.head.appendChild(a)}),typeof html2canvas<"u")},async _clinicExportPDF(){const e=document.getElementById("clinic-analytics-root");if(!e)return;const t=document.getElementById("clinic-export-pdf-btn"),a=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{await this._clinicEnsureHtml2CanvasForPdf_();const i=document.getElementById("clinic-filter-panel"),n=i&&i.style.display!=="none";n&&(i.style.display="none");const s=Math.min(3,Math.max(2.5,(window.devicePixelRatio||1)*2)),o=await html2canvas(e,{scale:s,useCORS:!0,backgroundColor:"#ffffff",scrollX:0,scrollY:-window.scrollY,logging:!1,width:e.scrollWidth,height:e.scrollHeight,windowWidth:e.scrollWidth,windowHeight:e.scrollHeight});n&&(i.style.display="");let l;try{l=o.toDataURL("image/png")}catch{l=o.toDataURL("image/jpeg",.96)}const r=typeof Utils.formatDateTime=="function"?Utils.formatDateTime(new Date):new Date().toLocaleString("ar-EG"),c=this._clinicPeriod==="month"?"\u0622\u062E\u0631 30 \u064A\u0648\u0645":this._clinicPeriod==="quarter"?"\u0622\u062E\u0631 3 \u0623\u0634\u0647\u0631":this._clinicPeriod==="year"?"\u0622\u062E\u0631 \u0633\u0646\u0629":"\u0643\u0644 \u0627\u0644\u0641\u062A\u0631\u0627\u062A",d=`
                <p class="clinic-analysis-pdf-meta">
                    \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644: ${Utils.escapeHTML(c)} &nbsp;|&nbsp; ${Utils.escapeHTML(r)}
                </p>
                <img class="clinic-analysis-pdf-image" src="${l}" alt="Clinic Medical Analysis Dashboard">
            `,p=`CLINIC-MED-ANALYSIS-${new Date().toISOString().slice(0,10)}`,u=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(p,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0637\u0628\u064A \u0644\u0644\u0639\u064A\u0627\u062F\u0629",d,!1,!1,{source:"ClinicMedicalAnalysis",titleEn:"Clinic Medical Analysis Report",titleAr:"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0637\u0628\u064A \u0644\u0644\u0639\u064A\u0627\u062F\u0629",includeQRCode:!1},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl"><body>${d}</body></html>`,m=this._prepareClinicAnalysisPdfHtmlContent(u);if(typeof FormHeader<"u"&&typeof FormHeader.generatePDF=="function"){const g=await FormHeader.generatePDF(m,`Clinic-Medical-Analysis-Report-${new Date().toISOString().slice(0,10)}.pdf`);g&&typeof Notification<"u"&&Notification.success?Notification.success("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF..."):!g&&typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}else{const g=new Blob([m],{type:"text/html;charset=utf-8"}),y=URL.createObjectURL(g),v=window.open(y,"_blank");v?(v.onload=()=>{setTimeout(()=>{v.print(),setTimeout(()=>URL.revokeObjectURL(y),1e3)},600)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF")}finally{t&&(t.disabled=!1,t.innerHTML=a)}},renderDataAnalysisCharts(){const e=this.analyzeAllClinicData();typeof Chart<"u"?this.renderChartsWithChartJS(e):this.renderChartsWithCSS(e)},renderChartsWithChartJS(e){const t=document.getElementById("medications-status-chart");if(t&&Object.keys(e.medications.byStatus).length>0){const n=Object.entries(e.medications.byStatus);new Chart(t,{type:"pie",data:{labels:n.map(([s])=>s),datasets:[{data:n.map(([,s])=>s),backgroundColor:["#10b981","#f59e0b","#ef4444","#3b82f6","#8b5cf6"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:!0}}}})}const a=document.getElementById("visits-month-chart");if(a&&Object.keys(e.visits.byMonth).length>0){const n=Object.entries(e.visits.byMonth).sort();new Chart(a,{type:"line",data:{labels:n.map(([s])=>s),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",data:n.map(([,s])=>s),borderColor:"#3b82f6",backgroundColor:"rgba(59, 130, 246, 0.1)",tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})}const i=document.getElementById("injuries-type-chart");if(i&&Object.keys(e.injuries.byType).length>0){const n=Object.entries(e.injuries.byType).sort((s,o)=>o[1]-s[1]).slice(0,10);new Chart(i,{type:"bar",data:{labels:n.map(([s])=>s),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",data:n.map(([,s])=>s),backgroundColor:"#ef4444"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})}},renderChartsWithCSS(e){const t=document.getElementById("medications-status-chart-container");if(t&&Object.keys(e.medications.byStatus).length>0){const n=Object.entries(e.medications.byStatus),s=Math.max(...n.map(([,o])=>o),1);t.innerHTML=`
                <div class="space-y-2 mt-4">
                    ${n.map(([o,l])=>`
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-700 w-32">${Utils.escapeHTML(o)}</span>
                            <div class="flex-1 bg-gray-200 rounded h-6 relative">
                                <div class="bg-blue-500 h-6 rounded flex items-center justify-end pr-2" style="width: ${l/s*100}%">
                                    <span class="text-xs font-semibold text-white">${l}</span>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `}const a=document.getElementById("visits-month-chart-container");if(a&&Object.keys(e.visits.byMonth).length>0){const n=Object.entries(e.visits.byMonth).sort(),s=Math.max(...n.map(([,o])=>o),1);a.innerHTML=`
                <div class="space-y-2 mt-4">
                    ${n.map(([o,l])=>`
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-700 w-24">${Utils.escapeHTML(o)}</span>
                            <div class="flex-1 bg-gray-200 rounded h-6 relative">
                                <div class="bg-green-500 h-6 rounded flex items-center justify-end pr-2" style="width: ${l/s*100}%">
                                    <span class="text-xs font-semibold text-white">${l}</span>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `}const i=document.getElementById("injuries-type-chart-container");if(i&&Object.keys(e.injuries.byType).length>0){const n=Object.entries(e.injuries.byType).sort((o,l)=>l[1]-o[1]).slice(0,10),s=Math.max(...n.map(([,o])=>o),1);i.innerHTML=`
                <div class="space-y-2 mt-4">
                    ${n.map(([o,l])=>`
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-700 w-32">${Utils.escapeHTML(o)}</span>
                            <div class="flex-1 bg-gray-200 rounded h-6 relative">
                                <div class="bg-red-500 h-6 rounded flex items-center justify-end pr-2" style="width: ${l/s*100}%">
                                    <span class="text-xs font-semibold text-white">${l}</span>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `}this.renderAllCSSCharts(e)},renderAllCSSCharts(e){[{id:"medications-type-chart",data:e.medications.byType,color:"#8b5cf6"},{id:"medications-location-chart",data:e.medications.byLocation,color:"#3b82f6"},{id:"visits-reason-chart",data:e.visits.byReason,color:"#10b981"},{id:"visits-department-chart",data:e.visits.byDepartment,color:"#3b82f6"},{id:"visits-location-chart",data:e.visits.byLocation,color:"#06b6d4"},{id:"sickleave-month-chart",data:e.sickLeaves.byMonth,color:"#f59e0b"},{id:"sickleave-status-chart",data:e.sickLeaves.byStatus,color:"#f59e0b"},{id:"sickleave-department-chart",data:e.sickLeaves.byDepartment,color:"#f59e0b"},{id:"injuries-month-chart",data:e.injuries.byMonth,color:"#ef4444"},{id:"injuries-location-chart",data:e.injuries.byLocation,color:"#ef4444"},{id:"injuries-department-chart",data:e.injuries.byDepartment,color:"#ef4444"},{id:"injuries-status-chart",data:e.injuries.byStatus,color:"#ef4444"},{id:"supply-status-chart",data:e.supplyRequests.byStatus,color:"#06b6d4"},{id:"supply-type-chart",data:e.supplyRequests.byType,color:"#06b6d4"},{id:"supply-priority-chart",data:e.supplyRequests.byPriority,color:"#06b6d4"},{id:"supply-month-chart",data:e.supplyRequests.byMonth,color:"#06b6d4"}].forEach(({id:a,data:i,color:n})=>{const s=document.getElementById(`${a}-container`);if(s&&i&&Object.keys(i).length>0){const o=Object.entries(i).sort((r,c)=>c[1]-r[1]),l=Math.max(...o.map(([,r])=>r),1);s.innerHTML=`
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
                `}})},refreshDataAnalysisTab(){this.state.activeTab==="data-analysis"&&this.renderDataAnalysisTab()},exportDataAnalysisToExcel(){if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=this.analyzeAllClinicData(),t=XLSX.utils.book_new(),a=[["\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A","\u0627\u0644\u0639\u062F\u062F"],["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",e.summary.totalRecords],["\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629",e.summary.totalVisits],["\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",e.summary.totalSickLeaves],["\u0625\u0635\u0627\u0628\u0627\u062A",e.summary.totalInjuries],["\u0627\u0644\u0623\u062F\u0648\u064A\u0629",e.summary.totalMedications],["\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A",e.summary.totalSupplyRequests]],i=XLSX.utils.aoa_to_sheet(a);XLSX.utils.book_append_sheet(t,i,"\u0645\u0644\u062E\u0635 \u0639\u0627\u0645");const n=(o,l)=>{const r=[[l,"\u0627\u0644\u0639\u062F\u062F"]];return Object.entries(o).sort((c,d)=>d[1]-c[1]).forEach(([c,d])=>{r.push([c,d])}),XLSX.utils.aoa_to_sheet(r)};Object.keys(e.medications.byStatus).length>0&&XLSX.utils.book_append_sheet(t,n(e.medications.byStatus,"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 - \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629"),"\u0623\u062F\u0648\u064A\u0629-\u062D\u0627\u0644\u0629"),Object.keys(e.medications.byType).length>0&&XLSX.utils.book_append_sheet(t,n(e.medications.byType,"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 - \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639"),"\u0623\u062F\u0648\u064A\u0629-\u0646\u0648\u0639"),Object.keys(e.visits.byMonth).length>0&&XLSX.utils.book_append_sheet(t,n(e.visits.byMonth,"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"),"\u0632\u064A\u0627\u0631\u0627\u062A-\u0634\u0647\u0631"),Object.keys(e.visits.byDepartment).length>0&&XLSX.utils.book_append_sheet(t,n(e.visits.byDepartment,"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"),"\u0632\u064A\u0627\u0631\u0627\u062A-\u0625\u062F\u0627\u0631\u0629"),Object.keys(e.sickLeaves.byMonth).length>0&&XLSX.utils.book_append_sheet(t,n(e.sickLeaves.byMonth,"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"),"\u0625\u062C\u0627\u0632\u0627\u062A-\u0634\u0647\u0631"),Object.keys(e.injuries.byType).length>0&&XLSX.utils.book_append_sheet(t,n(e.injuries.byType,"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639"),"\u0625\u0635\u0627\u0628\u0627\u062A-\u0646\u0648\u0639"),Object.keys(e.supplyRequests.byStatus).length>0&&XLSX.utils.book_append_sheet(t,n(e.supplyRequests.byStatus,"\u0627\u0644\u0637\u0644\u0628\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629"),"\u0637\u0644\u0628\u0627\u062A-\u062D\u0627\u0644\u0629");const s=`Clinic_Data_Analysis_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(t,s),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},exportDataAnalysisToPDF(){const e=this.analyzeAllClinicData(),t=(s,o)=>{if(!o||Object.keys(o).length===0)return"";const l=Object.entries(o).sort((r,c)=>c[1]-r[1]).map(([r,c])=>`
                    <tr>
                        <td>${Utils.escapeHTML(r)}</td>
                        <td class="text-center">${c}</td>
                    </tr>
                `).join("");return`
                <div class="section-title">${s}</div>
                <table>
                    <thead>
                        <tr>
                            <th>${s}</th>
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
        `,i=`CLINIC-DATA-ANALYSIS-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(i,"\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const s=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(s),l=window.open(o,"_blank");l?(l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0645\u0644\u0641 PDF \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(s){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",s),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644")}},scheduleVisitsTabRender(e=!1,t=0){this._visitsRenderTimer&&(clearTimeout(this._visitsRenderTimer),this._visitsRenderTimer=null);const a=()=>{this._visitsRenderTimer=null,requestAnimationFrame(()=>{this.renderVisitsTab(e)})};this._visitsRenderTimer=setTimeout(a,Math.max(0,t))},scheduleAttendanceTabRender(e=0){this._attendanceRenderTimer&&(clearTimeout(this._attendanceRenderTimer),this._attendanceRenderTimer=null);const t=()=>{this._attendanceRenderTimer=null,requestAnimationFrame(()=>{this.renderAttendanceTab()})};this._attendanceRenderTimer=setTimeout(t,Math.max(0,e))},scheduleMedicationsTabRender(e=0){this._medicationsRenderTimer&&(clearTimeout(this._medicationsRenderTimer),this._medicationsRenderTimer=null);const t=()=>{this._medicationsRenderTimer=null,requestAnimationFrame(()=>{this.renderMedicationsTab()})};this._medicationsRenderTimer=setTimeout(t,Math.max(0,e))},async renderVisitsTab(e=!1){try{const t=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');if(!t){Utils.safeWarn("\u26A0\uFE0F \u0644\u0648\u062D\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}this.ensureData(),this.ensureFilterDefaults();const a=this.shouldFetchClinicVisitsFromBackend({forceRefresh:e});this.renderVisitsTabContent(t),a&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&this.loadVisitsDataFromBackend().then(()=>{const i=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');i&&this.state&&this.state.activeTab==="visits"&&(this.ensureData(),this.renderVisitsTabContent(i)),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645 (\u0628\u062F\u0648\u0646 \u062D\u062C\u0628 \u0627\u0644\u0648\u0627\u062C\u0647\u0629)")}).catch(i=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",i&&i.message)})}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u062A\u0628\u0648\u064A\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",t);const a=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');a&&(a.innerHTML=`
                    <div class="p-4 text-center">
                        <div class="text-red-600 mb-2">
                            <i class="fas fa-exclamation-triangle"></i>
                            \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F
                        </div>
                        <button type="button" class="btn-primary mt-4" onclick="Clinic.renderVisitsTab(true)">
                            <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                        </button>
                    </div>
                `)}},mergeClinicVisitsWithLocalOnly(e,t){const a=Array.isArray(e)?e:[],i=Array.isArray(t)?t:[],n=new Set;a.forEach(l=>{l&&l.id!=null&&String(l.id).trim()!==""&&n.add(String(l.id))});const s=[];if(i.forEach(l=>{if(!l||l.id==null||String(l.id).trim()==="")return;const r=String(l.id);if(!n.has(r)&&!a.some(d=>{if(d.personType!==l.personType||d.visitDate!==l.visitDate)return!1;if(d.personType==="employee"){const p=String(d.employeeCode||d.employeeNumber||"").trim(),f=String(l.employeeCode||l.employeeNumber||"").trim();if(p&&f&&p===f)return!0;const u=Clinic.normalizeArabicText(d.employeeName),m=Clinic.normalizeArabicText(l.employeeName);return!!u&&u===m}else{const p=Clinic.normalizeArabicText(d.contractorName||d.externalName),f=Clinic.normalizeArabicText(l.contractorName||l.externalName),u=Clinic.normalizeArabicText(d.contractorWorkerName),m=Clinic.normalizeArabicText(l.contractorWorkerName);return p===f&&u===m}})){const d=new Date(l.createdAt||l.visitDate).getTime(),p=new Date().getTime();(!isNaN(d)&&p-d<72e5||isNaN(d))&&(n.add(r),s.push(l))}}),s.length===0)return a.slice();AppState.debugMode&&s.length>0&&Utils.safeLog(`\u{1F4DD} [CLINIC] \u062F\u0645\u062C ${s.length} \u0633\u062C\u0644\u0627\u062A \u0645\u062D\u0644\u064A\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0631\u062F \u0627\u0644\u062E\u0627\u062F\u0645 (\u0642\u062F \u064A\u0643\u0648\u0646 \u0643\u0627\u0634 \u0642\u062F\u064A\u0645)`);const o=a.concat(s);return o.sort((l,r)=>{const c=new Date(l.visitDate||l.createdAt||0).getTime();return new Date(r.visitDate||r.createdAt||0).getTime()-c}),o},assertClinicVisitRpcResult(e){if(!e||e.success!==!0){const t=e&&e.message?e.message:"\u0644\u0645 \u064A\u064F\u0624\u0643\u062F \u0627\u0644\u062E\u0627\u062F\u0645 \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629";throw new Error(t)}},applyClinicVisitIdFromServer(e,t){if(!e||!t||!t.visitId)return;const a=String(t.visitId).trim();if(!a||String(e.id)===a)return;const i=e.id;e.id=a;const n=AppState.appData.clinicVisits;if(!Array.isArray(n))return;const s=n.findIndex(o=>o&&o.id===i);s!==-1&&(n[s]={...n[s],id:a})},shouldFetchClinicVisitsFromBackend(e={}){if(e&&e.forceRefresh===!0||typeof AppState>"u"||!AppState||!AppState.appData)return!0;if(this._visitsBackendFetchOk===!0)return!1;const t=AppState.appData.clinicVisits;if(Array.isArray(t)&&t.length>0){const a=localStorage.getItem("clinic_last_sync");if(a){const i=Date.now()-parseInt(a,10),n=600*1e3;if(!isNaN(i)&&i<n)return!1}}return!0},async loadVisitsDataFromBackend(){if(this._clinicVisitsLoadPromise)return this._clinicVisitsLoadPromise;const e=Array.isArray(AppState.appData.clinicVisits)?AppState.appData.clinicVisits.slice():[];return this._clinicVisitsLoadPromise=(async()=>{try{AppState.debugMode&&Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 Backend...");const t=await Utils.promiseWithTimeout(GoogleIntegration.sendRequest({action:"getAllClinicVisits",data:{__timeoutMs:12e4}}),12e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F");if(t&&t.success&&Array.isArray(t.data)){const a=t.data.map(o=>{if(!o||typeof o!="object")return o;o.personType||(o.contractorName||o.contractorWorkerName||o.externalName?o.personType="contractor":o.personType="employee");let l=[];if(o.medications&&(l=this.normalizeVisitMedications(o.medications),AppState.debugMode&&l.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${l.length} \u062F\u0648\u0627\u0621 \u0645\u0646 medications \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`)),(!l||l.length===0)&&o.medicationsDispensed){const r=this.normalizeVisitMedications(o.medicationsDispensed);r&&r.length>0&&(l=r,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,r.length,"\u062F\u0648\u0627\u0621"))}if(o.medications=l&&l.length>0?l:[],o.visitDate)try{if(o.visitDate instanceof Date)isNaN(o.visitDate.getTime())?o.visitDate=null:o.visitDate=o.visitDate.toISOString();else{const r=String(o.visitDate).trim();if(r.includes("T")&&(r.includes("Z")||r.includes("+")||r.includes("-"))){const c=new Date(r);isNaN(c.getTime())?o.visitDate=null:o.visitDate=c.toISOString()}else if(r.length===10&&r.match(/^\d{4}-\d{2}-\d{2}$/)){const c=new Date(r+"T00:00:00");isNaN(c.getTime())?o.visitDate=null:o.visitDate=c.toISOString()}else{const c=new Date(r);isNaN(c.getTime())?(AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u062D\u0648\u064A\u0644 visitDate: ${r}`),o.visitDate=null):o.visitDate=c.toISOString()}}}catch(r){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0639 visitDate:",r),o.visitDate=null}if(o.exitDate)try{if(o.exitDate instanceof Date)isNaN(o.exitDate.getTime())?o.exitDate=null:o.exitDate=o.exitDate.toISOString();else{const r=String(o.exitDate).trim();if(r.includes("T")&&(r.includes("Z")||r.includes("+")||r.includes("-"))){const c=new Date(r);isNaN(c.getTime())?o.exitDate=null:o.exitDate=c.toISOString()}else if(r.length===10&&r.match(/^\d{4}-\d{2}-\d{2}$/)){const c=new Date(r+"T00:00:00");isNaN(c.getTime())?o.exitDate=null:o.exitDate=c.toISOString()}else{const c=new Date(r);isNaN(c.getTime())?(AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u062D\u0648\u064A\u0644 exitDate: ${r}`),o.exitDate=null):o.exitDate=c.toISOString()}}}catch(r){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0639 exitDate:",r),o.exitDate=null}if(o.createdBy){if(typeof o.createdBy=="string"){const r=o.createdBy.trim();if(r&&r!==""&&r!=="\u0627\u0644\u0646\u0638\u0627\u0645")o.createdBy=r;else if(r==="\u0627\u0644\u0646\u0638\u0627\u0645"){const c=(o.email||"").toString().trim(),d=(o.userId||"").toString().trim();if(c||d){const f=(AppState.appData.users||[]).find(u=>{const m=(u.email||"").toString().toLowerCase().trim(),g=(u.id||"").toString().trim();return c&&m===c.toLowerCase().trim()||d&&g===d});if(f){const u=(f.name||f.displayName||"").toString().trim();u&&u!=="\u0627\u0644\u0646\u0638\u0627\u0645"&&u!==""?(o.createdBy=u,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 "\u0627\u0644\u0646\u0638\u0627\u0645" \u0628\u0640 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}: ${u}`)):o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy=null}else if(typeof o.createdBy=="object"){const c=(o.createdBy.name||""||"\u0645\u0633\u062A\u062E\u062F\u0645").trim();o.createdBy=c}}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645";if(o.updatedBy){if(typeof o.updatedBy=="string")o.updatedBy=o.updatedBy.trim()||null;else if(typeof o.updatedBy=="object"){const r=o.updatedBy.name||"";o.updatedBy=(r||"\u0645\u0633\u062A\u062E\u062F\u0645").trim()}}else o.updatedBy="\u0645\u0633\u062A\u062E\u062F\u0645";return o.medications.length===0&&o.medicationsDispensedQty&&o.medicationsDispensedQty>0&&AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${o.medicationsDispensedQty} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629. medicationsDispensed:`,o.medicationsDispensed),o});AppState.appData.clinicVisits=this.mergeClinicVisitsWithLocalOnly(a,e),AppState.appData.clinicContractorVisits=AppState.appData.clinicVisits.filter(o=>o&&o.personType==="contractor"),this.ensureData(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),localStorage.setItem("clinic_last_sync",Date.now().toString()),this._visitsBackendFetchOk=!0;const i=AppState.appData.clinicVisits.filter(o=>{const l=this.normalizeVisitMedications(o.medications);if(l&&l.length>0)return!0;if(o.medicationsDispensed){const r=this.normalizeVisitMedications(o.medicationsDispensed);return r&&r.length>0}return!1}),n=AppState.appData.clinicVisits,s=n.reduce((o,l)=>{const r=this.normalizeVisitMedications(l.medications);if(r&&r.length>0)return o+r.length;if(l.medicationsDispensed){const c=this.normalizeVisitMedications(l.medicationsDispensed);if(c&&c.length>0)return o+c.length}return o},0);AppState.debugMode&&(Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${a.length} \u0632\u064A\u0627\u0631\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u0628\u0639\u062F \u0627\u0644\u062F\u0645\u062C \u0645\u0639 \u0627\u0644\u0645\u062D\u0644\u064A: ${n.length}`),Utils.safeLog(`   - ${n.filter(o=>o.personType==="employee"||!o.personType).length} \u0645\u0648\u0638\u0641`),Utils.safeLog(`   - ${n.filter(o=>o.personType==="contractor").length} \u0645\u0642\u0627\u0648\u0644`),Utils.safeLog(`   - ${i.length} \u0632\u064A\u0627\u0631\u0629 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629`),Utils.safeLog(`   - \u0625\u062C\u0645\u0627\u0644\u064A ${s} \u062F\u0648\u0627\u0621 \u0645\u0646\u0635\u0631\u0641`))}}catch(t){throw AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",t.message),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),t}})().finally(()=>{this._clinicVisitsLoadPromise=null}),this._clinicVisitsLoadPromise},refreshClinicVisitsFromServerAfterSave(){AppState.debugMode&&Utils.safeLog("\u{1F504} [CLINIC] \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638..."),this._clinicVisitsLoadPromise=null,this._visitsBackendFetchOk=!1,this.loadVisitsDataFromBackend().then(()=>{try{this.updateClinicAnalysisResults(),this.calculateClinicCardValues(),document.dispatchEvent(new CustomEvent("clinic-data-refreshed"))}catch(e){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",e)}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}if(this.state&&(this.state.activeTab==="visits"||this.state.activeTab==="dashboard")){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="'+this.state.activeTab+'"]');if(e)try{this.ensureData(),this.state.activeTab==="visits"?this.renderVisitsTabContent(e):this.renderDashboardTab()}catch{}}}).catch(e=>{Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638:",e)})},renderVisitsTabContent(e){try{if(!e){Utils.safeWarn("\u26A0\uFE0F panel \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A renderVisitsTabContent");return}if(typeof AppState>"u"||!AppState.appData){Utils.safeWarn("\u26A0\uFE0F AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u0641\u064A renderVisitsTabContent"),e.innerHTML='<div class="empty-state"><p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div>';return}let t,a;try{const b=this.getTranslations();t=b.t,a=b.isRTL}catch(b){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u062A\u0631\u062C\u0645\u0627\u062A:",b),t=A=>A,a=!0}const i=this.state&&this.state.activeVisitType?this.state.activeVisitType:"employees",n=i==="contractors",s=this.state&&this.state.filters&&this.state.filters.visits?this.state.filters.visits:{search:"",factory:"",position:"",workplace:""},o=(s.search||"").trim(),l=o.toLowerCase(),r=(s.factory||"").trim(),c=(s.position||"").trim(),d=(s.workplace||"").trim();this.ensureData();const p=this.getActualClinicVisits_(AppState.appData.clinicVisits).slice();p.sort((b,A)=>{const E=new Date(b.visitDate||b.createdAt||0).getTime();return new Date(A.visitDate||A.createdAt||0).getTime()-E});const f=p.filter(b=>{if(!b||typeof b!="object")return!1;const A=String(b.personType||"").toLowerCase().trim();return A==="employee"||A===""||!A&&!b.contractorName&&!b.externalName}),u=p.filter(b=>{if(!b||typeof b!="object")return!1;const A=String(b.personType||"").toLowerCase().trim();return A==="contractor"||A==="external"||b.contractorName||b.externalName}),m=i==="employees"?f:u,g=m.filter(b=>{if(r)try{const A=this.getVisitFactoryDisplayName(b);if(String(A||"").trim()!==r)return!1}catch{return!1}if(c){const A=n?b.contractorPosition||b.employeePosition||"":b.employeePosition||"";if(String(A||"").trim()!==c)return!1}if(d){const A=n?b.workArea||b.employeeLocation||"":b.employeeLocation||b.workArea||"";if(String(A||"").trim()!==d)return!1}if(l){const A=String(n?b.contractorName||b.employeeName||b.externalName||"":b.employeeCode||b.employeeNumber||""),E=String(n?b.contractorWorkerName||"":b.employeeName||""),R=String(n?b.contractorPosition||b.employeePosition||"":b.employeePosition||"");let q="-";try{q=this.getVisitFactoryDisplayName(b)}catch{q=b.factoryName||b.factory||"-"}const U=String(n?b.workArea||b.employeeLocation||"":b.employeeLocation||b.workArea||"");let j="-",x="";try{if(b.visitDate){let B=b.visitDate;B instanceof Date?B=B.toISOString():typeof B=="string"&&!B.includes("T")&&B.match(/^\d{4}-\d{2}-\d{2}$/)&&(B=B+"T00:00:00Z"),j=Utils.formatDateTime?Utils.formatDateTime(B):String(B)}if(b.exitDate){let B=b.exitDate;B instanceof Date?B=B.toISOString():typeof B=="string"&&!B.includes("T")&&B.match(/^\d{4}-\d{2}-\d{2}$/)&&(B=B+"T00:00:00Z"),x=Utils.formatDateTime?Utils.formatDateTime(B):String(B)}}catch{j=b.visitDate?String(b.visitDate):"-",x=b.exitDate?String(b.exitDate):""}const S=String(b.reason||""),C=String(b.diagnosis||"");let $=[];if(b.medications)try{$=this.normalizeVisitMedications(b.medications)}catch{$=[]}const N=$&&$.length>0?$.map(B=>{try{let T="";return B&&B.medicationName?T=typeof B.medicationName=="string"?B.medicationName:B.medicationName.name||String(B.medicationName)||"":B&&B.name&&(T=typeof B.name=="string"?B.name:B.name.name||String(B.name)||""),T}catch{return""}}).filter(Boolean).join(" "):"";let H="";try{b.createdBy&&(typeof b.createdBy=="object"?H=String(b.createdBy.name||"\u0645\u0633\u062A\u062E\u062F\u0645"):H=String(b.createdBy||""))}catch{H=""}if(![A,E,R,q,U,j,x,S,C,N,H].join(" ").toLowerCase().includes(l))return!1}return!0}),y=b=>{const A=n?b.contractorName||b.employeeName||b.externalName||"-":b.employeeCode||b.employeeNumber||"-",E=n?b.contractorWorkerName||"-":b.employeeName||"-",R=n?b.contractorPosition||b.employeePosition||"-":b.employeePosition||"-";let q="-";try{q=this.getVisitFactoryDisplayName(b)}catch{q=b.factoryName||b.factory||"-"}const U=n?b.workArea||b.employeeLocation||"-":b.employeeLocation||b.workArea||"-";let j="-",x=`<span class="text-xs text-gray-500">${t("table.notRecorded")}</span>`;try{if(b.visitDate){let M=b.visitDate;M instanceof Date?M=M.toISOString():typeof M=="string"&&!M.includes("T")&&M.match(/^\d{4}-\d{2}-\d{2}$/)&&(M=M+"T00:00:00Z"),j=Utils.formatDateTime?Utils.formatDateTime(M):String(M)}if(b.exitDate){let M=b.exitDate;M instanceof Date?M=M.toISOString():typeof M=="string"&&!M.includes("T")&&M.match(/^\d{4}-\d{2}-\d{2}$/)&&(M=M+"T00:00:00Z"),x=Utils.formatDateTime?Utils.formatDateTime(M):`<span class="text-xs text-gray-500">${t("table.notRecorded")}</span>`}}catch(M){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A:",M),j=b.visitDate?String(b.visitDate):"-",x=b.exitDate?String(b.exitDate):`<span class="text-xs text-gray-500">${t("table.notRecorded")}</span>`}let S="-";try{S=this.calculateTotalTime(b.visitDate,b.exitDate)}catch{S="-"}const C=b.reason||"",$=b.diagnosis||"";let N=[];if(b.medications)try{N=this.normalizeVisitMedications(b.medications),AppState.debugMode&&N.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${N.length} \u062F\u0648\u0627\u0621 \u0645\u0646 medications \u0644\u0632\u064A\u0627\u0631\u0629 ${b.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`)}catch(M){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A normalizeVisitMedications:",M),N=[]}if((!N||N.length===0)&&b.medicationsDispensed)try{const M=this.normalizeVisitMedications(b.medicationsDispensed);M&&M.length>0&&(N=M,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0639\u0631\u0636 \u0644\u0632\u064A\u0627\u0631\u0629 ${b.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,N.length,"\u062F\u0648\u0627\u0621"))}catch(M){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A normalizeVisitMedications \u0645\u0646 medicationsDispensed:",M)}(!N||N.length===0)&&b.medicationsDispensedQty&&b.medicationsDispensedQty>0&&AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${b.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${b.medicationsDispensedQty} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629`);const H=N&&N.length>0?N.map(M=>{try{if(!M||typeof M!="object")return null;let I="";if(M.medicationName?I=typeof M.medicationName=="string"?M.medicationName.trim():(M.medicationName.name||String(M.medicationName)||"").trim():M.name&&(I=typeof M.name=="string"?M.name.trim():(M.name.name||String(M.name)||"").trim()),!I)return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645:",M),null;const P=parseInt(M.quantity,10)||1;return`${Utils.escapeHTML(I)} (${P})`}catch(I){return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062F\u0648\u0627\u0621:",I,M),null}}).filter(Boolean).join(a?"\u060C ":", "):"-",O=N&&N.length>0?N.reduce((M,I)=>{try{const P=parseInt(I.quantity,10)||0;return M+P}catch{return M}},0):0,B=Utils.escapeHTML(this.getUserDisplayName(b.createdBy)),T=a?"right":"left";return`
                <tr>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${T};">${Utils.escapeHTML(A)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${T};">
                        <div class="font-medium text-gray-900">${Utils.escapeHTML(E)}</div>
                    </td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${T};">${Utils.escapeHTML(R)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${T};">${Utils.escapeHTML(q)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${T};">${Utils.escapeHTML(U)}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${T};">${Utils.escapeHTML(j)}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${T};">${x}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${T};">${S}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${T};">${Utils.escapeHTML(C)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${T};">${Utils.escapeHTML($)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 250px; text-align: ${T};"><div style="overflow-wrap: break-word;">${H}</div></td>
                    <td class="text-center font-semibold" style="word-wrap: break-word; white-space: normal;">${O}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${T};">${B}</td>
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
            `},v=g.length?`
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
            `:this.renderEmptyState(t(l?"empty.noResults":i==="employees"?"empty.noEmployeeVisits":"empty.noContractorVisits")),h=a?"ml-2":"mr-2",w=a?"mr-2":"ml-2",D=a?"ml-1":"mr-1",L=`
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4" style="direction: ${a?"rtl":"ltr"};">
                <div class="flex items-center gap-2">
                    <h3 class="text-lg font-semibold" style="text-align: ${a?"right":"left"};">${t("tab.visits")}</h3>
                </div>
                <div class="flex gap-2">
                    <button type="button" id="visits-add-btn" class="btn-primary">
                        <i class="fas fa-plus ${h}"></i>
                        ${t("btn.registerVisit")}
                    </button>
                    <button type="button" id="visits-refresh-btn" class="btn-secondary">
                        <i class="fas fa-sync-alt ${h}"></i>
                        ${t("btn.refresh")}
                    </button>
                    ${typeof Permissions<"u"&&Permissions.isAdmin&&Permissions.isAdmin()?`
                    <button type="button" onclick="const b=this;b.disabled=true;b.innerHTML='\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0631\u062D\u064A\u0644...';GoogleIntegration.sendRequest({action:'migrateContractorVisits'}).then(r=>{alert(r.message);location.reload()}).catch(e=>{alert('\u062E\u0637\u0623:'+e);b.disabled=false;b.innerHTML='\u062A\u0631\u062D\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646'})" class="btn-primary" style="background-color: #d97706; color: white;">
                        <i class="fas fa-broom ${h}"></i>
                        \u062A\u0631\u062D\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                    </button>
                    `:""}
                    <button type="button" id="visits-export-excel-btn" class="btn-success">
                        <i class="fas fa-file-excel ${h}"></i>
                        ${t("btn.exportExcel")}
                    </button>
                    <button type="button" id="visits-export-pdf-btn" class="btn-secondary">
                        <i class="fas fa-file-pdf ${h}"></i>
                        ${t("btn.exportPDF")}
                    </button>
                </div>
            </div>
            
            <!-- \u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0645\u0646\u0641\u0635\u0644\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 -->
            <div class="mb-4" style="direction: ${a?"rtl":"ltr"};">
                <div class="module-tabs-wrapper">
                    <div class="module-tabs-container">
                        <button type="button" 
                            class="visit-type-tab px-6 py-3 font-medium transition-colors ${i==="employees"?"text-blue-600 border-b-2 border-blue-600 active":"text-gray-500 hover:text-gray-700"}"
                            data-visit-type="employees">
                            <i class="fas fa-user-tie ${h}"></i>
                            ${t("tab.employees")}
                            <span class="badge ${i==="employees"?"badge-primary":"badge-secondary"} ${w}">${f.length}</span>
                        </button>
                        <button type="button" 
                            class="visit-type-tab px-6 py-3 font-medium transition-colors ${i==="contractors"?"text-blue-600 border-b-2 border-blue-600 active":"text-gray-500 hover:text-gray-700"}"
                            data-visit-type="contractors">
                            <i class="fas fa-hard-hat ${h}"></i>
                            ${t("tab.contractors")}
                            <span class="badge ${i==="contractors"?"badge-primary":"badge-secondary"} ${w}">${u.length}</span>
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
                            ${r?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${g.length}</span>`:""}
                        </label>
                        <select id="visits-filter-factory" class="filter-input" style="width: 100%; min-width: 140px; direction: ${a?"rtl":"ltr"};">
                            <option value="">${t("filter.all")}</option>
                        </select>
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="visits-filter-position" class="filter-label" style="text-align: ${a?"right":"left"};">
                            <i class="fas fa-briefcase ${D}"></i>${t("filter.jobTitle")}
                            ${c?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${g.length}</span>`:""}
                        </label>
                        <select id="visits-filter-position" class="filter-input" style="width: 100%; min-width: 140px; direction: ${a?"rtl":"ltr"};">
                            <option value="">${t("filter.all")}</option>
                        </select>
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="visits-filter-workplace" class="filter-label" style="text-align: ${a?"right":"left"};">
                            <i class="fas fa-map-marker-alt ${D}"></i>${t("filter.workplace")}
                            ${d?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${g.length}</span>`:""}
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
            
            ${v}
        `;e.innerHTML=L,this.applyModuleI18n(e),typeof requestIdleCallback=="function"?requestIdleCallback(()=>this.updateVisitFilterOptions(m),{timeout:900}):setTimeout(()=>this.updateVisitFilterOptions(m),0);try{const b=e.querySelector("#clinic-visits-tbody");if(b&&Array.isArray(g)&&g.length>0){this._clinicVisitsRowsToken=(this._clinicVisitsRowsToken||0)+1;const A=this._clinicVisitsRowsToken;let E=0;const R=g.length,q=U=>{if(A!==this._clinicVisitsRowsToken||this.state&&this.state.activeTab!=="visits")return;const j=typeof performance<"u"&&performance.now?performance.now():Date.now();let x="",S=0;for(;E<R;){x+=y(g[E]),E+=1,S+=1;const C=typeof performance<"u"&&performance.now?performance.now():Date.now(),$=U&&typeof U.timeRemaining=="function"?U.timeRemaining()>6:C-j<12;if(S>=25&&!$||S>=75)break}x&&b.insertAdjacentHTML("beforeend",x),E<R&&(typeof requestIdleCallback=="function"?requestIdleCallback(q,{timeout:900}):setTimeout(()=>q(null),0))};typeof requestIdleCallback=="function"?requestIdleCallback(q,{timeout:900}):setTimeout(()=>q(null),0)}}catch{}this.bindVisitsTabEvents(e),this.state._shouldFocusSearch&&requestAnimationFrame(()=>{const b=e.querySelector("#visits-search");if(b){b.focus();const A=this.state._searchCursorPosition;if(A!=null)try{b.setSelectionRange(A,A)}catch{}this.state._shouldFocusSearch=!1}}),requestAnimationFrame(()=>{const b=e.querySelector(".clinic-table-wrapper");b&&this.setupTableScrollListeners(b)})}catch(t){const a=t instanceof Error?t.message:typeof t=="string"?t:JSON.stringify(t);if(Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062D\u062A\u0648\u0649 \u062A\u0628\u0648\u064A\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",a),e)try{e.innerHTML=`
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                            <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                            <p class="text-sm text-gray-400">${Utils.escapeHTML(a)}</p>
                            <button type="button" class="btn-primary mt-4" onclick="Clinic.renderVisitsTab()">
                                <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    `}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u062E\u0637\u0623:",i)}}},calculateTotalTime(e,t){if(!e||!t)return"-";try{const{t:a}=this.getTranslations(),i=e instanceof Date?e:new Date(e),n=t instanceof Date?t:new Date(t);if(isNaN(i.getTime())||isNaN(n.getTime()))return"-";const s=n.getTime()-i.getTime();if(s<0)return"-";const o=Math.floor(s/(1e3*60)),l=Math.floor(o/60),r=o%60;return l>0&&r>0?`${l} ${a("time.hours")} ${r} ${a("time.minutes")}`:l>0?`${l} ${a("time.hours")}`:r>0?`${r} ${a("time.minutes")}`:a("time.lessThanMinute")}catch(a){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0627\u0644\u0648\u0642\u062A:",a),"-"}},cleanMedicationName(e,t=null){if(!e||typeof e!="string")return{name:e||"",quantity:t??0};const a=e.trim(),i=a.match(/^(.+?)\s*\(\s*(\d+)\s*\)\s*$/);if(i){const s=i[1].trim();return t!=null?{name:s,quantity:t}:{name:s,quantity:0}}return{name:a,quantity:t??0}},normalizeVisitMedications(e){if(!e)return[];if(Array.isArray(e)){const t=e.map(a=>{if(!a||typeof a!="object")return null;let i=a.medicationName||a.name||"";if(typeof i=="object"&&i!==null&&(i=i.medicationName||i.name||""),i=(i||"").toString().trim(),!i)return null;const n=parseInt(a.quantity,10)||1,s=this.cleanMedicationName(i,n),o=typeof s.name=="string"?s.name.trim():s.name&&s.name.name?s.name.name.trim():String(s.name||"").trim();return o?{medicationName:o,quantity:s.quantity||n||1,unit:a.unit||"\u0648\u062D\u062F\u0629",notes:a.notes||""}:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641:",a,s),null)}).filter(a=>a!==null&&a.medicationName);return AppState.debugMode&&t.length===0&&e.length>0&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u0637\u0628\u064A\u0639 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",e),t}if(typeof e=="string"){const t=e.trim();if(!t)return[];try{const a=JSON.parse(t);if(Array.isArray(a)){const i=a.map(n=>{if(!n||typeof n!="object")return null;let s=n.medicationName||n.name||"";if(typeof s=="object"&&s!==null&&(s=s.medicationName||s.name||""),s=(s||"").toString().trim(),!s)return null;const o=parseInt(n.quantity,10)||1,l=this.cleanMedicationName(s,o),r=typeof l.name=="string"?l.name.trim():l.name&&l.name.name?l.name.name.trim():String(l.name||"").trim();return r?{medicationName:r,quantity:l.quantity||o||1,unit:n.unit||"\u0648\u062D\u062F\u0629",notes:n.notes||""}:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641 (JSON):",n,l),null)}).filter(n=>n!==null&&n.medicationName);if(i.length>0)return i}}catch{}try{const a=t.split(/،|,/).map(n=>n.trim()).filter(Boolean),i=[];if(a.forEach(n=>{const s=n.match(/^(.+?)(?:\s*\(\s*(\d+)\s*\))?\s*$/);if(!s){const r=n.trim();r&&i.push({medicationName:r,quantity:1,unit:"\u0648\u062D\u062F\u0629",notes:""});return}let o=(s[1]||"").trim(),l=s[2]?parseInt(s[2],10):1;if(o){const r=this.cleanMedicationName(o,l);o=r.name,l=r.quantity||l||1;const c=typeof o=="string"?o.trim():String(o||"").trim();c&&i.push({medicationName:c,quantity:isNaN(l)?1:l,unit:"\u0648\u062D\u062F\u0629",notes:""})}}),i.length>0)return AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0644\u064A\u0644 ${i.length} \u062F\u0648\u0627\u0621 \u0645\u0646 \u0627\u0644\u0646\u0635:`,t),i}catch(a){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0644\u064A\u0644 \u0646\u0635 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",t,a)}return[]}if(typeof e=="object"&&e!==null){let t=(e.medicationName||e.name||"").trim();if(t){const a=parseInt(e.quantity,10)||1,i=this.cleanMedicationName(t,a),n=typeof i.name=="string"?i.name.trim():i.name&&i.name.name?i.name.name.trim():String(i.name||"").trim();return n?[{medicationName:n,quantity:i.quantity||a||1,unit:e.unit||"\u0648\u062D\u062F\u0629",notes:e.notes||""}]:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641 (object):",e,i),[])}}return[]},getVisitFactoryDisplayName(e){try{if(!e||typeof e!="object")return"-";if(e.factoryName)return String(e.factoryName);if(e.factory){const t=this.getSiteOptions?this.getSiteOptions():[],a=Array.isArray(t)?t.find(i=>i.id===e.factory||i.name===e.factory):null;return a&&a.name?String(a.name):String(e.factory)}return"-"}catch{return"-"}},resetVisitFilters(){const e=document.getElementById("visits-search");e&&(e.value="");const t=document.getElementById("visits-filter-factory");t&&(t.value="");const a=document.getElementById("visits-filter-position");a&&(a.value="");const i=document.getElementById("visits-filter-workplace");i&&(i.value=""),this.state.filters=this.state.filters||{},this.state.filters.visits={search:"",factory:"",position:"",workplace:""},this.renderVisitsTab()},updateVisitFilterOptions(e){if(!e||!Array.isArray(e))return;const{t}=this.getTranslations(),a=(this.state.activeVisitType||"employees")==="contractors",i=[...new Set(e.map(u=>{const m=this.getVisitFactoryDisplayName(u);return m&&m!=="-"?m:null}).filter(Boolean))].sort(),n=[...new Set(e.map(u=>{const m=a?u.contractorPosition||u.employeePosition||"":u.employeePosition||"";return m&&m!=="-"?m:null}).filter(Boolean))].sort(),s=[...new Set(e.map(u=>{const m=a?u.workArea||u.employeeLocation||"":u.employeeLocation||u.workArea||"";return m&&m!=="-"?m:null}).filter(Boolean))].sort(),o=this.state&&this.state.filters&&this.state.filters.visits?this.state.filters.visits:{search:"",factory:"",position:"",workplace:""},l=o.factory||document.getElementById("visits-filter-factory")?.value||"",r=o.position||document.getElementById("visits-filter-position")?.value||"",c=o.workplace||document.getElementById("visits-filter-workplace")?.value||"",d=document.getElementById("visits-filter-factory");d&&(d.innerHTML=`<option value="">${t("filter.all")}</option>`+i.map(u=>`<option value="${Utils.escapeHTML(u)}" ${u===l?"selected":""}>${Utils.escapeHTML(u)}</option>`).join(""));const p=document.getElementById("visits-filter-position");p&&(p.innerHTML=`<option value="">${t("filter.all")}</option>`+n.map(u=>`<option value="${Utils.escapeHTML(u)}" ${u===r?"selected":""}>${Utils.escapeHTML(u)}</option>`).join(""));const f=document.getElementById("visits-filter-workplace");f&&(f.innerHTML=`<option value="">${t("filter.all")}</option>`+s.map(u=>`<option value="${Utils.escapeHTML(u)}" ${u===c?"selected":""}>${Utils.escapeHTML(u)}</option>`).join(""))},bindVisitsTabEvents(e){const t=e.querySelector("#visits-add-btn"),a=e.querySelector("#visits-add-new-btn"),i=e.querySelector("#visits-refresh-btn"),n=e.querySelector("#visits-export-excel-btn"),s=e.querySelector("#visits-export-pdf-btn"),o=e.querySelector("#visits-search");t?.addEventListener("click",()=>this.showVisitForm()),a?.addEventListener("click",()=>this.showEnhancedVisitForm()),i?.addEventListener("click",()=>{this.renderVisitsTab(!0),Notification.success("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...")}),n?.addEventListener("click",()=>this.exportVisitsToExcel()),s?.addEventListener("click",()=>this.exportVisitsToPDF()),o&&o.addEventListener("input",p=>{const f=(p.target.value||"").toString(),u=p.target.selectionStart!==null&&p.target.selectionStart!==void 0?p.target.selectionStart:f.length;this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.search=f,this.state._searchCursorPosition=u,this.state._shouldFocusSearch=!0,this.scheduleVisitsTabRender(!1,150)});const l=e.querySelector("#visits-filter-factory");l&&l.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.factory=l.value||"",this.scheduleVisitsTabRender(!1,50)});const r=e.querySelector("#visits-filter-position");r&&r.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.position=r.value||"",this.scheduleVisitsTabRender(!1,50)});const c=e.querySelector("#visits-filter-workplace");c&&c.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.workplace=c.value||"",this.scheduleVisitsTabRender(!1,50)});const d=e.querySelector("#visits-reset-filters");d&&d.addEventListener("click",()=>{this.resetVisitFilters()}),e.querySelectorAll(".visit-type-tab").forEach(p=>{p.addEventListener("click",()=>{try{const f=p.getAttribute("data-visit-type");if(!f){Utils.safeWarn("\u26A0\uFE0F \u0646\u0648\u0639 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F");return}this.state.activeVisitType=f,this.scheduleVisitsTabRender(!1,30)}catch(f){if(Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",f),this.state&&this.state.activeVisitType)try{this.scheduleVisitsTabRender(!1,30)}catch(u){Utils.safeError("\u274C \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u0639\u0631\u0636 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",u)}}})}),e.hasAttribute("data-visits-actions-delegation")||(e.setAttribute("data-visits-actions-delegation","true"),e.addEventListener("click",p=>{try{const f=p.target?.closest?.('[data-action="view-visit"],[data-action="edit-visit"]');if(!f)return;const u=f.getAttribute("data-action"),m=f.getAttribute("data-id");if(!m)return;const g=(AppState.appData.clinicVisits||[]).find(y=>y.id===m);if(!g)return;u==="view-visit"?this.viewVisitDetails(g):u==="edit-visit"&&this.showVisitForm(g)}catch{}},{passive:!0}))},viewVisitDetails(e){if(!e)return;e.createdBy||(e.createdBy=null),e.updatedBy||(e.updatedBy=null);const t=e.medications&&Array.isArray(e.medications)&&e.medications.length>0?e.medications.map(i=>`
                <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: #667eea;">${Utils.escapeHTML(i.medicationName||"")}</span>
                    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">\u0627\u0644\u0643\u0645\u064A\u0629: ${i.quantity||1}</span>
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
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${(()=>{if(!e.createdBy)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(typeof e.createdBy=="object")return Utils.escapeHTML(e.createdBy.name||e.createdBy.email||e.createdBy.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const i=String(e.createdBy).trim();if(i==="\u0627\u0644\u0646\u0638\u0627\u0645"||i===""){const n=(e.email||"").toString().trim();if(n&&n!=="")return Utils.escapeHTML(n);const s=(AppState.currentUser?.email||"").toString().trim();return s&&s!==""?Utils.escapeHTML(s):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}return Utils.escapeHTML(i)})()}</p>
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
        `,document.body.appendChild(a),a.addEventListener("click",i=>{i.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()})},async deleteVisit(e){if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}if(!this.isCurrentUserAdmin()){await this.requestVisitDeletion(e);return}const t=(AppState.appData.clinicVisits||[]).find(s=>s.id===e);if(!t){Notification.error("\u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const a=t.employeeName||t.contractorName||t.externalName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",i=t.visitDate?Utils.formatDateTime(t.visitDate):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(await Utils.confirmDialog("\u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629 "${a}" \u0628\u062A\u0627\u0631\u064A\u062E ${i}\u061F

\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.`,"\u062D\u0630\u0641","\u0625\u0644\u063A\u0627\u0621")){Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629...");try{if(AppState.googleConfig?.appsScript?.enabled){const s=await GoogleIntegration.sendRequest({action:"deleteClinicVisit",data:{visitId:e}});if(!s||s.success!==!0)throw new Error(s?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645")}AppState.appData.clinicVisits=(AppState.appData.clinicVisits||[]).filter(s=>s.id!==e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D"),this.renderVisitsTab()}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+s.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",s)}}},async requestVisitDeletion(e){try{if(!e){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}const t=(AppState.appData.clinicVisits||[]).find(s=>s.id===e);if(!t){Notification.error("\u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl)||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest){Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 (\u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D)");return}const i={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};Loading.show("\u062C\u0627\u0631\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629...");const n=await GoogleIntegration.sendRequest({action:"addClinicVisitDeletionRequest",data:{visitId:e,visitData:t,requestedBy:i}});if(Loading.hide(),!n||n.success!==!0)throw new Error(n?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641");try{AppState.appData.clinicVisitDeletionRequests=Array.isArray(AppState.appData.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],n.data&&AppState.appData.clinicVisitDeletionRequests.unshift({...n.data,requestType:"visit"}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch{}Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645")}catch(t){try{Loading.hide()}catch{}Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",t),Notification.error("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(t.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}},getMedicationRowClass(e){return e==="\u0645\u0646\u062A\u0647\u064A"?"bg-red-50":e==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"bg-yellow-50":"bg-green-50"},ensureData(){if(typeof AppState>"u")return;AppState.appData=AppState.appData||{};const e=AppState.appData;Array.isArray(e.clinicVisits)||(e.clinicVisits=[]),Array.isArray(e.medications)||(e.medications=[]),Array.isArray(e.clinicMedications)||(e.clinicMedications=[]),Array.isArray(e.clinicInventory)||(e.clinicInventory=[]);const t=e.medications.length>0?e.medications:e.clinicMedications.length>0?e.clinicMedications:e.clinicInventory.length>0?e.clinicInventory:[];e.medications.length===0&&t.length>0&&(e.medications=[...t]),e.clinicMedications.length===0&&t.length>0&&(e.clinicMedications=[...t]),e.clinicInventory.length===0&&t.length>0&&(e.clinicInventory=[...t]),Array.isArray(e.sickLeave)||(e.sickLeave=[]),Array.isArray(e.injuries)||(e.injuries=[]),Array.isArray(e.clinicSupplyRequests)||(e.clinicSupplyRequests=[]),Array.isArray(e.clinicStaff)||(e.clinicStaff=[]),Array.isArray(e.clinicStaffAttendance)||(e.clinicStaffAttendance=[]),Array.isArray(e.clinicStaffTimeOffRequests)||(e.clinicStaffTimeOffRequests=[]),Array.isArray(e.clinicStaffLeaveBalances)||(e.clinicStaffLeaveBalances=[]),Array.isArray(e.clinicStaffSystemActivities)||(e.clinicStaffSystemActivities=[]);let a=!1;if(Array.isArray(e.clinicContractorVisits)&&e.clinicContractorVisits.length>0){const n=new Set(e.clinicVisits.map(o=>o&&o.id).filter(Boolean));let s=0;e.clinicContractorVisits.forEach(o=>{o&&o.id&&!n.has(o.id)&&(o.personType="contractor",e.clinicVisits.push(o),n.add(o.id),a=!0,s++)}),s>0&&AppState.debugMode&&Utils.safeLog(`\u{1F517} [CLINIC] \u062A\u0645 \u062F\u0645\u062C ${s} \u0632\u064A\u0627\u0631\u0629 \u0645\u0642\u0627\u0648\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A ensureData`)}e.clinicVisits=e.clinicVisits.map(n=>{if(!n||typeof n!="object")return n;let s=String(n.personType||"").toLowerCase().trim();s==="external"||s==="\u062E\u0627\u0631\u062C\u064A"||s==="\u0645\u0642\u0627\u0648\u0644"||s==="contractor"?s="contractor":(s==="\u0645\u0648\u0638\u0641"||s==="staff"||s==="employee"||!s)&&(n.contractorName||n.contractorWorkerName?s="contractor":s="employee"),n.personType!==s&&(n.personType=s,a=!0);let o=[];if(n.medications&&(o=this.normalizeVisitMedications(n.medications)),(!o||o.length===0)&&n.medicationsDispensed){const d=this.normalizeVisitMedications(n.medicationsDispensed);d&&d.length>0&&(o=d,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${n.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,d.length,"\u062F\u0648\u0627\u0621"))}if((!o||o.length===0)&&n.medicationsDispensedQty&&n.medicationsDispensedQty>0){const d=parseInt(n.medicationsDispensedQty,10)||0;d>0&&(o=[{medicationName:n.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:d,unit:"\u0648\u062D\u062F\u0629",notes:""}],AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u062F\u0648\u0627\u0621 \u0645\u0646 medicationsDispensedQty \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${n.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,d))}o||(o=[]);const l=Array.isArray(n.medications)?n.medications:[],r=JSON.stringify(l.sort((d,p)=>(d.medicationName||"").localeCompare(p.medicationName||""))),c=JSON.stringify(o.sort((d,p)=>(d.medicationName||"").localeCompare(p.medicationName||"")));if(r!==c&&(n.medications=o,a=!0,AppState.debugMode&&o.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B medications \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${n.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,o.length,"\u062F\u0648\u0627\u0621")),n.visitDate){const d=String(n.visitDate).trim();if(d.length===10&&d.match(/^\d{4}-\d{2}-\d{2}$/)){const p=new Date(d+"T00:00:00");n.visitDate=p.toISOString(),a=!0}else if(!d.includes("T")&&!d.includes("Z"))try{const p=new Date(d);isNaN(p.getTime())||(n.visitDate=p.toISOString(),a=!0)}catch{}}if(n.exitDate){const d=String(n.exitDate).trim();if(d.length===10&&d.match(/^\d{4}-\d{2}-\d{2}$/)){const p=new Date(d+"T00:00:00");n.exitDate=p.toISOString(),a=!0}else if(!d.includes("T")&&!d.includes("Z"))try{const p=new Date(d);isNaN(p.getTime())||(n.exitDate=p.toISOString(),a=!0)}catch{}}return n});let i=!1;if(e.clinicMedications=e.clinicMedications.map(n=>{const s=this.normalizeMedicationRecord(n),o=this.calculateMedicationStatus(s),l=n&&(n.quantityAdded!==s.quantityAdded||n.remainingQuantity!==s.remainingQuantity)||typeof n?.quantityAdded!="number"||typeof n?.remainingQuantity!="number";return(s.status!==o.status||s.daysRemaining!==o.daysRemaining||l)&&(i=!0,s.status=o.status,s.daysRemaining=o.daysRemaining),s}),e.clinicInventory=e.clinicMedications,e.sickLeave=e.sickLeave.map(n=>this.normalizeSickLeaveRecord(n)),e.injuries=e.injuries.map(n=>this.normalizeInjuryRecord(n)),AppState.appData=e,typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save(),AppState.debugMode&&(i||a)&&Utils.safeLog(`\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u064A ensureData (medicationsChanged: ${i}, visitsChanged: ${a})`)}catch(n){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u064A ensureData:",n.message)}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},ensureFilterDefaults(){this.state||(this.state={activeTab:"medications",filters:{}}),this.state.activeTab||(this.state.activeTab="medications");const e={medications:{search:"",status:"all",dateFrom:"",dateTo:""},visits:{search:"",factory:"",position:"",workplace:""},sickLeave:{search:"",department:"",dateFrom:"",dateTo:""},injuries:{search:"",status:"all",department:"",dateFrom:"",dateTo:""},attendance:{search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"}};this.state.filters=this.state.filters||{},Object.keys(e).forEach(t=>{const a=this.state.filters[t]||{};this.state.filters[t]=Object.assign({},e[t],a)}),Array.isArray(this.state.currentInjuryAttachments)||(this.state.currentInjuryAttachments=[])},getCurrentUserSummary(e=null){if(e&&typeof e=="object"&&(e.name||e.id))return e;if(!AppState.currentUser)return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F AppState.currentUser \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F - \u0625\u0631\u062C\u0627\u0639 \u0627\u0644\u0646\u0638\u0627\u0645"),{id:"",name:"\u0627\u0644\u0646\u0638\u0627\u0645",email:"",role:""};const t=(AppState.currentUser.name||AppState.currentUser.displayName||"").toString().trim(),a=(AppState.currentUser.email||"").toString().trim(),i=(AppState.currentUser.id||"").toString().trim();AppState.debugMode&&Utils.safeLog("\u{1F50D} getCurrentUserSummary - name:",t,"email:",a,"id:",i);const n=t||a||i||"\u0627\u0644\u0646\u0638\u0627\u0645";return AppState.debugMode&&n==="\u0627\u0644\u0646\u0638\u0627\u0645"&&Utils.safeWarn('\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: getCurrentUserSummary \u064A\u0639\u064A\u062F "\u0627\u0644\u0646\u0638\u0627\u0645" - AppState.currentUser:',AppState.currentUser),{id:i,name:n,email:a,role:(AppState.currentUser.role||"").toString().trim()}},getMonthlyVisits(){const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1);return AppState.appData.clinicVisits.filter(a=>new Date(a.visitDate||a.createdAt)>=t).length},calculateTotalTime(e,t){if(!e||!t)return"-";try{const a=e instanceof Date?e:new Date(e),i=t instanceof Date?t:new Date(t);if(isNaN(a.getTime())||isNaN(i.getTime()))return"-";const n=i.getTime()-a.getTime();if(n<0)return"-";const s=Math.floor(n/(1e3*60)),o=Math.floor(s/60),l=s%60;return o>0&&l>0?`${o} \u0633\u0627\u0639\u0629 ${l} \u062F\u0642\u064A\u0642\u0629`:o>0?`${o} \u0633\u0627\u0639\u0629`:l>0?`${l} \u062F\u0642\u064A\u0642\u0629`:"\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629"}catch(a){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0627\u0644\u0648\u0642\u062A:",a,{visitDate:e,exitDate:t}),"-"}},async renderVisitsList(){const e=AppState.appData.clinicVisits.slice(-10).reverse();return e.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p></div>':`
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
                        ${e.map(t=>{const a=t.employeeCode||t.employeeNumber||"-",i=t.employeeName||t.contractorName||t.externalName||"",n=t.contractorWorkerName?` (${Utils.escapeHTML(t.contractorWorkerName)})`:"",s=t.employeePosition||"-",o=t.employeeLocation||t.workArea||"-",l=t.visitDate?Utils.escapeHTML(Utils.formatDateTime(t.visitDate)):"-",r=t.exitDate?Utils.escapeHTML(Utils.formatDateTime(t.exitDate)):'<span class="text-xs text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647</span>',c=Clinic.calculateTotalTime(t.visitDate,t.exitDate),d=Utils.escapeHTML(t.reason||""),p=Utils.escapeHTML(t.diagnosis||""),f=Utils.escapeHTML(t.treatment||"");return`
                                <tr>
                                    <td>${Utils.escapeHTML(a)}</td>
                                    <td>
                                        <div class="font-medium text-gray-900">${Utils.escapeHTML(i)}${n}</div>
                                    </td>
                                    <td>${Utils.escapeHTML(s)}</td>
                                    <td>${Utils.escapeHTML(o)}</td>
                                    <td>${l}</td>
                                    <td>${r}</td>
                                    <td>${c}</td>
                                    <td>${d}</td>
                                    <td>${p}</td>
                                    <td>${f}</td>
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
        `},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-visit-btn");e&&e.addEventListener("click",()=>this.showVisitForm())},100)},loadContractorsIntoSelect(e){if(!e)return;const t=(e.tagName||"").toLowerCase(),a=(e.value||"").toString();if(t==="input"){const i=e.getAttribute("list"),n=i?document.getElementById(i):null;if(!n)return;let s=[];try{typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"?s=(Contractors.getAllContractorsForModules()||[]).map(r=>r&&(r.name||r.companyName)?String(r.name||r.companyName).trim():"").filter(Boolean):Array.isArray(AppState.appData?.approvedContractors)?s=AppState.appData.approvedContractors.filter(r=>r&&r.isActive!=="inactive"&&r.isActive!==!1&&r.isActive!=="false"&&r.isActive!=="FALSE").map(r=>r&&(r.companyName||r.name)?String(r.companyName||r.name).trim():"").filter(Boolean):Array.isArray(AppState.appData?.contractors)&&(s=AppState.appData.contractors.filter(r=>r&&r.isActive!=="inactive"&&r.isActive!==!1&&r.isActive!=="false"&&r.isActive!=="FALSE").map(r=>r&&(r.name||r.companyName)?String(r.name||r.companyName).trim():"").filter(Boolean))}catch{}const o=new Set,l=[];s.forEach(r=>{const c=r.toLowerCase();o.has(c)||(o.add(c),l.push(r))}),n.innerHTML=l.map(r=>`<option value="${Utils.escapeHTML(r)}"></option>`).join("");try{e.dataset.allowedValues=JSON.stringify(l.map(r=>String(r||"").toLowerCase().trim()).filter(Boolean))}catch{}a&&(e.value=a),e.hasAttribute("data-contractor-change-attached")||(e.setAttribute("data-contractor-change-attached","true"),e.addEventListener("input",()=>{const r=document.getElementById("visit-employee-name");r&&e.value&&(r.value=e.value)}),e.addEventListener("blur",()=>{try{const r=(e.value||"").toString().trim();if(!r)return;if(!(()=>{try{return JSON.parse(e.dataset.allowedValues||"[]")}catch{return[]}})().includes(r.toLowerCase().trim())){e.value="";const p=document.getElementById("visit-employee-name");p&&(p.value=""),Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637")}}catch{}}));return}typeof Contractors<"u"&&typeof Contractors.populateContractorSelect=="function"&&Contractors.populateContractorSelect(e,{placeholder:"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",selectedValue:a,valueMode:"name",showServiceType:!0,includeSuppliers:!0,approvedOnly:!1}),a&&(e.value=a),e.hasAttribute("data-contractor-change-attached")||(e.setAttribute("data-contractor-change-attached","true"),e.addEventListener("change",()=>{const i=document.getElementById("visit-employee-name");i&&e.value&&(i.value=e.value)}))},handlePersonTypeChange(){const e=document.getElementById("visit-person-type");if(!e)return;const t=e.value,a=document.getElementById("visit-employee-code-container"),i=document.getElementById("visit-employee-code"),n=document.getElementById("visit-employee-name"),s=document.getElementById("visit-employee-name-label"),o=document.getElementById("visit-employee-position-container"),l=document.getElementById("visit-employee-department-container"),r=document.getElementById("visit-employee-location-container"),c=document.getElementById("visit-employee-location"),d=document.getElementById("visit-contractor-worker-container"),p=document.getElementById("visit-contractor-worker"),f=document.getElementById("visit-contractor-worker-label"),u=document.getElementById("visit-contractor-position-container"),m=document.getElementById("visit-contractor-position"),g=document.getElementById("visit-factory-container"),y=document.getElementById("visit-factory"),v=document.getElementById("visit-contractor-factory-container"),h=document.getElementById("visit-contractor-factory"),w=document.getElementById("visit-work-area-container"),D=document.getElementById("visit-work-area");a&&(a.style.display=t==="employee"?"block":"none"),i&&(t==="employee"?(i.disabled=!1,i.required=!0,i.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)"):(i.disabled=!0,i.required=!1,i.value="",i.placeholder="")),o&&(o.style.display=t==="employee"?"block":"none"),l&&(l.style.display=t==="employee"?"block":"none"),r&&(r.style.display=t==="employee"?"block":"none"),d&&(d.style.display=t==="contractor"||t==="external"?"block":"none"),u&&(u.style.display=t==="contractor"||t==="external"?"block":"none"),g&&(g.style.display=t==="employee"?"block":"none"),v&&(v.style.display=t==="contractor"||t==="external"?"block":"none"),w&&(w.style.display=t==="contractor"||t==="external"?"block":"none"),s&&(s.textContent=`\u0627\u0633\u0645 ${t==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":t==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u062C\u0647\u0629"} *`);const L=document.getElementById("visit-contractor-name-select");t==="employee"?(n&&(n.readOnly=!0,n.placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",n.value="",n.style.display="block",n.required=!0),L&&(L.style.display="none",L.required=!1)):t==="contractor"?(n&&(n.style.display="none",n.required=!1,n.value=""),L&&(L.style.display="block",L.required=!0,Clinic.loadContractorsIntoSelect(L))):(n&&(n.readOnly=!1,n.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u062C\u0647\u0629 \u0623\u0648 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629",n.value="",n.style.display="block",n.required=!0),L&&(L.style.display="none",L.required=!1));const b=document.getElementById("visit-employee-position"),A=document.getElementById("visit-employee-department");c&&(c.required=t==="employee",t!=="employee"&&(c.value="")),p&&(t==="contractor"||t==="external"?(p.required=!0,p.placeholder=t==="contractor"?"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644":"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A"):(p.required=!1,p.value="",p.placeholder="")),f&&(f.textContent=t==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644 *":t==="external"?"\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A *":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639"),m&&(t==="contractor"||t==="external"?(m.required=!0,t==="contractor"?(m.setAttribute("list","visit-contractor-position-datalist"),m.placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0648\u0638\u064A\u0641\u0629",this.refreshContractorJobTitlesDatalist_()):(m.removeAttribute("list"),m.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u064A\u062F\u0648\u064A\u0627\u064B \u0644\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629")):(m.required=!1,m.value="",m.placeholder=""));const E=document.getElementById("visit-contractor-position-hint");if(E&&(E.textContent=t==="contractor"?"\u0627\u062E\u062A\u0631 \u0648\u0638\u064A\u0641\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629":"\u064A\u0633\u0645\u062D \u0628\u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A \u0644\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629"),m&&!m.dataset.jobValidationBound&&(m.dataset.jobValidationBound="1",m.addEventListener("blur",()=>{if(document.getElementById("visit-person-type")?.value!=="contractor")return;const R=m.value.trim();if(!R)return;this.getContractorJobTitleOptions().some(U=>this.normalizeArabicText(U)===this.normalizeArabicText(R))||(m.value="",Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0648\u0638\u064A\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629"))})),D&&(D.required=t==="contractor"||t==="external",t==="contractor"||t==="external"?D.placeholder="\u062D\u062F\u062F \u0645\u0648\u0642\u0639 \u0623\u0648 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":(D.placeholder="",D.value="")),b&&(b.value=""),A&&(A.value=""),t==="employee"&&typeof EmployeeHelper<"u"&&i){const R=i.cloneNode(!0);i.parentNode.replaceChild(R,i),EmployeeHelper.setupEmployeeCodeSearch("visit-employee-code","visit-employee-name",q=>{if(q){const U=document.getElementById("visit-employee-name"),j=document.getElementById("visit-employee-position"),x=document.getElementById("visit-employee-department");U&&(U.value=q.name||""),j&&(j.value=q.position||""),x&&(x.value=q.department||"");const S=document.getElementById("visit-history-tbody");if(S){const C=document.getElementById("visit-employee-code")?.value.trim();if(C){const $=(AppState.appData.clinicVisits||[]).filter(N=>N.personType==="employee"&&(N.employeeCode===C||N.employeeNumber===C)).sort((N,H)=>new Date(H.visitDate||H.createdAt)-new Date(N.visitDate||N.createdAt)).slice(0,10);$.length===0?S.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0633\u0627\u0628\u0642\u0629</td></tr>':S.innerHTML=$.map(N=>`
                                    <tr>
                                        <td>${N.visitDate?Utils.escapeHTML(Utils.formatDateTime(N.visitDate)):"-"}</td>
                                        <td>${N.exitDate?Utils.escapeHTML(Utils.formatDateTime(N.exitDate)):"-"}</td>
                                        <td>${Utils.escapeHTML(N.reason||"-")}</td>
                                        <td>${Utils.escapeHTML(N.diagnosis||"-")}</td>
                                        <td>${Utils.escapeHTML(N.treatment||"-")}</td>
                                        <td>${Utils.escapeHTML(N.employeeLocation||N.workArea||"-")}</td>
                                    </tr>
                                `).join("")}}}},{inlineAlertId:"visit-form-alerts",employeeNotFoundWarn:"enter"})}},showVisitFormAlert(e,t="error"){const a=document.getElementById("visit-form-alerts");if(!a||e==null||String(e).trim()==="")return;a.style.display="block";const i=t==="error"?"border-red-300 bg-red-50 text-red-900":"border-amber-300 bg-amber-50 text-amber-950";a.innerHTML=`<div class="rounded-lg border ${i} px-3 py-2 text-sm text-right shadow-sm" role="alert">${Utils.escapeHTML(String(e))}</div>`;try{a.scrollIntoView({block:"nearest",behavior:"smooth"})}catch{}},clearVisitFormAlert(){const e=document.getElementById("visit-form-alerts");e&&(e.innerHTML="",e.style.display="none")},async showSickLeaveForm(e=null){this.ensureData();const t=!!e;e&&(e=this.normalizeMedicationRecord(e));const a=document.createElement("div");a.className="modal-overlay";const i=e?.personType||"employee",n=e?.startDate?new Date(e.startDate).toISOString().slice(0,10):"",s=e?.endDate?new Date(e.endDate).toISOString().slice(0,10):"",o=e?.employeeName||e?.personName||"",l=e?.employeeDepartment||e?.department||"",r=e?.employeePosition||e?.position||"",c=e?.employeeCode||e?.employeeNumber||"";a.innerHTML=`
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
                                    <option value="employee" ${i==="employee"?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                    <option value="contractor" ${i==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                    <option value="external" ${i==="external"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629</option>
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
                                <input type="date" id="sick-leave-end-date" required class="form-input" value="${s}">
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
        `,document.body.appendChild(a);const d=a.querySelector("#sick-leave-form"),p=d.querySelector("#sick-leave-person-type"),f=d.querySelector("#sick-leave-employee-code"),u=d.querySelector("#sick-leave-name"),m=d.querySelector("#sick-leave-position"),g=d.querySelector("#sick-leave-department"),y=d.querySelector("#sick-leave-position-container"),v=d.querySelector("#sick-leave-department-container"),h=d.querySelector("#sick-leave-code-container"),w=d.querySelector("#sick-leave-name-label"),D=d.querySelector("#sick-leave-dropdown"),L=d.querySelector("#sick-leave-start-date"),b=d.querySelector("#sick-leave-end-date"),A=d.querySelector("#sick-leave-days"),E=()=>{if(!L.value||!b.value){A.textContent="\u2014";return}const x=new Date(L.value).toISOString(),S=new Date(b.value).toISOString(),C=this.calculateSickLeaveDays(x,S);A.textContent=`${C} \u064A\u0648\u0645`};L.addEventListener("change",E),b.addEventListener("change",E),L.value&&b.value&&E();const R=()=>{u&&(u.value=""),m&&(m.value=""),g&&(g.value=""),f&&(f.value="")},q=x=>{if(!x){R();return}const S=EmployeeHelper.getPrimaryCode(x);f&&S&&(f.value=S),u&&(u.value=x.name||""),m&&(m.value=x.position||x.jobTitle||""),g&&(g.value=x.department||x.unit||x.section||"")},U=()=>{!f||!u||typeof EmployeeHelper>"u"||(EmployeeHelper.setupEmployeeCodeSearch("sick-leave-employee-code","sick-leave-name",x=>{x?q(x):R()}),EmployeeHelper.setupAutocomplete("sick-leave-name",x=>{x&&q(x)}))},j=(x,S=!1)=>{const C=x==="employee";h&&(h.style.display=C?"block":"none"),y&&(y.style.display=C?"block":"none"),v&&(v.style.display=C?"block":"none"),w&&(w.textContent=`\u0627\u0633\u0645 ${C?"\u0627\u0644\u0645\u0648\u0638\u0641":x==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"} *`),f&&(f.disabled=!C,f.required=C,f.placeholder=C?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":"\u0631\u0642\u0645 \u0627\u0644\u062A\u0639\u0631\u064A\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",!C&&S&&(f.value="")),u&&(u.readOnly=C,u.placeholder=C?"\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":`\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 ${x==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"}`,C&&S&&(u.value="")),!C&&S&&(m&&(m.value=""),g&&(g.value="")),D&&(D.classList.add("hidden"),D.innerHTML=""),C&&U()};if(j(i,!1),i==="employee"&&typeof EmployeeHelper<"u"&&c){const x=EmployeeHelper.findByTerm(c);x&&q(x)}p.addEventListener("change",()=>{j(p.value,!0),p.value==="employee"&&f&&f.focus()}),d.addEventListener("submit",async x=>{x.preventDefault();const C=p.value==="employee";if(!L.value||!b.value){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0627\u064A\u0629 \u0648\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629");return}const $=new Date(L.value).toISOString(),N=new Date(b.value).toISOString(),H=this.calculateSickLeaveDays($,N),O=e?.createdAt||new Date().toISOString(),B=e?.createdBy||this.getCurrentUserSummary(),T=this.getCurrentUserSummary(),M=this.isCurrentUserAdmin();let I,P=!1;if(t)M?(I=this.normalizeMedicationRecord({id:e?.id||Utils.generateId("MED"),name,type,usage,purchaseDate:purchaseISO,productionDate:productionISO,expiryDate:expiryISO,quantityAdded,remainingQuantity,location,notes,createdAt:O,createdBy:B,createdById:B?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:T,status:statusInfoLatest.status,daysRemaining:statusInfoLatest.daysRemaining}),delete I.pendingUpdate):(I={...e},I.pendingUpdate={name,type,usage,purchaseDate:purchaseISO,productionDate:productionISO,expiryDate:expiryISO,quantityAdded,remainingQuantity,location,notes,requestedBy:T,requestedAt:new Date().toISOString()},P=!0);else{const _=M?statusInfoLatest.status:"\u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F";M||(P=!0),I=this.normalizeMedicationRecord({id:Utils.generateId("MED"),name,type,usage,purchaseDate:purchaseISO,productionDate:productionISO,expiryDate:expiryISO,quantityAdded,remainingQuantity,location,notes,createdAt:O,createdBy:B,createdById:B?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:T,status:_,daysRemaining:statusInfoLatest.daysRemaining})}Loading.show();try{const _=AppState.appData.sickLeave||[];if(t){const F=_.findIndex(V=>V.id===I.id);F!==-1?_[F]=I:_.push(I)}else _.push(I);AppState.appData.sickLeave=_;try{this.calculateClinicCardValues(),this.updateClinicAnalysisResults()}catch(F){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629):",F)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D"),a.remove(),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="sickLeave"]')&&this.state.activeTab==="sickLeave"&&this.renderSickLeaveTab();const V=document.querySelector("#total-sick-leave");V&&(V.textContent=_.length)},100),(async()=>{try{t?await GoogleIntegration.sendRequest({action:"updateSickLeave",data:{leaveId:I.id,updateData:I}}):await GoogleIntegration.sendRequest({action:"addSickLeave",data:I})}catch(F){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets:",F)}})()}catch(_){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629: "+_.message)}}),a.addEventListener("click",x=>{x.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()})},async showInjuryForm(e=null){Utils.safeLog("\u{1F537} \u062A\u0645 \u0627\u0633\u062A\u062F\u0639\u0627\u0621 showInjuryForm - \u0628\u062F\u0621 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C..."),this.ensureData();const t=!!e,a=this;this.state.currentInjuryAttachments=Array.isArray(e?.attachments)?e.attachments.map(I=>this.normalizeAttachment(I)).filter(Boolean):[];const i=document.createElement("div");i.className="modal-overlay";const n=e?.personType||"employee",s=e?.injuryDate?Utils.toDateTimeLocalString(e.injuryDate):"",o=e?.employeeName||e?.personName||"",l=e?.contractorName||"",r=e?.employeeCode||e?.employeeNumber||"",c=e?.employeePosition||e?.contractorPosition||"",d=e?.employeeDepartment||e?.department||"",p=e?.factory||"",f=e?.subLocation||e?.subLocationName||"",u=e?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",m=this.getInjuryTypeOptions(),g=this.getSiteOptions();i.innerHTML=`
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
                                <input type="text" id="injury-department" class="form-input" value="${Utils.escapeHTML(d)}" placeholder="\u0642\u0633\u0645/\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0635\u0627\u0628">
                            </div>
                            <div>
                                <label for="injury-factory" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639</label>
                                <select id="injury-factory" class="form-input">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 --</option>
                                    ${g.map(I=>`<option value="${Utils.escapeHTML(I.id)}" ${p===I.id||p===I.name?"selected":""}>${Utils.escapeHTML(I.name)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label for="injury-sub-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                <input type="text" id="injury-sub-location" list="injury-sub-location-datalist" class="form-input" value="${Utils.escapeHTML(f)}" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639\u0627\u064B \u0641\u0631\u0639\u064A\u0627\u064B \u0623\u0648 \u0627\u0643\u062A\u0628 \u064A\u062F\u0648\u064A\u0627\u064B">
                                <datalist id="injury-sub-location-datalist"></datalist>
                            </div>
                            <div>
                                <label for="injury-date" class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629 *</label>
                                <input type="datetime-local" id="injury-date" required class="form-input" value="${s}">
                            </div>
                            <div>
                                <label for="injury-status" class="block text-sm font-semibold text-gray-700 mb-2">\u062D\u0627\u0644\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 *</label>
                                <select id="injury-status" required class="form-input">
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629" ${u==="\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</option>
                                    <option value="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621" ${u==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"selected":""}>\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621</option>
                                    <option value="\u0645\u063A\u0644\u0642" ${u==="\u0645\u063A\u0644\u0642"?"selected":""}>\u0645\u063A\u0644\u0642</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 *</label>
                                <select id="injury-type" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</option>
                                    ${m.map(I=>`<option value="${Utils.escapeHTML(I)}" ${e?.injuryType===I?"selected":""}>${Utils.escapeHTML(I)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645) *</label>
                                <select id="injury-body-part" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645</option>
                                    ${this.getInjuryBodyPartOptions().map(I=>`<option value="${Utils.escapeHTML(I)}" ${e?.injuryBodyPart===I?"selected":""}>${Utils.escapeHTML(I)}</option>`).join("")}
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
        `,document.body.appendChild(i);const y=i.querySelector("#injury-form"),v=y.querySelector("#injury-person-type"),h=y.querySelector("#injury-name"),w=y.querySelector("#injury-employee-code"),D=y.querySelector("#injury-code-container"),L=y.querySelector("#injury-contractor-container"),b=y.querySelector("#injury-contractor-name-select"),A=y.querySelector("#injury-employee-name-container"),E=y.querySelector("#injury-contractor-worker-container"),R=y.querySelector("#injury-contractor-worker-name"),q=y.querySelector("#injury-name-label"),U=y.querySelector("#injury-position"),j=y.querySelector("#injury-factory"),x=y.querySelector("#injury-sub-location"),S=y.querySelector("#injury-department"),C=y.querySelector("#injury-dropdown"),$=y.querySelector("#injury-attachments-input"),N=i.querySelector(".modal-close"),H=y.querySelector("#injury-cancel-btn"),O=I=>{if(I){if(h&&(h.value=I.name||""),w){const P=EmployeeHelper.getPrimaryCode(I);P&&(w.value=P)}S&&(S.value=I.department||I.unit||I.section||S.value),U&&(U.value=I.position||I.job||"")}},B=()=>{!w||!h||typeof EmployeeHelper>"u"||(EmployeeHelper.setupEmployeeCodeSearch("injury-employee-code","injury-name",I=>{I&&O(I)}),EmployeeHelper.setupAutocomplete("injury-name",I=>{I&&O(I)}))},T=(I,P=!1)=>{const _=I==="employee",F=I==="contractor",V=I==="external";D&&(D.style.display=_?"block":"none"),L&&(L.style.display=F?"block":"none"),A&&(A.style.display=_?"block":"none"),E&&(E.style.display=F||V?"block":"none"),w&&(w.required=_,w.disabled=!_,w.placeholder=_?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":"\u0631\u0642\u0645 \u0627\u0644\u062A\u0639\u0631\u064A\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",!_&&P&&(w.value="")),q&&(q.textContent=`\u0627\u0633\u0645 ${_?"\u0627\u0644\u0645\u0648\u0638\u0641":I==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"} *`),h&&(h.readOnly=_,h.disabled=!_,h.required=_,h.placeholder=_?"\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":`\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 ${I==="contractor"?"\u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"}`,P&&!_&&(h.value="")),b&&(b.required=F,b.disabled=!F,F?this.loadContractorsIntoSelect(b):P&&(b.value="")),R&&(R.required=F||V,R.disabled=!(F||V),P&&_&&(R.value=""),V?R.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A":F?R.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644":R.placeholder=""),!_&&P&&S&&(S.value=""),!_&&P&&U&&(U.value=""),C&&(C.classList.add("hidden"),C.innerHTML=""),_&&B()};if(T(n,!1),n==="employee"&&typeof EmployeeHelper<"u"&&r){const I=EmployeeHelper.findByTerm(r);I&&O(I)}v.addEventListener("change",()=>{T(v.value,!0)}),b?.addEventListener("input",()=>{v.value!=="contractor"||!(b.value||"").trim()||h.value.trim()||h.focus()}),typeof this.setupClinicWorkplaceDatalist=="function"&&this.setupClinicWorkplaceDatalist("injury-factory","injury-sub-location","injury-sub-location-datalist",{includeFallbackNameMatch:!0}),$?.addEventListener("change",async I=>{await a.handleInjuryAttachmentsChange(I.target.files)}),typeof a.renderInjuryAttachmentsPreview=="function"?a.renderInjuryAttachmentsPreview():Utils.safeWarn("\u26A0\uFE0F renderInjuryAttachmentsPreview \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");const M=()=>{a.state.currentInjuryAttachments=[],i.remove()};N?.addEventListener("click",M),H?.addEventListener("click",M),Utils.safeLog("\u{1F537} \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 event listener \u0644\u0644\u0646\u0645\u0648\u0630\u062C..."),y.addEventListener("submit",async I=>{Utils.safeLog("\u{1F534} \u062A\u0645 \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0632\u0631 \u0627\u0644\u062D\u0641\u0638! \u0628\u062F\u0621 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629...");try{I.preventDefault(),I.stopPropagation(),I.stopImmediatePropagation(),Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0625\u0635\u0627\u0628\u0629...");const P=v.value,_=P==="employee",F=y.querySelector("#injury-date");if(!F.value){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}const V=Utils.dateTimeLocalToISO(F.value)||new Date().toISOString(),X=e?.createdAt||new Date().toISOString(),Y=e?.createdBy||a.getCurrentUserSummary(),ae=a.getCurrentUserSummary(),Z=S?.value.trim()||"",oe=U?.value.trim()||"",ee=b?.value?.trim()||"",te=_?h?.value?.trim()||"":R?.value?.trim()||h?.value?.trim()||"",se=y.querySelector("#injury-type")?.value||"",K=y.querySelector("#injury-body-part")?.value||"",ne=y.querySelector("#injury-location")?.value?.trim()||"",re=y.querySelector("#injury-description")?.value?.trim()||"",ie=j?.value?.trim()||"",k=x?.value?.trim()||"";if(_&&!te){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644/\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641");return}if(P==="contractor"&&b){const G=(()=>{try{return JSON.parse(b.dataset.allowedValues||"[]")}catch{return[]}})();if(!ee||!G.includes(ee.toLowerCase().trim())){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637");return}if(!te){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644");return}}if(P==="external"&&!te){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A");return}if(!se){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}if(!K){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645)");return}if(!ne){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}if(!re){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}let z="";ie&&(z=g.find(J=>J.id===ie||J.name===ie)?.name||"");const W=a.normalizeInjuryRecord({id:e?.id||Utils.generateId("INJURY"),personType:P,employeeName:_?h.value.trim():null,employeeCode:_?w?.value.trim()||"":null,employeeNumber:_?w?.value.trim()||"":null,personName:_?null:te,contractorName:P==="contractor"?ee:null,employeePosition:oe,contractorPosition:_?null:oe,employeeDepartment:Z,department:Z,factory:ie||null,factoryName:z||null,subLocation:k||null,subLocationName:k||null,injuryDate:V,injuryType:se,injuryBodyPart:K,injuryLocation:ne,injuryDescription:re,actionsTaken:y.querySelector("#injury-actions").value.trim(),treatment:y.querySelector("#injury-treatment").value.trim(),status:y.querySelector("#injury-status").value,attachments:a.state.currentInjuryAttachments.map(G=>({...G})),createdAt:X,createdBy:Y,createdById:Y?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:ae});Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 payload \u0628\u0646\u062C\u0627\u062D:",W),Loading.show();const Q=AppState.appData.injuries||[];if(t){const G=Q.findIndex(J=>J.id===W.id);G!==-1?Q[G]=W:Q.push(W)}else Q.push(W);AppState.appData.injuries=Q;try{a.calculateClinicCardValues(),a.updateClinicAnalysisResults()}catch(G){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0625\u0635\u0627\u0628\u0629):",G)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B"),Loading.hide(),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0646\u062C\u0627\u062D"),M(),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0628\u0646\u062C\u0627\u062D"),setTimeout(()=>{try{Utils.safeLog("\u2705 \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u062D\u062F\u064A\u062B \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A..."),document.querySelector('.clinic-tab-panel[data-tab-panel="injuries"]')&&a.state.activeTab==="injuries"&&(Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 panel\u060C \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647"),a.renderInjuriesTab());const J=document.querySelector("#total-injuries");J&&(J.textContent=Q.length)}catch(G){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A:",G)}},100),(async()=>{try{t?(await GoogleIntegration.sendRequest({action:"updateInjury",data:{injuryId:W.id,updateData:W}}),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A Google Sheets (\u062A\u062D\u062F\u064A\u062B)")):(await GoogleIntegration.sendRequest({action:"addInjury",data:W}),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A Google Sheets (\u0625\u0636\u0627\u0641\u0629)"))}catch(G){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets:",G)}})()}catch(P){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0639\u0627\u0645 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629:",P),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629: "+P.message)}}),i.addEventListener("click",I=>{if(I.target===i){if(!confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`))return;a.state.currentInjuryAttachments=[],i.remove()}})},showVisitForm(e=null,t=null){const a=!!e;if(!document.getElementById("clinic-section")){t&&(t.disabled=!1);return}try{this.ensureData()}catch(o){t&&(t.disabled=!1),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0636\u064A\u0631 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",o);return}typeof Permissions<"u"&&Permissions.ensureFormSettingsState&&Permissions.ensureFormSettingsState().catch(()=>{});const n=document.createElement("div");if(n.className="modal-overlay",n.innerHTML=`
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
                                <div class="flex items-center justify-between gap-2 mb-2">
                                    <label for="visit-contractor-position" class="block text-sm font-semibold text-gray-700">\u0627\u0644\u0648\u0638\u064A\u0641\u0629 *</label>
                                    ${this.isCurrentUserAdmin()?'<button type="button" onclick="Clinic.showContractorJobTitlesSettingsModal()" class="btn-icon btn-icon-primary" title="\u0625\u062F\u0627\u0631\u0629 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646" aria-label="\u0625\u062F\u0627\u0631\u0629 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646" style="width:30px;height:30px;border-radius:8px;"><i class="fas fa-cog"></i></button>':""}
                                </div>
                                <input type="text" id="visit-contractor-position" class="form-input" list="visit-contractor-position-datalist"
                                    value="${e?.contractorPosition||e?.employeePosition||""}" 
                                    placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0648\u0638\u064A\u0641\u0629"
                                    autocomplete="off"
                                    ${e?.personType==="contractor"||e?.personType==="external"?"required":""}>
                                <datalist id="visit-contractor-position-datalist">
                                    ${this.getContractorJobTitleOptions().map(o=>`<option value="${Utils.escapeHTML(o)}"></option>`).join("")}
                                </datalist>
                                <span id="visit-contractor-position-hint" style="display:block;margin-top:5px;color:#64748b;font-size:.72rem;">\u0627\u062E\u062A\u0631 \u0648\u0638\u064A\u0641\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</span>
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
                                <input type="text" id="visit-contractor-worker" class="form-input"
                                    value="${e?.contractorWorkerName||""}" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644"
                                    ${e?.personType==="contractor"||e?.personType==="external"?"required":""}>
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
                                <input type="text" id="visit-reason" required class="form-input" list="visit-reason-datalist"
                                    style="border: 2px solid #4facfe; border-radius: 8px;"
                                    value="${e?.reason||""}" placeholder="\u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0623\u0648 \u0623\u062F\u062E\u0644 \u0633\u0628\u0628\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B"
                                    autocomplete="off" autocorrect="off" spellcheck="false">
                                <datalist id="visit-reason-datalist"></datalist>
                                <div id="visit-reason-suggestion-panel" style="display:none;margin-top:10px;padding:11px 12px;border:1px solid #bae6fd;border-radius:12px;background:linear-gradient(135deg,#f0f9ff 0%,#ecfeff 100%);box-shadow:0 8px 22px rgba(14,165,233,.08);">
                                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;">
                                        <span style="display:flex;align-items:center;gap:6px;color:#075985;font-size:.76rem;font-weight:800;"><i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i> \u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0630\u0643\u064A\u0629 \u0645\u0646 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0633\u0627\u0628\u0642</span>
                                        <span style="color:#64748b;font-size:.68rem;">\u0627\u0636\u063A\u0637 \u0644\u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0633\u0631\u064A\u0639</span>
                                    </div>
                                    <div id="visit-reason-suggestions" style="display:flex;flex-wrap:wrap;gap:7px;"></div>
                                </div>
                                <small id="visit-reason-suggestion-hint" style="display:block;margin-top:6px;color:#64748b;font-size:.71rem;line-height:1.5;">\u062A\u0638\u0647\u0631 \u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0639 \u0628\u0642\u0627\u0621 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A \u0645\u062A\u0627\u062D\u0627\u064B.</small>
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold mb-2" style="color: #4facfe; display: flex; align-items: center; gap: 5px;"><i class="fas fa-diagnoses"></i> \u0627\u0644\u062A\u0634\u062E\u064A\u0635</label>
                                <textarea id="visit-diagnosis" class="form-input" rows="3" style="border: 2px solid #4facfe; border-radius: 8px;"
                                    placeholder="\u0627\u0644\u062A\u0634\u062E\u064A\u0635">${e?.diagnosis||""}</textarea>
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold mb-2" style="color: #4facfe; display: flex; align-items: center; gap: 5px;"><i class="fas fa-pills"></i> \u0627\u0644\u0639\u0644\u0627\u062C</label>
                                <textarea id="visit-treatment" class="form-input" rows="3" style="border: 2px solid #4facfe; border-radius: 8px;"
                                    placeholder="\u0627\u0644\u0639\u0644\u0627\u062C \u0627\u0644\u0645\u0648\u0635\u0648\u0641">${e?.treatment||""}</textarea>
                                <div id="visit-treatment-medication-mode" style="display:none;padding:12px;border:1px solid #7dd3fc;border-radius:10px;background:rgba(255,255,255,.76);">
                                    <label for="visit-treatment-medication-select" style="display:flex;align-items:center;gap:6px;margin-bottom:7px;color:#075985;font-size:.78rem;font-weight:800;"><i class="fas fa-prescription-bottle-alt"></i>\u0627\u062E\u062A\u0631 \u0627\u0644\u062F\u0648\u0627\u0621 \u0645\u0646 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0627\u0644\u0641\u0639\u0644\u064A</label>
                                    <input id="visit-treatment-medication-select" class="form-input" list="visit-treatment-medications-datalist" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621 \u0644\u0644\u0628\u062D\u062B" autocomplete="off" style="border:2px solid #0891b2;border-radius:9px;">
                                    <datalist id="visit-treatment-medications-datalist"></datalist>
                                    <p id="visit-treatment-medication-hint" style="margin:7px 0 0;color:#475569;font-size:.72rem;">\u0628\u0639\u062F \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u062D\u062F\u062F \u0627\u0644\u0643\u0645\u064A\u0629 \u0641\u064A \u0642\u0633\u0645 \u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062B\u0645 \u0627\u0636\u063A\u0637 \xAB\u0625\u0636\u0627\u0641\u0629\xBB.</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 -->
                        <div id="visit-medications-section" class="grid grid-cols-1 gap-4" style="background: linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%); padding: 20px; border-radius: 10px;">
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
        `,document.body.appendChild(n),t){const o=new MutationObserver(()=>{document.body.contains(n)||(t.disabled=!1,o.disconnect())});o.observe(document.body,{childList:!0,subtree:!0})}setTimeout(()=>{const o=document.getElementById("visit-person-type"),l=document.getElementById("visit-employee-code"),r=document.getElementById("visit-history-tbody"),c=()=>{if(!r)return;const x=o?.value||"employee",S=l?.value.trim();if(x!=="employee"||!S){r.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>';return}const C=(AppState.appData.clinicVisits||[]).filter($=>$.personType==="employee"&&($.employeeCode===S||$.employeeNumber===S)).sort(($,N)=>new Date(N.visitDate||N.createdAt)-new Date($.visitDate||$.createdAt)).slice(0,10);C.length===0?r.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0633\u0627\u0628\u0642\u0629</td></tr>':r.innerHTML=C.map($=>`
                        <tr>
                            <td>${$.visitDate?Utils.escapeHTML(Utils.formatDateTime($.visitDate)):"-"}</td>
                            <td>${$.exitDate?Utils.escapeHTML(Utils.formatDateTime($.exitDate)):"-"}</td>
                            <td>${Utils.escapeHTML($.reason||"-")}</td>
                            <td>${Utils.escapeHTML($.diagnosis||"-")}</td>
                            <td>${Utils.escapeHTML($.treatment||"-")}</td>
                            <td>${Utils.escapeHTML($.employeeLocation||$.workArea||"-")}</td>
                        </tr>
                    `).join("")};if(l&&r&&(l.addEventListener("blur",c),l.addEventListener("input",()=>{l.value.trim().length>=3&&c()})),o&&o.addEventListener("change",()=>{const x=document.querySelector("#visit-history-table")?.closest(".mt-6");x&&(x.style.display=o.value==="employee"?"block":"none"),o.value==="employee"&&c()}),e&&e.employeeCode&&c(),e?.personType==="contractor"){const x=document.getElementById("visit-contractor-name-select");x&&(Clinic.loadContractorsIntoSelect(x),(e.employeeName||e.contractorName)&&(x.value=e.employeeName||e.contractorName||""))}typeof Clinic.handlePersonTypeChange=="function"&&Clinic.handlePersonTypeChange(),typeof Clinic.setupClinicWorkplaceDatalist=="function"&&(Clinic.setupClinicWorkplaceDatalist("visit-factory","visit-employee-location","visit-employee-location-datalist"),Clinic.setupClinicWorkplaceDatalist("visit-contractor-factory","visit-work-area","visit-work-area-datalist"));const d=()=>Clinic.refreshVisitReasonSuggestions_(e?.id||"");let p=null;const f=()=>{clearTimeout(p),p=setTimeout(d,180)};["visit-person-type","visit-type","visit-contractor-name-select"].forEach(x=>{document.getElementById(x)?.addEventListener("change",d)}),["visit-employee-code","visit-contractor-worker"].forEach(x=>{const S=document.getElementById(x);S?.addEventListener("input",f),S?.addEventListener("blur",d)}),d();const u=document.getElementById("visit-medication-select"),m=document.getElementById("visit-medications-list"),g=document.getElementById("visit-add-medication-btn"),y=document.getElementById("visit-medication-quantity"),v=document.getElementById("visit-medications-datalist"),h=document.getElementById("visit-type"),w=document.getElementById("visit-treatment"),D=document.getElementById("visit-treatment-medication-mode"),L=document.getElementById("visit-treatment-medication-select"),b=document.getElementById("visit-treatment-medications-datalist");let A=e?.medications&&Array.isArray(e.medications)?[...e.medications]:[];const E=()=>this.getMedications().filter(x=>(parseInt(x.remainingQuantity??x.quantity??0,10)||0)>0),R=()=>{if(!L||!b)return;const x={};b.innerHTML=E().map(S=>{const C=parseInt(S.remainingQuantity??S.quantity??0,10)||0,$=String(S.name||S.medicationName||"").trim();if(!$)return"";const N=`${$} (\u0645\u062A\u0648\u0641\u0631: ${C})`;return x[this.normalizeArabicText($)]={id:S.id||"",name:$,label:N},`<option value="${Utils.escapeHTML(N)}"></option>`}).join(""),L.dataset.medicationMap=JSON.stringify(x)},q=()=>{const x=this.isMedicationDispenseVisitType_(h?.value||"");w&&(w.style.display=x?"none":"block"),D&&(D.style.display=x?"block":"none"),x&&(R(),L&&A.length>0&&(L.value=A.map(S=>S.medicationName).filter(Boolean).join("\u060C ")))},U=()=>{if(!u||!v)return;const x=this.getMedications().filter(C=>(C.remainingQuantity??C.quantity??0)<=0?!1:!A.some(H=>H.medicationId===C.id)),S={};v.innerHTML=x.map(C=>{const $=C.remainingQuantity??C.quantity??0,N=String(C.name||C.medicationName||"").trim(),H=`${N} (\u0645\u062A\u0648\u0641\u0631: ${$})`,O=N.toLowerCase().trim();return O&&(S[O]=C.id),`<option value="${Utils.escapeHTML(H)}"></option>`}).join(""),u.dataset.nameToId=JSON.stringify(S),u.dataset.selectedId=""},j=()=>{if(m){if(A.length===0){m.innerHTML="",this.isMedicationDispenseVisitType_(h?.value||"")&&w&&(w.value="");return}m.innerHTML=A.map((x,S)=>{const C=this.getMedications().find($=>$.id===x.medicationId);return`
                        <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2" data-med-id="${x.medicationId||""}">
                            <div>
                                <span class="font-medium">${Utils.escapeHTML(x.medicationName||C?.name||"")}</span>
                                <span class="text-sm text-gray-600 mr-2">\xD7 ${x.quantity||1}</span>
                            </div>
                            <button type="button" class="btn-icon btn-icon-danger btn-xs" data-remove-med="${S}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `}).join(""),this.isMedicationDispenseVisitType_(h?.value||"")&&w&&(w.value=A.map(x=>x.medicationName).filter(Boolean).join("\u060C "),L&&(L.value=w.value)),m.querySelectorAll("[data-remove-med]").forEach(x=>{x.addEventListener("click",()=>{const S=parseInt(x.getAttribute("data-remove-med"),10);A.splice(S,1),j(),U()})})}};g&&u&&y&&g.addEventListener("click",()=>{const S=(u.value||"").trim().replace(/\s*\(.*\)\s*$/,"").trim(),C=(()=>{try{return JSON.parse(u.dataset.nameToId||"{}")}catch{return{}}})(),$=u.dataset.selectedId||C[String(S).toLowerCase().trim()]||"",N=parseInt(y.value,10)||1;if(!$){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062F\u0648\u0627\u0621");return}const H=this.getMedications().find(T=>T.id===$);if(!H){Notification.error("\u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const O=H.remainingQuantity??H.quantity??0,B=A.filter(T=>T.medicationId===$).reduce((T,M)=>T+(M.quantity||0),0);if(B+N>O){Notification.error(`\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u063A\u064A\u0631 \u0643\u0627\u0641\u064A\u0629. \u0627\u0644\u0645\u062A\u0648\u0641\u0631: ${O-B}`);return}A.push({medicationId:$,medicationName:H.name||H.medicationName||"",quantity:N}),y.value="1",u.value="",j(),U()}),u&&!u.hasAttribute("data-datalist-attached")&&(u.setAttribute("data-datalist-attached","true"),u.addEventListener("input",()=>{const S=(u.value||"").trim().replace(/\s*\(.*\)\s*$/,"").trim(),C=(()=>{try{return JSON.parse(u.dataset.nameToId||"{}")}catch{return{}}})();u.dataset.selectedId=C[String(S).toLowerCase().trim()]||""}),u.addEventListener("blur",()=>{try{const x=(u.value||"").trim();if(!x)return;const S=x.replace(/\s*\(.*\)\s*$/,"").trim(),C=(()=>{try{return JSON.parse(u.dataset.nameToId||"{}")}catch{return{}}})();!!(u.dataset.selectedId||C[String(S).toLowerCase().trim()])||(u.value="",u.dataset.selectedId="",Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062F\u0648\u0627\u0621 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637"))}catch{}})),h?.addEventListener("change",q),L?.addEventListener("input",()=>{const S=String(L.value||"").trim().replace(/\s*\(.*\)\s*$/,"").trim();let C={};try{C=JSON.parse(L.dataset.medicationMap||"{}")}catch{C={}}const $=C[this.normalizeArabicText(S)];if(!$){L.dataset.selectedId="";return}L.dataset.selectedId=$.id,w&&(w.value=$.name),u&&(u.value=$.label,u.dataset.selectedId=$.id),y?.focus()}),L?.addEventListener("blur",()=>{if(!String(L.value||"").trim()||L.dataset.selectedId)return;const S=A.map(C=>C.medicationName).filter(Boolean).join("\u060C ");L.value=S,Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062F\u0648\u0627\u0621 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0627\u0644\u0641\u0639\u0644\u064A")}),U(),j(),q()},300);const s=n.querySelector("#visit-form");s.addEventListener("submit",async o=>{o.preventDefault(),this.clearVisitFormAlert();const l=s?.querySelector('button[type="submit"]')||o.target?.querySelector('button[type="submit"]');if(l&&l.disabled)return;let r="";l&&(r=l.innerHTML,l.disabled=!0,l.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const c=document.getElementById("visit-person-type"),d=document.getElementById("visit-date"),p=document.getElementById("visit-exit-date");if(!c||!d||!p){this.showVisitFormAlert("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),l&&(l.disabled=!1,l.innerHTML=r);return}const f=String(c.value||"").trim().toLowerCase(),u=f==="employee"?"employee":"contractor",m=d.value,g=p.value,y=document.getElementById("visit-contractor-worker")?.value.trim()||"",v=u==="employee"?document.getElementById("visit-employee-location")?.value.trim()||"":document.getElementById("visit-work-area")?.value.trim()||"",h=u==="contractor"?document.getElementById("visit-contractor-position")?.value.trim()||"":null;if(f==="contractor"&&h&&!this.getContractorJobTitleOptions().some(N=>this.normalizeArabicText(N)===this.normalizeArabicText(h))){this.showVisitFormAlert("\u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631\u0647\u0627 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629"),l&&(l.disabled=!1,l.innerHTML=r);return}let w="";if(f==="contractor"){const $=document.getElementById("visit-contractor-name-select"),N=document.getElementById("visit-employee-name");if(w=$?($.value||"").trim():N?(N.value||"").trim():"",$){const H=(()=>{try{return JSON.parse($.dataset.allowedValues||"[]")}catch{return[]}})();if(w&&!H.includes(w.toLowerCase().trim())){this.showVisitFormAlert("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631\u0647 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637"),l&&(l.disabled=!1,l.innerHTML=r);return}}}else{const $=document.getElementById("visit-employee-name");w=$?($.value||"").trim():""}const D=document.getElementById("visit-medications-list"),L=[];D&&D.querySelectorAll("[data-med-id]").forEach($=>{const N=$.getAttribute("data-med-id");if(!N)return;const H=$.textContent.match(/×\s*(\d+)/),O=H?parseInt(H[1],10):1,B=$.querySelector(".font-medium"),T=B?B.textContent.trim():"";L.push({medicationId:N,medicationName:T,quantity:O})});const b=u==="employee"?document.getElementById("visit-factory")?.value.trim()||null:document.getElementById("visit-contractor-factory")?.value.trim()||null;let A=null;if(b){const N=this.getSiteOptions().find(H=>H.id===b);A=N?N.name:null}let E=null,R=null;if(m&&m.trim())try{const[$,N]=m.split("T");if($&&N){const[H,O,B]=$.split("-").map(Number),[T,M]=N.split(":").map(Number),I=new Date(H,O-1,B,T,M,0,0);isNaN(I.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",m):E=I.toISOString()}else{const H=new Date(m);isNaN(H.getTime())||(E=H.toISOString())}}catch($){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:",$)}if(g&&g.trim())try{const[$,N]=g.split("T");if($&&N){const[H,O,B]=$.split("-").map(Number),[T,M]=N.split(":").map(Number),I=new Date(H,O-1,B,T,M,0,0);isNaN(I.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",g):R=I.toISOString()}else{const H=new Date(g);isNaN(H.getTime())||(R=H.toISOString())}}catch($){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:",$)}const q=AppState.currentUser,U=(q?.email||"").toLowerCase().trim(),S=(AppState.appData.users||[]).find($=>($.email||"").toLowerCase().trim()===U)?.name||q?.name||U||"\u0645\u0633\u062A\u062E\u062F\u0645",C={id:e?.id||Utils.generateId("CLINIC_VISIT"),personType:u,employeeName:u==="employee"?w:null,employeeCode:u==="employee"?document.getElementById("visit-employee-code").value.trim():null,employeeNumber:u==="employee"?document.getElementById("visit-employee-code").value.trim():null,employeePosition:u==="employee"?document.getElementById("visit-employee-position")?.value.trim()||"":h||null,contractorPosition:h||null,employeeDepartment:u==="employee"?document.getElementById("visit-employee-department")?.value.trim()||"":null,factory:b,factoryName:A,employeeLocation:u==="employee"?v:null,contractorName:u==="contractor"?w:null,contractorWorkerName:u==="contractor"?y:null,externalName:null,workArea:v||null,visitDate:E,exitDate:R,visitType:document.getElementById("visit-type")?.value?.trim()||null,reason:document.getElementById("visit-reason").value.trim(),diagnosis:document.getElementById("visit-diagnosis").value.trim(),treatment:document.getElementById("visit-treatment").value.trim(),medications:L.length>0?L:null,createdAt:e?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:e?.createdBy||S,updatedBy:S,email:U,userId:q?.id||""};Loading.show();try{const $=_=>{const F={};return(Array.isArray(_)?_:[]).forEach(V=>{const X=V&&(V.medicationId||V.id)?String(V.medicationId||V.id):"";if(!X)return;const Y=parseInt(V.quantity,10)||0;F[X]=(F[X]||0)+Y}),F},N=a?this.normalizeVisitMedications(e?.medications):[],H=$(N),O=$(L),B=[];new Set([...Object.keys(H),...Object.keys(O)]).forEach(_=>{const F=(O[_]||0)-(H[_]||0);F!==0&&B.push({medicationId:_,delta:F})});const M=B.length>0,I=M?this.getMedications():[];if(M)for(const _ of B){if(_.delta<=0)continue;const F=I.find(X=>String(X.id)===String(_.medicationId));if(!F)throw new Error("\u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646");const V=parseInt(F.remainingQuantity??F.quantity??0,10)||0;if(V<_.delta){const X=F.name||F.medicationName||"\u062F\u0648\u0627\u0621";throw new Error(`\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u063A\u064A\u0631 \u0643\u0627\u0641\u064A\u0629 \u0644\u0644\u062F\u0648\u0627\u0621: ${X}. \u0627\u0644\u0645\u062A\u0648\u0641\u0631: ${V}`)}}if(a){const _=AppState.appData.clinicVisits.findIndex(F=>F.id===e.id);_!==-1&&(AppState.appData.clinicVisits[_]=C)}else AppState.appData.clinicVisits.push(C);if(M){for(const _ of B){const F=I.find(Z=>String(Z.id)===String(_.medicationId));if(!F)continue;const V=parseInt(F.remainingQuantity??F.quantity??0,10)||0;if(!(typeof F.quantityAdded=="number"&&F.quantityAdded>0)&&_.delta>0){const Z=parseInt(F.quantity??0,10)||0;F.quantityAdded=Math.max(Z,V+_.delta)}let Y=V-_.delta;Y=Math.max(0,Y);const ae=typeof F.quantityAdded=="number"&&F.quantityAdded>0?F.quantityAdded:typeof F.quantity=="number"&&F.quantity>0?F.quantity:null;ae!==null&&(Y=Math.min(ae,Y)),F.remainingQuantity=Y}AppState.appData.medications=I,AppState.appData.clinicMedications=I,AppState.appData.clinicInventory=I}try{this.updateClinicAnalysisResults(),this.calculateClinicCardValues()}catch(_){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B:",_)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{const _=this.getMonthlyVisitsAlertThreshold(),F=this.getMonthlyVisitCountForPerson(C);if(F>=_){const V=(C.personType||"").toString().toLowerCase()==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0639\u0627\u0645\u0644";typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062A\u0646\u0628\u064A\u0647: \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A "+V+" \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \u0648\u0635\u0644 \u0623\u0648 \u062A\u062C\u0627\u0648\u0632 "+_+" \u0632\u064A\u0627\u0631\u0629. \u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),this.notifyAdminsAboutHighClinicVisits(C,F).catch(function(X){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic: \u0641\u0634\u0644 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0639\u0646 \u062A\u062C\u0627\u0648\u0632 \u062A\u0631\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A:",X)})}}catch(_){Utils.safeWarn("\u0641\u062D\u0635 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0634\u0647\u0631\u064A:",_)}Loading.hide(),Notification.success(`\u062A\u0645 ${a?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D`),n.remove();const P=6e4;(async()=>{try{const _=M&&B.length>0?B.map(F=>({medicationId:String(F.medicationId),delta:Number(F.delta)||0})):null;if(a){const F={...C};_&&(F.medicationAdjustments=_);const V=await GoogleIntegration.sendRequest({action:"updateClinicVisit",data:{visitId:e.id,updateData:F,__timeoutMs:P}});this.assertClinicVisitRpcResult(V)}else{const F={...C,__timeoutMs:P};_&&(F.medicationAdjustments=_);const V=await GoogleIntegration.sendRequest({action:"addClinicVisit",data:F});this.assertClinicVisitRpcResult(V),this.applyClinicVisitIdFromServer(C,V)}M&&(GoogleIntegration.sendRequest({action:"getAllMedications",data:{}}).then(F=>{if(F&&F.success&&Array.isArray(F.data)){const V=F.data.map(X=>this.normalizeMedicationRecord(X));if(AppState.appData.medications=V,AppState.appData.clinicMedications=V,AppState.appData.clinicInventory=V,Utils.safeLog("\u2705 [CLINIC] \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0645\u064F\u062D\u062F\u064E\u0651\u062B\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+V.length+" \u062F\u0648\u0627\u0621"),this.state&&this.state.activeTab==="medications")try{this.renderMedicationsTab()}catch{}}}).catch(()=>{}),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:"\u062A\u062D\u062F\u064A\u062B",data:{updated:B.length}}}))),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"clinicVisits",action:a?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:C}})),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.refreshClinicVisitsFromServerAfterSave()}catch(_){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",_);try{typeof window.DataManager<"u"&&window.DataManager.addToPendingSync&&window.DataManager.addToPendingSync("ClinicVisits",AppState.appData.clinicVisits)}catch{}try{this.refreshClinicVisitsFromServerAfterSave()}catch{}try{const F=_&&_.message?_.message:"\u0641\u0634\u0644 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.warning("\u26A0\uFE0F \u062A\u0639\u0630\u0651\u0631 \u062A\u0623\u0643\u064A\u062F \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+F+". \u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645.")}catch{}}})(),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]')&&this.state.activeTab==="visits"&&this.renderVisitsTab(),M&&document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]')&&this.state.activeTab==="medications"&&this.renderMedicationsTab(),document.querySelector('.clinic-tab-panel[data-tab-panel="dispensed-medications"]')&&this.state.activeTab==="dispensed-medications"&&this.renderDispensedMedicationsTab();const V=document.querySelector("#total-visits");V&&(V.textContent=AppState.appData.clinicVisits.length)},100)}catch($){Loading.hide(),this.showVisitFormAlert("\u062D\u062F\u062B \u062E\u0637\u0623: "+($.message||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")),l&&(l.disabled=!1,l.innerHTML=r)}}),n.addEventListener("click",o=>{o.target===n&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&n.remove()})},async showMedicationForm(e=null){this.ensureData(),e&&(e=this.normalizeMedicationRecord(e));const t=!!e,a=document.createElement("div");a.className="modal-overlay";const i=(D="")=>Utils.escapeHTML(D||""),n=e?.purchaseDate?new Date(e.purchaseDate).toISOString().slice(0,10):"",s=e?.productionDate?new Date(e.productionDate).toISOString().slice(0,10):"",o=e?.expiryDate?new Date(e.expiryDate).toISOString().slice(0,10):"",l=this.calculateMedicationStatus(e||{}),r=e?.quantityAdded??e?.quantity??0,c=e?.remainingQuantity??e?.quantity??0,d=Math.max(0,r-c);a.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
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
                                <input type="text" id="med-name" required class="form-input" placeholder="\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621" value="${i(e?.name||e?.medicationName)}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621 *</label>
                                <input type="text" id="med-type" list="med-type-list" required class="form-input" placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628..." value="${i(e?.type||e?.medicationType)}">
                                <datalist id="med-type-list">
                                    <option value="\u0623\u0642\u0631\u0627\u0635"></option>
                                    <option value="\u0634\u0631\u0627\u0628"></option>
                                    <option value="\u0643\u0628\u0633\u0648\u0644\u0627\u062A"></option>
                                    <option value="\u062D\u0642\u0646"></option>
                                    <option value="\u0645\u0631\u0647\u0645"></option>
                                    <option value="\u0642\u0637\u0631\u0629"></option>
                                    <option value="\u0628\u062E\u0627\u062E"></option>
                                </datalist>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</label>
                                <input type="text" id="med-usage" list="med-usage-list" class="form-input" placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628..." value="${i(e?.usage||e?.notes||"")}">
                                <datalist id="med-usage-list">
                                    <option value="\u0645\u0633\u0643\u0646"></option>
                                    <option value="\u0645\u0637\u0647\u0631 \u0645\u0639\u0648\u064A"></option>
                                    <option value="\u063A\u064A\u0627\u0631 \u0644\u0644\u062C\u0631\u0648\u062D"></option>
                                    <option value="\u0645\u0636\u0627\u062F \u062D\u064A\u0648\u064A"></option>
                                    <option value="\u0645\u0636\u0627\u062F \u0644\u0644\u062D\u0633\u0627\u0633\u064A\u0629"></option>
                                    <option value="\u0641\u064A\u062A\u0627\u0645\u064A\u0646"></option>
                                    <option value="\u062E\u0627\u0641\u0636 \u062D\u0631\u0627\u0631\u0629"></option>
                                </datalist>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621 *</label>
                                <input type="date" id="med-purchase" required class="form-input" value="${n}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0627\u062C *</label>
                                <input type="date" id="med-production" required class="form-input" value="${s}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</label>
                                <input type="date" id="med-expiry" class="form-input" value="${o}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 *</label>
                                <input type="number" id="med-quantity" required class="form-input" min="0" placeholder="\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629" value="${r}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0645\u064A\u0629 - \u0627\u0644\u0631\u0635\u064A\u062F *</label>
                                <input type="number" id="med-remaining" required class="form-input bg-gray-50 font-bold" min="0" placeholder="\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u062D" value="${c}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629</label>
                                <input type="number" id="med-dispensed" readonly class="form-input bg-gray-100 text-blue-700 font-bold cursor-not-allowed" value="${d}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u062E\u0632\u064A\u0646</label>
                                <input type="text" id="med-location" class="form-input" placeholder="\u0645\u062B\u0627\u0644: \u0627\u0644\u063A\u0631\u0641\u0629 1 - \u0627\u0644\u0631\u0641 \u0628" value="${i(e?.location)}">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629</label>
                            <textarea id="med-notes" class="form-input" rows="2" placeholder="\u0623\u062F\u062E\u0644 \u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0623\u0648 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u062E\u0627\u0635\u0629">${i(e?.notes)}</textarea>
                        </div>
                        <div class="flex flex-col bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                            <span class="text-sm font-semibold text-gray-700 mb-2">\u062D\u0627\u0644\u0629 \u0627\u0644\u0635\u0646\u0641 \u0645\u0646 \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0648\u0627\u0644\u0627\u0636\u0627\u0641\u0629 \u0648\u0627\u064A \u062D\u0631\u0643\u0629 \u0639\u0644\u064A \u0627\u0644\u062F\u0648\u0627\u0621</span>
                            <div class="flex items-center gap-3">
                                <span id="med-status-badge" class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${this.getMedicationStatusClasses(l.status)}">
                                    <i class="fas fa-info-circle"></i>
                                    ${l.status||"\u0633\u0627\u0631\u064A"}
                                </span>
                                <span id="med-status-hint" class="text-xs text-gray-500">${this.getMedicationStatusHint(l)}</span>
                            </div>
                            ${t?`<div class="text-xs text-gray-500 mt-2">
                                \u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644: ${Utils.escapeHTML(e?.createdBy?.name||"\u0627\u0644\u0646\u0638\u0627\u0645")} ${e?.createdAt?`(${this.formatDate(e.createdAt,!0)})`:""}
                                ${e?.updatedBy?`<br>\u0622\u062E\u0631 \u062A\u0639\u062F\u064A\u0644: ${Utils.escapeHTML(e.updatedBy.name)} ${e.updatedAt?`(${this.formatDate(e.updatedAt,!0)})`:""}`:""}
                            </div>`:""}
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
        `,document.body.appendChild(a);const p=a.querySelector("#medication-form"),f=p.querySelector("#med-purchase"),u=p.querySelector("#med-expiry"),m=p.querySelector("#med-status-badge"),g=p.querySelector("#med-status-hint"),y=p.querySelector("#med-quantity"),v=p.querySelector("#med-remaining"),h=p.querySelector("#med-dispensed"),w=()=>{const D=this.calculateMedicationStatus({expiryDate:u.value?new Date(u.value).toISOString():null});m.className=`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${this.getMedicationStatusClasses(D.status)}`,m.innerHTML=`<i class="fas fa-info-circle"></i>${D.status}`,g.textContent=this.getMedicationStatusHint(D)};u?.addEventListener("change",w),y.addEventListener("input",()=>{const D=parseInt(y.value)||0,L=parseInt(h.value)||0;v.value=Math.max(0,D-L)}),v.addEventListener("input",()=>{const D=parseInt(y.value)||0,L=parseInt(v.value)||0;h.value=Math.max(0,D-L)}),p.addEventListener("submit",async D=>{D.preventDefault();const L=p.querySelector("#med-name").value.trim(),b=p.querySelector("#med-type").value.trim(),A=p.querySelector("#med-usage")?.value.trim()||"",E=p.querySelector("#med-purchase").value,R=p.querySelector("#med-production").value,q=p.querySelector("#med-expiry").value,U=parseInt(p.querySelector("#med-quantity").value,10)||0,j=parseInt(p.querySelector("#med-remaining").value,10)||0,x=p.querySelector("#med-location").value.trim(),S=p.querySelector("#med-notes").value.trim(),C=e?.createdAt||new Date().toISOString(),$=e?.createdBy||this.getCurrentUserSummary(),N=E?new Date(E).toISOString():new Date().toISOString(),H=R?new Date(R).toISOString():new Date().toISOString(),O=q?new Date(q).toISOString():"",B=this.calculateMedicationStatus({expiryDate:O}),T=this.getCurrentUserSummary(),M=this.normalizeMedicationRecord({id:e?.id||Utils.generateId("MED"),name:L,type:b,usage:A,purchaseDate:N,productionDate:H,expiryDate:O,quantityAdded:U,remainingQuantity:j,location:x,notes:S,createdAt:C,createdBy:$,createdById:$?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:T,status:B.status,daysRemaining:B.daysRemaining});Loading.show();try{const I=AppState.appData.medications||[];if(t){const P=I.findIndex(_=>_.id===M.id);P!==-1?I[P]=M:I.push(M)}else I.push(M);AppState.appData.medications=I,AppState.appData.clinicMedications=I,AppState.appData.clinicInventory=I;try{this.calculateClinicCardValues(),this.updateClinicAnalysisResults()}catch(P){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u062F\u0648\u0627\u0621):",P)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"),a.remove(),this.state.medicationAlertsNotified.delete(M.id),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]')&&this.state.activeTab==="medications"&&this.renderMedicationsTab();const _=document.querySelector("#total-medications");_&&(_.textContent=I.length)},100),(async()=>{try{t?await GoogleIntegration.sendRequest({action:"updateMedication",data:{medicationId:M.id,updateData:M}}):await GoogleIntegration.sendRequest({action:"addMedication",data:M}),pendingNotification&&typeof GoogleIntegration<"u"&&await GoogleIntegration.sendRequest({action:"addNotification",data:{id:Utils.generateId("NOTIF"),title:t?"\u0637\u0644\u0628 \u062A\u0639\u062F\u064A\u0644 \u062F\u0648\u0627\u0621":"\u0637\u0644\u0628 \u0625\u0636\u0627\u0641\u0629 \u062F\u0648\u0627\u0621 \u062C\u062F\u064A\u062F",message:`\u0642\u0627\u0645 ${T.name} \u0628\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 ${t?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629"} \u0644\u0644\u062F\u0648\u0627\u0621: ${M.name}`,type:"alert",targetRoles:["admin","manager"],createdAt:new Date().toISOString(),readBy:[],link:"#clinic-medications"}}),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:t?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:M}}))}catch(P){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets:",P)}})()}catch(I){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+I.message)}}),a.addEventListener("click",D=>{D.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()})},async viewVisit(e){this.ensureData();const t=AppState.appData.clinicVisits.find(p=>p.id===e);if(!t)return;t.createdBy||(t.createdBy=null),t.updatedBy||(t.updatedBy=null);const a=t.personType==="employee"?"\u0645\u0648\u0638\u0641":t.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",i=t.personType==="employee"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641":t.personType==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0633\u0645 \u0627\u0644\u062C\u0647\u0629",n=t.employeeName||t.contractorName||t.externalName||"",s=(t.personType==="contractor"||t.personType==="external")&&t.contractorWorkerName?`
                <div class="col-span-2">
                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639:</label>
                    <p class="text-gray-800">${Utils.escapeHTML(t.contractorWorkerName)}</p>
                </div>
            `:"",o=t.personType==="employee"?"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644":"\u0645\u0646\u0637\u0642\u0629 / \u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0645\u0644",l=t.personType==="employee"?t.employeeLocation:t.workArea,r=t.exitDate?Utils.escapeHTML(Utils.formatDateTime(t.exitDate)):'<span class="text-xs text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C</span>',c=t.medications&&Array.isArray(t.medications)&&t.medications.length>0?t.medications.map(p=>`
                <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: #667eea;">${Utils.escapeHTML(p.medicationName||"")}</span>
                    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">\u0627\u0644\u0643\u0645\u064A\u0629: ${p.quantity||1}</span>
                </div>
            `).join(""):'<p style="color: #999; font-style: italic;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629</p>',d=document.createElement("div");d.className="modal-overlay",d.innerHTML=`
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
                                        ${i}
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
                                ${s?`
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
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${(()=>{if(!t.createdBy)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(typeof t.createdBy=="object")return Utils.escapeHTML(t.createdBy.name||t.createdBy.email||t.createdBy.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const p=String(t.createdBy).trim();if(p==="\u0627\u0644\u0646\u0638\u0627\u0645"||p===""){const f=(t.email||"").toString().trim();if(f&&f!=="")return Utils.escapeHTML(f);const u=(AppState.currentUser?.email||"").toString().trim();return u&&u!==""?Utils.escapeHTML(u):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}return Utils.escapeHTML(p)})()}</p>
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
        `,document.body.appendChild(d),d.addEventListener("click",p=>{p.target===d&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&d.remove()})},printVisitsList(){const e=AppState.appData.clinicVisits.slice().reverse();if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}const a=`
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
                        ${e.map(n=>{const s=n.employeeCode||n.employeeNumber||"-",o=n.employeeName||n.contractorName||n.externalName||"",l=n.contractorWorkerName?` (${n.contractorWorkerName})`:"",r=n.employeePosition||"-",c=n.employeeLocation||n.workArea||"-",d=n.visitDate?Utils.formatDateTime(n.visitDate):"-",p=n.exitDate?Utils.formatDateTime(n.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",f=Clinic.calculateTotalTime(n.visitDate,n.exitDate),u=n.reason||"",m=n.diagnosis||"",g=n.treatment||"";return`
                <tr>
                    <td>${s}</td>
                    <td>${o}${l}</td>
                    <td>${r}</td>
                    <td>${c}</td>
                    <td>${d}</td>
                    <td>${p}</td>
                    <td>${f}</td>
                    <td>${u}</td>
                    <td>${m}</td>
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
        `,i=window.open("","_blank");i&&(i.document.write(a),i.document.close(),i.onload=()=>{setTimeout(()=>{i.print(),Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629")},250)})},exportVisitsToExcel(){this.ensureData();const e=this.state.activeVisitType||"employees",t=e==="contractors",a=(AppState.appData.clinicVisits||[]).slice().reverse(),i=a.filter(o=>o.personType==="employee"||!o.personType),n=a.filter(o=>o.personType==="contractor"),s=e==="employees"?i:n;if(s.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}try{const o=s.map(d=>{const p=t?d.contractorName||d.employeeName||d.externalName||"-":d.employeeCode||d.employeeNumber||"-",f=t?d.contractorWorkerName||"-":d.employeeName||"-",u=d.employeePosition||d.contractorPosition||"-",m=this.getVisitFactoryDisplayName(d),g=t?d.workArea||d.employeeLocation||"-":d.employeeLocation||d.workArea||"-",y=d.visitDate?Utils.formatDateTime(d.visitDate):"-",v=d.exitDate?Utils.formatDateTime(d.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",h=this.calculateTotalTime(d.visitDate,d.exitDate),w=d.reason||"",D=d.diagnosis||"",L=this.normalizeVisitMedications(d.medications),b=L.length>0?L.map(R=>`${R.medicationName||""} (${R.quantity||1})`).join("\u060C "):"-",A=L.length>0?L.reduce((R,q)=>R+(parseInt(q.quantity,10)||0),0):0,E={};return E[t?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]=p,E.\u0627\u0644\u0627\u0633\u0645=f,E.\u0627\u0644\u0648\u0638\u064A\u0641\u0629=u,E.\u0627\u0644\u0645\u0635\u0646\u0639=m,E["\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"]=g,E["\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644"]=y,E["\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C"]=v,E["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A"]=h,E["\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"]=w,E.\u0627\u0644\u062A\u0634\u062E\u064A\u0635=D,E["\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629"]=b,E["\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629"]=A,E}),l=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(o);r["!cols"]=[{wch:18},{wch:25},{wch:20},{wch:16},{wch:20},{wch:20},{wch:20},{wch:15},{wch:25},{wch:25},{wch:30},{wch:14}],XLSX.utils.book_append_sheet(l,r,`\u0633\u062C\u0644\u0627\u062A_${t?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"}`);const c=`\u0633\u062C\u0644\u0627\u062A_\u0627\u0644\u0632\u064A\u0627\u0631\u0629_${t?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"}_\u0627\u0644\u0639\u064A\u0627\u062F\u0629_\u0627\u0644\u0637\u0628\u064A\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(l,c),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",o),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+o.message)}},async exportVisitsToPDF(){this.ensureData();const e=this.state.activeVisitType||"employees",t=e==="contractors",a=(AppState.appData.clinicVisits||[]).slice().reverse(),i=a.filter(o=>o.personType==="employee"||!o.personType),n=a.filter(o=>o.personType==="contractor"),s=e==="employees"?i:n;if(s.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{const o=s.map(m=>{const g=t?m.contractorName||m.employeeName||m.externalName||"-":m.employeeCode||m.employeeNumber||"-",y=t?m.contractorWorkerName||"-":m.employeeName||"-",v=t?m.contractorPosition||m.employeePosition||"-":m.employeePosition||"-",h=this.getVisitFactoryDisplayName(m),w=t?m.workArea||m.employeeLocation||"-":m.employeeLocation||m.workArea||"-",D=m.visitDate?Utils.formatDateTime(m.visitDate):"-",L=m.exitDate?Utils.formatDateTime(m.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",b=Clinic.calculateTotalTime(m.visitDate,m.exitDate),A=m.reason||"",E=m.diagnosis||"",R=this.normalizeVisitMedications(m.medications),q=R.length>0?R.map(j=>`${Utils.escapeHTML(j.medicationName||"")} (${j.quantity||1})`).join("\u060C "):"-",U=R.length>0?R.reduce((j,x)=>j+(parseInt(x.quantity,10)||0),0):0;return`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(g)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(y)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(v)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(h)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(w)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(D)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(L)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(b)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(A)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(E)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${q}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: bold;">${Utils.escapeHTML(String(U))}</td>
                    </tr>
                `}).join(""),l=`CLINIC-VISITS-${new Date().toISOString().slice(0,10)}`,r="\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 - \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",c=`
                <div style="margin-bottom: 20px;">
                    <h2 style="text-align: center; color: #1f2937; margin-bottom: 15px;">\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 - \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</h2>
                    <p style="text-align: center; color: #6b7280; font-size: 14px;">
                        \u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A: ${s.length}
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
            `,d=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(l,r,c,!1,!0,{source:"ClinicVisits"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${r}</title></head><body>${c}</body></html>`,p=new Blob([d],{type:"text/html;charset=utf-8"}),f=URL.createObjectURL(p),u=window.open(f,"_blank");u?u.onload=()=>{setTimeout(()=>{u.print(),setTimeout(()=>{URL.revokeObjectURL(f)},1e3),Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(f),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(o){URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",o),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+o.message)}},async exportVisitToPDF(e){if(!e){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{const t=e.personType==="employee"?"\u0645\u0648\u0638\u0641":e.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",a=e.employeeCode||e.employeeNumber||"-",i=e.employeeName||e.contractorName||e.externalName||"",n=e.contractorWorkerName?` (${e.contractorWorkerName})`:"",s=e.employeePosition||e.contractorPosition||"-",o=e.employeeLocation||e.workArea||"-",l=e.visitDate?Utils.formatDateTime(e.visitDate):"-",r=e.exitDate?Utils.formatDateTime(e.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",c=this.calculateTotalTime(e.visitDate,e.exitDate),d=e.reason||"",p=e.diagnosis||"",f=e.treatment||"",u=e.medications&&Array.isArray(e.medications)&&e.medications.length>0?e.medications.map(L=>`${Utils.escapeHTML(L.medicationName||"")} (${L.quantity||1})`).join("\u060C "):"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",m=`CLINIC-VISIT-${e.id||new Date().toISOString().slice(0,10)}`,g="\u062A\u0642\u0631\u064A\u0631 \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",y=`
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
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(i)}${Utils.escapeHTML(n)}</td>
                    </tr>
                    ${s!=="-"?`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(s)}</td>
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
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(d)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u062A\u0634\u062E\u064A\u0635</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(p)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0639\u0644\u0627\u062C / \u0627\u0644\u0625\u062C\u0631\u0627\u0621</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(f)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${u}</td>
                    </tr>
                </table>
            `,v=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(m,g,y,!1,!0,{source:"ClinicVisit"},e.visitDate||e.createdAt||new Date().toISOString(),e.updatedAt||e.createdAt||new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${g}</title></head><body>${y}</body></html>`,h=new Blob([v],{type:"text/html;charset=utf-8"}),w=URL.createObjectURL(h),D=window.open(w,"_blank");D?D.onload=()=>{setTimeout(()=>{D.print(),setTimeout(()=>{URL.revokeObjectURL(w)},1e3),Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(w),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(t){URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+t.message)}},getClinicWorkflowStyles_(){return`<style>
            .clinic-workflow-root{--cw-navy:#0b2d4f;--cw-blue:#174d78;--cw-teal:#0f8b83;--cw-gold:#f59e0b;--cw-ink:#183047;--cw-muted:#64748b;--cw-line:#d9e6ee;--cw-pale:#f4f9fb;color:var(--cw-ink);font-family:inherit}.clinic-workflow-root *{box-sizing:border-box}
            .cw-hero{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:19px 22px;margin-bottom:14px;border-radius:16px;background:linear-gradient(128deg,var(--cw-navy),var(--cw-blue) 62%,#17726e);color:#fff;box-shadow:0 9px 26px rgba(11,45,79,.19)}.cw-hero:after{content:"";position:absolute;width:210px;height:210px;left:-75px;top:-120px;border:28px solid rgba(255,255,255,.06);border-radius:50%;pointer-events:none}.cw-hero-copy{position:relative;z-index:1;display:flex;align-items:center;gap:13px}.cw-hero-icon{width:48px;height:48px;border:1px solid rgba(255,255,255,.24);border-radius:14px;background:rgba(255,255,255,.13);display:grid;place-items:center;font-size:21px}.cw-hero h2{margin:0;font-size:1.12rem;font-weight:850}.cw-hero p{margin:4px 0 0;color:#d9ebf3;font-size:.75rem}.cw-hero-meta{position:relative;z-index:1;display:flex;align-items:center;gap:7px;flex-wrap:wrap}.cw-hero-pill{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border:1px solid rgba(255,255,255,.22);border-radius:9px;background:rgba(255,255,255,.11);color:#fff;font:inherit;font-size:.72rem;font-weight:750}.cw-hero-primary{cursor:pointer;background:#fff;color:var(--cw-navy);border-color:#fff;box-shadow:0 4px 12px rgba(0,0,0,.13)}
            .cw-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:14px}.cw-kpi{display:flex;align-items:center;gap:11px;padding:12px 14px;border:1px solid var(--cw-line);border-radius:12px;background:#fff;box-shadow:0 3px 12px rgba(15,46,72,.045)}.cw-kpi-icon{width:39px;height:39px;border-radius:10px;display:grid;place-items:center}.cw-kpi:nth-child(1) .cw-kpi-icon{background:#fff7ed;color:#c2410c}.cw-kpi:nth-child(2) .cw-kpi-icon{background:#ecfdf5;color:#047857}.cw-kpi:nth-child(3) .cw-kpi-icon{background:#fef2f2;color:#b91c1c}.cw-kpi:nth-child(4) .cw-kpi-icon{background:#eff6ff;color:#1d4ed8}.cw-kpi small{display:block;color:var(--cw-muted);font-size:.67rem;font-weight:650}.cw-kpi strong{display:block;margin-top:2px;font-size:1.05rem;font-weight:850;color:var(--cw-ink)}
            .cw-filter{padding:14px 16px;margin-bottom:14px;border:1px solid #b9dbe2;border-radius:14px;background:linear-gradient(180deg,#f9fcfd,#f1f8fa)}.cw-filter-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:11px}.cw-filter-title{display:flex;align-items:center;gap:7px;color:var(--cw-navy);font-size:.81rem;font-weight:820}.cw-count-pill{padding:3px 8px;border-radius:999px;background:#d9f4f1;color:#0f766e;font-size:.66rem}.cw-filter-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}.cw-field label{display:block;margin-bottom:5px;color:#536b7c;font-size:.68rem;font-weight:750}.cw-field label i{width:17px;color:var(--cw-teal)}.cw-control{width:100%;min-height:39px;padding:8px 11px;border:1.5px solid #c8dce4;border-radius:9px;background:#fff;color:var(--cw-ink);font:inherit;font-size:.78rem;outline:none;transition:border-color .18s,box-shadow .18s}.cw-control:focus{border-color:var(--cw-teal);box-shadow:0 0 0 3px rgba(15,139,131,.11)}.cw-input-wrap{position:relative}.cw-input-wrap>i{position:absolute;right:11px;top:50%;transform:translateY(-50%);color:#7890a1;font-size:.75rem;pointer-events:none}.cw-input-wrap .cw-control{padding-right:34px}.cw-reset{padding:6px 10px;border:1px solid #c8dce4;border-radius:8px;background:#fff;color:#536b7c;font-size:.71rem;font-weight:750;cursor:pointer}.cw-reset:disabled{opacity:.42;cursor:not-allowed}
            .cw-table-card{overflow:hidden;border:1px solid var(--cw-line);border-radius:14px;background:#fff;box-shadow:0 5px 20px rgba(15,46,72,.06)}.cw-table-caption{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 15px;border-bottom:1px solid var(--cw-line)}.cw-table-caption strong{color:var(--cw-navy);font-size:.84rem}.cw-table-caption span{color:var(--cw-muted);font-size:.69rem}.cw-table-scroll{overflow:auto;max-height:68vh}.cw-table{width:100%;min-width:1020px;border-collapse:separate;border-spacing:0}.cw-table thead{position:sticky;top:0;z-index:4}.cw-table th{padding:12px 10px;background:linear-gradient(180deg,#17466f,#103758);color:#fff;border-left:1px solid rgba(255,255,255,.1);font-size:.71rem;font-weight:780;white-space:nowrap;text-align:right}.cw-table th i{margin-left:5px;color:#6ee7dc}.cw-table td{padding:11px 10px;border-bottom:1px solid #e8eff4;color:#344b5f;font-size:.77rem;vertical-align:middle}.cw-table tbody tr:nth-child(even){background:#f8fbfd}.cw-table tbody tr:hover{background:#eef8f8}.cw-table tbody tr:last-child td{border-bottom:0}.cw-serial{display:inline-grid;place-items:center;width:27px;height:27px;border-radius:8px;background:#e8f1f7;color:var(--cw-navy);font-weight:850}.cw-main-cell{display:flex;align-items:center;gap:9px}.cw-cell-icon{flex:0 0 auto;width:34px;height:34px;border-radius:10px;background:#e7f5f3;color:var(--cw-teal);display:grid;place-items:center}.cw-main-cell strong{display:block;color:var(--cw-ink);font-size:.79rem}.cw-main-cell small{display:block;margin-top:3px;color:#7a91a1;font-size:.65rem}.cw-actions{display:flex;align-items:center;justify-content:center;gap:6px}.cw-actions .btn-icon{width:32px;height:32px;border-radius:8px;box-shadow:none}.cw-empty{text-align:center;padding:52px 20px;color:var(--cw-muted)}.cw-empty i{display:grid;place-items:center;width:60px;height:60px;margin:0 auto 11px;border-radius:17px;background:#eaf4f8;color:var(--cw-teal);font-size:24px}.cw-empty h3{margin:0 0 4px;color:var(--cw-navy);font-size:.95rem}.cw-empty p{margin:0;font-size:.75rem}
            .cw-form-card{overflow:hidden;margin-bottom:14px;border:1px solid var(--cw-line);border-radius:15px;background:#fff;box-shadow:0 5px 20px rgba(15,46,72,.06)}.cw-form-head{display:flex;align-items:center;gap:10px;padding:14px 17px;border-bottom:1px solid var(--cw-line);background:linear-gradient(180deg,#fbfdfe,#f4f9fb)}.cw-form-head span{width:36px;height:36px;border-radius:10px;background:#dff4f1;color:var(--cw-teal);display:grid;place-items:center}.cw-form-head h3{margin:0;color:var(--cw-navy);font-size:.9rem}.cw-form-head p{margin:2px 0 0;color:var(--cw-muted);font-size:.67rem}.cw-form-body{padding:17px}.cw-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}.cw-field-full{grid-column:1/-1}.cw-field-title{display:flex;align-items:center;gap:6px;margin-bottom:6px;color:#40596c;font-size:.72rem;font-weight:780}.cw-field-title i{color:var(--cw-teal)}.cw-form-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:15px;padding-top:14px;border-top:1px solid #e8eff4}.cw-submit,.cw-secondary{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:9px 15px;border-radius:9px;font-size:.77rem;font-weight:780;cursor:pointer}.cw-submit{border:1px solid var(--cw-navy);background:var(--cw-navy);color:#fff;box-shadow:0 4px 12px rgba(11,45,79,.18)}.cw-secondary{border:1px solid #cbdce3;background:#fff;color:#536b7c}
            @media(max-width:980px){.cw-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.cw-filter-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
            @media(max-width:620px){.cw-hero{padding:16px}.cw-hero-meta{width:100%}.cw-hero-pill{flex:1;justify-content:center}.cw-kpis,.cw-filter-grid,.cw-form-grid{grid-template-columns:1fr}.cw-field-full{grid-column:auto}.cw-filter,.cw-form-body{padding:12px}.cw-table-caption{align-items:flex-start;flex-direction:column}.cw-form-actions{flex-direction:column}.cw-submit,.cw-secondary{width:100%}}
            @media(prefers-reduced-motion:reduce){.cw-control{transition:none}}
        </style>`},async ensureApprovalsDataLoaded({force:e=!1}={}){return this._approvalsLoadPromise&&!e?this._approvalsLoadPromise:(this._approvalsLoadPromise=(async()=>{if(!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl)||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest){this._approvalsBackendFetchOk=!0;return}const a=GoogleIntegration.sendRequest({action:"getAllMedicationDeletionRequests",data:{filters:{}}}),i=GoogleIntegration.sendRequest({action:"getAllSupplyRequests",data:{filters:{}}}),n=GoogleIntegration.sendRequest({action:"getAllClinicVisitDeletionRequests",data:{filters:{}}}),s=GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{filters:{}}}),[o,l,r,c]=await Promise.allSettled([Utils.promiseWithTimeout(a,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u062D\u0630\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629"),Utils.promiseWithTimeout(i,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C"),Utils.promiseWithTimeout(n,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A"),Utils.promiseWithTimeout(s,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A")]),d=o.status==="fulfilled"?o.value:null,p=l.status==="fulfilled"?l.value:null,f=r.status==="fulfilled"?r.value:null,u=c.status==="fulfilled"?c.value:null,m=Array.isArray(d?.data)?d.data:[],g=Array.isArray(p?.data)?p.data:[],y=Array.isArray(f?.data)?f.data:[],v=Array.isArray(u?.data)?u.data:[];(m.length>0||!(Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)&&AppState.appData.clinicMedicationDeletionRequests.length>0))&&(AppState.appData.clinicMedicationDeletionRequests=m),(g.length>0||!(Array.isArray(AppState.appData?.clinicSupplyRequests)&&AppState.appData.clinicSupplyRequests.length>0))&&(AppState.appData.clinicSupplyRequests=g),(y.length>0||!(Array.isArray(AppState.appData?.clinicVisitDeletionRequests)&&AppState.appData.clinicVisitDeletionRequests.length>0))&&(AppState.appData.clinicVisitDeletionRequests=y),(v.length>0||!(Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)&&AppState.appData.clinicStaffTimeOffRequests.length>0)||c.status==="fulfilled"&&u&&u.success!==!1)&&(AppState.appData.clinicStaffTimeOffRequests=v);try{localStorage.setItem("clinic_approvals_last_sync",String(Date.now()))}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch(h){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic approvals: \u0641\u0634\u0644 DataManager.save \u0628\u0639\u062F \u062C\u0644\u0628 \u0627\u0644\u0640 approvals:",h)}this._approvalsBackendFetchOk=!0})().finally(()=>{this._approvalsLoadPromise=null}),this._approvalsLoadPromise)},async renderApprovalsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="approvals"]');if(!e){Utils.safeError("\u274C \u0644\u0648\u062D\u0629 approvals \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!this.isCurrentUserAdmin()){e.innerHTML='<div class="text-center py-8 text-gray-500">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</div>';return}e.innerHTML='<div class="text-center py-8"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p class="mt-2">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0636\u064A\u0631...</p></div>';try{const t=(()=>{try{return localStorage.getItem("clinic_approvals_last_sync")}catch{return null}})(),a=t?Date.now()-parseInt(t,10):1/0,i=300*1e3,n=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)&&AppState.appData.clinicMedicationDeletionRequests.length>0,s=Array.isArray(AppState.appData?.clinicSupplyRequests)&&AppState.appData.clinicSupplyRequests.length>0,o=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)&&AppState.appData.clinicVisitDeletionRequests.length>0,l=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)&&AppState.appData.clinicStaffTimeOffRequests.length>0,r=n||s||o||l,c=a>=i;if(!c&&r&&(this._approvalsBackendFetchOk=!0),(c||!r||this._approvalsBackendFetchOk!==!0||!l)&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const S=async()=>{await this.ensureApprovalsDataLoaded({force:c&&r})};r?S().then(()=>{try{this.state&&this.state.activeTab==="approvals"&&this.renderApprovalsTab()}catch{}}).catch(()=>{}):await Promise.race([S(),new Promise(C=>setTimeout(C,6e3))])}const p=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)?AppState.appData.clinicMedicationDeletionRequests:[],f=Array.isArray(AppState.appData?.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[],u=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],m=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[],g=p.map(S=>({...S,requestType:"deletion"})),y=f.map(S=>({...S,requestType:"supply"})),v=u.map(S=>({...S,requestType:"visit"})),h=m.map(S=>({...S,approvalKind:"timeoff"})),w=[...g,...y,...v,...h];Utils.safeLog(`\u{1F4CB} \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${g.length} \u0637\u0644\u0628 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621 \u0648 ${y.length} \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C \u0648 ${v.length} \u0637\u0644\u0628 \u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629 \u0648 ${h.length} \u0637\u0644\u0628 \u0625\u062C\u0627\u0632\u0629/\u0625\u0630\u0646/\u0625\u0636\u0627\u0641\u064A`);const D=w.filter(S=>S.status==="pending"),L=w.filter(S=>S.status==="approved"),b=w.filter(S=>S.status==="rejected"),A=document.getElementById("pending-approvals-badge");if(A){const S=D.length;S>0?(A.textContent=S,A.style.display="inline-block"):A.style.display="none"}e.innerHTML=`
                ${this.getClinicWorkflowStyles_()}
                <div class="clinic-workflow-root" id="clinic-approvals-root">
                    <section class="cw-hero" aria-labelledby="approvals-title">
                        <div class="cw-hero-copy"><span class="cw-hero-icon"><i class="fas fa-clipboard-check"></i></span><div><h2 id="approvals-title">\u0645\u0631\u0643\u0632 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629</h2><p>\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u0646 \u0634\u0627\u0634\u0629 \u062A\u0634\u063A\u064A\u0644 \u0645\u0648\u062D\u062F\u0629</p></div></div>
                        <div class="cw-hero-meta"><span class="cw-hero-pill"><i class="fas fa-hourglass-half"></i>${D.length} \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0642\u0631\u0627\u0631</span><button type="button" id="approvals-refresh-btn" class="cw-hero-pill" style="cursor:pointer;color:#fff;"><i class="fas fa-sync-alt"></i>\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</button></div>
                    </section>
                    <section class="cw-kpis" aria-label="\u0645\u0644\u062E\u0635 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629">
                        <div class="cw-kpi"><span class="cw-kpi-icon"><i class="fas fa-clock"></i></span><div><small>\u0637\u0644\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629</small><strong>${D.length}</strong></div></div>
                        <div class="cw-kpi"><span class="cw-kpi-icon"><i class="fas fa-check"></i></span><div><small>\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627</small><strong>${L.length}</strong></div></div>
                        <div class="cw-kpi"><span class="cw-kpi-icon"><i class="fas fa-times"></i></span><div><small>\u0637\u0644\u0628\u0627\u062A \u0645\u0631\u0641\u0648\u0636\u0629</small><strong>${b.length}</strong></div></div>
                        <div class="cw-kpi"><span class="cw-kpi-icon"><i class="fas fa-layer-group"></i></span><div><small>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0637\u0644\u0628\u0627\u062A</small><strong>${w.length}</strong></div></div>
                    </section>
                    <section class="cw-filter" aria-label="\u0641\u0644\u0627\u062A\u0631 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629">
                        <div class="cw-filter-head"><div class="cw-filter-title"><i class="fas fa-sliders-h"></i>\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062A <span id="approvals-filter-count" class="cw-count-pill">${D.length} \u0645\u0646 ${w.length}</span></div><button type="button" id="approvals-reset-filters" class="cw-reset"><i class="fas fa-undo-alt ml-1"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0636\u0628\u0637</button></div>
                        <div class="cw-filter-grid">
                            <div class="cw-field"><label for="approvals-search-filter"><i class="fas fa-search"></i>\u0628\u062D\u062B \u0634\u0627\u0645\u0644</label><div class="cw-input-wrap"><i class="fas fa-search"></i><input type="search" id="approvals-search-filter" class="cw-control" placeholder="\u0627\u0644\u0639\u0646\u0635\u0631 \u0623\u0648 \u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628..." autocomplete="off"></div></div>
                            <div class="cw-field"><label for="approvals-status-filter"><i class="fas fa-tasks"></i>\u0627\u0644\u062D\u0627\u0644\u0629</label><select id="approvals-status-filter" class="cw-control"><option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option><option value="pending" selected>\u0637\u0644\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629</option><option value="approved">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627</option><option value="rejected">\u0645\u0631\u0641\u0648\u0636\u0629</option></select></div>
                            <div class="cw-field"><label for="approvals-type-filter"><i class="fas fa-tags"></i>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</label><select id="approvals-type-filter" class="cw-control"><option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option><option value="deletion">\u062D\u0630\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629</option><option value="supply">\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C</option><option value="visit">\u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A</option><option value="timeoff">\u0625\u062C\u0627\u0632\u0629 / \u0625\u0630\u0646 / \u0625\u0636\u0627\u0641\u064A</option></select></div>
                        </div>
                    </section>
                    <section class="cw-table-card"><div class="cw-table-caption"><div><strong>\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062A</strong><span> \u2014 \u0627\u062A\u062E\u0630 \u0627\u0644\u0642\u0631\u0627\u0631 \u0623\u0648 \u0627\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</span></div><span id="approvals-result-pill" class="cw-count-pill">${D.length} \u0637\u0644\u0628</span></div><div id="approvals-table-container">${this.renderApprovalsTable(D)}</div></section>
                </div>`;const E=document.getElementById("approvals-status-filter"),R=document.getElementById("approvals-type-filter"),q=document.getElementById("approvals-search-filter"),U=document.getElementById("approvals-reset-filters"),j=document.getElementById("approvals-refresh-btn"),x=()=>{const S=E?.value||"all",C=R?.value||"all",$=this.normalizeArabicText(q?.value||"");let N=w;S!=="all"&&(N=N.filter(T=>T.status===S)),C!=="all"&&(N=N.filter(T=>this._approvalRequestMatchesTypeFilter(T,C))),$&&(N=N.filter(T=>this.normalizeArabicText([T.itemName,T.requestedBy?.name,T.requestedByName,T.userName,T.userEmail,T.medicationData?.name,T.visitData?.employeeName,T.visitData?.contractorName,T.reason].filter(Boolean).join(" ")).includes($)));const H=document.getElementById("approvals-table-container");H&&(H.innerHTML=this.renderApprovalsTable(N),this.bindApprovalsEvents(H));const O=document.getElementById("approvals-filter-count"),B=document.getElementById("approvals-result-pill");O&&(O.textContent=`${N.length} \u0645\u0646 ${w.length}`),B&&(B.textContent=`${N.length} \u0637\u0644\u0628`)};E&&E.addEventListener("change",x),R&&R.addEventListener("change",x),q?.addEventListener("input",x),U?.addEventListener("click",()=>{q&&(q.value=""),E&&(E.value="pending"),R&&(R.value="all"),x()}),j?.addEventListener("click",async()=>{j.disabled=!0,j.innerHTML='<i class="fas fa-spinner fa-spin"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B';try{await this.ensureApprovalsDataLoaded({force:!0})}finally{this.renderApprovalsTab()}}),this.bindApprovalsEvents(e),setTimeout(()=>{const S=e.querySelector(".clinic-table-wrapper");S&&this.setupTableScrollListeners(S)},100)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",t),e.innerHTML='<div class="alert alert-error">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</div>'}},renderApprovalsTable(e){return!e||e.length===0?'<div class="cw-empty"><i class="fas fa-inbox"></i><h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629</h3><p>\u063A\u064A\u0651\u0631 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0623\u0648 \u062D\u062F\u0651\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0639\u0631\u0636 \u0627\u0644\u0637\u0644\u0628\u0627\u062A.</p></div>':`
            <div class="cw-table-scroll clinic-table-wrapper">
                <table class="cw-table">
                    <thead>
                        <tr>
                            <th class="text-center"><i class="fas fa-hashtag"></i>\u0645</th>
                            <th><i class="fas fa-tag"></i>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</th>
                            <th><i class="fas fa-file-medical-alt"></i>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628</th>
                            <th><i class="fas fa-layer-group"></i>\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th>
                            <th><i class="fas fa-user"></i>\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628</th>
                            <th><i class="fas fa-calendar-alt"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628</th>
                            <th><i class="fas fa-tasks"></i>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th class="text-center"><i class="fas fa-cogs"></i>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map((a,i)=>{const n=a.approvalKind||a.requestType||"deletion",s=n==="deletion",o=n==="supply",l=n==="visit",r=this._isApprovalTimeOffRequest(a);let c="-",d="-",p="";if(s){const y=a.medicationData||{};c=y.name||"-",d=y.type||"-",p=`\u0627\u0644\u062F\u0648\u0627\u0621: ${c}`}else if(o){c=a.itemName||"-";const y={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[a.type]||a.type||"-";d=y,p=`${y}: ${c} (${a.quantity||""} ${a.unit||""})`,a.type==="medication"&&a.currentBalanceAtRequest!==null&&a.currentBalanceAtRequest!==void 0&&(p+=` \u2022 \u0627\u0644\u0631\u0635\u064A\u062F \u0648\u0642\u062A \u0627\u0644\u0637\u0644\u0628: ${a.currentBalanceAtRequest} ${a.unit||"\u0648\u062D\u062F\u0629"}`)}else if(l){const y=a.visitData||{},v=y.employeeName||y.contractorWorkerName||y.contractorName||y.externalName||"-",h=y.personType==="employee"?"\u0645\u0648\u0638\u0641":y.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629";c=v,d=h,p=`\u0632\u064A\u0627\u0631\u0629: ${v} (${h})`}else r&&(c=a.userName||a.userEmail||"-",d=this.getTimeOffRequestTypeLabel(a.requestType),p=`${d}: ${this.formatTimeOffRequestDetails(a)}`);const f=r?{name:a.userName||a.userEmail||"-"}:a.requestedBy||{},u=this.getApprovalStatusBadge(a.status),m=a.status==="pending",g=s?'<span class="badge badge-info">\u062D\u0630\u0641 \u062F\u0648\u0627\u0621</span>':o?'<span class="badge badge-primary">\u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C</span>':r?'<span class="badge badge-success">\u0625\u062C\u0627\u0632\u0629/\u0625\u0630\u0646/\u0625\u0636\u0627\u0641\u064A</span>':'<span class="badge badge-warning">\u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629</span>';return`
                <tr>
                    <td class="text-center"><span class="cw-serial">${i+1}</span></td>
                    <td>${g}</td>
                    <td><div class="cw-main-cell"><span class="cw-cell-icon"><i class="${o?"fas fa-box-open":r?"fas fa-user-clock":l?"fas fa-user-minus":"fas fa-pills"}"></i></span><div><strong>${Utils.escapeHTML(c)}</strong><small>${Utils.escapeHTML(p)}</small></div></div></td>
                    <td>${Utils.escapeHTML(d)}</td>
                    <td>${Utils.escapeHTML(f.name||"-")}</td>
                    <td>${this.formatDate(a.createdAt||a.requestDate,!0)}</td>
                    <td>${u}</td>
                    <td class="text-center">
                        <div class="cw-actions">
                            ${m?`
                                <button type="button" class="btn-icon btn-icon-success" data-action="approve-request" data-id="${Utils.escapeHTML(a.id||"")}" data-type="${Utils.escapeHTML(n)}" title="\u0645\u0648\u0627\u0641\u0642\u0629" aria-label="\u0645\u0648\u0627\u0641\u0642\u0629">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button type="button" class="btn-icon btn-icon-danger" data-action="reject-request" data-id="${Utils.escapeHTML(a.id||"")}" data-type="${Utils.escapeHTML(n)}" title="\u0631\u0641\u0636" aria-label="\u0631\u0641\u0636">
                                    <i class="fas fa-times"></i>
                                </button>
                            `:""}
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-request" data-id="${Utils.escapeHTML(a.id||"")}" data-type="${Utils.escapeHTML(n)}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" aria-label="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},getApprovalStatusBadge(e){switch(e){case"pending":return'<span class="badge badge-warning">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>';case"approved":return'<span class="badge badge-success">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>';case"rejected":return'<span class="badge badge-danger">\u0645\u0631\u0641\u0648\u0636</span>';default:return'<span class="badge badge-secondary">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>'}},bindApprovalsEvents(e=document){e.querySelectorAll('[data-action="approve-request"]').forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-id"),i=t.getAttribute("data-type")||"deletion";this.approveRequest(a,i)})}),e.querySelectorAll('[data-action="reject-request"]').forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-id"),i=t.getAttribute("data-type")||"deletion";this.rejectRequest(a,i)})}),e.querySelectorAll('[data-action="view-request"]').forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-id"),i=t.getAttribute("data-type")||"deletion";this.viewRequestDetails(a,i)})})},async approveRequest(e,t="deletion"){const a=t==="deletion",i=t==="supply",n=t==="visit",s=t==="timeoff";if(confirm(a?`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062F\u0648\u0627\u0621\u061F

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645.`:i?"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F":s?"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A\u061F":`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0632\u064A\u0627\u0631\u0629\u061F

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F.`)){Loading.show();try{const r={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};let c;if(a?c=await GoogleIntegration.sendRequest({action:"approveMedicationDeletion",data:{requestId:e,approverData:r}}):i?c=await GoogleIntegration.sendRequest({action:"approveSupplyRequest",data:{requestId:e,approverData:r,__timeoutMs:this._supplyRequestActionTimeoutMs}}):n?c=await GoogleIntegration.sendRequest({action:"approveClinicVisitDeletion",data:{requestId:e,approverData:r}}):s&&(c=await GoogleIntegration.sendRequest({action:"approveClinicStaffTimeOffRequest",data:{requestId:e,notes:""}})),c&&c.success){if(Loading.hide(),i&&Array.isArray(AppState.appData.clinicSupplyRequests)){const p=AppState.appData.clinicSupplyRequests.find(f=>String(f.id)===String(e));p&&Object.assign(p,{status:"approved",approvedBy:r,approvedById:r.id||r.email||"",approvedAt:new Date().toISOString()})}const d=a?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0648\u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D":i?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D":s?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A":"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D";if(Notification.success(d),s)try{const p=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});p?.success&&Array.isArray(p.data)&&(AppState.appData.clinicStaffTimeOffRequests=p.data),this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!0),this._leaveBalancesFetchedInSession=!0}catch{}(i||s)&&typeof UI<"u"&&typeof UI.updateNotificationsBadge=="function"&&UI.updateNotificationsBadge(),setTimeout(()=>{this.renderApprovalsTab()},100),a&&(async()=>{try{const p=await GoogleIntegration.sendRequest({action:"getAllMedications",data:{}});p&&p.success&&(AppState.appData.medications=p.data,AppState.appData.clinicMedications=p.data,AppState.appData.clinicInventory=p.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}catch(p){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",p)}})()}else throw new Error(c.message||"\u0641\u0634\u0644\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0629")}catch(r){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628:",r),Notification.error("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629: "+(r.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}}},async rejectRequest(e,t="deletion"){const a=prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):");if(a!==null){Loading.show();try{const i={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};let n;if(t==="deletion"?n=await GoogleIntegration.sendRequest({action:"rejectMedicationDeletion",data:{requestId:e,rejectorData:i,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):t==="supply"?n=await GoogleIntegration.sendRequest({action:"rejectSupplyRequest",data:{requestId:e,rejectorData:i,__timeoutMs:this._supplyRequestActionTimeoutMs,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):t==="visit"?n=await GoogleIntegration.sendRequest({action:"rejectClinicVisitDeletion",data:{requestId:e,rejectorData:i,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):t==="timeoff"&&(n=await GoogleIntegration.sendRequest({action:"rejectClinicStaffTimeOffRequest",data:{requestId:e,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}})),n&&n.success){if(Loading.hide(),t==="supply"&&Array.isArray(AppState.appData.clinicSupplyRequests)){const s=AppState.appData.clinicSupplyRequests.find(o=>String(o.id)===String(e));s&&Object.assign(s,{status:"rejected",rejectedBy:i,rejectedById:i.id||i.email||"",rejectedAt:new Date().toISOString(),rejectionReason:a||""})}if(Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),t==="timeoff")try{const s=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});s?.success&&Array.isArray(s.data)&&(AppState.appData.clinicStaffTimeOffRequests=s.data)}catch{}(t==="supply"||t==="timeoff")&&typeof UI<"u"&&typeof UI.updateNotificationsBadge=="function"&&UI.updateNotificationsBadge(),setTimeout(()=>{this.renderApprovalsTab()},100)}else throw new Error(n.message||"\u0641\u0634\u0644\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0629")}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628:",i),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0631\u0641\u0636: "+(i.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}}},async viewRequestDetails(e,t="deletion"){try{let a;if(t==="deletion"?a=await GoogleIntegration.sendRequest({action:"getAllMedicationDeletionRequests",data:{filters:{}}}):t==="supply"?a=await GoogleIntegration.sendRequest({action:"getAllSupplyRequests",data:{filters:{}}}):t==="visit"?a=await GoogleIntegration.sendRequest({action:"getAllClinicVisitDeletionRequests",data:{filters:{}}}):t==="timeoff"&&(a=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{filters:{}}})),!a||!a.success){Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628");return}const i=a.data.find(y=>y.id===e);if(!i){Notification.error("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const n=t==="deletion",s=t==="visit",o=t==="timeoff",l=o?{name:i.userName||i.userEmail||"-"}:i.requestedBy||{},r=i.approvedBy||{},c=i.rejectedBy||{};let d="";if(n){const y=i.medicationData||{};d=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062F\u0648\u0627\u0621:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0627\u0644\u0627\u0633\u0645:</strong> ${Utils.escapeHTML(y.name||"-")}</div>
                            <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(y.type||"-")}</div>
                            <div><strong>\u0627\u0644\u0643\u0645\u064A\u0629:</strong> ${Utils.escapeHTML(y.quantity||"-")}</div>
                            <div><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(y.location||"-")}</div>
                        </div>
                    </div>
                `}else if(s){const y=i.visitData||{},v=y.employeeName||y.contractorWorkerName||y.contractorName||y.externalName||"-",h=y.personType==="employee"?"\u0645\u0648\u0638\u0641":y.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",w=y.visitDate?Utils.formatDateTime(y.visitDate):"-",D=y.exitDate?Utils.formatDateTime(y.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647";d=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0627\u0644\u0627\u0633\u0645:</strong> ${Utils.escapeHTML(v)}</div>
                            <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(h)}</div>
                            <div><strong>\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:</strong> ${Utils.escapeHTML(w)}</div>
                            <div><strong>\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:</strong> ${Utils.escapeHTML(D)}</div>
                            <div><strong>\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:</strong> ${Utils.escapeHTML(y.reason||"-")}</div>
                            <div><strong>\u0627\u0644\u062A\u0634\u062E\u064A\u0635:</strong> ${Utils.escapeHTML(y.diagnosis||"-")}</div>
                        </div>
                        <div class="mt-3">
                            <button class="btn-secondary" onclick="Clinic.viewVisit('${Utils.escapeHTML(y.id||i.visitId||"")}')">
                                <i class="fas fa-eye ml-2"></i>\u0639\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                            </button>
                        </div>
                    </div>
                `}else if(o)d=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 ${Utils.escapeHTML(this.getTimeOffRequestTypeLabel(i.requestType))}:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0627\u0644\u0645\u0633\u0626\u0648\u0644:</strong> ${Utils.escapeHTML(i.userName||"-")}</div>
                            <div><strong>\u0627\u0644\u062F\u0648\u0631:</strong> ${Utils.escapeHTML(this.getStaffRoleLabel(i.staffRole))}</div>
                            <div><strong>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:</strong> ${Utils.escapeHTML(this.formatTimeOffRequestDetails(i))}</div>
                            <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> ${this.getTimeOffStatusBadge(i.status)}</div>
                            <div class="col-span-2"><strong>\u0627\u0644\u0633\u0628\u0628:</strong> ${Utils.escapeHTML(i.reason||"-")}</div>
                            ${i.reviewNotes?`<div class="col-span-2"><strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:</strong> ${Utils.escapeHTML(i.reviewNotes)}</div>`:""}
                        </div>
                    </div>
                `;else{const y={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[i.type]||i.type||"-",v={urgent:"\u0639\u0627\u062C\u0644\u0629",high:"\u0639\u0627\u0644\u064A\u0629",normal:"\u0639\u0627\u062F\u064A\u0629"}[i.priority]||"\u0639\u0627\u062F\u064A\u0629";d=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0637\u0644\u0628:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628:</strong> ${Utils.escapeHTML(y)}</div>
                            <div><strong>\u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631:</strong> ${Utils.escapeHTML(i.itemName||"-")}</div>
                            <div><strong>\u0627\u0644\u0643\u0645\u064A\u0629:</strong> ${i.quantity||"-"} ${Utils.escapeHTML(i.unit||"")}</div>
                            <div><strong>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:</strong> ${Utils.escapeHTML(v)}</div>
                            ${i.type==="medication"&&i.currentBalanceAtRequest!==null&&i.currentBalanceAtRequest!==void 0?`
                                <div style="padding:7px 9px;border-radius:8px;background:#f0fdfa;color:#134e4a;"><strong>\u0627\u0644\u0631\u0635\u064A\u062F \u0648\u0642\u062A \u0627\u0644\u0637\u0644\u0628:</strong> ${i.currentBalanceAtRequest} ${Utils.escapeHTML(i.unit||"\u0648\u062D\u062F\u0629")}</div>
                            `:""}
                            ${i.type==="medication"&&i.medicationExpiryDate?`<div><strong>\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629:</strong> ${this.formatDate(i.medicationExpiryDate)}</div>`:""}
                            ${i.notes?`
                                <div class="col-span-2"><strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong> ${Utils.escapeHTML(i.notes)}</div>
                            `:""}
                        </div>
                    </div>
                `}const p=n?"\u0637\u0644\u0628 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621":s?"\u0637\u0644\u0628 \u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629":o?`\u0637\u0644\u0628 ${this.getTimeOffRequestTypeLabel(i.requestType)}`:"\u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u0637\u0628\u064A\u0629",f=String(i.status||"pending").toLowerCase(),u={pending:"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",approved:"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629",rejected:"\u0645\u0631\u0641\u0648\u0636",fulfilled:"\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"}[f]||i.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",m=i.id||i.requestId||"-",g=document.createElement("div");g.className="modal-overlay",g.innerHTML=`
                <style>
                    .clinic-approval-detail{--cad-navy:#0b2d4f;--cad-teal:#0f8b83;--cad-ink:#20384a;--cad-muted:#6b7f8e;--cad-line:#dce8ed;--cad-soft:#f4f8fa;width:min(880px,94vw);max-width:880px;max-height:92vh;overflow:hidden;border:1px solid rgba(15,139,131,.2);border-radius:22px;background:#fff;box-shadow:0 28px 80px rgba(8,34,57,.28);font-family:"Tajawal","Noto Kufi Arabic",sans-serif}
                    .clinic-approval-detail .cad-header{position:relative;padding:24px 26px 22px;color:#fff;background:linear-gradient(128deg,#0b2d4f 0%,#124c68 62%,#0f8b83 100%);overflow:hidden}
                    .clinic-approval-detail .cad-header:after{content:"";position:absolute;inset:auto -42px -72px auto;width:190px;height:190px;border:26px solid rgba(255,255,255,.07);border-radius:50%}
                    .clinic-approval-detail .cad-head-main{position:relative;z-index:1;display:flex;align-items:flex-start;justify-content:space-between;gap:18px}
                    .clinic-approval-detail .cad-title-wrap{display:flex;align-items:center;gap:14px;min-width:0}
                    .clinic-approval-detail .cad-title-icon{flex:0 0 48px;width:48px;height:48px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.24);border-radius:14px;background:rgba(255,255,255,.12);font-size:21px}
                    .clinic-approval-detail .cad-eyebrow{margin:0 0 4px;color:#9de7df;font-size:.69rem;font-weight:800;letter-spacing:.04em}
                    .clinic-approval-detail .cad-title{margin:0;color:#fff;font-size:clamp(1.05rem,2vw,1.35rem);font-weight:850;line-height:1.35}
                    .clinic-approval-detail .cad-subtitle{margin:5px 0 0;color:rgba(255,255,255,.72);font-size:.72rem}
                    .clinic-approval-detail .cad-close{position:relative;z-index:2;flex:0 0 38px;width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.24);border-radius:11px;background:rgba(255,255,255,.1);color:#fff;cursor:pointer;transition:.18s ease}
                    .clinic-approval-detail .cad-close:hover{background:#fff;color:var(--cad-navy);transform:rotate(6deg)}
                    .clinic-approval-detail .cad-meta{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
                    .clinic-approval-detail .cad-chip{display:inline-flex;align-items:center;gap:7px;padding:6px 10px;border:1px solid rgba(255,255,255,.2);border-radius:999px;background:rgba(255,255,255,.1);color:#fff;font-size:.69rem;font-weight:750}
                    .clinic-approval-detail .cad-status--pending{background:#fff4cf;color:#7a4a00;border-color:#ffe29a}.clinic-approval-detail .cad-status--approved{background:#dff8eb;color:#14643b;border-color:#bcebd2}.clinic-approval-detail .cad-status--rejected{background:#ffe5e5;color:#9b2323;border-color:#ffc7c7}.clinic-approval-detail .cad-status--fulfilled{background:#dff5fa;color:#0a6073;border-color:#b8e4ed}
                    .clinic-approval-detail .cad-body{max-height:calc(92vh - 196px);padding:20px 22px;overflow:auto;background:linear-gradient(180deg,#f7fafb 0%,#fff 100%)}
                    .clinic-approval-detail .cad-card{margin-bottom:14px;padding:17px;border:1px solid var(--cad-line);border-radius:15px;background:#fff;box-shadow:0 5px 18px rgba(11,45,79,.055)}
                    .clinic-approval-detail .cad-card-title,.clinic-approval-detail .cad-item h3{display:flex;align-items:center;gap:8px;margin:0 0 13px;color:var(--cad-navy);font-size:.86rem;font-weight:850}
                    .clinic-approval-detail .cad-card-title i{width:30px;height:30px;display:grid;place-items:center;border-radius:9px;background:#e1f4f1;color:var(--cad-teal);font-size:.75rem}
                    .clinic-approval-detail .cad-item>div{margin-bottom:14px;padding:17px;border:1px solid var(--cad-line);border-radius:15px;background:#fff;box-shadow:0 5px 18px rgba(11,45,79,.055)}
                    .clinic-approval-detail .cad-item h3:before{content:"\\f46d";font-family:"Font Awesome 6 Free","Font Awesome 5 Free";font-weight:900;width:30px;height:30px;display:grid;place-items:center;border-radius:9px;background:#e1f4f1;color:var(--cad-teal);font-size:.75rem}
                    .clinic-approval-detail .cad-item .grid,.clinic-approval-detail .cad-data-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
                    .clinic-approval-detail .cad-item .grid>div,.clinic-approval-detail .cad-data{min-width:0;padding:11px 12px;border:1px solid #e6eef2;border-radius:11px;background:var(--cad-soft);color:var(--cad-ink);font-size:.78rem;line-height:1.65;overflow-wrap:anywhere}
                    .clinic-approval-detail .cad-item strong,.clinic-approval-detail .cad-data strong{display:block;margin-bottom:3px;color:var(--cad-muted);font-size:.66rem;font-weight:800}
                    .clinic-approval-detail .cad-item .col-span-2,.clinic-approval-detail .cad-data--wide{grid-column:1/-1}
                    .clinic-approval-detail .cad-item .btn-secondary{display:inline-flex;align-items:center;gap:6px;margin-top:4px;border-color:#b9d8d5;color:var(--cad-teal);font-weight:800}
                    .clinic-approval-detail .cad-decision{border-inline-start:4px solid var(--cad-teal)}
                    .clinic-approval-detail .cad-decision--rejected{border-inline-start-color:#cf3f3f}
                    .clinic-approval-detail .cad-pending{display:flex;align-items:center;gap:10px;padding:12px;border-radius:11px;background:#fff8df;color:#76520b;font-size:.75rem}
                    .clinic-approval-detail .cad-pending i{font-size:1rem}
                    .clinic-approval-detail .cad-footer{display:flex;justify-content:center;padding:13px 20px;border-top:1px solid var(--cad-line);background:#f8fbfc}
                    .clinic-approval-detail .cad-footer button{min-width:130px;padding:9px 18px;border:1px solid #c9d9df;border-radius:10px;background:#fff;color:var(--cad-ink);font-weight:800;cursor:pointer;box-shadow:0 3px 10px rgba(11,45,79,.07)}
                    [data-theme="dark"] .clinic-approval-detail{--cad-ink:#dce9ee;--cad-muted:#9fb2bd;--cad-line:#29444f;--cad-soft:#18323c;background:#112832}.clinic-approval-detail .cad-close:focus-visible,.clinic-approval-detail button:focus-visible{outline:3px solid rgba(20,184,166,.35);outline-offset:2px}
                    [data-theme="dark"] .clinic-approval-detail .cad-body,[data-theme="dark"] .clinic-approval-detail .cad-footer{background:#10262f}[data-theme="dark"] .clinic-approval-detail .cad-card,[data-theme="dark"] .clinic-approval-detail .cad-item>div{background:#17313b}
                    @media(max-width:640px){.clinic-approval-detail{width:96vw;max-height:95vh;border-radius:16px}.clinic-approval-detail .cad-header{padding:18px 16px}.clinic-approval-detail .cad-title-icon{width:42px;height:42px}.clinic-approval-detail .cad-body{max-height:calc(95vh - 184px);padding:13px}.clinic-approval-detail .cad-item .grid,.clinic-approval-detail .cad-data-grid{grid-template-columns:1fr}.clinic-approval-detail .cad-item .col-span-2,.clinic-approval-detail .cad-data--wide{grid-column:auto}}
                    @media(prefers-reduced-motion:reduce){.clinic-approval-detail .cad-close{transition:none}.clinic-approval-detail .cad-close:hover{transform:none}}
                </style>
                <div class="modal-content clinic-approval-detail" role="dialog" aria-modal="true" aria-labelledby="clinic-approval-detail-title">
                    <header class="cad-header">
                        <div class="cad-head-main">
                            <div class="cad-title-wrap">
                                <span class="cad-title-icon"><i class="fas fa-file-medical-alt"></i></span>
                                <div><p class="cad-eyebrow">\u0633\u062C\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0628\u064A</p><h2 id="clinic-approval-detail-title" class="cad-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629</h2><p class="cad-subtitle">${Utils.escapeHTML(p)} \xB7 \u0631\u0642\u0645 ${Utils.escapeHTML(String(m))}</p></div>
                            </div>
                            <button class="cad-close modal-close" type="button" aria-label="\u0625\u063A\u0644\u0627\u0642"><i class="fas fa-times"></i></button>
                        </div>
                        <div class="cad-meta"><span class="cad-chip cad-status--${Utils.escapeHTML(f)}"><i class="fas fa-circle-check"></i>${Utils.escapeHTML(u)}</span><span class="cad-chip"><i class="far fa-calendar-alt"></i>${Utils.escapeHTML(this.formatDate(i.createdAt||i.requestDate,!0))}</span></div>
                    </header>
                    <div class="modal-body cad-body">
                        <div class="cad-item">${d}</div>
                        <section class="cad-card"><h3 class="cad-card-title"><i class="fas fa-user-circle"></i>\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628</h3><div class="cad-data-grid"><div class="cad-data"><strong>\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628</strong>${Utils.escapeHTML(l.name||"-")}</div><div class="cad-data"><strong>\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</strong>${Utils.escapeHTML(l.email||i.userEmail||"-")}</div><div class="cad-data"><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628</strong>${Utils.escapeHTML(this.formatDate(i.createdAt||i.requestDate,!0))}</div><div class="cad-data"><strong>\u0645\u0631\u062C\u0639 \u0627\u0644\u0637\u0644\u0628</strong>${Utils.escapeHTML(String(m))}</div></div></section>
                        ${i.status==="approved"?`<section class="cad-card cad-decision"><h3 class="cad-card-title"><i class="fas fa-user-check"></i>\u0642\u0631\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629</h3><div class="cad-data-grid"><div class="cad-data"><strong>\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0628\u0648\u0627\u0633\u0637\u0629</strong>${Utils.escapeHTML(r.name||"-")}</div><div class="cad-data"><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629</strong>${Utils.escapeHTML(this.formatDate(i.approvedAt,!0))}</div></div></section>`:""}
                        ${i.status==="rejected"?`<section class="cad-card cad-decision cad-decision--rejected"><h3 class="cad-card-title"><i class="fas fa-user-times"></i>\u0642\u0631\u0627\u0631 \u0627\u0644\u0631\u0641\u0636</h3><div class="cad-data-grid"><div class="cad-data"><strong>\u062A\u0645 \u0627\u0644\u0631\u0641\u0636 \u0628\u0648\u0627\u0633\u0637\u0629</strong>${Utils.escapeHTML(c.name||"-")}</div><div class="cad-data"><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0631\u0641\u0636</strong>${Utils.escapeHTML(this.formatDate(i.rejectedAt,!0))}</div>${i.rejectionReason?`<div class="cad-data cad-data--wide"><strong>\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636</strong>${Utils.escapeHTML(i.rejectionReason)}</div>`:""}</div></section>`:""}
                        ${i.status!=="approved"&&i.status!=="rejected"?'<div class="cad-pending"><i class="fas fa-hourglass-half"></i><span>\u0627\u0644\u0637\u0644\u0628 \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0644\u0645 \u064A\u0635\u062F\u0631 \u0642\u0631\u0627\u0631 \u0646\u0647\u0627\u0626\u064A \u0628\u0639\u062F.</span></div>':""}
                    </div>
                    <div class="modal-footer cad-footer">
                        <button class="modal-close-btn" type="button"><i class="fas fa-times ml-2"></i>\u0625\u063A\u0644\u0627\u0642</button>
                    </div>
                </div>
            `,document.body.appendChild(g),g.querySelectorAll(".modal-close, .modal-close-btn").forEach(y=>{y.addEventListener("click",()=>g.remove())}),g.addEventListener("click",y=>{y.target===g&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&g.remove()})}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628:",a),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}},refreshOnLanguageChange(){if(this.state&&this.state.initialized)try{this.renderActiveTabContent()}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u0639\u0631\u0636 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0644\u063A\u0629:",e)}},async load(){typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629...");const e=document.getElementById("clinic-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u0642\u0633\u0645 clinic-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629");return}if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C AppState \u063A\u064A\u0631 \u0645\u0639\u0631\u0651\u0641 - \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"),e.innerHTML='<div class="content-card"><div class="card-body"><p class="text-red-600">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p></div></div>';return}if(AppState.appData||(AppState.appData={}),typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{Permissions.ensureFormSettingsState().catch(()=>{})}catch{}this.injectTableScrollbarStyles(),this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.refreshOnLanguageChange()}),window.addEventListener("storage",t=>{t.key==="language"&&t.newValue!==t.oldValue&&this.refreshOnLanguageChange()}),this._languageChangeListenerAdded=!0),this._syncCompletedListenerAdded||(window.addEventListener("syncDataCompleted",t=>{const{sheets:a}=t.detail||{};a&&(a.includes("ClinicVisits")||a.includes("ClinicContractorVisits")||a.includes("clinicVisits"))&&(this.ensureData(),this.state&&this.state.activeTab==="visits"&&(this.scheduleVisitsTabRender(!1,0),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629")))}),this._syncCompletedListenerAdded=!0);try{this.ensureData();const t=localStorage.getItem("clinic_last_sync"),a=t?Date.now()-parseInt(t):1/0,i=600*1e3,n=this.hasValidLocalData(),s=!this.state.initialized;this.renderUI(),this._userNeedsClinicStaffForAttendance()&&!this.isActiveClinicStaffMember()&&this._ensureClinicStaffLoadedForAttendance().then(l=>{l&&this._refreshAttendanceTabNavAfterStaffLoad()}).catch(()=>{}),this.isCurrentUserAdmin()&&this.prefetchClinicAttendanceForAdminIfNeeded(!1).catch(()=>{}),s||!n||a>=i?(Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629)..."),Utils.promiseWithTimeout(this.syncDataFromServer(),13e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A").then(()=>{if(localStorage.setItem("clinic_last_sync",Date.now().toString()),this.ensureData(),this.renderUI(),this.state&&this.state.activeTab==="visits"&&this.scheduleVisitsTabRender(!1,0),this.state?.activeTab==="attendance"&&this.canAccessAttendanceTab()&&this.scheduleAttendanceTabRender(0),typeof Utils<"u"&&Utils.safeLog&&AppState.appData){const l=(AppState.appData.clinicVisits||[]).length,r=(AppState.appData.clinicMedications||AppState.appData.medications||[]).length;Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0628\u0646\u062C\u0627\u062D: ${l} \u0632\u064A\u0627\u0631\u0629\u060C ${r} \u062F\u0648\u0627\u0621`)}}).catch(l=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u0639\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",l&&l.message)}).finally(()=>{this.state.initialized=!0})):(Utils.safeLog("\u2705 \u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u062D\u0644\u064A\u0627\u064B - \u062A\u062D\u062F\u064A\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629"),this.syncDataInBackground(),this.state.initialized=!0)}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",t),this.hasValidLocalData()&&(this.renderUI(),Utils.safeLog("\u2705 \u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0631\u063A\u0645 \u0648\u062C\u0648\u062F \u062E\u0637\u0623")),this.state.initialized||Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629")}finally{Loading.hide()}},hasValidLocalData(){const e=AppState.appData;if(!e)return!1;const t=e.medications||e.clinicMedications||[],a=e.sickLeave||[],i=e.injuries||[],n=e.clinicVisits||[];return t.length>0||a.length>0||i.length>0||n.length>0},async syncDataFromServer(){const e=[],i=(n,s,o)=>Utils.promiseWithTimeout(n,s,()=>new Error(`Request timeout for ${o}`));e.push(i(GoogleIntegration.sendRequest({action:"getAllMedications",data:{}}),45e3,"medications").then(n=>{if(n&&n.success&&Array.isArray(n.data)){const s=n.data.map(o=>this.normalizeMedicationRecord(o));AppState.appData.medications=s,AppState.appData.clinicMedications=s,AppState.appData.clinicInventory=s,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${n.data.length} \u062F\u0648\u0627\u0621`)}}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",n.message)})),e.push(i(GoogleIntegration.sendRequest({action:"getAllSickLeaves",data:{}}),45e3,"sickLeave").then(n=>{n&&n.success&&Array.isArray(n.data)&&(AppState.appData.sickLeave=n.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${n.data.length} \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629`))}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",n.message)})),e.push(i(GoogleIntegration.sendRequest({action:"getAllInjuries",data:{}}),45e3,"injuries").then(n=>{n&&n.success&&Array.isArray(n.data)&&(AppState.appData.injuries=n.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${n.data.length} \u0625\u0635\u0627\u0628\u0629`))}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A:",n.message)})),this.shouldFetchClinicVisitsFromBackend()?e.push(i(this.loadVisitsDataFromBackend(),12e4,"clinicVisits").then(()=>{const n=AppState.appData.clinicVisits||[];Utils.safeLog(`\u2705 \u0645\u0632\u0627\u0645\u0646\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F: ${n.length} \u0632\u064A\u0627\u0631\u0629 (${n.filter(s=>s.personType==="employee"||!s.personType).length} \u0645\u0648\u0638\u0641\u060C ${n.filter(s=>s.personType==="contractor").length} \u0645\u0642\u0627\u0648\u0644)`)}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",n.message)})):AppState.debugMode&&Utils.safeLog("\u2139\uFE0F \u062A\u062E\u0637\u064A \u062C\u0644\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u2014 \u0628\u064A\u0627\u0646\u0627\u062A \u062D\u062F\u064A\u062B\u0629 \u0648\u0645\u0624\u0643\u062F\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645");try{await Promise.allSettled(e)}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",n.message)}if(typeof window.DataManager<"u"&&window.DataManager.save)try{this.ensureData(),window.DataManager.save(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0628\u0639\u062F syncDataFromServer")}catch(n){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",n.message)}},async syncDataInBackground(){try{Utils.safeLog("\u{1F504} \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629..."),await Utils.promiseWithTimeout(this.syncDataFromServer(),13e4,()=>new Error("Background sync timeout")),localStorage.setItem("clinic_last_sync",Date.now().toString()),this.ensureData(),this.hasValidLocalData()&&(this.renderUI(),this.state&&this.state.activeTab==="visits"&&this.scheduleVisitsTabRender(!1,0),this.state&&this.state.activeTab==="attendance"&&this.renderAttendanceTab(),Utils.safeLog("\u2705 \u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629"))}catch(e){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",e.message),Utils.safeLog("\u2139\uFE0F \u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629")}},async refresh(){Utils.safeLog("\u{1F504} \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629..."),Notification?.info?.("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A..."),await this.load(),Notification?.success?.("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},getClinicStaffList(){return this.ensureData(),Array.isArray(AppState.appData.clinicStaff)?AppState.appData.clinicStaff:[]},getClinicStaffAttendanceList(){this.ensureData();let e=Array.isArray(AppState.appData.clinicStaffAttendance)?AppState.appData.clinicStaffAttendance:[];return e=this._mergeAttendanceRowsByUserDay(e),this.canViewAllAttendanceData()||(e=e.filter(t=>this._attendanceRowBelongsToCurrentUser_(t))),e},getClinicStaffTimeOffRequestsList(){this.ensureData();let e=Array.isArray(AppState.appData.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[];if(!this.canViewAllAttendanceData()){const t=AppState.currentUser,a=String(t?.id||"").trim(),i=String(t?.email||"").trim().toLowerCase();e=e.filter(n=>a&&String(n.userId||"")===a||i&&String(n.userEmail||"").trim().toLowerCase()===i)}return e},getClinicStaffSystemActivitiesList(){return this.ensureData(),Array.isArray(AppState.appData.clinicStaffSystemActivities)?AppState.appData.clinicStaffSystemActivities:[]},getFilteredClinicStaffActivities(){let e=this.getClinicStaffSystemActivitiesList().slice();const t=this.state.filters?.attendance||{},a=this._resolveAttendanceFilterDates(t);if(a.dateFrom&&(e=e.filter(i=>i.timestamp&&this._attendanceDayKey(i.timestamp)>=a.dateFrom)),a.dateTo&&(e=e.filter(i=>i.timestamp&&this._attendanceDayKey(i.timestamp)<=a.dateTo)),t.activityModule&&t.activityModule!=="all"&&(e=e.filter(i=>String(i.moduleKey)===String(t.activityModule))),this.canViewAllAttendanceData()&&t.staffId&&t.staffId!=="all"){const i=(this.getClinicStaffList()||[]).find(n=>String(n.id)===String(t.staffId));if(i){const n=String(i.userId||"").trim(),s=String(i.userEmail||"").trim().toLowerCase(),o=String(i.userName||"").trim().toLowerCase();e=e.filter(l=>n&&String(l.userId||"")===n||s&&String(l.userEmail||"").trim().toLowerCase()===s||o&&String(l.userName||"").trim().toLowerCase()===o)}}return e.sort((i,n)=>new Date(n.timestamp||0)-new Date(i.timestamp||0))},getClinicStaffActivityModuleIcon(e){return{ptw:"fa-id-card",clinic:"fa-clinic-medical",training:"fa-chalkboard-teacher",incidents:"fa-exclamation-triangle",nearmiss:"fa-exclamation-circle",observations:"fa-eye",violations:"fa-gavel",system:"fa-cogs"}[String(e||"").trim()]||"fa-circle"},renderClinicStaffActivitiesSection({showUserColumn:e=!1,activities:t=[],loading:a=!1,title:i="\u0646\u0634\u0627\u0637\u064A \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645"}={}){const n=[{value:"all",label:"\u0643\u0644 \u0627\u0644\u0623\u0646\u0634\u0637\u0629"},{value:"ptw",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"},{value:"clinic",label:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629"},{value:"training",label:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{value:"incidents",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B"},{value:"nearmiss",label:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643"},{value:"observations",label:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"},{value:"violations",label:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"},{value:"system",label:"\u0627\u0644\u0646\u0638\u0627\u0645"}],s=this.state.filters?.attendance?.activityModule||"all",o=a?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0634\u0627\u0637...":this._clinicStaffActivitiesFetched?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0634\u0637\u0629 \u0645\u0633\u062C\u0651\u0644\u0629 \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629":'\u0627\u0636\u063A\u0637 \u0632\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062B <i class="fas fa-sync-alt"></i> \u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0634\u0627\u0637 (\u0644\u0627 \u064A\u064F\u062D\u0645\u0651\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0641\u0627\u0638\u0627\u064B \u0639\u0644\u0649 \u0633\u0631\u0639\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F)',l=t.length?t.map(r=>`
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
                    <h4 class="card-title" style="margin:0;"><i class="fas fa-history ml-2"></i>${Utils.escapeHTML(i)} (${t.length})</h4>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                        <select id="clinic-activity-module-filter" class="form-input" style="min-width:160px;padding:6px 10px;font-size:0.82rem;">
                            ${n.map(r=>`<option value="${Utils.escapeAttr(r.value)}" ${s===r.value?"selected":""}>${Utils.escapeHTML(r.label)}</option>`).join("")}
                        </select>
                        <button type="button" id="clinic-activity-refresh-btn" class="btn-secondary btn-sm" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0634\u0627\u0637"><i class="fas fa-sync-alt"></i></button>
                    </div>
                </div>
                <div class="card-body" style="padding:0;">
                    <p style="padding:10px 16px;margin:0;font-size:0.78rem;color:#64748b;border-bottom:1px solid #f1f5f9;">
                        <i class="fas fa-info-circle ml-1" style="color:#0d9488;"></i>
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
            </div>`},bindClinicStaffActivitiesEvents(e){e&&(e.querySelector("#clinic-activity-module-filter")?.addEventListener("change",t=>{this.state.filters=this.state.filters||{},this.state.filters.attendance=Object.assign({},this.state.filters.attendance||{},{activityModule:t.target.value||"all"}),this.renderAttendanceTab({force:!0})}),e.querySelector("#clinic-activity-refresh-btn")?.addEventListener("click",async()=>{Notification?.info?.("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0634\u0627\u0637..."),await this.loadClinicStaffActivities(!0),this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0634\u0627\u0637")}))},_parseActivityCreatorFromRecord_(e){if(!e)return{userId:"",email:"",name:""};let t=String(e.createdById||e.userId||"").trim(),a=String(e.userEmail||"").trim().toLowerCase(),i=String(e.userName||"").trim();const n=e.createdBy;return n&&typeof n=="object"?(t=t||String(n.id||n.userId||"").trim(),i=i||String(n.name||n.displayName||"").trim(),a=a||String(n.email||"").trim().toLowerCase()):n&&(i=i||String(n).trim()),{userId:t,email:a,name:i}},_activityCreatorMatchesUser_(e,t){if(!e||!t)return!1;const a=String(t.id||"").trim(),i=String(t.email||"").trim().toLowerCase(),n=String(t.name||"").trim().toLowerCase();return!!(a&&e.userId&&a===e.userId||i&&e.email&&i===e.email||n&&e.name&&n===String(e.name).trim().toLowerCase())},_activityCreatorMatchesStaff_(e,t){if(!e||!t)return!1;const a=String(t.userId||"").trim(),i=String(t.userEmail||"").trim().toLowerCase(),n=String(t.userName||"").trim().toLowerCase();return!!(a&&e.userId&&a===e.userId||i&&e.email&&i===e.email||n&&e.name&&n===String(e.name).trim().toLowerCase())},_buildLocalClinicVisitActivities_(e){e=e||{};const t=Array.isArray(AppState.appData?.clinicVisits)?AppState.appData.clinicVisits:[],a=AppState.currentUser,i=this.canViewAllAttendanceData();let n=null;i&&e.staffId&&(n=(this.getClinicStaffList()||[]).find(r=>String(r.id)===String(e.staffId))||null);const s=e.dateFrom?this._attendanceDayKey(e.dateFrom):null,o=e.dateTo?this._attendanceDayKey(e.dateTo):null,l=e.moduleKey||"all";return l!=="all"&&l!=="clinic"?[]:t.filter(r=>{if(!r)return!1;const c=this._parseActivityCreatorFromRecord_(r);if(i){if(n&&!this._activityCreatorMatchesStaff_(c,n))return!1}else if(!this._activityCreatorMatchesUser_(c,a))return!1;const d=r.createdAt||r.visitDate||"";if(d){const p=this._attendanceDayKey(d);if(s&&p<s||o&&p>o)return!1}else if(s||o)return!1;return!0}).map(r=>{const c=r.personType==="contractor"||r.contractorName||r.contractorWorkerName||r.externalName,d=this._parseActivityCreatorFromRecord_(r),p=c?String(r.contractorWorkerName||r.externalName||r.contractorName||r.visitType||r.id||"").slice(0,120):String(r.employeeName||r.visitType||r.reason||r.id||"").slice(0,120);return{id:"local-visit-"+r.id,recordId:r.id||"",moduleKey:"clinic",moduleLabel:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629",actionLabel:c?"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u0645\u0648\u0638\u0641",summary:p,timestamp:r.createdAt||r.visitDate||"",userId:d.userId||"",userEmail:d.email||"",userName:d.name||this.getUserDisplayName(r.createdBy)||"",sheet:"ClinicVisits-local"}})},_mergeClinicStaffActivities_(e){const t=new Map;return(e||[]).flat().forEach(a=>{!a||!a.id||t.has(a.id)||t.set(a.id,a)}),Array.from(t.values()).sort((a,i)=>new Date(i.timestamp||0)-new Date(a.timestamp||0))},_userNeedsClinicStaffForAttendance(){return this.isCurrentUserAdmin()||typeof Permissions>"u"||typeof Permissions.hasDetailedPermission!="function"?!1:Permissions.hasDetailedPermission("clinic","attendance")},async _ensureClinicStaffLoadedForAttendance(){return this._clinicStaffPreloadPromise?this._clinicStaffPreloadPromise:(this._clinicStaffPreloadPromise=(async()=>{try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return!1;const e=await GoogleIntegration.sendRequest({action:"getAllClinicStaff",data:{}});if(e?.success&&Array.isArray(e.data)&&(AppState.appData.clinicStaff=e.data,this.ensureData(),typeof window.DataManager<"u"&&window.DataManager.save))try{window.DataManager.save()}catch{}return this.canAccessAttendanceTab()}catch{return!1}finally{this._clinicStaffPreloadPromise=null}})(),this._clinicStaffPreloadPromise)},_refreshAttendanceTabNavAfterStaffLoad(){const e=document.getElementById("clinic-section");if(!e||!this.canAccessAttendanceTab())return;if(!e.querySelector('.clinic-tab-btn[data-tab="attendance"]')){this.renderUI();return}this.state?.activeTab==="attendance"&&this.scheduleAttendanceTabRender(0)},_getDefaultTimeOffFormDraft(){return{requestType:"",reason:"",dateFrom:"",dateTo:"",permDate:"",otDate:"",timeFrom:"",timeTo:"",durationHours:""}},_saveTimeOffFormDraftFromDom(){this.state||(this.state={}),document.getElementById("timeoff-request-form")&&(this.state.timeOffFormDraft={requestType:document.getElementById("timeoff-request-type")?.value||"",reason:document.getElementById("timeoff-reason")?.value||"",dateFrom:document.getElementById("timeoff-date-from")?.value||"",dateTo:document.getElementById("timeoff-date-to")?.value||"",permDate:document.getElementById("timeoff-perm-date")?.value||"",otDate:document.getElementById("timeoff-ot-date")?.value||"",timeFrom:document.getElementById("timeoff-time-from")?.value||"",timeTo:document.getElementById("timeoff-time-to")?.value||"",durationHours:document.getElementById("timeoff-duration-hours")?.value||""})},_applyTimeOffFormDraftToPanel(e){const t=this.state?.timeOffFormDraft;if(!t||!e)return;const a=(i,n)=>{const s=e.querySelector("#"+i);s&&n!=null&&n!==""&&(s.value=n)};a("timeoff-request-type",t.requestType),a("timeoff-reason",t.reason),a("timeoff-date-from",t.dateFrom),a("timeoff-date-to",t.dateTo),a("timeoff-perm-date",t.permDate),a("timeoff-ot-date",t.otDate),a("timeoff-time-from",t.timeFrom),a("timeoff-time-to",t.timeTo),a("timeoff-duration-hours",t.durationHours)},_isTimeOffFormDraftDirty(){const e=this.state?.timeOffFormDraft;return e?!!(e.requestType||String(e.reason||"").trim()||e.dateFrom||e.dateTo||e.permDate||e.otDate||e.timeFrom||e.timeTo||e.durationHours):!1},_shouldDeferAttendanceRender(){return this._timeOffFormSubmitting||this._timeOffFormFocused?!0:this._isTimeOffFormDraftDirty()},_flushDeferredAttendanceRender(){!this._attendanceRenderPending||this.state?.activeTab!=="attendance"||this._shouldDeferAttendanceRender()||(this._attendanceRenderPending=!1,this.renderAttendanceTab({force:!0}))},_bindTimeOffFormPanelEvents(e){const t=e.querySelector("#timeoff-request-form");if(!t)return;const a=e.querySelector("#timeoff-request-type"),i=e.querySelector("#timeoff-leave-dates"),n=e.querySelector("#timeoff-permission-fields"),s=e.querySelector("#timeoff-overtime-fields"),o=()=>{const r=a?.value||"";i?.classList.toggle("hidden",r!=="leave"),n?.classList.toggle("hidden",r!=="permission"),s?.classList.toggle("hidden",r!=="overtime"),["timeoff-date-from","timeoff-date-to"].forEach(c=>{const d=e.querySelector("#"+c);d&&(d.required=r==="leave")}),["timeoff-perm-date","timeoff-time-from","timeoff-time-to"].forEach(c=>{const d=e.querySelector("#"+c);d&&(d.required=r==="permission")}),["timeoff-ot-date","timeoff-duration-hours"].forEach(c=>{const d=e.querySelector("#"+c);d&&(d.required=r==="overtime")})},l=()=>this._saveTimeOffFormDraftFromDom();a?.addEventListener("change",()=>{o(),l()}),t.querySelectorAll("input, textarea, select").forEach(r=>{r.addEventListener("input",l),r.addEventListener("change",l)}),t.addEventListener("focusin",()=>{this._timeOffFormFocused=!0}),t.addEventListener("focusout",()=>{setTimeout(()=>{t.contains(document.activeElement)||(this._timeOffFormFocused=!1,this._flushDeferredAttendanceRender())},120)}),o(),t.addEventListener("submit",async r=>{r.preventDefault(),await this.submitTimeOffRequest()&&typeof e._closeClinicTimeOffRequestModal=="function"&&e._closeClinicTimeOffRequestModal(!0)})},showTimeOffRequestForm(){document.getElementById("clinic-timeoff-request-modal")?.remove();const e=document.createElement("div");e.id="clinic-timeoff-request-modal",e.className="modal-overlay",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-labelledby","clinic-timeoff-modal-title"),e.dir="rtl",e.innerHTML=`
            ${this.getClinicWorkflowStyles_()}
            <div class="modal-content clinic-workflow-root" style="max-width:780px;border-radius:17px;overflow:hidden;box-shadow:0 24px 70px rgba(6,31,55,.3);">
                <div class="modal-header" style="padding:17px 20px;background:linear-gradient(128deg,#0b2d4f,#174d78 66%,#17726e);color:#fff;border:0;">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <span style="width:43px;height:43px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.25);border-radius:12px;background:rgba(255,255,255,.13);"><i class="fas fa-user-clock" style="font-size:18px;"></i></span>
                        <div>
                            <h3 id="clinic-timeoff-modal-title" class="modal-title" style="margin:0;color:#fff;font-size:1.08rem;">\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0636\u0648\u0631 \u062C\u062F\u064A\u062F</h3>
                            <p style="margin:3px 0 0;color:#d9ebf3;font-size:.72rem;">\u0625\u062C\u0627\u0632\u0629 \u0623\u0648 \u0625\u0630\u0646 \u0623\u0648 \u0639\u0645\u0644 \u0625\u0636\u0627\u0641\u064A \u0639\u0628\u0631 \u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629</p>
                        </div>
                    </div>
                    <button type="button" class="clinic-timeoff-modal-close" aria-label="\u0625\u063A\u0644\u0627\u0642" style="width:36px;height:36px;border:1px solid rgba(255,255,255,.25);border-radius:10px;background:rgba(255,255,255,.1);color:#fff;cursor:pointer;"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" style="padding:18px 20px 20px;max-height:76vh;overflow-y:auto;background:#f6fafc;">
                    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:10px 12px;margin-bottom:14px;border:1px solid #bae6fd;border-radius:10px;background:#f0f9ff;color:#0c4a6e;font-size:.74rem;">
                        <span><i class="fas fa-user"></i>${Utils.escapeHTML(AppState.currentUser?.name||"\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0639\u064A\u0627\u062F\u0629")}</span>
                        <span><i class="fas fa-shield-check"></i>\u064A\u0631\u0633\u0644 \u0627\u0644\u0637\u0644\u0628 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629</span>
                    </div>
                    <form id="timeoff-request-form" class="cw-form">
                        <div class="cw-form-grid">
                            <div class="cw-field cw-field-full">
                                <label class="cw-field-title" for="timeoff-request-type"><i class="fas fa-list-check"></i>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628 *</label>
                                <select id="timeoff-request-type" class="cw-control" required>
                                    <option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</option>
                                    <option value="leave">\u0625\u062C\u0627\u0632\u0629</option>
                                    <option value="permission">\u0625\u0630\u0646</option>
                                    <option value="overtime">\u0639\u0645\u0644 \u0625\u0636\u0627\u0641\u064A</option>
                                </select>
                            </div>
                            <div id="timeoff-leave-dates" class="hidden cw-field-full cw-form-grid">
                                <div class="cw-field"><label class="cw-field-title" for="timeoff-date-from"><i class="fas fa-calendar-day"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-date-from" class="cw-control"></div>
                                <div class="cw-field"><label class="cw-field-title" for="timeoff-date-to"><i class="fas fa-calendar-check"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-date-to" class="cw-control"></div>
                            </div>
                            <div id="timeoff-permission-fields" class="hidden cw-field-full cw-form-grid">
                                <div class="cw-field"><label class="cw-field-title" for="timeoff-perm-date"><i class="fas fa-calendar-day"></i>\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-perm-date" class="cw-control"></div>
                                <div class="cw-field"><label class="cw-field-title" for="timeoff-time-from"><i class="fas fa-clock"></i>\u0645\u0646 \u0648\u0642\u062A *</label><input type="time" id="timeoff-time-from" class="cw-control"></div>
                                <div class="cw-field"><label class="cw-field-title" for="timeoff-time-to"><i class="fas fa-clock"></i>\u0625\u0644\u0649 \u0648\u0642\u062A *</label><input type="time" id="timeoff-time-to" class="cw-control"></div>
                            </div>
                            <div id="timeoff-overtime-fields" class="hidden cw-field-full cw-form-grid">
                                <div class="cw-field"><label class="cw-field-title" for="timeoff-ot-date"><i class="fas fa-calendar-day"></i>\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-ot-date" class="cw-control"></div>
                                <div class="cw-field"><label class="cw-field-title" for="timeoff-duration-hours"><i class="fas fa-hourglass-half"></i>\u0639\u062F\u062F \u0627\u0644\u0633\u0627\u0639\u0627\u062A *</label><input type="number" id="timeoff-duration-hours" class="cw-control" min="0.5" step="0.5" placeholder="\u0645\u062B\u0627\u0644: 2"></div>
                            </div>
                            <div class="cw-field cw-field-full">
                                <label class="cw-field-title" for="timeoff-reason"><i class="fas fa-pen-to-square"></i>\u0633\u0628\u0628 \u0627\u0644\u0637\u0644\u0628 *</label>
                                <textarea id="timeoff-reason" class="cw-control" rows="4" required placeholder="\u0627\u0643\u062A\u0628 \u0633\u0628\u0628 \u0627\u0644\u0637\u0644\u0628 \u0628\u0648\u0636\u0648\u062D..."></textarea>
                            </div>
                        </div>
                        <div class="cw-form-actions">
                            <button type="button" class="cw-secondary clinic-timeoff-modal-close"><i class="fas fa-times"></i>\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="cw-submit"><i class="fas fa-paper-plane"></i>\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629</button>
                        </div>
                    </form>
                </div>
            </div>`,document.body.appendChild(e),this.applyModuleI18n(e),this._applyTimeOffFormDraftToPanel(e),this._bindTimeOffFormPanelEvents(e);const t=i=>{i.key==="Escape"&&a()},a=(i=!1)=>{this._timeOffFormSubmitting&&!i||(this._saveTimeOffFormDraftFromDom(),!(!i&&this._isTimeOffFormDraftDirty()&&!confirm("\u064A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u0631\u0633\u0644\u0629. \u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C\u061F"))&&(document.removeEventListener("keydown",t),this._timeOffFormFocused=!1,e.remove()))};e._closeClinicTimeOffRequestModal=a,e.querySelectorAll(".clinic-timeoff-modal-close").forEach(i=>i.addEventListener("click",()=>a())),e.addEventListener("click",i=>{i.target===e&&a()}),document.addEventListener("keydown",t),setTimeout(()=>e.querySelector("#timeoff-request-type")?.focus(),50)},_scheduleAttendanceDataLoadIfNeeded(e){if(this._attendanceDataLoadPromise)return;const t=Array.isArray(AppState.appData?.clinicStaff)&&AppState.appData.clinicStaff.length>0,a=Array.isArray(AppState.appData?.clinicStaffAttendance)&&AppState.appData.clinicStaffAttendance.length>0,i=this.canViewAllAttendanceData();if(!(!e&&this._attendanceDataFetchedInSession===!0&&(!i||t&&a))){if(!e&&!i&&t&&a){this._attendanceDataFetchedInSession=!0;return}this._attendanceDataLoadPromise=this.loadClinicAttendanceData(!!e).then(n=>{n&&(this._attendanceDataFetchedInSession=!0),this.state?.activeTab==="attendance"&&this.renderAttendanceTab({force:!0})}).catch(()=>{}).finally(()=>{this._attendanceDataLoadPromise=null})}},_isAttendanceDataLoading(){return!!this._attendanceDataLoadPromise},_renderAttendanceTableLoadingRow(e,t){const a=Utils.escapeHTML(t||"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");return`<tr><td colspan="${e}" class="text-center text-gray-500 py-10">
            <i class="fas fa-spinner fa-spin ml-2" style="color:#0d9488;"></i>${a}
        </td></tr>`},async loadClinicStaffActivities(e){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest||this.state?.activeTab&&this.state.activeTab!=="attendance")return;const t=Array.isArray(AppState.appData?.clinicStaffSystemActivities)&&AppState.appData.clinicStaffSystemActivities.length>0;if(!e&&t)return;if(this._clinicStaffActivitiesLoading=!0,this._clinicVisitsLoadPromise)try{await this._clinicVisitsLoadPromise}catch{}await new Promise(o=>setTimeout(o,800));const a=this.state.filters?.attendance||{},i=this._resolveAttendanceFilterDates(a),n={limit:200,dateFrom:i.dateFrom||"",dateTo:i.dateTo||"",moduleKey:a.activityModule&&a.activityModule!=="all"?a.activityModule:""};a.staffId&&a.staffId!=="all"&&this.canViewAllAttendanceData()&&(n.staffId=a.staffId);const s=this._buildLocalClinicVisitActivities_(n);try{const o=await GoogleIntegration.sendRequest({action:"getClinicStaffSystemActivities",data:{filters:n}}),l=o?.success&&Array.isArray(o.data)?o.data:[];AppState.appData.clinicStaffSystemActivities=this._mergeClinicStaffActivities_([s,l]).slice(0,n.limit||200),this._clinicStaffActivitiesFetched=!0}catch{s.length&&(AppState.appData.clinicStaffSystemActivities=s,this._clinicStaffActivitiesFetched=!0)}finally{this._clinicStaffActivitiesLoading=!1}},getCurrentUserStaffRecord(){const e=AppState.currentUser;if(!e)return null;const t=String(e.id||"").trim(),a=String(e.email||"").trim().toLowerCase();return(this.getClinicStaffList()||[]).find(i=>{const n=String(i.userId||i.id||"").trim(),s=String(i.userEmail||"").trim().toLowerCase();return t&&n===t||a&&s===a})||null},isActiveClinicStaffMember(){const e=this.getCurrentUserStaffRecord();return e?String(e.isActive||"true").toLowerCase()!=="false":!1},canAccessAttendanceTab(){return this.isCurrentUserAdmin()||typeof Permissions<"u"&&Permissions.hasDetailedPermission("clinic","attendance")?!0:this.isActiveClinicStaffMember()},canViewAllAttendanceData(){return this.isCurrentUserAdmin()},_attendanceRowBelongsToCurrentUser_(e){const t=AppState.currentUser;if(!t||!e)return!1;const a=String(t.id||"").trim(),i=String(t.email||"").trim().toLowerCase(),n=this.getCurrentUserStaffRecord();return!!(n&&n.id&&String(e.staffId)===String(n.id)||a&&String(e.userId||"")===a||i&&String(e.userEmail||"").trim().toLowerCase()===i)},getTimeOffRequestTypeLabel(e){return{leave:"\u0625\u062C\u0627\u0632\u0629",permission:"\u0625\u0630\u0646",overtime:"\u0625\u0636\u0627\u0641\u064A"}[String(e||"").trim()]||e||"\u2014"},getTimeOffStatusBadge(e){return{pending:'<span class="badge badge-warning">\u0645\u0639\u0644\u0642</span>',approved:'<span class="badge badge-success">\u0645\u0639\u062A\u0645\u062F</span>',rejected:'<span class="badge badge-danger">\u0645\u0631\u0641\u0648\u0636</span>',cancelled:'<span class="badge badge-secondary">\u0645\u0644\u063A\u0649</span>'}[String(e||"").trim()]||'<span class="badge badge-secondary">\u2014</span>'},formatTimeOffRequestDetails(e){const t=String(e.requestType||"").trim();if(t==="leave")return`${e.dateFrom||"\u2014"} \u2192 ${e.dateTo||"\u2014"} (${e.durationDays||"\u2014"} \u064A\u0648\u0645)`;if(t==="permission")return`${e.dateFrom||"\u2014"} | ${e.timeFrom||"\u2014"} - ${e.timeTo||"\u2014"}`;if(t==="overtime"){const a=e.durationHours?`${e.durationHours} \u0633`:"",i=e.timeFrom&&e.timeTo?`${e.timeFrom} - ${e.timeTo}`:"";return`${e.dateFrom||"\u2014"} ${a||i}`.trim()}return"\u2014"},getStaffRoleLabel(e){return{doctor:"\u0637\u0628\u064A\u0628",nurse:"\u062A\u0645\u0631\u064A\u0636",clinic_officer:"\u0645\u0633\u0626\u0648\u0644 \u0639\u064A\u0627\u062F\u0629"}[String(e||"").trim()]||e||"\u2014"},getAttendanceStatusLabel(e){return{present:"\u062D\u0627\u0636\u0631",partial:"\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A",absent:"\u063A\u0627\u0626\u0628"}[String(e||"").trim()]||e||"\u2014"},getAttendanceStatusBadgeClass(e){const t=String(e||"").trim();return t==="present"?"badge-success":t==="partial"?"badge-warning":"badge-secondary"},_toDatetimeLocalValue(e,t){try{if(e){const a=new Date(e);if(!Number.isNaN(a.getTime())){const i=a.getFullYear(),n=String(a.getMonth()+1).padStart(2,"0"),s=String(a.getDate()).padStart(2,"0"),o=String(a.getHours()).padStart(2,"0"),l=String(a.getMinutes()).padStart(2,"0");return`${i}-${n}-${s}T${o}:${l}`}}if(t){const a=String(e||"").includes("checkout")||String(e||"")==="checkOut"?"17:00":"08:00";return`${t}T${a}`}return""}catch{return t?`${t}T08:00`:""}},_renderAttendancePunchActions(e){if(!e||!this.canAccessAttendanceTab())return'<span class="text-xs text-gray-400">\u2014</span>';const t=[],a=Utils.escapeAttr(String(e.id||""));return e.checkIn||t.push(`<button type="button" class="btn-secondary btn-sm" title="\u0625\u0636\u0627\u0641\u0629 \u0628\u0635\u0645\u0629 \u062F\u062E\u0648\u0644 \u0645\u0641\u0642\u0648\u062F\u0629" onclick="Clinic.showAttendancePunchModal('${a}', 'checkIn')"><i class="fas fa-sign-in-alt ml-1"></i>\u062F\u062E\u0648\u0644</button>`),e.checkOut||t.push(`<button type="button" class="btn-secondary btn-sm" title="\u0625\u0636\u0627\u0641\u0629 \u0628\u0635\u0645\u0629 \u062E\u0631\u0648\u062C \u0645\u0641\u0642\u0648\u062F\u0629" onclick="Clinic.showAttendancePunchModal('${a}', 'checkOut')"><i class="fas fa-sign-out-alt ml-1"></i>\u062E\u0631\u0648\u062C</button>`),t.length?`<div class="flex items-center gap-1 flex-wrap">${t.join("")}</div>`:'<span class="text-xs text-gray-400">\u0645\u0643\u062A\u0645\u0644</span>'},_findAttendanceRecordById(e){const t=String(e||"").trim();return t&&(this.getClinicStaffAttendanceList()||[]).find(a=>String(a.id)===t)||null},getClinicShiftRules(){return Array.isArray(AppState.appData?.clinicShiftRules)&&AppState.appData.clinicShiftRules.length>0?AppState.appData.clinicShiftRules:[{id:"shift_1",name:"\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0623\u0648\u0644\u0649",startTime:"07:30",endTime:"15:30",isOvernight:!1},{id:"shift_2",name:"\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629",startTime:"15:30",endTime:"22:30",isOvernight:!1},{id:"shift_3",name:"\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0644\u062B\u0629",startTime:"22:30",endTime:"07:30",isOvernight:!0}]},showClinicShiftSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getClinicShiftRules(),t=`
            <div class="modal-overlay active" id="clinic-shift-settings-modal">
                <div class="modal-content" style="max-width:560px;">
                    <div class="modal-header">
                        <h3><i class="fas fa-clock ml-2"></i>\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A (\u0627\u0644\u0639\u064A\u0627\u062F\u0629)</h3>
                        <button type="button" class="modal-close" onclick="document.getElementById('clinic-shift-settings-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-4">
                        <p class="text-xs text-gray-500 mb-2">\u062A\u0639\u062F\u064A\u0644 \u0648\u062A\u062D\u062F\u064A\u062F \u0645\u0648\u0627\u0639\u064A\u062F \u0628\u062F\u0627\u064A\u0629 \u0648\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A \u0627\u0644\u0631\u0633\u0645\u064A\u0629. \u064A\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F \u0644\u0644\u0628\u0635\u0645\u0627\u062A \u0648\u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u062B\u0627\u0644\u062B\u0629 \u0627\u0644\u0644\u064A\u0644\u064A\u0629 (10:30 \u0645 \u0625\u0644\u0649 07:30 \u0635).</p>
                        ${e.map((a,i)=>`
                            <div class="border rounded-lg p-3 bg-gray-50 space-y-2" data-shift-idx="${i}">
                                <div class="font-bold text-sm text-blue-700 flex items-center justify-between">
                                    <span>${Utils.escapeHTML(a.name)}</span>
                                    ${a.isOvernight?'<span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-semibold">\u{1F319} \u0648\u0631\u062F\u064A\u0629 \u0644\u064A\u0644\u064A\u0629 (\u062A\u062A\u062C\u0627\u0648\u0632 \u0645\u0646\u062A\u0635\u0641 \u0627\u0644\u0644\u064A\u0644)</span>':""}
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
            </div>`;document.getElementById("clinic-shift-settings-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",t),document.getElementById("clinic-shift-settings-save")?.addEventListener("click",()=>{const a=document.getElementById("clinic-shift-settings-modal"),i=a.querySelectorAll("[data-shift-idx]"),n=[];i.forEach((s,o)=>{const l=e[o],r=s.querySelector(".shift-start-time")?.value||l.startTime,c=s.querySelector(".shift-end-time")?.value||l.endTime;n.push({...l,startTime:r,endTime:c})}),AppState.appData.clinicShiftRules=n,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&GoogleIntegration.autoSave("ClinicShiftRules",n).catch(()=>{}),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),a.remove(),this.renderAttendanceTab({force:!0})})},showAttendancePunchModal(e,t){if(!this.canAccessAttendanceTab()){Notification?.error?.("\u063A\u064A\u0631 \u0645\u0635\u0631\u062D");return}const a=this._findAttendanceRecordById(e);if(!a){Notification?.error?.("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=String(t||"").trim(),n=i==="checkIn",s=i==="checkOut";if(n&&a.checkIn){Notification?.warning?.("\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0633\u062C\u0651\u0644 \u0645\u0633\u0628\u0642\u0627\u064B");return}if(s&&a.checkOut){Notification?.warning?.("\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0633\u062C\u0651\u0644 \u0645\u0633\u0628\u0642\u0627\u064B");return}if(!n&&!s)return;const o=this._attendanceDayKey(a.date);let l=n?`${o}T07:30`:`${o}T15:30`;if(s&&a.checkIn)try{const p=new Date(a.checkIn),f=p.getHours(),u=p.getMinutes(),m=`${String(f).padStart(2,"0")}:${String(u).padStart(2,"0")}`,g=this.getClinicShiftRules(),y=g.find(w=>w.isOvernight||w.id==="shift_3")||{startTime:"22:30",endTime:"07:30"},v=g.find(w=>w.id==="shift_2")||{startTime:"15:30",endTime:"22:30"},h=g.find(w=>w.id==="shift_1")||{startTime:"07:30",endTime:"15:30"};if(m>=y.startTime||m<h.startTime){const w=new Date(p);w.setDate(w.getDate()+1),l=`${this._attendanceDayKey(w)}T${y.endTime}`}else m>=v.startTime?l=`${o}T${v.endTime}`:l=`${o}T${h.endTime}`}catch{l=`${o}T15:30`}const d=`
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
            </div>`;document.getElementById("clinic-attendance-punch-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",d),document.getElementById("clinic-attendance-punch-save")?.addEventListener("click",async()=>{const p=document.getElementById("clinic-attendance-punch-time")?.value||"",f=document.getElementById("clinic-attendance-punch-notes")?.value?.trim()||"";if(!p){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0648\u0642\u062A");return}try{Loading?.show?.();const u=await GoogleIntegration.sendRequest({action:"updateClinicStaffAttendance",data:{recordId:a.id,punchType:i,[n?"checkIn":"checkOut"]:p,notes:f}});u?.success?(Notification?.success?.(u.message||"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u0635\u0645\u0629"),document.getElementById("clinic-attendance-punch-modal")?.remove(),await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0})):Notification?.error?.(u?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(u){Notification?.error?.(u?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}finally{Loading?.hide?.()}})},showAddMissingAttendanceModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=(this.getClinicStaffList()||[]).filter(i=>String(i.isActive||"true").toLowerCase()!=="false").map(i=>`<option value="${Utils.escapeAttr(i.id)}">${Utils.escapeHTML(i.userName||i.userEmail||i.id)}</option>`).join(""),t=this._getTodayLocalKey(),a=`
            <div class="modal-overlay active" id="clinic-attendance-add-modal">
                <div class="modal-content" style="max-width:520px;">
                    <div class="modal-header">
                        <h3><i class="fas fa-fingerprint ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062D\u0636\u0648\u0631 / \u0628\u0635\u0645\u0629 \u0645\u0641\u0642\u0648\u062F\u0629</h3>
                        <button type="button" class="modal-close" onclick="document.getElementById('clinic-attendance-add-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-4">
                        <div class="form-group">
                            <label class="form-label">\u0627\u0644\u0645\u0633\u0626\u0648\u0644 *</label>
                            <select id="clinic-attendance-add-staff" class="form-input"><option value="">\u2014 \u0627\u062E\u062A\u0631 \u2014</option>${e}</select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label>
                            <input type="date" id="clinic-attendance-add-date" class="form-input" value="${Utils.escapeAttr(t)}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</label>
                            <input type="datetime-local" id="clinic-attendance-add-checkin" class="form-input" value="${Utils.escapeAttr(t+"T08:00")}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</label>
                            <input type="datetime-local" id="clinic-attendance-add-checkout" class="form-input" value="${Utils.escapeAttr(t+"T17:00")}">
                        </div>
                        <p class="text-xs text-gray-500">\u064A\u0645\u0643\u0646 \u062A\u0631\u0643 \u0623\u062D\u062F \u0627\u0644\u062D\u0642\u0644\u064A\u0646 \u0641\u0627\u0631\u063A\u0627\u064B \u0644\u0625\u0636\u0627\u0641\u0629 \u0628\u0635\u0645\u0629 \u062F\u062E\u0648\u0644 \u0623\u0648 \u062E\u0631\u0648\u062C \u0641\u0642\u0637.</p>
                        <div class="form-group">
                            <label class="form-label">\u0645\u0644\u0627\u062D\u0638\u0629</label>
                            <textarea id="clinic-attendance-add-notes" class="form-textarea" rows="2" placeholder="\u0633\u0628\u0628 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u064A\u062F\u0648\u064A\u0629..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('clinic-attendance-add-modal')?.remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="button" class="btn-primary" id="clinic-attendance-add-save"><i class="fas fa-save ml-2"></i>\u062D\u0641\u0638</button>
                    </div>
                </div>
            </div>`;document.getElementById("clinic-attendance-add-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",a),document.getElementById("clinic-attendance-add-save")?.addEventListener("click",async()=>{const i=document.getElementById("clinic-attendance-add-staff")?.value||"",n=document.getElementById("clinic-attendance-add-date")?.value||"",s=document.getElementById("clinic-attendance-add-checkin")?.value||"",o=document.getElementById("clinic-attendance-add-checkout")?.value||"",l=document.getElementById("clinic-attendance-add-notes")?.value?.trim()||"";if(!i||!n){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E");return}if(!s&&!o){Notification?.warning?.("\u0623\u062F\u062E\u0644 \u0648\u0642\u062A \u062F\u062E\u0648\u0644 \u0623\u0648 \u062E\u0631\u0648\u062C \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");return}try{Loading?.show?.();const r={staffId:i,date:n,notes:l};s&&(r.checkIn=s),o&&(r.checkOut=o);const c=await GoogleIntegration.sendRequest({action:"updateClinicStaffAttendance",data:r});c?.success?(Notification?.success?.(c.message||"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644"),document.getElementById("clinic-attendance-add-modal")?.remove(),await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0})):Notification?.error?.(c?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(r){Notification?.error?.(r?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}finally{Loading?.hide?.()}})},_attendanceDayKey(e){if(!e)return"";try{const t=String(e).trim();if(/^\d{4}-\d{2}-\d{2}$/.test(t))return t;const a=new Date(e);if(Number.isNaN(a.getTime()))return t.slice(0,10);const i=a.getFullYear(),n=String(a.getMonth()+1).padStart(2,"0"),s=String(a.getDate()).padStart(2,"0");return`${i}-${n}-${s}`}catch{return String(e).slice(0,10)}},_getTodayLocalKey(){return this._attendanceDayKey(new Date)},_countActiveAttendanceFilters(e){if(!e)return 0;let t=0;return String(e.search||"").trim()&&t++,e.staffRole&&e.staffRole!=="all"&&t++,e.status&&e.status!=="all"&&t++,e.staffId&&e.staffId!=="all"&&t++,e.month&&t++,e.dateFrom&&t++,e.dateTo&&t++,t},_normalizeAttendanceDateRange(e,t){let a=String(e||"").trim(),i=String(t||"").trim();if(a&&i&&a>i){const n=a;a=i,i=n}return{dateFrom:a,dateTo:i}},_getAttendanceMonthRange(e){const t=String(e||"").trim();if(!/^\d{4}-\d{2}$/.test(t))return{dateFrom:"",dateTo:""};const a=t.split("-"),i=parseInt(a[0],10),n=parseInt(a[1],10);if(!i||!n||n<1||n>12)return{dateFrom:"",dateTo:""};const s=String(n).padStart(2,"0"),o=new Date(i,n,0).getDate();return{dateFrom:`${i}-${s}-01`,dateTo:`${i}-${s}-${String(o).padStart(2,"0")}`}},_getAttendanceStaffOptions(){const e=new Map;return(this.getClinicStaffList()||[]).forEach(t=>{const a=String(t.userId||t.id||t.userEmail||"").trim();a&&e.set(a,{id:a,staffId:t.id||"",name:t.userName||t.userEmail||a,role:t.staffRole||""})}),(this.getClinicStaffAttendanceList()||[]).forEach(t=>{const a=String(t.userId||t.staffId||t.userEmail||"").trim();!a||e.has(a)||e.set(a,{id:a,staffId:t.staffId||"",name:t.userName||t.userEmail||a,role:t.staffRole||""})}),Array.from(e.values()).sort((t,a)=>String(t.name).localeCompare(String(a.name),"ar"))},_resolveAttendanceFilterDates(e){const t=e||{};if(t.month){const a=this._getAttendanceMonthRange(t.month);if(a.dateFrom&&a.dateTo)return a}return this._normalizeAttendanceDateRange(t.dateFrom,t.dateTo)},_filterAttendanceRows(e,t){const a=t||{};let i=(e||[]).slice();if(a.staffId&&a.staffId!=="all"){const s=String(a.staffId).trim(),o=new Set([s,s.toLowerCase()]),l=(this.getClinicStaffList()||[]).find(r=>String(r.userId||"").trim()===s||String(r.id||"").trim()===s||String(r.userEmail||"").trim().toLowerCase()===s.toLowerCase());l&&["id","userId","userEmail"].forEach(r=>{const c=String(l[r]||"").trim();c&&(o.add(c),o.add(c.toLowerCase()))}),i=i.filter(r=>[r.staffId,r.userId,r.userEmail].map(d=>String(d||"").trim()).filter(Boolean).some(d=>o.has(d)||o.has(d.toLowerCase())))}if(a.search){const s=String(a.search).trim().toLowerCase();i=i.filter(o=>String(o.userName||"").toLowerCase().includes(s)||String(o.userEmail||"").toLowerCase().includes(s))}a.staffRole&&a.staffRole!=="all"&&(i=i.filter(s=>String(s.staffRole)===String(a.staffRole))),a.status&&a.status!=="all"&&(i=i.filter(s=>String(s.status)===String(a.status)));const n=this._resolveAttendanceFilterDates(a);return n.dateFrom&&(i=i.filter(s=>this._attendanceDayKey(s.date)>=n.dateFrom)),n.dateTo&&(i=i.filter(s=>this._attendanceDayKey(s.date)<=n.dateTo)),i.sort((s,o)=>{const l=this._attendanceDayKey(o.date)+String(o.checkIn||""),r=this._attendanceDayKey(s.date)+String(s.checkIn||"");return l.localeCompare(r)}),i},_computeAttendanceReportStats(e){const t=e||[];let a=0,i=0,n=0;const s=new Set;return t.forEach(o=>{const l=parseFloat(o.workDuration);Number.isNaN(l)||(a+=l),String(o.status)==="present"?i++:String(o.status)==="partial"&&n++;const r=String(o.userId||o.staffId||o.userEmail||o.userName||"");r&&s.add(r)}),{total:t.length,present:i,partial:n,staffCount:s.size,totalHours:Math.round(a*100)/100}},_buildAttendanceReportMeta(e){const t=e||{},a=[];if(t.staffId&&t.staffId!=="all"){const n=this._getAttendanceStaffOptions().find(s=>String(s.id)===String(t.staffId)||String(s.staffId)===String(t.staffId));a.push("\u0627\u0644\u0645\u0633\u0626\u0648\u0644: "+(n?.name||t.staffId))}if(t.month){const[n,s]=String(t.month).split("-"),o=["","\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];a.push("\u0627\u0644\u0634\u0647\u0631: "+(o[parseInt(s,10)]||s)+" "+n)}const i=this._resolveAttendanceFilterDates(t);return(i.dateFrom||i.dateTo)&&a.push("\u0627\u0644\u0645\u062F\u0629: "+(i.dateFrom||"\u2026")+" \u2192 "+(i.dateTo||"\u2026")),t.staffRole&&t.staffRole!=="all"&&a.push("\u0627\u0644\u062F\u0648\u0631: "+this.getStaffRoleLabel(t.staffRole)),t.status&&t.status!=="all"&&a.push("\u0627\u0644\u062D\u0627\u0644\u0629: "+this.getAttendanceStatusLabel(t.status)),t.search&&a.push("\u0628\u062D\u062B: "+String(t.search).trim()),a.length?a.join(" | "):"\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A"},_attendanceReportFileSuffix(e){const t=e||{};if(t.month)return String(t.month);if(t.staffId&&t.staffId!=="all")return(this._getAttendanceStaffOptions().find(s=>String(s.id)===String(t.staffId))?.name||"staff").replace(/[^\w\u0600-\u06FF-]+/g,"_").slice(0,24);const a=this._resolveAttendanceFilterDates(t);return a.dateFrom&&a.dateTo?`${a.dateFrom}_${a.dateTo}`:a.dateFrom?`from_${a.dateFrom}`:new Date().toISOString().slice(0,10)},getFilteredClinicAttendance(){return this._filterAttendanceRows(this.getClinicStaffAttendanceList(),this.state.filters.attendance||{})},async loadClinicAttendanceData(e){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return!1;try{this.canViewAllAttendanceData()&&await this._ensureClinicStaffLoadedForAttendance();const[t,a,i]=await Promise.all([GoogleIntegration.sendRequest({action:"getClinicStaffAttendance",data:e?{skipCache:!0}:{}}),GoogleIntegration.sendRequest({action:"getAllClinicStaff",data:{}}),GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:e?{skipCache:!0}:{}})]);return t?.success&&Array.isArray(t.data)&&(AppState.appData.clinicStaffAttendance=t.data),a?.success&&Array.isArray(a.data)&&(AppState.appData.clinicStaff=a.data),i?.success&&Array.isArray(i.data)&&(AppState.appData.clinicStaffTimeOffRequests=i.data),this.ensureData(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),!!(t?.success||a?.success||i?.success)}catch{return!1}},exportAttendanceToExcel(e){const t=e||this.state.filters.attendance||{},a=this._filterAttendanceRows(this.getClinicStaffAttendanceList(),t);if(!a.length){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const i=a.map(o=>({\u0627\u0644\u0627\u0633\u0645:o.userName||"",\u0627\u0644\u0628\u0631\u064A\u062F:o.userEmail||"",\u0627\u0644\u062F\u0648\u0631:this.getStaffRoleLabel(o.staffRole),\u0627\u0644\u062A\u0627\u0631\u064A\u062E:o.date||"","\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644":o.checkIn?Utils.formatDateTime?Utils.formatDateTime(o.checkIn):o.checkIn:"","\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C":o.checkOut?Utils.formatDateTime?Utils.formatDateTime(o.checkOut):o.checkOut:"","\u0645\u062F\u0629 \u0627\u0644\u0639\u0645\u0644 (\u0633\u0627\u0639\u0629)":o.workDuration||"",\u0627\u0644\u062D\u0627\u0644\u0629:this.getAttendanceStatusLabel(o.status),"\u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u0644\u0633\u0629":o.sessionId||""})),n=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(i);XLSX.utils.book_append_sheet(n,s,"Attendance"),XLSX.writeFile(n,`Clinic_Attendance_${this._attendanceReportFileSuffix(t)}.xlsx`)},_buildAttendanceReportContent(e,t){const a=this._computeAttendanceReportStats(t),i=this._buildAttendanceReportMeta(e),n=!this.canViewAllAttendanceData(),s=this.formatDate(new Date,!0),l=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",value:a.total,color:"#2563eb",bg:"#eff6ff"},{label:"\u062D\u0627\u0636\u0631",value:a.present,color:"#059669",bg:"#ecfdf5"},{label:"\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A",value:a.partial,color:"#d97706",bg:"#fffbeb"},{label:"\u0627\u0644\u0645\u0633\u0626\u0648\u0644\u0648\u0646",value:a.staffCount,color:"#4f46e5",bg:"#eef2ff"},{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0627\u0639\u0627\u062A",value:a.totalHours,color:"#0d9488",bg:"#f0fdfa"}].map(d=>`
            <div style="background:${d.bg};border:1px solid rgba(0,0,0,0.06);border-radius:10px;padding:12px 14px;text-align:center;">
                <div style="font-size:10px;color:#64748b;font-weight:700;margin-bottom:4px;">${d.label}</div>
                <div style="font-size:20px;font-weight:800;color:${d.color};line-height:1.1;">${d.value}</div>
            </div>
        `).join(""),r=t.map((d,p)=>{const f=p%2===0?"#ffffff":"#f8fafc",u=this.getAttendanceStatusLabel(d.status);return n?`<tr style="background:${f};">
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(d.date||"\u2014")}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(d.checkIn)}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(d.checkOut)}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;">${Utils.escapeHTML(String(d.workDuration||"\u2014"))}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(u)}</td>
                </tr>`:`<tr style="background:${f};">
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(d.userName||"\u2014")}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;font-size:10px;">${Utils.escapeHTML(d.userEmail||"\u2014")}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(this.getStaffRoleLabel(d.staffRole))}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(d.date||"\u2014")}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(d.checkIn)}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(d.checkOut)}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;">${Utils.escapeHTML(String(d.workDuration||"\u2014"))}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(u)}</td>
            </tr>`}).join(""),c=n?`<tr style="background:linear-gradient(135deg,#134e4a,#0d9488);color:#fff;">
                <th style="padding:10px;border:1px solid #0f766e;text-align:right;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                <th style="padding:10px;border:1px solid #0f766e;text-align:right;">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</th>
                <th style="padding:10px;border:1px solid #0f766e;text-align:right;">\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</th>
                <th style="padding:10px;border:1px solid #0f766e;text-align:center;">\u0627\u0644\u0645\u062F\u0629 (\u0633)</th>
                <th style="padding:10px;border:1px solid #0f766e;text-align:right;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
            </tr>`:`<tr style="background:linear-gradient(135deg,#134e4a,#0d9488);color:#fff;">
                <th style="padding:10px;border:1px solid #0f766e;text-align:right;">\u0627\u0644\u0627\u0633\u0645</th>
                <th style="padding:10px;border:1px solid #0f766e;text-align:right;">\u0627\u0644\u0628\u0631\u064A\u062F</th>
                <th style="padding:10px;border:1px solid #0f766e;text-align:right;">\u0627\u0644\u062F\u0648\u0631</th>
                <th style="padding:10px;border:1px solid #0f766e;text-align:right;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                <th style="padding:10px;border:1px solid #0f766e;text-align:right;">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</th>
                <th style="padding:10px;border:1px solid #0f766e;text-align:right;">\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</th>
                <th style="padding:10px;border:1px solid #0f766e;text-align:center;">\u0627\u0644\u0645\u062F\u0629 (\u0633)</th>
                <th style="padding:10px;border:1px solid #0f766e;text-align:right;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
            </tr>`;return`
            <div style="margin-bottom:18px;">
                <div style="background:linear-gradient(135deg,#134e4a 0%,#0d9488 100%);color:#fff;padding:16px 20px;border-radius:12px;margin-bottom:14px;box-shadow:0 4px 14px rgba(13,148,136,0.25);">
                    <div style="font-size:17px;font-weight:800;margin-bottom:6px;">\u062A\u0642\u0631\u064A\u0631 \u062D\u0636\u0648\u0631 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</div>
                    <div style="font-size:11px;opacity:0.92;line-height:1.6;">
                        <span><strong>\u0627\u0644\u0646\u0637\u0627\u0642:</strong> ${Utils.escapeHTML(i)}</span>
                        <span style="margin-right:12px;"> | </span>
                        <span><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</strong> ${Utils.escapeHTML(s)}</span>
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
</style>`,a=String(e||"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");return a?a.includes("</head>")?a.replace("</head>",`${t}</head>`):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${t}</head><body>${a}</body></html>`:t},async _waitAttendancePdfFontsReady_(e){if(!(!e||!e.fonts||typeof e.fonts.load!="function"))try{await Promise.all([e.fonts.load("400 12px Cairo"),e.fonts.load("600 14px Cairo"),e.fonts.load("700 18px Cairo"),e.fonts.load("800 16px Cairo")]),await e.fonts.ready}catch{}},async _ensureHtml2CanvasInAttendanceFrame_(e,t){if(!e||!t)return!1;if(typeof t.html2canvas=="function")return!0;if(typeof html2canvas=="function"){try{t.html2canvas=html2canvas}catch{}if(typeof t.html2canvas=="function")return!0}return new Promise(a=>{const i=e.createElement("script");i.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",i.async=!0,i.onload=()=>a(typeof t.html2canvas=="function"),i.onerror=()=>a(!1),(e.head||e.documentElement).appendChild(i)})},_addAttendancePdfPageImage_(e,t,a){const i=e.internal.pageSize.getWidth(),n=e.internal.pageSize.getHeight(),s=i-a*2,o=n-a*2,l=Math.min(s/t.width,o/t.height),r=t.width*l,c=t.height*l,d=a+(s-r)/2,p=a;Utils.PdfExport.addCanvasToPdf(e,t,d,p,r,c)},_buildAttendanceReportFullHtml(e,t){const a=this._buildAttendanceReportContent(e,t),i=Utils.escapeHTML(AppState?.companySettings?.name||"\u0646\u0638\u0627\u0645 HSE"),n=typeof AppState?.companyLogo=="string"?AppState.companyLogo:"",s=Utils.escapeHTML(`CLINIC-ATT-${this._attendanceReportFileSuffix(e)}`);return`<!DOCTYPE html>
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
            <div class="att-report-brand-name">${i}</div>
        </div>
        <div class="att-report-code">${s}</div>
    </div>
    ${a}
    <div class="att-report-footer">${i} \u2014 \u062A\u0642\u0631\u064A\u0631 \u062D\u0636\u0648\u0631 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</div>
</div>
</body>
</html>`},_loadAttendancePdfLib_(e,t){if(t())return Promise.resolve(!0);const a=Array.isArray(e)?e:[e],i=n=>{if(n>=a.length)return Promise.resolve(!1);const s=a[n],o=Array.from(document.querySelectorAll("script[src]")).find(l=>String(l.src||"").includes(s.replace(/^https?:\/\//,"").split("/").slice(-2).join("/")));return o?new Promise(l=>{const r=()=>l(!!t());o.addEventListener("load",r,{once:!0}),setTimeout(r,4e3)}):new Promise(l=>{const r=document.createElement("script");r.src=s,r.async=!0,r.onload=()=>l(!!t()),r.onerror=()=>l(i(n+1)),document.head.appendChild(r)})};return i(0)},async _ensureAttendancePdfLibs_(){const e=await this._loadAttendancePdfLib_(["https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js","https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js","https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"],()=>typeof window.jspdf<"u"||typeof window.jsPDF<"u"),t=await this._loadAttendancePdfLib_(["https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js","https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js","https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"],()=>typeof html2canvas<"u");return e&&t},_getJsPdfConstructor_(){return window.jspdf&&window.jspdf.jsPDF?window.jspdf.jsPDF:window.jsPDF&&window.jsPDF.jsPDF?window.jsPDF.jsPDF:typeof window.jsPDF=="function"?window.jsPDF:null},async _preloadAttendancePdfFonts_(e){const t=e||document,a=t.head||t.documentElement;if(a&&!t.getElementById("clinic-att-cairo-font")){const i=t.createElement("link");i.id="clinic-att-cairo-font",i.rel="stylesheet",i.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",a.appendChild(i)}try{t.fonts&&typeof t.fonts.load=="function"&&(await t.fonts.load("400 14px Cairo"),await t.fonts.load("700 18px Cairo"),await t.fonts.ready)}catch{}},async _captureAttendanceHtmlToCanvas_(e,t){const a=this.ATTENDANCE_A4_WIDTH_PX||794,i=Math.max(e?.scrollWidth||a,a),n=Math.max(e?.scrollHeight||1,1);let s=Utils.PdfExport.getOptimalCaptureScale(i,n,Utils.PdfExport.DEFAULT_CAPTURE_SCALE);const o=t&&typeof t.html2canvas=="function"?t.html2canvas:html2canvas,l={scale:s,backgroundColor:"#ffffff",logging:!1,width:i,height:n,windowWidth:i,windowHeight:n,scrollX:0,scrollY:0,useCORS:!0,allowTaint:!0,imageTimeout:8e3},r=[l,{...l,useCORS:!1,allowTaint:!0},{...l,scale:Math.max(1.25,s-.5)}];let c=null;for(let d=0;d<r.length;d++)try{const p=await o(e,r[d]);if(p&&p.width>0&&p.height>0)return p}catch(p){c=p}if(c)throw c;return null},async _downloadAttendanceHtmlAsPdf(e,t){if(!this._getJsPdfConstructor_()||typeof html2canvas>"u")return!1;const i=String(t||"report.pdf").toLowerCase().endsWith(".pdf")?String(t):`${String(t)}.pdf`,n=this.ATTENDANCE_A4_WIDTH_PX||794,s=6,o=this._prepareAttendancePdfHtml_(e);await this._preloadAttendancePdfFonts_();const l=document.createElement("iframe");l.setAttribute("aria-hidden","true"),l.style.cssText=`position:fixed;left:-20000px;top:0;width:${n}px;height:200px;border:0;visibility:hidden;`,document.body.appendChild(l);try{l.srcdoc=o,await new Promise(g=>{l.onload=g,l.onerror=g,setTimeout(g,4e3)});const r=l.contentDocument||l.contentWindow?.document,c=l.contentWindow;if(!r||!c)return!1;await this._preloadAttendancePdfFonts_(r),await this._waitAttendancePdfFontsReady_(r);const d=Array.from(r.images||[]);await Promise.all(d.map(g=>new Promise(y=>{if(g.complete)return y();g.onload=y,g.onerror=y,setTimeout(y,2e3)}))),await this._ensureHtml2CanvasInAttendanceFrame_(r,c),await new Promise(g=>setTimeout(g,300));const p=r.getElementById("attendance-report-root")||r.querySelector(".att-report-doc")||r.body;if(!p)return!1;const f=Math.max(p.scrollHeight,p.offsetHeight,1);l.style.height=`${f+80}px`,await new Promise(g=>setTimeout(g,150));const u=await this._captureAttendanceHtmlToCanvas_(p,c);if(!u)return!1;const m=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return m?(Utils.PdfExport.appendCanvasAsPdfPages(m,u,{marginMm:s}),Utils.PdfExport.savePdf(m,i),!0):!1}catch(r){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u062D\u0636\u0648\u0631 PDF:",r),!1}finally{l.remove()}},async exportAttendanceToPDF(e){const t=e||this.state.filters.attendance||{},a=this._filterAttendanceRows(this.getClinicStaffAttendanceList(),t);if(!a.length){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const i=`Clinic_Attendance_${this._attendanceReportFileSuffix(t)}.pdf`;typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");try{if(!await this._ensureAttendancePdfLibs_()){Notification?.error?.("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0627\u062A PDF \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A");return}const s=this._buildAttendanceReportFullHtml(t,a);await this._downloadAttendanceHtmlAsPdf(s,i)?Notification?.success?.("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 PDF \u0628\u0646\u062C\u0627\u062D"):Notification?.error?.("\u062A\u0639\u0630\u0651\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF \u2014 \u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B")}catch(n){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0636\u0648\u0631 PDF:",n),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0636\u0648\u0631: "+(n?.message||""))}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}},showAttendanceReportModal(){document.getElementById("clinic-attendance-report-modal")?.remove();const e=this.canViewAllAttendanceData(),t=e?this._getAttendanceStaffOptions():[],a=new Date,i=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`,n=t.map(m=>`<option value="${Utils.escapeAttr(m.id)}">${Utils.escapeHTML(m.name)}${m.role?" \u2014 "+Utils.escapeHTML(this.getStaffRoleLabel(m.role)):""}</option>`).join(""),s="border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;background:#fafafa;",o=m=>`display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;margin:0 0 6px;background:${m?"#f0fdfa":"transparent"};border:1px solid ${m?"#99f6e4":"transparent"};`,l=`
            <div class="modal-overlay active" id="clinic-attendance-report-modal">
                <div class="modal-content" style="max-width:580px;border-radius:14px;overflow:hidden;">
                    <div class="modal-header" style="background:linear-gradient(135deg,#134e4a,#0d9488);color:#fff;">
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
                            <div style="${s}margin-bottom:12px;">
                                <div style="font-size:0.78rem;font-weight:700;color:#334155;margin-bottom:8px;"><i class="fas fa-calendar-alt ml-1" style="color:#0d9488;"></i> \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629</div>
                                <label style="${o(!0)}" data-date-opt="month">
                                    <input type="radio" name="att-report-date-scope" value="month" checked>
                                    <span>\u0634\u0647\u0631 \u0645\u062D\u062F\u062F</span>
                                </label>
                                <div id="att-report-month-wrap" style="padding-right:28px;margin-bottom:8px;">
                                    <input type="month" id="att-report-month" class="form-input" value="${i}" style="width:100%;box-sizing:border-box;">
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
                            <div style="${s}margin-bottom:12px;">
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
            </div>`;document.body.insertAdjacentHTML("beforeend",l);const r=document.getElementById("clinic-attendance-report-modal");if(!r)return;const c=r.querySelector("#att-report-custom-filters"),d=r.querySelector("#att-report-use-current"),p=m=>{c&&(c.style.opacity=m?"1":"0.45",c.style.pointerEvents=m?"auto":"none")},f=()=>{const m=r.querySelector('input[name="att-report-date-scope"]:checked')?.value||"month";r.querySelector("#att-report-month-wrap").style.display=m==="month"?"block":"none",r.querySelector("#att-report-period-wrap").style.display=m==="period"?"block":"none",r.querySelectorAll("[data-date-opt]").forEach(g=>{const y=g.dataset.dateOpt===m;g.style.background=y?"#f0fdfa":"transparent",g.style.borderColor=y?"#99f6e4":"transparent"})};d?.addEventListener("change",()=>p(!d.checked)),r.querySelectorAll('input[name="att-report-date-scope"]').forEach(m=>{m.addEventListener("change",f)}),f(),p(!0);const u=()=>{if(d?.checked)return Object.assign({},this.state.filters.attendance||{});const m={search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},g=r.querySelector('input[name="att-report-date-scope"]:checked')?.value||"month";if(g==="month"){const v=r.querySelector("#att-report-month")?.value||"";if(!v)return Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631"),null;m.month=v}else if(g==="period"){const v=r.querySelector("#att-report-from")?.value||"",h=r.querySelector("#att-report-to")?.value||"";if(!v&&!h)return Notification?.warning?.("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0623\u0648 \u0627\u0644\u0646\u0647\u0627\u064A\u0629"),null;const w=this._normalizeAttendanceDateRange(v,h);m.dateFrom=w.dateFrom,m.dateTo=w.dateTo}const y=r.querySelector("#att-report-staff")?.value||"all";return y&&y!=="all"&&(m.staffId=y),m};r.querySelector("#att-report-export-btn")?.addEventListener("click",()=>{const m=r.querySelector('input[name="att-report-format"]:checked')?.value||"pdf",g=u();if(!g)return;if(!this._filterAttendanceRows(this.getClinicStaffAttendanceList(),g).length){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0642\u0631\u064A\u0631");return}r.remove(),m==="excel"?(this.exportAttendanceToExcel(g),Notification?.success?.("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 Excel")):this.exportAttendanceToPDF(g)})},showAddClinicStaffModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const e=this.getClinicStaffList(),t=new Set(e.map(s=>String(s.userId||s.userEmail||"").toLowerCase()).filter(Boolean)),n=`
            <div class="modal-overlay active" id="clinic-staff-modal">
                <div class="modal-content" style="max-width:520px;">
                    <div class="modal-header"><h3><i class="fas fa-user-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u0626\u0648\u0644 \u0639\u064A\u0627\u062F\u0629</h3>
                        <button type="button" class="modal-close" onclick="document.getElementById('clinic-staff-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-4">
                        <div class="form-group">
                            <label class="form-label">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</label>
                            <select id="clinic-staff-user" class="form-input"><option value="">\u2014 \u0627\u062E\u062A\u0631 \u2014</option>${(AppState.appData.users||[]).filter(s=>s&&s.active!==!1&&s.email).filter(s=>!t.has(String(s.id||"").toLowerCase())&&!t.has(String(s.email||"").toLowerCase())).map(s=>`<option value="${Utils.escapeAttr(s.id||"")}" data-email="${Utils.escapeAttr(s.email||"")}" data-name="${Utils.escapeAttr(s.name||"")}" data-dept="${Utils.escapeAttr(s.department||"")}" data-job="${Utils.escapeAttr(s.jobTitle||s.position||"")}">${Utils.escapeHTML(s.name||s.email)}</option>`).join("")}</select>
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
            </div>`;document.getElementById("clinic-staff-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",n),document.getElementById("clinic-staff-save-btn")?.addEventListener("click",async()=>{const s=document.getElementById("clinic-staff-user"),o=s?.selectedOptions?.[0];if(!s?.value||!o){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0633\u062A\u062E\u062F\u0645");return}const l=document.getElementById("clinic-staff-role")?.value||"clinic_officer";try{const r=await GoogleIntegration.sendRequest({action:"addClinicStaff",data:{userId:s.value,userEmail:o.dataset.email||"",userName:o.dataset.name||"",department:o.dataset.dept||"",jobTitle:o.dataset.job||"",staffRole:l,isActive:"true"}});r?.success?(Notification?.success?.("\u062A\u0645\u062A \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629"),document.getElementById("clinic-staff-modal")?.remove(),await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0})):Notification?.error?.(r?.message||"\u0641\u0634\u0644 \u0627\u0644\u0625\u0636\u0627\u0641\u0629")}catch(r){Notification?.error?.(r?.message||"\u0641\u0634\u0644 \u0627\u0644\u0625\u0636\u0627\u0641\u0629")}})},async toggleClinicStaffActive(e,t){if(!(!this.isCurrentUserAdmin()||!e))try{const a=await GoogleIntegration.sendRequest({action:"updateClinicStaff",data:{staffId:e,updateData:{isActive:t?"true":"false"}}});a?.success?(await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0633\u0626\u0648\u0644")):Notification?.error?.(a?.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}catch(a){Notification?.error?.(a?.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}},async deleteClinicStaffMember(e){if(!(!this.isCurrentUserAdmin()||!e)&&confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0639\u064A\u0627\u062F\u0629\u061F (\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0627\u0644\u0633\u0627\u0628\u0642 \u064A\u0628\u0642\u0649 \u0645\u062D\u0641\u0648\u0638\u0627\u064B)"))try{const t=await GoogleIntegration.sendRequest({action:"deleteClinicStaff",data:{staffId:e}});t?.success?(await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641")):Notification?.error?.(t?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641")}catch(t){Notification?.error?.(t?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641")}},async notifyAdminAboutTimeOffRequest(e){if(!(!e||!e.id))try{if(this.isCurrentUserAdmin()){const t=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[];t.some(i=>String(i.id)===String(e.id))||(AppState.appData.clinicStaffTimeOffRequests=[e,...t]),this._updatePendingApprovalsBadgeFromLocal_(),typeof UI<"u"&&typeof UI.updateNotificationsBadge=="function"&&UI.updateNotificationsBadge()}}catch(t){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0637\u0644\u0628 \u0627\u0644\u062D\u0636\u0648\u0631:",t)}},async submitTimeOffRequest(){this._saveTimeOffFormDraftFromDom(),this._timeOffFormSubmitting=!0;const e=document.getElementById("timeoff-request-type")?.value||"",t=document.getElementById("timeoff-reason")?.value?.trim()||"";let a="",i="";const n=document.getElementById("timeoff-time-from")?.value||"",s=document.getElementById("timeoff-time-to")?.value||"",o=document.getElementById("timeoff-duration-hours")?.value||"";if(e==="leave"?(a=document.getElementById("timeoff-date-from")?.value||"",i=document.getElementById("timeoff-date-to")?.value||""):e==="permission"?(a=document.getElementById("timeoff-perm-date")?.value||"",i=a):e==="overtime"&&(a=document.getElementById("timeoff-ot-date")?.value||"",i=a),!e)return this._timeOffFormSubmitting=!1,Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628"),!1;if(!t)return this._timeOffFormSubmitting=!1,Notification?.error?.("\u0633\u0628\u0628 \u0627\u0644\u0637\u0644\u0628 \u0645\u0637\u0644\u0648\u0628"),!1;Loading.show();try{const l={requestType:e,reason:t,dateFrom:a,dateTo:i,timeFrom:n,timeTo:s,durationHours:o},r=await GoogleIntegration.sendRequest({action:"addClinicStaffTimeOffRequest",data:l});if(r&&r.success){const c=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});c?.success&&Array.isArray(c.data)&&(AppState.appData.clinicStaffTimeOffRequests=c.data),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();const d=(AppState.appData.clinicStaffTimeOffRequests||[]).find(p=>p.id===r.data?.id)||{id:r.data?.id,requestType:e,reason:t,dateFrom:a,dateTo:i,timeFrom:n,timeTo:s,durationHours:o,status:"pending"};return this._invalidateApprovalsCache(),this.notifyAdminAboutTimeOffRequest(d),Loading.hide(),Notification?.success?.("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D \u2014 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0645\u062F\u064A\u0631"),this.state&&(this.state.timeOffFormDraft=this._getDefaultTimeOffFormDraft()),this._attendanceRenderPending=!1,this.renderAttendanceTab({force:!0}),typeof UI<"u"&&typeof UI.updateNotificationsBadge=="function"&&UI.updateNotificationsBadge(),!0}else throw new Error(r?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}catch(l){return Loading.hide(),Notification?.error?.(l?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628"),!1}finally{this._timeOffFormSubmitting=!1}},async cancelTimeOffRequest(e){if(!(!e||!confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0644\u063A\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F"))){Loading.show();try{const a=await GoogleIntegration.sendRequest({action:"cancelClinicStaffTimeOffRequest",data:{requestId:e}});if(a&&a.success){const i=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});i?.success&&Array.isArray(i.data)&&(AppState.appData.clinicStaffTimeOffRequests=i.data),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification?.success?.("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0637\u0644\u0628"),this.renderAttendanceTab({force:!0})}else throw new Error(a?.message||"\u0641\u0634\u0644 \u0627\u0644\u0625\u0644\u063A\u0627\u0621")}catch(a){Loading.hide(),Notification?.error?.(a?.message||"\u0641\u0634\u0644 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0637\u0644\u0628")}}},renderTimeOffRequestsTable(e){if(!e||!e.length)return'<p class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</p>';const t=e.map(a=>{const i=String(a.status)==="pending";return`<tr>
                <td><span class="badge badge-info">${Utils.escapeHTML(this.getTimeOffRequestTypeLabel(a.requestType))}</span></td>
                <td>${Utils.escapeHTML(this.formatTimeOffRequestDetails(a))}</td>
                <td class="text-sm">${Utils.escapeHTML(a.reason||"\u2014")}</td>
                <td>${this.getTimeOffStatusBadge(a.status)}</td>
                <td>${this.formatDate(a.requestedAt||a.createdAt,!0)}</td>
                <td>${i?`<button type="button" class="btn-icon btn-icon-danger" title="\u0625\u0644\u063A\u0627\u0621" onclick="Clinic.cancelTimeOffRequest('${Utils.escapeAttr(a.id)}')"><i class="fas fa-ban"></i></button>`:"\u2014"}</td>
            </tr>`}).join("");return this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
            <thead><tr><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th><th>\u0627\u0644\u0633\u0628\u0628</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><th>\u0625\u062C\u0631\u0627\u0621</th></tr></thead>
            <tbody>${t}</tbody>
        </table>`)},renderAttendanceSelfTab(e){this._saveTimeOffFormDraftFromDom(),this._scheduleLeaveBalancesLoadIfNeeded(!1),this.ensureData();const t=this._isAttendanceDataLoading(),a=this._isLeaveBalancesLoading(),i=this._getLeaveBalancePeriodDefaults(),n=this.getClinicStaffLeaveBalancesList()[0]||{},s=n.month||{},o=n.year||{};this.state.filters=this.state.filters||{},this.state.filters.attendance=Object.assign({search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.state.filters.attendance||{});const l=this.state.filters.attendance,r=this.getFilteredClinicAttendance(),c=this.getClinicStaffTimeOffRequestsList().sort((U,j)=>new Date(j.requestedAt||j.createdAt)-new Date(U.requestedAt||U.createdAt)),d=c.filter(U=>U.status==="pending").length,p=this._computeAttendanceReportStats(r),f=this.getCurrentUserStaffRecord(),u=this.getFilteredClinicStaffActivities(),m=!!this._clinicStaffActivitiesLoading,g=this._countActiveAttendanceFilters(l),y=this.state.attendanceFilterPanelOpen!==!1,v=l.period||"all",h={today:"\u0627\u0644\u064A\u0648\u0645",week:"7 \u0623\u064A\u0627\u0645",month:"30 \u064A\u0648\u0645",all:"\u0627\u0644\u0643\u0644"},D="min-width:0;box-sizing:border-box;width:100%;padding:8px 11px;border:1.5px solid #99f6e4;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;",L="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;",b=t&&r.length===0?this._renderAttendanceTableLoadingRow(5):r.length?r.map(U=>`
            <tr>
                <td>${Utils.escapeHTML(U.date||"\u2014")}</td>
                <td>${U.checkIn?Utils.formatDateTime?Utils.formatDateTime(U.checkIn):Utils.escapeHTML(String(U.checkIn)):"\u2014"}</td>
                <td>${U.checkOut?Utils.formatDateTime?Utils.formatDateTime(U.checkOut):Utils.escapeHTML(String(U.checkOut)):"\u2014"}</td>
                <td>${Utils.escapeHTML(String(U.workDuration||"\u2014"))}</td>
                <td><span class="badge ${this.getAttendanceStatusBadgeClass(U.status)}">${Utils.escapeHTML(this.getAttendanceStatusLabel(U.status))}</span></td>
                <td>${this._renderAttendancePunchActions(U)}</td>
            </tr>
        `).join(""):'<tr><td colspan="6" class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u0636\u0648\u0631</td></tr>',A=[{id:"clinic-attendance-section-timeoff",label:"\u0637\u0644\u0628 \u062C\u062F\u064A\u062F",icon:"fa-paper-plane"},{id:"clinic-attendance-section-my-requests",label:"\u0637\u0644\u0628\u0627\u062A\u064A",icon:"fa-list"},{id:"clinic-attendance-section-records",label:"\u0633\u062C\u0644 \u062D\u0636\u0648\u0631\u064A",icon:"fa-clipboard-user"},{id:"clinic-staff-activities-section",label:"\u0646\u0634\u0627\u0637\u064A",icon:"fa-history"},{id:"clinic-leave-balances-section",label:"\u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A",icon:"fa-wallet"},{id:"clinic-approved-timeoff-section",label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629",icon:"fa-check-circle"}];e.innerHTML=`
            <div id="clinic-attendance-self-root">
                ${this.renderAttendanceQuickNav(A)}
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:14px;">
                    ${[{label:"\u0623\u064A\u0627\u0645 \u062D\u0636\u0648\u0631\u064A",value:p.total,icon:"fa-calendar-check",color:"#059669",bg:"#ecfdf5"},{label:"\u0633\u0627\u0639\u0627\u062A\u064A",value:p.totalHours,icon:"fa-clock",color:"#2563eb",bg:"#eff6ff"},{label:"\u0637\u0644\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629",value:d,icon:"fa-hourglass-half",color:"#d97706",bg:"#fffbeb"},{label:"\u0625\u062C\u0627\u0632\u0629 \u0645\u062A\u0628\u0642\u064A\u0629 (\u0634\u0647\u0631)",value:a?"\u2026":s.leaveRemaining??0,icon:"fa-umbrella-beach",color:"#0d9488",bg:"#f0fdfa"},{label:"\u0623\u0630\u0648\u0646\u0627\u062A \u0645\u062A\u0628\u0642\u064A\u0629 (\u0634\u0647\u0631)",value:a?"\u2026":s.permissionRemaining??0,icon:"fa-door-open",color:"#7c3aed",bg:"#f5f3ff"},{label:"\u0625\u062C\u0627\u0632\u0629 \u0645\u062A\u0628\u0642\u064A\u0629 (\u0633\u0646\u0629)",value:a?"\u2026":o.leaveRemaining??0,icon:"fa-calendar",color:"#0369a1",bg:"#f0f9ff"}].map(U=>`
                        <div style="background:${U.bg};border-radius:12px;padding:14px;display:flex;align-items:center;gap:10px;">
                            <i class="fas ${U.icon}" style="color:${U.color};font-size:1.2rem;"></i>
                            <div><p style="margin:0;font-size:0.72rem;color:#64748b;">${U.label}</p><p style="margin:0;font-size:1.35rem;font-weight:800;color:${U.color};">${U.value}</p></div>
                        </div>`).join("")}
                </div>

                <div style="padding:14px 18px;background:linear-gradient(135deg,#134e4a,#0d9488);border-radius:14px;color:#fff;margin-bottom:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;align-items:center;">
                    <div>
                        <h3 style="margin:0;font-size:1rem;font-weight:700;">\u062D\u0636\u0648\u0631\u064A \u0648\u0637\u0644\u0628\u0627\u062A\u064A</h3>
                        <p style="margin:4px 0 0;font-size:0.72rem;opacity:0.9;">${Utils.escapeHTML(f?.userName||AppState.currentUser?.name||"")} \u2014 ${Utils.escapeHTML(this.getStaffRoleLabel(f?.staffRole))}</p>
                    </div>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        ${["today","week","month","all"].map(U=>{const j=v===U;return`<button type="button" class="clinic-attendance-period-btn" data-period="${U}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.74rem;font-weight:600;background:${j?"#fff":"rgba(255,255,255,0.14)"};color:${j?"#134e4a":"#fff"};">${h[U]}</button>`}).join("")}
                        <button type="button" id="clinic-attendance-toggle-filters" style="padding:6px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.35);background:rgba(255,255,255,0.12);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-sliders-h"></i> \u0641\u0644\u0627\u062A\u0631</button>
                        <button type="button" id="clinic-attendance-refresh-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(255,255,255,0.14);color:#fff;cursor:pointer;"><i class="fas fa-sync-alt${t?" fa-spin":""}"></i></button>
                        <button type="button" id="clinic-attendance-pdf-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(0,0,0,0.22);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-file-pdf"></i> PDF</button>
                        <button type="button" id="clinic-attendance-export-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(0,0,0,0.22);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-file-excel"></i> Excel</button>
                    </div>
                </div>

                <div id="clinic-attendance-filter-panel" style="display:${y?"block":"none"};background:#f0fdfa;border:1.5px solid #99f6e4;border-radius:12px;padding:14px;margin-bottom:14px;">
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;">
                        <div><label style="${L}">\u0627\u0644\u0634\u0647\u0631</label><input type="month" id="clinic-attendance-month" style="${D}" value="${Utils.escapeAttr(l.month||"")}"></div>
                        <div><label style="${L}">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="clinic-attendance-status" style="${D}">
                                <option value="all">\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                <option value="present" ${l.status==="present"?"selected":""}>\u062D\u0627\u0636\u0631</option>
                                <option value="partial" ${l.status==="partial"?"selected":""}>\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A</option>
                                <option value="absent" ${l.status==="absent"?"selected":""}>\u063A\u0627\u0626\u0628</option>
                            </select>
                        </div>
                        <div><label style="${L}">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label><input type="date" id="clinic-attendance-from" style="${D}" value="${Utils.escapeAttr(l.dateFrom||"")}"></div>
                        <div><label style="${L}">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label><input type="date" id="clinic-attendance-to" style="${D}" value="${Utils.escapeAttr(l.dateTo||"")}"></div>
                    </div>
                    ${g?'<button type="button" id="clinic-attendance-reset-filters" class="btn-secondary btn-sm mt-2"><i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631</button>':""}
                </div>

                <div id="clinic-attendance-section-timeoff" style="position:relative;overflow:hidden;padding:20px;background:linear-gradient(135deg,#0f2f46 0%,#0f766e 100%);border:1px solid rgba(20,184,166,.3);border-radius:16px;color:#fff;margin-bottom:16px;box-shadow:0 12px 30px rgba(15,47,70,.14);">
                    <div style="position:absolute;inset-inline-end:-36px;top:-48px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.08);"></div>
                    <div style="position:relative;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;">
                        <div style="display:flex;align-items:center;gap:13px;min-width:240px;">
                            <span style="width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.18);font-size:1.25rem;"><i class="fas fa-user-clock"></i></span>
                            <div><h4 style="margin:0;font-size:1.02rem;font-weight:800;">\u0637\u0644\u0628 \u062D\u0636\u0648\u0631 \u062C\u062F\u064A\u062F</h4><p style="margin:5px 0 0;font-size:.75rem;color:#ccfbf1;">\u0625\u062C\u0627\u0632\u0629\u060C \u0625\u0630\u0646 \u0623\u0648 \u0639\u0645\u0644 \u0625\u0636\u0627\u0641\u064A \u0639\u0628\u0631 \u0645\u0633\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0636\u062D</p></div>
                        </div>
                        <button type="button" id="clinic-open-timeoff-request" style="display:inline-flex;align-items:center;gap:8px;padding:11px 16px;border:0;border-radius:11px;background:#fff;color:#0f766e;font-size:.82rem;font-weight:800;cursor:pointer;box-shadow:0 7px 18px rgba(0,0,0,.16);"><i class="fas fa-plus"></i>\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628</button>
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
                            <tbody>${b}</tbody>
                        </table>`)}
                    </div>
                </div>

                ${this.renderClinicStaffActivitiesSection({showUserColumn:!1,activities:u,loading:m,title:"\u0646\u0634\u0627\u0637\u064A \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645"})}

                ${this.renderClinicStaffLeaveBalancesSection({balances:this.getClinicStaffLeaveBalancesList(),loading:a,month:i.month,year:i.year})}

                ${this.renderApprovedTimeOffRequestsSection(this.getClinicStaffLeaveBalancesList(),i.month)}
            </div>`;const E=()=>{const U=document.getElementById("clinic-attendance-month")?.value||"";let j=document.getElementById("clinic-attendance-from")?.value||"",x=document.getElementById("clinic-attendance-to")?.value||"";if(U&&!j&&!x){const S=this._getAttendanceMonthRange(U);j=S.dateFrom,x=S.dateTo}else{const S=this._normalizeAttendanceDateRange(j,x);j=S.dateFrom,x=S.dateTo}return{search:"",staffRole:"all",status:document.getElementById("clinic-attendance-status")?.value||"all",staffId:"all",month:U,dateFrom:j,dateTo:x,period:this.state.filters.attendance?.period||"all"}},R=()=>{this.state.filters.attendance=E.call(this),this.renderAttendanceTab({force:!0})},q=U=>{const j=this._getTodayLocalKey();let x="",S="";if(U==="today")x=j,S=j;else if(U==="week"){const C=new Date;C.setDate(C.getDate()-6),x=this._attendanceDayKey(C),S=j}else if(U==="month"){const C=new Date;C.setDate(C.getDate()-29),x=this._attendanceDayKey(C),S=j}this.state.filters.attendance=Object.assign({},this.state.filters.attendance||{},{period:U,month:"",dateFrom:x,dateTo:S}),this.renderAttendanceTab({force:!0})};e.querySelector("#clinic-attendance-status")?.addEventListener("change",R),e.querySelector("#clinic-attendance-month")?.addEventListener("change",R),e.querySelector("#clinic-attendance-from")?.addEventListener("change",R),e.querySelector("#clinic-attendance-to")?.addEventListener("change",R),e.querySelector("#clinic-attendance-reset-filters")?.addEventListener("click",()=>{this.state.filters.attendance={search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.renderAttendanceTab({force:!0})}),e.querySelector("#clinic-attendance-toggle-filters")?.addEventListener("click",()=>{this.state.attendanceFilterPanelOpen=!y;const U=e.querySelector("#clinic-attendance-filter-panel");U&&(U.style.display=this.state.attendanceFilterPanelOpen?"block":"none")}),e.querySelectorAll(".clinic-attendance-period-btn").forEach(U=>{U.addEventListener("click",()=>q(U.dataset.period||"all"))}),e.querySelector("#clinic-attendance-shift-rules-btn")?.addEventListener("click",()=>this.showClinicShiftSettingsModal()),e.querySelector("#clinic-attendance-export-btn")?.addEventListener("click",()=>this.exportAttendanceToExcel()),e.querySelector("#clinic-attendance-pdf-btn")?.addEventListener("click",()=>this.exportAttendanceToPDF()),e.querySelector("#clinic-open-timeoff-request")?.addEventListener("click",()=>this.showTimeOffRequestForm()),e.querySelector("#clinic-attendance-refresh-btn")?.addEventListener("click",async()=>{Notification?.info?.("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B..."),this._attendanceDataFetchedInSession=!1,await this.loadClinicAttendanceData(!0),this._attendanceDataFetchedInSession=!0,this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}),this.bindClinicStaffActivitiesEvents(e),this.bindClinicStaffLeaveBalanceEvents(e),this.bindAttendanceQuickNav(e),this.initAttendanceTableScroll(e)},renderAttendanceTab(e){if(!(e&&e.force===!0)&&this._shouldDeferAttendanceRender()){this._attendanceRenderPending=!0;return}this._attendanceRenderPending=!1;const a=document.querySelector('.clinic-tab-panel[data-tab-panel="attendance"]');if(!a)return;if(!this.canAccessAttendanceTab()){a.innerHTML=`<div class="text-center py-12 text-gray-500">
                <i class="fas fa-lock text-4xl mb-4 opacity-40"></i>
                <p class="font-semibold">\u063A\u064A\u0631 \u0645\u0635\u0631\u062D</p>
                <p class="text-sm mt-2">\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062D\u0636\u0648\u0631 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0633\u062C\u0651\u0644\u064A\u0646 \u0648\u0627\u0644\u0646\u0634\u0637\u064A\u0646 \u0641\u0642\u0637.</p>
            </div>`;return}this.isCurrentUserAdmin()&&this.prefetchClinicAttendanceForAdminIfNeeded(!1),this._scheduleAttendanceDataLoadIfNeeded(!1),this._scheduleLeaveBalancesLoadIfNeeded(!1);const i=this._isAttendanceDataLoading(),n=this._isLeaveBalancesLoading(),s=this._getLeaveBalancePeriodDefaults(),o=this.getClinicStaffLeaveBalancesList();if(!this.canViewAllAttendanceData())return this.renderAttendanceSelfTab(a);this.ensureData(),this.state.filters=this.state.filters||{},this.state.filters.attendance=Object.assign({search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.state.filters.attendance||{});const l=this.state.filters.attendance,r=this.getFilteredClinicAttendance(),c=this.getClinicStaffList(),d=this._getAttendanceStaffOptions(),p=c.filter(T=>String(T.isActive||"true").toLowerCase()!=="false"),f=this._getTodayLocalKey(),u=this.getClinicStaffAttendanceList(),m=u.filter(T=>this._attendanceDayKey(T.date)===f),g=m.filter(T=>T.checkIn).length,y=m.filter(T=>T.checkIn&&!T.checkOut).length,v=this.isCurrentUserAdmin(),h=this.getFilteredClinicStaffActivities(),w=!!this._clinicStaffActivitiesLoading,D=this._countActiveAttendanceFilters(l),L=this.state.attendanceFilterPanelOpen!==!1,b=l.period||"all",A={today:"\u0627\u0644\u064A\u0648\u0645",week:"7 \u0623\u064A\u0627\u0645",month:"30 \u064A\u0648\u0645",all:"\u0627\u0644\u0643\u0644"},E="min-width:0;box-sizing:border-box;",R=`${E}width:100%;padding:8px 11px;border:1.5px solid #99f6e4;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;transition:border-color .2s,box-shadow .2s;`,q="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",U="this.style.borderColor='#0d9488';this.style.boxShadow='0 0 0 3px rgba(13,148,136,0.12)'",j="this.style.borderColor='#99f6e4';this.style.boxShadow='none'",x=d.map(T=>`<option value="${Utils.escapeAttr(T.id)}" ${String(l.staffId)===String(T.id)?"selected":""}>${Utils.escapeHTML(T.name)}</option>`).join(""),S=i&&r.length===0?this._renderAttendanceTableLoadingRow(10):r.length?r.map(T=>`
            <tr>
                <td>${Utils.escapeHTML(T.userName||"\u2014")}</td>
                <td>${Utils.escapeHTML(T.userEmail||"\u2014")}</td>
                <td>${Utils.escapeHTML(this.getStaffRoleLabel(T.staffRole))}</td>
                <td>${Utils.escapeHTML(T.date||"\u2014")}</td>
                <td>${T.checkIn?Utils.formatDateTime?Utils.formatDateTime(T.checkIn):Utils.escapeHTML(String(T.checkIn)):"\u2014"}</td>
                <td>${T.checkOut?Utils.formatDateTime?Utils.formatDateTime(T.checkOut):Utils.escapeHTML(String(T.checkOut)):"\u2014"}</td>
                <td>${Utils.escapeHTML(String(T.workDuration||"\u2014"))}</td>
                <td><span class="badge ${this.getAttendanceStatusBadgeClass(T.status)}">${Utils.escapeHTML(this.getAttendanceStatusLabel(T.status))}</span></td>
                <td class="text-xs text-gray-500">${Utils.escapeHTML(String(T.sessionId||"\u2014").slice(0,18))}</td>
                <td>${this._renderAttendancePunchActions(T)}</td>
            </tr>
        `).join(""):'<tr><td colspan="10" class="text-center text-gray-500 py-8"><i class="fas fa-calendar-times ml-2 opacity-60"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631</td></tr>',C=v?c.length?c.map(T=>{const M=String(T.isActive||"true").toLowerCase()!=="false";return`<tr>
                <td>${Utils.escapeHTML(T.userName||"\u2014")}</td>
                <td>${Utils.escapeHTML(this.getStaffRoleLabel(T.staffRole))}</td>
                <td>${M?'<span class="badge badge-success">\u0646\u0634\u0637</span>':'<span class="badge badge-secondary">\u0645\u0648\u0642\u0648\u0641</span>'}</td>
                <td>
                    <button type="button" class="btn-icon btn-icon-warning" title="${M?"\u0625\u064A\u0642\u0627\u0641":"\u062A\u0641\u0639\u064A\u0644"}" onclick="Clinic.toggleClinicStaffActive('${Utils.escapeAttr(T.id)}', ${!M})"><i class="fas fa-${M?"pause":"play"}"></i></button>
                    <button type="button" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641" onclick="Clinic.deleteClinicStaffMember('${Utils.escapeAttr(T.id)}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`}).join(""):'<tr><td colspan="4" class="text-center text-gray-500 py-4">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u0626\u0648\u0644\u0648\u0646 \u2014 \u0623\u0636\u0641 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</td></tr>':"",$=[{id:"clinic-attendance-section-records",label:"\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631",icon:"fa-clipboard-user"},{id:"clinic-staff-activities-section",label:"\u0646\u0634\u0627\u0637 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646",icon:"fa-history"},{id:"clinic-leave-balances-section",label:"\u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A",icon:"fa-wallet"},{id:"clinic-approved-timeoff-section",label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629",icon:"fa-check-circle"}];v&&$.push({id:"clinic-attendance-section-staff",label:"\u0645\u0633\u0626\u0648\u0644\u0648 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",icon:"fa-users"}),a.innerHTML=`
            <style>
                @media (max-width:900px){#clinic-attendance-filter-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;}}
                @media (max-width:520px){#clinic-attendance-filter-grid{grid-template-columns:1fr!important;}}
            </style>
            <div id="clinic-attendance-root" style="font-family:inherit;">
                ${this.renderAttendanceQuickNav($)}
                <!-- KPI -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:10px;margin-bottom:14px;">
                    ${[{label:"\u062D\u0627\u0636\u0631\u0648\u0646 \u0627\u0644\u064A\u0648\u0645",value:g,icon:"fa-user-check",color:"#059669",bg:"#ecfdf5"},{label:"\u0628\u062F\u0648\u0646 \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C",value:y,icon:"fa-door-open",color:"#d97706",bg:"#fffbeb"},{label:"\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0641\u0644\u062A\u0631",value:r.length,icon:"fa-filter",color:"#2563eb",bg:"#eff6ff"},{label:"\u0645\u0633\u0626\u0648\u0644\u0648\u0646 \u0646\u0634\u0637\u0648\u0646",value:p.length,icon:"fa-users",color:"#4f46e5",bg:"#eef2ff"}].map(T=>`
                        <div style="background:${T.bg};border:1px solid rgba(0,0,0,0.04);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;">
                            <div style="width:40px;height:40px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
                                <i class="fas ${T.icon}" style="color:${T.color};font-size:1rem;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-size:0.72rem;color:#64748b;font-weight:600;">${T.label}</p>
                                <p style="margin:2px 0 0;font-size:1.45rem;font-weight:800;color:${T.color};line-height:1.1;">${T.value}</p>
                            </div>
                        </div>
                    `).join("")}
                </div>

                <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A -->
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:12px;padding:14px 18px;background:linear-gradient(135deg,#134e4a 0%,#0d9488 100%);border-radius:14px;color:#fff;box-shadow:0 4px 18px rgba(13,148,136,0.28);">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="width:42px;height:42px;background:rgba(255,255,255,0.16);border-radius:11px;display:flex;align-items:center;justify-content:center;">
                            <i class="fas fa-clipboard-user" style="font-size:18px;"></i>
                        </div>
                        <div>
                            <h3 style="margin:0;font-size:1rem;font-weight:700;">\u0633\u062C\u0644 \u062D\u0636\u0648\u0631 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</h3>
                            <p style="margin:0;font-size:0.72rem;opacity:0.88;">\u062A\u0633\u062C\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A \u0639\u0646\u062F \u0627\u0644\u062F\u062E\u0648\u0644 \u0648\u0627\u0644\u062E\u0631\u0648\u062C \u2022 ${i&&r.length===0?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...":`${u.length} \u0633\u062C\u0644 \u0625\u062C\u0645\u0627\u0644\u064A`}</p>
                        </div>
                    </div>
                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                        <span style="font-size:0.72rem;opacity:0.9;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                        ${["today","week","month","all"].map(T=>{const M=b===T;return`<button type="button" class="clinic-attendance-period-btn" data-period="${T}" style="padding:5px 11px;border-radius:8px;border:none;cursor:pointer;font-size:0.74rem;font-weight:600;transition:all .2s;background:${M?"#fff":"rgba(255,255,255,0.14)"};color:${M?"#134e4a":"#fff"};">${A[T]}</button>`}).join("")}
                        <button type="button" id="clinic-attendance-toggle-filters" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.35);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;">
                            <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span>
                            ${D?`<span style="background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 6px;border-radius:10px;">${D}</span>`:""}
                        </button>
                        <button type="button" id="clinic-attendance-refresh-btn" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.14);color:#fff;font-size:0.76rem;" title="\u062A\u062D\u062F\u064A\u062B \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645"><i class="fas fa-sync-alt${i?" fa-spin":""}"></i></button>
                        <button type="button" id="clinic-attendance-report-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.92);color:#134e4a;font-size:0.76rem;font-weight:700;display:flex;align-items:center;gap:5px;" title="\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631"><i class="fas fa-file-export"></i><span>\u062A\u0642\u0631\u064A\u0631</span></button>
                        <button type="button" id="clinic-attendance-pdf-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.22);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;" title="PDF \u0644\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A"><i class="fas fa-file-pdf"></i><span>PDF</span></button>
                        <button type="button" id="clinic-attendance-export-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.22);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;" title="Excel \u0644\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A"><i class="fas fa-file-excel"></i><span>Excel</span></button>
                        ${v?'<button type="button" id="clinic-attendance-shift-rules-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.92);color:#134e4a;font-size:0.76rem;font-weight:700;display:flex;align-items:center;gap:5px;" title="\u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A \u0648\u0627\u0644\u0642\u0648\u0627\u0639\u062F"><i class="fas fa-clock"></i><span>\u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u0648\u0631\u062F\u064A\u0627\u062A</span></button>':""}
                        ${v?'<button type="button" id="clinic-attendance-add-punch-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.92);color:#134e4a;font-size:0.76rem;font-weight:700;display:flex;align-items:center;gap:5px;" title="\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062D\u0636\u0648\u0631 \u0623\u0648 \u0628\u0635\u0645\u0629 \u0645\u0641\u0642\u0648\u062F\u0629"><i class="fas fa-fingerprint"></i><span>\u0628\u0635\u0645\u0629 \u0645\u0641\u0642\u0648\u062F\u0629</span></button>':""}
                        ${v?'<button type="button" id="clinic-attendance-add-staff-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:#fff;color:#134e4a;font-size:0.76rem;font-weight:700;display:flex;align-items:center;gap:5px;"><i class="fas fa-user-plus"></i><span>\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u0626\u0648\u0644</span></button>':""}
                    </div>
                </div>

                <!-- \u0644\u0648\u062D\u0629 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 -->
                <div id="clinic-attendance-filter-panel" style="display:${L?"block":"none"};background:#f0fdfa;border:1.5px solid #99f6e4;border-radius:12px;padding:16px 18px;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-sliders-h" style="color:#0d9488;font-size:14px;"></i>
                            <span style="font-weight:700;font-size:0.88rem;color:#134e4a;">\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0628\u062D\u062B</span>
                            ${D?`<span style="background:#ccfbf1;color:#0f766e;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;">${D} \u0646\u0634\u0637</span>`:'<span style="color:#94a3b8;font-size:0.72rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u0644\u0627\u062A\u0631 \u0646\u0634\u0637\u0629</span>'}
                        </div>
                        <button type="button" id="clinic-attendance-reset-filters" style="padding:5px 12px;border-radius:8px;border:1px solid #99f6e4;background:#fff;color:#64748b;font-size:0.74rem;cursor:pointer;font-weight:600;">
                            <i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                        </button>
                    </div>
                    <div id="clinic-attendance-filter-grid" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px 12px;">
                        <div style="grid-column:1/-1;${E}">
                            <label style="${q}"><i class="fas fa-search" style="color:#0d9488;margin-left:4px;"></i>\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0628\u0631\u064A\u062F</label>
                            <input type="search" id="clinic-attendance-search" style="${R}" placeholder="\u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B..." value="${Utils.escapeAttr(l.search||"")}" autocomplete="off" onfocus="${U}" onblur="${j}">
                        </div>
                        <div style="${E}">
                            <label style="${q}"><i class="fas fa-calendar-alt" style="color:#f59e0b;margin-left:4px;"></i>\u0627\u0644\u0634\u0647\u0631</label>
                            <input type="month" id="clinic-attendance-month" style="${R}" value="${Utils.escapeAttr(l.month||"")}" onfocus="${U}" onblur="${j}">
                        </div>
                        <div style="${E}">
                            <label style="${q}"><i class="fas fa-user" style="color:#6366f1;margin-left:4px;"></i>\u0627\u0644\u0645\u0633\u0626\u0648\u0644</label>
                            <select id="clinic-attendance-staff" style="${R}cursor:pointer;" onfocus="${U}" onblur="${j}">
                                <option value="all" ${!l.staffId||l.staffId==="all"?"selected":""}>\u0643\u0644 \u0627\u0644\u0645\u0633\u0626\u0648\u0644\u064A\u0646</option>
                                ${x}
                            </select>
                        </div>
                        <div style="${E}">
                            <label style="${q}"><i class="fas fa-user-tag" style="color:#8b5cf6;margin-left:4px;"></i>\u0627\u0644\u062F\u0648\u0631</label>
                            <select id="clinic-attendance-role" style="${R}cursor:pointer;" onfocus="${U}" onblur="${j}">
                                <option value="all" ${l.staffRole==="all"||!l.staffRole?"selected":""}>\u0643\u0644 \u0627\u0644\u0623\u062F\u0648\u0627\u0631</option>
                                <option value="doctor" ${l.staffRole==="doctor"?"selected":""}>\u0637\u0628\u064A\u0628</option>
                                <option value="nurse" ${l.staffRole==="nurse"?"selected":""}>\u062A\u0645\u0631\u064A\u0636</option>
                                <option value="clinic_officer" ${l.staffRole==="clinic_officer"?"selected":""}>\u0645\u0633\u0626\u0648\u0644 \u0639\u064A\u0627\u062F\u0629</option>
                            </select>
                        </div>
                        <div style="${E}">
                            <label style="${q}"><i class="fas fa-circle-check" style="color:#059669;margin-left:4px;"></i>\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="clinic-attendance-status" style="${R}cursor:pointer;" onfocus="${U}" onblur="${j}">
                                <option value="all" ${l.status==="all"||!l.status?"selected":""}>\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                <option value="present" ${l.status==="present"?"selected":""}>\u062D\u0627\u0636\u0631</option>
                                <option value="partial" ${l.status==="partial"?"selected":""}>\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A</option>
                                <option value="absent" ${l.status==="absent"?"selected":""}>\u063A\u0627\u0626\u0628</option>
                            </select>
                        </div>
                        <div style="${E}">
                            <label style="${q}"><i class="fas fa-calendar-day" style="color:#f59e0b;margin-left:4px;"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                            <input type="date" id="clinic-attendance-from" style="${R}" value="${Utils.escapeAttr(l.dateFrom||"")}" onfocus="${U}" onblur="${j}">
                        </div>
                        <div style="${E}">
                            <label style="${q}"><i class="fas fa-calendar-check" style="color:#3b82f6;margin-left:4px;"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                            <input type="date" id="clinic-attendance-to" style="${R}" value="${Utils.escapeAttr(l.dateTo||"")}" onfocus="${U}" onblur="${j}">
                        </div>
                    </div>
                    ${D?`
                    <div style="margin-top:12px;padding-top:10px;border-top:1px dashed #99f6e4;display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
                        <span style="font-size:0.72rem;color:#64748b;font-weight:600;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0645\u0637\u0628\u0651\u0642\u0629:</span>
                        ${l.search?`<span style="background:#fff;border:1px solid #99f6e4;color:#0f766e;padding:3px 8px;border-radius:999px;font-size:0.72rem;">\u0628\u062D\u062B: ${Utils.escapeHTML(String(l.search).slice(0,24))}</span>`:""}
                        ${l.staffRole&&l.staffRole!=="all"?`<span style="background:#fff;border:1px solid #99f6e4;color:#0f766e;padding:3px 8px;border-radius:999px;font-size:0.72rem;">${Utils.escapeHTML(this.getStaffRoleLabel(l.staffRole))}</span>`:""}
                        ${l.staffId&&l.staffId!=="all"?`<span style="background:#fff;border:1px solid #99f6e4;color:#0f766e;padding:3px 8px;border-radius:999px;font-size:0.72rem;">${Utils.escapeHTML((d.find(T=>String(T.id)===String(l.staffId))||{}).name||l.staffId)}</span>`:""}
                        ${l.month?`<span style="background:#fff;border:1px solid #99f6e4;color:#0f766e;padding:3px 8px;border-radius:999px;font-size:0.72rem;">\u0634\u0647\u0631 ${Utils.escapeHTML(l.month)}</span>`:""}
                        ${l.status&&l.status!=="all"?`<span style="background:#fff;border:1px solid #99f6e4;color:#0f766e;padding:3px 8px;border-radius:999px;font-size:0.72rem;">${Utils.escapeHTML(this.getAttendanceStatusLabel(l.status))}</span>`:""}
                        ${l.dateFrom?`<span style="background:#fff;border:1px solid #99f6e4;color:#0f766e;padding:3px 8px;border-radius:999px;font-size:0.72rem;">\u0645\u0646 ${Utils.escapeHTML(l.dateFrom)}</span>`:""}
                        ${l.dateTo?`<span style="background:#fff;border:1px solid #99f6e4;color:#0f766e;padding:3px 8px;border-radius:999px;font-size:0.72rem;">\u0625\u0644\u0649 ${Utils.escapeHTML(l.dateTo)}</span>`:""}
                    </div>`:""}
                </div>

                <p style="font-size:0.78rem;color:#64748b;margin:0 0 10px;display:flex;align-items:center;gap:6px;">
                    <i class="fas fa-info-circle" style="color:#0d9488;"></i>
                    \u064A\u064F\u0633\u062C\u0651\u064E\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644/\u0627\u0644\u062E\u0631\u0648\u062C. \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0628\u0635\u0645\u0629 \u062F\u062E\u0648\u0644 \u0623\u0648 \u062E\u0631\u0648\u062C \u0645\u0641\u0642\u0648\u062F\u0629 \u0645\u0646 \u0639\u0645\u0648\u062F \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A.
                </p>

                <div class="content-card" id="clinic-attendance-section-records" style="margin:0;">
                    <div class="card-body" style="padding:0;">
                        ${this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
                            <thead><tr>
                                <th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u0628\u0631\u064A\u062F</th><th>\u0627\u0644\u062F\u0648\u0631</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th>\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</th><th>\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</th><th>\u0645\u062F\u0629 (\u0633)</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0627\u0644\u062C\u0644\u0633\u0629</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                            </tr></thead>
                            <tbody>${S}</tbody>
                        </table>`,"48vh")}
                    </div>
                </div>

                ${this.renderClinicStaffActivitiesSection({showUserColumn:!0,activities:h,loading:w,title:"\u0646\u0634\u0627\u0637 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645"})}

                ${this.renderClinicStaffLeaveBalancesSection({balances:o,loading:n,month:s.month,year:s.year})}

                ${this.renderApprovedTimeOffRequestsSection(o,s.month)}

                ${v?`
                <div class="content-card mt-4" id="clinic-attendance-section-staff">
                    <div class="card-header" style="padding:14px 18px;border-bottom:1px solid #f1f5f9;">
                        <h4 style="margin:0;font-size:0.95rem;font-weight:700;color:#134e4a;"><i class="fas fa-users ml-2" style="color:#0d9488;"></i>\u0642\u0627\u0626\u0645\u0629 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</h4>
                    </div>
                    <div class="card-body" style="padding:0;">
                        ${this._clinicAttendanceScrollTable(`<table class="data-table">
                            <thead><tr><th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u062F\u0648\u0631</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th></tr></thead>
                            <tbody>${C}</tbody>
                        </table>`)}
                    </div>
                </div>`:""}
            </div>`;const N=()=>{const T=document.getElementById("clinic-attendance-month")?.value||"";let M=document.getElementById("clinic-attendance-from")?.value||"",I=document.getElementById("clinic-attendance-to")?.value||"";if(T&&!M&&!I){const P=this._getAttendanceMonthRange(T);M=P.dateFrom,I=P.dateTo}else{const P=this._normalizeAttendanceDateRange(M,I);M=P.dateFrom,I=P.dateTo}return{search:document.getElementById("clinic-attendance-search")?.value||"",staffRole:document.getElementById("clinic-attendance-role")?.value||"all",status:document.getElementById("clinic-attendance-status")?.value||"all",staffId:document.getElementById("clinic-attendance-staff")?.value||"all",month:T,dateFrom:M,dateTo:I,period:this.state.filters.attendance?.period||"all"}},H=()=>{this.state.filters.attendance=N.call(this),this.renderAttendanceTab({force:!0})},O=T=>{const M=this._getTodayLocalKey();let I="",P="";if(T==="today")I=M,P=M;else if(T==="week"){const _=new Date;_.setDate(_.getDate()-6),I=this._attendanceDayKey(_),P=M}else if(T==="month"){const _=new Date;_.setDate(_.getDate()-29),I=this._attendanceDayKey(_),P=M}this.state.filters.attendance=Object.assign({},this.state.filters.attendance||{},{period:T,month:"",dateFrom:I,dateTo:P}),this.renderAttendanceTab({force:!0})},B=a.querySelector("#clinic-attendance-search");if(B?.addEventListener("input",T=>{this._attendanceSearchFocused=!0,this._attendanceSearchCursor=T.target.selectionStart,clearTimeout(this._attendanceSearchTimer),this._attendanceSearchTimer=setTimeout(H,280)}),B?.addEventListener("focus",()=>{this._attendanceSearchFocused=!0}),B?.addEventListener("blur",()=>{this._attendanceSearchFocused=!1}),a.querySelector("#clinic-attendance-role")?.addEventListener("change",H),a.querySelector("#clinic-attendance-status")?.addEventListener("change",H),a.querySelector("#clinic-attendance-staff")?.addEventListener("change",H),a.querySelector("#clinic-attendance-month")?.addEventListener("change",()=>{const T=document.getElementById("clinic-attendance-month")?.value||"",M=T?this._getAttendanceMonthRange(T):{dateFrom:"",dateTo:""};this.state.filters.attendance=Object.assign({},N.call(this),{month:T,dateFrom:M.dateFrom,dateTo:M.dateTo,period:"monthPick"}),H()}),a.querySelector("#clinic-attendance-from")?.addEventListener("change",()=>{this.state.filters.attendance=Object.assign({},N.call(this),{month:"",period:"custom"}),H()}),a.querySelector("#clinic-attendance-to")?.addEventListener("change",()=>{this.state.filters.attendance=Object.assign({},N.call(this),{month:"",period:"custom"}),H()}),a.querySelector("#clinic-attendance-reset-filters")?.addEventListener("click",()=>{this.state.filters.attendance={search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.renderAttendanceTab({force:!0})}),a.querySelector("#clinic-attendance-toggle-filters")?.addEventListener("click",()=>{this.state.attendanceFilterPanelOpen=!L;const T=a.querySelector("#clinic-attendance-filter-panel");T&&(T.style.display=this.state.attendanceFilterPanelOpen?"block":"none")}),a.querySelectorAll(".clinic-attendance-period-btn").forEach(T=>{T.addEventListener("click",()=>O(T.dataset.period||"all"))}),a.querySelector("#clinic-attendance-export-btn")?.addEventListener("click",()=>this.exportAttendanceToExcel()),a.querySelector("#clinic-attendance-pdf-btn")?.addEventListener("click",()=>this.exportAttendanceToPDF()),a.querySelector("#clinic-attendance-report-btn")?.addEventListener("click",()=>this.showAttendanceReportModal()),a.querySelector("#clinic-attendance-add-staff-btn")?.addEventListener("click",()=>this.showAddClinicStaffModal()),a.querySelector("#clinic-attendance-add-punch-btn")?.addEventListener("click",()=>this.showAddMissingAttendanceModal()),a.querySelector("#clinic-attendance-refresh-btn")?.addEventListener("click",async()=>{Notification?.info?.("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631..."),this._attendanceDataFetchedInSession=!1,await this.loadClinicAttendanceData(!0),this._attendanceDataFetchedInSession=!0,this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}),this.bindClinicStaffActivitiesEvents(a),this.bindClinicStaffLeaveBalanceEvents(a),this.bindAttendanceQuickNav(a),this.initAttendanceTableScroll(a),this._attendanceSearchFocused&&B){B.focus();const T=this._attendanceSearchCursor;if(T!=null&&typeof B.setSelectionRange=="function")try{B.setSelectionRange(T,T)}catch{}}},hasTabAccess(e){const t=AppState.currentUser;if(!t)return!1;if(this.isCurrentUserAdmin())return!0;if(e==="attendance")return this.canAccessAttendanceTab();if(typeof Permissions<"u"){if(e==="data-analysis"){const a=["data-analysis","analytics","analysis","dataAnalysis","data_analysis"];if(typeof Permissions.hasAccess=="function"&&!Permissions.hasAccess("clinic"))return!1;if(a.some(o=>Permissions.hasDetailedPermission("clinic",o)))return!0;const n=(typeof Permissions.getEffectivePermissions=="function"?Permissions.getEffectivePermissions(t):null)?.clinicPermissions,s=o=>o===!0||o===1||String(o||"").trim().toLowerCase()==="true";return!!n&&typeof n=="object"&&a.some(o=>s(n[o]))}if(!Permissions.hasDetailedPermission("clinic",e))return!1}return!0},renderUI(){const e=document.getElementById("clinic-section");if(!e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u0642\u0633\u0645 clinic-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}const t=AppState.appData;if(!t){e.innerHTML='<div class="content-card"><div class="card-body"><p class="text-gray-600">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div></div>';return}const a=this.getMedications().length,i=this.getSickLeaves().length,n=this.getInjuries().length,s=(t.clinicVisits||[]).length,o=this.isCurrentUserAdmin();this.state.activeTab==="attendance"&&!this.canAccessAttendanceTab()&&(this.state.activeTab=this.hasTabAccess("visits")?"visits":this.hasTabAccess("medications")?"medications":"visits"),e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-clinic-medical ml-3"></i>
                            \u0646\u0638\u0627\u0645 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629
                        </h1>
                        <p class="section-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F\u060C \u0627\u0644\u0623\u062F\u0648\u064A\u0629\u060C \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629\u060C \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A</p>
                    </div>
                    <div class="flex gap-2">
                        ${o?`
                        <button id="clinic-visit-types-settings-btn" class="btn-secondary" title="\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637)">
                            <i class="fas fa-list-ul ml-2"></i>
                            \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                        </button>
                        <button id="clinic-contractor-jobs-settings-btn" class="btn-secondary" title="\u0625\u062F\u0627\u0631\u0629 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637)">
                            <i class="fas fa-briefcase ml-2"></i>
                            \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
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
            </div>

            <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u0631\u064A\u0639\u0629 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div class="content-card">
                    <div class="text-center">
                        <i class="fas fa-hospital text-4xl text-green-600 mb-2"></i>
                        <p class="text-sm text-gray-600">\u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F</p>
                        <p class="text-2xl font-bold">${s}</p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="text-center">
                        <i class="fas fa-pills text-4xl text-blue-600 mb-2"></i>
                        <p class="text-sm text-gray-600">\u0627\u0644\u0623\u062F\u0648\u064A\u0629</p>
                        <p class="text-2xl font-bold">${a}</p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="text-center">
                        <i class="fas fa-calendar-times text-4xl text-orange-600 mb-2"></i>
                        <p class="text-sm text-gray-600">\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629</p>
                        <p class="text-2xl font-bold">${i}</p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="text-center">
                        <i class="fas fa-user-injured text-4xl text-red-600 mb-2"></i>
                        <p class="text-sm text-gray-600">\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A</p>
                        <p class="text-2xl font-bold">${n}</p>
                    </div>
                </div>
            </div>

            <!-- Tabs Navigation -->
            <div class="mt-6">
                <div class="clinic-tabs">
                    ${this.hasTabAccess("visits")?`
                    <button class="clinic-tab-btn ${this.state.activeTab==="visits"?"active":""}" data-tab="visits">
                        <i class="fas fa-hospital ml-2"></i>
                        \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F (${s})
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
                        \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 (${i})
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
                ${this.hasTabAccess("dispensed-medications")?`
                <div class="clinic-tab-panel ${this.state.activeTab==="dispensed-medications"?"active":""}" data-tab-panel="dispensed-medications"></div>
                `:""}
                <div class="clinic-tab-panel ${this.state.activeTab==="injuries"?"active":""}" data-tab-panel="injuries"></div>
                <div class="clinic-tab-panel ${this.state.activeTab==="supply-request"?"active":""}" data-tab-panel="supply-request"></div>
                ${this.hasTabAccess("approvals")?`
                <div class="clinic-tab-panel ${this.state.activeTab==="approvals"?"active":""}" data-tab-panel="approvals"></div>
                `:""}
                ${this.hasTabAccess("data-analysis")?`
                <div class="clinic-tab-panel ${this.state.activeTab==="data-analysis"?"active":""}" data-tab-panel="data-analysis"></div>
                `:""}
                ${this.hasTabAccess("attendance")?`
                <div class="clinic-tab-panel ${this.state.activeTab==="attendance"?"active":""}" data-tab-panel="attendance"></div>
                `:""}
            </div>
        `,this.applyModuleI18n(e),this.renderTabNavigation(),this.renderActiveTabContent(),this.bindTabEvents();const l=document.getElementById("clinic-refresh-btn");l&&l.addEventListener("click",()=>this.refresh());const r=document.getElementById("clinic-register-visit-btn");r&&r.addEventListener("click",()=>{r.disabled||(r.disabled=!0,this.showVisitForm(null,r))});const c=document.getElementById("clinic-visit-types-settings-btn");c&&c.addEventListener("click",()=>this.showVisitTypesSettingsModal());const d=document.getElementById("clinic-contractor-jobs-settings-btn");d&&d.addEventListener("click",()=>this.showContractorJobTitlesSettingsModal()),typeof UI<"u"&&UI.addNavigationIconsAfterRender?UI.addNavigationIconsAfterRender("clinic"):typeof UI<"u"&&UI.addNavigationIcons&&(setTimeout(()=>{UI.addNavigationIcons(e,"clinic")},0),setTimeout(()=>{UI.addNavigationIcons(e,"clinic")},100))},async renderDispensedMedicationsTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="dispensed-medications"]');if(!e){Utils.safeWarn("\u26A0\uFE0F \u0644\u0648\u062D\u0629 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!this.isCurrentUserAdmin()){e.innerHTML='<div class="text-center py-8 text-gray-500">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</div>';return}const{t}=this.getTranslations();this.ensureData();const a=AppState.appData.clinicVisits&&AppState.appData.clinicVisits.length>0;if((!a||a&&AppState.appData.clinicVisits.some(f=>{const u=this.normalizeVisitMedications(f.medications);return(!u||u.length===0)&&(f.medicationsDispensed||f.medicationsDispensedQty&&f.medicationsDispensedQty>0)}))&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){e.innerHTML='<div class="text-center py-8 text-gray-500"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div>';try{await this.loadVisitsDataFromBackend(),this.ensureData(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629")}catch(f){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629:",f.message),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),this.ensureData()}}const n=AppState.appData.clinicVisits||[],s=[];let o=!1;if(n.forEach(f=>{if(!f||typeof f!="object")return;let u=this.normalizeVisitMedications(f.medications);if((!u||u.length===0)&&f.medicationsDispensed&&(u=this.normalizeVisitMedications(f.medicationsDispensed),u&&u.length>0&&(f.medications=u,o=!0,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0644\u0632\u064A\u0627\u0631\u0629 ${f.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,u.length,"\u062F\u0648\u0627\u0621"))),(!u||u.length===0)&&f.medicationsDispensedQty&&f.medicationsDispensedQty>0){const m=parseInt(f.medicationsDispensedQty,10)||0;m>0&&(u=[{medicationName:f.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:m,unit:"\u0648\u062D\u062F\u0629",notes:""}],f.medications=u,o=!0,AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${f.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${m} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629. \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0641\u062A\u0631\u0627\u0636\u064A.`))}u&&u.length>0&&u.forEach(m=>{if(m&&(m.medicationName||m.name)){const g=f.factoryName||this.getVisitFactoryDisplayName(f)||"-",y=f.employeeLocation||f.workArea||f.location||"-";s.push({visitId:f.id,visitDate:f.visitDate||f.createdAt,employeeName:f.employeeName||f.contractorName||f.contractorWorkerName||f.externalName||"",employeeCode:f.employeeCode||f.employeeNumber||"",employeeDepartment:f.employeeDepartment||f.department||"",factory:g,location:y,personType:f.personType||(f.contractorName||f.externalName?"contractor":"employee"),medicationName:m.medicationName||m.name||"",quantity:m.quantity!==null&&m.quantity!==void 0?parseInt(m.quantity,10):0,unit:m.unit||"\u0648\u062D\u062F\u0629",notes:m.notes||""})}})}),o&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0639")}catch(f){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u062D\u0644\u064A\u0627\u064B:",f.message)}if(AppState.debugMode){const f=s.filter(m=>m.personType==="employee"||!m.personType).length,u=s.filter(m=>m.personType==="contractor").length;Utils.safeLog(`\u2705 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629: ${s.length} \u062F\u0648\u0627\u0621 \u0645\u0646 ${n.length} \u0632\u064A\u0627\u0631\u0629 (${f} \u0645\u0648\u0638\u0641\u060C ${u} \u0645\u0642\u0627\u0648\u0644)`)}s.sort((f,u)=>{const m=new Date(f.visitDate);return new Date(u.visitDate)-m});const l=s.map(f=>{let u=f.visitDate||f.createdAt||"";if(u)try{const L=new Date(u);isNaN(L.getTime())&&(u=f.createdAt||"")}catch{u=f.createdAt||""}const m=this.formatDate(u,!0),g=this.getMedications().find(L=>L.name===f.medicationName||L.name?.toLowerCase()===f.medicationName?.toLowerCase()),y=g?.type||"-",v=g?this.calculateMedicationStatus(g):null,h=v?`<span class="badge ${this.getMedicationStatusClasses(v.status)}">${v.status}</span>`:"-",w=v?.status||"\u0633\u0627\u0631\u064A";return`
                <tr class="${this.getMedicationRowClass(w)}">
                    <td>${m}</td>
                    <td>${Utils.escapeHTML(f.employeeCode)}</td>
                    <td>${Utils.escapeHTML(f.employeeName)}</td>
                    <td>${Utils.escapeHTML(f.employeeDepartment)}</td>
                    <td>${Utils.escapeHTML(f.factory||"-")}</td>
                    <td>${Utils.escapeHTML(f.location||"-")}</td>
                    <td>${Utils.escapeHTML(f.medicationName)}</td>
                    <td>${Utils.escapeHTML(y)}</td>
                    <td class="text-center">${f.quantity} ${Utils.escapeHTML(f.unit)}</td>
                    <td class="text-center">${h}</td>
                    <td>${Utils.escapeHTML(f.notes||"-")}</td>
                    <td class="text-center">
                        <button type="button" class="btn-icon btn-icon-primary" data-action="view-visit" data-id="${Utils.escapeHTML(f.visitId||"")}" title="\u0639\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `}).join(""),r=s.length?`
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
            `:this.renderEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u0633\u062C\u0644\u0629.");e.innerHTML=r,this.applyModuleI18n(e),setTimeout(()=>{const f=e.querySelector(".clinic-table-wrapper");f&&this.setupTableScrollListeners(f)},100);const c=e.querySelector("#dispensed-med-search");c&&c.addEventListener("input",f=>{const u=f.target.value.toLowerCase();e.querySelectorAll("tbody tr").forEach(g=>{const y=g.textContent.toLowerCase();g.style.display=y.includes(u)?"":"none"})});const d=e.querySelector("#export-dispensed-med-btn");d&&d.addEventListener("click",()=>this.exportDispensedMedicationsToExcel(s));const p=e.querySelector("#export-dispensed-med-pdf-btn");p&&p.addEventListener("click",()=>this.exportDispensedMedicationsToPDF(s)),e.querySelectorAll('[data-action="view-visit"]').forEach(f=>{f.addEventListener("click",()=>{const u=f.getAttribute("data-id");u&&this.viewVisit(u)})})},exportDispensedMedicationsToExcel(e){if(!e||e.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=e.map((a,i)=>{let n=a.visitDate||a.createdAt||"";if(n)try{const s=new Date(n);isNaN(s.getTime())&&(n=a.createdAt||"")}catch{n=a.createdAt||""}return{\u0645:i+1,"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641":this.formatDate(n,!0),"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":a.employeeCode,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636":a.employeeName,\u0627\u0644\u0625\u062F\u0627\u0631\u0629:a.employeeDepartment,\u0627\u0644\u0645\u0635\u0646\u0639:a.factory||"-",\u0627\u0644\u0645\u0648\u0642\u0639:a.location||"-","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621":a.medicationName,\u0627\u0644\u0643\u0645\u064A\u0629:a.quantity,\u0627\u0644\u0648\u062D\u062F\u0629:a.unit,\u0645\u0644\u0627\u062D\u0638\u0627\u062A:a.notes||""}});try{const a=XLSX.utils.book_new(),i=XLSX.utils.json_to_sheet(t);i["!cols"]=[{wch:5},{wch:18},{wch:14},{wch:22},{wch:18},{wch:16},{wch:18},{wch:28},{wch:10},{wch:10},{wch:20}],XLSX.utils.book_append_sheet(a,i,"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629");const n=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_\u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",a),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+(a?.message||a))}},async exportDispensedMedicationsToPDF(e){if(!e||e.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{Notification?.info?.("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const{success:t,doc:a}=await this._createClinicPdfWithFont({orientation:"landscape",format:"a4",fontUrl:"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf",fontFamily:"Amiri"});if(!t||!a)throw new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 PDF \u0623\u0648 \u0627\u0644\u062E\u0637 \u0627\u0644\u0639\u0631\u0628\u064A");const i=8,n=a.internal.pageSize.getWidth(),s=a.internal.pageSize.getHeight(),o=n/2,l=AppState?.companySettings?.name||AppState?.companySettings?.companyName||"\u0634\u0631\u0643\u0629",r=AppState?.companySettings?.secondaryName||"",c=AppState?.companySettings?.address||"",d=AppState?.companySettings?.phone||"",p=AppState?.companySettings?.email||"",f=AppState?.companySettings?.formVersion||"1.0",u=AppState?.companyLogo||"",m=`CLINIC-DISP-${new Date().toISOString().slice(0,10)}`,g=new Date().toLocaleDateString("ar-SA");let y=8;if(u)try{a.addImage(u,"PNG",i,y-1,15,10)}catch{}const v=i+(u?18:0);a.setFontSize(10),a.setTextColor(15,23,42),a.text(l,v,y+3),r&&(a.setFontSize(7),a.setTextColor(107,114,128),a.text(r,v,y+9));const h=[c,d,p].filter(Boolean).join(" | ");h&&(a.setFontSize(5),a.setTextColor(148,163,184),a.text(h,v,r?y+15:y+9)),a.setFontSize(12),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",n-i,y+3,{align:"right"}),a.setFontSize(5),a.setTextColor(148,163,184),a.text(m,n-i,y+9,{align:"right"});const w=h?r?y+21:y+15:r?y+15:y+9;a.setDrawColor(0,56,101),a.setLineWidth(.6),a.line(i,w,n-i,w),y=w+4,a.setFillColor(0,56,101),a.rect(0,y,n,8,"F"),a.setFontSize(7),a.setTextColor(255),a.text(l,i,y+5.5),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,y+5.5,{align:"center"}),y+=12,a.setFontSize(14),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,y,{align:"center"}),a.setFontSize(7),a.setTextColor(100),a.text(`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631: ${g}`,i,y+7),a.text(`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${e.length}`,n-i,y+7,{align:"right"}),y+=11,a.setFillColor(227,242,253),a.setDrawColor(220),a.setLineWidth(.3),a.roundedRect(i,y,80,13,2,2,"FD"),a.setFillColor(21,101,192),a.rect(i,y,1.5,13,"F"),a.setFontSize(6),a.setTextColor(21,101,192),a.text("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",i+4,y+4.5),a.setFontSize(11),a.setTextColor(13,71,161),a.text(String(e.length),i+76,y+11,{align:"right"}),y+=18;const D=b=>{let A=b.visitDate||b.createdAt||"";if(A)try{isNaN(new Date(A).getTime())&&(A=b.createdAt||"")}catch{A=b.createdAt||""}return this.formatDate(A,!0)};a.autoTable({startY:y,head:[["\u0645","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636","\u0627\u0644\u0625\u062F\u0627\u0631\u0629","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621","\u0627\u0644\u0643\u0645\u064A\u0629","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"]],body:e.map((b,A)=>[A+1,D(b),b.employeeCode||"",b.employeeName||"",b.employeeDepartment||"",b.factory||"-",b.location||"-",b.medicationName||"",(b.quantity||"")+" "+(b.unit||""),b.notes||"-"]),styles:{font:"Amiri",fontSize:7,cellPadding:1.5,halign:"right"},headStyles:{fillColor:[0,56,101],textColor:255,fontSize:7,halign:"center"},alternateRowStyles:{fillColor:[245,247,250]},columnStyles:{0:{halign:"center",cellWidth:8},8:{halign:"center",cellWidth:18}},margin:{left:i,right:i},didDrawPage:function(b){const A=a.internal.getNumberOfPages();a.setFillColor(0,56,101),a.rect(0,0,n,6,"F"),a.setFontSize(6),a.setTextColor(255),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,4.5,{align:"center"}),a.setDrawColor(0,56,101),a.setLineWidth(.3),a.line(i,s-9,n-i,s-9),a.setFontSize(5.5),a.setTextColor(148,163,184),a.text(`\u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${f}`,i,s-5),a.text(m,o,s-5,{align:"center"}),a.text(`${g} | \u0635\u0641\u062D\u0629 ${A}`,n-i,s-5,{align:"right"})}});const L=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_\u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629_${new Date().toISOString().slice(0,10)}.pdf`;a.save(L),Notification?.success?.(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (${e.length} \u0633\u062C\u0644)`)}catch(t){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u062A\u062C\u0631\u0628\u0629 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",t),this._fallbackPrintDispensedMedicationsPDF(e)}},_fallbackPrintDispensedMedicationsPDF(e){const t=e.map((o,l)=>{let r=o.visitDate||o.createdAt||"";if(r)try{const d=new Date(r);isNaN(d.getTime())&&(r=o.createdAt||"")}catch{r=o.createdAt||""}const c=this.formatDate(r,!0);return`<tr>
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
            </tr>`}).join(""),a=`CLINIC-DISPENSED-MEDS-${new Date().toISOString().slice(0,10)}`,i="\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",n=`<table style="width:100%;border-collapse:collapse;font-size:10px;"><thead><tr style="background-color:#f3f4f6;">
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
        </tr></thead><tbody>${t}</tbody></table>`,s=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(a,i,n,!1,!0,{source:"ClinicDispensedMeds"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${i}</title></head><body>${n}</body></html>`;try{const o=new Blob([s],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(o),r=window.open(l,"_blank");r?r.onload=()=>{setTimeout(()=>{r.print(),setTimeout(()=>{URL.revokeObjectURL(l)},1e3),Notification?.success?.("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(l),Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",o),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+(o?.message||o))}},showSupplyRequestForm(){const e=document.getElementById("supply-request-modal");if(e){e.querySelector("#request-type")?.focus();return}const t=document.createElement("div");t.id="supply-request-modal",t.className="modal-overlay",t.innerHTML=`
            ${this.getClinicWorkflowStyles_()}
            <div class="modal-content clinic-workflow-root" role="dialog" aria-modal="true" aria-labelledby="supply-request-modal-title" style="max-width:780px;border-radius:17px;overflow:hidden;box-shadow:0 24px 70px rgba(6,31,55,.3);">
                <div class="modal-header" style="padding:17px 20px;background:linear-gradient(128deg,#0b2d4f,#174d78 66%,#17726e);color:#fff;border:0;">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <span style="width:43px;height:43px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.25);border-radius:12px;background:rgba(255,255,255,.13);"><i class="fas fa-file-medical-alt" style="font-size:18px;"></i></span>
                        <div><h2 id="supply-request-modal-title" class="modal-title" style="margin:0;color:#fff;font-size:1.08rem;">\u0628\u064A\u0627\u0646\u0627\u062A \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u062C\u062F\u064A\u062F</h2><p style="margin:3px 0 0;color:#d9ebf3;font-size:.72rem;">\u0623\u062F\u062E\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C \u0644\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644\u0647 \u0625\u0644\u0649 \u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629</p></div>
                    </div>
                    <button type="button" class="modal-close" aria-label="\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C" style="width:36px;height:36px;border:1px solid rgba(255,255,255,.25);border-radius:10px;background:rgba(255,255,255,.1);color:#fff;"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" style="padding:18px 20px 20px;max-height:76vh;overflow-y:auto;background:#f6fafc;">
                    <div style="display:flex;align-items:flex-start;gap:9px;padding:10px 12px;margin-bottom:14px;border:1px solid #bae6fd;border-radius:10px;background:#f0f9ff;color:#0c4a6e;font-size:.74rem;"><i class="fas fa-info-circle" style="margin-top:2px;"></i><span>\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631 \u0648\u0627\u0644\u0643\u0645\u064A\u0629 \u0628\u062F\u0642\u0629. \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0645\u064A\u0632\u0629 \u0628\u0639\u0644\u0627\u0645\u0629 * \u0645\u0637\u0644\u0648\u0628\u0629.</span></div>
                    <form id="supply-request-form" novalidate>
                        <div class="cw-form-grid">
                            <div class="cw-field"><label class="cw-field-title" for="request-type"><i class="fas fa-tag"></i>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628 *</label><select id="request-type" class="cw-control" required><option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</option><option value="medication">\u0623\u062F\u0648\u064A\u0629</option><option value="equipment">\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629</option><option value="supplies">\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629</option><option value="other">\u0623\u062E\u0631\u0649</option></select></div>
                            <div class="cw-field"><label class="cw-field-title" for="item-name"><i class="fas fa-box-open"></i>\u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 *</label><input type="text" id="item-name" class="cw-control" placeholder="\u0645\u062B\u0627\u0644: \u0628\u0627\u0631\u0627\u0633\u064A\u062A\u0627\u0645\u0648\u0644 500 \u0645\u062C\u0645" autocomplete="off" required><datalist id="supply-medications-datalist"></datalist><small id="supply-medication-match-hint" style="display:none;margin-top:5px;color:#64748b;font-size:.66rem;">\u0627\u0628\u062D\u062B \u0648\u0627\u062E\u062A\u0631 \u062F\u0648\u0627\u0621\u064B \u0645\u0633\u062C\u0644\u0627\u064B \u0644\u0639\u0631\u0636 \u0631\u0635\u064A\u062F\u0647\u060C \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u062F\u0648\u0627\u0621 \u062C\u062F\u064A\u062F.</small></div>
                            <div id="supply-stock-balance-panel" class="cw-field-full" style="display:none;overflow:hidden;border:1px solid #b8ded9;border-radius:12px;background:linear-gradient(135deg,#f0fdfa,#f8fafc);">
                                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border-bottom:1px solid #cce8e4;"><div style="display:flex;align-items:center;gap:8px;color:#134e4a;font-size:.76rem;font-weight:850;"><span style="width:30px;height:30px;display:grid;place-items:center;border-radius:8px;background:#ccfbf1;color:#0f766e;"><i class="fas fa-warehouse"></i></span><span id="supply-stock-medication-name">\u0631\u0635\u064A\u062F \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u062D\u0627\u0644\u064A</span></div><span id="supply-stock-status" style="padding:4px 9px;border-radius:999px;font-size:.66rem;font-weight:800;"></span></div>
                                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px;padding:11px 12px;">
                                    <div style="padding:8px 10px;border-radius:9px;background:#fff;border:1px solid #dcebe8;"><small style="display:block;color:#64748b;font-size:.62rem;">\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u062D</small><strong id="supply-stock-balance" style="display:block;margin-top:2px;color:#0f766e;font-size:1rem;">0</strong></div>
                                    <div style="padding:8px 10px;border-radius:9px;background:#fff;border:1px solid #dcebe8;"><small style="display:block;color:#64748b;font-size:.62rem;">\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629</small><strong id="supply-stock-original" style="display:block;margin-top:2px;color:#334155;font-size:1rem;">0</strong></div>
                                    <div style="padding:8px 10px;border-radius:9px;background:#fff;border:1px solid #dcebe8;"><small style="display:block;color:#64748b;font-size:.62rem;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</small><strong id="supply-stock-expiry" style="display:block;margin-top:3px;color:#334155;font-size:.76rem;">\u2014</strong></div>
                                    <div style="padding:8px 10px;border-radius:9px;background:#fff;border:1px solid #dcebe8;"><small style="display:block;color:#64748b;font-size:.62rem;">\u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0642\u062A\u0631\u062D</small><div style="display:flex;align-items:center;justify-content:space-between;gap:6px;"><strong id="supply-stock-suggested" style="color:#b45309;font-size:1rem;">\u2014</strong><button type="button" id="supply-apply-suggested-qty" style="display:none;padding:3px 7px;border:1px solid #fcd34d;border-radius:6px;background:#fffbeb;color:#92400e;font-size:.62rem;font-weight:750;cursor:pointer;">\u062A\u0637\u0628\u064A\u0642</button></div></div>
                                </div>
                                <p style="margin:0;padding:0 12px 10px;color:#527067;font-size:.65rem;"><i class="fas fa-info-circle ml-1"></i>\u0627\u0644\u0631\u0635\u064A\u062F \u0644\u0644\u0639\u0631\u0636 \u0648\u0627\u062A\u062E\u0627\u0630 \u0627\u0644\u0642\u0631\u0627\u0631 \u0641\u0642\u0637\u061B \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062A\u0648\u0631\u064A\u062F \u0644\u0627 \u064A\u062E\u0635\u0645 \u0645\u0646 \u0627\u0644\u0645\u062E\u0632\u0648\u0646.</p>
                            </div>
                            <div class="cw-field"><label class="cw-field-title" for="quantity"><i class="fas fa-sort-numeric-up"></i>\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 *</label><input type="number" id="quantity" class="cw-control" placeholder="\u0645\u062B\u0627\u0644: 10" min="1" required></div>
                            <div class="cw-field"><label class="cw-field-title" for="unit"><i class="fas fa-ruler"></i>\u0627\u0644\u0648\u062D\u062F\u0629</label><input type="text" id="unit" class="cw-control" placeholder="\u0645\u062B\u0627\u0644: \u0639\u0644\u0628\u0629\u060C \u0639\u0628\u0648\u0629\u060C \u0642\u0637\u0639\u0629"></div>
                            <div class="cw-field"><label class="cw-field-title" for="priority"><i class="fas fa-exclamation-triangle"></i>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label><select id="priority" class="cw-control"><option value="normal">\u0639\u0627\u062F\u064A\u0629</option><option value="high">\u0639\u0627\u0644\u064A\u0629</option><option value="urgent">\u0639\u0627\u062C\u0644\u0629</option></select></div>
                            <div class="cw-field cw-field-full"><label class="cw-field-title" for="request-notes"><i class="fas fa-comment-medical"></i>\u0645\u0644\u0627\u062D\u0638\u0627\u062A / \u0633\u0628\u0628 \u0627\u0644\u0637\u0644\u0628</label><textarea id="request-notes" class="cw-control" rows="3" placeholder="\u0627\u0630\u0643\u0631 \u0633\u0628\u0628 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0635\u0631..."></textarea></div>
                        </div>
                        <div class="cw-form-actions" style="margin-top:18px;"><button type="button" class="cw-secondary supply-request-cancel"><i class="fas fa-times"></i>\u0625\u0644\u063A\u0627\u0621</button><button type="reset" class="cw-secondary"><i class="fas fa-undo-alt"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646</button><button type="submit" class="cw-submit"><i class="fas fa-paper-plane"></i>\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629</button></div>
                    </form>
                </div>
            </div>`,document.body.appendChild(t),this.applyModuleI18n(t);const a=t.querySelector("#supply-request-form"),i=t.querySelector("#request-type"),n=t.querySelector("#item-name"),s=t.querySelector("#unit"),o=t.querySelector("#quantity"),l=t.querySelector("#supply-medications-datalist"),r=t.querySelector("#supply-medication-match-hint"),c=t.querySelector("#supply-stock-balance-panel"),d=new Map;this.getMedications().forEach(h=>{const w=String(h.name||h.medicationName||"").trim(),D=this.normalizeArabicText(w);if(!D)return;const L=d.get(D)||{id:h.id||"",ids:[],name:w,balance:0,original:0,unit:h.unit||h.packageUnit||"\u0648\u062D\u062F\u0629",expiryDates:[]};h.id&&!L.ids.includes(h.id)&&L.ids.push(h.id),L.balance+=Number(h.remainingQuantity??h.quantity??0)||0,L.original+=Number(h.quantityAdded??h.quantity??0)||0,h.expiryDate&&L.expiryDates.push(h.expiryDate),d.set(D,L)}),l&&(l.innerHTML=Array.from(d.values()).sort((h,w)=>h.name.localeCompare(w.name,"ar")).map(h=>`<option value="${Utils.escapeHTML(h.name)}" label="\u0627\u0644\u0631\u0635\u064A\u062F: ${h.balance} ${Utils.escapeHTML(h.unit)}"></option>`).join(""));const p=()=>{n&&(["medicationId","medicationIds","currentBalance","quantityAdded","stockStatus","expiryDate"].forEach(h=>{delete n.dataset[h]}),c&&(c.style.display="none"))},f=()=>{if(!n||i?.value!=="medication"){p();return}const h=d.get(this.normalizeArabicText(n.value));if(!h){p();return}const w=h.expiryDates.slice().sort()[0]||"",D=w?new Date(w).getTime():NaN,L=Number.isFinite(D)&&D<new Date().setHours(0,0,0,0),b=L?"expired":h.balance<=0?"out":h.balance<=10?"low":"available",A=L?Math.max(1,Math.ceil(h.original||h.balance)):h.original>h.balance?Math.ceil(h.original-h.balance):h.balance<=10?Math.max(1,Math.ceil(10-h.balance)):0;n.dataset.medicationId=h.id||h.ids[0]||"",n.dataset.medicationIds=JSON.stringify(h.ids),n.dataset.currentBalance=String(h.balance),n.dataset.quantityAdded=String(h.original),n.dataset.stockStatus=b,n.dataset.expiryDate=w,s&&(!s.value||s.dataset.autoFilled==="1")&&(s.value=h.unit,s.dataset.autoFilled="1");const E=t.querySelector("#supply-stock-medication-name"),R=t.querySelector("#supply-stock-balance"),q=t.querySelector("#supply-stock-original"),U=t.querySelector("#supply-stock-expiry"),j=t.querySelector("#supply-stock-status"),x=t.querySelector("#supply-stock-suggested"),S=t.querySelector("#supply-apply-suggested-qty");if(E&&(E.textContent=h.name),R&&(R.textContent=`${h.balance} ${h.unit}`),q&&(q.textContent=`${h.original} ${h.unit}`),U&&(U.textContent=w?this.formatDate(w):"\u063A\u064A\u0631 \u0645\u0633\u062C\u0644"),j){const $={expired:{label:"\u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629",background:"#fee2e2",color:"#991b1b"},out:{label:"\u0646\u0641\u062F \u0627\u0644\u0645\u062E\u0632\u0648\u0646",background:"#fee2e2",color:"#b91c1c"},low:{label:"\u0631\u0635\u064A\u062F \u0645\u0646\u062E\u0641\u0636",background:"#fef3c7",color:"#92400e"},available:{label:"\u0645\u062A\u0648\u0641\u0631",background:"#dcfce7",color:"#166534"}}[b];j.textContent=$.label,j.style.background=$.background,j.style.color=$.color}x&&(x.textContent=A>0?`${A} ${h.unit}`:"\u0644\u0627 \u064A\u0648\u062C\u062F \u0639\u062C\u0632"),S&&(S.style.display=A>0?"inline-flex":"none",S.dataset.quantity=String(A)),c&&(c.style.display="block")},u=({clearValue:h=!1}={})=>{const w=i?.value==="medication";h&&n&&(n.value=""),n&&(w?n.setAttribute("list","supply-medications-datalist"):n.removeAttribute("list"),n.placeholder=w?"\u0627\u0628\u062D\u062B \u0628\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u0633\u062C\u0644 \u0623\u0648 \u0623\u062F\u062E\u0644 \u062F\u0648\u0627\u0621\u064B \u062C\u062F\u064A\u062F\u064B\u0627":"\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628"),r&&(r.style.display=w?"block":"none"),w||p()};i?.addEventListener("change",()=>u({clearValue:!0})),n?.addEventListener("input",f),n?.addEventListener("change",f),s?.addEventListener("input",()=>{s.dataset.autoFilled="0"}),t.querySelector("#supply-apply-suggested-qty")?.addEventListener("click",h=>{const w=parseInt(h.currentTarget.dataset.quantity,10)||0;o&&w>0&&(o.value=String(w),o.dispatchEvent(new Event("input",{bubbles:!0})),o.focus())}),u();let m=!1,g=!1;const y=h=>{h.key==="Escape"&&v()},v=()=>{g||m&&!confirm("\u064A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629 \u0641\u064A \u0627\u0644\u0637\u0644\u0628. \u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C\u061F")||(document.removeEventListener("keydown",y),t.remove())};a?.addEventListener("input",()=>{m=!0}),a?.addEventListener("reset",()=>{setTimeout(()=>{m=!1,s&&(s.dataset.autoFilled="0"),p(),u()},0)}),a?.addEventListener("submit",async h=>{if(h.preventDefault(),!a.reportValidity())return;const w=a.querySelector('button[type="submit"]'),D=w?.innerHTML||"";if(g=!0,w&&(w.disabled=!0,w.innerHTML='<i class="fas fa-spinner fa-spin"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0631\u0633\u0627\u0644...'),await this.submitSupplyRequest()){document.removeEventListener("keydown",y),t.remove();return}g=!1,w&&(w.disabled=!1,w.innerHTML=D)}),t.querySelectorAll(".modal-close, .supply-request-cancel").forEach(h=>h.addEventListener("click",v)),t.addEventListener("click",h=>{h.target===t&&v()}),document.addEventListener("keydown",y),setTimeout(()=>t.querySelector("#request-type")?.focus(),50)},renderSupplyRequestTab(){const e=document.querySelector('.clinic-tab-panel[data-tab-panel="supply-request"]');if(!e)return;this.ensureData(),AppState.appData.clinicSupplyRequests||(AppState.appData.clinicSupplyRequests=[]);const t=AppState.appData.clinicSupplyRequests.filter(y=>y.requestedBy?.id===AppState.currentUser?.id||y.requestedBy?.email===AppState.currentUser?.email).sort((y,v)=>new Date(v.createdAt||v.requestDate)-new Date(y.createdAt||y.requestDate)),a=this.isCurrentUserAdmin(),i=a?AppState.appData.clinicSupplyRequests.sort((y,v)=>new Date(v.createdAt||v.requestDate)-new Date(y.createdAt||y.requestDate)):t,n=i.filter(y=>(y.status||"pending")==="pending").length,s=i.filter(y=>y.status==="approved"||y.status==="fulfilled").length,o=i.filter(y=>y.status==="rejected").length,l=i.filter(y=>y.priority==="urgent").length;e.innerHTML=`
            ${this.getClinicWorkflowStyles_()}
            <div class="clinic-workflow-root" id="clinic-supply-request-root">
                <section class="cw-hero" aria-labelledby="supply-request-title">
                    <div class="cw-hero-copy"><span class="cw-hero-icon"><i class="fas fa-dolly-flatbed"></i></span><div><h2 id="supply-request-title">\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A</h2><p>\u0623\u0646\u0634\u0626 \u0637\u0644\u0628\u064B\u0627 \u0648\u0627\u0636\u062D\u064B\u0627 \u0648\u062A\u0627\u0628\u0639 \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0645\u0646 \u0645\u0643\u0627\u0646 \u0648\u0627\u062D\u062F</p></div></div>
                    <div class="cw-hero-meta"><span class="cw-hero-pill"><i class="fas fa-list-alt"></i>${i.length} ${a?"\u0637\u0644\u0628 \u0628\u0627\u0644\u0646\u0638\u0627\u0645":"\u0637\u0644\u0628 \u062E\u0627\u0635 \u0628\u0643"}</span><span class="cw-hero-pill"><i class="fas fa-hourglass-half"></i>${n} \u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span><button type="button" id="supply-new-request-btn" class="cw-hero-pill cw-hero-primary"><i class="fas fa-plus"></i>\u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u062C\u062F\u064A\u062F</button></div>
                </section>
                <section class="cw-kpis" aria-label="\u0645\u0644\u062E\u0635 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A">
                    <div class="cw-kpi"><span class="cw-kpi-icon"><i class="fas fa-clock"></i></span><div><small>\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</small><strong>${n}</strong></div></div>
                    <div class="cw-kpi"><span class="cw-kpi-icon"><i class="fas fa-check-circle"></i></span><div><small>\u0645\u0648\u0627\u0641\u0642 \u0623\u0648 \u0645\u0646\u0641\u0630</small><strong>${s}</strong></div></div>
                    <div class="cw-kpi"><span class="cw-kpi-icon"><i class="fas fa-times-circle"></i></span><div><small>\u0637\u0644\u0628\u0627\u062A \u0645\u0631\u0641\u0648\u0636\u0629</small><strong>${o}</strong></div></div>
                    <div class="cw-kpi"><span class="cw-kpi-icon"><i class="fas fa-bolt"></i></span><div><small>\u0637\u0644\u0628\u0627\u062A \u0639\u0627\u062C\u0644\u0629</small><strong>${l}</strong></div></div>
                </section>
                <section class="cw-filter" aria-label="\u0641\u0644\u0627\u062A\u0631 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A">
                    <div class="cw-filter-head"><div class="cw-filter-title"><i class="fas fa-sliders-h"></i>${a?"\u0641\u0644\u062A\u0631\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0637\u0644\u0628\u0627\u062A":"\u0641\u0644\u062A\u0631\u0629 \u0637\u0644\u0628\u0627\u062A\u064A"} <span id="supply-filter-count" class="cw-count-pill">${i.length} \u0637\u0644\u0628</span></div><button type="button" id="supply-reset-filters" class="cw-reset"><i class="fas fa-undo-alt ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631</button></div>
                    <div class="cw-filter-grid">
                        <div class="cw-field"><label for="supply-search-filter"><i class="fas fa-search"></i>\u0628\u062D\u062B \u0628\u0627\u0644\u0639\u0646\u0635\u0631 \u0623\u0648 \u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628</label><div class="cw-input-wrap"><i class="fas fa-search"></i><input type="search" id="supply-search-filter" class="cw-control" placeholder="\u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B..." autocomplete="off"></div></div>
                        <div class="cw-field"><label for="supply-status-filter"><i class="fas fa-tasks"></i>\u0627\u0644\u062D\u0627\u0644\u0629</label><select id="supply-status-filter" class="cw-control"><option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option><option value="pending">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</option><option value="approved">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</option><option value="rejected">\u0645\u0631\u0641\u0648\u0636</option><option value="fulfilled">\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option></select></div>
                        <div class="cw-field"><label for="supply-type-filter"><i class="fas fa-tags"></i>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</label><select id="supply-type-filter" class="cw-control"><option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option><option value="medication">\u0623\u062F\u0648\u064A\u0629</option><option value="equipment">\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629</option><option value="supplies">\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629</option><option value="other">\u0623\u062E\u0631\u0649</option></select></div>
                        <div class="cw-field"><label for="supply-priority-filter"><i class="fas fa-bolt"></i>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label><select id="supply-priority-filter" class="cw-control"><option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0627\u062A</option><option value="urgent">\u0639\u0627\u062C\u0644\u0629</option><option value="high">\u0639\u0627\u0644\u064A\u0629</option><option value="normal">\u0639\u0627\u062F\u064A\u0629</option></select></div>
                    </div>
                </section>
                <section class="cw-table-card"><div class="cw-table-caption"><div><strong>${a?"\u062C\u0645\u064A\u0639 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A":"\u0633\u062C\u0644 \u0637\u0644\u0628\u0627\u062A\u064A"}</strong><span> \u2014 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062D\u0627\u0644\u0629 \u0648\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</span></div><span id="supply-result-pill" class="cw-count-pill">${i.length} \u0637\u0644\u0628</span></div><div id="supply-requests-list-container">${this.renderSupplyRequestsList(i,a)}</div></section>
            </div>
        `,this.applyModuleI18n(e),e.querySelector("#supply-new-request-btn")?.addEventListener("click",()=>this.showSupplyRequestForm());const r=()=>{e.querySelectorAll('[data-action="view-request"]').forEach(y=>{y.addEventListener("click",()=>this.viewSupplyRequest(y.getAttribute("data-id")))}),e.querySelectorAll('[data-action="update-status"]').forEach(y=>{y.addEventListener("click",()=>this.updateSupplyRequestStatus(y.getAttribute("data-id"),y.getAttribute("data-status")))})},c=e.querySelector("#supply-search-filter"),d=e.querySelector("#supply-status-filter"),p=e.querySelector("#supply-type-filter"),f=e.querySelector("#supply-priority-filter"),u=e.querySelector("#supply-reset-filters"),m=e.querySelector("#supply-requests-list-container"),g=()=>{const y=this.normalizeArabicText(c?.value||""),v=d?.value||"all",h=p?.value||"all",w=f?.value||"all",D=i.filter(A=>!(v!=="all"&&(A.status||"pending")!==v||h!=="all"&&A.type!==h||w!=="all"&&(A.priority||"normal")!==w||y&&!this.normalizeArabicText([A.itemName,A.requestedBy?.name,A.requestedByName,A.notes,A.unit].filter(Boolean).join(" ")).includes(y)));m&&(m.innerHTML=this.renderSupplyRequestsList(D,a));const L=e.querySelector("#supply-filter-count"),b=e.querySelector("#supply-result-pill");L&&(L.textContent=`${D.length} \u0645\u0646 ${i.length}`),b&&(b.textContent=`${D.length} \u0637\u0644\u0628`),r()};[d,p,f].forEach(y=>y?.addEventListener("change",g)),c?.addEventListener("input",g),u?.addEventListener("click",()=>{c&&(c.value=""),d&&(d.value="all"),p&&(p.value="all"),f&&(f.value="all"),g()}),r(),setTimeout(()=>{const y=e.querySelector(".clinic-table-wrapper");y&&this.setupTableScrollListeners(y)},100)},renderSupplyRequestsList(e,t){return!e||e.length===0?'<div class="cw-empty"><i class="fas fa-box-open"></i><h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629</h3><p>\u0633\u062A\u0638\u0647\u0631 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0647\u0646\u0627 \u0628\u0639\u062F \u0625\u0631\u0633\u0627\u0644\u0647\u0627 \u0623\u0648 \u0639\u0646\u062F \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0641\u0644\u0627\u062A\u0631.</p></div>':`
            <div class="cw-table-scroll clinic-table-wrapper">
                <table class="cw-table">
                    <thead>
                        <tr>
                            <th class="text-center"><i class="fas fa-hashtag"></i>\u0645</th>
                            <th><i class="fas fa-calendar-alt"></i>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0637\u0644\u0628</th>
                            <th><i class="fas fa-user"></i>\u0645\u0642\u062F\u0645 \u0627\u0644\u0637\u0644\u0628</th>
                            <th><i class="fas fa-tag"></i>\u0627\u0644\u0646\u0648\u0639</th>
                            <th><i class="fas fa-box-open"></i>\u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628</th>
                            <th class="text-center"><i class="fas fa-balance-scale"></i>\u0627\u0644\u0643\u0645\u064A\u0629</th>
                            <th class="text-center"><i class="fas fa-bolt"></i>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</th>
                            <th class="text-center"><i class="fas fa-tasks"></i>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th class="text-center"><i class="fas fa-cogs"></i>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map((i,n)=>{const s=this.formatDate(i.createdAt||i.requestDate,!0),o=i.requestedBy?.name||i.requestedByName||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",l=i.status||"pending",r=i.priority||"normal",c={pending:'<span class="badge badge-warning">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>',approved:'<span class="badge badge-success">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>',rejected:'<span class="badge badge-danger">\u0645\u0631\u0641\u0648\u0636</span>',fulfilled:'<span class="badge badge-info">\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</span>'}[l]||'<span class="badge">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>',d={urgent:'<span class="badge badge-danger">\u0639\u0627\u062C\u0644\u0629</span>',high:'<span class="badge badge-warning">\u0639\u0627\u0644\u064A\u0629</span>',normal:'<span class="badge badge-info">\u0639\u0627\u062F\u064A\u0629</span>'}[r]||'<span class="badge">\u0639\u0627\u062F\u064A\u0629</span>',p={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[i.type]||i.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",f={medication:"fas fa-pills",equipment:"fas fa-stethoscope",supplies:"fas fa-briefcase-medical",other:"fas fa-box"}[i.type]||"fas fa-box",u=[i.type==="medication"&&i.currentBalanceAtRequest!==null&&i.currentBalanceAtRequest!==void 0?`\u0627\u0644\u0631\u0635\u064A\u062F \u0639\u0646\u062F \u0627\u0644\u0637\u0644\u0628: ${i.currentBalanceAtRequest} ${i.unit||"\u0648\u062D\u062F\u0629"}`:"",i.notes||""].filter(Boolean).join(" \u2022 ")||"\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A";return`
                <tr>
                    <td class="text-center"><span class="cw-serial">${n+1}</span></td>
                    <td>${s}</td>
                    <td>${Utils.escapeHTML(o)}</td>
                    <td>${Utils.escapeHTML(p)}</td>
                    <td><div class="cw-main-cell"><span class="cw-cell-icon"><i class="${f}"></i></span><div><strong>${Utils.escapeHTML(i.itemName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</strong><small>${Utils.escapeHTML(u)}</small></div></div></td>
                    <td class="text-center">${i.quantity||""} ${Utils.escapeHTML(i.unit||"")}</td>
                    <td class="text-center">${d}</td>
                    <td class="text-center">${c}</td>
                    <td class="text-center">
                        <div class="cw-actions">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-request" data-id="${Utils.escapeHTML(i.id||"")}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" aria-label="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${t&&l==="pending"?`
                            <button type="button" class="btn-icon btn-icon-success" data-action="update-status" data-id="${Utils.escapeHTML(i.id||"")}" data-status="approved" title="\u0645\u0648\u0627\u0641\u0642\u0629" aria-label="\u0645\u0648\u0627\u0641\u0642\u0629">
                                <i class="fas fa-check"></i>
                            </button>
                            <button type="button" class="btn-icon btn-icon-danger" data-action="update-status" data-id="${Utils.escapeHTML(i.id||"")}" data-status="rejected" title="\u0631\u0641\u0636" aria-label="\u0631\u0641\u0636">
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
        `},async submitSupplyRequest(){const e=document.getElementById("request-type")?.value,t=document.getElementById("item-name")?.value?.trim(),a=parseInt(document.getElementById("quantity")?.value),i=document.getElementById("unit")?.value?.trim()||"\u0648\u062D\u062F\u0629",n=document.getElementById("request-notes")?.value?.trim(),s=document.getElementById("priority")?.value||"normal",o=document.getElementById("item-name"),l=e==="medication"&&o?.dataset.medicationId||"",r=o?.dataset.currentBalance,c=o?.dataset.quantityAdded;if(!e||!t||!a)return Notification?.error?.("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"),!1;Loading.show();try{const d={id:`REQ-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,type:e,itemName:t,quantity:a,unit:i,notes:n,priority:s,status:"pending",medicationId:l||null,currentBalanceAtRequest:l&&r!==void 0?Number(r):null,originalStockAtRequest:l&&c!==void 0?Number(c):null,stockStatusAtRequest:l&&o?.dataset.stockStatus||null,medicationExpiryDate:l&&o?.dataset.expiryDate||null,requestedBy:{id:AppState.currentUser?.id,name:AppState.currentUser?.name,email:AppState.currentUser?.email},createdAt:new Date().toISOString(),requestDate:new Date().toISOString()},p=await GoogleIntegration.sendRequest({action:"addSupplyRequest",data:d});if(p&&p.success)return AppState.appData.clinicSupplyRequests||(AppState.appData.clinicSupplyRequests=[]),AppState.appData.clinicSupplyRequests.push(d),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),this.notifyAdminAboutSupplyRequest(d),typeof UI<"u"&&typeof UI.updateNotificationsBadge=="function"&&UI.updateNotificationsBadge(),this.renderSupplyRequestTab(),this.state.activeTab==="approvals"&&setTimeout(()=>{this.renderApprovalsTab()},500),document.getElementById("supply-request-form")?.reset(),!0;throw new Error(p?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}catch(d){return Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C:",d),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628: "+(d.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")),!1}},viewSupplyRequest(e){const t=AppState.appData.clinicSupplyRequests?.find(n=>n.id===e);if(!t){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
                        ${t.type==="medication"&&t.currentBalanceAtRequest!==null&&t.currentBalanceAtRequest!==void 0?`
                        <div style="padding:9px 11px;border:1px solid #b8ded9;border-radius:9px;background:#f0fdfa;">
                            <label class="text-sm font-semibold" style="color:#0f766e;">\u0627\u0644\u0631\u0635\u064A\u062F \u0639\u0646\u062F \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628</label>
                            <p style="margin:3px 0 0;color:#134e4a;font-weight:800;">${t.currentBalanceAtRequest} ${Utils.escapeHTML(t.unit||"\u0648\u062D\u062F\u0629")}</p>
                        </div>
                        `:""}
                        ${t.type==="medication"&&t.medicationExpiryDate?`
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062F\u0648\u0627\u0621</label>
                            <p class="text-gray-800">${this.formatDate(t.medicationExpiryDate)}</p>
                        </div>
                        `:""}
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
        `,document.body.appendChild(a);const i=()=>a.remove();a.querySelectorAll(".modal-close, .modal-close-btn").forEach(n=>n.addEventListener("click",i)),a.addEventListener("click",n=>{n.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&i()})},updateSupplyRequestStatus(e,t){const a=AppState.appData.clinicSupplyRequests?.find(n=>n.id===e);if(!a){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}a.status=t,a.updatedAt=new Date().toISOString(),a.updatedBy={id:AppState.currentUser?.id,name:AppState.currentUser?.name,email:AppState.currentUser?.email},typeof DataManager<"u"&&DataManager.save&&DataManager.save();const i={approved:"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",rejected:"\u0645\u0631\u0641\u0648\u0636",fulfilled:"\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"}[t]||t;Notification?.success?.(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628 \u0625\u0644\u0649: ${i}`),this.renderSupplyRequestTab()},showEnhancedVisitForm(e=null){if(typeof this.showVisitForm=="function")return this.showVisitForm(e);const t=!!e;this.ensureData();const a=document.createElement("div");a.className="modal-overlay";const i=e?.personType||"employee",n=e?.visitDate?Utils.toDateTimeLocalString(e.visitDate):Utils.toDateTimeLocalString(new Date),s=e?.exitDate?Utils.toDateTimeLocalString(e.exitDate):"",o=new Date;o.setHours(0,0,0,0);const l=(AppState.appData.clinicVisits||[]).filter(m=>{if(!m.visitDate)return!1;try{const g=new Date(m.visitDate);return g.setHours(0,0,0,0),g.getTime()===o.getTime()}catch{return!1}}).length,r=new Date;r.setDate(1),r.setHours(0,0,0,0);const c=(AppState.appData.clinicVisits||[]).filter(m=>{if(!m.visitDate)return!1;try{return new Date(m.visitDate)>=r}catch{return!1}}).length;a.innerHTML=`
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
                                        <option value="employee" ${i==="employee"?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                        <option value="contractor" ${i==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                        <option value="external" ${i==="external"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629</option>
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
                                        ${this.getSiteOptions().map(m=>`
                                            <option value="${m.id}" ${e?.factory===m.id||e?.factory===m.name?"selected":""}>${Utils.escapeHTML(m.name)}</option>
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
                                    <input type="datetime-local" id="enhanced-visit-exit-date" class="form-input" value="${s}" style="border: 2px solid #fc6c85; border-radius: 10px; padding: 12px;">
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
                                        ${(t&&!e?.visitType?["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"]:[]).map(m=>`<option value="${Utils.escapeHTML(m)}" selected>${Utils.escapeHTML(m)}</option>`).join("")}
                                        ${this.getVisitTypeOptions().map(m=>`<option value="${Utils.escapeHTML(m)}" ${(e?.visitType||"")===m?"selected":""}>${Utils.escapeHTML(m)}</option>`).join("")}
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
        `,document.body.appendChild(a),a.addEventListener("click",m=>{m.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()});const d=a.querySelector("#enhanced-visit-form"),p=a.querySelector("#enhanced-visit-person-type");p?.addEventListener("change",()=>{const m=p.value,g=a.querySelector("#enhanced-visit-employee-code-container"),y=a.querySelector("#enhanced-visit-employee-details-container"),v=a.querySelector("#enhanced-visit-employee-code"),h=a.querySelector("#enhanced-visit-employee-name"),w=a.querySelector("#enhanced-visit-employee-name-label"),D=a.querySelector("#enhanced-visit-employee-department"),L=a.querySelector("#enhanced-visit-factory");m==="employee"?(g.style.display="block",y.style.display="grid",v.required=!0,h.readOnly=!0,h.placeholder="\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",w.innerHTML='<i class="fas fa-user text-purple-600"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *',D&&(D.readOnly=!0,D.placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B"),L&&(L.style.display="block")):(g.style.display="none",y.style.display="none",v.required=!1,h.readOnly=!1,h.placeholder=m==="contractor"?"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644",w.innerHTML=`<i class="fas fa-user text-purple-600"></i> ${m==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644"} *`,D&&(D.readOnly=!1,D.placeholder=""),L&&(L.style.display="none"))}),d?.addEventListener("submit",async m=>{m.preventDefault(),await this.saveEnhancedVisit(e,t,a)}),typeof this.setupClinicWorkplaceDatalist=="function"&&this.setupClinicWorkplaceDatalist("enhanced-visit-factory","enhanced-visit-employee-location","enhanced-visit-employee-location-datalist"),a.querySelectorAll(".sidebar-nav-btn").forEach(m=>{m.addEventListener("click",()=>{const y=parseInt(m.getAttribute("data-section"),10),v=a.querySelectorAll(".form-section");v[y]&&v[y].scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})});const g=m.style.borderColor;m.addEventListener("mouseenter",()=>{m.style.background=g,m.style.color="white",m.style.transform="translateX(-5px)"}),m.addEventListener("mouseleave",()=>{m.style.background="white",m.style.color=g,m.style.transform="translateX(0)"})});const u=a.querySelector('button[type="submit"]');u?.addEventListener("mouseenter",()=>{u.style.transform="translateY(-2px)",u.style.boxShadow="0 6px 20px 0 rgba(102, 126, 234, 0.6)"}),u?.addEventListener("mouseleave",()=>{u.style.transform="translateY(0)",u.style.boxShadow="0 4px 15px 0 rgba(102, 126, 234, 0.4)"})},async saveEnhancedVisit(e,t,a){Loading.show();try{const i=document.getElementById("enhanced-visit-person-type").value,n=document.getElementById("enhanced-visit-employee-code")?.value.trim()||"",s=document.getElementById("enhanced-visit-employee-name").value.trim(),o=document.getElementById("enhanced-visit-employee-position")?.value.trim()||"",l=document.getElementById("enhanced-visit-employee-department")?.value.trim()||"",r=document.getElementById("enhanced-visit-factory")?.value.trim()||null,c=document.getElementById("enhanced-visit-employee-location").value.trim(),d=document.getElementById("enhanced-visit-date").value,p=document.getElementById("enhanced-visit-exit-date").value||null,f=document.getElementById("enhanced-visit-type")?.value?.trim()||null,u=document.getElementById("enhanced-visit-reason").value.trim(),m=document.getElementById("enhanced-visit-diagnosis").value.trim(),g=document.getElementById("enhanced-visit-treatment").value.trim();let y=null;if(r){const x=this.getSiteOptions().find(S=>S.id===r);y=x?x.name:null}let v=null,h=null;if(d&&d.trim())try{const[j,x]=d.split("T");if(j&&x){const[S,C,$]=j.split("-").map(Number),[N,H]=x.split(":").map(Number),O=new Date(S,C-1,$,N,H,0,0);isNaN(O.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",d):v=O.toISOString()}else{const S=new Date(d);isNaN(S.getTime())||(v=S.toISOString())}}catch(j){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:",j)}if(p&&p.trim())try{const[j,x]=p.split("T");if(j&&x){const[S,C,$]=j.split("-").map(Number),[N,H]=x.split(":").map(Number),O=new Date(S,C-1,$,N,H,0,0);isNaN(O.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",p):h=O.toISOString()}else{const S=new Date(p);isNaN(S.getTime())||(h=S.toISOString())}}catch(j){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:",j)}if(!AppState.currentUser){Utils.safeError("\u274C \u062E\u0637\u0623: AppState.currentUser \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F! \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u062F\u0648\u0646 \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645."),Notification.error("\u062E\u0637\u0623: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),Loading.hide();return}if(!AppState.currentUser.name&&!AppState.currentUser.email&&!AppState.currentUser.id){Utils.safeError("\u274C \u062E\u0637\u0623: AppState.currentUser \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 name \u0623\u0648 email \u0623\u0648 id!",AppState.currentUser),Notification.error("\u062E\u0637\u0623: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),Loading.hide();return}const w=AppState.currentUser,D=(w?.email||"").toString().toLowerCase().trim(),b=(AppState.appData.users||[]).find(j=>(j.email||"").toString().toLowerCase().trim()===D);let A="";b&&b.name&&b.name.trim()!==""?A=b.name.trim():w?.name&&w.name.trim()!==""?A=w.name.trim():D?A=D:A="\u0645\u0633\u062A\u062E\u062F\u0645";const E=A,R=i==="contractor",q={id:e?.id||Utils.generateId("VISIT"),personType:i,employeeCode:R?null:n,employeeName:R?null:s,employeePosition:R?null:o,employeeDepartment:R?null:l,employeeLocation:R?null:c,contractorName:R?s:null,contractorWorkerName:R?n:null,contractorPosition:R?o:null,factory:r,factoryName:y,workArea:c,visitDate:v,exitDate:h,visitType:f,reason:u,diagnosis:m,treatment:g,medications:[],createdAt:e?.createdAt||new Date().toISOString(),createdBy:A,updatedAt:new Date().toISOString(),updatedBy:E,email:AppState.currentUser?.email||"",userId:AppState.currentUser?.id||""};if(q.createdBy==="\u0627\u0644\u0646\u0638\u0627\u0645"||typeof q.createdBy=="object"&&q.createdBy.name,AppState.debugMode&&(Utils.safeLog("\u{1F50D} formData.createdBy \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0642\u0628\u0644 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 (\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 string):",q.createdBy),Utils.safeLog("\u{1F50D} formData.createdBy type:",typeof q.createdBy)),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),t){const j=AppState.appData.clinicVisits.findIndex(x=>x.id===q.id);j!==-1&&(AppState.appData.clinicVisits[j]=q)}else AppState.appData.clinicVisits.push(q);typeof DataManager<"u"&&DataManager.save&&DataManager.save();try{const j=this.getMonthlyVisitsAlertThreshold(),x=this.getMonthlyVisitCountForPerson(q);if(x>=j){const S=(q.personType||"").toString().toLowerCase()==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0639\u0627\u0645\u0644";typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062A\u0646\u0628\u064A\u0647: \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A "+S+" \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \u0648\u0635\u0644 \u0623\u0648 \u062A\u062C\u0627\u0648\u0632 "+j+" \u0632\u064A\u0627\u0631\u0629. \u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),this.notifyAdminsAboutHighClinicVisits(q,x).catch(function(C){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic: \u0641\u0634\u0644 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0639\u0646 \u062A\u062C\u0627\u0648\u0632 \u062A\u0631\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A:",C)})}}catch(j){Utils.safeWarn("\u0641\u062D\u0635 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0634\u0647\u0631\u064A:",j)}const U=45e3;try{AppState.debugMode&&Utils.safeLog("\u{1F50D} \u0625\u0631\u0633\u0627\u0644 formData \u0625\u0644\u0649 Backend:",{action:t?"updateClinicVisit":"addClinicVisit",createdBy:q.createdBy,createdByType:typeof q.createdBy,createdByName:typeof q.createdBy=="object"?q.createdBy.name:q.createdBy});const j=await GoogleIntegration.sendRequest({action:t?"updateClinicVisit":"addClinicVisit",data:t?{visitId:q.id,updateData:q,__timeoutMs:U}:{...q,__timeoutMs:U}});this.assertClinicVisitRpcResult(j),t||this.applyClinicVisitIdFromServer(q,j),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 formData \u0625\u0644\u0649 Backend \u0628\u0646\u062C\u0627\u062D",j),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),this.refreshClinicVisitsFromServerAfterSave()}catch(j){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 (\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0642\u062F \u062A\u0643\u0648\u0646 \u062D\u064F\u0641\u0638\u062A):",j),Loading.hide();try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("ClinicVisits",AppState.appData.clinicVisits)}catch{}try{this.refreshClinicVisitsFromServerAfterSave()}catch{}return}Loading.hide(),Notification.success(`\u062A\u0645 ${t?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D`),a.remove(),this.state.activeTab==="visits"&&this.renderVisitsTab()}catch(i){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+i.message)}},async handleInjuryAttachmentsChange(e){if(!e||e.length===0)return;const t=Array.from(e),a=["jpg","jpeg","png","pdf"],i=5*1024*1024;for(const s of t){const o=(s.name.split(".").pop()||"").toLowerCase();if(!a.includes(o)){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${s.name} \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645. \u064A\u0633\u0645\u062D \u0628\u0645\u0644\u0641\u0627\u062A JPG \u0623\u0648 PNG \u0623\u0648 PDF \u0641\u0642\u0637.`);continue}if(s.size>i){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${s.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u0633\u0645\u0648\u062D \u0628\u0647 (5MB).`);continue}try{const l=await this.readFileAsBase64(s);this.state.currentInjuryAttachments.push({id:Utils.generateId("ATT"),name:s.name,type:s.type||this.detectMimeType(s.name),data:l,size:Math.round(s.size/1024),uploadedAt:new Date().toISOString()})}catch(l){Utils.safeError("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641:",l),Notification.error(`\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641 ${s.name}`)}}this.renderInjuryAttachmentsPreview();const n=document.getElementById("injury-attachments-input");n&&(n.value="")},renderInjuryAttachmentsPreview(){const e=document.getElementById("injury-attachments-preview");if(e){if(!this.state.currentInjuryAttachments||this.state.currentInjuryAttachments.length===0){e.innerHTML='<p class="text-sm text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642\u0627\u062A \u0628\u0639\u062F</p>';return}e.innerHTML=this.state.currentInjuryAttachments.map((t,a)=>{const i=t.type&&t.type.startsWith("image/"),n=i?"fa-image":"fa-file-pdf",s=t.size||0;return`
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                        <i class="fas ${n} text-blue-600 text-xl"></i>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-800 truncate">${Utils.escapeHTML(t.name)}</p>
                            <p class="text-xs text-gray-500">${s} KB</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        ${i?`
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
        `,document.body.appendChild(a);const i=a.querySelector(".modal-close");i&&i.addEventListener("click",()=>a.remove()),a.addEventListener("click",n=>{n.target===a&&a.remove()})},readFileAsBase64(e){return new Promise((t,a)=>{const i=new FileReader;i.onload=()=>t(i.result),i.onerror=n=>a(n),i.readAsDataURL(e)})},detectMimeType(e){if(!e)return"application/octet-stream";const t=e.split(".").pop().toLowerCase();return{jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",pdf:"application/pdf"}[t]||"application/octet-stream"},cleanup(){try{Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Clinic module..."),this.state.currentInjuryAttachments=[],this.state.medicationAlertsNotified.clear(),this.state.initialized=!1,Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Clinic module")}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 Clinic module:",e)}}};typeof window<"u"&&typeof Clinic<"u"&&(window.Clinic=Clinic),(function(){"use strict";try{typeof window<"u"&&typeof Clinic<"u"&&(window.Clinic=Clinic,window.addEventListener("formSettingsUpdated",function(){try{typeof Clinic<"u"&&Clinic.refreshSiteDropdowns&&Clinic.refreshSiteDropdowns()}catch{}}),Clinic.load,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&(Utils.safeLog("\u2705 Clinic module loaded and available on window.Clinic"),Utils.safeLog("\u2705 Clinic.load function exists: "+(typeof Clinic.load=="function"))))}catch{if(typeof window<"u"&&typeof Clinic<"u")try{window.Clinic=Clinic}catch{}}})();
