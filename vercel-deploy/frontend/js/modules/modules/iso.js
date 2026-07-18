/**
 * ISO Module
 * ØªÙ… Ø§Ø³ØªØ®Ø±Ø§Ø¬Ù‡ Ù…Ù† app-modules.js
 */
// ===== HSE Management System Module (نظام إدارة السلامة والصحة المهنية والبيئة) =====
const ISO = {
    currentTab: 'overview',

    SystemFormsManifest: [
        { id: 'ptw', name: 'تصريح العمل', module: 'PTW', type: 'نموذج', defaultCode: 'Form ICP (F14-26-01)', department: 'HSE' },
        { id: 'incident', name: 'تقرير الحوادث', module: 'Incidents', type: 'تقرير', defaultCode: 'INC-REP-01', department: 'HSE' },
        { id: 'nearmiss', name: 'تقرير الحوادث الوشيكة', module: 'NearMiss', type: 'تقرير', defaultCode: 'NM-REP-01', department: 'HSE' },
        { id: 'clinic', name: 'سجل الزيارات الطبية', module: 'Clinic', type: 'سجل', defaultCode: 'CLN-FRM-01', department: 'Medical' },
        { id: 'observation', name: 'الملاحظات اليومية', module: 'Observations', type: 'نموذج', defaultCode: 'OBS-FRM-01', department: 'HSE' },
        { id: 'risk', name: 'تقييم المخاطر (JHA)', module: 'RiskAssessment', type: 'نموذج', defaultCode: 'JHA-FRM-01', department: 'HSE' },
        { id: 'violation', name: 'إشعار مخالفة', module: 'Violations', type: 'نموذج', defaultCode: 'VIO-FRM-01', department: 'HSE' },
        { id: 'inspection', name: 'التفتيش الدوري', module: 'Inspections', type: 'نموذج', defaultCode: 'INSP-FRM-01', department: 'HSE' },
        { id: 'dscl', name: 'فحص السلامة اليومي', module: 'Daily Check List', type: 'نموذج', defaultCode: 'DSCL-FRM-01', department: 'HSE' },
        { id: 'tbt', name: 'اجتماع السلامة (TBT)', module: 'ToolBox Talk', type: 'نموذج', defaultCode: 'TBT-FRM-01', department: 'HSE' },
        { id: 'ppe', name: 'سجل مهمات الوقاية', module: 'PPE', type: 'سجل', defaultCode: 'PPE-REG-01', department: 'HSE' },
        { id: 'fire', name: 'تفتيش معدات الإطفاء', module: 'Fire Equipment', type: 'نموذج', defaultCode: 'FIRE-INSP-01', department: 'HSE' },
        { id: 'sds', name: 'صحيفة بيانات السلامة', module: 'Chemical Safety', type: 'وثيقة', defaultCode: 'SDS-DOC-01', department: 'HSE' },
        { id: 'moc', name: 'إدارة التغيير (MOC)', module: 'Change Management', type: 'نموذج', defaultCode: 'MOC-FRM-01', department: 'HSE' },
        { id: 'legal', name: 'المتطلبات القانونية', module: 'Legal Documents', type: 'سجل', defaultCode: 'LEG-REG-01', department: 'HSE' },
        { id: 'kpi', name: 'مؤشرات الأداء (KPIs)', module: 'Performance KPIs', type: 'تقرير', defaultCode: 'KPI-REP-01', department: 'HSE' },
        { id: 'training', name: 'سجل التدريب', module: 'Trainings', type: 'سجل', defaultCode: 'TRN-REG-01', department: 'HSE' },
        { id: 'audit', name: 'تقرير التدقيق', module: 'ISO / Audits', type: 'تقرير', defaultCode: 'AUD-REP-01', department: 'HSE' },
        { id: 'nc', name: 'تقرير عدم المطابقة (NC)', module: 'ISO / CAPA', type: 'نموذج', defaultCode: 'NC-FRM-01', department: 'HSE' },
        { id: 'ca', name: 'الإجراءات التصحيحية (CA)', module: 'ISO / CAPA', type: 'نموذج', defaultCode: 'CA-FRM-01', department: 'HSE' }
    ],

    renderIdentityStyles_() {
        return `
            <style id="iso-professional-identity-styles">
                .iso-workspace{--iso-petrol:#073b3a;--iso-petrol-2:#0b5551;--iso-teal:#0f766e;--iso-mint:#2db9a8;--iso-gold:#e4b64f;--iso-ink:#172334;--iso-muted:#64748b;--iso-line:#d8e6e3;--iso-surface:#fff;font-family:"Cairo","Segoe UI",Tahoma,sans-serif}
                .iso-workspace .iso-hero-header{position:relative;overflow:hidden;margin-bottom:18px;padding:22px 24px;border:1px solid rgba(255,255,255,.12);border-radius:18px;background:radial-gradient(circle at 8% 10%,rgba(228,182,79,.22),transparent 27%),linear-gradient(125deg,#052f31 0%,var(--iso-petrol-2) 68%,#0b6660 100%);color:#fff;box-shadow:0 18px 38px rgba(7,59,58,.22)}
                .iso-workspace .iso-hero-header:after{content:"ISO";position:absolute;inset-inline-end:24px;bottom:-20px;color:rgba(255,255,255,.055);font:900 6.4rem/1 "Segoe UI",sans-serif;letter-spacing:-.08em;pointer-events:none}
                .iso-workspace .iso-hero-header>div{position:relative;z-index:1;width:100%;gap:16px}.iso-workspace .iso-hero-header .section-title{display:flex;align-items:center;gap:11px;margin:0 0 5px;color:#fff!important;font-size:1.45rem;font-weight:900;text-shadow:0 2px 7px rgba(0,0,0,.22)}
                .iso-workspace .iso-hero-header .section-title i{display:inline-flex;align-items:center;justify-content:center;width:43px;height:43px;margin:0!important;border:1px solid rgba(255,255,255,.2);border-radius:12px;background:rgba(255,255,255,.12);color:#fde68a}.iso-workspace .iso-hero-header .section-subtitle{margin:0;color:rgba(255,255,255,.78)!important;font-size:.79rem;font-weight:600}
                .iso-workspace .iso-hero-header .btn-success{min-height:43px;padding-inline:17px;border:1px solid rgba(255,255,255,.45);border-radius:11px;background:#fff!important;color:var(--iso-petrol)!important;font-size:.8rem;font-weight:800;box-shadow:0 8px 20px rgba(0,0,0,.16)}
                .iso-workspace .iso-quick-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px;margin:0 0 18px!important}.iso-workspace .iso-stat-card{--stat-accent:var(--iso-teal);position:relative;overflow:hidden;min-height:108px;padding:16px 17px!important;border:1px solid var(--iso-line)!important;border-radius:15px!important;background:linear-gradient(145deg,#fff,#f5faf9)!important;text-align:start!important;box-shadow:0 9px 23px rgba(7,59,58,.075);transition:.2s ease}
                .iso-workspace .iso-stat-card:before{content:"";position:absolute;inset-block:0;inset-inline-start:0;width:4px;background:var(--stat-accent)}.iso-workspace .iso-stat-card:after{content:"";position:absolute;inset-inline-end:-24px;bottom:-30px;width:86px;height:86px;border-radius:50%;background:color-mix(in srgb,var(--stat-accent) 9%,transparent)}.iso-workspace .iso-stat-card:hover{border-color:#b7d1cc!important;box-shadow:0 13px 28px rgba(7,59,58,.12);transform:translateY(-2px)}
                .iso-workspace .iso-stat-card>div:first-child{position:relative;z-index:1;margin-bottom:5px!important;color:var(--stat-accent)!important;font:900 1.85rem/1.1 "Segoe UI","Cairo",sans-serif}.iso-workspace .iso-stat-card>div:last-child{position:relative;z-index:1;color:#425466!important;font-size:.75rem!important;font-weight:800!important}.iso-workspace .iso-stat-docs{--stat-accent:#2563eb}.iso-workspace .iso-stat-procedures{--stat-accent:#059669}.iso-workspace .iso-stat-forms{--stat-accent:#d97706}.iso-workspace .iso-stat-compliance{--stat-accent:#7c3aed}
                .iso-workspace .iso-tabs-shell{position:relative;overflow:hidden;padding:8px;border:1px solid rgba(255,255,255,.11);border-radius:18px;background:radial-gradient(circle at 92% 0%,rgba(45,185,168,.2),transparent 26%),linear-gradient(125deg,var(--iso-petrol),var(--iso-petrol-2));box-shadow:0 14px 32px rgba(7,59,58,.18)}
                .iso-workspace .iso-tabs-nav{position:relative;z-index:1;display:flex;flex-wrap:nowrap!important;gap:7px!important;margin:0!important;padding:0 0 2px!important;overflow-x:auto;border:0!important;background:transparent;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.36) transparent}.iso-workspace .iso-tabs-nav .tab-btn{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;min-height:48px;min-width:max-content;padding:10px 14px;gap:8px;border:1px solid rgba(255,255,255,.14);border-radius:11px;background:rgba(255,255,255,.075);color:rgba(255,255,255,.82);font-size:.8rem;font-weight:750;white-space:nowrap;box-shadow:none;transition:.18s ease}
                .iso-workspace .iso-tabs-nav .tab-btn:before{display:none}.iso-workspace .iso-tabs-nav .tab-btn i{display:inline-flex;align-items:center;justify-content:center;width:29px;height:29px;margin:0!important;border-radius:8px;background:rgba(255,255,255,.12);color:#a7f3d0;font-size:.76rem}.iso-workspace .iso-tabs-nav .tab-btn[data-tab=forms] i{color:#fde68a}.iso-workspace .iso-tabs-nav .tab-btn[data-tab=iso45001] i{color:#bfdbfe}.iso-workspace .iso-tabs-nav .tab-btn[data-tab=iso14001] i{color:#bbf7d0}.iso-workspace .iso-tabs-nav .tab-btn[data-tab=audit] i{color:#ddd6fe}
                .iso-workspace .iso-tabs-nav .tab-btn:hover{background:rgba(255,255,255,.14);color:#fff;transform:translateY(-1px)}.iso-workspace .iso-tabs-nav .tab-btn.active{border-color:#fff;background:#fff;color:var(--iso-petrol);box-shadow:0 8px 22px rgba(0,0,0,.18);transform:translateY(-1px)}.iso-workspace .iso-tabs-nav .tab-btn.active i{background:#e6f7f3;color:var(--iso-teal)}
                .iso-workspace .iso-tab-content{min-height:240px;margin-top:18px;animation:isoSurfaceIn .24s ease-out}@keyframes isoSurfaceIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}.iso-workspace .iso-tab-content .content-card{overflow:hidden!important;border:1px solid var(--iso-line)!important;border-radius:16px!important;background:var(--iso-surface)!important;box-shadow:0 10px 28px rgba(7,59,58,.08)!important;transform:none!important}.iso-workspace .iso-tab-content .content-card:hover{box-shadow:0 14px 32px rgba(7,59,58,.11)!important;transform:none!important}
                .iso-workspace .iso-tab-content .card-header{position:relative;padding:17px 20px!important;border-bottom:1px solid #d8e6e3!important;background:linear-gradient(115deg,#eaf5f3,#fff 66%,#f7fbfa)!important;color:var(--iso-petrol)!important}.iso-workspace .iso-tab-content .card-header:before{content:"";position:absolute;inset-block:0;inset-inline-start:0;width:5px;background:linear-gradient(180deg,var(--iso-mint),var(--iso-teal))}.iso-workspace .iso-tab-content[data-tab=documents] .card-header:before{background:linear-gradient(#60a5fa,#2563eb)}.iso-workspace .iso-tab-content[data-tab=procedures] .card-header:before{background:linear-gradient(#34d399,#059669)}.iso-workspace .iso-tab-content[data-tab=forms] .card-header:before{background:linear-gradient(#fbbf24,#d97706)}.iso-workspace .iso-tab-content[data-tab=iso45001] .card-header:before{background:linear-gradient(#38bdf8,#0369a1)}.iso-workspace .iso-tab-content[data-tab=iso14001] .card-header:before{background:linear-gradient(#4ade80,#15803d)}.iso-workspace .iso-tab-content[data-tab=audit] .card-header:before{background:linear-gradient(#a78bfa,#6d28d9)}.iso-workspace .iso-tab-content[data-tab=coding-center] .card-header:before{background:linear-gradient(#facc15,#a16207)}
                .iso-workspace .iso-tab-content .card-title{color:var(--iso-petrol)!important;font-size:1rem!important;font-weight:850!important}.iso-workspace .iso-tab-content .card-header p{color:var(--iso-muted)!important}.iso-workspace .iso-tab-content .card-header button{min-height:39px;border:1px solid #b9d3ce!important;border-radius:10px!important;background:#fff!important;color:var(--iso-petrol)!important;font-size:.76rem;font-weight:800;box-shadow:0 5px 13px rgba(7,59,58,.1)!important}
                .iso-workspace .iso-tab-content .form-input,.iso-workspace .iso-tab-content input:not([type=checkbox]):not([type=radio]):not([type=file]),.iso-workspace .iso-tab-content select{border-color:#c6d9d5;border-radius:10px}.iso-workspace .iso-tab-content .form-input:focus,.iso-workspace .iso-tab-content input:not([type=checkbox]):not([type=radio]):not([type=file]):focus,.iso-workspace .iso-tab-content select:focus{border-color:var(--iso-teal);box-shadow:0 0 0 3px rgba(15,118,110,.12);outline:none}
                .iso-workspace .iso-tab-content .overflow-x-auto:has(>table),.iso-workspace .iso-tab-content .table-responsive:has(>table){overflow:auto;border:1px solid #d7e5e2;border-radius:13px;background:#fff;scrollbar-width:thin;scrollbar-color:#8eb2ab #edf5f3}.iso-workspace .iso-tab-content table{width:100%;margin:0;border:0!important;border-collapse:separate!important;border-spacing:0;color:var(--iso-ink);font-size:.78rem}.iso-workspace .iso-tab-content table thead th{position:sticky;top:0;z-index:3;padding:13px 12px!important;border:0!important;border-inline-end:1px solid rgba(255,255,255,.11)!important;border-bottom:3px solid var(--iso-gold)!important;border-radius:0!important;background:linear-gradient(var(--iso-petrol-2),var(--iso-petrol))!important;color:#fff!important;font-size:.73rem!important;font-weight:850!important;line-height:1.5;text-align:center!important;white-space:nowrap}.iso-workspace .iso-tab-content table tbody td{padding:11px 12px!important;border:0!important;border-inline-end:1px solid #edf3f2!important;border-bottom:1px solid #e4eeec!important;background:#fff;color:var(--iso-ink);vertical-align:middle;line-height:1.65}.iso-workspace .iso-tab-content table tbody tr:nth-child(even) td{background:#f7fbfa}.iso-workspace .iso-tab-content table tbody tr:hover td{background:#fff9e9!important}.iso-workspace .iso-tab-content table button{display:inline-flex;align-items:center;justify-content:center;min-width:34px;min-height:34px;border-radius:9px!important}
                [data-theme=dark] .iso-workspace{--iso-ink:#e5efed;--iso-muted:#abc0bc;--iso-line:#365b57;--iso-surface:#142927}[data-theme=dark] .iso-workspace .iso-stat-card,[data-theme=dark] .iso-workspace .iso-tab-content .content-card,[data-theme=dark] .iso-workspace .iso-tab-content .card-header{background:#142927!important;color:#e5efed!important}[data-theme=dark] .iso-workspace .iso-stat-card>div:last-child,[data-theme=dark] .iso-workspace .iso-tab-content .card-title,[data-theme=dark] .iso-workspace .iso-tab-content .card-header p{color:#e5efed!important}[data-theme=dark] .iso-workspace .iso-tab-content table tbody td{border-color:#2e4c49!important;background:#142927;color:#e5efed}[data-theme=dark] .iso-workspace .iso-tab-content table tbody tr:nth-child(even) td{background:#18312f}[data-theme=dark] .iso-workspace .iso-tab-content table tbody tr:hover td{background:#38412d!important}
                @media(max-width:980px){.iso-workspace .iso-quick-stats{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:768px){.iso-workspace .iso-hero-header{padding:18px;border-radius:15px}.iso-workspace .iso-hero-header>div{align-items:flex-start;flex-direction:column}.iso-workspace .iso-hero-header .btn-success{width:100%}.iso-workspace .iso-tabs-shell{padding:6px;border-radius:14px}.iso-workspace .iso-tabs-nav .tab-btn{min-height:43px;padding:8px 11px;font-size:.74rem}.iso-workspace .iso-tabs-nav .tab-btn i{width:26px;height:26px}.iso-workspace .iso-tab-content .card-header{align-items:flex-start!important;gap:12px;flex-direction:column!important}.iso-workspace .iso-tab-content .card-header button{width:100%;justify-content:center}.iso-workspace .iso-tab-content .card-body{padding:13px}}@media(max-width:480px){.iso-workspace .iso-quick-stats{grid-template-columns:1fr}.iso-workspace .iso-stat-card{min-height:92px}.iso-workspace .iso-hero-header:after{display:none}}@media(prefers-reduced-motion:reduce){.iso-workspace *,.iso-workspace :before,.iso-workspace :after{transition:none!important;animation:none!important}}
            </style>
        `;
    },

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
            ${this.renderIdentityStyles_()}
            <div class="iso-workspace">
            <div class="section-header iso-hero-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-shield-alt ml-3"></i>
                            نظام إدارة السلامة والصحة المهنية والبيئة
                        </h1>
                        <p class="section-subtitle">HSE Management System - متوافق مع ISO 45001 & ISO 14001</p>
                    </div>
                    <button id="export-compliance-report-btn" class="btn-success">
                        <i class="fas fa-file-pdf ml-2"></i>تقرير الامتثال PDF
                    </button>
                </div>
            </div>
            
            <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 iso-quick-stats">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center iso-stat-card iso-stat-docs">
                    <div class="text-3xl font-bold text-blue-600 mb-2">${(AppState.appData.isoDocuments || []).length}</div>
                    <div class="text-sm text-gray-700 font-semibold">الوثائق</div>
                </div>
                <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center iso-stat-card iso-stat-procedures">
                    <div class="text-3xl font-bold text-green-600 mb-2">${(AppState.appData.isoProcedures || []).length}</div>
                    <div class="text-sm text-gray-700 font-semibold">الإجراءات</div>
                </div>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center iso-stat-card iso-stat-forms">
                    <div class="text-3xl font-bold text-yellow-600 mb-2">${(AppState.appData.isoForms || []).length}</div>
                    <div class="text-sm text-gray-700 font-semibold">النماذج</div>
                </div>
                <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center iso-stat-card iso-stat-compliance">
                    <div class="text-3xl font-bold text-purple-600 mb-2">${this.calculateComplianceRate()}%</div>
                    <div class="text-sm text-gray-700 font-semibold">معدل الامتثال</div>
                </div>
            </div>
            
            <div class="mt-6 iso-tabs-shell">
                <div class="flex gap-2 mb-6 border-b iso-tabs-nav" role="tablist" aria-label="تبويبات نظام ISO">
                    <button class="tab-btn ${this.currentTab === 'overview' ? 'active' : ''}" role="tab" aria-selected="${this.currentTab === 'overview' ? 'true' : 'false'}" data-tab="overview">
                        <i class="fas fa-chart-pie ml-2"></i>نظرة عامة
                    </button>
                    <button class="tab-btn ${this.currentTab === 'documents' ? 'active' : ''}" role="tab" aria-selected="${this.currentTab === 'documents' ? 'true' : 'false'}" data-tab="documents">
                        <i class="fas fa-file-alt ml-2"></i>الوثائق
                    </button>
                    <button class="tab-btn ${this.currentTab === 'procedures' ? 'active' : ''}" role="tab" aria-selected="${this.currentTab === 'procedures' ? 'true' : 'false'}" data-tab="procedures">
                        <i class="fas fa-tasks ml-2"></i>الإجراءات
                    </button>
                    <button class="tab-btn ${this.currentTab === 'forms' ? 'active' : ''}" role="tab" aria-selected="${this.currentTab === 'forms' ? 'true' : 'false'}" data-tab="forms">
                        <i class="fas fa-file-signature ml-2"></i>النماذج
                    </button>
                    <button class="tab-btn ${this.currentTab === 'iso45001' ? 'active' : ''}" role="tab" aria-selected="${this.currentTab === 'iso45001' ? 'true' : 'false'}" data-tab="iso45001">
                        <i class="fas fa-hard-hat ml-2"></i>ISO 45001
                    </button>
                    <button class="tab-btn ${this.currentTab === 'iso14001' ? 'active' : ''}" role="tab" aria-selected="${this.currentTab === 'iso14001' ? 'true' : 'false'}" data-tab="iso14001">
                        <i class="fas fa-leaf ml-2"></i>ISO 14001
                    </button>
                    <button class="tab-btn ${this.currentTab === 'audit' ? 'active' : ''}" role="tab" aria-selected="${this.currentTab === 'audit' ? 'true' : 'false'}" data-tab="audit">
                        <i class="fas fa-clipboard-check ml-2"></i>التدقيق والمراجعة
                    </button>
                    <button class="tab-btn ${this.currentTab === 'coding-center' ? 'active' : ''}" role="tab" aria-selected="${this.currentTab === 'coding-center' ? 'true' : 'false'}" data-tab="coding-center">
                        <i class="fas fa-code ml-2"></i>مركز التكويد والإصدار
                    </button>
                </div>
                <div id="iso-content" class="iso-tab-content" data-tab="${this.currentTab}">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500">جاري تحميل المحتوى...</p>
                            </div>
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
                            <p class="text-sm font-medium text-gray-500 mb-1">إجمالي الوثائق</p>
                            <h3 class="text-3xl font-bold text-gray-800">${totalDocs}</h3>
                        </div>
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <i class="fas fa-file-alt text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4 text-xs text-gray-500 flex items-center">
                        <span class="text-blue-600 font-semibold ml-1">${procedures.length}</span> إجراءات | 
                        <span class="text-indigo-600 font-semibold mx-1">${forms.length}</span> نماذج
                    </div>
                </div>

                <!-- KPI 2 -->
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                    <div class="absolute -right-4 -top-4 w-24 h-24 bg-red-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div class="flex justify-between items-start relative z-10">
                        <div>
                            <p class="text-sm font-medium text-gray-500 mb-1">حالات عدم المطابقة المفتوحة</p>
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
                            <p class="text-sm font-medium text-gray-500 mb-1">عمليات تدقيق قادمة</p>
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
                            <p class="text-sm font-medium text-gray-500 mb-1">إجراءات تصحيحية مفتوحة</p>
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
                            <h2 class="text-lg font-bold text-gray-800"><i class="fas fa-shield-check text-blue-600 ml-2"></i>مستوى الامتثال للنظام (QMS Health)</h2>
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
                                    <p class="text-xs text-gray-600 mb-3">نظام إدارة السلامة والصحة المهنية</p>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-gray-500">المتطلبات</span>
                                        <span class="font-semibold text-blue-700">مغطاة</span>
                                    </div>
                                </div>
                                <div class="border border-green-100 bg-green-50/30 rounded-xl p-4 hover:shadow-sm transition-all">
                                    <h3 class="font-bold text-green-800 mb-2 flex items-center">
                                        <i class="fas fa-leaf text-green-500 ml-2"></i> ISO 14001
                                    </h3>
                                    <p class="text-xs text-gray-600 mb-3">نظام الإدارة البيئية</p>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-gray-500">المتطلبات</span>
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
                            <i class="fas fa-bell text-rose-500 ml-2 animate-pulse"></i>مهام تتطلب الانتباه
                        </h2>
                    </div>
                    <div class="p-0 flex-1 overflow-y-auto" style="max-height: 400px;">
                        <ul class="divide-y divide-gray-100">
                            ${openNCs > 0 ? `
                            <li class="p-4 hover:bg-gray-50 transition-colors flex items-start gap-3 cursor-pointer" onclick="ISO.currentTab = 'audit'; ISO.load();">
                                <div class="mt-0.5 bg-red-100 text-red-600 p-2 rounded-lg"><i class="fas fa-exclamation-circle"></i></div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-800">يوجد ${openNCs} حالة عدم مطابقة مفتوحة</p>
                                    <p class="text-xs text-gray-500 mt-1">يجب مراجعتها وإغلاقها لتجنب التأثير على مستوى الامتثال.</p>
                                </div>
                            </li>
                            ` : ''}
                            
                            ${pendingAudits > 0 ? `
                            <li class="p-4 hover:bg-gray-50 transition-colors flex items-start gap-3 cursor-pointer" onclick="ISO.currentTab = 'audit'; ISO.load();">
                                <div class="mt-0.5 bg-purple-100 text-purple-600 p-2 rounded-lg"><i class="fas fa-calendar-alt"></i></div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-800">يوجد ${pendingAudits} عملية تدقيق قادمة</p>
                                    <p class="text-xs text-gray-500 mt-1">يرجى مراجعة الجدول الزمني وتجهيز الوثائق المطلوبة.</p>
                                </div>
                            </li>
                            ` : ''}
                            
                            ${openActions > 0 ? `
                            <li class="p-4 hover:bg-gray-50 transition-colors flex items-start gap-3 cursor-pointer" onclick="ISO.currentTab = 'audit'; ISO.load();">
                                <div class="mt-0.5 bg-amber-100 text-amber-600 p-2 rounded-lg"><i class="fas fa-tools"></i></div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-800">يوجد ${openActions} إجراء تصحيحي معلق</p>
                                    <p class="text-xs text-gray-500 mt-1">تابع مع المسؤولين لإغلاق الإجراءات التصحيحية المفتوحة.</p>
                                </div>
                            </li>
                            ` : ''}
                            
                            ${(openNCs === 0 && pendingAudits === 0 && openActions === 0) ? `
                            <li class="p-8 text-center flex flex-col items-center justify-center">
                                <div class="bg-green-50 text-green-500 p-4 rounded-full mb-3"><i class="fas fa-check-double text-2xl"></i></div>
                                <p class="text-gray-600 font-semibold text-sm">النظام في حالة ممتازة</p>
                                <p class="text-gray-400 text-xs mt-1">لا توجد أي مهام متأخرة أو معلقة تتطلب الانتباه حالياً.</p>
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
                            <h2 class="card-title text-white m-0 text-xl font-bold">إدارة الوثائق (Document Control)</h2>
                            <p class="text-blue-100 text-sm m-0 opacity-80">سجل الوثائق المعتمدة في النظام</p>
                        </div>
                    </div>
                    <button id="add-document-btn" class="btn bg-white text-blue-700 hover:bg-blue-50 border-0 shadow-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all hover:shadow-md">
                        <i class="fas fa-plus"></i>إضافة وثيقة
                    </button>
                </div>
                <div class="card-body p-0">
                    ${documents.length === 0 ? `
                        <div class="p-12 text-center flex flex-col items-center justify-center bg-gray-50/50">
                            <div class="w-20 h-20 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mb-4"><i class="fas fa-folder-open text-3xl"></i></div>
                            <h3 class="text-gray-700 font-bold text-lg mb-1">لا توجد وثائق مسجلة</h3>
                            <p class="text-gray-500 text-sm">قم بإضافة أول وثيقة لبدء بناء مكتبة النظام</p>
                        </div>
                    ` : `
                        <div class="overflow-x-auto p-4">
                            <table class="w-full text-right border-collapse">
                                <thead>
                                    <tr class="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                                        <th class="p-3 font-semibold text-right rounded-tr-lg">كود ISO</th>
                                        <th class="p-3 font-semibold text-right">اسم الوثيقة</th>
                                        <th class="p-3 font-semibold text-right">النوع</th>
                                        <th class="p-3 font-semibold text-center">الإصدار</th>
                                        <th class="p-3 font-semibold text-center">الحالة</th>
                                        <th class="p-3 font-semibold text-center rounded-tl-lg">الإجراءات</th>
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
                            <h2 class="card-title text-white m-0 text-xl font-bold">إدارة الإجراءات (Procedures)</h2>
                            <p class="text-emerald-100 text-sm m-0 opacity-80">إجراءات العمل القياسية (SOPs)</p>
                        </div>
                    </div>
                    <button id="add-procedure-btn" class="btn bg-white text-emerald-700 hover:bg-emerald-50 border-0 shadow-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all hover:shadow-md">
                        <i class="fas fa-plus"></i>إضافة إجراء
                    </button>
                </div>
                <div class="card-body p-0">
                    ${procedures.length === 0 ? `
                        <div class="p-12 text-center flex flex-col items-center justify-center bg-gray-50/50">
                            <div class="w-20 h-20 bg-emerald-50 text-emerald-300 rounded-full flex items-center justify-center mb-4"><i class="fas fa-network-wired text-3xl"></i></div>
                            <h3 class="text-gray-700 font-bold text-lg mb-1">لا توجد إجراءات مسجلة</h3>
                            <p class="text-gray-500 text-sm">قم بإضافة أول إجراء (SOP) لتنظيم العمل</p>
                        </div>
                    ` : `
                        <div class="overflow-x-auto p-4">
                            <table class="w-full text-right border-collapse">
                                <thead>
                                    <tr class="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                                        <th class="p-3 font-semibold text-right rounded-tr-lg">كود الإجراء</th>
                                        <th class="p-3 font-semibold text-right">اسم الإجراء</th>
                                        <th class="p-3 font-semibold text-right">القسم المالك</th>
                                        <th class="p-3 font-semibold text-center">المراجعة القادمة</th>
                                        <th class="p-3 font-semibold text-center rounded-tl-lg">الإجراءات</th>
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
                            <h2 class="card-title text-white m-0 text-xl font-bold">النماذج القياسية (Forms)</h2>
                            <p class="text-amber-100 text-sm m-0 opacity-80">سجل النماذج المعتمدة لجمع البيانات</p>
                        </div>
                    </div>
                    <button id="add-form-btn" class="btn bg-white text-orange-700 hover:bg-orange-50 border-0 shadow-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all hover:shadow-md">
                        <i class="fas fa-plus"></i>إضافة نموذج
                    </button>
                </div>
                <div class="card-body p-0">
                    ${forms.length === 0 ? `
                        <div class="p-12 text-center flex flex-col items-center justify-center bg-gray-50/50">
                            <div class="w-20 h-20 bg-orange-50 text-orange-300 rounded-full flex items-center justify-center mb-4"><i class="fas fa-clipboard-list text-3xl"></i></div>
                            <h3 class="text-gray-700 font-bold text-lg mb-1">لا توجد نماذج مسجلة</h3>
                            <p class="text-gray-500 text-sm">قم بإضافة أول نموذج ليكون متاحاً للطباعة والاستخدام</p>
                        </div>
                    ` : `
                        <div class="overflow-x-auto p-4">
                            <table class="w-full text-right border-collapse">
                                <thead>
                                    <tr class="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                                        <th class="p-3 font-semibold text-right rounded-tr-lg">الكود المرجعي</th>
                                        <th class="p-3 font-semibold text-right">اسم النموذج</th>
                                        <th class="p-3 font-semibold text-right">نوع النموذج</th>
                                        <th class="p-3 font-semibold text-center rounded-tl-lg">الإجراءات</th>
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
            const tabs = document.querySelectorAll('.iso-tabs-nav .tab-btn');
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
                    <h2 class="modal-title">${data ? 'تعديل وثيقة' : 'إضافة وثيقة جديدة'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="iso-document-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">كود المستند من المركز *</label>
                            <select id="document-code-select" required class="form-input" 
                                onchange="ISO.loadDocumentCodeVersion('document')">
                                <option value="">اختر الكود من مركز التكويد والإصدار</option>
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
                                يجب اختيار الكود من مركز التكويد والإصدار. الإصدار سيُسحب تلقائياً.
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">اسم الوثيقة *</label>
                            <input type="text" id="document-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.name || '')}" placeholder="اسم الوثيقة">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">النوع *</label>
                            <select id="document-type" required class="form-input">
                                <option value="">اختر النوع</option>
                                <option value="سياسة" ${data?.type === 'سياسة' ? 'selected' : ''}>سياسة</option>
                                <option value="إجراء" ${data?.type === 'إجراء' ? 'selected' : ''}>إجراء</option>
                                <option value="تعليمات" ${data?.type === 'تعليمات' ? 'selected' : ''}>تعليمات</option>
                                <option value="دليل" ${data?.type === 'دليل' ? 'selected' : ''}>دليل</option>
                                <option value="أخرى" ${data?.type === 'أخرى' ? 'selected' : ''}>أخرى</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">رقم الإصدار (يُسحب تلقائياً من المركز)</label>
                            <input type="text" id="document-version" readonly class="form-input bg-gray-100" 
                                value="${Utils.escapeHTML(data?.version || '')}" placeholder="سيتم جلب الإصدار تلقائياً">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ الإصدار</label>
                            <input type="text" id="document-issue-date" readonly class="form-input bg-gray-100" 
                                value="${data?.issueDate ? Utils.formatDate(data.issueDate) : ''}" placeholder="سيتم جلب تاريخ الإصدار تلقائياً">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ التعديل</label>
                            <input type="text" id="document-revision-date" readonly class="form-input bg-gray-100" 
                                value="${data?.revisionDate ? Utils.formatDate(data.revisionDate) : ''}" placeholder="سيتم جلب تاريخ التعديل تلقائياً">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">القسم *</label>
                            <input type="text" id="document-department" required class="form-input" 
                                value="${Utils.escapeHTML(data?.department || '')}" placeholder="القسم">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button type="button" id="save-document-btn" class="btn-primary">حفظ</button>
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
                    <h2 class="modal-title">${data ? 'تعديل إجراء' : 'إضافة إجراء جديد'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="iso-procedure-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">كود الإجراء من المركز *</label>
                            <select id="procedure-code-select" required class="form-input" 
                                onchange="ISO.loadDocumentCodeVersion('procedure')">
                                <option value="">اختر الكود من مركز التكويد والإصدار</option>
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
                                يجب اختيار الكود من مركز التكويد والإصدار. الإصدار سيُسحب تلقائياً.
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">اسم الإجراء *</label>
                            <input type="text" id="procedure-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.name || '')}" placeholder="اسم الإجراء">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">القسم *</label>
                            <input type="text" id="procedure-department" required class="form-input" 
                                value="${Utils.escapeHTML(data?.department || '')}" placeholder="القسم">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">رقم الإصدار (يُسحب تلقائياً من المركز)</label>
                            <input type="text" id="procedure-version" readonly class="form-input bg-gray-100" 
                                value="${Utils.escapeHTML(data?.version || '')}" placeholder="سيتم جلب الإصدار تلقائياً">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ الإصدار</label>
                            <input type="text" id="procedure-issue-date" readonly class="form-input bg-gray-100" 
                                value="${data?.issueDate ? Utils.formatDate(data.issueDate) : ''}" placeholder="سيتم جلب تاريخ الإصدار تلقائياً">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ التعديل</label>
                            <input type="text" id="procedure-revision-date" readonly class="form-input bg-gray-100" 
                                value="${data?.revisionDate ? Utils.formatDate(data.revisionDate) : ''}" placeholder="سيتم جلب تاريخ التعديل تلقائياً">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button type="button" id="save-procedure-btn" class="btn-primary">حفظ</button>
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
                    <h2 class="modal-title">${data ? 'تعديل نموذج' : 'إضافة نموذج جديد'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="iso-form-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">كود النموذج من المركز *</label>
                            <select id="form-code-select" required class="form-input" 
                                onchange="ISO.loadDocumentCodeVersion('form')">
                                <option value="">اختر الكود من مركز التكويد والإصدار</option>
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
                                يجب اختيار الكود من مركز التكويد والإصدار. الإصدار سيُسحب تلقائياً.
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">اسم النموذج *</label>
                            <input type="text" id="form-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.name || '')}" placeholder="اسم النموذج">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">النوع *</label>
                            <select id="form-type" required class="form-input">
                                <option value="">اختر النوع</option>
                                <option value="تسجيل" ${data?.type === 'تسجيل' ? 'selected' : ''}>تسجيل</option>
                                <option value="تقرير" ${data?.type === 'تقرير' ? 'selected' : ''}>تقرير</option>
                                <option value="حص" ${data?.type === 'حص' ? 'selected' : ''}>حص</option>
                                <option value="تدريب" ${data?.type === 'تدريب' ? 'selected' : ''}>تدريب</option>
                                <option value="أخرى" ${data?.type === 'أخرى' ? 'selected' : ''}>أخرى</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">رقم الإصدار (يُسحب تلقائياً من المركز)</label>
                            <input type="text" id="form-version" readonly class="form-input bg-gray-100" 
                                value="${Utils.escapeHTML(data?.version || '')}" placeholder="سيتم جلب الإصدار تلقائياً">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ الإصدار</label>
                            <input type="text" id="form-issue-date" readonly class="form-input bg-gray-100" 
                                value="${data?.issueDate ? Utils.formatDate(data.issueDate) : ''}" placeholder="سيتم جلب تاريخ الإصدار تلقائياً">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ التعديل</label>
                            <input type="text" id="form-revision-date" readonly class="form-input bg-gray-100" 
                                value="${data?.revisionDate ? Utils.formatDate(data.revisionDate) : ''}" placeholder="سيتم جلب تاريخ التعديل تلقائياً">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button type="button" id="save-form-btn" class="btn-primary">حفظ</button>
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
            Notification.error('الوثيقة غير موجودة');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">تفاصيل الوثيقة</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>كود ISO:</strong> ${Utils.escapeHTML(doc.isoCode || '')}</div>
                        <div><strong>اسم الوثيقة:</strong> ${Utils.escapeHTML(doc.name || '')}</div>
                        <div><strong>النوع:</strong> ${Utils.escapeHTML(doc.type || '')}</div>
                        <div><strong>الإصدار:</strong> ${Utils.escapeHTML(doc.version || '')}</div>
                        <div><strong>القسم:</strong> ${Utils.escapeHTML(doc.department || '')}</div>
                        <div><strong>تاريخ الإنشاء:</strong> ${Utils.formatDate(doc.createdAt)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                    <button type="button" onclick="ISO.showDocumentForm(${JSON.stringify(doc).replace(/"/g, '&quot;')}); this.closest('.modal-overlay').remove();" class="btn-primary">تعديل</button>
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
            Notification.error('الإجراء غير موجود');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">تفاصيل الإجراء</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>كود ISO:</strong> ${Utils.escapeHTML(procedure.isoCode || '')}</div>
                        <div><strong>اسم الإجراء:</strong> ${Utils.escapeHTML(procedure.name || '')}</div>
                        <div><strong>القسم:</strong> ${Utils.escapeHTML(procedure.department || '')}</div>
                        <div><strong>الإصدار:</strong> ${Utils.escapeHTML(procedure.version || '')}</div>
                        <div><strong>تاريخ الإنشاء:</strong> ${Utils.formatDate(procedure.createdAt)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                    <button type="button" onclick="ISO.showProcedureForm(${JSON.stringify(procedure).replace(/"/g, '&quot;')}); this.closest('.modal-overlay').remove();" class="btn-primary">تعديل</button>
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
            Notification.error('النموذج غير موجود');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">تفاصيل النموذج</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>كود ISO:</strong> ${Utils.escapeHTML(form.isoCode || '')}</div>
                        <div><strong>اسم النموذج:</strong> ${Utils.escapeHTML(form.name || '')}</div>
                        <div><strong>النوع:</strong> ${Utils.escapeHTML(form.type || '')}</div>
                        <div><strong>تاريخ الإنشاء:</strong> ${Utils.formatDate(form.createdAt)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                    <button type="button" onclick="ISO.showFormForm(${JSON.stringify(form).replace(/"/g, '&quot;')}); this.closest('.modal-overlay').remove();" class="btn-primary">تعديل</button>
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
                    <h2 class="card-title"><i class="fas fa-hard-hat ml-2"></i>ISO 45001 - السلامة والصحة المهنية</h2>
                </div>
                <div class="card-body">
                    <div class="space-y-4">
                        <p class="text-gray-700">
                            يركز هذا القسم على متطلبات نظام إدارة السلامة والصحة المهنية (OH&S) وقًا لمعيار ISO 45001.
                            يهد إلى تمكين المنظمة من توير أماكن عمل آمنة وصحية، ومنع الإصابات والأمراض المرتبطة بالعمل،
                            بالإضاة إلى التحسين المستمر لأداء السلامة والصحة المهنية.
                        </p>
                        <h3 class="font-semibold text-lg mt-4 mb-2">العناصر الرئيسية:</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-2">
                            <li>السياق التنظيمي</li>
                            <li>القيادة ومشاركة العاملين</li>
                            <li>التخطيط (تحديد المخاطر والرص، الأهدا)</li>
                            <li>الدعم (الموارد، الكاءة، الوعي، الاتصال، المعلومات الموثقة)</li>
                            <li>التشغيل (التخطيط والتحكم التشغيلي، إدارة التغيير، المشتريات، المقاولون، الاستعداد للطوارئ)</li>
                            <li>تقييم الأداء (المراقبة والقياس، تقييم الامتثال، التدقيق الداخلي، مراجعة الإدارة)</li>
                            <li>التحسين (عدم المطابقة والإجراءات التصحيحية، التحسين المستمر)</li>
                        </ul>
                        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-blue-50 border border-blue-200 rounded p-4">
                                <h4 class="font-semibold text-blue-800 mb-2">الأهدا (${objectives.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">إدارة أهدا السلامة والصحة المهنية</p>
                                <button class="btn-secondary w-full" onclick="ISO.showHSEObjectiveForm()">
                                    <i class="fas fa-bullseye ml-2"></i>إدارة الأهدا
                                </button>
                            </div>
                            <div class="bg-green-50 border border-green-200 rounded p-4">
                                <h4 class="font-semibold text-green-800 mb-2">تقييمات المخاطر (${riskAssessments.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">تقييم مخاطر السلامة والصحة المهنية</p>
                                <button class="btn-secondary w-full" onclick="ISO.showHSERiskAssessmentForm()">
                                    <i class="fas fa-shield-alt ml-2"></i>تقييم المخاطر
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
                    <h2 class="card-title"><i class="fas fa-leaf ml-2"></i>ISO 14001 - إدارة البيئة</h2>
                </div>
                <div class="card-body">
                    <div class="space-y-4">
                        <p class="text-gray-700">
                            يحدد هذا القسم متطلبات نظام إدارة البيئة (EMS) وقًا لمعيار ISO 14001.
                            يهد إلى مساعدة المنظمات على تحسين أدائها البيئي من خلال إدارة مسؤولياتها البيئية
                            بطريقة منهجية تساهم ي ركيزة الاستدامة.
                        </p>
                        <h3 class="font-semibold text-lg mt-4 mb-2">العناصر الرئيسية:</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-2">
                            <li>السياق التنظيمي</li>
                            <li>القيادة</li>
                            <li>التخطيط (تحديد الجوانب البيئية، الالتزامات الامتثالية، الأهدا البيئية)</li>
                            <li>الدعم (الموارد، الكاءة، الوعي، الاتصال، المعلومات الموثقة)</li>
                            <li>التشغيل (التخطيط والتحكم التشغيلي، الاستعداد للطوارئ والاستجابة لها)</li>
                            <li>تقييم الأداء (المراقبة والقياس، تقييم الامتثال، التدقيق الداخلي، مراجعة الإدارة)</li>
                            <li>التحسين (عدم المطابقة والإجراءات التصحيحية، التحسين المستمر)</li>
                        </ul>
                        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-green-50 border border-green-200 rounded p-4">
                                <h4 class="font-semibold text-green-800 mb-2">الجوانب البيئية (${aspects.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">إدارة الجوانب البيئية وتأثيراتها</p>
                                <button class="btn-secondary w-full" onclick="ISO.showEnvironmentalAspectsForm()">
                                    <i class="fas fa-globe ml-2"></i>إدارة الجوانب البيئية
                                </button>
                            </div>
                            <div class="bg-blue-50 border border-blue-200 rounded p-4">
                                <h4 class="font-semibold text-blue-800 mb-2">المراقبة البيئية (${monitoring.length})</h4>
                                <p class="text-sm text-gray-700 mb-3">تتبع ومراقبة الأداء البيئي</p>
                                <button class="btn-secondary w-full" onclick="ISO.showEnvironmentalMonitoringForm()">
                                    <i class="fas fa-chart-line ml-2"></i>المراقبة البيئية
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
                        <i class="fas fa-search-plus text-blue-600 ml-3"></i>مركز التدقيق والجودة
                    </h2>
                    <p class="text-sm text-gray-500 mt-1">إدارة عمليات التدقيق وحالات عدم المطابقة والإجراءات التصحيحية</p>
                </div>
                <div class="flex gap-2">
                    <button class="btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all" onclick="ISO.showAuditForm()">
                        <i class="fas fa-plus text-blue-600"></i>جدولة تدقيق
                    </button>
                    <button class="btn bg-blue-600 text-white hover:bg-blue-700 border-0 shadow-sm font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all" onclick="ISO.showNonConformityForm()">
                        <i class="fas fa-exclamation-triangle"></i>تسجيل حالة عدم مطابقة
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
                            سجل عمليات التدقيق
                        </h3>
                        <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">${audits.length} عمليات</span>
                    </div>
                    <div class="card-body p-0 flex-1 overflow-y-auto" style="max-height: 500px;">
                        ${audits.length === 0 ? `
                            <div class="p-12 text-center flex flex-col items-center justify-center h-full">
                                <div class="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-3"><i class="fas fa-clipboard text-2xl"></i></div>
                                <h4 class="text-gray-600 font-bold mb-1">لا توجد سجلات تدقيق</h4>
                                <p class="text-gray-400 text-xs">قم بجدولة أول عملية تدقيق لتقييم النظام</p>
                            </div>
                        ` : `
                            <div class="divide-y divide-gray-100">
                                ${audits.map(audit => {
                                    const isCompleted = audit.status === 'مكتمل' || audit.status === 'Completed';
                                    const isScheduled = audit.status === 'مجدول' || audit.status === 'Scheduled';
                                    
                                    let statusColor = isCompleted ? 'green' : (isScheduled ? 'blue' : 'amber');
                                    let typeIcon = audit.type?.includes('خارجي') ? 'fa-building' : 'fa-users-cog';
                                    
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
                                                    <span title="تاريخ التدقيق"><i class="far fa-calendar ml-1"></i>${Utils.formatDate(audit.date)}</span>
                                                    <span title="المدقق"><i class="fas fa-user-tie ml-1"></i>${Utils.escapeHTML(audit.auditor)}</span>
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
                            تتبع إجراءات CAPA
                        </h3>
                        <div class="flex gap-1">
                            <span class="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-1 rounded-md border border-red-200" title="حالات عدم مطابقة">${nonConformities.length} NC</span>
                            <span class="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-1 rounded-md border border-orange-200" title="إجراءات تصحيحية">${actions.length} CA</span>
                        </div>
                    </div>
                    <div class="card-body p-0 flex-1 overflow-y-auto bg-gray-50/30" style="max-height: 500px;">
                        ${nonConformities.length === 0 && actions.length === 0 ? `
                            <div class="p-12 text-center flex flex-col items-center justify-center h-full">
                                <div class="w-16 h-16 bg-green-50 text-green-400 rounded-full flex items-center justify-center mb-3"><i class="fas fa-shield-alt text-2xl"></i></div>
                                <h4 class="text-gray-600 font-bold mb-1">لا توجد حالات مسجلة</h4>
                                <p class="text-gray-400 text-xs">نظام الجودة يعمل بشكل مثالي دون ملاحظات.</p>
                            </div>
                        ` : `
                            <div class="p-4">
                                <!-- Non-Conformities Section -->
                                ${nonConformities.length > 0 ? `
                                    <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                                        <i class="fas fa-bug text-red-400"></i> حالات عدم المطابقة (NC)
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
                                        <i class="fas fa-tools text-orange-400"></i> الإجراءات التصحيحية (CA)
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
                    <h2 class="modal-title">${data ? 'تعديل هد' : 'إضافة هد HSE جديد'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="hse-objective-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الهد *</label>
                            <input type="text" id="objective-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.name || '')}" placeholder="مثال: تقليل الإصابات بنسبة 20%">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الوصف *</label>
                            <textarea id="objective-description" required class="form-input" rows="4" 
                                placeholder="وصف تفصيلي للحد الهدفي">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ الانتهاء *</label>
                            <input type="date" id="objective-due-date" required class="form-input" 
                                value="${data?.dueDate ? new Date(data.dueDate).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">المسؤول *</label>
                            <input type="text" id="objective-responsible" required class="form-input" 
                                value="${Utils.escapeHTML(data?.responsible || '')}" placeholder="اسم المسؤول">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button type="button" id="save-objective-btn" class="btn-primary">حفظ</button>
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
        Notification.info('سيتم إضافة نموذج تقييم المخاطر HSE قريباً');
    },

    async showEnvironmentalAspectsForm(data = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? 'تعديل جانب بيئي' : 'إضافة جانب بيئي جديد'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="environmental-aspect-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">اسم الجانب البيئي *</label>
                            <input type="text" id="aspect-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.name || '')}" placeholder="مثال: استهلاك المياه">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الوصف *</label>
                            <textarea id="aspect-description" required class="form-input" rows="4" 
                                placeholder="وصف تفصيلي للجانب البيئي">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">التأثير *</label>
                            <select id="aspect-impact" required class="form-input">
                                <option value="">اختر التأثير</option>
                                <option value="منخض" ${data?.impact === 'منخض' ? 'selected' : ''}>منخض</option>
                                <option value="متوسط" ${data?.impact === 'متوسط' ? 'selected' : ''}>متوسط</option>
                                <option value="عالي" ${data?.impact === 'عالي' ? 'selected' : ''}>عالي</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button type="button" id="save-aspect-btn" class="btn-primary">حفظ</button>
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
        Notification.info('سيتم إضافة نموذج المراقبة البيئية قريباً');
    },

    async showAuditForm(data = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? 'تعديل تدقيق' : 'إضاة تدقيق جديد'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="audit-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">نوع التدقيق *</label>
                            <select id="audit-type" required class="form-input">
                                <option value="">اختر النوع</option>
                                <option value="تدقيق داخلي" ${data?.type === 'تدقيق داخلي' ? 'selected' : ''}>تدقيق داخلي</option>
                                <option value="تدقيق خارجي" ${data?.type === 'تدقيق خارجي' ? 'selected' : ''}>تدقيق خارجي</option>
                                <option value="مراجعة إدارة" ${data?.type === 'مراجعة إدارة' ? 'selected' : ''}>مراجعة إدارة</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ التدقيق *</label>
                            <input type="date" id="audit-date" required class="form-input" 
                                value="${data?.date ? new Date(data.date).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">المدقق *</label>
                            <input type="text" id="audit-auditor" required class="form-input" 
                                value="${Utils.escapeHTML(data?.auditor || '')}" placeholder="اسم المدقق">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الحالة *</label>
                            <select id="audit-status" required class="form-input">
                                <option value="مخطط" ${data?.status === 'مخطط' ? 'selected' : ''}>مخطط</option>
                                <option value="قيد التنيذ" ${data?.status === 'قيد التنيذ' ? 'selected' : ''}>قيد التنيذ</option>
                                <option value="مكتمل" ${data?.status === 'مكتمل' ? 'selected' : ''}>مكتمل</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الوص</label>
                            <textarea id="audit-description" class="form-input" rows="4" 
                                placeholder="وصف تفصيلي للتدقيق">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button type="button" id="save-audit-btn" class="btn-primary">حفظ</button>
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
            Notification.error('التدقيق غير موجود');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">تفاصيل التدقيق</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>النوع:</strong> ${Utils.escapeHTML(audit.type)}</div>
                        <div><strong>التاريخ:</strong> ${Utils.formatDate(audit.date)}</div>
                        <div><strong>المدقق:</strong> ${Utils.escapeHTML(audit.auditor)}</div>
                        <div><strong>الحالة:</strong> <span class="badge badge-${audit.status === 'مكتمل' ? 'success' : 'warning'}">${audit.status}</span></div>
                        <div><strong>الوصف:</strong> ${Utils.escapeHTML(audit.description || '-')}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
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
                    <h2 class="modal-title">${data ? 'تعديل عدم مطابقة' : 'إضافة عدم مطابقة جديدة'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="non-conformity-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ عدم المطابقة *</label>
                            <input type="date" id="nc-date" required class="form-input" 
                                value="${data?.date ? new Date(data.date).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الوصف *</label>
                            <textarea id="nc-description" required class="form-input" rows="4" 
                                placeholder="وصف تفصيلي لعدم المطابقة">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الحالة *</label>
                            <select id="nc-status" required class="form-input">
                                <option value="متوحة" ${data?.status === 'متوحة' ? 'selected' : ''}>متوحة</option>
                                <option value="قيد المعالجة" ${data?.status === 'قيد المعالجة' ? 'selected' : ''}>قيد المعالجة</option>
                                <option value="مغلق" ${data?.status === 'مغلق' ? 'selected' : ''}>مغلق</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button type="button" id="save-nc-btn" class="btn-primary">حفظ</button>
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
                    <h2 class="modal-title">تفاصيل عدم المطابقة</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>التاريخ:</strong> ${Utils.formatDate(nc.date)}</div>
                        <div><strong>الوصف:</strong> ${Utils.escapeHTML(nc.description)}</div>
                        <div><strong>الحالة:</strong> <span class="badge badge-${nc.status === 'مغلق' ? 'success' : 'danger'}">${nc.status}</span></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
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
                    <h2 class="modal-title">${data ? 'تعديل إجراء تصحيحي' : 'إضافة إجراء تصحيحي جديد'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="corrective-action-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الوصف *</label>
                            <textarea id="ca-description" required class="form-input" rows="4" 
                                placeholder="وصف تفصيلي للإجراء التصحيحي">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">المسؤول *</label>
                            <input type="text" id="ca-responsible" required class="form-input" 
                                value="${Utils.escapeHTML(data?.responsible || '')}" placeholder="اسم المسؤول">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ الانتهاء *</label>
                            <input type="date" id="ca-due-date" required class="form-input" 
                                value="${data?.dueDate ? new Date(data.dueDate).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الحالة *</label>
                            <select id="ca-status" required class="form-input">
                                <option value="قيد التنفيذ" ${data?.status === 'قيد التنيذ' ? 'selected' : ''}>قيد التنيذ</option>
                                <option value="مكتمل" ${data?.status === 'مكتمل' ? 'selected' : ''}>مكتمل</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button type="button" id="save-ca-btn" class="btn-primary">حفظ</button>
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
                    <h2 class="modal-title">تفاصيل الإجراء التصحيحي</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div><strong>الوصف:</strong> ${Utils.escapeHTML(ca.description)}</div>
                        <div><strong>المسؤول:</strong> ${Utils.escapeHTML(ca.responsible)}</div>
                        <div><strong>تاريخ الانتهاء:</strong> ${Utils.formatDate(ca.dueDate)}</div>
                        <div><strong>الحالة:</strong> <span class="badge badge-${ca.status === 'مكتمل' ? 'success' : 'warning'}">${ca.status}</span></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
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
        if (!this.SystemFormsManifest) return '';
        
        return `
        <div class="content-card mb-6 border-0 shadow-lg" style="border-radius: 12px; overflow: hidden;">
            <div class="card-header bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-6 py-4 border-0">
                <h2 class="card-title text-white flex items-center text-xl font-bold m-0">
                    <i class="fas fa-layer-group ml-3 text-2xl opacity-90"></i>
                    دليل نماذج النظام المدمجة
                </h2>
                <p class="text-blue-100 text-sm mt-1 mb-0 opacity-80">يتم عرض النماذج الرئيسية بالنظام وحالتها في مركز التكويد</p>
            </div>
            <div class="card-body bg-gray-50/50 p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    ${this.SystemFormsManifest.map(form => {
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
                        <div class="bg-white border ${matchedCode ? 'border-green-200' : 'border-red-200'} rounded-xl p-5 hover:shadow-xl transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1">
                            <div class="absolute top-0 right-0 w-1.5 h-full ${matchedCode ? 'bg-gradient-to-b from-green-400 to-green-600' : 'bg-gradient-to-b from-red-400 to-red-600'}"></div>
                            
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="font-bold text-gray-800 text-lg leading-tight">${form.name}</h3>
                                <span class="badge ${matchedCode ? 'badge-success bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-2.5 py-1 rounded-full font-semibold text-xs shadow-sm flex items-center whitespace-nowrap">
                                    ${matchedCode ? '<i class="fas fa-check-circle ml-1"></i> مكود' : '<i class="fas fa-times-circle ml-1"></i> غير معرّف'}
                                </span>
                            </div>
                            
                            <div class="text-sm text-gray-600 space-y-2.5 mb-5">
                                <div class="flex items-center bg-gray-50 rounded p-1.5"><i class="fas fa-puzzle-piece text-gray-400 w-5 ml-1 text-center"></i> <span class="text-xs text-gray-500 ml-1">الموديول:</span> <span class="font-semibold mr-auto">${form.module}</span></div>
                                ${matchedCode ? `
                                    <div class="flex items-center bg-blue-50/50 rounded p-1.5"><i class="fas fa-hashtag text-blue-500 w-5 ml-1 text-center"></i> <span class="text-xs text-gray-500 ml-1">الكود:</span> <span class="font-mono font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded mr-auto text-xs">${Utils.escapeHTML(matchedCode.code || '')}</span></div>
                                    <div class="flex items-center bg-purple-50/50 rounded p-1.5"><i class="fas fa-code-branch text-purple-500 w-5 ml-1 text-center"></i> <span class="text-xs text-gray-500 ml-1">الإصدار:</span> ${activeVersion ? `<span class="font-bold text-purple-700 mr-auto bg-purple-100 px-1.5 py-0.5 rounded text-xs">v${activeVersion.versionNumber}</span>` : '<span class="text-red-500 mr-auto text-xs font-semibold">لا يوجد إصدار نشط</span>'}</div>
                                ` : `
                                    <div class="text-red-600 text-xs bg-red-50 p-2.5 rounded border border-red-100 flex flex-col gap-1 items-center text-center mt-3">
                                        <i class="fas fa-exclamation-triangle text-lg mb-1 opacity-80"></i> 
                                        <span>قم بتعيين كود ليظهر في <br>تذييل هذا النموذج عند الطباعة</span>
                                    </div>
                                `}
                            </div>
                            
                            <div class="mt-auto pt-4 border-t border-gray-100 flex justify-end">
                                ${matchedCode ? `
                                    <button class="btn-secondary btn-sm flex items-center hover:bg-gray-100 transition-colors w-full justify-center py-2 text-gray-700 font-semibold" onclick="ISO.viewDocumentVersions('${matchedCode.id}')" title="سجل التغييرات">
                                        <i class="fas fa-history ml-2 text-gray-500"></i> سجل التغييرات
                                    </button>
                                ` : `
                                    <button class="btn-primary btn-sm flex items-center shadow-md hover:shadow-lg transition-all w-full justify-center py-2 bg-gradient-to-r from-blue-600 to-blue-700 border-0" onclick="ISO.quickAssignFormCode('${form.name}', '${form.defaultCode}', '${form.type}', '${form.department}')" title="إنشاء كود سريع">
                                        <i class="fas fa-plus ml-2"></i> تعيين كود الآن
                                    </button>
                                `}
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
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
                            <p class="text-gray-600">ليس لديك صلاحية للوصول إلى مركز التكويد والإصدار</p>
                            <p class="text-sm text-gray-500 mt-2">هذا القسم متاح فقط لمدير النظام</p>
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
                    <span class="text-sm text-amber-800">لم يتم تحميل البيانات في الوقت المحدد. اضغط <strong>إعادة تحميل</strong> للمحاولة مرة أخرى.</span>
                </div>
                ` : ''}
                ${showLoadingIndicator ? `
                <div class="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-2">
                    <i class="fas fa-spinner fa-spin text-blue-600"></i>
                    <span class="text-sm text-blue-800">جاري تحميل البيانات...</span>
                </div>
                ` : ''}
                <!-- إحصائيات سريعة + زر إعادة التحميل -->
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <div class="text-3xl font-bold text-blue-600 mb-2">${documentCodes.length}</div>
                            <div class="text-sm text-gray-700 font-semibold">أكواد المستندات</div>
                        </div>
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div class="text-3xl font-bold text-green-600 mb-2">${documentVersions.length}</div>
                            <div class="text-sm text-gray-700 font-semibold">إصدارات المستندات</div>
                        </div>
                        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                            <div class="text-3xl font-bold text-purple-600 mb-2">${documentVersions.filter(v => v.isActive === true || v.isActive === 'true').length}</div>
                            <div class="text-sm text-gray-700 font-semibold">إصدارات نشطة</div>
                        </div>
                    </div>
                    <button type="button" onclick="ISO.reloadCodingCenter()" class="btn-secondary flex items-center gap-2 shrink-0" title="إعادة تحميل البيانات">
                        <i class="fas fa-sync-alt"></i>
                        <span>إعادة تحميل</span>
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
                                placeholder="بحث في أكواد المستندات..." 
                                onkeyup="ISO.filterDocumentCodes()">
                        </div>
                        ${documentCodes.length === 0 ? `
                            <div class="empty-state">
                                <p class="text-gray-500">لا توجد أكواد مستندات مسجلة</p>
                            </div>
                        ` : `
                            <div class="overflow-x-auto">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>الكود</th>
                                            <th>اسم المستند</th>
                                            <th>نوع المستند</th>
                                            <th>القسم</th>
                                            <th>الحالة</th>
                                            <th>تاريخ الإنشاء</th>
                                            <th>الإجراءات</th>
                                        </tr>
                                    </thead>
                                    <tbody id="document-codes-table-body">
                                        ${documentCodes.map(code => `
                                            <tr>
                                                <td><strong>${Utils.escapeHTML(code.code || '')}</strong></td>
                                                <td>${Utils.escapeHTML(code.documentName || '')}</td>
                                                <td>${Utils.escapeHTML(code.documentType || '')}</td>
                                                <td>${Utils.escapeHTML(code.department || '')}</td>
                                                <td><span class="badge badge-${code.status === 'نشط' ? 'success' : 'warning'}">${Utils.escapeHTML(code.status || '')}</span></td>
                                                <td>${code.createdAt ? Utils.formatDate(code.createdAt) : '-'}</td>
                                                <td>
                                                    <button onclick="ISO.editDocumentCode('${code.id}')" class="btn-icon btn-icon-info" title="تعديل">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button onclick="ISO.viewDocumentVersions('${code.id}')" class="btn-icon btn-icon-success" title="عرض الإصدارات">
                                                        <i class="fas fa-list"></i>
                                                    </button>
                                                    <button onclick="ISO.deleteDocumentCode('${code.id}')" class="btn-icon btn-icon-danger" title="حذف">
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
                                مركز الإصدار (Issuing Center)
                            </h2>
                            <button class="btn-primary" onclick="ISO.showDocumentVersionForm()">
                                <i class="fas fa-plus ml-2"></i>إضافة إصدار جديد
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <select id="version-filter-code" class="form-input" onchange="ISO.filterDocumentVersions()">
                                <option value="">جميع الأكواد</option>
                                ${documentCodes.map(code => `
                                    <option value="${code.id}">${Utils.escapeHTML(code.code || '')} - ${Utils.escapeHTML(code.documentName || '')}</option>
                                `).join('')}
                            </select>
                        </div>
                        ${documentVersions.length === 0 ? `
                            <div class="empty-state">
                                <p class="text-gray-500">لا توجد إصدارات مسجلة</p>
                            </div>
                        ` : `
                            <div class="overflow-x-auto">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>الكود</th>
                                            <th>رقم الإصدار</th>
                                            <th>تاريخ الإصدار</th>
                                            <th>تاريخ التعديل</th>
                                            <th>الحالة</th>
                                            <th>الإجراءات</th>
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
                                                            ${version.isActive === true || version.isActive === 'true' ? 'نشط' : 'غير نشط'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button onclick="ISO.editDocumentVersion('${version.id}')" class="btn-icon btn-icon-info" title="تعديل">
                                                            <i class="fas fa-edit"></i>
                                                        </button>
                                                        <button onclick="ISO.reissueDocument('${version.id}')" class="btn-icon btn-icon-warning" title="إعادة إصدار">
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
                    <h2 class="modal-title">${data ? 'تعديل كود المستند' : 'إضافة كود مستند جديد'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="document-code-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الكود *</label>
                            <input type="text" id="doc-code" required class="form-input" 
                                value="${Utils.escapeHTML(data?.code || '')}" 
                                placeholder="مثال: DOC-001, FORM-002">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">اسم المستند / الإجراء *</label>
                            <input type="text" id="doc-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.documentName || '')}" 
                                placeholder="اسم المستند">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">نوع المستند *</label>
                            <select id="doc-type" required class="form-input">
                                <option value="">اختر النوع</option>
                                <option value="وثيقة" ${data?.documentType === 'وثيقة' ? 'selected' : ''}>وثيقة</option>
                                <option value="إجراء" ${data?.documentType === 'إجراء' ? 'selected' : ''}>إجراء</option>
                                <option value="نموذج" ${data?.documentType === 'نموذج' ? 'selected' : ''}>نموذج</option>
                                <option value="تقرير" ${data?.documentType === 'تقرير' ? 'selected' : ''}>تقرير</option>
                                <option value="سجل" ${data?.documentType === 'سجل' ? 'selected' : ''}>سجل</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">القسم *</label>
                            <input type="text" id="doc-department" required class="form-input" 
                                value="${Utils.escapeHTML(data?.department || '')}" 
                                placeholder="القسم التابع له">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الحالة *</label>
                            <select id="doc-status" required class="form-input">
                                <option value="نشط" ${data?.status === 'نشط' ? 'selected' : ''}>نشط</option>
                                <option value="معطل" ${data?.status === 'معطل' ? 'selected' : ''}>معطل</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الوصف</label>
                            <textarea id="doc-description" class="form-input" rows="3" 
                                placeholder="وصف اختياري للمستند">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button type="button" id="save-doc-code-btn" class="btn-primary">حفظ</button>
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
                    <h2 class="modal-title">${data ? 'تعديل إصدار المستند' : 'إضافة إصدار جديد'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="document-version-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">كود المستند *</label>
                            <select id="version-code-id" required class="form-input" ${data ? 'disabled' : ''}>
                                <option value="">اختر الكود</option>
                                ${codes.map(code => `
                                    <option value="${code.id}" 
                                        ${(data?.documentCodeId === code.id || documentCodeId === code.id) ? 'selected' : ''}>
                                        ${Utils.escapeHTML(code.code || '')} - ${Utils.escapeHTML(code.documentName || '')}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">رقم الإصدار *</label>
                            <input type="text" id="version-number" required class="form-input" 
                                value="${Utils.escapeHTML(data?.versionNumber || '')}" 
                                placeholder="مثال: 1.0, 2.1">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ الإصدار *</label>
                            <input type="date" id="version-issue-date" required class="form-input" 
                                value="${data?.issueDate ? new Date(data.issueDate).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ التعديل</label>
                            <input type="date" id="version-revision-date" class="form-input" 
                                value="${data?.revisionDate ? new Date(data.revisionDate).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الحالة</label>
                            <select id="version-status" class="form-input">
                                <option value="نشط" ${data?.status === 'نشط' ? 'selected' : ''}>نشط</option>
                                <option value="معطل" ${data?.status === 'معطل' ? 'selected' : ''}>معطل</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">ملاحظة الإصدار</label>
                            <textarea id="version-notes" class="form-input" rows="3" 
                                placeholder="ملاحظات حول هذا الإصدار">${Utils.escapeHTML(data?.notes || '')}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">سبب التعديل (سجل التغييرات)</label>
                            <input type="text" id="version-change-reason" class="form-input" 
                                value="${Utils.escapeHTML(data?.changeReason || '')}" 
                                placeholder="مثال: تحديث الإجراء بناءً على المراجعة السنوية">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button type="button" id="save-version-btn" class="btn-primary">حفظ</button>
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
                Notification.error('فشل جلب الإصدارات');
                return;
            }

            const versions = result.data;
            const code = await this.getDocumentCodeById(documentCodeId);

            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 800px;">
                    <div class="modal-header">
                        <h2 class="modal-title">سجل التغييرات والإصدارات: ${Utils.escapeHTML(code?.code || '')} - ${Utils.escapeHTML(code?.documentName || '')}</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-4">
                            <button class="btn-primary" onclick="ISO.showDocumentVersionForm(null, '${documentCodeId}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-plus ml-2"></i>إضافة إصدار جديد
                            </button>
                        </div>
                        ${versions.length === 0 ? `
                            <div class="empty-state">
                                <p class="text-gray-500">لا توجد إصدارات لهذا المستند</p>
                            </div>
                        ` : `
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>رقم الإصدار</th>
                                        <th>تاريخ الإصدار</th>
                                        <th>تاريخ التعديل</th>
                                        <th>الحالة</th>
                                        <th>ملاحظات</th>
                                        <th>سبب التعديل</th>
                                        <th>الإجراءات</th>
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
                                                    ${v.isActive === true || v.isActive === 'true' ? 'نشط' : 'غير نشط'}
                                                </span>
                                            </td>
                                            <td>${Utils.escapeHTML(v.notes || '-')}</td>
                                            <td>${Utils.escapeHTML(v.changeReason || '-')}</td>
                                            <td>
                                                <button onclick="ISO.editDocumentVersion('${v.id}'); this.closest('.modal-overlay').remove();" 
                                                    class="btn-icon btn-icon-info" title="تعديل">
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
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
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
