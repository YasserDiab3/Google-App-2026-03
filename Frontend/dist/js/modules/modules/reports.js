const Reports={_languageChangeBound:!1,getCurrentLanguage(){try{return localStorage.getItem("language")||typeof AppState<"u"&&AppState.currentLanguage||"ar"}catch{return"ar"}},getTranslations(){const a=this.getCurrentLanguage(),t={ar:{title:"\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",subtitle:"\u0625\u0646\u0634\u0627\u0621 \u0648\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629","card.period":"\u062A\u0642\u0631\u064A\u0631 \u0634\u0647\u0631\u064A / \u0633\u0646\u0648\u064A","card.periodDesc":"\u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0625\u062D\u0635\u0627\u0626\u064A \u0644\u0644\u0641\u062A\u0631\u0629 (\u0634\u0647\u0631\u064A\u0627\u064B \u0623\u0648 \u0633\u0646\u0648\u064A\u0627\u064B) \u064A\u0634\u0645\u0644 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629 \u0648\u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","card.incidents":"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0648\u0627\u062F\u062B","card.incidentsDesc":"\u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 \u0639\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0645\u0633\u062C\u0644\u0629","card.training":"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","card.trainingDesc":"\u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0639\u0646 \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646","card.full":"\u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0634\u0627\u0645\u0644","card.fullDesc":"\u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0634\u0627\u0645\u0644 \u0644\u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645","btn.generate":"\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631","error.load":"\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A","btn.retry":"\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629","msg.noData":"\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629","msg.incidentsInvalid":"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629","msg.trainingInvalid":"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629","msg.unknownReport":"\u0646\u0648\u0639 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641","msg.allowPopups":"\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631","msg.invalidPeriodInput":"\u0635\u064A\u063A\u0629 \u0627\u0644\u0641\u062A\u0631\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.","msg.periodCancelled":"\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0641\u062A\u0631\u0629.","report.incidents":"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0648\u0627\u062F\u062B","report.training":"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","report.full":"\u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0634\u0627\u0645\u0644","report.periodSummary":"\u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A \u0644\u0644\u0641\u062A\u0631\u0629","report.totalIncidents":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B","report.createdDate":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621","report.isoCode":"\u0643\u0648\u062F ISO","report.date":"\u0627\u0644\u062A\u0627\u0631\u064A\u062E","report.location":"\u0627\u0644\u0645\u0648\u0642\u0639","report.severity":"\u0627\u0644\u062E\u0637\u0648\u0631\u0629","report.status":"\u0627\u0644\u062D\u0627\u0644\u0629","report.description":"\u0627\u0644\u0648\u0635\u0641","report.totalPrograms":"\u0625\u062C\u0645\u0627\u0644\u064A \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628","report.programName":"\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","report.trainer":"\u0627\u0644\u0645\u062F\u0631\u0628","report.participantsCount":"\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646","report.generalStats":"\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0629","report.basicStats":"\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629","report.type":"\u0627\u0644\u0646\u0648\u0639","report.total":"\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","report.incidentsRow":"\u0627\u0644\u062D\u0648\u0627\u062F\u062B","report.nearmiss":"\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0648\u0634\u064A\u0643\u0629","report.observations":"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A","report.ptw":"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644","report.trainingPrograms":"\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628","report.violations":"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","report.clinicVisits":"\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629","report.trainingSection":"\u0628\u0646\u062F \u0627\u0644\u062A\u062F\u0631\u064A\u0628","report.indicator":"\u0627\u0644\u0645\u0624\u0634\u0631","report.value":"\u0627\u0644\u0642\u064A\u0645\u0629","report.traineesCount":"\u0639\u062F\u062F \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646","report.avgTrainingHoursEmployees":"\u0645\u062A\u0648\u0633\u0637 \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646","report.totalTrainingHoursEmployees":"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646","report.hour":"\u0633\u0627\u0639\u0629","report.trainingContractors":"\u0628\u0646\u062F \u0627\u0644\u062A\u062F\u0631\u064A\u0628 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","report.traineesContractors":"\u0639\u062F\u062F \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","report.avgTrainingContractors":"\u0645\u062A\u0648\u0633\u0637 \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","report.totalTrainingContractors":"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","report.violationsSection":"\u0628\u0646\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","report.employeeViolations":"\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646","report.contractorViolations":"\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","report.violationsByType":"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639","report.violationType":"\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","report.violationsCount":"\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","report.violationsByDept":"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629","report.department":"\u0627\u0644\u0625\u062F\u0627\u0631\u0629","report.period":"\u0627\u0644\u0641\u062A\u0631\u0629","report.periodTypeMonthly":"\u062A\u0642\u0631\u064A\u0631 \u0634\u0647\u0631\u064A","report.periodTypeYearly":"\u062A\u0642\u0631\u064A\u0631 \u0633\u0646\u0648\u064A","report.employeeTrainingPrograms":"\u0639\u062F\u062F \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646","report.employeeTrainingTopics":"\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646","report.contractorTrainingPrograms":"\u0639\u062F\u062F \u0628\u0631\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","report.contractorTrainingTopics":"\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","report.monthlySafety":"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A","report.monthlySafetyTitle":"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A","report.hseSection":"\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (HSE)","report.hse.lti":"\u062D\u0648\u0627\u062F\u062B \u062A\u0648\u0642\u0641 \u0627\u0644\u0639\u0645\u0644 (LTI)","report.hse.recordables":"\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0633\u062C\u064A\u0644 (Recordables)","report.hse.injuries":"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A","report.hse.fatalities":"\u0627\u0644\u0648\u0641\u064A\u0627\u062A","report.hse.daysLost":"\u0623\u064A\u0627\u0645 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0636\u0627\u0626\u0639\u0629","report.hse.manHours":"\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644","report.hse.trir":"TRIR","report.hse.afr":"AFR","report.hse.far":"FAR","report.hse.fr":"FR (LTIR)","report.hse.sr":"SR","report.hse.ir":"IR","msg.adminOnlyReport":"\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637","msg.invalidMonthYear":"\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0634\u0647\u0631 \u0648\u0633\u0646\u0629 \u0635\u0627\u0644\u062D\u064A\u0646","msg.invalidDateRange":"\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0641\u062A\u0631\u0629 \u0635\u0627\u0644\u062D\u0629 (\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u2014 \u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E)"},en:{title:"Reports",subtitle:"Create and export various reports","card.period":"Monthly / Yearly Report","card.periodDesc":"Generate a statistical report for a specific period (monthly or yearly) including permits, observations, incidents, clinic visits, training and violations","card.incidents":"Incidents Report","card.incidentsDesc":"Generate a comprehensive report of all recorded incidents","card.training":"Training Report","card.trainingDesc":"Generate a report on training programs and participants","card.full":"Comprehensive Report","card.fullDesc":"Generate a comprehensive report of all system data","btn.generate":"Generate Report","error.load":"An error occurred while loading data","btn.retry":"Retry","msg.noData":"Data not available. Please refresh the page","msg.incidentsInvalid":"Invalid incidents data","msg.trainingInvalid":"Invalid training data","msg.unknownReport":"Unknown report type","msg.allowPopups":"Please allow pop-ups to view the report","msg.invalidPeriodInput":"Invalid period format. Please try again.","msg.periodCancelled":"Period selection was cancelled.","report.incidents":"Incidents Report","report.training":"Training Report","report.full":"Comprehensive Report","report.periodSummary":"Period Summary Report","report.totalIncidents":"Total Incidents","report.createdDate":"Creation Date","report.isoCode":"ISO Code","report.date":"Date","report.location":"Location","report.severity":"Severity","report.status":"Status","report.description":"Description","report.totalPrograms":"Total Training Programs","report.programName":"Program Name","report.trainer":"Trainer","report.participantsCount":"Participants Count","report.generalStats":"General Statistics","report.basicStats":"Basic Statistics","report.type":"Type","report.total":"Total","report.incidentsRow":"Incidents","report.nearmiss":"Near Miss","report.observations":"Observations","report.ptw":"Work Permits","report.trainingPrograms":"Training Programs","report.violations":"Violations","report.clinicVisits":"Clinic Visits","report.trainingSection":"Training Section","report.indicator":"Indicator","report.value":"Value","report.traineesCount":"Trainees Count","report.avgTrainingHoursEmployees":"Average Training Hours (Employees)","report.totalTrainingHoursEmployees":"Total Training Hours (Employees)","report.hour":"hour","report.trainingContractors":"Training Section - Contractors","report.traineesContractors":"Trainees Count (Contractors)","report.avgTrainingContractors":"Average Training Hours (Contractors)","report.totalTrainingContractors":"Total Training Hours (Contractors)","report.violationsSection":"Violations Section","report.employeeViolations":"Employee Violations Count","report.contractorViolations":"Contractor Violations Count","report.violationsByType":"Violations by Type","report.violationType":"Violation Type","report.violationsCount":"Violations Count","report.violationsByDept":"Violations by Department","report.department":"Department","report.period":"Period","report.periodTypeMonthly":"Monthly Report","report.periodTypeYearly":"Yearly Report","report.employeeTrainingPrograms":"Employee Training Programs","report.employeeTrainingTopics":"Employee Training Topics","report.contractorTrainingPrograms":"Contractor Training Programs","report.contractorTrainingTopics":"Contractor Training Topics","report.monthlySafety":"Monthly Safety Report","report.monthlySafetyTitle":"Monthly Safety Report","report.hseSection":"Health & Safety (HSE) Indicators","report.hse.lti":"Lost Time Incidents (LTI)","report.hse.recordables":"Recordable Incidents","report.hse.injuries":"Total Injuries","report.hse.fatalities":"Fatalities","report.hse.daysLost":"Days Lost","report.hse.manHours":"Man-Hours Worked","report.hse.trir":"TRIR","report.hse.afr":"AFR","report.hse.far":"FAR","report.hse.fr":"FR (LTIR)","report.hse.sr":"SR","report.hse.ir":"IR","msg.adminOnlyReport":"Monthly safety report export is available to system administrators only","msg.invalidMonthYear":"Please select a valid month and year","msg.invalidDateRange":"Please select a valid date range (from \u2014 to)"}};return{t:r=>t[a]&&t[a][r]?t[a][r]:r,lang:a}},async load(){const a=document.getElementById("reports-section");if(!a)return;if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}const{t}=this.getTranslations();this._languageChangeBound||(this._languageChangeBound=!0,document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||document.getElementById("reports-section")&&document.getElementById("reports-section").innerHTML&&Reports.load()}));try{a.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-file-alt ml-3"></i>
                            ${t("title")}
                        </h1>
                        <p class="section-subtitle">${t("subtitle")}</p>
                    </div>
                </div>
            </div>

            <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-exclamation-triangle ml-2"></i>
                            ${t("card.incidents")}
                        </h3>
                    </div>
                    <div class="card-body">
                        <p class="text-gray-600 mb-4">${t("card.incidentsDesc")}</p>
                        <button onclick="Reports.generateAndExport('incidents')" class="btn-primary w-full">
                            <i class="fas fa-file-pdf ml-2"></i>
                            ${t("btn.generate")}
                        </button>
                        <button type="button" onclick="Reports.sendReportEmail('${t("report.incidents")}', [{label:'\u0646\u0648\u0639 \u0627\u0644\u062A\u0642\u0631\u064A\u0631',value:'${t("report.incidents")}'}])" class="btn-secondary w-full mt-2">
                            <i class="fas fa-envelope ml-2"></i>
                            \u0625\u0631\u0633\u0627\u0644 \u0628\u0631\u064A\u062F
                        </button>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-graduation-cap ml-2"></i>
                            ${t("card.training")}
                        </h3>
                    </div>
                    <div class="card-body">
                        <p class="text-gray-600 mb-4">${t("card.trainingDesc")}</p>
                        <button onclick="Reports.generateAndExport('training')" class="btn-primary w-full">
                            <i class="fas fa-file-pdf ml-2"></i>
                            ${t("btn.generate")}
                        </button>
                        <button type="button" onclick="Reports.sendReportEmail('${t("report.training")}', [{label:'\u0646\u0648\u0639 \u0627\u0644\u062A\u0642\u0631\u064A\u0631',value:'${t("report.training")}'}])" class="btn-secondary w-full mt-2">
                            <i class="fas fa-envelope ml-2"></i>
                            \u0625\u0631\u0633\u0627\u0644 \u0628\u0631\u064A\u062F
                        </button>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-calendar-alt ml-2"></i>
                            ${t("card.period")}
                        </h3>
                    </div>
                    <div class="card-body">
                        <p class="text-gray-600 mb-4">${t("card.periodDesc")}</p>
                        <button onclick="Reports.generateAndExport('period')" class="btn-primary w-full">
                            <i class="fas fa-file-pdf ml-2"></i>
                            ${t("btn.generate")}
                        </button>
                        <button type="button" onclick="Reports.sendReportEmail('${t("report.periodSummary")}', [{label:'\u0646\u0648\u0639 \u0627\u0644\u062A\u0642\u0631\u064A\u0631',value:'${t("card.period")}'}])" class="btn-secondary w-full mt-2">
                            <i class="fas fa-envelope ml-2"></i>
                            \u0625\u0631\u0633\u0627\u0644 \u0628\u0631\u064A\u062F
                        </button>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-chart-line ml-2"></i>
                            ${t("card.full")}
                        </h3>
                    </div>
                    <div class="card-body">
                        <p class="text-gray-600 mb-4">${t("card.fullDesc")}</p>
                        <button onclick="Reports.generateAndExport('full')" class="btn-primary w-full">
                            <i class="fas fa-file-pdf ml-2"></i>
                            ${t("btn.generate")}
                        </button>
                        <button type="button" onclick="Reports.sendReportEmail('${t("report.full")}', [{label:'\u0646\u0648\u0639 \u0627\u0644\u062A\u0642\u0631\u064A\u0631',value:'${t("card.full")}'}])" class="btn-secondary w-full mt-2">
                            <i class="fas fa-envelope ml-2"></i>
                            \u0625\u0631\u0633\u0627\u0644 \u0628\u0631\u064A\u062F
                        </button>
                    </div>
                </div>
            </div>
        `}catch(r){if(typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631:",r),a){const{t:o}=this.getTranslations();a.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${o("error.load")}</p>
                                <button onclick="Reports.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${o("btn.retry")}
                                </button>
                            </div>
                        </div>
                    </div>
                `}}},async ensureTrainingDataForReport(){if(!AppState.appData)return;const a=!Array.isArray(AppState.appData.contractorTrainings)||AppState.appData.contractorTrainings.length===0,t=!Array.isArray(AppState.appData.trainingAttendance),r=!Array.isArray(AppState.appData.training);if(!(!a&&!t&&!r)&&!(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function")&&!(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl))try{const o=l=>Promise.resolve(GoogleIntegration.sendRequest({action:l,data:{}})).then(s=>s&&s.success&&Array.isArray(s.data)?s.data:[]).catch(()=>[]),[n,d,e]=await Promise.all([a?o("getAllContractorTrainings"):Promise.resolve(AppState.appData.contractorTrainings||[]),t?o("getAllTrainingAttendance"):Promise.resolve(AppState.appData.trainingAttendance||[]),r?o("getAllTrainings"):Promise.resolve(AppState.appData.training||[])]);a&&Array.isArray(n)&&(AppState.appData.contractorTrainings=n),t&&Array.isArray(d)&&(AppState.appData.trainingAttendance=d),r&&Array.isArray(e)&&(AppState.appData.training=e)}catch(o){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u062A\u0642\u0631\u064A\u0631:",o)}},_filterArrayByDateRange(a,t,r,o){if(!Array.isArray(a)||!r||!o)return Array.isArray(a)?a.slice():[];const n=new Date(r),d=new Date(o);return isNaN(n.getTime())||isNaN(d.getTime())?a.slice():a.filter(e=>{if(!e||typeof e!="object")return!1;let l=null;for(let c=0;c<t.length;c++){const g=t[c];if(e[g]){l=e[g];break}}if(!l)return!1;const s=l instanceof Date?l:new Date(l);return isNaN(s.getTime())?!1:s>=n&&s<=d})},async _askForPeriod(){const{t:a,lang:t}=this.getTranslations();try{const r=t==="ar"?`\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0641\u062A\u0631\u0629:
1- \u0634\u0647\u0631\u064A
2- \u0633\u0646\u0648\u064A`:`Choose period type:
1- Monthly
2- Yearly`,o=window.prompt(r,"1");if(o===null)return typeof Notification<"u"&&Notification.info&&Notification.info(a("msg.periodCancelled")),null;if(String(o).trim()==="2"){const e=new Date().getFullYear(),l=t==="ar"?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0633\u0646\u0629 \u0628\u0635\u064A\u063A\u0629 YYYY (\u0645\u062B\u0627\u0644: 2026)":"Enter year in format YYYY (e.g. 2026)",s=window.prompt(l,String(e));if(s===null)return typeof Notification<"u"&&Notification.info&&Notification.info(a("msg.periodCancelled")),null;const c=parseInt(String(s).trim(),10);if(!Number.isFinite(c))return typeof Notification<"u"&&Notification.error&&Notification.error(a("msg.invalidPeriodInput")),null;const g=new Date(c,0,1),y=new Date(c,11,31),x=String(c);return{type:"yearly",year:c,startDate:g,endDate:y,label:x}}else{const e=t==="ar"?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0633\u0646\u0629 \u0648\u0627\u0644\u0634\u0647\u0631 \u0628\u0635\u064A\u063A\u0629 YYYY-MM (\u0645\u062B\u0627\u0644: 2026-02)":"Enter year-month in format YYYY-MM (e.g. 2026-02)",l=window.prompt(e);if(l===null)return typeof Notification<"u"&&Notification.info&&Notification.info(a("msg.periodCancelled")),null;const s=/^(\d{4})-(\d{1,2})$/.exec(String(l).trim());if(!s)return typeof Notification<"u"&&Notification.error&&Notification.error(a("msg.invalidPeriodInput")),null;const c=parseInt(s[1],10),g=parseInt(s[2],10);if(!Number.isFinite(c)||!Number.isFinite(g)||g<1||g>12)return typeof Notification<"u"&&Notification.error&&Notification.error(a("msg.invalidPeriodInput")),null;const y=new Date(c,g-1,1),x=new Date(c,g,0),b=`${c}-${g.toString().padStart(2,"0")}`;return{type:"monthly",year:c,month:g,startDate:y,endDate:x,label:b}}}catch(r){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("Error in _askForPeriod:",r),null}},buildMonthlyPeriod(a,t){const r=parseInt(a,10),o=parseInt(t,10);if(!Number.isFinite(r)||!Number.isFinite(o)||o<1||o>12)return null;const n=new Date(r,o-1,1),d=new Date(r,o,0,23,59,59,999),e=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],l=["January","February","March","April","May","June","July","August","September","October","November","December"];return{type:"monthly",year:r,month:o,startDate:n,endDate:d,label:`${r}-${String(o).padStart(2,"0")}`,displayLabelAr:`${e[o-1]} ${r}`,displayLabelEn:`${l[o-1]} ${r}`}},_msrParseDateInput(a,t=!1){const r=String(a||"").trim();if(!r)return null;const o=r.split("-").map(s=>parseInt(s,10));if(o.length<3)return null;const[n,d,e]=o;if(!Number.isFinite(n)||!Number.isFinite(d)||!Number.isFinite(e)||d<1||d>12||e<1||e>31)return null;const l=t?new Date(n,d-1,e,23,59,59,999):new Date(n,d-1,e,0,0,0,0);return Number.isNaN(l.getTime())?null:l},buildSafetyReportPeriod(a,t){const r=this._msrParseDateInput(a,!1),o=this._msrParseDateInput(t,!0);if(!r||!o||r>o)return null;const n=l=>String(l).padStart(2,"0"),d=l=>`${l.getFullYear()}-${n(l.getMonth()+1)}-${n(l.getDate())}`,e=(l,s)=>l.toLocaleDateString(s);return{type:"range",year:o.getFullYear(),month:o.getMonth()+1,startDate:r,endDate:o,label:`${d(r)}_${d(o)}`,displayLabelAr:`${e(r,"ar-SA")} \u2014 ${e(o,"ar-SA")}`,displayLabelEn:`${e(r,"en-GB")} \u2014 ${e(o,"en-GB")}`}},_msrGetPeriodDisplayLabel(a,t){if(!a)return"\u2014";if(t==="en"&&a.displayLabelEn)return a.displayLabelEn;if(a.displayLabelAr)return a.displayLabelAr;const r=this.getMonthlySafetyStrings(t);if(a.type==="monthly"&&a.month)return`${r.monthNames[a.month-1]||""} ${a.year||""}`.trim();const o=t==="en"?"en-GB":"ar-SA",n=d=>new Date(d).toLocaleDateString(o);return`${n(a.startDate)} \u2014 ${n(a.endDate)}`},_msrMonthsInPeriod(a){const t=new Date(a.startDate),r=new Date(a.endDate),o=[];let n=t.getFullYear(),d=t.getMonth();const e=r.getFullYear(),l=r.getMonth();for(;n<e||n===e&&d<=l;)o.push({year:n,monthIdx:d}),d+=1,d>11&&(d=0,n+=1);return o},_msrGetMonthlyBaseForYear(a,t,r={}){return!r[a]&&typeof HseMetrics<"u"&&HseMetrics.buildMonthlyBase&&(r[a]=HseMetrics.buildMonthlyBase(a,t)),r[a]||null},_formatHseRate(a,t){if(typeof HseMetrics<"u"&&typeof HseMetrics.formatRateDisplay=="function")return HseMetrics.formatRateDisplay(a,t);const r=parseFloat(a);return Number.isFinite(r)?r.toFixed(t):"0"},getMonthlySafetyStrings(a){const t=a!=="en";return{dir:t?"rtl":"ltr",lang:t?"ar":"en",monthNames:t?["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"]:["January","February","March","April","May","June","July","August","September","October","November","December"],title:t?"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A":"Monthly Safety Report",generatedOn:t?"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":"Generated On",projectSite:t?"\u0627\u0644\u0645\u0634\u0631\u0648\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639":"Project / Site",reportingMonth:t?"\u0634\u0647\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631":"Reporting Month",reportingPeriod:t?"\u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631":"Reporting Period",preparedBy:t?"\u0623\u064F\u0639\u062F \u0628\u0648\u0627\u0633\u0637\u0629":"Prepared By",client:t?"\u0627\u0644\u0639\u0645\u064A\u0644":"Client",location:t?"\u0627\u0644\u0645\u0648\u0642\u0639":"Location",manHoursMonth:t?"\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 (\u0627\u0644\u0634\u0647\u0631)":"MAN-HOURS (MONTH)",recordables:t?"\u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0633\u062C\u064A\u0644 (TRC)":"RECORDABLES (TRC)",trir:t?"TRIR (\u0644\u0643\u0644 200 \u0623\u0644\u0641)":"TRIR (PER 200K)",afr:t?"AFR (\u0644\u0643\u0644 \u0645\u0644\u064A\u0648\u0646)":"AFR (PER 1M)",fr:t?"FR (LTI \u0644\u0643\u0644 \u0645\u0644\u064A\u0648\u0646)":"FR (LTI PER 1M)",sr:t?"SR (\u0627\u0644\u0634\u062F\u0629 \u0644\u0643\u0644 \u0645\u0644\u064A\u0648\u0646)":"SR (SEVERITY PER 1M)",hseActivities:t?"\u0623\u0646\u0634\u0637\u0629 HSE (\u0627\u0644\u0623\u0639\u062F\u0627\u062F)":"HSE Activities (Counts)",activity:t?"\u0627\u0644\u0646\u0634\u0627\u0637":"Activity",count:t?"\u0627\u0644\u0639\u062F\u062F":"Count",trainingsConducted:t?"\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0646\u0641\u0630\u0629":"Trainings Conducted",participantsTrained:t?"\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u0648\u0646":"Participants Trained",auditsInspections:t?"\u0627\u0644\u062A\u062F\u0642\u064A\u0642 / \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A":"Audits / Inspections",ptwsIssued:t?"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0635\u0627\u062F\u0631\u0629":"PTWs Issued",observations:t?"\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A / \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u062A\u0648\u0642\u0641":"Observations / STOP Cards",toolboxTalks:t?"\u0627\u062C\u062A\u0645\u0627\u0639\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0642\u0635\u064A\u0631\u0629":"Toolbox Talks (Count)",manpowerStatus:t?"\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0634\u0647\u0631\u064A \u0644\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629":"Monthly Status of Manpower",metric:t?"\u0627\u0644\u0645\u0624\u0634\u0631":"Metric",thisMonth:t?"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631":"This Month",thisPeriod:t?"\u0627\u0644\u0641\u062A\u0631\u0629":"Period",cumulative:t?"\u062A\u0631\u0627\u0643\u0645\u064A":"Cumulative",manpowerAvg:t?"\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629":"Manpower (Avg.)",totalManDays:t?"\u0625\u062C\u0645\u0627\u0644\u064A \u0623\u064A\u0627\u0645 \u0627\u0644\u0639\u0645\u0644":"Total Man-days",totalManHours:t?"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644":"Total Man-hours",accidentReport:t?"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0627\u0644\u0634\u0647\u0631\u064A":"Monthly Accident Report",description:t?"\u0627\u0644\u0648\u0635\u0641":"Description",totalAccidents:t?"\u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B":"Total Number of Accidents",reportableAccidents:t?"\u0623) \u062D\u0648\u0627\u062F\u062B \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0628\u0644\u064A\u063A":"a) Reportable Accidents",minorAccidents:t?"\u0628) \u062D\u0648\u0627\u062F\u062B \u0628\u0633\u064A\u0637\u0629":"b) Minor Accidents",firstAidCases:t?"\u062C) \u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0623\u0648\u0644\u064A\u0629":"c) First-aid cases",nearMiss:t?"\u062F) \u062D\u0648\u0627\u062F\u062B \u0648\u0634\u064A\u0643\u0629":"d) Near Miss Incidents",manDaysLost:t?"\u0623\u064A\u0627\u0645 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0636\u0627\u0626\u0639\u0629 \u0628\u0633\u0628\u0628 \u0627\u0644\u062D\u0648\u0627\u062F\u062B":"Man-days lost due to accidents",hseEvents:t?"\u0623\u062D\u062F\u0627\u062B \u0648\u0633\u062C\u0644\u0627\u062A HSE":"HSE Events & Logs",hseCommittee:t?"\u0627\u062C\u062A\u0645\u0627\u0639 \u0644\u062C\u0646\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629":"HSE Committee Meeting",hseWalks:t?"\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629":"HSE Walks",hseInduction:t?"\u062A\u062F\u0631\u064A\u0628 \u062A\u0639\u0631\u064A\u0641\u064A HSE":"HSE Induction Training",toolboxTraining:t?"\u062A\u062F\u0631\u064A\u0628 \u0627\u062C\u062A\u0645\u0627\u0639 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0642\u0635\u064A\u0631":"Toolbox Talk Training",hseTraining:t?"\u062A\u062F\u0631\u064A\u0628 HSE":"HSE Training",date:t?"\u0627\u0644\u062A\u0627\u0631\u064A\u062E":"Date",withWhom:t?"\u0645\u0639 (\u0645\u0646)":"With (Whom)",persons:t?"\u0639\u062F\u062F \u0627\u0644\u0623\u0634\u062E\u0627\u0635":"No. of Persons",topic:t?"\u0627\u0644\u0645\u0648\u0636\u0648\u0639":"Topic",participants:t?"\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646":"Participants",hseMom:t?"\u0645\u062D\u0636\u0631 \u0627\u062C\u062A\u0645\u0627\u0639 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 (MOM)":"HSE Meeting (MOM)",discussionPoints:t?"\u0646\u0642\u0627\u0637 \u0627\u0644\u0646\u0642\u0627\u0634":"Discussion Points",status:t?"\u0627\u0644\u062D\u0627\u0644\u0629":"Status",highlights:t?"\u0623\u0628\u0631\u0632 \u0627\u0644\u0625\u0646\u062C\u0627\u0632\u0627\u062A / \u0627\u0644\u0645\u0628\u0627\u062F\u0631\u0627\u062A":"Key Highlights / Initiatives",concerns:t?"\u0627\u0644\u0645\u062E\u0627\u0648\u0641 / \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A":"Concerns / Actions",authorization:t?"\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F":"Authorization",preparedBySign:t?"\u0623\u064F\u0639\u062F \u0628\u0648\u0627\u0633\u0637\u0629":"Prepared by",reviewedBy:t?"\u0631\u0627\u062C\u0639\u0647":"Reviewed by",siteFacility:t?"\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639":"Factory / Site",allSites:t?"\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639":"All Sites",allSitesCombined:t?"\u0645\u0644\u062E\u0635 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639":"All Sites Summary",sitesBreakdown:t?"\u062A\u0641\u0635\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639":"Breakdown by Site",hseDepartment:t?"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629":"HSE Department",dash:"\u2014",open:t?"\u0645\u0641\u062A\u0648\u062D":"Open"}},_msrFmtNum(a){const t=Number(a);return Number.isFinite(t)?t.toLocaleString("en-US"):"0"},_msrFmtRate(a,t){return typeof HseMetrics<"u"&&HseMetrics.formatRateDisplay?HseMetrics.formatRateDisplay(a,t):this._formatHseRate(a,t)},_msrFmtDate(a,t){if(!a)return"\u2014";const r=a instanceof Date?a:new Date(a);return Number.isNaN(r.getTime())?"\u2014":r.toLocaleDateString(t==="ar"?"ar-SA":"en-GB")},_msrInRange(a,t,r,o){return this._filterArrayByDateRange([a],t,r,o).length>0},getMonthlySafetySites(){const a=[{id:"factory-1",nameAr:"\u0645\u0635\u0646\u0639 1",nameEn:"Factory 1"},{id:"factory-2",nameAr:"\u0645\u0635\u0646\u0639 2",nameEn:"Factory 2"},{id:"warehouse-1",nameAr:"\u0627\u0644\u0645\u062E\u0627\u0632\u0646",nameEn:"Warehouses"}];if(typeof DailyObservations<"u"&&typeof DailyObservations.getAllSites=="function"){const t=DailyObservations.getAllSites();return a.map(r=>{const o=t.find(d=>String(d.id||"").trim()===r.id),n=String(o?.name||r.nameAr||"").trim();return{id:r.id,nameAr:r.id==="warehouse-1"?"\u0627\u0644\u0645\u062E\u0627\u0632\u0646":n||r.nameAr,nameEn:r.nameEn}})}return a},getMonthlySafetySiteById(a){const t=String(a||"").trim();return t&&this.getMonthlySafetySites().find(r=>r.id===t)||null},getMonthlySafetySiteLabel(a,t){return a?t==="en"?a.nameEn||a.nameAr:a.nameAr||a.nameEn:""},_msrSiteMatchTokens(a){const t=new Set;if(!a)return t;const r=o=>{const n=String(o||"").trim().toLowerCase();n&&t.add(n)};return r(a.id),r(a.nameAr),r(a.nameEn),a.id==="factory-1"&&(r("\u0645\u0635\u0646\u0639 1"),r("factory 1"),r("factory-1")),a.id==="factory-2"&&(r("\u0645\u0635\u0646\u0639 2"),r("factory 2"),r("factory-2")),(a.id==="warehouse-1"||String(a.id).includes("warehouse")||String(a.nameAr).includes("\u0645\u062E\u0632\u0646"))&&(r("warehouse-1"),r("warehouse"),r("warehouses"),r("\u0645\u062E\u0632\u0646 1"),r("\u0627\u0644\u0645\u062E\u0627\u0632\u0646"),r("\u0645\u062E\u0627\u0632\u0646")),t},_msrRecordMatchesSite(a,t){if(!t||!a)return!1;const r=this._msrSiteMatchTokens(t),o=[a.siteId,a.factoryId,a.factory,a.site,a.plant,a.locationId,a.plantId];for(let d=0;d<o.length;d+=1){const e=String(o[d]||"").trim().toLowerCase();if(e&&r.has(e))return!0}const n=[a.siteName,a.factoryName,a.location,a.plantName,a.branch,a.department,a.area];for(let d=0;d<n.length;d+=1){const e=String(n[d]||"").trim().toLowerCase();if(e){for(const l of r)if(e===l||e.includes(l))return!0}}return!1},filterAppDataForMonthlySafetySite(a,t){const r=this.getMonthlySafetySiteById(t);if(!r||!a)return a;const o=n=>{const d=a[n];return Array.isArray(d)?d.filter(e=>this._msrRecordMatchesSite(e,r)):d};return{...a,incidents:o("incidents"),nearmiss:o("nearmiss"),ptw:o("ptw"),dailyObservations:o("dailyObservations"),training:o("training"),contractorTrainings:o("contractorTrainings"),trainingAttendance:o("trainingAttendance"),violations:o("violations"),clinicVisits:o("clinicVisits"),safetyMeetings:o("safetyMeetings"),inspectionTours:o("inspectionTours"),periodicInspections:o("periodicInspections"),incidentRegistry:o("incidentRegistry"),dailySafetyCheckList:o("dailySafetyCheckList")}},renderMonthlySafetySiteOptions(a="ar"){const t=n=>Utils.escapeHTML(n==null?"":String(n)),r=a==="en"?"All Sites \u2014 One Report":"\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u2014 \u062A\u0642\u0631\u064A\u0631 \u0645\u0648\u062D\u0651\u062F",o=this.getMonthlySafetySites().map(n=>{const d=this.getMonthlySafetySiteLabel(n,a);return`<option value="${t(n.id)}">${t(d)}</option>`}).join("");return`<option value="__all__">${t(r)}</option>${o}`},collectMonthlySafetyReportModel(a,t,r=null){const o=r?this.filterAppDataForMonthlySafetySite(a,r):a,n=r?this.getMonthlySafetySiteById(r):null,d=new Date(t.startDate),e=new Date(t.endDate),l=t.year||e.getFullYear(),s=(t.month||e.getMonth()+1)-1,c=new Date(e.getFullYear(),0,1),g=this._msrMonthsInPeriod(t),y={},x=typeof HseMetrics<"u"&&HseMetrics.loadMultipliers?HseMetrics.loadMultipliers():{TRIR:2e5,AFR:1e6,FR:1e6,SR:1e6},b=typeof HseMetrics<"u"&&HseMetrics.aggregatePeriod?HseMetrics.aggregatePeriod(d,e,o):{recordables:0,injuries:0,fatalities:0,lti:0,daysLost:0,manHours:0,totalIncidents:0},u=typeof HseMetrics<"u"&&HseMetrics.aggregatePeriod?HseMetrics.aggregatePeriod(c,e,o):{...b},S=typeof HseMetrics<"u"&&HseMetrics.computeRates?HseMetrics.computeRates(b,x):{};let f=0,D=0;g.forEach(({year:i,monthIdx:m})=>{const $=this._msrGetMonthlyBaseForYear(i,o,y);$&&(f+=$.firstAid[m]||0,D+=$.nlti[m]||0)});const _=e.getFullYear(),T=this._msrGetMonthlyBaseForYear(_,o,y),M=e.getMonth(),A=T&&HseMetrics.sumSlice?HseMetrics.sumSlice(T.firstAid,M):f,h=T&&HseMetrics.sumSlice?HseMetrics.sumSlice(T.nlti,M):D,E=Array.isArray(o.nearmiss)?o.nearmiss:[],F=this._filterArrayByDateRange(E,["date","createdAt"],d,e).length,H=this._filterArrayByDateRange(E,["date","createdAt"],c,e).length,p=this._filterArrayByDateRange(o.training||[],["startDate","date","createdAt"],d,e),v=this._filterArrayByDateRange(o.contractorTrainings||[],["date","trainingDate","startDate","createdAt"],d,e),w=p.concat(v),R=w.reduce((i,m)=>{const $=typeof Training<"u"&&Training.getParticipantsCount?Training.getParticipantsCount(m):Number(m.participantsCount)||(m.participants||[]).length||Number(m.traineesCount)||0;return i+(Number.isFinite($)?$:0)},0),K=this._filterArrayByDateRange((o.periodicInspections||[]).concat(o.inspectionTours||[]),["date","inspectionDate","createdAt","startDate"],d,e).length,B=this._filterArrayByDateRange(o.ptw||[],["startDate","date","createdAt"],d,e).length,V=this._filterArrayByDateRange(o.dailyObservations||[],["date","createdAt"],d,e).length,U=this._filterArrayByDateRange(o.safetyMeetings||[],["date","meetingDate","createdAt"],d,e),z=U.filter(i=>{const m=`${i.type||""} ${i.title||""} ${i.name||""}`.toLowerCase();return m.includes("toolbox")||m.includes("\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0642\u0635\u064A\u0631")||m.includes("\u062A\u0648\u0648\u0644\u0628\u0648\u0643\u0633")}).length||w.filter(i=>String(i.name||i.programName||"").toLowerCase().includes("toolbox")).length,Y=typeof HseMetrics<"u"&&HseMetrics.getWorkConfig?HseMetrics.getWorkConfig():{workDaysPerMonth:22,hoursPerDay:8};let W=0,O=0,j=0,L=0;if(g.length){let i=0;g.forEach(({year:m,monthIdx:$})=>{const C=this._msrGetMonthlyBaseForYear(m,o,y),q=C&&C.employeeCounts[$]||0;i+=q,C&&typeof HseMetrics.resolveManDaysForMonth=="function"?O+=HseMetrics.resolveManDaysForMonth(C,$):O+=Math.round(q*(Y.workDaysPerMonth||22))}),W=Math.round(i/g.length)}if(T){if(typeof HseMetrics.resolveYtdManDays=="function")j=HseMetrics.resolveYtdManDays(T,M,{appData:o});else for(let i=0;i<=M;i+=1)j+=Math.round((T.employeeCounts[i]||0)*(Y.workDaysPerMonth||22));L=M>=0?Math.round(HseMetrics.sumSlice(T.employeeCounts,M)/(M+1)):0}const N=w.slice(0,12).map(i=>({date:i.startDate||i.date||i.createdAt,topic:i.name||i.programName||i.topic||"\u2014",participants:typeof Training<"u"&&Training.getParticipantsCount?Training.getParticipantsCount(i):i.participantsCount||(i.participants||[]).length||i.traineesCount||"\u2014"})),G=this._filterArrayByDateRange(o.inspectionTours||[],["date","createdAt","startDate"],d,e).slice(0,6).map(i=>({date:i.date||i.startDate||i.createdAt,withWhom:i.inspectorName||i.conductedBy||i.leader||"\u2014"})),k=U.filter(i=>{const m=`${i.type||""} ${i.title||""}`.toLowerCase();return m.includes("committee")||m.includes("\u0644\u062C\u0646\u0629")}),I=(k.length?k:U).slice(0,5).map(i=>({date:i.date||i.meetingDate||i.createdAt,points:i.notes||i.discussion||i.agenda||i.summary||"\u2014",status:i.status||"Open"})),P=AppState?.companySettings||{},J=AppState?.currentUser?.name||AppState?.currentUser?.displayName||"";return{generatedAt:new Date,siteId:r||null,site:n,projectSite:P.name||P.secondaryName||"\u2014",client:P.secondaryName||P.name||"\u2014",location:P.address||"\u2014",preparedBy:J||"\u2014",monthTotals:b,cumTotals:u,monthRates:S,kpi:{manHours:b.manHours,recordables:b.recordables,trir:S.trir,afr:S.afr,fr:S.fr,sr:S.sr},activities:{trainings:w.length,participants:R,inspections:K,ptw:B,observations:V,toolbox:z},manpower:{avgMonth:W,avgCum:L,manDaysMonth:O,manDaysCum:j,manHoursMonth:b.manHours,manHoursCum:u.manHours},accidents:{reportableMonth:b.recordables,reportableCum:u.recordables,minorMonth:D,minorCum:h,firstAidMonth:f,firstAidCum:A,nearMissMonth:F,nearMissCum:H,daysLostMonth:b.daysLost,daysLostCum:u.daysLost,totalMonth:b.totalIncidents+F,totalCum:u.totalIncidents+H},committeeDate:k[0]?.date||k[0]?.meetingDate||null,walkRows:G,inductionRows:N.slice(0,4).map(i=>({date:i.date,persons:i.participants})),toolboxRows:N.filter(i=>String(i.topic).toLowerCase().includes("toolbox")).slice(0,4),trainingRows:N,momRows:I,highlights:(P.monthlySafetyHighlights||"").trim()||"\u2014",concerns:(P.monthlySafetyConcerns||"").trim()||"\u2014"}},_getMonthlySafetyReportStyles(a){const t=a!=="en",r=t?"padding-right:16px;border-right:4px solid #003865":"padding-left:16px;border-left:4px solid #003865";return`<style>
.msr-report{color:#1f2937;line-height:1.55;unicode-bidi:embed}
.msr-report,.msr-report *{letter-spacing:0!important;word-spacing:normal!important;text-rendering:optimizeLegibility}
.msr-report .ar-text,.msr-report th,.msr-report td,.msr-report h3,.msr-report h4,.msr-report .summary-label,.msr-report .msr-intro-value{word-break:normal!important;overflow-wrap:break-word!important;hyphens:none!important}
.msr-report[dir="rtl"] .ar-text,.msr-report[dir="rtl"] th,.msr-report[dir="rtl"] td{direction:rtl;unicode-bidi:embed}
.msr-report .msr-site-banner{margin:0 0 16px;padding:12px 16px;border-radius:12px;font-size:15px;font-weight:800;color:#fff;background:linear-gradient(135deg,#003865,#1e40af);text-align:center;direction:rtl;unicode-bidi:embed}
.msr-report .msr-site-banner.overview{background:linear-gradient(135deg,#1e40af,#2563eb)}
.msr-report .msr-site-block+.msr-site-block{margin-top:28px;padding-top:8px;border-top:2px dashed #cbd5e1}
.msr-report .msr-all-sites-title{margin:0 0 18px}
.msr-report[dir="ltr"] .section-title{${r};border-right:none}
.msr-report .section-title{margin:22px 0 12px;font-size:16px;font-weight:700;color:#003865;${r}}
.msr-report .msr-intro{margin-bottom:22px;padding:16px 20px;font-size:13px;line-height:1.8}
.msr-report .msr-intro-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 18px}
.msr-report .msr-intro-item{display:flex;flex-direction:column;gap:3px}
.msr-report .msr-intro-label{font-size:11px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:.04em}
.msr-report .msr-intro-value{font-size:13px;font-weight:600;color:#0f172a}
.msr-report .summary-grid{margin-bottom:22px;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.msr-report .summary-card{padding:14px 16px;border-radius:14px;box-shadow:0 12px 28px rgba(15,23,42,.1)}
.msr-report .summary-card .summary-label{font-size:10px;letter-spacing:.05em;text-transform:uppercase;margin-bottom:4px}
.msr-report .summary-card .summary-value{font-size:22px;font-weight:800}
.msr-report .msr-kpi-blue{background:linear-gradient(135deg,#eff6ff,#dbeafe);border:1px solid #93c5fd}
.msr-report .msr-kpi-blue .summary-label{color:#1d4ed8}
.msr-report .msr-kpi-blue .summary-value{color:#1e3a8a}
.msr-report .msr-kpi-warn{background:linear-gradient(135deg,#fffbeb,#fef3c7);border:1px solid #fcd34d}
.msr-report .msr-kpi-warn .summary-label{color:#b45309}
.msr-report .msr-kpi-warn .summary-value{color:#92400e}
.msr-report .msr-kpi-green{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7}
.msr-report .msr-kpi-green .summary-label{color:#047857}
.msr-report .msr-kpi-green .summary-value{color:#065f46}
.msr-report .report-table{margin-bottom:18px;border-radius:14px;box-shadow:0 14px 32px rgba(15,23,42,.1);font-size:12px}
.msr-report .report-table thead th{padding:11px 14px;font-size:12px;background:linear-gradient(135deg,#003865,#1e40af)}
.msr-report .report-table tbody td{padding:10px 14px;font-size:12px}
.msr-report .report-table tbody tr:nth-child(even) td{background:#f8fafc}
.msr-report .msr-row-total td{background:linear-gradient(90deg,#eff6ff,#dbeafe)!important;font-weight:700;color:#1e40af}
.msr-report .msr-row-danger td{background:#fef2f2!important;color:#991b1b}
.msr-report .msr-row-warn td{background:#fffbeb!important;color:#92400e}
.msr-report .msr-row-info td{background:#f0f9ff!important;color:#0369a1}
.msr-report .msr-num{text-align:center;direction:ltr;font-weight:700;font-variant-numeric:tabular-nums}
.msr-report .msr-sub{display:block;font-size:11px;color:#64748b;margin-top:2px}
.msr-report .msr-subsection{margin:14px 0 8px;padding:8px 12px;background:linear-gradient(90deg,rgba(0,56,101,.08),rgba(30,64,175,.04));border-radius:10px;font-size:12px;font-weight:700;color:#003865}
.msr-report .msr-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0}
.msr-report .msr-note-card{border-radius:14px;padding:14px 16px;font-size:12px;line-height:1.7;min-height:88px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 8px 20px rgba(15,23,42,.06)}
.msr-report .msr-note-card h4{margin:0 0 10px;font-size:13px;font-weight:800}
.msr-report .msr-note-high{border-${t?"right":"left"}:4px solid #2563eb;background:linear-gradient(135deg,#eff6ff,#f8fafc)}
.msr-report .msr-note-high h4{color:#1d4ed8}
.msr-report .msr-note-concern{border-${t?"right":"left"}:4px solid #dc2626;background:linear-gradient(135deg,#fef2f2,#fff)}
.msr-report .msr-note-concern h4{color:#b91c1c}
.msr-report .msr-badge{display:inline-block;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:.02em}
.msr-report .msr-badge-open{background:#fef3c7;color:#b45309;border:1px solid #fcd34d}
.msr-report .msr-badge-closed{background:#d1fae5;color:#047857;border:1px solid #6ee7b7}
.msr-report .msr-badge-progress{background:#dbeafe;color:#1d4ed8;border:1px solid #93c5fd}
.msr-report .msr-auth-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:4px 0 8px}
.msr-report .msr-auth-box{border:1px solid #cbd5e1;border-radius:12px;padding:14px;background:#f8fafc}
.msr-report .msr-auth-box strong{display:block;font-size:12px;color:#003865;margin-bottom:28px}
.msr-report .msr-auth-line{border-top:2px dotted #94a3b8;margin-top:8px;padding-top:6px;font-size:11px;color:#94a3b8;text-align:center}
.msr-report .msr-dash{color:#cbd5e1}
.msr-report .msr-empty td{color:#94a3b8;font-style:italic;text-align:center}
@media print{
.msr-report .summary-card,.msr-report .report-table thead th,.msr-report .msr-row-total td,.msr-report .msr-row-danger td,.msr-report .msr-row-warn td,.msr-report .msr-row-info td{
-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
}
</style>`},_msrStatusBadge(a,t){const r=String(a||"").trim().toLowerCase();let o="msr-badge-progress";return/closed|مغلق|منته|done|complete/.test(r)?o="msr-badge-closed":/open|مفتوح|pending|قيد/.test(r)&&(o="msr-badge-open"),`<span class="msr-badge ${o}">${Utils.escapeHTML(a||(t==="en"?"Open":"\u0645\u0641\u062A\u0648\u062D"))}</span>`},_msrKpiCard(a,t,r="blue"){const o=n=>Utils.escapeHTML(n==null?"":String(n));return`<div class="summary-card msr-kpi-${r}">
            <span class="summary-label">${o(a)}</span>
            <span class="summary-value" dir="ltr">${o(t)}</span>
        </div>`},_msrTableRow(a,t=""){return`<tr${t?` class="${t}"`:""}>${a.map(o=>`<td>${o}</td>`).join("")}</tr>`},_msrEmptyRow(a,t){return this._msrTableRow(new Array(a).fill(`<span class="msr-dash">${t}</span>`),"msr-empty")},_msrBuildPdfMeta(a,t,r,o,n,d={}){const e=this._msrGetPeriodDisplayLabel(a,t),l=n==="__all__"||d.allSites,s=!l&&n?this.getMonthlySafetySiteById(n):null,c={source:"MonthlySafetyReport",documentLang:t==="en"?"en":"ar",documentDir:t==="en"?"ltr":"rtl",titleEn:l?"Monthly Safety Report \u2014 All Sites":s?`Monthly Safety Report \u2014 ${s.nameEn||r}`:"Monthly Safety Report",titleAr:l?"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A \u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0627\u0642\u0639":s?`\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A \u2014 ${s.nameAr||r}`:"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0634\u0647\u0631\u064A",hseDeptAr:"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629",hseDeptEn:"HSE Department",includeQRCode:!1,compactPdfFooter:!0};return t==="ar"?(c["\u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"]=e,c.\u0627\u0644\u0645\u0648\u0642\u0639=r,c["\u0623\u064F\u0639\u062F \u0628\u0648\u0627\u0633\u0637\u0629"]=o):(c["Reporting Period"]=e,c.Site=r,c["Prepared By"]=o),c},buildMonthlySafetyReportBody(a,t,r,o,n={}){const{skipIntro:d=!1}=n,e=this.getMonthlySafetyStrings(r),l=this.collectMonthlySafetyReportModel(a,t,o),s=f=>Utils.escapeHTML(f==null?"":String(f)),c=f=>`<span class="ar-text" dir="${e.dir}">${s(f)}</span>`,g=this._msrGetPeriodDisplayLabel(t,r),y=t.type==="range"?e.thisPeriod:e.thisMonth,x=l.site||(o?this.getMonthlySafetySiteById(o):null),b=x?this.getMonthlySafetySiteLabel(x,r):e.allSites,u=f=>`<span class="msr-num">${s(this._msrFmtNum(f))}</span>`;return`${d?"":`
  <div class="msr-intro permit-intro">
    <div class="msr-intro-grid">
      <div class="msr-intro-item"><span class="msr-intro-label">${c(e.reportingPeriod)}</span><span class="msr-intro-value ar-text" dir="${e.dir}">${s(g)}</span></div>
      <div class="msr-intro-item"><span class="msr-intro-label">${c(e.siteFacility)}</span><span class="msr-intro-value ar-text" dir="${e.dir}">${s(b)}</span></div>
      <div class="msr-intro-item"><span class="msr-intro-label">${c(e.preparedBy)}</span><span class="msr-intro-value ar-text" dir="${e.dir}">${s(l.preparedBy)}</span></div>
      <div class="msr-intro-item"><span class="msr-intro-label">${c(e.projectSite)}</span><span class="msr-intro-value ar-text" dir="${e.dir}">${s(l.projectSite)}</span></div>
      <div class="msr-intro-item"><span class="msr-intro-label">${c(e.client)}</span><span class="msr-intro-value ar-text" dir="${e.dir}">${s(l.client)}</span></div>
      <div class="msr-intro-item"><span class="msr-intro-label">${c(e.location)}</span><span class="msr-intro-value ar-text" dir="${e.dir}">${s(l.location)}</span></div>
    </div>
  </div>`}
  <div class="summary-grid">
    ${this._msrKpiCard(e.manHoursMonth,this._msrFmtNum(l.kpi.manHours),"blue")}
    ${this._msrKpiCard(e.recordables,this._msrFmtNum(l.kpi.recordables),"warn")}
    ${this._msrKpiCard(e.trir,this._msrFmtRate(l.kpi.trir,2),"green")}
    ${this._msrKpiCard(e.afr,this._msrFmtRate(l.kpi.afr,2),"green")}
    ${this._msrKpiCard(e.fr,this._msrFmtRate(l.kpi.fr,2),"green")}
    ${this._msrKpiCard(e.sr,this._msrFmtRate(l.kpi.sr,2),"green")}
  </div>

  <h3 class="section-title ar-text" dir="${e.dir}">${s(e.hseActivities)}</h3>
  <table class="report-table">
    <thead><tr><th class="ar-text" dir="${e.dir}">${s(e.activity)}</th><th style="text-align:center" class="ar-text" dir="${e.dir}">${s(e.count)}</th></tr></thead>
    <tbody>
      ${this._msrTableRow([c(e.trainingsConducted),u(l.activities.trainings)])}
      ${this._msrTableRow([c(e.participantsTrained),u(l.activities.participants)])}
      ${this._msrTableRow([c(e.auditsInspections),u(l.activities.inspections)])}
      ${this._msrTableRow([c(e.ptwsIssued),u(l.activities.ptw)])}
      ${this._msrTableRow([c(e.observations),u(l.activities.observations)])}
      ${this._msrTableRow([c(e.toolboxTalks),u(l.activities.toolbox)])}
    </tbody>
  </table>

  <h3 class="section-title ar-text" dir="${e.dir}">${s(e.manpowerStatus)}</h3>
  <table class="report-table">
    <thead><tr><th class="ar-text" dir="${e.dir}">${s(e.metric)}</th><th style="text-align:center" class="ar-text" dir="${e.dir}">${s(y)}</th><th style="text-align:center" class="ar-text" dir="${e.dir}">${s(e.cumulative)}</th></tr></thead>
    <tbody>
      ${this._msrTableRow([c(e.manpowerAvg),u(l.manpower.avgMonth),u(l.manpower.avgCum)])}
      ${this._msrTableRow([c(e.totalManDays),u(l.manpower.manDaysMonth),u(l.manpower.manDaysCum)])}
      ${this._msrTableRow([`<strong class="ar-text" dir="${e.dir}">${s(e.totalManHours)}</strong>`,u(l.manpower.manHoursMonth),u(l.manpower.manHoursCum)],"msr-row-total")}
    </tbody>
  </table>

  <h3 class="section-title ar-text" dir="${e.dir}">${s(e.accidentReport)}</h3>
  <table class="report-table">
    <thead><tr><th class="ar-text" dir="${e.dir}">${s(e.description)}</th><th style="text-align:center" class="ar-text" dir="${e.dir}">${s(y)}</th><th style="text-align:center" class="ar-text" dir="${e.dir}">${s(e.cumulative)}</th></tr></thead>
    <tbody>
      ${this._msrTableRow([`<strong class="ar-text" dir="${e.dir}">${s(e.totalAccidents)}</strong>`,u(l.accidents.totalMonth),u(l.accidents.totalCum)],"msr-row-total")}
      ${this._msrTableRow([c(e.reportableAccidents),u(l.accidents.reportableMonth),u(l.accidents.reportableCum)],"msr-row-danger")}
      ${this._msrTableRow([c(e.minorAccidents),u(l.accidents.minorMonth),u(l.accidents.minorCum)],"msr-row-warn")}
      ${this._msrTableRow([c(e.firstAidCases),u(l.accidents.firstAidMonth),u(l.accidents.firstAidCum)],"msr-row-warn")}
      ${this._msrTableRow([c(e.nearMiss),u(l.accidents.nearMissMonth),u(l.accidents.nearMissCum)],"msr-row-info")}
      ${this._msrTableRow([c(e.manDaysLost),u(l.accidents.daysLostMonth),u(l.accidents.daysLostCum)])}
    </tbody>
  </table>

  <h3 class="section-title ar-text" dir="${e.dir}">${s(e.hseEvents)}</h3>
  <div class="msr-subsection ar-text" dir="${e.dir}">${s(e.hseCommittee)} \u2014 ${s(e.date)}: ${s(this._msrFmtDate(l.committeeDate,r))}</div>
  <table class="report-table">
    <thead><tr><th class="ar-text" dir="${e.dir}">${s(e.hseWalks)} \u2014 ${s(e.date)}</th><th class="ar-text" dir="${e.dir}">${s(e.withWhom)}</th></tr></thead>
    <tbody>${l.walkRows.length?l.walkRows.map(f=>this._msrTableRow([s(this._msrFmtDate(f.date,r)),`<span class="ar-text" dir="${e.dir}">${s(f.withWhom)}</span>`])).join(""):this._msrEmptyRow(2,e.dash)}</tbody>
  </table>
  <div class="msr-subsection ar-text" dir="${e.dir}">${s(e.hseInduction)}</div>
  <table class="report-table">
    <thead><tr><th class="ar-text" dir="${e.dir}">${s(e.date)}</th><th style="text-align:center" class="ar-text" dir="${e.dir}">${s(e.persons)}</th></tr></thead>
    <tbody>${l.inductionRows.length?l.inductionRows.map(f=>this._msrTableRow([s(this._msrFmtDate(f.date,r)),`<span class="msr-num">${s(f.persons)}</span>`])).join(""):this._msrEmptyRow(2,e.dash)}</tbody>
  </table>
  <div class="msr-subsection ar-text" dir="${e.dir}">${s(e.toolboxTraining)}</div>
  <table class="report-table">
    <thead><tr><th class="ar-text" dir="${e.dir}">${s(e.date)}</th><th class="ar-text" dir="${e.dir}">${s(e.topic)}</th><th style="text-align:center" class="ar-text" dir="${e.dir}">${s(e.participants)}</th></tr></thead>
    <tbody>${l.toolboxRows.length?l.toolboxRows.map(f=>this._msrTableRow([s(this._msrFmtDate(f.date,r)),`<span class="ar-text" dir="${e.dir}">${s(f.topic)}</span>`,`<span class="msr-num">${s(f.participants)}</span>`])).join(""):this._msrEmptyRow(3,e.dash)}</tbody>
  </table>
  <div class="msr-subsection ar-text" dir="${e.dir}">${s(e.hseTraining)}</div>
  <table class="report-table">
    <thead><tr><th class="ar-text" dir="${e.dir}">${s(e.date)}</th><th class="ar-text" dir="${e.dir}">${s(e.topic)}</th><th style="text-align:center" class="ar-text" dir="${e.dir}">${s(e.participants)}</th></tr></thead>
    <tbody>${l.trainingRows.length?l.trainingRows.map(f=>this._msrTableRow([s(this._msrFmtDate(f.date,r)),`<span class="ar-text" dir="${e.dir}">${s(f.topic)}</span>`,`<span class="msr-num">${s(f.participants)}</span>`])).join(""):this._msrEmptyRow(3,e.dash)}</tbody>
  </table>

  <h3 class="section-title ar-text" dir="${e.dir}">${s(e.hseMom)}</h3>
  <table class="report-table">
    <thead><tr><th class="ar-text" dir="${e.dir}">${s(e.date)}</th><th class="ar-text" dir="${e.dir}">${s(e.discussionPoints)}</th><th style="text-align:center" class="ar-text" dir="${e.dir}">${s(e.status)}</th></tr></thead>
    <tbody>${l.momRows.length?l.momRows.map(f=>this._msrTableRow([s(this._msrFmtDate(f.date,r)),`<span class="ar-text" dir="${e.dir}">${s(f.points)}</span>`,this._msrStatusBadge(f.status||e.open,r)])).join(""):this._msrEmptyRow(3,e.dash)}</tbody>
  </table>

  <div class="msr-grid-2">
    <div class="msr-note-card msr-note-high"><h4 class="ar-text" dir="${e.dir}">${s(e.highlights)}</h4><div class="ar-text" dir="${e.dir}">${s(l.highlights)}</div></div>
    <div class="msr-note-card msr-note-concern"><h4 class="ar-text" dir="${e.dir}">${s(e.concerns)}</h4><div class="ar-text" dir="${e.dir}">${s(l.concerns)}</div></div>
  </div>

  <h3 class="section-title ar-text" dir="${e.dir}">${s(e.authorization)}</h3>
  <div class="msr-auth-grid">
    <div class="msr-auth-box"><strong class="ar-text" dir="${e.dir}">${s(e.preparedBySign)}</strong><div class="msr-auth-line">${e.dash}</div></div>
    <div class="msr-auth-box"><strong class="ar-text" dir="${e.dir}">${s(e.reviewedBy)}</strong><div class="msr-auth-line">${e.dash}</div></div>
  </div>`},buildMonthlySafetyReportHtml(a,t,r="ar",o=null){const n=this.getMonthlySafetyStrings(r),d=this.collectMonthlySafetyReportModel(a,t,o),e=b=>Utils.escapeHTML(b==null?"":String(b)),l=d.site||(o?this.getMonthlySafetySiteById(o):null),s=l?this.getMonthlySafetySiteLabel(l,r):n.allSites,c=`
${this._getMonthlySafetyReportStyles(r)}
<div class="msr-report" id="monthly-safety-report-root" dir="${n.dir}">
${this.buildMonthlySafetyReportBody(a,t,r,o)}
</div>`,g=`MSR-${t.label}-${o||"ALL"}`,y=l?`${n.title} \u2014 ${s}`:n.title,x=this._msrBuildPdfMeta(t,r,s,d.preparedBy,o);return typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(g,y,c,!1,!1,x,new Date().toISOString(),new Date().toISOString()):`<!DOCTYPE html><html lang="${n.lang}" dir="${n.dir}"><head><meta charset="UTF-8"><title>${e(y)}</title></head><body>${c}</body></html>`},buildMonthlySafetyReportAllSitesHtml(a,t,r="ar"){const o=this.getMonthlySafetyStrings(r),n=b=>Utils.escapeHTML(b==null?"":String(b)),d=this.collectMonthlySafetyReportModel(a,t,null),e=this.getMonthlySafetySites(),l=`
  <div class="msr-site-block">
    <div class="msr-site-banner overview ar-text" dir="${o.dir}">${n(o.allSitesCombined)}</div>
    ${this.buildMonthlySafetyReportBody(a,t,r,null,{skipIntro:!1})}
  </div>`,s=e.map(b=>{const u=this.getMonthlySafetySiteLabel(b,r);return`
  <div class="msr-site-block" style="page-break-before:always">
    <div class="msr-site-banner ar-text" dir="${o.dir}">${n(u)}</div>
    ${this.buildMonthlySafetyReportBody(a,t,r,b.id,{skipIntro:!0})}
  </div>`}).join(""),c=`
${this._getMonthlySafetyReportStyles(r)}
<div class="msr-report msr-all-sites" id="monthly-safety-report-root" dir="${o.dir}">
  <h2 class="section-title msr-all-sites-title ar-text" dir="${o.dir}">${n(o.sitesBreakdown)}</h2>
  ${l}
  ${s}
</div>`,g=`MSR-${t.label}-ALL-SITES`,y=`${o.title} \u2014 ${o.allSites}`,x=this._msrBuildPdfMeta(t,r,o.allSites,d.preparedBy,"__all__",{allSites:!0});return typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(g,y,c,!1,!1,x,new Date().toISOString(),new Date().toISOString()):`<!DOCTYPE html><html lang="${o.lang}" dir="${o.dir}"><head><meta charset="UTF-8"><title>${n(y)}</title></head><body>${c}</body></html>`},async ensureMonthlySafetyPdfLibs(){if(typeof html2canvas<"u"&&Utils?.PdfExport?.getJsPdfConstructor?.())return!0;const a=t=>new Promise((r,o)=>{const n=document.createElement("script");n.src=t,n.onload=r,n.onerror=o,document.head.appendChild(n)});return typeof html2canvas>"u"&&await a("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"),Utils?.PdfExport?.getJsPdfConstructor?.()||await a("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"),typeof html2canvas<"u"&&!!Utils?.PdfExport?.getJsPdfConstructor?.()},async _msrPreparePdfHtml(a,t){let r=String(a||"");const o=t!=="en",n='<style id="msr-pdf-color-fix">*{ -webkit-print-color-adjust:exact!important; print-color-adjust:exact!important; }</style>',d=`
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<style id="msr-arabic-pdf-fix">
html,body{font-family:'Cairo','Tahoma','Segoe UI','Arial',sans-serif!important;letter-spacing:0!important;word-spacing:normal!important;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}
body,.report-wrapper,.report-wrapper *,.msr-report,.msr-report *{font-family:'Cairo','Tahoma','Segoe UI','Arial',sans-serif!important;letter-spacing:0!important;word-spacing:normal!important}
.report-header .company-brand .company-name,.report-header .company-brand .company-name-secondary,.header-title-ar,.meta-label,.meta-value,.ar-text{direction:${o?"rtl":"inherit"}!important;unicode-bidi:embed!important;word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important}
.report-header .company-brand .company-name,.report-header .company-brand .company-name-secondary{white-space:nowrap!important}
h1,h2,h3,th,td,.section-title,.summary-label,.msr-intro-value{word-break:normal!important;overflow-wrap:break-word!important}
table,.report-table,thead,tbody,tr,th,td{direction:${o?"rtl":"inherit"}!important}
</style>`;return r.includes("</head>")&&(r=r.replace("</head>",`${n}${d}</head>`)),r},async _msrWaitPdfFonts(a){if(a?.fonts?.load)try{await Promise.all([a.fonts.load("400 12px Cairo"),a.fonts.load("600 14px Cairo"),a.fonts.load("700 16px Cairo"),a.fonts.load("800 20px Cairo")]),await a.fonts.ready}catch{}},async _msrCaptureReportCanvas(a){const t={backgroundColor:"#ffffff",logging:!1,scrollX:0,scrollY:0,windowWidth:Math.max(a.scrollWidth,900),windowHeight:Math.max(a.scrollHeight,1),onclone:d=>{const e=d.createElement("style");e.textContent=`*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
html,body,.report-wrapper,.report-wrapper *,.msr-report,.msr-report *{font-family:'Cairo','Tahoma','Segoe UI',sans-serif!important;letter-spacing:0!important;word-spacing:normal!important}`,d.head.appendChild(e)}},r=Utils.PdfExport.getOptimalCaptureScale(a.scrollWidth,a.scrollHeight,1.5),o=[{...t,scale:r,useCORS:!0,allowTaint:!1},{...t,scale:r,useCORS:!0,allowTaint:!0},{...t,scale:Math.min(r,1.3),useCORS:!1,allowTaint:!0}];let n=null;for(let d=0;d<o.length;d+=1)try{const e=await html2canvas(a,o[d]);if(e?.width>0&&e?.height>0)return e}catch(e){n=e}if(n)throw n;return null},async downloadMonthlySafetyReport(a,t="ar",r=null){const{t:o}=this.getTranslations();if(!a)return Notification.error(o("msg.invalidDateRange")),!1;if(typeof AppState>"u"||!AppState.appData)return Notification.error(o("msg.noData")),!1;await this.ensureTrainingDataForReport();const n=r==="__all__",d=n?this.buildMonthlySafetyReportAllSitesHtml(AppState.appData,a,t):this.buildMonthlySafetyReportHtml(AppState.appData,a,t,r),e=await this._msrPreparePdfHtml(d,t),l=n?"_ALL_SITES":r?`_${r}`:"",s=`Monthly_Safety_Report_${a.label}${l}_${t}.pdf`,c=document.createElement("iframe");c.setAttribute("aria-hidden","true"),c.style.cssText="position:fixed;left:-100000px;top:0;width:900px;height:1400px;border:0;visibility:hidden;",document.body.appendChild(c);try{if(!await this.ensureMonthlySafetyPdfLibs())return Notification.error(o("msg.allowPopups")),!1;c.srcdoc=e,await new Promise(S=>{c.onload=S,c.onerror=S,setTimeout(S,5e3)});const y=c.contentDocument||c.contentWindow?.document;if(!y)return!1;await this._msrWaitPdfFonts(y),await Promise.all(Array.from(y.images||[]).map(S=>new Promise(f=>{if(S.complete)return f();S.onload=f,S.onerror=f,setTimeout(f,3e3)})));const x=y.querySelector(".report-wrapper")||y.getElementById("monthly-safety-report-root")||y.body,b=await this._msrCaptureReportCanvas(x);if(!b)return!1;const u=Utils.PdfExport.createPdf({orientation:"portrait",unit:"mm",format:"a4"});return u?(Utils.PdfExport.appendCanvasAsPdfPages(u,b,{marginMm:8}),Utils.PdfExport.savePdf(u,s),!0):!1}catch(g){return typeof Utils<"u"&&Utils.safeError&&Utils.safeError("downloadMonthlySafetyReport:",g),Notification.error(g&&g.message||"\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"),!1}finally{c.remove()}},async sendReportEmail(a,t){if(!(typeof EmailDispatch>"u")){if(await EmailDispatch.loadSettings(),!EmailDispatch.canManualSend("reports")){typeof Notification<"u"&&Notification.warning("\u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644 \u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645. \u0631\u0627\u062C\u0639 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u062F.");return}EmailDispatch.openSendModal({moduleKey:"reports",recordId:"report-"+Date.now(),title:a||"\u062A\u0642\u0631\u064A\u0631",fields:Array.isArray(t)?t:[]})}},async generateAndExport(a,t={}){let r=null;try{const{t:o}=this.getTranslations();if(typeof AppState>"u"||!AppState.appData){Notification.error(o("msg.noData"));return}if(r=window.open("","_blank"),!r){Notification.error(o("msg.allowPopups"));return}r.document.write('<html dir="rtl"><body style="font-family: Arial; padding: 20px; text-align: center;"><p>\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631...</p></body></html>'),r.document.close(),(a==="full"||a==="period")&&await this.ensureTrainingDataForReport();const n=AppState.appData;let d="",e="",l=`REPORT-${String(a).toUpperCase()}-${new Date().toISOString().slice(0,10)}`,s={version:AppState?.companySettings?.formVersion||"1.0"};switch(a){case"incidents":d=o("report.incidents");const g=n.incidents||[];if(!Array.isArray(g)){Notification.error(o("msg.incidentsInvalid")),r&&r.close();return}e=this.generateIncidentsReport(g);break;case"training":d=o("report.training");const y=n.training||[];if(!Array.isArray(y)){Notification.error(o("msg.trainingInvalid")),r&&r.close();return}e=this.generateTrainingReport(y);break;case"period":{const x=t.period||await this._askForPeriod();if(!x){r&&r.close();return}d=`${o("report.periodSummary")} - ${x.label}`,e=this.generatePeriodSummaryReport(n,x);break}case"full":d=o("report.full"),e=this.generateFullReport(n);break;default:throw r&&r.close(),new Error(o("msg.unknownReport"))}const c=typeof FormHeader<"u"&&FormHeader.generatePDFHTML?FormHeader.generatePDFHTML(l,d,e,!1,!0,s,new Date().toISOString(),new Date().toISOString()):`<html><body>${e}</body></html>`;r.document.open(),r.document.write(c),r.document.close(),setTimeout(()=>{try{r.print()}catch(g){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631:",g)}},300)}catch(o){r&&typeof r.close=="function"&&r.close();const n=(typeof Notification<"u"&&Notification.error,o&&o.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u0639\u0646\u062F \u0627\u0633\u062A\u062E\u0631\u0627\u062C \u0627\u0644\u062A\u0642\u0631\u064A\u0631");typeof Notification<"u"&&Notification.error&&Notification.error(n)}},generateIncidentsReport(a){const{t,lang:r}=this.getTranslations(),o=r==="ar"?"ar-SA":"en-GB";return`
            <div class="section-title">${t("report.totalIncidents")}: ${a.length}</div>
            <p style="margin-bottom: 20px; color: #666;">${t("report.createdDate")}: ${new Date().toLocaleDateString(o)}</p>
            <table>
                <thead>
                    <tr>
                        <th>${t("report.isoCode")}</th>
                        <th>${t("report.date")}</th>
                        <th>${t("report.location")}</th>
                        <th>${t("report.severity")}</th>
                        <th>${t("report.status")}</th>
                        <th>${t("report.description")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${a.map(n=>`
                        <tr>
                            <td>${Utils.escapeHTML(n.isoCode||"")}</td>
                            <td>${n.date?Utils.formatDate(n.date):""}</td>
                            <td>${Utils.escapeHTML(n.location||"")}</td>
                            <td>${Utils.escapeHTML(n.severity||"")}</td>
                            <td>${Utils.escapeHTML(n.status||"")}</td>
                            <td>${Utils.escapeHTML((n.description||"").substring(0,100))}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `},generatePeriodSummaryReport(a,t){const{t:r,lang:o}=this.getTranslations(),n=o==="ar"?"ar-SA":"en-GB",d=t&&t.startDate?new Date(t.startDate):null,e=t&&t.endDate?new Date(t.endDate):null,l=this._filterArrayByDateRange(a.incidents||[],["date","incidentDate","createdAt"],d,e),s=this._filterArrayByDateRange(a.nearmiss||[],["date","createdAt"],d,e),c=this._filterArrayByDateRange(a.ptw||[],["startDate","date","createdAt","endDate"],d,e),g=this._filterArrayByDateRange(a.dailyObservations||[],["date","createdAt"],d,e),y=this._filterArrayByDateRange(a.clinicVisits||[],["visitDate","date","createdAt"],d,e),x=a.training||[],b=a.trainingAttendance||[],u=a.contractorTrainings||[],S=this._filterArrayByDateRange(x,["startDate","date","createdAt"],d,e),f=this._filterArrayByDateRange(b,["date","attendanceDate","createdAt"],d,e),D=this._filterArrayByDateRange(u,["date","trainingDate","startDate","createdAt"],d,e),_=a.violations||[],T=this._filterArrayByDateRange(_,["date","violationDate","createdAt"],d,e),M=[];let A=0;const h=new Set;f.forEach(i=>{i.employeeCode&&h.add(String(i.employeeCode).trim())}),S.forEach(i=>{if(i.participants&&Array.isArray(i.participants)&&i.participants.forEach(m=>{const $=m.code||m.employeeNumber;$&&!M.find(C=>(C.code||C.employeeNumber)===$)&&M.push(m)}),i.hours)A+=Number(parseFloat(i.hours))||0;else if(i.duration)A+=Number(parseFloat(i.duration))||0;else if(i.startTime&&i.endTime)try{const m=new Date(`2000-01-01 ${i.startTime}`),C=(new Date(`2000-01-01 ${i.endTime}`)-m)/(1e3*60*60);A+=Number.isFinite(C)?C:0}catch{}});const E=f.reduce((i,m)=>{const $=parseFloat(m.totalHours);return i+(Number.isFinite($)?$:0)},0);E>0&&(A=E);const F=M.length,H=typeof Training<"u"&&Training.getParticipantsCount?S.reduce((i,m)=>i+Training.getParticipantsCount(m),0):S.reduce((i,m)=>{const $=Number(m.participantsCount)||0;return i+(Number.isFinite($)?$:0)},0),p=h.size>0?h.size:F>0?F:H,v=p>0?(Number(A)/Number(p)).toFixed(2):"0.00",w=S.length,R=new Set;S.forEach(i=>{const m=(i.name||i.programName||"").toString().trim();m&&R.add(m)});const K=R.size||w,B=D.reduce((i,m)=>{const $=Number(m.traineesCount||m.attendees||0);return i+(Number.isFinite($)?$:0)},0),V=D.reduce((i,m)=>{const $=parseFloat(m.totalHours||m.trainingHours||0);return i+(Number.isFinite($)?$:0)},0),U=B>0?(V/B).toFixed(2):"0.00",z=D.length,Y=new Set;D.forEach(i=>{const m=(i.name||i.trainingName||i.topic||"").toString().trim();m&&Y.add(m)});const W=Y.size||z,O=T.filter(i=>i.violationType==="\u0645\u0648\u0638\u0641\u064A\u0646"||i.category==="\u0645\u0648\u0638\u0641\u064A\u0646"||!i.contractorName&&i.employeeName),j=T.filter(i=>i.violationType==="\u0645\u0642\u0627\u0648\u0644\u064A\u0646"||i.category==="\u0645\u0642\u0627\u0648\u0644\u064A\u0646"||i.contractorName),L={},N={};T.forEach(i=>{const m=i.department||i.employeeDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";L[m]=(L[m]||0)+1;const $=(i.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";N[$]=(N[$]||0)+1});const G=Object.keys(L).map(i=>`<tr><td>${Utils.escapeHTML(i)}</td><td>${L[i]}</td></tr>`).join(""),k=Object.keys(N).map(i=>`<tr><td>${Utils.escapeHTML(i)}</td><td>${N[i]}</td></tr>`).join(""),I=r("report.hour"),P=t.type==="yearly"?r("report.periodTypeYearly"):r("report.periodTypeMonthly"),J=d&&e?`${d.toLocaleDateString(n)} - ${e.toLocaleDateString(n)}`:t.label;return`
            <div class="section-title">${r("report.periodSummary")}</div>
            <p style="margin-bottom: 10px; color: #666;">
                ${r("report.period")}: ${Utils.escapeHTML(J)} (${Utils.escapeHTML(P)})
            </p>
            <p style="margin-bottom: 20px; color: #666;">
                ${r("report.createdDate")}: ${new Date().toLocaleDateString(n)}
            </p>

            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${r("report.basicStats")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${r("report.type")}</th>
                        <th>${r("report.total")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${r("report.ptw")}</td>
                        <td>${c.length}</td>
                    </tr>
                    <tr>
                        <td>${r("report.observations")}</td>
                        <td>${g.length}</td>
                    </tr>
                    <tr>
                        <td>${r("report.incidentsRow")}</td>
                        <td>${l.length}</td>
                    </tr>
                    <tr>
                        <td>${r("report.nearmiss")}</td>
                        <td>${s.length}</td>
                    </tr>
                    <tr>
                        <td>${r("report.clinicVisits")}</td>
                        <td>${y.length}</td>
                    </tr>
                    <tr>
                        <td>${r("report.trainingPrograms")}</td>
                        <td>${S.length+D.length}</td>
                    </tr>
                    <tr>
                        <td>${r("report.violations")}</td>
                        <td>${T.length}</td>
                    </tr>
                </tbody>
            </table>

            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${r("report.trainingSection")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${r("report.indicator")}</th>
                        <th>${r("report.value")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${r("report.employeeTrainingPrograms")}</td>
                        <td>${w}</td>
                    </tr>
                    <tr>
                        <td>${r("report.employeeTrainingTopics")}</td>
                        <td>${K}</td>
                    </tr>
                    <tr>
                        <td>${r("report.traineesCount")}</td>
                        <td>${p}</td>
                    </tr>
                    <tr>
                        <td>${r("report.avgTrainingHoursEmployees")}</td>
                        <td>${v} ${I}</td>
                    </tr>
                    <tr>
                        <td>${r("report.totalTrainingHoursEmployees")}</td>
                        <td>${Number(A).toFixed(2)} ${I}</td>
                    </tr>
                </tbody>
            </table>

            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${r("report.trainingContractors")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${r("report.indicator")}</th>
                        <th>${r("report.value")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${r("report.contractorTrainingPrograms")}</td>
                        <td>${z}</td>
                    </tr>
                    <tr>
                        <td>${r("report.contractorTrainingTopics")}</td>
                        <td>${W}</td>
                    </tr>
                    <tr>
                        <td>${r("report.traineesContractors")}</td>
                        <td>${B}</td>
                    </tr>
                    <tr>
                        <td>${r("report.avgTrainingContractors")}</td>
                        <td>${U} ${I}</td>
                    </tr>
                    <tr>
                        <td>${r("report.totalTrainingContractors")}</td>
                        <td>${Number(V).toFixed(2)} ${I}</td>
                    </tr>
                </tbody>
            </table>

            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${r("report.violationsSection")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${r("report.indicator")}</th>
                        <th>${r("report.value")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${r("report.employeeViolations")}</td>
                        <td>${O.length}</td>
                    </tr>
                    <tr>
                        <td>${r("report.contractorViolations")}</td>
                        <td>${j.length}</td>
                    </tr>
                </tbody>
            </table>

            ${k?`
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${r("report.violationsByType")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${r("report.violationType")}</th>
                        <th>${r("report.violationsCount")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${k}
                </tbody>
            </table>
            `:""}

            ${G?`
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${r("report.violationsByDept")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${r("report.department")}</th>
                        <th>${r("report.violationsCount")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${G}
                </tbody>
            </table>
            `:""}
        `},generateTrainingReport(a){const{t,lang:r}=this.getTranslations(),o=r==="ar"?"ar-SA":"en-GB";return`
            <div class="section-title">${t("report.totalPrograms")}: ${a.length}</div>
            <p style="margin-bottom: 20px; color: #666;">${t("report.createdDate")}: ${new Date().toLocaleDateString(o)}</p>
            <table>
                <thead>
                    <tr>
                        <th>${t("report.programName")}</th>
                        <th>${t("report.date")}</th>
                        <th>${t("report.trainer")}</th>
                        <th>${t("report.participantsCount")}</th>
                        <th>${t("report.status")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${a.map(n=>`
                        <tr>
                            <td>${Utils.escapeHTML(n.name||"")}</td>
                            <td>${n.startDate?Utils.formatDate(n.startDate):""}</td>
                            <td>${Utils.escapeHTML(n.trainer||"")}</td>
                            <td>${typeof Training<"u"&&Training.getParticipantsCount?Training.getParticipantsCount(n):n.participants?.length||n.participantsCount||0}</td>
                            <td>${Utils.escapeHTML(n.status||"")}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `},generateFullReport(a){const t=a.training||[],r=a.trainingAttendance||[],o=a.contractorTrainings||[],n=[];let d=0;const e=new Set;r.forEach(p=>{p.employeeCode&&e.add(String(p.employeeCode).trim())}),t.forEach(p=>{if(p.participants&&Array.isArray(p.participants)&&p.participants.forEach(v=>{const w=v.code||v.employeeNumber;w&&!n.find(R=>(R.code||R.employeeNumber)===w)&&n.push(v)}),p.hours)d+=Number(parseFloat(p.hours))||0;else if(p.duration)d+=Number(parseFloat(p.duration))||0;else if(p.startTime&&p.endTime)try{const v=new Date(`2000-01-01 ${p.startTime}`),R=(new Date(`2000-01-01 ${p.endTime}`)-v)/(1e3*60*60);d+=Number.isFinite(R)?R:0}catch{}});const l=r.reduce((p,v)=>{const w=parseFloat(v.totalHours);return p+(Number.isFinite(w)?w:0)},0);l>0&&(d=l);const s=n.length,c=typeof Training<"u"&&Training.getParticipantsCount?t.reduce((p,v)=>p+Training.getParticipantsCount(v),0):t.reduce((p,v)=>{const w=Number(v.participantsCount)||0;return p+(Number.isFinite(w)?w:0)},0),g=e.size>0?e.size:s>0?s:c,y=g>0?(Number(d)/Number(g)).toFixed(2):"0.00",x=o.reduce((p,v)=>{const w=Number(v.traineesCount||v.attendees||0);return p+(Number.isFinite(w)?w:0)},0),b=o.reduce((p,v)=>{const w=parseFloat(v.totalHours||v.trainingHours||0);return p+(Number.isFinite(w)?w:0)},0),u=x>0?(b/x).toFixed(2):"0.00",S=a.violations||[],f=S.filter(p=>p.violationType==="\u0645\u0648\u0638\u0641\u064A\u0646"||p.category==="\u0645\u0648\u0638\u0641\u064A\u0646"||!p.contractorName&&p.employeeName),D=S.filter(p=>p.violationType==="\u0645\u0642\u0627\u0648\u0644\u064A\u0646"||p.category==="\u0645\u0642\u0627\u0648\u0644\u064A\u0646"||p.contractorName),_={},T={};S.forEach(p=>{const v=p.department||p.employeeDepartment||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";_[v]=(_[v]||0)+1;const w=(p.violationType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";T[w]=(T[w]||0)+1});const M=Object.keys(_).map(p=>`<tr><td>${Utils.escapeHTML(p)}</td><td>${_[p]}</td></tr>`).join(""),A=Object.keys(T).map(p=>`<tr><td>${Utils.escapeHTML(p)}</td><td>${T[p]}</td></tr>`).join(""),{t:h,lang:E}=this.getTranslations(),F=E==="ar"?"ar-SA":"en-GB",H=h("report.hour");return`
            <div class="section-title">${h("report.generalStats")}</div>
            <p style="margin-bottom: 20px; color: #666;">${h("report.createdDate")}: ${new Date().toLocaleDateString(F)}</p>
            
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${h("report.basicStats")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${h("report.type")}</th>
                        <th>${h("report.total")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${h("report.incidentsRow")}</td>
                        <td>${(a.incidents||[]).length}</td>
                    </tr>
                    <tr>
                        <td>${h("report.nearmiss")}</td>
                        <td>${(a.nearmiss||[]).length}</td>
                    </tr>
                    <tr>
                        <td>${h("report.ptw")}</td>
                        <td>${(a.ptw||[]).length}</td>
                    </tr>
                    <tr>
                        <td>${h("report.trainingPrograms")}</td>
                        <td>${t.length}</td>
                    </tr>
                    <tr>
                        <td>${h("report.violations")}</td>
                        <td>${S.length}</td>
                    </tr>
                    <tr>
                        <td>${h("report.clinicVisits")}</td>
                        <td>${(a.clinicVisits||[]).length}</td>
                    </tr>
                </tbody>
            </table>
            
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${h("report.trainingSection")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${h("report.indicator")}</th>
                        <th>${h("report.value")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${h("report.traineesCount")}</td>
                        <td>${g}</td>
                    </tr>
                    <tr>
                        <td>${h("report.avgTrainingHoursEmployees")}</td>
                        <td>${y} ${H}</td>
                    </tr>
                    <tr>
                        <td>${h("report.totalTrainingHoursEmployees")}</td>
                        <td>${Number(d).toFixed(2)} ${H}</td>
                    </tr>
                </tbody>
            </table>

            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${h("report.trainingContractors")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${h("report.indicator")}</th>
                        <th>${h("report.value")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${h("report.traineesContractors")}</td>
                        <td>${x}</td>
                    </tr>
                    <tr>
                        <td>${h("report.avgTrainingContractors")}</td>
                        <td>${u} ${H}</td>
                    </tr>
                    <tr>
                        <td>${h("report.totalTrainingContractors")}</td>
                        <td>${Number(b).toFixed(2)} ${H}</td>
                    </tr>
                </tbody>
            </table>
            
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${h("report.violationsSection")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${h("report.indicator")}</th>
                        <th>${h("report.value")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${h("report.employeeViolations")}</td>
                        <td>${f.length}</td>
                    </tr>
                    <tr>
                        <td>${h("report.contractorViolations")}</td>
                        <td>${D.length}</td>
                    </tr>
                </tbody>
            </table>
            
            ${A?`
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${h("report.violationsByType")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${h("report.violationType")}</th>
                        <th>${h("report.violationsCount")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${A}
                </tbody>
            </table>
            `:""}
            
            ${M?`
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${h("report.violationsByDept")}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${h("report.department")}</th>
                        <th>${h("report.violationsCount")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${M}
                </tbody>
            </table>
            `:""}
        `}};(function(){"use strict";try{typeof window<"u"&&typeof Reports<"u"&&(window.Reports=Reports,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Reports module loaded and available on window.Reports"))}catch{if(typeof window<"u"&&typeof Reports<"u")try{window.Reports=Reports}catch{}}})();
