const Training={applyModuleI18n(t){const e=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!e)return;const a=t||document.getElementById("training-section")||document;e.applyI18n(a),typeof e.applyLiteralTranslations=="function"&&e.applyLiteralTranslations(a)},currentEditId:null,trainingAnalysisCharts:null,_trainingDataLoadPromise:null,_trainingBackendFetchOk:!1,_trainingTabFetchOk:{programs:!1,attendance:!1,legalTraining:!1},_contractorTrainingsFetchOk:!1,_contractorTrainingsLoadPromise:null,_currentActiveTab:"programs",_tabCache:{programs:null,contractors:null,attendance:null,analysis:null,legalTraining:null},_tabDirty:{programs:!0,contractors:!0,attendance:!0,analysis:!0,legalTraining:!0},_bundleActionUnsupported:!1,_analysisExportContext:null,_contractorTrainingsLocalSaveTime:0,ensureData(){const t=AppState.appData||{};Array.isArray(t.training)||(t.training=[]),Array.isArray(t.trainingSessions)||(t.trainingSessions=[]),Array.isArray(t.trainingCertificates)||(t.trainingCertificates=[]),Array.isArray(t.trainingAttendance)||(t.trainingAttendance=[]),Array.isArray(t.contractorTrainings)||(t.contractorTrainings=[]),Array.isArray(t.legalTrainings)||(t.legalTrainings=[]),Array.isArray(t.legalRegister)||(t.legalRegister=[]),Array.isArray(t.legalTrainingAttendees)||(t.legalTrainingAttendees=[]),(!t.employeeTrainingMatrix||typeof t.employeeTrainingMatrix!="object")&&(t.employeeTrainingMatrix={}),(!t.trainingAnalysisData||typeof t.trainingAnalysisData!="object")&&(t.trainingAnalysisData={}),AppState.appData=t,this.fixExistingContractorTrainingTimes()},getParticipantsCount(t){if(!t||typeof t!="object")return 0;const e=Number(t.participantsCount);return Number.isFinite(e)?e:Array.isArray(t.participants)?t.participants.length:0},getTrainingProgramHours(t){if(!t||typeof t!="object")return 0;const e=parseFloat(t.totalHours??t.trainingHours??t.hours??0);return Number.isFinite(e)?e:0},getParticipantsArray(t){if(!t||typeof t!="object")return[];const e=t.participants;if(Array.isArray(e))return e;if(typeof e=="string"&&e.trim())try{const a=JSON.parse(e);return Array.isArray(a)?a:[]}catch{return[]}return[]},fixExistingContractorTrainingTimes(){const t=AppState.appData?.contractorTrainings;if(!Array.isArray(t)||t.length===0)return;let e=!1,a=0;t.forEach(i=>{if(!i)return;const n=i.startTime||i.fromTime,o=i.endTime||i.toTime,r=n&&String(n).trim()!==""&&n!=="\u2014"&&n!=="-"&&n!=="null"&&n!=="undefined",s=o&&String(o).trim()!==""&&o!=="\u2014"&&o!=="-"&&o!=="null"&&o!=="undefined";if(!r||!s){a++,r||(i.startTime="09:00",i.fromTime!==void 0&&(i.fromTime="09:00"),e=!0),s||(i.endTime="10:00",i.toTime!==void 0&&(i.toTime="10:00"),e=!0);const l=i.startTime||i.fromTime,c=i.endTime||i.toTime;if(l&&c){const d=this.calculateDuration(l,c);if(d>0&&((!i.durationMinutes||i.durationMinutes===0)&&(i.durationMinutes=d,e=!0),!i.totalHours||i.totalHours===0)){const p=parseInt(i.traineesCount||i.attendees||0,10);p>0&&(i.totalHours=parseFloat((d/60*p).toFixed(2)),e=!0)}}}}),e&&(typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0635\u0644\u0627\u062D ${a} \u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628 \u0628\u0625\u0636\u0627\u0641\u0629 \u0623\u0648\u0642\u0627\u062A \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629`),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())},calculateDuration(t,e){if(!t||!e)return 0;try{const a=t.split(":"),i=e.split(":");if(a.length<2||i.length<2)return 0;const n=parseInt(a[0],10)*60+parseInt(a[1],10);let r=parseInt(i[0],10)*60+parseInt(i[1],10)-n;return r<0&&(r+=1440),r}catch{return 0}},getTrainingAnalysisStorageKeys(){return{cards:"training_infoCards",items:"training_analysisItems"}},getTrainingDefaultAnalysisCards(){return[{id:"card_total_trainings",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0631\u0627\u0645\u062C",icon:"fas fa-graduation-cap",color:"blue",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628",enabled:!0,mode:"metric",metric:"totalTrainings"},{id:"card_completed_trainings",title:"\u0628\u0631\u0627\u0645\u062C \u0645\u0643\u062A\u0645\u0644\u0629",icon:"fas fa-check-circle",color:"green",description:"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629",enabled:!0,mode:"metric",metric:"completedTrainings"},{id:"card_total_participants",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646",icon:"fas fa-users",color:"purple",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646 \u0641\u064A \u0627\u0644\u0628\u0631\u0627\u0645\u062C",enabled:!0,mode:"metric",metric:"totalParticipants"},{id:"card_contractor_trainings",title:"\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",icon:"fas fa-briefcase",color:"amber",description:"\u0639\u062F\u062F \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",enabled:!0,mode:"metric",metric:"contractorTrainings"},{id:"card_total_hours",title:"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628",icon:"fas fa-clock",color:"indigo",description:"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0633\u062C\u0644\u0629",enabled:!0,mode:"metric",metric:"totalTrainingHours"},{id:"card_unique_employees",title:"\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0627\u0644\u0645\u062F\u0631\u0628\u0648\u0646",icon:"fas fa-user-graduate",color:"teal",description:"\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0641\u0631\u064A\u062F\u064A\u0646 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646",enabled:!0,mode:"metric",metric:"uniqueEmployees"}]},getTrainingDefaultAnalysisItems(){return[{id:"trainings_by_status",label:"\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629",enabled:!0,dataset:"training",field:"status",chartType:"doughnut"},{id:"trainings_by_type",label:"\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639",enabled:!0,dataset:"training",field:"trainingType",chartType:"bar"},{id:"trainings_by_month",label:"\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631",enabled:!0,dataset:"training",field:"byMonth",chartType:"line"},{id:"contractor_by_company",label:"\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062D\u0633\u0628 \u0627\u0644\u0634\u0631\u0643\u0629",enabled:!1,dataset:"contractorTrainings",field:"contractorName",chartType:"bar"},{id:"contractor_by_topic",label:"\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0636\u0648\u0639",enabled:!1,dataset:"contractorTrainings",field:"topic",chartType:"bar"},{id:"attendance_by_type",label:"\u0627\u0644\u062D\u0636\u0648\u0631 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628",enabled:!1,dataset:"trainingAttendance",field:"trainingType",chartType:"doughnut"},{id:"attendance_by_factory",label:"\u0627\u0644\u062D\u0636\u0648\u0631 \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0646\u0639",enabled:!1,dataset:"trainingAttendance",field:"factoryName",chartType:"bar"},{id:"attendance_by_department",label:"\u0627\u0644\u062D\u0636\u0648\u0631 \u062D\u0633\u0628 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",enabled:!1,dataset:"trainingAttendance",field:"department",chartType:"bar"}]},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{try{const e=document.getElementById("training-section");e&&this.applyModuleI18n(e)}catch{}this._markAllTabsDirty(),this._currentActiveTab&&this.switchTab(this._currentActiveTab)}),this._languageChangeListenerAdded=!0),this.ensureData(),typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{Permissions.ensureFormSettingsState().catch(()=>{})}catch{}const t=document.getElementById("training-section");if(!t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError(" \u0642\u0633\u0645 training-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u0645\u062F\u064A\u0648\u0644 Training \u064A\u0643\u062A\u0628 \u0641\u064A \u0642\u0633\u0645: training-section");try{const e=this.isCurrentUserAdmin();t.innerHTML=`
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
                        <i class="fas fa-user-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u062A\u062F\u0631\u064A\u0628 \u0645\u0648\u0638\u0641
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

\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0648\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062E\u0627\u062F\u0645 SQL.`,i=()=>Date.now()-(this._contractorTrainingsLocalSaveTime||0)>6e4,n=await Utils.promiseWithTimeout(GoogleIntegration.sendRequest({action:"getAllContractorTrainings",data:{filters:{},__timeoutMs:e,__highPriority:!0}}),e,a).catch(r=>(Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 (\u0623\u0648\u0644\u0648\u064A\u0629):",r),{success:!1,data:[]})),o=n&&n.success&&Array.isArray(n.data)?n.data:null;o&&(t=!0,i()&&(AppState.appData.contractorTrainings=this._dedupeRegistryRecords(o),this._onContractorTrainingsUpdated()))}finally{this._contractorTrainingsFetchOk=t,typeof StableLoader<"u"&&StableLoader.endOwnedFetch("training-contractors")}},async loadTrainingDataAsync(){return this._fetchTrainingTabFromBackend(this._currentActiveTab||"programs")},async _fetchTrainingTabFromBackend(t){const e=t||this._currentActiveTab||"programs";if(e!=="programs"&&this._trainingTabFetchOk[e]===!0)return;const a="training:"+e,i=()=>this._runLoadTrainingDataAsyncWrapped_(e);return typeof StableLoader<"u"&&typeof StableLoader.runExclusive=="function"?StableLoader.runExclusive(a,i):this._trainingDataLoadPromise?this._trainingDataLoadPromise:(this._trainingDataLoadPromise=i().finally(()=>{this._trainingDataLoadPromise=null}),this._trainingDataLoadPromise)},async _runLoadTrainingDataAsyncWrapped_(t){typeof StableLoader<"u"&&StableLoader.beginOwnedFetch("training");try{return await this._runLoadTrainingDataAsync(t)}finally{typeof StableLoader<"u"&&StableLoader.endOwnedFetch("training")}},async _runLoadTrainingDataAsync(t){const e=AppState.appData?.training?.length>0||AppState.appData?.trainingSessions?.length>0||AppState.appData?.trainingCertificates?.length>0,a=Array.isArray(AppState.appData?.contractorTrainings)&&AppState.appData.contractorTrainings.length>0;if(e&&this._currentActiveTab==="programs"&&this.loadTrainingList(),a&&this._currentActiveTab==="contractors"&&this._showContractorLocalDataIfAny(),!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl){AppState.debugMode&&Utils.safeLog("\u26A0\uFE0F \u062E\u0627\u062F\u0645 SQL \u063A\u064A\u0631 \u0645\u0641\u0639\u0644 - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0641\u0642\u0637"),this._trainingBackendFetchOk=!0,this._trainingTabFetchOk={programs:!0,attendance:!0,legalTraining:!0},this._contractorTrainingsFetchOk=!0;return}if(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"){Utils.safeWarn("\u26A0\uFE0F GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629"),this._trainingBackendFetchOk=!0,this._trainingTabFetchOk={programs:!0,attendance:!0,legalTraining:!0},this._contractorTrainingsFetchOk=!0;return}const i=2e4,n=`\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645

\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0648\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062E\u0627\u062F\u0645 SQL.`,o=r=>{typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{localStorage.setItem("training_last_sync",String(Date.now()))}catch{}this._markAllTabsDirty();const s=this._currentActiveTab||"programs";if(s==="programs")this.loadTrainingList();else if(s==="contractors"){this.refreshContractorTrainingList(),this._syncSelectOptions("contractor-month-filter",this.getMonthOptions());try{this.updateContractorStatsWithFilter(document.getElementById("contractor-month-filter")?.value||"")}catch{}}else s==="attendance"?this.loadAttendanceRegistry():s==="legalTraining"?this.loadLegalTrainingList():s==="analysis"&&this.refreshAnalysisTabContent();const l=r||s;l==="programs"&&(this._trainingBackendFetchOk=!0),this._trainingTabFetchOk&&Object.prototype.hasOwnProperty.call(this._trainingTabFetchOk,l)&&(this._trainingTabFetchOk[l]=!0)};try{const r=y=>Utils.promiseWithTimeout(y,i,n),s={filters:{},__timeoutMs:i},l=async(y,x)=>{const b=await r(GoogleIntegration.sendRequest({action:y,data:{...s}})).catch(S=>{const I=S?.message||S?.toString()||"";return I.includes("\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644")||I.includes("timeout")?Utils.safeWarn("\u26A0\uFE0F \u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 - \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629"):Utils.safeWarn(`\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 ${x}:`,S),{success:!1,data:[]}});return b&&b.success&&Array.isArray(b.data)?b.data:null},c=t||this._currentActiveTab||"programs",d=()=>Date.now()-(this._trainingLocalSaveTime||0)>6e4,p=()=>Date.now()-(this._trainingAttendanceLocalSaveTime||0)>6e4,g=()=>Date.now()-(this._legalTrainingsLocalSaveTime||0)>6e4,f=()=>Date.now()-(this._legalAttendeesLocalSaveTime||0)>6e4,u=()=>Date.now()-(this._legalRegisterLocalSaveTime||0)>6e4;if(c==="contractors"){await this.loadContractorTrainingsPriority(),o(c);return}if(c==="attendance"){const y=await l("getAllTrainingAttendance","\u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631");Array.isArray(y)&&y.length>0&&p()&&(AppState.appData.trainingAttendance=this._dedupeRegistryRecords(y)),o(c),this._trainingTabFetchOk.programs!==!0&&l("getAllTrainings","\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628").then(x=>{Array.isArray(x)&&x.length>0&&d()&&(AppState.appData.training=x,this._trainingTabFetchOk.programs=!0,this._trainingBackendFetchOk=!0,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())}).catch(()=>{});return}if(c==="legalTraining"){const y=await l("getAllLegalTrainings","\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629");Array.isArray(y)&&y.length>0&&g()&&(AppState.appData.legalTrainings=y);const x=await l("getAllLegalTrainingAttendees","\u062D\u0636\u0648\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629");Array.isArray(x)&&x.length>0&&f()&&(AppState.appData.legalTrainingAttendees=x);const b=await l("getAllLegalRegisters","\u0633\u062C\u0644 \u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A");Array.isArray(b)&&b.length>0&&u()&&(AppState.appData.legalRegister=b),o(c);return}const m=await l("getAllTrainings","\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628");Array.isArray(m)&&m.length>0&&d()&&(AppState.appData.training=m,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${m.length} \u0628\u0631\u0646\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A`)),o(c)}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",r),this._trainingBackendFetchOk=!0,this._trainingTabFetchOk={programs:!0,attendance:!0,legalTraining:!0},this._contractorTrainingsFetchOk=!0}},getStats(){this.ensureData();const t=AppState.appData.training||[],e=new Date;let a=0,i=0,n=0;return t.forEach(o=>{const r=this.getParticipantsCount(o);a+=r,o.status==="\u0645\u0643\u062A\u0645\u0644"&&(n+=1);const s=o.startDate?new Date(o.startDate):null;(o.status==="\u0645\u062E\u0637\u0637"||s&&s>=e)&&(i+=1)}),{totalTrainings:t.length,upcomingTrainings:i,completedTrainings:n,totalParticipants:a}},getStatsFromTrainingsArray(t){const e=Array.isArray(t)?t:[],a=new Date;let i=0,n=0,o=0;return e.forEach(r=>{i+=this.getParticipantsCount(r),r.status==="\u0645\u0643\u062A\u0645\u0644"&&(o+=1);const s=r.startDate?new Date(r.startDate):null;(r.status==="\u0645\u062E\u0637\u0637"||s&&s>=a)&&(n+=1)}),{totalTrainings:e.length,upcomingTrainings:n,completedTrainings:o,totalParticipants:i}},refreshProgramsTabKpiCards(){const t=this.getStats();[["training-programs-kpi-total",t.totalTrainings],["training-programs-kpi-upcoming",t.upcomingTrainings],["training-programs-kpi-completed",t.completedTrainings],["training-programs-kpi-participants",t.totalParticipants]].forEach(([a,i])=>{const n=document.getElementById(a);n&&(n.textContent=String(i))})},getContractorTrainingStats(t=""){this.ensureData();const e=this._dedupeRegistryRecords(AppState.appData.contractorTrainings||[]),a=this.getContractorOptions(),i=new Map(a.map(u=>[String(u?.id??"").trim(),u.name||""]));i.size===0&&(AppState.appData.contractors||[]).filter(m=>m&&m.isActive!=="inactive"&&m.isActive!==!1&&m.isActive!=="false"&&m.isActive!=="FALSE").forEach(m=>{m?.id&&i.set(String(m.id).trim(),m.name||m.company||m.contractorName||"")});let n=e;t&&(n=e.filter(u=>{if(!u.date)return!1;const m=new Date(u.date);return`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`===t}));const o=new Set,r=new Set,s=new Set;let l=0;const c={},d={},p=new Date,g=`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`;let f=0;return n.forEach(u=>{u.topic&&o.add(u.topic);const m=String(u.contractorId||"").trim(),y=String(u.contractorName||"").replace(/\s+/g," ").trim(),b=y&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(y)?y:i.get(m)||y||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";(m||u.contractorName)&&r.add(b);const S=u.trainer||u.conductedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";(u.trainer||u.conductedBy)&&s.add(S);const I=Number(u.traineesCount||u.attendees||0);l+=I;const h=parseFloat(u.totalHours||u.trainingHours||0);if(c[b]||(c[b]={count:0,trainees:0,hours:0}),c[b].count+=1,c[b].trainees+=I,c[b].hours+=h,d[S]||(d[S]={count:0,trainees:0,hours:0}),d[S].count+=1,d[S].trainees+=I,d[S].hours+=h,u.date){const k=new Date(u.date);`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`===g&&(f+=1)}}),{uniqueTopics:o.size,uniqueContractors:r.size,totalTrainees:l,uniqueTrainers:s.size,currentMonthCount:f,contractorDetails:c,trainerDetails:d}},renderContractorDetailsTable(t){const e=Object.entries(t);return e.length===0?'<tr><td colspan="4" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>':e.sort((a,i)=>i[1].count-a[1].count).map(([a,i])=>`
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
            `).join("")},getContractorAnalyticsState(){return this._contractorAnalyticsState=this._contractorAnalyticsState||{contractor:"",trainer:"",topic:"",location:"",search:"",view:"contractor",drillMode:"contractor",sortBy:"hours",sortDir:"desc",drillKey:""},this._contractorAnalyticsState},resetContractorAnalyticsState(){this._contractorAnalyticsState={contractor:"",trainer:"",topic:"",location:"",search:"",view:"contractor",drillMode:"contractor",sortBy:"hours",sortDir:"desc",drillKey:""}},getContractorTrainingAnalyticsModel(t=""){this.ensureData();const e=Array.isArray(AppState.appData.contractorTrainings)?AppState.appData.contractorTrainings:[],a=this.getContractorOptions(),i=new Map((a||[]).map(d=>[String(d?.id||"").trim(),String(d?.name||"").trim()])),n=d=>{if(!d)return"";const p=new Date(d);return Number.isNaN(p.getTime())?"":`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`},o=d=>String(d??"").replace(/\s+/g," ").trim(),r=d=>o(d).toLowerCase(),s=e.filter(d=>t?n(d?.date)===t:!0).map(d=>{const p=String(d?.contractorId??"").trim(),g=o(d?.contractorName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),u=g&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(g)?g:o(i.get(p)||g||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),m=o(d?.trainer||d?.conductedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),y=o(d?.topic||"\u2014"),x=o(d?.location||"\u2014"),b=o(d?.subLocation||"\u2014"),S=Number(d?.traineesCount||d?.attendees||0)||0,I=parseFloat(d?.totalHours||d?.trainingHours||0)||0,h=d?.date?new Date(d.date):null;return{raw:d,date:h,dateKey:d?.date?String(d.date):"",monthKey:n(d?.date),contractorId:p,contractorName:u,contractorNameKey:r(u),trainer:m,trainerKey:r(m),topic:y,topicKey:r(y),location:x,locationKey:r(x),subLocation:b,trainees:S,hours:I}}),l=d=>Array.from(new Set(d.filter(Boolean))).sort((p,g)=>p.localeCompare(g,"ar",{sensitivity:"base"})),c={contractors:l(s.map(d=>d.contractorName)),trainers:l(s.map(d=>d.trainer)),topics:l(s.map(d=>d.topic)),locations:l(s.map(d=>d.location))};return{monthFilter:t,records:s,dimensions:c}},computeContractorAnalytics(t,e){const a=h=>String(h??"").replace(/\s+/g," ").trim().toLowerCase(),i=a(e.contractor),n=a(e.trainer),o=a(e.topic),r=a(e.location),s=a(e.search),l=(t.records||[]).filter(h=>!(i&&h.contractorNameKey!==i||n&&h.trainerKey!==n||o&&h.topicKey!==o||r&&h.locationKey!==r||s&&!`${h.contractorNameKey} ${h.trainerKey} ${h.topicKey} ${h.locationKey}`.includes(s))),c={programs:l.length,trainees:l.reduce((h,k)=>h+(k.trainees||0),0),hours:l.reduce((h,k)=>h+(k.hours||0),0),contractors:new Set(l.map(h=>h.contractorNameKey)).size,trainers:new Set(l.map(h=>h.trainerKey)).size,topics:new Set(l.map(h=>h.topicKey)).size},d=(h,k)=>{const $=new Map;return l.forEach(w=>{const A=w[h]||"",D=w[k]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(!A)return;$.has(A)||$.set(A,{key:A,label:D,count:0,trainees:0,hours:0});const F=$.get(A);F.count+=1,F.trainees+=w.trainees||0,F.hours+=w.hours||0}),Array.from($.values())},p=d("contractorNameKey","contractorName"),g=d("trainerKey","trainer"),f=e.sortDir==="asc"?1:-1,u=e.sortBy||"hours",m=h=>h.slice().sort(($,w)=>{const A=$[u]??0,D=w[u]??0;return D===A?($.label||"").localeCompare(w.label||"","ar",{sensitivity:"base"})*f:(D-A)*f}),y=m(p).slice(0,20),x=m(g).slice(0,20),b=a(e.drillKey),I=(b?l.filter(h=>e.drillMode==="trainer"?h.trainerKey===b:h.contractorNameKey===b):l).slice().sort((h,k)=>{if(e.view!=="details"&&e.sortBy!=="date")return 0;const $=h.date?h.date.getTime():0;return((k.date?k.date.getTime():0)-$)*f});return{filtered:l,totals:c,topContractors:y,topTrainers:x,details:I}},renderContractorAnalyticsDashboard(t,e){const a=d=>Utils.escapeHTML(String(d??"")),i=(d,p=0)=>(Number(d)||0).toLocaleString("en-US",{minimumFractionDigits:p,maximumFractionDigits:p}),n=this.computeContractorAnalytics(t,e),o=e.drillKey?String(e.drillKey):"",r=(d,p)=>this._analyticsSelectOptions(d,p),s=(d,p)=>d.length?`
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
                            ${d.map(g=>`
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
            `:'<div class="contractor-analytics-empty"><i class="fas fa-inbox"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</p></div>',l=()=>{const d=n.details.slice(0,300);return d.length?`
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
                            ${d.map(p=>`
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
                    <span class="count"><i class="fas fa-table ml-1"></i>\u0625\u062C\u0645\u0627\u0644\u064A: ${d.length} \u0633\u062C\u0644</span>
                </div>
            `:'<div class="contractor-analytics-empty"><i class="fas fa-folder-open"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0641\u0627\u0635\u064A\u0644 \u0644\u0644\u0639\u0631\u0636</p></div>'},c=d=>e.view===d?"active":"";return`
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
                            <button type="button" id="contractor-analytics-tab-contractor" class="contractor-analytics-tab ${c("contractor")}">
                                <i class="fas fa-building"></i>\u0645\u0644\u062E\u0635 \u062D\u0633\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644
                            </button>
                            <button type="button" id="contractor-analytics-tab-trainer" class="contractor-analytics-tab ${c("trainer")}">
                                <i class="fas fa-user-tie"></i>\u0645\u0644\u062E\u0635 \u062D\u0633\u0628 \u0627\u0644\u0645\u062F\u0631\u0628
                            </button>
                            <button type="button" id="contractor-analytics-tab-details" class="contractor-analytics-tab ${c("details")}">
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
                            ${o?`<button type="button" id="contractor-analytics-clear-drill" class="contractor-analytics-clear-drill"><i class="fas fa-times-circle"></i>\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0639\u0645\u0642: ${a(o)}</button>`:""}
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="contractor-analytics-content">
                    ${e.view==="trainer"?s(n.topTrainers,"trainer"):e.view==="details"?l():s(n.topContractors,"contractor")}
                </div>
            </div>
        `},refreshContractorAnalytics(t=""){const e=document.getElementById("contractor-analytics-dashboard");if(!e)return;const a=this.getContractorAnalyticsState(),i=this.getContractorTrainingAnalyticsModel(t);e.innerHTML=this.renderContractorAnalyticsDashboard(i,a),this.bindContractorAnalyticsEvents(t)},bindContractorAnalyticsEvents(t=""){const e=this.getContractorAnalyticsState(),a=(c,d)=>{const p=document.getElementById(c);p&&p.addEventListener("change",d)};a("contractor-analytics-contractor",c=>{e.contractor=String(c.target.value||""),e.drillKey="",this.refreshContractorAnalytics(t)}),a("contractor-analytics-trainer",c=>{e.trainer=String(c.target.value||""),e.drillKey="",this.refreshContractorAnalytics(t)}),a("contractor-analytics-topic",c=>{e.topic=String(c.target.value||""),e.drillKey="",this.refreshContractorAnalytics(t)}),a("contractor-analytics-location",c=>{e.location=String(c.target.value||""),e.drillKey="",this.refreshContractorAnalytics(t)}),a("contractor-analytics-sortby",c=>{e.sortBy=String(c.target.value||"hours"),this.refreshContractorAnalytics(t)}),a("contractor-analytics-sortdir",c=>{e.sortDir=String(c.target.value||"desc"),this.refreshContractorAnalytics(t)});const i=document.getElementById("contractor-analytics-search");i&&(this._contractorAnalyticsSearchTimer&&clearTimeout(this._contractorAnalyticsSearchTimer),i.addEventListener("input",c=>{e.search=String(c.target.value||"");const d=c.target.selectionStart,p=c.target.selectionEnd;clearTimeout(this._contractorAnalyticsSearchTimer),this._contractorAnalyticsSearchTimer=setTimeout(()=>{this.refreshContractorAnalytics(t),requestAnimationFrame(()=>{const g=document.getElementById("contractor-analytics-search");if(g){g.focus();try{g.setSelectionRange(d,p)}catch{}}})},220)}));const n=document.getElementById("contractor-analytics-tab-contractor");n&&n.addEventListener("click",()=>{e.view="contractor",e.drillKey="",this.refreshContractorAnalytics(t)});const o=document.getElementById("contractor-analytics-tab-trainer");o&&o.addEventListener("click",()=>{e.view="trainer",e.drillKey="",this.refreshContractorAnalytics(t)});const r=document.getElementById("contractor-analytics-tab-details");r&&r.addEventListener("click",()=>{e.view="details",this.refreshContractorAnalytics(t)});const s=document.getElementById("contractor-analytics-clear-drill");s&&s.addEventListener("click",()=>{e.drillKey="",this.refreshContractorAnalytics(t)});const l=document.getElementById("contractor-analytics-dashboard");l&&l.querySelectorAll("[data-analytics-drill]")?.forEach(c=>{c.addEventListener("click",()=>{const d=String(c.getAttribute("data-analytics-drill")||"").trim(),p=String(c.getAttribute("data-analytics-mode")||"").trim();e.drillMode=p==="trainer"?"trainer":"contractor",e.drillKey=d,e.view="details",this.refreshContractorAnalytics(t)})})},getEmployeeAnalyticsState(){return this._employeeAnalyticsState=this._employeeAnalyticsState||{trainer:"",topic:"",location:"",trainingType:"",search:"",view:"trainer",sortBy:"hours",sortDir:"desc",drillKey:""},this._employeeAnalyticsState},getEmployeeTrainingAnalyticsModel(t=""){this.ensureData();const e=Array.isArray(AppState.appData.training)?AppState.appData.training:[],a=l=>{if(!l)return"";const c=new Date(l);return Number.isNaN(c.getTime())?"":`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`},i=l=>String(l??"").replace(/\s+/g," ").trim(),n=l=>i(l).toLowerCase(),o=e.filter(l=>{if(!t)return!0;const c=l?.startDate||l?.date||l?.createdAt;return a(c)===t}).map(l=>{const c=i(l?.name||l?.subject||"\u2014"),d=i(l?.trainer||l?.conductedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"),p=i(l?.location||"\u2014"),g=i(l?.trainingType||"\u062F\u0627\u062E\u0644\u064A"),f=Array.isArray(l.participants)?l.participants:[],u=this.getParticipantsCount(l),m=parseFloat(l?.hours||l?.totalHours||0)||0,y=l?.startDate||l?.date?new Date(l.startDate||l.date):null;return{raw:l,date:y,dateKey:l?.startDate||l?.date?String(l.startDate||l.date):"",monthKey:a(l?.startDate||l?.date),topic:c,topicKey:n(c),trainer:d,trainerKey:n(d),location:p,locationKey:n(p),trainingType:g,trainingTypeKey:n(g),trainees:u,hours:m}}),r=l=>Array.from(new Set(l.filter(Boolean))).sort((c,d)=>c.localeCompare(d,"ar",{sensitivity:"base"})),s={trainers:r(o.map(l=>l.trainer)),topics:r(o.map(l=>l.topic)),locations:r(o.map(l=>l.location)),trainingTypes:r(o.map(l=>l.trainingType))};return{monthFilter:t,records:o,dimensions:s}},computeEmployeeAnalytics(t,e){const a=h=>String(h??"").replace(/\s+/g," ").trim().toLowerCase(),i=a(e.trainer),n=a(e.topic),o=a(e.location),r=a(e.trainingType),s=a(e.search),l=(t.records||[]).filter(h=>!(i&&h.trainerKey!==i||n&&h.topicKey!==n||o&&h.locationKey!==o||r&&h.trainingTypeKey!==r||s&&!`${h.trainerKey} ${h.topicKey} ${h.locationKey} ${h.trainingTypeKey}`.includes(s))),c={programs:l.length,trainees:l.reduce((h,k)=>h+(k.trainees||0),0),hours:l.reduce((h,k)=>h+(k.hours||0),0),trainers:new Set(l.map(h=>h.trainerKey)).size,topics:new Set(l.map(h=>h.topicKey)).size},d=(h,k)=>{const $=new Map;return l.forEach(w=>{const A=w[h]||"",D=w[k]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(!A)return;$.has(A)||$.set(A,{key:A,label:D,count:0,trainees:0,hours:0});const F=$.get(A);F.count+=1,F.trainees+=w.trainees||0,F.hours+=w.hours||0}),Array.from($.values())},p=d("trainerKey","trainer"),g=d("topicKey","topic"),f=e.sortDir==="asc"?1:-1,u=e.sortBy||"hours",m=h=>h.slice().sort(($,w)=>{const A=$[u]??0,D=w[u]??0;return D===A?($.label||"").localeCompare(w.label||"","ar",{sensitivity:"base"})*f:(D-A)*f}),y=m(p).slice(0,20),x=m(g).slice(0,20),b=a(e.drillKey),I=(b?l.filter(h=>e.view==="topic"?h.topicKey===b:h.trainerKey===b):l).slice().sort((h,k)=>{if(e.view!=="details"&&e.sortBy!=="date")return 0;const $=h.date?h.date.getTime():0;return((k.date?k.date.getTime():0)-$)*f});return{filtered:l,totals:c,topTrainers:y,topTopics:x,details:I}},renderEmployeeAnalyticsDashboard(t,e){const a=c=>Utils.escapeHTML(String(c??"")),i=(c,d=0)=>(Number(c)||0).toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d}),n=this.computeEmployeeAnalytics(t,e),o=e.drillKey?String(e.drillKey):"",r=(c,d)=>{const p=String(d??"").replace(/\s+/g," ").trim();return['<option value="">\u0627\u0644\u0643\u0644</option>'].concat(c.map(g=>`<option value="${a(g)}" ${p===String(g)?"selected":""}>${a(g)}</option>`)).join("")},s=(c,d)=>c.length?`
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
                                    <i class="fas ${d==="topic"?"fa-book":"fa-user-tie"} ml-2"></i>${d==="topic"?"\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C / \u0627\u0644\u0645\u0648\u0636\u0648\u0639":"\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628"}
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
                            ${c.map((p,g)=>`
                                <tr class="hover:bg-teal-50 cursor-pointer transition-all duration-200" data-analytics-drill="${a(p.label)}" data-analytics-mode="${d}" style="background: ${g%2===0?"#ffffff":"#f0fdfa"};" onmouseover="this.style.background='#ccfbf1'; this.style.transform='scale(1.005)'" onmouseout="this.style.background='${g%2===0?"#ffffff":"#f0fdfa"}'; this.style.transform='scale(1)'">
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
                </div>`,l=()=>{const c=n.details.slice(0,300);return c.length?`
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
                            ${c.map((d,p)=>`
                                <tr class="hover:bg-teal-50 transition-all duration-200" style="background: ${p%2===0?"#ffffff":"#f0fdfa"};" onmouseover="this.style.background='#ccfbf1'" onmouseout="this.style.background='${p%2===0?"#ffffff":"#f0fdfa"}'">
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: center; border-bottom: 1px solid #f0f0f0; white-space: nowrap;">${d.raw?.startDate||d.raw?.date?a(Utils.formatDate(d.raw.startDate||d.raw.date)):"-"}</td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: right; border-bottom: 1px solid #f0f0f0; max-width: 200px;" title="${a(d.topic||"-")}">${a(d.topic||"-")}</td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: right; border-bottom: 1px solid #f0f0f0;"><span style="color: #0f766e; font-weight: 500;">${a(d.trainer||"-")}</span></td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: center; border-bottom: 1px solid #f0f0f0;"><span style="background: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 12px; font-size: 10px;">${a(d.trainingType||"-")}</span></td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: center; border-bottom: 1px solid #f0f0f0;"><span style="background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 12px; font-weight: 600; font-size: 10px;">${i(d.trainees)}</span></td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: center; border-bottom: 1px solid #f0f0f0;"><span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 12px; font-weight: 600; font-size: 10px;">${i(d.hours,2)}</span></td>
                                    <td style="padding: 10px 12px; font-size: 11px; text-align: right; border-bottom: 1px solid #f0f0f0; max-width: 150px;" title="${a(d.location||"-")}">${a(d.location||"-")}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding: 8px 12px; background: #f0fdfa; border-radius: 8px; border: 1px solid #99f6e4;">
                    <span style="font-size: 0.75rem; color: #0f766e;"><i class="fas fa-info-circle ml-1"></i>\u064A\u062A\u0645 \u0639\u0631\u0636 \u0623\u0648\u0644 300 \u0633\u062C\u0644 \u0641\u0642\u0637 \u0644\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0623\u062F\u0627\u0621</span>
                    <span style="font-size: 0.75rem; color: #0d9488; font-weight: 600;"><i class="fas fa-table ml-1"></i>\u0625\u062C\u0645\u0627\u0644\u064A: ${c.length} \u0633\u062C\u0644</span>
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
                            ${o?`<button type="button" id="employee-analytics-clear-drill" style="padding: 8px 14px; border-radius: 8px; font-size: 0.75rem; font-weight: 600; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color: #92400e; border: 1px solid #fcd34d; cursor: pointer;"><i class="fas fa-times-circle"></i> \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0639\u0645\u0642: ${a(o)}</button>`:""}
                        </div>
                    </div>
                </div>

                <div style="background: white; border-radius: 14px; padding: 20px; border: 1px solid #e5e7eb; box-shadow: 0 2px 6px rgba(0,0,0,0.04); min-height: 300px;">
                    ${e.view==="topic"?s(n.topTopics,"topic"):e.view==="details"?l():s(n.topTrainers,"trainer")}
                </div>
            </div>
        `},refreshEmployeeAnalytics(t=""){const e=document.getElementById("employee-analytics-dashboard");if(!e)return;const a=this.getEmployeeAnalyticsState(),i=this.getEmployeeTrainingAnalyticsModel(t);e.innerHTML=this.renderEmployeeAnalyticsDashboard(i,a),this.bindEmployeeAnalyticsEvents(t)},bindEmployeeAnalyticsEvents(t=""){const e=this.getEmployeeAnalyticsState(),a=()=>(document.getElementById("employee-month-filter")||{}).value||"",i=()=>this.refreshEmployeeAnalytics(a()),n=(g,f)=>{const u=document.getElementById(g);u&&u.addEventListener("change",f)};n("employee-analytics-trainer",g=>{e.trainer=String(g.target.value||""),e.drillKey="",i()}),n("employee-analytics-topic",g=>{e.topic=String(g.target.value||""),e.drillKey="",i()}),n("employee-analytics-location",g=>{e.location=String(g.target.value||""),e.drillKey="",i()}),n("employee-analytics-trainingType",g=>{e.trainingType=String(g.target.value||""),e.drillKey="",i()}),n("employee-analytics-sortby",g=>{e.sortBy=String(g.target.value||"hours"),i()}),n("employee-analytics-sortdir",g=>{e.sortDir=String(g.target.value||"desc"),i()});const o=document.getElementById("employee-analytics-search");o&&o.addEventListener("input",g=>{e.search=String(g.target.value||""),i()});const r=document.getElementById("employee-analytics-tab-trainer");r&&r.addEventListener("click",()=>{e.view="trainer",e.drillKey="",i()});const s=document.getElementById("employee-analytics-tab-topic");s&&s.addEventListener("click",()=>{e.view="topic",e.drillKey="",i()});const l=document.getElementById("employee-analytics-tab-details");l&&l.addEventListener("click",()=>{e.view="details",i()});const c=document.getElementById("employee-analytics-clear-drill");c&&c.addEventListener("click",()=>{e.drillKey="",i()});const d=document.getElementById("employee-analytics-reset-btn");d&&d.addEventListener("click",()=>{this._employeeAnalyticsState={trainer:"",topic:"",location:"",trainingType:"",search:"",view:"trainer",sortBy:"hours",sortDir:"desc",drillKey:""},i()});const p=document.getElementById("employee-analytics-dashboard");p&&p.querySelectorAll("[data-analytics-drill]")?.forEach(g=>{g.addEventListener("click",()=>{const f=String(g.getAttribute("data-analytics-drill")||"").trim(),u=String(g.getAttribute("data-analytics-mode")||"").trim();e.view=u==="topic"?"topic":"trainer",e.drillKey=f,e.view="details",i()})})},getAttendanceAnalyticsState(){return this._attendanceAnalyticsState=this._attendanceAnalyticsState||{employee:"",topic:"",department:"",factory:"",trainingType:"",trainer:"",search:"",view:"employee",drillMode:"employee",sortBy:"hours",sortDir:"desc",drillKey:""},this._attendanceAnalyticsState},getAttendanceAnalyticsModel(t=""){this.ensureData();const e=AppState.appData.trainingAttendance||[],a=s=>{if(!s)return"";const l=new Date(s);return Number.isNaN(l.getTime())?"":`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}`},i=s=>String(s??"").replace(/\s+/g," ").trim(),n=s=>i(s).toLowerCase(),o=e.filter(s=>{if(!t)return!0;const l=s?.date||s?.attendanceDate||s?.createdAt;return a(l)===t}).map(s=>{const l=i(s?.employeeName||s?.employee||"\u2014"),c=i(s?.topic||"\u2014"),d=i(s?.department||"\u2014"),p=i(s?.factoryName||s?.factory||"\u2014"),g=i(s?.trainingType||"\u062F\u0627\u062E\u0644\u064A"),f=i(s?.trainerName||s?.trainer||s?.conductedBy||"\u2014"),u=parseFloat(s?.totalHours||0)||0,m=s?.date||s?.attendanceDate?new Date(s.date||s.attendanceDate):null;return{raw:s,date:m,employee:l,employeeKey:n(l),topic:c,topicKey:n(c),department:d,departmentKey:n(d),factory:p,factoryKey:n(p),trainingType:g,trainingTypeKey:n(g),trainer:f,trainerKey:n(f),hours:u}}),r=s=>Array.from(new Set(s.filter(Boolean))).sort((l,c)=>l.localeCompare(c,"ar",{sensitivity:"base"}));return{monthFilter:t,records:o,dimensions:{employees:r(o.map(s=>s.employee)),topics:r(o.map(s=>s.topic)),departments:r(o.map(s=>s.department)),factories:r(o.map(s=>s.factory)),trainingTypes:r(o.map(s=>s.trainingType)),trainers:r(o.map(s=>s.trainer))}}},computeAttendanceAnalytics(t,e){const a=u=>String(u??"").replace(/\s+/g," ").trim().toLowerCase(),i=(t.records||[]).filter(u=>{if(e.employee&&u.employeeKey!==a(e.employee)||e.topic&&u.topicKey!==a(e.topic)||e.department&&u.departmentKey!==a(e.department)||e.factory&&u.factoryKey!==a(e.factory)||e.trainingType&&u.trainingTypeKey!==a(e.trainingType)||e.trainer&&u.trainerKey!==a(e.trainer))return!1;const m=a(e.search);return!(m&&!`${u.employeeKey} ${u.topicKey} ${u.departmentKey} ${u.factoryKey} ${u.trainerKey}`.includes(m))}),n={records:i.length,hours:i.reduce((u,m)=>u+(m.hours||0),0),employees:new Set(i.map(u=>u.employeeKey)).size,topics:new Set(i.map(u=>u.topicKey)).size},o=(u,m)=>{const y=new Map;return i.forEach(x=>{const b=x[u]||"",S=x[m]||"\u2014";if(!b)return;y.has(b)||y.set(b,{key:b,label:S,count:0,hours:0});const I=y.get(b);I.count+=1,I.hours+=x.hours||0}),Array.from(y.values())},r=e.sortDir==="asc"?1:-1,s=e.sortBy||"hours",l=u=>u.slice().sort((m,y)=>{const x=m[s]??0,b=y[s]??0;return b===x?(m.label||"").localeCompare(y.label||"","ar",{sensitivity:"base"})*r:(b-x)*r}),c=l(o("employeeKey","employee")).slice(0,20),d=l(o("topicKey","topic")).slice(0,20),p=a(e.drillKey),f=(p?i.filter(u=>e.drillMode==="topic"?u.topicKey===p:u.employeeKey===p):i).slice().sort((u,m)=>{const y=u.date?u.date.getTime():0;return((m.date?m.date.getTime():0)-y)*r});return{filtered:i,totals:n,topEmployees:c,topTopics:d,details:f}},renderAttendanceAnalyticsDashboard(t,e){const a=d=>Utils.escapeHTML(String(d??"")),i=(d,p=0)=>(Number(d)||0).toLocaleString("en-US",{minimumFractionDigits:p,maximumFractionDigits:p}),n=this.computeAttendanceAnalytics(t,e),o=e.drillKey?String(e.drillKey):"",r=(d,p)=>this._analyticsSelectOptions(d,p),s=d=>e.view===d?"active":"",l=(d,p)=>d.length?`
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
                            ${d.map(g=>`
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
            `:'<div class="contractor-analytics-empty"><i class="fas fa-inbox"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</p></div>',c=()=>{const d=n.details.slice(0,300);return d.length?`
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
                            ${d.map(p=>`
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
                    <span class="count"><i class="fas fa-table ml-1"></i>\u0625\u062C\u0645\u0627\u0644\u064A: ${d.length} \u0633\u062C\u0644</span>
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
                            <button type="button" id="attendance-analytics-tab-employee" class="contractor-analytics-tab ${s("employee")}">
                                <i class="fas fa-user"></i>\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0638\u0641
                            </button>
                            <button type="button" id="attendance-analytics-tab-topic" class="contractor-analytics-tab ${s("topic")}">
                                <i class="fas fa-book"></i>\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0636\u0648\u0639
                            </button>
                            <button type="button" id="attendance-analytics-tab-details" class="contractor-analytics-tab ${s("details")}">
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
                            ${o?`<button type="button" id="attendance-analytics-clear-drill" class="contractor-analytics-clear-drill"><i class="fas fa-times-circle"></i>\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0639\u0645\u0642: ${a(o)}</button>`:""}
                        </div>
                    </div>
                </div>

                <div class="contractor-analytics-content">
                    ${e.view==="topic"?l(n.topTopics,"topic"):e.view==="details"?c():l(n.topEmployees,"employee")}
                </div>
            </div>
        `},refreshAttendanceAnalytics(t=""){const e=document.getElementById("attendance-analytics-dashboard");if(!e)return;const a=this.getAttendanceAnalyticsState(),i=this.getAttendanceAnalyticsModel(t);e.innerHTML=this.renderAttendanceAnalyticsDashboard(i,a),this.bindAttendanceAnalyticsEvents(t)},bindAttendanceAnalyticsEvents(t=""){const e=this.getAttendanceAnalyticsState(),a=()=>(document.getElementById("attendance-month-filter")||{}).value||"",i=()=>this.refreshAttendanceAnalytics(a()),n=(g,f)=>{const u=document.getElementById(g);u&&u.addEventListener("change",f)};n("attendance-analytics-employee",g=>{e.employee=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-topic",g=>{e.topic=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-department",g=>{e.department=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-factory",g=>{e.factory=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-trainingType",g=>{e.trainingType=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-trainer",g=>{e.trainer=g.target.value||"",e.drillKey="",i()}),n("attendance-analytics-sortby",g=>{e.sortBy=g.target.value||"hours",i()}),n("attendance-analytics-sortdir",g=>{e.sortDir=g.target.value||"desc",i()});const o=document.getElementById("attendance-analytics-search");o&&o.addEventListener("input",g=>{e.search=g.target.value||"";const f=g.target.selectionStart,u=g.target.selectionEnd;clearTimeout(this._attendanceAnalyticsSearchTimer),this._attendanceAnalyticsSearchTimer=setTimeout(()=>{i(),requestAnimationFrame(()=>{const m=document.getElementById("attendance-analytics-search");if(m){m.focus();try{m.setSelectionRange(f,u)}catch{}}})},220)});const r=document.getElementById("attendance-analytics-tab-employee");r&&r.addEventListener("click",()=>{e.view="employee",e.drillKey="",i()});const s=document.getElementById("attendance-analytics-tab-topic");s&&s.addEventListener("click",()=>{e.view="topic",e.drillKey="",i()});const l=document.getElementById("attendance-analytics-tab-details");l&&l.addEventListener("click",()=>{e.view="details",i()});const c=document.getElementById("attendance-analytics-clear-drill");c&&c.addEventListener("click",()=>{e.drillKey="",i()});const d=document.getElementById("attendance-analytics-reset-btn");d&&d.addEventListener("click",()=>{this._attendanceAnalyticsState={employee:"",topic:"",department:"",factory:"",trainingType:"",trainer:"",search:"",view:"employee",drillMode:"employee",sortBy:"hours",sortDir:"desc",drillKey:""},i()});const p=document.getElementById("attendance-analytics-dashboard");p&&p.querySelectorAll("[data-analytics-drill]").forEach(g=>{g.addEventListener("click",()=>{const f=String(g.getAttribute("data-analytics-drill")||"").trim(),u=String(g.getAttribute("data-analytics-mode")||"").trim();e.drillMode=u==="topic"?"topic":"employee",e.drillKey=f,e.view="details",i()})})},renderContractorDetailsChart(t){const e=Object.entries(t);if(e.length===0)return`
                <div class="flex items-center justify-center text-gray-400" style="min-height: 120px;">
                    <div class="text-center">
                        <i class="fas fa-chart-bar text-2xl mb-2 opacity-50"></i>
                        <p class="text-xs">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p>
                    </div>
                </div>
            `;const a=e.sort((s,l)=>l[1].count-s[1].count).slice(0,8),i=Math.max(...a.map(s=>s[1].count),1),n=Math.max(...a.map(s=>s[1].trainees),1),o=Math.max(...a.map(s=>s[1].hours),1),r=["linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)","linear-gradient(135deg, #10B981 0%, #059669 100%)","linear-gradient(135deg, #F59E0B 0%, #D97706 100%)","linear-gradient(135deg, #EF4444 0%, #DC2626 100%)","linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)","linear-gradient(135deg, #EC4899 0%, #DB2777 100%)","linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)","linear-gradient(135deg, #84CC16 0%, #65A30D 100%)"];return`
            <div class="space-y-2.5" style="padding: 4px 0; max-height: 400px; overflow-y: auto;">
                ${a.map(([s,l],c)=>{const d=l.count/i*100,p=l.trainees/n*100,g=l.hours/o*100,f=r[c%r.length],u=s.length>20?s.substring(0,18)+"...":s,m=c+1;return`
                        <div class="group relative" style="padding: 8px 10px; background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%); border-radius: 8px; border: 1px solid #E2E8F0; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.04);" 
                             onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; this.style.borderColor='#CBD5E1';"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.04)'; this.style.borderColor='#E2E8F0';">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2 flex-1 min-w-0">
                                    <div class="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-xs" style="background: ${f}; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">
                                        ${m}
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <h4 class="text-xs font-semibold text-gray-800 truncate" title="${Utils.escapeHTML(s)}" style="font-size: 11px; line-height: 1.3;">
                                            <i class="fas fa-building text-xs ml-1" style="color: #64748B; font-size: 9px;"></i>${Utils.escapeHTML(u)}
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
                                             style="width: ${d}%; background: ${f}; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"
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
            `;const a=e.sort((s,l)=>l[1].hours-s[1].hours).slice(0,8),i=Math.max(...a.map(s=>s[1].count),1),n=Math.max(...a.map(s=>s[1].trainees),1),o=Math.max(...a.map(s=>s[1].hours),1),r=["linear-gradient(135deg, #F59E0B 0%, #D97706 100%)","linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)","linear-gradient(135deg, #10B981 0%, #059669 100%)","linear-gradient(135deg, #EF4444 0%, #DC2626 100%)","linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)","linear-gradient(135deg, #EC4899 0%, #DB2777 100%)","linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)","linear-gradient(135deg, #84CC16 0%, #65A30D 100%)"];return`
            <div class="space-y-2.5" style="padding: 4px 0; max-height: 400px; overflow-y: auto;">
                ${a.map(([s,l],c)=>{const d=l.count/i*100,p=l.trainees/n*100,g=l.hours/o*100,f=r[c%r.length],u=s.length>20?s.substring(0,18)+"...":s,m=c+1;return`
                        <div class="group relative" style="padding: 8px 10px; background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%); border-radius: 8px; border: 1px solid #E2E8F0; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.04);" 
                             onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; this.style.borderColor='#CBD5E1';"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.04)'; this.style.borderColor='#E2E8F0';">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2 flex-1 min-w-0">
                                    <div class="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-xs" style="background: ${f}; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">
                                        ${m}
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <h4 class="text-xs font-semibold text-gray-800 truncate" title="${Utils.escapeHTML(s)}" style="font-size: 11px; line-height: 1.3;">
                                            <i class="fas fa-user-tie" style="color: #64748B; font-size: 9px; margin-left: 2px;"></i>${Utils.escapeHTML(u)}
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
                                             style="width: ${d}%; background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); box-shadow: 0 1px 3px rgba(59,130,246,0.25);"
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
        `},getMonthOptions(){this.ensureData();const t=AppState.appData.contractorTrainings||[],e=new Set;return t.forEach(i=>{if(i.date){const n=new Date(i.date),o=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;e.add(o)}}),Array.from(e).sort().reverse().map(i=>{const[n,o]=i.split("-"),s=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"][parseInt(o)-1];return`<option value="${i}">${s} ${n}</option>`}).join("")},getEmployeeMonthOptions(){this.ensureData();const t=AppState.appData.training||[],e=new Set;t.forEach(n=>{const o=n?.startDate||n?.date||n?.createdAt;if(o){const r=new Date(o);Number.isNaN(r.getTime())||e.add(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`)}});const a=Array.from(e).sort().reverse(),i=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];return a.map(n=>{const[o,r]=n.split("-");return`<option value="${n}">${i[parseInt(r)-1]} ${o}</option>`}).join("")},getAttendanceMonthOptions(){this.ensureData();const t=AppState.appData.trainingAttendance||[],e=new Set;t.forEach(n=>{const o=n?.date||n?.attendanceDate||n?.createdAt;if(o){const r=new Date(o);Number.isNaN(r.getTime())||e.add(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`)}});const a=Array.from(e).sort().reverse(),i=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];return a.map(n=>{const[o,r]=n.split("-");return`<option value="${n}">${i[parseInt(r)-1]} ${o}</option>`}).join("")},_syncSelectOptions(t,e){const a=document.getElementById(t);if(!a)return;const i=a.value;a.innerHTML=`<option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0634\u0647\u0631</option>${e||""}`,i&&Array.from(a.options).some(n=>n.value===i)&&(a.value=i)},_analyticsSelectOptions(t,e,a=250){const i=s=>Utils.escapeHTML(String(s??"")),n=String(e??"").replace(/\s+/g," ").trim(),o=Array.isArray(t)?t.slice():[],r=o.length>a?o.slice(0,a):o;if(n&&!r.includes(n)){const s=o.find(l=>String(l)===n);s!=null&&r.unshift(s)}return['<option value="">\u0627\u0644\u0643\u0644</option>'].concat(r.map(s=>`<option value="${i(s)}" ${n===String(s)?"selected":""}>${i(s)}</option>`)).join("")},_analyticsPlaceholder(t){return`
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
                            <button id="attendance-registry-download-pdf" class="btn-primary" title="\u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 PDF \u0645\u0628\u0627\u0634\u0631\u0629">
                                <i class="fas fa-file-download ml-2"></i>
                                \u062A\u062D\u0645\u064A\u0644 PDF
                            </button>
                            <button id="attendance-registry-export-pdf" class="btn-secondary" title="\u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0637\u0628\u0627\u0639\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628">
                                <i class="fas fa-print ml-2"></i>
                                \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0633\u062C\u0644
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
                <div class="content-card" style="border-radius: 14px; border: 1.5px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.03); overflow: hidden; background: #ffffff;">
                    <!-- \u0627\u0644\u0633\u0637\u0631 \u0627\u0644\u0639\u0644\u0648\u064A \u0627\u0644\u0645\u0631\u0641\u0648\u0639 \u0648\u0627\u0644\u0645\u0646\u0645\u0642: \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0648\u0627\u0644\u0634\u0627\u0631\u0629 \u0648\u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 -->
                    <div class="card-header" style="padding: 0.5rem 0.85rem; background: #ffffff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 28px; height: 28px; border-radius: 7px; background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 13px;">
                                <i class="fas fa-list-check"></i>
                            </div>
                            <h2 style="font-size: 14px; font-weight: 800; color: #1e293b; margin: 0; display: flex; align-items: center; gap: 8px;">
                                \u0642\u0627\u0626\u0645\u0629 \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628
                                <span id="training-filtered-count-badge" style="font-size: 11px; font-weight: 700; background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; border-radius: 9999px; padding: 1px 8px;">
                                    ${AppState.appData.training?.length||0} \u0628\u0631\u0627\u0645\u062C
                                </span>
                            </h2>
                        </div>
                        
                        <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0648\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0636\u0628\u0637 -->
                        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                            <button id="export-training-pdf-btn" style="padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 6px; background: #ffffff; color: #4338ca; border: 1px solid #c7d2fe; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s;" onmouseover="this.style.background='#eef2ff'" onmouseout="this.style.background='#ffffff'">
                                <i class="fas fa-file-pdf" style="color: #6366f1;"></i> \u062A\u0642\u0631\u064A\u0631 PDF
                            </button>
                            <button id="export-training-excel-btn" style="padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 6px; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #ffffff; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; box-shadow: 0 1px 3px rgba(5,150,105,0.2);">
                                <i class="fas fa-file-excel"></i> \u062A\u0635\u062F\u064A\u0631 Excel
                            </button>
                            <button id="training-filter-reset-btn" onclick="Training.resetFilters()" style="padding: 4px 8px; font-size: 11px; font-weight: 700; border-radius: 6px; background: #ffffff; color: #e11d48; border: 1px solid #fecdd3; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" title="\u0625\u0639\u0627\u062F\u0629 \u0636\u0628\u0637 \u0627\u0644\u0641\u0644\u0627\u062A\u0631">
                                <i class="fas fa-rotate-left"></i> \u0645\u0633\u062D
                            </button>
                        </div>
                    </div>

                    <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0645\u0646\u0633\u0642 \u0647\u0646\u062F\u0633\u064A\u0627\u064B \u0623\u0639\u0644\u0649 \u0631\u0623\u0633 \u0627\u0644\u062C\u062F\u0648\u0644 \u0645\u0628\u0627\u0634\u0631\u0629: \u064A\u0628\u062F\u0623 \u0645\u0646 \u0623\u0642\u0635\u0649 \u0627\u0644\u064A\u0645\u064A\u0646 \u062A\u0645\u0627\u0645\u0627\u064B -->
                    <div style="background: #f8fafc; padding: 6px 10px; border-bottom: 1.5px solid #e2e8f0; display: flex; align-items: center; gap: 6px; width: 100%; direction: rtl;">
                        <!-- 1. \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0634\u0627\u0645\u0644 (\u064A\u0628\u062F\u0623 \u0645\u0646 \u0623\u0642\u0635\u0649 \u0627\u0644\u064A\u0645\u064A\u0646 \u062A\u0645\u0627\u0645\u0627\u064B \u0641\u0648\u0642 \u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C) -->
                        <div style="position: relative; flex: 2.5; min-width: 200px;">
                            <input type="text" id="training-search" style="width: 100%; height: 32px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 8px 0 24px; font-size: 11.5px; font-weight: 600; color: #1e293b; background: #ffffff; outline: none;" placeholder="\u0628\u062D\u062B \u0628\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C\u060C \u0627\u0644\u0645\u062F\u0631\u0628\u060C \u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646..." autocomplete="off">
                            <i class="fas fa-search" style="position: absolute; left: 8px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 11px; pointer-events: none;"></i>
                        </div>

                        <!-- 2. \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u0623\u0639\u0644\u0649 \u0639\u0645\u0648\u062F \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628) -->
                        <div style="flex: 1; min-width: 110px;">
                            <select id="training-filter-type" style="width: 100%; height: 32px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 6px; font-size: 11.5px; font-weight: 600; color: #334155; background: #ffffff; outline: none; cursor: pointer;">
                                <option value="">\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u0627\u0644\u0643\u0644)</option>
                                <option value="\u062F\u0627\u062E\u0644\u064A">\u062F\u0627\u062E\u0644\u064A</option>
                                <option value="\u062E\u0627\u0631\u062C\u064A">\u062E\u0627\u0631\u062C\u064A</option>
                            </select>
                        </div>

                        <!-- 3. \u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639 -->
                        <div style="flex: 1.1; min-width: 120px;">
                            <select id="training-filter-factory" style="width: 100%; height: 32px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 6px; font-size: 11.5px; font-weight: 600; color: #334155; background: #ffffff; outline: none; cursor: pointer;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u0646\u0639</option>
                                ${this.getSiteOptions().map(i=>`<option value="${Utils.escapeHTML(i.id)}">${Utils.escapeHTML(i.name)}</option>`).join("")}
                            </select>
                        </div>

                        <!-- 4. \u0627\u0644\u0641\u062A\u0631\u0629 / \u0627\u0644\u0634\u0647\u0631 (\u0623\u0639\u0644\u0649 \u0639\u0645\u0648\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062F\u0631\u064A\u0628) -->
                        <div style="flex: 1.1; min-width: 125px;">
                            <select id="training-filter-month" style="width: 100%; height: 32px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 6px; font-size: 11.5px; font-weight: 600; color: #334155; background: #ffffff; outline: none; cursor: pointer;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0634\u0647\u0648\u0631</option>
                                ${this.getEmployeeMonthOptions()}
                            </select>
                        </div>

                        <!-- 5. \u0627\u0644\u062D\u0627\u0644\u0629 (\u0623\u0639\u0644\u0649 \u0639\u0645\u0648\u062F \u0627\u0644\u062D\u0627\u0644\u0629) -->
                        <div style="flex: 1; min-width: 110px;">
                            <select id="training-filter-status" style="width: 100%; height: 32px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 6px; font-size: 11.5px; font-weight: 600; color: #334155; background: #ffffff; outline: none; cursor: pointer;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                <option value="\u0645\u062E\u0637\u0637">\u0645\u062E\u0637\u0637</option>
                                <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                <option value="\u0645\u0643\u062A\u0645\u0644">\u0645\u0643\u062A\u0645\u0644</option>
                                <option value="\u0645\u0644\u063A\u064A">\u0645\u0644\u063A\u064A</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-body" style="padding: 0;">
                        <div id="training-table-container">
                            <div class="table-wrapper" style="overflow-x: auto;">
                                <table class="data-table table-header-purple">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C</th>
                                            <th>\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
                                            <th>\u0627\u0644\u0645\u062F\u0631\u0628</th>
                                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u062F\u0631\u064A\u0628</th>
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
            `},async renderTabContent(t){return t==="programs"?this.buildProgramsTabMarkup():t==="contractors"?this.buildContractorsTabMarkup():t==="attendance"?this.buildAttendanceTabMarkup():t==="legalTraining"?this.renderLegalTrainingTab():t==="analysis"?await this.renderAnalysisTab():""},async switchTab(t){if(t==="legalTraining"&&!this.canViewLegalTrainingTab())return this.switchTab("programs");document.querySelectorAll(".tab-btn").forEach(o=>{o.classList.remove("active")});const e=document.querySelector(`.tab-btn[data-tab="${t}"]`);e&&e.classList.add("active");const a=document.getElementById("training-tab-content");if(!a)return;this._currentActiveTab=t;const i=this._tabCache[t],n=this._tabDirty[t]!==!1;i&&!n?a.innerHTML=i:(a.innerHTML=await this.renderTabContent(t),this._tabCache[t]=a.innerHTML,this._tabDirty[t]=!1),this._hydrateTab(t),t==="contractors"?this.loadContractorTrainingsPriority().catch(()=>{}):t==="attendance"||t==="legalTraining"?this._fetchTrainingTabFromBackend(t).catch(()=>{}):t==="analysis"&&this._trainingTabFetchOk?.programs!==!0&&this._fetchTrainingTabFromBackend("programs").catch(()=>{}),this.setupEventListeners()},_hydrateTab(t){t==="programs"?this.loadTrainingList():t==="contractors"?(this.refreshContractorTrainingList().catch(()=>{}),this.updateContractorStatsWithFilter(document.getElementById("contractor-month-filter")?.value||"")):t==="attendance"?this.loadAttendanceRegistry():t==="legalTraining"?this.loadLegalTrainingList():t==="analysis"&&setTimeout(()=>{this.updateTrainingAnalyticsDashboard(),this._tBindAnalyticsEvents()},80)},_markAllTabsDirty(){this._tabDirty.programs=!0,this._tabDirty.contractors=!0,this._tabDirty.attendance=!0,this._tabDirty.analysis=!0,this._tabDirty.legalTraining=!0,this._tabCache.programs=null,this._tabCache.contractors=null,this._tabCache.attendance=null,this._tabCache.analysis=null,this._tabCache.legalTraining=null},async renderList(){return await this.renderTabContent("programs")},async loadTrainingList(){this.ensureData();const t=document.getElementById("training-table-container");if(!t)return;this.refreshProgramsTabKpiCards();const e=AppState.appData.training||[];if(e.length===0){t.innerHTML=`
                <div class="empty-state">
                    <i class="fas fa-graduation-cap text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0631\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A\u0629</p>
                    <button id="add-training-empty-btn" onclick="Training.showForm()" class="btn-primary mt-4">
                        <i class="fas fa-user-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u062A\u062F\u0631\u064A\u0628 \u0645\u0648\u0638\u0641
                    </button>
                </div>
            `,this.applyModuleI18n(t);return}t.innerHTML=`
            <style id="training-list-table-style">
                #training-table-container .table-wrapper {
                    max-height: 60vh;
                    min-height: 380px;
                    overflow-y: auto;
                    overflow-x: auto;
                    border: none;
                    background: #fff;
                }
                #training-table-container .table-wrapper::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                #training-table-container .table-wrapper::-webkit-scrollbar-track {
                    background: #f1f5f9;
                }
                #training-table-container .table-wrapper::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                #training-table-container .table-wrapper::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
                #training-table-container .data-table { table-layout: auto; width: 100%; border-collapse: separate; border-spacing: 0; }
                #training-table-container .data-table thead th {
                    position: sticky;
                    top: 0;
                    z-index: 5;
                    background: #4338ca !important;
                    color: #ffffff !important;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                    padding: 11px 14px;
                    vertical-align: middle;
                    font-size: 12px;
                    font-weight: 700;
                    white-space: nowrap;
                }
                #training-table-container .data-table tbody tr { transition: background-color .15s ease; }
                #training-table-container .data-table tbody tr:nth-child(even) { background: #fafbfc; }
                #training-table-container .data-table tbody tr:hover { background: #eef2ff !important; }
                #training-table-container .data-table td {
                    vertical-align: middle;
                    padding: 11px 14px;
                    line-height: 1.4;
                    border-bottom: 1px solid #e5e7eb;
                    font-size: 12px;
                }
                #training-table-container .training-name-cell { min-width: 220px; max-width: 320px; word-break: break-word; }
                #training-table-container .training-actions-cell { white-space: nowrap; min-width: 180px; }
                #training-table-container .training-actions-cell .flex { flex-wrap: nowrap; gap: 4px; }
                #training-table-container .training-actions-cell .btn-icon { width: 28px; height: 28px; padding: 0; flex-shrink: 0; }
                #training-table-container .training-text-cell { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px; }
                #training-table-container .data-table .badge { white-space: nowrap; display: inline-block; }
            </style>
            <div class="table-wrapper">
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
                        ${e.map(a=>this._buildTrainingTableRowHtml(a)).join("")}
                    </tbody>
                </table>
            </div>
        `,this.applyModuleI18n(t)},_buildTrainingTableRowHtml(t){const e=t.status||"",a=this.getParticipantsCount(t),i=/تنفي/.test(e),n=e==="\u0645\u0643\u062A\u0645\u0644"?"success":i?"info":e==="\u0645\u0644\u063A\u064A"?"danger":"warning",o=t.startDate?Utils.formatDate(t.startDate):t.date?Utils.formatDate(t.date):"-",r=Utils.escapeHTML(t.trainingType||"\u062F\u0627\u062E\u0644\u064A"),s=t.trainingType==="\u062E\u0627\u0631\u062C\u064A"?"badge-warning":"badge-info",l=e==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630"?"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":e||"-";let c="";return t.location&&(t.locationName?c=t.locationName:c=this.getPlaceName(t.location,t.factory)),`
            <tr>
                <td class="training-name-cell">
                    <div class="font-semibold text-gray-900" style="line-height: 1.4;">${Utils.escapeHTML(t.name||"")}</div>
                    ${c?`<div class="text-xs text-gray-500" style="margin-top: 4px; line-height: 1.3;"><i class="fas fa-map-marker-alt ml-1"></i>${Utils.escapeHTML(c)}</div>`:""}
                </td>
                <td style="text-align: center;"><span class="badge ${s}">${r}</span></td>
                <td class="training-text-cell" title="${Utils.escapeHTML(t.trainer||"")}">
                    <div class="font-medium text-gray-800">${Utils.escapeHTML(t.trainer||"-")}</div>
                </td>
                <td style="white-space: nowrap;">
                    <div class="font-medium text-gray-900">${o}</div>
                    ${t.expiryDate?`<div class="text-xs text-indigo-600 font-semibold" style="margin-top: 2px;" title="\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"><i class="fas fa-hourglass-half ml-1"></i>\u064A\u0646\u062A\u0647\u064A: ${Utils.formatDate(t.expiryDate)}</div>`:""}
                </td>
                <td style="text-align: center;"><span class="badge badge-info font-bold">${a}</span></td>
                <td style="text-align: center;"><span class="badge badge-${n}">${Utils.escapeHTML(l)}</span></td>
                <td class="training-actions-cell">
                    <div class="flex items-center" style="justify-content: center;">
                        <button onclick="Training.viewTraining('${t.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                            <i class="fas fa-eye" style="font-size: 13px;"></i>
                        </button>
                        <button onclick="Training.editTraining('${t.id}')" class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                            <i class="fas fa-edit" style="font-size: 13px;"></i>
                        </button>
                        <button onclick="Training.downloadTrainingPdf('${t.id}')" class="btn-icon btn-icon-success" title="\u062A\u062D\u0645\u064A\u0644 \u0643\u0634\u0641 \u0627\u0644\u062D\u0636\u0648\u0631 PDF">
                            <i class="fas fa-file-arrow-down" style="font-size: 13px;"></i>
                        </button>
                        <button onclick="Training.printTraining('${t.id}')" class="btn-icon btn-icon-secondary" title="\u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0637\u0628\u0627\u0639\u0629 \u0643\u0634\u0641 \u0627\u0644\u062D\u0636\u0648\u0631">
                            <i class="fas fa-print" style="font-size: 13px;"></i>
                        </button>
                        <button onclick="Training.exportTraining('${t.id}')" class="btn-icon btn-icon-success" title="\u062A\u0635\u062F\u064A\u0631 Excel">
                            <i class="fas fa-file-export" style="font-size: 13px;"></i>
                        </button>
                        <button onclick="Training.deleteTraining('${t.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                            <i class="fas fa-trash" style="font-size: 13px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `},setupEventListeners(){const t=(s,l,c)=>{!s||s.dataset.bound==="1"||(s.addEventListener(l,c),s.dataset.bound="1")};t(document.getElementById("add-training-btn"),"click",()=>this.showForm()),t(document.getElementById("add-training-empty-btn"),"click",()=>this.showForm()),t(document.getElementById("training-form"),"submit",s=>this.handleSubmit(s)),t(document.getElementById("export-training-excel-btn"),"click",()=>this.exportToExcel()),t(document.getElementById("export-training-pdf-btn"),"click",()=>this.showTrainingReportDialog()),t(document.getElementById("training-form-print-btn"),"click",()=>this.printAttendanceFormFromScreen()),t(document.getElementById("training-form-back-btn"),"click",()=>this.showList());const e=document.getElementById("training-search"),a=document.getElementById("training-filter-status"),i=document.getElementById("training-filter-month"),n=document.getElementById("training-filter-factory"),o=document.getElementById("training-filter-type"),r=()=>this.filterItems();t(e,"input",r),t(a,"change",r),t(i,"change",r),t(n,"change",r),t(o,"change",r),t(document.getElementById("training-filter-reset-btn"),"click",()=>this.resetFilters()),t(document.getElementById("view-training-matrix-btn"),"click",()=>this.showTrainingMatrix()),t(document.getElementById("view-annual-training-plan-btn"),"click",()=>this.showAnnualPlanModal()),t(document.getElementById("training-refresh-btn"),"click",()=>this.refresh()),t(document.getElementById("add-contractor-training-header-btn"),"click",()=>this.openContractorTrainingForm()),t(document.getElementById("add-contractor-training-btn"),"click",()=>this.openContractorTrainingForm()),t(document.getElementById("contractor-training-search"),"input",()=>this._debounceRegistryFilter(()=>this.filterContractorTraining())),t(document.getElementById("contractor-filter-contractor"),"input",()=>this._debounceRegistryFilter(()=>this.filterContractorTraining())),t(document.getElementById("contractor-filter-topic"),"input",()=>this._debounceRegistryFilter(()=>this.filterContractorTraining())),t(document.getElementById("contractor-filter-trainer"),"input",()=>this._debounceRegistryFilter(()=>this.filterContractorTraining())),t(document.getElementById("contractor-filter-location"),"input",()=>this._debounceRegistryFilter(()=>this.filterContractorTraining())),t(document.getElementById("contractor-filter-date-from"),"change",()=>this.filterContractorTraining()),t(document.getElementById("contractor-filter-date-to"),"change",()=>this.filterContractorTraining()),t(document.getElementById("contractor-filter-reset"),"click",()=>{["contractor-training-search","contractor-filter-contractor","contractor-filter-topic","contractor-filter-trainer","contractor-filter-location","contractor-filter-date-from","contractor-filter-date-to"].forEach(s=>{const l=document.getElementById(s);l&&(l.value="")}),this.filterContractorTraining()}),t(document.getElementById("export-contractor-training-excel-btn"),"click",()=>this.exportContractorTrainingExcel()),t(document.getElementById("export-contractor-training-pdf-btn"),"click",()=>this.showContractorTrainingReportDialog()),t(document.getElementById("contractor-month-filter"),"change",s=>this.updateContractorStatsWithFilter(s.target.value)),t(document.getElementById("reset-contractor-filter"),"click",()=>{const s=document.getElementById("contractor-month-filter");s&&(s.value="",this.updateContractorStatsWithFilter(""))})},updateContractorStatsWithFilter(t){const e=this.getContractorTrainingStats(t),a=document.getElementById("contractor-topics-count");a&&(a.textContent=e.uniqueTopics);const i=document.getElementById("contractor-companies-count");i&&(i.textContent=e.uniqueContractors);const n=document.getElementById("contractor-trainees-count");n&&(n.textContent=e.totalTrainees);const o=document.getElementById("contractor-trainers-count");o&&(o.textContent=e.uniqueTrainers);const r=document.getElementById("contractor-monthly-count");r&&(r.textContent=e.currentMonthCount)},async showTrainingMatrix(){this.ensureData();const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
        `,document.body.appendChild(t);const e=o=>{o&&(o.preventDefault(),o.stopPropagation()),t&&t.parentNode&&t.remove()},a=t.querySelector("#training-matrix-close-btn");a&&a.addEventListener("click",e);const i=t.querySelector("#training-matrix-close-footer-btn");i&&i.addEventListener("click",e);const n=document.getElementById("training-matrix-search");n&&n.addEventListener("input",o=>{this.filterTrainingMatrix(o.target.value.trim())}),t.querySelector("#manage-training-topics-btn")?.addEventListener("click",()=>this.openTrainingTopicsManager()),t.querySelector("#matrix-annual-plan-btn")?.addEventListener("click",()=>this.showAnnualPlanModal()),t.addEventListener("click",o=>{o.target===t&&e(o)})},async renderTrainingMatrix(){this.ensureData();const t=AppState.appData.employees||[],e=AppState.appData.employeeTrainingMatrix||{};return t.length===0?`
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
                        ${t.map(a=>{const i=a.employeeNumber||a.sapId||"",n=e[i]||[],o=n.reduce((p,g)=>p+(parseFloat(g.hours)||0),0),r=n.filter(p=>p.trainingType==="\u062F\u0627\u062E\u0644\u064A").length,s=n.filter(p=>p.trainingType==="\u062E\u0627\u0631\u062C\u064A").length,l=this.getRequiredTopicsForPosition(a.position),c=this.getCompletedTopicsSet(n),d=l.filter(p=>{const g=typeof p=="string"?p:p.topic;return g&&c.has(g.toLowerCase())}).length;return`
                                <tr data-code="${i}" data-name="${a.name||""}" data-position="${a.position||""}">
                                    <td><strong>${Utils.escapeHTML(i)}</strong></td>
                                    <td>${Utils.escapeHTML(a.name||"")}</td>
                                    <td>${Utils.escapeHTML(a.position||"-")}</td>
                                    <td>${Utils.escapeHTML(a.department||"-")}</td>
                                    <td>
                                        <span class="badge badge-info">${n.length}</span>
                                        <span class="text-xs text-gray-500 mr-2">(\u062F\u0627\u062E\u0644\u064A: ${r}, \u062E\u0627\u0631\u062C\u064A: ${s})</span>
                                    </td>
                                    <td><strong>${o.toFixed(2)}</strong> \u0633\u0627\u0639\u0629</td>
                                    <td>
                                        ${l.length?`
                                            <span class="badge ${d===l.length?"badge-success":"badge-warning"}">
                                                ${d}/${l.length}
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
        `},async refreshTrainingMatrix(){const t=document.getElementById("training-matrix-content");t&&(t.innerHTML=await this.renderTrainingMatrix())},filterTrainingMatrix(t){const e=document.querySelector("#training-matrix-content tbody");if(!e)return;e.querySelectorAll("tr[data-code]").forEach(i=>{const n=i.getAttribute("data-code")||"",o=i.getAttribute("data-name")||"",r=i.getAttribute("data-position")||"",s=t.toLowerCase();!t||n.includes(t)||o.toLowerCase().includes(s)||r.toLowerCase().includes(s)?i.style.display="":i.style.display="none"})},async viewEmployeeTrainingMatrix(t){const a=(AppState.appData.employees||[]).find(f=>(f.employeeNumber||f.sapId)===t);if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0638\u0641");return}const n=(AppState.appData.employeeTrainingMatrix||{})[t]||[],o=this.getRequiredTopicsForPosition(a.position),r=this.getCompletedTopicsSet(n),s=new Date().getFullYear(),c=(this.getAnnualPlan(s,{createIfMissing:!1})?.items||[]).filter(f=>f.targetType==="contractors"?!1:Array.isArray(f.targetRoles)&&f.targetRoles.length?f.targetRoles.includes(a.position):!0)||[],d=o.map(f=>{const u=typeof f=="string"?f:f.topic||"",m=typeof f=="object"?f.required!==!1:!0,y=typeof f=="object"&&f.recommendedHours||"",x=typeof f=="object"&&f.frequency||"\u0633\u0646\u0648\u064A",b=r.has(u.toLowerCase()),S=c.find(k=>k.topic===u||Array.isArray(k.requiredTopics)&&k.requiredTopics.includes(u)),I=S?.status||(b?"\u0645\u0643\u062A\u0645\u0644":"\u0645\u062E\u0637\u0637"),h=I==="\u0645\u0643\u062A\u0645\u0644"?"badge-success":I==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"badge-info":I==="\u0645\u0624\u062C\u0644"?"badge-warning":b?"badge-success":"badge-secondary";return`
                <tr>
                    <td>${Utils.escapeHTML(u)}</td>
                    <td>${x}</td>
                    <td>${y?`${y} \u0633\u0627\u0639\u0629`:"\u2014"}</td>
                    <td>
                        <span class="badge ${h}">${Utils.escapeHTML(I)}</span>
                        ${S?.plannedDate?`<div class="text-xs text-gray-500 mt-1">\u0645\u0648\u0639\u062F \u0645\u062E\u0637\u0637: ${Utils.formatDate(S.plannedDate)}</div>`:""}
                    </td>
                    <td>${m?"\u0625\u0644\u0632\u0627\u0645\u064A":"\u0627\u062E\u062A\u064A\u0627\u0631\u064A"}</td>
                </tr>
            `}).join(""),p=document.createElement("div");p.className="modal-overlay";const g=[...n].sort((f,u)=>{const m=new Date(f.trainingDate||f.date||0);return new Date(u.trainingDate||u.date||0)-m});p.innerHTML=`
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
                    ${o.length?`
                        <div class="mt-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3">
                                <i class="fas fa-list-check ml-2 text-blue-600"></i>
                                \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u062D\u0633\u0628 \u0648\u0638\u064A\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641 (${o.length})
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
                                        ${d}
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
        `,document.body.appendChild(e);const a=()=>e.remove();e.querySelector(".modal-close")?.addEventListener("click",a),e.querySelector('[data-action="close"]')?.addEventListener("click",a),e.addEventListener("click",r=>{r.target===e&&a()});const i=e.querySelector("#topics-position-select"),n=e.querySelector("#topics-manager-content"),o=()=>{const r=i?.value;n.innerHTML=this.renderTrainingTopicsManagerContent(r),n.querySelectorAll('[data-action="delete-topic"]').forEach(s=>{s.addEventListener("click",()=>{const l=s.getAttribute("data-topic");this.removeTrainingTopic(r,l),o(),this.refreshTrainingMatrix()})})};i?.addEventListener("change",o),o(),e.querySelector("#topics-add-form")?.addEventListener("submit",r=>{r.preventDefault();const s=i?.value;if(!s){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u0623\u0648\u0644\u0627\u064B");return}const l=e.querySelector("#topics-new-name")?.value.trim(),c=e.querySelector("#topics-new-frequency")?.value||"\u0633\u0646\u0648\u064A",d=parseFloat(e.querySelector("#topics-new-hours")?.value||"0"),p=e.querySelector("#topics-new-required")?.value==="yes",g=e.querySelector("#topics-new-notes")?.value.trim();if(!l){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A");return}this.saveTrainingTopic(s,{topic:l,frequency:c,required:p,recommendedHours:d>0?d:"",notes:g,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}),e.querySelector("#topics-new-name").value="",e.querySelector("#topics-new-hours").value="",e.querySelector("#topics-new-notes").value="",o(),this.refreshTrainingMatrix()})},renderTrainingTopicsManagerContent(t){if(!t)return'<div class="text-center text-gray-500 py-6">\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0648\u0638\u064A\u0641\u0629 \u0644\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647\u0627.</div>';const e=this.getRequiredTopicsForPosition(t);return e.length?`
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
            `},saveTrainingTopic(t,e){if(this.ensureData(),!t||!e?.topic)return;AppState.appData.trainingTopicsByRole[t]||(AppState.appData.trainingTopicsByRole[t]=[]);const a=AppState.appData.trainingTopicsByRole[t];if(a.some(n=>(n.topic||"").toLowerCase()===e.topic.toLowerCase())){Notification.warning("\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0645\u0633\u062C\u0644 \u0628\u0627\u0644\u0641\u0639\u0644 \u0644\u0647\u0630\u0647 \u0627\u0644\u0648\u0638\u064A\u0641\u0629");return}a.push(e),AppState.appData.trainingTopicsByRole[t]=a,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0644\u0644\u0648\u0638\u064A\u0641\u0629")},removeTrainingTopic(t,e){if(this.ensureData(),!t||!e)return;const a=AppState.appData.trainingTopicsByRole[t]||[];AppState.appData.trainingTopicsByRole[t]=a.filter(i=>(i.topic||"").toLowerCase()!==e.toLowerCase()),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A")},formatTime(t,e=!1){const a=e?"":"\u2014";if(!t||t==="\u2014"||t==="-"||t===""||t==="null"||t==="undefined"||t==="Invalid Date")return a;const i=String(t).trim();if(!i||i==="null"||i==="undefined")return a;if(/^\d{1,2}:\d{2}(:\d{2})?$/.test(i)){const r=i.split(":"),s=parseInt(r[0],10),l=parseInt(r[1],10);if(s>=0&&s<=23&&l>=0&&l<=59)return`${s.toString().padStart(2,"0")}:${l.toString().padStart(2,"0")}`}const n=parseFloat(i);if(!isNaN(n)&&n>=0&&n<1){const r=Math.round(n*24*60),s=Math.floor(r/60),l=r%60;return`${s.toString().padStart(2,"0")}:${l.toString().padStart(2,"0")}`}if(/^1899-12-3[01]|^1900-01-0[01]/.test(i))return a;const o=i.match(/T?(\d{1,2}):(\d{2})(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})?$/);if(o){const r=parseInt(o[1],10),s=parseInt(o[2],10);if(r>=0&&r<=23&&s>=0&&s<=59)return`${r.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`}try{const r=new Date(t);if(!isNaN(r.getTime())){const s=r.getFullYear();if(s>=1900&&s<=1901)return a;const l=r.getHours(),c=r.getMinutes();if(l>=0&&l<=23&&c>=0&&c<=59)return`${l.toString().padStart(2,"0")}:${c.toString().padStart(2,"0")}`}}catch{}return a},_uniqSortedLabels(t){return Array.from(new Set((t||[]).map(e=>String(e||"").replace(/\s+/g," ").trim()).filter(Boolean))).sort((e,a)=>e.localeCompare(a,"ar",{sensitivity:"base"}))},_preferRegistryRecord(t,e){const a=n=>/tmp/i.test(String(n?.id||""));if(a(t)&&!a(e))return e;if(a(e)&&!a(t))return t;const i=n=>Object.keys(n||{}).filter(o=>n[o]!=null&&String(n[o]).trim()!=="").length;return i(e)>i(t)?e:t},_registryContentKey(t){const e=String(t?.date||t?.attendanceDate||"").slice(0,10),a=String(t?.contractorId||t?.contractorName||t?.employeeCode||t?.employeeName||"").replace(/\s+/g," ").trim().toLowerCase(),i=String(t?.topic||t?.subject||"").replace(/\s+/g," ").trim().toLowerCase(),n=String(t?.startTime||t?.trainer||t?.trainerName||"").replace(/\s+/g," ").trim().toLowerCase();return`${e}|${a}|${i}|${n}`},_dedupeRegistryRecords(t){const e=(Array.isArray(t)?t:[]).filter(r=>r&&typeof r=="object"),a=new Map,i=[];e.forEach(r=>{const s=String(r.id||"").trim();if(!s){i.push(r);return}const l=a.get(s);a.set(s,l?this._preferRegistryRecord(l,r):r)});const n=new Map,o=r=>{const s=this._registryContentKey(r),l=String(r.id||"").trim(),c=!s||s==="|||"?`id:${l||Math.random()}`:s,d=n.get(c);n.set(c,d?this._preferRegistryRecord(d,r):r)};return a.forEach(r=>o(r)),i.forEach(r=>o(r)),Array.from(n.values())},_fillDatalist(t,e){const a=document.getElementById(t);a&&(a.innerHTML=this._uniqSortedLabels(e).slice(0,400).map(i=>`<option value="${Utils.escapeHTML(i)}"></option>`).join(""))},_debounceRegistryFilter(t,e=160){clearTimeout(this._registryFilterTimer),this._registryFilterTimer=setTimeout(t,e)},_trainingDateKey(t){if(!t)return"";const a=String(t).trim().match(/^(\d{4}-\d{2}-\d{2})/);if(a)return a[1];const i=new Date(t);if(Number.isNaN(i.getTime()))return"";const n=i.getFullYear(),o=String(i.getMonth()+1).padStart(2,"0"),r=String(i.getDate()).padStart(2,"0");return`${n}-${o}-${r}`},_fillContractorRegistryFilters(t){this._fillDatalist("contractor-filter-contractor-list",t.map(e=>e.contractorName||e.contractor||"")),this._fillDatalist("contractor-filter-topic-list",t.map(e=>e.topic||e.subject||"")),this._fillDatalist("contractor-filter-trainer-list",t.map(e=>e.trainer||e.conductedBy||"")),this._fillDatalist("contractor-filter-location-list",t.map(e=>e.location||""))},_fillAttendanceRegistryFilters(t){this._fillDatalist("attendance-filter-employee-list",t.flatMap(e=>[e.employeeName||e.employee||"",e.employeeCode||""])),this._fillDatalist("attendance-filter-topic-list",t.map(e=>e.topic||"")),this._fillDatalist("attendance-filter-department-list",t.map(e=>e.department||"")),this._fillDatalist("attendance-filter-factory-list",t.map(e=>e.factoryName||e.factory||"")),this._fillDatalist("attendance-filter-trainer-list",t.map(e=>e.trainer||e.trainerName||e.conductedBy||""))},async renderContractorTrainingSection(){this.ensureData();const t=this._dedupeRegistryRecords(AppState.appData.contractorTrainings||[]);if(Array.isArray(AppState.appData.contractorTrainings)&&t.length!==AppState.appData.contractorTrainings.length){AppState.appData.contractorTrainings=t;try{window.DataManager?.save?.()}catch{}}const e=this.getContractorOptions(),a=new Map(e.map(n=>[String(n?.id??"").trim(),n.name||""]));return a.size===0&&(AppState.appData.contractors||[]).filter(o=>o&&o.isActive!=="inactive"&&o.isActive!==!1&&o.isActive!=="false"&&o.isActive!=="FALSE").forEach(o=>{o?.id&&a.set(String(o.id).trim(),o.name||o.company||o.contractorName||"")}),`
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
                        ${t.length?t.slice().sort((n,o)=>new Date(o.date||o.createdAt||0)-new Date(n.date||n.createdAt||0)).map(n=>{const o=String(n.contractorId||"").trim(),r=String(n.contractorName||"").replace(/\s+/g," ").trim(),l=r&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(r)?r:a.get(o)||r||"\u2014",c=this._trainingDateKey(n.date||n.trainingDate||n.createdAt),d=c?Utils.formatDate(c):"\u2014",p=Utils.escapeHTML(n.trainer||n.conductedBy||"\u2014"),g=Utils.escapeHTML(n.topic||n.subject||"\u2014"),f=Utils.escapeHTML(n.location||"\u2014"),u=Utils.escapeHTML(n.subLocation||n.subSite||"\u2014"),m=Number(n.traineesCount||n.attendees||0),y=Number(n.durationMinutes||n.trainingMinutes||0),x=parseFloat(n.totalHours||n.trainingHours||0),b=this.cleanTime(n.startTime||n.fromTime||n.timeFrom)||"\u2014",S=this.cleanTime(n.endTime||n.toTime||n.timeTo)||"\u2014",I=Utils.escapeHTML(n.notes||""),h=[l,n.contractorId||"",g,p,f,u,d,b,S,I].join(" ").toLowerCase();return`
                        <tr data-training-id="${Utils.escapeHTML(n.id||"")}" data-date="${Utils.escapeHTML(c)}" data-search="${Utils.escapeHTML(h)}" data-contractor="${Utils.escapeHTML(String(l).toLowerCase())}" data-topic="${Utils.escapeHTML(String(n.topic||n.subject||"").toLowerCase())}" data-trainer="${Utils.escapeHTML(String(n.trainer||n.conductedBy||"").toLowerCase())}" data-location="${Utils.escapeHTML(String(n.location||"").toLowerCase())}">
                            <td>${d}</td>
                            <td>${g}</td>
                            <td>${p}</td>
                            <td>${Utils.escapeHTML(l)}</td>
                            <td class="text-center">
                                <span class="badge badge-info">${m}</span>
                            </td>
                            <td class="text-center">${b}</td>
                            <td class="text-center">${S}</td>
                            <td class="text-center">${y>0?y:"\u2014"}</td>
                            <td class="text-center">${x>0?x.toFixed(2):"\u2014"}</td>
                            <td>${f}</td>
                            <td>${u}</td>
                            <td>${I||'<span class="text-gray-400 text-xs">\u2014</span>'}</td>
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
        `},async refreshContractorTrainingList(){const t=document.getElementById("contractor-training-container");if(!t)return;const e=this._dedupeRegistryRecords(AppState.appData.contractorTrainings||[]);t.innerHTML=await this.renderContractorTrainingSection(),this._fillContractorRegistryFilters(e),this.filterContractorTraining()},filterContractorTraining(){const t=(document.getElementById("contractor-training-search")?.value||"").trim().toLowerCase(),e=(document.getElementById("contractor-filter-contractor")?.value||"").trim().toLowerCase(),a=(document.getElementById("contractor-filter-topic")?.value||"").trim().toLowerCase(),i=(document.getElementById("contractor-filter-trainer")?.value||"").trim().toLowerCase(),n=(document.getElementById("contractor-filter-location")?.value||"").trim().toLowerCase(),o=document.getElementById("contractor-filter-date-from")?.value||"",r=document.getElementById("contractor-filter-date-to")?.value||"",s=document.querySelectorAll("#contractor-training-container tbody tr[data-training-id]");let l=0;s.forEach(d=>{const p=d.getAttribute("data-search")||"",g=!t||p.includes(t),f=!e||(d.getAttribute("data-contractor")||"").includes(e),u=!a||(d.getAttribute("data-topic")||"").includes(a),m=!i||(d.getAttribute("data-trainer")||"").includes(i),y=!n||(d.getAttribute("data-location")||"").includes(n),x=d.getAttribute("data-date")||"",b=!o||!!x&&x>=o,S=!r||!!x&&x<=r,I=g&&f&&u&&m&&y&&b&&S;d.style.display=I?"":"none",I&&(l+=1)});const c=document.getElementById("contractor-registry-count");c&&(c.textContent=s.length?`\u0639\u0631\u0636 ${l} \u0645\u0646 ${s.length}`:"")},getContractorOptions(){if(this.ensureData(),typeof Contractors<"u"&&typeof Contractors.getContractorOptionsForModules=="function")return Contractors.getContractorOptionsForModules({includeSuppliers:!0});const t=s=>(s??"").toString().trim(),e=s=>t(s).toUpperCase(),a=s=>t(s),i=s=>t(s).toLowerCase(),n=[...AppState.appData.approvedContractors||[],...AppState.appData.contractors||[]].filter(s=>s&&s.isActive!=="inactive"&&s.isActive!==!1&&s.isActive!=="false"&&s.isActive!=="FALSE"),o=new Map,r=s=>{const l=e(s.code||s.isoCode);if(/^CON-\d+$/i.test(l))return`CODE:${l}`;const c=a(s.licenseNumber||s.contractNumber);if(c)return`LIC:${c}`;const d=t(s.contractorId||s.id);if(d)return`ID:${d}`;const p=i(s.name||s.company||s.contractorName||s.companyName);return p?`NAME:${p}`:""};return n.forEach(s=>{if(!s)return;const l=r(s);l&&(o.has(l)||o.set(l,s))}),Array.from(o.values()).map(s=>({id:t(s.contractorId||s.id),name:t(s.name||s.company||s.contractorName||s.companyName||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"),serviceType:t(s.serviceType),licenseNumber:t(s.licenseNumber||s.contractNumber),code:t(s.code||s.isoCode),entityType:(s.entityType||"contractor").toString(),approvedEntityId:s.approvedEntityId||null})).filter(s=>s.name&&(s.entityType||"contractor")==="contractor").sort((s,l)=>(s.name||"").localeCompare(l.name||"","ar",{sensitivity:"base"}))},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites?Permissions.formSettingsState.sites.map(t=>({id:t.id,name:t.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(t=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((t,e)=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||`\u0645\u0648\u0642\u0639 ${e+1}`})):[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t),[]}},refreshSiteDropdowns(){try{const t=this.getSiteOptions(),e=typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML:n=>String(n??""),a=n=>'<option value="">'+(n||"\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639")+"</option>"+(t||[]).map(o=>'<option value="'+e(o.id)+'">'+e(o.name)+"</option>").join("");["training-factory","attendance-registry-filter-factory","attendance-analytics-factory"].forEach(n=>{const o=document.getElementById(n);if(o&&o.tagName==="SELECT"){const r=o.value;o.innerHTML=a(n==="attendance-analytics-factory"?"":n==="attendance-registry-filter-factory"?"\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u0646\u0639":"\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639"),r&&(o.value=r)}})}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F Training.refreshSiteDropdowns:",t)}},getPlaceOptions(t){try{if(!t)return[];if(!this.getSiteOptions().find(i=>i.id===t))return[];if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.sites){const i=Permissions.formSettingsState.sites.find(n=>n.id===t);if(i&&Array.isArray(i.places))return i.places.map(n=>({id:n.id,name:n.name}))}if(Array.isArray(AppState.appData?.observationSites)){const i=AppState.appData.observationSites.find(n=>(n.id||n.siteId)===t);if(i)return(Array.isArray(i.places)?i.places:Array.isArray(i.locations)?i.locations:Array.isArray(i.children)?i.children:Array.isArray(i.areas)?i.areas:[]).map((o,r)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${r+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const i=DailyObservations.DEFAULT_SITES.find(n=>(n.id||n.siteId)===t);if(i)return(Array.isArray(i.places)?i.places:Array.isArray(i.locations)?i.locations:Array.isArray(i.children)?i.children:Array.isArray(i.areas)?i.areas:[]).map((o,r)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${r+1}`}))}return[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0627\u0643\u0646:",e),[]}},getPlaceName(t,e){try{if(!t)return"";if(typeof t=="string"&&!t.startsWith("PLACE_"))return t;if(e){const n=this.getPlaceOptions(e).find(o=>o.id===t);if(n&&n.name)return n.name}const a=this.getSiteOptions();for(const i of a){const o=this.getPlaceOptions(i.id).find(r=>r.id===t);if(o&&o.name)return o.name}return t}catch(a){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u0627\u0646:",a),t}},getSafetyTeamOptions(){try{if(typeof Permissions<"u"&&Permissions.formSettingsState&&Permissions.formSettingsState.safetyTeam)return Array.isArray(Permissions.formSettingsState.safetyTeam)?Permissions.formSettingsState.safetyTeam.filter(Boolean):[];const t=AppState.companySettings||{};return Array.isArray(t.safetyTeam)?t.safetyTeam.filter(Boolean):Array.isArray(t.safetyTeamMembers)?t.safetyTeamMembers.filter(Boolean):typeof t.safetyTeam=="string"?t.safetyTeam.split(/\n|,/).map(e=>e.trim()).filter(Boolean):Array.isArray(AppState.appData?.safetyTeam)?AppState.appData.safetyTeam.map(e=>typeof e=="string"?e:e.name||e.fullName||"").filter(Boolean):[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0641\u0631\u064A\u0642 \u0627\u0644\u0633\u0644\u0627\u0645\u0629:",t),[]}},resolveSafetyTrainerDisplayName(t){if(!t)return"";const e=String(t.fullName||"").trim(),a=String(t.name||"").trim(),i=String(t.username||"").trim().toLowerCase(),n=String(t.email||"").trim(),o=r=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(r||"").trim());if(e)return e;if(a&&o(a))return"";if(a&&i&&a.toLowerCase()===i){const r=(AppState.appData?.employees||[]).find(s=>String(s.email||"").toLowerCase()===n.toLowerCase());return r?String(r.name||r.fullName||"").trim():""}if(a)return a;if(n){const r=(AppState.appData?.employees||[]).find(s=>String(s.email||"").toLowerCase()===n.toLowerCase());if(r)return String(r.name||r.fullName||"").trim()}return""},getSafetyTeamMembers(t){const a=(t&&typeof t=="object"?t:{}).excludeSystemUsers===!0,i=new Map,n=s=>{if(typeof EmployeeHelper<"u"&&typeof EmployeeHelper.isResignedEmployee=="function")return EmployeeHelper.isResignedEmployee(s);const l=String(s?.status||s?.employeeStatus||s?.workStatus||s?.employmentStatus||"").toLowerCase();return l.includes("\u0645\u0633\u062A\u0642\u064A\u0644")||l.includes("\u0627\u0633\u062A\u0642\u0627\u0644")||l.includes("resign")||l.includes("terminated")},o=s=>{const l=String(s||"").trim();if(!l)return"";const c=(AppState.appData?.employees||[]).find(d=>String(d.email||"").toLowerCase()===l.toLowerCase()||String(d.name||d.fullName||"").trim()===l);return c&&n(c)?"":/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)?c?String(c.name||c.fullName||"").trim():"":l},r=AppState.companySettings?.safetyTeam||AppState.companySettings?.safetyTeamMembers;return Array.isArray(r)?r.forEach((s,l)=>{const c=o(s?.name||s);c&&i.set(c,{id:`settings-${l}`,name:c})}):typeof r=="string"&&r.split(/\n|,/).forEach((s,l)=>{const c=o(s);c&&i.set(c,{id:`settings-${l}`,name:c})}),a||(AppState.appData.users||[]).forEach(s=>{if(s.active===!1||s.active==="false"||s.active==="FALSE"||s.isActive===!1||s.isActive==="false")return;const l=(s.role||"").toLowerCase();if(!(l.includes("safety")||l.includes("hse")||l.includes("\u0633\u0644\u0627\u0645\u0629")))return;const d=this.resolveSafetyTrainerDisplayName(s);if(d){const p=(AppState.appData?.employees||[]).find(g=>s.employeeCode&&(g.employeeNumber===s.employeeCode||g.sapId===s.employeeCode)||String(g.email||"").toLowerCase()===String(s.email||"").toLowerCase()||String(g.name||g.fullName||"").trim()===d.trim());if(p&&n(p))return;i.set(d,{id:s.id||s.email||d,name:d})}}),(AppState.appData.employees||[]).forEach(s=>{if(n(s))return;const l=(s.department||"").toLowerCase(),c=(s.position||s.jobTitle||"").toLowerCase();if(l.includes("\u0633\u0644\u0627\u0645\u0629")||l.includes("hse")||c.includes("\u0633\u0644\u0627\u0645\u0629")||c.includes("hse")){const p=s.name||s.fullName||"";p&&i.set(p,{id:s.id||s.employeeNumber||p,name:p})}}),Array.from(i.values()).sort((s,l)=>s.name.localeCompare(l.name,"ar"))},openContractorTrainingForm(t=null){this.ensureData();const e=this.getContractorOptions(),a=new Map(e.map(v=>[String(v?.id??"").trim(),v.name||""])),i=AppState.appData.contractorTrainings||[],n=t?i.find(v=>v.id===t):null,o=e.length>0,r=n?.date?new Date(n.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),s=n&&this.cleanTime(n.startTime||n.fromTime||n.timeFrom)||"",l=n&&this.cleanTime(n.endTime||n.toTime||n.timeTo)||"",c=n?.contractorId?String(n.contractorId).trim():"",d=n?.contractorName?String(n.contractorName).trim():"",p=typeof Contractors<"u"&&typeof Contractors.getAllContractorsForModules=="function"?Contractors.getAllContractorsForModules():e;let g="";if(n){if(c)if(e.find(L=>String(L?.id??"").trim()===c))g=c;else{const L=p.find(N=>(Array.isArray(N.aliasIds)?N.aliasIds:[]).includes(c)||String(N.approvedEntityId??"").trim()===c);if(L){const N=e.find(T=>String(T?.name??"").trim()===String(L.name??"").trim());N&&(g=String(N?.id??"").trim())}if(!g&&d){const N=e.find(T=>String(T?.name??"").trim()===d);N&&(g=String(N?.id??"").trim())}if(!g){const N=e.find(T=>String(T?.name??"").trim()===c);N&&(g=String(N?.id??"").trim())}}else if(d){const v=e.find(L=>String(L?.name??"").trim()===d);v&&(g=String(v?.id??"").trim())}}const f=document.createElement("div");if(f.className="modal-overlay",f.innerHTML=`
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
                        ${o?"":`
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
                                <div style="position: relative;" id="contractor-training-topic-wrapper">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                                        <label class="block text-sm font-semibold mb-0" style="color: #4c5c96; display: flex; align-items: center; gap: 5px;">
                                            <i class="fas fa-book" style="color: #667eea;"></i> \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A <span style="color: #ef4444;">*</span>
                                        </label>
                                        <button type="button" onclick="Training.toggleContractorTopicSuggestions()" style="font-size: 11px; font-weight: 700; background: #f3f4f6; color: #4f46e5; border: 1px solid #c7d2fe; border-radius: 6px; padding: 2px 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" onmouseover="this.style.background='#e0e7ff'" onmouseout="this.style.background='#f3f4f6'">
                                            <i class="fas fa-list-check"></i> \u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A (${this.getPreviousTrainingTopics().length})
                                        </button>
                                    </div>
                                    <div style="position: relative; display: flex; align-items: center;">
                                        <input type="text" id="contractor-training-topic" class="form-input" required list="contractor-training-topic-datalist" placeholder="\u0627\u0643\u062A\u0628 \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629..." value="${Utils.escapeHTML(n?.topic||n?.subject||"")}" style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px; padding-left: 36px; width: 100%; font-weight: 600;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'" autocomplete="off">
                                        <button type="button" id="contractor-topic-toggle-btn" onclick="Training.toggleContractorTopicSuggestions()" style="position: absolute; left: 4px; top: 50%; transform: translateY(-50%); width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #667eea; background: transparent; border: none; cursor: pointer;" title="\u0639\u0631\u0636 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629">
                                            <i class="fas fa-chevron-down" style="font-size: 11px; transition: transform 0.2s;" id="contractor-topic-chevron"></i>
                                        </button>
                                    </div>

                                    <!-- Datalist \u0644\u0645\u062A\u0635\u0641\u062D\u0627\u062A \u0627\u0644\u062C\u0648\u0627\u0644 -->
                                    <datalist id="contractor-training-topic-datalist">
                                        ${this.getPreviousTrainingTopics().map(v=>`<option value="${Utils.escapeHTML(v)}">`).join("")}
                                    </datalist>

                                    <!-- \u0642\u0627\u0626\u0645\u0629 \u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0627\u0644\u0645\u0646\u0633\u062F\u0644\u0629 -->
                                    <div id="contractor-training-topic-suggestions-popup" style="position: absolute; right: 0; left: 0; margin-top: 6px; background: #ffffff; border: 2px solid #c7d2fe; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); z-index: 50; overflow: hidden; max-height: 280px; display: none;">
                                        <div style="padding: 8px 12px; background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-bottom: 1px solid #ddd6fe; display: flex; align-items: center; justify-content: space-between;">
                                            <span style="font-size: 12px; font-weight: 700; color: #4c1d95;"><i class="fas fa-history" style="color: #7c3aed; margin-left: 4px;"></i> \u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0648\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0633\u0627\u0628\u0642\u0629 \u0645\u0639\u062A\u0645\u062F\u0629</span>
                                            <span style="font-size: 11px; font-weight: 800; color: #6d28d9;" id="contractor-topics-count">${this.getPreviousTrainingTopics().length} \u0645\u0648\u0636\u0648\u0639</span>
                                        </div>
                                        <div style="overflow-y: auto; max-height: 220px;" id="contractor-topics-list-items">
                                            ${this.getPreviousTrainingTopics().map(v=>`
                                                <div class="contractor-topic-option" style="padding: 9px 12px; border-bottom: 1px solid #f1f5f9; font-size: 12px; font-weight: 600; color: #334155; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: background 0.15s;" data-topic-text="${Utils.escapeHTML(v)}" onclick="Training.selectContractorTopicOption('${Utils.escapeHTML(v).replace(/'/g,"\\'")}')" onmouseover="this.style.background='#f5f3ff'" onmouseout="this.style.background='#ffffff'">
                                                    <div style="display: flex; align-items: center; gap: 8px;">
                                                        <i class="fas fa-check-circle" style="color: #8b5cf6; font-size: 12px; flex-shrink: 0;"></i>
                                                        <span>${Utils.escapeHTML(v)}</span>
                                                    </div>
                                                    <span style="font-size: 11px; font-weight: 700; color: #7c3aed;"><i class="fas fa-arrow-left"></i> \u0627\u062E\u062A\u064A\u0627\u0631</span>
                                                </div>
                                            `).join("")}
                                        </div>
                                    </div>
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
                                    <select id="contractor-training-contractor" class="form-input" required ${o?"":"disabled"} style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</option>
                                        ${e.map(v=>{const L=String(v?.id??"").trim(),N=g!==""&&L!==""&&L===g;return`
                                                <option value="${Utils.escapeHTML(L)}" ${N?"selected":""}>
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
                                        <input type="time" id="contractor-training-from-time" class="form-input" required value="${s||"09:00"}" style="border: 2px solid #e0e7ff; border-radius: 10px; transition: all 0.3s; padding: 10px 12px;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.15)'" onblur="this.style.borderColor='#e0e7ff'; this.style.boxShadow='none'">
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
                        <button type="submit" class="btn-primary" ${o?"":"disabled"} style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; padding: 12px 28px; border-radius: 10px; font-weight: 600; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.35); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.45)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.35)'">
                            <i class="fas fa-save ml-2"></i>
                            ${n?"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644":"\u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(f),g!==""){const v=f.querySelector("#contractor-training-contractor");v&&v.value!==g&&(v.value=g)}let u=!1,m=null;const y=v=>{v&&(v.preventDefault(),v.stopPropagation()),!u&&(u=!0,f&&f.parentNode&&f.remove(),m&&(document.removeEventListener("keydown",m),m=null))},x=f.querySelector(".modal-content");x&&x.addEventListener("click",v=>{v.stopPropagation()});const b=v=>{v&&(v.preventDefault(),v.stopPropagation()),y(v)},S=f.querySelector(".modal-close");S&&S.addEventListener("click",b);const I=f.querySelector('[data-action="close"]');I&&I.addEventListener("click",b),f.addEventListener("click",v=>{v.target===f&&(v.preventDefault(),v.stopPropagation(),typeof Notification<"u"&&Notification.warning?Notification.warning("\u062A\u0646\u0628\u064A\u0647: \u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0632\u0631 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 (\xD7) \u0623\u0648 \u0632\u0631 \u0625\u0644\u063A\u0627\u0621 \u0623\u0633\u0641\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C."):alert("\u062A\u0646\u0628\u064A\u0647: \u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0632\u0631 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 (\xD7) \u0623\u0648 \u0632\u0631 \u0625\u0644\u063A\u0627\u0621 \u0623\u0633\u0641\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C."))}),m=v=>{(v.key==="Escape"||v.keyCode===27)&&(v.preventDefault(),v.stopPropagation(),y(v))},document.addEventListener("keydown",m);const h=()=>{const v=f.querySelector("#contractor-training-from-time"),L=f.querySelector("#contractor-training-to-time"),N=f.querySelector("#contractor-training-duration"),T=f.querySelector("#contractor-training-trainees"),M=f.querySelector("#contractor-training-hours");if(!v||!L||!N||!T||!M)return;const _=v.value,H=L.value;if(!_||!H){N.value="",M.value="";return}const U=_.split(":"),z=H.split(":"),q=parseInt(U[0],10)*60+parseInt(U[1],10);let P=parseInt(z[0],10)*60+parseInt(z[1],10)-q;P<0&&(P=1440+P),N.value=P>0?P:"";const j=parseInt(T.value||"0",10);if(Number.isFinite(j)&&j>0&&P>0){const R=Number((j*P/60).toFixed(2));M.value=R>0?R.toFixed(2):""}else M.value=""},k=f.querySelector("#contractor-training-from-time"),$=f.querySelector("#contractor-training-to-time"),w=f.querySelector("#contractor-training-trainees");k&&(k.addEventListener("change",h),k.addEventListener("input",h)),$&&($.addEventListener("change",h),$.addEventListener("input",h)),w&&(w.addEventListener("change",h),w.addEventListener("input",h)),setTimeout(h,100);const A=f.querySelector("#contractor-training-form-body"),D=f.querySelector("#contractor-training-scroll-indicator");if(A&&D){const v=()=>{const L=A.scrollHeight>A.clientHeight,N=A.scrollTop<A.scrollHeight-A.clientHeight-20;D.style.display=L&&N?"block":"none"};setTimeout(v,200),A.addEventListener("scroll",v),window.addEventListener("resize",v)}const F=f.querySelector("#contractor-training-topic");F&&F.addEventListener("input",v=>{this.filterContractorTopicSuggestions(v.target.value);const L=f.querySelector("#contractor-training-topic-suggestions-popup");L&&L.style.display!=="block"&&this.toggleContractorTopicSuggestions(!0)}),f.addEventListener("click",v=>{const L=f.querySelector("#contractor-training-topic-wrapper");if(L&&!L.contains(v.target)){const N=f.querySelector("#contractor-training-topic-suggestions-popup");N&&N.style.display==="block"&&this.toggleContractorTopicSuggestions(!1)}});const E=f.querySelector("#contractor-training-location"),C=f.querySelector("#contractor-training-sub-location");if(E&&C){const v=()=>{const L=E.value;if(!L){C.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>';return}const N=this.getPlaceOptions(L),T=C.value||(n?.subLocationId?String(n.subLocationId):"");C.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A</option>',N.forEach(M=>{const _=document.createElement("option");_.value=M.id,_.textContent=M.name,(M.id===T||M.id===String(T)||n?.subLocationId&&(M.id===n.subLocationId||M.id===String(n.subLocationId)))&&(_.selected=!0),C.appendChild(_)})};E.addEventListener("change",v),n?.locationId||E.value?requestAnimationFrame(()=>{v()}):E.value&&requestAnimationFrame(()=>{v()})}f.querySelector("#contractor-training-form")?.addEventListener("submit",async v=>{v.preventDefault();const L=f.querySelector('button[type="submit"]');if(L&&L.disabled)return;let N="";L&&(N=L.innerHTML,L.disabled=!0,L.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const T=f.querySelector("#contractor-training-date")?.value,M=f.querySelector("#contractor-training-topic")?.value.trim(),_=f.querySelector("#contractor-training-trainer")?.value.trim(),H=f.querySelector("#contractor-training-contractor")?.value,U=parseInt(f.querySelector("#contractor-training-trainees")?.value||"0",10),z=f.querySelector("#contractor-training-from-time")?.value||"",q=f.querySelector("#contractor-training-to-time")?.value||"",O=parseInt(f.querySelector("#contractor-training-duration")?.value||"0",10),P=f.querySelector("#contractor-training-hours"),j=P?parseFloat(P.value||"0"):0,R=f.querySelector("#contractor-training-location")?.value.trim(),K=f.querySelector("#contractor-training-sub-location")?.value.trim(),J=this.getSiteOptions().find(B=>B.id===R||String(B.id)===String(R)),et=this.getPlaceOptions(R).find(B=>B.id===K||String(B.id)===String(K)),at=f.querySelector("#contractor-training-location"),it=f.querySelector("#contractor-training-sub-location"),ot=J?J.name:at?.options[at.selectedIndex]?.text||"",rt=et?et.name:it?.options[it.selectedIndex]?.text||"",lt=f.querySelector("#contractor-training-notes")?.value.trim(),X=String(H??"").trim();if(!T||!M||!_||!X||!Number.isFinite(U)||U<=0||!z||!q){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0644\u0644\u062A\u062F\u0631\u064A\u0628"),L&&(L.disabled=!1,L.innerHTML=N);return}const nt=f.querySelector("#contractor-training-contractor"),Q=nt?.options[nt?.selectedIndex];let G="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(Q&&Q.textContent?G=Q.textContent.trim():G=a.get(X)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",!G||G==="\u0628\u062F\u0648\u0646 \u0627\u0633\u0645"||G==="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"){const B=e.find(W=>String(W.id||"").trim()===X);B&&B.name?G=B.name.trim():G=a.get(X)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}let V=new Date().toISOString();if(T){const B=T.split("-");if(B.length===3){const W=parseInt(B[0],10),ct=parseInt(B[1],10)-1,dt=parseInt(B[2],10),st=new Date(W,ct,dt,12,0,0);isNaN(st.getTime())||(V=st.toISOString())}else{const W=new Date(T);isNaN(W.getTime())||(V=W.toISOString())}}const Y={id:n?.id||Utils.generateSequentialId("CTR",AppState.appData?.contractorTrainings||[]),date:V,topic:M,trainer:_,contractorId:X,contractorName:G,traineesCount:U,startTime:this.cleanTime(z)||z,endTime:this.cleanTime(q)||q,durationMinutes:Number.isFinite(O)&&O>0?O:"",totalHours:j>0?j:"",location:ot,locationId:R?String(R).trim():null,subLocation:rt,subLocationId:K?String(K).trim():null,notes:lt,createdAt:n?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()},Z=AppState.appData.contractorTrainings;if(n){const B=Z.findIndex(W=>W.id===n.id);B!==-1&&(Z[B]=Y)}else Z.push(Y);this._contractorTrainingsLocalSaveTime=Date.now(),y(),Notification.success(n?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"),setTimeout(()=>{try{typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(B){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B:",B)}this.refreshContractorTrainingList().catch(B=>{Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0626\u0645\u0629:",B)}),(async()=>{try{AppState.googleConfig?.appsScript?.enabled&&typeof GoogleIntegration<"u"?n?await GoogleIntegration.sendRequest({action:"updateContractorTraining",data:{trainingId:Y.id,updateData:Y}}):await GoogleIntegration.sendRequest({action:"addContractorTraining",data:Y}):typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("ContractorTrainings",AppState.appData.contractorTrainings)}catch(B){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0642\u0627\u0639\u062F\u0629 SQL (\u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B):",B)}})()},0)}catch(T){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",T),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: "+T.message),L&&(L.disabled=!1,L.innerHTML=N)}})},viewContractorTraining(t){this.ensureData();const a=(AppState.appData.contractorTrainings||[]).find(y=>y.id===t);if(!a){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=new Map((this.getContractorOptions()||[]).map(y=>[String(y?.id??"").trim(),y.name||""])),n=String(a.contractorId||"").trim(),o=String(a.contractorName||"").replace(/\s+/g," ").trim(),s=o&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(o)?o:i.get(n)||o||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",l=a.totalHours?parseFloat(a.totalHours).toFixed(2):"\u2014",c=a.date?Utils.formatDate(a.date):"\u2014",d=this.cleanTime(a.startTime||a.fromTime||a.timeFrom)||"\u2014",p=this.cleanTime(a.endTime||a.toTime||a.timeTo)||"\u2014",g=a.durationMinutes?`${a.durationMinutes} \u062F\u0642\u064A\u0642\u0629`:"\u2014",f=a.traineesCount?`${a.traineesCount} \u0645\u062A\u062F\u0631\u0628`:"\u2014",u=document.createElement("div");u.className="modal-overlay",u.innerHTML=`
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
                                <span style="display: inline-flex; align-items: center; gap: 5px;"><i class="fas fa-building" style="color: #38bdf8;"></i> ${Utils.escapeHTML(s)}</span>
                                <span>\u2022</span>
                                <span style="display: inline-flex; align-items: center; gap: 5px;"><i class="fas fa-calendar-alt" style="color: #a78bfa;"></i> ${c}</span>
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
                            <div style="color: #0f172a; font-size: 0.95rem; font-weight: 700; direction: ltr;">${d} - ${p}</div>
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
                                    <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a;"><span class="badge" style="background: #e0f2fe; color: #0369a1; font-weight: 600; padding: 3px 8px; border-radius: 6px;">${Utils.escapeHTML(s)}</span></div>
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
                                    <div style="font-size: 0.95rem; font-weight: 600; color: #0f172a;">${c}</div>
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
        `,document.body.appendChild(u);const m=()=>u.remove();u.querySelector(".modal-close")?.addEventListener("click",m),u.querySelector('[data-action="close"]')?.addEventListener("click",m),u.addEventListener("click",y=>{y.target===u&&m()})},editContractorTraining(t){this.openContractorTrainingForm(t)},async deleteContractorTraining(t){if(!this.isCurrentUserAdminOrManager()){Notification.error("\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062D\u0630\u0641 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u0627\u0644\u062D\u0630\u0641 \u064A\u062A\u0645 \u0628\u0637\u0644\u0628 \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637.");return}this.ensureData();const e=AppState.appData.contractorTrainings||[],a=e.find(l=>l.id===t);if(!a){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=new Map((this.getContractorOptions()||[]).map(l=>[String(l?.id??"").trim(),l.name||""])),n=String(a.contractorId||"").trim(),o=String(a.contractorName||"").replace(/\s+/g," ").trim(),s=o&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(o)?o:i.get(n)||o||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u062A\u062F\u0631\u064A\u0628 "${a.topic||""}" \u0644\u0644\u0645\u0642\u0627\u0648\u0644 "${s}"\u061F

\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627.`))try{const l=e.findIndex(c=>c.id===t);if(l!==-1){if(e.splice(l,1),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled)try{const c=AppState.appData.contractorTrainings.filter(d=>d.id!==t);await GoogleIntegration.sendRequest({action:"saveToSheet",data:{sheetName:"ContractorTrainings",data:c}})}catch(c){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 SQL\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B:",c),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave?.("ContractorTrainings",AppState.appData.contractorTrainings).catch(()=>{})}else typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave?.("ContractorTrainings",AppState.appData.contractorTrainings);await this.refreshContractorTrainingList(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0628\u0646\u062C\u0627\u062D")}}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644:",l),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644: "+l.message)}},exportContractorTrainingExcel(){this.ensureData();try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0623\u0648 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629.");return}const t=this.getContractorOptions(),e=new Map(t.map(s=>[String(s?.id??"").trim(),s.name||""])),i=(AppState.appData.contractorTrainings||[]).map(s=>{const l=String(s.contractorId||"").trim(),c=String(s.contractorName||"").replace(/\s+/g," ").trim(),p=c&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(c)?c:e.get(l)||c||"",g=this.cleanTime(s.startTime||s.fromTime)||"",f=this.cleanTime(s.endTime||s.toTime)||"",u=s.durationMinutes&&!isNaN(Number(s.durationMinutes))?Number(s.durationMinutes):"",m=s.totalHours&&!isNaN(Number(s.totalHours))?parseFloat(s.totalHours).toFixed(2):"";return{\u0627\u0644\u062A\u0627\u0631\u064A\u062E:s.date?Utils.formatDate(s.date):"","\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A":s.topic||"","\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628":s.trainer||"","\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0634\u0631\u0643\u0629":p,"\u0639\u062F\u062F \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646":s.traineesCount||"","\u0645\u0646 \u0627\u0644\u0633\u0627\u0639\u0629":g,"\u0625\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629":f,"\u0648\u0642\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u062F\u0642\u0627\u0626\u0642)":u,"\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629":m,"\u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628":s.location||"","\u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A":s.subLocation||"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:s.notes||""}}),n=XLSX.utils.book_new(),o=XLSX.utils.json_to_sheet(i);o["!cols"]=[{wch:14},{wch:28},{wch:22},{wch:24},{wch:12},{wch:10},{wch:10},{wch:14},{wch:20},{wch:24},{wch:20},{wch:40}],XLSX.utils.book_append_sheet(n,o,"\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646");const r=`\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(n,r),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646: "+t.message)}},showContractorTrainingReportDialog(){this.ensureData();const t=this.getContractorOptions();if(t.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u062A\u0627\u062D\u064A\u0646");return}const e=new Date,a=e.getFullYear(),i=[];for(let f=0;f<24;f++){const u=new Date(a,e.getMonth()-f,1),m=u.getFullYear(),y=u.getMonth()+1,x=`${m}-${String(y).padStart(2,"0")}`,b=u.toLocaleDateString("ar-SA",{year:"numeric",month:"long"});i.push({value:x,label:b})}const n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
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
                            ${t.map(f=>`
                                <option value="${Utils.escapeHTML(String(f.id??"").trim())}">
                                    ${Utils.escapeHTML(f.name||"\u0628\u062F\u0648\u0646 \u0627\u0633\u0645")}
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
                                    ${i.map(f=>`
                                        <option value="${Utils.escapeHTML(f.value)}">${Utils.escapeHTML(f.label)}</option>
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
                <div class="modal-footer" style="display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap;">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" class="btn-secondary" id="export-contractor-report-excel-btn" style="display: inline-flex; align-items: center; gap: 6px;">
                        <i class="fas fa-file-excel text-green-600"></i>
                        \u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                    <button type="button" class="btn-secondary" id="preview-contractor-report-btn" style="display: inline-flex; align-items: center; gap: 6px;">
                        <i class="fas fa-print"></i>
                        \u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0637\u0628\u0627\u0639\u0629
                    </button>
                    <button type="button" class="btn-primary" id="generate-contractor-report-btn" style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #059669 0%, #047857 100%);">
                        <i class="fas fa-file-arrow-down"></i>
                        \u062A\u062D\u0645\u064A\u0644 \u0645\u0628\u0627\u0634\u0631 (PDF)
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n);const o=()=>n.remove();n.querySelector(".modal-close")?.addEventListener("click",o),n.querySelector('[data-action="close"]')?.addEventListener("click",o),n.addEventListener("click",f=>{f.target===n&&o()});const r=n.querySelectorAll('input[name="date-range-type"]'),s=n.querySelector("#contractor-report-month"),l=n.querySelector("#contractor-report-from-date"),c=n.querySelector("#contractor-report-to-date"),d=()=>{const f=n.querySelector('input[name="date-range-type"]:checked')?.value||"all";f==="month"?(s.disabled=!1,s.required=!0,l.disabled=!0,l.required=!1,c.disabled=!0,c.required=!1):f==="custom"?(s.disabled=!0,s.required=!1,l.disabled=!1,l.required=!0,c.disabled=!1,c.required=!0):(s.disabled=!0,s.required=!1,l.disabled=!0,l.required=!1,c.disabled=!0,c.required=!1)};r.forEach(f=>{f.addEventListener("change",d)});const p=()=>{const f=n.querySelector("#contractor-report-select"),u=f?.value?String(f.value).trim():"",m=u?String(f?.options?.[f.selectedIndex]?.textContent||"").replace(/\s+/g," ").trim():"",y=n.querySelector('input[name="date-range-type"]:checked')?.value||"all",x=n.querySelector("#contractor-report-month")?.value||"",b=n.querySelector("#contractor-report-from-date")?.value||"",S=n.querySelector("#contractor-report-to-date")?.value||"";return{selectedContractorId:u,selectedContractorName:m,dateRangeType:y,selectedMonth:x,fromDate:b,toDate:S}},g=f=>{if(f.dateRangeType==="month"&&!f.selectedMonth)return Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628"),!1;if(f.dateRangeType==="custom"){if(!f.fromDate||!f.toDate)return Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0644\u0644\u0641\u062A\u0631\u0629"),!1;if(new Date(f.fromDate)>new Date(f.toDate))return Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629"),!1}return!0};n.querySelector("#generate-contractor-report-btn")?.addEventListener("click",async()=>{const f=p();g(f)&&(o(),await this.generateContractorTrainingReport(f.selectedContractorId,{dateRangeType:f.dateRangeType,month:f.selectedMonth,fromDate:f.fromDate,toDate:f.toDate},f.selectedContractorName,"download"))}),n.querySelector("#preview-contractor-report-btn")?.addEventListener("click",async()=>{const f=p();g(f)&&(o(),await this.generateContractorTrainingReport(f.selectedContractorId,{dateRangeType:f.dateRangeType,month:f.selectedMonth,fromDate:f.fromDate,toDate:f.toDate},f.selectedContractorName,"print"))}),n.querySelector("#export-contractor-report-excel-btn")?.addEventListener("click",()=>{o(),this.exportContractorTrainingExcel()})},_buildTrainingAnalysisExportMonthOptionsHtml(){const t=new Date,e=t.getFullYear(),a=[];for(let i=0;i<24;i++){const n=new Date(e,t.getMonth()-i,1),o=n.getFullYear(),r=n.getMonth()+1,s=`${o}-${String(r).padStart(2,"0")}`,l=n.toLocaleDateString("ar-SA",{year:"numeric",month:"long"});a.push(`<option value="${Utils.escapeHTML(s)}">${Utils.escapeHTML(l)}</option>`)}return a.join("")},_readDateFilterFromTrainingExportModal(t){const e=t.querySelector('input[name="ta-modal-date-range"]:checked')?.value||"all";if(e==="all")return{type:"all",month:"",start:"",end:""};if(e==="month")return{type:"month",month:t.querySelector("#ta-modal-month")?.value?.trim()||"",start:"",end:""};const a=t.querySelector("#ta-modal-from-date")?.value?.trim()||"",i=t.querySelector("#ta-modal-to-date")?.value?.trim()||"";return{type:"range",month:"",start:a,end:i}},_refreshAnalysisExportModalLists(t,e){this.ensureData();const a=this._readDateFilterFromTrainingExportModal(t);if(e==="trainers"){const i=t.querySelector("#ta-modal-trainer-select");if(!i)return;const n=i.value;let o=Array.isArray(AppState.appData.training)?AppState.appData.training:[];o=this.filterRecordsByAnalysisDate(o,a,"training");const r=new Set;o.forEach(l=>r.add(this.getTrainingAnalysisValue("training","trainer",l)));const s=Array.from(r).filter(l=>l&&l!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").sort((l,c)=>String(l).localeCompare(String(c),"ar"));i.innerHTML='<option value="">\u2014 \u0643\u0644 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u2014</option>'+s.map(l=>`<option value="${Utils.escapeHTML(l)}">${Utils.escapeHTML(l)}</option>`).join(""),n&&s.includes(n)&&(i.value=n)}else{const i=t.querySelector("#ta-modal-department-select"),n=t.querySelector("#ta-modal-person-select");if(!n)return;const o=n.value,r=t.querySelector("#ta-modal-audience")?.value||"all";let s=Array.isArray(AppState.appData.trainingAttendance)?AppState.appData.trainingAttendance:[];if(s=this.filterRecordsByAnalysisDate(s,a,"trainingAttendance"),r==="employee"?s=s.filter(d=>!this._isAttendanceContractorLike(d)):r==="contractor"&&(s=s.filter(d=>this._isAttendanceContractorLike(d))),i){const d=i.value,p=Array.from(new Set(s.map(f=>this._attendanceRecordDepartmentLabel(f)))).sort((f,u)=>String(f).localeCompare(String(u),"ar",{sensitivity:"base"}));i.innerHTML='<option value="">\u2014 \u0643\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0627\u062A \u2014</option>'+p.map(f=>`<option value="${Utils.escapeHTML(f)}">${Utils.escapeHTML(f)}</option>`).join(""),d&&p.includes(d)&&(i.value=d);const g=i.value||"";g&&(s=s.filter(f=>this._attendanceRecordDepartmentLabel(f)===g))}const l=new Map;s.forEach(d=>{const p=this._attendancePersonRowKey(d);if(l.has(p))return;const g=String(d.employeeCode||d.code||d.employeeNumber||"").trim(),f=String(d.employeeName||d.name||"").trim(),u=f?g?`${f} (${g})`:f:g||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";l.set(p,u)});const c=Array.from(l.entries()).sort((d,p)=>String(d[1]).localeCompare(String(p[1]),"ar"));n.innerHTML='<option value="">\u2014 \u0643\u0644 \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u2014</option>'+c.map(([d,p])=>`<option value="${Utils.escapeHTML(d)}">${Utils.escapeHTML(p)}</option>`).join(""),o&&l.has(o)&&(n.value=o)}},showTrainingAnalysisExportDialog(t){if(typeof this.isCurrentUserAdmin=="function"&&!this.isCurrentUserAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}this.ensureData();const e=t==="trainers",a=e?"\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u2014 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628":"\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u2014 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628",i=this._buildTrainingAnalysisExportMonthOptionsHtml(),n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-export ml-2"></i>${Utils.escapeHTML(a)}</h2>
                    <button type="button" class="modal-close" title="\u0625\u063A\u0644\u0627\u0642"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0635\u064A\u063A\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631</label>
                        <div class="flex flex-wrap gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="ta-modal-format" value="pdf_download" class="ml-1" checked>
                                <span class="font-bold text-green-700"><i class="fas fa-file-arrow-down ml-1"></i>\u062A\u062D\u0645\u064A\u0644 PDF \u0645\u0628\u0627\u0634\u0631</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="ta-modal-format" value="pdf_print" class="ml-1">
                                <span><i class="fas fa-print ml-1 text-blue-600"></i>\u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0637\u0628\u0627\u0639\u0629 PDF</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="ta-modal-format" value="excel" class="ml-1">
                                <span><i class="fas fa-file-excel ml-1 text-emerald-600"></i>\u0645\u0644\u0641 Excel</span>
                            </label>
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
            </div>`,document.body.appendChild(n);const o=()=>{n.remove()};n.querySelector(".modal-close")?.addEventListener("click",o),n.querySelector('[data-action="close"]')?.addEventListener("click",o),n.addEventListener("click",g=>{g.target===n&&o()});const r=n.querySelector("#ta-modal-month"),s=n.querySelector("#ta-modal-from-date"),l=n.querySelector("#ta-modal-to-date"),c=()=>{const g=n.querySelector('input[name="ta-modal-date-range"]:checked')?.value||"all";g==="month"?(r.disabled=!1,s&&(s.disabled=!0),l&&(l.disabled=!0)):g==="custom"?(r.disabled=!0,s&&(s.disabled=!1),l&&(l.disabled=!1)):(r.disabled=!0,s&&(s.disabled=!0),l&&(l.disabled=!0))};n.querySelectorAll('input[name="ta-modal-date-range"]').forEach(g=>{g.addEventListener("change",()=>{c(),this._refreshAnalysisExportModalLists(n,e?"trainers":"attendees")})}),r&&r.addEventListener("change",()=>this._refreshAnalysisExportModalLists(n,e?"trainers":"attendees")),s&&s.addEventListener("change",()=>this._refreshAnalysisExportModalLists(n,e?"trainers":"attendees")),l&&l.addEventListener("change",()=>this._refreshAnalysisExportModalLists(n,e?"trainers":"attendees"));const d=n.querySelector("#ta-modal-audience");d&&d.addEventListener("change",()=>this._refreshAnalysisExportModalLists(n,"attendees"));const p=n.querySelector("#ta-modal-department-select");p&&p.addEventListener("change",()=>this._refreshAnalysisExportModalLists(n,"attendees")),c(),this._refreshAnalysisExportModalLists(n,e?"trainers":"attendees"),n.querySelector("#ta-modal-generate-btn")?.addEventListener("click",()=>{const g=n.querySelector('input[name="ta-modal-date-range"]:checked')?.value||"all",f=n.querySelector("#ta-modal-month")?.value||"",u=n.querySelector("#ta-modal-from-date")?.value||"",m=n.querySelector("#ta-modal-to-date")?.value||"";if(g==="month"&&!f){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0647\u0631");return}if(g==="custom"){if(!u||!m){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}if(new Date(u)>new Date(m)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}}const y=this._readDateFilterFromTrainingExportModal(n),x=n.querySelector('input[name="ta-modal-format"]:checked')?.value||"excel",b={dateFilter:y};e?(b.trainerKey=n.querySelector("#ta-modal-trainer-select")?.value?.trim()||"",b.limitTrainers=Math.min(500,Math.max(1,parseInt(n.querySelector("#ta-modal-limit-trainers")?.value||"30",10)||30))):(b.audience=n.querySelector("#ta-modal-audience")?.value||"all",b.attendanceDepartment=n.querySelector("#ta-modal-department-select")?.value?.trim()||"",b.personKey=n.querySelector("#ta-modal-person-select")?.value?.trim()||"",b.limitAttendees=Math.min(2e3,Math.max(1,parseInt(n.querySelector("#ta-modal-limit-attendees")?.value||"50",10)||50))),o(),this._analysisExportContext=b;try{e?x==="pdf_download"?this.exportAnalysisTrainersPDF("download"):x==="pdf_print"||x==="pdf"?this.exportAnalysisTrainersPDF("print"):this.exportAnalysisTrainersExcel():x==="pdf_download"?this.exportAnalysisAttendeesPDF("download"):x==="pdf_print"||x==="pdf"?this.exportAnalysisAttendeesPDF("print"):this.exportAnalysisAttendeesExcel()}finally{this._analysisExportContext=null}})},async generateContractorTrainingReport(t=null,e={},a="",i="download"){this.ensureData();try{Loading.show(i==="download"?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0628\u0627\u0634\u0631...":"\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0644\u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0627\u0644\u0637\u0628\u0627\u0639\u0629..."),(!AppState.appData.contractorTrainings||AppState.appData.contractorTrainings.length===0)&&typeof this.loadContractorTrainingsPriority=="function"&&!this._contractorTrainingsFetchOk&&await this.loadContractorTrainingsPriority().catch(()=>{});const n=this.getContractorOptions(),o=new Map(n.map(E=>[String(E?.id??"").trim(),E.name||""])),r=String(t||"").trim(),s=String(a||"").replace(/\s+/g," ").trim(),l=s.toLowerCase();let c=null;if(s)c=s;else if(r){const E=n.find(C=>String(C.id||"").trim()===r);if(E&&E.name)c=E.name.trim();else if(c=o.get(r)||"",!c||c===""){const C=(AppState.appData.contractorTrainings||[]).find(v=>String(v.contractorId||"").trim()===r);C&&C.contractorName&&(c=C.contractorName.trim())}(!c||c===""||c==="\u0628\u062F\u0648\u0646 \u0627\u0633\u0645")&&(c="",Utils.safeWarn(`\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0644\u0644\u0645\u0639\u0631\u0641: ${r}`))}let d=(AppState.appData.contractorTrainings||[]).slice().sort((E,C)=>new Date(C.date||C.createdAt||0)-new Date(E.date||E.createdAt||0));if(d.length===0&&Array.isArray(AppState.appData.training)){const E=AppState.appData.training.filter(C=>C?C.targetAudience==="contractor"||C.audience==="contractor"||C.type==="contractor"||C.category==="contractor"||C.contractorName||C.contractorId:!1);E.length>0&&(d=E.slice().sort((C,v)=>new Date(v.date||v.createdAt||0)-new Date(C.date||C.createdAt||0)))}const p=E=>{const C=String(E?.contractorId??"").trim(),v=(E?.contractorName||"").toString().replace(/\s+/g," ").trim(),L=(o.get(C)||"").toString().trim();return v||L||""};if(r||l){const E=d,C=E.length,v=l||(o.get(r)||"").toLowerCase();d=E.filter(L=>{const N=p(L).toLowerCase();if(N===v||v&&N.includes(v)||v&&v.includes(N))return!0;if(r){const T=String(L?.contractorId??"").trim();if(T===r)return!0;if(T&&r){const M=T.replace(/\s+/g,""),_=r.replace(/\s+/g,"");if(M===_)return!0}}return!1}),d.length===0&&C>0&&Utils.safeWarn(`\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u062D\u062F\u062F. \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0642\u0628\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629: ${C}`)}const{dateRangeType:g="all",month:f="",fromDate:u="",toDate:m=""}=e||{};if(g==="month"&&f){const[E,C]=f.split("-");d=d.filter(v=>{if(!v.date)return!1;const L=new Date(v.date),N=L.getFullYear(),T=L.getMonth()+1;return N===parseInt(E,10)&&T===parseInt(C,10)})}else if(g==="custom"&&u&&m){const E=new Date(u);E.setHours(0,0,0,0);const C=new Date(m);C.setHours(23,59,59,999),d=d.filter(v=>{if(!v.date)return!1;const L=new Date(v.date);return L>=E&&L<=C})}const y=d.length,x=d.reduce((E,C)=>E+(parseInt(C.traineesCount,10)||0),0),b=d.reduce((E,C)=>E+(parseFloat(C.totalHours)||0),0),S=d.map((E,C)=>{const v=String(E.contractorId||"").trim();let L="-";const N=String(E.contractorName||"").replace(/\s+/g," ").trim();if(N&&!["\u063A\u064A\u0631 \u0645\u062D\u062F\u062F","\u0628\u062F\u0648\u0646 \u0627\u0633\u0645","\u2014","-"].includes(N))L=N;else if(v){if(L=o.get(v)||"",!L||L===""){const H=n.find(U=>String(U?.id??"").trim()===v);H&&H.name&&(L=H.name.trim())}(!L||L==="")&&(L=N||"-")}else L=N||"-";const M=E.durationMinutes&&!isNaN(Number(E.durationMinutes))?Number(E.durationMinutes):"-",_=E.totalHours&&!isNaN(Number(E.totalHours))?parseFloat(E.totalHours).toFixed(2):"-";return`
                <tr>
                    <td style="font-weight: 800;">${C+1}</td>
                    <td style="white-space: nowrap;">${E.date?Utils.formatDate(E.date):"-"}</td>
                    <td style="text-align: right; font-weight: 700;">${Utils.escapeHTML(E.topic||"-")}</td>
                    <td style="text-align: right;">${Utils.escapeHTML(E.trainer||"-")}</td>
                    ${c?"":`<td style="text-align: right; font-weight: 700; color: #1e3a8a;">${Utils.escapeHTML(L)}</td>`}
                    <td style="font-weight: 800; color: #047857;">${E.traineesCount||"-"}</td>
                    <td>${M}</td>
                    <td style="font-weight: 800; color: #1e3a8a;">${_}</td>
                    <td style="text-align: right;">${Utils.escapeHTML(E.location||"-")}</td>
                    <td style="text-align: right;">${Utils.escapeHTML(E.subLocation||"-")}</td>
                </tr>
            `}).join("");let I="";if(g==="month"&&f){const[E,C]=f.split("-");I=new Date(parseInt(E,10),parseInt(C,10)-1,1).toLocaleDateString("ar-SA",{year:"numeric",month:"long"})}else g==="custom"&&u&&m?I=`\u0645\u0646 ${Utils.formatDate(u)} \u0625\u0644\u0649 ${Utils.formatDate(m)}`:I="\u062C\u0645\u064A\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629";const h="DOC-HSE-TRN-CON-01",k=c?`\u062A\u0642\u0631\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${c}`:"\u0633\u062C\u0644 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629",w=this.getIsoPrintHeaderHtml(k,"Contractor & Third-Party HSE Training & Induction Registry",h,"Rev. 03","\u062F\u0627\u062E\u0644\u064A \u0648\u0645\u0639\u062A\u0645\u062F"),A=this.getIsoPrintFooterHtml(h,"Rev. 03","ISO 45001:2018 (Clause 7.2 Competence & 8.1.4 Contractors)"),D=`
                ${w}

                <div class="handover-info-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 14px;">
                    <div class="info-card" style="grid-column: span ${c?"2":"1"};">
                        <div class="card-label">\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629:</div>
                        <div class="card-value" style="color: #1e3a8a;">${Utils.escapeHTML(c||"\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062A")}</div>
                    </div>
                    <div class="info-card" style="grid-column: span ${c?"2":"1"};">
                        <div class="card-label">\u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 \u0644\u0644\u062A\u0642\u0631\u064A\u0631:</div>
                        <div class="card-value">${Utils.escapeHTML(I)}</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0646\u0639\u0642\u062F\u0629:</div>
                        <div class="card-value" style="color: #1e3a8a; font-size: 14px;">${y}</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u0629:</div>
                        <div class="card-value" style="color: #047857; font-size: 14px;">${x} \u0639\u0627\u0645\u0644</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628:</div>
                        <div class="card-value" style="color: #b45309; font-size: 14px;">${b.toFixed(2)} \u0633\u0627\u0639\u0629</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0648\u062B\u064A\u0642:</div>
                        <div class="card-value" style="color: #047857;">\u0645\u0639\u062A\u0645\u062F \u0648\u0645\u0637\u0627\u0628\u0642</div>
                    </div>
                </div>

                <div style="margin-top: 14px; margin-bottom: 6px;">
                    <h3 style="margin: 0; font-size: 13px; font-weight: 900; color: #1e3a8a;">
                        <i class="fas fa-list-check" style="margin-left: 6px;"></i> \u062A\u0641\u0627\u0635\u064A\u0644 \u062C\u0644\u0633\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0644\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629
                    </h3>
                </div>

                <table class="iso-table">
                    <thead>
                        <tr>
                            <th style="width: 35px;">#</th>
                            <th style="width: 85px;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th>\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A</th>
                            <th>\u0627\u0644\u0645\u062F\u0631\u0628</th>
                            ${c?"":"<th>\u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0634\u0631\u0643\u0629</th>"}
                            <th style="width: 65px;">\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646</th>
                            <th style="width: 65px;">\u0627\u0644\u0645\u062F\u0629 (\u062F)</th>
                            <th style="width: 65px;">\u0627\u0644\u0633\u0627\u0639\u0627\u062A</th>
                            <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                            <th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${S||`<tr><td colspan="${c?"9":"10"}" style="padding: 16px; text-align: center; color: #64748b;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062A\u062F\u0631\u064A\u0628 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</td></tr>`}
                    </tbody>
                </table>

                <div class="signatures-grid">
                    <div class="sig-card">
                        <div class="sig-card-title">\u0645\u0633\u0624\u0648\u0644 \u062A\u062F\u0631\u064A\u0628 \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div>
                        <div class="sig-card-name">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                    </div>
                    <div class="sig-card">
                        <div class="sig-card-title">\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0628\u0627\u0644\u0645\u0635\u0646\u0639</div>
                        <div class="sig-card-name">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                    </div>
                    <div class="sig-card">
                        <div class="sig-card-title">\u0645\u062F\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                        <div class="sig-card-name">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</div>
                        <div class="sig-line-area">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u062E\u062A\u0645 \u0627\u0644\u0631\u0633\u0645\u064A</div>
                    </div>
                </div>

                ${A}
            `,F=`${k.replace(/[\\/:*?"<>|]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`;if(i==="download"){const E=await this.downloadIsoReportAsPdf(k,D,F,!0);if(Loading.hide(),E)return!0}return Loading.hide(),this.openIsoPrintWindow(k,D,!0,"",F)}catch(n){return Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",n),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646: "+n.message),!1}},showAnnualPlanModal(t=new Date().getFullYear()){this.ensureData();const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
        `,document.body.appendChild(e);const a=e.querySelector(".modal-content");let i=!1,n=null;const o=p=>{i||(i=!0,p&&(p.preventDefault(),p.stopPropagation()),n&&(document.removeEventListener("keydown",n),n=null),e&&e.parentNode&&e.remove())};a&&a.addEventListener("click",p=>{p.stopPropagation()});const r=e.querySelector(".modal-close");r&&r.addEventListener("click",p=>{p.stopPropagation(),o(p)});const s=e.querySelector('[data-action="close"]');s&&s.addEventListener("click",p=>{p.stopPropagation(),o(p)}),e.addEventListener("click",p=>{p.target===e&&!i&&o(p)}),n=p=>{(p.key==="Escape"||p.keyCode===27)&&o(p)},document.addEventListener("keydown",n);const l=e.querySelector("#annual-plan-year"),c=e.querySelector("#annual-plan-body"),d=()=>{const p=parseInt(l?.value,10)||new Date().getFullYear();c.innerHTML=this.renderAnnualPlanContent(p),this.bindAnnualPlanEvents(e,p)};e.querySelector("#annual-plan-prev-year")?.addEventListener("click",()=>{l.value=(parseInt(l.value,10)||t)-1,d()}),e.querySelector("#annual-plan-next-year")?.addEventListener("click",()=>{l.value=(parseInt(l.value,10)||t)+1,d()}),l?.addEventListener("change",d),d()},renderAnnualPlanContent(t){const e=this.getAnnualPlan(t,{createIfMissing:this.isCurrentUserAdmin()});if(!e)return`
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
        `},bindAnnualPlanEvents(t,e){if(!this.getAnnualPlan(e,{createIfMissing:!1})){t.querySelector("#create-annual-plan-btn")?.addEventListener("click",()=>{this.createAnnualPlan(e);const i=t.querySelector("#annual-plan-body");i&&(i.innerHTML=this.renderAnnualPlanContent(e)),this.bindAnnualPlanEvents(t,e)});return}if(this.isCurrentUserAdmin()){const i=()=>{const n=t.querySelector("#annual-plan-body");n&&(n.innerHTML=this.renderAnnualPlanContent(e)),this.bindAnnualPlanEvents(t,e)};t.querySelector("#add-annual-plan-item-btn")?.addEventListener("click",()=>this.openAnnualPlanItemForm(e,null,i)),t.querySelectorAll('[data-action="delete-plan-item"]').forEach(n=>{n.addEventListener("click",()=>{const o=n.getAttribute("data-item-id");this.removeAnnualPlanItem(e,o),i()})}),t.querySelectorAll('[data-action="edit-plan-item"]').forEach(n=>{n.addEventListener("click",()=>{const o=n.getAttribute("data-item-id");this.openAnnualPlanItemForm(e,o,i)})}),t.querySelectorAll(".plan-status-select").forEach(n=>{n.addEventListener("change",o=>{const r=n.getAttribute("data-item-id");this.updateAnnualPlanItemStatus(e,r,o.target.value)})}),t.querySelectorAll(".plan-training-link").forEach(n=>{n.addEventListener("change",o=>{const r=n.getAttribute("data-item-id"),s=o.target.value;this.linkTrainingToPlanItem(e,r,s),i()})})}},renderAnnualPlanTable(t,e){const i=(AppState.appData.training||[]).map(r=>({id:r.id,name:r.name||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646",date:r.startDate||r.date||""})).sort((r,s)=>(r.date||"").localeCompare(s.date||"")),n=r=>{const s=[];return r.targetType==="employees"?s.push("\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646"):r.targetType==="contractors"?s.push("\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646"):s.push("\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646"),Array.isArray(r.targetRoles)&&r.targetRoles.length&&s.push(`\u0627\u0644\u0648\u0638\u0627\u0626\u0641: ${r.targetRoles.map(l=>Utils.escapeHTML(l)).join(", ")}`),Array.isArray(r.targetContractors)&&r.targetContractors.length&&s.push(`\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646: ${r.targetContractors.map(l=>Utils.escapeHTML(l)).join(", ")}`),s.join(" \u2014 ")},o=["\u0645\u062E\u0637\u0637","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630","\u0645\u0643\u062A\u0645\u0644","\u0645\u0624\u062C\u0644"];return`
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
                        ${t.items.sort((r,s)=>(r.plannedDate||"").localeCompare(s.plannedDate||"")).map(r=>`
                            <tr>
                                <td>
                                    <div class="font-semibold text-gray-900">${Utils.escapeHTML(r.topic||"")}</div>
                                    ${r.requiredTopics&&r.requiredTopics.length?`
                                        <div class="text-xs text-blue-600 mt-1">\u0645\u0648\u0636\u0648\u0639\u0627\u062A: ${r.requiredTopics.map(s=>Utils.escapeHTML(s)).join(", ")}</div>
                                    `:""}
                                </td>
                                <td>${r.plannedDate?Utils.formatDate(r.plannedDate):"\u2014"}</td>
                                <td>${n(r)}</td>
                                <td>
                                    ${this.isCurrentUserAdmin()?`
                                        <select class="form-input plan-status-select" data-item-id="${r.id}">
                                            ${o.map(s=>`<option value="${Utils.escapeHTML(s)}" ${r.status===s?"selected":""}>${Utils.escapeHTML(s)}</option>`).join("")}
                                        </select>
                                    `:`
                                        <span class="badge ${r.status==="\u0645\u0643\u062A\u0645\u0644"?"badge-success":r.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"badge-info":r.status==="\u0645\u0624\u062C\u0644"?"badge-warning":"badge-secondary"}">${Utils.escapeHTML(r.status||"\u0645\u062E\u0637\u0637")}</span>
                                    `}
                                </td>
                                <td>
                                    ${this.isCurrentUserAdmin()?`
                                        <select class="form-input plan-training-link" data-item-id="${r.id}">
                                            <option value="">\u2014</option>
                                            ${i.map(s=>`
                                                <option value="${Utils.escapeHTML(s.id)}" ${s.id===r.linkedTrainingId?"selected":""}>
                                                    ${Utils.escapeHTML(s.name)} (${s.date?Utils.formatDate(s.date):"\u0628\u062F\u0648\u0646 \u062A\u0627\u0631\u064A\u062E"})
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
        `},openAnnualPlanItemForm(t,e=null,a=null){const n=this.getAnnualPlan(t,{createIfMissing:!0}).items.find(d=>d.id===e)||null,o=this.getUniquePositions(),r=(AppState.appData.contractors||[]).filter(d=>d&&d.isActive!=="inactive"&&d.isActive!==!1&&d.isActive!=="false"&&d.isActive!=="FALSE").map(d=>d.name||d.company).filter(Boolean),s=this.getAllTrainingTopics(),l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
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
                                    ${o.map(d=>`
                                        <option value="${Utils.escapeHTML(d)}" ${n?.targetRoles?.includes(d)?"selected":""}>${Utils.escapeHTML(d)}</option>
                                    `).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0648\u0646</label>
                                <select id="plan-item-contractors" class="form-input" multiple size="5">
                                    ${r.map(d=>`
                                        <option value="${Utils.escapeHTML(d)}" ${n?.targetContractors?.includes(d)?"selected":""}>${Utils.escapeHTML(d)}</option>
                                    `).join("")}
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                            <select id="plan-item-topics" class="form-input" multiple size="5">
                                ${s.map(d=>`
                                    <option value="${Utils.escapeHTML(d)}" ${n?.requiredTopics?.includes(d)?"selected":""}>${Utils.escapeHTML(d)}</option>
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
        `,document.body.appendChild(l);const c=()=>l.remove();l.querySelector(".modal-close")?.addEventListener("click",c),l.querySelector('[data-action="close"]')?.addEventListener("click",c),l.addEventListener("click",d=>{d.target===l&&c()}),l.querySelector("#annual-plan-item-form")?.addEventListener("submit",d=>{d.preventDefault();const p=l.querySelector("#plan-item-topic")?.value.trim(),g=l.querySelector("#plan-item-date")?.value,f=l.querySelector("#plan-item-target-type")?.value||"employees",u=l.querySelector("#plan-item-status")?.value||"\u0645\u062E\u0637\u0637",m=this.getSelectedOptionsFromElement(l.querySelector("#plan-item-roles")),y=this.getSelectedOptionsFromElement(l.querySelector("#plan-item-contractors")),x=this.getSelectedOptionsFromElement(l.querySelector("#plan-item-topics")),b=l.querySelector("#plan-item-notes")?.value.trim();if(!p||!g){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637");return}const S={id:n?.id||Utils.generateId("PLANITEM"),topic:p,plannedDate:new Date(g).toISOString(),targetType:f,status:u,targetRoles:m,targetContractors:y,requiredTopics:x,notes:b,linkedTrainingId:n?.linkedTrainingId||"",createdAt:n?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};this.upsertAnnualPlanItem(t,S),Notification.success(n?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0646\u0635\u0631 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0639\u0646\u0635\u0631 \u0625\u0644\u0649 \u0627\u0644\u062E\u0637\u0629"),c(),typeof a=="function"&&a()})},isCurrentUserAdmin(){return typeof Permissions?.isCurrentUserAdmin=="function"?Permissions.isCurrentUserAdmin():(AppState.currentUser?.role||"").toLowerCase()==="admin"},isCurrentUserAdminOrManager(){if(this.isCurrentUserAdmin())return!0;const t=(AppState.currentUser?.role||"").toString().trim().toLowerCase();return["admin","system_admin","manager","\u0645\u062F\u064A\u0631","\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645","system-manager","safety_officer"].some(e=>t.includes(e))},canViewLegalTrainingTab(){return this.isCurrentUserAdmin()?!0:typeof Permissions<"u"&&typeof Permissions.hasDetailedPermission=="function"?Permissions.hasDetailedPermission("training","legal-training"):!1},getAnnualPlan(t,{createIfMissing:e=!1}={}){this.ensureData(),Array.isArray(AppState.appData.annualTrainingPlans)||(AppState.appData.annualTrainingPlans=[]);let a=AppState.appData.annualTrainingPlans.find(i=>i.year===t);return!a&&e&&this.isCurrentUserAdmin()&&(a=this.createAnnualPlan(t)),a||null},createAnnualPlan(t){const e={id:`PLAN-${t}`,year:t,createdBy:{id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||AppState.currentUser?.displayName||AppState.currentUser?.email||"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0646\u0638\u0627\u0645",email:AppState.currentUser?.email||""},createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),items:[]};return AppState.appData.annualTrainingPlans.push(e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0644\u0644\u0633\u0646\u0629 ${t}`),e},upsertAnnualPlanItem(t,e){const a=this.getAnnualPlan(t,{createIfMissing:!0}),i=a.items.findIndex(n=>n.id===e.id);i>=0?a.items[i]=e:a.items.push(e),a.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},getAnnualPlanStats(t){return{total:t.items.length,completed:t.items.filter(e=>e.status==="\u0645\u0643\u062A\u0645\u0644").length,inProgress:t.items.filter(e=>e.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630").length,delayed:t.items.filter(e=>e.status==="\u0645\u0624\u062C\u0644").length}},updateAnnualPlanItemStatus(t,e,a){const i=this.getAnnualPlan(t,{createIfMissing:!1});if(!i)return;const n=i.items.find(o=>o.id===e);n&&(n.status=a,n.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0639\u0646\u0635\u0631"))},linkTrainingToPlanItem(t,e,a){const i=this.getAnnualPlan(t,{createIfMissing:!1});if(!i)return;const n=i.items.find(o=>o.id===e);n&&(n.linkedTrainingId=a||"",a&&(n.status="\u0645\u0643\u062A\u0645\u0644"),n.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u0631\u0628\u0637 \u0627\u0644\u0639\u0646\u0635\u0631 \u0628\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"))},removeAnnualPlanItem(t,e){const a=this.getAnnualPlan(t,{createIfMissing:!1});a&&(a.items=a.items.filter(i=>i.id!==e),a.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0639\u0646\u0635\u0631 \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629"))},openQuickTrainingRegistration(t){this.ensureData();const a=(AppState.appData.employees||[]).find(s=>(s.employeeNumber||s.sapId)===t);if(!a){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u062D\u062F\u062F");return}const i=this.getRequiredTopicsForPosition(a.position),n=Array.from(new Set([...i.map(s=>typeof s=="string"?s:s.topic),...this.getAllTrainingTopics()||[]].filter(Boolean))),o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
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
                                ${n.map(s=>`<option value="${Utils.escapeHTML(s)}">${Utils.escapeHTML(s)}</option>`).join("")}
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
        `,document.body.appendChild(o);const r=()=>o.remove();o.querySelector(".modal-close")?.addEventListener("click",r),o.querySelector('[data-action="close"]')?.addEventListener("click",r),o.addEventListener("click",s=>{s.target===o&&r()}),o.querySelector("#quick-training-form")?.addEventListener("submit",async s=>{s.preventDefault();try{const l=o.querySelector("#quick-training-subject")?.value.trim(),c=o.querySelector("#quick-training-trainer")?.value.trim(),d=o.querySelector("#quick-training-type")?.value||"\u062F\u0627\u062E\u0644\u064A",p=o.querySelector("#quick-training-date")?.value,g=o.querySelector("#quick-training-location")?.value.trim(),f=o.querySelector("#quick-training-status")?.value||"\u0645\u0643\u062A\u0645\u0644",u=o.querySelector("#quick-training-start-time")?.value,m=o.querySelector("#quick-training-end-time")?.value,y=parseFloat(o.querySelector("#quick-training-hours")?.value||"0"),x=this.getSelectedOptionsFromElement(o.querySelector("#quick-training-topics"));if(!l||!c||!p){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0644\u062A\u062F\u0631\u064A\u0628");return}let b=y;if((!b||b<=0)&&u&&m){const $=new Date(`2000-01-01T${u}:00`),A=new Date(`2000-01-01T${m}:00`)-$;A>0&&(b=A/36e5)}const S=Utils.generateId("TRAINING");let I=new Date().toISOString();if(p){const $=p.split("-");if($.length===3){const w=parseInt($[0],10),A=parseInt($[1],10)-1,D=parseInt($[2],10),F=new Date(w,A,D,12,0,0);isNaN(F.getTime())||(I=F.toISOString())}else{const w=new Date(p);isNaN(w.getTime())||(I=w.toISOString())}}const h={name:a.name||"",code:a.employeeNumber||a.sapId||"",employeeNumber:a.employeeNumber||a.sapId||"",employeeCode:a.employeeNumber||a.employeeCode||"",department:a.department||"",position:a.position||"",workLocation:a.location||a.workLocation||"",type:"employee",personType:"employee",topics:x},k={id:S,name:l,trainer:c,trainingType:d,location:g||"",date:I,startDate:I,startTime:u||"",endTime:m||"",status:f,hours:b>0?b.toFixed(2):"",participants:[h],participantsCount:1,topics:x,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};if(AppState.appData.training.push(k),this.syncEmployeeTrainingMatrix(k),x.length){const $=new Date(p).getFullYear(),w=this.getAnnualPlan($,{createIfMissing:!1});if(w){const A=new Date().toISOString();x.forEach(D=>{const F=w.items.find(E=>E.linkedTrainingId||!(E.topic===D||Array.isArray(E.requiredTopics)&&E.requiredTopics.includes(D))?!1:Array.isArray(E.targetRoles)&&E.targetRoles.length?E.targetRoles.includes(a.position):E.targetType!=="contractors");F&&(F.linkedTrainingId=S,F.status="\u0645\u0643\u062A\u0645\u0644",F.updatedAt=A)})}}if(typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled)try{if(await GoogleIntegration.sendRequest({action:"addTraining",data:k}),h&&h.employeeCode){const $=AppState.appData.employeeTrainingMatrix[h.employeeCode];$&&$.length>0&&await GoogleIntegration.sendRequest({action:"updateEmployeeTrainingMatrix",data:{employeeId:h.employeeCode,updateData:{[h.employeeCode]:$}}})}}catch($){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B:",$),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await Promise.allSettled([GoogleIntegration.autoSave?.("Training",AppState.appData.training),GoogleIntegration.autoSave?.("EmployeeTrainingMatrix",AppState.appData.employeeTrainingMatrix)]).catch(()=>{})}else typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await Promise.allSettled([GoogleIntegration.autoSave?.("Training",AppState.appData.training),GoogleIntegration.autoSave?.("EmployeeTrainingMatrix",AppState.appData.employeeTrainingMatrix)]);await this.refreshTrainingMatrix(),this.loadTrainingList(),Notification.success("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0628\u0646\u062C\u0627\u062D"),r()}catch(l){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0633\u0631\u064A\u0639:",l),Notification.error("\u062A\u0639\u0630\u0631 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628: "+l.message)}})},async exportTrainingMatrix(){this.ensureData();try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");return}const t=AppState.appData.employees||[],e=AppState.appData.employeeTrainingMatrix||{},a=t.map(s=>{const l=s.employeeNumber||s.sapId||"",c=e[l]||[],d=c.reduce((f,u)=>f+(parseFloat(u.hours)||0),0),p=c.filter(f=>f.trainingType==="\u062F\u0627\u062E\u0644\u064A").length,g=c.filter(f=>f.trainingType==="\u062E\u0627\u0631\u062C\u064A").length;return{"\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A":l,"\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641":s.name||"",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:s.position||"","\u0627\u0644\u0642\u0633\u0645/\u0627\u0644\u0625\u062F\u0627\u0631\u0629":s.department||"","\u0639\u062F\u062F \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628":c.length,"\u062A\u062F\u0631\u064A\u0628 \u062F\u0627\u062E\u0644\u064A":p,"\u062A\u062F\u0631\u064A\u0628 \u062E\u0627\u0631\u062C\u064A":g,"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":d.toFixed(2)}}),i=XLSX.utils.book_new(),n=XLSX.utils.json_to_sheet(a);n["!cols"]=[{wch:15},{wch:25},{wch:20},{wch:20},{wch:18},{wch:15},{wch:15},{wch:20}],XLSX.utils.book_append_sheet(i,n,"\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628");const r=`\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(i,r),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628: "+t.message)}},filterItems(t=null,e=null){this.ensureData();const a=document.getElementById("training-search"),i=document.getElementById("training-filter-status"),n=document.getElementById("training-filter-month"),o=document.getElementById("training-filter-factory"),r=document.getElementById("training-filter-type"),s=(typeof t=="string"?t:a?.value||"").trim().toLowerCase(),l=typeof e=="string"?e:i?.value||"",c=n?.value||"",d=o?.value||"",p=r?.value||"",g=AppState.appData.training||[],f=g.filter(y=>{if(s){const x=y.name&&y.name.toLowerCase().includes(s),b=y.trainer&&y.trainer.toLowerCase().includes(s),S=y.factoryName&&y.factoryName.toLowerCase().includes(s)||y.factory&&String(y.factory).toLowerCase().includes(s),I=y.locationName&&y.locationName.toLowerCase().includes(s)||y.location&&String(y.location).toLowerCase().includes(s),h=Array.isArray(y.participants)&&y.participants.some(k=>k.name&&k.name.toLowerCase().includes(s)||k.code&&String(k.code).toLowerCase().includes(s)||k.employeeNumber&&String(k.employeeNumber).toLowerCase().includes(s)||k.department&&k.department.toLowerCase().includes(s)||k.position&&k.position.toLowerCase().includes(s));if(!x&&!b&&!S&&!I&&!h)return!1}return!(l&&y.status!==l||c&&!(y.startDate||y.date||"").startsWith(c)||d&&String(y.factory||y.factoryName||"")!==d&&y.factoryName!==d||p&&(y.trainingType||"\u062F\u0627\u062E\u0644\u064A")!==p)}),u=document.getElementById("training-filtered-count-badge");u&&(u.textContent=`${f.length} \u0645\u0646 ${g.length} \u0628\u0631\u0627\u0645\u062C`);const m=document.querySelector("#training-table-container tbody");if(m){if(f.length===0){m.innerHTML=`
                <tr>
                    <td colspan="7" style="text-align: center; color: #94a3b8; padding: 2.5rem 1rem;">
                        <i class="fas fa-filter-circle-xmark" style="font-size: 32px; color: #cbd5e1; display: block; margin-bottom: 8px;"></i>
                        \u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0631\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0628\u062D\u062B \u0648\u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629
                    </td>
                </tr>
            `;return}m.innerHTML=f.map(y=>this._buildTrainingTableRowHtml(y)).join("")}},resetFilters(){const t=document.getElementById("training-search"),e=document.getElementById("training-filter-status"),a=document.getElementById("training-filter-month"),i=document.getElementById("training-filter-factory"),n=document.getElementById("training-filter-type");t&&(t.value=""),e&&(e.value=""),a&&(a.value=""),i&&(i.value=""),n&&(n.value=""),this.filterItems()},async exportToExcel(){this.ensureData();try{if(Loading.show(),typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u062D\u0629");return}const e=(AppState.appData.training||[]).map(r=>{const l=this.getParticipantsArray(r).map(c=>`${c.name||c.contractorName||""} (${c.code||c.employeeNumber||c.employeeCode||""})`).filter(Boolean).join("; ")||"";return{"\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C":r.name||"",\u0627\u0644\u0645\u062F\u0631\u0628:r.trainer||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621":r.startDate?Utils.formatDate(r.startDate):"","\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646":this.getParticipantsCount(r),"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646":l,\u0627\u0644\u062D\u0627\u0644\u0629:r.status||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":r.createdAt?Utils.formatDate(r.createdAt):""}}),a=XLSX.utils.book_new(),i=XLSX.utils.json_to_sheet(e);i["!cols"]=[{wch:30},{wch:20},{wch:15},{wch:15},{wch:50},{wch:15},{wch:15}],XLSX.utils.book_append_sheet(a,i,"\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A");const o=`\u0633\u062C\u0644_\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,o),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u064A \u062A\u0635\u062F\u064A\u0631 Excel:",t),Notification.error("\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+t.message)}},showTrainingReportDialog(){this.ensureData();const t=document.createElement("div");t.className="modal-overlay";const e=((typeof EmployeeHelper<"u"?EmployeeHelper.getEmployees():AppState.appData.employees)||[]).sort((s,l)=>(s.name||"").localeCompare(l.name||"")),a=(AppState.appData.contractors||[]).filter(s=>s&&s.isActive!=="inactive"&&s.isActive!==!1&&s.isActive!=="false"&&s.isActive!=="FALSE").sort((s,l)=>(s.name||"").localeCompare(l.name||"")),i=this.getAllTrainingTopics(),n=(s,l,c)=>s.map(d=>`<option value="${Utils.escapeHTML(l(d))}">${Utils.escapeHTML(c(d))}</option>`).join("");t.innerHTML=`
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
                                ${n(e,s=>s.employeeNumber||s.sapId||"",s=>`${s.name||"\u0628\u062F\u0648\u0646 \u0627\u0633\u0645"}${s.employeeNumber?" - "+s.employeeNumber:""}`)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-people-arrows ml-2"></i>
                                \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646 / \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629
                                <span class="text-xs text-gray-500 block">\u0627\u062E\u062A\u064A\u0627\u0631\u064A</span>
                            </label>
                            <select id="training-report-contractors" class="form-input" multiple size="6">
                                ${n(a,s=>s.id||s.code||s.name||"",s=>s.name||s.company||"\u2014")}
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
                            ${i.map(s=>`<option value="${Utils.escapeHTML(s)}">${Utils.escapeHTML(s)}</option>`).join("")}
                        </select>
                    </div>
                    
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                        <i class="fas fa-info-circle ml-2"></i>
                        \u0641\u064A \u062D\u0627\u0644 \u062A\u0631\u0643 \u0623\u064A \u062D\u0642\u0644 \u0641\u0627\u0631\u063A\u060C \u0633\u064A\u062A\u0645 \u062A\u0636\u0645\u064A\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0647 \u0641\u064A \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646\u060C \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A\u060C \u2026\u0625\u0644\u062E).
                    </div>
                </div>
                <div class="modal-footer" style="display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap;">
                    <button type="button" class="btn-secondary" data-action="close">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" class="btn-secondary" id="export-training-report-excel-btn" style="display: inline-flex; align-items: center; gap: 6px;">
                        <i class="fas fa-file-excel text-green-600"></i>
                        \u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                    <button type="button" class="btn-secondary" id="preview-training-report-btn" style="display: inline-flex; align-items: center; gap: 6px;">
                        <i class="fas fa-print"></i>
                        \u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0637\u0628\u0627\u0639\u0629
                    </button>
                    <button type="button" class="btn-primary" id="generate-training-report-btn" style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #059669 0%, #047857 100%);">
                        <i class="fas fa-file-arrow-down"></i>
                        \u062A\u062D\u0645\u064A\u0644 \u0645\u0628\u0627\u0634\u0631 (PDF)
                    </button>
                </div>
            </div>
        `,document.body.appendChild(t);const o=()=>t.remove();t.querySelector(".modal-close")?.addEventListener("click",o),t.querySelector('[data-action="close"]')?.addEventListener("click",o),t.addEventListener("click",s=>{s.target===t&&o()});const r=()=>({startDate:t.querySelector("#training-report-start-date")?.value||"",endDate:t.querySelector("#training-report-end-date")?.value||"",employees:this.getSelectedOptions("training-report-employees"),contractors:this.getSelectedOptions("training-report-contractors"),topics:this.getSelectedOptions("training-report-topics")});t.querySelector("#generate-training-report-btn")?.addEventListener("click",async()=>{const s=r();if(s.startDate&&s.endDate&&s.startDate>s.endDate){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}o(),await this.generateTrainingPDFReport(s,"download")}),t.querySelector("#preview-training-report-btn")?.addEventListener("click",async()=>{const s=r();if(s.startDate&&s.endDate&&s.startDate>s.endDate){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629");return}o(),await this.generateTrainingPDFReport(s,"print")}),t.querySelector("#export-training-report-excel-btn")?.addEventListener("click",async()=>{o(),await this.exportToExcel()})},getSelectedOptions(t){const e=document.getElementById(t);return e?Array.from(e.selectedOptions||[]).map(a=>a.value).filter(Boolean):[]},getAllTrainingTopics(){this.ensureData();const t=new Set;(AppState.appData.training||[]).forEach(i=>{Array.isArray(i.topics)&&i.topics.forEach(n=>n&&t.add(n)),i.name&&t.add(i.name),i.subject&&t.add(i.subject)});const a=AppState.appData.trainingTopicsByRole||{};return Object.values(a).forEach(i=>{(i||[]).forEach(n=>n.topic&&t.add(n.topic))}),Array.from(t).sort((i,n)=>i.localeCompare(n))},async generateTrainingPDFReport(t={},e="download"){this.ensureData();try{Loading.show(e==="download"?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0628\u0627\u0634\u0631...":"\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0645\u0639\u0627\u064A\u0646\u0629...");const a=AppState.appData.training||[],i=this.filterTrainingsForReport(a,t),n=i.length,o=i.reduce((b,S)=>b+this.getParticipantsCount(S),0),r=i.reduce((b,S)=>b+(parseFloat(S.hours)||this.calculateTrainingHours(this.cleanTime(S.startTime),this.cleanTime(S.endTime))||0),0),s=new Set;i.forEach(b=>{(Array.isArray(b.participants)?b.participants:[]).forEach(I=>{I?.code?s.add(I.code):I?.name&&s.add(`${I.name}-${I.company||""}`)})});const l=this.renderTrainingReportFiltersSummary(t),c=i.map((b,S)=>this.renderTrainingReportRow(b,S+1)).join(""),d=i.map(b=>this.renderTrainingReportParticipantsBlock(b)).join(""),p="DOC-HSE-TRN-REP-01",g="\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629",u=this.getIsoPrintHeaderHtml(g,"Comprehensive Training Programs & Participation Dossier",p,"Rev. 03","\u062F\u0627\u062E\u0644\u064A \u0648\u0645\u0639\u062A\u0645\u062F"),m=this.getIsoPrintFooterHtml(p,"Rev. 03","ISO 45001:2018 (Clause 7.2 Competence & 7.3 Awareness)"),y=`
                ${u}
                
                <div class="handover-info-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 14px;">
                    <div class="info-card">
                        <div class="card-label">\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629:</div>
                        <div class="card-value" style="color: #1e3a8a; font-size: 14px;">${n}</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646:</div>
                        <div class="card-value" style="color: #047857; font-size: 14px;">${o}</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u0648\u0646 \u0627\u0644\u0645\u0645\u064A\u0632\u0648\u0646:</div>
                        <div class="card-value" style="color: #b45309; font-size: 14px;">${s.size}</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628:</div>
                        <div class="card-value" style="color: #1e3a8a; font-size: 14px;">${r.toFixed(1)} \u0633</div>
                    </div>
                </div>

                <div style="margin-bottom: 12px;">
                    ${l}
                </div>

                <div style="margin-top: 14px; margin-bottom: 6px;">
                    <h3 style="margin: 0; font-size: 13px; font-weight: 900; color: #1e3a8a;">
                        <i class="fas fa-list-check" style="margin-left: 6px;"></i> \u062C\u062F\u0648\u0644 \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0648\u0633\u062C\u0644 \u0627\u0644\u0627\u0646\u0639\u0642\u0627\u062F
                    </h3>
                </div>

                <table class="iso-table">
                    <thead>
                        <tr>
                            <th style="width: 35px;">#</th>
                            <th>\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A</th>
                            <th style="width: 85px;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                            <th>\u0627\u0644\u0645\u062D\u0627\u0636\u0631</th>
                            <th style="width: 65px;">\u0627\u0644\u0646\u0648\u0639</th>
                            <th>\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0642\u0627\u0639\u0629</th>
                            <th style="width: 70px;">\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646</th>
                            <th style="width: 75px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${c||'<tr><td colspan="8" style="padding: 16px; text-align: center; color: #64748b;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0631\u0627\u0645\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</td></tr>'}
                    </tbody>
                </table>

                ${d}

                <div class="signatures-grid">
                    <div class="sig-card">
                        <div class="sig-card-title">\u0625\u0639\u062F\u0627\u062F \u0648\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A</div>
                        <div class="sig-card-name">\u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0643\u0641\u0627\u0621\u0627\u062A</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                    </div>
                    <div class="sig-card">
                        <div class="sig-card-title">\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u062A\u062D\u0642\u0642</div>
                        <div class="sig-card-name">\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                    </div>
                    <div class="sig-card">
                        <div class="sig-card-title">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0646\u0647\u0627\u0626\u064A</div>
                        <div class="sig-card-name">\u0645\u062F\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                        <div class="sig-line-area">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u062E\u062A\u0645 \u0627\u0644\u0631\u0633\u0645\u064A</div>
                    </div>
                </div>

                ${m}
            `,x=`\u062A\u0642\u0631\u064A\u0631_\u0627\u0644\u062A\u062F\u0631\u064A\u0628_\u0627\u0644\u0645\u0639\u062A\u0645\u062F_${new Date().toISOString().slice(0,10)}.pdf`;if(e==="download"){const b=await this.downloadIsoReportAsPdf(g,y,x,!1);if(Loading.hide(),b)return!0}return Loading.hide(),this.openIsoPrintWindow(g,y,!1,"",x)}catch(a){return Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",a),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628: "+a.message),!1}},filterTrainingsForReport(t,e){const a=e.startDate?new Date(e.startDate+"T00:00:00"):null,i=e.endDate?new Date(e.endDate+"T23:59:59"):null,n=new Set(e.employees||[]),o=new Set(e.contractors||[]),r=new Set((e.topics||[]).map(s=>s.toLowerCase()));return t.filter(s=>{const l=s.startDate||s.date||s.createdAt,c=l?new Date(l):null;if(a&&c&&c<a||i&&c&&c>i)return!1;if(r.size){const p=new Set;if(Array.isArray(s.topics)&&s.topics.forEach(f=>f&&p.add(f.toLowerCase())),s.name&&p.add(s.name.toLowerCase()),s.subject&&p.add(s.subject.toLowerCase()),!Array.from(r).some(f=>p.has(f)))return!1}const d=Array.isArray(s.participants)?s.participants:[];return!(n.size&&!d.some(g=>[g.code,g.employeeNumber,g.employeeCode,g.sapId].filter(Boolean).some(u=>n.has(String(u))))||o.size&&!d.some(g=>(g.type||g.personType)==="contractor"?[g.company,g.contractorCompany,g.contractorName,g.contractorId,g.id].filter(Boolean).some(u=>o.has(String(u))):!1))})},renderTrainingReportFiltersSummary(t){const e=[];return(t.startDate||t.endDate)&&e.push(`<div>\u0627\u0644\u0641\u062A\u0631\u0629: ${t.startDate?Utils.formatDate(t.startDate):"\u2014"} \u0625\u0644\u0649 ${t.endDate?Utils.formatDate(t.endDate):"\u2014"}</div>`),(t.employees||[]).length&&e.push(`<div>\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u062D\u062F\u062F\u064A\u0646: ${(t.employees||[]).length}</div>`),(t.contractors||[]).length&&e.push(`<div>\u0639\u062F\u062F \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u062A\u0639\u0627\u0642\u062F\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629: ${(t.contractors||[]).length}</div>`),(t.topics||[]).length&&e.push(`<div>\u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A: ${(t.topics||[]).map(a=>Utils.escapeHTML(a)).join("\u060C ")}</div>`),e.length?`<div style="padding: 12px 16px; border-radius: 8px; background: #F9FAFB; border: 1px solid #E5E7EB; color: #374151; font-size: 14px;">
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
                `:"";const n=e.map(o=>{const r=o.type==="contractor"||o.personType==="contractor"?'<span style="color:#B45309;">\u0645\u0642\u0627\u0648\u0644</span>':'<span style="color:#1D4ED8;">\u0645\u0648\u0638\u0641</span>',s=o.company||o.contractorCompany||"",l=(o.topics||[]).map(p=>`<span style="display:inline-block; background:#DBEAFE; color:#1D4ED8; padding:2px 8px; border-radius:12px; font-size:11px; margin-left:4px;">${Utils.escapeHTML(p)}</span>`).join(""),c=o.name||o.contractorName||"\u2014",d=o.code||o.employeeNumber||o.employeeCode||"";return`
                <li style="margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px solid #E5E7EB;">
                    <strong>${Utils.escapeHTML(c)}</strong>
                    <span style="color:#6B7280;">${d?" \u2022 "+Utils.escapeHTML(d):""}</span>
                    <span style="margin-right: 8px;">${r}</span>
                    ${s?`<span style="margin-right: 8px; color:#0F766E;">${Utils.escapeHTML(s)}</span>`:""}
                    ${o.position?`<span style="margin-right: 8px; color:#2563EB;">${Utils.escapeHTML(o.position)}</span>`:""}
                    ${l}
                </li>
            `}).join("");return`
            <div style="page-break-inside: avoid; margin-bottom: 24px;">
                <h3 style="font-size: 18px; margin-bottom: 8px; color:#1E3A8A;">\u0643\u0634\u0641 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u2014 ${Utils.escapeHTML(a)}</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${n}
                </ul>
            </div>
        `},async viewTraining(t){this.ensureData();const e=AppState.appData.training.find(m=>m.id===t);if(!e){Notification.error("\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}let a=e.factoryName||"";if(!a&&e.factory){const y=this.getSiteOptions().find(x=>x.id===e.factory);a=y?y.name:e.factory}let i=e.locationName||"";!i&&e.location&&(i=this.getPlaceName(e.location,e.factory));const n=e.trainingType||"\u062F\u0627\u062E\u0644\u064A",o=n==="\u062E\u0627\u0631\u062C\u064A"?"\u062E\u0627\u0631\u062C\u064A":"\u062F\u0627\u062E\u0644\u064A",r=e.startTime!=null&&String(e.startTime).trim()!=="",s=e.endTime!=null&&String(e.endTime).trim()!=="",l=r?this.cleanTime(e.startTime)||String(e.startTime).trim():"-",c=s?this.cleanTime(e.endTime)||String(e.endTime).trim():"-",d=e.hours!=null&&String(e.hours).trim()!==""?e.hours:"-",p=e.status||"",g=p==="\u0645\u0643\u062A\u0645\u0644"?"success":/تنفي/.test(p)?"info":p==="\u0645\u0644\u063A\u064A"?"danger":"warning",f=p==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u064A\u0630"?"\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":p,u=document.createElement("div");u.className="modal-overlay",u.innerHTML=`
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
                            <span class="badge badge-${n==="\u062E\u0627\u0631\u062C\u064A"?"warning":"info"}">${Utils.escapeHTML(o)}</span>
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
                            <p class="text-gray-800 font-medium">${Utils.escapeHTML(c)}</p>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #FFF1F2; border-right: 4px solid #E11D48;">
                            <label class="text-sm font-semibold block mb-1" style="color: #BE123C;">\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646:</label>
                            <p class="text-gray-800">${this.getParticipantsCount(e)}</p>
                        </div>
                        <div class="p-3 rounded-lg" style="background: #FFF1F2; border-right: 4px solid #E11D48;">
                            <label class="text-sm font-semibold block mb-1" style="color: #BE123C;">\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628:</label>
                            <p class="text-gray-800">${Utils.escapeHTML(d)} ${d!=="-"?"\u0633\u0627\u0639\u0629":""}</p>
                        </div>
                    </div>
                    ${Array.isArray(e.participants)&&e.participants.length>0?(()=>{const m=e.participants,y=m.some(b=>b.company||b.contractorCompany),x=m.some(b=>b.type==="contractor"||b.personType==="contractor");return`
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
                                        ${m.map((b,S)=>{const I=b.type==="contractor"||b.personType==="contractor";return`
                                            <tr class="border-b border-gray-200 hover:bg-gray-100">
                                                <td class="p-2 text-center">${S+1}</td>
                                                <td class="p-2">${Utils.escapeHTML(b.name||b.contractorName||"")}</td>
                                                <td class="p-2">${Utils.escapeHTML(b.code||b.employeeNumber||b.employeeCode||"-")}</td>
                                                <td class="p-2">${Utils.escapeHTML(b.position||"-")}</td>
                                                <td class="p-2">${Utils.escapeHTML(b.department||"-")}</td>
                                                ${y?`<td class="p-2">${Utils.escapeHTML(b.company||b.contractorCompany||"-")}</td>`:""}
                                                ${x?`<td class="p-2"><span class="badge badge-${I?"warning":"info"}">${I?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0638\u0641"}</span></td>`:""}
                                            </tr>
                                        `}).join("")}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `})():""}
                </div>
                <div class="modal-footer" style="display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap;">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button type="button" class="btn-primary" onclick="Training.downloadTrainingPdf('${e.id}')" style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #059669 0%, #047857 100%);">
                        <i class="fas fa-file-arrow-down"></i>
                        \u062A\u062D\u0645\u064A\u0644 \u0643\u0634\u0641 \u0627\u0644\u062D\u0636\u0648\u0631 (PDF)
                    </button>
                    <button type="button" class="btn-secondary" onclick="Training.printTraining('${e.id}')" style="display: inline-flex; align-items: center; gap: 6px;">
                        <i class="fas fa-print"></i>
                        \u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0637\u0628\u0627\u0639\u0629
                    </button>
                    <button type="button" class="btn-secondary" onclick="Training.exportTraining('${e.id}')" style="display: inline-flex; align-items: center; gap: 6px;">
                        <i class="fas fa-file-excel text-green-600"></i>
                        \u062A\u0635\u062F\u064A\u0631 Excel
                    </button>
                    <button class="btn-primary" onclick="Training.editTraining('${e.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(u),u.addEventListener("click",m=>{m.target===u&&u.remove()})},closeFormModal(){const t=document.getElementById("training-form-modal-overlay");t&&t.remove(),document.body.style.overflow=""},setExpiryFromStart(t){const e=document.getElementById("training-startDateTime")||document.getElementById("training-startDate"),a=document.getElementById("training-expiryDate");if(!a)return;const i=e&&e.value?new Date(e.value):new Date;if(isNaN(i.getTime()))return;const n=new Date(i);n.setMonth(n.getMonth()+t),a.value=n.toISOString().slice(0,10)},getPreviousTrainingTopics(){const t=new Set;return Array.isArray(AppState.appData.training)&&AppState.appData.training.forEach(a=>{const i=String(a.name||a.subject||a.topic||"").trim();i&&t.add(i)}),Array.isArray(AppState.appData.trainingAttendance)&&AppState.appData.trainingAttendance.forEach(a=>{const i=String(a.topic||"").trim();i&&t.add(i)}),Array.isArray(AppState.appData.annualTrainingPlans)&&AppState.appData.annualTrainingPlans.forEach(a=>{Array.isArray(a.programs)&&a.programs.forEach(i=>{const n=String(i.title||i.name||i.topic||"").trim();n&&t.add(n)})}),["\u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 (PPE) \u0648\u0643\u064A\u0641\u064A\u0629 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647\u0627 \u0648\u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u064A\u0647\u0627","\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A \u0648\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0633\u0642\u0627\u0644\u0627\u062A \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062D\u0632\u0627\u0645 \u0627\u0644\u0623\u0645\u0627\u0646","\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0639\u0632\u0644 \u0648\u062A\u0623\u0645\u064A\u0646 \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u062E\u0637\u0631\u0629 (LOTO - Lockout/Tagout)","\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0645\u062E\u0627\u0637\u0631 \u0628\u064A\u0626\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0639\u0627\u0645\u0629","\u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0648\u0627\u0644\u062A\u0639\u0627\u0645\u0644 \u0641\u064A \u062D\u0627\u0644\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0648\u0627\u0644\u0637\u0648\u0627\u0631\u0626","\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629 \u0648\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u062D\u0648\u0644 \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u062D\u0631\u0643\u0629 \u0648\u0627\u0644\u0633\u064A\u0648\u0631","\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629 \u0648\u062A\u062C\u0646\u0628 \u0627\u0644\u0635\u0639\u0642 \u0648\u0641\u0635\u0644 \u0627\u0644\u062A\u064A\u0627\u0631 \u0639\u0646\u062F \u0627\u0644\u0639\u0645\u0644","\u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u062A\u0639\u0627\u0645\u0644 \u0627\u0644\u0622\u0645\u0646 \u0645\u0639 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0637\u0631\u0629 \u0648\u0646\u0634\u0631\u0627\u062A SDS","\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629 (Confined Spaces) \u0648\u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0647\u0627","\u0627\u0644\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0648\u0627\u0644\u0625\u0646\u0639\u0627\u0634 \u0627\u0644\u0642\u0644\u0628\u064A \u0627\u0644\u0631\u0626\u0648\u064A (CPR)","\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u0646\u0627\u0648\u0644\u0629 \u0627\u0644\u064A\u062F\u0648\u064A\u0629 \u0644\u0644\u0623\u062D\u0645\u0627\u0644 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0625\u0631\u062C\u0648\u0646\u0648\u0645\u064A\u0629 (Ergonomics)","\u0633\u0644\u0627\u0645\u0629 \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0631\u0641\u0639 \u0648\u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0623\u0648\u0646\u0627\u0634 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u0635\u0628\u064A\u0646","\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0622\u0645\u0646 (PTW - Permit to Work) \u0648\u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0646\u0641\u0630\u064A\u0646","\u0627\u0644\u0642\u064A\u0627\u062F\u0629 \u0627\u0644\u0622\u0645\u0646\u0629 \u0648\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0631\u0643\u0628\u0627\u062A \u0648\u062D\u0631\u0643\u0629 \u0627\u0644\u0631\u0627\u0641\u0639\u0627\u062A \u0627\u0644\u0634\u0648\u0643\u064A\u0629 (Forklifts)","\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0627\u0646\u0632\u0644\u0627\u0642 \u0648\u0627\u0644\u062A\u0639\u062B\u0631 \u0648\u0627\u0644\u0633\u0642\u0648\u0637 (Slips, Trips and Falls)","\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0645\u0646 \u0627\u0644\u062D\u0631\u0627\u0626\u0642 \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0623\u0646\u0648\u0627\u0639 \u0637\u0641\u0627\u064A\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \u0648\u062E\u0631\u0627\u0637\u064A\u0645 \u0627\u0644\u0625\u0637\u0641\u0627\u0621","\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0641\u062A\u064A\u0634 \u0627\u0644\u062F\u0648\u0631\u064A \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0642\u0628\u0644 \u0628\u062F\u0621 \u0648\u0631\u062F\u064A\u0629 \u0627\u0644\u0639\u0645\u0644"].forEach(a=>t.add(a)),Array.from(t).filter(Boolean)},toggleTopicSuggestions(t){const e=document.getElementById("training-name-suggestions-popup"),a=document.getElementById("training-name-chevron");if(!e)return;const i=e.style.display==="block";(typeof t=="boolean"?t:!i)?(e.style.display="block",a&&(a.style.transform="rotate(180deg)"),this.filterTopicSuggestions(document.getElementById("training-name")?.value||"")):(e.style.display="none",a&&(a.style.transform="rotate(0deg)"))},selectTopicOption(t){const e=document.getElementById("training-name");e&&(e.value=t,e.focus()),this.toggleTopicSuggestions(!1)},filterTopicSuggestions(t){const e=document.getElementById("training-topics-list-items"),a=document.getElementById("training-topics-count");if(!e)return;const i=String(t||"").trim().toLowerCase(),n=e.querySelectorAll(".training-topic-option");let o=0;n.forEach(r=>{const s=(r.getAttribute("data-topic-text")||r.textContent||"").toLowerCase();!i||s.includes(i)?(r.style.display="flex",o++):r.style.display="none"}),a&&(a.textContent=`${o} \u0645\u0648\u0636\u0648\u0639`)},toggleContractorTopicSuggestions(t){const e=document.getElementById("contractor-training-topic-suggestions-popup"),a=document.getElementById("contractor-topic-chevron");if(!e)return;const i=e.style.display==="block";(typeof t=="boolean"?t:!i)?(e.style.display="block",a&&(a.style.transform="rotate(180deg)"),this.filterContractorTopicSuggestions(document.getElementById("contractor-training-topic")?.value||"")):(e.style.display="none",a&&(a.style.transform="rotate(0deg)"))},selectContractorTopicOption(t){const e=document.getElementById("contractor-training-topic");e&&(e.value=t,e.focus()),this.toggleContractorTopicSuggestions(!1)},filterContractorTopicSuggestions(t){const e=document.getElementById("contractor-topics-list-items"),a=document.getElementById("contractor-topics-count");if(!e)return;const i=String(t||"").trim().toLowerCase(),n=e.querySelectorAll(".contractor-topic-option");let o=0;n.forEach(r=>{const s=(r.getAttribute("data-topic-text")||r.textContent||"").toLowerCase();!i||s.includes(i)?(r.style.display="flex",o++):r.style.display="none"}),a&&(a.textContent=`${o} \u0645\u0648\u0636\u0648\u0639`)},async showForm(t=null){if(this.ensureData(),typeof Permissions<"u"&&Permissions.ensureFormSettingsState)try{Permissions.ensureFormSettingsState().catch(()=>{})}catch{}this.currentEditId=t?.id||null,this.closeFormModal();const e=document.createElement("div");e.id="training-form-modal-overlay",e.className="modal-overlay training-form-modal-overlay",e.style.cssText=`
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
                <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; position: relative; color: #ffffff;">
                    <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
                        <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(255, 255, 255, 0.2); display: flex; align-items: center; justify-content: center; font-size: 16px;">
                            <i class="fas fa-${t?"edit":"user-check"}"></i>
                        </div>
                    </div>

                    <!-- Centered Title & Subtitle -->
                    <div style="flex: 1; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <h2 style="font-size: 19px; font-weight: 800; margin: 0; color: #ffffff; line-height: 1.3;">
                            ${t?"\u062A\u0639\u062F\u064A\u0644 \u062A\u062F\u0631\u064A\u0628 \u0645\u0648\u0638\u0641":"\u062A\u0633\u062C\u064A\u0644 \u062A\u062F\u0631\u064A\u0628 \u0645\u0648\u0638\u0641"}
                        </h2>
                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 4px;">
                            <span style="font-size: 11px; background: rgba(255,255,255,0.22); padding: 2px 10px; border-radius: 12px; font-weight: 700;">\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 - ICAPP</span>
                            ${t?.id?`<span style="font-size: 11px; background: rgba(255,255,255,0.15); padding: 2px 8px; border-radius: 12px; font-weight: 600;">#${t.id}</span>`:""}
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
        `,document.body.appendChild(e),document.body.style.overflow="hidden",e.addEventListener("click",r=>{r.target===e&&this.closeFormModal()});const a=e.querySelector("#training-form");a&&(a.onsubmit=r=>this.handleSubmit(r));const i=e.querySelector("#training-form-print-btn");i&&(i.onclick=()=>this.printAttendanceFormFromScreen());const n=e.querySelector("#training-form-download-pdf-btn");n&&(n.onclick=()=>this.downloadAttendanceFormFromScreen()),this.initializeFormInteractions();const o=Array.isArray(t?.participants)?t.participants:[];this.loadExistingParticipants(o)},async showList(){this.closeFormModal(),this.ensureData(),this.currentEditId=null;const t=document.getElementById("training-content");t&&(t.innerHTML=await this.renderList(),this.setupEventListeners(),this.loadTrainingList())},async renderForm(t=null){const e=this.getSafetyTeamMembers({excludeSystemUsers:!0}),a=String(t?.trainer||"").trim(),i=e.some(c=>c.name===a),n=a&&!i?`<option value="${Utils.escapeHTML(a)}" selected>${Utils.escapeHTML(a)}</option>`:"",o=this.getPreviousTrainingTopics(),r="width: 100%; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 9px 12px; font-size: 13px; font-weight: 600; color: #1e293b; background: #ffffff; box-shadow: 0 1px 2px rgba(0,0,0,0.03); outline: none; transition: border-color 0.2s, box-shadow 0.2s;";let s="";if(t?.startDateTime)s=t.startDateTime.slice(0,16);else if(t?.startDate)try{const c=new Date(t.startDate).toISOString().slice(0,10),d=t.startTime?this.cleanTime(t.startTime):"09:00";s=`${c}T${d}`}catch{}else t||(s=`${new Date().toISOString().slice(0,10)}T09:00`);let l="";if(t?.endDateTime)l=t.endDateTime.slice(0,16);else if(t?.startDate||t?.endDate)try{const c=new Date(t.endDate||t.startDate).toISOString().slice(0,10),d=t.endTime?this.cleanTime(t.endTime):"10:00";l=`${c}T${d}`}catch{}else t||(l=`${new Date().toISOString().slice(0,10)}T10:00`);return`
            <form id="training-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
                <!-- 1. \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 -->
                <div style="background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%); border: 1.5px solid #bfdbfe; border-radius: 16px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #dbeafe; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 10px rgba(37,99,235,0.25);">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div>
                                <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0;">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A</h3>
                                <p style="font-size: 12px; color: #1e40af; margin: 0; font-weight: 600;">\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0623\u0633\u0627\u0633\u064A \u0644\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0645\u0648\u0642\u0639</p>
                            </div>
                        </div>
                        <span style="font-size: 11px; font-weight: 700; background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; border-radius: 9999px; padding: 4px 12px; display: inline-flex; align-items: center; gap: 6px;">
                            <i class="fas fa-shield-alt" style="color: #2563eb;"></i> \u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629
                        </span>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
                        <!-- \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629 \u0645\u0639 \u0642\u0627\u0626\u0645\u0629 \u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0648\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0633\u0627\u0628\u0642\u0629 -->
                        <div style="grid-column: span 2; position: relative;" id="training-name-wrapper">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.35rem;">
                                <label style="font-size: 12px; font-weight: 700; color: #334155; margin: 0; display: inline-flex; align-items: center; gap: 5px;">
                                    <i class="fas fa-book-bookmark" style="color: #2563eb;"></i> \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629 / \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A *
                                </label>
                                <button type="button" onclick="Training.toggleTopicSuggestions()" style="font-size: 11px; font-weight: 700; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 8px; padding: 3px 10px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='#eff6ff'">
                                    <i class="fas fa-list-check"></i> \u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629 (${o.length})
                                </button>
                            </div>
                            <div style="position: relative; display: flex; align-items: center;">
                                <input type="text" id="training-name" required list="training-name-datalist" style="${r} padding-left: 36px;"
                                    value="${Utils.escapeHTML(t?.name||"")}" placeholder="\u0627\u0643\u062A\u0628 \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0623\u0648 \u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629..."
                                    autocomplete="off">
                                <button type="button" id="training-name-toggle-btn" onclick="Training.toggleTopicSuggestions()" style="position: absolute; left: 4px; top: 50%; transform: translateY(-50%); width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #2563eb; background: transparent; border: none; cursor: pointer;" title="\u0639\u0631\u0636 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629">
                                    <i class="fas fa-chevron-down" style="font-size: 11px; transition: transform 0.2s;" id="training-name-chevron"></i>
                                </button>
                            </div>

                            <!-- Datalist \u0644\u0645\u062A\u0635\u0641\u062D\u0627\u062A \u0627\u0644\u062C\u0648\u0627\u0644 \u0648\u0627\u0644\u0640 Native Autocomplete -->
                            <datalist id="training-name-datalist">
                                ${o.map(c=>`<option value="${Utils.escapeHTML(c)}">`).join("")}
                            </datalist>

                            <!-- \u0642\u0627\u0626\u0645\u0629 \u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0627\u0644\u0645\u0646\u0633\u062F\u0644\u0629 -->
                            <div id="training-name-suggestions-popup" style="position: absolute; right: 0; left: 0; margin-top: 6px; background: #ffffff; border: 2px solid #93c5fd; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); z-index: 50; overflow: hidden; max-height: 280px; display: none;">
                                <div style="padding: 8px 12px; background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%); border-bottom: 1px solid #bfdbfe; display: flex; align-items: center; justify-content: space-between;">
                                    <span style="font-size: 12px; font-weight: 700; color: #1e3a8a;"><i class="fas fa-history" style="color: #2563eb; margin-left: 4px;"></i> \u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0648\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0633\u0627\u0628\u0642\u0629 \u0645\u0639\u062A\u0645\u062F\u0629</span>
                                    <span style="font-size: 11px; font-weight: 800; color: #1d4ed8;" id="training-topics-count">${o.length} \u0645\u0648\u0636\u0648\u0639</span>
                                </div>
                                <div style="overflow-y: auto; max-height: 220px;" id="training-topics-list-items">
                                    ${o.map(c=>`
                                        <div class="training-topic-option" style="padding: 9px 12px; border-bottom: 1px solid #f1f5f9; font-size: 12px; font-weight: 600; color: #334155; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: background 0.15s;" data-topic-text="${Utils.escapeHTML(c)}" onclick="Training.selectTopicOption('${Utils.escapeHTML(c).replace(/'/g,"\\'")}')" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='#ffffff'">
                                            <div style="display: flex; align-items: center; gap: 8px;">
                                                <i class="fas fa-check-circle" style="color: #3b82f6; font-size: 12px; flex-shrink: 0;"></i>
                                                <span>${Utils.escapeHTML(c)}</span>
                                            </div>
                                            <span style="font-size: 11px; font-weight: 700; color: #2563eb;"><i class="fas fa-arrow-left"></i> \u0627\u062E\u062A\u064A\u0627\u0631</span>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
                        </div>

                        <!-- \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 -->
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 0.35rem;">
                                <i class="fas fa-tag" style="color: #2563eb; margin-left: 4px;"></i> \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 *
                            </label>
                            <select id="training-type" required style="${r}">
                                <option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</option>
                                <option value="\u062F\u0627\u062E\u0644\u064A" ${t?.trainingType==="\u062F\u0627\u062E\u0644\u064A"||!t?.trainingType&&!t?"selected":""}>\u062F\u0627\u062E\u0644\u064A (\u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0646\u0634\u0623\u0629)</option>
                                <option value="\u062E\u0627\u0631\u062C\u064A" ${t?.trainingType==="\u062E\u0627\u0631\u062C\u064A"?"selected":""}>\u062E\u0627\u0631\u062C\u064A (\u062C\u0647\u0629 \u0645\u0639\u062A\u0645\u062F\u0629)</option>
                            </select>
                        </div>

                        <!-- \u0627\u0644\u0645\u0635\u0646\u0639 -->
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 0.35rem;">
                                <i class="fas fa-industry" style="color: #2563eb; margin-left: 4px;"></i> \u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0646\u0634\u0623\u0629 *
                            </label>
                            <select id="training-factory" required style="${r}">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>
                                ${this.getSiteOptions().map(c=>`
                                    <option value="${Utils.escapeHTML(c.id)}" ${t?.factory===c.id||t?.factory===c.name?"selected":""}>${Utils.escapeHTML(c.name)}</option>
                                `).join("")}
                            </select>
                        </div>

                        <!-- \u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 -->
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 0.35rem;">
                                <i class="fas fa-map-pin" style="color: #2563eb; margin-left: 4px;"></i> \u0645\u0643\u0627\u0646 / \u0642\u0627\u0639\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 *
                            </label>
                            <select id="training-location" required style="${r}">
                                <option value="">\u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</option>
                                ${this.getPlaceOptions(t?.factory||"").map(c=>`
                                    <option value="${Utils.escapeHTML(c.id)}" ${t?.location===c.id||t?.location===c.name?"selected":""}>${Utils.escapeHTML(c.name)}</option>
                                `).join("")}
                            </select>
                        </div>

                        <!-- \u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631 -->
                        <div>
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 0.35rem;">
                                <i class="fas fa-chalkboard-user" style="color: #2563eb; margin-left: 4px;"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631 / \u0627\u0644\u0645\u062F\u0631\u0628 *
                            </label>
                            <select id="training-trainer" required style="${r}">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631</option>
                                ${n}
                                ${e.map(c=>`
                                    <option value="${Utils.escapeHTML(c.name)}" ${c.name===a?"selected":""}>
                                        ${Utils.escapeHTML(c.name)}
                                    </option>
                                `).join("")}
                            </select>
                        </div>
                    </div>
                </div>

                <!-- 2. \u0627\u0644\u062C\u062F\u0648\u0644\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629\u060C \u0627\u0644\u062A\u0648\u0642\u064A\u062A\u060C \u0648\u062D\u0633\u0627\u0628 \u0627\u0644\u0633\u0627\u0639\u0627\u062A -->
                <div style="background: linear-gradient(135deg, #faf5ff 0%, #eef2ff 100%); border: 1.5px solid #c7d2fe; border-radius: 16px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e0e7ff; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 10px rgba(99,102,241,0.25);">
                                <i class="fas fa-business-time"></i>
                            </div>
                            <div>
                                <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0;">\u0627\u0644\u062C\u062F\u0648\u0644\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u062A</h3>
                                <p style="font-size: 12px; color: #4338ca; margin: 0; font-weight: 600;">\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u062F\u0621 \u0648\u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u060C \u0627\u062D\u062A\u0633\u0627\u0628 \u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0648\u062D\u0627\u0644\u0629 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 12px; font-weight: 800; background: #ffffff; color: #3730a3; border: 1.5px solid #c7d2fe; border-radius: 9999px; padding: 5px 14px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);" id="training-calculated-hours-pill">
                                <i class="fas fa-hourglass-half" style="color: #6366f1;"></i> \u0645\u062F\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628: <strong id="training-hours-number" style="color: #4338ca; font-size: 14px;">${t?.hours||"0.00"}</strong> \u0633\u0627\u0639\u0629
                            </span>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
                        <!-- \u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u062F\u0621 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u0645\u0648\u062D\u062F \u0641\u064A \u062D\u0642\u0644 \u0648\u0627\u062D\u062F) -->
                        <div style="background: #ffffff; padding: 1rem; border-radius: 12px; border: 1px solid #e0e7ff; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 0.35rem;">
                                <i class="fas fa-calendar-plus" style="color: #4f46e5; margin-left: 4px;"></i> \u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u062F\u0621 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 *
                            </label>
                            <input type="datetime-local" id="training-startDateTime" required style="${r}"
                                value="${s}">
                            <p style="font-size: 11px; color: #64748b; margin: 4px 0 0 0; font-weight: 500;">\u062A\u0627\u0631\u064A\u062E \u0648\u0633\u0627\u0639\u0629 \u0627\u0646\u0637\u0644\u0627\u0642 \u0627\u0644\u062C\u0644\u0633\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629</p>
                        </div>

                        <!-- \u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 (\u0645\u0648\u062D\u062F \u0641\u064A \u062D\u0642\u0644 \u0648\u0627\u062D\u062F) -->
                        <div style="background: #ffffff; padding: 1rem; border-radius: 12px; border: 1px solid #e0e7ff; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 0.35rem;">
                                <i class="fas fa-calendar-check" style="color: #4f46e5; margin-left: 4px;"></i> \u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 *
                            </label>
                            <input type="datetime-local" id="training-endDateTime" required style="${r}"
                                value="${l}">
                            <p style="font-size: 11px; color: #64748b; margin: 4px 0 0 0; font-weight: 500;">\u062A\u0627\u0631\u064A\u062E \u0648\u0633\u0627\u0639\u0629 \u0627\u062E\u062A\u062A\u0627\u0645 \u0627\u0644\u062C\u0644\u0633\u0629 \u0644\u0627\u062D\u062A\u0633\u0627\u0628 \u0627\u0644\u0633\u0627\u0639\u0627\u062A</p>
                        </div>

                        <!-- \u062D\u0627\u0644\u0629 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C -->
                        <div style="background: #ffffff; padding: 1rem; border-radius: 12px; border: 1px solid #e0e7ff; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 0.35rem;">
                                <i class="fas fa-circle-check" style="color: #4f46e5; margin-left: 4px;"></i> \u062D\u0627\u0644\u0629 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C *
                            </label>
                            <select id="training-status" required style="${r}">
                                <option value="\u0645\u062E\u0637\u0637" ${t?.status==="\u0645\u062E\u0637\u0637"||!t?.status?"selected":""}>\u0645\u062E\u0637\u0637</option>
                                <option value="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630" ${t?.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>
                                <option value="\u0645\u0643\u062A\u0645\u0644" ${t?.status==="\u0645\u0643\u062A\u0645\u0644"?"selected":""}>\u0645\u0643\u062A\u0645\u0644</option>
                                <option value="\u0645\u0644\u063A\u064A" ${t?.status==="\u0645\u0644\u063A\u064A"?"selected":""}>\u0645\u0644\u063A\u064A</option>
                            </select>
                            <p style="font-size: 11px; color: #64748b; margin: 4px 0 0 0; font-weight: 500;">\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0644\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A</p>
                        </div>
                    </div>
                </div>
                
                <!-- 3. \u0643\u0634\u0641 \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646 \u0645\u0646 \u0643\u0648\u0627\u062F\u0631 \u0627\u0644\u0634\u0631\u0643\u0629) -->
                <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 1.5px solid #a7f3d0; border-radius: 16px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #d1fae5; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 10px rgba(16,185,129,0.25);">
                                <i class="fas fa-user-check"></i>
                            </div>
                            <div>
                                <h3 style="font-size: 15px; font-weight: 800; color: #064e3b; margin: 0;">\u0643\u0634\u0641 \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</h3>
                                <p style="font-size: 12px; color: #047857; margin: 0; font-weight: 600;">\u062A\u0633\u062C\u064A\u0644 \u062D\u0636\u0648\u0631 \u0643\u0648\u0627\u062F\u0631 \u0648\u0645\u0648\u0638\u0641\u064A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 11px; font-weight: 700; background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; border-radius: 9999px; padding: 4px 12px; display: inline-flex; align-items: center; gap: 6px;">
                                <i class="fas fa-id-badge" style="color: #16a34a;"></i> \u0645\u0648\u0638\u0641\u0648 \u0627\u0644\u0634\u0631\u0643\u0629 \u0641\u0642\u0637
                            </span>
                            <span style="font-size: 12px; font-weight: 700; background: #ffffff; color: #065f46; border: 1.5px solid #a7f3d0; border-radius: 9999px; padding: 4px 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" id="participants-count-display">
                                \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0636\u0648\u0631: <strong id="participants-count-number" style="color: #059669; font-size: 14px; margin-right: 4px;">0</strong>
                            </span>
                        </div>
                    </div>

                    <input type="hidden" id="training-participant-type" value="employee">

                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <!-- \u0635\u0641 \u0625\u062F\u062E\u0627\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; background: #ffffff; padding: 1rem; border-radius: 12px; border: 1px solid #d1fae5; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                            <div>
                                <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 0.35rem;">
                                    <i class="fas fa-barcode" style="color: #059669; margin-left: 4px;"></i> \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A (SAP / ID)
                                </label>
                                <div style="position: relative;">
                                    <input type="text" id="training-participant-code" style="${r} padding-left: 36px;" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0645\u0633\u062D" autocomplete="off">
                                    <button type="button" id="training-participant-search-btn" style="position: absolute; inset-block: 0; left: 0; width: 34px; display: flex; align-items: center; justify-content: center; color: #059669; background: transparent; border: none; cursor: pointer;" title="\u0628\u062D\u062B \u0641\u0648\u0631\u064A">
                                        <i class="fas fa-search" style="font-size: 13px;"></i>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 0.35rem;">
                                    <i class="fas fa-user" style="color: #059669; margin-left: 4px;"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 *
                                </label>
                                <input type="text" id="training-participant-name" style="${r}" placeholder="\u0627\u0644\u0627\u0633\u0645 \u062B\u0644\u0627\u062B\u064A \u0623\u0648 \u0631\u0628\u0627\u0639\u064A" autocomplete="off">
                            </div>
                            <div>
                                <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 0.35rem;">
                                    <i class="fas fa-briefcase" style="color: #059669; margin-left: 4px;"></i> \u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A
                                </label>
                                <input type="text" id="training-participant-position" style="${r}" placeholder="\u0627\u0644\u0648\u0638\u064A\u0641\u0629">
                            </div>
                            <div>
                                <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 0.35rem;">
                                    <i class="fas fa-building" style="color: #059669; margin-left: 4px;"></i> \u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645
                                </label>
                                <input type="text" id="training-participant-department" style="${r}" placeholder="\u0627\u0644\u0642\u0633\u0645 \u0623\u0648 \u0627\u0644\u0648\u062D\u062F\u0629">
                            </div>
                        </div>

                        <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u0631\u064A\u0639\u0629 \u0648\u0627\u0644\u062A\u0641\u0631\u064A\u063A -->
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <button type="button" id="add-participant-btn" style="padding: 0.6rem 1.4rem; font-size: 0.88rem; font-weight: 700; border-radius: 10px; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #ffffff; border: none; cursor: pointer; box-shadow: 0 3px 6px rgba(5, 150, 105, 0.3); display: inline-flex; align-items: center; gap: 6px;">
                                    <i class="fas fa-user-plus"></i> \u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0643\u0634\u0641
                                </button>
                                <button type="button" id="clear-participant-btn" style="padding: 0.6rem 1.1rem; font-size: 0.85rem; font-weight: 700; border-radius: 10px; background: #ffffff; color: #475569; border: 1.5px solid #cbd5e1; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                    <i class="fas fa-eraser"></i> \u0645\u0633\u062D \u0627\u0644\u062D\u0642\u0648\u0644
                                </button>
                            </div>
                            <span style="font-size: 11px; color: #047857; font-weight: 600;">
                                <i class="fas fa-info-circle" style="color: #059669; margin-left: 4px;"></i> \u064A\u062F\u0639\u0645 \u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0628\u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062F\u060C \u0648\u0627\u0644\u0628\u062D\u062B \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0628\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0643\u0648\u062F
                            </span>
                        </div>

                        <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 -->
                        <div style="overflow-x: auto; border-radius: 12px; border: 1.5px solid #a7f3d0; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.03); max-height: 280px;">
                            <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
                                <thead>
                                    <tr style="background: #f0fdf4; border-bottom: 2px solid #bbf7d0;">
                                        <th style="width: 45px; text-align: center; color: #166534; font-weight: 800; padding: 10px 8px;">\u0645</th>
                                        <th style="color: #166534; font-weight: 800; padding: 10px 12px; text-align: right;">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                                        <th style="color: #166534; font-weight: 800; padding: 10px 12px; text-align: right;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641</th>
                                        <th style="color: #166534; font-weight: 800; padding: 10px 12px; text-align: right;">\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                                        <th style="color: #166534; font-weight: 800; padding: 10px 12px; text-align: right;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629 / \u0627\u0644\u0642\u0633\u0645</th>
                                        <th style="width: 70px; text-align: center; color: #166534; font-weight: 800; padding: 10px 8px;">\u062D\u0630\u0641</th>
                                    </tr>
                                </thead>
                                <tbody id="training-participants-table-body">
                                    <tr class="participants-empty-row">
                                        <td colspan="6" style="text-align: center; color: #94a3b8; padding: 2rem 1rem;">
                                            <i class="fas fa-user-clock" style="font-size: 28px; color: #cbd5e1; display: block; margin-bottom: 6px;"></i>
                                            \u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u0648\u0646 \u0645\u0636\u0627\u0641\u0648\u0646 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646 \u2014 \u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0644\u0627\u0633\u0645 \u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <!-- 4. \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A -->
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding-top: 1rem; border-top: 1.5px solid #e2e8f0; flex-wrap: wrap;">
                    <button type="button" id="training-form-download-pdf-btn" onclick="Training.downloadAttendanceFormFromScreen()" style="padding: 0.75rem 1.4rem; font-weight: 700; font-size: 0.9rem; border-radius: 10px; border: 1.5px solid #059669; background: #ecfdf5; color: #047857; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                        <i class="fas fa-file-arrow-down"></i> \u062A\u062D\u0645\u064A\u0644 \u0643\u0634\u0641 \u0627\u0644\u062D\u0636\u0648\u0631 (PDF)
                    </button>
                    <button type="button" id="training-form-print-btn" onclick="Training.printAttendanceFormFromScreen()" style="padding: 0.75rem 1.4rem; font-weight: 700; font-size: 0.9rem; border-radius: 10px; border: 1.5px solid #6366f1; background: #ffffff; color: #4338ca; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                        <i class="fas fa-print"></i> \u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0637\u0628\u0627\u0639\u0629
                    </button>
                    <button type="button" onclick="Training.closeFormModal()" style="padding: 0.75rem 1.5rem; font-weight: 700; font-size: 0.9rem; border-radius: 10px; border: 1.5px solid #cbd5e1; background: #ffffff; color: #475569; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                        <i class="fas fa-times"></i> \u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="submit" style="padding: 0.75rem 2rem; font-weight: 800; font-size: 0.95rem; border-radius: 10px; background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35); border: none; color: #ffffff; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                        <i class="fas fa-save"></i> ${t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u062D\u0641\u0638 \u0648\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"}
                    </button>
                </div>
            </form>
        `},initializeFormInteractions(){const t=this,e=document.getElementById("training-participant-code"),a=document.getElementById("training-participant-name"),i=document.getElementById("training-participant-position"),n=document.getElementById("training-participant-department"),o=document.getElementById("training-participant-type"),r=document.getElementById("training-participant-company-container"),s=document.getElementById("training-participant-company"),l=document.getElementById("training-participant-code-hint"),c=document.getElementById("add-participant-btn"),d=document.getElementById("clear-participant-btn"),p=document.getElementById("training-participant-search-btn"),g=document.getElementById("training-factory"),f=document.getElementById("training-location");g&&f&&g.addEventListener("change",function(){const $=this.value,w=t.getPlaceOptions($);f.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628</option>',w.forEach(A=>{const D=document.createElement("option");D.value=A.id,D.textContent=A.name,f.appendChild(D)})});const u=document.getElementById("training-startDateTime"),m=document.getElementById("training-endDateTime"),y=document.getElementById("training-startTime"),x=document.getElementById("training-endTime"),b=document.getElementById("training-hours-number"),S=()=>{const $=u?.value||y?.value,w=m?.value||x?.value;if($&&w)try{const A=new Date($.includes("T")?$:`2000-01-01T${$}:00`),D=new Date(w.includes("T")?w:`2000-01-01T${w}:00`);if(D>A){const F=(D-A)/36e5;b&&(b.textContent=F.toFixed(2));return}}catch{}b&&(!$||!w)&&(b.textContent="0.00")};u&&(u.addEventListener("input",S),u.addEventListener("change",S)),m&&(m.addEventListener("input",S),m.addEventListener("change",S)),y&&(y.addEventListener("input",S),y.addEventListener("change",S)),x&&(x.addEventListener("input",S),x.addEventListener("change",S)),S(),S();const I=document.getElementById("training-name");I&&I.addEventListener("input",$=>{t.filterTopicSuggestions($.target.value);const w=document.getElementById("training-name-suggestions-popup");w&&w.style.display!=="block"&&t.toggleTopicSuggestions(!0)}),document.addEventListener("click",$=>{const w=document.getElementById("training-name-wrapper");if(w&&!w.contains($.target)){const A=document.getElementById("training-name-suggestions-popup");A&&A.style.display==="block"&&t.toggleTopicSuggestions(!1)}});const h=($=!1)=>{const A=(o?.value||"employee")==="employee";e&&(e.disabled=!1,e.readOnly=!1,e.placeholder=A?"\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0645\u0633\u062D \u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062F":"\u0631\u0642\u0645 / \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"),p&&(p.style.display=A?"flex":"none"),r&&(r.style.display=A?"none":"block"),s&&(s.required=!A,!A&&$&&s.focus()),l&&(l.textContent=A?"\u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A \u062D\u0627\u0644 \u0648\u062C\u0648\u062F\u0647 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.":"\u064A\u0645\u0643\u0646 \u0625\u062F\u062E\u0627\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646 \u0645\u0646 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0623\u0648 \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u064A\u062F\u0648\u064A\u0627\u064B.")};t.updateParticipantTypeUI=($=!1)=>h($),o&&o.addEventListener("change",()=>h(!0)),h(!1);const k=$=>{$&&(o&&o.value!=="employee"||t.handleParticipantEmployee($))};typeof EmployeeHelper<"u"&&(typeof EmployeeHelper.setupEmployeeCodeSearch=="function"&&EmployeeHelper.setupEmployeeCodeSearch("training-participant-code","training-participant-name",k),typeof EmployeeHelper.setupAutocomplete=="function"&&EmployeeHelper.setupAutocomplete("training-participant-name",k)),p&&p.addEventListener("click",()=>{const $=o?.value||"employee",w=e?.value.trim();if($!=="employee"){Notification.info("\u0627\u0644\u0628\u062D\u062B \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0641\u0642\u0637. \u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u064A\u062F\u0648\u064A\u0627\u064B.");return}w?t.lookupEmployeeByCode(w):Notification.info("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0644\u0644\u0628\u062D\u062B")}),c&&c.addEventListener("click",()=>t.addParticipantFromInputs()),d&&d.addEventListener("click",()=>t.clearParticipantInputs()),[e,a,i,n,s].forEach($=>{$&&$.addEventListener("keydown",w=>{w.key==="Enter"&&(w.preventDefault(),t.addParticipantFromInputs())})}),t.updateParticipantsCount()},loadExistingParticipants(t=[]){const e=document.getElementById("training-participants-table-body");if(e){if(!Array.isArray(t)||t.length===0){e.innerHTML=`
                <tr class="participants-empty-row">
                    <td colspan="6" class="text-center text-gray-400 py-6"><i class="fas fa-user-clock text-2xl mb-1 text-gray-300 block"></i>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u0648\u0646 \u0645\u0636\u0627\u0641\u0648\u0646 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646 \u2014 \u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0644\u0627\u0633\u0645 \u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</td>
                </tr>
            `,this.updateParticipantsCount();return}e.innerHTML="",t.forEach(a=>{const n=a.code||a.employeeCode||a.employeeNumber||""||this.generateParticipantCode(a.name||""),r=(AppState.appData.employees||[]).find(s=>(s.employeeNumber||s.sapId)===n);this.appendParticipantRow({code:n,name:a.name||r?.name||"",position:a.position||r?.position||"",department:a.department||r?.department||"",type:"employee",company:""},{updateCount:!1,silent:!0})}),this.updateParticipantsCount()}},getParticipantInputValues(){const t=document.getElementById("training-participant-code"),e=document.getElementById("training-participant-name"),a=document.getElementById("training-participant-position"),i=document.getElementById("training-participant-department"),n=document.getElementById("training-participant-type"),o=document.getElementById("training-participant-company");return{code:t?.value.trim()||"",name:e?.value.trim()||"",position:a?.value.trim()||"",department:i?.value.trim()||"",type:n?.value==="contractor"?"contractor":"employee",company:o?.value.trim()||""}},clearParticipantInputs(){["training-participant-code","training-participant-name","training-participant-position","training-participant-department","training-participant-company"].forEach(i=>{const n=document.getElementById(i);n&&(n.value="")});const e=document.getElementById("training-participant-type");e&&(e.value="employee"),this.updateParticipantTypeUI?.();const a=document.getElementById("training-participant-code");a&&a.focus()},handleParticipantEmployee(t,e=!1){if(!t)return;const a=document.getElementById("training-participant-code"),i=document.getElementById("training-participant-name"),n=document.getElementById("training-participant-position"),o=document.getElementById("training-participant-department"),r=document.getElementById("training-participant-type"),s=document.getElementById("training-participant-company");r&&(r.value="employee",this.updateParticipantTypeUI?.()),a&&(a.value=t.employeeNumber||t.sapId||""),i&&(i.value=t.name||""),n&&(n.value=t.position||t.jobTitle||""),o&&(o.value=t.department||t.unit||""),s&&(s.value=""),e&&this.addParticipantFromInputs()},generateParticipantCode(t=""){const e=t?t.replace(/\s+/g,"-").replace(/[^A-Za-z0-9\-]/g,"").toUpperCase().slice(0,8):"MANUAL",a=Math.random().toString(36).substring(2,6).toUpperCase();return`${e||"MANUAL"}-${a}`},lookupEmployeeByCode(t){const e=String(t||"").trim();if(!e){Notification.info("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0644\u0644\u0628\u062D\u062B");return}let a=null;if(typeof EmployeeHelper<"u"&&typeof EmployeeHelper.findByTerm=="function")a=EmployeeHelper.findByTerm(e);else{const i=AppState.appData.employees||[],n=e.toLowerCase();a=i.find(o=>(o.employeeNumber||o.sapId||"").toLowerCase()===n)||null}a?(this.handleParticipantEmployee(a),Notification.success("\u062A\u0645 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0634\u0627\u0631\u0643 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")):Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0648\u0638\u0641 \u0628\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F. \u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u064A\u062F\u0648\u064A\u0627\u064B.")},lookupEmployeeByName(t){const e=String(t||"").trim().toLowerCase();if(!e){Notification.info("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0627\u0631\u0643 \u0644\u0644\u0628\u062D\u062B");return}let a=[];typeof EmployeeHelper<"u"&&typeof EmployeeHelper.findMatches=="function"?a=EmployeeHelper.findMatches(e,5):a=(AppState.appData.employees||[]).filter(n=>(n.name||"").toLowerCase().includes(e)),a.length===1?(this.handleParticipantEmployee(a[0]),Notification.success("\u062A\u0645 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0634\u0627\u0631\u0643 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646")):a.length>1?Notification.info("\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0646\u062A\u064A\u062C\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0648\u062F \u0628\u062F\u0642\u0629."):Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629. \u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u064A\u062F\u0648\u064A\u0627\u064B.")},addParticipantFromInputs(){const t=this.getParticipantInputValues(),e=t.type==="contractor";if(!t.name){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0627\u0631\u0643"),document.getElementById("training-participant-name")?.focus();return}if(e&&!t.company){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 \u0623\u0648 \u0627\u0644\u062C\u0647\u0629 \u0644\u0644\u0645\u0634\u0627\u0631\u0643"),document.getElementById("training-participant-company")?.focus();return}t.code||(t.code=this.generateParticipantCode(t.name||t.company||""),Notification.info(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0631\u0642\u0645 \u0645\u0624\u0642\u062A \u0644\u0644\u0645\u0634\u0627\u0631\u0643: ${t.code}`)),e||(t.company=""),this.appendParticipantRow(t)&&(this.clearParticipantInputs(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u0643 \u0625\u0644\u0649 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A"))},appendParticipantRow(t,e={}){const a=document.getElementById("training-participants-table-body");if(!a)return Notification.error("\u0639\u0646\u0635\u0631 \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),!1;const i=e.updateCount!==!1,n=e.silent===!0,o=String(t.code||t.employeeCode||t.employeeNumber||"").trim(),r=String(t.name||"").trim(),s=String(t.position||"").trim(),l=String(t.department||"").trim();if(Array.from(a.querySelectorAll("tr[data-code]")).some(f=>f.dataset.code===o))return n||Notification.warning("\u062A\u0645\u062A \u0625\u0636\u0627\u0641\u0629 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0633\u0628\u0642\u0627\u064B"),!1;const d=a.querySelectorAll("tr[data-code]").length+1,p=document.createElement("tr");p.dataset.code=o,p.dataset.name=r,p.dataset.position=s,p.dataset.department=l,p.dataset.type="employee",p.dataset.company="",p.style.borderBottom="1px solid #e2e8f0",p.innerHTML=`
            <td style="text-align: center; font-weight: 700; color: #64748b;" class="participant-row-index">${d}</td>
            <td style="font-weight: 700; color: #1e40af; font-family: monospace; font-size: 13px;">${Utils.escapeHTML(o)}</td>
            <td style="font-weight: 700; color: #0f172a;">${Utils.escapeHTML(r||"-")}</td>
            <td style="color: #334155;">${Utils.escapeHTML(s||"-")}</td>
            <td><span class="badge badge-info" style="font-size: 11px;">${Utils.escapeHTML(l||"-")}</span></td>
            <td style="text-align: center;">
                <button type="button" onclick="Training.removeParticipantRow(this)" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641 \u0645\u0646 \u0627\u0644\u0643\u0634\u0641" style="width: 28px; height: 28px;">
                    <i class="fas fa-trash-alt" style="font-size: 11px;"></i>
                </button>
            </td>
        `;const g=a.querySelector(".participants-empty-row");return g&&g.remove(),a.appendChild(p),i&&this.updateParticipantsCount(),!0},editParticipantFromRow(t){const e=t.closest("tr");if(!e)return;const a=document.getElementById("training-participant-code"),i=document.getElementById("training-participant-name"),n=document.getElementById("training-participant-position"),o=document.getElementById("training-participant-department");a&&(a.value=e.dataset.code||""),i&&(i.value=e.dataset.name||""),n&&(n.value=e.dataset.position||""),o&&(o.value=e.dataset.department||""),e.remove(),this.updateParticipantsCount(),a?.focus()},selectEmployee(t){if(!t){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0627\u0644\u0635\u062D\u064A\u062D");return}this.lookupEmployeeByCode(t)},updateParticipantsCount(){const t=document.getElementById("training-participants-table-body"),e=document.getElementById("training-participants"),a=document.getElementById("participants-count-number");if(!t)return;const i=t.querySelectorAll("tr[data-code]"),n=i.length;i.forEach((r,s)=>{const l=r.querySelector(".participant-row-index");l&&(l.textContent=s+1)}),e&&(e.value=n),a&&(a.textContent=n);let o=t.querySelector(".participants-empty-row");n===0?o||(o=document.createElement("tr"),o.className="participants-empty-row",o.innerHTML='<td colspan="6" class="text-center text-gray-400 py-6"><i class="fas fa-user-clock text-2xl mb-1 text-gray-300 block"></i>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u0648\u0646 \u0645\u0636\u0627\u0641\u0648\u0646 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646 \u2014 \u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0643\u0648\u062F \u0623\u0648 \u0627\u0644\u0627\u0633\u0645 \u0644\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</td>',t.appendChild(o)):o&&o.remove()},removeParticipantRow(t){const e=t.closest("tr");e&&(e.remove(),this.updateParticipantsCount())},syncEmployeeTrainingMatrix(t){this.ensureData(),(!AppState.appData.employeeTrainingMatrix||typeof AppState.appData.employeeTrainingMatrix!="object")&&(AppState.appData.employeeTrainingMatrix={});const e=AppState.appData.employeeTrainingMatrix;Object.keys(e).forEach(i=>{e[i]=(e[i]||[]).filter(n=>n.trainingId!==t.id),e[i].length===0&&delete e[i]}),(Array.isArray(t.participants)?t.participants:[]).forEach(i=>{const n=i.code||i.employeeNumber||"";n&&(e[n]||(e[n]=[]),e[n].push({trainingId:t.id,trainingName:t.name,trainingDate:t.startDate,trainingType:t.trainingType,status:t.status,completed:t.status==="\u0645\u0643\u062A\u0645\u0644",hours:parseFloat(t.hours)||0,trainer:t.trainer||"",location:t.location||"",topics:Array.isArray(t.topics)?t.topics:t.name?[t.name]:[]}))})},async handleSubmit(t){this.ensureData(),t.preventDefault();const e=t.target?.querySelector('button[type="submit"]')||document.querySelector('#training-form button[type="submit"]')||t.target?.closest("form")?.querySelector('button[type="submit"]');if(e&&e.disabled)return;let a="";e&&(a=e.innerHTML,e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const i=[],n=document.getElementById("training-participants-table-body");if(n&&n.querySelectorAll("tr[data-code]").forEach(D=>{const F=D.getAttribute("data-code"),E=D.getAttribute("data-name"),C=D.getAttribute("data-position")||"",v=D.getAttribute("data-department")||"",L=D.getAttribute("data-type")||"employee",N=D.getAttribute("data-company")||"",T=(AppState.appData.employees||[]).find(M=>(M.employeeNumber||M.sapId)===F);i.push({name:E,code:F,employeeNumber:F,employeeCode:F,position:C||T?.position||"",department:v||T?.department||"",workLocation:T?.workLocation||T?.location||"",type:L,personType:L,company:N||T?.company||"",contractorCompany:L==="contractor"?N||"":void 0,contractorName:L==="contractor"?E||"":void 0})}),i.length===0){Notification.error("\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0627\u0631\u0643 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"),e&&(e.disabled=!1,e.innerHTML=a);return}let o=0;const r=document.getElementById("training-startDateTime")?.value||document.getElementById("training-startDate")?.value||"",s=document.getElementById("training-endDateTime")?.value||"";let l=document.getElementById("training-startTime")?.value||"",c=document.getElementById("training-endTime")?.value||"",d=new Date().toISOString();if(r)try{const D=new Date(r);isNaN(D.getTime())||(d=D.toISOString());const F=r.split("T");F[1]&&(l=F[1].slice(0,5))}catch{}if(s)try{const D=s.split("T");D[1]&&(c=D[1].slice(0,5))}catch{}if(r&&s)try{const D=new Date(r.includes("T")?r:`2000-01-01T${r}:00`),F=new Date(s.includes("T")?s:`2000-01-01T${s}:00`);if(F<=D){Notification.error("\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0628\u0639\u062F \u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0627\u064A\u0629"),e&&(e.disabled=!1,e.innerHTML=a);return}o=(F-D)/36e5}catch{Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0633\u0627\u0628 \u0645\u062F\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062F\u062E\u0644"),e&&(e.disabled=!1,e.innerHTML=a);return}const p=this.currentEditId||Utils.generateId("TRAINING"),g=document.getElementById("training-name"),f=document.getElementById("training-trainer"),u=document.getElementById("training-type"),m=document.getElementById("training-status"),y=document.getElementById("training-location"),x=document.getElementById("training-factory");if(!g||!f||!u||!m||!y||!x||!r&&!document.getElementById("training-startDate")){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),e&&(e.disabled=!1,e.innerHTML=a);return}const S=this.getSiteOptions().find(D=>D.id===x.value),h=this.getPlaceOptions(x.value).find(D=>D.id===y.value),k=D=>D&&D.options&&D.selectedIndex>=0?D.options[D.selectedIndex].text:"",w=document.getElementById("training-expiryDate")?.value||"",A={id:p,name:g.value.trim(),trainer:f.value.trim(),trainingType:u.value||"\u062F\u0627\u062E\u0644\u064A",date:r?r.split("T")[0]:d.split("T")[0],startDateTime:r,endDateTime:s,expiryDate:w,factory:x.value,factoryName:S?S.name:k(x),location:y.value,locationName:h?h.name:k(y),startTime:this.cleanTime(l)||"",endTime:this.cleanTime(c)||"",hours:o>0?o.toFixed(2):"",startDate:d,participants:i,participantsCount:i.length||parseInt(document.getElementById("training-participants")?.value)||0,status:m.value||"\u0645\u062E\u0637\u0637",createdAt:this.currentEditId?AppState.appData.training.find(D=>D.id===this.currentEditId)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};try{if(this.currentEditId){const C=AppState.appData.training.findIndex(v=>v.id===this.currentEditId);C!==-1&&(AppState.appData.training[C]=A,Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.training.push(A),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0628\u0646\u062C\u0627\u062D");try{this.syncEmployeeTrainingMatrix(A)}catch(C){Utils.safeWarn("syncEmployeeTrainingMatrix:",C)}let D={added:[],updated:[]};try{D=this.syncAttendanceRegistry(A)||{added:[],updated:[]}}catch(C){Utils.safeWarn("syncAttendanceRegistry:",C)}this._trainingLocalSaveTime=Date.now(),this._trainingAttendanceLocalSaveTime=Date.now(),this.closeFormModal(),this.showList(),e&&(e.disabled=!1,e.innerHTML=a),setTimeout(()=>{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")},50);const F=[...D.added||[],...D.updated||[]],E=F.length>0&&typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave?GoogleIntegration.autoSave("TrainingAttendance",F):Promise.resolve();Promise.allSettled([GoogleIntegration.autoSave("Training",[A]),GoogleIntegration.autoSave("EmployeeTrainingMatrix",AppState.appData.employeeTrainingMatrix),E]).then(C=>{const v=["Training","EmployeeTrainingMatrix","TrainingAttendance"];C.forEach((L,N)=>{L.status==="rejected"?Utils.safeWarn(`\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 ${v[N]}:`,L.reason):L.value&&L.value.success===!1&&Utils.safeWarn(`\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 ${v[N]}:`,L.value.message||L.value)})}).catch(C=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0644\u0641\u064A\u0629:",C)})}catch(D){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+D.message),e&&(e.disabled=!1,e.innerHTML=a)}},async editTraining(t){this.currentEditId=t;const e=AppState.appData.training.find(a=>a.id===t);e&&await this.showForm(e)},async deleteTraining(t){if(!this.isCurrentUserAdminOrManager()){Notification.error("\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062D\u0630\u0641 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u0627\u0644\u062D\u0630\u0641 \u064A\u062A\u0645 \u0628\u0637\u0644\u0628 \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637.");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C\u061F

\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647\u0627.`)){Loading.show();try{if(AppState.appData.training=AppState.appData.training.filter(e=>e.id!==t),typeof window.DataManager<"u"&&window.DataManager.save?await window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),AppState.googleConfig?.appsScript?.enabled)try{const e=await GoogleIntegration.sendToAppsScript("deleteTraining",{trainingId:t,id:t});if(e&&e.success===!1)throw new Error(e.message||"\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");typeof GoogleIntegration<"u"&&GoogleIntegration.clearCache&&GoogleIntegration.clearCache("Training")}catch(e){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 SQL\u060C \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B:",e),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("Training",AppState.appData.training).catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL:",a)})}else typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("Training",AppState.appData.training).catch(e=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL:",e)});Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0628\u0646\u062C\u0627\u062D"),this.loadTrainingList()}catch(e){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+e.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C:",e),this.loadTrainingList()}}},async _openTrainingAttendancePrint(t,e={}){const{formCode:a="DOC-HSE-TRN-ATT-01",docTitle:i="\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u0648\u062A\u0642\u064A\u064A\u0645 \u0628\u0631\u0646\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A",createdAt:n=new Date().toISOString(),updatedAt:o=null,meta:r={},successMessage:s="\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u0636\u0648\u0631 \u0628\u0646\u062C\u0627\u062D",downloadDirect:l=!0,isLandscape:c=!1}=e,d=this.getIsoPrintHeaderHtml(i,"Official Training Attendance & Evaluation Record",a,"Rev. 03","\u062F\u0627\u062E\u0644\u064A \u0648\u0645\u0639\u062A\u0645\u062F"),p=this.getIsoPrintFooterHtml(a,"Rev. 03","ISO 45001:2018 (Clause 7.2 Competence & 7.3 Awareness)"),g=`
            ${d}
            ${t}
            ${p}
        `,f=`${String(i).replace(/[\\/:*?"<>|]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`;if(l!==!1){Loading.show("\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0643\u0634\u0641 \u0627\u0644\u062D\u0636\u0648\u0631 \u0628\u0635\u064A\u063A\u0629 PDF...");const u=await this.downloadIsoReportAsPdf(i,g,f,c);if(Loading.hide(),u)return!0}return Loading.hide(),this.openIsoPrintWindow(i,g,c,"",f)},trainingRecordToAttendancePrintPayload(t){let e=t.locationName||"";!e&&t.location&&(e=this.getPlaceName(t.location,t.factory));let a=t.factoryName||"";if(!a&&t.factory){const l=this.getSiteOptions().find(c=>c.id===t.factory);a=l?l.name:t.factory}const i=t.startDate?Utils.formatDate(t.startDate):t.date?Utils.formatDate(t.date):"",n=(t.topics&&Array.isArray(t.topics)?t.topics.join("\u060C "):"")||"",o=this.getParticipantsArray(t).map(s=>{const l=s.type==="contractor"||s.personType==="contractor";return{code:s.code||s.employeeNumber||s.employeeCode||"\u2014",name:s.name||s.contractorName||"",typeLabel:l?"\u0645\u0642\u0627\u0648\u0644 / \u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629":"\u0645\u0648\u0638\u0641",company:l?s.company||s.contractorCompany||"\u2014":"\u0627\u0644\u0634\u0631\u0643\u0629 (ICAPP)",position:s.position||s.jobTitle||"",department:s.department||""}}),r=t.expiryDate?Utils.formatDate(t.expiryDate):"\u2014";return{isEdit:!1,trainingType:t.trainingType||"\u062F\u0627\u062E\u0644\u064A",trainingTypeDisplay:t.trainingType||"\u062F\u0627\u062E\u0644\u064A",dateDisplay:i,expiryDateDisplay:r,factoryName:a||"",locationName:e||"",topic:t.name||t.subject||"",trainer:t.trainer||"",startTime:this.cleanTime(t.startTime)||"",endTime:this.cleanTime(t.endTime)||"",status:t.status||"\u0645\u0643\u062A\u0645\u0644",statusDisplay:t.status||"\u0645\u0643\u062A\u0645\u0644",topicsScientific:n,participants:o}},collectAttendanceFormDraftFromDOM(){const t=document.getElementById("training-type"),e=t?.value||"\u062F\u0627\u062E\u0644\u064A",a=t?.selectedOptions?.[0]?.textContent?.trim()||e,n=document.getElementById("training-startDate")?.value,o=n?Utils.formatDate(new Date(n).toISOString()):"",s=document.getElementById("training-expiryDate")?.value,l=s?Utils.formatDate(new Date(s).toISOString()):"\u2014",c=document.getElementById("training-factory")?.selectedOptions?.[0]?.textContent?.trim()||"",d=document.getElementById("training-location")?.selectedOptions?.[0]?.textContent?.trim()||"",p=document.getElementById("training-name")?.value?.trim()||"",g=document.getElementById("training-trainer"),f=(g?.value||g?.selectedOptions?.[0]?.textContent||"").trim(),u=this.cleanTime(document.getElementById("training-startTime")?.value||"")||"",m=this.cleanTime(document.getElementById("training-endTime")?.value||"")||"",y=document.getElementById("training-status"),x=y?.value||"",b=y?.selectedOptions?.[0]?.textContent?.trim()||x,S=[],I=document.getElementById("training-participants-table-body");return I&&I.querySelectorAll("tr[data-code]").forEach(h=>{const k=h.getAttribute("data-code")||"",$=h.getAttribute("data-name")||"",w=h.getAttribute("data-type")||"employee",A=h.getAttribute("data-company")||"",D=h.getAttribute("data-position")||"",F=h.getAttribute("data-department")||"",E=w==="contractor";S.push({code:k||"\u2014",name:$,typeLabel:E?"\u0645\u0642\u0627\u0648\u0644 / \u0639\u0645\u0627\u0644\u0629 \u062E\u0627\u0631\u062C\u064A\u0629":"\u0645\u0648\u0638\u0641",company:E?A||"\u2014":"\u0627\u0644\u0634\u0631\u0643\u0629 (ICAPP)",position:D,department:F})}),{isEdit:!!this.currentEditId,trainingType:e,trainingTypeDisplay:a,dateDisplay:o,expiryDateDisplay:l,factoryName:c,locationName:d,topic:p,trainer:f,startTime:u,endTime:m,status:x,statusDisplay:b,topicsScientific:"",participants:S}},buildTrainingAttendanceFormPrintHTML(t){const e=o=>Utils.escapeHTML(String(o??"")),a=t.participants||[],i=a.length>0?a.map((o,r)=>`
                <tr>
                    <td style="font-weight: 800;">${r+1}</td>
                    <td style="font-weight: 800; color: #1e3a8a; font-family: monospace, inherit;">${e(o.code)}</td>
                    <td style="text-align: right; font-weight: 700;">${e(o.name)}</td>
                    <td style="text-align: right;">${e(o.position||"\u2014")}</td>
                    <td style="text-align: right;">${e(o.department||"\u2014")}</td>
                    <td style="text-align: right;">${e(o.company||"ICAPP")}</td>
                    <td style="min-width: 100px; height: 32px;"></td>
                </tr>`).join(""):'<tr><td colspan="7" style="padding: 18px; text-align: center; color: #64748b;">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u062A\u062F\u0631\u0628\u0648\u0646 \u0645\u0633\u062C\u0644\u0648\u0646 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C</td></tr>',n=t.topicsScientific?`
            <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; margin-bottom: 14px;">
                <div style="font-size: 10.5px; font-weight: 800; color: #1e3a8a; margin-bottom: 4px;">\u0627\u0644\u0645\u0627\u062F\u0629 \u0627\u0644\u0639\u0644\u0645\u064A\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629:</div>
                <div style="font-size: 11px; color: #0f172a; line-height: 1.5;">${e(t.topicsScientific)}</div>
            </div>
        `:"";return`
            <div class="handover-info-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 14px;">
                <div class="info-card" style="grid-column: span 2;">
                    <div class="card-label">\u0627\u0633\u0645 / \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A:</div>
                    <div class="card-value" style="color: #1e3a8a; font-size: 13px;">${e(t.topic||"\u2014")}</div>
                </div>
                <div class="info-card">
                    <div class="card-label">\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:</div>
                    <div class="card-value">${e(t.trainingTypeDisplay||t.trainingType||"\u062F\u0627\u062E\u0644\u064A")}</div>
                </div>
                <div class="info-card">
                    <div class="card-label">\u062D\u0627\u0644\u0629 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C:</div>
                    <div class="card-value" style="color: #047857;">${e(t.statusDisplay||t.status||"\u0645\u0643\u062A\u0645\u0644")}</div>
                </div>
                <div class="info-card">
                    <div class="card-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u0639\u0642\u0627\u062F:</div>
                    <div class="card-value">${e(t.dateDisplay||"\u2014")}</div>
                </div>
                <div class="info-card">
                    <div class="card-label">\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u062D\u062A\u0649:</div>
                    <div class="card-value">${e(t.expiryDateDisplay||"\u2014")}</div>
                </div>
                <div class="info-card">
                    <div class="card-label">\u0627\u0644\u0645\u0635\u0646\u0639 / \u0627\u0644\u0645\u0648\u0642\u0639:</div>
                    <div class="card-value">${e(t.factoryName||"\u2014")}</div>
                </div>
                <div class="info-card">
                    <div class="card-label">\u0642\u0627\u0639\u0629 \u0648\u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:</div>
                    <div class="card-value">${e(t.locationName||"\u2014")}</div>
                </div>
                <div class="info-card" style="grid-column: span 2;">
                    <div class="card-label">\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631 / \u062C\u0647\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:</div>
                    <div class="card-value" style="color: #1e3a8a;">${e(t.trainer||"\u2014")}</div>
                </div>
                <div class="info-card">
                    <div class="card-label">\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621:</div>
                    <div class="card-value">${e(t.startTime||"\u2014")}</div>
                </div>
                <div class="info-card">
                    <div class="card-label">\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621:</div>
                    <div class="card-value">${e(t.endTime||"\u2014")}</div>
                </div>
            </div>

            ${n}

            <div style="margin-top: 10px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; font-size: 13px; font-weight: 900; color: #1e3a8a;">
                    <i class="fas fa-users" style="margin-left: 6px;"></i> \u0643\u0634\u0641 \u062D\u0636\u0648\u0631 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u0648\u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0627\u0644\u0631\u0633\u0645\u064A\u0629 (${a.length} \u0645\u0634\u0627\u0631\u0643)
                </h3>
                <span style="font-size: 10px; color: #64748b; font-weight: 700;">\u064A\u064F\u0634\u062A\u0631\u0637 \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0627\u0644\u0641\u0639\u0644\u064A \u0644\u0643\u0644 \u0645\u062A\u062F\u0631\u0628 \u0644\u0627\u0643\u062A\u0645\u0627\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0633\u062C\u0644</span>
            </div>

            <table class="iso-table">
                <thead>
                    <tr>
                        <th style="width: 35px;">\u0645</th>
                        <th style="width: 90px;">\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                        <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u062A\u062F\u0631\u0628 \u062B\u0644\u0627\u062B\u064A\u0627\u064B</th>
                        <th>\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th>
                        <th>\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                        <th>\u062C\u0647\u0629 \u0627\u0644\u0639\u0645\u0644 / \u0627\u0644\u0634\u0631\u0643\u0629</th>
                        <th style="width: 120px;">\u0627\u0644\u062A\u0648\u0642\u064A\u0639</th>
                    </tr>
                </thead>
                <tbody>
                    ${i}
                </tbody>
            </table>

            <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; margin-top: 12px; font-size: 10.5px; line-height: 1.5; color: #334155; page-break-inside: avoid;">
                <div style="font-weight: 800; color: #1e3a8a; margin-bottom: 2px;">\u0625\u0642\u0631\u0627\u0631 \u0648\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u062D\u0627\u0636\u0631 / \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628:</div>
                <div>\u0623\u0642\u0631 \u0623\u0646\u0627 \u0627\u0644\u0645\u062F\u0631\u0628 / \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0645\u0630\u0643\u0648\u0631 \u0623\u0639\u0644\u0627\u0647 \u0628\u0625\u062A\u0645\u0627\u0645 \u062A\u0642\u062F\u064A\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0645\u0648\u0636\u062D \u0648\u062A\u063A\u0637\u064A\u0629 \u0643\u0627\u0641\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0631 \u0627\u0644\u0646\u0638\u0631\u064A\u0629 \u0648\u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0645\u0642\u0631\u0631\u0629 \u0648\u062A\u0642\u064A\u064A\u0645 \u0627\u0633\u062A\u064A\u0639\u0627\u0628 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u0627\u0644\u062D\u0627\u0636\u0631\u064A\u0646 \u0628\u0646\u062C\u0627\u062D.</div>
            </div>

            <div class="signatures-grid">
                <div class="sig-card">
                    <div class="sig-card-title">\u0645\u0639\u062F \u0627\u0644\u0633\u062C\u0644 / \u0627\u0644\u0645\u062F\u0631\u0628</div>
                    <div class="sig-card-name">${e(t.trainer||"\u0627\u0644\u0645\u062D\u0627\u0636\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F")}</div>
                    <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                </div>
                <div class="sig-card">
                    <div class="sig-card-title">\u0645\u0634\u0631\u0641 / \u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                    <div class="sig-card-name">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                    <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                </div>
                <div class="sig-card">
                    <div class="sig-card-title">\u0645\u062F\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                    <div class="sig-card-name">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</div>
                    <div class="sig-line-area">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0648\u0627\u0644\u062E\u062A\u0645</div>
                </div>
            </div>
        `},async printAttendanceFormFromScreen(t=!1){try{if(!document.getElementById("training-form"))return Notification.warning("\u0627\u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0623\u0648\u0644\u0627\u064B"),!1;Loading.show(t?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0643\u0634\u0641 \u0627\u0644\u062D\u0636\u0648\u0631...":"\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0643\u0634\u0641 \u0627\u0644\u062D\u0636\u0648\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629...");const e=this.collectAttendanceFormDraftFromDOM(),a=this.buildTrainingAttendanceFormPrintHTML(e),i=this.currentEditId?`DOC-HSE-TRN-ATT-${String(this.currentEditId).substring(0,8)}`:`DOC-HSE-TRN-ATT-DRAFT-${Date.now()}`,n=e.topic?`\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628 \u2014 ${e.topic}`:"\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u0648\u062A\u0642\u064A\u064A\u0645 \u0628\u0631\u0646\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A";return await this._openTrainingAttendancePrint(a,{formCode:i,docTitle:n,downloadDirect:!!t,meta:{version:"1.0",source:"TrainingAttendanceForm",topic:e.topic},createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),successMessage:t?"\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u0636\u0648\u0631 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u0636\u0648\u0631 \u0644\u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0627\u0644\u0637\u0628\u0627\u0639\u0629"})}catch(e){return Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u0636\u0648\u0631:",e),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C: "+(e?.message||"")),!1}},async downloadAttendanceFormFromScreen(){return this.printAttendanceFormFromScreen(!0)},async printTraining(t,e=!1){this.ensureData();let a=AppState.appData.training.find(i=>i.id===t);if(!a)return Notification.error("\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),!1;try{if(Loading.show(e?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0643\u0634\u0641 \u0627\u0644\u062A\u062F\u0631\u064A\u0628...":"\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0643\u0634\u0641 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u0637\u0628\u0627\u0639\u0629..."),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function")try{const s=await GoogleIntegration.sendRequest({action:"getTraining",data:{trainingId:t}});s&&s.success&&s.data&&(a=s.data)}catch(s){Utils.safeWarn("\u062C\u0644\u0628 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0644\u0644\u0637\u0628\u0627\u0639\u0629:",s)}const i=this.trainingRecordToAttendancePrintPayload(a),n=this.buildTrainingAttendanceFormPrintHTML(i),o=a.isoCode||`DOC-HSE-TRN-ATT-${a.id?.substring(0,8)||"01"}`,r=a.name?`\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628 \u2014 ${a.name}`:"\u0646\u0645\u0648\u0630\u062C \u062D\u0636\u0648\u0631 \u0648\u062A\u0642\u064A\u064A\u0645 \u0628\u0631\u0646\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A";return await this._openTrainingAttendancePrint(n,{formCode:o,docTitle:r,downloadDirect:!!e,meta:{version:a.version||"1.0",id:a.id,code:o,name:a.name},createdAt:a.createdAt||a.startDate,updatedAt:a.updatedAt||a.endDate||a.createdAt,successMessage:e?"\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u0636\u0648\u0631 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u0636\u0648\u0631 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"})}catch(i){return Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",i),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+i.message),!1}},async downloadTrainingPdf(t){return this.printTraining(t,!0)},async exportTraining(t){this.ensureData();let e=AppState.appData.training.find(a=>a.id===t);if(!e){Notification.error("\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{if(Loading.show(),typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function")try{const d=await GoogleIntegration.sendRequest({action:"getTraining",data:{trainingId:t}});d&&d.success&&d.data&&(e=d.data)}catch(d){Utils.safeWarn("\u062C\u0644\u0628 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0644\u0644\u062A\u0635\u062F\u064A\u0631:",d)}if(typeof XLSX>"u"){Loading.hide(),Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629");return}let a=e.locationName||"";!a&&e.location&&(a=this.getPlaceName(e.location,e.factory));let i=e.factoryName||"";if(!i&&e.factory){const p=this.getSiteOptions().find(g=>g.id===e.factory);i=p?p.name:e.factory}const n=this.getParticipantsArray(e).map(d=>{const p={"\u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0627\u0631\u0643":d.name||d.contractorName||"",\u0627\u0644\u0643\u0648\u062F:d.code||d.employeeNumber||d.employeeCode||"",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:d.position||"",\u0627\u0644\u0642\u0633\u0645:d.department||""};return(d.company||d.contractorCompany)&&(p.\u0627\u0644\u0634\u0631\u0643\u0629=d.company||d.contractorCompany||""),d.type==="contractor"||d.personType==="contractor"?p.\u0627\u0644\u0646\u0648\u0639="\u0645\u0642\u0627\u0648\u0644":p.\u0627\u0644\u0646\u0648\u0639="\u0645\u0648\u0638\u0641",p}),o=[{"\u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C":e.name||"",\u0627\u0644\u0645\u062F\u0631\u0628:e.trainer||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621":e.startDate?Utils.formatDate(e.startDate):"","\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628":e.trainingType||"\u062F\u0627\u062E\u0644\u064A","\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646":this.getParticipantsCount(e),\u0627\u0644\u062D\u0627\u0644\u0629:e.status||"",\u0627\u0644\u0645\u0635\u0646\u0639:i||"",\u0627\u0644\u0645\u0643\u0627\u0646:a||"","\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621":e.startTime||"","\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":e.endTime||"","\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":e.hours||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":e.createdAt?Utils.formatDate(e.createdAt):""}],r=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet(o);if(s["!cols"]=[{wch:30},{wch:20},{wch:15},{wch:15},{wch:15},{wch:15},{wch:30},{wch:15}],XLSX.utils.book_append_sheet(r,s,"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C"),n.length>0){const d=XLSX.utils.json_to_sheet(n);d["!cols"]=[{wch:30},{wch:20}],XLSX.utils.book_append_sheet(r,d,"\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646")}const l=new Date().toISOString().slice(0,10),c=`\u0628\u0631\u0646\u0627\u0645\u062C_\u062A\u062F\u0631\u064A\u0628\u064A_${Utils.escapeHTML(e.name||"\u062A\u062F\u0631\u064A\u0628").replace(/[^\w\s]/g,"_")}_${l}.xlsx`;XLSX.writeFile(r,c),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0628\u0646\u062C\u0627\u062D")}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0635\u062F\u064A\u0631:",a),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+a.message)}},async renderAnalysisTab(){return this.isCurrentUserAdmin()?(this._tEnsureChartJS().catch(()=>{}),`
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
        </div>`):'<div class="content-card"><p class="text-center text-red-600 py-8">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p></div>'},_renderAnalysisTabLegacy(){const t=this.loadTrainingInfoCards();let e=this.calculateTrainingMetrics();const a=t.filter(n=>n.enabled!==!1);(!e||typeof e!="object")&&(Utils.safeWarn("\u26A0\uFE0F \u0645\u0642\u0627\u064A\u064A\u0633 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629"),e=this.calculateTrainingMetrics());const i=a.map(n=>{let o=e[n.metric];return o==null&&(o=0),typeof o=="string"&&o.trim()===""&&(o=0),typeof o=="number"&&o>=1e3&&(o=o.toLocaleString("en-US")),`
                <div class="content-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl ${{blue:"bg-blue-100 text-blue-600",green:"bg-green-100 text-green-600",purple:"bg-purple-100 text-purple-600",amber:"bg-amber-100 text-amber-600",red:"bg-red-100 text-red-600",indigo:"bg-indigo-100 text-indigo-600",teal:"bg-teal-100 text-teal-600",orange:"bg-orange-100 text-orange-600",pink:"bg-pink-100 text-pink-600"}[n.color]||"bg-gray-100 text-gray-600"} flex items-center justify-center shadow-sm">
                            <i class="${n.icon} text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-gray-500 mb-1">${Utils.escapeHTML(n.title)}</p>
                            <p class="text-2xl font-bold text-gray-900" dir="ltr">${Utils.escapeHTML(String(o))}</p>
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
        `},loadTrainingInfoCards(){const t=this.getTrainingAnalysisStorageKeys(),e=localStorage.getItem(t.cards)||"[]";let a=[];try{const i=JSON.parse(e);if(Array.isArray(i))a=i;else throw new Error("\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0643\u0631\u0648\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629")}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0643\u0631\u0648\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0645\u0646 localStorage\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629:",i),a=[]}if(!Array.isArray(a)||a.length===0){a=this.getTrainingDefaultAnalysisCards();try{localStorage.setItem(t.cards,JSON.stringify(a))}catch(i){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0643\u0631\u0648\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0641\u064A localStorage:",i)}}return a=a.map(i=>(i.enabled===void 0&&(i.enabled=!0),{id:i.id||`card_${Date.now()}_${Math.random()}`,title:i.title||"\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646",icon:i.icon||"fas fa-info-circle",color:i.color||"blue",description:i.description||"",enabled:i.enabled!==!1,mode:i.mode||"metric",metric:i.metric||""})),a},calculateTrainingMetrics(){this.ensureData();const t=this.getAnalysisDateFilter();let e=Array.isArray(AppState.appData.training)?AppState.appData.training:[],a=Array.isArray(AppState.appData.contractorTrainings)?AppState.appData.contractorTrainings:[],i=Array.isArray(AppState.appData.trainingAttendance)?AppState.appData.trainingAttendance:[];t&&t.type!=="all"&&(e=this.filterRecordsByAnalysisDate(e,t,"training"),a=this.filterRecordsByAnalysisDate(a,t,"contractorTrainings"),i=this.filterRecordsByAnalysisDate(i,t,"trainingAttendance"));try{const n=this.getStatsFromTrainingsArray(e),o={total:a.length,totalParticipants:a.reduce((p,g)=>{const f=Number(g.traineesCount||g.attendees||0);return p+(Number.isFinite(f)?f:0)},0),totalHours:a.reduce((p,g)=>{const f=parseFloat(g.totalHours||g.trainingHours||0);return p+(Number.isFinite(f)?f:0)},0)},r=new Set;i.forEach(p=>{p.employeeCode&&r.add(p.employeeCode)}),e.forEach(p=>{Array.isArray(p.participants)&&p.participants.forEach(g=>{const f=g.employeeCode||g.code||g.employeeNumber||"";f&&r.add(f)})});const s=i.reduce((p,g)=>{const f=parseFloat(g.totalHours)||0;return p+(Number.isFinite(f)?f:0)},0),l=e.reduce((p,g)=>{const f=parseFloat(g.hours||g.totalHours||0);return p+(Number.isFinite(f)?f:0)},0),c=s+o.totalHours+l;return{totalTrainings:n.totalTrainings+i.length,completedTrainings:n.completedTrainings||0,totalParticipants:(n.totalParticipants||0)+i.length,contractorTrainings:o.total||0,totalTrainingHours:Number.isFinite(c)?c.toFixed(2):"0.00",uniqueEmployees:r.size||0}}catch(n){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0633\u0627\u0628 \u0645\u0642\u0627\u064A\u064A\u0633 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",n),{totalTrainings:0,completedTrainings:0,totalParticipants:0,contractorTrainings:0,totalTrainingHours:"0.00",uniqueEmployees:0}}},showManageTrainingCardsModal(){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
        `).join(""))},loadTrainingAnalysisItemsUI(){const t=this.getTrainingAnalysisStorageKeys(),e=localStorage.getItem(t.items)||"[]";let a=[];try{const n=JSON.parse(e);a=Array.isArray(n)?n:[]}catch(n){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",n),a=[]}if(!Array.isArray(a)||a.length===0){a=this.getTrainingDefaultAnalysisItems();try{localStorage.setItem(t.items,JSON.stringify(a))}catch(n){Utils.safeWarn("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629:",n)}}else{let n=!1;if(a=a.map(o=>{if(!o||typeof o!="object")return o;const r=o.id==="trainings_by_month"||String(o.label||"").trim()==="\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631";return o.dataset==="training"&&o.field==="startDate"&&r?(n=!0,{...o,field:"byMonth"}):o}),n)try{localStorage.setItem(t.items,JSON.stringify(a)),this.updateTrainingAnalysisResults()}catch(o){Utils.safeWarn("\u0641\u0634\u0644 \u062D\u0641\u0638 \u062A\u0631\u062D\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",o)}}const i=document.getElementById("training-analysis-items-list");if(i){if(a.length===0){i.innerHTML='<p class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0646\u0648\u062F \u062A\u062D\u0644\u064A\u0644. \u0642\u0645 \u0628\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F \u062C\u062F\u064A\u062F.</p>';return}i.innerHTML=a.map(n=>`
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
        `).join(""),i.querySelectorAll(".training-analysis-item-checkbox").forEach(n=>{n.addEventListener("change",o=>{const r=o.target.getAttribute("data-item-id");this.toggleTrainingAnalysisItem(r,o.target.checked)})}),this.setupTrainingAnalysisItemForm()}},setupTrainingAnalysisItemForm(){const t=document.getElementById("training-new-analysis-dataset"),e=document.getElementById("training-new-analysis-field"),a=document.getElementById("training-custom-field-wrap"),i=document.getElementById("training-add-analysis-item-btn");if(!t||!e)return;const n=()=>{const o=t.value,l=`
                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0642\u0644</option>
                ${(this.getTrainingAnalysisFieldsMap()[o]||[]).map(c=>`<option value="${Utils.escapeHTML(c.value)}">${Utils.escapeHTML(c.label)}</option>`).join("")}
                <option value="__custom__">\u062D\u0642\u0644 \u0645\u062E\u0635\u0635...</option>
            `;Utils.setSafeHTML(e,l)};t.addEventListener("change",n),n(),e.addEventListener("change",()=>{e.value==="__custom__"?a.style.display="block":a.style.display="none"}),i&&(i.onclick=()=>this.addTrainingAnalysisItemFromUI())},getAnalysisMonthOptions(){this.ensureData();const t=new Set,e=(i,n)=>{(i||[]).forEach(o=>{const r=n(o);r&&!Number.isNaN(r.getTime())&&t.add(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`)})};e(AppState.appData.training,i=>new Date(i.startDate||i.date||i.createdAt)),e(AppState.appData.trainingAttendance,i=>new Date(i.date||i.attendanceDate||i.createdAt)),e(AppState.appData.contractorTrainings,i=>new Date(i.date||i.trainingDate||i.createdAt));const a=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];return Array.from(t).sort().reverse().map(i=>{const[n,o]=i.split("-");return`<option value="${i}">${a[parseInt(o,10)-1]} ${n}</option>`}).join("")},getTrainingAnalysisFieldsMap(){return{training:[{value:"status",label:"\u0627\u0644\u062D\u0627\u0644\u0629"},{value:"trainingType",label:"\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{value:"trainer",label:"\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0631\u0628"},{value:"location",label:"\u0627\u0644\u0645\u0648\u0642\u0639"},{value:"department",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],contractorTrainings:[{value:"contractorName",label:"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644"},{value:"topic",label:"\u0627\u0644\u0645\u0648\u0636\u0648\u0639"},{value:"location",label:"\u0627\u0644\u0645\u0648\u0642\u0639"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}],trainingAttendance:[{value:"trainingType",label:"\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628"},{value:"factoryName",label:"\u0627\u0644\u0645\u0635\u0646\u0639"},{value:"department",label:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629"},{value:"employeeCode",label:"\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641"},{value:"byMonth",label:"\u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631"}]}},addTrainingAnalysisItemFromUI(){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}const t=document.getElementById("training-new-analysis-dataset"),e=document.getElementById("training-new-analysis-field"),a=document.getElementById("training-new-analysis-custom-field"),i=document.getElementById("training-new-analysis-label"),n=document.getElementById("training-new-analysis-charttype"),o=t?.value||"training";let r=e?.value||"";r==="__custom__"&&(r=(a?.value||"").trim());const s=(i?.value||"").trim(),l=n?.value||"auto";if(!r){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631/\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u062D\u0642\u0644");return}if(!s){Notification?.warning?.("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F");return}const c=this.getTrainingAnalysisStorageKeys();let d=[];try{d=JSON.parse(localStorage.getItem(c.items)||"[]")||[]}catch{d=[]}if(Array.isArray(d)||(d=[]),d.some(f=>f.label.toLowerCase()===s.toLowerCase())){Notification?.warning?.("\u064A\u0648\u062C\u062F \u0628\u0646\u062F \u0628\u0646\u0641\u0633 \u0627\u0644\u0627\u0633\u0645 \u0645\u0633\u0628\u0642\u0627\u064B");return}const p={id:`custom_${Date.now()}`,label:s,enabled:!0,dataset:o,field:r,chartType:l};d.push(p);try{localStorage.setItem(c.items,JSON.stringify(d)),Notification?.success?.("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")}catch(f){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0628\u0646\u062F:",f),Notification?.error?.("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0628\u0646\u062F: "+(f.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}i&&(i.value=""),a&&(a.value=""),e&&(e.value="");const g=document.getElementById("training-custom-field-wrap");g&&(g.style.display="none"),this.loadTrainingAnalysisItemsUI(),this.updateTrainingAnalysisResults()},toggleTrainingAnalysisItem(t,e){if(!this.isCurrentUserAdmin())return;const a=this.getTrainingAnalysisStorageKeys();let i=[];try{i=JSON.parse(localStorage.getItem(a.items)||"[]")||[]}catch{i=[]}const n=(Array.isArray(i)?i:[]).find(o=>o.id===t);if(n){n.enabled=e;try{localStorage.setItem(a.items,JSON.stringify(i)),this.updateTrainingAnalysisResults()}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0627\u0644\u0628\u0646\u062F:",o)}}},removeTrainingAnalysisItem(t){if(!this.isCurrentUserAdmin()){Notification?.error?.("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u062D\u0644\u064A\u0644");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0646\u062F\u061F"))return;const e=this.getTrainingAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(e.items)||"[]")||[]}catch{a=[]}const i=(Array.isArray(a)?a:[]).filter(n=>n.id!==t);try{localStorage.setItem(e.items,JSON.stringify(i)),Notification?.success?.("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D")}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F:",n),Notification?.error?.("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0628\u0646\u062F: "+(n.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}this.loadTrainingAnalysisItemsUI(),this.updateTrainingAnalysisResults()},getAnalysisDateFilter(){const t=document.getElementById("training-analysis-filter-type"),e=document.getElementById("training-analysis-month"),a=document.getElementById("training-analysis-date-from"),i=document.getElementById("training-analysis-date-to"),n=t&&t.value?t.value:"all",o=e&&e.value?String(e.value).trim():"",r=a&&a.value?String(a.value).trim():"",s=i&&i.value?String(i.value).trim():"";return{type:n||"all",month:o,start:r,end:s}},getRecordDateForFilter(t,e){if(!t||typeof t!="object")return null;const a=e==="training"?t.startDate||t.date||t.createdAt:e==="contractorTrainings"?t.date||t.trainingDate||t.createdAt:e==="trainingAttendance"?t.date||t.attendanceDate||t.createdAt:t.date||t.createdAt;if(!a)return null;const i=new Date(a);return Number.isNaN(i.getTime())?null:i},filterRecordsByAnalysisDate(t,e,a){return!Array.isArray(t)||!e||e.type==="all"?t:t.filter(n=>{const o=this.getRecordDateForFilter(n,a);if(!o)return!1;if(e.type==="month"&&e.month)return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}`===e.month;if(e.type==="range"&&(e.start||e.end)){const r=o.getTime();if(e.start){const s=new Date(e.start);if(!Number.isNaN(s.getTime())&&r<s.getTime())return!1}if(e.end){const s=new Date(e.end);if(!Number.isNaN(s.getTime())&&r>s.getTime())return!1}return!0}return!0})},getTrainingDatasetForAnalysis(t){this.ensureData();let e=[];switch(t){case"training":e=Array.isArray(AppState.appData.training)?AppState.appData.training:[];break;case"contractorTrainings":e=Array.isArray(AppState.appData.contractorTrainings)?AppState.appData.contractorTrainings:[];break;case"trainingAttendance":e=Array.isArray(AppState.appData.trainingAttendance)?AppState.appData.trainingAttendance:[];break;default:return[]}const a=this.getAnalysisDateFilter();return this.filterRecordsByAnalysisDate(e,a,t)},_trainingAnalysisFieldBucketsByMonth(t,e){const i={training:["startDate","endDate","date","createdAt"],contractorTrainings:["date","createdAt","trainingDate"],trainingAttendance:["date","createdAt","attendanceDate"]}[t];return Array.isArray(i)&&i.includes(e)},getTrainingAnalysisValue(t,e,a){if(!a||typeof a!="object")return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";if(e==="byMonth"){const o=t==="training"?a.startDate||a.createdAt||a.date:t==="contractorTrainings"?a.date||a.createdAt||a.trainingDate:t==="trainingAttendance"?a.date||a.createdAt||a.attendanceDate:a.createdAt||a.date||"";if(!o)return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const r=new Date(o);return isNaN(r.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`}if(this._trainingAnalysisFieldBucketsByMonth(t,e)){const o=a[e];if(o==null||o==="")return"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const r=new Date(o);return Number.isNaN(r.getTime())?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`}if(t==="training"&&(e==="trainerName"||e==="trainer")){const o=a.trainer||a.trainerName||a.conductedBy,r=o==null||o===""?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":String(o).trim();return r&&r!=="null"&&r!=="undefined"?r:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}const i=a[e],n=i==null||i===""?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":String(i).trim();return n&&n!=="null"&&n!=="undefined"?n:"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},analyzeTrainingByItem(t){const e=t.dataset,a=t.field,i=this.getTrainingDatasetForAnalysis(e),n={};let o=0;return i.forEach(r=>{const s=this.getTrainingAnalysisValue(e,a,r);n[s]=(n[s]||0)+1,o++}),Object.entries(n).map(([r,s])=>({label:r,count:s,percentage:o>0?(s/o*100).toFixed(1):"0.0"})).sort((r,s)=>s.count-r.count)},async updateTrainingAnalysisResults(){const t=document.getElementById("training-analysis-results");if(!t)return;const e=this.getTrainingAnalysisStorageKeys();let a=[];try{a=JSON.parse(localStorage.getItem(e.items)||"[]")||[]}catch{a=[]}const i=a.filter(r=>r.enabled);if(i.length===0){const r=t.querySelector(".card-body");r&&(r.innerHTML=`
                    <div class="empty-state">
                        <p class="text-gray-500">\u0642\u0645 \u0628\u062A\u0641\u0639\u064A\u0644/\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u0648\u062F \u0644\u0644\u062A\u062D\u0644\u064A\u0644 \u0644\u0639\u0631\u0636 \u0627\u0644\u0646\u062A\u0627\u0626\u062C.</p>
                    </div>
                `);return}let n="";for(let r=0;r<i.length;r++){const s=i[r],l=this.analyzeTrainingByItem(s);if(!l||l.length===0){n+=`
                    <div class="content-card mb-6" style="border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(15,23,42,0.06);">
                        <div class="card-header" style="background:linear-gradient(135deg,#f8fafc,#f1f5f9);border-bottom:1px solid #e2e8f0;">
                            <h3 class="card-title"><i class="fas fa-chart-bar ml-2 text-slate-600"></i>${Utils.escapeHTML(s.label)}</h3>
                        </div>
                        <div class="card-body">
                            <p class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062A\u0627\u062D\u0629</p>
                        </div>
                    </div>
                `;continue}const c=l.map(({label:g,count:f,percentage:u})=>`
                <tr>
                    <td class="font-semibold">${Utils.escapeHTML(g)}</td>
                    <td class="text-center font-bold text-indigo-600">${f}</td>
                    <td class="text-center text-gray-600">${u}%</td>
                </tr>
            `).join(""),d=`training-chart-${s.id}-${r}`,p=`training-chart-container-${s.id}-${r}`;n+=`
                <div class="content-card mb-6" style="border:1px solid #e0e7ff;border-radius:16px;overflow:hidden;box-shadow:0 8px 28px rgba(79,70,229,0.08);">
                    <div class="card-header" style="background:linear-gradient(135deg,#eef2ff 0%,#faf5ff 100%);border-bottom:1px solid #e0e7ff;">
                        <h3 class="card-title"><i class="fas fa-chart-pie ml-2 text-indigo-600"></i>${Utils.escapeHTML(s.label)}</h3>
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
                                    ${c}
                                </tbody>
                            </table>
                        </div>
                        <div id="${p}" class="rounded-xl border border-indigo-100 bg-white p-2 shadow-sm" style="position: relative; height: 350px;">
                            <canvas id="${d}"></canvas>
                        </div>
                    </div>
                </div>
            `}const o=t.querySelector(".card-body");o&&(o.innerHTML=n),setTimeout(async()=>{await this.ensureChartJSLoaded(),this.renderTrainingAnalysisCharts(i)},300)},renderAnalysisCardsHtml(t){const e=this.loadTrainingInfoCards().filter(i=>i.enabled!==!1),a={blue:"bg-blue-100 text-blue-600",green:"bg-green-100 text-green-600",purple:"bg-purple-100 text-purple-600",amber:"bg-amber-100 text-amber-600",red:"bg-red-100 text-red-600",indigo:"bg-indigo-100 text-indigo-600",teal:"bg-teal-100 text-teal-600",orange:"bg-orange-100 text-orange-600",pink:"bg-pink-100 text-pink-600"};return(!t||typeof t!="object")&&(t=this.calculateTrainingMetrics()),e.map(i=>{let n=t[i.metric];return n==null&&(n=0),typeof n=="string"&&n.trim()===""&&(n=0),typeof n=="number"&&n>=1e3&&(n=n.toLocaleString("en-US")),`<div class="content-card"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-xl ${a[i.color]||"bg-gray-100 text-gray-600"} flex items-center justify-center shadow-sm"><i class="${i.icon} text-2xl"></i></div><div class="flex-1"><p class="text-sm text-gray-500 mb-1">${Utils.escapeHTML(i.title)}</p><p class="text-2xl font-bold text-gray-900" dir="ltr">${Utils.escapeHTML(String(n))}</p>${i.description?`<p class="text-xs text-gray-400 mt-1">${Utils.escapeHTML(i.description)}</p>`:""}</div></div></div>`}).join("")||'<p class="text-center text-gray-500 col-span-full">\u0644\u0627 \u062A\u0648\u062C\u062F \u0643\u0631\u0648\u062A \u0645\u0641\u0639\u0644\u0629</p>'},refreshAnalysisTabContent(){this.refreshAnalysisCards(),this.updateTrainingAnalysisResults(),this.refreshAnalysisPeriodReports()},refreshAnalysisCards(){const t=document.getElementById("training-analysis-cards-container");if(!t)return;const e=this.calculateTrainingMetrics();t.innerHTML=this.renderAnalysisCardsHtml(e)},bindAnalysisFilterEvents(){const t=document.getElementById("training-analysis-filter-type"),e=document.getElementById("training-analysis-month-wrap"),a=document.getElementById("training-analysis-date-from-wrap"),i=document.getElementById("training-analysis-date-to-wrap"),n=document.getElementById("training-analysis-month"),o=document.getElementById("training-analysis-date-from"),r=document.getElementById("training-analysis-date-to"),s=()=>{const c=t&&t.value?t.value:"all";e&&(e.style.display=c==="month"?"block":"none"),a&&(a.style.display=c==="range"?"block":"none"),i&&(i.style.display=c==="range"?"block":"none")},l=()=>this.refreshAnalysisTabContent();t&&!t.dataset.trainingAnalysisFilterBound&&(t.addEventListener("change",()=>{s(),l()}),t.dataset.trainingAnalysisFilterBound="1"),n&&!n.dataset.trainingAnalysisFilterBound&&(n.addEventListener("change",l),n.dataset.trainingAnalysisFilterBound="1"),o&&!o.dataset.trainingAnalysisFilterBound&&(o.addEventListener("change",l),o.dataset.trainingAnalysisFilterBound="1"),r&&!r.dataset.trainingAnalysisFilterBound&&(r.addEventListener("change",l),r.dataset.trainingAnalysisFilterBound="1"),s()},getAnalysisPeriodExportSlug(){const t=this.getAnalysisDateFilter();if(!t||t.type==="all")return"all";if(t.type==="month"&&t.month)return`month_${String(t.month).replace(/[^\d-]/g,"")}`;if(t.type==="range"){const e=String(t.start||"").replace(/[^\d-]/g,""),a=String(t.end||"").replace(/[^\d-]/g,"");if(e||a)return`range_${e||"x"}_${a||"x"}`}return"filtered"},getAnalysisPeriodLabelAr(){const t=this.getAnalysisDateFilter();if(!t||t.type==="all")return"\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A";if(t.type==="month"&&t.month){const e=String(t.month).split("-"),a=e[0],i=parseInt(e[1],10),n=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];return a&&i>=1&&i<=12?`${n[i-1]} ${a}`:String(t.month)}if(t.type==="range"){const e=t.start?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(t.start):t.start:"\u2014",a=t.end?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(t.end):t.end:"\u2014";return`\u0645\u0646 ${e} \u0625\u0644\u0649 ${a}`}return"\u0641\u062A\u0631\u0629 \u0645\u062D\u062F\u062F\u0629"},_getExportDateFilterFromAnalysisDom(){const t=document.getElementById("training-export-period-mode");if((t?t.value:"follow")!=="custom")return this.getAnalysisDateFilter();const a=document.getElementById("training-export-from")?.value?.trim()||"",i=document.getElementById("training-export-to")?.value?.trim()||"";return!a&&!i?this.getAnalysisDateFilter():{type:"range",month:"",start:a,end:i}},getExportDateFilterForReports(){return this._analysisExportContext&&this._analysisExportContext.dateFilter?this._analysisExportContext.dateFilter:this._getExportDateFilterFromAnalysisDom()},_toggleTrainingExportCustomDates(){const t=document.getElementById("training-export-period-mode")?.value||"follow",e=document.getElementById("training-export-custom-dates");e&&(e.style.display=t==="custom"?"flex":"none")},_isAttendanceContractorLike(t){if(!t||typeof t!="object")return!1;const e=String(t.personType||t.participantType||t.type||"").toLowerCase();return e==="contractor"||e==="external"||String(t.trainingType||"").trim()==="\u062E\u0627\u0631\u062C\u064A"&&!String(t.employeeCode||t.code||t.employeeNumber||"").trim()},_attendancePersonRowKey(t){if(!t||typeof t!="object")return"n:\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";const e=String(t.employeeCode||t.code||t.employeeNumber||"").trim(),a=String(t.employeeName||t.name||"").trim();return e?`c:${e}`:a?`n:${a}`:"n:\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},_attendanceRecordDepartmentLabel(t){return!t||typeof t!="object"?"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F":String(t.department??"").replace(/\s+/g," ").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},getTrainingRecordsForReportsFiltered(){this.ensureData();let t=Array.isArray(AppState.appData.training)?AppState.appData.training:[];const e=this.getExportDateFilterForReports();t=this.filterRecordsByAnalysisDate(t,e,"training");const a=this._analysisExportContext,i=a?String(a.trainerKey||"").trim():document.getElementById("training-export-trainer-key")?.value?.trim()||"";return i&&(t=t.filter(n=>this.getTrainingAnalysisValue("training","trainer",n)===i)),t},getAttendanceRecordsForReportsFiltered(){this.ensureData();let t=Array.isArray(AppState.appData.trainingAttendance)?AppState.appData.trainingAttendance:[];const e=this.getExportDateFilterForReports();t=this.filterRecordsByAnalysisDate(t,e,"trainingAttendance");const a=this._analysisExportContext,i=a?a.audience||"all":document.getElementById("training-export-audience")?.value||"all";i==="employee"?t=t.filter(r=>!this._isAttendanceContractorLike(r)):i==="contractor"&&(t=t.filter(r=>this._isAttendanceContractorLike(r)));const n=a?String(a.personKey||"").trim():document.getElementById("training-export-person-key")?.value?.trim()||"";n&&(t=t.filter(r=>this._attendancePersonRowKey(r)===n));const o=a&&a.attendanceDepartment?String(a.attendanceDepartment).trim():"";return o&&(t=t.filter(r=>this._attendanceRecordDepartmentLabel(r)===o)),t},getExportPeriodLabelAr(){const t=this.getExportDateFilterForReports();if(!t||t.type==="all")return"\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A";if(t.type==="month"&&t.month){const e=String(t.month).split("-"),a=e[0],i=parseInt(e[1],10),n=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];return a&&i>=1&&i<=12?`${n[i-1]} ${a}`:String(t.month)}if(t.type==="range"){const e=t.start?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(t.start):t.start:"\u2014",a=t.end?typeof Utils<"u"&&Utils.formatDate?Utils.formatDate(t.end):t.end:"\u2014";return`\u0645\u0646 ${e} \u0625\u0644\u0649 ${a}`}return"\u0641\u062A\u0631\u0629 \u0645\u062D\u062F\u062F\u0629"},getAnalysisPeriodExportSlugFromFilter(t){if(!t||t.type==="all")return"all";if(t.type==="month"&&t.month)return`month_${String(t.month).replace(/[^\d-]/g,"")}`;if(t.type==="range"){const e=String(t.start||"").replace(/[^\d-]/g,""),a=String(t.end||"").replace(/[^\d-]/g,"");if(e||a)return`range_${e||"x"}_${a||"x"}`}return"filtered"},getExportPeriodExportSlug(){return this.getAnalysisPeriodExportSlugFromFilter(this.getExportDateFilterForReports())},populateTrainingExportFilterSelects(){const t=document.getElementById("training-export-person-key"),e=document.getElementById("training-export-trainer-key");if(t){const a=t.value;let i=Array.isArray(AppState.appData.trainingAttendance)?AppState.appData.trainingAttendance:[];const n=this.getExportDateFilterForReports();i=this.filterRecordsByAnalysisDate(i,n,"trainingAttendance");const o=document.getElementById("training-export-audience")?.value||"all";o==="employee"?i=i.filter(l=>!this._isAttendanceContractorLike(l)):o==="contractor"&&(i=i.filter(l=>this._isAttendanceContractorLike(l)));const r=new Map;i.forEach(l=>{const c=this._attendancePersonRowKey(l);if(r.has(c))return;const d=String(l.employeeCode||l.code||l.employeeNumber||"").trim(),p=String(l.employeeName||l.name||"").trim(),g=p?d?`${p} (${d})`:p:d||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r.set(c,g)});const s=Array.from(r.entries()).sort((l,c)=>String(l[1]).localeCompare(String(c[1]),"ar"));t.innerHTML='<option value="">\u2014 \u0643\u0644 \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u2014</option>'+s.map(([l,c])=>`<option value="${Utils.escapeHTML(l)}">${Utils.escapeHTML(c)}</option>`).join(""),a&&r.has(a)&&(t.value=a)}if(e){const a=e.value;let i=Array.isArray(AppState.appData.training)?AppState.appData.training:[];const n=this.getExportDateFilterForReports();i=this.filterRecordsByAnalysisDate(i,n,"training");const o=new Set;i.forEach(s=>o.add(this.getTrainingAnalysisValue("training","trainer",s)));const r=Array.from(o).filter(s=>s&&s!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").sort((s,l)=>String(s).localeCompare(String(l),"ar"));e.innerHTML='<option value="">\u2014 \u0643\u0644 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u2014</option>'+r.map(s=>`<option value="${Utils.escapeHTML(s)}">${Utils.escapeHTML(s)}</option>`).join(""),a&&r.includes(a)&&(e.value=a)}},_buildPrintableBarChartHtml(t,e,a){if(!e||!e.length)return"";const i=Math.max(...e.map(o=>Number(o.value)||0),1),n=e.map(o=>{const r=Number(o.value)||0,s=Math.round(r/i*100);return`
                <div style="display:flex;align-items:center;margin-bottom:8px;gap:10px;direction:rtl;">
                    <div style="min-width:100px;max-width:140px;font-size:10px;text-align:right;word-break:break-word;">${Utils.escapeHTML(String(o.label))}</div>
                    <div style="flex:1;background:#f1f5f9;height:20px;border-radius:6px;overflow:hidden;">
                        <div style="width:${s}%;background:${a};height:100%;min-width:${r>0?"4px":"0"};"></div>
                    </div>
                    <div style="width:36px;font-size:11px;font-weight:700;text-align:left;">${r}</div>
                </div>`}).join("");return`
            <div style="margin:20px 0;padding:16px;border:1px solid #e2e8f0;border-radius:12px;background:#fafafa;">
                <div style="font-size:14px;font-weight:800;margin-bottom:12px;color:#0f172a;">${Utils.escapeHTML(t)}</div>
                ${n}
            </div>`},_buildTrainerMonthlyChartItems(t){const e={};return t.forEach(a=>{const i=this.getRecordDateForFilter(a,"training");if(!i)return;const n=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`;e[n]=(e[n]||0)+1}),Object.keys(e).sort().map(a=>({label:a,value:e[a]}))},_buildAttendanceMonthlyChartItems(t){const e={};return t.forEach(a=>{const i=this.getRecordDateForFilter(a,"trainingAttendance");if(!i)return;const n=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`;e[n]=(e[n]||0)+1}),Object.keys(e).sort().map(a=>({label:a,value:e[a]}))},_buildAttendanceTopicChartItems(t){const e={};return t.forEach(a=>{const i=String(a.topic||a.trainingTopic||"\u2014").trim()||"\u2014";e[i]=(e[i]||0)+1}),Object.entries(e).map(([a,i])=>({label:a,value:i})).sort((a,i)=>i.value-a.value).slice(0,12)},buildTrainerProgramsReportRows(){const t=this.getTrainingRecordsForReportsFiltered(),e={};return t.forEach(a=>{const i=this.getTrainingAnalysisValue("training","trainer",a);e[i]||(e[i]={trainer:i,programs:0,participants:0,hoursTotal:0}),e[i].programs+=1,e[i].participants+=this.getParticipantsCount(a),e[i].hoursTotal+=this.getTrainingProgramHours(a)}),Object.values(e).sort((a,i)=>i.programs-a.programs||i.hoursTotal-a.hoursTotal||i.participants-a.participants||String(a.trainer).localeCompare(String(i.trainer),"ar"))},buildAttendancePersonsReportRows(){const t=this.getAttendanceRecordsForReportsFiltered(),e={};return t.forEach(a=>{if(!a||typeof a!="object")return;const i=this._attendancePersonRowKey(a),n=String(a.employeeCode||a.code||a.employeeNumber||"").trim(),o=String(a.employeeName||a.name||"").trim(),r=o?n?`${o} (${n})`:o:n||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";e[i]||(e[i]={person:r,sessions:0,totalHours:0}),e[i].sessions+=1;const s=parseFloat(a.totalHours);e[i].totalHours+=Number.isFinite(s)?s:0}),Object.values(e).sort((a,i)=>i.sessions-a.sessions||i.totalHours-a.totalHours||String(a.person).localeCompare(String(i.person),"ar"))},_destroyAnalysisPeriodCharts(){this._analysisPeriodCharts&&Object.values(this._analysisPeriodCharts).forEach(t=>{t&&typeof t.destroy=="function"&&t.destroy()}),this._analysisPeriodCharts={}},async refreshAnalysisPeriodReports(){const t=document.getElementById("training-analysis-trainers-tbody"),e=document.getElementById("training-analysis-attendees-tbody"),a=document.getElementById("training-analysis-trainers-chart"),i=document.getElementById("training-analysis-attendees-chart");if(!t||!e)return;this._toggleTrainingExportCustomDates(),this.populateTrainingExportFilterSelects();const n=Math.min(500,Math.max(1,parseInt(document.getElementById("training-analysis-trainer-limit")?.value||"30",10)||30)),o=Math.min(2e3,Math.max(1,parseInt(document.getElementById("training-analysis-attendees-limit")?.value||"50",10)||50)),r=this.buildTrainerProgramsReportRows(),s=this.buildAttendancePersonsReportRows(),l=r.slice(0,n),c=s.slice(0,o);if(l.length===0?t.innerHTML='<tr><td colspan="4" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0631\u0627\u0645\u062C \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629</td></tr>':t.innerHTML=l.map(g=>`
                <tr>
                    <td class="font-medium">${Utils.escapeHTML(g.trainer)}</td>
                    <td class="text-center font-bold text-indigo-600">${g.programs}</td>
                    <td class="text-center text-gray-700">${g.participants}</td>
                    <td class="text-center text-gray-800 font-semibold" dir="ltr">${Number.isFinite(g.hoursTotal)?g.hoursTotal.toFixed(2):"0.00"}</td>
                </tr>
            `).join(""),c.length===0?e.innerHTML='<tr><td colspan="3" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062D\u0636\u0648\u0631 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629</td></tr>':e.innerHTML=c.map(g=>`
                <tr>
                    <td class="font-medium">${Utils.escapeHTML(g.person)}</td>
                    <td class="text-center font-bold text-teal-600">${g.sessions}</td>
                    <td class="text-center text-gray-700">${Number.isFinite(g.totalHours)?g.totalHours.toFixed(2):"0.00"}</td>
                </tr>
            `).join(""),await this.ensureChartJSLoaded(),typeof Chart>"u")return;this._destroyAnalysisPeriodCharts();const d=(g,f,u,m,y)=>{if(!g||!f.length)return;const x=g.parentElement;x&&(x.style.display=f.length?"block":"none");try{this._analysisPeriodCharts[g.id]=new Chart(g,{type:"bar",data:{labels:f,datasets:[{label:m,data:u,backgroundColor:y.slice(0,f.length)}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{precision:0}},x:{ticks:{maxRotation:45,minRotation:0,autoSkip:!0,maxTicksLimit:16}}}}})}catch(b){Utils.safeError("\u062E\u0637\u0623 \u0631\u0633\u0645 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0641\u062A\u0631\u0629:",b)}},p=this.getChartColors(Math.max(l.length,c.length,10)).map(g=>g.replace("0.6","0.75"));a&&(l.length===0?a.parentElement.style.display="none":(a.parentElement.style.display="block",d(a,l.map(g=>g.trainer),l.map(g=>g.programs),"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C",p))),i&&(c.length===0?i.parentElement.style.display="none":(i.parentElement.style.display="block",d(i,c.map(g=>g.person),c.map(g=>g.sessions),"\u0639\u062F\u062F \u0627\u0644\u062C\u0644\u0633\u0627\u062A",p)))},bindAnalysisPeriodReportsEvents(){const t=document.getElementById("training-analysis-period-reports");if(!t||t.dataset.bound==="1")return;t.dataset.bound="1";const e=document.getElementById("training-analysis-trainer-limit"),a=document.getElementById("training-analysis-attendees-limit"),i=document.getElementById("training-analysis-export-trainers-open"),n=document.getElementById("training-analysis-export-attendees-open"),o=(u,m)=>{let y;return()=>{clearTimeout(y),y=setTimeout(u,m)}},r=o(()=>this.refreshAnalysisPeriodReports(),350);e&&e.addEventListener("change",()=>this.refreshAnalysisPeriodReports()),a&&a.addEventListener("change",()=>this.refreshAnalysisPeriodReports()),e&&e.addEventListener("input",r),a&&a.addEventListener("input",r),i&&i.addEventListener("click",()=>this.showTrainingAnalysisExportDialog("trainers")),n&&n.addEventListener("click",()=>this.showTrainingAnalysisExportDialog("attendees"));const s=document.getElementById("training-export-period-mode"),l=document.getElementById("training-export-from"),c=document.getElementById("training-export-to"),d=document.getElementById("training-export-audience"),p=document.getElementById("training-export-person-key"),g=document.getElementById("training-export-trainer-key"),f=o(()=>this.refreshAnalysisPeriodReports(),320);s&&!s.dataset.exportBound&&(s.addEventListener("change",()=>{this._toggleTrainingExportCustomDates(),f()}),s.dataset.exportBound="1"),[l,c,d].forEach(u=>{u&&!u.dataset.exportBound&&(u.addEventListener("change",f),u.dataset.exportBound="1")}),p&&!p.dataset.exportBound&&(p.addEventListener("change",f),p.dataset.exportBound="1"),g&&!g.dataset.exportBound&&(g.addEventListener("change",f),g.dataset.exportBound="1")},exportAnalysisTrainersExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629");return}const t=this._analysisExportContext,e=t&&typeof t.limitTrainers=="number"?Math.min(500,Math.max(1,t.limitTrainers)):Math.min(500,Math.max(1,parseInt(document.getElementById("training-analysis-trainer-limit")?.value||"30",10)||30)),a=this.buildTrainerProgramsReportRows().slice(0,e);if(!a.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629");return}const i=this.getExportPeriodExportSlug(),n=a.map(l=>({"\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0631\u0628":l.trainer,"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629":l.programs,"\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646":l.participants,"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":Number.isFinite(l.hoursTotal)?Number(l.hoursTotal.toFixed(2)):0})),o=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(n);if(XLSX.utils.book_append_sheet(o,r,"\u0627\u0644\u0645\u062F\u0631\u0628\u0648\u0646"),t?String(t.trainerKey||"").trim():document.getElementById("training-export-trainer-key")?.value?.trim()||""){const l=this.getTrainingRecordsForReportsFiltered().map((c,d)=>({\u0645:d+1,\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C:c.name||c.subject||c.topic||"\u2014","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621":c.startDate?Utils.formatDate?Utils.formatDate(c.startDate):c.startDate:"\u2014",\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646:this.getParticipantsCount(c),"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":this.getTrainingProgramHours(c),\u0627\u0644\u062D\u0627\u0644\u0629:c.status||"\u2014"}));l.length&&XLSX.utils.book_append_sheet(o,XLSX.utils.json_to_sheet(l),"\u0628\u0631\u0627\u0645\u062C_\u0627\u0644\u0645\u062F\u0631\u0628")}XLSX.writeFile(o,`\u062A\u0642\u0631\u064A\u0631_\u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646_${i}_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646")},exportAnalysisAttendeesExcel(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629");return}const t=this._analysisExportContext,e=t&&typeof t.limitAttendees=="number"?Math.min(2e3,Math.max(1,t.limitAttendees)):Math.min(2e3,Math.max(1,parseInt(document.getElementById("training-analysis-attendees-limit")?.value||"50",10)||50)),a=this.buildAttendancePersonsReportRows().slice(0,e);if(!a.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629");return}const i=this.getExportPeriodExportSlug(),n=a.map(l=>({\u0627\u0644\u0634\u062E\u0635:l.person,"\u0639\u062F\u062F \u062C\u0644\u0633\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":l.sessions,"\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0633\u0627\u0639\u0627\u062A":Number.isFinite(l.totalHours)?l.totalHours.toFixed(2):"0.00"})),o=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(n);if(XLSX.utils.book_append_sheet(o,r,"\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u0648\u0646"),t?String(t.personKey||"").trim():document.getElementById("training-export-person-key")?.value?.trim()||""){const l=this.getAttendanceRecordsForReportsFiltered().map((c,d)=>({\u0645:d+1,\u0627\u0644\u062A\u0627\u0631\u064A\u062E:c.date?Utils.formatDate?Utils.formatDate(c.date):c.date:"",\u0627\u0644\u0645\u0648\u0636\u0648\u0639:c.topic||"\u2014","\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628":c.trainingType||"\u2014",\u0627\u0644\u0625\u062F\u0627\u0631\u0629:this._attendanceRecordDepartmentLabel(c),\u0627\u0644\u0645\u0635\u0646\u0639:c.factoryName||c.factory||"",\u0627\u0644\u0645\u062D\u0627\u0636\u0631:c.trainerName||c.trainer||"",\u0627\u0644\u0633\u0627\u0639\u0627\u062A:Number.isFinite(parseFloat(c.totalHours))?parseFloat(c.totalHours).toFixed(2):"0.00"}));l.length&&XLSX.utils.book_append_sheet(o,XLSX.utils.json_to_sheet(l),"\u062A\u0641\u0635\u064A\u0644_\u0627\u0644\u062C\u0644\u0633\u0627\u062A")}XLSX.writeFile(o,`\u062A\u0642\u0631\u064A\u0631_\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646_${i}_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646")},_analysisPeriodPdfTableRows(t){return t.map((e,a)=>`
                <tr style="${a%2===0?"background-color: #FFFFFF;":"background-color: #F9FAFB;"}">
                    ${e.map(i=>`<td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px; line-height: 1.5;">${Utils.escapeHTML(String(i))}</td>`).join("")}
                </tr>
            `).join("")},exportAnalysisTrainersPDF(t="download"){const e=this._analysisExportContext,a=e&&typeof e.limitTrainers=="number"?Math.min(500,Math.max(1,e.limitTrainers)):Math.min(500,Math.max(1,parseInt(document.getElementById("training-analysis-trainer-limit")?.value||"30",10)||30)),i=this.buildTrainerProgramsReportRows().slice(0,a);if(!i.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629");return}Loading.show(t==="download"?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 (PDF)...":"\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u0644\u0644\u0637\u0628\u0627\u0639\u0629...");const n=this.getExportPeriodLabelAr(),o=this.getExportPeriodExportSlug(),r=e?String(e.trainerKey||"").trim():document.getElementById("training-export-trainer-key")?.value?.trim()||"",s=["\u0645","\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0631\u0628","\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629","\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646","\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628"],l=i.map((g,f)=>[f+1,g.trainer,g.programs,g.participants,Number.isFinite(g.hoursTotal)?g.hoursTotal.toFixed(2):"0.00"]),c=this._analysisPeriodPdfTableRows(l);let d="";if(r){const g=this.getTrainingRecordsForReportsFiltered(),f=this._buildTrainerMonthlyChartItems(g);f.length&&(d+=this._buildPrintableBarChartHtml(`\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631 \u2014 ${r}`,f,"#4f46e5"))}const p=`
                <div style="margin-bottom: 20px;">
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #EEF2FF; border: 1px solid #C7D2FE;">
                            <div style="font-size: 12px; color: #4338CA; font-weight: 600;">\u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
                            <div style="font-size: 15px; font-weight: 700; color: #312E81;">${Utils.escapeHTML(n)}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #ECFDF5; border: 1px solid #BBF7D0;">
                            <div style="font-size: 12px; color: #047857; font-weight: 600;">\u0639\u062F\u062F \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u0641\u064A \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
                            <div style="font-size: 22px; font-weight: 800; color: #065F46;">${i.length}</div>
                        </div>
                        ${r?`<div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #FEF3C7; border: 1px solid #FCD34D;">
                            <div style="font-size: 12px; color: #B45309; font-weight: 600;">\u0645\u062F\u0631\u0628 \u0645\u062D\u062F\u062F</div>
                            <div style="font-size: 15px; font-weight: 700; color: #92400E;">${Utils.escapeHTML(r)}</div>
                        </div>`:""}
                    </div>
                </div>
                <div style="margin-bottom: 16px;">
                    <h2 style="font-size: 18px; margin-bottom: 12px; color: #312E81; font-weight: 700; border-bottom: 3px solid #4F46E5; padding-bottom: 8px;">\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646 \u0648\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C</h2>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 11px; direction: rtl;">
                            <thead>
                                <tr style="background: #312E81; color: #FFFFFF;">
                                    ${s.map(g=>`<th style="padding: 12px 8px; border: 1px solid #1E1B4B; font-weight: 700;">${Utils.escapeHTML(g)}</th>`).join("")}
                                </tr>
                            </thead>
                            <tbody>${c}</tbody>
                        </table>
                    </div>
                </div>
                ${d}
                <p style="font-size: 11px; color: #6B7280;">\u064A\u064F\u062D\u0633\u0628 \u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0645\u0646 \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0636\u0645\u0646 \u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631. \xAB\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646\xBB \u0647\u0648 \u0645\u062C\u0645\u0648\u0639 \u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646 \u0641\u064A \u062A\u0644\u0643 \u0627\u0644\u0628\u0631\u0627\u0645\u062C.</p>

                <div class="signatures-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 24px; direction: rtl;">
                    <div class="sig-card" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc; text-align: center;">
                        <div style="font-weight: 700; color: #1e293b; font-size: 12px; margin-bottom: 4px;">\u0625\u0639\u062F\u0627\u062F \u0648\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A</div>
                        <div style="font-size: 11px; color: #475569; margin-bottom: 24px;">\u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0643\u0641\u0627\u0621\u0627\u062A</div>
                        <div style="border-top: 1px dashed #94a3b8; padding-top: 6px; font-size: 10px; color: #64748b;">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                    </div>
                    <div class="sig-card" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc; text-align: center;">
                        <div style="font-weight: 700; color: #1e293b; font-size: 12px; margin-bottom: 4px;">\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u062A\u062D\u0642\u0642</div>
                        <div style="font-size: 11px; color: #475569; margin-bottom: 24px;">\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                        <div style="border-top: 1px dashed #94a3b8; padding-top: 6px; font-size: 10px; color: #64748b;">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                    </div>
                    <div class="sig-card" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc; text-align: center;">
                        <div style="font-weight: 700; color: #1e293b; font-size: 12px; margin-bottom: 4px;">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0646\u0647\u0627\u0626\u064A</div>
                        <div style="font-size: 11px; color: #475569; margin-bottom: 24px;">\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                        <div style="border-top: 1px dashed #94a3b8; padding-top: 6px; font-size: 10px; color: #64748b;">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062E\u062A\u0645 \u0627\u0644\u0631\u0633\u0645\u064A</div>
                    </div>
                </div>
            `;this._openTrainingAttendancePrint(p,{formCode:"DOC-HSE-TRN-KPI-01",docTitle:"\u062A\u0642\u0631\u064A\u0631 \u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0628\u064A\u0646",downloadDirect:t==="download",meta:{period:n,rowCount:i.length,reportType:"training_analysis_trainers"},successMessage:t==="download"?`\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 ${i.length} \u0645\u062F\u0631\u0628 \u0628\u0646\u062C\u0627\u062D`:`\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u062A\u0642\u0631\u064A\u0631 ${i.length} \u0645\u062F\u0631\u0628 \u0644\u0644\u0637\u0628\u0627\u0639\u0629`})},exportAnalysisAttendeesPDF(t="download"){const e=this._analysisExportContext,a=e&&typeof e.limitAttendees=="number"?Math.min(2e3,Math.max(1,e.limitAttendees)):Math.min(2e3,Math.max(1,parseInt(document.getElementById("training-analysis-attendees-limit")?.value||"50",10)||50)),i=this.buildAttendancePersonsReportRows().slice(0,a);if(!i.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629");return}Loading.show(t==="download"?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 (PDF)...":"\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u0644\u0644\u0637\u0628\u0627\u0639\u0629...");const n=this.getExportPeriodLabelAr(),o=this.getExportPeriodExportSlug(),r=e&&e.audience?e.audience:document.getElementById("training-export-audience")?.value||"all",s={all:"\u0627\u0644\u0643\u0644",employee:"\u0645\u0648\u0638\u0641\u0648\u0646 \u0641\u0642\u0637",contractor:"\u0645\u0642\u0627\u0648\u0644\u0648\u0646/\u062E\u0627\u0631\u062C\u064A\u0648\u0646"}[r]||r,l=e?String(e.personKey||"").trim():document.getElementById("training-export-person-key")?.value?.trim()||"",c=e&&e.attendanceDepartment?String(e.attendanceDepartment).trim():"",d=this.getAttendanceRecordsForReportsFiltered(),p=["\u0645","\u0627\u0644\u0634\u062E\u0635","\u0639\u062F\u062F \u0627\u0644\u062C\u0644\u0633\u0627\u062A","\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0633\u0627\u0639\u0627\u062A"],g=i.map((y,x)=>[x+1,y.person,y.sessions,Number.isFinite(y.totalHours)?y.totalHours.toFixed(2):"0.00"]),f=this._analysisPeriodPdfTableRows(g);let u="";if(l&&d.length){const y=this._buildAttendanceMonthlyChartItems(d),x=this._buildAttendanceTopicChartItems(d);y.length&&(u+=this._buildPrintableBarChartHtml("\u062C\u0644\u0633\u0627\u062A \u0647\u0630\u0627 \u0627\u0644\u0634\u062E\u0635 \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631",y,"#0d9488")),x.length&&(u+=this._buildPrintableBarChartHtml("\u062D\u0633\u0628 \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629",x,"#14b8a6"));const b=["\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0645\u0648\u0636\u0648\u0639","\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","\u0627\u0644\u0625\u062F\u0627\u0631\u0629","\u0627\u0644\u0645\u062D\u0627\u0636\u0631","\u0627\u0644\u0633\u0627\u0639\u0627\u062A"],I=[...d].sort((h,k)=>new Date(h.date||0)-new Date(k.date||0)).map((h,k)=>[k+1,h.date?Utils.formatDate?Utils.formatDate(h.date):h.date:"",String(h.topic||"\u2014"),String(h.trainingType||"\u2014"),this._attendanceRecordDepartmentLabel(h),String(h.trainerName||h.trainer||"\u2014"),Number.isFinite(parseFloat(h.totalHours))?parseFloat(h.totalHours).toFixed(2):"0.00"]);u+=`
                <h2 style="font-size:17px;margin:24px 0 12px;color:#134E4A;font-weight:700;border-bottom:2px solid #0d9488;padding-bottom:6px;">\u062A\u0641\u0635\u064A\u0644 \u0627\u0644\u062C\u0644\u0633\u0627\u062A \u0644\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u062D\u062F\u062F</h2>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:10px;direction:rtl;">
                        <thead><tr style="background:#115e59;color:#fff;">
                            ${b.map(h=>`<th style="padding:8px;border:1px solid #0f766e;">${Utils.escapeHTML(h)}</th>`).join("")}
                        </tr></thead>
                        <tbody>${this._analysisPeriodPdfTableRows(I)}</tbody>
                    </table>
                </div>`}const m=`
                <div style="margin-bottom: 20px;">
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #F0FDFA; border: 1px solid #99F6E4;">
                            <div style="font-size: 12px; color: #0F766E; font-weight: 600;">\u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
                            <div style="font-size: 15px; font-weight: 700; color: #134E4A;">${Utils.escapeHTML(n)}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #ECFEFF; border: 1px solid #A5F3FC;">
                            <div style="font-size: 12px; color: #0E7490; font-weight: 600;">\u0639\u062F\u062F \u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0641\u064A \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>
                            <div style="font-size: 22px; font-weight: 800; color: #155E75;">${i.length}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #f8fafc; border: 1px solid #e2e8f0;">
                            <div style="font-size: 12px; color: #475569; font-weight: 600;">\u0627\u0644\u0641\u0626\u0629</div>
                            <div style="font-size: 15px; font-weight: 700; color: #1e293b;">${Utils.escapeHTML(s)}</div>
                        </div>
                        ${c?`<div style="flex: 1 1 200px; padding: 12px 16px; border-radius: 8px; background: #fffbeb; border: 1px solid #fde68a;">
                            <div style="font-size: 12px; color: #92400e; font-weight: 600;">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</div>
                            <div style="font-size: 15px; font-weight: 700; color: #78350f;">${Utils.escapeHTML(c)}</div>
                        </div>`:""}
                    </div>
                </div>
                <div style="margin-bottom: 16px;">
                    <h2 style="font-size: 18px; margin-bottom: 12px; color: #134E4A; font-weight: 700; border-bottom: 3px solid #0D9488; padding-bottom: 8px;">\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u2014 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631</h2>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 11px; direction: rtl;">
                            <thead>
                                <tr style="background: #0F766E; color: #FFFFFF;">
                                    ${p.map(y=>`<th style="padding: 12px 8px; border: 1px solid #115E59; font-weight: 700;">${Utils.escapeHTML(y)}</th>`).join("")}
                                </tr>
                            </thead>
                            <tbody>${f}</tbody>
                        </table>
                    </div>
                </div>
                ${u}
                <p style="font-size: 11px; color: #6B7280;">\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0633\u062C\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0641\u0642 \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0641\u062A\u0631\u0629 \u0648\u0627\u0644\u0641\u0626\u0629${c?" \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0629":""} \u0623\u0639\u0644\u0627\u0647.</p>

                <div class="signatures-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 24px; direction: rtl;">
                    <div class="sig-card" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc; text-align: center;">
                        <div style="font-weight: 700; color: #1e293b; font-size: 12px; margin-bottom: 4px;">\u0625\u0639\u062F\u0627\u062F \u0648\u062A\u062F\u0642\u064A\u0642 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</div>
                        <div style="font-size: 11px; color: #475569; margin-bottom: 24px;">\u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0643\u0641\u0627\u0621\u0627\u062A</div>
                        <div style="border-top: 1px dashed #94a3b8; padding-top: 6px; font-size: 10px; color: #64748b;">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                    </div>
                    <div class="sig-card" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc; text-align: center;">
                        <div style="font-weight: 700; color: #1e293b; font-size: 12px; margin-bottom: 4px;">\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u062A\u062D\u0642\u0642</div>
                        <div style="font-size: 11px; color: #475569; margin-bottom: 24px;">\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                        <div style="border-top: 1px dashed #94a3b8; padding-top: 6px; font-size: 10px; color: #64748b;">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                    </div>
                    <div class="sig-card" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc; text-align: center;">
                        <div style="font-weight: 700; color: #1e293b; font-size: 12px; margin-bottom: 4px;">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0646\u0647\u0627\u0626\u064A</div>
                        <div style="font-size: 11px; color: #475569; margin-bottom: 24px;">\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                        <div style="border-top: 1px dashed #94a3b8; padding-top: 6px; font-size: 10px; color: #64748b;">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062E\u062A\u0645 \u0627\u0644\u0631\u0633\u0645\u064A</div>
                    </div>
                </div>
            `;this._openTrainingAttendancePrint(m,{formCode:"DOC-HSE-TRN-KPI-02",docTitle:"\u062A\u0642\u0631\u064A\u0631 \u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646",downloadDirect:t==="download",meta:{period:n,rowCount:i.length,reportType:"training_analysis_attendees",department:c||void 0},successMessage:t==="download"?`\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 ${i.length} \u0645\u062A\u062F\u0631\u0628 \u0628\u0646\u062C\u0627\u062D`:`\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u062A\u0642\u0631\u064A\u0631 ${i.length} \u0645\u062A\u062F\u0631\u0628 \u0644\u0644\u0637\u0628\u0627\u0639\u0629`})},renderTrainingAnalysisCharts(t){if(typeof Chart>"u"){Utils.safeWarn("Chart.js \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0646 \u064A\u062A\u0645 \u0631\u0633\u0645 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629");return}this.trainingAnalysisCharts&&Object.values(this.trainingAnalysisCharts).forEach(e=>{e&&typeof e.destroy=="function"&&e.destroy()}),this.trainingAnalysisCharts={},t.forEach((e,a)=>{const i=`training-chart-${e.id}-${a}`,n=document.getElementById(i);if(!n)return;const o=this.analyzeTrainingByItem(e);if(!o||o.length===0){n.parentElement.innerHTML='<p class="text-center text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0641\u064A\u0629</p>';return}const r=o.map(c=>c.label),s=o.map(c=>c.count),l=e.chartType==="auto"?r.length>5?"bar":"doughnut":e.chartType;try{const c=new Chart(n,{type:l,data:{labels:r,datasets:[{label:e.label,data:s,backgroundColor:this.getChartColors(r.length),borderWidth:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:l==="doughnut"||l==="pie",position:"bottom"}}}});this.trainingAnalysisCharts[i]=c}catch(c){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0633\u0645 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A:",c)}})},getChartColors(t){const e=["rgba(59, 130, 246, 0.6)","rgba(16, 185, 129, 0.6)","rgba(245, 158, 11, 0.6)","rgba(239, 68, 68, 0.6)","rgba(139, 92, 246, 0.6)","rgba(236, 72, 153, 0.6)","rgba(20, 184, 166, 0.6)","rgba(251, 146, 60, 0.6)","rgba(99, 102, 241, 0.6)","rgba(34, 197, 94, 0.6)"],a=[];for(let i=0;i<t;i++)a.push(e[i%e.length]);return a},resetTrainingCardsToDefault(){const t=this.getTrainingAnalysisStorageKeys(),e=this.getTrainingDefaultAnalysisCards();localStorage.setItem(t.cards,JSON.stringify(e)),this.loadTrainingCardsUI(),Notification.success("\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0643\u0631\u0648\u062A \u0644\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")},resetTrainingAnalysisItemsToDefault(){const t=this.getTrainingAnalysisStorageKeys(),e=this.getTrainingDefaultAnalysisItems();localStorage.setItem(t.items,JSON.stringify(e)),this.loadTrainingAnalysisItemsUI(),Notification.success("\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 \u0644\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A")},saveTrainingAnalysisSettings(){try{const t=this.getTrainingAnalysisStorageKeys(),e=this.loadTrainingInfoCards();let a=!1;if(document.querySelectorAll(".training-card-checkbox").forEach(r=>{const s=r.getAttribute("data-card-id"),l=e.find(c=>c.id===s);l&&l.enabled!==r.checked&&(l.enabled=r.checked,a=!0)}),a||e.length>0)try{localStorage.setItem(t.cards,JSON.stringify(e))}catch(r){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0643\u0631\u0648\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",r),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0643\u0631\u0648\u062A: "+(r.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}const i=localStorage.getItem(t.items)||"[]";let n=[];try{const r=JSON.parse(i);n=Array.isArray(r)?r:[]}catch(r){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",r),n=[]}if(document.querySelectorAll(".training-analysis-item-checkbox").forEach(r=>{const s=r.getAttribute("data-item-id"),l=n.find(c=>c.id===s);l&&(l.enabled=r.checked,a=!0)}),a||n.length>0)try{localStorage.setItem(t.items,JSON.stringify(n))}catch(r){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",r),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629: "+(r.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D");const o=document.querySelector(".modal-overlay");o&&o.remove(),setTimeout(()=>{this.switchTab("analysis")},100)}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",t),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+(t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},renderAnalysisCharts_OLD(){},oldEnsureChartJSLoaded(){},oldRenderAnalysisChartsLegacy(){return`
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
        `},async ensureChartJSLoaded(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"], script[src*="chartjs"]')?new Promise(e=>{let a=0;const i=60,n=setInterval(()=>{a++,typeof Chart<"u"?(clearInterval(n),e(!0)):a>=i&&(clearInterval(n),e(!1))},100)}):new Promise(e=>{const a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",a.crossOrigin="anonymous";let i=!1;const n=()=>{!i&&typeof Chart<"u"&&(i=!0,e(!0))},o=()=>{if(i)return;const r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js",r.crossOrigin="anonymous";let s=!1;r.onload=()=>{!s&&typeof Chart<"u"&&(s=!0,i=!0,e(!0))},r.onerror=()=>{i||(i=!0,typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 Chart.js \u0645\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0635\u0627\u062F\u0631 - \u0633\u064A\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u062F\u0648\u0646 \u0631\u0633\u0648\u0645 \u0628\u064A\u0627\u0646\u064A\u0629"),e(!1))},document.head.appendChild(r)};a.onload=()=>{let r=0;const s=10,l=setInterval(()=>{r++,!i&&typeof Chart<"u"?(clearInterval(l),i=!0,e(!0)):r>=s&&!i&&(clearInterval(l),o())},500)},a.onerror=o,setTimeout(()=>{i||(i=!0,e(typeof Chart<"u"))},8e3);try{document&&document.head?document.head.appendChild(a):e(!1)}catch(r){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 script Chart.js:",r),e(!1)}})},async renderAnalysisCharts(){setTimeout(async()=>{this.ensureData();const t=AppState.appData.training||[],e=["status-chart-container","type-chart-container","monthly-chart-container"],a=[];e.forEach(f=>{const u=document.getElementById(f);if(u){const m=document.createElement("div");m.className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10",m.innerHTML='<div class="text-center text-gray-500"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p class="text-sm">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629...</p></div>',m.style.position="absolute",m.style.top="0",m.style.left="0",m.style.right="0",m.style.bottom="0",m.style.backgroundColor="rgba(255, 255, 255, 0.9)",m.style.display="flex",m.style.alignItems="center",m.style.justifyContent="center",m.style.zIndex="10",u.style.position!=="relative"&&u.style.position!=="absolute"&&(u.style.position="relative"),u.appendChild(m),a.push({container:u,overlay:m})}});let i=!1,n=0;const o=3;for(;!i&&n<o&&(n++,i=await this.ensureChartJSLoaded(),!i&&typeof Chart>"u");)n<o&&await new Promise(f=>setTimeout(f,1e3));if(a.forEach(({overlay:f})=>{f&&f.parentNode&&f.remove()}),!i||typeof Chart>"u"){e.forEach(f=>{const u=document.getElementById(f);if(u){const m=u.querySelector("canvas");m&&m.remove(),u.innerHTML='<div class="text-center text-gray-500 py-8"><i class="fas fa-exclamation-triangle text-4xl mb-4 text-yellow-500"></i><p class="text-sm">\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629</p><p class="text-xs mt-2 text-gray-400">\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0623\u0648 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A</p></div>'}});return}const r={};t.forEach(f=>{const u=f.status||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r[u]=(r[u]||0)+1});const s=document.getElementById("status-chart");s&&Object.keys(r).length>0?new Chart(s,{type:"pie",data:{labels:Object.keys(r),datasets:[{data:Object.values(r),backgroundColor:["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom"}}}}):s&&(s.parentElement.innerHTML='<div class="text-center text-gray-500 py-8"><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p></div>');const l={};t.forEach(f=>{const u=f.trainingType||"\u062F\u0627\u062E\u0644\u064A";l[u]=(l[u]||0)+1});const c=document.getElementById("type-chart");c&&Object.keys(l).length>0?new Chart(c,{type:"bar",data:{labels:Object.keys(l),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C",data:Object.values(l),backgroundColor:"#3b82f6"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0}}}}):c&&(c.parentElement.innerHTML='<div class="text-center text-gray-500 py-8"><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p></div>');const d={};t.forEach(f=>{if(f.startDate){const u=new Date(f.startDate),m=`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`;d[m]=(d[m]||0)+1}});const p=Object.keys(d).sort(),g=document.getElementById("monthly-chart");g&&p.length>0?new Chart(g,{type:"line",data:{labels:p,datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C",data:p.map(f=>d[f]),borderColor:"#3b82f6",backgroundColor:"rgba(59, 130, 246, 0.1)",tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0}},scales:{y:{beginAtZero:!0}}}}):g&&(g.parentElement.innerHTML='<div class="text-center text-gray-500 py-8"><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</p></div>')},300)},async renderAttendanceRegistry(){return this.buildAttendanceTabMarkup()},loadAttendanceRegistry(){this.ensureData();const t=document.getElementById("attendance-registry-table-body");if(!t)return;const e=this._dedupeRegistryRecords(AppState.appData.trainingAttendance||[]);if(Array.isArray(AppState.appData.trainingAttendance)&&e.length!==AppState.appData.trainingAttendance.length){AppState.appData.trainingAttendance=e;try{window.DataManager?.save?.()}catch{}}if(this._fillAttendanceRegistryFilters(e),e.length===0){t.innerHTML=`
                <tr>
                    <td colspan="14" class="text-center text-gray-500 py-6">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u062A\u062F\u0631\u064A\u0628 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646</td>
                </tr>
            `,this.setupAttendanceRegistryListeners();return}const a=(document.getElementById("attendance-registry-search")?.value||"").toLowerCase(),i=(document.getElementById("attendance-filter-employee")?.value||"").trim().toLowerCase(),n=(document.getElementById("attendance-filter-topic")?.value||"").trim().toLowerCase(),o=(document.getElementById("attendance-filter-department")?.value||"").trim().toLowerCase(),r=(document.getElementById("attendance-filter-factory")?.value||document.getElementById("attendance-registry-filter-factory")?.value||"").trim().toLowerCase(),s=(document.getElementById("attendance-filter-trainer")?.value||"").trim().toLowerCase(),l=document.getElementById("attendance-filter-date-from")?.value||"",c=document.getElementById("attendance-filter-date-to")?.value||"",d=[a,i,n,o,r,s,l,c].join("|");this._attendanceRegistryFilterKey!==d&&(this._attendanceRegistryFilterKey=d,this._attendanceRegistryShown=80),this._attendanceRegistryPageSize=this._attendanceRegistryPageSize||80,this._attendanceRegistryShown||(this._attendanceRegistryShown=this._attendanceRegistryPageSize);const p=e.filter(m=>{const y=String(m.employeeName||m.employee||"").toLowerCase(),x=String(m.employeeCode||"").toLowerCase(),b=String(m.topic||"").toLowerCase(),S=String(m.trainer||m.trainerName||m.conductedBy||"").toLowerCase(),I=String(m.department||"").toLowerCase(),h=String(m.factoryName||m.factory||"").toLowerCase(),k=String(m.position||"").toLowerCase(),$=!a||y.includes(a)||x.includes(a)||b.includes(a)||S.includes(a)||I.includes(a)||h.includes(a)||k.includes(a),w=!i||y.includes(i)||x.includes(i),A=!n||b.includes(n),D=!o||I.includes(o),F=!r||h.includes(r)||String(m.factory||"").toLowerCase()===r,E=!s||S.includes(s),C=this._trainingDateKey(m.date||m.trainingDate||m.createdAt),v=!l||!!C&&C>=l,L=!c||!!C&&C<=c;return $&&w&&A&&D&&F&&E&&v&&L}),g=Math.min(this._attendanceRegistryShown,p.length),f=p.slice(0,g);t.innerHTML=f.map((m,y)=>{const x=m.date?Utils.formatDate(m.date):"-";let b=this.cleanTime(m.startTime)||"-",S=this.cleanTime(m.endTime)||"-";(b==="NaN:NaN"||b.includes("NaN"))&&(b="-"),(S==="NaN:NaN"||S.includes("NaN"))&&(S="-");const I=m.totalHours||m.hours||"0";return`
                <tr>
                    <td>${y+1}</td>
                    <td>${x}</td>
                    <td>${Utils.escapeHTML(m.trainingType||"\u062F\u0627\u062E\u0644\u064A")}</td>
                    <td>${Utils.escapeHTML(m.factoryName||m.factory||"-")}</td>
                    <td>${Utils.escapeHTML(m.employeeCode||"-")}</td>
                    <td>${Utils.escapeHTML(m.employeeName||"-")}</td>
                    <td>${Utils.escapeHTML(m.position||"-")}</td>
                    <td>${Utils.escapeHTML(m.department||"-")}</td>
                    <td>${Utils.escapeHTML(m.topic||"-")}</td>
                    <td>${Utils.escapeHTML(m.trainer||"-")}</td>
                    <td>${b}</td>
                    <td>${S}</td>
                    <td>${I} \u0633\u0627\u0639\u0629</td>
                    <td>
                        <div class="flex items-center gap-2 flex-wrap">
                            <button class="btn-secondary btn-sm" onclick="Training.viewAttendanceRecordDetails('${Utils.escapeHTML(String(m.id||""))}')" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0648\u062C\u0645\u064A\u0639 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; font-size: 0.875rem;">
                                <i class="fas fa-eye"></i>
                                <span>\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</span>
                            </button>
                            <button class="btn-icon btn-icon-primary" onclick="Training.editAttendanceRecord('${Utils.escapeHTML(String(m.id||""))}')" title="\u062A\u0639\u062F\u064A\u0644">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon btn-icon-danger" onclick="Training.deleteAttendanceRecord('${Utils.escapeHTML(String(m.id||""))}')" title="\u062D\u0630\u0641">
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
            `:"");const u=document.getElementById("attendance-registry-count");u&&(u.textContent=e.length?`\u0639\u0631\u0636 ${f.length} \u0645\u0646 ${p.length}`+(p.length!==e.length?` (\u0627\u0644\u0645\u0635\u0641\u0651\u0649 \u0645\u0646 ${e.length})`:""):""),this.setupAttendanceRegistryListeners()},setupAttendanceRegistryListeners(){const t=document.getElementById("attendance-registry-search");t&&(t.oninput=()=>this._debounceRegistryFilter(()=>this.loadAttendanceRegistry())),["attendance-filter-employee","attendance-filter-topic","attendance-filter-department","attendance-filter-factory","attendance-filter-trainer"].forEach(c=>{const d=document.getElementById(c);d&&(d.oninput=()=>this._debounceRegistryFilter(()=>this.loadAttendanceRegistry()))}),["attendance-filter-date-from","attendance-filter-date-to"].forEach(c=>{const d=document.getElementById(c);d&&(d.onchange=()=>this.loadAttendanceRegistry())});const e=document.getElementById("attendance-registry-filter-factory");e&&(e.onchange=()=>this.loadAttendanceRegistry());const a=document.getElementById("attendance-filter-reset");a&&(a.onclick=()=>{["attendance-registry-search","attendance-filter-employee","attendance-filter-topic","attendance-filter-department","attendance-filter-factory","attendance-filter-trainer","attendance-filter-date-from","attendance-filter-date-to","attendance-registry-filter-factory"].forEach(c=>{const d=document.getElementById(c);d&&(d.value="")}),this.loadAttendanceRegistry()});const i=document.getElementById("attendance-registry-add-record");i&&(i.onclick=()=>this.showAddAttendanceRecordModal());const n=document.getElementById("attendance-registry-import-excel");n&&(n.onclick=()=>this.showImportAttendanceExcelModal());const o=document.getElementById("attendance-registry-export-excel");o&&(o.onclick=()=>this.exportAttendanceRegistryToExcel());const r=document.getElementById("attendance-registry-download-pdf");r&&(r.onclick=()=>this.exportAttendanceRegistryToPDF("download"));const s=document.getElementById("attendance-registry-export-pdf");s&&(s.onclick=()=>this.exportAttendanceRegistryToPDF("print"));const l=document.getElementById("attendance-registry-show-more");l&&(l.onclick=()=>{this._attendanceRegistryShown=(this._attendanceRegistryShown||80)+80,this.loadAttendanceRegistry()})},syncAttendanceRegistry(t){const e={added:[],updated:[]};return!t||!t.participants||!Array.isArray(t.participants)||(this.ensureData(),Array.isArray(AppState.appData.trainingAttendance)||(AppState.appData.trainingAttendance=[]),t.participants.forEach(a=>{const i=AppState.appData.trainingAttendance.find(r=>r.trainingId===t.id&&r.employeeCode===(a.code||a.employeeCode)),n=this.cleanTime(t.startTime),o=this.cleanTime(t.endTime);if(i)i.date=t.startDate||t.date,i.expiryDate=t.expiryDate||"",i.trainingType=t.trainingType||"\u062F\u0627\u062E\u0644\u064A",i.factory=t.factory,i.factoryName=t.factoryName,i.employeeCode=a.code||a.employeeCode||a.employeeNumber,i.employeeName=a.name,i.position=a.position,i.department=a.department,i.topic=t.name,i.trainer=t.trainer,i.startTime=n,i.endTime=o,i.totalHours=t.hours||this.calculateTrainingHours(n,o),i.updatedAt=new Date().toISOString(),e.updated.push(i);else{const r={id:Utils.generateId("ATT"),trainingId:t.id,date:t.startDate||t.date,expiryDate:t.expiryDate||"",trainingType:t.trainingType||"\u062F\u0627\u062E\u0644\u064A",factory:t.factory,factoryName:t.factoryName,employeeCode:a.code||a.employeeCode||a.employeeNumber,employeeName:a.name,position:a.position,department:a.department,topic:t.name,trainer:t.trainer,startTime:n,endTime:o,totalHours:t.hours||this.calculateTrainingHours(n,o),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.trainingAttendance.push(r),e.added.push(r)}})),e},syncAllAttendanceRegistry(){(AppState.appData.training||[]).forEach(e=>{this.syncAttendanceRegistry(e)})},cleanTime(t){if(t==null||t==="")return"";if(typeof t=="number"&&isFinite(t)&&t>=0&&t<1){const n=Math.round(t*24*60),o=Math.floor(n/60)%24,r=n%60;if(o>=0&&o<24&&r>=0&&r<60)return`${String(o).padStart(2,"0")}:${String(r).padStart(2,"0")}`}if(t instanceof Date&&!isNaN(t.getTime())){const n=t.getUTCHours(),o=t.getUTCMinutes();return`${String(n).padStart(2,"0")}:${String(o).padStart(2,"0")}`}let e=String(t).trim();if(!e||e.charAt(0)==="'"&&(e=e.slice(1).trim(),!e))return"";if(e.includes("T")){const n=e.match(/T(\d{1,2}):(\d{2})(?::\d{2})?/);if(n){const o=parseInt(n[1],10),r=parseInt(n[2],10);if(!isNaN(o)&&!isNaN(r)&&o>=0&&o<24&&r>=0&&r<60)return`${String(o).padStart(2,"0")}:${String(r).padStart(2,"0")}`}}if(/^-?0?\.\d+$/.test(e)){const n=parseFloat(e);if(isFinite(n)&&n>=0&&n<1){const o=Math.round(n*24*60),r=Math.floor(o/60)%24,s=o%60;if(r>=0&&r<24&&s>=0&&s<60)return`${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}`}return""}const a=e.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);if(a){const n=parseInt(a[1],10),o=parseInt(a[2],10);if(!isNaN(n)&&!isNaN(o)&&n>=0&&n<24&&o>=0&&o<60)return`${String(n).padStart(2,"0")}:${String(o).padStart(2,"0")}`}const i=e.match(/^(\d{1,2})[:.](\d{2})(?::\d{2})?$/);if(i){const n=parseInt(i[1],10),o=parseInt(i[2],10);if(!isNaN(n)&&!isNaN(o)&&n>=0&&n<24&&o>=0&&o<60)return`${String(n).padStart(2,"0")}:${String(o).padStart(2,"0")}`}return""},calculateTrainingHours(t,e){if(!t||!e)return"0";try{const a=this.cleanTime(t),i=this.cleanTime(e);if(!a||!i)return"0";const n=new Date(`2000-01-01T${a}:00`),o=new Date(`2000-01-01T${i}:00`);return o<=n?"0":((o-n)/(1e3*60*60)).toFixed(2)}catch{return"0"}},async exportAttendanceRegistryToExcel(){try{this.ensureData();const t=AppState.appData.trainingAttendance||[];if(t.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629.");return}Loading.show("\u062C\u0627\u0631\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");const e=t.map((o,r)=>({\u0645:r+1,\u0627\u0644\u062A\u0627\u0631\u064A\u062E:o.date?Utils.formatDate(o.date):"","\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628":o.trainingType||"\u062F\u0627\u062E\u0644\u064A",\u0627\u0644\u0645\u0635\u0646\u0639:o.factoryName||o.factory||"",\u0627\u0644\u0643\u0648\u062F:o.employeeCode||"",\u0627\u0644\u0627\u0633\u0645:o.employeeName||"",\u0627\u0644\u0648\u0638\u064A\u0641\u0629:o.position||"",\u0627\u0644\u0625\u062F\u0627\u0631\u0629:o.department||"","\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629":o.topic||"","\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631":o.trainer||"","\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621":this.cleanTime(o.startTime)||"","\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":this.cleanTime(o.endTime)||"","\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628":o.totalHours||"0"})),a=XLSX.utils.json_to_sheet(e);a["!cols"]=[{wch:5},{wch:12},{wch:12},{wch:15},{wch:12},{wch:20},{wch:15},{wch:15},{wch:25},{wch:15},{wch:10},{wch:10},{wch:15}];const i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,a,"\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628");const n=`\u0633\u062C\u0644_\u0627\u0644\u062A\u062F\u0631\u064A\u0628_\u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646_${new Date().toISOString().split("T")[0]}.xlsx`;XLSX.writeFile(i,n),Loading.hide(),Notification.success(`\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 ${t.length} \u0633\u062C\u0644 \u0625\u0644\u0649 Excel \u0628\u0646\u062C\u0627\u062D`)}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",t),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+(t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async exportAttendanceRegistryToPDF(t="download"){try{this.ensureData();const e=AppState.appData.trainingAttendance||[];if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const a=(document.getElementById("attendance-registry-search")?.value||"").toLowerCase(),i=(document.getElementById("attendance-filter-employee")?.value||"").trim().toLowerCase(),n=(document.getElementById("attendance-filter-topic")?.value||"").trim().toLowerCase(),o=(document.getElementById("attendance-filter-department")?.value||"").trim().toLowerCase(),r=(document.getElementById("attendance-filter-factory")?.value||document.getElementById("attendance-registry-filter-factory")?.value||"").trim().toLowerCase(),s=(document.getElementById("attendance-filter-trainer")?.value||"").trim().toLowerCase(),l=document.getElementById("attendance-filter-date-from")?.value||"",c=document.getElementById("attendance-filter-date-to")?.value||"",d=!!(a||i||n||o||r||s||l||c),p=d?e.filter(w=>{const A=String(w.employeeName||w.employee||"").toLowerCase(),D=String(w.employeeCode||"").toLowerCase(),F=String(w.topic||"").toLowerCase(),E=String(w.trainer||w.trainerName||w.conductedBy||"").toLowerCase(),C=String(w.department||"").toLowerCase(),v=String(w.factoryName||w.factory||"").toLowerCase(),L=String(w.position||"").toLowerCase(),N=!a||A.includes(a)||D.includes(a)||F.includes(a)||E.includes(a)||C.includes(a)||v.includes(a)||L.includes(a),T=!i||A.includes(i)||D.includes(i),M=!n||F.includes(n),_=!o||C.includes(o),H=!r||v.includes(r)||String(w.factory||"").toLowerCase()===r,U=!s||E.includes(s),z=this._trainingDateKey?this._trainingDateKey(w.date||w.trainingDate||w.createdAt):String(w.date||"").slice(0,10),q=!l||!!z&&z>=l,O=!c||!!z&&z<=c;return N&&T&&M&&_&&H&&U&&q&&O}):e;if(p.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0628\u062D\u062B \u0648\u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");return}Loading.show(t==="download"?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0639\u0627\u0645 \u0644\u0644\u062A\u062F\u0631\u064A\u0628 \u0628\u0635\u064A\u063A\u0629 PDF...":"\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0639\u0627\u0645 \u0644\u0644\u0637\u0628\u0627\u0639\u0629 \u0648\u0627\u0644\u0645\u0639\u0627\u064A\u0646\u0629...");const g="DOC-HSE-TRN-REG-01",f="\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0639\u0627\u0645 \u0644\u062D\u0636\u0648\u0631 \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646",u="General Employee Training & Attendance Register";let m=0;const y=new Set;p.forEach(w=>{const A=parseFloat(w.totalHours||w.hours||0);Number.isFinite(A)&&(m+=A);const D=w.employeeCode||w.employeeName||"";D&&y.add(D)});const x=["\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639","\u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641","\u0627\u0633\u0645 \u0627\u0644\u0645\u062A\u062F\u0631\u0628","\u0627\u0644\u0648\u0638\u064A\u0641\u0629","\u0627\u0644\u0625\u062F\u0627\u0631\u0629","\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","\u0627\u0644\u0645\u062D\u0627\u0636\u0631","\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621","\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","\u0627\u0644\u0633\u0627\u0639\u0627\u062A"],b=p.map((w,A)=>{const D=w.date?Utils.formatDate(w.date):"\u2014",F=this.cleanTime(w.startTime)||"\u2014",E=this.cleanTime(w.endTime)||"\u2014",C=Number.isFinite(parseFloat(w.totalHours))?parseFloat(w.totalHours).toFixed(1)+" \u0633":w.totalHours?w.totalHours+" \u0633":"\u2014";return`
                    <tr style="background-color: ${A%2===0?"#FFFFFF":"#F8FAFC"};">
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: center; font-weight: 600; font-size: 10px;">${A+1}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: center; font-size: 10px; white-space: nowrap;">${Utils.escapeHTML(D)}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: center; font-size: 10px;">${Utils.escapeHTML(w.trainingType||"\u062F\u0627\u062E\u0644\u064A")}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: center; font-size: 10px;">${Utils.escapeHTML(w.factoryName||w.factory||"\u2014")}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: center; font-size: 10px; font-weight: 600; color: #1e3a8a;">${Utils.escapeHTML(w.employeeCode||"\u2014")}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: right; font-size: 10px; font-weight: 700; color: #0f172a;">${Utils.escapeHTML(w.employeeName||"\u2014")}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: right; font-size: 10px;">${Utils.escapeHTML(w.position||"\u2014")}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: right; font-size: 10px;">${Utils.escapeHTML(w.department||"\u2014")}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: right; font-size: 10px; font-weight: 600; color: #0369a1;">${Utils.escapeHTML(w.topic||"\u2014")}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: center; font-size: 10px;">${Utils.escapeHTML(w.trainer||"\u2014")}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: center; font-size: 10px;">${Utils.escapeHTML(F)}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: center; font-size: 10px;">${Utils.escapeHTML(E)}</td>
                        <td style="padding: 7px 5px; border: 1px solid #E2E8F0; text-align: center; font-weight: 700; font-size: 10px; color: #15803d;">${Utils.escapeHTML(C)}</td>
                    </tr>
                `}).join(""),S=this.getIsoPrintHeaderHtml(f,u,g,"Rev. 03","\u062F\u0627\u062E\u0644\u064A \u0648\u0645\u0639\u062A\u0645\u062F"),I=this.getIsoPrintFooterHtml(g,"Rev. 03","ISO 45001:2018 (Clause 7.2 Competence & 7.3 Awareness)"),h=d?"\u0633\u062C\u0644\u0627\u062A \u0645\u062E\u0635\u0635\u0629 \u0648\u0641\u0642 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":"\u0643\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u0627\u0644\u0646\u0638\u0627\u0645",k=`
                ${S}

                <div class="handover-info-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 14px;">
                    <div class="info-card">
                        <div class="card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629:</div>
                        <div class="card-value" style="color: #1e3a8a; font-size: 14px;">${p.length} \u0633\u062C\u0644</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u0648\u0646 \u0627\u0644\u0645\u0634\u0645\u0648\u0644\u0648\u0646:</div>
                        <div class="card-value" style="color: #047857; font-size: 14px;">${y.size} \u0645\u062A\u062F\u0631\u0628</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0645\u062C\u0645\u0648\u0639 \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628:</div>
                        <div class="card-value" style="color: #b45309; font-size: 14px;">${m.toFixed(1)} \u0633\u0627\u0639\u0629</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0646\u0637\u0627\u0642 \u0627\u0644\u0633\u062C\u0644:</div>
                        <div class="card-value" style="color: #334155; font-size: 12px;">${h}</div>
                    </div>
                </div>

                <div style="margin-bottom: 16px;">
                    <table class="report-table" style="width: 100%; direction: rtl;">
                        <thead>
                            <tr style="background: #1e3a8a; color: #ffffff;">
                                ${x.map(w=>`<th style="padding: 9px 5px; border: 1px solid #1e40af; font-size: 10px; font-weight: 700; text-align: center;">${Utils.escapeHTML(w)}</th>`).join("")}
                            </tr>
                        </thead>
                        <tbody>
                            ${b}
                        </tbody>
                    </table>
                </div>

                <div class="signatures-grid" style="margin-top: 20px;">
                    <div class="sig-card">
                        <div class="sig-card-title">\u0625\u0639\u062F\u0627\u062F \u0648\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0633\u062C\u0644</div>
                        <div class="sig-card-name">\u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0643\u0641\u0627\u0621\u0627\u062A</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                    </div>
                    <div class="sig-card">
                        <div class="sig-card-title">\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u062A\u062D\u0642\u0642</div>
                        <div class="sig-card-name">\u0645\u0634\u0631\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                    </div>
                    <div class="sig-card">
                        <div class="sig-card-title">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0646\u0647\u0627\u0626\u064A</div>
                        <div class="sig-card-name">\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062E\u062A\u0645 \u0627\u0644\u0631\u0633\u0645\u064A</div>
                    </div>
                </div>

                ${I}
            `,$=`\u0627\u0644\u0633\u062C\u0644_\u0627\u0644\u0639\u0627\u0645_\u0644\u062A\u062F\u0631\u064A\u0628_\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646_${new Date().toISOString().slice(0,10)}.pdf`;if(t==="download"){const w=await this.downloadIsoReportAsPdf(f,k,$,!0);if(Loading.hide(),w)return Notification.success(`\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0639\u0627\u0645 \u0644\u0644\u062A\u062F\u0631\u064A\u0628 (${p.length} \u0633\u062C\u0644) \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D`),!0}return Loading.hide(),this.openIsoPrintWindow(f,k,!0,"",$)}catch(e){return Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF \u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",e),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628: "+(e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")),!1}},showImportAttendanceExcelModal(){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
        `,document.body.appendChild(t);const e=t.querySelector("#attendance-excel-file-input"),a=t.querySelector("#attendance-import-confirm-btn"),i=t.querySelector("#attendance-import-preview"),n=t.querySelector("#attendance-preview-head"),o=t.querySelector("#attendance-preview-body"),r=t.querySelector("#attendance-preview-count");let s=[];const l=()=>{s=[],i&&i.classList.add("hidden"),n&&(n.innerHTML=""),o&&(o.innerHTML=""),r&&(r.textContent=""),a&&(a.disabled=!0)};t.addEventListener("click",d=>{d.target===t&&t.remove()});const c=async d=>{const p=d.target.files?.[0];if(l(),!!p){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629.");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641...");const g=await p.arrayBuffer(),f=XLSX.read(g,{type:"array"}),u=f.SheetNames[0],m=f.Sheets[u],y=XLSX.utils.sheet_to_json(m);if(y.length===0){Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A"),Loading.hide();return}if(s=y,y.length>0){const x=Object.keys(y[0]);n.innerHTML=`<tr>${x.map(b=>`<th class="px-2 py-1">${Utils.escapeHTML(b)}</th>`).join("")}</tr>`,o.innerHTML=y.slice(0,5).map(b=>`<tr>${x.map(S=>`<td class="px-2 py-1">${Utils.escapeHTML(String(b[S]||""))}</td>`).join("")}</tr>`).join(""),r.textContent=`\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0641\u0648\u0641: ${y.length}`,i.classList.remove("hidden"),a.disabled=!1}Loading.hide()}catch(g){Loading.hide(),Utils.safeError("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0645\u0644\u0641 Excel:",g),Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(g.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}};e&&e.addEventListener("change",c),a?.addEventListener("click",async()=>{if(s.length===0){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F.");return}await this.importAttendanceRegistryFromExcel(s,t)})},async importAttendanceRegistryFromExcel(t,e){if(!t||t.length===0){Notification.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F");return}try{Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A..."),this.ensureData(),Array.isArray(AppState.appData.trainingAttendance)||(AppState.appData.trainingAttendance=[]);let a=0,i=0,n=0;const o={date:["\u0627\u0644\u062A\u0627\u0631\u064A\u062E","Date","date","\u062A\u0627\u0631\u064A\u062E"],trainingType:["\u0646\u0648\u0639 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","Training Type","trainingType","\u0646\u0648\u0639"],factory:["\u0627\u0644\u0645\u0635\u0646\u0639","Factory","factory","\u0627\u0644\u0645\u0635\u0646\u0639"],employeeCode:["\u0627\u0644\u0643\u0648\u062F","Employee Code","employeeCode","\u0627\u0644\u0643\u0648\u062F","\u0643\u0648\u062F"],employeeName:["\u0627\u0644\u0627\u0633\u0645","Employee Name","employeeName","\u0627\u0644\u0627\u0633\u0645","\u0627\u0633\u0645"],position:["\u0627\u0644\u0648\u0638\u064A\u0641\u0629","Position","position","\u0627\u0644\u0648\u0638\u064A\u0641\u0629"],department:["\u0627\u0644\u0625\u062F\u0627\u0631\u0629","Department","department","\u0627\u0644\u0625\u062F\u0627\u0631\u0629"],topic:["\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629","Topic","topic","\u0627\u0644\u0645\u0648\u0636\u0648\u0639"],trainer:["\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0627\u0636\u0631","Trainer","trainer","\u0627\u0644\u0645\u062D\u0627\u0636\u0631"],startTime:["\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621","Start Time","startTime","\u0628\u062F\u0621"],endTime:["\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","End Time","endTime","\u0627\u0646\u062A\u0647\u0627\u0621"],totalHours:["\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628","Total Hours","totalHours","\u0627\u0644\u0633\u0627\u0639\u0627\u062A","\u0633\u0627\u0639\u0627\u062A"]},r=(c,d)=>{for(const p in c){const g=String(p).trim();for(const f of d)if(g===f||g.toLowerCase()===f.toLowerCase())return c[p]}return null},s=c=>{if(!c)return null;if(c instanceof Date)return c.toISOString();if(typeof c=="string"){const d=new Date(c);if(!isNaN(d.getTime()))return d.toISOString()}if(typeof c=="number"){const d=Math.floor(c),p=c-d,g=new Date(1899,11,30),f=new Date(g.getTime()+d*24*60*60*1e3);if(p>0){const u=Math.round(p*24*60*60),m=Math.floor(u/3600),y=Math.floor(u%3600/60),x=u%60;f.setHours(m,y,x,0)}if(!isNaN(f.getTime()))return f.toISOString()}return null};for(const c of t)try{const d=s(r(c,o.date)),p=r(c,o.trainingType)||"\u062F\u0627\u062E\u0644\u064A",g=r(c,o.factory)||"",f=r(c,o.employeeCode)||"",u=r(c,o.employeeName)||"";if(!f||!u){n++;continue}const m=AppState.appData.trainingAttendance.findIndex(x=>x.employeeCode===f&&x.date===d&&x.topic===r(c,o.topic)),y={id:m>=0?AppState.appData.trainingAttendance[m].id:Utils.generateId("ATT"),trainingId:null,date:d||new Date().toISOString(),trainingType:p,factory:g,factoryName:g,employeeCode:f,employeeName:u,position:r(c,o.position)||"",department:r(c,o.department)||"",topic:r(c,o.topic)||"",trainer:r(c,o.trainer)||"",startTime:this.cleanTime(r(c,o.startTime)||""),endTime:this.cleanTime(r(c,o.endTime)||""),totalHours:r(c,o.totalHours)||this.calculateTrainingHours(r(c,o.startTime),r(c,o.endTime)),createdAt:m>=0?AppState.appData.trainingAttendance[m].createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};m>=0?(AppState.appData.trainingAttendance[m]=y,i++):(AppState.appData.trainingAttendance.push(y),a++)}catch(d){n++,Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0635\u0641:",d)}typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("TrainingAttendance",AppState.appData.trainingAttendance).catch(c=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL:",c),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL. \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637 \u062D\u062A\u0649 \u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0628\u0646\u062C\u0627\u062D.")}),this.loadAttendanceRegistry(),Loading.hide(),e&&e.parentNode&&e.remove();const l=`\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0628\u0646\u062C\u0627\u062D!
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
        `,document.body.appendChild(a),a.addEventListener("click",i=>{i.target===a&&a.remove()}),a.querySelector("#save-analysis-data-btn")?.addEventListener("click",async()=>{try{Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644...");const i={notes:a.querySelector("#analysis-notes")?.value||"",goals:a.querySelector("#analysis-goals")?.value||"",recommendations:a.querySelector("#analysis-recommendations")?.value||"",targets:{totalHours:parseFloat(a.querySelector("#target-hours")?.value||"0")||0,totalEmployees:parseInt(a.querySelector("#target-employees")?.value||"0")||0},updatedAt:new Date().toISOString(),updatedBy:{id:AppState.currentUser?.id||"",name:AppState.currentUser?.name||AppState.currentUser?.email||""}};if(AppState.appData.trainingAnalysisData||(AppState.appData.trainingAnalysisData={}),AppState.appData.trainingAnalysisData={...AppState.appData.trainingAnalysisData,...i,createdAt:AppState.appData.trainingAnalysisData.createdAt||new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("TrainingAnalysisData",AppState.appData.trainingAnalysisData).catch(n=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL:",n)}),Loading.hide(),a.remove(),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u062C\u0627\u062D"),document.querySelector('.tab-btn[data-tab="analysis"]')?.classList.contains("active")){const n=document.getElementById("training-tab-content");n&&(n.innerHTML=await this.renderAnalysisTab(),this._hydrateTab("analysis"),this.renderAnalysisCharts())}}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",i),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644: "+(i.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}})},showAddAttendanceRecordModal(){this.ensureData(),Array.isArray(AppState.appData.trainingAttendance)||(AppState.appData.trainingAttendance=[]);const t=new Date().toISOString().split("T")[0],e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
        `,document.body.appendChild(e),e.addEventListener("click",r=>{r.target===e&&e.remove()});const a=e.querySelector("#add-attendance-start-time"),i=e.querySelector("#add-attendance-end-time"),n=e.querySelector("#add-attendance-hours"),o=()=>{if(a?.value&&i?.value){const r=this.calculateTrainingHours(a.value,i.value);r&&parseFloat(r)>0&&(n.value=r)}};a?.addEventListener("change",o),i?.addEventListener("change",o),e.querySelector("#save-add-attendance-btn")?.addEventListener("click",async()=>{try{const r=e.querySelector("#add-attendance-date")?.value,s=e.querySelector("#add-attendance-code")?.value?.trim(),l=e.querySelector("#add-attendance-name")?.value?.trim(),c=e.querySelector("#add-attendance-topic")?.value?.trim();if(!r||!s||!l||!c){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u0627\u0644\u062A\u0627\u0631\u064A\u062E\u060C \u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u060C \u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641\u060C \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0629)");return}Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644...");const d=e.querySelector("#add-attendance-factory")?.value?.trim()||"",p=this.cleanTime(e.querySelector("#add-attendance-start-time")?.value||""),g=this.cleanTime(e.querySelector("#add-attendance-end-time")?.value||""),f=e.querySelector("#add-attendance-hours")?.value||this.calculateTrainingHours(p,g)||"0",u={id:Utils.generateId("ATT"),trainingId:null,date:new Date(r).toISOString(),trainingType:e.querySelector("#add-attendance-type")?.value||"\u062F\u0627\u062E\u0644\u064A",factory:d,factoryName:d,employeeCode:s,employeeName:l,position:e.querySelector("#add-attendance-position")?.value?.trim()||"",department:e.querySelector("#add-attendance-department")?.value?.trim()||"",topic:c,trainer:e.querySelector("#add-attendance-trainer")?.value?.trim()||"",startTime:p,endTime:g,totalHours:f,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};AppState.appData.trainingAttendance.push(u),typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("TrainingAttendance",AppState.appData.trainingAttendance).catch(m=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL:",m),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL. \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637 \u062D\u062A\u0649 \u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0628\u0646\u062C\u0627\u062D.")}),Loading.hide(),e.remove(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),this.loadAttendanceRegistry()}catch(r){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644:",r),Notification.error("\u0641\u0634\u0644 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644: "+(r?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}})},viewAttendanceRecordDetails(t){this.ensureData();const e=AppState.appData.trainingAttendance||[],a=e.find(c=>c.id===t);if(!a){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=a.employeeCode||"",n=a.employeeName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",o=e.filter(c=>(c.employeeCode||"")===i).sort((c,d)=>new Date(d.date||0)-new Date(c.date||0)),r=o.reduce((c,d)=>c+(parseFloat(d.totalHours||d.hours||0)||0),0).toFixed(2),s=c=>{const d=this.cleanTime(c);return!d||d==="NaN:NaN"||String(d).includes("NaN")?"\u2014":d},l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
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
                                <div style="font-size: 0.95rem; font-weight: 700; color: #0f172a; direction: ltr;">${s(a.startTime)} - ${s(a.endTime)}</div>
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
                                    <i class="fas fa-list ml-1"></i> \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0648\u0631\u0627\u062A: ${o.length}
                                </span>
                                <span class="badge" style="background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; font-weight: 700; padding: 4px 10px; border-radius: 8px; font-size: 0.85rem;">
                                    <i class="fas fa-clock ml-1"></i> \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0627\u0639\u0627\u062A: ${r} \u0633\u0627\u0639\u0629
                                </span>
                            </div>
                        </div>

                        ${o.length>0?`
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
                                    ${o.map((c,d)=>{const p=c.id===t,g=s(c.startTime),f=s(c.endTime),u=c.totalHours||c.hours||"0";return`
                                        <tr style="background: ${p?"#eff6ff":d%2===0?"#ffffff":"#f8fafc"}; border-bottom: 1px solid #f1f5f9; transition: background 0.15s;">
                                            <td style="padding: 10px 14px; text-align: center; font-weight: 600; color: #64748b;">${d+1}</td>
                                            <td style="padding: 10px 14px; font-weight: 600; color: #0f172a; white-space: nowrap;">${c.date?Utils.formatDate(c.date):"\u2014"}</td>
                                            <td style="padding: 10px 14px;"><span class="badge" style="font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; background: #e0f2fe; color: #0369a1; font-weight: 600;">${Utils.escapeHTML(c.trainingType||"\u062F\u0627\u062E\u0644\u064A")}</span></td>
                                            <td style="padding: 10px 14px; color: #475569;">${Utils.escapeHTML(c.factoryName||c.factory||"\u2014")}</td>
                                            <td style="padding: 10px 14px; font-weight: 600; color: #1e293b; max-width: 260px;">${Utils.escapeHTML(c.topic||"\u2014")}</td>
                                            <td style="padding: 10px 14px; color: #475569;">${Utils.escapeHTML(c.trainer||"\u2014")}</td>
                                            <td style="padding: 10px 14px; text-align: center; font-size: 0.85rem; color: #475569; direction: ltr; white-space: nowrap;">${g} - ${f}</td>
                                            <td style="padding: 10px 14px; text-align: center; font-weight: 700; color: #059669;">${u} \u0633</td>
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
        `,document.body.appendChild(l),l.addEventListener("click",c=>{c.target===l&&l.remove()})},editAttendanceRecord(t){this.ensureData();const e=AppState.appData.trainingAttendance||[],a=e.find(g=>g.id===t);if(!a){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.getSafetyTeamMembers({excludeSystemUsers:!0}),n=String(a?.trainer||"").trim(),o=i.some(g=>g.name===n),r=n&&!o?`<option value="${Utils.escapeHTML(n)}" selected>${Utils.escapeHTML(n)}</option>`:"",s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
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
        `,document.body.appendChild(s),s.addEventListener("click",g=>{g.target===s&&s.remove()});const l=s.querySelector("#edit-attendance-start-time"),c=s.querySelector("#edit-attendance-end-time"),d=s.querySelector("#edit-attendance-hours"),p=()=>{if(l.value&&c.value){const g=this.calculateTrainingHours(l.value,c.value);g&&parseFloat(g)>0&&(d.value=g)}};l?.addEventListener("change",p),c?.addEventListener("change",p),s.querySelector("#save-edit-attendance-btn")?.addEventListener("click",async()=>{try{const g=s.querySelector("#edit-attendance-date")?.value,f=s.querySelector("#edit-attendance-code")?.value.trim(),u=s.querySelector("#edit-attendance-name")?.value.trim(),m=s.querySelector("#edit-attendance-topic")?.value.trim();if(!g||!f||!u||!m){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");return}Loading.show("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A...");const y=e.findIndex(x=>x.id===t);y>=0?(e[y]={...e[y],date:new Date(g).toISOString(),trainingType:s.querySelector("#edit-attendance-type")?.value||"\u062F\u0627\u062E\u0644\u064A",factory:s.querySelector("#edit-attendance-factory")?.value.trim()||"",factoryName:s.querySelector("#edit-attendance-factory")?.value.trim()||"",employeeCode:f,employeeName:u,position:s.querySelector("#edit-attendance-position")?.value.trim()||"",department:s.querySelector("#edit-attendance-department")?.value.trim()||"",topic:m,trainer:s.querySelector("#edit-attendance-trainer")?.value.trim()||"",startTime:this.cleanTime(s.querySelector("#edit-attendance-start-time")?.value||""),endTime:this.cleanTime(s.querySelector("#edit-attendance-end-time")?.value||""),totalHours:s.querySelector("#edit-attendance-hours")?.value||this.calculateTrainingHours(s.querySelector("#edit-attendance-start-time")?.value,s.querySelector("#edit-attendance-end-time")?.value),updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("TrainingAttendance",e).catch(x=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL:",x),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL. \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637 \u062D\u062A\u0649 \u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0628\u0646\u062C\u0627\u062D.")}),Loading.hide(),s.remove(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),this.loadAttendanceRegistry()):(Loading.hide(),Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"))}catch(g){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644:",g),Notification.error("\u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644: "+(g.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}})},async deleteAttendanceRecord(t){if(!this.isCurrentUserAdminOrManager()){Notification.error("\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062D\u0630\u0641 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u0627\u0644\u062D\u0630\u0641 \u064A\u062A\u0645 \u0628\u0637\u0644\u0628 \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637.");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F"))try{Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644..."),this.ensureData();const e=AppState.appData.trainingAttendance||[],a=e.findIndex(i=>i.id===t);a>=0?(e.splice(a,1),typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save(),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("TrainingAttendance",e).catch(i=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL:",i),Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 SQL. \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637 \u062D\u062A\u0649 \u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0628\u0646\u062C\u0627\u062D.")}),Loading.hide(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),this.loadAttendanceRegistry()):(Loading.hide(),Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"))}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644:",e),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644: "+(e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async updateTrainingAnalyticsDashboard(){const t=document.getElementById("train-analytics-root");if(!t)return;try{this.ensureData()}catch{}const e=parseInt(this._trainPeriod||"0",10),a=T=>({...T,_locationDisplay:T.locationName||(T.location&&T.factory&&this.getPlaceName?this.getPlaceName(T.location,T.factory):T.location)||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",_factoryDisplay:T.factoryName||T.factory||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",_trainer:T.trainer||T.conductedBy||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}),i=(AppState.appData?.training||[]).concat(AppState.appData?.contractorTrainings||[]).concat((AppState.appData?.legalTrainings||[]).map(T=>({...T,trainingType:T.category||"\u062A\u062F\u0631\u064A\u0628 \u0642\u0627\u0646\u0648\u0646\u064A",name:T.title,topic:T.title,date:T.actualDate||T.scheduledDate,startDate:T.scheduledDate,totalHours:Number(T.duration)||0,_isLegalTraining:!0}))).map(a),n=this._tFilterByPeriod(i,e);this._tPopulateFilters(n);const o=this._tApplyFilters(n),r=o.length,s=document.getElementById("train-filter-count");s&&(s.textContent=`${r} \u0628\u0631\u0646\u0627\u0645\u062C`);const l=o.filter(T=>T.status==="\u0645\u0643\u062A\u0645\u0644").length,c=o.filter(T=>T.status==="\u0645\u062E\u0637\u0637"||T.status==="\u0642\u0627\u062F\u0645").length,d=o.reduce((T,M)=>T+(this.getParticipantsCount?this.getParticipantsCount(M):Number(M.participantsCount)||0),0),p=o.reduce((T,M)=>T+(Number(M.totalHours)||0),0),g=(AppState.appData?.contractorTrainings||[]).filter(T=>this._tFilterByPeriod([T],e).length&&this._tApplyFilters([T]).length).length,f=o.filter(T=>T._isLegalTraining).length,u=o.filter(T=>T._isLegalTraining&&T.complianceStatus==="\u0645\u0645\u062A\u062B\u0644").length,m=f>0?Math.round(u/f*100):0,y=r-g-f,x=r>0?Math.round(d/r):0,b=r>0?Math.round(l/r*100):0,S=o.filter(T=>{const M=new Date(T.date||T.startDate||""),_=new Date;return!isNaN(M)&&M.getFullYear()===_.getFullYear()&&M.getMonth()===_.getMonth()}).length,I=document.getElementById("train-kpi-strip");if(I){const T=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0631\u0627\u0645\u062C",value:r,icon:"fas fa-graduation-cap",color:"#4f46e5",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0645\u0643\u062A\u0645\u0644\u0629",value:l,icon:"fas fa-check-circle",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0645\u062E\u0637\u0637\u0629/\u0642\u0627\u062F\u0645\u0629",value:c,icon:"fas fa-calendar-alt",color:"#f59e0b",bg:"#fffbeb",border:"#fde68a"},{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646",value:d.toLocaleString("en-US"),icon:"fas fa-users",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646",value:y,icon:"fas fa-user-tie",color:"#0ea5e9",bg:"#f0f9ff",border:"#bae6fd"},{label:"\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",value:g,icon:"fas fa-users-cog",color:"#f97316",bg:"#fff7ed",border:"#fed7aa"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0645\u0634\u0627\u0631\u0643\u064A\u0646/\u0628\u0631\u0646\u0627\u0645\u062C",value:x,icon:"fas fa-chart-line",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628",value:p.toLocaleString("en-US"),icon:"fas fa-clock",color:"#14b8a6",bg:"#f0fdfa",border:"#99f6e4"},{label:"\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631",value:S,icon:"fas fa-calendar-day",color:"#db2777",bg:"#fdf2f8",border:"#fbcfe8"},{label:"\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629",value:f,icon:"fas fa-gavel",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A",value:m+"%",icon:"fas fa-balance-scale",color:"#059669",bg:"#ecfdf5",border:"#a7f3d0"}];I.innerHTML=T.map(M=>`
                <div style="background:${M.bg};border:1px solid ${M.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${M.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${M.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.2rem;font-weight:800;color:${M.color};line-height:1;">${M.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${M.label}</div>
                    </div>
                </div>`).join("")}if(!await this._tEnsureChartJS()||typeof Chart>"u"){t.insertAdjacentHTML("afterbegin",'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i> <span style="font-size:0.85rem;color:#92400e;">\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629.</span></div>');return}const k={\u0645\u0643\u062A\u0645\u0644:"rgba(16,185,129,0.85)",\u0645\u062E\u0637\u0637:"rgba(245,158,11,0.85)",\u062C\u0627\u0631\u064D:"rgba(59,130,246,0.85)",\u0642\u0627\u062F\u0645:"rgba(139,92,246,0.85)",\u0645\u0644\u063A\u064A:"rgba(239,68,68,0.85)"},$=this._tGroupBy(o,"status");this._tDrawDoughnut("train-chart-status",$.labels,$.data,$.labels.map(T=>k[T]||"rgba(148,163,184,0.8)"));const w=this._tGroupBy(o,"trainingType",10);this._tDrawDoughnut("train-chart-type",w.labels,w.data,this._tChartColors(w.labels.length)),this._tDrawTrend("train-chart-trend",o);const A=this._tGroupBy(o,"_trainer",10);this._tDrawHBar("train-chart-trainer",A.labels,A.data,"rgba(245,158,11,0.75)");const D=this._tGroupBy(o,"topic",10);this._tDrawHBar("train-chart-topic",D.labels,D.data,"rgba(16,185,129,0.75)");const F=this._tGroupBy(o,"_factoryDisplay",8);this._tDrawHBar("train-chart-factory",F.labels,F.data,"rgba(99,102,241,0.75)");const E=this._tGroupBy(o,"_locationDisplay",8);this._tDrawHBar("train-chart-location",E.labels,E.data,"rgba(59,130,246,0.75)"),this._tDrawParticipants("train-chart-participants",o);const C=o.filter(T=>T._isLegalTraining);if(C.length>0){const T=this._tGroupBy(C,"complianceStatus"),M=T.labels.map(U=>U==="\u0645\u0645\u062A\u062B\u0644"?"rgba(5,150,105,0.85)":U==="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"?"rgba(220,38,38,0.85)":U==="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"rgba(245,158,11,0.85)":U==="\u0645\u062E\u0637\u0637"?"rgba(59,130,246,0.85)":"rgba(148,163,184,0.8)");this._tDrawDoughnut("train-chart-legal-compliance",T.labels,T.data,M);const _=this._tGroupBy(C,"category",10);this._tDrawHBar("train-chart-legal-categories",_.labels,_.data,"rgba(220,38,38,0.7)");const H=document.getElementById("train-chart-legal-compliance-empty");H&&(H.style.display="none")}else{const T=document.getElementById("train-chart-legal-compliance-empty");T&&(T.style.display="flex");const M=document.getElementById("train-chart-legal-categories");M&&M.parentElement&&(M.parentElement.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629</div>')}const v=o.slice().sort((T,M)=>{const _=this.getParticipantsCount?this.getParticipantsCount(M):Number(M.participantsCount)||0,H=this.getParticipantsCount?this.getParticipantsCount(T):Number(T.participantsCount)||0;return _-H}).slice(0,20),L=document.getElementById("train-top-count"),N=document.getElementById("train-top-tbody");if(L&&(L.textContent=`${v.length} \u0628\u0631\u0646\u0627\u0645\u062C`),N)if(!v.length)N.innerHTML='<tr><td colspan="8" style="padding:24px;text-align:center;color:#10b981;"><i class="fas fa-info-circle ml-2"></i>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>';else{const T={\u0645\u0643\u062A\u0645\u0644:"background:#ecfdf5;color:#065f46;",\u0645\u062E\u0637\u0637:"background:#fffbeb;color:#92400e;",\u062C\u0627\u0631\u064D:"background:#eff6ff;color:#1e40af;","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"background:#eff6ff;color:#1e40af;",\u0645\u0644\u063A\u064A:"background:#fef2f2;color:#991b1b;"};N.innerHTML=v.map((M,_)=>{const H=this.getParticipantsCount?this.getParticipantsCount(M):Number(M.participantsCount)||0,U=Number(M.totalHours||M.hours||0),z=Utils.escapeHTML(M._trainer||M.trainer||M.conductedBy||"\u2014"),q=Utils.escapeHTML(M._factoryDisplay||M.factoryName||M.factory||"\u2014"),O=Utils.escapeHTML(M._locationDisplay||M.locationName||M.location||"\u2014"),P=Utils.escapeHTML(M.topic||M.name||M.subject||"\u2014"),j=_%2===0?"#fff":"#fafafa",R=T[M.status]||"background:#f1f5f9;color:#374151;",K=M.date||M.startDate||"",tt=K?(()=>{try{return new Date(K).toLocaleDateString("ar-SA",{year:"numeric",month:"short",day:"numeric"})}catch{return K.slice(0,10)}})():"\u2014";return`<tr style="border-bottom:1px solid #f8fafc;background:${j};" onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='${j}'">
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${P}">${P}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${z}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${q}</td>
                        <td style="padding:9px 12px;color:#374151;white-space:nowrap;">${O}</td>
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${tt}</td>
                        <td style="padding:9px 12px;"><span style="padding:2px 8px;border-radius:12px;font-size:0.7rem;font-weight:700;white-space:nowrap;${R}">${Utils.escapeHTML(M.status||"\u2014")}</span></td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:#4f46e5;">${H>0?H:"\u2014"}</td>
                        <td style="padding:9px 12px;text-align:center;color:#64748b;">${U>0?U.toFixed(1):"\u2014"}</td>
                    </tr>`}).join("")}},_tFilterByPeriod(t,e){if(!e||e===0)return t;const a=new Date;return a.setDate(a.getDate()-e),t.filter(i=>{const n=new Date(i.date||i.startDate||"");return!isNaN(n.getTime())&&n>=a})},_tGroupBy(t,e,a=0){const i={};t.forEach(o=>{const r=String(o[e]||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";i[r]=(i[r]||0)+1});let n=Object.entries(i).sort((o,r)=>r[1]-o[1]);return a>0&&(n=n.slice(0,a)),{labels:n.map(o=>o[0]),data:n.map(o=>o[1])}},_tPopulateFilters(t){const e=i=>[...new Set(t.map(i).filter(n=>n&&n!=="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"))].sort(),a=(i,n)=>{const o=document.getElementById(i);if(!o)return;const r=o.value;o.innerHTML='<option value="">\u0627\u0644\u0643\u0644</option>'+n.map(s=>`<option value="${s}"${s===r?" selected":""}>${s}</option>`).join("")};a("train-af-status",e(i=>String(i.status||"").trim())),a("train-af-type",e(i=>String(i.trainingType||"").trim())),a("train-af-trainer",e(i=>String(i._trainer||"").trim())),a("train-af-factory",e(i=>String(i._factoryDisplay||"").trim())),a("train-af-location",e(i=>String(i._locationDisplay||"").trim()))},_tApplyFilters(t){const e=c=>{const d=document.getElementById(c);return d?d.value.trim():""},a=e("train-af-status"),i=e("train-af-type"),n=e("train-af-trainer"),o=e("train-af-factory"),r=e("train-af-location"),s=[a,i,n,o,r].some(c=>c!==""),l=document.getElementById("train-filter-badge");return l&&(l.style.display=s?"inline":"none"),t.filter(c=>!(a&&String(c.status||"").trim()!==a||i&&String(c.trainingType||"").trim()!==i||n&&String(c._trainer||"").trim()!==n||o&&String(c._factoryDisplay||"").trim()!==o||r&&String(c._locationDisplay||"").trim()!==r))},_tDrawDoughnut(t,e,a,i){const n=document.getElementById(t),o=document.getElementById(t+"-empty");if(!n)return;if(!a.length||a.reduce((l,c)=>l+c,0)===0){n.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),n.style.display="";const r=a.reduce((l,c)=>l+c,0);this._trainCharts||(this._trainCharts={});const s=this._trainCharts[t];if(s)try{s.destroy()}catch{}this._trainCharts[t]=new Chart(n,{type:"doughnut",data:{labels:e,datasets:[{data:a,backgroundColor:i,borderWidth:2,borderColor:"#fff",hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"right",labels:{usePointStyle:!0,font:{size:11},padding:12}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.parsed} (${Math.round(l.parsed/r*100)}%)`}}}}})},_tDrawHBar(t,e,a,i){const n=document.getElementById(t),o=document.getElementById(t+"-empty");if(!n)return;if(!a.length){n.style.display="none",o&&(o.style.display="flex");return}o&&(o.style.display="none"),n.style.display="",this._trainCharts||(this._trainCharts={});const r=this._trainCharts[t];if(r)try{r.destroy()}catch{}this._trainCharts[t]=new Chart(n,{type:"bar",data:{labels:e,datasets:[{data:a,backgroundColor:i,borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:s=>` ${s.parsed.x} \u0628\u0631\u0646\u0627\u0645\u062C`}}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:s=>String(e[s]).length>20?String(e[s]).slice(0,19)+"\u2026":e[s]}}}}})},_tDrawTrend(t,e){const a=document.getElementById(t),i=document.getElementById(t+"-empty");if(!a)return;const n=new Date,o=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],r=[];for(let c=11;c>=0;c--){const d=new Date(n.getFullYear(),n.getMonth()-c,1);r.push({year:d.getFullYear(),month:d.getMonth(),label:`${o[d.getMonth()]} ${d.getFullYear()}`})}const s=r.map(c=>e.filter(d=>{const p=new Date(d.date||d.startDate||"");return!isNaN(p.getTime())&&p.getFullYear()===c.year&&p.getMonth()===c.month}).length);if(s.reduce((c,d)=>c+d,0)===0){a.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),a.style.display="",this._trainCharts||(this._trainCharts={});const l=this._trainCharts[t];if(l)try{l.destroy()}catch{}this._trainCharts[t]=new Chart(a,{type:"bar",data:{labels:r.map(c=>c.label),datasets:[{label:"\u0639\u062F\u062F \u0627\u0644\u0628\u0631\u0627\u0645\u062C",data:s,backgroundColor:s.map(c=>c===Math.max(...s)?"rgba(79,70,229,0.85)":"rgba(79,70,229,0.5)"),borderRadius:6,borderSkipped:!1,order:1},{label:"\u0627\u0644\u0627\u062A\u062C\u0627\u0647",data:s,type:"line",borderColor:"rgba(16,185,129,0.9)",backgroundColor:"rgba(16,185,129,0.08)",borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#10b981",tension:.4,fill:!0,order:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0,font:{size:11}}},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},maxRotation:45}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},_tDrawParticipants(t,e){const a=document.getElementById(t),i=document.getElementById(t+"-empty");if(!a)return;const n=new Date,o=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],r=[];for(let c=11;c>=0;c--){const d=new Date(n.getFullYear(),n.getMonth()-c,1);r.push({year:d.getFullYear(),month:d.getMonth(),label:`${o[d.getMonth()]}`})}const s=r.map(c=>e.filter(d=>{const p=new Date(d.date||d.startDate||"");return!isNaN(p.getTime())&&p.getFullYear()===c.year&&p.getMonth()===c.month}).reduce((d,p)=>d+(this.getParticipantsCount?this.getParticipantsCount(p):Number(p.participantsCount)||0),0));if(s.reduce((c,d)=>c+d,0)===0){a.style.display="none",i&&(i.style.display="flex");return}i&&(i.style.display="none"),a.style.display="",this._trainCharts||(this._trainCharts={});const l=this._trainCharts[t];if(l)try{l.destroy()}catch{}this._trainCharts[t]=new Chart(a,{type:"bar",data:{labels:r.map(c=>c.label),datasets:[{label:"\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646",data:s,backgroundColor:"rgba(236,72,153,0.7)",borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:c=>` ${c.parsed.y} \u0645\u062A\u062F\u0631\u0628`}}},scales:{x:{grid:{display:!1},ticks:{font:{size:10}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f8fafc"}}}}})},async _tEnsureChartJS(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"],script[src*="chartjs"]')?new Promise(e=>{const a=setInterval(()=>{typeof Chart<"u"&&(clearInterval(a),e(!0))},100);setTimeout(()=>{clearInterval(a),e(!1)},5e3)}):new Promise(e=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",a.onload=()=>e(!0),a.onerror=()=>{const i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",i.onload=()=>e(!0),i.onerror=()=>e(!1),document.head.appendChild(i)},document.head.appendChild(a)})},_tChartColors(t){const e=["rgba(79,70,229,0.8)","rgba(16,185,129,0.8)","rgba(245,158,11,0.8)","rgba(239,68,68,0.8)","rgba(59,130,246,0.8)","rgba(139,92,246,0.8)","rgba(236,72,153,0.8)","rgba(20,184,166,0.8)","rgba(249,115,22,0.8)","rgba(168,85,247,0.8)"];return Array.from({length:t},(a,i)=>e[i%e.length])},async _tExportPDF(){const t=document.getElementById("train-analytics-root");if(!t)return;const e=document.getElementById("train-export-pdf-btn"),a=e?e.innerHTML:"";e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const i=(k,$)=>new Promise((w,A)=>{if($())return w();const D=document.createElement("script");D.src=k,D.onload=()=>w(),D.onerror=()=>A(new Error("Failed: "+k)),document.head.appendChild(D)});await i("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>typeof html2canvas<"u"),await i("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>typeof window.jspdf<"u");const n=document.getElementById("train-filter-panel"),o=n&&n.style.display!=="none";o&&(n.style.display="none");const r=await html2canvas(t,{scale:1.8,useCORS:!0,backgroundColor:"#f8fafc",scrollX:0,scrollY:-window.scrollY,logging:!1});o&&(n.style.display="");const{jsPDF:s}=window.jspdf,l=new s({orientation:"portrait",unit:"mm",format:"a4"}),c=l.internal.pageSize.getWidth(),d=l.internal.pageSize.getHeight(),p=10,g=20,f=14,u=c-p*2,m=d-g-f-p*.5,y=u/r.width,x=m/y,b=Math.ceil(r.height/x),S=new Date().toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),I=new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});for(let k=0;k<b;k++){k>0&&l.addPage(),l.setFillColor(30,58,138),l.rect(0,0,c,g,"F"),l.setFillColor(37,99,235),l.rect(0,g-3,c,3,"F"),l.setTextColor(255,255,255),l.setFontSize(11),l.setFont(void 0,"bold"),l.text("ICAPP \u2014 Occupational Safety, Health & Environment Department",p,8,{align:"left"}),l.setFontSize(8),l.setFont(void 0,"normal"),l.text("Training Performance Analytics & KPI Dashboard \u2014 ISO 45001:2018 \xA77.2",p,14,{align:"left"}),l.setFontSize(8),l.text("DOC-HSE-TRN-KPI-03 | Rev. 03",c-p,8,{align:"right"}),l.setFontSize(8.5),l.setFont(void 0,"bold"),l.text(`Page ${k+1} of ${b}  \u2022  ${S}`,c-p,14,{align:"right"}),l.setTextColor(0,0,0);const $=document.createElement("canvas"),w=Math.min(x,r.height-k*x);$.width=r.width,$.height=w,$.getContext("2d").drawImage(r,0,k*x,r.width,w,0,0,r.width,w),l.addImage($.toDataURL("image/jpeg",.92),"JPEG",p,g,u,w*y);const A=d-f;l.setDrawColor(203,213,225),l.setLineWidth(.4),l.line(0,A,c,A),l.setFillColor(248,250,252),l.rect(0,A,c,f,"F"),l.setFontSize(7.5),l.setTextColor(30,58,138),l.setFont(void 0,"bold"),l.text("International Company for Agricultural Production & Processing (ICAPP)",p,A+5,{align:"left"}),l.setFont(void 0,"normal"),l.setFontSize(6.5),l.setTextColor(100,116,139),l.text("HSE Training Management System \u2014 Confidential & Controlled Document",p,A+10,{align:"left"}),l.setFontSize(8),l.setTextColor(37,99,235),l.setFont(void 0,"bold"),l.text(`${k+1} / ${b}`,c/2,A+7.5,{align:"center"}),l.setFont(void 0,"normal"),l.setFontSize(7),l.setTextColor(100,116,139),l.text(`Generated: ${S} ${I}`,c-p,A+5,{align:"right"}),l.text("ISO 45001:2018 Standard Compliance",c-p,A+10,{align:"right"})}const h=`\u0644\u0648\u062D\u0629_\u062A\u062D\u0644\u064A\u0644\u0627\u062A_\u0648\u0645\u0624\u0634\u0631\u0627\u062A_\u0627\u0644\u062A\u062F\u0631\u064A\u0628_${new Date().toISOString().slice(0,10)}.pdf`;l.save(h),Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0644\u0648\u062D\u0629 \u0645\u0624\u0634\u0631\u0627\u062A \u0648\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D")}catch(i){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0635\u062F\u064A\u0631 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0628\u0635\u064A\u063A\u0629 PDF: "+(i.message||""))}finally{e&&(e.disabled=!1,e.innerHTML=a)}},_tBindAnalyticsEvents(){const t=document.getElementById("train-analytics-root");if(!t)return;t.querySelectorAll(".train-period-btn").forEach(r=>{r.addEventListener("click",()=>{this._trainPeriod=r.getAttribute("data-period"),t.querySelectorAll(".train-period-btn").forEach(s=>{const l=s===r;s.style.background=l?"#fff":"rgba(255,255,255,0.15)",s.style.color=l?"#312e81":"#fff"}),this.updateTrainingAnalyticsDashboard()})});const e=document.getElementById("train-analytics-refresh");e&&e.addEventListener("click",()=>this.updateTrainingAnalyticsDashboard());const a=document.getElementById("train-export-pdf-btn");a&&a.addEventListener("click",()=>this._tExportPDF());const i=document.getElementById("train-toggle-filters-btn"),n=document.getElementById("train-filter-panel");i&&n&&i.addEventListener("click",()=>{const r=n.style.display!=="none";n.style.display=r?"none":"block",i.style.background=r?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.35)"});const o=document.getElementById("train-filter-reset-btn");o&&o.addEventListener("click",()=>{["train-af-status","train-af-type","train-af-trainer","train-af-factory","train-af-location"].forEach(r=>{const s=document.getElementById(r);s&&(s.value="")}),this.updateTrainingAnalyticsDashboard()}),["train-af-status","train-af-type","train-af-trainer","train-af-factory","train-af-location"].forEach(r=>{const s=document.getElementById(r);s&&s.addEventListener("change",()=>this.updateTrainingAnalyticsDashboard())})},_legalTrainingsLocalSaveTime:0,_legalRegisterLocalSaveTime:0,LEGAL_CATEGORIES:[{value:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",label:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",ref:"\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0639\u0645\u0644 12/2003 - \u0627\u0644\u0628\u0627\u0628 \u0627\u0644\u062E\u0627\u0645\u0633"},{value:"\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",label:"\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",ref:"\u0642\u0631\u0627\u0631 211/2003"},{value:"\u0627\u0644\u062D\u0645\u0627\u064A\u0629 \u0645\u0646 \u0627\u0644\u062D\u0631\u064A\u0642",label:"\u0627\u0644\u062D\u0645\u0627\u064A\u0629 \u0645\u0646 \u0627\u0644\u062D\u0631\u064A\u0642",ref:"\u0642\u0627\u0646\u0648\u0646 12/2003 \u0645\u0627\u062F\u0629 208-209"},{value:"\u0627\u0644\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A\u0629",label:"\u0627\u0644\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A\u0629",ref:"\u0642\u0631\u0627\u0631 211/2003 \u0645\u0627\u062F\u0629 6"},{value:"\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0637\u0631\u0629 \u0648\u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629",label:"\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062E\u0637\u0631\u0629 \u0648\u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629",ref:"\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0628\u064A\u0626\u0629 4/1994 + \u0642\u0631\u0627\u0631 211/2003"},{value:"\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0628\u064A\u0626\u0629",label:"\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0628\u064A\u0626\u0629",ref:"\u0642\u0627\u0646\u0648\u0646 4/1994 \u0627\u0644\u0645\u0639\u062F\u0644 \u0628\u0640 9/2009"},{value:"\u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A",label:"\u0627\u0644\u0639\u0645\u0644 \u0639\u0644\u0649 \u0627\u0631\u062A\u0641\u0627\u0639\u0627\u062A",ref:"\u0642\u0631\u0627\u0631 211/2003"},{value:"\u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629",label:"\u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u063A\u0644\u0642\u0629",ref:"\u0642\u0631\u0627\u0631 211/2003"},{value:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644",label:"\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644",ref:"ISO 45001 \u0628\u0646\u062F 7.2"},{value:"\u0627\u0644\u062A\u0648\u0639\u064A\u0629 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0627\u0644\u0639\u0627\u0645\u0629",label:"\u0627\u0644\u062A\u0648\u0639\u064A\u0629 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0627\u0644\u0639\u0627\u0645\u0629",ref:"\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0639\u0645\u0644 12/2003"}],LEGAL_FREQUENCIES:[{value:"\u0633\u0646\u0648\u064A",label:"\u0633\u0646\u0648\u064A"},{value:"\u0646\u0635\u0641 \u0633\u0646\u0648\u064A",label:"\u0646\u0635\u0641 \u0633\u0646\u0648\u064A"},{value:"\u0631\u0628\u0639 \u0633\u0646\u0648\u064A",label:"\u0631\u0628\u0639 \u0633\u0646\u0648\u064A"},{value:"\u0634\u0647\u0631\u064A",label:"\u0634\u0647\u0631\u064A"},{value:"\u0644\u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629",label:"\u0644\u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629"},{value:"\u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629",label:"\u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629"}],getLegalTrainingStats(){this.ensureData();const t=AppState.appData.legalTrainings||[],e=new Date;let a=0,i=0,n=0,o=0,r=0,s=0;t.forEach(c=>{const d=c.complianceStatus||"";if(d==="\u0645\u0645\u062A\u062B\u0644"?a++:d==="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"?i++:d==="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?n++:d==="\u0645\u062E\u0637\u0637"&&o++,c.status==="\u0645\u0643\u062A\u0645\u0644"&&r++,c.expiryDate){const p=new Date(c.expiryDate);p<e&&c.status!=="\u0645\u0643\u062A\u0645\u0644"?s++:p>e&&Math.ceil((p-e)/864e5)<=30&&d!=="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"&&n++}});const l=t.length>0?Math.round(a/t.length*100):0;return{total:t.length,compliant:a,nonCompliant:i,expiringSoon:n,planned:o,completed:r,overdue:s,complianceRate:l}},_legalRegisterSubTab:"register",LEGAL_LAW_TYPES:[{value:"law",label:"\u0642\u0627\u0646\u0648\u0646"},{value:"regulation",label:"\u0644\u0627\u0626\u062D\u0629 / \u0642\u0631\u0627\u0631 \u0648\u0632\u0627\u0631\u064A"},{value:"decree",label:"\u0645\u0631\u0633\u0648\u0645"},{value:"standard",label:"\u0645\u0648\u0627\u0635\u0641\u0629 \u0642\u064A\u0627\u0633\u064A\u0629"},{value:"code",label:"\u0643\u0648\u062F / \u062F\u0644\u064A\u0644"},{value:"other",label:"\u0623\u062E\u0631\u0649"}],LEGAL_REGISTER_STATUSES:[{value:"applicable",label:"\u0646\u0627\u0641\u0630",color:"green"},{value:"amended",label:"\u0645\u0639\u062F\u0644",color:"amber"},{value:"repealed",label:"\u0645\u0644\u063A\u064A",color:"red"},{value:"pending",label:"\u0642\u064A\u062F \u0627\u0644\u0625\u0635\u062F\u0627\u0631",color:"blue"}],LEGAL_PRIORITIES:[{value:"high",label:"\u0639\u0627\u0644\u064A\u0629",color:"red"},{value:"medium",label:"\u0645\u062A\u0648\u0633\u0637\u0629",color:"amber"},{value:"low",label:"\u0645\u0646\u062E\u0641\u0636\u0629",color:"green"}],LEGAL_REGISTER_CATEGORIES:[{value:"labor",label:"\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0639\u0645\u0644"},{value:"safety",label:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629"},{value:"environment",label:"\u0627\u0644\u0628\u064A\u0626\u0629"},{value:"civil_defense",label:"\u0627\u0644\u062F\u0641\u0627\u0639 \u0627\u0644\u0645\u062F\u0646\u064A \u0648\u0627\u0644\u062D\u0631\u064A\u0642"},{value:"social_insurance",label:"\u0627\u0644\u062A\u0623\u0645\u064A\u0646\u0627\u062A \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629"},{value:"tax",label:"\u0627\u0644\u0636\u0631\u0627\u0626\u0628"},{value:"municipal",label:"\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0628\u0644\u062F\u064A\u0629"},{value:"industry",label:"\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0635\u0646\u0627\u0639\u064A\u0629"},{value:"quality",label:"\u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A"},{value:"other",label:"\u0623\u062E\u0631\u0649"}],getLegalRegisterStats(){const t=AppState.appData.legalRegister||[];let e=0,a=0,i=0,n=0,o=0,r=0,s=0,l=0;t.forEach(p=>{const g=p.status||"";g==="applicable"?e++:g==="amended"?a++:g==="repealed"?i++:g==="pending"&&n++;const f=p.priority||"";f==="high"?o++:f==="medium"?r++:f==="low"&&s++;let u=p.amendments;if(typeof u=="string")try{u=JSON.parse(u)}catch{u=[]}Array.isArray(u)&&u.length>0&&l++});const c=t.length,d=c>0?Math.round((e+a)/c*100):0;return{total:c,applicable:e,amended:a,repealed:i,pending:n,high:o,medium:r,low:s,withAmendments:l,complianceRate:d}},renderLegalTrainingTab(){const t=this.getLegalTrainingStats(),e=this.getLegalRegisterStats(),a=this._legalRegisterSubTab||"register";return`
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
                                <button id="export-legal-training-pdf-btn" class="legal-action-btn btn-pdf" title="\u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 PDF \u0645\u0628\u0627\u0634\u0631\u0629">
                                    <i class="fas fa-file-download"></i>
                                </button>
                                <button id="print-legal-training-pdf-btn" class="legal-action-btn" style="background:#475569; color:#fff;" title="\u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u0637\u0628\u0627\u0639\u0629 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629">
                                    <i class="fas fa-print"></i>
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
        `},loadLegalTrainingList(){this.ensureData();const t=document.getElementById("legal-training-container");if(!t)return;const e=this.getLegalTrainingStats(),a={"legal-total-count":e.total,"legal-compliant-count":e.compliant,"legal-noncompliant-count":e.nonCompliant,"legal-expiring-count":e.expiringSoon,"legal-compliance-rate":e.complianceRate+"%"};Object.keys(a).forEach(d=>{const p=document.getElementById(d);p&&(p.textContent=a[d])});let i=AppState.appData.legalTrainings||[];const n=document.getElementById("legal-training-category-filter"),o=document.getElementById("legal-training-compliance-filter"),r=document.getElementById("legal-training-search");if(n&&n.value&&(i=i.filter(d=>d.category===n.value)),o&&o.value&&(i=i.filter(d=>d.complianceStatus===o.value)),r&&r.value.trim()){const d=r.value.trim().toLowerCase();i=i.filter(p=>(p.title||"").toLowerCase().includes(d)||(p.legalReference||"").toLowerCase().includes(d)||(p.trainer||"").toLowerCase().includes(d)||(p.category||"").toLowerCase().includes(d))}if(i.length===0){t.innerHTML='<div class="text-center py-8 text-gray-500"><i class="fas fa-gavel text-4xl mb-3 text-gray-300"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0645\u0633\u062C\u0644\u0629</p></div>',this._bindLegalTrainingEvents();return}const s=d=>`<span class="px-2 py-1 rounded-full text-xs font-medium ${{\u0645\u0645\u062A\u062B\u0644:"bg-green-100 text-green-800","\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644":"bg-red-100 text-red-800","\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":"bg-amber-100 text-amber-800",\u0645\u062E\u0637\u0637:"bg-blue-100 text-blue-800"}[d]||"bg-gray-100 text-gray-800"}">${d||"\u2014"}</span>`,l=d=>`<span class="px-2 py-1 rounded-full text-xs font-medium ${{\u0645\u0643\u062A\u0645\u0644:"bg-green-100 text-green-800",\u0645\u062E\u0637\u0637:"bg-blue-100 text-blue-800","\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630":"bg-yellow-100 text-yellow-800",\u0645\u0644\u063A\u064A:"bg-gray-100 text-gray-600","\u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629":"bg-red-100 text-red-800"}[d]||"bg-gray-100 text-gray-800"}">${d||"\u2014"}</span>`,c=i.map(d=>`
            <tr>
                <td class="text-sm font-mono text-gray-500">${d.id||"\u2014"}</td>
                <td class="text-sm font-medium">${d.title||"\u2014"}</td>
                <td class="text-sm text-gray-600">${d.category||"\u2014"}</td>
                <td class="text-sm text-gray-600" title="${d.legalArticle||""}">${d.legalReference||"\u2014"}</td>
                <td class="text-sm">${d.frequency||"\u2014"}</td>
                <td class="text-sm">${d.scheduledDate||"\u2014"}</td>
                <td class="text-sm">${d.actualDate||"\u2014"}</td>
                <td class="text-sm">${d.trainer||"\u2014"}</td>
                <td class="text-sm text-center">${d.duration||"\u2014"}</td>
                <td class="text-sm text-center">${d.participantsCount||"\u2014"}</td>
                <td>${l(d.status)}</td>
                <td>${s(d.complianceStatus)}</td>
                <td class="text-sm">${d.expiryDate||"\u2014"}</td>
                <td>
                    <div class="flex items-center gap-1">
                        <button class="btn-icon btn-sm" onclick="Training.showLegalTrainingAttendees('${d.id}')" title="\u0627\u0644\u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u0648\u0627\u0644\u0634\u0647\u0627\u062F\u0627\u062A">
                            <i class="fas fa-users"></i>
                        </button>
                        <button class="btn-icon btn-sm" onclick="Training.showLegalTrainingForm('${d.id}')" title="\u062A\u0639\u062F\u064A\u0644">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${this.isCurrentUserAdmin()?`
                        <button class="btn-icon btn-sm text-red-600" onclick="Training.deleteLegalTrainingRecord('${d.id}')" title="\u062D\u0630\u0641">
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
                    <tbody>${c}</tbody>
                </table>
            </div>
        `,this._bindLegalTrainingEvents()},_bindLegalTrainingEvents(){const t=document.getElementById("legal-training-category-filter"),e=document.getElementById("legal-training-compliance-filter"),a=document.getElementById("legal-training-search"),i=document.getElementById("reset-legal-filter-btn"),n=document.getElementById("add-legal-training-btn"),o=document.getElementById("export-legal-training-excel-btn"),r=document.getElementById("export-legal-training-pdf-btn");if(t&&!t.dataset.bound&&(t.addEventListener("change",()=>this.loadLegalTrainingList()),t.dataset.bound="1"),e&&!e.dataset.bound&&(e.addEventListener("change",()=>this.loadLegalTrainingList()),e.dataset.bound="1"),a&&!a.dataset.bound){let c;a.addEventListener("input",()=>{clearTimeout(c),c=setTimeout(()=>this.loadLegalTrainingList(),300)}),a.dataset.bound="1"}i&&!i.dataset.bound&&(i.addEventListener("click",()=>{t&&(t.value=""),e&&(e.value=""),a&&(a.value=""),this.loadLegalTrainingList()}),i.dataset.bound="1"),n&&!n.dataset.bound&&(n.addEventListener("click",()=>this.showLegalTrainingForm()),n.dataset.bound="1"),o&&!o.dataset.bound&&(o.addEventListener("click",()=>this.exportLegalTrainingExcel()),o.dataset.bound="1"),r&&!r.dataset.bound&&(r.addEventListener("click",()=>this.exportLegalTrainingPdf("download")),r.dataset.bound="1");const s=document.getElementById("print-legal-training-pdf-btn");s&&!s.dataset.bound&&(s.addEventListener("click",()=>this.exportLegalTrainingPdf("print")),s.dataset.bound="1");const l=document.querySelectorAll(".legal-sub-tab");l.forEach(c=>{c.dataset.bound||(c.addEventListener("click",()=>{const d=c.dataset.sub;this._legalRegisterSubTab=d,l.forEach(p=>p.classList.toggle("active",p.dataset.sub===d)),document.getElementById("legal-register-section")?.classList.toggle("hidden",d!=="register"),document.getElementById("legal-training-section")?.classList.toggle("hidden",d!=="training"),d==="register"?this.loadLegalRegisterList():this.loadLegalTrainingList()}),c.dataset.bound="1")})},showLegalTrainingForm(t){this.ensureData();let e=null;t&&(e=(AppState.appData.legalTrainings||[]).find(d=>d.id===t));const a=!!e,i=(d,p)=>e&&e[d]!=null?e[d]:p||"",n='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641</option>'+this.LEGAL_CATEGORIES.map(d=>`<option value="${d.value}" ${i("category")===d.value?"selected":""}>${d.label} \u2014 ${d.ref}</option>`).join(""),o='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062F\u0648\u0631\u064A\u0629</option>'+this.LEGAL_FREQUENCIES.map(d=>`<option value="${d.value}" ${i("frequency")===d.value?"selected":""}>${d.label}</option>`).join(""),r=`
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
                                        <select id="lt-frequency" class="form-input" required>${o}</select>
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
        `,s=document.getElementById("legal-training-modal");s&&s.remove(),document.body.insertAdjacentHTML("beforeend",r);const l=document.getElementById("lt-category"),c=document.getElementById("lt-legalReference");l&&c&&l.addEventListener("change",()=>{const d=this.LEGAL_CATEGORIES.find(p=>p.value===l.value);d&&!c.value&&(c.value=d.ref)})},async handleLegalTrainingSubmit(t){t.preventDefault();const e=document.getElementById("legal-training-edit-id")?.value,a=!!e,i=r=>{const s=document.getElementById(r);return s?s.value.trim():""},n={title:i("lt-title"),category:i("lt-category"),legalReference:i("lt-legalReference"),legalArticle:i("lt-legalArticle"),frequency:i("lt-frequency"),targetGroup:i("lt-targetGroup"),department:i("lt-department"),factory:i("lt-factory"),factoryName:i("lt-factory"),scheduledDate:i("lt-scheduledDate"),actualDate:i("lt-actualDate"),trainer:i("lt-trainer"),trainerQualification:i("lt-trainerQualification"),duration:i("lt-duration"),participantsCount:i("lt-participantsCount"),status:i("lt-status"),complianceStatus:i("lt-complianceStatus"),expiryDate:i("lt-expiryDate"),nextDueDate:i("lt-nextDueDate"),certificateRequired:i("lt-certificateRequired"),penaltyForNonCompliance:i("lt-penaltyForNonCompliance"),notes:i("lt-notes")};if(!n.title||!n.category||!n.frequency){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629: \u0627\u0644\u0639\u0646\u0648\u0627\u0646\u060C \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u060C \u0627\u0644\u062F\u0648\u0631\u064A\u0629");return}const o=document.getElementById("legal-training-modal");try{if(a){n.id=e,n.updatedAt=new Date().toISOString();const r=AppState.appData.legalTrainings||[],s=r.findIndex(l=>l.id===e);if(s!==-1&&Object.assign(r[s],n),this._legalTrainingsLocalSaveTime=Date.now(),o&&o.remove(),this._markAllTabsDirty(),this.loadLegalTrainingList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{await GoogleIntegration.sendRequest({action:"updateLegalTraining",data:{trainingId:e,updateData:n}})}catch(l){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645:",l)}}else{n.createdAt=new Date().toISOString(),n.updatedAt=n.createdAt,n.createdBy=AppState.currentUser?.email||"",AppState.appData.legalTrainings||(AppState.appData.legalTrainings=[]);const r="LTR-LOCAL-"+Date.now();if(n.id=r,AppState.appData.legalTrainings.unshift(n),this._legalTrainingsLocalSaveTime=Date.now(),o&&o.remove(),this._markAllTabsDirty(),this.loadLegalTrainingList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A..."),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const s=Object.assign({},n);delete s.id;try{Utils.safeLog("\u{1F4E4} \u0625\u0631\u0633\u0627\u0644 addLegalTraining \u0625\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645:",JSON.stringify(s).substring(0,200));const l=await GoogleIntegration.sendRequest({action:"addLegalTraining",data:s});if(Utils.safeLog("\u{1F4E5} \u0631\u062F \u0627\u0644\u062E\u0627\u062F\u0645 addLegalTraining:",JSON.stringify(l).substring(0,300)),l&&l.success&&l.data&&l.data.id){const c=AppState.appData.legalTrainings||[],d=c.findIndex(p=>p.id===r);d!==-1&&(c[d].id=l.data.id),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D \u2705")}else Utils.safeWarn("\u26A0\uFE0F \u0627\u0644\u062E\u0627\u062F\u0645 \u0644\u0645 \u064A\u0631\u062C\u0639 \u0646\u062C\u0627\u062D:",l),typeof Notification<"u"&&Notification.warning&&Notification.warning("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(l?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}catch(l){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645:",l),typeof Notification<"u"&&Notification.error&&Notification.error("\u274C \u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: "+(l?.message||l))}}else Utils.safeWarn("\u26A0\uFE0F GoogleIntegration \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u2014 \u0644\u0646 \u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),typeof Notification<"u"&&Notification.warning&&Notification.warning("\u26A0\uFE0F \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D")}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",r),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638")}},async deleteLegalTrainingRecord(t){if(t&&confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u061F"))try{const e=AppState.appData.legalTrainings||[];AppState.appData.legalTrainings=e.filter(a=>a.id!==t),this._legalTrainingsLocalSaveTime=Date.now(),this._markAllTabsDirty(),this.loadLegalTrainingList(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"deleteLegalTraining",data:{trainingId:t}}).catch(a=>Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",a))}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",e)}},loadLegalRegisterList(){const t=document.getElementById("lr-container");if(!t)return;const e=this.getLegalRegisterStats(),a=["lr-total-count","lr-applicable-count","lr-amended-count","lr-repealed-count","lr-compliance-rate"],i=[e.total,e.applicable,e.amended,e.repealed,e.complianceRate+"%"];a.forEach((u,m)=>{const y=document.getElementById(u);y&&(y.textContent=i[m])});let n=AppState.appData.legalRegister||[];const o=document.getElementById("lr-category-filter"),r=document.getElementById("lr-status-filter"),s=document.getElementById("lr-priority-filter"),l=document.getElementById("lr-search");if(o&&o.value&&(n=n.filter(u=>u.category===o.value)),r&&r.value&&(n=n.filter(u=>u.status===r.value)),s&&s.value&&(n=n.filter(u=>u.priority===s.value)),l&&l.value.trim()){const u=l.value.trim().toLowerCase();n=n.filter(m=>(m.title||"").toLowerCase().includes(u)||(m.legalReference||"").toLowerCase().includes(u)||(m.issuingAuthority||"").toLowerCase().includes(u)||(m.lawNumber||"").toLowerCase().includes(u))}if(n.length===0){t.innerHTML='<div class="text-center py-8 text-gray-500"><i class="fas fa-balance-scale text-4xl mb-3 text-gray-300"></i><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p></div>',this._bindLegalRegisterEvents();return}const c=u=>({applicable:'<span class="lr-badge lr-badge-green">\u0646\u0627\u0641\u0630</span>',amended:'<span class="lr-badge lr-badge-amber">\u0645\u0639\u062F\u0644</span>',repealed:'<span class="lr-badge lr-badge-red">\u0645\u0644\u063A\u064A</span>',pending:'<span class="lr-badge lr-badge-blue">\u0642\u064A\u062F \u0627\u0644\u0625\u0635\u062F\u0627\u0631</span>'})[u]||'<span class="lr-badge lr-badge-gray">\u2014</span>',d=u=>({high:'<span class="lr-priority lr-priority-high">\u0639\u0627\u0644\u064A\u0629</span>',medium:'<span class="lr-priority lr-priority-medium">\u0645\u062A\u0648\u0633\u0637\u0629</span>',low:'<span class="lr-priority lr-priority-low">\u0645\u0646\u062E\u0641\u0636\u0629</span>'})[u]||'<span class="lr-priority">\u2014</span>',p=u=>{const m=this.LEGAL_LAW_TYPES.find(y=>y.value===u);return m?m.label:u||"\u2014"},g=u=>{let m=u.amendments;if(typeof m=="string")try{m=JSON.parse(m)}catch{m=[]}return Array.isArray(m)?m.length:0},f=n.map(u=>{const m=g(u);return`
            <tr>
                <td class="text-sm font-mono text-gray-500">${u.id||"\u2014"}</td>
                <td class="text-sm font-medium">${u.title||"\u2014"}</td>
                <td class="text-sm text-gray-600">${u.issuingAuthority||"\u2014"}</td>
                <td class="text-sm text-gray-600">${p(u.lawType)} ${u.lawNumber?"\u0631\u0642\u0645 "+u.lawNumber:""} ${u.lawYear?"("+u.lawYear+")":""}</td>
                <td class="text-sm text-gray-600">${u.legalReference||"\u2014"}</td>
                <td>${c(u.status)}</td>
                <td>${d(u.priority)}</td>
                <td class="text-sm text-center">${u.issueDate||"\u2014"}</td>
                <td class="text-sm text-center">
                    <button class="lr-amd-btn" onclick="Training.showLegalAmendments('${u.id}')" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629">
                        <i class="fas fa-history"></i>
                        ${m>0?`<span class="lr-amd-badge">${m}</span>`:""}
                    </button>
                </td>
                <td>
                    <div class="flex items-center gap-1">
                        <button class="btn-icon btn-sm" onclick="Training.showLegalRegisterForm('${u.id}')" title="\u062A\u0639\u062F\u064A\u0644">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon btn-sm text-red-600" onclick="Training.deleteLegalRegisterRecord('${u.id}')" title="\u062D\u0630\u0641">
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
        `,this._bindLegalRegisterEvents()},_bindLegalRegisterEvents(){const t=document.getElementById("lr-category-filter"),e=document.getElementById("lr-status-filter"),a=document.getElementById("lr-priority-filter"),i=document.getElementById("lr-search"),n=document.getElementById("lr-reset-filter-btn"),o=document.getElementById("lr-add-btn"),r=()=>this.loadLegalRegisterList();t&&(t.onchange=r),e&&(e.onchange=r),a&&(a.onchange=r),i&&(i.oninput=Utils.debounce?Utils.debounce(r,300):r),n&&(n.onclick=()=>{t&&(t.value=""),e&&(e.value=""),a&&(a.value=""),i&&(i.value=""),r()}),o&&(o.onclick=()=>this.showLegalRegisterForm())},showLegalRegisterForm(t){this.ensureData();let e=null;t&&(e=(AppState.appData.legalRegister||[]).find(d=>d.id===t));const a=!!e,i=(d,p)=>e&&e[d]!=null?e[d]:p||"",n='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>'+this.LEGAL_LAW_TYPES.map(d=>`<option value="${d.value}" ${i("lawType")===d.value?"selected":""}>${d.label}</option>`).join(""),o=this.LEGAL_REGISTER_STATUSES.map(d=>`<option value="${d.value}" ${i("status","applicable")===d.value?"selected":""}>${d.label}</option>`).join(""),r=this.LEGAL_PRIORITIES.map(d=>`<option value="${d.value}" ${i("priority","medium")===d.value?"selected":""}>${d.label}</option>`).join(""),s='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641</option>'+this.LEGAL_REGISTER_CATEGORIES.map(d=>`<option value="${d.value}" ${i("category")===d.value?"selected":""}>${d.label}</option>`).join(""),l=`
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
                                        <select id="lr-category" class="form-input" required>${s}</select>
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
                                        <select id="lr-status" class="form-input">${o}</select>
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
        `,c=document.getElementById("lr-modal");c&&c.remove(),document.body.insertAdjacentHTML("beforeend",l)},async handleLegalRegisterSubmit(t){t.preventDefault();const e=document.getElementById("lr-edit-id")?.value,a=!!e,i=r=>{const s=document.getElementById(r);return s?s.value.trim():""},n={title:i("lr-title"),issuingAuthority:i("lr-issuingAuthority"),lawType:i("lr-lawType"),lawNumber:i("lr-lawNumber"),lawYear:i("lr-lawYear"),category:i("lr-category"),issueDate:i("lr-issueDate"),effectiveDate:i("lr-effectiveDate"),nextReviewDate:i("lr-nextReviewDate")||i("lr-nextReviewDate2"),legalReference:i("lr-legalReference"),legalArticles:i("lr-legalArticles"),scopeOfApplication:i("lr-scopeOfApplication"),responsibleDepartment:i("lr-responsibleDepartment"),priority:i("lr-priority"),status:i("lr-status"),summary:i("lr-summary"),notes:i("lr-notes")};if(!n.title||!n.issuingAuthority||!n.lawType||!n.category){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629: \u0627\u0644\u0639\u0646\u0648\u0627\u0646\u060C \u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u060C \u0627\u0644\u0646\u0648\u0639\u060C \u0627\u0644\u062A\u0635\u0646\u064A\u0641");return}const o=document.getElementById("lr-modal");try{if(a){n.id=e,n.updatedAt=new Date().toISOString();const r=AppState.appData.legalRegister||[],s=r.findIndex(l=>l.id===e);if(s!==-1){const l=r[s].amendments||[];n.amendments=l,Object.assign(r[s],n),this._legalRegisterLocalSaveTime=Date.now()}o&&o.remove(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"updateLegalRegister",data:{registerId:e,updateData:n}}).catch(()=>{})}else{n.createdAt=new Date().toISOString(),n.updatedAt=n.createdAt,n.amendments=[],AppState.appData.legalRegister||(AppState.appData.legalRegister=[]);const r="LR-LOCAL-"+Date.now();if(n.id=r,AppState.appData.legalRegister.unshift(n),this._legalRegisterLocalSaveTime=Date.now(),o&&o.remove(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A..."),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const s=Object.assign({},n);delete s.id,GoogleIntegration.sendRequest({action:"addLegalRegister",data:s}).then(l=>{if(l&&l.success&&l.data&&l.data.id){const c=AppState.appData.legalRegister||[],d=c.findIndex(p=>p.id===r);d!==-1&&(c[d].id=l.data.id),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D \u2705")}}).catch(l=>Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",l))}}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(r){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",r),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638")}},async deleteLegalRegisterRecord(t){if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u061F"))try{const e=AppState.appData.legalRegister||[];AppState.appData.legalRegister=e.filter(a=>a.id!==t),this._legalRegisterLocalSaveTime=Date.now(),typeof DataManager<"u"&&DataManager.save&&DataManager.save(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"deleteLegalRegister",data:{registerId:t}}).catch(a=>Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",a))}catch(e){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A:",e)}},showLegalAmendments(t){this.ensureData();const e=(AppState.appData.legalRegister||[]).find(o=>o.id===t);if(!e){typeof Notification<"u"&&Notification.error&&Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}let a=e.amendments;if(typeof a=="string")try{a=JSON.parse(a)}catch{a=[]}Array.isArray(a)||(a=[]);const i=`
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
                                ${a.map((o,r)=>`
                                    <div class="lr-amd-item lr-amd-${r%2===0?"right":"left"}">
                                        <div class="lr-amd-dot"></div>
                                        <div class="lr-amd-content">
                                            <div class="lr-amd-header">
                                                <span class="lr-amd-num">\u062A\u062D\u062F\u064A\u062B ${o.amendmentNumber||r+1}</span>
                                                <span class="lr-amd-date">${o.date||""}</span>
                                            </div>
                                            <h4 class="lr-amd-title">${o.title||"\u062A\u062D\u062F\u064A\u062B"}</h4>
                                            <p class="lr-amd-desc">${o.description||""}</p>
                                            ${o.affectedArticles?`<div class="lr-amd-articles"><i class="fas fa-gavel"></i> \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u0629: ${o.affectedArticles}</div>`:""}
                                            ${o.newRequirements?`<div class="lr-amd-req"><i class="fas fa-clipboard-list"></i> \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629: ${o.newRequirements}</div>`:""}
                                            ${o.referenceLaw?`<div class="lr-amd-ref"><i class="fas fa-book"></i> \u0627\u0644\u0645\u0631\u062C\u0639: ${o.referenceLaw}</div>`:""}
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
        `,a=document.getElementById("lr-amd-form-modal");a&&a.remove(),document.body.insertAdjacentHTML("beforeend",e)},async handleAmendmentSubmit(t,e){t.preventDefault();const a=l=>{const c=document.getElementById(l);return c?c.value.trim():""},i={id:"AMD-"+Date.now(),amendmentNumber:a("lr-amd-number"),date:a("lr-amd-date"),title:a("lr-amd-title"),description:a("lr-amd-description"),affectedArticles:a("lr-amd-articles"),newRequirements:a("lr-amd-requirements"),referenceLaw:a("lr-amd-reference"),createdAt:new Date().toISOString()};if(!i.title||!i.amendmentNumber){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0648\u0627\u0644\u0639\u0646\u0648\u0627\u0646");return}const o=(AppState.appData.legalRegister||[]).find(l=>l.id===e);if(!o){typeof Notification<"u"&&Notification.error&&Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}let r=o.amendments;if(typeof r=="string")try{r=JSON.parse(r)}catch{r=[]}Array.isArray(r)||(r=[]),r.push(i),o.amendments=r,o.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();const s=document.getElementById("lr-amd-form-modal");s&&s.remove(),this.loadLegalRegisterList(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A \u0628\u0646\u062C\u0627\u062D"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"updateLegalRegister",data:{registerId:e,updateData:{amendments:JSON.stringify(r),updatedAt:o.updatedAt}}}).catch(()=>{}),this.showLegalAmendments(e)},exportLegalTrainingExcel(){try{this.ensureData();const t=AppState.appData.legalTrainings||[];if(t.length===0){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const e=["\u0627\u0644\u0631\u0642\u0645","\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","\u0627\u0644\u062A\u0635\u0646\u064A\u0641","\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A","\u0627\u0644\u0645\u0627\u062F\u0629/\u0627\u0644\u0628\u0646\u062F","\u0627\u0644\u062F\u0648\u0631\u064A\u0629","\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629","\u0627\u0644\u0642\u0633\u0645","\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0639\u0644\u064A","\u0627\u0644\u0645\u062F\u0631\u0628","\u0645\u0624\u0647\u0644\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0628","\u0627\u0644\u0645\u062F\u0629 (\u0633\u0627\u0639\u0629)","\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646","\u0627\u0644\u062D\u0627\u0644\u0629","\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621","\u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0627\u0644\u062A\u0627\u0644\u064A","\u064A\u062A\u0637\u0644\u0628 \u0634\u0647\u0627\u062F\u0629","\u0639\u0642\u0648\u0628\u0629 \u0639\u062F\u0645 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],a=t.map(i=>[i.id||"",i.title||"",i.category||"",i.legalReference||"",i.legalArticle||"",i.frequency||"",i.targetGroup||"",i.department||"",i.factory||"",i.scheduledDate||"",i.actualDate||"",i.trainer||"",i.trainerQualification||"",i.duration||"",i.participantsCount||"",i.status||"",i.complianceStatus||"",i.expiryDate||"",i.nextDueDate||"",i.certificateRequired||"",i.penaltyForNonCompliance||"",i.notes||""]);if(typeof XLSX<"u"){const i=XLSX.utils.aoa_to_sheet([e,...a]),n=XLSX.utils.book_new();XLSX.utils.book_append_sheet(n,i,"\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629"),XLSX.writeFile(n,"\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A_\u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629_"+new Date().toISOString().slice(0,10)+".xlsx")}else Utils.safeWarn("\u0645\u0643\u062A\u0628\u0629 XLSX \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629")}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",t)}},async exportLegalTrainingPdf(t="download"){try{this.ensureData();const e=AppState.appData.legalTrainings||[];if(e.length===0){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}const a=document.getElementById("export-legal-training-pdf-btn");a&&(a.disabled=!0,a.innerHTML='<i class="fas fa-spinner fa-spin ml-1"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062C\u0647\u064A\u0632...'),Loading.show(t==="download"?"\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0628\u0635\u064A\u063A\u0629 PDF...":"\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629...");const i=this.getLegalTrainingStats(),n="DOC-HSE-TRN-LEG-01",o="\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064A\u0629",s=this.getIsoPrintHeaderHtml(o,"Mandatory & Legal Training Compliance Registry",n,"Rev. 03","\u062F\u0627\u062E\u0644\u064A \u0648\u0645\u0639\u062A\u0645\u062F"),l=this.getIsoPrintFooterHtml(n,"Rev. 03","ISO 45001:2018 (Clause 7.2 Competence & Clause 6.1.3 Legal Requirements)"),c=["\u0645","\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628","\u0627\u0644\u062A\u0635\u0646\u064A\u0641","\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A","\u0627\u0644\u062F\u0648\u0631\u064A\u0629","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637","\u0627\u0644\u062D\u0627\u0644\u0629","\u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"],d=e.map((f,u)=>{const m=f.status==="\u0645\u0643\u062A\u0645\u0644"?"background: #dcfce7; color: #166534;":f.status==="\u0645\u062E\u0637\u0637"?"background: #dbeafe; color: #1e40af;":f.status==="\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"?"background: #fef3c7; color: #92400e;":"background: #f1f5f9; color: #475569;",y=f.complianceStatus==="\u0645\u0645\u062A\u062B\u0644"?"background: #dcfce7; color: #166534;":f.complianceStatus==="\u063A\u064A\u0631 \u0645\u0645\u062A\u062B\u0644"?"background: #fecaca; color: #991b1b;":f.complianceStatus==="\u0642\u0627\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"?"background: #fef3c7; color: #92400e;":"background: #dbeafe; color: #1e40af;";return`
                    <tr style="background: ${u%2===0?"#ffffff":"#f8fafc"};">
                        <td style="padding: 7px 5px; border: 1px solid #e2e8f0; text-align: center; color: #64748b; font-weight: 600; font-size: 10px;">${u+1}</td>
                        <td style="padding: 7px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700; color: #0f172a; font-size: 10px;">${Utils.escapeHTML(f.title||"\u2014")}</td>
                        <td style="padding: 7px 6px; border: 1px solid #e2e8f0; text-align: right; color: #475569; font-size: 10px;">${Utils.escapeHTML(f.category||"\u2014")}</td>
                        <td style="padding: 7px 6px; border: 1px solid #e2e8f0; text-align: right; color: #475569; font-size: 10px;">${Utils.escapeHTML(f.legalReference||"\u2014")}</td>
                        <td style="padding: 7px 6px; border: 1px solid #e2e8f0; text-align: center; font-size: 10px;">${Utils.escapeHTML(f.frequency||"\u2014")}</td>
                        <td style="padding: 7px 6px; border: 1px solid #e2e8f0; text-align: center; font-size: 10px; white-space: nowrap;">${Utils.escapeHTML(f.scheduledDate||"\u2014")}</td>
                        <td style="padding: 7px 6px; border: 1px solid #e2e8f0; text-align: center;">
                            <span style="display: inline-block; padding: 2px 7px; border-radius: 10px; font-size: 10px; font-weight: 600; ${m}">
                                ${Utils.escapeHTML(f.status||"\u2014")}
                            </span>
                        </td>
                        <td style="padding: 7px 6px; border: 1px solid #e2e8f0; text-align: center;">
                            <span style="display: inline-block; padding: 2px 7px; border-radius: 10px; font-size: 10px; font-weight: 600; ${y}">
                                ${Utils.escapeHTML(f.complianceStatus||"\u2014")}
                            </span>
                        </td>
                        <td style="padding: 7px 6px; border: 1px solid #e2e8f0; text-align: center; font-size: 10px; white-space: nowrap;">${Utils.escapeHTML(f.expiryDate||"\u2014")}</td>
                    </tr>
                `}).join(""),p=`
                ${s}

                <div class="handover-info-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 14px;">
                    <div class="info-card">
                        <div class="card-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629:</div>
                        <div class="card-value" style="color: #1e3a8a; font-size: 14px;">${e.length} \u0628\u0631\u0646\u0627\u0645\u062C</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0627\u0644\u0643\u0644\u064A\u0629:</div>
                        <div class="card-value" style="color: #047857; font-size: 14px;">${i.complianceRate}%</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0645\u062A\u062B\u0644\u0629:</div>
                        <div class="card-value" style="color: #15803d; font-size: 14px;">${i.compliant} \u0628\u0631\u0646\u0627\u0645\u062C</div>
                    </div>
                    <div class="info-card">
                        <div class="card-label">\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u063A\u064A\u0631 \u0627\u0644\u0645\u0645\u062A\u062B\u0644\u0629:</div>
                        <div class="card-value" style="color: #b91c1c; font-size: 14px;">${i.nonCompliant} \u0628\u0631\u0646\u0627\u0645\u062C</div>
                    </div>
                </div>

                <div style="margin-bottom: 16px;">
                    <table class="report-table" style="width: 100%; direction: rtl;">
                        <thead>
                            <tr style="background: #1e3a8a; color: #ffffff;">
                                ${c.map(f=>`<th style="padding: 9px 6px; border: 1px solid #1e40af; font-size: 10px; font-weight: 700; text-align: center;">${Utils.escapeHTML(f)}</th>`).join("")}
                            </tr>
                        </thead>
                        <tbody>
                            ${d}
                        </tbody>
                    </table>
                </div>

                <div class="signatures-grid" style="margin-top: 20px;">
                    <div class="sig-card">
                        <div class="sig-card-title">\u0625\u0639\u062F\u0627\u062F \u0648\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0633\u062C\u0644</div>
                        <div class="sig-card-name">\u0623\u062E\u0635\u0627\u0626\u064A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0643\u0641\u0627\u0621\u0627\u062A</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E</div>
                    </div>
                    <div class="sig-card">
                        <div class="sig-card-title">\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A</div>
                        <div class="sig-card-name">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                    </div>
                    <div class="sig-card">
                        <div class="sig-card-title">\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0646\u0647\u0627\u0626\u064A</div>
                        <div class="sig-card-name">\u0645\u062F\u064A\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                        <div class="sig-line-area">\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062E\u062A\u0645 \u0627\u0644\u0631\u0633\u0645\u064A</div>
                    </div>
                </div>

                ${l}
            `,g=`\u0633\u062C\u0644_\u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A_\u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629_${new Date().toISOString().slice(0,10)}.pdf`;if(t==="download"){const f=await this.downloadIsoReportAsPdf(o,p,g,!0);if(Loading.hide(),f)return Notification.success("\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0628\u0635\u064A\u063A\u0629 PDF \u0628\u0646\u062C\u0627\u062D"),!0}return Loading.hide(),this.openIsoPrintWindow(o,p,!0,"",g)}catch(e){return Loading.hide(),Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 PDF \u0644\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629:",e),Notification.error("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629: "+(e?.message||"")),!1}finally{const e=document.getElementById("export-legal-training-pdf-btn");e&&(e.disabled=!1,e.innerHTML='<i class="fas fa-file-pdf ml-1" style="font-size: 14px;"></i>PDF')}},_legalFileToBase64(t){return new Promise((e,a)=>{const i=new FileReader;i.onload=()=>e(i.result),i.onerror=a,i.readAsDataURL(t)})},showLegalTrainingAttendees(t){this.ensureData();const e=(AppState.appData.legalTrainings||[]).find(s=>s.id===t);if(!e){typeof Notification<"u"&&Notification.error&&Notification.error("\u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const a=(AppState.appData.legalTrainingAttendees||[]).filter(s=>s.legalTrainingId===t),i=s=>`<span class="px-2 py-1 rounded-full text-xs font-medium ${{\u062D\u0627\u0636\u0631:"bg-green-100 text-green-800",\u063A\u0627\u0626\u0628:"bg-red-100 text-red-800",\u0645\u0628\u0631\u0631:"bg-yellow-100 text-yellow-800"}[s]||"bg-gray-100 text-gray-800"}">${s||"\u2014"}</span>`,n=a.length===0?'<tr><td colspan="9" class="text-center py-6 text-gray-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u062A\u062F\u0631\u0628\u064A\u0646 \u0645\u0633\u062C\u0644\u064A\u0646 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646</td></tr>':a.map(s=>`
                <tr>
                    <td class="text-sm">${s.employeeCode||"\u2014"}</td>
                    <td class="text-sm font-medium">${s.employeeName||"\u2014"}</td>
                    <td class="text-sm">${s.employeePosition||"\u2014"}</td>
                    <td class="text-sm">${s.department||"\u2014"}</td>
                    <td class="text-sm">${s.attendanceDate||"\u2014"}</td>
                    <td>${i(s.attendanceStatus)}</td>
                    <td class="text-sm">${s.certificateNumber||"\u2014"}</td>
                    <td class="text-sm text-center">
                        ${s.certificateImage?`<a href="${s.certificateImage}" target="_blank" class="text-blue-600 hover:underline" title="\u0639\u0631\u0636 \u0627\u0644\u0634\u0647\u0627\u062F\u0629"><i class="fas fa-file-image"></i> \u0639\u0631\u0636</a>`:"\u2014"}
                    </td>
                    <td>
                        <div class="flex items-center gap-1">
                            <button class="btn-icon btn-sm" onclick="Training.showAddAttendeeForm('${t}', '${s.id}')" title="\u062A\u0639\u062F\u064A\u0644">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon btn-sm text-red-600" onclick="Training.deleteLegalTrainingAttendee('${s.id}', '${t}')" title="\u062D\u0630\u0641">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join(""),o=`
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
                            <div class="sum-item"><i class="fas fa-certificate"></i> ${a.filter(s=>s.certificateImage).length} \u0634\u0647\u0627\u062F\u0629 \u0645\u0631\u0641\u0642\u0629</div>
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
        `,r=document.getElementById("legal-attendees-modal");r&&r.remove(),document.body.insertAdjacentHTML("beforeend",o)},showAddAttendeeForm(t,e){this.ensureData();let a=null;e&&(a=(AppState.appData.legalTrainingAttendees||[]).find(c=>c.id===e));const i=!!a,n=(c,d)=>a&&a[c]!=null?a[c]:d||"",o=(AppState.appData.legalTrainings||[]).find(c=>c.id===t),r=o?o.title:"",s=`
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
        `,l=document.getElementById("legal-attendee-form-modal");l&&l.remove(),document.body.insertAdjacentHTML("beforeend",s),typeof EmployeeHelper<"u"&&typeof EmployeeHelper.setupEmployeeCodeSearch=="function"&&EmployeeHelper.setupEmployeeCodeSearch("lta-employeeCode","lta-employeeName",c=>{if(c){const d=document.getElementById("lta-employeePosition"),p=document.getElementById("lta-department"),g=document.getElementById("lta-factory");d&&!d.value&&(d.value=c.position||c.jobTitle||""),p&&!p.value&&(p.value=c.department||c.unit||c.section||""),g&&!g.value&&(g.value=c.factory||c.factoryName||c.location||"")}},{employeeNotFoundWarn:"blur-enter"})},async handleAttendeeSubmit(t,e,a){t.preventDefault();const i=!!a,n=l=>{const c=document.getElementById(l);return c?c.value.trim():""},o={legalTrainingId:e,employeeCode:n("lta-employeeCode"),employeeName:n("lta-employeeName"),employeePosition:n("lta-employeePosition"),department:n("lta-department"),factory:n("lta-factory"),factoryName:n("lta-factory"),attendanceDate:n("lta-attendanceDate"),attendanceStatus:n("lta-attendanceStatus"),score:n("lta-score"),certificateNumber:n("lta-certificateNumber"),certificateDate:n("lta-certificateDate"),certificateExpiryDate:n("lta-certificateExpiryDate"),notes:n("lta-notes")},r=(AppState.appData.legalTrainings||[]).find(l=>l.id===e);if(o.legalTrainingTitle=r?r.title:"",!o.employeeCode||!o.employeeName){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0643\u0648\u062F \u0627\u0644\u0645\u0648\u0638\u0641 \u0648\u0627\u0633\u0645\u0647");return}const s=document.getElementById("lta-submit-btn");s&&(s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{const l=document.getElementById("lta-certificateImage");if(l&&l.files&&l.files.length>0){const c=l.files[0];if(c.size>10485760){typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B (\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 10 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A)"),s&&(s.disabled=!1,s.innerHTML='<i class="fas fa-save ml-2"></i>'+(i?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062A\u062F\u0631\u0628"));return}try{typeof Loading<"u"&&Loading.show&&Loading.show();const d=await this._legalFileToBase64(c),p=`legal_cert_${e}_${o.employeeCode}_${Date.now()}.${c.name.split(".").pop()}`,g=c.type||"image/jpeg";if(typeof GoogleIntegration<"u"&&GoogleIntegration.uploadFileToDrive){const f=await GoogleIntegration.uploadFileToDrive(d,p,g,"LegalTrainingCertificates");f&&f.success?o.certificateImage=f.directLink||f.shareableLink||d:o.certificateImage=d}else o.certificateImage=d;typeof Loading<"u"&&Loading.hide&&Loading.hide()}catch(d){typeof Loading<"u"&&Loading.hide&&Loading.hide(),Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0631\u0641\u0639 \u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u0647\u0627\u062F\u0629 \u0625\u0644\u0649 Drive:",d);try{o.certificateImage=await this._legalFileToBase64(l.files[0])}catch{o.certificateImage=""}}}else if(i){const c=(AppState.appData.legalTrainingAttendees||[]).find(d=>d.id===a);c&&c.certificateImage&&(o.certificateImage=c.certificateImage)}if(i){o.id=a,o.updatedAt=new Date().toISOString();const c=AppState.appData.legalTrainingAttendees||[],d=c.findIndex(g=>g.id===a);d!==-1&&Object.assign(c[d],o),this._legalAttendeesLocalSaveTime=Date.now();const p=document.getElementById("legal-attendee-form-modal");if(p&&p.remove(),this.showLegalTrainingAttendees(e),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628 \u0628\u0646\u062C\u0627\u062D"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{await GoogleIntegration.sendRequest({action:"updateLegalTrainingAttendee",data:{attendeeId:a,updateData:o}})}catch(g){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645:",g)}}else{o.createdAt=new Date().toISOString(),o.updatedAt=o.createdAt,o.createdBy=AppState.currentUser?.email||"",AppState.appData.legalTrainingAttendees||(AppState.appData.legalTrainingAttendees=[]);const c="LTA-LOCAL-"+Date.now();if(o.id=c,AppState.appData.legalTrainingAttendees.push(o),this._legalAttendeesLocalSaveTime=Date.now(),this._updateLegalTrainingParticipantsCount(e),typeof Notification<"u"&&Notification.success&&Notification.success("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628..."),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest){const p=Object.assign({},o);delete p.id;try{const g=await GoogleIntegration.sendRequest({action:"addLegalTrainingAttendee",data:p});if(g&&g.success&&g.data&&g.data.id){const f=AppState.appData.legalTrainingAttendees||[],u=f.findIndex(m=>m.id===c);u!==-1&&(f[u].id=g.data.id)}}catch(g){Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628 \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645:",g)}}const d=document.getElementById("legal-attendee-form-modal");d&&d.remove(),this.showLegalTrainingAttendees(e),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062A\u062F\u0631\u0628 \u0628\u0646\u062C\u0627\u062D")}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save()}catch(l){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u062F\u0631\u0628:",l),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638"),s&&(s.disabled=!1,s.innerHTML='<i class="fas fa-save ml-2"></i>'+(i?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062A\u062F\u0631\u0628"))}},_updateLegalTrainingParticipantsCount(t){const e=(AppState.appData.legalTrainingAttendees||[]).filter(i=>i.legalTrainingId===t),a=(AppState.appData.legalTrainings||[]).find(i=>i.id===t);a&&(a.participantsCount=e.length,this._legalTrainingsLocalSaveTime=Date.now(),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"updateLegalTraining",data:{trainingId:t,updateData:{participantsCount:e.length}}}).catch(()=>{}))},async deleteLegalTrainingAttendee(t,e){if(t&&confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u062F\u0631\u0628\u061F"))try{const a=AppState.appData.legalTrainingAttendees||[];AppState.appData.legalTrainingAttendees=a.filter(i=>i.id!==t),this._legalAttendeesLocalSaveTime=Date.now(),this._updateLegalTrainingParticipantsCount(e),this.showLegalTrainingAttendees(e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062A\u062F\u0631\u0628"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"deleteLegalTrainingAttendee",data:{attendeeId:t}}).catch(i=>Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u0645\u062A\u062F\u0631\u0628 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",i))}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u062A\u062F\u0631\u0628:",a)}},convertGoogleDriveLinkToPrintable(t){if(!t)return"";if(typeof window.__convertGoogleDriveUrl=="function"&&(t=window.__convertGoogleDriveUrl(t)),t.startsWith("data:image/")||t.includes("drive.google.com/thumbnail"))return t;const e=t.match(/\/d\/([a-zA-Z0-9_-]+)/)||t.match(/id=([a-zA-Z0-9_-]+)/);return e&&e[1]?`https://drive.google.com/thumbnail?id=${e[1]}&sz=w800`:t},getIsoPrintCommonStyles(t=!1){return`
            :root {
                --brand-primary: #1e3a8a;
                --brand-navy: #0f172a;
                --brand-green: #047857;
                --brand-red: #b91c1c;
                --brand-amber: #d97706;
                --border-color: #cbd5e1;
            }
            * {
                box-sizing: border-box;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            body {
                font-family: 'Cairo', system-ui, -apple-system, sans-serif;
                margin: 0;
                padding: 0;
                background: #f8fafc;
                color: #0f172a;
                line-height: 1.5;
                direction: rtl;
            }
            .no-print-bar {
                position: sticky;
                top: 0;
                z-index: 9999;
                background: #0f172a;
                color: #ffffff;
                padding: 12px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
                border-bottom: 3px solid #2563eb;
            }
            .no-print-bar .brand-badge {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .no-print-bar .pill-tag {
                background: #2563eb;
                color: #ffffff;
                padding: 4px 10px;
                border-radius: 6px;
                font-weight: 800;
                font-size: 11px;
                letter-spacing: 0.5px;
            }
            .no-print-bar .title-text {
                font-size: 13.5px;
                font-weight: 800;
            }
            .no-print-bar .action-buttons {
                display: flex;
                gap: 10px;
                align-items: center;
            }
            .btn-direct-download {
                padding: 8px 18px;
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(5,150,105,0.35);
            }
            .btn-direct-download:hover { background: #047857; }
            .btn-print {
                padding: 8px 18px;
                background: #2563eb;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(37,99,235,0.4);
            }
            .btn-print:hover { background: #1d4ed8; }
            .btn-close {
                padding: 8px 16px;
                background: #475569;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
            }
            .btn-close:hover { background: #334155; }

            .report-page-container {
                max-width: ${t?"1180px":"920px"};
                margin: 22px auto 40px auto;
                background: #ffffff;
                padding: 24px 30px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
                border: 1px solid #e2e8f0;
            }

            .iso-print-header {
                display: grid;
                grid-template-columns: 240px 1fr 210px;
                border: 2px solid #0f172a;
                border-top: 5px solid #1e3a8a;
                border-radius: 8px;
                overflow: hidden;
                background: #ffffff;
                margin-bottom: 16px;
            }
            .iso-box-brand {
                padding: 10px 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-left: 1.5px solid #0f172a;
                background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                gap: 4px;
                text-align: center;
            }
            .iso-print-logo {
                max-height: 46px;
                max-width: 130px;
                object-fit: contain;
                margin-bottom: 2px;
            }
            .iso-company-title {
                font-size: 10.5px;
                font-weight: 900;
                color: #0f172a;
                line-height: 1.3;
            }
            .iso-dept-title {
                font-size: 9.5px;
                font-weight: 800;
                color: #1e3a8a;
                line-height: 1.25;
            }

            .iso-box-title {
                padding: 10px 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                background: #ffffff;
            }
            .iso-main-title {
                margin: 0;
                font-size: 16px;
                font-weight: 900;
                color: #1e3a8a;
                line-height: 1.3;
            }
            .iso-sub-title {
                font-size: 10.5px;
                font-weight: 700;
                color: #475569;
                margin-top: 3px;
            }
            .iso-badge-std {
                display: inline-block;
                margin-top: 5px;
                background: #eff6ff;
                color: #1d4ed8;
                border: 1px solid #bfdbfe;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 9.5px;
                font-weight: 800;
            }

            .iso-box-meta {
                padding: 8px 12px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-right: 1.5px solid #0f172a;
                background: #f8fafc;
                gap: 3px;
            }
            .meta-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px dashed #cbd5e1;
                padding-bottom: 2px;
                font-size: 10px;
            }
            .meta-row:last-child { border-bottom: none; }
            .meta-row span { color: #64748b; font-weight: 700; }
            .meta-row strong { color: #0f172a; font-family: monospace, inherit; font-size: 10px; }

            .handover-info-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 8px;
                margin-bottom: 14px;
            }
            .info-card {
                background: #f8fafc;
                border: 1.5px solid #cbd5e1;
                border-radius: 6px;
                padding: 7px 10px;
            }
            .info-card .card-label {
                font-size: 9.5px;
                color: #64748b;
                font-weight: 700;
                margin-bottom: 2px;
            }
            .info-card .card-value {
                font-size: 11.5px;
                font-weight: 800;
                color: #0f172a;
            }

            .iso-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
                margin-bottom: 16px;
                font-size: 11px;
            }
            .iso-table th {
                background: #1e3a8a;
                color: #ffffff;
                padding: 7px 8px;
                font-weight: 800;
                border: 1px solid #0f172a;
                text-align: center;
            }
            .iso-table td {
                padding: 6px 8px;
                border: 1px solid #cbd5e1;
                text-align: center;
                color: #0f172a;
            }
            .iso-table tr:nth-child(even) td {
                background: #f8fafc;
            }
            .iso-table tr.total-row td {
                background: #eff6ff;
                font-weight: 900;
                border-top: 2px solid #1e3a8a;
                color: #1e3a8a;
            }

            .signatures-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
                margin-top: 18px;
                page-break-inside: avoid;
            }
            .sig-card {
                border: 1.5px solid #cbd5e1;
                border-radius: 6px;
                padding: 8px 10px;
                background: #f8fafc;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 100px;
            }
            .sig-card-title {
                font-size: 10px;
                font-weight: 800;
                color: #1e3a8a;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 3px;
                margin-bottom: 4px;
                text-align: center;
            }
            .sig-card-name {
                font-size: 10.5px;
                font-weight: 800;
                color: #0f172a;
                text-align: center;
            }
            .sig-line-area {
                margin-top: 16px;
                border-top: 1.5px dashed #64748b;
                padding-top: 3px;
                text-align: center;
                font-size: 9px;
                color: #64748b;
                font-weight: 700;
            }

            .iso-footer-strip {
                margin-top: 16px;
                border: 1.5px solid #0f172a;
                border-radius: 6px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px 12px;
                background: #f8fafc;
                font-size: 9.5px;
                font-weight: 800;
                color: #334155;
                page-break-inside: avoid;
            }
            .iso-footer-strip span strong {
                color: #0f172a;
                font-family: monospace, inherit;
            }
            .portal-unified-footer {
                margin-top: 10px;
                text-align: center;
                font-size: 9px;
                color: #64748b;
                line-height: 1.45;
                page-break-inside: avoid;
            }
            .portal-unified-footer strong {
                color: #1e3a8a;
                font-weight: 800;
            }

            @media print {
                body {
                    background: #ffffff !important;
                    padding: 0 !important;
                }
                .no-print-bar {
                    display: none !important;
                }
                .report-page-container {
                    max-width: 100% !important;
                    margin: 0 !important;
                    padding: 4mm 6mm !important;
                    border: none !important;
                    box-shadow: none !important;
                }
                @page {
                    size: ${t?"A4 landscape":"A4 portrait"};
                    margin: 8mm 10mm 8mm 10mm;
                }
            }
        `},getIsoPrintHeaderHtml(t,e,a,i="Rev. 03",n="\u0633\u0631\u064A \u0648\u062F\u0627\u062E\u0644\u064A"){let o="/icons/icapp-logo.png";if(typeof window<"u"&&window.location&&(window.location.protocol==="file:"?o="icons/icapp-logo.png":window.location.origin&&window.location.origin!=="null"&&(o=`${window.location.origin}/icons/icapp-logo.png`)),typeof AppState<"u"&&(AppState.companyLogo||AppState.companySettings?.logo)){const c=AppState.companyLogo||AppState.companySettings?.logo;c&&(o=this.convertGoogleDriveLinkToPrintable(c))}const r="icons/icon-192x192.png",s=new Date,l=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}`;return`
            <div class="iso-print-header">
                <div class="iso-box-brand">
                    <img src="${o}" alt="\u0634\u0639\u0627\u0631 ICAPP" class="iso-print-logo" onerror="this.onerror=null; this.src='${r}';">
                    <div class="iso-company-title">\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</div>
                    <div class="iso-dept-title">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629</div>
                </div>

                <div class="iso-box-title">
                    <h1 class="iso-main-title">${Utils.escapeHTML(t)}</h1>
                    <div class="iso-sub-title">${Utils.escapeHTML(e)}</div>
                    <div class="iso-badge-std">\u0645\u0639\u062A\u0645\u062F \u0637\u0628\u0642\u0627\u064B \u0644\u0644\u0645\u0648\u0627\u0635\u0641\u0629 ISO 45001:2018 & ISO 9001:2015</div>
                </div>

                <div class="iso-box-meta">
                    <div class="meta-row">
                        <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629:</span>
                        <strong>${Utils.escapeHTML(a)}</strong>
                    </div>
                    <div class="meta-row">
                        <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</span>
                        <strong>${Utils.escapeHTML(i)}</strong>
                    </div>
                    <div class="meta-row">
                        <span>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</span>
                        <strong>${l}</strong>
                    </div>
                    <div class="meta-row">
                        <span>\u062F\u0631\u062C\u0629 \u0627\u0644\u0633\u0631\u064A\u0629:</span>
                        <strong style="color: #047857;">${Utils.escapeHTML(n)}</strong>
                    </div>
                </div>
            </div>
        `},getIsoPrintFooterHtml(t,e="Rev. 03",a="ISO 45001:2018 (Clause 7.2 Competence & 7.3 Awareness)"){return`
            <div class="iso-footer-strip">
                <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629: <strong>${Utils.escapeHTML(t)}</strong></span>
                <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631: <strong>${Utils.escapeHTML(e)}</strong></span>
                <span>\u0645\u0631\u062C\u0639\u064A\u0629 \u0627\u0644\u062A\u0648\u062B\u064A\u0642: <strong>${Utils.escapeHTML(a)}</strong></span>
                <span>\u0646\u0638\u0627\u0645 \u0627\u0644\u062C\u0648\u062F\u0629: <strong>ICAPP HSE MS</strong></span>
            </div>
            <footer class="portal-unified-footer">
                <div><strong>\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</strong> \u2022 \u0645\u0646\u0638\u0648\u0645\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629 \xA9 2026</div>
                <div>\u0648\u062B\u064A\u0642\u0629 \u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0631\u0633\u0645\u064A\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0635\u0627\u062F\u0631\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (ICAPP SafetyHub) \u2022 \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u062A\u062F\u0642\u064A\u0642 \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629</div>
            </footer>
        `},openIsoPrintWindow(t,e,a=!1,i="",n=""){const o=n||`${String(t).replace(/[^\w\u0600-\u06FF.-]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`,r=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Utils.escapeHTML(t)} \u2014 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        ${this.getIsoPrintCommonStyles(a)}
        ${i}
    </style>
</head>
<body>
    <div class="no-print-bar">
        <div class="brand-badge">
            <span class="pill-tag">ICAPP SAFETY HUB</span>
            <span class="title-text">${Utils.escapeHTML(t)}</span>
        </div>
        <div class="action-buttons">
            <button class="btn-direct-download" id="dl-pdf-top-btn" onclick="directDownloadReportPdf()">
                <i class="fas fa-file-arrow-down"></i> \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 (PDF)
            </button>
            <button class="btn-print" onclick="window.print()">
                <i class="fas fa-print"></i> \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F
            </button>
            <button class="btn-close" onclick="window.close()">
                <i class="fas fa-times"></i> \u0625\u063A\u0644\u0627\u0642
            </button>
        </div>
    </div>
    <div class="report-page-container">
        ${e}
    </div>
    <script>
        async function directDownloadReportPdf() {
            var btn = document.getElementById('dl-pdf-top-btn');
            var originalText = btn ? btn.innerHTML : '';
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...';
            }
            try {
                if (window.opener && window.opener.Utils && typeof window.opener.Utils.downloadHtmlAsPdf === 'function') {
                    var container = document.querySelector('.report-page-container');
                    var targetHtml = container ? container.outerHTML : document.body.innerHTML;
                    var ok = await window.opener.Utils.downloadHtmlAsPdf(targetHtml, ${JSON.stringify(o)}, {
                        landscape: ${a?"true":"false"},
                        title: ${JSON.stringify(t)}
                    });
                    if (ok) {
                        if (btn) {
                            btn.disabled = false;
                            btn.innerHTML = '<i class="fas fa-check"></i> \u062A\u0645 \u0627\u0644\u062A\u062D\u0645\u064A\u0644!';
                            setTimeout(function() { btn.innerHTML = originalText; }, 2500);
                        }
                        return;
                    }
                }
                window.print();
            } catch (err) {
                console.warn('Direct PDF download error, fallback to print:', err);
                window.print();
            } finally {
                if (btn) {
                    btn.disabled = false;
                    setTimeout(function() { btn.innerHTML = originalText; }, 2500);
                }
            }
        }
    <\/script>
</body>
</html>`,s=new Blob([r],{type:"text/html;charset=utf-8"}),l=URL.createObjectURL(s);return window.open(l,"_blank")?(setTimeout(()=>{URL.revokeObjectURL(l)},15e3),!0):(Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"),!1)},async downloadIsoReportAsPdf(t,e,a="",i=!1,n=""){const o=a||`${String(t).replace(/[^\w\u0600-\u06FF.-]/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`,r=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Utils.escapeHTML(t)} \u2014 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        ${this.getIsoPrintCommonStyles(i)}
        ${n}
    </style>
</head>
<body>
    <div class="report-page-container">
        ${e}
    </div>
</body>
</html>`;if(typeof Utils<"u"&&typeof Utils.downloadHtmlAsPdf=="function")try{if(await Utils.downloadHtmlAsPdf(r,o,{landscape:i,title:t}))return Notification.success(`\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 PDF \u0628\u0646\u062C\u0627\u062D: ${o}`),!0}catch(s){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628:",s)}return this.openIsoPrintWindow(t,e,i,n,o)}};if(typeof window<"u")try{window.Training=Training,document.dispatchEvent(new CustomEvent("hse-training-module-ready",{detail:{source:"training.js"}}))}catch{}(function(){"use strict";try{typeof window<"u"&&typeof Training<"u"&&(window.Training=Training,typeof window<"u"&&window.addEventListener("formSettingsUpdated",function(){try{typeof Training<"u"&&Training.refreshSiteDropdowns&&Training.refreshSiteDropdowns()}catch{}}),document.addEventListener("click",function(t){var e=t.target&&t.target.closest?t.target.closest('#add-training-btn, #add-training-empty-btn, [data-action="open-training-form"]'):null;e&&(t.preventDefault(),typeof Training<"u"&&typeof Training.showForm=="function"&&Training.showForm())}),typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Training module loaded and available on window.Training"))}catch{if(typeof window<"u"&&typeof Training<"u")try{window.Training=Training}catch{}}})();
