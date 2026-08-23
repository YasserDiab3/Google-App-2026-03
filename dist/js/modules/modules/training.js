const Training={applyModuleI18n(t){const e=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!e)return;const a=t||document.getElementById("training-section")||document;e.applyI18n(a),typeof e.applyLiteralTranslations=="function"&&e.applyLiteralTranslations(a)},currentEditId:null,trainingAnalysisCharts:null,_trainingDataLoadPromise:null,_trainingBackendFetchOk:!1,_trainingTabFetchOk:{programs:!1,attendance:!1,legalTraining:!1},_contractorTrainingsFetchOk:!1,_contractorTrainingsLoadPromise:null,_currentActiveTab:"programs",_tabCache:{programs:null,contractors:null,attendance:null,analysis:null,legalTraining:null},_tabDirty:{programs:!0,contractors:!0,attendance:!0,analysis:!0,legalTraining:!0},_bundleActionUnsupported:!1,_analysisExportContext:null,_contractorTrainingsLocalSaveTime:0,ensureData(){const t=AppState.appData||{};Array.isArray(t.training)||(t.training=[]),Array.isArray(t.trainingSessions)||(t.trainingSessions=[]),Array.isArray(t.trainingCertificates)||(t.trainingCertificates=[]),Array.isArray(t.trainingAttendance)||(t.trainingAttendance=[]),Array.isArray(t.contractorTrainings)||(t.contractorTrainings=[]),Array.isArray(t.legalTrainings)||(t.legalTrainings=[]),Array.isArray(t.legalRegister)||(t.legalRegister=[]),Array.isArray(t.legalTrainingAttendees)||(t.legalTrainingAttendees=[]),(!t.employeeTrainingMatrix||typeof t.employeeTrainingMatrix!="object")&&(t.employeeTrainingMatrix={}),(!t.trainingAnalysisData||typeof t.trainingAnalysisData!="object")&&(t.trainingAnalysisData={}),AppState.appData=t,this.fixExistingContractorTrainingTimes()},getParticipantsCount(t){if(!t||typeof t!="object")return 0;const e=Number(t.participantsCount);return Number.isFinite(e)?e:Array.isArray(t.participants)?t.participants.length:0},getTrainingProgramHours(t){if(!t||typeof t!="object")return 0;const e=parseFloat(t.totalHours??t.trainingHours??t.hours??0);return Number.isFinite(e)?e:0},getParticipantsArray(t){if(!t||typeof t!="object")return[];const e=t.participants;if(Array.isArray(e))return e;if(typeof e=="string"&&e.trim())try{const a=JSON.parse(e);return Array.isArray(a)?a:[]}catch{return[]}return[]},fixExistingContractorTrainingTimes(){const t=AppState.appData?.contractorTrainings;if(!Array.isArray(t)||t.length===0)return;let e=!1,a=0;t.forEach(i=>{if(!i)return;const n=i.startTime||i.fromTime,s=i.endTime||i.toTime,r=n&&String(n).trim()!==""&&n!=="\u2014"&&n!=="-"&&n!=="null"&&n!=="undefined",o=s&&String(s).trim()!==""&&s!=="\u2014"&&s!=="-"&&s!=="null"&&s!=="undefined";if(!r||!o){a++,r||(i.startTime="09:00",i.fromTime!==void 0&&(i.fromTime="09:00"),e=!0),o||(i.endTime="10:00",i.toTime!==void 0&&(i.toTime="10:00"),e=!0);const l=i.startTime||i.fromTime,d=i.endTime||i.toTime;if(l&&d){const c=this.calculateDuration(l,d);if(c>0&&((!i.durationMinutes||i.durationMinutes===0)&&(i.durationMinutes=c,e=!0),!i.totalHours||i.totalHours===0)){const p=parseInt(i.traineesCount||i.attendees||0,10);p>0&&(i.totalHours=parseFloat((c/60*p).toFixed(2)),e=!0)}}}}),e&&(typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0635\u0644\u0627\u062D ${a} \u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628 \u0628\u0625\u0636\u0627\u0641\u0629 \u0623\u0648\u0642\u0627\u062A \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629`),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())},calculateDuration(t,e){if(!t||!e)return 0;try{const a=t.split(":"),i=e.split(":");if(a.length<2||i.length<2)return 0;const n=parseInt(a[0],10)*60+parseInt(a[1],10);let r=parseInt(i[0],10)*60+parseInt(i[1],10)-n;return r<0&&(r+=1440),r}catch{return 0}},getTrainingAnalysisStorageKeys(){return{cards:"training_infoCards",items:"training_analysisItems"}},getTrainingDefaultAnalysisCards(){return[{id:"card_total_trainings",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0631\u0627\u0645\u062C",icon:"fas fa-graduation-cap",color:"blue",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628",enabled:!0,mode:"metric",metric:"totalTrainings"},{id:"card_completed_trainings",title:"\u0628\u0631\u0627\u0645\u062C \u0645\u0643\u062A\u0645\u0644\u0629",icon:"fas fa-check-circle",color:"green",description:"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629",enabled:!0,mode:"metric",metric:"completedTrainings"},{id:"card_total_participants",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646",icon:"fas fa-users",color:"purple",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646 \u0641\u064A \u0627\u0644\u0628\u0631\u0627\u0645\u062C",enabled:!0,mode:"metric",metric:"totalParticipants"},{id:"card_contractor_trainings",title:"\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",icon:"fas fa-briefcase",color:"amber",description:"\u0639\u062F\u062F \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",enabled:!0,mode:"metric",metric:"contractorTrainings"},{id:"card_total_hours",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628",icon:"fas fa-clock",color:"indigo",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0633\u062C\u0644\u0629",enabled:!0,mode:"metric",metric:"totalTrainingHours"},{id:"card_unique_employees",title:"\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0627\u0644\u0645\u062F\u0631\u0628\u0648\u0646",icon:"fas fa-user-graduate",color:"teal",description:"\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0641\u0631\u064A\u062F\u064A\u0646 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646",enabled:!0,mode:"metric",metric:"uniqueEmployees"}]},getTrainingDefaultAnalysisItems(){return[{id:"trainings_by_status",label:"\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!0,dataset:"training",field:"status",chartType:"doughnut"},{id:"trainings_by_type",label:"\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",enabled:!0,dataset:"training",field:"trainingType",chartType:"bar"},{id:"trainings_by_month",label:"\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631",enabled:!0,dataset:"training",field:"byMonth",chartType:"line"},{id:"contractor_by_company",label:"\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062D\u0633\u0628 \u0627\u0644\u0634\u0631\u0643\u0629",enabled:!1,dataset:"contractorTrainings",field:"contractorName",chartType:"bar"},{id:"contractor_by_topic",label:"\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0636\u0648\u0639",enabled:!1,dataset:"contractorTrainings",field:"topic",chartType:"bar"},{id:"attendance_by_type",label:"\u0627\u0644\u062D\u0636\u0648\u0631 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628",enabled:!1,dataset:"trainingAttendance",field:"trainingType",chartType:"doughnut"},{id:"attendance_by_factory",label:"\u0627\u0644\u062D\u0636\u0648\u0631 \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0646\u0639",enabled:!1,dataset:"trainingAttendance",field:"factoryName",chartType:"bar"},{id:"attendance_by_department",label:"\u0627\u0644\u062D\u0636\u0648\u0631 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",enabled:!1,dataset:"trainingAttendance",field:"department",chartType:"bar"}]},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{try{const e=document.getElementById("training-section");e&&this.applyModuleI18n(e)}catch{}this._markAllTabsDirty(),this._currentActiveTab&&this.switchTab(this._currentActiveTab)}),this._languageChangeListenerAdded=!0),this.ensureData(),typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{Permissions.ensureFormSettingsState().catch(()=>{})}catch{}const t=document.getElementById("training-section");if(!t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError(" \u0642\u0633\u0645 training-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u0645\u062F\u064A\u0648\u0644 Training \u064A\u0643\u062A\u0628 \u0641\u064A \u0642\u0633\u0645: training-section");try{const e=this.isCurrentUserAdmin();t.innerHTML=`
            <style>
                /* \u2550\u2550 \u0647\u0648\u064A\u0629 HSE \u2014 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u2550\u2550 */
                #training-section .train-id-hero {
                    position: relative; overflow: hidden;
                    display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
                    border-radius: 18px; padding: 22px 26px 26px;
                    background: radial-gradient(circle at 85% -20%, rgba(251,191,36,.14), transparent 45%),
                                linear-gradient(120deg, #0b2a55 0%, #1e40af 55%, #2563eb 100%);
                    box-shadow: 0 12px 30px rgba(11,42,85,.28); color: #fff;
                }
                #training-section .train-id-hero::after {
                    content: ''; position: absolute; inset: auto 0 -34px 0; height: 34px;
                    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 40' preserveAspectRatio='none'%3E%3Cpath fill='%23ffffff' fill-opacity='0.10' d='M0 40 L60 10 L120 35 L180 4 L240 24 L300 8 L360 24 L420 12 L480 30 L540 16 L600 26 L660 10 L720 30 L780 14 L840 28 L900 10 L960 24 L1020 6 L1080 20 L1140 12 L1200 24 L1200 40 L0 40 Z'/%3E%3C/svg%3E");
                    background-size: cover; background-position: bottom; pointer-events: none;
                }
                #training-section .train-id-hero__outer { display: flex; align-items: center; gap: 10px; position: relative; z-index: 1; }
                #training-section .train-id-hero__icon {
                    width: 58px; height: 58px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    border-radius: 16px; background: linear-gradient(145deg, #fbbf24, #f59e0b);
                    color: #7c2d12; font-size: 1.5rem; box-shadow: 0 8px 18px rgba(0,0,0,.25);
                }
                #training-section .train-id-hero__text { flex: 1; min-width: 220px; position: relative; z-index: 1; }
                #training-section .train-id-hero__eyebrow {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-size: .8rem; font-weight: 700; color: #fde68a;
                    background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16);
                    padding: 4px 12px; border-radius: 999px; margin-bottom: 8px; letter-spacing: .3px;
                }
                #training-section .train-id-hero__title { margin: 0; font-size: 1.5rem; font-weight: 800; color: #fff; }
                #training-section .train-id-hero__subtitle { margin: 4px 0 0; font-size: .92rem; color: rgba(255,255,255,.75); }
                #training-section .train-id-hero__actions { display: flex; flex-wrap: wrap; gap: 10px; margin-inline-start: auto; position: relative; z-index: 1; }
                #training-section .train-id-hero__actions .btn-primary {
                    background: linear-gradient(145deg, #fbbf24, #f59e0b);
                    color: #7c2d12; font-weight: 700; border: none; border-radius: 12px;
                    box-shadow: 0 6px 16px rgba(245,158,11,.35);
                }
                #training-section .train-id-hero__actions .btn-primary:hover {
                    background: linear-gradient(145deg, #fcd34d, #f59e0b); color: #7c2d12; transform: translateY(-1px);
                }
                #training-section .train-id-hero__actions .btn-secondary {
                    background: rgba(255,255,255,.10); border: 1px solid rgba(255,255,255,.30);
                    color: #fff; border-radius: 12px; backdrop-filter: blur(4px);
                }
                #training-section .train-id-hero__actions .btn-secondary:hover {
                    background: rgba(255,255,255,.20); border-color: rgba(255,255,255,.45); color: #fff;
                }

                /* \u2550\u2550 \u0643\u0631\u0648\u062A KPI (\u0628\u0646\u0645\u0637 \u0633\u062C\u0644 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A pinsp-stat) \u2550\u2550 */
                #training-section .pinsp-stat {
                    position: relative; overflow: hidden; border-radius: 16px; border: 1px solid #dce7f5;
                    background: linear-gradient(160deg, #ffffff, #f4f8ff); box-shadow: 0 8px 22px rgba(15,47,90,.07);
                    display: flex; align-items: center; gap: 12px; padding: 16px; height: 100%;
                    transition: transform .18s ease, box-shadow .18s ease;
                }
                #training-section .pinsp-stat:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(15,47,90,.12); }
                #training-section .pinsp-stat__icon { flex: 0 0 auto; width: 48px; height: 48px; display: grid; place-items: center; border-radius: 13px; color: #fff; font-size: 1.15rem; }
                #training-section .pinsp-stat__icon--blue { background: linear-gradient(135deg,#1e40af,#3b82f6); }
                #training-section .pinsp-stat__icon--green { background: linear-gradient(135deg,#15803d,#22c55e); }
                #training-section .pinsp-stat__icon--red { background: linear-gradient(135deg,#b91c1c,#ef4444); }
                #training-section .pinsp-stat__icon--amber { background: linear-gradient(135deg,#b45309,#f59e0b); }
                #training-section .pinsp-stat__icon--indigo { background: linear-gradient(135deg,#4338ca,#6366f1); }
                #training-section .pinsp-stat__body { flex: 1; min-width: 0; }
                #training-section .pinsp-stat__label { font-size: .74rem; font-weight: 700; color: #64748b; margin: 0 0 2px; }
                #training-section .pinsp-stat__value { font-size: 1.7rem; font-weight: 900; line-height: 1.15; margin: 0; }
                #training-section .pinsp-stat__bar { height: 5px; margin-top: 7px; border-radius: 99px; background: #e5edf7; overflow: hidden; }
                #training-section .pinsp-stat__bar span { display: block; height: 100%; border-radius: 99px; }
                #training-section .pinsp-stat__pct { font-size: .7rem; font-weight: 700; color: #94a3b8; }
                @media (max-width: 520px) { #training-section .pinsp-stat__pct { display: none; } }

                /* \u2550\u2550 \u0643\u0631\u0648\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A (\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 / \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646) \u2550\u2550 */
                #training-section .contractor-analytics-kpi-card,
                #training-section .employee-analytics-kpi-card {
                    border: 1px solid #dce7f5; border-radius: 14px;
                    background: linear-gradient(160deg, #ffffff, #f4f8ff);
                    box-shadow: 0 6px 18px rgba(15,47,90,.06);
                    transition: transform .18s ease, box-shadow .18s ease;
                }
                #training-section .contractor-analytics-kpi-card:hover,
                #training-section .employee-analytics-kpi-card:hover {
                    transform: translateY(-2px); box-shadow: 0 12px 24px rgba(15,47,90,.12);
                }

                /* \u2550\u2550 \u0623\u0633\u0637\u062D \u0627\u0644\u0644\u0648\u062D\u0627\u062A \u2550\u2550 */
                #training-section #training-content .content-card {
                    border: 1px solid #dce7f5; border-radius: 16px;
                    box-shadow: 0 6px 18px rgba(15,47,90,.06); overflow: hidden;
                }
                #training-section #training-content .card-header {
                    background: linear-gradient(120deg, #f1f6ff, #ffffff);
                    border-bottom: 1px solid #dce7f5;
                }
                #training-section .data-table thead th {
                    background: linear-gradient(90deg, #1e40af, #2563eb);
                    color: #fff; border-color: #1d4ed8;
                }
                #training-section .data-table tbody tr:hover td { background: #f2f7ff; }
                #training-section .form-input:focus,
                #training-section input[type="text"]:focus,
                #training-section select:focus,
                #training-section textarea:focus {
                    border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.14);
                }

                /* \u2550\u2550\u2550 \u0627\u0644\u062F\u0627\u0643\u0646 \u2550\u2550\u2550 */
                [data-theme="dark"] #training-section .pinsp-stat,
                [data-theme="dark"] #training-section .contractor-analytics-kpi-card,
                [data-theme="dark"] #training-section .employee-analytics-kpi-card {
                    background: linear-gradient(160deg, #15283f, #1e2a45); border-color: #243b55; box-shadow: none;
                }
                [data-theme="dark"] #training-section .pinsp-stat__label { color: #93a7bd; }
                [data-theme="dark"] #training-section .pinsp-stat__bar { background: #334155; }
                [data-theme="dark"] #training-section .pinsp-stat__pct { color: #64748b; }
                [data-theme="dark"] #training-section #training-content .card-header {
                    background: linear-gradient(120deg, #16233f, #1e293b); border-bottom-color: #2a3b5c;
                }
                [data-theme="dark"] #training-section .data-table tbody tr:hover td { background: #1e293b; }
            </style>
            <div class="train-id-hero">
                <div class="train-id-hero__outer">
                    <div class="train-id-hero__icon"><i class="fas fa-graduation-cap"></i></div>
                    <div class="train-id-hero__text">
                        <span class="train-id-hero__eyebrow"><i class="fas fa-shield-halved fa-xs"></i> HSE \xB7 \u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629</span>
                        <h1 class="train-id-hero__title">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A</h1>
                        <p class="train-id-hero__subtitle">\u062A\u0633\u062C\u064A\u0644 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</p>
                    </div>
                </div>
                <div class="train-id-hero__actions">
                    ${e?`
                    <button id="view-annual-training-plan-btn" class="btn-secondary">
                        <i class="fas fa-calendar-check ml-2"></i>
                        \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629
                    </button>
                    <button id="view-training-matrix-btn" class="btn-secondary">
                        <i class="fas fa-table ml-2"></i>
                        \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628
                    </button>
                    `:""}
                    <button id="add-training-btn" onclick="Training.showForm()" class="btn-primary">
                        <i class="fas fa-plus ml-2"></i>
                        \u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628
                    </button>
                    <button id="training-refresh-btn" class="btn-secondary" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A">
                        <i class="fas fa-sync-alt ml-2"></i>
                        \u062A\u062D\u062F\u064A\u062B
                    </button>
                    <button id="add-contractor-training-header-btn" class="btn-primary">
                        <i class="fas fa-briefcase ml-2"></i>
                        \u062A\u0633\u062C\u064A\u0644 \u062A\u062F\u0631\u064A\u0628 \u0645\u0642\u0627\u0648\u0644
                    </button>
                </div>
            </div>
            <div id="training-content" class="mt-6">
                <style>
                    .tabs-container {
                        margin-bottom: 1.5rem;
                    }
                    .tabs-header {
                        display: flex;
                        gap: 0.5rem;
                        border: none;
                        padding: 10px;
                        flex-wrap: wrap;
                        background: radial-gradient(circle at 90% -40%, rgba(251,191,36,.14), transparent 40%),
                                    linear-gradient(120deg, #0b2a55, #1e3f8f 60%, #1e40af);
                        border-radius: 16px;
                        box-shadow: 0 8px 24px rgba(11,42,85,.18);
                    }
                    .tab-btn {
                        padding: 0.6rem 1.1rem;
                        background: rgba(255,255,255,.08);
                        border: 1px solid rgba(255,255,255,.16);
                        border-bottom: 1px solid rgba(255,255,255,.16);
                        border-radius: 12px;
                        color: #e2eaff;
                        font-size: 0.9rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        position: relative;
                        margin-bottom: 0;
                    }
                    .tab-btn:hover {
                        color: #ffffff;
                        background-color: rgba(255,255,255,.16);
                        border-color: rgba(255,255,255,.32);
                        transform: translateY(-1px);
                    }
                    .tab-btn.active {
                        color: #7c2d12;
                        background: linear-gradient(145deg, #fbbf24, #f59e0b);
                        border-color: #fbbf24;
                        font-weight: 800;
                        box-shadow: 0 6px 14px rgba(245,158,11,.35);
                    }
                    .tab-btn i {
                        font-size: 14px;
                    }
                    @media (max-width: 768px) {
                        .tabs-header {
                            flex-wrap: wrap;
                            gap: 0.35rem;
                        }
                        .tab-btn {
                            padding: 0.55rem 0.9rem;
                            font-size: 0.875rem;
                        }
                    }
                </style>
                <div class="tabs-container mb-6">
                    <div class="tabs-header">
                        <button class="tab-btn active" data-tab="programs" onclick="Training.switchTab('programs')">
                            <i class="fas fa-list ml-2"></i>
                            \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628
                        </button>
                        <button class="tab-btn" data-tab="contractors" onclick="Training.switchTab('contractors')">
                            <i class="fas fa-briefcase ml-2"></i>
                            \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629
                        </button>
                        <button class="tab-btn" data-tab="attendance" onclick="Training.switchTab('attendance')">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646
                        </button>
                        ${this.canViewLegalTrainingTab()?`
                        <button class="tab-btn" data-tab="legalTraining" onclick="Training.switchTab('legalTraining')">
                            <i class="fas fa-gavel ml-2"></i>
                            \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629
                        </button>
                        `:""}
                        ${this.isCurrentUserAdmin()?`
                        <button class="tab-btn" data-tab="analysis" onclick="Training.switchTab('analysis')">
                            <i class="fas fa-chart-bar ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                        </button>
                        `:""}
                    </div>
                </div>
                <div id="training-tab-content">
                    ${this.buildProgramsTabMarkup()}
                </div>
            </div>
        `,this.applyModuleI18n(t),this.setupEventListeners(),this._currentActiveTab="programs";try{const a=document.getElementById("training-tab-content");a&&(this._tabCache.programs=a.innerHTML,this._tabDirty.programs=!1)}catch{}this._hydrateTab("programs"),typeof StableLoader<"u"&&StableLoader.markPaint("training","programs",{count:(AppState.appData.training||[]).length}),this.loadTrainingDataAsync().catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u0639\u0636 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",a)})}catch(e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",e),t&&(t.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="Training.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `,this.applyModuleI18n(t))}},async refresh(){typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F504} \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628..."),typeof Notification<"u"&&Notification.info&&Notification.info("\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A..."),this._trainingBackendFetchOk=!1,this._trainingTabFetchOk={programs:!1,attendance:!1,legalTraining:!1},this._contractorTrainingsFetchOk=!1,await this.load(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D")},_showContractorLocalDataIfAny(){const t=AppState.appData?.contractorTrainings;!Array.isArray(t)||t.length===0||document.getElementById("contractor-training-container")&&(this.refreshContractorTrainingList().catch(()=>{}),this.updateContractorStatsWithFilter(document.getElementById("contractor-month-filter")?.value||""))},_onContractorTrainingsUpdated(){if(typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch{}this._currentActiveTab==="contractors"?(this.refreshContractorTrainingList().catch(()=>{}),this.updateContractorStatsWithFilter(document.getElementById("contractor-month-filter")?.value||"")):(this._tabDirty.contractors=!0,this._tabCache.contractors=null)},async loadContractorTrainingsPriority(){if(!this._contractorTrainingsFetchOk)return this._contractorTrainingsLoadPromise?this._contractorTrainingsLoadPromise:(this._contractorTrainingsLoadPromise=this._runLoadContractorTrainingsOnly().finally(()=>{this._contractorTrainingsLoadPromise=null}),this._contractorTrainingsLoadPromise)},async _runLoadContractorTrainingsOnly(){this.ensureData(),typeof StableLoader<"u"&&StableLoader.beginOwnedFetch("training-contractors");let t=!1;try{if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl){t=!0;return}if(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"){t=!0;return}const e=12e3,a=`\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645

\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0648\u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Apps Script.`,i=()=>Date.now()-(this._contractorTrainingsLocalSaveTime||0)>6e4,n=await Utils.promiseWithTimeout(GoogleIntegration.sendRequest({action:"getAllContractorTrainings",data:{filters:{},__timeoutMs:e,__highPriority:!0}}),e,a).catch(r=>(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 (\u0623\u0648\u0644\u0648\u064A\u0629):",r),{success:!1,data:[]})),s=n&&n.success&&Array.isArray(n.data)?n.data:null;s&&(t=!0,i()&&(AppState.appData.contractorTrainings=this._dedupeRegistryRecords(s),this._onContractorTrainingsUpdated()))}finally{this._contractorTrainingsFetchOk=t,typeof StableLoader<"u"&&StableLoader.endOwnedFetch("training-contractors")}},async loadTrainingDataAsync(){return this._fetchTrainingTabFromBackend(this._currentActiveTab||"programs")},async _fetchTrainingTabFromBackend(t){const e=t||this._currentActiveTab||"programs";if(e!=="programs"&&this._trainingTabFetchOk[e]===!0)return;const a="training:"+e,i=()=>this._runLoadTrainingDataAsyncWrapped_(e);return typeof StableLoader<"u"&&typeof StableLoader.runExclusive=="function"?StableLoader.runExclusive(a,i):this._trainingDataLoadPromise?this._trainingDataLoadPromise:(this._trainingDataLoadPromise=i().finally(()=>{this._trainingDataLoadPromise=null}),this._trainingDataLoadPromise)},async _runLoadTrainingDataAsyncWrapped_(t){typeof StableLoader<"u"&&StableLoader.beginOwnedFetch("training");try{return await this._runLoadTrainingDataAsync(t)}finally{typeof StableLoader<"u"&&StableLoader.endOwnedFetch("training")}},async _runLoadTrainingDataAsync(t){const e=AppState.appData?.training?.length>0||AppState.appData?.trainingSessions?.length>0||AppState.appData?.trainingCertificates?.length>0,a=Array.isArray(AppState.appData?.contractorTrainings)&&AppState.appData.contractorTrainings.length>0;if(e&&this._currentActiveTab==="programs"&&this.loadTrainingList(),a&&this._currentActiveTab==="contractors"&&this._showContractorLocalDataIfAny(),!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F Google Apps Script \u063A\u064A\u0631 \u0645\u0641\u0639\u0644 - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0641\u0642\u0637"),this._trainingBackendFetchOk=!0,this._trainingTabFetchOk={programs:!0,attendance:!0,legalTraining:!0},this._contractorTrainingsFetchOk=!0;return}if(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"){Utils.safeWarn("\u26A0\uFE0F GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629"),this._trainingBackendFetchOk=!0,this._trainingTabFetchOk={programs:!0,attendance:!0,legalTraining:!0},this._contractorTrainingsFetchOk=!0;return}const i=2e4,n=`\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645

\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0648\u0625\u0639\u062F\u0627\u062F\u0627\u062A Google Apps Script.`,s=r=>{typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{localStorage.setItem("training_last_sync",String(Date.now()))}catch{}this._markAllTabsDirty();const o=this._currentActiveTab||"programs";if(o==="programs")this.loadTrainingList();else if(o==="contractors"){this.refreshContractorTrainingList(),this._syncSelectOptions("contractor-month-filter",this.getMonthOptions());try{this.updateContractorStatsWithFilter(document.getElementById("contractor-month-filter")?.value||"")}catch{}}else o==="attendance"?this.loadAttendanceRegistry():o==="legalTraining"?this.loadLegalTrainingList():o==="analysis"&&this.refreshAnalysisTabContent();const l=r||o;l==="programs"&&(this._trainingBackendFetchOk=!0),this._trainingTabFetchOk&&Object.prototype.hasOwnProperty.call(this._trainingTabFetchOk,l)&&(this._trainingTabFetchOk[l]=!0)};try{const r=y=>Utils.promiseWithTimeout(y,i,n),o={filters:{},__timeoutMs:i},l=async(y,x)=>{const h=await r(GoogleIntegration.sendRequest({action:y,data:{...o}})).catch(k=>{const A=k?.message||k?.toString()||"";return A.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||A.includes("timeout")?Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629"):Utils.safeWarn(`\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 ${x}:`,k),{success:!1,data:[]}});return h&&h.success&&Array.isArray(h.data)?h.data:null},d=t||this._currentActiveTab||"programs",c=()=>Date.now()-(this._trainingLocalSaveTime||0)>6e4,p=()=>Date.now()-(this._trainingAttendanceLocalSaveTime||0)>6e4,g=()=>Date.now()-(this._legalTrainingsLocalSaveTime||0)>6e4,f=()=>Date.now()-(this._legalAttendeesLocalSaveTime||0)>6e4,m=()=>Date.now()-(this._legalRegisterLocalSaveTime||0)>6e4;if(d==="contractors"){await this.loadContractorTrainingsPriority(),s(d);return}if(d==="attendance"){const y=await l("getAllTrainingAttendance","\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631");y&&p()&&(AppState.appData.trainingAttendance=this._dedupeRegistryRecords(y)),s(d),this._trainingTabFetchOk.programs!==!0&&l("getAllTrainings","\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628").then(x=>{x&&c()&&(AppState.appData.training=x,this._trainingTabFetchOk.programs=!0,this._trainingBackendFetchOk=!0,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}).catch(()=>{});return}if(d==="legalTraining"){const y=await l("getAllLegalTrainings","\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629");y&&g()&&(AppState.appData.legalTrainings=y);const x=await l("getAllLegalTrainingAttendees","\u062D\u0636\u0648\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629");x&&f()&&(AppState.appData.legalTrainingAttendees=x);const h=await l("getAllLegalRegisters","\u0633\u062C\u0644 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A");h&&m()&&(AppState.appData.legalRegister=h),s(d);return}const u=await l("getAllTrainings","\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628");u&&c()&&(AppState.appData.training=u,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${u.length} \u0628\u0631\u0646\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A`)),s(d)}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",r),this._trainingBackendFetchOk=!0,this._trainingTabFetchOk={programs:!0,attendance:!0,legalTraining:!0},this._contractorTrainingsFetchOk=!0}},getStats(){this.ensureData();const t=AppState.appData.training||[],e=new Date;let a=0,i=0,n=0;return t.forEach(s=>{const r=this.getParticipantsCount(s);a+=r,s.status==="\u0645\u0643\u062A\u0645\u0644"&&(n+=1);const o=s.startDate?new Date(s.startDate):null;(s.status==="\u0645\u062E\u0637\u0637"||o&&o>=e)&&(i+=1)}),{totalTrainings:t.length,upcomingTrainings:i,completedTrainings:n,totalParticipants:a}},getStatsFromTrainingsArray(t){const e=Array.isArray(t)?t:[],a=new Date;let i=0,n=0,s=0;return e.forEach(r=>{i+=this.getParticipantsCount(r),r.status==="\u0645\u0643\u062A\u0645\u0644"&&(s+=1);const o=r.startDate?new Date(r.startDate):null;(r.status==="\u0645\u062E\u0637\u0637"||o&&o>=a)&&(n+=1)}),{totalTrainings:e.length,upcomingTrainings:n,completedTrainings:s,totalParticipants:i}},refreshProgramsTabKpiCards(){const t=this.getStats();[["training-programs-kpi-total",t.totalTrainings],["training-programs-kpi-upcoming",t.upcomingTrainings],["training-programs-kpi-completed",t.completedTrainings],["training-programs-kpi-participants",t.totalParticipants]].forEach(([a,i])=>{const n=document.getElementById(a);n&&(n.textContent=String(i))})},getContractorTrainingStats(t=""){this.ensureData();const e=this._dedupeRegistryRecords(AppState.appData.contractorTrainings||[]),a=this.getContractorOptions(),i=new Map(a.map(m=>[String(m?.id??"").trim(),m.name||""]));i.size===0&&(AppState.appData.contractors||[]).filter(u=>u&&u.isActive!=="inactive"&&u.isActive!==!1&&u.isActive!=="false"&&u.isActive!=="FALSE").forEach(u=>{u?.id&&i.set(String(u.id).trim(),u.name||u.company||u.contractorName||"")});let n=e;t&&(n=e.filter(m=>{if(!m.date)return!1;const u=new Date(m.date);return`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`===t}));const s=new Set,r=new Set,o=new Set;let l=0;const d={},c={},p=new Date,g=`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`;let f=0;return n.forEach(m=>{m.topic&&s.add(m.topic);const u=String(m.contractorId||"").trim(),y=String(m.contractorName||"").replace(/\s+/g," ").trim(),h=y&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(y)?y:i.get(u)||y||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";(u||m.contractorName)&&r.add(h);const k=m.trainer||m.conductedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";(m.trainer||m.conductedBy)&&o.add(k);const A=Number(m.traineesCount||m.attendees||0);l+=A;const b=parseFloat(m.totalHours||m.trainingHours||0);if(d[h]||(d[h]={count:0,trainees:0,hours:0}),d[h].count+=1,d[h].trainees+=A,d[h].hours+=b,c[k]||(c[k]={count:0,trainees:0,hours:0}),c[k].count+=1,c[k].trainees+=A,c[k].hours+=b,m.date){const E=new Date(m.date);`${E.getFullYear()}-${String(E.getMonth()+1).padStart(2,"0")}`===g&&(f+=1)}}),{uniqueTopics:s.size,uniqueContractors:r.size,totalTrainees:l,uniqueTrainers:o.size,currentMonthCount:f,contractorDetails:d,trainerDetails:c}},renderContractorDetailsTable(t){const e=Object.entries(t);return e.length===0?'<tr><td colspan="4" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>':e.sort((a,i)=>i[1].count-a[1].count).map(([a,i])=>`
                <tr>
                    <td>${Utils.escapeHTML(a)}</td>
                    <td class="text-center"><span class="badge badge-info">${i.count}</span></td>
                    <td class="text-center"><span class="badge badge-success">${i.trainees}</span></td>
                    <td class="text-center">${i.hours.toFixed(2)}</td>
                </tr>
            `).join("")},renderTrainerDetailsTable(t){const e=Object.entries(t);return e.length===0?'<tr><td colspan="4" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>':e.sort((a,i)=>i[1].hours-a[1].hours).map(([a,i])=>`
                <tr>
                    <td>${Utils.escapeHTML(a)}</td>
                    <td class="text-center"><span class="badge badge-info">${i.count}</span></td>
                    <td class="text-center"><span class="badge badge-success">${i.trainees}</span></td>
                    <td class="text-center">${i.hours.toFixed(2)}</td>
                </tr>
            `).join("")},getContractorAnalyticsState(){return this._contractorAnalyticsState=this._contractorAnalyticsState||{contractor:"",trainer:"",topic:"",location:"",search:"",view:"contractor",drillMode:"contractor",sortBy:"hours",sortDir:"desc",drillKey:""},this._contractorAnalyticsState},resetContractorAnalyticsState(){this._contractorAnalyticsState={contractor:"",trainer:"",topic:"",location:"",search:"",view:"contractor",drillMode:"contractor",sortBy:"hours",sortDir:"desc",drillKey:""}},getContractorTrainingAnalyticsModel(t=""){this.ensureData();const e=Array.isArray(AppState.appData.contractorTrainings)?AppState.appData.contractorTrainings:[],a=this.getContractorOptions(),i=new Map((a||[]).map(c=>[String(c?.id||"").trim(),String(c?.name||"").trim()])),n=c=>{if(!c)return"";const p=new Date(c);return Number.isNaN(p.getTime())?"":`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`},s=c=>String(c??"").replace(/\s+/g," ").trim(),r=c=>s(c).toLowerCase(),o=e.filter(c=>t?n(c?.date)===t:!0).map(c=>{const p=String(c?.contractorId??"").trim(),g=s(c?.contractorName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),m=g&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(g)?g:s(i.get(p)||g||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),u=s(c?.trainer||c?.conductedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),y=s(c?.topic||"\u2014"),x=s(c?.location||"\u2014"),h=s(c?.subLocation||"\u2014"),k=Number(c?.traineesCount||c?.attendees||0)||0,A=parseFloat(c?.totalHours||c?.trainingHours||0)||0,b=c?.date?new Date(c.date):null;return{raw:c,date:b,dateKey:c?.date?String(c.date):"",monthKey:n(c?.date),contractorId:p,contractorName:m,contractorNameKey:r(m),trainer:u,trainerKey:r(u),topic:y,topicKey:r(y),location:x,locationKey:r(x),subLocation:h,trainees:k,hours:A}}),l=c=>Array.from(new Set(c.filter(Boolean))).sort((p,g)=>p.localeCompare(g,"ar",{sensitivity:"base"})),d={contractors:l(o.map(c=>c.contractorName)),trainers:l(o.map(c=>c.trainer)),topics:l(o.map(c=>c.topic)),locations:l(o.map(c=>c.location))};return{monthFilter:t,records:o,dimensions:d}},computeContractorAnalytics(t,e){const a=b=>String(b??"").replace(/\s+/g," ").trim().toLowerCase(),i=a(e.contractor),n=a(e.trainer),s=a(e.topic),r=a(e.location),o=a(e.search),l=(t.records||[]).filter(b=>!(i&&b.contractorNameKey!==i||n&&b.trainerKey!==n||s&&b.topicKey!==s||r&&b.locationKey!==r||o&&!`${b.contractorNameKey} ${b.trainerKey} ${b.topicKey} ${b.locationKey}`.includes(o))),d={programs:l.length,trainees:l.reduce((b,E)=>b+(E.trainees||0),0),hours:l.reduce((b,E)=>b+(E.hours||0),0),contractors:new Set(l.map(b=>b.contractorNameKey)).size,trainers:new Set(l.map(b=>b.trainerKey)).size,topics:new Set(l.map(b=>b.topicKey)).size},c=(b,E)=>{const T=new Map;return l.forEach(L=>{const S=L[b]||"",F=L[E]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(!S)return;T.has(S)||T.set(S,{key:S,label:F,count:0,trainees:0,hours:0});const D=T.get(S);D.count+=1,D.trainees+=L.trainees||0,D.hours+=L.hours||0}),Array.from(T.values())},p=c("contractorNameKey","contractorName"),g=c("trainerKey","trainer"),f=e.sortDir==="asc"?1:-1,m=e.sortBy||"hours",u=b=>b.slice().sort((T,L)=>{const S=T[m]??0,F=L[m]??0;return F===S?(T.label||"").localeCompare(L.label||"","ar",{sensitivity:"base"})*f:(F-S)*f}),y=u(p).slice(0,20),x=u(g).slice(0,20),h=a(e.drillKey),A=(h?l.filter(b=>e.drillMode==="trainer"?b.trainerKey===h:b.contractorNameKey===h):l).slice().sort((b,E)=>{if(e.view!=="details"&&e.sortBy!=="date")return 0;const T=b.date?b.date.getTime():0;return((E.date?E.date.getTime():0)-T)*f});return{filtered:l,totals:d,topContractors:y,topTrainers:x,details:A}},renderContractorAnalyticsDashboard(t,e){const a=c=>Utils.escapeHTML(String(c??"")),i=(c,p=0)=>(Number(c)||0).toLocaleString("en-US",{minimumFractionDigits:p,maximumFractionDigits:p}),n=this.computeContractorAnalytics(t,e),s=e.drillKey?String(e.drillKey):"",r=(c,p)=>this._analyticsSelectOptions(c,p),o=(c,p)=>c.length?`
                <div class="contractor-analytics-pivot-wrap">
                    <table class="contractor-analytics-pivot-table w-full">
                        <thead>
                            <tr>
                                <th><i class="fas ${p==="trainer"?"fa-user-tie":"fa-building"} ml-2"></i>${p==="trainer"?"\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644"}</th>
                                <th><i class="fas fa-clipboard-list ml-1"></i>\u0627\u0644\u0628\u0631\u0627\u0645\u062C</th>
                                <th><i class="fas fa-users ml-1"></i>\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646</th>
                                <th><i class="fas fa-clock ml-1"></i>\u0627\u0644\u0633\u0627\u0639\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${c.map(g=>`
                                <tr data-analytics-drill="${a(g.label)}" data-analytics-mode="${p}">
                                    <td>
                                        <span class="label-cell">
                                            <span class="dot"></span>
                                            ${a(g.label)}
                                        </span>
                                    </td>
                                    <td><span class="badge badge-blue">${i(g.count)}</span></td>
                                    <td><span class="badge badge-green">${i(g.trainees)}</span></td>
                                    <td><span class="badge badge-amber">${i(g.hours,2)}</span></td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
                <p class="contractor-analytics-pivot-footnote">
                    <i class="fas fa-mouse-pointer ml-1"></i>\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0623\u064A \u0635\u0641 \u0644\u0644\u062A\u0639\u0645\u0642 \u0641\u064A \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644
                </p>
            `:'<div class="contractor-analytics-empty"><i class="fas fa-inbox"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</p></div>',l=()=>{const c=n.details.slice(0,300);return c.length?`
                <div class="contractor-analytics-details-wrap">
                    <table class="contractor-analytics-details-table w-full">
                        <thead>
                            <tr>
                                <th><i class="fas fa-calendar ml-1"></i>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th><i class="fas fa-book ml-1"></i>\u0627\u0644\u0645\u0648\u0636\u0648\u0639</th>
                                <th><i class="fas fa-user-tie ml-1"></i>\u0627\u0644\u0645\u062F\u0631\u0628</th>
                                <th><i class="fas fa-building ml-1"></i>\u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                                <th><i class="fas fa-users ml-1"></i>\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646</th>
                                <th><i class="fas fa-clock ml-1"></i>\u0627\u0644\u0633\u0627\u0639\u0627\u062A</th>
                                <th><i class="fas fa-map-marker-alt ml-1"></i>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${c.map(p=>`
                                <tr>
                                    <td><span class="date-badge">${p.raw?.date?a(Utils.formatDate(p.raw.date)):"-"}</span></td>
                                    <td title="${a(p.topic||"-")}" style="max-width:200px;overflow:hidden;text-overflow:ellipsis;">${a(p.topic||"-")}</td>
                                    <td><span class="trainer-name">${a(p.trainer||"-")}</span></td>
                                    <td><span class="contractor-name">${a(p.contractorName||"-")}</span></td>
                                    <td><span class="trainee-badge">${i(p.trainees)}</span></td>
                                    <td><span class="hour-badge">${i(p.hours,2)}</span></td>
                                    <td title="${a(p.location||"-")}" style="max-width:150px;overflow:hidden;text-overflow:ellipsis;">${a(p.location||"-")}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
                <div class="contractor-analytics-details-footer">
                    <span class="info"><i class="fas fa-info-circle ml-1"></i>\u064A\u062A\u0645 \u0639\u0631\u0636 \u0623\u0648\u0644 300 \u0633\u062C\u0644 \u0641\u0642\u0637 \u0644\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0623\u062F\u0627\u0621</span>
                    <span class="count"><i class="fas fa-table ml-1"></i>\u0625\u062C\u0645\u0627\u0644\u064A: ${c.length} \u0633\u062C\u0644</span>
                </div>
            `:'<div class="contractor-analytics-empty"><i class="fas fa-folder-open"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644 \u0644\u0644\u0639\u0631\u0636</p></div>'},d=c=>e.view===c?"active":"";return`
            <div class="contractor-analytics-section grid grid-cols-1 gap-4">
                <!-- Slicers -->
                <div class="contractor-analytics-slicers">
                    <div class="contractor-analytics-slicers-header">
                        <h4 class="contractor-analytics-slicers-title">
                            <i class="fas fa-sliders-h"></i>
                            \u062A\u0635\u0641\u064A\u0629 \u0633\u0631\u064A\u0639\u0629
                        </h4>
                    </div>
                    <div class="contractor-analytics-slicers-grid">
                        <div class="filter-group">
                            <label><i class="fas fa-building"></i><span>\u0627\u0644\u0645\u0642\u0627\u0648\u0644</span></label>
                            <select id="contractor-analytics-contractor">${r(t.dimensions.contractors,e.contractor)}</select>
                        </div>
                        <div class="filter-group">
                            <label><i class="fas fa-user-tie"></i><span>\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628</span></label>
                            <select id="contractor-analytics-trainer">${r(t.dimensions.trainers,e.trainer)}</select>
                        </div>
                        <div class="filter-group">
                            <label><i class="fas fa-book"></i><span>\u0627\u0644\u0645\u0648\u0636\u0648\u0639</span></label>
                            <select id="contractor-analytics-topic">${r(t.dimensions.topics,e.topic)}</select>
                        </div>
                        <div class="filter-group">
                            <label><i class="fas fa-map-marker-alt"></i><span>\u0627\u0644\u0645\u0648\u0642\u0639</span></label>
                            <select id="contractor-analytics-location">${r(t.dimensions.locations,e.location)}</select>
                        </div>
                        <div class="filter-group search-full">
                            <label><i class="fas fa-search"></i><span>\u0628\u062D\u062B \u0633\u0631\u064A\u0639</span></label>
                            <input id="contractor-analytics-search" placeholder="\u0627\u0628\u062D\u062B \u0639\u0646 \u0645\u0642\u0627\u0648\u0644\u060C \u0645\u0648\u0636\u0648\u0639\u060C \u0645\u062F\u0631\u0628..." value="${a(e.search)}">
                        </div>
                    </div>
                </div>

                <!-- KPI Cards -->
                <div class="contractor-analytics-kpi-grid">
                    <div class="contractor-analytics-kpi-card kpi-purple">
                        <div class="kpi-label"><i class="fas fa-clipboard-list"></i>\u0627\u0644\u0628\u0631\u0627\u0645\u062C</div>
                        <div class="kpi-value">${i(n.totals.programs)}</div>
                    </div>
                    <div class="contractor-analytics-kpi-card kpi-green">
                        <div class="kpi-label"><i class="fas fa-users"></i>\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646</div>
                        <div class="kpi-value">${i(n.totals.trainees)}</div>
                    </div>
                    <div class="contractor-analytics-kpi-card kpi-amber">
                        <div class="kpi-label"><i class="fas fa-clock"></i>\u0627\u0644\u0633\u0627\u0639\u0627\u062A</div>
                        <div class="kpi-value">${i(n.totals.hours,2)}</div>
                    </div>
                    <div class="contractor-analytics-kpi-card kpi-blue">
                        <div class="kpi-label"><i class="fas fa-building"></i>\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div>
                        <div class="kpi-value">${i(n.totals.contractors)}</div>
                    </div>
                    <div class="contractor-analytics-kpi-card kpi-pink">
                        <div class="kpi-label"><i class="fas fa-user-tie"></i>\u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646</div>
                        <div class="kpi-value">${i(n.totals.trainers)}</div>
                    </div>
                    <div class="contractor-analytics-kpi-card kpi-indigo">
                        <div class="kpi-label"><i class="fas fa-book"></i>\u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A</div>
                        <div class="kpi-value">${i(n.totals.topics)}</div>
                    </div>
                </div>

                <!-- Tabs + Sort -->
                <div class="contractor-analytics-tabs-bar">
                    <div class="tabs-row">
                        <div class="tabs-group">
                            <button type="button" id="contractor-analytics-tab-contractor" class="contractor-analytics-tab ${d("contractor")}">
                                <i class="fas fa-building"></i>\u0645\u0644\u062E\u0635 \u062D\u0633\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644
                            </button>
                            <button type="button" id="contractor-analytics-tab-trainer" class="contractor-analytics-tab ${d("trainer")}">
                                <i class="fas fa-user-tie"></i>\u0645\u0644\u062E\u0635 \u062D\u0633\u0628 \u0627\u0644\u0645\u062F\u0631\u0628
                            </button>
                            <button type="button" id="contractor-analytics-tab-details" class="contractor-analytics-tab ${d("details")}">
                                <i class="fas fa-list-alt"></i>\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644
                            </button>
                        </div>
                        <div class="contractor-analytics-sort-group">
                            <div class="contractor-analytics-sort-box">
                                <label><i class="fas fa-sort-amount-down"></i>\u0641\u0631\u0632:</label>
                                <select id="contractor-analytics-sortby">
                                    <option value="hours" ${e.sortBy==="hours"?"selected":""}>\u0627\u0644\u0633\u0627\u0639\u0627\u062A</option>
                                    <option value="trainees" ${e.sortBy==="trainees"?"selected":""}>\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646</option>
                                    <option value="count" ${e.sortBy==="count"?"selected":""}>\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C</option>
                                    <option value="date" ${e.sortBy==="date"?"selected":""}>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</option>
                                </select>
                                <select id="contractor-analytics-sortdir">
                                    <option value="desc" ${e.sortDir==="desc"?"selected":""}>\u062A\u0646\u0627\u0632\u0644\u064A</option>
                                    <option value="asc" ${e.sortDir==="asc"?"selected":""}>\u062A\u0635\u0627\u0639\u062F\u064A</option>
                                </select>
                            </div>
                            ${s?`<button type="button" id="contractor-analytics-clear-drill" class="contractor-analytics-clear-drill"><i class="fas fa-times-circle"></i>\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0639\u0645\u0642: ${a(s)}</button>`:""}
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="contractor-analytics-content">
                    ${e.view==="trainer"?o(n.topTrainers,"trainer"):e.view==="details"?l():o(n.topContractors,"contractor")}
                </div>
            </div>
        `},refreshContractorAnalytics(t=""){const e=document.getElementById("contractor-analytics-dashboard");if(!e)return;const a=this.getContractorAnalyticsState(),i=this.getContractorTrainingAnalyticsModel(t);e.innerHTML=this.renderContractorAnalyticsDashboard(i,a),this.bindContractorAnalyticsEvents(t)},bindContractorAnalyticsEvents(t=""){const e=this.getContractorAnalyticsState(),a=(d,c)=>{const p=document.getElementById(d);p&&p.addEventListener("change",c)};a("contractor-analytics-contractor",d=>{e.contractor=String(d.target.value||""),e.drillKey="",this.refreshContractorAnalytics(t)}),a("contractor-analytics-trainer",d=>{e.trainer=String(d.target.value||""),e.drillKey="",this.refreshContractorAnalytics(t)}),a("contractor-analytics-topic",d=>{e.topic=String(d.target.value||""),e.drillKey="",this.refreshContractorAnalytics(t)}),a("contractor-analytics-location",d=>{e.location=String(d.target.value||""),e.drillKey="",this.refreshContractorAnalytics(t)}),a("contractor-analytics-sortby",d=>{e.sortBy=String(d.target.value||"hours"),this.refreshContractorAnalytics(t)}),a("contractor-analytics-sortdir",d=>{e.sortDir=String(d.target.value||"desc"),this.refreshContractorAnalytics(t)});const i=document.getElementById("contractor-analytics-search");i&&(this._contractorAnalyticsSearchTimer&&clearTimeout(this._contractorAnalyticsSearchTimer),i.addEventListener("input",d=>{e.search=String(d.target.value||"");const c=d.target.selectionStart,p=d.target.selectionEnd;clearTimeout(this._contractorAnalyticsSearchTimer),this._contractorAnalyticsSearchTimer=setTimeout(()=>{this.refreshContractorAnalytics(t),requestAnimationFrame(()=>{const g=document.getElementById("contractor-analytics-search");if(g){g.focus();try{g.setSelectionRange(c,p)}catch{}}})},220)}));const n=document.getElementById("contractor-analytics-tab-contractor");n&&n.addEventListener("click",()=>{e.view="contractor",e.drillKey="",this.refreshContractorAnalytics(t)});const s=document.getElementById("contractor-analytics-tab-trainer");s&&s.addEventListener("click",()=>{e.view="trainer",e.drillKey="",this.refreshContractorAnalytics(t)});const r=document.getElementById("contractor-analytics-tab-details");r&&r.addEventListener("click",()=>{e.view="details",this.refreshContractorAnalytics(t)});const o=document.getElementById("contractor-analytics-clear-drill");o&&o.addEventListener("click",()=>{e.drillKey="",this.refreshContractorAnalytics(t)});const l=document.getElementById("contractor-analytics-dashboard");l&&l.querySelectorAll("[data-analytics-drill]")?.forEach(d=>{d.addEventListener("click",()=>{const c=String(d.getAttribute("data-analytics-drill")||"").trim(),p=String(d.getAttribute("data-analytics-mode")||"").trim();e.drillMode=p==="trainer"?"trainer":"contractor",e.drillKey=c,e.view="details",this.refreshContractorAnalytics(t)})})},getEmployeeAnalyticsState(){return this._employeeAnalyticsState=this._employeeAnalyticsState||{trainer:"",topic:"",location:"",trainingType:"",search:"",view:"trainer",sortBy:"hours",sortDir:"desc",drillKey:""},this._employeeAnalyticsState},getEmployeeTrainingAnalyticsModel(t=""){this.ensureData();const e=Array.isArray(AppState.appData.training)?AppState.appData.training:[],a=l=>{if(!l)return"";const d=new Date(l);return Number.isNaN(d.getTime())?"":`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`},i=l=>String(l??"").replace(/\s+/g," ").trim(),n=l=>i(l).toLowerCase(),s=e.filter(l=>{if(!t)return!0;const d=l?.startDate||l?.date||l?.createdAt;return a(d)===t}).map(l=>{const d=i(l?.name||l?.subject||"\u2014"),c=i(l?.trainer||l?.conductedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),p=i(l?.location||"\u2014"),g=i(l?.trainingType||"\u062F\u0627\u062E\u0644\u064A"),f=Array.isArray(l.participants)?l.participants:[],m=this.getParticipantsCount(l),u=parseFloat(l?.hours||l?.totalHours||0)||0,y=l?.startDate||l?.date?new Date(l.startDate||l.date):null;return{raw:l,date:y,dateKey:l?.startDate||l?.date?String(l.startDate||l.date):"",monthKey:a(l?.startDate||l?.date),topic:d,topicKey:n(d),trainer:c,trainerKey:n(c),location:p,locationKey:n(p),trainingType:g,trainingTypeKey:n(g),trainees:m,hours:u}}),r=l=>Array.from(new Set(l.filter(Boolean))).sort((d,c)=>d.localeCompare(c,"ar",{sensitivity:"base"})),o={trainers:r(s.map(l=>l.trainer)),topics:r(s.map(l=>l.topic)),locations:r(s.map(l=>l.location)),trainingTypes:r(s.map(l=>l.trainingType))};return{monthFilter:t,records:s,dimensions:o}},computeEmployeeAnalytics(t,e){const a=b=>String(b??"").replace(/\s+/g," ").trim().toLowerCase(),i=a(e.trainer),n=a(e.topic),s=a(e.location),r=a(e.trainingType),o=a(e.search),l=(t.records||[]).filter(b=>!(i&&b.trainerKey!==i||n&&b.topicKey!==n||s&&b.locationKey!==s||r&&b.trainingTypeKey!==r||o&&!`${b.trainerKey} ${b.topicKey} ${b.locationKey} ${b.trainingTypeKey}`.includes(o))),d={programs:l.length,trainees:l.reduce((b,E)=>b+(E.trainees||0),0),hours:l.reduce((b,E)=>b+(E.hours||0),0),trainers:new Set(l.map(b=>b.trainerKey)).size,topics:new Set(l.map(b=>b.topicKey)).size},c=(b,E)=>{const T=new Map;return l.forEach(L=>{const S=L[b]||"",F=L[E]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(!S)return;T.has(S)||T.set(S,{key:S,label:F,count:0,trainees:0,hours:0});const D=T.get(S);D.count+=1,D.trainees+=L.trainees||0,D.hours+=L.hours||0}),Array.from(T.values())},p=c("trainerKey","trainer"),g=c("topicKey","topic"),f=e.sortDir==="asc"?1:-1,m=e.sortBy||"hours",u=b=>b.slice().sort((T,L)=>{const S=T[m]??0,F=L[m]??0;return F===S?(T.label||"").localeCompare(L.label||"","ar",{sensitivity:"base"})*f:(F-S)*f}),y=u(p).slice(0,20),x=u(g).slice(0,20),h=a(e.drillKey),A=(h?l.filter(b=>e.view==="topic"?b.topicKey===h:b.trainerKey===h):l).slice().sort((b,E)=>{if(e.view!=="details"&&e.sortBy!=="date")return 0;const T=b.date?b.date.getTime():0;return((E.date?E.date.getTime():0)-T)*f});return{filtered:l,totals:d,topTrainers:y,topTopics:x,details:A}},renderEmployeeAnalyticsDashboard(t,e){const a=d=>Utils.escapeHTML(String(d??"")),i=(d,c=0)=>(Number(d)||0).toLocaleString("en-US",{minimumFractionDigits:c,maximumFractionDigits:c}),n=this.computeEmployeeAnalytics(t,e),s=e.drillKey?String(e.drillKey):"",r=(d,c)=>{const p=String(c??"").replace(/\s+/g," ").trim();return['<option value="">\u0627\u0644\u0643\u0644</option>'].concat(d.map(g=>`<option value="${a(g)}" ${p===String(g)?"selected":""}>${a(g)}</option>`)).join("")},o=(d,c)=>d.length?`
                <div class="employee-pivot-table-container" style="overflow: auto; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #99f6e4; max-height: 400px; scrollbar-width: thin; scrollbar-color: #0d9488 #ccfbf1;">
                    <style>
                        .employee-pivot-table-container::-webkit-scrollbar { width: 6px; height: 6px; }
                        .employee-pivot-table-container::-webkit-scrollbar-track { background: #ccfbf1; border-radius: 10px; }
                        .employee-pivot-table-container::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #0d9488, #059669); border-radius: 10px; }
                    </style>
                    <table class="table-auto w-full" style="min-width: 640px; border-collapse: separate; border-spacing: 0;">
                        <thead>
                            <tr style="background: linear-gradient(135deg, #0d9488 0%, #059669 100%);">
                                <th style="padding: 14px 16px; font-size: 12px; text-align: right; color: white; font-weight: 700; position: sticky; top: 0; z-index: 10; background: linear-gradient(135deg, #0d9488 0%, #059669 100%);">
                                    <i class="fas ${c==="topic"?"fa-book":"fa-user-tie"} ml-2"></i>${c==="topic"?"\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C / \u0627\u0644\u0645\u0648\u0636\u0648\u0639":"\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628"}
                                </th>
                                <th style="padding: 14px 12px; font-size: 12px; text-align: center; color: white; font-weight: 700; position: sticky; top: 0; z-index: 10; background: linear-gradient(135deg, #0d9488 0%, #059669 100%);">
                                    <i class="fas fa-clipboard-list ml-1"></i>\u0627\u0644\u0628\u0631\u0627\u0645\u062C
                                </th>
                                <th style="padding: 14px 12px; font-size: 12px; text-align: center; color: white; font-weight: 700; position: sticky; top: 0; z-index: 10; background: linear-gradient(135deg, #0d9488 0%, #059669 100%);">
                                    <i class="fas fa-users ml-1"></i>\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646
                                </th>
                                <th style="padding: 14px 12px; font-size: 12px; text-align: center; color: white; font-weight: 700; position: sticky; top: 0; z-index: 10; background: linear-gradient(135deg, #0d9488 0%, #059669 100%);">
                                    <i class="fas fa-clock ml-1"></i>\u0627\u0644\u0633\u0627\u0639\u0627\u062A
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            ${d.map((p,g)=>`
                                <tr class="hover:bg-teal-50 cursor-pointer transition-all duration-200" data-analytics-drill="${a(p.label)}" data-analytics-mode="${c}" style="background: ${g%2===0?"#ffffff":"#f0fdfa"};" onmouseover="this.style.background='#ccfbf1'; this.style.transform='scale(1.005)'" onmouseout="this.style.background='${g%2===0?"#ffffff":"#f0fdfa"}'; this.style.transform='scale(1)'">
                                    <td style="padding: 12px 16px; font-size: 12px; text-align: right; border-bottom: 1px solid #f0f0f0;">
                                        <span style="color: #0f766e; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                                            <span style="width: 8px; height: 8px; background: linear-gradient(135deg, #0d9488, #059669); border-radius: 50%; flex-shrink: 0;"></span>
                                            ${a(p.label)}
                                        </span>
                                    </td>
                                    <td style="padding: 12px; font-size: 12px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                                        <span style="background: #ccfbf1; color: #0f766e; padding: 4px 10px; border-radius: 20px; font-weight: 600;">${i(p.count)}</span>
                                    </td>
                                    <td style="padding: 12px; font-size: 12px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                                        <span style="background: #d1fae5; color: #065f46; padding: 4px 10px; border-radius: 20px; font-weight: 600;">${i(p.trainees)}</span>
                                    </td>
                                    <td style="padding: 12px; font-size: 12px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                                        <span style="background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 20px; font-weight: 600;">${i(p.hours,2)}</span>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
                <p style="font-size: 0.75rem; color: #0f766e; margin-top: 8px; text-align: center;">
                    <i class="fas fa-mouse-pointer ml-1"></i>\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0623\u064A \u0635\u0641 \u0644\u0644\u062A\u0639\u0645\u0642 \u0641\u064A \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644
                </p>
            `:`<div style="padding: 40px 20px; text-align: center; background: linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 100%); border-radius: 12px; border: 2px dashed #99f6e4;">
                    <i class="fas fa-inbox" style="font-size: 2.5rem; color: #5eead4; margin-bottom: 12px; display: block;"></i>
                    <p style="color: #0f766e; font-size: 0.9rem; margin: 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</p>
                </div>`,l=()=>{const d=n.details.slice(0,300);return d.length?`
                <div class="employee-details-table-container" style="overflow: auto; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #99f6e4; max-height: 450px; scrollbar-width: thin; scrollbar-color: #0d9488 #ccfbf1;">
                    <style>
                        .employee-details-table-container::-webkit-scrollbar { width: 6px; height: 6px; }
                        .employee-details-table-container::-webkit-scrollbar-track { background: #ccfbf1; border-radius: 10px; }
                        .employee-details-table-container::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #0d9488, #059669); border-radius: 10px; }
                    </style>
                    <table class="table-auto w-full" style="min-width: 980px; border-collapse: separate; border-spacing: 0;">
                        <thead>
                            <tr style="background: linear-gradient(135deg, #0d9488 0%, #059669 100%);">
                                <th style="padding: 14px 12px; font-size: 11px; text-align: center; color: white; font-weight: 700; position: sticky; top: 0; z-index: 10; white-space: nowrap;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="padding: 14px 12px; font-size: 11px; text-align: right; color: white; font-weight: 700; position: sticky; top: 0; z-index: 10; white-space: nowrap;">\u0627\u0644\u0645\u0648\u0636\u0648\u0639</th>
                                <th style="padding: 14px 12px; font-size: 11px; text-align: right; color: white; font-weight: 700; position: sticky; top: 0; z-index: 10; white-space: nowrap;">\u0627\u0644\u0645\u062F\u0631\u0628</th>
                                <th style="padding: 14px 12px; font-size: 11px; text-align: center; color: white; font-weight: 700; position: sticky; top: 0; z-index: 10; white-space: nowrap;">\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                                <th style="padding: 14px 12px; font-size: 11px; text-align: center; color: white; font-weight: 700; position: sticky; top: 0; z-index: 10; white-space: nowrap;">\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</th>
                                <th style="padding: 14px 12px; font-size: 11px; text-align: center; color: white; font-weight: 700; position: sticky; top: 0; z-index: 10; white-space: nowrap;">\u0627\u0644\u0633\u0627\u0639\u0627\u062A</th>
                                <th style="padding: 14px 12px; font-size: 11px; text-align: right; color: white; font-weight: 700; position: sticky; top: 0; z-index: 10; white-space: nowrap;">\u0627\u0644\u0645\u0648\u0642\u0639</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${d.map((c,p)=>`
                                <tr class="hover:bg-teal-50 transition-all duration-200" style="background: ${p%2===0?"#ffffff":"#f0fdfa"};" onmouseover="this.style.background='#ccfbf1'" onmouseout="this.style.background='${p%2===0?"#ffffff":"#f0fdfa"}'">
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: center; border-bottom: 1px solid #f0f0f0; white-space: nowrap;">${c.raw?.startDate||c.raw?.date?a(Utils.formatDate(c.raw.startDate||c.raw.date)):"-"}</td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: right; border-bottom: 1px solid #f0f0f0; max-width: 200px;" title="${a(c.topic||"-")}">${a(c.topic||"-")}</td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: right; border-bottom: 1px solid #f0f0f0;"><span style="color: #0f766e; font-weight: 500;">${a(c.trainer||"-")}</span></td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: center; border-bottom: 1px solid #f0f0f0;"><span style="background: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 12px; font-size: 10px;">${a(c.trainingType||"-")}</span></td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: center; border-bottom: 1px solid #f0f0f0;"><span style="background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 12px; font-weight: 600; font-size: 10px;">${i(c.trainees)}</span></td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: center; border-bottom: 1px solid #f0f0f0;"><span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 12px; font-weight: 600; font-size: 10px;">${i(c.hours,2)}</span></td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: right; border-bottom: 1px solid #f0f0f0; max-width: 150px;" title="${a(c.location||"-")}">${a(c.location||"-")}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding: 8px 12px; background: #f0fdfa; border-radius: 8px; border: 1px solid #99f6e4;">
                    <span style="font-size: 0.75rem; color: #0f766e;"><i class="fas fa-info-circle ml-1"></i>\u064A\u062A\u0645 \u0639\u0631\u0636 \u0623\u0648\u0644 300 \u0633\u062C\u0644 \u0641\u0642\u0637 \u0644\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0623\u062F\u0627\u0621</span>
                    <span style="font-size: 0.75rem; color: #0d9488; font-weight: 600;"><i class="fas fa-table ml-1"></i>\u0625\u062C\u0645\u0627\u0644\u064A: ${d.length} \u0633\u062C\u0644</span>
                </div>
            `:`<div style="padding: 40px 20px; text-align: center; background: linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 100%); border-radius: 12px; border: 2px dashed #99f6e4;">
                <i class="fas fa-folder-open" style="font-size: 2.5rem; color: #5eead4; margin-bottom: 12px; display: block;"></i>
                <p style="color: #0f766e; font-size: 0.9rem; margin: 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644 \u0644\u0644\u0639\u0631\u0636</p>
            </div>`};return`
            <div class="grid grid-cols-1 gap-4" style="font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">
                <div style="background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%); border-radius: 16px; padding: 22px 24px; border: 1px solid #99f6e4; box-shadow: 0 4px 12px rgba(13,148,136,0.12);">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid rgba(153,246,228,0.6);">
                        <h4 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: #0f766e; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-filter" style="color: #0d9488;"></i>\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644
                        </h4>
                        <button type="button" id="employee-analytics-reset-btn" style="background: white; border: 1.5px solid #99f6e4; padding: 8px 16px; border-radius: 10px; font-size: 0.8rem; font-weight: 600; color: #0f766e; cursor: pointer; transition: all 0.25s ease; display: flex; align-items: center; gap: 7px;" onmouseover="this.style.background='#f0fdfa'" onmouseout="this.style.background='white'">
                            <i class="fas fa-redo-alt"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                        </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style="margin-bottom: 16px;">
                        <div><label style="font-size: 0.75rem; font-weight: 600; color: #134e4a; display: flex; align-items: center; gap: 6px;"><i class="fas fa-user-tie" style="color: #0d9488;"></i>\u0627\u0644\u0645\u062F\u0631\u0628</label>
                            <select id="employee-analytics-trainer" class="form-input" style="border: 2px solid #99f6e4; border-radius: 10px; padding: 10px 12px; font-size: 0.85rem; background: white; min-height: 42px;">${r(t.dimensions.trainers,e.trainer)}</select></div>
                        <div><label style="font-size: 0.75rem; font-weight: 600; color: #134e4a; display: flex; align-items: center; gap: 6px;"><i class="fas fa-book" style="color: #0d9488;"></i>\u0627\u0644\u0645\u0648\u0636\u0648\u0639</label>
                            <select id="employee-analytics-topic" class="form-input" style="border: 2px solid #99f6e4; border-radius: 10px; padding: 10px 12px; font-size: 0.85rem; background: white; min-height: 42px;">${r(t.dimensions.topics,e.topic)}</select></div>
                        <div><label style="font-size: 0.75rem; font-weight: 600; color: #134e4a; display: flex; align-items: center; gap: 6px;"><i class="fas fa-map-marker-alt" style="color: #0d9488;"></i>\u0627\u0644\u0645\u0648\u0642\u0639</label>
                            <select id="employee-analytics-location" class="form-input" style="border: 2px solid #99f6e4; border-radius: 10px; padding: 10px 12px; font-size: 0.85rem; background: white; min-height: 42px;">${r(t.dimensions.locations,e.location)}</select></div>
                        <div><label style="font-size: 0.75rem; font-weight: 600; color: #134e4a; display: flex; align-items: center; gap: 6px;"><i class="fas fa-tag" style="color: #0d9488;"></i>\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</label>
                            <select id="employee-analytics-trainingType" class="form-input" style="border: 2px solid #99f6e4; border-radius: 10px; padding: 10px 12px; font-size: 0.85rem; background: white; min-height: 42px;">${r(t.dimensions.trainingTypes,e.trainingType)}</select></div>
                    </div>
                    <div><label style="font-size: 0.75rem; font-weight: 600; color: #134e4a; display: flex; align-items: center; gap: 6px;"><i class="fas fa-search" style="color: #0d9488;"></i>\u0628\u062D\u062B \u0633\u0631\u064A\u0639</label>
                        <input id="employee-analytics-search" class="form-input" placeholder="\u0627\u0628\u062D\u062B..." value="${a(e.search)}" style="border: 2px solid #99f6e4; border-radius: 10px; padding: 10px 12px; font-size: 0.85rem; background: white; min-height: 42px;"></div>
                </div>

                <div class="employee-analytics-kpi-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
                    <div style="padding: 14px 12px; border-radius: 10px; background: linear-gradient(135deg, #0d9488 0%, #059669 100%); box-shadow: 0 3px 10px rgba(13,148,136,0.25); min-height: 70px; display: flex; flex-direction: column; justify-content: center;">
                        <div style="font-size: 11px; color: rgba(255,255,255,0.9); font-weight: 600; margin-bottom: 4px;"><i class="fas fa-clipboard-list" style="font-size: 10px;"></i> \u0627\u0644\u0628\u0631\u0627\u0645\u062C</div>
                        <div style="font-size: 22px; font-weight: 800; color: white;">${i(n.totals.programs)}</div>
                    </div>
                    <div style="padding: 14px 12px; border-radius: 10px; background: linear-gradient(135deg, #059669 0%, #047857 100%); box-shadow: 0 3px 10px rgba(5,150,105,0.25); min-height: 70px; display: flex; flex-direction: column; justify-content: center;">
                        <div style="font-size: 11px; color: rgba(255,255,255,0.9); font-weight: 600; margin-bottom: 4px;"><i class="fas fa-users" style="font-size: 10px;"></i> \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</div>
                        <div style="font-size: 22px; font-weight: 800; color: white;">${i(n.totals.trainees)}</div>
                    </div>
                    <div style="padding: 14px 12px; border-radius: 10px; background: linear-gradient(135deg, #0f766e 0%, #0d5c4a 100%); box-shadow: 0 3px 10px rgba(15,118,110,0.25); min-height: 70px; display: flex; flex-direction: column; justify-content: center;">
                        <div style="font-size: 11px; color: rgba(255,255,255,0.9); font-weight: 600; margin-bottom: 4px;"><i class="fas fa-clock" style="font-size: 10px;"></i> \u0627\u0644\u0633\u0627\u0639\u0627\u062A</div>
                        <div style="font-size: 22px; font-weight: 800; color: white;">${i(n.totals.hours,2)}</div>
                    </div>
                    <div style="padding: 14px 12px; border-radius: 10px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); box-shadow: 0 3px 10px rgba(20,184,166,0.25); min-height: 70px; display: flex; flex-direction: column; justify-content: center;">
                        <div style="font-size: 11px; color: rgba(255,255,255,0.9); font-weight: 600; margin-bottom: 4px;"><i class="fas fa-user-tie" style="font-size: 10px;"></i> \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646</div>
                        <div style="font-size: 22px; font-weight: 800; color: white;">${i(n.totals.trainers)}</div>
                    </div>
                </div>
                <style>@media (max-width: 1024px){ .employee-analytics-kpi-grid { grid-template-columns: repeat(2, 1fr) !important; } }</style>

                <div style="background: white; border-radius: 14px; padding: 16px 20px; border: 1px solid #99f6e4; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
                    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px; justify-content: space-between;">
                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <button type="button" id="employee-analytics-tab-trainer" style="padding: 10px 18px; border-radius: 10px; font-size: 0.8rem; font-weight: 600; border: 2px solid ${e.view==="trainer"?"#0d9488":"#e5e7eb"}; background: ${e.view==="trainer"?"linear-gradient(135deg, #0d9488 0%, #059669 100%)":"white"}; color: ${e.view==="trainer"?"white":"#6b7280"}; cursor: pointer;">
                                <i class="fas fa-user-tie"></i>\u0645\u0644\u062E\u0635 \u062D\u0633\u0628 \u0627\u0644\u0645\u062F\u0631\u0628
                            </button>
                            <button type="button" id="employee-analytics-tab-topic" style="padding: 10px 18px; border-radius: 10px; font-size: 0.8rem; font-weight: 600; border: 2px solid ${e.view==="topic"?"#0d9488":"#e5e7eb"}; background: ${e.view==="topic"?"linear-gradient(135deg, #0d9488 0%, #059669 100%)":"white"}; color: ${e.view==="topic"?"white":"#6b7280"}; cursor: pointer;">
                                <i class="fas fa-book"></i>\u0645\u0644\u062E\u0635 \u062D\u0633\u0628 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C/\u0627\u0644\u0645\u0648\u0636\u0648\u0639
                            </button>
                            <button type="button" id="employee-analytics-tab-details" style="padding: 10px 18px; border-radius: 10px; font-size: 0.8rem; font-weight: 600; border: 2px solid ${e.view==="details"?"#0d9488":"#e5e7eb"}; background: ${e.view==="details"?"linear-gradient(135deg, #0d9488 0%, #059669 100%)":"white"}; color: ${e.view==="details"?"white":"#6b7280"}; cursor: pointer;">
                                <i class="fas fa-list-alt"></i>\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644
                            </button>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                            <div style="display: flex; align-items: center; gap: 6px; background: #f0fdfa; padding: 6px 12px; border-radius: 8px; border: 1px solid #99f6e4;">
                                <label style="font-size: 0.7rem; font-weight: 600; color: #0f766e;">\u0641\u0631\u0632:</label>
                                <select id="employee-analytics-sortby" class="form-input" style="border: 1px solid #99f6e4; border-radius: 6px; padding: 6px 10px; font-size: 0.75rem; min-width: 100px; background: white;">
                                    <option value="hours" ${e.sortBy==="hours"?"selected":""}>\u0627\u0644\u0633\u0627\u0639\u0627\u062A</option>
                                    <option value="trainees" ${e.sortBy==="trainees"?"selected":""}>\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</option>
                                    <option value="count" ${e.sortBy==="count"?"selected":""}>\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C</option>
                                    <option value="date" ${e.sortBy==="date"?"selected":""}>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</option>
                                </select>
                                <select id="employee-analytics-sortdir" class="form-input" style="border: 1px solid #99f6e4; border-radius: 6px; padding: 6px 10px; font-size: 0.75rem; min-width: 90px; background: white;">
                                    <option value="desc" ${e.sortDir==="desc"?"selected":""}>\u062A\u0646\u0627\u0632\u0644\u064A</option>
                                    <option value="asc" ${e.sortDir==="asc"?"selected":""}>\u062A\u0635\u0627\u0639\u062F\u064A</option>
                                </select>
                            </div>
                            ${s?`<button type="button" id="employee-analytics-clear-drill" style="padding: 8px 14px; border-radius: 8px; font-size: 0.75rem; font-weight: 600; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color: #92400e; border: 1px solid #fcd34d; cursor: pointer;"><i class="fas fa-times-circle"></i> \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0639\u0645\u0642: ${a(s)}</button>`:""}
                        </div>
                    </div>
                </div>

                <div style="background: white; border-radius: 14px; padding: 20px; border: 1px solid #e5e7eb; box-shadow: 0 2px 6px rgba(0,0,0,0.04); min-height: 300px;">
                    ${e.view==="topic"?o(n.topTopics,"topic"):e.view==="details"?l():o(n.topTrainers,"trainer")}
                </div>
            </div>
        `},refreshEmployeeAnalytics(t=""){const e=document.getElementById("employee-analytics-dashboard");if(!e)return;const a=this.getEmployeeAnalyticsState(),i=this.getEmployeeTrainingAnalyticsModel(t);e.innerHTML=this.renderEmployeeAnalyticsDashboard(i,a),this.bindEmployeeAnalyticsEvents(t)},bindEmployeeAnalyticsEvents(t=""){const e=this.getEmployeeAnalyticsState(),a=()=>(document.getElementById("employee-month-filter")||{}).value||"",i=()=>this.refreshEmployeeAnalytics(a()),n=(g,f)=>{const m=document.getElementById(g);m&&m.addEventListener("change",f)};n("employee-analytics-trainer",g=>{e.trainer=String(g.target.value||""),e.drillKey="",i()}),n("employee-analytics-topic",g=>{e.topic=String(g.target.value||""),e.drillKey="",i()}),n("employee-analytics-location",g=>{e.location=String(g.target.value||""),e.drillKey="",i()}),n("employee-analytics-trainingType",g=>{e.trainingType=String(g.target.value||""),e.drillKey="",i()}),n("employee-analytics-sortby",g=>{e.sortBy=String(g.target.value||"hours"),i()}),n("employee-analytics-sortdir",g=>{e.sortDir=String(g.target.value||"desc"),i()});const s=document.getElementById("employee-analytics-search");s&&s.addEventListener("input",g=>{e.search=String(g.target.value||""),i()});const r=document.getElementById("employee-analytics-tab-trainer");r&&r.addEventListener("click",()=>{e.view="trainer",e.drillKey="",i()});const o=document.getElementById("employee-analytics-tab-topic");o&&o.addEventListener("click",()=>{e.view="topic",e.drillKey="",i()});const l=document.getElementById("employee-analytics-tab-details");l&&l.addEventListener("click",()=>{e.view="details",i()});const d=document.getElementById("employee-analytics-clear-drill");d&&d.addEventListener("click",()=>{e.drillKey="",i()});const c=document.getElementById("employee-analytics-reset-btn");c&&c.addEventListener("click",()=>{this._employeeAnalyticsState={trainer:"",topic:"",location:"",trainingType:"",search:"",view:"trainer",sortBy:"hours",sortDir:"desc",drillKey:""},i()});const p=document.getElementById("employee-analytics-dashboard");p&&p.querySelectorAll("[data-analytics-drill]")?.forEach(g=>{g.addEventListener("click",()=>{const f=String(g.getAttribute("data-analytics-drill")||"").trim(),m=String(g.getAttribute("data-analytics-mode")||"").trim();e.view=m==="topic"?"topic":"trainer",e.drillKey=f,e.view="details",i()})})},getAttendanceAnalyticsState(){return this._attendanceAnalyticsState=this._attendanceAnalyticsState||{employee:"",topic:"",department:"",factory:"",trainingType:"",trainer:"",search:"",view:"employee",drillMode:"employee",sortBy:"hours",sortDir:"desc",drillKey:""},this._attendanceAnalyticsState},getAttendanceAnalyticsModel(t=""){this.ensureData();const e=AppState.appData.trainingAttendance||[],a=o=>{if(!o)return"";const l=new Date(o);return Number.isNaN(l.getTime())?"":`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}`},i=o=>String(o??"").replace(/\s+/g," ").trim(),n=o=>i(o).toLowerCase(),s=e.filter(o=>{if(!t)return!0;const l=o?.date||o?.attendanceDate||o?.createdAt;return a(l)===t}).map(o=>{const l=i(o?.employeeName||o?.employee||"\u2014"),d=i(o?.topic||"\u2014"),c=i(o?.department||"\u2014"),p=i(o?.factoryName||o?.factory||"\u2014"),g=i(o?.trainingType||"\u062F\u0627\u062E\u0644\u064A"),f=i(o?.trainerName||o?.trainer||o?.conductedBy||"\u2014"),m=parseFloat(o?.totalHours||0)||0,u=o?.date||o?.attendanceDate?new Date(o.date||o.attendanceDate):null;return{raw:o,date:u,employee:l,employeeKey:n(l),topic:d,topicKey:n(d),department:c,departmentKey:n(c),factory:p,factoryKey:n(p),trainingType:g,trainingTypeKey:n(g),trainer:f,trainerKey:n(f),hours:m}}),r=o=>Array.from(new Set(o.filter(Boolean))).sort((l,d)=>l.localeCompare(d,"ar",{sensitivity:"base"}));return{monthFilter:t,records:s,dimensions:{employees:r(s.map(o=>o.employee)),topics:r(s.map(o=>o.topic)),departments:r(s.map(o=>o.department)),factories:r(s.map(o=>o.factory)),trainingTypes:r(s.map(o=>o.trainingType)),trainers:r(s.map(o=>o.trainer))}}},computeAttendanceAnalytics(t,e){const a=m=>String(m??"").replace(/\s+/g," ").trim().toLowerCase(),i=(t.records||[]).filter(m=>{if(e.employee&&m.employeeKey!==a(e.employee)||e.topic&&m.topicKey!==a(e.topic)||e.department&&m.departmentKey!==a(e.department)||e.factory&&m.factoryKey!==a(e.factory)||e.trainingType&&m.trainingTypeKey!==a(e.trainingType)||e.trainer&&m.trainerKey!==a(e.trainer))return!1;const u=a(e.search);return!(u&&!`${m.employeeKey} ${m.topicKey} ${m.departmentKey} ${m.factoryKey} ${m.trainerKey}`.includes(u))}),n={records:i.length,hours:i.reduce((m,u)=>m+(u.hours||0),0),employees:new Set(i.map(m=>m.employeeKey)).size,topics:new Set(i.map(m=>m.topicKey)).size},s=(m,u)=>{const y=new Map;return i.forEach(x=>{const h=x[m]||"",k=x[u]||"\u2014";if(!h)return;y.has(h)||y.set(h,{key:h,label:k,count:0,hours:0});const A=y.get(h);A.count+=1,A.hours+=x.hours||0}),Array.from(y.values())},r=e.sortDir==="asc"?1:-1,o=e.sortBy||"hours",l=m=>m.slice().sort((u,y)=>{const x=u[o]??0,h=y[o]??0;return h===x?(u.label||"").localeCompare(y.label||"","ar",{sensitivity:"base"})*r:(h-x)*r}),d=l(s("employeeKey","employee")).slice(0,20),c=l(s("topicKey","topic")).slice(0,20),p=a(e.drillKey),f=(p?i.filter(m=>e.drillMode==="topic"?m.topicKey===p:m.employeeKey===p):i).slice().sort((m,u)=>{const y=m.date?m.date.getTime():0;return((u.date?u.date.getTime():0)-y)*r});return{filtered:i,totals:n,topEmployees:d,topTopics:c,details:f}},renderAttendanceAnalyticsDashboard(t,e){const a=c=>Utils.escapeHTML(String(c??"")),i=(c,p=0)=>(Number(c)||0).toLocaleString("en-US",{minimumFractionDigits:p,maximumFractionDigits:p}),n=this.computeAttendanceAnalytics(t,e),s=e.drillKey?String(e.drillKey):"",r=(c,p)=>this._analyticsSelectOptions(c,p),o=c=>e.view===c?"active":"",l=(c,p)=>c.length?`
                <div class="contractor-analytics-pivot-wrap">
                    <table class="contractor-analytics-pivot-table w-full">
                        <thead>
                            <tr>
                                <th><i class="fas ${p==="topic"?"fa-book":"fa-user"} ml-2"></i>${p==="topic"?"\u0627\u0644\u0645\u0648\u0636\u0648\u0639":"\u0627\u0644\u0645\u0648\u0638\u0641"}</th>
                                <th><i class="fas fa-clipboard-list ml-1"></i>\u0627\u0644\u0633\u062C\u0644\u0627\u062A</th>
                                <th><i class="fas fa-clock ml-1"></i>\u0627\u0644\u0633\u0627\u0639\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${c.map(g=>`
                                <tr data-analytics-drill="${a(g.label)}" data-analytics-mode="${p}">
                                    <td>
                                        <span class="label-cell">
                                            <span class="dot"></span>
                                            ${a(g.label)}
                                        </span>
                                    </td>
                                    <td><span class="badge badge-blue">${i(g.count)}</span></td>
                                    <td><span class="badge badge-amber">${i(g.hours,2)}</span></td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
                <p class="contractor-analytics-pivot-footnote">
                    <i class="fas fa-mouse-pointer ml-1"></i>\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0623\u064A \u0635\u0641 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644
                </p>
            `:'<div class="contractor-analytics-empty"><i class="fas fa-inbox"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</p></div>',d=()=>{const c=n.details.slice(0,300);return c.length?`
                <div class="contractor-analytics-details-wrap">
                    <table class="contractor-analytics-details-table w-full">
                        <thead>
                            <tr>
                                <th><i class="fas fa-calendar ml-1"></i>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th><i class="fas fa-book ml-1"></i>\u0627\u0644\u0645\u0648\u0636\u0648\u0639</th>
                                <th><i class="fas fa-user ml-1"></i>\u0627\u0644\u0645\u0648\u0638\u0641</th>
                                <th><i class="fas fa-tag ml-1"></i>\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                                <th><i class="fas fa-sitemap ml-1"></i>\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                                <th><i class="fas fa-clock ml-1"></i>\u0627\u0644\u0633\u0627\u0639\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${c.map(p=>`
                                <tr>
                                    <td><span class="date-badge">${p.raw?.date||p.raw?.attendanceDate?a(Utils.formatDate(p.raw.date||p.raw.attendanceDate)):"-"}</span></td>
                                    <td title="${a(p.topic)}" style="max-width:200px;overflow:hidden;text-overflow:ellipsis;">${a(p.topic)}</td>
                                    <td><span class="trainer-name">${a(p.employee)}</span></td>
                                    <td>${a(p.trainingType)}</td>
                                    <td>${a(p.department)}</td>
                                    <td><span class="hour-badge">${i(p.hours,2)}</span></td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
                <div class="contractor-analytics-details-footer">
                    <span class="info"><i class="fas fa-info-circle ml-1"></i>\u064A\u062A\u0645 \u0639\u0631\u0636 \u0623\u0648\u0644 300 \u0633\u062C\u0644 \u0641\u0642\u0637 \u0644\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0623\u062F\u0627\u0621</span>
                    <span class="count"><i class="fas fa-table ml-1"></i>\u0625\u062C\u0645\u0627\u0644\u064A: ${c.length} \u0633\u062C\u0644</span>
                </div>
            `:'<div class="contractor-analytics-empty"><i class="fas fa-folder-open"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644 \u0644\u0644\u0639\u0631\u0636</p></div>'};return`
            <div class="contractor-analytics-section tx-analytics-section grid grid-cols-1 gap-4">
                <div class="contractor-analytics-slicers">
                    <div class="contractor-analytics-slicers-header">
                        <h4 class="contractor-analytics-slicers-title">
                            <i class="fas fa-sliders-h"></i>
                            \u062A\u0635\u0641\u064A\u0629 \u0633\u0631\u064A\u0639\u0629
                        </h4>
                        <button type="button" id="attendance-analytics-reset-btn" class="contractor-analytics-reset-btn">
                            <i class="fas fa-redo-alt"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                        </button>
                    </div>
                    <div class="contractor-analytics-slicers-grid tx-analytics-slicers-wide">
                        <div class="filter-group">
                            <label><i class="fas fa-user"></i><span>\u0627\u0644\u0645\u0648\u0638\u0641</span></label>
                            <select id="attendance-analytics-employee">${r(t.dimensions.employees,e.employee)}</select>
                        </div>
                        <div class="filter-group">
                            <label><i class="fas fa-book"></i><span>\u0627\u0644\u0645\u0648\u0636\u0648\u0639</span></label>
                            <select id="attendance-analytics-topic">${r(t.dimensions.topics,e.topic)}</select>
                        </div>
                        <div class="filter-group">
                            <label><i class="fas fa-sitemap"></i><span>\u0627\u0644\u0625\u062F\u0627\u0631\u0629</span></label>
                            <select id="attendance-analytics-department">${r(t.dimensions.departments,e.department)}</select>
                        </div>
                        <div class="filter-group">
                            <label><i class="fas fa-industry"></i><span>\u0627\u0644\u0645\u0635\u0646\u0639</span></label>
                            <select id="attendance-analytics-factory">${r(t.dimensions.factories,e.factory)}</select>
                        </div>
                        <div class="filter-group">
                            <label><i class="fas fa-tag"></i><span>\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</span></label>
                            <select id="attendance-analytics-trainingType">${r(t.dimensions.trainingTypes,e.trainingType)}</select>
                        </div>
                        <div class="filter-group">
                            <label><i class="fas fa-chalkboard-teacher"></i><span>\u0627\u0644\u0645\u062D\u0627\u0636\u0631</span></label>
                            <select id="attendance-analytics-trainer">${r(t.dimensions.trainers,e.trainer)}</select>
                        </div>
                        <div class="filter-group search-full">
                            <label><i class="fas fa-search"></i><span>\u0628\u062D\u062B \u0633\u0631\u064A\u0639</span></label>
                            <input id="attendance-analytics-search" placeholder="\u0627\u0628\u062D\u062B \u0639\u0646 \u0645\u0648\u0638\u0641\u060C \u0645\u0648\u0636\u0648\u0639\u060C \u0625\u062F\u0627\u0631\u0629..." value="${a(e.search)}">
                        </div>
                    </div>
                    <p class="tx-analytics-hint">\u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u062A\u0639\u0631\u0636 \u0623\u0647\u0645 250 \u0642\u064A\u0645\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0633\u0631\u064A\u0639 \u0644\u0644\u0648\u0635\u0648\u0644 \u0644\u0623\u064A \u0633\u062C\u0644.</p>
                </div>

                <div class="contractor-analytics-kpi-grid tx-analytics-kpi-4">
                    <div class="contractor-analytics-kpi-card kpi-green">
                        <div class="kpi-label"><i class="fas fa-clipboard-list"></i>\u0627\u0644\u0633\u062C\u0644\u0627\u062A</div>
                        <div class="kpi-value">${i(n.totals.records)}</div>
                    </div>
                    <div class="contractor-analytics-kpi-card kpi-amber">
                        <div class="kpi-label"><i class="fas fa-clock"></i>\u0627\u0644\u0633\u0627\u0639\u0627\u062A</div>
                        <div class="kpi-value">${i(n.totals.hours,2)}</div>
                    </div>
                    <div class="contractor-analytics-kpi-card kpi-blue">
                        <div class="kpi-label"><i class="fas fa-users"></i>\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</div>
                        <div class="kpi-value">${i(n.totals.employees)}</div>
                    </div>
                    <div class="contractor-analytics-kpi-card kpi-indigo">
                        <div class="kpi-label"><i class="fas fa-book"></i>\u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A</div>
                        <div class="kpi-value">${i(n.totals.topics)}</div>
                    </div>
                </div>

                <div class="contractor-analytics-tabs-bar">
                    <div class="tabs-row">
                        <div class="tabs-group">
                            <button type="button" id="attendance-analytics-tab-employee" class="contractor-analytics-tab ${o("employee")}">
                                <i class="fas fa-user"></i>\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0638\u0641
                            </button>
                            <button type="button" id="attendance-analytics-tab-topic" class="contractor-analytics-tab ${o("topic")}">
                                <i class="fas fa-book"></i>\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0636\u0648\u0639
                            </button>
                            <button type="button" id="attendance-analytics-tab-details" class="contractor-analytics-tab ${o("details")}">
                                <i class="fas fa-list-alt"></i>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644
                            </button>
                        </div>
                        <div class="contractor-analytics-sort-group">
                            <div class="contractor-analytics-sort-box">
                                <label><i class="fas fa-sort-amount-down"></i>\u0641\u0631\u0632:</label>
                                <select id="attendance-analytics-sortby">
                                    <option value="hours" ${e.sortBy==="hours"?"selected":""}>\u0627\u0644\u0633\u0627\u0639\u0627\u062A</option>
                                    <option value="count" ${e.sortBy==="count"?"selected":""}>\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A</option>
                                </select>
                                <select id="attendance-analytics-sortdir">
                                    <option value="desc" ${e.sortDir==="desc"?"selected":""}>\u062A\u0646\u0627\u0632\u0644\u064A</option>
                                    <option value="asc" ${e.sortDir==="asc"?"selected":""}>\u062A\u0635\u0627\u0639\u062F\u064A</option>
                                </select>
                            </div>
                            ${s?`<button type="button" id="attendance-analytics-clear-drill" class="contractor-analytics-clear-drill"><i class="fas fa-times-circle"></i>\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0639\u0645\u0642: ${a(s)}</button>`:""}
                        </div>
                    </div>
                </div>

                <div class="contractor-analytics-content">
                    ${e.view==="topic"?l(n.topTopics,"topic"):e.view==="details"?d():l(n.topEmployees,"employee")}
                </div>
            </div>
        `},refreshAttendanceAnalytics(t=""){const e=document.getElementById("attendance-analytics-dashboard");if(!e)return;const a=this.getAttendanceAnalyticsState(),i=this.getAttendanceAnalyticsModel(t);e.innerHTML=this.renderAttendanceAnalyticsDashboard(i,a),this.bindAttendanceAnalyticsEvents(t)},bindAttendanceAnalyticsEvents(t=""){const e=this.getAttendanceAnalyticsState(),a=()=>(document.getElementById("attendance-month-filter")||{}).value||"",i=()=>this.refreshAttendanceAnalytics(a()),n=(g,f)=>{const m=document.getElementById(g);m&&m.addEventListener("change",f)};n("attendance-analytics-employee",g=>{e.employee=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-topic",g=>{e.topic=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-department",g=>{e.department=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-factory",g=>{e.factory=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-trainingType",g=>{e.trainingType=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-trainer",g=>{e.trainer=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-sortby",g=>{e.sortBy=g.target.value||"hours",i()}),n("attendance-analytics-sortdir",g=>{e.sortDir=g.target.value||"desc",i()});const s=document.getElementById("attendance-analytics-search");s&&s.addEventListener("input",g=>{e.search=g.target.value||"";const f=g.target.selectionStart,m=g.target.selectionEnd;clearTimeout(this._attendanceAnalyticsSearchTimer),this._attendanceAnalyticsSearchTimer=setTimeout(()=>{i(),requestAnimationFrame(()=>{const u=document.getElementById("attendance-analytics-search");if(u){u.focus();try{u.setSelectionRange(f,m)}catch{}}})},220)});const r=document.getElementById("attendance-analytics-tab-employee");r&&r.addEventListener("click",()=>{e.view="employee",e.drillKey="",i()});const o=document.getElementById("attendance-analytics-tab-topic");o&&o.addEventListener("click",()=>{e.view="topic",e.drillKey="",i()});const l=document.getElementById("attendance-analytics-tab-details");l&&l.addEventListener("click",()=>{e.view="details",i()});const d=document.getElementById("attendance-analytics-clear-drill");d&&d.addEventListener("click",()=>{e.drillKey="",i()});const c=document.getElementById("attendance-analytics-reset-btn");c&&c.addEventListener("click",()=>{this._attendanceAnalyticsState={employee:"",topic:"",department:"",factory:"",trainingType:"",trainer:"",search:"",view:"employee",drillMode:"employee",sortBy:"hours",sortDir:"desc",drillKey:""},i()});const p=document.getElementById("attendance-analytics-dashboard");p&&p.querySelectorAll("[data-analytics-drill]").forEach(g=>{g.addEventListener("click",()=>{const f=String(g.getAttribute("data-analytics-drill")||"").trim(),m=String(g.getAttribute("data-analytics-mode")||"").trim();e.drillMode=m==="topic"?"topic":"employee",e.drillKey=f,e.view="details",i()})})},renderContractorDetailsChart(t){const e=Object.entries(t);if(e.length===0)return`
                <div class="flex items-center justify-center text-gray-400" style="min-height: 120px;">
                    <div class="text-center">
                        <i class="fas fa-chart-bar text-2xl mb-2 opacity-50"></i>
                        <p class="text-xs">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p>
                    </div>
                </div>
            `;const a=e.sort((o,l)=>l[1].count-o[1].count).slice(0,8),i=Math.max(...a.map(o=>o[1].count),1),n=Math.max(...a.map(o=>o[1].trainees),1),s=Math.max(...a.map(o=>o[1].hours),1),r=["linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)","linear-gradient(135deg, #10B981 0%, #059669 100%)","linear-gradient(135deg, #F59E0B 0%, #D97706 100%)","linear-gradient(135deg, #EF4444 0%, #DC2626 100%)","linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)","linear-gradient(135deg, #EC4899 0%, #DB2777 100%)","linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)","linear-gradient(135deg, #84CC16 0%, #65A30D 100%)"];return`
            <div class="space-y-2.5" style="padding: 4px 0; max-height: 400px; overflow-y: auto;">
                ${a.map(([o,l],d)=>{const c=l.count/i*100,p=l.trainees/n*100,g=l.hours/s*100,f=r[d%r.length],m=o.length>20?o.substring(0,18)+"...":o,u=d+1;return`
                        <div class="group relative" style="padding: 8px 10px; background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%); border-radius: 8px; border: 1px solid #E2E8F0; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.04);" 
                             onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; this.style.borderColor='#CBD5E1';"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.04)'; this.style.borderColor='#E2E8F0';">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2 flex-1 min-w-0">
                                    <div class="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-xs" style="background: ${f}; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">
                                        ${u}
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <h4 class="text-xs font-semibold text-gray-800 truncate" title="${Utils.escapeHTML(o)}" style="font-size: 11px; line-height: 1.3;">
                                            <i class="fas fa-building text-xs ml-1" style="color: #64748B; font-size: 9px;"></i>${Utils.escapeHTML(m)}
                                        </h4>
                                    </div>
                                </div>
                                <div class="flex items-center gap-1 flex-shrink-0">
                                    <span class="px-1.5 py-0.5 rounded text-white text-xs font-medium" style="background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); font-size: 9px;">
                                        <i class="fas fa-book" style="font-size: 8px; margin-left: 2px;"></i>${l.count}
                                    </span>
                                    <span class="px-1.5 py-0.5 rounded text-white text-xs font-medium" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); font-size: 9px;">
                                        <i class="fas fa-users" style="font-size: 8px; margin-left: 2px;"></i>${l.trainees}
                                    </span>
                                    <span class="px-1.5 py-0.5 rounded text-white text-xs font-medium" style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); font-size: 9px;">
                                        <i class="fas fa-clock" style="font-size: 8px; margin-left: 2px;"></i>${l.hours.toFixed(1)}\u0633
                                    </span>
                                </div>
                            </div>
                            
                            <div class="space-y-1.5">
                                <div class="relative">
                                    <div class="flex items-center justify-between mb-0.5">
                                        <span class="text-xs text-gray-600 font-medium" style="font-size: 9px;">
                                            <i class="fas fa-book" style="color: #3B82F6; font-size: 8px; margin-left: 2px;"></i>\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A
                                        </span>
                                        <span class="text-xs font-bold text-gray-700" style="font-size: 9px;">${l.count}</span>
                                    </div>
                                    <div class="h-2 rounded-full overflow-hidden bg-gray-100" style="box-shadow: inset 0 1px 2px rgba(0,0,0,0.08);">
                                        <div class="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden" 
                                             style="width: ${c}%; background: ${f}; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"
                                             title="\u0639\u062F\u062F \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A: ${l.count}">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="relative">
                                    <div class="flex items-center justify-between mb-0.5">
                                        <span class="text-xs text-gray-600 font-medium" style="font-size: 9px;">
                                            <i class="fas fa-users" style="color: #10B981; font-size: 8px; margin-left: 2px;"></i>\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646
                                        </span>
                                        <span class="text-xs font-bold text-gray-700" style="font-size: 9px;">${l.trainees}</span>
                                    </div>
                                    <div class="h-2 rounded-full overflow-hidden bg-gray-100" style="box-shadow: inset 0 1px 2px rgba(0,0,0,0.08);">
                                        <div class="h-full rounded-full transition-all duration-500 ease-out" 
                                             style="width: ${p}%; background: linear-gradient(135deg, #10B981 0%, #059669 100%); box-shadow: 0 1px 3px rgba(16,185,129,0.25);"
                                             title="\u0639\u062F\u062F \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646: ${l.trainees}">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="relative">
                                    <div class="flex items-center justify-between mb-0.5">
                                        <span class="text-xs text-gray-600 font-medium" style="font-size: 9px;">
                                            <i class="fas fa-clock" style="color: #8B5CF6; font-size: 8px; margin-left: 2px;"></i>\u0627\u0644\u0633\u0627\u0639\u0627\u062A
                                        </span>
                                        <span class="text-xs font-bold text-gray-700" style="font-size: 9px;">${l.hours.toFixed(1)}</span>
                                    </div>
                                    <div class="h-2 rounded-full overflow-hidden bg-gray-100" style="box-shadow: inset 0 1px 2px rgba(0,0,0,0.08);">
                                        <div class="h-full rounded-full transition-all duration-500 ease-out" 
                                             style="width: ${g}%; background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); box-shadow: 0 1px 3px rgba(139,92,246,0.25);"
                                             title="\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628: ${l.hours.toFixed(2)}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join("")}
            </div>
            <style>
                .space-y-2\\.5 > * + * { margin-top: 0.625rem; }
                .space-y-1\\.5 > * + * { margin-top: 0.375rem; }
            </style>
        `},renderTrainerDetailsChart(t){const e=Object.entries(t);if(e.length===0)return`
                <div class="flex items-center justify-center text-gray-400" style="min-height: 120px;">
                    <div class="text-center">
                        <i class="fas fa-user-tie text-2xl mb-2 opacity-50"></i>
                        <p class="text-xs">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p>
                    </div>
                </div>
            `;const a=e.sort((o,l)=>l[1].hours-o[1].hours).slice(0,8),i=Math.max(...a.map(o=>o[1].count),1),n=Math.max(...a.map(o=>o[1].trainees),1),s=Math.max(...a.map(o=>o[1].hours),1),r=["linear-gradient(135deg, #F59E0B 0%, #D97706 100%)","linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)","linear-gradient(135deg, #10B981 0%, #059669 100%)","linear-gradient(135deg, #EF4444 0%, #DC2626 100%)","linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)","linear-gradient(135deg, #EC4899 0%, #DB2777 100%)","linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)","linear-gradient(135deg, #84CC16 0%, #65A30D 100%)"];return`
            <div class="space-y-2.5" style="padding: 4px 0; max-height: 400px; overflow-y: auto;">
                ${a.map(([o,l],d)=>{const c=l.count/i*100,p=l.trainees/n*100,g=l.hours/s*100,f=r[d%r.length],m=o.length>20?o.substring(0,18)+"...":o,u=d+1;return`
                        <div class="group relative" style="padding: 8px 10px; background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%); border-radius: 8px; border: 1px solid #E2E8F0; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.04);" 
                             onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; this.style.borderColor='#CBD5E1';"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.04)'; this.style.borderColor='#E2E8F0';">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2 flex-1 min-w-0">
                                    <div class="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-xs" style="background: ${f}; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">
                                        ${u}
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <h4 class="text-xs font-semibold text-gray-800 truncate" title="${Utils.escapeHTML(o)}" style="font-size: 11px; line-height: 1.3;">
                                            <i class="fas fa-user-tie" style="color: #64748B; font-size: 9px; margin-left: 2px;"></i>${Utils.escapeHTML(m)}
                                        </h4>
                                    </div>
                                </div>
                                <div class="flex items-center gap-1 flex-shrink-0">
                                    <span class="px-1.5 py-0.5 rounded text-white text-xs font-medium" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); font-size: 9px;">
                                        <i class="fas fa-clock" style="font-size: 8px; margin-left: 2px;"></i>${l.hours.toFixed(1)}\u0633
                                    </span>
                                    <span class="px-1.5 py-0.5 rounded text-white text-xs font-medium" style="background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); font-size: 9px;">
                                        <i class="fas fa-book" style="font-size: 8px; margin-left: 2px;"></i>${l.count}
                                    </span>
                                    <span class="px-1.5 py-0.5 rounded text-white text-xs font-medium" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); font-size: 9px;">
                                        <i class="fas fa-users" style="font-size: 8px; margin-left: 2px;"></i>${l.trainees}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="space-y-1.5">
                                <div class="relative">
                                    <div class="flex items-center justify-between mb-0.5">
                                        <span class="text-xs text-gray-600 font-medium" style="font-size: 9px;">
                                            <i class="fas fa-clock" style="color: #F59E0B; font-size: 8px; margin-left: 2px;"></i>\u0627\u0644\u0633\u0627\u0639\u0627\u062A
                                        </span>
                                        <span class="text-xs font-bold text-gray-700" style="font-size: 9px;">${l.hours.toFixed(1)}</span>
                                    </div>
                                    <div class="h-2 rounded-full overflow-hidden bg-gray-100" style="box-shadow: inset 0 1px 2px rgba(0,0,0,0.08);">
                                        <div class="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden" 
                                             style="width: ${g}%; background: ${f}; box-shadow: 0 1px 3px rgba(245,158,11,0.25);"
                                             title="\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628: ${l.hours.toFixed(2)}">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="relative">
                                    <div class="flex items-center justify-between mb-0.5">
                                        <span class="text-xs text-gray-600 font-medium" style="font-size: 9px;">
                                            <i class="fas fa-book" style="color: #3B82F6; font-size: 8px; margin-left: 2px;"></i>\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A
                                        </span>
                                        <span class="text-xs font-bold text-gray-700" style="font-size: 9px;">${l.count}</span>
                                    </div>
                                    <div class="h-2 rounded-full overflow-hidden bg-gray-100" style="box-shadow: inset 0 1px 2px rgba(0,0,0,0.08);">
                                        <div class="h-full rounded-full transition-all duration-500 ease-out" 
                                             style="width: ${c}%; background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); box-shadow: 0 1px 3px rgba(59,130,246,0.25);"
                                             title="\u0639\u062F\u062F \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A: ${l.count}">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="relative">
                                    <div class="flex items-center justify-between mb-0.5">
                                        <span class="text-xs text-gray-600 font-medium" style="font-size: 9px;">
                                            <i class="fas fa-users" style="color: #10B981; font-size: 8px; margin-left: 2px;"></i>\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646
                                        </span>
                                        <span class="text-xs font-bold text-gray-700" style="font-size: 9px;">${l.trainees}</span>
                                    </div>
                                    <div class="h-2 rounded-full overflow-hidden bg-gray-100" style="box-shadow: inset 0 1px 2px rgba(0,0,0,0.08);">
                                        <div class="h-full rounded-full transition-all duration-500 ease-out" 
                                             style="width: ${p}%; background: linear-gradient(135deg, #10B981 0%, #059669 100%); box-shadow: 0 1px 3px rgba(16,185,129,0.25);"
                                             title="\u0639\u062F\u062F \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646: ${l.trainees}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join("")}
            </div>
        `},getMonthOptions(){this.ensureData();const t=AppState.appData.contractorTrainings||[],e=new Set;return t.forEach(i=>{if(i.date){const n=new Date(i.date),s=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;e.add(s)}}),Array.from(e).sort().reverse().map(i=>{const[n,s]=i.split("-"),o=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"][parseInt(s)-1];return`<option value="${i}">${o} ${n}</option>`}).join("")},getEmployeeMonthOptions(){this.ensureData();const t=AppState.appData.training||[],e=new Set;t.forEach(n=>{const s=n?.startDate||n?.date||n?.createdAt;if(s){const r=new Date(s);Number.isNaN(r.getTime())||e.add(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`)}});const a=Array.from(e).sort().reverse(),i=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];return a.map(n=>{const[s,r]=n.split("-");return`<option value="${n}">${i[parseInt(r)-1]} ${s}</option>`}).join("")},getAttendanceMonthOptions(){this.ensureData();const t=AppState.appData.trainingAttendance||[],e=new Set;t.forEach(n=>{const s=n?.date||n?.attendanceDate||n?.createdAt;if(s){const r=new Date(s);Number.isNaN(r.getTime())||e.add(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`)}});const a=Array.from(e).sort().reverse(),i=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];return a.map(n=>{const[s,r]=n.split("-");return`<option value="${n}">${i[parseInt(r)-1]} ${s}</option>`}).join("")},_syncSelectOptions(t,e){const a=document.getElementById(t);if(!a)return;const i=a.value;a.innerHTML=`<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0634\u0647\u0631</option>${e||""}`,i&&Array.from(a.options).some(n=>n.value===i)&&(a.value=i)},_analyticsSelectOptions(t,e,a=250){const i=o=>Utils.escapeHTML(String(o??"")),n=String(e??"").replace(/\s+/g," ").trim(),s=Array.isArray(t)?t.slice():[],r=s.length>a?s.slice(0,a):s;if(n&&!r.includes(n)){const o=s.find(l=>String(l)===n);o!=null&&r.unshift(o)}return['<option value="">\u0627\u0644\u0643\u0644</option>'].concat(r.map(o=>`<option value="${i(o)}" ${n===String(o)?"selected":""}>${i(o)}</option>`)).join("")},_analyticsPlaceholder(t){return`
            <div class="tx-analytics-placeholder">
                <i class="fas fa-chart-pie"></i>
                <p>${Utils.escapeHTML(t||"\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u2026")}</p>
            </div>
        `},_scheduleDeferredAnalytics(t){const e=()=>{this._currentActiveTab===t&&(t==="contractors"?this.updateContractorStatsWithFilter(document.getElementById("contractor-month-filter")?.value||""):t==="attendance"&&this.refreshAttendanceAnalytics(document.getElementById("attendance-month-filter")?.value||""))};typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>setTimeout(e,40)):setTimeout(e,40)},buildContractorsTabMarkup(){const t=this.getContractorTrainingStats();return`
                <div class="tx-kpi-toolbar">
                    <label class="text-sm font-medium text-gray-700">\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631:</label>
                    <select id="contractor-month-filter" class="form-input" style="max-width: 200px;">
                        <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0634\u0647\u0631</option>
                        ${this.getMonthOptions()}
                    </select>
                    <button id="reset-contractor-filter" class="btn-secondary btn-sm">
                        <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                    </button>
                </div>

                <div class="tx-kpi-strip">
                    <div class="tx-kpi-chip">
                        <div class="tx-kpi-icon bg-blue-100 text-blue-600"><i class="fas fa-book"></i></div>
                        <div class="min-w-0">
                            <p class="tx-kpi-label">\u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629</p>
                            <p class="tx-kpi-value" id="contractor-topics-count">${t.uniqueTopics}</p>
                        </div>
                    </div>
                    <div class="tx-kpi-chip">
                        <div class="tx-kpi-icon bg-green-100 text-green-600"><i class="fas fa-building"></i></div>
                        <div class="min-w-0">
                            <p class="tx-kpi-label">\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646/\u0627\u0644\u0634\u0631\u0643\u0627\u062A</p>
                            <p class="tx-kpi-value" id="contractor-companies-count">${t.uniqueContractors}</p>
                        </div>
                    </div>
                    <div class="tx-kpi-chip">
                        <div class="tx-kpi-icon bg-purple-100 text-purple-600"><i class="fas fa-users"></i></div>
                        <div class="min-w-0">
                            <p class="tx-kpi-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646</p>
                            <p class="tx-kpi-value" id="contractor-trainees-count">${t.totalTrainees}</p>
                        </div>
                    </div>
                    <div class="tx-kpi-chip">
                        <div class="tx-kpi-icon bg-amber-100 text-amber-600"><i class="fas fa-chalkboard-teacher"></i></div>
                        <div class="min-w-0">
                            <p class="tx-kpi-label">\u0627\u0644\u0642\u0627\u0626\u0645\u0648\u0646 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628</p>
                            <p class="tx-kpi-value" id="contractor-trainers-count">${t.uniqueTrainers}</p>
                        </div>
                    </div>
                    <div class="tx-kpi-chip">
                        <div class="tx-kpi-icon bg-red-100 text-red-600"><i class="fas fa-calendar-alt"></i></div>
                        <div class="min-w-0">
                            <p class="tx-kpi-label">\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u062D\u0627\u0644\u064A</p>
                            <p class="tx-kpi-value" id="contractor-monthly-count">${t.currentMonthCount}</p>
                        </div>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between flex-wrap gap-3">
                            <h2 class="card-title"><i class="fas fa-list ml-2"></i>\u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</h2>
                            <div class="flex items-center gap-3 flex-wrap">
                                <button id="export-contractor-training-pdf-btn" class="btn-secondary">
                                    <i class="fas fa-file-pdf ml-2" style="font-size: 14px;"></i>\u062A\u0642\u0631\u064A\u0631 PDF
                                </button>
                                <button id="export-contractor-training-excel-btn" class="btn-success">
                                    <i class="fas fa-file-excel ml-2" style="font-size: 14px;"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                                </button>
                                <button id="add-contractor-training-btn" class="btn-primary">
                                    <i class="fas fa-plus ml-2"></i>
                                    \u062A\u0633\u062C\u064A\u0644 \u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="tx-reg-filters training-registry-filters" id="contractor-registry-filters" aria-label="\u0641\u0644\u0627\u062A\u0631 \u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646">
                            <div class="tx-reg-filter training-registry-filter training-registry-search">
                                <label for="contractor-training-search"><i class="fas fa-search"></i>\u0628\u062D\u062B</label>
                                <input type="search" id="contractor-training-search" class="form-input" placeholder="\u0645\u0648\u0636\u0648\u0639\u060C \u0645\u062F\u0631\u0628\u060C \u0634\u0631\u0643\u0629\u060C \u0645\u0648\u0642\u0639...">
                            </div>
                            <div class="tx-reg-filter training-registry-filter">
                                <label for="contractor-filter-contractor"><i class="fas fa-building"></i>\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0634\u0631\u0643\u0629</label>
                                <input id="contractor-filter-contractor" class="form-input" list="contractor-filter-contractor-list" placeholder="\u0627\u0628\u062D\u062B \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u0642\u0627\u0648\u0644...">
                                <datalist id="contractor-filter-contractor-list"></datalist>
                            </div>
                            <div class="tx-reg-filter training-registry-filter">
                                <label for="contractor-filter-topic"><i class="fas fa-book-open"></i>\u0627\u0644\u0645\u0648\u0636\u0648\u0639</label>
                                <input id="contractor-filter-topic" class="form-input" list="contractor-filter-topic-list" placeholder="\u0627\u0628\u062D\u062B \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u0648\u0636\u0648\u0639...">
                                <datalist id="contractor-filter-topic-list"></datalist>
                            </div>
                            <div class="tx-reg-filter training-registry-filter">
                                <label for="contractor-filter-trainer"><i class="fas fa-chalkboard-teacher"></i>\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628</label>
                                <input id="contractor-filter-trainer" class="form-input" list="contractor-filter-trainer-list" placeholder="\u0627\u0628\u062D\u062B \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u062F\u0631\u0628...">
                                <datalist id="contractor-filter-trainer-list"></datalist>
                            </div>
                            <div class="tx-reg-filter training-registry-filter">
                                <label for="contractor-filter-location"><i class="fas fa-map-marker-alt"></i>\u0627\u0644\u0645\u0648\u0642\u0639</label>
                                <input id="contractor-filter-location" class="form-input" list="contractor-filter-location-list" placeholder="\u0627\u0628\u062D\u062B \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u0648\u0642\u0639...">
                                <datalist id="contractor-filter-location-list"></datalist>
                            </div>
                            <div class="tx-reg-filter training-registry-filter">
                                <label for="contractor-filter-date-from"><i class="fas fa-calendar-alt"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062F\u0631\u064A\u0628</label>
                                <input type="date" id="contractor-filter-date-from" class="form-input">
                            </div>
                            <div class="tx-reg-filter training-registry-filter">
                                <label for="contractor-filter-date-to"><i class="fas fa-calendar-check"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062F\u0631\u064A\u0628</label>
                                <input type="date" id="contractor-filter-date-to" class="form-input">
                            </div>
                            <div class="tx-reg-filter tx-reg-filter-actions training-registry-filter training-registry-actions">
                                <button type="button" id="contractor-filter-reset" class="training-filter-reset-btn"><i class="fas fa-rotate-left"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631</button>
                            </div>
                        </div>
                        <p class="tx-reg-count" id="contractor-registry-count"></p>
                        <div id="contractor-training-container">
                            <div class="contractor-training-loading text-center py-8 text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u2026</div>
                        </div>
                    </div>
                </div>
            `},buildAttendanceTabMarkup(){let t="";try{t=(this.getSiteOptions()||[]).map(e=>`
                                <option value="${Utils.escapeHTML(e.id)}">${Utils.escapeHTML(e.name)}</option>
                            `).join("")}catch{t=""}return`
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-2">
                        <h2 class="card-title"><i class="fas fa-clipboard-check ml-2"></i>\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</h2>
                        <div class="flex items-center gap-2 flex-wrap">
                            <button id="attendance-registry-add-record" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644
                            </button>
                            <button id="attendance-registry-import-excel" class="btn-secondary">
                                <i class="fas fa-file-import ml-2"></i>
                                \u0627\u0633\u062A\u064A\u0631\u0627\u062F Excel
                            </button>
                            <button id="attendance-registry-export-excel" class="btn-secondary">
                                <i class="fas fa-file-excel ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 Excel
                            </button>
                            <button id="attendance-registry-export-pdf" class="btn-primary">
                                <i class="fas fa-file-pdf ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 PDF
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="tx-reg-filters training-registry-filters" id="attendance-registry-filters" aria-label="\u0641\u0644\u0627\u062A\u0631 \u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646">
                        <div class="tx-reg-filter training-registry-filter training-registry-search">
                            <label for="attendance-registry-search"><i class="fas fa-search"></i>\u0628\u062D\u062B</label>
                            <input type="search" id="attendance-registry-search" class="form-input" placeholder="\u0627\u0633\u0645\u060C \u0643\u0648\u062F\u060C \u0645\u0648\u0636\u0648\u0639\u060C \u0645\u062D\u0627\u0636\u0631...">
                        </div>
                        <div class="tx-reg-filter training-registry-filter">
                            <label for="attendance-filter-employee"><i class="fas fa-user"></i>\u0627\u0644\u0645\u0648\u0638\u0641</label>
                            <input id="attendance-filter-employee" class="form-input" list="attendance-filter-employee-list" placeholder="\u0627\u0628\u062D\u062B \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u0648\u0638\u0641...">
                            <datalist id="attendance-filter-employee-list"></datalist>
                        </div>
                        <div class="tx-reg-filter training-registry-filter">
                            <label for="attendance-filter-topic"><i class="fas fa-book-open"></i>\u0627\u0644\u0645\u0648\u0636\u0648\u0639</label>
                            <input id="attendance-filter-topic" class="form-input" list="attendance-filter-topic-list" placeholder="\u0627\u0628\u062D\u062B \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u0648\u0636\u0648\u0639...">
                            <datalist id="attendance-filter-topic-list"></datalist>
                        </div>
                        <div class="tx-reg-filter training-registry-filter">
                            <label for="attendance-filter-department"><i class="fas fa-sitemap"></i>\u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                            <input id="attendance-filter-department" class="form-input" list="attendance-filter-department-list" placeholder="\u0627\u0628\u062D\u062B \u0623\u0648 \u0627\u062E\u062A\u0631 \u0625\u062F\u0627\u0631\u0629...">
                            <datalist id="attendance-filter-department-list"></datalist>
                        </div>
                        <div class="tx-reg-filter training-registry-filter">
                            <label for="attendance-filter-factory"><i class="fas fa-industry"></i>\u0627\u0644\u0645\u0635\u0646\u0639</label>
                            <input id="attendance-filter-factory" class="form-input" list="attendance-filter-factory-list" placeholder="\u0627\u0628\u062D\u062B \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u0635\u0646\u0639...">
                            <datalist id="attendance-filter-factory-list"></datalist>
                            <select id="attendance-registry-filter-factory" class="form-input" style="display:none;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u0646\u0639</option>
                                ${t}
                            </select>
                        </div>
                        <div class="tx-reg-filter training-registry-filter">
                            <label for="attendance-filter-trainer"><i class="fas fa-chalkboard-teacher"></i>\u0627\u0644\u0645\u062D\u0627\u0636\u0631</label>
                            <input id="attendance-filter-trainer" class="form-input" list="attendance-filter-trainer-list" placeholder="\u0627\u0628\u062D\u062B \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u062D\u0627\u0636\u0631...">
                            <datalist id="attendance-filter-trainer-list"></datalist>
                        </div>
                        <div class="tx-reg-filter training-registry-filter">
                            <label for="attendance-filter-date-from"><i class="fas fa-calendar-alt"></i>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062F\u0631\u064A\u0628</label>
                            <input type="date" id="attendance-filter-date-from" class="form-input">
                        </div>
                        <div class="tx-reg-filter training-registry-filter">
                            <label for="attendance-filter-date-to"><i class="fas fa-calendar-check"></i>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062F\u0631\u064A\u0628</label>
                            <input type="date" id="attendance-filter-date-to" class="form-input">
                        </div>
                        <div class="tx-reg-filter tx-reg-filter-actions training-registry-filter training-registry-actions">
                            <button type="button" id="attendance-filter-reset" class="training-filter-reset-btn"><i class="fas fa-rotate-left"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631</button>
                        </div>
                    </div>
                    <p class="tx-reg-count" id="attendance-registry-count"></p>
                    <div class="table-responsive">
                        <table class="data-table" id="attendance-registry-table">
                            <thead>
                                <tr>
                                    <th>\u0645</th>
                                    <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                    <th>\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                                    <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                    <th>\u0627\u0644\u0643\u0648\u062F</th>
                                    <th>\u0627\u0644\u0627\u0633\u0645</th>
                                    <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                                    <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                                    <th>\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629</th>
                                    <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631</th>
                                    <th>\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621</th>
                                    <th>\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th>
                                    <th>\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                                    <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                </tr>
                            </thead>
                            <tbody id="attendance-registry-table-body">
                                <tr>
                                    <td colspan="14" class="text-center text-gray-500 py-4">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `},buildProgramsTabMarkup(){const t=this.getStats(),e=Math.max(1,t.totalTrainings||0,t.upcomingTrainings||0,t.completedTrainings||0,t.totalParticipants||0),a=i=>i>0?Math.min(100,Math.round(i/e*100)):0;return`
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                    <div class="pinsp-stat">
                        <div class="pinsp-stat__icon pinsp-stat__icon--blue"><i class="fas fa-graduation-cap"></i></div>
                        <div class="pinsp-stat__body">
                            <p class="pinsp-stat__label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0631\u0627\u0645\u062C</p>
                            <p id="training-programs-kpi-total" class="pinsp-stat__value" style="color:#1d4ed8;">${t.totalTrainings}</p>
                            <div class="pinsp-stat__bar"><span style="width:${a(t.totalTrainings)}%; background:#2563eb;"></span></div>
                        </div>
                        <span class="pinsp-stat__pct">${a(t.totalTrainings)}%</span>
                    </div>
                    <div class="pinsp-stat">
                        <div class="pinsp-stat__icon pinsp-stat__icon--amber"><i class="fas fa-calendar-alt"></i></div>
                        <div class="pinsp-stat__body">
                            <p class="pinsp-stat__label">\u0628\u0631\u0627\u0645\u062C \u0642\u0627\u062F\u0645\u0629</p>
                            <p id="training-programs-kpi-upcoming" class="pinsp-stat__value" style="color:#c2410c;">${t.upcomingTrainings}</p>
                            <div class="pinsp-stat__bar"><span style="width:${a(t.upcomingTrainings)}%; background:#f59e0b;"></span></div>
                        </div>
                        <span class="pinsp-stat__pct">${a(t.upcomingTrainings)}%</span>
                    </div>
                    <div class="pinsp-stat">
                        <div class="pinsp-stat__icon pinsp-stat__icon--green"><i class="fas fa-check-circle"></i></div>
                        <div class="pinsp-stat__body">
                            <p class="pinsp-stat__label">\u0628\u0631\u0627\u0645\u062C \u0645\u0643\u062A\u0645\u0644\u0629</p>
                            <p id="training-programs-kpi-completed" class="pinsp-stat__value" style="color:#15803d;">${t.completedTrainings}</p>
                            <div class="pinsp-stat__bar"><span style="width:${a(t.completedTrainings)}%; background:#22c55e;"></span></div>
                        </div>
                        <span class="pinsp-stat__pct">${a(t.completedTrainings)}%</span>
                    </div>
                    <div class="pinsp-stat">
                        <div class="pinsp-stat__icon pinsp-stat__icon--indigo"><i class="fas fa-users"></i></div>
                        <div class="pinsp-stat__body">
                            <p class="pinsp-stat__label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</p>
                            <p id="training-programs-kpi-participants" class="pinsp-stat__value" style="color:#4338ca;">${t.totalParticipants}</p>
                            <div class="pinsp-stat__bar"><span style="width:${a(t.totalParticipants)}%; background:#6366f1;"></span></div>
                        </div>
                        <span class="pinsp-stat__pct">${a(t.totalParticipants)}%</span>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title"><i class="fas fa-list ml-2"></i>\u0642\u0627\u0626\u0645\u0629 \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628</h2>
                            <div class="flex items-center gap-4">
                                <button id="export-training-pdf-btn" class="btn-secondary">
                                    <i class="fas fa-file-pdf ml-2" style="font-size: 14px;"></i>\u062A\u0642\u0631\u064A\u0631 PDF
                                </button>
                                <button id="export-training-excel-btn" class="btn-success">
                                    <i class="fas fa-file-excel ml-2" style="font-size: 14px;"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                                </button>
                                <input type="text" id="training-search" class="form-input" style="max-width: 300px;" placeholder="\u0627\u0644\u0628\u062D\u062B...">
                                <select id="training-filter-status" class="form-input" style="max-width: 200px;">
                                    <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                    <option value="\u0645\u062E\u0637\u0637">\u0645\u062E\u0637\u0637</option>
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                    <option value="\u0645\u0643\u062A\u0645\u0644">\u0645\u0643\u062A\u0645\u0644</option>
                                    <option value="\u0645\u0644\u063A\u064A">\u0645\u0644\u063A\u064A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="training-table-container">
                            <div class="table-wrapper" style="overflow-x: auto;">
                                <table class="data-table table-header-purple">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C</th>
                                            <th>\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                                            <th>\u0627\u0644\u0645\u062F\u0631\u0628</th>
                                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621</th>
                                            <th>\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</th>
                                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colspan="7" class="text-center text-gray-500 py-10">
                                                <div class="flex flex-col items-center justify-center gap-3">
                                                    <div style="width:200px;height:4px;background:rgba(59,130,246,0.2);border-radius:3px;overflow:hidden">
                                                        <div style="height:100%;width:40%;background:linear-gradient(90deg,#3b82f6,#2563eb);border-radius:3px;animation:loadingProgress 1.2s ease-in-out infinite"></div>
                                                    </div>
                                                    <span>\u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0626\u0645\u0629\u2026</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            `},async renderTabContent(t){return t==="programs"?this.buildProgramsTabMarkup():t==="contractors"?this.buildContractorsTabMarkup():t==="attendance"?this.buildAttendanceTabMarkup():t==="legalTraining"?this.renderLegalTrainingTab():t==="analysis"?await this.renderAnalysisTab():""},async switchTab(t){if(t==="legalTraining"&&!this.canViewLegalTrainingTab())return this.switchTab("programs");document.querySelectorAll(".tab-btn").forEach(s=>{s.classList.remove("active")});const e=document.querySelector(`.tab-btn[data-tab="${t}"]`);e&&e.classList.add("active");const a=document.getElementById("training-tab-content");if(!a)return;this._currentActiveTab=t;const i=this._tabCache[t],n=this._tabDirty[t]!==!1;i&&!n?a.innerHTML=i:(a.innerHTML=await this.renderTabContent(t),this._tabCache[t]=a.innerHTML,this._tabDirty[t]=!1),this._hydrateTab(t),t==="contractors"?this.loadContractorTrainingsPriority().catch(()=>{}):t==="attendance"||t==="legalTraining"?this._fetchTrainingTabFromBackend(t).catch(()=>{}):t==="analysis"&&this._trainingTabFetchOk?.programs!==!0&&this._fetchTrainingTabFromBackend("programs").catch(()=>{}),this.setupEventListeners()},_hydrateTab(t){t==="programs"?this.loadTrainingList():t==="contractors"?(this.refreshContractorTrainingList().catch(()=>{}),this.updateContractorStatsWithFilter(document.getElementById("contractor-month-filter")?.value||"")):t==="attendance"?this.loadAttendanceRegistry():t==="legalTraining"?this.loadLegalTrainingList():t==="analysis"&&setTimeout(()=>{this.updateTrainingAnalyticsDashboard(),this._tBindAnalyticsEvents()},80)},_markAllTabsDirty(){this._tabDirty.programs=!0,this._tabDirty.contractors=!0,this._tabDirty.attendance=!0,this._tabDirty.analysis=!0,this._tabDirty.legalTraining=!0,this._tabCache.programs=null,this._tabCache.contractors=null,this._tabCache.attendance=null,this._tabCache.analysis=null,this._tabCache.legalTraining=null},async renderList(){return await this.renderTabContent("programs")},async loadTrainingList(){this.ensureData();const t=document.getElementById("training-table-container");if(!t)return;this.refreshProgramsTabKpiCards();const e=AppState.appData.training||[];if(e.length===0){t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-graduation-cap text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0631\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A\u0629</p>
                    <button id="add-training-empty-btn" onclick="Training.showForm()" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0628\u0631\u0646\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A
                    </button>
                </div>
            `,this.applyModuleI18n(t);return}t.innerHTML=`
            <style id="training-list-table-style">
                #training-table-container .data-table { table-layout: auto; }
                #training-table-container .data-table tbody tr { transition: background-color .15s ease; }
                #training-table-container .data-table tbody tr:nth-child(even) { background: #fafbfc; }
                #training-table-container .data-table tbody tr:hover { background: #eef2ff !important; }
                #training-table-container .data-table td {
                    vertical-align: middle;
                    padding: 14px 16px;
                    line-height: 1.5;
                    border-bottom: 1px solid #e5e7eb;
                }
                #training-table-container .data-table th { padding: 14px 16px; vertical-align: middle; }
                #training-table-container .training-name-cell { min-width: 220px; max-width: 320px; word-break: break-word; }
                #training-table-container .training-actions-cell { white-space: nowrap; min-width: 200px; }
                #training-table-container .training-actions-cell .flex { flex-wrap: nowrap; gap: 6px; }
                #training-table-container .training-actions-cell .btn-icon { width: 32px; height: 32px; padding: 0; flex-shrink: 0; }
                #training-table-container .training-text-cell { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px; }
                #training-table-container .data-table .badge { white-space: nowrap; display: inline-block; }
            </style>
            <div class="table-wrapper" style="overflow-x: auto; border-radius: 12px; border: 1px solid #e5e7eb; background: #fff;">
                <table class="data-table table-header-purple" style="margin-bottom: 0;">
                    <thead>
                        <tr>
                            <th style="min-width: 220px;">\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C</th>
                            <th style="min-width: 100px; text-align: center;">\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                            <th style="min-width: 140px;">\u0627\u0644\u0645\u062F\u0631\u0628</th>
                            <th style="min-width: 130px;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                            <th style="min-width: 100px; text-align: center;">\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</th>
                            <th style="min-width: 100px; text-align: center;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th style="min-width: 180px; text-align: center;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(a=>{const i=a.status||"",n=this.getParticipantsCount(a),s=/تنفي/.test(i),r=i==="\u0645\u0643\u062A\u0645\u0644"?"success":s?"info":i==="\u0645\u0644\u063A\u064A"?"danger":"warning",o=a.startDate?Utils.formatDate(a.startDate):a.date?Utils.formatDate(a.date):"-",l=Utils.escapeHTML(a.trainingType||"\u062F\u0627\u062E\u0644\u064A"),d=a.trainingType==="\u062E\u0627\u0631\u062C\u064A"?"badge-warning":"badge-info",c=i==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630"?"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":i||"-";let p="";return a.location&&(a.locationName?p=a.locationName:p=this.getPlaceName(a.location,a.factory)),`
                                <tr>
                                    <td class="training-name-cell">
                                        <div class="font-semibold text-gray-900" style="line-height: 1.4;">${Utils.escapeHTML(a.name||"")}</div>
                                        ${p?`<div class="text-xs text-gray-500" style="margin-top: 4px; line-height: 1.3;"><i class="fas fa-map-marker-alt ml-1"></i>${Utils.escapeHTML(p)}</div>`:""}
                                    </td>
                                    <td style="text-align: center;"><span class="badge ${d}">${l}</span></td>
                                    <td class="training-text-cell" title="${Utils.escapeHTML(a.trainer||"")}">
                                        <div class="font-medium text-gray-800">${Utils.escapeHTML(a.trainer||"-")}</div>
                                    </td>
                                    <td style="white-space: nowrap;">
                                        <div class="font-medium text-gray-900">${o}</div>
                                        ${a.expiryDate?`<div class="text-xs text-indigo-600 font-semibold" style="margin-top: 2px;" title="\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"><i class="fas fa-hourglass-half ml-1"></i>\u064A\u0646\u062A\u0647\u064A: ${Utils.formatDate(a.expiryDate)}</div>`:""}
                                    </td>
                                    <td style="text-align: center;"><span class="badge badge-info font-bold">${n}</span></td>
                                    <td style="text-align: center;"><span class="badge badge-${r}">${Utils.escapeHTML(c)}</span></td>
                                    <td class="training-actions-cell">
                                        <div class="flex items-center" style="justify-content: center;">
                                            <button onclick="Training.viewTraining('${a.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                                <i class="fas fa-eye" style="font-size: 13px;"></i>
                                            </button>
                                            <button onclick="Training.editTraining('${a.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                                <i class="fas fa-edit" style="font-size: 13px;"></i>
                                            </button>
                                            <button onclick="Training.printTraining('${a.id}')" class="btn-icon btn-icon-secondary" title="\u0637\u0628\u0627\u0639\u0629">
                                                <i class="fas fa-print" style="font-size: 13px;"></i>
                                            </button>
                                            <button onclick="Training.exportTraining('${a.id}')" class="btn-icon btn-icon-success" title="\u062A\u0635\u062F\u064A\u0631">
                                                <i class="fas fa-file-export" style="font-size: 13px;"></i>
                                            </button>
                                            <button onclick="Training.deleteTraining('${a.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                                <i class="fas fa-trash" style="font-size: 13px;"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `,this.applyModuleI18n(t)},setupEventListeners(){const t=(i,n,s)=>{!i||i.dataset.bound==="1"||(i.addEventListener(n,s),i.dataset.bound="1")};t(document.getElementById("add-training-btn"),"click",()=>this.showForm()),t(document.getElementById("add-training-empty-btn"),"click",()=>this.showForm()),t(document.getElementById("training-form"),"submit",i=>this.handleSubmit(i)),t(document.getElementById("export-training-excel-btn"),"click",()=>this.exportToExcel()),t(document.getElementById("export-training-pdf-btn"),"click",()=>this.showTrainingReportDialog()),t(document.getElementById("training-form-print-btn"),"click",()=>this.printAttendanceFormFromScreen()),t(document.getElementById("training-form-back-btn"),"click",()=>this.showList());const e=document.getElementById("training-search"),a=document.getElementById("training-filter-status");t(e,"input",i=>this.filterItems(i.target.value,a?.value||"")),t(a,"change",i=>this.filterItems(e?.value||"",i.target.value)),t(document.getElementById("view-training-matrix-btn"),"click",()=>this.showTrainingMatrix()),t(document.getElementById("view-annual-training-plan-btn"),"click",()=>this.showAnnualPlanModal()),t(document.getElementById("training-refresh-btn"),"click",()=>this.refresh()),t(document.getElementById("add-contractor-training-header-btn"),"click",()=>this.openContractorTrainingForm()),t(document.getElementById("add-contractor-training-btn"),"click",()=>this.openContractorTrainingForm()),t(document.getElementById("contractor-training-search"),"input",()=>this._debounceRegistryFilter(()=>this.filterContractorTraining())),t(document.getElementById("contractor-filter-contractor"),"input",()=>this._debounceRegistryFilter(()=>this.filterContractorTraining())),t(document.getElementById("contractor-filter-topic"),"input",()=>this._debounceRegistryFilter(()=>this.filterContractorTraining())),t(document.getElementById("contractor-filter-trainer"),"input",()=>this._debounceRegistryFilter(()=>this.filterContractorTraining())),t(document.getElementById("contractor-filter-location"),"input",()=>this._debounceRegistryFilter(()=>this.filterContractorTraining())),t(document.getElementById("contractor-filter-date-from"),"change",()=>this.filterContractorTraining()),t(document.getElementById("contractor-filter-date-to"),"change",()=>this.filterContractorTraining()),t(document.getElementById("contractor-filter-reset"),"click",()=>{["contractor-training-search","contractor-filter-contractor","contractor-filter-topic","contractor-filter-trainer","contractor-filter-location","contractor-filter-date-from","contractor-filter-date-to"].forEach(i=>{const n=document.getElementById(i);n&&(n.value="")}),this.filterContractorTraining()}),t(document.getElementById("export-contractor-training-excel-btn"),"click",()=>this.exportContractorTrainingExcel()),t(document.getElementById("export-contractor-training-pdf-btn"),"click",()=>this.showContractorTrainingReportDialog()),t(document.getElementById("contractor-month-filter"),"change",i=>this.updateContractorStatsWithFilter(i.target.value)),t(document.getElementById("reset-contractor-filter"),"click",()=>{const i=document.getElementById("contractor-month-filter");i&&(i.value="",this.updateContractorStatsWithFilter(""))})},updateContractorStatsWithFilter(t){const e=this.getContractorTrainingStats(t),a=document.getElementById("contractor-topics-count");a&&(a.textContent=e.uniqueTopics);const i=document.getElementById("contractor-companies-count");i&&(i.textContent=e.uniqueContractors);const n=document.getElementById("contractor-trainees-count");n&&(n.textContent=e.totalTrainees);const s=document.getElementById("contractor-trainers-count");s&&(s.textContent=e.uniqueTrainers);const r=document.getElementById("contractor-monthly-count");r&&(r.textContent=e.currentMonthCount)},async showTrainingMatrix(){this.ensureData();const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 1400px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-table ml-2"></i>
                        \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0643\u0644 \u0645\u0648\u0638\u0641
                    </h2>
                    <div class="flex items-center gap-2 mr-auto">
                        <button class="btn-secondary btn-sm" id="manage-training-topics-btn">
                            <i class="fas fa-layer-group ml-2"></i>
                            \u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u0648\u0638\u0627\u0626\u0641
                        </button>
                        <button class="btn-secondary btn-sm" id="matrix-annual-plan-btn">
                            <i class="fas fa-calendar-check ml-2"></i>
                            \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629
                        </button>
                    </div>
                    <button class="modal-close" id="training-matrix-close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <div class="flex gap-2 items-center">
                            <input type="text" id="training-matrix-search" class="form-input" style="max-width: 400px;" 
                                placeholder="\u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0645\u0648\u0638\u0641 (\u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0648\u0638\u064A\u0641\u0629)">
                        </div>
                    </div>
                    <div id="training-matrix-content">
                        ${await this.renderTrainingMatrix()}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" id="training-matrix-close-footer-btn">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-primary" onclick="Training.exportTrainingMatrix()">
                        <i class="fas fa-file-excel ml-2"></i>\u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                </div>
            </div>
        `,document.body.appendChild(t);const e=s=>{s&&(s.preventDefault(),s.stopPropagation()),t&&t.parentNode&&t.remove()},a=t.querySelector("#training-matrix-close-btn");a&&a.addEventListener("click",e);const i=t.querySelector("#training-matrix-close-footer-btn");i&&i.addEventListener("click",e);const n=document.getElementById("training-matrix-search");n&&n.addEventListener("input",s=>{this.filterTrainingMatrix(s.target.value.trim())}),t.querySelector("#manage-training-topics-btn")?.addEventListener("click",()=>this.openTrainingTopicsManager()),t.querySelector("#matrix-annual-plan-btn")?.addEventListener("click",()=>this.showAnnualPlanModal()),t.addEventListener("click",s=>{s.target===t&&e(s)})},async renderTrainingMatrix(){this.ensureData();const t=AppState.appData.employees||[],e=AppState.appData.employeeTrainingMatrix||{};return t.length===0?`
                <div class="empty-state">
                    <i class="fas fa-table text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0638\u0641\u064A\u0646</p>
                </div>
            `:`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                            <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                            <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                            <th>\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                            <th>\u0639\u062F\u062F \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                            <th>\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                            <th>\u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.map(a=>{const i=a.employeeNumber||a.sapId||"",n=e[i]||[],s=n.reduce((p,g)=>p+(parseFloat(g.hours)||0),0),r=n.filter(p=>p.trainingType==="\u062F\u0627\u062E\u0644\u064A").length,o=n.filter(p=>p.trainingType==="\u062E\u0627\u0631\u062C\u064A").length,l=this.getRequiredTopicsForPosition(a.position),d=this.getCompletedTopicsSet(n),c=l.filter(p=>{const g=typeof p=="string"?p:p.topic;return g&&d.has(g.toLowerCase())}).length;return`
                                <tr data-code="${i}" data-name="${a.name||""}" data-position="${a.position||""}">
                                    <td><strong>${Utils.escapeHTML(i)}</strong></td>
                                    <td>${Utils.escapeHTML(a.name||"")}</td>
                                    <td>${Utils.escapeHTML(a.position||"-")}</td>
                                    <td>${Utils.escapeHTML(a.department||"-")}</td>
                                    <td>
                                        <span class="badge badge-info">${n.length}</span>
                                        <span class="text-xs text-gray-500 mr-2">(\u062F\u0627\u062E\u0644\u064A: ${r}, \u062E\u0627\u0631\u062C\u064A: ${o})</span>
                                    </td>
                                    <td><strong>${s.toFixed(2)}</strong> \u0633\u0627\u0639\u0629</td>
                                    <td>
                                        ${l.length?`
                                            <span class="badge ${c===l.length?"badge-success":"badge-warning"}">
                                                ${c}/${l.length}
                                            </span>
                                            <span class="text-xs text-gray-500 mr-2">\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0645\u0637\u0644\u0648\u0628\u0629</span>
                                        `:'<span class="text-xs text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0645\u062D\u062F\u062F\u0629</span>'}
                                    </td>
                                    <td>
                                        <div class="flex items-center gap-2 flex-wrap">
                                            <button onclick="Training.viewEmployeeTrainingMatrix('${Utils.escapeHTML(i)}')" class="btn-secondary btn-sm" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0648\u062C\u0645\u064A\u0639 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; font-size: 0.875rem;">
                                                <i class="fas fa-eye"></i>
                                                <span>\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</span>
                                            </button>
                                            <button onclick="Training.openQuickTrainingRegistration('${Utils.escapeHTML(i)}')" class="btn-icon btn-icon-primary" title="\u062A\u0633\u062C\u064A\u0644 \u062A\u062F\u0631\u064A\u0628 \u062C\u062F\u064A\u062F">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},async refreshTrainingMatrix(){const t=document.getElementById("training-matrix-content");t&&(t.innerHTML=await this.renderTrainingMatrix())},filterTrainingMatrix(t){const e=document.querySelector("#training-matrix-content tbody");if(!e)return;e.querySelectorAll("tr[data-code]").forEach(i=>{const n=i.getAttribute("data-code")||"",s=i.getAttribute("data-name")||"",r=i.getAttribute("data-position")||"",o=t.toLowerCase();!t||n.includes(t)||s.toLowerCase().includes(o)||r.toLowerCase().includes(o)?i.style.display="":i.style.display="none"})},async viewEmployeeTrainingMatrix(t){const a=(AppState.appData.employees||[]).find(f=>(f.employeeNumber||f.sapId)===t);if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0638\u0641");return}const n=(AppState.appData.employeeTrainingMatrix||{})[t]||[],s=this.getRequiredTopicsForPosition(a.position),r=this.getCompletedTopicsSet(n),o=new Date().getFullYear(),d=(this.getAnnualPlan(o,{createIfMissing:!1})?.items||[]).filter(f=>f.targetType==="contractors"?!1:Array.isArray(f.targetRoles)&&f.targetRoles.length?f.targetRoles.includes(a.position):!0)||[],c=s.map(f=>{const m=typeof f=="string"?f:f.topic||"",u=typeof f=="object"?f.required!==!1:!0,y=typeof f=="object"&&f.recommendedHours||"",x=typeof f=="object"&&f.frequency||"\u0633\u0646\u0648\u064A",h=r.has(m.toLowerCase()),k=d.find(E=>E.topic===m||Array.isArray(E.requiredTopics)&&E.requiredTopics.includes(m)),A=k?.status||(h?"\u0645\u0643\u062A\u0645\u0644":"\u0645\u062E\u0637\u0637"),b=A==="\u0645\u0643\u062A\u0645\u0644"?"badge-success":A==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"badge-info":A==="\u0645\u0624\u062C\u0644"?"badge-warning":h?"badge-success":"badge-secondary";return`
                <tr>
                    <td>${Utils.escapeHTML(m)}</td>
                    <td>${x}</td>
                    <td>${y?`${y} \u0633\u0627\u0639\u0629`:"\u2014"}</td>
                    <td>
                        <span class="badge ${b}">${Utils.escapeHTML(A)}</span>
                        ${k?.plannedDate?`<div class="text-xs text-gray-500 mt-1">\u0645\u0648\u0639\u062F \u0645\u062E\u0637\u0637: ${Utils.formatDate(k.plannedDate)}</div>`:""}
                    </td>
                    <td>${u?"\u0625\u0644\u0632\u0627\u0645\u064A":"\u0627\u062E\u062A\u064A\u0627\u0631\u064A"}</td>
                </tr>
            `}).join(""),p=document.createElement("div");p.className="modal-overlay";const g=[...n].sort((f,m)=>{const u=new Date(f.trainingDate||f.date||0);return new Date(m.trainingDate||m.date||0)-u});p.innerHTML=`
            <div class="modal-content" style="max-width: 1100px; max-height: 90vh; display: flex; flex-direction: column;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-graduation-cap ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628: ${Utils.escapeHTML(a.name||"")}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="overflow-y: auto; flex: 1;">
                    <div class="mb-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(t)}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0648\u0638\u064A\u0641\u0629:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.position||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(a.department||"-")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0625\u062C\u0645\u0627\u0644\u064A \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628:</label>
                                <p class="text-gray-800 font-bold">${n.length}</p>
                            </div>
                        </div>
                    </div>
                    ${s.length?`
                        <div class="mt-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3">
                                <i class="fas fa-list-check ml-2 text-blue-600"></i>
                                \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u062D\u0633\u0628 \u0648\u0638\u064A\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641 (${s.length})
                            </h3>
                            <div class="table-wrapper">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0644\u0645\u0648\u0636\u0648\u0639</th>
                                            <th>\u0627\u0644\u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647</th>
                                            <th>\u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647\u0627</th>
                                            <th>\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</th>
                                            <th>\u0627\u0644\u0625\u0644\u0632\u0627\u0645</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${c}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `:""}
                    <div class="mt-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-3">
                            <i class="fas fa-list-alt ml-2 text-green-600"></i>
                            \u062C\u0645\u064A\u0639 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 (${n.length})
                        </h3>
                        ${n.length>0?`
                        <div class="table-wrapper" style="overflow: auto; max-height: 400px; border: 1px solid #e5e7eb; border-radius: 8px;">
                            <table class="data-table" style="margin: 0;">
                                <thead style="position: sticky; top: 0; background: #f8fafc; z-index: 1;">
                                    <tr>
                                        <th>\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C</th>
                                        <th>\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                                        <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                        <th>\u0627\u0644\u0645\u0643\u0627\u0646</th>
                                        <th>\u0627\u0644\u0645\u062F\u0631\u0628</th>
                                        <th>\u0627\u0644\u0633\u0627\u0639\u0627\u062A</th>
                                        <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${g.map(f=>`
                                        <tr>
                                            <td>${Utils.escapeHTML(f.trainingName||f.name||"")}</td>
                                            <td>
                                                <span class="badge badge-${f.trainingType==="\u062F\u0627\u062E\u0644\u064A"?"info":"warning"}">
                                                    ${Utils.escapeHTML(f.trainingType||"\u062F\u0627\u062E\u0644\u064A")}
                                                </span>
                                            </td>
                                            <td>${f.trainingDate||f.date?Utils.formatDate(f.trainingDate||f.date):"-"}</td>
                                            <td>${Utils.escapeHTML(f.location||"-")}</td>
                                            <td>${Utils.escapeHTML(f.trainer||"-")}</td>
                                            <td>${(parseFloat(f.hours)||0).toFixed(2)} \u0633\u0627\u0639\u0629</td>
                                            <td>
                                                <span class="badge badge-${f.completed?"success":/تنفي/.test(f.status||"")?"info":"warning"}">
                                                    ${Utils.escapeHTML(f.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630"?"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":f.status||"\u0645\u062E\u0637\u0637")}
                                                </span>
                                            </td>
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        </div>
                        `:`
                        <div class="empty-state" style="padding: 2rem;">
                            <i class="fas fa-graduation-cap text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0631\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628 \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641</p>
                        </div>
                        `}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(p),p.addEventListener("click",f=>{f.target===p&&p.remove()})},getRequiredTopicsForPosition(t){if(!t)return[];this.ensureData();const e=AppState.appData.trainingTopicsByRole||{};return Array.isArray(e[t])?e[t]:[]},getCompletedTopicsSet(t=[]){const e=new Set;return t.forEach(a=>{a&&(Array.isArray(a.topics)&&a.topics.forEach(i=>{i&&e.add(String(i).toLowerCase())}),a.trainingName&&e.add(String(a.trainingName).toLowerCase()))}),e},getSelectedOptionsFromElement(t){return t?Array.from(t.selectedOptions||[]).map(e=>e.value).filter(Boolean):[]},getUniquePositions(){this.ensureData();const t=AppState.appData.employees||[],e=new Set;return t.forEach(a=>{a.position&&e.add(a.position)}),Array.from(e).sort((a,i)=>a.localeCompare(i))},openTrainingTopicsManager(){this.ensureData();const t=this.getUniquePositions();t.length||Notification.info("\u0644\u0627 \u062A\u0648\u062C\u062F \u0648\u0638\u0627\u0626\u0641 \u0645\u0633\u062C\u0644\u0629 \u0644\u0631\u0628\u0637 \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629");const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-layer-group ml-2"></i>
                        \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0648\u0638\u064A\u0641\u0629
                    </h2>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u062E\u062A\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                            <select id="topics-position-select" class="form-input">
                                ${t.map(r=>`<option value="${Utils.escapeHTML(r)}">${Utils.escapeHTML(r)}</option>`).join("")}
                            </select>
                        </div>
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                            <i class="fas fa-info-circle ml-2"></i>
                            \u064A\u0645\u0643\u0646 \u0631\u0628\u0637 \u0643\u0644 \u0648\u0638\u064A\u0641\u0629 \u0628\u0642\u0627\u0626\u0645\u0629 \u0645\u0646 \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0644\u062A\u0633\u0647\u064A\u0644 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062A\u0646\u0641\u064A\u0630.
                        </div>
                    </div>
                    
                    <div id="topics-manager-content"></div>
                    
                    <div class="border-t pt-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-3">\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0636\u0648\u0639 \u062A\u062F\u0631\u064A\u0628\u064A \u062C\u062F\u064A\u062F</h3>
                        <form id="topics-add-form" class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0636\u0648\u0639 *</label>
                                    <input type="text" id="topics-new-name" class="form-input" required placeholder="\u0645\u062B\u0627\u0644: \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u063A\u0630\u0627\u0621">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647</label>
                                    <select id="topics-new-frequency" class="form-input">
                                        <option value="\u0633\u0646\u0648\u064A">\u0633\u0646\u0648\u064A</option>
                                        <option value="\u0646\u0635\u0641 \u0633\u0646\u0648\u064A">\u0646\u0635\u0641 \u0633\u0646\u0648\u064A</option>
                                        <option value="\u0631\u0628\u0639 \u0633\u0646\u0648\u064A">\u0631\u0628\u0639 \u0633\u0646\u0648\u064A</option>
                                        <option value="\u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629">\u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629</label>
                                    <input type="number" id="topics-new-hours" class="form-input" min="0" step="0.5" placeholder="\u0639\u062F\u062F \u0627\u0644\u0633\u0627\u0639\u0627\u062A">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0625\u0644\u0632\u0627\u0645\u064A\u061F</label>
                                    <select id="topics-new-required" class="form-input">
                                        <option value="yes" selected>\u0646\u0639\u0645</option>
                                        <option value="no">\u0644\u0627</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                                <textarea id="topics-new-notes" class="form-input" rows="3" placeholder="\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0623\u0648 \u0623\u0647\u062F\u0627\u0641\u0647"></textarea>
                            </div>
                            
                            <div class="flex justify-end">
                                <button type="submit" class="btn-primary">
                                    <i class="fas fa-plus ml-2"></i>
                                    \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0636\u0648\u0639
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(e);const a=()=>e.remove();e.querySelector(".modal-close")?.addEventListener("click",a),e.querySelector('[data-action="close"]')?.addEventListener("click",a),e.addEventListener("click",r=>{r.target===e&&a()});const i=e.querySelector("#topics-position-select"),n=e.querySelector("#topics-manager-content"),s=()=>{const r=i?.value;n.innerHTML=this.renderTrainingTopicsManagerContent(r),n.querySelectorAll('[data-action="delete-topic"]').forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-topic");this.removeTrainingTopic(r,l),s(),this.refreshTrainingMatrix()})})};i?.addEventListener("change",s),s(),e.querySelector("#topics-add-form")?.addEventListener("submit",r=>{r.preventDefault();const o=i?.value;if(!o){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u0623\u0648\u0644\u0627\u064B");return}const l=e.querySelector("#topics-new-name")?.value.trim(),d=e.querySelector("#topics-new-frequency")?.value||"\u0633\u0646\u0648\u064A",c=parseFloat(e.querySelector("#topics-new-hours")?.value||"0"),p=e.querySelector("#topics-new-required")?.value==="yes",g=e.querySelector("#topics-new-notes")?.value.trim();if(!l){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A");return}this.saveTrainingTopic(o,{topic:l,frequency:d,required:p,recommendedHours:c>0?c:"",notes:g,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}),e.querySelector("#topics-new-name").value="",e.querySelector("#topics-new-hours").value="",e.querySelector("#topics-new-notes").value="",s(),this.refreshTrainingMatrix()})},renderTrainingTopicsManagerContent(t){if(!t)return'<div class="text-center text-gray-500 py-6">\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0648\u0638\u064A\u0641\u0629 \u0644\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647\u0627.</div>';const e=this.getRequiredTopicsForPosition(t);return e.length?`
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0645\u0648\u0636\u0648\u0639</th>
                            <th>\u0627\u0644\u062A\u0643\u0631\u0627\u0631</th>
                            <th>\u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647\u0627</th>
                            <th>\u0625\u0644\u0632\u0627\u0645\u064A</th>
                            <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(a=>`
                            <tr>
                                <td>${Utils.escapeHTML(a.topic||"")}</td>
                                <td>${Utils.escapeHTML(a.frequency||"\u0633\u0646\u0648\u064A")}</td>
                                <td>${a.recommendedHours?`${a.recommendedHours} \u0633\u0627\u0639\u0629`:"\u2014"}</td>
                                <td>
                                    <span class="badge ${a.required?"badge-success":"badge-secondary"}">
                                        ${a.required?"\u0625\u0644\u0632\u0627\u0645\u064A":"\u0627\u062E\u062A\u064A\u0627\u0631\u064A"}
                                    </span>
                                </td>
                                <td>${Utils.escapeHTML(a.notes||"")}</td>
                                <td>
                                    <button class="btn-icon btn-icon-danger" data-action="delete-topic" data-topic="${Utils.escapeHTML(a.topic||"")}" title="\u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0636\u0648\u0639">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `:`
                <div class="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
                    \u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0645\u062D\u062F\u062F\u0629 \u0645\u0633\u0628\u0642\u0627\u064B \u0644\u0647\u0630\u0647 \u0627\u0644\u0648\u0638\u064A\u0641\u0629. \u064A\u0645\u0643\u0646\u0643 \u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0636\u0648\u0639 \u062C\u062F\u064A\u062F \u0645\u0646 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0623\u062F\u0646\u0627\u0647.
                </div>
            `},saveTrainingTopic(t,e){if(this.ensureData(),!t||!e?.topic)return;AppState.appData.trainingTopicsByRole[t]||(AppState.appData.trainingTopicsByRole[t]=[]);const a=AppState.appData.trainingTopicsByRole[t];if(a.some(n=>(n.topic||"").toLowerCase()===e.topic.toLowerCase())){Notification.warning("\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0645\u0633\u062C\u0644 \u0628\u0627\u0644\u0641\u0639\u0644 \u0644\u0647\u0630\u0647 \u0627\u0644\u0648\u0638\u064A\u0641\u0629");return}a.push(e),AppState.appData.trainingTopicsByRole[t]=a,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0644\u0644\u0648\u0638\u064A\u0641\u0629")},removeTrainingTopic(t,e){if(this.ensureData(),!t||!e)return;const a=AppState.appData.trainingTopicsByRole[t]||[];AppState.appData.trainingTopicsByRole[t]=a.filter(i=>(i.topic||"").toLowerCase()!==e.toLowerCase()),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A")},formatTime(t,e=!1){const a=e?"":"\u2014";if(!t||t==="\u2014"||t==="-"||t===""||t==="null"||t==="undefined"||t==="Invalid Date")return a;const i=String(t).trim();if(!i||i==="null"||i==="undefined")return a;if(/^\d{1,2}:\d{2}(:\d{2})?$/.test(i)){const r=i.split(":"),o=parseInt(r[0],10),l=parseInt(r[1],10);if(o>=0&&o<=23&&l>=0&&l<=59)return`${o.toString().padStart(2,"0")}:${l.toString().padStart(2,"0")}`}const n=parseFloat(i);if(!isNaN(n)&&n>=0&&n<1){const r=Math.round(n*24*60),o=Math.floor(r/60),l=r%60;return`${o.toString().padStart(2,"0")}:${l.toString().padStart(2,"0")}`}if(/^1899-12-3[01]|^1900-01-0[01]/.test(i))return a;const s=i.match(/T?(\d{1,2}):(\d{2})(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})?$/);if(s){const r=parseInt(s[1],10),o=parseInt(s[2],10);if(r>=0&&r<=23&&o>=0&&o<=59)return`${r.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}`}try{const r=new Date(t);if(!isNaN(r.getTime())){const o=r.getFullYear();if(o>=1900&&o<=1901)return a;const l=r.getHours(),d=r.getMinutes();if(l>=0&&l<=23&&d>=0&&d<=59)return`${l.toString().padStart(2,"0")}:${d.toString().padStart(2,"0")}`}}catch{}return a},_uniqSortedLabels(t){return Array.from(new Set((t||[]).map(e=>String(e||"").replace(/\s+/g," ").trim()).filter(Boolean))).sort((e,a)=>e.localeCompare(a,"ar",{sensitivity:"base"}))},_preferRegistryRecord(t,e){const a=n=>/tmp/i.test(String(n?.id||""));if(a(t)&&!a(e))return e;if(a(e)&&!a(t))return t;const i=n=>Object.keys(n||{}).filter(s=>n[s]!=null&&String(n[s]).trim()!=="").length;return i(e)>i(t)?e:t},_registryContentKey(t){const e=String(t?.date||t?.attendanceDate||"").slice(0,10),a=String(t?.contractorId||t?.contractorName||t?.employeeCode||t?.employeeName||"").replace(/\s+/g," ").trim().toLowerCase(),i=String(t?.topic||t?.subject||"").replace(/\s+/g," ").trim().toLowerCase(),n=String(t?.startTime||t?.trainer||t?.trainerName||"").replace(/\s+/g," ").trim().toLowerCase();return`${e}|${a}|${i}|${n}`},_dedupeRegistryRecords(t){const e=(Array.isArray(t)?t:[]).filter(r=>r&&typeof r=="object"),a=new Map,i=[];e.forEach(r=>{const o=String(r.id||"").trim();if(!o){i.push(r);return}const l=a.get(o);a.set(o,l?this._preferRegistryRecord(l,r):r)});const n=new Map,s=r=>{const o=this._registryContentKey(r),l=String(r.id||"").trim(),d=!o||o==="|||"?`id:${l||Math.random()}`:o,c=n.get(d);n.set(d,c?this._preferRegistryRecord(c,r):r)};return a.forEach(r=>s(r)),i.forEach(r=>s(r)),Array.from(n.values())},_fillDatalist(t,e){const a=document.getElementById(t);a&&(a.innerHTML=this._uniqSortedLabels(e).slice(0,400).map(i=>`<option value="${Utils.escapeHTML(i)}"></option>`).join(""))},_debounceRegistryFilter(t,e=160){clearTimeout(this._registryFilterTimer),this._registryFilterTimer=setTimeout(t,e)},_trainingDateKey(t){if(!t)return"";const a=String(t).trim().match(/^(\d{4}-\d{2}-\d{2})/);if(a)return a[1];const i=new Date(t);if(Number.isNaN(i.getTime()))return"";const n=i.getFullYear(),s=String(i.getMonth()+1).padStart(2,"0"),r=String(i.getDate()).padStart(2,"0");return`${n}-${s}-${r}`},_fillContractorRegistryFilters(t){this._fillDatalist("contractor-filter-contractor-list",t.map(e=>e.contractorName||e.contractor||"")),this._fillDatalist("contractor-filter-topic-list",t.map(e=>e.topic||e.subject||"")),this._fillDatalist("contractor-filter-trainer-list",t.map(e=>e.trainer||e.conductedBy||"")),this._fillDatalist("contractor-filter-location-list",t.map(e=>e.location||""))},_fillAttendanceRegistryFilters(t){this._fillDatalist("attendance-filter-employee-list",t.flatMap(e=>[e.employeeName||e.employee||"",e.employeeCode||""])),this._fillDatalist("attendance-filter-topic-list",t.map(e=>e.topic||"")),this._fillDatalist("attendance-filter-department-list",t.map(e=>e.department||"")),this._fillDatalist("attendance-filter-factory-list",t.map(e=>e.factoryName||e.factory||"")),this._fillDatalist("attendance-filter-trainer-list",t.map(e=>e.trainer||e.trainerName||e.conductedBy||""))},async renderContractorTrainingSection(){this.ensureData();const t=this._dedupeRegistryRecords(AppState.appData.contractorTrainings||[]);if(Array.isArray(AppState.appData.contractorTrainings)&&t.length!==AppState.appData.contractorTrainings.length){AppState.appData.contractorTrainings=t;try{window.DataManager?.save?.()}catch{}}const e=this.getContractorOptions(),a=new Map(e.map(n=>[String(n?.id??"").trim(),n.name||""]));return a.size===0&&(AppState.appData.contractors||[]).filter(s=>s&&s.isActive!=="inactive"&&s.isActive!==!1&&s.isActive!=="false"&&s.isActive!=="FALSE").forEach(s=>{s?.id&&a.set(String(s.id).trim(),s.name||s.company||s.contractorName||"")}),`
            <div id="contractor-training-list" class="table-wrapper" style="max-height: 600px; overflow: auto; position: relative; border: 1px solid #e5e7eb; border-radius: 8px;">
                <table class="data-table" style="border-collapse: separate; border-spacing: 0;">
                    <thead style="position: sticky; top: 0; z-index: 10;">
                        <tr style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0634\u0631\u0643\u0629</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0639\u062F\u062F \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0645\u0646 \u0627\u0644\u0633\u0627\u0639\u0629</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0625\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0627\u0644\u0645\u062F\u0629 (\u062F\u0642\u0627\u0626\u0642)</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                            <th style="position: sticky; top: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-weight: 600; padding: 12px 8px; border-bottom: 2px solid #1e40af; white-space: nowrap;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.length?t.slice().sort((n,s)=>new Date(s.date||s.createdAt||0)-new Date(n.date||n.createdAt||0)).map(n=>{const s=String(n.contractorId||"").trim(),r=String(n.contractorName||"").replace(/\s+/g," ").trim(),l=r&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(r)?r:a.get(s)||r||"\u2014",d=this._trainingDateKey(n.date||n.trainingDate||n.createdAt),c=d?Utils.formatDate(d):"\u2014",p=Utils.escapeHTML(n.trainer||n.conductedBy||"\u2014"),g=Utils.escapeHTML(n.topic||n.subject||"\u2014"),f=Utils.escapeHTML(n.location||"\u2014"),m=Utils.escapeHTML(n.subLocation||n.subSite||"\u2014"),u=Number(n.traineesCount||n.attendees||0),y=Number(n.durationMinutes||n.trainingMinutes||0),x=parseFloat(n.totalHours||n.trainingHours||0),h=this.cleanTime(n.startTime||n.fromTime||n.timeFrom)||"\u2014",k=this.cleanTime(n.endTime||n.toTime||n.timeTo)||"\u2014",A=Utils.escapeHTML(n.notes||""),b=[l,n.contractorId||"",g,p,f,m,c,h,k,A].join(" ").toLowerCase();return`
                        <tr data-training-id="${Utils.escapeHTML(n.id||"")}" data-date="${Utils.escapeHTML(d)}" data-search="${Utils.escapeHTML(b)}" data-contractor="${Utils.escapeHTML(String(l).toLowerCase())}" data-topic="${Utils.escapeHTML(String(n.topic||n.subject||"").toLowerCase())}" data-trainer="${Utils.escapeHTML(String(n.trainer||n.conductedBy||"").toLowerCase())}" data-location="${Utils.escapeHTML(String(n.location||"").toLowerCase())}">
                            <td>${c}</td>
                            <td>${g}</td>
                            <td>${p}</td>
                            <td>${Utils.escapeHTML(l)}</td>
                            <td class="text-center">
                                <span class="badge badge-info">${u}</span>
                            </td>
                            <td class="text-center">${h}</td>
                            <td class="text-center">${k}</td>
                            <td class="text-center">${y>0?y:"\u2014"}</td>
                            <td class="text-center">${x>0?x.toFixed(2):"\u2014"}</td>
                            <td>${f}</td>
                            <td>${m}</td>
                            <td>${A||'<span class="text-gray-400 text-xs">\u2014</span>'}</td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button onclick="Training.viewContractorTraining('${n.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="Training.editContractorTraining('${n.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="Training.deleteContractorTraining('${n.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `}).join(""):'<tr><td colspan="13" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646.</td></tr>'}
                    </tbody>
                </table>
            </div>
            <style>
                #contractor-training-list::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                #contractor-training-list::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 4px;
                }
                #contractor-training-list::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
                    border-radius: 4px;
                }
                #contractor-training-list::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
                }
                #contractor-training-list::-webkit-scrollbar-corner {
                    background: #f1f5f9;
                }
            </style>
        `},async refreshContractorTrainingList(){const t=document.getElementById("contractor-training-container");if(!t)return;const e=this._dedupeRegistryRecords(AppState.appData.contractorTrainings||[]);t.innerHTML=await this.renderContractorTrainingSection(),this._fillContractorRegistryFilters(e),this.filterContractorTraining()},filterContractorTraining(){const t=(document.getElementById("contractor-training-search")?.value||"").trim().toLowerCase(),e=(document.getElementById("contractor-filter-contractor")?.value||"").trim().toLowerCase(),a=(document.getElementById("contractor-filter-topic")?.value||"").trim().toLowerCase(),i=(document.getElementById("contractor-filter-trainer")?.value||"").trim().toLowerCase(),n=(document.getElementById("contractor-filter-location")?.value||"").trim().toLowerCase(),s=document.getElementById("contractor-filter-date-from")?.value||"",r=document.getElementById("contractor-filter-date-to")?.value||"",o=document.querySelectorAll("#contractor-training-container tbody tr[data-training-id]");let l=0;o.forEach(c=>{const p=c.getAttribute("data-search")||"",g=!t||p.includes(t),f=!e||(c.getAttribute("data-contractor")||"").includes(e),m=!a||(c.getAttribute("data-topic")||"").includes(a),u=!i||(c.getAttribute("data-trainer")||"").includes(i),y=!n||(c.getAttribute("data-location")||"").includes(n),x=c.getAttribute("data-date")||"",h=!s||!!x&&x>=s,k=!r||!!x&&x<=r,A=g&&f&&m&&u&&y&&h&&k;c.style.display=A?"":"none",A&&(l+=1)});const d=document.getElementById("contractor-registry-count");d&&(d.textContent=o.length?`\u0639\u0631\u0636 ${l} \u0645\u0646 ${o.length}`:"")},getContractorOptions(){if(this.ensureData(),typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function")return Contractors.getContractorOptionsForModules({includeSuppliers:!0});const t=o=>(o??"").toString().trim(),e=o=>t(o).toUpperCase(),a=o=>t(o),i=o=>t(o).toLowerCase(),n=[...AppState.appData.approvedContractors||[],...AppState.appData.contractors||[]].filter(o=>o&&o.isActive!=="inactive"&&o.isActive!==!1&&o.isActive!=="false"&&o.isActive!=="FALSE"),s=new Map,r=o=>{const l=e(o.code||o.isoCode);if(/^CON-\d+$/i.test(l))return`CODE:${l}`;const d=a(o.licenseNumber||o.contractNumber);if(d)return`LIC:${d}`;const c=t(o.contractorId||o.id);if(c)return`ID:${c}`;const p=i(o.name||o.company||o.contractorName||o.companyName);return p?`NAME:${p}`:""};return n.forEach(o=>{if(!o)return;const l=r(o);l&&(s.has(l)||s.set(l,o))}),Array.from(s.values()).map(o=>({id:t(o.contractorId||o.id),name:t(o.name||o.company||o.contractorName||o.companyName||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"),serviceType:t(o.serviceType),licenseNumber:t(o.licenseNumber||o.contractNumber),code:t(o.code||o.isoCode),entityType:(o.entityType||"contractor").toString(),approvedEntityId:o.approvedEntityId||null})).filter(o=>o.name&&(o.entityType||"contractor")==="contractor").sort((o,l)=>(o.name||"").localeCompare(l.name||"","ar",{sensitivity:"base"}))},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(t=>({id:t.id,name:t.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(t=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((t,e)=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||`\u0645\u0648\u0642\u0639 ${e+1}`})):[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t),[]}},refreshSiteDropdowns(){try{const t=this.getSiteOptions(),e=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:n=>String(n??""),a=n=>'<option value="">'+(n||"\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")+"</option>"+(t||[]).map(s=>'<option value="'+e(s.id)+'">'+e(s.name)+"</option>").join("");["training-factory","attendance-registry-filter-factory","attendance-analytics-factory"].forEach(n=>{const s=document.getElementById(n);if(s&&s.tagName==="SELECT"){const r=s.value;s.innerHTML=a(n==="attendance-analytics-factory"?"":n==="attendance-registry-filter-factory"?"\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u0646\u0639":"\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639"),r&&(s.value=r)}})}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Training.refreshSiteDropdowns:",t)}},getPlaceOptions(t){try{if(!t)return[];if(!this.getSiteOptions().find(i=>i.id===t))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const i=Permissions.formSettingsState.sites.find(n=>n.id===t);if(i&&Array.isArray(i.places))return i.places.map(n=>({id:n.id,name:n.name}))}if(Array.isArray(AppState.appData?.observationSites)){const i=AppState.appData.observationSites.find(n=>(n.id||n.siteId)===t);if(i)return(Array.isArray(i.places)?i.places:Array.isArray(i.locations)?i.locations:Array.isArray(i.children)?i.children:Array.isArray(i.areas)?i.areas:[]).map((s,r)=>({id:s.id||s.placeId||s.value||Utils.generateId("PLACE"),name:s.name||s.placeName||s.title||s.label||s.locationName||`\u0645\u0643\u0627\u0646 ${r+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const i=DailyObservations.DEFAULT_SITES.find(n=>(n.id||n.siteId)===t);if(i)return(Array.isArray(i.places)?i.places:Array.isArray(i.locations)?i.locations:Array.isArray(i.children)?i.children:Array.isArray(i.areas)?i.areas:[]).map((s,r)=>({id:s.id||s.placeId||s.value||Utils.generateId("PLACE"),name:s.name||s.placeName||s.title||s.label||s.locationName||`\u0645\u0643\u0627\u0646 ${r+1}`}))}return[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",e),[]}},getPlaceName(t,e){try{if(!t)return"";if(typeof t=="string"&&!t.startsWith("PLACE_"))return t;if(e){const n=this.getPlaceOptions(e).find(s=>s.id===t);if(n&&n.name)return n.name}const a=this.getSiteOptions();for(const i of a){const s=this.getPlaceOptions(i.id).find(r=>r.id===t);if(s&&s.name)return s.name}return t}catch(a){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u0627\u0646:",a),t}},getSafetyTeamOptions(){try{if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.safetyTeam)return Array.isArray(Permissions.formSettingsState.safetyTeam)?Permissions.formSettingsState.safetyTeam.filter(Boolean):[];const t=AppState.companySettings||{};return Array.isArray(t.safetyTeam)?t.safetyTeam.filter(Boolean):Array.isArray(t.safetyTeamMembers)?t.safetyTeamMembers.filter(Boolean):typeof t.safetyTeam=="string"?t.safetyTeam.split(/\n|,/).map(e=>e.trim()).filter(Boolean):Array.isArray(AppState.appData?.safetyTeam)?AppState.appData.safetyTeam.map(e=>typeof e=="string"?e:e.name||e.fullName||"").filter(Boolean):[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629:",t),[]}},resolveSafetyTrainerDisplayName(t){if(!t)return"";const e=String(t.fullName||"").trim(),a=String(t.name||"").trim(),i=String(t.username||"").trim().toLowerCase(),n=String(t.email||"").trim(),s=r=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(r||"").trim());if(e)return e;if(a&&s(a))return"";if(a&&i&&a.toLowerCase()===i){const r=(AppState.appData?.employees||[]).find(o=>String(o.email||"").toLowerCase()===n.toLowerCase());return r?String(r.name||r.fullName||"").trim():""}if(a)return a;if(n){const r=(AppState.appData?.employees||[]).find(o=>String(o.email||"").toLowerCase()===n.toLowerCase());if(r)return String(r.name||r.fullName||"").trim()}return""},getSafetyTeamMembers(t){const a=(t&&typeof t=="object"?t:{}).excludeSystemUsers===!0,i=new Map,n=o=>{if(typeof EmployeeHelper<"u"&&typeof EmployeeHelper.isResignedEmployee=="function")return EmployeeHelper.isResignedEmployee(o);const l=String(o?.status||o?.employeeStatus||o?.workStatus||o?.employmentStatus||"").toLowerCase();return l.includes("\u0645\u0633\u062A\u0642\u064A\u0644")||l.includes("\u0627\u0633\u062A\u0642\u0627\u0644")||l.includes("resign")||l.includes("terminated")},s=o=>{const l=String(o||"").trim();if(!l)return"";if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)){const d=(AppState.appData?.employees||[]).find(c=>String(c.email||"").toLowerCase()===l.toLowerCase());return d&&n(d)?"":d?String(d.name||d.fullName||"").trim():""}return l},r=AppState.companySettings?.safetyTeam||AppState.companySettings?.safetyTeamMembers;return Array.isArray(r)?r.forEach((o,l)=>{const d=s(o?.name||o);d&&i.set(d,{id:`settings-${l}`,name:d})}):typeof r=="string"&&r.split(/\n|,/).forEach((o,l)=>{const d=s(o);d&&i.set(d,{id:`settings-${l}`,name:d})}),a||(AppState.appData.users||[]).forEach(o=>{const l=(o.role||"").toLowerCase();if(!(l.includes("safety")||l.includes("hse")||l.includes("\u0633\u0644\u0627\u0645\u0629")))return;const c=this.resolveSafetyTrainerDisplayName(o);c&&i.set(c,{id:o.id||o.email||c,name:c})}),(AppState.appData.employees||[]).forEach(o=>{if(n(o))return;const l=(o.department||"").toLowerCase(),d=(o.position||o.jobTitle||"").toLowerCase();if(l.includes("\u0633\u0644\u0627\u0645\u0629")||l.includes("hse")||d.includes("\u0633\u0644\u0627\u0645\u0629")||d.includes("hse")){const p=o.name||o.fullName||"";p&&i.set(p,{id:o.id||o.employeeNumber||p,name:p})}}),Array.from(i.values()).sort((o,l)=>o.name.localeCompare(l.name,"ar"))},openContractorTrainingForm(t=null){this.ensureData();const e=this.getContractorOptions(),a=new Map(e.map(v=>[String(v?.id??"").trim(),v.name||""])),i=AppState.appData.contractorTrainings||[],n=t?i.find(v=>v.id===t):null,s=e.length>0,r=n?.date?new Date(n.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),o=n&&this.cleanTime(n.startTime||n.fromTime||n.timeFrom)||"",l=n&&this.cleanTime(n.endTime||n.toTime||n.timeTo)||"",d=n?.contractorId?String(n.contractorId).trim():"",c=n?.contractorName?String(n.contractorName).trim():"",p=typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"?Contractors.getAllContractorsForModules():e;let g="";if(n){if(d)if(e.find($=>String($?.id??"").trim()===d))g=d;else{const $=p.find(M=>(Array.isArray(M.aliasIds)?M.aliasIds:[]).includes(d)||String(M.approvedEntityId??"").trim()===d);if($){const M=e.find(N=>String(N?.name??"").trim()===String($.name??"").trim());M&&(g=String(M?.id??"").trim())}if(!g&&c){const M=e.find(N=>String(N?.name??"").trim()===c);M&&(g=String(M?.id??"").trim())}if(!g){const M=e.find(N=>String(N?.name??"").trim()===d);M&&(g=String(M?.id??"").trim())}}else if(c){const v=e.find($=>String($?.name??"").trim()===c);v&&(g=String(v?.id??"").trim())}}const f=document.createElement("div");if(f.className="modal-overlay",f.innerHTML=`
            <div class="modal-content" style="max-width: 800px; max-height: 90vh; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 25px; border-bottom: none; flex-shrink: 0; position: relative;">
                    <h2 class="modal-title" style="color: white; font-size: 1.35rem; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; margin: 0;">
                        <i class="fas fa-briefcase"></i>
                        ${n?"\u062A\u0639\u062F\u064A\u0644 \u062A\u062F\u0631\u064A\u0628 \u0645\u0642\u0627\u0648\u0644":"\u062A\u0633\u062C\u064A\u0644 \u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"}
                    </h2>
                    <button type="button" class="modal-close" title="\u0625\u063A\u0644\u0627\u0642" style="color: white; font-size: 1.3rem; opacity: 0.9; transition: all 0.2s; border-radius: 8px; padding: 8px 12px; position: absolute; left: 15px; top: 50%; transform: translateY(-50%);" onmouseover="this.style.opacity='1'; this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.opacity='0.9'; this.style.background='transparent'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="contractor-training-form" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
                    <div class="modal-body space-y-5" id="contractor-training-form-body" style="background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%); padding: 25px; flex: 1; overflow-y: auto; scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: #667eea #e0e7ff;">
                        <style>
                            #contractor-training-form-body::-webkit-scrollbar { width: 8px; }
                            #contractor-training-form-body::-webkit-scrollbar-track { background: #e0e7ff; border-radius: 10px; }
                            #contractor-training-form-body::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #667eea, #764ba2); border-radius: 10px; }
                            #contractor-training-form-body::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #5a6fd6, #6a4190); }
                        </style>
                        ${s?"":`
                            <div class="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 text-sm text-yellow-800" style="box-shadow: 0 4px 12px rgba(251, 191, 36, 0.15);">
                                <i class="fas fa-exclamation-triangle ml-2"></i>
                                \u0644\u0627 \u062A\u0648\u062C\u062F \u062C\u0647\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 \u062D\u0627\u0644\u064A\u0627\u064B. \u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0623\u0648 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 \u062E\u0644\u0627\u0644 \u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0644\u064A\u0638\u0647\u0631\u0648\u0627 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0642\u0627\u0626\u0645\u0629.
                            </div>
                        `}
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 -->
                        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.08); border: 1px solid #e0e7ff;">
                            <h3 style="color: #667eea; font-size: 0.95rem; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; padding-bottom: 10px; border-bottom: 2px solid #e0e7ff;">
                                <i class="fas fa-info-circle"></i> \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold mb-2" style="color: #4c5c96; display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-calendar-alt" style="color: #667eea;"></i> \u0627\u0644\u062A\u0627\u0631\u064A\u062E <span style="color: #ef4444;">*</span>
                                    </label>
                                    <input type="date" id="contractor-training-date" class="form-input" required value="${r}" style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold mb-2" style="color: #4c5c96; display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-book" style="color: #667eea;"></i> \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A <span style="color: #ef4444;">*</span>
                                    </label>
                                    <input type="text" id="contractor-training-topic" class="form-input" required placeholder="\u0645\u062B\u0627\u0644: \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0633\u0644\u0627\u0645\u0629" value="${Utils.escapeHTML(n?.topic||n?.subject||"")}" style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold mb-2" style="color: #4c5c96; display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-chalkboard-teacher" style="color: #667eea;"></i> \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628 <span style="color: #ef4444;">*</span>
                                    </label>
                                    <select id="contractor-training-trainer" class="form-input" required style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628</option>
                                        ${this.getSafetyTeamMembers({excludeSystemUsers:!0}).map(v=>`
                                            <option value="${Utils.escapeHTML(v.name)}" ${n&&(n.trainer===v.name||n.conductedBy===v.name)?"selected":""}>
                                                ${Utils.escapeHTML(v.name)}
                                            </option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold mb-2" style="color: #4c5c96; display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-building" style="color: #667eea;"></i> \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0634\u0631\u0643\u0629 <span style="color: #ef4444;">*</span>
                                    </label>
                                    <select id="contractor-training-contractor" class="form-input" required ${s?"":"disabled"} style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</option>
                                        ${e.map(v=>{const $=String(v?.id??"").trim(),M=g!==""&&$!==""&&$===g;return`
                                                <option value="${Utils.escapeHTML($)}" ${M?"selected":""}>
                                                    ${Utils.escapeHTML(v.name||"\u0628\u062F\u0648\u0646 \u0627\u0633\u0645")}
                                                </option>
                                            `}).join("")}
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u0648\u0642\u062A \u0648\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 -->
                        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.08); border: 1px solid #e0e7ff;">
                            <h3 style="color: #667eea; font-size: 0.95rem; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; padding-bottom: 10px; border-bottom: 2px solid #e0e7ff;">
                                <i class="fas fa-clock"></i> \u0627\u0644\u0648\u0642\u062A \u0648\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold mb-2" style="color: #4c5c96; display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-users" style="color: #667eea;"></i> \u0639\u062F\u062F \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 <span style="color: #ef4444;">*</span>
                                    </label>
                                    <input type="number" id="contractor-training-trainees" class="form-input" required min="1" value="${n?.traineesCount||n?.attendees||10}" style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">
                                </div>
                                <div style="display: flex; gap: 12px;">
                                    <div style="flex: 1;">
                                        <label class="block text-sm font-semibold mb-2" style="color: #4c5c96; display: flex; align-items: center; gap: 5px;">
                                            <i class="fas fa-play" style="color: #10b981;"></i> \u0645\u0646 <span style="color: #ef4444;">*</span>
                                        </label>
                                        <input type="time" id="contractor-training-from-time" class="form-input" required value="${o||"09:00"}" style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">
                                    </div>
                                    <div style="flex: 1;">
                                        <label class="block text-sm font-semibold mb-2" style="color: #4c5c96; display: flex; align-items: center; gap: 5px;">
                                            <i class="fas fa-stop" style="color: #ef4444;"></i> \u0625\u0644\u0649 <span style="color: #ef4444;">*</span>
                                        </label>
                                        <input type="time" id="contractor-training-to-time" class="form-input" required value="${l||"10:00"}" style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold mb-2" style="color: #9ca3af; display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-hourglass-half" style="color: #9ca3af;"></i> \u0648\u0642\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u062F\u0642\u0627\u0626\u0642)
                                    </label>
                                    <input type="number" id="contractor-training-duration" class="form-input" min="0" step="5" value="${n?.durationMinutes||n?.trainingMinutes||60}" readonly style="border: 2px solid #e5e7eb; border-radius: 10px; background: linear-gradient(180deg, #f9fafb, #f3f4f6); cursor: not-allowed; padding: 10px 12px; color: #6b7280;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold mb-2" style="color: #9ca3af; display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-calculator" style="color: #9ca3af;"></i> \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A
                                    </label>
                                    <input type="number" id="contractor-training-hours" class="form-input" min="0" step="0.25" value="${n?.totalHours||n?.trainingHours||""}" readonly style="border: 2px solid #e5e7eb; border-radius: 10px; background: linear-gradient(180deg, #f9fafb, #f3f4f6); cursor: not-allowed; padding: 10px 12px; color: #6b7280;">
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 -->
                        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.08); border: 1px solid #e0e7ff;">
                            <h3 style="color: #667eea; font-size: 0.95rem; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; padding-bottom: 10px; border-bottom: 2px solid #e0e7ff;">
                                <i class="fas fa-map-marker-alt"></i> \u0627\u0644\u0645\u0648\u0642\u0639
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold mb-2" style="color: #4c5c96; display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-map-marker-alt" style="color: #667eea;"></i> \u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u0627\u0644\u0645\u0648\u0642\u0639) <span style="color: #ef4444;">*</span>
                                    </label>
                                    <select id="contractor-training-location" class="form-input" required style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639</option>
                                        ${this.getSiteOptions().map(v=>`
                                            <option value="${Utils.escapeHTML(v.id)}" ${n&&(n.locationId===v.id||n.locationId===String(v.id))?"selected":""}>
                                                ${Utils.escapeHTML(v.name)}
                                            </option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold mb-2" style="color: #4c5c96; display: flex; align-items: center; gap: 5px;">
                                        <i class="fas fa-map-pin" style="color: #667eea;"></i> \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A <span style="color: #ef4444;">*</span>
                                    </label>
                                    <select id="contractor-training-sub-location" class="form-input" required style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                        ${this.getPlaceOptions(n?.locationId||n?.location||"").map(v=>`
                                            <option value="${Utils.escapeHTML(v.id)}" ${n&&(n.subLocationId===v.id||n.subLocationId===String(v.id))?"selected":""}>
                                                ${Utils.escapeHTML(v.name)}
                                            </option>
                                        `).join("")}
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u0642\u0633\u0645 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A -->
                        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.08); border: 1px solid #e0e7ff;">
                            <h3 style="color: #667eea; font-size: 0.95rem; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; padding-bottom: 10px; border-bottom: 2px solid #e0e7ff;">
                                <i class="fas fa-sticky-note"></i> \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629
                            </h3>
                            <div>
                                <textarea id="contractor-training-notes" class="form-input" rows="3" placeholder="\u0623\u0636\u0641 \u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u0647\u0646\u0627..." style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 12px; resize: vertical; min-height: 80px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">${Utils.escapeHTML(n?.notes||"")}</textarea>
                            </div>
                        </div>
                        
                        <!-- \u0645\u0624\u0634\u0631 \u0627\u0644\u062A\u0645\u0631\u064A\u0631 -->
                        <div id="contractor-training-scroll-indicator" style="text-align: center; padding: 8px; color: #9ca3af; font-size: 0.8rem; display: none;">
                            <i class="fas fa-chevron-down animate-bounce"></i> \u0645\u0631\u0631 \u0644\u0644\u0623\u0633\u0641\u0644 \u0644\u0631\u0624\u064A\u0629 \u0627\u0644\u0645\u0632\u064A\u062F
                        </div>
                    </div>
                    <div class="modal-footer form-actions-centered" style="background: linear-gradient(180deg, #ffffff, #f8f9fa); padding: 18px 25px; border-top: 1px solid #e0e7ff; gap: 15px; flex-shrink: 0; box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);">
                        <button type="button" class="btn-secondary" data-action="close" style="padding: 12px 28px; border-radius: 10px; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); border: 2px solid #e5e7eb;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0, 0, 0, 0.12)'; this.style.borderColor='#d1d5db'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.08)'; this.style.borderColor='#e5e7eb'">
                            <i class="fas fa-times ml-2"></i>\u0625\u0644\u063A\u0627\u0621
                        </button>
                        <button type="submit" class="btn-primary" ${s?"":"disabled"} style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; padding: 12px 28px; border-radius: 10px; font-weight: 600; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.35); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.45)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.35)'">
                            <i class="fas fa-save ml-2"></i>
                            ${n?"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644":"\u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(f),g!==""){const v=f.querySelector("#contractor-training-contractor");v&&v.value!==g&&(v.value=g)}let m=!1,u=null;const y=v=>{v&&(v.preventDefault(),v.stopPropagation()),!m&&(m=!0,f&&f.parentNode&&f.remove(),u&&(document.removeEventListener("keydown",u),u=null))},x=f.querySelector(".modal-content");x&&x.addEventListener("click",v=>{v.stopPropagation()});const h=v=>{v&&(v.preventDefault(),v.stopPropagation()),y(v)},k=f.querySelector(".modal-close");k&&k.addEventListener("click",h);const A=f.querySelector('[data-action="close"]');A&&A.addEventListener("click",h),f.addEventListener("click",v=>{v.target===f&&(v.preventDefault(),v.stopPropagation(),typeof Notification<"u"&&Notification.warning?Notification.warning("\u062A\u0646\u0628\u064A\u0647: \u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0632\u0631 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 (\xD7) \u0623\u0648 \u0632\u0631 \u0625\u0644\u063A\u0627\u0621 \u0623\u0633\u0641\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C."):alert("\u062A\u0646\u0628\u064A\u0647: \u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0632\u0631 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 (\xD7) \u0623\u0648 \u0632\u0631 \u0625\u0644\u063A\u0627\u0621 \u0623\u0633\u0641\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C."))}),u=v=>{(v.key==="Escape"||v.keyCode===27)&&(v.preventDefault(),v.stopPropagation(),y(v))},document.addEventListener("keydown",u);const b=()=>{const v=f.querySelector("#contractor-training-from-time"),$=f.querySelector("#contractor-training-to-time"),M=f.querySelector("#contractor-training-duration"),N=f.querySelector("#contractor-training-trainees"),w=f.querySelector("#contractor-training-hours");if(!v||!$||!M||!N||!w)return;const C=v.value,B=$.value;if(!C||!B){M.value="",w.value="";return}const U=C.split(":"),H=B.split(":"),O=parseInt(U[0],10)*60+parseInt(U[1],10);let R=parseInt(H[0],10)*60+parseInt(H[1],10)-O;R<0&&(R=1440+R),M.value=R>0?R:"";const P=parseInt(N.value||"0",10);if(Number.isFinite(P)&&P>0&&R>0){const z=Number((P*R/60).toFixed(2));w.value=z>0?z.toFixed(2):""}else w.value=""},E=f.querySelector("#contractor-training-from-time"),T=f.querySelector("#contractor-training-to-time"),L=f.querySelector("#contractor-training-trainees");E&&(E.addEventListener("change",b),E.addEventListener("input",b)),T&&(T.addEventListener("change",b),T.addEventListener("input",b)),L&&(L.addEventListener("change",b),L.addEventListener("input",b)),setTimeout(b,100);const S=f.querySelector("#contractor-training-form-body"),F=f.querySelector("#contractor-training-scroll-indicator");if(S&&F){const v=()=>{const $=S.scrollHeight>S.clientHeight,M=S.scrollTop<S.scrollHeight-S.clientHeight-20;F.style.display=$&&M?"block":"none"};setTimeout(v,200),S.addEventListener("scroll",v),window.addEventListener("resize",v)}const D=f.querySelector("#contractor-training-location"),I=f.querySelector("#contractor-training-sub-location");if(D&&I){const v=()=>{const $=D.value;if(!$){I.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>';return}const M=this.getPlaceOptions($),N=I.value||(n?.subLocationId?String(n.subLocationId):"");I.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>',M.forEach(w=>{const C=document.createElement("option");C.value=w.id,C.textContent=w.name,(w.id===N||w.id===String(N)||n?.subLocationId&&(w.id===n.subLocationId||w.id===String(n.subLocationId)))&&(C.selected=!0),I.appendChild(C)})};D.addEventListener("change",v),n?.locationId||D.value?requestAnimationFrame(()=>{v()}):D.value&&requestAnimationFrame(()=>{v()})}f.querySelector("#contractor-training-form")?.addEventListener("submit",async v=>{v.preventDefault();const $=f.querySelector('button[type="submit"]');if($&&$.disabled)return;let M="";$&&(M=$.innerHTML,$.disabled=!0,$.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const N=f.querySelector("#contractor-training-date")?.value,w=f.querySelector("#contractor-training-topic")?.value.trim(),C=f.querySelector("#contractor-training-trainer")?.value.trim(),B=f.querySelector("#contractor-training-contractor")?.value,U=parseInt(f.querySelector("#contractor-training-trainees")?.value||"0",10),H=f.querySelector("#contractor-training-from-time")?.value||"",O=f.querySelector("#contractor-training-to-time")?.value||"",G=parseInt(f.querySelector("#contractor-training-duration")?.value||"0",10),R=f.querySelector("#contractor-training-hours"),P=R?parseFloat(R.value||"0"):0,z=f.querySelector("#contractor-training-location")?.value.trim(),K=f.querySelector("#contractor-training-sub-location")?.value.trim(),J=this.getSiteOptions().find(_=>_.id===z||String(_.id)===String(z)),tt=this.getPlaceOptions(z).find(_=>_.id===K||String(_.id)===String(K)),et=f.querySelector("#contractor-training-location"),at=f.querySelector("#contractor-training-sub-location"),rt=J?J.name:et?.options[et.selectedIndex]?.text||"",ot=tt?tt.name:at?.options[at.selectedIndex]?.text||"",lt=f.querySelector("#contractor-training-notes")?.value.trim(),W=String(B??"").trim();if(!N||!w||!C||!W||!Number.isFinite(U)||U<=0||!H||!O){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0644\u0644\u062A\u062F\u0631\u064A\u0628"),$&&($.disabled=!1,$.innerHTML=M);return}const it=f.querySelector("#contractor-training-contractor"),V=it?.options[it?.selectedIndex];let q="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(V&&V.textContent?q=V.textContent.trim():q=a.get(W)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",!q||q==="\u0628\u062F\u0648\u0646 \u0627\u0633\u0645"||q==="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"){const _=e.find(j=>String(j.id||"").trim()===W);_&&_.name?q=_.name.trim():q=a.get(W)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}let Q=new Date().toISOString();if(N){const _=N.split("-");if(_.length===3){const j=parseInt(_[0],10),ct=parseInt(_[1],10)-1,dt=parseInt(_[2],10),nt=new Date(j,ct,dt,12,0,0);isNaN(nt.getTime())||(Q=nt.toISOString())}else{const j=new Date(N);isNaN(j.getTime())||(Q=j.toISOString())}}const X={id:n?.id||Utils.generateSequentialId("CTR",AppState.appData?.contractorTrainings||[]),date:Q,topic:w,trainer:C,contractorId:W,contractorName:q,traineesCount:U,startTime:this.cleanTime(H)||H,endTime:this.cleanTime(O)||O,durationMinutes:Number.isFinite(G)&&G>0?G:"",totalHours:P>0?P:"",location:rt,locationId:z?String(z).trim():null,subLocation:ot,subLocationId:K?String(K).trim():null,notes:lt,createdAt:n?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()},Z=AppState.appData.contractorTrainings;if(n){const _=Z.findIndex(j=>j.id===n.id);_!==-1&&(Z[_]=X)}else Z.push(X);this._contractorTrainingsLocalSaveTime=Date.now(),y(),Notification.success(n?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"),setTimeout(()=>{try{typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(_){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",_)}this.refreshContractorTrainingList().catch(_=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",_)}),(async()=>{try{AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u"?n?await GoogleIntegration.sendRequest({action:"updateContractorTraining",data:{trainingId:X.id,updateData:X}}):await GoogleIntegration.sendRequest({action:"addContractorTraining",data:X}):typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("ContractorTrainings",AppState.appData.contractorTrainings)}catch(_){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 Google Sheets (\u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B):",_)}})()},0)}catch(N){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",N),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: "+N.message),$&&($.disabled=!1,$.innerHTML=M)}})},viewContractorTraining(t){this.ensureData();const a=(AppState.appData.contractorTrainings||[]).find(y=>y.id===t);if(!a){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=new Map((this.getContractorOptions()||[]).map(y=>[String(y?.id??"").trim(),y.name||""])),n=String(a.contractorId||"").trim(),s=String(a.contractorName||"").replace(/\s+/g," ").trim(),o=s&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(s)?s:i.get(n)||s||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",l=a.totalHours?parseFloat(a.totalHours).toFixed(2):"\u2014",d=a.date?Utils.formatDate(a.date):"\u2014",c=this.cleanTime(a.startTime||a.fromTime||a.timeFrom)||"\u2014",p=this.cleanTime(a.endTime||a.toTime||a.timeTo)||"\u2014",g=a.durationMinutes?`${a.durationMinutes} \u062F\u0642\u064A\u0642\u0629`:"\u2014",f=a.traineesCount?`${a.traineesCount} \u0645\u062A\u062F\u0631\u0628`:"\u2014",m=document.createElement("div");m.className="modal-overlay",m.innerHTML=`
            <div class="modal-content" style="max-width: 760px; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #ffffff; padding: 20px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); display: flex; align-items: center; justify-content: center; color: #60a5fa; font-size: 1.25rem;">
                            <i class="fas fa-hard-hat"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.25rem; font-weight: 700; margin: 0 0 4px 0; display: flex; align-items: center; gap: 8px;">
                                \u062A\u0641\u0627\u0635\u064A\u0644 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644
                            </h2>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #94a3b8;">
                                <span style="display: inline-flex; align-items: center; gap: 5px;"><i class="fas fa-building" style="color: #38bdf8;"></i> ${Utils.escapeHTML(o)}</span>
                                <span>\u2022</span>
                                <span style="display: inline-flex; align-items: center; gap: 5px;"><i class="fas fa-calendar-alt" style="color: #a78bfa;"></i> ${d}</span>
                            </div>
                        </div>
                    </div>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642" style="color: #94a3b8; font-size: 1.25rem; transition: color 0.2s;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#94a3b8'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body" style="padding: 24px; max-height: calc(85vh - 140px); overflow-y: auto; background: #f8fafc;">
                    <!-- \u0643\u0631\u0648\u062A \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629 -->
                    <div style="display: grid; grid-cols-2; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 20px;">
                        <div style="background: #ffffff; border-radius: 12px; padding: 14px; border: 1px solid #e2e8f0; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <div style="color: #64748b; font-size: 0.75rem; font-weight: 600; margin-bottom: 4px;"><i class="fas fa-users ml-1 text-blue-500"></i> \u0639\u062F\u062F \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646</div>
                            <div style="color: #0f172a; font-size: 1.15rem; font-weight: 700;">${f}</div>
                        </div>
                        <div style="background: #ffffff; border-radius: 12px; padding: 14px; border: 1px solid #e2e8f0; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <div style="color: #64748b; font-size: 0.75rem; font-weight: 600; margin-bottom: 4px;"><i class="fas fa-stopwatch ml-1 text-amber-500"></i> \u0645\u062F\u0629 \u0627\u0644\u062C\u0644\u0633\u0629</div>
                            <div style="color: #0f172a; font-size: 1.15rem; font-weight: 700;">${g}</div>
                        </div>
                        <div style="background: #ffffff; border-radius: 12px; padding: 14px; border: 1px solid #e2e8f0; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <div style="color: #64748b; font-size: 0.75rem; font-weight: 600; margin-bottom: 4px;"><i class="fas fa-business-time ml-1 text-emerald-500"></i> \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0627\u0639\u0627\u062A</div>
                            <div style="color: #0f172a; font-size: 1.15rem; font-weight: 700;">${l} <span style="font-size: 0.75rem; font-weight: normal; color: #64748b;">\u0633\u0627\u0639\u0629</span></div>
                        </div>
                        <div style="background: #ffffff; border-radius: 12px; padding: 14px; border: 1px solid #e2e8f0; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <div style="color: #64748b; font-size: 0.75rem; font-weight: 600; margin-bottom: 4px;"><i class="fas fa-clock ml-1 text-indigo-500"></i> \u0627\u0644\u062A\u0648\u0642\u064A\u062A</div>
                            <div style="color: #0f172a; font-size: 0.95rem; font-weight: 700; direction: ltr;">${c} - ${p}</div>
                        </div>
                    </div>

                    <!-- \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 -->
                    <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
                        <!-- \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062F\u0648\u0631\u0629 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644 -->
                        <div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <h3 style="font-size: 0.95rem; font-weight: 700; color: #1e293b; margin: 0 0 14px 0; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                                <i class="fas fa-info-circle text-blue-600"></i>
                                \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0645\u0648\u0642\u0639
                            </h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
                                <div>
                                    <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 2px;">\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A</div>
                                    <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a;">${Utils.escapeHTML(a.topic||"\u2014")}</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 2px;">\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0634\u0631\u0643\u0629</div>
                                    <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a;"><span class="badge" style="background: #e0f2fe; color: #0369a1; font-weight: 600; padding: 3px 8px; border-radius: 6px;">${Utils.escapeHTML(o)}</span></div>
                                </div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 2px;">\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u0627\u0644\u0645\u062F\u0631\u0628)</div>
                                    <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a;">${Utils.escapeHTML(a.trainer||"\u2014")}</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 2px;">\u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</div>
                                    <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a;">${Utils.escapeHTML(a.location||"\u2014")}</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 2px;">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</div>
                                    <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a;">${Utils.escapeHTML(a.subLocation||"\u2014")}</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 2px;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u062C\u0631\u0627\u0621</div>
                                    <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a;">${d}</div>
                                </div>
                            </div>
                        </div>

                        ${a.notes?`
                        <!-- \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A -->
                        <div style="background: #fffbeb; border-radius: 12px; border: 1px solid #fef3c7; padding: 16px;">
                            <h4 style="font-size: 0.85rem; font-weight: 700; color: #92400e; margin: 0 0 6px 0; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-sticky-note"></i>
                                \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629
                            </h4>
                            <p style="font-size: 0.9rem; color: #78350f; margin: 0; white-space: pre-wrap; line-height: 1.5;">${Utils.escapeHTML(a.notes)}</p>
                        </div>
                        `:""}
                    </div>
                </div>

                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 10px;">
                    <button type="button" class="btn-secondary" data-action="close" style="padding: 8px 18px; border-radius: 8px;">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" class="btn-primary" onclick="Training.editContractorTraining('${t}'); this.closest('.modal-overlay').remove();" style="padding: 8px 20px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
                        <i class="fas fa-edit"></i>
                        \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628
                    </button>
                </div>
            </div>
        `,document.body.appendChild(m);const u=()=>m.remove();m.querySelector(".modal-close")?.addEventListener("click",u),m.querySelector('[data-action="close"]')?.addEventListener("click",u),m.addEventListener("click",y=>{y.target===m&&u()})},editContractorTraining(t){this.openContractorTrainingForm(t)},async deleteContractorTraining(t){if(!this.isCurrentUserAdminOrManager()){Notification.error("\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062D\u0630\u0641 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u0627\u0644\u062D\u0630\u0641 \u064A\u062A\u0645 \u0628\u0637\u0644\u0628 \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637.");return}this.ensureData();const e=AppState.appData.contractorTrainings||[],a=e.find(l=>l.id===t);if(!a){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=new Map((this.getContractorOptions()||[]).map(l=>[String(l?.id??"").trim(),l.name||""])),n=String(a.contractorId||"").trim(),s=String(a.contractorName||"").replace(/\s+/g," ").trim(),o=s&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(s)?s:i.get(n)||s||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u062A\u062F\u0631\u064A\u0628 "${a.topic||""}" \u0644\u0644\u0645\u0642\u0627\u0648\u0644 "${o}"\u061F

\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627.`))try{const l=e.findIndex(d=>d.id===t);if(l!==-1){if(e.splice(l,1),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled)try{const d=AppState.appData.contractorTrainings.filter(c=>c.id!==t);await GoogleIntegration.sendRequest({action:"saveToSheet",data:{sheetName:"ContractorTrainings",data:d}})}catch(d){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 Google Sheets\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B:",d),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave?.("ContractorTrainings",AppState.appData.contractorTrainings).catch(()=>{})}else typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave?.("ContractorTrainings",AppState.appData.contractorTrainings);await this.refreshContractorTrainingList(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0628\u0646\u062C\u0627\u062D")}}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644:",l),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644: "+l.message)}},exportContractorTrainingExcel(){this.ensureData();try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0623\u0648 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629.");return}const t=this.getContractorOptions(),e=new Map(t.map(o=>[String(o?.id??"").trim(),o.name||""])),i=(AppState.appData.contractorTrainings||[]).map(o=>{const l=String(o.contractorId||"").trim(),d=String(o.contractorName||"").replace(/\s+/g," ").trim(),p=d&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(d)?d:e.get(l)||d||"",g=this.cleanTime(o.startTime||o.fromTime)||"",f=this.cleanTime(o.endTime||o.toTime)||"",m=o.durationMinutes&&!isNaN(Number(o.durationMinutes))?Number(o.durationMinutes):"",u=o.totalHours&&!isNaN(Number(o.totalHours))?parseFloat(o.totalHours).toFixed(2):"";return{\u0627\u0644\u062A\u0627\u0631\u064A\u062E:o.date?Utils.formatDate(o.date):"","\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A":o.topic||"","\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628":o.trainer||"","\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0634\u0631\u0643\u0629":p,"\u0639\u062F\u062F \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646":o.traineesCount||"","\u0645\u0646 \u0627\u0644\u0633\u0627\u0639\u0629":g,"\u0625\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629":f,"\u0648\u0642\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u062F\u0642\u0627\u0626\u0642)":m,"\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629":u,"\u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628":o.location||"","\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A":o.subLocation||"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:o.notes||""}}),n=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(i);s["!cols"]=[{wch:14},{wch:28},{wch:22},{wch:24},{wch:12},{wch:10},{wch:10},{wch:14},{wch:20},{wch:24},{wch:20},{wch:40}],XLSX.utils.book_append_sheet(n,s,"\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646");const r=`\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(n,r),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646: "+t.message)}},showContractorTrainingReportDialog(){this.ensureData();const t=this.getContractorOptions();if(t.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u062A\u0627\u062D\u064A\u0646");return}const e=new Date,a=e.getFullYear(),i=[];for(let p=0;p<24;p++){const g=new Date(a,e.getMonth()-p,1),f=g.getFullYear(),m=g.getMonth()+1,u=`${f}-${String(m).padStart(2,"0")}`,y=g.toLocaleDateString("ar-SA",{year:"numeric",month:"long"});i.push({value:u,label:y})}const n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-file-pdf ml-2"></i>
                        \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                    </h2>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-building ml-2"></i>
                            \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644
                        </label>
                        <select id="contractor-report-select" class="form-input">
                            <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</option>
                            ${t.map(p=>`
                                <option value="${Utils.escapeHTML(String(p.id??"").trim())}">
                                    ${Utils.escapeHTML(p.name||"\u0628\u062F\u0648\u0646 \u0627\u0633\u0645")}
                                </option>
                            `).join("")}
                        </select>
                        <p class="text-xs text-gray-500 mt-2">
                            <i class="fas fa-info-circle ml-1"></i>
                            \u0627\u062E\u062A\u0631 \u0645\u0642\u0627\u0648\u0644\u0627\u064B \u0645\u062D\u062F\u062F\u0627\u064B \u0644\u0639\u0631\u0636 \u062A\u0642\u0631\u064A\u0631\u0647 \u0641\u0642\u0637\u060C \u0623\u0648 \u0627\u062A\u0631\u0643\u0647 \u0641\u0627\u0631\u063A\u0627\u064B \u0644\u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                        </p>
                    </div>
                    
                    <div style="border-top: 1px solid #E5E7EB; padding-top: 16px; margin-top: 16px;">
                        <label class="block text-sm font-semibold text-gray-700 mb-3">
                            <i class="fas fa-calendar-alt ml-2"></i>
                            \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631
                        </label>
                        
                        <div class="space-y-3">
                            <div class="flex items-center">
                                <input type="radio" id="date-range-all" name="date-range-type" value="all" class="ml-2" checked>
                                <label for="date-range-all" class="text-sm text-gray-700 cursor-pointer">
                                    \u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A
                                </label>
                            </div>
                            
                            <div class="flex items-center">
                                <input type="radio" id="date-range-month" name="date-range-type" value="month" class="ml-2">
                                <label for="date-range-month" class="text-sm text-gray-700 cursor-pointer mr-2">
                                    \u0634\u0647\u0631 \u0645\u062D\u062F\u062F
                                </label>
                                <select id="contractor-report-month" class="form-input flex-1" disabled style="max-width: 300px;">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u0647\u0631</option>
                                    ${i.map(p=>`
                                        <option value="${Utils.escapeHTML(p.value)}">${Utils.escapeHTML(p.label)}</option>
                                    `).join("")}
                                </select>
                            </div>
                            
                            <div class="flex items-center">
                                <input type="radio" id="date-range-custom" name="date-range-type" value="custom" class="ml-2">
                                <label for="date-range-custom" class="text-sm text-gray-700 cursor-pointer mr-2">
                                    \u0641\u062A\u0631\u0629 \u0645\u062D\u062F\u062F\u0629
                                </label>
                                <div class="flex items-center gap-2 flex-1" style="max-width: 400px;">
                                    <input type="date" id="contractor-report-from-date" class="form-input flex-1" disabled>
                                    <span class="text-sm text-gray-600">\u0625\u0644\u0649</span>
                                    <input type="date" id="contractor-report-to-date" class="form-input flex-1" disabled>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" class="btn-primary" id="generate-contractor-report-btn">
                        <i class="fas fa-file-export ml-2"></i>
                        \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n);const s=()=>n.remove();n.querySelector(".modal-close")?.addEventListener("click",s),n.querySelector('[data-action="close"]')?.addEventListener("click",s),n.addEventListener("click",p=>{p.target===n&&s()});const r=n.querySelectorAll('input[name="date-range-type"]'),o=n.querySelector("#contractor-report-month"),l=n.querySelector("#contractor-report-from-date"),d=n.querySelector("#contractor-report-to-date"),c=()=>{const p=n.querySelector('input[name="date-range-type"]:checked')?.value||"all";p==="month"?(o.disabled=!1,o.required=!0,l.disabled=!0,l.required=!1,d.disabled=!0,d.required=!1):p==="custom"?(o.disabled=!0,o.required=!1,l.disabled=!1,l.required=!0,d.disabled=!1,d.required=!0):(o.disabled=!0,o.required=!1,l.disabled=!0,l.required=!1,d.disabled=!0,d.required=!1)};r.forEach(p=>{p.addEventListener("change",c)}),n.querySelector("#generate-contractor-report-btn")?.addEventListener("click",async()=>{const p=n.querySelector("#contractor-report-select"),g=p?.value?String(p.value).trim():"",f=g?String(p?.options?.[p.selectedIndex]?.textContent||"").replace(/\s+/g," ").trim():"",m=n.querySelector('input[name="date-range-type"]:checked')?.value||"all",u=n.querySelector("#contractor-report-month")?.value||"",y=n.querySelector("#contractor-report-from-date")?.value||"",x=n.querySelector("#contractor-report-to-date")?.value||"";if(m==="month"&&!u){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}if(m==="custom"){if(!y||!x){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0644\u0644\u0641\u062A\u0631\u0629");return}if(new Date(y)>new Date(x)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}}if(g){const h=p?.options[p?.selectedIndex];if(!h||!h.value){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0642\u0627\u0648\u0644 \u0635\u062D\u064A\u062D \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629");return}}s(),await this.generateContractorTrainingReport(g,{dateRangeType:m,month:u,fromDate:y,toDate:x},f)})},_buildTrainingAnalysisExportMonthOptionsHtml(){const t=new Date,e=t.getFullYear(),a=[];for(let i=0;i<24;i++){const n=new Date(e,t.getMonth()-i,1),s=n.getFullYear(),r=n.getMonth()+1,o=`${s}-${String(r).padStart(2,"0")}`,l=n.toLocaleDateString("ar-SA",{year:"numeric",month:"long"});a.push(`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(l)}</option>`)}return a.join("")},_readDateFilterFromTrainingExportModal(t){const e=t.querySelector('input[name="ta-modal-date-range"]:checked')?.value||"all";if(e==="all")return{type:"all",month:"",start:"",end:""};if(e==="month")return{type:"month",month:t.querySelector("#ta-modal-month")?.value?.trim()||"",start:"",end:""};const a=t.querySelector("#ta-modal-from-date")?.value?.trim()||"",i=t.querySelector("#ta-modal-to-date")?.value?.trim()||"";return{type:"range",month:"",start:a,end:i}},_refreshAnalysisExportModalLists(t,e){this.ensureData();const a=this._readDateFilterFromTrainingExportModal(t);if(e==="trainers"){const i=t.querySelector("#ta-modal-trainer-select");if(!i)return;const n=i.value;let s=Array.isArray(AppState.appData.training)?AppState.appData.training:[];s=this.filterRecordsByAnalysisDate(s,a,"training");const r=new Set;s.forEach(l=>r.add(this.getTrainingAnalysisValue("training","trainer",l)));const o=Array.from(r).filter(l=>l&&l!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").sort((l,d)=>String(l).localeCompare(String(d),"ar"));i.innerHTML='<option value="">\u2014 \u0643\u0644 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u2014</option>'+o.map(l=>`<option value="${Utils.escapeHTML(l)}">${Utils.escapeHTML(l)}</option>`).join(""),n&&o.includes(n)&&(i.value=n)}else{const i=t.querySelector("#ta-modal-department-select"),n=t.querySelector("#ta-modal-person-select");if(!n)return;const s=n.value,r=t.querySelector("#ta-modal-audience")?.value||"all";let o=Array.isArray(AppState.appData.trainingAttendance)?AppState.appData.trainingAttendance:[];if(o=this.filterRecordsByAnalysisDate(o,a,"trainingAttendance"),r==="employee"?o=o.filter(c=>!this._isAttendanceContractorLike(c)):r==="contractor"&&(o=o.filter(c=>this._isAttendanceContractorLike(c))),i){const c=i.value,p=Array.from(new Set(o.map(f=>this._attendanceRecordDepartmentLabel(f)))).sort((f,m)=>String(f).localeCompare(String(m),"ar",{sensitivity:"base"}));i.innerHTML='<option value="">\u2014 \u0643\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u2014</option>'+p.map(f=>`<option value="${Utils.escapeHTML(f)}">${Utils.escapeHTML(f)}</option>`).join(""),c&&p.includes(c)&&(i.value=c);const g=i.value||"";g&&(o=o.filter(f=>this._attendanceRecordDepartmentLabel(f)===g))}const l=new Map;o.forEach(c=>{const p=this._attendancePersonRowKey(c);if(l.has(p))return;const g=String(c.employeeCode||c.code||c.employeeNumber||"").trim(),f=String(c.employeeName||c.name||"").trim(),m=f?g?`${f} (${g})`:f:g||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";l.set(p,m)});const d=Array.from(l.entries()).sort((c,p)=>String(c[1]).localeCompare(String(p[1]),"ar"));n.innerHTML='<option value="">\u2014 \u0643\u0644 \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u2014</option>'+d.map(([c,p])=>`<option value="${Utils.escapeHTML(c)}">${Utils.escapeHTML(p)}</option>`).join(""),s&&l.has(s)&&(n.value=s)}},showTrainingAnalysisExportDialog(t){if(typeof this.isCurrentUserAdmin=="function"&&!this.isCurrentUserAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}this.ensureData();const e=t==="trainers",a=e?"\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u2014 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628":"\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u2014 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628",i=this._buildTrainingAnalysisExportMonthOptionsHtml(),n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-export ml-2"></i>${Utils.escapeHTML(a)}</h2>
                    <button type="button" class="modal-close" title="\u0625\u063A\u0644\u0627\u0642"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0635\u064A\u063A\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631</label>
                        <div class="flex flex-wrap gap-4">
                            <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="ta-modal-format" value="excel" class="ml-1" checked><span>Excel</span></label>
                            <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="ta-modal-format" value="pdf" class="ml-1"><span>PDF (\u0637\u0628\u0627\u0639\u0629)</span></label>
                        </div>
                    </div>
                    <div style="border-top: 1px solid #E5E7EB; padding-top: 16px;">
                        <label class="block text-sm font-semibold text-gray-700 mb-3"><i class="fas fa-calendar-alt ml-2"></i>\u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</label>
                        <div class="space-y-3">
                            <div class="flex items-center">
                                <input type="radio" id="ta-modal-dr-all" name="ta-modal-date-range" value="all" class="ml-2" checked>
                                <label for="ta-modal-dr-all" class="text-sm text-gray-700 cursor-pointer">\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A (\u0628\u062F\u0648\u0646 \u062A\u0642\u064A\u064A\u062F \u0628\u0627\u0644\u062A\u0627\u0631\u064A\u062E)</label>
                            </div>
                            <div class="flex items-center flex-wrap gap-2">
                                <input type="radio" id="ta-modal-dr-month" name="ta-modal-date-range" value="month" class="ml-2">
                                <label for="ta-modal-dr-month" class="text-sm text-gray-700 cursor-pointer">\u0634\u0647\u0631 \u0645\u062D\u062F\u062F</label>
                                <select id="ta-modal-month" class="form-input flex-1" disabled style="max-width: 280px;">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u0647\u0631</option>
                                    ${i}
                                </select>
                            </div>
                            <div class="flex items-center flex-wrap gap-2">
                                <input type="radio" id="ta-modal-dr-custom" name="ta-modal-date-range" value="custom" class="ml-2">
                                <label for="ta-modal-dr-custom" class="text-sm text-gray-700 cursor-pointer">\u0641\u062A\u0631\u0629 \u0645\u062D\u062F\u062F\u0629</label>
                                <input type="date" id="ta-modal-from-date" class="form-input" disabled style="max-width: 150px;">
                                <span class="text-sm text-gray-600">\u0625\u0644\u0649</span>
                                <input type="date" id="ta-modal-to-date" class="form-input" disabled style="max-width: 150px;">
                            </div>
                        </div>
                    </div>
                    ${e?`
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2"><i class="fas fa-chalkboard-teacher ml-2"></i>\u0645\u062F\u0631\u0628 \u0645\u062D\u062F\u062F (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                        <select id="ta-modal-trainer-select" class="form-input w-full"><option value="">\u2014 \u0643\u0644 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u2014</option></select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0623\u0642\u0635\u0649 \u0639\u062F\u062F \u0645\u062F\u0631\u0628\u064A\u0646 \u0641\u064A \u0627\u0644\u062A\u0642\u0631\u064A\u0631</label>
                        <input type="number" id="ta-modal-limit-trainers" class="form-input" style="max-width:120px;" min="1" max="500" value="30">
                    </div>`:`
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0641\u0626\u0629 \u0627\u0644\u0623\u0634\u062E\u0627\u0635</label>
                        <select id="ta-modal-audience" class="form-input w-full">
                            <option value="all">\u0627\u0644\u0643\u0644</option>
                            <option value="employee">\u0645\u0648\u0638\u0641\u0648\u0646</option>
                            <option value="contractor">\u0645\u0642\u0627\u0648\u0644\u0648\u0646 / \u062E\u0627\u0631\u062C\u064A\u0648\u0646</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2"><i class="fas fa-building ml-2 text-gray-500"></i>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                        <select id="ta-modal-department-select" class="form-input w-full"><option value="">\u2014 \u0643\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u2014</option></select>
                        <p class="text-xs text-gray-500 mt-1">\u062A\u064F\u0633\u062A\u062E\u0631\u062C \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0636\u0645\u0646 \u0627\u0644\u0641\u062A\u0631\u0629 \u0648\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629.</p>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0634\u062E\u0635 \u0645\u062D\u062F\u062F (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                        <select id="ta-modal-person-select" class="form-input w-full"><option value="">\u2014 \u0643\u0644 \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u2014</option></select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0623\u0642\u0635\u0649 \u0639\u062F\u062F \u0623\u0634\u062E\u0627\u0635 \u0641\u064A \u0627\u0644\u062A\u0642\u0631\u064A\u0631</label>
                        <input type="number" id="ta-modal-limit-attendees" class="form-input" style="max-width:120px;" min="1" max="2000" value="50">
                    </div>`}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" class="btn-primary" id="ta-modal-generate-btn"><i class="fas fa-file-export ml-2"></i>\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</button>
                </div>
            </div>`,document.body.appendChild(n);const s=()=>{n.remove()};n.querySelector(".modal-close")?.addEventListener("click",s),n.querySelector('[data-action="close"]')?.addEventListener("click",s),n.addEventListener("click",g=>{g.target===n&&s()});const r=n.querySelector("#ta-modal-month"),o=n.querySelector("#ta-modal-from-date"),l=n.querySelector("#ta-modal-to-date"),d=()=>{const g=n.querySelector('input[name="ta-modal-date-range"]:checked')?.value||"all";g==="month"?(r.disabled=!1,o&&(o.disabled=!0),l&&(l.disabled=!0)):g==="custom"?(r.disabled=!0,o&&(o.disabled=!1),l&&(l.disabled=!1)):(r.disabled=!0,o&&(o.disabled=!0),l&&(l.disabled=!0))};n.querySelectorAll('input[name="ta-modal-date-range"]').forEach(g=>{g.addEventListener("change",()=>{d(),this._refreshAnalysisExportModalLists(n,e?"trainers":"attendees")})}),r&&r.addEventListener("change",()=>this._refreshAnalysisExportModalLists(n,e?"trainers":"attendees")),o&&o.addEventListener("change",()=>this._refreshAnalysisExportModalLists(n,e?"trainers":"attendees")),l&&l.addEventListener("change",()=>this._refreshAnalysisExportModalLists(n,e?"trainers":"attendees"));const c=n.querySelector("#ta-modal-audience");c&&c.addEventListener("change",()=>this._refreshAnalysisExportModalLists(n,"attendees"));const p=n.querySelector("#ta-modal-department-select");p&&p.addEventListener("change",()=>this._refreshAnalysisExportModalLists(n,"attendees")),d(),this._refreshAnalysisExportModalLists(n,e?"trainers":"attendees"),n.querySelector("#ta-modal-generate-btn")?.addEventListener("click",()=>{const g=n.querySelector('input[name="ta-modal-date-range"]:checked')?.value||"all",f=n.querySelector("#ta-modal-month")?.value||"",m=n.querySelector("#ta-modal-from-date")?.value||"",u=n.querySelector("#ta-modal-to-date")?.value||"";if(g==="month"&&!f){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631");return}if(g==="custom"){if(!m||!u){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}if(new Date(m)>new Date(u)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}}const y=this._readDateFilterFromTrainingExportModal(n),x=n.querySelector('input[name="ta-modal-format"]:checked')?.value||"excel",h={dateFilter:y};e?(h.trainerKey=n.querySelector("#ta-modal-trainer-select")?.value?.trim()||"",h.limitTrainers=Math.min(500,Math.max(1,parseInt(n.querySelector("#ta-modal-limit-trainers")?.value||"30",10)||30))):(h.audience=n.querySelector("#ta-modal-audience")?.value||"all",h.attendanceDepartment=n.querySelector("#ta-modal-department-select")?.value?.trim()||"",h.personKey=n.querySelector("#ta-modal-person-select")?.value?.trim()||"",h.limitAttendees=Math.min(2e3,Math.max(1,parseInt(n.querySelector("#ta-modal-limit-attendees")?.value||"50",10)||50))),s(),this._analysisExportContext=h;try{e?x==="pdf"?this.exportAnalysisTrainersPDF():this.exportAnalysisTrainersExcel():x==="pdf"?this.exportAnalysisAttendeesPDF():this.exportAnalysisAttendeesExcel()}finally{this._analysisExportContext=null}})},async generateContractorTrainingReport(t=null,e={},a=""){this.ensureData();try{Loading.show();const i=this.getContractorOptions(),n=new Map(i.map(D=>[String(D?.id??"").trim(),D.name||""])),s=String(t||"").trim(),r=String(a||"").replace(/\s+/g," ").trim(),o=r.toLowerCase();let l=null;if(r)l=r;else if(s){const D=i.find(I=>String(I.id||"").trim()===s);if(D&&D.name)l=D.name.trim();else if(l=n.get(s)||"",!l||l===""){const I=(AppState.appData.contractorTrainings||[]).find(v=>String(v.contractorId||"").trim()===s);I&&I.contractorName&&(l=I.contractorName.trim())}(!l||l===""||l==="\u0628\u062F\u0648\u0646 \u0627\u0633\u0645")&&(l="",Utils.safeWarn(`\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0644\u0644\u0645\u0639\u0631\u0641: ${s}`))}let d=(AppState.appData.contractorTrainings||[]).slice().sort((D,I)=>new Date(I.date||I.createdAt||0)-new Date(D.date||D.createdAt||0));const c=D=>{const I=String(D?.contractorId??"").trim(),v=(D?.contractorName||"").toString().replace(/\s+/g," ").trim(),$=(n.get(I)||"").toString().trim();return v||$||""};if(s||o){const D=d,I=D.length,v=o||(n.get(s)||"").toLowerCase();d=D.filter($=>{const M=c($).toLowerCase();if(M===v||v&&M.includes(v)||v&&v.includes(M))return!0;if(s){const N=String($?.contractorId??"").trim();if(N===s)return!0;if(N&&s){const w=N.replace(/\s+/g,""),C=s.replace(/\s+/g,"");if(w===C)return!0}}return!1}),d.length===0&&I>0&&Utils.safeWarn(`\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u062D\u062F\u062F. \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0642\u0628\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629: ${I}`)}const{dateRangeType:p="all",month:g="",fromDate:f="",toDate:m=""}=e||{};if(p==="month"&&g){const[D,I]=g.split("-");d=d.filter(v=>{if(!v.date)return!1;const $=new Date(v.date),M=$.getFullYear(),N=$.getMonth()+1;return M===parseInt(D,10)&&N===parseInt(I,10)})}else if(p==="custom"&&f&&m){const D=new Date(f);D.setHours(0,0,0,0);const I=new Date(m);I.setHours(23,59,59,999),d=d.filter(v=>{if(!v.date)return!1;const $=new Date(v.date);return $>=D&&$<=I})}const u=d.length,y=d.reduce((D,I)=>D+(parseInt(I.traineesCount,10)||0),0),x=d.reduce((D,I)=>D+(parseFloat(I.totalHours)||0),0),h=d.map((D,I)=>{const v=String(D.contractorId||"").trim();let $="-";const M=String(D.contractorName||"").replace(/\s+/g," ").trim();if(M&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(M))$=M;else if(v){if($=n.get(v)||"",!$||$===""){const B=i.find(U=>String(U?.id??"").trim()===v);B&&B.name&&($=B.name.trim())}(!$||$==="")&&($=M||"-")}else $=M||"-";const w=D.durationMinutes&&!isNaN(Number(D.durationMinutes))?Number(D.durationMinutes):"-",C=D.totalHours&&!isNaN(Number(D.totalHours))?parseFloat(D.totalHours).toFixed(2):"-";return`
                <tr style="${I%2===0?"background-color: #FFFFFF;":"background-color: #F9FAFB;"}">
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${I+1}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${D.date?Utils.formatDate(D.date):"-"}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(D.topic||"-")}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(D.trainer||"-")}</td>
                    ${l?"":`<td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML($)}</td>`}
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${D.traineesCount||"-"}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${w}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${C}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(D.location||"-")}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(D.subLocation||"-")}</td>
                </tr>
            `}).join("");let k="";if(p==="month"&&g){const[D,I]=g.split("-");k=` - ${new Date(parseInt(D,10),parseInt(I,10)-1,1).toLocaleDateString("ar-SA",{year:"numeric",month:"long"})}`}else if(p==="custom"&&f&&m){const D=new Date(f),I=new Date(m),v=D.toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"}),$=I.toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"});k=` - \u0645\u0646 ${v} \u0625\u0644\u0649 ${$}`}const A=l?`\u062A\u0642\u0631\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${Utils.escapeHTML(l)}${k}`:`\u062A\u0642\u0631\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646${k}`,b=`
                <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 20px; margin-bottom: 12px; color: #1E3A8A; font-weight: 700;">${l?`\u0645\u0644\u062E\u0635 \u062A\u062F\u0631\u064A\u0628\u0627\u062A: ${Utils.escapeHTML(l)}`:"\u0645\u0644\u062E\u0635 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"}</h2>
                    ${l?`<div style="margin-bottom: 16px; padding: 12px; background: #F0F9FF; border-right: 4px solid #1E3A8A; border-radius: 8px;">
                        <strong style="color: #1E3A8A;">\u0627\u0644\u0645\u0642\u0627\u0648\u0644:</strong> <span style="color: #1F2937;">${Utils.escapeHTML(l)}</span>
                    </div>`:""}
                    ${k?`<div style="margin-bottom: 16px; padding: 12px; background: #FFF7ED; border-right: 4px solid #F59E0B; border-radius: 8px;">
                        <strong style="color: #D97706;">\u0627\u0644\u0641\u062A\u0631\u0629:</strong> <span style="color: #1F2937;">${k.replace(" - ","")}</span>
                    </div>`:""}
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #EFF6FF; border: 1px solid #BFDBFE;">
                            <div style="font-size: 12px; color: #1D4ED8; margin-bottom: 6px; font-weight: 600;">\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C</div>
                            <div style="font-size: 26px; font-weight: 700; color: #1E3A8A;">${u}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #ECFDF5; border: 1px solid #BBF7D0;">
                            <div style="font-size: 12px; color: #047857; margin-bottom: 6px; font-weight: 600;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646</div>
                            <div style="font-size: 26px; font-weight: 700; color: #065F46;">${y}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #FDF2F8; border: 1px solid #FBCFE8;">
                            <div style="font-size: 12px; color: #BE185D; margin-bottom: 6px; font-weight: 600;">\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628</div>
                            <div style="font-size: 26px; font-weight: 700; color: #9F1239;">${x.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                <div style="margin-bottom: 16px;">
                    <h3 style="font-size: 18px; margin-bottom: 12px; color: #1E3A8A; font-weight: 700; border-bottom: 2px solid #1E3A8A; padding-bottom: 8px;">\u062C\u062F\u0648\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A</h3>
                </div>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px; direction: rtl;">
                        <thead>
                            <tr style="background: #1E3A8A; color: #FFFFFF;">
                                <th style="padding: 12px 8px; border: 1px solid #1E40AF; text-align: center; font-weight: 700; white-space: nowrap;">#</th>
                                <th style="padding: 12px 8px; border: 1px solid #1E40AF; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="padding: 12px 8px; border: 1px solid #1E40AF; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u0645\u0648\u0636\u0648\u0639</th>
                                <th style="padding: 12px 8px; border: 1px solid #1E40AF; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u0645\u062F\u0631\u0628</th>
                                ${l?"":'<th style="padding: 12px 8px; border: 1px solid #1E40AF; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>'}
                                <th style="padding: 12px 8px; border: 1px solid #1E40AF; text-align: center; font-weight: 700; white-space: nowrap;">\u0639\u062F\u062F \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646</th>
                                <th style="padding: 12px 8px; border: 1px solid #1E40AF; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u0645\u062F\u0629 (\u062F\u0642\u0627\u0626\u0642)</th>
                                <th style="padding: 12px 8px; border: 1px solid #1E40AF; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u0633\u0627\u0639\u0627\u062A</th>
                                <th style="padding: 12px 8px; border: 1px solid #1E40AF; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u0645\u0643\u0627\u0646</th>
                                <th style="padding: 12px 8px; border: 1px solid #1E40AF; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${h||`<tr><td colspan="${l?"9":"10"}" style="padding: 16px; text-align: center; border: 1px solid #E5E7EB; color: #6B7280;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u062A\u0627\u062D\u0629</td></tr>`}
                        </tbody>
                    </table>
                </div>
            `,E=`CONTRACTOR-TRAINING-${t?t.substring(0,8)+"-":""}${new Date().toISOString().slice(0,10)}`,T=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(E,A,b,!1,!0,{source:"ContractorTraining",contractorId:t,contractorName:l},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${A}</title><style>body { font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif; direction: rtl; padding: 20px; } table { width: 100%; border-collapse: collapse; } th, td { padding: 10px; border: 1px solid #E5E7EB; text-align: center; } thead th { background: #1E3A8A; color: #FFFFFF; }</style></head><body>${b}</body></html>`,L=new Blob([T],{type:"text/html;charset=utf-8"}),S=URL.createObjectURL(L),F=window.open(S,"_blank");F?F.onload=()=>{try{F.print(),setTimeout(()=>URL.revokeObjectURL(S),1e3)}catch(D){Utils.safeWarn("\u062A\u0639\u0630\u0631 \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629 \u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",D)}}:Notification.info("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631. \u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636\u0647."),Loading.hide(),Notification.success(l?`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${l}`:"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646")}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",i),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646: "+i.message)}},showAnnualPlanModal(t=new Date().getFullYear()){this.ensureData();const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 1100px; max-height: 92vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-calendar-check ml-2"></i>
                        \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0633\u0646\u0648\u064A\u0629
                    </h2>
                    <div class="flex items-center gap-2 mr-auto">
                        <button class="btn-icon btn-icon-secondary" id="annual-plan-prev-year" title="\u0627\u0644\u0633\u0646\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <input type="number" id="annual-plan-year" class="form-input" style="width: 120px;" value="${t}">
                        <button class="btn-icon btn-icon-secondary" id="annual-plan-next-year" title="\u0627\u0644\u0633\u0646\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                    </div>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-6" id="annual-plan-body"></div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(e);const a=e.querySelector(".modal-content");let i=!1,n=null;const s=p=>{i||(i=!0,p&&(p.preventDefault(),p.stopPropagation()),n&&(document.removeEventListener("keydown",n),n=null),e&&e.parentNode&&e.remove())};a&&a.addEventListener("click",p=>{p.stopPropagation()});const r=e.querySelector(".modal-close");r&&r.addEventListener("click",p=>{p.stopPropagation(),s(p)});const o=e.querySelector('[data-action="close"]');o&&o.addEventListener("click",p=>{p.stopPropagation(),s(p)}),e.addEventListener("click",p=>{p.target===e&&!i&&s(p)}),n=p=>{(p.key==="Escape"||p.keyCode===27)&&s(p)},document.addEventListener("keydown",n);const l=e.querySelector("#annual-plan-year"),d=e.querySelector("#annual-plan-body"),c=()=>{const p=parseInt(l?.value,10)||new Date().getFullYear();d.innerHTML=this.renderAnnualPlanContent(p),this.bindAnnualPlanEvents(e,p)};e.querySelector("#annual-plan-prev-year")?.addEventListener("click",()=>{l.value=(parseInt(l.value,10)||t)-1,c()}),e.querySelector("#annual-plan-next-year")?.addEventListener("click",()=>{l.value=(parseInt(l.value,10)||t)+1,c()}),l?.addEventListener("change",c),c()},renderAnnualPlanContent(t){const e=this.getAnnualPlan(t,{createIfMissing:this.isCurrentUserAdmin()});if(!e)return`
                <div class="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
                    \u0644\u0645 \u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062E\u0637\u0629 \u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0644\u0644\u0633\u0646\u0629 ${t} \u0628\u0639\u062F.
                    ${this.isCurrentUserAdmin()?'<div class="mt-3"><button class="btn-primary" id="create-annual-plan-btn"><i class="fas fa-plus ml-2"></i>\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0644\u0644\u0633\u0646\u0629</button></div>':""}
                </div>
            `;const a=this.getAnnualPlanStats(e);return`
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex flex-wrap gap-4 items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold text-blue-900">\u0633\u0646\u0629 \u0627\u0644\u062E\u0637\u0629: ${t}</h3>
                        <p class="text-sm text-blue-700">\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062E\u0637\u0629 \u0628\u0648\u0627\u0633\u0637\u0629: ${Utils.escapeHTML(e.createdBy?.name||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")} \u0641\u064A ${Utils.formatDate(e.createdAt)}</p>
                    </div>
                    ${this.isCurrentUserAdmin()?`
                        <div>
                            <button class="btn-primary" id="add-annual-plan-item-btn">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u0644\u0644\u062E\u0637\u0629
                            </button>
                        </div>
                    `:""}
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="content-card h-full">
                    <p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0646\u0627\u0635\u0631</p>
                    <p class="text-2xl font-bold text-gray-900">${a.total}</p>
                </div>
                <div class="content-card h-full">
                    <p class="text-sm text-gray-500">\u0628\u0631\u0627\u0645\u062C \u0645\u0643\u062A\u0645\u0644\u0629</p>
                    <p class="text-2xl font-bold text-green-600">${a.completed}</p>
                </div>
                <div class="content-card h-full">
                    <p class="text-sm text-gray-500">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</p>
                    <p class="text-2xl font-bold text-blue-600">${a.inProgress}</p>
                </div>
                <div class="content-card h-full">
                    <p class="text-sm text-gray-500">\u0645\u0624\u062C\u0644\u0629</p>
                    <p class="text-2xl font-bold text-yellow-600">${a.delayed}</p>
                </div>
            </div>
            
            <div class="content-card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-clipboard-list ml-2"></i>
                        \u062E\u0637\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629 (${e.items.length} \u0628\u0646\u062F)
                    </h3>
                </div>
                <div class="card-body">
                    ${e.items.length?this.renderAnnualPlanTable(e,t):`
                        <div class="text-center text-gray-500 py-8">
                            \u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631 \u0645\u0633\u062C\u0644\u0629 \u0636\u0645\u0646 \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629.
                        </div>
                    `}
                </div>
            </div>
        `},bindAnnualPlanEvents(t,e){if(!this.getAnnualPlan(e,{createIfMissing:!1})){t.querySelector("#create-annual-plan-btn")?.addEventListener("click",()=>{this.createAnnualPlan(e);const i=t.querySelector("#annual-plan-body");i&&(i.innerHTML=this.renderAnnualPlanContent(e)),this.bindAnnualPlanEvents(t,e)});return}if(this.isCurrentUserAdmin()){const i=()=>{const n=t.querySelector("#annual-plan-body");n&&(n.innerHTML=this.renderAnnualPlanContent(e)),this.bindAnnualPlanEvents(t,e)};t.querySelector("#add-annual-plan-item-btn")?.addEventListener("click",()=>this.openAnnualPlanItemForm(e,null,i)),t.querySelectorAll('[data-action="delete-plan-item"]').forEach(n=>{n.addEventListener("click",()=>{const s=n.getAttribute("data-item-id");this.removeAnnualPlanItem(e,s),i()})}),t.querySelectorAll('[data-action="edit-plan-item"]').forEach(n=>{n.addEventListener("click",()=>{const s=n.getAttribute("data-item-id");this.openAnnualPlanItemForm(e,s,i)})}),t.querySelectorAll(".plan-status-select").forEach(n=>{n.addEventListener("change",s=>{const r=n.getAttribute("data-item-id");this.updateAnnualPlanItemStatus(e,r,s.target.value)})}),t.querySelectorAll(".plan-training-link").forEach(n=>{n.addEventListener("change",s=>{const r=n.getAttribute("data-item-id"),o=s.target.value;this.linkTrainingToPlanItem(e,r,o),i()})})}},renderAnnualPlanTable(t,e){const i=(AppState.appData.training||[]).map(r=>({id:r.id,name:r.name||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646",date:r.startDate||r.date||""})).sort((r,o)=>(r.date||"").localeCompare(o.date||"")),n=r=>{const o=[];return r.targetType==="employees"?o.push("\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646"):r.targetType==="contractors"?o.push("\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646"):o.push("\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646"),Array.isArray(r.targetRoles)&&r.targetRoles.length&&o.push(`\u0627\u0644\u0648\u0638\u0627\u0626\u0641: ${r.targetRoles.map(l=>Utils.escapeHTML(l)).join(", ")}`),Array.isArray(r.targetContractors)&&r.targetContractors.length&&o.push(`\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646: ${r.targetContractors.map(l=>Utils.escapeHTML(l)).join(", ")}`),o.join(" \u2014 ")},s=["\u0645\u062E\u0637\u0637","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0645\u0643\u062A\u0645\u0644","\u0645\u0624\u062C\u0644"];return`
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0645\u0648\u0636\u0648\u0639</th>
                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637</th>
                            <th>\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0631\u0628\u0637 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                            <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                            ${this.isCurrentUserAdmin()?"<th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>":""}
                        </tr>
                    </thead>
                    <tbody>
                        ${t.items.sort((r,o)=>(r.plannedDate||"").localeCompare(o.plannedDate||"")).map(r=>`
                            <tr>
                                <td>
                                    <div class="font-semibold text-gray-900">${Utils.escapeHTML(r.topic||"")}</div>
                                    ${r.requiredTopics&&r.requiredTopics.length?`
                                        <div class="text-xs text-blue-600 mt-1">\u0645\u0648\u0636\u0648\u0639\u0627\u062A: ${r.requiredTopics.map(o=>Utils.escapeHTML(o)).join(", ")}</div>
                                    `:""}
                                </td>
                                <td>${r.plannedDate?Utils.formatDate(r.plannedDate):"\u2014"}</td>
                                <td>${n(r)}</td>
                                <td>
                                    ${this.isCurrentUserAdmin()?`
                                        <select class="form-input plan-status-select" data-item-id="${r.id}">
                                            ${s.map(o=>`<option value="${Utils.escapeHTML(o)}" ${r.status===o?"selected":""}>${Utils.escapeHTML(o)}</option>`).join("")}
                                        </select>
                                    `:`
                                        <span class="badge ${r.status==="\u0645\u0643\u062A\u0645\u0644"?"badge-success":r.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"badge-info":r.status==="\u0645\u0624\u062C\u0644"?"badge-warning":"badge-secondary"}">${Utils.escapeHTML(r.status||"\u0645\u062E\u0637\u0637")}</span>
                                    `}
                                </td>
                                <td>
                                    ${this.isCurrentUserAdmin()?`
                                        <select class="form-input plan-training-link" data-item-id="${r.id}">
                                            <option value="">\u2014</option>
                                            ${i.map(o=>`
                                                <option value="${Utils.escapeHTML(o.id)}" ${o.id===r.linkedTrainingId?"selected":""}>
                                                    ${Utils.escapeHTML(o.name)} (${o.date?Utils.formatDate(o.date):"\u0628\u062F\u0648\u0646 \u062A\u0627\u0631\u064A\u062E"})
                                                </option>
                                            `).join("")}
                                        </select>
                                    `:`
                                        ${r.linkedTrainingId?'<span class="text-sm text-blue-600">\u0645\u0631\u062A\u0628\u0637 \u0628\u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628</span>':'<span class="text-xs text-gray-400">\u063A\u064A\u0631 \u0645\u0631\u062A\u0628\u0637</span>'}
                                    `}
                                </td>
                                <td>${Utils.escapeHTML(r.notes||"")}</td>
                                ${this.isCurrentUserAdmin()?`
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button class="btn-icon btn-icon-primary" data-action="edit-plan-item" data-item-id="${r.id}" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0639\u0646\u0635\u0631">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn-icon btn-icon-danger" data-action="delete-plan-item" data-item-id="${r.id}" title="\u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0635\u0631">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                `:""}
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},openAnnualPlanItemForm(t,e=null,a=null){const n=this.getAnnualPlan(t,{createIfMissing:!0}).items.find(c=>c.id===e)||null,s=this.getUniquePositions(),r=(AppState.appData.contractors||[]).filter(c=>c&&c.isActive!=="inactive"&&c.isActive!==!1&&c.isActive!=="false"&&c.isActive!=="FALSE").map(c=>c.name||c.company).filter(Boolean),o=this.getAllTrainingTopics(),l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-calendar-plus ml-2"></i>
                        ${n?"\u062A\u0639\u062F\u064A\u0644 \u0639\u0646\u0635\u0631 \u0627\u0644\u062E\u0637\u0629":"\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u062C\u062F\u064A\u062F \u0644\u0644\u062E\u0637\u0629"}
                    </h2>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="annual-plan-item-form">
                    <div class="modal-body space-y-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A *</label>
                                <input type="text" id="plan-item-topic" class="form-input" required value="${Utils.escapeHTML(n?.topic||"")}" placeholder="\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637 *</label>
                                <input type="date" id="plan-item-date" class="form-input" required value="${n?.plannedDate?new Date(n.plannedDate).toISOString().slice(0,10):""}">
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629 *</label>
                                <select id="plan-item-target-type" class="form-input" required>
                                    <option value="employees" ${n?.targetType==="employees"?"selected":""}>\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646</option>
                                    <option value="contractors" ${n?.targetType==="contractors"?"selected":""}>\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646</option>
                                    <option value="mixed" ${n?.targetType==="mixed"?"selected":""}>\u0627\u0644\u0643\u0644</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                <select id="plan-item-status" class="form-input">
                                    <option value="\u0645\u062E\u0637\u0637" ${n?.status==="\u0645\u062E\u0637\u0637"?"selected":""}>\u0645\u062E\u0637\u0637</option>
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630" ${n?.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                    <option value="\u0645\u0643\u062A\u0645\u0644" ${n?.status==="\u0645\u0643\u062A\u0645\u0644"?"selected":""}>\u0645\u0643\u062A\u0645\u0644</option>
                                    <option value="\u0645\u0624\u062C\u0644" ${n?.status==="\u0645\u0624\u062C\u0644"?"selected":""}>\u0645\u0624\u062C\u0644</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0633\u0646\u0629</label>
                                <input type="text" class="form-input" value="${t}" disabled>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</label>
                                <select id="plan-item-roles" class="form-input" multiple size="5">
                                    ${s.map(c=>`
                                        <option value="${Utils.escapeHTML(c)}" ${n?.targetRoles?.includes(c)?"selected":""}>${Utils.escapeHTML(c)}</option>
                                    `).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0648\u0646</label>
                                <select id="plan-item-contractors" class="form-input" multiple size="5">
                                    ${r.map(c=>`
                                        <option value="${Utils.escapeHTML(c)}" ${n?.targetContractors?.includes(c)?"selected":""}>${Utils.escapeHTML(c)}</option>
                                    `).join("")}
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                            <select id="plan-item-topics" class="form-input" multiple size="5">
                                ${o.map(c=>`
                                    <option value="${Utils.escapeHTML(c)}" ${n?.requiredTopics?.includes(c)?"selected":""}>${Utils.escapeHTML(c)}</option>
                                `).join("")}
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                            <textarea id="plan-item-notes" class="form-input" rows="3" placeholder="\u062A\u0641\u0627\u0635\u064A\u0644 \u0625\u0636\u0627\u0641\u064A\u0629 \u0623\u0648 \u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C">${Utils.escapeHTML(n?.notes||"")}</textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            ${n?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u062E\u0637\u0629"}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(l);const d=()=>l.remove();l.querySelector(".modal-close")?.addEventListener("click",d),l.querySelector('[data-action="close"]')?.addEventListener("click",d),l.addEventListener("click",c=>{c.target===l&&d()}),l.querySelector("#annual-plan-item-form")?.addEventListener("submit",c=>{c.preventDefault();const p=l.querySelector("#plan-item-topic")?.value.trim(),g=l.querySelector("#plan-item-date")?.value,f=l.querySelector("#plan-item-target-type")?.value||"employees",m=l.querySelector("#plan-item-status")?.value||"\u0645\u062E\u0637\u0637",u=this.getSelectedOptionsFromElement(l.querySelector("#plan-item-roles")),y=this.getSelectedOptionsFromElement(l.querySelector("#plan-item-contractors")),x=this.getSelectedOptionsFromElement(l.querySelector("#plan-item-topics")),h=l.querySelector("#plan-item-notes")?.value.trim();if(!p||!g){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637");return}const k={id:n?.id||Utils.generateId("PLANITEM"),topic:p,plannedDate:new Date(g).toISOString(),targetType:f,status:m,targetRoles:u,targetContractors:y,requiredTopics:x,notes:h,linkedTrainingId:n?.linkedTrainingId||"",createdAt:n?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};this.upsertAnnualPlanItem(t,k),Notification.success(n?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0646\u0635\u0631 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0639\u0646\u0635\u0631 \u0625\u0644\u0649 \u0627\u0644\u062E\u0637\u0629"),d(),typeof a=="function"&&a()})},isCurrentUserAdmin(){return typeof Permissions?.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin"},isCurrentUserAdminOrManager(){if(this.isCurrentUserAdmin())return!0;const t=(AppState.currentUser?.role||"").toString().trim().toLowerCase();return["admin","system_admin","manager","\u0645\u062F\u064A\u0631","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645","system-manager","safety_officer"].some(e=>t.includes(e))},canViewLegalTrainingTab(){return this.isCurrentUserAdmin()?!0:typeof Permissions<"u"&&typeof Permissions.hasDetailedPermission=="function"?Permissions.hasDetailedPermission("training","legal-training"):!1},getAnnualPlan(t,{createIfMissing:e=!1}={}){this.ensureData(),Array.isArray(AppState.appData.annualTrainingPlans)||(AppState.appData.annualTrainingPlans=[]);let a=AppState.appData.annualTrainingPlans.find(i=>i.year===t);return!a&&e&&this.isCurrentUserAdmin()&&(a=this.createAnnualPlan(t)),a||null},createAnnualPlan(t){const e={id:`PLAN-${t}`,year:t,createdBy:{id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||AppState.currentUser?.displayName||AppState.currentUser?.email||"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0646\u0638\u0627\u0645",email:AppState.currentUser?.email||""},createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),items:[]};return AppState.appData.annualTrainingPlans.push(e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0644\u0644\u0633\u0646\u0629 ${t}`),e},upsertAnnualPlanItem(t,e){const a=this.getAnnualPlan(t,{createIfMissing:!0}),i=a.items.findIndex(n=>n.id===e.id);i>=0?a.items[i]=e:a.items.push(e),a.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},getAnnualPlanStats(t){return{total:t.items.length,completed:t.items.filter(e=>e.status==="\u0645\u0643\u062A\u0645\u0644").length,inProgress:t.items.filter(e=>e.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630").length,delayed:t.items.filter(e=>e.status==="\u0645\u0624\u062C\u0644").length}},updateAnnualPlanItemStatus(t,e,a){const i=this.getAnnualPlan(t,{createIfMissing:!1});if(!i)return;const n=i.items.find(s=>s.id===e);n&&(n.status=a,n.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0639\u0646\u0635\u0631"))},linkTrainingToPlanItem(t,e,a){const i=this.getAnnualPlan(t,{createIfMissing:!1});if(!i)return;const n=i.items.find(s=>s.id===e);n&&(n.linkedTrainingId=a||"",a&&(n.status="\u0645\u0643\u062A\u0645\u0644"),n.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u0631\u0628\u0637 \u0627\u0644\u0639\u0646\u0635\u0631 \u0628\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"))},removeAnnualPlanItem(t,e){const a=this.getAnnualPlan(t,{createIfMissing:!1});a&&(a.items=a.items.filter(i=>i.id!==e),a.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0639\u0646\u0635\u0631 \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629"))},openQuickTrainingRegistration(t){this.ensureData();const a=(AppState.appData.employees||[]).find(o=>(o.employeeNumber||o.sapId)===t);if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u062D\u062F\u062F");return}const i=this.getRequiredTopicsForPosition(a.position),n=Array.from(new Set([...i.map(o=>typeof o=="string"?o:o.topic),...this.getAllTrainingTopics()||[]].filter(Boolean))),s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-plus-circle ml-2"></i>
                        \u062A\u0633\u062C\u064A\u0644 \u062A\u062F\u0631\u064A\u0628 \u0633\u0631\u064A\u0639 \u0644\u0644\u0645\u0648\u0638\u0641: ${Utils.escapeHTML(a.name||"")}
                    </h2>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="quick-training-form">
                    <div class="modal-body space-y-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A *</label>
                                <input type="text" id="quick-training-subject" class="form-input" required placeholder="\u0623\u062F\u062E\u0644 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 *</label>
                                <select id="quick-training-type" class="form-input" required>
                                    <option value="\u062F\u0627\u062E\u0644\u064A">\u062F\u0627\u062E\u0644\u064A</option>
                                    <option value="\u062E\u0627\u0631\u062C\u064A">\u062E\u0627\u0631\u062C\u064A</option>
                                    <option value="\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A">\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label>
                                <input type="date" id="quick-training-date" class="form-input" required value="${new Date().toISOString().slice(0,10)}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u062F\u0631\u0628 / \u0627\u0644\u062C\u0647\u0629 *</label>
                                <input type="text" id="quick-training-trainer" class="form-input" required placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0631\u0628 \u0623\u0648 \u0627\u0644\u062C\u0647\u0629">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639</label>
                                <input type="text" id="quick-training-location" class="form-input" placeholder="\u0645\u0648\u0642\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                                <select id="quick-training-status" class="form-input" required>
                                    <option value="\u0645\u0643\u062A\u0645\u0644" selected>\u0645\u0643\u062A\u0645\u0644</option>
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                    <option value="\u0645\u062E\u0637\u0637">\u0645\u062E\u0637\u0637</option>
                                    <option value="\u0645\u0624\u062C\u0644">\u0645\u0624\u062C\u0644</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0627\u064A\u0629</label>
                                <input type="time" id="quick-training-start-time" class="form-input">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u0646\u0647\u0627\u064A\u0629</label>
                                <input type="time" id="quick-training-end-time" class="form-input">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629</label>
                            <div class="flex gap-3 items-center">
                                <input type="number" id="quick-training-hours" class="form-input" min="0" step="0.5" placeholder="\u0639\u062F\u062F \u0627\u0644\u0633\u0627\u0639\u0627\u062A" value="2">
                                <span class="text-sm text-gray-500">\u0633\u0627\u0639\u0629</span>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629
                                <span class="text-xs text-gray-500 block">\u064A\u0645\u0643\u0646 \u0627\u062E\u062A\u064A\u0627\u0631 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0648\u0636\u0648\u0639 \u0644\u062A\u062D\u062F\u064A\u062B \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</span>
                            </label>
                            <select id="quick-training-topics" class="form-input" multiple size="5">
                                ${n.map(o=>`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)}</option>`).join("")}
                            </select>
                        </div>
                        
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                            <i class="fas fa-info-circle ml-2"></i>
                            \u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628 \u062C\u062F\u064A\u062F \u0648\u0631\u0628\u0637\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0648\u0638\u0641.
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(s);const r=()=>s.remove();s.querySelector(".modal-close")?.addEventListener("click",r),s.querySelector('[data-action="close"]')?.addEventListener("click",r),s.addEventListener("click",o=>{o.target===s&&r()}),s.querySelector("#quick-training-form")?.addEventListener("submit",async o=>{o.preventDefault();try{const l=s.querySelector("#quick-training-subject")?.value.trim(),d=s.querySelector("#quick-training-trainer")?.value.trim(),c=s.querySelector("#quick-training-type")?.value||"\u062F\u0627\u062E\u0644\u064A",p=s.querySelector("#quick-training-date")?.value,g=s.querySelector("#quick-training-location")?.value.trim(),f=s.querySelector("#quick-training-status")?.value||"\u0645\u0643\u062A\u0645\u0644",m=s.querySelector("#quick-training-start-time")?.value,u=s.querySelector("#quick-training-end-time")?.value,y=parseFloat(s.querySelector("#quick-training-hours")?.value||"0"),x=this.getSelectedOptionsFromElement(s.querySelector("#quick-training-topics"));if(!l||!d||!p){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0644\u062A\u062F\u0631\u064A\u0628");return}let h=y;if((!h||h<=0)&&m&&u){const T=new Date(`2000-01-01T${m}:00`),S=new Date(`2000-01-01T${u}:00`)-T;S>0&&(h=S/36e5)}const k=Utils.generateId("TRAINING");let A=new Date().toISOString();if(p){const T=p.split("-");if(T.length===3){const L=parseInt(T[0],10),S=parseInt(T[1],10)-1,F=parseInt(T[2],10),D=new Date(L,S,F,12,0,0);isNaN(D.getTime())||(A=D.toISOString())}else{const L=new Date(p);isNaN(L.getTime())||(A=L.toISOString())}}const b={name:a.name||"",code:a.employeeNumber||a.sapId||"",employeeNumber:a.employeeNumber||a.sapId||"",employeeCode:a.employeeNumber||a.employeeCode||"",department:a.department||"",position:a.position||"",workLocation:a.location||a.workLocation||"",type:"employee",personType:"employee",topics:x},E={id:k,name:l,trainer:d,trainingType:c,location:g||"",date:A,startDate:A,startTime:m||"",endTime:u||"",status:f,hours:h>0?h.toFixed(2):"",participants:[b],participantsCount:1,topics:x,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(AppState.appData.training.push(E),this.syncEmployeeTrainingMatrix(E),x.length){const T=new Date(p).getFullYear(),L=this.getAnnualPlan(T,{createIfMissing:!1});if(L){const S=new Date().toISOString();x.forEach(F=>{const D=L.items.find(I=>I.linkedTrainingId||!(I.topic===F||Array.isArray(I.requiredTopics)&&I.requiredTopics.includes(F))?!1:Array.isArray(I.targetRoles)&&I.targetRoles.length?I.targetRoles.includes(a.position):I.targetType!=="contractors");D&&(D.linkedTrainingId=k,D.status="\u0645\u0643\u062A\u0645\u0644",D.updatedAt=S)})}}if(typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled)try{if(await GoogleIntegration.sendRequest({action:"addTraining",data:E}),b&&b.employeeCode){const T=AppState.appData.employeeTrainingMatrix[b.employeeCode];T&&T.length>0&&await GoogleIntegration.sendRequest({action:"updateEmployeeTrainingMatrix",data:{employeeId:b.employeeCode,updateData:{[b.employeeCode]:T}}})}}catch(T){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A Google Sheets\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B:",T),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await Promise.allSettled([GoogleIntegration.autoSave?.("Training",AppState.appData.training),GoogleIntegration.autoSave?.("EmployeeTrainingMatrix",AppState.appData.employeeTrainingMatrix)]).catch(()=>{})}else typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await Promise.allSettled([GoogleIntegration.autoSave?.("Training",AppState.appData.training),GoogleIntegration.autoSave?.("EmployeeTrainingMatrix",AppState.appData.employeeTrainingMatrix)]);await this.refreshTrainingMatrix(),this.loadTrainingList(),Notification.success("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0628\u0646\u062C\u0627\u062D"),r()}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0633\u0631\u064A\u0639:",l),Notification.error("\u062A\u0639\u0630\u0631 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628: "+l.message)}})},async exportTrainingMatrix(){this.ensureData();try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");return}const t=AppState.appData.employees||[],e=AppState.appData.employeeTrainingMatrix||{},a=t.map(o=>{const l=o.employeeNumber||o.sapId||"",d=e[l]||[],c=d.reduce((f,m)=>f+(parseFloat(m.hours)||0),0),p=d.filter(f=>f.trainingType==="\u062F\u0627\u062E\u0644\u064A").length,g=d.filter(f=>f.trainingType==="\u062E\u0627\u0631\u062C\u064A").length;return{"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":l,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641":o.name||"",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:o.position||"","\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629":o.department||"","\u0639\u062F\u062F \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628":d.length,"\u062A\u062F\u0631\u064A\u0628 \u062F\u0627\u062E\u0644\u064A":p,"\u062A\u062F\u0631\u064A\u0628 \u062E\u0627\u0631\u062C\u064A":g,"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":c.toFixed(2)}}),i=XLSX.utils.book_new(),n=XLSX.utils.json_to_sheet(a);n["!cols"]=[{wch:15},{wch:25},{wch:20},{wch:20},{wch:18},{wch:15},{wch:15},{wch:20}],XLSX.utils.book_append_sheet(i,n,"\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628");const r=`\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(i,r),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628: "+t.message)}},filterItems(t="",e=""){this.ensureData();let i=AppState.appData.training||[];if(t){const s=t.toLowerCase();i=i.filter(r=>r.name&&r.name.toLowerCase().includes(s)||r.trainer&&r.trainer.toLowerCase().includes(s)||Array.isArray(r.participants)&&r.participants.some(o=>o.name&&o.name.toLowerCase().includes(s)||o.code&&o.code.includes(s)))}e&&(i=i.filter(s=>s.status===e));const n=document.querySelector("#training-table-container tbody");n&&i.length>0&&(n.innerHTML=i.map(s=>`
                <tr>
                    <td>${Utils.escapeHTML(s.name||"")}</td>
                    <td>${Utils.escapeHTML(s.trainer||"")}</td>
                    <td>${s.startDate?Utils.formatDate(s.startDate):"-"}</td>
                    <td>${this.getParticipantsCount(s)}</td>
                    <td>
                        <span class="badge badge-${s.status==="\u0645\u0643\u062A\u0645\u0644"?"success":s.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630"?"info":s.status==="\u0645\u0644\u063A\u064A"?"danger":"warning"}">
                            ${s.status||"-"}
                        </span>
                    </td>
                    <td>
                        <div class="flex items-center gap-2">
                            <button onclick="Training.viewTraining('${s.id}')" class="btn-icon btn-icon-info">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="Training.editTraining('${s.id}')" class="btn-icon btn-icon-primary">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="Training.deleteTraining('${s.id}')" class="btn-icon btn-icon-danger">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join(""))},async exportToExcel(){this.ensureData();try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u062D\u0629");return}const e=(AppState.appData.training||[]).map(r=>{const l=this.getParticipantsArray(r).map(d=>`${d.name||d.contractorName||""} (${d.code||d.employeeNumber||d.employeeCode||""})`).filter(Boolean).join("; ")||"";return{"\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C":r.name||"",\u0627\u0644\u0645\u062F\u0631\u0628:r.trainer||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621":r.startDate?Utils.formatDate(r.startDate):"","\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646":this.getParticipantsCount(r),"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646":l,\u0627\u0644\u062D\u0627\u0644\u0629:r.status||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":r.createdAt?Utils.formatDate(r.createdAt):""}}),a=XLSX.utils.book_new(),i=XLSX.utils.json_to_sheet(e);i["!cols"]=[{wch:30},{wch:20},{wch:15},{wch:15},{wch:50},{wch:15},{wch:15}],XLSX.utils.book_append_sheet(a,i,"\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A");const s=`\u0633\u062C\u0644_\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,s),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u064A \u062A\u0635\u062F\u064A\u0631 Excel:",t),Notification.error("\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+t.message)}},showTrainingReportDialog(){this.ensureData();const t=document.createElement("div");t.className="modal-overlay";const e=(AppState.appData.employees||[]).sort((r,o)=>(r.name||"").localeCompare(o.name||"")),a=(AppState.appData.contractors||[]).filter(r=>r&&r.isActive!=="inactive"&&r.isActive!==!1&&r.isActive!=="false"&&r.isActive!=="FALSE").sort((r,o)=>(r.name||"").localeCompare(o.name||"")),i=this.getAllTrainingTopics(),n=(r,o,l)=>r.map(d=>`<option value="${Utils.escapeHTML(o(d))}">${Utils.escapeHTML(l(d))}</option>`).join("");t.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-file-pdf ml-2"></i>
                        \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (PDF)
                    </h2>
                    <button class="modal-close" title="\u0625\u063A\u0644\u0627\u0642">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar-alt ml-2"></i>
                                \u0645\u0646 \u062A\u0627\u0631\u064A\u062E
                            </label>
                            <input type="date" id="training-report-start-date" class="form-input">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar-alt ml-2"></i>
                                \u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E
                            </label>
                            <input type="date" id="training-report-end-date" class="form-input">
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-users ml-2"></i>
                                \u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646
                                <span class="text-xs text-gray-500 block">\u064A\u0645\u0643\u0646 \u0627\u062E\u062A\u064A\u0627\u0631 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0648\u0638\u0641</span>
                            </label>
                            <select id="training-report-employees" class="form-input" multiple size="6">
                                ${n(e,r=>r.employeeNumber||r.sapId||"",r=>`${r.name||"\u0628\u062F\u0648\u0646 \u0627\u0633\u0645"}${r.employeeNumber?" - "+r.employeeNumber:""}`)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-people-arrows ml-2"></i>
                                \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646 / \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629
                                <span class="text-xs text-gray-500 block">\u0627\u062E\u062A\u064A\u0627\u0631\u064A</span>
                            </label>
                            <select id="training-report-contractors" class="form-input" multiple size="6">
                                ${n(a,r=>r.id||r.code||r.name||"",r=>r.name||r.company||"\u2014")}
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-book-open ml-2"></i>
                            \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629
                            <span class="text-xs text-gray-500 block">\u062D\u062F\u062F \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062A\u0636\u0645\u064A\u0646\u0647\u0627 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</span>
                        </label>
                        <select id="training-report-topics" class="form-input" multiple size="6">
                            ${i.map(r=>`<option value="${Utils.escapeHTML(r)}">${Utils.escapeHTML(r)}</option>`).join("")}
                        </select>
                    </div>
                    
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                        <i class="fas fa-info-circle ml-2"></i>
                        \u0641\u064A \u062D\u0627\u0644 \u062A\u0631\u0643 \u0623\u064A \u062D\u0642\u0644 \u0641\u0627\u0631\u063A\u060C \u0633\u064A\u062A\u0645 \u062A\u0636\u0645\u064A\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0647 \u0641\u064A \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646\u060C \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A\u060C \u2026\u0625\u0644\u062E).
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" class="btn-primary" id="generate-training-report-btn">
                        <i class="fas fa-file-export ml-2"></i>
                        \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631
                    </button>
                </div>
            </div>
        `,document.body.appendChild(t);const s=()=>t.remove();t.querySelector(".modal-close")?.addEventListener("click",s),t.querySelector('[data-action="close"]')?.addEventListener("click",s),t.addEventListener("click",r=>{r.target===t&&s()}),t.querySelector("#generate-training-report-btn")?.addEventListener("click",async()=>{const r={startDate:t.querySelector("#training-report-start-date")?.value||"",endDate:t.querySelector("#training-report-end-date")?.value||"",employees:this.getSelectedOptions("training-report-employees"),contractors:this.getSelectedOptions("training-report-contractors"),topics:this.getSelectedOptions("training-report-topics")};if(r.startDate&&r.endDate&&r.startDate>r.endDate){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}s(),await this.generateTrainingPDFReport(r)})},getSelectedOptions(t){const e=document.getElementById(t);return e?Array.from(e.selectedOptions||[]).map(a=>a.value).filter(Boolean):[]},getAllTrainingTopics(){this.ensureData();const t=new Set;(AppState.appData.training||[]).forEach(i=>{Array.isArray(i.topics)&&i.topics.forEach(n=>n&&t.add(n)),i.name&&t.add(i.name),i.subject&&t.add(i.subject)});const a=AppState.appData.trainingTopicsByRole||{};return Object.values(a).forEach(i=>{(i||[]).forEach(n=>n.topic&&t.add(n.topic))}),Array.from(t).sort((i,n)=>i.localeCompare(n))},async generateTrainingPDFReport(t={}){this.ensureData();try{Loading.show();const e=this.isCurrentUserAdmin(),a=AppState.appData.training||[],i=this.filterTrainingsForReport(a,t),n=i.length,s=i.reduce((y,x)=>y+this.getParticipantsCount(x),0),r=new Set;i.forEach(y=>{(Array.isArray(y.participants)?y.participants:[]).forEach(h=>{h?.code?r.add(h.code):h?.name&&r.add(`${h.name}-${h.company||""}`)})});const o=this.renderTrainingReportFiltersSummary(t),l=i.map((y,x)=>this.renderTrainingReportRow(y,x+1)).join(""),d=i.map(y=>this.renderTrainingReportParticipantsBlock(y)).join(""),c=`
                <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 20px; margin-bottom: 12px;">\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</h2>
                    ${o}
                    <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 16px;">
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #EFF6FF; border: 1px solid #BFDBFE;">
                            <div style="font-size: 12px; color: #1D4ED8; margin-bottom: 6px;">\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C</div>
                            <div style="font-size: 24px; font-weight: 700; color: #1E3A8A;">${n}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #ECFDF5; border: 1px solid #BBF7D0;">
                            <div style="font-size: 12px; color: #047857; margin-bottom: 6px;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</div>
                            <div style="font-size: 24px; font-weight: 700; color: #065F46;">${s}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #FEF3C7; border: 1px solid #FCD34D;">
                            <div style="font-size: 12px; color: #B45309; margin-bottom: 6px;">\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646 \u0627\u0644\u0645\u0645\u064A\u0632\u0648\u0646</div>
                            <div style="font-size: 24px; font-weight: 700; color: #92400E;">${r.size}</div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 20px; margin-bottom: 12px;">\u062C\u062F\u0648\u0644 \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #1E3A8A; color: #FFFFFF;">
                                <th style="padding: 10px; border: 1px solid #E5E7EB; text-align: center;">#</th>
                                <th style="padding: 10px; border: 1px solid #E5E7EB; text-align: right;">\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C</th>
                                <th style="padding: 10px; border: 1px solid #E5E7EB; text-align: right;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="padding: 10px; border: 1px solid #E5E7EB; text-align: right;">\u0627\u0644\u0645\u062F\u0631\u0628</th>
                                <th style="padding: 10px; border: 1px solid #E5E7EB; text-align: right;">\u0627\u0644\u0646\u0648\u0639</th>
                                <th style="padding: 10px; border: 1px solid #E5E7EB; text-align: right;">\u0627\u0644\u0645\u0643\u0627\u0646</th>
                                <th style="padding: 10px; border: 1px solid #E5E7EB; text-align: center;">\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</th>
                                <th style="padding: 10px; border: 1px solid #E5E7EB; text-align: right;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${l||'<tr><td colspan="8" style="padding: 16px; border: 1px solid #E5E7EB; text-align: center; color: #6B7280;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0631\u0627\u0645\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</td></tr>'}
                        </tbody>
                    </table>
                </div>
                
                ${d}
            `,p=`TRAINING-REPORT-${new Date().toISOString().slice(0,10)}`,g=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(p,"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628",c,!1,!0,{filters:t},t.startDate||"",t.endDate||""):`<html><body>${c}</body></html>`,f=new Blob([g],{type:"text/html;charset=utf-8"}),m=URL.createObjectURL(f),u=window.open(m,"_blank");u?u.onload=()=>{try{u.print(),setTimeout(()=>URL.revokeObjectURL(m),1e3)}catch(y){Utils.safeError("\u062A\u0639\u0630\u0631 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B:",y)}}:Notification.info("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0642\u0631\u064A\u0631. \u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636\u0647."),Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0628\u0646\u062C\u0627\u062D")}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",e),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628: "+e.message)}},filterTrainingsForReport(t,e){const a=e.startDate?new Date(e.startDate+"T00:00:00"):null,i=e.endDate?new Date(e.endDate+"T23:59:59"):null,n=new Set(e.employees||[]),s=new Set(e.contractors||[]),r=new Set((e.topics||[]).map(o=>o.toLowerCase()));return t.filter(o=>{const l=o.startDate||o.date||o.createdAt,d=l?new Date(l):null;if(a&&d&&d<a||i&&d&&d>i)return!1;if(r.size){const p=new Set;if(Array.isArray(o.topics)&&o.topics.forEach(f=>f&&p.add(f.toLowerCase())),o.name&&p.add(o.name.toLowerCase()),o.subject&&p.add(o.subject.toLowerCase()),!Array.from(r).some(f=>p.has(f)))return!1}const c=Array.isArray(o.participants)?o.participants:[];return!(n.size&&!c.some(g=>[g.code,g.employeeNumber,g.employeeCode,g.sapId].filter(Boolean).some(m=>n.has(String(m))))||s.size&&!c.some(g=>(g.type||g.personType)==="contractor"?[g.company,g.contractorCompany,g.contractorName,g.contractorId,g.id].filter(Boolean).some(m=>s.has(String(m))):!1))})},renderTrainingReportFiltersSummary(t){const e=[];return(t.startDate||t.endDate)&&e.push(`<div>\u0627\u0644\u0641\u062A\u0631\u0629: ${t.startDate?Utils.formatDate(t.startDate):"\u2014"} \u0625\u0644\u0649 ${t.endDate?Utils.formatDate(t.endDate):"\u2014"}</div>`),(t.employees||[]).length&&e.push(`<div>\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u062D\u062F\u062F\u064A\u0646: ${(t.employees||[]).length}</div>`),(t.contractors||[]).length&&e.push(`<div>\u0639\u062F\u062F \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u062A\u0639\u0627\u0642\u062F\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629: ${(t.contractors||[]).length}</div>`),(t.topics||[]).length&&e.push(`<div>\u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A: ${(t.topics||[]).map(a=>Utils.escapeHTML(a)).join("\u060C ")}</div>`),e.length?`<div style="padding: 12px 16px; border-radius: 8px; background: #F9FAFB; border: 1px solid #E5E7EB; color: #374151; font-size: 14px;">
            ${e.join("")}
        </div>`:`<div style="padding: 12px 16px; border-radius: 8px; background: #F9FAFB; border: 1px solid #E5E7EB; color: #374151; font-size: 14px;">
                \u062A\u0645 \u062A\u0636\u0645\u064A\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062F\u0648\u0646 \u062A\u0635\u0641\u064A\u0629 \u0645\u062D\u062F\u062F\u0629.
            </div>`},renderTrainingReportRow(t,e){const a=this.getParticipantsCount(t),i=t.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630"?"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":t.status||"-";let n=t.locationName||t.location||"\u2014";return!t.locationName&&t.location&&t.factory&&(n=this.getPlaceName(t.location,t.factory)||t.location||"\u2014"),`
            <tr style="${e%2===0?"background: #F9FAFB;":""}">
                <td style="padding: 8px 10px; border: 1px solid #E5E7EB; text-align: center;">${e}</td>
                <td style="padding: 8px 10px; border: 1px solid #E5E7EB;">${Utils.escapeHTML(t.name||t.subject||"\u2014")}</td>
                <td style="padding: 8px 10px; border: 1px solid #E5E7EB;">${t.startDate?Utils.formatDate(t.startDate):t.date?Utils.formatDate(t.date):"\u2014"}</td>
                <td style="padding: 8px 10px; border: 1px solid #E5E7EB;">${Utils.escapeHTML(t.trainer||"\u2014")}</td>
                <td style="padding: 8px 10px; border: 1px solid #E5E7EB;">${Utils.escapeHTML(t.trainingType||"\u062F\u0627\u062E\u0644\u064A")}</td>
                <td style="padding: 8px 10px; border: 1px solid #E5E7EB;">${Utils.escapeHTML(n)}</td>
                <td style="padding: 8px 10px; border: 1px solid #E5E7EB; text-align: center;">${a}</td>
                <td style="padding: 8px 10px; border: 1px solid #E5E7EB;">${Utils.escapeHTML(i)}</td>
            </tr>
        `},renderTrainingReportParticipantsBlock(t){const e=this.getParticipantsArray(t),a=t.name||t.subject||"\u2014",i=this.getParticipantsCount(t);if(e.length===0)return i>0?`
                    <div style="page-break-inside: avoid; margin-bottom: 24px;">
                        <h3 style="font-size: 18px; margin-bottom: 8px; color:#1E3A8A;">\u0643\u0634\u0641 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u2014 ${Utils.escapeHTML(a)}</h3>
                        <p style="padding: 12px; color: #6B7280; margin: 0;">\u0639\u062F\u062F \u0627\u0644\u0645\u0633\u062C\u0644\u064A\u0646: ${i} \u2014 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0633\u0645\u0627\u0621 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0646\u0633\u062E\u0629.</p>
                    </div>
                `:"";const n=e.map(s=>{const r=s.type==="contractor"||s.personType==="contractor"?'<span style="color:#B45309;">\u0645\u0642\u0627\u0648\u0644</span>':'<span style="color:#1D4ED8;">\u0645\u0648\u0638\u0641</span>',o=s.company||s.contractorCompany||"",l=(s.topics||[]).map(p=>`<span style="display:inline-block; background:#DBEAFE; color:#1D4ED8; padding:2px 8px; border-radius:12px; font-size:11px; margin-left:4px;">${Utils.escapeHTML(p)}</span>`).join(""),d=s.name||s.contractorName||"\u2014",c=s.code||s.employeeNumber||s.employeeCode||"";return`
                <li style="margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px solid #E5E7EB;">
                    <strong>${Utils.escapeHTML(d)}</strong>
                    <span style="color:#6B7280;">${c?" \u2022 "+Utils.escapeHTML(c):""}</span>
                    <span style="margin-right: 8px;">${r}</span>
                    ${o?`<span style="margin-right: 8px; color:#0F766E;">${Utils.escapeHTML(o)}</span>`:""}
                    ${s.position?`<span style="margin-right: 8px; color:#2563EB;">${Utils.escapeHTML(s.position)}</span>`:""}
                    ${l}
                </li>
            `}).join("");return`
            <div style="page-break-inside: avoid; margin-bottom: 24px;">
                <h3 style="font-size: 18px; margin-bottom: 8px; color:#1E3A8A;">\u0643\u0634\u0641 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u2014 ${Utils.escapeHTML(a)}</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${n}
                </ul>
            </div>
        `},async viewTraining(t){this.ensureData();const e=AppState.appData.training.find(u=>u.id===t);if(!e){Notification.error("\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}let a=e.factoryName||"";if(!a&&e.factory){const y=this.getSiteOptions().find(x=>x.id===e.factory);a=y?y.name:e.factory}let i=e.locationName||"";!i&&e.location&&(i=this.getPlaceName(e.location,e.factory));const n=e.trainingType||"\u062F\u0627\u062E\u0644\u064A",s=n==="\u062E\u0627\u0631\u062C\u064A"?"\u062E\u0627\u0631\u062C\u064A":"\u062F\u0627\u062E\u0644\u064A",r=e.startTime!=null&&String(e.startTime).trim()!=="",o=e.endTime!=null&&String(e.endTime).trim()!=="",l=r?this.cleanTime(e.startTime)||String(e.startTime).trim():"-",d=o?this.cleanTime(e.endTime)||String(e.endTime).trim():"-",c=e.hours!=null&&String(e.hours).trim()!==""?e.hours:"-",p=e.status||"",g=p==="\u0645\u0643\u062A\u0645\u0644"?"success":/تنفي/.test(p)?"info":p==="\u0645\u0644\u063A\u064A"?"danger":"warning",f=p==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630"?"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":p,m=document.createElement("div");m.className="modal-overlay",m.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-graduation-cap ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C: ${Utils.escapeHTML(e.name||"")}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 1.5rem;">
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="p-3 rounded-lg" style="background: #EFF6FF; border-right: 4px solid #3B82F6;">
                            <label class="text-sm font-semibold block mb-1" style="color: #1D4ED8;">\u0627\u0644\u0645\u062F\u0631\u0628:</label>
                            <p class="text-gray-800">${Utils.escapeHTML(e.trainer||"-")}</p>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #EFF6FF; border-right: 4px solid #3B82F6;">
                            <label class="text-sm font-semibold block mb-1" style="color: #1D4ED8;">\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:</label>
                            <span class="badge badge-${n==="\u062E\u0627\u0631\u062C\u064A"?"warning":"info"}">${Utils.escapeHTML(s)}</span>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #ECFDF5; border-right: 4px solid #10B981;">
                            <label class="text-sm font-semibold block mb-1" style="color: #047857;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u0639\u0642\u0627\u062F:</label>
                            <p class="text-gray-800 font-semibold">${e.startDate?Utils.formatDate(e.startDate):"-"}</p>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #EEF2FF; border-right: 4px solid #4F46E5;">
                            <label class="text-sm font-semibold block mb-1" style="color: #4338CA;">\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629):</label>
                            <p class="text-gray-800 font-bold" style="color: #3730A3;">${e.expiryDate?Utils.formatDate(e.expiryDate):"\u2014 (\u063A\u064A\u0631 \u0645\u062D\u062F\u062F)"}</p>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #ECFDF5; border-right: 4px solid #10B981;">
                            <label class="text-sm font-semibold block mb-1" style="color: #047857;">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                            <span class="badge badge-${g}">${Utils.escapeHTML(f||"-")}</span>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #FFFBEB; border-right: 4px solid #F59E0B;">
                            <label class="text-sm font-semibold block mb-1" style="color: #B45309;">\u0627\u0644\u0645\u0635\u0646\u0639:</label>
                            <p class="text-gray-800">${Utils.escapeHTML(a||"-")}</p>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #FFFBEB; border-right: 4px solid #F59E0B;">
                            <label class="text-sm font-semibold block mb-1" style="color: #B45309;">\u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:</label>
                            <p class="text-gray-800"><i class="fas fa-map-marker-alt ml-1 text-gray-400"></i> ${Utils.escapeHTML(i||"-")}</p>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #F5F3FF; border-right: 4px solid #8B5CF6;">
                            <label class="text-sm font-semibold block mb-1" style="color: #6D28D9;">\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621:</label>
                            <p class="text-gray-800 font-medium">${Utils.escapeHTML(l)}</p>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #F5F3FF; border-right: 4px solid #8B5CF6;">
                            <label class="text-sm font-semibold block mb-1" style="color: #6D28D9;">\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621:</label>
                            <p class="text-gray-800 font-medium">${Utils.escapeHTML(d)}</p>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #FFF1F2; border-right: 4px solid #E11D48;">
                            <label class="text-sm font-semibold block mb-1" style="color: #BE123C;">\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646:</label>
                            <p class="text-gray-800">${this.getParticipantsCount(e)}</p>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #FFF1F2; border-right: 4px solid #E11D48;">
                            <label class="text-sm font-semibold block mb-1" style="color: #BE123C;">\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628:</label>
                            <p class="text-gray-800">${Utils.escapeHTML(c)} ${c!=="-"?"\u0633\u0627\u0639\u0629":""}</p>
                        </div>
                    </div>
                    ${Array.isArray(e.participants)&&e.participants.length>0?(()=>{const u=e.participants,y=u.some(h=>h.company||h.contractorCompany),x=u.some(h=>h.type==="contractor"||h.personType==="contractor");return`
                        <div class="mt-4">
                            <label class="text-sm font-semibold text-gray-600 mb-2 block">\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646:</label>
                            <div class="bg-gray-50 rounded-lg p-3 max-h-60 overflow-y-auto">
                                <table class="w-full text-sm">
                                    <thead>
                                        <tr class="border-b border-gray-300">
                                            <th class="text-right p-2 font-semibold text-gray-700">#</th>
                                            <th class="text-right p-2 font-semibold text-gray-700">\u0627\u0644\u0627\u0633\u0645</th>
                                            <th class="text-right p-2 font-semibold text-gray-700">\u0627\u0644\u0643\u0648\u062F</th>
                                            <th class="text-right p-2 font-semibold text-gray-700">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                                            <th class="text-right p-2 font-semibold text-gray-700">\u0627\u0644\u0642\u0633\u0645</th>
                                            ${y?'<th class="text-right p-2 font-semibold text-gray-700">\u0627\u0644\u0634\u0631\u0643\u0629</th>':""}
                                            ${x?'<th class="text-right p-2 font-semibold text-gray-700">\u0627\u0644\u0646\u0648\u0639</th>':""}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${u.map((h,k)=>{const A=h.type==="contractor"||h.personType==="contractor";return`
                                            <tr class="border-b border-gray-200 hover:bg-gray-100">
                                                <td class="p-2 text-center">${k+1}</td>
                                                <td class="p-2">${Utils.escapeHTML(h.name||h.contractorName||"")}</td>
                                                <td class="p-2">${Utils.escapeHTML(h.code||h.employeeNumber||h.employeeCode||"-")}</td>
                                                <td class="p-2">${Utils.escapeHTML(h.position||"-")}</td>
                                                <td class="p-2">${Utils.escapeHTML(h.department||"-")}</td>
                                                ${y?`<td class="p-2">${Utils.escapeHTML(h.company||h.contractorCompany||"-")}</td>`:""}
                                                ${x?`<td class="p-2"><span class="badge badge-${A?"warning":"info"}">${A?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641"}</span></td>`:""}
                                            </tr>
                                        `}).join("")}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `})():""}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" class="btn-secondary" onclick="Training.printTraining('${e.id}'); this.closest('.modal-overlay').remove();" style="display: inline-flex; align-items: center; gap: 6px;">
                        <i class="fas fa-print"></i>
                        \u0627\u0644\u0637\u0628\u0627\u0639\u0629
                    </button>
                    <button class="btn-primary" onclick="Training.editTraining('${e.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(m),m.addEventListener("click",u=>{u.target===m&&m.remove()})},closeFormModal(){const t=document.getElementById("training-form-modal-overlay");t&&t.remove(),document.body.style.overflow=""},setExpiryFromStart(t){const e=document.getElementById("training-startDate"),a=document.getElementById("training-expiryDate");if(!a)return;const i=e&&e.value?new Date(e.value):new Date;if(isNaN(i.getTime()))return;const n=new Date(i);n.setMonth(n.getMonth()+t),a.value=n.toISOString().slice(0,10)},getPreviousTrainingTopics(){const t=new Set;return Array.isArray(AppState.appData.training)&&AppState.appData.training.forEach(a=>{const i=String(a.name||a.subject||a.topic||"").trim();i&&t.add(i)}),Array.isArray(AppState.appData.trainingAttendance)&&AppState.appData.trainingAttendance.forEach(a=>{const i=String(a.topic||"").trim();i&&t.add(i)}),Array.isArray(AppState.appData.annualTrainingPlans)&&AppState.appData.annualTrainingPlans.forEach(a=>{Array.isArray(a.programs)&&a.programs.forEach(i=>{const n=String(i.title||i.name||i.topic||"").trim();n&&t.add(n)})}),["\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 (PPE) \u0648\u0643\u064A\u0641\u064A\u0629 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647\u0627 \u0648\u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u064A\u0647\u0627","\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A \u0648\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0633\u0642\u0627\u0644\u0627\u062A \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062D\u0632\u0627\u0645 \u0627\u0644\u0623\u0645\u0627\u0646","\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0639\u0632\u0644 \u0648\u062A\u0623\u0645\u064A\u0646 \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u062E\u0637\u0631\u0629 (LOTO - Lockout/Tagout)","\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0645\u062E\u0627\u0637\u0631 \u0628\u064A\u0626\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0639\u0627\u0645\u0629","\u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0648\u0627\u0644\u062A\u0639\u0627\u0645\u0644 \u0641\u064A \u062D\u0627\u0644\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0648\u0627\u0644\u0637\u0648\u0627\u0631\u0626","\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629 \u0648\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u062D\u0648\u0644 \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u062D\u0631\u0643\u0629 \u0648\u0627\u0644\u0633\u064A\u0648\u0631","\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629 \u0648\u062A\u062C\u0646\u0628 \u0627\u0644\u0635\u0639\u0642 \u0648\u0641\u0635\u0644 \u0627\u0644\u062A\u064A\u0627\u0631 \u0639\u0646\u062F \u0627\u0644\u0639\u0645\u0644","\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u062A\u0639\u0627\u0645\u0644 \u0627\u0644\u0622\u0645\u0646 \u0645\u0639 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0637\u0631\u0629 \u0648\u0646\u0634\u0631\u0627\u062A SDS","\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629 (Confined Spaces) \u0648\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0647\u0627","\u0627\u0644\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0648\u0627\u0644\u0625\u0646\u0639\u0627\u0634 \u0627\u0644\u0642\u0644\u0628\u064A \u0627\u0644\u0631\u0626\u0648\u064A (CPR)","\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u0646\u0627\u0648\u0644\u0629 \u0627\u0644\u064A\u062F\u0648\u064A\u0629 \u0644\u0644\u0623\u062D\u0645\u0627\u0644 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0625\u0631\u062C\u0648\u0646\u0648\u0645\u064A\u0629 (Ergonomics)","\u0633\u0644\u0627\u0645\u0629 \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0631\u0641\u0639 \u0648\u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0623\u0648\u0646\u0627\u0634 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u0635\u0628\u064A\u0646","\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0622\u0645\u0646 (PTW - Permit to Work) \u0648\u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0646\u0641\u0630\u064A\u0646","\u0627\u0644\u0642\u064A\u0627\u062F\u0629 \u0627\u0644\u0622\u0645\u0646\u0629 \u0648\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0631\u0643\u0628\u0627\u062A \u0648\u062D\u0631\u0643\u0629 \u0627\u0644\u0631\u0627\u0641\u0639\u0627\u062A \u0627\u0644\u0634\u0648\u0643\u064A\u0629 (Forklifts)","\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0627\u0646\u0632\u0644\u0627\u0642 \u0648\u0627\u0644\u062A\u0639\u062B\u0631 \u0648\u0627\u0644\u0633\u0642\u0648\u0637 (Slips, Trips and Falls)","\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0645\u0646 \u0627\u0644\u062D\u0631\u0627\u0626\u0642 \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0623\u0646\u0648\u0627\u0639 \u0637\u0641\u0627\u064A\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0648\u062E\u0631\u0627\u0637\u064A\u0645 \u0627\u0644\u0625\u0637\u0641\u0627\u0621","\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634 \u0627\u0644\u062F\u0648\u0631\u064A \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0642\u0628\u0644 \u0628\u062F\u0621 \u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0639\u0645\u0644"].forEach(a=>t.add(a)),Array.from(t).filter(Boolean)},toggleTopicSuggestions(t){const e=document.getElementById("training-name-suggestions-popup"),a=document.getElementById("training-name-chevron");if(!e)return;const i=e.style.display==="block";(typeof t=="boolean"?t:!i)?(e.style.display="block",a&&(a.style.transform="rotate(180deg)"),this.filterTopicSuggestions(document.getElementById("training-name")?.value||"")):(e.style.display="none",a&&(a.style.transform="rotate(0deg)"))},selectTopicOption(t){const e=document.getElementById("training-name");e&&(e.value=t,e.focus()),this.toggleTopicSuggestions(!1)},filterTopicSuggestions(t){const e=document.getElementById("training-topics-list-items"),a=document.getElementById("training-topics-count");if(!e)return;const i=String(t||"").trim().toLowerCase(),n=e.querySelectorAll(".training-topic-option");let s=0;n.forEach(r=>{const o=(r.getAttribute("data-topic-text")||r.textContent||"").toLowerCase();!i||o.includes(i)?(r.style.display="flex",s++):r.style.display="none"}),a&&(a.textContent=`${s} \u0645\u0648\u0636\u0648\u0639`)},async showForm(t=null){if(this.ensureData(),typeof Permissions<"u"&&Permissions.ensureFormSettingsState)try{Permissions.ensureFormSettingsState().catch(()=>{})}catch{}this.currentEditId=t?.id||null,this.closeFormModal();const e=document.createElement("div");e.id="training-form-modal-overlay",e.className="modal-overlay training-form-modal-overlay",e.style.cssText=`
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.78);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 1050;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            overflow-y: auto;
        `,e.innerHTML=`
            <div class="training-modal-dialog" style="background: #ffffff; border-radius: 20px; max-width: 980px; width: 100%; max-height: 92vh; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35); overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.15);">
                <!-- Modal Header -->
                <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 12px; color: #ffffff;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(255, 255, 255, 0.2); display: flex; align-items: center; justify-content: center; font-size: 20px;">
                            <i class="fas fa-${t?"edit":"clipboard-user"}"></i>
                        </div>
                        <div>
                            <h2 style="font-size: 18px; font-weight: 800; margin: 0; color: #ffffff; line-height: 1.3;">
                                ${t?"\u062A\u0639\u062F\u064A\u0644 \u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628":"\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628 \u0631\u0633\u0645\u064A"}
                            </h2>
                            <div style="display: flex; align-items: center; gap: 8px; margin-top: 2px;">
                                <span style="font-size: 11px; background: rgba(255,255,255,0.25); padding: 1px 8px; border-radius: 12px; font-weight: 700;">\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 - ICAPP</span>
                                ${t?.id?`<span style="font-size: 11px; opacity: 0.9;">#${t.id}</span>`:""}
                            </div>
                        </div>
                    </div>
                    <button type="button" onclick="Training.closeFormModal()" title="\u0625\u063A\u0644\u0627\u0642" style="background: rgba(255,255,255,0.15); border: none; width: 36px; height: 36px; border-radius: 10px; color: #ffffff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Modal Body -->
                <div style="padding: 1.5rem 1.75rem; overflow-y: auto; flex: 1;">
                    ${await this.renderForm(t)}
                </div>
            </div>
        `,document.body.appendChild(e),document.body.style.overflow="hidden",e.addEventListener("click",s=>{s.target===e&&this.closeFormModal()});const a=e.querySelector("#training-form");a&&(a.onsubmit=s=>this.handleSubmit(s));const i=e.querySelector("#training-form-print-btn");i&&(i.onclick=()=>this.printAttendanceFormFromScreen()),this.initializeFormInteractions();const n=Array.isArray(t?.participants)?t.participants:[];this.loadExistingParticipants(n)},async showList(){this.closeFormModal(),this.ensureData(),this.currentEditId=null;const t=document.getElementById("training-content");t&&(t.innerHTML=await this.renderList(),this.setupEventListeners(),this.loadTrainingList())},async renderForm(t=null){const e=this.getSafetyTeamMembers({excludeSystemUsers:!0}),a=String(t?.trainer||"").trim(),i=e.some(r=>r.name===a),n=a&&!i?`<option value="${Utils.escapeHTML(a)}" selected>${Utils.escapeHTML(a)}</option>`:"",s=this.getPreviousTrainingTopics();return`
            <form id="training-form" class="space-y-5">
                <!-- 1. \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 -->
                <div class="bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/40 border border-blue-200/80 rounded-2xl p-5 shadow-xs">
                    <div class="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-blue-200/70">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md">
                                <i class="fas fa-graduation-cap text-lg"></i>
                            </div>
                            <div>
                                <h3 class="text-base font-bold text-gray-900 m-0">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A</h3>
                                <p class="text-xs text-blue-800 m-0 font-medium">\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0623\u0633\u0627\u0633\u064A \u0644\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0645\u0648\u0642\u0639</p>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100/80 text-blue-900 border border-blue-200">
                            <i class="fas fa-shield-alt ml-1.5 text-blue-600"></i> \u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629
                        </span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <!-- \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629 \u0645\u0639 \u0642\u0627\u0626\u0645\u0629 \u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0648\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0633\u0627\u0628\u0642\u0629 -->
                        <div class="md:col-span-2 relative" id="training-name-wrapper">
                            <div class="flex items-center justify-between mb-1.5">
                                <label class="block text-xs font-bold text-gray-700 m-0">
                                    <i class="fas fa-book-bookmark ml-1.5 text-blue-600"></i> \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629 / \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A *
                                </label>
                                <button type="button" onclick="Training.toggleTopicSuggestions()" class="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none p-0">
                                    <i class="fas fa-list-check"></i> \u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629 (${s.length})
                                </button>
                            </div>
                            <div class="relative flex items-center">
                                <input type="text" id="training-name" required list="training-name-datalist" class="form-input text-sm font-bold pr-3 pl-10"
                                    value="${Utils.escapeHTML(t?.name||"")}" placeholder="\u0627\u0643\u062A\u0628 \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629..."
                                    autocomplete="off">
                                <button type="button" id="training-name-toggle-btn" onclick="Training.toggleTopicSuggestions()" class="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100/80 transition-all cursor-pointer border-none bg-transparent" title="\u0639\u0631\u0636 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629">
                                    <i class="fas fa-chevron-down text-xs transition-transform duration-200" id="training-name-chevron"></i>
                                </button>
                            </div>

                            <!-- Datalist \u0644\u0645\u062A\u0635\u0641\u062D\u0627\u062A \u0627\u0644\u062C\u0648\u0627\u0644 \u0648\u0627\u0644\u0640 Native Autocomplete -->
                            <datalist id="training-name-datalist">
                                ${s.map(r=>`<option value="${Utils.escapeHTML(r)}">`).join("")}
                            </datalist>

                            <!-- \u0642\u0627\u0626\u0645\u0629 \u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0627\u0644\u0645\u0646\u0633\u062F\u0644\u0629 -->
                            <div id="training-name-suggestions-popup" class="hidden absolute right-0 left-0 mt-1.5 bg-white border-2 border-blue-200 rounded-xl shadow-2xl z-50 overflow-hidden" style="max-height: 280px; display: none;">
                                <div class="p-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 flex items-center justify-between">
                                    <span class="text-xs font-bold text-blue-900"><i class="fas fa-history ml-1 text-blue-600"></i> \u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0648\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0633\u0627\u0628\u0642\u0629 \u0645\u0639\u062A\u0645\u062F\u0629</span>
                                    <span class="text-xs text-blue-700 font-bold" id="training-topics-count">${s.length} \u0645\u0648\u0636\u0648\u0639</span>
                                </div>
                                <div class="overflow-y-auto divide-y divide-gray-100" style="max-height: 220px;" id="training-topics-list-items">
                                    ${s.map(r=>`
                                        <div class="training-topic-option p-2.5 hover:bg-blue-50/80 text-xs font-semibold text-gray-800 cursor-pointer flex items-center justify-between transition-colors" data-topic-text="${Utils.escapeHTML(r)}" onclick="Training.selectTopicOption('${Utils.escapeHTML(r).replace(/'/g,"\\'")}')">
                                            <div class="flex items-center gap-2">
                                                <i class="fas fa-check-circle text-blue-500 text-xs flex-shrink-0"></i>
                                                <span>${Utils.escapeHTML(r)}</span>
                                            </div>
                                            <span class="text-xs text-blue-600 font-bold opacity-70"><i class="fas fa-arrow-left"></i> \u0627\u062E\u062A\u064A\u0627\u0631</span>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
                        </div>

                        <!-- \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 -->
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1.5">
                                <i class="fas fa-tag ml-1.5 text-blue-600"></i> \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 *
                            </label>
                            <select id="training-type" required class="form-input text-sm font-medium">
                                <option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</option>
                                <option value="\u062F\u0627\u062E\u0644\u064A" ${t?.trainingType==="\u062F\u0627\u062E\u0644\u064A"||!t?.trainingType&&!t?"selected":""}>\u062F\u0627\u062E\u0644\u064A (\u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0646\u0634\u0623\u0629)</option>
                                <option value="\u062E\u0627\u0631\u062C\u064A" ${t?.trainingType==="\u062E\u0627\u0631\u062C\u064A"?"selected":""}>\u062E\u0627\u0631\u062C\u064A (\u062C\u0647\u0629 \u0645\u0639\u062A\u0645\u062F\u0629)</option>
                            </select>
                        </div>

                        <!-- \u0627\u0644\u0645\u0635\u0646\u0639 -->
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1.5">
                                <i class="fas fa-industry ml-1.5 text-blue-600"></i> \u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0646\u0634\u0623\u0629 *
                            </label>
                            <select id="training-factory" required class="form-input text-sm font-medium">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>
                                ${this.getSiteOptions().map(r=>`
                                    <option value="${Utils.escapeHTML(r.id)}" ${t?.factory===r.id||t?.factory===r.name?"selected":""}>${Utils.escapeHTML(r.name)}</option>
                                `).join("")}
                            </select>
                        </div>

                        <!-- \u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 -->
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1.5">
                                <i class="fas fa-map-pin ml-1.5 text-blue-600"></i> \u0645\u0643\u0627\u0646 / \u0642\u0627\u0639\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 *
                            </label>
                            <select id="training-location" required class="form-input text-sm font-medium">
                                <option value="">\u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</option>
                                ${this.getPlaceOptions(t?.factory||"").map(r=>`
                                    <option value="${Utils.escapeHTML(r.id)}" ${t?.location===r.id||t?.location===r.name?"selected":""}>${Utils.escapeHTML(r.name)}</option>
                                `).join("")}
                            </select>
                        </div>

                        <!-- \u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631 -->
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1.5">
                                <i class="fas fa-chalkboard-user ml-1.5 text-blue-600"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631 / \u0627\u0644\u0645\u062F\u0631\u0628 *
                            </label>
                            <select id="training-trainer" required class="form-input text-sm font-medium">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631</option>
                                ${n}
                                ${e.map(r=>`
                                    <option value="${Utils.escapeHTML(r.name)}" ${r.name===a?"selected":""}>
                                        ${Utils.escapeHTML(r.name)}
                                    </option>
                                `).join("")}
                            </select>
                        </div>
                    </div>
                </div>

                <!-- 2. \u0627\u0644\u062C\u062F\u0648\u0644\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629\u060C \u0627\u0644\u062A\u0648\u0642\u064A\u062A\u060C \u0648\u062D\u0633\u0627\u0628 \u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 -->
                <div class="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-slate-50 border border-indigo-200/80 rounded-2xl p-5 shadow-xs">
                    <div class="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-indigo-200/70 flex-wrap">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md">
                                <i class="fas fa-business-time text-lg"></i>
                            </div>
                            <div>
                                <h3 class="text-base font-bold text-gray-900 m-0">\u0627\u0644\u062C\u062F\u0648\u0644\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629\u060C \u0627\u0644\u062A\u0648\u0642\u064A\u062A \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</h3>
                                <p class="text-xs text-indigo-800 m-0 font-medium">\u062A\u062D\u062F\u064A\u062F \u062A\u0648\u0627\u0631\u064A\u062E \u0648\u0623\u0648\u0642\u0627\u062A \u0627\u0644\u0627\u0646\u0639\u0642\u0627\u062F \u0648\u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0648\u0627\u062D\u062A\u0633\u0627\u0628 \u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0648\u062A\u0627\u0631\u064A\u062E \u062A\u062C\u062F\u064A\u062F \u0627\u0644\u0634\u0647\u0627\u062F\u0629</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white text-indigo-900 border border-indigo-200 shadow-xs" id="training-calculated-hours-pill">
                                <i class="fas fa-hourglass-half ml-1.5 text-indigo-600"></i> \u0645\u062F\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628: <strong id="training-hours-number" class="mr-1 text-indigo-700 font-bold">${t?.hours||"0.00"}</strong> \u0633\u0627\u0639\u0629
                            </span>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <!-- \u0627\u0644\u0633\u0637\u0631 1: \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621 \u0648\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 \u0628\u062C\u0627\u0646\u0628 \u0628\u0639\u0636\u0647\u0645\u0627 \u062A\u0645\u0627\u0645\u0627\u064B (50% / 50%) -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-indigo-100 shadow-xs">
                            <!-- \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621 / \u0627\u0644\u0627\u0646\u0639\u0642\u0627\u062F -->
                            <div>
                                <label class="block text-xs font-bold text-gray-800 mb-1.5">
                                    <i class="fas fa-calendar-day ml-1.5 text-indigo-600"></i> \u062A\u0627\u0631\u064A\u062E \u0628\u062F\u0621 / \u0627\u0646\u0639\u0642\u0627\u062F \u0627\u0644\u062A\u062F\u0631\u064A\u0628 *
                                </label>
                                <input type="date" id="training-startDate" required class="form-input text-sm font-semibold"
                                    value="${t?.startDate?new Date(t.startDate).toISOString().slice(0,10):""}">
                                <p class="text-xs text-gray-400 mt-1 font-medium">\u062A\u0627\u0631\u064A\u062E \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u062C\u0644\u0633\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629</p>
                            </div>

                            <!-- \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629) \u0645\u0639 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0633\u0631\u064A\u0639 -->
                            <div>
                                <label class="block text-xs font-bold text-gray-800 mb-1.5">
                                    <i class="fas fa-calendar-check ml-1.5 text-indigo-600"></i> \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0634\u0647\u0627\u062F\u0629)
                                </label>
                                <input type="date" id="training-expiryDate" class="form-input text-sm font-semibold"
                                    value="${t?.expiryDate?new Date(t.expiryDate).toISOString().slice(0,10):""}">
                                <div class="flex items-center gap-1.5 mt-2 flex-wrap">
                                    <span class="text-xs text-gray-500 font-bold ml-1">\u062A\u062D\u062F\u064A\u062F \u0633\u0631\u064A\u0639:</span>
                                    <button type="button" onclick="Training.setExpiryFromStart(6)" class="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-all cursor-pointer">+6 \u0623\u0634\u0647\u0631</button>
                                    <button type="button" onclick="Training.setExpiryFromStart(12)" class="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-all cursor-pointer">+\u0633\u0646\u0629</button>
                                    <button type="button" onclick="Training.setExpiryFromStart(24)" class="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-all cursor-pointer">+\u0633\u0646\u062A\u064A\u0646</button>
                                    <button type="button" onclick="Training.setExpiryFromStart(36)" class="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-all cursor-pointer">+3 \u0633\u0646\u0648\u0627\u062A</button>
                                    <button type="button" onclick="document.getElementById('training-expiryDate').value=''" class="px-2 py-0.5 text-xs font-bold rounded-md bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-all cursor-pointer">\u0645\u0633\u062D</button>
                                </div>
                            </div>
                        </div>

                        <!-- \u0627\u0644\u0633\u0637\u0631 2: \u0623\u0648\u0642\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u0627\u0644\u0628\u062F\u0621 \u0648\u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621) \u0648\u062D\u0627\u0644\u0629 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0628\u062C\u0627\u0646\u0628 \u0628\u0639\u0636\u0647\u0645 -->
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-indigo-100 shadow-xs">
                            <!-- \u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621 -->
                            <div>
                                <label class="block text-xs font-bold text-gray-800 mb-1.5">
                                    <i class="fas fa-clock ml-1.5 text-indigo-600"></i> \u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621 *
                                </label>
                                <input type="time" id="training-startTime" required class="form-input text-sm font-bold text-center"
                                    value="${t?.startTime?this.cleanTime(t.startTime):""}">
                            </div>

                            <!-- \u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 -->
                            <div>
                                <label class="block text-xs font-bold text-gray-800 mb-1.5">
                                    <i class="fas fa-clock ml-1.5 text-indigo-600"></i> \u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 *
                                </label>
                                <input type="time" id="training-endTime" required class="form-input text-sm font-bold text-center"
                                    value="${t?.endTime?this.cleanTime(t.endTime):""}">
                            </div>

                            <!-- \u062D\u0627\u0644\u0629 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C -->
                            <div>
                                <label class="block text-xs font-bold text-gray-800 mb-1.5">
                                    <i class="fas fa-circle-check ml-1.5 text-indigo-600"></i> \u062D\u0627\u0644\u0629 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C *
                                </label>
                                <select id="training-status" required class="form-input text-sm font-semibold">
                                    <option value="\u0645\u062E\u0637\u0637" ${t?.status==="\u0645\u062E\u0637\u0637"||!t?.status?"selected":""}>\u0645\u062E\u0637\u0637</option>
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630" ${t?.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                    <option value="\u0645\u0643\u062A\u0645\u0644" ${t?.status==="\u0645\u0643\u062A\u0645\u0644"?"selected":""}>\u0645\u0643\u062A\u0645\u0644</option>
                                    <option value="\u0645\u0644\u063A\u064A" ${t?.status==="\u0645\u0644\u063A\u064A"?"selected":""}>\u0645\u0644\u063A\u064A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 2. \u0643\u0634\u0641 \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646 \u0645\u0646 \u0643\u0648\u0627\u062F\u0631 \u0627\u0644\u0634\u0631\u0643\u0629) -->
                <div class="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-300 rounded-2xl p-5 shadow-sm">
                    <div class="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-emerald-200 flex-wrap">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md">
                                <i class="fas fa-user-check text-lg"></i>
                            </div>
                            <div>
                                <h3 class="text-base font-bold text-gray-900 m-0">\u0643\u0634\u0641 \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</h3>
                                <p class="text-xs text-emerald-800 m-0 font-medium">\u062A\u0633\u062C\u064A\u0644 \u062D\u0636\u0648\u0631 \u0643\u0648\u0627\u062F\u0631 \u0648\u0645\u0648\u0638\u0641\u064A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <i class="fas fa-id-badge ml-1.5 text-emerald-600"></i> \u0645\u0648\u0638\u0641\u0648 \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u0642\u0637
                            </span>
                            <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-white text-emerald-900 border border-emerald-300 shadow-sm" id="participants-count-display">
                                \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0636\u0648\u0631: <strong id="participants-count-number" class="text-emerald-700 text-sm mr-1">0</strong>
                            </span>
                        </div>
                    </div>

                    <input type="hidden" id="training-participant-type" value="employee">

                    <div class="space-y-4">
                        <!-- \u0635\u0641 \u0625\u062F\u062E\u0627\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-emerald-200 shadow-xs">
                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1">
                                    <i class="fas fa-barcode ml-1 text-emerald-600"></i> \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (SAP / ID)
                                </label>
                                <div class="relative">
                                    <input type="text" id="training-participant-code" class="form-input text-sm font-semibold pr-9" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0645\u0633\u062D" autocomplete="off">
                                    <button type="button" id="training-participant-search-btn" class="absolute inset-y-0 left-0 flex items-center justify-center w-8 text-emerald-600 hover:text-emerald-800" title="\u0628\u062D\u062B \u0641\u0648\u0631\u064A">
                                        <i class="fas fa-search text-xs"></i>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1">
                                    <i class="fas fa-user ml-1 text-emerald-600"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *
                                </label>
                                <input type="text" id="training-participant-name" class="form-input text-sm font-bold" placeholder="\u0627\u0644\u0627\u0633\u0645 \u062B\u0644\u0627\u062B\u064A \u0623\u0648 \u0631\u0628\u0627\u0639\u064A" autocomplete="off">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1">
                                    <i class="fas fa-briefcase ml-1 text-emerald-600"></i> \u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A
                                </label>
                                <input type="text" id="training-participant-position" class="form-input text-sm" placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1">
                                    <i class="fas fa-building ml-1 text-emerald-600"></i> \u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645
                                </label>
                                <input type="text" id="training-participant-department" class="form-input text-sm" placeholder="\u0627\u0644\u0642\u0633\u0645 \u0623\u0648 \u0627\u0644\u0648\u062D\u062F\u0629">
                            </div>
                        </div>

                        <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u0631\u064A\u0639\u0629 \u0648\u0627\u0644\u062A\u0641\u0631\u064A\u063A -->
                        <div class="flex items-center justify-between gap-2 flex-wrap">
                            <div class="flex items-center gap-2">
                                <button type="button" id="add-participant-btn" class="btn-primary" style="padding: 0.55rem 1.3rem; font-size: 0.88rem; font-weight: 700; border-radius: 9px; background: linear-gradient(135deg, #059669 0%, #047857 100%); box-shadow: 0 3px 6px -1px rgba(5, 150, 105, 0.3);">
                                    <i class="fas fa-user-plus ml-1.5"></i> \u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0643\u0634\u0641
                                </button>
                                <button type="button" id="clear-participant-btn" class="btn-secondary" style="padding: 0.55rem 1rem; font-size: 0.85rem; border-radius: 9px;">
                                    <i class="fas fa-eraser ml-1.5"></i> \u0645\u0633\u062D \u0627\u0644\u062D\u0642\u0648\u0644
                                </button>
                            </div>
                            <span class="text-xs text-gray-500 font-medium">
                                <i class="fas fa-info-circle ml-1 text-emerald-600"></i> \u064A\u062F\u0639\u0645 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0628\u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062F\u060C \u0648\u0627\u0644\u0628\u062D\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0628\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0643\u0648\u062F
                            </span>
                        </div>

                        <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 -->
                        <div class="overflow-x-auto rounded-xl border border-emerald-200 bg-white shadow-xs" style="max-height: 280px;">
                            <table class="data-table w-full text-sm">
                                <thead>
                                    <tr style="background: #f0fdf4; border-bottom: 2px solid #bbf7d0;">
                                        <th style="width: 40px; text-align: center; color: #166534; font-weight: 700;">\u0645</th>
                                        <th style="color: #166534; font-weight: 700;">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                                        <th style="color: #166534; font-weight: 700;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                                        <th style="color: #166534; font-weight: 700;">\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                                        <th style="color: #166534; font-weight: 700;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</th>
                                        <th style="width: 70px; text-align: center; color: #166534; font-weight: 700;">\u062D\u0630\u0641</th>
                                    </tr>
                                </thead>
                                <tbody id="training-participants-table-body">
                                    <tr class="participants-empty-row">
                                        <td colspan="6" class="text-center text-gray-400 py-6">
                                            <i class="fas fa-user-clock text-2xl mb-1 text-gray-300 block"></i>
                                            \u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u0648\u0646 \u0645\u0636\u0627\u0641\u0648\u0646 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646 \u2014 \u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0644\u0627\u0633\u0645 \u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <!-- 3. \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A -->
                <div class="flex items-center justify-end gap-3 pt-4 border-t-2 border-gray-200 flex-wrap">
                    <button type="button" id="training-form-print-btn" class="btn-secondary" style="padding: 0.75rem 1.5rem; font-weight: 700; border-radius: 10px; border: 1.5px solid #6366f1; color: #4338ca;">
                        <i class="fas fa-print ml-2"></i>
                        \u0637\u0628\u0627\u0639\u0629 \u0643\u0634\u0641 \u0627\u0644\u062D\u0636\u0648\u0631
                    </button>
                    <button type="button" onclick="Training.closeFormModal()" class="btn-secondary" style="padding: 0.75rem 1.5rem; font-weight: 700; border-radius: 10px;">
                        <i class="fas fa-times ml-2"></i>
                        \u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="submit" class="btn-primary" style="padding: 0.75rem 1.8rem; font-weight: 700; border-radius: 10px; background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);">
                        <i class="fas fa-save ml-2"></i>
                        ${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062D\u0641\u0638 \u0648\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"}
                    </button>
                </div>
            </form>
        `},initializeFormInteractions(){const t=this,e=document.getElementById("training-participant-code"),a=document.getElementById("training-participant-name"),i=document.getElementById("training-participant-position"),n=document.getElementById("training-participant-department"),s=document.getElementById("training-participant-type"),r=document.getElementById("training-participant-company-container"),o=document.getElementById("training-participant-company"),l=document.getElementById("training-participant-code-hint"),d=document.getElementById("add-participant-btn"),c=document.getElementById("clear-participant-btn"),p=document.getElementById("training-participant-search-btn"),g=document.getElementById("training-factory"),f=document.getElementById("training-location");g&&f&&g.addEventListener("change",function(){const b=this.value,E=t.getPlaceOptions(b);f.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</option>',E.forEach(T=>{const L=document.createElement("option");L.value=T.id,L.textContent=T.name,f.appendChild(L)})});const m=document.getElementById("training-startTime"),u=document.getElementById("training-endTime"),y=document.getElementById("training-hours-number"),x=()=>{const b=m?.value,E=u?.value;if(b&&E)try{const T=new Date(`2000-01-01T${b}:00`),L=new Date(`2000-01-01T${E}:00`);if(L>T){const S=(L-T)/36e5;y&&(y.textContent=S.toFixed(2));return}}catch{}y&&(!b||!E)&&(y.textContent="0.00")};m&&(m.addEventListener("input",x),m.addEventListener("change",x)),u&&(u.addEventListener("input",x),u.addEventListener("change",x)),x();const h=document.getElementById("training-name");h&&h.addEventListener("input",b=>{t.filterTopicSuggestions(b.target.value);const E=document.getElementById("training-name-suggestions-popup");E&&E.style.display!=="block"&&t.toggleTopicSuggestions(!0)}),document.addEventListener("click",b=>{const E=document.getElementById("training-name-wrapper");if(E&&!E.contains(b.target)){const T=document.getElementById("training-name-suggestions-popup");T&&T.style.display==="block"&&t.toggleTopicSuggestions(!1)}});const k=(b=!1)=>{const T=(s?.value||"employee")==="employee";e&&(e.disabled=!1,e.readOnly=!1,e.placeholder=T?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0645\u0633\u062D \u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062F":"\u0631\u0642\u0645 / \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"),p&&(p.style.display=T?"flex":"none"),r&&(r.style.display=T?"none":"block"),o&&(o.required=!T,!T&&b&&o.focus()),l&&(l.textContent=T?"\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A \u062D\u0627\u0644 \u0648\u062C\u0648\u062F\u0647 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.":"\u064A\u0645\u0643\u0646 \u0625\u062F\u062E\u0627\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646 \u0645\u0646 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0623\u0648 \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u064A\u062F\u0648\u064A\u0627\u064B.")};t.updateParticipantTypeUI=(b=!1)=>k(b),s&&s.addEventListener("change",()=>k(!0)),k(!1);const A=b=>{b&&(s&&s.value!=="employee"||t.handleParticipantEmployee(b))};typeof EmployeeHelper<"u"&&(typeof EmployeeHelper.setupEmployeeCodeSearch=="function"&&EmployeeHelper.setupEmployeeCodeSearch("training-participant-code","training-participant-name",A),typeof EmployeeHelper.setupAutocomplete=="function"&&EmployeeHelper.setupAutocomplete("training-participant-name",A)),p&&p.addEventListener("click",()=>{const b=s?.value||"employee",E=e?.value.trim();if(b!=="employee"){Notification.info("\u0627\u0644\u0628\u062D\u062B \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u0642\u0637. \u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u064A\u062F\u0648\u064A\u0627\u064B.");return}E?t.lookupEmployeeByCode(E):Notification.info("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0644\u0644\u0628\u062D\u062B")}),d&&d.addEventListener("click",()=>t.addParticipantFromInputs()),c&&c.addEventListener("click",()=>t.clearParticipantInputs()),[e,a,i,n,o].forEach(b=>{b&&b.addEventListener("keydown",E=>{E.key==="Enter"&&(E.preventDefault(),t.addParticipantFromInputs())})}),t.updateParticipantsCount()},loadExistingParticipants(t=[]){const e=document.getElementById("training-participants-table-body");if(e){if(!Array.isArray(t)||t.length===0){e.innerHTML=`
                <tr class="participants-empty-row">
                    <td colspan="6" class="text-center text-gray-400 py-6"><i class="fas fa-user-clock text-2xl mb-1 text-gray-300 block"></i>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u0648\u0646 \u0645\u0636\u0627\u0641\u0648\u0646 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646 \u2014 \u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0644\u0627\u0633\u0645 \u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</td>
                </tr>
            `,this.updateParticipantsCount();return}e.innerHTML="",t.forEach(a=>{const n=a.code||a.employeeCode||a.employeeNumber||""||this.generateParticipantCode(a.name||""),r=(AppState.appData.employees||[]).find(o=>(o.employeeNumber||o.sapId)===n);this.appendParticipantRow({code:n,name:a.name||r?.name||"",position:a.position||r?.position||"",department:a.department||r?.department||"",type:"employee",company:""},{updateCount:!1,silent:!0})}),this.updateParticipantsCount()}},getParticipantInputValues(){const t=document.getElementById("training-participant-code"),e=document.getElementById("training-participant-name"),a=document.getElementById("training-participant-position"),i=document.getElementById("training-participant-department"),n=document.getElementById("training-participant-type"),s=document.getElementById("training-participant-company");return{code:t?.value.trim()||"",name:e?.value.trim()||"",position:a?.value.trim()||"",department:i?.value.trim()||"",type:n?.value==="contractor"?"contractor":"employee",company:s?.value.trim()||""}},clearParticipantInputs(){["training-participant-code","training-participant-name","training-participant-position","training-participant-department","training-participant-company"].forEach(i=>{const n=document.getElementById(i);n&&(n.value="")});const e=document.getElementById("training-participant-type");e&&(e.value="employee"),this.updateParticipantTypeUI?.();const a=document.getElementById("training-participant-code");a&&a.focus()},handleParticipantEmployee(t,e=!1){if(!t)return;const a=document.getElementById("training-participant-code"),i=document.getElementById("training-participant-name"),n=document.getElementById("training-participant-position"),s=document.getElementById("training-participant-department"),r=document.getElementById("training-participant-type"),o=document.getElementById("training-participant-company");r&&(r.value="employee",this.updateParticipantTypeUI?.()),a&&(a.value=t.employeeNumber||t.sapId||""),i&&(i.value=t.name||""),n&&(n.value=t.position||t.jobTitle||""),s&&(s.value=t.department||t.unit||""),o&&(o.value=""),e&&this.addParticipantFromInputs()},generateParticipantCode(t=""){const e=t?t.replace(/\s+/g,"-").replace(/[^A-Za-z0-9\-]/g,"").toUpperCase().slice(0,8):"MANUAL",a=Math.random().toString(36).substring(2,6).toUpperCase();return`${e||"MANUAL"}-${a}`},lookupEmployeeByCode(t){const e=String(t||"").trim();if(!e){Notification.info("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0644\u0644\u0628\u062D\u062B");return}let a=null;if(typeof EmployeeHelper<"u"&&typeof EmployeeHelper.findByTerm=="function")a=EmployeeHelper.findByTerm(e);else{const i=AppState.appData.employees||[],n=e.toLowerCase();a=i.find(s=>(s.employeeNumber||s.sapId||"").toLowerCase()===n)||null}a?(this.handleParticipantEmployee(a),Notification.success("\u062A\u0645 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0634\u0627\u0631\u0643 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")):Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0648\u0638\u0641 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F. \u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u064A\u062F\u0648\u064A\u0627\u064B.")},lookupEmployeeByName(t){const e=String(t||"").trim().toLowerCase();if(!e){Notification.info("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0627\u0631\u0643 \u0644\u0644\u0628\u062D\u062B");return}let a=[];typeof EmployeeHelper<"u"&&typeof EmployeeHelper.findMatches=="function"?a=EmployeeHelper.findMatches(e,5):a=(AppState.appData.employees||[]).filter(n=>(n.name||"").toLowerCase().includes(e)),a.length===1?(this.handleParticipantEmployee(a[0]),Notification.success("\u062A\u0645 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0634\u0627\u0631\u0643 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")):a.length>1?Notification.info("\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0646\u062A\u064A\u062C\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0648\u062F \u0628\u062F\u0642\u0629."):Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629. \u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u064A\u062F\u0648\u064A\u0627\u064B.")},addParticipantFromInputs(){const t=this.getParticipantInputValues(),e=t.type==="contractor";if(!t.name){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0627\u0631\u0643"),document.getElementById("training-participant-name")?.focus();return}if(e&&!t.company){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 \u0623\u0648 \u0627\u0644\u062C\u0647\u0629 \u0644\u0644\u0645\u0634\u0627\u0631\u0643"),document.getElementById("training-participant-company")?.focus();return}t.code||(t.code=this.generateParticipantCode(t.name||t.company||""),Notification.info(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0631\u0642\u0645 \u0645\u0624\u0642\u062A \u0644\u0644\u0645\u0634\u0627\u0631\u0643: ${t.code}`)),e||(t.company=""),this.appendParticipantRow(t)&&(this.clearParticipantInputs(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u0643 \u0625\u0644\u0649 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A"))},appendParticipantRow(t,e={}){const a=document.getElementById("training-participants-table-body");if(!a)return Notification.error("\u0639\u0646\u0635\u0631 \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),!1;const i=e.updateCount!==!1,n=e.silent===!0,s=String(t.code||t.employeeCode||t.employeeNumber||"").trim(),r=String(t.name||"").trim(),o=String(t.position||"").trim(),l=String(t.department||"").trim();if(Array.from(a.querySelectorAll("tr[data-code]")).some(f=>f.dataset.code===s))return n||Notification.warning("\u062A\u0645\u062A \u0625\u0636\u0627\u0641\u0629 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0633\u0628\u0642\u0627\u064B"),!1;const c=a.querySelectorAll("tr[data-code]").length+1,p=document.createElement("tr");p.dataset.code=s,p.dataset.name=r,p.dataset.position=o,p.dataset.department=l,p.dataset.type="employee",p.dataset.company="",p.style.borderBottom="1px solid #e2e8f0",p.innerHTML=`
            <td style="text-align: center; font-weight: 700; color: #64748b;" class="participant-row-index">${c}</td>
            <td style="font-weight: 700; color: #1e40af; font-family: monospace; font-size: 13px;">${Utils.escapeHTML(s)}</td>
            <td style="font-weight: 700; color: #0f172a;">${Utils.escapeHTML(r||"-")}</td>
            <td style="color: #334155;">${Utils.escapeHTML(o||"-")}</td>
            <td><span class="badge badge-info" style="font-size: 11px;">${Utils.escapeHTML(l||"-")}</span></td>
            <td style="text-align: center;">
                <button type="button" onclick="Training.removeParticipantRow(this)" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641 \u0645\u0646 \u0627\u0644\u0643\u0634\u0641" style="width: 28px; height: 28px;">
                    <i class="fas fa-trash-alt" style="font-size: 11px;"></i>
                </button>
            </td>
        `;const g=a.querySelector(".participants-empty-row");return g&&g.remove(),a.appendChild(p),i&&this.updateParticipantsCount(),!0},editParticipantFromRow(t){const e=t.closest("tr");if(!e)return;const a=document.getElementById("training-participant-code"),i=document.getElementById("training-participant-name"),n=document.getElementById("training-participant-position"),s=document.getElementById("training-participant-department");a&&(a.value=e.dataset.code||""),i&&(i.value=e.dataset.name||""),n&&(n.value=e.dataset.position||""),s&&(s.value=e.dataset.department||""),e.remove(),this.updateParticipantsCount(),a?.focus()},selectEmployee(t){if(!t){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0627\u0644\u0635\u062D\u064A\u062D");return}this.lookupEmployeeByCode(t)},updateParticipantsCount(){const t=document.getElementById("training-participants-table-body"),e=document.getElementById("training-participants"),a=document.getElementById("participants-count-number");if(!t)return;const i=t.querySelectorAll("tr[data-code]"),n=i.length;i.forEach((r,o)=>{const l=r.querySelector(".participant-row-index");l&&(l.textContent=o+1)}),e&&(e.value=n),a&&(a.textContent=n);let s=t.querySelector(".participants-empty-row");n===0?s||(s=document.createElement("tr"),s.className="participants-empty-row",s.innerHTML='<td colspan="6" class="text-center text-gray-400 py-6"><i class="fas fa-user-clock text-2xl mb-1 text-gray-300 block"></i>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u0648\u0646 \u0645\u0636\u0627\u0641\u0648\u0646 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646 \u2014 \u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0644\u0627\u0633\u0645 \u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</td>',t.appendChild(s)):s&&s.remove()},removeParticipantRow(t){const e=t.closest("tr");e&&(e.remove(),this.updateParticipantsCount())},syncEmployeeTrainingMatrix(t){this.ensureData(),(!AppState.appData.employeeTrainingMatrix||typeof AppState.appData.employeeTrainingMatrix!="object")&&(AppState.appData.employeeTrainingMatrix={});const e=AppState.appData.employeeTrainingMatrix;Object.keys(e).forEach(i=>{e[i]=(e[i]||[]).filter(n=>n.trainingId!==t.id),e[i].length===0&&delete e[i]}),(Array.isArray(t.participants)?t.participants:[]).forEach(i=>{const n=i.code||i.employeeNumber||"";n&&(e[n]||(e[n]=[]),e[n].push({trainingId:t.id,trainingName:t.name,trainingDate:t.startDate,trainingType:t.trainingType,status:t.status,completed:t.status==="\u0645\u0643\u062A\u0645\u0644",hours:parseFloat(t.hours)||0,trainer:t.trainer||"",location:t.location||"",topics:Array.isArray(t.topics)?t.topics:t.name?[t.name]:[]}))})},async handleSubmit(t){this.ensureData(),t.preventDefault();const e=t.target?.querySelector('button[type="submit"]')||document.querySelector('#training-form button[type="submit"]')||t.target?.closest("form")?.querySelector('button[type="submit"]');if(e&&e.disabled)return;let a="";e&&(a=e.innerHTML,e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const i=[],n=document.getElementById("training-participants-table-body");if(n&&n.querySelectorAll("tr[data-code]").forEach(S=>{const F=S.getAttribute("data-code"),D=S.getAttribute("data-name"),I=S.getAttribute("data-position")||"",v=S.getAttribute("data-department")||"",$=S.getAttribute("data-type")||"employee",M=S.getAttribute("data-company")||"",N=(AppState.appData.employees||[]).find(w=>(w.employeeNumber||w.sapId)===F);i.push({name:D,code:F,employeeNumber:F,employeeCode:F,position:I||N?.position||"",department:v||N?.department||"",workLocation:N?.workLocation||N?.location||"",type:$,personType:$,company:M||N?.company||"",contractorCompany:$==="contractor"?M||"":void 0,contractorName:$==="contractor"?D||"":void 0})}),i.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0627\u0631\u0643 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"),e&&(e.disabled=!1,e.innerHTML=a);return}let s=0;const r=document.getElementById("training-startTime")?.value,o=document.getElementById("training-endTime")?.value;if(r&&o)try{const S=new Date(`2000-01-01T${r}:00`),F=new Date(`2000-01-01T${o}:00`);if(F<=S){Notification.error("\u0648\u0642\u062A \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0628\u0639\u062F \u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0627\u064A\u0629"),e&&(e.disabled=!1,e.innerHTML=a);return}s=(F-S)/36e5}catch{Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0633\u0627\u0628 \u0645\u062F\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0623\u0648\u0642\u0627\u062A \u0627\u0644\u0645\u062F\u062E\u0644\u0629"),e&&(e.disabled=!1,e.innerHTML=a);return}const l=this.currentEditId||Utils.generateId("TRAINING"),d=document.getElementById("training-name"),c=document.getElementById("training-trainer"),p=document.getElementById("training-type"),g=document.getElementById("training-status"),f=document.getElementById("training-startDate"),m=document.getElementById("training-location"),u=document.getElementById("training-factory");if(!d||!c||!p||!g||!f||!m||!u){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const x=this.getSiteOptions().find(S=>S.id===u.value),k=this.getPlaceOptions(u.value).find(S=>S.id===m.value),A=S=>S&&S.options&&S.selectedIndex>=0?S.options[S.selectedIndex].text:"";let b=new Date().toISOString();if(f.value){const S=new Date(f.value);isNaN(S.getTime())||(b=S.toISOString())}const T=document.getElementById("training-expiryDate")?.value||"",L={id:l,name:d.value.trim(),trainer:c.value.trim(),trainingType:p.value||"\u062F\u0627\u062E\u0644\u064A",date:document.getElementById("training-date")?.value||f.value||b.split("T")[0],expiryDate:T,factory:u.value,factoryName:x?x.name:A(u),location:m.value,locationName:k?k.name:A(m),startTime:this.cleanTime(r)||"",endTime:this.cleanTime(o)||"",hours:s>0?s.toFixed(2):"",startDate:b,participants:i,participantsCount:i.length||parseInt(document.getElementById("training-participants")?.value)||0,status:g.value||"\u0645\u062E\u0637\u0637",createdAt:this.currentEditId?AppState.appData.training.find(S=>S.id===this.currentEditId)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};try{if(this.currentEditId){const I=AppState.appData.training.findIndex(v=>v.id===this.currentEditId);I!==-1&&(AppState.appData.training[I]=L,Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.training.push(L),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0628\u0646\u062C\u0627\u062D");try{this.syncEmployeeTrainingMatrix(L)}catch(I){Utils.safeWarn("syncEmployeeTrainingMatrix:",I)}let S={added:[],updated:[]};try{S=this.syncAttendanceRegistry(L)||{added:[],updated:[]}}catch(I){Utils.safeWarn("syncAttendanceRegistry:",I)}this._trainingLocalSaveTime=Date.now(),this._trainingAttendanceLocalSaveTime=Date.now(),this.closeFormModal(),this.showList(),e&&(e.disabled=!1,e.innerHTML=a),setTimeout(()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},50);const F=[...S.added||[],...S.updated||[]],D=F.length>0&&typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave?GoogleIntegration.autoSave("TrainingAttendance",F):Promise.resolve();Promise.allSettled([GoogleIntegration.autoSave("Training",[L]),GoogleIntegration.autoSave("EmployeeTrainingMatrix",AppState.appData.employeeTrainingMatrix),D]).then(I=>{const v=["Training","EmployeeTrainingMatrix","TrainingAttendance"];I.forEach(($,M)=>{$.status==="rejected"?Utils.safeWarn(`\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 ${v[M]}:`,$.reason):$.value&&$.value.success===!1&&Utils.safeWarn(`\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 ${v[M]}:`,$.value.message||$.value)})}).catch(I=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",I)})}catch(S){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+S.message),e&&(e.disabled=!1,e.innerHTML=a)}},async editTraining(t){this.currentEditId=t;const e=AppState.appData.training.find(a=>a.id===t);e&&await this.showForm(e)},async deleteTraining(t){if(!this.isCurrentUserAdminOrManager()){Notification.error("\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062D\u0630\u0641 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u0627\u0644\u062D\u0630\u0641 \u064A\u062A\u0645 \u0628\u0637\u0644\u0628 \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637.");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C\u061F

\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627.`)){Loading.show();try{if(AppState.appData.training=AppState.appData.training.filter(e=>e.id!==t),typeof window.DataManager<"u"&&window.DataManager.save?await window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled)try{const e=await GoogleIntegration.sendToAppsScript("deleteTraining",{trainingId:t,id:t});if(e&&e.success===!1)throw new Error(e.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");typeof GoogleIntegration<"u"&&GoogleIntegration.clearCache&&GoogleIntegration.clearCache("Training")}catch(e){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0645\u0646 Google Sheets\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B:",e),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("Training",AppState.appData.training).catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0641\u064A Google Sheets:",a)})}else typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("Training",AppState.appData.training).catch(e=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0641\u064A Google Sheets:",e)});Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0628\u0646\u062C\u0627\u062D"),this.loadTrainingList()}catch(e){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+e.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C:",e),this.loadTrainingList()}}},_openTrainingAttendancePrint(t,e={}){const{formCode:a="TRN-ATT",docTitle:i="\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628",createdAt:n=new Date().toISOString(),updatedAt:s=null,meta:r={},successMessage:o="\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u0636\u0648\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"}=e,l=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(a,i,t,!1,!0,Object.assign({version:"1.0"},r),n,s||n):`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${Utils.escapeHTML(i)}</title></head><body>${t}</body></html>`,d=new Blob([l],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(d),p=window.open(c,"_blank");p?p.onload=()=>{try{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>p.print()):p.print();const g=()=>{try{URL.revokeObjectURL(c)}catch{}try{p.removeEventListener("afterprint",g)}catch{}Loading.hide(),Notification.success(o)};p.addEventListener("afterprint",g),setTimeout(g,1400)}catch{setTimeout(()=>{try{URL.revokeObjectURL(c)}catch{}Loading.hide()},1400)}}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))},trainingRecordToAttendancePrintPayload(t){let e=t.locationName||"";!e&&t.location&&(e=this.getPlaceName(t.location,t.factory));let a=t.factoryName||"";if(!a&&t.factory){const l=this.getSiteOptions().find(d=>d.id===t.factory);a=l?l.name:t.factory}const i=t.startDate?Utils.formatDate(t.startDate):t.date?Utils.formatDate(t.date):"",n=(t.topics&&Array.isArray(t.topics)?t.topics.join("\u060C "):"")||"",s=this.getParticipantsArray(t).map(o=>{const l=o.type==="contractor"||o.personType==="contractor";return{code:o.code||o.employeeNumber||o.employeeCode||"\u2014",name:o.name||o.contractorName||"",typeLabel:l?"\u0645\u0642\u0627\u0648\u0644 / \u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629":"\u0645\u0648\u0638\u0641",company:l&&(o.company||o.contractorCompany)||"\u2014",position:o.position||o.jobTitle||"",department:o.department||""}}),r=t.expiryDate?Utils.formatDate(t.expiryDate):"\u2014";return{isEdit:!1,trainingType:t.trainingType||"\u062F\u0627\u062E\u0644\u064A",trainingTypeDisplay:t.trainingType||"\u062F\u0627\u062E\u0644\u064A",dateDisplay:i,expiryDateDisplay:r,factoryName:a||"",locationName:e||"",topic:t.name||t.subject||"",trainer:t.trainer||"",startTime:this.cleanTime(t.startTime)||"",endTime:this.cleanTime(t.endTime)||"",status:t.status||"\u0645\u062E\u0637\u0637",statusDisplay:t.status||"\u0645\u062E\u0637\u0637",topicsScientific:n,participants:s}},collectAttendanceFormDraftFromDOM(){const t=document.getElementById("training-type"),e=t?.value||"\u062F\u0627\u062E\u0644\u064A",a=t?.selectedOptions?.[0]?.textContent?.trim()||e,n=document.getElementById("training-startDate")?.value,s=n?Utils.formatDate(new Date(n).toISOString()):"",o=document.getElementById("training-expiryDate")?.value,l=o?Utils.formatDate(new Date(o).toISOString()):"\u2014",d=document.getElementById("training-factory")?.selectedOptions?.[0]?.textContent?.trim()||"",c=document.getElementById("training-location")?.selectedOptions?.[0]?.textContent?.trim()||"",p=document.getElementById("training-name")?.value?.trim()||"",g=document.getElementById("training-trainer"),f=(g?.value||g?.selectedOptions?.[0]?.textContent||"").trim(),m=this.cleanTime(document.getElementById("training-startTime")?.value||"")||"",u=this.cleanTime(document.getElementById("training-endTime")?.value||"")||"",y=document.getElementById("training-status"),x=y?.value||"",h=y?.selectedOptions?.[0]?.textContent?.trim()||x,k=[],A=document.getElementById("training-participants-table-body");return A&&A.querySelectorAll("tr[data-code]").forEach(b=>{const E=b.getAttribute("data-code")||"",T=b.getAttribute("data-name")||"",L=b.getAttribute("data-type")||"employee",S=b.getAttribute("data-company")||"",F=b.getAttribute("data-position")||"",D=b.getAttribute("data-department")||"",I=L==="contractor";k.push({code:E||"\u2014",name:T,typeLabel:I?"\u0645\u0642\u0627\u0648\u0644 / \u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629":"\u0645\u0648\u0638\u0641",company:I&&S||"\u2014",position:F,department:D})}),{isEdit:!!this.currentEditId,trainingType:e,trainingTypeDisplay:a,dateDisplay:s,expiryDateDisplay:l,factoryName:d,locationName:c,topic:p,trainer:f,startTime:m,endTime:u,status:x,statusDisplay:h,topicsScientific:"",participants:k}},buildTrainingAttendanceFormPrintHTML(t){const e=d=>Utils.escapeHTML(String(d??"")),a=t.isEdit?"\u062A\u0639\u062F\u064A\u0644 \u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628":"\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628",i="margin:0;font-size:1.05rem;font-weight:700;color:#1f2937;display:flex;align-items:center;gap:10px",n=d=>`width:40px;height:40px;border-radius:10px;background:${d};display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0`,s="font-size:0.8rem;font-weight:600;color:#4b5563;margin:0 0 6px 0",r="background:#f9fafb;border:2px solid #e5e7eb;border-radius:10px;padding:10px 12px;font-size:0.95rem;color:#111827;min-height:22px",o=t.participants&&t.participants.length?t.participants.map((d,c)=>`
                <tr>
                    <td style="border:1px solid #d1d5db;padding:10px 8px;text-align:center;font-size:0.85rem">${c+1}</td>
                    <td style="border:1px solid #d1d5db;padding:10px 8px;text-align:center;font-size:0.85rem;font-weight:700;color:#1e40af">${e(d.code)}</td>
                    <td style="border:1px solid #d1d5db;padding:10px 8px;text-align:right;font-size:0.85rem;font-weight:700">${e(d.name)}</td>
                    <td style="border:1px solid #d1d5db;padding:10px 8px;text-align:right;font-size:0.85rem">${e(d.position)}</td>
                    <td style="border:1px solid #d1d5db;padding:10px 8px;text-align:right;font-size:0.85rem">${e(d.department)}</td>
                    <td style="border:1px solid #d1d5db;padding:10px 8px;min-width:80px">&nbsp;</td>
                </tr>`).join(""):'<tr><td colspan="6" style="border:1px solid #d1d5db;padding:16px;text-align:center;color:#6b7280">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0634\u0627\u0631\u0643\u0648\u0646 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629</td></tr>',l=t.topicsScientific?`<div style="grid-column:1/-1;margin-top:4px"><p style="${s}">\u0627\u0644\u0645\u0627\u062F\u0629 \u0627\u0644\u0639\u0644\u0645\u064A\u0629 / \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A</p><div style="${r}">${e(t.topicsScientific)}</div></div>`:"";return`
<div class="training-attendance-print-root" style="font-family:'Cairo','Segoe UI',Tahoma,sans-serif;direction:rtl;text-align:right;color:#1f2937;-webkit-print-color-adjust:exact;print-color-adjust:exact">
  <div style="border-radius:14px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.08);border:1px solid #e5e7eb">
    <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:1.35rem 1.5rem">
      <h1 style="margin:0;font-size:1.35rem;font-weight:700;color:#fff;display:flex;align-items:center;gap:12px">
        <span style="${n("rgba(255,255,255,0.25)")}"><span style="display:block;width:10px;height:10px;background:#fff;border-radius:2px;opacity:0.95"></span></span>
        ${e(a)}
      </h1>
    </div>
    <div style="padding:1.5rem 1.5rem 1.75rem;background:#fff">
      <div style="background:linear-gradient(135deg,#eff6ff 0%,#eef2ff 100%);border:2px solid #bfdbfe;border-radius:14px;padding:1.35rem 1.25rem;margin-bottom:1.25rem">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.1rem;padding-bottom:0.65rem;border-bottom:2px solid rgba(191,219,254,0.7)">
          <div style="${n("#2563eb")}"><span style="display:block;width:10px;height:10px;background:#fff;border-radius:2px;opacity:0.95"></span></div>
          <h2 style="${i}">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 20px">
          <div><p style="${s}">\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</p><div style="${r}">${e(t.trainingTypeDisplay||t.trainingType)}</div></div>
          <div><p style="${s}">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u0639\u0642\u0627\u062F</p><div style="${r}">${e(t.dateDisplay)}</div></div>
          <div><p style="${s}">\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</p><div style="${r}">${e(t.expiryDateDisplay||"\u2014")}</div></div>
          <div><p style="${s}">\u0627\u0644\u0645\u0635\u0646\u0639</p><div style="${r}">${e(t.factoryName)}</div></div>
          <div><p style="${s}">\u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</p><div style="${r}">${e(t.locationName)}</div></div>
          <div style="grid-column:1/-1"><p style="${s}">\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629</p><div style="${r}">${e(t.topic)}</div></div>
          <div><p style="${s}">\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631</p><div style="${r}">${e(t.trainer)}</div></div>
          <div><p style="${s}">\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621</p><div style="${r}">${e(t.startTime)}</div></div>
          <div><p style="${s}">\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</p><div style="${r}">${e(t.endTime)}</div></div>
          <div><p style="${s}">\u062D\u0627\u0644\u0629 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C</p><div style="${r}">${e(t.statusDisplay||t.status)}</div></div>
          ${l}
        </div>
      </div>
      <div style="background:linear-gradient(135deg,#ecfdf5 0%,#d1fae5 100%);border:2px solid #a7f3d0;border-radius:14px;padding:1.35rem 1.25rem">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;padding-bottom:0.65rem;border-bottom:2px solid rgba(167,243,208,0.8)">
          <div style="${n("#059669")}"><span style="display:block;width:10px;height:10px;background:#fff;border-radius:2px;opacity:0.95"></span></div>
          <h2 style="${i}">\u0642\u0627\u0626\u0645\u0629 \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (${e(String((t.participants||[]).length))})</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
          <thead>
            <tr style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#fff">
              <th style="border:1px solid #047857;padding:10px 6px;text-align:center;font-weight:600;width:40px">\u0645</th>
              <th style="border:1px solid #047857;padding:10px 6px;text-align:center;font-weight:600">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
              <th style="border:1px solid #047857;padding:10px 6px;text-align:right;font-weight:600">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
              <th style="border:1px solid #047857;padding:10px 6px;text-align:right;font-weight:600">\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
              <th style="border:1px solid #047857;padding:10px 6px;text-align:right;font-weight:600">\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
              <th style="border:1px solid #047857;padding:10px 6px;text-align:center;font-weight:600;width:80px">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
        </table>
        <p style="margin:1.25rem 0 0;font-size:0.95rem;color:#374151">\u062A\u0648\u0642\u064A\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631: ________________________________ ${e(t.trainer)}</p>
      </div>
    </div>
  </div>
</div>`},printAttendanceFormFromScreen(){try{if(!document.getElementById("training-form")){Notification.warning("\u0627\u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0623\u0648\u0644\u0627\u064B");return}Loading.show();const t=this.collectAttendanceFormDraftFromDOM(),e=this.buildTrainingAttendanceFormPrintHTML(t),a=this.currentEditId?`TRN-ATT-${String(this.currentEditId).substring(0,8)}`:`TRN-ATT-DRAFT-${Date.now()}`,i=t.topic?`\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628 \u2014 ${t.topic}`:"\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628";this._openTrainingAttendancePrint(e,{formCode:a,docTitle:i,meta:{version:"1.0",source:"TrainingAttendanceForm",releaseDate:new Date().toISOString(),revisionDate:new Date().toISOString(),qrData:{type:"TrainingAttendanceForm",editId:this.currentEditId||null,topic:t.topic}},createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),successMessage:"\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u0636\u0648\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"})}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u0636\u0648\u0631:",t),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+(t?.message||""))}},async printTraining(t){this.ensureData();let e=AppState.appData.training.find(a=>a.id===t);if(!e){Notification.error("\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{if(Loading.show(),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function")try{const r=await GoogleIntegration.sendRequest({action:"getTraining",data:{trainingId:t}});r&&r.success&&r.data&&(e=r.data)}catch(r){Utils.safeWarn("\u062C\u0644\u0628 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0644\u0644\u0637\u0628\u0627\u0639\u0629:",r)}const a=this.trainingRecordToAttendancePrintPayload(e),i=this.buildTrainingAttendanceFormPrintHTML(a),n=e.isoCode||`TRN-ATT-${e.id?.substring(0,8)||"UNKNOWN"}`,s=e.name?`\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628 \u2014 ${e.name}`:"\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628";this._openTrainingAttendancePrint(i,{formCode:n,docTitle:s,meta:{version:e.version||"1.0",releaseDate:e.startDate||e.createdAt,revisionDate:e.updatedAt||e.endDate||e.startDate,qrData:{type:"Training",id:e.id,code:n,name:e.name}},createdAt:e.createdAt||e.startDate,updatedAt:e.updatedAt||e.endDate||e.createdAt,successMessage:"\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u0636\u0648\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"})}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0637\u0628\u0627\u0639\u0629:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0637\u0628\u0627\u0639\u0629: "+a.message)}},async exportTraining(t){this.ensureData();let e=AppState.appData.training.find(a=>a.id===t);if(!e){Notification.error("\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{if(Loading.show(),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function")try{const c=await GoogleIntegration.sendRequest({action:"getTraining",data:{trainingId:t}});c&&c.success&&c.data&&(e=c.data)}catch(c){Utils.safeWarn("\u062C\u0644\u0628 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0644\u0644\u062A\u0635\u062F\u064A\u0631:",c)}if(typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629");return}let a=e.locationName||"";!a&&e.location&&(a=this.getPlaceName(e.location,e.factory));let i=e.factoryName||"";if(!i&&e.factory){const p=this.getSiteOptions().find(g=>g.id===e.factory);i=p?p.name:e.factory}const n=this.getParticipantsArray(e).map(c=>{const p={"\u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0627\u0631\u0643":c.name||c.contractorName||"",\u0627\u0644\u0643\u0648\u062F:c.code||c.employeeNumber||c.employeeCode||"",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:c.position||"",\u0627\u0644\u0642\u0633\u0645:c.department||""};return(c.company||c.contractorCompany)&&(p.\u0627\u0644\u0634\u0631\u0643\u0629=c.company||c.contractorCompany||""),c.type==="contractor"||c.personType==="contractor"?p.\u0627\u0644\u0646\u0648\u0639="\u0645\u0642\u0627\u0648\u0644":p.\u0627\u0644\u0646\u0648\u0639="\u0645\u0648\u0638\u0641",p}),s=[{"\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C":e.name||"",\u0627\u0644\u0645\u062F\u0631\u0628:e.trainer||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621":e.startDate?Utils.formatDate(e.startDate):"","\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628":e.trainingType||"\u062F\u0627\u062E\u0644\u064A","\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646":this.getParticipantsCount(e),\u0627\u0644\u062D\u0627\u0644\u0629:e.status||"",\u0627\u0644\u0645\u0635\u0646\u0639:i||"",\u0627\u0644\u0645\u0643\u0627\u0646:a||"","\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621":e.startTime||"","\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":e.endTime||"","\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":e.hours||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":e.createdAt?Utils.formatDate(e.createdAt):""}],r=XLSX.utils.book_new(),o=XLSX.utils.json_to_sheet(s);if(o["!cols"]=[{wch:30},{wch:20},{wch:15},{wch:15},{wch:15},{wch:15},{wch:30},{wch:15}],XLSX.utils.book_append_sheet(r,o,"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C"),n.length>0){const c=XLSX.utils.json_to_sheet(n);c["!cols"]=[{wch:30},{wch:20}],XLSX.utils.book_append_sheet(r,c,"\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646")}const l=new Date().toISOString().slice(0,10),d=`\u0628\u0631\u0646\u0627\u0645\u062C_\u062A\u062F\u0631\u064A\u0628\u064A_${Utils.escapeHTML(e.name||"\u062A\u062F\u0631\u064A\u0628").replace(/[^\w\s]/g,"_")}_${l}.xlsx`;XLSX.writeFile(r,d),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0628\u0646\u062C\u0627\u062D")}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0635\u062F\u064A\u0631:",a),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+a.message)}},async renderAnalysisTab(){return this.isCurrentUserAdmin()?(this._tEnsureChartJS().catch(()=>{}),`
        <div id="train-analytics-root" style="font-family:inherit;">

            <!-- \u2500\u2500 \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u2500\u2500 -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#312e81 0%,#4f46e5 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(79,70,229,0.35);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-graduation-cap" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.85;">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0648\u0641\u0648\u0631\u064A \u2022 \u0641\u0644\u0627\u062A\u0631 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2022 \u062A\u0635\u062F\u064A\u0631 PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-left:2px;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${["30","90","180","365","0"].map((t,e)=>{const a=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"],i=(this._trainPeriod||"0")===t;return`<button class="train-period-btn" data-period="${t}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${i?"#fff":"rgba(255,255,255,0.15)"};color:${i?"#312e81":"#fff"};">${a[e]}</button>`}).join("")}
                    </div>
                    <button id="train-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                        <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span><span id="train-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">\u25CF</span>
                    </button>
                    <button id="train-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.3);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(0,0,0,0.5)'" onmouseout="this.style.background='rgba(0,0,0,0.3)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="train-analytics-refresh" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" title="\u062A\u062D\u062F\u064A\u062B"><i class="fas fa-sync-alt"></i></button>
                </div>
            </div>

            <!-- \u2500\u2500 \u0644\u0648\u062D\u0629 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2500\u2500 -->
            <div id="train-filter-panel" style="display:none;background:#eef2ff;border:1.5px solid #c7d2fe;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#4f46e5;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#312e81;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</span>
                        <span id="train-filter-count" style="background:#e0e7ff;color:#3730a3;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button id="train-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #c7d2fe;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;" onmouseover="this.style.background='#e0e7ff';this.style.color='#4f46e5'" onmouseout="this.style.background='#fff';this.style.color='#64748b'">
                        <i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
                    ${[{id:"train-af-status",icon:"fas fa-circle",color:"#10b981",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{id:"train-af-type",icon:"fas fa-tag",color:"#4f46e5",label:"\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{id:"train-af-trainer",icon:"fas fa-chalkboard-teacher",color:"#f59e0b",label:"\u0627\u0644\u0645\u062F\u0631\u0628"},{id:"train-af-factory",icon:"fas fa-industry",color:"#6366f1",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{id:"train-af-location",icon:"fas fa-map-marker-alt",color:"#3b82f6",label:"\u0627\u0644\u0645\u0648\u0642\u0639"}].map(t=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;"><i class="${t.icon}" style="color:${t.color};margin-left:4px;"></i>${t.label}</label>
                            <select id="${t.id}" style="width:100%;padding:7px 10px;border:1.5px solid #c7d2fe;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#4f46e5'" onblur="this.style.borderColor='#c7d2fe'">
                                <option value="">\u0627\u0644\u0643\u0644</option>
                            </select>
                        </div>
                    `).join("")}
                </div>
            </div>

            <!-- \u2500\u2500 KPI Cards \u2500\u2500 -->
            <div id="train-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <!-- \u2500\u2500 Row 1: \u0627\u0644\u062D\u0627\u0644\u0629 + \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-tasks" style="color:#4f46e5;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="train-chart-status"></canvas>
                        <div id="train-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-tag" style="color:#8b5cf6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="train-chart-type"></canvas>
                        <div id="train-chart-type-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-chart-area" style="color:#6366f1;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0632\u0645\u0646\u064A \u0644\u0644\u0628\u0631\u0627\u0645\u062C (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="train-chart-trend"></canvas>
                    <div id="train-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                </div>
            </div>

            <!-- \u2500\u2500 Row 2: \u0627\u0644\u0645\u062F\u0631\u0628\u0648\u0646 + \u0627\u0644\u0645\u0648\u0627\u0636\u064A\u0639 \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-chalkboard-teacher" style="color:#f59e0b;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="train-chart-trainer"></canvas>
                        <div id="train-chart-trainer-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-book" style="color:#10b981;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0648\u0627\u0636\u064A\u0639 (\u0623\u0639\u0644\u0649 10)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="train-chart-topic"></canvas>
                        <div id="train-chart-topic-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 Row 3: \u0627\u0644\u0645\u0635\u0646\u0639 + \u0627\u0644\u0645\u0648\u0642\u0639 \u2500\u2500 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-industry" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0646\u0639 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="train-chart-factory"></canvas>
                        <div id="train-chart-factory-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marker-alt" style="color:#3b82f6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="train-chart-location"></canvas>
                        <div id="train-chart-location-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 Row 4: \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646 \u0634\u0647\u0631\u064A\u0627\u064B \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-users" style="color:#ec4899;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646 \u0634\u0647\u0631\u064A\u0627\u064B (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="train-chart-participants"></canvas>
                    <div id="train-chart-participants-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                </div>
            </div>

            <!-- \u2500\u2500 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-gavel" style="color:#dc2626;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A</span>
                    <span style="font-size:0.72rem;color:#64748b;margin-right:6px;">\u2014 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0645\u0635\u0631\u064A \u0648\u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A \u0627\u0644\u062F\u0648\u0644\u064A\u0629</span>
                </div>
                <div style="display:grid;grid-template-columns:280px 1fr;gap:16px;padding:16px;">
                    <div style="position:relative;height:240px;">
                        <canvas id="train-chart-legal-compliance"></canvas>
                        <div id="train-chart-legal-compliance-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629</div>
                    </div>
                    <div>
                        <div id="train-legal-category-bars" style="position:relative;height:240px;">
                            <canvas id="train-chart-legal-categories"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- \u2500\u2500 \u062C\u062F\u0648\u0644 \u0623\u0639\u0644\u0649 \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u2500\u2500 -->
            <div class="content-card" style="padding:0;overflow:hidden;">
                <div style="padding:13px 18px 12px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-star" style="color:#4f46e5;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0623\u0639\u0644\u0649 \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A\u0627\u064B (\u0628\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646)</span>
                    </div>
                    <span id="train-top-count" style="background:#eef2ff;color:#3730a3;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
                </div>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
                        <thead>
                            <tr style="background:#fafafa;border-bottom:2px solid #f1f5f9;">
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u0645\u0648\u0636\u0648\u0639</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u0645\u062F\u0631\u0628</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="padding:10px 12px;text-align:right;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th style="padding:10px 12px;text-align:center;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646</th>
                                <th style="padding:10px 12px;text-align:center;font-weight:700;color:#374151;white-space:nowrap;">\u0627\u0644\u0633\u0627\u0639\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody id="train-top-tbody">
                            <tr><td colspan="8" style="padding:20px;text-align:center;color:#94a3b8;">\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644\u2026</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`):'<div class="content-card"><p class="text-center text-red-600 py-8">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p></div>'},_renderAnalysisTabLegacy(){const t=this.loadTrainingInfoCards();let e=this.calculateTrainingMetrics();const a=t.filter(n=>n.enabled!==!1);(!e||typeof e!="object")&&(Utils.safeWarn("\u26A0\uFE0F \u0645\u0642\u0627\u064A\u064A\u0633 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629"),e=this.calculateTrainingMetrics());const i=a.map(n=>{let s=e[n.metric];return s==null&&(s=0),typeof s=="string"&&s.trim()===""&&(s=0),typeof s=="number"&&s>=1e3&&(s=s.toLocaleString("en-US")),`
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl ${{blue:"bg-blue-100 text-blue-600",green:"bg-green-100 text-green-600",purple:"bg-purple-100 text-purple-600",amber:"bg-amber-100 text-amber-600",red:"bg-red-100 text-red-600",indigo:"bg-indigo-100 text-indigo-600",teal:"bg-teal-100 text-teal-600",orange:"bg-orange-100 text-orange-600",pink:"bg-pink-100 text-pink-600"}[n.color]||"bg-gray-100 text-gray-600"} flex items-center justify-center shadow-sm">
                            <i class="${n.icon} text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-gray-500 mb-1">${Utils.escapeHTML(n.title)}</p>
                            <p class="text-2xl font-bold text-gray-900" dir="ltr">${Utils.escapeHTML(String(s))}</p>
                            ${n.description?`<p class="text-xs text-gray-400 mt-1">${Utils.escapeHTML(n.description)}</p>`:""}
                        </div>
                    </div>
                </div>
            `}).join("");return`
            <!-- \u0641\u0644\u062A\u0631 \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644: \u0627\u0644\u0634\u0647\u0631 \u0623\u0648 \u0645\u0646-\u0625\u0644\u0649 -->
            <div class="content-card mb-6">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-calendar-alt ml-2"></i>\u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644</h3>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">\u0646\u0648\u0639 \u0627\u0644\u0641\u0644\u062A\u0631</label>
                            <select id="training-analysis-filter-type" class="form-input w-full">
                                <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</option>
                                <option value="month">\u0634\u0647\u0631 \u0645\u062D\u062F\u062F</option>
                                <option value="range">\u0641\u062A\u0631\u0629 (\u0645\u0646 - \u0625\u0644\u0649)</option>
                            </select>
                        </div>
                        <div id="training-analysis-month-wrap" style="display:none;">
                            <label class="block text-sm font-medium text-gray-700 mb-1">\u0627\u0644\u0634\u0647\u0631</label>
                            <select id="training-analysis-month" class="form-input w-full">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u0647\u0631</option>
                                ${this.getAnalysisMonthOptions()}
                            </select>
                        </div>
                        <div id="training-analysis-date-from-wrap" style="display:none;">
                            <label class="block text-sm font-medium text-gray-700 mb-1">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                            <input type="date" id="training-analysis-date-from" class="form-input w-full">
                        </div>
                        <div id="training-analysis-date-to-wrap" style="display:none;">
                            <label class="block text-sm font-medium text-gray-700 mb-1">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                            <input type="date" id="training-analysis-date-to" class="form-input w-full">
                        </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2"><i class="fas fa-info-circle ml-1"></i>\u0627\u0644\u0643\u0631\u0648\u062A \u0648\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u0623\u062F\u0646\u0627\u0647 \u062A\u0639\u062A\u0645\u062F \u0639\u0644\u0649 \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629.</p>
                </div>
            </div>

            <!-- \u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u0648\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 + \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u0635\u062F\u064A\u0631 -->
            <div id="training-analysis-period-reports" class="content-card mb-6" style="border:1px solid #e0e7ff; box-shadow:0 8px 30px rgba(79,70,229,0.07);">
                <div class="card-header" style="background:linear-gradient(135deg,#eef2ff 0%,#f8fafc 55%,#ecfdf5 100%); border-bottom:1px solid #e0e7ff;">
                    <h3 class="card-title"><i class="fas fa-file-export ml-2 text-indigo-600"></i>\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0648\u0627\u0644\u062A\u0635\u062F\u064A\u0631</h3>
                    <p class="text-sm text-gray-600 mt-1 max-w-4xl">\u062D\u062F\u0651\u062F \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 (\u0623\u0648 \u0627\u062A\u0628\u0639 \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644)\u060C \u0648\u0641\u0626\u0629 \u0627\u0644\u0623\u0634\u062E\u0627\u0635 (\u0645\u0648\u0638\u0641 / \u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0643\u0644)\u060C \u0648\u0627\u062E\u062A\u0631 \u0634\u062E\u0635\u0627\u064B \u0623\u0648 \u0645\u062F\u0631\u0628\u0627\u064B \u0644\u0644\u062A\u0631\u0643\u064A\u0632. \u0627\u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0627\u0644\u062A\u0635\u062F\u064A\u0631 (Excel / PDF) \u064A\u0633\u062A\u062E\u062F\u0645\u0627\u0646 \u0646\u0641\u0633 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A. PDF \u064A\u062A\u0636\u0645\u0646 \u0631\u0633\u0648\u0645\u0627\u064B \u0628\u064A\u0627\u0646\u064A\u0629 \u0625\u0636\u0627\u0641\u064A\u0629 \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0634\u062E\u0635 \u0623\u0648 \u0645\u062F\u0631\u0628 \u0645\u062D\u062F\u062F.</p>
                </div>
                <div class="card-body">
                    <div id="training-export-options-panel" class="mb-8 p-5 rounded-2xl border border-indigo-100/80 bg-white shadow-sm" style="background:linear-gradient(180deg,#ffffff 0%,#fafbff 100%);">
                        <h4 class="text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><i class="fas fa-sliders-h text-indigo-600"></i> \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0648\u0627\u0644\u062A\u0635\u062F\u064A\u0631</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-1">\u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631</label>
                                <select id="training-export-period-mode" class="form-input w-full">
                                    <option value="follow">\u0645\u0637\u0627\u0628\u0642\u0629 \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0623\u0639\u0644\u0627\u0647</option>
                                    <option value="custom">\u0641\u062A\u0631\u0629 \u0645\u062E\u0635\u0635\u0629 (\u0645\u0646 \u2014 \u0625\u0644\u0649)</option>
                                </select>
                            </div>
                            <div class="md:col-span-2 flex flex-wrap gap-3 items-end" id="training-export-custom-dates" style="display:none;">
                                <div class="flex-1 min-w-[140px]">
                                    <label class="block text-xs font-semibold text-gray-600 mb-1">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>
                                    <input type="date" id="training-export-from" class="form-input w-full">
                                </div>
                                <div class="flex-1 min-w-[140px]">
                                    <label class="block text-xs font-semibold text-gray-600 mb-1">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>
                                    <input type="date" id="training-export-to" class="form-input w-full">
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-1">\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631: \u0627\u0644\u0641\u0626\u0629</label>
                                <select id="training-export-audience" class="form-input w-full" title="\u062A\u0645\u064A\u064A\u0632 \u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u062E\u0627\u0631\u062C\u064A \u0639\u0628\u0631 personType \u0623\u0648 \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628">
                                    <option value="all">\u0627\u0644\u0643\u0644</option>
                                    <option value="employee">\u0645\u0648\u0638\u0641\u0648\u0646</option>
                                    <option value="contractor">\u0645\u0642\u0627\u0648\u0644\u0648\u0646 / \u062E\u0627\u0631\u062C\u064A\u0648\u0646</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-1">\u0634\u062E\u0635 \u0645\u062D\u062F\u062F (\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631)</label>
                                <select id="training-export-person-key" class="form-input w-full">
                                    <option value="">\u2014 \u0643\u0644 \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u2014</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-1">\u0645\u062F\u0631\u0628 \u0645\u062D\u062F\u062F (\u0627\u0644\u0628\u0631\u0627\u0645\u062C)</label>
                                <select id="training-export-trainer-key" class="form-input w-full">
                                    <option value="">\u2014 \u0643\u0644 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u2014</option>
                                </select>
                            </div>
                        </div>
                        <p class="text-xs text-gray-500 mt-3"><i class="fas fa-info-circle ml-1"></i> \u062A\u064F\u062D\u062F\u0651\u064E\u062B \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0641\u062A\u0631\u0629 \u0623\u0648 \u0627\u0644\u0641\u0626\u0629. \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u062A\u0646\u0639\u0643\u0633 \u0639\u0644\u0649 \u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0623\u062F\u0646\u0627\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.</p>
                    </div>
                    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <div class="rounded-2xl p-5 border border-indigo-100 bg-indigo-50/30 shadow-sm">
                            <h4 class="text-base font-bold text-gray-900 mb-3 flex items-center gap-2"><i class="fas fa-chalkboard-teacher text-indigo-600"></i> \u0627\u0644\u0645\u062F\u0631\u0628\u0648\u0646 \u2014 \u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C</h4>
                            <div class="flex flex-wrap items-end gap-3 mb-4">
                                <div>
                                    <label class="block text-xs font-medium text-gray-600 mb-1">\u0623\u0642\u0635\u0649 \u0639\u062F\u062F \u0641\u064A \u0627\u0644\u0639\u0631\u0636 \u0648\u0627\u0644\u062A\u0635\u062F\u064A\u0631</label>
                                    <input type="number" id="training-analysis-trainer-limit" class="form-input" style="width:110px;" min="1" max="500" value="30">
                                </div>
                                <button type="button" id="training-analysis-export-trainers-open" class="btn-primary">
                                    <i class="fas fa-file-export ml-2"></i>\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646
                                </button>
                            </div>
                            <div class="table-wrapper mb-4 rounded-xl border border-indigo-100/60 overflow-hidden" style="max-height:280px;">
                                <table class="data-table text-sm">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0631\u0628</th>
                                            <th class="text-center">\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C</th>
                                            <th class="text-center">\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</th>
                                            <th class="text-center">\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                                        </tr>
                                    </thead>
                                    <tbody id="training-analysis-trainers-tbody">
                                        <tr><td colspan="4" class="text-center text-gray-500 py-6">\u2014</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div id="training-analysis-trainers-chart-wrap" class="rounded-xl border border-indigo-100/50 bg-white p-2" style="position:relative;height:300px;">
                                <canvas id="training-analysis-trainers-chart"></canvas>
                            </div>
                        </div>
                        <div class="rounded-2xl p-5 border border-teal-100 bg-teal-50/30 shadow-sm">
                            <h4 class="text-base font-bold text-gray-900 mb-3 flex items-center gap-2"><i class="fas fa-user-friends text-teal-600"></i> \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u2014 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631</h4>
                            <div class="flex flex-wrap items-end gap-3 mb-4">
                                <div>
                                    <label class="block text-xs font-medium text-gray-600 mb-1">\u0623\u0642\u0635\u0649 \u0639\u062F\u062F \u0641\u064A \u0627\u0644\u0639\u0631\u0636 \u0648\u0627\u0644\u062A\u0635\u062F\u064A\u0631</label>
                                    <input type="number" id="training-analysis-attendees-limit" class="form-input" style="width:110px;" min="1" max="2000" value="50">
                                </div>
                                <button type="button" id="training-analysis-export-attendees-open" class="btn-primary">
                                    <i class="fas fa-file-export ml-2"></i>\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646
                                </button>
                            </div>
                            <div class="table-wrapper mb-4 rounded-xl border border-teal-100/60 overflow-hidden" style="max-height:280px;">
                                <table class="data-table text-sm">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0644\u0634\u062E\u0635</th>
                                            <th class="text-center">\u0627\u0644\u062C\u0644\u0633\u0627\u062A</th>
                                            <th class="text-center">\u0627\u0644\u0633\u0627\u0639\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody id="training-analysis-attendees-tbody">
                                        <tr><td colspan="3" class="text-center text-gray-500 py-6">\u2014</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div id="training-analysis-attendees-chart-wrap" class="rounded-xl border border-teal-100/50 bg-white p-2" style="position:relative;height:300px;">
                                <canvas id="training-analysis-attendees-chart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- \u0627\u0644\u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0629 \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u062E\u0635\u064A\u0635 -->
            <div class="content-card mb-6">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h3 class="card-title"><i class="fas fa-chart-bar ml-2"></i>\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0642\u0627\u0628\u0644 \u0644\u0644\u062A\u062E\u0635\u064A\u0635)</h3>
                        <button class="btn-primary" onclick="Training.showManageTrainingCardsModal()">
                            <i class="fas fa-cog ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0643\u0631\u0648\u062A
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div id="training-analysis-cards-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${i||'<p class="text-center text-gray-500 col-span-full">\u0644\u0627 \u062A\u0648\u062C\u062F \u0643\u0631\u0648\u062A \u0645\u0641\u0639\u0644\u0629</p>'}
                    </div>
                </div>
            </div>
            
            <!-- \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 -->
            <div class="content-card mb-6">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-cog ml-2"></i>
                        \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644
                    </h3>
                    <p class="text-sm text-gray-500 mt-2">\u0623\u0636\u0641 \u0648\u0639\u062F\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0648\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 (\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637)</p>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">\u0627\u062E\u062A\u0631 \u0627\u0644\u0628\u0646\u0648\u062F \u0644\u0644\u062A\u062D\u0644\u064A\u0644</label>
                            <div id="training-analysis-items-list" class="space-y-2 max-h-64 overflow-y-auto border rounded p-3">
                                <!-- \u0633\u064A\u062A\u0645 \u0645\u0644\u0624\u0647\u0627 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0627\u064B -->
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F \u062C\u062F\u064A\u062F</label>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <select id="training-new-analysis-dataset" class="form-input">
                                    <option value="training">\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628</option>
                                    <option value="contractorTrainings">\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</option>
                                    <option value="trainingAttendance">\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631</option>
                                </select>
                                <select id="training-new-analysis-field" class="form-input">
                                    <!-- \u0633\u064A\u062A\u0645 \u0645\u0644\u0624\u0647\u0627 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0627\u064B -->
                                </select>
                                <div id="training-custom-field-wrap" class="md:col-span-2" style="display:none;">
                                    <input type="text" id="training-new-analysis-custom-field" class="form-input" placeholder="\u0627\u0633\u0645 \u0627\u0644\u062D\u0642\u0644 (\u0645\u062B\u0627\u0644: status / trainingType)">
                                </div>
                                <input type="text" id="training-new-analysis-label" class="form-input md:col-span-2" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F (\u0645\u062B\u0627\u0644: \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629)">
                                <select id="training-new-analysis-charttype" class="form-input">
                                    <option value="auto">\u062A\u0644\u0642\u0627\u0626\u064A</option>
                                    <option value="bar">Bar</option>
                                    <option value="doughnut">Doughnut</option>
                                    <option value="pie">Pie</option>
                                    <option value="line">Line</option>
                                </select>
                                <button id="training-add-analysis-item-btn" class="btn-primary">
                                    <i class="fas fa-plus ml-2"></i>
                                    \u0625\u0636\u0627\u0641\u0629
                                </button>
                            </div>
                            <p class="text-xs text-gray-500 mt-2">
                                <i class="fas fa-info-circle ml-1"></i>
                                \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629 \u0648\u0627\u0644\u062D\u0642\u0644\u060C \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0645 "\u062D\u0642\u0644 \u0645\u062E\u0635\u0635" \u0644\u062A\u062D\u0644\u064A\u0644 \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u062C\u0648\u062F\u0629 \u062F\u0627\u062E\u0644 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0648\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 -->
            <div id="training-analysis-results" class="content-card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-chart-bar ml-2"></i>
                        \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0648\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629
                    </h3>
                </div>
                <div class="card-body">
                    <div class="empty-state">
                        <p class="text-gray-500">\u0642\u0645 \u0628\u062A\u0641\u0639\u064A\u0644/\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u0648\u062F \u0644\u0644\u062A\u062D\u0644\u064A\u0644 \u0644\u0639\u0631\u0636 \u0627\u0644\u0646\u062A\u0627\u0626\u062C.</p>
                    </div>
                </div>
            </div>
        `},loadTrainingInfoCards(){const t=this.getTrainingAnalysisStorageKeys(),e=localStorage.getItem(t.cards)||"[]";let a=[];try{const i=JSON.parse(e);if(Array.isArray(i))a=i;else throw new Error("\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0643\u0631\u0648\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629")}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0643\u0631\u0648\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0645\u0646 localStorage\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629:",i),a=[]}if(!Array.isArray(a)||a.length===0){a=this.getTrainingDefaultAnalysisCards();try{localStorage.setItem(t.cards,JSON.stringify(a))}catch(i){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0643\u0631\u0648\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0641\u064A localStorage:",i)}}return a=a.map(i=>(i.enabled===void 0&&(i.enabled=!0),{id:i.id||`card_${Date.now()}_${Math.random()}`,title:i.title||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646",icon:i.icon||"fas fa-info-circle",color:i.color||"blue",description:i.description||"",enabled:i.enabled!==!1,mode:i.mode||"metric",metric:i.metric||""})),a},calculateTrainingMetrics(){this.ensureData();const t=this.getAnalysisDateFilter();let e=Array.isArray(AppState.appData.training)?AppState.appData.training:[],a=Array.isArray(AppState.appData.contractorTrainings)?AppState.appData.contractorTrainings:[],i=Array.isArray(AppState.appData.trainingAttendance)?AppState.appData.trainingAttendance:[];t&&t.type!=="all"&&(e=this.filterRecordsByAnalysisDate(e,t,"training"),a=this.filterRecordsByAnalysisDate(a,t,"contractorTrainings"),i=this.filterRecordsByAnalysisDate(i,t,"trainingAttendance"));try{const n=this.getStatsFromTrainingsArray(e),s={total:a.length,totalParticipants:a.reduce((p,g)=>{const f=Number(g.traineesCount||g.attendees||0);return p+(Number.isFinite(f)?f:0)},0),totalHours:a.reduce((p,g)=>{const f=parseFloat(g.totalHours||g.trainingHours||0);return p+(Number.isFinite(f)?f:0)},0)},r=new Set;i.forEach(p=>{p.employeeCode&&r.add(p.employeeCode)}),e.forEach(p=>{Array.isArray(p.participants)&&p.participants.forEach(g=>{const f=g.employeeCode||g.code||g.employeeNumber||"";f&&r.add(f)})});const o=i.reduce((p,g)=>{const f=parseFloat(g.totalHours)||0;return p+(Number.isFinite(f)?f:0)},0),l=e.reduce((p,g)=>{const f=parseFloat(g.hours||g.totalHours||0);return p+(Number.isFinite(f)?f:0)},0),d=o+s.totalHours+l;return{totalTrainings:n.totalTrainings+i.length,completedTrainings:n.completedTrainings||0,totalParticipants:(n.totalParticipants||0)+i.length,contractorTrainings:s.total||0,totalTrainingHours:Number.isFinite(d)?d.toFixed(2):"0.00",uniqueEmployees:r.size||0}}catch(n){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0645\u0642\u0627\u064A\u064A\u0633 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",n),{totalTrainings:0,completedTrainings:0,totalParticipants:0,contractorTrainings:0,totalTrainingHours:"0.00",uniqueEmployees:0}}},showManageTrainingCardsModal(){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-cog ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0643\u0631\u0648\u062A \u0648\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0643\u0631\u0648\u062A -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold mb-3"><i class="fas fa-id-card ml-2"></i>\u0627\u0644\u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0629</h3>
                        <div id="training-cards-list" class="space-y-2"></div>
                        <button class="btn-secondary mt-3" onclick="Training.resetTrainingCardsToDefault()">
                            <i class="fas fa-undo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0644\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A
                        </button>
                    </div>
                    
                    <!-- \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 -->
                    <div class="border-t pt-6">
                        <h3 class="text-lg font-semibold mb-3"><i class="fas fa-chart-bar ml-2"></i>\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629</h3>
                        <div id="training-analysis-items-list" class="space-y-2"></div>
                        <button class="btn-secondary mt-3" onclick="Training.resetTrainingAnalysisItemsToDefault()">
                            <i class="fas fa-undo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0644\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-primary" onclick="Training.saveTrainingAnalysisSettings()">
                        <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0648\u062A\u062D\u062F\u064A\u062B
                    </button>
                </div>
            </div>
        `,document.body.appendChild(t),this.loadTrainingCardsUI(),this.loadTrainingAnalysisItemsUI()},loadTrainingCardsUI(){const t=this.loadTrainingInfoCards(),e=document.getElementById("training-cards-list");e&&(e.innerHTML=t.map(a=>`
            <div class="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                <label class="flex items-center cursor-pointer flex-1">
                    <input type="checkbox" class="training-card-checkbox mr-2" data-card-id="${a.id}" ${a.enabled?"checked":""}>
                    <i class="${a.icon} ml-2 text-${a.color}-600"></i>
                    <span>${Utils.escapeHTML(a.title)}</span>
                </label>
            </div>
        `).join(""))},loadTrainingAnalysisItemsUI(){const t=this.getTrainingAnalysisStorageKeys(),e=localStorage.getItem(t.items)||"[]";let a=[];try{const n=JSON.parse(e);a=Array.isArray(n)?n:[]}catch(n){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",n),a=[]}if(!Array.isArray(a)||a.length===0){a=this.getTrainingDefaultAnalysisItems();try{localStorage.setItem(t.items,JSON.stringify(a))}catch(n){Utils.safeWarn("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629:",n)}}else{let n=!1;if(a=a.map(s=>{if(!s||typeof s!="object")return s;const r=s.id==="trainings_by_month"||String(s.label||"").trim()==="\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631";return s.dataset==="training"&&s.field==="startDate"&&r?(n=!0,{...s,field:"byMonth"}):s}),n)try{localStorage.setItem(t.items,JSON.stringify(a)),this.updateTrainingAnalysisResults()}catch(s){Utils.safeWarn("\u0641\u0634\u0644 \u062D\u0641\u0638 \u062A\u0631\u062D\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",s)}}const i=document.getElementById("training-analysis-items-list");if(i){if(a.length===0){i.innerHTML='<p class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0646\u0648\u062F \u062A\u062D\u0644\u064A\u0644. \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F \u062C\u062F\u064A\u062F.</p>';return}i.innerHTML=a.map(n=>`
            <div class="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                <label class="flex items-center cursor-pointer flex-1">
                    <input type="checkbox" class="training-analysis-item-checkbox mr-2" data-item-id="${n.id}" ${n.enabled?"checked":""}>
                    <span>${Utils.escapeHTML(n.label)}</span>
                    ${n.dataset?`<span class="text-xs text-gray-400 mr-2">(${n.dataset})</span>`:""}
                </label>
                <button class="btn-icon btn-icon-danger ml-2" onclick="Training.removeTrainingAnalysisItem('${n.id}')" title="\u062D\u0630\u0641">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join(""),i.querySelectorAll(".training-analysis-item-checkbox").forEach(n=>{n.addEventListener("change",s=>{const r=s.target.getAttribute("data-item-id");this.toggleTrainingAnalysisItem(r,s.target.checked)})}),this.setupTrainingAnalysisItemForm()}},setupTrainingAnalysisItemForm(){const t=document.getElementById("training-new-analysis-dataset"),e=document.getElementById("training-new-analysis-field"),a=document.getElementById("training-custom-field-wrap"),i=document.getElementById("training-add-analysis-item-btn");if(!t||!e)return;const n=()=>{const s=t.value,l=`
                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0642\u0644</option>
                ${(this.getTrainingAnalysisFieldsMap()[s]||[]).map(d=>`<option value="${Utils.escapeHTML(d.value)}">${Utils.escapeHTML(d.label)}</option>`).join("")}
                <option value="__custom__">\u062D\u0642\u0644 \u0645\u062E\u0635\u0635...</option>
            `;Utils.setSafeHTML(e,l)};t.addEventListener("change",n),n(),e.addEventListener("change",()=>{e.value==="__custom__"?a.style.display="block":a.style.display="none"}),i&&(i.onclick=()=>this.addTrainingAnalysisItemFromUI())},getAnalysisMonthOptions(){this.ensureData();const t=new Set,e=(i,n)=>{(i||[]).forEach(s=>{const r=n(s);r&&!Number.isNaN(r.getTime())&&t.add(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`)})};e(AppState.appData.training,i=>new Date(i.startDate||i.date||i.createdAt)),e(AppState.appData.trainingAttendance,i=>new Date(i.date||i.attendanceDate||i.createdAt)),e(AppState.appData.contractorTrainings,i=>new Date(i.date||i.trainingDate||i.createdAt));const a=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];return Array.from(t).sort().reverse().map(i=>{const[n,s]=i.split("-");return`<option value="${i}">${a[parseInt(s,10)-1]} ${n}</option>`}).join("")},getTrainingAnalysisFieldsMap(){return{training:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"trainingType",label:"\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{value:"trainer",label:"\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0631\u0628"},{value:"location",label:"\u0627\u0644\u0645\u0648\u0642\u0639"},{value:"department",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],contractorTrainings:[{value:"contractorName",label:"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644"},{value:"topic",label:"\u0627\u0644\u0645\u0648\u0636\u0648\u0639"},{value:"location",label:"\u0627\u0644\u0645\u0648\u0642\u0639"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],trainingAttendance:[{value:"trainingType",label:"\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{value:"factoryName",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{value:"department",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{value:"employeeCode",label:"\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}]}},addTrainingAnalysisItemFromUI(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const t=document.getElementById("training-new-analysis-dataset"),e=document.getElementById("training-new-analysis-field"),a=document.getElementById("training-new-analysis-custom-field"),i=document.getElementById("training-new-analysis-label"),n=document.getElementById("training-new-analysis-charttype"),s=t?.value||"training";let r=e?.value||"";r==="__custom__"&&(r=(a?.value||"").trim());const o=(i?.value||"").trim(),l=n?.value||"auto";if(!r){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631/\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062D\u0642\u0644");return}if(!o){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F");return}const d=this.getTrainingAnalysisStorageKeys();let c=[];try{c=JSON.parse(localStorage.getItem(d.items)||"[]")||[]}catch{c=[]}if(Array.isArray(c)||(c=[]),c.some(f=>f.label.toLowerCase()===o.toLowerCase())){Notification?.warning?.("\u064A\u0648\u062C\u062F \u0628\u0646\u062F \u0628\u0646\u0641\u0633 \u0627\u0644\u0627\u0633\u0645 \u0645\u0633\u0628\u0642\u0627\u064B");return}const p={id:`custom_${Date.now()}`,label:o,enabled:!0,dataset:s,field:r,chartType:l};c.push(p);try{localStorage.setItem(d.items,JSON.stringify(c)),Notification?.success?.("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")}catch(f){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u0646\u062F:",f),Notification?.error?.("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0628\u0646\u062F: "+(f.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}i&&(i.value=""),a&&(a.value=""),e&&(e.value="");const g=document.getElementById("training-custom-field-wrap");g&&(g.style.display="none"),this.loadTrainingAnalysisItemsUI(),this.updateTrainingAnalysisResults()},toggleTrainingAnalysisItem(t,e){if(!this.isCurrentUserAdmin())return;const a=this.getTrainingAnalysisStorageKeys();let i=[];try{i=JSON.parse(localStorage.getItem(a.items)||"[]")||[]}catch{i=[]}const n=(Array.isArray(i)?i:[]).find(s=>s.id===t);if(n){n.enabled=e;try{localStorage.setItem(a.items,JSON.stringify(i)),this.updateTrainingAnalysisResults()}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0627\u0644\u0628\u0646\u062F:",s)}}},removeTrainingAnalysisItem(t){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0646\u062F\u061F"))return;const e=this.getTrainingAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(e.items)||"[]")||[]}catch{a=[]}const i=(Array.isArray(a)?a:[]).filter(n=>n.id!==t);try{localStorage.setItem(e.items,JSON.stringify(i)),Notification?.success?.("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F:",n),Notification?.error?.("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F: "+(n.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}this.loadTrainingAnalysisItemsUI(),this.updateTrainingAnalysisResults()},getAnalysisDateFilter(){const t=document.getElementById("training-analysis-filter-type"),e=document.getElementById("training-analysis-month"),a=document.getElementById("training-analysis-date-from"),i=document.getElementById("training-analysis-date-to"),n=t&&t.value?t.value:"all",s=e&&e.value?String(e.value).trim():"",r=a&&a.value?String(a.value).trim():"",o=i&&i.value?String(i.value).trim():"";return{type:n||"all",month:s,start:r,end:o}},getRecordDateForFilter(t,e){if(!t||typeof t!="object")return null;const a=e==="training"?t.startDate||t.date||t.createdAt:e==="contractorTrainings"?t.date||t.trainingDate||t.createdAt:e==="trainingAttendance"?t.date||t.attendanceDate||t.createdAt:t.date||t.createdAt;if(!a)return null;const i=new Date(a);return Number.isNaN(i.getTime())?null:i},filterRecordsByAnalysisDate(t,e,a){return!Array.isArray(t)||!e||e.type==="all"?t:t.filter(n=>{const s=this.getRecordDateForFilter(n,a);if(!s)return!1;if(e.type==="month"&&e.month)return`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}`===e.month;if(e.type==="range"&&(e.start||e.end)){const r=s.getTime();if(e.start){const o=new Date(e.start);if(!Number.isNaN(o.getTime())&&r<o.getTime())return!1}if(e.end){const o=new Date(e.end);if(!Number.isNaN(o.getTime())&&r>o.getTime())return!1}return!0}return!0})},getTrainingDatasetForAnalysis(t){this.ensureData();let e=[];switch(t){case"training":e=Array.isArray(AppState.appData.training)?AppState.appData.training:[];break;case"contractorTrainings":e=Array.isArray(AppState.appData.contractorTrainings)?AppState.appData.contractorTrainings:[];break;case"trainingAttendance":e=Array.isArray(AppState.appData.trainingAttendance)?AppState.appData.trainingAttendance:[];break;default:return[]}const a=this.getAnalysisDateFilter();return this.filterRecordsByAnalysisDate(e,a,t)},_trainingAnalysisFieldBucketsByMonth(t,e){const i={training:["startDate","endDate","date","createdAt"],contractorTrainings:["date","createdAt","trainingDate"],trainingAttendance:["date","createdAt","attendanceDate"]}[t];return Array.isArray(i)&&i.includes(e)},getTrainingAnalysisValue(t,e,a){if(!a||typeof a!="object")return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(e==="byMonth"){const s=t==="training"?a.startDate||a.createdAt||a.date:t==="contractorTrainings"?a.date||a.createdAt||a.trainingDate:t==="trainingAttendance"?a.date||a.createdAt||a.attendanceDate:a.createdAt||a.date||"";if(!s)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const r=new Date(s);return isNaN(r.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`}if(this._trainingAnalysisFieldBucketsByMonth(t,e)){const s=a[e];if(s==null||s==="")return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const r=new Date(s);return Number.isNaN(r.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`}if(t==="training"&&(e==="trainerName"||e==="trainer")){const s=a.trainer||a.trainerName||a.conductedBy,r=s==null||s===""?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":String(s).trim();return r&&r!=="null"&&r!=="undefined"?r:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}const i=a[e],n=i==null||i===""?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":String(i).trim();return n&&n!=="null"&&n!=="undefined"?n:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},analyzeTrainingByItem(t){const e=t.dataset,a=t.field,i=this.getTrainingDatasetForAnalysis(e),n={};let s=0;return i.forEach(r=>{const o=this.getTrainingAnalysisValue(e,a,r);n[o]=(n[o]||0)+1,s++}),Object.entries(n).map(([r,o])=>({label:r,count:o,percentage:s>0?(o/s*100).toFixed(1):"0.0"})).sort((r,o)=>o.count-r.count)},async updateTrainingAnalysisResults(){const t=document.getElementById("training-analysis-results");if(!t)return;const e=this.getTrainingAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(e.items)||"[]")||[]}catch{a=[]}const i=a.filter(r=>r.enabled);if(i.length===0){const r=t.querySelector(".card-body");r&&(r.innerHTML=`
                    <div class="empty-state">
                        <p class="text-gray-500">\u0642\u0645 \u0628\u062A\u0641\u0639\u064A\u0644/\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u0648\u062F \u0644\u0644\u062A\u062D\u0644\u064A\u0644 \u0644\u0639\u0631\u0636 \u0627\u0644\u0646\u062A\u0627\u0626\u062C.</p>
                    </div>
                `);return}let n="";for(let r=0;r<i.length;r++){const o=i[r],l=this.analyzeTrainingByItem(o);if(!l||l.length===0){n+=`
                    <div class="content-card mb-6" style="border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(15,23,42,0.06);">
                        <div class="card-header" style="background:linear-gradient(135deg,#f8fafc,#f1f5f9);border-bottom:1px solid #e2e8f0;">
                            <h3 class="card-title"><i class="fas fa-chart-bar ml-2 text-slate-600"></i>${Utils.escapeHTML(o.label)}</h3>
                        </div>
                        <div class="card-body">
                            <p class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629</p>
                        </div>
                    </div>
                `;continue}const d=l.map(({label:g,count:f,percentage:m})=>`
                <tr>
                    <td class="font-semibold">${Utils.escapeHTML(g)}</td>
                    <td class="text-center font-bold text-indigo-600">${f}</td>
                    <td class="text-center text-gray-600">${m}%</td>
                </tr>
            `).join(""),c=`training-chart-${o.id}-${r}`,p=`training-chart-container-${o.id}-${r}`;n+=`
                <div class="content-card mb-6" style="border:1px solid #e0e7ff;border-radius:16px;overflow:hidden;box-shadow:0 8px 28px rgba(79,70,229,0.08);">
                    <div class="card-header" style="background:linear-gradient(135deg,#eef2ff 0%,#faf5ff 100%);border-bottom:1px solid #e0e7ff;">
                        <h3 class="card-title"><i class="fas fa-chart-pie ml-2 text-indigo-600"></i>${Utils.escapeHTML(o.label)}</h3>
                    </div>
                    <div class="card-body" style="background:#fafbff;">
                        <div class="table-wrapper mb-4 rounded-xl border border-slate-200/80 overflow-hidden shadow-sm" style="overflow-x: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr style="background:linear-gradient(180deg,#3730a3,#4f46e5);color:#fff;">
                                        <th style="border:none;">\u0627\u0644\u0642\u064A\u0645\u0629</th>
                                        <th class="text-center" style="border:none;">\u0627\u0644\u0639\u062F\u062F</th>
                                        <th class="text-center" style="border:none;">\u0627\u0644\u0646\u0633\u0628\u0629</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${d}
                                </tbody>
                            </table>
                        </div>
                        <div id="${p}" class="rounded-xl border border-indigo-100 bg-white p-2 shadow-sm" style="position: relative; height: 350px;">
                            <canvas id="${c}"></canvas>
                        </div>
                    </div>
                </div>
            `}const s=t.querySelector(".card-body");s&&(s.innerHTML=n),setTimeout(async()=>{await this.ensureChartJSLoaded(),this.renderTrainingAnalysisCharts(i)},300)},renderAnalysisCardsHtml(t){const e=this.loadTrainingInfoCards().filter(i=>i.enabled!==!1),a={blue:"bg-blue-100 text-blue-600",green:"bg-green-100 text-green-600",purple:"bg-purple-100 text-purple-600",amber:"bg-amber-100 text-amber-600",red:"bg-red-100 text-red-600",indigo:"bg-indigo-100 text-indigo-600",teal:"bg-teal-100 text-teal-600",orange:"bg-orange-100 text-orange-600",pink:"bg-pink-100 text-pink-600"};return(!t||typeof t!="object")&&(t=this.calculateTrainingMetrics()),e.map(i=>{let n=t[i.metric];return n==null&&(n=0),typeof n=="string"&&n.trim()===""&&(n=0),typeof n=="number"&&n>=1e3&&(n=n.toLocaleString("en-US")),`<div class="content-card"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-xl ${a[i.color]||"bg-gray-100 text-gray-600"} flex items-center justify-center shadow-sm"><i class="${i.icon} text-2xl"></i></div><div class="flex-1"><p class="text-sm text-gray-500 mb-1">${Utils.escapeHTML(i.title)}</p><p class="text-2xl font-bold text-gray-900" dir="ltr">${Utils.escapeHTML(String(n))}</p>${i.description?`<p class="text-xs text-gray-400 mt-1">${Utils.escapeHTML(i.description)}</p>`:""}</div></div></div>`}).join("")||'<p class="text-center text-gray-500 col-span-full">\u0644\u0627 \u062A\u0648\u062C\u062F \u0643\u0631\u0648\u062A \u0645\u0641\u0639\u0644\u0629</p>'},refreshAnalysisTabContent(){this.refreshAnalysisCards(),this.updateTrainingAnalysisResults(),this.refreshAnalysisPeriodReports()},refreshAnalysisCards(){const t=document.getElementById("training-analysis-cards-container");if(!t)return;const e=this.calculateTrainingMetrics();t.innerHTML=this.renderAnalysisCardsHtml(e)},bindAnalysisFilterEvents(){const t=document.getElementById("training-analysis-filter-type"),e=document.getElementById("training-analysis-month-wrap"),a=document.getElementById("training-analysis-date-from-wrap"),i=document.getElementById("training-analysis-date-to-wrap"),n=document.getElementById("training-analysis-month"),s=document.getElementById("training-analysis-date-from"),r=document.getElementById("training-analysis-date-to"),o=()=>{const d=t&&t.value?t.value:"all";e&&(e.style.display=d==="month"?"block":"none"),a&&(a.style.display=d==="range"?"block":"none"),i&&(i.style.display=d==="range"?"block":"none")},l=()=>this.refreshAnalysisTabContent();t&&!t.dataset.trainingAnalysisFilterBound&&(t.addEventListener("change",()=>{o(),l()}),t.dataset.trainingAnalysisFilterBound="1"),n&&!n.dataset.trainingAnalysisFilterBound&&(n.addEventListener("change",l),n.dataset.trainingAnalysisFilterBound="1"),s&&!s.dataset.trainingAnalysisFilterBound&&(s.addEventListener("change",l),s.dataset.trainingAnalysisFilterBound="1"),r&&!r.dataset.trainingAnalysisFilterBound&&(r.addEventListener("change",l),r.dataset.trainingAnalysisFilterBound="1"),o()},getAnalysisPeriodExportSlug(){const t=this.getAnalysisDateFilter();if(!t||t.type==="all")return"all";if(t.type==="month"&&t.month)return`month_${String(t.month).replace(/[^\d-]/g,"")}`;if(t.type==="range"){const e=String(t.start||"").replace(/[^\d-]/g,""),a=String(t.end||"").replace(/[^\d-]/g,"");if(e||a)return`range_${e||"x"}_${a||"x"}`}return"filtered"},getAnalysisPeriodLabelAr(){const t=this.getAnalysisDateFilter();if(!t||t.type==="all")return"\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A";if(t.type==="month"&&t.month){const e=String(t.month).split("-"),a=e[0],i=parseInt(e[1],10),n=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];return a&&i>=1&&i<=12?`${n[i-1]} ${a}`:String(t.month)}if(t.type==="range"){const e=t.start?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(t.start):t.start:"\u2014",a=t.end?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(t.end):t.end:"\u2014";return`\u0645\u0646 ${e} \u0625\u0644\u0649 ${a}`}return"\u0641\u062A\u0631\u0629 \u0645\u062D\u062F\u062F\u0629"},_getExportDateFilterFromAnalysisDom(){const t=document.getElementById("training-export-period-mode");if((t?t.value:"follow")!=="custom")return this.getAnalysisDateFilter();const a=document.getElementById("training-export-from")?.value?.trim()||"",i=document.getElementById("training-export-to")?.value?.trim()||"";return!a&&!i?this.getAnalysisDateFilter():{type:"range",month:"",start:a,end:i}},getExportDateFilterForReports(){return this._analysisExportContext&&this._analysisExportContext.dateFilter?this._analysisExportContext.dateFilter:this._getExportDateFilterFromAnalysisDom()},_toggleTrainingExportCustomDates(){const t=document.getElementById("training-export-period-mode")?.value||"follow",e=document.getElementById("training-export-custom-dates");e&&(e.style.display=t==="custom"?"flex":"none")},_isAttendanceContractorLike(t){if(!t||typeof t!="object")return!1;const e=String(t.personType||t.participantType||t.type||"").toLowerCase();return e==="contractor"||e==="external"||String(t.trainingType||"").trim()==="\u062E\u0627\u0631\u062C\u064A"&&!String(t.employeeCode||t.code||t.employeeNumber||"").trim()},_attendancePersonRowKey(t){if(!t||typeof t!="object")return"n:\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const e=String(t.employeeCode||t.code||t.employeeNumber||"").trim(),a=String(t.employeeName||t.name||"").trim();return e?`c:${e}`:a?`n:${a}`:"n:\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},_attendanceRecordDepartmentLabel(t){return!t||typeof t!="object"?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":String(t.department??"").replace(/\s+/g," ").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},getTrainingRecordsForReportsFiltered(){this.ensureData();let t=Array.isArray(AppState.appData.training)?AppState.appData.training:[];const e=this.getExportDateFilterForReports();t=this.filterRecordsByAnalysisDate(t,e,"training");const a=this._analysisExportContext,i=a?String(a.trainerKey||"").trim():document.getElementById("training-export-trainer-key")?.value?.trim()||"";return i&&(t=t.filter(n=>this.getTrainingAnalysisValue("training","trainer",n)===i)),t},getAttendanceRecordsForReportsFiltered(){this.ensureData();let t=Array.isArray(AppState.appData.trainingAttendance)?AppState.appData.trainingAttendance:[];const e=this.getExportDateFilterForReports();t=this.filterRecordsByAnalysisDate(t,e,"trainingAttendance");const a=this._analysisExportContext,i=a?a.audience||"all":document.getElementById("training-export-audience")?.value||"all";i==="employee"?t=t.filter(r=>!this._isAttendanceContractorLike(r)):i==="contractor"&&(t=t.filter(r=>this._isAttendanceContractorLike(r)));const n=a?String(a.personKey||"").trim():document.getElementById("training-export-person-key")?.value?.trim()||"";n&&(t=t.filter(r=>this._attendancePersonRowKey(r)===n));const s=a&&a.attendanceDepartment?String(a.attendanceDepartment).trim():"";return s&&(t=t.filter(r=>this._attendanceRecordDepartmentLabel(r)===s)),t},getExportPeriodLabelAr(){const t=this.getExportDateFilterForReports();if(!t||t.type==="all")return"\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A";if(t.type==="month"&&t.month){const e=String(t.month).split("-"),a=e[0],i=parseInt(e[1],10),n=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];return a&&i>=1&&i<=12?`${n[i-1]} ${a}`:String(t.month)}if(t.type==="range"){const e=t.start?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(t.start):t.start:"\u2014",a=t.end?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(t.end):t.end:"\u2014";return`\u0645\u0646 ${e} \u0625\u0644\u0649 ${a}`}return"\u0641\u062A\u0631\u0629 \u0645\u062D\u062F\u062F\u0629"},getAnalysisPeriodExportSlugFromFilter(t){if(!t||t.type==="all")return"all";if(t.type==="month"&&t.month)return`month_${String(t.month).replace(/[^\d-]/g,"")}`;if(t.type==="range"){const e=String(t.start||"").replace(/[^\d-]/g,""),a=String(t.end||"").replace(/[^\d-]/g,"");if(e||a)return`range_${e||"x"}_${a||"x"}`}return"filtered"},getExportPeriodExportSlug(){return this.getAnalysisPeriodExportSlugFromFilter(this.getExportDateFilterForReports())},populateTrainingExportFilterSelects(){const t=document.getElementById("training-export-person-key"),e=document.getElementById("training-export-trainer-key");if(t){const a=t.value;let i=Array.isArray(AppState.appData.trainingAttendance)?AppState.appData.trainingAttendance:[];const n=this.getExportDateFilterForReports();i=this.filterRecordsByAnalysisDate(i,n,"trainingAttendance");const s=document.getElementById("training-export-audience")?.value||"all";s==="employee"?i=i.filter(l=>!this._isAttendanceContractorLike(l)):s==="contractor"&&(i=i.filter(l=>this._isAttendanceContractorLike(l)));const r=new Map;i.forEach(l=>{const d=this._attendancePersonRowKey(l);if(r.has(d))return;const c=String(l.employeeCode||l.code||l.employeeNumber||"").trim(),p=String(l.employeeName||l.name||"").trim(),g=p?c?`${p} (${c})`:p:c||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r.set(d,g)});const o=Array.from(r.entries()).sort((l,d)=>String(l[1]).localeCompare(String(d[1]),"ar"));t.innerHTML='<option value="">\u2014 \u0643\u0644 \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u2014</option>'+o.map(([l,d])=>`<option value="${Utils.escapeHTML(l)}">${Utils.escapeHTML(d)}</option>`).join(""),a&&r.has(a)&&(t.value=a)}if(e){const a=e.value;let i=Array.isArray(AppState.appData.training)?AppState.appData.training:[];const n=this.getExportDateFilterForReports();i=this.filterRecordsByAnalysisDate(i,n,"training");const s=new Set;i.forEach(o=>s.add(this.getTrainingAnalysisValue("training","trainer",o)));const r=Array.from(s).filter(o=>o&&o!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").sort((o,l)=>String(o).localeCompare(String(l),"ar"));e.innerHTML='<option value="">\u2014 \u0643\u0644 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u2014</option>'+r.map(o=>`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)}</option>`).join(""),a&&r.includes(a)&&(e.value=a)}},_buildPrintableBarChartHtml(t,e,a){if(!e||!e.length)return"";const i=Math.max(...e.map(s=>Number(s.value)||0),1),n=e.map(s=>{const r=Number(s.value)||0,o=Math.round(r/i*100);return`
                <div style="display:flex;align-items:center;margin-bottom:8px;gap:10px;direction:rtl;">
                    <div style="min-width:100px;max-width:140px;font-size:10px;text-align:right;word-break:break-word;">${Utils.escapeHTML(String(s.label))}</div>
                    <div style="flex:1;background:#f1f5f9;height:20px;border-radius:6px;overflow:hidden;">
                        <div style="width:${o}%;background:${a};height:100%;min-width:${r>0?"4px":"0"};"></div>
                    </div>
                    <div style="width:36px;font-size:11px;font-weight:700;text-align:left;">${r}</div>
                </div>`}).join("");return`
            <div style="margin:20px 0;padding:16px;border:1px solid #e2e8f0;border-radius:12px;background:#fafafa;">
                <div style="font-size:14px;font-weight:800;margin-bottom:12px;color:#0f172a;">${Utils.escapeHTML(t)}</div>
                ${n}
            </div>`},_buildTrainerMonthlyChartItems(t){const e={};return t.forEach(a=>{const i=this.getRecordDateForFilter(a,"training");if(!i)return;const n=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`;e[n]=(e[n]||0)+1}),Object.keys(e).sort().map(a=>({label:a,value:e[a]}))},_buildAttendanceMonthlyChartItems(t){const e={};return t.forEach(a=>{const i=this.getRecordDateForFilter(a,"trainingAttendance");if(!i)return;const n=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`;e[n]=(e[n]||0)+1}),Object.keys(e).sort().map(a=>({label:a,value:e[a]}))},_buildAttendanceTopicChartItems(t){const e={};return t.forEach(a=>{const i=String(a.topic||a.trainingTopic||"\u2014").trim()||"\u2014";e[i]=(e[i]||0)+1}),Object.entries(e).map(([a,i])=>({label:a,value:i})).sort((a,i)=>i.value-a.value).slice(0,12)},buildTrainerProgramsReportRows(){const t=this.getTrainingRecordsForReportsFiltered(),e={};return t.forEach(a=>{const i=this.getTrainingAnalysisValue("training","trainer",a);e[i]||(e[i]={trainer:i,programs:0,participants:0,hoursTotal:0}),e[i].programs+=1,e[i].participants+=this.getParticipantsCount(a),e[i].hoursTotal+=this.getTrainingProgramHours(a)}),Object.values(e).sort((a,i)=>i.programs-a.programs||i.hoursTotal-a.hoursTotal||i.participants-a.participants||String(a.trainer).localeCompare(String(i.trainer),"ar"))},buildAttendancePersonsReportRows(){const t=this.getAttendanceRecordsForReportsFiltered(),e={};return t.forEach(a=>{if(!a||typeof a!="object")return;const i=this._attendancePersonRowKey(a),n=String(a.employeeCode||a.code||a.employeeNumber||"").trim(),s=String(a.employeeName||a.name||"").trim(),r=s?n?`${s} (${n})`:s:n||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";e[i]||(e[i]={person:r,sessions:0,totalHours:0}),e[i].sessions+=1;const o=parseFloat(a.totalHours);e[i].totalHours+=Number.isFinite(o)?o:0}),Object.values(e).sort((a,i)=>i.sessions-a.sessions||i.totalHours-a.totalHours||String(a.person).localeCompare(String(i.person),"ar"))},_destroyAnalysisPeriodCharts(){this._analysisPeriodCharts&&Object.values(this._analysisPeriodCharts).forEach(t=>{t&&typeof t.destroy=="function"&&t.destroy()}),this._analysisPeriodCharts={}},async refreshAnalysisPeriodReports(){const t=document.getElementById("training-analysis-trainers-tbody"),e=document.getElementById("training-analysis-attendees-tbody"),a=document.getElementById("training-analysis-trainers-chart"),i=document.getElementById("training-analysis-attendees-chart");if(!t||!e)return;this._toggleTrainingExportCustomDates(),this.populateTrainingExportFilterSelects();const n=Math.min(500,Math.max(1,parseInt(document.getElementById("training-analysis-trainer-limit")?.value||"30",10)||30)),s=Math.min(2e3,Math.max(1,parseInt(document.getElementById("training-analysis-attendees-limit")?.value||"50",10)||50)),r=this.buildTrainerProgramsReportRows(),o=this.buildAttendancePersonsReportRows(),l=r.slice(0,n),d=o.slice(0,s);if(l.length===0?t.innerHTML='<tr><td colspan="4" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0631\u0627\u0645\u062C \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629</td></tr>':t.innerHTML=l.map(g=>`
                <tr>
                    <td class="font-medium">${Utils.escapeHTML(g.trainer)}</td>
                    <td class="text-center font-bold text-indigo-600">${g.programs}</td>
                    <td class="text-center text-gray-700">${g.participants}</td>
                    <td class="text-center text-gray-800 font-semibold" dir="ltr">${Number.isFinite(g.hoursTotal)?g.hoursTotal.toFixed(2):"0.00"}</td>
                </tr>
            `).join(""),d.length===0?e.innerHTML='<tr><td colspan="3" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u0636\u0648\u0631 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629</td></tr>':e.innerHTML=d.map(g=>`
                <tr>
                    <td class="font-medium">${Utils.escapeHTML(g.person)}</td>
                    <td class="text-center font-bold text-teal-600">${g.sessions}</td>
                    <td class="text-center text-gray-700">${Number.isFinite(g.totalHours)?g.totalHours.toFixed(2):"0.00"}</td>
                </tr>
            `).join(""),await this.ensureChartJSLoaded(),typeof Chart>"u")return;this._destroyAnalysisPeriodCharts();const c=(g,f,m,u,y)=>{if(!g||!f.length)return;const x=g.parentElement;x&&(x.style.display=f.length?"block":"none");try{this._analysisPeriodCharts[g.id]=new Chart(g,{type:"bar",data:{labels:f,datasets:[{label:u,data:m,backgroundColor:y.slice(0,f.length)}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{precision:0}},x:{ticks:{maxRotation:45,minRotation:0,autoSkip:!0,maxTicksLimit:16}}}}})}catch(h){Utils.safeError("\u062E\u0637\u0623 \u0631\u0633\u0645 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0641\u062A\u0631\u0629:",h)}},p=this.getChartColors(Math.max(l.length,d.length,10)).map(g=>g.replace("0.6","0.75"));a&&(l.length===0?a.parentElement.style.display="none":(a.parentElement.style.display="block",c(a,l.map(g=>g.trainer),l.map(g=>g.programs),"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C",p))),i&&(d.length===0?i.parentElement.style.display="none":(i.parentElement.style.display="block",c(i,d.map(g=>g.person),d.map(g=>g.sessions),"\u0639\u062F\u062F \u0627\u0644\u062C\u0644\u0633\u0627\u062A",p)))},bindAnalysisPeriodReportsEvents(){const t=document.getElementById("training-analysis-period-reports");if(!t||t.dataset.bound==="1")return;t.dataset.bound="1";const e=document.getElementById("training-analysis-trainer-limit"),a=document.getElementById("training-analysis-attendees-limit"),i=document.getElementById("training-analysis-export-trainers-open"),n=document.getElementById("training-analysis-export-attendees-open"),s=(m,u)=>{let y;return()=>{clearTimeout(y),y=setTimeout(m,u)}},r=s(()=>this.refreshAnalysisPeriodReports(),350);e&&e.addEventListener("change",()=>this.refreshAnalysisPeriodReports()),a&&a.addEventListener("change",()=>this.refreshAnalysisPeriodReports()),e&&e.addEventListener("input",r),a&&a.addEventListener("input",r),i&&i.addEventListener("click",()=>this.showTrainingAnalysisExportDialog("trainers")),n&&n.addEventListener("click",()=>this.showTrainingAnalysisExportDialog("attendees"));const o=document.getElementById("training-export-period-mode"),l=document.getElementById("training-export-from"),d=document.getElementById("training-export-to"),c=document.getElementById("training-export-audience"),p=document.getElementById("training-export-person-key"),g=document.getElementById("training-export-trainer-key"),f=s(()=>this.refreshAnalysisPeriodReports(),320);o&&!o.dataset.exportBound&&(o.addEventListener("change",()=>{this._toggleTrainingExportCustomDates(),f()}),o.dataset.exportBound="1"),[l,d,c].forEach(m=>{m&&!m.dataset.exportBound&&(m.addEventListener("change",f),m.dataset.exportBound="1")}),p&&!p.dataset.exportBound&&(p.addEventListener("change",f),p.dataset.exportBound="1"),g&&!g.dataset.exportBound&&(g.addEventListener("change",f),g.dataset.exportBound="1")},exportAnalysisTrainersExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629");return}const t=this._analysisExportContext,e=t&&typeof t.limitTrainers=="number"?Math.min(500,Math.max(1,t.limitTrainers)):Math.min(500,Math.max(1,parseInt(document.getElementById("training-analysis-trainer-limit")?.value||"30",10)||30)),a=this.buildTrainerProgramsReportRows().slice(0,e);if(!a.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629");return}const i=this.getExportPeriodExportSlug(),n=a.map(l=>({"\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0631\u0628":l.trainer,"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629":l.programs,"\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646":l.participants,"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":Number.isFinite(l.hoursTotal)?Number(l.hoursTotal.toFixed(2)):0})),s=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(n);if(XLSX.utils.book_append_sheet(s,r,"\u0627\u0644\u0645\u062F\u0631\u0628\u0648\u0646"),t?String(t.trainerKey||"").trim():document.getElementById("training-export-trainer-key")?.value?.trim()||""){const l=this.getTrainingRecordsForReportsFiltered().map((d,c)=>({\u0645:c+1,\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C:d.name||d.subject||d.topic||"\u2014","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621":d.startDate?Utils.formatDate?Utils.formatDate(d.startDate):d.startDate:"\u2014",\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646:this.getParticipantsCount(d),"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":this.getTrainingProgramHours(d),\u0627\u0644\u062D\u0627\u0644\u0629:d.status||"\u2014"}));l.length&&XLSX.utils.book_append_sheet(s,XLSX.utils.json_to_sheet(l),"\u0628\u0631\u0627\u0645\u062C_\u0627\u0644\u0645\u062F\u0631\u0628")}XLSX.writeFile(s,`\u062A\u0642\u0631\u064A\u0631_\u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646_${i}_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646")},exportAnalysisAttendeesExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629");return}const t=this._analysisExportContext,e=t&&typeof t.limitAttendees=="number"?Math.min(2e3,Math.max(1,t.limitAttendees)):Math.min(2e3,Math.max(1,parseInt(document.getElementById("training-analysis-attendees-limit")?.value||"50",10)||50)),a=this.buildAttendancePersonsReportRows().slice(0,e);if(!a.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629");return}const i=this.getExportPeriodExportSlug(),n=a.map(l=>({\u0627\u0644\u0634\u062E\u0635:l.person,"\u0639\u062F\u062F \u062C\u0644\u0633\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":l.sessions,"\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0633\u0627\u0639\u0627\u062A":Number.isFinite(l.totalHours)?l.totalHours.toFixed(2):"0.00"})),s=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(n);if(XLSX.utils.book_append_sheet(s,r,"\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u0648\u0646"),t?String(t.personKey||"").trim():document.getElementById("training-export-person-key")?.value?.trim()||""){const l=this.getAttendanceRecordsForReportsFiltered().map((d,c)=>({\u0645:c+1,\u0627\u0644\u062A\u0627\u0631\u064A\u062E:d.date?Utils.formatDate?Utils.formatDate(d.date):d.date:"",\u0627\u0644\u0645\u0648\u0636\u0648\u0639:d.topic||"\u2014","\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628":d.trainingType||"\u2014",\u0627\u0644\u0625\u062F\u0627\u0631\u0629:this._attendanceRecordDepartmentLabel(d),\u0627\u0644\u0645\u0635\u0646\u0639:d.factoryName||d.factory||"",\u0627\u0644\u0645\u062D\u0627\u0636\u0631:d.trainerName||d.trainer||"",\u0627\u0644\u0633\u0627\u0639\u0627\u062A:Number.isFinite(parseFloat(d.totalHours))?parseFloat(d.totalHours).toFixed(2):"0.00"}));l.length&&XLSX.utils.book_append_sheet(s,XLSX.utils.json_to_sheet(l),"\u062A\u0641\u0635\u064A\u0644_\u0627\u0644\u062C\u0644\u0633\u0627\u062A")}XLSX.writeFile(s,`\u062A\u0642\u0631\u064A\u0631_\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646_${i}_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646")},_analysisPeriodPdfTableRows(t){return t.map((e,a)=>`
                <tr style="${a%2===0?"background-color: #FFFFFF;":"background-color: #F9FAFB;"}">
                    ${e.map(i=>`<td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; line-height: 1.5;">${Utils.escapeHTML(String(i))}</td>`).join("")}
                </tr>
            `).join("")},exportAnalysisTrainersPDF(){const t=this._analysisExportContext,e=t&&typeof t.limitTrainers=="number"?Math.min(500,Math.max(1,t.limitTrainers)):Math.min(500,Math.max(1,parseInt(document.getElementById("training-analysis-trainer-limit")?.value||"30",10)||30)),a=this.buildTrainerProgramsReportRows().slice(0,e);if(!a.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 PDF...");const i=this.getExportPeriodLabelAr(),n=this.getExportPeriodExportSlug(),s=t?String(t.trainerKey||"").trim():document.getElementById("training-export-trainer-key")?.value?.trim()||"",r=["\u0645","\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0631\u0628","\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629","\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646","\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628"],o=a.map((p,g)=>[g+1,p.trainer,p.programs,p.participants,Number.isFinite(p.hoursTotal)?p.hoursTotal.toFixed(2):"0.00"]),l=this._analysisPeriodPdfTableRows(o);let d="";if(s){const p=this.getTrainingRecordsForReportsFiltered(),g=this._buildTrainerMonthlyChartItems(p);g.length&&(d+=this._buildPrintableBarChartHtml(`\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631 \u2014 ${s}`,g,"#4f46e5"))}const c=`
                <div style="margin-bottom: 20px;">
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #EEF2FF; border: 1px solid #C7D2FE;">
                            <div style="font-size: 12px; color: #4338CA; font-weight: 600;">\u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
                            <div style="font-size: 15px; font-weight: 700; color: #312E81;">${Utils.escapeHTML(i)}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #ECFDF5; border: 1px solid #BBF7D0;">
                            <div style="font-size: 12px; color: #047857; font-weight: 600;">\u0639\u062F\u062F \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u0641\u064A \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
                            <div style="font-size: 22px; font-weight: 800; color: #065F46;">${a.length}</div>
                        </div>
                        ${s?`<div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #FEF3C7; border: 1px solid #FCD34D;">
                            <div style="font-size: 12px; color: #B45309; font-weight: 600;">\u0645\u062F\u0631\u0628 \u0645\u062D\u062F\u062F</div>
                            <div style="font-size: 15px; font-weight: 700; color: #92400E;">${Utils.escapeHTML(s)}</div>
                        </div>`:""}
                    </div>
                </div>
                <div style="margin-bottom: 16px;">
                    <h2 style="font-size: 18px; margin-bottom: 12px; color: #312E81; font-weight: 700; border-bottom: 3px solid #4F46E5; padding-bottom: 8px;">\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u0648\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C</h2>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 11px; direction: rtl;">
                            <thead>
                                <tr style="background: #312E81; color: #FFFFFF;">
                                    ${r.map(p=>`<th style="padding: 12px 8px; border: 1px solid #1E1B4B; font-weight: 700;">${Utils.escapeHTML(p)}</th>`).join("")}
                                </tr>
                            </thead>
                            <tbody>${l}</tbody>
                        </table>
                    </div>
                </div>
                ${d}
                <p style="font-size: 11px; color: #6B7280;">\u064A\u064F\u062D\u0633\u0628 \u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0645\u0646 \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0636\u0645\u0646 \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631. \xAB\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646\xBB \u0647\u0648 \u0645\u062C\u0645\u0648\u0639 \u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646 \u0641\u064A \u062A\u0644\u0643 \u0627\u0644\u0628\u0631\u0627\u0645\u062C.</p>
            `;this._openTrainingAttendancePrint(c,{formCode:`TRN-ANL-TRAINERS-${n}-${new Date().toISOString().slice(0,10)}`,docTitle:"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u2014 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628",meta:{period:i,rowCount:a.length,reportType:"training_analysis_trainers"},successMessage:`\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u062A\u0642\u0631\u064A\u0631 ${a.length} \u0645\u062F\u0631\u0628 \u0644\u0644\u0637\u0628\u0627\u0639\u0629 / PDF`})},exportAnalysisAttendeesPDF(){const t=this._analysisExportContext,e=t&&typeof t.limitAttendees=="number"?Math.min(2e3,Math.max(1,t.limitAttendees)):Math.min(2e3,Math.max(1,parseInt(document.getElementById("training-analysis-attendees-limit")?.value||"50",10)||50)),a=this.buildAttendancePersonsReportRows().slice(0,e);if(!a.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 PDF...");const i=this.getExportPeriodLabelAr(),n=this.getExportPeriodExportSlug(),s=t&&t.audience?t.audience:document.getElementById("training-export-audience")?.value||"all",r={all:"\u0627\u0644\u0643\u0644",employee:"\u0645\u0648\u0638\u0641\u0648\u0646 \u0641\u0642\u0637",contractor:"\u0645\u0642\u0627\u0648\u0644\u0648\u0646/\u062E\u0627\u0631\u062C\u064A\u0648\u0646"}[s]||s,o=t?String(t.personKey||"").trim():document.getElementById("training-export-person-key")?.value?.trim()||"",l=t&&t.attendanceDepartment?String(t.attendanceDepartment).trim():"",d=this.getAttendanceRecordsForReportsFiltered(),c=["\u0645","\u0627\u0644\u0634\u062E\u0635","\u0639\u062F\u062F \u0627\u0644\u062C\u0644\u0633\u0627\u062A","\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0633\u0627\u0639\u0627\u062A"],p=a.map((u,y)=>[y+1,u.person,u.sessions,Number.isFinite(u.totalHours)?u.totalHours.toFixed(2):"0.00"]),g=this._analysisPeriodPdfTableRows(p);let f="";if(o&&d.length){const u=this._buildAttendanceMonthlyChartItems(d),y=this._buildAttendanceTopicChartItems(d);u.length&&(f+=this._buildPrintableBarChartHtml("\u062C\u0644\u0633\u0627\u062A \u0647\u0630\u0627 \u0627\u0644\u0634\u062E\u0635 \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631",u,"#0d9488")),y.length&&(f+=this._buildPrintableBarChartHtml("\u062D\u0633\u0628 \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629",y,"#14b8a6"));const x=["\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0645\u0648\u0636\u0648\u0639","\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","\u0627\u0644\u0625\u062F\u0627\u0631\u0629","\u0627\u0644\u0645\u062D\u0627\u0636\u0631","\u0627\u0644\u0633\u0627\u0639\u0627\u062A"],k=[...d].sort((A,b)=>new Date(A.date||0)-new Date(b.date||0)).map((A,b)=>[b+1,A.date?Utils.formatDate?Utils.formatDate(A.date):A.date:"",String(A.topic||"\u2014"),String(A.trainingType||"\u2014"),this._attendanceRecordDepartmentLabel(A),String(A.trainerName||A.trainer||"\u2014"),Number.isFinite(parseFloat(A.totalHours))?parseFloat(A.totalHours).toFixed(2):"0.00"]);f+=`
                <h2 style="font-size:17px;margin:24px 0 12px;color:#134E4A;font-weight:700;border-bottom:2px solid #0d9488;padding-bottom:6px;">\u062A\u0641\u0635\u064A\u0644 \u0627\u0644\u062C\u0644\u0633\u0627\u062A \u0644\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u062D\u062F\u062F</h2>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:10px;direction:rtl;">
                        <thead><tr style="background:#115e59;color:#fff;">
                            ${x.map(A=>`<th style="padding:8px;border:1px solid #0f766e;">${Utils.escapeHTML(A)}</th>`).join("")}
                        </tr></thead>
                        <tbody>${this._analysisPeriodPdfTableRows(k)}</tbody>
                    </table>
                </div>`}const m=`
                <div style="margin-bottom: 20px;">
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #F0FDFA; border: 1px solid #99F6E4;">
                            <div style="font-size: 12px; color: #0F766E; font-weight: 600;">\u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
                            <div style="font-size: 15px; font-weight: 700; color: #134E4A;">${Utils.escapeHTML(i)}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #ECFEFF; border: 1px solid #A5F3FC;">
                            <div style="font-size: 12px; color: #0E7490; font-weight: 600;">\u0639\u062F\u062F \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0641\u064A \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
                            <div style="font-size: 22px; font-weight: 800; color: #155E75;">${a.length}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #f8fafc; border: 1px solid #e2e8f0;">
                            <div style="font-size: 12px; color: #475569; font-weight: 600;">\u0627\u0644\u0641\u0626\u0629</div>
                            <div style="font-size: 15px; font-weight: 700; color: #1e293b;">${Utils.escapeHTML(r)}</div>
                        </div>
                        ${l?`<div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #fffbeb; border: 1px solid #fde68a;">
                            <div style="font-size: 12px; color: #92400e; font-weight: 600;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</div>
                            <div style="font-size: 15px; font-weight: 700; color: #78350f;">${Utils.escapeHTML(l)}</div>
                        </div>`:""}
                    </div>
                </div>
                <div style="margin-bottom: 16px;">
                    <h2 style="font-size: 18px; margin-bottom: 12px; color: #134E4A; font-weight: 700; border-bottom: 3px solid #0D9488; padding-bottom: 8px;">\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u2014 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631</h2>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 11px; direction: rtl;">
                            <thead>
                                <tr style="background: #0F766E; color: #FFFFFF;">
                                    ${c.map(u=>`<th style="padding: 12px 8px; border: 1px solid #115E59; font-weight: 700;">${Utils.escapeHTML(u)}</th>`).join("")}
                                </tr>
                            </thead>
                            <tbody>${g}</tbody>
                        </table>
                    </div>
                </div>
                ${f}
                <p style="font-size: 11px; color: #6B7280;">\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0641\u0642 \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0641\u062A\u0631\u0629 \u0648\u0627\u0644\u0641\u0626\u0629${l?" \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0629":""} \u0623\u0639\u0644\u0627\u0647.</p>
            `;this._openTrainingAttendancePrint(m,{formCode:`TRN-ANL-ATTENDEES-${n}-${new Date().toISOString().slice(0,10)}`,docTitle:"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u2014 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628",meta:{period:i,rowCount:a.length,reportType:"training_analysis_attendees",department:l||void 0},successMessage:`\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u062A\u0642\u0631\u064A\u0631 ${a.length} \u0634\u062E\u0635 \u0644\u0644\u0637\u0628\u0627\u0639\u0629 / PDF`})},renderTrainingAnalysisCharts(t){if(typeof Chart>"u"){Utils.safeWarn("Chart.js \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0646 \u064A\u062A\u0645 \u0631\u0633\u0645 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629");return}this.trainingAnalysisCharts&&Object.values(this.trainingAnalysisCharts).forEach(e=>{e&&typeof e.destroy=="function"&&e.destroy()}),this.trainingAnalysisCharts={},t.forEach((e,a)=>{const i=`training-chart-${e.id}-${a}`,n=document.getElementById(i);if(!n)return;const s=this.analyzeTrainingByItem(e);if(!s||s.length===0){n.parentElement.innerHTML='<p class="text-center text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0641\u064A\u0629</p>';return}const r=s.map(d=>d.label),o=s.map(d=>d.count),l=e.chartType==="auto"?r.length>5?"bar":"doughnut":e.chartType;try{const d=new Chart(n,{type:l,data:{labels:r,datasets:[{label:e.label,data:o,backgroundColor:this.getChartColors(r.length),borderWidth:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:l==="doughnut"||l==="pie",position:"bottom"}}}});this.trainingAnalysisCharts[i]=d}catch(d){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0633\u0645 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A:",d)}})},getChartColors(t){const e=["rgba(59, 130, 246, 0.6)","rgba(16, 185, 129, 0.6)","rgba(245, 158, 11, 0.6)","rgba(239, 68, 68, 0.6)","rgba(139, 92, 246, 0.6)","rgba(236, 72, 153, 0.6)","rgba(20, 184, 166, 0.6)","rgba(251, 146, 60, 0.6)","rgba(99, 102, 241, 0.6)","rgba(34, 197, 94, 0.6)"],a=[];for(let i=0;i<t;i++)a.push(e[i%e.length]);return a},resetTrainingCardsToDefault(){const t=this.getTrainingAnalysisStorageKeys(),e=this.getTrainingDefaultAnalysisCards();localStorage.setItem(t.cards,JSON.stringify(e)),this.loadTrainingCardsUI(),Notification.success("\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0643\u0631\u0648\u062A \u0644\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")},resetTrainingAnalysisItemsToDefault(){const t=this.getTrainingAnalysisStorageKeys(),e=this.getTrainingDefaultAnalysisItems();localStorage.setItem(t.items,JSON.stringify(e)),this.loadTrainingAnalysisItemsUI(),Notification.success("\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u0644\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")},saveTrainingAnalysisSettings(){try{const t=this.getTrainingAnalysisStorageKeys(),e=this.loadTrainingInfoCards();let a=!1;if(document.querySelectorAll(".training-card-checkbox").forEach(r=>{const o=r.getAttribute("data-card-id"),l=e.find(d=>d.id===o);l&&l.enabled!==r.checked&&(l.enabled=r.checked,a=!0)}),a||e.length>0)try{localStorage.setItem(t.cards,JSON.stringify(e))}catch(r){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0643\u0631\u0648\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",r),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0643\u0631\u0648\u062A: "+(r.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}const i=localStorage.getItem(t.items)||"[]";let n=[];try{const r=JSON.parse(i);n=Array.isArray(r)?r:[]}catch(r){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",r),n=[]}if(document.querySelectorAll(".training-analysis-item-checkbox").forEach(r=>{const o=r.getAttribute("data-item-id"),l=n.find(d=>d.id===o);l&&(l.enabled=r.checked,a=!0)}),a||n.length>0)try{localStorage.setItem(t.items,JSON.stringify(n))}catch(r){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",r),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629: "+(r.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D");const s=document.querySelector(".modal-overlay");s&&s.remove(),setTimeout(()=>{this.switchTab("analysis")},100)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",t),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+(t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},renderAnalysisCharts_OLD(){},oldEnsureChartJSLoaded(){},oldRenderAnalysisChartsLegacy(){return`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-graduation-cap text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0631\u0627\u0645\u062C</p>
                            <p class="text-2xl font-bold text-gray-900">${stats.totalTrainings}</p>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-check-circle text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">\u0628\u0631\u0627\u0645\u062C \u0645\u0643\u062A\u0645\u0644\u0629</p>
                            <p class="text-2xl font-bold text-gray-900">${stats.completedTrainings}</p>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-users text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</p>
                            <p class="text-2xl font-bold text-gray-900">${stats.totalParticipants}</p>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
                            <i class="fas fa-briefcase text-2xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                            <p class="text-2xl font-bold text-gray-900">${contractorStats.total}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-chart-pie ml-2"></i>\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629</h3>
                    </div>
                    <div class="card-body">
                        <div id="status-chart-container" style="height: 300px;">
                            <canvas id="status-chart"></canvas>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-chart-bar ml-2"></i>\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639</h3>
                    </div>
                    <div class="card-body">
                        <div id="type-chart-container" style="height: 300px;">
                            <canvas id="type-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-chart-line ml-2"></i>\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0634\u0647\u0631\u064A</h3>
                </div>
                <div class="card-body">
                    <div id="monthly-chart-container" style="height: 400px;">
                        <canvas id="monthly-chart"></canvas>
                    </div>
                </div>
            </div>

            <div class="content-card mt-6">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h3 class="card-title"><i class="fas fa-table ml-2"></i>\u0645\u0644\u062E\u0635 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A</h3>
                        <button class="btn-primary" onclick="Training.showAnalysisDataModal()">
                            <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <p class="text-sm text-gray-600 mb-2">\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                            <p class="text-2xl font-bold text-blue-600">${contractorStats.totalHours.toFixed(2)}</p>
                        </div>
                        <div class="p-4 bg-green-50 rounded-lg">
                            <p class="text-sm text-gray-600 mb-2">\u0625\u062C\u0645\u0627\u0644\u064A \u0645\u062A\u062F\u0631\u0628\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                            <p class="text-2xl font-bold text-green-600">${contractorStats.totalParticipants}</p>
                        </div>
                        <div class="p-4 bg-purple-50 rounded-lg">
                            <p class="text-sm text-gray-600 mb-2">\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646 \u0644\u0643\u0644 \u0628\u0631\u0646\u0627\u0645\u062C</p>
                            <p class="text-2xl font-bold text-purple-600">${stats.totalTrainings>0?(stats.totalParticipants/stats.totalTrainings).toFixed(1):0}</p>
                        </div>
                    </div>
                    
                    <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 -->
                    <div class="border-t border-gray-200 pt-6 mt-6">
                        <h4 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-clipboard-check ml-2"></i>\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div class="p-4 bg-indigo-50 rounded-lg">
                                <p class="text-sm text-gray-600 mb-2">\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u062D\u0636\u0648\u0631</p>
                                <p class="text-2xl font-bold text-indigo-600">${attendanceStats.totalRecords}</p>
                            </div>
                            <div class="p-4 bg-teal-50 rounded-lg">
                                <p class="text-sm text-gray-600 mb-2">\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628</p>
                                <p class="text-2xl font-bold text-teal-600">${attendanceStats.totalHours.toFixed(2)}</p>
                            </div>
                            <div class="p-4 bg-pink-50 rounded-lg">
                                <p class="text-sm text-gray-600 mb-2">\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646</p>
                                <p class="text-2xl font-bold text-pink-600">${attendanceStats.uniqueEmployees.size}</p>
                            </div>
                            <div class="p-4 bg-orange-50 rounded-lg">
                                <p class="text-sm text-gray-600 mb-2">\u0639\u062F\u062F \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628</p>
                                <p class="text-2xl font-bold text-orange-600">${attendanceStats.uniqueTrainings.size}</p>
                            </div>
                        </div>
                        
                        <!-- \u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 \u0648\u0627\u0644\u0645\u0635\u0646\u0639 -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <h5 class="font-semibold text-gray-700 mb-3">\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</h5>
                                <div class="space-y-2">
                                    ${Object.entries(attendanceStats.byType).map(([t,e])=>`
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-gray-600">${Utils.escapeHTML(t)}</span>
                                            <span class="font-bold text-gray-900">${e}</span>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <h5 class="font-semibold text-gray-700 mb-3">\u0627\u0644\u062A\u0648\u0632\u064A\u0639 \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0646\u0639</h5>
                                <div class="space-y-2 max-h-40 overflow-y-auto">
                                    ${Object.entries(attendanceStats.byFactory).slice(0,10).map(([t,e])=>`
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-gray-600">${Utils.escapeHTML(t)}</span>
                                            <span class="font-bold text-gray-900">${e}</span>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- \u0639\u0631\u0636 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 -->
                    ${analysisData.notes||analysisData.goals||analysisData.recommendations?`
                    <div class="border-t border-gray-200 pt-6 mt-6">
                        <h4 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-file-alt ml-2"></i>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629
                        </h4>
                        <div class="space-y-4">
                            ${analysisData.notes?`
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <h5 class="font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644</h5>
                                <p class="text-sm text-gray-600 whitespace-pre-wrap">${Utils.escapeHTML(analysisData.notes)}</p>
                            </div>
                            `:""}
                            ${analysisData.goals?`
                            <div class="p-4 bg-blue-50 rounded-lg">
                                <h5 class="font-semibold text-blue-700 mb-2">\u0627\u0644\u0623\u0647\u062F\u0627\u0641</h5>
                                <p class="text-sm text-blue-600 whitespace-pre-wrap">${Utils.escapeHTML(analysisData.goals)}</p>
                            </div>
                            `:""}
                            ${analysisData.recommendations?`
                            <div class="p-4 bg-green-50 rounded-lg">
                                <h5 class="font-semibold text-green-700 mb-2">\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A</h5>
                                <p class="text-sm text-green-600 whitespace-pre-wrap">${Utils.escapeHTML(analysisData.recommendations)}</p>
                            </div>
                            `:""}
                            ${analysisData.targets?`
                            <div class="p-4 bg-purple-50 rounded-lg">
                                <h5 class="font-semibold text-purple-700 mb-2">\u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</h5>
                                <div class="grid grid-cols-2 gap-4 mt-2">
                                    ${analysisData.targets.totalHours?`
                                    <div>
                                        <span class="text-sm text-gray-600">\u0639\u062F\u062F \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629:</span>
                                        <span class="font-bold text-purple-600 ml-2">${analysisData.targets.totalHours}</span>
                                    </div>
                                    `:""}
                                    ${analysisData.targets.totalEmployees?`
                                    <div>
                                        <span class="text-sm text-gray-600">\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641:</span>
                                        <span class="font-bold text-purple-600 ml-2">${analysisData.targets.totalEmployees}</span>
                                    </div>
                                    `:""}
                                </div>
                            </div>
                            `:""}
                            ${analysisData.updatedAt?`
                            <div class="text-xs text-gray-500 mt-2">
                                \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B: ${Utils.formatDate(analysisData.updatedAt)} 
                                ${analysisData.updatedBy?.name?`\u0628\u0648\u0627\u0633\u0637\u0629: ${Utils.escapeHTML(analysisData.updatedBy.name)}`:""}
                            </div>
                            `:""}
                        </div>
                    </div>
                    `:""}
                </div>
            </div>
        `},async ensureChartJSLoaded(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"], script[src*="chartjs"]')?new Promise(e=>{let a=0;const i=60,n=setInterval(()=>{a++,typeof Chart<"u"?(clearInterval(n),e(!0)):a>=i&&(clearInterval(n),e(!1))},100)}):new Promise(e=>{const a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",a.crossOrigin="anonymous";let i=!1;const n=()=>{!i&&typeof Chart<"u"&&(i=!0,e(!0))},s=()=>{if(i)return;const r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js",r.crossOrigin="anonymous";let o=!1;r.onload=()=>{!o&&typeof Chart<"u"&&(o=!0,i=!0,e(!0))},r.onerror=()=>{i||(i=!0,typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 Chart.js \u0645\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u062F\u0631 - \u0633\u064A\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u062F\u0648\u0646 \u0631\u0633\u0648\u0645 \u0628\u064A\u0627\u0646\u064A\u0629"),e(!1))},document.head.appendChild(r)};a.onload=()=>{let r=0;const o=10,l=setInterval(()=>{r++,!i&&typeof Chart<"u"?(clearInterval(l),i=!0,e(!0)):r>=o&&!i&&(clearInterval(l),s())},500)},a.onerror=s,setTimeout(()=>{i||(i=!0,e(typeof Chart<"u"))},8e3);try{document&&document.head?document.head.appendChild(a):e(!1)}catch(r){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 script Chart.js:",r),e(!1)}})},async renderAnalysisCharts(){setTimeout(async()=>{this.ensureData();const t=AppState.appData.training||[],e=["status-chart-container","type-chart-container","monthly-chart-container"],a=[];e.forEach(f=>{const m=document.getElementById(f);if(m){const u=document.createElement("div");u.className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10",u.innerHTML='<div class="text-center text-gray-500"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p class="text-sm">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629...</p></div>',u.style.position="absolute",u.style.top="0",u.style.left="0",u.style.right="0",u.style.bottom="0",u.style.backgroundColor="rgba(255, 255, 255, 0.9)",u.style.display="flex",u.style.alignItems="center",u.style.justifyContent="center",u.style.zIndex="10",m.style.position!=="relative"&&m.style.position!=="absolute"&&(m.style.position="relative"),m.appendChild(u),a.push({container:m,overlay:u})}});let i=!1,n=0;const s=3;for(;!i&&n<s&&(n++,i=await this.ensureChartJSLoaded(),!i&&typeof Chart>"u");)n<s&&await new Promise(f=>setTimeout(f,1e3));if(a.forEach(({overlay:f})=>{f&&f.parentNode&&f.remove()}),!i||typeof Chart>"u"){e.forEach(f=>{const m=document.getElementById(f);if(m){const u=m.querySelector("canvas");u&&u.remove(),m.innerHTML='<div class="text-center text-gray-500 py-8"><i class="fas fa-exclamation-triangle text-4xl mb-4 text-yellow-500"></i><p class="text-sm">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629</p><p class="text-xs mt-2 text-gray-400">\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0623\u0648 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A</p></div>'}});return}const r={};t.forEach(f=>{const m=f.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r[m]=(r[m]||0)+1});const o=document.getElementById("status-chart");o&&Object.keys(r).length>0?new Chart(o,{type:"pie",data:{labels:Object.keys(r),datasets:[{data:Object.values(r),backgroundColor:["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom"}}}}):o&&(o.parentElement.innerHTML='<div class="text-center text-gray-500 py-8"><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p></div>');const l={};t.forEach(f=>{const m=f.trainingType||"\u062F\u0627\u062E\u0644\u064A";l[m]=(l[m]||0)+1});const d=document.getElementById("type-chart");d&&Object.keys(l).length>0?new Chart(d,{type:"bar",data:{labels:Object.keys(l),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C",data:Object.values(l),backgroundColor:"#3b82f6"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}}):d&&(d.parentElement.innerHTML='<div class="text-center text-gray-500 py-8"><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p></div>');const c={};t.forEach(f=>{if(f.startDate){const m=new Date(f.startDate),u=`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`;c[u]=(c[u]||0)+1}});const p=Object.keys(c).sort(),g=document.getElementById("monthly-chart");g&&p.length>0?new Chart(g,{type:"line",data:{labels:p,datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C",data:p.map(f=>c[f]),borderColor:"#3b82f6",backgroundColor:"rgba(59, 130, 246, 0.1)",tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0}},scales:{y:{beginAtZero:!0}}}}):g&&(g.parentElement.innerHTML='<div class="text-center text-gray-500 py-8"><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p></div>')},300)},async renderAttendanceRegistry(){return this.buildAttendanceTabMarkup()},loadAttendanceRegistry(){this.ensureData();const t=document.getElementById("attendance-registry-table-body");if(!t)return;const e=this._dedupeRegistryRecords(AppState.appData.trainingAttendance||[]);if(Array.isArray(AppState.appData.trainingAttendance)&&e.length!==AppState.appData.trainingAttendance.length){AppState.appData.trainingAttendance=e;try{window.DataManager?.save?.()}catch{}}if(this._fillAttendanceRegistryFilters(e),e.length===0){t.innerHTML=`
                <tr>
                    <td colspan="14" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062A\u062F\u0631\u064A\u0628 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646</td>
                </tr>
            `,this.setupAttendanceRegistryListeners();return}const a=(document.getElementById("attendance-registry-search")?.value||"").toLowerCase(),i=(document.getElementById("attendance-filter-employee")?.value||"").trim().toLowerCase(),n=(document.getElementById("attendance-filter-topic")?.value||"").trim().toLowerCase(),s=(document.getElementById("attendance-filter-department")?.value||"").trim().toLowerCase(),r=(document.getElementById("attendance-filter-factory")?.value||document.getElementById("attendance-registry-filter-factory")?.value||"").trim().toLowerCase(),o=(document.getElementById("attendance-filter-trainer")?.value||"").trim().toLowerCase(),l=document.getElementById("attendance-filter-date-from")?.value||"",d=document.getElementById("attendance-filter-date-to")?.value||"",c=[a,i,n,s,r,o,l,d].join("|");this._attendanceRegistryFilterKey!==c&&(this._attendanceRegistryFilterKey=c,this._attendanceRegistryShown=80),this._attendanceRegistryPageSize=this._attendanceRegistryPageSize||80,this._attendanceRegistryShown||(this._attendanceRegistryShown=this._attendanceRegistryPageSize);const p=e.filter(u=>{const y=String(u.employeeName||u.employee||"").toLowerCase(),x=String(u.employeeCode||"").toLowerCase(),h=String(u.topic||"").toLowerCase(),k=String(u.trainer||u.trainerName||u.conductedBy||"").toLowerCase(),A=String(u.department||"").toLowerCase(),b=String(u.factoryName||u.factory||"").toLowerCase(),E=String(u.position||"").toLowerCase(),T=!a||y.includes(a)||x.includes(a)||h.includes(a)||k.includes(a)||A.includes(a)||b.includes(a)||E.includes(a),L=!i||y.includes(i)||x.includes(i),S=!n||h.includes(n),F=!s||A.includes(s),D=!r||b.includes(r)||String(u.factory||"").toLowerCase()===r,I=!o||k.includes(o),v=this._trainingDateKey(u.date||u.trainingDate||u.createdAt),$=!l||!!v&&v>=l,M=!d||!!v&&v<=d;return T&&L&&S&&F&&D&&I&&$&&M}),g=Math.min(this._attendanceRegistryShown,p.length),f=p.slice(0,g);t.innerHTML=f.map((u,y)=>{const x=u.date?Utils.formatDate(u.date):"-";let h=this.cleanTime(u.startTime)||"-",k=this.cleanTime(u.endTime)||"-";(h==="NaN:NaN"||h.includes("NaN"))&&(h="-"),(k==="NaN:NaN"||k.includes("NaN"))&&(k="-");const A=u.totalHours||u.hours||"0";return`
                <tr>
                    <td>${y+1}</td>
                    <td>${x}</td>
                    <td>${Utils.escapeHTML(u.trainingType||"\u062F\u0627\u062E\u0644\u064A")}</td>
                    <td>${Utils.escapeHTML(u.factoryName||u.factory||"-")}</td>
                    <td>${Utils.escapeHTML(u.employeeCode||"-")}</td>
                    <td>${Utils.escapeHTML(u.employeeName||"-")}</td>
                    <td>${Utils.escapeHTML(u.position||"-")}</td>
                    <td>${Utils.escapeHTML(u.department||"-")}</td>
                    <td>${Utils.escapeHTML(u.topic||"-")}</td>
                    <td>${Utils.escapeHTML(u.trainer||"-")}</td>
                    <td>${h}</td>
                    <td>${k}</td>
                    <td>${A} \u0633\u0627\u0639\u0629</td>
                    <td>
                        <div class="flex items-center gap-2 flex-wrap">
                            <button class="btn-secondary btn-sm" onclick="Training.viewAttendanceRecordDetails('${Utils.escapeHTML(String(u.id||""))}')" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0648\u062C\u0645\u064A\u0639 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; font-size: 0.875rem;">
                                <i class="fas fa-eye"></i>
                                <span>\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</span>
                            </button>
                            <button class="btn-icon btn-icon-primary" onclick="Training.editAttendanceRecord('${Utils.escapeHTML(String(u.id||""))}')" title="\u062A\u0639\u062F\u064A\u0644">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon btn-icon-danger" onclick="Training.deleteAttendanceRecord('${Utils.escapeHTML(String(u.id||""))}')" title="\u062D\u0630\u0641">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `}).join("")+(g<p.length?`
                <tr>
                    <td colspan="14" class="text-center py-4">
                        <button type="button" id="attendance-registry-show-more" class="btn-secondary">
                            \u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064A\u062F (${g} \u0645\u0646 ${p.length})
                        </button>
                    </td>
                </tr>
            `:"");const m=document.getElementById("attendance-registry-count");m&&(m.textContent=e.length?`\u0639\u0631\u0636 ${f.length} \u0645\u0646 ${p.length}`+(p.length!==e.length?` (\u0627\u0644\u0645\u0635\u0641\u0651\u0649 \u0645\u0646 ${e.length})`:""):""),this.setupAttendanceRegistryListeners()},setupAttendanceRegistryListeners(){const t=document.getElementById("attendance-registry-search");t&&(t.oninput=()=>this._debounceRegistryFilter(()=>this.loadAttendanceRegistry())),["attendance-filter-employee","attendance-filter-topic","attendance-filter-department","attendance-filter-factory","attendance-filter-trainer"].forEach(l=>{const d=document.getElementById(l);d&&(d.oninput=()=>this._debounceRegistryFilter(()=>this.loadAttendanceRegistry()))}),["attendance-filter-date-from","attendance-filter-date-to"].forEach(l=>{const d=document.getElementById(l);d&&(d.onchange=()=>this.loadAttendanceRegistry())});const e=document.getElementById("attendance-registry-filter-factory");e&&(e.onchange=()=>this.loadAttendanceRegistry());const a=document.getElementById("attendance-filter-reset");a&&(a.onclick=()=>{["attendance-registry-search","attendance-filter-employee","attendance-filter-topic","attendance-filter-department","attendance-filter-factory","attendance-filter-trainer","attendance-filter-date-from","attendance-filter-date-to","attendance-registry-filter-factory"].forEach(l=>{const d=document.getElementById(l);d&&(d.value="")}),this.loadAttendanceRegistry()});const i=document.getElementById("attendance-registry-add-record");i&&(i.onclick=()=>this.showAddAttendanceRecordModal());const n=document.getElementById("attendance-registry-import-excel");n&&(n.onclick=()=>this.showImportAttendanceExcelModal());const s=document.getElementById("attendance-registry-export-excel");s&&(s.onclick=()=>this.exportAttendanceRegistryToExcel());const r=document.getElementById("attendance-registry-export-pdf");r&&(r.onclick=()=>this.exportAttendanceRegistryToPDF());const o=document.getElementById("attendance-registry-show-more");o&&(o.onclick=()=>{this._attendanceRegistryShown=(this._attendanceRegistryShown||80)+80,this.loadAttendanceRegistry()})},syncAttendanceRegistry(t){const e={added:[],updated:[]};return!t||!t.participants||!Array.isArray(t.participants)||(this.ensureData(),Array.isArray(AppState.appData.trainingAttendance)||(AppState.appData.trainingAttendance=[]),t.participants.forEach(a=>{const i=AppState.appData.trainingAttendance.find(r=>r.trainingId===t.id&&r.employeeCode===(a.code||a.employeeCode)),n=this.cleanTime(t.startTime),s=this.cleanTime(t.endTime);if(i)i.date=t.startDate||t.date,i.expiryDate=t.expiryDate||"",i.trainingType=t.trainingType||"\u062F\u0627\u062E\u0644\u064A",i.factory=t.factory,i.factoryName=t.factoryName,i.employeeCode=a.code||a.employeeCode||a.employeeNumber,i.employeeName=a.name,i.position=a.position,i.department=a.department,i.topic=t.name,i.trainer=t.trainer,i.startTime=n,i.endTime=s,i.totalHours=t.hours||this.calculateTrainingHours(n,s),i.updatedAt=new Date().toISOString(),e.updated.push(i);else{const r={id:Utils.generateId("ATT"),trainingId:t.id,date:t.startDate||t.date,expiryDate:t.expiryDate||"",trainingType:t.trainingType||"\u062F\u0627\u062E\u0644\u064A",factory:t.factory,factoryName:t.factoryName,employeeCode:a.code||a.employeeCode||a.employeeNumber,employeeName:a.name,position:a.position,department:a.department,topic:t.name,trainer:t.trainer,startTime:n,endTime:s,totalHours:t.hours||this.calculateTrainingHours(n,s),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.trainingAttendance.push(r),e.added.push(r)}})),e},syncAllAttendanceRegistry(){(AppState.appData.training||[]).forEach(e=>{this.syncAttendanceRegistry(e)})},cleanTime(t){if(t==null||t==="")return"";if(typeof t=="number"&&isFinite(t)&&t>=0&&t<1){const n=Math.round(t*24*60),s=Math.floor(n/60)%24,r=n%60;if(s>=0&&s<24&&r>=0&&r<60)return`${String(s).padStart(2,"0")}:${String(r).padStart(2,"0")}`}if(t instanceof Date&&!isNaN(t.getTime())){const n=t.getUTCHours(),s=t.getUTCMinutes();return`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}`}let e=String(t).trim();if(!e||e.charAt(0)==="'"&&(e=e.slice(1).trim(),!e))return"";if(e.includes("T")){const n=e.match(/T(\d{1,2}):(\d{2})(?::\d{2})?/);if(n){const s=parseInt(n[1],10),r=parseInt(n[2],10);if(!isNaN(s)&&!isNaN(r)&&s>=0&&s<24&&r>=0&&r<60)return`${String(s).padStart(2,"0")}:${String(r).padStart(2,"0")}`}}if(/^-?0?\.\d+$/.test(e)){const n=parseFloat(e);if(isFinite(n)&&n>=0&&n<1){const s=Math.round(n*24*60),r=Math.floor(s/60)%24,o=s%60;if(r>=0&&r<24&&o>=0&&o<60)return`${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}`}return""}const a=e.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);if(a){const n=parseInt(a[1],10),s=parseInt(a[2],10);if(!isNaN(n)&&!isNaN(s)&&n>=0&&n<24&&s>=0&&s<60)return`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}`}const i=e.match(/^(\d{1,2})[:.](\d{2})(?::\d{2})?$/);if(i){const n=parseInt(i[1],10),s=parseInt(i[2],10);if(!isNaN(n)&&!isNaN(s)&&n>=0&&n<24&&s>=0&&s<60)return`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}`}return""},calculateTrainingHours(t,e){if(!t||!e)return"0";try{const a=this.cleanTime(t),i=this.cleanTime(e);if(!a||!i)return"0";const n=new Date(`2000-01-01T${a}:00`),s=new Date(`2000-01-01T${i}:00`);return s<=n?"0":((s-n)/(1e3*60*60)).toFixed(2)}catch{return"0"}},async exportAttendanceRegistryToExcel(){try{this.ensureData();const t=AppState.appData.trainingAttendance||[];if(t.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629.");return}Loading.show("\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");const e=t.map((s,r)=>({\u0645:r+1,\u0627\u0644\u062A\u0627\u0631\u064A\u062E:s.date?Utils.formatDate(s.date):"","\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628":s.trainingType||"\u062F\u0627\u062E\u0644\u064A",\u0627\u0644\u0645\u0635\u0646\u0639:s.factoryName||s.factory||"",\u0627\u0644\u0643\u0648\u062F:s.employeeCode||"",\u0627\u0644\u0627\u0633\u0645:s.employeeName||"",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:s.position||"",\u0627\u0644\u0625\u062F\u0627\u0631\u0629:s.department||"","\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629":s.topic||"","\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631":s.trainer||"","\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621":this.cleanTime(s.startTime)||"","\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":this.cleanTime(s.endTime)||"","\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":s.totalHours||"0"})),a=XLSX.utils.json_to_sheet(e);a["!cols"]=[{wch:5},{wch:12},{wch:12},{wch:15},{wch:12},{wch:20},{wch:15},{wch:15},{wch:25},{wch:15},{wch:10},{wch:10},{wch:15}];const i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,a,"\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628");const n=`\u0633\u062C\u0644_\u0627\u0644\u062A\u062F\u0631\u064A\u0628_\u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(i,n),Loading.hide(),Notification.success(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 ${t.length} \u0633\u062C\u0644 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D`)}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+(t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async exportAttendanceRegistryToPDF(){try{this.ensureData();const t=AppState.appData.trainingAttendance||[];if(t.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show("\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 PDF...");const e=["\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0643\u0648\u062F","\u0627\u0644\u0627\u0633\u0645","\u0627\u0644\u0648\u0638\u064A\u0641\u0629","\u0627\u0644\u0625\u062F\u0627\u0631\u0629","\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629","\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631","\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621","\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0627\u0639\u0627\u062A"],i=t.map((c,p)=>[p+1,c.date?Utils.formatDate(c.date):"",c.trainingType||"\u062F\u0627\u062E\u0644\u064A",c.factoryName||c.factory||"",c.employeeCode||"",c.employeeName||"",c.position||"",c.department||"",c.topic||"",c.trainer||"",this.cleanTime(c.startTime)||"",this.cleanTime(c.endTime)||"",(c.totalHours||"0")+" \u0633\u0627\u0639\u0629"]).map((c,p)=>`
                <tr style="${p%2===0?"background-color: #FFFFFF;":"background-color: #F9FAFB;"}">
                    ${c.map(g=>`<td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; line-height: 1.5;">${Utils.escapeHTML(String(g))}</td>`).join("")}
                </tr>
            `).join(""),n=`
                <div style="margin-bottom: 24px;">
                    <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #EFF6FF; border: 1px solid #BFDBFE;">
                            <div style="font-size: 12px; color: #1D4ED8; margin-bottom: 6px; font-weight: 600;">\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A</div>
                            <div style="font-size: 24px; font-weight: 700; color: #1E3A8A;">${t.length}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #ECFDF5; border: 1px solid #BBF7D0;">
                            <div style="font-size: 12px; color: #047857; margin-bottom: 6px; font-weight: 600;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</div>
                            <div style="font-size: 16px; font-weight: 600; color: #065F46;">${Utils.formatDate(new Date().toISOString())}</div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 20px; margin-bottom: 16px; color: #1E3A8A; font-weight: 700; border-bottom: 3px solid #1E3A8A; padding-bottom: 8px;">\u062C\u062F\u0648\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</h2>
                    <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 11px; direction: rtl; min-width: 100%;">
                            <thead>
                                <tr style="background: #1E3A8A; color: #FFFFFF;">
                                    ${e.map(c=>`<th style="padding: 12px 8px; border: 1px solid #1E40AF; text-align: center; font-weight: 700; white-space: nowrap; font-size: 11px;">${Utils.escapeHTML(c)}</th>`).join("")}
                                </tr>
                            </thead>
                            <tbody>
                                ${i}
                            </tbody>
                        </table>
                    </div>
                </div>
            `,s=`TRAINING-ATTENDANCE-${new Date().toISOString().slice(0,10)}`,r=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(s,"\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646",n,!1,!0,{version:"1.0",recordCount:t.length},new Date().toISOString(),new Date().toISOString()):`
                <!DOCTYPE html>
                <html dir="rtl" lang="ar">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</title>
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
                    <style>
                        @media print {
                            @page { 
                                margin: 1.5cm 1cm; 
                                size: A4 landscape; 
                            }
                            body { 
                                margin: 0; 
                                padding: 15px; 
                            }
                            .no-print { 
                                display: none !important; 
                            }
                        }
                        * {
                            box-sizing: border-box;
                        }
                        body {
                            font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
                            direction: rtl;
                            text-align: right;
                            padding: 20px;
                            color: #1f2937;
                            line-height: 1.6;
                            margin: 0;
                            background: #ffffff;
                        }
                        h1, h2 {
                            font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
                            font-weight: 700;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 20px 0;
                            font-size: 11px;
                            direction: rtl;
                            font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
                        }
                        th, td {
                            padding: 10px 8px;
                            border: 1px solid #E5E7EB;
                            text-align: center;
                            font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
                        }
                        thead th {
                            background-color: #1E3A8A;
                            color: #FFFFFF;
                            font-weight: 700;
                            font-size: 11px;
                            white-space: nowrap;
                        }
                        tbody tr:nth-child(even) {
                            background-color: #F9FAFB;
                        }
                        tbody tr:hover {
                            background-color: #F3F4F6;
                        }
                        tbody td {
                            font-size: 11px;
                            line-height: 1.5;
                        }
                    </style>
                </head>
                <body>
                    <h1 style="text-align: center; color: #1E3A8A; margin-bottom: 20px; font-size: 24px;">\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</h1>
                    ${n}
                </body>
                </html>
            `,o=new Blob([r],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(o),d=window.open(l,"_blank");d?d.onload=()=>{setTimeout(()=>{d.print(),setTimeout(()=>{URL.revokeObjectURL(l),Loading.hide(),Notification.success(`\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 ${t.length} \u0633\u062C\u0644 \u0644\u0644\u0637\u0628\u0627\u0639\u0629`)},1e3)},500)}:(Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"))}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+(t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},showImportAttendanceExcelModal(){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-import ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0645\u0646 \u0645\u0644\u0641 Excel</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded p-4">
                        <p class="text-sm text-blue-800 mb-2"><strong>\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F:</strong></p>
                        <p class="text-sm text-blue-700">\u064A\u062C\u0628 \u0623\u0646 \u064A\u062D\u062A\u0648\u064A \u0645\u0644\u0641 Excel \u0639\u0644\u0649 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629:</p>
                        <ul class="text-sm text-blue-700 list-disc mr-6 mt-2 space-y-1">
                            <li>\u0627\u0644\u062A\u0627\u0631\u064A\u062E / Date</li>
                            <li>\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 / Training Type</li>
                            <li>\u0627\u0644\u0645\u0635\u0646\u0639 / Factory</li>
                            <li>\u0627\u0644\u0643\u0648\u062F / Employee Code</li>
                            <li>\u0627\u0644\u0627\u0633\u0645 / Employee Name</li>
                            <li>\u0627\u0644\u0648\u0638\u064A\u0641\u0629 / Position</li>
                            <li>\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / Department</li>
                            <li>\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629 / Topic</li>
                            <li>\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631 / Trainer</li>
                            <li>\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621 / Start Time</li>
                            <li>\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 / End Time</li>
                            <li>\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 / Total Hours</li>
                        </ul>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-file-excel ml-2"></i>
                            \u0627\u062E\u062A\u0631 \u0645\u0644\u0641 Excel (.xlsx, .xls)
                        </label>
                        <input type="file" id="attendance-excel-file-input" accept=".xlsx,.xls" class="form-input">
                    </div>
                    <div id="attendance-import-preview" class="hidden">
                        <h3 class="text-sm font-semibold mb-2">\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0623\u0648\u0644 5 \u0635\u0641\u0648\u0641):</h3>
                        <div class="max-h-60 overflow-auto border rounded">
                            <table class="data-table text-xs">
                                <thead id="attendance-preview-head"></thead>
                                <tbody id="attendance-preview-body"></tbody>
                            </table>
                        </div>
                        <p id="attendance-preview-count" class="text-sm text-gray-600 mt-2"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button id="attendance-import-confirm-btn" class="btn-primary" disabled>
                        <i class="fas fa-upload ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(t);const e=t.querySelector("#attendance-excel-file-input"),a=t.querySelector("#attendance-import-confirm-btn"),i=t.querySelector("#attendance-import-preview"),n=t.querySelector("#attendance-preview-head"),s=t.querySelector("#attendance-preview-body"),r=t.querySelector("#attendance-preview-count");let o=[];const l=()=>{o=[],i&&i.classList.add("hidden"),n&&(n.innerHTML=""),s&&(s.innerHTML=""),r&&(r.textContent=""),a&&(a.disabled=!0)};t.addEventListener("click",c=>{c.target===t&&t.remove()});const d=async c=>{const p=c.target.files?.[0];if(l(),!!p){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629.");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641...");const g=await p.arrayBuffer(),f=XLSX.read(g,{type:"array"}),m=f.SheetNames[0],u=f.Sheets[m],y=XLSX.utils.sheet_to_json(u);if(y.length===0){Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide();return}if(o=y,y.length>0){const x=Object.keys(y[0]);n.innerHTML=`<tr>${x.map(h=>`<th class="px-2 py-1">${Utils.escapeHTML(h)}</th>`).join("")}</tr>`,s.innerHTML=y.slice(0,5).map(h=>`<tr>${x.map(k=>`<td class="px-2 py-1">${Utils.escapeHTML(String(h[k]||""))}</td>`).join("")}</tr>`).join(""),r.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${y.length}`,i.classList.remove("hidden"),a.disabled=!1}Loading.hide()}catch(g){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0645\u0644\u0641 Excel:",g),Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(g.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}};e&&e.addEventListener("change",d),a?.addEventListener("click",async()=>{if(o.length===0){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F.");return}await this.importAttendanceRegistryFromExcel(o,t)})},async importAttendanceRegistryFromExcel(t,e){if(!t||t.length===0){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A..."),this.ensureData(),Array.isArray(AppState.appData.trainingAttendance)||(AppState.appData.trainingAttendance=[]);let a=0,i=0,n=0;const s={date:["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","Date","date","\u062A\u0627\u0631\u064A\u062E"],trainingType:["\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","Training Type","trainingType","\u0646\u0648\u0639"],factory:["\u0627\u0644\u0645\u0635\u0646\u0639","Factory","factory","\u0627\u0644\u0645\u0635\u0646\u0639"],employeeCode:["\u0627\u0644\u0643\u0648\u062F","Employee Code","employeeCode","\u0627\u0644\u0643\u0648\u062F","\u0643\u0648\u062F"],employeeName:["\u0627\u0644\u0627\u0633\u0645","Employee Name","employeeName","\u0627\u0644\u0627\u0633\u0645","\u0627\u0633\u0645"],position:["\u0627\u0644\u0648\u0638\u064A\u0641\u0629","Position","position","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"],department:["\u0627\u0644\u0625\u062F\u0627\u0631\u0629","Department","department","\u0627\u0644\u0625\u062F\u0627\u0631\u0629"],topic:["\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629","Topic","topic","\u0627\u0644\u0645\u0648\u0636\u0648\u0639"],trainer:["\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631","Trainer","trainer","\u0627\u0644\u0645\u062D\u0627\u0636\u0631"],startTime:["\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621","Start Time","startTime","\u0628\u062F\u0621"],endTime:["\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","End Time","endTime","\u0627\u0646\u062A\u0647\u0627\u0621"],totalHours:["\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628","Total Hours","totalHours","\u0627\u0644\u0633\u0627\u0639\u0627\u062A","\u0633\u0627\u0639\u0627\u062A"]},r=(d,c)=>{for(const p in d){const g=String(p).trim();for(const f of c)if(g===f||g.toLowerCase()===f.toLowerCase())return d[p]}return null},o=d=>{if(!d)return null;if(d instanceof Date)return d.toISOString();if(typeof d=="string"){const c=new Date(d);if(!isNaN(c.getTime()))return c.toISOString()}if(typeof d=="number"){const c=Math.floor(d),p=d-c,g=new Date(1899,11,30),f=new Date(g.getTime()+c*24*60*60*1e3);if(p>0){const m=Math.round(p*24*60*60),u=Math.floor(m/3600),y=Math.floor(m%3600/60),x=m%60;f.setHours(u,y,x,0)}if(!isNaN(f.getTime()))return f.toISOString()}return null};for(const d of t)try{const c=o(r(d,s.date)),p=r(d,s.trainingType)||"\u062F\u0627\u062E\u0644\u064A",g=r(d,s.factory)||"",f=r(d,s.employeeCode)||"",m=r(d,s.employeeName)||"";if(!f||!m){n++;continue}const u=AppState.appData.trainingAttendance.findIndex(x=>x.employeeCode===f&&x.date===c&&x.topic===r(d,s.topic)),y={id:u>=0?AppState.appData.trainingAttendance[u].id:Utils.generateId("ATT"),trainingId:null,date:c||new Date().toISOString(),trainingType:p,factory:g,factoryName:g,employeeCode:f,employeeName:m,position:r(d,s.position)||"",department:r(d,s.department)||"",topic:r(d,s.topic)||"",trainer:r(d,s.trainer)||"",startTime:this.cleanTime(r(d,s.startTime)||""),endTime:this.cleanTime(r(d,s.endTime)||""),totalHours:r(d,s.totalHours)||this.calculateTrainingHours(r(d,s.startTime),r(d,s.endTime)),createdAt:u>=0?AppState.appData.trainingAttendance[u].createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};u>=0?(AppState.appData.trainingAttendance[u]=y,i++):(AppState.appData.trainingAttendance.push(y),a++)}catch(c){n++,Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0635\u0641:",c)}typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("TrainingAttendance",AppState.appData.trainingAttendance).catch(d=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A Google Sheets:",d),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637 \u062D\u062A\u0649 \u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0628\u0646\u062C\u0627\u062D.")}),this.loadAttendanceRegistry(),Loading.hide(),e&&e.parentNode&&e.remove();const l=`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0628\u0646\u062C\u0627\u062D!
- \u062A\u0645 \u0625\u0636\u0627\u0641\u0629: ${a} \u0633\u062C\u0644
- \u062A\u0645 \u062A\u062D\u062F\u064A\u062B: ${i} \u0633\u062C\u0644`+(n>0?`
- \u062A\u0645 \u062A\u062E\u0637\u064A: ${n} \u0635\u0641 \u0628\u0633\u0628\u0628 \u0623\u062E\u0637\u0627\u0621`:"");Notification.success(l),n>0&&n>t.length*.5&&Notification.warning("\u062A\u0645 \u062A\u062E\u0637\u064A \u0623\u0643\u062B\u0631 \u0645\u0646 50% \u0645\u0646 \u0627\u0644\u0635\u0641\u0648\u0641. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0635\u062D\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0645\u0644\u0641 Excel.")}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+(a.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")),e&&e.parentNode&&e.remove()}},showAnalysisDataModal(){if(!this.isCurrentUserAdmin()){Notification.warning("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}this.ensureData();const t=AppState.appData.trainingAttendance||[],e=AppState.appData.trainingAnalysisData||{notes:"",goals:"",recommendations:"",targets:{},customMetrics:{}},a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644</label>
                        <textarea id="analysis-notes" class="form-input" rows="4" placeholder="\u0623\u062F\u062E\u0644 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062D\u0648\u0644 \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628...">${Utils.escapeHTML(e.notes||"")}</textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0623\u0647\u062F\u0627\u0641</label>
                        <textarea id="analysis-goals" class="form-input" rows="3" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u0645\u0631\u062C\u0648\u0629 \u0645\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628...">${Utils.escapeHTML(e.goals||"")}</textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A</label>
                        <textarea id="analysis-recommendations" class="form-input" rows="3" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644...">${Utils.escapeHTML(e.recommendations||"")}</textarea>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0647\u062F\u0641 \u0639\u062F\u062F \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628</label>
                            <input type="number" id="target-hours" class="form-input" value="${e.targets?.totalHours||""}" placeholder="\u0639\u062F\u062F \u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0647\u062F\u0641 \u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646</label>
                            <input type="number" id="target-employees" class="form-input" value="${e.targets?.totalEmployees||""}" placeholder="\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641">
                        </div>
                    </div>
                    
                    <div class="bg-blue-50 border border-blue-200 rounded p-4">
                        <p class="text-sm text-blue-800 mb-2"><strong>\u0645\u0639\u0644\u0648\u0645\u0627\u062A:</strong></p>
                        <p class="text-sm text-blue-700">
                            \u0625\u062C\u0645\u0627\u0644\u064A \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u062D\u0636\u0648\u0631: <strong>${t.length}</strong><br>
                            \u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628: <strong>${t.reduce((i,n)=>i+(parseFloat(n.totalHours)||0),0).toFixed(2)}</strong>
                        </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button id="save-analysis-data-btn" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(a),a.addEventListener("click",i=>{i.target===a&&a.remove()}),a.querySelector("#save-analysis-data-btn")?.addEventListener("click",async()=>{try{Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644...");const i={notes:a.querySelector("#analysis-notes")?.value||"",goals:a.querySelector("#analysis-goals")?.value||"",recommendations:a.querySelector("#analysis-recommendations")?.value||"",targets:{totalHours:parseFloat(a.querySelector("#target-hours")?.value||"0")||0,totalEmployees:parseInt(a.querySelector("#target-employees")?.value||"0")||0},updatedAt:new Date().toISOString(),updatedBy:{id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||AppState.currentUser?.email||""}};if(AppState.appData.trainingAnalysisData||(AppState.appData.trainingAnalysisData={}),AppState.appData.trainingAnalysisData={...AppState.appData.trainingAnalysisData,...i,createdAt:AppState.appData.trainingAnalysisData.createdAt||new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("TrainingAnalysisData",AppState.appData.trainingAnalysisData).catch(n=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0641\u064A Google Sheets:",n)}),Loading.hide(),a.remove(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D"),document.querySelector('.tab-btn[data-tab="analysis"]')?.classList.contains("active")){const n=document.getElementById("training-tab-content");n&&(n.innerHTML=await this.renderAnalysisTab(),this._hydrateTab("analysis"),this.renderAnalysisCharts())}}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",i),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644: "+(i.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}})},showAddAttendanceRecordModal(){this.ensureData(),Array.isArray(AppState.appData.trainingAttendance)||(AppState.appData.trainingAttendance=[]);const t=new Date().toISOString().split("T")[0],e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label>
                            <input type="date" id="add-attendance-date" class="form-input" required value="${t}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 *</label>
                            <select id="add-attendance-type" class="form-input" required>
                                <option value="\u062F\u0627\u062E\u0644\u064A" selected>\u062F\u0627\u062E\u0644\u064A</option>
                                <option value="\u062E\u0627\u0631\u062C\u064A">\u062E\u0627\u0631\u062C\u064A</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                            <input type="text" id="add-attendance-factory" class="form-input" placeholder="\u0627\u0644\u0645\u0635\u0646\u0639">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 *</label>
                            <input type="text" id="add-attendance-code" class="form-input" required placeholder="\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *</label>
                            <input type="text" id="add-attendance-name" class="form-input" required placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                            <input type="text" id="add-attendance-position" class="form-input" placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                            <input type="text" id="add-attendance-department" class="form-input" placeholder="\u0627\u0644\u0625\u062F\u0627\u0631\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629 *</label>
                            <input type="text" id="add-attendance-topic" class="form-input" required placeholder="\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631</label>
                            <select id="add-attendance-trainer" class="form-input">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631</option>
                                ${this.getSafetyTeamMembers({excludeSystemUsers:!0}).map(r=>`
                                    <option value="${Utils.escapeHTML(r.name)}">${Utils.escapeHTML(r.name)}</option>
                                `).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621</label>
                            <input type="time" id="add-attendance-start-time" class="form-input" value="09:00">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</label>
                            <input type="time" id="add-attendance-end-time" class="form-input" value="10:00">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628</label>
                            <input type="number" id="add-attendance-hours" class="form-input" step="0.01" value="1">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button id="save-add-attendance-btn" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(e),e.addEventListener("click",r=>{r.target===e&&e.remove()});const a=e.querySelector("#add-attendance-start-time"),i=e.querySelector("#add-attendance-end-time"),n=e.querySelector("#add-attendance-hours"),s=()=>{if(a?.value&&i?.value){const r=this.calculateTrainingHours(a.value,i.value);r&&parseFloat(r)>0&&(n.value=r)}};a?.addEventListener("change",s),i?.addEventListener("change",s),e.querySelector("#save-add-attendance-btn")?.addEventListener("click",async()=>{try{const r=e.querySelector("#add-attendance-date")?.value,o=e.querySelector("#add-attendance-code")?.value?.trim(),l=e.querySelector("#add-attendance-name")?.value?.trim(),d=e.querySelector("#add-attendance-topic")?.value?.trim();if(!r||!o||!l||!d){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u0627\u0644\u062A\u0627\u0631\u064A\u062E\u060C \u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u060C \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641\u060C \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629)");return}Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644...");const c=e.querySelector("#add-attendance-factory")?.value?.trim()||"",p=this.cleanTime(e.querySelector("#add-attendance-start-time")?.value||""),g=this.cleanTime(e.querySelector("#add-attendance-end-time")?.value||""),f=e.querySelector("#add-attendance-hours")?.value||this.calculateTrainingHours(p,g)||"0",m={id:Utils.generateId("ATT"),trainingId:null,date:new Date(r).toISOString(),trainingType:e.querySelector("#add-attendance-type")?.value||"\u062F\u0627\u062E\u0644\u064A",factory:c,factoryName:c,employeeCode:o,employeeName:l,position:e.querySelector("#add-attendance-position")?.value?.trim()||"",department:e.querySelector("#add-attendance-department")?.value?.trim()||"",topic:d,trainer:e.querySelector("#add-attendance-trainer")?.value?.trim()||"",startTime:p,endTime:g,totalHours:f,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.trainingAttendance.push(m),typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("TrainingAttendance",AppState.appData.trainingAttendance).catch(u=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A Google Sheets:",u),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637 \u062D\u062A\u0649 \u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0628\u0646\u062C\u0627\u062D.")}),Loading.hide(),e.remove(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),this.loadAttendanceRegistry()}catch(r){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644:",r),Notification.error("\u0641\u0634\u0644 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644: "+(r?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}})},viewAttendanceRecordDetails(t){this.ensureData();const e=AppState.appData.trainingAttendance||[],a=e.find(d=>d.id===t);if(!a){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=a.employeeCode||"",n=a.employeeName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",s=e.filter(d=>(d.employeeCode||"")===i).sort((d,c)=>new Date(c.date||0)-new Date(d.date||0)),r=s.reduce((d,c)=>d+(parseFloat(c.totalHours||c.hours||0)||0),0).toFixed(2),o=d=>{const c=this.cleanTime(d);return!c||c==="NaN:NaN"||String(c).includes("NaN")?"\u2014":c},l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
            <div class="modal-content" style="max-width: 1150px; max-height: 90vh; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <!-- \u0631\u0623\u0633 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0641\u0627\u062E\u0631 -->
                <div class="modal-header" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #ffffff; padding: 20px 28px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); display: flex; align-items: center; justify-content: center; color: #60a5fa; font-size: 1.4rem;">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.3rem; font-weight: 700; margin: 0 0 6px 0; display: flex; align-items: center; gap: 10px;">
                                \u062A\u0641\u0627\u0635\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u2014 ${Utils.escapeHTML(n)}
                            </h2>
                            <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 0.85rem;">
                                <span class="badge" style="background: rgba(59, 130, 246, 0.25); color: #93c5fd; border: 1px solid rgba(59, 130, 246, 0.3); font-weight: 600; padding: 2px 10px; border-radius: 6px;">\u0643\u0648\u062F: ${Utils.escapeHTML(i||"\u2014")}</span>
                                <span class="badge" style="background: rgba(16, 185, 129, 0.25); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 600; padding: 2px 10px; border-radius: 6px;">\u0627\u0644\u0648\u0638\u064A\u0641\u0629: ${Utils.escapeHTML(a.position||"\u2014")}</span>
                                <span class="badge" style="background: rgba(245, 158, 11, 0.25); color: #fde68a; border: 1px solid rgba(245, 158, 11, 0.3); font-weight: 600; padding: 2px 10px; border-radius: 6px;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629: ${Utils.escapeHTML(a.department||"\u2014")}</span>
                                ${a.factoryName||a.factory?`<span class="badge" style="background: rgba(168, 85, 247, 0.25); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.3); font-weight: 600; padding: 2px 10px; border-radius: 6px;">\u0627\u0644\u0645\u0635\u0646\u0639: ${Utils.escapeHTML(a.factoryName||a.factory)}</span>`:""}
                            </div>
                        </div>
                    </div>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" title="\u0625\u063A\u0644\u0627\u0642" style="color: #94a3b8; font-size: 1.3rem; transition: color 0.2s;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#94a3b8'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="modal-body" style="padding: 24px; overflow-y: auto; flex: 1; background: #f8fafc;">
                    <!-- \u0643\u0631\u0648\u062A \u0645\u0644\u062E\u0635 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062D\u0627\u0644\u064A -->
                    <div style="background: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; padding: 20px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 16px;">
                            <h3 style="font-size: 1.05rem; font-weight: 700; color: #1e293b; margin: 0; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-certificate text-blue-600"></i>
                                \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062C\u0644\u0633\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629
                            </h3>
                            <span class="badge" style="background: #eff6ff; color: #1d4ed8; font-weight: 700; border: 1px solid #bfdbfe; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem;">
                                ${Utils.escapeHTML(a.trainingType||"\u062A\u062F\u0631\u064A\u0628 \u062F\u0627\u062E\u0644\u064A")}
                            </span>
                        </div>

                        <!-- 4 \u0645\u0624\u0634\u0631\u0627\u062A \u0633\u0631\u064A\u0639\u0629 \u0644\u0644\u062C\u0644\u0633\u0629 -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 18px;">
                            <div style="background: #f8fafc; border-radius: 10px; padding: 12px 14px; border: 1px solid #e2e8f0;">
                                <div style="font-size: 0.75rem; color: #64748b; font-weight: 600; margin-bottom: 4px;"><i class="fas fa-calendar-alt text-blue-500 ml-1"></i> \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062F\u0631\u064A\u0628</div>
                                <div style="font-size: 1rem; font-weight: 700; color: #0f172a;">${a.date?Utils.formatDate(a.date):"\u2014"}</div>
                            </div>
                            <div style="background: #f8fafc; border-radius: 10px; padding: 12px 14px; border: 1px solid #e2e8f0;">
                                <div style="font-size: 0.75rem; color: #64748b; font-weight: 600; margin-bottom: 4px;"><i class="fas fa-chalkboard-teacher text-indigo-500 ml-1"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631</div>
                                <div style="font-size: 1rem; font-weight: 700; color: #0f172a;">${Utils.escapeHTML(a.trainer||"\u2014")}</div>
                            </div>
                            <div style="background: #f8fafc; border-radius: 10px; padding: 12px 14px; border: 1px solid #e2e8f0;">
                                <div style="font-size: 0.75rem; color: #64748b; font-weight: 600; margin-bottom: 4px;"><i class="fas fa-clock text-amber-500 ml-1"></i> \u0627\u0644\u062A\u0648\u0642\u064A\u062A</div>
                                <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a; direction: ltr;">${o(a.startTime)} - ${o(a.endTime)}</div>
                            </div>
                            <div style="background: #f8fafc; border-radius: 10px; padding: 12px 14px; border: 1px solid #e2e8f0;">
                                <div style="font-size: 0.75rem; color: #64748b; font-weight: 600; margin-bottom: 4px;"><i class="fas fa-hourglass-half text-emerald-500 ml-1"></i> \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628</div>
                                <div style="font-size: 1.05rem; font-weight: 700; color: #15803d;">${a.totalHours||a.hours||"0"} <span style="font-size: 0.8rem; font-weight: normal; color: #64748b;">\u0633\u0627\u0639\u0629</span></div>
                            </div>
                        </div>

                        <!-- \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629 \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A -->
                        <div style="background: #f1f5f9; border-radius: 10px; padding: 14px 16px; border: 1px solid #cbd5e1;">
                            <div style="font-size: 0.8rem; color: #475569; font-weight: 600; margin-bottom: 4px;">\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629 / \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629:</div>
                            <div style="font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.5;">${Utils.escapeHTML(a.topic||"\u2014")}</div>
                        </div>
                    </div>

                    <!-- \u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0633\u0627\u0628\u0642\u0629 -->
                    <div style="background: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                            <h3 style="font-size: 1.05rem; font-weight: 700; color: #1e293b; margin: 0; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-history text-emerald-600"></i>
                                \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u0631\u0627\u0643\u0645\u064A \u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641
                            </h3>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span class="badge" style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; font-weight: 600; padding: 4px 10px; border-radius: 8px; font-size: 0.85rem;">
                                    <i class="fas fa-list ml-1"></i> \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0648\u0631\u0627\u062A: ${s.length}
                                </span>
                                <span class="badge" style="background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; font-weight: 700; padding: 4px 10px; border-radius: 8px; font-size: 0.85rem;">
                                    <i class="fas fa-clock ml-1"></i> \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0627\u0639\u0627\u062A: ${r} \u0633\u0627\u0639\u0629
                                </span>
                            </div>
                        </div>

                        ${s.length>0?`
                        <div class="table-wrapper" style="overflow: auto; max-height: 360px; border: 1px solid #e2e8f0; border-radius: 10px;">
                            <table class="data-table" style="margin: 0; width: 100%; border-collapse: separate; border-spacing: 0;">
                                <thead style="position: sticky; top: 0; background: #f8fafc; z-index: 2; border-bottom: 2px solid #e2e8f0;">
                                    <tr>
                                        <th style="padding: 12px 14px; font-weight: 700; font-size: 0.85rem; color: #475569; text-align: center; width: 45px;">\u0645</th>
                                        <th style="padding: 12px 14px; font-weight: 700; font-size: 0.85rem; color: #475569;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                        <th style="padding: 12px 14px; font-weight: 700; font-size: 0.85rem; color: #475569;">\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                                        <th style="padding: 12px 14px; font-weight: 700; font-size: 0.85rem; color: #475569;">\u0627\u0644\u0645\u0635\u0646\u0639</th>
                                        <th style="padding: 12px 14px; font-weight: 700; font-size: 0.85rem; color: #475569;">\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629</th>
                                        <th style="padding: 12px 14px; font-weight: 700; font-size: 0.85rem; color: #475569;">\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631</th>
                                        <th style="padding: 12px 14px; font-weight: 700; font-size: 0.85rem; color: #475569; text-align: center;">\u0627\u0644\u062A\u0648\u0642\u064A\u062A</th>
                                        <th style="padding: 12px 14px; font-weight: 700; font-size: 0.85rem; color: #475569; text-align: center;">\u0627\u0644\u0633\u0627\u0639\u0627\u062A</th>
                                        <th style="padding: 12px 14px; font-weight: 700; font-size: 0.85rem; color: #475569; text-align: center;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${s.map((d,c)=>{const p=d.id===t,g=o(d.startTime),f=o(d.endTime),m=d.totalHours||d.hours||"0";return`
                                        <tr style="background: ${p?"#eff6ff":c%2===0?"#ffffff":"#f8fafc"}; border-bottom: 1px solid #f1f5f9; transition: background 0.15s;">
                                            <td style="padding: 10px 14px; text-align: center; font-weight: 600; color: #64748b;">${c+1}</td>
                                            <td style="padding: 10px 14px; font-weight: 600; color: #0f172a; white-space: nowrap;">${d.date?Utils.formatDate(d.date):"\u2014"}</td>
                                            <td style="padding: 10px 14px;"><span class="badge" style="font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; background: #e0f2fe; color: #0369a1; font-weight: 600;">${Utils.escapeHTML(d.trainingType||"\u062F\u0627\u062E\u0644\u064A")}</span></td>
                                            <td style="padding: 10px 14px; color: #475569;">${Utils.escapeHTML(d.factoryName||d.factory||"\u2014")}</td>
                                            <td style="padding: 10px 14px; font-weight: 600; color: #1e293b; max-width: 260px;">${Utils.escapeHTML(d.topic||"\u2014")}</td>
                                            <td style="padding: 10px 14px; color: #475569;">${Utils.escapeHTML(d.trainer||"\u2014")}</td>
                                            <td style="padding: 10px 14px; text-align: center; font-size: 0.85rem; color: #475569; direction: ltr; white-space: nowrap;">${g} - ${f}</td>
                                            <td style="padding: 10px 14px; text-align: center; font-weight: 700; color: #059669;">${m} \u0633</td>
                                            <td style="padding: 10px 14px; text-align: center;">
                                                ${p?'<span class="badge" style="background: #3b82f6; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 6px; box-shadow: 0 1px 2px rgba(59,130,246,0.3);">\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062D\u0627\u0644\u064A</span>':'<span style="color: #94a3b8; font-size: 0.8rem;">\u2014</span>'}
                                            </td>
                                        </tr>`}).join("")}
                                </tbody>
                            </table>
                        </div>
                        `:`
                        <div style="text-align: center; padding: 30px; color: #94a3b8;">
                            <i class="fas fa-folder-open text-4xl mb-2"></i>
                            <p style="margin: 0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0633\u0627\u0628\u0642\u0629 \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641.</p>
                        </div>
                        `}
                    </div>
                </div>

                <div class="modal-footer" style="padding: 16px 28px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 10px;">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 8px 24px; border-radius: 8px; font-weight: 600;">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(l),l.addEventListener("click",d=>{d.target===l&&l.remove()})},editAttendanceRecord(t){this.ensureData();const e=AppState.appData.trainingAttendance||[],a=e.find(g=>g.id===t);if(!a){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.getSafetyTeamMembers({excludeSystemUsers:!0}),n=String(a?.trainer||"").trim(),s=i.some(g=>g.name===n),r=n&&!s?`<option value="${Utils.escapeHTML(n)}" selected>${Utils.escapeHTML(n)}</option>`:"",o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label>
                            <input type="date" id="edit-attendance-date" class="form-input" required 
                                value="${a.date?new Date(a.date).toISOString().split("T")[0]:""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 *</label>
                            <select id="edit-attendance-type" class="form-input" required>
                                <option value="\u062F\u0627\u062E\u0644\u064A" ${a.trainingType==="\u062F\u0627\u062E\u0644\u064A"?"selected":""}>\u062F\u0627\u062E\u0644\u064A</option>
                                <option value="\u062E\u0627\u0631\u062C\u064A" ${a.trainingType==="\u062E\u0627\u0631\u062C\u064A"?"selected":""}>\u062E\u0627\u0631\u062C\u064A</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                            <input type="text" id="edit-attendance-factory" class="form-input" 
                                value="${Utils.escapeHTML(a.factoryName||a.factory||"")}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 *</label>
                            <input type="text" id="edit-attendance-code" class="form-input" required 
                                value="${Utils.escapeHTML(a.employeeCode||"")}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *</label>
                            <input type="text" id="edit-attendance-name" class="form-input" required 
                                value="${Utils.escapeHTML(a.employeeName||"")}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                            <input type="text" id="edit-attendance-position" class="form-input" 
                                value="${Utils.escapeHTML(a.position||"")}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</label>
                            <input type="text" id="edit-attendance-department" class="form-input" 
                                value="${Utils.escapeHTML(a.department||"")}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629 *</label>
                            <input type="text" id="edit-attendance-topic" class="form-input" required 
                                value="${Utils.escapeHTML(a.topic||"")}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631</label>
                            <select id="edit-attendance-trainer" class="form-input">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631</option>
                                ${r}
                                ${i.map(g=>`
                                    <option value="${Utils.escapeHTML(g.name)}" ${g.name===n?"selected":""}>
                                        ${Utils.escapeHTML(g.name)}
                                    </option>
                                `).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621</label>
                            <input type="time" id="edit-attendance-start-time" class="form-input" 
                                value="${this.cleanTime(a.startTime)||""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</label>
                            <input type="time" id="edit-attendance-end-time" class="form-input" 
                                value="${this.cleanTime(a.endTime)||""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628</label>
                            <input type="number" id="edit-attendance-hours" class="form-input" step="0.01" 
                                value="${a.totalHours||"0"}">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button id="save-edit-attendance-btn" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(o),o.addEventListener("click",g=>{g.target===o&&o.remove()});const l=o.querySelector("#edit-attendance-start-time"),d=o.querySelector("#edit-attendance-end-time"),c=o.querySelector("#edit-attendance-hours"),p=()=>{if(l.value&&d.value){const g=this.calculateTrainingHours(l.value,d.value);g&&parseFloat(g)>0&&(c.value=g)}};l?.addEventListener("change",p),d?.addEventListener("change",p),o.querySelector("#save-edit-attendance-btn")?.addEventListener("click",async()=>{try{const g=o.querySelector("#edit-attendance-date")?.value,f=o.querySelector("#edit-attendance-code")?.value.trim(),m=o.querySelector("#edit-attendance-name")?.value.trim(),u=o.querySelector("#edit-attendance-topic")?.value.trim();if(!g||!f||!m||!u){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A...");const y=e.findIndex(x=>x.id===t);y>=0?(e[y]={...e[y],date:new Date(g).toISOString(),trainingType:o.querySelector("#edit-attendance-type")?.value||"\u062F\u0627\u062E\u0644\u064A",factory:o.querySelector("#edit-attendance-factory")?.value.trim()||"",factoryName:o.querySelector("#edit-attendance-factory")?.value.trim()||"",employeeCode:f,employeeName:m,position:o.querySelector("#edit-attendance-position")?.value.trim()||"",department:o.querySelector("#edit-attendance-department")?.value.trim()||"",topic:u,trainer:o.querySelector("#edit-attendance-trainer")?.value.trim()||"",startTime:this.cleanTime(o.querySelector("#edit-attendance-start-time")?.value||""),endTime:this.cleanTime(o.querySelector("#edit-attendance-end-time")?.value||""),totalHours:o.querySelector("#edit-attendance-hours")?.value||this.calculateTrainingHours(o.querySelector("#edit-attendance-start-time")?.value,o.querySelector("#edit-attendance-end-time")?.value),updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("TrainingAttendance",e).catch(x=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0641\u064A Google Sheets:",x),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637 \u062D\u062A\u0649 \u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0628\u0646\u062C\u0627\u062D.")}),Loading.hide(),o.remove(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),this.loadAttendanceRegistry()):(Loading.hide(),Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"))}catch(g){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644:",g),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644: "+(g.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}})},async deleteAttendanceRecord(t){if(!this.isCurrentUserAdminOrManager()){Notification.error("\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062D\u0630\u0641 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u0627\u0644\u062D\u0630\u0641 \u064A\u062A\u0645 \u0628\u0637\u0644\u0628 \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637.");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F"))try{Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644..."),this.ensureData();const e=AppState.appData.trainingAttendance||[],a=e.findIndex(i=>i.id===t);a>=0?(e.splice(a,1),typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("TrainingAttendance",e).catch(i=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0641\u064A Google Sheets:",i),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A Google Sheets. \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637 \u062D\u062A\u0649 \u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0628\u0646\u062C\u0627\u062D.")}),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),this.loadAttendanceRegistry()):(Loading.hide(),Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"))}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644:",e),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644: "+(e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async updateTrainingAnalyticsDashboard(){const t=document.getElementById("train-analytics-root");if(!t)return;try{this.ensureData()}catch{}const e=parseInt(this._trainPeriod||"0",10),a=w=>({...w,_locationDisplay:w.locationName||(w.location&&w.factory&&this.getPlaceName?this.getPlaceName(w.location,w.factory):w.location)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",_factoryDisplay:w.factoryName||w.factory||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",_trainer:w.trainer||w.conductedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}),i=(AppState.appData?.training||[]).concat(AppState.appData?.contractorTrainings||[]).concat((AppState.appData?.legalTrainings||[]).map(w=>({...w,trainingType:w.category||"\u062A\u062F\u0631\u064A\u0628 \u0642\u0627\u0646\u0648\u0646\u064A",name:w.title,topic:w.title,date:w.actualDate||w.scheduledDate,startDate:w.scheduledDate,totalHours:Number(w.duration)||0,_isLegalTraining:!0}))).map(a),n=this._tFilterByPeriod(i,e);this._tPopulateFilters(n);const s=this._tApplyFilters(n),r=s.length,o=document.getElementById("train-filter-count");o&&(o.textContent=`${r} \u0628\u0631\u0646\u0627\u0645\u062C`);const l=s.filter(w=>w.status==="\u0645\u0643\u062A\u0645\u0644").length,d=s.filter(w=>w.status==="\u0645\u062E\u0637\u0637"||w.status==="\u0642\u0627\u062F\u0645").length,c=s.reduce((w,C)=>w+(this.getParticipantsCount?this.getParticipantsCount(C):Number(C.participantsCount)||0),0),p=s.reduce((w,C)=>w+(Number(C.totalHours)||0),0),g=(AppState.appData?.contractorTrainings||[]).filter(w=>this._tFilterByPeriod([w],e).length&&this._tApplyFilters([w]).length).length,f=s.filter(w=>w._isLegalTraining).length,m=s.filter(w=>w._isLegalTraining&&w.complianceStatus==="\u0645\u0645\u062A\u062B\u0644").length,u=f>0?Math.round(m/f*100):0,y=r-g-f,x=r>0?Math.round(c/r):0,h=r>0?Math.round(l/r*100):0,k=s.filter(w=>{const C=new Date(w.date||w.startDate||""),B=new Date;return!isNaN(C)&&C.getFullYear()===B.getFullYear()&&C.getMonth()===B.getMonth()}).length,A=document.getElementById("train-kpi-strip");if(A){const w=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0631\u0627\u0645\u062C",value:r,icon:"fas fa-graduation-cap",color:"#4f46e5",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0645\u0643\u062A\u0645\u0644\u0629",value:l,icon:"fas fa-check-circle",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0645\u062E\u0637\u0637\u0629/\u0642\u0627\u062F\u0645\u0629",value:d,icon:"fas fa-calendar-alt",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646",value:c.toLocaleString("en-US"),icon:"fas fa-users",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",value:y,icon:"fas fa-user-tie",color:"#0ea5e9",bg:"#f0f9ff",border:"#bae6fd"},{label:"\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",value:g,icon:"fas fa-users-cog",color:"#f97316",bg:"#fff7ed",border:"#fed7aa"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0645\u0634\u0627\u0631\u0643\u064A\u0646/\u0628\u0631\u0646\u0627\u0645\u062C",value:x,icon:"fas fa-chart-line",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628",value:p.toLocaleString("en-US"),icon:"fas fa-clock",color:"#14b8a6",bg:"#f0fdfa",border:"#99f6e4"},{label:"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:k,icon:"fas fa-calendar-day",color:"#db2777",bg:"#fdf2f8",border:"#fbcfe8"},{label:"\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629",value:f,icon:"fas fa-gavel",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A",value:u+"%",icon:"fas fa-balance-scale",color:"#059669",bg:"#ecfdf5",border:"#a7f3d0"}];A.innerHTML=w.map(C=>`
                <div style="background:${C.bg};border:1px solid ${C.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${C.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${C.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.2rem;font-weight:800;color:${C.color};line-height:1;">${C.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${C.label}</div>
                    </div>
                </div>`).join("")}if(!await this._tEnsureChartJS()||typeof Chart>"u"){t.insertAdjacentHTML("afterbegin",'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i> <span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629.</span></div>');return}const E={\u0645\u0643\u062A\u0645\u0644:"rgba(16,185,129,0.85)",\u0645\u062E\u0637\u0637:"rgba(245,158,11,0.85)",\u062C\u0627\u0631\u064D:"rgba(59,130,246,0.85)",\u0642\u0627\u062F\u0645:"rgba(139,92,246,0.85)",\u0645\u0644\u063A\u064A:"rgba(239,68,68,0.85)"},T=this._tGroupBy(s,"status");this._tDrawDoughnut("train-chart-status",T.labels,T.data,T.labels.map(w=>E[w]||"rgba(148,163,184,0.8)"));const L=this._tGroupBy(s,"trainingType",10);this._tDrawDoughnut("train-chart-type",L.labels,L.data,this._tChartColors(L.labels.length)),this._tDrawTrend("train-chart-trend",s);const S=this._tGroupBy(s,"_trainer",10);this._tDrawHBar("train-chart-trainer",S.labels,S.data,"rgba(245,158,11,0.75)");const F=this._tGroupBy(s,"topic",10);this._tDrawHBar("train-chart-topic",F.labels,F.data,"rgba(16,185,129,0.75)");const D=this._tGroupBy(s,"_factoryDisplay",8);this._tDrawHBar("train-chart-factory",D.labels,D.data,"rgba(99,102,241,0.75)");const I=this._tGroupBy(s,"_locationDisplay",8);this._tDrawHBar("train-chart-location",I.labels,I.data,"rgba(59,130,246,0.75)"),this._tDrawParticipants("train-chart-participants",s);const v=s.filter(w=>w._isLegalTraining);if(v.length>0){const w=this._tGroupBy(v,"complianceStatus"),C=w.labels.map(H=>H==="\u0645\u0645\u062A\u062B\u0644"?"rgba(5,150,105,0.85)":H==="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"?"rgba(220,38,38,0.85)":H==="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"rgba(245,158,11,0.85)":H==="\u0645\u062E\u0637\u0637"?"rgba(59,130,246,0.85)":"rgba(148,163,184,0.8)");this._tDrawDoughnut("train-chart-legal-compliance",w.labels,w.data,C);const B=this._tGroupBy(v,"category",10);this._tDrawHBar("train-chart-legal-categories",B.labels,B.data,"rgba(220,38,38,0.7)");const U=document.getElementById("train-chart-legal-compliance-empty");U&&(U.style.display="none")}else{const w=document.getElementById("train-chart-legal-compliance-empty");w&&(w.style.display="flex");const C=document.getElementById("train-chart-legal-categories");C&&C.parentElement&&(C.parentElement.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629</div>')}const $=s.slice().sort((w,C)=>{const B=this.getParticipantsCount?this.getParticipantsCount(C):Number(C.participantsCount)||0,U=this.getParticipantsCount?this.getParticipantsCount(w):Number(w.participantsCount)||0;return B-U}).slice(0,20),M=document.getElementById("train-top-count"),N=document.getElementById("train-top-tbody");if(M&&(M.textContent=`${$.length} \u0628\u0631\u0646\u0627\u0645\u062C`),N)if(!$.length)N.innerHTML='<tr><td colspan="8" style="padding:24px;text-align:center;color:#10b981;"><i class="fas fa-info-circle ml-2"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>';else{const w={\u0645\u0643\u062A\u0645\u0644:"background:#ecfdf5;color:#065f46;",\u0645\u062E\u0637\u0637:"background:#fffbeb;color:#92400e;",\u062C\u0627\u0631\u064D:"background:#eff6ff;color:#1e40af;","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"background:#eff6ff;color:#1e40af;",\u0645\u0644\u063A\u064A:"background:#fef2f2;color:#991b1b;"};N.innerHTML=$.map((C,B)=>{const U=this.getParticipantsCount?this.getParticipantsCount(C):Number(C.participantsCount)||0,H=Number(C.totalHours||C.hours||0),O=Utils.escapeHTML(C._trainer||C.trainer||C.conductedBy||"\u2014"),G=Utils.escapeHTML(C._factoryDisplay||C.factoryName||C.factory||"\u2014"),R=Utils.escapeHTML(C._locationDisplay||C.locationName||C.location||"\u2014"),P=Utils.escapeHTML(C.topic||C.name||C.subject||"\u2014"),z=B%2===0?"#fff":"#fafafa",K=w[C.status]||"background:#f1f5f9;color:#374151;",Y=C.date||C.startDate||"",J=Y?(()=>{try{return new Date(Y).toLocaleDateString("ar-SA",{year:"numeric",month:"short",day:"numeric"})}catch{return Y.slice(0,10)}})():"\u2014";return`<tr style="border-bottom:1px solid #f8fafc;background:${z};" onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='${z}'">
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${P}">${P}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${O}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${G}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${R}</td>
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${J}</td>
                        <td style="padding:9px 12px;"><span style="padding:2px 8px;border-radius:12px;font-size:0.7rem;font-weight:700;white-space:nowrap;${K}">${Utils.escapeHTML(C.status||"\u2014")}</span></td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:#4f46e5;">${U>0?U:"\u2014"}</td>
                        <td style="padding:9px 12px;text-align:center;color:#64748b;">${H>0?H.toFixed(1):"\u2014"}</td>
                    </tr>`}).join("")}},_tFilterByPeriod(t,e){if(!e||e===0)return t;const a=new Date;return a.setDate(a.getDate()-e),t.filter(i=>{const n=new Date(i.date||i.startDate||"");return!isNaN(n.getTime())&&n>=a})},_tGroupBy(t,e,a=0){const i={};t.forEach(s=>{const r=String(s[e]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";i[r]=(i[r]||0)+1});let n=Object.entries(i).sort((s,r)=>r[1]-s[1]);return a>0&&(n=n.slice(0,a)),{labels:n.map(s=>s[0]),data:n.map(s=>s[1])}},_tPopulateFilters(t){const e=i=>[...new Set(t.map(i).filter(n=>n&&n!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"))].sort(),a=(i,n)=>{const s=document.getElementById(i);if(!s)return;const r=s.value;s.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+n.map(o=>`<option value="${o}"${o===r?" selected":""}>${o}</option>`).join("")};a("train-af-status",e(i=>String(i.status||"").trim())),a("train-af-type",e(i=>String(i.trainingType||"").trim())),a("train-af-trainer",e(i=>String(i._trainer||"").trim())),a("train-af-factory",e(i=>String(i._factoryDisplay||"").trim())),a("train-af-location",e(i=>String(i._locationDisplay||"").trim()))},_tApplyFilters(t){const e=d=>{const c=document.getElementById(d);return c?c.value.trim():""},a=e("train-af-status"),i=e("train-af-type"),n=e("train-af-trainer"),s=e("train-af-factory"),r=e("train-af-location"),o=[a,i,n,s,r].some(d=>d!==""),l=document.getElementById("train-filter-badge");return l&&(l.style.display=o?"inline":"none"),t.filter(d=>!(a&&String(d.status||"").trim()!==a||i&&String(d.trainingType||"").trim()!==i||n&&String(d._trainer||"").trim()!==n||s&&String(d._factoryDisplay||"").trim()!==s||r&&String(d._locationDisplay||"").trim()!==r))},_tDrawDoughnut(t,e,a,i){const n=document.getElementById(t),s=document.getElementById(t+"-empty");if(!n)return;if(!a.length||a.reduce((l,d)=>l+d,0)===0){n.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),n.style.display="";const r=a.reduce((l,d)=>l+d,0);this._trainCharts||(this._trainCharts={});const o=this._trainCharts[t];if(o)try{o.destroy()}catch{}this._trainCharts[t]=new Chart(n,{type:"doughnut",data:{labels:e,datasets:[{data:a,backgroundColor:i,borderWidth:2,borderColor:"#fff",hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,font:{size:11},padding:12}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.parsed} (${Math.round(l.parsed/r*100)}%)`}}}}})},_tDrawHBar(t,e,a,i){const n=document.getElementById(t),s=document.getElementById(t+"-empty");if(!n)return;if(!a.length){n.style.display="none",s&&(s.style.display="flex");return}s&&(s.style.display="none"),n.style.display="",this._trainCharts||(this._trainCharts={});const r=this._trainCharts[t];if(r)try{r.destroy()}catch{}this._trainCharts[t]=new Chart(n,{type:"bar",data:{labels:e,datasets:[{data:a,backgroundColor:i,borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:o=>` ${o.parsed.x} \u0628\u0631\u0646\u0627\u0645\u062C`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:o=>String(e[o]).length>20?String(e[o]).slice(0,19)+"\u2026":e[o]}}}}})},_tDrawTrend(t,e){const a=document.getElementById(t),i=document.getElementById(t+"-empty");if(!a)return;const n=new Date,s=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],r=[];for(let d=11;d>=0;d--){const c=new Date(n.getFullYear(),n.getMonth()-d,1);r.push({year:c.getFullYear(),month:c.getMonth(),label:`${s[c.getMonth()]} ${c.getFullYear()}`})}const o=r.map(d=>e.filter(c=>{const p=new Date(c.date||c.startDate||"");return!isNaN(p.getTime())&&p.getFullYear()===d.year&&p.getMonth()===d.month}).length);if(o.reduce((d,c)=>d+c,0)===0){a.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),a.style.display="",this._trainCharts||(this._trainCharts={});const l=this._trainCharts[t];if(l)try{l.destroy()}catch{}this._trainCharts[t]=new Chart(a,{type:"bar",data:{labels:r.map(d=>d.label),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C",data:o,backgroundColor:o.map(d=>d===Math.max(...o)?"rgba(79,70,229,0.85)":"rgba(79,70,229,0.5)"),borderRadius:6,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:o,type:"line",borderColor:"rgba(16,185,129,0.9)",backgroundColor:"rgba(16,185,129,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#10b981",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_tDrawParticipants(t,e){const a=document.getElementById(t),i=document.getElementById(t+"-empty");if(!a)return;const n=new Date,s=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],r=[];for(let d=11;d>=0;d--){const c=new Date(n.getFullYear(),n.getMonth()-d,1);r.push({year:c.getFullYear(),month:c.getMonth(),label:`${s[c.getMonth()]}`})}const o=r.map(d=>e.filter(c=>{const p=new Date(c.date||c.startDate||"");return!isNaN(p.getTime())&&p.getFullYear()===d.year&&p.getMonth()===d.month}).reduce((c,p)=>c+(this.getParticipantsCount?this.getParticipantsCount(p):Number(p.participantsCount)||0),0));if(o.reduce((d,c)=>d+c,0)===0){a.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),a.style.display="",this._trainCharts||(this._trainCharts={});const l=this._trainCharts[t];if(l)try{l.destroy()}catch{}this._trainCharts[t]=new Chart(a,{type:"bar",data:{labels:r.map(d=>d.label),datasets:[{label:"\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646",data:o,backgroundColor:"rgba(236,72,153,0.7)",borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:d=>` ${d.parsed.y} \u0645\u062A\u062F\u0631\u0628`}}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},async _tEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(e=>{const a=setInterval(()=>{typeof Chart<"u"&&(clearInterval(a),e(!0))},100);setTimeout(()=>{clearInterval(a),e(!1)},5e3)}):new Promise(e=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",a.onload=()=>e(!0),a.onerror=()=>{const i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",i.onload=()=>e(!0),i.onerror=()=>e(!1),document.head.appendChild(i)},document.head.appendChild(a)})},_tChartColors(t){const e=["rgba(79,70,229,0.8)","rgba(16,185,129,0.8)","rgba(245,158,11,0.8)","rgba(239,68,68,0.8)","rgba(59,130,246,0.8)","rgba(139,92,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(249,115,22,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:t},(a,i)=>e[i%e.length])},async _tExportPDF(){const t=document.getElementById("train-analytics-root");if(!t)return;const e=document.getElementById("train-export-pdf-btn"),a=e?e.innerHTML:"";e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const i=(b,E)=>new Promise((T,L)=>{if(E())return T();const S=document.createElement("script");S.src=b,S.onload=()=>T(),S.onerror=()=>L(new Error("Failed: "+b)),document.head.appendChild(S)});await i("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await i("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const n=document.getElementById("train-filter-panel"),s=n&&n.style.display!=="none";s&&(n.style.display="none");const r=await html2canvas(t,{scale:1.8,useCORS:!0,backgroundColor:"#f8fafc",scrollX:0,scrollY:-window.scrollY,logging:!1});s&&(n.style.display="");const{jsPDF:o}=window.jspdf,l=new o({orientation:"portrait",unit:"mm",format:"a4"}),d=l.internal.pageSize.getWidth(),c=l.internal.pageSize.getHeight(),p=10,g=20,f=14,m=d-p*2,u=c-g-f-p*.5,y=m/r.width,x=u/y,h=Math.ceil(r.height/x),k=new Date().toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),A=new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});for(let b=0;b<h;b++){b>0&&l.addPage(),l.setFillColor(49,46,129),l.rect(0,0,d,g,"F"),l.setFillColor(79,70,229),l.rect(0,g-3,d,3,"F"),l.setTextColor(255,255,255),l.setFontSize(13),l.setFont(void 0,"bold"),l.text("Training Analytics Report",p,9,{align:"left"}),l.setFontSize(8),l.setFont(void 0,"normal"),l.text("HSE Management System \u2014 Training Analysis Dashboard",p,15,{align:"left"}),l.setFontSize(8.5),l.text(`${k}  ${A}`,d-p,9,{align:"right"}),l.setFontSize(9),l.setFont(void 0,"bold"),l.text(`Page ${b+1} of ${h}`,d-p,15.5,{align:"right"}),l.setTextColor(0,0,0);const E=document.createElement("canvas"),T=Math.min(x,r.height-b*x);E.width=r.width,E.height=T,E.getContext("2d").drawImage(r,0,b*x,r.width,T,0,0,r.width,T),l.addImage(E.toDataURL("image/jpeg",.92),"JPEG",p,g,m,T*y);const L=c-f;l.setDrawColor(199,210,254),l.setLineWidth(.4),l.line(0,L,d,L),l.setFillColor(238,242,255),l.rect(0,L,d,f,"F"),l.setFontSize(7.5),l.setTextColor(67,56,202),l.setFont(void 0,"bold"),l.text("HSE Management System",p,L+5,{align:"left"}),l.setFont(void 0,"normal"),l.setFontSize(6.5),l.setTextColor(100,116,139),l.text("Training Analysis Report \u2014 Confidential",p,L+10,{align:"left"}),l.setFontSize(8),l.setTextColor(79,70,229),l.setFont(void 0,"bold"),l.text(`${b+1} / ${h}`,d/2,L+7.5,{align:"center"}),l.setFont(void 0,"normal"),l.setFontSize(7),l.setTextColor(100,116,139),l.text(k,d-p,L+5,{align:"right"}),l.text(A,d-p,L+10,{align:"right"})}l.save(`\u062A\u0642\u0631\u064A\u0631-\u062A\u062D\u0644\u064A\u0644-\u0627\u0644\u062A\u062F\u0631\u064A\u0628-${new Date().toISOString().slice(0,10)}.pdf`)}catch{}finally{e&&(e.disabled=!1,e.innerHTML=a)}},_tBindAnalyticsEvents(){const t=document.getElementById("train-analytics-root");if(!t)return;t.querySelectorAll(".train-period-btn").forEach(r=>{r.addEventListener("click",()=>{this._trainPeriod=r.getAttribute("data-period"),t.querySelectorAll(".train-period-btn").forEach(o=>{const l=o===r;o.style.background=l?"#fff":"rgba(255,255,255,0.15)",o.style.color=l?"#312e81":"#fff"}),this.updateTrainingAnalyticsDashboard()})});const e=document.getElementById("train-analytics-refresh");e&&e.addEventListener("click",()=>this.updateTrainingAnalyticsDashboard());const a=document.getElementById("train-export-pdf-btn");a&&a.addEventListener("click",()=>this._tExportPDF());const i=document.getElementById("train-toggle-filters-btn"),n=document.getElementById("train-filter-panel");i&&n&&i.addEventListener("click",()=>{const r=n.style.display!=="none";n.style.display=r?"none":"block",i.style.background=r?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const s=document.getElementById("train-filter-reset-btn");s&&s.addEventListener("click",()=>{["train-af-status","train-af-type","train-af-trainer","train-af-factory","train-af-location"].forEach(r=>{const o=document.getElementById(r);o&&(o.value="")}),this.updateTrainingAnalyticsDashboard()}),["train-af-status","train-af-type","train-af-trainer","train-af-factory","train-af-location"].forEach(r=>{const o=document.getElementById(r);o&&o.addEventListener("change",()=>this.updateTrainingAnalyticsDashboard())})},_legalTrainingsLocalSaveTime:0,_legalRegisterLocalSaveTime:0,LEGAL_CATEGORIES:[{value:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",label:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",ref:"\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0639\u0645\u0644 12/2003 - \u0627\u0644\u0628\u0627\u0628 \u0627\u0644\u062E\u0627\u0645\u0633"},{value:"\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",label:"\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",ref:"\u0642\u0631\u0627\u0631 211/2003"},{value:"\u0627\u0644\u062D\u0645\u0627\u064A\u0629 \u0645\u0646 \u0627\u0644\u062D\u0631\u064A\u0642",label:"\u0627\u0644\u062D\u0645\u0627\u064A\u0629 \u0645\u0646 \u0627\u0644\u062D\u0631\u064A\u0642",ref:"\u0642\u0627\u0646\u0648\u0646 12/2003 \u0645\u0627\u062F\u0629 208-209"},{value:"\u0627\u0644\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A\u0629",label:"\u0627\u0644\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A\u0629",ref:"\u0642\u0631\u0627\u0631 211/2003 \u0645\u0627\u062F\u0629 6"},{value:"\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0637\u0631\u0629 \u0648\u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629",label:"\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0637\u0631\u0629 \u0648\u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629",ref:"\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0628\u064A\u0626\u0629 4/1994 + \u0642\u0631\u0627\u0631 211/2003"},{value:"\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0628\u064A\u0626\u0629",label:"\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0628\u064A\u0626\u0629",ref:"\u0642\u0627\u0646\u0648\u0646 4/1994 \u0627\u0644\u0645\u0639\u062F\u0644 \u0628\u0640 9/2009"},{value:"\u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A",label:"\u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A",ref:"\u0642\u0631\u0627\u0631 211/2003"},{value:"\u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629",label:"\u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629",ref:"\u0642\u0631\u0627\u0631 211/2003"},{value:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644",ref:"ISO 45001 \u0628\u0646\u062F 7.2"},{value:"\u0627\u0644\u062A\u0648\u0639\u064A\u0629 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0627\u0644\u0639\u0627\u0645\u0629",label:"\u0627\u0644\u062A\u0648\u0639\u064A\u0629 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0627\u0644\u0639\u0627\u0645\u0629",ref:"\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0639\u0645\u0644 12/2003"}],LEGAL_FREQUENCIES:[{value:"\u0633\u0646\u0648\u064A",label:"\u0633\u0646\u0648\u064A"},{value:"\u0646\u0635\u0641 \u0633\u0646\u0648\u064A",label:"\u0646\u0635\u0641 \u0633\u0646\u0648\u064A"},{value:"\u0631\u0628\u0639 \u0633\u0646\u0648\u064A",label:"\u0631\u0628\u0639 \u0633\u0646\u0648\u064A"},{value:"\u0634\u0647\u0631\u064A",label:"\u0634\u0647\u0631\u064A"},{value:"\u0644\u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629",label:"\u0644\u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629"},{value:"\u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629",label:"\u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629"}],getLegalTrainingStats(){this.ensureData();const t=AppState.appData.legalTrainings||[],e=new Date;let a=0,i=0,n=0,s=0,r=0,o=0;t.forEach(d=>{const c=d.complianceStatus||"";if(c==="\u0645\u0645\u062A\u062B\u0644"?a++:c==="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"?i++:c==="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?n++:c==="\u0645\u062E\u0637\u0637"&&s++,d.status==="\u0645\u0643\u062A\u0645\u0644"&&r++,d.expiryDate){const p=new Date(d.expiryDate);p<e&&d.status!=="\u0645\u0643\u062A\u0645\u0644"?o++:p>e&&Math.ceil((p-e)/864e5)<=30&&c!=="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"&&n++}});const l=t.length>0?Math.round(a/t.length*100):0;return{total:t.length,compliant:a,nonCompliant:i,expiringSoon:n,planned:s,completed:r,overdue:o,complianceRate:l}},_legalRegisterSubTab:"register",LEGAL_LAW_TYPES:[{value:"law",label:"\u0642\u0627\u0646\u0648\u0646"},{value:"regulation",label:"\u0644\u0627\u0626\u062D\u0629 / \u0642\u0631\u0627\u0631 \u0648\u0632\u0627\u0631\u064A"},{value:"decree",label:"\u0645\u0631\u0633\u0648\u0645"},{value:"standard",label:"\u0645\u0648\u0627\u0635\u0641\u0629 \u0642\u064A\u0627\u0633\u064A\u0629"},{value:"code",label:"\u0643\u0648\u062F / \u062F\u0644\u064A\u0644"},{value:"other",label:"\u0623\u062E\u0631\u0649"}],LEGAL_REGISTER_STATUSES:[{value:"applicable",label:"\u0646\u0627\u0641\u0630",color:"green"},{value:"amended",label:"\u0645\u0639\u062F\u0644",color:"amber"},{value:"repealed",label:"\u0645\u0644\u063A\u064A",color:"red"},{value:"pending",label:"\u0642\u064A\u062F \u0627\u0644\u0625\u0635\u062F\u0627\u0631",color:"blue"}],LEGAL_PRIORITIES:[{value:"high",label:"\u0639\u0627\u0644\u064A\u0629",color:"red"},{value:"medium",label:"\u0645\u062A\u0648\u0633\u0637\u0629",color:"amber"},{value:"low",label:"\u0645\u0646\u062E\u0641\u0636\u0629",color:"green"}],LEGAL_REGISTER_CATEGORIES:[{value:"labor",label:"\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0639\u0645\u0644"},{value:"safety",label:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"},{value:"environment",label:"\u0627\u0644\u0628\u064A\u0626\u0629"},{value:"civil_defense",label:"\u0627\u0644\u062F\u0641\u0627\u0639 \u0627\u0644\u0645\u062F\u0646\u064A \u0648\u0627\u0644\u062D\u0631\u064A\u0642"},{value:"social_insurance",label:"\u0627\u0644\u062A\u0623\u0645\u064A\u0646\u0627\u062A \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629"},{value:"tax",label:"\u0627\u0644\u0636\u0631\u0627\u0626\u0628"},{value:"municipal",label:"\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0628\u0644\u062F\u064A\u0629"},{value:"industry",label:"\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0635\u0646\u0627\u0639\u064A\u0629"},{value:"quality",label:"\u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A"},{value:"other",label:"\u0623\u062E\u0631\u0649"}],getLegalRegisterStats(){const t=AppState.appData.legalRegister||[];let e=0,a=0,i=0,n=0,s=0,r=0,o=0,l=0;t.forEach(p=>{const g=p.status||"";g==="applicable"?e++:g==="amended"?a++:g==="repealed"?i++:g==="pending"&&n++;const f=p.priority||"";f==="high"?s++:f==="medium"?r++:f==="low"&&o++;let m=p.amendments;if(typeof m=="string")try{m=JSON.parse(m)}catch{m=[]}Array.isArray(m)&&m.length>0&&l++});const d=t.length,c=d>0?Math.round((e+a)/d*100):0;return{total:d,applicable:e,amended:a,repealed:i,pending:n,high:s,medium:r,low:o,withAmendments:l,complianceRate:c}},renderLegalTrainingTab(){const t=this.getLegalTrainingStats(),e=this.getLegalRegisterStats(),a=this._legalRegisterSubTab||"register";return`
            <div class="legal-sub-tabs">
                <button class="legal-sub-tab ${a==="register"?"active":""}" data-sub="register">
                    <i class="fas fa-balance-scale ml-2"></i>\u0633\u062C\u0644 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646
                </button>
                <button class="legal-sub-tab ${a==="training"?"active":""}" data-sub="training">
                    <i class="fas fa-gavel ml-2"></i>\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629
                </button>
            </div>

            <div id="legal-register-section" class="${a==="register"?"":"hidden"}">
                <div class="lr-kpi-grid">
                    <div class="lr-kpi-card lr-kpi-blue">
                        <div class="flex items-center gap-3">
                            <div class="kpi-icon-wrap"><i class="fas fa-book"></i></div>
                            <div class="min-w-0">
                                <p class="kpi-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A</p>
                                <p class="kpi-value" id="lr-total-count">${e.total}</p>
                            </div>
                        </div>
                    </div>
                    <div class="lr-kpi-card lr-kpi-green">
                        <div class="flex items-center gap-3">
                            <div class="kpi-icon-wrap"><i class="fas fa-check-circle"></i></div>
                            <div class="min-w-0">
                                <p class="kpi-label">\u0646\u0627\u0641\u0630</p>
                                <p class="kpi-value" id="lr-applicable-count">${e.applicable}</p>
                            </div>
                        </div>
                    </div>
                    <div class="lr-kpi-card lr-kpi-amber">
                        <div class="flex items-center gap-3">
                            <div class="kpi-icon-wrap"><i class="fas fa-pen"></i></div>
                            <div class="min-w-0">
                                <p class="kpi-label">\u0645\u0639\u062F\u0644</p>
                                <p class="kpi-value" id="lr-amended-count">${e.amended}</p>
                            </div>
                        </div>
                    </div>
                    <div class="lr-kpi-card lr-kpi-red">
                        <div class="flex items-center gap-3">
                            <div class="kpi-icon-wrap"><i class="fas fa-ban"></i></div>
                            <div class="min-w-0">
                                <p class="kpi-label">\u0645\u0644\u063A\u064A</p>
                                <p class="kpi-value" id="lr-repealed-count">${e.repealed}</p>
                            </div>
                        </div>
                    </div>
                    <div class="lr-kpi-card lr-kpi-purple">
                        <div class="flex items-center gap-3">
                            <div class="kpi-icon-wrap"><i class="fas fa-percentage"></i></div>
                            <div class="min-w-0">
                                <p class="kpi-label">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644</p>
                                <p class="kpi-value" id="lr-compliance-rate">${e.complianceRate}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lr-filters-bar">
                    <div class="filter-group">
                        <label>\u0627\u0644\u062A\u0635\u0646\u064A\u0641:</label>
                        <select id="lr-category-filter" class="form-input" style="max-width: 200px;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            ${this.LEGAL_REGISTER_CATEGORIES.map(i=>`<option value="${i.value}">${i.label}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                        <select id="lr-status-filter" class="form-input" style="max-width: 160px;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            ${this.LEGAL_REGISTER_STATUSES.map(i=>`<option value="${i.value}">${i.label}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:</label>
                        <select id="lr-priority-filter" class="form-input" style="max-width: 160px;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            ${this.LEGAL_PRIORITIES.map(i=>`<option value="${i.value}">${i.label}</option>`).join("")}
                        </select>
                    </div>
                    <button id="lr-reset-filter-btn" class="btn-secondary btn-sm">
                        <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                    </button>
                    <button id="lr-add-btn" class="btn-primary btn-sm">
                        <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u0634\u0631\u064A\u0639
                    </button>
                </div>

                <div class="lr-table-card">
                    <div class="card-header">
                        <div class="legal-header-row">
                            <div class="legal-title-section">
                                <h3 class="card-title"><i class="fas fa-balance-scale ml-2"></i>\u0633\u062C\u0644 \u062D\u0635\u0631 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646</h3>
                            </div>
                            <div class="legal-header-actions">
                                <div class="legal-search-wrapper">
                                    <i class="fas fa-search legal-search-icon"></i>
                                    <input type="text" id="lr-search" class="legal-search-input" placeholder="\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A...">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body" id="lr-container">
                        <div class="text-center py-8 text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u2026</div>
                    </div>
                </div>
            </div>

            <div id="legal-training-section" class="${a==="training"?"":"hidden"}">
                <div class="legal-kpi-grid">
                    <div class="legal-kpi-card kpi-blue">
                        <div class="flex items-center gap-3">
                            <div class="kpi-icon-wrap"><i class="fas fa-gavel"></i></div>
                            <div class="min-w-0">
                                <p class="kpi-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A</p>
                                <p class="kpi-value" id="legal-total-count">${t.total}</p>
                            </div>
                        </div>
                    </div>
                    <div class="legal-kpi-card kpi-green">
                        <div class="flex items-center gap-3">
                            <div class="kpi-icon-wrap"><i class="fas fa-check-circle"></i></div>
                            <div class="min-w-0">
                                <p class="kpi-label">\u0645\u0645\u062A\u062B\u0644</p>
                                <p class="kpi-value" id="legal-compliant-count">${t.compliant}</p>
                            </div>
                        </div>
                    </div>
                    <div class="legal-kpi-card kpi-red">
                        <div class="flex items-center gap-3">
                            <div class="kpi-icon-wrap"><i class="fas fa-exclamation-triangle"></i></div>
                            <div class="min-w-0">
                                <p class="kpi-label">\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644</p>
                                <p class="kpi-value" id="legal-noncompliant-count">${t.nonCompliant}</p>
                            </div>
                        </div>
                    </div>
                    <div class="legal-kpi-card kpi-amber">
                        <div class="flex items-center gap-3">
                            <div class="kpi-icon-wrap"><i class="fas fa-clock"></i></div>
                            <div class="min-w-0">
                                <p class="kpi-label">\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</p>
                                <p class="kpi-value" id="legal-expiring-count">${t.expiringSoon}</p>
                            </div>
                        </div>
                    </div>
                    <div class="legal-kpi-card kpi-purple">
                        <div class="flex items-center gap-3">
                            <div class="kpi-icon-wrap"><i class="fas fa-percentage"></i></div>
                            <div class="min-w-0">
                                <p class="kpi-label">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644</p>
                                <p class="kpi-value" id="legal-compliance-rate">${t.complianceRate}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legal-filters-bar">
                    <div class="filter-group">
                        <label>\u0627\u0644\u062A\u0635\u0646\u064A\u0641:</label>
                        <select id="legal-training-category-filter" class="form-input" style="max-width: 200px;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            ${this.LEGAL_CATEGORIES.map(i=>`<option value="${i.value}">${i.label}</option>`).join("")}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644:</label>
                        <select id="legal-training-compliance-filter" class="form-input" style="max-width: 180px;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            <option value="\u0645\u0645\u062A\u062B\u0644">\u0645\u0645\u062A\u062B\u0644</option>
                            <option value="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644">\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644</option>
                            <option value="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621">\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</option>
                            <option value="\u0645\u062E\u0637\u0637">\u0645\u062E\u0637\u0637</option>
                        </select>
                    </div>
                    <button id="reset-legal-filter-btn" class="btn-secondary btn-sm">
                        <i class="fas fa-redo ml-2"></i>\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646
                    </button>
                    <button id="add-legal-training-btn" class="btn-primary btn-sm">
                        <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u062F\u0631\u064A\u0628 \u0642\u0627\u0646\u0648\u0646\u064A
                    </button>
                </div>

                <div class="legal-table-card">
                    <div class="card-header">
                        <div class="legal-header-row">
                            <div class="legal-title-section">
                                <h3 class="card-title"><i class="fas fa-gavel ml-2"></i>\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</h3>
                            </div>
                            <div class="legal-header-actions">
                                <div class="legal-search-wrapper">
                                    <i class="fas fa-search legal-search-icon"></i>
                                    <input type="text" id="legal-training-search" class="legal-search-input" placeholder="\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0633\u062C\u0644...">
                                </div>
                                <button id="export-legal-training-pdf-btn" class="legal-action-btn btn-pdf" title="\u062A\u0635\u062F\u064A\u0631 PDF">
                                    <i class="fas fa-file-pdf"></i>
                                </button>
                                <button id="export-legal-training-excel-btn" class="legal-action-btn btn-excel" title="\u062A\u0635\u062F\u064A\u0631 Excel">
                                    <i class="fas fa-file-excel"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body" id="legal-training-container">
                        <div class="text-center py-8 text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u2026</div>
                    </div>
                </div>
            </div>
        `},loadLegalTrainingList(){this.ensureData();const t=document.getElementById("legal-training-container");if(!t)return;const e=this.getLegalTrainingStats(),a={"legal-total-count":e.total,"legal-compliant-count":e.compliant,"legal-noncompliant-count":e.nonCompliant,"legal-expiring-count":e.expiringSoon,"legal-compliance-rate":e.complianceRate+"%"};Object.keys(a).forEach(c=>{const p=document.getElementById(c);p&&(p.textContent=a[c])});let i=AppState.appData.legalTrainings||[];const n=document.getElementById("legal-training-category-filter"),s=document.getElementById("legal-training-compliance-filter"),r=document.getElementById("legal-training-search");if(n&&n.value&&(i=i.filter(c=>c.category===n.value)),s&&s.value&&(i=i.filter(c=>c.complianceStatus===s.value)),r&&r.value.trim()){const c=r.value.trim().toLowerCase();i=i.filter(p=>(p.title||"").toLowerCase().includes(c)||(p.legalReference||"").toLowerCase().includes(c)||(p.trainer||"").toLowerCase().includes(c)||(p.category||"").toLowerCase().includes(c))}if(i.length===0){t.innerHTML='<div class="text-center py-8 text-gray-500"><i class="fas fa-gavel text-4xl mb-3 text-gray-300"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0645\u0633\u062C\u0644\u0629</p></div>',this._bindLegalTrainingEvents();return}const o=c=>`<span class="px-2 py-1 rounded-full text-xs font-medium ${{\u0645\u0645\u062A\u062B\u0644:"bg-green-100 text-green-800","\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644":"bg-red-100 text-red-800","\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"bg-amber-100 text-amber-800",\u0645\u062E\u0637\u0637:"bg-blue-100 text-blue-800"}[c]||"bg-gray-100 text-gray-800"}">${c||"\u2014"}</span>`,l=c=>`<span class="px-2 py-1 rounded-full text-xs font-medium ${{\u0645\u0643\u062A\u0645\u0644:"bg-green-100 text-green-800",\u0645\u062E\u0637\u0637:"bg-blue-100 text-blue-800","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"bg-yellow-100 text-yellow-800",\u0645\u0644\u063A\u064A:"bg-gray-100 text-gray-600","\u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629":"bg-red-100 text-red-800"}[c]||"bg-gray-100 text-gray-800"}">${c||"\u2014"}</span>`,d=i.map(c=>`
            <tr>
                <td class="text-sm font-mono text-gray-500">${c.id||"\u2014"}</td>
                <td class="text-sm font-medium">${c.title||"\u2014"}</td>
                <td class="text-sm text-gray-600">${c.category||"\u2014"}</td>
                <td class="text-sm text-gray-600" title="${c.legalArticle||""}">${c.legalReference||"\u2014"}</td>
                <td class="text-sm">${c.frequency||"\u2014"}</td>
                <td class="text-sm">${c.scheduledDate||"\u2014"}</td>
                <td class="text-sm">${c.actualDate||"\u2014"}</td>
                <td class="text-sm">${c.trainer||"\u2014"}</td>
                <td class="text-sm text-center">${c.duration||"\u2014"}</td>
                <td class="text-sm text-center">${c.participantsCount||"\u2014"}</td>
                <td>${l(c.status)}</td>
                <td>${o(c.complianceStatus)}</td>
                <td class="text-sm">${c.expiryDate||"\u2014"}</td>
                <td>
                    <div class="flex items-center gap-1">
                        <button class="btn-icon btn-sm" onclick="Training.showLegalTrainingAttendees('${c.id}')" title="\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u0648\u0627\u0644\u0634\u0647\u0627\u062F\u0627\u062A">
                            <i class="fas fa-users"></i>
                        </button>
                        <button class="btn-icon btn-sm" onclick="Training.showLegalTrainingForm('${c.id}')" title="\u062A\u0639\u062F\u064A\u0644">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${this.isCurrentUserAdmin()?`
                        <button class="btn-icon btn-sm text-red-600" onclick="Training.deleteLegalTrainingRecord('${c.id}')" title="\u062D\u0630\u0641">
                            <i class="fas fa-trash"></i>
                        </button>
                        `:""}
                    </div>
                </td>
            </tr>
        `).join("");t.innerHTML=`
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0631\u0642\u0645</th>
                            <th>\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                            <th>\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th>
                            <th>\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A</th>
                            <th>\u0627\u0644\u062F\u0648\u0631\u064A\u0629</th>
                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637</th>
                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0639\u0644\u064A</th>
                            <th>\u0627\u0644\u0645\u062F\u0631\u0628</th>
                            <th>\u0627\u0644\u0645\u062F\u0629 (\u0633\u0627\u0639\u0629)</th>
                            <th>\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th>
                            <th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>${d}</tbody>
                </table>
            </div>
        `,this._bindLegalTrainingEvents()},_bindLegalTrainingEvents(){const t=document.getElementById("legal-training-category-filter"),e=document.getElementById("legal-training-compliance-filter"),a=document.getElementById("legal-training-search"),i=document.getElementById("reset-legal-filter-btn"),n=document.getElementById("add-legal-training-btn"),s=document.getElementById("export-legal-training-excel-btn"),r=document.getElementById("export-legal-training-pdf-btn");if(t&&!t.dataset.bound&&(t.addEventListener("change",()=>this.loadLegalTrainingList()),t.dataset.bound="1"),e&&!e.dataset.bound&&(e.addEventListener("change",()=>this.loadLegalTrainingList()),e.dataset.bound="1"),a&&!a.dataset.bound){let l;a.addEventListener("input",()=>{clearTimeout(l),l=setTimeout(()=>this.loadLegalTrainingList(),300)}),a.dataset.bound="1"}i&&!i.dataset.bound&&(i.addEventListener("click",()=>{t&&(t.value=""),e&&(e.value=""),a&&(a.value=""),this.loadLegalTrainingList()}),i.dataset.bound="1"),n&&!n.dataset.bound&&(n.addEventListener("click",()=>this.showLegalTrainingForm()),n.dataset.bound="1"),s&&!s.dataset.bound&&(s.addEventListener("click",()=>this.exportLegalTrainingExcel()),s.dataset.bound="1"),r&&!r.dataset.bound&&(r.addEventListener("click",()=>this.exportLegalTrainingPdf()),r.dataset.bound="1");const o=document.querySelectorAll(".legal-sub-tab");o.forEach(l=>{l.dataset.bound||(l.addEventListener("click",()=>{const d=l.dataset.sub;this._legalRegisterSubTab=d,o.forEach(c=>c.classList.toggle("active",c.dataset.sub===d)),document.getElementById("legal-register-section")?.classList.toggle("hidden",d!=="register"),document.getElementById("legal-training-section")?.classList.toggle("hidden",d!=="training"),d==="register"?this.loadLegalRegisterList():this.loadLegalTrainingList()}),l.dataset.bound="1")})},showLegalTrainingForm(t){this.ensureData();let e=null;t&&(e=(AppState.appData.legalTrainings||[]).find(c=>c.id===t));const a=!!e,i=(c,p)=>e&&e[c]!=null?e[c]:p||"",n='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641</option>'+this.LEGAL_CATEGORIES.map(c=>`<option value="${c.value}" ${i("category")===c.value?"selected":""}>${c.label} \u2014 ${c.ref}</option>`).join(""),s='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062F\u0648\u0631\u064A\u0629</option>'+this.LEGAL_FREQUENCIES.map(c=>`<option value="${c.value}" ${i("frequency")===c.value?"selected":""}>${c.label}</option>`).join(""),r=`
            <div class="modal-overlay active" id="legal-training-modal">
                <div class="modal-content" style="max-width: 820px; max-height: 90vh; overflow-y: auto;">
                    <div class="legal-modal-header">
                        <h3><i class="fas fa-gavel"></i>${a?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629"} \u062A\u062F\u0631\u064A\u0628 \u0642\u0627\u0646\u0648\u0646\u064A</h3>
                        <button class="modal-close" onclick="document.getElementById('legal-training-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="legal-training-form" onsubmit="Training.handleLegalTrainingSubmit(event)">
                        <input type="hidden" id="legal-training-edit-id" value="${t||""}">
                        <div class="modal-body">
                            <div class="legal-form-section">
                                <div class="section-title"><i class="fas fa-info-circle"></i>\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group col-span-2">
                                        <label class="form-label">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 <span class="text-red-500">*</span></label>
                                        <input type="text" id="lt-title" class="form-input" value="${i("title")}" required placeholder="\u0645\u062B\u0627\u0644: \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0645\u0646 \u0627\u0644\u062D\u0631\u0627\u0626\u0642">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A <span class="text-red-500">*</span></label>
                                        <select id="lt-category" class="form-input" required>${n}</select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062F\u0648\u0631\u064A\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 <span class="text-red-500">*</span></label>
                                        <select id="lt-frequency" class="form-input" required>${s}</select>
                                    </div>
                                </div>
                            </div>

                            <div class="legal-form-section">
                                <div class="section-title"><i class="fas fa-balance-scale"></i>\u0645\u0631\u062C\u0639 \u0642\u0627\u0646\u0648\u0646\u064A</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A</label>
                                        <input type="text" id="lt-legalReference" class="form-input" value="${i("legalReference")}" placeholder="\u0645\u062B\u0627\u0644: \u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0639\u0645\u0644 12/2003">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0645\u0627\u062F\u0629 / \u0627\u0644\u0628\u0646\u062F</label>
                                        <input type="text" id="lt-legalArticle" class="form-input" value="${i("legalArticle")}" placeholder="\u0645\u062B\u0627\u0644: \u0645\u0627\u062F\u0629 208">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0639\u0642\u0648\u0628\u0629 \u0639\u062F\u0645 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644</label>
                                        <input type="text" id="lt-penaltyForNonCompliance" class="form-input" value="${i("penaltyForNonCompliance")}" placeholder="\u0645\u062B\u0627\u0644: \u063A\u0631\u0627\u0645\u0629 \u0645\u0627\u0644\u064A\u0629 / \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0639\u0645\u0644">
                                    </div>
                                </div>
                            </div>

                            <div class="legal-form-section">
                                <div class="section-title"><i class="fas fa-users"></i>\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</label>
                                        <input type="text" id="lt-targetGroup" class="form-input" value="${i("targetGroup")}" placeholder="\u0645\u062B\u0627\u0644: \u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646\u060C \u0627\u0644\u0645\u0634\u0631\u0641\u064A\u0646">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0642\u0633\u0645</label>
                                        <input type="text" id="lt-department" class="form-input" value="${i("department")}" placeholder="\u0627\u0644\u0642\u0633\u0645">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639</label>
                                        <input type="text" id="lt-factory" class="form-input" value="${i("factory")}" placeholder="\u0627\u0644\u0645\u0635\u0646\u0639 \u0623\u0648 \u0627\u0644\u0645\u0648\u0642\u0639">
                                    </div>
                                </div>
                            </div>

                            <div class="legal-form-section">
                                <div class="section-title"><i class="fas fa-chalkboard-teacher"></i>\u0627\u0644\u0645\u062F\u0631\u0628</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0645\u062F\u0631\u0628</label>
                                        <input type="text" id="lt-trainer" class="form-input" value="${i("trainer")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0631\u0628">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0645\u0624\u0647\u0644\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0628</label>
                                        <input type="text" id="lt-trainerQualification" class="form-input" value="${i("trainerQualification")}" placeholder="\u0645\u062B\u0627\u0644: NEBOSH, OSHA">
                                    </div>
                                </div>
                            </div>

                            <div class="legal-form-section">
                                <div class="section-title"><i class="fas fa-calendar-alt"></i>\u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F \u0648\u0627\u0644\u0645\u062F\u0629</div>
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637</label>
                                        <input type="date" id="lt-scheduledDate" class="form-input" value="${i("scheduledDate")}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0639\u0644\u064A</label>
                                        <input type="date" id="lt-actualDate" class="form-input" value="${i("actualDate")}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0645\u062F\u0629 (\u0633\u0627\u0639\u0627\u062A)</label>
                                        <input type="number" id="lt-duration" class="form-input" value="${i("duration")}" min="0" step="0.5" placeholder="\u0639\u062F\u062F \u0627\u0644\u0633\u0627\u0639\u0627\u062A">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</label>
                                        <input type="number" id="lt-participantsCount" class="form-input" value="${i("participantsCount")}" min="0" placeholder="\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</label>
                                        <input type="date" id="lt-expiryDate" class="form-input" value="${i("expiryDate")}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0627\u0644\u062A\u0627\u0644\u064A</label>
                                        <input type="date" id="lt-nextDueDate" class="form-input" value="${i("nextDueDate")}">
                                    </div>
                                </div>
                            </div>

                            <div class="legal-form-section">
                                <div class="section-title"><i class="fas fa-clipboard-check"></i>\u0627\u0644\u062D\u0627\u0644\u0629 \u0648\u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644</div>
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                        <select id="lt-status" class="form-input">
                                            <option value="\u0645\u062E\u0637\u0637" ${i("status","\u0645\u062E\u0637\u0637")==="\u0645\u062E\u0637\u0637"?"selected":""}>\u0645\u062E\u0637\u0637</option>
                                            <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630" ${i("status")==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                            <option value="\u0645\u0643\u062A\u0645\u0644" ${i("status")==="\u0645\u0643\u062A\u0645\u0644"?"selected":""}>\u0645\u0643\u062A\u0645\u0644</option>
                                            <option value="\u0645\u0644\u063A\u064A" ${i("status")==="\u0645\u0644\u063A\u064A"?"selected":""}>\u0645\u0644\u063A\u064A</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644</label>
                                        <select id="lt-complianceStatus" class="form-input">
                                            <option value="\u0645\u062E\u0637\u0637" ${i("complianceStatus","\u0645\u062E\u0637\u0637")==="\u0645\u062E\u0637\u0637"?"selected":""}>\u0645\u062E\u0637\u0637</option>
                                            <option value="\u0645\u0645\u062A\u062B\u0644" ${i("complianceStatus")==="\u0645\u0645\u062A\u062B\u0644"?"selected":""}>\u0645\u0645\u062A\u062B\u0644</option>
                                            <option value="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644" ${i("complianceStatus")==="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"?"selected":""}>\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644</option>
                                            <option value="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621" ${i("complianceStatus")==="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"selected":""}>\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u064A\u062A\u0637\u0644\u0628 \u0634\u0647\u0627\u062F\u0629</label>
                                        <select id="lt-certificateRequired" class="form-input">
                                            <option value="\u0644\u0627" ${i("certificateRequired","\u0644\u0627")==="\u0644\u0627"?"selected":""}>\u0644\u0627</option>
                                            <option value="\u0646\u0639\u0645" ${i("certificateRequired")==="\u0646\u0639\u0645"?"selected":""}>\u0646\u0639\u0645</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="legal-form-section">
                                <div class="section-title"><i class="fas fa-sticky-note"></i>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</div>
                                <div class="form-group">
                                    <textarea id="lt-notes" class="form-input" rows="3" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${i("notes")}</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-secondary" onclick="document.getElementById('legal-training-modal').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,o=document.getElementById("legal-training-modal");o&&o.remove(),document.body.insertAdjacentHTML("beforeend",r);const l=document.getElementById("lt-category"),d=document.getElementById("lt-legalReference");l&&d&&l.addEventListener("change",()=>{const c=this.LEGAL_CATEGORIES.find(p=>p.value===l.value);c&&!d.value&&(d.value=c.ref)})},async handleLegalTrainingSubmit(t){t.preventDefault();const e=document.getElementById("legal-training-edit-id")?.value,a=!!e,i=r=>{const o=document.getElementById(r);return o?o.value.trim():""},n={title:i("lt-title"),category:i("lt-category"),legalReference:i("lt-legalReference"),legalArticle:i("lt-legalArticle"),frequency:i("lt-frequency"),targetGroup:i("lt-targetGroup"),department:i("lt-department"),factory:i("lt-factory"),factoryName:i("lt-factory"),scheduledDate:i("lt-scheduledDate"),actualDate:i("lt-actualDate"),trainer:i("lt-trainer"),trainerQualification:i("lt-trainerQualification"),duration:i("lt-duration"),participantsCount:i("lt-participantsCount"),status:i("lt-status"),complianceStatus:i("lt-complianceStatus"),expiryDate:i("lt-expiryDate"),nextDueDate:i("lt-nextDueDate"),certificateRequired:i("lt-certificateRequired"),penaltyForNonCompliance:i("lt-penaltyForNonCompliance"),notes:i("lt-notes")};if(!n.title||!n.category||!n.frequency){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629: \u0627\u0644\u0639\u0646\u0648\u0627\u0646\u060C \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u060C \u0627\u0644\u062F\u0648\u0631\u064A\u0629");return}const s=document.getElementById("legal-training-modal");try{if(a){n.id=e,n.updatedAt=new Date().toISOString();const r=AppState.appData.legalTrainings||[],o=r.findIndex(l=>l.id===e);if(o!==-1&&Object.assign(r[o],n),this._legalTrainingsLocalSaveTime=Date.now(),s&&s.remove(),this._markAllTabsDirty(),this.loadLegalTrainingList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{await GoogleIntegration.sendRequest({action:"updateLegalTraining",data:{trainingId:e,updateData:n}})}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645:",l)}}else{n.createdAt=new Date().toISOString(),n.updatedAt=n.createdAt,n.createdBy=AppState.currentUser?.email||"",AppState.appData.legalTrainings||(AppState.appData.legalTrainings=[]);const r="LTR-LOCAL-"+Date.now();if(n.id=r,AppState.appData.legalTrainings.unshift(n),this._legalTrainingsLocalSaveTime=Date.now(),s&&s.remove(),this._markAllTabsDirty(),this.loadLegalTrainingList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A..."),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const o=Object.assign({},n);delete o.id;try{Utils.safeLog("\u{1F4E4} \u0625\u0631\u0633\u0627\u0644 addLegalTraining \u0625\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645:",JSON.stringify(o).substring(0,200));const l=await GoogleIntegration.sendRequest({action:"addLegalTraining",data:o});if(Utils.safeLog("\u{1F4E5} \u0631\u062F \u0627\u0644\u062E\u0627\u062F\u0645 addLegalTraining:",JSON.stringify(l).substring(0,300)),l&&l.success&&l.data&&l.data.id){const d=AppState.appData.legalTrainings||[],c=d.findIndex(p=>p.id===r);c!==-1&&(d[c].id=l.data.id),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D \u2705")}else Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062E\u0627\u062F\u0645 \u0644\u0645 \u064A\u0631\u062C\u0639 \u0646\u062C\u0627\u062D:",l),typeof Notification<"u"&&Notification.warning&&Notification.warning("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(l?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}catch(l){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645:",l),typeof Notification<"u"&&Notification.error&&Notification.error("\u274C \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(l?.message||l))}}else Utils.safeWarn("\u26A0\uFE0F GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u2014 \u0644\u0646 \u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),typeof Notification<"u"&&Notification.warning&&Notification.warning("\u26A0\uFE0F \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D")}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",r),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638")}},async deleteLegalTrainingRecord(t){if(t&&confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u061F"))try{const e=AppState.appData.legalTrainings||[];AppState.appData.legalTrainings=e.filter(a=>a.id!==t),this._legalTrainingsLocalSaveTime=Date.now(),this._markAllTabsDirty(),this.loadLegalTrainingList(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"deleteLegalTraining",data:{trainingId:t}}).catch(a=>Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",a))}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",e)}},loadLegalRegisterList(){const t=document.getElementById("lr-container");if(!t)return;const e=this.getLegalRegisterStats(),a=["lr-total-count","lr-applicable-count","lr-amended-count","lr-repealed-count","lr-compliance-rate"],i=[e.total,e.applicable,e.amended,e.repealed,e.complianceRate+"%"];a.forEach((m,u)=>{const y=document.getElementById(m);y&&(y.textContent=i[u])});let n=AppState.appData.legalRegister||[];const s=document.getElementById("lr-category-filter"),r=document.getElementById("lr-status-filter"),o=document.getElementById("lr-priority-filter"),l=document.getElementById("lr-search");if(s&&s.value&&(n=n.filter(m=>m.category===s.value)),r&&r.value&&(n=n.filter(m=>m.status===r.value)),o&&o.value&&(n=n.filter(m=>m.priority===o.value)),l&&l.value.trim()){const m=l.value.trim().toLowerCase();n=n.filter(u=>(u.title||"").toLowerCase().includes(m)||(u.legalReference||"").toLowerCase().includes(m)||(u.issuingAuthority||"").toLowerCase().includes(m)||(u.lawNumber||"").toLowerCase().includes(m))}if(n.length===0){t.innerHTML='<div class="text-center py-8 text-gray-500"><i class="fas fa-balance-scale text-4xl mb-3 text-gray-300"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p></div>',this._bindLegalRegisterEvents();return}const d=m=>({applicable:'<span class="lr-badge lr-badge-green">\u0646\u0627\u0641\u0630</span>',amended:'<span class="lr-badge lr-badge-amber">\u0645\u0639\u062F\u0644</span>',repealed:'<span class="lr-badge lr-badge-red">\u0645\u0644\u063A\u064A</span>',pending:'<span class="lr-badge lr-badge-blue">\u0642\u064A\u062F \u0627\u0644\u0625\u0635\u062F\u0627\u0631</span>'})[m]||'<span class="lr-badge lr-badge-gray">\u2014</span>',c=m=>({high:'<span class="lr-priority lr-priority-high">\u0639\u0627\u0644\u064A\u0629</span>',medium:'<span class="lr-priority lr-priority-medium">\u0645\u062A\u0648\u0633\u0637\u0629</span>',low:'<span class="lr-priority lr-priority-low">\u0645\u0646\u062E\u0641\u0636\u0629</span>'})[m]||'<span class="lr-priority">\u2014</span>',p=m=>{const u=this.LEGAL_LAW_TYPES.find(y=>y.value===m);return u?u.label:m||"\u2014"},g=m=>{let u=m.amendments;if(typeof u=="string")try{u=JSON.parse(u)}catch{u=[]}return Array.isArray(u)?u.length:0},f=n.map(m=>{const u=g(m);return`
            <tr>
                <td class="text-sm font-mono text-gray-500">${m.id||"\u2014"}</td>
                <td class="text-sm font-medium">${m.title||"\u2014"}</td>
                <td class="text-sm text-gray-600">${m.issuingAuthority||"\u2014"}</td>
                <td class="text-sm text-gray-600">${p(m.lawType)} ${m.lawNumber?"\u0631\u0642\u0645 "+m.lawNumber:""} ${m.lawYear?"("+m.lawYear+")":""}</td>
                <td class="text-sm text-gray-600">${m.legalReference||"\u2014"}</td>
                <td>${d(m.status)}</td>
                <td>${c(m.priority)}</td>
                <td class="text-sm text-center">${m.issueDate||"\u2014"}</td>
                <td class="text-sm text-center">
                    <button class="lr-amd-btn" onclick="Training.showLegalAmendments('${m.id}')" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629">
                        <i class="fas fa-history"></i>
                        ${u>0?`<span class="lr-amd-badge">${u}</span>`:""}
                    </button>
                </td>
                <td>
                    <div class="flex items-center gap-1">
                        <button class="btn-icon btn-sm" onclick="Training.showLegalRegisterForm('${m.id}')" title="\u062A\u0639\u062F\u064A\u0644">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon btn-sm text-red-600" onclick="Training.deleteLegalRegisterRecord('${m.id}')" title="\u062D\u0630\u0641">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join("");t.innerHTML=`
            <div style="overflow-x: auto;">
                <table class="data-table lr-data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0645\u0639\u0631\u0641</th>
                            <th>\u0627\u0644\u062A\u0634\u0631\u064A\u0639 / \u0627\u0644\u0642\u0627\u0646\u0648\u0646</th>
                            <th>\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                            <th>\u0627\u0644\u0646\u0648\u0639 / \u0627\u0644\u0631\u0642\u0645</th>
                            <th>\u0627\u0644\u0645\u0631\u062C\u0639</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</th>
                            <th>\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A</th>
                            <th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>${f}</tbody>
                </table>
            </div>
        `,this._bindLegalRegisterEvents()},_bindLegalRegisterEvents(){const t=document.getElementById("lr-category-filter"),e=document.getElementById("lr-status-filter"),a=document.getElementById("lr-priority-filter"),i=document.getElementById("lr-search"),n=document.getElementById("lr-reset-filter-btn"),s=document.getElementById("lr-add-btn"),r=()=>this.loadLegalRegisterList();t&&(t.onchange=r),e&&(e.onchange=r),a&&(a.onchange=r),i&&(i.oninput=Utils.debounce?Utils.debounce(r,300):r),n&&(n.onclick=()=>{t&&(t.value=""),e&&(e.value=""),a&&(a.value=""),i&&(i.value=""),r()}),s&&(s.onclick=()=>this.showLegalRegisterForm())},showLegalRegisterForm(t){this.ensureData();let e=null;t&&(e=(AppState.appData.legalRegister||[]).find(c=>c.id===t));const a=!!e,i=(c,p)=>e&&e[c]!=null?e[c]:p||"",n='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>'+this.LEGAL_LAW_TYPES.map(c=>`<option value="${c.value}" ${i("lawType")===c.value?"selected":""}>${c.label}</option>`).join(""),s=this.LEGAL_REGISTER_STATUSES.map(c=>`<option value="${c.value}" ${i("status","applicable")===c.value?"selected":""}>${c.label}</option>`).join(""),r=this.LEGAL_PRIORITIES.map(c=>`<option value="${c.value}" ${i("priority","medium")===c.value?"selected":""}>${c.label}</option>`).join(""),o='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641</option>'+this.LEGAL_REGISTER_CATEGORIES.map(c=>`<option value="${c.value}" ${i("category")===c.value?"selected":""}>${c.label}</option>`).join(""),l=`
            <div class="modal-overlay active" id="lr-modal">
                <div class="modal-content" style="max-width: 860px; max-height: 92vh; overflow-y: auto;">
                    <div class="lr-modal-header">
                        <h3><i class="fas fa-balance-scale"></i>${a?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629"} \u0633\u062C\u0644 \u062A\u0634\u0631\u064A\u0639 \u0648\u0642\u0627\u0646\u0648\u0646</h3>
                        <button class="modal-close" onclick="document.getElementById('lr-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="lr-form" onsubmit="Training.handleLegalRegisterSubmit(event)">
                        <input type="hidden" id="lr-edit-id" value="${t||""}">
                        <div class="modal-body">
                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-info-circle"></i>\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group col-span-2">
                                        <label class="form-label">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0634\u0631\u064A\u0639 / \u0627\u0644\u0642\u0627\u0646\u0648\u0646 <span class="text-red-500">*</span></label>
                                        <input type="text" id="lr-title" class="form-input" value="${i("title")}" required placeholder="\u0645\u062B\u0627\u0644: \u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0639\u0645\u0644 \u0631\u0642\u0645 12 \u0644\u0633\u0646\u0629 2003">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 <span class="text-red-500">*</span></label>
                                        <input type="text" id="lr-issuingAuthority" class="form-input" value="${i("issuingAuthority")}" required placeholder="\u0645\u062B\u0627\u0644: \u0648\u0632\u0627\u0631\u0629 \u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u0639\u0627\u0645\u0644\u0629">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u0634\u0631\u064A\u0639 <span class="text-red-500">*</span></label>
                                        <select id="lr-lawType" class="form-input" required>${n}</select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0631\u0642\u0645 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 / \u0627\u0644\u0642\u0631\u0627\u0631</label>
                                        <input type="text" id="lr-lawNumber" class="form-input" value="${i("lawNumber")}" placeholder="\u0645\u062B\u0627\u0644: 12">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0633\u0646\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                                        <input type="text" id="lr-lawYear" class="form-input" value="${i("lawYear")}" placeholder="\u0645\u062B\u0627\u0644: 2003">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u062A\u0635\u0646\u064A\u0641 <span class="text-red-500">*</span></label>
                                        <select id="lr-category" class="form-input" required>${o}</select>
                                    </div>
                                </div>
                            </div>

                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-calendar-alt"></i>\u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E</div>
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631</label>
                                        <input type="date" id="lr-issueDate" class="form-input" value="${i("issueDate")}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0641\u0627\u0630</label>
                                        <input type="date" id="lr-effectiveDate" class="form-input" value="${i("effectiveDate")}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0642\u0627\u062F\u0645</label>
                                        <input type="date" id="lr-nextReviewDate" class="form-input" value="${i("nextReviewDate")}">
                                    </div>
                                </div>
                            </div>

                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-file-alt"></i>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A</label>
                                        <input type="text" id="lr-legalReference" class="form-input" value="${i("legalReference")}" placeholder="\u0645\u062B\u0627\u0644: \u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0639\u0645\u0644">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0645\u0648\u0627\u062F / \u0627\u0644\u0628\u0646\u0648\u062F</label>
                                        <input type="text" id="lr-legalArticles" class="form-input" value="${i("legalArticles")}" placeholder="\u0645\u062B\u0627\u0644: 208\u060C 209\u060C 210">
                                    </div>
                                    <div class="form-group col-span-2">
                                        <label class="form-label">\u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0637\u0628\u064A\u0642</label>
                                        <input type="text" id="lr-scopeOfApplication" class="form-input" value="${i("scopeOfApplication")}" placeholder="\u0645\u062B\u0627\u0644: \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0646\u0634\u0622\u062A \u0627\u0644\u062E\u0627\u0636\u0639\u0629 \u0644\u0644\u0642\u0627\u0646\u0648\u0646">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u0629</label>
                                        <input type="text" id="lr-responsibleDepartment" class="form-input" value="${i("responsibleDepartment")}" placeholder="\u0645\u062B\u0627\u0644: \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</label>
                                        <select id="lr-priority" class="form-input">${r}</select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                        <select id="lr-status" class="form-input">${s}</select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0642\u0627\u062F\u0645</label>
                                        <input type="date" id="lr-nextReviewDate2" class="form-input" value="${i("nextReviewDate")}">
                                    </div>
                                </div>
                            </div>

                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-align-left"></i>\u0645\u0644\u062E\u0635 \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A</div>
                                <div class="form-group">
                                    <textarea id="lr-summary" class="form-input" rows="3" placeholder="\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0634\u0631\u064A\u0639 \u0648\u0645\u062A\u0637\u0644\u0628\u0627\u062A\u0647">${i("summary")}</textarea>
                                </div>
                                <div class="form-group" style="margin-top: 12px;">
                                    <textarea id="lr-notes" class="form-input" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${i("notes")}</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-secondary" onclick="document.getElementById('lr-modal').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0634\u0631\u064A\u0639"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,d=document.getElementById("lr-modal");d&&d.remove(),document.body.insertAdjacentHTML("beforeend",l)},async handleLegalRegisterSubmit(t){t.preventDefault();const e=document.getElementById("lr-edit-id")?.value,a=!!e,i=r=>{const o=document.getElementById(r);return o?o.value.trim():""},n={title:i("lr-title"),issuingAuthority:i("lr-issuingAuthority"),lawType:i("lr-lawType"),lawNumber:i("lr-lawNumber"),lawYear:i("lr-lawYear"),category:i("lr-category"),issueDate:i("lr-issueDate"),effectiveDate:i("lr-effectiveDate"),nextReviewDate:i("lr-nextReviewDate")||i("lr-nextReviewDate2"),legalReference:i("lr-legalReference"),legalArticles:i("lr-legalArticles"),scopeOfApplication:i("lr-scopeOfApplication"),responsibleDepartment:i("lr-responsibleDepartment"),priority:i("lr-priority"),status:i("lr-status"),summary:i("lr-summary"),notes:i("lr-notes")};if(!n.title||!n.issuingAuthority||!n.lawType||!n.category){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629: \u0627\u0644\u0639\u0646\u0648\u0627\u0646\u060C \u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u060C \u0627\u0644\u0646\u0648\u0639\u060C \u0627\u0644\u062A\u0635\u0646\u064A\u0641");return}const s=document.getElementById("lr-modal");try{if(a){n.id=e,n.updatedAt=new Date().toISOString();const r=AppState.appData.legalRegister||[],o=r.findIndex(l=>l.id===e);if(o!==-1){const l=r[o].amendments||[];n.amendments=l,Object.assign(r[o],n),this._legalRegisterLocalSaveTime=Date.now()}s&&s.remove(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"updateLegalRegister",data:{registerId:e,updateData:n}}).catch(()=>{})}else{n.createdAt=new Date().toISOString(),n.updatedAt=n.createdAt,n.amendments=[],AppState.appData.legalRegister||(AppState.appData.legalRegister=[]);const r="LR-LOCAL-"+Date.now();if(n.id=r,AppState.appData.legalRegister.unshift(n),this._legalRegisterLocalSaveTime=Date.now(),s&&s.remove(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A..."),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const o=Object.assign({},n);delete o.id,GoogleIntegration.sendRequest({action:"addLegalRegister",data:o}).then(l=>{if(l&&l.success&&l.data&&l.data.id){const d=AppState.appData.legalRegister||[],c=d.findIndex(p=>p.id===r);c!==-1&&(d[c].id=l.data.id),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D \u2705")}}).catch(l=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",l))}}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",r),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638")}},async deleteLegalRegisterRecord(t){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u061F"))try{const e=AppState.appData.legalRegister||[];AppState.appData.legalRegister=e.filter(a=>a.id!==t),this._legalRegisterLocalSaveTime=Date.now(),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"deleteLegalRegister",data:{registerId:t}}).catch(a=>Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",a))}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",e)}},showLegalAmendments(t){this.ensureData();const e=(AppState.appData.legalRegister||[]).find(s=>s.id===t);if(!e){typeof Notification<"u"&&Notification.error&&Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}let a=e.amendments;if(typeof a=="string")try{a=JSON.parse(a)}catch{a=[]}Array.isArray(a)||(a=[]);const i=`
            <div class="modal-overlay active" id="lr-amendments-modal">
                <div class="modal-content" style="max-width: 780px; max-height: 90vh; overflow-y: auto;">
                    <div class="lr-modal-header lr-modal-header-alt">
                        <h3><i class="fas fa-history"></i>\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</h3>
                        <button class="modal-close" onclick="document.getElementById('lr-amendments-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="lr-amd-record-info">
                            <div><i class="fas fa-file-alt"></i> ${e.title||"\u2014"}</div>
                            <div><i class="fas fa-hashtag"></i> ${e.id||""}</div>
                        </div>

                        ${a.length===0?`
                            <div class="lr-amd-empty">
                                <i class="fas fa-history text-4xl text-gray-300 mb-3"></i>
                                <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0634\u0631\u064A\u0639</p>
                            </div>
                        `:`
                            <div class="lr-amd-timeline">
                                ${a.map((s,r)=>`
                                    <div class="lr-amd-item lr-amd-${r%2===0?"right":"left"}">
                                        <div class="lr-amd-dot"></div>
                                        <div class="lr-amd-content">
                                            <div class="lr-amd-header">
                                                <span class="lr-amd-num">\u062A\u062D\u062F\u064A\u062B ${s.amendmentNumber||r+1}</span>
                                                <span class="lr-amd-date">${s.date||""}</span>
                                            </div>
                                            <h4 class="lr-amd-title">${s.title||"\u062A\u062D\u062F\u064A\u062B"}</h4>
                                            <p class="lr-amd-desc">${s.description||""}</p>
                                            ${s.affectedArticles?`<div class="lr-amd-articles"><i class="fas fa-gavel"></i> \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u0629: ${s.affectedArticles}</div>`:""}
                                            ${s.newRequirements?`<div class="lr-amd-req"><i class="fas fa-clipboard-list"></i> \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629: ${s.newRequirements}</div>`:""}
                                            ${s.referenceLaw?`<div class="lr-amd-ref"><i class="fas fa-book"></i> \u0627\u0644\u0645\u0631\u062C\u0639: ${s.referenceLaw}</div>`:""}
                                        </div>
                                    </div>`).join("")}
                            </div>
                        `}

                        <button id="lr-add-amendment-btn" class="btn-primary btn-sm" style="width: 100%; justify-content: center; margin-top: 16px;">
                            <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0646\u0648\u0646\u064A
                        </button>
                    </div>
                </div>
            </div>
        `,n=document.getElementById("lr-amendments-modal");n&&n.remove(),document.body.insertAdjacentHTML("beforeend",i),document.getElementById("lr-add-amendment-btn").onclick=()=>{document.getElementById("lr-amendments-modal").remove(),this.showLegalAmendmentForm(t)}},showLegalAmendmentForm(t){this.ensureData();const e=`
            <div class="modal-overlay active" id="lr-amd-form-modal">
                <div class="modal-content" style="max-width: 640px;">
                    <div class="lr-modal-header lr-modal-header-alt">
                        <h3><i class="fas fa-plus-circle"></i>\u0625\u0636\u0627\u0641\u0629 \u062A\u062D\u062F\u064A\u062B \u0642\u0627\u0646\u0648\u0646\u064A</h3>
                        <button class="modal-close" onclick="document.getElementById('lr-amd-form-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="lr-amd-form" onsubmit="Training.handleAmendmentSubmit(event, '${t}')">
                        <input type="hidden" id="lr-amd-registerId" value="${t}">
                        <div class="modal-body">
                            <div class="lr-form-section">
                                <div class="form-group">
                                    <label class="form-label">\u0631\u0642\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B <span class="text-red-500">*</span></label>
                                    <input type="text" id="lr-amd-number" class="form-input" required placeholder="\u0645\u062B\u0627\u0644: 1">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062D\u062F\u064A\u062B</label>
                                    <input type="date" id="lr-amd-date" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u062D\u062F\u064A\u062B <span class="text-red-500">*</span></label>
                                    <input type="text" id="lr-amd-title" class="form-input" required placeholder="\u0645\u062B\u0627\u0644: \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0627\u062F\u0629 208 \u0645\u0646 \u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0639\u0645\u0644">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u0648\u0635\u0641 \u0627\u0644\u062A\u062D\u062F\u064A\u062B</label>
                                    <textarea id="lr-amd-description" class="form-input" rows="3" placeholder="\u0634\u0631\u062D \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0648\u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A"></textarea>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u0629</label>
                                    <input type="text" id="lr-amd-articles" class="form-input" placeholder="\u0645\u062B\u0627\u0644: 208\u060C 209\u060C 210">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629</label>
                                    <textarea id="lr-amd-requirements" class="form-input" rows="2" placeholder="\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0627\u0644\u0646\u0627\u062A\u062C\u0629 \u0639\u0646 \u0627\u0644\u062A\u0639\u062F\u064A\u0644"></textarea>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0644\u0644\u062A\u0639\u062F\u064A\u0644</label>
                                    <input type="text" id="lr-amd-reference" class="form-input" placeholder="\u0645\u062B\u0627\u0644: \u0642\u0627\u0646\u0648\u0646 \u0631\u0642\u0645 180 \u0644\u0633\u0646\u0629 2023">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-secondary" onclick="document.getElementById('lr-amd-form-modal').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,a=document.getElementById("lr-amd-form-modal");a&&a.remove(),document.body.insertAdjacentHTML("beforeend",e)},async handleAmendmentSubmit(t,e){t.preventDefault();const a=l=>{const d=document.getElementById(l);return d?d.value.trim():""},i={id:"AMD-"+Date.now(),amendmentNumber:a("lr-amd-number"),date:a("lr-amd-date"),title:a("lr-amd-title"),description:a("lr-amd-description"),affectedArticles:a("lr-amd-articles"),newRequirements:a("lr-amd-requirements"),referenceLaw:a("lr-amd-reference"),createdAt:new Date().toISOString()};if(!i.title||!i.amendmentNumber){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0648\u0627\u0644\u0639\u0646\u0648\u0627\u0646");return}const s=(AppState.appData.legalRegister||[]).find(l=>l.id===e);if(!s){typeof Notification<"u"&&Notification.error&&Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}let r=s.amendments;if(typeof r=="string")try{r=JSON.parse(r)}catch{r=[]}Array.isArray(r)||(r=[]),r.push(i),s.amendments=r,s.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();const o=document.getElementById("lr-amd-form-modal");o&&o.remove(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"updateLegalRegister",data:{registerId:e,updateData:{amendments:JSON.stringify(r),updatedAt:s.updatedAt}}}).catch(()=>{}),this.showLegalAmendments(e)},exportLegalTrainingExcel(){try{this.ensureData();const t=AppState.appData.legalTrainings||[];if(t.length===0){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const e=["\u0627\u0644\u0631\u0642\u0645","\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","\u0627\u0644\u062A\u0635\u0646\u064A\u0641","\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A","\u0627\u0644\u0645\u0627\u062F\u0629/\u0627\u0644\u0628\u0646\u062F","\u0627\u0644\u062F\u0648\u0631\u064A\u0629","\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629","\u0627\u0644\u0642\u0633\u0645","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0639\u0644\u064A","\u0627\u0644\u0645\u062F\u0631\u0628","\u0645\u0624\u0647\u0644\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0628","\u0627\u0644\u0645\u062F\u0629 (\u0633\u0627\u0639\u0629)","\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646","\u0627\u0644\u062D\u0627\u0644\u0629","\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","\u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0627\u0644\u062A\u0627\u0644\u064A","\u064A\u062A\u0637\u0644\u0628 \u0634\u0647\u0627\u062F\u0629","\u0639\u0642\u0648\u0628\u0629 \u0639\u062F\u0645 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],a=t.map(i=>[i.id||"",i.title||"",i.category||"",i.legalReference||"",i.legalArticle||"",i.frequency||"",i.targetGroup||"",i.department||"",i.factory||"",i.scheduledDate||"",i.actualDate||"",i.trainer||"",i.trainerQualification||"",i.duration||"",i.participantsCount||"",i.status||"",i.complianceStatus||"",i.expiryDate||"",i.nextDueDate||"",i.certificateRequired||"",i.penaltyForNonCompliance||"",i.notes||""]);if(typeof XLSX<"u"){const i=XLSX.utils.aoa_to_sheet([e,...a]),n=XLSX.utils.book_new();XLSX.utils.book_append_sheet(n,i,"\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629"),XLSX.writeFile(n,"\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A_\u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629_"+new Date().toISOString().slice(0,10)+".xlsx")}else Utils.safeWarn("\u0645\u0643\u062A\u0628\u0629 XLSX \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629")}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",t)}},async exportLegalTrainingPdf(){try{this.ensureData();const t=AppState.appData.legalTrainings||[];if(t.length===0){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const e=document.getElementById("export-legal-training-pdf-btn");e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin ml-1"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0635\u062F\u064A\u0631...');const a=(p,g)=>new Promise((f,m)=>{if(g())return f();const u=document.createElement("script");u.src=p,u.onload=()=>f(),u.onerror=()=>m(),document.head.appendChild(u)});await a("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await a("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const i=this.getLegalTrainingStats(),n=document.getElementById("legal-training-container"),s=n?n.innerHTML:"",r=AppState&&AppState.companySettings&&AppState.companySettings.name?String(AppState.companySettings.name).trim():AppState&&AppState.companyName?String(AppState.companyName).trim():"",o=AppState&&(AppState.companyLogo||AppState.companySettings&&AppState.companySettings.logo)&&(AppState.companyLogo||AppState.companySettings.logo)||"",l=o?`<img src="${o}" alt="" style="max-height:50px; max-width:130px; object-fit:contain;">`:"",d=`
                <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, sans-serif; padding: 30px; background: #fff; direction: rtl;">
                    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #1e40af; padding-bottom: 16px; margin-bottom: 20px;">
                        <div style="text-align: right;">
                            ${r?`<div style="font-size: 18px; font-weight: 700; color: #1e40af; margin-bottom: 4px; white-space: nowrap; word-break: keep-all;">${r}</div>`:""}
                            <h1 style="font-size: 20px; color: #1e293b; margin: 0 0 2px;">\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629</h1>
                            <p style="font-size: 12px; color: #64748b; margin: 0;">\u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0644\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0645\u0635\u0631\u064A\u0629 \u2014 Egyptian Law Compliance</p>
                        </div>
                        ${l?`<div style="flex-shrink: 0;">${l}</div>`:""}
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; gap: 12px; flex-wrap: wrap;">
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${new Date().toLocaleDateString("ar-EG")}</p>
                        </div>
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${t.length}</p>
                        </div>
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${i.complianceRate}%</p>
                        </div>
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">\u0645\u0645\u062A\u062B\u0644 / \u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${i.compliant} / ${i.nonCompliant}</p>
                        </div>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <thead>
                            <tr style="background: #1e40af; color: #fff;">
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">#</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: right;">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: right;">\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: right;">\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">\u0627\u0644\u062F\u0648\u0631\u064A\u0629</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">\u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${t.map((p,g)=>`
                                <tr style="background: ${g%2===0?"#fff":"#f8fafc"};">
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center; color: #64748b;">${g+1}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: right; font-weight: 600;">${p.title||"\u2014"}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: right; color: #475569;">${p.category||"\u2014"}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: right; color: #475569;">${p.legalReference||"\u2014"}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">${p.frequency||"\u2014"}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">${p.scheduledDate||"\u2014"}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">
                                        <span style="display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600;
                                            background: ${p.status==="\u0645\u0643\u062A\u0645\u0644"?"#dcfce7":p.status==="\u0645\u062E\u0637\u0637"?"#dbeafe":p.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"#fef3c7":"#f1f5f9"};
                                            color: ${p.status==="\u0645\u0643\u062A\u0645\u0644"?"#166534":p.status==="\u0645\u062E\u0637\u0637"?"#1e40af":p.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"#92400e":"#475569"};">
                                            ${p.status||"\u2014"}
                                        </span>
                                    </td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">
                                        <span style="display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600;
                                            background: ${p.complianceStatus==="\u0645\u0645\u062A\u062B\u0644"?"#dcfce7":p.complianceStatus==="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"?"#fecaca":p.complianceStatus==="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"#fef3c7":"#dbeafe"};
                                            color: ${p.complianceStatus==="\u0645\u0645\u062A\u062B\u0644"?"#166534":p.complianceStatus==="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"?"#991b1b":p.complianceStatus==="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"#92400e":"#1e40af"};">
                                            ${p.complianceStatus||"\u2014"}
                                        </span>
                                    </td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">${p.expiryDate||"\u2014"}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                    <div style="margin-top: 20px; text-align: center; color: #94a3b8; font-size: 11px; border-top: 1px solid #e2e8f0; padding-top: 12px;">
                        \u062A\u0645 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A ${new Date().toLocaleString("ar-EG")} \u2014 \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 HSE
                    </div>
                </div>
            `,c=document.createElement("div");c.style.cssText="position: absolute; left: -9999px; top: 0; z-index: -1;",c.innerHTML=d,document.body.appendChild(c);try{const p=await html2canvas(c,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1}),{jsPDF:g}=window.jspdf,f=new g({orientation:"landscape",unit:"mm",format:"a4"}),m=f.internal.pageSize.getWidth(),u=f.internal.pageSize.getHeight(),y=8,x=m-y*2,h=x/p.width,A=(u-y*2)/h,b=Math.ceil(p.height/A);for(let E=0;E<b;E++){E>0&&f.addPage();const T=document.createElement("canvas"),L=Math.min(A,p.height-E*A);T.width=p.width,T.height=L,T.getContext("2d").drawImage(p,0,E*A,p.width,L,0,0,p.width,L),f.addImage(T.toDataURL("image/jpeg",.95),"JPEG",y,y,x,L*h),f.setDrawColor(37,99,235),f.setLineWidth(.3),f.line(y,u-y+1,m-y,u-y+1),f.setTextColor(148,163,184),f.setFontSize(7),f.text(new Date().toISOString().slice(0,10),y,u-3),f.text(`${E+1} / ${b}`,m-y,u-3,{align:"right"})}f.save(`Legal_Trainings_${new Date().toISOString().slice(0,10)}.pdf`),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PDF \u0628\u0646\u062C\u0627\u062D")}finally{document.body.removeChild(c)}}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF:",t),typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 PDF")}finally{const t=document.getElementById("export-legal-training-pdf-btn");t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-file-pdf ml-1" style="font-size: 14px;"></i>PDF')}},_legalFileToBase64(t){return new Promise((e,a)=>{const i=new FileReader;i.onload=()=>e(i.result),i.onerror=a,i.readAsDataURL(t)})},showLegalTrainingAttendees(t){this.ensureData();const e=(AppState.appData.legalTrainings||[]).find(o=>o.id===t);if(!e){typeof Notification<"u"&&Notification.error&&Notification.error("\u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const a=(AppState.appData.legalTrainingAttendees||[]).filter(o=>o.legalTrainingId===t),i=o=>`<span class="px-2 py-1 rounded-full text-xs font-medium ${{\u062D\u0627\u0636\u0631:"bg-green-100 text-green-800",\u063A\u0627\u0626\u0628:"bg-red-100 text-red-800",\u0645\u0628\u0631\u0631:"bg-yellow-100 text-yellow-800"}[o]||"bg-gray-100 text-gray-800"}">${o||"\u2014"}</span>`,n=a.length===0?'<tr><td colspan="9" class="text-center py-6 text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u0645\u0633\u062C\u0644\u064A\u0646 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646</td></tr>':a.map(o=>`
                <tr>
                    <td class="text-sm">${o.employeeCode||"\u2014"}</td>
                    <td class="text-sm font-medium">${o.employeeName||"\u2014"}</td>
                    <td class="text-sm">${o.employeePosition||"\u2014"}</td>
                    <td class="text-sm">${o.department||"\u2014"}</td>
                    <td class="text-sm">${o.attendanceDate||"\u2014"}</td>
                    <td>${i(o.attendanceStatus)}</td>
                    <td class="text-sm">${o.certificateNumber||"\u2014"}</td>
                    <td class="text-sm text-center">
                        ${o.certificateImage?`<a href="${o.certificateImage}" target="_blank" class="text-blue-600 hover:underline" title="\u0639\u0631\u0636 \u0627\u0644\u0634\u0647\u0627\u062F\u0629"><i class="fas fa-file-image"></i> \u0639\u0631\u0636</a>`:"\u2014"}
                    </td>
                    <td>
                        <div class="flex items-center gap-1">
                            <button class="btn-icon btn-sm" onclick="Training.showAddAttendeeForm('${t}', '${o.id}')" title="\u062A\u0639\u062F\u064A\u0644">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon btn-sm text-red-600" onclick="Training.deleteLegalTrainingAttendee('${o.id}', '${t}')" title="\u062D\u0630\u0641">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join(""),s=`
            <div class="modal-overlay active" id="legal-attendees-modal">
                <div class="modal-content" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
                    <div class="legal-modal-header">
                        <h3><i class="fas fa-users"></i>\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u2014 ${e.title||""}</h3>
                        <button class="modal-close" onclick="document.getElementById('legal-attendees-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="legal-attendee-summary">
                            <div class="sum-item"><i class="fas fa-users"></i> ${a.length} \u0645\u062A\u062F\u0631\u0628</div>
                            <div class="sum-item"><i class="fas fa-certificate"></i> ${a.filter(o=>o.certificateImage).length} \u0634\u0647\u0627\u062F\u0629 \u0645\u0631\u0641\u0642\u0629</div>
                            <button class="btn-primary btn-sm" onclick="Training.showAddAttendeeForm('${t}')">
                                <i class="fas fa-user-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0645\u062A\u062F\u0631\u0628
                            </button>
                        </div>
                        <div class="table-responsive">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641</th>
                                        <th>\u0627\u0644\u0627\u0633\u0645</th>
                                        <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                                        <th>\u0627\u0644\u0642\u0633\u0645</th>
                                        <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0636\u0648\u0631</th>
                                        <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                        <th>\u0631\u0642\u0645 \u0627\u0644\u0634\u0647\u0627\u062F\u0629</th>
                                        <th>\u0627\u0644\u0634\u0647\u0627\u062F\u0629</th>
                                        <th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                    </tr>
                                </thead>
                                <tbody>${n}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `,r=document.getElementById("legal-attendees-modal");r&&r.remove(),document.body.insertAdjacentHTML("beforeend",s)},showAddAttendeeForm(t,e){this.ensureData();let a=null;e&&(a=(AppState.appData.legalTrainingAttendees||[]).find(d=>d.id===e));const i=!!a,n=(d,c)=>a&&a[d]!=null?a[d]:c||"",s=(AppState.appData.legalTrainings||[]).find(d=>d.id===t),r=s?s.title:"",o=`
            <div class="modal-overlay active" id="legal-attendee-form-modal" style="z-index: 10001;">
                <div class="modal-content" style="max-width: 720px; max-height: 90vh; overflow-y: auto;">
                    <div class="legal-modal-header">
                        <h3><i class="fas fa-user-plus"></i>${i?"\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629"} \u0645\u062A\u062F\u0631\u0628</h3>
                        <button class="modal-close" onclick="document.getElementById('legal-attendee-form-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="legal-attendee-form" onsubmit="Training.handleAttendeeSubmit(event, '${t}', '${e||""}')">
                        <div class="modal-body">
                            <div class="legal-attendee-summary">
                                <div class="sum-item"><i class="fas fa-gavel"></i> \u0627\u0644\u062A\u062F\u0631\u064A\u0628: <strong>${r}</strong></div>
                            </div>

                            <div class="legal-form-section">
                                <div class="section-title"><i class="fas fa-user"></i>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 <span class="text-red-500">*</span></label>
                                        <input type="text" id="lta-employeeCode" class="form-input" value="${n("employeeCode")}" required placeholder="\u0645\u062B\u0627\u0644: EMP001">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 <span class="text-red-500">*</span></label>
                                        <input type="text" id="lta-employeeName" class="form-input" value="${n("employeeName")}" required placeholder="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0648\u0638\u064A\u0641\u0629</label>
                                        <input type="text" id="lta-employeePosition" class="form-input" value="${n("employeePosition")}" placeholder="\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0642\u0633\u0645</label>
                                        <input type="text" id="lta-department" class="form-input" value="${n("department")}" placeholder="\u0627\u0644\u0642\u0633\u0645">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639</label>
                                        <input type="text" id="lta-factory" class="form-input" value="${n("factory")}" placeholder="\u0627\u0644\u0645\u0635\u0646\u0639 \u0623\u0648 \u0627\u0644\u0645\u0648\u0642\u0639">
                                    </div>
                                </div>
                            </div>

                            <div class="legal-form-section">
                                <div class="section-title"><i class="fas fa-calendar-check"></i>\u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u062A\u0642\u064A\u064A\u0645</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0636\u0648\u0631</label>
                                        <input type="date" id="lta-attendanceDate" class="form-input" value="${n("attendanceDate",new Date().toISOString().slice(0,10))}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062D\u0627\u0644\u0629 \u0627\u0644\u062D\u0636\u0648\u0631</label>
                                        <select id="lta-attendanceStatus" class="form-input">
                                            <option value="\u062D\u0627\u0636\u0631" ${n("attendanceStatus","\u062D\u0627\u0636\u0631")==="\u062D\u0627\u0636\u0631"?"selected":""}>\u062D\u0627\u0636\u0631</option>
                                            <option value="\u063A\u0627\u0626\u0628" ${n("attendanceStatus")==="\u063A\u0627\u0626\u0628"?"selected":""}>\u063A\u0627\u0626\u0628</option>
                                            <option value="\u0645\u0628\u0631\u0631" ${n("attendanceStatus")==="\u0645\u0628\u0631\u0631"?"selected":""}>\u063A\u064A\u0627\u0628 \u0645\u0628\u0631\u0631</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u0627\u0644\u062F\u0631\u062C\u0629 / \u0627\u0644\u062A\u0642\u064A\u064A\u0645</label>
                                        <input type="text" id="lta-score" class="form-input" value="${n("score")}" placeholder="\u0645\u062B\u0627\u0644: \u0646\u0627\u062C\u062D\u060C 85%">
                                    </div>
                                </div>
                            </div>

                            <div class="legal-form-section">
                                <div class="section-title"><i class="fas fa-certificate"></i>\u0627\u0644\u0634\u0647\u0627\u062F\u0629</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">\u0631\u0642\u0645 \u0627\u0644\u0634\u0647\u0627\u062F\u0629</label>
                                        <input type="text" id="lta-certificateNumber" class="form-input" value="${n("certificateNumber")}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0634\u0647\u0627\u062F\u0629 \u0625\u0646 \u0648\u062C\u062F">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0634\u0647\u0627\u062F\u0629</label>
                                        <input type="date" id="lta-certificateDate" class="form-input" value="${n("certificateDate")}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0634\u0647\u0627\u062F\u0629</label>
                                        <input type="date" id="lta-certificateExpiryDate" class="form-input" value="${n("certificateExpiryDate")}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label"><i class="fas fa-camera ml-1"></i> \u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u0647\u0627\u062F\u0629</label>
                                        <input type="file" id="lta-certificateImage" class="form-input" accept="image/*,.pdf">
                                        ${n("certificateImage")?`<div class="mt-2"><a href="${n("certificateImage")}" target="_blank" class="text-blue-600 text-sm hover:underline"><i class="fas fa-file-image ml-1"></i> \u0639\u0631\u0636 \u0627\u0644\u0634\u0647\u0627\u062F\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</a></div>`:""}
                                    </div>
                                </div>
                            </div>

                            <div class="legal-form-section">
                                <div class="section-title"><i class="fas fa-sticky-note"></i>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</div>
                                <div class="form-group">
                                    <textarea id="lta-notes" class="form-input" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${n("notes")}</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-secondary" onclick="document.getElementById('legal-attendee-form-modal').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary" id="lta-submit-btn">
                                <i class="fas fa-save ml-2"></i>${i?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062A\u062F\u0631\u0628"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,l=document.getElementById("legal-attendee-form-modal");l&&l.remove(),document.body.insertAdjacentHTML("beforeend",o),typeof EmployeeHelper<"u"&&typeof EmployeeHelper.setupEmployeeCodeSearch=="function"&&EmployeeHelper.setupEmployeeCodeSearch("lta-employeeCode","lta-employeeName",d=>{if(d){const c=document.getElementById("lta-employeePosition"),p=document.getElementById("lta-department"),g=document.getElementById("lta-factory");c&&!c.value&&(c.value=d.position||d.jobTitle||""),p&&!p.value&&(p.value=d.department||d.unit||d.section||""),g&&!g.value&&(g.value=d.factory||d.factoryName||d.location||"")}},{employeeNotFoundWarn:"blur-enter"})},async handleAttendeeSubmit(t,e,a){t.preventDefault();const i=!!a,n=l=>{const d=document.getElementById(l);return d?d.value.trim():""},s={legalTrainingId:e,employeeCode:n("lta-employeeCode"),employeeName:n("lta-employeeName"),employeePosition:n("lta-employeePosition"),department:n("lta-department"),factory:n("lta-factory"),factoryName:n("lta-factory"),attendanceDate:n("lta-attendanceDate"),attendanceStatus:n("lta-attendanceStatus"),score:n("lta-score"),certificateNumber:n("lta-certificateNumber"),certificateDate:n("lta-certificateDate"),certificateExpiryDate:n("lta-certificateExpiryDate"),notes:n("lta-notes")},r=(AppState.appData.legalTrainings||[]).find(l=>l.id===e);if(s.legalTrainingTitle=r?r.title:"",!s.employeeCode||!s.employeeName){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 \u0648\u0627\u0633\u0645\u0647");return}const o=document.getElementById("lta-submit-btn");o&&(o.disabled=!0,o.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const l=document.getElementById("lta-certificateImage");if(l&&l.files&&l.files.length>0){const d=l.files[0];if(d.size>10485760){typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B (\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 10 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A)"),o&&(o.disabled=!1,o.innerHTML='<i class="fas fa-save ml-2"></i>'+(i?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062A\u062F\u0631\u0628"));return}try{typeof Loading<"u"&&Loading.show&&Loading.show();const c=await this._legalFileToBase64(d),p=`legal_cert_${e}_${s.employeeCode}_${Date.now()}.${d.name.split(".").pop()}`,g=d.type||"image/jpeg";if(typeof GoogleIntegration<"u"&&GoogleIntegration.uploadFileToDrive){const f=await GoogleIntegration.uploadFileToDrive(c,p,g,"LegalTrainingCertificates");f&&f.success?s.certificateImage=f.directLink||f.shareableLink||c:s.certificateImage=c}else s.certificateImage=c;typeof Loading<"u"&&Loading.hide&&Loading.hide()}catch(c){typeof Loading<"u"&&Loading.hide&&Loading.hide(),Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0631\u0641\u0639 \u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u0647\u0627\u062F\u0629 \u0625\u0644\u0649 Drive:",c);try{s.certificateImage=await this._legalFileToBase64(l.files[0])}catch{s.certificateImage=""}}}else if(i){const d=(AppState.appData.legalTrainingAttendees||[]).find(c=>c.id===a);d&&d.certificateImage&&(s.certificateImage=d.certificateImage)}if(i){s.id=a,s.updatedAt=new Date().toISOString();const d=AppState.appData.legalTrainingAttendees||[],c=d.findIndex(g=>g.id===a);c!==-1&&Object.assign(d[c],s),this._legalAttendeesLocalSaveTime=Date.now();const p=document.getElementById("legal-attendee-form-modal");if(p&&p.remove(),this.showLegalTrainingAttendees(e),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628 \u0628\u0646\u062C\u0627\u062D"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{await GoogleIntegration.sendRequest({action:"updateLegalTrainingAttendee",data:{attendeeId:a,updateData:s}})}catch(g){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645:",g)}}else{s.createdAt=new Date().toISOString(),s.updatedAt=s.createdAt,s.createdBy=AppState.currentUser?.email||"",AppState.appData.legalTrainingAttendees||(AppState.appData.legalTrainingAttendees=[]);const d="LTA-LOCAL-"+Date.now();if(s.id=d,AppState.appData.legalTrainingAttendees.push(s),this._legalAttendeesLocalSaveTime=Date.now(),this._updateLegalTrainingParticipantsCount(e),typeof Notification<"u"&&Notification.success&&Notification.success("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628..."),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const p=Object.assign({},s);delete p.id;try{const g=await GoogleIntegration.sendRequest({action:"addLegalTrainingAttendee",data:p});if(g&&g.success&&g.data&&g.data.id){const f=AppState.appData.legalTrainingAttendees||[],m=f.findIndex(u=>u.id===d);m!==-1&&(f[m].id=g.data.id)}}catch(g){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645:",g)}}const c=document.getElementById("legal-attendee-form-modal");c&&c.remove(),this.showLegalTrainingAttendees(e),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062A\u062F\u0631\u0628 \u0628\u0646\u062C\u0627\u062D")}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(l){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628:",l),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638"),o&&(o.disabled=!1,o.innerHTML='<i class="fas fa-save ml-2"></i>'+(i?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062A\u062F\u0631\u0628"))}},_updateLegalTrainingParticipantsCount(t){const e=(AppState.appData.legalTrainingAttendees||[]).filter(i=>i.legalTrainingId===t),a=(AppState.appData.legalTrainings||[]).find(i=>i.id===t);a&&(a.participantsCount=e.length,this._legalTrainingsLocalSaveTime=Date.now(),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"updateLegalTraining",data:{trainingId:t,updateData:{participantsCount:e.length}}}).catch(()=>{}))},async deleteLegalTrainingAttendee(t,e){if(t&&confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u061F"))try{const a=AppState.appData.legalTrainingAttendees||[];AppState.appData.legalTrainingAttendees=a.filter(i=>i.id!==t),this._legalAttendeesLocalSaveTime=Date.now(),this._updateLegalTrainingParticipantsCount(e),this.showLegalTrainingAttendees(e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062A\u062F\u0631\u0628"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"deleteLegalTrainingAttendee",data:{attendeeId:t}}).catch(i=>Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u0645\u062A\u062F\u0631\u0628 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",i))}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u062A\u062F\u0631\u0628:",a)}}};if(typeof window<"u")try{window.Training=Training,document.dispatchEvent(new CustomEvent("hse-training-module-ready",{detail:{source:"training.js"}}))}catch{}(function(){"use strict";try{typeof window<"u"&&typeof Training<"u"&&(window.Training=Training,typeof window<"u"&&window.addEventListener("formSettingsUpdated",function(){try{typeof Training<"u"&&Training.refreshSiteDropdowns&&Training.refreshSiteDropdowns()}catch{}}),document.addEventListener("click",function(t){var e=t.target&&t.target.closest?t.target.closest('#add-training-btn, #add-training-empty-btn, [data-action="open-training-form"]'):null;e&&(t.preventDefault(),typeof Training<"u"&&typeof Training.showForm=="function"&&Training.showForm())}),typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Training module loaded and available on window.Training"))}catch{if(typeof window<"u"&&typeof Training<"u")try{window.Training=Training}catch{}}})();
