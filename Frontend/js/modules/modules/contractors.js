/**
 * Contractors Module
 * تم استخراجه من app-modules.js
 */

// ===== Constants =====
const APPROVED_ENTITY_STATUS_OPTIONS = {
    approved: 'معتمد',
    under_review: 'تحت المراجعة',
    rejected: 'مرفوض',
    pending: 'تم الإرسال'
};

const APPROVED_ENTITY_TYPE_OPTIONS = {
    contractor: 'مقاول',
    supplier: 'مورد'
};

// ===== Default Evaluation Criteria =====
const CONTRACTOR_EVALUATION_DEFAULT_ITEMS = [
    'يلتزم المقاول بالقوانين والتشريعات والمتطلبات الأخرى',
    'يلتزم جميع العاملين بالمشروع بجميع التعليمات والمتطلبات الخاصة بالموقع',
    'توفر العمالة المدربة والمؤهلة',
    'توفر مشرف مؤهل طوال فترة تنفيذ المشروع (للأعمال التي تتجاوز أسبوع عمل)',
    'توفر مهمات الوقاية الشخصية الخاصة بالعاملين بحالة جيدة',
    'توفر المعدات المناسبة لأداء العمل وتحقق اشتراطات السلامة',
    'توفر أجهزة الإطفاء المناسبة (نوعًا وحجمًا) طبقًا للتعاقد',
    'يلتزم المقاول باستخراج تصاريح العمل اللازمة واعتمادها من إدارة السلامة',
    'الالتزام بقواعد التخزين الآمن وتخزين المواد والمعدات في الأماكن المخصصة',
    'الحفاظ على النظافة والتخلص الآمن من المخلفات',
    'الإبلاغ الفوري عن أي حادث واتخاذ الإجراءات لمنع تكراره',
    'الالتزام بتنفيذ المشروع طبقًا للمخطط الزمني المعتمد',
    'سرعة التواصل بين المقاول أو من يمثله وإدارة المشروع',
    'سرعة الاستجابة لملاحظات مسؤولي السلامة بالموقع',
    'الرأي العام للمشرف علي المقاول / الإدارة المعنية / مدير المشروع'
];

// ===== Requirement Categories =====
const REQUIREMENT_CATEGORIES = {
    legal: { id: 'legal', label: 'التراخيص القانونية', icon: 'fa-file-contract', color: '#3b82f6' },
    safety: { id: 'safety', label: 'السلامة والصحة المهنية', icon: 'fa-hard-hat', color: '#ef4444' },
    training: { id: 'training', label: 'التدريب والكفاءات', icon: 'fa-graduation-cap', color: '#10b981' },
    equipment: { id: 'equipment', label: 'المعدات والموارد', icon: 'fa-tools', color: '#f59e0b' },
    financial: { id: 'financial', label: 'الجوانب المالية', icon: 'fa-dollar-sign', color: '#8b5cf6' },
    quality: { id: 'quality', label: 'الجودة والامتثال', icon: 'fa-award', color: '#06b6d4' },
    other: { id: 'other', label: 'أخرى', icon: 'fa-folder', color: '#6b7280' }
};

// ===== Requirement Priority Levels =====
const REQUIREMENT_PRIORITIES = {
    critical: { id: 'critical', label: 'حرج', color: '#ef4444', order: 1 },
    high: { id: 'high', label: 'عالي', color: '#f59e0b', order: 2 },
    medium: { id: 'medium', label: 'متوسط', color: '#3b82f6', order: 3 },
    low: { id: 'low', label: 'منخفض', color: '#6b7280', order: 4 }
};

// ===== Default Approval Requirements (Enhanced) =====
const CONTRACTOR_APPROVAL_REQUIREMENTS_DEFAULT = [
    {
        id: 'req_1',
        label: 'تقديم ملف السلامة الخاص بالشركة (HSE Profile)',
        type: 'document',
        required: true,
        order: 1,
        category: 'safety',
        priority: 'critical',
        hasExpiry: true,
        expiryMonths: 12,
        description: 'ملف السلامة والصحة المهنية الشامل للشركة',
        applicableTypes: ['contractor', 'supplier'] // أنواع المقاولين المنطبق عليها
    },
    {
        id: 'req_2',
        label: 'تقديم شهادات تدريب العاملين على أعمال الموقع',
        type: 'document',
        required: true,
        order: 2,
        category: 'training',
        priority: 'high',
        hasExpiry: true,
        expiryMonths: 24,
        description: 'شهادات تدريب العاملين على السلامة وأعمال الموقع',
        applicableTypes: ['contractor']
    },
    {
        id: 'req_3',
        label: 'تقديم سجل الحوادث وآخر 12 شهر (Incident Log)',
        type: 'document',
        required: true,
        order: 3,
        category: 'safety',
        priority: 'critical',
        hasExpiry: false,
        description: 'سجل الحوادث والإصابات للفترة الماضية',
        applicableTypes: ['contractor', 'supplier']
    },
    {
        id: 'req_4',
        label: 'وجود خطة الطوارئ الخاصة بالمقاول',
        type: 'document',
        required: true,
        order: 4,
        category: 'safety',
        priority: 'critical',
        hasExpiry: true,
        expiryMonths: 12,
        description: 'خطة الطوارئ والإخلاء للمشروع',
        applicableTypes: ['contractor']
    },
    {
        id: 'req_5',
        label: 'تقديم تراخيص العمل أو السجل التجاري',
        type: 'document',
        required: true,
        order: 5,
        category: 'legal',
        priority: 'critical',
        hasExpiry: true,
        expiryMonths: 12,
        description: 'التراخيص القانونية والسجل التجاري',
        applicableTypes: ['contractor', 'supplier']
    },
    {
        id: 'req_6',
        label: 'تقديم تقييم المخاطر لنوع العمل المطلوب (Risk Assessment)',
        type: 'document',
        required: true,
        order: 6,
        category: 'safety',
        priority: 'high',
        hasExpiry: true,
        expiryMonths: 6,
        description: 'تقييم المخاطر المحددة لنوع العمل',
        applicableTypes: ['contractor']
    },
    {
        id: 'req_7',
        label: 'توفير مسؤول سلامة معتمد للمشروع',
        type: 'text',
        required: true,
        order: 7,
        category: 'safety',
        priority: 'high',
        hasExpiry: false,
        description: 'اسم وبيانات مسؤول السلامة المعتمد',
        applicableTypes: ['contractor']
    },
    {
        id: 'req_8',
        label: 'التأكد من التزام الجهة باستخدام معدات الوقاية',
        type: 'checkbox',
        required: true,
        order: 8,
        category: 'safety',
        priority: 'high',
        hasExpiry: false,
        description: 'التأكد من توفر واستخدام معدات الوقاية الشخصية',
        applicableTypes: ['contractor']
    },
    {
        id: 'req_9',
        label: 'توفير شهادات معايرة للمعدات المستخدمة إذا كانت مطلوبة',
        type: 'document',
        required: false,
        order: 9,
        category: 'equipment',
        priority: 'medium',
        hasExpiry: true,
        expiryMonths: 12,
        description: 'شهادات معايرة وصيانة المعدات',
        applicableTypes: ['contractor']
    }
];

// ===== Contractors Module (إدارة المقاولين) =====
const Contractors = {
    currentTab: 'approval-request',
    _abortController: null, // ✅ للتحكم في إلغاء جميع event listeners
    _eventListeners: [], // ✅ تتبع جميع event listeners المُضافة
    applyModuleI18n(root) {
        const i18nCore = (window.AppI18n && typeof window.AppI18n.applyI18n === 'function')
            ? window.AppI18n
            : ((window.I18n && typeof window.I18n.applyI18n === 'function') ? window.I18n : null);
        if (!i18nCore) return;
        const target = root || document.getElementById('contractors-section') || document;
        i18nCore.applyI18n(target);
        if (typeof i18nCore.applyLiteralTranslations === 'function') {
            i18nCore.applyLiteralTranslations(target);
        }
    },

    /** ترجمة مفاتيح المديول مع fallback عربي — مستخدمة في جداول/عناوين المعتمدين */
    t(key, fallback = '') {
        try {
            const core = (window.AppI18n && typeof window.AppI18n.t === 'function')
                ? window.AppI18n
                : ((window.I18n && typeof window.I18n.t === 'function') ? window.I18n : null);
            if (core) {
                const translated = core.t(key, null, fallback != null ? String(fallback) : '');
                if (translated != null && String(translated).trim() !== '' && translated !== key) {
                    return String(translated);
                }
            }
        } catch (_e) { /* ignore */ }
        return fallback != null ? String(fallback) : '';
    },
    
    /**
     * ✅ دالة تنظيف شاملة لإزالة جميع event listeners
     * تُستدعى قبل تغيير التبويبات أو إعادة رسم المحتوى
     */
    cleanup() {
        try {
            // ✅ إلغاء جميع event listeners باستخدام AbortController
            if (this._abortController) {
                this._abortController.abort();
                this._abortController = null;
            }
            
            // ✅ إنشاء AbortController جديد
            this._abortController = new AbortController();
            
            // ✅ إزالة data-listener-attached من جميع الأزرار لإتاحة إعادة ربط الـ listeners
            const elementsWithListeners = document.querySelectorAll('[data-listener-attached]');
            elementsWithListeners.forEach(el => {
                el.removeAttribute('data-listener-attached');
            });
            
            // ✅ إزالة broadcast listener إذا كان موجوداً
            if (this._broadcastListener && typeof RealtimeSyncManager !== 'undefined' && 
                RealtimeSyncManager.state?.broadcastChannel) {
                try {
                    RealtimeSyncManager.state.broadcastChannel.removeEventListener('message', this._broadcastListener);
                    this._broadcastListener = null;
                } catch (e) {
                    Utils.safeWarn('⚠️ خطأ في إزالة broadcast listener:', e);
                }
            }
            
            // ✅ إيقاف أي عمليات loading معلقة
            this._isLoading = false;
            
            // ✅ إيقاف أي عمليات bootstrapping معلقة
            this._isBootstrapping = false;
            this._bootstrapScheduled = false;
            
            // ✅ إيقاف أي عمليات refresh معلقة
            this._isRefreshingApprovalRequests = false;
            
            // ✅ إعادة تعيين flags الـ listeners
            this._eventListenersAttached = false;
            this._realtimeListenersSetup = false;
            this._syncListenerAttached = false;
            this._isSwitchingTab = false;
            
            // ✅ إلغاء أي timeouts معلقة
            if (this._refreshApprovalTimeout) {
                clearTimeout(this._refreshApprovalTimeout);
                this._refreshApprovalTimeout = null;
            }
            
            if (this._refreshApprovalRAF) {
                cancelAnimationFrame(this._refreshApprovalRAF);
                this._refreshApprovalRAF = null;
            }
            
            if (this._approvalRefreshRetryTimeout) {
                clearTimeout(this._approvalRefreshRetryTimeout);
                this._approvalRefreshRetryTimeout = null;
            }
            
            if (this._switchTabTimeout) {
                clearTimeout(this._switchTabTimeout);
                this._switchTabTimeout = null;
            }
            
            Utils.safeLog('✅ تم تنظيف جميع event listeners والعمليات المعلقة بنجاح');
        } catch (error) {
            Utils.safeError('❌ خطأ في cleanup:', error);
        }
    },
    
    /**
     * ✅ دالة مساعدة آمنة للوصول إلى عناصر DOM
     * تتحقق من وجود العنصر في DOM قبل الوصول إليه
     */
    safeGetElementById(id) {
        try {
            if (!id) return null;
            const element = document.getElementById(id);
            if (element && document.contains(element)) {
                return element;
            }
            return null;
        } catch (error) {
            Utils.safeWarn('⚠️ safeGetElementById error for id=' + id + ':', error);
            return null;
        }
    },
    
    /**
     * ✅ دالة مساعدة آمنة لتحديث innerHTML
     * تتحقق من وجود العنصر في DOM قبل التحديث
     */
    safeSetInnerHTML(element, html) {
        try {
            if (!element) {
                Utils.safeWarn('⚠️ safeSetInnerHTML: element is null or undefined');
                return false;
            }
            if (!document.contains(element)) {
                Utils.safeWarn('⚠️ safeSetInnerHTML: element is not in DOM. id=' + (element.id || 'unknown'));
                return false;
            }
            element.innerHTML = html;
            this.applyModuleI18n(element);
            return true;
        } catch (error) {
            Utils.safeError('❌ safeSetInnerHTML error:', error);
            return false;
        }
    },
    
    /**
     * ✅ دالة مساعدة آمنة للبحث عن عناصر داخل container
     * تتحقق من وجود container في DOM قبل البحث
     */
    safeQuerySelector(container, selector) {
        try {
            if (!container || !selector) return null;
            if (!document.contains(container)) {
                Utils.safeWarn('⚠️ safeQuerySelector: container is not in DOM');
                return null;
            }
            return container.querySelector(selector);
        } catch (error) {
            Utils.safeWarn('⚠️ safeQuerySelector error:', error);
            return null;
        }
    },
    currentEvaluationFilter: '',
    approvedFilters: {
        search: '',
        status: '',
        type: '',
        validity: ''
    },

    /**
     * تحميل محتوى تبويب واحد (كسول — لا يمس syncDataFromServer)
     */
    async loadContractorsTabContent(tab, options = {}) {
        const isAdmin = this.isContractorApprovalAdminUser();
        const tabContainerMap = {
            'approval-request': 'contractors-approval-request-content',
            approved: 'contractors-approved-content',
            evaluations: 'contractors-evaluations-content',
            requirements: 'contractors-requirements-content',
            analytics: 'contractors-analytics-content'
        };
        const containerId = tabContainerMap[tab];
        if (!containerId) return;
        const container = document.getElementById(containerId);
        if (!container) return;

        const sectionLabels = {
            approved: 'قائمة المعتمدين',
            'approval-request': 'طلبات الاعتماد',
            evaluations: 'التقييمات',
            requirements: 'الاشتراطات',
            analytics: 'التحليلات'
        };
        const handleError = (sectionName, error) => {
            const label = sectionLabels[sectionName] || sectionName;
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError(`خطأ في تحميل ${label}:`, error);
            }
            return `
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-4xl text-yellow-400 mb-3"></i>
                            <p class="text-gray-500">حدث خطأ في تحميل ${label}</p>
                            <button onclick="Contractors.loadContractorsTabContent('${tab}', { forceData: true })" class="btn-secondary mt-3">إعادة المحاولة</button>
                        </div>
                    </div>
                </div>
            `;
        };

        try {
            if (tab === 'approval-request') {
                if (options.fetchData !== false) {
                    await this.ensureApprovalRequestsDataLoaded({
                        force: options.forceData === true || this.isContractorApprovalAdminUser()
                    }).catch(() => {});
                }
                this.safeSetInnerHTML(container, this.renderApprovalRequestSection());
                this._attachSendApprovalRequestBtn();
                return;
            }

            if (tab === 'approved') {
                this.ensureApprovedTabContentLoaded(true);
                this.ensureApprovedTabEventListeners();
                if (options.fetchData !== false) {
                    this.ensureApprovedContractorsDataLoaded({
                        force: options.forceData === true,
                        reconcile: options.reconcile === true
                    })
                        .then(() => {
                            this.ensureApprovedTabContentLoaded(true);
                            this.refreshApprovedEntitiesList();
                        })
                        .catch(() => {});
                }
                return;
            }

            if (tab === 'evaluations') {
                const html = await Promise.resolve(this.renderEvaluationsSection()).catch((err) => handleError('التقييمات', err));
                this.safeSetInnerHTML(container, html);
                this.ensureEvaluationsEventListeners();
                if (options.fetchData !== false) {
                    this.ensureEvaluationsDataLoaded();
                    this.ensureEvaluationApprovalRequestsDataLoaded({
                        force: options.forceData === true
                    })
                        .then(() => {
                            if (this.currentTab === 'evaluations') {
                                this.refreshEvaluationApprovalRequestsSection();
                            }
                        })
                        .catch(() => {});
                }
                return;
            }

            if (tab === 'requirements') {
                const html = await Promise.resolve(this.renderRequirementsManagementSection()).catch((err) => handleError('الاشتراطات', err));
                this.safeSetInnerHTML(container, html);
                return;
            }

            if (tab === 'analytics' && isAdmin) {
                const html = await Promise.resolve(this.renderAnalyticsSection()).catch((err) => handleError('التحليلات', err));
                this.safeSetInnerHTML(container, html);
                const root = document.getElementById('ctr-analytics-root');
                if (root) root.dataset.bound = '';
                this.bindContractorAnalyticsEvents();
                if (options.fetchData !== false) {
                    this.loadContractorAnalytics();
                }
            }
        } catch (error) {
            this.safeSetInnerHTML(container, handleError(tab, error));
        }
    },

    _attachSendApprovalRequestBtn() {
        const sendBtn = document.getElementById('send-approval-request-btn');
        if (sendBtn && !sendBtn.hasAttribute('data-listener-attached')) {
            sendBtn.setAttribute('data-listener-attached', 'true');
            sendBtn.addEventListener('click', () => this.showApprovalRequestForm());
        }
    },

    _scheduleContractorsBackgroundPrefetch(activeTab) {
        const jobs = [];
        if (this.shouldLoadContractorApprovalRequests()) {
            jobs.push(this.ensureApprovalRequestsDataLoaded({
                force: this.isContractorApprovalAdminUser()
            }));
        }
        if (typeof Permissions !== 'undefined' && typeof Permissions.hasAccess === 'function' &&
            Permissions.hasAccess('contractors')) {
            jobs.push(this.ensureApprovedContractorsDataLoaded({ force: false, reconcile: false }));
        }
        if (!jobs.length) return;
        Promise.allSettled(jobs).then(() => {
            if (this.currentTab !== activeTab) return;
            if (activeTab === 'approval-request') {
                this.refreshApprovalRequestsSection();
            } else if (activeTab === 'approved') {
                this.ensureApprovedTabContentLoaded(true);
                this.refreshApprovedEntitiesList();
            } else if (activeTab === 'evaluations') {
                this.ensureEvaluationApprovalRequestsDataLoaded({ force: false })
                    .then(() => this.refreshEvaluationApprovalRequestsSection())
                    .catch(() => {});
            } else if (activeTab === 'analytics') {
                this.loadContractorAnalytics();
            }
        }).catch(() => {});
    },

    _loadRemainingContractorsTabsInBackground(activeTab) {
        const isAdmin = this.isContractorApprovalAdminUser();
        const tabs = ['approval-request', 'approved', 'evaluations', 'requirements'];
        if (isAdmin) tabs.push('analytics');
        const remaining = tabs.filter((t) => t !== activeTab && !this._tabsLoaded?.[t]);
        if (!remaining.length) return;

        const run = async () => {
            for (const tab of remaining) {
                if (this._tabsLoaded?.[tab]) continue;
                try {
                    await this.loadContractorsTabContent(tab, { fetchData: false, background: true });
                    this._tabsLoaded[tab] = true;
                } catch (_e) { /* ignore */ }
                await new Promise((resolve) => setTimeout(resolve, 0));
            }
        };
        run().catch(() => {});
    },

    async load(preserveCurrentTab = false) {
        // ✅ CRITICAL: منع استدعاء load() أكثر من مرة في نفس الوقت
        if (this._isLoading) {
            Utils.safeLog('⚠️ load() قيد التنفيذ بالفعل - تم تجاهل الاستدعاء');
            return;
        }
        
        this._isLoading = true;

        try {
            try {
                this._abortController?.abort();
            } catch (e) { /* ignore */ }
            this._abortController = new AbortController();
            this._eventListenersAttached = false;

            const section = document.getElementById('contractors-section');
            if (!section) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ قسم contractors-section غير موجود');
                } else {
                    console.warn('⚠️ قسم contractors-section غير موجود');
                }
                this._isLoading = false;
                return;
            }
            section.classList.add('contractors-identity');

            // ✅ إصلاح نهائي: حفظ التبويب الحالي قبل إعادة التحميل
            const previousTab = this.currentTab || 'approval-request';
            const targetTab = preserveCurrentTab ? previousTab : 'approval-request';
            this.currentTab = targetTab;

            // ✅ إصلاح شامل: حقن CSS optimizations لتقليل layout shifts والاهتزاز
            this.injectAntiShakeStyles();

            // ✅ إصلاح: التأكد من تحميل بيانات طلبات الاعتماد قبل الرسم
            this.ensureApprovedSetup();
            this.ensureEvaluationSetup();
            this.ensureApprovalRequestsSetup();
            this.ensureDeletionRequestsSetup();
            this._tabsLoaded = {};

            if (!AppState) {
                window.AppState = window.AppState || {};
            }
            if (!AppState.appData) {
                AppState.appData = {};
            }

            const isAdmin = this.isContractorApprovalAdminUser();
            const TAB_PENDING_HTML = `
                <div class="content-card">
                    <div class="card-body">
                        <div class="flex items-center justify-center py-8">
                            <div class="text-center">
                                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
                                <p class="text-gray-500 text-sm">جاري تجهيز القسم...</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const tc = this.currentTab || 'approval-request';
            const tabBtnCls = (tabId) => (tc === tabId
                ? 'contractors-tab-btn active px-6 py-3 font-semibold text-blue-600 border-b-2 border-blue-600'
                : 'contractors-tab-btn px-6 py-3 font-semibold text-gray-500 hover:text-blue-600');
            const tabPaneOpen = (suffix) => {
                const active = tc === suffix;
                return `id="contractors-${suffix}-content" class="contractors-tab-content${active ? ' active' : ''}" style="display: ${active ? 'block' : 'none'};"`;
            };

            const approvalShellBody = tc === 'approval-request'
                ? this.renderApprovalRequestSection()
                : TAB_PENDING_HTML;
            const approvedShellBody = tc === 'approved'
                ? this.renderApprovedEntitiesSection()
                : TAB_PENDING_HTML;

            const shellHTML = `
                <section class="contractors-module-hero" aria-labelledby="contractors-module-title">
                    <div class="contractors-module-hero__copy">
                        <span class="contractors-module-hero__icon"><i class="fas fa-building-shield"></i></span>
                        <div>
                            <span class="contractors-module-hero__eyebrow">بوابة الحوكمة والتأهيل</span>
                            <h1 id="contractors-module-title">إدارة المقاولين ومقدمي الخدمات</h1>
                            <p>دورة موحدة للطلب والاعتماد والتقييم ومتابعة الاشتراطات وتحليل الأداء</p>
                        </div>
                    </div>
                    <div class="contractors-module-hero__meta" aria-label="مزايا المديول">
                        <span><i class="fas fa-route"></i>مسار اعتماد منضبط</span>
                        <span><i class="fas fa-shield-check"></i>تأهيل قائم على الاشتراطات</span>
                        <span><i class="fas fa-chart-line"></i>تحليل أداء مباشر</span>
                    </div>
                </section>
            
            <div class="mt-6 mb-4">
                <div class="contractors-tabs-wrapper">
                    <div class="contractors-tabs-container">
                        <button id="contractors-tab-approval-request" class="${tabBtnCls('approval-request')}" onclick="Contractors.switchTab('approval-request')">
                            <i class="fas fa-paper-plane ml-2"></i>
                            إرسال طلب اعتماد مقاول أو مقدم خدمة
                        </button>
                        <button id="contractors-tab-approved" class="${tabBtnCls('approved')}" onclick="Contractors.switchTab('approved')">
                            <i class="fas fa-check-circle ml-2"></i>
                            قائمة المقاولين والموردين المعتمدين
                        </button>
                        <button id="contractors-tab-evaluations" class="${tabBtnCls('evaluations')}" onclick="Contractors.switchTab('evaluations')">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            تقييم وتأهيل المقاولين
                        </button>
                        ${isAdmin ? `
                        <button id="contractors-tab-analytics" class="${tabBtnCls('analytics')}" onclick="Contractors.switchTab('analytics')">
                            <i class="fas fa-chart-line ml-2"></i>
                            تحليل بيانات المقاولين
                        </button>
                        ` : ''}
                        <button id="contractors-tab-requirements" class="${tabBtnCls('requirements')}" onclick="Contractors.switchTab('requirements')">
                            <i class="fas fa-cog ml-2"></i>
                            إدارة اشتراطات اعتماد المقاولين
                        </button>
                        <button id="contractors-btn-refresh" type="button" class="contractors-tab-btn px-6 py-3 font-semibold text-gray-500 hover:text-blue-600" onclick="Contractors.refreshModule()" title="تحديث البيانات">
                            <i class="fas fa-sync-alt ml-2"></i>
                            تحديث
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="contractors-tab-content">
                <div ${tabPaneOpen('approval-request')}>
                    ${approvalShellBody}
                </div>
                <div ${tabPaneOpen('approved')}>
                    ${approvedShellBody}
                </div>
                <div ${tabPaneOpen('evaluations')}>
                    ${TAB_PENDING_HTML}
                </div>
                ${isAdmin ? `
                <div ${tabPaneOpen('analytics')}>
                    ${TAB_PENDING_HTML}
                </div>
                ` : ''}
                <div ${tabPaneOpen('requirements')}>
                    ${TAB_PENDING_HTML}
                </div>
            </div>
        `;
            this.safeSetInnerHTML(section, shellHTML);
            this.applyModuleI18n(section);
            this.setupEventListeners();
            this.setupRealtimeListeners();
            this._attachSendApprovalRequestBtn();

            // ✅ إظهار الهيكل فوراً — ثم تبويب نشط فقط
            this._isLoading = false;

            await this.loadContractorsTabContent(tc, {
                fetchData: true,
                forceData: tc === 'approval-request' || this.isContractorApprovalAdminUser(),
                reconcile: tc === 'approved'
            });
            this._tabsLoaded[tc] = true;

            this._scheduleContractorsBackgroundPrefetch(tc);
            this._loadRemainingContractorsTabsInBackground(tc);

            if (tc === 'evaluations') {
                try {
                    this.ensureEvaluationsEventListeners();
                } catch (e) { /* ignore */ }
            }

        } catch (error) {
            this._isLoading = false; // ✅ تنظيف في حالة الخطأ
            
            const section = document.getElementById('contractors-section');
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('خطأ فادح في تحميل موديول المقاولين:', error);
            } else {
                console.error('خطأ فادح في تحميل موديول المقاولين:', error);
            }
            // ✅ استخدام الدالة الآمنة لتحديث innerHTML
            if (section) {
                const errorHTML = `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-circle text-4xl text-red-400 mb-3"></i>
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">حدث خطأ في تحميل الموديول</h3>
                                <p class="text-gray-500 mb-4">${error.message || 'خطأ غير معروف'}</p>
                                <button onclick="Contractors.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    إعادة المحاولة
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                this.safeSetInnerHTML(section, errorHTML);
                this.applyModuleI18n(section);
            }
        }
    },

    /**
     * تحديث المديول (إعادة تحميل البيانات مع الحفاظ على التبويب الحالي)
     */
    refreshModule() {
        const btn = document.getElementById('contractors-btn-refresh');
        if (btn) {
            btn.disabled = true;
            const icon = btn.querySelector('i.fa-sync-alt');
            if (icon) icon.classList.add('fa-spin');
        }
        const finish = () => {
            const refBtn = document.getElementById('contractors-btn-refresh');
            if (refBtn) {
                refBtn.disabled = false;
                const refIcon = refBtn.querySelector('i.fa-sync-alt');
                if (refIcon) refIcon.classList.remove('fa-spin');
            }
        };
        this.ensureApprovalRequestsDataLoaded({ force: true })
            .catch(() => {})
            .finally(() => {
                this.load(true).finally(finish);
            });
    },

    /**
     * تطبيع حالة طلب الاعتماد للمقارنة في الفلاتر والإشعارات
     */
    normalizeApprovalRequestStatus(status) {
        const raw = String(status || '').trim();
        if (!raw) return 'pending';
        const normalized = raw.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
        const aliases = {
            'تم_الإرسال': 'pending',
            'قيد_المراجعة': 'under_review',
            'تحت_المراجعة': 'under_review',
            'في_الانتظار': 'pending',
            'بانتظار_الاعتماد': 'pending',
            'بانتظار_الموافقة': 'pending',
            'قيد_الاعتماد': 'pending',
            'جديد': 'pending',
            'new': 'pending',
            'awaiting': 'pending',
            'awaiting_approval': 'pending',
            'open': 'pending',
            'معتمد': 'approved',
            'approved': 'approved',
            'مرفوض': 'rejected',
            'rejected': 'rejected',
            'submitted': 'pending',
            'in_progress': 'under_review',
            'under_review': 'under_review',
            'pending': 'pending'
        };
        if (aliases[normalized]) return aliases[normalized];
        if (normalized === 'approved' || normalized === 'rejected') return normalized;
        return 'pending';
    },

    extractApprovalRequestRowsFromResponse(res) {
        if (!res || res.success === false) return null;
        if (Array.isArray(res.data)) return res.data;
        if (Array.isArray(res)) return res;
        if (res.data && Array.isArray(res.data.data)) return res.data.data;
        return null;
    },

    shouldLoadContractorApprovalRequests() {
        if (this.isContractorApprovalAdminUser()) return true;
        if (typeof Permissions !== 'undefined' && typeof Permissions.hasAccess === 'function') {
            return Permissions.hasAccess('contractors');
        }
        return false;
    },

    _approvalRequestApiPayload() {
        const sheetId = AppState?.googleConfig?.sheets?.spreadsheetId;
        const data = { forceRefresh: true, skipCache: true };
        if (sheetId && String(sheetId).trim() && sheetId !== 'YOUR_SPREADSHEET_ID_HERE') {
            data.spreadsheetId = String(sheetId).trim();
        }
        return data;
    },

    _clearApprovalRequestReadCaches() {
        if (typeof GoogleIntegration === 'undefined') return;
        const purgePairs = [
            ['getAllContractorApprovalRequests', { forceRefresh: true, skipCache: true }],
            ['getAllContractorDeletionRequests', { forceRefresh: true, skipCache: true }],
            ['readFromSheet', { sheetName: 'ContractorApprovalRequests', skipCache: true }],
            ['readFromSheet', { sheetName: 'ContractorDeletionRequests', skipCache: true }]
        ];
        purgePairs.forEach(([action, payload]) => {
            try {
                if (typeof GoogleIntegration._invalidateSmartCacheForRead_ === 'function') {
                    GoogleIntegration._invalidateSmartCacheForRead_(action, payload);
                }
                if (typeof GoogleIntegration._buildLocalDataStorageKey === 'function') {
                    localStorage.removeItem(GoogleIntegration._buildLocalDataStorageKey(action, payload));
                }
                const legacyKey = `${action}_${JSON.stringify(payload)}`;
                GoogleIntegration._cache?.data?.delete(legacyKey);
                GoogleIntegration._cache?.timestamps?.delete(legacyKey);
            } catch (_e) { /* ignore */ }
        });
    },

    async _fetchApprovalRequestRowsFromBackend() {
        if (typeof GoogleIntegration === 'undefined') return null;

        const apiData = this._approvalRequestApiPayload();

        // 1) API مخصص — يُبطل كاش الخادم ويطبّع الحقول
        try {
            const res = await GoogleIntegration.sendRequest({
                action: 'getAllContractorApprovalRequests',
                data: apiData
            });
            const rows = this.extractApprovalRequestRowsFromResponse(res);
            if (Array.isArray(rows) && rows.length > 0) {
                return rows;
            }
        } catch (err) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ getAllContractorApprovalRequests فشل:', err?.message || err);
            }
        }

        // 2) قراءة مباشرة من الورقة
        if (typeof GoogleIntegration.readFromSheets === 'function') {
            try {
                const sheetRows = await GoogleIntegration.readFromSheets('ContractorApprovalRequests', 45000);
                if (Array.isArray(sheetRows) && sheetRows.length > 0) {
                    return sheetRows;
                }
            } catch (err) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ readFromSheets(ContractorApprovalRequests) فشل:', err?.message || err);
                }
            }
        }

        // 3) إن وُجدت بيانات من المزامنة العامة استخدمها
        const synced = AppState?.appData?.contractorApprovalRequests;
        if (Array.isArray(synced) && synced.length > 0) {
            return synced.slice();
        }

        return null;
    },

    async _fetchDeletionRequestRowsFromBackend() {
        if (typeof GoogleIntegration === 'undefined') return null;

        const apiData = this._approvalRequestApiPayload();
        try {
            const res = await GoogleIntegration.sendRequest({
                action: 'getAllContractorDeletionRequests',
                data: apiData
            });
            const rows = this.extractApprovalRequestRowsFromResponse(res);
            if (Array.isArray(rows) && rows.length > 0) {
                return rows;
            }
        } catch (_e) { /* ignore */ }

        if (typeof GoogleIntegration.readFromSheets === 'function') {
            try {
                const sheetRows = await GoogleIntegration.readFromSheets('ContractorDeletionRequests', 45000);
                if (Array.isArray(sheetRows) && sheetRows.length > 0) {
                    return sheetRows;
                }
            } catch (_e) { /* ignore */ }
        }

        const synced = AppState?.appData?.contractorDeletionRequests;
        if (Array.isArray(synced) && synced.length > 0) {
            return synced.slice();
        }

        return null;
    },

    /**
     * استيعاب بيانات المزامنة العامة (batchRead) لطلبات الاعتماد
     */
    ingestApprovalRequestsFromSync(rows, options = {}) {
        if (!Array.isArray(rows) || rows.length === 0) return false;
        this.ensureApprovalRequestsSetup();
        const localApprovals = Array.isArray(AppState.appData.contractorApprovalRequests)
            ? AppState.appData.contractorApprovalRequests.slice()
            : [];
        const serverRows = rows.map((r) => this.normalizeApprovalRequestRecord(r));
        AppState.appData.contractorApprovalRequests = this.mergeApprovalRequestsWithLocalOnly(serverRows, localApprovals);
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        }
        if (options.refreshUi !== false) {
            if (this.currentTab === 'approval-request') {
                this.mountApprovalRequestSection();
            }
            if (typeof AppUI !== 'undefined' && typeof AppUI.updateNotificationsBadge === 'function') {
                AppUI.updateNotificationsBadge();
            }
        }
        return true;
    },

    prefetchApprovalRequestsForNotifications() {
        const tasks = [];
        if (typeof this.syncPendingEvaluationApprovalRequests === 'function') {
            tasks.push(this.syncPendingEvaluationApprovalRequests());
        }
        if (typeof this.fetchEvaluationApprovalRequestsFromBackend === 'function') {
            tasks.push(this.fetchEvaluationApprovalRequestsFromBackend());
        }
        if (this.shouldLoadContractorApprovalRequests()) {
            tasks.push(
                this.ensureApprovalRequestsDataLoaded({ force: true }).catch(() => false)
            );
        }
        if (!tasks.length) return Promise.resolve(false);
        return Promise.allSettled(tasks).then(() => {
            if (typeof AppUI !== 'undefined' && typeof AppUI.updateNotificationsBadge === 'function') {
                AppUI.updateNotificationsBadge();
            }
            return true;
        });
    },

    normalizeCompanyNameForApprovalMatch(name) {
        return String(name || '').replace(/\s+/g, ' ').trim().toLowerCase();
    },

    /**
     * التحقق من إمكانية إرسال طلب اعتماد جديد (محلي — قبل الإرسال)
     */
    validateNewApprovalRequest(requestData) {
        if (!requestData) {
            return { ok: false, message: 'بيانات الطلب غير صالحة' };
        }

        const companyName = String(requestData.companyName || '').trim();
        const licenseNumber = String(requestData.licenseNumber || '').trim();
        const requestType = String(requestData.requestType || '').trim();

        if (!companyName || !requestData.serviceType || !requestType) {
            return { ok: false, message: 'يرجى تعبئة جميع الحقول المطلوبة' };
        }
        if (!licenseNumber) {
            return { ok: false, message: 'رقم السجل التجاري / الترخيص مطلوب' };
        }

        const normalizedCompany = this.normalizeCompanyNameForApprovalMatch(companyName);
        const entityType = requestType === 'supplier' ? 'supplier' : 'contractor';

        const approved = AppState.appData.approvedContractors || [];
        const duplicateApproved = approved.find((ac) => {
            if (!ac) return false;
            const acLicense = String(ac.licenseNumber || '').trim();
            const acCompany = this.normalizeCompanyNameForApprovalMatch(ac.companyName);
            if (licenseNumber && acLicense && acLicense === licenseNumber) return true;
            if (normalizedCompany && acCompany === normalizedCompany) {
                const acType = this.normalizeApprovedEntityType(ac.entityType || ac.type);
                return !entityType || acType === entityType;
            }
            return false;
        });
        if (duplicateApproved) {
            return {
                ok: false,
                message: `الجهة مسجلة بالفعل في قائمة المعتمدين (${duplicateApproved.companyName || companyName}).`
            };
        }

        const contractors = AppState.appData.contractors || [];
        const duplicateContractor = contractors.find((c) => {
            if (!c) return false;
            const cName = this.normalizeCompanyNameForApprovalMatch(c.name || c.companyName || c.company);
            const cLicense = String(c.licenseNumber || c.contractNumber || '').trim();
            if (licenseNumber && cLicense && cLicense === licenseNumber) return true;
            return normalizedCompany && cName && cName === normalizedCompany;
        });
        if (duplicateContractor) {
            return {
                ok: false,
                message: `المقاول/المورد مسجل مسبقاً في النظام (${duplicateContractor.name || duplicateContractor.companyName || companyName}).`
            };
        }

        const pendingRequests = (AppState.appData.contractorApprovalRequests || [])
            .map((r) => this.normalizeApprovalRequestRecord(r))
            .filter((r) => r && this.isApprovalRequestPendingForReview(r));

        const duplicatePending = pendingRequests.find((req) => {
            const rt = String(req.requestType || 'contractor').trim();
            if (rt !== 'contractor' && rt !== 'supplier') return false;
            if (requestType && rt !== requestType) return false;
            const reqCompany = this.normalizeCompanyNameForApprovalMatch(req.companyName);
            const reqLicense = String(req.licenseNumber || '').trim();
            if (normalizedCompany && reqCompany && reqCompany === normalizedCompany) return true;
            return !!(licenseNumber && reqLicense && reqLicense === licenseNumber);
        });
        if (duplicatePending) {
            return {
                ok: false,
                message: `يوجد طلب اعتماد قيد المراجعة لنفس الشركة أو رقم السجل (${duplicatePending.id || ''}).`
            };
        }

        return { ok: true };
    },

    _closeApprovalRequestModal(modal) {
        try {
            if (modal && modal.parentNode) {
                modal.remove();
            }
        } catch (removeError) {
            Utils.safeWarn('⚠️ خطأ في إزالة النموذج:', removeError);
            if (modal && modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }
    },

    _scheduleApprovalNotificationsRefresh() {
        if (typeof AppUI !== 'undefined' && typeof AppUI.scheduleContractorApprovalNotificationsRefresh === 'function') {
            AppUI.scheduleContractorApprovalNotificationsRefresh();
        } else if (typeof AppUI !== 'undefined' && typeof AppUI.updateNotificationsBadge === 'function') {
            AppUI.updateNotificationsBadge();
        }
    },

    _removeLocalApprovalRequestById(requestId) {
        if (!requestId || !Array.isArray(AppState.appData.contractorApprovalRequests)) return;
        AppState.appData.contractorApprovalRequests = AppState.appData.contractorApprovalRequests.filter(
            (r) => r && r.id !== requestId
        );
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        }
    },

    async diagnoseApprovalRequests() {
        const sheetId = AppState?.googleConfig?.sheets?.spreadsheetId || '';
        let readFromSheetCount = null;
        let apiCount = null;
        if (typeof GoogleIntegration !== 'undefined' && typeof GoogleIntegration.readFromSheets === 'function') {
            try {
                const direct = await GoogleIntegration.readFromSheets('ContractorApprovalRequests', 45000);
                readFromSheetCount = Array.isArray(direct) ? direct.length : null;
            } catch (e) {
                readFromSheetCount = 'error: ' + (e?.message || e);
            }
        }
        try {
            const apiData = this._approvalRequestApiPayload();
            const res = await GoogleIntegration.sendRequest({
                action: 'getAllContractorApprovalRequests',
                data: apiData
            });
            const rows = this.extractApprovalRequestRowsFromResponse(res);
            apiCount = Array.isArray(rows) ? rows.length : null;
        } catch (e) {
            apiCount = 'error: ' + (e?.message || e);
        }
        const loaded = await this.fetchContractorApprovalRequestsFromBackend();
        const all = AppState.appData.contractorApprovalRequests || [];
        const pending = this.getPendingApprovalRequests();
        const report = {
            loaded,
            spreadsheetId: sheetId,
            readFromSheetCount,
            apiCount,
            total: all.length,
            pendingForAdmin: pending.length,
            isAdmin: this.isContractorApprovalAdminUser(),
            currentUserId: AppState.currentUser?.id || '',
            sampleIds: all.slice(0, 5).map((r) => r && r.id).filter(Boolean),
            pendingIds: pending.slice(0, 10).map((r) => r && r.id).filter(Boolean)
        };
        console.log('🔍 تشخيص طلبات الاعتماد:', report);
        return report;
    },

    normalizeApprovalRequestRecord(record) {
        if (!record || typeof record !== 'object') return record;
        const r = { ...record };
        if (!r.status || !String(r.status).trim()) {
            if (r.Status) {
                r.status = String(r.Status).trim();
            } else {
                const statusKey = Object.keys(r).find((k) => {
                    const kl = String(k || '').trim().toLowerCase();
                    return kl === 'status' || kl === 'الحالة' || kl === 'state';
                });
                if (statusKey && r[statusKey] != null && String(r[statusKey]).trim()) {
                    r.status = String(r[statusKey]).trim();
                }
            }
        }
        if ((!r.createdBy || !String(r.createdBy).trim()) && r.CreatedBy) {
            r.createdBy = String(r.CreatedBy).trim();
        }
        if ((!r.createdAt || !String(r.createdAt).trim()) && r.CreatedAt) {
            r.createdAt = r.CreatedAt;
        }
        if ((!r.id || !String(r.id).trim()) && r.ID) {
            r.id = String(r.ID).trim();
        }
        if ((!r.companyName || !String(r.companyName).trim()) && r.CompanyName) {
            r.companyName = String(r.CompanyName).trim();
        }
        r.status = this.normalizeApprovalRequestStatus(r.status);
        return r;
    },

    mergeApprovalRequestsWithLocalOnly(serverRows, localRows) {
        const server = Array.isArray(serverRows) ? serverRows : [];
        const local = Array.isArray(localRows) ? localRows : [];
        const serverIds = new Set(server.map((r) => r && r.id).filter(Boolean));
        const localOnly = local.filter((r) => {
            if (!r) return false;
            const id = String(r.id || '');
            if (id.startsWith('TEMP_') || r._isPendingSync) {
                return !serverIds.has(id);
            }
            return false;
        });
        return [...server, ...localOnly];
    },

    async fetchContractorApprovalRequestsFromBackend() {
        try {
            this.ensureApprovalRequestsSetup();
            this.ensureDeletionRequestsSetup();

            const localApprovals = Array.isArray(AppState.appData.contractorApprovalRequests)
                ? AppState.appData.contractorApprovalRequests.slice()
                : [];
            const localDeletions = Array.isArray(AppState.appData.contractorDeletionRequests)
                ? AppState.appData.contractorDeletionRequests.slice()
                : [];

            const [approvalRows, deletionRows] = await Promise.all([
                this._fetchApprovalRequestRowsFromBackend(),
                this._fetchDeletionRequestRowsFromBackend()
            ]);

            let loaded = false;

            if (Array.isArray(approvalRows) && approvalRows.length > 0) {
                const serverRows = approvalRows.map((r) => this.normalizeApprovalRequestRecord(r));
                AppState.appData.contractorApprovalRequests = this.mergeApprovalRequestsWithLocalOnly(serverRows, localApprovals);
                loaded = true;
            } else if (localApprovals.length > 0) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ جلب الخادم فارغ — الاحتفاظ بـ ' + localApprovals.length + ' طلب محلي');
                }
            }

            if (Array.isArray(deletionRows) && deletionRows.length > 0) {
                const serverRows = deletionRows.map((r) => this.normalizeApprovalRequestRecord(r));
                AppState.appData.contractorDeletionRequests = this.mergeApprovalRequestsWithLocalOnly(serverRows, localDeletions);
                loaded = true;
            }

            if (loaded && typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            if (this.currentTab === 'approval-request') {
                this.mountApprovalRequestSection();
            }
            if (typeof AppUI !== 'undefined' && typeof AppUI.updateNotificationsBadge === 'function') {
                AppUI.updateNotificationsBadge();
            }

            return loaded;
        } catch (err) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ فشل جلب طلبات اعتماد المقاولين من الخادم:', err);
            }
            return false;
        }
    },

    extractApprovedContractorRowsFromResponse(res) {
        if (!res || res.success === false) return null;
        if (Array.isArray(res.data)) return res.data;
        if (Array.isArray(res)) return res;
        if (res.data && Array.isArray(res.data.data)) return res.data.data;
        return null;
    },

    mergeApprovedContractorsWithLocalOnly(serverRows, localRows) {
        const server = Array.isArray(serverRows) ? serverRows : [];
        const local = Array.isArray(localRows) ? localRows : [];
        const serverIds = new Set(server.map((r) => r && r.id).filter(Boolean));
        const serverCodes = new Set(server.map((r) => {
            const c = r && (r.code || r.isoCode);
            return c ? String(c).trim() : '';
        }).filter(Boolean));
        const localOnly = local.filter((r) => {
            if (!r) return false;
            const id = String(r.id || '').trim();
            if (id.startsWith('TEMP_') || r._isPendingSync) {
                return !serverIds.has(id);
            }
            if (id && !serverIds.has(id)) {
                const code = String(r.code || r.isoCode || '').trim();
                if (code && serverCodes.has(code)) return false;
                return true;
            }
            return false;
        });
        return [...server, ...localOnly];
    },

    async _fetchApprovedContractorsFromBackend() {
        if (typeof GoogleIntegration === 'undefined') return null;

        if (typeof GoogleIntegration.readFromSheets === 'function') {
            try {
                const sheetRows = await GoogleIntegration.readFromSheets('ApprovedContractors', 45000);
                if (Array.isArray(sheetRows) && sheetRows.length > 0) {
                    return sheetRows;
                }
            } catch (err) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ readFromSheets(ApprovedContractors) فشل:', err?.message || err);
                }
            }
        }

        const apiData = this._approvalRequestApiPayload();
        try {
            const res = await GoogleIntegration.sendRequest({
                action: 'getAllApprovedContractors',
                data: apiData
            });
            const rows = this.extractApprovedContractorRowsFromResponse(res);
            if (Array.isArray(rows) && rows.length > 0) {
                return rows;
            }
        } catch (err) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ getAllApprovedContractors فشل:', err?.message || err);
            }
        }

        const synced = AppState?.appData?.approvedContractors;
        if (Array.isArray(synced) && synced.length > 0) {
            return synced.slice();
        }

        return null;
    },

    ingestApprovedContractorsFromSync(rows, options = {}) {
        if (!Array.isArray(rows) || rows.length === 0) return false;
        this.ensureApprovedSetup();
        const localRows = Array.isArray(AppState.appData.approvedContractors)
            ? AppState.appData.approvedContractors.slice()
            : [];
        AppState.appData.approvedContractors = this.mergeApprovedContractorsWithLocalOnly(rows, localRows);
        this.ensureApprovedSetup();
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        }
        if (options.refreshUi !== false) {
            if (this.currentTab === 'approved') {
                this.refreshApprovedEntitiesList();
            }
        }
        return true;
    },

    async fetchApprovedContractorsFromBackend() {
        try {
            this.ensureApprovedSetup();
            const localRows = Array.isArray(AppState.appData.approvedContractors)
                ? AppState.appData.approvedContractors.slice()
                : [];
            const rows = await this._fetchApprovedContractorsFromBackend();

            if (Array.isArray(rows) && rows.length > 0) {
                AppState.appData.approvedContractors = this.mergeApprovedContractorsWithLocalOnly(rows, localRows);
                this.ensureApprovedSetup();
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }
                if (this.currentTab === 'approved') {
                    this.refreshApprovedEntitiesList();
                }
                return true;
            }
            if (localRows.length > 0 && typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ جلب المعتمدين فارغ — الاحتفاظ بـ ' + localRows.length + ' سجل محلي');
            }
            return false;
        } catch (err) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ فشل جلب المقاولين المعتمدين من الخادم:', err);
            }
            return false;
        }
    },

    ensureApprovedContractorsDataLoaded(options = {}) {
        const force = options.force === true;
        const debounceMs = 30000;
        const now = Date.now();
        if (!force && this._approvedContractorsLastLoadAt && (now - this._approvedContractorsLastLoadAt) < debounceMs) {
            return Promise.resolve();
        }
        if (this._approvedContractorsSyncInFlight) {
            return this._approvedContractorsSyncInFlight;
        }

        const canLoad = typeof GoogleIntegration !== 'undefined' &&
            typeof GoogleIntegration.sendRequest === 'function' &&
            typeof GoogleIntegration._isBackendRpcConfigured === 'function' &&
            GoogleIntegration._isBackendRpcConfigured();

        if (!canLoad) {
            return Promise.resolve();
        }

        if (force && typeof GoogleIntegration._buildLocalDataStorageKey === 'function') {
            try {
                localStorage.removeItem(GoogleIntegration._buildLocalDataStorageKey('getAllApprovedContractors', {}));
                localStorage.removeItem(GoogleIntegration._buildLocalDataStorageKey('readFromSheet', { sheetName: 'ApprovedContractors' }));
            } catch (_clearErr) { /* ignore */ }
        }

        const runLoad = async () => {
            if (this.isContractorApprovalAdminUser() && options.reconcile === true) {
                await this.reconcileMissingApprovedContractors(options);
            }
            return this.fetchApprovedContractorsFromBackend();
        };

        this._approvedContractorsSyncInFlight = runLoad()
            .then((loaded) => {
                if (loaded) {
                    this._approvedContractorsLastLoadAt = Date.now();
                }
                return loaded;
            })
            .catch(() => false)
            .finally(() => {
                this._approvedContractorsSyncInFlight = null;
            });

        return this._approvedContractorsSyncInFlight;
    },

    /**
     * مزامنة طلبات معتمدة بدون سجل في ApprovedContractors (مثل CAR_0114)
     */
    async reconcileMissingApprovedContractors(options = {}) {
        if (!this.isContractorApprovalAdminUser()) return false;
        if (typeof GoogleIntegration === 'undefined') return false;
        try {
            const apiData = { ...this._approvalRequestApiPayload() };
            if (options.requestId) apiData.requestId = options.requestId;
            const res = await GoogleIntegration.sendRequest({
                action: 'reconcileMissingApprovedContractors',
                data: apiData
            });
            if (res && res.success && res.createdCount > 0) {
                if (typeof Utils !== 'undefined' && Utils.safeLog) {
                    Utils.safeLog('✅ reconcileMissingApprovedContractors: أُنشئ ' + res.createdCount + ' سجل معتمد');
                }
            }
            if (res && res.errors && res.errors.length > 0 && typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ reconcileMissingApprovedContractors أخطاء:', res.errors);
            }
            return !!(res && res.success);
        } catch (err) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ reconcileMissingApprovedContractors فشل:', err?.message || err);
            }
            return false;
        }
    },

    isCurrentUserApprovalRequestOwner(req) {
        if (!req) return false;
        const cu = AppState.currentUser || {};
        const userId = String(cu.id || '').trim();
        const userEmail = String(cu.email || '').trim().toLowerCase();
        const creator = String(req.createdBy || '').trim();
        if (!creator) return false;
        const creatorLower = creator.toLowerCase();
        return (userId && creator === userId) ||
            (userEmail && creatorLower === userEmail) ||
            (userId && creatorLower === userId.toLowerCase());
    },

    isContractorApprovalAdminUser() {
        if (typeof Permissions !== 'undefined') {
            if (typeof Permissions.isCurrentUserEffectiveAdmin === 'function' &&
                Permissions.isCurrentUserEffectiveAdmin()) {
                return true;
            }
            if (typeof Permissions.isCurrentUserAdmin === 'function' && Permissions.isCurrentUserAdmin()) {
                return true;
            }
            if (typeof Permissions.isAdmin === 'function' && Permissions.isAdmin()) {
                return true;
            }
            if (typeof Permissions.isAdminRole === 'function' &&
                Permissions.isAdminRole(AppState.currentUser?.role)) {
                return true;
            }
        }
        const role = String(AppState.currentUser?.role || '').trim().toLowerCase();
        return role === 'admin' || role === 'administrator' || role === 'مدير' || role === 'مدير النظام';
    },

    isApprovalRequestPendingForReview(req) {
        if (!req) return false;
        const st = this.normalizeApprovalRequestStatus(req.status);
        return st !== 'approved' && st !== 'rejected';
    },

    /**
     * ✅ مزامنة هادئة لطلبات الاعتماد (منفصلة عن syncDataFromServer — لا تلمس مسارات التحميل المحمية)
     */
    ensureApprovalRequestsDataLoaded(options = {}) {
        const force = options.force === true;
        const debounceMs = 30000;
        const now = Date.now();
        if (!force && this._approvalRequestsLastLoadAt && (now - this._approvalRequestsLastLoadAt) < debounceMs) {
            return Promise.resolve();
        }
        if (this._approvalRequestsSyncInFlight) {
            return this._approvalRequestsSyncInFlight;
        }

        const canLoad = typeof GoogleIntegration !== 'undefined' &&
            typeof GoogleIntegration.sendRequest === 'function' &&
            typeof GoogleIntegration._isBackendRpcConfigured === 'function' &&
            GoogleIntegration._isBackendRpcConfigured();

        if (!canLoad) {
            if (force) {
                return this._waitForBackendThenLoadApprovalRequests(options);
            }
            return Promise.resolve();
        }

        if (force && typeof GoogleIntegration._buildLocalDataStorageKey === 'function') {
            this._clearApprovalRequestReadCaches();
        }

        this._approvalRequestsSyncInFlight = this.fetchContractorApprovalRequestsFromBackend()
            .then((loaded) => {
                if (loaded) {
                    this._approvalRequestsLastLoadAt = Date.now();
                }
                return loaded;
            })
            .catch((err) => {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ فشل مزامنة طلبات اعتماد المقاولين:', err);
                }
                return false;
            })
            .finally(() => {
                this._approvalRequestsSyncInFlight = null;
            });

        return this._approvalRequestsSyncInFlight;
    },

    async _waitForBackendThenLoadApprovalRequests(options, attempt = 0) {
        const maxAttempts = 24;
        if (attempt >= maxAttempts) {
            return false;
        }
        const ready = typeof GoogleIntegration !== 'undefined' &&
            typeof GoogleIntegration._isBackendRpcConfigured === 'function' &&
            GoogleIntegration._isBackendRpcConfigured();
        if (ready) {
            if (this._approvalRequestsSyncInFlight) {
                return this._approvalRequestsSyncInFlight;
            }
            this._approvalRequestsSyncInFlight = this.fetchContractorApprovalRequestsFromBackend()
                .finally(() => { this._approvalRequestsSyncInFlight = null; });
            return this._approvalRequestsSyncInFlight;
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
        return this._waitForBackendThenLoadApprovalRequests(options, attempt + 1);
    },

    /**
     * إعادة محاولة تحميل طلبات الاعتماد من الخادم (زر placeholder)
     */
    async bootstrapApprovalRequestsData() {
        return this.ensureApprovalRequestsDataLoaded({ force: true });
    },

    /**
     * التبديل بين التبويبات
     * ✅ إصلاح بسيط ومستقر
     */
    switchTab(tab) {
        // ✅ التحقق من وجود التبويب
        if (!tab) return;
        
        // ✅ منع التبديل المتكرر لنفس التبويب
        if (this.currentTab === tab) return;
        
        // ✅ حفظ التبويب
        this.currentTab = tab;

        // ✅ تحديث أزرار التبويب
        const tabBtns = document.querySelectorAll('.contractors-tab-btn');
        tabBtns.forEach(btn => {
            btn.classList.remove('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
            btn.classList.add('text-gray-500');
        });

        const activeBtn = document.getElementById(`contractors-tab-${tab}`);
        if (activeBtn) {
            activeBtn.classList.add('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
            activeBtn.classList.remove('text-gray-500');
        }

        // ✅ إخفاء جميع المحتويات وإظهار المطلوب فقط
        const contents = document.querySelectorAll('.contractors-tab-content');
        contents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        const activeContent = document.getElementById(`contractors-${tab}-content`);
        if (activeContent) {
            activeContent.classList.add('active');
            activeContent.style.display = 'block';
        }

        if (tab === 'approved') {
            if (!this._tabsLoaded?.approved) {
                this.loadContractorsTabContent('approved', { fetchData: true, forceData: true, reconcile: true });
                this._tabsLoaded.approved = true;
            } else {
                this.ensureApprovedContractorsDataLoaded({ force: true, reconcile: true })
                    .then(() => {
                        this.ensureApprovedTabContentLoaded(true);
                        this.refreshApprovedEntitiesList();
                    })
                    .catch(() => {
                        this.ensureApprovedTabContentLoaded(true);
                    });
            }
        }

        if (tab === 'approval-request') {
            if (!this._tabsLoaded?.['approval-request']) {
                this.loadContractorsTabContent('approval-request', { fetchData: true, forceData: true });
                this._tabsLoaded['approval-request'] = true;
            } else {
                this.ensureApprovalRequestsDataLoaded({ force: true })
                    .then(() => this.refreshApprovalRequestsSection())
                    .catch(() => {});
            }
        }

        if (tab === 'evaluations') {
            if (!this._tabsLoaded?.evaluations) {
                this.loadContractorsTabContent('evaluations', { fetchData: true, forceData: true });
                this._tabsLoaded.evaluations = true;
            } else {
                this.ensureEvaluationsEventListeners();
                this.ensureEvaluationsDataLoaded();
                this.ensureEvaluationApprovalRequestsDataLoaded({ force: false })
                    .then(() => {
                        if (this.currentTab === 'evaluations') {
                            this.refreshEvaluationApprovalRequestsSection();
                        }
                    })
                    .catch(() => {});
            }
        }

        if (tab === 'requirements' && !this._tabsLoaded?.requirements) {
            this.loadContractorsTabContent('requirements', { fetchData: false });
            this._tabsLoaded.requirements = true;
        }

        if (tab === 'analytics') {
            this.bindContractorAnalyticsEvents();
            if (!this._tabsLoaded?.analytics) {
                this.loadContractorsTabContent('analytics', { fetchData: true, forceData: true });
                this._tabsLoaded.analytics = true;
            } else {
                this.loadContractorAnalytics();
            }
        }
    },

    /**
     * ✅ التأكد من تحميل بيانات التقييمات عند فتح التبويب (مزامنة من Backend إن كانت القائمة فارغة)
     */
    ensureEvaluationsDataLoaded() {
        const evaluations = AppState.appData.contractorEvaluations;
        const hasData = Array.isArray(evaluations) && evaluations.length > 0;
        if (hasData) return;

        const canSync = typeof GoogleIntegration !== 'undefined' &&
            typeof GoogleIntegration.syncData === 'function' &&
            AppState.googleConfig?.appsScript?.enabled &&
            AppState.googleConfig?.appsScript?.scriptUrl;

        if (!canSync) return;

        GoogleIntegration.syncData({
            sheets: ['ContractorEvaluations'],
            silent: true,
            showLoader: false,
            notifyOnSuccess: false,
            notifyOnError: true
        }).then(() => {
            const after = AppState.appData.contractorEvaluations || [];
            if (Array.isArray(after) && after.length > 0) {
                this.refreshEvaluationsList(this.currentEvaluationFilter || '');
            }
        }).catch(() => {});
    },

    /**
     * ✅ إصلاح: تحميل محتوى تبويب طلبات الاعتماد
     */
    loadApprovalRequestTab(container, skipIfExists = false) {
        try {
            if (!container) {
                return;
            }
            
            // إذا كان المحتوى موجوداً بالفعل، لا نفعل شيئاً
            if (skipIfExists && container.innerHTML.trim() !== '') {
                return;
            }
            
            // تحميل المحتوى مباشرة
            this.ensureData();
            const approvalHTML = this.renderApprovalRequestSection();
            this.safeSetInnerHTML(container, approvalHTML);
            
            // ربط event listener مباشرة
            const sendBtn = document.getElementById('send-approval-request-btn');
            if (sendBtn && !sendBtn.hasAttribute('data-listener-attached')) {
                sendBtn.setAttribute('data-listener-attached', 'true');
                sendBtn.addEventListener('click', () => this.showApprovalRequestForm());
            }
        } catch (error) {
            Utils.safeError('خطأ في تحميل تبويب طلبات الاعتماد:', error);
            
            if (container && document.contains(container)) {
                const errorHTML = `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-4xl text-yellow-400 mb-3"></i>
                                <p class="text-gray-500">حدث خطأ في تحميل البيانات</p>
                                <button onclick="Contractors.switchTab('approval-request')" class="btn-secondary mt-3">إعادة المحاولة</button>
                            </div>
                        </div>
                    </div>
                `;
                this.safeSetInnerHTML(container, errorHTML);
            }
        }
    },

    /**
     * حساب إحصائيات قائمة المقاولين
     */
    getContractorsStats() {
        const contractors = AppState.appData.contractors || [];

        // إحصائيات حسب نوع الخدمة
        const serviceTypes = {};
        contractors.forEach(c => {
            const serviceType = c.serviceType || 'غير محدد';
            serviceTypes[serviceType] = (serviceTypes[serviceType] || 0) + 1;
        });

        // إحصائيات حسب حالة الاشتراطات
        let requirementsMet = 0;
        let requirementsPartial = 0;
        let requirementsNotMet = 0;

        contractors.forEach(c => {
            const reqStatus = this.getContractorRequirementsStatus(c.id);
            if (reqStatus.allMet) {
                requirementsMet++;
            } else if (reqStatus.completed > 0) {
                requirementsPartial++;
            } else {
                requirementsNotMet++;
            }
        });

        // إحصائيات حسب الحالة
        const statusCounts = {
            'نشط': 0,
            'منتهي': 0,
            'معلق': 0,
            'أخرى': 0
        };

        contractors.forEach(c => {
            const status = c.status || 'أخرى';
            if (statusCounts.hasOwnProperty(status)) {
                statusCounts[status]++;
            } else {
                statusCounts['أخرى']++;
            }
        });

        return {
            total: contractors.length,
            serviceTypes,
            requirements: {
                met: requirementsMet,
                partial: requirementsPartial,
                notMet: requirementsNotMet
            },
            status: statusCounts
        };
    },

    /**
     * رسم كارت إحصائيات قائمة المقاولين
     */
    renderContractorsStats() {
        const stats = this.getContractorsStats();
        const topServiceTypes = Object.entries(stats.serviceTypes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">إجمالي المقاولين</p>
                            <p class="text-2xl font-bold text-blue-600">${stats.total}</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-users-cog text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">أكثر أنواع الخدمات</p>
                            <p class="text-lg font-semibold text-green-600">
                                ${topServiceTypes.length > 0 ? topServiceTypes[0][0] : 'لا يوجد'}
                            </p>
                            <p class="text-xs text-gray-500">${topServiceTypes.length > 0 ? topServiceTypes[0][1] : 0} مقاول</p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-tools text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">حالة الاشتراطات</p>
                            <p class="text-lg font-semibold text-purple-600">
                                ${stats.requirements.met} مستوفي
                            </p>
                            <p class="text-xs text-gray-500">
                                ${stats.requirements.partial} جزئي / ${stats.requirements.notMet} غير مستوفي
                            </p>
                        </div>
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-clipboard-check text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">الحالة</p>
                            <p class="text-lg font-semibold text-orange-600">
                                ${stats.status['نشط']} نشط
                            </p>
                            <p class="text-xs text-gray-500">
                                ${stats.status['منتهي']} منتهي / ${stats.status['معلق']} معلق
                            </p>
                        </div>
                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-chart-line text-orange-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },


    /**
     * توليد كود تلقائي للمقاول (مثل: CON-001, CON-002)
     */
    generateContractorCode() {
        const contractors = AppState.appData.contractors || [];
        let maxNumber = 0;

        // البحث عن أكبر رقم في الأكواد الموجودة
        contractors.forEach(contractor => {
            if (contractor.code) {
                const match = contractor.code.match(/CON-(\d+)/);
                if (match) {
                    const num = parseInt(match[1], 10);
                    if (num > maxNumber) {
                        maxNumber = num;
                    }
                }
            }
        });

        // توليد كود جديد
        const newNumber = maxNumber + 1;
        return `CON-${String(newNumber).padStart(3, '0')}`;
    },

    /**
     * ✅ استخراج الرقم من كود المقاول للترتيب الصحيح
     * مثال: CON-001 → 1, CON-010 → 10, CON-100 → 100
     */
    extractContractorCodeNumber(code) {
        if (!code) return 0;
        const match = String(code).match(/CON-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    },

    /**
     * ✅ دالة مقارنة لترتيب المقاولين حسب كود المقاول
     * الترتيب: CON-001, CON-002, ..., CON-010, ..., CON-100
     */
    sortByContractorCode(a, b) {
        const codeA = a.code || a.contractorCode || '';
        const codeB = b.code || b.contractorCode || '';
        
        const numA = Contractors.extractContractorCodeNumber(codeA);
        const numB = Contractors.extractContractorCodeNumber(codeB);
        
        // إذا كان لديهما أرقام، الترتيب حسب الرقم
        if (numA > 0 && numB > 0) {
            return numA - numB;
        }
        
        // إذا كان أحدهما فقط لديه رقم، الذي لديه رقم يأتي أولاً
        if (numA > 0) return -1;
        if (numB > 0) return 1;
        
        // إذا لم يكن لديهما أرقام، الترتيب أبجدياً حسب الاسم
        const nameA = a.companyName || a.name || '';
        const nameB = b.companyName || b.name || '';
        return nameA.localeCompare(nameB, 'ar', { sensitivity: 'base' });
    },

    normalizeApprovedStatus(value) {
        const normalized = (value || '').toString().trim().toLowerCase();
        if (!normalized) return 'under_review';
        if (['approved', 'معتمد', 'accept', 'accepted', 'active', 'valid', 'pass'].includes(normalized)) {
            return 'approved';
        }
        if (['rejected', 'مرفوض', 'رفض', 'cancelled', 'canceled', 'denied', 'invalid', 'expired'].includes(normalized)) {
            return 'rejected';
        }
        return 'under_review';
    },

    normalizeApprovedEntityType(value) {
        const normalized = (value || '').toString().trim().toLowerCase();
        if (['supplier', 'مورد', 'مورّد', 'vendor'].includes(normalized)) {
            return 'supplier';
        }
        return 'contractor';
    },

    getApprovedStatusLabel(status) {
        return APPROVED_ENTITY_STATUS_OPTIONS[status] || 'تحت المراجعة';
    },

    getApprovedTypeLabel(entityType) {
        return APPROVED_ENTITY_TYPE_OPTIONS[entityType] || APPROVED_ENTITY_TYPE_OPTIONS.contractor;
    },

    normalizeApprovedSearchText(value) {
        let text = String(value || '').trim().toLowerCase();
        text = text.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (ch) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(ch)));
        text = text.replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (ch) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(ch)));
        return text.replace(/\s+/g, ' ').trim();
    },

    extractSearchDigitsOnly(value) {
        return String(value || '')
            .replace(/[٠١٢٣٤٥٦٧٨٩]/g, (ch) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(ch)))
            .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (ch) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(ch)))
            .replace(/\D/g, '');
    },

    buildApprovedEntitySearchBlob(record) {
        if (!record) return '';
        let contractorCode = record.code || record.isoCode || record.contractorCode ||
            record['كود المقاول'] || record['كود'] || record.codeNumber || '';
        if (!contractorCode && record.contractorId) {
            const contractor = (AppState.appData.contractors || []).find((c) => c.id === record.contractorId);
            if (contractor) {
                contractorCode = contractor.code || contractor.isoCode || contractor.contractorCode || '';
            }
        }
        const normalizedStatus = this.normalizeApprovedStatus(record.status);
        const normalizedType = this.normalizeApprovedEntityType(record.entityType || record.type);
        const parts = [
            record.companyName,
            record.name,
            record.serviceType,
            record.licenseNumber,
            record.safetyReviewer,
            record.notes,
            record.contractNumber,
            contractorCode,
            record.isoCode,
            record.code,
            record.phone,
            record.mobile,
            record.email,
            record.contactPerson,
            record.contactName,
            this.getApprovedStatusLabel(normalizedStatus),
            this.getApprovedTypeLabel(normalizedType),
            normalizedStatus,
            normalizedType,
            record.approvalDate ? Utils.formatDate(record.approvalDate) : '',
            record.expiryDate ? Utils.formatDate(record.expiryDate) : '',
            record.id,
            record.contractorId
        ];
        return this.normalizeApprovedSearchText(parts.filter((p) => p != null && String(p).trim() !== '').join(' '));
    },

    matchesApprovedEntitySearch(record, normalizedQuery) {
        const query = this.normalizeApprovedSearchText(normalizedQuery);
        if (!query) return true;

        const blob = this.buildApprovedEntitySearchBlob(record);
        const tokens = query.split(' ').filter(Boolean);
        if (tokens.length > 0 && tokens.every((token) => blob.includes(token))) {
            return true;
        }

        const queryDigits = this.extractSearchDigitsOnly(query);
        if (queryDigits.length >= 1) {
            const digitFields = [
                record.licenseNumber,
                record.contractNumber,
                record.code,
                record.isoCode,
                record.contractorCode,
                record.phone,
                record.mobile,
                record.companyName,
                record.id,
                record.contractorId
            ];
            if (record.contractorId) {
                const contractor = (AppState.appData.contractors || []).find((c) => c.id === record.contractorId);
                if (contractor) {
                    digitFields.push(contractor.code, contractor.licenseNumber, contractor.contractNumber, contractor.phone);
                }
            }
            const digitBlob = digitFields
                .map((field) => this.extractSearchDigitsOnly(field))
                .filter(Boolean)
                .join('');
            if (digitBlob.includes(queryDigits)) return true;
        }

        return false;
    },

    getApprovedStatusBadgeClass(status) {
        if (status === 'approved') return 'badge-success';
        if (status === 'under_review') return 'badge-warning';
        return 'badge-danger';
    },

    isApprovalExpired(record) {
        if (!record?.expiryDate) return false;
        const expiry = new Date(record.expiryDate);
        if (Number.isNaN(expiry.getTime())) return false;
        const today = new Date();
        expiry.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return expiry < today;
    },

    isApprovalActive(record, includeExpired = false) {
        if (!record) return false;

        if (!this.isEntityEnabled(record)) {
            return false;
        }

        const status = (record.status || '').toString().toLowerCase().trim();
        const approvedStatuses = ['approved', 'معتمد', 'نشط', 'active', 'مفعل', 'مفعّل', ''];

        if (record.status && !approvedStatuses.includes(status)) {
            return false;
        }

        if (includeExpired) return true;
        return !this.isApprovalExpired(record);
    },

    /**
     * فحص حالة التفعيل التشغيلي للمقاول/المورد.
     * يُعاد false فقط إذا كان الحقل isActive يساوي false صراحة.
     * أي قيمة أخرى (true, undefined, null) تعني مفعّل للتوافق مع البيانات القديمة.
     */
    isEntityEnabled(record) {
        if (!record || typeof record !== 'object') return true;
        const v = record.isActive;
        // القيمة الجديدة 'active'/'inactive' + دعم القيم القديمة للتوافق
        if (v === 'inactive') return false;
        if (v === false || v === 'false' || v === 'FALSE' || v === 0 || v === '0') return false;
        return true; // 'active', true, undefined, null كلها تعني مفعّل
    },

    /**
     * ✅ دالة تشخيصية: فحص حالة مقاول معين
     * يمكن استدعاؤها من Console للتحقق من سبب عدم ظهور مقاول
     * @param {string} codeOrName - كود المقاول (مثل CON-056) أو اسمه
     */
    debugContractorVisibility(codeOrName) {
        console.log('🔍 فحص حالة المقاول:', codeOrName);
        
        // البحث في قائمة المعتمدين
        const approvedList = AppState.appData.approvedContractors || [];
        const approved = approvedList.find(a => 
            (a.code && a.code === codeOrName) || 
            (a.isoCode && a.isoCode === codeOrName) || 
            (a.companyName && a.companyName.includes(codeOrName))
        );
        
        if (!approved) {
            console.error('❌ المقاول غير موجود في قائمة المعتمدين (AppState.appData.approvedContractors)');
            return {
                found: false,
                message: 'المقاول غير موجود في قائمة المعتمدين'
            };
        }
        
        console.log('✅ المقاول موجود في قائمة المعتمدين:', approved);
        
        // فحص الحالة - تحديث للقيم المقبولة
        const status = (approved.status || '').toString().toLowerCase().trim();
        const approvedStatuses = ['approved', 'معتمد', 'نشط', 'active', 'مفعل', 'مفعّل', ''];
        const isApproved = approvedStatuses.includes(status);
        console.log(`📊 الحالة (status): "${approved.status}"`, isApproved ? '✅ معتمد' : '❌ غير معتمد');
        
        // فحص الصلاحية
        const isExpired = this.isApprovalExpired(approved);
        console.log(`📅 تاريخ الانتهاء (expiryDate): ${approved.expiryDate || 'غير محدد'}`, isExpired ? '❌ منتهي' : '✅ ساري');
        
        // فحص نشاط الاعتماد
        const isActive = this.isApprovalActive(approved, false);
        console.log(`🔄 نشط (isApprovalActive): ${isActive}`, isActive ? '✅' : '❌');
        
        // فحص الاشتراطات (إذا كان له contractorId)
        let requirementsMet = true;
        if (approved.contractorId) {
            requirementsMet = this.checkAllRequirementsMet(approved.contractorId);
            console.log(`📋 الاشتراطات (checkAllRequirementsMet): ${requirementsMet}`, requirementsMet ? '✅ مستوفاة' : '❌ غير مستوفاة');
        } else {
            console.log('ℹ️ لا يوجد contractorId - لا حاجة لفحص الاشتراطات');
        }
        
        // التحقق من الظهور في getAllContractorsForModules
        const allContractors = this.getAllContractorsForModules();
        const appearsInList = allContractors.some(c => 
            c.id === approved.id || 
            c.id === approved.contractorId || 
            (c.name && approved.companyName && c.name === approved.companyName)
        );
        console.log(`📋 يظهر في قائمة المديولات (getAllContractorsForModules): ${appearsInList}`, appearsInList ? '✅' : '❌');

        // التحقق من الظهور في getContractorOptionsForModules
        const forForms = this.getContractorOptionsForModules();
        const appearsInForms = forForms.some(c => 
            c.id === approved.id || 
            c.id === approved.contractorId || 
            (c.name && approved.companyName && c.name === approved.companyName)
        );
        console.log(`📝 يظهر في النماذج (getContractorOptionsForModules): ${appearsInForms}`, appearsInForms ? '✅' : '❌');
        
        return {
            found: true,
            approved: approved,
            checks: {
                isApproved: isApproved,
                isExpired: isExpired,
                isActive: isActive,
                requirementsMet: requirementsMet,
                appearsInList: appearsInList,
                appearsInForms: appearsInForms
            },
            shouldAppear: isActive,
            message: isActive ? 'يجب أن يظهر المقاول في النماذج' : 'المقاول لا يستوفي معايير الظهور'
        };
    },

    /**
     * ✅ دالة تشخيصية شاملة: فحص جميع المقاولين المعتمدين
     * تعرض أسباب عدم ظهور كل مقاول في النماذج
     */
    debugAllContractorsVisibility() {
        console.log('═══════════════════════════════════════════════════════════');
        console.log('🔍 فحص شامل لجميع المقاولين المعتمدين');
        console.log('═══════════════════════════════════════════════════════════');
        
        const approvedList = AppState.appData.approvedContractors || [];
        const forForms = this.getContractorOptionsForModules();
        const allFromModules = this.getAllContractorsForModules();
        
        console.log(`📊 إجمالي سجلات المعتمدين: ${approvedList.length}`);
        console.log(`📊 المقاولين في getAllContractorsForModules: ${allFromModules.length}`);
        console.log(`📊 المقاولين في getContractorOptionsForModules (للنماذج): ${forForms.length}`);
        console.log('═══════════════════════════════════════════════════════════');
        
        const results = {
            total: approvedList.length,
            visible: 0,
            hidden: 0,
            reasons: {
                statusNotApproved: [],
                expired: [],
                noName: [],
                notInForms: []
            }
        };
        
        approvedList.forEach((record, index) => {
            const name = record.companyName || record.name || '(بدون اسم)';
            const code = record.code || record.isoCode || '(بدون كود)';
            const status = (record.status || '').toString();
            
            const isActive = this.isApprovalActive(record, true);
            const isExpired = this.isApprovalExpired(record);
            
            const appearsInForms = forForms.some(c => 
                c.id === record.id || 
                c.id === record.contractorId || 
                (c.name && record.companyName && c.name === record.companyName)
            );
            
            if (appearsInForms) {
                results.visible++;
                console.log(`✅ ${index + 1}. ${code} - ${name} [status: "${status}"]`);
            } else {
                results.hidden++;
                let reason = '';
                
                if (!isActive) {
                    const statusLower = status.toLowerCase().trim();
                    const approvedStatuses = ['approved', 'معتمد', 'نشط', 'active', 'مفعل', 'مفعّل', ''];
                    if (!approvedStatuses.includes(statusLower)) {
                        reason = `حالة غير معتمدة: "${status}"`;
                        results.reasons.statusNotApproved.push({ name, code, status });
                    }
                }
                
                if (isExpired) {
                    reason = `منتهي الصلاحية: ${record.expiryDate}`;
                    results.reasons.expired.push({ name, code, expiryDate: record.expiryDate });
                }
                
                if (!name || name === '(بدون اسم)') {
                    reason = 'بدون اسم';
                    results.reasons.noName.push({ id: record.id, code });
                }
                
                if (!reason) {
                    reason = 'سبب غير معروف - يحتاج فحص يدوي';
                    results.reasons.notInForms.push({ name, code, record });
                }
                
                console.log(`❌ ${index + 1}. ${code} - ${name} [status: "${status}"] → ${reason}`);
            }
        });
        
        console.log('═══════════════════════════════════════════════════════════');
        console.log(`📊 الملخص: ${results.visible} يظهر ✅ | ${results.hidden} لا يظهر ❌`);
        console.log('═══════════════════════════════════════════════════════════');
        
        if (results.reasons.statusNotApproved.length > 0) {
            console.log('\n⚠️ مقاولين بحالة غير "approved":');
            console.table(results.reasons.statusNotApproved);
        }
        
        if (results.reasons.expired.length > 0) {
            console.log('\n⚠️ مقاولين منتهية صلاحيتهم:');
            console.table(results.reasons.expired);
        }
        
        if (results.reasons.noName.length > 0) {
            console.log('\n⚠️ سجلات بدون اسم:');
            console.table(results.reasons.noName);
        }
        
        if (results.reasons.notInForms.length > 0) {
            console.log('\n⚠️ مقاولين لم يظهروا لسبب غير واضح:');
            results.reasons.notInForms.forEach(item => {
                console.log('   -', item.name, item.code);
                console.log('     السجل الكامل:', item.record);
            });
        }
        
        return results;
    },

    ensureApprovedSetup() {
        // ✅ حماية: التأكد من وجود AppState و appData قبل الوصول
        if (!AppState || !AppState.appData) {
            if (typeof window !== 'undefined') {
                window.AppState = window.AppState || {};
                window.AppState.appData = window.AppState.appData || {};
            } else {
                return; // لا يمكن المتابعة بدون AppState
            }
        }
        
        const collection = AppState.appData.approvedContractors;
        if (!Array.isArray(collection)) {
            AppState.appData.approvedContractors = [];
            return;
        }

        let mutated = false;
        AppState.appData.approvedContractors = collection.filter((item) => item && typeof item === 'object').map((item) => {
            const normalized = Object.assign({}, item);
            if (!normalized.id) {
                normalized.id = (typeof Utils !== 'undefined' && Utils.generateId)
                    ? Utils.generateId('APPCON')
                    : (`APPCON_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
                mutated = true;
            }

            const companyName = (normalized.companyName || normalized.name || '').trim();
            if (companyName !== normalized.companyName) {
                normalized.companyName = companyName;
                mutated = true;
            }

            const entityType = this.normalizeApprovedEntityType(normalized.entityType || normalized.type);
            if (entityType !== normalized.entityType) {
                normalized.entityType = entityType;
                mutated = true;
            }

            const serviceType = (normalized.serviceType || normalized.activity || normalized.service || '').trim();
            if (serviceType !== normalized.serviceType) {
                normalized.serviceType = serviceType;
                mutated = true;
            }

            const licenseNumber = (normalized.licenseNumber || normalized.commercialNumber || normalized.license || '').trim();
            if (licenseNumber !== normalized.licenseNumber) {
                normalized.licenseNumber = licenseNumber;
                mutated = true;
            }

            const safetyReviewer = (normalized.safetyReviewer || normalized.reviewer || '').trim();
            if (safetyReviewer !== normalized.safetyReviewer) {
                normalized.safetyReviewer = safetyReviewer;
                mutated = true;
            }

            const notes = (normalized.notes || normalized.remark || '').trim();
            if (notes !== normalized.notes) {
                normalized.notes = notes;
                mutated = true;
            }

            const status = this.normalizeApprovedStatus(normalized.status || normalized.statusLabel);
            if (status !== normalized.status) {
                normalized.status = status;
                mutated = true;
            }

            normalized.approvalDate = normalized.approvalDate || normalized.accreditationDate || '';
            normalized.expiryDate = normalized.expiryDate || normalized.expirationDate || '';
            normalized.createdAt = normalized.createdAt || new Date().toISOString();
            normalized.updatedAt = normalized.updatedAt || new Date().toISOString();

            // قراءة كود المقاول من قاعدة البيانات (دعم أسماء الحقول المختلفة)
            let contractorCode = normalized.isoCode || normalized.code ||
                normalized.contractorCode || normalized['كود المقاول'] ||
                normalized['كود'] || normalized.codeNumber || '';

            // إذا كان هناك contractorId، البحث عن كود المقاول في قائمة المقاولين
            if (!contractorCode && normalized.contractorId) {
                const contractors = AppState.appData.contractors || [];
                const contractor = contractors.find(c => c.id === normalized.contractorId);
                if (contractor && contractor.code) {
                    contractorCode = contractor.code;
                }
            }

            // لا نولّد ولا نعدّل كود المعتمد في الواجهة تلقائياً للحفاظ على ثباته بعد توليده
            normalized.isoCode = contractorCode || normalized.isoCode || '';
            normalized.code = contractorCode || normalized.code || '';
            // التأكد من تطابق الحقلين
            if (normalized.isoCode !== normalized.code) {
                normalized.code = normalized.isoCode;
                mutated = true;
            }

            return normalized;
        });

        if (mutated) {
            // حفظ البيانات باستخدام window.DataManager
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            } else {
                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
            }
        }
    },

    /**
     * تحويل الأكواد القديمة APP-xxx إلى CON-xxx
     */
    convertOldApprovedCodes() {
        const approvedContractors = AppState.appData.approvedContractors || [];
        const contractors = AppState.appData.contractors || [];
        let mutated = false;

        approvedContractors.forEach(entity => {
            const oldCode = entity.isoCode || entity.code;
            if (oldCode && oldCode.match(/^APP-(\d+)$/)) {
                const match = oldCode.match(/^APP-(\d+)$/);
                if (match) {
                    const newCode = `CON-${match[1]}`;

                    // التحقق من عدم وجود كود CON-xxx مكرر
                    const existingWithNewCode = contractors.find(c => c.code === newCode) ||
                        approvedContractors.find(e => (e.isoCode === newCode || e.code === newCode) && e.id !== entity.id);

                    if (!existingWithNewCode) {
                        entity.isoCode = newCode;
                        entity.code = newCode;
                        mutated = true;
                    } else {
                        // إذا كان الكود مكرراً، توليد كود جديد
                        let maxNumber = 0;
                        contractors.forEach(c => {
                            if (c.code) {
                                const m = c.code.match(/CON-(\d+)/);
                                if (m) {
                                    const num = parseInt(m[1], 10);
                                    if (num > maxNumber) maxNumber = num;
                                }
                            }
                        });
                        approvedContractors.forEach(e => {
                            const code = e.isoCode || e.code;
                            if (code) {
                                let m = code.match(/CON-(\d+)/);
                                if (m) {
                                    const num = parseInt(m[1], 10);
                                    if (num > maxNumber) maxNumber = num;
                                }
                            }
                        });
                        const newNumber = maxNumber + 1;
                        const finalCode = `CON-${String(newNumber).padStart(3, '0')}`;
                        entity.isoCode = finalCode;
                        entity.code = finalCode;
                        mutated = true;
                    }
                }
            }
        });

        if (mutated) {
            AppState.appData.approvedContractors = approvedContractors;
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }
        }
    },

    getFilteredApprovedEntities() {
        this.ensureApprovedSetup();

        // دمج قائمة المعتمدين مع قائمة المقاولين العادية
        const approvedRecords = (AppState.appData.approvedContractors || []).slice();
        const regularContractors = (AppState.appData.contractors || []).slice();

        // تحويل المقاولين العاديين إلى نفس تنسيق المعتمدين للتوحيد
        const convertedContractors = regularContractors.filter((c) => c && typeof c === 'object').map(contractor => {
            // التأكد من وجود كود للمقاول
            if (!contractor.code) {
                contractor.code = this.generateContractorCode();
            }

            // البحث عن سجل معتمد مرتبط بهذا المقاول
            const relatedApproved = approvedRecords.find(ap => ap.contractorId === contractor.id);

            return {
                id: contractor.id,
                contractorId: contractor.id,
                companyName: contractor.name || contractor.company || '',
                entityType: 'contractor',
                serviceType: contractor.serviceType || '',
                licenseNumber: contractor.licenseNumber || contractor.contractNumber || '',
                approvalDate: relatedApproved?.approvalDate || contractor.startDate || '',
                expiryDate: relatedApproved?.expiryDate || contractor.endDate || '',
                safetyReviewer: relatedApproved?.safetyReviewer || '',
                notes: relatedApproved?.notes || contractor.notes || '',
                status: relatedApproved?.status || (contractor.status === 'نشط' ? 'approved' : 'under_review'),
                createdAt: contractor.createdAt || new Date().toISOString(),
                updatedAt: contractor.updatedAt || new Date().toISOString(),
                code: contractor.code,
                contractNumber: contractor.contractNumber,
                isRegularContractor: true, // علامة للتمييز
                isActive: (!this.isEntityEnabled(contractor) ? false : (relatedApproved && !this.isEntityEnabled(relatedApproved) ? false : true)),
                requirementsStatus: this.getContractorRequirementsStatus(contractor.id)
            };
        });

        // دمج القوائم مع تجنب التكرار (إذا كان المقاول موجود في المعتمدين، نستخدم بيانات المعتمدين)
        // التحقق من التكرار بناءً على contractorId أولاً، ثم الكود، ثم الاسم
        const allRecords = [...approvedRecords];
        const addedIds = new Set(approvedRecords.map(r => r.contractorId || r.id).filter(Boolean));

        convertedContractors.forEach(converted => {
            // التحقق من التكرار بناءً على contractorId
            if (converted.contractorId && addedIds.has(converted.contractorId)) {
                return; // المقاول موجود بالفعل في قائمة المعتمدين
            }

            // التحقق من التكرار بناءً على الكود
            const convertedCode = converted.code || converted.isoCode;
            if (convertedCode) {
                const existsByCode = allRecords.find(r => {
                    const rCode = r.code || r.isoCode;
                    return rCode && rCode === convertedCode;
                });
                if (existsByCode) {
                    return; // الكود موجود بالفعل
                }
            }

            // التحقق من التكرار بناءً على الاسم
            const convertedName = (converted.companyName || '').trim().toLowerCase();
            if (convertedName) {
                const existsByName = allRecords.find(r => {
                    const rName = (r.companyName || '').trim().toLowerCase();
                    return rName && rName === convertedName && r.entityType === converted.entityType;
                });
                if (existsByName) {
                    return; // الاسم موجود بالفعل
                }
            }

            // إضافة المقاول إذا لم يكن مكرراً
            allRecords.push(converted);
            if (converted.contractorId) {
                addedIds.add(converted.contractorId);
            }
        });

        if (allRecords.length === 0) {
            this._approvedFilterCounts = { total: 0, filtered: 0 };
            return [];
        }

        const { search, status, type, validity } = this.approvedFilters;
        const normalizedSearch = this.normalizeApprovedSearchText(search || '');
        const hasSearch = normalizedSearch.length > 0;

        const filtered = allRecords.filter((record) => {
            if (status && this.normalizeApprovedStatus(record.status) !== status) return false;
            if (type && this.normalizeApprovedEntityType(record.entityType || record.type) !== type) return false;

            if (validity === 'valid' && this.isApprovalExpired(record)) return false;
            if (validity === 'expired') {
                if (!record.expiryDate) return false;
                if (!this.isApprovalExpired(record)) return false;
            }

            if (hasSearch && !this.matchesApprovedEntitySearch(record, normalizedSearch)) return false;
            return true;
        });

        this._approvedFilterCounts = { total: allRecords.length, filtered: filtered.length };

        return filtered.sort((a, b) => {
            return Contractors.sortByContractorCode(a, b);
        });
    },

    getApprovedEntityStatsKey(record) {
        if (!record) return '';
        const entityType = this.normalizeApprovedEntityType(record.entityType || record.type);
        const normalizedName = String(record.companyName || record.name || '')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
        const normalizedCode = String(record.code || record.isoCode || '')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
        const normalizedLinkedId = String(record.contractorId || record.id || '')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
        return `${entityType}::${normalizedName || normalizedCode || normalizedLinkedId}`;
    },

    getApprovedEntitiesStatsSource() {
        const visibleApprovedEntities = this.getFilteredApprovedEntities()
            .filter((record) => !record.isRegularContractor);

        const seen = new Set();
        return visibleApprovedEntities.filter((record) => {
            const key = this.getApprovedEntityStatsKey(record);
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    },

    /**
     * حساب إحصائيات قائمة المعتمدين الفعلية الظاهرة بعد التصفية
     */
    getApprovedEntitiesStats() {
        const approvedEntities = this.getApprovedEntitiesStatsSource();
        const activeEntities = approvedEntities.filter((entity) => this.isEntityEnabled(entity));
        const inactiveEntities = approvedEntities.filter((entity) => !this.isEntityEnabled(entity));

        // عدّاد الكروت الأساسية = النشطون فقط (ليتأثر فوراً عند التعطيل/التفعيل)
        const contractorsCount = activeEntities.filter((entity) =>
            this.normalizeApprovedEntityType(entity.entityType || entity.type) === 'contractor'
        ).length;
        const suppliersCount = activeEntities.filter((entity) =>
            this.normalizeApprovedEntityType(entity.entityType || entity.type) === 'supplier'
        ).length;

        // توزيع نوع الجهة على كامل العناصر الظاهرة (نشط + غير نشط)
        const contractorsTotal = approvedEntities.filter((entity) =>
            this.normalizeApprovedEntityType(entity.entityType || entity.type) === 'contractor'
        ).length;
        const suppliersTotal = approvedEntities.filter((entity) =>
            this.normalizeApprovedEntityType(entity.entityType || entity.type) === 'supplier'
        ).length;

        // توزيع حسب نوع الجهة
        const entityTypeDistribution = {
            'مقاول': contractorsTotal,
            'مورد': suppliersTotal
        };

        // حساب الفترة المستغرقة للاعتماد (متوسط)
        let totalApprovalTime = 0;
        let validApprovals = 0;

        approvedEntities.forEach(entity => {
            if (entity.approvalDate && entity.createdAt) {
                const approvalDate = new Date(entity.approvalDate);
                const requestDate = new Date(entity.createdAt);

                if (!isNaN(approvalDate.getTime()) && !isNaN(requestDate.getTime()) && approvalDate >= requestDate) {
                    const diffTime = approvalDate - requestDate;
                    const diffDays = diffTime / (1000 * 60 * 60 * 24);
                    totalApprovalTime += diffDays;
                    validApprovals++;
                }
            }
        });

        const avgApprovalTime = validApprovals > 0 ? Math.round(totalApprovalTime / validApprovals) : 0;

        return {
            contractorsCount,
            suppliersCount,
            total: approvedEntities.length,
            activeCount: activeEntities.length,
            inactiveCount: inactiveEntities.length,
            entityTypeDistribution,
            avgApprovalTime
        };
    },

    /**
     * رسم كارت إحصائيات قائمة المعتمدين
     */
    renderApprovedEntitiesStats() {
        const stats = this.getApprovedEntitiesStats();

        return `
            <div style="overflow-x:auto;margin-bottom:1.5rem;">
                <div class="contractors-kpi-grid" style="display:grid;grid-template-columns:repeat(5,minmax(170px,1fr));gap:1rem;align-items:stretch;">
                    <div class="content-card" style="height:100%;min-height:132px;border:2px solid #bfdbfe;border-radius:14px;background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 55%,#ffffff 100%);box-shadow:0 2px 8px rgba(30,64,175,.08);padding:1rem;">
                        <div style="display:flex;align-items:center;justify-content:space-between;height:100%;">
                            <div>
                                <p style="font-size:.78rem;font-weight:700;color:#1e3a8a;margin:0 0 .5rem;">عدد المقاولين</p>
                                <p style="font-size:2rem;font-weight:900;line-height:1;color:#1d4ed8;margin:0;">${stats.contractorsCount}</p>
                                <p style="font-size:.74rem;color:#1e40af;margin:.5rem 0 0;">نشط</p>
                            </div>
                            <div style="width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#dbeafe,#bfdbfe);display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-users-cog" style="color:#1d4ed8;font-size:1.1rem;"></i>
                            </div>
                        </div>
                    </div>

                    <div class="content-card" style="height:100%;min-height:132px;border:2px solid #bbf7d0;border-radius:14px;background:linear-gradient(135deg,#f0fdf4 0%,#dcfce7 55%,#ffffff 100%);box-shadow:0 2px 8px rgba(22,101,52,.08);padding:1rem;">
                        <div style="display:flex;align-items:center;justify-content:space-between;height:100%;">
                            <div>
                                <p style="font-size:.78rem;font-weight:700;color:#14532d;margin:0 0 .5rem;">عدد الموردين</p>
                                <p style="font-size:2rem;font-weight:900;line-height:1;color:#15803d;margin:0;">${stats.suppliersCount}</p>
                                <p style="font-size:.74rem;color:#166534;margin:.5rem 0 0;">نشط</p>
                            </div>
                            <div style="width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#dcfce7,#bbf7d0);display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-truck" style="color:#15803d;font-size:1.1rem;"></i>
                            </div>
                        </div>
                    </div>

                    <div class="content-card" style="height:100%;min-height:132px;border:2px solid #a7f3d0;border-radius:14px;background:linear-gradient(135deg,#ecfdf5 0%,#ffffff 50%,#fff1f2 100%);box-shadow:0 2px 8px rgba(13,148,136,.1);padding:1rem;">
                        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;height:100%;">
                            <p style="font-size:.9rem;font-weight:800;color:#374151;margin:0 0 .5rem;">المقاولين - الموردين</p>
                            <div style="font-size:1rem;font-weight:700;color:#374151;line-height:1.8;">
                                نشط <span style="font-size:2rem;font-weight:900;color:#059669;vertical-align:middle;">${stats.activeCount}</span>
                                <span style="margin:0 .4rem;font-size:1.2rem;font-weight:900;color:#6b7280;vertical-align:middle;">*</span>
                                غير نشط <span style="font-size:2rem;font-weight:900;color:#dc2626;vertical-align:middle;">${stats.inactiveCount}</span>
                            </div>
                            <div style="width:40px;height:40px;margin-top:.35rem;border-radius:999px;background:linear-gradient(135deg,#d1fae5,#a7f3d0);display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-chart-pie" style="color:#047857;font-size:1rem;"></i>
                            </div>
                        </div>
                    </div>

                    <div class="content-card" style="height:100%;min-height:132px;border:2px solid #ddd6fe;border-radius:14px;background:linear-gradient(135deg,#f5f3ff 0%,#ede9fe 55%,#ffffff 100%);box-shadow:0 2px 8px rgba(109,40,217,.08);padding:1rem;">
                        <div style="display:flex;align-items:center;justify-content:space-between;height:100%;">
                            <div>
                                <p style="font-size:.78rem;font-weight:700;color:#5b21b6;margin:0 0 .5rem;">نوع الجهة</p>
                                <p style="font-size:1.35rem;font-weight:900;line-height:1;color:#6d28d9;margin:0;">
                                    ${stats.entityTypeDistribution['مقاول'] > stats.entityTypeDistribution['مورد'] ? 'مقاول' : 'مورد'}
                                </p>
                                <p style="font-size:.74rem;color:#6d28d9;margin:.5rem 0 0;">
                                    ${stats.entityTypeDistribution['مقاول']} مقاول / ${stats.entityTypeDistribution['مورد']} مورد
                                </p>
                            </div>
                            <div style="width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-building" style="color:#6d28d9;font-size:1.1rem;"></i>
                            </div>
                        </div>
                    </div>

                    <div class="content-card" style="height:100%;min-height:132px;border:2px solid #fed7aa;border-radius:14px;background:linear-gradient(135deg,#fff7ed 0%,#ffedd5 55%,#ffffff 100%);box-shadow:0 2px 8px rgba(194,65,12,.08);padding:1rem;">
                        <div style="display:flex;align-items:center;justify-content:space-between;height:100%;">
                            <div>
                                <p style="font-size:.78rem;font-weight:700;color:#9a3412;margin:0 0 .5rem;">الفترة المستغرقة للاعتماد</p>
                                <p style="font-size:2rem;font-weight:900;line-height:1;color:#c2410c;margin:0;">${stats.avgApprovalTime}</p>
                                <p style="font-size:.74rem;color:#c2410c;margin:.5rem 0 0;">يوم (متوسط)</p>
                            </div>
                            <div style="width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#ffedd5,#fdba74);display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-clock" style="color:#c2410c;font-size:1.1rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    countActiveApprovedFilters() {
        const f = this.approvedFilters || {};
        let count = 0;
        if (String(f.search || '').trim()) count++;
        if (f.status) count++;
        if (f.type) count++;
        if (f.validity) count++;
        return count;
    },

    updateApprovedFiltersMeta() {
        const counts = this._approvedFilterCounts || { total: 0, filtered: 0 };
        const meta = document.getElementById('approved-contractors-filter-meta');
        const badge = document.getElementById('approved-contractors-filter-badge');
        const resetBtn = document.getElementById('approved-contractors-reset');
        const clearBtn = document.getElementById('approved-contractors-search-clear');
        const active = this.countActiveApprovedFilters();
        const total = counts.total || 0;
        const filtered = counts.filtered ?? total;

        if (meta) {
            meta.textContent = active
                ? `عرض ${filtered} من ${total} جهة`
                : `إجمالي ${total} جهة`;
        }
        if (badge) {
            badge.textContent = String(active);
            badge.style.display = active > 0 ? 'inline-flex' : 'none';
        }
        if (resetBtn) {
            resetBtn.disabled = active === 0;
            resetBtn.setAttribute('aria-disabled', active === 0 ? 'true' : 'false');
        }
        if (clearBtn) {
            clearBtn.style.display = String(this.approvedFilters.search || '').trim() ? 'inline-flex' : 'none';
        }
    },

    renderApprovedFiltersBar() {
        const f = this.approvedFilters || {};
        const active = this.countActiveApprovedFilters();
        const counts = this._approvedFilterCounts || { total: 0, filtered: 0 };
        const total = counts.total || 0;
        const filtered = counts.filtered ?? total;
        const metaText = active ? `عرض ${filtered} من ${total} جهة` : `إجمالي ${total} جهة`;
        const hasSearch = String(f.search || '').trim().length > 0;

        const statusOptions = Object.entries(APPROVED_ENTITY_STATUS_OPTIONS).map(([value, label]) => `
            <option value="${value}" ${f.status === value ? 'selected' : ''}>${label}</option>
        `).join('');
        const typeOptions = Object.entries(APPROVED_ENTITY_TYPE_OPTIONS).map(([value, label]) => `
            <option value="${value}" ${f.type === value ? 'selected' : ''}>${label}</option>
        `).join('');

        return `
            <div class="approved-filters-bar" role="search" aria-label="تصفية قائمة المعتمدين">
                <div class="approved-filters-bar__header">
                    <div class="approved-filters-bar__title">
                        <i class="fas fa-sliders-h" aria-hidden="true"></i>
                        <span>تصفية القائمة</span>
                        <span id="approved-contractors-filter-badge" class="approved-filters-bar__badge" style="display:${active ? 'inline-flex' : 'none'}">${active}</span>
                    </div>
                    <span id="approved-contractors-filter-meta" class="approved-filters-bar__meta">${metaText}</span>
                </div>
                <div class="approved-filters-bar__row">
                    <div class="approved-filters-bar__search-wrap">
                        <i class="fas fa-search approved-filters-bar__search-icon" aria-hidden="true"></i>
                        <input
                            type="search"
                            id="approved-contractors-search"
                            class="approved-filters-bar__search-input"
                            placeholder="ابحث بالاسم، الكود، الرقم، الترخيص، الخدمة..."
                            value="${Utils.escapeHTML(f.search || '')}"
                            autocomplete="off"
                            enterkeyhint="search"
                        >
                        <button
                            type="button"
                            id="approved-contractors-search-clear"
                            class="approved-filters-bar__search-clear"
                            title="مسح البحث"
                            aria-label="مسح البحث"
                            style="display:${hasSearch ? 'inline-flex' : 'none'}"
                        >
                            <i class="fas fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <select id="approved-contractors-status" class="approved-filters-bar__select" aria-label="فلتر الحالة">
                        <option value="">جميع الحالات</option>
                        ${statusOptions}
                    </select>
                    <select id="approved-contractors-type" class="approved-filters-bar__select" aria-label="فلتر نوع الجهة">
                        <option value="">جميع الأنواع</option>
                        ${typeOptions}
                    </select>
                    <select id="approved-contractors-validity" class="approved-filters-bar__select" aria-label="فلتر صلاحية الاعتماد">
                        <option value="" ${!f.validity ? 'selected' : ''}>صلاحية الاعتماد</option>
                        <option value="valid" ${f.validity === 'valid' ? 'selected' : ''}>ساري</option>
                        <option value="expired" ${f.validity === 'expired' ? 'selected' : ''}>منتهي</option>
                    </select>
                    <button
                        type="button"
                        id="approved-contractors-reset"
                        class="approved-filters-bar__reset btn-secondary btn-sm"
                        ${active === 0 ? 'disabled aria-disabled="true"' : ''}
                    >
                        <i class="fas fa-undo-alt ml-1" aria-hidden="true"></i>
                        مسح الفلاتر
                    </button>
                </div>
            </div>
        `;
    },

    renderApprovedEntitiesSection() {
        const isAdmin = this.isContractorApprovalAdminUser();
        const filteredRecords = this.getFilteredApprovedEntities();
        const tableHtml = this.renderApprovedEntitiesTable(filteredRecords, isAdmin);

        return `
            <div class="content-card contractors-approved-card" id="approved-contractors-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div><h2 class="card-title flex items-center gap-2"><i class="fas fa-check-circle ml-2"></i>قائمة المقاولين والموردين المعتمدين</h2><p style="margin:4px 0 0;color:#d9ebf3;font-size:.68rem;">السجل المرجعي للجهات المؤهلة وحالة الاعتماد وصلاحية المستندات</p></div>
                        <div class="flex items-center gap-2 flex-wrap">
                            ${isAdmin ? `
                            <input type="file" id="import-approved-contractors-input" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" tabindex="-1" aria-hidden="true" style="position:absolute;width:1px;height:1px;opacity:0;left:-9999px;">
                            <button type="button" id="import-approved-contractors-excel-btn" class="btn-secondary" title="استيراد من ملف Excel (نفس أعمدة التصدير)">
                                <i class="fas fa-file-import ml-2"></i>
                                استيراد Excel
                            </button>
                            ` : ''}
                            <button type="button" id="export-approved-contractors-pdf-btn" class="btn-secondary">
                                <i class="fas fa-file-pdf ml-2"></i>
                                تصدير PDF
                            </button>
                            <button type="button" id="export-approved-contractors-excel-btn" class="btn-success">
                                <i class="fas fa-file-excel ml-2"></i>
                                تصدير Excel
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body space-y-4">
                    <div id="approved-contractors-stats-container">
                        ${this.renderApprovedEntitiesStats()}
                    </div>
                    ${this.renderApprovedFiltersBar()}
                    <div id="approved-contractors-container">
                        ${tableHtml}
                    </div>
                </div>
            </div>
        `;
    },

    renderApprovedEntitiesTable(records, isAdmin = false) {
        if (!records || records.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-clipboard-check text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500">لا توجد جهات معتمدة أو مقاولين مسجلين حالياً.</p>
                </div>
            `;
        }

        const rowsHtml = records.map((record) => {
            const statusBadgeClass = this.getApprovedStatusBadgeClass(record.status);
            const statusLabel = this.getApprovedStatusLabel(record.status);
            const typeLabel = this.getApprovedTypeLabel(record.entityType);
            const approvalDate = record.approvalDate ? Utils.formatDate(record.approvalDate) : '—';
            const expiryDate = record.expiryDate ? Utils.formatDate(record.expiryDate) : '—';
            const isExpired = this.isApprovalExpired(record);
            const expiryBadge = isExpired ? '<span class="badge badge-danger ml-2">منتهي</span>' : '';

            // قراءة كود المقاول من قاعدة البيانات (دعم أسماء الحقول المختلفة)
            let contractorCode = record.code || record.isoCode ||
                record.contractorCode || record['كود المقاول'] ||
                record['كود'] || record.codeNumber || '';

            // إذا كان هناك contractorId، البحث عن كود المقاول في قائمة المقاولين
            if (!contractorCode && record.contractorId) {
                const contractors = AppState.appData.contractors || [];
                const contractor = contractors.find(c => c.id === record.contractorId);
                if (contractor && contractor.code) {
                    contractorCode = contractor.code;
                }
            }

            // حالة الاشتراطات للمقاولين العاديين
            let requirementsBadge = '';
            if (record.isRegularContractor && record.requirementsStatus) {
                const reqStatus = record.requirementsStatus;
                requirementsBadge = reqStatus.allMet
                    ? '<span class="badge badge-success ml-2" data-i18n-literal>مستوفي</span>'
                    : `<span class="badge badge-warning ml-2">${reqStatus.completed}/${reqStatus.total}</span>`;
            }

            // شارة حالة التفعيل التشغيلي (نشط / غير نشط)
            const isEnabled = this.isEntityEnabled(record);
            const activeBadge = isEnabled
                ? ''
                : '<span class="badge badge-danger ml-2" data-i18n-literal>غير نشط</span>';

            // تحديد الإجراءات بناءً على نوع السجل
            const isRegular = record.isRegularContractor;
            const contractorId = record.contractorId || record.id;
            // P1.2: JSON.stringify آمن داخل onclick (لا يكفي escapeAttr لوحده في سياق JS)
            const safeRecordId = JSON.stringify(String(record.id || ''));
            const safeContractorId = JSON.stringify(String(contractorId || ''));

            // زر التفعيل/التعطيل (للمسؤول فقط)
            const toggleButtonHtml = isAdmin ? (
                isEnabled
                    ? `<button class="btn-icon btn-icon-warning" title="تعطيل المقاول" data-i18n-title="module.contractors.disable" onclick="Contractors.toggleEntityActive(${safeRecordId}, 'inactive')">
                        <i class="fas fa-toggle-off"></i>
                    </button>`
                    : `<button class="btn-icon btn-icon-success" title="تفعيل المقاول" data-i18n-title="module.contractors.enable" onclick="Contractors.toggleEntityActive(${safeRecordId}, 'active')">
                        <i class="fas fa-toggle-on"></i>
                    </button>`
            ) : '';

            // أزرار الإجراءات - دعم كلا النوعين
            const actionsHtml = isRegular ? `
                <div class="flex items-center gap-2">
                    <button class="btn-icon btn-icon-primary" title="عرض المقاول" onclick="Contractors.viewContractor(${safeContractorId})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-icon-info" title="تعديل المقاول" onclick="Contractors.editContractor(${safeContractorId})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-icon-success" title="إضافة تقييم" onclick="Contractors.showEvaluationForm(${safeContractorId})">
                        <i class="fas fa-clipboard-check"></i>
                    </button>
                    <button class="btn-icon btn-icon-warning" title="سجل التقييمات" onclick="Contractors.openEvaluationHistory(${safeContractorId})">
                        <i class="fas fa-clipboard-list"></i>
                    </button>
                    ${toggleButtonHtml}
                    ${isAdmin ? `
                    <button class="btn-icon btn-icon-danger" title="حذف المقاول" onclick="Contractors.requestDeleteContractor(${safeContractorId})">
                        <i class="fas fa-trash"></i>
                    </button>
                    ` : ''}
                </div>
            ` : `
                <div class="flex items-center gap-2">
                    <button class="btn-icon btn-icon-info" title="عرض التفاصيل" onclick="Contractors.viewApprovedEntity(${safeRecordId})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-icon-primary" title="تعديل" onclick="Contractors.showApprovedEntityForm(${safeRecordId})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-icon-success" title="إضافة تقييم" onclick="Contractors.showEvaluationFormForApproved(${safeRecordId})">
                        <i class="fas fa-clipboard-check"></i>
                    </button>
                    <button class="btn-icon btn-icon-warning" title="سجل التقييمات" onclick="Contractors.openEvaluationHistoryForApproved(${safeRecordId})">
                        <i class="fas fa-clipboard-list"></i>
                    </button>
                    ${toggleButtonHtml}
                    ${isAdmin ? `
                    <button class="btn-icon btn-icon-danger" title="حذف" onclick="Contractors.requestDeleteApprovedEntity(${safeRecordId})">
                        <i class="fas fa-trash"></i>
                    </button>
                    ` : ''}
                </div>
            `;

            return `
                <tr>
                    <td>
                        ${contractorCode ? `
                            <span class="font-mono text-sm font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded inline-block">
                                ${Utils.escapeHTML(contractorCode)}
                            </span>
                        ` : '<span class="text-gray-400">—</span>'}
                    </td>
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(record.companyName || '')}</div>
                        <div class="text-xs text-gray-500 mt-1">
                            ${Utils.escapeHTML(record.serviceType || '')}
                        </div>
                    </td>
                    <td>${typeLabel}</td>
                    <td>${Utils.escapeHTML(record.licenseNumber || record.contractNumber || '') || '—'}</td>
                    <td>${approvalDate}</td>
                    <td>${expiryDate} ${expiryBadge}</td>
                    <td>${Utils.escapeHTML(record.safetyReviewer || '') || '—'}</td>
                    <td>
                        <span class="badge ${statusBadgeClass}">
                            ${statusLabel}
                        </span>
                        ${requirementsBadge}
                        ${activeBadge}
                    </td>
                    <td>${Utils.escapeHTML(record.notes || '') || '—'}</td>
                    <td>${actionsHtml}</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="table-wrapper">
                <table class="data-table table-header-orange">
                    <thead>
                        <tr>
                            <th>${this.t('module.contractors.code', 'كود المقاول')}</th>
                            <th>${this.t('module.contractors.companyName', 'اسم الشركة / المقاول')}</th>
                            <th>${this.t('module.contractors.entityType', 'نوع الجهة')}</th>
                            <th>${this.t('module.contractors.license', 'السجل التجاري / الترخيص')}</th>
                            <th>${this.t('module.contractors.approvalDate', 'تاريخ الاعتماد')}</th>
                            <th>${this.t('module.contractors.expiryDate', 'تاريخ انتهاء الاعتماد')}</th>
                            <th>${this.t('module.contractors.safetyOfficer', 'مسؤول السلامة للمراجعة')}</th>
                            <th>${this.t('module.contractors.status', 'الحالة')}</th>
                            <th>${this.t('module.contractors.notes', 'ملاحظات')}</th>
                            <th>${this.t('module.contractors.actions', 'الإجراءات')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        `;
    },

    refreshApprovedEntitiesList() {
        const container = document.getElementById('approved-contractors-container');
        const statsContainer = document.getElementById('approved-contractors-stats-container');
        if (!container) return;
        const isAdmin = this.isContractorApprovalAdminUser();
        const filteredRecords = this.getFilteredApprovedEntities();
        if (statsContainer) {
            this.safeSetInnerHTML(statsContainer, this.renderApprovedEntitiesStats());
        }
        const approvedHTML = this.renderApprovedEntitiesTable(filteredRecords, isAdmin);
        this.safeSetInnerHTML(container, approvedHTML);
        this.updateApprovedFiltersMeta();
    },

    ensureApprovedTabContentLoaded(force = false) {
        const container = document.getElementById('contractors-approved-content');
        if (!container) return;

        const isRendered = !!container.querySelector('#approved-contractors-card');
        if (!force && isRendered) return;

        this.safeSetInnerHTML(container, this.renderApprovedEntitiesSection());
        this.ensureApprovedTabEventListeners();
    },

    handleApprovedFilterChange(field, value) {
        if (!Object.prototype.hasOwnProperty.call(this.approvedFilters, field)) return;
        this.approvedFilters[field] = value;
        this.refreshApprovedEntitiesList();
    },

    resetApprovedFilters() {
        this.approvedFilters = {
            search: '',
            status: '',
            type: '',
            validity: ''
        };

        const searchInput = document.getElementById('approved-contractors-search');
        const statusSelect = document.getElementById('approved-contractors-status');
        const typeSelect = document.getElementById('approved-contractors-type');
        const validitySelect = document.getElementById('approved-contractors-validity');

        if (searchInput) searchInput.value = '';
        if (statusSelect) statusSelect.value = '';
        if (typeSelect) typeSelect.value = '';
        if (validitySelect) validitySelect.value = '';

        this.refreshApprovedEntitiesList();
    },

    getActiveApprovedEntities(options = {}) {
        this.ensureApprovedSetup();
        const includeExpired = options.includeExpired === true;
        const checkRequirements = options.checkRequirements === true; // ✅ إضافة خيار للتحقق من الاشتراطات
        
        let list = (AppState.appData.approvedContractors || []).filter((record) => this.isApprovalActive(record, includeExpired));

        // ✅ إصلاح: تصفية الاشتراطات اختيارية فقط
        // ✅ المنطق الصحيح: إذا كان المقاول في قائمة المعتمدين بحالة 'approved'، يجب أن يظهر
        // ✅ التحقق من الاشتراطات يكون فقط عند الطلب الصريح (checkRequirements = true)
        if (checkRequirements) {
            list = list.filter(record => {
                if (record.contractorId) {
                    // إذا كان هناك معرف مقاول، نتحقق من الاشتراطات
                    return this.checkAllRequirementsMet(record.contractorId);
                }
                // إذا لم يكن هناك معرف مقاول، نعتبره معتمداً (للتوافق مع البيانات القديمة)
                return true;
            });
        }

        // ✅ ترتيب حسب كود المقاول (CON-001, CON-002, ...)
        return list.sort((a, b) => Contractors.sortByContractorCode(a, b));
    },

    getApprovedOptions(includeExpired = false) {
        return this.getActiveApprovedEntities({ includeExpired }).map((record) => ({
            id: record.id,
            name: record.companyName,
            entityType: record.entityType,
            serviceType: record.serviceType,
            licenseNumber: record.licenseNumber,
            contractorId: record.contractorId || null // إضافة contractorId للربط
        }));
    },

    /**
     * الحصول على مقاول بالمعرف (من قائمة المقاولين أو المعتمدين)
     */
    getContractorById(contractorId) {
        if (!contractorId) return null;

        // البحث في قائمة المقاولين أولاً
        const contractors = AppState.appData.contractors || [];
        let contractor = contractors.find(c => c.id === contractorId);

        if (contractor) {
            return contractor;
        }

        // إذا لم يوجد، البحث في قائمة المعتمدين
        this.ensureApprovedSetup();
        const approvedContractors = AppState.appData.approvedContractors || [];
        const approved = approvedContractors.find(ac => ac.id === contractorId || ac.contractorId === contractorId);

        if (approved) {
            // محاولة العثور على المقاول المرتبط
            if (approved.contractorId) {
                contractor = contractors.find(c => c.id === approved.contractorId);
                if (contractor) {
                    return contractor;
                }
            }

            // إرجاع بيانات المعتمد كبديل
            return {
                id: approved.id,
                name: approved.companyName,
                serviceType: approved.serviceType,
                contractNumber: approved.licenseNumber,
                entityType: approved.entityType,
                approvedEntityId: approved.id
            };
        }

        return null;
    },

    /**
     * الحصول على مقاول بالاسم (من قائمة المقاولين أو المعتمدين)
     */
    getContractorByName(contractorName) {
        if (!contractorName) return null;

        const normalizedName = contractorName.trim().toLowerCase();

        // البحث في قائمة المقاولين أولاً
        const contractors = AppState.appData.contractors || [];
        let contractor = contractors.find(c =>
            (c.name || '').toLowerCase() === normalizedName ||
            (c.company || '').toLowerCase() === normalizedName ||
            (c.contractorName || '').toLowerCase() === normalizedName
        );

        if (contractor) {
            return contractor;
        }

        // إذا لم يوجد، البحث في قائمة المعتمدين
        this.ensureApprovedSetup();
        const approvedContractors = AppState.appData.approvedContractors || [];
        const approved = approvedContractors.find(ac =>
            (ac.companyName || '').toLowerCase() === normalizedName
        );

        if (approved) {
            // محاولة العثور على المقاول المرتبط
            if (approved.contractorId) {
                contractor = contractors.find(c => c.id === approved.contractorId);
                if (contractor) {
                    return contractor;
                }
            }

            // إرجاع بيانات المعتمد كبديل
            return {
                id: approved.id,
                name: approved.companyName,
                serviceType: approved.serviceType,
                contractNumber: approved.licenseNumber,
                entityType: approved.entityType,
                approvedEntityId: approved.id
            };
        }

        return null;
    },

    /**
     * الحصول على جميع المقاولين (من قائمة المقاولين والمعتمدين معاً)
     * هذه الدالة تضمن أن جميع الوحدات الأخرى يمكنها الوصول للمقاولين
     * ✅ تم التعديل: استخدام getActiveApprovedEntities() لضمان عرض المقاولين المعتمدين فقط
     */
    getAllContractorsForModules() {
        // ✅ حماية: التأكد من وجود AppState و appData قبل الوصول
        if (!AppState || !AppState.appData) {
            if (typeof window !== 'undefined') {
                window.AppState = window.AppState || {};
                window.AppState.appData = window.AppState.appData || {};
            } else {
                return []; // إرجاع مصفوفة فارغة إذا لم يكن AppState متاحاً
            }
        }
        
        const contractorMap = new Map(); // ✅ إزالة التكرار (محسّن)

        const normalizeText = (value) => (value ?? '').toString().trim();
        const normalizeCode = (value) => normalizeText(value).toUpperCase();
        const normalizeLicense = (value) => normalizeText(value);
        const normalizeName = (value) => normalizeText(value).toLowerCase();
        const collectAliasIds = (record) => {
            if (!record || typeof record !== 'object') return [];
            const values = [
                record.id,
                record.contractorId,
                record.code,
                record.isoCode,
                record.contractorCode,
                record.approvedEntityId,
                record.licenseNumber,
                record.contractNumber
            ];
            ['aliasIds', 'identityIds', 'legacyIds', 'altIds'].forEach((field) => {
                if (Array.isArray(record[field])) values.push(...record[field]);
            });
            return Array.from(new Set(values.map(normalizeText).filter(Boolean)));
        };

        const computeIdentityKey = (record) => {
            // الأفضلية: code (CON-xxx) → licenseNumber → contractorId/id → name
            const code = normalizeCode(record.code || record.isoCode || record.contractorCode);
            if (/^CON-\d+$/i.test(code)) return `CODE:${code}`;

            const license = normalizeLicense(record.licenseNumber || record.contractNumber);
            if (license) return `LIC:${license}`;

            const contractorId = normalizeText(record.contractorId);
            if (contractorId) return `CID:${contractorId}`;

            const id = normalizeText(record.id);
            if (id) return `ID:${id}`;

            const name = normalizeName(record.name || record.companyName || record.company || record.contractorName);
            if (name) return `NAME:${name}`;

            return '';
        };

        const chooseBetter = (current, incoming) => {
            if (!current) return incoming;
            if (!incoming) return current;

            // ✅ إصلاح: دمج السجلات مع الحفاظ على approvedEntityId
            // الأهم: إذا أحدهما له approvedEntityId، يجب الحفاظ عليه
            const merged = { ...current, ...incoming };
            merged.aliasIds = Array.from(new Set([
                ...collectAliasIds(current),
                ...collectAliasIds(incoming)
            ]));
            
            // ✅ حفظ approvedEntityId من أي من السجلين
            if (current.approvedEntityId || incoming.approvedEntityId) {
                merged.approvedEntityId = current.approvedEntityId || incoming.approvedEntityId;
            }

            const currentName = normalizeText(current.name);
            const incomingName = normalizeText(incoming.name);

            const currentHasRealName = currentName && currentName !== 'غير معروف';
            const incomingHasRealName = incomingName && incomingName !== 'غير معروف';
            
            // تفضيل الاسم الحقيقي
            if (incomingHasRealName && !currentHasRealName) {
                merged.name = incoming.name;
            } else if (currentHasRealName) {
                merged.name = current.name;
            }

            // تفضيل وجود code / license
            if (normalizeText(incoming.code)) merged.code = incoming.code;
            else if (normalizeText(current.code)) merged.code = current.code;
            
            if (normalizeText(incoming.licenseNumber)) merged.licenseNumber = incoming.licenseNumber;
            else if (normalizeText(current.licenseNumber)) merged.licenseNumber = current.licenseNumber;

            return merged;
        };

        const upsert = (record) => {
            const key = computeIdentityKey(record);
            if (!key) return;
            if (!Array.isArray(record.aliasIds)) {
                record.aliasIds = collectAliasIds(record);
            }
            const existing = contractorMap.get(key);
            contractorMap.set(key, chooseBetter(existing, record));
        };

        // بناء مجموعة معرفات المقاولين المعطلين من قائمة approvedContractors
        const deactivatedContractorIds = new Set();
        (AppState.appData.approvedContractors || []).forEach(approved => {
            if (approved && !this.isEntityEnabled(approved)) {
                if (approved.contractorId) deactivatedContractorIds.add(String(approved.contractorId).trim());
                if (approved.id) deactivatedContractorIds.add(String(approved.id).trim());
            }
        });

        // ✅ إضافة المقاولين النشطين فقط من قائمة المقاولين
        const allContractors = AppState.appData.contractors || [];
        allContractors.forEach((contractor) => {
            if (!contractor) return;
            if (!this.isEntityEnabled(contractor)) return;
            const cId = String(contractor.id || contractor.contractorId || '').trim();
            if (cId && deactivatedContractorIds.has(cId)) return; // معطل في approvedContractors
            const id = contractor.id || contractor.contractorId || '';
            const name = contractor.name || contractor.company || contractor.contractorName || contractor.companyName || '';
            if (!id && !name) return;

            upsert({
                id: id,
                contractorId: contractor.contractorId || null,
                name: name || 'غير معروف',
                serviceType: contractor.serviceType || '',
                licenseNumber: contractor.licenseNumber || contractor.contractNumber || '',
                entityType: contractor.entityType || 'contractor',
                approvedEntityId: contractor.approvedEntityId || null,
                code: contractor.code || contractor.isoCode || ''
            });
        });

        // ✅ إضافة المقاولين من قائمة المعتمدين
        // ✅ مهم للنماذج: نُظهر جميع "approved" حتى لو منتهية الصلاحية (للتسجيل/التوثيق التاريخي)
        this.ensureApprovedSetup();
        const approvedForModules = this.getActiveApprovedEntities({ includeExpired: true });
        if (AppState?.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
            Utils.safeLog(`✅ getAllContractorsForModules: approved=${approvedForModules.length}, contractorsSheet=${(AppState.appData.contractors || []).length}`);
        }

        approvedForModules.forEach((approved) => {
            if (!approved) return;
            const name = approved.companyName || approved.name || '';
            if (!name) return;

            upsert({
                id: approved.contractorId || approved.id,
                contractorId: approved.contractorId || null,
                name: name,
                serviceType: approved.serviceType || '',
                licenseNumber: approved.licenseNumber || '',
                entityType: approved.entityType || 'contractor',
                approvedEntityId: approved.id,
                code: approved.code || approved.isoCode || ''
            });
        });

        const finalList = Array.from(contractorMap.values())
            .filter((c) => c && normalizeText(c.name))
            .sort((a, b) => Contractors.sortByContractorCode(a, b));

        if (AppState?.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
            Utils.safeLog(`✅ getAllContractorsForModules: إجمالي ${finalList.length} مقاول متاح للمديولات`);
        }

        return finalList;
    },

    /**
     * ✅ مصدر موحّد لاستخدام المقاولين في جميع النماذج
     * يعيد قائمة مرتّبة ومزالة التكرار للاستخدام في select/datalist.
     *
     * @param {object} options
     * @param {boolean} [options.includeSuppliers=false] - تضمين الموردين مع المقاولين
     * @returns {Array<{id:string,name:string,serviceType:string,licenseNumber:string,code:string,entityType:string,approvedEntityId:string|null}>}
     */
    getContractorOptionsForModules(options = {}) {
        const includeSuppliers = options.includeSuppliers !== false; // ✅ افتراضي: true لتضمين الموردين
        const approvedOnly = options.approvedOnly !== false; // ✅ افتراضي: المقاولين/الموردين المعتمدين فقط
        const list = this.getAllContractorsForModules() || [];

        return list
            .filter((c) => {
                if (!c) return false;
                if (approvedOnly && !c.approvedEntityId) return false;
                if (includeSuppliers) return true;
                return (c.entityType || 'contractor') === 'contractor';
            })
            .map((c) => ({
                id: (c.id || '').toString(),
                name: (c.name || c.companyName || '').toString().trim(),
                serviceType: (c.serviceType || '').toString().trim(),
                licenseNumber: (c.licenseNumber || c.contractNumber || '').toString().trim(),
                code: (c.code || c.isoCode || '').toString().trim(),
                entityType: (c.entityType || 'contractor').toString(),
                approvedEntityId: c.approvedEntityId || null
            }))
            .filter((c) => c.name);
    },

    /**
     * ✅ توحيد تعبئة select الخاص بالمقاولين في كل الموديولات
     *
     * @param {HTMLSelectElement} selectElement
     * @param {object} options
     * @param {string} [options.placeholder='-- اختر المقاول --']
     * @param {string} [options.selectedValue=''] - الاسم/القيمة المختارة مسبقاً
     * @param {string} [options.selectedContractorId=''] - المعرف المختار مسبقاً
     * @param {'name'|'id'} [options.valueMode='name'] - قيمة option: الاسم أو المعرف
     * @param {boolean} [options.showServiceType=true]
     * @param {boolean} [options.includeSuppliers=false]
     */
    populateContractorSelect(selectElement, options = {}) {
        if (!selectElement || selectElement.tagName !== 'SELECT') return;

        const placeholder = options.placeholder || '-- اختر المقاول --';
        const selectedValue = (options.selectedValue || '').toString();
        const selectedContractorId = (options.selectedContractorId || '').toString();
        const valueMode = options.valueMode === 'id' ? 'id' : 'name';
        const showServiceType = options.showServiceType !== false;
        const includeSuppliers = options.includeSuppliers !== false; // ✅ افتراضي: true لتضمين الموردين
        const approvedOnly = options.approvedOnly !== false; // ✅ افتراضي: true للحفاظ على التوافق

        const contractors = this.getContractorOptionsForModules({ includeSuppliers, approvedOnly });

        // مسح الخيارات الحالية
        selectElement.innerHTML = `<option value="">${Utils.escapeHTML(placeholder)}</option>`;

        const fragment = document.createDocumentFragment();
        contractors.forEach((contractor) => {
            const option = document.createElement('option');
            option.value = valueMode === 'id' ? (contractor.id || '') : (contractor.name || '');
            option.textContent = contractor.name;
            if (showServiceType && contractor.serviceType) {
                option.textContent += ` - ${contractor.serviceType}`;
            }
            option.dataset.contractorId = contractor.id || '';
            if (contractor.code) option.dataset.contractorCode = contractor.code;

            if (selectedContractorId && contractor.id === selectedContractorId) {
                option.selected = true;
            } else if (selectedValue) {
                // دعم الحفظ القديم بالاسم
                if (valueMode === 'name' && contractor.name === selectedValue) option.selected = true;
                if (valueMode === 'id' && contractor.id === selectedValue) option.selected = true;
            }

            fragment.appendChild(option);
        });
        selectElement.appendChild(fragment);
    },

    getApprovedEntityMap(includeExpired = false) {
        return new Map(this.getApprovedOptions(includeExpired).map((item) => [item.id, item]));
    },

    showApprovedEntityForm(id = null) {
        this.ensureApprovedSetup();
        const existing = id ? (AppState.appData.approvedContractors || []).find((item) => item.id === id) : null;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-check-circle ml-2"></i>
                        ${existing ? 'تعديل جهة معتمدة' : 'إضافة جهة معتمدة'}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="approved-contractor-form" class="space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">اسم الشركة / المقاول *</label>
                            <input type="text" id="approved-company-name" class="form-input" required value="${Utils.escapeHTML(existing?.companyName || '')}" placeholder="مثال: شركة السلامة المتقدمة">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">نوع الجهة *</label>
                            <select id="approved-entity-type" class="form-input" required>
                                <option value="contractor" ${existing?.entityType === 'supplier' ? '' : 'selected'}>مقاول</option>
                                <option value="supplier" ${existing?.entityType === 'supplier' ? 'selected' : ''}>مورد</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">النشاط / نوع الخدمة *</label>
                            <input type="text" id="approved-service-type" class="form-input" required value="${Utils.escapeHTML(existing?.serviceType || '')}" placeholder="مثال: أعمال الصيانة الكهربائية">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">رقم السجل التجاري / الترخيص</label>
                            <input type="text" id="approved-license-number" class="form-input" value="${Utils.escapeHTML(existing?.licenseNumber || '')}" placeholder="رقم السجل التجاري أو بيانات الترخيص">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ الاعتماد *</label>
                            <input type="date" id="approved-approval-date" class="form-input" required value="${existing?.approvalDate ? new Date(existing.approvalDate).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ انتهاء الاعتماد *</label>
                            <input type="date" id="approved-expiry-date" class="form-input" required value="${existing?.expiryDate ? new Date(existing.expiryDate).toISOString().slice(0, 10) : ''}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">مسؤول السلامة للمراجعة</label>
                            <input type="text" id="approved-safety-reviewer" class="form-input" value="${Utils.escapeHTML(existing?.safetyReviewer || '')}" placeholder="اسم المسؤول عن مراجعة الاعتماد">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">حالة الاعتماد *</label>
                            <select id="approved-status" class="form-input" required>
                                <option value="approved" ${existing?.status === 'approved' ? 'selected' : ''}>معتمد</option>
                                <option value="under_review" ${existing?.status === 'under_review' || !existing ? 'selected' : ''}>تحت المراجعة</option>
                                <option value="rejected" ${existing?.status === 'rejected' ? 'selected' : ''}>مرفوض</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">ملاحظات</label>
                        <textarea id="approved-notes" class="form-input" rows="3" placeholder="ملاحظات إضافية">${Utils.escapeHTML(existing?.notes || '')}</textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            ${existing ? 'تحديث' : 'حفظ'}
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);
        this.applyModuleI18n(modal);

        const form = modal.querySelector('#approved-contractor-form');
        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // ✅ التحقق من أن modal لا يزال موجوداً في DOM
            if (!modal || !document.contains(modal)) {
                Utils.safeWarn('⚠️ submit approved-contractor-form: modal غير موجود أو تم حذفه');
                return;
            }
            
            // ✅ التحقق من أن form لا يزال موجوداً في DOM
            if (!form || !document.contains(form)) {
                Utils.safeWarn('⚠️ submit approved-contractor-form: form غير موجود أو تم حذفه');
                return;
            }
            
            try {
                // ✅ حفظ مراجع العناصر قبل أي عمليات async
                const companyInput = form.querySelector('#approved-company-name');
                const entityTypeSelect = form.querySelector('#approved-entity-type');
                const serviceInput = form.querySelector('#approved-service-type');
                const licenseInput = form.querySelector('#approved-license-number');
                const approvalDateInput = form.querySelector('#approved-approval-date');
                const expiryDateInput = form.querySelector('#approved-expiry-date');
                const safetyReviewerInput = form.querySelector('#approved-safety-reviewer');
                const statusSelect = form.querySelector('#approved-status');
                const notesTextarea = form.querySelector('#approved-notes');
                
                const companyName = companyInput?.value.trim() || '';
                const entityType = entityTypeSelect?.value || '';
                const serviceType = serviceInput?.value.trim() || '';
                const licenseNumber = licenseInput?.value.trim() || '';
                const approvalDate = approvalDateInput?.value || '';
                const expiryDate = expiryDateInput?.value || '';
                const safetyReviewer = safetyReviewerInput?.value.trim() || '';
                const status = statusSelect?.value || '';
                const notes = notesTextarea?.value.trim() || '';

                if (!companyName || !serviceType || !approvalDate || !expiryDate) {
                    Notification.warning('يرجى تعبئة الحقول الأساسية (الاسم، نوع الخدمة، تاريخ الاعتماد، تاريخ الانتهاء)');
                    return;
                }

                const approvalISO = new Date(approvalDate).toISOString();
                const expiryISO = new Date(expiryDate).toISOString();
                if (new Date(expiryISO) < new Date(approvalISO)) {
                    Notification.warning('تاريخ انتهاء الاعتماد يجب أن يكون بعد تاريخ الاعتماد');
                    return;
                }

                // التحقق من عدم وجود تكرار قبل الحفظ (للحالات الجديدة فقط)
                if (!existing) {
                    const approvedEntities = AppState.appData.approvedContractors || [];
                    const normalizedCompanyName = companyName.trim().toLowerCase();
                    const normalizedEntityType = this.normalizeApprovedEntityType(entityType);
                    const normalizedLicenseNumber = licenseNumber.trim();

                    // فحص التكرار بناءً على اسم الشركة + نوع الجهة
                    const duplicateByName = approvedEntities.find(item =>
                        item.companyName &&
                        item.companyName.trim().toLowerCase() === normalizedCompanyName &&
                        this.normalizeApprovedEntityType(item.entityType) === normalizedEntityType &&
                        (!existing || item.id !== existing.id)
                    );

                    if (duplicateByName) {
                        Notification.error(`يوجد بالفعل مقاول/مورد معتمد بنفس الاسم (${companyName}) ونوع الجهة. يرجى التحقق من القائمة.`);
                        return;
                    }

                    // فحص التكرار بناءً على السجل التجاري (إذا كان موجوداً)
                    if (normalizedLicenseNumber) {
                        const duplicateByLicense = approvedEntities.find(item =>
                            item.licenseNumber &&
                            item.licenseNumber.trim() === normalizedLicenseNumber &&
                            (!existing || item.id !== existing.id)
                        );

                        if (duplicateByLicense) {
                            Notification.error(`يوجد بالفعل مقاول/مورد معتمد بنفس السجل التجاري (${licenseNumber}). يرجى التحقق من القائمة.`);
                            return;
                        }
                    }
                }

                // توليد كود تلقائي للكيانات الجديدة - استخدام CON-xxx فقط
                let entityCode = existing?.isoCode || existing?.code || '';
                if (!entityCode) {
                    // البحث عن مقاول موجود أولاً لاستخدام كوده
                    const contractors = AppState.appData.contractors || [];
                    const existingContractor = contractors.find(c =>
                        c.name === companyName ||
                        (licenseNumber && c.contractNumber === licenseNumber)
                    );

                    if (existingContractor && existingContractor.code) {
                        // استخدام كود المقاول الموجود
                        entityCode = existingContractor.code;
                    } else {
                        // توليد كود جديد CON-xxx
                        const approvedEntities = AppState.appData.approvedContractors || [];
                        let maxNumber = 0;

                        // البحث في قائمة المقاولين
                        contractors.forEach(contractor => {
                            if (contractor.code) {
                                const match = contractor.code.match(/CON-(\d+)/);
                                if (match) {
                                    const num = parseInt(match[1], 10);
                                    if (num > maxNumber) {
                                        maxNumber = num;
                                    }
                                }
                            }
                        });

                        // البحث في قائمة المعتمدين
                        approvedEntities.forEach(entity => {
                            const code = entity.isoCode || entity.code;
                            if (code) {
                                let match = code.match(/CON-(\d+)/);
                                if (match) {
                                    const num = parseInt(match[1], 10);
                                    if (num > maxNumber) {
                                        maxNumber = num;
                                    }
                                }
                                // البحث عن كود APP-xxx القديم (للتحويل)
                                match = code.match(/APP-(\d+)/);
                                if (match) {
                                    const num = parseInt(match[1], 10);
                                    if (num > maxNumber) {
                                        maxNumber = num;
                                    }
                                }
                            }
                        });

                        const newNumber = maxNumber + 1;
                        entityCode = `CON-${String(newNumber).padStart(3, '0')}`;
                    }
                } else {
                    // التحقق من عدم تكرار الكود (للحالات الجديدة فقط)
                    if (!existing) {
                        const approvedEntities = AppState.appData.approvedContractors || [];
                        const duplicateByCode = approvedEntities.find(item => {
                            const itemCode = item.isoCode || item.code;
                            return itemCode && itemCode === entityCode && (!existing || item.id !== existing.id);
                        });

                        if (duplicateByCode) {
                            Notification.error(`يوجد بالفعل مقاول/مورد معتمد بنفس الكود (${entityCode}). سيتم توليد كود جديد تلقائياً.`);
                            // توليد كود جديد CON-xxx
                            const contractors = AppState.appData.contractors || [];
                            let maxNumber = 0;

                            // البحث في قائمة المقاولين
                            contractors.forEach(contractor => {
                                if (contractor.code) {
                                    const match = contractor.code.match(/CON-(\d+)/);
                                    if (match) {
                                        const num = parseInt(match[1], 10);
                                        if (num > maxNumber) {
                                            maxNumber = num;
                                        }
                                    }
                                }
                            });

                            // البحث في قائمة المعتمدين
                            approvedEntities.forEach(entity => {
                                const code = entity.isoCode || entity.code;
                                if (code) {
                                    let match = code.match(/CON-(\d+)/);
                                    if (match) {
                                        const num = parseInt(match[1], 10);
                                        if (num > maxNumber) {
                                            maxNumber = num;
                                        }
                                    }
                                    // البحث عن كود APP-xxx القديم (للتحويل)
                                    match = code.match(/APP-(\d+)/);
                                    if (match) {
                                        const num = parseInt(match[1], 10);
                                        if (num > maxNumber) {
                                            maxNumber = num;
                                        }
                                    }
                                }
                            });

                            const newNumber = maxNumber + 1;
                            entityCode = `CON-${String(newNumber).padStart(3, '0')}`;
                        }
                    }
                }

                const record = {
                    id: existing?.id || Utils.generateId('APPCON'),
                    companyName,
                    entityType: this.normalizeApprovedEntityType(entityType),
                    serviceType,
                    licenseNumber,
                    approvalDate: approvalISO,
                    expiryDate: expiryISO,
                    safetyReviewer,
                    status: this.normalizeApprovedStatus(status),
                    notes,
                    isoCode: entityCode,
                    code: entityCode,
                    createdAt: existing?.createdAt || new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                this.persistApprovedEntity(record, existing);
                Notification.success(existing ? 'تم تحديث بيانات الجهة المعتمدة' : 'تم حفظ الجهة المعتمدة بنجاح');

                // تحديث قائمة المعتمدين
                if (this.currentTab === 'approved') {
                    this.refreshApprovedEntitiesList();
                }

                // ✅ التحقق من أن modal لا يزال موجوداً في DOM قبل الإزالة
                if (modal && document.contains(modal)) {
                    try {
                modal.remove();
                    } catch (removeError) {
                        Utils.safeWarn('⚠️ خطأ في إزالة modal:', removeError);
                        // محاولة بديلة
                        const modalParent = modal.parentNode;
                        if (modalParent) {
                            try {
                                modalParent.removeChild(modal);
                            } catch (e) {
                                Utils.safeWarn('⚠️ فشلت المحاولة البديلة لإزالة modal:', e);
                            }
                        }
                    }
                }
            } catch (error) {
                Utils.safeError('خطأ في حفظ بيانات الجهات المعتمدة:', error);
                Notification.error('تعذر حفظ بيانات الجهة: ' + error.message);
            }
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) modal.remove();
        });
    },

    viewApprovedEntity(id) {
        this.injectAntiShakeStyles();
        this.ensureApprovedSetup();
        const record = (AppState.appData.approvedContractors || []).find((item) => item.id === id);
        if (!record) {
            Notification.error('السجل المطلوب غير موجود');
            return;
        }

        const statusLabel = this.getApprovedStatusLabel(record.status);
        const typeLabel = this.getApprovedTypeLabel(record.entityType);
        const approvalDate = record.approvalDate ? Utils.formatDate(record.approvalDate) : '—';
        const expiryDate = record.expiryDate ? Utils.formatDate(record.expiryDate) : '—';
        const expiredBadge = this.isApprovalExpired(record) ? '<span class="badge badge-danger ml-2">منتهي</span>' : '';
        const contractorCode = record.code || record.isoCode || record.contractorCode ||
            record['كود المقاول'] || record['كود'] || record.codeNumber || '';

        const modal = document.createElement('div');
        modal.id = 'contractor-approved-entity-details-modal';
        modal.className = 'modal-overlay ctr-detail-modal';
        modal.innerHTML = `
            <div class="modal-content ctr-detail-dialog">
                <div class="modal-header ctr-detail-head">
                    <div class="ctr-detail-head__copy">
                        <span class="ctr-detail-head__icon"><i class="fas fa-building-shield"></i></span>
                        <div>
                            <span class="ctr-detail-head__eyebrow">سجل الاعتماد والتأهيل</span>
                            <h2 class="modal-title">تفاصيل الجهة المعتمدة</h2>
                            <p>${Utils.escapeHTML(record.companyName || 'جهة غير مسماة')}</p>
                        </div>
                    </div>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body ctr-detail-body">
                    <div class="ctr-detail-summary">
                        <div><span>كود الجهة</span><strong class="ctr-detail-code">${contractorCode ? Utils.escapeHTML(contractorCode) : '—'}</strong></div>
                        <div><span>نوع الجهة</span><strong>${typeLabel}</strong></div>
                        <div><span>حالة الاعتماد</span><strong><span class="badge ${this.getApprovedStatusBadgeClass(record.status)}">${statusLabel}</span></strong></div>
                    </div>
                    <section class="ctr-detail-section">
                        <h3><i class="fas fa-address-card"></i>بيانات الجهة</h3>
                        <div class="ctr-detail-grid">
                            <div class="ctr-detail-field"><label>اسم الشركة / المقاول</label><p>${Utils.escapeHTML(record.companyName || '') || '—'}</p></div>
                            <div class="ctr-detail-field"><label>النشاط / نوع الخدمة</label><p>${Utils.escapeHTML(record.serviceType || '') || '—'}</p></div>
                            <div class="ctr-detail-field"><label>السجل التجاري / الترخيص</label><p>${Utils.escapeHTML(record.licenseNumber || '') || '—'}</p></div>
                            <div class="ctr-detail-field"><label>مسؤول السلامة للمراجعة</label><p>${Utils.escapeHTML(record.safetyReviewer || '') || '—'}</p></div>
                        </div>
                    </section>
                    <section class="ctr-detail-section ctr-detail-section--dates">
                        <h3><i class="fas fa-calendar-check"></i>صلاحية الاعتماد</h3>
                        <div class="ctr-detail-grid">
                            <div class="ctr-detail-field"><label>تاريخ الاعتماد</label><p>${approvalDate}</p></div>
                            <div class="ctr-detail-field"><label>تاريخ انتهاء الاعتماد</label><p>${expiryDate} ${expiredBadge}</p></div>
                        </div>
                    </section>
                    ${record.notes ? `
                        <section class="ctr-detail-section ctr-detail-note">
                            <h3><i class="fas fa-note-sticky"></i>ملاحظات</h3>
                            <p>${Utils.escapeHTML(record.notes)}</p>
                        </section>
                    ` : ''}
                </div>
                <div class="modal-footer ctr-detail-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-xmark ml-2"></i>إغلاق</button>
                    <button class="btn-success" onclick="Contractors.exportApprovedEntitiesPDF('${record.id}')">
                        <i class="fas fa-file-pdf ml-2"></i>
                        تصدير PDF
                    </button>
                    <button class="btn-primary" onclick="Contractors.showApprovedEntityForm('${record.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>
                        تعديل
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.applyModuleI18n(modal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) modal.remove();
        });
    },

    persistApprovedEntity(record, existing = null) {
        this.ensureApprovedSetup();

        // التأكد من قراءة البيانات الكاملة من AppState قبل التعديل
        let collection = AppState.appData.approvedContractors || [];

        // إذا كانت البيانات غير موجودة أو غير صحيحة، نحاول قراءتها من Google Sheets
        if (!Array.isArray(collection) || collection.length === 0) {
            // محاولة قراءة البيانات من Google Sheets إذا كانت متاحة
            try {
                if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.syncData) {
                    // سنقوم بمزامنة البيانات في الخلفية ولكن لا ننتظرها
                    GoogleIntegration.syncData({
                        silent: true,
                        showLoader: false,
                        notifyOnSuccess: false,
                        notifyOnError: false,
                        sheets: ['ApprovedContractors']
                    }).then(() => {
                        // بعد المزامنة، نتحقق من البيانات مرة أخرى
                        collection = AppState.appData.approvedContractors || [];
                        if (Array.isArray(collection) && collection.length > 0) {
                            // إعادة محاولة الحفظ بعد المزامنة
                            this.persistApprovedEntity(record, existing);
                        }
                    }).catch(() => {
                        // في حالة فشل المزامنة، نتابع بالبيانات الحالية
                    });
                }
            } catch (error) {
                Utils.safeWarn('فشل محاولة مزامنة البيانات:', error);
            }
        }

        // إنشاء نسخة من المصفوفة لتجنب التعديل المباشر
        collection = [...collection];

        if (existing) {
            const index = collection.findIndex((item) => item.id === existing.id);
            if (index !== -1) {
                collection[index] = { ...record };
            } else {
                collection.push({ ...record });
            }
        } else {
            // توليد كود تلقائي للكيانات الجديدة إذا لم يكن موجوداً
            if (!record.isoCode && !record.code) {
                let maxNumber = 0;
                collection.forEach(entity => {
                    const code = entity.isoCode || entity.code;
                    if (code) {
                        const match = code.match(/APP-(\d+)/);
                        if (match) {
                            const num = parseInt(match[1], 10);
                            if (num > maxNumber) {
                                maxNumber = num;
                            }
                        }
                    }
                });

                const newNumber = maxNumber + 1;
                record.isoCode = `APP-${String(newNumber).padStart(3, '0')}`;
                record.code = record.isoCode;
            }

            // التحقق من عدم وجود سجل مكرر قبل الإضافة
            // فحص التكرار بناءً على: المعرف، الكود، اسم الشركة + نوع الجهة، السجل التجاري
            const duplicateIndex = collection.findIndex((item) => {
                // فحص التكرار بناءً على المعرف
                if (item.id === record.id) return true;

                // فحص التكرار بناءً على الكود (إذا كان موجوداً)
                if (record.isoCode || record.code) {
                    const recordCode = record.isoCode || record.code;
                    const itemCode = item.isoCode || item.code;
                    if (recordCode && itemCode && recordCode === itemCode) return true;
                }

                // فحص التكرار بناءً على اسم الشركة + نوع الجهة
                if (record.companyName && item.companyName &&
                    record.companyName.trim().toLowerCase() === item.companyName.trim().toLowerCase() &&
                    record.entityType === item.entityType) {
                    return true;
                }

                // فحص التكرار بناءً على السجل التجاري (إذا كان موجوداً)
                if (record.licenseNumber && item.licenseNumber &&
                    record.licenseNumber.trim() === item.licenseNumber.trim()) {
                    return true;
                }

                return false;
            });

            if (duplicateIndex !== -1) {
                // تحديث السجل الموجود بدلاً من إضافة جديد
                const existing = collection[duplicateIndex];
                // الحفاظ على المعرف الأصلي وتاريخ الإنشاء
                collection[duplicateIndex] = {
                    ...record,
                    id: existing.id,
                    createdAt: existing.createdAt || record.createdAt
                };
                Utils.safeWarn(`⚠️ تم اكتشاف تكرار للمقاول/المورد: ${record.companyName} - تم التحديث بدلاً من الإضافة`);
            } else {
                collection.push({ ...record });
            }
        }

        // حفظ البيانات المحدثة
        AppState.appData.approvedContractors = collection;

        // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

        try {
            // التأكد من إرسال البيانات الكاملة وليس فقط السجل الجديد
            GoogleIntegration.autoSave?.('ApprovedContractors', AppState.appData.approvedContractors).catch(error => {
                Utils.safeWarn('فشل الحفظ التلقائي لجهات الاعتماد:', error);
            });
        } catch (error) {
            Utils.safeWarn('فشل الحفظ التلقائي لجهات الاعتماد:', error);
        }

        this.refreshApprovedEntitiesList();
    },

    async requestDeleteApprovedEntity(id) {
        if (!id) return;

        // التحقق من الصلاحيات - فقط المدير يمكنه حذف مباشرة
        if (Permissions.isAdmin()) {
            if (!confirm('هل أنت متأكد من حذف هذه الجهة من قائمة الاعتماد؟')) {
                return;
            }
            // المدير يمكنه الحذف مباشرة
            return this.deleteApprovedEntity(id);
        }

        // المستخدمون العاديون يرسلون طلب حذف
        this.ensureApprovedSetup();
        const collection = AppState.appData.approvedContractors || [];
        const record = collection.find((item) => item.id === id);
        if (!record) {
            Notification.error('السجل المطلوب غير موجود');
            return;
        }

        if (!confirm('سيتم إرسال طلب حذف هذه الجهة إلى مدير النظام للموافقة. هل تريد المتابعة؟')) {
            return;
        }

        const currentUser = AppState.currentUser;
        const deletionRequest = {
            id: Utils.generateId('DELRQ'),
            requestType: 'approved_entity',
            entityId: id,
            entityName: record.companyName || record.name || '',
            entityType: record.entityType || 'contractor',
            reason: prompt('يرجى إدخال سبب طلب الحذف:') || 'طلب حذف من المستخدم',
            createdBy: currentUser?.id || '',
            createdByName: currentUser?.name || '',
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        // إرسال طلب الحذف
        await this.submitDeletionRequest(deletionRequest);
        this.refreshApprovalRequestsSection();
    },

    async deleteApprovedEntity(id) {
        if (!id) return;
        if (!Permissions.isAdmin()) {
            Notification.error('ليس لديك صلاحية للحذف المباشر');
            return;
        }

        if (!confirm('هل أنت متأكد من حذف هذه الجهة المعتمدة؟ سيتم حذفها من قائمة المعتمدين والمقاولين.')) {
            return;
        }

        // Optimistic UI update
        this.ensureApprovedSetup();
        const collection = AppState.appData.approvedContractors || [];
        const index = collection.findIndex((item) => item.id === id);

        if (index === -1) {
            Notification.error('السجل المطلوب غير موجود');
            return;
        }

        const record = collection[index];
        collection.splice(index, 1);
        AppState.appData.approvedContractors = collection;

        if (record.contractorId) {
            const contractors = AppState.appData.contractors || [];
            const cIndex = contractors.findIndex(c => c.id === record.contractorId);
            if (cIndex !== -1) {
                contractors.splice(cIndex, 1);
                AppState.appData.contractors = contractors;
            }
        }

        try {
            Loading.show();
            // Call Backend
            const result = await GoogleIntegration.sendToAppsScript('deleteApprovedContractor', {
                approvedContractorId: id,
                __timeoutMs: 45000
            });

            if (result.success) {
                Notification.success('تم حذف الجهة المعتمدة بنجاح');
                // DataManager Update
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }
                this.load(true); // ✅ Refresh full state to sync - preserve current tab
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            Loading.hide();
            // Utils.safeError('فشل حذف الجهة المعتمدة:', error); // safeError might not exist or be needed
            console.error('فشل حذف الجهة المعتمدة:', error);
            Notification.error('فشل حذف الجهة المعتمدة: ' + error.message);
            this.load(true); // ✅ Rollback - preserve current tab
        } finally {
            Loading.hide();
            this.refreshApprovedEntitiesList();
        }
    },

    /**
     * تفعيل/تعطيل المقاول أو المورد تشغيلياً (لا يحذف البيانات).
     * المقاول المعطل لا يظهر في القوائم والفلاتر في الموديولات المرتبطة
     * (العيادة/التدريب/التصاريح...) لكنه يبقى ظاهراً في شاشة إدارة المقاولين
     * ويمكن إعادة تفعيله في أي وقت.
     *
     * @param {string} id - معرّف السجل في approvedContractors
     * @param {boolean} enable - true للتفعيل، false للتعطيل
     */
    async toggleEntityActive(id, enable) {
        if (!id) return;
        if (!Permissions.isAdmin()) {
            Notification.error('ليس لديك صلاحية لتغيير حالة التفعيل');
            return;
        }

        this.ensureApprovedSetup();
        const approvedList = AppState.appData.approvedContractors || [];
        const approvedIndex = approvedList.findIndex((item) => item && item.id === id);
        if (approvedIndex === -1) {
            Notification.error('السجل المطلوب غير موجود');
            return;
        }

        // 'active' أو true أو أي قيمة غير 'inactive' تعني تفعيل
        const nextActive = (enable === 'inactive' || enable === false) ? 'inactive' : 'active';
        const isEnabling = nextActive === 'active';
        const i18nCore = (window.AppI18n && typeof window.AppI18n.t === 'function')
            ? window.AppI18n
            : ((window.I18n && typeof window.I18n.t === 'function') ? window.I18n : null);
        const tr = (key, fallback) => {
            try {
                return i18nCore ? (i18nCore.t(key) || fallback) : fallback;
            } catch (_) {
                return fallback;
            }
        };
        const confirmMessage = isEnabling
            ? tr('module.contractors.confirmEnable', 'هل تريد إعادة تفعيل هذا المقاول؟ سيعود للظهور في جميع الفلاتر والنماذج.')
            : tr('module.contractors.confirmDisable', 'هل تريد تعطيل هذا المقاول؟ لن يظهر في الفلاتر والنماذج مع الاحتفاظ بكامل بياناته.');
        if (!confirm(confirmMessage)) {
            return;
        }

        const record = approvedList[approvedIndex];
        const previousIsActive = record.isActive; // حفظ القيمة الأصلية للتراجع
        record.isActive = nextActive;
        approvedList[approvedIndex] = record;
        AppState.appData.approvedContractors = approvedList;

        let linkedContractor = null;
        let linkedContractorPreviousIsActive = null;
        if (record.contractorId) {
            const contractors = AppState.appData.contractors || [];
            const cIndex = contractors.findIndex((c) => c && c.id === record.contractorId);
            if (cIndex !== -1) {
                linkedContractor = contractors[cIndex];
                linkedContractorPreviousIsActive = linkedContractor.isActive;
                linkedContractor.isActive = nextActive;
                contractors[cIndex] = linkedContractor;
                AppState.appData.contractors = contractors;
            }
        }

        this.refreshApprovedEntitiesList();

        try {
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendToAppsScript) {
                await GoogleIntegration.sendToAppsScript('updateApprovedContractor', {
                    approvedContractorId: record.id,
                    updateData: {
                        isActive: nextActive,
                        updatedAt: new Date().toISOString()
                    }
                });
            }

            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            Notification.success(isEnabling
                ? tr('module.contractors.toggleEnableSuccess', 'تم تفعيل المقاول بنجاح')
                : tr('module.contractors.toggleDisableSuccess', 'تم تعطيل المقاول بنجاح'));
        } catch (error) {
            // rollback عند فشل المزامنة
            record.isActive = previousIsActive;
            approvedList[approvedIndex] = record;
            AppState.appData.approvedContractors = approvedList;
            if (linkedContractor) {
                linkedContractor.isActive = linkedContractorPreviousIsActive;
            }
            this.refreshApprovedEntitiesList();
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ تعذّر مزامنة حالة التفعيل مع Backend، تم التحديث محلياً فقط:', error);
            }
            Notification.warning('تم تحديث الحالة محلياً، لكن تعذّرت المزامنة مع الخادم');
        }
    },

    exportApprovedEntitiesExcel() {
        this.ensureApprovedSetup();
        const records = this.getFilteredApprovedEntities();
        if (!records.length) {
            Notification.warning('لا توجد بيانات لتصديرها');
            return;
        }

        if (typeof XLSX === 'undefined') {
            Notification.error('مكتبة SheetJS غير محمّلة. يرجى تحديث الصفحة أو تحميل المكتبة.');
            return;
        }

        const data = records.map((record) => ({
            'اسم الشركة / المقاول': record.companyName || '',
            'نوع الجهة': this.getApprovedTypeLabel(record.entityType),
            'النشاط / نوع الخدمة': record.serviceType || '',
            'السجل التجاري / الترخيص': record.licenseNumber || '',
            'تاريخ الاعتماد': record.approvalDate && typeof Utils.formatDateForInput === 'function'
                ? Utils.formatDateForInput(record.approvalDate)
                : (record.approvalDate ? Utils.formatDate(record.approvalDate) : ''),
            'تاريخ انتهاء الاعتماد': record.expiryDate && typeof Utils.formatDateForInput === 'function'
                ? Utils.formatDateForInput(record.expiryDate)
                : (record.expiryDate ? Utils.formatDate(record.expiryDate) : ''),
            'مسؤول السلامة': record.safetyReviewer || '',
            'الحالة': this.getApprovedStatusLabel(record.status),
            'ملاحظات': record.notes || ''
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        ws['!cols'] = [
            { wch: 30 },
            { wch: 16 },
            { wch: 28 },
            { wch: 24 },
            { wch: 16 },
            { wch: 18 },
            { wch: 22 },
            { wch: 16 },
            { wch: 40 }
        ];
        XLSX.utils.book_append_sheet(wb, ws, 'الجهات المعتمدة');
        const fileName = `الجهات_المعتمدة_${new Date().toISOString().slice(0, 10)}.xlsx`;
        XLSX.writeFile(wb, fileName);
        Notification.success('تم تصدير قائمة الجهات المعتمدة بنجاح');
    },

    /**
     * تحويل قيمة تاريخ من Excel (نص، رقم تسلسلي، أو Date) إلى ISO
     */
    parseApprovedImportDate(value) {
        if (value === null || value === undefined || value === '') return '';
        if (value instanceof Date) {
            return isNaN(value.getTime()) ? '' : value.toISOString();
        }
        if (typeof value === 'number' && !Number.isNaN(value)) {
            const utcMs = Math.round((value - 25569) * 86400 * 1000);
            const d = new Date(utcMs);
            return isNaN(d.getTime()) ? '' : d.toISOString();
        }
        const s = String(value).trim();
        if (!s || s === '-') return '';
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
            const d = new Date(s + 'T00:00:00');
            return isNaN(d.getTime()) ? '' : d.toISOString();
        }
        const d2 = new Date(s);
        return isNaN(d2.getTime()) ? '' : d2.toISOString();
    },

    getApprovedImportCell(row, ...aliases) {
        if (!row || typeof row !== 'object') return '';
        for (let i = 0; i < aliases.length; i++) {
            const key = aliases[i];
            if (key in row && row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '') {
                return row[key];
            }
        }
        const keys = Object.keys(row);
        for (let j = 0; j < keys.length; j++) {
            const k = keys[j];
            for (let i = 0; i < aliases.length; i++) {
                if (k && k.replace(/\s+/g, ' ').trim() === aliases[i]) {
                    return row[k];
                }
            }
        }
        return '';
    },

    async importApprovedEntitiesFromExcelFile(file) {
        this.ensureApprovedSetup();
        if (!Permissions.isAdmin()) {
            Notification.warning('يُسمح للمدير فقط باستيراد القائمة.');
            return;
        }
        if (!file) return;
        if (typeof XLSX === 'undefined') {
            Notification.error('مكتبة SheetJS غير محمّلة. يرجى تحديث الصفحة.');
            return;
        }

        const readOpts = { type: 'array' };
        let workbook;
        try {
            const buf = await file.arrayBuffer();
            workbook = XLSX.read(buf, { type: 'array', cellDates: true });
        } catch (e) {
            Notification.error('تعذر قراءة ملف Excel.');
            return;
        }

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) {
            Notification.error('الملف لا يحتوي على ورقة بيانات.');
            return;
        }

        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: true });
        if (!Array.isArray(rows) || rows.length === 0) {
            Notification.warning('لا توجد صفوف في الملف.');
            return;
        }

        let added = 0;
        let updated = 0;
        let skipped = 0;

        Loading.show();
        try {
            for (let r = 0; r < rows.length; r++) {
                const row = rows[r];
                const companyName = String(this.getApprovedImportCell(row,
                    'اسم الشركة / المقاول', 'اسم الشركة', 'companyName')).trim();
                if (!companyName) {
                    skipped++;
                    continue;
                }

                const typeLabel = String(this.getApprovedImportCell(row, 'نوع الجهة', 'entityType')).trim();
                const serviceType = String(this.getApprovedImportCell(row,
                    'النشاط / نوع الخدمة', 'النشاط', 'serviceType')).trim();
                const licenseNumber = String(this.getApprovedImportCell(row,
                    'السجل التجاري / الترخيص', 'السجل التجاري', 'licenseNumber')).trim();

                const approvalISO = this.parseApprovedImportDate(this.getApprovedImportCell(row,
                    'تاريخ الاعتماد', 'approvalDate'));
                const expiryISO = this.parseApprovedImportDate(this.getApprovedImportCell(row,
                    'تاريخ انتهاء الاعتماد', 'expiryDate'));

                if (!serviceType || !approvalISO || !expiryISO) {
                    skipped++;
                    continue;
                }

                if (new Date(expiryISO) < new Date(approvalISO)) {
                    skipped++;
                    continue;
                }

                const safetyReviewer = String(this.getApprovedImportCell(row,
                    'مسؤول السلامة', 'safetyReviewer')).trim();
                const statusLabel = String(this.getApprovedImportCell(row, 'الحالة', 'status')).trim();
                const notes = String(this.getApprovedImportCell(row, 'ملاحظات', 'notes')).trim();

                const entityType = this.normalizeApprovedEntityType(typeLabel || 'مقاول');
                const status = this.normalizeApprovedStatus(statusLabel || 'معتمد');

                const approvedEntities = AppState.appData.approvedContractors || [];
                const existing = approvedEntities.find((item) =>
                    item.companyName &&
                    item.companyName.trim().toLowerCase() === companyName.toLowerCase() &&
                    this.normalizeApprovedEntityType(item.entityType) === entityType
                );

                const record = {
                    id: existing?.id || Utils.generateId('APPCON'),
                    companyName,
                    entityType,
                    serviceType,
                    licenseNumber,
                    approvalDate: approvalISO,
                    expiryDate: expiryISO,
                    safetyReviewer,
                    status,
                    notes,
                    isoCode: existing?.isoCode || existing?.code || '',
                    code: existing?.code || existing?.isoCode || '',
                    createdAt: existing?.createdAt || new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                if (existing) {
                    updated++;
                } else {
                    added++;
                }
                this.persistApprovedEntity(record, existing || null);
            }

            Notification.success(`اكتمل الاستيراد: صفوف جديدة ${added}، تحديث ${updated}، تخطي ${skipped}.`);
            if (this.currentTab === 'approved') {
                this.refreshApprovedEntitiesList();
            }
        } catch (err) {
            Utils.safeError('فشل استيراد الجهات المعتمدة:', err);
            Notification.error('فشل الاستيراد: ' + (err.message || 'خطأ غير معروف'));
        } finally {
            Loading.hide();
        }
    },

    exportApprovedEntitiesPDF(id = null) {
        this.ensureApprovedSetup();
        const records = id
            ? (AppState.appData.approvedContractors || []).filter((item) => item.id === id)
            : this.getFilteredApprovedEntities();

        if (!records.length) {
            Notification.warning('لا توجد بيانات لتصديرها');
            return;
        }

        try {
            Loading.show();
            const rowsHtml = records.map((record, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${Utils.escapeHTML(record.companyName || '')}</td>
                    <td>${this.getApprovedTypeLabel(record.entityType)}</td>
                    <td>${Utils.escapeHTML(record.serviceType || '')}</td>
                    <td>${Utils.escapeHTML(record.licenseNumber || '')}</td>
                    <td>${record.approvalDate ? Utils.formatDate(record.approvalDate) : '-'}</td>
                    <td>${record.expiryDate ? Utils.formatDate(record.expiryDate) : '-'}</td>
                    <td>${Utils.escapeHTML(record.safetyReviewer || '')}</td>
                    <td>${this.getApprovedStatusLabel(record.status)}</td>
                    <td>${Utils.escapeHTML(record.notes || '')}</td>
                </tr>
            `).join('');

            const content = `
                <div class="section-title">بيانات الجهات المعتمدة</div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>الجهة</th>
                            <th>النوع</th>
                            <th>النشاط / الخدمة</th>
                            <th>السجل التجاري / الترخيص</th>
                            <th>تاريخ الاعتماد</th>
                            <th>تاريخ الانتهاء</th>
                            <th>مسؤول السلامة</th>
                            <th>الحالة</th>
                            <th>ملاحظات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            `;

            const formCode = id
                ? (records[0]?.isoCode || `APPCON-${records[0]?.id?.substring(0, 6) || ''}`)
                : `APPCON-LIST-${new Date().toISOString().slice(0, 10)}`;

            const htmlContent = typeof FormHeader !== 'undefined' && typeof FormHeader.generatePDFHTML === 'function'
                ? FormHeader.generatePDFHTML(
                    formCode,
                    id ? 'نموذج جهة معتمدة' : 'قائمة الجهات المعتمدة',
                    content,
                    false,
                    true,
                    { version: '1.0', qrData: id ? `approved-contractor:${id}` : 'approved-contractors:list' },
                    records.reduce((earliest, record) => {
                        const created = new Date(record.createdAt || record.approvalDate || new Date());
                        if (!earliest || created < earliest) return created;
                        return earliest;
                    }, null) || new Date(),
                    new Date()
                )
                : content;

            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const printWindow = window.open(url, '_blank');

            if (printWindow) {
                printWindow.onload = () => {
                    setTimeout(() => {
                        printWindow.print();
                        // Clean up blob URL after print
                        setTimeout(() => {
                            URL.revokeObjectURL(url);
                        }, 1000);
                        Loading.hide();
                    }, 500);
                };
            } else {
                URL.revokeObjectURL(url);
                Loading.hide();
                Notification.error('يرجى السماح بنوافذ منبثقة للطباعة');
            }
        } catch (error) {
            Loading.hide();
            // Ensure cleanup on error
            if (typeof url !== 'undefined') {
                URL.revokeObjectURL(url);
            }
            Utils.safeError('خطأ في تصدير الجهات المعتمدة:', error);
            Notification.error('فشل في تصدير قائمة الجهات المعتمدة: ' + error.message);
        }
    },

    async renderEvaluationsSection() {
        const approvedOptions = this.getApprovedOptions(true);
        const legacyContractors = AppState.appData.contractors || [];
        const filterOptions = approvedOptions.length > 0 ? approvedOptions : legacyContractors.map(contractor => ({
            id: contractor.id,
            name: contractor.name || contractor.company || contractor.contractorName || ''
        }));
        const options = filterOptions.length
            ? filterOptions.map(contractor => `<option value="${contractor.id}">${Utils.escapeHTML(contractor.name || '')}</option>`).join('')
            : '';
        const hasContractors = filterOptions.length > 0;
        const evaluationsTable = this.renderEvaluationsTable(this.currentEvaluationFilter || '');
        const isAdmin = this.isContractorApprovalAdminUser();
        this.ensureEvaluationApprovalRequestsSetup();
        const myEvaluationRequests = this.getMyEvaluationApprovalRequests();
        const pendingEvaluationRequests = isAdmin ? this.getPendingEvaluationApprovalRequests() : [];

        return `
            <div class="content-card contractors-evaluation-card" id="contractor-evaluation-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div><h2 class="card-title flex items-center gap-2"><i class="fas fa-clipboard-check ml-2"></i>تقييم وتأهيل المقاولين</h2><p style="margin:4px 0 0;color:#d9ebf3;font-size:.68rem;">قياس الأداء، مراجعة طلبات التقييم، وتوثيق نتائج التأهيل</p></div>
                        <div class="flex items-center gap-3 flex-wrap">
                            <select id="contractor-evaluation-filter" class="form-input" style="min-width: 220px;">
                                <option value="">جميع المقاولين</option>
                                ${options}
                            </select>
                            <button id="add-contractor-evaluation-btn" class="btn-primary" ${hasContractors ? '' : 'disabled'}>
                                <i class="fas fa-plus ml-2"></i>
                                إضافة تقييم
                            </button>
                            ${isAdmin ? `
                                <button id="contractor-evaluation-settings-btn" class="btn-secondary">
                                    <i class="fas fa-sliders-h ml-2"></i>
                                    تعديل بنود التقييم
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="card-body space-y-6">
                    <div class="contractors-subsection">
                        <h3 class="contractors-subsection__title"><i class="fas fa-list"></i>طلبات تقييمي</h3>
                        <div id="my-evaluation-approval-requests-container">
                            ${this.renderApprovalRequestsTable(myEvaluationRequests, false)}
                        </div>
                    </div>
                    ${isAdmin ? `
                    <div class="contractors-subsection">
                        <h3 class="contractors-subsection__title"><i class="fas fa-clipboard-check"></i>طلبات تقييم قيد المراجعة (للمدير)</h3>
                        <div id="pending-evaluation-approval-requests-container">
                            ${this.renderApprovalRequestsTable(pendingEvaluationRequests, true)}
                        </div>
                    </div>
                    ` : ''}
                    <div class="contractors-subsection">
                        <h3 class="contractors-subsection__title"><i class="fas fa-table"></i>التقييمات المعتمدة</h3>
                        <div id="contractor-evaluations-container">
                            ${evaluationsTable}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderEvaluationsTable(contractorId = '') {
        // ✅ إصلاح: تجميع البنود من صفوف منفصلة
        const allRecords = AppState.appData.contractorEvaluations || [];
        
        // تجميع البنود حسب evaluationId
        const evaluationsMap = new Map();
        
        allRecords.forEach(record => {
            const evalId = record.id || record.evaluationId;
            if (!evalId) return;
            
            // تصفية حسب contractorId إذا كان محدداً
            if (contractorId && !this.evaluationMatchesContractorFilter(record, contractorId)) return;
            
            if (!evaluationsMap.has(evalId)) {
                // ✅ إصلاح: تحويل finalScore إلى رقم إذا كان نصاً
                let finalScore = record.finalScore;
                if (typeof finalScore === 'string' && finalScore !== '') {
                    finalScore = parseFloat(finalScore);
                    if (isNaN(finalScore)) finalScore = null;
                } else if (typeof finalScore !== 'number') {
                    finalScore = null;
                }
                
                // ✅ إصلاح: تحويل compliantCount و totalItems إلى أرقام
                let compliantCount = record.compliantCount;
                if (typeof compliantCount === 'string') compliantCount = parseInt(compliantCount) || 0;
                let totalItems = record.totalItems;
                if (typeof totalItems === 'string') totalItems = parseInt(totalItems) || 0;
                
                // ✅ إصلاح: إذا لم يوجد finalScore ولكن يوجد compliantCount و totalItems، احسب النسبة
                if (finalScore === null && compliantCount > 0 && totalItems > 0) {
                    finalScore = Math.round((compliantCount / totalItems) * 100);
                }
                
                const nestedItems = Array.isArray(record.items)
                    ? record.items.map(item => ({
                        criteriaId: item.criteriaId || item.id || '',
                        title: item.title || item.label || '',
                        status: item.status || '',
                        notes: item.notes || ''
                    }))
                    : [];

                evaluationsMap.set(evalId, {
                    id: evalId,
                    contractorId: record.contractorId,
                    contractorName: record.contractorName,
                    evaluationDate: record.evaluationDate,
                    evaluatorName: record.evaluatorName,
                    projectName: record.projectName,
                    location: record.location,
                    generalNotes: record.generalNotes,
                    compliantCount: compliantCount ?? 0,
                    totalItems: totalItems ?? 0,
                    finalScore: finalScore,
                    finalRating: record.finalRating || '',
                    isoCode: record.isoCode,
                    createdAt: record.createdAt,
                    updatedAt: record.updatedAt,
                    createdBy: record.createdBy,
                    updatedBy: record.updatedBy,
                    items: nestedItems
                });
            }
            
            // إضافة البند إلى المصفوفة
            const evaluation = evaluationsMap.get(evalId);
            if (record.criteriaId || record.title) {
                evaluation.items.push({
                    criteriaId: record.criteriaId,
                    title: record.title,
                    status: record.status,
                    notes: record.notes
                });
            }
        });
        
        const records = Array.from(evaluationsMap.values()).sort((a, b) => {
            const dateA = new Date(a.evaluationDate || a.createdAt || 0);
            const dateB = new Date(b.evaluationDate || b.createdAt || 0);
            return dateB - dateA;
        });

        if (records.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-clipboard-check text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500">لا توجد تقييمات مسجلة${contractorId ? ' لهذا المقاول' : ''}</p>
                </div>
            `;
        }

        return `
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>المقاول</th>
                            <th>تاريخ التقييم</th>
                            <th>المقيّم</th>
                            <th>المصنع</th>
                            <th>عدد البنود المطابقة</th>
                            <th>إجمالي البنود</th>
                            <th>النسبة</th>
                            <th>التقييم النهائي</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${records.map(record => `
                            <tr>
                                <td>${Utils.escapeHTML(record.contractorName || '')}</td>
                                <td>${record.evaluationDate ? Utils.formatDate(record.evaluationDate) : '-'}</td>
                                <td>${Utils.escapeHTML(record.evaluatorName || '')}</td>
                                <td>${Utils.escapeHTML(this.formatEvaluationLocationDisplay(record))}</td>
                                <td>${record.compliantCount ?? 0}</td>
                                <td>${record.totalItems ?? (Array.isArray(record.items) ? record.items.length : (record.items ? Object.keys(record.items).length : 0))}</td>
                                <td>${typeof record.finalScore === 'number' ? record.finalScore.toFixed(0) + '%' : '-'}</td>
                                <td>
                                    <span class="badge ${record.finalScore >= 90 ? 'badge-success' : record.finalScore >= 75 ? 'badge-info' : record.finalScore >= 60 ? 'badge-warning' : 'badge-danger'}">
                                        ${Utils.escapeHTML(record.finalRating || '')}
                                    </span>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button class="btn-icon btn-icon-info" title="عرض التفاصيل" onclick="Contractors.viewEvaluation('${record.id}')">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        ${Permissions.isAdmin() ? `
                                        <button class="btn-icon btn-icon-primary" title="تعديل التقييم" onclick="Contractors.showEvaluationForm('${record.contractorId}', ${JSON.stringify(record).replace(/"/g, '&quot;')})">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-icon btn-icon-danger" title="حذف التقييم" onclick="Contractors.requestDeleteEvaluation('${record.id}')">
                                            <i class="fas fa-trash"></i>
                                            </button>
                                        ` : ''}
                                        <button class="btn-icon btn-icon-success" title="تصدير PDF" onclick="Contractors.exportEvaluationPDF('${record.id}')">
                                            <i class="fas fa-file-pdf"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    async renderRequirementsManagementSection() {
        const isAdmin = (AppState.currentUser && AppState.currentUser.role === 'admin');
        if (!isAdmin) {
            return `
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-300 mb-3"></i>
                            <p class="text-gray-500">هذه الصفحة متاحة للمدير فقط</p>
                        </div>
                    </div>
                </div>
            `;
        }

        this.ensureRequirementsSetup();
        const requirements = this.getApprovalRequirements();
        
        // تجميع الاشتراطات حسب الفئة
        const requirementsByCategory = {};
        requirements.forEach(req => {
            const category = req.category || 'other';
            if (!requirementsByCategory[category]) {
                requirementsByCategory[category] = [];
            }
            requirementsByCategory[category].push(req);
        });

        // إحصائيات سريعة
        const stats = {
            total: requirements.length,
            required: requirements.filter(r => r.required).length,
            withExpiry: requirements.filter(r => r.hasExpiry).length,
            critical: requirements.filter(r => r.priority === 'critical').length
        };

        return `
            <div class="content-card contractors-requirements-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <div><h2 class="card-title"><i class="fas fa-cog ml-2"></i>إدارة اشتراطات اعتماد المقاولين</h2><p style="margin:4px 0 0;color:#d9ebf3;font-size:.68rem;">حوكمة الوثائق الإلزامية والأولويات ومدد الصلاحية</p></div>
                        <div class="flex items-center gap-3">
                            <button onclick="Contractors.exportRequirementsTemplate()" class="btn-secondary btn-sm">
                                <i class="fas fa-file-excel ml-2 text-green-600"></i>
                                تصدير قالب Excel
                            </button>
                            <button onclick="Contractors.importRequirementsTemplate()" class="btn-secondary btn-sm">
                                <i class="fas fa-file-import ml-2"></i>
                                استيراد Excel
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <!-- إحصائيات سريعة -->
                    <div class="contractors-requirements-kpis mb-6">
                        <div class="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-blue-600 mb-1">إجمالي الاشتراطات</p>
                                    <p class="text-2xl font-bold text-blue-800">${stats.total}</p>
                                </div>
                                <i class="fas fa-list text-3xl text-blue-400"></i>
                            </div>
                        </div>
                        <div class="p-4 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-red-600 mb-1">اشتراطات مطلوبة</p>
                                    <p class="text-2xl font-bold text-red-800">${stats.required}</p>
                                </div>
                                <i class="fas fa-exclamation-circle text-3xl text-red-400"></i>
                            </div>
                        </div>
                        <div class="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-orange-600 mb-1">مع تاريخ انتهاء</p>
                                    <p class="text-2xl font-bold text-orange-800">${stats.withExpiry}</p>
                                </div>
                                <i class="fas fa-calendar-times text-3xl text-orange-400"></i>
                            </div>
                        </div>
                        <div class="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-purple-600 mb-1">أولوية حرجة</p>
                                    <p class="text-2xl font-bold text-purple-800">${stats.critical}</p>
                                </div>
                                <i class="fas fa-exclamation-triangle text-3xl text-purple-400"></i>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                        <div class="flex items-start gap-3">
                            <i class="fas fa-info-circle text-blue-600 text-xl mt-1"></i>
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-blue-900 mb-1">نظام إدارة اشتراطات متقدم</p>
                                <p class="text-sm text-blue-700">
                                    يمكنك إدارة الاشتراطات بشكل متطور مع دعم التصنيفات، الأولويات، وتواريخ الانتهاء. 
                                    استخدم السحب والإفلات لإعادة ترتيب الاشتراطات.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- فلتر حسب الفئة -->
                    <div class="mb-4 flex items-center gap-3 flex-wrap">
                        <label class="text-sm font-semibold text-gray-700">فلتر حسب الفئة:</label>
                        <button onclick="Contractors.filterRequirementsByCategory('all')" 
                            class="requirement-category-filter active px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            data-category="all">
                            <i class="fas fa-th ml-2"></i>
                            الكل
                        </button>
                        ${Object.values(REQUIREMENT_CATEGORIES).map(cat => `
                            <button onclick="Contractors.filterRequirementsByCategory('${cat.id}')" 
                                class="requirement-category-filter px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                data-category="${cat.id}"
                                style="border: 2px solid ${cat.color}; color: ${cat.color};">
                                <i class="fas ${cat.icon} ml-2"></i>
                                ${cat.label}
                            </button>
                        `).join('')}
                    </div>
                    
                    <!-- قائمة الاشتراطات مع التصنيفات -->
                    <div id="requirements-list" class="space-y-4 mb-4">
                        ${Object.keys(requirementsByCategory).map(categoryId => {
                            const category = REQUIREMENT_CATEGORIES[categoryId] || REQUIREMENT_CATEGORIES.other;
                            const categoryReqs = requirementsByCategory[categoryId];
                            
                            return `
                                <div class="requirement-category-group" data-category="${categoryId}">
                                    <div class="flex items-center gap-3 mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                        <div class="w-1 h-8 rounded" style="background: ${category.color};"></div>
                                        <i class="fas ${category.icon} text-xl" style="color: ${category.color};"></i>
                                        <h3 class="text-lg font-bold text-gray-800">${category.label}</h3>
                                        <span class="badge badge-info">${categoryReqs.length} اشتراط</span>
                                    </div>
                                    <div class="space-y-3 ml-6">
                                        ${categoryReqs.map((req, index) => {
                                            const priority = REQUIREMENT_PRIORITIES[req.priority] || REQUIREMENT_PRIORITIES.medium;
                                            return `
                                                <div class="requirement-item p-4 border-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-move" 
                                                     data-requirement-id="${req.id}"
                                                     data-category="${categoryId}"
                                                     draggable="true"
                                                     style="border-color: ${priority.color}20;">
                                                    <div class="flex items-start gap-4">
                                                        <!-- Handle for drag -->
                                                        <div class="drag-handle cursor-grab active:cursor-grabbing pt-1">
                                                            <i class="fas fa-grip-vertical text-gray-400 text-xl"></i>
                                                        </div>
                                                        
                                                        <div class="flex-1">
                                                            <div class="flex items-center gap-3 mb-3">
                                                                <span class="px-2 py-1 text-xs font-bold rounded" style="background: ${priority.color}20; color: ${priority.color};">
                                                                    ${priority.label}
                                                                </span>
                                                                <span class="text-sm font-semibold text-gray-500">#${req.order}</span>
                                                                ${req.required ? '<span class="badge badge-danger text-xs">مطلوب</span>' : '<span class="badge badge-secondary text-xs">اختياري</span>'}
                                                                ${req.hasExpiry ? `<span class="badge badge-warning text-xs"><i class="fas fa-calendar ml-1"></i> ${req.expiryMonths} شهر</span>` : ''}
                                                            </div>
                                                            
                                                            <input type="text" 
                                                                class="form-input mb-3 font-semibold text-gray-800" 
                                                                value="${Utils.escapeHTML(req.label)}"
                                                                data-field="label"
                                                                placeholder="اسم الاشتراط">
                                                            
                                                            ${req.description ? `
                                                                <textarea class="form-input mb-3 text-sm" 
                                                                    data-field="description"
                                                                    placeholder="وصف الاشتراط"
                                                                    rows="2">${Utils.escapeHTML(req.description || '')}</textarea>
                                                            ` : `
                                                                <textarea class="form-input mb-3 text-sm" 
                                                                    data-field="description"
                                                                    placeholder="وصف الاشتراط (اختياري)"
                                                                    rows="2"></textarea>
                                                            `}
                                                            
                                                            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                                <select class="form-input text-sm" data-field="type">
                                                                    <option value="document" ${req.type === 'document' ? 'selected' : ''}>📄 مستند</option>
                                                                    <option value="checkbox" ${req.type === 'checkbox' ? 'selected' : ''}>☑️ مربع اختيار</option>
                                                                    <option value="text" ${req.type === 'text' ? 'selected' : ''}>📝 نص</option>
                                                                </select>
                                                                
                                                                <select class="form-input text-sm" data-field="category">
                                                                    ${Object.values(REQUIREMENT_CATEGORIES).map(cat => `
                                                                        <option value="${cat.id}" ${req.category === cat.id ? 'selected' : ''}>${cat.label}</option>
                                                                    `).join('')}
                                                                </select>
                                                                
                                                                <select class="form-input text-sm" data-field="priority">
                                                                    ${Object.values(REQUIREMENT_PRIORITIES).map(pri => `
                                                                        <option value="${pri.id}" ${req.priority === pri.id ? 'selected' : ''}>${pri.label}</option>
                                                                    `).join('')}
                                                                </select>
                                                                
                                                                <label class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                                                    <input type="checkbox" 
                                                                        data-field="required" 
                                                                        ${req.required ? 'checked' : ''}
                                                                        class="cursor-pointer">
                                                                    <span class="text-sm text-gray-700">مطلوب</span>
                                                                </label>
                                                            </div>
                                                            
                                                            <div class="grid grid-cols-2 gap-3 mt-3">
                                                                <label class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                                                    <input type="checkbox" 
                                                                        data-field="hasExpiry" 
                                                                        ${req.hasExpiry ? 'checked' : ''}
                                                                        class="cursor-pointer"
                                                                        onchange="Contractors.toggleExpiryFields(this)">
                                                                    <span class="text-sm text-gray-700">له تاريخ انتهاء</span>
                                                                </label>
                                                                ${req.hasExpiry ? `
                                                                    <div class="expiry-fields">
                                                                        <input type="number" 
                                                                            class="form-input text-sm" 
                                                                            value="${req.expiryMonths || 12}"
                                                                            data-field="expiryMonths"
                                                                            placeholder="عدد الأشهر"
                                                                            min="1" max="60">
                                                                    </div>
                                                                ` : `
                                                                    <div class="expiry-fields" style="display: none;">
                                                                        <input type="number" 
                                                                            class="form-input text-sm" 
                                                                            value="12"
                                                                            data-field="expiryMonths"
                                                                            placeholder="عدد الأشهر"
                                                                            min="1" max="60">
                                                                    </div>
                                                                `}
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="flex flex-col gap-2">
                                                            <button onclick="Contractors.moveRequirementUp('${req.id}')" 
                                                                class="btn-icon btn-icon-info" 
                                                                title="نقل لأعلى"
                                                                ${index === 0 ? 'disabled' : ''}>
                                                                <i class="fas fa-arrow-up"></i>
                                                            </button>
                                                            <button onclick="Contractors.moveRequirementDown('${req.id}')" 
                                                                class="btn-icon btn-icon-info" 
                                                                title="نقل لأسفل"
                                                                ${index === categoryReqs.length - 1 ? 'disabled' : ''}>
                                                                <i class="fas fa-arrow-down"></i>
                                                            </button>
                                                            <button onclick="Contractors.deleteRequirement('${req.id}')" 
                                                                class="btn-icon btn-icon-danger" 
                                                                title="حذف">
                                                                <i class="fas fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <div class="flex items-center justify-between pt-4 border-t">
                        <div class="flex items-center gap-3">
                            <button onclick="Contractors.addNewRequirement()" class="btn-secondary">
                                <i class="fas fa-plus ml-2"></i>
                                إضافة اشتراط جديد
                            </button>
                            <button onclick="Contractors.bulkEditRequirements()" class="btn-secondary">
                                <i class="fas fa-edit ml-2"></i>
                                تعديل جماعي
                            </button>
                        </div>
                        <button onclick="Contractors.saveRequirements()" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            حفظ جميع التغييرات
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * ✅ ربط مستمعي تبويب المعتمدين (فلاتر + تصدير) — يُستدعى بعد التحميل الكسول للتبويب
     */
    ensureApprovedTabEventListeners() {
        const bindClick = (id, handler) => {
            const el = document.getElementById(id);
            if (!el || el.hasAttribute('data-listener-attached')) return;
            el.setAttribute('data-listener-attached', 'true');
            el.addEventListener('click', handler);
        };

        bindClick('export-approved-contractors-excel-btn', () => this.exportApprovedEntitiesExcel());
        bindClick('export-approved-contractors-pdf-btn', () => this.exportApprovedEntitiesPDF());

        const importApprovedBtn = document.getElementById('import-approved-contractors-excel-btn');
        const importApprovedInput = document.getElementById('import-approved-contractors-input');
        if (importApprovedBtn && importApprovedInput && !importApprovedBtn.hasAttribute('data-listener-attached')) {
            importApprovedBtn.setAttribute('data-listener-attached', 'true');
            importApprovedBtn.addEventListener('click', () => {
                try {
                    importApprovedInput.value = '';
                    importApprovedInput.click();
                } catch (_e) { /* ignore */ }
            });
            if (!importApprovedInput.hasAttribute('data-listener-attached')) {
                importApprovedInput.setAttribute('data-listener-attached', 'true');
                importApprovedInput.addEventListener('change', (ev) => {
                    const f = ev.target?.files?.[0];
                    if (f) {
                        this.importApprovedEntitiesFromExcelFile(f).finally(() => {
                            try { ev.target.value = ''; } catch (_e2) { /* ignore */ }
                        });
                    }
                });
            }
        }

        const approvedSearchInput = document.getElementById('approved-contractors-search');
        if (approvedSearchInput && !approvedSearchInput.hasAttribute('data-listener-attached')) {
            approvedSearchInput.setAttribute('data-listener-attached', 'true');
            if (this.approvedFilters?.search) {
                approvedSearchInput.value = this.approvedFilters.search;
            }
            approvedSearchInput.addEventListener('input', (event) => {
                const value = event.target.value || '';
                this.approvedFilters.search = value;
                this.updateApprovedFiltersMeta();
                clearTimeout(this._approvedSearchFilterTimer);
                this._approvedSearchFilterTimer = setTimeout(() => {
                    if (this.currentTab === 'approved') {
                        this.refreshApprovedEntitiesList();
                    }
                }, 180);
            });
        }

        bindClick('approved-contractors-search-clear', () => {
            const searchInput = document.getElementById('approved-contractors-search');
            if (searchInput) searchInput.value = '';
            clearTimeout(this._approvedSearchFilterTimer);
            this.handleApprovedFilterChange('search', '');
        });

        const approvedStatusSelect = document.getElementById('approved-contractors-status');
        if (approvedStatusSelect && !approvedStatusSelect.hasAttribute('data-listener-attached')) {
            approvedStatusSelect.setAttribute('data-listener-attached', 'true');
            approvedStatusSelect.addEventListener('change', (event) => {
                this.handleApprovedFilterChange('status', event.target.value || '');
            });
        }

        const approvedTypeSelect = document.getElementById('approved-contractors-type');
        if (approvedTypeSelect && !approvedTypeSelect.hasAttribute('data-listener-attached')) {
            approvedTypeSelect.setAttribute('data-listener-attached', 'true');
            approvedTypeSelect.addEventListener('change', (event) => {
                this.handleApprovedFilterChange('type', event.target.value || '');
            });
        }

        const approvedValiditySelect = document.getElementById('approved-contractors-validity');
        if (approvedValiditySelect && !approvedValiditySelect.hasAttribute('data-listener-attached')) {
            approvedValiditySelect.setAttribute('data-listener-attached', 'true');
            approvedValiditySelect.addEventListener('change', (event) => {
                this.handleApprovedFilterChange('validity', event.target.value || '');
            });
        }

        bindClick('approved-contractors-reset', () => this.resetApprovedFilters());
    },

    setupEventListeners() {
        const activeSignal = this._abortController?.signal;
        if (!activeSignal) {
            return;
        }
        this._eventListenersAttached = true;

        this.ensureApprovedTabEventListeners();

        const addEvaluationBtn = document.getElementById('add-contractor-evaluation-btn');
        if (addEvaluationBtn) addEvaluationBtn.addEventListener('click', () => this.handleAddEvaluationClick(), { signal: activeSignal });

        const filterSelect = document.getElementById('contractor-evaluation-filter');
        if (filterSelect) {
            if (this.currentEvaluationFilter) {
                filterSelect.value = this.currentEvaluationFilter;
            }
            filterSelect.addEventListener('change', (event) => {
                this.currentEvaluationFilter = event.target.value || '';
                this.refreshEvaluationsList(this.currentEvaluationFilter);
            }, { signal: activeSignal });
        }

        const settingsBtn = document.getElementById('contractor-evaluation-settings-btn');
        if (settingsBtn) settingsBtn.addEventListener('click', () => this.openEvaluationSettings(), { signal: activeSignal });

        const manageRequirementsBtn = document.getElementById('manage-requirements-btn');
        if (manageRequirementsBtn) manageRequirementsBtn.addEventListener('click', () => this.openRequirementsManagement(), { signal: activeSignal });

        const sendApprovalRequestBtn = document.getElementById('send-approval-request-btn');
        if (sendApprovalRequestBtn) sendApprovalRequestBtn.addEventListener('click', () => this.showApprovalRequestForm(), { signal: activeSignal });

        // ✅ معطل مؤقتاً - كان يسبب تحديثات متكررة واهتزاز
        // الاستماع لحدث اكتمال المزامنة
    },

    /**
     * ✅ إعداد Listeners للتحديثات Real-time
     * ✅ معطل مؤقتاً لمنع الاهتزاز
     */
    setupRealtimeListeners() {
        // ✅ معطل مؤقتاً - كان يسبب تحديثات متكررة واهتزاز
        return;
    },

    /**
     * ✅ التأكد من ربط event listeners لأزرار التقييمات
     * يتم استدعاؤها عند التبديل إلى تبويب التقييمات
     * ✅ يتم إعادة ربط الـ listeners حتى لو تم إلغاؤها سابقاً
     */
    ensureEvaluationsEventListeners() {
        // ✅ ربط زر إضافة تقييم
        const addEvaluationBtn = document.getElementById('add-contractor-evaluation-btn');
        if (addEvaluationBtn && !addEvaluationBtn.hasAttribute('data-listener-attached')) {
            addEvaluationBtn.setAttribute('data-listener-attached', 'true');
            addEvaluationBtn.addEventListener('click', () => this.handleAddEvaluationClick());
        }

        // ✅ ربط زر تعديل بنود التقييم
        const settingsBtn = document.getElementById('contractor-evaluation-settings-btn');
        if (settingsBtn && !settingsBtn.hasAttribute('data-listener-attached')) {
            settingsBtn.setAttribute('data-listener-attached', 'true');
            settingsBtn.addEventListener('click', () => this.openEvaluationSettings());
        }

        // ✅ ربط فلتر المقاولين
        const filterSelect = document.getElementById('contractor-evaluation-filter');
        if (filterSelect && !filterSelect.hasAttribute('data-listener-attached')) {
            filterSelect.setAttribute('data-listener-attached', 'true');
            if (this.currentEvaluationFilter) {
                filterSelect.value = this.currentEvaluationFilter;
            }
            filterSelect.addEventListener('change', (event) => {
                this.currentEvaluationFilter = event.target.value || '';
                this.refreshEvaluationsList(this.currentEvaluationFilter);
            });
        }
    },

    handleAddEvaluationClick() {
        // ✅ استخدام نفس المنطق المستخدم في renderEvaluationsSection
        const approvedOptions = this.getApprovedOptions(true);
        const legacyContractors = AppState.appData.contractors || [];
        const filterOptions = approvedOptions.length > 0 ? approvedOptions : legacyContractors.map(contractor => ({
            id: contractor.id,
            name: contractor.name || contractor.company || contractor.contractorName || ''
        }));

        if (filterOptions.length === 0) {
            Notification.warning('لا توجد شركات مقاولين مسجلة. يرجى إضافة مقاول أولاً.');
            return;
        }

        const filterSelect = document.getElementById('contractor-evaluation-filter');
        const selectedId = filterSelect?.value || '';

        if (selectedId) {
            this.showEvaluationForm(selectedId);
            return;
        }

        if (filterOptions.length === 1) {
            this.showEvaluationForm(filterOptions[0].id);
            return;
        }

        this.showEvaluationContractorPicker();
    },

    showEvaluationContractorPicker() {
        // ✅ استخدام نفس المنطق المستخدم في renderEvaluationsSection
        const approvedOptions = this.getApprovedOptions(true);
        const legacyContractors = AppState.appData.contractors || [];
        const filterOptions = approvedOptions.length > 0 ? approvedOptions : legacyContractors.map(contractor => ({
            id: contractor.id,
            name: contractor.name || contractor.company || contractor.contractorName || ''
        }));

        if (filterOptions.length === 0) {
            Notification.warning('لا توجد شركات مقاولين مسجلة. يرجى إضافة مقاول أولاً.');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 480px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-clipboard-check ml-2"></i>اختيار المقاول</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="contractor-evaluation-picker" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">اختر المقاول</label>
                            <select id="contractor-evaluation-picker-select" class="form-input" required>
                                <option value="">-- اختر المقاول --</option>
                                ${filterOptions.map(contractor => `
                                    <option value="${contractor.id}">${Utils.escapeHTML(contractor.name || '')}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="flex items-center justify-end gap-3">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-arrow-right ml-2"></i>
                                متابعة
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.applyModuleI18n(modal);

        const form = modal.querySelector('#contractor-evaluation-picker');
        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            const select = modal.querySelector('#contractor-evaluation-picker-select');
            const contractorId = select?.value || '';
            if (!contractorId) {
                Notification.warning('يرجى اختيار المقاول أولاً');
                return;
            }
            modal.remove();
            this.showEvaluationForm(contractorId);
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) modal.remove();
        });
    },

    ensureEvaluationSetup() {
        let shouldSave = false;

        if (!Array.isArray(AppState.appData.contractorEvaluations)) {
            AppState.appData.contractorEvaluations = [];
            shouldSave = true;
        }

        const criteria = AppState.appData.contractorEvaluationCriteria;
        if (!Array.isArray(criteria) || criteria.length === 0) {
            AppState.appData.contractorEvaluationCriteria = CONTRACTOR_EVALUATION_DEFAULT_ITEMS.map((label, index) => ({
                id: `criteria_${index + 1}`,
                label
            }));
            shouldSave = true;
        } else {
            const normalized = criteria.map((item, index) => {
                if (typeof item === 'string') {
                    shouldSave = true;
                    return {
                        id: `criteria_${index + 1}`,
                        label: item.trim()
                    };
                }
                return {
                    id: item.id || `criteria_${index + 1}`,
                    label: (item.label || item.title || '').trim()
                };
            }).filter(item => item.label);

            if (normalized.length !== criteria.length) {
                shouldSave = true;
            }

            AppState.appData.contractorEvaluationCriteria = normalized;
        }

        if (shouldSave) {
            // حفظ البيانات باستخدام window.DataManager
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            } else {
                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
            }
        }
    },

    getEvaluationCriteria() {
        this.ensureEvaluationSetup();
        return (AppState.appData.contractorEvaluationCriteria || []).map((item, index) => ({
            id: item.id || `criteria_${index + 1}`,
            label: item.label || item.title || ''
        })).filter(item => item.label);
    },

    getSiteOptions() {
        try {
            if (typeof Permissions !== 'undefined' && Permissions.formSettingsState && Array.isArray(Permissions.formSettingsState.sites)) {
                return Permissions.formSettingsState.sites.map(site => ({
                    id: site.id,
                    name: site.name
                }));
            }
            if (Array.isArray(AppState.appData?.observationSites) && AppState.appData.observationSites.length > 0) {
                return AppState.appData.observationSites.map(site => ({
                    id: site.id || site.siteId || Utils.generateId('SITE'),
                    name: site.name || site.title || site.label || 'موقع غير محدد'
                }));
            }
            if (typeof DailyObservations !== 'undefined' && Array.isArray(DailyObservations.DEFAULT_SITES)) {
                return DailyObservations.DEFAULT_SITES.map((site, index) => ({
                    id: site.id || site.siteId || Utils.generateId('SITE'),
                    name: site.name || site.title || site.label || `موقع ${index + 1}`
                }));
            }
            return [];
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في الحصول على قائمة المصانع:', error);
            return [];
        }
    },

    getPlaceOptions(siteId) {
        try {
            if (!siteId) return [];
            const siteKey = String(siteId);
            if (typeof Permissions !== 'undefined' && Permissions.formSettingsState && Array.isArray(Permissions.formSettingsState.sites)) {
                const site = Permissions.formSettingsState.sites.find(s => String(s.id) === siteKey);
                if (site && Array.isArray(site.places)) {
                    return site.places.map(place => ({ id: place.id, name: place.name }));
                }
            }
            if (Array.isArray(AppState.appData?.observationSites)) {
                const site = AppState.appData.observationSites.find(s => String(s.id || s.siteId) === siteKey);
                if (site) {
                    const placesSource = Array.isArray(site.places) ? site.places
                        : Array.isArray(site.locations) ? site.locations
                            : Array.isArray(site.children) ? site.children
                                : Array.isArray(site.areas) ? site.areas : [];
                    return placesSource.map((place, idx) => ({
                        id: place.id || place.placeId || place.value || Utils.generateId('PLACE'),
                        name: place.name || place.placeName || place.title || place.label || place.locationName || `مكان ${idx + 1}`
                    }));
                }
            }
            if (typeof DailyObservations !== 'undefined' && Array.isArray(DailyObservations.DEFAULT_SITES)) {
                const site = DailyObservations.DEFAULT_SITES.find(s => String(s.id || s.siteId) === siteKey);
                if (site) {
                    const placesSource = Array.isArray(site.places) ? site.places
                        : Array.isArray(site.locations) ? site.locations
                            : Array.isArray(site.children) ? site.children
                                : Array.isArray(site.areas) ? site.areas : [];
                    return placesSource.map((place, idx) => ({
                        id: place.id || place.placeId || place.value || Utils.generateId('PLACE'),
                        name: place.name || place.placeName || place.title || place.label || place.locationName || `مكان ${idx + 1}`
                    }));
                }
            }
            return [];
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في الحصول على قائمة المواقع الفرعية:', error);
            return [];
        }
    },

    resolveEvaluationFactoryId(evaluationData) {
        if (!evaluationData) return '';
        const explicit = evaluationData.factoryId || evaluationData.locationId;
        if (explicit) return String(explicit);
        const name = String(evaluationData.projectName || '').trim();
        if (!name) return '';
        const site = this.getSiteOptions().find(s => s.name === name || String(s.id) === name);
        return site ? String(site.id) : '';
    },

    resolveEvaluationSubLocationId(evaluationData, factoryId) {
        if (!evaluationData) return '';
        const explicit = evaluationData.subLocationId;
        if (explicit) return String(explicit);
        const name = String(evaluationData.location || '').trim();
        if (!name || !factoryId) return '';
        const place = this.getPlaceOptions(factoryId).find(p => p.name === name || String(p.id) === name);
        return place ? String(place.id) : '';
    },

    evaluationMatchesContractorFilter(record, contractorId) {
        if (!contractorId) return true;
        if (!record) return false;
        if (record.contractorId === contractorId) return true;

        const approvedList = AppState.appData.approvedContractors || [];
        const approved = approvedList.find(ac => ac.id === contractorId || ac.contractorId === contractorId);
        if (approved) {
            if (record.contractorId === approved.id || record.contractorId === approved.contractorId) return true;
            const recordName = String(record.contractorName || '').trim().toLowerCase();
            const approvedName = String(approved.companyName || '').trim().toLowerCase();
            if (recordName && approvedName && recordName === approvedName) return true;
        }

        const contractor = (AppState.appData.contractors || []).find(c => c.id === contractorId);
        if (contractor) {
            const recordName = String(record.contractorName || '').trim().toLowerCase();
            const contractorName = String(contractor.name || contractor.company || contractor.contractorName || '').trim().toLowerCase();
            if (record.contractorId === contractor.id) return true;
            if (recordName && contractorName && recordName === contractorName) return true;
        }

        return false;
    },

    formatEvaluationLocationDisplay(evaluation) {
        if (!evaluation) return '';
        const factory = evaluation.projectName || '';
        const sub = evaluation.location || '';
        if (factory && sub) return `${factory} — ${sub}`;
        return factory || sub || '';
    },

    collectEvaluationLocationFromForm(form) {
        const factorySelect = form?.querySelector('#contractor-evaluation-factory');
        const subSelect = form?.querySelector('#contractor-evaluation-sub-location');
        const factoryId = factorySelect?.value || '';
        const subLocationId = subSelect?.value || '';
        const factoryOpt = factorySelect?.options[factorySelect.selectedIndex];
        const subOpt = subSelect?.options[subSelect.selectedIndex];
        return {
            factoryId,
            locationId: factoryId,
            projectName: factoryOpt?.text?.trim() || '',
            subLocationId,
            location: subOpt?.text?.trim() || ''
        };
    },

    bindEvaluationLocationSelects(modal) {
        if (!modal) return;
        const factorySelect = modal.querySelector('#contractor-evaluation-factory');
        const subSelect = modal.querySelector('#contractor-evaluation-sub-location');
        if (!factorySelect || !subSelect) return;

        const refreshSubLocations = (preserveValue) => {
            const factoryId = factorySelect.value || '';
            const current = preserveValue ? subSelect.value : '';
            subSelect.innerHTML = '<option value="">اختر الموقع الفرعي</option>';
            this.getPlaceOptions(factoryId).forEach((place) => {
                const opt = document.createElement('option');
                opt.value = String(place.id);
                opt.textContent = place.name;
                subSelect.appendChild(opt);
            });
            if (current && Array.from(subSelect.options).some(o => o.value === current)) {
                subSelect.value = current;
            }
        };

        factorySelect.addEventListener('change', () => refreshSubLocations(false));
        if (factorySelect.value && subSelect.options.length <= 1) {
            refreshSubLocations(true);
        }
    },

    prepareApprovalRequestPayloadForBackend(source) {
        const payload = JSON.parse(JSON.stringify(source || {}));
        delete payload._isPendingSync;
        delete payload._syncError;
        delete payload._syncErrorMessage;
        delete payload.attachmentFiles;
        const sheetId = AppState?.googleConfig?.sheets?.spreadsheetId;
        if (sheetId && String(sheetId).trim() && sheetId !== 'YOUR_SPREADSHEET_ID_HERE') {
            payload.spreadsheetId = String(sheetId).trim();
        }
        if (payload.requestType === 'evaluation' && payload.evaluationData && typeof payload.evaluationData === 'object') {
            const evalData = payload.evaluationData;
            if (Array.isArray(evalData.items)) {
                evalData.totalItems = evalData.totalItems ?? evalData.items.length;
            }
        }
        return payload;
    },

    parseEvaluationDataFromRequest(request) {
        if (!request) return null;

        let evaluationData = request.evaluationData;
        let parseAttempts = 0;
        while (evaluationData && typeof evaluationData === 'string' && parseAttempts < 3) {
            try {
                evaluationData = JSON.parse(evaluationData);
                parseAttempts++;
            } catch (_e) {
                break;
            }
        }

        if (!evaluationData || typeof evaluationData !== 'object') {
            evaluationData = {};
        }

        let itemsParseAttempts = 0;
        while (evaluationData.items && typeof evaluationData.items === 'string' && itemsParseAttempts < 3) {
            try {
                evaluationData.items = JSON.parse(evaluationData.items);
                itemsParseAttempts++;
            } catch (_e) {
                evaluationData.items = [];
                break;
            }
        }

        if (!Array.isArray(evaluationData.items)) {
            evaluationData.items = evaluationData.items ? Object.values(evaluationData.items) : [];
        }

        evaluationData.id = evaluationData.id || request.entityId || request.evaluationId || Utils.generateId('CTREVAL');
        evaluationData.contractorId = evaluationData.contractorId || request.contractorId || '';
        evaluationData.contractorName = evaluationData.contractorName || request.contractorName || request.companyName || '';
        evaluationData.evaluationDate = evaluationData.evaluationDate || request.evaluationDate || new Date().toISOString();
        evaluationData.evaluatorName = evaluationData.evaluatorName || request.evaluatorName || request.createdByName || '';
        evaluationData.projectName = evaluationData.projectName || request.projectName || '';
        evaluationData.location = evaluationData.location || request.location || '';
        evaluationData.compliantCount = evaluationData.compliantCount ?? request.compliantCount ?? 0;
        evaluationData.totalItems = evaluationData.totalItems ?? request.totalItems ?? evaluationData.items.length;
        evaluationData.finalScore = evaluationData.finalScore ?? request.finalScore ?? null;
        evaluationData.finalRating = evaluationData.finalRating || request.finalRating || '';
        evaluationData.generalNotes = evaluationData.generalNotes || request.generalNotes || request.notes || '';

        return evaluationData;
    },

    collectEvaluationItems(container) {
        if (!container || !document.contains(container)) return [];
        
        try {
        return Array.from(container.querySelectorAll('tbody tr[data-criteria-id]')).map(row => {
                // ✅ التحقق من أن الصف لا يزال موجوداً في DOM
                if (!document.contains(row)) {
                    return null;
                }
                
            const criteriaId = row.getAttribute('data-criteria-id') || '';
            const title = row.getAttribute('data-criteria-label') || '';
            const selected = row.querySelector('input[type="radio"]:checked');
                const status = selected && document.contains(selected) ? selected.value : '';
            const notesField = row.querySelector('textarea');
                const notes = notesField && document.contains(notesField) ? notesField.value.trim() : '';
            return { criteriaId, title, status, notes };
            }).filter(item => item !== null); // ✅ إزالة العناصر null
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في collectEvaluationItems:', error);
            return [];
        }
    },

    calculateEvaluationSummary(items) {
        const evaluated = items.filter(item => item.status === 'compliant' || item.status === 'non_compliant');
        const compliantCount = evaluated.filter(item => item.status === 'compliant').length;
        const totalItems = evaluated.length;
        const finalScore = totalItems > 0 ? Math.round((compliantCount / totalItems) * 100) : null;
        const finalRating = this.getFinalRating(finalScore, totalItems);

        return { compliantCount, totalItems, finalScore, finalRating };
    },

    bindEvaluationFormInteractions(modal) {
        if (!modal) return;
        const updateSummary = () => {
            // ✅ التحقق من أن modal لا يزال موجوداً في DOM
            if (!modal || !document.contains(modal)) {
                Utils.safeLog('⚠️ updateSummary: modal غير موجود أو تم حذفه');
                return;
            }
            
            const items = this.collectEvaluationItems(modal);
            const summary = this.calculateEvaluationSummary(items);

            const compliantInput = modal.querySelector('#contractor-evaluation-compliant');
            const totalInput = modal.querySelector('#contractor-evaluation-total');
            const scoreInput = modal.querySelector('#contractor-evaluation-final-score');
            const ratingInput = modal.querySelector('#contractor-evaluation-final-rating');
            
            // ✅ التحقق من وجود العناصر قبل الوصول إليها
            if (!compliantInput || !totalInput || !scoreInput || !ratingInput) {
                Utils.safeLog('⚠️ updateSummary: بعض العناصر غير موجودة');
                return;
            }

            if (compliantInput) compliantInput.value = summary.compliantCount ?? 0;
            if (totalInput) totalInput.value = summary.totalItems ?? 0;
            if (scoreInput) scoreInput.value = summary.finalScore !== null ? summary.finalScore.toFixed(0) + '%' : '';
            if (ratingInput) ratingInput.value = summary.finalRating || '';

            // Update visual styling of summary inputs based on values
            if (compliantInput) {
                const count = parseInt(compliantInput.value) || 0;
                compliantInput.style.background = count > 0 ? '#dcfce7' : '#f1f5f9';
                compliantInput.style.borderColor = count > 0 ? '#10b981' : '#cbd5e1';
                compliantInput.style.color = count > 0 ? '#059669' : '#64748b';
            }

            if (scoreInput) {
                const score = parseFloat(scoreInput.value) || 0;
                let bgColor = '#f1f5f9';
                let borderColor = '#cbd5e1';
                let textColor = '#64748b';

                if (score >= 80) {
                    bgColor = '#dcfce7';
                    borderColor = '#10b981';
                    textColor = '#059669';
                } else if (score >= 60) {
                    bgColor = '#fef3c7';
                    borderColor = '#f59e0b';
                    textColor = '#d97706';
                } else if (score > 0) {
                    bgColor = '#fee2e2';
                    borderColor = '#ef4444';
                    textColor = '#dc2626';
                }

                scoreInput.style.background = bgColor;
                scoreInput.style.borderColor = borderColor;
                scoreInput.style.color = textColor;
            }

            if (ratingInput) {
                const rating = ratingInput.value.toLowerCase();
                let bgColor = '#f1f5f9';
                let borderColor = '#cbd5e1';
                let textColor = '#64748b';

                if (rating.includes('ممتاز') || rating.includes('excellent')) {
                    bgColor = '#dcfce7';
                    borderColor = '#10b981';
                    textColor = '#059669';
                } else if (rating.includes('جيد') || rating.includes('good')) {
                    bgColor = '#dbeafe';
                    borderColor = '#3b82f6';
                    textColor = '#1e40af';
                } else if (rating.includes('مقبول') || rating.includes('acceptable')) {
                    bgColor = '#fef3c7';
                    borderColor = '#f59e0b';
                    textColor = '#d97706';
                } else if (rating.includes('ضعيف') || rating.includes('poor')) {
                    bgColor = '#fee2e2';
                    borderColor = '#ef4444';
                    textColor = '#dc2626';
                }

                ratingInput.style.background = bgColor;
                ratingInput.style.borderColor = borderColor;
                ratingInput.style.color = textColor;
            }
        };

        const updateRadioButtonStyles = () => {
            // ✅ التحقق من أن modal لا يزال موجوداً في DOM
            if (!modal || !document.contains(modal)) {
                return;
            }
            
            try {
            modal.querySelectorAll('input[type="radio"][name^="criteria-"]').forEach(input => {
                    if (!document.contains(input)) return; // ✅ تخطي العناصر المحذوفة
                    
                const label = input.closest('label');
                const row = input.closest('tr');
                const isCompliant = input.value === 'compliant' && input.checked;
                const isNonCompliant = input.value === 'non_compliant' && input.checked;

                    if (label && document.contains(label)) {
                    if (isCompliant) {
                        label.style.background = '#dcfce7';
                        label.style.border = '2px solid #10b981';
                            const span = label.querySelector('span');
                            if (span) span.style.color = '#059669';
                    } else if (isNonCompliant) {
                        label.style.background = '#fee2e2';
                        label.style.border = '2px solid #ef4444';
                            const span = label.querySelector('span');
                            if (span) span.style.color = '#dc2626';
                    } else {
                        label.style.background = '#f1f5f9';
                        label.style.border = '2px solid #cbd5e1';
                            const span = label.querySelector('span');
                            if (span) span.style.color = '#64748b';
                    }
                }
            });
            } catch (error) {
                Utils.safeWarn('⚠️ خطأ في updateRadioButtonStyles:', error);
            }
        };

        try {
        modal.querySelectorAll('input[type="radio"][name^="criteria-"]').forEach(input => {
            input.addEventListener('change', () => {
                    // ✅ التحقق من أن modal لا يزال موجوداً في DOM
                    if (!modal || !document.contains(modal)) {
                        return;
                    }
                    
                // Reset all radio buttons in the same row
                const row = input.closest('tr');
                    if (row && document.contains(row)) {
                    row.querySelectorAll('input[type="radio"]').forEach(radio => {
                            if (!document.contains(radio)) return;
                        const label = radio.closest('label');
                            if (label && document.contains(label) && !radio.checked) {
                            label.style.background = '#f1f5f9';
                            label.style.border = '2px solid #cbd5e1';
                            const span = label.querySelector('span');
                            if (span) span.style.color = '#64748b';
                        }
                    });
                }
                updateRadioButtonStyles();
                updateSummary();
            });
        });
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في إعداد event listeners لراديو buttons:', error);
        }

        // Add hover effects to radio button labels
        try {
        modal.querySelectorAll('label').forEach(label => {
                if (!document.contains(label)) return;
                
            const radio = label.querySelector('input[type="radio"]');
                if (radio && document.contains(radio)) {
                label.addEventListener('mouseenter', () => {
                        if (!document.contains(label) || !document.contains(radio)) return;
                    if (!radio.checked) {
                        label.style.transform = 'scale(1.05)';
                        label.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    }
                });
                label.addEventListener('mouseleave', () => {
                        if (!document.contains(label) || !document.contains(radio)) return;
                    if (!radio.checked) {
                        label.style.transform = 'scale(1)';
                        label.style.boxShadow = 'none';
                    }
                });
            }
        });
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في إعداد hover effects:', error);
        }

        // Add focus styles to form inputs
        try {
        modal.querySelectorAll('.form-input').forEach(input => {
                if (!document.contains(input)) return;
                
            input.addEventListener('focus', () => {
                    if (!document.contains(input)) return;
                input.style.borderColor = '#2563eb';
                input.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
            });
            input.addEventListener('blur', () => {
                    if (!document.contains(input)) return;
                input.style.boxShadow = 'none';
            });
        });
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في إعداد focus styles:', error);
        }

        updateRadioButtonStyles();
        updateSummary();
    },

    showEvaluationForm(contractorId, existing = null, contractorNameOverride = null) {
        this.ensureEvaluationSetup();

        const contractors = AppState.appData.contractors || [];
        let contractor = contractors.find(c => c.id === contractorId) || null;

        // إذا لم نجد المقاول في قائمة المقاولين، نبحث في قائمة المعتمدين
        if (!contractor) {
            this.ensureApprovedSetup();
            const approvedEntities = AppState.appData.approvedContractors || [];
            const approvedEntity = approvedEntities.find(ae => ae.id === contractorId || ae.contractorId === contractorId);

            if (approvedEntity) {
                // إنشاء كائن مقاول مؤقت من بيانات المعتمد
                contractor = {
                    id: approvedEntity.contractorId || approvedEntity.id,
                    name: approvedEntity.companyName,
                    company: approvedEntity.companyName,
                    contractorName: approvedEntity.companyName,
                    serviceType: approvedEntity.serviceType,
                    isFromApproved: true
                };
            }
        }

        // ✅ إصلاح: إذا كان existing موجوداً ولكن contractor غير موجود، نحاول البحث عن المقاول من contractorId
        if (!contractor && existing) {
            const existingContractorId = existing.contractorId;
            if (existingContractorId) {
                // البحث في قائمة المقاولين
                contractor = contractors.find(c => c.id === existingContractorId) || null;
                
                // إذا لم نجد، البحث في قائمة المعتمدين
                if (!contractor) {
                    this.ensureApprovedSetup();
                    const approvedEntities = AppState.appData.approvedContractors || [];
                    const approvedEntity = approvedEntities.find(ae => 
                        ae.id === existingContractorId || 
                        ae.contractorId === existingContractorId
                    );
                    
                    if (approvedEntity) {
                        contractor = {
                            id: approvedEntity.contractorId || approvedEntity.id,
                            name: approvedEntity.companyName,
                            company: approvedEntity.companyName,
                            contractorName: approvedEntity.companyName,
                            serviceType: approvedEntity.serviceType,
                            isFromApproved: true
                        };
                    }
                }
            }
        }

        // ✅ إصلاح: إذا كان existing موجوداً ولكن contractor غير موجود، نحاول البحث عن المقاول من contractorId
        if (!contractor && existing) {
            const existingContractorId = existing.contractorId;
            if (existingContractorId) {
                // البحث في قائمة المقاولين
                contractor = contractors.find(c => c.id === existingContractorId) || null;
                
                // إذا لم نجد، البحث في قائمة المعتمدين
                if (!contractor) {
                    this.ensureApprovedSetup();
                    const approvedEntities = AppState.appData.approvedContractors || [];
                    const approvedEntity = approvedEntities.find(ae => 
                        ae.id === existingContractorId || 
                        ae.contractorId === existingContractorId
                    );
                    
                    if (approvedEntity) {
                        contractor = {
                            id: approvedEntity.contractorId || approvedEntity.id,
                            name: approvedEntity.companyName,
                            company: approvedEntity.companyName,
                            contractorName: approvedEntity.companyName,
                            serviceType: approvedEntity.serviceType,
                            isFromApproved: true
                        };
                    }
                }
            }
        }

        if (!contractor && !existing) {
            Notification.error('المقاول غير موجود');
            return;
        }

        const criteria = this.getEvaluationCriteria();
        if (criteria.length === 0) {
            Notification.error('قائمة بنود التقييم غير متاحة. يرجى التواصل مع مدير النظام.');
            return;
        }

        // ✅ إصلاح: إذا كان existing موجوداً، نحصل على البيانات من الصفوف المنفصلة
        let evaluationData = existing;
        if (existing && existing.id) {
            const fullEvaluation = this.getEvaluationWithItems(existing.id);
            if (fullEvaluation) {
                evaluationData = fullEvaluation;
            }
        }
        
        const existingItems = Array.isArray(evaluationData?.items) ? evaluationData.items : [];
        const existingById = new Map(existingItems.map(item => [(item.criteriaId || item.id || item.title || '').toString(), item]));

        const rowsData = criteria.map((criterion) => {
            const key = existingById.get(criterion.id) || existingById.get(criterion.label) || null;
            return {
                criteriaId: criterion.id,
                title: criterion.label,
                status: key?.status || '',
                notes: key?.notes || ''
            };
        });

        const initialSummary = this.calculateEvaluationSummary(rowsData);

        const defaultDate = evaluationData?.evaluationDate
            ? new Date(evaluationData.evaluationDate).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10);
        const evaluatorName = evaluationData?.evaluatorName || AppState.currentUser?.name || '';
        const generalNotes = evaluationData?.generalNotes || evaluationData?.notes || '';
        const selectedFactoryId = this.resolveEvaluationFactoryId(evaluationData);
        const selectedSubLocationId = this.resolveEvaluationSubLocationId(evaluationData, selectedFactoryId);
        const siteOptions = this.getSiteOptions();
        const placeOptions = selectedFactoryId ? this.getPlaceOptions(selectedFactoryId) : [];
        // ✅ إصلاح: استخدام contractorNameOverride إذا كان متوفراً، وإلا استخدام القيم الافتراضية مع أولوية evaluationData.contractorName
        const contractorName = contractorNameOverride || evaluationData?.contractorName || contractor?.name || contractor?.company || contractor?.contractorName || '';

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 95vw; width: 1400px; max-height: 95vh;">
                <div class="modal-header" style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); border-bottom: none; padding: 1.75rem 2rem;">
                    <h2 class="modal-title" style="color: #ffffff; font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-clipboard-check" style="font-size: 1.5rem;"></i>
                        ${existing ? 'تحديث تقييم المقاول' : 'تقييم المقاول وتأهيله'}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: #ffffff; background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 0.5rem 0.75rem; transition: all 0.3s ease;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 2rem; background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);">
                    <form id="contractor-evaluation-form" class="space-y-6">
                        <div style="background: #ffffff; border-radius: 12px; padding: 1.75rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
                            <h3 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-info-circle" style="color: #2563eb;"></i>
                                المعلومات الأساسية
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">المقاول</label>
                                    <input type="text" class="form-input" value="${Utils.escapeHTML(contractorName)}" readonly style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #475569; font-weight: 500;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">تاريخ التقييم <span style="color: #ef4444;">*</span></label>
                                    <input type="date" id="contractor-evaluation-date" class="form-input" required value="${defaultDate}" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">اسم المقيم <span style="color: #ef4444;">*</span></label>
                                    <input type="text" id="contractor-evaluation-evaluator" class="form-input" required value="${Utils.escapeHTML(evaluatorName)}" placeholder="اسم الشخص الذي قام بالتقييم" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">المصنع</label>
                                    <select id="contractor-evaluation-factory" class="form-input" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                        <option value="">اختر المصنع</option>
                                        ${siteOptions.map(site => `
                                            <option value="${Utils.escapeHTML(String(site.id))}" ${String(site.id) === String(selectedFactoryId) ? 'selected' : ''}>${Utils.escapeHTML(site.name)}</option>
                                        `).join('')}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">الموقع الفرعي</label>
                                    <select id="contractor-evaluation-sub-location" class="form-input" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                        <option value="">اختر الموقع الفرعي</option>
                                        ${placeOptions.map(place => `
                                            <option value="${Utils.escapeHTML(String(place.id))}" ${String(place.id) === String(selectedSubLocationId) ? 'selected' : ''}>${Utils.escapeHTML(place.name)}</option>
                                        `).join('')}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">ملاحظات عامة</label>
                                    <textarea id="contractor-evaluation-general-notes" class="form-input" rows="2" placeholder="ملاحظات عامة حول التقييم" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">${Utils.escapeHTML(generalNotes)}</textarea>
                                </div>
                            </div>
                        </div>

                        <div style="background: #ffffff; border-radius: 12px; padding: 1.75rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
                            <h3 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-list-check" style="color: #2563eb;"></i>
                                بنود التقييم
                            </h3>
                            <div class="table-wrapper" style="overflow-x: auto; border-radius: 8px; border: 1px solid #e2e8f0;">
                                <table class="data-table" style="width: 100%; border-collapse: separate; border-spacing: 0;">
                                    <thead>
                                        <tr style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);">
                                            <th style="width: 60px; padding: 1rem; text-align: center; color: #ffffff; font-weight: 700; border: none; border-right: 1px solid rgba(255, 255, 255, 0.2);">#</th>
                                            <th style="padding: 1rem; text-align: right; color: #ffffff; font-weight: 700; border: none; border-right: 1px solid rgba(255, 255, 255, 0.2);">بند التقييم</th>
                                            <th style="width: 140px; padding: 1rem; text-align: center; color: #ffffff; font-weight: 700; border: none; border-right: 1px solid rgba(255, 255, 255, 0.2);">مطابق</th>
                                            <th style="width: 140px; padding: 1rem; text-align: center; color: #ffffff; font-weight: 700; border: none; border-right: 1px solid rgba(255, 255, 255, 0.2);">غير مطابق</th>
                                            <th style="padding: 1rem; text-align: right; color: #ffffff; font-weight: 700; border: none;">ملاحظات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${rowsData.map((row, index) => `
                                            <tr data-criteria-id="${row.criteriaId}" data-criteria-label="${Utils.escapeHTML(row.title).replace(/"/g, '&quot;')}" style="border-bottom: 1px solid #e2e8f0; transition: background-color 0.2s ease;" onmouseover="this.style.backgroundColor='#f8fafc'" onmouseout="this.style.backgroundColor='#ffffff'">
                                                <td style="padding: 1rem; text-align: center; font-weight: 600; color: #64748b; background: #f8fafc; border-right: 1px solid #e2e8f0;">${index + 1}</td>
                                                <td style="padding: 1rem; text-align: right; color: #1e293b; font-weight: 500; border-right: 1px solid #e2e8f0;">${Utils.escapeHTML(row.title)}</td>
                                                <td style="padding: 1rem; text-align: center; border-right: 1px solid #e2e8f0;">
                                                    <label class="inline-flex items-center justify-center gap-2" style="cursor: pointer; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.3s ease; ${row.status === 'compliant' ? 'background: #dcfce7; border: 2px solid #10b981;' : 'background: #f1f5f9; border: 2px solid #cbd5e1;'}">
                                                        <input type="radio" name="criteria-${index}" value="compliant" ${row.status === 'compliant' ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer; accent-color: #10b981;">
                                                        <span style="color: ${row.status === 'compliant' ? '#059669' : '#64748b'}; font-weight: 600;">مطابق</span>
                                                    </label>
                                                </td>
                                                <td style="padding: 1rem; text-align: center; border-right: 1px solid #e2e8f0;">
                                                    <label class="inline-flex items-center justify-center gap-2" style="cursor: pointer; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.3s ease; ${row.status === 'non_compliant' ? 'background: #fee2e2; border: 2px solid #ef4444;' : 'background: #f1f5f9; border: 2px solid #cbd5e1;'}">
                                                        <input type="radio" name="criteria-${index}" value="non_compliant" ${row.status === 'non_compliant' ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer; accent-color: #ef4444;">
                                                        <span style="color: ${row.status === 'non_compliant' ? '#dc2626' : '#64748b'}; font-weight: 600;">غير مطابق</span>
                                                    </label>
                                                </td>
                                                <td style="padding: 1rem;">
                                                    <textarea class="form-input" rows="2" placeholder="أدخل ملاحظاتك (إن وجدت)" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.75rem; width: 100%; resize: vertical; transition: all 0.3s ease;">${Utils.escapeHTML(row.notes || '')}</textarea>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 1.75rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); border: 2px solid #0ea5e9;">
                            <h3 style="font-size: 1.125rem; font-weight: 700; color: #0c4a6e; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-chart-line" style="color: #0ea5e9;"></i>
                                ملخص التقييم
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                                <div style="background: #ffffff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); border: 1px solid #bae6fd;">
                                    <label class="block text-sm font-semibold mb-2" style="color: #0369a1; font-weight: 600; margin-bottom: 0.75rem;">عدد البنود المطابقة</label>
                                    <input type="text" id="contractor-evaluation-compliant" class="form-input" readonly value="${initialSummary.compliantCount ?? 0}" style="background: #dcfce7; border: 2px solid #10b981; color: #059669; font-weight: 700; font-size: 1.25rem; text-align: center; padding: 0.75rem;">
                                </div>
                                <div style="background: #ffffff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); border: 1px solid #bae6fd;">
                                    <label class="block text-sm font-semibold mb-2" style="color: #0369a1; font-weight: 600; margin-bottom: 0.75rem;">إجمالي بنود التقييم</label>
                                    <input type="text" id="contractor-evaluation-total" class="form-input" readonly value="${initialSummary.totalItems ?? 0}" style="background: #f1f5f9; border: 2px solid #64748b; color: #475569; font-weight: 700; font-size: 1.25rem; text-align: center; padding: 0.75rem;">
                                </div>
                                <div style="background: #ffffff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); border: 1px solid #bae6fd;">
                                    <label class="block text-sm font-semibold mb-2" style="color: #0369a1; font-weight: 600; margin-bottom: 0.75rem;">نسبة التقييم</label>
                                    <input type="text" id="contractor-evaluation-final-score" class="form-input" readonly value="${initialSummary.finalScore !== null ? initialSummary.finalScore.toFixed(0) + '%' : ''}" style="background: #fef3c7; border: 2px solid #f59e0b; color: #d97706; font-weight: 700; font-size: 1.25rem; text-align: center; padding: 0.75rem;">
                                </div>
                                <div style="background: #ffffff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); border: 1px solid #bae6fd;">
                                    <label class="block text-sm font-semibold mb-2" style="color: #0369a1; font-weight: 600; margin-bottom: 0.75rem;">التقييم النهائي</label>
                                    <input type="text" id="contractor-evaluation-final-rating" class="form-input" readonly value="${initialSummary.finalRating || ''}" style="background: #ddd6fe; border: 2px solid #8b5cf6; color: #7c3aed; font-weight: 700; font-size: 1.25rem; text-align: center; padding: 0.75rem;">
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer" style="background: #f8fafc; border-top: 2px solid #e2e8f0; padding: 1.5rem 2rem; margin: 0 -2rem -2rem -2rem; border-radius: 0 0 12px 12px;">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">إلغاء</button>
                            <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: #ffffff; border: none; padding: 0.75rem 2rem; border-radius: 8px; font-weight: 700; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3); transition: all 0.3s ease;">
                                <i class="fas fa-save ml-2"></i>
                                ${existing ? 'تحديث التقييم' : 'حفظ التقييم'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.applyModuleI18n(modal);

        this.bindEvaluationLocationSelects(modal);

        let isClosingEvaluationModal = false;
        const closeEvaluationModal = () => {
            if (isClosingEvaluationModal) return;
            isClosingEvaluationModal = true;
            if (modal && document.contains(modal)) {
                try {
                    modal.remove();
                } catch (removeError) {
                    Utils.safeWarn('⚠️ خطأ في إزالة نموذج التقييم:', removeError);
                    const modalParent = modal.parentNode;
                    if (modalParent) {
                        try { modalParent.removeChild(modal); } catch (_e) {}
                    }
                }
            }
        };

        const finalizeEvaluationSave = (afterClose) => {
            closeEvaluationModal();
            if (typeof afterClose === 'function') {
                setTimeout(afterClose, 0);
            }
        };

        const form = modal.querySelector('#contractor-evaluation-form');
        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            try {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn?.disabled) return;

                const evaluationDate = form.querySelector('#contractor-evaluation-date')?.value;
                const evaluator = form.querySelector('#contractor-evaluation-evaluator')?.value.trim();

                if (!evaluationDate || !evaluator) {
                    Notification.warning('يرجى استكمال البيانات الأساسية للتقييم (التاريخ واسم المقيم)');
                    return;
                }

                const items = this.collectEvaluationItems(form);
                const summary = this.calculateEvaluationSummary(items);
                const locationData = this.collectEvaluationLocationFromForm(form);

                const record = {
                    id: evaluationData?.id || Utils.generateId('CTREVAL'),
                    contractorId: contractor?.id || evaluationData?.contractorId || contractorId,
                    contractorName,
                    evaluationDate: new Date(evaluationDate).toISOString(),
                    evaluatorName: evaluator,
                    factoryId: locationData.factoryId,
                    locationId: locationData.locationId,
                    projectName: locationData.projectName,
                    subLocationId: locationData.subLocationId,
                    location: locationData.location,
                    generalNotes: form.querySelector('#contractor-evaluation-general-notes')?.value.trim() || '',
                    items,
                    compliantCount: summary.compliantCount ?? 0,
                    totalItems: summary.totalItems ?? 0,
                    finalScore: summary.finalScore,
                    finalRating: summary.finalRating || '',
                    isoCode: evaluationData?.isoCode || (typeof generateISOCode === 'function' ? generateISOCode('CTREV', AppState.appData.contractorEvaluations) : ''),
                    createdAt: evaluationData?.createdAt || new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    createdBy: evaluationData?.createdBy || AppState.currentUser?.id || '',
                    updatedBy: AppState.currentUser?.id || ''
                };

                if (!record.contractorId) {
                    Notification.error('تعذر ربط التقييم بالمقاول.');
                    return;
                }

                if (submitBtn) submitBtn.disabled = true;

                const isAdmin = this.isContractorApprovalAdminUser();

                if (evaluationData) {
                    if (!isAdmin) {
                        if (submitBtn) submitBtn.disabled = false;
                        Notification.error('ليس لديك صلاحية لتعديل التقييمات. يرجى التواصل مع مدير النظام.');
                        return;
                    }
                    finalizeEvaluationSave(() => {
                        Notification.success('تم تحديث تقييم المقاول بنجاح');
                        this.persistEvaluation(record, evaluationData);
                    });
                } else {
                    const approvalRequest = {
                        requestType: 'evaluation',
                        contractorId: record.contractorId,
                        contractorName: record.contractorName,
                        companyName: record.contractorName,
                        evaluationData: record,
                        status: 'pending',
                        createdAt: new Date().toISOString(),
                        createdBy: AppState.currentUser?.id || '',
                        createdByName: AppState.currentUser?.name || ''
                    };

                    this.ensureEvaluationApprovalRequestsSetup();

                    const tempId = 'TEMP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                    approvalRequest.id = tempId;
                    approvalRequest._isPendingSync = true;
                    AppState.appData.contractorEvaluationApprovalRequests.push(approvalRequest);

                    finalizeEvaluationSave(() => {
                        Notification.success('تم إرسال طلب اعتماد التقييم بنجاح. جاري المزامنة مع الخادم...');

                        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                            window.DataManager.save();
                        } else {
                            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
                        }

                        this.refreshEvaluationApprovalRequestsSection();
                        this.refreshApprovalRequestsSection();
                        if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) {
                            AppUI.updateNotificationsBadge();
                        }

                        this.syncEvaluationApprovalRequestToBackend(approvalRequest, tempId).then(() => {
                            this.refreshEvaluationApprovalRequestsSection();
                            this.refreshApprovalRequestsSection();
                            if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) {
                                AppUI.updateNotificationsBadge();
                            }
                        }).catch((error) => {
                            Utils.safeError('❌ خطأ في مزامنة طلب اعتماد التقييم:', error);
                            Notification.warning('تم حفظ التقييم محلياً. سيتم المزامنة تلقائياً لاحقاً.');
                        });
                    });
                }
            } catch (error) {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) submitBtn.disabled = false;
                Utils.safeError('خطأ في حفظ تقييم المقاولين:', error);
                Notification.error('تعذر حفظ تقييم المقاول: ' + error.message);
            }
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) modal.remove();
        });

        this.bindEvaluationFormInteractions(modal);
    },

    persistEvaluation(record, existing = null, options = {}) {
        const skipAutoSave = options.skipAutoSave === true;
        if (!Array.isArray(AppState.appData.contractorEvaluations)) {
            AppState.appData.contractorEvaluations = [];
        }

        // ✅ إصلاح: حفظ كل بند كسجل منفصل في الجدول
        const evaluationId = record.id;
        const evaluationBaseData = {
            id: evaluationId,
            contractorId: record.contractorId,
            contractorName: record.contractorName,
            evaluationDate: record.evaluationDate,
            evaluatorName: record.evaluatorName,
            projectName: record.projectName || '',
            location: record.location || '',
            factoryId: record.factoryId || record.locationId || '',
            locationId: record.locationId || record.factoryId || '',
            subLocationId: record.subLocationId || '',
            generalNotes: record.generalNotes || '',
            compliantCount: record.compliantCount ?? 0,
            totalItems: record.totalItems ?? 0,
            finalScore: record.finalScore,
            finalRating: record.finalRating || '',
            isoCode: record.isoCode || '',
            createdAt: record.createdAt || new Date().toISOString(),
            updatedAt: record.updatedAt || new Date().toISOString(),
            createdBy: record.createdBy || AppState.currentUser?.id || '',
            updatedBy: record.updatedBy || AppState.currentUser?.id || ''
        };

        // ✅ حذف البنود القديمة للتقييم إذا كان تعديل أو استبدال
        if (existing || options.replaceExisting) {
            AppState.appData.contractorEvaluations = AppState.appData.contractorEvaluations.filter(
                item => item.id !== evaluationId && item.evaluationId !== evaluationId
            );
        }

        // ✅ حفظ كل بند كسجل منفصل
        const items = Array.isArray(record.items) ? record.items : [];
        const now = new Date().toISOString();
        const userId = AppState.currentUser?.id || '';

        items.forEach((item, index) => {
            const evaluationRecord = {
                ...evaluationBaseData,
                // ✅ إضافة معلومات البند
                criteriaId: item.criteriaId || '',
                title: item.title || item.label || '',
                status: item.status || '',
                notes: item.notes || '',
                itemIndex: index + 1,
                // ✅ الحقول المطلوبة لكل بند
                createdAt: existing ? (item.createdAt || evaluationBaseData.createdAt) : now,
                updatedAt: now,
                createdBy: existing ? (item.createdBy || evaluationBaseData.createdBy) : userId,
                updatedBy: userId,
                // ✅ معرف فريد لكل صف
                rowId: existing && item.rowId ? item.rowId : Utils.generateId('CEVROW')
            };
            AppState.appData.contractorEvaluations.push(evaluationRecord);
        });

        // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
        try {
            if (!skipAutoSave) {
                GoogleIntegration.autoSave?.('ContractorEvaluations', AppState.appData.contractorEvaluations);
            }
        } catch (error) {
            Utils.safeWarn('فشل الحفظ التلقائي لتقييمات المقاولين:', error);
        }

        this.refreshEvaluationsList(this.currentEvaluationFilter || '');
        this.updateContractorEvaluationSummary(record.contractorId);
    },

    refreshEvaluationsList(contractorId = '') {
        const container = document.getElementById('contractor-evaluations-container');
        if (!container) return;
        const evaluationsHTML = this.renderEvaluationsTable(contractorId);
        this.safeSetInnerHTML(container, evaluationsHTML);
    },

    openEvaluationHistory(contractorId) {
        if (!contractorId) return;
        this.currentEvaluationFilter = contractorId;

        const filterSelect = document.getElementById('contractor-evaluation-filter');
        if (filterSelect) {
            filterSelect.value = contractorId;
        }

        this.refreshEvaluationsList(contractorId);

        // ✅ إصلاح: منع scrollIntoView من التسبب في scroll jumps
        const evaluationCard = document.getElementById('contractor-evaluation-card');
        if (evaluationCard) {
            // ✅ استخدام requestAnimationFrame لتأخير scroll حتى لا يسبب اهتزاز
            requestAnimationFrame(() => {
                // ✅ حفظ موضع التمرير الحالي
                const currentScrollY = window.scrollY;
                evaluationCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // ✅ التأكد من عدم حدوث scroll jump كبير
                requestAnimationFrame(() => {
                    const newScrollY = window.scrollY;
                    const scrollDiff = Math.abs(newScrollY - currentScrollY);
                    // إذا كان الفرق كبير جداً، إلغاء scroll
                    if (scrollDiff > window.innerHeight) {
                        window.scrollTo({ top: currentScrollY, behavior: 'auto' });
                    }
                });
            });
        }
    },

    /**
     * إضافة تقييم لجهة معتمدة (من قائمة المعتمدين)
     */
    showEvaluationFormForApproved(approvedEntityId) {
        if (!approvedEntityId) {
            Notification.error('معرف الجهة المعتمدة غير محدد');
            return;
        }

        this.ensureApprovedSetup();
        const approvedEntities = AppState.appData.approvedContractors || [];
        const approvedEntity = approvedEntities.find(ae => ae.id === approvedEntityId);

        if (!approvedEntity) {
            Notification.error('الجهة المعتمدة غير موجودة');
            return;
        }

        // البحث عن المقاول المرتبط بالجهة المعتمدة
        let contractorId = approvedEntity.contractorId;
        let contractorName = approvedEntity.companyName || '';

        // إذا لم يكن هناك معرف مقاول مباشر، نبحث بالاسم
        if (!contractorId) {
            const contractors = AppState.appData.contractors || [];
            const contractor = contractors.find(c =>
                c.name === approvedEntity.companyName ||
                (c.approvedEntityId === approvedEntityId) ||
                (c.company === approvedEntity.companyName)
            );

            if (contractor) {
                contractorId = contractor.id;
                contractorName = contractor.name || contractor.company || contractorName;
            } else {
                // إذا لم نجد مقاول، نستخدم معرف المعتمد مباشرة
                // ✅ إصلاح: نستخدم معرف المعتمد كـ contractorId ونتأكد من تمرير اسم المقاول
                contractorId = approvedEntityId;
                // contractorName محدد بالفعل من approvedEntity.companyName
            }
        } else {
            // إذا كان هناك معرف مقاول، نبحث عن اسمه
            const contractors = AppState.appData.contractors || [];
            const contractor = contractors.find(c => c.id === contractorId);
            if (contractor) {
                contractorName = contractor.name || contractor.company || contractorName;
            }
        }

        // ✅ إصلاح: فتح نموذج التقييم مع تمرير اسم المقاول لضمان ظهوره في النموذج
        // إذا كان المقاول غير موجود في قائمة المقاولين، نستخدم معرف المعتمد
        this.showEvaluationForm(contractorId, null, contractorName);
    },

    /**
     * فتح سجل التقييمات لجهة معتمدة (من قائمة المعتمدين)
     */
    openEvaluationHistoryForApproved(approvedEntityId) {
        if (!approvedEntityId) {
            Notification.error('معرف الجهة المعتمدة غير محدد');
            return;
        }

        this.ensureApprovedSetup();
        const approvedEntities = AppState.appData.approvedContractors || [];
        const approvedEntity = approvedEntities.find(ae => ae.id === approvedEntityId);

        if (!approvedEntity) {
            Notification.error('الجهة المعتمدة غير موجودة');
            return;
        }

        // البحث عن المقاول المرتبط بالجهة المعتمدة
        let contractorId = approvedEntity.contractorId;

        // إذا لم يكن هناك معرف مقاول مباشر، نبحث بالاسم
        if (!contractorId) {
            const contractors = AppState.appData.contractors || [];
            const contractor = contractors.find(c =>
                c.name === approvedEntity.companyName ||
                (c.approvedEntityId === approvedEntityId)
            );

            if (contractor) {
                contractorId = contractor.id;
            } else {
                Notification.warning('لم يتم العثور على المقاول المرتبط. سيتم البحث بالتقييمات المرتبطة بالاسم.');
                // البحث بالتقييمات باستخدام اسم الشركة
                const evaluations = AppState.appData.contractorEvaluations || [];
                const relatedEvaluation = evaluations.find(e =>
                    e.contractorName === approvedEntity.companyName
                );

                if (relatedEvaluation && relatedEvaluation.contractorId) {
                    contractorId = relatedEvaluation.contractorId;
                } else {
                    Notification.error('لم يتم العثور على تقييمات مرتبطة بهذه الجهة');
                    return;
                }
            }
        }

        // فتح سجل التقييمات
        this.openEvaluationHistory(contractorId);

        // التبديل إلى تبويب التقييمات إذا لم يكن مفتوحاً
        if (this.currentTab !== 'evaluations') {
            this.switchTab('evaluations');
        }
    },

    renderEvaluationDetails(evaluation) {
        if (!evaluation) return '';
        const statusLabel = (status) => status === 'compliant' ? 'مطابق' : status === 'non_compliant' ? 'غير مطابق' : '-';

        // ✅ إصلاح: التأكد من أن items هي مصفوفة ومعالجة البيانات بشكل صحيح
        let items = [];
        if (Array.isArray(evaluation.items)) {
            items = evaluation.items;
        } else if (evaluation.items && typeof evaluation.items === 'object') {
            // إذا كان كائن، نحوله إلى مصفوفة
            items = Object.values(evaluation.items);
        }
        
        // ✅ تصفية البنود الفارغة وإظهار فقط البنود التي لها عنوان أو حالة
        // نعرض البند إذا كان له عنوان أو إذا كان له حالة (حتى لو العنوان فارغ)
        items = items.filter(item => {
            if (!item || typeof item !== 'object') return false;
            // نعرض البند إذا كان له عنوان أو حالة
            const hasTitle = item.title || item.label || item.criteriaId;
            const hasStatus = item.status && (item.status === 'compliant' || item.status === 'non_compliant');
            return hasTitle || hasStatus;
        });
        
        const itemsRows = items.length > 0 ? items.map((item, index) => {
            // ✅ محاولة الحصول على العنوان من مصادر متعددة
            let title = item.title || item.label || '';
            // إذا لم يكن هناك عنوان، نحاول الحصول عليه من criteriaId أو من معايير التقييم
            if (!title && item.criteriaId) {
                const criteria = this.getEvaluationCriteria();
                const criterion = criteria.find(c => c.id === item.criteriaId);
                if (criterion) {
                    title = criterion.label || criterion.title || '';
                }
            }
            // إذا لم يكن هناك عنوان بعد، نستخدم criteriaId كبديل
            if (!title) {
                title = item.criteriaId || `بند ${index + 1}`;
            }
            
            const status = item.status || '';
            const notes = item.notes || '';
            return `
            <tr>
                <td>${index + 1}</td>
                <td>${Utils.escapeHTML(title)}</td>
                <td>${statusLabel(status)}</td>
                <td>${Utils.escapeHTML(notes)}</td>
            </tr>
        `;
        }).join('') : '<tr><td colspan="4" class="text-center text-gray-500 py-4">لا توجد بنود مسجلة</td></tr>';

        return `
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-semibold text-gray-600">المقاول</label>
                        <p class="text-gray-800">${Utils.escapeHTML(evaluation.contractorName || '')}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">تاريخ التقييم</label>
                        <p class="text-gray-800">${evaluation.evaluationDate ? Utils.formatDate(evaluation.evaluationDate) : '-'}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">اسم المقيم</label>
                        <p class="text-gray-800">${Utils.escapeHTML(evaluation.evaluatorName || '')}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">المصنع</label>
                        <p class="text-gray-800">${Utils.escapeHTML(evaluation.projectName || '—')}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">الموقع الفرعي</label>
                        <p class="text-gray-800">${Utils.escapeHTML(evaluation.location || '—')}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">عدد البنود المطابقة</label>
                        <p class="text-gray-800">${evaluation.compliantCount ?? 0}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">إجمالي البنود</label>
                        <p class="text-gray-800">${evaluation.totalItems ?? (Array.isArray(evaluation.items) ? evaluation.items.length : (evaluation.items ? Object.keys(evaluation.items).length : 0))}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">نسبة التقييم</label>
                        <p class="text-gray-800">${typeof evaluation.finalScore === 'number' ? evaluation.finalScore.toFixed(0) + '%' : '-'}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">التقييم النهائي</label>
                        <p class="text-gray-800">${Utils.escapeHTML(evaluation.finalRating || '')}</p>
                    </div>
                </div>

                ${evaluation.generalNotes ? `
                    <div class="bg-gray-50 border border-gray-200 rounded p-3">
                        <label class="text-sm font-semibold text-gray-600 block mb-1">ملاحظات عامة</label>
                        <p class="text-gray-700 whitespace-pre-line">${Utils.escapeHTML(evaluation.generalNotes)}</p>
                    </div>
                ` : ''}

                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th style="width: 50px;">#</th>
                                <th>بند التقييم</th>
                                <th style="width: 140px;">الحالة</th>
                                <th>ملاحظات</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsRows || `<tr><td colspan="4" class="text-center text-gray-500 py-4">لا توجد بنود مسجلة</td></tr>`}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    /**
     * ✅ تجميع بنود التقييم من الصفوف المنفصلة
     */
    getEvaluationWithItems(evaluationId) {
        const allRecords = AppState.appData.contractorEvaluations || [];
        const evaluationRecords = allRecords.filter(r => (r.id === evaluationId || r.evaluationId === evaluationId));
        
        if (evaluationRecords.length === 0) return null;
        
        // استخدام أول سجل كأساس
        const firstRecord = evaluationRecords[0];
        
        // ✅ إصلاح: تحويل finalScore إلى رقم إذا كان نصاً
        let finalScore = firstRecord.finalScore;
        if (typeof finalScore === 'string' && finalScore !== '') {
            finalScore = parseFloat(finalScore);
            if (isNaN(finalScore)) finalScore = null;
        } else if (typeof finalScore !== 'number') {
            finalScore = null;
        }
        
        // ✅ إصلاح: تحويل compliantCount و totalItems إلى أرقام
        let compliantCount = firstRecord.compliantCount;
        if (typeof compliantCount === 'string') compliantCount = parseInt(compliantCount) || 0;
        let totalItems = firstRecord.totalItems;
        if (typeof totalItems === 'string') totalItems = parseInt(totalItems) || 0;
        
        // ✅ إصلاح: إذا لم يوجد finalScore ولكن يوجد compliantCount و totalItems، احسب النسبة
        if (finalScore === null && compliantCount > 0 && totalItems > 0) {
            finalScore = Math.round((compliantCount / totalItems) * 100);
        }
        
        const evaluation = {
            id: firstRecord.id || firstRecord.evaluationId,
            contractorId: firstRecord.contractorId,
            contractorName: firstRecord.contractorName,
            evaluationDate: firstRecord.evaluationDate,
            evaluatorName: firstRecord.evaluatorName,
            projectName: firstRecord.projectName,
            location: firstRecord.location,
            generalNotes: firstRecord.generalNotes,
            compliantCount: compliantCount ?? 0,
            totalItems: totalItems ?? 0,
            finalScore: finalScore,
            finalRating: firstRecord.finalRating || '',
            isoCode: firstRecord.isoCode,
            createdAt: firstRecord.createdAt,
            updatedAt: firstRecord.updatedAt,
            createdBy: firstRecord.createdBy,
            updatedBy: firstRecord.updatedBy,
            items: []
        };
        
        // تجميع البنود
        evaluationRecords.forEach(record => {
            if (record.criteriaId || record.title) {
                evaluation.items.push({
                    criteriaId: record.criteriaId,
                    title: record.title,
                    status: record.status,
                    notes: record.notes
                });
            }
        });
        
        return evaluation;
    },

    viewEvaluation(evaluationId) {
        const evaluation = this.getEvaluationWithItems(evaluationId);
        if (!evaluation) {
            Notification.error('السجل المطلوب غير موجود');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-clipboard-check ml-2"></i>تفاصيل تقييم المقاول</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.renderEvaluationDetails(evaluation)}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                    <button class="btn-success" onclick="Contractors.exportEvaluationPDF('${evaluation.id}')">
                        <i class="fas fa-file-pdf ml-2"></i>تصدير PDF
                    </button>
                    ${Permissions.isAdmin() ? `
                    <button class="btn-primary" onclick="Contractors.showEvaluationForm('${evaluation.contractorId}', ${JSON.stringify(evaluation).replace(/"/g, '&quot;')}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>تعديل
                    </button>
                    ` : ''}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.applyModuleI18n(modal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) modal.remove();
        });
    },

    exportEvaluationPDF(evaluationId) {
        const evaluation = this.getEvaluationWithItems(evaluationId);
        if (!evaluation) {
            Notification.error('السجل المطلوب غير موجود');
            return;
        }

        try {
            Loading.show();

            const statusLabel = (status) => status === 'compliant' ? 'مطابق' : status === 'non_compliant' ? 'غير مطابق' : '-';

            const summaryTable = `
                <table>
                    <tr><th>المقاول</th><td>${Utils.escapeHTML(evaluation.contractorName || '')}</td></tr>
                    <tr><th>تاريخ التقييم</th><td>${evaluation.evaluationDate ? Utils.formatDate(evaluation.evaluationDate) : '-'}</td></tr>
                    <tr><th>اسم المقيم</th><td>${Utils.escapeHTML(evaluation.evaluatorName || '')}</td></tr>
                    <tr><th>المصنع</th><td>${Utils.escapeHTML(evaluation.projectName || '-')}</td></tr>
                    <tr><th>الموقع الفرعي</th><td>${Utils.escapeHTML(evaluation.location || '-')}</td></tr>
                    <tr><th>عدد البنود المطابقة</th><td>${evaluation.compliantCount ?? 0}</td></tr>
                    <tr><th>إجمالي البنود الفعلية</th><td>${evaluation.totalItems ?? (Array.isArray(evaluation.items) ? evaluation.items.length : (evaluation.items ? Object.keys(evaluation.items).length : 0))}</td></tr>
                    <tr><th>نسبة التقييم</th><td>${typeof evaluation.finalScore === 'number' ? evaluation.finalScore.toFixed(0) + '%' : '-'}</td></tr>
                    <tr><th>التقييم النهائي</th><td>${Utils.escapeHTML(evaluation.finalRating || '')}</td></tr>
                </table>
            `;

            // ✅ إصلاح: التأكد من أن items هي مصفوفة ومعالجة البيانات بشكل صحيح
            let items = [];
            if (Array.isArray(evaluation.items)) {
                items = evaluation.items;
            } else if (evaluation.items && typeof evaluation.items === 'object') {
                // إذا كان كائن، نحوله إلى مصفوفة
                items = Object.values(evaluation.items);
            }
            
            // ✅ تصفية البنود الفارغة وإظهار فقط البنود التي لها عنوان أو حالة
            items = items.filter(item => {
                if (!item || typeof item !== 'object') return false;
                // نعرض البند إذا كان له عنوان أو حالة
                const hasTitle = item.title || item.label || item.criteriaId;
                const hasStatus = item.status && (item.status === 'compliant' || item.status === 'non_compliant');
                return hasTitle || hasStatus;
            });
            
            const itemsTable = items.length > 0 ? `
                <div class="section-title">تفاصيل بنود التقييم</div>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 50px;">#</th>
                            <th>البند</th>
                            <th style="width: 140px;">الحالة</th>
                            <th>الملاحظات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map((item, index) => {
                            // ✅ محاولة الحصول على العنوان من مصادر متعددة
                            let title = item.title || item.label || '';
                            // إذا لم يكن هناك عنوان، نحاول الحصول عليه من criteriaId أو من معايير التقييم
                            if (!title && item.criteriaId) {
                                const criteria = this.getEvaluationCriteria();
                                const criterion = criteria.find(c => c.id === item.criteriaId);
                                if (criterion) {
                                    title = criterion.label || criterion.title || '';
                                }
                            }
                            // إذا لم يكن هناك عنوان بعد، نستخدم criteriaId كبديل
                            if (!title) {
                                title = item.criteriaId || `بند ${index + 1}`;
                            }
                            
                            const status = item.status || '';
                            const notes = item.notes || '';
                            return `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${Utils.escapeHTML(title)}</td>
                                <td>${statusLabel(status)}</td>
                                <td>${Utils.escapeHTML(notes)}</td>
                            </tr>
                        `;
                        }).join('')}
                    </tbody>
                </table>
            ` : '<div class="section-title">تفاصيل بنود التقييم</div><p class="text-gray-500 text-center py-4">لا توجد بنود مسجلة</p>';

            const notesSection = evaluation.generalNotes
                ? `
                    <div class="section-title">ملاحظات عامة</div>
                    <p>${Utils.escapeHTML(evaluation.generalNotes)}</p>
                `
                : '';

            const content = `
                <div class="section-title">معلومات التقييم</div>
                ${summaryTable}
                ${notesSection}
                ${itemsTable}
            `;

            const formCode = evaluation.isoCode || `CTREVAL-${evaluation.id?.substring(0, 6) || ''}`;

            const htmlContent = typeof FormHeader !== 'undefined' && typeof FormHeader.generatePDFHTML === 'function'
                ? FormHeader.generatePDFHTML(
                    formCode,
                    'نموذج تقييم وتأهيل المقاولين',
                    content,
                    false,
                    true,
                    { version: '1.0', qrData: `contractor-evaluation:${evaluation.id}` },
                    evaluation.createdAt,
                    evaluation.updatedAt
                )
                : content;

            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const printWindow = window.open(url, '_blank');

            if (printWindow) {
                printWindow.onload = () => {
                    setTimeout(() => {
                        printWindow.print();
                        // Clean up blob URL after print
                        setTimeout(() => {
                            URL.revokeObjectURL(url);
                        }, 1000);
                        Loading.hide();
                    }, 500);
                };
            } else {
                URL.revokeObjectURL(url);
                Loading.hide();
                Notification.error('يرجى السماح بالنوافذ المنبثقة للطباعة');
            }
        } catch (error) {
            Loading.hide();
            // Ensure cleanup on error
            if (typeof url !== 'undefined') {
                URL.revokeObjectURL(url);
            }
            Utils.safeError('خطأ في تصدير تقييم المقاولين:', error);
            Notification.error('فشل في تصدير تقرير التقييم: ' + error.message);
        }
    },

    async requestDeleteEvaluation(evaluationId) {
        if (!evaluationId) return;

        // التحقق من الصلاحيات - فقط المدير يمكنه حذف مباشرة
        if (Permissions.isAdmin()) {
            if (!confirm('هل أنت متأكد من حذف هذا التقييم؟ لا يمكن التراجع عن هذه العملية.')) {
                return;
            }
            // المدير يمكنه الحذف مباشرة
            return this.deleteEvaluation(evaluationId);
        }

        // المستخدمون العاديون لا يمكنهم حذف التقييمات - فقط المدير
        Notification.error('ليس لديك صلاحية لحذف التقييمات. يرجى التواصل مع مدير النظام.');
    },

    deleteEvaluation(evaluationId) {
        if (!evaluationId) return;

        // التحقق من الصلاحيات - فقط المدير يمكنه حذف التقييمات
        if (!Permissions.isAdmin()) {
            Notification.error('ليس لديك صلاحية لحذف التقييمات. يرجى التواصل مع مدير النظام.');
            return;
        }

        if (!confirm('هل أنت متأكد من حذف هذا التقييم؟ لا يمكن التراجع عن هذه العملية.')) {
            return;
        }

        const collection = AppState.appData.contractorEvaluations || [];
        
        // ✅ إصلاح: البحث عن جميع الصفوف المرتبطة بالتقييم (التقييمات تُخزن كصفوف متعددة)
        const relatedRecords = collection.filter(item => item.id === evaluationId || item.evaluationId === evaluationId);
        if (relatedRecords.length === 0) {
            Notification.error('السجل المطلوب غير موجود');
            return;
        }

        const contractorId = relatedRecords[0]?.contractorId;
        
        // ✅ حذف جميع الصفوف المرتبطة بالتقييم
        for (let i = collection.length - 1; i >= 0; i--) {
            if (collection[i].id === evaluationId || collection[i].evaluationId === evaluationId) {
                collection.splice(i, 1);
            }
        }
        
        // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

        try {
            GoogleIntegration.autoSave?.('ContractorEvaluations', AppState.appData.contractorEvaluations);
        } catch (error) {
            Utils.safeWarn('فشل تحديث تقييمات المقاولين في الحفظ السحابي:', error);
        }

        this.refreshEvaluationsList(this.currentEvaluationFilter || '');
        this.updateContractorEvaluationSummary(contractorId);
        Notification.success('تم حذف التقييم بنجاح');
    },

    getFinalRating(score, totalItems = 0) {
        if (score === null || totalItems === 0) {
            return 'لم يتم التقييم بعد';
        }

        if (score >= 90) return 'ممتاز';
        if (score >= 75) return 'جيد جداً';
        if (score >= 60) return 'بحاجة إلى تحسين';
        return 'غير مؤهل';
    },

    openEvaluationSettings() {
        const currentUser = AppState.currentUser;
        if (!currentUser || currentUser.role !== 'admin') {
            Notification.error('هذه الميزة متاحة لمدير النظام فقط.');
            return;
        }

        this.ensureEvaluationSetup();
        const criteria = this.getEvaluationCriteria();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 640px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-sliders-h ml-2"></i>تعديل بنود تقييم المقاولين</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="contractor-evaluation-settings-form" class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 text-blue-800 rounded p-3 text-sm">
                            <p class="font-semibold mb-1">تعليمات:</p>
                            <ul class="list-disc mr-6 space-y-1">
                                <li>أدخل كل بند تقييم في سطر منفصل.</li>
                                <li>سيتم تطبيق التغييرات على التقييمات الجديدة فقط. التقييمات السابقة ستظل محفوظة كما هي.</li>
                                <li>تأكد من شمول جميع المتطلبات المطلوبة لتقييم المقاولين.</li>
                            </ul>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">بنود التقييم</label>
                            <textarea id="contractor-evaluation-settings-textarea" class="form-input" rows="12" placeholder="أدخل كل بند في سطر جديد">${criteria.map(item => item.label).join('\\n')}</textarea>
                        </div>
                        <div class="flex items-center justify-end gap-3">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>حفظ التعديلات
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.applyModuleI18n(modal);

        const form = modal.querySelector('#contractor-evaluation-settings-form');
        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            const textarea = modal.querySelector('#contractor-evaluation-settings-textarea');
            const value = textarea?.value || '';
            const saved = this.saveEvaluationCriteriaFromInput(value);
            if (saved) {
                Notification.success('تم تحديث بنود التقييم بنجاح');
                modal.remove();
            }
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) modal.remove();
        });
    },

    saveEvaluationCriteriaFromInput(rawInput) {
        const lines = (rawInput || '').split('\n').map(line => line.trim()).filter(Boolean);
        if (lines.length === 0) {
            Notification.error('لا يمكن حفظ قائمة فارغة. يرجى إضافة بند واحد على الأقل.');
            return false;
        }

        AppState.appData.contractorEvaluationCriteria = lines.map((label, index) => ({
            id: `criteria_${index + 1}`,
            label
        }));

        // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
        this.ensureEvaluationSetup();
        this.refreshEvaluationsList(this.currentEvaluationFilter || '');
        return true;
    },

    buildContractorEvaluationSummary(contractorId) {
        const evaluations = (AppState.appData.contractorEvaluations || []).filter(item => item.contractorId === contractorId).sort((a, b) => new Date(b.evaluationDate || b.createdAt || 0) - new Date(a.evaluationDate || a.createdAt || 0));
        if (evaluations.length === 0) {
            return `<div class="text-gray-500 text-sm">لا توجد تقييمات مسجلة لهذا المقاول.</div>`;
        }

        const latest = evaluations[0];
        const latestScore = typeof latest.finalScore === 'number' ? latest.finalScore : null;
        const badgeClass = latestScore === null
            ? 'badge-info'
            : latestScore >= 90
                ? 'badge-success'
                : latestScore >= 75
                    ? 'badge-info'
                    : latestScore >= 60
                        ? 'badge-warning'
                        : 'badge-danger';
        const maxScore = Math.max(...evaluations.map(item => (typeof item.finalScore === 'number' ? item.finalScore : 0)));
        return `
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-sm font-semibold text-gray-700">آخر تقييم</div>
                        <div class="text-sm text-gray-600">${latest.evaluationDate ? Utils.formatDate(latest.evaluationDate) : '-'}</div>
                    </div>
                    <div>
                        <span class="badge ${badgeClass}">
                            ${Utils.escapeHTML(latest.finalRating || '')}
                        </span>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700">
                    <div class="p-2 border rounded bg-gray-50">
                        <div class="font-semibold text-gray-600">عدد التقييمات</div>
                        <div class="text-lg">${evaluations.length}</div>
                    </div>
                    <div class="p-2 border rounded bg-gray-50">
                        <div class="font-semibold text-gray-600">أعلى نسبة</div>
                        <div class="text-lg">${isFinite(maxScore) ? maxScore.toFixed(0) + '%' : '-'}</div>
                    </div>
                    <div class="p-2 border rounded bg-gray-50">
                        <div class="font-semibold text-gray-600">آخر مقيم</div>
                        <div>${Utils.escapeHTML(latest.evaluatorName || '')}</div>
                    </div>
                </div>
                <button class="btn-secondary text-sm" onclick="Contractors.openEvaluationHistory('${contractorId}')">
                    <i class="fas fa-clipboard-list ml-2"></i>
                    عرض جميع التقييمات
                </button>
            </div>
        `;
    },

    updateContractorEvaluationSummary(contractorId) {
        if (!contractorId) return;
        const container = this.safeGetElementById(`contractor-evaluation-summary-${contractorId}`);
        if (!container) return;
        // ✅ استخدام safeSetInnerHTML بدلاً من innerHTML مباشرة
        const summaryHTML = this.buildContractorEvaluationSummary(contractorId);
        this.safeSetInnerHTML(container, summaryHTML);
    },

    async showContractorForm(contractorData = null) {
        const isEdit = !!contractorData;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">${isEdit ? 'تعديل مقاول' : 'إضافة مقاول جديد'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="contractor-form" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">اسم المقاول *</label>
                                <input type="text" id="contractor-name" required class="form-input"
                                    value="${contractorData?.name || ''}" placeholder="اسم المقاول">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">نوع الخدمة *</label>
                                <input type="text" id="contractor-service-type" required class="form-input"
                                    value="${contractorData?.serviceType || ''}" placeholder="نوع الخدمة">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">رقم العقد *</label>
                                <input type="text" id="contractor-contract-number" required class="form-input"
                                    value="${contractorData?.contractNumber || ''}" placeholder="رقم العقد">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ البدء *</label>
                                <input type="date" id="contractor-start-date" required class="form-input"
                                    value="${contractorData?.startDate ? new Date(contractorData.startDate).toISOString().slice(0, 10) : ''}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ الانتهاء *</label>
                                <input type="date" id="contractor-end-date" required class="form-input"
                                    value="${contractorData?.endDate ? new Date(contractorData.endDate).toISOString().slice(0, 10) : ''}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">الحالة *</label>
                                <select id="contractor-status" required class="form-input">
                                    <option value="">اختر الحالة</option>
                                    <option value="نشط" ${contractorData?.status === 'نشط' ? 'selected' : ''}>نشط</option>
                                    <option value="منتهي" ${contractorData?.status === 'منتهي' ? 'selected' : ''}>منتهي</option>
                                    <option value="معلق" ${contractorData?.status === 'معلق' ? 'selected' : ''}>معلق</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">الشخص المسؤول</label>
                                <input type="text" id="contractor-contact-person" class="form-input"
                                    value="${contractorData?.contactPerson || ''}" placeholder="اسم الشخص المسؤول">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">الهات</label>
                                <input type="tel" id="contractor-phone" class="form-input"
                                    value="${contractorData?.phone || ''}" placeholder="رقم الهات">
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
                                <input type="email" id="contractor-email" class="form-input"
                                    value="${contractorData?.email || ''}" placeholder="البريد الإلكتروني">
                            </div>
                        </div>
                        
                        ${isEdit ? `
                        <div class="border-t pt-4 mt-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">
                                <i class="fas fa-clipboard-check ml-2"></i>
                                اشتراطات الاعتماد
                            </h3>
                            <div id="contractor-requirements-section" class="space-y-3">
                                ${this.renderRequirementsSection(contractorData?.id || '')}
                            </div>
                        </div>
                        ` : ''}
                        
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${isEdit ? 'حفظ التعديلات' : 'إضافة المقاول'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.applyModuleI18n(modal);

        const form = modal.querySelector('#contractor-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // منع النقر المتكرر
            const submitBtn = form?.querySelector('button[type="submit"]') ||
                e.target?.querySelector('button[type="submit"]');

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

            const contractorId = contractorData?.id || Utils.generateId('CONTRACTOR');

            // توليد كود تلقائي إذا لم يكن موجوداً
            let contractorCode = contractorData?.code;
            if (!contractorCode) {
                contractorCode = this.generateContractorCode();
            }

            // فحص العناصر قبل الاستخدام
            const nameEl = document.getElementById('contractor-name');
            const serviceTypeEl = document.getElementById('contractor-service-type');
            const contractNumberEl = document.getElementById('contractor-contract-number');
            const startDateEl = document.getElementById('contractor-start-date');
            const endDateEl = document.getElementById('contractor-end-date');
            const statusEl = document.getElementById('contractor-status');
            const contactPersonEl = document.getElementById('contractor-contact-person');
            const phoneEl = document.getElementById('contractor-phone');
            const emailEl = document.getElementById('contractor-email');

            if (!nameEl || !serviceTypeEl || !contractNumberEl || !startDateEl || !endDateEl || !statusEl || !contactPersonEl || !phoneEl || !emailEl) {
                Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                return;
            }

            const formData = {
                id: contractorId,
                code: contractorCode, // كود تلقائي للمقاول
                name: nameEl.value.trim(),
                serviceType: serviceTypeEl.value.trim(),
                contractNumber: contractNumberEl.value.trim(),
                startDate: new Date(startDateEl.value).toISOString(),
                endDate: new Date(endDateEl.value).toISOString(),
                status: statusEl.value,
                contactPerson: contactPersonEl.value.trim(),
                phone: phoneEl.value.trim(),
                email: emailEl.value.trim(),
                createdAt: contractorData?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // الحفاظ على approvalRequirements إذا كانت موجودة
            if (contractorData?.approvalRequirements) {
                formData.approvalRequirements = contractorData.approvalRequirements;
            }

            Loading.show();
            try {
                if (isEdit) {
                    // التعديل مسموح مباشرة
                    const index = AppState.appData.contractors.findIndex(c => c.id === contractorData.id);
                    if (index !== -1) {
                        // الحفاظ على approvalRequirements عند التعديل
                        if (AppState.appData.contractors[index].approvalRequirements) {
                            formData.approvalRequirements = AppState.appData.contractors[index].approvalRequirements;
                        }
                        AppState.appData.contractors[index] = formData;
                    }
                    // حفظ البيانات
                    if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                        window.DataManager.save();
                    } else {
                        Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
                    }
                    // حفظ تلقائي في Google Sheets
                    await GoogleIntegration.autoSave('Contractors', AppState.appData.contractors);

                    // تحديث حالة الاعتماد بعد الحفظ
                    if (formData.approvalRequirements) {
                        this.updateContractorApprovalStatus(contractorId);
                    }

                    Loading.hide();
                    Notification.success('تم تحديث المقاول بنجاح');

                    // استعادة الزر بعد النجاح
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }

                    modal.remove();
                    this.load(true); // ✅ Preserve current tab after saving
                } else {
                    // إضافة مقاول جديد - إرسال طلب اعتماد
                    // ✅ إزالة توليد ID من Frontend - Backend سيتولى توليده بشكل تسلسلي (CAR_1, CAR_2, ...)
                    const approvalRequest = {
                        // id سيتم توليده في Backend باستخدام generateSequentialId('CAR', ...)
                        requestType: 'contractor',
                        companyName: formData.name,
                        serviceType: formData.serviceType,
                        licenseNumber: formData.contractNumber,
                        contactPerson: formData.contactPerson,
                        phone: formData.phone,
                        email: formData.email,
                        notes: `طلب اعتماد مقاول جديد: ${formData.name}`,
                        status: 'pending',
                        contractorData: formData, // حفظ بيانات المقاول مع الطلب
                        createdAt: new Date().toISOString(),
                        createdBy: AppState.currentUser?.id || '',
                        createdByName: AppState.currentUser?.name || ''
                    };

                    this.ensureApprovalRequestsSetup();
                    
                    // ✅ إصلاح: استخدام addContractorApprovalRequest مباشرة بدلاً من autoSave
                    // ✅ هذا يضمن عدم حذف الطلبات الموجودة في Google Sheets
                    try {
                        const backendResult = await GoogleIntegration.sendRequest({
                            action: 'addContractorApprovalRequest',
                            data: approvalRequest
                        });

                        if (backendResult && backendResult.success) {
                            const savedRequest = backendResult.data
                                ? { ...approvalRequest, ...backendResult.data }
                                : approvalRequest;
                            AppState.appData.contractorApprovalRequests.push(savedRequest);
                            
                            // حفظ البيانات محلياً
                            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                                window.DataManager.save();
                            } else {
                                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
                            }
                            
                            Utils.safeLog('✅ تم حفظ طلب اعتماد المقاول في Google Sheets بنجاح');
                        } else {
                            // إذا فشل الحفظ في Backend، نضيف محلياً فقط
                            AppState.appData.contractorApprovalRequests.push(approvalRequest);
                            
                            // حفظ البيانات محلياً
                            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                                window.DataManager.save();
                            } else {
                                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
                            }
                            
                            Utils.safeWarn('⚠️ فشل حفظ طلب اعتماد المقاول في Google Sheets، تم الحفظ محلياً فقط');
                        }
                    } catch (error) {
                        // في حالة الخطأ، نضيف محلياً فقط
                        AppState.appData.contractorApprovalRequests.push(approvalRequest);
                        
                        // حفظ البيانات محلياً
                        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                            window.DataManager.save();
                        } else {
                            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
                        }
                        
                        Utils.safeWarn('⚠️ خطأ في حفظ طلب اعتماد المقاول في Google Sheets:', error);
                    }

                    Loading.hide();
                    Notification.success('تم إرسال طلب اعتماد المقاول بنجاح. سيتم مراجعته من قبل مدير النظام.');

                    // استعادة الزر بعد النجاح
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }

                    modal.remove();
                    this.load(true); // ✅ Preserve current tab after saving
                }
            } catch (error) {
                Loading.hide();
                Notification.error('حدث خطأ: ' + error.message);

                // استعادة الزر في حالة الخطأ
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async viewContractor(id) {
        const contractor = AppState.appData.contractors.find(c => c.id === id);
        if (!contractor) return;

        // التأكد من وجود كود للمقاول، وإضافته إذا لم يكن موجوداً
        if (!contractor.code) {
            contractor.code = this.generateContractorCode();
            // حفظ التغيير
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }
            GoogleIntegration.autoSave?.('Contractors', AppState.appData.contractors).catch(() => { });
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">تفاصيل المقاول</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            ${contractor.code ? `
                            <div>
                                <label class="text-sm font-semibold text-gray-600">كود المقاول:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(contractor.code)}</p>
                            </div>
                            ` : ''}
                            <div>
                                <label class="text-sm font-semibold text-gray-600">اسم المقاول:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(contractor.name || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">نوع الخدمة:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(contractor.serviceType || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">رقم العقد:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(contractor.contractNumber || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">تاريخ البدء:</label>
                                <p class="text-gray-800">${contractor.startDate ? Utils.formatDate(contractor.startDate) : '-'}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">تاريخ الانتهاء:</label>
                                <p class="text-gray-800">${contractor.endDate ? Utils.formatDate(contractor.endDate) : '-'}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الحالة:</label>
                                <span class="badge badge-${contractor.status === 'نشط' ? 'success' : contractor.status === 'منتهي' ? 'danger' : 'warning'}">
                                    ${contractor.status || '-'}
                                </span>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الشخص المسؤول:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(contractor.contactPerson || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الهات:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(contractor.phone || '')}</p>
                            </div>
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">البريد الإلكتروني:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(contractor.email || '')}</p>
                            </div>
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">سجل تقييمات المقاول:</label>
                                <div id="contractor-evaluation-summary-${contractor.id}" class="mt-2">
                                    ${this.buildContractorEvaluationSummary(contractor.id)}
                                </div>
                            </div>
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">حالة اشتراطات الاعتماد:</label>
                                <div id="contractor-requirements-summary-${contractor.id}" class="mt-2">
                                    ${this.renderRequirementsSummary(contractor.id)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                    <button class="btn-success" onclick="Contractors.showEvaluationForm('${contractor.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-clipboard-check ml-2"></i>
                        تقييم المقاول
                    </button>
                    <button class="btn-primary" onclick="Contractors.showContractorForm(${JSON.stringify(contractor).replace(/"/g, '&quot;')}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>تعديل
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.applyModuleI18n(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async editContractor(id) {
        const contractor = AppState.appData.contractors.find(c => c.id === id);
        if (contractor) await this.showContractorForm(contractor);
    },

    async requestDeleteContractor(id) {
        if (!id) return;

        const contractor = AppState.appData.contractors.find(c => c.id === id);
        if (!contractor) {
            Notification.error('المقاول غير موجود');
            return;
        }

        // التحقق من الصلاحيات - فقط المدير يمكنه حذف مباشرة
        if (Permissions.isAdmin()) {
            if (!confirm('هل أنت متأكد من حذف هذا المقاول؟ سيتم حذفه من قائمة المقاولين وقائمة المعتمدين. لا يمكن التراجع عن هذه العملية.')) {
                return;
            }
            // المدير يمكنه الحذف مباشرة
            return this.deleteContractor(id);
        }

        // المستخدمون العاديون يرسلون طلب حذف
        if (!confirm('سيتم إرسال طلب حذف هذا المقاول إلى مدير النظام للموافقة. هل تريد المتابعة؟')) {
            return;
        }

        const currentUser = AppState.currentUser;
        const deletionRequest = {
            id: Utils.generateId('DELRQ'),
            requestType: 'contractor',
            entityId: id,
            entityName: contractor.name || '',
            reason: prompt('يرجى إدخال سبب طلب الحذف:') || 'طلب حذف من المستخدم',
            createdBy: currentUser?.id || '',
            createdByName: currentUser?.name || '',
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        // إرسال طلب الحذف
        await this.submitDeletionRequest(deletionRequest);
        this.refreshApprovalRequestsSection();
    },

    async deleteContractor(id) {
        if (!id) return;
        if (!Permissions.isAdmin()) {
            Notification.error('ليس لديك صلاحية للحذف المباشر');
            return;
        }

        const contractors = AppState.appData.contractors || [];
        const index = contractors.findIndex(c => c.id === id);

        if (index === -1) {
            Notification.error('المقاول غير موجود');
            return;
        }

        if (!confirm('هل أنت متأكد من حذف هذا المقاول؟ سيتم حذفه من قائمة المقاولين وقائمة المعتمدين.')) {
            return;
        }

        // Optimistic Delete
        contractors.splice(index, 1);
        AppState.appData.contractors = contractors;

        // Cascade delete from approved locally
        const approvedContractors = AppState.appData.approvedContractors || [];
        const approvedIndex = approvedContractors.findIndex(ac => ac.contractorId === id || ac.id === id);
        if (approvedIndex !== -1) {
            approvedContractors.splice(approvedIndex, 1);
            AppState.appData.approvedContractors = approvedContractors;
        }

        try {
            Loading.show();
            const result = await GoogleIntegration.sendToAppsScript('deleteContractor', { contractorId: id });

            if (result.success) {
                Notification.success('تم حذف المقاول بنجاح');
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }
                this.load(true); // ✅ Preserve current tab after deletion
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            Loading.hide();
            console.error('فشل حذف المقاول:', error);
            Notification.error('فشل حذف المقاول: ' + error.message);
            this.load(true); // ✅ Reload to rollback - preserve current tab
        } finally {
            Loading.hide();
        }
    },

    // ===== نظام الاشتراطات للمقاولين =====

    /**
     * التأكد من وجود إعدادات الاشتراطات
     */
    ensureRequirementsSetup() {
        if (!AppState.companySettings) {
            AppState.companySettings = {};
        }
        if (!Array.isArray(AppState.companySettings.contractorApprovalRequirements)) {
            AppState.companySettings.contractorApprovalRequirements = CONTRACTOR_APPROVAL_REQUIREMENTS_DEFAULT.map(req => ({ ...req }));
            // حفظ البيانات باستخدام window.DataManager
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            } else {
                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
            }
        }
    },

    /**
     * الحصول على قائمة الاشتراطات (محدث لدعم الحقول الجديدة)
     */
    getApprovalRequirements(contractorType = null) {
        this.ensureRequirementsSetup();
        let requirements = (AppState.companySettings.contractorApprovalRequirements || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
        
        // تصفية حسب نوع المقاول إذا تم تحديده
        if (contractorType) {
            requirements = requirements.filter(req => {
                const applicableTypes = req.applicableTypes || ['contractor', 'supplier'];
                return applicableTypes.includes(contractorType);
            });
        }
        
        // ضمان وجود الحقول الجديدة للاشتراطات القديمة
        return requirements.map(req => ({
            ...req,
            category: req.category || 'other',
            priority: req.priority || 'medium',
            hasExpiry: req.hasExpiry || false,
            expiryMonths: req.expiryMonths || 12,
            description: req.description || '',
            applicableTypes: req.applicableTypes || ['contractor', 'supplier']
        }));
    },

    /**
     * التحقق من استيفاء جميع الاشتراطات المطلوبة
     */
    checkAllRequirementsMet(contractorId) {
        // استخدام الدالة المساعدة للبحث عن المقاول
        const contractor = this.getContractorById(contractorId);
        if (!contractor) {
            // إذا لم نجد المقاول، نعتبر الاشتراطات مستوفاة (للتوافق مع البيانات القديمة)
            Utils.safeWarn(`⚠️ المقاول بالمعرف ${contractorId} غير موجود في قائمة المقاولين`);
            return true; // نعتبره معتمداً للتوافق مع البيانات القديمة
        }

        const requirements = this.getApprovalRequirements();
        const contractorRequirements = contractor.approvalRequirements || {};

        for (const req of requirements) {
            if (!req.required) continue; // تخطي الاشتراطات غير المطلوبة

            const reqData = contractorRequirements[req.id];

            if (req.type === 'document') {
                // يجب أن يكون هناك مستند مرفوع
                if (!reqData || !reqData.documentLink || !reqData.completed) {
                    return false;
                }
            } else if (req.type === 'checkbox') {
                // يجب أن يكون محدد
                if (!reqData || !reqData.completed) {
                    return false;
                }
            } else if (req.type === 'text') {
                // يجب أن يكون هناك نص
                if (!reqData || !reqData.value || !reqData.completed) {
                    return false;
                }
            }
        }

        return true;
    },

    /**
     * الحصول على حالة الاشتراطات للمقاول (محسّن مع دعم انتهاء الصلاحية)
     */
    getContractorRequirementsStatus(contractorId) {
        const contractor = (AppState.appData.contractors || []).find(c => c.id === contractorId);
        if (!contractor) {
            return {
                allMet: false,
                completed: 0,
                total: 0,
                requirements: [],
                expiring: 0,
                expired: 0
            };
        }

        const requirements = this.getApprovalRequirements();
        const contractorRequirements = contractor.approvalRequirements || {};

        let expiringCount = 0;
        let expiredCount = 0;

        const status = requirements.map(req => {
            const reqData = contractorRequirements[req.id];
            let completed = false;
            let isExpiring = false;
            let isExpired = false;

            if (req.type === 'document') {
                completed = !!(reqData && reqData.documentLink && reqData.completed);
                
                // التحقق من انتهاء الصلاحية
                if (req.hasExpiry && reqData && reqData.expiryDate) {
                    const expiryDate = new Date(reqData.expiryDate);
                    const today = new Date();
                    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                    
                    if (daysUntilExpiry < 0) {
                        isExpired = true;
                        expiredCount++;
                    } else if (daysUntilExpiry <= 30) {
                        isExpiring = true;
                        expiringCount++;
                    }
                }
            } else if (req.type === 'checkbox') {
                completed = !!(reqData && reqData.completed);
            } else if (req.type === 'text') {
                completed = !!(reqData && reqData.value && reqData.completed);
            }

            return {
                id: req.id,
                label: req.label,
                type: req.type,
                required: req.required,
                completed: completed,
                isExpiring: isExpiring,
                isExpired: isExpired,
                expiryDate: reqData?.expiryDate || null,
                data: reqData || null
            };
        });

        const requiredCount = status.filter(s => s.required).length;
        const completedCount = status.filter(s => s.required && s.completed && !s.isExpired).length;
        const allMet = completedCount === requiredCount && expiredCount === 0;

        return {
            allMet,
            completed: completedCount,
            total: requiredCount,
            requirements: status,
            expiring: expiringCount,
            expired: expiredCount
        };
    },

    /**
     * الحصول على قائمة المستندات المنتهية أو القريبة من الانتهاء
     */
    getExpiringRequirements(contractorId = null) {
        const contractors = contractorId 
            ? [(AppState.appData.contractors || []).find(c => c.id === contractorId)].filter(Boolean)
            : (AppState.appData.contractors || []);
        
        const expiringItems = [];
        const today = new Date();

        contractors.forEach(contractor => {
            if (!contractor.approvalRequirements) return;

            const requirements = this.getApprovalRequirements();
            requirements.forEach(req => {
                if (req.type !== 'document' || !req.hasExpiry) return;

                const reqData = contractor.approvalRequirements[req.id];
                if (!reqData || !reqData.expiryDate) return;

                const expiryDate = new Date(reqData.expiryDate);
                const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

                if (daysUntilExpiry <= 60) { // تحذير قبل 60 يوم
                    expiringItems.push({
                        contractorId: contractor.id,
                        contractorName: contractor.name,
                        requirementId: req.id,
                        requirementLabel: req.label,
                        expiryDate: reqData.expiryDate,
                        daysUntilExpiry: daysUntilExpiry,
                        isExpired: daysUntilExpiry < 0,
                        documentLink: reqData.documentLink,
                        fileName: reqData.fileName
                    });
                }
            });
        });

        return expiringItems.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
    },

    /**
     * عرض ملخص الاشتراطات
     */
    renderRequirementsSummary(contractorId) {
        const status = this.getContractorRequirementsStatus(contractorId);

        if (status.total === 0) {
            return '<div class="text-gray-500 text-sm">لا توجد اشتراطات محددة</div>';
        }

        const bgClass = status.allMet ? 'bg-green-50' : 'bg-orange-50';
        const borderClass = status.allMet ? 'border-green-200' : 'border-orange-200';
        const textClass = status.allMet ? 'text-green-800' : 'text-orange-800';
        const badgeClass = status.allMet ? 'badge-success' : 'badge-warning';
        const statusText = status.allMet ? '✅ جميع الاشتراطات مستوفاة' : '⚠️ اشتراطات غير مكتملة';

        return `
            <div class="space-y-2">
                <div class="flex items-center justify-between p-2 ${bgClass} border ${borderClass} rounded">
                    <span class="text-sm font-semibold ${textClass}">
                        ${statusText}
                    </span>
                    <span class="badge ${badgeClass}">
                        ${status.completed} / ${status.total}
                    </span>
                </div>
                <div class="text-xs text-gray-600 space-y-1">
                    ${status.requirements.filter(r => r.required).map(req => {
            const iconClass = req.completed ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600';
            const textColorClass = req.completed ? 'text-green-700' : 'text-red-700';
            return `
                        <div class="flex items-center gap-2">
                            <i class="${iconClass}"></i>
                            <span class="${textColorClass}">${Utils.escapeHTML(req.label)}</span>
                        </div>
                    `;
        }).join('')}
                </div>
            </div>
        `;
    },

    /**
     * عرض قسم الاشتراطات في النموذج (محسّن مع التصنيفات والأولويات)
     */
    renderRequirementsSection(contractorId) {
        const contractor = contractorId ? (AppState.appData.contractors || []).find(c => c.id === contractorId) : null;
        const contractorType = contractor?.type || 'contractor';
        const requirements = this.getApprovalRequirements(contractorType);
        const contractorRequirements = contractor?.approvalRequirements || {};

        const status = this.getContractorRequirementsStatus(contractorId);

        // تجميع حسب الفئة
        const requirementsByCategory = {};
        requirements.forEach(req => {
            const category = req.category || 'other';
            if (!requirementsByCategory[category]) {
                requirementsByCategory[category] = [];
            }
            requirementsByCategory[category].push(req);
        });

        // شريط التقدم
        const progressPercentage = status.total > 0 ? (status.completed / status.total) * 100 : 0;

        return `
            <!-- حالة الاشتراطات مع شريط التقدم -->
            <div class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-blue-100 rounded-lg">
                            <i class="fas fa-clipboard-check text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold text-gray-800">حالة الاشتراطات</h4>
                            <p class="text-sm text-gray-600">${status.completed} من ${status.total} اشتراط مكتمل</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-3xl font-bold ${status.allMet ? 'text-green-600' : 'text-orange-600'}">
                            ${Math.round(progressPercentage)}%
                        </div>
                        <span class="badge ${status.allMet ? 'badge-success' : 'badge-warning'} text-sm">
                            ${status.allMet ? 'جاهز للاعتماد' : 'غير مكتمل'}
                        </span>
                    </div>
                </div>
                
                <!-- شريط التقدم -->
                <div class="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div class="h-3 rounded-full transition-all duration-500 ${status.allMet ? 'bg-green-500' : 'bg-orange-500'}" 
                         style="width: ${progressPercentage}%"></div>
                </div>
                
                ${status.allMet ? `
                    <div class="flex items-center gap-2 text-green-700">
                        <i class="fas fa-check-circle"></i>
                        <span class="text-sm font-semibold">جميع الاشتراطات مستوفاة - المقاول جاهز للاعتماد</span>
                    </div>
                ` : `
                    <div class="flex items-center gap-2 text-orange-700">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span class="text-sm font-semibold">يرجى استكمال ${status.total - status.completed} اشتراط متبقي للاعتماد</span>
                    </div>
                `}
            </div>
            
            <!-- عرض الاشتراطات حسب الفئة -->
            <div class="space-y-6">
                ${Object.keys(requirementsByCategory).map(categoryId => {
                    const category = REQUIREMENT_CATEGORIES[categoryId] || REQUIREMENT_CATEGORIES.other;
                    const categoryReqs = requirementsByCategory[categoryId];
                    const categoryCompleted = categoryReqs.filter(req => {
                        const reqData = contractorRequirements[req.id] || {};
                        if (req.type === 'document') {
                            return !!(reqData && reqData.documentLink && reqData.completed);
                        } else if (req.type === 'checkbox') {
                            return !!(reqData && reqData.completed);
                        } else if (req.type === 'text') {
                            return !!(reqData && reqData.value && reqData.completed);
                        }
                        return false;
                    }).length;
                    const categoryProgress = categoryReqs.length > 0 ? (categoryCompleted / categoryReqs.length) * 100 : 0;

                    return `
                        <div class="requirement-category-section border-2 rounded-lg overflow-hidden" style="border-color: ${category.color}40;">
                            <!-- رأس الفئة -->
                            <div class="p-4 bg-gradient-to-r" style="background: linear-gradient(135deg, ${category.color}15, ${category.color}05);">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="p-2 rounded-lg" style="background: ${category.color}20;">
                                            <i class="fas ${category.icon} text-xl" style="color: ${category.color};"></i>
                                        </div>
                                        <div>
                                            <h5 class="font-bold text-gray-800">${category.label}</h5>
                                            <p class="text-xs text-gray-600">${categoryCompleted} / ${categoryReqs.length} مكتمل</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-2xl font-bold" style="color: ${category.color};">
                                            ${Math.round(categoryProgress)}%
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                                    <div class="h-2 rounded-full transition-all" 
                                         style="width: ${categoryProgress}%; background: ${category.color};"></div>
                                </div>
                            </div>
                            
                            <!-- اشتراطات الفئة -->
                            <div class="p-4 space-y-3 bg-white">
                                ${categoryReqs.map(req => {
                                    const reqData = contractorRequirements[req.id] || {};
                                    const isCompleted = reqData.completed || false;
                                    const priority = REQUIREMENT_PRIORITIES[req.priority] || REQUIREMENT_PRIORITIES.medium;
                                    
                                    // التحقق من انتهاء الصلاحية للمستندات
                                    let expiryWarning = '';
                                    if (req.hasExpiry && reqData.documentLink && reqData.expiryDate) {
                                        const expiryDate = new Date(reqData.expiryDate);
                                        const today = new Date();
                                        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                                        
                                        if (daysUntilExpiry < 0) {
                                            expiryWarning = '<span class="badge badge-danger text-xs"><i class="fas fa-exclamation-triangle ml-1"></i> منتهي الصلاحية</span>';
                                        } else if (daysUntilExpiry <= 30) {
                                            expiryWarning = `<span class="badge badge-warning text-xs"><i class="fas fa-clock ml-1"></i> ينتهي خلال ${daysUntilExpiry} يوم</span>`;
                                        }
                                    }

                                    let inputHTML = '';
                                    if (req.type === 'document') {
                                        inputHTML = `
                                            <div class="space-y-2">
                                                <input type="file" 
                                                    id="req-${req.id}-file" 
                                                    class="form-input" 
                                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                                    onchange="Contractors.handleRequirementFileChange('${contractorId}', '${req.id}', this)">
                                                ${reqData.documentLink ? `
                                                    <div class="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                        <i class="fas fa-check-circle text-green-600"></i>
                                                        <a href="${reqData.documentLink}" target="_blank" 
                                                           class="flex-1 text-sm text-green-700 hover:underline font-medium">
                                                            <i class="fas fa-file ml-1"></i>
                                                            ${reqData.fileName || 'المستند المرفوع'}
                                                        </a>
                                                        ${reqData.uploadedAt ? `
                                                            <span class="text-xs text-gray-500">
                                                                ${Utils.formatDate(reqData.uploadedAt)}
                                                            </span>
                                                        ` : ''}
                                                        ${expiryWarning}
                                                        <button onclick="Contractors.removeRequirementDocument('${contractorId}', '${req.id}')" 
                                                            class="btn-icon btn-icon-danger btn-sm" title="حذف المستند">
                                                            <i class="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                ` : ''}
                                            </div>
                                        `;
                                    } else if (req.type === 'checkbox') {
                                        inputHTML = `
                                            <label class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                                <input type="checkbox" 
                                                    id="req-${req.id}-checkbox" 
                                                    ${isCompleted ? 'checked' : ''}
                                                    onchange="Contractors.handleRequirementCheckboxChange('${contractorId}', '${req.id}', this.checked)"
                                                    class="cursor-pointer">
                                                <span class="text-sm text-gray-700">تم الاستيفاء</span>
                                            </label>
                                        `;
                                    } else if (req.type === 'text') {
                                        inputHTML = `
                                            <div class="space-y-2">
                                                <input type="text" 
                                                    id="req-${req.id}-text" 
                                                    class="form-input" 
                                                    value="${Utils.escapeHTML(reqData.value || '')}"
                                                    placeholder="أدخل ${req.label.toLowerCase()}"
                                                    onchange="Contractors.handleRequirementTextChange('${contractorId}', '${req.id}', this.value)">
                                                ${reqData.value && isCompleted ? `
                                                    <div class="text-xs text-green-600 flex items-center gap-1">
                                                        <i class="fas fa-check-circle"></i>
                                                        تم إدخال البيانات
                                                    </div>
                                                ` : ''}
                                            </div>
                                        `;
                                    }

                                    return `
                                        <div class="p-4 border-2 rounded-lg transition-all ${isCompleted ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}" 
                                             data-requirement-id="${req.id}"
                                             style="border-left: 4px solid ${priority.color};">
                                            <div class="flex items-start justify-between mb-3">
                                                <div class="flex-1">
                                                    <div class="flex items-center gap-2 mb-2 flex-wrap">
                                                        <span class="px-2 py-1 text-xs font-bold rounded" style="background: ${priority.color}20; color: ${priority.color};">
                                                            ${priority.label}
                                                        </span>
                                                        ${req.required ? '<span class="badge badge-danger text-xs">مطلوب</span>' : '<span class="badge badge-secondary text-xs">اختياري</span>'}
                                                        ${req.hasExpiry ? `<span class="badge badge-info text-xs"><i class="fas fa-calendar ml-1"></i> ${req.expiryMonths} شهر</span>` : ''}
                                                        ${expiryWarning}
                                                    </div>
                                                    <label class="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                                        ${req.required ? '<span class="text-red-500 text-lg">*</span>' : ''}
                                                        ${req.label}
                                                    </label>
                                                    ${req.description ? `
                                                        <p class="text-xs text-gray-600 mt-1">${Utils.escapeHTML(req.description)}</p>
                                                    ` : ''}
                                                </div>
                                                <span class="badge ${isCompleted ? 'badge-success' : 'badge-warning'} text-xs">
                                                    ${isCompleted ? '✓ مكتمل' : '✗ غير مكتمل'}
                                                </span>
                                            </div>
                                            ${inputHTML}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    /**
     * معالجة رفع ملف اشتراط
     */
    async handleRequirementFileChange(contractorId, requirementId, fileInput) {
        if (!contractorId || !requirementId || !fileInput) {
            Notification.error('بيانات غير كاملة');
            return;
        }

        if (!fileInput.files || fileInput.files.length === 0) return;

        const file = fileInput.files[0];
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (file.size > maxSize) {
            Notification.error('حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت');
            fileInput.value = '';
            return;
        }

        Loading.show();
        try {
            // تحويل الملف إلى Base64
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const base64Data = e.target.result.split(',')[1];
                    const mimeType = file.type;
                    const fileName = file.name;

                    // رفع الملف إلى Google Drive
                    const uploadResult = await GoogleIntegration.uploadFileToDrive(
                        base64Data,
                        fileName,
                        mimeType,
                        'Contractors'
                    );

                    if (uploadResult && uploadResult.success) {
                        // حفظ رابط المستند في بيانات المقاول
                        const contractor = (AppState.appData.contractors || []).find(c => c.id === contractorId);
                        if (contractor) {
                            if (!contractor.approvalRequirements) {
                                contractor.approvalRequirements = {};
                            }

                            // الحصول على معلومات الاشتراط
                            const requirements = this.getApprovalRequirements();
                            const requirement = requirements.find(r => r.id === requirementId);
                            
                            // حساب تاريخ الانتهاء إذا كان الاشتراط له تاريخ انتهاء
                            let expiryDate = null;
                            if (requirement && requirement.hasExpiry && requirement.expiryMonths) {
                                const expiry = new Date();
                                expiry.setMonth(expiry.getMonth() + requirement.expiryMonths);
                                expiryDate = expiry.toISOString();
                            }

                            contractor.approvalRequirements[requirementId] = {
                                completed: true,
                                documentLink: uploadResult.shareableLink || uploadResult.directLink,
                                fileName: fileName,
                                fileId: uploadResult.fileId,
                                uploadedAt: new Date().toISOString(),
                                expiryDate: expiryDate,
                                expiryMonths: requirement?.expiryMonths || null
                            };

                            // حفظ البيانات باستخدام window.DataManager
                            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                                window.DataManager.save();
                            } else {
                                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
                            }
                            await GoogleIntegration.autoSave('Contractors', AppState.appData.contractors);

                            // تحديث حالة الاعتماد
                            this.updateContractorApprovalStatus(contractorId);

                            // تحديث العرض
                            const section = this.safeGetElementById('contractor-requirements-section');
                            if (section) {
                                const html = this.renderRequirementsSection(contractorId);
                                this.safeSetInnerHTML(section, html);
                            }

                            Notification.success('تم رفع المستند بنجاح');
                        } else {
                            Notification.error('المقاول غير موجود');
                        }
                    } else {
                        Notification.error('فشل رفع المستند: ' + (uploadResult?.message || 'خطأ غير معروف'));
                    }
                } catch (error) {
                    Utils.safeError('خطأ في معالجة الملف:', error);
                    Notification.error('حدث خطأ أثناء رفع المستند: ' + (error.message || 'خطأ غير معروف'));
                } finally {
                    Loading.hide();
                }
            };
            reader.onerror = () => {
                Loading.hide();
                Notification.error('فشل قراءة الملف');
            };
            reader.readAsDataURL(file);
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في قراءة الملف:', error);
            Notification.error('حدث خطأ أثناء قراءة الملف: ' + (error.message || 'خطأ غير معروف'));
        }
    },

    /**
     * معالجة تغيير checkbox اشتراط
     */
    async handleRequirementCheckboxChange(contractorId, requirementId, checked) {
        if (!contractorId || !requirementId) {
            Notification.error('بيانات غير كاملة');
            return;
        }

        const contractor = (AppState.appData.contractors || []).find(c => c.id === contractorId);
        if (contractor) {
            if (!contractor.approvalRequirements) {
                contractor.approvalRequirements = {};
            }

            contractor.approvalRequirements[requirementId] = {
                completed: checked,
                updatedAt: new Date().toISOString()
            };

            // حفظ البيانات باستخدام window.DataManager
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            } else {
                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
            }
            try {
                await GoogleIntegration.autoSave('Contractors', AppState.appData.contractors);
            } catch (error) {
                Utils.safeWarn('فشل الحفظ التلقائي:', error);
            }

            // تحديث حالة الاعتماد
            this.updateContractorApprovalStatus(contractorId);

            // تحديث العرض
            const section = this.safeGetElementById('contractor-requirements-section');
            if (section) {
                const html = this.renderRequirementsSection(contractorId);
                this.safeSetInnerHTML(section, html);
            }
        } else {
            Notification.error('المقاول غير موجود');
        }
    },

    /**
     * معالجة تغيير نص اشتراط
     */
    async handleRequirementTextChange(contractorId, requirementId, value) {
        if (!contractorId || !requirementId) {
            Notification.error('بيانات غير كاملة');
            return;
        }

        const contractor = (AppState.appData.contractors || []).find(c => c.id === contractorId);
        if (contractor) {
            if (!contractor.approvalRequirements) {
                contractor.approvalRequirements = {};
            }

            const trimmedValue = (value || '').trim();
            contractor.approvalRequirements[requirementId] = {
                completed: trimmedValue.length > 0,
                value: trimmedValue,
                updatedAt: new Date().toISOString()
            };

            // حفظ البيانات باستخدام window.DataManager
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            } else {
                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
            }
            try {
                await GoogleIntegration.autoSave('Contractors', AppState.appData.contractors);
            } catch (error) {
                Utils.safeWarn('فشل الحفظ التلقائي:', error);
            }

            // تحديث حالة الاعتماد
            this.updateContractorApprovalStatus(contractorId);

            // تحديث العرض
            const section = this.safeGetElementById('contractor-requirements-section');
            if (section) {
                const html = this.renderRequirementsSection(contractorId);
                this.safeSetInnerHTML(section, html);
            }
        } else {
            Notification.error('المقاول غير موجود');
        }
    },

    /**
     * حذف مستند اشتراط
     */
    async removeRequirementDocument(contractorId, requirementId) {
        if (!confirm('هل أنت متأكد من حذف هذا المستند؟')) return;

        const contractor = (AppState.appData.contractors || []).find(c => c.id === contractorId);
        if (contractor && contractor.approvalRequirements && contractor.approvalRequirements[requirementId]) {
            delete contractor.approvalRequirements[requirementId];

            // حفظ البيانات باستخدام window.DataManager
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            } else {
                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
            }
            await GoogleIntegration.autoSave('Contractors', AppState.appData.contractors);

            // تحديث حالة الاعتماد
            this.updateContractorApprovalStatus(contractorId);

            // تحديث العرض
            const section = this.safeGetElementById('contractor-requirements-section');
            if (section) {
                const html = this.renderRequirementsSection(contractorId);
                this.safeSetInnerHTML(section, html);
            }

            Notification.success('تم حذف المستند');
        }
    },

    /**
     * تحديث حالة اعتماد المقاول بناءً على الاشتراطات
     */
    updateContractorApprovalStatus(contractorId) {
        const contractor = (AppState.appData.contractors || []).find(c => c.id === contractorId);
        if (!contractor) return;

        const allMet = this.checkAllRequirementsMet(contractorId);

        // تحديث حالة المقاول
        if (allMet && contractor.approvalStatus !== 'approved') {
            contractor.approvalStatus = 'approved';
            contractor.approvedAt = new Date().toISOString();

            // إضافة المقاول تلقائياً إلى قائمة المعتمدين إذا لم يكن موجوداً
            this.ensureApprovedSetup();
            const approvedContractors = AppState.appData.approvedContractors || [];
            const contractorName = contractor.name || '';
            const normalizedContractorName = contractorName.trim().toLowerCase();
            const normalizedLicenseNumber = contractor.contractNumber ? contractor.contractNumber.trim() : '';

            // فحص التكرار بناءً على: contractorId، اسم الشركة + نوع الجهة، السجل التجاري
            const existingApproved = approvedContractors.find(ac => {
                // فحص التكرار بناءً على contractorId
                if (ac.contractorId === contractorId) return true;

                // فحص التكرار بناءً على اسم الشركة + نوع الجهة
                if (ac.companyName &&
                    ac.companyName.trim().toLowerCase() === normalizedContractorName &&
                    ac.entityType === 'contractor') {
                    return true;
                }

                // فحص التكرار بناءً على السجل التجاري (إذا كان موجوداً)
                if (normalizedLicenseNumber && ac.licenseNumber &&
                    ac.licenseNumber.trim() === normalizedLicenseNumber) {
                    return true;
                }

                return false;
            });

            if (!existingApproved) {
                // استخدام كود المقاول الموجود أو توليد كود جديد CON-xxx
                let entityCode = contractor.code || '';

                if (!entityCode) {
                    // توليد كود تلقائي CON-xxx
                    const contractors = AppState.appData.contractors || [];
                    let maxNumber = 0;

                    // البحث في قائمة المقاولين
                    contractors.forEach(c => {
                        if (c.code) {
                            const match = c.code.match(/CON-(\d+)/);
                            if (match) {
                                const num = parseInt(match[1], 10);
                                if (num > maxNumber) {
                                    maxNumber = num;
                                }
                            }
                        }
                    });

                    // البحث في قائمة المعتمدين
                    approvedContractors.forEach(entity => {
                        const code = entity.isoCode || entity.code;
                        if (code) {
                            // البحث عن كود CON-xxx
                            let match = code.match(/CON-(\d+)/);
                            if (match) {
                                const num = parseInt(match[1], 10);
                                if (num > maxNumber) {
                                    maxNumber = num;
                                }
                            }
                            // البحث عن كود APP-xxx القديم (للتحويل)
                            match = code.match(/APP-(\d+)/);
                            if (match) {
                                const num = parseInt(match[1], 10);
                                if (num > maxNumber) {
                                    maxNumber = num;
                                }
                            }
                        }
                    });

                    const newNumber = maxNumber + 1;
                    entityCode = `CON-${String(newNumber).padStart(3, '0')}`;

                    // تحديث كود المقاول
                    contractor.code = entityCode;
                }

                const approvedRecord = {
                    id: Utils.generateId('APPCON'),
                    contractorId: contractorId,
                    companyName: contractorName,
                    entityType: 'contractor',
                    serviceType: contractor.serviceType || '',
                    licenseNumber: contractor.contractNumber || '',
                    approvalDate: new Date().toISOString(),
                    expiryDate: contractor.endDate || '',
                    safetyReviewer: contractor.contactPerson || '',
                    status: 'approved',
                    notes: 'تم الاعتماد تلقائياً بعد استيفاء جميع الاشتراطات',
                    isoCode: entityCode, // استخدام كود CON-xxx
                    code: entityCode, // استخدام كود CON-xxx
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                approvedContractors.push(approvedRecord);
                AppState.appData.approvedContractors = approvedContractors;
            }
        } else if (!allMet && contractor.approvalStatus === 'approved') {
            contractor.approvalStatus = 'pending';
            contractor.approvedAt = null;
        }

        // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
        try {
            GoogleIntegration.autoSave?.('Contractors', AppState.appData.contractors);
            GoogleIntegration.autoSave?.('ApprovedContractors', AppState.appData.approvedContractors);
        } catch (error) {
            Utils.safeWarn('فشل الحفظ التلقائي:', error);
        }
    },

    /**
     * فتح واجهة إدارة الاشتراطات (للمدير فقط)
     */
    openRequirementsManagement() {
        const isAdmin = (AppState.currentUser && AppState.currentUser.role === 'admin');
        if (!isAdmin) {
            Notification.error('هذه الصفحة متاحة للمدير فقط');
            return;
        }

        this.ensureRequirementsSetup();
        const requirements = this.getApprovalRequirements();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        إدارة اشتراطات اعتماد المقاولين
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle ml-2"></i>
                            يمكنك إضافة أو تعديل أو حذف الاشتراطات المطلوبة لاعتماد المقاولين. 
                            المقاولون لن يظهرون في قائمة المعتمدين إلا بعد استيفاء جميع الاشتراطات المطلوبة.
                        </p>
                    </div>
                    
                    <div id="requirements-list" class="space-y-3 mb-4">
                        ${requirements.map((req, index) => `
                            <div class="p-3 border rounded bg-white" data-requirement-id="${req.id}">
                                <div class="flex items-start gap-3">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-2">
                                            <span class="text-sm font-semibold text-gray-600">#${index + 1}</span>
                                            <label for="req-label-${req.id}" class="sr-only">اسم الاشتراط</label>
                                            <input type="text" 
                                                id="req-label-${req.id}"
                                                class="form-input flex-1" 
                                                value="${Utils.escapeHTML(req.label)}"
                                                data-field="label"
                                                placeholder="اسم الاشتراط">
                                        </div>
                                        <div class="grid grid-cols-2 gap-2 mt-2">
                                            <label for="req-type-${req.id}" class="sr-only">نوع الاشتراط</label>
                                            <select id="req-type-${req.id}" class="form-input" data-field="type">
                                                <option value="document" ${req.type === 'document' ? 'selected' : ''}>مستند</option>
                                                <option value="checkbox" ${req.type === 'checkbox' ? 'selected' : ''}>مربع اختيار</option>
                                                <option value="text" ${req.type === 'text' ? 'selected' : ''}>نص</option>
                                            </select>
                                            <label class="flex items-center gap-2">
                                                <input type="checkbox" 
                                                    data-field="required" 
                                                    ${req.required ? 'checked' : ''}>
                                                <span class="text-sm text-gray-700">مطلوب</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <button onclick="Contractors.moveRequirementUp('${req.id}')" 
                                            class="btn-icon btn-icon-info" 
                                            title="نقل لأعلى"
                                            ${index === 0 ? 'disabled' : ''}>
                                            <i class="fas fa-arrow-up"></i>
                                        </button>
                                        <button onclick="Contractors.moveRequirementDown('${req.id}')" 
                                            class="btn-icon btn-icon-info" 
                                            title="نقل لأسفل"
                                            ${index === requirements.length - 1 ? 'disabled' : ''}>
                                            <i class="fas fa-arrow-down"></i>
                                        </button>
                                        <button onclick="Contractors.deleteRequirement('${req.id}')" 
                                            class="btn-icon btn-icon-danger" 
                                            title="حذف">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button onclick="Contractors.addNewRequirement()" class="btn-secondary w-full">
                        <i class="fas fa-plus ml-2"></i>
                        إضافة اشتراط جديد
                    </button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button onclick="Contractors.saveRequirements()" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>
                        حفظ التغييرات
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.applyModuleI18n(modal);

        modal.addEventListener('click', (event) => {
            if (event.target === modal) modal.remove();
        });
    },

    /**
     * إضافة اشتراط جديد
     */
    addNewRequirement() {
        const list = document.getElementById('requirements-list');
        if (!list) return;

        // إيجاد أول فئة (أو إنشاء فئة "أخرى" إذا لم تكن موجودة)
        let targetCategory = list.querySelector('.requirement-category-group');
        if (!targetCategory) {
            // إنشاء فئة "أخرى" إذا لم تكن موجودة
            const otherCategory = REQUIREMENT_CATEGORIES.other;
            const categoryHTML = `
                <div class="requirement-category-group" data-category="other">
                    <div class="flex items-center gap-3 mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div class="w-1 h-8 rounded" style="background: ${otherCategory.color};"></div>
                        <i class="fas ${otherCategory.icon} text-xl" style="color: ${otherCategory.color};"></i>
                        <h3 class="text-lg font-bold text-gray-800">${otherCategory.label}</h3>
                        <span class="badge badge-info">0 اشتراط</span>
                    </div>
                    <div class="space-y-3 ml-6"></div>
                </div>
            `;
            list.insertAdjacentHTML('beforeend', categoryHTML);
            targetCategory = list.querySelector('.requirement-category-group');
        }

        const categoryContainer = targetCategory.querySelector('.space-y-3');
        const existingItems = categoryContainer.querySelectorAll('.requirement-item').length;
        const newId = `req_${Date.now()}`;
        const priority = REQUIREMENT_PRIORITIES.medium;

        const reqHTML = `
            <div class="requirement-item p-4 border-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-move" 
                 data-requirement-id="${newId}"
                 data-category="${targetCategory.getAttribute('data-category')}"
                 draggable="true"
                 style="border-color: ${priority.color}20;">
                <div class="flex items-start gap-4">
                    <div class="drag-handle cursor-grab active:cursor-grabbing pt-1">
                        <i class="fas fa-grip-vertical text-gray-400 text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="px-2 py-1 text-xs font-bold rounded" style="background: ${priority.color}20; color: ${priority.color};">
                                ${priority.label}
                            </span>
                            <span class="text-sm font-semibold text-gray-500">#${existingItems + 1}</span>
                            <span class="badge badge-danger text-xs">مطلوب</span>
                        </div>
                        <input type="text" 
                            class="form-input mb-3 font-semibold text-gray-800" 
                            value="اشتراط جديد"
                            data-field="label"
                            placeholder="اسم الاشتراط">
                        <textarea class="form-input mb-3 text-sm" 
                            data-field="description"
                            placeholder="وصف الاشتراط (اختياري)"
                            rows="2"></textarea>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <select class="form-input text-sm" data-field="type">
                                <option value="document" selected>📄 مستند</option>
                                <option value="checkbox">☑️ مربع اختيار</option>
                                <option value="text">📝 نص</option>
                            </select>
                            <select class="form-input text-sm" data-field="category">
                                ${Object.values(REQUIREMENT_CATEGORIES).map(cat => `
                                    <option value="${cat.id}" ${cat.id === targetCategory.getAttribute('data-category') ? 'selected' : ''}>${cat.label}</option>
                                `).join('')}
                            </select>
                            <select class="form-input text-sm" data-field="priority">
                                ${Object.values(REQUIREMENT_PRIORITIES).map(pri => `
                                    <option value="${pri.id}" ${pri.id === 'medium' ? 'selected' : ''}>${pri.label}</option>
                                `).join('')}
                            </select>
                            <label class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                <input type="checkbox" 
                                    data-field="required" 
                                    checked
                                    class="cursor-pointer">
                                <span class="text-sm text-gray-700">مطلوب</span>
                            </label>
                        </div>
                        <div class="grid grid-cols-2 gap-3 mt-3">
                            <label class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                <input type="checkbox" 
                                    data-field="hasExpiry" 
                                    class="cursor-pointer"
                                    onchange="Contractors.toggleExpiryFields(this)">
                                <span class="text-sm text-gray-700">له تاريخ انتهاء</span>
                            </label>
                            <div class="expiry-fields" style="display: none;">
                                <input type="number" 
                                    class="form-input text-sm" 
                                    value="12"
                                    data-field="expiryMonths"
                                    placeholder="عدد الأشهر"
                                    min="1" max="60">
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <button onclick="Contractors.moveRequirementUp('${newId}')" 
                            class="btn-icon btn-icon-info" 
                            title="نقل لأعلى">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <button onclick="Contractors.moveRequirementDown('${newId}')" 
                            class="btn-icon btn-icon-info" 
                            title="نقل لأسفل">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                        <button onclick="Contractors.deleteRequirement('${newId}')" 
                            class="btn-icon btn-icon-danger" 
                            title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        categoryContainer.insertAdjacentHTML('beforeend', reqHTML);
        
        // تحديث عدد الاشتراطات في الفئة
        const badge = targetCategory.querySelector('.badge');
        if (badge) {
            const count = categoryContainer.querySelectorAll('.requirement-item').length;
            badge.textContent = `${count} اشتراط`;
        }

        // إعداد السحب والإفلات للعنصر الجديد
        this.setupDragAndDropForItem(categoryContainer.querySelector(`[data-requirement-id="${newId}"]`));
    },

    /**
     * إعداد السحب والإفلات للاشتراطات
     */
    setupDragAndDrop() {
        const list = document.getElementById('requirements-list');
        if (!list) return;

        list.querySelectorAll('.requirement-item').forEach(item => {
            this.setupDragAndDropForItem(item);
        });
    },

    /**
     * إعداد السحب والإفلات لعنصر واحد
     */
    setupDragAndDropForItem(item) {
        if (!item) return;

        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', item.outerHTML);
            e.dataTransfer.setData('text/plain', item.getAttribute('data-requirement-id'));
            item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            const afterElement = this.getDragAfterElement(item.parentElement, e.clientY);
            const dragging = document.querySelector('.dragging');
            
            if (afterElement == null) {
                item.parentElement.appendChild(dragging);
            } else {
                item.parentElement.insertBefore(dragging, afterElement);
            }
        });

        item.addEventListener('drop', (e) => {
            e.preventDefault();
            this.saveRequirements(); // حفظ الترتيب الجديد
        });
    },

    /**
     * الحصول على العنصر الذي يجب إدراج العنصر المسحوب بعده
     */
    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.requirement-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    },

    /**
     * حفظ الاشتراطات (محدث لدعم الحقول الجديدة)
     */
    saveRequirements() {
        const list = document.getElementById('requirements-list');
        if (!list) return;

        // جمع جميع الاشتراطات من جميع الفئات
        const allItems = [];
        list.querySelectorAll('.requirement-category-group').forEach(group => {
            group.querySelectorAll('.requirement-item').forEach(item => {
                allItems.push(item);
            });
        });

        const requirements = allItems.map((item, index) => {
            const reqId = item.getAttribute('data-requirement-id');
            const labelInput = item.querySelector('[data-field="label"]');
            const typeSelect = item.querySelector('[data-field="type"]');
            const requiredCheckbox = item.querySelector('[data-field="required"]');
            const categorySelect = item.querySelector('[data-field="category"]');
            const prioritySelect = item.querySelector('[data-field="priority"]');
            const hasExpiryCheckbox = item.querySelector('[data-field="hasExpiry"]');
            const expiryMonthsInput = item.querySelector('[data-field="expiryMonths"]');
            const descriptionTextarea = item.querySelector('[data-field="description"]');

            const requirement = {
                id: reqId,
                label: labelInput?.value.trim() || '',
                type: typeSelect?.value || 'document',
                required: requiredCheckbox?.checked || false,
                order: index + 1,
                category: categorySelect?.value || 'other',
                priority: prioritySelect?.value || 'medium',
                hasExpiry: hasExpiryCheckbox?.checked || false,
                expiryMonths: hasExpiryCheckbox?.checked ? parseInt(expiryMonthsInput?.value || 12) : null,
                description: descriptionTextarea?.value.trim() || '',
                applicableTypes: ['contractor', 'supplier'] // افتراضي لجميع الأنواع
            };

            return requirement;
        }).filter(req => req.label.length > 0);

        if (requirements.length === 0) {
            Notification.warning('يجب إضافة اشتراط واحد على الأقل');
            return;
        }

        this.ensureRequirementsSetup();
        AppState.companySettings.contractorApprovalRequirements = requirements;
        
        // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

        Notification.success(`تم حفظ ${requirements.length} اشتراط بنجاح`);

        // تحديث محتوى تبويب الاشتراطات إذا كان مفتوحاً
        const requirementsContent = this.safeGetElementById('contractors-requirements-content');
        if (requirementsContent && this.currentTab === 'requirements') {
            this.renderRequirementsManagementSection().then(html => {
                // ✅ استخدام safeSetInnerHTML بدلاً من innerHTML مباشرة
                if (this.safeSetInnerHTML(requirementsContent, html)) {
                    this.setupDragAndDrop(); // إعادة إعداد السحب والإفلات
                }
            });
        }

        // إغلاق النافذة إذا كانت مفتوحة
        const modal = document.querySelector('.modal-overlay');
        if (modal) modal.remove();
    },

    /**
     * نقل اشتراط لأعلى
     */
    moveRequirementUp(reqId) {
        const list = document.getElementById('requirements-list');
        if (!list) return;

        const items = Array.from(list.children);
        const index = items.findIndex(item => item.getAttribute('data-requirement-id') === reqId);

        if (index > 0) {
            const item = items[index];
            const prevItem = items[index - 1];
            list.insertBefore(item, prevItem);
        }
    },

    /**
     * نقل اشتراط لأسفل
     */
    moveRequirementDown(reqId) {
        const list = document.getElementById('requirements-list');
        if (!list) return;

        const items = Array.from(list.children);
        const index = items.findIndex(item => item.getAttribute('data-requirement-id') === reqId);

        if (index < items.length - 1) {
            const item = items[index];
            const nextItem = items[index + 1];
            list.insertBefore(item, nextItem.nextSibling);
        }
    },

    /**
     * حذف اشتراط
     */
    deleteRequirement(reqId) {
        if (!confirm('هل أنت متأكد من حذف هذا الاشتراط؟')) return;

        const list = document.getElementById('requirements-list');
        if (!list) return;

        const item = list.querySelector(`[data-requirement-id="${reqId}"]`);
        if (item) {
            item.remove();
        }
    },

    /**
     * فلترة الاشتراطات حسب الفئة
     */
    filterRequirementsByCategory(categoryId) {
        // تحديث الأزرار النشطة
        document.querySelectorAll('.requirement-category-filter').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === categoryId) {
                btn.classList.add('active');
            }
        });

        // إظهار/إخفاء الاشتراطات
        document.querySelectorAll('.requirement-category-group').forEach(group => {
            if (categoryId === 'all' || group.getAttribute('data-category') === categoryId) {
                group.style.display = 'block';
                group.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                group.style.display = 'none';
            }
        });
    },

    /**
     * تبديل حقول تاريخ الانتهاء
     */
    toggleExpiryFields(checkbox) {
        const item = checkbox.closest('.requirement-item');
        if (!item) return;
        const expiryFields = item.querySelector('.expiry-fields');
        if (!expiryFields) return;
        if (checkbox.checked) {
            expiryFields.style.display = 'block';
            const expiryInput = expiryFields.querySelector('input');
            if (expiryInput) {
                expiryInput.value = expiryInput.value || '12';
            }
        } else {
            expiryFields.style.display = 'none';
        }
    },

    /**
     * تصدير قالب الاشتراطات
     */
    exportRequirementsTemplate() {
        this.ensureRequirementsSetup();
        const requirements = this.getApprovalRequirements();
        if (typeof XLSX === 'undefined') {
            Notification.error('مكتبة Excel غير محمّلة. يرجى تحديث الصفحة ثم المحاولة مجددًا.');
            return;
        }

        const rows = requirements.map((req, index) => ({
            'الترتيب': Number(req.order) || index + 1,
            'معرف الاشتراط': req.id || '',
            'اسم الاشتراط': req.label || '',
            'الوصف': req.description || '',
            'نوع الحقل': req.type || 'document',
            'الفئة': (REQUIREMENT_CATEGORIES[req.category] || REQUIREMENT_CATEGORIES.other).label,
            'الأولوية': (REQUIREMENT_PRIORITIES[req.priority] || REQUIREMENT_PRIORITIES.medium).label,
            'إلزامي': req.required === false ? 'لا' : 'نعم',
            'له تاريخ انتهاء': req.hasExpiry ? 'نعم' : 'لا',
            'مدة الصلاحية بالأشهر': req.hasExpiry ? (Number(req.expiryMonths) || 12) : '',
            'ينطبق على': Array.isArray(req.applicableTypes) && req.applicableTypes.length === 1
                ? (req.applicableTypes[0] === 'supplier' ? 'مورد' : 'مقاول')
                : 'مقاول ومورد'
        }));

        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(rows);
        sheet['!cols'] = [
            { wch: 10 }, { wch: 20 }, { wch: 45 }, { wch: 55 }, { wch: 16 },
            { wch: 27 }, { wch: 14 }, { wch: 12 }, { wch: 18 }, { wch: 24 }, { wch: 18 }
        ];
        sheet['!autofilter'] = { ref: sheet['!ref'] || 'A1:K1' };
        XLSX.utils.book_append_sheet(workbook, sheet, 'الاشتراطات');

        const guideRows = [
            ['دليل استخدام قالب اشتراطات اعتماد المقاولين'],
            ['الحقل', 'القيم المقبولة / التعليمات'],
            ['اسم الاشتراط', 'إلزامي، ولا يتم استيراد الصف بدونه'],
            ['نوع الحقل', 'document أو text أو checkbox'],
            ['الفئة', Object.values(REQUIREMENT_CATEGORIES).map(item => `${item.label} (${item.id})`).join('، ')],
            ['الأولوية', Object.values(REQUIREMENT_PRIORITIES).map(item => `${item.label} (${item.id})`).join('، ')],
            ['إلزامي / له تاريخ انتهاء', 'نعم أو لا'],
            ['ينطبق على', 'مقاول، مورد، أو مقاول ومورد'],
            ['ملاحظة', 'لا تغيّر أسماء أعمدة ورقة الاشتراطات. يمكن إضافة صفوف جديدة أو تعديل القائمة الحالية.']
        ];
        const guideSheet = XLSX.utils.aoa_to_sheet(guideRows);
        guideSheet['!cols'] = [{ wch: 28 }, { wch: 100 }];
        guideSheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];
        XLSX.utils.book_append_sheet(workbook, guideSheet, 'دليل القيم');
        workbook.Workbook = workbook.Workbook || {};
        workbook.Workbook.Views = [{ RTL: true }];

        XLSX.writeFile(workbook, `قالب_اشتراطات_المقاولين_${new Date().toISOString().slice(0, 10)}.xlsx`);
        Notification.success('تم تصدير قالب الاشتراطات بصيغة Excel بنجاح');
    },

    getRequirementImportCell(row, ...aliases) {
        return this.getApprovedImportCell(row, ...aliases);
    },

    parseRequirementImportBoolean(value, defaultValue = false) {
        if (typeof value === 'boolean') return value;
        if (typeof value === 'number') return value !== 0;
        const normalized = String(value ?? '').trim().toLowerCase();
        if (!normalized) return defaultValue;
        return ['نعم', 'yes', 'true', '1', 'إلزامي'].includes(normalized);
    },

    mapRequirementImportOption(value, options, fallback) {
        const normalized = String(value ?? '').trim().toLowerCase();
        if (!normalized) return fallback;
        const match = Object.values(options).find(item =>
            item.id.toLowerCase() === normalized || item.label.toLowerCase() === normalized
        );
        return match ? match.id : fallback;
    },

    /**
     * استيراد قالب الاشتراطات
     */
    importRequirementsTemplate() {
        if (typeof XLSX === 'undefined') {
            Notification.error('مكتبة Excel غير محمّلة. يرجى تحديث الصفحة ثم المحاولة مجددًا.');
            return;
        }
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx,.xls';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const buffer = await file.arrayBuffer();
                const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                if (!sheet) {
                    Notification.error('ملف Excel لا يحتوي على ورقة اشتراطات');
                    return;
                }
                const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: true });
                const requirements = rows.map((row, index) => {
                    const label = String(this.getRequirementImportCell(row, 'اسم الاشتراط', 'الاشتراط', 'label', 'name')).trim();
                    if (!label) return null;
                    const applicableValue = String(this.getRequirementImportCell(row, 'ينطبق على', 'applicableTypes')).trim().toLowerCase();
                    const applicableTypes = applicableValue === 'مورد' || applicableValue === 'supplier'
                        ? ['supplier']
                        : applicableValue === 'مقاول' || applicableValue === 'contractor'
                            ? ['contractor']
                            : ['contractor', 'supplier'];
                    const hasExpiry = this.parseRequirementImportBoolean(
                        this.getRequirementImportCell(row, 'له تاريخ انتهاء', 'hasExpiry'), false
                    );
                    return {
                        id: String(this.getRequirementImportCell(row, 'معرف الاشتراط', 'المعرف', 'id')).trim() || `req_${Date.now()}_${index}`,
                        label,
                        description: String(this.getRequirementImportCell(row, 'الوصف', 'description')).trim(),
                        type: ['document', 'text', 'checkbox'].includes(String(this.getRequirementImportCell(row, 'نوع الحقل', 'type')).trim().toLowerCase())
                            ? String(this.getRequirementImportCell(row, 'نوع الحقل', 'type')).trim().toLowerCase()
                            : 'document',
                        category: this.mapRequirementImportOption(
                            this.getRequirementImportCell(row, 'الفئة', 'category'), REQUIREMENT_CATEGORIES, 'other'
                        ),
                        priority: this.mapRequirementImportOption(
                            this.getRequirementImportCell(row, 'الأولوية', 'priority'), REQUIREMENT_PRIORITIES, 'medium'
                        ),
                        required: this.parseRequirementImportBoolean(
                            this.getRequirementImportCell(row, 'إلزامي', 'مطلوب', 'required'), true
                        ),
                        hasExpiry,
                        expiryMonths: hasExpiry
                            ? Math.max(1, Number(this.getRequirementImportCell(row, 'مدة الصلاحية بالأشهر', 'expiryMonths')) || 12)
                            : 12,
                        applicableTypes,
                        order: Number(this.getRequirementImportCell(row, 'الترتيب', 'order')) || index + 1
                    };
                }).filter(Boolean).sort((a, b) => a.order - b.order).map((req, index) => ({ ...req, order: index + 1 }));

                if (!requirements.length) {
                    Notification.error('لم يتم العثور على اشتراطات صالحة. تأكد من وجود عمود «اسم الاشتراط».');
                    return;
                }

                if (!confirm(`تم العثور على ${requirements.length} اشتراط صالح. هل تريد استبدال الاشتراطات الحالية؟`)) {
                    return;
                }

                this.ensureRequirementsSetup();
                AppState.companySettings.contractorApprovalRequirements = requirements;
                
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }

                Notification.success(`تم استيراد ${requirements.length} اشتراط من Excel بنجاح`);
                
                // إعادة تحميل الواجهة
                if (this.currentTab === 'requirements') {
                    const requirementsContent = this.safeGetElementById('contractors-requirements-content');
                    if (requirementsContent) {
                        this.renderRequirementsManagementSection().then(html => {
                            // ✅ استخدام safeSetInnerHTML بدلاً من innerHTML مباشرة
                            this.safeSetInnerHTML(requirementsContent, html);
                        });
                    }
                }
            } catch (error) {
                Utils.safeError('خطأ في استيراد القالب:', error);
                Notification.error('فشل استيراد القالب: ' + error.message);
            }
        };
        input.click();
    },

    /**
     * تعديل جماعي للاشتراطات
     */
    bulkEditRequirements() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">التعديل الجماعي</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تغيير الفئة لجميع الاشتراطات المحددة:</label>
                            <select id="bulk-category" class="form-input">
                                <option value="">لا تغيير</option>
                                ${Object.values(REQUIREMENT_CATEGORIES).map(cat => `
                                    <option value="${cat.id}">${cat.label}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">تغيير الأولوية لجميع الاشتراطات المحددة:</label>
                            <select id="bulk-priority" class="form-input">
                                <option value="">لا تغيير</option>
                                ${Object.values(REQUIREMENT_PRIORITIES).map(pri => `
                                    <option value="${pri.id}">${pri.label}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" id="bulk-required">
                                <span class="text-sm text-gray-700">تعيين جميع الاشتراطات كمطلوبة</span>
                            </label>
                        </div>
                        <div>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" id="bulk-has-expiry">
                                <span class="text-sm text-gray-700">إضافة تاريخ انتهاء لجميع الاشتراطات</span>
                            </label>
                        </div>
                        ${document.getElementById('bulk-has-expiry') ? '' : `
                            <div id="bulk-expiry-months-container" style="display: none;">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">عدد أشهر الصلاحية:</label>
                                <input type="number" id="bulk-expiry-months" class="form-input" value="12" min="1" max="60">
                            </div>
                        `}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button class="btn-primary" onclick="Contractors.applyBulkEdit()">تطبيق التعديلات</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.applyModuleI18n(modal);

        // إضافة مستمع لتغيير checkbox تاريخ الانتهاء
        setTimeout(() => {
            const expiryCheckbox = document.getElementById('bulk-has-expiry');
            const expiryContainer = document.getElementById('bulk-expiry-months-container');
            if (expiryCheckbox && expiryContainer) {
                expiryCheckbox.addEventListener('change', (e) => {
                    expiryContainer.style.display = e.target.checked ? 'block' : 'none';
                });
            }
        }, 100);
    },

    /**
     * تطبيق التعديلات الجماعية
     */
    applyBulkEdit() {
        const list = document.getElementById('requirements-list');
        if (!list) return;

        const category = document.getElementById('bulk-category')?.value;
        const priority = document.getElementById('bulk-priority')?.value;
        const required = document.getElementById('bulk-required')?.checked;
        const hasExpiry = document.getElementById('bulk-has-expiry')?.checked;
        const expiryMonths = document.getElementById('bulk-expiry-months')?.value;

        const items = list.querySelectorAll('.requirement-item');
        let updated = 0;

        items.forEach(item => {
            if (category) {
                const categorySelect = item.querySelector('[data-field="category"]');
                if (categorySelect) categorySelect.value = category;
            }
            if (priority) {
                const prioritySelect = item.querySelector('[data-field="priority"]');
                if (prioritySelect) prioritySelect.value = priority;
            }
            if (required !== undefined) {
                const requiredCheckbox = item.querySelector('[data-field="required"]');
                if (requiredCheckbox) requiredCheckbox.checked = required;
            }
            if (hasExpiry !== undefined) {
                const expiryCheckbox = item.querySelector('[data-field="hasExpiry"]');
                if (expiryCheckbox) {
                    expiryCheckbox.checked = hasExpiry;
                    this.toggleExpiryFields(expiryCheckbox);
                    if (hasExpiry && expiryMonths) {
                        const expiryInput = item.querySelector('[data-field="expiryMonths"]');
                        if (expiryInput) expiryInput.value = expiryMonths;
                    }
                }
            }
            updated++;
        });

        Notification.success(`تم تحديث ${updated} اشتراط`);
        document.querySelector('.modal-overlay')?.remove();
    },

    // ===== نظام اعتماد المقاولين =====

    /**
     * التأكد من وجود بيانات طلبات الاعتماد
     * ✅ إصلاح: التأكد من وجود AppState و appData قبل الوصول للبيانات
     */
    /**
     * ✅ إصلاح شامل: دالة ensureData مثل العيادة الطبية - تحفظ البيانات في localStorage
     * تأكد من وجود جميع البيانات وحفظها بشكل ثابت
     */
    ensureData() {
        if (!AppState) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ AppState غير موجود');
            }
            return;
        }
        
        const data = AppState.appData || {};
        let mutated = false;
        
        // ✅ التأكد من وجود جميع المصفوفات (مثل العيادة الطبية)
        if (!Array.isArray(data.contractorApprovalRequests)) {
            data.contractorApprovalRequests = [];
            mutated = true;
        }
        if (!Array.isArray(data.contractorDeletionRequests)) {
            data.contractorDeletionRequests = [];
            mutated = true;
        }
        if (!Array.isArray(data.contractorEvaluationApprovalRequests)) {
            data.contractorEvaluationApprovalRequests = [];
            mutated = true;
        }
        if (!Array.isArray(data.approvedContractors)) {
            data.approvedContractors = [];
            mutated = true;
        }
        if (!Array.isArray(data.contractorEvaluations)) {
            data.contractorEvaluations = [];
            mutated = true;
        }
        if (!Array.isArray(data.contractors)) {
            data.contractors = [];
            mutated = true;
        }
        
        // ✅ حفظ البيانات في AppState مباشرة
        AppState.appData = data;
        
        // ✅ حفظ في localStorage فقط عند تغيير البيانات (منع استدعاء الحفظ عند كل دخول للموديول)
        if (mutated && typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            try {
                window.DataManager.save();
            } catch (saveErr) {
                Utils.safeWarn('⚠️ فشل حفظ البيانات المحلية عند تهيئة المقاولين:', saveErr);
            }
        }
    },

    ensureApprovalRequestsSetup() {
        // ✅ إصلاح: استخدام ensureData الشاملة بدلاً من الكود المتكرر
        this.ensureData();
    },

    ensureDeletionRequestsSetup() {
        // ✅ إصلاح: استخدام ensureData الشاملة بدلاً من الكود المتكرر
        this.ensureData();
    },

    ensureEvaluationApprovalRequestsSetup() {
        this.ensureData();
        this.migrateLegacyEvaluationApprovalRequestsLocally_();
    },

    migrateLegacyEvaluationApprovalRequestsLocally_() {
        if (!AppState?.appData) return;
        const car = AppState.appData.contractorApprovalRequests;
        if (!Array.isArray(car)) return;
        if (!Array.isArray(AppState.appData.contractorEvaluationApprovalRequests)) {
            AppState.appData.contractorEvaluationApprovalRequests = [];
        }
        const cear = AppState.appData.contractorEvaluationApprovalRequests;
        const cearIds = new Set(cear.map((r) => r && r.id).filter(Boolean));
        const legacy = car.filter((r) => r && String(r.requestType || '').trim() === 'evaluation');
        if (!legacy.length) return;
        legacy.forEach((row) => {
            if (!row.id || cearIds.has(row.id)) return;
            cear.push({ ...row, requestType: 'evaluation' });
            cearIds.add(row.id);
        });
        AppState.appData.contractorApprovalRequests = car.filter(
            (r) => !r || String(r.requestType || '').trim() !== 'evaluation'
        );
    },

    findEvaluationApprovalRequest(requestId) {
        this.ensureEvaluationApprovalRequestsSetup();
        const rid = String(requestId || '').trim();
        if (!rid) return null;
        return (AppState.appData.contractorEvaluationApprovalRequests || []).find((r) => {
            if (!r) return false;
            const id = String(r.id || '').trim();
            if (id === rid) return true;
            const legacy = String(r.legacyTempId || r._tempId || '').trim();
            return legacy === rid;
        }) || null;
    },

    mergeEvaluationApprovalRequestsWithLocalOnly(serverRows, localRows) {
        const server = Array.isArray(serverRows) ? serverRows : [];
        const local = Array.isArray(localRows) ? localRows : [];
        const serverIds = new Set(server.map((r) => r && String(r.id || '').trim()).filter(Boolean));
        const localOnly = local.filter((r) => {
            if (!r) return false;
            const id = String(r.id || '').trim();
            if (!id) return false;
            return !serverIds.has(id);
        });
        return [...server, ...localOnly];
    },

    async fetchEvaluationApprovalRequestsFromBackend() {
        try {
            this.ensureEvaluationApprovalRequestsSetup();
            const local = Array.isArray(AppState.appData.contractorEvaluationApprovalRequests)
                ? AppState.appData.contractorEvaluationApprovalRequests.slice()
                : [];
            if (typeof GoogleIntegration === 'undefined') return false;
            const res = await GoogleIntegration.sendRequest({
                action: 'getAllContractorEvaluationApprovalRequests',
                data: { forceRefresh: true, skipCache: true }
            });
            if (res?.success && Array.isArray(res.data)) {
                AppState.appData.contractorEvaluationApprovalRequests =
                    this.mergeEvaluationApprovalRequestsWithLocalOnly(res.data, local);
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }
                return true;
            }
            if (local.length > 0 && typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ جلب طلبات اعتماد التقييم من الخادم فشل أو فارغ — الاحتفاظ بـ ' + local.length + ' طلب محلي');
            }
        } catch (err) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ فشل جلب طلبات اعتماد التقييم:', err);
            }
        }
        return false;
    },

    async syncPendingEvaluationApprovalRequests(targetId) {
        this.ensureEvaluationApprovalRequestsSetup();
        const tid = targetId ? String(targetId).trim() : '';
        const list = AppState.appData.contractorEvaluationApprovalRequests || [];
        const pending = list.filter((r) => {
            if (!r) return false;
            const id = String(r.id || '').trim();
            if (tid) {
                const legacy = String(r.legacyTempId || r._tempId || '').trim();
                if (id !== tid && legacy !== tid) return false;
            }
            return r._isPendingSync || id.startsWith('TEMP_') || r._syncError;
        });
        if (!pending.length) return { synced: 0, failed: 0 };

        let synced = 0;
        let failed = 0;
        for (const req of pending) {
            const syncTempId = String(req.id || '').startsWith('TEMP_')
                ? req.id
                : (req.legacyTempId || req._tempId || req.id);
            try {
                await this.syncEvaluationApprovalRequestToBackend(req, syncTempId);
                synced++;
            } catch (_err) {
                failed++;
            }
        }

        if (synced || failed) {
            this.refreshEvaluationApprovalRequestsSection();
            this.refreshApprovalRequestsSection();
            if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) {
                AppUI.updateNotificationsBadge();
            }
        }
        return { synced, failed };
    },

    /**
     * ✅ تحميل طلبات اعتماد التقييم (منفصل عن syncDataFromServer — لا تلمس مسارات التحميل المحمية)
     */
    ensureEvaluationApprovalRequestsDataLoaded(options = {}) {
        const force = options.force === true;
        const debounceMs = 30000;
        const now = Date.now();
        if (!force && this._evaluationApprovalRequestsLastLoadAt &&
            (now - this._evaluationApprovalRequestsLastLoadAt) < debounceMs) {
            return Promise.resolve(false);
        }
        if (this._evaluationApprovalRequestsSyncInFlight) {
            return this._evaluationApprovalRequestsSyncInFlight;
        }

        const canLoad = typeof GoogleIntegration !== 'undefined' &&
            typeof GoogleIntegration.sendRequest === 'function' &&
            typeof GoogleIntegration._isBackendRpcConfigured === 'function' &&
            GoogleIntegration._isBackendRpcConfigured();

        if (!canLoad) {
            return Promise.resolve(false);
        }

        this.ensureEvaluationApprovalRequestsSetup();
        this._evaluationApprovalRequestsSyncInFlight = this.syncPendingEvaluationApprovalRequests()
            .then(() => this.fetchEvaluationApprovalRequestsFromBackend())
            .then((loaded) => {
                if (loaded) {
                    this._evaluationApprovalRequestsLastLoadAt = Date.now();
                }
                return loaded;
            })
            .catch((err) => {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ فشل مزامنة طلبات اعتماد التقييم:', err);
                }
                return false;
            })
            .finally(() => {
                this._evaluationApprovalRequestsSyncInFlight = null;
            });

        return this._evaluationApprovalRequestsSyncInFlight;
    },

    getMyEvaluationApprovalRequests() {
        this.ensureEvaluationApprovalRequestsSetup();
        const cu = AppState.currentUser || {};
        const currentUserId = String(cu.id || '').trim();
        const currentUserEmail = String(cu.email || '').trim().toLowerCase();
        if (!currentUserId && !currentUserEmail) return [];
        return (AppState.appData.contractorEvaluationApprovalRequests || [])
            .filter((req) => req && this.isCurrentUserApprovalRequestOwner(req))
            .map((req) => ({ ...req, requestType: 'evaluation', requestCategory: 'evaluation_approval' }));
    },

    getPendingEvaluationApprovalRequests() {
        this.ensureEvaluationApprovalRequestsSetup();
        if (!this.isContractorApprovalAdminUser()) return [];
        return (AppState.appData.contractorEvaluationApprovalRequests || [])
            .filter((req) => {
                if (!req || !this.isApprovalRequestPendingForReview(req)) return false;
                if (this.isCurrentUserApprovalRequestOwner(req)) return false;
                const id = String(req.id || '').trim();
                if (req._isPendingSync || id.startsWith('TEMP_')) return false;
                return true;
            })
            .map((req) => ({ ...req, requestType: 'evaluation', requestCategory: 'evaluation_approval' }));
    },

    refreshEvaluationApprovalRequestsSection() {
        if (this.currentTab !== 'evaluations' && this.currentTab !== 'approval-request') return;
        try {
            const myContainer = document.getElementById('my-evaluation-approval-requests-container');
            const pendingContainer = document.getElementById('pending-evaluation-approval-requests-container');
            const pendingAdminContainer = document.getElementById('pending-evaluation-approval-admin-container');
            if (myContainer) {
                myContainer.innerHTML = this.renderApprovalRequestsTable(this.getMyEvaluationApprovalRequests(), false);
            }
            if (this.isContractorApprovalAdminUser()) {
                const pending = this.getPendingEvaluationApprovalRequests();
                if (pendingContainer) pendingContainer.innerHTML = this.renderApprovalRequestsTable(pending, true);
                if (pendingAdminContainer) pendingAdminContainer.innerHTML = this.renderApprovalRequestsTable(pending, true);
            }
        } catch (error) {
            Utils.safeError('خطأ في تحديث طلبات اعتماد التقييم:', error);
        }
    },

    /**
     * إرسال طلب حذف (وظيفة مساعدة)
     */
    async submitDeletionRequest(deletionRequest) {
        this.ensureDeletionRequestsSetup();
        AppState.appData.contractorDeletionRequests.push(deletionRequest);

        // حفظ محلي
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        }

        // حفظ في Google Sheets
        try {
            const result = await GoogleIntegration.callBackend('addContractorDeletionRequest', deletionRequest);
            if (result && result.success) {
                Notification.success('تم إرسال طلب الحذف بنجاح. سيتم مراجعته من قبل مدير النظام.');
                return true;
            } else {
                Notification.warning('تم حفظ الطلب محلياً. سيتم مزامنته عند الاتصال بالإنترنت.');
                return false;
            }
        } catch (error) {
            Utils.safeWarn('فشل إرسال طلب الحذف:', error);
            Notification.warning('تم حفظ الطلب محلياً. سيتم مزامنته عند الاتصال بالإنترنت.');
            return false;
        }
    },

    /**
     * عرض قسم إرسال طلب الاعتماد
     * ✅ إصلاح: جعلها synchronous لضمان التحميل الفوري
     * ✅ محسّن: استخدام cache وتحسين الوصول للبيانات
     */
    renderApprovalRequestSection() {
        // ✅ إصلاح: التأكد من الإعداد مرة واحدة فقط
        this.ensureApprovalRequestsSetup();
        this.ensureDeletionRequestsSetup();
        
        // ✅ إصلاح: التأكد من وجود AppState و appData قبل الوصول للبيانات
        if (!AppState || !AppState.appData) {
            // إذا لم تكن البيانات جاهزة، عرض placeholder ثم تحديثه لاحقاً
            return this.renderApprovalRequestSectionPlaceholder();
        }
        
        const isAdmin = this.isContractorApprovalAdminUser();
        
        // ✅ تحسين: استخدام try-catch لتجنب الأخطاء التي قد تبطئ التحميل
        let myRequests = [];
        let pendingRequests = [];
        
        try {
            // ✅ إصلاح: التأكد من أن البيانات موجودة قبل الوصول إليها
            if (Array.isArray(AppState.appData.contractorApprovalRequests) && 
                Array.isArray(AppState.appData.contractorDeletionRequests)) {
                myRequests = this.getMyApprovalRequests();
            }
        } catch (error) {
            Utils.safeWarn('خطأ في تحميل طلباتي:', error);
            myRequests = [];
        }
        
        if (isAdmin) {
            try {
                if (Array.isArray(AppState.appData.contractorApprovalRequests) && 
                    Array.isArray(AppState.appData.contractorDeletionRequests)) {
                    pendingRequests = this.getPendingApprovalRequests();
                }
            } catch (error) {
                Utils.safeWarn('خطأ في تحميل طلبات المراجعة:', error);
                pendingRequests = [];
            }
        }

        return `
            <div class="content-card contractors-workflow-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <h2 class="card-title"><i class="fas fa-paper-plane ml-2"></i>إرسال طلب اعتماد مقاول أو مقدم خدمة</h2>
                        <div class="flex items-center gap-2 flex-wrap">
                            <span style="padding:5px 9px;border:1px solid rgba(255,255,255,.2);border-radius:8px;background:rgba(255,255,255,.1);font-size:.68rem;font-weight:750;"><i class="fas fa-folder-open ml-1"></i>${myRequests.length} طلب خاص بك</span>
                            ${isAdmin ? `<span style="padding:5px 9px;border:1px solid rgba(255,255,255,.2);border-radius:8px;background:rgba(255,255,255,.1);font-size:.68rem;font-weight:750;"><i class="fas fa-hourglass-half ml-1"></i>${pendingRequests.length} للمراجعة</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="card-body space-y-6">
                    <div class="contractors-request-intro">
                        <div>
                            <h3><i class="fas fa-file-signature ml-2" style="color:#0f8b83;"></i>بدء ملف اعتماد جديد</h3>
                            <p>أدخل بيانات المقاول أو مقدم الخدمة، وأرفق المستندات، ثم أرسله لمسار المراجعة والاعتماد.</p>
                        </div>
                        <button id="send-approval-request-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            إرسال طلب اعتماد جديد
                        </button>
                    </div>

                    <div class="contractors-subsection">
                        <h3 class="contractors-subsection__title"><i class="fas fa-list"></i>طلباتي</h3>
                        <div id="my-approval-requests-container">
                            ${this.renderApprovalRequestsTable(myRequests, false)}
                        </div>
                    </div>

                    <div class="contractors-subsection" id="pending-approval-requests-section" style="display: ${isAdmin ? 'block' : 'none'};">
                        <h3 class="contractors-subsection__title"><i class="fas fa-clipboard-check"></i>طلبات قيد المراجعة (للمدير)</h3>
                        <div id="pending-approval-requests-container">
                            ${isAdmin ? this.renderApprovalRequestsTable(pendingRequests, true) : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * ✅ إصلاح: عرض placeholder عند عدم جاهزية البيانات
     */
    renderApprovalRequestSectionPlaceholder() {
        const isAdmin = this.isContractorApprovalAdminUser();
        const circuitOpen = (typeof GoogleIntegration !== 'undefined' &&
            GoogleIntegration?._circuitBreaker?.isOpen);
        const remainingSeconds = circuitOpen && GoogleIntegration?._circuitBreaker?.openUntil
            ? Math.max(0, Math.ceil((GoogleIntegration._circuitBreaker.openUntil - Date.now()) / 1000))
            : null;

        return `
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-paper-plane ml-2"></i>
                        إرسال طلب اعتماد مقاول أو مقدم خدمة
                    </h2>
                </div>
                <div class="card-body space-y-6">
                    <div class="bg-blue-50 border border-blue-200 rounded p-4">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle ml-2"></i>
                            يمكنك إرسال طلب اعتماد مقاول أو مقدم خدمة جديد. سيتم إرسال الطلب إلى مدير النظام للمراجعة والموافقة.
                        </p>
                    </div>

                    ${circuitOpen ? `
                        <div class="bg-yellow-50 border border-yellow-200 rounded p-4">
                            <p class="text-sm text-yellow-800">
                                <i class="fas fa-exclamation-triangle ml-2"></i>
                                تعذر الاتصال بالخادم مؤقتاً (Circuit Breaker مفتوح)
                                ${remainingSeconds !== null ? `- إعادة المحاولة بعد ${remainingSeconds} ثانية` : ''}
                            </p>
                            <div class="mt-3">
                                <button type="button" class="btn-secondary" onclick="Contractors.bootstrapApprovalRequestsData()">
                                    <i class="fas fa-sync ml-2"></i>
                                    إعادة المحاولة
                                </button>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div>
                        <button id="send-approval-request-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            إرسال طلب اعتماد جديد
                        </button>
                    </div>

                    <div class="border-t pt-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            <i class="fas fa-list ml-2"></i>
                            طلباتي
                        </h3>
                        <div id="my-approval-requests-container">
                            <div class="empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500">جاري تحميل البيانات...</p>
                            </div>
                        </div>
                    </div>

                    ${isAdmin ? `
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">
                                <i class="fas fa-clipboard-check ml-2"></i>
                                طلبات قيد المراجعة (للمدير)
                            </h3>
                            <div id="pending-approval-requests-container">
                                <div class="empty-state">
                                    <div style="width: 300px; margin: 0 auto 16px;">
                                        <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                        </div>
                                    </div>
                                    <p class="text-gray-500">جاري تحميل البيانات...</p>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    /**
     * عرض جدول طلبات الاعتماد
     */
    renderApprovalRequestsTable(requests, isAdminView = false) {
        if (!requests || requests.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500">لا توجد طلبات ${isAdminView ? 'قيد المراجعة' : 'مسجلة'}</p>
                </div>
            `;
        }

        return `
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>نوع الطلب</th>
                            <th>اسم المقاول / الجهة</th>
                            <th>تاريخ الإرسال</th>
                            <th>الحالة</th>
                            ${isAdminView ? '<th>الإجراءات</th>' : '<th>التفاصيل</th>'}
                        </tr>
                    </thead>
                    <tbody>
                        ${requests.map(request => {
            // ✅ تحسين: إظهار حالة المزامنة للطلبات المحلية
            let syncStatusBadge = '';
            if (request._isPendingSync) {
                syncStatusBadge = '<span class="badge badge-info" title="قيد المزامنة مع الخادم"><i class="fas fa-sync fa-spin ml-1"></i> قيد المزامنة</span>';
            } else if (request._syncError) {
                syncStatusBadge = '<span class="badge badge-warning" title="' + (request._syncErrorMessage || 'فشل المزامنة') + '"><i class="fas fa-exclamation-triangle ml-1"></i> خطأ في المزامنة</span>';
            }
            
            const statusBadge = this.getApprovalRequestStatusBadge(request.status);
            const isDeletionRequest = request.requestCategory === 'deletion';
            const isEvaluationRequest = request.requestCategory === 'evaluation_approval' ||
                (!isDeletionRequest && request.requestType === 'evaluation');
            const requestCategory = isDeletionRequest ? 'deletion' :
                (isEvaluationRequest ? 'evaluation_approval' : 'approval');
            let requestType;
            if (isDeletionRequest) {
                requestType = request.requestType === 'contractor' ? 'حذف مقاول' :
                    request.requestType === 'approved_entity' ? 'حذف معتمد' :
                        request.requestType === 'evaluation' ? 'حذف تقييم' : 'حذف';
            } else if (isEvaluationRequest) {
                requestType = 'طلب تقييم';
            } else {
                requestType = request.requestType === 'contractor' ? 'اعتماد مقاول' : 'اعتماد مورد';
            }
            const entityName = isDeletionRequest
                ? (request.entityName || request.companyName || '')
                : isEvaluationRequest
                    ? (request.contractorName || '')
                    : (request.companyName || request.contractorName || '');

            return `
                                <tr ${request._isPendingSync ? 'style="opacity: 0.8;"' : ''}>
                                    <td>
                                        ${isDeletionRequest ? '<span class="badge badge-warning">حذف</span> ' : ''}
                                        ${isEvaluationRequest ? '<span class="badge badge-info">تقييم</span> ' : ''}
                                        ${requestType}
                                    </td>
                                    <td>${Utils.escapeHTML(entityName)}</td>
                                    <td>${request.createdAt ? Utils.formatDate(request.createdAt) : '-'}</td>
                                    <td>
                                        ${statusBadge}
                                        ${syncStatusBadge ? '<br>' + syncStatusBadge : ''}
                                    </td>
                                    <td>
                                        ${isAdminView ? `
                                            <div class="flex items-center gap-2">
                                                <button class="btn-icon btn-icon-info" title="عرض التفاصيل" onclick="Contractors.viewApprovalRequest('${request.id}', '${requestCategory}')">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                ${this.isApprovalRequestPendingForReview(request) ? `
                                                    <button class="btn-icon btn-icon-success" title="اعتماد" onclick="Contractors.approveRequest('${request.id}', '${requestCategory}')">
                                                        <i class="fas fa-check"></i>
                                                    </button>
                                                    <button class="btn-icon btn-icon-danger" title="رفض" onclick="Contractors.rejectRequest('${request.id}', '${requestCategory}')">
                                                        <i class="fas fa-times"></i>
                                                    </button>
                                                ` : ''}
                                            </div>
                                        ` : `
                                            <button class="btn-icon btn-icon-info" title="عرض التفاصيل" onclick="Contractors.viewApprovalRequest('${request.id}', '${requestCategory}')">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        `}
                                    </td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    /**
     * الحصول على طلبات الاعتماد الخاصة بالمستخدم
     * ✅ محسّن: تحسين الأداء وتقليل العمليات غير الضرورية
     */
    getMyApprovalRequests() {
        // ✅ تحسين: التأكد من الإعداد مرة واحدة فقط
        if (!Array.isArray(AppState.appData.contractorApprovalRequests)) {
            AppState.appData.contractorApprovalRequests = [];
        }
        if (!Array.isArray(AppState.appData.contractorDeletionRequests)) {
            AppState.appData.contractorDeletionRequests = [];
        }
        
        const cu = AppState.currentUser || {};
        const currentUserId = String(cu.id || '').trim();
        const currentUserEmail = String(cu.email || '').trim().toLowerCase();
        if (!currentUserId && !currentUserEmail) return [];
        
        // ✅ تحسين: استخدام filter و map بشكل أكثر كفاءة
        // ✅ إصلاح: استثناء الطلبات المعتمدة القديمة (أكثر من 7 أيام) لتجنب الازدحام
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const approvalRequests = AppState.appData.contractorApprovalRequests
            .map((req) => this.normalizeApprovalRequestRecord(req))
            .filter(req => req && this.isCurrentUserApprovalRequestOwner(req))
            .filter(req => String(req.requestType || '').trim() !== 'evaluation')
            .filter(req => {
                const st = this.normalizeApprovalRequestStatus(req.status);
                if (st === 'approved' && req.approvedAt) {
                    const approvedDate = new Date(req.approvedAt);
                    return approvedDate >= sevenDaysAgo;
                }
                return true;
            })
            .map(req => ({ ...req, requestCategory: 'approval' }));
        
        const deletionRequests = AppState.appData.contractorDeletionRequests
            .map((req) => this.normalizeApprovalRequestRecord(req))
            .filter(req => req && this.isCurrentUserApprovalRequestOwner(req))
            .filter(req => {
                const st = this.normalizeApprovalRequestStatus(req.status);
                if (st === 'approved' && req.approvedAt) {
                    const approvedDate = new Date(req.approvedAt);
                    return approvedDate >= sevenDaysAgo;
                }
                return true;
            })
            .map(req => ({ ...req, requestCategory: 'deletion' }));
        
        // ✅ تحسين: دمج وترتيب في خطوة واحدة
        const allRequests = [...approvalRequests, ...deletionRequests, ...this.getMyEvaluationApprovalRequests()];
        return allRequests.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA; // الأحدث أولاً
        });
    },

    /**
     * الحصول على طلبات الاعتماد قيد المراجعة (للمدير)
     */
    getPendingApprovalRequests() {
        if (!Array.isArray(AppState.appData.contractorApprovalRequests)) {
            AppState.appData.contractorApprovalRequests = [];
        }
        if (!Array.isArray(AppState.appData.contractorDeletionRequests)) {
            AppState.appData.contractorDeletionRequests = [];
        }

        const approvalRequests = AppState.appData.contractorApprovalRequests
            .map((req) => this.normalizeApprovalRequestRecord(req))
            .filter(req => req && this.isApprovalRequestPendingForReview(req))
            .filter(req => String(req.requestType || '').trim() !== 'evaluation')
            .map(req => ({ ...req, requestCategory: 'approval' }));

        const deletionRequests = AppState.appData.contractorDeletionRequests
            .map((req) => this.normalizeApprovalRequestRecord(req))
            .filter(req => req && this.isApprovalRequestPendingForReview(req))
            .map(req => ({ ...req, requestCategory: 'deletion' }));

        const evaluationRequests = this.getPendingEvaluationApprovalRequests();
        
        // ✅ تحسين: دمج وترتيب في خطوة واحدة
        const allRequests = [...approvalRequests, ...deletionRequests, ...evaluationRequests];
        return allRequests.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateA - dateB; // الأقدم أولاً (للمراجعة)
        });
    },

    /**
     * الحصول على شارة حالة طلب الاعتماد
     */
    getApprovalRequestStatusBadge(status) {
        const normalizedStatus = this.normalizeApprovalRequestStatus(status);
        const statusMap = {
            'pending': { label: 'تم الإرسال', class: 'badge-warning' },
            'under_review': { label: 'تحت المراجعة', class: 'badge-info' },
            'approved': { label: 'معتمد', class: 'badge-success' },
            'rejected': { label: 'مرفوض', class: 'badge-danger' }
        };
        const statusInfo = statusMap[normalizedStatus] || { label: 'غير معروف', class: 'badge-secondary' };
        return `<span class="badge ${statusInfo.class}">${statusInfo.label}</span>`;
    },

    /**
     * عرض نموذج إرسال طلب الاعتماد
     */
    showApprovalRequestForm() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'contractor-approval-request-modal';
        modal.innerHTML = `
            <div class="approval-premium-content" style="max-width:880px;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(15,23,42,0.2);background:#f8fafc;">

                <!-- HEADER: Deep navy gradient with micro-pattern -->
                <div class="approval-premium-header">
                    <div class="approval-premium-header-shine"></div>
                    <div style="position:relative;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.12);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="fas fa-paper-plane" style="font-size:16px;color:#fff;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.2));"></i>
                            </div>
                            <div>
                                <h2 style="margin:0;font-size:1rem;font-weight:700;color:#fff;letter-spacing:0.01em;">طلب اعتماد مقاول / مورد</h2>
                                <p style="margin:2px 0 0;font-size:0.75rem;color:rgba(255,255,255,0.65);font-weight:400;">يُرفع إلى مدير النظام للمراجعة والاعتماد</p>
                            </div>
                        </div>
                        <button type="button" class="modal-close" style="color:rgba(255,255,255,0.5);width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);transition:all 0.2s;flex-shrink:0;" onmouseover="this.style.background='rgba(255,255,255,0.18)';this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.5)'" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times" style="font-size:12px;"></i>
                        </button>
                    </div>
                </div>

                <!-- BODY compact -->
                <div class="approval-premium-body approval-body-compact">
                    <div id="approval-request-validation-hint" style="display:none;margin-bottom:10px;padding:10px 14px;border-radius:8px;background:linear-gradient(135deg,#fef2f2,#fff5f5);border:1px solid #fecaca;color:#b91c1c;font-size:0.82rem;align-items:center;gap:8px;">
                        <i class="fas fa-exclamation-circle" style="font-size:14px;color:#ef4444;flex-shrink:0;"></i>
                        <span id="approval-request-validation-message"></span>
                    </div>
                    <form id="approval-request-form">

                        <!-- COMBINED SECTION: بيانات الطلب والتواصل -->
                        <div class="approval-premium-section approval-section-compact">
                            <h3 class="approval-premium-section-title">
                                <i class="fas fa-clipboard-list" style="color:#3b82f6;font-size:12px;"></i>
                                بيانات الطلب والتواصل
                            </h3>
                            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
                                <div style="grid-column:1/-1;">
                                    <label class="approval-premium-label">نوع الطلب *</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-tag approval-premium-input-icon"></i>
                                        <select id="approval-request-type" class="approval-premium-select" required>
                                            <option value="">اختر نوع الطلب</option>
                                            <option value="contractor">اعتماد مقاول جديد</option>
                                            <option value="supplier">اعتماد مورد جديد</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">اسم الشركة *</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-building approval-premium-input-icon"></i>
                                        <input type="text" id="approval-request-company-name" class="approval-premium-input" required placeholder="اسم الشركة أو المقاول" autocomplete="organization">
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">رقم الترخيص *</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-receipt approval-premium-input-icon"></i>
                                        <input type="text" id="approval-request-license" class="approval-premium-input" required placeholder="رقم السجل">
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">نوع الخدمة *</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-wrench approval-premium-input-icon"></i>
                                        <input type="text" id="approval-request-service-type" class="approval-premium-input" required placeholder="النشاط المطلوب">
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">الشخص المسؤول</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-user approval-premium-input-icon"></i>
                                        <input type="text" id="approval-request-contact-person" class="approval-premium-input" placeholder="الاسم">
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">رقم الهاتف</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-phone approval-premium-input-icon"></i>
                                        <input type="tel" id="approval-request-phone" class="approval-premium-input" placeholder="05X XXX XXXX" dir="ltr">
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">البريد الإلكتروني</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-envelope approval-premium-input-icon"></i>
                                        <input type="email" id="approval-request-email" class="approval-premium-input" placeholder="email@example.com" dir="ltr">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- COMPACT SECTION: ملاحظات ومرفقات -->
                        <div class="approval-premium-section approval-section-compact">
                            <h3 class="approval-premium-section-title">
                                <i class="fas fa-sticky-note" style="color:#f59e0b;font-size:12px;"></i>
                                ملاحظات ومرفقات
                            </h3>
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                                <div>
                                    <textarea id="approval-request-notes" class="approval-premium-textarea" rows="2" placeholder="ملاحظات إضافية للمراجعة..."></textarea>
                                </div>
                                <div>
                                    <div class="approval-premium-dropzone-compact" id="approval-dropzone">
                                        <i class="fas fa-cloud-upload-alt" style="font-size:18px;color:#94a3b8;flex-shrink:0;"></i>
                                        <span style="flex:1;font-size:0.82rem;color:#64748b;">إضافة مرفقات</span>
                                        <button type="button" class="btn-secondary btn-sm" id="approval-upload-btn" style="font-size:0.75rem;padding:4px 12px;border-radius:6px;">
                                            <i class="fas fa-folder-open ml-1"></i>
                                            تصفح
                                        </button>
                                        <input type="file" id="approval-request-attachments" style="display:none;" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx">
                                    </div>
                                    <p style="margin:4px 0 0;font-size:0.68rem;color:#94a3b8;">PDF, Word, Excel, صور — حد 5MB</p>
                                    <div id="approval-request-attachments-list" style="margin-top:6px;display:flex;flex-direction:column;gap:4px;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- SECTION 5: Admin Custom Fields -->
                        ${Permissions.isAdmin() ? `
                        <div class="approval-premium-section approval-section-compact" style="border-color:#e0e7ff;">
                            <h3 class="approval-premium-section-title">
                                <i class="fas fa-cog" style="color:#6366f1;font-size:12px;"></i>
                                بنود إضافية (للمدير)
                            </h3>
                            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                                <span style="font-size:0.78rem;color:#64748b;">أضف بنوداً إضافية لطلب الاعتماد</span>
                                <button type="button" id="add-custom-field-btn" class="btn-secondary btn-sm" style="font-size:0.75rem;padding:4px 12px;border-radius:6px;">
                                    <i class="fas fa-plus ml-1"></i>
                                    إضافة بند
                                </button>
                            </div>
                            <div id="custom-fields-container" style="display:flex;flex-direction:column;gap:6px;"></div>
                        </div>
                        ` : ''}

                        <!-- FOOTER compact -->
                        <div style="display:flex;justify-content:flex-end;align-items:center;gap:8px;padding-top:8px;border-top:1px solid #e2e8f0;">
                            <button type="button" class="btn-secondary" id="approval-request-cancel-btn" style="padding:7px 18px;border-radius:8px;font-size:0.82rem;">
                                إلغاء
                            </button>
                            <button type="submit" class="btn-primary" id="approval-request-submit-btn" style="padding:7px 22px;border-radius:8px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border:none;font-weight:600;font-size:0.82rem;">
                                <i class="fas fa-paper-plane ml-1"></i>
                                <span class="submit-text">إرسال الطلب</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.applyModuleI18n(modal);

        // إعداد معالجة المرفقات مع Drag & Drop
        const attachmentsInput = modal.querySelector('#approval-request-attachments');
        const attachmentsList = modal.querySelector('#approval-request-attachments-list');
        const uploadBtn = modal.querySelector('#approval-upload-btn');
        const dropzone = modal.querySelector('#approval-dropzone');
        const attachments = [];
        const attachmentNames = new Set();

        const addAttachment = (file) => {
            if (file.size > 5 * 1024 * 1024) {
                Notification.warning(`الملف ${file.name} يتجاوز الحد الأقصى المسموح (5MB)`);
                return false;
            }
            if (attachmentNames.has(file.name)) return false;
            attachmentNames.add(file.name);
            attachments.push(file);
            const fileItem = document.createElement('div');
            fileItem.className = 'approval-premium-file-item approval-premium-file-item-compact';
            fileItem.setAttribute('data-file-name', file.name);
            const isImage = file.type.startsWith('image/');
            fileItem.innerHTML = `
                <div style="display:flex;align-items:center;gap:8px;">
                    <i class="fas ${isImage ? 'fa-file-image' : 'fa-file'}" style="color:${isImage ? '#10b981' : '#3b82f6'};font-size:13px;"></i>
                    <div>
                        <p style="margin:0;font-weight:500;color:#1e293b;line-height:1.3;">${Utils.escapeHTML(file.name)}</p>
                        <p class="file-size" style="margin:0;color:#94a3b8;">${(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                </div>
                <button type="button" class="remove-attachment-btn" style="width:24px;height:24px;border-radius:6px;border:none;background:transparent;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;" onmouseover="this.style.background='#fef2f2';this.style.color='#ef4444'" onmouseout="this.style.background='transparent';this.style.color='#94a3b8'">
                    <i class="fas fa-times" style="font-size:10px;"></i>
                </button>
            `;
            fileItem.querySelector('.remove-attachment-btn').addEventListener('click', () => {
                attachmentNames.delete(file.name);
                const idx = attachments.indexOf(file);
                if (idx !== -1) attachments.splice(idx, 1);
                fileItem.remove();
            });
            attachmentsList.appendChild(fileItem);
            return true;
        };

        if (uploadBtn && attachmentsInput) {
            uploadBtn.addEventListener('click', () => attachmentsInput.click());
        }

        if (dropzone) {
            ['dragenter', 'dragover'].forEach(evt => {
                dropzone.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); dropzone.classList.add('drag-over'); });
            });
            ['dragleave', 'drop'].forEach(evt => {
                dropzone.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); dropzone.classList.remove('drag-over'); });
            });
            dropzone.addEventListener('drop', (e) => {
                Array.from(e.dataTransfer.files).forEach(f => addAttachment(f));
            });
        }

        if (attachmentsInput) {
            attachmentsInput.addEventListener('change', (e) => {
                Array.from(e.target.files).forEach(f => addAttachment(f));
                e.target.value = '';
            });
        }

        // إعداد الحقول المخصصة للمدير
        if (Permissions.isAdmin()) {
            const addCustomFieldBtn = modal.querySelector('#add-custom-field-btn');
            const customFieldsContainer = modal.querySelector('#custom-fields-container');
            let customFieldIndex = 0;

            if (addCustomFieldBtn && customFieldsContainer) {
                addCustomFieldBtn.addEventListener('click', () => {
                    const fieldId = `custom-field-${customFieldIndex++}`;
                    const fieldItem = document.createElement('div');
                    fieldItem.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;';
                    fieldItem.innerHTML = `
                        <input type="text" class="approval-premium-input" style="padding:5px 10px;font-size:0.8rem;border-radius:6px;padding-right:10px;flex:1;" placeholder="اسم البند" data-field-id="${fieldId}">
                        <select class="approval-premium-select" style="width:90px;padding:5px 10px;font-size:0.78rem;border-radius:6px;padding-right:10px;" data-field-type="${fieldId}">
                            <option value="text">نص</option>
                            <option value="document">مستند</option>
                            <option value="checkbox">خانة</option>
                        </select>
                        <label style="display:flex;align-items:center;gap:3px;font-size:0.76rem;color:#64748b;white-space:nowrap;">
                            <input type="checkbox" data-field-required="${fieldId}">
                            إلزامي
                        </label>
                        <button type="button" style="width:22px;height:22px;border-radius:5px;border:none;background:transparent;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;" onmouseover="this.style.background='#fef2f2';this.style.color='#ef4444'" onmouseout="this.style.background='transparent';this.style.color='#94a3b8'" onclick="this.parentElement.remove()">
                            <i class="fas fa-times" style="font-size:9px;"></i>
                        </button>
                    `;
                    customFieldsContainer.appendChild(fieldItem);
                });
            }
        }

        const form = modal.querySelector('#approval-request-form');
        const cancelBtn = modal.querySelector('#approval-request-cancel-btn');
        let isSubmitting = false;

        if (!form) {
            Utils.safeWarn('⚠️ showApprovalRequestForm: form غير موجود');
            modal.remove();
            return;
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => modal.remove());
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!modal || !document.contains(modal)) {
                Utils.safeWarn('⚠️ submit: modal غير موجود أو تم حذفه');
                return;
            }

            if (isSubmitting) {
                Utils.safeLog('⚠️ محاولة إرسال مكررة - تم تجاهلها');
                return;
            }

            isSubmitting = true;
            const hintEl = modal.querySelector('#approval-request-validation-hint');
            if (hintEl) {
                hintEl.style.display = 'none';
                const msgEl = hintEl.querySelector('#approval-request-validation-message');
                if (msgEl) msgEl.textContent = '';
            }

            this.submitApprovalRequest(modal, attachments).finally(() => {
                isSubmitting = false;
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    /**
     * إرسال طلب الاعتماد
     * ✅ محسّن: استجابة سريعة، حفظ محلي أولاً، إغلاق سريع، مزامنة في الخلفية
     */
    async submitApprovalRequest(modal, attachments = []) {
        try {
            if (!modal || !modal.parentNode) {
                Utils.safeWarn('⚠️ submitApprovalRequest: modal غير موجود أو تم حذفه');
                return;
            }

            const form = modal.querySelector('#approval-request-form');
            if (!form) {
                Utils.safeWarn('⚠️ submitApprovalRequest: form غير موجود');
                Notification.warning('حدث خطأ في النموذج. يرجى تحديث الصفحة وإعادة المحاولة.');
                return;
            }

            // جمع الحقول المخصصة للمدير
            const customFields = [];
            if (Permissions.isAdmin()) {
                const customFieldsContainer = form.querySelector('#custom-fields-container');
                if (customFieldsContainer) {
                    const fieldItems = customFieldsContainer.querySelectorAll('[data-field-id]');
                    fieldItems.forEach(item => {
                        const fieldId = item.getAttribute('data-field-id');
                        const fieldName = item.value.trim();
                        if (fieldName) {
                            const fieldType = form.querySelector(`[data-field-type="${fieldId}"]`)?.value || 'text';
                            const isRequired = form.querySelector(`[data-field-required="${fieldId}"]`)?.checked || false;
                            customFields.push({
                                id: Utils.generateId('CUSTOM'),
                                name: fieldName,
                                type: fieldType,
                                required: isRequired
                            });
                        }
                    });
                }
            }

            // ✅ حفظ مراجع العناصر قبل أي عمليات async
            const typeSelect = form.querySelector('#approval-request-type');
            const companyInput = form.querySelector('#approval-request-company-name');
            const serviceInput = form.querySelector('#approval-request-service-type');
            const licenseInput = form.querySelector('#approval-request-license');
            const contactInput = form.querySelector('#approval-request-contact-person');
            const phoneInput = form.querySelector('#approval-request-phone');
            const emailInput = form.querySelector('#approval-request-email');
            const notesTextarea = form.querySelector('#approval-request-notes');
            
            if (!typeSelect || !companyInput || !serviceInput || !licenseInput) {
                Utils.safeWarn('⚠️ submitApprovalRequest: الحقول المطلوبة غير موجودة');
                Notification.warning('حدث خطأ في النموذج. يرجى تحديث الصفحة وإعادة المحاولة.');
                return;
            }
            
            // ✅ إزالة توليد ID من Frontend - Backend سيتولى توليده بشكل تسلسلي (CAR_1, CAR_2, ...)
            const requestData = {
                // id سيتم توليده في Backend باستخدام generateSequentialId('CAR', ...)
                requestType: typeSelect.value,
                companyName: companyInput.value.trim(),
                serviceType: serviceInput.value.trim(),
                licenseNumber: licenseInput.value.trim(),
                contactPerson: (contactInput?.value || '').trim(),
                phone: (phoneInput?.value || '').trim(),
                email: (emailInput?.value || '').trim(),
                notes: (notesTextarea?.value || '').trim(),
                attachments: [], // ✅ سيتم ملء المرفقات لاحقاً في الخلفية
                attachmentFiles: attachments, // ✅ حفظ الملفات للرفع لاحقاً
                customFields: customFields,
                status: 'pending',
                createdAt: new Date().toISOString(),
                createdBy: AppState.currentUser?.id || '',
                createdByName: AppState.currentUser?.name || ''
            };

            const validation = this.validateNewApprovalRequest(requestData);
            if (!validation.ok) {
                const hintEl = modal.querySelector('#approval-request-validation-hint');
                if (hintEl) {
                    const msgEl = hintEl.querySelector('#approval-request-validation-message');
                    if (msgEl) {
                        msgEl.textContent = validation.message;
                    } else {
                        hintEl.textContent = validation.message;
                    }
                    hintEl.style.display = 'flex';
                }
                Notification.error(validation.message);
                return;
            }

            this.ensureApprovalRequestsSetup();
            
            // ✅ حفظ محلياً أولاً للاستجابة السريعة
            const tempId = 'TEMP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            requestData.id = tempId;
            requestData._isPendingSync = true;
            
            AppState.appData.contractorApprovalRequests.push(requestData);
            
            this._closeApprovalRequestModal(modal);

            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            Utils.safeLog('✅ تم حفظ الطلب محلياً. ID مؤقت: ' + tempId);

            Notification.success('تم إرسال الطلب. جاري المزامنة مع الخادم...');

            this.refreshApprovalRequestsSection();
            this._scheduleApprovalNotificationsRefresh();

            this.syncApprovalRequestToBackend(requestData, attachments, tempId)
                .then(() => {
                    Utils.safeLog('✅ تمت مزامنة الطلب بنجاح.');
                    this.refreshApprovalRequestsSection();
                    this._scheduleApprovalNotificationsRefresh();
                })
                .catch((error) => {
                    Utils.safeError('❌ خطأ في مزامنة الطلب مع Backend:', error);
                });

        } catch (error) {
            Utils.safeError('خطأ في إرسال طلب الاعتماد:', error);
            Notification.error('تعذر إرسال طلب الاعتماد: ' + error.message);
        }
    },
    
    /**
     * ✅ جديد: مزامنة طلب الاعتماد مع Backend في الخلفية
     */
    async syncApprovalRequestToBackend(requestData, attachments = [], tempId) {
        const sourceRequest = requestData;
        if (String(sourceRequest?.requestType || '').trim() === 'evaluation') {
            return this.syncEvaluationApprovalRequestToBackend(sourceRequest, tempId);
        }
        requestData = this.prepareApprovalRequestPayloadForBackend(sourceRequest);

        // ✅ إضافة حماية من المزامنة المتكررة لنفس الطلب
        const syncKey = `sync_${tempId || sourceRequest?.id || Date.now()}`;
        if (this._activeSyncs && this._activeSyncs[syncKey]) {
            Utils.safeLog('⚠️ syncApprovalRequestToBackend: مزامنة قيد المعالجة لنفس الطلب - تم تجاهل الاستدعاء المكرر');
            return;
        }
        
        // ✅ تسجيل المزامنة النشطة
        if (!this._activeSyncs) {
            this._activeSyncs = {};
        }
        this._activeSyncs[syncKey] = true;
        
        try {
            // ✅ رفع المرفقات في الخلفية (متوازي إذا أمكن)
            let attachmentUrls = [];
            if (attachments && attachments.length > 0) {
                try {
                    // ✅ رفع الملفات بشكل متوازي لتحسين الأداء
                    const uploadPromises = attachments.map(async (file) => {
                        try {
                        // تحويل الملف إلى base64
                        const base64Data = await new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                                const base64 = reader.result.split(',')[1];
                                resolve(base64);
                            };
                            reader.onerror = reject;
                            reader.readAsDataURL(file);
                        });

                        const uploadResult = await GoogleIntegration.uploadFileToDrive(
                            base64Data,
                            file.name,
                            file.type,
                            'contractor-approval-attachments'
                        );
                        if (uploadResult && uploadResult.url) {
                                return {
                                name: file.name,
                                url: uploadResult.url,
                                size: file.size,
                                type: file.type
                                };
                            }
                            return null;
                        } catch (error) {
                            Utils.safeWarn('فشل رفع الملف ' + file.name + ':', error);
                            return null;
                        }
                    });
                    
                    const results = await Promise.all(uploadPromises);
                    attachmentUrls = results.filter(url => url !== null);
                    
                    if (attachmentUrls.length < attachments.length) {
                        Utils.safeWarn('⚠️ فشل رفع بعض المرفقات. تم رفع ' + attachmentUrls.length + ' من ' + attachments.length);
                    }
                } catch (error) {
                    Utils.safeWarn('فشل رفع بعض المرفقات:', error);
                }
            }
            
            // ✅ تحديث requestData بالمرفقات المرفوعة
            requestData.attachments = attachmentUrls;
            delete requestData.attachmentFiles; // ✅ حذف الملفات الأصلية بعد الرفع
            
            const actualTempId = tempId || sourceRequest?.id || requestData.id;
            delete requestData.id;

            Utils.safeLog('🔄 إرسال الطلب إلى Backend بدون ID (tempId=' + actualTempId + ' سيتم استبداله بـ CAR_... من Backend)');
            
            // ✅ إرسال الطلب إلى Backend
                const backendResult = await GoogleIntegration.sendRequest({
                    action: 'addContractorApprovalRequest',
                    data: requestData
                });

                if (backendResult && backendResult.success) {
                // ✅ بعد نجاح الحفظ في Backend، استخدام البيانات من Backend مع ID المولد
                const savedRequest = backendResult.data || requestData;
                    
                // ✅ التحقق من أن Backend قام بتوليد ID جديد (CAR_1, CAR_2, ...)
                if (!savedRequest.id || savedRequest.id.startsWith('TEMP_')) {
                    Utils.safeError('❌ خطأ: Backend لم يولد ID جديد. savedRequest.id=' + (savedRequest.id || 'undefined'));
                    // محاولة توليد ID يدوياً كحل بديل (لا ينبغي أن يحدث)
                    savedRequest.id = 'CAR_' + Date.now();
                }
                
                // ✅ التحقق من أن ID الجديد يبدأ بـ "CAR_"
                if (!savedRequest.id || !savedRequest.id.startsWith('CAR_')) {
                    Utils.safeWarn('⚠️ تحذير: ID المُولد لا يبدأ بـ CAR_. ID=' + (savedRequest.id || 'undefined'));
                    }
                    
                // ✅ actualTempId تم تعريفه سابقاً في بداية الدالة (السطر 7639)
                // ✅ استخدامه للبحث عن الطلب المؤقت واستبداله
                
                Utils.safeLog('✅ تم استبدال tempId=' + actualTempId + ' بالـ ID الفعلي=' + savedRequest.id);
                
                // ✅ إيجاد الطلب المؤقت واستبداله بالطلب الفعلي (البحث بكل الاحتمالات)
                let tempIndex = AppState.appData.contractorApprovalRequests.findIndex(r => r.id === actualTempId);
                
                // ✅ إذا لم يوجد بـ actualTempId، البحث بـ tempId
                if (tempIndex === -1 && actualTempId !== tempId) {
                    tempIndex = AppState.appData.contractorApprovalRequests.findIndex(r => r.id === tempId);
                }
                
                // ✅ إذا لم يوجد بعد، البحث بـ companyName/contractorName و status pending
                if (tempIndex === -1) {
                    tempIndex = AppState.appData.contractorApprovalRequests.findIndex(r => {
                        if (r.status !== 'pending') return false;
                        if (!(r.id?.startsWith('TEMP_') || r._isPendingSync)) return false;
                        if (requestData.requestType === 'evaluation') {
                            return r.requestType === 'evaluation' && (
                                r.contractorId === requestData.contractorId ||
                                r.contractorName === requestData.contractorName
                            );
                        }
                        return r.companyName === requestData.companyName;
                    });
                }
                
                if (tempIndex !== -1) {
                    const oldId = AppState.appData.contractorApprovalRequests[tempIndex].id;
                    const preservedEvaluationData = AppState.appData.contractorApprovalRequests[tempIndex].evaluationData;
                    AppState.appData.contractorApprovalRequests[tempIndex] = {
                        ...AppState.appData.contractorApprovalRequests[tempIndex],
                        ...savedRequest,
                        id: savedRequest.id,
                        evaluationData: savedRequest.evaluationData || preservedEvaluationData,
                        _isPendingSync: false,
                        _syncError: false
                    };
                    delete AppState.appData.contractorApprovalRequests[tempIndex]._isPendingSync;
                    delete AppState.appData.contractorApprovalRequests[tempIndex]._syncError;
                    delete AppState.appData.contractorApprovalRequests[tempIndex]._syncErrorMessage;
                    
                    Utils.safeLog('✅ تم استبدال الطلب المؤقت في AppState. oldID=' + oldId + ' -> newID=' + savedRequest.id + ', tempIndex=' + tempIndex);
                } else {
                    // ✅ إذا لم يوجد الطلب المؤقت، إضافته مباشرة
                    Utils.safeWarn('⚠️ تحذير: لم يتم العثور على الطلب المؤقت في AppState. tempId=' + actualTempId);
                    // ✅ التأكد من وجود ID صحيح
                    if (!savedRequest.id || savedRequest.id.startsWith('TEMP_')) {
                        Utils.safeError('❌ خطأ: savedRequest.id غير صحيح. savedRequest.id=' + (savedRequest.id || 'undefined'));
                        savedRequest.id = 'CAR_' + Date.now();
                    }
                    savedRequest._isPendingSync = false;
                    AppState.appData.contractorApprovalRequests.push(savedRequest);
                    Utils.safeLog('✅ تم إضافة الطلب الجديد مباشرة إلى AppState. newID=' + savedRequest.id);
                }
                
                // ✅ تحديث requestData بالبيانات الكاملة من Backend (مع ID الجديد)
                Object.assign(requestData, savedRequest);
                requestData.id = savedRequest.id; // ✅ التأكد من استخدام ID الجديد
                
                // حفظ البيانات المحلية المحدثة
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }
                
                Utils.safeLog('✅ تم مزامنة طلب الاعتماد مع Backend بنجاح. ID: ' + (requestData.id || 'N/A'));
                
                // ✅ تحديث العرض بعد المزامنة الناجحة (مع حماية من التحديثات المتكررة)
                // ✅ استخدام debounced refresh لمنع التحديثات المتكررة
                if (this.currentTab === 'approval-request') {
            this.refreshApprovalRequestsSection();
                }

                // ✅ إرسال إشعارات Real-time لجميع المديرين المتصلين
            try {
                if (typeof RealtimeSyncManager !== 'undefined' && RealtimeSyncManager.notifyChange) {
                    RealtimeSyncManager.notifyChange('contractorApprovalRequests', 'add', requestData.id);
                    Utils.safeLog('✅ تم إرسال إشعار Real-time بالطلب الجديد');
                }

                // تحديث البيانات عبر BroadcastChannel للتبويبات المفتوحة
                if (typeof RealtimeSyncManager !== 'undefined' && RealtimeSyncManager.state && RealtimeSyncManager.state.broadcastChannel) {
                    RealtimeSyncManager.state.broadcastChannel.postMessage({
                        type: 'DATA_CHANGED',
                        module: 'contractors',
                        action: 'approvalRequestAdded',
                        data: {
                            requestId: requestData.id,
                            companyName: requestData.companyName,
                                createdBy: AppState.currentUser?.id || ''
                        }
                    });
                    Utils.safeLog('✅ تم إرسال إشعار Broadcast للتبويبات المفتوحة');
                }
            } catch (notifyError) {
                Utils.safeWarn('⚠️ فشل إرسال إشعارات Real-time:', notifyError);
            }
                
                // ✅ إرسال إشعارات للمديرين في الخلفية
                this.notifyAdminsAboutApprovalRequest(requestData).catch(error => {
                    Utils.safeWarn('⚠️ فشل إرسال إشعارات للمديرين:', error);
                });

            this._scheduleApprovalNotificationsRefresh();
                
                // ✅ إظهار إشعار النجاح النهائي
                if (requestData.requestType === 'evaluation') {
                    Notification.success('تم حفظ طلب التقييم في قاعدة البيانات بنجاح.');
                } else {
                    Notification.success('تم إرسال طلب الاعتماد بنجاح. سيتم مراجعته من قبل مدير النظام.');
                }
            } else {
                const errMsg = backendResult?.message || 'فشل المزامنة';
                const isDuplicateRejection = !!(backendResult?.duplicateInfo) ||
                    /مسجلة بالفعل|قيد المراجعة|مطلوب|غير مدعوم/i.test(errMsg);
                const rejectId = tempId || actualTempId;

                if (isDuplicateRejection) {
                    Utils.safeWarn('⚠️ رفض Backend لطلب مكرر أو غير صالح: ' + errMsg);
                    this._removeLocalApprovalRequestById(rejectId);
                    if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                        window.DataManager.save();
                    }
                    Notification.error(errMsg);
                    this.refreshApprovalRequestsSection();
                    this._scheduleApprovalNotificationsRefresh();
                } else {
                    Utils.safeWarn('⚠️ فشل مزامنة طلب الاعتماد مع Backend، تم الحفظ محلياً فقط');
                    const tempIndex = AppState.appData.contractorApprovalRequests.findIndex(r => r.id === rejectId);
                    if (tempIndex !== -1) {
                        AppState.appData.contractorApprovalRequests[tempIndex]._syncError = true;
                        AppState.appData.contractorApprovalRequests[tempIndex]._syncErrorMessage = errMsg;
                    }
                    if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                        window.DataManager.save();
                    }
                    Notification.warning('تم حفظ الطلب محلياً. سيتم المزامنة تلقائياً لاحقاً.');
                }
            }
        } catch (error) {
            // ✅ في حالة الخطأ، الحفاظ على الطلب المحلي
            Utils.safeError('❌ خطأ في مزامنة طلب الاعتماد مع Backend:', error);
            const tempIndex = AppState.appData.contractorApprovalRequests.findIndex(r => r.id === tempId);
            if (tempIndex !== -1) {
                AppState.appData.contractorApprovalRequests[tempIndex]._syncError = true;
                AppState.appData.contractorApprovalRequests[tempIndex]._syncErrorMessage = error.message || 'خطأ في المزامنة';
            }
            
            // حفظ البيانات المحلية
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }
            
            throw error; // إعادة رمي الخطأ للمعالجة الأعلى
        } finally {
            // ✅ إزالة المزامنة النشطة بعد الانتهاء
            if (this._activeSyncs && this._activeSyncs[syncKey]) {
                delete this._activeSyncs[syncKey];
            }
        }
    },

    async syncEvaluationApprovalRequestToBackend(requestData, tempId) {
        const sourceRequest = requestData;
        const syncKey = `sync_eval_${tempId || sourceRequest?.id || Date.now()}`;
        if (this._activeSyncs && this._activeSyncs[syncKey]) return;
        if (!this._activeSyncs) this._activeSyncs = {};
        this._activeSyncs[syncKey] = true;

        try {
            this.ensureEvaluationApprovalRequestsSetup();
            const payload = { ...sourceRequest };
            const actualTempId = tempId || payload.id;
            const isTempId = actualTempId && String(actualTempId).startsWith('TEMP_');
            if (isTempId) {
                delete payload.id;
            } else if (actualTempId) {
                payload.id = actualTempId;
            }
            delete payload._isPendingSync;
            delete payload._syncError;
            delete payload._syncErrorMessage;
            delete payload.legacyTempId;
            delete payload._tempId;
            payload.requestType = 'evaluation';
            if (payload.evaluationData && typeof payload.evaluationData === 'object') {
                payload.evaluationData = JSON.stringify(payload.evaluationData);
            }

            const backendResult = await GoogleIntegration.sendRequest({
                action: 'addContractorEvaluationApprovalRequest',
                data: payload
            });

            if (backendResult?.success) {
                const savedRequest = backendResult.data || payload;
                if (!savedRequest.id || savedRequest.id.startsWith('TEMP_')) {
                    savedRequest.id = 'CEAR_' + Date.now();
                }
                if (savedRequest.evaluationData && typeof savedRequest.evaluationData === 'string') {
                    try {
                        savedRequest.evaluationData = JSON.parse(savedRequest.evaluationData);
                    } catch (_parseErr) { /* keep string */ }
                }
                let tempIndex = (AppState.appData.contractorEvaluationApprovalRequests || [])
                    .findIndex((r) => {
                        if (!r) return false;
                        const id = String(r.id || '').trim();
                        const legacy = String(r.legacyTempId || r._tempId || '').trim();
                        const matchId = String(actualTempId || '').trim();
                        return id === matchId || legacy === matchId;
                    });
                if (tempIndex !== -1) {
                    const preservedEvaluationData = AppState.appData.contractorEvaluationApprovalRequests[tempIndex].evaluationData;
                    const legacyTempId = isTempId
                        ? String(actualTempId).trim()
                        : (AppState.appData.contractorEvaluationApprovalRequests[tempIndex].legacyTempId || '');
                    AppState.appData.contractorEvaluationApprovalRequests[tempIndex] = {
                        ...AppState.appData.contractorEvaluationApprovalRequests[tempIndex],
                        ...savedRequest,
                        id: savedRequest.id,
                        evaluationData: savedRequest.evaluationData || preservedEvaluationData,
                        requestType: 'evaluation',
                        legacyTempId: legacyTempId || undefined,
                        _isPendingSync: false
                    };
                    delete AppState.appData.contractorEvaluationApprovalRequests[tempIndex]._syncError;
                } else {
                    savedRequest.requestType = 'evaluation';
                    AppState.appData.contractorEvaluationApprovalRequests.push(savedRequest);
                }
                if (window.DataManager?.save) window.DataManager.save();
                if (typeof RealtimeSyncManager !== 'undefined' && RealtimeSyncManager.notifyChange) {
                    RealtimeSyncManager.notifyChange('contractorEvaluationApprovalRequests', 'add', savedRequest.id);
                }
                Notification.success('تم حفظ طلب التقييم في قاعدة البيانات بنجاح.');
            } else {
                const tempIndex = (AppState.appData.contractorEvaluationApprovalRequests || [])
                    .findIndex((r) => r.id === actualTempId);
                if (tempIndex !== -1) {
                    AppState.appData.contractorEvaluationApprovalRequests[tempIndex]._syncError = true;
                    AppState.appData.contractorEvaluationApprovalRequests[tempIndex]._syncErrorMessage =
                        backendResult?.message || 'فشل المزامنة';
                }
                if (window.DataManager?.save) window.DataManager.save();
                Notification.warning('تم حفظ طلب التقييم محلياً. سيتم المزامنة لاحقاً.');
            }
        } catch (error) {
            Utils.safeError('❌ خطأ في مزامنة طلب اعتماد التقييم:', error);
            const tempIndex = (AppState.appData.contractorEvaluationApprovalRequests || [])
                .findIndex((r) => r.id === tempId);
            if (tempIndex !== -1) {
                AppState.appData.contractorEvaluationApprovalRequests[tempIndex]._syncError = true;
                AppState.appData.contractorEvaluationApprovalRequests[tempIndex]._syncErrorMessage =
                    error.message || 'خطأ في المزامنة';
            }
            throw error;
        } finally {
            if (this._activeSyncs?.[syncKey]) delete this._activeSyncs[syncKey];
        }
    },

    /**
     * إرسال إشعارات للمديرين عند إرسال طلب اعتماد
     */
    async notifyAdminsAboutApprovalRequest(requestData) {
        try {
            // الحصول على جميع المستخدمين المدراء
            const users = AppState.appData.users || [];
            const admins = users.filter(user => {
                if (!user || user.active === false) return false;
                const role = (user.role || '').toLowerCase();
                return role === 'admin' || role === 'مدير' ||
                    (user.permissions && (user.permissions.isAdmin === true || user.permissions.admin === true));
            });

            if (admins.length === 0) {
                // إذا لم نجد مدراء محلياً، نحاول قراءتهم من Google Sheets
                try {
                    const usersResult = await GoogleIntegration.sendRequest({
                        action: 'readFromSheet',
                        data: { sheetName: 'Users' }
                    });

                    if (usersResult && usersResult.success && Array.isArray(usersResult.data)) {
                        admins.push(...usersResult.data.filter(user => {
                            if (!user || user.active === false) return false;
                            const role = (user.role || '').toLowerCase();
                            return role === 'admin' || role === 'مدير';
                        }));
                    }
                } catch (error) {
                    Utils.safeWarn('فشل قراءة المستخدمين من Google Sheets:', error);
                }
            }

            const requestTypeLabel = {
                'contractor': 'مقاول',
                'supplier': 'مورد',
                'evaluation': 'تقييم'
            }[requestData.requestType] || requestData.requestType || 'غير محدد';

            // إرسال إشعار لكل مدير
            for (const admin of admins) {
                if (admin.id || admin.email) {
                    try {
                        await GoogleIntegration.sendRequest({
                            action: 'addNotification',
                            data: {
                                userId: admin.id || admin.email,
                                title: 'طلب اعتماد جديد يحتاج مراجعة',
                                message: `طلب ${AppState.currentUser?.name || 'مستخدم'} اعتماد ${requestTypeLabel}: "${requestData.companyName || ''}"`,
                                type: 'contractor_approval',
                                priority: 'high',
                                link: '#contractors-section',
                                data: {
                                    module: 'contractors',
                                    action: 'approval_request',
                                    requestId: requestData.id,
                                    requestType: requestData.requestType
                                }
                            }
                        }).catch(error => {
                            Utils.safeWarn('فشل إرسال الإشعار للمدير:', error);
                        });
                    } catch (error) {
                        Utils.safeWarn('خطأ في إرسال الإشعار للمدير:', error);
                    }
                }
            }
        } catch (error) {
            Utils.safeWarn('خطأ في إرسال الإشعارات للمديرين:', error);
        }
    },

    mountApprovalRequestSection() {
        const el = document.getElementById('contractors-approval-request-content');
        if (!el) return;
        const html = this.renderApprovalRequestSection();
        if (typeof this.safeSetInnerHTML === 'function') {
            this.safeSetInnerHTML(el, html);
        } else {
            el.innerHTML = html;
        }
        const sendBtn = document.getElementById('send-approval-request-btn');
        if (sendBtn && !sendBtn.hasAttribute('data-listener-attached')) {
            sendBtn.setAttribute('data-listener-attached', 'true');
            sendBtn.addEventListener('click', () => this.showApprovalRequestForm());
        }
    },

    /**
     * تحديث قسم طلبات الاعتماد
     * ✅ إصلاح: تحديث بسيط بدون debounce أو تعقيد
     */
    refreshApprovalRequestsSection() {
        // ✅ التحقق من أن التبويب نشط
        if (this.currentTab !== 'approval-request') {
            return;
        }

        const isAdmin = this.isContractorApprovalAdminUser();
        const pendingSection = document.getElementById('pending-approval-requests-section');
        const pendingContainer = document.getElementById('pending-approval-requests-container');

        if (isAdmin && !pendingContainer) {
            this.mountApprovalRequestSection();
            return;
        }
        
        // ✅ منع التحديثات المتكررة
        if (this._isRefreshingApprovalRequests) {
            return;
        }
        
        this._isRefreshingApprovalRequests = true;
        
        try {
            const myContainer = document.getElementById('my-approval-requests-container');
            
            if (myContainer) {
                const myRequests = this.getMyApprovalRequests();
                myContainer.innerHTML = this.renderApprovalRequestsTable(myRequests, false);
            }

            if (pendingSection) {
                pendingSection.style.display = isAdmin ? 'block' : 'none';
            }
            if (isAdmin && pendingContainer) {
                const pendingRequests = this.getPendingApprovalRequests();
                pendingContainer.innerHTML = this.renderApprovalRequestsTable(pendingRequests, true);
            }
        } catch (error) {
            Utils.safeError('خطأ في تحديث قسم طلبات الاعتماد:', error);
        } finally {
            this._isRefreshingApprovalRequests = false;
        }
    },
    
    /**
     * عرض تفاصيل طلب الاعتماد أو الحذف
     */
    async viewApprovalRequest(requestId, requestCategory = 'approval') {
        this.ensureApprovalRequestsSetup();
        this.ensureDeletionRequestsSetup();
        this.ensureEvaluationApprovalRequestsSetup();

        const rid = String(requestId || '').trim();
        let request;
        if (requestCategory === 'deletion') {
            request = (AppState.appData.contractorDeletionRequests || []).find(
                (r) => r && String(r.id || '').trim() === rid
            );
        } else if (requestCategory === 'evaluation_approval') {
            await this.syncPendingEvaluationApprovalRequests(rid);
            request = this.findEvaluationApprovalRequest(rid);
            if (!request) {
                await this.fetchEvaluationApprovalRequestsFromBackend();
                request = this.findEvaluationApprovalRequest(rid);
            }
        } else {
            request = (AppState.appData.contractorApprovalRequests || []).find(
                (r) => r && String(r.id || '').trim() === rid
            );
        }

        if (!request) {
            request = this.findEvaluationApprovalRequest(rid);
            if (request) requestCategory = 'evaluation_approval';
        }

        if (!request) {
            Notification.error('الطلب غير موجود');
            return;
        }

        const isAdmin = this.isContractorApprovalAdminUser();
        const statusBadge = this.getApprovalRequestStatusBadge(request.status);
        const isDeletionRequest = requestCategory === 'deletion';
        const isEvaluationRequest = requestCategory === 'evaluation_approval' ||
            (!isDeletionRequest && request.requestType === 'evaluation');
        const canEdit = isAdmin && !isDeletionRequest && this.isApprovalRequestPendingForReview(request);

        // ✅ إصلاح: البحث عن بيانات التقييم في عدة أماكن
        let evaluationData = null;
        if (isEvaluationRequest) {
            // محاولة الحصول على evaluationData من الطلب
            evaluationData = request.evaluationData;
            
            // ✅ تحليل evaluationData إذا كان نصاً (JSON string) - معالجة التشفير المزدوج
            let parseAttempts = 0;
            while (evaluationData && typeof evaluationData === 'string' && parseAttempts < 3) {
                try {
                    evaluationData = JSON.parse(evaluationData);
                    parseAttempts++;
                } catch (error) {
                    Utils.safeWarn('⚠️ فشل تحليل evaluationData من النص (محاولة ' + parseAttempts + '):', error);
                    break;
                }
            }
            
            // ✅ التحقق من أن evaluationData كائن صالح
            if (evaluationData && typeof evaluationData !== 'object') {
                Utils.safeWarn('⚠️ evaluationData ليس كائناً صالحاً:', typeof evaluationData);
                evaluationData = null;
            }
            
            // ✅ إذا لم يوجد evaluationData أو كان فارغاً، استخدام بيانات الطلب مباشرة
            const hasValidData = evaluationData && (
                evaluationData.evaluationDate ||
                evaluationData.evaluatorName ||
                evaluationData.projectName ||
                evaluationData.location ||
                evaluationData.finalScore !== undefined ||
                (evaluationData.items && evaluationData.items.length > 0)
            );
            
            if (!hasValidData) {
                Utils.safeLog('📋 evaluationData فارغ أو غير صالح، استخدام بيانات الطلب مباشرة');
                evaluationData = {
                    evaluationDate: request.evaluationDate || (evaluationData?.evaluationDate) || null,
                    evaluatorName: request.evaluatorName || (evaluationData?.evaluatorName) || request.createdByName || '',
                    projectName: request.projectName || (evaluationData?.projectName) || request.location || '',
                    location: request.location || (evaluationData?.location) || request.projectName || '',
                    compliantCount: request.compliantCount ?? (evaluationData?.compliantCount) ?? 0,
                    totalItems: request.totalItems ?? (evaluationData?.totalItems) ?? 0,
                    finalScore: request.finalScore ?? (evaluationData?.finalScore) ?? null,
                    finalRating: request.finalRating || (evaluationData?.finalRating) || '',
                    generalNotes: request.generalNotes || (evaluationData?.generalNotes) || request.notes || '',
                    items: request.items || (evaluationData?.items) || [],
                    id: request.entityId || request.evaluationId || (evaluationData?.id) || null
                };
            }
            
            // ✅ تحليل items إذا كانت نصاً - معالجة التشفير المزدوج
            let itemsParseAttempts = 0;
            while (evaluationData?.items && typeof evaluationData.items === 'string' && itemsParseAttempts < 3) {
                try {
                    evaluationData.items = JSON.parse(evaluationData.items);
                    itemsParseAttempts++;
                } catch (error) {
                    Utils.safeWarn('⚠️ فشل تحليل بنود التقييم من النص:', error);
                    evaluationData.items = [];
                    break;
                }
            }
            
            Utils.safeLog('📋 بيانات التقييم المستخرجة:', evaluationData);
            Utils.safeLog('📋 بيانات الطلب الأصلية:', request);
        }
        
        const evaluationItems = Array.isArray(evaluationData?.items)
            ? evaluationData.items
            : (evaluationData?.items && typeof evaluationData.items === 'object')
                ? Object.values(evaluationData.items)
                : [];
        const evaluationScoreRaw = evaluationData?.finalScore;
        const evaluationScore = typeof evaluationScoreRaw === 'number'
            ? evaluationScoreRaw
            : (evaluationScoreRaw !== undefined && evaluationScoreRaw !== null && !isNaN(parseFloat(evaluationScoreRaw)))
                ? parseFloat(evaluationScoreRaw)
                : null;

        let requestType, entityName;
        if (isDeletionRequest) {
            requestType = request.requestType === 'contractor' ? 'حذف مقاول' :
                request.requestType === 'approved_entity' ? 'حذف معتمد' :
                    request.requestType === 'evaluation' ? 'حذف تقييم' : 'حذف';
            entityName = request.entityName || request.companyName || '';
        } else if (isEvaluationRequest) {
            requestType = 'طلب تقييم مقاول';
            entityName = request.contractorName || '';
        } else {
            requestType = request.requestType === 'contractor' ? 'اعتماد مقاول' : 'اعتماد مورد';
            entityName = request.companyName || request.contractorName || '';
        }

        this.injectAntiShakeStyles();
        const modal = document.createElement('div');
        modal.id = 'contractor-approval-request-details-modal';
        modal.className = 'modal-overlay ctr-detail-modal';
        modal.innerHTML = `
            <div class="modal-content ctr-detail-dialog ctr-detail-dialog--wide">
                <div class="modal-header ctr-detail-head">
                    <div class="ctr-detail-head__copy">
                        <span class="ctr-detail-head__icon"><i class="fas ${isDeletionRequest ? 'fa-trash-can' : isEvaluationRequest ? 'fa-clipboard-check' : 'fa-file-signature'}"></i></span>
                        <div>
                            <span class="ctr-detail-head__eyebrow">${Utils.escapeHTML(requestType)}</span>
                            <h2 class="modal-title">${isDeletionRequest ? 'تفاصيل طلب الحذف' : 'تفاصيل طلب الاعتماد'}</h2>
                            <p>${Utils.escapeHTML(entityName || 'طلب غير مسمى')} · ${Utils.escapeHTML(String(request.id || ''))}</p>
                        </div>
                    </div>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body ctr-detail-body ctr-request-detail-body">
                    ${canEdit ? `
                        <div class="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-blue-800">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    يمكنك تعديل بيانات الطلب قبل الموافقة عليه
                                </p>
                                <button id="toggle-edit-mode-btn" class="btn-sm btn-secondary" onclick="Contractors.toggleEditMode()">
                                    <i class="fas fa-edit ml-1"></i>
                                    تفعيل التعديل
                                </button>
                            </div>
                        </div>
                    ` : ''}
                    <form id="request-details-form">
                        <div class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">نوع الطلب</label>
                                    <p class="text-gray-800">${requestType}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">الحالة</label>
                                    <p>${statusBadge}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">${isDeletionRequest ? 'اسم العنصر المراد حذفه' : isEvaluationRequest ? 'اسم المقاول' : 'اسم الشركة / المقاول'}</label>
                                    ${!isEvaluationRequest ? `
                                    <input type="text" id="edit-companyName" class="form-input edit-field" disabled value="${Utils.escapeHTML(entityName)}" style="display: none;" />
                                    <p id="view-companyName" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(entityName)}</p>
                                    ` : canEdit ? `
                                    <input type="text" id="edit-companyName" class="form-input edit-field" value="${Utils.escapeHTML(entityName)}" style="display: none;" />
                                    <p id="view-companyName" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(entityName)}</p>
                                    ` : `
                                    <p class="text-gray-800">${Utils.escapeHTML(entityName)}</p>
                                    `}
                                </div>
                                ${isEvaluationRequest && evaluationData ? `
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">تاريخ التقييم</label>
                                    <input type="date" id="edit-evaluationDate" class="form-input edit-field" disabled value="${evaluationData.evaluationDate ? (typeof evaluationData.evaluationDate === 'string' ? evaluationData.evaluationDate.slice(0, 10) : new Date(evaluationData.evaluationDate).toISOString().slice(0, 10)) : ''}" style="display: none;" />
                                    <p id="view-evaluationDate" class="text-gray-800 view-field" style="display: block;">${evaluationData.evaluationDate ? Utils.formatDate(evaluationData.evaluationDate) : '—'}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">اسم المقيّم</label>
                                    <input type="text" id="edit-evaluatorName" class="form-input edit-field" disabled value="${Utils.escapeHTML(evaluationData.evaluatorName || '')}" style="display: none;" />
                                    <p id="view-evaluatorName" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(evaluationData.evaluatorName || '') || '—'}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">المصنع</label>
                                    <p class="text-gray-800 view-field">${Utils.escapeHTML(evaluationData.projectName || '') || '—'}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">الموقع الفرعي</label>
                                    <p class="text-gray-800 view-field">${Utils.escapeHTML(evaluationData.location || '') || '—'}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">عدد البنود المطابقة</label>
                                    <p class="text-gray-800">${evaluationData.compliantCount ?? 0} من ${evaluationData.totalItems ?? evaluationItems.length ?? 0}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">نسبة التقييم</label>
                                    <p class="text-gray-800 font-bold ${evaluationScore >= 90 ? 'text-green-600' : evaluationScore >= 75 ? 'text-blue-600' : evaluationScore >= 60 ? 'text-yellow-600' : evaluationScore === null ? 'text-gray-500' : 'text-red-600'}">${typeof evaluationScore === 'number' ? evaluationScore.toFixed(0) + '%' : '—'}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">التقييم النهائي</label>
                                    <span class="badge ${evaluationScore >= 90 ? 'badge-success' : evaluationScore >= 75 ? 'badge-info' : evaluationScore >= 60 ? 'badge-warning' : evaluationScore === null ? 'badge-secondary' : 'badge-danger'}">${Utils.escapeHTML(evaluationData.finalRating || '')}</span>
                                </div>
                                ` : ''}
                                ${isDeletionRequest && request.reason ? `
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">سبب طلب الحذف</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(request.reason)}</p>
                                </div>
                                ` : ''}
                                ${!isDeletionRequest && !isEvaluationRequest ? `
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">نوع الخدمة / النشاط</label>
                                    <input type="text" id="edit-serviceType" class="form-input edit-field" disabled value="${Utils.escapeHTML(request.serviceType || '')}" style="display: none;" />
                                    <p id="view-serviceType" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(request.serviceType || '')}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">رقم السجل التجاري / الترخيص</label>
                                    <input type="text" id="edit-licenseNumber" class="form-input edit-field" disabled value="${Utils.escapeHTML(request.licenseNumber || '')}" style="display: none;" />
                                    <p id="view-licenseNumber" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(request.licenseNumber || '') || '—'}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">الشخص المسؤول</label>
                                    <input type="text" id="edit-contactPerson" class="form-input edit-field" disabled value="${Utils.escapeHTML(request.contactPerson || '')}" style="display: none;" />
                                    <p id="view-contactPerson" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(request.contactPerson || '') || '—'}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">رقم الهاتف</label>
                                    <input type="text" id="edit-phone" class="form-input edit-field" disabled value="${Utils.escapeHTML(request.phone || '')}" style="display: none;" />
                                    <p id="view-phone" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(request.phone || '') || '—'}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">البريد الإلكتروني</label>
                                    <input type="email" id="edit-email" class="form-input edit-field" disabled value="${Utils.escapeHTML(request.email || '')}" style="display: none;" />
                                    <p id="view-email" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(request.email || '') || '—'}</p>
                                </div>
                                ` : ''}
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">تاريخ الإرسال</label>
                                    <p class="text-gray-800">${request.createdAt ? Utils.formatDate(request.createdAt) : '—'}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">أرسل بواسطة</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(request.createdByName || '') || '—'}</p>
                                </div>
                            </div>
                            ${isEvaluationRequest && evaluationItems.length > 0 ? `
                                <div class="bg-gray-50 border border-gray-200 rounded p-3">
                                    <label class="text-sm font-semibold text-gray-600 block mb-3">
                                        <i class="fas fa-clipboard-list ml-2"></i>
                                        تفاصيل بنود التقييم (${evaluationItems.length} بند)
                                    </label>
                                    <div class="overflow-x-auto">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-100">
                                                <tr>
                                                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">البند</th>
                                                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                                                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الملاحظات</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                ${evaluationItems.map((item, idx) => {
                                                    const statusLabel = item.status === 'compliant' ? 'مطابق' : item.status === 'non_compliant' ? 'غير مطابق' : '—';
                                                    const statusClass = item.status === 'compliant' ? 'text-green-600' : item.status === 'non_compliant' ? 'text-red-600' : 'text-gray-500';
                                                    const statusIcon = item.status === 'compliant' ? 'fa-check-circle' : item.status === 'non_compliant' ? 'fa-times-circle' : 'fa-minus-circle';
                                                    return `
                                                    <tr>
                                                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-700">${idx + 1}</td>
                                                        <td class="px-3 py-2 text-sm text-gray-700">${Utils.escapeHTML(item.title || item.label || '')}</td>
                                                        <td class="px-3 py-2 whitespace-nowrap text-sm ${statusClass}">
                                                            <i class="fas ${statusIcon} ml-1"></i>
                                                            ${statusLabel}
                                                        </td>
                                                        <td class="px-3 py-2 text-sm text-gray-600">${Utils.escapeHTML(item.notes || '—')}</td>
                                                    </tr>
                                                    `;
                                                }).join('')}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ` : ''}
                            ${isEvaluationRequest && evaluationData ? `
                                <div class="bg-blue-50 border border-blue-200 rounded p-3">
                                    <label class="text-sm font-semibold text-blue-800 block mb-2">الملاحظات العامة</label>
                                    <textarea id="edit-generalNotes" class="form-input edit-field" disabled rows="3" style="display: none;">${Utils.escapeHTML(evaluationData.generalNotes || '')}</textarea>
                                    <p id="view-generalNotes" class="text-blue-700 whitespace-pre-line view-field" style="display: block;">${Utils.escapeHTML(evaluationData.generalNotes || '') || '—'}</p>
                                </div>
                            ` : ''}
                            ${!isDeletionRequest && !isEvaluationRequest && request.notes ? `
                                <div class="bg-gray-50 border border-gray-200 rounded p-3">
                                    <label class="text-sm font-semibold text-gray-600 block mb-2">ملاحظات</label>
                                    <textarea id="edit-notes" class="form-input edit-field" disabled rows="3" style="display: none;">${Utils.escapeHTML(request.notes)}</textarea>
                                    <p id="view-notes" class="text-gray-700 whitespace-pre-line view-field" style="display: block;">${Utils.escapeHTML(request.notes)}</p>
                                </div>
                            ` : ''}
                            ${canEdit ? `
                                <div id="save-changes-section" class="border-t pt-4" style="display: none;">
                                    <button type="button" id="save-changes-btn" class="btn-primary">
                                        <i class="fas fa-save ml-2"></i>
                                        حفظ التعديلات
                                    </button>
                                    <button type="button" class="btn-secondary" onclick="Contractors.toggleEditMode()">
                                        <i class="fas fa-times ml-2"></i>
                                        إلغاء
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </form>
                    ${!isDeletionRequest && request.attachments && request.attachments.length > 0 ? `
                            <div class="bg-blue-50 border border-blue-200 rounded p-3">
                                <label class="text-sm font-semibold text-blue-800 block mb-2">
                                    <i class="fas fa-paperclip ml-2"></i>
                                    المرفقات (${request.attachments.length})
                                </label>
                                <div class="space-y-2">
                                    ${request.attachments.map(att => `
                                        <div class="flex items-center justify-between p-2 bg-white rounded border">
                                            <div class="flex items-center gap-2">
                                                <i class="fas fa-file text-blue-600"></i>
                                                <span class="text-sm text-gray-700">${Utils.escapeHTML(att.name)}</span>
                                                ${att.size ? `<span class="text-xs text-gray-500">(${(att.size / 1024 / 1024).toFixed(2)} MB)</span>` : ''}
                                            </div>
                                            ${att.url ? `
                                                <a href="${att.url}" target="_blank" class="btn-secondary btn-sm">
                                                    <i class="fas fa-download ml-1"></i>
                                                    تحميل
                                                </a>
                                            ` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        ${!isDeletionRequest && request.customFields && request.customFields.length > 0 ? `
                            <div class="bg-purple-50 border border-purple-200 rounded p-3">
                                <label class="text-sm font-semibold text-purple-800 block mb-2">
                                    <i class="fas fa-list-check ml-2"></i>
                                    البنود المطلوبة الإضافية (${request.customFields.length})
                                </label>
                                <div class="space-y-2">
                                    ${request.customFields.map(field => `
                                        <div class="flex items-center gap-2 p-2 bg-white rounded border">
                                            <span class="text-sm text-gray-700">${Utils.escapeHTML(field.name)}</span>
                                            <span class="badge badge-info text-xs">${field.type === 'text' ? 'نص' : field.type === 'document' ? 'مستند' : 'خانة اختيار'}</span>
                                            ${field.required ? '<span class="badge badge-warning text-xs">إلزامي</span>' : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        ${isDeletionRequest && request.reason ? `
                            <div class="bg-yellow-50 border border-yellow-200 rounded p-3">
                                <label class="text-sm font-semibold text-yellow-800 block mb-2">سبب طلب الحذف</label>
                                <p class="text-yellow-700 whitespace-pre-line">${Utils.escapeHTML(request.reason)}</p>
                            </div>
                        ` : ''}
                        ${request.approvedAt ? `
                            <div class="bg-green-50 border border-green-200 rounded p-3">
                                <label class="text-sm font-semibold text-green-800 block mb-2">${isDeletionRequest ? 'تم الاعتماد بواسطة' : 'تاريخ الاعتماد'}</label>
                                <p class="text-green-700">${isDeletionRequest ? Utils.escapeHTML(request.approvedByName || '') + ' - ' : ''}${Utils.formatDate(request.approvedAt)}</p>
                            </div>
                        ` : ''}
                        ${request.rejectedAt ? `
                            <div class="bg-red-50 border border-red-200 rounded p-3">
                                <label class="text-sm font-semibold text-red-800 block mb-2">تاريخ الرفض</label>
                                <p class="text-red-700">${Utils.formatDate(request.rejectedAt)}</p>
                                ${request.rejectionReason ? `
                                    <label class="text-sm font-semibold text-red-800 block mb-2 mt-2">سبب الرفض</label>
                                    <p class="text-red-700">${Utils.escapeHTML(request.rejectionReason)}</p>
                                ` : ''}
                            </div>
                        ` : ''}
                    </div>
                <div class="modal-footer ctr-detail-footer" style="margin-top: auto; flex-shrink: 0; width: 100%;">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-xmark ml-2"></i>إغلاق</button>
                    ${isEvaluationRequest && evaluationData?.id ? `
                        <button class="btn-info" onclick="Contractors.viewEvaluation('${evaluationData.id}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-clipboard-check ml-2"></i>عرض التقييم كاملاً
                        </button>
                    ` : ''}
                    ${isAdmin && this.isApprovalRequestPendingForReview(request) ? `
                        <button class="btn-success" onclick="Contractors.approveRequest('${request.id}', '${requestCategory}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-check ml-2"></i>اعتماد
                        </button>
                        <button class="btn-danger" onclick="Contractors.rejectRequest('${request.id}', '${requestCategory}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-times ml-2"></i>رفض
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // ✅ إضافة event listener لزر حفظ التعديلات
        const saveChangesBtn = modal.querySelector('#save-changes-btn');
        if (saveChangesBtn) {
            saveChangesBtn.addEventListener('click', async () => {
                await this.saveRequestChanges(requestId, requestCategory);
            });
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    /**
     * ✅ تبديل وضع التعديل
     */
    toggleEditMode() {
        const editFields = document.querySelectorAll('.edit-field');
        const viewFields = document.querySelectorAll('.view-field');
        const saveSection = document.getElementById('save-changes-section');
        const toggleBtn = document.getElementById('toggle-edit-mode-btn');
        
        if (!editFields.length) return;
        
        const isEditMode = !editFields[0].disabled;
        
        editFields.forEach(field => {
            field.disabled = isEditMode;
            field.style.display = isEditMode ? 'none' : 'block';
        });
        
        viewFields.forEach(field => {
            field.style.display = isEditMode ? 'block' : 'none';
        });
        
        if (saveSection) {
            saveSection.style.display = isEditMode ? 'none' : 'block';
        }
        
        if (toggleBtn) {
            if (isEditMode) {
                toggleBtn.innerHTML = '<i class="fas fa-edit ml-1"></i> تفعيل التعديل';
            } else {
                toggleBtn.innerHTML = '<i class="fas fa-eye ml-1"></i> إلغاء التعديل';
            }
        }
    },

    /**
     * ✅ حفظ التعديلات على الطلب
     */
    async saveRequestChanges(requestId, requestCategory = 'approval') {
        if (!Permissions.isAdmin()) {
            Notification.error('ليس لديك صلاحية لتعديل الطلبات');
            return;
        }
        
        Loading.show();
        
        try {
            let request;
            if (requestCategory === 'deletion') {
                request = (AppState.appData.contractorDeletionRequests || []).find(r => r.id === requestId);
            } else {
                request = (AppState.appData.contractorApprovalRequests || []).find(r => r.id === requestId);
            }
            
            if (!request) {
                throw new Error('الطلب غير موجود');
            }
            
            const isEvaluationRequest = request.requestType === 'evaluation';
            let updateData;
            
            if (isEvaluationRequest) {
                const contractorName = document.getElementById('edit-companyName')?.value?.trim() ?? '';
                const evaluationDate = document.getElementById('edit-evaluationDate')?.value?.trim() || null;
                const evaluatorName = document.getElementById('edit-evaluatorName')?.value?.trim() ?? '';
                const generalNotes = document.getElementById('edit-generalNotes')?.value?.trim() ?? '';
                
                let evaluationData = request.evaluationData;
                if (typeof evaluationData === 'string') {
                    try { evaluationData = JSON.parse(evaluationData); } catch (e) { evaluationData = {}; }
                }
                evaluationData = evaluationData || {};
                
                evaluationData.evaluationDate = evaluationDate ? new Date(evaluationDate).toISOString() : (evaluationData.evaluationDate || null);
                evaluationData.evaluatorName = evaluatorName;
                evaluationData.generalNotes = generalNotes;
                
                request.contractorName = contractorName;
                request.evaluationData = evaluationData;
                request.updatedAt = new Date().toISOString();
                request.updatedBy = AppState.currentUser?.id || '';
                request.updatedByName = AppState.currentUser?.name || '';
                
                updateData = {
                    contractorName,
                    evaluationData,
                    updatedAt: request.updatedAt,
                    updatedBy: request.updatedBy,
                    updatedByName: request.updatedByName
                };
            } else {
                const companyName = document.getElementById('edit-companyName')?.value?.trim();
                const serviceType = document.getElementById('edit-serviceType')?.value?.trim();
                const licenseNumber = document.getElementById('edit-licenseNumber')?.value?.trim();
                const contactPerson = document.getElementById('edit-contactPerson')?.value?.trim();
                const phone = document.getElementById('edit-phone')?.value?.trim();
                const email = document.getElementById('edit-email')?.value?.trim();
                const notes = document.getElementById('edit-notes')?.value?.trim();
                
                if (!companyName) {
                    Notification.error('يجب إدخال اسم الشركة/المقاول');
                    Loading.hide();
                    return;
                }
                
                request.companyName = companyName;
                if (serviceType !== undefined) request.serviceType = serviceType;
                if (licenseNumber !== undefined) request.licenseNumber = licenseNumber;
                if (contactPerson !== undefined) request.contactPerson = contactPerson;
                if (phone !== undefined) request.phone = phone;
                if (email !== undefined) request.email = email;
                if (notes !== undefined) request.notes = notes;
                request.updatedAt = new Date().toISOString();
                request.updatedBy = AppState.currentUser?.id || '';
                request.updatedByName = AppState.currentUser?.name || '';
                
                updateData = {
                    companyName,
                    serviceType,
                    licenseNumber,
                    contactPerson,
                    phone,
                    email,
                    notes,
                    updatedAt: request.updatedAt,
                    updatedBy: request.updatedBy,
                    updatedByName: request.updatedByName
                };
            }
            
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }
            
            const action = requestCategory === 'deletion' 
                ? 'updateContractorDeletionRequest' 
                : 'updateContractorApprovalRequest';
                
            const result = await GoogleIntegration.sendRequest({
                action: action,
                data: {
                    requestId: requestId,
                    updateData: updateData
                }
            });
            
            if (result && result.success) {
                Notification.success('تم حفظ التعديلات بنجاح');
                const modal = document.querySelector('.modal-overlay');
                if (modal) modal.remove();
                this.refreshApprovalRequestsSection();
            } else {
                throw new Error(result?.message || 'فشل حفظ التعديلات');
            }
        } catch (error) {
            Utils.safeError('خطأ في حفظ التعديلات:', error);
            Notification.error('حدث خطأ أثناء حفظ التعديلات: ' + error.message);
        } finally {
            Loading.hide();
        }
    },

    /**
     * اعتماد طلب الاعتماد
     */
    async approveRequest(requestId, requestCategory = 'approval') {
        if (!Permissions.isAdmin()) {
            Notification.error('ليس لديك صلاحية لاعتماد الطلبات');
            return;
        }

        this.ensureApprovalRequestsSetup();
        this.ensureDeletionRequestsSetup();
        this.ensureEvaluationApprovalRequestsSetup();

        let request;
        if (requestCategory === 'deletion') {
            request = (AppState.appData.contractorDeletionRequests || []).find(r => r.id === requestId);
            if (!request) {
                Notification.error('طلب الحذف غير موجود');
                return;
            }
            if (!confirm('هل أنت متأكد من اعتماد طلب الحذف؟ سيتم حذف العنصر نهائياً.')) {
                return;
            }

            // استدعاء Backend لاعتماد طلب الحذف
            try {
                Loading.show();
                const result = await GoogleIntegration.callBackend('approveContractorDeletionRequest', {
                    requestId: requestId,
                    userData: AppState.currentUser
                });

                if (result && result.success) {
                    request.status = 'approved';
                    request.approvedAt = new Date().toISOString();
                    request.approvedBy = AppState.currentUser?.id || '';
                    request.approvedByName = AppState.currentUser?.name || '';

                    // حذف محلي
                    if (request.requestType === 'contractor') {
                        const contractors = AppState.appData.contractors || [];
                        const index = contractors.findIndex(c => c.id === request.entityId);
                        if (index !== -1) {
                            contractors.splice(index, 1);
                            AppState.appData.contractors = contractors;
                        }
                        // حذف من المعتمدين أيضاً
                        const approved = AppState.appData.approvedContractors || [];
                        const approvedIndex = approved.findIndex(ac => ac.contractorId === request.entityId || ac.id === request.entityId);
                        if (approvedIndex !== -1) {
                            approved.splice(approvedIndex, 1);
                            AppState.appData.approvedContractors = approved;
                        }
                    } else if (request.requestType === 'approved_entity') {
                        const approved = AppState.appData.approvedContractors || [];
                        const index = approved.findIndex(ac => ac.id === request.entityId);
                        if (index !== -1) {
                            const approvedRecord = approved[index];
                            approved.splice(index, 1);
                            AppState.appData.approvedContractors = approved;
                            // حذف من المقاولين أيضاً إذا كان مربوط
                            if (approvedRecord.contractorId) {
                                const contractors = AppState.appData.contractors || [];
                                const contractorIndex = contractors.findIndex(c => c.id === approvedRecord.contractorId);
                                if (contractorIndex !== -1) {
                                    contractors.splice(contractorIndex, 1);
                                    AppState.appData.contractors = contractors;
                                }
                            }
                        }
                    } else if (request.requestType === 'evaluation') {
                        const evaluations = AppState.appData.contractorEvaluations || [];
                        const index = evaluations.findIndex(e => e.id === request.entityId);
                        if (index !== -1) {
                            evaluations.splice(index, 1);
                            AppState.appData.contractorEvaluations = evaluations;
                        }
                    }

                    if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                        window.DataManager.save();
                    }

                    Loading.hide();
                    Notification.success('تم اعتماد طلب الحذف بنجاح');
                    this.refreshApprovalRequestsSection();
                    this.load(true); // ✅ إعادة تحميل القائمة - preserve current tab
                    if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) {
                        AppUI.updateNotificationsBadge();
                    }
                } else {
                    Loading.hide();
                    Notification.error('فشل اعتماد طلب الحذف: ' + (result?.message || 'خطأ غير معروف'));
                }
            } catch (error) {
                Loading.hide();
                Utils.safeError('خطأ في اعتماد طلب الحذف:', error);
                Notification.error('تعذر اعتماد طلب الحذف: ' + error.message);
            }
            return;
        }

        if (requestCategory === 'evaluation_approval') {
            await this.syncPendingEvaluationApprovalRequests(requestId);
            request = this.findEvaluationApprovalRequest(requestId);
            if (!request) {
                await this.fetchEvaluationApprovalRequestsFromBackend();
                request = this.findEvaluationApprovalRequest(requestId);
            }
            if (!request) {
                Notification.error('طلب اعتماد التقييم غير موجود');
                return;
            }
            const evalId = String(request.id || '').trim();
            if (request._isPendingSync || evalId.startsWith('TEMP_') || request._syncError) {
                Notification.error(
                    request._syncErrorMessage ||
                    'تعذر مزامنة الطلب مع قاعدة البيانات. تحقق من الاتصال ثم أعد المحاولة.'
                );
                return;
            }
            if (!confirm('هل أنت متأكد من اعتماد طلب التقييم؟ سيُضاف إلى قائمة تقييم وتأهيل المقاولين.')) {
                return;
            }
            try {
                Loading.show();
                const backendResult = await GoogleIntegration.callBackend('approveContractorEvaluationApprovalRequest', {
                    requestId: request.id || requestId,
                    userData: AppState.currentUser
                });
                if (!backendResult?.success) {
                    Loading.hide();
                    Notification.error('فشل اعتماد طلب التقييم: ' + (backendResult?.message || 'خطأ غير معروف'));
                    return;
                }
                request.status = 'approved';
                request.approvedAt = new Date().toISOString();
                request.approvedBy = AppState.currentUser?.id || '';
                request.approvedByName = AppState.currentUser?.name || '';
                const evaluationRecord = this.parseEvaluationDataFromRequest(request);
                if (evaluationRecord) {
                    evaluationRecord.status = 'approved';
                    evaluationRecord.approvedAt = new Date().toISOString();
                    evaluationRecord.approvedBy = AppState.currentUser?.id || '';
                    this.persistEvaluation(evaluationRecord, null, { skipAutoSave: true, replaceExisting: true });
                }
                if (window.DataManager?.save) window.DataManager.save();
                try {
                    await GoogleIntegration.syncData({
                        silent: true,
                        showLoader: false,
                        notifyOnSuccess: false,
                        notifyOnError: true,
                        sheets: ['ContractorEvaluationApprovalRequests', 'ContractorEvaluations']
                    });
                } catch (_syncErr) { /* ignore */ }
                Loading.hide();
                Notification.success('تم اعتماد طلب التقييم بنجاح.');
                this.refreshEvaluationApprovalRequestsSection();
                this.refreshApprovalRequestsSection();
                this.refreshEvaluationsList(this.currentEvaluationFilter || '');
                if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) AppUI.updateNotificationsBadge();
            } catch (error) {
                Loading.hide();
                Utils.safeError('خطأ في اعتماد طلب التقييم:', error);
                Notification.error('تعذر اعتماد طلب التقييم: ' + error.message);
            }
            return;
        }

        request = (AppState.appData.contractorApprovalRequests || []).find(r => r.id === requestId);

        if (!request) {
            const evalRequest = this.findEvaluationApprovalRequest(requestId);
            if (evalRequest) {
                return this.approveRequest(requestId, 'evaluation_approval');
            }
        }

        if (!request && requestId.startsWith('TEMP_')) {
            Notification.warning('الطلب لا يزال قيد المزامنة. يرجى الانتظار قليلاً ثم إعادة المحاولة.');
            Utils.safeWarn('⚠️ محاولة اعتماد طلب بمُعرف مؤقت (tempId=' + requestId + ') - يجب الانتظار حتى اكتمال المزامنة');
            return;
        }

        if (!request) {
            Notification.error('طلب الاعتماد غير موجود');
            Utils.safeError('❌ خطأ: لم يتم العثور على الطلب. requestId=' + requestId);
            return;
        }

        if (String(request.requestType || '').trim() === 'evaluation') {
            return this.approveRequest(requestId, 'evaluation_approval');
        }

        if (request.id && String(request.id).startsWith('TEMP_')) {
            if (request._isPendingSync) {
                Notification.warning('الطلب لا يزال قيد المزامنة مع الخادم. يرجى الانتظار قليلاً ثم إعادة المحاولة.');
            } else if (request._syncError) {
                Notification.error('فشلت مزامنة الطلب مع الخادم. يرجى إعادة إرسال الطلب أولاً.');
            } else {
                Notification.warning('الطلب لم يتم مزامنته مع الخادم بعد. يرجى إعادة إرسال الطلب أولاً.');
            }
            Utils.safeWarn('⚠️ محاولة اعتماد طلب بمُعرف مؤقت (tempId=' + request.id + ')');
            return;
        }

        const isEvaluationApproval = request.requestType === 'evaluation';
        const confirmMsg = isEvaluationApproval
            ? 'هل أنت متأكد من اعتماد طلب التقييم؟ سيُضاف إلى قائمة تقييم وتأهيل المقاولين.'
            : 'هل أنت متأكد من اعتماد هذا الطلب؟ سيتم إضافة المقاول/المورد إلى قائمة المعتمدين.';
        if (!confirm(confirmMsg)) {
            return;
        }

        try {
            Loading.show();
            const actualRequestId = request.id || requestId;
            Utils.safeLog('✅ محاولة اعتماد الطلب. requestId=' + actualRequestId + ', type=' + (request.requestType || 'N/A'));

            const backendResult = await GoogleIntegration.callBackend('approveContractorApprovalRequest', {
                requestId: actualRequestId, // ✅ استخدام ID الصحيح (CAR_...)
                userData: AppState.currentUser
            });

            if (!backendResult || !backendResult.success) {
                Loading.hide();
                Notification.error('فشل اعتماد الطلب في Backend: ' + (backendResult?.message || 'خطأ غير معروف'));
                return;
            }

            // تحديث حالة الطلب محلياً
            request.status = 'approved';
            request.approvedAt = new Date().toISOString();
            request.approvedBy = AppState.currentUser?.id || '';
            request.approvedByName = AppState.currentUser?.name || '';
            request.updatedAt = new Date().toISOString();

            // تنظيف الطلبات المكررة محلياً: قد توجد نسخة/نسخ pending لنفس الطلب (مثلاً من حفظ محلي قديم)
            // فنقوم باعتبارها معتمدة أيضاً حتى لا تبقى ظاهرة في "طلبات قيد المراجعة".
            const normalizeKey = (v) => String(v || '').trim().toLowerCase();
            const reqTypeKey = normalizeKey(request.requestType);
            const companyKey = normalizeKey(request.companyName || request.entityName);
            const serviceKey = normalizeKey(request.serviceType);
            const licenseKey = normalizeKey(request.licenseNumber);

            (AppState.appData.contractorApprovalRequests || []).forEach((r) => {
                if (!r || r === request) return;
                const isPending = r.status === 'pending' || r.status === 'under_review';
                if (!isPending) return;
                const sameType = normalizeKey(r.requestType) === reqTypeKey;
                if (!sameType) return;

                const rCompanyKey = normalizeKey(r.companyName || r.entityName);
                const rServiceKey = normalizeKey(r.serviceType);
                const rLicenseKey = normalizeKey(r.licenseNumber);
                const sameCompany = companyKey && rCompanyKey && companyKey === rCompanyKey;
                const sameLicense = licenseKey && rLicenseKey && licenseKey === rLicenseKey;
                const sameService = !serviceKey || !rServiceKey || serviceKey === rServiceKey;

                if ((sameCompany || sameLicense) && sameService) {
                    r.status = 'approved';
                    r.approvedAt = request.approvedAt;
                    r.approvedBy = request.approvedBy;
                    r.approvedByName = request.approvedByName;
                    r.updatedAt = request.updatedAt;
                }
            });

            // تحديث البيانات المحلية بناءً على رد الخادم
            if (backendResult.approvedEntity) {
                this.ensureApprovedSetup();
                let approvedContractors = AppState.appData.approvedContractors || [];
                if (!Array.isArray(approvedContractors)) approvedContractors = [];

                // ✅ التحقق من أن approvedEntity يحتوي على البيانات المطلوبة
                const approvedEntity = backendResult.approvedEntity;
                Utils.safeLog('✅ Received approvedEntity from Backend: id=' + (approvedEntity.id || 'N/A') + ', companyName=' + (approvedEntity.companyName || 'N/A') + ', code=' + (approvedEntity.code || approvedEntity.isoCode || 'N/A'));

                // ✅ التحقق من وجود ID قبل الإضافة
                if (!approvedEntity.id) {
                    Utils.safeWarn('⚠️ Warning: approvedEntity does not have an ID - this may cause issues');
                }

                const existingIndex = approvedContractors.findIndex(item => item.id === approvedEntity.id);
                if (existingIndex !== -1) {
                    approvedContractors[existingIndex] = approvedEntity;
                    Utils.safeLog('✅ Updated existing approved contractor in AppState: id=' + approvedEntity.id);
                } else {
                    approvedContractors.push(approvedEntity);
                    Utils.safeLog('✅ Added new approved contractor to AppState: id=' + approvedEntity.id + ', companyName=' + approvedEntity.companyName);
                }
                AppState.appData.approvedContractors = approvedContractors;
                
                // ✅ التحقق النهائي: التأكد من أن البيانات تمت إضافتها بشكل صحيح
                const verifyAdded = AppState.appData.approvedContractors.find(ac => ac.id === approvedEntity.id);
                if (verifyAdded) {
                    Utils.safeLog('✅ Verified: Approved contractor added successfully to AppState.approvedContractors');
                } else {
                    Utils.safeError('❌ Error: Failed to add approved contractor to AppState.approvedContractors');
                }
            } else {
                Utils.safeWarn('⚠️ Warning: backendResult.approvedEntity is null or undefined - approved entity was not returned from Backend');
                // ✅ إذا كان الطلب من نوع contractor أو supplier، يجب أن يكون approvedEntity موجوداً
                if (request.requestType === 'contractor' || request.requestType === 'supplier') {
                    Utils.safeError('❌ Error: approvedEntity should not be null for contractor/supplier requests');
                }
            }

            if (backendResult.contractor) {
                let contractors = AppState.appData.contractors || [];
                if (!Array.isArray(contractors)) contractors = [];

                const existingIndex = contractors.findIndex(c => c.id === backendResult.contractor.id);
                if (existingIndex !== -1) {
                    contractors[existingIndex] = backendResult.contractor;
                } else {
                    contractors.push(backendResult.contractor);
                }
                AppState.appData.contractors = contractors;

                Utils.safeLog(`✅ تم تحديث بيانات المقاول: ${backendResult.contractor.name}`);
            }

            // إذا كان الطلب لتقييم، إضافة التقييم إلى القائمة
            if (request.requestType === 'evaluation') {
                const evaluationRecord = this.parseEvaluationDataFromRequest(request);
                if (evaluationRecord) {
                    evaluationRecord.status = 'approved';
                    evaluationRecord.approvedAt = new Date().toISOString();
                    evaluationRecord.approvedBy = AppState.currentUser?.id || '';
                    this.persistEvaluation(evaluationRecord, null, { skipAutoSave: true, replaceExisting: true });
                } else {
                    Utils.safeWarn('⚠️ تعذر استخراج بيانات التقييم من الطلب المعتمد');
                }
            }

            // حفظ البيانات محلياً
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            // ✅ إصلاح: Backend قام بالفعل بالحفظ باستخدام updateSingleRowInSheet (آمنة)
            // ✅ لا حاجة لـ autoSave هنا لأنها قد تحذف الطلبات الأخرى
            // ✅ نستخدم المزامنة فقط للتأكد من التطابق

            // مزامنة البيانات من Backend للتأكد من التطابق
            // ✅ تحسين: مزامنة فقط الأوراق المتعلقة بالمقاولين لتجنب إظهار شاشة Database loaded الكاملة
            try {
                Utils.safeLog('🔄 بدء مزامنة بيانات المقاولين من Backend...');
                const syncSheets = request.requestType === 'evaluation'
                    ? ['ContractorApprovalRequests', 'ContractorEvaluations']
                    : ['ContractorApprovalRequests', 'ApprovedContractors', 'Contractors'];
                await GoogleIntegration.syncData({
                    silent: true,
                    showLoader: false,
                    notifyOnSuccess: false,
                    notifyOnError: true,
                    sheets: syncSheets
                });
                Utils.safeLog('✅ تمت مزامنة بيانات المقاولين من Backend بنجاح');

                if (request.requestType === 'evaluation') {
                    this.refreshEvaluationsList(this.currentEvaluationFilter || '');
                }

                if (request.requestType === 'contractor' || request.requestType === 'supplier') {
                    const verifyApproved = AppState.appData.approvedContractors?.find(ac =>
                        ac.companyName === request.companyName &&
                        ac.entityType === (request.requestType === 'contractor' ? 'contractor' : 'supplier')
                    );

                    if (verifyApproved) {
                        Utils.safeLog(`✅ تم التحقق: المقاول "${verifyApproved.companyName}" موجود في قائمة المعتمدين (ID: ${verifyApproved.id}, Code: ${verifyApproved.code || verifyApproved.isoCode})`);
                    } else {
                        Utils.safeWarn(`⚠️ تحذير: لم يتم العثور على المقاول "${request.companyName}" في قائمة المعتمدين بعد المزامنة`);
                    }
                }
            } catch (syncError) {
                Utils.safeError('❌ خطأ: فشلت مزامنة البيانات من Backend:', syncError);
                // إظهار تنبيه للمستخدم
                Notification.warning('تم اعتماد الطلب بنجاح في Backend، لكن حدث خطأ في المزامنة. يرجى تحديث الصفحة للتأكد من ظهور البيانات.');
            }

            Loading.hide();

            // التأكد من أن المقاول تم إضافته بنجاح والربط موجود
            if (request.requestType === 'contractor' || request.requestType === 'supplier') {
                // البحث عن المعتمد أولاً
                const linkedApproved = AppState.appData.approvedContractors?.find(ac =>
                    ac.companyName === request.companyName &&
                    ac.entityType === (request.requestType === 'contractor' ? 'contractor' : 'supplier')
                ) || backendResult.approvedEntity;
                
                const addedContractor = AppState.appData.contractors?.find(c =>
                    c.name === request.companyName ||
                    (linkedApproved && c.id === linkedApproved.contractorId) ||
                    (linkedApproved && c.approvedEntityId === linkedApproved.id)
                );

                if (addedContractor && linkedApproved) {
                    // التحقق من الربط
                    if (linkedApproved.contractorId === addedContractor.id || addedContractor.approvedEntityId === linkedApproved.id) {
                        Utils.safeLog(`✅ تم إضافة ${request.requestType === 'supplier' ? 'المورد' : 'المقاول'} "${addedContractor.name}" بنجاح والربط موجود (Contractor ID: ${addedContractor.id}, Approved ID: ${linkedApproved.id})`);
                    } else {
                        Utils.safeWarn('⚠️ تحذير: المقاول والمعتمد موجودان لكن الربط غير مكتمل');
                    }
                } else {
                    Utils.safeWarn('⚠️ تحذير: المقاول أو المعتمد لم يظهر في القوائم بعد الاعتماد');
                }
            }

            if (request.requestType === 'evaluation') {
                Notification.success('تم اعتماد طلب التقييم بنجاح. يظهر الآن في تقييم وتأهيل المقاولين.');
            } else {
                Notification.success('تم اعتماد الطلب بنجاح. تم إضافة المقاول/المورد إلى قائمة المعتمدين والمقاولين.');
            }

            this.refreshApprovalRequestsSection();

            if (request.requestType === 'evaluation') {
                this.refreshEvaluationsList(this.currentEvaluationFilter || '');
            }

            await this.ensureApprovedContractorsDataLoaded({ force: true });
            this.ensureApprovedTabContentLoaded(true);
            this.refreshApprovedEntitiesList();

            // تحديث الإشعارات
            if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) {
                AppUI.updateNotificationsBadge();
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في اعتماد الطلب:', error);
            Notification.error('تعذر اعتماد الطلب: ' + error.message);
        }
    },

    /**
     * رفض طلب الاعتماد
     */
    async rejectRequest(requestId, requestCategory = 'approval') {
        if (!Permissions.isAdmin()) {
            Notification.error('ليس لديك صلاحية لرفض الطلبات');
            return;
        }

        this.ensureApprovalRequestsSetup();
        this.ensureDeletionRequestsSetup();
        this.ensureEvaluationApprovalRequestsSetup();

        let request;
        if (requestCategory === 'deletion') {
            request = (AppState.appData.contractorDeletionRequests || []).find(r => r.id === requestId);
            if (!request) {
                Notification.error('طلب الحذف غير موجود');
                return;
            }

            const reason = prompt('يرجى إدخال سبب الرفض:') || 'تم الرفض من قبل المدير';
            if (reason === null) return; // المستخدم ألغى

            try {
                Loading.show();
                const result = await GoogleIntegration.callBackend('rejectContractorDeletionRequest', {
                    requestId: requestId,
                    rejectionReason: reason,
                    userData: AppState.currentUser
                });

                if (result && result.success) {
                    request.status = 'rejected';
                    request.rejectedAt = new Date().toISOString();
                    request.rejectedBy = AppState.currentUser?.id || '';
                    request.rejectedByName = AppState.currentUser?.name || '';
                    request.rejectionReason = reason;

                    if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                        window.DataManager.save();
                    }

                    Loading.hide();
                    Notification.success('تم رفض طلب الحذف بنجاح');
                    this.refreshApprovalRequestsSection();
                    if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) {
                        AppUI.updateNotificationsBadge();
                    }
                } else {
                    Loading.hide();
                    Notification.error('فشل رفض طلب الحذف: ' + (result?.message || 'خطأ غير معروف'));
                }
            } catch (error) {
                Loading.hide();
                Utils.safeError('خطأ في رفض طلب الحذف:', error);
                Notification.error('تعذر رفض طلب الحذف: ' + error.message);
            }
            return;
        }

        if (requestCategory === 'evaluation_approval') {
            const evalRequest = this.findEvaluationApprovalRequest(requestId);
            if (!evalRequest) {
                Notification.error('طلب اعتماد التقييم غير موجود');
                return;
            }
            const reason = prompt('يرجى إدخال سبب الرفض (اختياري):');
            if (reason === null) return;
            try {
                Loading.show();
                const backendResult = await GoogleIntegration.sendRequest({
                    action: 'rejectContractorEvaluationApprovalRequest',
                    data: {
                        requestId: requestId,
                        rejectionReason: reason || '',
                        userData: AppState.currentUser
                    }
                });
                if (backendResult?.success) {
                    evalRequest.status = 'rejected';
                    evalRequest.rejectedAt = new Date().toISOString();
                    evalRequest.rejectedBy = AppState.currentUser?.id || '';
                    evalRequest.rejectedByName = AppState.currentUser?.name || '';
                    evalRequest.rejectionReason = reason || '';
                    if (window.DataManager?.save) window.DataManager.save();
                }
                Loading.hide();
                Notification.success('تم رفض طلب التقييم بنجاح.');
                this.refreshEvaluationApprovalRequestsSection();
                this.refreshApprovalRequestsSection();
                if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) AppUI.updateNotificationsBadge();
            } catch (error) {
                Loading.hide();
                Notification.error('تعذر رفض طلب التقييم: ' + error.message);
            }
            return;
        }

        const reason = prompt('يرجى إدخال سبب الرفض (اختياري):');
        if (reason === null) return; // المستخدم ألغى

        try {
            Loading.show();
            const request = (AppState.appData.contractorApprovalRequests || []).find(r => r.id === requestId);
            if (!request) {
                const evalRequest = this.findEvaluationApprovalRequest(requestId);
                if (evalRequest) {
                    Loading.hide();
                    return this.rejectRequest(requestId, 'evaluation_approval');
                }
                Loading.hide();
                Notification.error('طلب الاعتماد غير موجود');
                return;
            }

            // ✅ إصلاح: استخدام rejectContractorApprovalRequest في Backend مباشرة
            // ✅ هذا يضمن عدم حذف الطلبات الموجودة في Google Sheets
            const backendResult = await GoogleIntegration.sendRequest({
                action: 'rejectContractorApprovalRequest',
                data: {
                    requestId: requestId,
                    rejectionReason: reason || '',
                    userData: AppState.currentUser
                }
            });

            if (backendResult && backendResult.success) {
                // ✅ بعد نجاح الحفظ في Backend، تحديث الطلب محلياً
                request.status = 'rejected';
                request.rejectedAt = new Date().toISOString();
                request.rejectedBy = AppState.currentUser?.id || '';
                request.rejectedByName = AppState.currentUser?.name || '';
                request.rejectionReason = reason || '';
                request.updatedAt = new Date().toISOString();

                // حفظ البيانات محلياً
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }

                Loading.hide();
                Utils.safeLog('✅ تم رفض طلب الاعتماد في Google Sheets بنجاح');
            } else {
                // إذا فشل الحفظ في Backend، نحدث محلياً فقط
                request.status = 'rejected';
                request.rejectedAt = new Date().toISOString();
                request.rejectedBy = AppState.currentUser?.id || '';
                request.rejectedByName = AppState.currentUser?.name || '';
                request.rejectionReason = reason || '';
                request.updatedAt = new Date().toISOString();

                // حفظ البيانات محلياً
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }

                Loading.hide();
                Utils.safeWarn('⚠️ فشل رفض طلب الاعتماد في Google Sheets، تم التحديث محلياً فقط');
                Notification.warning('تم تحديث الطلب محلياً. سيتم المزامنة لاحقاً.');
            }

            Notification.success('تم رفض الطلب بنجاح.');
            this.refreshApprovalRequestsSection();

            // تحديث الإشعارات
            if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) {
                AppUI.updateNotificationsBadge();
            }
        } catch (error) {
            Utils.safeError('خطأ في رفض الطلب:', error);
            Notification.error('تعذر رفض الطلب: ' + error.message);
        }
    },

    // ===== تحليل بيانات المقاولين =====

    getContractorsForAnalyticsList() {
        // نفس مصدر كروت «قائمة المعتمدين» — نشط + غير نشط
        const source = typeof this.getApprovedEntitiesStatsSource === 'function'
            ? this.getApprovedEntitiesStatsSource()
            : (AppState.appData.approvedContractors || []);

        return source
            .filter((record) => this.normalizeApprovedEntityType(record.entityType || record.type) === 'contractor')
            .map((record) => ({
                ...record,
                id: record.contractorId || record.id,
                contractorId: record.contractorId || record.id,
                name: record.companyName || record.name || '',
                companyName: record.companyName || record.name || '',
                endDate: record.expiryDate || record.endDate,
                expiryDate: record.expiryDate || record.endDate,
                approvedEntityId: record.id,
                isActive: record.isActive,
                status: this.isEntityEnabled(record) ? (record.status || 'نشط') : 'غير نشط',
                entityType: record.entityType || 'contractor',
                code: record.code || record.isoCode || '',
                serviceType: record.serviceType || ''
            }));
    },

    _ctrGetApprovedContractorsForAnalytics() {
        return this.getContractorsForAnalyticsList();
    },

    _ctrGetViolationPlaceLabel(violation) {
        const place = String(violation?.violationPlace || violation?.place || '').trim();
        const location = String(violation?.violationLocation || violation?.location || '').trim();
        if (place && location) return `${location} — ${place}`;
        return place || location || 'غير محدد';
    },

    _ctrPdfArStyle_() {
        return "font-family:'Cairo','Tahoma','Segoe UI',sans-serif;direction:rtl;unicode-bidi:embed;letter-spacing:0;word-spacing:normal;";
    },

    _getContractorViolationsAnalysisData_(contractors, violations, limit = 0) {
        const contractorList = (Array.isArray(contractors) && contractors.length > 0)
            ? contractors
            : this.getContractorsForAnalyticsList();
        if (!Array.isArray(violations) || violations.length === 0) {
            return { rows: [], summary: null, overallResolution: 0 };
        }

        const rows = (contractorList || []).map((contractor) => {
            const analyticsContractor = this.prepareContractorForAnalytics(contractor);
            const lookupKey = this.getPreferredContractorAnalyticsKey(
                analyticsContractor,
                contractor.id || contractor.contractorId || contractor.code || contractor.isoCode
            );
            const ctx = this.buildContractorAnalyticsMatchers(analyticsContractor, lookupKey);
            const contractorViolations = this.dedupeContractorRecords(
                violations.filter(ctx.violationBelongsToContractor),
                ['isoCode', 'id'],
                ['contractorId', 'contractorName', 'violationType', 'violationDate', 'violationTime']
            );
            const stats = { total: 0, high: 0, medium: 0, low: 0, resolved: 0, pending: 0 };
            contractorViolations.forEach((v) => {
                stats.total++;
                const severity = (v.severity || '').toString().trim();
                if (severity === 'عالية' || severity === 'high' || severity === 'حرجة') stats.high++;
                else if (severity === 'متوسطة' || severity === 'medium') stats.medium++;
                else stats.low++;
                const status = (v.status || '').toString().trim();
                if (status === 'محلول' || status === 'resolved' || status === 'تم الحل') stats.resolved++;
                else stats.pending++;
            });
            return {
                name: analyticsContractor.name || analyticsContractor.companyName || contractor.name || contractor.companyName || 'غير محدد',
                stats
            };
        }).filter((item) => item.stats.total > 0)
            .sort((a, b) => b.stats.total - a.stats.total);

        const sliced = limit > 0 ? rows.slice(0, limit) : rows;
        const summary = sliced.reduce((acc, item) => {
            acc.total += item.stats.total;
            acc.high += item.stats.high;
            acc.resolved += item.stats.resolved;
            acc.pending += item.stats.pending;
            return acc;
        }, { total: 0, high: 0, resolved: 0, pending: 0 });
        const overallResolution = summary.total > 0 ? Math.round((summary.resolved / summary.total) * 100) : 0;
        return { rows: sliced, summary, overallResolution, allCount: rows.length };
    },

    _getContractorLocationAnalysisData_(contractors, violations, limit = 12) {
        const contractorList = Array.isArray(contractors) ? contractors : [];
        const viols = Array.isArray(violations) ? violations : [];
        const placeBuckets = {};
        viols.forEach((violation) => {
            const label = this._ctrGetViolationPlaceLabel(violation);
            if (!placeBuckets[label]) placeBuckets[label] = { violations: 0, contractorCounts: {} };
            const bucket = placeBuckets[label];
            bucket.violations++;
            let matchedName = String(violation.contractorName || '').trim();
            if (!matchedName && contractorList.length) {
                for (const contractor of contractorList) {
                    const prepared = this.prepareContractorForAnalytics(contractor);
                    const key = this.getPreferredContractorAnalyticsKey(prepared, contractor.id || contractor.contractorId);
                    const ctx = this.buildContractorAnalyticsMatchers(prepared, key);
                    if (ctx.violationBelongsToContractor(violation)) {
                        matchedName = prepared.name || prepared.companyName || contractor.name || contractor.companyName || '';
                        break;
                    }
                }
            }
            if (matchedName) bucket.contractorCounts[matchedName] = (bucket.contractorCounts[matchedName] || 0) + 1;
        });
        return Object.entries(placeBuckets)
            .map(([label, bucket]) => {
                const topEntry = Object.entries(bucket.contractorCounts).sort((a, b) => b[1] - a[1])[0] || null;
                return {
                    label,
                    violations: bucket.violations,
                    contractorsCount: Object.keys(bucket.contractorCounts).length,
                    topContractor: topEntry ? { name: topEntry[0], count: topEntry[1] } : null
                };
            })
            .sort((a, b) => b.violations - a.violations || b.contractorsCount - a.contractorsCount)
            .slice(0, limit);
    },

    async _ctrDownloadAnalyticsPdf_(htmlContent, fileName) {
        if (typeof Violations !== 'undefined' && typeof Violations._downloadHtmlReportAsPdf === 'function') {
            return Violations._downloadHtmlReportAsPdf(htmlContent, fileName);
        }
        if (typeof FormHeader !== 'undefined' && typeof FormHeader.generatePDF === 'function') {
            await FormHeader.generatePDF(htmlContent, fileName);
            return true;
        }
        return this._ctrOpenAnalyticsPrintReport(htmlContent);
    },

    _renderContractorAnalyticsShellHTML() {
        const period = String(this._ctrAnalysisPeriod ?? '0');
        const periodLabels = ['30 يوم', '3 أشهر', '6 أشهر', 'سنة', 'الكل'];
        const periodValues = ['30', '90', '180', '365', '0'];
        const periodBtns = periodValues.map((v, i) => {
            const active = period === v;
            return `<button type="button" class="ctr-period-btn" data-period="${v}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${active ? '#fff' : 'rgba(255,255,255,0.15)'};color:${active ? '#0b2d4f' : '#fff'};">${periodLabels[i]}</button>`;
        }).join('');

        return `
        <div id="ctr-analytics-root" style="font-family:inherit;">
            <div id="ctr-analytics-toolbar" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#312e81 0%,#6366f1 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(99,102,241,0.35);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-chart-line" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">لوحة تحليل المقاولين</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.85;">تحليل شامل • مطابق لقائمة المعتمدين • فلاتر تفاعلية • تصدير PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-left:2px;">الفترة:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">${periodBtns}</div>
                    <button type="button" id="ctr-toggle-filters-btn" title="فلاتر تفاعلية" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;display:flex;align-items:center;gap:5px;">
                        <i class="fas fa-sliders-h"></i><span>فلاتر</span><span id="ctr-filter-active-badge" style="display:none;background:#ef4444;color:#fff;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">•</span>
                    </button>
                    <button type="button" id="ctr-export-pdf-btn" title="تصدير PDF" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(239,68,68,0.85);color:#fff;font-size:0.78rem;font-weight:600;display:flex;align-items:center;gap:5px;">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button type="button" id="ctr-analytics-refresh" title="تحديث" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <div id="ctr-filter-panel" style="display:none;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#0f8b83;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#0b2d4f;">الفلاتر التفاعلية</span>
                        <span id="ctr-filter-results-count" style="background:#dff4f1;color:#0f766e;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button type="button" id="ctr-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #e2e8f0;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;">
                        <i class="fas fa-times ml-1"></i>مسح الكل
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;">
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">نوع الجهة</label>
                        <select id="ctr-af-entity" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;">
                            <option value="">الكل</option>
                            <option value="contractor">مقاول</option>
                            <option value="supplier">مورد</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">حالة المقاول</label>
                        <select id="ctr-af-status" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;">
                            <option value="">الكل</option>
                            <option value="active">نشط</option>
                            <option value="inactive">غير نشط</option>
                            <option value="expired">منتهي العقد</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">شدة المخالفة</label>
                        <select id="ctr-af-severity" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;">
                            <option value="">الكل</option>
                            <option value="high">عالية</option>
                            <option value="medium">متوسطة</option>
                            <option value="low">منخفضة</option>
                        </select>
                    </div>
                </div>
            </div>

            <div id="ctr-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:8px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-circle-notch" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">حالة المقاولين</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="ctr-chart-status"></canvas>
                        <div id="ctr-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-exclamation-triangle" style="color:#ef4444;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">المخالفات حسب الشدة</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="ctr-chart-severity"></canvas>
                        <div id="ctr-chart-severity-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
            </div>

            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-chart-area" style="color:#8b5cf6;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">اتجاه المخالفات (آخر 12 شهر)</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="ctr-chart-trend"></canvas>
                    <div id="ctr-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                </div>
            </div>

            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-user-hard-hat" style="color:#f59e0b;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">أعلى المقاولين مخالفات (8)</span>
                </div>
                <div style="padding:12px;position:relative;height:280px;">
                    <canvas id="ctr-chart-top-violators"></canvas>
                    <div id="ctr-chart-top-violators-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marker-alt" style="color:#3b82f6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">مخالفات المقاولين حسب الموقع (أعلى 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="ctr-chart-location"></canvas>
                        <div id="ctr-chart-location-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-pin" style="color:#d97706;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">مخالفات المقاولين حسب مكان المخالفة (أعلى 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="ctr-chart-place"></canvas>
                        <div id="ctr-chart-place-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
            </div>

            <div id="ctr-locations-analysis"></div>

            <div id="ctr-violations-analysis"></div>
            <div id="ctr-expiring-contracts"></div>
            <div id="ctr-detailed-analysis"></div>
            <style>
                #ctr-analytics-root .ctr-panel { margin-bottom:16px;border-radius:14px;overflow:hidden;background:#fff;border:1px solid #e2e8f0;box-shadow:0 4px 20px rgba(15,23,42,.06); }
                #ctr-analytics-root .ctr-panel-header { padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;color:#fff; }
                #ctr-analytics-root .ctr-panel-header-icon { width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0; }
                #ctr-analytics-root .ctr-panel-badge { background:rgba(255,255,255,.22);border:1px solid rgba(255,255,255,.35);padding:4px 12px;border-radius:999px;font-size:.72rem;font-weight:700;white-space:nowrap; }
                #ctr-analytics-root .ctr-panel-summary { display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;padding:14px 16px;border-bottom:1px solid #f1f5f9; }
                #ctr-analytics-root .ctr-panel-summary-item { border-radius:10px;padding:10px 12px;text-align:center; }
                #ctr-analytics-root .ctr-panel-summary-item .val { font-size:1.35rem;font-weight:800;line-height:1.1; }
                #ctr-analytics-root .ctr-panel-summary-item .lbl { font-size:.68rem;color:#64748b;margin-top:4px;font-weight:600; }
                #ctr-analytics-root .ctr-data-table { width:100%;border-collapse:collapse;font-size:.82rem; }
                #ctr-analytics-root .ctr-data-table thead th { padding:11px 14px;font-weight:700;font-size:.74rem;white-space:nowrap;border-bottom:2px solid;position:sticky;top:0;z-index:2; }
                #ctr-analytics-root .ctr-data-table tbody td { padding:11px 14px;border-bottom:1px solid #f1f5f9;vertical-align:middle; }
                #ctr-analytics-root .ctr-data-table tbody tr:hover { background:#f8fafc; }
                #ctr-analytics-root .ctr-data-table-wrap { overflow-x:auto;max-height:65vh;overflow-y:auto; }
                #ctr-analytics-root .ctr-sev-pill { display:inline-flex;align-items:center;justify-content:center;min-width:28px;padding:3px 8px;border-radius:999px;font-size:.72rem;font-weight:800; }
                #ctr-analytics-root .ctr-sev-high { background:#fee2e2;color:#b91c1c;border:1px solid #fecaca; }
                #ctr-analytics-root .ctr-sev-med { background:#fef3c7;color:#b45309;border:1px solid #fde68a; }
                #ctr-analytics-root .ctr-sev-low { background:#dcfce7;color:#15803d;border:1px solid #bbf7d0; }
                #ctr-analytics-root .ctr-progress { width:72px;height:6px;background:#e2e8f0;border-radius:999px;overflow:hidden;margin:0 auto 4px; }
                #ctr-analytics-root .ctr-progress > span { display:block;height:100%;border-radius:999px;transition:width .3s; }
                #ctr-analytics-root .ctr-rank { width:30px;height:30px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:.78rem;flex-shrink:0; }
                #ctr-analytics-root .ctr-act-active { display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;font-size:.68rem;font-weight:700;background:#dcfce7;color:#15803d;border:1px solid #bbf7d0; }
                #ctr-analytics-root .ctr-act-inactive { display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;font-size:.68rem;font-weight:700;background:#fee2e2;color:#b91c1c;border:1px solid #fecaca; }
                #ctr-analytics-root .ctr-empty-state { padding:48px 24px;text-align:center; }
                #ctr-analytics-root .ctr-empty-state i { font-size:2.8rem;margin-bottom:12px;display:block; }
            </style>
        </div>`;
    },

    async renderAnalyticsSection() {
        if (!this.isContractorApprovalAdminUser()) {
            return `
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-300 mb-3"></i>
                            <p class="text-gray-500">هذه الصفحة متاحة للمدير فقط</p>
                        </div>
                    </div>
                </div>
            `;
        }

        if (this._ctrAnalysisPeriod === undefined) this._ctrAnalysisPeriod = '0';
        this.ensureContractorChartJSLoaded().catch(() => {});
        return this._renderContractorAnalyticsShellHTML();
    },

    async ensureContractorChartJSLoaded() {
        if (typeof Chart !== 'undefined') return true;
        const existingScript = document.querySelector('script[src*="chart.js"], script[src*="chartjs"]');
        if (existingScript) {
            return new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    if (typeof Chart !== 'undefined') {
                        clearInterval(checkInterval);
                        resolve(true);
                    }
                }, 100);
                setTimeout(() => { clearInterval(checkInterval); resolve(false); }, 5000);
            });
        }
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
            script.crossOrigin = 'anonymous';
            script.onload = () => resolve(typeof Chart !== 'undefined');
            script.onerror = () => resolve(false);
            document.head.appendChild(script);
        });
    },

    _ctrFilterRecordsByPeriod(records, days, getDateValue) {
        if (!days || days === 0) return records;
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        return (records || []).filter((record) => {
            const raw = typeof getDateValue === 'function' ? getDateValue(record) : record?.date;
            if (!raw) return true;
            const dt = new Date(raw);
            return !isNaN(dt.getTime()) && dt >= cutoff;
        });
    },

    _ctrGetContractorContractState(contractor) {
        const endDateVal = contractor?.endDate || contractor?.expiryDate;
        if (!endDateVal) return 'unknown';
        try {
            const endDate = new Date(endDateVal);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            const diff = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
            if (diff < 0) return 'expired';
            if (diff <= 30) return 'expiring';
            return 'active';
        } catch (_e) {
            return 'unknown';
        }
    },

    _ctrApplyAnalyticsFilters(contractors, violations) {
        const entityFilter = document.getElementById('ctr-af-entity')?.value || '';
        const statusFilter = document.getElementById('ctr-af-status')?.value || '';
        const severityFilter = document.getElementById('ctr-af-severity')?.value || '';

        let filteredContractors = Array.isArray(contractors) ? [...contractors] : [];
        if (entityFilter === 'contractor') {
            filteredContractors = filteredContractors.filter((c) => this.normalizeApprovedEntityType(c.entityType || c.type) === 'contractor');
        } else if (entityFilter === 'supplier') {
            filteredContractors = filteredContractors.filter((c) => this.normalizeApprovedEntityType(c.entityType || c.type) === 'supplier');
        }

        if (statusFilter === 'active') {
            filteredContractors = filteredContractors.filter((c) => this.isEntityEnabled(c));
        } else if (statusFilter === 'inactive') {
            filteredContractors = filteredContractors.filter((c) => !this.isEntityEnabled(c));
        } else if (statusFilter === 'expired') {
            filteredContractors = filteredContractors.filter((c) => this._ctrGetContractorContractState(c) === 'expired');
        }

        let filteredViolations = Array.isArray(violations) ? [...violations] : [];
        if (severityFilter === 'high') {
            filteredViolations = filteredViolations.filter((v) => ['عالية', 'high', 'حرجة'].includes(String(v.severity || '').trim()));
        } else if (severityFilter === 'medium') {
            filteredViolations = filteredViolations.filter((v) => ['متوسطة', 'medium'].includes(String(v.severity || '').trim()));
        } else if (severityFilter === 'low') {
            filteredViolations = filteredViolations.filter((v) => ['منخفضة', 'low', 'قليلة', 'منخضة'].includes(String(v.severity || '').trim()));
        }

        const hasFilters = !!(entityFilter || statusFilter || severityFilter);
        const badge = document.getElementById('ctr-filter-active-badge');
        if (badge) badge.style.display = hasFilters ? 'inline' : 'none';

        return { filteredContractors, filteredViolations, hasFilters };
    },

    _ctrGroupByField(records, getLabel, limit = 0) {
        const map = {};
        (records || []).forEach((record) => {
            const label = String(typeof getLabel === 'function' ? getLabel(record) : record?.label || 'غير محدد').trim() || 'غير محدد';
            map[label] = (map[label] || 0) + 1;
        });
        let entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
        if (limit > 0) entries = entries.slice(0, limit);
        return { labels: entries.map((e) => e[0]), data: entries.map((e) => e[1]) };
    },

    _ctrChartColors(count) {
        const palette = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#0ea5e9', '#ec4899', '#14b8a6', '#f97316', '#64748b'];
        return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
    },

    _ctrDestroyChart(canvasId) {
        const prev = this._ctrAnalyticsCharts && this._ctrAnalyticsCharts[canvasId];
        if (prev) {
            try { prev.destroy(); } catch (_e) { /* ignore */ }
            delete this._ctrAnalyticsCharts[canvasId];
        }
    },

    _ctrDrawDoughnut(canvasId, labels, data, colors) {
        const canvas = document.getElementById(canvasId);
        const emptyEl = document.getElementById(canvasId + '-empty');
        if (!canvas) return;
        if (!data.length || data.reduce((a, b) => a + b, 0) === 0) {
            canvas.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
            this._ctrDestroyChart(canvasId);
            return;
        }
        canvas.style.display = 'block';
        if (emptyEl) emptyEl.style.display = 'none';
        this._ctrDestroyChart(canvasId);
        if (typeof Chart === 'undefined') return;
        const total = data.reduce((a, b) => a + b, 0);
        const chart = new Chart(canvas, {
            type: 'doughnut',
            data: { labels, datasets: [{ data, backgroundColor: colors || this._ctrChartColors(data.length), borderWidth: 2, borderColor: '#fff', hoverOffset: 6 }] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '62%',
                plugins: {
                    legend: { position: 'bottom', labels: { padding: 10, font: { size: 11 }, usePointStyle: true, boxWidth: 9 } },
                    tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed} (${total > 0 ? ((ctx.parsed / total) * 100).toFixed(1) : 0}%)` } }
                }
            }
        });
        if (!this._ctrAnalyticsCharts) this._ctrAnalyticsCharts = {};
        this._ctrAnalyticsCharts[canvasId] = chart;
    },

    _ctrDrawHBar(canvasId, labels, data, color) {
        const canvas = document.getElementById(canvasId);
        const emptyEl = document.getElementById(canvasId + '-empty');
        if (!canvas) return;
        if (!data.length || data.reduce((a, b) => a + b, 0) === 0) {
            canvas.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
            this._ctrDestroyChart(canvasId);
            return;
        }
        canvas.style.display = 'block';
        if (emptyEl) emptyEl.style.display = 'none';
        this._ctrDestroyChart(canvasId);
        if (typeof Chart === 'undefined') return;
        const chart = new Chart(canvas, {
            type: 'bar',
            data: { labels, datasets: [{ data, backgroundColor: color || 'rgba(99,102,241,0.75)', borderRadius: 5, borderSkipped: false }] },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true, ticks: { precision: 0, font: { size: 11 } }, grid: { color: '#f1f5f9' } },
                    y: { ticks: { font: { size: 11 }, callback: (v) => { const t = String(labels[v] || ''); return t.length > 18 ? `${t.slice(0, 17)}…` : t; } } }
                }
            }
        });
        if (!this._ctrAnalyticsCharts) this._ctrAnalyticsCharts = {};
        this._ctrAnalyticsCharts[canvasId] = chart;
    },

    _ctrDrawTrend(canvasId, violations) {
        const canvas = document.getElementById(canvasId);
        const emptyEl = document.getElementById(canvasId + '-empty');
        if (!canvas) return;
        const months = [];
        const counts = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push(d.toLocaleDateString('ar-SA', { month: 'short', year: '2-digit' }));
            const y = d.getFullYear();
            const m = d.getMonth();
            counts.push((violations || []).filter((v) => {
                const raw = v.violationDate || v.date || v.createdAt;
                if (!raw) return false;
                const dt = new Date(raw);
                return !isNaN(dt.getTime()) && dt.getFullYear() === y && dt.getMonth() === m;
            }).length);
        }
        if (counts.reduce((a, b) => a + b, 0) === 0) {
            canvas.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
            this._ctrDestroyChart(canvasId);
            return;
        }
        canvas.style.display = 'block';
        if (emptyEl) emptyEl.style.display = 'none';
        this._ctrDestroyChart(canvasId);
        if (typeof Chart === 'undefined') return;
        const chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{ data: counts, borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.12)', fill: true, tension: 0.35, pointRadius: 3 }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { precision: 0 } }, x: { ticks: { font: { size: 10 } } } }
            }
        });
        if (!this._ctrAnalyticsCharts) this._ctrAnalyticsCharts = {};
        this._ctrAnalyticsCharts[canvasId] = chart;
    },

    async _fetchContractorAnalyticsData() {
        if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.readFromSheets || !AppState.googleConfig?.appsScript?.enabled) {
            return;
        }
        try {
            const [v, ev] = await Promise.all([
                GoogleIntegration.readFromSheets('Violations'),
                GoogleIntegration.readFromSheets('ContractorEvaluations')
            ]);
            if (Array.isArray(v)) AppState.appData.violations = v;
            if (Array.isArray(ev)) AppState.appData.contractorEvaluations = ev;
        } catch (e) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('تعذر جلب بيانات تحليل المقاولين:', e);
        }
    },

    bindContractorAnalyticsEvents() {
        const root = document.getElementById('ctr-analytics-root');
        if (!root || root.dataset.bound === '1') return;
        root.dataset.bound = '1';

        root.querySelectorAll('.ctr-period-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                this._ctrAnalysisPeriod = btn.getAttribute('data-period') || '0';
                root.querySelectorAll('.ctr-period-btn').forEach((b) => {
                    const isActive = b === btn;
                    b.style.background = isActive ? '#fff' : 'rgba(255,255,255,0.15)';
                    b.style.color = isActive ? '#4338ca' : '#fff';
                });
                this.updateContractorAnalyticsResults();
            });
        });

        document.getElementById('ctr-analytics-refresh')?.addEventListener('click', () => this.loadContractorAnalytics());
        document.getElementById('ctr-export-pdf-btn')?.addEventListener('click', () => this.exportContractorAnalyticsPDF());

        const toggleFiltersBtn = document.getElementById('ctr-toggle-filters-btn');
        const filterPanel = document.getElementById('ctr-filter-panel');
        toggleFiltersBtn?.addEventListener('click', () => {
            if (!filterPanel) return;
            const isOpen = filterPanel.style.display !== 'none';
            filterPanel.style.display = isOpen ? 'none' : 'block';
        });

        document.getElementById('ctr-filter-reset-btn')?.addEventListener('click', () => {
            ['ctr-af-entity', 'ctr-af-status', 'ctr-af-severity'].forEach((id) => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
            this.updateContractorAnalyticsResults();
        });

        ['ctr-af-entity', 'ctr-af-status', 'ctr-af-severity'].forEach((id) => {
            document.getElementById(id)?.addEventListener('change', () => this.updateContractorAnalyticsResults());
        });
    },

    async loadContractorAnalytics() {
        const root = document.getElementById('ctr-analytics-root');
        if (!root) return;
        try {
            await Promise.allSettled([
                this.ensureApprovedContractorsDataLoaded({ force: false }),
                this._fetchContractorAnalyticsData()
            ]);
        } catch (_e) { /* ignore */ }
        await this.updateContractorAnalyticsResults();
    },

    _getCtrAnalysisPeriodLabel() {
        const map = { '30': '30 يوم', '90': '3 أشهر', '180': '6 أشهر', '365': 'سنة', '0': 'الكل' };
        return map[String(this._ctrAnalysisPeriod || '0')] || 'الكل';
    },

    _ctrFilterApprovedContractors(approvedList, entityFilter, statusFilter) {
        let list = Array.isArray(approvedList) ? [...approvedList] : [];
        if (entityFilter === 'contractor') {
            list = list.filter((c) => this.normalizeApprovedEntityType(c.entityType || c.type) === 'contractor');
        } else if (entityFilter === 'supplier') {
            list = list.filter((c) => this.normalizeApprovedEntityType(c.entityType || c.type) === 'supplier');
        }
        if (statusFilter === 'active') {
            list = list.filter((c) => this.isEntityEnabled(c));
        } else if (statusFilter === 'inactive') {
            list = list.filter((c) => !this.isEntityEnabled(c));
        } else if (statusFilter === 'expired') {
            list = list.filter((c) => this._ctrGetContractorContractState(c) === 'expired');
        }
        return list;
    },

    _ctrScopeRecordsToContractors(records, contractors, recordType) {
        if (!Array.isArray(records) || !Array.isArray(contractors) || contractors.length === 0) return [];
        const belongsKey = recordType === 'evaluation' ? 'evaluationBelongsToContractor' : 'violationBelongsToContractor';
        const primaryKeys = recordType === 'evaluation'
            ? ['evaluationId', 'id', 'isoCode']
            : ['isoCode', 'id'];
        const secondaryKeys = recordType === 'evaluation'
            ? ['contractorId', 'contractorName', 'evaluationDate', 'projectName', 'finalScore']
            : ['contractorId', 'contractorName', 'violationType', 'violationDate', 'violationTime'];
        const matched = [];
        contractors.forEach((contractor) => {
            const prepared = this.prepareContractorForAnalytics(contractor);
            const key = this.getPreferredContractorAnalyticsKey(prepared, contractor.id || contractor.contractorId);
            const ctx = this.buildContractorAnalyticsMatchers(prepared, key);
            matched.push(...records.filter((r) => ctx[belongsKey](r)));
        });
        return this.dedupeContractorRecords(matched, primaryKeys, secondaryKeys);
    },

    buildContractorDetailedStatsList(contractors, evaluations, violations) {
        if (!Array.isArray(contractors) || contractors.length === 0) return [];
        return contractors.map((contractor) => {
            const analyticsContractor = this.prepareContractorForAnalytics(contractor);
            const cId = this.getPreferredContractorAnalyticsKey(analyticsContractor, contractor.id || contractor.contractorId);
            const ctx = this.buildContractorAnalyticsMatchers(analyticsContractor, cId);
            const contractorEvaluationRows = this.dedupeContractorRecords(
                (evaluations || []).filter(ctx.evaluationBelongsToContractor),
                ['evaluationId', 'id', 'isoCode'],
                ['contractorId', 'contractorName', 'evaluationDate', 'projectName', 'finalScore']
            );
            const uniqueEvaluationIds = new Set(
                contractorEvaluationRows
                    .map((record) => String(record?.evaluationId || record?.id || '').trim())
                    .filter(Boolean)
            );
            const contractorEvaluationsCount = uniqueEvaluationIds.size > 0 ? uniqueEvaluationIds.size : contractorEvaluationRows.length;
            const contractorViolations = this.dedupeContractorRecords(
                (violations || []).filter(ctx.violationBelongsToContractor),
                ['isoCode', 'id'],
                ['contractorId', 'contractorName', 'violationType', 'violationDate', 'violationTime']
            );

            let avgScore = 0;
            if (contractorEvaluationRows.length > 0) {
                const validScores = contractorEvaluationRows
                    .map((e) => parseFloat(e.finalScore) || parseFloat(e.score) || 0)
                    .filter((score) => !isNaN(score) && score >= 0 && score <= 100);
                if (validScores.length > 0) {
                    avgScore = Math.round((validScores.reduce((a, b) => a + b, 0) / validScores.length) * 100) / 100;
                }
            }

            const highViolations = contractorViolations.filter((v) => {
                const severity = (v.severity || '').toString().trim();
                return severity === 'عالية' || severity === 'high' || severity === 'حرجة';
            }).length;
            const resolvedViolations = contractorViolations.filter((v) => {
                const status = (v.status || '').toString().trim();
                return status === 'محلول' || status === 'resolved' || status === 'تم الحل';
            }).length;
            const resolutionRate = contractorViolations.length > 0
                ? Math.round((resolvedViolations / contractorViolations.length) * 100)
                : 100;

            let contractStatus = 'active';
            let daysRemaining = null;
            const contractEndDate = contractor.endDate || contractor.expiryDate;
            if (contractEndDate) {
                try {
                    const endDate = new Date(contractEndDate);
                    const now = new Date();
                    const diff = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
                    daysRemaining = diff;
                    if (diff < 0) contractStatus = 'expired';
                    else if (diff <= 30) contractStatus = 'expiring';
                } catch (_e) {
                    contractStatus = 'unknown';
                }
            }

            return {
                ...contractor,
                analyticsLookupKey: cId,
                analyticsDisplayName: analyticsContractor.name || analyticsContractor.companyName || contractor.name || contractor.companyName || '',
                evaluationsCount: contractorEvaluationsCount,
                violationsCount: contractorViolations.length,
                avgScore,
                highViolations,
                resolvedViolations,
                resolutionRate,
                contractStatus,
                daysRemaining
            };
        }).sort((a, b) => {
            const scoreA = a.avgScore - (a.violationsCount * 5) - (a.highViolations * 10);
            const scoreB = b.avgScore - (b.violationsCount * 5) - (b.highViolations * 10);
            return scoreB - scoreA;
        });
    },

    _collectContractorAnalyticsSnapshot() {
        const period = parseInt(this._ctrAnalysisPeriod || '0', 10);
        const allContractors = this.getContractorsForAnalyticsList();
        const approvedContractors = typeof this.getApprovedEntitiesStatsSource === 'function'
            ? this.getApprovedEntitiesStatsSource()
            : (AppState.appData.approvedContractors || []);
        let evaluations = AppState.appData.contractorEvaluations || [];
        let violations = (AppState.appData.violations || []).filter((v) =>
            v.contractorName || v.contractorId || (v.personType && (v.personType === 'contractor' || v.personType === 'مقاول'))
        );

        evaluations = this._ctrFilterRecordsByPeriod(evaluations, period, (e) => e.evaluationDate || e.createdAt || e.date);
        violations = this._ctrFilterRecordsByPeriod(violations, period, (v) => v.violationDate || v.date || v.createdAt);

        const { filteredContractors, filteredViolations } = this._ctrApplyAnalyticsFilters(allContractors, violations);
        const entityFilter = document.getElementById('ctr-af-entity')?.value || '';
        const statusFilter = document.getElementById('ctr-af-status')?.value || '';
        const filteredApproved = this._ctrFilterApprovedContractors(approvedContractors, entityFilter, statusFilter);
        const scopedEvaluations = this._ctrScopeRecordsToContractors(evaluations, filteredContractors, 'evaluation');
        const scopedViolations = this._ctrScopeRecordsToContractors(filteredViolations, filteredContractors, 'violation');
        const detailedStats = this.buildContractorDetailedStatsList(filteredContractors, scopedEvaluations, scopedViolations);
        const analytics = this.buildContractorAnalyticsKpis(filteredContractors, filteredApproved, detailedStats, scopedViolations);
        const expiringContracts = this.getExpiringContracts(filteredContractors, filteredApproved);

        return {
            period,
            periodLabel: this._getCtrAnalysisPeriodLabel(),
            filteredContractors,
            filteredApproved,
            evaluations: scopedEvaluations,
            violations: scopedViolations,
            analytics,
            expiringContracts,
            detailedStats,
            resultsCountText: filteredContractors.length + ' مقاول • ' + detailedStats.reduce((s, r) => s + (r.violationsCount || 0), 0) + ' مخالفة'
        };
    },

    _ctrContractorIsApproved(contractor, approvedList) {
        if (!contractor) return false;
        if (contractor.approvedEntityId) return true;
        const prepared = this.prepareContractorForAnalytics(contractor);
        const lookupKey = this.getPreferredContractorAnalyticsKey(prepared, contractor.id || contractor.contractorId);
        return (approvedList || []).some((ac) => {
            if (!this.isApprovalActive(ac, true)) return false;
            if (String(ac.id || '') === String(contractor.approvedEntityId || '')) return true;
            if (String(ac.contractorId || '') && String(ac.contractorId) === String(contractor.id || contractor.contractorId || '')) {
                return true;
            }
            const acPrepared = this.prepareContractorForAnalytics({
                ...ac,
                name: ac.companyName || ac.name || '',
                companyName: ac.companyName || ac.name || ''
            });
            const acKey = this.getPreferredContractorAnalyticsKey(acPrepared, ac.contractorId || ac.id);
            return !!(lookupKey && acKey && lookupKey === acKey);
        });
    },

    /**
     * KPIs من نفس مصدر الجدول المفصل — تطابق أرقام المديول
     */
    buildContractorAnalyticsKpis(filteredContractors, filteredApproved, detailedStats, violations) {
        const contractors = Array.isArray(filteredContractors) ? filteredContractors : [];
        const detailed = Array.isArray(detailedStats) ? detailedStats : [];
        const viols = Array.isArray(violations) ? violations : [];
        const approvedList = Array.isArray(filteredApproved) ? filteredApproved : [];

        const totalContractors = contractors.length;
        const totalApproved = contractors.filter((c) =>
            c.approvedEntityId || this._ctrContractorIsApproved(c, approvedList) || this.isApprovalActive(c, true)
        ).length;
        const activeContractors = contractors.filter((c) => this.isEntityEnabled(c)).length;
        const inactiveContractors = contractors.filter((c) => !this.isEntityEnabled(c)).length;

        const totalEvaluations = detailed.reduce((sum, row) => sum + (row.evaluationsCount || 0), 0);
        const totalViolations = detailed.reduce((sum, row) => sum + (row.violationsCount || 0), 0);
        const resolvedViolations = detailed.reduce((sum, row) => sum + (row.resolvedViolations || 0), 0);

        let scoreWeightedSum = 0;
        let scoreWeight = 0;
        detailed.forEach((row) => {
            const count = row.evaluationsCount || 0;
            if (count > 0 && !isNaN(row.avgScore)) {
                scoreWeightedSum += row.avgScore * count;
                scoreWeight += count;
            }
        });
        const avgScore = scoreWeight > 0 ? Math.round((scoreWeightedSum / scoreWeight) * 100) / 100 : 0;

        const violationResolutionRate = totalViolations > 0
            ? Math.round((resolvedViolations / totalViolations) * 10000) / 100
            : 0;

        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        let expiredContractors = 0;
        let expiringSoon = 0;
        contractors.forEach((c) => {
            const state = this._ctrGetContractorContractState(c);
            if (state === 'expired') expiredContractors++;
            else if (state === 'expiring') expiringSoon++;
        });

        const approvalRate = totalContractors > 0
            ? Math.round((totalApproved / totalContractors) * 10000) / 100
            : 0;
        const activeRate = totalContractors > 0
            ? Math.round((activeContractors / totalContractors) * 10000) / 100
            : 0;
        const inactiveRate = totalContractors > 0
            ? Math.round((inactiveContractors / totalContractors) * 10000) / 100
            : 0;
        const violationsPerContractor = totalContractors > 0
            ? Math.round((totalViolations / totalContractors) * 100) / 100
            : 0;

        const contractorViolations = viols.filter((v) =>
            v.contractorName || v.contractorId || (v.personType && (v.personType === 'contractor' || v.personType === 'مقاول'))
        );
        const highSeverityViolations = contractorViolations.filter((v) => {
            const severity = (v.severity || '').toString().trim();
            return severity === 'عالية' || severity === 'high' || severity === 'حرجة';
        }).length;
        const mediumSeverityViolations = contractorViolations.filter((v) => {
            const severity = (v.severity || '').toString().trim();
            return severity === 'متوسطة' || severity === 'medium';
        }).length;
        const lowSeverityViolations = contractorViolations.filter((v) => {
            const severity = (v.severity || '').toString().trim();
            return severity === 'منخفضة' || severity === 'low' || severity === 'قليلة';
        }).length;

        return {
            totalContractors,
            totalApproved,
            totalEvaluations,
            totalViolations,
            avgScore,
            activeContractors,
            inactiveContractors,
            expiredContractors,
            expiringSoon,
            approvalRate,
            violationsPerContractor,
            activeRate,
            inactiveRate,
            violationResolutionRate,
            resolvedViolations,
            highSeverityViolations,
            mediumSeverityViolations,
            lowSeverityViolations
        };
    },

    calculateContractorAnalytics(contractors, approvedContractors, evaluations, violations) {
        const detailedStats = this.buildContractorDetailedStatsList(
            Array.isArray(contractors) ? contractors : [],
            Array.isArray(evaluations) ? evaluations : [],
            Array.isArray(violations) ? violations : []
        );
        return this.buildContractorAnalyticsKpis(
            Array.isArray(contractors) ? contractors : [],
            Array.isArray(approvedContractors) ? approvedContractors : [],
            detailedStats,
            Array.isArray(violations) ? violations : []
        );
    },

    _buildCtrAnalyticsExportLegend_(snapshot) {
        const esc = (v) => (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML(v) : String(v ?? '');
        const exportDate = esc(new Date().toLocaleString('ar-SA', { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric' }));
        return [
            '<div class="ia-export-legend" dir="rtl" style="margin-top:12px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;page-break-inside:avoid;">',
            '<div style="font-weight:700;font-size:12px;color:#475569;margin-bottom:10px;">ملخص التقرير</div>',
            '<div style="display:flex;flex-wrap:wrap;gap:10px 18px;font-size:11px;line-height:1.55;color:#334155;">',
            '<div><strong style="color:#64748b;">الفترة:</strong> ', esc(snapshot.periodLabel), '</div>',
            '<div><strong style="color:#64748b;">السجلات:</strong> ', esc(snapshot.resultsCountText), '</div>',
            '<div><strong style="color:#64748b;">تاريخ التصدير:</strong> ', exportDate, '</div>',
            '</div></div>'
        ].join('');
    },

    _buildCtrAnalyticsExportHtml_(snapshot) {
        const esc = (v) => (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML(String(v ?? '')) : String(v ?? '');
        const ar = this._ctrPdfArStyle_();
        const a = snapshot.analytics;
        const contractors = snapshot.filteredContractors || [];
        const violations = snapshot.violations || [];

        const statusCounts = { 'نشط': 0, 'غير نشط': 0, 'قريب الانتهاء': 0, 'منتهي': 0 };
        contractors.forEach((c) => {
            const state = this._ctrGetContractorContractState(c);
            if (state === 'expired') statusCounts['منتهي']++;
            else if (state === 'expiring') statusCounts['قريب الانتهاء']++;
            else if (!this.isEntityEnabled(c)) statusCounts['غير نشط']++;
            else statusCounts['نشط']++;
        });

        const kpiCard = (label, value, bg, border, color) => `
            <div style="flex:1 1 140px;min-width:130px;padding:12px 14px;border-radius:10px;background:${bg};border:1px solid ${border};">
                <div style="font-size:11px;font-weight:700;color:${color};margin-bottom:6px;${ar}">${esc(label)}</div>
                <div style="font-size:22px;font-weight:800;color:${color};line-height:1;${ar}">${esc(value)}</div>
            </div>`;

        const violData = this._getContractorViolationsAnalysisData_(contractors, violations, 0);
        const violRows = violData.rows;
        const violSummary = violData.summary || { total: 0, high: 0, resolved: 0, pending: 0 };
        const violResolution = violData.overallResolution || 0;

        const locationRows = this._getContractorLocationAnalysisData_(contractors, violations, 12);
        const locationGroup = this._ctrGroupByField(violations, (v) => String(v.violationLocation || v.location || '').trim() || 'غير محدد', 8);
        const placeGroup = this._ctrGroupByField(violations, (v) => String(v.violationPlace || v.place || '').trim() || 'غير محدد', 8);

        const violAnalysisTableRows = violRows.map((item, i) => {
            const rate = item.stats.total > 0 ? Math.round((item.stats.resolved / item.stats.total) * 100) : 0;
            return `<tr>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${ar}">${i + 1}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${ar}">${esc(item.name)}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${ar}">${item.stats.total}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#b91c1c;${ar}">${item.stats.high}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#b45309;${ar}">${item.stats.medium}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#15803d;${ar}">${item.stats.low}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#15803d;${ar}">${item.stats.resolved}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#c2410c;${ar}">${item.stats.pending}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${ar}">${rate}%</td>
            </tr>`;
        }).join('');

        const locationTableRows = locationRows.map((row, i) => {
            const ratio = contractors.length > 0 ? Math.round((row.contractorsCount / contractors.length) * 100) : 0;
            return `<tr>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${ar}">${i + 1}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${ar}">${esc(row.label)}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;color:#dc2626;${ar}">${row.violations}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${ar}">${row.contractorsCount}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${ar}">${ratio}%</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${ar}">${row.topContractor ? esc(row.topContractor.name) + ' (' + row.topContractor.count + ')' : '—'}</td>
            </tr>`;
        }).join('');

        const locChartRows = locationGroup.labels.map((label, i) => `<tr>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${ar}">${esc(label)}</td>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${ar}">${locationGroup.data[i]}</td>
        </tr>`).join('');

        const placeChartRows = placeGroup.labels.map((label, i) => `<tr>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${ar}">${esc(label)}</td>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${ar}">${placeGroup.data[i]}</td>
        </tr>`).join('');

        const topViolators = (snapshot.detailedStats || [])
            .filter((row) => row.violationsCount > 0)
            .sort((x, y) => y.violationsCount - x.violationsCount)
            .slice(0, 10)
            .map((row, i) => `<tr>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${ar}">${i + 1}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${ar}">${esc(row.analyticsDisplayName || row.name || row.companyName)}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${ar}">${row.violationsCount}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#b91c1c;${ar}">${row.highViolations}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${ar}">${row.resolutionRate}%</td>
            </tr>`).join('');

        const detailedRows = (snapshot.detailedStats || []).map((row, i) => {
            let contractLabel = 'نشط';
            if (row.contractStatus === 'expired') contractLabel = 'منتهي';
            else if (row.contractStatus === 'expiring') contractLabel = 'قريب (' + row.daysRemaining + ' يوم)';
            else if (row.contractStatus === 'unknown') contractLabel = 'غير محدد';
            const activeLabel = this.isEntityEnabled(row) ? 'نشط' : 'غير نشط';
            return `<tr>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${ar}">${i + 1}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:right;font-size:10px;${ar}">${esc(row.analyticsDisplayName || row.name || row.companyName)}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${ar}">${esc(activeLabel)}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${ar}">${esc(row.serviceType || row.entityType || '-')}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${ar}">${esc(contractLabel)}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${ar}">${row.evaluationsCount}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${ar}">${row.avgScore}%</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${ar}">${row.violationsCount}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${ar}">${row.highViolations}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${ar}">${row.resolutionRate}%</td>
            </tr>`;
        }).join('');

        const expiringRows = (snapshot.expiringContracts || []).map((c) => `<tr>
            <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${ar}">${esc(c.name)}</td>
            <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${ar}">${c.daysRemaining}</td>
            <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${ar}">${esc(c.endDate ? new Date(c.endDate).toLocaleDateString('ar-SA') : '-')}</td>
        </tr>`).join('');

        const sectionTitle = (title, color = '#312e81', border = '#c7d2fe') => `
            <h3 dir="rtl" style="font-size:16px;font-weight:800;color:${color};margin:22px 0 10px;padding-bottom:8px;border-bottom:2px solid ${border};${ar}">${esc(title)}</h3>`;

        const tableHead = (cells, bg = '#312e81') => `<tr style="background:${bg};color:#fff;">${cells.map((c) =>
            `<th dir="rtl" style="padding:10px 8px;border:1px solid ${bg};text-align:center;font-weight:700;font-size:11px;white-space:nowrap;${ar}">${c}</th>`
        ).join('')}</tr>`;

        return `
            <div dir="rtl" style="direction:rtl;${ar}">
                ${sectionTitle('مؤشرات الأداء الرئيسية', '#1e3a8a', '#bfdbfe')}
                <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:8px;">
                    ${kpiCard('إجمالي المقاولين', a.totalContractors, '#eff6ff', '#bfdbfe', '#1d4ed8')}
                    ${kpiCard('المعتمدون', a.totalApproved, '#ecfdf5', '#a7f3d0', '#15803d')}
                    ${kpiCard('نشطون', a.activeContractors, '#fff7ed', '#fed7aa', '#c2410c')}
                    ${kpiCard('غير نشط', a.inactiveContractors || 0, '#fef2f2', '#fecaca', '#dc2626')}
                    ${kpiCard('التقييمات', a.totalEvaluations, '#fefce8', '#fde047', '#a16207')}
                    ${kpiCard('المخالفات', a.totalViolations, '#fef2f2', '#fecaca', '#b91c1c')}
                    ${kpiCard('متوسط التقييم', a.avgScore + '%', '#eef2ff', '#c7d2fe', '#4338ca')}
                    ${kpiCard('معدل حل المخالفات', a.violationResolutionRate + '%', '#f5f3ff', '#ddd6fe', '#7c3aed')}
                    ${kpiCard('عقود قريبة الانتهاء', a.expiringSoon || 0, '#f0fdfa', '#99f6e4', '#0f766e')}
                </div>

                ${sectionTitle('تحليل مخالفات المقاولين', '#991b1b', '#fecaca')}
                <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
                    ${kpiCard('مقاولون مخالِفون', violRows.length, '#fef2f2', '#fecaca', '#b91c1c')}
                    ${kpiCard('إجمالي المخالفات', violSummary.total, '#fff7ed', '#fed7aa', '#c2410c')}
                    ${kpiCard('شدة عالية', violSummary.high, '#fef2f2', '#fecaca', '#991b1b')}
                    ${kpiCard('محلولة', violSummary.resolved, '#ecfdf5', '#bbf7d0', '#15803d')}
                    ${kpiCard('قيد المعالجة', violSummary.pending, '#fffbeb', '#fde68a', '#b45309')}
                    ${kpiCard('معدل الحل', violResolution + '%', '#f5f3ff', '#ddd6fe', '#6d28d9')}
                </div>
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${ar}">
                    <thead>${tableHead(['#', 'اسم المقاول', 'الإجمالي', 'عالية', 'متوسطة', 'منخفضة', 'محلولة', 'قيد المعالجة', 'معدل الحل'], '#b91c1c')}</thead>
                    <tbody>${violAnalysisTableRows || `<tr><td colspan="9" style="padding:16px;text-align:center;color:#64748b;${ar}">لا توجد مخالفات للمقاولين</td></tr>`}</tbody>
                </table>

                ${sectionTitle('أكثر الأماكن مخالفة للمقاولين', '#1e40af', '#bfdbfe')}
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${ar}">
                    <thead>${tableHead(['#', 'الموقع / مكان المخالفة', 'المخالفات', 'عدد المقاولين', '% من المقاولين', 'أعلى مقاول'], '#1d4ed8')}</thead>
                    <tbody>${locationTableRows || `<tr><td colspan="6" style="padding:16px;text-align:center;color:#64748b;${ar}">لا توجد بيانات أماكن</td></tr>`}</tbody>
                </table>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:8px;">
                    <div>
                        <h4 dir="rtl" style="font-size:13px;font-weight:700;color:#1d4ed8;margin:0 0 8px;${ar}">حسب الموقع (أعلى 8)</h4>
                        <table dir="rtl" style="width:100%;border-collapse:collapse;${ar}">
                            <thead>${tableHead(['الموقع', 'العدد'], '#3b82f6')}</thead>
                            <tbody>${locChartRows || `<tr><td colspan="2" style="padding:12px;text-align:center;${ar}">—</td></tr>`}</tbody>
                        </table>
                    </div>
                    <div>
                        <h4 dir="rtl" style="font-size:13px;font-weight:700;color:#b45309;margin:0 0 8px;${ar}">حسب مكان المخالفة (أعلى 8)</h4>
                        <table dir="rtl" style="width:100%;border-collapse:collapse;${ar}">
                            <thead>${tableHead(['المكان', 'العدد'], '#d97706')}</thead>
                            <tbody>${placeChartRows || `<tr><td colspan="2" style="padding:12px;text-align:center;${ar}">—</td></tr>`}</tbody>
                        </table>
                    </div>
                </div>

                ${topViolators ? `${sectionTitle('أعلى المقاولين مخالفات', '#9a3412', '#fed7aa')}
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${ar}">
                    <thead>${tableHead(['#', 'المقاول', 'المخالفات', 'عالية', 'معدل الحل'], '#c2410c')}</thead>
                    <tbody>${topViolators}</tbody>
                </table>` : ''}

                ${sectionTitle('تحليل مفصل لكل مقاول', '#4338ca', '#c7d2fe')}
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${ar}">
                    <thead>${tableHead(['#', 'المقاول', 'التفعيل', 'نوع الخدمة', 'حالة العقد', 'التقييمات', 'متوسط', 'المخالفات', 'عالية', 'معدل الحل'], '#4f46e5')}</thead>
                    <tbody>${detailedRows || `<tr><td colspan="10" style="padding:16px;text-align:center;color:#64748b;${ar}">لا توجد بيانات</td></tr>`}</tbody>
                </table>

                ${expiringRows ? `${sectionTitle('عقود قريبة الانتهاء (30 يوم)', '#0f766e', '#99f6e4')}
                <table dir="rtl" style="width:100%;border-collapse:collapse;${ar}">
                    <thead>${tableHead(['الجهة', 'الأيام المتبقية', 'تاريخ الانتهاء'], '#0d9488')}</thead>
                    <tbody>${expiringRows}</tbody>
                </table>` : ''}
            </div>`;
    },

    _ctrOpenAnalyticsPrintReport(htmlContent) {
        try {
            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const printWindow = window.open(url, '_blank');
            if (printWindow) {
                printWindow.onload = () => {
                    setTimeout(() => {
                        printWindow.print();
                        setTimeout(() => URL.revokeObjectURL(url), 1000);
                    }, 450);
                };
                Notification?.success?.('جاري تحضير تقرير PDF للطباعة...');
                return true;
            }
            Notification?.error?.('يرجى السماح للنوافذ المنبثقة لتصدير PDF');
            return false;
        } catch (error) {
            Utils.safeError('فشل فتح تقرير التحليل:', error);
            Notification?.error?.('تعذر تصدير التحليلات');
            return false;
        }
    },

    async updateContractorAnalyticsResults() {
        const root = document.getElementById('ctr-analytics-root');
        if (!root) return;

        const snapshot = this._collectContractorAnalyticsSnapshot();
        const { filteredContractors, filteredApproved: approvedContractors, evaluations, violations: filteredViolations, analytics, expiringContracts } = snapshot;

        const resultsCount = document.getElementById('ctr-filter-results-count');
        if (resultsCount) resultsCount.textContent = snapshot.resultsCountText;

        const kpiEl = document.getElementById('ctr-kpi-strip');
        if (kpiEl) {
            const kpis = [
                { label: 'إجمالي المقاولين', value: analytics.totalContractors, icon: 'fas fa-users', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
                { label: 'المعتمدون', value: analytics.totalApproved, icon: 'fas fa-check-circle', color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
                { label: 'نشطون', value: analytics.activeContractors, icon: 'fas fa-bolt', color: '#f97316', bg: '#fff7ed', border: '#fed7aa' },
                { label: 'غير نشط', value: analytics.inactiveContractors || 0, icon: 'fas fa-ban', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
                { label: 'التقييمات', value: analytics.totalEvaluations, icon: 'fas fa-clipboard-check', color: '#eab308', bg: '#fefce8', border: '#fde047' },
                { label: 'المخالفات', value: analytics.totalViolations, icon: 'fas fa-exclamation-triangle', color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
                { label: 'متوسط التقييم', value: `${analytics.avgScore}%`, icon: 'fas fa-star', color: '#6366f1', bg: '#eef2ff', border: '#c7d2fe' },
                { label: 'معدل حل المخالفات', value: `${analytics.violationResolutionRate}%`, icon: 'fas fa-check-double', color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
                { label: 'عقود قريبة الانتهاء', value: analytics.expiringSoon || 0, icon: 'fas fa-hourglass-half', color: '#0d9488', bg: '#f0fdfa', border: '#99f6e4' }
            ];
            kpiEl.innerHTML = kpis.map((k) => `
                <div style="background:${k.bg};border:1px solid ${k.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;">
                    <div style="width:38px;height:38px;background:${k.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${k.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${k.color};line-height:1;">${k.value}</div>
                        <div style="font-size:0.7rem;color:#64748b;margin-top:2px;white-space:nowrap;">${k.label}</div>
                    </div>
                </div>`).join('');
        }

        const chartReady = await this.ensureContractorChartJSLoaded();
        if (chartReady && typeof Chart !== 'undefined') {
            const statusCounts = { نشط: 0, 'غير نشط': 0, 'قريب الانتهاء': 0, منتهي: 0 };
            filteredContractors.forEach((c) => {
                const state = this._ctrGetContractorContractState(c);
                if (state === 'expired') statusCounts['منتهي']++;
                else if (state === 'expiring') statusCounts['قريب الانتهاء']++;
                else if (!this.isEntityEnabled(c)) statusCounts['غير نشط']++;
                else statusCounts['نشط']++;
            });
            const statusEntries = Object.entries(statusCounts).filter(([, v]) => v > 0);
            this._ctrDrawDoughnut('ctr-chart-status', statusEntries.map((e) => e[0]), statusEntries.map((e) => e[1]), ['#10b981', '#ef4444', '#f59e0b', '#94a3b8']);

            const severityGroup = this._ctrGroupByField(filteredViolations, (v) => {
                const s = String(v.severity || '').trim();
                if (['عالية', 'high', 'حرجة'].includes(s)) return 'عالية';
                if (['متوسطة', 'medium'].includes(s)) return 'متوسطة';
                if (['منخفضة', 'low', 'قليلة', 'منخضة'].includes(s)) return 'منخفضة';
                return s || 'غير محدد';
            });
            this._ctrDrawDoughnut('ctr-chart-severity', severityGroup.labels, severityGroup.data, ['#ef4444', '#f59e0b', '#10b981', '#94a3b8']);

            this._ctrDrawTrend('ctr-chart-trend', filteredViolations);

            const topViolatorsMap = {};
            filteredContractors.forEach((contractor) => {
                const prepared = this.prepareContractorForAnalytics(contractor);
                const key = this.getPreferredContractorAnalyticsKey(prepared, contractor.id || contractor.contractorId);
                const ctx = this.buildContractorAnalyticsMatchers(prepared, key);
                const count = this.dedupeContractorRecords(
                    filteredViolations.filter(ctx.violationBelongsToContractor),
                    ['isoCode', 'id'],
                    ['contractorId', 'contractorName', 'violationType', 'violationDate']
                ).length;
                if (count > 0) {
                    const name = prepared.name || prepared.companyName || contractor.name || contractor.companyName || 'غير محدد';
                    topViolatorsMap[name] = count;
                }
            });
            const topEntries = Object.entries(topViolatorsMap).sort((a, b) => b[1] - a[1]).slice(0, 8);
            this._ctrDrawHBar('ctr-chart-top-violators', topEntries.map((e) => e[0]), topEntries.map((e) => e[1]), 'rgba(245,158,11,0.8)');

            const locationGroup = this._ctrGroupByField(
                filteredViolations,
                (v) => String(v.violationLocation || v.location || '').trim() || 'غير محدد',
                8
            );
            this._ctrDrawHBar('ctr-chart-location', locationGroup.labels, locationGroup.data, 'rgba(59,130,246,0.78)');

            const placeGroup = this._ctrGroupByField(
                filteredViolations,
                (v) => String(v.violationPlace || v.place || '').trim() || 'غير محدد',
                8
            );
            this._ctrDrawHBar('ctr-chart-place', placeGroup.labels, placeGroup.data, 'rgba(217,119,6,0.78)');
        }

        const locationsEl = document.getElementById('ctr-locations-analysis');
        if (locationsEl) {
            this.safeSetInnerHTML(
                locationsEl,
                this.renderContractorViolationsByLocationAnalysis(filteredContractors, filteredViolations)
            );
        }

        const violationsEl = document.getElementById('ctr-violations-analysis');
        if (violationsEl) this.safeSetInnerHTML(violationsEl, this.renderContractorViolationsAnalysis(filteredContractors, filteredViolations));

        const expiringEl = document.getElementById('ctr-expiring-contracts');
        if (expiringEl) this.safeSetInnerHTML(expiringEl, this.renderExpiringContractsAlert(expiringContracts));

        const detailedEl = document.getElementById('ctr-detailed-analysis');
        if (detailedEl) {
            this.safeSetInnerHTML(
                detailedEl,
                this.renderDetailedContractorAnalysis(filteredContractors, approvedContractors, evaluations, filteredViolations)
            );
        }
    },

    exportContractorAnalyticsPDF() {
        const btn = document.getElementById('ctr-export-pdf-btn');
        const origHtml = btn ? btn.innerHTML : '';
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        }
        const run = async () => {
            try {
                if (typeof Loading !== 'undefined' && Loading.show) {
                    Loading.show('جاري إنشاء تقرير PDF...');
                }
                const snapshot = this._collectContractorAnalyticsSnapshot();
                const content = this._buildCtrAnalyticsExportHtml_(snapshot);
                const formCode = 'CONTRACTORS-ANALYTICS-' + new Date().toISOString().slice(0, 10);
                const formTitleAr = 'تقرير تحليل بيانات المقاولين';
                const nowIso = new Date().toISOString();
                const htmlContent = typeof FormHeader !== 'undefined' && typeof FormHeader.generatePDFHTML === 'function'
                    ? FormHeader.generatePDFHTML(
                        formCode,
                        formTitleAr,
                        content,
                        false,
                        true,
                        {
                            source: 'ContractorsAnalytics',
                            titleEn: 'Contractors Analysis Report',
                            titleAr: formTitleAr,
                            includeQRCode: false,
                            compactPdfFooter: true,
                            headerLayoutLtr: true,
                            footerLegendHtml: this._buildCtrAnalyticsExportLegend_(snapshot)
                        },
                        nowIso,
                        nowIso
                    )
                    : '<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>' + formTitleAr + '</title></head><body>' + content + '</body></html>';

                const fileName = `Contractors-Analysis-${new Date().toISOString().slice(0, 10)}.pdf`;
                const downloaded = await this._ctrDownloadAnalyticsPdf_(htmlContent, fileName);
                if (downloaded) {
                    Notification?.success?.('تم إنشاء تقرير تحليل المقاولين PDF بنجاح');
                } else {
                    Notification?.error?.('تعذّر تحميل PDF — تم فتح نافذة الطباعة كبديل');
                }
            } catch (error) {
                Utils.safeError('فشل تصدير تحليل المقاولين:', error);
                Notification?.error?.('تعذر تصدير التحليلات: ' + (error.message || ''));
            } finally {
                if (typeof Loading !== 'undefined' && Loading.hide) Loading.hide();
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = origHtml;
                }
            }
        };
        run();
    },

    renderAnalyticsOverview(analytics) {
        // حساب النسب المئوية للمؤشرات البصرية
        const approvalProgress = Math.min(analytics.approvalRate, 100);
        const activeProgress = Math.min(analytics.activeRate, 100);
        const resolutionProgress = Math.min(analytics.violationResolutionRate, 100);
        const avgScoreProgress = Math.min(analytics.avgScore, 100);

        // تحديد لون متوسط التقييم
        const getScoreColor = (score) => {
            if (score >= 80) return 'text-green-600';
            if (score >= 60) return 'text-yellow-600';
            return 'text-red-600';
        };

        const getScoreBg = (score) => {
            if (score >= 80) return 'bg-gradient-to-br from-green-50 to-green-100 border-green-300';
            if (score >= 60) return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300';
            return 'bg-gradient-to-br from-red-50 to-red-100 border-red-300';
        };

        return `
            <style>
                .analytics-card {
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                .analytics-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .analytics-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
                }
                .progress-bar-container {
                    height: 8px;
                    background: rgba(0,0,0,0.1);
                    border-radius: 10px;
                    overflow: hidden;
                    margin-top: 8px;
                }
                .progress-bar {
                    height: 100%;
                    border-radius: 10px;
                    transition: width 0.6s ease;
                    background: linear-gradient(90deg, var(--bar-start), var(--bar-end));
                }
                .stat-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                }
                .trend-indicator {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 12px;
                    padding: 2px 8px;
                    border-radius: 12px;
                    margin-top: 4px;
                }
            </style>
            
            <!-- البطاقات الرئيسية -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- إجمالي المقاولين -->
                <div class="analytics-card bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border-2 border-blue-300 rounded-xl p-6 shadow-lg" 
                     style="--gradient-start: #3b82f6; --gradient-end: #60a5fa;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">إجمالي المقاولين</p>
                            <p class="text-3xl font-bold text-blue-700">${analytics.totalContractors}</p>
                        </div>
                        <div class="stat-icon bg-blue-200 text-blue-700">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        <i class="fas fa-info-circle ml-1"></i>
                        جميع المقاولين المسجلين
                    </div>
                </div>

                <!-- المعتمدين -->
                <div class="analytics-card bg-gradient-to-br from-green-50 via-green-100 to-green-50 border-2 border-green-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #10b981; --gradient-end: #34d399;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">المعتمدين</p>
                            <p class="text-3xl font-bold text-green-700">${analytics.totalApproved}</p>
                        </div>
                        <div class="stat-icon bg-green-200 text-green-700">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${approvalProgress}%; --bar-start: #10b981; --bar-end: #34d399;"></div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        <span class="font-semibold text-green-700">${analytics.approvalRate}%</span> من إجمالي المقاولين
                    </div>
                </div>

                <!-- إجمالي التقييمات -->
                <div class="analytics-card bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 border-2 border-yellow-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #f59e0b; --gradient-end: #fbbf24;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">إجمالي التقييمات</p>
                            <p class="text-3xl font-bold text-yellow-700">${analytics.totalEvaluations}</p>
                        </div>
                        <div class="stat-icon bg-yellow-200 text-yellow-700">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        <i class="fas fa-chart-line ml-1"></i>
                        تقييمات تم إجراؤها
                    </div>
                </div>

                <!-- إجمالي المخالفات -->
                <div class="analytics-card bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-2 border-red-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #ef4444; --gradient-end: #f87171;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">إجمالي المخالفات</p>
                            <p class="text-3xl font-bold text-red-700">${analytics.totalViolations}</p>
                        </div>
                        <div class="stat-icon bg-red-200 text-red-700">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        <span class="font-semibold text-red-700">${analytics.violationsPerContractor}</span> مخالفة لكل مقاول
                    </div>
                </div>
            </div>

            <!-- المؤشرات الثانوية -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- متوسط التقييم -->
                <div class="analytics-card ${getScoreBg(analytics.avgScore)} border-2 rounded-xl p-6 shadow-lg">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">متوسط التقييم</p>
                            <p class="text-3xl font-bold ${getScoreColor(analytics.avgScore)}">${analytics.avgScore}%</p>
                        </div>
                        <div class="stat-icon ${analytics.avgScore >= 80 ? 'bg-green-200 text-green-700' : analytics.avgScore >= 60 ? 'bg-yellow-200 text-yellow-700' : 'bg-red-200 text-red-700'}">
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${avgScoreProgress}%; --bar-start: ${analytics.avgScore >= 80 ? '#10b981' : analytics.avgScore >= 60 ? '#f59e0b' : '#ef4444'}; --bar-end: ${analytics.avgScore >= 80 ? '#34d399' : analytics.avgScore >= 60 ? '#fbbf24' : '#f87171'};"></div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        ${analytics.totalEvaluations > 0 ? `من ${analytics.totalEvaluations} تقييم` : 'لا توجد تقييمات'}
                    </div>
                </div>

                <!-- نسبة الاعتماد -->
                <div class="analytics-card bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50 border-2 border-indigo-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #6366f1; --gradient-end: #818cf8;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">نسبة الاعتماد</p>
                            <p class="text-3xl font-bold text-indigo-700">${analytics.approvalRate}%</p>
                        </div>
                        <div class="stat-icon bg-indigo-200 text-indigo-700">
                            <i class="fas fa-certificate"></i>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${approvalProgress}%; --bar-start: #6366f1; --bar-end: #818cf8;"></div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        ${analytics.totalApproved} من ${analytics.totalContractors} مقاول
                    </div>
                </div>

                <!-- المقاولين النشطين -->
                <div class="analytics-card bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 border-2 border-orange-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #f97316; --gradient-end: #fb923c;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">المقاولين النشطين</p>
                            <p class="text-3xl font-bold text-orange-700">${analytics.activeContractors}</p>
                        </div>
                        <div class="stat-icon bg-orange-200 text-orange-700">
                            <i class="fas fa-bolt"></i>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${activeProgress}%; --bar-start: #f97316; --bar-end: #fb923c;"></div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        <span class="font-semibold text-orange-700">${analytics.activeRate}%</span> من إجمالي المقاولين
                    </div>
                </div>

                <!-- معدل حل المخالفات -->
                <div class="analytics-card bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 border-2 border-purple-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #a855f7; --gradient-end: #c084fc;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">معدل حل المخالفات</p>
                            <p class="text-3xl font-bold text-purple-700">${analytics.violationResolutionRate}%</p>
                        </div>
                        <div class="stat-icon bg-purple-200 text-purple-700">
                            <i class="fas fa-check-double"></i>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${resolutionProgress}%; --bar-start: #a855f7; --bar-end: #c084fc;"></div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        ${analytics.resolvedViolations} من ${analytics.totalViolations} مخالفة محلولة
                    </div>
                </div>
            </div>

            <!-- إحصائيات إضافية -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <!-- العقود المنتهية -->
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-5 shadow-md">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">العقود المنتهية</p>
                            <p class="text-2xl font-bold text-gray-700">${analytics.expiredContractors}</p>
                        </div>
                        <i class="fas fa-calendar-times text-3xl text-gray-400"></i>
                    </div>
                </div>

                <!-- العقود قريبة الانتهاء -->
                <div class="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-5 shadow-md">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">قريبة من الانتهاء</p>
                            <p class="text-2xl font-bold text-amber-700">${analytics.expiringSoon || 0}</p>
                        </div>
                        <i class="fas fa-hourglass-half text-3xl text-amber-400"></i>
                    </div>
                </div>

                <!-- توزيع المخالفات -->
                <div class="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300 rounded-xl p-5 shadow-md">
                    <p class="text-sm font-medium text-gray-600 mb-3">توزيع المخالفات حسب الشدة</p>
                    <div class="space-y-2">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-red-600 font-medium">عالية:</span>
                            <span class="font-bold">${analytics.highSeverityViolations}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-yellow-600 font-medium">متوسطة:</span>
                            <span class="font-bold">${analytics.mediumSeverityViolations}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-green-600 font-medium">منخفضة:</span>
                            <span class="font-bold">${analytics.lowSeverityViolations}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    dedupeContractorRecords(records, primaryFields = [], fallbackFields = []) {
        const unique = [];
        const primarySet = new Set();
        const fallbackSet = new Set();
        const list = Array.isArray(records) ? records : [];

        list.forEach((record) => {
            if (!record || typeof record !== 'object') return;

            const primaryKey = (Array.isArray(primaryFields) ? primaryFields : [])
                .map((field) => String(record?.[field] || '').trim().toLowerCase())
                .find(Boolean);

            if (primaryKey) {
                if (primarySet.has(primaryKey)) return;
                primarySet.add(primaryKey);
                unique.push(record);
                return;
            }

            const fallbackKey = (Array.isArray(fallbackFields) ? fallbackFields : [])
                .map((field) => String(record?.[field] || '').trim().toLowerCase())
                .join('|');

            if (!fallbackKey || fallbackSet.has(fallbackKey)) return;
            fallbackSet.add(fallbackKey);
            unique.push(record);
        });

        return unique;
    },

    _ctrAnalyticsActivationBadge(contractor) {
        if (this.isEntityEnabled(contractor)) {
            return '<span class="ctr-act-active"><i class="fas fa-circle" style="font-size:5px;"></i>نشط</span>';
        }
        return '<span class="ctr-act-inactive"><i class="fas fa-circle" style="font-size:5px;"></i>غير نشط</span>';
    },

    _ctrAnalyticsResolutionBar(rate) {
        const pct = Math.min(Math.max(Number(rate) || 0, 0), 100);
        const color = pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
        const textColor = pct >= 80 ? '#15803d' : pct >= 50 ? '#b45309' : '#b91c1c';
        return `<div class="ctr-progress"><span style="width:${pct}%;background:${color};"></span></div><span style="font-size:.72rem;font-weight:700;color:${textColor};">${pct}%</span>`;
    },

    _ctrAnalyticsViolationsEmptyPanel() {
        return `
            <div class="ctr-panel">
                <div class="ctr-panel-header" style="background:linear-gradient(135deg,#166534 0%,#22c55e 100%);">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div class="ctr-panel-header-icon"><i class="fas fa-check-circle"></i></div>
                        <div>
                            <div style="font-size:1rem;font-weight:800;margin:0;">تحليل مخالفات المقاولين</div>
                            <div style="font-size:.74rem;opacity:.88;margin-top:2px;">لا توجد مخالفات في الفترة المحددة</div>
                        </div>
                    </div>
                </div>
                <div class="ctr-empty-state">
                    <i class="fas fa-check-circle" style="color:#22c55e;"></i>
                    <p style="font-size:.95rem;font-weight:700;color:#374151;margin:0;">لا توجد مخالفات مسجلة للمقاولين</p>
                    <p style="font-size:.78rem;color:#64748b;margin-top:6px;">جميع المقاولين يلتزمون بالمعايير ضمن الفلاتر الحالية</p>
                </div>
            </div>`;
    },

    renderContractorViolationsByLocationAnalysis(contractors, violations) {
        const esc = (v) => (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML(String(v ?? '')) : String(v ?? '');
        const viols = Array.isArray(violations) ? violations : [];
        const contractorList = Array.isArray(contractors) ? contractors : [];

        if (!viols.length) {
            return `
                <div class="ctr-panel">
                    <div class="ctr-panel-header" style="background:linear-gradient(135deg,#1e3a8a 0%,#3b82f6 100%);">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div class="ctr-panel-header-icon"><i class="fas fa-map-marked-alt"></i></div>
                            <div>
                                <div style="font-size:1rem;font-weight:800;margin:0;">أكثر الأماكن مخالفة للمقاولين</div>
                                <div style="font-size:.74rem;opacity:.88;margin-top:2px;">مقارنة الموقع/المكان بعدد المقاولين والمخالفات</div>
                            </div>
                        </div>
                    </div>
                    <div class="ctr-empty-state">
                        <i class="fas fa-map" style="color:#94a3b8;"></i>
                        <p style="font-size:.9rem;font-weight:700;color:#374151;margin:0;">لا توجد مخالفات لعرض توزيع الأماكن</p>
                    </div>
                </div>`;
        }

        const placeBuckets = {};
        viols.forEach((violation) => {
            const label = this._ctrGetViolationPlaceLabel(violation);
            if (!placeBuckets[label]) {
                placeBuckets[label] = { violations: 0, contractorCounts: {} };
            }
            const bucket = placeBuckets[label];
            bucket.violations++;

            let matchedName = String(violation.contractorName || '').trim();
            if (!matchedName && contractorList.length) {
                for (const contractor of contractorList) {
                    const prepared = this.prepareContractorForAnalytics(contractor);
                    const key = this.getPreferredContractorAnalyticsKey(prepared, contractor.id || contractor.contractorId);
                    const ctx = this.buildContractorAnalyticsMatchers(prepared, key);
                    if (ctx.violationBelongsToContractor(violation)) {
                        matchedName = prepared.name || prepared.companyName || contractor.name || contractor.companyName || '';
                        break;
                    }
                }
            }
            if (matchedName) {
                bucket.contractorCounts[matchedName] = (bucket.contractorCounts[matchedName] || 0) + 1;
            }
        });

        const rows = Object.entries(placeBuckets)
            .map(([label, bucket]) => {
                const topEntry = Object.entries(bucket.contractorCounts).sort((a, b) => b[1] - a[1])[0] || null;
                return {
                    label,
                    violations: bucket.violations,
                    contractorsCount: Object.keys(bucket.contractorCounts).length,
                    topContractor: topEntry ? { name: topEntry[0], count: topEntry[1] } : null
                };
            })
            .sort((a, b) => b.violations - a.violations || b.contractorsCount - a.contractorsCount)
            .slice(0, 12);

        const rowsHtml = rows.map((row, index) => {
            const ratio = contractorList.length > 0
                ? Math.round((row.contractorsCount / contractorList.length) * 100)
                : 0;
            const rankBg = index < 3 ? '#eff6ff' : '#f8fafc';
            const rankColor = index < 3 ? '#1d4ed8' : '#64748b';
            return `
                <tr>
                    <td style="text-align:center;"><span class="ctr-rank" style="background:${rankBg};color:${rankColor};">${index + 1}</span></td>
                    <td><strong style="color:#1e293b;font-size:.84rem;">${esc(row.label)}</strong></td>
                    <td style="text-align:center;"><span style="font-weight:800;color:#dc2626;font-size:.95rem;">${row.violations}</span></td>
                    <td style="text-align:center;"><span style="font-weight:700;color:#4338ca;">${row.contractorsCount}</span></td>
                    <td style="text-align:center;"><span style="font-size:.78rem;font-weight:700;color:#64748b;">${ratio}%</span></td>
                    <td>${row.topContractor?.name ? `<span style="font-size:.8rem;color:#334155;">${esc(row.topContractor.name)}</span> <span class="ctr-sev-pill ctr-sev-high" style="margin-right:6px;">${row.topContractor.count || 0}</span>` : '<span style="color:#cbd5e1;">—</span>'}</td>
                </tr>`;
        }).join('');

        const totalPlaces = rows.length;
        const totalViolationsAtPlaces = rows.reduce((s, r) => s + r.violations, 0);

        return `
            <div class="ctr-panel">
                <div class="ctr-panel-header" style="background:linear-gradient(135deg,#1e3a8a 0%,#3b82f6 55%,#60a5fa 100%);">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div class="ctr-panel-header-icon"><i class="fas fa-map-marked-alt"></i></div>
                        <div>
                            <div style="font-size:1rem;font-weight:800;margin:0;">أكثر الأماكن مخالفة للمقاولين</div>
                            <div style="font-size:.74rem;opacity:.88;margin-top:2px;">مقارنة الموقع/المكان بعدد المقاولين المتأثرين</div>
                        </div>
                    </div>
                    <span class="ctr-panel-badge">${totalPlaces} مكان • ${totalViolationsAtPlaces} مخالفة</span>
                </div>
                <div class="ctr-panel-summary" style="background:linear-gradient(180deg,#eff6ff 0%,#fff 100%);">
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #bfdbfe;">
                        <div class="val" style="color:#1d4ed8;">${contractorList.length}</div>
                        <div class="lbl">مقاول في التحليل</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #bfdbfe;">
                        <div class="val" style="color:#dc2626;">${viols.length}</div>
                        <div class="lbl">إجمالي مخالفات المقاولين</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #bfdbfe;">
                        <div class="val" style="color:#7c3aed;">${totalPlaces}</div>
                        <div class="lbl">أماكن بمخالفات (أعلى 12)</div>
                    </div>
                </div>
                <div class="ctr-data-table-wrap">
                    <table class="ctr-data-table">
                        <thead>
                            <tr style="background:#eff6ff;">
                                <th style="text-align:center;color:#1e40af;border-color:#bfdbfe;width:44px;">#</th>
                                <th style="text-align:right;color:#1e40af;border-color:#bfdbfe;">الموقع / مكان المخالفة</th>
                                <th style="text-align:center;color:#1e40af;border-color:#bfdbfe;">المخالفات</th>
                                <th style="text-align:center;color:#1e40af;border-color:#bfdbfe;">عدد المقاولين</th>
                                <th style="text-align:center;color:#1e40af;border-color:#bfdbfe;">% من المقاولين</th>
                                <th style="text-align:right;color:#1e40af;border-color:#bfdbfe;">أعلى مقاول في المكان</th>
                            </tr>
                        </thead>
                        <tbody>${rowsHtml || '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:24px;">لا توجد بيانات</td></tr>'}</tbody>
                    </table>
                </div>
            </div>`;
    },

    renderContractorViolationsAnalysis(contractors, violations) {
        const esc = (v) => (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML(String(v ?? '')) : String(v ?? '');
        const contractorList = (Array.isArray(contractors) && contractors.length > 0)
            ? contractors
            : this.getContractorsForAnalyticsList();

        if (!violations || violations.length === 0) {
            return this._ctrAnalyticsViolationsEmptyPanel();
        }

        const violData = this._getContractorViolationsAnalysisData_(contractorList, violations, 10);
        const contractorsList = violData.rows;

        if (contractorsList.length === 0) {
            return this._ctrAnalyticsViolationsEmptyPanel();
        }

        const getResolutionRate = (stats) => (stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0);
        const summary = violData.summary || { total: 0, high: 0, resolved: 0, pending: 0 };
        const overallResolution = violData.overallResolution || 0;

        const rowsHtml = contractorsList.map((item, index) => {
            const { name, stats } = item;
            const resolutionRate = getResolutionRate(stats);
            const rankBg = index === 0 ? '#fee2e2' : index === 1 ? '#ffedd5' : index === 2 ? '#fef9c3' : '#f1f5f9';
            const rankColor = index === 0 ? '#b91c1c' : index === 1 ? '#c2410c' : index === 2 ? '#a16207' : '#64748b';
            return `
                <tr>
                    <td>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <span class="ctr-rank" style="background:${rankBg};color:${rankColor};">${index + 1}</span>
                            <strong style="color:#1e293b;font-size:.84rem;">${esc(name)}</strong>
                        </div>
                    </td>
                    <td style="text-align:center;"><span style="font-size:1rem;font-weight:800;color:#1d4ed8;">${stats.total}</span></td>
                    <td style="text-align:center;"><span class="ctr-sev-pill ctr-sev-high">${stats.high}</span></td>
                    <td style="text-align:center;"><span class="ctr-sev-pill ctr-sev-med">${stats.medium}</span></td>
                    <td style="text-align:center;"><span class="ctr-sev-pill ctr-sev-low">${stats.low}</span></td>
                    <td style="text-align:center;"><span class="ctr-sev-pill ctr-sev-low">${stats.resolved}</span></td>
                    <td style="text-align:center;"><span class="ctr-sev-pill ctr-sev-med" style="background:#ffedd5;color:#c2410c;border-color:#fed7aa;">${stats.pending}</span></td>
                    <td style="text-align:center;">${this._ctrAnalyticsResolutionBar(resolutionRate)}</td>
                </tr>`;
        }).join('');

        return `
            <div class="ctr-panel">
                <div class="ctr-panel-header" style="background:linear-gradient(135deg,#7f1d1d 0%,#dc2626 55%,#ef4444 100%);">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div class="ctr-panel-header-icon"><i class="fas fa-exclamation-triangle"></i></div>
                        <div>
                            <div style="font-size:1rem;font-weight:800;margin:0;">تحليل مخالفات المقاولين</div>
                            <div style="font-size:.74rem;opacity:.88;margin-top:2px;">أعلى ${contractorsList.length} مقاولين — مطابق للتحليل المفصل</div>
                        </div>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                        <span class="ctr-panel-badge">${summary.total} مخالفة</span>
                        <button type="button" onclick="Contractors.exportContractorAnalyticsPDF()" title="تصدير PDF" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.4);cursor:pointer;background:rgba(255,255,255,.18);color:#fff;font-size:.72rem;font-weight:700;display:inline-flex;align-items:center;gap:5px;">
                            <i class="fas fa-file-pdf"></i><span>PDF</span>
                        </button>
                    </div>
                </div>
                <div class="ctr-panel-summary" style="background:linear-gradient(180deg,#fef2f2 0%,#fff 100%);">
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#dc2626;">${contractorsList.length}</div>
                        <div class="lbl">مقاول مخالِف</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#1d4ed8;">${summary.total}</div>
                        <div class="lbl">إجمالي المخالفات</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#b91c1c;">${summary.high}</div>
                        <div class="lbl">شدة عالية</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#15803d;">${summary.resolved}</div>
                        <div class="lbl">محلولة</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#c2410c;">${summary.pending}</div>
                        <div class="lbl">قيد المعالجة</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#7c3aed;">${overallResolution}%</div>
                        <div class="lbl">معدل الحل</div>
                    </div>
                </div>
                <div class="ctr-data-table-wrap">
                    <table class="ctr-data-table">
                        <thead>
                            <tr style="background:#fef2f2;">
                                <th style="text-align:right;color:#991b1b;border-color:#fecaca;">اسم المقاول</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">الإجمالي</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">عالية</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">متوسطة</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">منخفضة</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">محلولة</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">قيد المعالجة</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">معدل الحل</th>
                            </tr>
                        </thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                </div>
            </div>`;
    },

    getExpiringContracts(contractors, approvedContractors) {
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        const expiring = [];

        // من قائمة المقاولين
        contractors.forEach(c => {
            if (c.endDate) {
                const endDate = new Date(c.endDate);
                if (endDate >= now && endDate <= thirtyDaysFromNow) {
                    expiring.push({
                        id: c.id,
                        name: c.name,
                        type: 'contractor',
                        endDate: c.endDate,
                        daysRemaining: Math.ceil((endDate - now) / (1000 * 60 * 60 * 24))
                    });
                }
            }
        });

        // من قائمة المعتمدين
        approvedContractors.forEach(ac => {
            if (ac.expiryDate) {
                const expiryDate = new Date(ac.expiryDate);
                if (expiryDate >= now && expiryDate <= thirtyDaysFromNow) {
                    expiring.push({
                        id: ac.id,
                        name: ac.companyName || ac.name,
                        type: 'approved',
                        endDate: ac.expiryDate,
                        daysRemaining: Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24))
                    });
                }
            }
        });

        return expiring.sort((a, b) => a.daysRemaining - b.daysRemaining);
    },

    renderExpiringContractsAlert(expiringContracts) {
        if (expiringContracts.length === 0) {
            return '';
        }

        // تصنيف العقود حسب قرب الانتهاء
        const critical = expiringContracts.filter(c => c.daysRemaining <= 7);
        const warning = expiringContracts.filter(c => c.daysRemaining > 7 && c.daysRemaining <= 15);
        const normal = expiringContracts.filter(c => c.daysRemaining > 15);

        const getPriorityBadge = (days) => {
            if (days <= 7) {
                return '<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border-2 border-red-300"><i class="fas fa-exclamation-circle ml-1"></i>حرج</span>';
            } else if (days <= 15) {
                return '<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border-2 border-yellow-300"><i class="fas fa-exclamation-triangle ml-1"></i>تحذير</span>';
            } else {
                return '<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border-2 border-blue-300"><i class="fas fa-info-circle ml-1"></i>عادي</span>';
            }
        };

        const getDaysBadge = (days) => {
            if (days <= 7) {
                return `badge-danger`;
            } else if (days <= 15) {
                return `badge-warning`;
            } else {
                return `badge-info`;
            }
        };

        return `
            <div class="content-card mb-6 border-2 border-yellow-400 rounded-xl shadow-lg overflow-hidden">
                <div class="card-header bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 border-b-2 border-yellow-300">
                    <div class="flex items-center justify-between p-4">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center ml-3">
                                <i class="fas fa-exclamation-circle text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 class="card-title text-lg font-bold text-yellow-900">
                                    تنبيه: عقود قريبة من الانتهاء
                                </h3>
                                <p class="text-sm text-yellow-700 mt-1">يوجد ${expiringContracts.length} عقد يحتاج إلى متابعة</p>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            ${critical.length > 0 ? `<span class="badge badge-danger text-sm px-3 py-1">${critical.length} حرج</span>` : ''}
                            ${warning.length > 0 ? `<span class="badge badge-warning text-sm px-3 py-1">${warning.length} تحذير</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="overflow-x-auto">
                        <table class="data-table w-full">
                            <thead class="bg-yellow-100">
                                <tr>
                                    <th class="px-6 py-4 text-right font-bold text-yellow-900 border-b border-yellow-200">اسم المقاول / الجهة</th>
                                    <th class="px-6 py-4 text-center font-bold text-yellow-900 border-b border-yellow-200">نوع العقد</th>
                                    <th class="px-6 py-4 text-center font-bold text-yellow-900 border-b border-yellow-200">تاريخ الانتهاء</th>
                                    <th class="px-6 py-4 text-center font-bold text-yellow-900 border-b border-yellow-200">الأيام المتبقية</th>
                                    <th class="px-6 py-4 text-center font-bold text-yellow-900 border-b border-yellow-200">الأولوية</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-yellow-100">
                                ${expiringContracts.map((contract, index) => {
                                    const isCritical = contract.daysRemaining <= 7;
                                    const isWarning = contract.daysRemaining > 7 && contract.daysRemaining <= 15;
                                    return `
                                    <tr class="hover:bg-yellow-50 transition-colors ${isCritical ? 'bg-red-50' : isWarning ? 'bg-yellow-50' : 'bg-white'} ${index % 2 === 0 ? '' : 'bg-opacity-50'}">
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 w-10 h-10 ${isCritical ? 'bg-red-200' : isWarning ? 'bg-yellow-200' : 'bg-blue-200'} rounded-full flex items-center justify-center ml-3">
                                                    <i class="fas ${contract.type === 'contractor' ? 'fa-hammer' : 'fa-building'} ${isCritical ? 'text-red-600' : isWarning ? 'text-yellow-600' : 'text-blue-600'}"></i>
                                                </div>
                                                <strong class="text-gray-800 font-semibold">${Utils.escapeHTML(contract.name)}</strong>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${contract.type === 'contractor' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}">
                                                <i class="fas ${contract.type === 'contractor' ? 'fa-hammer' : 'fa-check-circle'} ml-1"></i>
                                                ${contract.type === 'contractor' ? 'مقاول' : 'معتمد'}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            <div class="flex flex-col items-center">
                                                <span class="text-gray-700 font-medium">${Utils.formatDate(contract.endDate)}</span>
                                                <span class="text-xs text-gray-500 mt-1">
                                                    <i class="far fa-calendar ml-1"></i>
                                                    ${new Date(contract.endDate).toLocaleDateString('ar-SA', { weekday: 'long' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            <div class="flex flex-col items-center">
                                                <span class="badge ${getDaysBadge(contract.daysRemaining)} text-lg font-bold px-4 py-2 mb-1">
                                                    ${contract.daysRemaining}
                                                </span>
                                                <span class="text-xs text-gray-600">يوم متبقي</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            ${getPriorityBadge(contract.daysRemaining)}
                                        </td>
                                    </tr>
                                `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * مطابقة موحّدة لسجلات المقاول (مخالفات، تقييمات، تدريب، عيادة، إلخ).
     * تُستخدم في جدول «تحليل مفصل» وفي نافذة «عرض» لتطابق الأرقام مع قاعدة البيانات.
     */
    prepareContractorForAnalytics(contractor) {
        if (typeof Utils !== 'undefined' && typeof Utils.sanitizeContractorIdentity === 'function') {
            return Utils.sanitizeContractorIdentity(contractor);
        }
        return contractor && typeof contractor === 'object' ? { ...contractor } : {};
    },

    getPreferredContractorAnalyticsKey(contractor, fallbackValue = '') {
        if (typeof Utils !== 'undefined' && typeof Utils.getPreferredContractorLookupKey === 'function') {
            return Utils.getPreferredContractorLookupKey(contractor, fallbackValue);
        }
        return String(contractor?.code || contractor?.isoCode || contractor?.contractorCode || contractor?.contractorId || contractor?.id || fallbackValue || '').trim();
    },

    resolveContractorForAnalytics(contractorKey, contractorName = '') {
        const normalizeValue = (value) => (typeof Utils !== 'undefined' && typeof Utils.normalizeContractorIdentityValue === 'function')
            ? Utils.normalizeContractorIdentityValue(value)
            : String(value == null ? '' : value).trim().toLowerCase();
        const canonicalizeName = (value) => (typeof Utils !== 'undefined' && typeof Utils.canonicalizeContractorName === 'function')
            ? Utils.canonicalizeContractorName(value)
            : normalizeValue(value);
        const normalizedKey = normalizeValue(contractorKey);
        const canonicalName = canonicalizeName(contractorName);
        const merged = typeof this.getAllContractorsForModules === 'function' ? this.getAllContractorsForModules() : [];
        const candidates = [
            ...merged,
            ...(AppState.appData.approvedContractors || []),
            ...(AppState.appData.contractors || [])
        ].filter(Boolean);

        let bestCandidate = null;
        let bestScore = -1;

        candidates.forEach((candidate) => {
            const prepared = this.prepareContractorForAnalytics(candidate);
            let score = 0;

            if (normalizedKey) {
                const strongIds = [prepared.code, prepared.isoCode, prepared.contractorCode, prepared.entityCode];
                const mediumIds = [prepared.licenseNumber, prepared.contractNumber, prepared.approvedEntityId];
                const linkedIds = [prepared.contractorId, prepared.id];
                const aliasIds = [
                    ...(Array.isArray(prepared.aliasIds) ? prepared.aliasIds : []),
                    ...(Array.isArray(prepared.identityIds) ? prepared.identityIds : []),
                    ...(Array.isArray(prepared.legacyIds) ? prepared.legacyIds : []),
                    ...(Array.isArray(prepared.altIds) ? prepared.altIds : [])
                ];

                if (strongIds.some(value => normalizeValue(value) === normalizedKey)) score = Math.max(score, 100);
                else if (mediumIds.some(value => normalizeValue(value) === normalizedKey)) score = Math.max(score, 80);
                else if (linkedIds.some(value => normalizeValue(value) === normalizedKey)) score = Math.max(score, 50);
                else if (aliasIds.some(value => normalizeValue(value) === normalizedKey)) score = Math.max(score, 40);
            }

            const candidateName = canonicalizeName(prepared.name || prepared.companyName || prepared.contractorName || prepared.company || '');
            if (canonicalName && candidateName && candidateName === canonicalName) {
                score += normalizedKey ? 25 : 90;
            }

            if (score > bestScore) {
                bestScore = score;
                bestCandidate = prepared;
            }
        });

        return bestScore > 0 ? bestCandidate : null;
    },

    buildContractorAnalyticsMatchers(contractor, contractorIdParam) {
        if (typeof Utils !== 'undefined' && typeof Utils.buildContractorIdentityMatcher === 'function') {
            return Utils.buildContractorIdentityMatcher(contractor, contractorIdParam);
        }

        const normalizeValue = (value) => String(value == null ? '' : value).trim().toLowerCase();
        const canonicalizeName = (value) => normalizeValue(value);

        const prepared = this.prepareContractorForAnalytics(contractor);
        const contractorName = String(prepared.name || prepared.companyName || prepared.contractorName || prepared.company || '').trim();

        // Build ID sets
        const idsSet = new Set();
        const strongIds = [prepared.code, prepared.isoCode, prepared.contractorCode, prepared.entityCode];
        const mediumIds = [prepared.licenseNumber, prepared.contractNumber, prepared.approvedEntityId];
        const linkedIds = [prepared.contractorId, prepared.id];
        const aliasIds = [
            ...(Array.isArray(prepared.aliasIds) ? prepared.aliasIds : []),
            ...(Array.isArray(prepared.identityIds) ? prepared.identityIds : []),
            ...(Array.isArray(prepared.legacyIds) ? prepared.legacyIds : []),
            ...(Array.isArray(prepared.altIds) ? prepared.altIds : [])
        ];
        [...strongIds, ...mediumIds, ...linkedIds, ...aliasIds]
            .filter(Boolean)
            .forEach(id => idsSet.add(normalizeValue(id)));

        const exactNameSet = new Set();
        const canonicalNameSet = new Set();
        const allContractorNames = [prepared.name, prepared.companyName, prepared.contractorName, prepared.company, prepared.entityName, prepared.externalName]
            .filter(Boolean)
            .map(n => String(n).trim());
        allContractorNames.forEach(n => {
            exactNameSet.add(normalizeValue(n));
            canonicalNameSet.add(canonicalizeName(n));
        });

        const collectRecordIds = (record) => {
            if (!record || typeof record !== 'object') return [];
            return [record.contractorId, record.code, record.isoCode, record.contractorCode, record.entityCode, record.licenseNumber, record.contractNumber, record.approvedEntityId]
                .filter((value) => value !== undefined && value !== null && String(value).trim() !== '')
                .map((value) => normalizeValue(value))
                .filter(Boolean);
        };

        const collectEntityNames = (record) => {
            if (!record || typeof record !== 'object') return [];
            const allNameFields = ['contractorName', 'companyName', 'company', 'contractorCompany', 'name', 'externalName', 'entityName', 'violatorCompany', 'contractor', 'requestingParty', 'authorizedParty'];
            return allNameFields
                .map((field) => record[field])
                .filter((value) => value !== undefined && value !== null && String(value).trim() !== '')
                .map((value) => String(value).replace(/\s+/g, ' ').trim())
                .filter(Boolean);
        };

        const matchesNameValue = (value) => {
            if (value === undefined || value === null) return false;
            const normalized = normalizeValue(value);
            if (normalized && exactNameSet.has(normalized)) return true;
            const canonical = canonicalizeName(value);
            return !!(canonical && canonicalNameSet.has(canonical));
        };

        const matchesContractor = (record) => {
            if (!record || typeof record !== 'object') return false;
            const recordIds = collectRecordIds(record);
            if (recordIds.some(id => idsSet.has(id))) return true;
            const names = collectEntityNames(record);
            return names.some(matchesNameValue);
        };

        return {
            normalize: normalizeValue,
            idsSet,
            exactNameSet,
            canonicalNameSet,
            contractorName,
            matchesContractor,
            hasAnyRecordIds(record) { return collectRecordIds(record).length > 0; },
            matchesNameValue,
            matchFieldsByName(record) {
                if (!record || typeof record !== 'object') return null;
                const names = collectEntityNames(record);
                if (names.length === 0) return null;
                return names.find(matchesNameValue) || null;
            },
            violationBelongsToContractor(record) {
                if (!record || typeof record !== 'object') return false;
                const personType = normalizeValue(record.personType);
                if ((personType === 'employee' || personType === 'موظف') &&
                    !record.contractorName &&
                    !record.contractorId &&
                    !record.contractorCode &&
                    !record.code &&
                    !record.isoCode) {
                    return false;
                }
                const recordIds = collectRecordIds(record);
                if (recordIds.length > 0 && recordIds.some((id) => idsSet.has(id))) {
                    return true;
                }
                const entityNames = collectEntityNames(record);
                if (entityNames.length > 0 && entityNames.some(matchesNameValue)) {
                    return true;
                }
                return matchesContractor(record);
            },
            evaluationBelongsToContractor(record) {
                if (!record || typeof record !== 'object') return false;
                const recordIds = collectRecordIds(record);
                if (recordIds.length > 0 && recordIds.some((id) => idsSet.has(id))) {
                    return true;
                }
                const entityNames = collectEntityNames(record);
                if (entityNames.length > 0 && entityNames.some(matchesNameValue)) {
                    return true;
                }
                return matchesContractor(record);
            }
        };
    },

    renderDetailedContractorAnalysis(contractors, approvedContractors, evaluations, violations) {
        const esc = (v) => (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML(String(v ?? '')) : String(v ?? '');

        if (!contractors || !Array.isArray(contractors) || contractors.length === 0) {
            return `
                <div class="ctr-panel">
                    <div class="ctr-panel-header" style="background:linear-gradient(135deg,#312e81 0%,#6366f1 100%);">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div class="ctr-panel-header-icon"><i class="fas fa-list-alt"></i></div>
                            <div>
                                <div style="font-size:1rem;font-weight:800;margin:0;">تحليل مفصل لكل مقاول</div>
                                <div style="font-size:.74rem;opacity:.88;margin-top:2px;">0 مقاول في النظام</div>
                            </div>
                        </div>
                    </div>
                    <div class="ctr-empty-state">
                        <i class="fas fa-inbox" style="color:#94a3b8;"></i>
                        <p style="font-size:.95rem;font-weight:700;color:#374151;margin:0;">لا توجد مقاولين في النظام</p>
                        <p style="font-size:.78rem;color:#64748b;margin-top:6px;">يرجى إضافة مقاولين لعرض التحليل المفصل</p>
                    </div>
                </div>`;
        }

        const contractorsWithStats = this.buildContractorDetailedStatsList(contractors, evaluations, violations);

        const summary = {
            total: contractorsWithStats.length,
            active: contractorsWithStats.filter((c) => this.isEntityEnabled(c)).length,
            inactive: contractorsWithStats.filter((c) => !this.isEntityEnabled(c)).length,
            withViolations: contractorsWithStats.filter((c) => c.violationsCount > 0).length,
            withEvaluations: contractorsWithStats.filter((c) => c.evaluationsCount > 0).length
        };

        const getScoreColor = (score) => {
            if (score >= 80) return '#15803d';
            if (score >= 60) return '#b45309';
            return '#b91c1c';
        };

        const getContractStatusPill = (status, days) => {
            if (status === 'expired') {
                return '<span class="ctr-sev-pill ctr-sev-high"><i class="fas fa-times-circle" style="font-size:9px;margin-left:3px;"></i>منتهي</span>';
            }
            if (status === 'expiring') {
                return `<span class="ctr-sev-pill ctr-sev-med"><i class="fas fa-hourglass-half" style="font-size:9px;margin-left:3px;"></i>${days} يوم</span>`;
            }
            if (status === 'active') {
                return '<span class="ctr-sev-pill ctr-sev-low"><i class="fas fa-check-circle" style="font-size:9px;margin-left:3px;"></i>نشط</span>';
            }
            return '<span class="ctr-sev-pill" style="background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0;">غير محدد</span>';
        };

        const rowsHtml = contractorsWithStats.map((contractor, index) => {
            const actionLookupKey = encodeURIComponent(contractor.analyticsLookupKey || contractor.id || contractor.contractorId || '');
            const actionDisplayName = encodeURIComponent(contractor.analyticsDisplayName || contractor.name || contractor.companyName || '');
            const scoreColor = getScoreColor(contractor.avgScore);
            const rowBorder = contractor.violationsCount > 0 ? '#fecaca' : contractor.evaluationsCount > 0 ? '#bbf7d0' : '#e2e8f0';
            return `
                <tr style="border-right:3px solid ${rowBorder};">
                    <td style="text-align:center;"><span class="ctr-rank" style="background:#eef2ff;color:#4338ca;">${index + 1}</span></td>
                    <td>
                        <div style="min-width:0;">
                            <strong style="color:#1e293b;font-size:.84rem;display:block;margin-bottom:4px;">${esc(contractor.name || contractor.companyName || '')}</strong>
                            ${this._ctrAnalyticsActivationBadge(contractor)}
                        </div>
                    </td>
                    <td style="text-align:center;color:#475569;font-size:.78rem;">${esc((contractor.serviceType || contractor.entityType || '-').toString())}</td>
                    <td style="text-align:center;">${getContractStatusPill(contractor.contractStatus, contractor.daysRemaining)}</td>
                    <td style="text-align:center;">
                        <span style="font-weight:700;font-size:.9rem;color:${contractor.evaluationsCount > 0 ? '#b45309' : '#94a3b8'};">${contractor.evaluationsCount}</span>
                    </td>
                    <td style="text-align:center;">
                        <div style="font-weight:800;font-size:.9rem;color:${scoreColor};">${contractor.avgScore}%</div>
                        <div class="ctr-progress" style="width:56px;margin-top:4px;"><span style="width:${Math.min(contractor.avgScore, 100)}%;background:${scoreColor};"></span></div>
                    </td>
                    <td style="text-align:center;">
                        <span style="font-weight:700;font-size:.9rem;color:${contractor.violationsCount > 0 ? '#b91c1c' : '#15803d'};">${contractor.violationsCount}</span>
                    </td>
                    <td style="text-align:center;">
                        ${contractor.highViolations > 0
                            ? `<span class="ctr-sev-pill ctr-sev-high">${contractor.highViolations}</span>`
                            : '<span style="color:#cbd5e1;">—</span>'}
                    </td>
                    <td style="text-align:center;">${this._ctrAnalyticsResolutionBar(contractor.resolutionRate)}</td>
                    <td style="text-align:center;">
                        <button onclick="Contractors.viewContractorAnalytics(decodeURIComponent('${actionLookupKey}'), decodeURIComponent('${actionDisplayName}'))"
                                class="contractor-analytics-view-btn"
                                style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:#eef2ff;color:#4338ca;font-size:.74rem;font-weight:700;"
                                title="عرض التفاصيل">
                            <i class="fas fa-eye"></i><span>عرض</span>
                        </button>
                    </td>
                </tr>`;
        }).join('');

        return `
            <style>
                .contractor-analytics-view-btn:hover { background:#c7d2fe !important; }
                [data-theme="dark"] .contractor-analytics-view-btn { background:#4b5563 !important; color:#f3f4f6 !important; }
            </style>
            <div class="ctr-panel">
                <div class="ctr-panel-header" style="background:linear-gradient(135deg,#312e81 0%,#6366f1 55%,#818cf8 100%);">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div class="ctr-panel-header-icon"><i class="fas fa-list-alt"></i></div>
                        <div>
                            <div style="font-size:1rem;font-weight:800;margin:0;">تحليل مفصل لكل مقاول</div>
                            <div style="font-size:.74rem;opacity:.88;margin-top:2px;">${summary.total} مقاول — ترتيب حسب الأداء والمخالفات</div>
                        </div>
                    </div>
                    <span class="ctr-panel-badge">${summary.withViolations} بمخالفات</span>
                </div>
                <div class="ctr-panel-summary" style="background:linear-gradient(180deg,#eef2ff 0%,#fff 100%);">
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #c7d2fe;">
                        <div class="val" style="color:#4338ca;">${summary.total}</div>
                        <div class="lbl">إجمالي</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #c7d2fe;">
                        <div class="val" style="color:#15803d;">${summary.active}</div>
                        <div class="lbl">نشط</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #c7d2fe;">
                        <div class="val" style="color:#dc2626;">${summary.inactive}</div>
                        <div class="lbl">غير نشط</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #c7d2fe;">
                        <div class="val" style="color:#b45309;">${summary.withEvaluations}</div>
                        <div class="lbl">لديهم تقييم</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #c7d2fe;">
                        <div class="val" style="color:#b91c1c;">${summary.withViolations}</div>
                        <div class="lbl">لديهم مخالفات</div>
                    </div>
                </div>
                <div class="ctr-data-table-wrap">
                    <table class="ctr-data-table" style="min-width:960px;">
                        <thead>
                            <tr style="background:#eef2ff;">
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;width:44px;">#</th>
                                <th style="text-align:right;color:#3730a3;border-color:#c7d2fe;">اسم المقاول</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">نوع الخدمة</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">حالة العقد</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">التقييمات</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">متوسط التقييم</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">المخالفات</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">عالية</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">معدل الحل</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                </div>
            </div>`;
    },

    async viewContractorAnalytics(contractorId, contractorName = '') {
        let contractor = this.resolveContractorForAnalytics(contractorId, contractorName);
        if (!contractor) {
            contractor = (AppState.appData.contractors || []).find(c => c.id === contractorId || c.contractorId === contractorId || c.code === contractorId || c.isoCode === contractorId);
        }
        if (!contractor) {
            contractor = (AppState.appData.approvedContractors || []).find(c => c.id === contractorId || c.contractorId === contractorId || c.code === contractorId || c.isoCode === contractorId);
        }
        if (!contractor) {
            Notification.error('المقاول غير موجود');
            return;
        }
        contractor = this.prepareContractorForAnalytics(contractor);
        const analyticsLookupKey = this.getPreferredContractorAnalyticsKey(contractor, contractorId || contractorName);

        const contractorDisplayName = (contractor.name || contractor.companyName || '').trim();
        const ctx = this.buildContractorAnalyticsMatchers(contractor, analyticsLookupKey);
        const matchesContractor = ctx.matchesContractor;
        const matchesPtwContractor = (p) => {
            if (!p) return false;
            if (matchesContractor(p)) return true;
            if (ctx.hasAnyRecordIds(p)) return false;
            const req = String(p.requestingParty || '').replace(/\s+/g, ' ').trim();
            const auth = String(p.authorizedParty || '').replace(/\s+/g, ' ').trim();
            const resp = String(p.responsible || '').replace(/\s+/g, ' ').trim();
            return ctx.matchFieldsByName([req, auth, resp]);
        };

        const calculateStats = (customViolations, customEvaluations) => {
            let evals = customEvaluations || (AppState.appData.contractorEvaluations || []).filter(ctx.evaluationBelongsToContractor);
            let viols = customViolations || (AppState.appData.violations || []).filter(ctx.violationBelongsToContractor);

            let score = 0;
            if (evals.length > 0) {
                const validScores = evals
                    .map(e => parseFloat(e.finalScore) || parseFloat(e.score) || 0)
                    .filter(s => !isNaN(s) && s >= 0 && s <= 100);
                if (validScores.length > 0) {
                    const sum = validScores.reduce((acc, s) => acc + s, 0);
                    score = Math.round((sum / validScores.length) * 100) / 100;
                }
            }

            const high = viols.filter(v => {
                const severity = (v.severity || '').toString().trim();
                return severity === 'عالية' || severity === 'high' || severity === 'حرجة';
            }).length;

            const resolved = viols.filter(v => {
                const status = (v.status || '').toString().trim();
                return status === 'محلول' || status === 'resolved' || status === 'تم الحل';
            }).length;

            const rate = viols.length > 0 ? Math.round((resolved / viols.length) * 100) : 100;

            const uniqueEvalIds = new Set(evals.map(e => e.id || e.evaluationId).filter(Boolean));
            const evCount = uniqueEvalIds.size > 0 ? uniqueEvalIds.size : evals.length;

            return {
                evaluations: evals,
                violations: viols,
                evaluationsCountDisplay: evCount,
                avgScore: score,
                highViolations: high,
                resolvedViolations: resolved,
                resolutionRate: rate
            };
        };

        let stats = calculateStats();

        const trainingList = AppState.appData.training || [];
        const trainingFromMain = trainingList.filter(t => {
            if (!t) return false;
            if (t.contractorName || t.contractorId || t.contractorCode) { if (matchesContractor(t)) return true; }
            let participants = t.participants;
            if (typeof participants === 'string' && participants.trim()) {
                try { participants = JSON.parse(participants); } catch (e) { participants = null; }
            }
            if (participants && Array.isArray(participants)) {
                return participants.some(p => (p && (p.personType === 'contractor' || p.type === 'contractor' || p.contractorName || p.companyName || p.company) && matchesContractor(p)));
            }
            return false;
        });
        const contractorTrainingsList = AppState.appData.contractorTrainings || [];
        const trainingFromContractor = contractorTrainingsList.filter(ct => {
            if (!ct) return false;
            if (matchesContractor(ct)) return true;
            const name = String(ct.contractorName || ct.companyName || '').replace(/\s+/g, ' ').trim();
            return !ctx.hasAnyRecordIds(ct) && ctx.matchesNameValue(name);
        });
        const seenTrainingIds = new Set();
        trainingFromMain.forEach(t => {
            const tid = t.id || (String(t.startDate || '') + String(t.name || t.trainingType || ''));
            if (tid) seenTrainingIds.add(tid);
        });
        let trainingsCount = trainingFromMain.length;
        trainingFromContractor.forEach(ct => {
            const tid = ct.id || (String(ct.date || '') + String(ct.topic || ct.trainingName || ct.name || ''));
            if (tid && !seenTrainingIds.has(tid)) {
                seenTrainingIds.add(tid);
                trainingsCount += 1;
            } else if (!tid) {
                trainingsCount += 1;
            }
        });

        const ptwAll = (AppState.appData.ptw || []).concat(Array.isArray(AppState.appData.ptwRegistry) ? AppState.appData.ptwRegistry : []);
        let permitsCount = ptwAll.filter(matchesPtwContractor).length;

        const rawClinicSources = (AppState.appData.clinicVisits || []).concat(Array.isArray(AppState.appData.clinicContractorVisits) ? AppState.appData.clinicContractorVisits : []);
        const seenClinicIds = new Set();
        const clinicSources = rawClinicSources.filter(c => {
            if (!c) return false;
            const id = String(c.id || '').trim();
            if (!id) return true;
            if (seenClinicIds.has(id)) return false;
            seenClinicIds.add(id);
            return true;
        });
        let clinicVisitsCount = clinicSources.filter(c => (c.personType === 'contractor' || c.personType === 'external' || c.contractorName) && matchesContractor(c)).length;

        const injuriesAll = AppState.appData.injuries || [];
        let injuriesCount = injuriesAll.filter(inj => {
            if (!inj) return false;
            if ((inj.personType || '').toString().toLowerCase() !== 'contractor') return false;
            if (matchesContractor(inj)) return true;
            const name = String(inj.personName || inj.employeeName || inj.contractorName || '').trim();
            return !ctx.hasAnyRecordIds(inj) && ctx.matchesNameValue(name);
        }).length;
        let incidentsCount = (AppState.appData.incidents || []).filter(i => {
            if (!i) return false;
            const isContractorIncident = i.personType === 'contractor' || i.contractorName || i.affiliation === 'contractor' || (i.contractorId != null && i.contractorId !== '');
            return isContractorIncident && matchesContractor(i);
        }).length;
        let sickLeaveCount = (AppState.appData.sickLeave || []).filter(s => (s.personType === 'contractor' || s.contractorName) && matchesContractor(s)).length;

        const getScoreColor = (score) => {
            if (score >= 80) return 'text-green-600 bg-green-100';
            if (score >= 60) return 'text-yellow-600 bg-yellow-100';
            return 'text-red-600 bg-red-100';
        };

        const renderViolationRows = (records) => {
            if (!Array.isArray(records) || records.length === 0) {
                return `
                    <tr>
                        <td colspan="4" class="px-6 py-6 text-center text-gray-500">لا توجد نتائج مطابقة للفلاتر</td>
                    </tr>
                `;
            }
            return records.map((v, index) => {
                const severity = (v.severity || '').toString().trim();
                const status = (v.status || '').toString().trim();
                const severityClass = severity === 'عالية' || severity === 'high' || severity === 'حرجة'
                    ? 'badge-danger'
                    : severity === 'متوسطة' || severity === 'medium'
                    ? 'badge-warning'
                    : 'badge-info';
                const statusClass = status === 'محلول' || status === 'resolved' || status === 'تم الحل'
                    ? 'badge-success'
                    : 'badge-warning';

                return `
                    <tr class="hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
                        <td class="px-6 py-4 text-gray-700">${v.violationDate ? Utils.formatDate(v.violationDate) : '-'}</td>
                        <td class="px-6 py-4 text-gray-800 font-medium">${Utils.escapeHTML(v.violationType || '-')}</td>
                        <td class="px-6 py-4 text-center">
                            <span class="badge ${severityClass} text-sm font-bold px-3 py-1">${v.severity || '-'}</span>
                        </td>
                        <td class="px-6 py-4 text-center">
                            <span class="badge ${statusClass} text-sm font-bold px-3 py-1">${v.status || '-'}</span>
                        </td>
                    </tr>
                `;
            }).join('');
        };

        const renderViolationsContainer = (records, vTypes, severities) => {
            if (!Array.isArray(records) || records.length === 0) {
                return `
                    <div class="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                        <i class="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
                        <p class="text-lg font-semibold text-green-700">لا توجد مخالفات مسجلة</p>
                        <p class="text-sm text-green-600 mt-2">هذا المقاول يلتزم بجميع المعايير</p>
                    </div>
                `;
            }
            return `
                <div class="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md">
                    <div class="bg-gradient-to-r from-red-50 to-red-100 border-b-2 border-red-200 p-4">
                        <div class="flex items-center justify-between gap-3 flex-wrap">
                            <h3 class="text-lg font-bold text-red-800 flex items-center">
                                <i class="fas fa-exclamation-triangle ml-2"></i>
                                المخالفات (<span id="contractor-violations-count">${records.length}</span>)
                            </h3>
                            <button type="button" class="btn-primary" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-color: #b91c1c;" onclick="Contractors.exportContractorViolationsReport('${encodeURIComponent(String(analyticsLookupKey || contractor.id || contractor.contractorId || ''))}', '${encodeURIComponent(String(contractorDisplayName || contractor.name || contractor.companyName || ''))}')">
                                <i class="fas fa-file-pdf ml-2"></i>تصدير تقرير المخالفات
                            </button>
                        </div>
                    </div>
                    <div class="p-4 bg-gray-50 border-b border-gray-200">
                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">البحث</label>
                                <div class="relative">
                                    <input type="text" id="contractor-violations-search" class="form-input pr-10 border-2 border-indigo-200 bg-white shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300" placeholder="ابحث في كل تفاصيل الجدول...">
                                    <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none"></i>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">نوع الشخص</label>
                                <select id="contractor-violations-person-type" class="form-input">
                                    <option value="">الكل</option>
                                    <option value="employee">موظف</option>
                                    <option value="contractor">مقاول / شركة خارجية</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">نوع المخالفة</label>
                                <select id="contractor-violations-type" class="form-input">
                                    <option value="">جميع الأنواع</option>
                                    ${vTypes.map(t => `<option value="${Utils.escapeHTML(t)}">${Utils.escapeHTML(t)}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">الدرجة</label>
                                <select id="contractor-violations-severity" class="form-input">
                                    <option value="">جميع الدرجات</option>
                                    ${severities.map(lvl => `<option value="${Utils.escapeHTML(lvl)}">${Utils.escapeHTML(lvl)}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="data-table w-full">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="px-6 py-3 text-right font-bold text-gray-700">التاريخ</th>
                                    <th class="px-6 py-3 text-right font-bold text-gray-700">نوع المخالفة</th>
                                    <th class="px-6 py-3 text-center font-bold text-gray-700">الشدة</th>
                                    <th class="px-6 py-3 text-center font-bold text-gray-700">الحالة</th>
                                </tr>
                            </thead>
                            <tbody id="contractor-violations-tbody" class="divide-y divide-gray-100">
                                ${renderViolationRows(records)}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        };

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center ml-3">
                                <i class="fas fa-chart-bar text-xl"></i>
                            </div>
                            <div>
                                <h2 class="modal-title text-xl font-bold flex items-center">
                                    تحليل مفصل: ${Utils.escapeHTML(contractorDisplayName || contractor.name || contractor.companyName || '')}
                                    <span id="live-loader-indicator" class="mr-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 animate-pulse">
                                        <i class="fas fa-sync fa-spin ml-1 text-xs"></i>
                                        جاري تحديث البيانات...
                                    </span>
                                </h2>
                                <p class="text-sm text-indigo-100 mt-1">${Utils.escapeHTML(contractor.serviceType || contractor.entityType || '')}</p>
                            </div>
                        </div>
                        <button class="modal-close bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body p-6">
                    <!-- بطاقات الإحصائيات الرئيسية -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-5 shadow-md">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-clipboard-check text-3xl text-blue-500"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">عدد التقييمات</p>
                            <p class="text-3xl font-bold text-blue-700" id="evals-count-val">${stats.evaluationsCountDisplay}</p>
                        </div>
                        <div class="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-5 shadow-md">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-exclamation-triangle text-3xl text-red-500"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">عدد المخالفات</p>
                            <p class="text-3xl font-bold text-red-700" id="viols-count-val">${stats.violations.length}</p>
                        </div>
                        <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-5 shadow-md">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-star text-3xl text-yellow-500"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">متوسط التقييم</p>
                            <p class="text-3xl font-bold ${getScoreColor(stats.avgScore).split(' ')[0]}" id="avg-score-val">${stats.avgScore}%</p>
                        </div>
                        <div class="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-5 shadow-md">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-check-double text-3xl text-green-500"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">معدل حل المخالفات</p>
                            <p class="text-3xl font-bold text-green-700" id="res-rate-val">${stats.resolutionRate}%</p>
                        </div>
                    </div>

                    <!-- إحصائيات إضافية -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                            <p class="text-sm text-gray-600 mb-2">مخالفات عالية الخطورة</p>
                            <p class="text-2xl font-bold text-red-600" id="high-viols-val">${stats.highViolations}</p>
                        </div>
                        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                            <p class="text-sm text-gray-600 mb-2">مخالفات محلولة</p>
                            <p class="text-2xl font-bold text-green-600" id="resolved-viols-val">${stats.resolvedViolations}</p>
                        </div>
                        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                            <p class="text-sm text-gray-600 mb-2">مخالفات قيد المعالجة</p>
                            <p class="text-2xl font-bold text-orange-600" id="pending-viols-val">${stats.violations.length - stats.resolvedViolations}</p>
                        </div>
                    </div>

                    <!-- التدريبات - التصاريح - التردد على العيادة - الإصابات -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
                        <div class="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-graduation-cap text-2xl text-teal-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">عدد التدريبات</p>
                            <p class="text-2xl font-bold text-teal-700" id="trainings-count-val">${trainingsCount}</p>
                        </div>
                        <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-file-signature text-2xl text-cyan-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">عدد التصاريح</p>
                            <p class="text-2xl font-bold text-cyan-700" id="permits-count-val">${permitsCount}</p>
                        </div>
                        <div class="bg-gradient-to-br from-violet-50 to-violet-100 border-2 border-violet-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-stethoscope text-2xl text-violet-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">التردد على العيادة</p>
                            <p class="text-2xl font-bold text-violet-700" id="clinic-visits-count-val">${clinicVisitsCount}</p>
                        </div>
                        <div class="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-band-aid text-2xl text-amber-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">الإصابات</p>
                            <p class="text-2xl font-bold text-amber-700" id="injuries-count-val">${injuriesCount}</p>
                        </div>
                        <div class="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-exclamation-circle text-2xl text-orange-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">الحوادث</p>
                            <p class="text-2xl font-bold text-orange-700" id="incidents-count-val">${incidentsCount}</p>
                        </div>
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-notes-medical text-2xl text-blue-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">الإجازات المرضية</p>
                            <p class="text-2xl font-bold text-blue-700" id="sick-leave-count-val">${sickLeaveCount}</p>
                        </div>
                    </div>

                    <!-- حاوية المخالفات -->
                    <div id="violations-container-placeholder">
                        ${renderViolationsContainer(
                            stats.violations,
                            Array.from(new Set(stats.violations.map(v => String(v?.violationType || '').trim()).filter(Boolean))),
                            Array.from(new Set(stats.violations.map(v => String(v?.severity || '').trim()).filter(Boolean)))
                        )}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const bindViolationListeners = (currentViolations) => {
            const searchInput = modal.querySelector('#contractor-violations-search');
            const personTypeSelect = modal.querySelector('#contractor-violations-person-type');
            const typeSelect = modal.querySelector('#contractor-violations-type');
            const severitySelect = modal.querySelector('#contractor-violations-severity');
            const tbody = modal.querySelector('#contractor-violations-tbody');
            const countEl = modal.querySelector('#contractor-violations-count');
            if (!tbody) return;

            const normalize = (val) => String(val || '').trim().toLowerCase();
            const resolvePersonType = (record) => {
                const raw = normalize(record?.personType);
                if (raw) return raw;
                return record?.contractorName ? 'contractor' : 'employee';
            };
            const toSearchableText = (record) => {
                if (!record || typeof record !== 'object') return '';
                return Object.values(record).map(value => String(value || '')).join(' ').toLowerCase();
            };
            const applyViolationFilters = () => {
                const q = normalize(searchInput?.value);
                const personType = normalize(personTypeSelect?.value);
                const violationType = normalize(typeSelect?.value);
                const severity = normalize(severitySelect?.value);
                const filtered = currentViolations.filter((record) => {
                    if (personType) {
                        const resolvedType = resolvePersonType(record);
                        if (personType === 'contractor' && !(resolvedType === 'contractor' || resolvedType === 'supplier' || resolvedType === 'external')) return false;
                        if (personType === 'employee' && resolvedType !== 'employee') return false;
                    }
                    if (violationType && normalize(record?.violationType) !== violationType) return false;
                    if (severity && normalize(record?.severity) !== severity) return false;
                    if (q && !toSearchableText(record).includes(q)) return false;
                    return true;
                });
                if (tbody) tbody.innerHTML = renderViolationRows(filtered);
                if (countEl) countEl.textContent = String(filtered.length);
            };
            [searchInput, personTypeSelect, typeSelect, severitySelect].forEach(el => {
                if (!el) return;
                const eventName = el.tagName === 'SELECT' ? 'change' : 'input';
                el.addEventListener(eventName, applyViolationFilters);
            });
        };

        if (stats.violations.length > 0) {
            bindViolationListeners(stats.violations);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        (async () => {
            try {
                if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.syncData && AppState.googleConfig?.appsScript?.enabled) {
                    const needCT = !AppState.appData.contractorTrainings?.length;
                    const needT = !AppState.appData.training?.length;
                    const needPTW = (!AppState.appData.ptw || !AppState.appData.ptw.length) && (!AppState.appData.ptwRegistry || !AppState.appData.ptwRegistry.length);
                    const needViol = !AppState.appData.violations?.length;
                    const needEval = !AppState.appData.contractorEvaluations?.length;
                    const needClinic = !AppState.appData.clinicVisits?.length;
                    const needInj = !AppState.appData.injuries?.length;
                    if (needCT || needT || needPTW || needViol || needEval || needClinic || needInj) {
                        const syncSheets = [];
                        if (needCT) syncSheets.push('ContractorTrainings');
                        if (needT) syncSheets.push('Training');
                        if (needPTW) syncSheets.push('PTW', 'PTWRegistry');
                        if (needViol) syncSheets.push('Violations');
                        if (needEval) syncSheets.push('ContractorEvaluations');
                        if (needClinic) syncSheets.push('ClinicVisits', 'ClinicContractorVisits');
                        if (needInj) syncSheets.push('Injuries', 'ClinicContractorInjuries');
                        if (syncSheets.length) {
                            GoogleIntegration.syncData({
                                sheets: [...new Set(syncSheets)],
                                silent: true,
                                showLoader: false,
                                notifyOnSuccess: false,
                                notifyOnError: false
                            }).catch(e => {
                                if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('خلفية المزامنة الهادئة فشلت:', e);
                            });
                        }
                    }
                }

                let serverDetailedAnalytics = null;
                if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest && AppState.googleConfig?.appsScript?.enabled) {
                    const analyticsRes = await GoogleIntegration.sendRequest({
                        action: 'getContractorDetailedAnalytics',
                        data: { contractor, contractorId: analyticsLookupKey }
                    });
                    if (analyticsRes && analyticsRes.success && analyticsRes.data) {
                        serverDetailedAnalytics = analyticsRes.data;
                    }
                }

                if (serverDetailedAnalytics) {
                    const newStats = calculateStats(serverDetailedAnalytics.violations, serverDetailedAnalytics.evaluations);
                    
                    if (typeof serverDetailedAnalytics.avgScore === 'number') newStats.avgScore = serverDetailedAnalytics.avgScore;
                    if (typeof serverDetailedAnalytics.highViolations === 'number') newStats.highViolations = serverDetailedAnalytics.highViolations;
                    if (typeof serverDetailedAnalytics.resolvedViolations === 'number') newStats.resolvedViolations = serverDetailedAnalytics.resolvedViolations;
                    if (typeof serverDetailedAnalytics.resolutionRate === 'number') newStats.resolutionRate = serverDetailedAnalytics.resolutionRate;

                    if (typeof serverDetailedAnalytics.trainingsCount === 'number') trainingsCount = serverDetailedAnalytics.trainingsCount;
                    if (typeof serverDetailedAnalytics.ptwCount === 'number') permitsCount = serverDetailedAnalytics.ptwCount;
                    if (typeof serverDetailedAnalytics.clinicVisitsCount === 'number') clinicVisitsCount = serverDetailedAnalytics.clinicVisitsCount;
                    if (typeof serverDetailedAnalytics.injuriesCount === 'number') injuriesCount = serverDetailedAnalytics.injuriesCount;
                    if (typeof serverDetailedAnalytics.incidentsCount === 'number') incidentsCount = serverDetailedAnalytics.incidentsCount;
                    if (typeof serverDetailedAnalytics.sickLeaveCount === 'number') sickLeaveCount = serverDetailedAnalytics.sickLeaveCount;

                    const evVal = modal.querySelector('#evals-count-val');
                    if (evVal) evVal.textContent = newStats.evaluationsCountDisplay;

                    const viVal = modal.querySelector('#viols-count-val');
                    if (viVal) viVal.textContent = newStats.violations.length;

                    const avgVal = modal.querySelector('#avg-score-val');
                    if (avgVal) {
                        avgVal.textContent = `${newStats.avgScore}%`;
                        avgVal.className = `text-3xl font-bold ${getScoreColor(newStats.avgScore).split(' ')[0]}`;
                    }

                    const resVal = modal.querySelector('#res-rate-val');
                    if (resVal) resVal.textContent = `${newStats.resolutionRate}%`;

                    const hviVal = modal.querySelector('#high-viols-val');
                    if (hviVal) hviVal.textContent = newStats.highViolations;

                    const rviVal = modal.querySelector('#resolved-viols-val');
                    if (rviVal) rviVal.textContent = newStats.resolvedViolations;

                    const pviVal = modal.querySelector('#pending-viols-val');
                    if (pviVal) pviVal.textContent = newStats.violations.length - newStats.resolvedViolations;

                    const trVal = modal.querySelector('#trainings-count-val');
                    if (trVal) trVal.textContent = trainingsCount;

                    const peVal = modal.querySelector('#permits-count-val');
                    if (peVal) peVal.textContent = permitsCount;

                    const clVal = modal.querySelector('#clinic-visits-count-val');
                    if (clVal) clVal.textContent = clinicVisitsCount;

                    const inVal = modal.querySelector('#injuries-count-val');
                    if (inVal) inVal.textContent = injuriesCount;

                    const incVal = modal.querySelector('#incidents-count-val');
                    if (incVal) incVal.textContent = incidentsCount;

                    const skVal = modal.querySelector('#sick-leave-count-val');
                    if (skVal) skVal.textContent = sickLeaveCount;

                    const placeholder = modal.querySelector('#violations-container-placeholder');
                    if (placeholder) {
                        const newTypes = Array.from(new Set(newStats.violations.map(v => String(v?.violationType || '').trim()).filter(Boolean)));
                        const newSeverities = Array.from(new Set(newStats.violations.map(v => String(v?.severity || '').trim()).filter(Boolean)));
                        placeholder.innerHTML = renderViolationsContainer(newStats.violations, newTypes, newSeverities);
                        bindViolationListeners(newStats.violations);
                    }
                }
            } catch (err) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('تعذر تحديث تحليل المقاول بالكامل من الخادم:', err);
                }
            } finally {
                const loader = modal.querySelector('#live-loader-indicator');
                if (loader) {
                    loader.style.transition = 'opacity 0.5s';
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 500);
                }
            }
        })();
    },

    /**
     * حقن CSS للتبويبات
     */
    injectAntiShakeStyles() {
        const styleId = 'contractors-anti-shake-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
            .contractors-tab-content {
                display: none;
            }
            .contractors-tab-content.active {
                display: block;
            }
        `;
            document.head.appendChild(style);
        }

        const identityStyleId = 'contractors-identity-styles';
        if (!document.getElementById(identityStyleId)) {
            const identityStyle = document.createElement('style');
            identityStyle.id = identityStyleId;
            identityStyle.textContent = `
                #contractors-section.contractors-identity{--ctr-navy:#0b2d4f;--ctr-blue:#174d78;--ctr-teal:#0f8b83;--ctr-gold:#d99a22;--ctr-ink:#183047;--ctr-muted:#64748b;--ctr-line:#d8e5ec;--ctr-pale:#f4f9fb;color:var(--ctr-ink)}
                #contractors-section.contractors-identity *{box-sizing:border-box}
                .contractors-module-hero{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;padding:22px 24px;border:1px solid rgba(15,139,131,.28);border-radius:18px;background:linear-gradient(125deg,var(--ctr-navy),var(--ctr-blue) 61%,#126c68);color:#fff;box-shadow:0 12px 32px rgba(11,45,79,.2)}
                .contractors-module-hero:after{content:"";position:absolute;inset-inline-end:-74px;top:-112px;width:230px;height:230px;border:31px solid rgba(255,255,255,.055);border-radius:50%;pointer-events:none}
                .contractors-module-hero__copy{position:relative;z-index:1;display:flex;align-items:center;gap:15px;min-width:min(100%,360px)}
                .contractors-module-hero__icon{flex:0 0 auto;width:54px;height:54px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.24);border-radius:15px;background:rgba(255,255,255,.12);font-size:23px}
                .contractors-module-hero__eyebrow{display:block;margin-bottom:3px;color:#8ce9df;font-size:.68rem;font-weight:800;letter-spacing:.04em}
                .contractors-module-hero h1{margin:0;color:#fff;font-size:1.25rem;font-weight:900;line-height:1.35}
                .contractors-module-hero p{margin:5px 0 0;color:#d9ebf3;font-size:.76rem}
                .contractors-module-hero__meta{position:relative;z-index:1;display:flex;align-items:center;gap:7px;flex-wrap:wrap}
                .contractors-module-hero__meta span{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border:1px solid rgba(255,255,255,.2);border-radius:9px;background:rgba(255,255,255,.1);font-size:.69rem;font-weight:750}
                .contractors-module-hero__meta i{color:#8ce9df}
                #contractors-section .contractors-tabs-wrapper{position:sticky;top:0;z-index:20;padding:7px;border:1px solid var(--ctr-line);border-radius:14px;background:rgba(248,252,253,.94);box-shadow:0 5px 18px rgba(15,46,72,.08);backdrop-filter:blur(12px)}
                #contractors-section .contractors-tabs-container{display:flex;align-items:center;gap:6px;overflow-x:auto;scrollbar-width:thin;padding:1px}
                #contractors-section .contractors-tab-btn{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:42px;padding:9px 13px!important;border:1px solid transparent!important;border-radius:10px!important;background:transparent;color:#546b7d!important;font-size:.75rem;font-weight:780!important;white-space:nowrap;transition:background .18s,color .18s,border-color .18s,box-shadow .18s}
                #contractors-section .contractors-tab-btn:hover{border-color:#c7dce4!important;background:#fff;color:var(--ctr-navy)!important}
                #contractors-section .contractors-tab-btn.active{border-color:var(--ctr-navy)!important;background:linear-gradient(135deg,var(--ctr-navy),var(--ctr-blue));color:#fff!important;box-shadow:0 5px 13px rgba(11,45,79,.2)}
                #contractors-section .contractors-tab-btn.active i{color:#76e0d5}
                #contractors-section #contractors-btn-refresh{margin-inline-start:auto;border-color:#b8d9d6!important;color:var(--ctr-teal)!important;background:#f0fdfa}
                #contractors-section .contractors-tab-content>.content-card{overflow:hidden;border:1px solid var(--ctr-line);border-radius:16px;background:#fff;box-shadow:0 7px 24px rgba(15,46,72,.07)}
                #contractors-section .contractors-tab-content>.content-card>.card-header{padding:15px 18px;border:0;background:linear-gradient(125deg,var(--ctr-navy),var(--ctr-blue));color:#fff}
                #contractors-section .contractors-tab-content>.content-card>.card-header .card-title{margin:0;color:#fff;font-size:.98rem;font-weight:850}
                #contractors-section .contractors-tab-content>.content-card>.card-header .card-title i{color:#76e0d5}
                #contractors-section .contractors-tab-content>.content-card>.card-header .btn-secondary{border-color:rgba(255,255,255,.25);background:rgba(255,255,255,.12);color:#fff;box-shadow:none}
                #contractors-section .contractors-tab-content>.content-card>.card-header .btn-success{border-color:#fff;background:#fff;color:#047857;box-shadow:none}
                #contractors-section .contractors-tab-content>.content-card>.card-header .form-input{min-height:38px;border-color:rgba(255,255,255,.35);background:#fff;color:#263e50}
                #contractors-section .contractors-tab-content>.content-card>.card-body{padding:18px;background:linear-gradient(180deg,#fff,#fbfdfe)}
                #contractors-section .contractors-subsection{padding:15px;border:1px solid #e0eaf0;border-radius:13px;background:#fff}
                #contractors-section .contractors-subsection+.contractors-subsection{margin-top:14px}
                #contractors-section .contractors-subsection__title{display:flex;align-items:center;gap:8px;margin:0 0 12px;color:var(--ctr-navy);font-size:.86rem;font-weight:850}
                #contractors-section .contractors-subsection__title i{color:var(--ctr-teal)}
                #contractors-section .contractors-request-intro{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;padding:17px 18px;border:1px solid #b8ded9;border-radius:14px;background:linear-gradient(135deg,#effaf8,#f7fbfd)}
                #contractors-section .contractors-request-intro h3{margin:0 0 4px;color:var(--ctr-navy);font-size:.92rem;font-weight:850}
                #contractors-section .contractors-request-intro p{margin:0;color:#536b7c;font-size:.74rem}
                #contractors-section .contractors-request-intro .btn-primary{flex:0 0 auto;background:linear-gradient(135deg,var(--ctr-teal),#0d746e);box-shadow:0 5px 14px rgba(15,139,131,.22)}
                #contractors-section .table-wrapper{overflow:auto;border:1px solid var(--ctr-line);border-radius:12px;background:#fff;max-height:68vh}
                #contractors-section .data-table{width:100%;min-width:850px;border-collapse:separate;border-spacing:0}
                #contractors-section .data-table thead{position:sticky;top:0;z-index:3}
                #contractors-section .data-table th{padding:12px 10px;border-inline-start:1px solid rgba(255,255,255,.09);border-bottom:2px solid #1fb8ad;background:linear-gradient(180deg,#173f61,#0e324f);color:#fff;font-size:.7rem;font-weight:800;white-space:nowrap;text-align:right}
                #contractors-section .data-table td{padding:11px 10px;border-bottom:1px solid #e7eef3;color:#344b5f;font-size:.76rem;vertical-align:middle}
                #contractors-section .data-table tbody tr:nth-child(even){background:#f8fbfd}
                #contractors-section .data-table tbody tr:hover{background:#edf8f7}
                #contractors-section .empty-state{padding:42px 18px;text-align:center;color:var(--ctr-muted)}
                #contractors-section .empty-state i{display:grid;place-items:center;width:56px;height:56px;margin:0 auto 10px;border-radius:16px;background:#e8f5f3;color:var(--ctr-teal)!important;font-size:22px!important}
                #contractors-section .approved-filters-bar{border:1px solid #e2e8f0;background:#ffffff;border-radius:12px;padding:10px 14px;margin-bottom:12px}
                #contractors-section .approved-filters-bar__title{color:var(--ctr-navy)}
                #contractors-section .approved-filters-bar__title i{color:var(--ctr-teal)}
                #contractors-section .approved-filters-bar__badge{background:var(--ctr-teal)}
                #contractors-section .approved-filters-bar__search-input:focus,#contractors-section .approved-filters-bar__select:focus{border-color:var(--ctr-teal);box-shadow:0 0 0 3px rgba(15,139,131,.12)}
                #contractors-section .contractors-kpi-grid{display:grid!important;grid-template-columns:repeat(5,minmax(170px,1fr))!important;min-width:0!important;gap:10px!important}
                #contractors-section .contractors-kpi-grid>.content-card{min-height:116px!important;border-width:1px!important;border-radius:13px!important;box-shadow:0 4px 14px rgba(15,46,72,.06)!important;contain:none}
                #contractors-section .contractors-requirements-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
                #contractors-section .requirement-category-group{overflow:hidden;border:1px solid #dce8ee;border-radius:13px;background:#fbfdfe;padding:12px}
                #contractors-section .requirement-item{border-width:1px!important;border-color:#d9e6ec!important;border-radius:11px!important;box-shadow:0 3px 10px rgba(15,46,72,.05)!important}
                #contractors-section .requirement-category-filter{border-width:1px!important;background:#fff}
                #contractors-section .requirement-category-filter.active{background:var(--ctr-navy)!important;border-color:var(--ctr-navy)!important;color:#fff!important}
                #ctr-analytics-toolbar{background:linear-gradient(125deg,#0b2d4f 0%,#174d78 62%,#126c68 100%)!important;box-shadow:0 8px 24px rgba(11,45,79,.19)!important}
                #ctr-filter-panel{border-color:#bcd9df!important;background:linear-gradient(180deg,#f9fcfd,#f1f8fa)!important}
                #ctr-analytics-root .ctr-panel{border-color:#d8e5ec!important;box-shadow:0 5px 18px rgba(15,46,72,.06)!important}
                #contractor-approval-request-modal .approval-premium-content{border:1px solid #b9d1dc}
                #contractor-approval-request-modal .approval-premium-header{background:linear-gradient(125deg,#0b2d4f,#174d78 64%,#126c68)!important}
                #contractor-approval-request-modal .approval-premium-input:focus,#contractor-approval-request-modal .approval-premium-select:focus,#contractor-approval-request-modal .approval-premium-textarea:focus{border-color:#0f8b83!important;box-shadow:0 0 0 3px rgba(15,139,131,.12)!important}
                .ctr-detail-modal{padding:18px;background:rgba(4,22,38,.7);backdrop-filter:blur(5px)}
                .ctr-detail-dialog{width:min(760px,96vw)!important;max-width:760px!important;max-height:min(90vh,900px);overflow:hidden;border:1px solid #bcd3df!important;border-radius:18px!important;background:#f7fafc!important;box-shadow:0 26px 80px rgba(4,25,42,.32)!important}
                .ctr-detail-dialog--wide{width:min(920px,96vw)!important;max-width:920px!important}
                .ctr-detail-head{position:relative;overflow:hidden;display:flex!important;align-items:center!important;justify-content:space-between!important;min-height:104px;padding:19px 22px!important;border:0!important;background:linear-gradient(125deg,#0b2d4f,#174d78 64%,#126c68)!important;color:#fff!important}
                .ctr-detail-head:after{content:"";position:absolute;inset-inline-end:-42px;top:-88px;width:190px;height:190px;border:25px solid rgba(255,255,255,.06);border-radius:50%;pointer-events:none}
                .ctr-detail-head__copy{position:relative;z-index:1;display:flex;align-items:center;gap:14px;min-width:0}
                .ctr-detail-head__icon{flex:0 0 auto;display:grid;place-items:center;width:50px;height:50px;border:1px solid rgba(255,255,255,.26);border-radius:14px;background:rgba(255,255,255,.12);color:#83e5dc;font-size:20px}
                .ctr-detail-head__eyebrow{display:block;margin-bottom:3px;color:#8ce9df;font-size:.69rem;font-weight:800;letter-spacing:.03em}
                .ctr-detail-head .modal-title{margin:0!important;color:#fff!important;font-size:1.12rem!important;font-weight:900!important;line-height:1.4}
                .ctr-detail-head p{max-width:620px;margin:4px 0 0;color:#d5e8f0;font-size:.75rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
                .ctr-detail-head .modal-close{position:relative;z-index:2;flex:0 0 auto;display:grid;place-items:center;width:38px;height:38px;border:1px solid rgba(255,255,255,.25);border-radius:10px;background:rgba(255,255,255,.1)!important;color:#fff!important}
                .ctr-detail-head .modal-close:hover{background:rgba(255,255,255,.2)!important}
                .ctr-detail-body{overflow-y:auto!important;padding:18px!important;background:linear-gradient(180deg,#f8fbfc,#eef5f7)!important}
                .ctr-detail-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:14px}
                .ctr-detail-summary>div{min-height:75px;padding:12px 14px;border:1px solid #d8e6ec;border-radius:12px;background:#fff;box-shadow:0 3px 10px rgba(15,46,72,.05)}
                .ctr-detail-summary span:first-child{display:block;margin-bottom:7px;color:#718596;font-size:.68rem;font-weight:750}
                .ctr-detail-summary strong{display:block;color:#153b5b;font-size:.84rem;font-weight:850;overflow-wrap:anywhere}
                .ctr-detail-code{color:#0b70c7!important;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;direction:ltr;text-align:right}
                .ctr-detail-section{margin-top:12px;padding:15px;border:1px solid #d7e5eb;border-radius:13px;background:#fff;box-shadow:0 4px 14px rgba(15,46,72,.045)}
                .ctr-detail-section h3{display:flex;align-items:center;gap:8px;margin:0 0 13px;padding-bottom:10px;border-bottom:1px solid #e5edf1;color:#0b2d4f;font-size:.84rem;font-weight:900}
                .ctr-detail-section h3 i{display:grid;place-items:center;width:27px;height:27px;border-radius:8px;background:#e7f5f3;color:#0f8b83;font-size:.72rem}
                .ctr-detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
                .ctr-detail-field{min-width:0;padding:10px 12px;border:1px solid #e1eaf0;border-radius:10px;background:#f9fbfc}
                .ctr-detail-field label{display:block;margin-bottom:5px;color:#718394;font-size:.68rem;font-weight:780}
                .ctr-detail-field p{margin:0;color:#213b51;font-size:.82rem;font-weight:700;line-height:1.65;overflow-wrap:anywhere}
                .ctr-detail-section--dates{border-inline-start:4px solid #0f8b83}
                .ctr-detail-note{border-inline-start:4px solid #d99a22}
                .ctr-detail-note>p{margin:0;color:#41596c;font-size:.8rem;line-height:1.8;white-space:pre-line}
                .ctr-request-detail-body #request-details-form>.space-y-4>.grid{gap:10px!important}
                .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div{min-width:0;padding:11px 12px;border:1px solid #dfe9ee;border-radius:10px;background:#fff}
                .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div label{display:block;margin-bottom:6px!important;color:#6c8191!important;font-size:.68rem!important;font-weight:780!important}
                .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div p{margin:0;color:#213b51!important;font-size:.81rem;font-weight:700;line-height:1.6;overflow-wrap:anywhere}
                .ctr-request-detail-body #request-details-form>.space-y-4>div:not(.grid){border-radius:12px!important;box-shadow:none!important}
                .ctr-request-detail-body table{border:1px solid #d8e5eb;border-radius:9px;overflow:hidden}
                .ctr-request-detail-body table thead{background:linear-gradient(180deg,#173f61,#0e324f)!important}
                .ctr-request-detail-body table th{background:transparent!important;color:#fff!important;font-weight:800!important}
                .ctr-detail-footer{display:flex!important;align-items:center;gap:8px;flex-wrap:wrap;padding:13px 18px!important;border-top:1px solid #d8e5eb!important;background:#fff!important}
                .ctr-detail-footer button{min-height:39px;border-radius:9px!important;font-size:.76rem!important;font-weight:800!important}
                @media(max-width:1180px){#contractors-section .contractors-kpi-grid{grid-template-columns:repeat(3,minmax(170px,1fr))!important}.contractors-module-hero__meta{width:100%}}
                @media(max-width:820px){#contractors-section .contractors-requirements-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}#contractors-section .contractors-tab-content>.content-card>.card-header>div{align-items:flex-start;flex-direction:column}#contractors-section .contractors-tab-content>.content-card>.card-header>div>div{width:100%}.contractors-module-hero{padding:18px}.contractors-module-hero__meta span{flex:1;justify-content:center}#contractor-approval-request-modal form div[style*="grid-template-columns:1fr 1fr 1fr"]{grid-template-columns:repeat(2,minmax(0,1fr))!important}.ctr-detail-summary{grid-template-columns:repeat(2,minmax(0,1fr))}}
                @media(max-width:620px){.contractors-module-hero__copy{align-items:flex-start}.contractors-module-hero__icon{width:46px;height:46px}.contractors-module-hero h1{font-size:1.05rem}.contractors-module-hero__meta{display:grid;grid-template-columns:1fr}.contractors-module-hero__meta span{width:100%}#contractors-section .contractors-kpi-grid,#contractors-section .contractors-requirements-kpis{grid-template-columns:1fr!important}#contractors-section .contractors-tab-content>.content-card>.card-body{padding:12px}#contractors-section .contractors-request-intro .btn-primary{width:100%}#contractor-approval-request-modal .approval-premium-content{max-width:96vw!important}#contractor-approval-request-modal form div[style*="grid-template-columns:1fr 1fr 1fr"],#contractor-approval-request-modal form div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important}.ctr-detail-modal{padding:8px}.ctr-detail-dialog{max-height:96vh}.ctr-detail-head{min-height:92px;padding:15px!important}.ctr-detail-head__icon{width:42px;height:42px}.ctr-detail-head p{max-width:66vw}.ctr-detail-body{padding:11px!important}.ctr-detail-summary,.ctr-detail-grid{grid-template-columns:1fr}.ctr-request-detail-body #request-details-form>.space-y-4>.grid{grid-template-columns:1fr!important}.ctr-detail-footer button{flex:1 1 auto}}
                @media(prefers-reduced-motion:reduce){#contractors-section .contractors-tab-btn{transition:none}}
                [data-theme="dark"] #contractors-section.contractors-identity{--ctr-ink:#e6eef5;--ctr-muted:#a7bac9;--ctr-line:#324859}
                [data-theme="dark"] #contractors-section .contractors-tabs-wrapper,[data-theme="dark"] #contractors-section .contractors-tab-content>.content-card,[data-theme="dark"] #contractors-section .contractors-subsection,[data-theme="dark"] #contractors-section .table-wrapper{background:#132638;border-color:#324859}
                [data-theme="dark"] #contractors-section .contractors-tab-content>.content-card>.card-body{background:#14283a}
                [data-theme="dark"] #contractors-section .data-table td{border-color:#31485a;color:#dbe7ef}[data-theme="dark"] #contractors-section .data-table tbody tr:nth-child(even){background:#192f42}[data-theme="dark"] #contractors-section .data-table tbody tr:hover{background:#1b3b42}
                [data-theme="dark"] #contractors-section .contractors-request-intro,[data-theme="dark"] #contractors-section .approved-filters-bar,[data-theme="dark"] #ctr-filter-panel{background:#183443!important;border-color:#35606a!important}
                [data-theme="dark"] #contractors-section .contractors-request-intro h3,[data-theme="dark"] #contractors-section .contractors-subsection__title,[data-theme="dark"] #contractors-section .approved-filters-bar__title{color:#e6eef5}
                [data-theme="dark"] #contractors-section .contractors-request-intro p,[data-theme="dark"] #contractors-section .approved-filters-bar__meta{color:#afc2cf}
                [data-theme="dark"] #contractors-section .contractors-kpi-grid>.content-card{background:#193549!important;border-color:#3b596b!important}
                [data-theme="dark"] #contractors-section .contractors-kpi-grid>.content-card p{color:#e4edf4!important}
                [data-theme="dark"] #contractors-section .contractors-requirements-kpis>div{background:#193549!important;border-color:#3b596b!important}
                [data-theme="dark"] #contractors-section .contractors-requirements-kpis p{color:#e4edf4!important}
                [data-theme="dark"] #contractors-section .requirement-category-group,[data-theme="dark"] #contractors-section .requirement-item{background:#183044!important;border-color:#365064!important}
                [data-theme="dark"] .ctr-detail-dialog,[data-theme="dark"] .ctr-detail-body{background:#102536!important}
                [data-theme="dark"] .ctr-detail-summary>div,[data-theme="dark"] .ctr-detail-section,[data-theme="dark"] .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div,[data-theme="dark"] .ctr-detail-footer{background:#183044!important;border-color:#365064!important}
                [data-theme="dark"] .ctr-detail-summary span:first-child,[data-theme="dark"] .ctr-detail-field label,[data-theme="dark"] .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div label{color:#a9bdca!important}
                [data-theme="dark"] .ctr-detail-summary strong,[data-theme="dark"] .ctr-detail-section h3,[data-theme="dark"] .ctr-detail-field p,[data-theme="dark"] .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div p{color:#e7f0f6!important}
                [data-theme="dark"] .ctr-detail-field{background:#142b3d;border-color:#365064}
            `;
            document.head.appendChild(identityStyle);
        }

        const filterStyleId = 'approved-filters-bar-styles';
        if (document.getElementById(filterStyleId)) return;

        const filterStyle = document.createElement('style');
        filterStyle.id = filterStyleId;
        filterStyle.textContent = `
            .approved-filters-bar {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 10px 14px;
                margin-bottom: 12px;
                box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
                overflow-x: auto;
                scrollbar-width: thin;
                scrollbar-color: #cbd5e1 transparent;
            }
            .approved-filters-bar::-webkit-scrollbar {
                height: 4px;
            }
            .approved-filters-bar::-webkit-scrollbar-track {
                background: transparent;
            }
            .approved-filters-bar::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 4px;
            }
            .approved-filters-bar__header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                margin-bottom: 8px;
            }
            .approved-filters-bar__title {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                font-size: 0.85rem;
                font-weight: 700;
                color: #334155;
            }
            .approved-filters-bar__title i {
                color: #3b82f6;
                font-size: 12px;
            }
            .approved-filters-bar__badge {
                min-width: 20px;
                height: 18px;
                padding: 0 6px;
                border-radius: 999px;
                background: #3b82f6;
                color: #fff;
                font-size: 0.7rem;
                font-weight: 700;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
            .approved-filters-bar__meta {
                font-size: 0.78rem;
                font-weight: 600;
                color: #64748b;
            }
            .approved-filters-bar__row {
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: nowrap;
                width: 100%;
                min-width: max-content;
            }
            .approved-filters-bar__search-wrap {
                position: relative;
                display: flex;
                align-items: center;
                flex: 2;
                min-width: 180px;
            }
            .approved-filters-bar__search-icon {
                position: absolute;
                right: 10px;
                color: #3b82f6;
                pointer-events: none;
                font-size: 13px;
            }
            .approved-filters-bar__search-input {
                width: 100%;
                height: 36px;
                padding: 0 32px 0 30px;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                background: #f8fafc;
                font-size: 13px;
                color: #0f172a;
                transition: all 0.2s ease;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .approved-filters-bar__search-input:focus {
                outline: none;
                background: #ffffff;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
            }
            .approved-filters-bar__search-clear {
                position: absolute;
                left: 6px;
                width: 24px;
                height: 24px;
                border: none;
                border-radius: 6px;
                background: #e2e8f0;
                color: #475569;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 11px;
            }
            .approved-filters-bar__search-clear:hover {
                background: #cbd5e1;
            }
            .approved-filters-bar__select {
                height: 36px;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                background: #f8fafc;
                padding: 0 10px;
                font-size: 13px;
                color: #0f172a;
                flex: 1;
                min-width: 110px;
                transition: all 0.2s ease;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .approved-filters-bar__select:hover {
                background: #ffffff;
                border-color: #94a3b8;
            }
            .approved-filters-bar__select:focus {
                outline: none;
                background: #ffffff;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
            }
            .approved-filters-bar__reset {
                height: 36px;
                padding: 0 14px;
                background: #f1f5f9;
                color: #475569;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 700;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                white-space: nowrap;
                flex: 0 0 auto;
                transition: all 0.2s ease;
            }
            .approved-filters-bar__reset:hover:not(:disabled) {
                background: #e2e8f0;
                color: #0f172a;
                border-color: #94a3b8;
                transform: translateY(-1px);
            }
            .approved-filters-bar__reset:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        `;
        document.head.appendChild(filterStyle);
    },

    async exportContractorViolationsReport(contractorLookupEncoded = '', contractorNameEncoded = '') {
        try {
            const contractorLookup = decodeURIComponent(String(contractorLookupEncoded || ''));
            const contractorName = decodeURIComponent(String(contractorNameEncoded || ''));
            const ctx = this.buildContractorAnalyticsMatchers(
                { id: contractorLookup, contractorId: contractorLookup, name: contractorName, companyName: contractorName },
                contractorLookup
            );
            const violations = (AppState.appData.violations || []).filter(ctx.violationBelongsToContractor);

            if (!violations.length) {
                Notification.warning('لا توجد مخالفات مسجلة لهذا المقاول');
                return;
            }

            const highCount = violations.filter(v => {
                const severity = String(v.severity || '').trim();
                return severity === 'عالية' || severity === 'high' || severity === 'حرجة';
            }).length;
            const resolvedCount = violations.filter(v => {
                const status = String(v.status || '').trim();
                return status === 'محلول' || status === 'resolved' || status === 'تم الحل';
            }).length;
            const inProgressCount = Math.max(0, violations.length - resolvedCount);
            const resolutionRate = violations.length > 0 ? Math.round((resolvedCount / violations.length) * 100) : 0;

            Loading.show('جاري إنشاء تقرير المخالفات...');

            const rowsHtml = violations.map((v, idx) => `
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${idx + 1}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${v.violationDate ? Utils.formatDate(v.violationDate) : '-'}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(v.violationType || v.title || '-')}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${Utils.escapeHTML(v.severity || '-')}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${Utils.escapeHTML(v.status || '-')}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(this._ctrGetViolationPlaceLabel(v) || '-')}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(v.description || v.details || v.notes || '-')}</td>
                </tr>
            `).join('');

            const reportTitle = `تقرير مخالفات المقاول: ${Utils.escapeHTML(contractorName || 'غير محدد')}`;
            const content = `
                <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 20px; margin-bottom: 12px; color: #991B1B; font-weight: 700;">ملخص مخالفات المقاول</h2>
                    <div style="margin-bottom: 16px; padding: 12px; background: #FEF2F2; border-right: 4px solid #DC2626; border-radius: 8px;">
                        <strong style="color: #991B1B;">المقاول:</strong> <span style="color: #1F2937;">${Utils.escapeHTML(contractorName || 'غير محدد')}</span>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #FEF2F2; border: 1px solid #FECACA;">
                            <div style="font-size: 12px; color: #B91C1C; margin-bottom: 6px; font-weight: 600;">إجمالي المخالفات</div>
                            <div style="font-size: 26px; font-weight: 700; color: #991B1B;">${violations.length}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #FFF7ED; border: 1px solid #FED7AA;">
                            <div style="font-size: 12px; color: #C2410C; margin-bottom: 6px; font-weight: 600;">مخالفات عالية الخطورة</div>
                            <div style="font-size: 26px; font-weight: 700; color: #9A3412;">${highCount}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #ECFDF5; border: 1px solid #BBF7D0;">
                            <div style="font-size: 12px; color: #047857; margin-bottom: 6px; font-weight: 600;">المخالفات المحلولة</div>
                            <div style="font-size: 26px; font-weight: 700; color: #065F46;">${resolvedCount}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #EFF6FF; border: 1px solid #BFDBFE;">
                            <div style="font-size: 12px; color: #1D4ED8; margin-bottom: 6px; font-weight: 600;">معدل الحل</div>
                            <div style="font-size: 26px; font-weight: 700; color: #1E3A8A;">${resolutionRate}%</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #FFFBEB; border: 1px solid #FDE68A;">
                            <div style="font-size: 12px; color: #B45309; margin-bottom: 6px; font-weight: 600;">قيد المعالجة</div>
                            <div style="font-size: 26px; font-weight: 700; color: #92400E;">${inProgressCount}</div>
                        </div>
                    </div>
                </div>
                <div style="margin-bottom: 16px;">
                    <h3 style="font-size: 18px; margin-bottom: 12px; color: #991B1B; font-weight: 700; border-bottom: 2px solid #DC2626; padding-bottom: 8px;">سجل المخالفات</h3>
                </div>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px; direction: rtl;">
                        <thead>
                            <tr style="background: #B91C1C; color: #FFFFFF;">
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">#</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">التاريخ</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">نوع المخالفة</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">الشدة</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">الحالة</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">الموقع</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">الوصف</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>
            `;

            const formCode = `CON-VIOL-${String(contractorLookup || contractorName || 'NA').substring(0, 8)}-${new Date().toISOString().slice(0, 10)}`;
            const htmlContent = typeof FormHeader !== 'undefined' && typeof FormHeader.generatePDFHTML === 'function'
                ? FormHeader.generatePDFHTML(
                    formCode,
                    reportTitle,
                    content,
                    false,
                    true,
                    { source: 'ContractorViolations', contractorId: contractorLookup, contractorName },
                    new Date().toISOString(),
                    new Date().toISOString()
                )
                : `<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${reportTitle}</title></head><body>${content}</body></html>`;

            if (typeof FormHeader !== 'undefined' && typeof FormHeader.generatePDF === 'function') {
                await FormHeader.generatePDF(htmlContent, `${reportTitle}.pdf`);
            } else {
                const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${reportTitle.replace(/\s+/g, '_')}.html`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }

            Loading.hide();
            Notification.success(`تم إنشاء تقرير مخالفات المقاول: ${contractorName || 'غير محدد'}`);
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في إنشاء تقرير مخالفات المقاول:', error);
            Notification.error('تعذر إنشاء تقرير مخالفات المقاول: ' + (error.message || 'خطأ غير معروف'));
        }
    }
};

// ===== Export module to global scope =====
// تصدير الموديول إلى window فوراً لضمان توافره
(function () {
    'use strict';
    try {
        if (typeof window !== 'undefined' && typeof Contractors !== 'undefined') {
            window.Contractors = Contractors;
            // تصدير الثوابت للاستخدام في موديولات أخرى
            window.Contractors.APPROVED_ENTITY_STATUS_OPTIONS = APPROVED_ENTITY_STATUS_OPTIONS;
            window.Contractors.APPROVED_ENTITY_TYPE_OPTIONS = APPROVED_ENTITY_TYPE_OPTIONS;
            
            // إشعار عند تحميل الموديول بنجاح
            if (typeof AppState !== 'undefined' && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ Contractors module loaded and available on window.Contractors');
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تصدير Contractors:', error);
        // محاولة التصدير مرة أخرى حتى في حالة الخطأ
        if (typeof window !== 'undefined' && typeof Contractors !== 'undefined') {
            try {
                window.Contractors = Contractors;
                window.Contractors.APPROVED_ENTITY_STATUS_OPTIONS = APPROVED_ENTITY_STATUS_OPTIONS;
                window.Contractors.APPROVED_ENTITY_TYPE_OPTIONS = APPROVED_ENTITY_TYPE_OPTIONS;
            } catch (e) {
                console.error('❌ فشل تصدير Contractors:', e);
            }
        }
    }
})();
