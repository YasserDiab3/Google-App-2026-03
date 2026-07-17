/**
 * ISO Module
 * ØªÙ… Ø§Ø³ØªØ®Ø±Ø§Ø¬Ù‡ Ù…Ù† app-modules.js
 */
// ===== HSE Management System Module (نظام إدارة السلامة والصحة المهنية والبيئة) =====
const ISO = {
    currentTab: 'overview',

    SystemFormsManifest: [
        // PTW
        { id: 'ptw', name: 'تصريح العمل العام', i18nKey: 'module.iso.manifest.ptw.general', module: 'PTW', type: 'نموذج', defaultCode: 'PTW-GEN-01', department: 'HSE' },
        { id: 'ptw-hot', name: 'تصريح العمل الساخن', i18nKey: 'module.iso.manifest.ptw.hot', module: 'PTW', type: 'نموذج', defaultCode: 'PTW-HOT-01', department: 'HSE' },
        { id: 'ptw-cold', name: 'تصريح العمل البارد', i18nKey: 'module.iso.manifest.ptw.cold', module: 'PTW', type: 'نموذج', defaultCode: 'PTW-COLD-01', department: 'HSE' },
        { id: 'ptw-confined', name: 'تصريح دخول الأماكن المغلقة', i18nKey: 'module.iso.manifest.ptw.confined', module: 'PTW', type: 'نموذج', defaultCode: 'PTW-CONF-01', department: 'HSE' },
        { id: 'ptw-excavation', name: 'تصريح الحفريات', i18nKey: 'module.iso.manifest.ptw.excavation', module: 'PTW', type: 'نموذج', defaultCode: 'PTW-EXC-01', department: 'HSE' },
        { id: 'ptw-electrical', name: 'تصريح عزل طاقة (LOTO)', i18nKey: 'module.iso.manifest.ptw.loto', module: 'PTW', type: 'نموذج', defaultCode: 'PTW-LOTO-01', department: 'HSE' },

        // Incidents
        { id: 'incident', name: 'تقرير الحوادث', i18nKey: 'module.iso.manifest.incident.report', module: 'Incidents', type: 'تقرير', defaultCode: 'INC-REP-01', department: 'HSE' },
        { id: 'incident-reg', name: 'سجل الحوادث والإصابات', i18nKey: 'module.iso.manifest.incident.register', module: 'Incidents', type: 'سجل', defaultCode: 'INC-REG-01', department: 'HSE' },

        // NearMiss
        { id: 'nearmiss', name: 'تقرير الحوادث الوشيكة', i18nKey: 'module.iso.manifest.nearmiss.report', module: 'NearMiss', type: 'تقرير', defaultCode: 'NM-REP-01', department: 'HSE' },
        { id: 'nearmiss-reg', name: 'سجل الحوادث الوشيكة', i18nKey: 'module.iso.manifest.nearmiss.register', module: 'NearMiss', type: 'سجل', defaultCode: 'NM-REG-01', department: 'HSE' },

        // Clinic
        { id: 'clinic', name: 'سجل الزيارات الطبية', i18nKey: 'module.iso.manifest.clinic.register', module: 'Clinic', type: 'سجل', defaultCode: 'CLN-REG-01', department: 'Medical' },
        { id: 'clinic-exam', name: 'نموذج الفحص الطبي', i18nKey: 'module.iso.manifest.clinic.exam', module: 'Clinic', type: 'نموذج', defaultCode: 'CLN-FRM-01', department: 'Medical' },

        // Observations
        { id: 'observation', name: 'الملاحظات اليومية', i18nKey: 'module.iso.manifest.obs.report', module: 'Observations', type: 'نموذج', defaultCode: 'OBS-FRM-01', department: 'HSE' },
        { id: 'observation-bbs', name: 'بطاقة ملاحظة السلوك (BBS)', i18nKey: 'module.iso.manifest.obs.bbs', module: 'Observations', type: 'بطاقة', defaultCode: 'OBS-BBS-01', department: 'HSE' },

        // Risk Assessment
        { id: 'risk-jha', name: 'تحليل مخاطر العمل (JHA)', i18nKey: 'module.iso.manifest.risk.jha', module: 'RiskAssessment', type: 'نموذج', defaultCode: 'JHA-FRM-01', department: 'HSE' },
        { id: 'risk-reg', name: 'سجل تقييم المخاطر', i18nKey: 'module.iso.manifest.risk.register', module: 'RiskAssessment', type: 'سجل', defaultCode: 'RISK-REG-01', department: 'HSE' },

        // Violations
        { id: 'violation', name: 'إشعار مخالفة', i18nKey: 'module.iso.manifest.viol.notice', module: 'Violations', type: 'نموذج', defaultCode: 'VIO-FRM-01', department: 'HSE' },
        { id: 'violation-reg', name: 'سجل المخالفات والإنذارات', i18nKey: 'module.iso.manifest.viol.register', module: 'Violations', type: 'سجل', defaultCode: 'VIO-REG-01', department: 'HSE' },

        // Inspections & Checklists
        { id: 'inspection', name: 'التفتيش الدوري الشامل', i18nKey: 'module.iso.manifest.insp.periodic', module: 'Inspections', type: 'نموذج', defaultCode: 'INSP-FRM-01', department: 'HSE' },
        { id: 'inspection-reg', name: 'سجل التفتيش', i18nKey: 'module.iso.manifest.insp.register', module: 'Inspections', type: 'سجل', defaultCode: 'INSP-REG-01', department: 'HSE' },
        { id: 'dscl', name: 'فحص السلامة اليومي', i18nKey: 'module.iso.manifest.insp.daily', module: 'Inspections', type: 'نموذج', defaultCode: 'DSCL-FRM-01', department: 'HSE' },
        { id: 'scaffold-insp', name: 'نموذج فحص السقالات', i18nKey: 'module.iso.manifest.insp.scaffold', module: 'Inspections', type: 'نموذج', defaultCode: 'SCAFF-INSP-01', department: 'HSE' },
        { id: 'equip-insp', name: 'نموذج فحص المعدات', i18nKey: 'module.iso.manifest.insp.equip', module: 'Inspections', type: 'نموذج', defaultCode: 'EQP-INSP-01', department: 'HSE' },

        // TBT
        { id: 'tbt', name: 'نموذج اجتماع السلامة (TBT)', i18nKey: 'module.iso.manifest.tbt.form', module: 'ToolBox Talk', type: 'نموذج', defaultCode: 'TBT-FRM-01', department: 'HSE' },
        { id: 'tbt-reg', name: 'سجل اجتماعات TBT', i18nKey: 'module.iso.manifest.tbt.register', module: 'ToolBox Talk', type: 'سجل', defaultCode: 'TBT-REG-01', department: 'HSE' },

        // PPE
        { id: 'ppe-receive', name: 'سجل استلام مهمات الوقاية', i18nKey: 'module.iso.manifest.ppe.receive', module: 'PPE', type: 'سجل', defaultCode: 'PPE-REG-01', department: 'HSE' },
        { id: 'ppe-insp', name: 'نموذج فحص مهمات الوقاية', i18nKey: 'module.iso.manifest.ppe.insp', module: 'PPE', type: 'نموذج', defaultCode: 'PPE-INSP-01', department: 'HSE' },

        // Fire & Emergency
        { id: 'fire-insp', name: 'تفتيش معدات الإطفاء', i18nKey: 'module.iso.manifest.fire.insp', module: 'Fire Equipment', type: 'نموذج', defaultCode: 'FIRE-INSP-01', department: 'HSE' },
        { id: 'drill-report', name: 'تقرير تجربة إخلاء', i18nKey: 'module.iso.manifest.fire.drill', module: 'Fire Equipment', type: 'تقرير', defaultCode: 'DRILL-REP-01', department: 'HSE' },

        // Chemicals & MOC
        { id: 'sds', name: 'سجل المواد الكيميائية (SDS)', i18nKey: 'module.iso.manifest.chem.sds', module: 'Chemical Safety', type: 'وثيقة', defaultCode: 'SDS-REG-01', department: 'HSE' },
        { id: 'moc', name: 'إدارة التغيير (MOC)', i18nKey: 'module.iso.manifest.moc.form', module: 'Change Management', type: 'نموذج', defaultCode: 'MOC-FRM-01', department: 'HSE' },

        // ISO & Quality
        { id: 'legal', name: 'سجل المتطلبات القانونية', i18nKey: 'module.iso.manifest.iso.legal', module: 'ISO / Quality', type: 'سجل', defaultCode: 'LEG-REG-01', department: 'HSE' },
        { id: 'kpi', name: 'مؤشرات الأداء (KPIs)', i18nKey: 'module.iso.manifest.iso.kpi', module: 'ISO / Quality', type: 'تقرير', defaultCode: 'KPI-REP-01', department: 'HSE' },
        { id: 'audit-plan', name: 'خطة التدقيق الداخلي', i18nKey: 'module.iso.manifest.iso.auditPlan', module: 'ISO / Quality', type: 'وثيقة', defaultCode: 'AUD-PLN-01', department: 'HSE' },
        { id: 'audit-report', name: 'تقرير التدقيق الداخلي', i18nKey: 'module.iso.manifest.iso.auditRep', module: 'ISO / Quality', type: 'تقرير', defaultCode: 'AUD-REP-01', department: 'HSE' },
        
        // CAPA
        { id: 'nc', name: 'تقرير حالة عدم المطابقة (NC)', i18nKey: 'module.iso.manifest.capa.nc', module: 'ISO / CAPA', type: 'نموذج', defaultCode: 'NC-FRM-01', department: 'HSE' },
        { id: 'ca', name: 'الإجراءات التصحيحية (CAR)', i18nKey: 'module.iso.manifest.capa.car', module: 'ISO / CAPA', type: 'نموذج', defaultCode: 'CAR-FRM-01', department: 'HSE' },

        // Trainings
        { id: 'training-plan', name: 'خطة التدريب السنوية', i18nKey: 'module.iso.manifest.train.plan', module: 'Trainings', type: 'وثيقة', defaultCode: 'TRN-PLN-01', department: 'HSE' },
        { id: 'training-att', name: 'سجل حضور تدريب', i18nKey: 'module.iso.manifest.train.att', module: 'Trainings', type: 'سجل', defaultCode: 'TRN-ATT-01', department: 'HSE' },
        { id: 'training-eval', name: 'نموذج تقييم تدريب', i18nKey: 'module.iso.manifest.train.eval', module: 'Trainings', type: 'نموذج', defaultCode: 'TRN-EVAL-01', department: 'HSE' }
    ],

    async load() {
        // Add language change listener
        if (!this._languageChangeListenerAdded) {
            document.addEventListener('language-changed', () => {
                this.load();
            });
            this._languageChangeListenerAdded = true;
        }

        const section = document.getElementById('iso-section');
        if (!section) return;

        try {
        section.innerHTML = `
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-shield-alt ml-3"></i>
                            ${typeof I18n !== 'undefined' ? I18n.t('module.iso.title', 'نظام إدارة السلامة والصحة المهنية والبيئة') : 'نظام إدارة السلامة والصحة المهنية والبيئة'}
                        </h1>
                        <p class="section-subtitle">${typeof I18n !== 'undefined' ? I18n.t('module.iso.subtitle', 'HSE Management System - متوافق مع ISO 45001 & ISO 14001') : 'HSE Management System - متوافق مع ISO 45001 & ISO 14001'}</p>
                    </div>
                    <button id="export-compliance-report-btn" class="btn-success">
                        <i class="fas fa-file-pdf ml-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.btn.exportCompliance', 'تقرير الامتثال PDF') : 'تقرير الامتثال PDF'}
                    </button>
                </div>
            </div>
            
            <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">${(AppState.appData.isoDocuments || []).length}</div>
                    <div class="text-sm text-gray-700 font-semibold">${typeof I18n !== 'undefined' ? I18n.t('module.iso.stats.docs', 'الوثائق') : 'الوثائق'}</div>
                </div>
                <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">${(AppState.appData.isoProcedures || []).length}</div>
                    <div class="text-sm text-gray-700 font-semibold">${typeof I18n !== 'undefined' ? I18n.t('module.iso.stats.procedures', 'الإجراءات') : 'الإجراءات'}</div>
                </div>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-yellow-600 mb-2">${(AppState.appData.isoForms || []).length}</div>
                    <div class="text-sm text-gray-700 font-semibold">${typeof I18n !== 'undefined' ? I18n.t('module.iso.stats.forms', 'النماذج') : 'النماذج'}</div>
                </div>
                <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">${this.calculateComplianceRate()}%</div>
                    <div class="text-sm text-gray-700 font-semibold">${typeof I18n !== 'undefined' ? I18n.t('module.iso.stats.compliance', 'معدل الامتثال') : 'معدل الامتثال'}</div>
                </div>
            </div>
            
            <div class="mt-6">
                <div class="flex flex-wrap gap-2 mb-6 border-b pb-2">
                    <button class="tab-btn ${this.currentTab === 'overview' ? 'active' : ''}" data-tab="overview">
                        <i class="fas fa-chart-pie mx-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.tab.overview', 'نظرة عامة') : 'نظرة عامة'}
                    </button>
                    <button class="tab-btn ${this.currentTab === 'documents' ? 'active' : ''}" data-tab="documents">
                        <i class="fas fa-file-alt mx-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.tab.docs', 'الوثائق') : 'الوثائق'}
                    </button>
                    <button class="tab-btn ${this.currentTab === 'procedures' ? 'active' : ''}" data-tab="procedures">
                        <i class="fas fa-tasks mx-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.tab.procedures', 'الإجراءات') : 'الإجراءات'}
                    </button>
                    <button class="tab-btn ${this.currentTab === 'forms' ? 'active' : ''}" data-tab="forms">
                        <i class="fas fa-file-signature mx-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.tab.forms', 'النماذج') : 'النماذج'}
                    </button>
                    <button class="tab-btn ${this.currentTab === 'iso45001' ? 'active' : ''}" data-tab="iso45001">
                        <i class="fas fa-hard-hat mx-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.tab.iso45001', 'ISO 45001') : 'ISO 45001'}
                    </button>
                    <button class="tab-btn ${this.currentTab === 'iso14001' ? 'active' : ''}" data-tab="iso14001">
                        <i class="fas fa-leaf mx-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.tab.iso14001', 'ISO 14001') : 'ISO 14001'}
                    </button>
                    <button class="tab-btn ${this.currentTab === 'audit' ? 'active' : ''}" data-tab="audit">
                        <i class="fas fa-clipboard-check mx-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.tab.audit', 'التدقيق والمراجعة') : 'التدقيق والمراجعة'}
                    </button>
                    <button class="tab-btn ${this.currentTab === 'coding-center' ? 'active' : ''}" data-tab="coding-center">
                        <i class="fas fa-code mx-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.tab.coding', 'مركز التكويد والإصدار') : 'مركز التكويد والإصدار'}
                    </button>
                </div>
                <div id="iso-content">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500">${typeof I18n !== 'undefined' ? I18n.t('module.iso.loading', 'جاري تحميل المحتوى...') : 'جاري تحميل المحتوى...'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
            this.setupEventListeners();
            
            // ✅ تحميل المحتوى فوراً بعد عرض الواجهة
            setTimeout(async () => {
                try {
                    const contentArea = document.getElementById('iso-content');
                    if (!contentArea) return;

                    // تبويب مركز التكويد: عرض الهيكل فوراً ثم جلب البيانات في الخلفية (بدون إظهار رسالة مهلة مزعجة)
                    if (this.currentTab === 'coding-center') {
                        contentArea.innerHTML = await this.renderCodingCenter({ skipFetch: true });
                        this.renderCodingCenter({ silentTimeout: true }).then(html => {
                            const area = document.getElementById('iso-content');
                            if (area && this.currentTab === 'coding-center') area.innerHTML = html;
                        }).catch(() => {});
                        return;
                    }

                    const content = await this.renderContent().catch(error => {
                        Utils.safeWarn('⚠️ خطأ في تحميل المحتوى:', error);
                        return `
                            <div class="content-card">
                                <div class="card-body">
                                    <div class="empty-state">
                                        <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                        <p class="text-gray-500 mb-4">حدث خطأ في تحميل البيانات</p>
                                        <button onclick="ISO.load()" class="btn-primary">
                                            <i class="fas fa-redo ml-2"></i>
                                            إعادة المحاولة
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    });

                    contentArea.innerHTML = content;
                } catch (error) {
                    Utils.safeWarn('⚠️ خطأ في تحميل المحتوى:', error);
                }
            }, 0);
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('❌ خطأ في تحميل مديول ISO:', error);
            } else {
                console.error('❌ خطأ في تحميل مديول ISO:', error);
            }
            if (section) {
                section.innerHTML = `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">حدث خطأ أثناء تحميل البيانات</p>
                                <button onclick="ISO.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    إعادة المحاولة
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    },

    calculateComplianceRate() {
        const documents = AppState.appData.isoDocuments || [];
        const procedures = AppState.appData.isoProcedures || [];
        const forms = AppState.appData.isoForms || [];
        const total = documents.length + procedures.length + forms.length;
        // حساب نسبة الامتثال بناءً على وجود وثائق وإجراءات ونماذج
        const complianceScore = documents.length > 0 ? 30 : 0;
        const proceduresScore = procedures.length > 0 ? 30 : 0;
        const formsScore = forms.length > 0 ? 40 : 0;
        return Math.min(100, complianceScore + proceduresScore + formsScore);
    },

    async renderContent() {
        switch (this.currentTab) {
            case 'overview':
                return await this.renderOverview();
            case 'documents':
                return await this.renderDocuments();
            case 'procedures':
                return await this.renderProcedures();
            case 'forms':
                return await this.renderForms();
            case 'iso45001':
                return await this.renderISO45001();
            case 'iso14001':
                return await this.renderISO14001();
            case 'audit':
                return await this.renderAudit();
            case 'coding-center':
                return await this.renderCodingCenter();
            default:
                return await this.renderOverview();
        }
    },

    async renderOverview() {
        const documents = AppState.appData.isoDocuments || [];
        const procedures = AppState.appData.isoProcedures || [];
        const forms = AppState.appData.isoForms || [];
        const audits = AppState.appData.hseAudits || [];
        const nonConformities = AppState.appData.hseNonConformities || [];
        const actions = AppState.appData.hseCorrectiveActions || [];

        const totalDocs = documents.length + procedures.length + forms.length;
        const openNCs = nonConformities.filter(nc => nc.status !== 'مغلق' && nc.status !== 'Closed').length;
        const pendingAudits = audits.filter(a => a.status === 'مجدول' || a.status === 'قيد التنفيذ' || a.status === 'Scheduled').length;
        const openActions = actions.filter(a => a.status !== 'مكتمل' && a.status !== 'Completed').length;
        
        // Calculate a mock compliance score based on closed NCs and completed Audits
        const complianceScore = this.calculateComplianceRate();

        return `
            <!-- Top KPIs Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <!-- KPI 1 -->
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                    <div class="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div class="flex justify-between items-start relative z-10">
                        <div>
                            <p class="text-sm font-medium text-gray-500 mb-1">${typeof I18n !== 'undefined' ? I18n.t('module.iso.stats.docs', 'إجمالي الوثائق') : 'إجمالي الوثائق'}</p>
                            <h3 class="text-3xl font-bold text-gray-800">${totalDocs}</h3>
                        </div>
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <i class="fas fa-file-alt text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4 text-xs text-gray-500 flex items-center">
                        <span class="text-blue-600 font-semibold ml-1">${procedures.length}</span> ${typeof I18n !== 'undefined' ? I18n.t('module.iso.stats.procedures', 'إجراءات') : 'إجراءات'} | 
                        <span class="text-indigo-600 font-semibold mx-1">${forms.length}</span> ${typeof I18n !== 'undefined' ? I18n.t('module.iso.stats.forms', 'نماذج') : 'نماذج'}
                    </div>
                </div>

                <!-- KPI 2 -->
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                    <div class="absolute -right-4 -top-4 w-24 h-24 bg-red-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div class="flex justify-between items-start relative z-10">
                        <div>
                            <p class="text-sm font-medium text-gray-500 mb-1">${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.openNc', 'حالات عدم المطابقة المفتوحة') : 'حالات عدم المطابقة المفتوحة'}</p>
                            <h3 class="text-3xl font-bold text-gray-800">${openNCs}</h3>
                        </div>
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-red-200">
                            <i class="fas fa-exclamation-triangle text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4 text-xs text-gray-500">
                        من إجمالي <span class="font-bold">${nonConformities.length}</span> حالة مسجلة
                    </div>
                </div>

                <!-- KPI 3 -->
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                    <div class="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div class="flex justify-between items-start relative z-10">
                        <div>
                            <p class="text-sm font-medium text-gray-500 mb-1">${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.auditLogTitle', 'عمليات تدقيق قادمة') : 'عمليات تدقيق قادمة'}</p>
                            <h3 class="text-3xl font-bold text-gray-800">${pendingAudits}</h3>
                        </div>
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-200">
                            <i class="fas fa-search text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4 text-xs text-gray-500">
                        من إجمالي <span class="font-bold">${audits.length}</span> عملية تدقيق
                    </div>
                </div>

                <!-- KPI 4 -->
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                    <div class="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div class="flex justify-between items-start relative z-10">
                        <div>
                            <p class="text-sm font-medium text-gray-500 mb-1">${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.lateCa', 'إجراءات تصحيحية مفتوحة') : 'إجراءات تصحيحية مفتوحة'}</p>
                            <h3 class="text-3xl font-bold text-gray-800">${openActions}</h3>
                        </div>
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-200">
                            <i class="fas fa-tools text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4 text-xs text-gray-500">
                        من إجمالي <span class="font-bold">${actions.length}</span> إجراء تصحيحي
                    </div>
                </div>
            </div>

            <!-- Main Content Area -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left Column (Compliance & Standards) -->
                <div class="lg:col-span-2 space-y-6">
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div class="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h2 class="text-lg font-bold text-gray-800"><i class="fas fa-shield-check text-blue-600 ml-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.healthTitle', 'مستوى الامتثال للنظام (QMS Health)') : 'مستوى الامتثال للنظام (QMS Health)'}</h2>
                            <span class="text-2xl font-bold ${complianceScore >= 80 ? 'text-green-500' : (complianceScore >= 50 ? 'text-amber-500' : 'text-red-500')}">${complianceScore}%</span>
                        </div>
                        <div class="p-6">
                            <div class="w-full bg-gray-100 rounded-full h-4 mb-6 overflow-hidden relative">
                                <div class="h-4 rounded-full ${complianceScore >= 80 ? 'bg-gradient-to-r from-green-400 to-green-500' : (complianceScore >= 50 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-red-400 to-red-500')} transition-all duration-1000 relative" style="width: ${complianceScore}%">
                                    <div class="absolute top-0 left-0 w-full h-full bg-white opacity-20" style="background-image: linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent); background-size: 1rem 1rem; animation: progress-bar-stripes 1s linear infinite;"></div>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="border border-blue-100 bg-blue-50/30 rounded-xl p-4 hover:shadow-sm transition-all">
                                    <h3 class="font-bold text-blue-800 mb-2 flex items-center">
                                        <i class="fas fa-hard-hat text-blue-500 ml-2"></i> ISO 45001
                                    </h3>
                                    <p class="text-xs text-gray-600 mb-3">${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.healthDesc', 'نظام إدارة السلامة والصحة المهنية') : 'نظام إدارة السلامة والصحة المهنية'}</p>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-gray-500">${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.excellent', 'المتطلبات') : 'المتطلبات'}</span>
                                        <span class="font-semibold text-blue-700">مغطاة</span>
                                    </div>
                                </div>
                                <div class="border border-green-100 bg-green-50/30 rounded-xl p-4 hover:shadow-sm transition-all">
                                    <h3 class="font-bold text-green-800 mb-2 flex items-center">
                                        <i class="fas fa-leaf text-green-500 ml-2"></i> ISO 14001
                                    </h3>
                                    <p class="text-xs text-gray-600 mb-3">${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.healthDesc', 'نظام الإدارة البيئية') : 'نظام الإدارة البيئية'}</p>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-gray-500">${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.excellent', 'المتطلبات') : 'المتطلبات'}</span>
                                        <span class="font-semibold text-green-700">مغطاة</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column (Action Items) -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div class="p-5 border-b border-gray-50 bg-gradient-to-r from-rose-50 to-orange-50">
                        <h2 class="text-lg font-bold text-gray-800 flex items-center">
                            <i class="fas fa-bell text-rose-500 ml-2 animate-pulse"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.actionItems', 'مهام تتطلب الانتباه') : 'مهام تتطلب الانتباه'}
                        </h2>
                    </div>
                    <div class="p-0 flex-1 overflow-y-auto" style="max-height: 400px;">
                        <ul class="divide-y divide-gray-100">
                            ${openNCs > 0 ? `
                            <li class="p-4 hover:bg-gray-50 transition-colors flex items-start gap-3 cursor-pointer" onclick="ISO.currentTab = 'audit'; ISO.load();">
                                <div class="mt-0.5 bg-red-100 text-red-600 p-2 rounded-lg"><i class="fas fa-exclamation-circle"></i></div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-800">يوجد ${openNCs} ${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.openNc', 'حالة عدم مطابقة مفتوحة') : 'حالة عدم مطابقة مفتوحة'}</p>
                                    <p class="text-xs text-gray-500 mt-1">يجب مراجعتها وإغلاقها لتجنب التأثير على مستوى الامتثال.</p>
                                </div>
                            </li>
                            ` : ''}
                            
                            ${pendingAudits > 0 ? `
                            <li class="p-4 hover:bg-gray-50 transition-colors flex items-start gap-3 cursor-pointer" onclick="ISO.currentTab = 'audit'; ISO.load();">
                                <div class="mt-0.5 bg-purple-100 text-purple-600 p-2 rounded-lg"><i class="fas fa-calendar-alt"></i></div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-800">يوجد ${pendingAudits} ${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.auditLogTitle', 'عملية تدقيق قادمة') : 'عملية تدقيق قادمة'}</p>
                                    <p class="text-xs text-gray-500 mt-1">يرجى مراجعة الجدول الزمني وتجهيز الوثائق المطلوبة.</p>
                                </div>
                            </li>
                            ` : ''}
                            
                            ${openActions > 0 ? `
                            <li class="p-4 hover:bg-gray-50 transition-colors flex items-start gap-3 cursor-pointer" onclick="ISO.currentTab = 'audit'; ISO.load();">
                                <div class="mt-0.5 bg-amber-100 text-amber-600 p-2 rounded-lg"><i class="fas fa-tools"></i></div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-800">يوجد ${openActions} ${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.lateCa', 'إجراء تصحيحي معلق') : 'إجراء تصحيحي معلق'}</p>
                                    <p class="text-xs text-gray-500 mt-1">تابع مع المسؤولين لإغلاق الإجراءات التصحيحية المفتوحة.</p>
                                </div>
                            </li>
                            ` : ''}
                            
                            ${(openNCs === 0 && pendingAudits === 0 && openActions === 0) ? `
                            <li class="p-8 text-center flex flex-col items-center justify-center">
                                <div class="bg-green-50 text-green-500 p-4 rounded-full mb-3"><i class="fas fa-check-double text-2xl"></i></div>
                                <p class="text-gray-600 font-semibold text-sm">${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.excellent', 'النظام في حالة ممتازة') : 'النظام في حالة ممتازة'}</p>
                                <p class="text-gray-400 text-xs mt-1">${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.noActionItems', 'لا توجد أي مهام متأخرة أو معلقة تتطلب الانتباه حالياً.') : 'لا توجد أي مهام متأخرة أو معلقة تتطلب الانتباه حالياً.'}</p>
                            </li>
                            ` : ''}
                        </ul>
                    </div>
                </div>
            </div>
            
            <style>
                @keyframes progress-bar-stripes {
                    from { background-position: 1rem 0; }
                    to { background-position: 0 0; }
                }
            </style>
        `;
    },

    async renderDocuments() {
        const documents = AppState.appData.isoDocuments || [];
        return `
            <div class="content-card shadow-lg border-0 rounded-2xl overflow-hidden bg-white">
                <div class="card-header bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <i class="fas fa-file-alt text-xl text-white"></i>
                        </div>
                        <div>
                            <h2 class="card-title text-white m-0 text-xl font-bold">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.title', 'إدارة الوثائق (Document Control)') : 'إدارة الوثائق (Document Control)'}</h2>
                            <p class="text-blue-100 text-sm m-0 opacity-80">سجل الوثائق المعتمدة في النظام</p>
                        </div>
                    </div>
                    <button id="add-document-btn" class="btn bg-white text-blue-700 hover:bg-blue-50 border-0 shadow-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all hover:shadow-md">
                        <i class="fas fa-plus"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.addBtn', 'إضافة وثيقة') : 'إضافة وثيقة'}
                    </button>
                </div>
                <div class="card-body p-0">
                    ${documents.length === 0 ? `
                        <div class="p-12 text-center flex flex-col items-center justify-center bg-gray-50/50">
                            <div class="w-20 h-20 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mb-4"><i class="fas fa-folder-open text-3xl"></i></div>
                            <h3 class="text-gray-700 font-bold text-lg mb-1">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.noData', 'لا توجد وثائق مسجلة') : 'لا توجد وثائق مسجلة'}</h3>
                            <p class="text-gray-500 text-sm">قم بإضافة أول وثيقة لبدء بناء مكتبة النظام</p>
                        </div>
                    ` : `
                        <div class="overflow-x-auto p-4">
                            <table class="w-full text-right border-collapse">
                                <thead>
                                    <tr class="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                                        <th class="p-3 font-semibold text-right rounded-tr-lg">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.code', 'كود ISO') : 'كود ISO'}</th>
                                        <th class="p-3 font-semibold text-right">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.name', 'اسم الوثيقة') : 'اسم الوثيقة'}</th>
                                        <th class="p-3 font-semibold text-right">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.type', 'النوع') : 'النوع'}</th>
                                        <th class="p-3 font-semibold text-center">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.version', 'الإصدار') : 'الإصدار'}</th>
                                        <th class="p-3 font-semibold text-center">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.status', 'الحالة') : 'الحالة'}</th>
                                        <th class="p-3 font-semibold text-center rounded-tl-lg">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.actions', 'الإجراءات') : 'الإجراءات'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${documents.map(d => {
                                        const status = d.status || 'معتمد';
                                        let statusBadge = 'bg-green-100 text-green-800 border-green-200';
                                        if (status === 'مسودة' || status === 'Draft') statusBadge = 'bg-gray-100 text-gray-800 border-gray-200';
                                        else if (status === 'قيد المراجعة' || status === 'Under Review') statusBadge = 'bg-amber-100 text-amber-800 border-amber-200';
                                        
                                        return `
                                        <tr class="border-b border-gray-100 hover:bg-blue-50/30 transition-colors group">
                                            <td class="p-3"><span class="font-mono text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100 text-sm font-bold">${Utils.escapeHTML(d.isoCode || '---')}</span></td>
                                            <td class="p-3 font-medium text-gray-800">${Utils.escapeHTML(d.name || '')}</td>
                                            <td class="p-3 text-sm text-gray-600">${Utils.escapeHTML(d.type || '')}</td>
                                            <td class="p-3 text-center"><span class="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold text-xs border border-gray-200">v${d.version || '1.0'}</span></td>
                                            <td class="p-3 text-center"><span class="px-2.5 py-1 text-xs rounded-full border ${statusBadge} font-semibold">${status}</span></td>
                                            <td class="p-3 text-center">
                                                <button onclick="ISO.viewDocument('${d.id}')" class="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors" title="عرض التفاصيل">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `}).join('')}
                                </tbody>
                            </table>
                        </div>
                    `}
                </div>
            </div>
        `;
    },

    async renderProcedures() {
        const procedures = AppState.appData.isoProcedures || [];
        return `
            <div class="content-card shadow-lg border-0 rounded-2xl overflow-hidden bg-white">
                <div class="card-header bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <i class="fas fa-project-diagram text-xl text-white"></i>
                        </div>
                        <div>
                            <h2 class="card-title text-white m-0 text-xl font-bold">${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.title', 'إدارة الإجراءات (Procedures)') : 'إدارة الإجراءات (Procedures)'}</h2>
                            <p class="text-emerald-100 text-sm m-0 opacity-80">إجراءات العمل القياسية (SOPs)</p>
                        </div>
                    </div>
                    <button id="add-procedure-btn" class="btn bg-white text-emerald-700 hover:bg-emerald-50 border-0 shadow-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all hover:shadow-md">
                        <i class="fas fa-plus"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.addBtn', 'إضافة إجراء') : 'إضافة إجراء'}
                    </button>
                </div>
                <div class="card-body p-0">
                    ${procedures.length === 0 ? `
                        <div class="p-12 text-center flex flex-col items-center justify-center bg-gray-50/50">
                            <div class="w-20 h-20 bg-emerald-50 text-emerald-300 rounded-full flex items-center justify-center mb-4"><i class="fas fa-network-wired text-3xl"></i></div>
                            <h3 class="text-gray-700 font-bold text-lg mb-1">${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.noData', 'لا توجد إجراءات مسجلة') : 'لا توجد إجراءات مسجلة'}</h3>
                            <p class="text-gray-500 text-sm">قم بإضافة أول إجراء (SOP) لتنظيم العمل</p>
                        </div>
                    ` : `
                        <div class="overflow-x-auto p-4">
                            <table class="w-full text-right border-collapse">
                                <thead>
                                    <tr class="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                                        <th class="p-3 font-semibold text-right rounded-tr-lg">${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.table.code', 'كود الإجراء') : 'كود الإجراء'}</th>
                                        <th class="p-3 font-semibold text-right">${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.table.name', 'اسم الإجراء') : 'اسم الإجراء'}</th>
                                        <th class="p-3 font-semibold text-right">${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.table.dept', 'القسم المالك') : 'القسم المالك'}</th>
                                        <th class="p-3 font-semibold text-center">${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.table.nextReview', 'المراجعة القادمة') : 'المراجعة القادمة'}</th>
                                        <th class="p-3 font-semibold text-center rounded-tl-lg">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.actions', 'الإجراءات') : 'الإجراءات'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${procedures.map(p => {
                                        // Fake Next Review calculation for UI
                                        const issueDate = p.issueDate || new Date().toISOString();
                                        const nextReview = new Date(issueDate);
                                        nextReview.setFullYear(nextReview.getFullYear() + 1);
                                        const isOverdue = nextReview < new Date();
                                        
                                        return `
                                        <tr class="border-b border-gray-100 hover:bg-emerald-50/30 transition-colors group">
                                            <td class="p-3"><span class="font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 text-sm font-bold">${Utils.escapeHTML(p.isoCode || '---')}</span></td>
                                            <td class="p-3 font-medium text-gray-800">${Utils.escapeHTML(p.name || '')}</td>
                                            <td class="p-3"><span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"><i class="fas fa-building text-gray-400"></i> ${Utils.escapeHTML(p.department || 'عام')}</span></td>
                                            <td class="p-3 text-center">
                                                <div class="flex items-center justify-center gap-1.5 ${isOverdue ? 'text-red-600 font-bold' : 'text-gray-600'}">
                                                    <i class="fas ${isOverdue ? 'fa-exclamation-circle' : 'fa-calendar-alt'}"></i>
                                                    <span class="text-sm">${nextReview.toLocaleDateString('ar-EG')}</span>
                                                </div>
                                            </td>
                                            <td class="p-3 text-center">
                                                <button onclick="ISO.viewProcedure('${p.id}')" class="text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition-colors" title="عرض التفاصيل">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `}).join('')}
                                </tbody>
                            </table>
                        </div>
                    `}
                </div>
            </div>
        `;
    },

    async renderForms() {
        const forms = AppState.appData.isoForms || [];
        return `
            <div class="content-card shadow-lg border-0 rounded-2xl overflow-hidden bg-white">
                <div class="card-header bg-gradient-to-r from-amber-500 to-orange-600 text-white p-5 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <i class="fas fa-file-signature text-xl text-white"></i>
                        </div>
                        <div>
                            <h2 class="card-title text-white m-0 text-xl font-bold">${typeof I18n !== 'undefined' ? I18n.t('module.iso.forms.title', 'النماذج القياسية (Forms)') : 'النماذج القياسية (Forms)'}</h2>
                            <p class="text-amber-100 text-sm m-0 opacity-80">سجل النماذج المعتمدة لجمع البيانات</p>
                        </div>
                    </div>
                    <button id="add-form-btn" class="btn bg-white text-orange-700 hover:bg-orange-50 border-0 shadow-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all hover:shadow-md">
                        <i class="fas fa-plus"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.forms.addBtn', 'إضافة نموذج') : 'إضافة نموذج'}
                    </button>
                </div>
                <div class="card-body p-0">
                    ${forms.length === 0 ? `
                        <div class="p-12 text-center flex flex-col items-center justify-center bg-gray-50/50">
                            <div class="w-20 h-20 bg-orange-50 text-orange-300 rounded-full flex items-center justify-center mb-4"><i class="fas fa-clipboard-list text-3xl"></i></div>
                            <h3 class="text-gray-700 font-bold text-lg mb-1">${typeof I18n !== 'undefined' ? I18n.t('module.iso.forms.noData', 'لا توجد نماذج مسجلة') : 'لا توجد نماذج مسجلة'}</h3>
                            <p class="text-gray-500 text-sm">قم بإضافة أول نموذج ليكون متاحاً للطباعة والاستخدام</p>
                        </div>
                    ` : `
                        <div class="overflow-x-auto p-4">
                            <table class="w-full text-right border-collapse">
                                <thead>
                                    <tr class="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                                        <th class="p-3 font-semibold text-right rounded-tr-lg">${typeof I18n !== 'undefined' ? I18n.t('module.iso.forms.table.code', 'الكود المرجعي') : 'الكود المرجعي'}</th>
                                        <th class="p-3 font-semibold text-right">${typeof I18n !== 'undefined' ? I18n.t('module.iso.forms.table.name', 'اسم النموذج') : 'اسم النموذج'}</th>
                                        <th class="p-3 font-semibold text-right">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.type', 'نوع النموذج') : 'نوع النموذج'}</th>
                                        <th class="p-3 font-semibold text-center rounded-tl-lg">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.actions', 'الإجراءات') : 'الإجراءات'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${forms.map(f => `
                                        <tr class="border-b border-gray-100 hover:bg-orange-50/30 transition-colors group">
                                            <td class="p-3"><span class="font-mono text-orange-700 bg-orange-50 px-2 py-1 rounded border border-orange-100 text-sm font-bold">${Utils.escapeHTML(f.isoCode || '---')}</span></td>
                                            <td class="p-3 font-medium text-gray-800">${Utils.escapeHTML(f.name || '')}</td>
                                            <td class="p-3 text-sm text-gray-600">
                                                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                                    <i class="fas ${f.type?.includes('سجل') ? 'fa-book' : 'fa-clipboard'}"></i>
                                                    ${Utils.escapeHTML(f.type || 'نموذج إدخال')}
                                                </span>
                                            </td>
                                            <td class="p-3 text-center">
                                                <button onclick="ISO.viewForm('${f.id}')" class="text-gray-400 hover:text-orange-600 hover:bg-orange-50 p-2 rounded-lg transition-colors" title="عرض التفاصيل">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `}
                </div>
            </div>
        `;
    },

    setupEventListeners() {
        setTimeout(() => {
            const tabs = document.querySelectorAll('.tab-btn');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    this.currentTab = tab.getAttribute('data-tab');
                    this.load();
                });
            });

            const addDocumentBtn = document.getElementById('add-document-btn');
            const addProcedureBtn = document.getElementById('add-procedure-btn');
            const addFormBtn = document.getElementById('add-form-btn');

            if (addDocumentBtn) addDocumentBtn.addEventListener('click', () => this.showDocumentForm());
            if (addProcedureBtn) addProcedureBtn.addEventListener('click', () => this.showProcedureForm());
            if (addFormBtn) addFormBtn.addEventListener('click', () => this.showFormForm());
        }, 100);
    },

    async showDocumentForm(data = null) {
        // جلب قائمة الأكواد من المركز
        let documentCodes = [];
        try {
            const result = await GoogleIntegration.fetchData('getDocumentCodes', {});
            if (result.success && result.data) {
                documentCodes = result.data.filter(c => c.documentType === 'وثيقة' && c.status === 'نشط');
            }
        } catch (error) {
            Utils.safeError('Error loading document codes:', error);
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.documents.editTitle', 'تعديل وثيقة') : 'تعديل وثيقة') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.documents.addTitle', 'إضافة وثيقة جديدة') : 'إضافة وثيقة جديدة')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="iso-document-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.docCodeLabel', 'كود المستند من المركز *') : 'كود المستند من المركز *'}</label>
                            <select id="document-code-select" required class="form-input" 
                                onchange="ISO.loadDocumentCodeVersion('document')">
                                <option value="">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.selectCodeOption', 'اختر الكود من مركز التكويد والإصدار') : 'اختر الكود من مركز التكويد والإصدار'}</option>
                                ${documentCodes.map(code => `
                                    <option value="${code.code}" 
                                        data-code-id="${code.id}"
                                        ${data?.isoCode === code.code ? 'selected' : ''}>
                                        ${Utils.escapeHTML(code.code || '')} - ${Utils.escapeHTML(code.documentName || '')}
                                    </option>
                                `).join('')}
                            </select>
                            <p class="text-xs text-gray-500 mt-1">
                                <i class="fas fa-info-circle ml-1"></i>
                                ${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.codeHint', 'يجب اختيار الكود من مركز التكويد والإصدار. الإصدار سيُسحب تلقائياً.') : 'يجب اختيار الكود من مركز التكويد والإصدار. الإصدار سيُسحب تلقائياً.'}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.docNameLabel', 'اسم الوثيقة *') : 'اسم الوثيقة *'}</label>
                            <input type="text" id="document-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.name || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.docNamePlaceholder', 'اسم الوثيقة') : 'اسم الوثيقة'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typeLabel', 'النوع *') : 'النوع *'}</label>
                            <select id="document-type" required class="form-input">
                                <option value="">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.selectTypeOption', 'اختر النوع') : 'اختر النوع'}</option>
                                <option value="سياسة" ${data?.type === 'سياسة' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typePolicy', 'سياسة') : 'سياسة'}</option>
                                <option value="إجراء" ${data?.type === 'إجراء' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typeProcedure', 'إجراء') : 'إجراء'}</option>
                                <option value="تعليمات" ${data?.type === 'تعليمات' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typeInstructions', 'تعليمات') : 'تعليمات'}</option>
                                <option value="دليل" ${data?.type === 'دليل' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typeManual', 'دليل') : 'دليل'}</option>
                                <option value="أخرى" ${data?.type === 'أخرى' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typeOther', 'أخرى') : 'أخرى'}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.versionLabel', 'رقم الإصدار (يُسحب تلقائياً من المركز)') : 'رقم الإصدار (يُسحب تلقائياً من المركز)'}</label>
                            <input type="text" id="document-version" readonly class="form-input bg-gray-100" 
                                value="${Utils.escapeHTML(data?.version || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.versionPlaceholder', 'سيتم جلب الإصدار تلقائياً') : 'سيتم جلب الإصدار تلقائياً'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.issueDateLabel', 'تاريخ الإصدار') : 'تاريخ الإصدار'}</label>
                            <input type="text" id="document-issue-date" readonly class="form-input bg-gray-100" 
                                value="${data?.issueDate ? Utils.formatDate(data.issueDate) : ''}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.issueDatePlaceholder', 'سيتم جلب تاريخ الإصدار تلقائياً') : 'سيتم جلب تاريخ الإصدار تلقائياً'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.revisionDateLabel', 'تاريخ التعديل') : 'تاريخ التعديل'}</label>
                            <input type="text" id="document-revision-date" readonly class="form-input bg-gray-100" 
                                value="${data?.revisionDate ? Utils.formatDate(data.revisionDate) : ''}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.revisionDatePlaceholder', 'سيتم جلب تاريخ التعديل تلقائياً') : 'سيتم جلب تاريخ التعديل تلقائياً'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.departmentLabel', 'القسم *') : 'القسم *'}</label>
                            <input type="text" id="document-department" required class="form-input" 
                                value="${Utils.escapeHTML(data?.department || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.departmentPlaceholder', 'القسم') : 'القسم'}">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.cancel', 'إلغاء') : 'إلغاء'}</button>
                    <button type="button" id="save-document-btn" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.save', 'حفظ') : 'حفظ'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // إذا كان هناك بيانات موجودة، جلب الإصدار تلقائياً
        if (data?.isoCode) {
            await this.loadDocumentCodeVersion('document', data.isoCode);
        }

        const saveBtn = modal.querySelector('#save-document-btn');
        saveBtn.addEventListener('click', () => this.handleDocumentSubmit(data?.id, modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async handleDocumentSubmit(editId = null, modal) {
        const codeSelect = document.getElementById('document-code-select');
        const selectedCode = codeSelect?.value || '';

        if (!selectedCode) {
            Notification.error('يجب اختيار كود المستند من مركز التكويد والإصدار');
            return;
        }

        // فحص العناصر قبل الاستخدام
        const nameEl = document.getElementById('document-name');
        const typeEl = document.getElementById('document-type');
        const versionEl = document.getElementById('document-version');
        const issueDateEl = document.getElementById('document-issue-date');
        const revisionDateEl = document.getElementById('document-revision-date');
        const departmentEl = document.getElementById('document-department');
        
        if (!nameEl || !typeEl || !versionEl || !departmentEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            return;
        }

        const formData = {
            id: editId || Utils.generateId('ISO_DOC'),
            isoCode: selectedCode,
            name: nameEl.value.trim(),
            type: typeEl.value,
            version: versionEl.value.trim() || 'غير محدد',
            issueDate: issueDateEl?.value || null,
            revisionDate: revisionDateEl?.value || null,
            department: departmentEl.value.trim(),
            createdAt: editId ? AppState.appData.isoDocuments.find(d => d.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        Loading.show();
        try {
            if (editId) {
                const index = AppState.appData.isoDocuments.findIndex(d => d.id === editId);
                if (index !== -1) AppState.appData.isoDocuments[index] = formData;
                Notification.success('تم تحديث الوثيقة بنجاح');
            } else {
                AppState.appData.isoDocuments.push(formData);
                Notification.success('تم إضافة الوثيقة بنجاح');
            }

            // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

            Loading.hide();
            try {
                if (modal && modal.parentNode) modal.remove();
            } catch (removeErr) {
                Utils.safeWarn('⚠️ خطأ في إغلاق نموذج الوثيقة:', removeErr);
            }
            this.load();

            GoogleIntegration.autoSave('ISODocuments', AppState.appData.isoDocuments).catch(error => {
                Utils.safeError('خطأ في حفظ Google Sheets (وثائق ISO):', error);
                if (typeof Notification !== 'undefined' && Notification.warning) {
                    Notification.warning('تم الحفظ محلياً. تعذّرت المزامنة الفورية مع الشيت.');
                }
            });
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    async showProcedureForm(data = null) {
        // جلب قائمة الأكواد من المركز
        let documentCodes = [];
        try {
            const result = await GoogleIntegration.fetchData('getDocumentCodes', {});
            if (result.success && result.data) {
                documentCodes = result.data.filter(c => c.documentType === 'إجراء' && c.status === 'نشط');
            }
        } catch (error) {
            Utils.safeError('Error loading document codes:', error);
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.editTitle', 'تعديل إجراء') : 'تعديل إجراء') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.addTitle', 'إضافة إجراء جديد') : 'إضافة إجراء جديد')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="iso-procedure-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.procCodeLabel', 'كود الإجراء من المركز *') : 'كود الإجراء من المركز *'}</label>
                            <select id="procedure-code-select" required class="form-input" 
                                onchange="ISO.loadDocumentCodeVersion('procedure')">
                                <option value="">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.selectCodeOption', 'اختر الكود من مركز التكويد والإصدار') : 'اختر الكود من مركز التكويد والإصدار'}</option>
                                ${documentCodes.map(code => `
                                    <option value="${code.code}" 
                                        data-code-id="${code.id}"
                                        ${data?.isoCode === code.code ? 'selected' : ''}>
                                        ${Utils.escapeHTML(code.code || '')} - ${Utils.escapeHTML(code.documentName || '')}
                                    </option>
                                `).join('')}
                            </select>
                            <p class="text-xs text-gray-500 mt-1">
                                <i class="fas fa-info-circle ml-1"></i>
                                ${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.codeHint', 'يجب اختيار الكود من مركز التكويد والإصدار. الإصدار سيُسحب تلقائياً.') : 'يجب اختيار الكود من مركز التكويد والإصدار. الإصدار سيُسحب تلقائياً.'}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.procNameLabel', 'اسم الإجراء *') : 'اسم الإجراء *'}</label>
                            <input type="text" id="procedure-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.name || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.procNamePlaceholder', 'اسم الإجراء') : 'اسم الإجراء'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.departmentLabel', 'القسم *') : 'القسم *'}</label>
                            <input type="text" id="procedure-department" required class="form-input" 
                                value="${Utils.escapeHTML(data?.department || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.departmentPlaceholder', 'القسم') : 'القسم'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.versionLabel', 'رقم الإصدار (يُسحب تلقائياً من المركز)') : 'رقم الإصدار (يُسحب تلقائياً من المركز)'}</label>
                            <input type="text" id="procedure-version" readonly class="form-input bg-gray-100" 
                                value="${Utils.escapeHTML(data?.version || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.versionPlaceholder', 'سيتم جلب الإصدار تلقائياً') : 'سيتم جلب الإصدار تلقائياً'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.issueDateLabel', 'تاريخ الإصدار') : 'تاريخ الإصدار'}</label>
                            <input type="text" id="procedure-issue-date" readonly class="form-input bg-gray-100" 
                                value="${data?.issueDate ? Utils.formatDate(data.issueDate) : ''}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.issueDatePlaceholder', 'سيتم جلب تاريخ الإصدار تلقائياً') : 'سيتم جلب تاريخ الإصدار تلقائياً'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.revisionDateLabel', 'تاريخ التعديل') : 'تاريخ التعديل'}</label>
                            <input type="text" id="procedure-revision-date" readonly class="form-input bg-gray-100" 
                                value="${data?.revisionDate ? Utils.formatDate(data.revisionDate) : ''}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.revisionDatePlaceholder', 'سيتم جلب تاريخ التعديل تلقائياً') : 'سيتم جلب تاريخ التعديل تلقائياً'}">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.cancel', 'إلغاء') : 'إلغاء'}</button>
                    <button type="button" id="save-procedure-btn" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.save', 'حفظ') : 'حفظ'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // إذا كان هناك بيانات موجودة، جلب الإصدار تلقائياً
        if (data?.isoCode) {
            await this.loadDocumentCodeVersion('procedure', data.isoCode);
        }

        const saveBtn = modal.querySelector('#save-procedure-btn');
        saveBtn.addEventListener('click', () => this.handleProcedureSubmit(data?.id, modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async handleProcedureSubmit(editId = null, modal) {
        const codeSelect = document.getElementById('procedure-code-select');
        const selectedCode = codeSelect?.value || '';

        if (!selectedCode) {
            Notification.error('يجب اختيار كود الإجراء من مركز التكويد والإصدار');
            return;
        }

        const formData = {
            id: editId || Utils.generateId('ISO_PROC'),
            isoCode: selectedCode,
            name: document.getElementById('procedure-name').value.trim(),
            department: document.getElementById('procedure-department').value.trim(),
            version: document.getElementById('procedure-version').value.trim() || 'غير محدد',
            issueDate: document.getElementById('procedure-issue-date').value || null,
            revisionDate: document.getElementById('procedure-revision-date').value || null,
            createdAt: editId ? AppState.appData.isoProcedures.find(p => p.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        Loading.show();
        try {
            if (editId) {
                const index = AppState.appData.isoProcedures.findIndex(p => p.id === editId);
                if (index !== -1) AppState.appData.isoProcedures[index] = formData;
                Notification.success('تم تحديث الإجراء بنجاح');
            } else {
                AppState.appData.isoProcedures.push(formData);
                Notification.success('تم إضافة الإجراء بنجاح');
            }

            // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

            Loading.hide();
            try {
                if (modal && modal.parentNode) modal.remove();
            } catch (removeErr) {
                Utils.safeWarn('⚠️ خطأ في إغلاق نموذج الإجراء:', removeErr);
            }
            this.load();

            GoogleIntegration.autoSave('ISOProcedures', AppState.appData.isoProcedures).catch(error => {
                Utils.safeError('خطأ في حفظ Google Sheets (إجراءات ISO):', error);
                if (typeof Notification !== 'undefined' && Notification.warning) {
                    Notification.warning('تم الحفظ محلياً. تعذّرت المزامنة الفورية مع الشيت.');
                }
            });
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    async showFormForm(data = null) {
        // جلب قائمة الأكواد من المركز
        let documentCodes = [];
        try {
            const result = await GoogleIntegration.fetchData('getDocumentCodes', {});
            if (result.success && result.data) {
                documentCodes = result.data.filter(c => c.documentType === 'نموذج' && c.status === 'نشط');
            }
        } catch (error) {
            Utils.safeError('Error loading document codes:', error);
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.forms.editTitle', 'تعديل نموذج') : 'تعديل نموذج') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.forms.addTitle', 'إضافة نموذج جديد') : 'إضافة نموذج جديد')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="iso-form-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.frmCodeLabel', 'كود النموذج من المركز *') : 'كود النموذج من المركز *'}</label>
                            <select id="form-code-select" required class="form-input" 
                                onchange="ISO.loadDocumentCodeVersion('form')">
                                <option value="">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.selectCodeOption', 'اختر الكود من مركز التكويد والإصدار') : 'اختر الكود من مركز التكويد والإصدار'}</option>
                                ${documentCodes.map(code => `
                                    <option value="${code.code}" 
                                        data-code-id="${code.id}"
                                        ${data?.isoCode === code.code ? 'selected' : ''}>
                                        ${Utils.escapeHTML(code.code || '')} - ${Utils.escapeHTML(code.documentName || '')}
                                    </option>
                                `).join('')}
                            </select>
                            <p class="text-xs text-gray-500 mt-1">
                                <i class="fas fa-info-circle ml-1"></i>
                                ${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.codeHint', 'يجب اختيار الكود من مركز التكويد والإصدار. الإصدار سيُسحب تلقائياً.') : 'يجب اختيار الكود من مركز التكويد والإصدار. الإصدار سيُسحب تلقائياً.'}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.frmNameLabel', 'اسم النموذج *') : 'اسم النموذج *'}</label>
                            <input type="text" id="form-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.name || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.frmNamePlaceholder', 'اسم النموذج') : 'اسم النموذج'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typeLabel', 'النوع *') : 'النوع *'}</label>
                            <select id="form-type" required class="form-input">
                                <option value="">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.selectTypeOption', 'اختر النوع') : 'اختر النوع'}</option>
                                <option value="تسجيل" ${data?.type === 'تسجيل' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typeRecord', 'تسجيل') : 'تسجيل'}</option>
                                <option value="تقرير" ${data?.type === 'تقرير' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typeReport', 'تقرير') : 'تقرير'}</option>
                                <option value="حص" ${data?.type === 'حص' || data?.type === 'فحص' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typeInspection', 'فحص') : 'فحص'}</option>
                                <option value="تدريب" ${data?.type === 'تدريب' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typeTraining', 'تدريب') : 'تدريب'}</option>
                                <option value="أخرى" ${data?.type === 'أخرى' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.typeOther', 'أخرى') : 'أخرى'}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.versionLabel', 'رقم الإصدار (يُسحب تلقائياً من المركز)') : 'رقم الإصدار (يُسحب تلقائياً من المركز)'}</label>
                            <input type="text" id="form-version" readonly class="form-input bg-gray-100" 
                                value="${Utils.escapeHTML(data?.version || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.versionPlaceholder', 'سيتم جلب الإصدار تلقائياً') : 'سيتم جلب الإصدار تلقائياً'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.issueDateLabel', 'تاريخ الإصدار') : 'تاريخ الإصدار'}</label>
                            <input type="text" id="form-issue-date" readonly class="form-input bg-gray-100" 
                                value="${data?.issueDate ? Utils.formatDate(data.issueDate) : ''}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.issueDatePlaceholder', 'سيتم جلب تاريخ الإصدار تلقائياً') : 'سيتم جلب تاريخ الإصدار تلقائياً'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.revisionDateLabel', 'تاريخ التعديل') : 'تاريخ التعديل'}</label>
                            <input type="text" id="form-revision-date" readonly class="form-input bg-gray-100" 
                                value="${data?.revisionDate ? Utils.formatDate(data.revisionDate) : ''}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.form.revisionDatePlaceholder', 'سيتم جلب تاريخ التعديل تلقائياً') : 'سيتم جلب تاريخ التعديل تلقائياً'}">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.cancel', 'إلغاء') : 'إلغاء'}</button>
                    <button type="button" id="save-form-btn" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.save', 'حفظ') : 'حفظ'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // إذا كان هناك بيانات موجودة، جلب الإصدار تلقائياً
        if (data?.isoCode) {
            await this.loadDocumentCodeVersion('form', data.isoCode);
        }

        const saveBtn = modal.querySelector('#save-form-btn');
        saveBtn.addEventListener('click', () => this.handleFormSubmit(data?.id, modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async handleFormSubmit(editId = null, modal) {
        // منع النقر المتكرر
        const submitBtn = modal?.querySelector('button[type="submit"]') || 
                         document.querySelector('.modal-overlay button[type="submit"]');
        
        if (submitBtn && submitBtn.disabled) {
            return; // النموذج قيد المعالجة
        }

        // تعطيل الزر لمنع النقر المتكرر
        let originalText = '';
        if (submitBtn) {
            originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الحفظ...';
        }

        const codeSelect = document.getElementById('form-code-select');
        const selectedCode = codeSelect?.value || '';

        if (!selectedCode) {
            Notification.error('يجب اختيار كود النموذج من مركز التكويد والإصدار');
            // استعادة الزر عند الخطأ
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            return;
        }

        // فحص العناصر قبل الاستخدام
        const nameEl = document.getElementById('form-name');
        const typeEl = document.getElementById('form-type');
        const versionEl = document.getElementById('form-version');
        const issueDateEl = document.getElementById('form-issue-date');
        const revisionDateEl = document.getElementById('form-revision-date');
        
        if (!nameEl || !typeEl || !versionEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            return;
        }

        const formData = {
            id: editId || Utils.generateId('ISO_FORM'),
            isoCode: selectedCode,
            name: nameEl.value.trim(),
            type: typeEl.value,
            version: versionEl.value.trim() || 'غير محدد',
            issueDate: issueDateEl?.value || null,
            revisionDate: revisionDateEl?.value || null,
            createdAt: editId ? AppState.appData.isoForms.find(f => f.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        try {
            // 1. حفظ البيانات فوراً في الذاكرة
            if (editId) {
                const index = AppState.appData.isoForms.findIndex(f => f.id === editId);
                if (index !== -1) AppState.appData.isoForms[index] = formData;
                Notification.success('تم تحديث النموذج بنجاح');
            } else {
                AppState.appData.isoForms.push(formData);
                Notification.success('تم إضافة النموذج بنجاح');
            }

            // حفظ البيانات باستخدام window.DataManager
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            } else {
                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
            }

            // 2. إغلاق النموذج فوراً بعد الحفظ في الذاكرة
            modal.remove();
            
            // 3. استعادة الزر بعد النجاح
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            
            // 4. تحديث القائمة فوراً
            this.load();
            
            // 5. معالجة المهام الخلفية (Google Sheets) في الخلفية
            GoogleIntegration.autoSave('ISOForms', AppState.appData.isoForms).catch(error => {
                Utils.safeError('خطأ في حفظ Google Sheets:', error);
            });
        } catch (error) {
            Notification.error('حدث خطأ: ' + error.message);
            
            // استعادة الزر في حالة الخطأ
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        }
    },

    async viewDocument(id) {
        const doc = AppState.appData.isoDocuments.find(d => d.id === id);
        if (!doc) {
            Notification.error(typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.notFound', 'الوثيقة غير موجودة') : 'الوثيقة غير موجودة');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.detailsTitle', 'تفاصيل الوثيقة') : 'تفاصيل الوثيقة'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.code', 'كود ISO:') : 'كود ISO:'}</strong> ${Utils.escapeHTML(doc.isoCode || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.name', 'اسم الوثيقة:') : 'اسم الوثيقة:'}</strong> ${Utils.escapeHTML(doc.name || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.type', 'النوع:') : 'النوع:'}</strong> ${Utils.escapeHTML(doc.type || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.version', 'الإصدار:') : 'الإصدار:'}</strong> ${Utils.escapeHTML(doc.version || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.table.dept', 'القسم:') : 'القسم:'}</strong> ${Utils.escapeHTML(doc.department || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.createdAt', 'تاريخ الإنشاء:') : 'تاريخ الإنشاء:'}</strong> ${Utils.formatDate(doc.createdAt)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.close', 'إغلاق') : 'إغلاق'}</button>
                    <button type="button" onclick="ISO.showDocumentForm(${JSON.stringify(doc).replace(/"/g, '&quot;')}); this.closest('.modal-overlay').remove();" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.edit', 'تعديل') : 'تعديل'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async viewProcedure(id) {
        const procedure = AppState.appData.isoProcedures.find(p => p.id === id);
        if (!procedure) {
            Notification.error(typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.notFound', 'الإجراء غير موجود') : 'الإجراء غير موجود');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.detailsTitle', 'تفاصيل الإجراء') : 'تفاصيل الإجراء'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.table.code', 'كود ISO:') : 'كود ISO:'}</strong> ${Utils.escapeHTML(procedure.isoCode || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.table.name', 'اسم الإجراء:') : 'اسم الإجراء:'}</strong> ${Utils.escapeHTML(procedure.name || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.procedures.table.dept', 'القسم:') : 'القسم:'}</strong> ${Utils.escapeHTML(procedure.department || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.version', 'الإصدار:') : 'الإصدار:'}</strong> ${Utils.escapeHTML(procedure.version || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.createdAt', 'تاريخ الإنشاء:') : 'تاريخ الإنشاء:'}</strong> ${Utils.formatDate(procedure.createdAt)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.close', 'إغلاق') : 'إغلاق'}</button>
                    <button type="button" onclick="ISO.showProcedureForm(${JSON.stringify(procedure).replace(/"/g, '&quot;')}); this.closest('.modal-overlay').remove();" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.edit', 'تعديل') : 'تعديل'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async viewForm(id) {
        const form = AppState.appData.isoForms.find(f => f.id === id);
        if (!form) {
            Notification.error(typeof I18n !== 'undefined' ? I18n.t('module.iso.forms.notFound', 'النموذج غير موجود') : 'النموذج غير موجود');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${typeof I18n !== 'undefined' ? I18n.t('module.iso.forms.detailsTitle', 'تفاصيل النموذج') : 'تفاصيل النموذج'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.forms.table.code', 'كود ISO:') : 'كود ISO:'}</strong> ${Utils.escapeHTML(form.isoCode || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.forms.table.name', 'اسم النموذج:') : 'اسم النموذج:'}</strong> ${Utils.escapeHTML(form.name || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.docs.table.type', 'النوع:') : 'النوع:'}</strong> ${Utils.escapeHTML(form.type || '')}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.createdAt', 'تاريخ الإنشاء:') : 'تاريخ الإنشاء:'}</strong> ${Utils.formatDate(form.createdAt)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.close', 'إغلاق') : 'إغلاق'}</button>
                    <button type="button" onclick="ISO.showFormForm(${JSON.stringify(form).replace(/"/g, '&quot;')}); this.closest('.modal-overlay').remove();" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.edit', 'تعديل') : 'تعديل'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async renderISO45001() {
        const objectives = AppState.appData.hseObjectives || [];
        const riskAssessments = AppState.appData.hseRiskAssessments || [];

        return `
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-hard-hat ml-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.compliance.iso45001Title', 'ISO 45001 - السلامة والصحة المهنية') : 'ISO 45001 - السلامة والصحة المهنية'}</h2>
                </div>
                <div class="card-body">
                    <div class="space-y-4">
                        <p class="text-gray-700">
                            ${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.desc', 'يركز هذا القسم على متطلبات نظام إدارة السلامة والصحة المهنية (OH&S) وفقًا لمعيار ISO 45001. يهدف إلى تمكين المنظمة من توفير أماكن عمل آمنة وصحية، ومنع الإصابات والأمراض المرتبطة بالعمل، بالإضافة إلى التحسين المستمر لأداء السلامة والصحة المهنية.') : 'يركز هذا القسم على متطلبات نظام إدارة السلامة والصحة المهنية (OH&S) وفقًا لمعيار ISO 45001. يهدف إلى تمكين المنظمة من توفير أماكن عمل آمنة وصحية، ومنع الإصابات والأمراض المرتبطة بالعمل، بالإضافة إلى التحسين المستمر لأداء السلامة والصحة المهنية.'}
                        </p>
                        <h3 class="font-semibold text-lg mt-4 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.elementsTitle', 'العناصر الرئيسية:') : 'العناصر الرئيسية:'}</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-2">
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.el1', 'السياق التنظيمي') : 'السياق التنظيمي'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.el2', 'القيادة ومشاركة العاملين') : 'القيادة ومشاركة العاملين'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.el3', 'التخطيط (تحديد المخاطر والفرص، الأهداف)') : 'التخطيط (تحديد المخاطر والفرص، الأهداف)'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.el4', 'الدعم (الموارد، الكفاءة، الوعي، الاتصال، المعلومات الموثقة)') : 'الدعم (الموارد، الكفاءة، الوعي، الاتصال، المعلومات الموثقة)'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.el5', 'التشغيل (التخطيط والتحكم التشغيلي، إدارة التغيير، المشتريات، المقاولون، الاستعداد للطوارئ)') : 'التشغيل (التخطيط والتحكم التشغيلي، إدارة التغيير، المشتريات، المقاولون، الاستعداد للطوارئ)'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.el6', 'تقييم الأداء (المراقبة والقياس، تقييم الامتثال، التدقيق الداخلي، مراجعة الإدارة)') : 'تقييم الأداء (المراقبة والقياس، تقييم الامتثال، التدقيق الداخلي، مراجعة الإدارة)'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.el7', 'التحسين (عدم المطابقة والإجراءات التصحيحية، التحسين المستمر)') : 'التحسين (عدم المطابقة والإجراءات التصحيحية، التحسين المستمر)'}</li>
                        </ul>
                        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-blue-50 border border-blue-200 rounded p-4">
                                <h4 class="font-semibold text-blue-800 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.objectivesTitle', 'الأهداف') : 'الأهداف'} (${objectives.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.objectivesDesc', 'إدارة أهداف السلامة والصحة المهنية') : 'إدارة أهداف السلامة والصحة المهنية'}</p>
                                <button class="btn-secondary w-full" onclick="ISO.showHSEObjectiveForm()">
                                    <i class="fas fa-bullseye ml-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.manageObjectivesBtn', 'إدارة الأهداف') : 'إدارة الأهداف'}
                                </button>
                            </div>
                            <div class="bg-green-50 border border-green-200 rounded p-4">
                                <h4 class="font-semibold text-green-800 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.risksTitle', 'تقييمات المخاطر') : 'تقييمات المخاطر'} (${riskAssessments.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.risksDesc', 'تقييم مخاطر السلامة والصحة المهنية') : 'تقييم مخاطر السلامة والصحة المهنية'}</p>
                                <button class="btn-secondary w-full" onclick="ISO.showHSERiskAssessmentForm()">
                                    <i class="fas fa-shield-alt ml-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso45001.manageRisksBtn', 'تقييم المخاطر') : 'تقييم المخاطر'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async renderISO14001() {
        const aspects = AppState.appData.environmentalAspects || [];
        const monitoring = AppState.appData.environmentalMonitoring || [];

        return `
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-leaf ml-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.overview.compliance.iso14001Title', 'ISO 14001 - إدارة البيئة') : 'ISO 14001 - إدارة البيئة'}</h2>
                </div>
                <div class="card-body">
                    <div class="space-y-4">
                        <p class="text-gray-700">
                            ${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.desc', 'يحدد هذا القسم متطلبات نظام إدارة البيئة (EMS) وفقًا لمعيار ISO 14001. يهدف إلى مساعدة المنظمات على تحسين أدائها البيئي من خلال إدارة مسؤولياتها البيئية بطريقة منهجية تساهم في ركيزة الاستدامة.') : 'يحدد هذا القسم متطلبات نظام إدارة البيئة (EMS) وفقًا لمعيار ISO 14001. يهدف إلى مساعدة المنظمات على تحسين أدائها البيئي من خلال إدارة مسؤولياتها البيئية بطريقة منهجية تساهم في ركيزة الاستدامة.'}
                        </p>
                        <h3 class="font-semibold text-lg mt-4 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.elementsTitle', 'العناصر الرئيسية:') : 'العناصر الرئيسية:'}</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-2">
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.el1', 'السياق التنظيمي') : 'السياق التنظيمي'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.el2', 'القيادة') : 'القيادة'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.el3', 'التخطيط (تحديد الجوانب البيئية، الالتزامات الامتثالية، الأهداف البيئية)') : 'التخطيط (تحديد الجوانب البيئية، الالتزامات الامتثالية، الأهداف البيئية)'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.el4', 'الدعم (الموارد، الكفاءة، الوعي، الاتصال، المعلومات الموثقة)') : 'الدعم (الموارد، الكفاءة، الوعي، الاتصال، المعلومات الموثقة)'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.el5', 'التشغيل (التخطيط والتحكم التشغيلي، الاستعداد للطوارئ والاستجابة لها)') : 'التشغيل (التخطيط والتحكم التشغيلي، الاستعداد للطوارئ والاستجابة لها)'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.el6', 'تقييم الأداء (المراقبة والقياس، تقييم الامتثال، التدقيق الداخلي، مراجعة الإدارة)') : 'تقييم الأداء (المراقبة والقياس، تقييم الامتثال، التدقيق الداخلي، مراجعة الإدارة)'}</li>
                            <li>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.el7', 'التحسين (عدم المطابقة والإجراءات التصحيحية، التحسين المستمر)') : 'التحسين (عدم المطابقة والإجراءات التصحيحية، التحسين المستمر)'}</li>
                        </ul>
                        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-green-50 border border-green-200 rounded p-4">
                                <h4 class="font-semibold text-green-800 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.aspectsTitle', 'الجوانب البيئية') : 'الجوانب البيئية'} (${aspects.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.aspectsDesc', 'إدارة الجوانب البيئية وتأثيراتها') : 'إدارة الجوانب البيئية وتأثيراتها'}</p>
                                <button class="btn-secondary w-full" onclick="ISO.showEnvironmentalAspectsForm()">
                                    <i class="fas fa-globe ml-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.manageAspectsBtn', 'إدارة الجوانب البيئية') : 'إدارة الجوانب البيئية'}
                                </button>
                            </div>
                            <div class="bg-blue-50 border border-blue-200 rounded p-4">
                                <h4 class="font-semibold text-blue-800 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.monitoringTitle', 'المراقبة البيئية') : 'المراقبة البيئية'} (${monitoring.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.monitoringDesc', 'تتبع ومراقبة الأداء البيئي') : 'تتبع ومراقبة الأداء البيئي'}</p>
                                <button class="btn-secondary w-full" onclick="ISO.showEnvironmentalMonitoringForm()">
                                    <i class="fas fa-chart-line ml-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.iso14001.manageMonitoringBtn', 'المراقبة البيئية') : 'المراقبة البيئية'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async renderAudit() {
        const audits = AppState.appData.hseAudits || [];
        const nonConformities = AppState.appData.hseNonConformities || [];
        const actions = AppState.appData.hseCorrectiveActions || [];

        return `
            <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                        <i class="fas fa-search-plus text-blue-600 ml-3"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.headerTitle', 'مركز التدقيق والمراجعة (Audits & CAPA)') : 'مركز التدقيق والمراجعة (Audits & CAPA)'}
                    </h2>
                    <p class="text-sm text-gray-500 mt-1">${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.headerDesc', 'إدارة عمليات التدقيق الداخلي والخارجي ومتابعة حالات عدم المطابقة والإجراءات التصحيحية') : 'إدارة عمليات التدقيق الداخلي والخارجي ومتابعة حالات عدم المطابقة والإجراءات التصحيحية'}</p>
                </div>
                <div class="flex gap-2">
                    <button class="btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all" onclick="ISO.showAuditForm()">
                        <i class="fas fa-plus text-blue-600"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.addAuditBtn', 'جدولة تدقيق') : 'جدولة تدقيق'}
                    </button>
                    <button class="btn bg-blue-600 text-white hover:bg-blue-700 border-0 shadow-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all" onclick="ISO.showNonConformityForm()">
                        <i class="fas fa-exclamation-triangle"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.addNcBtn', 'تسجيل حالة عدم مطابقة') : 'تسجيل حالة عدم مطابقة'}
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Audits Card -->
                <div class="content-card shadow-lg border-0 rounded-2xl overflow-hidden bg-white flex flex-col">
                    <div class="card-header bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border-b border-blue-100 flex items-center justify-between">
                        <h3 class="text-lg font-bold text-blue-900 m-0 flex items-center">
                            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center ml-2">
                                <i class="fas fa-clipboard-check"></i>
                            </div>
                            ${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.auditLogTitle', 'سجل عمليات التدقيق') : 'سجل عمليات التدقيق'}
                        </h3>
                        <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">${audits.length}</span>
                    </div>
                    <div class="card-body p-0 flex-1 overflow-y-auto" style="max-height: 500px;">
                        ${audits.length === 0 ? `
                            <div class="p-12 text-center flex flex-col items-center justify-center h-full">
                                <div class="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-3"><i class="fas fa-clipboard text-2xl"></i></div>
                                <h4 class="text-gray-600 font-bold mb-1">${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.noAudits', 'لا توجد سجلات تدقيق') : 'لا توجد سجلات تدقيق'}</h4>
                                <p class="text-gray-400 text-xs">قم بجدولة أول عملية تدقيق لتقييم النظام</p>
                            </div>
                        ` : `
                            <div class="divide-y divide-gray-100">
                                ${audits.map(audit => {
                                    const isCompleted = audit.status === 'مكتمل' || audit.status === 'Completed';
                                    const isScheduled = audit.status === 'مجدول' || audit.status === 'Scheduled';
                                    
                                    let statusColor = isCompleted ? 'green' : (isScheduled ? 'blue' : 'amber');
                                    let typeIcon = audit.type?.includes('خارجي') || audit.type?.includes('External') ? 'fa-building' : 'fa-users-cog';
                                    
                                    return `
                                    <div class="p-4 hover:bg-gray-50 transition-colors flex items-start justify-between group">
                                        <div class="flex items-start gap-4">
                                            <div class="mt-1 w-10 h-10 rounded-xl bg-${statusColor}-50 text-${statusColor}-600 flex items-center justify-center border border-${statusColor}-100">
                                                <i class="fas ${isCompleted ? 'fa-check' : 'fa-calendar-alt'}"></i>
                                            </div>
                                            <div>
                                                <div class="flex items-center gap-2 mb-1">
                                                    <h4 class="font-bold text-gray-800 text-sm m-0">${Utils.escapeHTML(audit.type)}</h4>
                                                    <span class="bg-${statusColor}-100 text-${statusColor}-800 text-[10px] font-bold px-2 py-0.5 rounded border border-${statusColor}-200">${audit.status}</span>
                                                </div>
                                                <div class="text-xs text-gray-500 flex items-center gap-3">
                                                    <span title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.auditCard.date', 'تاريخ التدقيق') : 'تاريخ التدقيق'}"><i class="far fa-calendar ml-1"></i>${Utils.formatDate(audit.date)}</span>
                                                    <span title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.auditCard.auditor', 'المدقق') : 'المدقق'}"><i class="fas fa-user-tie ml-1"></i>${Utils.escapeHTML(audit.auditor)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button onclick="ISO.viewAudit('${audit.id}')" class="text-gray-400 hover:text-blue-600 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 w-8 h-8 rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100" title="التفاصيل">
                                            <i class="fas fa-chevron-left text-xs"></i>
                                        </button>
                                    </div>
                                    `;
                                }).join('')}
                            </div>
                        `}
                    </div>
                </div>
                
                <!-- CAPA Card -->
                <div class="content-card shadow-lg border-0 rounded-2xl overflow-hidden bg-white flex flex-col">
                    <div class="card-header bg-gradient-to-r from-red-50 to-orange-50 p-5 border-b border-red-100 flex items-center justify-between">
                        <h3 class="text-lg font-bold text-red-900 m-0 flex items-center">
                            <div class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center ml-2">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            ${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.capaTitle', 'سجل CAPA') : 'سجل CAPA'}
                        </h3>
                        <div class="flex gap-1">
                            <span class="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-1 rounded-md border border-red-200" title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.capaCard.ncType', 'حالات عدم مطابقة') : 'حالات عدم مطابقة'}">${nonConformities.length} NC</span>
                            <span class="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-1 rounded-md border border-orange-200" title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.capaCard.caType', 'إجراءات تصحيحية') : 'إجراءات تصحيحية'}">${actions.length} CA</span>
                        </div>
                    </div>
                    <div class="card-body p-0 flex-1 overflow-y-auto bg-gray-50/30" style="max-height: 500px;">
                        ${nonConformities.length === 0 && actions.length === 0 ? `
                            <div class="p-12 text-center flex flex-col items-center justify-center h-full">
                                <div class="w-16 h-16 bg-green-50 text-green-400 rounded-full flex items-center justify-center mb-3"><i class="fas fa-shield-alt text-2xl"></i></div>
                                <h4 class="text-gray-600 font-bold mb-1">${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.noCapa', 'لا توجد سجلات عدم مطابقة أو إجراءات تصحيحية') : 'لا توجد سجلات عدم مطابقة أو إجراءات تصحيحية'}</h4>
                                <p class="text-gray-400 text-xs">نظام الجودة يعمل بشكل مثالي دون ملاحظات.</p>
                            </div>
                        ` : `
                            <div class="p-4">
                                <!-- Non-Conformities Section -->
                                ${nonConformities.length > 0 ? `
                                    <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                                        <i class="fas fa-bug text-red-400"></i> ${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.capaCard.ncType', 'حالات عدم مطابقة (NC)') : 'حالات عدم مطابقة (NC)'}
                                    </h4>
                                    <div class="space-y-3 mb-6">
                                        ${nonConformities.map(nc => {
                                            const isClosed = nc.status === 'مغلق' || nc.status === 'Closed';
                                            return `
                                                <div class="bg-white border ${isClosed ? 'border-gray-200' : 'border-red-200 shadow-sm'} rounded-xl p-3 hover:border-red-300 transition-colors cursor-pointer group" onclick="ISO.viewNonConformity('${nc.id}')">
                                                    <div class="flex justify-between items-start mb-2">
                                                        <span class="text-xs font-bold ${isClosed ? 'text-gray-500 bg-gray-100' : 'text-red-700 bg-red-100'} px-2 py-0.5 rounded border ${isClosed ? 'border-gray-200' : 'border-red-200'}">${nc.status}</span>
                                                        <span class="text-[10px] text-gray-400"><i class="far fa-clock ml-1"></i>${Utils.formatDate(nc.date)}</span>
                                                    </div>
                                                    <p class="text-sm text-gray-800 font-medium line-clamp-2 leading-snug">${Utils.escapeHTML(nc.description)}</p>
                                                    <div class="mt-2 text-[10px] text-gray-500 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span class="text-blue-600">عرض التفاصيل &larr;</span>
                                                    </div>
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>
                                ` : ''}

                                <!-- Corrective Actions Section -->
                                ${actions.length > 0 ? `
                                    <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                                        <i class="fas fa-tools text-orange-400"></i> ${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.capaCard.caType', 'الإجراءات التصحيحية (CA)') : 'الإجراءات التصحيحية (CA)'}
                                    </h4>
                                    <div class="space-y-3">
                                        ${actions.map(action => {
                                            const isCompleted = action.status === 'مكتمل' || action.status === 'Completed';
                                            const dueDateObj = new Date(action.dueDate);
                                            const isOverdue = !isCompleted && dueDateObj < new Date();
                                            
                                            return `
                                                <div class="bg-white border ${isCompleted ? 'border-gray-200' : (isOverdue ? 'border-red-300 shadow-sm' : 'border-orange-200 shadow-sm')} rounded-xl p-3 hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden" onclick="ISO.viewCorrectiveAction('${action.id}')">
                                                    ${isOverdue ? '<div class="absolute top-0 right-0 w-1 h-full bg-red-500"></div>' : ''}
                                                    <div class="flex justify-between items-start mb-2">
                                                        <span class="text-xs font-bold ${isCompleted ? 'text-green-700 bg-green-100 border-green-200' : 'text-orange-700 bg-orange-100 border-orange-200'} px-2 py-0.5 rounded border">${action.status}</span>
                                                        <span class="text-[10px] ${isOverdue ? 'text-red-600 font-bold' : 'text-gray-500'}"><i class="far fa-calendar-times ml-1"></i>تاريخ الاستحقاق: ${Utils.formatDate(action.dueDate)}</span>
                                                    </div>
                                                    <p class="text-sm text-gray-800 line-clamp-2 leading-snug mb-2">${Utils.escapeHTML(action.description)}</p>
                                                    <div class="flex items-center gap-1.5 text-xs bg-gray-50 w-fit px-2 py-1 rounded text-gray-600 border border-gray-100">
                                                        <i class="fas fa-user-hard-hat text-gray-400"></i>
                                                        <span class="font-medium">${Utils.escapeHTML(action.responsible)}</span>
                                                    </div>
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    },

    async showHSEObjectiveForm(data = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.objectives.editTitle', 'تعديل هدف') : 'تعديل هدف') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.objectives.addTitle', 'إضافة هدف HSE جديد') : 'إضافة هدف HSE جديد')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="hse-objective-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.objectives.form.nameLabel', 'الهدف *') : 'الهدف *'}</label>
                            <input type="text" id="objective-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.name || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.objectives.form.namePlaceholder', 'مثال: تقليل الإصابات بنسبة 20%') : 'مثال: تقليل الإصابات بنسبة 20%'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.objectives.form.descLabel', 'الوصف *') : 'الوصف *'}</label>
                            <textarea id="objective-description" required class="form-input" rows="4" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.objectives.form.descPlaceholder', 'وصف تفصيلي للهدف') : 'وصف تفصيلي للهدف'}">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.objectives.form.dueDateLabel', 'تاريخ الانتهاء *') : 'تاريخ الانتهاء *'}</label>
                            <input type="date" id="objective-due-date" required class="form-input" 
                                value="${data?.dueDate ? new Date(data.dueDate).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.objectives.form.respLabel', 'المسؤول *') : 'المسؤول *'}</label>
                            <input type="text" id="objective-responsible" required class="form-input" 
                                value="${Utils.escapeHTML(data?.responsible || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.objectives.form.respPlaceholder', 'اسم المسؤول') : 'اسم المسؤول'}">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.cancel', 'إلغاء') : 'إلغاء'}</button>
                    <button type="button" id="save-objective-btn" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.save', 'حفظ') : 'حفظ'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const saveBtn = modal.querySelector('#save-objective-btn');
        saveBtn.addEventListener('click', () => this.handleHSEObjectiveSubmit(data?.id, modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async handleHSEObjectiveSubmit(editId = null, modal) {
        // فحص العناصر قبل الاستخدام
        const nameEl = document.getElementById('objective-name');
        const descriptionEl = document.getElementById('objective-description');
        const dueDateEl = document.getElementById('objective-due-date');
        const responsibleEl = document.getElementById('objective-responsible');
        
        if (!nameEl || !descriptionEl || !dueDateEl || !responsibleEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            return;
        }

        const formData = {
            id: editId || Utils.generateId('HSE_OBJ'),
            name: nameEl.value.trim(),
            description: descriptionEl.value.trim(),
            dueDate: new Date(dueDateEl.value).toISOString(),
            responsible: responsibleEl.value.trim(),
            status: editId ? AppState.appData.hseObjectives.find(o => o.id === editId)?.status || 'قيد التنيذ' : 'قيد التنيذ',
            createdAt: editId ? AppState.appData.hseObjectives.find(o => o.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (!AppState.appData.hseObjectives) {
            AppState.appData.hseObjectives = [];
        }

        Loading.show();
        try {
            if (editId) {
                const index = AppState.appData.hseObjectives.findIndex(o => o.id === editId);
                if (index !== -1) AppState.appData.hseObjectives[index] = formData;
                Notification.success('تم تحديث الهد بنجاح');
                // للتحديث: حفظ كامل البيانات
                // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
                await GoogleIntegration.autoSave('HSEObjectives', AppState.appData.hseObjectives);
            } else {
                AppState.appData.hseObjectives.push(formData);
                Notification.success('تم إضافة الهد بنجاح');
                // للإضافة: حفظ محلي ثم إرسال مباشر إلى الخلفية
                // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

                // إرسال مباشر إلى الخلفية للسجل الجديد
                if (AppState.googleConfig.appsScript.enabled && AppState.googleConfig.appsScript.scriptUrl) {
                    try {
                        await GoogleIntegration.sendToAppsScript('addHSEObjective', formData);
                        Utils.safeLog('✅ تم حفظ الهدف مباشرة في الخلفية');
                    } catch (error) {
                        Utils.safeWarn('⚠ فشل الحفظ المباشر، سيتم المزامنة لاحقاً:', error);
                        // في حالة الفشل، نستخدم autoSave كبديل
                        await GoogleIntegration.autoSave('HSEObjectives', AppState.appData.hseObjectives);
                    }
                } else {
                    // إذا لم يكن Google Apps Script مفعّل، نستخدم autoSave فقط
                    await GoogleIntegration.autoSave('HSEObjectives', AppState.appData.hseObjectives);
                }
            }

            Loading.hide();
            modal.remove();
            this.load();
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    async showHSERiskAssessmentForm(data = null) {
        Notification.info(typeof I18n !== 'undefined' ? I18n.t('module.iso.risks.comingSoon', 'سيتم إضافة نموذج تقييم المخاطر HSE قريباً') : 'سيتم إضافة نموذج تقييم المخاطر HSE قريباً');
    },

    async showEnvironmentalAspectsForm(data = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.aspects.editTitle', 'تعديل جانب بيئي') : 'تعديل جانب بيئي') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.aspects.addTitle', 'إضافة جانب بيئي جديد') : 'إضافة جانب بيئي جديد')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="environmental-aspect-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.aspects.form.nameLabel', 'اسم الجانب البيئي *') : 'اسم الجانب البيئي *'}</label>
                            <input type="text" id="aspect-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.name || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.aspects.form.namePlaceholder', 'مثال: استهلاك المياه') : 'مثال: استهلاك المياه'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.aspects.form.descLabel', 'الوصف *') : 'الوصف *'}</label>
                            <textarea id="aspect-description" required class="form-input" rows="4" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.aspects.form.descPlaceholder', 'وصف تفصيلي للجانب البيئي') : 'وصف تفصيلي للجانب البيئي'}">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.aspects.form.impactLabel', 'التأثير *') : 'التأثير *'}</label>
                            <select id="aspect-impact" required class="form-input">
                                <option value="">${typeof I18n !== 'undefined' ? I18n.t('module.iso.aspects.form.selectImpactOption', 'اختر التأثير') : 'اختر التأثير'}</option>
                                <option value="منخض" ${data?.impact === 'منخض' || data?.impact === 'منخفض' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.aspects.form.impactLow', 'منخفض') : 'منخفض'}</option>
                                <option value="متوسط" ${data?.impact === 'متوسط' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.aspects.form.impactMedium', 'متوسط') : 'متوسط'}</option>
                                <option value="عالي" ${data?.impact === 'عالي' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.aspects.form.impactHigh', 'عالي') : 'عالي'}</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.cancel', 'إلغاء') : 'إلغاء'}</button>
                    <button type="button" id="save-aspect-btn" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.save', 'حفظ') : 'حفظ'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const saveBtn = modal.querySelector('#save-aspect-btn');
        saveBtn.addEventListener('click', () => this.handleEnvironmentalAspectsSubmit(data?.id, modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async handleEnvironmentalAspectsSubmit(editId = null, modal) {
        // فحص العناصر قبل الاستخدام
        const nameEl = document.getElementById('aspect-name');
        const descriptionEl = document.getElementById('aspect-description');
        const impactEl = document.getElementById('aspect-impact');
        
        if (!nameEl || !descriptionEl || !impactEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            return;
        }

        const formData = {
            id: editId || Utils.generateId('ENV_ASP'),
            name: nameEl.value.trim(),
            description: descriptionEl.value.trim(),
            impact: impactEl.value,
            createdAt: editId ? AppState.appData.environmentalAspects.find(a => a.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (!AppState.appData.environmentalAspects) {
            AppState.appData.environmentalAspects = [];
        }

        Loading.show();
        try {
            if (editId) {
                const index = AppState.appData.environmentalAspects.findIndex(a => a.id === editId);
                if (index !== -1) AppState.appData.environmentalAspects[index] = formData;
                Notification.success('تم تحديث الجانب البيئي بنجاح');
                // للتحديث: حفظ كامل البيانات
                // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
                await GoogleIntegration.autoSave('EnvironmentalAspects', AppState.appData.environmentalAspects);
            } else {
                AppState.appData.environmentalAspects.push(formData);
                Notification.success('تم إضافة الجانب البيئي بنجاح');
                // للإضافة: حفظ محلي ثم إرسال مباشر إلى الخلفية
                // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

                // إرسال مباشر إلى الخلفية للسجل الجديد
                if (AppState.googleConfig.appsScript.enabled && AppState.googleConfig.appsScript.scriptUrl) {
                    try {
                        await GoogleIntegration.sendToAppsScript('addEnvironmentalAspect', formData);
                        Utils.safeLog('✅ تم حفظ الجانب البيئي مباشرة في الخلفية');
                    } catch (error) {
                        Utils.safeWarn('⚠ فشل الحفظ المباشر، سيتم المزامنة لاحقاً:', error);
                        // في حالة الفشل، نستخدم autoSave كبديل
                        await GoogleIntegration.autoSave('EnvironmentalAspects', AppState.appData.environmentalAspects);
                    }
                } else {
                    // إذا لم يكن Google Apps Script مفعّل، نستخدم autoSave فقط
                    await GoogleIntegration.autoSave('EnvironmentalAspects', AppState.appData.environmentalAspects);
                }
            }

            Loading.hide();
            modal.remove();
            this.load();
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    async showEnvironmentalMonitoringForm(data = null) {
        Notification.info(typeof I18n !== 'undefined' ? I18n.t('module.iso.monitoring.comingSoon', 'سيتم إضافة نموذج المراقبة البيئية قريباً') : 'سيتم إضافة نموذج المراقبة البيئية قريباً');
    },

    async showAuditForm(data = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.editTitle', 'تعديل تدقيق') : 'تعديل تدقيق') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.addTitle', 'إضافة تدقيق جديد') : 'إضافة تدقيق جديد')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="audit-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.typeLabel', 'نوع التدقيق *') : 'نوع التدقيق *'}</label>
                            <select id="audit-type" required class="form-input">
                                <option value="">${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.selectTypeOption', 'اختر النوع') : 'اختر النوع'}</option>
                                <option value="تدقيق داخلي" ${data?.type === 'تدقيق داخلي' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.typeInternal', 'تدقيق داخلي') : 'تدقيق داخلي'}</option>
                                <option value="تدقيق خارجي" ${data?.type === 'تدقيق خارجي' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.typeExternal', 'تدقيق خارجي') : 'تدقيق خارجي'}</option>
                                <option value="مراجعة إدارة" ${data?.type === 'مراجعة إدارة' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.typeManagementReview', 'مراجعة إدارة') : 'مراجعة إدارة'}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.dateLabel', 'تاريخ التدقيق *') : 'تاريخ التدقيق *'}</label>
                            <input type="date" id="audit-date" required class="form-input" 
                                value="${data?.date ? new Date(data.date).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.auditorLabel', 'المدقق *') : 'المدقق *'}</label>
                            <input type="text" id="audit-auditor" required class="form-input" 
                                value="${Utils.escapeHTML(data?.auditor || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.auditorPlaceholder', 'اسم المدقق') : 'اسم المدقق'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.statusLabel', 'الحالة *') : 'الحالة *'}</label>
                            <select id="audit-status" required class="form-input">
                                <option value="مخطط" ${data?.status === 'مخطط' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.statusPlanned', 'مخطط') : 'مخطط'}</option>
                                <option value="قيد التنيذ" ${data?.status === 'قيد التنيذ' || data?.status === 'قيد التنفيذ' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.statusInProgress', 'قيد التنفيذ') : 'قيد التنفيذ'}</option>
                                <option value="مكتمل" ${data?.status === 'مكتمل' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.statusCompleted', 'مكتمل') : 'مكتمل'}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.descLabel', 'الوصف') : 'الوصف'}</label>
                            <textarea id="audit-description" class="form-input" rows="4" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.form.descPlaceholder', 'وصف تفصيلي للتدقيق') : 'وصف تفصيلي للتدقيق'}">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.cancel', 'إلغاء') : 'إلغاء'}</button>
                    <button type="button" id="save-audit-btn" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.save', 'حفظ') : 'حفظ'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const saveBtn = modal.querySelector('#save-audit-btn');
        saveBtn.addEventListener('click', () => this.handleAuditSubmit(data?.id, modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async handleAuditSubmit(editId = null, modal) {
        // فحص العناصر قبل الاستخدام
        const typeEl = document.getElementById('audit-type');
        const dateEl = document.getElementById('audit-date');
        const auditorEl = document.getElementById('audit-auditor');
        const statusEl = document.getElementById('audit-status');
        const descriptionEl = document.getElementById('audit-description');
        
        if (!typeEl || !dateEl || !auditorEl || !statusEl || !descriptionEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            return;
        }

        const formData = {
            id: editId || Utils.generateId('HSE_AUDIT'),
            type: typeEl.value,
            date: new Date(dateEl.value).toISOString(),
            auditor: auditorEl.value.trim(),
            status: statusEl.value,
            description: descriptionEl.value.trim(),
            createdAt: editId ? AppState.appData.hseAudits.find(a => a.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (!AppState.appData.hseAudits) {
            AppState.appData.hseAudits = [];
        }

        Loading.show();
        try {
            if (editId) {
                const index = AppState.appData.hseAudits.findIndex(a => a.id === editId);
                if (index !== -1) AppState.appData.hseAudits[index] = formData;
                Notification.success('تم تحديث التدقيق بنجاح');
                // للتحديث: حفظ كامل البيانات
                // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
                await GoogleIntegration.autoSave('HSEAudits', AppState.appData.hseAudits);
            } else {
                AppState.appData.hseAudits.push(formData);
                Notification.success('تم إضافة التدقيق بنجاح');
                // للإضافة: حفظ محلي ثم إرسال مباشر إلى الخلفية
                // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

                // إرسال مباشر إلى الخلفية للسجل الجديد
                if (AppState.googleConfig.appsScript.enabled && AppState.googleConfig.appsScript.scriptUrl) {
                    try {
                        await GoogleIntegration.sendToAppsScript('addHSEAudit', formData);
                        Utils.safeLog('✅ تم حفظ التدقيق مباشرة في الخلفية');
                    } catch (error) {
                        Utils.safeWarn('⚠ فشل الحفظ المباشر، سيتم المزامنة لاحقاً:', error);
                        // في حالة الفشل، نستخدم autoSave كبديل
                        await GoogleIntegration.autoSave('HSEAudits', AppState.appData.hseAudits);
                    }
                } else {
                    // إذا لم يكن Google Apps Script مفعّل، نستخدم autoSave فقط
                    await GoogleIntegration.autoSave('HSEAudits', AppState.appData.hseAudits);
                }
            }

            Loading.hide();
            modal.remove();
            this.load();
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    async viewAudit(id) {
        const audit = AppState.appData.hseAudits.find(a => a.id === id);
        if (!audit) {
            Notification.error(typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.notFound', 'التدقيق غير موجود') : 'التدقيق غير موجود');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.detailsTitle', 'تفاصيل التدقيق') : 'تفاصيل التدقيق'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.table.type', 'النوع:') : 'النوع:'}</strong> ${Utils.escapeHTML(audit.type)}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.table.date', 'التاريخ:') : 'التاريخ:'}</strong> ${Utils.formatDate(audit.date)}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.table.auditor', 'المدقق:') : 'المدقق:'}</strong> ${Utils.escapeHTML(audit.auditor)}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.table.status', 'الحالة:') : 'الحالة:'}</strong> <span class="badge badge-${audit.status === 'مكتمل' ? 'success' : 'warning'}">${audit.status}</span></div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.audit.table.desc', 'الوصف:') : 'الوصف:'}</strong> ${Utils.escapeHTML(audit.description || '-')}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.close', 'إغلاق') : 'إغلاق'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async showNonConformityForm(data = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.editTitle', 'تعديل عدم مطابقة') : 'تعديل عدم مطابقة') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.addTitle', 'إضافة عدم مطابقة جديدة') : 'إضافة عدم مطابقة جديدة')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="non-conformity-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.form.date', 'تاريخ عدم المطابقة *') : 'تاريخ عدم المطابقة *'}</label>
                            <input type="date" id="nc-date" required class="form-input" 
                                value="${data?.date ? new Date(data.date).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.form.desc', 'الوصف *') : 'الوصف *'}</label>
                            <textarea id="nc-description" required class="form-input" rows="4" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.form.descPlaceholder', 'وصف تفصيلي لعدم المطابقة') : 'وصف تفصيلي لعدم المطابقة'}">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.form.status', 'الحالة *') : 'الحالة *'}</label>
                            <select id="nc-status" required class="form-input">
                                <option value="متوحة" ${data?.status === 'متوحة' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.form.statusOpen', 'متوحة') : 'متوحة'}</option>
                                <option value="قيد المعالجة" ${data?.status === 'قيد المعالجة' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.form.statusInProgress', 'قيد المعالجة') : 'قيد المعالجة'}</option>
                                <option value="مغلق" ${data?.status === 'مغلق' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.form.statusClosed', 'مغلق') : 'مغلق'}</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.cancel', 'إلغاء') : 'إلغاء'}</button>
                    <button type="button" id="save-nc-btn" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.save', 'حفظ') : 'حفظ'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const saveBtn = modal.querySelector('#save-nc-btn');
        saveBtn.addEventListener('click', () => this.handleNonConformitySubmit(data?.id, modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async handleNonConformitySubmit(editId = null, modal) {
        // فحص العناصر قبل الاستخدام
        const dateEl = document.getElementById('nc-date');
        const descriptionEl = document.getElementById('nc-description');
        const statusEl = document.getElementById('nc-status');
        
        if (!dateEl || !descriptionEl || !statusEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            return;
        }

        const formData = {
            id: editId || Utils.generateId('HSE_NC'),
            date: new Date(dateEl.value).toISOString(),
            description: descriptionEl.value.trim(),
            status: statusEl.value,
            createdAt: editId ? AppState.appData.hseNonConformities.find(nc => nc.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (!AppState.appData.hseNonConformities) {
            AppState.appData.hseNonConformities = [];
        }

        Loading.show();
        try {
            if (editId) {
                const index = AppState.appData.hseNonConformities.findIndex(nc => nc.id === editId);
                if (index !== -1) AppState.appData.hseNonConformities[index] = formData;
                Notification.success('تم تحديث عدم المطابقة بنجاح');
                // للتحديث: حفظ كامل البيانات
                // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
                await GoogleIntegration.autoSave('HSENonConformities', AppState.appData.hseNonConformities);
            } else {
                AppState.appData.hseNonConformities.push(formData);
                Notification.success('تم إضافة عدم المطابقة بنجاح');
                // للإضافة: حفظ محلي ثم إرسال مباشر إلى الخلفية
                // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

                // إرسال مباشر إلى الخلفية للسجل الجديد
                if (AppState.googleConfig.appsScript.enabled && AppState.googleConfig.appsScript.scriptUrl) {
                    try {
                        await GoogleIntegration.sendToAppsScript('addHSENonConformity', formData);
                        Utils.safeLog('✅ تم حفظ عدم المطابقة مباشرة في الخلفية');
                    } catch (error) {
                        Utils.safeWarn('⚠ فشل الحفظ المباشر، سيتم المزامنة لاحقاً:', error);
                        // في حالة الفشل، نستخدم autoSave كبديل
                        await GoogleIntegration.autoSave('HSENonConformities', AppState.appData.hseNonConformities);
                    }
                } else {
                    // إذا لم يكن Google Apps Script مفعّل، نستخدم autoSave فقط
                    await GoogleIntegration.autoSave('HSENonConformities', AppState.appData.hseNonConformities);
                }
            }

            Loading.hide();
            modal.remove();
            this.load();
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    async viewNonConformity(id) {
        const nc = AppState.appData.hseNonConformities.find(n => n.id === id);
        if (!nc) {
            Notification.error('عدم المطابقة غير موجودة');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.detailsTitle', 'تفاصيل عدم المطابقة') : 'تفاصيل عدم المطابقة'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.table.date', 'التاريخ:') : 'التاريخ:'}</strong> ${Utils.formatDate(nc.date)}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.table.desc', 'الوصف:') : 'الوصف:'}</strong> ${Utils.escapeHTML(nc.description)}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.nc.table.status', 'الحالة:') : 'الحالة:'}</strong> <span class="badge badge-${nc.status === 'مغلق' ? 'success' : 'danger'}">${nc.status}</span></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.close', 'إغلاق') : 'إغلاق'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async showCorrectiveActionForm(data = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.editTitle', 'تعديل إجراء تصحيحي') : 'تعديل إجراء تصحيحي') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.addTitle', 'إضافة إجراء تصحيحي جديد') : 'إضافة إجراء تصحيحي جديد')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="corrective-action-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.form.desc', 'الوصف *') : 'الوصف *'}</label>
                            <textarea id="ca-description" required class="form-input" rows="4" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.form.descPlaceholder', 'وصف تفصيلي للإجراء التصحيحي') : 'وصف تفصيلي للإجراء التصحيحي'}">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.form.responsible', 'المسؤول *') : 'المسؤول *'}</label>
                            <input type="text" id="ca-responsible" required class="form-input" 
                                value="${Utils.escapeHTML(data?.responsible || '')}" placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.form.respPlaceholder', 'اسم المسؤول') : 'اسم المسؤول'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.form.dueDate', 'تاريخ الانتهاء *') : 'تاريخ الانتهاء *'}</label>
                            <input type="date" id="ca-due-date" required class="form-input" 
                                value="${data?.dueDate ? new Date(data.dueDate).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.form.status', 'الحالة *') : 'الحالة *'}</label>
                            <select id="ca-status" required class="form-input">
                                <option value="قيد التنفيذ" ${data?.status === 'قيد التنيذ' || data?.status === 'قيد التنفيذ' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.form.statusInProgress', 'قيد التنفيذ') : 'قيد التنفيذ'}</option>
                                <option value="مكتمل" ${data?.status === 'مكتمل' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.form.statusCompleted', 'مكتمل') : 'مكتمل'}</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.cancel', 'إلغاء') : 'إلغاء'}</button>
                    <button type="button" id="save-ca-btn" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.save', 'حفظ') : 'حفظ'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const saveBtn = modal.querySelector('#save-ca-btn');
        saveBtn.addEventListener('click', () => this.handleCorrectiveActionSubmit(data?.id, modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async handleCorrectiveActionSubmit(editId = null, modal) {
        // فحص العناصر قبل الاستخدام
        const descriptionEl = document.getElementById('ca-description');
        const responsibleEl = document.getElementById('ca-responsible');
        const dueDateEl = document.getElementById('ca-due-date');
        const statusEl = document.getElementById('ca-status');
        
        if (!descriptionEl || !responsibleEl || !dueDateEl || !statusEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            return;
        }

        const formData = {
            id: editId || Utils.generateId('HSE_CA'),
            description: descriptionEl.value.trim(),
            responsible: responsibleEl.value.trim(),
            dueDate: new Date(dueDateEl.value).toISOString(),
            status: statusEl.value,
            createdAt: editId ? AppState.appData.hseCorrectiveActions.find(ca => ca.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (!AppState.appData.hseCorrectiveActions) {
            AppState.appData.hseCorrectiveActions = [];
        }

        Loading.show();
        try {
            if (editId) {
                const index = AppState.appData.hseCorrectiveActions.findIndex(ca => ca.id === editId);
                if (index !== -1) AppState.appData.hseCorrectiveActions[index] = formData;
                Notification.success('تم تحديث الإجراء التصحيحي بنجاح');
                // للتحديث: حفظ كامل البيانات
                // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
                await GoogleIntegration.autoSave('HSECorrectiveActions', AppState.appData.hseCorrectiveActions);
            } else {
                AppState.appData.hseCorrectiveActions.push(formData);
                Notification.success('تم إضافة الإجراء التصحيحي بنجاح');
                // للإضافة: حفظ محلي ثم إرسال مباشر إلى الخلفية
                // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

                // إرسال مباشر إلى الخلفية للسجل الجديد
                if (AppState.googleConfig.appsScript.enabled && AppState.googleConfig.appsScript.scriptUrl) {
                    try {
                        await GoogleIntegration.sendToAppsScript('addHSECorrectiveAction', formData);
                        Utils.safeLog('✅ تم حفظ الإجراء التصحيحي مباشرة في الخلفية');
                    } catch (error) {
                        Utils.safeWarn('⚠ فشل الحفظ المباشر، سيتم المزامنة لاحقاً:', error);
                        // في حالة الفشل، نستخدم autoSave كبديل
                        await GoogleIntegration.autoSave('HSECorrectiveActions', AppState.appData.hseCorrectiveActions);
                    }
                } else {
                    // إذا لم يكن Google Apps Script مفعّل، نستخدم autoSave فقط
                    await GoogleIntegration.autoSave('HSECorrectiveActions', AppState.appData.hseCorrectiveActions);
                }
            }

            Loading.hide();
            modal.remove();
            this.load();
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    async viewCorrectiveAction(id) {
        const ca = AppState.appData.hseCorrectiveActions.find(c => c.id === id);
        if (!ca) {
            Notification.error('الإجراء التصحيحي غير موجود');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.detailsTitle', 'تفاصيل الإجراء التصحيحي') : 'تفاصيل الإجراء التصحيحي'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.table.desc', 'الوصف:') : 'الوصف:'}</strong> ${Utils.escapeHTML(ca.description)}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.table.responsible', 'المسؤول:') : 'المسؤول:'}</strong> ${Utils.escapeHTML(ca.responsible)}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.table.dueDate', 'تاريخ الانتهاء:') : 'تاريخ الانتهاء:'}</strong> ${Utils.formatDate(ca.dueDate)}</div>
                        <div><strong>${typeof I18n !== 'undefined' ? I18n.t('module.iso.ca.table.status', 'الحالة:') : 'الحالة:'}</strong> <span class="badge badge-${ca.status === 'مكتمل' ? 'success' : 'warning'}">${ca.status}</span></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.close', 'إغلاق') : 'إغلاق'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    // ===== مركز التكويد والإصدار (Document Coding & Issuing Center) =====
    renderSystemFormsDirectory(documentCodes, documentVersions) {
        if (!this.SystemFormsManifest || this.SystemFormsManifest.length === 0) return '';
        
        // Group forms by module
        const groupedForms = this.SystemFormsManifest.reduce((acc, form) => {
            if (!acc[form.module]) {
                acc[form.module] = [];
            }
            acc[form.module].push(form);
            return acc;
        }, {});

        const modulesHtml = Object.keys(groupedForms).map(moduleName => {
            const forms = groupedForms[moduleName];
            
            return `
            <div class="mb-5">
                <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-4" style="border-color: #3b82f6 !important; border-bottom-width: 2px !important;">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fas fa-folder-open text-primary fs-5"></i>
                        <h4 class="font-bold text-gray-800 m-0">
                            ${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.moduleName.' + moduleName.replace(/[^a-zA-Z0-9]/g, ''), moduleName) : moduleName}
                        </h4>
                    </div>
                    <span class="badge bg-secondary rounded-pill shadow-sm">${forms.length}</span>
                </div>
                
                <div class="row g-4 mb-4">
                    ${forms.map(form => {
                        const matchedCode = documentCodes.find(c => c.code === form.defaultCode || c.documentName === form.name);
                        let activeVersion = null;
                        if (matchedCode) {
                            const versions = documentVersions.filter(v => v.documentCodeId === matchedCode.id && (v.isActive === true || v.isActive === 'true'));
                            if (versions.length > 0) {
                                versions.sort((a, b) => new Date(b.issueDate || 0) - new Date(a.issueDate || 0));
                                activeVersion = versions[0];
                            }
                        }
                        
                        return `
                        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                            <div class="card h-100 border-0 shadow-sm hover-shadow transition-all relative overflow-hidden">
                                <!-- Indicator -->
                                <div class="position-absolute top-0 bottom-0 ${matchedCode ? 'bg-success' : 'bg-danger'}" style="width: 4px; ${document.dir === 'rtl' ? 'right: 0;' : 'left: 0;'}"></div>
                                
                                <div class="card-body d-flex flex-column" style="${document.dir === 'rtl' ? 'padding-right: 1.25rem;' : 'padding-left: 1.25rem;'}">
                                    <!-- Title -->
                                    <h5 class="card-title font-bold text-gray-800 mb-3" style="line-height: 1.4;">${typeof I18n !== 'undefined' ? I18n.t(form.i18nKey, form.name) : form.name}</h5>
                                    
                                    <!-- Badges -->
                                    <div class="d-flex flex-wrap gap-2 mb-4">
                                        <span class="badge ${matchedCode ? 'bg-success' : 'bg-danger'} d-flex align-items-center">
                                            <i class="fas ${matchedCode ? 'fa-check-circle' : 'fa-times-circle'} mx-1"></i>
                                            ${matchedCode ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.coded', 'مكود') : 'مكود') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.notCoded', 'غير معرّف') : 'غير معرّف')}
                                        </span>
                                        <span class="badge bg-light text-dark border d-flex align-items-center">
                                            <i class="fas fa-tag text-secondary mx-1"></i> ${form.type}
                                        </span>
                                        <span class="badge bg-light text-dark border d-flex align-items-center">
                                            <i class="fas fa-puzzle-piece text-secondary mx-1"></i> ${form.department}
                                        </span>
                                    </div>
                                    
                                    <!-- Middle Content (Code/Warning) -->
                                    <div class="flex-grow-1 d-flex flex-column justify-content-center mb-4">
                                        ${matchedCode ? `
                                            <div class="d-flex justify-content-between align-items-center bg-light rounded p-2 mb-2 border">
                                                <span class="text-muted small fw-bold"><i class="fas fa-hashtag mx-1 text-primary"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.code', 'الكود') : 'الكود'}</span>
                                                <span class="badge bg-primary font-monospace">${Utils.escapeHTML(matchedCode.code || '')}</span>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center bg-light rounded p-2 border">
                                                <span class="text-muted small fw-bold"><i class="fas fa-code-branch mx-1 text-primary"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.version', 'الإصدار') : 'الإصدار'}</span>
                                                ${activeVersion ? `<span class="badge bg-success font-monospace">v${activeVersion.versionNumber}</span>` : `<span class="badge bg-danger small">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.noVersion', 'لا يوجد') : 'لا يوجد'}</span>`}
                                            </div>
                                        ` : `
                                            <div class="alert alert-danger py-2 px-3 m-0 d-flex align-items-start shadow-sm" style="font-size: 0.8rem; border-left: 3px solid #dc3545;">
                                                <i class="fas fa-exclamation-triangle mx-1 mt-1"></i>
                                                <span class="fw-bold">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.warning', 'يرجى تعيين كود لهذا النموذج لكي يتم اعتماده واستخدامه في النظام.') : 'يرجى تعيين كود لهذا النموذج لكي يتم اعتماده واستخدامه في النظام.'}</span>
                                            </div>
                                        `}
                                    </div>
                                    
                                    <!-- Action Button -->
                                    <div class="mt-auto border-top pt-3">
                                        ${matchedCode ? `
                                            <button class="btn btn-outline-secondary btn-sm w-100 d-flex justify-content-center align-items-center fw-bold" onclick="ISO.viewDocumentVersions('${matchedCode.id}')" title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.history', 'سجل التغييرات') : 'سجل التغييرات'}">
                                                <i class="fas fa-history mx-2"></i>
                                                ${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.history', 'سجل التغييرات') : 'سجل التغييرات'}
                                            </button>
                                        ` : `
                                            <button class="btn btn-primary btn-sm w-100 d-flex justify-content-center align-items-center fw-bold shadow-sm" onclick="ISO.quickAssignFormCode('${form.name}', '${form.defaultCode}', '${form.type}', '${form.department}')" title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.assignCode', 'إنشاء كود سريع') : 'إنشاء كود سريع'}">
                                                <i class="fas fa-plus-circle mx-2"></i>
                                                ${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.assignNow', 'تعيين كود الآن') : 'تعيين كود الآن'}
                                            </button>
                                        `}
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
            `;
        }).join('');

        return `
        <div class="card mb-4 border-0 shadow-sm" style="border-radius: 12px; overflow: hidden;">
            <div class="card-header bg-primary text-white p-4 border-0" style="background: linear-gradient(135deg, #2563eb 0%, #4338ca 100%) !important;">
                <h3 class="card-title text-white d-flex align-items-center fw-bold m-0" style="font-size: 1.25rem;">
                    <i class="fas fa-layer-group mx-3 opacity-75 fs-4"></i>
                    ${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.title', 'دليل نماذج النظام المدمجة') : 'دليل نماذج النظام المدمجة'}
                </h3>
                <p class="text-white-50 small mt-2 mb-0" style="padding-right: 3.5rem;">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.systemForms.desc', 'يتم عرض النماذج الرئيسية بالنظام وحالتها في مركز التكويد') : 'يتم عرض النماذج الرئيسية بالنظام وحالتها في مركز التكويد'}</p>
            </div>
            <div class="card-body bg-light p-4 p-md-5">
                ${modulesHtml}
            </div>
        </div>
        `;
    },

    async renderCodingCenter(opts = {}) {
        const skipFetch = opts && opts.skipFetch === true;
        const showLoadingIndicator = skipFetch;

        // التحقق من الصلاحيات - فقط المدير يمكنه الوصول
        const currentUser = AppState.currentUser;
        if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'مدير')) {
            return `
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-400 mb-4"></i>
                            <p class="text-gray-600">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.accessDeniedTitle', 'ليس لديك صلاحية للوصول إلى مركز التكويد والإصدار') : 'ليس لديك صلاحية للوصول إلى مركز التكويد والإصدار'}</p>
                            <p class="text-sm text-gray-500 mt-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.accessDeniedDesc', 'هذا القسم متاح فقط لمدير النظام') : 'هذا القسم متاح فقط لمدير النظام'}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        let documentCodes = [];
        let documentVersions = [];
        let timedOut = false;
        const silentTimeout = opts && opts.silentTimeout === true;

        if (!skipFetch) {
            const LOAD_TIMEOUT_MS = 60000;
            try {
                Loading.show();
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('TIMEOUT')), LOAD_TIMEOUT_MS)
                );
                const fetchPromise = Promise.all([
                    GoogleIntegration.fetchData('getDocumentCodes', {}).catch(() => ({ success: false, data: [] })),
                    GoogleIntegration.fetchData('getDocumentVersions', { documentCodeId: null }).catch(() => ({ success: false, data: [] }))
                ]);
                const [codesResult, versionsResult] = await Promise.race([fetchPromise, timeoutPromise]);
                if (codesResult && codesResult.success && codesResult.data) {
                    documentCodes = codesResult.data;
                }
                if (versionsResult && versionsResult.success && versionsResult.data) {
                    documentVersions = versionsResult.data;
                }
            } catch (error) {
                if (error && error.message === 'TIMEOUT') {
                    timedOut = true;
                    Utils.safeError('مركز التكويد والإصدار: انتهت مهلة التحميل. جرب تحديث الصفحة.');
                    if (!silentTimeout && typeof Notification !== 'undefined') {
                        Notification.warning('انتهت مهلة تحميل البيانات. يمكنك تحديث الصفحة أو المحاولة لاحقاً.');
                    }
                } else {
                    Utils.safeError('Error loading coding center data:', error);
                }
            } finally {
                Loading.hide();
            }
        }

        const html = `
            <div class="space-y-6">
                ${timedOut ? `
                <div class="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 flex items-center gap-2">
                    <i class="fas fa-clock text-amber-600"></i>
                    <span class="text-sm text-amber-800">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.timeoutWarning', 'لم يتم تحميل البيانات في الوقت المحدد. اضغط <strong>إعادة تحميل</strong> للمحاولة مرة أخرى.') : 'لم يتم تحميل البيانات في الوقت المحدد. اضغط <strong>إعادة تحميل</strong> للمحاولة مرة أخرى.'}</span>
                </div>
                ` : ''}
                ${showLoadingIndicator ? `
                <div class="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-2">
                    <i class="fas fa-spinner fa-spin text-blue-600"></i>
                    <span class="text-sm text-blue-800">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.loadingData', 'جاري تحميل البيانات...') : 'جاري تحميل البيانات...'}</span>
                </div>
                ` : ''}
                <!-- إحصائيات سريعة + زر إعادة التحميل -->
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <div class="text-3xl font-bold text-blue-600 mb-2">${documentCodes.length}</div>
                            <div class="text-sm text-gray-700 font-semibold">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.stats.codes', 'أكواد المستندات') : 'أكواد المستندات'}</div>
                        </div>
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div class="text-3xl font-bold text-green-600 mb-2">${documentVersions.length}</div>
                            <div class="text-sm text-gray-700 font-semibold">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.stats.versions', 'إصدارات المستندات') : 'إصدارات المستندات'}</div>
                        </div>
                        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                            <div class="text-3xl font-bold text-purple-600 mb-2">${documentVersions.filter(v => v.isActive === true || v.isActive === 'true').length}</div>
                            <div class="text-sm text-gray-700 font-semibold">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.stats.activeVersions', 'إصدارات نشطة') : 'إصدارات نشطة'}</div>
                        </div>
                    </div>
                    <button type="button" onclick="ISO.reloadCodingCenter()" class="btn-secondary flex items-center gap-2 shrink-0" title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.reload', 'إعادة تحميل') : 'إعادة تحميل'}">
                        <i class="fas fa-sync-alt"></i>
                        <span>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.reload', 'إعادة تحميل') : 'إعادة تحميل'}</span>
                    </button>
                </div>

                ${this.renderSystemFormsDirectory(documentCodes, documentVersions)}

                <!-- قسم إدارة التكويد -->
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <h2 class="card-title">
                                <i class="fas fa-code ml-2"></i>
                                مركز التكويد (Document Coding Center)
                            </h2>
                            <div class="flex flex-wrap items-center gap-2">
                                <button type="button" class="btn-secondary flex items-center gap-1" onclick="ISO.importCodingCenterFromExcel()" title="استيراد أكواد المستندات من ملف Excel أو CSV">
                                    <i class="fas fa-file-excel"></i>
                                    <span>استيراد Excel</span>
                                </button>
                                <button type="button" class="btn-secondary flex items-center gap-1" onclick="ISO.importCodingCenterFromPDF()" title="استيراد من PDF (غير مدعوم للجداول - استخدم Excel)">
                                    <i class="fas fa-file-pdf"></i>
                                    <span>استيراد PDF</span>
                                </button>
                                <button type="button" class="btn-secondary flex items-center gap-1" onclick="ISO.exportCodingCenterToExcel()" title="تصدير البيانات إلى Excel">
                                    <i class="fas fa-file-export"></i>
                                    <span>تصدير Excel</span>
                                </button>
                                <button type="button" class="btn-secondary flex items-center gap-1" onclick="ISO.exportCodingCenterToPDF()" title="تصدير البيانات إلى PDF">
                                    <i class="fas fa-file-pdf"></i>
                                    <span>تصدير PDF</span>
                                </button>
                                <button class="btn-primary" onclick="ISO.showDocumentCodeForm()">
                                    <i class="fas fa-plus ml-2"></i>إضافة كود جديد
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <input type="text" id="document-code-search" class="form-input" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.searchPlaceholder', 'بحث في أكواد المستندات...') : 'بحث في أكواد المستندات...'}" 
                                onkeyup="ISO.filterDocumentCodes()">
                        </div>
                        ${documentCodes.length === 0 ? `
                            <div class="empty-state">
                                <p class="text-gray-500">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.noCodes', 'لا توجد أكواد مستندات مسجلة') : 'لا توجد أكواد مستندات مسجلة'}</p>
                            </div>
                        ` : `
                            <div class="overflow-x-auto">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.code', 'الكود') : 'الكود'}</th>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.name', 'اسم المستند') : 'اسم المستند'}</th>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.type', 'نوع المستند') : 'نوع المستند'}</th>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.dept', 'القسم') : 'القسم'}</th>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.status', 'الحالة') : 'الحالة'}</th>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.createdAt', 'تاريخ الإنشاء') : 'تاريخ الإنشاء'}</th>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.actions', 'الإجراءات') : 'الإجراءات'}</th>
                                        </tr>
                                    </thead>
                                    <tbody id="document-codes-table-body">
                                        ${documentCodes.map(code => `
                                            <tr>
                                                <td><strong>${Utils.escapeHTML(code.code || '')}</strong></td>
                                                <td>${Utils.escapeHTML(code.documentName || '')}</td>
                                                <td>${Utils.escapeHTML(code.documentType || '')}</td>
                                                <td>${Utils.escapeHTML(code.department || '')}</td>
                                                <td><span class="badge badge-${code.status === 'نشط' || code.status === 'Active' ? 'success' : 'warning'}">${Utils.escapeHTML(code.status || '')}</span></td>
                                                <td>${code.createdAt ? Utils.formatDate(code.createdAt) : '-'}</td>
                                                <td>
                                                    <button onclick="ISO.editDocumentCode('${code.id}')" class="btn-icon btn-icon-info" title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.edit', 'تعديل') : 'تعديل'}">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button onclick="ISO.viewDocumentVersions('${code.id}')" class="btn-icon btn-icon-success" title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.viewVersions', 'عرض الإصدارات') : 'عرض الإصدارات'}">
                                                        <i class="fas fa-list"></i>
                                                    </button>
                                                    <button onclick="ISO.deleteDocumentCode('${code.id}')" class="btn-icon btn-icon-danger" title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.delete', 'حذف') : 'حذف'}">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                </div>

                <!-- قسم إدارة الإصدارات -->
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title">
                                <i class="fas fa-file-alt ml-2"></i>
                                ${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.issuingCenterTitle', 'مركز الإصدار (Issuing Center)') : 'مركز الإصدار (Issuing Center)'}
                            </h2>
                            <button class="btn-primary" onclick="ISO.showDocumentVersionForm()">
                                <i class="fas fa-plus ml-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.addVersion', 'إضافة إصدار جديد') : 'إضافة إصدار جديد'}
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <select id="version-filter-code" class="form-input" onchange="ISO.filterDocumentVersions()">
                                <option value="">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.allCodes', 'جميع الأكواد') : 'جميع الأكواد'}</option>
                                ${documentCodes.map(code => `
                                    <option value="${code.id}">${Utils.escapeHTML(code.code || '')} - ${Utils.escapeHTML(code.documentName || '')}</option>
                                `).join('')}
                            </select>
                        </div>
                        ${documentVersions.length === 0 ? `
                            <div class="empty-state">
                                <p class="text-gray-500">${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.noVersions', 'لا توجد إصدارات مسجلة') : 'لا توجد إصدارات مسجلة'}</p>
                            </div>
                        ` : `
                            <div class="overflow-x-auto">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.code', 'الكود') : 'الكود'}</th>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.versionNum', 'رقم الإصدار') : 'رقم الإصدار'}</th>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.issueDate', 'تاريخ الإصدار') : 'تاريخ الإصدار'}</th>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.revisionDate', 'تاريخ التعديل') : 'تاريخ التعديل'}</th>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.status', 'الحالة') : 'الحالة'}</th>
                                            <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.table.actions', 'الإجراءات') : 'الإجراءات'}</th>
                                        </tr>
                                    </thead>
                                    <tbody id="document-versions-table-body">
                                        ${documentVersions.map(version => {
            const code = documentCodes.find(c => c.id === version.documentCodeId);
            return `
                                                <tr data-code-id="${version.documentCodeId}">
                                                    <td><strong>${Utils.escapeHTML(version.documentCode || code?.code || '')}</strong></td>
                                                    <td>${Utils.escapeHTML(version.versionNumber || '')}</td>
                                                    <td>${version.issueDate ? Utils.formatDate(version.issueDate) : '-'}</td>
                                                    <td>${version.revisionDate ? Utils.formatDate(version.revisionDate) : '-'}</td>
                                                    <td>
                                                        <span class="badge badge-${version.isActive === true || version.isActive === 'true' ? 'success' : 'secondary'}">
                                                            ${version.isActive === true || version.isActive === 'true' ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.active', 'نشط') : 'نشط') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.inactive', 'غير نشط') : 'غير نشط')}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button onclick="ISO.editDocumentVersion('${version.id}')" class="btn-icon btn-icon-info" title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.edit', 'تعديل') : 'تعديل'}">
                                                            <i class="fas fa-edit"></i>
                                                        </button>
                                                        <button onclick="ISO.reissueDocument('${version.id}')" class="btn-icon btn-icon-warning" title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.reissue', 'إعادة إصدار') : 'إعادة إصدار'}">
                                                            <i class="fas fa-redo"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            `;
        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
        if (opts && opts.returnStatus) return { html, timedOut };
        return html;
    },

    /**
     * إعادة تحميل محتوى مركز التكويد والإصدار فقط (بدون إعادة تحميل كامل الموديول)
     */
    async reloadCodingCenter() {
        const contentArea = document.getElementById('iso-content');
        if (!contentArea) return;
        try {
            Loading.show();
            this.currentTab = 'coding-center';
            const result = await this.renderCodingCenter({ returnStatus: true });
            const content = result && typeof result === 'object' && result.html !== undefined ? result.html : result;
            contentArea.innerHTML = content;
            const timedOut = result && typeof result === 'object' && result.timedOut === true;
            if (!timedOut && typeof Notification !== 'undefined') Notification.success('تم تحديث البيانات');
        } catch (error) {
            Utils.safeError('Error reloading coding center:', error);
            if (typeof Notification !== 'undefined') Notification.error('فشل إعادة التحميل: ' + (error && error.message ? error.message : ''));
        } finally {
            Loading.hide();
        }
    },

    /**
     * تصدير بيانات مركز التكويد إلى Excel
     */
    async exportCodingCenterToExcel() {
        try {
            if (typeof XLSX === 'undefined') {
                if (typeof Notification !== 'undefined') Notification.error('مكتبة Excel غير متاحة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
                return;
            }
            Loading.show();
            const [codesRes, versionsRes] = await Promise.all([
                GoogleIntegration.fetchData('getDocumentCodes', {}).catch(() => ({ success: false, data: [] })),
                GoogleIntegration.fetchData('getDocumentVersions', { documentCodeId: null }).catch(() => ({ success: false, data: [] }))
            ]);
            const documentCodes = (codesRes && codesRes.success && codesRes.data) ? codesRes.data : [];
            const documentVersions = (versionsRes && versionsRes.success && versionsRes.data) ? versionsRes.data : [];
            if (documentCodes.length === 0 && documentVersions.length === 0) {
                if (typeof Notification !== 'undefined') Notification.warning('لا توجد بيانات للتصدير');
                Loading.hide();
                return;
            }
            const wb = XLSX.utils.book_new();
            if (documentCodes.length > 0) {
                const codesHeaders = ['الكود', 'اسم المستند', 'نوع المستند', 'القسم', 'الحالة', 'الوصف', 'تاريخ الإنشاء', 'تاريخ التحديث', 'أنشئ بواسطة'];
                const codesRows = documentCodes.map(c => [
                    c.code || '',
                    c.documentName || '',
                    c.documentType || '',
                    c.department || '',
                    c.status || '',
                    c.description || '',
                    c.createdAt ? (typeof c.createdAt === 'string' ? c.createdAt : new Date(c.createdAt).toISOString()) : '',
                    c.updatedAt ? (typeof c.updatedAt === 'string' ? c.updatedAt : new Date(c.updatedAt).toISOString()) : '',
                    c.createdBy || ''
                ]);
                const wsCodes = XLSX.utils.aoa_to_sheet([codesHeaders, ...codesRows]);
                XLSX.utils.book_append_sheet(wb, wsCodes, 'أكواد المستندات');
            }
            if (documentVersions.length > 0) {
                const verHeaders = ['كود المستند', 'رقم الإصدار', 'تاريخ الإصدار', 'نشط', 'الحالة', 'ملاحظات'];
                const codeIdToCode = {};
                documentCodes.forEach(c => { codeIdToCode[c.id] = c.code; });
                const verRows = documentVersions.map(v => [
                    codeIdToCode[v.documentCodeId] || v.documentCodeId || '',
                    v.versionNumber || '',
                    v.issueDate ? (typeof v.issueDate === 'string' ? v.issueDate : new Date(v.issueDate).toISOString().slice(0, 10)) : '',
                    v.isActive === true || v.isActive === 'true' ? 'نعم' : 'لا',
                    v.status || '',
                    v.notes || ''
                ]);
                const wsVer = XLSX.utils.aoa_to_sheet([verHeaders, ...verRows]);
                XLSX.utils.book_append_sheet(wb, wsVer, 'إصدارات المستندات');
            }
            const fileName = 'مركز_التكويد_والإصدار_' + new Date().toISOString().slice(0, 10) + '.xlsx';
            XLSX.writeFile(wb, fileName);
            if (typeof Notification !== 'undefined') Notification.success('تم تصدير البيانات إلى Excel بنجاح');
        } catch (err) {
            Utils.safeError('تصدير مركز التكويد إلى Excel:', err);
            if (typeof Notification !== 'undefined') Notification.error('فشل التصدير: ' + (err.message || err));
        } finally {
            Loading.hide();
        }
    },

    /**
     * تصدير بيانات مركز التكويد إلى PDF
     */
    async exportCodingCenterToPDF() {
        try {
            Loading.show();
            
            // Load jsPDF and autoTable libraries dynamically if not present
            const loadLib = (src, check) => new Promise((res, rej) => {
                if (check()) return res();
                const s = document.createElement('script');
                s.src = src; s.onload = () => res(); s.onerror = () => rej(new Error('Failed: ' + src));
                document.head.appendChild(s);
            });
            
            await loadLib('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', () => typeof window.jspdf !== 'undefined');
            await loadLib('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js', () => typeof window.jspdf?.jsPDF?.prototype?.autoTable !== 'undefined');

            const [codesRes, versionsRes] = await Promise.all([
                GoogleIntegration.fetchData('getDocumentCodes', {}).catch(() => ({ success: false, data: [] })),
                GoogleIntegration.fetchData('getDocumentVersions', { documentCodeId: null }).catch(() => ({ success: false, data: [] }))
            ]);
            const documentCodes = (codesRes && codesRes.success && codesRes.data) ? codesRes.data : [];
            const documentVersions = (versionsRes && versionsRes.success && versionsRes.data) ? versionsRes.data : [];
            if (documentCodes.length === 0 && documentVersions.length === 0) {
                if (typeof Notification !== 'undefined') Notification.warning('لا توجد بيانات للتصدير');
                Loading.hide();
                return;
            }
            
            if (typeof window.jspdf === 'undefined') {
                if (typeof Notification !== 'undefined') Notification.error('فشل تحميل مكتبة PDF. يرجى المحاولة مرة أخرى.');
                Loading.hide();
                return;
            }
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('l', 'mm', 'a4');
            const pageW = doc.internal.pageSize.getWidth();
            const pageH = doc.internal.pageSize.getHeight();
            const exportDate = new Date().toLocaleDateString('ar-EG', { dateStyle: 'medium' });
            
            // Note: jsPDF without custom fonts doesn't support Arabic well natively, 
            // but we will keep the original export logic here as requested.
            doc.setFontSize(14);
            doc.text('Document Coding and Issuing Center', pageW / 2, 14, { align: 'center' });
            doc.setFontSize(9);
            doc.text('Export Date: ' + exportDate, pageW / 2, 21, { align: 'center' });
            let startY = 28;
            if (documentCodes.length > 0) {
                doc.setFontSize(10);
                doc.text('Document Codes', 14, startY);
                startY += 6;
                const codeHeaders = ['Code', 'Document Name', 'Type', 'Department', 'Status'];
                const codeRows = documentCodes.map(c => [
                    String(c.code || ''),
                    String(c.documentName || '').substring(0, 25),
                    String(c.documentType || ''),
                    String(c.department || ''),
                    String(c.status || '')
                ]);
                
                doc.autoTable({
                    head: [codeHeaders],
                    body: codeRows,
                    startY: startY,
                    styles: { fontSize: 7, cellPadding: 2, font: 'helvetica' },
                    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
                    margin: { left: 8, right: 8 }
                });
                startY = doc.lastAutoTable.finalY + 10;
            }
            
            if (documentVersions.length > 0 && startY < pageH - 40) {
                doc.setFontSize(10);
                doc.text('Document Versions', 14, startY);
                startY += 6;
                const codeIdToCode = {};
                documentCodes.forEach(c => { codeIdToCode[c.id] = c.code; });
                const verHeaders = ['Document Code', 'Version', 'Issue Date', 'Active', 'Status'];
                const verRows = documentVersions.slice(0, 50).map(v => [
                    String(codeIdToCode[v.documentCodeId] || ''),
                    String(v.versionNumber || ''),
                    String(v.issueDate || '').slice(0, 10),
                    v.isActive === true || v.isActive === 'true' ? 'Yes' : 'No',
                    String(v.status || '')
                ]);
                
                doc.autoTable({
                    head: [verHeaders],
                    body: verRows,
                    startY: startY,
                    styles: { fontSize: 7, cellPadding: 2, font: 'helvetica' },
                    headStyles: { fillColor: [34, 197, 94], textColor: 255 },
                    margin: { left: 8, right: 8 }
                });
            }
            
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text('— Document Coding and Issuing Center — ' + exportDate, pageW / 2, pageH - 10, { align: 'center' });
            doc.save('Coding_Center_' + new Date().toISOString().slice(0, 10) + '.pdf');
            if (typeof Notification !== 'undefined') Notification.success('تم تصدير البيانات إلى PDF بنجاح');
        } catch (err) {
            Utils.safeError('تصدير مركز التكويد إلى PDF:', err);
            if (typeof Notification !== 'undefined') Notification.error('فشل التصدير: ' + (err.message || err));
        } finally {
            Loading.hide();
        }
    },

    /**
     * استيراد أكواد المستندات من ملف Excel أو CSV
     */
    importCodingCenterFromExcel() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx,.xls,.csv';
        input.style.display = 'none';
        input.onchange = async (e) => {
            const file = e.target && e.target.files && e.target.files[0];
            if (!file) return;
            const fileName = (file.name || '').toLowerCase();
            try {
                Loading.show();
                let rows = [];
                if (fileName.endsWith('.csv')) {
                    const text = await new Promise((res, rej) => {
                        const r = new FileReader();
                        r.onload = () => res(r.result);
                        r.onerror = rej;
                        r.readAsText(file, 'UTF-8');
                    });
                    const lines = text.split(/\r?\n/).filter(l => l.trim());
                    const delimiter = text.indexOf('\t') >= 0 ? '\t' : (text.indexOf(';') >= 0 ? ';' : ',');
                    const headers = lines[0] ? lines[0].split(delimiter).map(h => h.trim()) : [];
                    const codeIdx = headers.findIndex(h => /كود|code/i.test(h));
                    const nameIdx = headers.findIndex(h => /اسم|name|document/i.test(h));
                    const typeIdx = headers.findIndex(h => /نوع|type/i.test(h));
                    const deptIdx = headers.findIndex(h => /قسم|department/i.test(h));
                    const statusIdx = headers.findIndex(h => /حالة|status/i.test(h));
                    const descIdx = headers.findIndex(h => /وصف|description/i.test(h));
                    for (let i = 1; i < lines.length; i++) {
                        const cells = lines[i].split(delimiter);
                        const code = (codeIdx >= 0 ? cells[codeIdx] : cells[0]) || '';
                        const documentName = (nameIdx >= 0 ? cells[nameIdx] : cells[1]) || '';
                        if (!String(code).trim()) continue;
                        rows.push({
                            code: String(code).trim(),
                            documentName: String(documentName).trim() || String(code).trim(),
                            documentType: typeIdx >= 0 ? (cells[typeIdx] || '').trim() : 'وثيقة',
                            department: deptIdx >= 0 ? (cells[deptIdx] || '').trim() : '',
                            status: statusIdx >= 0 ? (cells[statusIdx] || '').trim() : 'نشط',
                            description: descIdx >= 0 ? (cells[descIdx] || '').trim() : ''
                        });
                    }
                } else {
                    if (typeof XLSX === 'undefined') {
                        if (typeof Notification !== 'undefined') Notification.error('مكتبة Excel غير متاحة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
                        Loading.hide();
                        return;
                    }
                    const ab = await new Promise((res, rej) => {
                        const r = new FileReader();
                        r.onload = () => res(r.result);
                        r.onerror = rej;
                        r.readAsArrayBuffer(file);
                    });
                    const wb = XLSX.read(ab, { type: 'array' });
                    const firstSheet = wb.SheetNames[0] ? wb.Sheets[wb.SheetNames[0]] : null;
                    if (!firstSheet) { Loading.hide(); return; }
                    const aoa = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                    if (!aoa || aoa.length < 2) { Loading.hide(); if (Notification) Notification.warning('الملف لا يحتوي على صفوف بيانات.'); return; }
                    const headers = (aoa[0] || []).map(h => String(h).trim());
                    const codeIdx = headers.findIndex(h => /كود|code/i.test(h));
                    const nameIdx = headers.findIndex(h => /اسم|name|document/i.test(h));
                    const typeIdx = headers.findIndex(h => /نوع|type/i.test(h));
                    const deptIdx = headers.findIndex(h => /قسم|department/i.test(h));
                    const statusIdx = headers.findIndex(h => /حالة|status/i.test(h));
                    const descIdx = headers.findIndex(h => /وصف|description/i.test(h));
                    for (let i = 1; i < aoa.length; i++) {
                        const cells = aoa[i] || [];
                        const code = (codeIdx >= 0 ? cells[codeIdx] : cells[0]);
                        const documentName = (nameIdx >= 0 ? cells[nameIdx] : cells[1]);
                        const codeStr = (code != null && code !== undefined) ? String(code).trim() : '';
                        if (!codeStr) continue;
                        rows.push({
                            code: codeStr,
                            documentName: (documentName != null && documentName !== undefined) ? String(documentName).trim() : codeStr,
                            documentType: typeIdx >= 0 ? String(cells[typeIdx] || '').trim() : 'وثيقة',
                            department: deptIdx >= 0 ? String(cells[deptIdx] || '').trim() : '',
                            status: statusIdx >= 0 ? String(cells[statusIdx] || '').trim() : 'نشط',
                            description: descIdx >= 0 ? String(cells[descIdx] || '').trim() : ''
                        });
                    }
                }
                if (rows.length === 0) {
                    if (typeof Notification !== 'undefined') Notification.warning('لم يتم العثور على صفوف صالحة (يجب وجود عمود الكود).');
                    Loading.hide();
                    return;
                }
                let added = 0, failed = 0;
                for (const row of rows) {
                    try {
                        const result = await GoogleIntegration.fetchData('addDocumentCode', {
                            code: row.code,
                            documentName: row.documentName,
                            documentType: row.documentType,
                            department: row.department,
                            status: row.status,
                            description: row.description
                        });
                        if (result && result.success) added++;
                        else failed++;
                    } catch (_) { failed++; }
                }
                if (typeof Notification !== 'undefined') Notification.success('تم استيراد ' + added + ' كوداً. فشل: ' + failed + ' (قد يكون بسبب تكرار الكود).');
                this.reloadCodingCenter();
            } catch (err) {
                Utils.safeError('استيراد مركز التكويد من Excel:', err);
                if (typeof Notification !== 'undefined') Notification.error('فشل الاستيراد: ' + (err.message || err));
            } finally {
                Loading.hide();
            }
            input.value = '';
        };
        document.body.appendChild(input);
        input.click();
        setTimeout(() => input.remove(), 500);
    },

    /**
     * استيراد من PDF (الجداول غير مدعومة - يظهر رسالة توجيهية)
     */
    importCodingCenterFromPDF() {
        if (typeof Notification !== 'undefined') {
            Notification.warning('استيراد البيانات المنظمة من ملف PDF غير متاح حالياً. يرجى استخدام ملف Excel أو CSV لاستيراد أكواد المستندات.');
        }
    },

    quickAssignFormCode(name, code, type, department) {
        this.showDocumentCodeForm({
            documentName: name,
            code: code,
            documentType: type,
            department: department,
            status: 'نشط'
        });
    },

    async showDocumentCodeForm(data = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.editCodeTitle', 'تعديل كود المستند') : 'تعديل كود المستند') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.addCodeTitle', 'إضافة كود مستند جديد') : 'إضافة كود مستند جديد')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="document-code-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.codeLabel', 'الكود *') : 'الكود *'}</label>
                            <input type="text" id="doc-code" required class="form-input" 
                                value="${Utils.escapeHTML(data?.code || '')}" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.codePlaceholder', 'مثال: DOC-001, FORM-002') : 'مثال: DOC-001, FORM-002'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.nameLabel', 'اسم المستند / الإجراء *') : 'اسم المستند / الإجراء *'}</label>
                            <input type="text" id="doc-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.documentName || '')}" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.namePlaceholder', 'اسم المستند') : 'اسم المستند'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.typeLabel', 'نوع المستند *') : 'نوع المستند *'}</label>
                            <select id="doc-type" required class="form-input">
                                <option value="">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.selectTypeOption', 'اختر النوع') : 'اختر النوع'}</option>
                                <option value="وثيقة" ${data?.documentType === 'وثيقة' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.typeDoc', 'وثيقة') : 'وثيقة'}</option>
                                <option value="إجراء" ${data?.documentType === 'إجراء' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.typeProc', 'إجراء') : 'إجراء'}</option>
                                <option value="نموذج" ${data?.documentType === 'نموذج' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.typeForm', 'نموذج') : 'نموذج'}</option>
                                <option value="تقرير" ${data?.documentType === 'تقرير' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.typeReport', 'تقرير') : 'تقرير'}</option>
                                <option value="سجل" ${data?.documentType === 'سجل' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.typeRecord', 'سجل') : 'سجل'}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.departmentLabel', 'القسم *') : 'القسم *'}</label>
                            <input type="text" id="doc-department" required class="form-input" 
                                value="${Utils.escapeHTML(data?.department || '')}" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.departmentPlaceholder', 'القسم التابع له') : 'القسم التابع له'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.statusLabel', 'الحالة *') : 'الحالة *'}</label>
                            <select id="doc-status" required class="form-input">
                                <option value="نشط" ${data?.status === 'نشط' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.statusActive', 'نشط') : 'نشط'}</option>
                                <option value="معطل" ${data?.status === 'معطل' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.statusInactive', 'معطل') : 'معطل'}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.descLabel', 'الوصف') : 'الوصف'}</label>
                            <textarea id="doc-description" class="form-input" rows="3" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.descPlaceholder', 'وصف اختياري للمستند') : 'وصف اختياري للمستند'}">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.cancel', 'إلغاء') : 'إلغاء'}</button>
                    <button type="button" id="save-doc-code-btn" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.save', 'حفظ') : 'حفظ'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const saveBtn = modal.querySelector('#save-doc-code-btn');
        saveBtn.addEventListener('click', () => this.handleDocumentCodeSubmit(data?.id, modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async handleDocumentCodeSubmit(editId = null, modal) {
        // فحص العناصر قبل الاستخدام
        const codeEl = document.getElementById('doc-code');
        const nameEl = document.getElementById('doc-name');
        const typeEl = document.getElementById('doc-type');
        const departmentEl = document.getElementById('doc-department');
        const statusEl = document.getElementById('doc-status');
        const descriptionEl = document.getElementById('doc-description');
        
        if (!codeEl || !nameEl || !typeEl || !departmentEl || !statusEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            return;
        }

        const code = codeEl.value.trim();
        const documentName = nameEl.value.trim();
        if (!code) {
            Notification.error('حقل الكود مطلوب.');
            return;
        }
        if (!documentName) {
            Notification.error('حقل اسم المستند / الإجراء مطلوب.');
            return;
        }

        const formData = {
            id: editId || Utils.generateId('DOC_CODE'),
            code: code,
            documentName: documentName,
            documentType: typeEl.value,
            department: departmentEl.value.trim(),
            status: statusEl.value,
            description: descriptionEl?.value.trim() || '',
            createdAt: editId ? (await this.getDocumentCodeById(editId))?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: AppState.currentUser?.name || AppState.currentUser?.email || 'System'
        };

        Loading.show();
        try {
            const action = editId ? 'updateDocumentCode' : 'addDocumentCode';
            const result = await GoogleIntegration.fetchData(action, formData);

            if (result.success) {
                Notification.success(editId ? 'تم تحديث الكود بنجاح' : 'تم إضافة الكود بنجاح');
                modal.remove();
                this.load();
            } else {
                const msg = result.message || 'حدث خطأ أثناء الحفظ';
                Notification.error(result.errorCode === 'DUPLICATE_CODE' ? 'كود المستند موجود مسبقاً. يرجى اختيار كود فريد (مثل: DOC-001، FORM-002).' : msg);
            }
        } catch (error) {
            const msg = error && error.message ? String(error.message) : '';
            if (msg.indexOf('غير معترف به') !== -1 || msg.indexOf('ACTION_NOT_RECOGNIZED') !== -1) {
                Notification.error(
                    'الخادم لا يتعرّف على عملية إضافة كود المستند. ' +
                    'تأكد من: 1) تحديث ملفات Code.gs و ISO.gs و Headers.gs و Config.gs في مشروع Google Apps Script. ' +
                    '2) نشر نسخة جديدة (Deploy → Manage deployments → Edit → New version → Deploy). ' +
                    '3) استخدام الرابط الذي ينتهي بـ /exec في الإعدادات.'
                );
            } else {
                Notification.error('حدث خطأ: ' + msg);
            }
        } finally {
            Loading.hide();
        }
    },

    async getDocumentCodeById(id) {
        try {
            const result = await GoogleIntegration.fetchData('getDocumentCodes', {});
            if (result.success && result.data) {
                return result.data.find(c => c.id === id);
            }
        } catch (error) {
            Utils.safeError('Error getting document code:', error);
        }
        return null;
    },

    async editDocumentCode(id) {
        const code = await this.getDocumentCodeById(id);
        if (code) {
            this.showDocumentCodeForm(code);
        } else {
            Notification.error('الكود غير موجود');
        }
    },

    async deleteDocumentCode(id) {
        const item = await this.getDocumentCodeById(id);
        const label = item ? (item.code || item.documentName || id) : id;
        if (!confirm('هل أنت متأكد من حذف الكود "' + label + '"؟ سيتم حذف جميع الإصدارات المرتبطة به.')) {
            return;
        }

        Loading.show();
        try {
            const result = await GoogleIntegration.fetchData('deleteDocumentCode', { id: id });
            if (result.success) {
                Notification.success('تم حذف الكود بنجاح');
                this.load();
            } else {
                Notification.error(result.message || 'حدث خطأ أثناء الحذف');
            }
        } catch (error) {
            Notification.error('حدث خطأ: ' + error.message);
        } finally {
            Loading.hide();
        }
    },

    async showDocumentVersionForm(data = null, documentCodeId = null) {
        // جلب قائمة الأكواد
        let codes = [];
        try {
            const result = await GoogleIntegration.fetchData('getDocumentCodes', {});
            if (result.success && result.data) {
                codes = result.data;
            }
        } catch (error) {
            Utils.safeError('Error loading codes:', error);
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.editVersionTitle', 'تعديل إصدار المستند') : 'تعديل إصدار المستند') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.addVersionTitle', 'إضافة إصدار جديد') : 'إضافة إصدار جديد')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="document-version-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.docCodeLabel', 'كود المستند *') : 'كود المستند *'}</label>
                            <select id="version-code-id" required class="form-input" ${data ? 'disabled' : ''}>
                                <option value="">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.selectCodeOption', 'اختر الكود') : 'اختر الكود'}</option>
                                ${codes.map(code => `
                                    <option value="${code.id}" 
                                        ${(data?.documentCodeId === code.id || documentCodeId === code.id) ? 'selected' : ''}>
                                        ${Utils.escapeHTML(code.code || '')} - ${Utils.escapeHTML(code.documentName || '')}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.versionNumLabel', 'رقم الإصدار *') : 'رقم الإصدار *'}</label>
                            <input type="text" id="version-number" required class="form-input" 
                                value="${Utils.escapeHTML(data?.versionNumber || '')}" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.versionNumPlaceholder', 'مثال: 1.0, 2.1') : 'مثال: 1.0, 2.1'}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.issueDateLabel', 'تاريخ الإصدار *') : 'تاريخ الإصدار *'}</label>
                            <input type="date" id="version-issue-date" required class="form-input" 
                                value="${data?.issueDate ? new Date(data.issueDate).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.revDateLabel', 'تاريخ التعديل') : 'تاريخ التعديل'}</label>
                            <input type="date" id="version-revision-date" class="form-input" 
                                value="${data?.revisionDate ? new Date(data.revisionDate).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.statusLabel', 'الحالة') : 'الحالة'}</label>
                            <select id="version-status" class="form-input">
                                <option value="نشط" ${data?.status === 'نشط' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.statusActive', 'نشط') : 'نشط'}</option>
                                <option value="معطل" ${data?.status === 'معطل' ? 'selected' : ''}>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.statusInactive', 'معطل') : 'معطل'}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.notesLabel', 'ملاحظة الإصدار') : 'ملاحظة الإصدار'}</label>
                            <textarea id="version-notes" class="form-input" rows="3" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.notesPlaceholder', 'ملاحظات حول هذا الإصدار') : 'ملاحظات حول هذا الإصدار'}">${Utils.escapeHTML(data?.notes || '')}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.changeReasonLabel', 'سبب التعديل (سجل التغييرات)') : 'سبب التعديل (سجل التغييرات)'}</label>
                            <input type="text" id="version-change-reason" class="form-input" 
                                value="${Utils.escapeHTML(data?.changeReason || '')}" 
                                placeholder="${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.changeReasonPlaceholder', 'مثال: تحديث الإجراء بناءً على المراجعة السنوية') : 'مثال: تحديث الإجراء بناءً على المراجعة السنوية'}">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.cancel', 'إلغاء') : 'إلغاء'}</button>
                    <button type="button" id="save-version-btn" class="btn-primary">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.save', 'حفظ') : 'حفظ'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const saveBtn = modal.querySelector('#save-version-btn');
        saveBtn.addEventListener('click', () => this.handleDocumentVersionSubmit(data?.id, modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async handleDocumentVersionSubmit(editId = null, modal) {
        // فحص العناصر قبل الاستخدام
        const codeIdEl = document.getElementById('version-code-id');
        const versionNumberEl = document.getElementById('version-number');
        const issueDateEl = document.getElementById('version-issue-date');
        const revisionDateEl = document.getElementById('version-revision-date');
        const statusEl = document.getElementById('version-status');
        const notesEl = document.getElementById('version-notes');
        const changeReasonEl = document.getElementById('version-change-reason');
        
        if (!codeIdEl || !versionNumberEl || !issueDateEl || !statusEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            return;
        }

        const codeId = codeIdEl.value;
        const code = await this.getDocumentCodeById(codeId);

        const formData = {
            id: editId || Utils.generateId('DOC_VER'),
            documentCodeId: codeId,
            documentCode: code?.code || '',
            versionNumber: versionNumberEl.value.trim(),
            issueDate: new Date(issueDateEl.value).toISOString(),
            revisionDate: revisionDateEl?.value
                ? new Date(revisionDateEl.value).toISOString()
                : null,
            status: statusEl.value,
            notes: notesEl?.value.trim() || '',
            changeReason: changeReasonEl?.value.trim() || '',
            isActive: statusEl.value === 'نشط',
            createdAt: editId ? (await this.getDocumentVersionById(editId))?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: AppState.currentUser?.name || AppState.currentUser?.email || 'System'
        };

        Loading.show();
        try {
            const action = editId ? 'updateDocumentVersion' : 'addDocumentVersion';
            const result = await GoogleIntegration.fetchData(action, formData);

            if (result.success) {
                Notification.success(editId ? 'تم تحديث الإصدار بنجاح' : 'تم إضافة الإصدار بنجاح');
                modal.remove();
                this.load();
            } else {
                Notification.error(result.message || 'حدث خطأ أثناء الحفظ');
            }
        } catch (error) {
            Notification.error('حدث خطأ: ' + error.message);
        } finally {
            Loading.hide();
        }
    },

    async getDocumentVersionById(id) {
        try {
            const result = await GoogleIntegration.fetchData('getDocumentVersions', { documentCodeId: null });
            if (result.success && result.data) {
                return result.data.find(v => v.id === id);
            }
        } catch (error) {
            Utils.safeError('Error getting document version:', error);
        }
        return null;
    },

    async editDocumentVersion(id) {
        const version = await this.getDocumentVersionById(id);
        if (version) {
            this.showDocumentVersionForm(version);
        } else {
            Notification.error('الإصدار غير موجود');
        }
    },

    async viewDocumentVersions(documentCodeId) {
        try {
            Loading.show();
            const result = await GoogleIntegration.fetchData('getDocumentVersions', { documentCodeId: documentCodeId });
            Loading.hide();

            if (!result.success || !result.data) {
                Notification.error(typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.fetchVersionsFailed', 'فشل جلب الإصدارات') : 'فشل جلب الإصدارات');
                return;
            }

            const versions = result.data;
            const code = await this.getDocumentCodeById(documentCodeId);

            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 800px;">
                    <div class="modal-header">
                        <h2 class="modal-title">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.versionsTitle', 'سجل التغييرات والإصدارات:') : 'سجل التغييرات والإصدارات:'} ${Utils.escapeHTML(code?.code || '')} - ${Utils.escapeHTML(code?.documentName || '')}</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-4">
                            <button class="btn-primary" onclick="ISO.showDocumentVersionForm(null, '${documentCodeId}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-plus ml-2"></i>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.actions.addVersion', 'إضافة إصدار جديد') : 'إضافة إصدار جديد'}
                            </button>
                        </div>
                        ${versions.length === 0 ? `
                            <div class="empty-state">
                                <p class="text-gray-500">${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.noVersions', 'لا توجد إصدارات لهذا المستند') : 'لا توجد إصدارات لهذا المستند'}</p>
                            </div>
                        ` : `
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.versionNumLabel', 'رقم الإصدار') : 'رقم الإصدار'}</th>
                                        <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.issueDateLabel', 'تاريخ الإصدار') : 'تاريخ الإصدار'}</th>
                                        <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.revDateLabel', 'تاريخ التعديل') : 'تاريخ التعديل'}</th>
                                        <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.statusLabel', 'الحالة') : 'الحالة'}</th>
                                        <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.notesLabel', 'ملاحظات') : 'ملاحظات'}</th>
                                        <th>${typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.changeReasonLabel', 'سبب التعديل') : 'سبب التعديل'}</th>
                                        <th>${typeof I18n !== 'undefined' ? I18n.t('core.table.actions', 'الإجراءات') : 'الإجراءات'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${versions.map(v => `
                                        <tr>
                                            <td><strong>${Utils.escapeHTML(v.versionNumber || '')}</strong></td>
                                            <td>${v.issueDate ? Utils.formatDate(v.issueDate) : '-'}</td>
                                            <td>${v.revisionDate ? Utils.formatDate(v.revisionDate) : '-'}</td>
                                            <td>
                                                <span class="badge badge-${v.isActive === true || v.isActive === 'true' ? 'success' : 'secondary'}">
                                                    ${v.isActive === true || v.isActive === 'true' ? (typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.statusActive', 'نشط') : 'نشط') : (typeof I18n !== 'undefined' ? I18n.t('module.iso.coding.form.statusInactive', 'غير نشط') : 'غير نشط')}
                                                </span>
                                            </td>
                                            <td>${Utils.escapeHTML(v.notes || '-')}</td>
                                            <td>${Utils.escapeHTML(v.changeReason || '-')}</td>
                                            <td>
                                                <button onclick="ISO.editDocumentVersion('${v.id}'); this.closest('.modal-overlay').remove();" 
                                                    class="btn-icon btn-icon-info" title="${typeof I18n !== 'undefined' ? I18n.t('module.iso.codingCenter.actions.edit', 'تعديل') : 'تعديل'}">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${typeof I18n !== 'undefined' ? I18n.t('core.buttons.close', 'إغلاق') : 'إغلاق'}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    async reissueDocument(versionId) {
        const version = await this.getDocumentVersionById(versionId);
        if (!version) {
            Notification.error('الإصدار غير موجود');
            return;
        }

        if (!confirm('هل تريد إغلاق هذا الإصدار وفتح إصدار جديد؟')) {
            return;
        }

        // عرض نموذج لإصدار جديد
        this.showDocumentVersionForm(null, version.documentCodeId);
    },

    filterDocumentCodes() {
        const searchTerm = document.getElementById('document-code-search')?.value.toLowerCase() || '';
        const rows = document.querySelectorAll('#document-codes-table-body tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    },

    filterDocumentVersions() {
        const codeId = document.getElementById('version-filter-code')?.value || '';
        const rows = document.querySelectorAll('#document-versions-table-body tr');
        rows.forEach(row => {
            const rowCodeId = row.getAttribute('data-code-id') || '';
            row.style.display = !codeId || rowCodeId === codeId ? '' : 'none';
        });
    },

    // دالة لجلب الإصدار تلقائياً عند اختيار الكود
    async loadDocumentCodeVersion(formType = 'document', code = null) {
        try {
            // تحديد معرفات الحقول حسب نوع النموذج
            const codeSelectId = formType === 'document' ? 'document-code-select' :
                formType === 'procedure' ? 'procedure-code-select' :
                    'form-code-select';
            const versionInputId = formType === 'document' ? 'document-version' :
                formType === 'procedure' ? 'procedure-version' :
                    'form-version';
            const issueDateInputId = formType === 'document' ? 'document-issue-date' :
                formType === 'procedure' ? 'procedure-issue-date' :
                    'form-issue-date';
            const revisionDateInputId = formType === 'document' ? 'document-revision-date' :
                formType === 'procedure' ? 'procedure-revision-date' :
                    'form-revision-date';

            const codeSelect = document.getElementById(codeSelectId);
            const selectedCode = code || codeSelect?.value || '';

            if (!selectedCode) {
                // مسح الحقول إذا لم يتم اختيار كود
                const versionInput = document.getElementById(versionInputId);
                const issueDateInput = document.getElementById(issueDateInputId);
                const revisionDateInput = document.getElementById(revisionDateInputId);

                if (versionInput) versionInput.value = '';
                if (issueDateInput) issueDateInput.value = '';
                if (revisionDateInput) revisionDateInput.value = '';
                return;
            }

            Loading.show();

            // جلب الكود والإصدار من المركز
            const result = await GoogleIntegration.fetchData('getDocumentCodeAndVersion', {
                documentCode: selectedCode
            });

            Loading.hide();

            if (result.success && result.version) {
                // ملء الحقول تلقائياً
                const versionInput = document.getElementById(versionInputId);
                const issueDateInput = document.getElementById(issueDateInputId);
                const revisionDateInput = document.getElementById(revisionDateInputId);

                if (versionInput) {
                    versionInput.value = result.version.versionNumber || '';
                }
                if (issueDateInput) {
                    issueDateInput.value = result.version.issueDate ? Utils.formatDate(result.version.issueDate) : '';
                }
                if (revisionDateInput) {
                    revisionDateInput.value = result.version.revisionDate ? Utils.formatDate(result.version.revisionDate) : '';
                }

                Notification.success('تم جلب بيانات الإصدار تلقائياً من المركز');
            } else if (result.success && result.code) {
                // الكود موجود ولكن لا يوجد إصدار نشط
                const versionInput = document.getElementById(versionInputId);
                if (versionInput) {
                    versionInput.value = 'غير محدد';
                }
                Notification.warning('الكود موجود ولكن لا يوجد إصدار نشط في المركز');
            } else {
                Notification.error('الكود غير موجود في مركز التكويد والإصدار');
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('Error loading document code version:', error);
            Notification.error('حدث خطأ أثناء جلب بيانات الإصدار: ' + error.message);
        }
    },

    /**
     * دالة مساعدة للحصول على تفاصيل كود مستند مع أحدث إصدار نشط (تُستخدم للربط الديناميكي مع النماذج الأخرى)
     * @param {string} codeString - الكود الثابت للنموذج (مثال: Form ICP (F14-26-01))
     */
    async getFormCodeDetails(codeString) {
        try {
            const [codesRes, versionsRes] = await Promise.all([
                GoogleIntegration.fetchData('getDocumentCodes', {}).catch(() => null),
                GoogleIntegration.fetchData('getDocumentVersions', { documentCodeId: null }).catch(() => null)
            ]);
            
            if (codesRes?.success && versionsRes?.success) {
                const code = codesRes.data.find(c => c.code === codeString || c.documentName === codeString);
                if (code) {
                    const activeVersions = versionsRes.data.filter(v => v.documentCodeId === code.id && (v.isActive === true || v.isActive === 'true'));
                    if (activeVersions.length > 0) {
                        activeVersions.sort((a, b) => new Date(b.issueDate || 0) - new Date(a.issueDate || 0));
                        return {
                            code: code.code,
                            documentName: code.documentName,
                            versionNumber: activeVersions[0].versionNumber,
                            issueDate: activeVersions[0].issueDate,
                            revisionDate: activeVersions[0].revisionDate,
                            changeReason: activeVersions[0].changeReason
                        };
                    }
                }
            }
        } catch (e) {
            if (typeof Utils !== 'undefined') Utils.safeWarn('Error fetching ISO code details:', e);
        }
        return null;
    }
};

// ===== Export module to global scope =====
// تصدير الموديول إلى window فوراً لضمان توافره
(function () {
    'use strict';
    try {
        if (typeof window !== 'undefined' && typeof ISO !== 'undefined') {
            window.ISO = ISO;
            
            // إشعار عند تحميل الموديول بنجاح
            if (typeof AppState !== 'undefined' && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ ISO module loaded and available on window.ISO');
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تصدير ISO:', error);
        // محاولة التصدير مرة أخرى حتى في حالة الخطأ
        if (typeof window !== 'undefined' && typeof ISO !== 'undefined') {
            try {
                window.ISO = ISO;
            } catch (e) {
                console.error('❌ فشل تصدير ISO:', e);
            }
        }
    }
})();