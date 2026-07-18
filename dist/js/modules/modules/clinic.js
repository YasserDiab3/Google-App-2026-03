const Clinic={state:{activeTab:"medications",activeVisitType:"employees",activeInjuryType:"employees",filters:{medications:{search:"",status:"all",dateFrom:"",dateTo:""},visits:{search:""},sickLeave:{search:"",department:"",dateFrom:"",dateTo:""},injuries:{search:"",status:"all",department:"",injuryType:"all",injuryBodyPart:"all",dateFrom:"",dateTo:""},attendance:{search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"}},currentInjuryAttachments:[],medicationAlertsNotified:new Set,initialized:!1},_clinicVisitsLoadPromise:null,_visitsBackendFetchOk:!1,getUserDisplayName(t){if(!t)return"-";if(typeof t=="object"&&t!==null){if(t.name&&typeof t.name=="string"&&t.name.trim())return t.name.trim();if(t=t.email||t.id||"",!t)return"-"}const e=String(t).toLowerCase().trim();if(!e)return"-";if(e==="system"||e==="\u0627\u0644\u0646\u0638\u0627\u0645"||e==="admin")return"\u0627\u0644\u0646\u0638\u0627\u0645";if(AppState&&AppState.appData&&Array.isArray(AppState.appData.users)){const a=AppState.appData.users.find(s=>String(s.email||"").toLowerCase().trim()===e||String(s.id||"").toLowerCase().trim()===e||String(s.name||"").toLowerCase().trim()===e);if(a&&a.name)return a.name}return String(t)},processAttachmentUrl(t){if(!t||typeof t!="string")return null;let e=t.trim();const a=/https?:\/\/drive\.google\.com\/uc\?export=view&id=([a-zA-Z0-9_-]+)/,s=e.match(a);return s&&(e="https://lh3.googleusercontent.com/d/"+s[1]),e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")?e:null},getCurrentLanguage(){try{return localStorage.getItem("language")||typeof AppState<"u"&&AppState?.currentLanguage||"ar"}catch{return"ar"}},applyModuleI18n(t){const e=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!e)return;const a=t||document.getElementById("clinic-section")||document;e.applyI18n(a),typeof e.applyLiteralTranslations=="function"&&e.applyLiteralTranslations(a)},getTranslations(){const t=this.getCurrentLanguage(),e=t==="ar",a={ar:{"table.employeeCode":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","table.contractorName":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","table.name":"\u0627\u0644\u0627\u0633\u0645","table.jobTitle":"\u0627\u0644\u0648\u0638\u064A\u0641\u0629","table.factory":"\u0627\u0644\u0645\u0635\u0646\u0639","table.workplace":"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644","table.entryTime":"\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644","table.exitTime":"\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C","table.totalTime":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A","table.reason":"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629","table.diagnosis":"\u0627\u0644\u062A\u0634\u062E\u064A\u0635","table.medications":"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","table.medicationType":"\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621","table.quantity":"\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","table.dispenseDate":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641","table.patientName":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636","table.department":"\u0627\u0644\u0625\u062F\u0627\u0631\u0629","table.medicationStatus":"\u062D\u0627\u0644\u0629 \u0627\u0644\u062F\u0648\u0627\u0621","table.notes":"\u0645\u0644\u0627\u062D\u0638\u0627\u062A","table.actions":"\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A","table.notRecorded":"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647","btn.registerVisit":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629","btn.refresh":"\u062A\u062D\u062F\u064A\u062B","btn.exportExcel":"\u062A\u0635\u062F\u064A\u0631 Excel","btn.exportPDF":"\u062A\u0635\u062F\u064A\u0631 PDF","btn.reset":"\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646","btn.view":"\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644","btn.edit":"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629","tab.visits":"\u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629","tab.employees":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646","tab.contractors":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","tab.dispensedLog":"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629","filter.search":"\u0627\u0644\u0628\u062D\u062B","filter.factory":"\u0627\u0644\u0645\u0635\u0646\u0639","filter.jobTitle":"\u0627\u0644\u0648\u0638\u064A\u0641\u0629","filter.workplace":"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644","filter.all":"\u0627\u0644\u0643\u0644","filter.searchPlaceholder":"\u0627\u0628\u062D\u062B \u0641\u064A \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...","empty.noResults":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0628\u062D\u062B\u0643.","empty.noEmployeeVisits":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0633\u062C\u0644\u0629.","empty.noContractorVisits":"\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0633\u062C\u0644\u0629.","time.lessThanMinute":"\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629","time.minutes":"\u062F\u0642\u064A\u0642\u0629","time.hours":"\u0633\u0627\u0639\u0629","time.days":"\u064A\u0648\u0645"},en:{"table.employeeCode":"Employee Code","table.contractorName":"Contractor Name","table.name":"Name","table.jobTitle":"Job Title","table.factory":"Factory","table.workplace":"Workplace","table.entryTime":"Entry Time","table.exitTime":"Exit Time","table.totalTime":"Total Time","table.reason":"Reason for Visit","table.diagnosis":"Diagnosis","table.medications":"Dispensed Medications","table.medicationType":"Medication Type","table.quantity":"Dispensed Quantity","table.dispenseDate":"Dispense Date","table.patientName":"Patient Name","table.department":"Department","table.medicationStatus":"Medication Status","table.notes":"Notes","table.actions":"Actions","table.notRecorded":"Not Recorded","btn.registerVisit":"Register Visit","btn.refresh":"Refresh","btn.exportExcel":"Export Excel","btn.exportPDF":"Export PDF","btn.reset":"Reset","btn.view":"View Details","btn.edit":"Edit Visit","tab.visits":"Clinic Attendance Record","tab.employees":"Employees","tab.contractors":"Contractors","tab.dispensedLog":"Dispensed Medications Log","filter.search":"Search","filter.factory":"Factory","filter.jobTitle":"Job Title","filter.workplace":"Workplace","filter.all":"All","filter.searchPlaceholder":"Search all data...","empty.noResults":"No results match your search.","empty.noEmployeeVisits":"No employee visits recorded.","empty.noContractorVisits":"No contractor visits recorded.","time.lessThanMinute":"Less than a minute","time.minutes":"minute","time.hours":"hour","time.days":"day"}};return{t:s=>a[t]?.[s]||s,isRTL:e,lang:t}},clinicAnalysisCharts:null,getClinicAnalysisStorageKeys(){return{cards:"clinic_infoCards",items:"clinic_analysisItems"}},getClinicDefaultAnalysisCards(){return[{id:"card_total_visits",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",icon:"fas fa-hospital-user",color:"blue",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629",enabled:!0,mode:"metric",metric:"totalVisits"},{id:"card_total_dispensed_qty",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641",icon:"fas fa-prescription-bottle-alt",color:"green",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0629 \u0645\u0646 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0639\u0628\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",enabled:!0,mode:"metric",metric:"totalDispensedQty"},{id:"card_expired_meds",title:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629",icon:"fas fa-exclamation-triangle",color:"red",description:"\u0639\u062F\u062F \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629",enabled:!0,mode:"metric",metric:"expiredMedications"},{id:"card_low_stock",title:"\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636",icon:"fas fa-box-open",color:"orange",description:"\u0639\u062F\u062F \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0630\u0627\u062A \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0646\u062E\u0641\u0636 (\u2264 10)",enabled:!0,mode:"metric",metric:"lowStockMedications"},{id:"card_visits_with_meds",title:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621",icon:"fas fa-capsules",color:"teal",description:"\u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0645 \u0641\u064A\u0647\u0627 \u0635\u0631\u0641 \u062F\u0648\u0627\u0621 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644",enabled:!1,mode:"metric",metric:"visitsWithMedications"},{id:"card_unique_dispensed",title:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",icon:"fas fa-pills",color:"purple",description:"\u0639\u062F\u062F \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0639\u0628\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",enabled:!1,mode:"metric",metric:"uniqueDispensedMedications"}]},getClinicDefaultAnalysisItems(){return[{id:"visits_by_reason",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",enabled:!0,dataset:"visits",field:"reason",chartType:"auto"},{id:"visits_by_personType",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A)",enabled:!0,dataset:"visits",field:"personType",chartType:"auto"},{id:"visits_by_factory",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0646\u0639",enabled:!1,dataset:"visits",field:"factoryName",chartType:"bar"},{id:"meds_by_status",label:"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!0,dataset:"medications",field:"status",chartType:"doughnut"},{id:"meds_by_type",label:"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",enabled:!1,dataset:"medications",field:"type",chartType:"bar"},{id:"disp_top_meds",label:"\u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0635\u0631\u0641\u0627\u064B (\u0645\u0631\u0627\u062A)",enabled:!0,dataset:"dispensedMedications",field:"medicationName",chartType:"bar"},{id:"disp_by_dept",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",enabled:!1,dataset:"dispensedMedications",field:"department",chartType:"bar"},{id:"disp_by_ptype",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635",enabled:!1,dataset:"dispensedMedications",field:"personType",chartType:"doughnut"},{id:"disp_by_reason",label:"\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u062D\u0633\u0628 \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",enabled:!1,dataset:"dispensedMedications",field:"visitReason",chartType:"bar"},{id:"injuries_by_type",label:"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",enabled:!1,dataset:"injuries",field:"injuryType",chartType:"bar"},{id:"sickleave_by_status",label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!1,dataset:"sickLeave",field:"status",chartType:"doughnut"},{id:"supply_by_status",label:"\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!1,dataset:"supplyRequests",field:"status",chartType:"doughnut"}]},async ensureChartJSLoaded(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"], script[src*="chartjs"]')?new Promise(e=>{const a=setInterval(()=>{typeof Chart<"u"&&(clearInterval(a),e(!0))},100);setTimeout(()=>{clearInterval(a),e(typeof Chart<"u")},5e3)}):new Promise(e=>{const a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",a.crossOrigin="anonymous";let s=!1;const n=i=>{s||(s=!0,e(!!i))};a.onload=()=>setTimeout(()=>n(typeof Chart<"u"),400),a.onerror=()=>{const i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js",i.crossOrigin="anonymous",i.onload=()=>setTimeout(()=>n(typeof Chart<"u"),400),i.onerror=()=>n(!1),document.head.appendChild(i)},setTimeout(()=>n(typeof Chart<"u"),8e3);try{document.head.appendChild(a)}catch{n(!1)}})},injectTableScrollbarStyles(){const t="clinic-table-scrollbar-styles";if(document.getElementById(t))return;const e=document.createElement("style");e.id=t,e.textContent=`
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
        `,document.head.appendChild(e)},setupTableScrollListeners(t){if(!t)return;const e=()=>{const a=t.scrollTop,s=t.scrollLeft,n=t.scrollHeight,i=t.scrollWidth,o=t.clientHeight,l=t.clientWidth;a===0?t.classList.add("scrolled-top"):t.classList.remove("scrolled-top"),a+o>=n-1?t.classList.add("scrolled-bottom"):t.classList.remove("scrolled-bottom"),s===0?t.classList.add("scrolled-left"):t.classList.remove("scrolled-left"),s+l>=i-1?t.classList.add("scrolled-right"):t.classList.remove("scrolled-right")};t.addEventListener("scroll",e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>{e()}).observe(t),e()},_clinicAttendanceScrollTable(t,e){return`<div class="table-wrapper clinic-table-wrapper clinic-attendance-scroll-table" style="overflow-x:auto;overflow-y:auto;max-height:${e||"42vh"};">${t}</div>`},renderAttendanceQuickNav(t){return!Array.isArray(t)||!t.length?"":`<div class="clinic-attendance-quick-nav" id="clinic-attendance-quick-nav">
            <button type="button" class="clinic-attendance-quick-nav-toggle" id="clinic-attendance-quick-nav-toggle" aria-expanded="false" title="\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0627\u0644\u062A\u0645\u0631\u064A\u0631">
                <span><i class="fas fa-list-ul ml-2"></i>\u0627\u0644\u0623\u0642\u0633\u0627\u0645</span>
                <i class="fas fa-chevron-up clinic-attendance-quick-nav-chevron"></i>
            </button>
            <div class="clinic-attendance-quick-nav-panel" id="clinic-attendance-quick-nav-panel" hidden>${t.map(a=>`
            <button type="button" class="clinic-attendance-quick-nav-item" data-target="${Utils.escapeAttr(a.id)}">
                <i class="fas ${Utils.escapeAttr(a.icon||"fa-circle")} ml-2"></i>${Utils.escapeHTML(a.label||"")}
            </button>
        `).join("")}</div>
        </div>`},bindAttendanceQuickNav(t){const e=t?.querySelector("#clinic-attendance-quick-nav");if(!e)return;const a=e.querySelector("#clinic-attendance-quick-nav-toggle"),s=e.querySelector("#clinic-attendance-quick-nav-panel"),n=()=>{e.classList.remove("open"),a&&a.setAttribute("aria-expanded","false"),s&&(s.hidden=!0)},i=()=>{e.classList.add("open"),a&&a.setAttribute("aria-expanded","true"),s&&(s.hidden=!1)};a?.addEventListener("click",o=>{o.stopPropagation(),e.classList.contains("open")?n():i()}),e.querySelectorAll(".clinic-attendance-quick-nav-item").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.target,r=l?document.getElementById(l):null;r&&(r.scrollIntoView({behavior:"smooth",block:"start"}),r.style.transition="box-shadow 0.3s",r.style.boxShadow="0 0 0 3px rgba(13,148,136,0.35)",setTimeout(()=>{r.style.boxShadow=""},1200)),n()})}),this._attendanceQuickNavDocListener||(this._attendanceQuickNavDocListener=o=>{const l=document.querySelector("#clinic-attendance-quick-nav.open");if(l&&!l.contains(o.target)){l.classList.remove("open");const r=l.querySelector("#clinic-attendance-quick-nav-toggle"),c=l.querySelector("#clinic-attendance-quick-nav-panel");r&&r.setAttribute("aria-expanded","false"),c&&(c.hidden=!0)}},document.addEventListener("click",this._attendanceQuickNavDocListener)),this._syncAttendanceQuickNavVisibility()},_syncAttendanceQuickNavVisibility(){const t=this.state?.activeTab==="attendance"&&this.canAccessAttendanceTab();document.querySelectorAll("#clinic-attendance-quick-nav").forEach(e=>{e.style.display=t?"":"none"})},initAttendanceTableScroll(t){this.injectTableScrollbarStyles(),t?.querySelectorAll(".clinic-table-wrapper").forEach(e=>this.setupTableScrollListeners(e))},loadClinicDataAnalysis(){if(!this.isCurrentUserAdmin())return;this.loadClinicInfoCards();const t=this.getClinicAnalysisStorageKeys(),e=localStorage.getItem(t.items)||"[]";let a=[];try{a=JSON.parse(e)||[]}catch{a=[]}(!Array.isArray(a)||a.length===0)&&(localStorage.setItem(t.items,JSON.stringify(this.getClinicDefaultAnalysisItems())),a=this.getClinicDefaultAnalysisItems());const s=document.getElementById("clinic-analysis-items-list");s&&(s.innerHTML=a.map(f=>`
                <div class="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                    <label class="flex items-center cursor-pointer flex-1">
                        <input type="checkbox" class="clinic-analysis-item-checkbox mr-2" data-item-id="${f.id}" ${f.enabled?"checked":""}>
                        <span>${Utils.escapeHTML(f.label||f.id)}</span>
                    </label>
                    <button class="btn-icon btn-icon-danger ml-2" onclick="Clinic.removeClinicAnalysisItem('${f.id}')" title="\u062D\u0630\u0641">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join(""),s.querySelectorAll(".clinic-analysis-item-checkbox").forEach(f=>{f.addEventListener("change",p=>{const m=p.target.getAttribute("data-item-id");this.toggleClinicAnalysisItem(m,p.target.checked)})}));const n=document.getElementById("clinic-manage-cards-btn");n&&(n.onclick=()=>this.showManageClinicCardsModal());const i=document.getElementById("clinic-add-analysis-item-btn");i&&(i.onclick=()=>this.addClinicAnalysisItemFromUI());const o=document.getElementById("clinic-new-analysis-dataset"),l=document.getElementById("clinic-new-analysis-field"),r=document.getElementById("clinic-custom-field-wrap"),c=document.getElementById("clinic-new-analysis-custom-field"),d=()=>{if(!l||!o)return;const f=o.value,m=this.getClinicAnalysisFieldsMap()[f]||[];l.innerHTML=m.map(u=>`<option value="${u.value}">${Utils.escapeHTML(u.label)}</option>`).join("")+'<option value="__custom__">\u062D\u0642\u0644 \u0645\u062E\u0635\u0635...</option>',r&&(r.style.display="none"),c&&(c.value="")};o&&(o.onchange=()=>d()),l&&(l.onchange=()=>{const f=l.value==="__custom__";r&&(r.style.display=f?"block":"none"),!f&&c&&(c.value="")}),o&&l&&l.options.length===0&&d(),this.updateClinicAnalysisResults()},getClinicAnalysisFieldsMap(){return{visits:[{value:"reason",label:"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"},{value:"diagnosis",label:"\u0627\u0644\u062A\u0634\u062E\u064A\u0635"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A)"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"employeePosition",label:"\u0627\u0644\u0648\u0638\u064A\u0641\u0629"},{value:"factoryName",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{value:"workplace",label:"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],medications:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"type",label:"\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621"},{value:"location",label:"\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u062E\u0632\u064A\u0646"}],sickLeave:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],injuries:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"injuryType",label:"\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629"},{value:"injuryLocation",label:"\u0645\u0648\u0642\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629"},{value:"employeeDepartment",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629/\u0627\u0644\u0642\u0633\u0645"},{value:"personType",label:"\u0627\u0644\u0646\u0648\u0639 (\u0645\u0648\u0638\u0641/\u0645\u0642\u0627\u0648\u0644)"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],supplyRequests:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"type",label:"\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628"},{value:"priority",label:"\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],dispensedMedications:[{value:"medicationName",label:"\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621"},{value:"department",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{value:"personType",label:"\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635"},{value:"visitReason",label:"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"},{value:"unit",label:"\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}]}},getClinicDatasetForAnalysis(t){switch(this.ensureData(),t){case"visits":return this.getActualClinicVisits_(AppState.appData.clinicVisits);case"medications":return(Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:[]).map(e=>this.normalizeMedicationRecord(e));case"sickLeave":return Array.isArray(AppState.appData.sickLeave)?AppState.appData.sickLeave:[];case"injuries":return Array.isArray(AppState.appData.injuries)?AppState.appData.injuries:[];case"supplyRequests":return Array.isArray(AppState.appData.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[];case"dispensedMedications":return this.getDispensedMedicationsDataset_(this.getClinicVisitsForAnalysis_());default:return[]}},isTestClinicVisit_(t){if(!t||typeof t!="object")return!1;const e=s=>String(t[s]||"").trim().toLowerCase(),a=e("factoryName")||e("factory");return e("id").startsWith("test-")||e("employeeCode")==="test001"||e("email")==="test@example.com"||e("userId")==="test-user-id"||a==="\u0645\u0635\u0646\u0639 \u0627\u062E\u062A\u0628\u0627\u0631"},getActualClinicVisits_(t){return(Array.isArray(t)?t:[]).filter(e=>!this.isTestClinicVisit_(e))},getClinicVisitsForAnalysis_(){const t=Array.isArray(AppState.appData.clinicVisits)?AppState.appData.clinicVisits:[],e=Array.isArray(AppState.appData.employeeVisits)?AppState.appData.employeeVisits:[],a=Array.isArray(AppState.appData.contractorVisits)?AppState.appData.contractorVisits:[],s=new Set,n=[];return[...t,...e,...a].forEach(i=>{if(!i||this.isTestClinicVisit_(i))return;const o=String(i.id||"").trim();o&&s.has(o)||(o&&s.add(o),n.push(i))}),n},getVisitMedicationsForAnalysis_(t){if(!t)return[];let e=[];if(t.medications&&(e=this.normalizeVisitMedications(t.medications)),(!e||e.length===0)&&t.medicationsDispensed){const a=this.normalizeVisitMedications(t.medicationsDispensed);a&&a.length>0&&(e=a)}if((!e||e.length===0)&&t.medicationsDispensedQty&&t.medicationsDispensedQty>0){const a=parseInt(t.medicationsDispensedQty,10)||0;a>0&&(e=[{medicationName:t.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:a,unit:"\u0648\u062D\u062F\u0629",notes:""}])}return Array.isArray(e)?e:[]},buildMedicationInventoryLookup_(){const t=Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:Array.isArray(AppState.appData.clinicInventory)?AppState.appData.clinicInventory:[],e={};return t.forEach(a=>{const s=this.normalizeMedicationRecord(a),n=String(s.name||s.medicationName||"").trim().toLowerCase();n&&!e[n]&&(e[n]=s)}),e},getDispensedMedicationsDataset_(t){const e=[];return(t||[]).forEach(a=>{const s=this.getVisitMedicationsForAnalysis_(a);if(!s.length)return;const n=String(a.employeeDepartment||a.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",i=String(a.personType||"").toLowerCase(),o=i==="contractor"||i==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",l=String(a.reason||a.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",r=a.visitDate||a.createdAt||"";s.forEach(c=>{e.push({medicationName:c.medicationName,quantity:parseInt(c.quantity,10)||1,unit:c.unit||"\u0648\u062D\u062F\u0629",personType:o,department:n,visitReason:l,visitDate:r,visitId:a.id||""})})}),e},analyzeDispensedMedications_(t,e){const a=this.buildMedicationInventoryLookup_(),s={};let n=0,i=0;const o=new Set,l={},r={\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},c={};(t||[]).forEach(g=>{const y=this.getVisitMedicationsForAnalysis_(g);if(!y.length)return;const v=String(g.id||"").trim()||JSON.stringify([g.visitDate,g.employeeName,g.contractorWorkerName]);o.add(v);const S=String(g.employeeDepartment||g.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",L=String(g.personType||"").toLowerCase(),M=L==="contractor"||L==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",E=new Date(g.visitDate||g.createdAt||""),h=isNaN(E.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${E.getFullYear()}-${String(E.getMonth()+1).padStart(2,"0")}`;y.forEach(I=>{const C=String(I.medicationName||"").trim();if(!C)return;const j=parseInt(I.quantity,10)||1,w=C.toLowerCase(),x=a[w]||null;s[w]||(s[w]={name:C,totalQty:0,dispenseCount:0,visits:new Set,type:x?.type||x?.medicationType||"\u2014",stockRemaining:x?.remainingQuantity??null,stockStatus:x?.status||"\u2014"}),s[w].totalQty+=j,s[w].dispenseCount+=1,s[w].visits.add(v),n+=j,i+=1,l[h]=(l[h]||0)+j,r[M]=(r[M]||0)+j,c[S]=(c[S]||0)+j})});const d=Object.values(s).map(g=>({name:g.name,totalQty:g.totalQty,dispenseCount:g.dispenseCount,visitsCount:g.visits.size,avgQty:g.dispenseCount>0?(g.totalQty/g.dispenseCount).toFixed(1):"0",type:g.type,stockRemaining:g.stockRemaining,stockStatus:g.stockStatus})).sort((g,y)=>y.totalQty-g.totalQty),f=[...d].sort((g,y)=>y.dispenseCount-g.dispenseCount),p=Object.entries(l).filter(([g])=>g!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").sort((g,y)=>g[0].localeCompare(y[0])).slice(-12),m=Object.entries(c).sort((g,y)=>y[1]-g[1]).slice(0,8),u=d.slice(0,10).filter(g=>g.stockRemaining!==null&&g.stockRemaining<=10).map(g=>({...g}));return{totalDispensedQty:n,dispenseLines:i,uniqueMedicines:d.length,visitsWithMedications:o.size,visitsWithoutMedications:Math.max(0,(t||[]).length-o.size),topByQuantity:d,topByFrequency:f,byMonth:{labels:p.map(g=>g[0]),data:p.map(g=>g[1])},byPersonType:r,byDepartment:{labels:m.map(g=>g[0]),data:m.map(g=>g[1])},lowStockHighDemand:u}},getClinicAnalysisValue(t,e,a){if(!a||typeof a!="object")return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(e==="byMonth"){const i=t==="visits"||t==="dispensedMedications"?a.visitDate||a.createdAt:t==="sickLeave"?a.startDate||a.createdAt:t==="injuries"?a.injuryDate||a.createdAt:t==="supplyRequests"?a.createdAt||a.requestDate:a.createdAt||"";if(!i)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const o=new Date(i);return isNaN(o.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}`}if(e==="personType"){const i=(a.personType||"").toString().toLowerCase();return i==="contractor"?"\u0645\u0642\u0627\u0648\u0644":i==="external"?"\u062E\u0627\u0631\u062C\u064A":i==="employee"||i===""?"\u0645\u0648\u0638\u0641":i.includes("\u0645\u0642\u0627\u0648\u0644")?"\u0645\u0642\u0627\u0648\u0644":i.includes("\u062E\u0627\u0631")?"\u062E\u0627\u0631\u062C\u064A":i.includes("\u0645\u0648\u0638")?"\u0645\u0648\u0638\u0641":a.personType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}if(t==="visits"&&e==="workplace")return a.employeeLocation||a.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const s=a[e],n=s==null||s===""?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":String(s).trim();return n&&n!=="null"&&n!=="undefined"?n:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},analyzeClinicByItem(t){const e=t.dataset,a=t.field,s=this.getClinicDatasetForAnalysis(e),n={};let i=0;return s.forEach(o=>{const l=this.getClinicAnalysisValue(e,a,o);n[l]=(n[l]||0)+1,i++}),Object.entries(n).map(([o,l])=>({label:o,count:l,percentage:i>0?(l/i*100).toFixed(1):"0.0"})).sort((o,l)=>l.count-o.count)},async updateClinicAnalysisResults(){const t=document.getElementById("clinic-analysis-results");if(!t)return;const e=this.getClinicAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(e.items)||"[]")||[]}catch{a=[]}const s=(Array.isArray(a)?a:[]).filter(i=>i.enabled);if(s.length===0){t.innerHTML=`
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
            `}),n+="</div>",t.innerHTML=n,setTimeout(async()=>{if(await this.ensureChartJSLoaded()&&typeof Chart<"u")this.renderClinicAnalysisCharts(s);else{const o=document.createElement("div");o.className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4",o.innerHTML=`
                    <div class="flex items-center gap-2">
                        <i class="fas fa-exclamation-triangle text-yellow-600"></i>
                        <p class="text-sm text-yellow-800">
                            <strong>\u0645\u0644\u0627\u062D\u0638\u0629:</strong> \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u062D\u0627\u0644\u064A\u0627\u064B. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0623\u062F\u0646\u0627\u0647.
                        </p>
                    </div>
                `,t.prepend(o)}},250)},renderClinicAnalysisCharts(t){if(typeof Chart>"u")return;this.clinicAnalysisCharts&&Object.values(this.clinicAnalysisCharts).forEach(a=>{a&&typeof a.destroy=="function"&&a.destroy()}),this.clinicAnalysisCharts={};const e=["rgba(59, 130, 246, 0.8)","rgba(16, 185, 129, 0.8)","rgba(245, 158, 11, 0.8)","rgba(239, 68, 68, 0.8)","rgba(139, 92, 246, 0.8)","rgba(236, 72, 153, 0.8)","rgba(20, 184, 166, 0.8)","rgba(251, 146, 60, 0.8)"];t.forEach((a,s)=>{const n=`clinic-chart-${a.id}-${s}`,i=document.getElementById(n);if(!i)return;const o=this.analyzeClinicByItem(a),l=o.slice(0,12).map(f=>f.label),r=o.slice(0,12).map(f=>f.count),c=l.map((f,p)=>e[p%e.length]),d=a.chartType==="auto"?l.length>6?"bar":"doughnut":a.chartType||"bar";try{const f=new Chart(i,{type:d,data:{labels:l,datasets:[{label:a.label||a.id,data:r,backgroundColor:c,borderColor:c.map(p=>p.replace("0.8","1")),borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{padding:12,usePointStyle:!0}},tooltip:{callbacks:{label:function(p){const m=p.label||"",u=p.parsed||0,g=p.dataset.data.reduce((v,S)=>v+S,0),y=g>0?(u/g*100).toFixed(1):0;return`${m}: ${u} (${y}%)`}}}},...d==="bar"?{scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}:{}}});this.clinicAnalysisCharts[n]=f}catch{}})},loadClinicInfoCards(){const t=document.getElementById("clinic-info-cards-container");if(!t)return;const e=this.getClinicAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(e.cards)||"[]")||[]}catch{a=[]}(!Array.isArray(a)||a.length===0)&&(localStorage.setItem(e.cards,JSON.stringify(this.getClinicDefaultAnalysisCards())),a=this.getClinicDefaultAnalysisCards());const s=a.filter(i=>i.enabled);if(s.length===0){t.innerHTML='<p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0643\u0631\u0648\u062A \u0645\u0641\u0639\u0644\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 \u0632\u0631 "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0643\u0631\u0648\u062A" \u0644\u0625\u0636\u0627\u0641\u0629 \u0643\u0631\u0648\u062A \u062C\u062F\u064A\u062F\u0629.</p>';return}const n={blue:"bg-blue-50 border-blue-200 text-blue-800",green:"bg-green-50 border-green-200 text-green-800",red:"bg-red-50 border-red-200 text-red-800",orange:"bg-orange-50 border-orange-200 text-orange-800",purple:"bg-purple-50 border-purple-200 text-purple-800",yellow:"bg-yellow-50 border-yellow-200 text-yellow-800"};t.innerHTML=s.map(i=>{const o=n[i.color]||n.blue,l=i.color||"blue";return`
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
            `}).join(""),this.calculateClinicCardValues()},calculateClinicCardValues(){const t=this.getClinicAnalysisStorageKeys();let e=[];try{e=JSON.parse(localStorage.getItem(t.cards)||"[]")||[]}catch{e=[]}const a=(Array.isArray(e)?e:[]).filter(m=>m.enabled),s=this.getClinicVisitsForAnalysis_(),n=s.length,i=s.reduce((m,u)=>{const g=this.getVisitMedicationsForAnalysis_(u);return m+g.reduce((y,v)=>y+(parseInt(v.quantity,10)||0),0)},0),o=s.filter(m=>this.getVisitMedicationsForAnalysis_(m).length>0).length,l=new Set(s.flatMap(m=>this.getVisitMedicationsForAnalysis_(m).map(u=>String(u.medicationName||"").trim().toLowerCase()).filter(Boolean))).size,r=Array.isArray(AppState.appData.clinicMedications)?AppState.appData.clinicMedications:Array.isArray(AppState.appData.clinicInventory)?AppState.appData.clinicInventory:[],c=r.filter(m=>(m.status||"")==="\u0645\u0646\u062A\u0647\u064A").length,d=r.filter(m=>(m.remainingQuantity??0)<=10&&(m.remainingQuantity??0)>0).length,f=r.length,p={totalVisits:n,totalDispensedQty:i,expiredMedications:c,lowStockMedications:d,totalMedications:f,visitsWithMedications:o,uniqueDispensedMedications:l};a.forEach(m=>{const u=document.getElementById(`clinic-card-value-${m.id}`);if(!u)return;let g=0;if(m.mode==="metric"&&m.metric)g=p[m.metric]??0;else if(m.mode==="countByField"){const y=m.dataset||"visits",v=m.field||"",S=(m.fieldValue||"").toString().trim();g=this.getClinicDatasetForAnalysis(y).filter(M=>{const E=this.getClinicAnalysisValue(y,v,M);if(!S)return E&&E!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const h=String(E||"").toLowerCase().trim(),I=String(S||"").toLowerCase().trim();if(h===I)return!0;if(v==="personType"){if(I==="employee"||I==="\u0645\u0648\u0638\u0641")return h==="\u0645\u0648\u0638\u0641";if(I==="contractor"||I==="\u0645\u0642\u0627\u0648\u0644"||I==="external")return h==="\u0645\u0642\u0627\u0648\u0644"}return h===I}).length}u.textContent=Number(g||0).toLocaleString("en-US")})},showManageClinicCardsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629");return}const t=this.getClinicAnalysisStorageKeys();let e=[];try{e=JSON.parse(localStorage.getItem(t.cards)||"[]")||[]}catch{e=[]}(!Array.isArray(e)||e.length===0)&&(e=this.getClinicDefaultAnalysisCards());const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
                        ${e.map((o,l)=>this.renderClinicCardEditForm(o,l)).join("")}
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

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&s()});const n=a.querySelector("#clinic-cards-list-container"),i=()=>{const o={id:`card_${Date.now()}`,title:"\u0643\u0631\u062A \u062C\u062F\u064A\u062F",icon:"fas fa-info-circle",color:"blue",description:"",enabled:!0,mode:"metric",metric:"totalVisits"},l=document.createElement("div");l.innerHTML=this.renderClinicCardEditForm(o,n?.children?.length||0),n?.appendChild(l.firstElementChild),this.bindClinicCardEditEvents(a)};a.querySelector("#clinic-add-new-card-btn")?.addEventListener("click",i),a.querySelector("#clinic-save-cards-btn")?.addEventListener("click",()=>{const o=a.querySelectorAll(".clinic-card-edit-form"),l=[];o.forEach(r=>{const c=r.getAttribute("data-card-id"),d=r.querySelector('[name="enabled"]')?.checked,f=r.querySelector('[name="title"]')?.value||"",p=r.querySelector('[name="description"]')?.value||"",m=r.querySelector('[name="icon"]')?.value||"fas fa-info-circle",u=r.querySelector('[name="color"]')?.value||"blue",g=r.querySelector('[name="mode"]')?.value||"metric",y=r.querySelector('[name="metric"]')?.value||"totalVisits",v=r.querySelector('[name="dataset"]')?.value||"visits",S=r.querySelector('[name="field"]')?.value||"",L=r.querySelector('[name="fieldValue"]')?.value||"";l.push({id:c,enabled:d,title:f,description:p,icon:m,color:u,mode:g,metric:y,dataset:v,field:S,fieldValue:L})}),localStorage.setItem(t.cards,JSON.stringify(l)),s(),this.loadClinicInfoCards(),this.calculateClinicCardValues(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0643\u0631\u0648\u062A \u0628\u0646\u062C\u0627\u062D")}),this.bindClinicCardEditEvents(a)},renderClinicCardEditForm(t,e){const a=i=>Utils.escapeHTML(i||""),s=[{value:"totalVisits",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A"},{value:"totalDispensedQty",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0646\u0635\u0631\u0641"},{value:"totalMedications",label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u062F\u0648\u064A\u0629"},{value:"expiredMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629"},{value:"lowStockMedications",label:"\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636 (\u226410)"},{value:"visitsWithMedications",label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621"},{value:"uniqueDispensedMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629 \u0645\u0646\u0635\u0631\u0641\u0629"}],n=[{value:"visits",label:"\u0632\u064A\u0627\u0631\u0627\u062A"},{value:"medications",label:"\u0623\u062F\u0648\u064A\u0629 (\u0645\u062E\u0632\u0648\u0646)"},{value:"dispensedMedications",label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 (\u0645\u0646 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A)"},{value:"sickLeave",label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629"},{value:"injuries",label:"\u0625\u0635\u0627\u0628\u0627\u062A"},{value:"supplyRequests",label:"\u0637\u0644\u0628\u0627\u062A \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A"}];return`
            <div class="clinic-card-edit-form border rounded-lg p-4 bg-white" data-card-id="${a(t.id)}">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <label class="flex items-center gap-2 text-sm font-semibold">
                            <input type="checkbox" name="enabled" ${t.enabled?"checked":""}>
                            \u062A\u0641\u0639\u064A\u0644
                        </label>
                        <span class="text-xs text-gray-500">#${e+1}</span>
                    </div>
                    <button type="button" class="btn-icon btn-icon-danger clinic-remove-card-btn" data-card-id="${a(t.id)}" title="\u062D\u0630\u0641">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="clinic-card-${a(t.id)}-title" class="block text-sm font-medium mb-2">\u0627\u0644\u0639\u0646\u0648\u0627\u0646</label>
                        <input type="text" id="clinic-card-${a(t.id)}-title" name="title" class="form-input" value="${a(t.title)}">
                    </div>
                    <div>
                        <label for="clinic-card-${a(t.id)}-icon" class="block text-sm font-medium mb-2">\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 (FontAwesome class)</label>
                        <input type="text" id="clinic-card-${a(t.id)}-icon" name="icon" class="form-input" value="${a(t.icon||"fas fa-info-circle")}">
                    </div>
                    <div class="md:col-span-2">
                        <label for="clinic-card-${a(t.id)}-description" class="block text-sm font-medium mb-2">\u0627\u0644\u0648\u0635\u0641</label>
                        <input type="text" id="clinic-card-${a(t.id)}-description" name="description" class="form-input" value="${a(t.description)}">
                    </div>
                    <div>
                        <label for="clinic-card-${a(t.id)}-color" class="block text-sm font-medium mb-2">\u0627\u0644\u0644\u0648\u0646</label>
                        <select id="clinic-card-${a(t.id)}-color" name="color" class="form-input">
                            ${["blue","green","red","orange","purple","yellow"].map(i=>`<option value="${i}" ${t.color===i?"selected":""}>${i}</option>`).join("")}
                        </select>
                    </div>
                    <div>
                        <label for="clinic-card-${a(t.id)}-mode" class="block text-sm font-medium mb-2">\u0646\u0648\u0639 \u0627\u0644\u0643\u0631\u062A</label>
                        <select id="clinic-card-${a(t.id)}-mode" name="mode" class="form-input clinic-card-mode">
                            <option value="metric" ${t.mode==="metric"?"selected":""}>\u0645\u0624\u0634\u0631 \u062C\u0627\u0647\u0632</option>
                            <option value="countByField" ${t.mode==="countByField"?"selected":""}>\u0639\u062F\u062F \u062D\u0633\u0628 \u062D\u0642\u0644</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 clinic-card-metric-wrap" style="display:${t.mode==="metric"?"grid":"none"}">
                    <div class="md:col-span-2">
                        <label for="clinic-card-${a(t.id)}-metric" class="block text-sm font-medium mb-2">\u0627\u0644\u0645\u0624\u0634\u0631</label>
                        <select id="clinic-card-${a(t.id)}-metric" name="metric" class="form-input">
                            ${s.map(i=>`<option value="${i.value}" ${t.metric===i.value?"selected":""}>${a(i.label)}</option>`).join("")}
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 clinic-card-field-wrap" style="display:${t.mode==="countByField"?"grid":"none"}">
                    <div>
                        <label for="clinic-card-${a(t.id)}-dataset" class="block text-sm font-medium mb-2">\u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</label>
                        <select id="clinic-card-${a(t.id)}-dataset" name="dataset" class="form-input">
                            ${n.map(i=>`<option value="${i.value}" ${t.dataset===i.value?"selected":""}>${a(i.label)}</option>`).join("")}
                        </select>
                    </div>
                    <div>
                        <label for="clinic-card-${a(t.id)}-field" class="block text-sm font-medium mb-2">\u0627\u0644\u062D\u0642\u0644</label>
                        <input type="text" id="clinic-card-${a(t.id)}-field" name="field" class="form-input" placeholder="\u0645\u062B\u0627\u0644: status / reason" value="${a(t.field)}">
                    </div>
                    <div>
                        <label for="clinic-card-${a(t.id)}-fieldValue" class="block text-sm font-medium mb-2">\u0627\u0644\u0642\u064A\u0645\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                        <input type="text" id="clinic-card-${a(t.id)}-fieldValue" name="fieldValue" class="form-input" placeholder="\u0625\u0630\u0627 \u062A\u064F\u0631\u0643 \u0641\u0627\u0631\u063A\u064B\u0627 = \u0623\u064A \u0642\u064A\u0645\u0629" value="${a(t.fieldValue)}">
                    </div>
                </div>
            </div>
        `},bindClinicCardEditEvents(t){t.querySelectorAll(".clinic-remove-card-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-card-id");confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0643\u0631\u062A\u061F")&&t.querySelector(`.clinic-card-edit-form[data-card-id="${a}"]`)?.remove()})}),t.querySelectorAll(".clinic-card-mode").forEach(e=>{e.addEventListener("change",()=>{const a=e.closest(".clinic-card-edit-form");if(!a)return;const s=a.querySelector(".clinic-card-metric-wrap"),n=a.querySelector(".clinic-card-field-wrap"),i=e.value;s&&(s.style.display=i==="metric"?"grid":"none"),n&&(n.style.display=i==="countByField"?"grid":"none")})})},addClinicAnalysisItemFromUI(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const t=document.getElementById("clinic-new-analysis-dataset"),e=document.getElementById("clinic-new-analysis-field"),a=document.getElementById("clinic-new-analysis-custom-field"),s=document.getElementById("clinic-new-analysis-label"),n=document.getElementById("clinic-new-analysis-charttype"),i=t?.value||"visits";let o=e?.value||"";o==="__custom__"&&(o=(a?.value||"").trim());const l=(s?.value||"").trim(),r=n?.value||"auto";if(!o){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631/\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062D\u0642\u0644");return}if(!l){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F");return}const c=this.getClinicAnalysisStorageKeys();let d=[];try{d=JSON.parse(localStorage.getItem(c.items)||"[]")||[]}catch{d=[]}Array.isArray(d)||(d=[]);const f={id:`custom_${Date.now()}`,label:l,enabled:!0,dataset:i,field:o,chartType:r};d.push(f),localStorage.setItem(c.items,JSON.stringify(d)),s&&(s.value=""),a&&(a.value=""),Notification?.success?.("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D"),this.loadClinicDataAnalysis()},toggleClinicAnalysisItem(t,e){if(!this.isCurrentUserAdmin())return;const a=this.getClinicAnalysisStorageKeys();let s=[];try{s=JSON.parse(localStorage.getItem(a.items)||"[]")||[]}catch{s=[]}const n=(Array.isArray(s)?s:[]).find(i=>i.id===t);n&&(n.enabled=e,localStorage.setItem(a.items,JSON.stringify(s)),this.updateClinicAnalysisResults())},removeClinicAnalysisItem(t){if(!this.isCurrentUserAdmin()||!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0646\u062F\u061F"))return;const e=this.getClinicAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(e.items)||"[]")||[]}catch{a=[]}const s=(Array.isArray(a)?a:[]).filter(n=>n.id!==t);localStorage.setItem(e.items,JSON.stringify(s)),this.loadClinicDataAnalysis(),Notification?.success?.("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")},calculateMedicationStatus(t){const e=new Date;e.setHours(0,0,0,0);let a=null;t.expiryDate&&(a=new Date(t.expiryDate),Number.isNaN(a.getTime())&&(a=new Date(t.expiryDate)),a.setHours(0,0,0,0));const n=parseFloat(t.remainingQuantity??t.quantity??0)>0;let i="\u0633\u0627\u0631\u064A",o=null;if(a&&!Number.isNaN(a.getTime())){const l=a.getTime()-e.getTime();o=Math.ceil(l/864e5),o<0?i="\u0645\u0646\u062A\u0647\u064A":o<=30&&(i=n?"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"\u0633\u0627\u0631\u064A")}return{status:i,daysRemaining:o}},getMedicationStatusClasses(t){return t==="\u0645\u0646\u062A\u0647\u064A"?"bg-red-100 text-red-700":t==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"bg-yellow-100 text-yellow-700":"bg-green-100 text-green-700"},getMedicationStatusHint(t={}){return!t||t.daysRemaining===null||t.daysRemaining===void 0?"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u062F\u0648\u0627\u0621":t.daysRemaining<0?"\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062F\u0648\u0627\u0621\u060C \u064A\u0631\u062C\u0649 \u0627\u062A\u062E\u0627\u0630 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0641\u0648\u0631\u0627\u064B":t.daysRemaining===0?"\u064A\u0646\u062A\u0647\u064A \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u064A\u0648\u0645\u060C \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0623\u0648 \u0627\u0644\u062A\u062E\u0644\u0635 \u0645\u0646\u0647 \u062D\u0633\u0628 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629":t.daysRemaining<=30?`\u062A\u0628\u0642\u0649 ${t.daysRemaining} \u064A\u0648\u0645${t.daysRemaining===1?"":"\u0627\u064B"} \u0639\u0644\u0649 \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629`:`\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0633\u0627\u0631\u064A\u0629\u060C \u064A\u062A\u0628\u0642\u0649 ${t.daysRemaining} \u064A\u0648\u0645\u064B\u0627 \u062A\u0642\u0631\u064A\u0628\u064B\u0627`},getInjuryStatusBadgeClass(t){return t==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"badge-success":t==="\u0645\u063A\u0644\u0642"?"badge-info":"badge-warning"},getInjuryRowClass(t){return t==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"bg-green-50":t==="\u0645\u063A\u0644\u0642"?"bg-gray-50":"bg-red-50"},viewInjuryRecord(t){const e=this.getInjuries().find(y=>y.id===t);if(!e){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}const a=String(e.personType||"employee").toLowerCase(),s=a==="contractor"||a==="external",n=e.employeeName||e.personName||"",i=e.contractorName||"",o=e.employeeCode||e.employeeNumber||"",l=e.employeePosition||e.contractorPosition||"\u2014",r=e.department||e.employeeDepartment||"\u2014",c=e.factoryName||e.factory||"\u2014",d=e.subLocationName||e.subLocation||"\u2014",f=e.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",p=Array.isArray(e.attachments)?e.attachments:[],m=p.length?p.map((y,v)=>{const S=y.type&&(y.type.startsWith("image/")||/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(y.name||"")),L=this.processAttachmentUrl(y.data);return S&&L?`
                        <div class="bg-white border border-blue-100 rounded-xl p-3 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-image text-blue-500"></i>
                                    <div>
                                        <div class="text-sm font-medium text-gray-700">${Utils.escapeHTML(y.name||`\u0635\u0648\u0631\u0629 ${v+1}`)}</div>
                                        <div class="text-xs text-gray-500">${y.size||0} KB</div>
                                    </div>
                                </div>
                                <a href="${L}" download="${Utils.escapeHTML(y.name||`attachment-${v+1}`)}" class="btn-icon btn-icon-primary" title="\u062A\u062D\u0645\u064A\u0644">
                                    <i class="fas fa-download"></i>
                                </a>
                            </div>
                            <img src="${Utils.escapeHTML(L)}" alt="${Utils.escapeHTML(y.name||"")}" class="max-w-full h-auto rounded border" style="max-height: 250px;"
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
                            <a href="${L||y.data}" download="${Utils.escapeHTML(y.name||`attachment-${v+1}`)}" class="btn-icon btn-icon-primary" title="\u062A\u062D\u0645\u064A\u0644">
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
                            <p class="text-gray-900 mt-1">${this.formatDate(e.injuryDate,!0)}</p>
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
                                <span class="badge ${this.getInjuryStatusBadgeClass(f)}">${Utils.escapeHTML(f)}</span>
                            </p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</span>
                            <p class="text-gray-900 mt-1">${Utils.escapeHTML(e.injuryType||"\u2014")}</p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <span class="text-xs font-semibold text-gray-600">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645)</span>
                            <p class="text-gray-900 mt-1">${Utils.escapeHTML(e.injuryBodyPart||"\u2014")}</p>
                        </div>
                        <div class="rounded-xl border border-gray-200 bg-white p-3 shadow-sm lg:col-span-2">
                            <span class="text-xs font-semibold text-gray-600">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</span>
                            <p class="text-gray-900 mt-1">${Utils.escapeHTML(e.injuryLocation||"\u2014")}</p>
                        </div>
                    </div>

                    <div class="rounded-xl border border-red-100 bg-white p-4 shadow-sm">
                        <span class="text-sm font-semibold text-red-700 block mb-1">\u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</span>
                        <p class="text-gray-800 whitespace-pre-line leading-7">${Utils.escapeHTML(e.injuryDescription||"\u2014")}</p>
                    </div>

                    ${e.actionsTaken?`
                        <div class="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                            <span class="text-sm font-semibold text-amber-700 block mb-1">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629</span>
                            <p class="text-gray-800 whitespace-pre-line leading-7">${Utils.escapeHTML(e.actionsTaken||"")}</p>
                    </div>
                    `:""}
                    ${e.treatment?`
                        <div class="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                            <span class="text-sm font-semibold text-emerald-700 block mb-1">\u0627\u0644\u0639\u0644\u0627\u062C</span>
                            <p class="text-gray-800 whitespace-pre-line leading-7">${Utils.escapeHTML(e.treatment||"")}</p>
                        </div>
                    `:""}

                    <div class="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                        <span class="text-sm font-semibold text-blue-700 mb-2 block">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</span>
                        <div class="space-y-2">
                            ${m}
                        </div>
                    </div>

                    <div class="text-sm text-gray-500 border-t border-gray-200 pt-3">
                        <span class="font-medium">\u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629:</span> ${Utils.escapeHTML(this.getUserDisplayName(e.createdBy))}
                        ${e.createdAt?`<span class="ml-2">\u0628\u062A\u0627\u0631\u064A\u062E ${this.formatDate(e.createdAt,!0)}</span>`:""}
                    </div>
                </div>
                <div class="modal-footer form-actions-centered" style="background: #f8fafc;">
                    <button type="button" class="btn-secondary modal-close-btn">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" class="btn-primary modal-edit-btn">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(u);const g=()=>u.remove();u.querySelectorAll(".modal-close, .modal-close-btn").forEach(y=>y.addEventListener("click",g)),u.querySelector(".modal-edit-btn")?.addEventListener("click",()=>{g(),this.showInjuryForm(e)}),u.addEventListener("click",y=>{y.target===u&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&g()})},editInjury(t){const e=this.getInjuries().find(a=>a.id===t);if(!e){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}this.showInjuryForm(e)},exportInjuriesToExcel(){const t=this.getFilteredInjuries();if(t.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=t.map(i=>({"\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628":i.employeeName||i.personName||"",\u0627\u0644\u0642\u0633\u0645:i.department||i.employeeDepartment||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629":this.formatDate(i.injuryDate,!0),"\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629":i.injuryType||"","\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629":i.injuryLocation||"",\u0627\u0644\u062D\u0627\u0644\u0629:i.status||"","\u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A":Array.isArray(i.attachments)?i.attachments.length:0,"\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629":i.actionsTaken||"",\u0627\u0644\u0639\u0644\u0627\u062C:i.treatment||""})),a=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(e);XLSX.utils.book_append_sheet(a,s,"Injuries");const n=`Clinic_Injuries_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n)},exportInjuriesToPDF(){const t=this.getFilteredInjuries();if(t.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const a=`
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
                    ${t.map(i=>`
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
        `,s=`INJURIES-REPORT-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const i=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(i){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629:",i),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629")}},normalizeMedicationRecord(t={}){const e=(L,M=0)=>{if(L==null)return M;if(typeof L=="number")return Number.isFinite(L)?L:M;if(typeof L=="string"){const E=L.trim();if(!E)return M;const h=E.replace(/[, ]+/g,""),I=Number(h);return Number.isFinite(I)?I:M}return M},a=t.id||Utils.generateId("MED"),s=t.name||t.medicationName||"",n=t.type||t.medicationType||t.category||"",i=t.purchaseDate||t.buyDate||t.createdAt||new Date().toISOString(),o=t.productionDate||"",l=t.expiryDate||t.endDate||"",r=t.quantityAdded!==void 0&&t.quantityAdded!==null?e(t.quantityAdded,0):t.initialQuantity!==void 0&&t.initialQuantity!==null?e(t.initialQuantity,0):e(t.quantity,0),c=t.remainingQuantity!==void 0&&t.remainingQuantity!==null?e(t.remainingQuantity,0):t.quantityRemaining!==void 0&&t.quantityRemaining!==null?e(t.quantityRemaining,0):e(t.quantity,0),d=t.location||t.storageLocation||"",f=t.createdAt||new Date().toISOString(),p=t.updatedAt||f,m=typeof t.createdBy=="string"&&t.createdBy.trim()!==""?{id:t.createdById||"",name:t.createdBy.trim()}:t.createdBy||this.getCurrentUserSummary(t.createdBy),u=t.createdById||m?.id||AppState.currentUser?.id||"",g=typeof t.updatedBy=="string"&&t.updatedBy.trim()!==""?{id:"",name:t.updatedBy.trim()}:t.updatedBy||this.getCurrentUserSummary(t.updatedBy),y=t.notes||t.description||"",v=t.usage||"",S=this.calculateMedicationStatus({expiryDate:l});return{id:a,name:s,type:n,usage:v,purchaseDate:i,productionDate:o,expiryDate:l,quantityAdded:e(r,0),remainingQuantity:e(c,0),location:d,notes:y,createdBy:m,createdById:u,createdAt:f,updatedAt:p,updatedBy:g,status:t.status||S.status,daysRemaining:t.daysRemaining!==void 0?t.daysRemaining:S.daysRemaining}},normalizeSickLeaveRecord(t={}){const e=t.id||Utils.generateId("SICK_LEAVE"),a=t.personType||"employee",s=t.startDate?new Date(t.startDate).toISOString():new Date().toISOString(),n=t.endDate?new Date(t.endDate).toISOString():s,i=t.createdAt||new Date().toISOString(),o=t.updatedAt||i,l=t.createdBy||this.getCurrentUserSummary(t.createdBy),r=t.createdById||l?.id||AppState.currentUser?.id||"",c=t.updatedBy||this.getCurrentUserSummary(t.updatedBy),d=this.calculateSickLeaveDays(s,n);return{id:e,personType:a,employeeName:t.employeeName||t.personName||"",employeeCode:t.employeeCode||t.employeeNumber||"",employeeNumber:t.employeeNumber||t.employeeCode||"",employeePosition:t.employeePosition||t.position||"",employeeDepartment:t.employeeDepartment||t.department||"",reason:t.reason||"",medicalNotes:t.medicalNotes||t.notes||"",treatingDoctor:t.treatingDoctor||t.doctor||"",startDate:s,endDate:n,daysCount:d,createdBy:l,createdById:r,createdAt:i,updatedAt:o,updatedBy:c}},normalizeInjuryRecord(t={}){const e=t.id||Utils.generateId("INJURY"),a=t.personType||"employee",s=t.injuryDate?new Date(t.injuryDate).toISOString():new Date().toISOString(),n=t.createdAt||new Date().toISOString(),i=t.updatedAt||n,o=t.createdBy||this.getCurrentUserSummary(t.createdBy),l=t.createdById||o?.id||AppState.currentUser?.id||"",r=t.updatedBy||this.getCurrentUserSummary(t.updatedBy),c=Array.isArray(t.attachments)?t.attachments.map(d=>this.normalizeAttachment(d)).filter(Boolean):[];return{id:e,personType:a,employeeName:t.employeeName||"",contractorName:t.contractorName||"",personName:t.personName||t.employeeName||"",employeeCode:t.employeeCode||t.employeeNumber||"",employeeNumber:t.employeeNumber||t.employeeCode||"",employeePosition:t.employeePosition||t.contractorPosition||t.position||"",contractorPosition:t.contractorPosition||t.employeePosition||t.position||"",employeeDepartment:t.employeeDepartment||t.department||"",department:t.department||t.employeeDepartment||"",factory:t.factory||"",factoryName:t.factoryName||"",subLocation:t.subLocation||t.subLocationName||"",subLocationName:t.subLocationName||t.subLocation||"",injuryDate:s,injuryType:t.injuryType||t.type||"",injuryBodyPart:t.injuryBodyPart||"",injuryLocation:t.injuryLocation||t.location||"",injuryDescription:t.injuryDescription||t.description||"",actionsTaken:t.actionsTaken||t.actions||"",treatment:t.treatment||"",status:t.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",attachments:c,createdBy:o,createdById:l,createdAt:n,updatedAt:i,updatedBy:r}},normalizeAttachment(t){if(!t)return null;const e=t.data||t.base64||"";if(!e)return null;const a=t.size||Math.round(e.length*3/4/1024);return{id:t.id||Utils.generateId("ATT"),name:t.name||t.fileName||"attachment",type:t.type||t.mimeType||"application/octet-stream",data:e,size:a,uploadedAt:t.uploadedAt||new Date().toISOString()}},calculateSickLeaveDays(t,e){try{const a=new Date(t),s=new Date(e);if(Number.isNaN(a.getTime())||Number.isNaN(s.getTime()))return 1;const n=s.getTime()-a.getTime();return n>=0?Math.floor(n/864e5)+1:1}catch{return 1}},formatDate(t,e=!1){if(!t)return"-";try{return e?Utils.formatDateTime(t):Utils.formatDate(t)}catch{return"-"}},getMedications(){return Array.isArray(AppState.appData?.medications)&&AppState.appData.medications.length>0?AppState.appData.medications:Array.isArray(AppState.appData?.clinicMedications)&&AppState.appData.clinicMedications.length>0?AppState.appData.clinicMedications:Array.isArray(AppState.appData?.clinicInventory)&&AppState.appData.clinicInventory.length>0?AppState.appData.clinicInventory:[]},getSickLeaves(){return Array.isArray(AppState.appData?.sickLeave)?AppState.appData.sickLeave:[]},getInjuries(){return Array.isArray(AppState.appData?.injuries)?AppState.appData.injuries:[]},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(t=>({id:t.id,name:t.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(t=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((t,e)=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||`\u0645\u0648\u0642\u0639 ${e+1}`})):[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t),[]}},getPlaceOptions(t){try{if(!t)return[];if(!this.getSiteOptions().find(s=>s.id===t))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const s=Permissions.formSettingsState.sites.find(n=>n.id===t);if(s&&Array.isArray(s.places))return s.places.map(n=>({id:n.id,name:n.name}))}if(Array.isArray(AppState.appData?.observationSites)){const s=AppState.appData.observationSites.find(n=>(n.id||n.siteId)===t);if(s)return(Array.isArray(s.places)?s.places:Array.isArray(s.locations)?s.locations:Array.isArray(s.children)?s.children:Array.isArray(s.areas)?s.areas:[]).map((i,o)=>({id:i.id||i.placeId||i.value||Utils.generateId("PLACE"),name:i.name||i.placeName||i.title||i.label||i.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const s=DailyObservations.DEFAULT_SITES.find(n=>(n.id||n.siteId)===t);if(s)return(Array.isArray(s.places)?s.places:Array.isArray(s.locations)?s.locations:Array.isArray(s.children)?s.children:Array.isArray(s.areas)?s.areas:[]).map((i,o)=>({id:i.id||i.placeId||i.value||Utils.generateId("PLACE"),name:i.name||i.placeName||i.title||i.label||i.locationName||`\u0645\u0643\u0627\u0646 ${o+1}`}))}return[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 (\u0627\u0644\u0639\u064A\u0627\u062F\u0629):",e),[]}},setupClinicWorkplaceDatalist(t,e,a,s={}){const n=s.clearOnFactoryChange!==!1,i=document.getElementById(t),o=document.getElementById(e),l=document.getElementById(a);if(!i||!o||!l)return;const r=f=>{const p=(i.value||"").trim(),m=p?this.getPlaceOptions(p):[];l.innerHTML=m.map(u=>`<option value="${Utils.escapeHTML(u.name)}"></option>`).join(""),f&&(o.value="")},c="_clinicWorkplaceFactoryChange";i[c]&&i.removeEventListener("change",i[c]);const d=()=>r(n);i[c]=d,i.addEventListener("change",d),r(!1)},refreshSiteDropdowns(){try{const t=this.getSiteOptions(),e=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:s=>String(s??""),a=s=>'<option value="">'+(s||"\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")+"</option>"+(t||[]).map(n=>'<option value="'+e(n.id)+'">'+e(n.name)+"</option>").join("");["visits-filter-factory","visit-factory","visit-contractor-factory","enhanced-visit-factory"].forEach(s=>{const n=document.getElementById(s);if(n&&n.tagName==="SELECT"){const i=n.value;n.innerHTML=a("\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639"),i&&(n.value=i)}}),typeof this.setupClinicWorkplaceDatalist=="function"&&(this.setupClinicWorkplaceDatalist("visit-factory","visit-employee-location","visit-employee-location-datalist"),this.setupClinicWorkplaceDatalist("visit-contractor-factory","visit-work-area","visit-work-area-datalist"),this.setupClinicWorkplaceDatalist("enhanced-visit-factory","enhanced-visit-employee-location","enhanced-visit-employee-location-datalist"))}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic.refreshSiteDropdowns:",t)}},getExpiringMedications(){return this.getMedications().filter(t=>t.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"||t.status==="\u0645\u0646\u062A\u0647\u064A")},ensureDataStructure(){if(typeof AppState>"u"||!AppState.appData)return;const t=AppState.appData;t.clinicMedications||(t.clinicMedications=[]),t.injuries||(t.injuries=[]),t.sickLeave||(t.sickLeave=[]),t.clinicVisits||(t.clinicVisits=[]),t.clinicSupplyRequests||(t.clinicSupplyRequests=[])},notifyMedicationAlerts(){this.getExpiringMedications().forEach(e=>{this.state.medicationAlertsNotified.has(e.id)||(e.status==="\u0645\u0646\u062A\u0647\u064A"?Notification?.error?.(`\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062F\u0648\u0627\u0621 ${Utils.escapeHTML(e.name||"")}`):Notification?.warning?.(`\u0627\u0644\u062F\u0648\u0627\u0621 ${Utils.escapeHTML(e.name||"")} \u0633\u064A\u0646\u062A\u0647\u064A \u062E\u0644\u0627\u0644 ${e.daysRemaining??0} \u064A\u0648\u0645`),this.state.medicationAlertsNotified.add(e.id))})},getFilteredMedications(){const t=this.state.filters.medications||{},e=(t.search||"").toLowerCase().trim(),a=t.dateFrom?new Date(t.dateFrom):null,s=t.dateTo?new Date(t.dateTo):null,n=t.status||"all";return this.getMedications().map(i=>this.normalizeMedicationRecord(i)).filter(i=>{const o=[i.name,i.type,i.location,i.usage,i.notes,this.getUserDisplayName(i.createdBy)].map(r=>String(r||"").toLowerCase()).join(" ");if(!(!e||o.includes(e))||n!=="all"&&i.status!==n)return!1;if(a){const r=i.purchaseDate?new Date(i.purchaseDate):null;if(!r||r<a)return!1}if(s){const r=i.purchaseDate?new Date(i.purchaseDate):null;if(!r||r>s)return!1}return!0})},getFilteredSickLeaves(){const t=this.state.filters.sickLeave||{},e=(t.search||"").toLowerCase(),a=t.department||"",s=t.dateFrom?new Date(t.dateFrom):null,n=t.dateTo?new Date(t.dateTo):null;return this.getSickLeaves().filter(i=>{if(!(!e||i.employeeName&&i.employeeName.toLowerCase().includes(e)||i.personName&&i.personName.toLowerCase().includes(e)||i.employeeDepartment&&i.employeeDepartment.toLowerCase().includes(e))||a&&i.employeeDepartment!==a)return!1;const l=i.startDate?new Date(i.startDate):null;return!(s&&(!l||l<s)||n&&(!l||l>n))})},getFilteredInjuries(){const t=this.state.filters.injuries||{},e=(t.search||"").toLowerCase(),a=t.status||"all",s=t.department||"",n=t.injuryType||"all",i=t.injuryBodyPart||"all",o=this.state.activeInjuryType||"employees",l=t.dateFrom?new Date(t.dateFrom):null,r=t.dateTo?new Date(t.dateTo):null;return this.getInjuries().filter(c=>{const d=[c.employeeCode,c.employeeNumber,c.employeeName,c.personName,c.contractorName,c.employeeDepartment,c.department,c.factoryName,c.factory,c.subLocationName,c.subLocation,c.injuryType,c.injuryBodyPart,c.injuryLocation,c.status,c.injuryDescription].map(u=>String(u||"").toLowerCase()).join(" ");if(!(!e||d.includes(e))||a!=="all"&&c.status!==a||n!=="all"&&(c.injuryType||"")!==n||i!=="all"&&(c.injuryBodyPart||"")!==i||s&&c.department!==s)return!1;const p=String(c.personType||"employee").toLowerCase();if(o==="employees"&&p!=="employee"||o==="contractors"&&p==="employee")return!1;const m=c.injuryDate?new Date(c.injuryDate):null;return!(l&&(!m||m<l)||r&&(!m||m>r))})},renderEmptyState(t){const{t:e,isRTL:a}=this.getTranslations(),s=a?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A":"No data available";return`
            <div class="empty-state" style="direction: ${a?"rtl":"ltr"}; text-align: ${a?"right":"left"};">
                <i class="fas fa-folder-open text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">${Utils.escapeHTML(t||s)}</p>
            </div>
        `},getClinicDepartments(){const t=new Set;return(AppState.appData?.employees||[]).forEach(e=>{const a=(e?.department||"").trim();a&&t.add(a)}),(AppState.appData?.sickLeave||[]).forEach(e=>{const a=(e?.employeeDepartment||e?.department||"").trim();a&&t.add(a)}),(AppState.appData?.injuries||[]).forEach(e=>{const a=(e?.employeeDepartment||e?.department||"").trim();a&&t.add(a)}),Array.from(t).sort((e,a)=>e.localeCompare(a,"ar"))},getMedicationBadgeClass(t){return t==="\u0645\u0646\u062A\u0647\u064A"?"badge-danger":t==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"badge-warning":"badge-success"},renderTabNavigation(){document.querySelectorAll(".clinic-tab-btn").forEach(e=>{e.getAttribute("data-tab")===this.state.activeTab?((e.classList.contains("btn-secondary")||e.classList.contains("btn-primary"))&&(e.classList.remove("btn-secondary"),e.classList.add("btn-primary")),!e.classList.contains("btn-secondary")&&!e.classList.contains("btn-primary")&&e.classList.add("active")):((e.classList.contains("btn-secondary")||e.classList.contains("btn-primary"))&&(e.classList.remove("btn-primary"),e.classList.add("btn-secondary")),!e.classList.contains("btn-secondary")&&!e.classList.contains("btn-primary")&&e.classList.remove("active"))})},bindTabEvents(){document.querySelectorAll(".clinic-tab-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-tab");!a||a===this.state.activeTab||(this.state.activeTab=a,this.renderTabNavigation(),requestAnimationFrame(()=>{this._activateTabPanels(a),this.scheduleClinicTabRender(a,{delayMs:20})}))})})},_activateTabPanels(t){try{document.querySelectorAll(".clinic-tab-panel").forEach(a=>{a.getAttribute("data-tab-panel")===t?(a.classList.add("active"),a.style.display="block"):(a.classList.remove("active"),a.style.display="none")}),this._syncAttendanceQuickNavVisibility?.()}catch{}},_renderTabSkeleton(t,e){try{if(!t||(t.innerHTML||"").trim())return;const s=Utils.escapeHTML(e||"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");if(t.innerHTML=`
                <div class="content-card" style="margin:14px;">
                    <div class="card-body" style="display:flex;align-items:center;justify-content:center;min-height:210px;gap:12px;">
                        <div style="width:34px;height:34px;border:3px solid rgba(37,99,235,0.18);border-top-color:#2563eb;border-radius:50%;animation:hseSpin 0.9s linear infinite;"></div>
                        <div style="font-weight:600;color:#334155;">${s}</div>
                    </div>
                </div>
            `,this.applyModuleI18n(t),!document.getElementById("hse-mini-spinner-style")){const n=document.createElement("style");n.id="hse-mini-spinner-style",n.textContent="@keyframes hseSpin{to{transform:rotate(360deg);}}",document.head.appendChild(n)}}catch{}},scheduleClinicTabRender(t,{delayMs:e=0}={}){try{if(!t)return;this._tabRenderState||(this._tabRenderState={token:0,timers:{}});const a=this._tabRenderState;a.token+=1;const s=a.token,n=a.timers[t];n&&(clearTimeout(n),a.timers[t]=null);const i=document.querySelector(`.clinic-tab-panel[data-tab-panel="${t}"]`),o={visits:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F...",attendance:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u062D\u0636\u0648\u0631...",medications:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0623\u062F\u0648\u064A\u0629...",sickLeave:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629...","dispensed-medications":"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629...",injuries:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A...","supply-request":"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A...",approvals:"\u062C\u0627\u0631\u064A \u0641\u062A\u062D \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629..."};this._renderTabSkeleton(i,o[t]||"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");const l=()=>{!this._tabRenderState||s!==this._tabRenderState.token||setTimeout(()=>{if(!(!this._tabRenderState||s!==this._tabRenderState.token))try{this._renderTabByKey(t)}catch(c){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0631\u0646\u062F\u0631 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",t,c)}},0)},r=["visits","attendance"];requestAnimationFrame(()=>{if(r.includes(t)){l();return}typeof requestIdleCallback=="function"?requestIdleCallback(l,{timeout:900}):l()}),a.timers[t]=setTimeout(()=>{!this._tabRenderState||s!==this._tabRenderState.token||l()},Math.max(0,e))}catch{}},_renderTabByKey(t){if(t==="visits"){this.scheduleVisitsTabRender(!1,0);return}if(t==="medications")return this.renderMedicationsTab();if(t==="sickLeave")return this.renderSickLeaveTab();if(t==="injuries")return this.renderInjuriesTab();if(t==="approvals")return this.renderApprovalsTab();if(t==="dispensed-medications")return this.renderDispensedMedicationsTab();if(t==="analytics")return this.renderAnalyticsTab();if(t==="data-analysis")return this.renderDataAnalysisTab();if(t==="supply-request")return this.renderSupplyRequestTab();if(t==="attendance"){this.scheduleAttendanceTabRender(0);return}},renderActiveTabContent(){const t=this.state.activeTab||"medications";this._activateTabPanels(t),this.scheduleClinicTabRender(t,{delayMs:0})},renderMedicationsTab(){const t=document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]');if(!t)return;const e=document.activeElement?document.activeElement.id:null;let a=0,s=0;e==="medications-search"&&(a=document.activeElement.selectionStart,s=document.activeElement.selectionEnd);const n=this.state.filters.medications||{},i=this.getFilteredMedications(),o=this.isCurrentUserAdmin(),l=i.map(c=>{const d=this.calculateMedicationStatus(c),f=d.status||"\u0633\u0627\u0631\u064A",p=d.daysRemaining!==void 0&&d.daysRemaining!==null?d.daysRemaining:"\u2014",m=this.formatDate(c.purchaseDate),u=c.expiryDate?this.formatDate(c.expiryDate):"\u2014",g=this.getMedicationRowClass(f),y=c.quantityAdded??c.quantity??0,v=c.remainingQuantity??c.quantity??0,S=Math.max(0,y-v),L=c.usage||c.notes||"\u2014";let M="",E="";o&&(f==="\u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"||c.pendingUpdate)&&(M=`
                    <button type="button" class="btn-icon btn-icon-success" data-action="approve-medication" data-id="${Utils.escapeHTML(c.id||"")}" title="\u0627\u0639\u062A\u0645\u0627\u062F">
                        <i class="fas fa-check"></i>
                    </button>
                `,E=`
                    <button type="button" class="btn-icon btn-icon-danger" data-action="reject-medication" data-id="${Utils.escapeHTML(c.id||"")}" title="\u0631\u0641\u0636">
                        <i class="fas fa-times"></i>
                    </button>
                `);const h=`
                ${M}
                ${E}
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
                    <td>${Utils.escapeHTML(L)}</td>
                    <td>${m}</td>
                    <td>${u}</td>
                    <td>
                        <span class="badge ${this.getMedicationBadgeClass(f)}">${Utils.escapeHTML(f)}</span>
                        ${c.pendingUpdate?'<br><span class="badge badge-warning" style="margin-top: 4px; font-size: 0.7rem;">\u062A\u0639\u062F\u064A\u0644 \u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</span>':""}
                    </td>
                    <td>${p}</td>
                    <td class="text-center font-semibold">${y}</td>
                    <td class="text-center font-semibold text-blue-600">${S}</td>
                    <td class="text-center font-semibold">${v}</td>
                    <td>${Utils.escapeHTML(this.getUserDisplayName(c.createdBy))}</td>
                    <td class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            ${h}
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
            `:this.renderEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0627\u0644\u0633\u062C\u0644.");if(t.innerHTML=`
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
        `,this.applyModuleI18n(t),this.bindMedicationsTabEvents(t),e){const c=t.querySelector(`#${e}`);c&&(c.focus(),e==="medications-search"&&(c.selectionStart=a,c.selectionEnd=s))}setTimeout(()=>{const c=t.querySelector(".clinic-table-wrapper");c&&this.setupTableScrollListeners(c)},100)},bindMedicationsTabEvents(t){const e=t.querySelector("#medications-search"),a=t.querySelector("#medications-status"),s=t.querySelector("#medications-date-from"),n=t.querySelector("#medications-date-to"),i=t.querySelector("#medications-reset-filters"),o=t.querySelector("#medications-add-btn"),l=t.querySelector("#medications-export-pdf-btn"),r=t.querySelector("#medications-export-excel-btn");e&&e.addEventListener("input",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.search=c.target.value,this.scheduleMedicationsTabRender(150)}),a&&a.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.status=c.target.value,this.scheduleMedicationsTabRender(50)}),s&&s.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.dateFrom=c.target.value,this.scheduleMedicationsTabRender(50)}),n&&n.addEventListener("change",c=>{this.state.filters=this.state.filters||{},this.state.filters.medications=this.state.filters.medications||{},this.state.filters.medications.dateTo=c.target.value,this.scheduleMedicationsTabRender(50)}),i&&i.addEventListener("click",()=>{this.state.filters=this.state.filters||{},this.state.filters.medications={search:"",status:"all",dateFrom:"",dateTo:""},this.scheduleMedicationsTabRender(0)}),o&&o.addEventListener("click",()=>this.showMedicationForm()),l&&l.addEventListener("click",()=>this.exportMedicationsToPDF()),r&&r.addEventListener("click",()=>this.exportMedicationsToExcel()),t.querySelectorAll('[data-action="approve-medication"]').forEach(c=>{c.addEventListener("click",()=>this.approveMedicationRequest(c.getAttribute("data-id")))}),t.querySelectorAll('[data-action="reject-medication"]').forEach(c=>{c.addEventListener("click",()=>this.rejectMedicationRequest(c.getAttribute("data-id")))}),t.querySelectorAll('[data-action="view-medication"]').forEach(c=>{c.addEventListener("click",()=>this.viewMedication(c.getAttribute("data-id")))}),t.querySelectorAll('[data-action="edit-medication"]').forEach(c=>{c.addEventListener("click",()=>this.editMedication(c.getAttribute("data-id")))}),t.querySelectorAll('[data-action="delete-medication"]').forEach(c=>{c.addEventListener("click",()=>this.deleteMedication(c.getAttribute("data-id")))})},async approveMedicationRequest(t){const e=this.getMedications().find(s=>s.id===t);if(!(!e||!confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0644\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(e.name)}"\u061F`))){Loading.show();try{let s={...e};if(e.pendingUpdate){Object.assign(s,e.pendingUpdate),delete s.pendingUpdate;const i=this.calculateMedicationStatus(s);s.status=i.status,s.daysRemaining=i.daysRemaining,s.updatedAt=new Date().toISOString(),s.updatedBy=this.getCurrentUserSummary()}else if(e.status==="\u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"){const i=this.calculateMedicationStatus(s);s.status=i.status}s=this.normalizeMedicationRecord(s);const n=AppState.appData.medications.findIndex(i=>i.id===t);n!==-1&&(AppState.appData.medications[n]=s),this.ensureData(),this.renderMedicationsTab(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.sendRequest({action:"updateMedication",data:{medicationId:t,updateData:s}}),Loading.hide(),Notification.success("\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D")}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F: "+s.message)}}},async rejectMedicationRequest(t){const e=this.getMedications().find(s=>s.id===t);if(!(!e||!confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0631\u0641\u0636 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0644\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(e.name)}"\u061F

\u0644\u0646 \u064A\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0629.`))){Loading.show();try{if(e.status==="\u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")AppState.appData.medications=AppState.appData.medications.filter(s=>s.id!==t),await GoogleIntegration.sendRequest({action:"deleteMedication",data:{medicationId:t}});else if(e.pendingUpdate){let s={...e};delete s.pendingUpdate;const n=AppState.appData.medications.findIndex(i=>i.id===t);n!==-1&&(AppState.appData.medications[n]=s),await GoogleIntegration.sendRequest({action:"updateMedication",data:{medicationId:t,updateData:s}})}this.ensureData(),this.renderMedicationsTab(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D")}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0631\u0641\u0636: "+s.message)}}},viewMedication(t){const e=this.getMedications().find(i=>i.id===t);if(!e){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F");return}const a=e.status||"\u0633\u0627\u0631\u064A",s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
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
                            <p class="text-gray-800">${Utils.escapeHTML(e.name||"")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621</span>
                            <p class="text-gray-800">${Utils.escapeHTML(e.type||"")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</span>
                            <p class="text-gray-800">${Utils.escapeHTML(e.usage||e.notes||"\u2014")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621</span>
                            <p class="text-gray-800">${this.formatDate(e.purchaseDate)}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</span>
                            <p class="text-gray-800">${e.expiryDate?this.formatDate(e.expiryDate):"\u2014"}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0643\u0645\u064A\u0629</span>
                            <p class="text-gray-800">${e.quantityAdded??e.quantity??0}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0631\u0635\u064A\u062F</span>
                            <p class="text-gray-800 font-semibold">${e.remainingQuantity??e.quantity??0}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0646\u0635\u0631\u0641</span>
                            <p class="text-gray-800 font-semibold text-blue-600">${Math.max(0,(e.quantityAdded??e.quantity??0)-(e.remainingQuantity??e.quantity??0))}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u062E\u0632\u064A\u0646</span>
                            <p class="text-gray-800">${Utils.escapeHTML(e.location||"\u2014")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629</span>
                            <p class="text-gray-800">
                                <span class="badge ${this.getMedicationBadgeClass(a)}">${Utils.escapeHTML(a)}</span>
                                ${e.daysRemaining!==void 0&&e.daysRemaining!==null?`<span class="text-xs text-gray-500 ml-2">(\u062A\u0628\u0642\u0649 ${e.daysRemaining} \u064A\u0648\u0645)</span>`:""}
                            </p>
                        </div>
                    </div>
                    ${e.notes?`
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</span>
                            <p class="text-gray-800 whitespace-pre-line">${Utils.escapeHTML(e.notes||"")}</p>
                        </div>
                    `:""}
                    <div class="text-sm text-gray-500 border-t pt-3 flex flex-wrap justify-between items-center gap-2" style="direction: rtl;">
                        <div>
                            <span class="font-semibold">\u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629:</span>
                            <span>${Utils.escapeHTML(e.createdBy?.name||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</span>
                            ${e.createdAt?`<span class="text-xs text-gray-400 mr-2">(${this.formatDate(e.createdAt,!0)})</span>`:""}
                        </div>
                        ${e.updatedBy&&e.updatedBy.name&&e.updatedBy.name!=="\u0627\u0644\u0646\u0638\u0627\u0645"?`
                        <div>
                            <span class="font-semibold">\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B \u0628\u0648\u0627\u0633\u0637\u0629:</span>
                            <span>${Utils.escapeHTML(e.updatedBy.name)}</span>
                            ${e.updatedAt?`<span class="text-xs text-gray-400 mr-2">(${this.formatDate(e.updatedAt,!0)})</span>`:""}
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

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&n()})},editMedication(t){const e=this.getMedications().find(a=>a.id===t);if(!e){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062A\u0639\u062F\u064A\u0644\u0647");return}this.showMedicationForm(e)},async deleteMedication(t){const e=this.getMedications().find(s=>s.id===t);if(!e){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062D\u0630\u0641\u0647");return}if(this.isCurrentUserAdmin()){if(!confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(e.name||"")}"\u061F

\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627.`))return;Loading.show();try{AppState.appData.medications=(AppState.appData.medications||[]).filter(n=>n.id!==t),AppState.appData.clinicMedications=(AppState.appData.clinicMedications||[]).filter(n=>n.id!==t),AppState.appData.clinicInventory=(AppState.appData.clinicInventory||[]).filter(n=>n.id!==t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await GoogleIntegration.sendRequest({action:"deleteMedication",data:{medicationId:t}}),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"),this.renderMedicationsTab(),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:"\u062D\u0630\u0641",data:{id:t}}}))}catch(n){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621:",n),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621: "+(n.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}else{if(!confirm(`\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${Utils.escapeHTML(e.name||"")}" \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F`))return;Loading.show();try{const n={medicationId:t,medicationData:e,requestedBy:{id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""},requestedById:AppState.currentUser?.id||"",reason:"\u0637\u0644\u0628 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621"},i=await GoogleIntegration.sendRequest({action:"addMedicationDeletionRequest",data:n});if(i&&i.success)Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629"),this.notifyAdminAboutDeletionRequest(e),this.state.activeTab==="approvals"&&setTimeout(()=>{this.renderApprovalsTab()},500),this.renderMedicationsTab();else throw new Error(i.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}catch(n){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:",n),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(n.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}},isCurrentUserAdmin(){if(typeof Permissions<"u"&&typeof Permissions.isCurrentUserAdmin=="function")return Permissions.isCurrentUserAdmin();const t=(AppState.currentUser?.role||"").toLowerCase();return t==="admin"||t==="system_admin"||AppState.currentUser?.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||t==="\u0645\u062F\u064A\u0631"},_isUsersSheetAdminRecord(t){if(!t)return!1;if(typeof Permissions<"u"){if(typeof Permissions.isAdminRole=="function"&&Permissions.isAdminRole(t.role))return!0;const a=typeof Permissions.normalizePermissions=="function"?Permissions.normalizePermissions(t.permissions):t.permissions;if(a&&typeof a=="object"&&!Array.isArray(a)&&(Permissions.isAdminRole&&Permissions.isAdminRole(a.role)||a.admin===!0||a.isAdmin===!0||a["manage-modules"]===!0))return!0}const e=String(t.role||"").trim().toLowerCase();return e==="admin"||e==="system_admin"||t.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"||t.role==="\u0645\u062F\u064A\u0631"},_invalidateApprovalsCache(){this._approvalsBackendFetchOk=!1;try{localStorage.removeItem("clinic_approvals_last_sync")}catch{}},_isApprovalTimeOffRequest(t){if(!t)return!1;if(t.approvalKind==="timeoff")return!0;const e=String(t.requestType||"").trim().toLowerCase();return e==="leave"||e==="permission"||e==="overtime"},_approvalRequestMatchesTypeFilter(t,e){return!t||!e||e==="all"?!0:e==="timeoff"?this._isApprovalTimeOffRequest(t):(t.approvalKind||t.requestType)===e},prefetchClinicAttendanceForAdminIfNeeded(t){return!this.isCurrentUserAdmin()||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest?Promise.resolve():this._adminAttendancePrefetchPromise&&!t?this._adminAttendancePrefetchPromise:(this._adminAttendancePrefetchPromise=(async()=>{try{await this._ensureClinicStaffLoadedForAttendance(),await this.loadClinicAttendanceData(!!t)&&(this._attendanceDataFetchedInSession=!0),this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!!t),this._leaveBalancesFetchedInSession=!0,this._updatePendingApprovalsBadgeFromLocal_(),typeof UI<"u"&&typeof UI.updateNotificationsBadge=="function"&&UI.updateNotificationsBadge(),this.state?.activeTab==="attendance"&&this.renderAttendanceTab({force:!0})}catch{}})().finally(()=>{this._adminAttendancePrefetchPromise=null}),this._adminAttendancePrefetchPromise)},prefetchClinicTimeOffApprovalsForAdminIfNeeded(){return this.prefetchClinicAttendanceForAdminIfNeeded(!1)},_updatePendingApprovalsBadgeFromLocal_(){const t=document.getElementById("pending-approvals-badge");if(!t)return;const e=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)?AppState.appData.clinicMedicationDeletionRequests:[],a=Array.isArray(AppState.appData?.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[],s=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],n=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[],i=[...e,...a,...s,...n].filter(o=>o&&String(o.status)==="pending").length;i>0?(t.textContent=String(i),t.style.display="inline-block"):t.style.display="none"},getClinicStaffLeaveBalancesList(){return Array.isArray(AppState.appData?.clinicStaffLeaveBalances)?AppState.appData.clinicStaffLeaveBalances:[]},_getLeaveBalancePeriodDefaults(){const t=this._getTodayLocalKey();return this.state=this.state||{},this.state.leaveBalanceMonth||(this.state.leaveBalanceMonth=t.substring(0,7)),this.state.leaveBalanceYear||(this.state.leaveBalanceYear=t.substring(0,4)),{month:this.state.leaveBalanceMonth,year:this.state.leaveBalanceYear}},_scheduleLeaveBalancesLoadIfNeeded(t){this.canAccessAttendanceTab()&&(this._leaveBalancesLoadPromise&&!t||!t&&this._leaveBalancesFetchedInSession||(this._leaveBalancesLoadPromise=this.loadClinicStaffLeaveBalances(!!t).then(()=>{this._leaveBalancesFetchedInSession=!0,this.state?.activeTab==="attendance"&&this.renderAttendanceTab({force:!0})}).catch(()=>{}).finally(()=>{this._leaveBalancesLoadPromise=null})))},_isLeaveBalancesLoading(){return!!this._leaveBalancesLoadPromise},async loadClinicStaffLeaveBalances(t){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return!1;const e=this._getLeaveBalancePeriodDefaults(),a=this.canViewAllAttendanceData();try{a&&await this._ensureClinicStaffLoadedForAttendance();const[s,n]=await Promise.all([GoogleIntegration.sendRequest({action:"getClinicStaffLeaveBalances",data:{month:e.month,year:e.year,skipCache:!!t}}),GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:t?{skipCache:!0}:{}})]);if(n?.success&&Array.isArray(n.data)&&(AppState.appData.clinicStaffTimeOffRequests=n.data),s?.success&&Array.isArray(s.data)?(AppState.appData.clinicStaffLeaveBalances=this._enrichLeaveBalancesFromLocal_(s.data,e),s.meta&&(this.state.leaveBalanceMonth=s.meta.month||e.month,this.state.leaveBalanceYear=s.meta.year||e.year)):a&&(AppState.appData.clinicStaffLeaveBalances=this._buildLeaveBalancesFromStaffAndRequests_(e)),AppState.appData.clinicStaffLeaveBalances&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}return!!(s?.success||a&&(AppState.appData.clinicStaffLeaveBalances||[]).length)}catch{return a?(AppState.appData.clinicStaffLeaveBalances=this._buildLeaveBalancesFromStaffAndRequests_(e),(AppState.appData.clinicStaffLeaveBalances||[]).length>0):!1}},_buildLeaveBalancePeriodFromItems_(t,e,a,s,n){const i=a.filter(c=>String(c.requestType).toLowerCase()==="leave").reduce((c,d)=>c+this._countLeaveDaysInPeriod_(d,t,e),0),o=a.filter(c=>String(c.requestType).toLowerCase()==="permission").length,l=s??0,r=n??0;return{periodType:t,periodKey:e,leaveEntitled:l,leaveConsumed:Math.round(i*100)/100,leaveRemaining:Math.max(0,Math.round((l-i)*100)/100),permissionEntitled:r,permissionConsumed:o,permissionRemaining:Math.max(0,r-o),approvedItems:a}},_buildLeaveBalancesFromStaffAndRequests_(t){const e=t?.month||"",a=t?.year||"",s=this.getClinicStaffLeaveBalancesList(),n=new Map(s.map(i=>[String(i.staffId),i]));return(this.getClinicStaffList()||[]).map(i=>{const o={id:i.id,staffId:i.id,userId:i.userId,userEmail:i.userEmail},l=n.get(String(i.id))||{},r=this._collectLocalApprovedTimeOffItems(o,"month",e),c=this._collectLocalApprovedTimeOffItems(o,"year",a);return{staffId:i.id,userId:i.userId||"",userName:i.userName||"",userEmail:i.userEmail||"",staffRole:i.staffRole||"",isActive:i.isActive,month:this._buildLeaveBalancePeriodFromItems_("month",e,r,l.month?.leaveEntitled,l.month?.permissionEntitled),year:this._buildLeaveBalancePeriodFromItems_("year",a,c,l.year?.leaveEntitled,l.year?.permissionEntitled)}})},_collectAllApprovedTimeOffForMonth_(t,e){const a=[],s=new Set,n=(i,o,l)=>{const r=String(i?.id||`${o}_${i?.dateFrom}_${i?.requestType}`).trim();r&&s.has(r)||(r&&s.add(r),a.push({...i,userName:o||i.userName||"\u2014",staffRole:l||i.staffRole}))};if((e||[]).forEach(i=>{(i.month?.approvedItems||[]).forEach(o=>{n(o,i.userName,i.staffRole)})}),this.canViewAllAttendanceData()){const i=new Map((this.getClinicStaffList()||[]).map(o=>[String(o.id),o]));this.getClinicStaffTimeOffRequestsList().forEach(o=>{if(!this._isTimeOffApprovedStatus(o.status)||!this._requestOverlapsPeriod(o,"month",t))return;const l=i.get(String(o.staffId))||{};n(o,o.userName||l.userName,l.staffRole)})}return a.sort((i,o)=>new Date(o.reviewedAt||o.requestedAt||o.createdAt)-new Date(i.reviewedAt||i.requestedAt||i.createdAt))},_isTimeOffApprovedStatus(t){const e=String(t||"").trim().toLowerCase();return e==="approved"||e==="\u0645\u0639\u062A\u0645\u062F"||e==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647"||e==="\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627"},_timeOffRequestMatchesStaffRow(t,e){if(!t||!e)return!1;if(e.staffId&&t.staffId&&String(e.staffId)===String(t.staffId)||e.id&&t.staffId&&String(e.id)===String(t.staffId))return!0;const a=String(e.userId||"").trim(),s=String(e.userEmail||"").trim().toLowerCase();return!!(a&&String(t.userId||"").trim()===a||s&&String(t.userEmail||"").trim().toLowerCase()===s)},_dateKeyInPeriod(t,e,a){const s=this._attendanceDayKey(t);return!s||!a?!1:e==="year"?s.substring(0,4)===String(a):s.substring(0,7)===String(a)},_requestOverlapsPeriod(t,e,a){if(!t||!a)return!1;const s=this._attendanceDayKey(t.dateFrom),n=this._attendanceDayKey(t.dateTo||t.dateFrom),i=s||this._attendanceDayKey(t.requestedAt||t.createdAt);if(!i)return!1;if(this._dateKeyInPeriod(i,e,a)||n&&this._dateKeyInPeriod(n,e,a))return!0;try{let o=new Date(i);const l=new Date(n||i);if(Number.isNaN(o.getTime()))return!1;let r=0;for(;o<=l&&r<400;){if(this._dateKeyInPeriod(o,e,a))return!0;o.setDate(o.getDate()+1),r++}}catch{}return!1},_countLeaveDaysInPeriod_(t,e,a){const s=this._attendanceDayKey(t.dateFrom),n=this._attendanceDayKey(t.dateTo||t.dateFrom);if(!s){const i=parseFloat(t.durationDays);return!isNaN(i)&&i>0?i:0}try{let i=new Date(s);const o=new Date(n||s);if(Number.isNaN(i.getTime()))return parseFloat(t.durationDays)||0;let l=0,r=0;for(;i<=o&&r<400;)this._dateKeyInPeriod(i,e,a)&&(l+=1),i.setDate(i.getDate()+1),r++;return l||parseFloat(t.durationDays)||0}catch{return parseFloat(t.durationDays)||0}},_collectLocalApprovedTimeOffItems(t,e,a){return(Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[]).filter(n=>!this._isTimeOffApprovedStatus(n.status)||!this._timeOffRequestMatchesStaffRow(n,t)?!1:this._requestOverlapsPeriod(n,e,a))},_enrichLeaveBalancesFromLocal_(t,e){const a=e?.month||"",s=e?.year||"";return(t||[]).map(n=>{const i={id:n.staffId,staffId:n.staffId,userId:n.userId,userEmail:n.userEmail},o=[...Array.isArray(n.month?.approvedItems)?n.month.approvedItems:[],...this._collectLocalApprovedTimeOffItems(i,"month",a)],l=[...Array.isArray(n.year?.approvedItems)?n.year.approvedItems:[],...this._collectLocalApprovedTimeOffItems(i,"year",s)],r=v=>{const S=new Map;return v.forEach(L=>{L?.id&&S.set(String(L.id),L)}),Array.from(S.values())},c=r(o),d=r(l),f=c.filter(v=>String(v.requestType).toLowerCase()==="leave").reduce((v,S)=>v+this._countLeaveDaysInPeriod_(S,"month",a),0),p=c.filter(v=>String(v.requestType).toLowerCase()==="permission").length,m=d.filter(v=>String(v.requestType).toLowerCase()==="leave").reduce((v,S)=>v+this._countLeaveDaysInPeriod_(S,"year",s),0),u=d.filter(v=>String(v.requestType).toLowerCase()==="permission").length,g={...n.month||{}},y={...n.year||{}};return c.length&&(g.leaveConsumed=Math.max(g.leaveConsumed||0,Math.round(f*100)/100),g.permissionConsumed=Math.max(g.permissionConsumed||0,p),g.leaveRemaining=Math.max(0,Math.round(((g.leaveEntitled||0)-g.leaveConsumed)*100)/100),g.permissionRemaining=Math.max(0,(g.permissionEntitled||0)-g.permissionConsumed),g.approvedItems=c),d.length&&(y.leaveConsumed=Math.max(y.leaveConsumed||0,Math.round(m*100)/100),y.permissionConsumed=Math.max(y.permissionConsumed||0,u),y.leaveRemaining=Math.max(0,Math.round(((y.leaveEntitled||0)-y.leaveConsumed)*100)/100),y.permissionRemaining=Math.max(0,(y.permissionEntitled||0)-y.permissionConsumed),y.approvedItems=d),{...n,month:g,year:y}})},renderApprovedTimeOffRequestsSection(t,e){const a=this._collectAllApprovedTimeOffForMonth_(e,t),s=a.length?a.map(n=>`
            <tr>
                <td>${Utils.escapeHTML(n.userName||"\u2014")}</td>
                <td><span class="badge badge-info">${Utils.escapeHTML(this.getTimeOffRequestTypeLabel(n.requestType))}</span></td>
                <td>${Utils.escapeHTML(this.formatTimeOffRequestDetails(n))}</td>
                <td class="text-sm">${Utils.escapeHTML(n.reason||"\u2014")}</td>
                <td>${this.formatDate(n.reviewedAt||n.requestedAt||n.createdAt,!0)}</td>
            </tr>
        `).join(""):`<tr><td colspan="5" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0627\u0632\u0627\u062A \u0623\u0648 \u0623\u0630\u0648\u0646\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 \u0641\u064A ${Utils.escapeHTML(e||"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631")}</td></tr>`;return`<div class="content-card mt-4" id="clinic-approved-timeoff-section">
            <div class="card-header" style="padding:12px 18px;border-bottom:1px solid #f1f5f9;">
                <h4 style="margin:0;font-size:0.92rem;font-weight:700;color:#134e4a;"><i class="fas fa-check-circle ml-2" style="color:#059669;"></i>\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0648\u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 (${Utils.escapeHTML(e||"")})</h4>
            </div>
            <div class="card-body" style="padding:0;">
                ${this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
                    <thead><tr><th>\u0627\u0644\u0645\u0633\u0626\u0648\u0644</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th><th>\u0627\u0644\u0633\u0628\u0628</th><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th></tr></thead>
                    <tbody>${s}</tbody>
                </table>`)}
            </div>
        </div>`},_renderBalanceTriplet(t,e,a){const s=t??0,n=e??0,i=a??0,o=s>0&&i<=0?"#dc2626":"#059669";return`<span style="font-size:0.76rem;white-space:nowrap;line-height:1.5;">
            <span style="color:#64748b;">\u0645\u0633\u062A\u062D\u0642 <strong>${s}</strong></span>
            <span style="color:#cbd5e1;"> \xB7 </span>
            <span style="color:#d97706;">\u0645\u0633\u062A\u0646\u0641\u0630 <strong>${n}</strong></span>
            <span style="color:#cbd5e1;"> \xB7 </span>
            <span style="color:${o};">\u0645\u062A\u0628\u0642\u064A <strong>${i}</strong></span>
        </span>`},renderClinicStaffLeaveBalancesSection(t){t=t||{};const e=t.balances||[],a=!!t.loading,s=t.month||"",n=t.year||"",i=this.canViewAllAttendanceData();if(!i&&!e.length&&!a)return"";const o=i?7:6,l=a&&!e.length?`<tr><td colspan="${o}" class="text-center text-gray-500 py-8"><i class="fas fa-spinner fa-spin ml-2" style="color:#0d9488;"></i>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0631\u0635\u062F\u0629...</td></tr>`:e.length?e.map(r=>{const c=r.month||{},d=r.year||{};return`<tr>
                    <td>${Utils.escapeHTML(r.userName||"\u2014")}</td>
                    <td>${Utils.escapeHTML(this.getStaffRoleLabel(r.staffRole))}</td>
                    <td>${this._renderBalanceTriplet(c.leaveEntitled,c.leaveConsumed,c.leaveRemaining)}</td>
                    <td>${this._renderBalanceTriplet(c.permissionEntitled,c.permissionConsumed,c.permissionRemaining)}</td>
                    <td>${this._renderBalanceTriplet(d.leaveEntitled,d.leaveConsumed,d.leaveRemaining)}</td>
                    <td>${this._renderBalanceTriplet(d.permissionEntitled,d.permissionConsumed,d.permissionRemaining)}</td>
                    ${i?`<td><button type="button" class="btn-secondary btn-sm clinic-leave-quota-edit-btn" data-staff-id="${Utils.escapeAttr(r.staffId)}" data-staff-name="${Utils.escapeAttr(r.userName||"")}"><i class="fas fa-edit ml-1"></i>\u062A\u0639\u062F\u064A\u0644</button></td>`:""}
                </tr>`}).join(""):`<tr><td colspan="${o}" class="text-center text-gray-500 py-6">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u0626\u0648\u0644\u0648\u0646</td></tr>`;return`<div class="content-card mt-4" id="clinic-leave-balances-section">
            <div class="card-header" style="padding:14px 18px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;align-items:center;">
                <h4 style="margin:0;font-size:0.95rem;font-weight:700;color:#134e4a;"><i class="fas fa-wallet ml-2" style="color:#0d9488;"></i>\u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0648\u0627\u0644\u0623\u0630\u0648\u0646\u0627\u062A</h4>
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
        </div>`},_isClinicRpcActionMissing_(t){const e=String(t||"");return/غير معترف|ACTION_NOT_RECOGNIZED|Action not recognized|الإجراء غير معروف/i.test(e)},async upsertClinicStaffLeaveQuotaOnServer_(t){if(!t?.staffId)return{success:!1,message:"\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0645\u0637\u0644\u0648\u0628"};try{return await GoogleIntegration.sendRequest({action:"upsertClinicStaffLeaveQuota",data:t})}catch(e){if(!this._isClinicRpcActionMissing_(e?.message))throw e;return this._upsertClinicStaffLeaveQuotaViaSheet_(t)}},async _upsertClinicStaffLeaveQuotaViaSheet_(t){if(!this.isCurrentUserAdmin())return{success:!1,message:"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0631\u0635\u064A\u062F \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637"};const e="ClinicStaffLeaveQuota",a=String(t.periodType||"month").trim().toLowerCase(),s=String(t.periodKey||"").trim();if(!s)return{success:!1,message:"\u062D\u062F\u062F \u0627\u0644\u0641\u062A\u0631\u0629"};await this._ensureClinicStaffLoadedForAttendance();const n=(AppState.appData.clinicStaff||[]).find(u=>u&&String(u.id)===String(t.staffId));if(!n)return{success:!1,message:"\u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"};let i=parseFloat(t.leaveDaysQuota);(isNaN(i)||i<0)&&(i=0);let o=parseInt(t.permissionCountQuota,10);(isNaN(o)||o<0)&&(o=0),typeof GoogleIntegration.invalidateReadFromSheetCacheForSheets=="function"&&GoogleIntegration.invalidateReadFromSheetCacheForSheets(e);const l=await GoogleIntegration.readFromSheets(e,3e4),r=Array.isArray(l)?[...l]:[],c=r.findIndex(u=>u&&String(u.staffId)===String(t.staffId)&&String(u.periodType)===a&&String(u.periodKey)===s),d=AppState.currentUser||{},f=new Date().toISOString(),p={staffId:n.id,userId:n.userId||"",userEmail:n.userEmail||"",userName:n.userName||"",periodType:a,periodKey:s,leaveDaysQuota:i,permissionCountQuota:o,notes:String(t.notes||"").trim(),updatedById:d.id||d.userId||"",updatedByName:d.name||"",updatedAt:f};let m;return c>=0?(p.id=r[c].id,p.createdAt=r[c].createdAt||f,Object.assign(r[c],p),m=await GoogleIntegration.saveToSheets(e,r)):(p.id=typeof Utils<"u"&&Utils.generateSequentialId?Utils.generateSequentialId("CLQ",r):`CLQ-${Date.now()}`,p.createdAt=f,m=await GoogleIntegration.saveToSheets(e,[...r,p]),m?.success||(m=await GoogleIntegration.appendToSheets(e,p))),m?.success&&typeof GoogleIntegration.invalidateReadFromSheetCacheForSheets=="function"&&GoogleIntegration.invalidateReadFromSheetCacheForSheets(e),m?.success?{success:!0,data:c>=0?r[c]:p,message:"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u0646\u062C\u0627\u062D"}:m||{success:!1,message:"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F"}},showClinicStaffLeaveQuotaModal(t,e){if(!this.isCurrentUserAdmin()||!t)return;const s=this.getClinicStaffLeaveBalancesList().find(v=>String(v.staffId)===String(t))||{},n=this._getLeaveBalancePeriodDefaults(),i=s.month||{},o=s.year||{},l=document.getElementById("clinic-leave-quota-modal");l&&l.remove();const r=document.createElement("div");r.id="clinic-leave-quota-modal",r.className="modal-overlay",r.innerHTML=`
            <div class="modal-content" style="max-width:520px;">
                <div class="modal-header">
                    <h3 class="modal-title"><i class="fas fa-wallet ml-2"></i>\u062A\u0639\u062F\u064A\u0644 \u0631\u0635\u064A\u062F \u2014 ${Utils.escapeHTML(e||"")}</h3>
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
            </div>`,document.body.appendChild(r);const c=r.querySelector("#clinic-leave-quota-period-type"),d=r.querySelector("#clinic-leave-quota-month-wrap"),f=r.querySelector("#clinic-leave-quota-year-wrap"),p=r.querySelector("#clinic-leave-quota-days"),m=r.querySelector("#clinic-leave-quota-perms"),u=r.querySelector("#clinic-leave-quota-notes"),g=()=>{const v=c.value==="year";d.classList.toggle("hidden",v),f.classList.toggle("hidden",!v);const S=v?o:i;p.value=S.leaveEntitled??0,m.value=S.permissionEntitled??0,u.value=S.quotaNotes||""};c.addEventListener("change",g),g();const y=()=>r.remove();r.querySelector("#clinic-leave-quota-close")?.addEventListener("click",y),r.querySelector("#clinic-leave-quota-cancel")?.addEventListener("click",y),r.addEventListener("click",v=>{v.target===r&&y()}),r.querySelector("#clinic-leave-quota-save")?.addEventListener("click",async()=>{const v=c.value,S=v==="year"?String(r.querySelector("#clinic-leave-quota-year")?.value||"").trim():String(r.querySelector("#clinic-leave-quota-month")?.value||"").trim();if(!S){Notification?.error?.("\u062D\u062F\u062F \u0627\u0644\u0634\u0647\u0631 \u0623\u0648 \u0627\u0644\u0633\u0646\u0629");return}Loading.show();try{const L=await this.upsertClinicStaffLeaveQuotaOnServer_({staffId:t,periodType:v,periodKey:S,leaveDaysQuota:p.value,permissionCountQuota:m.value,notes:u.value?.trim()||""});if(L?.success)this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!0),this._leaveBalancesFetchedInSession=!0,Loading.hide(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u0646\u062C\u0627\u062D"),y(),this.renderAttendanceTab({force:!0});else throw new Error(L?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(L){Loading.hide(),Notification?.error?.(L?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0631\u0635\u064A\u062F")}})},bindClinicStaffLeaveBalanceEvents(t){if(!t)return;const e=()=>{const a=t.querySelector("#clinic-leave-balance-month")?.value||"",s=t.querySelector("#clinic-leave-balance-year")?.value||"";this.state.leaveBalanceMonth=a||this._getLeaveBalancePeriodDefaults().month,this.state.leaveBalanceYear=s||this._getLeaveBalancePeriodDefaults().year,this._leaveBalancesFetchedInSession=!1,this.loadClinicStaffLeaveBalances(!0).then(()=>{this._leaveBalancesFetchedInSession=!0,this.renderAttendanceTab({force:!0})})};t.querySelector("#clinic-leave-balance-month")?.addEventListener("change",e),t.querySelector("#clinic-leave-balance-year")?.addEventListener("change",e),t.querySelector("#clinic-leave-balance-refresh-btn")?.addEventListener("click",()=>{this._leaveBalancesFetchedInSession=!1,this.loadClinicStaffLeaveBalances(!0).then(()=>{this._leaveBalancesFetchedInSession=!0,this.renderAttendanceTab({force:!0})})}),t.querySelectorAll(".clinic-leave-quota-edit-btn").forEach(a=>{a.addEventListener("click",()=>{this.showClinicStaffLeaveQuotaModal(a.dataset.staffId,a.dataset.staffName)})})},_mergeAttendanceRowsByUserDay(t){if(!Array.isArray(t)||!t.length)return[];const e=new Map,a=[],s=i=>{let o="",l=1/0;return i.filter(Boolean).forEach(r=>{const c=new Date(r).getTime();!Number.isNaN(c)&&c<l&&(l=c,o=r)}),o},n=i=>{let o="",l=-1/0;return i.filter(Boolean).forEach(r=>{const c=new Date(r).getTime();!Number.isNaN(c)&&c>l&&(l=c,o=r)}),o};return t.forEach(i=>{if(!i)return;const o=this._attendanceDayKey(i.date),l=String(i.staffId||i.userId||i.userEmail||"").trim().toLowerCase(),r=`${o}|${l}`;if(!e.has(r)){e.set(r,{...i,date:o||i.date}),a.push(r);return}const c=e.get(r);if(c.checkIn=s([c.checkIn,i.checkIn])||c.checkIn||i.checkIn,c.checkOut=n([c.checkOut,i.checkOut])||c.checkOut||i.checkOut,c.checkIn&&c.checkOut){const d=new Date(c.checkIn).getTime(),f=new Date(c.checkOut).getTime();!Number.isNaN(d)&&!Number.isNaN(f)&&f>d&&(c.workDuration=Math.round((f-d)/36e5*100)/100)}}),a.map(i=>e.get(i))},async notifyAdminAboutDeletionRequest(t){try{const e=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(e&&e.success&&Array.isArray(e.data)){const a=e.data.filter(s=>this._isUsersSheetAdminRecord(s));for(const s of a)s.id&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:s.id,title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621",message:`\u0637\u0644\u0628 ${AppState.currentUser?.name||"\u0645\u0633\u062A\u062E\u062F\u0645"} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 "${t.name||""}"`,type:"approval_request",priority:"high",link:"#clinic-approvals",data:{module:"clinic",action:"medication_deletion",medicationId:t.id}}}).catch(n=>{Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",n)})}}catch(e){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A:",e)}},async notifyAdminAboutSupplyRequest(t){try{const e=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(e&&e.success&&Array.isArray(e.data)){const a=e.data.filter(n=>this._isUsersSheetAdminRecord(n)),s={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[t.type]||t.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";for(const n of a)n.id&&await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:n.id,title:"\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u062D\u062A\u064A\u0627\u062C",message:`\u0637\u0644\u0628 ${AppState.currentUser?.name||"\u0645\u0633\u062A\u062E\u062F\u0645"} \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 ${s}: "${t.itemName||""}"`,type:"approval_request",priority:t.priority==="urgent"?"high":"normal",link:"#clinic-approvals",data:{module:"clinic",action:"supply_request",requestId:t.id}}}).catch(i=>{Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",i)})}}catch(e){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A:",e)}},getMonthlyVisitsAlertThreshold(){try{const t=AppState.companySettings?.clinicMonthlyVisitsAlertThreshold;if(t==null||t==="")return 10;const e=parseInt(t,10);return isNaN(e)||e<1?10:Math.min(1e3,e)}catch{return 10}},DEFAULT_VISIT_TYPES:["\u0637\u0648\u0627\u0631\u0626","\u0627\u0635\u0627\u0628\u0629 \u0639\u0645\u0644","\u0645\u0631\u0636","\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629","\u0641\u062D\u0635 \u062F\u0648\u0631\u064A","\u0645\u062A\u0627\u0628\u0639\u0629","\u0641\u062D\u0635 \u0645\u0627\u0642\u0628\u0644 \u0627\u0644\u062A\u0639\u064A\u064A\u0646","\u062A\u062D\u0644\u064A\u0644 \u0645\u062E\u062F\u0627\u0631\u062A"],DEFAULT_CONTRACTOR_JOB_TITLES:["\u0645\u0647\u0646\u062F\u0633","\u0645\u0634\u0631\u0641","\u0639\u0627\u0645\u0644","\u0639\u0627\u0645\u0644\u0629","\u0641\u0646\u064A","\u0644\u062D\u0627\u0645","\u0628\u0631\u0627\u062F"],getVisitTypeOptions(){let t=AppState.companySettings?.clinicVisitTypes;if(typeof t=="string"){const a=t.trim();if(a)try{t=JSON.parse(a)}catch{t=a.split(/\n|,/).map(n=>n.trim()).filter(Boolean)}else t=[]}(!Array.isArray(t)||t.length===0)&&AppState.appData?.clinicVisitTypes&&(t=AppState.appData.clinicVisitTypes);const e=Array.isArray(t)&&t.length>0?t.map(a=>typeof a=="string"?a.trim():String(a)).filter(Boolean):(this.DEFAULT_VISIT_TYPES||[]).slice();return e.some(a=>this.normalizeArabicText(a)===this.normalizeArabicText("\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629"))||e.push("\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629"),e},getContractorJobTitleOptions(){let t=AppState.companySettings?.clinicContractorJobTitles;if(typeof t=="string"){const s=t.trim();if(s)try{t=JSON.parse(s)}catch{t=s.split(/\n|,/).map(i=>i.trim()).filter(Boolean)}else t=[]}(!Array.isArray(t)||t.length===0)&&Array.isArray(AppState.appData?.clinicContractorJobTitles)&&(t=AppState.appData.clinicContractorJobTitles);const e=Array.isArray(t)&&t.length>0?t:this.DEFAULT_CONTRACTOR_JOB_TITLES,a=new Set;return(e||[]).map(s=>String(s||"").trim()).filter(s=>{const n=this.normalizeArabicText(s);return!n||a.has(n)?!1:(a.add(n),!0)})},isMedicationDispenseVisitType_(t){return this.normalizeArabicText(t)===this.normalizeArabicText("\u0635\u0631\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629")},normalizeArabicText(t){if(t==null)return"";let e=String(t).trim().toLowerCase();return e=e.replace(/[\u064B-\u065F\u0670]/g,""),e=e.replace(/[أإآ]/g,"\u0627"),e=e.replace(/ة/g,"\u0647"),e=e.replace(/[ى]/g,"\u064A"),e=e.replace(/\s+/g," "),e=e.replace(/[^\w\s\u0600-\u06FF]/g,""),e.trim()},getMonthlyVisitCountForPerson(t){try{if(!t||!t.visitDate)return 0;const e=new Date(t.visitDate);if(isNaN(e.getTime()))return 0;const a=e.getFullYear(),s=e.getMonth(),n=(AppState.appData.clinicVisits||[]).concat(Array.isArray(AppState.appData.clinicContractorVisits)?AppState.appData.clinicContractorVisits:[]),i=new Set,o=n.filter(p=>{if(!p)return!1;const m=String(p.id||"").trim();return m?i.has(m)?!1:(i.add(m),!0):!0}),l=p=>{if(!p||!p.visitDate)return!1;const m=new Date(p.visitDate);return isNaN(m.getTime())?!1:m.getFullYear()===a&&m.getMonth()===s},r=(t.personType||"employee").toString().toLowerCase();if(!(r==="contractor"||r==="external"||r.includes("\u0645\u0642\u0627\u0648\u0644")||r.includes("\u062E\u0627\u0631"))){const p=String(t.employeeCode||t.employeeNumber||"").trim();return p?o.filter(m=>{if(!l(m))return!1;const u=(m.personType||"").toString().toLowerCase();return u==="employee"||u===""||u.includes("\u0645\u0648\u0638")?String(m.employeeCode||m.employeeNumber||"").trim()===p:!1}).length:0}const d=this.normalizeArabicText(t.contractorName||t.externalName),f=this.normalizeArabicText(t.contractorWorkerName);return!d&&!f?0:o.filter(p=>{if(!l(p))return!1;const m=(p.personType||"").toString().toLowerCase();if(!(m==="contractor"||m==="external"||m.includes("\u0645\u0642\u0627\u0648\u0644")||m.includes("\u062E\u0627\u0631")))return!1;const g=this.normalizeArabicText(p.contractorName||p.externalName),y=this.normalizeArabicText(p.contractorWorkerName);return g===d&&y===f}).length}catch(e){return Utils.safeWarn("getMonthlyVisitCountForPerson:",e),0}},showVisitTypesSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const t=this.getVisitTypeOptions(),e=document.createElement("div");e.className="modal-overlay";const a=i=>i.map((o,l)=>({id:"vt-"+Date.now()+"-"+l,text:String(o).trim()}));let s=a(t);const n=()=>{const i=document.getElementById("clinic-visit-types-list");i&&(i.innerHTML=s.map((o,l)=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-visit-type" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),i.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),i.querySelectorAll(".remove-visit-type").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");s=s.filter(r=>r.id!==l),n()})}))};e.innerHTML=`
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
        `,document.body.appendChild(e),n(),e.querySelector("#clinic-visit-types-add-row").addEventListener("click",()=>{s.push({id:"vt-"+Date.now()+"-"+s.length,text:""}),n()}),e.querySelector("#clinic-visit-types-reset").addEventListener("click",()=>{s=a(this.DEFAULT_VISIT_TYPES||[]),n()}),e.querySelector("#clinic-visit-types-save").addEventListener("click",async()=>{e.querySelectorAll("#clinic-visit-types-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())});const i=s.map(o=>o.text).filter(Boolean);if(i.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicVisitTypes=i,(!AppState.companySettings||typeof AppState.companySettings!="object")&&(AppState.companySettings={}),AppState.companySettings.clinicVisitTypes=i;try{const o=AppState.currentUser||{},l={...AppState.companySettings,clinicVisitTypes:i,userData:o},r=await GoogleIntegration.sendRequest({action:"saveCompanySettings",data:l});if(!r||r.success!==!0)throw new Error(r&&r.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}catch(o){Notification?.error?.(o?.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");return}typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0648\u062A\u0639\u0645\u064A\u0645\u0647\u0627 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"),e.remove()}),e.querySelectorAll(".modal-close, .modal-close-btn").forEach(i=>{i.addEventListener("click",()=>e.remove())})},refreshContractorJobTitlesDatalist_(){const t=document.getElementById("visit-contractor-position-datalist"),e=document.getElementById("visit-contractor-position");if(!t||!e)return;const a=this.getContractorJobTitleOptions();t.innerHTML=a.map(s=>`<option value="${Utils.escapeHTML(s)}"></option>`).join("");try{e.dataset.allowedValues=JSON.stringify(a.map(s=>this.normalizeArabicText(s)))}catch{}},showContractorJobTitlesSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const t=document.createElement("div");t.className="modal-overlay";const e=n=>n.map((i,o)=>({id:`cjt-${Date.now()}-${o}`,text:String(i||"").trim()}));let a=e(this.getContractorJobTitleOptions());t.innerHTML=`
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
            </div>`,document.body.appendChild(t);const s=()=>{const n=t.querySelector("#clinic-contractor-job-titles-list");n&&(n.innerHTML=a.map(i=>`
                <div class="flex items-center gap-2 mb-2" data-id="${i.id}">
                    <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:40px;border-radius:9px;background:#e0f2fe;color:#0369a1;"><i class="fas fa-user-tag"></i></span>
                    <input type="text" class="form-input flex-1 contractor-job-title-edit" data-id="${i.id}" value="${Utils.escapeHTML(i.text)}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u0629">
                    <button type="button" class="btn-icon btn-icon-danger remove-contractor-job-title" data-id="${i.id}" title="\u062D\u0630\u0641 \u0627\u0644\u0648\u0638\u064A\u0641\u0629"><i class="fas fa-trash"></i></button>
                </div>`).join(""),n.querySelectorAll(".contractor-job-title-edit").forEach(i=>{i.addEventListener("input",()=>{const o=a.find(l=>l.id===i.dataset.id);o&&(o.text=i.value.trim())})}),n.querySelectorAll(".remove-contractor-job-title").forEach(i=>{i.addEventListener("click",()=>{a=a.filter(o=>o.id!==i.dataset.id),s()})}))};s(),t.querySelector("#clinic-contractor-job-title-add")?.addEventListener("click",()=>{a.push({id:`cjt-${Date.now()}-${a.length}`,text:""}),s()}),t.querySelector("#clinic-contractor-job-title-reset")?.addEventListener("click",()=>{a=e(this.DEFAULT_CONTRACTOR_JOB_TITLES||[]),s()}),t.querySelector("#clinic-contractor-job-title-save")?.addEventListener("click",async n=>{const i=n.currentTarget,o=[],l=new Set;if(a.forEach(c=>{const d=String(c.text||"").trim(),f=this.normalizeArabicText(d);d&&f&&!l.has(f)&&(l.add(f),o.push(d))}),!o.length){Notification?.warning?.("\u0623\u0636\u0641 \u0648\u0638\u064A\u0641\u0629 \u0648\u0627\u062D\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629");return}const r=i.innerHTML;i.disabled=!0,i.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...';try{AppState.appData||(AppState.appData={}),(!AppState.companySettings||typeof AppState.companySettings!="object")&&(AppState.companySettings={}),AppState.appData.clinicContractorJobTitles=o,AppState.companySettings.clinicContractorJobTitles=o;const c=await GoogleIntegration.sendRequest({action:"saveCompanySettings",data:{...AppState.companySettings,clinicContractorJobTitles:o,userData:AppState.currentUser||{}}});if(!c||c.success!==!0)throw new Error(c?.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646");typeof DataManager<"u"&&DataManager.save&&DataManager.save(),this.refreshContractorJobTitlesDatalist_(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u062A\u0639\u0645\u064A\u0645\u0647\u0627 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646"),t.remove()}catch(c){Notification?.error?.(c?.message||"\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"),i.disabled=!1,i.innerHTML=r}}),t.querySelectorAll(".modal-close, .modal-close-btn").forEach(n=>n.addEventListener("click",()=>t.remove()))},DEFAULT_INJURY_TYPES:["\u062C\u0631\u062D","\u0643\u0633\u0631","\u062D\u0631\u0648\u0642","\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u063A\u0629","\u0627\u0644\u062A\u0648\u0627\u0621","\u0623\u062E\u0631\u0649"],getInjuryTypeOptions(){const t=AppState.appData?.clinicInjuryTypes;return Array.isArray(t)&&t.length>0?t.map(e=>typeof e=="string"?e.trim():String(e)).filter(Boolean):(this.DEFAULT_INJURY_TYPES||[]).slice()},showInjuryTypesSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const t=this.getInjuryTypeOptions(),e=document.createElement("div");e.className="modal-overlay";const a=i=>i.map((o,l)=>({id:"it-"+Date.now()+"-"+l,text:String(o).trim()}));let s=a(t);const n=()=>{const i=document.getElementById("clinic-injury-types-list");i&&(i.innerHTML=s.map(o=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-injury-type" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),i.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),i.querySelectorAll(".remove-injury-type").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");s=s.filter(r=>r.id!==l),n()})}))};e.innerHTML=`
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
        `,document.body.appendChild(e),n(),e.querySelector("#clinic-injury-types-add-row").addEventListener("click",()=>{s.push({id:"it-"+Date.now()+"-"+s.length,text:""}),n()}),e.querySelector("#clinic-injury-types-reset").addEventListener("click",()=>{s=a(this.DEFAULT_INJURY_TYPES||[]),n()}),e.querySelector("#clinic-injury-types-save").addEventListener("click",()=>{e.querySelectorAll("#clinic-injury-types-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())});const i=s.map(o=>o.text).filter(Boolean);if(i.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicInjuryTypes=i,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A"),this.state.activeTab==="injuries"&&this.renderInjuriesTab(),e.remove()}),e.querySelectorAll(".modal-close, .modal-close-btn").forEach(i=>{i.addEventListener("click",()=>e.remove())})},DEFAULT_INJURY_BODY_PARTS:["\u0627\u0644\u0631\u0623\u0633","\u0627\u0644\u0639\u064A\u0646","\u0627\u0644\u0648\u062C\u0647","\u0627\u0644\u0631\u0642\u0628\u0629","\u0627\u0644\u0643\u062A\u0641","\u0627\u0644\u0630\u0631\u0627\u0639","\u0627\u0644\u064A\u062F","\u0627\u0644\u0635\u062F\u0631","\u0627\u0644\u0638\u0647\u0631","\u0627\u0644\u0628\u0637\u0646","\u0627\u0644\u0633\u0627\u0642","\u0627\u0644\u0642\u062F\u0645","\u0623\u062E\u0631\u0649"],getInjuryBodyPartOptions(){const t=AppState.appData?.clinicInjuryBodyParts;return Array.isArray(t)&&t.length>0?t.map(e=>typeof e=="string"?e.trim():String(e)).filter(Boolean):(this.DEFAULT_INJURY_BODY_PARTS||[]).slice()},showInjuryBodyPartsSettingsModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const t=this.getInjuryBodyPartOptions(),e=document.createElement("div");e.className="modal-overlay";const a=i=>i.map((o,l)=>({id:"ib-"+Date.now()+"-"+l,text:String(o).trim()}));let s=a(t);const n=()=>{const i=document.getElementById("clinic-injury-body-parts-list");i&&(i.innerHTML=s.map(o=>`
                <div class="flex items-center gap-2 mb-2" data-id="${o.id}">
                    <input type="text" class="form-input flex-1" value="${Utils.escapeHTML(o.text)}" data-id="${o.id}" placeholder="\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645">
                    <button type="button" class="btn-icon btn-icon-danger btn-xs remove-injury-body-part" data-id="${o.id}" title="\u062D\u0630\u0641">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join(""),i.querySelectorAll("input").forEach(o=>{o.addEventListener("change",()=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())})}),i.querySelectorAll(".remove-injury-body-part").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-id");s=s.filter(r=>r.id!==l),n()})}))};e.innerHTML=`
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
        `,document.body.appendChild(e),n(),e.querySelector("#clinic-injury-body-parts-add-row").addEventListener("click",()=>{s.push({id:"ib-"+Date.now()+"-"+s.length,text:""}),n()}),e.querySelector("#clinic-injury-body-parts-reset").addEventListener("click",()=>{s=a(this.DEFAULT_INJURY_BODY_PARTS||[]),n()}),e.querySelector("#clinic-injury-body-parts-save").addEventListener("click",()=>{e.querySelectorAll("#clinic-injury-body-parts-list input").forEach(o=>{const l=o.getAttribute("data-id"),r=s.find(c=>c.id===l);r&&(r.text=o.value.trim())});const i=s.map(o=>o.text).filter(Boolean);if(i.length===0){Notification?.warning?.("\u0623\u0636\u0641 \u0628\u0646\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u0633\u062A\u0639\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");return}AppState.appData||(AppState.appData={}),AppState.appData.clinicInjuryBodyParts=i,typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Notification?.success?.("\u062A\u0645 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645"),this.state.activeTab==="injuries"&&this.renderInjuriesTab(),e.remove()}),e.querySelectorAll(".modal-close, .modal-close-btn").forEach(i=>{i.addEventListener("click",()=>e.remove())})},async notifyAdminsAboutHighClinicVisits(t,e){try{const a=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});if(!a||!a.success||!Array.isArray(a.data))return;const s=a.data.filter(r=>{const c=(r.role||"").toLowerCase();return c==="admin"||c==="\u0645\u062F\u064A\u0631"}),n=this.getMonthlyVisitsAlertThreshold(),i=(t.personType||"").toString().toLowerCase()==="employee"?t.employeeName||t.employeeCode||"\u0645\u0648\u0638\u0641":t.contractorWorkerName||t.contractorName||t.externalName||"\u0645\u0642\u0627\u0648\u0644/\u0639\u0627\u0645\u0644",o="\u062A\u0646\u0628\u064A\u0647: \u062A\u0631\u062F\u062F \u0639\u0627\u0644\u064D \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",l=`\u0627\u0644\u0645\u0648\u0638\u0641/\u0627\u0644\u0645\u0642\u0627\u0648\u0644 "${i}" \u0628\u0644\u063A \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A\u0647 \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 ${e} \u0632\u064A\u0627\u0631\u0629 (\u0627\u0644\u062D\u062F ${n}).`;for(const r of s)if(r.id||r.email)try{await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:r.id||r.email,title:o,message:l,type:"clinic_high_visits",priority:"high",link:"#clinic",data:{module:"clinic",action:"high_monthly_visits",personType:t.personType,monthlyCount:e,personLabel:i}}})}catch(c){Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0644\u0644\u0645\u062F\u064A\u0631:",c)}}catch(a){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646:",a)}},exportMedicationsToExcel(){const t=this.getFilteredMedications();if(t.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=t.map(i=>{const o=i.quantityAdded??i.quantity??0,l=i.remainingQuantity??i.quantity??0,r=Math.max(0,o-l);return{"\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621":i.name||"","\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621":i.type||"",\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645:i.usage||i.notes||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621":i.purchaseDate?this.formatDate(i.purchaseDate):"","\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629":i.expiryDate?this.formatDate(i.expiryDate):"",\u0627\u0644\u062D\u0627\u0644\u0629:i.status||"\u0633\u0627\u0631\u064A","\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629":i.daysRemaining??"",\u0627\u0644\u0643\u0645\u064A\u0629:o,\u0627\u0644\u0645\u0646\u0635\u0631\u0641:r,\u0627\u0644\u0631\u0635\u064A\u062F:l}}),a=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(e);XLSX.utils.book_append_sheet(a,s,"Medications");const n=`Clinic_Medications_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n)},async exportMedicationsToPDF(){const t=this.getFilteredMedications();if(t.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}try{Notification?.info?.("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const{success:e,doc:a}=await this._createClinicPdfWithFont({orientation:"landscape",format:"a4",fontUrl:"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf",fontFamily:"Amiri"});if(!e||!a)throw new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 PDF \u0623\u0648 \u0627\u0644\u062E\u0637 \u0627\u0644\u0639\u0631\u0628\u064A");const s=8,n=a.internal.pageSize.getWidth(),i=a.internal.pageSize.getHeight(),o=n/2,l=AppState?.companySettings?.name||AppState?.companySettings?.companyName||"\u0634\u0631\u0643\u0629",r=AppState?.companySettings?.secondaryName||"",c=AppState?.companySettings?.address||"",d=AppState?.companySettings?.phone||"",f=AppState?.companySettings?.email||"",p=AppState?.companySettings?.formVersion||"1.0",m=AppState?.companyLogo||"",u=`CLINIC-MED-${new Date().toISOString().slice(0,10)}`,g=new Date().toLocaleDateString("ar-SA");let y=8;if(m)try{a.addImage(m,"PNG",s,y-1,15,10)}catch{}const v=s+(m?18:0);a.setFontSize(10),a.setTextColor(15,23,42),a.text(l,v,y+3),r&&(a.setFontSize(7),a.setTextColor(107,114,128),a.text(r,v,y+9));const S=[c,d,f].filter(Boolean).join(" | ");S&&(a.setFontSize(5),a.setTextColor(148,163,184),a.text(S,v,r?y+15:y+9)),a.setFontSize(12),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",n-s,y+3,{align:"right"}),a.setFontSize(5),a.setTextColor(148,163,184),a.text(u,n-s,y+9,{align:"right"});const L=S?r?y+21:y+15:r?y+15:y+9;a.setDrawColor(0,56,101),a.setLineWidth(.6),a.line(s,L,n-s,L),y=L+4,a.setFillColor(0,56,101),a.rect(0,y,n,8,"F"),a.setFontSize(7),a.setTextColor(255),a.text(l,s,y+5.5),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,y+5.5,{align:"center"}),y+=12,a.setFontSize(14),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,y,{align:"center"}),a.setFontSize(7),a.setTextColor(100),a.text(`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631: ${g}`,s,y+7),a.text(`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${t.length}`,n-s,y+7,{align:"right"}),y+=11;const M=t.filter(b=>b.status==="\u0633\u0627\u0631\u064A").length,E=t.filter(b=>b.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621").length,h=t.filter(b=>b.status==="\u0645\u0646\u062A\u0647\u064A").length,I=t.length,C=[{label:"\u0633\u0627\u0631\u064A",value:M,bg:[232,245,233],accent:[46,125,50],tc:[27,94,32]},{label:"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",value:E,bg:[255,243,224],accent:[245,124,0],tc:[230,81,0]},{label:"\u0645\u0646\u062A\u0647\u064A",value:h,bg:[251,233,231],accent:[211,47,47],tc:[183,28,28]},{label:"\u0625\u062C\u0645\u0627\u0644\u064A",value:I,bg:[227,242,253],accent:[21,101,192],tc:[13,71,161]}],j=(n-2*s-9)/4,w=13;C.forEach((b,U)=>{const q=s+U*(j+3);a.setFillColor(b.bg[0],b.bg[1],b.bg[2]),a.setDrawColor(220),a.setLineWidth(.3),a.roundedRect(q,y,j,w,2,2,"FD"),a.setFillColor(b.accent[0],b.accent[1],b.accent[2]),a.rect(q,y,1.5,w,"F"),a.setFontSize(6),a.setTextColor(b.accent[0],b.accent[1],b.accent[2]),a.text(b.label,q+4,y+4.5),a.setFontSize(11),a.setTextColor(b.tc[0],b.tc[1],b.tc[2]),a.text(String(b.value),q+j-4,y+w-2.5,{align:"right"})}),y+=w+9;const x={\u0633\u0627\u0631\u064A:[46,125,50],"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":[255,152,0],\u0645\u0646\u062A\u0647\u064A:[198,40,40]};a.autoTable({startY:y,head:[["#","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621","\u0627\u0644\u0646\u0648\u0639","\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","\u0627\u0644\u062D\u0627\u0644\u0629","\u0627\u0644\u0623\u064A\u0627\u0645","\u0627\u0644\u0643\u0645\u064A\u0629","\u0627\u0644\u0645\u0646\u0635\u0631\u0641","\u0627\u0644\u0631\u0635\u064A\u062F"]],body:t.map((b,U)=>{const q=b.quantityAdded??b.quantity??0,F=b.remainingQuantity??b.quantity??0,_=Math.max(0,q-F);return[U+1,b.name||"",b.type||"",b.usage||b.notes||"\u2014",this.formatDate(b.purchaseDate),b.expiryDate?this.formatDate(b.expiryDate):"\u2014",{content:b.status||"\u0633\u0627\u0631\u064A",styles:{textColor:x[b.status]||[0,0,0]}},b.daysRemaining??"\u2014",q,_,F]}),styles:{font:"Amiri",fontSize:6.5,cellPadding:1.5,halign:"right"},headStyles:{fillColor:[0,56,101],textColor:255,fontSize:7,halign:"center"},alternateRowStyles:{fillColor:[245,247,250]},columnStyles:{0:{halign:"center",cellWidth:8},6:{halign:"center"},7:{halign:"center"},8:{halign:"center",cellWidth:10},9:{halign:"center",cellWidth:10},10:{halign:"center",cellWidth:10}},margin:{left:s,right:s},didDrawPage:function(b){const U=a.internal.getNumberOfPages();a.setFillColor(0,56,101),a.rect(0,0,n,6,"F"),a.setFontSize(6),a.setTextColor(255),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",o,4.5,{align:"center"}),a.setDrawColor(0,56,101),a.setLineWidth(.3),a.line(s,i-9,n-s,i-9),a.setFontSize(5.5),a.setTextColor(148,163,184),a.text(`\u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${p}`,s,i-5),a.text(u,o,i-5,{align:"center"}),a.text(`${g} | \u0635\u0641\u062D\u0629 ${U}`,n-s,i-5,{align:"right"})}});const A=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_${new Date().toISOString().slice(0,10)}.pdf`;a.save(A),Notification?.success?.(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (${t.length} \u0633\u062C\u0644)`)}catch(e){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u062A\u062C\u0631\u0628\u0629 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",e),this._fallbackPrintMedicationsPDF(t)}},_fallbackPrintMedicationsPDF(t){const a=`<table><thead><tr>
            <th>\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621</th><th>\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621</th><th>\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645</th>
            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0631\u0627\u0621</th><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</th>
            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629</th>
            <th>\u0627\u0644\u0643\u0645\u064A\u0629</th><th>\u0627\u0644\u0645\u0646\u0635\u0631\u0641</th><th>\u0627\u0644\u0631\u0635\u064A\u062F</th>
        </tr></thead><tbody>${t.map(i=>{const o=i.quantityAdded??i.quantity??0,l=i.remainingQuantity??i.quantity??0,r=Math.max(0,o-l);return`<tr>
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
            </tr>`}).join("")}</tbody></table>`,s=`CLINIC-MED-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const i=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(i){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",i),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629")}},async _createClinicPdfWithFont({orientation:t="portrait",format:e="a4",fontUrl:a,fontFamily:s}={}){const n=typeof Utils<"u"&&Utils.PdfExport?Utils.PdfExport.getJsPdfConstructor():window.jspdf?.jsPDF||window.jsPDF?.jsPDF||window.jsPDF||null;if(!n)return{success:!1};const i=[a,"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf","https://fonts.googleapis.com/css2?family=Amiri&display=swap"].filter(Boolean);try{if(!this._arabicFontBase64){let l=!1;for(const r of i)try{const c=await fetch(r,{cache:"force-cache"});if(!c.ok)continue;if(c.headers.get("content-type")?.includes("text/css")){const f=(await c.text()).match(/url\(([^)]+\.ttf)\)/);if(!f)continue;const p=await fetch(f[1],{cache:"force-cache"});if(!p.ok)continue;this._arabicFontBase64=await p.blob().then(m=>new Promise(u=>{const g=new FileReader;g.onload=()=>u(g.result.split(",")[1]),g.readAsDataURL(m)}))}else{const d=await c.blob();this._arabicFontBase64=await new Promise(f=>{const p=new FileReader;p.onload=()=>f(p.result.split(",")[1]),p.readAsDataURL(d)})}l=!0;break}catch{continue}if(!l)return{success:!1}}const o=new n(t,"mm",e);return o.addFileToVFS(s+".ttf",this._arabicFontBase64),o.addFont(s+".ttf",s,"normal"),o.setFont(s),{success:!0,doc:o}}catch(o){return Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 PDF:",o),{success:!1,error:o}}},renderSickLeaveTab(){const t=document.querySelector('.clinic-tab-panel[data-tab-panel="sickLeave"]');if(!t)return;const e=this.state.filters.sickLeave||{},a=this.getFilteredSickLeaves(),s=this.getClinicDepartments(),n=a.map(o=>{const l=o.employeeName||o.personName||"",r=o.employeeDepartment||"\u2014",c=this.formatDate(o.startDate),d=this.formatDate(o.endDate),f=o.daysCount??this.calculateSickLeaveDays(o.startDate,o.endDate),p=o.treatingDoctor||"\u2014";return`
                <tr>
                    <td>${Utils.escapeHTML(l)}</td>
                    <td>${Utils.escapeHTML(r)}</td>
                    <td>${c}</td>
                    <td>${d}</td>
                    <td>${f}</td>
                    <td>${Utils.escapeHTML(p)}</td>
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
            `:this.renderEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629 \u0645\u0633\u062C\u0644\u0629.");t.innerHTML=`
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div class="flex flex-wrap items-center gap-2">
                    <div class="relative">
                        <input type="text" id="sick-leave-search" class="form-input pr-10" placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0642\u0633\u0645" value="${Utils.escapeHTML(e.search||"")}">
                        <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                    </div>
                    <select id="sick-leave-department" class="form-input">
                        <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>
                        ${s.map(o=>`
                            <option value="${Utils.escapeHTML(o)}" ${e.department===o?"selected":""}>${Utils.escapeHTML(o)}</option>
                        `).join("")}
                    </select>
                    <input type="date" id="sick-leave-date-from" class="form-input" value="${e.dateFrom||""}" title="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E">
                    <input type="date" id="sick-leave-date-to" class="form-input" value="${e.dateTo||""}" title="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E">
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
        `,this.applyModuleI18n(t),this.bindSickLeaveTabEvents(t),setTimeout(()=>{const o=t.querySelector(".clinic-table-wrapper");o&&this.setupTableScrollListeners(o)},100)},bindSickLeaveTabEvents(t){const e=t.querySelector("#sick-leave-search"),a=t.querySelector("#sick-leave-department"),s=t.querySelector("#sick-leave-date-from"),n=t.querySelector("#sick-leave-date-to"),i=t.querySelector("#sick-leave-add-btn"),o=t.querySelector("#sick-leave-export-pdf-btn"),l=t.querySelector("#sick-leave-export-excel-btn");e&&e.addEventListener("input",r=>{this.state.filters.sickLeave.search=r.target.value.trim(),this.renderSickLeaveTab()}),a&&a.addEventListener("change",r=>{this.state.filters.sickLeave.department=r.target.value,this.renderSickLeaveTab()}),s&&s.addEventListener("change",r=>{this.state.filters.sickLeave.dateFrom=r.target.value,this.renderSickLeaveTab()}),n&&n.addEventListener("change",r=>{this.state.filters.sickLeave.dateTo=r.target.value,this.renderSickLeaveTab()}),i?.addEventListener("click",()=>this.showSickLeaveForm()),o?.addEventListener("click",()=>this.exportSickLeaveToPDF()),l?.addEventListener("click",()=>this.exportSickLeaveToExcel()),t.querySelectorAll('[data-action="view-sick-leave"]').forEach(r=>{r.addEventListener("click",()=>this.viewSickLeaveRecord(r.getAttribute("data-id")))}),t.querySelectorAll('[data-action="edit-sick-leave"]').forEach(r=>{r.addEventListener("click",()=>this.editSickLeave(r.getAttribute("data-id")))})},viewSickLeaveRecord(t){const e=this.getSickLeaves().find(d=>d.id===t);if(!e){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}const a=e.employeeName||e.personName||"",s=e.employeeDepartment||"\u2014",n=this.formatDate(e.startDate),i=this.formatDate(e.endDate),o=e.daysCount??this.calculateSickLeaveDays(e.startDate,e.endDate),l=e.treatingDoctor||"\u2014",r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
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
                        ${e.employeeCode?`
                            <div>
                                <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</span>
                                <p class="text-gray-800">${Utils.escapeHTML(e.employeeCode)}</p>
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
                        <p class="text-gray-800 whitespace-pre-line">${Utils.escapeHTML(e.reason||"")}</p>
                    </div>
                    ${e.medicalNotes?`
                        <div>
<span class="text-sm font-semibold text-gray-600">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629</span>
                                <p class="text-gray-800 whitespace-pre-line">${Utils.escapeHTML(e.medicalNotes||"")}</p>
                        </div>
                    `:""}
                    <div class="text-sm text-gray-500 border-t pt-3">
                        ${e.createdBy?.name?`\u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629: ${Utils.escapeHTML(e.createdBy.name)}`:""}
                        ${e.createdAt?`<span class="ml-2">\u0628\u062A\u0627\u0631\u064A\u062E ${this.formatDate(e.createdAt,!0)}</span>`:""}
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
        `,document.body.appendChild(r);const c=()=>r.remove();r.querySelectorAll(".modal-close, .modal-close-btn").forEach(d=>d.addEventListener("click",c)),r.querySelector(".modal-edit-btn")?.addEventListener("click",()=>{c(),this.showSickLeaveForm(e)}),r.querySelector(".modal-print-btn")?.addEventListener("click",()=>this.printSickLeaveRecord(e.id)),r.addEventListener("click",d=>{d.target===r&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&c()})},editSickLeave(t){const e=this.getSickLeaves().find(a=>a.id===t);if(!e){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629");return}this.showSickLeaveForm(e)},printSickLeaveRecord(t){const e=this.getSickLeaves().find(c=>c.id===t);if(!e){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}const a=e.employeeName||e.personName||"",s=e.employeeDepartment||"\u2014",n=e.treatingDoctor||"\u2014",i=e.daysCount??this.calculateSickLeaveDays(e.startDate,e.endDate),o=`
            <table>
                <tr><th>\u0627\u0644\u0627\u0633\u0645</th><td>${Utils.escapeHTML(a)}</td></tr>
                <tr><th>\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</th><td>${Utils.escapeHTML(s)}</td></tr>
                ${e.employeeCode?`<tr><th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th><td>${Utils.escapeHTML(e.employeeCode)}</td></tr>`:""}
                <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629</th><td>${this.formatDate(e.startDate)}</td></tr>
                <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629</th><td>${this.formatDate(e.endDate)}</td></tr>
                <tr><th>\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645</th><td>${i}</td></tr>
                <tr><th>\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C</th><td>${Utils.escapeHTML(n)}</td></tr>
            </table>
            <div class="section-title">\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629</div>
            <div class="description">${Utils.escapeHTML(e.reason||"")}</div>
            ${e.medicalNotes?`
                <div class="section-title">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629</div>
                <div class="description">${Utils.escapeHTML(e.medicalNotes||"")}</div>
            `:""}
        `,l=`SICK-LEAVE-${e.id}`,r=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(l,"\u0646\u0645\u0648\u0630\u062C \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629",o,!1,!0,{},e.createdAt,e.updatedAt):`<html><body>${o}</body></html>`;try{const c=new Blob([r],{type:"text/html;charset=utf-8"}),d=URL.createObjectURL(c),f=window.open(d,"_blank");f?f.onload=()=>{setTimeout(()=>{f.print(),setTimeout(()=>URL.revokeObjectURL(d),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629")}catch(c){Utils.safeError("\u0641\u0634\u0644 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",c),Notification?.error?.("\u062A\u0639\u0630\u0631 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629")}},exportSickLeaveToExcel(){const t=this.getFilteredSickLeaves();if(t.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=t.map(i=>({\u0627\u0644\u0627\u0633\u0645:i.employeeName||i.personName||"",\u0627\u0644\u0642\u0633\u0645:i.employeeDepartment||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629":this.formatDate(i.startDate),"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629":this.formatDate(i.endDate),"\u0639\u062F\u062F \u0627\u0644\u0623\u064A\u0627\u0645":i.daysCount??this.calculateSickLeaveDays(i.startDate,i.endDate),"\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C":i.treatingDoctor||"",\u0627\u0644\u0633\u0628\u0628:i.reason||"","\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629":i.medicalNotes||""})),a=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(e);XLSX.utils.book_append_sheet(a,s,"SickLeave");const n=`Clinic_SickLeave_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n)},exportSickLeaveToPDF(){const t=this.getFilteredSickLeaves();if(t.length===0){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const a=`
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
                    ${t.map(i=>`
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
        `,s=`SICK-LEAVE-REPORT-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const i=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),l=window.open(o,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)}:Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(i){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",i),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629")}},renderInjuriesTab(){const t=document.querySelector('.clinic-tab-panel[data-tab-panel="injuries"]');if(!t)return;const e=this.state.filters.injuries||{},a=this.getInjuries(),s=this.getFilteredInjuries(),n=this.getClinicDepartments(),i=this.getInjuryTypeOptions(),o=this.getInjuryBodyPartOptions(),l=this.state.activeInjuryType==="contractors",r=a.filter(p=>String(p.personType||"employee").toLowerCase()==="employee").length,c=a.length-r,d=s.map(p=>{const m=p.contractorName||"\u2014",u=p.employeeCode||p.employeeNumber||"\u2014",g=p.employeeName||p.personName||p.contractorWorkerName||"\u2014",y=p.factoryName||p.factory||"\u2014",v=p.subLocationName||p.subLocation||"\u2014",S=p.department||p.employeeDepartment||"\u2014",L=this.formatDate(p.injuryDate,!0),M=p.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",E=Array.isArray(p.attachments)?p.attachments.length:0;return`
                <tr class="${this.getInjuryRowClass(M)}">
                    ${l?`<td>${Utils.escapeHTML(m)}</td>`:`<td>${Utils.escapeHTML(u)}</td>`}
                    <td>${Utils.escapeHTML(g)}</td>
                    <td>${Utils.escapeHTML(y)}</td>
                    <td>${Utils.escapeHTML(v)}</td>
                    <td>${Utils.escapeHTML(S)}</td>
                    <td>${L}</td>
                    <td>${Utils.escapeHTML(p.injuryType||"")}</td>
                    <td>${Utils.escapeHTML(p.injuryBodyPart||"")}</td>
                    <td>
                        <span class="badge ${this.getInjuryStatusBadgeClass(M)}">${Utils.escapeHTML(M)}</span>
                    </td>
                    <td>${Utils.escapeHTML(this.getUserDisplayName(p.createdBy))}</td>
                    <td class="text-center">${E}</td>
                    <td class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-injury" data-id="${Utils.escapeHTML(p.id||"")}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button" class="btn-icon btn-icon-warning" data-action="edit-injury" data-id="${Utils.escapeHTML(p.id||"")}">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `}).join(""),f=s.length?`
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
            `:this.renderEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u0635\u0627\u0628\u0627\u062A \u0637\u0628\u064A\u0629 \u0645\u0633\u062C\u0644\u0629.");t.innerHTML=`
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
                            <input type="text" id="injuries-search" class="form-input pr-10 filter-input" placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629" value="${Utils.escapeHTML(e.search||"")}">
                            <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                        </div>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-status">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                        <select id="injuries-status" class="form-input filter-input">
                            <option value="all" ${e.status==="all"?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                            <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629" ${e.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</option>
                            <option value="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621" ${e.status==="\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621"?"selected":""}>\u062A\u0645 \u0627\u0644\u0634\u0641\u0627\u0621</option>
                            <option value="\u0645\u063A\u0644\u0642" ${e.status==="\u0645\u063A\u0644\u0642"?"selected":""}>\u0645\u063A\u0644\u0642</option>
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-type-filter">\u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629</label>
                        <select id="injuries-type-filter" class="form-input filter-input">
                            <option value="all" ${(e.injuryType||"all")==="all"?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>
                            ${i.map(p=>`
                                <option value="${Utils.escapeHTML(p)}" ${(e.injuryType||"all")===p?"selected":""}>${Utils.escapeHTML(p)}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-body-part-filter">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645)</label>
                        <select id="injuries-body-part-filter" class="form-input filter-input">
                            <option value="all" ${(e.injuryBodyPart||"all")==="all"?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0645\u0627\u0643\u0646</option>
                            ${o.map(p=>`
                                <option value="${Utils.escapeHTML(p)}" ${(e.injuryBodyPart||"all")===p?"selected":""}>${Utils.escapeHTML(p)}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-department">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</label>
                        <select id="injuries-department" class="form-input filter-input">
                            <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A</option>
                            ${n.map(p=>`
                                <option value="${Utils.escapeHTML(p)}" ${e.department===p?"selected":""}>${Utils.escapeHTML(p)}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-date-from">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                        <input type="date" id="injuries-date-from" class="form-input filter-input" value="${e.dateFrom||""}" title="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E">
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="injuries-date-to">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                        <input type="date" id="injuries-date-to" class="form-input filter-input" value="${e.dateTo||""}" title="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E">
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
        `,this.applyModuleI18n(t),this.bindInjuriesTabEvents(t),setTimeout(()=>{const p=t.querySelector(".clinic-table-wrapper");p&&this.setupTableScrollListeners(p)},100)},bindInjuriesTabEvents(t){const e=t.querySelector("#injuries-search"),a=t.querySelector("#injuries-type-filter"),s=t.querySelector("#injuries-body-part-filter"),n=t.querySelector("#injuries-status"),i=t.querySelector("#injuries-department"),o=t.querySelector("#injuries-date-from"),l=t.querySelector("#injuries-date-to"),r=t.querySelector("#injuries-reset-filters"),c=t.querySelector("#injuries-types-settings-btn"),d=t.querySelector("#injuries-body-parts-settings-btn"),f=t.querySelector("#injuries-add-btn"),p=t.querySelector("#injuries-export-pdf-btn"),m=t.querySelector("#injuries-export-excel-btn");if(t.querySelectorAll(".injury-person-tab-btn").forEach(u=>{u.addEventListener("click",()=>{const g=u.getAttribute("data-tab")||"employees";this.state.activeInjuryType=g,this.renderInjuriesTab()})}),e){let u=!1;const g=(y,v=null)=>{this.state.filters.injuries.search=String(y||""),this._injurySearchDebounceTimer&&clearTimeout(this._injurySearchDebounceTimer),this._injurySearchDebounceTimer=setTimeout(()=>{this.renderInjuriesTab(),requestAnimationFrame(()=>{const S=document.getElementById("injuries-search");if(!S)return;S.focus();const L=typeof v=="number"?v:S.value.length;try{S.setSelectionRange(L,L)}catch{}})},120)};e.addEventListener("compositionstart",()=>{u=!0}),e.addEventListener("compositionend",y=>{u=!1,g(y.target.value,y.target.selectionStart)}),e.addEventListener("input",y=>{u||g(y.target.value,y.target.selectionStart)})}n&&n.addEventListener("change",u=>{this.state.filters.injuries.status=u.target.value,this.renderInjuriesTab()}),a&&a.addEventListener("change",u=>{this.state.filters.injuries.injuryType=u.target.value,this.renderInjuriesTab()}),s&&s.addEventListener("change",u=>{this.state.filters.injuries.injuryBodyPart=u.target.value,this.renderInjuriesTab()}),i&&i.addEventListener("change",u=>{this.state.filters.injuries.department=u.target.value,this.renderInjuriesTab()}),o&&o.addEventListener("change",u=>{this.state.filters.injuries.dateFrom=u.target.value,this.renderInjuriesTab()}),l&&l.addEventListener("change",u=>{this.state.filters.injuries.dateTo=u.target.value,this.renderInjuriesTab()}),f?.addEventListener("click",()=>this.showInjuryForm()),c?.addEventListener("click",()=>this.showInjuryTypesSettingsModal()),d?.addEventListener("click",()=>this.showInjuryBodyPartsSettingsModal()),r?.addEventListener("click",()=>{this.state.filters.injuries={search:"",status:"all",department:"",injuryType:"all",injuryBodyPart:"all",dateFrom:"",dateTo:""},this.renderInjuriesTab()}),p?.addEventListener("click",()=>this.exportInjuriesToPDF()),m?.addEventListener("click",()=>this.exportInjuriesToExcel()),t.querySelectorAll('[data-action="view-injury"]').forEach(u=>{u.addEventListener("click",()=>this.viewInjuryRecord(u.getAttribute("data-id")))}),t.querySelectorAll('[data-action="edit-injury"]').forEach(u=>{u.addEventListener("click",()=>this.editInjury(u.getAttribute("data-id")))})},analyzeClinicVisitsData(){const t=AppState.appData.clinicVisits||[],e=AppState.appData.sickLeave||[],a=AppState.appData.injuries||[],s=[...t.map(r=>({type:"\u0632\u064A\u0627\u0631\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.contractorName||r.externalName||"",jobTitle:r.employeePosition||r.position||"-",location:r.employeeLocation||r.workArea||"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.diagnosis||"-",date:r.visitDate||r.createdAt})),...e.map(r=>({type:"\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.personName||"",jobTitle:r.employeePosition||"-",location:"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.reason||"-",date:r.startDate||r.createdAt})),...a.map(r=>({type:"\u0625\u0635\u0627\u0628\u0629",personType:r.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641",name:r.employeeName||r.personName||"",jobTitle:"-",location:r.injuryLocation||"-",department:r.employeeDepartment||r.department||"-",diagnosis:r.injuryType||"-",date:r.injuryDate||r.createdAt}))],n={};s.forEach(r=>{const c=r.jobTitle;n[c]||(n[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),n[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&n[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&n[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&n[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&n[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&n[c].injuries++});const i={};s.forEach(r=>{const c=r.location;i[c]||(i[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),i[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&i[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&i[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&i[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&i[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&i[c].injuries++});const o={};s.forEach(r=>{const c=r.department;o[c]||(o[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),o[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&o[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&o[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&o[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&o[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&o[c].injuries++});const l={};return s.forEach(r=>{const c=r.diagnosis;l[c]||(l[c]={total:0,employees:0,contractors:0,visits:0,sickLeaves:0,injuries:0}),l[c].total++,r.personType==="\u0645\u0648\u0638\u0641"&&l[c].employees++,r.personType==="\u0645\u0642\u0627\u0648\u0644"&&l[c].contractors++,r.type==="\u0632\u064A\u0627\u0631\u0629"&&l[c].visits++,r.type==="\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629"&&l[c].sickLeaves++,r.type==="\u0625\u0635\u0627\u0628\u0629"&&l[c].injuries++}),{totalRecords:s.length,totalEmployees:s.filter(r=>r.personType==="\u0645\u0648\u0638\u0641").length,totalContractors:s.filter(r=>r.personType==="\u0645\u0642\u0627\u0648\u0644").length,totalVisits:t.length,totalSickLeaves:e.length,totalInjuries:a.length,byJobTitle:Object.entries(n).sort((r,c)=>c[1].total-r[1].total),byLocation:Object.entries(i).sort((r,c)=>c[1].total-r[1].total),byDepartment:Object.entries(o).sort((r,c)=>c[1].total-r[1].total),byDiagnosis:Object.entries(l).sort((r,c)=>c[1].total-r[1].total)}},renderAnalyticsTab(){const t=document.querySelector('.clinic-tab-panel[data-tab-panel="analytics"]');if(!t)return;const e=this.analyzeClinicVisitsData(),a=(s,n,i)=>{if(!n||n.length===0)return`
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
            `};t.innerHTML=`
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
                                <p class="text-2xl font-bold text-gray-900">${e.totalRecords}</p>
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
                                <p class="text-2xl font-bold text-gray-900">${e.totalEmployees}</p>
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
                                <p class="text-2xl font-bold text-gray-900">${e.totalContractors}</p>
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
                                <p class="text-2xl font-bold text-gray-900">${e.totalVisits}</p>
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
                                <p class="text-2xl font-bold text-gray-900">${e.totalSickLeaves}</p>
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
                                <p class="text-2xl font-bold text-gray-900">${e.totalInjuries}</p>
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
                ${a("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629",e.byJobTitle,"fas fa-briefcase")}

                <!-- \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 -->
                ${a("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644",e.byLocation,"fas fa-map-marker-alt")}

                <!-- \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 -->
                ${a("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",e.byDepartment,"fas fa-building")}

                <!-- \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635 -->
                ${a("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635",e.byDiagnosis,"fas fa-stethoscope")}
            </div>
        `,this.applyModuleI18n(t),this.bindAnalyticsTabEvents(t)},bindAnalyticsTabEvents(t){const e=t.querySelector("#analytics-export-pdf-btn"),a=t.querySelector("#analytics-export-excel-btn");e?.addEventListener("click",()=>this.exportAnalyticsToPDF()),a?.addEventListener("click",()=>this.exportAnalyticsToExcel())},exportAnalyticsToExcel(){if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=this.analyzeClinicVisitsData(),e=XLSX.utils.book_new(),a=[["\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A","\u0627\u0644\u0639\u062F\u062F"],["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",t.totalRecords],["\u0645\u0648\u0638\u0641\u064A\u0646",t.totalEmployees],["\u0645\u0642\u0627\u0648\u0644\u064A\u0646",t.totalContractors],["\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629",t.totalVisits],["\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",t.totalSickLeaves],["\u0625\u0635\u0627\u0628\u0627\u062A",t.totalInjuries]],s=XLSX.utils.aoa_to_sheet(a);XLSX.utils.book_append_sheet(e,s,"\u0645\u0644\u062E\u0635 \u0639\u0627\u0645");const n=(o,l)=>{const r=[[l,"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0645\u0648\u0638\u0641\u064A\u0646","\u0645\u0642\u0627\u0648\u0644\u064A\u0646","\u0632\u064A\u0627\u0631\u0627\u062A","\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629","\u0625\u0635\u0627\u0628\u0627\u062A"]];return o.forEach(([c,d])=>{r.push([c,d.total,d.employees,d.contractors,d.visits,d.sickLeaves,d.injuries])}),XLSX.utils.aoa_to_sheet(r)};XLSX.utils.book_append_sheet(e,n(t.byJobTitle,"\u0627\u0644\u0648\u0638\u064A\u0641\u0629"),"\u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629"),XLSX.utils.book_append_sheet(e,n(t.byLocation,"\u0627\u0644\u0645\u0643\u0627\u0646"),"\u062D\u0633\u0628 \u0627\u0644\u0645\u0643\u0627\u0646"),XLSX.utils.book_append_sheet(e,n(t.byDepartment,"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"),"\u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"),XLSX.utils.book_append_sheet(e,n(t.byDiagnosis,"\u0627\u0644\u062A\u0634\u062E\u064A\u0635"),"\u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635");const i=`Clinic_Analytics_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(e,i),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},exportAnalyticsToPDF(){const t=this.analyzeClinicVisitsData(),e=(i,o)=>{if(!o||o.length===0)return"";const l=o.map(([r,c])=>`
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
                    <tr><th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A</th><td>${t.totalRecords}</td></tr>
                    <tr><th>\u0645\u0648\u0638\u0641\u064A\u0646</th><td>${t.totalEmployees}</td></tr>
                    <tr><th>\u0645\u0642\u0627\u0648\u0644\u064A\u0646</th><td>${t.totalContractors}</td></tr>
                    <tr><th>\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</th><td>${t.totalVisits}</td></tr>
                    <tr><th>\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629</th><td>${t.totalSickLeaves}</td></tr>
                    <tr><th>\u0625\u0635\u0627\u0628\u0627\u062A</th><td>${t.totalInjuries}</td></tr>
                </tbody>
            </table>
            
            ${e("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629",t.byJobTitle)}
            ${e("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644",t.byLocation)}
            ${e("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",t.byDepartment)}
            ${e("\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062A\u0634\u062E\u064A\u0635",t.byDiagnosis)}
        `,s=`CLINIC-ANALYTICS-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,"\u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u0631\u062F\u062F\u064A\u0646 \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const i=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),l=window.open(o,"_blank");l?(l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0645\u0644\u0641 PDF \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(i){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",i),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A")}},analyzeAllClinicData(){try{this.ensureData()}catch(f){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A ensureData:",f)}const t=AppState.appData?.clinicVisits||[],e=AppState.appData?.clinicMedications||[],a=AppState.appData?.sickLeave||[],s=AppState.appData?.injuries||[],n=AppState.appData?.clinicSupplyRequests||[],i={total:e.length,byStatus:{},byType:{},expired:0,expiringSoon:0,totalQuantity:0,totalDispensed:0,byLocation:{}};e.forEach(f=>{const p=f.status||"\u0633\u0627\u0631\u064A",m=f.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",u=f.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";i.byStatus[p]=(i.byStatus[p]||0)+1,i.byType[m]=(i.byType[m]||0)+1,i.byLocation[u]=(i.byLocation[u]||0)+1,p==="\u0645\u0646\u062A\u0647\u064A"&&i.expired++,p==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"&&i.expiringSoon++;const g=f.remainingQuantity??f.quantity??0,y=f.quantityAdded??f.quantity??0;i.totalQuantity+=g,i.totalDispensed+=Math.max(0,y-g)});const o={total:t.length,byMonth:{},byReason:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0,\u062E\u0627\u0631\u062C\u064A:0},byDepartment:{},byLocation:{},averagePerMonth:0};t.forEach(f=>{try{const v=f.visitDate||f.createdAt;if(!v)return;const S=new Date(v);if(isNaN(S.getTime()))return;const L=`${S.getFullYear()}-${String(S.getMonth()+1).padStart(2,"0")}`;o.byMonth[L]=(o.byMonth[L]||0)+1}catch{}const p=f.reason||f.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byReason[p]=(o.byReason[p]||0)+1;const m=String(f.personType||"").toLowerCase().trim(),u=m==="contractor"||m==="external"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";o.byPersonType[u]=(o.byPersonType[u]||0)+1;const g=f.employeeDepartment||f.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byDepartment[g]=(o.byDepartment[g]||0)+1;const y=f.employeeLocation||f.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";o.byLocation[y]=(o.byLocation[y]||0)+1});const l=Object.keys(o.byMonth).length;o.averagePerMonth=l>0?(o.total/l).toFixed(1):0;const r={total:a.length,byMonth:{},byStatus:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},byDepartment:{},totalDays:0,averageDays:0};a.forEach(f=>{try{const g=f.startDate||f.createdAt;if(!g)return;const y=new Date(g);if(isNaN(y.getTime()))return;const v=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`;r.byMonth[v]=(r.byMonth[v]||0)+1}catch{}const p=f.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629";r.byStatus[p]=(r.byStatus[p]||0)+1;const m=f.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";r.byPersonType[m]=(r.byPersonType[m]||0)+1;const u=f.employeeDepartment||f.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(r.byDepartment[u]=(r.byDepartment[u]||0)+1,f.startDate&&f.endDate){const g=new Date(f.startDate),y=new Date(f.endDate),v=Math.ceil((y-g)/(1e3*60*60*24))+1;r.totalDays+=v}}),r.averageDays=r.total>0?(r.totalDays/r.total).toFixed(1):0;const c={total:s.length,byMonth:{},byType:{},byLocation:{},byPersonType:{\u0645\u0648\u0638\u0641:0,\u0645\u0642\u0627\u0648\u0644:0},byDepartment:{},byStatus:{}};s.forEach(f=>{try{const v=f.injuryDate||f.createdAt;if(!v)return;const S=new Date(v);if(isNaN(S.getTime()))return;const L=`${S.getFullYear()}-${String(S.getMonth()+1).padStart(2,"0")}`;c.byMonth[L]=(c.byMonth[L]||0)+1}catch{}const p=f.injuryType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byType[p]=(c.byType[p]||0)+1;const m=f.injuryLocation||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byLocation[m]=(c.byLocation[m]||0)+1;const u=f.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";c.byPersonType[u]=(c.byPersonType[u]||0)+1;const g=f.employeeDepartment||f.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";c.byDepartment[g]=(c.byDepartment[g]||0)+1;const y=f.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629";c.byStatus[y]=(c.byStatus[y]||0)+1});const d={total:n.length,byStatus:{},byType:{},byPriority:{},byMonth:{},pending:0,approved:0,rejected:0,fulfilled:0};return n.forEach(f=>{try{const p=f.status||"pending";d.byStatus[p]=(d.byStatus[p]||0)+1,p==="pending"&&d.pending++,p==="approved"&&d.approved++,p==="rejected"&&d.rejected++,p==="fulfilled"&&d.fulfilled++;const m=f.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";d.byType[m]=(d.byType[m]||0)+1;const u=f.priority||"normal";d.byPriority[u]=(d.byPriority[u]||0)+1;const g=f.createdAt||f.requestDate;if(g){const y=new Date(g);if(!isNaN(y.getTime())){const v=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`;d.byMonth[v]=(d.byMonth[v]||0)+1}}}catch{}}),{medications:i,visits:o,sickLeaves:r,injuries:c,supplyRequests:d,summary:{totalRecords:t.length+a.length+s.length,totalMedications:e.length,totalSupplyRequests:n.length,totalVisits:t.length,totalSickLeaves:a.length,totalInjuries:s.length}}},renderDataAnalysisTab(){const t=document.querySelector('.clinic-tab-panel[data-tab-panel="data-analysis"]');t&&(this.ensureChartJSLoaded().catch(()=>{}),t.innerHTML=`
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
                        ${["30","90","180","365","0"].map((e,a)=>{const s=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],n=(this._clinicPeriod||"0")===e;return`<button type="button" class="clinic-period-btn" data-period="${e}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${n?"#fff":"rgba(255,255,255,0.15)"};color:${n?"#134e4a":"#fff"};">${s[a]}</button>`}).join("")}
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
                    ${[{id:"clinic-af-factory",icon:"fas fa-industry",color:"#ec4899",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{id:"clinic-af-ptype",icon:"fas fa-id-badge",color:"#6366f1",label:"\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635"},{id:"clinic-af-dept",icon:"fas fa-building",color:"#0d9488",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{id:"clinic-af-loc",icon:"fas fa-map-marker-alt",color:"#f59e0b",label:"\u0627\u0644\u0645\u0648\u0642\u0639"},{id:"clinic-af-reason",icon:"fas fa-stethoscope",color:"#3b82f6",label:"\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"}].map(e=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                                <i class="${e.icon}" style="color:${e.color};margin-left:4px;"></i>${e.label}
                            </label>
                            <select id="${e.id}" style="width:100%;padding:7px 10px;border:1.5px solid #99f6e4;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#0d9488'" onblur="this.style.borderColor='#99f6e4'">
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
        </div>`,this.applyModuleI18n(t),setTimeout(()=>{this.updateClinicAnalyticsDashboard(),this._clinicBindAnalyticsEvents()},80))},bindDataAnalysisTabEvents(t){},async updateClinicAnalyticsDashboard(){const t=document.getElementById("clinic-analytics-root");if(!t)return;try{this.ensureData()}catch{}const e=parseInt(this._clinicPeriod||"0",10),a=this.getActualClinicVisits_(AppState.appData?.clinicVisits),s=AppState.appData?.clinicMedications||[],n=AppState.appData?.sickLeave||[],i=AppState.appData?.injuries||[],o=AppState.appData?.clinicSupplyRequests||[],l=e>0?(()=>{const T=new Date;return T.setDate(T.getDate()-e),T})():null,r=(T,H)=>l?T.filter(W=>{const Q=new Date(W[H]||W.createdAt||"");return!isNaN(Q.getTime())&&Q>=l}):T,c=r(a,"visitDate"),d=r(n,"startDate"),f=r(i,"injuryDate");this._clinicPopulateFilters(c);const p=this._clinicApplyFilters(c),m=p.length,u=document.getElementById("clinic-filter-count");u&&(u.textContent=`${m} \u0632\u064A\u0627\u0631\u0629`);const g=p.filter(T=>String(T.personType||"").toLowerCase()!=="contractor"),y=p.filter(T=>String(T.personType||"").toLowerCase()==="contractor"),v=new Date,S=p.filter(T=>{const H=new Date(T.visitDate||T.createdAt||"");return H.getFullYear()===v.getFullYear()&&H.getMonth()===v.getMonth()}).length,L=s.filter(T=>T.status==="\u0645\u0646\u062A\u0647\u064A").length,M=s.filter(T=>T.status==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621").length,E=d.filter(T=>!T.status||T.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629").length,h=new Set(p.map(T=>{const H=new Date(T.visitDate||T.createdAt||"");return isNaN(H.getTime())?null:`${H.getFullYear()}-${H.getMonth()}`}).filter(Boolean)).size,I=h>0?(m/h).toFixed(1):0,C=this.analyzeDispensedMedications_(p,s),j=document.getElementById("clinic-kpi-strip");if(j){const T=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",value:m,icon:"fas fa-hospital-user",color:"#0d9488",bg:"#f0fdfa",border:"#99f6e4"},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",value:g.length,icon:"fas fa-user-tie",color:"#3b82f6",bg:"#eff6ff",border:"#bfdbfe"},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",value:y.length,icon:"fas fa-hard-hat",color:"#f97316",bg:"#fff7ed",border:"#fed7aa"},{label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629",value:d.length,icon:"fas fa-notes-medical",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{label:"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",value:f.length,icon:"fas fa-user-injured",color:"#ef4444",bg:"#fef2f2",border:"#fecaca"},{label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u062A\u0647\u064A\u0629",value:L,icon:"fas fa-pills",color:"#dc2626",bg:"#fef2f2",border:"#fca5a5"},{label:"\u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",value:M,icon:"fas fa-exclamation",color:"#d97706",bg:"#fffbeb",border:"#fde68a"},{label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",value:E,icon:"fas fa-clock",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0634\u0647\u0631\u064A",value:I,icon:"fas fa-calendar-check",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"}];j.innerHTML=T.map(H=>`
                <div style="background:${H.bg};border:1px solid ${H.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${H.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${H.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${H.color};line-height:1;">${H.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${H.label}</div>
                    </div>
                </div>`).join("")}const w=document.getElementById("clinic-med-analysis-summary");w&&(w.textContent=C.totalDispensedQty>0?`${C.uniqueMedicines} \u062F\u0648\u0627\u0621 \u0645\u062E\u062A\u0644\u0641 \u2022 ${C.dispenseLines} \u0639\u0645\u0644\u064A\u0629 \u0635\u0631\u0641 \u2022 ${C.visitsWithMedications} \u0632\u064A\u0627\u0631\u0629 \u0628\u062F\u0648\u0627\u0621`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0636\u0645\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629");const x=document.getElementById("clinic-med-kpi-strip");if(x){const T=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",value:C.totalDispensedQty,icon:"fas fa-prescription-bottle-alt",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0623\u062F\u0648\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629",value:C.uniqueMedicines,icon:"fas fa-pills",color:"#059669",bg:"#f0fdf4",border:"#bbf7d0"},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u0635\u0631\u0641 \u062F\u0648\u0627\u0621",value:C.visitsWithMedications,icon:"fas fa-capsules",color:"#0d9488",bg:"#f0fdfa",border:"#99f6e4"},{label:"\u0632\u064A\u0627\u0631\u0627\u062A \u0628\u062F\u0648\u0646 \u062F\u0648\u0627\u0621",value:C.visitsWithoutMedications,icon:"fas fa-hospital",color:"#64748b",bg:"#f8fafc",border:"#e2e8f0"},{label:"\u0639\u0645\u0644\u064A\u0627\u062A \u0635\u0631\u0641",value:C.dispenseLines,icon:"fas fa-hand-holding-medical",color:"#0891b2",bg:"#ecfeff",border:"#a5f3fc"}];x.innerHTML=T.map(H=>`
                <div style="background:${H.bg};border:1px solid ${H.border};border-radius:12px;padding:11px 12px;text-align:center;">
                    <i class="${H.icon}" style="color:${H.color};font-size:14px;"></i>
                    <div style="font-size:1.15rem;font-weight:800;color:${H.color};margin-top:4px;">${Number(H.value||0).toLocaleString("en-US")}</div>
                    <div style="font-size:0.65rem;color:#64748b;margin-top:2px;">${H.label}</div>
                </div>`).join("")}if(!await this.ensureChartJSLoaded()||typeof Chart>"u"){t.insertAdjacentHTML("afterbegin",'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629.</span></div>');return}const b={};p.forEach(T=>{const H=String(T.personType||"").toLowerCase()==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641";b[H]=(b[H]||0)+1}),this._cDoughnut("clinic-chart-ptype",Object.keys(b),Object.values(b),["rgba(59,130,246,0.85)","rgba(249,115,22,0.85)"]),this._cTrend("clinic-chart-trend",a,"visitDate");const U=this._cGroupBy(p,T=>T.reason||T.diagnosis||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",10);this._cHBar("clinic-chart-reason",U.labels,U.data,"rgba(13,148,136,0.75)");const q=this._cGroupBy(p,T=>T.employeeLocation||T.workArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",10),F=document.getElementById("clinic-locs-list");F&&(m===0||q.labels.length===0?F.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>':F.innerHTML=q.labels.map((T,H)=>{const W=q.data[H],Q=Math.round(W/m*100);return`
                        <div style="display:flex;flex-direction:column;gap:5px;border-bottom:1px solid #f1f5f9;padding-bottom:8px;cursor:pointer;transition:background 0.2s;padding-left:4px;padding-right:4px;" 
                             onmouseover="this.style.background='#f0fdfa'" 
                             onmouseout="this.style.background='transparent'"
                             onclick="const el = document.getElementById('clinic-af-loc'); if(el){el.value='${Utils.escapeHTML(T)}'; el.dispatchEvent(new Event('change'));}">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
                                    <span style="background:#e0f2fe;color:#0369a1;font-size:0.68rem;padding:2px 8px;border-radius:6px;font-weight:700;white-space:nowrap;flex-shrink:0;">\u0645\u0648\u0642\u0639</span>
                                    <span style="font-size:0.78rem;font-weight:700;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${Utils.escapeHTML(T)}">${Utils.escapeHTML(T)}</span>
                                </div>
                                <span style="font-size:0.75rem;font-weight:700;color:#0369a1;flex-shrink:0;margin-right:8px;">${W} \u0632\u064A\u0627\u0631\u0629 (${Q}%)</span>
                            </div>
                            <div style="width:100%;height:6px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                                <div style="width:${Q}%;height:100%;background:linear-gradient(90deg, #38bdf8 0%, #0284c7 100%);border-radius:9999px;"></div>
                            </div>
                        </div>
                    `}).join(""));const _=this._cGroupBy(p,T=>T.employeeDepartment||T.department||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",10),P=document.getElementById("clinic-depts-list");P&&(m===0||_.labels.length===0?P.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>':P.innerHTML=_.labels.map((T,H)=>{const W=_.data[H],Q=Math.round(W/m*100);return`
                        <div style="cursor:pointer;padding:4px;border-radius:6px;transition:background 0.2s;" 
                             onmouseover="this.style.background='#eff6ff'" 
                             onmouseout="this.style.background='transparent'"
                             onclick="const el = document.getElementById('clinic-af-dept'); if(el){el.value='${Utils.escapeHTML(T)}'; el.dispatchEvent(new Event('change'));}">
                            <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:700;color:#374151;margin-bottom:4px;">
                                <span>${Utils.escapeHTML(T)}</span>
                                <span style="color:#2563eb;">${W} \u0632\u064A\u0627\u0631\u0629 (${Q}%)</span>
                            </div>
                            <div style="width:100%;height:8px;background:#e5e7eb;border-radius:9999px;overflow:hidden;">
                                <div style="width:${Q}%;height:100%;background:linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);border-radius:9999px;transition:width 0.5s ease-in-out;"></div>
                            </div>
                        </div>
                    `}).join(""));const z=document.getElementById("clinic-factories-cards");if(z)if(m===0)z.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>';else{const T=new Set(c.map(W=>String(W.factoryName||W.factory||"").trim()).filter(W=>W&&W!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")),H=Array.from(T).sort();H.length===0?z.innerHTML='<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:40px 0;grid-column:1/-1;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0635\u0627\u0646\u0639</div>':z.innerHTML=H.map((W,Q)=>{const J=p.filter(pt=>(pt.factoryName||pt.factory||"").trim()===W).length,ct=m>0?Math.round(J/m*100):0,dt=[{primary:"#0284c7",light:"#e0f2fe",progress:"linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)"},{primary:"#059669",light:"#ecfdf5",progress:"linear-gradient(90deg, #34d399 0%, #059669 100%)"},{primary:"#7c3aed",light:"#f5f3ff",progress:"linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%)"},{primary:"#ea580c",light:"#fff7ed",progress:"linear-gradient(90deg, #fb923c 0%, #ea580c 100%)"},{primary:"#db2777",light:"#fdf2f8",progress:"linear-gradient(90deg, #f472b6 0%, #db2777 100%)"}],lt=dt[Q%dt.length];return`
                            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:all .2s;cursor:pointer;" 
                                 onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)';this.style.borderColor='${lt.primary}'"
                                 onmouseout="this.style.transform='';this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)';this.style.borderColor='#e2e8f0'"
                                 onclick="const el = document.getElementById('clinic-af-factory'); if(el){el.value='${Utils.escapeHTML(W)}'; el.dispatchEvent(new Event('change'));}">
                                
                                <div style="display:flex;justify-content:space-between;align-items:center;">
                                    <div style="display:flex;align-items:center;gap:8px;">
                                        <div style="width:36px;height:36px;background:${lt.light};border-radius:8px;display:flex;align-items:center;justify-content:center;color:${lt.primary};">
                                            <i class="fas fa-industry" style="font-size:16px;"></i>
                                        </div>
                                        <span style="font-size:0.9rem;font-weight:800;color:#1e293b;">${Utils.escapeHTML(W)}</span>
                                    </div>
                                    <span style="font-size:1.15rem;font-weight:900;color:${lt.primary};">${ct}%</span>
                                </div>
                                
                                <div style="width:100%;height:8px;background:#f1f5f9;border-radius:9999px;overflow:hidden;">
                                    <div style="width:${ct}%;height:100%;background:${lt.progress};border-radius:9999px;"></div>
                                </div>
                                
                                <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;color:#64748b;margin-top:2px;">
                                    <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A: <strong style="color:#334155;">${J}</strong></span>
                                </div>
                            </div>
                        `}).join("")}const R=p.filter(T=>{const H=String(T.contractorName||"").trim(),W=String(T.externalName||"").trim(),Q=String(T.personType||"").trim().toLowerCase();return H||W||Q==="contractor"||Q==="external"}),D=this._cGroupBy(R,T=>String(T.contractorName||T.externalName||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8),$=document.getElementById("clinic-chart-contractor-count");$&&($.textContent=R.length>0?`${R.length} \u0632\u064A\u0627\u0631\u0629 \u2022 ${D.labels.length} \u0645\u0642\u0627\u0648\u0644`:""),this._cHBar("clinic-chart-contractor",D.labels,D.data,"rgba(8,145,178,0.75)");const k=this._cGroupBy(d,T=>T.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629"),O={\u0645\u0639\u062A\u0645\u062F\u0629:"rgba(16,185,129,0.85)",\u0645\u0631\u0641\u0648\u0636\u0629:"rgba(239,68,68,0.85)","\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629":"rgba(245,158,11,0.85)"};this._cDoughnut("clinic-chart-sl-status",k.labels,k.data,k.labels.map(T=>O[T]||"rgba(148,163,184,0.8)"));const N=this._cGroupBy(f,T=>T.injuryType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._cHBar("clinic-chart-inj-type",N.labels,N.data,"rgba(239,68,68,0.75)");const B=this._cGroupBy(s,T=>T.status||"\u0633\u0627\u0631\u064A"),V={\u0633\u0627\u0631\u064A:"rgba(16,185,129,0.85)",\u0645\u0646\u062A\u0647\u064A:"rgba(239,68,68,0.85)","\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"rgba(245,158,11,0.85)"};this._cDoughnut("clinic-chart-med-status",B.labels,B.data,B.labels.map(T=>V[T]||"rgba(148,163,184,0.8)")),this._cCompare("clinic-chart-compare",a,n,i);const X=C.topByQuantity.slice(0,10);this._cHBar("clinic-chart-med-top-qty",X.map(T=>T.name),X.map(T=>T.totalQty),"rgba(16,185,129,0.78)");const Y=C.byMonth.labels,at=C.byMonth.data;if(Y.length&&at.reduce((T,H)=>T+H,0)>0){const T=document.getElementById("clinic-chart-med-monthly"),H=document.getElementById("clinic-chart-med-monthly-empty");if(T){H&&(H.style.display="none"),T.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts["clinic-chart-med-monthly"]&&this._clinicCharts["clinic-chart-med-monthly"].destroy()}catch{}this._clinicCharts["clinic-chart-med-monthly"]=new Chart(T,{type:"line",data:{labels:Y,datasets:[{label:"\u0643\u0645\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",data:at,borderColor:"rgba(5,150,105,0.9)",backgroundColor:"rgba(16,185,129,0.12)",borderWidth:2.5,pointRadius:4,tension:.35,fill:!0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}}}}})}}else{const T=document.getElementById("clinic-chart-med-monthly"),H=document.getElementById("clinic-chart-med-monthly-empty");T&&(T.style.display="none"),H&&(H.style.display="flex")}this._cDoughnut("clinic-chart-med-ptype",["\u0645\u0648\u0638\u0641","\u0645\u0642\u0627\u0648\u0644"],[C.byPersonType.\u0645\u0648\u0638\u0641||0,C.byPersonType.\u0645\u0642\u0627\u0648\u0644||0],["rgba(59,130,246,0.85)","rgba(249,115,22,0.85)"]),this._cHBar("clinic-chart-med-dept",C.byDepartment.labels,C.byDepartment.data,"rgba(99,102,241,0.75)");const Z=document.getElementById("clinic-med-table-count"),ot=document.getElementById("clinic-med-top-tbody"),tt=C.topByQuantity.slice(0,15);Z&&(Z.textContent=tt.length?`${tt.length} \u062F\u0648\u0627\u0621`:""),ot&&(ot.innerHTML=tt.length===0?'<tr><td colspan="9" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</td></tr>':tt.map((T,H)=>{const W=T.stockRemaining===null?"\u2014":Number(T.stockRemaining).toLocaleString("en-US"),Q=T.stockRemaining!==null&&T.stockRemaining<=10?"#dc2626":"#0f766e",G=T.stockStatus==="\u0645\u0646\u062A\u0647\u064A"?"#dc2626":T.stockStatus==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"#d97706":"#64748b",J=H%2===0?"#fff":"#fafafa";return`<tr style="border-bottom:1px solid #f8fafc;background:${J};" onmouseover="this.style.background='#ecfdf5'" onmouseout="this.style.background='${J}'">
                        <td style="padding:9px 12px;font-weight:700;color:#64748b;">${H+1}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#047857;">${Utils.escapeHTML(T.name)}</td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;">${Number(T.totalQty).toLocaleString("en-US")}</td>
                        <td style="padding:9px 12px;text-align:center;">${T.dispenseCount}</td>
                        <td style="padding:9px 12px;text-align:center;">${T.visitsCount}</td>
                        <td style="padding:9px 12px;text-align:center;">${T.avgQty}</td>
                        <td style="padding:9px 12px;">${Utils.escapeHTML(T.type)}</td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${Q};">${W}</td>
                        <td style="padding:9px 12px;color:${G};">${Utils.escapeHTML(T.stockStatus)}</td>
                    </tr>`}).join(""));const et=document.getElementById("clinic-med-low-stock-alert"),st=document.getElementById("clinic-med-low-stock-list");et&&st&&(C.lowStockHighDemand.length>0?(et.style.display="block",st.innerHTML=C.lowStockHighDemand.map(T=>`<li><strong>${Utils.escapeHTML(T.name)}</strong>: \u0645\u0646\u0635\u0631\u0641 ${T.totalQty} \u2014 \u0645\u062E\u0632\u0648\u0646 ${T.stockRemaining??"\u2014"}</li>`).join("")):(et.style.display="none",st.innerHTML=""));const K={};p.forEach(T=>{const H=T.contractorWorkerName||T.employeeName||T.externalName||T.personName||T.name||"",W=String(H).trim(),Q=String(T.contractorName||"").trim(),G=W||(Q?Q+" (\u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0639\u0627\u0645\u0644)":"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");K[G]||(K[G]={count:0,dept:"",loc:""}),K[G].count++,K[G].dept||(K[G].dept=T.employeeDepartment||T.department||T.contractorName||T.contractorPosition||"\u2014"),K[G].loc||(K[G].loc=T.employeeLocation||T.workArea||T.factoryName||T.factory||"\u2014")});const nt=Object.entries(K).sort((T,H)=>H[1].count-T[1].count).slice(0,15),rt=document.getElementById("clinic-top-visitors-count"),it=document.getElementById("clinic-top-visitors-tbody");rt&&(rt.textContent=`${nt.length} \u0634\u062E\u0635`),it&&(it.innerHTML=nt.length===0?'<tr><td colspan="5" style="padding:24px;text-align:center;color:#94a3b8;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0632\u064A\u0627\u0631\u0627\u062A</td></tr>':nt.map(([T,H],W)=>{const Q=W%2===0?"#fff":"#fafafa",G=H.count>=5?"#dc2626":H.count>=3?"#f59e0b":"#0d9488";return`<tr style="border-bottom:1px solid #f8fafc;background:${Q};" onmouseover="this.style.background='#f0fdfa'" onmouseout="this.style.background='${Q}'">
                        <td style="padding:9px 12px;font-weight:700;color:#64748b;">${W+1}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#0f766e;">${Utils.escapeHTML(T)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(H.dept)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(H.loc)}</td>
                        <td style="padding:9px 12px;text-align:center;"><span style="background:#f0fdfa;color:${G};padding:3px 10px;border-radius:20px;font-weight:700;font-size:0.82rem;">${H.count} \u0632\u064A\u0627\u0631\u0629</span></td>
                    </tr>`}).join(""))},_clinicApplyFilters(t){const e=c=>{const d=document.getElementById(c);return d?d.value.trim():""},a=e("clinic-af-factory"),s=e("clinic-af-ptype"),n=e("clinic-af-dept"),i=e("clinic-af-loc"),o=e("clinic-af-reason"),l=[a,s,n,i,o].some(c=>c!==""),r=document.getElementById("clinic-filter-badge");return r&&(r.style.display=l?"inline":"none"),t.filter(c=>!(a&&String(c.factoryName||c.factory||"").trim()!==a||s&&(String(c.personType||"").toLowerCase()==="contractor"?"contractor":"employee")!==s||n&&String(c.employeeDepartment||c.department||"").trim()!==n||i&&String(c.employeeLocation||c.workArea||"").trim()!==i||o&&String(c.reason||c.diagnosis||"").trim()!==o))},_clinicPopulateFilters(t){const e=n=>[...new Set(t.map(n).filter(Boolean))].sort(),a=(n,i)=>{const o=document.getElementById(n);if(!o)return;const l=o.value;o.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+i.map(r=>`<option value="${r}"${r===l?" selected":""}>${r}</option>`).join("")},s=document.getElementById("clinic-af-ptype");if(s){const n=s.value;s.innerHTML=`<option value="">\u0627\u0644\u0643\u0644</option><option value="employee"${n==="employee"?" selected":""}>\u0645\u0648\u0638\u0641</option><option value="contractor"${n==="contractor"?" selected":""}>\u0645\u0642\u0627\u0648\u0644</option>`}a("clinic-af-factory",e(n=>String(n.factoryName||n.factory||"").trim())),a("clinic-af-dept",e(n=>String(n.employeeDepartment||n.department||"").trim())),a("clinic-af-loc",e(n=>String(n.employeeLocation||n.workArea||"").trim())),a("clinic-af-reason",e(n=>String(n.reason||n.diagnosis||"").trim()))},_cGroupBy(t,e,a=0){const s={};t.forEach(i=>{const o=e(i)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";s[o]=(s[o]||0)+1});let n=Object.entries(s).sort((i,o)=>o[1]-i[1]);return a>0&&(n=n.slice(0,a)),{labels:n.map(i=>i[0]),data:n.map(i=>i[1])}},_cDoughnut(t,e,a,s){const n=document.getElementById(t),i=document.getElementById(t+"-empty");if(!n)return;if(!a.length||a.reduce((l,r)=>l+r,0)===0){n.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),n.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[t]&&this._clinicCharts[t].destroy()}catch{}const o=a.reduce((l,r)=>l+r,0);this._clinicCharts[t]=new Chart(n,{type:"doughnut",data:{labels:e,datasets:[{data:a,backgroundColor:s,borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.parsed} (${o>0?(l.parsed/o*100).toFixed(1):0}%)`}}}}})},_cHBar(t,e,a,s){const n=document.getElementById(t),i=document.getElementById(t+"-empty");if(n){if(!a.length||a.reduce((o,l)=>o+l,0)===0){n.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),n.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[t]&&this._clinicCharts[t].destroy()}catch{}this._clinicCharts[t]=new Chart(n,{type:"bar",data:{labels:e,datasets:[{data:a,backgroundColor:s||"rgba(13,148,136,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:o=>` ${o.parsed.x}`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:o=>String(e[o]).length>18?String(e[o]).slice(0,17)+"\u2026":e[o]}}}}})}},_cTrend(t,e,a){const s=document.getElementById(t),n=document.getElementById(t+"-empty");if(!s)return;const i=new Date,o=[],l=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];for(let c=11;c>=0;c--){const d=new Date(i.getFullYear(),i.getMonth()-c,1);o.push({y:d.getFullYear(),m:d.getMonth(),label:`${l[d.getMonth()]} ${d.getFullYear()}`})}const r=o.map(c=>e.filter(d=>{const f=new Date(d[a]||d.createdAt||"");return!isNaN(f.getTime())&&f.getFullYear()===c.y&&f.getMonth()===c.m}).length);if(r.reduce((c,d)=>c+d,0)===0){s.style.display="none",n&&(n.style.display="flex");return}n&&(n.style.display="none"),s.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[t]&&this._clinicCharts[t].destroy()}catch{}this._clinicCharts[t]=new Chart(s,{type:"bar",data:{labels:o.map(c=>c.label),datasets:[{label:"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",data:r,backgroundColor:r.map(c=>c===Math.max(...r)?"rgba(13,148,136,0.9)":"rgba(13,148,136,0.5)"),borderRadius:5,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:r,type:"line",borderColor:"rgba(99,102,241,0.9)",backgroundColor:"rgba(99,102,241,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#6366f1",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_cCompare(t,e,a,s){const n=document.getElementById(t),i=document.getElementById(t+"-empty");if(!n)return;const o=new Date,l=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],r=[];for(let u=11;u>=0;u--){const g=new Date(o.getFullYear(),o.getMonth()-u,1);r.push({y:g.getFullYear(),m:g.getMonth(),label:`${l[g.getMonth()]}`})}const c=(u,g)=>r.map(y=>u.filter(v=>{const S=new Date(v[g]||v.createdAt||"");return!isNaN(S.getTime())&&S.getFullYear()===y.y&&S.getMonth()===y.m}).length),d=c(e,"visitDate"),f=c(a,"startDate"),p=c(s,"injuryDate");if(((u,g,y)=>u.reduce((v,S,L)=>v+S+g[L]+y[L],0))(d,f,p)===0){n.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),n.style.display="",this._clinicCharts||(this._clinicCharts={});try{this._clinicCharts[t]&&this._clinicCharts[t].destroy()}catch{}this._clinicCharts[t]=new Chart(n,{type:"bar",data:{labels:r.map(u=>u.label),datasets:[{label:"\u0632\u064A\u0627\u0631\u0627\u062A",data:d,backgroundColor:"rgba(13,148,136,0.75)",borderRadius:4,borderSkipped:!1},{label:"\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",data:f,backgroundColor:"rgba(245,158,11,0.75)",borderRadius:4,borderSkipped:!1},{label:"\u0625\u0635\u0627\u0628\u0627\u062A",data:p,backgroundColor:"rgba(239,68,68,0.75)",borderRadius:4,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_clinicBindAnalyticsEvents(){const t=document.getElementById("clinic-analytics-root");if(!t)return;t.querySelectorAll(".clinic-period-btn").forEach(o=>{o.addEventListener("click",()=>{this._clinicPeriod=o.getAttribute("data-period"),t.querySelectorAll(".clinic-period-btn").forEach(l=>{const r=l===o;l.style.background=r?"#fff":"rgba(255,255,255,0.15)",l.style.color=r?"#134e4a":"#fff"}),this.updateClinicAnalyticsDashboard()})});const e=document.getElementById("clinic-analytics-refresh");e&&e.addEventListener("click",()=>this.updateClinicAnalyticsDashboard());const a=document.getElementById("clinic-export-pdf-btn");a&&a.addEventListener("click",()=>this._clinicExportPDF());const s=document.getElementById("clinic-toggle-filters-btn"),n=document.getElementById("clinic-filter-panel");s&&n&&s.addEventListener("click",()=>{const o=n.style.display!=="none";n.style.display=o?"none":"block",s.style.background=o?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const i=document.getElementById("clinic-filter-reset-btn");i&&i.addEventListener("click",()=>{["clinic-af-factory","clinic-af-ptype","clinic-af-dept","clinic-af-loc","clinic-af-reason"].forEach(o=>{const l=document.getElementById(o);l&&(l.value="")}),this.updateClinicAnalyticsDashboard()}),["clinic-af-factory","clinic-af-ptype","clinic-af-dept","clinic-af-loc","clinic-af-reason"].forEach(o=>{const l=document.getElementById(o);l&&l.addEventListener("change",()=>this.updateClinicAnalyticsDashboard())})},_prepareClinicAnalysisPdfHtmlContent(t){const e=`
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
        `;return typeof t!="string"?"":t.includes("</head>")?t.replace("</head>",e+"</head>"):e+t},async _clinicEnsureHtml2CanvasForPdf_(){return typeof html2canvas<"u"?!0:(await new Promise((t,e)=>{const a=document.createElement("script");a.src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",a.onload=()=>t(),a.onerror=()=>e(new Error("html2canvas")),document.head.appendChild(a)}),typeof html2canvas<"u")},async _clinicExportPDF(){const t=document.getElementById("clinic-analytics-root");if(!t)return;const e=document.getElementById("clinic-export-pdf-btn"),a=e?e.innerHTML:"";e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{await this._clinicEnsureHtml2CanvasForPdf_();const s=document.getElementById("clinic-filter-panel"),n=s&&s.style.display!=="none";n&&(s.style.display="none");const i=Math.min(3,Math.max(2.5,(window.devicePixelRatio||1)*2)),o=await html2canvas(t,{scale:i,useCORS:!0,backgroundColor:"#ffffff",scrollX:0,scrollY:-window.scrollY,logging:!1,width:t.scrollWidth,height:t.scrollHeight,windowWidth:t.scrollWidth,windowHeight:t.scrollHeight});n&&(s.style.display="");let l;try{l=o.toDataURL("image/png")}catch{l=o.toDataURL("image/jpeg",.96)}const r=typeof Utils.formatDateTime=="function"?Utils.formatDateTime(new Date):new Date().toLocaleString("ar-EG"),c=this._clinicPeriod==="month"?"\u0622\u062E\u0631 30 \u064A\u0648\u0645":this._clinicPeriod==="quarter"?"\u0622\u062E\u0631 3 \u0623\u0634\u0647\u0631":this._clinicPeriod==="year"?"\u0622\u062E\u0631 \u0633\u0646\u0629":"\u0643\u0644 \u0627\u0644\u0641\u062A\u0631\u0627\u062A",d=`
                <p class="clinic-analysis-pdf-meta">
                    \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644: ${Utils.escapeHTML(c)} &nbsp;|&nbsp; ${Utils.escapeHTML(r)}
                </p>
                <img class="clinic-analysis-pdf-image" src="${l}" alt="Clinic Medical Analysis Dashboard">
            `,f=`CLINIC-MED-ANALYSIS-${new Date().toISOString().slice(0,10)}`,m=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(f,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0637\u0628\u064A \u0644\u0644\u0639\u064A\u0627\u062F\u0629",d,!1,!1,{source:"ClinicMedicalAnalysis",titleEn:"Clinic Medical Analysis Report",titleAr:"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0637\u0628\u064A \u0644\u0644\u0639\u064A\u0627\u062F\u0629",includeQRCode:!1},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl"><body>${d}</body></html>`,u=this._prepareClinicAnalysisPdfHtmlContent(m);if(typeof FormHeader<"u"&&typeof FormHeader.generatePDF=="function"){const g=await FormHeader.generatePDF(u,`Clinic-Medical-Analysis-Report-${new Date().toISOString().slice(0,10)}.pdf`);g&&typeof Notification<"u"&&Notification.success?Notification.success("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF..."):!g&&typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}else{const g=new Blob([u],{type:"text/html;charset=utf-8"}),y=URL.createObjectURL(g),v=window.open(y,"_blank");v?(v.onload=()=>{setTimeout(()=>{v.print(),setTimeout(()=>URL.revokeObjectURL(y),1e3)},600)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}}catch{typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0651\u0631 \u062A\u0635\u062F\u064A\u0631 PDF")}finally{e&&(e.disabled=!1,e.innerHTML=a)}},renderDataAnalysisCharts(){const t=this.analyzeAllClinicData();typeof Chart<"u"?this.renderChartsWithChartJS(t):this.renderChartsWithCSS(t)},renderChartsWithChartJS(t){const e=document.getElementById("medications-status-chart");if(e&&Object.keys(t.medications.byStatus).length>0){const n=Object.entries(t.medications.byStatus);new Chart(e,{type:"pie",data:{labels:n.map(([i])=>i),datasets:[{data:n.map(([,i])=>i),backgroundColor:["#10b981","#f59e0b","#ef4444","#3b82f6","#8b5cf6"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",rtl:!0}}}})}const a=document.getElementById("visits-month-chart");if(a&&Object.keys(t.visits.byMonth).length>0){const n=Object.entries(t.visits.byMonth).sort();new Chart(a,{type:"line",data:{labels:n.map(([i])=>i),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A",data:n.map(([,i])=>i),borderColor:"#3b82f6",backgroundColor:"rgba(59, 130, 246, 0.1)",tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})}const s=document.getElementById("injuries-type-chart");if(s&&Object.keys(t.injuries.byType).length>0){const n=Object.entries(t.injuries.byType).sort((i,o)=>o[1]-i[1]).slice(0,10);new Chart(s,{type:"bar",data:{labels:n.map(([i])=>i),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A",data:n.map(([,i])=>i),backgroundColor:"#ef4444"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}})}},renderChartsWithCSS(t){const e=document.getElementById("medications-status-chart-container");if(e&&Object.keys(t.medications.byStatus).length>0){const n=Object.entries(t.medications.byStatus),i=Math.max(...n.map(([,o])=>o),1);e.innerHTML=`
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
            `}const a=document.getElementById("visits-month-chart-container");if(a&&Object.keys(t.visits.byMonth).length>0){const n=Object.entries(t.visits.byMonth).sort(),i=Math.max(...n.map(([,o])=>o),1);a.innerHTML=`
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
            `}const s=document.getElementById("injuries-type-chart-container");if(s&&Object.keys(t.injuries.byType).length>0){const n=Object.entries(t.injuries.byType).sort((o,l)=>l[1]-o[1]).slice(0,10),i=Math.max(...n.map(([,o])=>o),1);s.innerHTML=`
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
            `}this.renderAllCSSCharts(t)},renderAllCSSCharts(t){[{id:"medications-type-chart",data:t.medications.byType,color:"#8b5cf6"},{id:"medications-location-chart",data:t.medications.byLocation,color:"#3b82f6"},{id:"visits-reason-chart",data:t.visits.byReason,color:"#10b981"},{id:"visits-department-chart",data:t.visits.byDepartment,color:"#3b82f6"},{id:"visits-location-chart",data:t.visits.byLocation,color:"#06b6d4"},{id:"sickleave-month-chart",data:t.sickLeaves.byMonth,color:"#f59e0b"},{id:"sickleave-status-chart",data:t.sickLeaves.byStatus,color:"#f59e0b"},{id:"sickleave-department-chart",data:t.sickLeaves.byDepartment,color:"#f59e0b"},{id:"injuries-month-chart",data:t.injuries.byMonth,color:"#ef4444"},{id:"injuries-location-chart",data:t.injuries.byLocation,color:"#ef4444"},{id:"injuries-department-chart",data:t.injuries.byDepartment,color:"#ef4444"},{id:"injuries-status-chart",data:t.injuries.byStatus,color:"#ef4444"},{id:"supply-status-chart",data:t.supplyRequests.byStatus,color:"#06b6d4"},{id:"supply-type-chart",data:t.supplyRequests.byType,color:"#06b6d4"},{id:"supply-priority-chart",data:t.supplyRequests.byPriority,color:"#06b6d4"},{id:"supply-month-chart",data:t.supplyRequests.byMonth,color:"#06b6d4"}].forEach(({id:a,data:s,color:n})=>{const i=document.getElementById(`${a}-container`);if(i&&s&&Object.keys(s).length>0){const o=Object.entries(s).sort((r,c)=>c[1]-r[1]),l=Math.max(...o.map(([,r])=>r),1);i.innerHTML=`
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
                `}})},refreshDataAnalysisTab(){this.state.activeTab==="data-analysis"&&this.renderDataAnalysisTab()},exportDataAnalysisToExcel(){if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const t=this.analyzeAllClinicData(),e=XLSX.utils.book_new(),a=[["\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A","\u0627\u0644\u0639\u062F\u062F"],["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",t.summary.totalRecords],["\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629",t.summary.totalVisits],["\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629",t.summary.totalSickLeaves],["\u0625\u0635\u0627\u0628\u0627\u062A",t.summary.totalInjuries],["\u0627\u0644\u0623\u062F\u0648\u064A\u0629",t.summary.totalMedications],["\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A",t.summary.totalSupplyRequests]],s=XLSX.utils.aoa_to_sheet(a);XLSX.utils.book_append_sheet(e,s,"\u0645\u0644\u062E\u0635 \u0639\u0627\u0645");const n=(o,l)=>{const r=[[l,"\u0627\u0644\u0639\u062F\u062F"]];return Object.entries(o).sort((c,d)=>d[1]-c[1]).forEach(([c,d])=>{r.push([c,d])}),XLSX.utils.aoa_to_sheet(r)};Object.keys(t.medications.byStatus).length>0&&XLSX.utils.book_append_sheet(e,n(t.medications.byStatus,"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 - \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629"),"\u0623\u062F\u0648\u064A\u0629-\u062D\u0627\u0644\u0629"),Object.keys(t.medications.byType).length>0&&XLSX.utils.book_append_sheet(e,n(t.medications.byType,"\u0627\u0644\u0623\u062F\u0648\u064A\u0629 - \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639"),"\u0623\u062F\u0648\u064A\u0629-\u0646\u0648\u0639"),Object.keys(t.visits.byMonth).length>0&&XLSX.utils.book_append_sheet(e,n(t.visits.byMonth,"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"),"\u0632\u064A\u0627\u0631\u0627\u062A-\u0634\u0647\u0631"),Object.keys(t.visits.byDepartment).length>0&&XLSX.utils.book_append_sheet(e,n(t.visits.byDepartment,"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"),"\u0632\u064A\u0627\u0631\u0627\u062A-\u0625\u062F\u0627\u0631\u0629"),Object.keys(t.sickLeaves.byMonth).length>0&&XLSX.utils.book_append_sheet(e,n(t.sickLeaves.byMonth,"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"),"\u0625\u062C\u0627\u0632\u0627\u062A-\u0634\u0647\u0631"),Object.keys(t.injuries.byType).length>0&&XLSX.utils.book_append_sheet(e,n(t.injuries.byType,"\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639"),"\u0625\u0635\u0627\u0628\u0627\u062A-\u0646\u0648\u0639"),Object.keys(t.supplyRequests.byStatus).length>0&&XLSX.utils.book_append_sheet(e,n(t.supplyRequests.byStatus,"\u0627\u0644\u0637\u0644\u0628\u0627\u062A - \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629"),"\u0637\u0644\u0628\u0627\u062A-\u062D\u0627\u0644\u0629");const i=`Clinic_Data_Analysis_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(e,i),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},exportDataAnalysisToPDF(){const t=this.analyzeAllClinicData(),e=(i,o)=>{if(!o||Object.keys(o).length===0)return"";const l=Object.entries(o).sort((r,c)=>c[1]-r[1]).map(([r,c])=>`
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
                    <tr><th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A</th><td>${t.summary.totalRecords}</td></tr>
                    <tr><th>\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</th><td>${t.summary.totalVisits}</td></tr>
                    <tr><th>\u0625\u062C\u0627\u0632\u0627\u062A \u0645\u0631\u0636\u064A\u0629</th><td>${t.summary.totalSickLeaves}</td></tr>
                    <tr><th>\u0625\u0635\u0627\u0628\u0627\u062A</th><td>${t.summary.totalInjuries}</td></tr>
                    <tr><th>\u0627\u0644\u0623\u062F\u0648\u064A\u0629</th><td>${t.summary.totalMedications}</td></tr>
                    <tr><th>\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A</th><td>${t.summary.totalSupplyRequests}</td></tr>
                </tbody>
            </table>
            
            <div class="section-title">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629</div>
            ${e("\u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",t.medications.byStatus)}
            ${e("\u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",t.medications.byType)}
            
            <div class="section-title">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A</div>
            ${e("\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631",t.visits.byMonth)}
            ${e("\u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",t.visits.byDepartment)}
            
            <div class="section-title">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629</div>
            ${e("\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631",t.sickLeaves.byMonth)}
            
            <div class="section-title">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A</div>
            ${e("\u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",t.injuries.byType)}
            
            <div class="section-title">\u062A\u062D\u0644\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A</div>
            ${e("\u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",t.supplyRequests.byStatus)}
        `,s=`CLINIC-DATA-ANALYSIS-${new Date().toISOString().slice(0,10)}`,n=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(s,"\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",a,!1,!0):`<html><body>${a}</body></html>`;try{const i=new Blob([n],{type:"text/html;charset=utf-8"}),o=URL.createObjectURL(i),l=window.open(o,"_blank");l?(l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},400)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0645\u0644\u0641 PDF \u0644\u0644\u0637\u0628\u0627\u0639\u0629...")):Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF")}catch(i){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",i),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644")}},scheduleVisitsTabRender(t=!1,e=0){this._visitsRenderTimer&&(clearTimeout(this._visitsRenderTimer),this._visitsRenderTimer=null);const a=()=>{this._visitsRenderTimer=null,requestAnimationFrame(()=>{this.renderVisitsTab(t)})};this._visitsRenderTimer=setTimeout(a,Math.max(0,e))},scheduleAttendanceTabRender(t=0){this._attendanceRenderTimer&&(clearTimeout(this._attendanceRenderTimer),this._attendanceRenderTimer=null);const e=()=>{this._attendanceRenderTimer=null,requestAnimationFrame(()=>{this.renderAttendanceTab()})};this._attendanceRenderTimer=setTimeout(e,Math.max(0,t))},scheduleMedicationsTabRender(t=0){this._medicationsRenderTimer&&(clearTimeout(this._medicationsRenderTimer),this._medicationsRenderTimer=null);const e=()=>{this._medicationsRenderTimer=null,requestAnimationFrame(()=>{this.renderMedicationsTab()})};this._medicationsRenderTimer=setTimeout(e,Math.max(0,t))},async renderVisitsTab(t=!1){try{const e=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');if(!e){Utils.safeWarn("\u26A0\uFE0F \u0644\u0648\u062D\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}this.ensureData(),this.ensureFilterDefaults();const a=this.shouldFetchClinicVisitsFromBackend({forceRefresh:t});this.renderVisitsTabContent(e),a&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&this.loadVisitsDataFromBackend().then(()=>{const s=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');s&&this.state&&this.state.activeTab==="visits"&&(this.ensureData(),this.renderVisitsTabContent(s)),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645 (\u0628\u062F\u0648\u0646 \u062D\u062C\u0628 \u0627\u0644\u0648\u0627\u062C\u0647\u0629)")}).catch(s=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",s&&s.message)})}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u062A\u0628\u0648\u064A\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",e);const a=document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');a&&(a.innerHTML=`
                    <div class="p-4 text-center">
                        <div class="text-red-600 mb-2">
                            <i class="fas fa-exclamation-triangle"></i>
                            \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F
                        </div>
                        <button type="button" class="btn-primary mt-4" onclick="Clinic.renderVisitsTab(true)">
                            <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                        </button>
                    </div>
                `)}},mergeClinicVisitsWithLocalOnly(t,e){const a=Array.isArray(t)?t:[],s=Array.isArray(e)?e:[],n=new Set;a.forEach(l=>{l&&l.id!=null&&String(l.id).trim()!==""&&n.add(String(l.id))});const i=[];if(s.forEach(l=>{if(!l||l.id==null||String(l.id).trim()==="")return;const r=String(l.id);if(!n.has(r)&&!a.some(d=>{if(d.personType!==l.personType||d.visitDate!==l.visitDate)return!1;if(d.personType==="employee"){const f=String(d.employeeCode||d.employeeNumber||"").trim(),p=String(l.employeeCode||l.employeeNumber||"").trim();if(f&&p&&f===p)return!0;const m=Clinic.normalizeArabicText(d.employeeName),u=Clinic.normalizeArabicText(l.employeeName);return!!m&&m===u}else{const f=Clinic.normalizeArabicText(d.contractorName||d.externalName),p=Clinic.normalizeArabicText(l.contractorName||l.externalName),m=Clinic.normalizeArabicText(d.contractorWorkerName),u=Clinic.normalizeArabicText(l.contractorWorkerName);return f===p&&m===u}})){const d=new Date(l.createdAt||l.visitDate).getTime(),f=new Date().getTime();(!isNaN(d)&&f-d<72e5||isNaN(d))&&(n.add(r),i.push(l))}}),i.length===0)return a.slice();AppState.debugMode&&i.length>0&&Utils.safeLog(`\u{1F4DD} [CLINIC] \u062F\u0645\u062C ${i.length} \u0633\u062C\u0644\u0627\u062A \u0645\u062D\u0644\u064A\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0631\u062F \u0627\u0644\u062E\u0627\u062F\u0645 (\u0642\u062F \u064A\u0643\u0648\u0646 \u0643\u0627\u0634 \u0642\u062F\u064A\u0645)`);const o=a.concat(i);return o.sort((l,r)=>{const c=new Date(l.visitDate||l.createdAt||0).getTime();return new Date(r.visitDate||r.createdAt||0).getTime()-c}),o},assertClinicVisitRpcResult(t){if(!t||t.success!==!0){const e=t&&t.message?t.message:"\u0644\u0645 \u064A\u064F\u0624\u0643\u062F \u0627\u0644\u062E\u0627\u062F\u0645 \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629";throw new Error(e)}},applyClinicVisitIdFromServer(t,e){if(!t||!e||!e.visitId)return;const a=String(e.visitId).trim();if(!a||String(t.id)===a)return;const s=t.id;t.id=a;const n=AppState.appData.clinicVisits;if(!Array.isArray(n))return;const i=n.findIndex(o=>o&&o.id===s);i!==-1&&(n[i]={...n[i],id:a})},shouldFetchClinicVisitsFromBackend(t={}){if(t&&t.forceRefresh===!0||typeof AppState>"u"||!AppState||!AppState.appData)return!0;if(this._visitsBackendFetchOk===!0)return!1;const e=AppState.appData.clinicVisits;if(Array.isArray(e)&&e.length>0){const a=localStorage.getItem("clinic_last_sync");if(a){const s=Date.now()-parseInt(a,10),n=600*1e3;if(!isNaN(s)&&s<n)return!1}}return!0},async loadVisitsDataFromBackend(){if(this._clinicVisitsLoadPromise)return this._clinicVisitsLoadPromise;const t=Array.isArray(AppState.appData.clinicVisits)?AppState.appData.clinicVisits.slice():[];return this._clinicVisitsLoadPromise=(async()=>{try{AppState.debugMode&&Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 Backend...");const e=await Utils.promiseWithTimeout(GoogleIntegration.sendRequest({action:"getAllClinicVisits",data:{__timeoutMs:12e4}}),12e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F");if(e&&e.success&&Array.isArray(e.data)){const a=e.data.map(o=>{if(!o||typeof o!="object")return o;o.personType||(o.contractorName||o.contractorWorkerName||o.externalName?o.personType="contractor":o.personType="employee");let l=[];if(o.medications&&(l=this.normalizeVisitMedications(o.medications),AppState.debugMode&&l.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${l.length} \u062F\u0648\u0627\u0621 \u0645\u0646 medications \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`)),(!l||l.length===0)&&o.medicationsDispensed){const r=this.normalizeVisitMedications(o.medicationsDispensed);r&&r.length>0&&(l=r,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,r.length,"\u062F\u0648\u0627\u0621"))}if(o.medications=l&&l.length>0?l:[],o.visitDate)try{if(o.visitDate instanceof Date)isNaN(o.visitDate.getTime())?o.visitDate=null:o.visitDate=o.visitDate.toISOString();else{const r=String(o.visitDate).trim();if(r.includes("T")&&(r.includes("Z")||r.includes("+")||r.includes("-"))){const c=new Date(r);isNaN(c.getTime())?o.visitDate=null:o.visitDate=c.toISOString()}else if(r.length===10&&r.match(/^\d{4}-\d{2}-\d{2}$/)){const c=new Date(r+"T00:00:00");isNaN(c.getTime())?o.visitDate=null:o.visitDate=c.toISOString()}else{const c=new Date(r);isNaN(c.getTime())?(AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u062D\u0648\u064A\u0644 visitDate: ${r}`),o.visitDate=null):o.visitDate=c.toISOString()}}}catch(r){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0639 visitDate:",r),o.visitDate=null}if(o.exitDate)try{if(o.exitDate instanceof Date)isNaN(o.exitDate.getTime())?o.exitDate=null:o.exitDate=o.exitDate.toISOString();else{const r=String(o.exitDate).trim();if(r.includes("T")&&(r.includes("Z")||r.includes("+")||r.includes("-"))){const c=new Date(r);isNaN(c.getTime())?o.exitDate=null:o.exitDate=c.toISOString()}else if(r.length===10&&r.match(/^\d{4}-\d{2}-\d{2}$/)){const c=new Date(r+"T00:00:00");isNaN(c.getTime())?o.exitDate=null:o.exitDate=c.toISOString()}else{const c=new Date(r);isNaN(c.getTime())?(AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u062D\u0648\u064A\u0644 exitDate: ${r}`),o.exitDate=null):o.exitDate=c.toISOString()}}}catch(r){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0637\u0628\u064A\u0639 exitDate:",r),o.exitDate=null}if(o.createdBy){if(typeof o.createdBy=="string"){const r=o.createdBy.trim();if(r&&r!==""&&r!=="\u0627\u0644\u0646\u0638\u0627\u0645")o.createdBy=r;else if(r==="\u0627\u0644\u0646\u0638\u0627\u0645"){const c=(o.email||"").toString().trim(),d=(o.userId||"").toString().trim();if(c||d){const p=(AppState.appData.users||[]).find(m=>{const u=(m.email||"").toString().toLowerCase().trim(),g=(m.id||"").toString().trim();return c&&u===c.toLowerCase().trim()||d&&g===d});if(p){const m=(p.name||p.displayName||"").toString().trim();m&&m!=="\u0627\u0644\u0646\u0638\u0627\u0645"&&m!==""?(o.createdBy=m,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 "\u0627\u0644\u0646\u0638\u0627\u0645" \u0628\u0640 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0644\u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}: ${m}`)):o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645"}else o.createdBy=null}else if(typeof o.createdBy=="object"){const c=(o.createdBy.name||""||"\u0645\u0633\u062A\u062E\u062F\u0645").trim();o.createdBy=c}}else o.createdBy="\u0645\u0633\u062A\u062E\u062F\u0645";if(o.updatedBy){if(typeof o.updatedBy=="string")o.updatedBy=o.updatedBy.trim()||null;else if(typeof o.updatedBy=="object"){const r=o.updatedBy.name||"";o.updatedBy=(r||"\u0645\u0633\u062A\u062E\u062F\u0645").trim()}}else o.updatedBy="\u0645\u0633\u062A\u062E\u062F\u0645";return o.medications.length===0&&o.medicationsDispensedQty&&o.medicationsDispensedQty>0&&AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${o.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${o.medicationsDispensedQty} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629. medicationsDispensed:`,o.medicationsDispensed),o});AppState.appData.clinicVisits=this.mergeClinicVisitsWithLocalOnly(a,t),AppState.appData.clinicContractorVisits=AppState.appData.clinicVisits.filter(o=>o&&o.personType==="contractor"),this.ensureData(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),localStorage.setItem("clinic_last_sync",Date.now().toString()),this._visitsBackendFetchOk=!0;const s=AppState.appData.clinicVisits.filter(o=>{const l=this.normalizeVisitMedications(o.medications);if(l&&l.length>0)return!0;if(o.medicationsDispensed){const r=this.normalizeVisitMedications(o.medicationsDispensed);return r&&r.length>0}return!1}),n=AppState.appData.clinicVisits,i=n.reduce((o,l)=>{const r=this.normalizeVisitMedications(l.medications);if(r&&r.length>0)return o+r.length;if(l.medicationsDispensed){const c=this.normalizeVisitMedications(l.medicationsDispensed);if(c&&c.length>0)return o+c.length}return o},0);AppState.debugMode&&(Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${a.length} \u0632\u064A\u0627\u0631\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645\u061B \u0628\u0639\u062F \u0627\u0644\u062F\u0645\u062C \u0645\u0639 \u0627\u0644\u0645\u062D\u0644\u064A: ${n.length}`),Utils.safeLog(`   - ${n.filter(o=>o.personType==="employee"||!o.personType).length} \u0645\u0648\u0638\u0641`),Utils.safeLog(`   - ${n.filter(o=>o.personType==="contractor").length} \u0645\u0642\u0627\u0648\u0644`),Utils.safeLog(`   - ${s.length} \u0632\u064A\u0627\u0631\u0629 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629`),Utils.safeLog(`   - \u0625\u062C\u0645\u0627\u0644\u064A ${i} \u062F\u0648\u0627\u0621 \u0645\u0646\u0635\u0631\u0641`))}}catch(e){throw AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",e.message),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),e}})().finally(()=>{this._clinicVisitsLoadPromise=null}),this._clinicVisitsLoadPromise},refreshClinicVisitsFromServerAfterSave(){AppState.debugMode&&Utils.safeLog("\u{1F504} [CLINIC] \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638..."),this._clinicVisitsLoadPromise=null,this._visitsBackendFetchOk=!1,this.loadVisitsDataFromBackend().then(()=>{try{this.updateClinicAnalysisResults(),this.calculateClinicCardValues(),document.dispatchEvent(new CustomEvent("clinic-data-refreshed"))}catch(t){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629:",t)}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}if(this.state&&(this.state.activeTab==="visits"||this.state.activeTab==="dashboard")){const t=document.querySelector('.clinic-tab-panel[data-tab-panel="'+this.state.activeTab+'"]');if(t)try{this.ensureData(),this.state.activeTab==="visits"?this.renderVisitsTabContent(t):this.renderDashboardTab()}catch{}}}).catch(t=>{Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u062D\u0641\u0638:",t)})},renderVisitsTabContent(t){try{if(!t){Utils.safeWarn("\u26A0\uFE0F panel \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A renderVisitsTabContent");return}if(typeof AppState>"u"||!AppState.appData){Utils.safeWarn("\u26A0\uFE0F AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u0641\u064A renderVisitsTabContent"),t.innerHTML='<div class="empty-state"><p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div>';return}let e,a;try{const h=this.getTranslations();e=h.t,a=h.isRTL}catch(h){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u062A\u0631\u062C\u0645\u0627\u062A:",h),e=I=>I,a=!0}const s=this.state&&this.state.activeVisitType?this.state.activeVisitType:"employees",n=s==="contractors",i=this.state&&this.state.filters&&this.state.filters.visits?this.state.filters.visits:{search:"",factory:"",position:"",workplace:""},o=(i.search||"").trim(),l=o.toLowerCase(),r=(i.factory||"").trim(),c=(i.position||"").trim(),d=(i.workplace||"").trim();this.ensureData();const f=this.getActualClinicVisits_(AppState.appData.clinicVisits).slice();f.sort((h,I)=>{const C=new Date(h.visitDate||h.createdAt||0).getTime();return new Date(I.visitDate||I.createdAt||0).getTime()-C});const p=f.filter(h=>{if(!h||typeof h!="object")return!1;const I=String(h.personType||"").toLowerCase().trim();return I==="employee"||I===""||!I&&!h.contractorName&&!h.externalName}),m=f.filter(h=>{if(!h||typeof h!="object")return!1;const I=String(h.personType||"").toLowerCase().trim();return I==="contractor"||I==="external"||h.contractorName||h.externalName}),u=s==="employees"?p:m,g=u.filter(h=>{if(r)try{const I=this.getVisitFactoryDisplayName(h);if(String(I||"").trim()!==r)return!1}catch{return!1}if(c){const I=n?h.contractorPosition||h.employeePosition||"":h.employeePosition||"";if(String(I||"").trim()!==c)return!1}if(d){const I=n?h.workArea||h.employeeLocation||"":h.employeeLocation||h.workArea||"";if(String(I||"").trim()!==d)return!1}if(l){const I=String(n?h.contractorName||h.employeeName||h.externalName||"":h.employeeCode||h.employeeNumber||""),C=String(n?h.contractorWorkerName||"":h.employeeName||""),j=String(n?h.contractorPosition||h.employeePosition||"":h.employeePosition||"");let w="-";try{w=this.getVisitFactoryDisplayName(h)}catch{w=h.factoryName||h.factory||"-"}const x=String(n?h.workArea||h.employeeLocation||"":h.employeeLocation||h.workArea||"");let A="-",b="";try{if(h.visitDate){let R=h.visitDate;R instanceof Date?R=R.toISOString():typeof R=="string"&&!R.includes("T")&&R.match(/^\d{4}-\d{2}-\d{2}$/)&&(R=R+"T00:00:00Z"),A=Utils.formatDateTime?Utils.formatDateTime(R):String(R)}if(h.exitDate){let R=h.exitDate;R instanceof Date?R=R.toISOString():typeof R=="string"&&!R.includes("T")&&R.match(/^\d{4}-\d{2}-\d{2}$/)&&(R=R+"T00:00:00Z"),b=Utils.formatDateTime?Utils.formatDateTime(R):String(R)}}catch{A=h.visitDate?String(h.visitDate):"-",b=h.exitDate?String(h.exitDate):""}const U=String(h.reason||""),q=String(h.diagnosis||"");let F=[];if(h.medications)try{F=this.normalizeVisitMedications(h.medications)}catch{F=[]}const _=F&&F.length>0?F.map(R=>{try{let D="";return R&&R.medicationName?D=typeof R.medicationName=="string"?R.medicationName:R.medicationName.name||String(R.medicationName)||"":R&&R.name&&(D=typeof R.name=="string"?R.name:R.name.name||String(R.name)||""),D}catch{return""}}).filter(Boolean).join(" "):"";let P="";try{h.createdBy&&(typeof h.createdBy=="object"?P=String(h.createdBy.name||"\u0645\u0633\u062A\u062E\u062F\u0645"):P=String(h.createdBy||""))}catch{P=""}if(![I,C,j,w,x,A,b,U,q,_,P].join(" ").toLowerCase().includes(l))return!1}return!0}),y=h=>{const I=n?h.contractorName||h.employeeName||h.externalName||"-":h.employeeCode||h.employeeNumber||"-",C=n?h.contractorWorkerName||"-":h.employeeName||"-",j=n?h.contractorPosition||h.employeePosition||"-":h.employeePosition||"-";let w="-";try{w=this.getVisitFactoryDisplayName(h)}catch{w=h.factoryName||h.factory||"-"}const x=n?h.workArea||h.employeeLocation||"-":h.employeeLocation||h.workArea||"-";let A="-",b=`<span class="text-xs text-gray-500">${e("table.notRecorded")}</span>`;try{if(h.visitDate){let $=h.visitDate;$ instanceof Date?$=$.toISOString():typeof $=="string"&&!$.includes("T")&&$.match(/^\d{4}-\d{2}-\d{2}$/)&&($=$+"T00:00:00Z"),A=Utils.formatDateTime?Utils.formatDateTime($):String($)}if(h.exitDate){let $=h.exitDate;$ instanceof Date?$=$.toISOString():typeof $=="string"&&!$.includes("T")&&$.match(/^\d{4}-\d{2}-\d{2}$/)&&($=$+"T00:00:00Z"),b=Utils.formatDateTime?Utils.formatDateTime($):`<span class="text-xs text-gray-500">${e("table.notRecorded")}</span>`}}catch($){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A:",$),A=h.visitDate?String(h.visitDate):"-",b=h.exitDate?String(h.exitDate):`<span class="text-xs text-gray-500">${e("table.notRecorded")}</span>`}let U="-";try{U=this.calculateTotalTime(h.visitDate,h.exitDate)}catch{U="-"}const q=h.reason||"",F=h.diagnosis||"";let _=[];if(h.medications)try{_=this.normalizeVisitMedications(h.medications),AppState.debugMode&&_.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${_.length} \u062F\u0648\u0627\u0621 \u0645\u0646 medications \u0644\u0632\u064A\u0627\u0631\u0629 ${h.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`)}catch($){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A normalizeVisitMedications:",$),_=[]}if((!_||_.length===0)&&h.medicationsDispensed)try{const $=this.normalizeVisitMedications(h.medicationsDispensed);$&&$.length>0&&(_=$,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0639\u0631\u0636 \u0644\u0632\u064A\u0627\u0631\u0629 ${h.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,_.length,"\u062F\u0648\u0627\u0621"))}catch($){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A normalizeVisitMedications \u0645\u0646 medicationsDispensed:",$)}(!_||_.length===0)&&h.medicationsDispensedQty&&h.medicationsDispensedQty>0&&AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${h.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${h.medicationsDispensedQty} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629`);const P=_&&_.length>0?_.map($=>{try{if(!$||typeof $!="object")return null;let k="";if($.medicationName?k=typeof $.medicationName=="string"?$.medicationName.trim():($.medicationName.name||String($.medicationName)||"").trim():$.name&&(k=typeof $.name=="string"?$.name.trim():($.name.name||String($.name)||"").trim()),!k)return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645:",$),null;const O=parseInt($.quantity,10)||1;return`${Utils.escapeHTML(k)} (${O})`}catch(k){return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u062F\u0648\u0627\u0621:",k,$),null}}).filter(Boolean).join(a?"\u060C ":", "):"-",z=_&&_.length>0?_.reduce(($,k)=>{try{const O=parseInt(k.quantity,10)||0;return $+O}catch{return $}},0):0,R=Utils.escapeHTML(this.getUserDisplayName(h.createdBy)),D=a?"right":"left";return`
                <tr>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${D};">${Utils.escapeHTML(I)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${D};">
                        <div class="font-medium text-gray-900">${Utils.escapeHTML(C)}</div>
                    </td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${D};">${Utils.escapeHTML(j)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${D};">${Utils.escapeHTML(w)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${D};">${Utils.escapeHTML(x)}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${D};">${Utils.escapeHTML(A)}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${D};">${b}</td>
                    <td style="word-wrap: break-word; white-space: normal; text-align: ${D};">${U}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${D};">${Utils.escapeHTML(q)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 200px; text-align: ${D};">${Utils.escapeHTML(F)}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 250px; text-align: ${D};"><div style="overflow-wrap: break-word;">${P}</div></td>
                    <td class="text-center font-semibold" style="word-wrap: break-word; white-space: normal;">${z}</td>
                    <td style="word-wrap: break-word; white-space: normal; max-width: 150px; text-align: ${D};">${R}</td>
                    <td class="text-center" style="min-width: 150px;">
                        <div class="flex items-center justify-center gap-2 flex-wrap">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-visit" data-id="${Utils.escapeHTML(h.id||"")}" title="${e("btn.view")}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button" class="btn-icon btn-icon-warning" data-action="edit-visit" data-id="${Utils.escapeHTML(h.id||"")}" title="${e("btn.edit")}">
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
                                <th style="min-width: 120px; text-align: ${a?"right":"left"};">${e(n?"table.contractorName":"table.employeeCode")}</th>
                                <th style="min-width: 150px; text-align: ${a?"right":"left"};">${e("table.name")}</th>
                                <th style="min-width: 120px; text-align: ${a?"right":"left"};">${e("table.jobTitle")}</th>
                                <th style="min-width: 120px; text-align: ${a?"right":"left"};">${e("table.factory")}</th>
                                <th style="min-width: 120px; text-align: ${a?"right":"left"};">${e("table.workplace")}</th>
                                <th style="min-width: 150px; text-align: ${a?"right":"left"};">${e("table.entryTime")}</th>
                                <th style="min-width: 150px; text-align: ${a?"right":"left"};">${e("table.exitTime")}</th>
                                <th style="min-width: 100px; text-align: ${a?"right":"left"};">${e("table.totalTime")}</th>
                                <th style="min-width: 150px; word-wrap: break-word; text-align: ${a?"right":"left"};">${e("table.reason")}</th>
                                <th style="min-width: 150px; word-wrap: break-word; text-align: ${a?"right":"left"};">${e("table.diagnosis")}</th>
                                <th style="min-width: 200px; word-wrap: break-word; text-align: ${a?"right":"left"};">${e("table.medications")}</th>
                                <th style="min-width: 100px; text-align: center;">${e("table.quantity")}</th>
                                <th style="min-width: 150px; text-align: ${a?"right":"left"};">\u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629</th>
                                <th class="text-center" style="min-width: 150px;">${e("table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody id="clinic-visits-tbody"></tbody>
                    </table>
                </div>
            `:this.renderEmptyState(e(l?"empty.noResults":s==="employees"?"empty.noEmployeeVisits":"empty.noContractorVisits")),S=a?"ml-2":"mr-2",L=a?"mr-2":"ml-2",M=a?"ml-1":"mr-1",E=`
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4" style="direction: ${a?"rtl":"ltr"};">
                <div class="flex items-center gap-2">
                    <h3 class="text-lg font-semibold" style="text-align: ${a?"right":"left"};">${e("tab.visits")}</h3>
                </div>
                <div class="flex gap-2">
                    <button type="button" id="visits-add-btn" class="btn-primary">
                        <i class="fas fa-plus ${S}"></i>
                        ${e("btn.registerVisit")}
                    </button>
                    <button type="button" id="visits-refresh-btn" class="btn-secondary">
                        <i class="fas fa-sync-alt ${S}"></i>
                        ${e("btn.refresh")}
                    </button>
                    ${typeof Permissions<"u"&&Permissions.isAdmin&&Permissions.isAdmin()?`
                    <button type="button" onclick="const b=this;b.disabled=true;b.innerHTML='\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0631\u062D\u064A\u0644...';GoogleIntegration.sendRequest({action:'migrateContractorVisits'}).then(r=>{alert(r.message);location.reload()}).catch(e=>{alert('\u062E\u0637\u0623:'+e);b.disabled=false;b.innerHTML='\u062A\u0631\u062D\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646'})" class="btn-primary" style="background-color: #d97706; color: white;">
                        <i class="fas fa-broom ${S}"></i>
                        \u062A\u0631\u062D\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                    </button>
                    `:""}
                    <button type="button" id="visits-export-excel-btn" class="btn-success">
                        <i class="fas fa-file-excel ${S}"></i>
                        ${e("btn.exportExcel")}
                    </button>
                    <button type="button" id="visits-export-pdf-btn" class="btn-secondary">
                        <i class="fas fa-file-pdf ${S}"></i>
                        ${e("btn.exportPDF")}
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
                            ${e("tab.employees")}
                            <span class="badge ${s==="employees"?"badge-primary":"badge-secondary"} ${L}">${p.length}</span>
                        </button>
                        <button type="button" 
                            class="visit-type-tab px-6 py-3 font-medium transition-colors ${s==="contractors"?"text-blue-600 border-b-2 border-blue-600 active":"text-gray-500 hover:text-gray-700"}"
                            data-visit-type="contractors">
                            <i class="fas fa-hard-hat ${S}"></i>
                            ${e("tab.contractors")}
                            <span class="badge ${s==="contractors"?"badge-primary":"badge-secondary"} ${L}">${m.length}</span>
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
                            <i class="fas fa-search ${M}"></i>${e("filter.search")}
                        </label>
                        <input type="text" id="visits-search" class="filter-input" placeholder="${e("filter.searchPlaceholder")}" value="${Utils.escapeHTML(o)}" style="width: 100%; min-width: 160px; text-align: ${a?"right":"left"}; direction: ${a?"rtl":"ltr"};">
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="visits-filter-factory" class="filter-label" style="text-align: ${a?"right":"left"};">
                            <i class="fas fa-industry ${M}"></i>${e("filter.factory")}
                            ${r?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${g.length}</span>`:""}
                        </label>
                        <select id="visits-filter-factory" class="filter-input" style="width: 100%; min-width: 140px; direction: ${a?"rtl":"ltr"};">
                            <option value="">${e("filter.all")}</option>
                        </select>
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="visits-filter-position" class="filter-label" style="text-align: ${a?"right":"left"};">
                            <i class="fas fa-briefcase ${M}"></i>${e("filter.jobTitle")}
                            ${c?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${g.length}</span>`:""}
                        </label>
                        <select id="visits-filter-position" class="filter-input" style="width: 100%; min-width: 140px; direction: ${a?"rtl":"ltr"};">
                            <option value="">${e("filter.all")}</option>
                        </select>
                    </div>
                    
                    <!-- \u0641\u0644\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 -->
                    <div class="filter-field" style="min-width: 160px;">
                        <label for="visits-filter-workplace" class="filter-label" style="text-align: ${a?"right":"left"};">
                            <i class="fas fa-map-marker-alt ${M}"></i>${e("filter.workplace")}
                            ${d?`<span class="filter-count-badge" title="\u0639\u062F\u062F \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629">${g.length}</span>`:""}
                        </label>
                        <select id="visits-filter-workplace" class="filter-input" style="width: 100%; min-width: 140px; direction: ${a?"rtl":"ltr"};">
                            <option value="">${e("filter.all")}</option>
                        </select>
                    </div>
                    
                    <!-- \u0632\u0631 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 -->
                    <div class="filter-field" style="min-width: 140px;">
                        <button id="visits-reset-filters" class="filter-reset-btn" style="width: 100%;">
                            <i class="fas fa-redo ${M}"></i>${e("btn.reset")}
                        </button>
                    </div>
                </div>
            </div>
            
            ${v}
        `;t.innerHTML=E,this.applyModuleI18n(t),typeof requestIdleCallback=="function"?requestIdleCallback(()=>this.updateVisitFilterOptions(u),{timeout:900}):setTimeout(()=>this.updateVisitFilterOptions(u),0);try{const h=t.querySelector("#clinic-visits-tbody");if(h&&Array.isArray(g)&&g.length>0){this._clinicVisitsRowsToken=(this._clinicVisitsRowsToken||0)+1;const I=this._clinicVisitsRowsToken;let C=0;const j=g.length,w=x=>{if(I!==this._clinicVisitsRowsToken||this.state&&this.state.activeTab!=="visits")return;const A=typeof performance<"u"&&performance.now?performance.now():Date.now();let b="",U=0;for(;C<j;){b+=y(g[C]),C+=1,U+=1;const q=typeof performance<"u"&&performance.now?performance.now():Date.now(),F=x&&typeof x.timeRemaining=="function"?x.timeRemaining()>6:q-A<12;if(U>=25&&!F||U>=75)break}b&&h.insertAdjacentHTML("beforeend",b),C<j&&(typeof requestIdleCallback=="function"?requestIdleCallback(w,{timeout:900}):setTimeout(()=>w(null),0))};typeof requestIdleCallback=="function"?requestIdleCallback(w,{timeout:900}):setTimeout(()=>w(null),0)}}catch{}this.bindVisitsTabEvents(t),this.state._shouldFocusSearch&&requestAnimationFrame(()=>{const h=t.querySelector("#visits-search");if(h){h.focus();const I=this.state._searchCursorPosition;if(I!=null)try{h.setSelectionRange(I,I)}catch{}this.state._shouldFocusSearch=!1}}),requestAnimationFrame(()=>{const h=t.querySelector(".clinic-table-wrapper");h&&this.setupTableScrollListeners(h)})}catch(e){const a=e instanceof Error?e.message:typeof e=="string"?e:JSON.stringify(e);if(Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062D\u062A\u0648\u0649 \u062A\u0628\u0648\u064A\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",a),t)try{t.innerHTML=`
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                            <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                            <p class="text-sm text-gray-400">${Utils.escapeHTML(a)}</p>
                            <button type="button" class="btn-primary mt-4" onclick="Clinic.renderVisitsTab()">
                                <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    `}catch(s){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u062E\u0637\u0623:",s)}}},calculateTotalTime(t,e){if(!t||!e)return"-";try{const{t:a}=this.getTranslations(),s=t instanceof Date?t:new Date(t),n=e instanceof Date?e:new Date(e);if(isNaN(s.getTime())||isNaN(n.getTime()))return"-";const i=n.getTime()-s.getTime();if(i<0)return"-";const o=Math.floor(i/(1e3*60)),l=Math.floor(o/60),r=o%60;return l>0&&r>0?`${l} ${a("time.hours")} ${r} ${a("time.minutes")}`:l>0?`${l} ${a("time.hours")}`:r>0?`${r} ${a("time.minutes")}`:a("time.lessThanMinute")}catch(a){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0627\u0644\u0648\u0642\u062A:",a),"-"}},cleanMedicationName(t,e=null){if(!t||typeof t!="string")return{name:t||"",quantity:e??0};const a=t.trim(),s=a.match(/^(.+?)\s*\(\s*(\d+)\s*\)\s*$/);if(s){const i=s[1].trim();return e!=null?{name:i,quantity:e}:{name:i,quantity:0}}return{name:a,quantity:e??0}},normalizeVisitMedications(t){if(!t)return[];if(Array.isArray(t)){const e=t.map(a=>{if(!a||typeof a!="object")return null;let s=a.medicationName||a.name||"";if(typeof s=="object"&&s!==null&&(s=s.medicationName||s.name||""),s=(s||"").toString().trim(),!s)return null;const n=parseInt(a.quantity,10)||1,i=this.cleanMedicationName(s,n),o=typeof i.name=="string"?i.name.trim():i.name&&i.name.name?i.name.name.trim():String(i.name||"").trim();return o?{medicationName:o,quantity:i.quantity||n||1,unit:a.unit||"\u0648\u062D\u062F\u0629",notes:a.notes||""}:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641:",a,i),null)}).filter(a=>a!==null&&a.medicationName);return AppState.debugMode&&e.length===0&&t.length>0&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u0637\u0628\u064A\u0639 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",t),e}if(typeof t=="string"){const e=t.trim();if(!e)return[];try{const a=JSON.parse(e);if(Array.isArray(a)){const s=a.map(n=>{if(!n||typeof n!="object")return null;let i=n.medicationName||n.name||"";if(typeof i=="object"&&i!==null&&(i=i.medicationName||i.name||""),i=(i||"").toString().trim(),!i)return null;const o=parseInt(n.quantity,10)||1,l=this.cleanMedicationName(i,o),r=typeof l.name=="string"?l.name.trim():l.name&&l.name.name?l.name.name.trim():String(l.name||"").trim();return r?{medicationName:r,quantity:l.quantity||o||1,unit:n.unit||"\u0648\u062D\u062F\u0629",notes:n.notes||""}:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641 (JSON):",n,l),null)}).filter(n=>n!==null&&n.medicationName);if(s.length>0)return s}}catch{}try{const a=e.split(/،|,/).map(n=>n.trim()).filter(Boolean),s=[];if(a.forEach(n=>{const i=n.match(/^(.+?)(?:\s*\(\s*(\d+)\s*\))?\s*$/);if(!i){const r=n.trim();r&&s.push({medicationName:r,quantity:1,unit:"\u0648\u062D\u062F\u0629",notes:""});return}let o=(i[1]||"").trim(),l=i[2]?parseInt(i[2],10):1;if(o){const r=this.cleanMedicationName(o,l);o=r.name,l=r.quantity||l||1;const c=typeof o=="string"?o.trim():String(o||"").trim();c&&s.push({medicationName:c,quantity:isNaN(l)?1:l,unit:"\u0648\u062D\u062F\u0629",notes:""})}}),s.length>0)return AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0644\u064A\u0644 ${s.length} \u062F\u0648\u0627\u0621 \u0645\u0646 \u0627\u0644\u0646\u0635:`,e),s}catch(a){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0644\u064A\u0644 \u0646\u0635 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",e,a)}return[]}if(typeof t=="object"&&t!==null){let e=(t.medicationName||t.name||"").trim();if(e){const a=parseInt(t.quantity,10)||1,s=this.cleanMedicationName(e,a),n=typeof s.name=="string"?s.name.trim():s.name&&s.name.name?s.name.name.trim():String(s.name||"").trim();return n?[{medicationName:n,quantity:s.quantity||a||1,unit:t.unit||"\u0648\u062D\u062F\u0629",notes:t.notes||""}]:(AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062F\u0648\u0627\u0621 \u0628\u062F\u0648\u0646 \u0627\u0633\u0645 \u0628\u0639\u062F \u0627\u0644\u062A\u0646\u0638\u064A\u0641 (object):",t,s),[])}}return[]},getVisitFactoryDisplayName(t){try{if(!t||typeof t!="object")return"-";if(t.factoryName)return String(t.factoryName);if(t.factory){const e=this.getSiteOptions?this.getSiteOptions():[],a=Array.isArray(e)?e.find(s=>s.id===t.factory||s.name===t.factory):null;return a&&a.name?String(a.name):String(t.factory)}return"-"}catch{return"-"}},resetVisitFilters(){const t=document.getElementById("visits-search");t&&(t.value="");const e=document.getElementById("visits-filter-factory");e&&(e.value="");const a=document.getElementById("visits-filter-position");a&&(a.value="");const s=document.getElementById("visits-filter-workplace");s&&(s.value=""),this.state.filters=this.state.filters||{},this.state.filters.visits={search:"",factory:"",position:"",workplace:""},this.renderVisitsTab()},updateVisitFilterOptions(t){if(!t||!Array.isArray(t))return;const{t:e}=this.getTranslations(),a=(this.state.activeVisitType||"employees")==="contractors",s=[...new Set(t.map(m=>{const u=this.getVisitFactoryDisplayName(m);return u&&u!=="-"?u:null}).filter(Boolean))].sort(),n=[...new Set(t.map(m=>{const u=a?m.contractorPosition||m.employeePosition||"":m.employeePosition||"";return u&&u!=="-"?u:null}).filter(Boolean))].sort(),i=[...new Set(t.map(m=>{const u=a?m.workArea||m.employeeLocation||"":m.employeeLocation||m.workArea||"";return u&&u!=="-"?u:null}).filter(Boolean))].sort(),o=this.state&&this.state.filters&&this.state.filters.visits?this.state.filters.visits:{search:"",factory:"",position:"",workplace:""},l=o.factory||document.getElementById("visits-filter-factory")?.value||"",r=o.position||document.getElementById("visits-filter-position")?.value||"",c=o.workplace||document.getElementById("visits-filter-workplace")?.value||"",d=document.getElementById("visits-filter-factory");d&&(d.innerHTML=`<option value="">${e("filter.all")}</option>`+s.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===l?"selected":""}>${Utils.escapeHTML(m)}</option>`).join(""));const f=document.getElementById("visits-filter-position");f&&(f.innerHTML=`<option value="">${e("filter.all")}</option>`+n.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===r?"selected":""}>${Utils.escapeHTML(m)}</option>`).join(""));const p=document.getElementById("visits-filter-workplace");p&&(p.innerHTML=`<option value="">${e("filter.all")}</option>`+i.map(m=>`<option value="${Utils.escapeHTML(m)}" ${m===c?"selected":""}>${Utils.escapeHTML(m)}</option>`).join(""))},bindVisitsTabEvents(t){const e=t.querySelector("#visits-add-btn"),a=t.querySelector("#visits-add-new-btn"),s=t.querySelector("#visits-refresh-btn"),n=t.querySelector("#visits-export-excel-btn"),i=t.querySelector("#visits-export-pdf-btn"),o=t.querySelector("#visits-search");e?.addEventListener("click",()=>this.showVisitForm()),a?.addEventListener("click",()=>this.showEnhancedVisitForm()),s?.addEventListener("click",()=>{this.renderVisitsTab(!0),Notification.success("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...")}),n?.addEventListener("click",()=>this.exportVisitsToExcel()),i?.addEventListener("click",()=>this.exportVisitsToPDF()),o&&o.addEventListener("input",f=>{const p=(f.target.value||"").toString(),m=f.target.selectionStart!==null&&f.target.selectionStart!==void 0?f.target.selectionStart:p.length;this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.search=p,this.state._searchCursorPosition=m,this.state._shouldFocusSearch=!0,this.scheduleVisitsTabRender(!1,150)});const l=t.querySelector("#visits-filter-factory");l&&l.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.factory=l.value||"",this.scheduleVisitsTabRender(!1,50)});const r=t.querySelector("#visits-filter-position");r&&r.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.position=r.value||"",this.scheduleVisitsTabRender(!1,50)});const c=t.querySelector("#visits-filter-workplace");c&&c.addEventListener("change",()=>{this.state.filters=this.state.filters||{},this.state.filters.visits=this.state.filters.visits||{search:"",factory:"",position:"",workplace:""},this.state.filters.visits.workplace=c.value||"",this.scheduleVisitsTabRender(!1,50)});const d=t.querySelector("#visits-reset-filters");d&&d.addEventListener("click",()=>{this.resetVisitFilters()}),t.querySelectorAll(".visit-type-tab").forEach(f=>{f.addEventListener("click",()=>{try{const p=f.getAttribute("data-visit-type");if(!p){Utils.safeWarn("\u26A0\uFE0F \u0646\u0648\u0639 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F");return}this.state.activeVisitType=p,this.scheduleVisitsTabRender(!1,30)}catch(p){if(Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0628\u062F\u064A\u0644 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",p),this.state&&this.state.activeVisitType)try{this.scheduleVisitsTabRender(!1,30)}catch(m){Utils.safeError("\u274C \u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u0639\u0631\u0636 \u0627\u0644\u062A\u0628\u0648\u064A\u0628:",m)}}})}),t.hasAttribute("data-visits-actions-delegation")||(t.setAttribute("data-visits-actions-delegation","true"),t.addEventListener("click",f=>{try{const p=f.target?.closest?.('[data-action="view-visit"],[data-action="edit-visit"]');if(!p)return;const m=p.getAttribute("data-action"),u=p.getAttribute("data-id");if(!u)return;const g=(AppState.appData.clinicVisits||[]).find(y=>y.id===u);if(!g)return;m==="view-visit"?this.viewVisitDetails(g):m==="edit-visit"&&this.showVisitForm(g)}catch{}},{passive:!0}))},viewVisitDetails(t){if(!t)return;t.createdBy||(t.createdBy=null),t.updatedBy||(t.updatedBy=null);const e=t.medications&&Array.isArray(t.medications)&&t.medications.length>0?t.medications.map(s=>`
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
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(t.employeeCode||t.employeeNumber||"-")}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-user"></i>
                                        \u0627\u0644\u0627\u0633\u0645
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(t.employeeName||t.contractorName||t.externalName||"-")}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-briefcase"></i>
                                        \u0627\u0644\u0648\u0638\u064A\u0641\u0629
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(t.employeePosition||"-")}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-map-marker-alt"></i>
                                        \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(t.employeeLocation||t.workArea||"-")}</p>
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
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${t.visitDate?Utils.formatDateTime(t.visitDate):"-"}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #fc6c85;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #fc6c85; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-sign-out-alt"></i>
                                        \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${t.exitDate?Utils.formatDateTime(t.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647"}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #fc6c85;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #fc6c85; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-user-check"></i>
                                        \u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${(()=>{if(!t.createdBy)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(typeof t.createdBy=="object")return Utils.escapeHTML(t.createdBy.name||t.createdBy.email||t.createdBy.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const s=String(t.createdBy).trim();if(s==="\u0627\u0644\u0646\u0638\u0627\u0645"||s===""){const n=(t.email||"").toString().trim();if(n&&n!=="")return Utils.escapeHTML(n);const i=(AppState.currentUser?.email||"").toString().trim();return i&&i!==""?Utils.escapeHTML(i):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}return Utils.escapeHTML(s)})()}</p>
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
                                        \u0627\u0644\u0625\u062C\u0631\u0627\u0621 / \u0627\u0644\u0639\u0644\u0627\u062C
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
                                ${e}
                            </div>
                        </div>
                        `:""}
                        ${t.notes?`
                        <div class="form-section" style="background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                            <h3 class="section-title" style="color: #F57F17; font-size: 20px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-sticky-note" style="font-size: 24px;"></i>
                                \u0645\u0644\u0627\u062D\u0638\u0627\u062A
                            </h3>
                            <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #F57F17;">
                                <p style="color: #1e293b; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.6; white-space: pre-wrap;">${Utils.escapeHTML(t.notes)}</p>
                            </div>
                        </div>
                        `:""}
                    </div>
                </div>
                
                <div class="modal-footer form-actions-centered" style="background: #f8f9fa; padding: 20px 30px; border-top: 1px solid #e2e8f0; border-radius: 0 0 20px 20px;">
                    <button class="btn-secondary" style="background: #6b7280; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times ml-2"></i>\u0625\u063A\u0644\u0627\u0642
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
        `,document.body.appendChild(a),a.addEventListener("click",s=>{s.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()})},async deleteVisit(t){if(!t){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}if(!this.isCurrentUserAdmin()){await this.requestVisitDeletion(t);return}const e=(AppState.appData.clinicVisits||[]).find(i=>i.id===t);if(!e){Notification.error("\u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const a=e.employeeName||e.contractorName||e.externalName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",s=e.visitDate?Utils.formatDateTime(e.visitDate):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(await Utils.confirmDialog("\u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629",`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629 "${a}" \u0628\u062A\u0627\u0631\u064A\u062E ${s}\u061F

\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.`,"\u062D\u0630\u0641","\u0625\u0644\u063A\u0627\u0621")){Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629...");try{if(AppState.googleConfig?.appsScript?.enabled){const i=await GoogleIntegration.sendRequest({action:"deleteClinicVisit",data:{visitId:t}});if(!i||i.success!==!0)throw new Error(i?.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645")}AppState.appData.clinicVisits=(AppState.appData.clinicVisits||[]).filter(i=>i.id!==t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D"),this.renderVisitsTab()}catch(i){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+i.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",i)}}},async requestVisitDeletion(t){try{if(!t){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D");return}const e=(AppState.appData.clinicVisits||[]).find(i=>i.id===t);if(!e){Notification.error("\u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl)||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest){Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 (\u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D)");return}const s={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};Loading.show("\u062C\u0627\u0631\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629...");const n=await GoogleIntegration.sendRequest({action:"addClinicVisitDeletionRequest",data:{visitId:t,visitData:e,requestedBy:s}});if(Loading.hide(),!n||n.success!==!0)throw new Error(n?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641");try{AppState.appData.clinicVisitDeletionRequests=Array.isArray(AppState.appData.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],n.data&&AppState.appData.clinicVisitDeletionRequests.unshift({...n.data,requestType:"visit"}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch{}Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645")}catch(e){try{Loading.hide()}catch{}Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",e),Notification.error("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(e.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}},getMedicationRowClass(t){return t==="\u0645\u0646\u062A\u0647\u064A"?"bg-red-50":t==="\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"bg-yellow-50":"bg-green-50"},ensureData(){if(typeof AppState>"u")return;AppState.appData=AppState.appData||{};const t=AppState.appData;Array.isArray(t.clinicVisits)||(t.clinicVisits=[]),Array.isArray(t.medications)||(t.medications=[]),Array.isArray(t.clinicMedications)||(t.clinicMedications=[]),Array.isArray(t.clinicInventory)||(t.clinicInventory=[]);const e=t.medications.length>0?t.medications:t.clinicMedications.length>0?t.clinicMedications:t.clinicInventory.length>0?t.clinicInventory:[];t.medications.length===0&&e.length>0&&(t.medications=[...e]),t.clinicMedications.length===0&&e.length>0&&(t.clinicMedications=[...e]),t.clinicInventory.length===0&&e.length>0&&(t.clinicInventory=[...e]),Array.isArray(t.sickLeave)||(t.sickLeave=[]),Array.isArray(t.injuries)||(t.injuries=[]),Array.isArray(t.clinicSupplyRequests)||(t.clinicSupplyRequests=[]),Array.isArray(t.clinicStaff)||(t.clinicStaff=[]),Array.isArray(t.clinicStaffAttendance)||(t.clinicStaffAttendance=[]),Array.isArray(t.clinicStaffTimeOffRequests)||(t.clinicStaffTimeOffRequests=[]),Array.isArray(t.clinicStaffLeaveBalances)||(t.clinicStaffLeaveBalances=[]),Array.isArray(t.clinicStaffSystemActivities)||(t.clinicStaffSystemActivities=[]);let a=!1;if(Array.isArray(t.clinicContractorVisits)&&t.clinicContractorVisits.length>0){const n=new Set(t.clinicVisits.map(o=>o&&o.id).filter(Boolean));let i=0;t.clinicContractorVisits.forEach(o=>{o&&o.id&&!n.has(o.id)&&(o.personType="contractor",t.clinicVisits.push(o),n.add(o.id),a=!0,i++)}),i>0&&AppState.debugMode&&Utils.safeLog(`\u{1F517} [CLINIC] \u062A\u0645 \u062F\u0645\u062C ${i} \u0632\u064A\u0627\u0631\u0629 \u0645\u0642\u0627\u0648\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A ensureData`)}t.clinicVisits=t.clinicVisits.map(n=>{if(!n||typeof n!="object")return n;let i=String(n.personType||"").toLowerCase().trim();i==="external"||i==="\u062E\u0627\u0631\u062C\u064A"||i==="\u0645\u0642\u0627\u0648\u0644"||i==="contractor"?i="contractor":(i==="\u0645\u0648\u0638\u0641"||i==="staff"||i==="employee"||!i)&&(n.contractorName||n.contractorWorkerName?i="contractor":i="employee"),n.personType!==i&&(n.personType=i,a=!0);let o=[];if(n.medications&&(o=this.normalizeVisitMedications(n.medications)),(!o||o.length===0)&&n.medicationsDispensed){const d=this.normalizeVisitMedications(n.medicationsDispensed);d&&d.length>0&&(o=d,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${n.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,d.length,"\u062F\u0648\u0627\u0621"))}if((!o||o.length===0)&&n.medicationsDispensedQty&&n.medicationsDispensedQty>0){const d=parseInt(n.medicationsDispensedQty,10)||0;d>0&&(o=[{medicationName:n.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:d,unit:"\u0648\u062D\u062F\u0629",notes:""}],AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u062F\u0648\u0627\u0621 \u0645\u0646 medicationsDispensedQty \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${n.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,d))}o||(o=[]);const l=Array.isArray(n.medications)?n.medications:[],r=JSON.stringify(l.sort((d,f)=>(d.medicationName||"").localeCompare(f.medicationName||""))),c=JSON.stringify(o.sort((d,f)=>(d.medicationName||"").localeCompare(f.medicationName||"")));if(r!==c&&(n.medications=o,a=!0,AppState.debugMode&&o.length>0&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B medications \u0641\u064A ensureData \u0644\u0632\u064A\u0627\u0631\u0629 ${n.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,o.length,"\u062F\u0648\u0627\u0621")),n.visitDate){const d=String(n.visitDate).trim();if(d.length===10&&d.match(/^\d{4}-\d{2}-\d{2}$/)){const f=new Date(d+"T00:00:00");n.visitDate=f.toISOString(),a=!0}else if(!d.includes("T")&&!d.includes("Z"))try{const f=new Date(d);isNaN(f.getTime())||(n.visitDate=f.toISOString(),a=!0)}catch{}}if(n.exitDate){const d=String(n.exitDate).trim();if(d.length===10&&d.match(/^\d{4}-\d{2}-\d{2}$/)){const f=new Date(d+"T00:00:00");n.exitDate=f.toISOString(),a=!0}else if(!d.includes("T")&&!d.includes("Z"))try{const f=new Date(d);isNaN(f.getTime())||(n.exitDate=f.toISOString(),a=!0)}catch{}}return n});let s=!1;if(t.clinicMedications=t.clinicMedications.map(n=>{const i=this.normalizeMedicationRecord(n),o=this.calculateMedicationStatus(i),l=n&&(n.quantityAdded!==i.quantityAdded||n.remainingQuantity!==i.remainingQuantity)||typeof n?.quantityAdded!="number"||typeof n?.remainingQuantity!="number";return(i.status!==o.status||i.daysRemaining!==o.daysRemaining||l)&&(s=!0,i.status=o.status,i.daysRemaining=o.daysRemaining),i}),t.clinicInventory=t.clinicMedications,t.sickLeave=t.sickLeave.map(n=>this.normalizeSickLeaveRecord(n)),t.injuries=t.injuries.map(n=>this.normalizeInjuryRecord(n)),AppState.appData=t,typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save(),AppState.debugMode&&(s||a)&&Utils.safeLog(`\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u064A ensureData (medicationsChanged: ${s}, visitsChanged: ${a})`)}catch(n){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u064A ensureData:",n.message)}else AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},ensureFilterDefaults(){this.state||(this.state={activeTab:"medications",filters:{}}),this.state.activeTab||(this.state.activeTab="medications");const t={medications:{search:"",status:"all",dateFrom:"",dateTo:""},visits:{search:"",factory:"",position:"",workplace:""},sickLeave:{search:"",department:"",dateFrom:"",dateTo:""},injuries:{search:"",status:"all",department:"",dateFrom:"",dateTo:""},attendance:{search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"}};this.state.filters=this.state.filters||{},Object.keys(t).forEach(e=>{const a=this.state.filters[e]||{};this.state.filters[e]=Object.assign({},t[e],a)}),Array.isArray(this.state.currentInjuryAttachments)||(this.state.currentInjuryAttachments=[])},getCurrentUserSummary(t=null){if(t&&typeof t=="object"&&(t.name||t.id))return t;if(!AppState.currentUser)return AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F AppState.currentUser \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F - \u0625\u0631\u062C\u0627\u0639 \u0627\u0644\u0646\u0638\u0627\u0645"),{id:"",name:"\u0627\u0644\u0646\u0638\u0627\u0645",email:"",role:""};const e=(AppState.currentUser.name||AppState.currentUser.displayName||"").toString().trim(),a=(AppState.currentUser.email||"").toString().trim(),s=(AppState.currentUser.id||"").toString().trim();AppState.debugMode&&Utils.safeLog("\u{1F50D} getCurrentUserSummary - name:",e,"email:",a,"id:",s);const n=e||a||s||"\u0627\u0644\u0646\u0638\u0627\u0645";return AppState.debugMode&&n==="\u0627\u0644\u0646\u0638\u0627\u0645"&&Utils.safeWarn('\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: getCurrentUserSummary \u064A\u0639\u064A\u062F "\u0627\u0644\u0646\u0638\u0627\u0645" - AppState.currentUser:',AppState.currentUser),{id:s,name:n,email:a,role:(AppState.currentUser.role||"").toString().trim()}},getMonthlyVisits(){const t=new Date,e=new Date(t.getFullYear(),t.getMonth(),1);return AppState.appData.clinicVisits.filter(a=>new Date(a.visitDate||a.createdAt)>=e).length},calculateTotalTime(t,e){if(!t||!e)return"-";try{const a=t instanceof Date?t:new Date(t),s=e instanceof Date?e:new Date(e);if(isNaN(a.getTime())||isNaN(s.getTime()))return"-";const n=s.getTime()-a.getTime();if(n<0)return"-";const i=Math.floor(n/(1e3*60)),o=Math.floor(i/60),l=i%60;return o>0&&l>0?`${o} \u0633\u0627\u0639\u0629 ${l} \u062F\u0642\u064A\u0642\u0629`:o>0?`${o} \u0633\u0627\u0639\u0629`:l>0?`${l} \u062F\u0642\u064A\u0642\u0629`:"\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629"}catch(a){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0627\u0644\u0648\u0642\u062A:",a,{visitDate:t,exitDate:e}),"-"}},async renderVisitsList(){const t=AppState.appData.clinicVisits.slice(-10).reverse();return t.length===0?'<div class="empty-state"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p></div>':`
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
                        ${t.map(e=>{const a=e.employeeCode||e.employeeNumber||"-",s=e.employeeName||e.contractorName||e.externalName||"",n=e.contractorWorkerName?` (${Utils.escapeHTML(e.contractorWorkerName)})`:"",i=e.employeePosition||"-",o=e.employeeLocation||e.workArea||"-",l=e.visitDate?Utils.escapeHTML(Utils.formatDateTime(e.visitDate)):"-",r=e.exitDate?Utils.escapeHTML(Utils.formatDateTime(e.exitDate)):'<span class="text-xs text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647</span>',c=Clinic.calculateTotalTime(e.visitDate,e.exitDate),d=Utils.escapeHTML(e.reason||""),f=Utils.escapeHTML(e.diagnosis||""),p=Utils.escapeHTML(e.treatment||"");return`
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
                                    <td>${d}</td>
                                    <td>${f}</td>
                                    <td>${p}</td>
                                    <td>
                                        <button onclick="Clinic.viewVisit('${e.id}')" class="btn-icon btn-icon-primary">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},setupEventListeners(){setTimeout(()=>{const t=document.getElementById("add-visit-btn");t&&t.addEventListener("click",()=>this.showVisitForm())},100)},loadContractorsIntoSelect(t){if(!t)return;const e=(t.tagName||"").toLowerCase(),a=(t.value||"").toString();if(e==="input"){const s=t.getAttribute("list"),n=s?document.getElementById(s):null;if(!n)return;let i=[];try{typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"?i=(Contractors.getAllContractorsForModules()||[]).map(r=>r&&(r.name||r.companyName)?String(r.name||r.companyName).trim():"").filter(Boolean):Array.isArray(AppState.appData?.approvedContractors)?i=AppState.appData.approvedContractors.filter(r=>r&&r.isActive!=="inactive"&&r.isActive!==!1&&r.isActive!=="false"&&r.isActive!=="FALSE").map(r=>r&&(r.companyName||r.name)?String(r.companyName||r.name).trim():"").filter(Boolean):Array.isArray(AppState.appData?.contractors)&&(i=AppState.appData.contractors.filter(r=>r&&r.isActive!=="inactive"&&r.isActive!==!1&&r.isActive!=="false"&&r.isActive!=="FALSE").map(r=>r&&(r.name||r.companyName)?String(r.name||r.companyName).trim():"").filter(Boolean))}catch{}const o=new Set,l=[];i.forEach(r=>{const c=r.toLowerCase();o.has(c)||(o.add(c),l.push(r))}),n.innerHTML=l.map(r=>`<option value="${Utils.escapeHTML(r)}"></option>`).join("");try{t.dataset.allowedValues=JSON.stringify(l.map(r=>String(r||"").toLowerCase().trim()).filter(Boolean))}catch{}a&&(t.value=a),t.hasAttribute("data-contractor-change-attached")||(t.setAttribute("data-contractor-change-attached","true"),t.addEventListener("input",()=>{const r=document.getElementById("visit-employee-name");r&&t.value&&(r.value=t.value)}),t.addEventListener("blur",()=>{try{const r=(t.value||"").toString().trim();if(!r)return;if(!(()=>{try{return JSON.parse(t.dataset.allowedValues||"[]")}catch{return[]}})().includes(r.toLowerCase().trim())){t.value="";const f=document.getElementById("visit-employee-name");f&&(f.value=""),Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637")}}catch{}}));return}typeof Contractors<"u"&&typeof Contractors.populateContractorSelect=="function"&&Contractors.populateContractorSelect(t,{placeholder:"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",selectedValue:a,valueMode:"name",showServiceType:!0,includeSuppliers:!0,approvedOnly:!1}),a&&(t.value=a),t.hasAttribute("data-contractor-change-attached")||(t.setAttribute("data-contractor-change-attached","true"),t.addEventListener("change",()=>{const s=document.getElementById("visit-employee-name");s&&t.value&&(s.value=t.value)}))},handlePersonTypeChange(){const t=document.getElementById("visit-person-type");if(!t)return;const e=t.value,a=document.getElementById("visit-employee-code-container"),s=document.getElementById("visit-employee-code"),n=document.getElementById("visit-employee-name"),i=document.getElementById("visit-employee-name-label"),o=document.getElementById("visit-employee-position-container"),l=document.getElementById("visit-employee-department-container"),r=document.getElementById("visit-employee-location-container"),c=document.getElementById("visit-employee-location"),d=document.getElementById("visit-contractor-worker-container"),f=document.getElementById("visit-contractor-worker"),p=document.getElementById("visit-contractor-worker-label"),m=document.getElementById("visit-contractor-position-container"),u=document.getElementById("visit-contractor-position"),g=document.getElementById("visit-factory-container"),y=document.getElementById("visit-factory"),v=document.getElementById("visit-contractor-factory-container"),S=document.getElementById("visit-contractor-factory"),L=document.getElementById("visit-work-area-container"),M=document.getElementById("visit-work-area");a&&(a.style.display=e==="employee"?"block":"none"),s&&(e==="employee"?(s.disabled=!1,s.required=!0,s.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)"):(s.disabled=!0,s.required=!1,s.value="",s.placeholder="")),o&&(o.style.display=e==="employee"?"block":"none"),l&&(l.style.display=e==="employee"?"block":"none"),r&&(r.style.display=e==="employee"?"block":"none"),d&&(d.style.display=e==="contractor"||e==="external"?"block":"none"),m&&(m.style.display=e==="contractor"||e==="external"?"block":"none"),g&&(g.style.display=e==="employee"?"block":"none"),v&&(v.style.display=e==="contractor"||e==="external"?"block":"none"),L&&(L.style.display=e==="contractor"||e==="external"?"block":"none"),i&&(i.textContent=`\u0627\u0633\u0645 ${e==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":e==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u062C\u0647\u0629"} *`);const E=document.getElementById("visit-contractor-name-select");e==="employee"?(n&&(n.readOnly=!0,n.placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",n.value="",n.style.display="block",n.required=!0),E&&(E.style.display="none",E.required=!1)):e==="contractor"?(n&&(n.style.display="none",n.required=!1,n.value=""),E&&(E.style.display="block",E.required=!0,Clinic.loadContractorsIntoSelect(E))):(n&&(n.readOnly=!1,n.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u062C\u0647\u0629 \u0623\u0648 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629",n.value="",n.style.display="block",n.required=!0),E&&(E.style.display="none",E.required=!1));const h=document.getElementById("visit-employee-position"),I=document.getElementById("visit-employee-department");c&&(c.required=e==="employee",e!=="employee"&&(c.value="")),f&&(e==="contractor"||e==="external"?(f.required=!0,f.placeholder=e==="contractor"?"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644":"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A"):(f.required=!1,f.value="",f.placeholder="")),p&&(p.textContent=e==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644 *":e==="external"?"\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A *":"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639"),u&&(e==="contractor"||e==="external"?(u.required=!0,e==="contractor"?(u.setAttribute("list","visit-contractor-position-datalist"),u.placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0648\u0638\u064A\u0641\u0629",this.refreshContractorJobTitlesDatalist_()):(u.removeAttribute("list"),u.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u064A\u062F\u0648\u064A\u0627\u064B \u0644\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629")):(u.required=!1,u.value="",u.placeholder=""));const C=document.getElementById("visit-contractor-position-hint");if(C&&(C.textContent=e==="contractor"?"\u0627\u062E\u062A\u0631 \u0648\u0638\u064A\u0641\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629":"\u064A\u0633\u0645\u062D \u0628\u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A \u0644\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629"),u&&!u.dataset.jobValidationBound&&(u.dataset.jobValidationBound="1",u.addEventListener("blur",()=>{if(document.getElementById("visit-person-type")?.value!=="contractor")return;const j=u.value.trim();if(!j)return;this.getContractorJobTitleOptions().some(x=>this.normalizeArabicText(x)===this.normalizeArabicText(j))||(u.value="",Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0648\u0638\u064A\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629"))})),M&&(M.required=e==="contractor"||e==="external",e==="contractor"||e==="external"?M.placeholder="\u062D\u062F\u062F \u0645\u0648\u0642\u0639 \u0623\u0648 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":(M.placeholder="",M.value="")),h&&(h.value=""),I&&(I.value=""),e==="employee"&&typeof EmployeeHelper<"u"&&s){const j=s.cloneNode(!0);s.parentNode.replaceChild(j,s),EmployeeHelper.setupEmployeeCodeSearch("visit-employee-code","visit-employee-name",w=>{if(w){const x=document.getElementById("visit-employee-name"),A=document.getElementById("visit-employee-position"),b=document.getElementById("visit-employee-department");x&&(x.value=w.name||""),A&&(A.value=w.position||""),b&&(b.value=w.department||"");const U=document.getElementById("visit-history-tbody");if(U){const q=document.getElementById("visit-employee-code")?.value.trim();if(q){const F=(AppState.appData.clinicVisits||[]).filter(_=>_.personType==="employee"&&(_.employeeCode===q||_.employeeNumber===q)).sort((_,P)=>new Date(P.visitDate||P.createdAt)-new Date(_.visitDate||_.createdAt)).slice(0,10);F.length===0?U.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0633\u0627\u0628\u0642\u0629</td></tr>':U.innerHTML=F.map(_=>`
                                    <tr>
                                        <td>${_.visitDate?Utils.escapeHTML(Utils.formatDateTime(_.visitDate)):"-"}</td>
                                        <td>${_.exitDate?Utils.escapeHTML(Utils.formatDateTime(_.exitDate)):"-"}</td>
                                        <td>${Utils.escapeHTML(_.reason||"-")}</td>
                                        <td>${Utils.escapeHTML(_.diagnosis||"-")}</td>
                                        <td>${Utils.escapeHTML(_.treatment||"-")}</td>
                                        <td>${Utils.escapeHTML(_.employeeLocation||_.workArea||"-")}</td>
                                    </tr>
                                `).join("")}}}},{inlineAlertId:"visit-form-alerts",employeeNotFoundWarn:"enter"})}},showVisitFormAlert(t,e="error"){const a=document.getElementById("visit-form-alerts");if(!a||t==null||String(t).trim()==="")return;a.style.display="block";const s=e==="error"?"border-red-300 bg-red-50 text-red-900":"border-amber-300 bg-amber-50 text-amber-950";a.innerHTML=`<div class="rounded-lg border ${s} px-3 py-2 text-sm text-right shadow-sm" role="alert">${Utils.escapeHTML(String(t))}</div>`;try{a.scrollIntoView({block:"nearest",behavior:"smooth"})}catch{}},clearVisitFormAlert(){const t=document.getElementById("visit-form-alerts");t&&(t.innerHTML="",t.style.display="none")},async showSickLeaveForm(t=null){this.ensureData();const e=!!t;t&&(t=this.normalizeMedicationRecord(t));const a=document.createElement("div");a.className="modal-overlay";const s=t?.personType||"employee",n=t?.startDate?new Date(t.startDate).toISOString().slice(0,10):"",i=t?.endDate?new Date(t.endDate).toISOString().slice(0,10):"",o=t?.employeeName||t?.personName||"",l=t?.employeeDepartment||t?.department||"",r=t?.employeePosition||t?.position||"",c=t?.employeeCode||t?.employeeNumber||"";a.innerHTML=`
            <div class="modal-content" style="max-width: 860px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
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
                                <span id="sick-leave-days" class="text-xl font-bold text-blue-800 mt-2">${t?.daysCount?`${t.daysCount} \u064A\u0648\u0645`:"\u2014"}</span>
                            </div>
                            <div>
                                <label for="sick-leave-doctor" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C</label>
                                <input type="text" id="sick-leave-doctor" class="form-input" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0639\u0627\u0644\u062C" value="${Utils.escapeHTML(t?.treatingDoctor||"")}">
                            </div>
                        </div>
                        <div>
                                <label for="sick-leave-reason" class="block text-sm font-semibold text-gray-700 mb-2">\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 *</label>
                            <textarea id="sick-leave-reason" required class="form-input" rows="3" placeholder="\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629">${Utils.escapeHTML(t?.reason||"")}</textarea>
                            </div>
                        <div>
                                <label for="sick-leave-notes" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629</label>
                            <textarea id="sick-leave-notes" class="form-input" rows="3" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0628\u064A\u0629 \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(t?.medicalNotes||"")}</textarea>
                            </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${e?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(a);const d=a.querySelector("#sick-leave-form"),f=d.querySelector("#sick-leave-person-type"),p=d.querySelector("#sick-leave-employee-code"),m=d.querySelector("#sick-leave-name"),u=d.querySelector("#sick-leave-position"),g=d.querySelector("#sick-leave-department"),y=d.querySelector("#sick-leave-position-container"),v=d.querySelector("#sick-leave-department-container"),S=d.querySelector("#sick-leave-code-container"),L=d.querySelector("#sick-leave-name-label"),M=d.querySelector("#sick-leave-dropdown"),E=d.querySelector("#sick-leave-start-date"),h=d.querySelector("#sick-leave-end-date"),I=d.querySelector("#sick-leave-days"),C=()=>{if(!E.value||!h.value){I.textContent="\u2014";return}const b=new Date(E.value).toISOString(),U=new Date(h.value).toISOString(),q=this.calculateSickLeaveDays(b,U);I.textContent=`${q} \u064A\u0648\u0645`};E.addEventListener("change",C),h.addEventListener("change",C),E.value&&h.value&&C();const j=()=>{m&&(m.value=""),u&&(u.value=""),g&&(g.value=""),p&&(p.value="")},w=b=>{if(!b){j();return}const U=EmployeeHelper.getPrimaryCode(b);p&&U&&(p.value=U),m&&(m.value=b.name||""),u&&(u.value=b.position||b.jobTitle||""),g&&(g.value=b.department||b.unit||b.section||"")},x=()=>{!p||!m||typeof EmployeeHelper>"u"||(EmployeeHelper.setupEmployeeCodeSearch("sick-leave-employee-code","sick-leave-name",b=>{b?w(b):j()}),EmployeeHelper.setupAutocomplete("sick-leave-name",b=>{b&&w(b)}))},A=(b,U=!1)=>{const q=b==="employee";S&&(S.style.display=q?"block":"none"),y&&(y.style.display=q?"block":"none"),v&&(v.style.display=q?"block":"none"),L&&(L.textContent=`\u0627\u0633\u0645 ${q?"\u0627\u0644\u0645\u0648\u0638\u0641":b==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"} *`),p&&(p.disabled=!q,p.required=q,p.placeholder=q?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":"\u0631\u0642\u0645 \u0627\u0644\u062A\u0639\u0631\u064A\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",!q&&U&&(p.value="")),m&&(m.readOnly=q,m.placeholder=q?"\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":`\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 ${b==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"}`,q&&U&&(m.value="")),!q&&U&&(u&&(u.value=""),g&&(g.value="")),M&&(M.classList.add("hidden"),M.innerHTML=""),q&&x()};if(A(s,!1),s==="employee"&&typeof EmployeeHelper<"u"&&c){const b=EmployeeHelper.findByTerm(c);b&&w(b)}f.addEventListener("change",()=>{A(f.value,!0),f.value==="employee"&&p&&p.focus()}),d.addEventListener("submit",async b=>{b.preventDefault();const q=f.value==="employee";if(!E.value||!h.value){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0627\u064A\u0629 \u0648\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0629");return}const F=new Date(E.value).toISOString(),_=new Date(h.value).toISOString(),P=this.calculateSickLeaveDays(F,_),z=t?.createdAt||new Date().toISOString(),R=t?.createdBy||this.getCurrentUserSummary(),D=this.getCurrentUserSummary(),$=this.isCurrentUserAdmin();let k,O=!1;if(e)$?(k=this.normalizeMedicationRecord({id:t?.id||Utils.generateId("MED"),name,type,usage,purchaseDate:purchaseISO,productionDate:productionISO,expiryDate:expiryISO,quantityAdded,remainingQuantity,location,notes,createdAt:z,createdBy:R,createdById:R?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:D,status:statusInfoLatest.status,daysRemaining:statusInfoLatest.daysRemaining}),delete k.pendingUpdate):(k={...t},k.pendingUpdate={name,type,usage,purchaseDate:purchaseISO,productionDate:productionISO,expiryDate:expiryISO,quantityAdded,remainingQuantity,location,notes,requestedBy:D,requestedAt:new Date().toISOString()},O=!0);else{const N=$?statusInfoLatest.status:"\u0642\u064A\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F";$||(O=!0),k=this.normalizeMedicationRecord({id:Utils.generateId("MED"),name,type,usage,purchaseDate:purchaseISO,productionDate:productionISO,expiryDate:expiryISO,quantityAdded,remainingQuantity,location,notes,createdAt:z,createdBy:R,createdById:R?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:D,status:N,daysRemaining:statusInfoLatest.daysRemaining})}Loading.show();try{const N=AppState.appData.sickLeave||[];if(e){const B=N.findIndex(V=>V.id===k.id);B!==-1?N[B]=k:N.push(k)}else N.push(k);AppState.appData.sickLeave=N;try{this.calculateClinicCardValues(),this.updateClinicAnalysisResults()}catch(B){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629):",B)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(e?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629 \u0628\u0646\u062C\u0627\u062D"),a.remove(),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="sickLeave"]')&&this.state.activeTab==="sickLeave"&&this.renderSickLeaveTab();const V=document.querySelector("#total-sick-leave");V&&(V.textContent=N.length)},100),(async()=>{try{e?await GoogleIntegration.sendRequest({action:"updateSickLeave",data:{leaveId:k.id,updateData:k}}):await GoogleIntegration.sendRequest({action:"addSickLeave",data:k})}catch(B){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets:",B)}})()}catch(N){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0631\u0636\u064A\u0629: "+N.message)}}),a.addEventListener("click",b=>{b.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()})},async showInjuryForm(t=null){Utils.safeLog("\u{1F537} \u062A\u0645 \u0627\u0633\u062A\u062F\u0639\u0627\u0621 showInjuryForm - \u0628\u062F\u0621 \u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0648\u0630\u062C..."),this.ensureData();const e=!!t,a=this;this.state.currentInjuryAttachments=Array.isArray(t?.attachments)?t.attachments.map(k=>this.normalizeAttachment(k)).filter(Boolean):[];const s=document.createElement("div");s.className="modal-overlay";const n=t?.personType||"employee",i=t?.injuryDate?Utils.toDateTimeLocalString(t.injuryDate):"",o=t?.employeeName||t?.personName||"",l=t?.contractorName||"",r=t?.employeeCode||t?.employeeNumber||"",c=t?.employeePosition||t?.contractorPosition||"",d=t?.employeeDepartment||t?.department||"",f=t?.factory||"",p=t?.subLocation||t?.subLocationName||"",m=t?.status||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629",u=this.getInjuryTypeOptions(),g=this.getSiteOptions();s.innerHTML=`
            <div class="modal-content" style="max-width: 980px; border-radius: 16px; overflow: hidden;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%); color: white;">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0625\u0635\u0627\u0628\u0629 \u0637\u0628\u064A\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0625\u0635\u0627\u0628\u0629 \u0637\u0628\u064A\u0629 \u062C\u062F\u064A\u062F\u0629"}</h2>
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
                                    ${g.map(k=>`<option value="${Utils.escapeHTML(k.id)}" ${f===k.id||f===k.name?"selected":""}>${Utils.escapeHTML(k.name)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label for="injury-sub-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                <input type="text" id="injury-sub-location" list="injury-sub-location-datalist" class="form-input" value="${Utils.escapeHTML(p)}" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639\u0627\u064B \u0641\u0631\u0639\u064A\u0627\u064B \u0623\u0648 \u0627\u0643\u062A\u0628 \u064A\u062F\u0648\u064A\u0627\u064B">
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
                                    ${u.map(k=>`<option value="${Utils.escapeHTML(k)}" ${t?.injuryType===k?"selected":""}>${Utils.escapeHTML(k)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645) *</label>
                                <select id="injury-body-part" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0627\u0644\u062C\u0633\u0645</option>
                                    ${this.getInjuryBodyPartOptions().map(k=>`<option value="${Utils.escapeHTML(k)}" ${t?.injuryBodyPart===k?"selected":""}>${Utils.escapeHTML(k)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label for="injury-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 *</label>
                                <input type="text" id="injury-location" required class="form-input" value="${Utils.escapeHTML(t?.injuryLocation||"")}" placeholder="\u062D\u062F\u062F \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629">
                            </div>
                        </div>
                        <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 *</label>
                            <textarea id="injury-description" required class="form-input" rows="3" placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u062D\u0627\u062F\u062B">${Utils.escapeHTML(t?.injuryDescription||"")}</textarea>
                            </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u062E\u0630\u0629</label>
                                <textarea id="injury-actions" class="form-input" rows="3" placeholder="\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0641\u0648\u0631\u064A\u0629 \u0623\u0648 \u0627\u0644\u062E\u0637\u0637 \u0627\u0644\u0639\u0644\u0627\u062C\u064A\u0629">${Utils.escapeHTML(t?.actionsTaken||"")}</textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0639\u0644\u0627\u062C</label>
                                <textarea id="injury-treatment" class="form-input" rows="3" placeholder="\u0627\u0644\u0639\u0644\u0627\u062C \u0627\u0644\u0645\u0648\u0635\u0648\u0641">${Utils.escapeHTML(t?.treatment||"")}</textarea>
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
                                <i class="fas fa-save ml-2"></i>${e?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0629"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(s);const y=s.querySelector("#injury-form"),v=y.querySelector("#injury-person-type"),S=y.querySelector("#injury-name"),L=y.querySelector("#injury-employee-code"),M=y.querySelector("#injury-code-container"),E=y.querySelector("#injury-contractor-container"),h=y.querySelector("#injury-contractor-name-select"),I=y.querySelector("#injury-employee-name-container"),C=y.querySelector("#injury-contractor-worker-container"),j=y.querySelector("#injury-contractor-worker-name"),w=y.querySelector("#injury-name-label"),x=y.querySelector("#injury-position"),A=y.querySelector("#injury-factory"),b=y.querySelector("#injury-sub-location"),U=y.querySelector("#injury-department"),q=y.querySelector("#injury-dropdown"),F=y.querySelector("#injury-attachments-input"),_=s.querySelector(".modal-close"),P=y.querySelector("#injury-cancel-btn"),z=k=>{if(k){if(S&&(S.value=k.name||""),L){const O=EmployeeHelper.getPrimaryCode(k);O&&(L.value=O)}U&&(U.value=k.department||k.unit||k.section||U.value),x&&(x.value=k.position||k.job||"")}},R=()=>{!L||!S||typeof EmployeeHelper>"u"||(EmployeeHelper.setupEmployeeCodeSearch("injury-employee-code","injury-name",k=>{k&&z(k)}),EmployeeHelper.setupAutocomplete("injury-name",k=>{k&&z(k)}))},D=(k,O=!1)=>{const N=k==="employee",B=k==="contractor",V=k==="external";M&&(M.style.display=N?"block":"none"),E&&(E.style.display=B?"block":"none"),I&&(I.style.display=N?"block":"none"),C&&(C.style.display=B||V?"block":"none"),L&&(L.required=N,L.disabled=!N,L.placeholder=N?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":"\u0631\u0642\u0645 \u0627\u0644\u062A\u0639\u0631\u064A\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",!N&&O&&(L.value="")),w&&(w.textContent=`\u0627\u0633\u0645 ${N?"\u0627\u0644\u0645\u0648\u0638\u0641":k==="contractor"?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"} *`),S&&(S.readOnly=N,S.disabled=!N,S.required=N,S.placeholder=N?"\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":`\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 ${k==="contractor"?"\u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0639\u0627\u0645\u0644"}`,O&&!N&&(S.value="")),h&&(h.required=B,h.disabled=!B,B?this.loadContractorsIntoSelect(h):O&&(h.value="")),j&&(j.required=B||V,j.disabled=!(B||V),O&&N&&(j.value=""),V?j.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A":B?j.placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644":j.placeholder=""),!N&&O&&U&&(U.value=""),!N&&O&&x&&(x.value=""),q&&(q.classList.add("hidden"),q.innerHTML=""),N&&R()};if(D(n,!1),n==="employee"&&typeof EmployeeHelper<"u"&&r){const k=EmployeeHelper.findByTerm(r);k&&z(k)}v.addEventListener("change",()=>{D(v.value,!0)}),h?.addEventListener("input",()=>{v.value!=="contractor"||!(h.value||"").trim()||S.value.trim()||S.focus()}),typeof this.setupClinicWorkplaceDatalist=="function"&&this.setupClinicWorkplaceDatalist("injury-factory","injury-sub-location","injury-sub-location-datalist",{includeFallbackNameMatch:!0}),F?.addEventListener("change",async k=>{await a.handleInjuryAttachmentsChange(k.target.files)}),typeof a.renderInjuryAttachmentsPreview=="function"?a.renderInjuryAttachmentsPreview():Utils.safeWarn("\u26A0\uFE0F renderInjuryAttachmentsPreview \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");const $=()=>{a.state.currentInjuryAttachments=[],s.remove()};_?.addEventListener("click",$),P?.addEventListener("click",$),Utils.safeLog("\u{1F537} \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 event listener \u0644\u0644\u0646\u0645\u0648\u0630\u062C..."),y.addEventListener("submit",async k=>{Utils.safeLog("\u{1F534} \u062A\u0645 \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0632\u0631 \u0627\u0644\u062D\u0641\u0638! \u0628\u062F\u0621 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629...");try{k.preventDefault(),k.stopPropagation(),k.stopImmediatePropagation(),Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0625\u0635\u0627\u0628\u0629...");const O=v.value,N=O==="employee",B=y.querySelector("#injury-date");if(!B.value){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}const V=Utils.dateTimeLocalToISO(B.value)||new Date().toISOString(),X=t?.createdAt||new Date().toISOString(),Y=t?.createdBy||a.getCurrentUserSummary(),at=a.getCurrentUserSummary(),Z=U?.value.trim()||"",ot=x?.value.trim()||"",tt=h?.value?.trim()||"",et=N?S?.value?.trim()||"":j?.value?.trim()||S?.value?.trim()||"",st=y.querySelector("#injury-type")?.value||"",K=y.querySelector("#injury-body-part")?.value||"",nt=y.querySelector("#injury-location")?.value?.trim()||"",rt=y.querySelector("#injury-description")?.value?.trim()||"",it=A?.value?.trim()||"",T=b?.value?.trim()||"";if(N&&!et){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644/\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641");return}if(O==="contractor"&&h){const G=(()=>{try{return JSON.parse(h.dataset.allowedValues||"[]")}catch{return[]}})();if(!tt||!G.includes(tt.toLowerCase().trim())){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637");return}if(!et){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0627\u0628 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644");return}}if(O==="external"&&!et){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062E\u0627\u0631\u062C\u064A");return}if(!st){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}if(!K){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 (\u0628\u0627\u0644\u062C\u0633\u0645)");return}if(!nt){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0645\u0643\u0627\u0646 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}if(!rt){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0648\u0635\u0641 \u0627\u0644\u0625\u0635\u0627\u0628\u0629");return}let H="";it&&(H=g.find(J=>J.id===it||J.name===it)?.name||"");const W=a.normalizeInjuryRecord({id:t?.id||Utils.generateId("INJURY"),personType:O,employeeName:N?S.value.trim():null,employeeCode:N?L?.value.trim()||"":null,employeeNumber:N?L?.value.trim()||"":null,personName:N?null:et,contractorName:O==="contractor"?tt:null,employeePosition:ot,contractorPosition:N?null:ot,employeeDepartment:Z,department:Z,factory:it||null,factoryName:H||null,subLocation:T||null,subLocationName:T||null,injuryDate:V,injuryType:st,injuryBodyPart:K,injuryLocation:nt,injuryDescription:rt,actionsTaken:y.querySelector("#injury-actions").value.trim(),treatment:y.querySelector("#injury-treatment").value.trim(),status:y.querySelector("#injury-status").value,attachments:a.state.currentInjuryAttachments.map(G=>({...G})),createdAt:X,createdBy:Y,createdById:Y?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:at});Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 payload \u0628\u0646\u062C\u0627\u062D:",W),Loading.show();const Q=AppState.appData.injuries||[];if(e){const G=Q.findIndex(J=>J.id===W.id);G!==-1?Q[G]=W:Q.push(W)}else Q.push(W);AppState.appData.injuries=Q;try{a.calculateClinicCardValues(),a.updateClinicAnalysisResults()}catch(G){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u0625\u0635\u0627\u0628\u0629):",G)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B"),Loading.hide(),Notification.success(e?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0629 \u0628\u0646\u062C\u0627\u062D"),$(),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0628\u0646\u062C\u0627\u062D"),setTimeout(()=>{try{Utils.safeLog("\u2705 \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u062D\u062F\u064A\u062B \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A..."),document.querySelector('.clinic-tab-panel[data-tab-panel="injuries"]')&&a.state.activeTab==="injuries"&&(Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 panel\u060C \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647"),a.renderInjuriesTab());const J=document.querySelector("#total-injuries");J&&(J.textContent=Q.length)}catch(G){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A:",G)}},100),(async()=>{try{e?(await GoogleIntegration.sendRequest({action:"updateInjury",data:{injuryId:W.id,updateData:W}}),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A Google Sheets (\u062A\u062D\u062F\u064A\u062B)")):(await GoogleIntegration.sendRequest({action:"addInjury",data:W}),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A Google Sheets (\u0625\u0636\u0627\u0641\u0629)"))}catch(G){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets:",G)}})()}catch(O){Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0639\u0627\u0645 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629:",O),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u0635\u0627\u0628\u0629: "+O.message)}}),s.addEventListener("click",k=>{if(k.target===s){if(!confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`))return;a.state.currentInjuryAttachments=[],s.remove()}})},showVisitForm(t=null,e=null){const a=!!t;if(!document.getElementById("clinic-section")){e&&(e.disabled=!1);return}try{this.ensureData()}catch(o){e&&(e.disabled=!1),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0636\u064A\u0631 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",o);return}typeof Permissions<"u"&&Permissions.ensureFormSettingsState&&Permissions.ensureFormSettingsState().catch(()=>{});const n=document.createElement("div");if(n.className="modal-overlay",n.innerHTML=`
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
                                    <option value="employee" ${t?.personType==="employee"||!t?"selected":""}>\u0645\u0648\u0638\u0641</option>
                                    <option value="contractor" ${t?.personType==="contractor"?"selected":""}>\u0645\u0642\u0627\u0648\u0644</option>
                                    <option value="external" ${t?.personType==="external"?"selected":""}>\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629</option>
                                </select>
                            </div>
                            <div id="visit-employee-code-container" style="display: ${t?.personType==="employee"||!t?"block":"none"};">
                                <label for="visit-employee-code" class="block text-sm font-semibold mb-2" style="color: #667eea; display: flex; align-items: center; gap: 5px;"><i class="fas fa-id-card"></i> \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A / \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0638\u064A\u0641\u064A *</label>
                                <input type="text" id="visit-employee-code" class="form-input" style="border: 2px solid #667eea; border-radius: 8px;"
                                    value="${t?.employeeCode||t?.employeeNumber||""}"
                                    placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)"
                                    autocomplete="off" autocorrect="off" spellcheck="false" inputmode="text"
                                    ${t?.personType==="employee"||!t?"required":"disabled"}>
                            </div>
                            <div id="visit-employee-name-container">
                                <label for="visit-employee-name" class="block text-sm font-semibold mb-2" id="visit-employee-name-label" style="color: #667eea; display: flex; align-items: center; gap: 5px;"><i class="fas fa-user"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *</label>
                                <input type="text" id="visit-employee-name" required class="form-input" style="border: 2px solid #667eea; border-radius: 8px;"
                                    value="${t?.employeeName||""}"
                                    placeholder="${t?.personType==="employee"||!t?"\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B":t?.personType==="contractor"?"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644"}"
                                    ${t?.personType==="employee"||!t?"readonly":""}
                                    style="display: ${t?.personType==="contractor"?"none":"block"}; border: 2px solid #667eea; border-radius: 8px;">
                                <input id="visit-contractor-name-select" required class="form-input"
                                    list="visit-contractors-datalist"
                                    placeholder="-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --"
                                    style="display: ${t?.personType==="contractor"?"block":"none"}; border: 2px solid #667eea; border-radius: 8px;"
                                    autocomplete="off">
                                <datalist id="visit-contractors-datalist"></datalist>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 -->
                        <div class="grid grid-cols-2 gap-4" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                            <div id="visit-employee-position-container" style="display: ${t?.personType==="employee"||!t?"block":"none"};">
                                <label for="visit-employee-position" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                                <input type="text" id="visit-employee-position" class="form-input" readonly placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B"
                                    value="${t?.employeePosition||""}">
                            </div>
                            <div id="visit-employee-department-container" style="display: ${t?.personType==="employee"||!t?"block":"none"};">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                                <input type="text" id="visit-employee-department" class="form-input" readonly placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B"
                                    value="${t?.employeeDepartment||""}">
                            </div>
                            <div id="visit-factory-container" style="display: ${t?.personType==="employee"||!t?"block":"none"};">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                                <select id="visit-factory" class="form-input" style="border: 2px solid #fc6c85; border-radius: 8px;">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 --</option>
                                    ${this.getSiteOptions().map(o=>`
                                        <option value="${o.id}" ${t?.factory===o.id||t?.factory===o.name?"selected":""}>${Utils.escapeHTML(o.name)}</option>
                                    `).join("")}
                                </select>
                            </div>
                            <div id="visit-employee-location-container" style="display: ${t?.personType==="employee"||!t?"block":"none"};">
                                <label for="visit-employee-location" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 *<span style="font-size: 11px; color: #666; display: block; margin-top: 2px;">\u064A\u064F\u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 \u0644\u0644\u0645\u0635\u0646\u0639 \u0623\u0639\u0644\u0627\u0647\u061B \u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0623\u0648 \u0623\u062F\u062E\u0644 \u0646\u0635\u0627\u064B \u064A\u062F\u0648\u064A\u0627\u064B</span></label>
                                <input type="text" id="visit-employee-location" class="form-input" list="visit-employee-location-datalist"
                                    value="${t?.employeeLocation||""}"
                                    placeholder="\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639\u0627\u064B \u0641\u0631\u0639\u064A\u0627\u064B \u0623\u0648 \u0627\u0643\u062A\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"
                                    autocomplete="off" autocorrect="off" spellcheck="false" inputmode="text" required>
                                <datalist id="visit-employee-location-datalist"></datalist>
                            </div>
                            <div id="visit-contractor-position-container" style="display: ${t?.personType==="contractor"||t?.personType==="external"?"block":"none"};">
                                <div class="flex items-center justify-between gap-2 mb-2">
                                    <label for="visit-contractor-position" class="block text-sm font-semibold text-gray-700">\u0627\u0644\u0648\u0638\u064A\u0641\u0629 *</label>
                                    ${this.isCurrentUserAdmin()?'<button type="button" onclick="Clinic.showContractorJobTitlesSettingsModal()" class="btn-icon btn-icon-primary" title="\u0625\u062F\u0627\u0631\u0629 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646" aria-label="\u0625\u062F\u0627\u0631\u0629 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646" style="width:30px;height:30px;border-radius:8px;"><i class="fas fa-cog"></i></button>':""}
                                </div>
                                <input type="text" id="visit-contractor-position" class="form-input" list="visit-contractor-position-datalist"
                                    value="${t?.contractorPosition||t?.employeePosition||""}"
                                    placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0648\u0638\u064A\u0641\u0629"
                                    autocomplete="off"
                                    ${t?.personType==="contractor"||t?.personType==="external"?"required":""}>
                                <datalist id="visit-contractor-position-datalist">
                                    ${this.getContractorJobTitleOptions().map(o=>`<option value="${Utils.escapeHTML(o)}"></option>`).join("")}
                                </datalist>
                                <span id="visit-contractor-position-hint" style="display:block;margin-top:5px;color:#64748b;font-size:.72rem;">\u0627\u062E\u062A\u0631 \u0648\u0638\u064A\u0641\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</span>
                            </div>
                            <div id="visit-contractor-factory-container" style="display: ${t?.personType==="contractor"||t?.personType==="external"?"block":"none"};">
                                <label for="visit-contractor-factory" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                                <select id="visit-contractor-factory" class="form-input" style="border: 2px solid #fc6c85; border-radius: 8px;">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 --</option>
                                    ${this.getSiteOptions().map(o=>`
                                        <option value="${o.id}" ${t?.factory===o.id||t?.factory===o.name?"selected":""}>${Utils.escapeHTML(o.name)}</option>
                                    `).join("")}
                                </select>
                            </div>
                            <div id="visit-work-area-container" style="display: ${t?.personType==="contractor"||t?.personType==="external"?"block":"none"};">
                                <label for="visit-work-area" class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 *<span style="font-size: 11px; color: #666; display: block; margin-top: 2px;">\u064A\u064F\u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 \u0644\u0644\u0645\u0635\u0646\u0639 \u0623\u0639\u0644\u0627\u0647\u061B \u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0623\u0648 \u0623\u062F\u062E\u0644 \u0646\u0635\u0627\u064B \u064A\u062F\u0648\u064A\u0627\u064B</span></label>
                                <input type="text" id="visit-work-area" class="form-input" list="visit-work-area-datalist"
                                    value="${t?.workArea||""}" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639\u0627\u064B \u0641\u0631\u0639\u064A\u0627\u064B \u0623\u0648 \u0627\u0643\u062A\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"
                                    autocomplete="off" autocorrect="off" spellcheck="false" inputmode="text"
                                    ${t?.personType==="contractor"||t?.personType==="external"?"required":""}>
                                <datalist id="visit-work-area-datalist"></datalist>
                            </div>
                            <div id="visit-contractor-worker-container" style="display: ${t?.personType==="contractor"||t?.personType==="external"?"block":"none"};">
                                <label for="visit-contractor-worker" id="visit-contractor-worker-label" class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644 *</label>
                                <input type="text" id="visit-contractor-worker" class="form-input"
                                    value="${t?.contractorWorkerName||""}" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644 \u0627\u0644\u062A\u0627\u0628\u0639 \u0644\u0644\u0645\u0642\u0627\u0648\u0644"
                                    ${t?.personType==="contractor"||t?.personType==="external"?"required":""}>
                            </div>
                            <div>
                                <label for="visit-date" class="block text-sm font-semibold mb-2" style="color: #fc6c85; display: flex; align-items: center; gap: 5px;"><i class="fas fa-clock"></i> \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 *</label>
                                <input type="datetime-local" id="visit-date" required class="form-input" style="border: 2px solid #fc6c85; border-radius: 8px;"
                                    value="${t?.visitDate?Utils.toDateTimeLocalString(t.visitDate):""}">
                            </div>
                            <div>
                                <label for="visit-exit-date" class="block text-sm font-semibold mb-2" style="color: #fc6c85; display: flex; align-items: center; gap: 5px;"><i class="fas fa-sign-out-alt"></i> \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</label>
                                <input type="datetime-local" id="visit-exit-date" class="form-input" style="border: 2px solid #fc6c85; border-radius: 8px;"
                                    value="${t?.exitDate?Utils.toDateTimeLocalString(t.exitDate):""}">
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0648\u0627\u0644\u0639\u0644\u0627\u062C -->
                        <div class="grid grid-cols-1 gap-4" style="background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                            <div class="col-span-2">
                                <label for="visit-type" class="block text-sm font-semibold mb-2" style="color: #4facfe; display: flex; align-items: center; gap: 5px;"><i class="fas fa-tag"></i> \u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 *</label>
                                <select id="visit-type" required class="form-input" style="border: 2px solid #4facfe; border-radius: 8px;">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 --</option>
                                    ${(a&&!t?.visitType?["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"]:[]).map(o=>`<option value="${Utils.escapeHTML(o)}" selected>${Utils.escapeHTML(o)}</option>`).join("")}
                                    ${this.getVisitTypeOptions().map(o=>`<option value="${Utils.escapeHTML(o)}" ${(t?.visitType||"")===o?"selected":""}>${Utils.escapeHTML(o)}</option>`).join("")}
                                </select>
                            </div>
                            <div class="col-span-2">
                                <label for="visit-reason" class="block text-sm font-semibold mb-2" style="color: #4facfe; display: flex; align-items: center; gap: 5px;"><i class="fas fa-question-circle"></i> \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 *</label>
                                <input type="text" id="visit-reason" required class="form-input" style="border: 2px solid #4facfe; border-radius: 8px;"
                                    value="${t?.reason||""}" placeholder="\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629">
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold mb-2" style="color: #4facfe; display: flex; align-items: center; gap: 5px;"><i class="fas fa-diagnoses"></i> \u0627\u0644\u062A\u0634\u062E\u064A\u0635</label>
                                <textarea id="visit-diagnosis" class="form-input" rows="3" style="border: 2px solid #4facfe; border-radius: 8px;"
                                    placeholder="\u0627\u0644\u062A\u0634\u062E\u064A\u0635">${t?.diagnosis||""}</textarea>
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold mb-2" style="color: #4facfe; display: flex; align-items: center; gap: 5px;"><i class="fas fa-pills"></i> \u0627\u0644\u0639\u0644\u0627\u062C</label>
                                <textarea id="visit-treatment" class="form-input" rows="3" style="border: 2px solid #4facfe; border-radius: 8px;"
                                    placeholder="\u0627\u0644\u0639\u0644\u0627\u062C \u0627\u0644\u0645\u0648\u0635\u0648\u0641">${t?.treatment||""}</textarea>
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
                                        ${t?.medications&&Array.isArray(t.medications)?t.medications.map((o,l)=>`
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
                        ${t?.personType==="employee"||!t?`
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
        `,document.body.appendChild(n),e){const o=new MutationObserver(()=>{document.body.contains(n)||(e.disabled=!1,o.disconnect())});o.observe(document.body,{childList:!0,subtree:!0})}setTimeout(()=>{const o=document.getElementById("visit-person-type"),l=document.getElementById("visit-employee-code"),r=document.getElementById("visit-history-tbody"),c=()=>{if(!r)return;const w=o?.value||"employee",x=l?.value.trim();if(w!=="employee"||!x){r.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>';return}const A=(AppState.appData.clinicVisits||[]).filter(b=>b.personType==="employee"&&(b.employeeCode===x||b.employeeNumber===x)).sort((b,U)=>new Date(U.visitDate||U.createdAt)-new Date(b.visitDate||b.createdAt)).slice(0,10);A.length===0?r.innerHTML='<tr><td colspan="6" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0633\u0627\u0628\u0642\u0629</td></tr>':r.innerHTML=A.map(b=>`
                        <tr>
                            <td>${b.visitDate?Utils.escapeHTML(Utils.formatDateTime(b.visitDate)):"-"}</td>
                            <td>${b.exitDate?Utils.escapeHTML(Utils.formatDateTime(b.exitDate)):"-"}</td>
                            <td>${Utils.escapeHTML(b.reason||"-")}</td>
                            <td>${Utils.escapeHTML(b.diagnosis||"-")}</td>
                            <td>${Utils.escapeHTML(b.treatment||"-")}</td>
                            <td>${Utils.escapeHTML(b.employeeLocation||b.workArea||"-")}</td>
                        </tr>
                    `).join("")};if(l&&r&&(l.addEventListener("blur",c),l.addEventListener("input",()=>{l.value.trim().length>=3&&c()})),o&&o.addEventListener("change",()=>{const w=document.querySelector("#visit-history-table")?.closest(".mt-6");w&&(w.style.display=o.value==="employee"?"block":"none"),o.value==="employee"&&c()}),t&&t.employeeCode&&c(),t?.personType==="contractor"){const w=document.getElementById("visit-contractor-name-select");w&&(Clinic.loadContractorsIntoSelect(w),(t.employeeName||t.contractorName)&&(w.value=t.employeeName||t.contractorName||""))}typeof Clinic.handlePersonTypeChange=="function"&&Clinic.handlePersonTypeChange(),typeof Clinic.setupClinicWorkplaceDatalist=="function"&&(Clinic.setupClinicWorkplaceDatalist("visit-factory","visit-employee-location","visit-employee-location-datalist"),Clinic.setupClinicWorkplaceDatalist("visit-contractor-factory","visit-work-area","visit-work-area-datalist"));const d=document.getElementById("visit-medication-select"),f=document.getElementById("visit-medications-list"),p=document.getElementById("visit-add-medication-btn"),m=document.getElementById("visit-medication-quantity"),u=document.getElementById("visit-medications-datalist"),g=document.getElementById("visit-type"),y=document.getElementById("visit-treatment"),v=document.getElementById("visit-treatment-medication-mode"),S=document.getElementById("visit-treatment-medication-select"),L=document.getElementById("visit-treatment-medications-datalist");let M=t?.medications&&Array.isArray(t.medications)?[...t.medications]:[];const E=()=>this.getMedications().filter(w=>(parseInt(w.remainingQuantity??w.quantity??0,10)||0)>0),h=()=>{if(!S||!L)return;const w={};L.innerHTML=E().map(x=>{const A=parseInt(x.remainingQuantity??x.quantity??0,10)||0,b=String(x.name||x.medicationName||"").trim();if(!b)return"";const U=`${b} (\u0645\u062A\u0648\u0641\u0631: ${A})`;return w[this.normalizeArabicText(b)]={id:x.id||"",name:b,label:U},`<option value="${Utils.escapeHTML(U)}"></option>`}).join(""),S.dataset.medicationMap=JSON.stringify(w)},I=()=>{const w=this.isMedicationDispenseVisitType_(g?.value||"");y&&(y.style.display=w?"none":"block"),v&&(v.style.display=w?"block":"none"),w&&(h(),S&&M.length>0&&(S.value=M.map(x=>x.medicationName).filter(Boolean).join("\u060C ")))},C=()=>{if(!d||!u)return;const w=this.getMedications().filter(A=>(A.remainingQuantity??A.quantity??0)<=0?!1:!M.some(q=>q.medicationId===A.id)),x={};u.innerHTML=w.map(A=>{const b=A.remainingQuantity??A.quantity??0,U=String(A.name||A.medicationName||"").trim(),q=`${U} (\u0645\u062A\u0648\u0641\u0631: ${b})`,F=U.toLowerCase().trim();return F&&(x[F]=A.id),`<option value="${Utils.escapeHTML(q)}"></option>`}).join(""),d.dataset.nameToId=JSON.stringify(x),d.dataset.selectedId=""},j=()=>{if(f){if(M.length===0){f.innerHTML="",this.isMedicationDispenseVisitType_(g?.value||"")&&y&&(y.value="");return}f.innerHTML=M.map((w,x)=>{const A=this.getMedications().find(b=>b.id===w.medicationId);return`
                        <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2" data-med-id="${w.medicationId||""}">
                            <div>
                                <span class="font-medium">${Utils.escapeHTML(w.medicationName||A?.name||"")}</span>
                                <span class="text-sm text-gray-600 mr-2">\xD7 ${w.quantity||1}</span>
                            </div>
                            <button type="button" class="btn-icon btn-icon-danger btn-xs" data-remove-med="${x}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `}).join(""),this.isMedicationDispenseVisitType_(g?.value||"")&&y&&(y.value=M.map(w=>w.medicationName).filter(Boolean).join("\u060C "),S&&(S.value=y.value)),f.querySelectorAll("[data-remove-med]").forEach(w=>{w.addEventListener("click",()=>{const x=parseInt(w.getAttribute("data-remove-med"),10);M.splice(x,1),j(),C()})})}};p&&d&&m&&p.addEventListener("click",()=>{const x=(d.value||"").trim().replace(/\s*\(.*\)\s*$/,"").trim(),A=(()=>{try{return JSON.parse(d.dataset.nameToId||"{}")}catch{return{}}})(),b=d.dataset.selectedId||A[String(x).toLowerCase().trim()]||"",U=parseInt(m.value,10)||1;if(!b){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062F\u0648\u0627\u0621");return}const q=this.getMedications().find(P=>P.id===b);if(!q){Notification.error("\u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const F=q.remainingQuantity??q.quantity??0,_=M.filter(P=>P.medicationId===b).reduce((P,z)=>P+(z.quantity||0),0);if(_+U>F){Notification.error(`\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u063A\u064A\u0631 \u0643\u0627\u0641\u064A\u0629. \u0627\u0644\u0645\u062A\u0648\u0641\u0631: ${F-_}`);return}M.push({medicationId:b,medicationName:q.name||q.medicationName||"",quantity:U}),m.value="1",d.value="",j(),C()}),d&&!d.hasAttribute("data-datalist-attached")&&(d.setAttribute("data-datalist-attached","true"),d.addEventListener("input",()=>{const x=(d.value||"").trim().replace(/\s*\(.*\)\s*$/,"").trim(),A=(()=>{try{return JSON.parse(d.dataset.nameToId||"{}")}catch{return{}}})();d.dataset.selectedId=A[String(x).toLowerCase().trim()]||""}),d.addEventListener("blur",()=>{try{const w=(d.value||"").trim();if(!w)return;const x=w.replace(/\s*\(.*\)\s*$/,"").trim(),A=(()=>{try{return JSON.parse(d.dataset.nameToId||"{}")}catch{return{}}})();d.dataset.selectedId||A[String(x).toLowerCase().trim()]||(d.value="",d.dataset.selectedId="",Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062F\u0648\u0627\u0621 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637"))}catch{}})),g?.addEventListener("change",I),S?.addEventListener("input",()=>{const x=String(S.value||"").trim().replace(/\s*\(.*\)\s*$/,"").trim();let A={};try{A=JSON.parse(S.dataset.medicationMap||"{}")}catch{A={}}const b=A[this.normalizeArabicText(x)];if(!b){S.dataset.selectedId="";return}S.dataset.selectedId=b.id,y&&(y.value=b.name),d&&(d.value=b.label,d.dataset.selectedId=b.id),m?.focus()}),S?.addEventListener("blur",()=>{if(!String(S.value||"").trim()||S.dataset.selectedId)return;const x=M.map(A=>A.medicationName).filter(Boolean).join("\u060C ");S.value=x,Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062F\u0648\u0627\u0621 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0627\u0644\u0641\u0639\u0644\u064A")}),C(),j(),I()},300);const i=n.querySelector("#visit-form");i.addEventListener("submit",async o=>{o.preventDefault(),this.clearVisitFormAlert();const l=i?.querySelector('button[type="submit"]')||o.target?.querySelector('button[type="submit"]');if(l&&l.disabled)return;let r="";l&&(r=l.innerHTML,l.disabled=!0,l.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const c=document.getElementById("visit-person-type"),d=document.getElementById("visit-date"),f=document.getElementById("visit-exit-date");if(!c||!d||!f){this.showVisitFormAlert("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),l&&(l.disabled=!1,l.innerHTML=r);return}const p=String(c.value||"").trim().toLowerCase(),m=p==="employee"?"employee":"contractor",u=d.value,g=f.value,y=document.getElementById("visit-contractor-worker")?.value.trim()||"",v=m==="employee"?document.getElementById("visit-employee-location")?.value.trim()||"":document.getElementById("visit-work-area")?.value.trim()||"",S=m==="contractor"?document.getElementById("visit-contractor-position")?.value.trim()||"":null;if(p==="contractor"&&S&&!this.getContractorJobTitleOptions().some(_=>this.normalizeArabicText(_)===this.normalizeArabicText(S))){this.showVisitFormAlert("\u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631\u0647\u0627 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629"),l&&(l.disabled=!1,l.innerHTML=r);return}let L="";if(p==="contractor"){const F=document.getElementById("visit-contractor-name-select"),_=document.getElementById("visit-employee-name");if(L=F?(F.value||"").trim():_?(_.value||"").trim():"",F){const P=(()=>{try{return JSON.parse(F.dataset.allowedValues||"[]")}catch{return[]}})();if(L&&!P.includes(L.toLowerCase().trim())){this.showVisitFormAlert("\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631\u0647 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0642\u0637"),l&&(l.disabled=!1,l.innerHTML=r);return}}}else{const F=document.getElementById("visit-employee-name");L=F?(F.value||"").trim():""}const M=document.getElementById("visit-medications-list"),E=[];M&&M.querySelectorAll("[data-med-id]").forEach(F=>{const _=F.getAttribute("data-med-id");if(!_)return;const P=F.textContent.match(/×\s*(\d+)/),z=P?parseInt(P[1],10):1,R=F.querySelector(".font-medium"),D=R?R.textContent.trim():"";E.push({medicationId:_,medicationName:D,quantity:z})});const h=m==="employee"?document.getElementById("visit-factory")?.value.trim()||null:document.getElementById("visit-contractor-factory")?.value.trim()||null;let I=null;if(h){const _=this.getSiteOptions().find(P=>P.id===h);I=_?_.name:null}let C=null,j=null;if(u&&u.trim())try{const[F,_]=u.split("T");if(F&&_){const[P,z,R]=F.split("-").map(Number),[D,$]=_.split(":").map(Number),k=new Date(P,z-1,R,D,$,0,0);isNaN(k.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",u):C=k.toISOString()}else{const P=new Date(u);isNaN(P.getTime())||(C=P.toISOString())}}catch(F){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:",F)}if(g&&g.trim())try{const[F,_]=g.split("T");if(F&&_){const[P,z,R]=F.split("-").map(Number),[D,$]=_.split(":").map(Number),k=new Date(P,z-1,R,D,$,0,0);isNaN(k.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",g):j=k.toISOString()}else{const P=new Date(g);isNaN(P.getTime())||(j=P.toISOString())}}catch(F){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:",F)}const w=AppState.currentUser,x=(w?.email||"").toLowerCase().trim(),U=(AppState.appData.users||[]).find(F=>(F.email||"").toLowerCase().trim()===x)?.name||w?.name||x||"\u0645\u0633\u062A\u062E\u062F\u0645",q={id:t?.id||Utils.generateId("CLINIC_VISIT"),personType:m,employeeName:m==="employee"?L:null,employeeCode:m==="employee"?document.getElementById("visit-employee-code").value.trim():null,employeeNumber:m==="employee"?document.getElementById("visit-employee-code").value.trim():null,employeePosition:m==="employee"?document.getElementById("visit-employee-position")?.value.trim()||"":S||null,contractorPosition:S||null,employeeDepartment:m==="employee"?document.getElementById("visit-employee-department")?.value.trim()||"":null,factory:h,factoryName:I,employeeLocation:m==="employee"?v:null,contractorName:m==="contractor"?L:null,contractorWorkerName:m==="contractor"?y:null,externalName:null,workArea:v||null,visitDate:C,exitDate:j,visitType:document.getElementById("visit-type")?.value?.trim()||null,reason:document.getElementById("visit-reason").value.trim(),diagnosis:document.getElementById("visit-diagnosis").value.trim(),treatment:document.getElementById("visit-treatment").value.trim(),medications:E.length>0?E:null,createdAt:t?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:t?.createdBy||U,updatedBy:U,email:x,userId:w?.id||""};Loading.show();try{const F=N=>{const B={};return(Array.isArray(N)?N:[]).forEach(V=>{const X=V&&(V.medicationId||V.id)?String(V.medicationId||V.id):"";if(!X)return;const Y=parseInt(V.quantity,10)||0;B[X]=(B[X]||0)+Y}),B},_=a?this.normalizeVisitMedications(t?.medications):[],P=F(_),z=F(E),R=[];new Set([...Object.keys(P),...Object.keys(z)]).forEach(N=>{const B=(z[N]||0)-(P[N]||0);B!==0&&R.push({medicationId:N,delta:B})});const $=R.length>0,k=$?this.getMedications():[];if($)for(const N of R){if(N.delta<=0)continue;const B=k.find(X=>String(X.id)===String(N.medicationId));if(!B)throw new Error("\u0627\u0644\u062F\u0648\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646");const V=parseInt(B.remainingQuantity??B.quantity??0,10)||0;if(V<N.delta){const X=B.name||B.medicationName||"\u062F\u0648\u0627\u0621";throw new Error(`\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u063A\u064A\u0631 \u0643\u0627\u0641\u064A\u0629 \u0644\u0644\u062F\u0648\u0627\u0621: ${X}. \u0627\u0644\u0645\u062A\u0648\u0641\u0631: ${V}`)}}if(a){const N=AppState.appData.clinicVisits.findIndex(B=>B.id===t.id);N!==-1&&(AppState.appData.clinicVisits[N]=q)}else AppState.appData.clinicVisits.push(q);if($){for(const N of R){const B=k.find(Z=>String(Z.id)===String(N.medicationId));if(!B)continue;const V=parseInt(B.remainingQuantity??B.quantity??0,10)||0;if(!(typeof B.quantityAdded=="number"&&B.quantityAdded>0)&&N.delta>0){const Z=parseInt(B.quantity??0,10)||0;B.quantityAdded=Math.max(Z,V+N.delta)}let Y=V-N.delta;Y=Math.max(0,Y);const at=typeof B.quantityAdded=="number"&&B.quantityAdded>0?B.quantityAdded:typeof B.quantity=="number"&&B.quantity>0?B.quantity:null;at!==null&&(Y=Math.min(at,Y)),B.remainingQuantity=Y}AppState.appData.medications=k,AppState.appData.clinicMedications=k,AppState.appData.clinicInventory=k}try{this.updateClinicAnalysisResults(),this.calculateClinicCardValues()}catch(N){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B:",N)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{const N=this.getMonthlyVisitsAlertThreshold(),B=this.getMonthlyVisitCountForPerson(q);if(B>=N){const V=(q.personType||"").toString().toLowerCase()==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0639\u0627\u0645\u0644";typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062A\u0646\u0628\u064A\u0647: \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A "+V+" \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \u0648\u0635\u0644 \u0623\u0648 \u062A\u062C\u0627\u0648\u0632 "+N+" \u0632\u064A\u0627\u0631\u0629. \u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),this.notifyAdminsAboutHighClinicVisits(q,B).catch(function(X){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic: \u0641\u0634\u0644 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0639\u0646 \u062A\u062C\u0627\u0648\u0632 \u062A\u0631\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A:",X)})}}catch(N){Utils.safeWarn("\u0641\u062D\u0635 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0634\u0647\u0631\u064A:",N)}Loading.hide(),Notification.success(`\u062A\u0645 ${a?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D`),n.remove();const O=6e4;(async()=>{try{const N=$&&R.length>0?R.map(B=>({medicationId:String(B.medicationId),delta:Number(B.delta)||0})):null;if(a){const B={...q};N&&(B.medicationAdjustments=N);const V=await GoogleIntegration.sendRequest({action:"updateClinicVisit",data:{visitId:t.id,updateData:B,__timeoutMs:O}});this.assertClinicVisitRpcResult(V)}else{const B={...q,__timeoutMs:O};N&&(B.medicationAdjustments=N);const V=await GoogleIntegration.sendRequest({action:"addClinicVisit",data:B});this.assertClinicVisitRpcResult(V),this.applyClinicVisitIdFromServer(q,V)}$&&(GoogleIntegration.sendRequest({action:"getAllMedications",data:{}}).then(B=>{if(B&&B.success&&Array.isArray(B.data)){const V=B.data.map(X=>this.normalizeMedicationRecord(X));if(AppState.appData.medications=V,AppState.appData.clinicMedications=V,AppState.appData.clinicInventory=V,Utils.safeLog("\u2705 [CLINIC] \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0645\u064F\u062D\u062F\u064E\u0651\u062B\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+V.length+" \u062F\u0648\u0627\u0621"),this.state&&this.state.activeTab==="medications")try{this.renderMedicationsTab()}catch{}}}).catch(()=>{}),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:"\u062A\u062D\u062F\u064A\u062B",data:{updated:R.length}}}))),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"clinicVisits",action:a?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:q}})),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.refreshClinicVisitsFromServerAfterSave()}catch(N){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",N);try{typeof window.DataManager<"u"&&window.DataManager.addToPendingSync&&window.DataManager.addToPendingSync("ClinicVisits",AppState.appData.clinicVisits)}catch{}try{this.refreshClinicVisitsFromServerAfterSave()}catch{}try{const B=N&&N.message?N.message:"\u0641\u0634\u0644 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";Notification.warning("\u26A0\uFE0F \u062A\u0639\u0630\u0651\u0631 \u062A\u0623\u0643\u064A\u062F \u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629: "+B+". \u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645.")}catch{}}})(),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]')&&this.state.activeTab==="visits"&&this.renderVisitsTab(),$&&document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]')&&this.state.activeTab==="medications"&&this.renderMedicationsTab(),document.querySelector('.clinic-tab-panel[data-tab-panel="dispensed-medications"]')&&this.state.activeTab==="dispensed-medications"&&this.renderDispensedMedicationsTab();const V=document.querySelector("#total-visits");V&&(V.textContent=AppState.appData.clinicVisits.length)},100)}catch(F){Loading.hide(),this.showVisitFormAlert("\u062D\u062F\u062B \u062E\u0637\u0623: "+(F.message||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")),l&&(l.disabled=!1,l.innerHTML=r)}}),n.addEventListener("click",o=>{o.target===n&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&n.remove()})},async showMedicationForm(t=null){this.ensureData(),t&&(t=this.normalizeMedicationRecord(t));const e=!!t,a=document.createElement("div");a.className="modal-overlay";const s=(M="")=>Utils.escapeHTML(M||""),n=t?.purchaseDate?new Date(t.purchaseDate).toISOString().slice(0,10):"",i=t?.productionDate?new Date(t.productionDate).toISOString().slice(0,10):"",o=t?.expiryDate?new Date(t.expiryDate).toISOString().slice(0,10):"",l=this.calculateMedicationStatus(t||{}),r=t?.quantityAdded??t?.quantity??0,c=t?.remainingQuantity??t?.quantity??0,d=Math.max(0,r-c);a.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0648\u0627\u0621":"\u062A\u0633\u062C\u064A\u0644 \u062F\u0648\u0627\u0621 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="medication-form" class="space-y-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621 *</label>
                                <input type="text" id="med-name" required class="form-input" placeholder="\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621" value="${s(t?.name||t?.medicationName)}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062F\u0648\u0627\u0621 *</label>
                                <input type="text" id="med-type" list="med-type-list" required class="form-input" placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628..." value="${s(t?.type||t?.medicationType)}">
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
                                <input type="text" id="med-usage" list="med-usage-list" class="form-input" placeholder="\u0627\u062E\u062A\u0631 \u0623\u0648 \u0627\u0643\u062A\u0628..." value="${s(t?.usage||t?.notes||"")}">
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
                                <input type="date" id="med-production" required class="form-input" value="${i}">
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
                                <input type="text" id="med-location" class="form-input" placeholder="\u0645\u062B\u0627\u0644: \u0627\u0644\u063A\u0631\u0641\u0629 1 - \u0627\u0644\u0631\u0641 \u0628" value="${s(t?.location)}">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629</label>
                            <textarea id="med-notes" class="form-input" rows="2" placeholder="\u0623\u062F\u062E\u0644 \u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0623\u0648 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u062E\u0627\u0635\u0629">${s(t?.notes)}</textarea>
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
                            ${e?`<div class="text-xs text-gray-500 mt-2">
                                \u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644: ${Utils.escapeHTML(t?.createdBy?.name||"\u0627\u0644\u0646\u0638\u0627\u0645")} ${t?.createdAt?`(${this.formatDate(t.createdAt,!0)})`:""}
                                ${t?.updatedBy?`<br>\u0622\u062E\u0631 \u062A\u0639\u062F\u064A\u0644: ${Utils.escapeHTML(t.updatedBy.name)} ${t.updatedAt?`(${this.formatDate(t.updatedAt,!0)})`:""}`:""}
                            </div>`:""}
                        </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${e?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u0648\u0627\u0621"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(a);const f=a.querySelector("#medication-form"),p=f.querySelector("#med-purchase"),m=f.querySelector("#med-expiry"),u=f.querySelector("#med-status-badge"),g=f.querySelector("#med-status-hint"),y=f.querySelector("#med-quantity"),v=f.querySelector("#med-remaining"),S=f.querySelector("#med-dispensed"),L=()=>{const M=this.calculateMedicationStatus({expiryDate:m.value?new Date(m.value).toISOString():null});u.className=`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${this.getMedicationStatusClasses(M.status)}`,u.innerHTML=`<i class="fas fa-info-circle"></i>${M.status}`,g.textContent=this.getMedicationStatusHint(M)};m?.addEventListener("change",L),y.addEventListener("input",()=>{const M=parseInt(y.value)||0,E=parseInt(S.value)||0;v.value=Math.max(0,M-E)}),v.addEventListener("input",()=>{const M=parseInt(y.value)||0,E=parseInt(v.value)||0;S.value=Math.max(0,M-E)}),f.addEventListener("submit",async M=>{M.preventDefault();const E=f.querySelector("#med-name").value.trim(),h=f.querySelector("#med-type").value.trim(),I=f.querySelector("#med-usage")?.value.trim()||"",C=f.querySelector("#med-purchase").value,j=f.querySelector("#med-production").value,w=f.querySelector("#med-expiry").value,x=parseInt(f.querySelector("#med-quantity").value,10)||0,A=parseInt(f.querySelector("#med-remaining").value,10)||0,b=f.querySelector("#med-location").value.trim(),U=f.querySelector("#med-notes").value.trim(),q=t?.createdAt||new Date().toISOString(),F=t?.createdBy||this.getCurrentUserSummary(),_=C?new Date(C).toISOString():new Date().toISOString(),P=j?new Date(j).toISOString():new Date().toISOString(),z=w?new Date(w).toISOString():"",R=this.calculateMedicationStatus({expiryDate:z}),D=this.getCurrentUserSummary(),$=this.normalizeMedicationRecord({id:t?.id||Utils.generateId("MED"),name:E,type:h,usage:I,purchaseDate:_,productionDate:P,expiryDate:z,quantityAdded:x,remainingQuantity:A,location:b,notes:U,createdAt:q,createdBy:F,createdById:F?.id||AppState.currentUser?.id||"",updatedAt:new Date().toISOString(),updatedBy:D,status:R.status,daysRemaining:R.daysRemaining});Loading.show();try{const k=AppState.appData.medications||[];if(e){const O=k.findIndex(N=>N.id===$.id);O!==-1?k[O]=$:k.push($)}else k.push($);AppState.appData.medications=k,AppState.appData.clinicMedications=k,AppState.appData.clinicInventory=k;try{this.calculateClinicCardValues(),this.updateClinicAnalysisResults()}catch(O){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0643\u0631\u0648\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 (\u062F\u0648\u0627\u0621):",O)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success(e?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D"),a.remove(),this.state.medicationAlertsNotified.delete($.id),setTimeout(()=>{document.querySelector('.clinic-tab-panel[data-tab-panel="medications"]')&&this.state.activeTab==="medications"&&this.renderMedicationsTab();const N=document.querySelector("#total-medications");N&&(N.textContent=k.length)},100),(async()=>{try{e?await GoogleIntegration.sendRequest({action:"updateMedication",data:{medicationId:$.id,updateData:$}}):await GoogleIntegration.sendRequest({action:"addMedication",data:$}),pendingNotification&&typeof GoogleIntegration<"u"&&await GoogleIntegration.sendRequest({action:"addNotification",data:{id:Utils.generateId("NOTIF"),title:e?"\u0637\u0644\u0628 \u062A\u0639\u062F\u064A\u0644 \u062F\u0648\u0627\u0621":"\u0637\u0644\u0628 \u0625\u0636\u0627\u0641\u0629 \u062F\u0648\u0627\u0621 \u062C\u062F\u064A\u062F",message:`\u0642\u0627\u0645 ${D.name} \u0628\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 ${e?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629"} \u0644\u0644\u062F\u0648\u0627\u0621: ${$.name}`,type:"alert",targetRoles:["admin","manager"],createdAt:new Date().toISOString(),readBy:[],link:"#clinic-medications"}}),document.dispatchEvent(new CustomEvent("data-saved",{detail:{module:"medications",action:e?"\u062A\u062D\u062F\u064A\u062B":"\u0625\u0636\u0627\u0641\u0629",data:$}}))}catch(O){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets:",O)}})()}catch(k){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+k.message)}}),a.addEventListener("click",M=>{M.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()})},async viewVisit(t){this.ensureData();const e=AppState.appData.clinicVisits.find(f=>f.id===t);if(!e)return;e.createdBy||(e.createdBy=null),e.updatedBy||(e.updatedBy=null);const a=e.personType==="employee"?"\u0645\u0648\u0638\u0641":e.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",s=e.personType==="employee"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641":e.personType==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0633\u0645 \u0627\u0644\u062C\u0647\u0629",n=e.employeeName||e.contractorName||e.externalName||"",i=(e.personType==="contractor"||e.personType==="external")&&e.contractorWorkerName?`
                <div class="col-span-2">
                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062A\u0627\u0628\u0639:</label>
                    <p class="text-gray-800">${Utils.escapeHTML(e.contractorWorkerName)}</p>
                </div>
            `:"",o=e.personType==="employee"?"\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644":"\u0645\u0646\u0637\u0642\u0629 / \u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0645\u0644",l=e.personType==="employee"?e.employeeLocation:e.workArea,r=e.exitDate?Utils.escapeHTML(Utils.formatDateTime(e.exitDate)):'<span class="text-xs text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C</span>',c=e.medications&&Array.isArray(e.medications)&&e.medications.length>0?e.medications.map(f=>`
                <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: #667eea;">${Utils.escapeHTML(f.medicationName||"")}</span>
                    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">\u0627\u0644\u0643\u0645\u064A\u0629: ${f.quantity||1}</span>
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
                                ${e.personType==="employee"&&(e.employeeCode||e.employeeNumber)?`
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-id-card"></i>
                                        \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(e.employeeCode||e.employeeNumber||"")}</p>
                                </div>
                                `:""}
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-user"></i>
                                        ${s}
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(n)}</p>
                                </div>
                                ${e.personType==="employee"&&e.employeePosition?`
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #667eea;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-briefcase"></i>
                                        \u0627\u0644\u0648\u0638\u064A\u0641\u0629
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(e.employeePosition)}</p>
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
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Utils.escapeHTML(e.contractorWorkerName)}</p>
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
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${e.visitDate?Utils.escapeHTML(Utils.formatDateTime(e.visitDate)):"-"}</p>
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
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${Clinic.calculateTotalTime(e.visitDate,e.exitDate)}</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #fc6c85;">
                                    <span style="display: flex; align-items: center; gap: 8px; color: #fc6c85; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                                        <i class="fas fa-user-check"></i>
                                        \u062A\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629
                                    </span>
                                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${(()=>{if(!e.createdBy)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(typeof e.createdBy=="object")return Utils.escapeHTML(e.createdBy.name||e.createdBy.email||e.createdBy.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const f=String(e.createdBy).trim();if(f==="\u0627\u0644\u0646\u0638\u0627\u0645"||f===""){const p=(e.email||"").toString().trim();if(p&&p!=="")return Utils.escapeHTML(p);const m=(AppState.currentUser?.email||"").toString().trim();return m&&m!==""?Utils.escapeHTML(m):"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}return Utils.escapeHTML(f)})()}</p>
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
                                        \u0627\u0644\u0639\u0644\u0627\u062C / \u0627\u0644\u0625\u062C\u0631\u0627\u0621
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
                    <button class="btn-primary" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px 0 rgba(102, 126, 234, 0.4);" onclick="Clinic.showVisitForm(${JSON.stringify(e).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
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
        `,document.body.appendChild(d),d.addEventListener("click",f=>{f.target===d&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&d.remove()})},printVisitsList(){const t=AppState.appData.clinicVisits.slice().reverse();if(t.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629");return}const a=`
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
                        ${t.map(n=>{const i=n.employeeCode||n.employeeNumber||"-",o=n.employeeName||n.contractorName||n.externalName||"",l=n.contractorWorkerName?` (${n.contractorWorkerName})`:"",r=n.employeePosition||"-",c=n.employeeLocation||n.workArea||"-",d=n.visitDate?Utils.formatDateTime(n.visitDate):"-",f=n.exitDate?Utils.formatDateTime(n.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",p=Clinic.calculateTotalTime(n.visitDate,n.exitDate),m=n.reason||"",u=n.diagnosis||"",g=n.treatment||"";return`
                <tr>
                    <td>${i}</td>
                    <td>${o}${l}</td>
                    <td>${r}</td>
                    <td>${c}</td>
                    <td>${d}</td>
                    <td>${f}</td>
                    <td>${p}</td>
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
        `,s=window.open("","_blank");s&&(s.document.write(a),s.document.close(),s.onload=()=>{setTimeout(()=>{s.print(),Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629")},250)})},exportVisitsToExcel(){this.ensureData();const t=this.state.activeVisitType||"employees",e=t==="contractors",a=(AppState.appData.clinicVisits||[]).slice().reverse(),s=a.filter(o=>o.personType==="employee"||!o.personType),n=a.filter(o=>o.personType==="contractor"),i=t==="employees"?s:n;if(i.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}try{const o=i.map(d=>{const f=e?d.contractorName||d.employeeName||d.externalName||"-":d.employeeCode||d.employeeNumber||"-",p=e?d.contractorWorkerName||"-":d.employeeName||"-",m=d.employeePosition||d.contractorPosition||"-",u=this.getVisitFactoryDisplayName(d),g=e?d.workArea||d.employeeLocation||"-":d.employeeLocation||d.workArea||"-",y=d.visitDate?Utils.formatDateTime(d.visitDate):"-",v=d.exitDate?Utils.formatDateTime(d.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",S=this.calculateTotalTime(d.visitDate,d.exitDate),L=d.reason||"",M=d.diagnosis||"",E=this.normalizeVisitMedications(d.medications),h=E.length>0?E.map(j=>`${j.medicationName||""} (${j.quantity||1})`).join("\u060C "):"-",I=E.length>0?E.reduce((j,w)=>j+(parseInt(w.quantity,10)||0),0):0,C={};return C[e?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"]=f,C.\u0627\u0644\u0627\u0633\u0645=p,C.\u0627\u0644\u0648\u0638\u064A\u0641\u0629=m,C.\u0627\u0644\u0645\u0635\u0646\u0639=u,C["\u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644"]=g,C["\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644"]=y,C["\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C"]=v,C["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A"]=S,C["\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"]=L,C.\u0627\u0644\u062A\u0634\u062E\u064A\u0635=M,C["\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629"]=h,C["\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629"]=I,C}),l=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(o);r["!cols"]=[{wch:18},{wch:25},{wch:20},{wch:16},{wch:20},{wch:20},{wch:20},{wch:15},{wch:25},{wch:25},{wch:30},{wch:14}],XLSX.utils.book_append_sheet(l,r,`\u0633\u062C\u0644\u0627\u062A_${e?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"}`);const c=`\u0633\u062C\u0644\u0627\u062A_\u0627\u0644\u0632\u064A\u0627\u0631\u0629_${e?"\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646":"\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"}_\u0627\u0644\u0639\u064A\u0627\u062F\u0629_\u0627\u0644\u0637\u0628\u064A\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(l,c),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",o),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+o.message)}},async exportVisitsToPDF(){this.ensureData();const t=this.state.activeVisitType||"employees",e=t==="contractors",a=(AppState.appData.clinicVisits||[]).slice().reverse(),s=a.filter(o=>o.personType==="employee"||!o.personType),n=a.filter(o=>o.personType==="contractor"),i=t==="employees"?s:n;if(i.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{const o=i.map(u=>{const g=e?u.contractorName||u.employeeName||u.externalName||"-":u.employeeCode||u.employeeNumber||"-",y=e?u.contractorWorkerName||"-":u.employeeName||"-",v=e?u.contractorPosition||u.employeePosition||"-":u.employeePosition||"-",S=this.getVisitFactoryDisplayName(u),L=e?u.workArea||u.employeeLocation||"-":u.employeeLocation||u.workArea||"-",M=u.visitDate?Utils.formatDateTime(u.visitDate):"-",E=u.exitDate?Utils.formatDateTime(u.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",h=Clinic.calculateTotalTime(u.visitDate,u.exitDate),I=u.reason||"",C=u.diagnosis||"",j=this.normalizeVisitMedications(u.medications),w=j.length>0?j.map(A=>`${Utils.escapeHTML(A.medicationName||"")} (${A.quantity||1})`).join("\u060C "):"-",x=j.length>0?j.reduce((A,b)=>A+(parseInt(b.quantity,10)||0),0):0;return`
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(g)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(y)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(v)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(S)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(L)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(M)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(E)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(h)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(I)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">${Utils.escapeHTML(C)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-size: 9px;">${w}</td>
                        <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: bold;">${Utils.escapeHTML(String(x))}</td>
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
                            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: bold;">${e?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A"}</th>
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
            `,d=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(l,r,c,!1,!0,{source:"ClinicVisits"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${r}</title></head><body>${c}</body></html>`,f=new Blob([d],{type:"text/html;charset=utf-8"}),p=URL.createObjectURL(f),m=window.open(p,"_blank");m?m.onload=()=>{setTimeout(()=>{m.print(),setTimeout(()=>{URL.revokeObjectURL(p)},1e3),Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(p),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(o){URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",o),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+o.message)}},async exportVisitToPDF(t){if(!t){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{const e=t.personType==="employee"?"\u0645\u0648\u0638\u0641":t.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",a=t.employeeCode||t.employeeNumber||"-",s=t.employeeName||t.contractorName||t.externalName||"",n=t.contractorWorkerName?` (${t.contractorWorkerName})`:"",i=t.employeePosition||t.contractorPosition||"-",o=t.employeeLocation||t.workArea||"-",l=t.visitDate?Utils.formatDateTime(t.visitDate):"-",r=t.exitDate?Utils.formatDateTime(t.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647",c=this.calculateTotalTime(t.visitDate,t.exitDate),d=t.reason||"",f=t.diagnosis||"",p=t.treatment||"",m=t.medications&&Array.isArray(t.medications)&&t.medications.length>0?t.medications.map(E=>`${Utils.escapeHTML(E.medicationName||"")} (${E.quantity||1})`).join("\u060C "):"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629",u=`CLINIC-VISIT-${t.id||new Date().toISOString().slice(0,10)}`,g="\u062A\u0642\u0631\u064A\u0631 \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629",y=`
                <div style="margin-bottom: 20px;">
                    <h2 style="text-align: center; color: #1f2937; margin-bottom: 15px;">\u062A\u0642\u0631\u064A\u0631 \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px;">
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6; width: 30%;">\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; width: 70%;">${Utils.escapeHTML(e)}</td>
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
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(d)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u062A\u0634\u062E\u064A\u0635</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(f)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0639\u0644\u0627\u062C / \u0627\u0644\u0625\u062C\u0631\u0627\u0621</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${Utils.escapeHTML(p)}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: bold; background-color: #f3f4f6;">\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629</td>
                        <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">${m}</td>
                    </tr>
                </table>
            `,v=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(u,g,y,!1,!0,{source:"ClinicVisit"},t.visitDate||t.createdAt||new Date().toISOString(),t.updatedAt||t.createdAt||new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${g}</title></head><body>${y}</body></html>`,S=new Blob([v],{type:"text/html;charset=utf-8"}),L=URL.createObjectURL(S),M=window.open(L,"_blank");M?M.onload=()=>{setTimeout(()=>{M.print(),setTimeout(()=>{URL.revokeObjectURL(L)},1e3),Notification.success("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(L),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(e){URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:",e),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: "+e.message)}},async ensureApprovalsDataLoaded({force:t=!1}={}){return this._approvalsLoadPromise&&!t?this._approvalsLoadPromise:(this._approvalsLoadPromise=(async()=>{if(!(AppState?.googleConfig?.appsScript?.enabled&&AppState?.googleConfig?.appsScript?.scriptUrl)||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest){this._approvalsBackendFetchOk=!0;return}const a=GoogleIntegration.sendRequest({action:"getAllMedicationDeletionRequests",data:{filters:{}}}),s=GoogleIntegration.sendRequest({action:"getAllSupplyRequests",data:{filters:{}}}),n=GoogleIntegration.sendRequest({action:"getAllClinicVisitDeletionRequests",data:{filters:{}}}),i=GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{filters:{}}}),[o,l,r,c]=await Promise.allSettled([Utils.promiseWithTimeout(a,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u062D\u0630\u0641 \u0627\u0644\u0623\u062F\u0648\u064A\u0629"),Utils.promiseWithTimeout(s,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C"),Utils.promiseWithTimeout(n,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A"),Utils.promiseWithTimeout(i,15e3,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A")]),d=o.status==="fulfilled"?o.value:null,f=l.status==="fulfilled"?l.value:null,p=r.status==="fulfilled"?r.value:null,m=c.status==="fulfilled"?c.value:null,u=Array.isArray(d?.data)?d.data:[],g=Array.isArray(f?.data)?f.data:[],y=Array.isArray(p?.data)?p.data:[],v=Array.isArray(m?.data)?m.data:[];(u.length>0||!(Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)&&AppState.appData.clinicMedicationDeletionRequests.length>0))&&(AppState.appData.clinicMedicationDeletionRequests=u),(g.length>0||!(Array.isArray(AppState.appData?.clinicSupplyRequests)&&AppState.appData.clinicSupplyRequests.length>0))&&(AppState.appData.clinicSupplyRequests=g),(y.length>0||!(Array.isArray(AppState.appData?.clinicVisitDeletionRequests)&&AppState.appData.clinicVisitDeletionRequests.length>0))&&(AppState.appData.clinicVisitDeletionRequests=y),(v.length>0||!(Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)&&AppState.appData.clinicStaffTimeOffRequests.length>0)||c.status==="fulfilled"&&m&&m.success!==!1)&&(AppState.appData.clinicStaffTimeOffRequests=v);try{localStorage.setItem("clinic_approvals_last_sync",String(Date.now()))}catch{}if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch(S){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic approvals: \u0641\u0634\u0644 DataManager.save \u0628\u0639\u062F \u062C\u0644\u0628 \u0627\u0644\u0640 approvals:",S)}this._approvalsBackendFetchOk=!0})().finally(()=>{this._approvalsLoadPromise=null}),this._approvalsLoadPromise)},async renderApprovalsTab(){const t=document.querySelector('.clinic-tab-panel[data-tab-panel="approvals"]');if(!t){Utils.safeError("\u274C \u0644\u0648\u062D\u0629 approvals \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!this.isCurrentUserAdmin()){t.innerHTML='<div class="text-center py-8 text-gray-500">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</div>';return}t.innerHTML='<div class="text-center py-8"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p class="mt-2">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0636\u064A\u0631...</p></div>';try{const e=(()=>{try{return localStorage.getItem("clinic_approvals_last_sync")}catch{return null}})(),a=e?Date.now()-parseInt(e,10):1/0,s=300*1e3,n=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)&&AppState.appData.clinicMedicationDeletionRequests.length>0,i=Array.isArray(AppState.appData?.clinicSupplyRequests)&&AppState.appData.clinicSupplyRequests.length>0,o=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)&&AppState.appData.clinicVisitDeletionRequests.length>0,l=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)&&AppState.appData.clinicStaffTimeOffRequests.length>0,r=n||i||o||l,c=a>=s;if(!c&&r&&(this._approvalsBackendFetchOk=!0),(c||!r||this._approvalsBackendFetchOk!==!0||!l)&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const x=async()=>{await this.ensureApprovalsDataLoaded({force:c&&r})};r?x().then(()=>{try{this.state&&this.state.activeTab==="approvals"&&this.renderApprovalsTab()}catch{}}).catch(()=>{}):await Promise.race([x(),new Promise(A=>setTimeout(A,6e3))])}const f=Array.isArray(AppState.appData?.clinicMedicationDeletionRequests)?AppState.appData.clinicMedicationDeletionRequests:[],p=Array.isArray(AppState.appData?.clinicSupplyRequests)?AppState.appData.clinicSupplyRequests:[],m=Array.isArray(AppState.appData?.clinicVisitDeletionRequests)?AppState.appData.clinicVisitDeletionRequests:[],u=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[],g=f.map(x=>({...x,requestType:"deletion"})),y=p.map(x=>({...x,requestType:"supply"})),v=m.map(x=>({...x,requestType:"visit"})),S=u.map(x=>({...x,approvalKind:"timeoff"})),L=[...g,...y,...v,...S];Utils.safeLog(`\u{1F4CB} \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${g.length} \u0637\u0644\u0628 \u062D\u0630\u0641 \u062F\u0648\u0627\u0621 \u0648 ${y.length} \u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C \u0648 ${v.length} \u0637\u0644\u0628 \u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629 \u0648 ${S.length} \u0637\u0644\u0628 \u0625\u062C\u0627\u0632\u0629/\u0625\u0630\u0646/\u0625\u0636\u0627\u0641\u064A`);const M=L.filter(x=>x.status==="pending"),E=L.filter(x=>x.status==="approved"),h=L.filter(x=>x.status==="rejected"),I=document.getElementById("pending-approvals-badge");if(I){const x=M.length;x>0?(I.textContent=x,I.style.display="inline-block"):I.style.display="none"}t.innerHTML=`
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
                                <p class="text-2xl font-bold">${M.length}</p>
                            </div>
                            <div class="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                                <i class="fas fa-check text-3xl text-green-600 mb-2"></i>
                                <p class="text-sm text-gray-600">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627</p>
                                <p class="text-2xl font-bold">${E.length}</p>
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
                            ${this.renderApprovalsTable(M)}
                        </div>
                    </div>
                </div>
            `;const C=document.getElementById("approvals-status-filter"),j=document.getElementById("approvals-type-filter"),w=()=>{const x=C?.value||"all",A=j?.value||"all";let b=L;x!=="all"&&(b=b.filter(q=>q.status===x)),A!=="all"&&(b=b.filter(q=>this._approvalRequestMatchesTypeFilter(q,A)));const U=document.getElementById("approvals-table-container");U&&(U.innerHTML=this.renderApprovalsTable(b),this.bindApprovalsEvents())};C&&C.addEventListener("change",w),j&&j.addEventListener("change",w),this.bindApprovalsEvents(),setTimeout(()=>{const x=t.querySelector(".clinic-table-wrapper");x&&this.setupTableScrollListeners(x)},100)}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:",e),t.innerHTML='<div class="alert alert-error">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</div>'}},renderApprovalsTable(t){return!t||t.length===0?'<div class="text-center py-8 text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</div>':`
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
                        ${t.map(a=>{const s=a.approvalKind||a.requestType||"deletion",n=s==="deletion",i=s==="supply",o=s==="visit",l=this._isApprovalTimeOffRequest(a);let r="-",c="-",d="";if(n){const g=a.medicationData||{};r=g.name||"-",c=g.type||"-",d=`\u0627\u0644\u062F\u0648\u0627\u0621: ${Utils.escapeHTML(r)}`}else if(i){r=a.itemName||"-";const g={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[a.type]||a.type||"-";c=g,d=`${g}: ${Utils.escapeHTML(r)} (${a.quantity||""} ${Utils.escapeHTML(a.unit||"")})`}else if(o){const g=a.visitData||{},y=g.employeeName||g.contractorWorkerName||g.contractorName||g.externalName||"-",v=g.personType==="employee"?"\u0645\u0648\u0638\u0641":g.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629";r=y,c=v,d=`\u0632\u064A\u0627\u0631\u0629: ${Utils.escapeHTML(y)} (${Utils.escapeHTML(v)})`}else l&&(r=a.userName||a.userEmail||"-",c=this.getTimeOffRequestTypeLabel(a.requestType),d=`${Utils.escapeHTML(c)}: ${Utils.escapeHTML(this.formatTimeOffRequestDetails(a))}`);const f=l?{name:a.userName||a.userEmail||"-"}:a.requestedBy||{},p=this.getApprovalStatusBadge(a.status),m=a.status==="pending";return`
                <tr>
                    <td>${n?'<span class="badge badge-info">\u062D\u0630\u0641 \u062F\u0648\u0627\u0621</span>':i?'<span class="badge badge-primary">\u0637\u0644\u0628 \u0627\u062D\u062A\u064A\u0627\u062C</span>':l?'<span class="badge badge-success">\u0625\u062C\u0627\u0632\u0629/\u0625\u0630\u0646/\u0625\u0636\u0627\u0641\u064A</span>':'<span class="badge badge-warning">\u062D\u0630\u0641 \u0632\u064A\u0627\u0631\u0629</span>'}</td>
                    <td>${Utils.escapeHTML(r)}</td>
                    <td>${Utils.escapeHTML(c)}</td>
                    <td>${Utils.escapeHTML(f.name||"-")}</td>
                    <td>${this.formatDate(a.createdAt||a.requestDate,!0)}</td>
                    <td>${p}</td>
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
        `},getApprovalStatusBadge(t){switch(t){case"pending":return'<span class="badge badge-warning">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>';case"approved":return'<span class="badge badge-success">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>';case"rejected":return'<span class="badge badge-danger">\u0645\u0631\u0641\u0648\u0636</span>';default:return'<span class="badge badge-secondary">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>'}},bindApprovalsEvents(){document.querySelectorAll('[data-action="approve-request"]').forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-id"),a=t.getAttribute("data-type")||"deletion";this.approveRequest(e,a)})}),document.querySelectorAll('[data-action="reject-request"]').forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-id"),a=t.getAttribute("data-type")||"deletion";this.rejectRequest(e,a)})}),document.querySelectorAll('[data-action="view-request"]').forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-id"),a=t.getAttribute("data-type")||"deletion";this.viewRequestDetails(e,a)})})},async approveRequest(t,e="deletion"){const a=e==="deletion",s=e==="supply",n=e==="visit",i=e==="timeoff";if(confirm(a?`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062F\u0648\u0627\u0621\u061F

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645.`:s?"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F":i?"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A\u061F":`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0632\u064A\u0627\u0631\u0629\u061F

\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F.`)){Loading.show();try{const r={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};let c;if(a?c=await GoogleIntegration.sendRequest({action:"approveMedicationDeletion",data:{requestId:t,approverData:r}}):s?c=await GoogleIntegration.sendRequest({action:"approveSupplyRequest",data:{requestId:t,approverData:r}}):n?c=await GoogleIntegration.sendRequest({action:"approveClinicVisitDeletion",data:{requestId:t,approverData:r}}):i&&(c=await GoogleIntegration.sendRequest({action:"approveClinicStaffTimeOffRequest",data:{requestId:t,notes:""}})),c&&c.success){Loading.hide();const d=a?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0648\u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0627\u0621 \u0628\u0646\u062C\u0627\u062D":s?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D":i?"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629/\u0627\u0644\u0625\u0630\u0646/\u0627\u0644\u0625\u0636\u0627\u0641\u064A":"\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D";if(Notification.success(d),i)try{const f=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});f?.success&&Array.isArray(f.data)&&(AppState.appData.clinicStaffTimeOffRequests=f.data),this._leaveBalancesFetchedInSession=!1,await this.loadClinicStaffLeaveBalances(!0),this._leaveBalancesFetchedInSession=!0}catch{}setTimeout(()=>{this.renderApprovalsTab()},100),a&&(async()=>{try{const f=await GoogleIntegration.sendRequest({action:"getAllMedications",data:{}});f&&f.success&&(AppState.appData.medications=f.data,AppState.appData.clinicMedications=f.data,AppState.appData.clinicInventory=f.data,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}catch(f){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",f)}})()}else throw new Error(c.message||"\u0641\u0634\u0644\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0629")}catch(r){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628:",r),Notification.error("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629: "+(r.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}}},async rejectRequest(t,e="deletion"){const a=prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):");if(a!==null){Loading.show();try{const s={id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||"",email:AppState.currentUser?.email||"",role:AppState.currentUser?.role||""};let n;if(e==="deletion"?n=await GoogleIntegration.sendRequest({action:"rejectMedicationDeletion",data:{requestId:t,rejectorData:s,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):e==="supply"?n=await GoogleIntegration.sendRequest({action:"rejectSupplyRequest",data:{requestId:t,rejectorData:s,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):e==="visit"?n=await GoogleIntegration.sendRequest({action:"rejectClinicVisitDeletion",data:{requestId:t,rejectorData:s,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}}):e==="timeoff"&&(n=await GoogleIntegration.sendRequest({action:"rejectClinicStaffTimeOffRequest",data:{requestId:t,reason:a||"\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0633\u0628\u0628"}})),n&&n.success){if(Loading.hide(),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),e==="timeoff")try{const i=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});i?.success&&Array.isArray(i.data)&&(AppState.appData.clinicStaffTimeOffRequests=i.data)}catch{}setTimeout(()=>{this.renderApprovalsTab()},100)}else throw new Error(n.message||"\u0641\u0634\u0644\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0629")}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628:",s),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0631\u0641\u0636: "+(s.message||"\u062D\u062F\u062B \u062E\u0637\u0623"))}}},async viewRequestDetails(t,e="deletion"){try{let a;if(e==="deletion"?a=await GoogleIntegration.sendRequest({action:"getAllMedicationDeletionRequests",data:{filters:{}}}):e==="supply"?a=await GoogleIntegration.sendRequest({action:"getAllSupplyRequests",data:{filters:{}}}):e==="visit"?a=await GoogleIntegration.sendRequest({action:"getAllClinicVisitDeletionRequests",data:{filters:{}}}):e==="timeoff"&&(a=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{filters:{}}})),!a||!a.success){Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628");return}const s=a.data.find(p=>p.id===t);if(!s){Notification.error("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const n=e==="deletion",i=e==="visit",o=e==="timeoff",l=o?{name:s.userName||s.userEmail||"-"}:s.requestedBy||{},r=s.approvedBy||{},c=s.rejectedBy||{};let d="";if(n){const p=s.medicationData||{};d=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062F\u0648\u0627\u0621:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0627\u0644\u0627\u0633\u0645:</strong> ${Utils.escapeHTML(p.name||"-")}</div>
                            <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(p.type||"-")}</div>
                            <div><strong>\u0627\u0644\u0643\u0645\u064A\u0629:</strong> ${Utils.escapeHTML(p.quantity||"-")}</div>
                            <div><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(p.location||"-")}</div>
                        </div>
                    </div>
                `}else if(i){const p=s.visitData||{},m=p.employeeName||p.contractorWorkerName||p.contractorName||p.externalName||"-",u=p.personType==="employee"?"\u0645\u0648\u0638\u0641":p.personType==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629",g=p.visitDate?Utils.formatDateTime(p.visitDate):"-",y=p.exitDate?Utils.formatDateTime(p.exitDate):"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644\u0647";d=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0627\u0644\u0627\u0633\u0645:</strong> ${Utils.escapeHTML(m)}</div>
                            <div><strong>\u0627\u0644\u0646\u0648\u0639:</strong> ${Utils.escapeHTML(u)}</div>
                            <div><strong>\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:</strong> ${Utils.escapeHTML(g)}</div>
                            <div><strong>\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:</strong> ${Utils.escapeHTML(y)}</div>
                            <div><strong>\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629:</strong> ${Utils.escapeHTML(p.reason||"-")}</div>
                            <div><strong>\u0627\u0644\u062A\u0634\u062E\u064A\u0635:</strong> ${Utils.escapeHTML(p.diagnosis||"-")}</div>
                        </div>
                        <div class="mt-3">
                            <button class="btn-secondary" onclick="Clinic.viewVisit('${Utils.escapeHTML(p.id||s.visitId||"")}')">
                                <i class="fas fa-eye ml-2"></i>\u0639\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629
                            </button>
                        </div>
                    </div>
                `}else if(o)d=`
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
                `;else{const p={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[s.type]||s.type||"-",m={urgent:"\u0639\u0627\u062C\u0644\u0629",high:"\u0639\u0627\u0644\u064A\u0629",normal:"\u0639\u0627\u062F\u064A\u0629"}[s.priority]||"\u0639\u0627\u062F\u064A\u0629";d=`
                    <div>
                        <h3 class="font-semibold text-lg mb-2">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0637\u0644\u0628:</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <div><strong>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628:</strong> ${Utils.escapeHTML(p)}</div>
                            <div><strong>\u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631:</strong> ${Utils.escapeHTML(s.itemName||"-")}</div>
                            <div><strong>\u0627\u0644\u0643\u0645\u064A\u0629:</strong> ${s.quantity||"-"} ${Utils.escapeHTML(s.unit||"")}</div>
                            <div><strong>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:</strong> ${Utils.escapeHTML(m)}</div>
                            ${s.notes?`
                                <div class="col-span-2"><strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong> ${Utils.escapeHTML(s.notes)}</div>
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
                            ${d}
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
            `,document.body.appendChild(f),f.querySelectorAll(".modal-close, .modal-close-btn").forEach(p=>{p.addEventListener("click",()=>f.remove())}),f.addEventListener("click",p=>{p.target===f&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&f.remove()})}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628:",a),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644")}},refreshOnLanguageChange(){if(this.state&&this.state.initialized)try{this.renderActiveTabContent()}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u0639\u0631\u0636 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0644\u063A\u0629:",t)}},async load(){typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629...");const t=document.getElementById("clinic-section");if(!t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u0642\u0633\u0645 clinic-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0644\u0635\u0641\u062D\u0629");return}if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C AppState \u063A\u064A\u0631 \u0645\u0639\u0631\u0651\u0641 - \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629"),t.innerHTML='<div class="content-card"><div class="card-body"><p class="text-red-600">\u0644\u0645 \u064A\u062A\u0645 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.</p></div></div>';return}if(AppState.appData||(AppState.appData={}),typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{Permissions.ensureFormSettingsState().catch(()=>{})}catch{}this.injectTableScrollbarStyles(),this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.refreshOnLanguageChange()}),window.addEventListener("storage",e=>{e.key==="language"&&e.newValue!==e.oldValue&&this.refreshOnLanguageChange()}),this._languageChangeListenerAdded=!0),this._syncCompletedListenerAdded||(window.addEventListener("syncDataCompleted",e=>{const{sheets:a}=e.detail||{};a&&(a.includes("ClinicVisits")||a.includes("ClinicContractorVisits")||a.includes("clinicVisits"))&&(this.ensureData(),this.state&&this.state.activeTab==="visits"&&(this.scheduleVisitsTabRender(!1,0),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629")))}),this._syncCompletedListenerAdded=!0);try{this.ensureData();const e=localStorage.getItem("clinic_last_sync"),a=e?Date.now()-parseInt(e):1/0,s=600*1e3,n=this.hasValidLocalData(),i=!this.state.initialized;this.renderUI(),this._userNeedsClinicStaffForAttendance()&&!this.isActiveClinicStaffMember()&&this._ensureClinicStaffLoadedForAttendance().then(l=>{l&&this._refreshAttendanceTabNavAfterStaffLoad()}).catch(()=>{}),this.isCurrentUserAdmin()&&this.prefetchClinicAttendanceForAdminIfNeeded(!1).catch(()=>{}),i||!n||a>=s?(Utils.safeLog("\u{1F504} \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629)..."),Utils.promiseWithTimeout(this.syncDataFromServer(),13e4,"\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A").then(()=>{if(localStorage.setItem("clinic_last_sync",Date.now().toString()),this.ensureData(),this.renderUI(),this.state&&this.state.activeTab==="visits"&&this.scheduleVisitsTabRender(!1,0),this.state?.activeTab==="attendance"&&this.canAccessAttendanceTab()&&this.scheduleAttendanceTabRender(0),typeof Utils<"u"&&Utils.safeLog&&AppState.appData){const l=(AppState.appData.clinicVisits||[]).length,r=(AppState.appData.clinicMedications||AppState.appData.medications||[]).length;Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0628\u0646\u062C\u0627\u062D: ${l} \u0632\u064A\u0627\u0631\u0629\u060C ${r} \u062F\u0648\u0627\u0621`)}}).catch(l=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u0639\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",l&&l.message)}).finally(()=>{this.state.initialized=!0})):(Utils.safeLog("\u2705 \u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u062D\u0644\u064A\u0627\u064B - \u062A\u062D\u062F\u064A\u062B \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629"),this.syncDataInBackground(),this.state.initialized=!0)}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629:",e),this.hasValidLocalData()&&(this.renderUI(),Utils.safeLog("\u2705 \u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0631\u063A\u0645 \u0648\u062C\u0648\u062F \u062E\u0637\u0623")),this.state.initialized||Notification?.error?.("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629")}finally{Loading.hide()}},hasValidLocalData(){const t=AppState.appData;if(!t)return!1;const e=t.medications||t.clinicMedications||[],a=t.sickLeave||[],s=t.injuries||[],n=t.clinicVisits||[];return e.length>0||a.length>0||s.length>0||n.length>0},async syncDataFromServer(){const t=[],s=(n,i,o)=>Utils.promiseWithTimeout(n,i,()=>new Error(`Request timeout for ${o}`));t.push(s(GoogleIntegration.sendRequest({action:"getAllMedications",data:{}}),45e3,"medications").then(n=>{if(n&&n.success&&Array.isArray(n.data)){const i=n.data.map(o=>this.normalizeMedicationRecord(o));AppState.appData.medications=i,AppState.appData.clinicMedications=i,AppState.appData.clinicInventory=i,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${n.data.length} \u062F\u0648\u0627\u0621`)}}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629:",n.message)})),t.push(s(GoogleIntegration.sendRequest({action:"getAllSickLeaves",data:{}}),45e3,"sickLeave").then(n=>{n&&n.success&&Array.isArray(n.data)&&(AppState.appData.sickLeave=n.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${n.data.length} \u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629`))}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629:",n.message)})),t.push(s(GoogleIntegration.sendRequest({action:"getAllInjuries",data:{}}),45e3,"injuries").then(n=>{n&&n.success&&Array.isArray(n.data)&&(AppState.appData.injuries=n.data,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${n.data.length} \u0625\u0635\u0627\u0628\u0629`))}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A:",n.message)})),this.shouldFetchClinicVisitsFromBackend()?t.push(s(this.loadVisitsDataFromBackend(),12e4,"clinicVisits").then(()=>{const n=AppState.appData.clinicVisits||[];Utils.safeLog(`\u2705 \u0645\u0632\u0627\u0645\u0646\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F: ${n.length} \u0632\u064A\u0627\u0631\u0629 (${n.filter(i=>i.personType==="employee"||!i.personType).length} \u0645\u0648\u0638\u0641\u060C ${n.filter(i=>i.personType==="contractor").length} \u0645\u0642\u0627\u0648\u0644)`)}).catch(n=>{AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F:",n.message)})):AppState.debugMode&&Utils.safeLog("\u2139\uFE0F \u062A\u062E\u0637\u064A \u062C\u0644\u0628 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u2014 \u0628\u064A\u0627\u0646\u0627\u062A \u062D\u062F\u064A\u062B\u0629 \u0648\u0645\u0624\u0643\u062F\u0629 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645");try{await Promise.allSettled(t)}catch(n){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",n.message)}if(typeof window.DataManager<"u"&&window.DataManager.save)try{this.ensureData(),window.DataManager.save(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0628\u0639\u062F syncDataFromServer")}catch(n){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",n.message)}},async syncDataInBackground(){try{Utils.safeLog("\u{1F504} \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629..."),await Utils.promiseWithTimeout(this.syncDataFromServer(),13e4,()=>new Error("Background sync timeout")),localStorage.setItem("clinic_last_sync",Date.now().toString()),this.ensureData(),this.hasValidLocalData()&&(this.renderUI(),this.state&&this.state.activeTab==="visits"&&this.scheduleVisitsTabRender(!1,0),this.state&&this.state.activeTab==="attendance"&&this.renderAttendanceTab(),Utils.safeLog("\u2705 \u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629"))}catch(t){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",t.message),Utils.safeLog("\u2139\uFE0F \u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629")}},async refresh(){Utils.safeLog("\u{1F504} \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u064A\u0627\u062F\u0629..."),Notification?.info?.("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A..."),await this.load(),Notification?.success?.("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},getClinicStaffList(){return this.ensureData(),Array.isArray(AppState.appData.clinicStaff)?AppState.appData.clinicStaff:[]},getClinicStaffAttendanceList(){this.ensureData();let t=Array.isArray(AppState.appData.clinicStaffAttendance)?AppState.appData.clinicStaffAttendance:[];return t=this._mergeAttendanceRowsByUserDay(t),this.canViewAllAttendanceData()||(t=t.filter(e=>this._attendanceRowBelongsToCurrentUser_(e))),t},getClinicStaffTimeOffRequestsList(){this.ensureData();let t=Array.isArray(AppState.appData.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[];if(!this.canViewAllAttendanceData()){const e=AppState.currentUser,a=String(e?.id||"").trim(),s=String(e?.email||"").trim().toLowerCase();t=t.filter(n=>a&&String(n.userId||"")===a||s&&String(n.userEmail||"").trim().toLowerCase()===s)}return t},getClinicStaffSystemActivitiesList(){return this.ensureData(),Array.isArray(AppState.appData.clinicStaffSystemActivities)?AppState.appData.clinicStaffSystemActivities:[]},getFilteredClinicStaffActivities(){let t=this.getClinicStaffSystemActivitiesList().slice();const e=this.state.filters?.attendance||{},a=this._resolveAttendanceFilterDates(e);if(a.dateFrom&&(t=t.filter(s=>s.timestamp&&this._attendanceDayKey(s.timestamp)>=a.dateFrom)),a.dateTo&&(t=t.filter(s=>s.timestamp&&this._attendanceDayKey(s.timestamp)<=a.dateTo)),e.activityModule&&e.activityModule!=="all"&&(t=t.filter(s=>String(s.moduleKey)===String(e.activityModule))),this.canViewAllAttendanceData()&&e.staffId&&e.staffId!=="all"){const s=(this.getClinicStaffList()||[]).find(n=>String(n.id)===String(e.staffId));if(s){const n=String(s.userId||"").trim(),i=String(s.userEmail||"").trim().toLowerCase(),o=String(s.userName||"").trim().toLowerCase();t=t.filter(l=>n&&String(l.userId||"")===n||i&&String(l.userEmail||"").trim().toLowerCase()===i||o&&String(l.userName||"").trim().toLowerCase()===o)}}return t.sort((s,n)=>new Date(n.timestamp||0)-new Date(s.timestamp||0))},getClinicStaffActivityModuleIcon(t){return{ptw:"fa-id-card",clinic:"fa-clinic-medical",training:"fa-chalkboard-teacher",incidents:"fa-exclamation-triangle",nearmiss:"fa-exclamation-circle",observations:"fa-eye",violations:"fa-gavel",system:"fa-cogs"}[String(t||"").trim()]||"fa-circle"},renderClinicStaffActivitiesSection({showUserColumn:t=!1,activities:e=[],loading:a=!1,title:s="\u0646\u0634\u0627\u0637\u064A \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645"}={}){const n=[{value:"all",label:"\u0643\u0644 \u0627\u0644\u0623\u0646\u0634\u0637\u0629"},{value:"ptw",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644"},{value:"clinic",label:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629"},{value:"training",label:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{value:"incidents",label:"\u0627\u0644\u062D\u0648\u0627\u062F\u062B"},{value:"nearmiss",label:"\u062D\u0627\u062F\u062B \u0648\u0634\u064A\u0643"},{value:"observations",label:"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"},{value:"violations",label:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A"},{value:"system",label:"\u0627\u0644\u0646\u0638\u0627\u0645"}],i=this.state.filters?.attendance?.activityModule||"all",o=a?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0634\u0627\u0637...":this._clinicStaffActivitiesFetched?"\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0634\u0637\u0629 \u0645\u0633\u062C\u0651\u0644\u0629 \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629":'\u0627\u0636\u063A\u0637 \u0632\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062B <i class="fas fa-sync-alt"></i> \u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0634\u0627\u0637 (\u0644\u0627 \u064A\u064F\u062D\u0645\u0651\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0641\u0627\u0638\u0627\u064B \u0639\u0644\u0649 \u0633\u0631\u0639\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u062F\u062F)',l=e.length?e.map(r=>`
            <tr>
                ${t?`<td>${Utils.escapeHTML(r.userName||r.userEmail||"\u2014")}</td>`:""}
                <td><span class="badge badge-info" style="white-space:nowrap;"><i class="fas ${this.getClinicStaffActivityModuleIcon(r.moduleKey)} ml-1"></i>${Utils.escapeHTML(r.moduleLabel||"\u2014")}</span></td>
                <td>${Utils.escapeHTML(r.actionLabel||"\u2014")}</td>
                <td class="text-sm">${Utils.escapeHTML(r.summary||"\u2014")}</td>
                <td>${r.timestamp?Utils.formatDateTime?Utils.formatDateTime(r.timestamp):Utils.escapeHTML(String(r.timestamp)):"\u2014"}</td>
            </tr>
        `).join(""):`<tr><td colspan="${t?5:4}" class="text-center text-gray-500 py-8">${o}</td></tr>`;return`
            <div class="content-card mt-4" id="clinic-staff-activities-section">
                <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
                    <h4 class="card-title" style="margin:0;"><i class="fas fa-history ml-2"></i>${Utils.escapeHTML(s)} (${e.length})</h4>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                        <select id="clinic-activity-module-filter" class="form-input" style="min-width:160px;padding:6px 10px;font-size:0.82rem;">
                            ${n.map(r=>`<option value="${Utils.escapeAttr(r.value)}" ${i===r.value?"selected":""}>${Utils.escapeHTML(r.label)}</option>`).join("")}
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
                            ${t?"<th>\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</th>":""}
                            <th>\u0627\u0644\u0642\u0633\u0645</th><th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621</th><th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                        </tr></thead>
                        <tbody>${l}</tbody>
                    </table>`)}
                </div>
            </div>`},bindClinicStaffActivitiesEvents(t){t&&(t.querySelector("#clinic-activity-module-filter")?.addEventListener("change",e=>{this.state.filters=this.state.filters||{},this.state.filters.attendance=Object.assign({},this.state.filters.attendance||{},{activityModule:e.target.value||"all"}),this.renderAttendanceTab({force:!0})}),t.querySelector("#clinic-activity-refresh-btn")?.addEventListener("click",async()=>{Notification?.info?.("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0634\u0627\u0637..."),await this.loadClinicStaffActivities(!0),this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0634\u0627\u0637")}))},_parseActivityCreatorFromRecord_(t){if(!t)return{userId:"",email:"",name:""};let e=String(t.createdById||t.userId||"").trim(),a=String(t.userEmail||"").trim().toLowerCase(),s=String(t.userName||"").trim();const n=t.createdBy;return n&&typeof n=="object"?(e=e||String(n.id||n.userId||"").trim(),s=s||String(n.name||n.displayName||"").trim(),a=a||String(n.email||"").trim().toLowerCase()):n&&(s=s||String(n).trim()),{userId:e,email:a,name:s}},_activityCreatorMatchesUser_(t,e){if(!t||!e)return!1;const a=String(e.id||"").trim(),s=String(e.email||"").trim().toLowerCase(),n=String(e.name||"").trim().toLowerCase();return!!(a&&t.userId&&a===t.userId||s&&t.email&&s===t.email||n&&t.name&&n===String(t.name).trim().toLowerCase())},_activityCreatorMatchesStaff_(t,e){if(!t||!e)return!1;const a=String(e.userId||"").trim(),s=String(e.userEmail||"").trim().toLowerCase(),n=String(e.userName||"").trim().toLowerCase();return!!(a&&t.userId&&a===t.userId||s&&t.email&&s===t.email||n&&t.name&&n===String(t.name).trim().toLowerCase())},_buildLocalClinicVisitActivities_(t){t=t||{};const e=Array.isArray(AppState.appData?.clinicVisits)?AppState.appData.clinicVisits:[],a=AppState.currentUser,s=this.canViewAllAttendanceData();let n=null;s&&t.staffId&&(n=(this.getClinicStaffList()||[]).find(r=>String(r.id)===String(t.staffId))||null);const i=t.dateFrom?this._attendanceDayKey(t.dateFrom):null,o=t.dateTo?this._attendanceDayKey(t.dateTo):null,l=t.moduleKey||"all";return l!=="all"&&l!=="clinic"?[]:e.filter(r=>{if(!r)return!1;const c=this._parseActivityCreatorFromRecord_(r);if(s){if(n&&!this._activityCreatorMatchesStaff_(c,n))return!1}else if(!this._activityCreatorMatchesUser_(c,a))return!1;const d=r.createdAt||r.visitDate||"";if(d){const f=this._attendanceDayKey(d);if(i&&f<i||o&&f>o)return!1}else if(i||o)return!1;return!0}).map(r=>{const c=r.personType==="contractor"||r.contractorName||r.contractorWorkerName||r.externalName,d=this._parseActivityCreatorFromRecord_(r),f=c?String(r.contractorWorkerName||r.externalName||r.contractorName||r.visitType||r.id||"").slice(0,120):String(r.employeeName||r.visitType||r.reason||r.id||"").slice(0,120);return{id:"local-visit-"+r.id,recordId:r.id||"",moduleKey:"clinic",moduleLabel:"\u0627\u0644\u0639\u064A\u0627\u062F\u0629",actionLabel:c?"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u0645\u0642\u0627\u0648\u0644/\u062E\u0627\u0631\u062C\u064A":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u0645\u0648\u0638\u0641",summary:f,timestamp:r.createdAt||r.visitDate||"",userId:d.userId||"",userEmail:d.email||"",userName:d.name||this.getUserDisplayName(r.createdBy)||"",sheet:"ClinicVisits-local"}})},_mergeClinicStaffActivities_(t){const e=new Map;return(t||[]).flat().forEach(a=>{!a||!a.id||e.has(a.id)||e.set(a.id,a)}),Array.from(e.values()).sort((a,s)=>new Date(s.timestamp||0)-new Date(a.timestamp||0))},_userNeedsClinicStaffForAttendance(){return this.isCurrentUserAdmin()||typeof Permissions>"u"||typeof Permissions.hasDetailedPermission!="function"?!1:Permissions.hasDetailedPermission("clinic","attendance")},async _ensureClinicStaffLoadedForAttendance(){return this._clinicStaffPreloadPromise?this._clinicStaffPreloadPromise:(this._clinicStaffPreloadPromise=(async()=>{try{if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return!1;const t=await GoogleIntegration.sendRequest({action:"getAllClinicStaff",data:{}});if(t?.success&&Array.isArray(t.data)&&(AppState.appData.clinicStaff=t.data,this.ensureData(),typeof window.DataManager<"u"&&window.DataManager.save))try{window.DataManager.save()}catch{}return this.canAccessAttendanceTab()}catch{return!1}finally{this._clinicStaffPreloadPromise=null}})(),this._clinicStaffPreloadPromise)},_refreshAttendanceTabNavAfterStaffLoad(){const t=document.getElementById("clinic-section");if(!t||!this.canAccessAttendanceTab())return;if(!t.querySelector('.clinic-tab-btn[data-tab="attendance"]')){this.renderUI();return}this.state?.activeTab==="attendance"&&this.scheduleAttendanceTabRender(0)},_getDefaultTimeOffFormDraft(){return{requestType:"",reason:"",dateFrom:"",dateTo:"",permDate:"",otDate:"",timeFrom:"",timeTo:"",durationHours:""}},_saveTimeOffFormDraftFromDom(){this.state||(this.state={}),document.getElementById("timeoff-request-form")&&(this.state.timeOffFormDraft={requestType:document.getElementById("timeoff-request-type")?.value||"",reason:document.getElementById("timeoff-reason")?.value||"",dateFrom:document.getElementById("timeoff-date-from")?.value||"",dateTo:document.getElementById("timeoff-date-to")?.value||"",permDate:document.getElementById("timeoff-perm-date")?.value||"",otDate:document.getElementById("timeoff-ot-date")?.value||"",timeFrom:document.getElementById("timeoff-time-from")?.value||"",timeTo:document.getElementById("timeoff-time-to")?.value||"",durationHours:document.getElementById("timeoff-duration-hours")?.value||""})},_applyTimeOffFormDraftToPanel(t){const e=this.state?.timeOffFormDraft;if(!e||!t)return;const a=(s,n)=>{const i=t.querySelector("#"+s);i&&n!=null&&n!==""&&(i.value=n)};a("timeoff-request-type",e.requestType),a("timeoff-reason",e.reason),a("timeoff-date-from",e.dateFrom),a("timeoff-date-to",e.dateTo),a("timeoff-perm-date",e.permDate),a("timeoff-ot-date",e.otDate),a("timeoff-time-from",e.timeFrom),a("timeoff-time-to",e.timeTo),a("timeoff-duration-hours",e.durationHours)},_isTimeOffFormDraftDirty(){const t=this.state?.timeOffFormDraft;return t?!!(t.requestType||String(t.reason||"").trim()||t.dateFrom||t.dateTo||t.permDate||t.otDate||t.timeFrom||t.timeTo||t.durationHours):!1},_shouldDeferAttendanceRender(){return this._timeOffFormSubmitting||this._timeOffFormFocused?!0:this._isTimeOffFormDraftDirty()},_flushDeferredAttendanceRender(){!this._attendanceRenderPending||this.state?.activeTab!=="attendance"||this._shouldDeferAttendanceRender()||(this._attendanceRenderPending=!1,this.renderAttendanceTab({force:!0}))},_bindTimeOffFormPanelEvents(t){const e=t.querySelector("#timeoff-request-form");if(!e)return;const a=t.querySelector("#timeoff-request-type"),s=t.querySelector("#timeoff-leave-dates"),n=t.querySelector("#timeoff-permission-fields"),i=t.querySelector("#timeoff-overtime-fields"),o=()=>{const r=a?.value||"";s?.classList.toggle("hidden",r!=="leave"),n?.classList.toggle("hidden",r!=="permission"),i?.classList.toggle("hidden",r!=="overtime")},l=()=>this._saveTimeOffFormDraftFromDom();a?.addEventListener("change",()=>{o(),l()}),e.querySelectorAll("input, textarea, select").forEach(r=>{r.addEventListener("input",l),r.addEventListener("change",l)}),e.addEventListener("focusin",()=>{this._timeOffFormFocused=!0}),e.addEventListener("focusout",()=>{setTimeout(()=>{e.contains(document.activeElement)||(this._timeOffFormFocused=!1,this._flushDeferredAttendanceRender())},120)}),o(),e.addEventListener("submit",r=>{r.preventDefault(),this.submitTimeOffRequest()})},_scheduleAttendanceDataLoadIfNeeded(t){if(this._attendanceDataLoadPromise)return;const e=Array.isArray(AppState.appData?.clinicStaff)&&AppState.appData.clinicStaff.length>0,a=Array.isArray(AppState.appData?.clinicStaffAttendance)&&AppState.appData.clinicStaffAttendance.length>0,s=this.canViewAllAttendanceData();if(!(!t&&this._attendanceDataFetchedInSession===!0&&(!s||e&&a))){if(!t&&!s&&e&&a){this._attendanceDataFetchedInSession=!0;return}this._attendanceDataLoadPromise=this.loadClinicAttendanceData(!!t).then(n=>{n&&(this._attendanceDataFetchedInSession=!0),this.state?.activeTab==="attendance"&&this.renderAttendanceTab({force:!0})}).catch(()=>{}).finally(()=>{this._attendanceDataLoadPromise=null})}},_isAttendanceDataLoading(){return!!this._attendanceDataLoadPromise},_renderAttendanceTableLoadingRow(t,e){const a=Utils.escapeHTML(e||"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");return`<tr><td colspan="${t}" class="text-center text-gray-500 py-10">
            <i class="fas fa-spinner fa-spin ml-2" style="color:#0d9488;"></i>${a}
        </td></tr>`},async loadClinicStaffActivities(t){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest||this.state?.activeTab&&this.state.activeTab!=="attendance")return;const e=Array.isArray(AppState.appData?.clinicStaffSystemActivities)&&AppState.appData.clinicStaffSystemActivities.length>0;if(!t&&e)return;if(this._clinicStaffActivitiesLoading=!0,this._clinicVisitsLoadPromise)try{await this._clinicVisitsLoadPromise}catch{}await new Promise(o=>setTimeout(o,800));const a=this.state.filters?.attendance||{},s=this._resolveAttendanceFilterDates(a),n={limit:200,dateFrom:s.dateFrom||"",dateTo:s.dateTo||"",moduleKey:a.activityModule&&a.activityModule!=="all"?a.activityModule:""};a.staffId&&a.staffId!=="all"&&this.canViewAllAttendanceData()&&(n.staffId=a.staffId);const i=this._buildLocalClinicVisitActivities_(n);try{const o=await GoogleIntegration.sendRequest({action:"getClinicStaffSystemActivities",data:{filters:n}}),l=o?.success&&Array.isArray(o.data)?o.data:[];AppState.appData.clinicStaffSystemActivities=this._mergeClinicStaffActivities_([i,l]).slice(0,n.limit||200),this._clinicStaffActivitiesFetched=!0}catch{i.length&&(AppState.appData.clinicStaffSystemActivities=i,this._clinicStaffActivitiesFetched=!0)}finally{this._clinicStaffActivitiesLoading=!1}},getCurrentUserStaffRecord(){const t=AppState.currentUser;if(!t)return null;const e=String(t.id||"").trim(),a=String(t.email||"").trim().toLowerCase();return(this.getClinicStaffList()||[]).find(s=>{const n=String(s.userId||s.id||"").trim(),i=String(s.userEmail||"").trim().toLowerCase();return e&&n===e||a&&i===a})||null},isActiveClinicStaffMember(){const t=this.getCurrentUserStaffRecord();return t?String(t.isActive||"true").toLowerCase()!=="false":!1},canAccessAttendanceTab(){return this.isCurrentUserAdmin()||typeof Permissions<"u"&&Permissions.hasDetailedPermission("clinic","attendance")?!0:this.isActiveClinicStaffMember()},canViewAllAttendanceData(){return this.isCurrentUserAdmin()},_attendanceRowBelongsToCurrentUser_(t){const e=AppState.currentUser;if(!e||!t)return!1;const a=String(e.id||"").trim(),s=String(e.email||"").trim().toLowerCase(),n=this.getCurrentUserStaffRecord();return!!(n&&n.id&&String(t.staffId)===String(n.id)||a&&String(t.userId||"")===a||s&&String(t.userEmail||"").trim().toLowerCase()===s)},getTimeOffRequestTypeLabel(t){return{leave:"\u0625\u062C\u0627\u0632\u0629",permission:"\u0625\u0630\u0646",overtime:"\u0625\u0636\u0627\u0641\u064A"}[String(t||"").trim()]||t||"\u2014"},getTimeOffStatusBadge(t){return{pending:'<span class="badge badge-warning">\u0645\u0639\u0644\u0642</span>',approved:'<span class="badge badge-success">\u0645\u0639\u062A\u0645\u062F</span>',rejected:'<span class="badge badge-danger">\u0645\u0631\u0641\u0648\u0636</span>',cancelled:'<span class="badge badge-secondary">\u0645\u0644\u063A\u0649</span>'}[String(t||"").trim()]||'<span class="badge badge-secondary">\u2014</span>'},formatTimeOffRequestDetails(t){const e=String(t.requestType||"").trim();if(e==="leave")return`${t.dateFrom||"\u2014"} \u2192 ${t.dateTo||"\u2014"} (${t.durationDays||"\u2014"} \u064A\u0648\u0645)`;if(e==="permission")return`${t.dateFrom||"\u2014"} | ${t.timeFrom||"\u2014"} - ${t.timeTo||"\u2014"}`;if(e==="overtime"){const a=t.durationHours?`${t.durationHours} \u0633`:"",s=t.timeFrom&&t.timeTo?`${t.timeFrom} - ${t.timeTo}`:"";return`${t.dateFrom||"\u2014"} ${a||s}`.trim()}return"\u2014"},getStaffRoleLabel(t){return{doctor:"\u0637\u0628\u064A\u0628",nurse:"\u062A\u0645\u0631\u064A\u0636",clinic_officer:"\u0645\u0633\u0626\u0648\u0644 \u0639\u064A\u0627\u062F\u0629"}[String(t||"").trim()]||t||"\u2014"},getAttendanceStatusLabel(t){return{present:"\u062D\u0627\u0636\u0631",partial:"\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A",absent:"\u063A\u0627\u0626\u0628"}[String(t||"").trim()]||t||"\u2014"},getAttendanceStatusBadgeClass(t){const e=String(t||"").trim();return e==="present"?"badge-success":e==="partial"?"badge-warning":"badge-secondary"},_toDatetimeLocalValue(t,e){try{if(t){const a=new Date(t);if(!Number.isNaN(a.getTime())){const s=a.getFullYear(),n=String(a.getMonth()+1).padStart(2,"0"),i=String(a.getDate()).padStart(2,"0"),o=String(a.getHours()).padStart(2,"0"),l=String(a.getMinutes()).padStart(2,"0");return`${s}-${n}-${i}T${o}:${l}`}}if(e){const a=String(t||"").includes("checkout")||String(t||"")==="checkOut"?"17:00":"08:00";return`${e}T${a}`}return""}catch{return e?`${e}T08:00`:""}},_renderAttendancePunchActions(t){if(!t||!this.canAccessAttendanceTab())return'<span class="text-xs text-gray-400">\u2014</span>';const e=[],a=Utils.escapeAttr(String(t.id||""));return t.checkIn||e.push(`<button type="button" class="btn-secondary btn-sm" title="\u0625\u0636\u0627\u0641\u0629 \u0628\u0635\u0645\u0629 \u062F\u062E\u0648\u0644 \u0645\u0641\u0642\u0648\u062F\u0629" onclick="Clinic.showAttendancePunchModal('${a}', 'checkIn')"><i class="fas fa-sign-in-alt ml-1"></i>\u062F\u062E\u0648\u0644</button>`),t.checkOut||e.push(`<button type="button" class="btn-secondary btn-sm" title="\u0625\u0636\u0627\u0641\u0629 \u0628\u0635\u0645\u0629 \u062E\u0631\u0648\u062C \u0645\u0641\u0642\u0648\u062F\u0629" onclick="Clinic.showAttendancePunchModal('${a}', 'checkOut')"><i class="fas fa-sign-out-alt ml-1"></i>\u062E\u0631\u0648\u062C</button>`),e.length?`<div class="flex items-center gap-1 flex-wrap">${e.join("")}</div>`:'<span class="text-xs text-gray-400">\u0645\u0643\u062A\u0645\u0644</span>'},_findAttendanceRecordById(t){const e=String(t||"").trim();return e&&(this.getClinicStaffAttendanceList()||[]).find(a=>String(a.id)===e)||null},showAttendancePunchModal(t,e){if(!this.canAccessAttendanceTab()){Notification?.error?.("\u063A\u064A\u0631 \u0645\u0635\u0631\u062D");return}const a=this._findAttendanceRecordById(t);if(!a){Notification?.error?.("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=String(e||"").trim(),n=s==="checkIn",i=s==="checkOut";if(n&&a.checkIn){Notification?.warning?.("\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0633\u062C\u0651\u0644 \u0645\u0633\u0628\u0642\u0627\u064B");return}if(i&&a.checkOut){Notification?.warning?.("\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0633\u062C\u0651\u0644 \u0645\u0633\u0628\u0642\u0627\u064B");return}if(!n&&!i)return;const o=this._attendanceDayKey(a.date),l=i?`${o}T17:00`:`${o}T08:00`,d=`
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
            </div>`;document.getElementById("clinic-attendance-punch-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",d),document.getElementById("clinic-attendance-punch-save")?.addEventListener("click",async()=>{const f=document.getElementById("clinic-attendance-punch-time")?.value||"",p=document.getElementById("clinic-attendance-punch-notes")?.value?.trim()||"";if(!f){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0648\u0642\u062A");return}try{Loading?.show?.();const m=await GoogleIntegration.sendRequest({action:"updateClinicStaffAttendance",data:{recordId:a.id,punchType:s,[n?"checkIn":"checkOut"]:f,notes:p}});m?.success?(Notification?.success?.(m.message||"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u0635\u0645\u0629"),document.getElementById("clinic-attendance-punch-modal")?.remove(),await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0})):Notification?.error?.(m?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(m){Notification?.error?.(m?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}finally{Loading?.hide?.()}})},showAddMissingAttendanceModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const t=(this.getClinicStaffList()||[]).filter(s=>String(s.isActive||"true").toLowerCase()!=="false").map(s=>`<option value="${Utils.escapeAttr(s.id)}">${Utils.escapeHTML(s.userName||s.userEmail||s.id)}</option>`).join(""),e=this._getTodayLocalKey(),a=`
            <div class="modal-overlay active" id="clinic-attendance-add-modal">
                <div class="modal-content" style="max-width:520px;">
                    <div class="modal-header">
                        <h3><i class="fas fa-fingerprint ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062D\u0636\u0648\u0631 / \u0628\u0635\u0645\u0629 \u0645\u0641\u0642\u0648\u062F\u0629</h3>
                        <button type="button" class="modal-close" onclick="document.getElementById('clinic-attendance-add-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-4">
                        <div class="form-group">
                            <label class="form-label">\u0627\u0644\u0645\u0633\u0626\u0648\u0644 *</label>
                            <select id="clinic-attendance-add-staff" class="form-input"><option value="">\u2014 \u0627\u062E\u062A\u0631 \u2014</option>${t}</select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label>
                            <input type="date" id="clinic-attendance-add-date" class="form-input" value="${Utils.escapeAttr(e)}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644</label>
                            <input type="datetime-local" id="clinic-attendance-add-checkin" class="form-input" value="${Utils.escapeAttr(e+"T08:00")}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C</label>
                            <input type="datetime-local" id="clinic-attendance-add-checkout" class="form-input" value="${Utils.escapeAttr(e+"T17:00")}">
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
            </div>`;document.getElementById("clinic-attendance-add-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",a),document.getElementById("clinic-attendance-add-save")?.addEventListener("click",async()=>{const s=document.getElementById("clinic-attendance-add-staff")?.value||"",n=document.getElementById("clinic-attendance-add-date")?.value||"",i=document.getElementById("clinic-attendance-add-checkin")?.value||"",o=document.getElementById("clinic-attendance-add-checkout")?.value||"",l=document.getElementById("clinic-attendance-add-notes")?.value?.trim()||"";if(!s||!n){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E");return}if(!i&&!o){Notification?.warning?.("\u0623\u062F\u062E\u0644 \u0648\u0642\u062A \u062F\u062E\u0648\u0644 \u0623\u0648 \u062E\u0631\u0648\u062C \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");return}try{Loading?.show?.();const r={staffId:s,date:n,notes:l};i&&(r.checkIn=i),o&&(r.checkOut=o);const c=await GoogleIntegration.sendRequest({action:"updateClinicStaffAttendance",data:r});c?.success?(Notification?.success?.(c.message||"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644"),document.getElementById("clinic-attendance-add-modal")?.remove(),await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0})):Notification?.error?.(c?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}catch(r){Notification?.error?.(r?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638")}finally{Loading?.hide?.()}})},_attendanceDayKey(t){if(!t)return"";try{const e=String(t).trim();if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const a=new Date(t);if(Number.isNaN(a.getTime()))return e.slice(0,10);const s=a.getFullYear(),n=String(a.getMonth()+1).padStart(2,"0"),i=String(a.getDate()).padStart(2,"0");return`${s}-${n}-${i}`}catch{return String(t).slice(0,10)}},_getTodayLocalKey(){return this._attendanceDayKey(new Date)},_countActiveAttendanceFilters(t){if(!t)return 0;let e=0;return String(t.search||"").trim()&&e++,t.staffRole&&t.staffRole!=="all"&&e++,t.status&&t.status!=="all"&&e++,t.staffId&&t.staffId!=="all"&&e++,t.month&&e++,t.dateFrom&&e++,t.dateTo&&e++,e},_normalizeAttendanceDateRange(t,e){let a=String(t||"").trim(),s=String(e||"").trim();if(a&&s&&a>s){const n=a;a=s,s=n}return{dateFrom:a,dateTo:s}},_getAttendanceMonthRange(t){const e=String(t||"").trim();if(!/^\d{4}-\d{2}$/.test(e))return{dateFrom:"",dateTo:""};const a=e.split("-"),s=parseInt(a[0],10),n=parseInt(a[1],10);if(!s||!n||n<1||n>12)return{dateFrom:"",dateTo:""};const i=String(n).padStart(2,"0"),o=new Date(s,n,0).getDate();return{dateFrom:`${s}-${i}-01`,dateTo:`${s}-${i}-${String(o).padStart(2,"0")}`}},_getAttendanceStaffOptions(){const t=new Map;return(this.getClinicStaffList()||[]).forEach(e=>{const a=String(e.userId||e.id||e.userEmail||"").trim();a&&t.set(a,{id:a,staffId:e.id||"",name:e.userName||e.userEmail||a,role:e.staffRole||""})}),(this.getClinicStaffAttendanceList()||[]).forEach(e=>{const a=String(e.userId||e.staffId||e.userEmail||"").trim();!a||t.has(a)||t.set(a,{id:a,staffId:e.staffId||"",name:e.userName||e.userEmail||a,role:e.staffRole||""})}),Array.from(t.values()).sort((e,a)=>String(e.name).localeCompare(String(a.name),"ar"))},_resolveAttendanceFilterDates(t){const e=t||{};if(e.month){const a=this._getAttendanceMonthRange(e.month);if(a.dateFrom&&a.dateTo)return a}return this._normalizeAttendanceDateRange(e.dateFrom,e.dateTo)},_filterAttendanceRows(t,e){const a=e||{};let s=(t||[]).slice();if(a.staffId&&a.staffId!=="all"){const i=String(a.staffId).trim(),o=new Set([i,i.toLowerCase()]),l=(this.getClinicStaffList()||[]).find(r=>String(r.userId||"").trim()===i||String(r.id||"").trim()===i||String(r.userEmail||"").trim().toLowerCase()===i.toLowerCase());l&&["id","userId","userEmail"].forEach(r=>{const c=String(l[r]||"").trim();c&&(o.add(c),o.add(c.toLowerCase()))}),s=s.filter(r=>[r.staffId,r.userId,r.userEmail].map(d=>String(d||"").trim()).filter(Boolean).some(d=>o.has(d)||o.has(d.toLowerCase())))}if(a.search){const i=String(a.search).trim().toLowerCase();s=s.filter(o=>String(o.userName||"").toLowerCase().includes(i)||String(o.userEmail||"").toLowerCase().includes(i))}a.staffRole&&a.staffRole!=="all"&&(s=s.filter(i=>String(i.staffRole)===String(a.staffRole))),a.status&&a.status!=="all"&&(s=s.filter(i=>String(i.status)===String(a.status)));const n=this._resolveAttendanceFilterDates(a);return n.dateFrom&&(s=s.filter(i=>this._attendanceDayKey(i.date)>=n.dateFrom)),n.dateTo&&(s=s.filter(i=>this._attendanceDayKey(i.date)<=n.dateTo)),s.sort((i,o)=>{const l=this._attendanceDayKey(o.date)+String(o.checkIn||""),r=this._attendanceDayKey(i.date)+String(i.checkIn||"");return l.localeCompare(r)}),s},_computeAttendanceReportStats(t){const e=t||[];let a=0,s=0,n=0;const i=new Set;return e.forEach(o=>{const l=parseFloat(o.workDuration);Number.isNaN(l)||(a+=l),String(o.status)==="present"?s++:String(o.status)==="partial"&&n++;const r=String(o.userId||o.staffId||o.userEmail||o.userName||"");r&&i.add(r)}),{total:e.length,present:s,partial:n,staffCount:i.size,totalHours:Math.round(a*100)/100}},_buildAttendanceReportMeta(t){const e=t||{},a=[];if(e.staffId&&e.staffId!=="all"){const n=this._getAttendanceStaffOptions().find(i=>String(i.id)===String(e.staffId)||String(i.staffId)===String(e.staffId));a.push("\u0627\u0644\u0645\u0633\u0626\u0648\u0644: "+(n?.name||e.staffId))}if(e.month){const[n,i]=String(e.month).split("-"),o=["","\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];a.push("\u0627\u0644\u0634\u0647\u0631: "+(o[parseInt(i,10)]||i)+" "+n)}const s=this._resolveAttendanceFilterDates(e);return(s.dateFrom||s.dateTo)&&a.push("\u0627\u0644\u0645\u062F\u0629: "+(s.dateFrom||"\u2026")+" \u2192 "+(s.dateTo||"\u2026")),e.staffRole&&e.staffRole!=="all"&&a.push("\u0627\u0644\u062F\u0648\u0631: "+this.getStaffRoleLabel(e.staffRole)),e.status&&e.status!=="all"&&a.push("\u0627\u0644\u062D\u0627\u0644\u0629: "+this.getAttendanceStatusLabel(e.status)),e.search&&a.push("\u0628\u062D\u062B: "+String(e.search).trim()),a.length?a.join(" | "):"\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A"},_attendanceReportFileSuffix(t){const e=t||{};if(e.month)return String(e.month);if(e.staffId&&e.staffId!=="all")return(this._getAttendanceStaffOptions().find(i=>String(i.id)===String(e.staffId))?.name||"staff").replace(/[^\w\u0600-\u06FF-]+/g,"_").slice(0,24);const a=this._resolveAttendanceFilterDates(e);return a.dateFrom&&a.dateTo?`${a.dateFrom}_${a.dateTo}`:a.dateFrom?`from_${a.dateFrom}`:new Date().toISOString().slice(0,10)},getFilteredClinicAttendance(){return this._filterAttendanceRows(this.getClinicStaffAttendanceList(),this.state.filters.attendance||{})},async loadClinicAttendanceData(t){if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return!1;try{this.canViewAllAttendanceData()&&await this._ensureClinicStaffLoadedForAttendance();const[e,a,s]=await Promise.all([GoogleIntegration.sendRequest({action:"getClinicStaffAttendance",data:t?{skipCache:!0}:{}}),GoogleIntegration.sendRequest({action:"getAllClinicStaff",data:{}}),GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:t?{skipCache:!0}:{}})]);return e?.success&&Array.isArray(e.data)&&(AppState.appData.clinicStaffAttendance=e.data),a?.success&&Array.isArray(a.data)&&(AppState.appData.clinicStaff=a.data),s?.success&&Array.isArray(s.data)&&(AppState.appData.clinicStaffTimeOffRequests=s.data),this.ensureData(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),!!(e?.success||a?.success||s?.success)}catch{return!1}},exportAttendanceToExcel(t){const e=t||this.state.filters.attendance||{},a=this._filterAttendanceRows(this.getClinicStaffAttendanceList(),e);if(!a.length){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const s=a.map(o=>({\u0627\u0644\u0627\u0633\u0645:o.userName||"",\u0627\u0644\u0628\u0631\u064A\u062F:o.userEmail||"",\u0627\u0644\u062F\u0648\u0631:this.getStaffRoleLabel(o.staffRole),\u0627\u0644\u062A\u0627\u0631\u064A\u062E:o.date||"","\u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644":o.checkIn?Utils.formatDateTime?Utils.formatDateTime(o.checkIn):o.checkIn:"","\u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C":o.checkOut?Utils.formatDateTime?Utils.formatDateTime(o.checkOut):o.checkOut:"","\u0645\u062F\u0629 \u0627\u0644\u0639\u0645\u0644 (\u0633\u0627\u0639\u0629)":o.workDuration||"",\u0627\u0644\u062D\u0627\u0644\u0629:this.getAttendanceStatusLabel(o.status),"\u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u0644\u0633\u0629":o.sessionId||""})),n=XLSX.utils.book_new(),i=XLSX.utils.json_to_sheet(s);XLSX.utils.book_append_sheet(n,i,"Attendance"),XLSX.writeFile(n,`Clinic_Attendance_${this._attendanceReportFileSuffix(e)}.xlsx`)},_buildAttendanceReportContent(t,e){const a=this._computeAttendanceReportStats(e),s=this._buildAttendanceReportMeta(t),n=!this.canViewAllAttendanceData(),i=this.formatDate(new Date,!0),l=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",value:a.total,color:"#2563eb",bg:"#eff6ff"},{label:"\u062D\u0627\u0636\u0631",value:a.present,color:"#059669",bg:"#ecfdf5"},{label:"\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A",value:a.partial,color:"#d97706",bg:"#fffbeb"},{label:"\u0627\u0644\u0645\u0633\u0626\u0648\u0644\u0648\u0646",value:a.staffCount,color:"#4f46e5",bg:"#eef2ff"},{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0627\u0639\u0627\u062A",value:a.totalHours,color:"#0d9488",bg:"#f0fdfa"}].map(d=>`
            <div style="background:${d.bg};border:1px solid rgba(0,0,0,0.06);border-radius:10px;padding:12px 14px;text-align:center;">
                <div style="font-size:10px;color:#64748b;font-weight:700;margin-bottom:4px;">${d.label}</div>
                <div style="font-size:20px;font-weight:800;color:${d.color};line-height:1.1;">${d.value}</div>
            </div>
        `).join(""),r=e.map((d,f)=>{const p=f%2===0?"#ffffff":"#f8fafc",m=this.getAttendanceStatusLabel(d.status);return n?`<tr style="background:${p};">
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(d.date||"\u2014")}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(d.checkIn)}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(d.checkOut)}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;">${Utils.escapeHTML(String(d.workDuration||"\u2014"))}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(m)}</td>
                </tr>`:`<tr style="background:${p};">
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(d.userName||"\u2014")}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;font-size:10px;">${Utils.escapeHTML(d.userEmail||"\u2014")}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(this.getStaffRoleLabel(d.staffRole))}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(d.date||"\u2014")}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(d.checkIn)}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(d.checkOut)}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;">${Utils.escapeHTML(String(d.workDuration||"\u2014"))}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(m)}</td>
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
        `},ATTENDANCE_A4_WIDTH_PX:794,_formatAttendanceReportCellDate_(t){if(!t)return"\u2014";try{const e=Utils.formatDateTime?Utils.formatDateTime(t):String(t);return Utils.escapeHTML(e)}catch{return Utils.escapeHTML(String(t))}},_prepareAttendancePdfHtml_(t){const e=`
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
</style>`,a=String(t||"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");return a?a.includes("</head>")?a.replace("</head>",`${e}</head>`):`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${e}</head><body>${a}</body></html>`:e},async _waitAttendancePdfFontsReady_(t){if(!(!t||!t.fonts||typeof t.fonts.load!="function"))try{await Promise.all([t.fonts.load("400 12px Cairo"),t.fonts.load("600 14px Cairo"),t.fonts.load("700 18px Cairo"),t.fonts.load("800 16px Cairo")]),await t.fonts.ready}catch{}},async _ensureHtml2CanvasInAttendanceFrame_(t,e){if(!t||!e)return!1;if(typeof e.html2canvas=="function")return!0;if(typeof html2canvas=="function"){try{e.html2canvas=html2canvas}catch{}if(typeof e.html2canvas=="function")return!0}return new Promise(a=>{const s=t.createElement("script");s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",s.async=!0,s.onload=()=>a(typeof e.html2canvas=="function"),s.onerror=()=>a(!1),(t.head||t.documentElement).appendChild(s)})},_addAttendancePdfPageImage_(t,e,a){const s=t.internal.pageSize.getWidth(),n=t.internal.pageSize.getHeight(),i=s-a*2,o=n-a*2,l=Math.min(i/e.width,o/e.height),r=e.width*l,c=e.height*l,d=a+(i-r)/2,f=a;Utils.PdfExport.addCanvasToPdf(t,e,d,f,r,c)},_buildAttendanceReportFullHtml(t,e){const a=this._buildAttendanceReportContent(t,e),s=Utils.escapeHTML(AppState?.companySettings?.name||"\u0646\u0638\u0627\u0645 HSE"),n=typeof AppState?.companyLogo=="string"?AppState.companyLogo:"",i=Utils.escapeHTML(`CLINIC-ATT-${this._attendanceReportFileSuffix(t)}`);return`<!DOCTYPE html>
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
</html>`},_loadAttendancePdfLib_(t,e){if(e())return Promise.resolve(!0);const a=Array.isArray(t)?t:[t],s=n=>{if(n>=a.length)return Promise.resolve(!1);const i=a[n],o=Array.from(document.querySelectorAll("script[src]")).find(l=>String(l.src||"").includes(i.replace(/^https?:\/\//,"").split("/").slice(-2).join("/")));return o?new Promise(l=>{const r=()=>l(!!e());o.addEventListener("load",r,{once:!0}),setTimeout(r,4e3)}):new Promise(l=>{const r=document.createElement("script");r.src=i,r.async=!0,r.onload=()=>l(!!e()),r.onerror=()=>l(s(n+1)),document.head.appendChild(r)})};return s(0)},async _ensureAttendancePdfLibs_(){const t=await this._loadAttendancePdfLib_(["https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js","https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js","https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"],()=>typeof window.jspdf<"u"||typeof window.jsPDF<"u"),e=await this._loadAttendancePdfLib_(["https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js","https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js","https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"],()=>typeof html2canvas<"u");return t&&e},_getJsPdfConstructor_(){return window.jspdf&&window.jspdf.jsPDF?window.jspdf.jsPDF:window.jsPDF&&window.jsPDF.jsPDF?window.jsPDF.jsPDF:typeof window.jsPDF=="function"?window.jsPDF:null},async _preloadAttendancePdfFonts_(t){const e=t||document,a=e.head||e.documentElement;if(a&&!e.getElementById("clinic-att-cairo-font")){const s=e.createElement("link");s.id="clinic-att-cairo-font",s.rel="stylesheet",s.href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap",a.appendChild(s)}try{e.fonts&&typeof e.fonts.load=="function"&&(await e.fonts.load("400 14px Cairo"),await e.fonts.load("700 18px Cairo"),await e.fonts.ready)}catch{}},async _captureAttendanceHtmlToCanvas_(t,e){const a=this.ATTENDANCE_A4_WIDTH_PX||794,s=Math.max(t?.scrollWidth||a,a),n=Math.max(t?.scrollHeight||1,1);let i=Utils.PdfExport.getOptimalCaptureScale(s,n,Utils.PdfExport.DEFAULT_CAPTURE_SCALE);const o=e&&typeof e.html2canvas=="function"?e.html2canvas:html2canvas,l={scale:i,backgroundColor:"#ffffff",logging:!1,width:s,height:n,windowWidth:s,windowHeight:n,scrollX:0,scrollY:0,useCORS:!0,allowTaint:!0,imageTimeout:8e3},r=[l,{...l,useCORS:!1,allowTaint:!0},{...l,scale:Math.max(1.25,i-.5)}];let c=null;for(let d=0;d<r.length;d++)try{const f=await o(t,r[d]);if(f&&f.width>0&&f.height>0)return f}catch(f){c=f}if(c)throw c;return null},async _downloadAttendanceHtmlAsPdf(t,e){if(!this._getJsPdfConstructor_()||typeof html2canvas>"u")return!1;const s=String(e||"report.pdf").toLowerCase().endsWith(".pdf")?String(e):`${String(e)}.pdf`,n=this.ATTENDANCE_A4_WIDTH_PX||794,i=6,o=this._prepareAttendancePdfHtml_(t);await this._preloadAttendancePdfFonts_();const l=document.createElement("iframe");l.setAttribute("aria-hidden","true"),l.style.cssText=`position:fixed;left:-20000px;top:0;width:${n}px;height:200px;border:0;visibility:hidden;`,document.body.appendChild(l);try{l.srcdoc=o,await new Promise(g=>{l.onload=g,l.onerror=g,setTimeout(g,4e3)});const r=l.contentDocument||l.contentWindow?.document,c=l.contentWindow;if(!r||!c)return!1;await this._preloadAttendancePdfFonts_(r),await this._waitAttendancePdfFontsReady_(r);const d=Array.from(r.images||[]);await Promise.all(d.map(g=>new Promise(y=>{if(g.complete)return y();g.onload=y,g.onerror=y,setTimeout(y,2e3)}))),await this._ensureHtml2CanvasInAttendanceFrame_(r,c),await new Promise(g=>setTimeout(g,300));const f=r.getElementById("attendance-report-root")||r.querySelector(".att-report-doc")||r.body;if(!f)return!1;const p=Math.max(f.scrollHeight,f.offsetHeight,1);l.style.height=`${p+80}px`,await new Promise(g=>setTimeout(g,150));const m=await this._captureAttendanceHtmlToCanvas_(f,c);if(!m)return!1;const u=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return u?(Utils.PdfExport.appendCanvasAsPdfPages(u,m,{marginMm:i}),Utils.PdfExport.savePdf(u,s),!0):!1}catch(r){return Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u062D\u0636\u0648\u0631 PDF:",r),!1}finally{l.remove()}},async exportAttendanceToPDF(t){const e=t||this.state.filters.attendance||{},a=this._filterAttendanceRows(this.getClinicStaffAttendanceList(),e);if(!a.length){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}const s=`Clinic_Attendance_${this._attendanceReportFileSuffix(e)}.pdf`;typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");try{if(!await this._ensureAttendancePdfLibs_()){Notification?.error?.("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0627\u062A PDF \u2014 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A");return}const i=this._buildAttendanceReportFullHtml(e,a);await this._downloadAttendanceHtmlAsPdf(i,s)?Notification?.success?.("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 PDF \u0628\u0646\u062C\u0627\u062D"):Notification?.error?.("\u062A\u0639\u0630\u0651\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF \u2014 \u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B")}catch(n){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0636\u0648\u0631 PDF:",n),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0636\u0648\u0631: "+(n?.message||""))}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide()}},showAttendanceReportModal(){document.getElementById("clinic-attendance-report-modal")?.remove();const t=this.canViewAllAttendanceData(),e=t?this._getAttendanceStaffOptions():[],a=new Date,s=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`,n=e.map(u=>`<option value="${Utils.escapeAttr(u.id)}">${Utils.escapeHTML(u.name)}${u.role?" \u2014 "+Utils.escapeHTML(this.getStaffRoleLabel(u.role)):""}</option>`).join(""),i="border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;background:#fafafa;",o=u=>`display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;margin:0 0 6px;background:${u?"#f0fdfa":"transparent"};border:1px solid ${u?"#99f6e4":"transparent"};`,l=`
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

                            ${t?`
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
            </div>`;document.body.insertAdjacentHTML("beforeend",l);const r=document.getElementById("clinic-attendance-report-modal");if(!r)return;const c=r.querySelector("#att-report-custom-filters"),d=r.querySelector("#att-report-use-current"),f=u=>{c&&(c.style.opacity=u?"1":"0.45",c.style.pointerEvents=u?"auto":"none")},p=()=>{const u=r.querySelector('input[name="att-report-date-scope"]:checked')?.value||"month";r.querySelector("#att-report-month-wrap").style.display=u==="month"?"block":"none",r.querySelector("#att-report-period-wrap").style.display=u==="period"?"block":"none",r.querySelectorAll("[data-date-opt]").forEach(g=>{const y=g.dataset.dateOpt===u;g.style.background=y?"#f0fdfa":"transparent",g.style.borderColor=y?"#99f6e4":"transparent"})};d?.addEventListener("change",()=>f(!d.checked)),r.querySelectorAll('input[name="att-report-date-scope"]').forEach(u=>{u.addEventListener("change",p)}),p(),f(!0);const m=()=>{if(d?.checked)return Object.assign({},this.state.filters.attendance||{});const u={search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},g=r.querySelector('input[name="att-report-date-scope"]:checked')?.value||"month";if(g==="month"){const v=r.querySelector("#att-report-month")?.value||"";if(!v)return Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631"),null;u.month=v}else if(g==="period"){const v=r.querySelector("#att-report-from")?.value||"",S=r.querySelector("#att-report-to")?.value||"";if(!v&&!S)return Notification?.warning?.("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0623\u0648 \u0627\u0644\u0646\u0647\u0627\u064A\u0629"),null;const L=this._normalizeAttendanceDateRange(v,S);u.dateFrom=L.dateFrom,u.dateTo=L.dateTo}const y=r.querySelector("#att-report-staff")?.value||"all";return y&&y!=="all"&&(u.staffId=y),u};r.querySelector("#att-report-export-btn")?.addEventListener("click",()=>{const u=r.querySelector('input[name="att-report-format"]:checked')?.value||"pdf",g=m();if(!g)return;if(!this._filterAttendanceRows(this.getClinicStaffAttendanceList(),g).length){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0642\u0631\u064A\u0631");return}r.remove(),u==="excel"?(this.exportAttendanceToExcel(g),Notification?.success?.("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 Excel")):this.exportAttendanceToPDF(g)})},showAddClinicStaffModal(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637");return}const t=this.getClinicStaffList(),e=new Set(t.map(i=>String(i.userId||i.userEmail||"").toLowerCase()).filter(Boolean)),n=`
            <div class="modal-overlay active" id="clinic-staff-modal">
                <div class="modal-content" style="max-width:520px;">
                    <div class="modal-header"><h3><i class="fas fa-user-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u0626\u0648\u0644 \u0639\u064A\u0627\u062F\u0629</h3>
                        <button type="button" class="modal-close" onclick="document.getElementById('clinic-staff-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-4">
                        <div class="form-group">
                            <label class="form-label">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</label>
                            <select id="clinic-staff-user" class="form-input"><option value="">\u2014 \u0627\u062E\u062A\u0631 \u2014</option>${(AppState.appData.users||[]).filter(i=>i&&i.active!==!1&&i.email).filter(i=>!e.has(String(i.id||"").toLowerCase())&&!e.has(String(i.email||"").toLowerCase())).map(i=>`<option value="${Utils.escapeAttr(i.id||"")}" data-email="${Utils.escapeAttr(i.email||"")}" data-name="${Utils.escapeAttr(i.name||"")}" data-dept="${Utils.escapeAttr(i.department||"")}" data-job="${Utils.escapeAttr(i.jobTitle||i.position||"")}">${Utils.escapeHTML(i.name||i.email)}</option>`).join("")}</select>
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
            </div>`;document.getElementById("clinic-staff-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",n),document.getElementById("clinic-staff-save-btn")?.addEventListener("click",async()=>{const i=document.getElementById("clinic-staff-user"),o=i?.selectedOptions?.[0];if(!i?.value||!o){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0633\u062A\u062E\u062F\u0645");return}const l=document.getElementById("clinic-staff-role")?.value||"clinic_officer";try{const r=await GoogleIntegration.sendRequest({action:"addClinicStaff",data:{userId:i.value,userEmail:o.dataset.email||"",userName:o.dataset.name||"",department:o.dataset.dept||"",jobTitle:o.dataset.job||"",staffRole:l,isActive:"true"}});r?.success?(Notification?.success?.("\u062A\u0645\u062A \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u0639\u064A\u0627\u062F\u0629"),document.getElementById("clinic-staff-modal")?.remove(),await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0})):Notification?.error?.(r?.message||"\u0641\u0634\u0644 \u0627\u0644\u0625\u0636\u0627\u0641\u0629")}catch(r){Notification?.error?.(r?.message||"\u0641\u0634\u0644 \u0627\u0644\u0625\u0636\u0627\u0641\u0629")}})},async toggleClinicStaffActive(t,e){if(!(!this.isCurrentUserAdmin()||!t))try{const a=await GoogleIntegration.sendRequest({action:"updateClinicStaff",data:{staffId:t,updateData:{isActive:e?"true":"false"}}});a?.success?(await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0633\u0626\u0648\u0644")):Notification?.error?.(a?.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}catch(a){Notification?.error?.(a?.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}},async deleteClinicStaffMember(t){if(!(!this.isCurrentUserAdmin()||!t)&&confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0639\u064A\u0627\u062F\u0629\u061F (\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0627\u0644\u0633\u0627\u0628\u0642 \u064A\u0628\u0642\u0649 \u0645\u062D\u0641\u0648\u0638\u0627\u064B)"))try{const e=await GoogleIntegration.sendRequest({action:"deleteClinicStaff",data:{staffId:t}});e?.success?(await this.loadClinicAttendanceData(!0),this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641")):Notification?.error?.(e?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641")}catch(e){Notification?.error?.(e?.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641")}},async notifyAdminAboutTimeOffRequest(t){if(!(!t||!t.id))try{if(this.isCurrentUserAdmin()){const e=Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)?AppState.appData.clinicStaffTimeOffRequests:[];e.some(s=>String(s.id)===String(t.id))||(AppState.appData.clinicStaffTimeOffRequests=[t,...e]),this._updatePendingApprovalsBadgeFromLocal_(),typeof UI<"u"&&typeof UI.updateNotificationsBadge=="function"&&UI.updateNotificationsBadge()}}catch(e){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0637\u0644\u0628 \u0627\u0644\u062D\u0636\u0648\u0631:",e)}},async submitTimeOffRequest(){this._saveTimeOffFormDraftFromDom(),this._timeOffFormSubmitting=!0;const t=document.getElementById("timeoff-request-type")?.value||"",e=document.getElementById("timeoff-reason")?.value?.trim()||"";let a="",s="";const n=document.getElementById("timeoff-time-from")?.value||"",i=document.getElementById("timeoff-time-to")?.value||"",o=document.getElementById("timeoff-duration-hours")?.value||"";if(t==="leave"?(a=document.getElementById("timeoff-date-from")?.value||"",s=document.getElementById("timeoff-date-to")?.value||""):t==="permission"?(a=document.getElementById("timeoff-perm-date")?.value||"",s=a):t==="overtime"&&(a=document.getElementById("timeoff-ot-date")?.value||"",s=a),!t){this._timeOffFormSubmitting=!1,Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628");return}if(!e){this._timeOffFormSubmitting=!1,Notification?.error?.("\u0633\u0628\u0628 \u0627\u0644\u0637\u0644\u0628 \u0645\u0637\u0644\u0648\u0628");return}Loading.show();try{const l={requestType:t,reason:e,dateFrom:a,dateTo:s,timeFrom:n,timeTo:i,durationHours:o},r=await GoogleIntegration.sendRequest({action:"addClinicStaffTimeOffRequest",data:l});if(r&&r.success){const c=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});c?.success&&Array.isArray(c.data)&&(AppState.appData.clinicStaffTimeOffRequests=c.data),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();const d=(AppState.appData.clinicStaffTimeOffRequests||[]).find(f=>f.id===r.data?.id)||{id:r.data?.id,requestType:t,reason:e,dateFrom:a,dateTo:s,timeFrom:n,timeTo:i,durationHours:o,status:"pending"};this._invalidateApprovalsCache(),this.notifyAdminAboutTimeOffRequest(d),Loading.hide(),Notification?.success?.("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D \u2014 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0645\u062F\u064A\u0631"),this.state&&(this.state.timeOffFormDraft=this._getDefaultTimeOffFormDraft()),this._attendanceRenderPending=!1,this.renderAttendanceTab({force:!0})}else throw new Error(r?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}catch(l){Loading.hide(),Notification?.error?.(l?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}finally{this._timeOffFormSubmitting=!1}},async cancelTimeOffRequest(t){if(!(!t||!confirm("\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0644\u063A\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F"))){Loading.show();try{const a=await GoogleIntegration.sendRequest({action:"cancelClinicStaffTimeOffRequest",data:{requestId:t}});if(a&&a.success){const s=await GoogleIntegration.sendRequest({action:"getClinicStaffTimeOffRequests",data:{}});s?.success&&Array.isArray(s.data)&&(AppState.appData.clinicStaffTimeOffRequests=s.data),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification?.success?.("\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0637\u0644\u0628"),this.renderAttendanceTab({force:!0})}else throw new Error(a?.message||"\u0641\u0634\u0644 \u0627\u0644\u0625\u0644\u063A\u0627\u0621")}catch(a){Loading.hide(),Notification?.error?.(a?.message||"\u0641\u0634\u0644 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0637\u0644\u0628")}}},renderTimeOffRequestsTable(t){if(!t||!t.length)return'<p class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</p>';const e=t.map(a=>{const s=String(a.status)==="pending";return`<tr>
                <td><span class="badge badge-info">${Utils.escapeHTML(this.getTimeOffRequestTypeLabel(a.requestType))}</span></td>
                <td>${Utils.escapeHTML(this.formatTimeOffRequestDetails(a))}</td>
                <td class="text-sm">${Utils.escapeHTML(a.reason||"\u2014")}</td>
                <td>${this.getTimeOffStatusBadge(a.status)}</td>
                <td>${this.formatDate(a.requestedAt||a.createdAt,!0)}</td>
                <td>${s?`<button type="button" class="btn-icon btn-icon-danger" title="\u0625\u0644\u063A\u0627\u0621" onclick="Clinic.cancelTimeOffRequest('${Utils.escapeAttr(a.id)}')"><i class="fas fa-ban"></i></button>`:"\u2014"}</td>
            </tr>`}).join("");return this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
            <thead><tr><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th><th>\u0627\u0644\u0633\u0628\u0628</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><th>\u0625\u062C\u0631\u0627\u0621</th></tr></thead>
            <tbody>${e}</tbody>
        </table>`)},renderAttendanceSelfTab(t){this._saveTimeOffFormDraftFromDom(),this._scheduleLeaveBalancesLoadIfNeeded(!1),this.ensureData();const e=this._isAttendanceDataLoading(),a=this._isLeaveBalancesLoading(),s=this._getLeaveBalancePeriodDefaults(),n=this.getClinicStaffLeaveBalancesList()[0]||{},i=n.month||{},o=n.year||{};this.state.filters=this.state.filters||{},this.state.filters.attendance=Object.assign({search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.state.filters.attendance||{});const l=this.state.filters.attendance,r=this.getFilteredClinicAttendance(),c=this.getClinicStaffTimeOffRequestsList().sort((x,A)=>new Date(A.requestedAt||A.createdAt)-new Date(x.requestedAt||x.createdAt)),d=c.filter(x=>x.status==="pending").length,f=this._computeAttendanceReportStats(r),p=this.getCurrentUserStaffRecord(),m=this.getFilteredClinicStaffActivities(),u=!!this._clinicStaffActivitiesLoading,g=this._countActiveAttendanceFilters(l),y=this.state.attendanceFilterPanelOpen!==!1,v=l.period||"all",S={today:"\u0627\u0644\u064A\u0648\u0645",week:"7 \u0623\u064A\u0627\u0645",month:"30 \u064A\u0648\u0645",all:"\u0627\u0644\u0643\u0644"},M="min-width:0;box-sizing:border-box;width:100%;padding:8px 11px;border:1.5px solid #99f6e4;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;",E="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;",h=e&&r.length===0?this._renderAttendanceTableLoadingRow(5):r.length?r.map(x=>`
            <tr>
                <td>${Utils.escapeHTML(x.date||"\u2014")}</td>
                <td>${x.checkIn?Utils.formatDateTime?Utils.formatDateTime(x.checkIn):Utils.escapeHTML(String(x.checkIn)):"\u2014"}</td>
                <td>${x.checkOut?Utils.formatDateTime?Utils.formatDateTime(x.checkOut):Utils.escapeHTML(String(x.checkOut)):"\u2014"}</td>
                <td>${Utils.escapeHTML(String(x.workDuration||"\u2014"))}</td>
                <td><span class="badge ${this.getAttendanceStatusBadgeClass(x.status)}">${Utils.escapeHTML(this.getAttendanceStatusLabel(x.status))}</span></td>
                <td>${this._renderAttendancePunchActions(x)}</td>
            </tr>
        `).join(""):'<tr><td colspan="6" class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u0636\u0648\u0631</td></tr>',I=[{id:"clinic-attendance-section-timeoff",label:"\u0637\u0644\u0628 \u062C\u062F\u064A\u062F",icon:"fa-paper-plane"},{id:"clinic-attendance-section-my-requests",label:"\u0637\u0644\u0628\u0627\u062A\u064A",icon:"fa-list"},{id:"clinic-attendance-section-records",label:"\u0633\u062C\u0644 \u062D\u0636\u0648\u0631\u064A",icon:"fa-clipboard-user"},{id:"clinic-staff-activities-section",label:"\u0646\u0634\u0627\u0637\u064A",icon:"fa-history"},{id:"clinic-leave-balances-section",label:"\u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A",icon:"fa-wallet"},{id:"clinic-approved-timeoff-section",label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629",icon:"fa-check-circle"}];t.innerHTML=`
            <div id="clinic-attendance-self-root">
                ${this.renderAttendanceQuickNav(I)}
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:14px;">
                    ${[{label:"\u0623\u064A\u0627\u0645 \u062D\u0636\u0648\u0631\u064A",value:f.total,icon:"fa-calendar-check",color:"#059669",bg:"#ecfdf5"},{label:"\u0633\u0627\u0639\u0627\u062A\u064A",value:f.totalHours,icon:"fa-clock",color:"#2563eb",bg:"#eff6ff"},{label:"\u0637\u0644\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629",value:d,icon:"fa-hourglass-half",color:"#d97706",bg:"#fffbeb"},{label:"\u0625\u062C\u0627\u0632\u0629 \u0645\u062A\u0628\u0642\u064A\u0629 (\u0634\u0647\u0631)",value:a?"\u2026":i.leaveRemaining??0,icon:"fa-umbrella-beach",color:"#0d9488",bg:"#f0fdfa"},{label:"\u0623\u0630\u0648\u0646\u0627\u062A \u0645\u062A\u0628\u0642\u064A\u0629 (\u0634\u0647\u0631)",value:a?"\u2026":i.permissionRemaining??0,icon:"fa-door-open",color:"#7c3aed",bg:"#f5f3ff"},{label:"\u0625\u062C\u0627\u0632\u0629 \u0645\u062A\u0628\u0642\u064A\u0629 (\u0633\u0646\u0629)",value:a?"\u2026":o.leaveRemaining??0,icon:"fa-calendar",color:"#0369a1",bg:"#f0f9ff"}].map(x=>`
                        <div style="background:${x.bg};border-radius:12px;padding:14px;display:flex;align-items:center;gap:10px;">
                            <i class="fas ${x.icon}" style="color:${x.color};font-size:1.2rem;"></i>
                            <div><p style="margin:0;font-size:0.72rem;color:#64748b;">${x.label}</p><p style="margin:0;font-size:1.35rem;font-weight:800;color:${x.color};">${x.value}</p></div>
                        </div>`).join("")}
                </div>

                <div style="padding:14px 18px;background:linear-gradient(135deg,#134e4a,#0d9488);border-radius:14px;color:#fff;margin-bottom:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;align-items:center;">
                    <div>
                        <h3 style="margin:0;font-size:1rem;font-weight:700;">\u062D\u0636\u0648\u0631\u064A \u0648\u0637\u0644\u0628\u0627\u062A\u064A</h3>
                        <p style="margin:4px 0 0;font-size:0.72rem;opacity:0.9;">${Utils.escapeHTML(p?.userName||AppState.currentUser?.name||"")} \u2014 ${Utils.escapeHTML(this.getStaffRoleLabel(p?.staffRole))}</p>
                    </div>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        ${["today","week","month","all"].map(x=>{const A=v===x;return`<button type="button" class="clinic-attendance-period-btn" data-period="${x}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.74rem;font-weight:600;background:${A?"#fff":"rgba(255,255,255,0.14)"};color:${A?"#134e4a":"#fff"};">${S[x]}</button>`}).join("")}
                        <button type="button" id="clinic-attendance-toggle-filters" style="padding:6px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.35);background:rgba(255,255,255,0.12);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-sliders-h"></i> \u0641\u0644\u0627\u062A\u0631</button>
                        <button type="button" id="clinic-attendance-refresh-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(255,255,255,0.14);color:#fff;cursor:pointer;"><i class="fas fa-sync-alt${e?" fa-spin":""}"></i></button>
                        <button type="button" id="clinic-attendance-pdf-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(0,0,0,0.22);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-file-pdf"></i> PDF</button>
                        <button type="button" id="clinic-attendance-export-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(0,0,0,0.22);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-file-excel"></i> Excel</button>
                    </div>
                </div>

                <div id="clinic-attendance-filter-panel" style="display:${y?"block":"none"};background:#f0fdfa;border:1.5px solid #99f6e4;border-radius:12px;padding:14px;margin-bottom:14px;">
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;">
                        <div><label style="${E}">\u0627\u0644\u0634\u0647\u0631</label><input type="month" id="clinic-attendance-month" style="${M}" value="${Utils.escapeAttr(l.month||"")}"></div>
                        <div><label style="${E}">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="clinic-attendance-status" style="${M}">
                                <option value="all">\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                <option value="present" ${l.status==="present"?"selected":""}>\u062D\u0627\u0636\u0631</option>
                                <option value="partial" ${l.status==="partial"?"selected":""}>\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A</option>
                                <option value="absent" ${l.status==="absent"?"selected":""}>\u063A\u0627\u0626\u0628</option>
                            </select>
                        </div>
                        <div><label style="${E}">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label><input type="date" id="clinic-attendance-from" style="${M}" value="${Utils.escapeAttr(l.dateFrom||"")}"></div>
                        <div><label style="${E}">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label><input type="date" id="clinic-attendance-to" style="${M}" value="${Utils.escapeAttr(l.dateTo||"")}"></div>
                    </div>
                    ${g?'<button type="button" id="clinic-attendance-reset-filters" class="btn-secondary btn-sm mt-2"><i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631</button>':""}
                </div>

                <div class="content-card mb-4" id="clinic-attendance-section-timeoff">
                    <div class="card-header"><h4 class="card-title"><i class="fas fa-paper-plane ml-2"></i>\u0637\u0644\u0628 \u062C\u062F\u064A\u062F</h4></div>
                    <div class="card-body">
                        <form id="timeoff-request-form" class="space-y-3">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-sm font-semibold mb-1">\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628 *</label>
                                    <select id="timeoff-request-type" class="form-input" required>
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                        <option value="leave">\u0625\u062C\u0627\u0632\u0629</option>
                                        <option value="permission">\u0625\u0630\u0646</option>
                                        <option value="overtime">\u0625\u0636\u0627\u0641\u064A</option>
                                    </select>
                                </div>
                                <div id="timeoff-leave-dates" class="hidden md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div><label class="block text-sm font-semibold mb-1">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-date-from" class="form-input"></div>
                                    <div><label class="block text-sm font-semibold mb-1">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-date-to" class="form-input"></div>
                                </div>
                                <div id="timeoff-permission-fields" class="hidden md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div><label class="block text-sm font-semibold mb-1">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-perm-date" class="form-input"></div>
                                    <div><label class="block text-sm font-semibold mb-1">\u0645\u0646 \u0648\u0642\u062A *</label><input type="time" id="timeoff-time-from" class="form-input"></div>
                                    <div><label class="block text-sm font-semibold mb-1">\u0625\u0644\u0649 \u0648\u0642\u062A *</label><input type="time" id="timeoff-time-to" class="form-input"></div>
                                </div>
                                <div id="timeoff-overtime-fields" class="hidden md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div><label class="block text-sm font-semibold mb-1">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label><input type="date" id="timeoff-ot-date" class="form-input"></div>
                                    <div><label class="block text-sm font-semibold mb-1">\u0639\u062F\u062F \u0627\u0644\u0633\u0627\u0639\u0627\u062A</label><input type="number" id="timeoff-duration-hours" class="form-input" min="0.5" step="0.5" placeholder="\u0645\u062B\u0627\u0644: 2"></div>
                                    <div class="text-sm text-gray-500 self-end pb-2">\u0623\u0648 \u062D\u062F\u062F \u0645\u0646/\u0625\u0644\u0649 \u0648\u0642\u062A \u0623\u062F\u0646\u0627\u0647</div>
                                </div>
                            </div>
                            <div><label class="block text-sm font-semibold mb-1">\u0627\u0644\u0633\u0628\u0628 *</label><textarea id="timeoff-reason" class="form-textarea" rows="2" required placeholder="\u0627\u0630\u0643\u0631 \u0633\u0628\u0628 \u0627\u0644\u0637\u0644\u0628..."></textarea></div>
                            <button type="submit" class="btn-primary"><i class="fas fa-paper-plane ml-2"></i>\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628</button>
                        </form>
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
                            <tbody>${h}</tbody>
                        </table>`)}
                    </div>
                </div>

                ${this.renderClinicStaffActivitiesSection({showUserColumn:!1,activities:m,loading:u,title:"\u0646\u0634\u0627\u0637\u064A \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645"})}

                ${this.renderClinicStaffLeaveBalancesSection({balances:this.getClinicStaffLeaveBalancesList(),loading:a,month:s.month,year:s.year})}

                ${this.renderApprovedTimeOffRequestsSection(this.getClinicStaffLeaveBalancesList(),s.month)}
            </div>`;const C=()=>{const x=document.getElementById("clinic-attendance-month")?.value||"";let A=document.getElementById("clinic-attendance-from")?.value||"",b=document.getElementById("clinic-attendance-to")?.value||"";if(x&&!A&&!b){const U=this._getAttendanceMonthRange(x);A=U.dateFrom,b=U.dateTo}else{const U=this._normalizeAttendanceDateRange(A,b);A=U.dateFrom,b=U.dateTo}return{search:"",staffRole:"all",status:document.getElementById("clinic-attendance-status")?.value||"all",staffId:"all",month:x,dateFrom:A,dateTo:b,period:this.state.filters.attendance?.period||"all"}},j=()=>{this.state.filters.attendance=C.call(this),this.renderAttendanceTab({force:!0})},w=x=>{const A=this._getTodayLocalKey();let b="",U="";if(x==="today")b=A,U=A;else if(x==="week"){const q=new Date;q.setDate(q.getDate()-6),b=this._attendanceDayKey(q),U=A}else if(x==="month"){const q=new Date;q.setDate(q.getDate()-29),b=this._attendanceDayKey(q),U=A}this.state.filters.attendance=Object.assign({},this.state.filters.attendance||{},{period:x,month:"",dateFrom:b,dateTo:U}),this.renderAttendanceTab({force:!0})};t.querySelector("#clinic-attendance-status")?.addEventListener("change",j),t.querySelector("#clinic-attendance-month")?.addEventListener("change",j),t.querySelector("#clinic-attendance-from")?.addEventListener("change",j),t.querySelector("#clinic-attendance-to")?.addEventListener("change",j),t.querySelector("#clinic-attendance-reset-filters")?.addEventListener("click",()=>{this.state.filters.attendance={search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.renderAttendanceTab({force:!0})}),t.querySelector("#clinic-attendance-toggle-filters")?.addEventListener("click",()=>{this.state.attendanceFilterPanelOpen=!y;const x=t.querySelector("#clinic-attendance-filter-panel");x&&(x.style.display=this.state.attendanceFilterPanelOpen?"block":"none")}),t.querySelectorAll(".clinic-attendance-period-btn").forEach(x=>{x.addEventListener("click",()=>w(x.dataset.period||"all"))}),t.querySelector("#clinic-attendance-export-btn")?.addEventListener("click",()=>this.exportAttendanceToExcel()),t.querySelector("#clinic-attendance-pdf-btn")?.addEventListener("click",()=>this.exportAttendanceToPDF()),t.querySelector("#clinic-attendance-refresh-btn")?.addEventListener("click",async()=>{Notification?.info?.("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B..."),this._attendanceDataFetchedInSession=!1,await this.loadClinicAttendanceData(!0),this._attendanceDataFetchedInSession=!0,this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}),this.bindClinicStaffActivitiesEvents(t),this.bindClinicStaffLeaveBalanceEvents(t),this.bindAttendanceQuickNav(t),this.initAttendanceTableScroll(t),this._applyTimeOffFormDraftToPanel(t),this._bindTimeOffFormPanelEvents(t)},renderAttendanceTab(t){if(!(t&&t.force===!0)&&this._shouldDeferAttendanceRender()){this._attendanceRenderPending=!0;return}this._attendanceRenderPending=!1;const a=document.querySelector('.clinic-tab-panel[data-tab-panel="attendance"]');if(!a)return;if(!this.canAccessAttendanceTab()){a.innerHTML=`<div class="text-center py-12 text-gray-500">
                <i class="fas fa-lock text-4xl mb-4 opacity-40"></i>
                <p class="font-semibold">\u063A\u064A\u0631 \u0645\u0635\u0631\u062D</p>
                <p class="text-sm mt-2">\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062D\u0636\u0648\u0631 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0623\u0648 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0633\u062C\u0651\u0644\u064A\u0646 \u0648\u0627\u0644\u0646\u0634\u0637\u064A\u0646 \u0641\u0642\u0637.</p>
            </div>`;return}this.isCurrentUserAdmin()&&this.prefetchClinicAttendanceForAdminIfNeeded(!1),this._scheduleAttendanceDataLoadIfNeeded(!1),this._scheduleLeaveBalancesLoadIfNeeded(!1);const s=this._isAttendanceDataLoading(),n=this._isLeaveBalancesLoading(),i=this._getLeaveBalancePeriodDefaults(),o=this.getClinicStaffLeaveBalancesList();if(!this.canViewAllAttendanceData())return this.renderAttendanceSelfTab(a);this.ensureData(),this.state.filters=this.state.filters||{},this.state.filters.attendance=Object.assign({search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.state.filters.attendance||{});const l=this.state.filters.attendance,r=this.getFilteredClinicAttendance(),c=this.getClinicStaffList(),d=this._getAttendanceStaffOptions(),f=c.filter(D=>String(D.isActive||"true").toLowerCase()!=="false"),p=this._getTodayLocalKey(),m=this.getClinicStaffAttendanceList(),u=m.filter(D=>this._attendanceDayKey(D.date)===p),g=u.filter(D=>D.checkIn).length,y=u.filter(D=>D.checkIn&&!D.checkOut).length,v=this.isCurrentUserAdmin(),S=this.getFilteredClinicStaffActivities(),L=!!this._clinicStaffActivitiesLoading,M=this._countActiveAttendanceFilters(l),E=this.state.attendanceFilterPanelOpen!==!1,h=l.period||"all",I={today:"\u0627\u0644\u064A\u0648\u0645",week:"7 \u0623\u064A\u0627\u0645",month:"30 \u064A\u0648\u0645",all:"\u0627\u0644\u0643\u0644"},C="min-width:0;box-sizing:border-box;",j=`${C}width:100%;padding:8px 11px;border:1.5px solid #99f6e4;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;transition:border-color .2s,box-shadow .2s;`,w="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",x="this.style.borderColor='#0d9488';this.style.boxShadow='0 0 0 3px rgba(13,148,136,0.12)'",A="this.style.borderColor='#99f6e4';this.style.boxShadow='none'",b=d.map(D=>`<option value="${Utils.escapeAttr(D.id)}" ${String(l.staffId)===String(D.id)?"selected":""}>${Utils.escapeHTML(D.name)}</option>`).join(""),U=s&&r.length===0?this._renderAttendanceTableLoadingRow(10):r.length?r.map(D=>`
            <tr>
                <td>${Utils.escapeHTML(D.userName||"\u2014")}</td>
                <td>${Utils.escapeHTML(D.userEmail||"\u2014")}</td>
                <td>${Utils.escapeHTML(this.getStaffRoleLabel(D.staffRole))}</td>
                <td>${Utils.escapeHTML(D.date||"\u2014")}</td>
                <td>${D.checkIn?Utils.formatDateTime?Utils.formatDateTime(D.checkIn):Utils.escapeHTML(String(D.checkIn)):"\u2014"}</td>
                <td>${D.checkOut?Utils.formatDateTime?Utils.formatDateTime(D.checkOut):Utils.escapeHTML(String(D.checkOut)):"\u2014"}</td>
                <td>${Utils.escapeHTML(String(D.workDuration||"\u2014"))}</td>
                <td><span class="badge ${this.getAttendanceStatusBadgeClass(D.status)}">${Utils.escapeHTML(this.getAttendanceStatusLabel(D.status))}</span></td>
                <td class="text-xs text-gray-500">${Utils.escapeHTML(String(D.sessionId||"\u2014").slice(0,18))}</td>
                <td>${this._renderAttendancePunchActions(D)}</td>
            </tr>
        `).join(""):'<tr><td colspan="10" class="text-center text-gray-500 py-8"><i class="fas fa-calendar-times ml-2 opacity-60"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631</td></tr>',q=v?c.length?c.map(D=>{const $=String(D.isActive||"true").toLowerCase()!=="false";return`<tr>
                <td>${Utils.escapeHTML(D.userName||"\u2014")}</td>
                <td>${Utils.escapeHTML(this.getStaffRoleLabel(D.staffRole))}</td>
                <td>${$?'<span class="badge badge-success">\u0646\u0634\u0637</span>':'<span class="badge badge-secondary">\u0645\u0648\u0642\u0648\u0641</span>'}</td>
                <td>
                    <button type="button" class="btn-icon btn-icon-warning" title="${$?"\u0625\u064A\u0642\u0627\u0641":"\u062A\u0641\u0639\u064A\u0644"}" onclick="Clinic.toggleClinicStaffActive('${Utils.escapeAttr(D.id)}', ${!$})"><i class="fas fa-${$?"pause":"play"}"></i></button>
                    <button type="button" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641" onclick="Clinic.deleteClinicStaffMember('${Utils.escapeAttr(D.id)}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`}).join(""):'<tr><td colspan="4" class="text-center text-gray-500 py-4">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u0626\u0648\u0644\u0648\u0646 \u2014 \u0623\u0636\u0641 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</td></tr>':"",F=[{id:"clinic-attendance-section-records",label:"\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631",icon:"fa-clipboard-user"},{id:"clinic-staff-activities-section",label:"\u0646\u0634\u0627\u0637 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646",icon:"fa-history"},{id:"clinic-leave-balances-section",label:"\u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A",icon:"fa-wallet"},{id:"clinic-approved-timeoff-section",label:"\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629",icon:"fa-check-circle"}];v&&F.push({id:"clinic-attendance-section-staff",label:"\u0645\u0633\u0626\u0648\u0644\u0648 \u0627\u0644\u0639\u064A\u0627\u062F\u0629",icon:"fa-users"}),a.innerHTML=`
            <style>
                @media (max-width:900px){#clinic-attendance-filter-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;}}
                @media (max-width:520px){#clinic-attendance-filter-grid{grid-template-columns:1fr!important;}}
            </style>
            <div id="clinic-attendance-root" style="font-family:inherit;">
                ${this.renderAttendanceQuickNav(F)}
                <!-- KPI -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:10px;margin-bottom:14px;">
                    ${[{label:"\u062D\u0627\u0636\u0631\u0648\u0646 \u0627\u0644\u064A\u0648\u0645",value:g,icon:"fa-user-check",color:"#059669",bg:"#ecfdf5"},{label:"\u0628\u062F\u0648\u0646 \u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C",value:y,icon:"fa-door-open",color:"#d97706",bg:"#fffbeb"},{label:"\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0641\u0644\u062A\u0631",value:r.length,icon:"fa-filter",color:"#2563eb",bg:"#eff6ff"},{label:"\u0645\u0633\u0626\u0648\u0644\u0648\u0646 \u0646\u0634\u0637\u0648\u0646",value:f.length,icon:"fa-users",color:"#4f46e5",bg:"#eef2ff"}].map(D=>`
                        <div style="background:${D.bg};border:1px solid rgba(0,0,0,0.04);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;">
                            <div style="width:40px;height:40px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
                                <i class="fas ${D.icon}" style="color:${D.color};font-size:1rem;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-size:0.72rem;color:#64748b;font-weight:600;">${D.label}</p>
                                <p style="margin:2px 0 0;font-size:1.45rem;font-weight:800;color:${D.color};line-height:1.1;">${D.value}</p>
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
                            <p style="margin:0;font-size:0.72rem;opacity:0.88;">\u062A\u0633\u062C\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A \u0639\u0646\u062F \u0627\u0644\u062F\u062E\u0648\u0644 \u0648\u0627\u0644\u062E\u0631\u0648\u062C \u2022 ${s&&r.length===0?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...":`${m.length} \u0633\u062C\u0644 \u0625\u062C\u0645\u0627\u0644\u064A`}</p>
                        </div>
                    </div>
                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                        <span style="font-size:0.72rem;opacity:0.9;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                        ${["today","week","month","all"].map(D=>{const $=h===D;return`<button type="button" class="clinic-attendance-period-btn" data-period="${D}" style="padding:5px 11px;border-radius:8px;border:none;cursor:pointer;font-size:0.74rem;font-weight:600;transition:all .2s;background:${$?"#fff":"rgba(255,255,255,0.14)"};color:${$?"#134e4a":"#fff"};">${I[D]}</button>`}).join("")}
                        <button type="button" id="clinic-attendance-toggle-filters" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.35);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;">
                            <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span>
                            ${M?`<span style="background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 6px;border-radius:10px;">${M}</span>`:""}
                        </button>
                        <button type="button" id="clinic-attendance-refresh-btn" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.14);color:#fff;font-size:0.76rem;" title="\u062A\u062D\u062F\u064A\u062B \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645"><i class="fas fa-sync-alt${s?" fa-spin":""}"></i></button>
                        <button type="button" id="clinic-attendance-report-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.92);color:#134e4a;font-size:0.76rem;font-weight:700;display:flex;align-items:center;gap:5px;" title="\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631"><i class="fas fa-file-export"></i><span>\u062A\u0642\u0631\u064A\u0631</span></button>
                        <button type="button" id="clinic-attendance-pdf-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.22);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;" title="PDF \u0644\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A"><i class="fas fa-file-pdf"></i><span>PDF</span></button>
                        <button type="button" id="clinic-attendance-export-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.22);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;" title="Excel \u0644\u0644\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A"><i class="fas fa-file-excel"></i><span>Excel</span></button>
                        ${v?'<button type="button" id="clinic-attendance-add-punch-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.92);color:#134e4a;font-size:0.76rem;font-weight:700;display:flex;align-items:center;gap:5px;" title="\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062D\u0636\u0648\u0631 \u0623\u0648 \u0628\u0635\u0645\u0629 \u0645\u0641\u0642\u0648\u062F\u0629"><i class="fas fa-fingerprint"></i><span>\u0628\u0635\u0645\u0629 \u0645\u0641\u0642\u0648\u062F\u0629</span></button>':""}
                        ${v?'<button type="button" id="clinic-attendance-add-staff-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:#fff;color:#134e4a;font-size:0.76rem;font-weight:700;display:flex;align-items:center;gap:5px;"><i class="fas fa-user-plus"></i><span>\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u0626\u0648\u0644</span></button>':""}
                    </div>
                </div>

                <!-- \u0644\u0648\u062D\u0629 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 -->
                <div id="clinic-attendance-filter-panel" style="display:${E?"block":"none"};background:#f0fdfa;border:1.5px solid #99f6e4;border-radius:12px;padding:16px 18px;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-sliders-h" style="color:#0d9488;font-size:14px;"></i>
                            <span style="font-weight:700;font-size:0.88rem;color:#134e4a;">\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0628\u062D\u062B</span>
                            ${M?`<span style="background:#ccfbf1;color:#0f766e;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;">${M} \u0646\u0634\u0637</span>`:'<span style="color:#94a3b8;font-size:0.72rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u0644\u0627\u062A\u0631 \u0646\u0634\u0637\u0629</span>'}
                        </div>
                        <button type="button" id="clinic-attendance-reset-filters" style="padding:5px 12px;border-radius:8px;border:1px solid #99f6e4;background:#fff;color:#64748b;font-size:0.74rem;cursor:pointer;font-weight:600;">
                            <i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                        </button>
                    </div>
                    <div id="clinic-attendance-filter-grid" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px 12px;">
                        <div style="grid-column:1/-1;${C}">
                            <label style="${w}"><i class="fas fa-search" style="color:#0d9488;margin-left:4px;"></i>\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0628\u0631\u064A\u062F</label>
                            <input type="search" id="clinic-attendance-search" style="${j}" placeholder="\u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B..." value="${Utils.escapeAttr(l.search||"")}" autocomplete="off" onfocus="${x}" onblur="${A}">
                        </div>
                        <div style="${C}">
                            <label style="${w}"><i class="fas fa-calendar-alt" style="color:#f59e0b;margin-left:4px;"></i>\u0627\u0644\u0634\u0647\u0631</label>
                            <input type="month" id="clinic-attendance-month" style="${j}" value="${Utils.escapeAttr(l.month||"")}" onfocus="${x}" onblur="${A}">
                        </div>
                        <div style="${C}">
                            <label style="${w}"><i class="fas fa-user" style="color:#6366f1;margin-left:4px;"></i>\u0627\u0644\u0645\u0633\u0626\u0648\u0644</label>
                            <select id="clinic-attendance-staff" style="${j}cursor:pointer;" onfocus="${x}" onblur="${A}">
                                <option value="all" ${!l.staffId||l.staffId==="all"?"selected":""}>\u0643\u0644 \u0627\u0644\u0645\u0633\u0626\u0648\u0644\u064A\u0646</option>
                                ${b}
                            </select>
                        </div>
                        <div style="${C}">
                            <label style="${w}"><i class="fas fa-user-tag" style="color:#8b5cf6;margin-left:4px;"></i>\u0627\u0644\u062F\u0648\u0631</label>
                            <select id="clinic-attendance-role" style="${j}cursor:pointer;" onfocus="${x}" onblur="${A}">
                                <option value="all" ${l.staffRole==="all"||!l.staffRole?"selected":""}>\u0643\u0644 \u0627\u0644\u0623\u062F\u0648\u0627\u0631</option>
                                <option value="doctor" ${l.staffRole==="doctor"?"selected":""}>\u0637\u0628\u064A\u0628</option>
                                <option value="nurse" ${l.staffRole==="nurse"?"selected":""}>\u062A\u0645\u0631\u064A\u0636</option>
                                <option value="clinic_officer" ${l.staffRole==="clinic_officer"?"selected":""}>\u0645\u0633\u0626\u0648\u0644 \u0639\u064A\u0627\u062F\u0629</option>
                            </select>
                        </div>
                        <div style="${C}">
                            <label style="${w}"><i class="fas fa-circle-check" style="color:#059669;margin-left:4px;"></i>\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <select id="clinic-attendance-status" style="${j}cursor:pointer;" onfocus="${x}" onblur="${A}">
                                <option value="all" ${l.status==="all"||!l.status?"selected":""}>\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                <option value="present" ${l.status==="present"?"selected":""}>\u062D\u0627\u0636\u0631</option>
                                <option value="partial" ${l.status==="partial"?"selected":""}>\u062E\u0631\u0648\u062C \u062C\u0632\u0626\u064A</option>
                                <option value="absent" ${l.status==="absent"?"selected":""}>\u063A\u0627\u0626\u0628</option>
                            </select>
                        </div>
                        <div style="${C}">
                            <label style="${w}"><i class="fas fa-calendar-day" style="color:#f59e0b;margin-left:4px;"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                            <input type="date" id="clinic-attendance-from" style="${j}" value="${Utils.escapeAttr(l.dateFrom||"")}" onfocus="${x}" onblur="${A}">
                        </div>
                        <div style="${C}">
                            <label style="${w}"><i class="fas fa-calendar-check" style="color:#3b82f6;margin-left:4px;"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                            <input type="date" id="clinic-attendance-to" style="${j}" value="${Utils.escapeAttr(l.dateTo||"")}" onfocus="${x}" onblur="${A}">
                        </div>
                    </div>
                    ${M?`
                    <div style="margin-top:12px;padding-top:10px;border-top:1px dashed #99f6e4;display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
                        <span style="font-size:0.72rem;color:#64748b;font-weight:600;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0645\u0637\u0628\u0651\u0642\u0629:</span>
                        ${l.search?`<span style="background:#fff;border:1px solid #99f6e4;color:#0f766e;padding:3px 8px;border-radius:999px;font-size:0.72rem;">\u0628\u062D\u062B: ${Utils.escapeHTML(String(l.search).slice(0,24))}</span>`:""}
                        ${l.staffRole&&l.staffRole!=="all"?`<span style="background:#fff;border:1px solid #99f6e4;color:#0f766e;padding:3px 8px;border-radius:999px;font-size:0.72rem;">${Utils.escapeHTML(this.getStaffRoleLabel(l.staffRole))}</span>`:""}
                        ${l.staffId&&l.staffId!=="all"?`<span style="background:#fff;border:1px solid #99f6e4;color:#0f766e;padding:3px 8px;border-radius:999px;font-size:0.72rem;">${Utils.escapeHTML((d.find(D=>String(D.id)===String(l.staffId))||{}).name||l.staffId)}</span>`:""}
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
                            <tbody>${U}</tbody>
                        </table>`,"48vh")}
                    </div>
                </div>

                ${this.renderClinicStaffActivitiesSection({showUserColumn:!0,activities:S,loading:L,title:"\u0646\u0634\u0627\u0637 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645"})}

                ${this.renderClinicStaffLeaveBalancesSection({balances:o,loading:n,month:i.month,year:i.year})}

                ${this.renderApprovedTimeOffRequestsSection(o,i.month)}

                ${v?`
                <div class="content-card mt-4" id="clinic-attendance-section-staff">
                    <div class="card-header" style="padding:14px 18px;border-bottom:1px solid #f1f5f9;">
                        <h4 style="margin:0;font-size:0.95rem;font-weight:700;color:#134e4a;"><i class="fas fa-users ml-2" style="color:#0d9488;"></i>\u0642\u0627\u0626\u0645\u0629 \u0645\u0633\u0626\u0648\u0644\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0629</h4>
                    </div>
                    <div class="card-body" style="padding:0;">
                        ${this._clinicAttendanceScrollTable(`<table class="data-table">
                            <thead><tr><th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u062F\u0648\u0631</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th></tr></thead>
                            <tbody>${q}</tbody>
                        </table>`)}
                    </div>
                </div>`:""}
            </div>`;const _=()=>{const D=document.getElementById("clinic-attendance-month")?.value||"";let $=document.getElementById("clinic-attendance-from")?.value||"",k=document.getElementById("clinic-attendance-to")?.value||"";if(D&&!$&&!k){const O=this._getAttendanceMonthRange(D);$=O.dateFrom,k=O.dateTo}else{const O=this._normalizeAttendanceDateRange($,k);$=O.dateFrom,k=O.dateTo}return{search:document.getElementById("clinic-attendance-search")?.value||"",staffRole:document.getElementById("clinic-attendance-role")?.value||"all",status:document.getElementById("clinic-attendance-status")?.value||"all",staffId:document.getElementById("clinic-attendance-staff")?.value||"all",month:D,dateFrom:$,dateTo:k,period:this.state.filters.attendance?.period||"all"}},P=()=>{this.state.filters.attendance=_.call(this),this.renderAttendanceTab({force:!0})},z=D=>{const $=this._getTodayLocalKey();let k="",O="";if(D==="today")k=$,O=$;else if(D==="week"){const N=new Date;N.setDate(N.getDate()-6),k=this._attendanceDayKey(N),O=$}else if(D==="month"){const N=new Date;N.setDate(N.getDate()-29),k=this._attendanceDayKey(N),O=$}this.state.filters.attendance=Object.assign({},this.state.filters.attendance||{},{period:D,month:"",dateFrom:k,dateTo:O}),this.renderAttendanceTab({force:!0})},R=a.querySelector("#clinic-attendance-search");if(R?.addEventListener("input",D=>{this._attendanceSearchFocused=!0,this._attendanceSearchCursor=D.target.selectionStart,clearTimeout(this._attendanceSearchTimer),this._attendanceSearchTimer=setTimeout(P,280)}),R?.addEventListener("focus",()=>{this._attendanceSearchFocused=!0}),R?.addEventListener("blur",()=>{this._attendanceSearchFocused=!1}),a.querySelector("#clinic-attendance-role")?.addEventListener("change",P),a.querySelector("#clinic-attendance-status")?.addEventListener("change",P),a.querySelector("#clinic-attendance-staff")?.addEventListener("change",P),a.querySelector("#clinic-attendance-month")?.addEventListener("change",()=>{const D=document.getElementById("clinic-attendance-month")?.value||"",$=D?this._getAttendanceMonthRange(D):{dateFrom:"",dateTo:""};this.state.filters.attendance=Object.assign({},_.call(this),{month:D,dateFrom:$.dateFrom,dateTo:$.dateTo,period:"monthPick"}),P()}),a.querySelector("#clinic-attendance-from")?.addEventListener("change",()=>{this.state.filters.attendance=Object.assign({},_.call(this),{month:"",period:"custom"}),P()}),a.querySelector("#clinic-attendance-to")?.addEventListener("change",()=>{this.state.filters.attendance=Object.assign({},_.call(this),{month:"",period:"custom"}),P()}),a.querySelector("#clinic-attendance-reset-filters")?.addEventListener("click",()=>{this.state.filters.attendance={search:"",staffRole:"all",status:"all",staffId:"all",month:"",dateFrom:"",dateTo:"",period:"all"},this.renderAttendanceTab({force:!0})}),a.querySelector("#clinic-attendance-toggle-filters")?.addEventListener("click",()=>{this.state.attendanceFilterPanelOpen=!E;const D=a.querySelector("#clinic-attendance-filter-panel");D&&(D.style.display=this.state.attendanceFilterPanelOpen?"block":"none")}),a.querySelectorAll(".clinic-attendance-period-btn").forEach(D=>{D.addEventListener("click",()=>z(D.dataset.period||"all"))}),a.querySelector("#clinic-attendance-export-btn")?.addEventListener("click",()=>this.exportAttendanceToExcel()),a.querySelector("#clinic-attendance-pdf-btn")?.addEventListener("click",()=>this.exportAttendanceToPDF()),a.querySelector("#clinic-attendance-report-btn")?.addEventListener("click",()=>this.showAttendanceReportModal()),a.querySelector("#clinic-attendance-add-staff-btn")?.addEventListener("click",()=>this.showAddClinicStaffModal()),a.querySelector("#clinic-attendance-add-punch-btn")?.addEventListener("click",()=>this.showAddMissingAttendanceModal()),a.querySelector("#clinic-attendance-refresh-btn")?.addEventListener("click",async()=>{Notification?.info?.("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631..."),this._attendanceDataFetchedInSession=!1,await this.loadClinicAttendanceData(!0),this._attendanceDataFetchedInSession=!0,this.renderAttendanceTab({force:!0}),Notification?.success?.("\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}),this.bindClinicStaffActivitiesEvents(a),this.bindClinicStaffLeaveBalanceEvents(a),this.bindAttendanceQuickNav(a),this.initAttendanceTableScroll(a),this._attendanceSearchFocused&&R){R.focus();const D=this._attendanceSearchCursor;if(D!=null&&typeof R.setSelectionRange=="function")try{R.setSelectionRange(D,D)}catch{}}},hasTabAccess(t){const e=AppState.currentUser;if(!e)return!1;if(this.isCurrentUserAdmin())return!0;if(t==="attendance")return this.canAccessAttendanceTab();if(typeof Permissions<"u"){if(t==="data-analysis"){const a=["data-analysis","analytics","analysis","dataAnalysis","data_analysis"];if(typeof Permissions.hasAccess=="function"&&!Permissions.hasAccess("clinic"))return!1;if(a.some(o=>Permissions.hasDetailedPermission("clinic",o)))return!0;const n=(typeof Permissions.getEffectivePermissions=="function"?Permissions.getEffectivePermissions(e):null)?.clinicPermissions,i=o=>o===!0||o===1||String(o||"").trim().toLowerCase()==="true";return!!n&&typeof n=="object"&&a.some(o=>i(n[o]))}if(!Permissions.hasDetailedPermission("clinic",t))return!1}return!0},renderUI(){const t=document.getElementById("clinic-section");if(!t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u0642\u0633\u0645 clinic-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}const e=AppState.appData;if(!e){t.innerHTML='<div class="content-card"><div class="card-body"><p class="text-gray-600">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div></div>';return}const a=this.getMedications().length,s=this.getSickLeaves().length,n=this.getInjuries().length,i=(e.clinicVisits||[]).length,o=this.isCurrentUserAdmin();this.state.activeTab==="attendance"&&!this.canAccessAttendanceTab()&&(this.state.activeTab=this.hasTabAccess("visits")?"visits":this.hasTabAccess("medications")?"medications":"visits"),t.innerHTML=`
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
                        <p class="text-2xl font-bold">${i}</p>
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
                        <p class="text-2xl font-bold">${s}</p>
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
        `,this.applyModuleI18n(t),this.renderTabNavigation(),this.renderActiveTabContent(),this.bindTabEvents();const l=document.getElementById("clinic-refresh-btn");l&&l.addEventListener("click",()=>this.refresh());const r=document.getElementById("clinic-register-visit-btn");r&&r.addEventListener("click",()=>{r.disabled||(r.disabled=!0,this.showVisitForm(null,r))});const c=document.getElementById("clinic-visit-types-settings-btn");c&&c.addEventListener("click",()=>this.showVisitTypesSettingsModal());const d=document.getElementById("clinic-contractor-jobs-settings-btn");d&&d.addEventListener("click",()=>this.showContractorJobTitlesSettingsModal()),typeof UI<"u"&&UI.addNavigationIconsAfterRender?UI.addNavigationIconsAfterRender("clinic"):typeof UI<"u"&&UI.addNavigationIcons&&(setTimeout(()=>{UI.addNavigationIcons(t,"clinic")},0),setTimeout(()=>{UI.addNavigationIcons(t,"clinic")},100))},async renderDispensedMedicationsTab(){const t=document.querySelector('.clinic-tab-panel[data-tab-panel="dispensed-medications"]');if(!t){Utils.safeWarn("\u26A0\uFE0F \u0644\u0648\u062D\u0629 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(!this.isCurrentUserAdmin()){t.innerHTML='<div class="text-center py-8 text-gray-500">\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646 \u0641\u0642\u0637</div>';return}const{t:e}=this.getTranslations();this.ensureData();const a=AppState.appData.clinicVisits&&AppState.appData.clinicVisits.length>0;if((!a||a&&AppState.appData.clinicVisits.some(p=>{const m=this.normalizeVisitMedications(p.medications);return(!m||m.length===0)&&(p.medicationsDispensed||p.medicationsDispensedQty&&p.medicationsDispensedQty>0)}))&&typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){t.innerHTML='<div class="text-center py-8 text-gray-500"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div>';try{await this.loadVisitsDataFromBackend(),this.ensureData(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629")}catch(p){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0644\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629:",p.message),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),this.ensureData()}}const n=AppState.appData.clinicVisits||[],i=[];let o=!1;if(n.forEach(p=>{if(!p||typeof p!="object")return;let m=this.normalizeVisitMedications(p.medications);if((!m||m.length===0)&&p.medicationsDispensed&&(m=this.normalizeVisitMedications(p.medicationsDispensed),m&&m.length>0&&(p.medications=m,o=!0,AppState.debugMode&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 medicationsDispensed \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0644\u0632\u064A\u0627\u0631\u0629 ${p.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}:`,m.length,"\u062F\u0648\u0627\u0621"))),(!m||m.length===0)&&p.medicationsDispensedQty&&p.medicationsDispensedQty>0){const u=parseInt(p.medicationsDispensedQty,10)||0;u>0&&(m=[{medicationName:p.medicationsDispensed||"\u062F\u0648\u0627\u0621 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F",quantity:u,unit:"\u0648\u062D\u062F\u0629",notes:""}],p.medications=m,o=!0,AppState.debugMode&&Utils.safeWarn(`\u26A0\uFE0F \u0632\u064A\u0627\u0631\u0629 ${p.id||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"} \u0644\u062F\u064A\u0647\u0627 medicationsDispensedQty=${u} \u0648\u0644\u0643\u0646 \u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0627\u0626\u0645\u0629 \u0623\u062F\u0648\u064A\u0629. \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0641\u062A\u0631\u0627\u0636\u064A.`))}m&&m.length>0&&m.forEach(u=>{if(u&&(u.medicationName||u.name)){const g=p.factoryName||this.getVisitFactoryDisplayName(p)||"-",y=p.employeeLocation||p.workArea||p.location||"-";i.push({visitId:p.id,visitDate:p.visitDate||p.createdAt,employeeName:p.employeeName||p.contractorName||p.contractorWorkerName||p.externalName||"",employeeCode:p.employeeCode||p.employeeNumber||"",employeeDepartment:p.employeeDepartment||p.department||"",factory:g,location:y,personType:p.personType||(p.contractorName||p.externalName?"contractor":"employee"),medicationName:u.medicationName||u.name||"",quantity:u.quantity!==null&&u.quantity!==void 0?parseInt(u.quantity,10):0,unit:u.unit||"\u0648\u062D\u062F\u0629",notes:u.notes||""})}})}),o&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save(),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u062D\u0644\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0639")}catch(p){AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u062D\u0644\u064A\u0627\u064B:",p.message)}if(AppState.debugMode){const p=i.filter(u=>u.personType==="employee"||!u.personType).length,m=i.filter(u=>u.personType==="contractor").length;Utils.safeLog(`\u2705 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629: ${i.length} \u062F\u0648\u0627\u0621 \u0645\u0646 ${n.length} \u0632\u064A\u0627\u0631\u0629 (${p} \u0645\u0648\u0638\u0641\u060C ${m} \u0645\u0642\u0627\u0648\u0644)`)}i.sort((p,m)=>{const u=new Date(p.visitDate);return new Date(m.visitDate)-u});const l=i.map(p=>{let m=p.visitDate||p.createdAt||"";if(m)try{const E=new Date(m);isNaN(E.getTime())&&(m=p.createdAt||"")}catch{m=p.createdAt||""}const u=this.formatDate(m,!0),g=this.getMedications().find(E=>E.name===p.medicationName||E.name?.toLowerCase()===p.medicationName?.toLowerCase()),y=g?.type||"-",v=g?this.calculateMedicationStatus(g):null,S=v?`<span class="badge ${this.getMedicationStatusClasses(v.status)}">${v.status}</span>`:"-",L=v?.status||"\u0633\u0627\u0631\u064A";return`
                <tr class="${this.getMedicationRowClass(L)}">
                    <td>${u}</td>
                    <td>${Utils.escapeHTML(p.employeeCode)}</td>
                    <td>${Utils.escapeHTML(p.employeeName)}</td>
                    <td>${Utils.escapeHTML(p.employeeDepartment)}</td>
                    <td>${Utils.escapeHTML(p.factory||"-")}</td>
                    <td>${Utils.escapeHTML(p.location||"-")}</td>
                    <td>${Utils.escapeHTML(p.medicationName)}</td>
                    <td>${Utils.escapeHTML(y)}</td>
                    <td class="text-center">${p.quantity} ${Utils.escapeHTML(p.unit)}</td>
                    <td class="text-center">${S}</td>
                    <td>${Utils.escapeHTML(p.notes||"-")}</td>
                    <td class="text-center">
                        <button type="button" class="btn-icon btn-icon-primary" data-action="view-visit" data-id="${Utils.escapeHTML(p.visitId||"")}" title="\u0639\u0631\u0636 \u0627\u0644\u0632\u064A\u0627\u0631\u0629">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `}).join(""),r=i.length?`
                <div class="mb-4 flex items-center justify-between">
                    <h3 class="text-lg font-semibold">${e("tab.dispensedLog")||"Dispensed Medications Log"}</h3>
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
                                <th>${e("table.dispenseDate")}</th>
                                <th>${e("table.employeeCode")}</th>
                                <th>${e("table.patientName")}</th>
                                <th>${e("table.department")}</th>
                                <th>${e("table.factory")}</th>
                                <th>${e("table.workplace")}</th>
                                <th>${e("table.medications")}</th>
                                <th>${e("table.medicationType")}</th>
                                <th class="text-center">${e("table.quantity")}</th>
                                <th class="text-center">${e("table.medicationStatus")}</th>
                                <th>${e("table.notes")}</th>
                                <th class="text-center">${e("table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${l}
                        </tbody>
                    </table>
                </div>
            `:this.renderEmptyState("\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u064A\u0629 \u0645\u0646\u0635\u0631\u0641\u0629 \u0645\u0633\u062C\u0644\u0629.");t.innerHTML=r,this.applyModuleI18n(t),setTimeout(()=>{const p=t.querySelector(".clinic-table-wrapper");p&&this.setupTableScrollListeners(p)},100);const c=t.querySelector("#dispensed-med-search");c&&c.addEventListener("input",p=>{const m=p.target.value.toLowerCase();t.querySelectorAll("tbody tr").forEach(g=>{const y=g.textContent.toLowerCase();g.style.display=y.includes(m)?"":"none"})});const d=t.querySelector("#export-dispensed-med-btn");d&&d.addEventListener("click",()=>this.exportDispensedMedicationsToExcel(i));const f=t.querySelector("#export-dispensed-med-pdf-btn");f&&f.addEventListener("click",()=>this.exportDispensedMedicationsToPDF(i)),t.querySelectorAll('[data-action="view-visit"]').forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-id");m&&this.viewVisit(m)})})},exportDispensedMedicationsToExcel(t){if(!t||t.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(typeof XLSX>"u"){Notification?.error?.("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");return}const e=t.map((a,s)=>{let n=a.visitDate||a.createdAt||"";if(n)try{const i=new Date(n);isNaN(i.getTime())&&(n=a.createdAt||"")}catch{n=a.createdAt||""}return{\u0645:s+1,"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641":this.formatDate(n,!0),"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":a.employeeCode,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636":a.employeeName,\u0627\u0644\u0625\u062F\u0627\u0631\u0629:a.employeeDepartment,\u0627\u0644\u0645\u0635\u0646\u0639:a.factory||"-",\u0627\u0644\u0645\u0648\u0642\u0639:a.location||"-","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621":a.medicationName,\u0627\u0644\u0643\u0645\u064A\u0629:a.quantity,\u0627\u0644\u0648\u062D\u062F\u0629:a.unit,\u0645\u0644\u0627\u062D\u0638\u0627\u062A:a.notes||""}});try{const a=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(e);s["!cols"]=[{wch:5},{wch:18},{wch:14},{wch:22},{wch:18},{wch:16},{wch:18},{wch:28},{wch:10},{wch:10},{wch:20}],XLSX.utils.book_append_sheet(a,s,"\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629");const n=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_\u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,n),Notification?.success?.("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",a),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+(a?.message||a))}},async exportDispensedMedicationsToPDF(t){if(!t||t.length===0){Notification?.warning?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}try{Notification?.info?.("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");const{success:e,doc:a}=await this._createClinicPdfWithFont({orientation:"landscape",format:"a4",fontUrl:"https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHqUp.ttf",fontFamily:"Amiri"});if(!e||!a)throw new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 PDF \u0623\u0648 \u0627\u0644\u062E\u0637 \u0627\u0644\u0639\u0631\u0628\u064A");const s=8,n=a.internal.pageSize.getWidth(),i=a.internal.pageSize.getHeight(),o=n/2,l=AppState?.companySettings?.name||AppState?.companySettings?.companyName||"\u0634\u0631\u0643\u0629",r=AppState?.companySettings?.secondaryName||"",c=AppState?.companySettings?.address||"",d=AppState?.companySettings?.phone||"",f=AppState?.companySettings?.email||"",p=AppState?.companySettings?.formVersion||"1.0",m=AppState?.companyLogo||"",u=`CLINIC-DISP-${new Date().toISOString().slice(0,10)}`,g=new Date().toLocaleDateString("ar-SA");let y=8;if(m)try{a.addImage(m,"PNG",s,y-1,15,10)}catch{}const v=s+(m?18:0);a.setFontSize(10),a.setTextColor(15,23,42),a.text(l,v,y+3),r&&(a.setFontSize(7),a.setTextColor(107,114,128),a.text(r,v,y+9));const S=[c,d,f].filter(Boolean).join(" | ");S&&(a.setFontSize(5),a.setTextColor(148,163,184),a.text(S,v,r?y+15:y+9)),a.setFontSize(12),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",n-s,y+3,{align:"right"}),a.setFontSize(5),a.setTextColor(148,163,184),a.text(u,n-s,y+9,{align:"right"});const L=S?r?y+21:y+15:r?y+15:y+9;a.setDrawColor(0,56,101),a.setLineWidth(.6),a.line(s,L,n-s,L),y=L+4,a.setFillColor(0,56,101),a.rect(0,y,n,8,"F"),a.setFontSize(7),a.setTextColor(255),a.text(l,s,y+5.5),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,y+5.5,{align:"center"}),y+=12,a.setFontSize(14),a.setTextColor(0,56,101),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,y,{align:"center"}),a.setFontSize(7),a.setTextColor(100),a.text(`\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u0631\u064A\u0631: ${g}`,s,y+7),a.text(`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${t.length}`,n-s,y+7,{align:"right"}),y+=11,a.setFillColor(227,242,253),a.setDrawColor(220),a.setLineWidth(.3),a.roundedRect(s,y,80,13,2,2,"FD"),a.setFillColor(21,101,192),a.rect(s,y,1.5,13,"F"),a.setFontSize(6),a.setTextColor(21,101,192),a.text("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A",s+4,y+4.5),a.setFontSize(11),a.setTextColor(13,71,161),a.text(String(t.length),s+76,y+11,{align:"right"}),y+=18;const M=h=>{let I=h.visitDate||h.createdAt||"";if(I)try{isNaN(new Date(I).getTime())&&(I=h.createdAt||"")}catch{I=h.createdAt||""}return this.formatDate(I,!0)};a.autoTable({startY:y,head:[["\u0645","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641","\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A","\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636","\u0627\u0644\u0625\u062F\u0627\u0631\u0629","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0627\u0621","\u0627\u0644\u0643\u0645\u064A\u0629","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"]],body:t.map((h,I)=>[I+1,M(h),h.employeeCode||"",h.employeeName||"",h.employeeDepartment||"",h.factory||"-",h.location||"-",h.medicationName||"",(h.quantity||"")+" "+(h.unit||""),h.notes||"-"]),styles:{font:"Amiri",fontSize:7,cellPadding:1.5,halign:"right"},headStyles:{fillColor:[0,56,101],textColor:255,fontSize:7,halign:"center"},alternateRowStyles:{fillColor:[245,247,250]},columnStyles:{0:{halign:"center",cellWidth:8},8:{halign:"center",cellWidth:18}},margin:{left:s,right:s},didDrawPage:function(h){const I=a.internal.getNumberOfPages();a.setFillColor(0,56,101),a.rect(0,0,n,6,"F"),a.setFontSize(6),a.setTextColor(255),a.text("\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629",o,4.5,{align:"center"}),a.setDrawColor(0,56,101),a.setLineWidth(.3),a.line(s,i-9,n-s,i-9),a.setFontSize(5.5),a.setTextColor(148,163,184),a.text(`\u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${p}`,s,i-5),a.text(u,o,i-5,{align:"center"}),a.text(`${g} | \u0635\u0641\u062D\u0629 ${I}`,n-s,i-5,{align:"right"})}});const E=`\u0633\u062C\u0644_\u0627\u0644\u0623\u062F\u0648\u064A\u0629_\u0627\u0644\u0645\u0646\u0635\u0631\u0641\u0629_${new Date().toISOString().slice(0,10)}.pdf`;a.save(E),Notification?.success?.(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (${t.length} \u0633\u062C\u0644)`)}catch(e){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u062A\u062C\u0631\u0628\u0629 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",e),this._fallbackPrintDispensedMedicationsPDF(t)}},_fallbackPrintDispensedMedicationsPDF(t){const e=t.map((o,l)=>{let r=o.visitDate||o.createdAt||"";if(r)try{const d=new Date(r);isNaN(d.getTime())&&(r=o.createdAt||"")}catch{r=o.createdAt||""}const c=this.formatDate(r,!0);return`<tr>
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
        </tr></thead><tbody>${e}</tbody></table>`,i=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(a,s,n,!1,!0,{source:"ClinicDispensedMeds"},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${s}</title></head><body>${n}</body></html>`;try{const o=new Blob([i],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(o),r=window.open(l,"_blank");r?r.onload=()=>{setTimeout(()=>{r.print(),setTimeout(()=>{URL.revokeObjectURL(l)},1e3),Notification?.success?.("\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629/\u0627\u0644\u062D\u0641\u0638 \u0643\u0640 PDF")},250)}:(URL.revokeObjectURL(l),Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"))}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",o),Notification?.error?.("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+(o?.message||o))}},renderSupplyRequestTab(){const t=document.querySelector('.clinic-tab-panel[data-tab-panel="supply-request"]');if(!t)return;this.ensureData(),AppState.appData.clinicSupplyRequests||(AppState.appData.clinicSupplyRequests=[]);const e=AppState.appData.clinicSupplyRequests.filter(i=>i.requestedBy?.id===AppState.currentUser?.id||i.requestedBy?.email===AppState.currentUser?.email).sort((i,o)=>new Date(o.createdAt||o.requestDate)-new Date(i.createdAt||i.requestDate)),a=this.isCurrentUserAdmin(),s=a?AppState.appData.clinicSupplyRequests.sort((i,o)=>new Date(o.createdAt||o.requestDate)-new Date(i.createdAt||i.requestDate)):e;t.innerHTML=`
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
        `,this.applyModuleI18n(t);const n=t.querySelector("#supply-request-form");n&&n.addEventListener("submit",i=>{i.preventDefault(),this.submitSupplyRequest()}),t.querySelectorAll('[data-action="view-request"]').forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-id");this.viewSupplyRequest(o)})}),t.querySelectorAll('[data-action="update-status"]').forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-id"),l=i.getAttribute("data-status");this.updateSupplyRequestStatus(o,l)})}),setTimeout(()=>{const i=t.querySelector(".clinic-table-wrapper");i&&this.setupTableScrollListeners(i)},100)},renderSupplyRequestsList(t,e){return!t||t.length===0?'<p class="text-center text-gray-500 py-8">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A</p>':`
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
                        ${t.map(s=>{const n=this.formatDate(s.createdAt||s.requestDate,!0),i=s.requestedBy?.name||s.requestedByName||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",o=s.status||"pending",l=s.priority||"normal",r={pending:'<span class="badge badge-warning">\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>',approved:'<span class="badge badge-success">\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647</span>',rejected:'<span class="badge badge-danger">\u0645\u0631\u0641\u0648\u0636</span>',fulfilled:'<span class="badge badge-info">\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</span>'}[o]||'<span class="badge">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>',c={urgent:'<span class="badge badge-danger">\u0639\u0627\u062C\u0644\u0629</span>',high:'<span class="badge badge-warning">\u0639\u0627\u0644\u064A\u0629</span>',normal:'<span class="badge badge-info">\u0639\u0627\u062F\u064A\u0629</span>'}[l]||'<span class="badge">\u0639\u0627\u062F\u064A\u0629</span>',d={medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[s.type]||s.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";return`
                <tr>
                    <td>${this.formatDate(s.createdAt||s.requestDate,!0)}</td>
                    <td>${Utils.escapeHTML(i)}</td>
                    <td>${Utils.escapeHTML(d)}</td>
                    <td>${Utils.escapeHTML(s.itemName||"")}</td>
                    <td class="text-center">${s.quantity||""} ${Utils.escapeHTML(s.unit||"")}</td>
                    <td class="text-center">${c}</td>
                    <td class="text-center">${r}</td>
                    <td class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            <button type="button" class="btn-icon btn-icon-primary" data-action="view-request" data-id="${Utils.escapeHTML(s.id||"")}" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${e&&o==="pending"?`
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
        `},async submitSupplyRequest(){const t=document.getElementById("request-type")?.value,e=document.getElementById("item-name")?.value?.trim(),a=parseInt(document.getElementById("quantity")?.value),s=document.getElementById("unit")?.value?.trim()||"\u0648\u062D\u062F\u0629",n=document.getElementById("request-notes")?.value?.trim(),i=document.getElementById("priority")?.value||"normal";if(!t||!e||!a){Notification?.error?.("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}Loading.show();try{const o={id:`REQ-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,type:t,itemName:e,quantity:a,unit:s,notes:n,priority:i,status:"pending",requestedBy:{id:AppState.currentUser?.id,name:AppState.currentUser?.name,email:AppState.currentUser?.email},createdAt:new Date().toISOString(),requestDate:new Date().toISOString()},l=await GoogleIntegration.sendRequest({action:"addSupplyRequest",data:o});if(l&&l.success)AppState.appData.clinicSupplyRequests||(AppState.appData.clinicSupplyRequests=[]),AppState.appData.clinicSupplyRequests.push(o),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D"),this.notifyAdminAboutSupplyRequest(o),this.renderSupplyRequestTab(),this.state.activeTab==="approvals"&&setTimeout(()=>{this.renderApprovalsTab()},500),document.getElementById("supply-request-form")?.reset();else throw new Error(l?.message||"\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628")}catch(o){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C:",o),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628: "+(o.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},viewSupplyRequest(t){const e=AppState.appData.clinicSupplyRequests?.find(n=>n.id===t);if(!e){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
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
                            <p class="text-gray-800">${this.formatDate(e.createdAt||e.requestDate,!0)}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0642\u062F\u0645</label>
                            <p class="text-gray-800">${Utils.escapeHTML(e.requestedBy?.name||e.requestedByName||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</label>
                            <p class="text-gray-800">${Utils.escapeHTML({medication:"\u0623\u062F\u0648\u064A\u0629",equipment:"\u0623\u062C\u0647\u0632\u0629 \u0637\u0628\u064A\u0629",supplies:"\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0637\u0628\u064A\u0629",other:"\u0623\u062E\u0631\u0649"}[e.type]||e.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631</label>
                            <p class="text-gray-800">${Utils.escapeHTML(e.itemName||"")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u0643\u0645\u064A\u0629</span>
                            <p class="text-gray-800">${e.quantity||""} ${Utils.escapeHTML(e.unit||"")}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label>
                            <p class="text-gray-800">${Utils.escapeHTML({urgent:"\u0639\u0627\u062C\u0644\u0629",high:"\u0639\u0627\u0644\u064A\u0629",normal:"\u0639\u0627\u062F\u064A\u0629"}[e.priority]||"\u0639\u0627\u062F\u064A\u0629")}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629</span>
                            <p class="text-gray-800">${Utils.escapeHTML({pending:"\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631",approved:"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",rejected:"\u0645\u0631\u0641\u0648\u0636",fulfilled:"\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"}[e.status]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</p>
                        </div>
                    </div>
                    ${e.notes?`
                    <div>
                        <label class="text-sm font-semibold text-gray-600">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                        <p class="text-gray-800 whitespace-pre-line">${Utils.escapeHTML(e.notes)}</p>
                    </div>
                    `:""}
                </div>
                <div class="modal-footer form-actions-centered">
                    <button type="button" class="btn-secondary modal-close-btn">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(a);const s=()=>a.remove();a.querySelectorAll(".modal-close, .modal-close-btn").forEach(n=>n.addEventListener("click",s)),a.addEventListener("click",n=>{n.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&s()})},updateSupplyRequestStatus(t,e){const a=AppState.appData.clinicSupplyRequests?.find(n=>n.id===t);if(!a){Notification?.error?.("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628");return}a.status=e,a.updatedAt=new Date().toISOString(),a.updatedBy={id:AppState.currentUser?.id,name:AppState.currentUser?.name,email:AppState.currentUser?.email},typeof DataManager<"u"&&DataManager.save&&DataManager.save();const s={approved:"\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",rejected:"\u0645\u0631\u0641\u0648\u0636",fulfilled:"\u062A\u0645 \u0627\u0644\u062A\u0646\u0641\u064A\u0630"}[e]||e;Notification?.success?.(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628 \u0625\u0644\u0649: ${s}`),this.renderSupplyRequestTab()},showEnhancedVisitForm(t=null){if(typeof this.showVisitForm=="function")return this.showVisitForm(t);const e=!!t;this.ensureData();const a=document.createElement("div");a.className="modal-overlay";const s=t?.personType||"employee",n=t?.visitDate?Utils.toDateTimeLocalString(t.visitDate):Utils.toDateTimeLocalString(new Date),i=t?.exitDate?Utils.toDateTimeLocalString(t.exitDate):"",o=new Date;o.setHours(0,0,0,0);const l=(AppState.appData.clinicVisits||[]).filter(u=>{if(!u.visitDate)return!1;try{const g=new Date(u.visitDate);return g.setHours(0,0,0,0),g.getTime()===o.getTime()}catch{return!1}}).length,r=new Date;r.setDate(1),r.setHours(0,0,0,0);const c=(AppState.appData.clinicVisits||[]).filter(u=>{if(!u.visitDate)return!1;try{return new Date(u.visitDate)>=r}catch{return!1}}).length;a.innerHTML=`
            <div class="modal-content" style="max-width: 1400px; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); display: flex; flex-direction: column; height: 90vh;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px 30px; border-radius: 20px 20px 0 0; flex-shrink: 0;">
                    <h2 class="modal-title" style="color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-hospital-user" style="font-size: 28px;"></i>
                        ${e?"\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0632\u064A\u0627\u0631\u0629":"\u062A\u0633\u062C\u064A\u0644 \u0632\u064A\u0627\u0631\u0629 \u062C\u062F\u064A\u062F\u0629 \u0644\u0644\u0639\u064A\u0627\u062F\u0629"}
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
                                    <input type="text" id="enhanced-visit-employee-code" class="form-input" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A" value="${Utils.escapeHTML(t?.employeeCode||t?.employeeNumber||"")}" autocomplete="off" autocorrect="off" spellcheck="false" inputmode="text" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px; transition: all 0.3s;">
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-employee-name" class="block text-sm font-semibold text-gray-700 mb-2" id="enhanced-visit-employee-name-label" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-user text-purple-600"></i>
                                        \u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636 *
                                    </label>
                                    <input type="text" id="enhanced-visit-employee-name" required class="form-input" placeholder="\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" value="${Utils.escapeHTML(t?.employeeName||t?.contractorName||t?.externalName||"")}" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px; transition: all 0.3s;">
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" id="enhanced-visit-employee-details-container">
                                <div>
                                    <label for="enhanced-visit-employee-position" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-briefcase text-purple-600"></i>
                                        \u0627\u0644\u0648\u0638\u064A\u0641\u0629
                                    </label>
                                    <input type="text" id="enhanced-visit-employee-position" class="form-input" placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629" value="${Utils.escapeHTML(t?.employeePosition||"")}" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px;">
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-employee-department" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-building text-purple-600"></i>
                                        \u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629
                                    </label>
                                    <input type="text" id="enhanced-visit-employee-department" class="form-input" placeholder="\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629" value="${Utils.escapeHTML(t?.employeeDepartment||"")}" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px;">
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-factory" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-industry text-purple-600"></i>
                                        \u0627\u0644\u0645\u0635\u0646\u0639
                                    </label>
                                    <select id="enhanced-visit-factory" class="form-input" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px;">
                                        <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 --</option>
                                        ${this.getSiteOptions().map(u=>`
                                            <option value="${u.id}" ${t?.factory===u.id||t?.factory===u.name?"selected":""}>${Utils.escapeHTML(u.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-employee-location" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-map-marker-alt text-purple-600"></i>
                                        \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644 *<span style="font-size: 11px; color: #666; display: block; margin-top: 2px;">\u064A\u064F\u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A\u0629 \u0644\u0644\u0645\u0635\u0646\u0639 \u0623\u0639\u0644\u0627\u0647\u061B \u0627\u0643\u062A\u0628 \u0644\u0644\u0628\u062D\u062B \u0623\u0648 \u0623\u062F\u062E\u0644 \u0646\u0635\u0627\u064B \u064A\u062F\u0648\u064A\u0627\u064B</span>
                                    </label>
                                    <input type="text" id="enhanced-visit-employee-location" required class="form-input" list="enhanced-visit-employee-location-datalist" placeholder="\u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639\u0627\u064B \u0641\u0631\u0639\u064A\u0627\u064B \u0623\u0648 \u0627\u0643\u062A\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0639\u0645\u0644" value="${Utils.escapeHTML(t?.employeeLocation||t?.workArea||"")}" autocomplete="off" autocorrect="off" spellcheck="false" inputmode="text" style="border: 2px solid #667eea; border-radius: 10px; padding: 12px;">
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
                                        ${(e&&!t?.visitType?["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"]:[]).map(u=>`<option value="${Utils.escapeHTML(u)}" selected>${Utils.escapeHTML(u)}</option>`).join("")}
                                        ${this.getVisitTypeOptions().map(u=>`<option value="${Utils.escapeHTML(u)}" ${(t?.visitType||"")===u?"selected":""}>${Utils.escapeHTML(u)}</option>`).join("")}
                                    </select>
                                </div>
                                <div>
                                    <label for="enhanced-visit-reason" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-question-circle text-blue-600"></i>
                                        \u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 *
                                    </label>
                                    <input type="text" id="enhanced-visit-reason" required class="form-input" placeholder="\u0633\u0628\u0628 \u0627\u0644\u0632\u064A\u0627\u0631\u0629" value="${Utils.escapeHTML(t?.reason||"")}" style="border: 2px solid #4facfe; border-radius: 10px; padding: 12px;">
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-diagnosis" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-diagnoses text-blue-600"></i>
                                        \u0627\u0644\u062A\u0634\u062E\u064A\u0635
                                    </label>
                                    <textarea id="enhanced-visit-diagnosis" rows="3" class="form-input" placeholder="\u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u0637\u0628\u064A" style="border: 2px solid #4facfe; border-radius: 10px; padding: 12px;">${Utils.escapeHTML(t?.diagnosis||"")}</textarea>
                                </div>
                                
                                <div>
                                    <label for="enhanced-visit-treatment" class="block text-sm font-semibold text-gray-700 mb-2" style="display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-pills text-blue-600"></i>
                                        \u0627\u0644\u0639\u0644\u0627\u062C / \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630
                                    </label>
                                    <textarea id="enhanced-visit-treatment" rows="3" class="form-input" placeholder="\u0627\u0644\u0639\u0644\u0627\u062C \u0623\u0648 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u062A\u062E\u0630" style="border: 2px solid #4facfe; border-radius: 10px; padding: 12px;">${Utils.escapeHTML(t?.treatment||"")}</textarea>
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
                        ${e?"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A":"\u062D\u0641\u0638 \u0627\u0644\u0632\u064A\u0627\u0631\u0629"}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(a),a.addEventListener("click",u=>{u.target===a&&confirm(`\u062A\u0646\u0628\u064A\u0647: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C.
\u0642\u062F \u062A\u0641\u0642\u062F \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638\u0629.

\u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642\u061F`)&&a.remove()});const d=a.querySelector("#enhanced-visit-form"),f=a.querySelector("#enhanced-visit-person-type");f?.addEventListener("change",()=>{const u=f.value,g=a.querySelector("#enhanced-visit-employee-code-container"),y=a.querySelector("#enhanced-visit-employee-details-container"),v=a.querySelector("#enhanced-visit-employee-code"),S=a.querySelector("#enhanced-visit-employee-name"),L=a.querySelector("#enhanced-visit-employee-name-label"),M=a.querySelector("#enhanced-visit-employee-department"),E=a.querySelector("#enhanced-visit-factory");u==="employee"?(g.style.display="block",y.style.display="grid",v.required=!0,S.readOnly=!0,S.placeholder="\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0627\u0633\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B",L.innerHTML='<i class="fas fa-user text-purple-600"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *',M&&(M.readOnly=!0,M.placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0628\u0626\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B"),E&&(E.style.display="block")):(g.style.display="none",y.style.display="none",v.required=!1,S.readOnly=!1,S.placeholder=u==="contractor"?"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644",L.innerHTML=`<i class="fas fa-user text-purple-600"></i> ${u==="contractor"?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0645\u0644"} *`,M&&(M.readOnly=!1,M.placeholder=""),E&&(E.style.display="none"))}),d?.addEventListener("submit",async u=>{u.preventDefault(),await this.saveEnhancedVisit(t,e,a)}),typeof this.setupClinicWorkplaceDatalist=="function"&&this.setupClinicWorkplaceDatalist("enhanced-visit-factory","enhanced-visit-employee-location","enhanced-visit-employee-location-datalist"),a.querySelectorAll(".sidebar-nav-btn").forEach(u=>{u.addEventListener("click",()=>{const y=parseInt(u.getAttribute("data-section"),10),v=a.querySelectorAll(".form-section");v[y]&&v[y].scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})});const g=u.style.borderColor;u.addEventListener("mouseenter",()=>{u.style.background=g,u.style.color="white",u.style.transform="translateX(-5px)"}),u.addEventListener("mouseleave",()=>{u.style.background="white",u.style.color=g,u.style.transform="translateX(0)"})});const m=a.querySelector('button[type="submit"]');m?.addEventListener("mouseenter",()=>{m.style.transform="translateY(-2px)",m.style.boxShadow="0 6px 20px 0 rgba(102, 126, 234, 0.6)"}),m?.addEventListener("mouseleave",()=>{m.style.transform="translateY(0)",m.style.boxShadow="0 4px 15px 0 rgba(102, 126, 234, 0.4)"})},async saveEnhancedVisit(t,e,a){Loading.show();try{const s=document.getElementById("enhanced-visit-person-type").value,n=document.getElementById("enhanced-visit-employee-code")?.value.trim()||"",i=document.getElementById("enhanced-visit-employee-name").value.trim(),o=document.getElementById("enhanced-visit-employee-position")?.value.trim()||"",l=document.getElementById("enhanced-visit-employee-department")?.value.trim()||"",r=document.getElementById("enhanced-visit-factory")?.value.trim()||null,c=document.getElementById("enhanced-visit-employee-location").value.trim(),d=document.getElementById("enhanced-visit-date").value,f=document.getElementById("enhanced-visit-exit-date").value||null,p=document.getElementById("enhanced-visit-type")?.value?.trim()||null,m=document.getElementById("enhanced-visit-reason").value.trim(),u=document.getElementById("enhanced-visit-diagnosis").value.trim(),g=document.getElementById("enhanced-visit-treatment").value.trim();let y=null;if(r){const b=this.getSiteOptions().find(U=>U.id===r);y=b?b.name:null}let v=null,S=null;if(d&&d.trim())try{const[A,b]=d.split("T");if(A&&b){const[U,q,F]=A.split("-").map(Number),[_,P]=b.split(":").map(Number),z=new Date(U,q-1,F,_,P,0,0);isNaN(z.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",d):v=z.toISOString()}else{const U=new Date(d);isNaN(U.getTime())||(v=U.toISOString())}}catch(A){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062F\u062E\u0648\u0644:",A)}if(f&&f.trim())try{const[A,b]=f.split("T");if(A&&b){const[U,q,F]=A.split("-").map(Number),[_,P]=b.split(":").map(Number),z=new Date(U,q-1,F,_,P,0,0);isNaN(z.getTime())?AppState.debugMode&&Utils.safeWarn("\u26A0\uFE0F \u0642\u064A\u0645\u0629 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629:",f):S=z.toISOString()}else{const U=new Date(f);isNaN(U.getTime())||(S=U.toISOString())}}catch(A){AppState.debugMode&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0648\u064A\u0644 \u0648\u0642\u062A \u0627\u0644\u062E\u0631\u0648\u062C:",A)}if(!AppState.currentUser){Utils.safeError("\u274C \u062E\u0637\u0623: AppState.currentUser \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F! \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u062F\u0648\u0646 \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645."),Notification.error("\u062E\u0637\u0623: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),Loading.hide();return}if(!AppState.currentUser.name&&!AppState.currentUser.email&&!AppState.currentUser.id){Utils.safeError("\u274C \u062E\u0637\u0623: AppState.currentUser \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 name \u0623\u0648 email \u0623\u0648 id!",AppState.currentUser),Notification.error("\u062E\u0637\u0623: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),Loading.hide();return}const L=AppState.currentUser,M=(L?.email||"").toString().toLowerCase().trim(),h=(AppState.appData.users||[]).find(A=>(A.email||"").toString().toLowerCase().trim()===M);let I="";h&&h.name&&h.name.trim()!==""?I=h.name.trim():L?.name&&L.name.trim()!==""?I=L.name.trim():M?I=M:I="\u0645\u0633\u062A\u062E\u062F\u0645";const C=I,j=s==="contractor",w={id:t?.id||Utils.generateId("VISIT"),personType:s,employeeCode:j?null:n,employeeName:j?null:i,employeePosition:j?null:o,employeeDepartment:j?null:l,employeeLocation:j?null:c,contractorName:j?i:null,contractorWorkerName:j?n:null,contractorPosition:j?o:null,factory:r,factoryName:y,workArea:c,visitDate:v,exitDate:S,visitType:p,reason:m,diagnosis:u,treatment:g,medications:[],createdAt:t?.createdAt||new Date().toISOString(),createdBy:I,updatedAt:new Date().toISOString(),updatedBy:C,email:AppState.currentUser?.email||"",userId:AppState.currentUser?.id||""};if(w.createdBy==="\u0627\u0644\u0646\u0638\u0627\u0645"||typeof w.createdBy=="object"&&w.createdBy.name,AppState.debugMode&&(Utils.safeLog("\u{1F50D} formData.createdBy \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0642\u0628\u0644 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 (\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 string):",w.createdBy),Utils.safeLog("\u{1F50D} formData.createdBy type:",typeof w.createdBy)),AppState.appData.clinicVisits||(AppState.appData.clinicVisits=[]),e){const A=AppState.appData.clinicVisits.findIndex(b=>b.id===w.id);A!==-1&&(AppState.appData.clinicVisits[A]=w)}else AppState.appData.clinicVisits.push(w);typeof DataManager<"u"&&DataManager.save&&DataManager.save();try{const A=this.getMonthlyVisitsAlertThreshold(),b=this.getMonthlyVisitCountForPerson(w);if(b>=A){const U=(w.personType||"").toString().toLowerCase()==="employee"?"\u0627\u0644\u0645\u0648\u0638\u0641":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0639\u0627\u0645\u0644";typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062A\u0646\u0628\u064A\u0647: \u0639\u062F\u062F \u0632\u064A\u0627\u0631\u0627\u062A "+U+" \u0644\u0644\u0639\u064A\u0627\u062F\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \u0648\u0635\u0644 \u0623\u0648 \u062A\u062C\u0627\u0648\u0632 "+A+" \u0632\u064A\u0627\u0631\u0629. \u062A\u0645 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),this.notifyAdminsAboutHighClinicVisits(w,b).catch(function(q){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Clinic: \u0641\u0634\u0644 \u0625\u0634\u0639\u0627\u0631 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0639\u0646 \u062A\u062C\u0627\u0648\u0632 \u062A\u0631\u062F\u062F \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A:",q)})}}catch(A){Utils.safeWarn("\u0641\u062D\u0635 \u062A\u0631\u062F\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0629 \u0627\u0644\u0634\u0647\u0631\u064A:",A)}const x=45e3;try{AppState.debugMode&&Utils.safeLog("\u{1F50D} \u0625\u0631\u0633\u0627\u0644 formData \u0625\u0644\u0649 Backend:",{action:e?"updateClinicVisit":"addClinicVisit",createdBy:w.createdBy,createdByType:typeof w.createdBy,createdByName:typeof w.createdBy=="object"?w.createdBy.name:w.createdBy});const A=await GoogleIntegration.sendRequest({action:e?"updateClinicVisit":"addClinicVisit",data:e?{visitId:w.id,updateData:w,__timeoutMs:x}:{...w,__timeoutMs:x}});this.assertClinicVisitRpcResult(A),e||this.applyClinicVisitIdFromServer(w,A),AppState.debugMode&&Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 formData \u0625\u0644\u0649 Backend \u0628\u0646\u062C\u0627\u062D",A),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),this.refreshClinicVisitsFromServerAfterSave()}catch(A){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0632\u064A\u0627\u0631\u0629 (\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0642\u062F \u062A\u0643\u0648\u0646 \u062D\u064F\u0641\u0638\u062A):",A),Loading.hide();try{typeof DataManager<"u"&&DataManager.addToPendingSync&&DataManager.addToPendingSync("ClinicVisits",AppState.appData.clinicVisits)}catch{}try{this.refreshClinicVisitsFromServerAfterSave()}catch{}return}Loading.hide(),Notification.success(`\u062A\u0645 ${e?"\u062A\u062D\u062F\u064A\u062B":"\u062A\u0633\u062C\u064A\u0644"} \u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0628\u0646\u062C\u0627\u062D`),a.remove(),this.state.activeTab==="visits"&&this.renderVisitsTab()}catch(s){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message)}},async handleInjuryAttachmentsChange(t){if(!t||t.length===0)return;const e=Array.from(t),a=["jpg","jpeg","png","pdf"],s=5*1024*1024;for(const i of e){const o=(i.name.split(".").pop()||"").toLowerCase();if(!a.includes(o)){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${i.name} \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645. \u064A\u0633\u0645\u062D \u0628\u0645\u0644\u0641\u0627\u062A JPG \u0623\u0648 PNG \u0623\u0648 PDF \u0641\u0642\u0637.`);continue}if(i.size>s){Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${i.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u0633\u0645\u0648\u062D \u0628\u0647 (5MB).`);continue}try{const l=await this.readFileAsBase64(i);this.state.currentInjuryAttachments.push({id:Utils.generateId("ATT"),name:i.name,type:i.type||this.detectMimeType(i.name),data:l,size:Math.round(i.size/1024),uploadedAt:new Date().toISOString()})}catch(l){Utils.safeError("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641:",l),Notification.error(`\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641 ${i.name}`)}}this.renderInjuryAttachmentsPreview();const n=document.getElementById("injury-attachments-input");n&&(n.value="")},renderInjuryAttachmentsPreview(){const t=document.getElementById("injury-attachments-preview");if(t){if(!this.state.currentInjuryAttachments||this.state.currentInjuryAttachments.length===0){t.innerHTML='<p class="text-sm text-gray-500">\u0644\u0645 \u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642\u0627\u062A \u0628\u0639\u062F</p>';return}t.innerHTML=this.state.currentInjuryAttachments.map((e,a)=>{const s=e.type&&e.type.startsWith("image/"),n=s?"fa-image":"fa-file-pdf",i=e.size||0;return`
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                        <i class="fas ${n} text-blue-600 text-xl"></i>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-800 truncate">${Utils.escapeHTML(e.name)}</p>
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
            `}).join("")}},removeInjuryAttachment(t){t<0||t>=this.state.currentInjuryAttachments.length||(this.state.currentInjuryAttachments.splice(t,1),this.renderInjuryAttachmentsPreview(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0631\u0641\u0642"))},previewAttachment(t){const e=this.state.currentInjuryAttachments[t];if(!e||!e.type||!e.type.startsWith("image/"))return;const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 90vw; max-height: 90vh;">
                <div class="modal-header">
                    <h3 class="modal-title">${Utils.escapeHTML(e.name)}</h3>
                    <button type="button" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="display: flex; align-items: center; justify-content: center; max-height: 70vh; overflow: auto;">
                    <img src="${e.data}" alt="${Utils.escapeHTML(e.name)}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
            </div>
        `,document.body.appendChild(a);const s=a.querySelector(".modal-close");s&&s.addEventListener("click",()=>a.remove()),a.addEventListener("click",n=>{n.target===a&&a.remove()})},readFileAsBase64(t){return new Promise((e,a)=>{const s=new FileReader;s.onload=()=>e(s.result),s.onerror=n=>a(n),s.readAsDataURL(t)})},detectMimeType(t){if(!t)return"application/octet-stream";const e=t.split(".").pop().toLowerCase();return{jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",pdf:"application/pdf"}[e]||"application/octet-stream"},cleanup(){try{Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Clinic module..."),this.state.currentInjuryAttachments=[],this.state.medicationAlertsNotified.clear(),this.state.initialized=!1,Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Clinic module")}catch(t){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 Clinic module:",t)}}};typeof window<"u"&&typeof Clinic<"u"&&(window.Clinic=Clinic),(function(){"use strict";try{typeof window<"u"&&typeof Clinic<"u"&&(window.Clinic=Clinic,window.addEventListener("formSettingsUpdated",function(){try{typeof Clinic<"u"&&Clinic.refreshSiteDropdowns&&Clinic.refreshSiteDropdowns()}catch{}}),Clinic.load,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&(Utils.safeLog("\u2705 Clinic module loaded and available on window.Clinic"),Utils.safeLog("\u2705 Clinic.load function exists: "+(typeof Clinic.load=="function"))))}catch{if(typeof window<"u"&&typeof Clinic<"u")try{window.Clinic=Clinic}catch{}}})();
