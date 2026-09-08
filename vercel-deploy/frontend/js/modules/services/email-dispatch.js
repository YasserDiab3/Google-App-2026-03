/**
 * EmailDispatch — إرسال مباشر من شاشات التفاصيل حسب إعدادات مدير النظام.
 * لا يغيّر مسارات التحميل؛ فقط زر + مودال + استدعاء API.
 */
const EmailDispatch = {
    _settings: null,
    _loadingPromise: null,
    _cacheAt: 0,

    GROUP_LABELS: {
        ops: 'التشغيل والسلامة',
        clinic: 'العيادة',
        reports: 'التقارير',
        system: 'النظام'
    },

    /** كتالوج افتراضي للرسم الفوري (يطابق Backend/EmailSettings.gs) */
    DEFAULT_MODULE_CATALOG: [
        { key: 'incidents', labelAr: 'الحوادث', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'incidents.alert', labelAr: 'تنبيه سلامة (حوادث)', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'incidents.investigation', labelAr: 'تحقيق حادث', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'violations', labelAr: 'المخالفات', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'violations.blacklist', labelAr: 'القائمة السوداء', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'ptw', labelAr: 'تصاريح العمل', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'nearmiss', labelAr: 'الحوادث الوشيكة', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'daily-observations', labelAr: 'الملاحظات اليومية', group: 'ops', enabled: true, manualSend: true, autoSend: true },
        { key: 'daily-safety-checklist', labelAr: 'قائمة المرور اليومي للسلامة', group: 'ops', enabled: true, manualSend: true, autoSend: true, autoEvents: ['create'] },
        { key: 'daily-observations.analytics', labelAr: 'تحليل الملاحظات', group: 'reports', enabled: true, manualSend: true, autoSend: false },
        { key: 'daily-observations.executive', labelAr: 'لوحة تنفيذية للملاحظات', group: 'reports', enabled: true, manualSend: true, autoSend: false },
        { key: 'behavior-monitoring', labelAr: 'مراقبة التصرفات', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'chemical-safety', labelAr: 'السلامة الكيميائية', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'ppe', labelAr: 'مهمات الوقاية', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'legal-documents', labelAr: 'الوثائق القانونية', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'sop-jha', labelAr: 'إجراءات العمل والتقييمات', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'action-tracking', labelAr: 'متابعة الإجراءات', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'change-management', labelAr: 'إدارة التغيّر', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'periodic-inspections', labelAr: 'الفحوصات الدورية', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'periodic-equipment', labelAr: 'معدات الفحص الدوري', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'training', labelAr: 'التدريب', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'employees', labelAr: 'الموظفون', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'contractors', labelAr: 'المقاولون', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'fire-equipment', labelAr: 'معدات الإطفاء', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'emergency', labelAr: 'الطوارئ', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'risk-assessment', labelAr: 'تقييم المخاطر', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'iso', labelAr: 'نظام ISO', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'sustainability', labelAr: 'الاستدامة', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'safety-budget', labelAr: 'ميزانية السلامة', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'user-tasks', labelAr: 'مهام المستخدمين', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'issue-tracking', labelAr: 'تتبع المشاكل', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'safety-calendar', labelAr: 'تقويم السلامة', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'issuing-authorities', labelAr: 'المصرّحون بالتوقيع', group: 'ops', enabled: true, manualSend: true, autoSend: false },
        { key: 'clinic.visit', labelAr: 'زيارة عيادة', group: 'clinic', enabled: true, manualSend: true, autoSend: false },
        { key: 'clinic.injury', labelAr: 'إصابة عيادة', group: 'clinic', enabled: true, manualSend: true, autoSend: false },
        { key: 'clinic.sickLeave', labelAr: 'إجازة مرضية', group: 'clinic', enabled: true, manualSend: true, autoSend: false },
        { key: 'clinic.medication', labelAr: 'دواء عيادة', group: 'clinic', enabled: true, manualSend: true, autoSend: false },
        { key: 'clinic.supply', labelAr: 'طلب مستلزمات عيادة', group: 'clinic', enabled: true, manualSend: true, autoSend: false },
        { key: 'reports', labelAr: 'التقارير المجمّعة', group: 'reports', enabled: true, manualSend: true, autoSend: false },
        { key: 'safety-performance-kpis', labelAr: 'مؤشرات أداء السلامة', group: 'reports', enabled: true, manualSend: true, autoSend: false },
        { key: 'hse', labelAr: 'لوحة HSE', group: 'reports', enabled: true, manualSend: true, autoSend: false },
        { key: 'daily-activity-report', labelAr: 'تقرير نشاط يومي', group: 'system', enabled: true, manualSend: false, autoSend: true },
        { key: 'system.deleteAudit', labelAr: 'تدقيق الحذف (مدراء)', group: 'system', enabled: true, manualSend: false, autoSend: true }
    ],

    getDefaultSettings() {
        const modules = {};
        (this.DEFAULT_MODULE_CATALOG || []).forEach((m) => {
            modules[m.key] = {
                labelAr: m.labelAr,
                group: m.group,
                enabled: !!m.enabled,
                manualSend: !!m.manualSend,
                autoSend: !!m.autoSend,
                autoEvents: [],
                recipients: []
            };
        });
        return {
            globalEnabled: false,
            defaultRecipients: Array.isArray(AppState?.notificationEmails) ? AppState.notificationEmails.slice() : [],
            modules,
            updatedAt: '',
            updatedBy: ''
        };
    },

    mergeWithDefaults(raw) {
        const defaults = this.getDefaultSettings();
        const src = raw && typeof raw === 'object' ? raw : {};
        const merged = {
            globalEnabled: src.globalEnabled === true,
            defaultRecipients: Array.isArray(src.defaultRecipients) ? src.defaultRecipients.slice() : defaults.defaultRecipients.slice(),
            modules: {},
            updatedAt: String(src.updatedAt || ''),
            updatedBy: String(src.updatedBy || '')
        };
        Object.keys(defaults.modules).forEach((key) => {
            const d = defaults.modules[key];
            const s = (src.modules && src.modules[key]) ? src.modules[key] : {};
            merged.modules[key] = {
                labelAr: d.labelAr,
                group: d.group,
                enabled: s.enabled === false ? false : (s.enabled === true ? true : d.enabled),
                manualSend: s.manualSend === false ? false : (s.manualSend === true ? true : d.manualSend),
                autoSend: s.autoSend === false ? false : (s.autoSend === true ? true : d.autoSend),
                autoEvents: Array.isArray(s.autoEvents) ? s.autoEvents : [],
                recipients: Array.isArray(s.recipients) ? s.recipients.slice() : []
            };
        });
        return merged;
    },

    async loadSettings(force) {
        const now = Date.now();
        if (!force && this._settings && (now - this._cacheAt) < 60000) {
            return this._settings;
        }
        if (this._loadingPromise && !force) return this._loadingPromise;
        this._loadingPromise = (async () => {
            try {
                if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendToAppsScript) {
                    this._settings = this.getDefaultSettings();
                    this._cacheAt = Date.now();
                    return this._settings;
                }
                const result = await GoogleIntegration.sendToAppsScript('getEmailSettings', {
                    __timeoutMs: 25000,
                    force: !!force
                });
                if (result && result.success && result.data) {
                    this._settings = this.mergeWithDefaults(result.data);
                } else {
                    this._settings = this.getCachedSettings() || this.getDefaultSettings();
                }
            } catch (e) {
                console.warn('EmailDispatch.loadSettings', e);
                this._settings = this.getCachedSettings() || this.getDefaultSettings();
            }
            this._cacheAt = Date.now();
            return this._settings;
        })();
        try {
            return await this._loadingPromise;
        } finally {
            this._loadingPromise = null;
        }
    },

    _fallbackSettings() {
        return this.getDefaultSettings();
    },

    getCachedSettings() {
        return this._settings;
    },

    invalidateCache() {
        this._settings = null;
        this._cacheAt = 0;
    },

    canManualSend(moduleKey) {
        const cfg = this._settings;
        if (!cfg || !cfg.globalEnabled) return false;
        const mod = cfg.modules && cfg.modules[moduleKey];
        return !!(mod && mod.enabled && mod.manualSend);
    },

    async ensureCanManualSend(moduleKey) {
        await this.loadSettings();
        return this.canManualSend(moduleKey);
    },

    getDefaultRecipients(moduleKey) {
        const cfg = this._settings || this._fallbackSettings();
        const mod = cfg.modules && cfg.modules[moduleKey];
        if (mod && Array.isArray(mod.recipients) && mod.recipients.length) {
            return mod.recipients.slice();
        }
        if (Array.isArray(cfg.defaultRecipients) && cfg.defaultRecipients.length) {
            return cfg.defaultRecipients.slice();
        }
        return Array.isArray(AppState?.notificationEmails) ? AppState.notificationEmails.slice() : [];
    },

    getModuleLabel(moduleKey) {
        const mod = this._settings?.modules?.[moduleKey];
        return (mod && mod.labelAr) || moduleKey;
    },

    /**
     * زر للـ footer — فارغ إن النوع غير مفعّل (بعد تحميل الإعدادات).
     * الاستخدام: ${EmailDispatch.renderFooterButtonHtml('violations')}
     * ثم EmailDispatch.bindFooterButtons(modal, { moduleKey, record, fields })
     */
    renderFooterButtonHtml(moduleKey, opts) {
        const options = opts || {};
        const btnId = options.btnId || ('email-dispatch-btn-' + String(moduleKey).replace(/[^a-z0-9._-]/gi, '_'));
        // يظهر دائماً كحاوية؛ يُخفى عبر JS إن لم يُسمح
        return `<button type="button" id="${btnId}" data-email-module="${String(moduleKey).replace(/"/g, '')}" class="btn-primary email-dispatch-send-btn" style="display:none;">
            <i class="fas fa-envelope ml-2"></i>إرسال بريد
        </button>`;
    },

    /**
     * إظهار الزر وربطه بعد إدراج المودال في DOM.
     */
    async bindFooterButtons(rootEl, context) {
        if (!rootEl || !context || !context.moduleKey) return;
        const allowed = await this.ensureCanManualSend(context.moduleKey);
        const btns = rootEl.querySelectorAll('.email-dispatch-send-btn[data-email-module="' + context.moduleKey + '"], .email-dispatch-send-btn');
        btns.forEach((btn) => {
            const key = btn.getAttribute('data-email-module') || context.moduleKey;
            if (key !== context.moduleKey) return;
            if (!allowed) {
                btn.style.display = 'none';
                return;
            }
            btn.style.display = '';
            if (btn._emailDispatchBound) return;
            btn._emailDispatchBound = true;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const payload = {
                    moduleKey: context.moduleKey,
                    recordId: context.recordId || (context.record && (context.record.id || context.record.isoCode)) || '',
                    title: context.title || this.getModuleLabel(context.moduleKey),
                    subject: context.subject || '',
                    fields: typeof context.buildFields === 'function'
                        ? context.buildFields(context.record)
                        : (context.fields || this.fieldsFromRecord(context.moduleKey, context.record || {}))
                };
                if (typeof context.buildHtml === 'function') {
                    payload.htmlBody = context.buildHtml(context.record);
                } else if (context.htmlBody) {
                    payload.htmlBody = context.htmlBody;
                }
                if (typeof context.buildAttachments === 'function') {
                    payload.attachments = context.buildAttachments(context.record);
                } else if (context.attachments) {
                    payload.attachments = context.attachments;
                }
                this.openSendModal(payload);
            });
        });
    },

    /**
     * خريطة حقول عامة آمنة — تتجاهل الداخلي.
     */
    fieldsFromRecord(moduleKey, record) {
        const r = record || {};
        const skip = /^(password|token|csrf|hash|_)/i;
        const labels = this._labelMap(moduleKey);
        const fields = [];
        const preferred = labels._order || Object.keys(labels).filter((k) => k !== '_order');
        preferred.forEach((key) => {
            if (skip.test(key)) return;
            let val = r[key];
            if (val == null || val === '') return;
            if (typeof val === 'object') {
                try { val = JSON.stringify(val); } catch (_e) { return; }
            }
            fields.push({ label: labels[key] || key, value: String(val) });
        });
        if (!fields.length) {
            Object.keys(r).slice(0, 25).forEach((key) => {
                if (skip.test(key)) return;
                let val = r[key];
                if (val == null || val === '' || typeof val === 'object') return;
                fields.push({ label: key, value: String(val) });
            });
        }
        return fields;
    },

    _labelMap(moduleKey) {
        const maps = {
            violations: {
                _order: ['id', 'employeeName', 'employeeId', 'violationType', 'severity', 'status', 'location', 'violationDetails', 'actionTaken', 'date'],
                id: 'الرقم', employeeName: 'الموظف', employeeId: 'الرقم الوظيفي', violationType: 'نوع المخالفة',
                severity: 'الشدة', status: 'الحالة', location: 'الموقع', violationDetails: 'التفاصيل', actionTaken: 'الإجراء', date: 'التاريخ'
            },
            'violations.blacklist': {
                _order: ['id', 'name', 'nationalId', 'reason', 'status', 'date'],
                id: 'الرقم', name: 'الاسم', nationalId: 'الهوية', reason: 'السبب', status: 'الحالة', date: 'التاريخ'
            },
            'daily-observations': {
                _order: ['isoCode', 'id', 'details', 'responsibleDepartment', 'workflowStage', 'observationType', 'location', 'date'],
                isoCode: 'رمز الملاحظة', id: 'المعرّف', details: 'التفاصيل', responsibleDepartment: 'الإدارة المسؤولة',
                workflowStage: 'المرحلة', observationType: 'النوع', location: 'الموقع', date: 'التاريخ'
            },
            incidents: {
                _order: ['id', 'title', 'type', 'severity', 'status', 'location', 'description', 'date', 'injuredCount'],
                id: 'الرقم', title: 'العنوان', type: 'النوع', severity: 'الشدة', status: 'الحالة',
                location: 'الموقع', description: 'الوصف', date: 'التاريخ', injuredCount: 'عدد المصابين'
            },
            nearmiss: {
                _order: ['id', 'title', 'location', 'description', 'status', 'date'],
                id: 'الرقم', title: 'العنوان', location: 'الموقع', description: 'الوصف', status: 'الحالة', date: 'التاريخ'
            },
            'behavior-monitoring': {
                _order: ['id', 'employeeName', 'behaviorType', 'location', 'details', 'date'],
                id: 'الرقم', employeeName: 'الموظف', behaviorType: 'نوع التصرف', location: 'الموقع', details: 'التفاصيل', date: 'التاريخ'
            },
            'clinic.injury': {
                _order: ['id', 'patientName', 'injuryType', 'bodyPart', 'severity', 'treatment', 'date'],
                id: 'الرقم', patientName: 'المصاب', injuryType: 'نوع الإصابة', bodyPart: 'موضع الإصابة',
                severity: 'الشدة', treatment: 'العلاج', date: 'التاريخ'
            },
            'clinic.visit': {
                _order: ['id', 'patientName', 'visitType', 'diagnosis', 'notes', 'date'],
                id: 'الرقم', patientName: 'المراجع', visitType: 'نوع الزيارة', diagnosis: 'التشخيص', notes: 'ملاحظات', date: 'التاريخ'
            },
            'clinic.sickLeave': {
                _order: ['id', 'employeeName', 'days', 'reason', 'fromDate', 'toDate'],
                id: 'الرقم', employeeName: 'الموظف', days: 'الأيام', reason: 'السبب', fromDate: 'من', toDate: 'إلى'
            },
            ptw: {
                _order: ['id', 'permitId', 'workType', 'location', 'status', 'startDate', 'endDate'],
                id: 'الرقم', permitId: 'رقم التصريح', workType: 'نوع العمل', location: 'الموقع', status: 'الحالة', startDate: 'البداية', endDate: 'النهاية'
            },
            employees: {
                _order: ['id', 'name', 'employeeId', 'department', 'position', 'email', 'phone'],
                id: 'الرقم', name: 'الاسم', employeeId: 'الرقم الوظيفي', department: 'الإدارة', position: 'المسمى', email: 'البريد', phone: 'الهاتف'
            },
            training: {
                _order: ['id', 'title', 'trainer', 'date', 'status', 'location'],
                id: 'الرقم', title: 'العنوان', trainer: 'المدرب', date: 'التاريخ', status: 'الحالة', location: 'الموقع'
            },
            'action-tracking': {
                _order: ['id', 'title', 'status', 'assignee', 'dueDate', 'description'],
                id: 'الرقم', title: 'العنوان', status: 'الحالة', assignee: 'المسؤول', dueDate: 'الاستحقاق', description: 'الوصف'
            },
            'chemical-safety': {
                _order: ['id', 'name', 'casNumber', 'location', 'hazardClass', 'status'],
                id: 'الرقم', name: 'المادة', casNumber: 'CAS', location: 'الموقع', hazardClass: 'التصنيف', status: 'الحالة'
            },
            ppe: {
                _order: ['id', 'itemName', 'employeeName', 'quantity', 'status', 'date'],
                id: 'الرقم', itemName: 'المعدة', employeeName: 'الموظف', quantity: 'الكمية', status: 'الحالة', date: 'التاريخ'
            },
            'legal-documents': {
                _order: ['id', 'title', 'documentType', 'status', 'expiryDate'],
                id: 'الرقم', title: 'العنوان', documentType: 'النوع', status: 'الحالة', expiryDate: 'الانتهاء'
            },
            'sop-jha': {
                _order: ['id', 'title', 'type', 'status', 'department'],
                id: 'الرقم', title: 'العنوان', type: 'النوع', status: 'الحالة', department: 'الإدارة'
            },
            'change-management': {
                _order: ['id', 'title', 'status', 'requester', 'description'],
                id: 'الرقم', title: 'العنوان', status: 'الحالة', requester: 'مقدّم الطلب', description: 'الوصف'
            },
            'periodic-inspections': {
                _order: ['id', 'title', 'location', 'status', 'date', 'result'],
                id: 'الرقم', title: 'العنوان', location: 'الموقع', status: 'الحالة', date: 'التاريخ', result: 'النتيجة'
            },
            emergency: {
                _order: ['id', 'title', 'type', 'status', 'location', 'description'],
                id: 'الرقم', title: 'العنوان', type: 'النوع', status: 'الحالة', location: 'الموقع', description: 'الوصف'
            },
            'risk-assessment': {
                _order: ['id', 'title', 'riskLevel', 'status', 'location'],
                id: 'الرقم', title: 'العنوان', riskLevel: 'مستوى الخطر', status: 'الحالة', location: 'الموقع'
            },
            iso: {
                _order: ['id', 'title', 'type', 'status', 'code'],
                id: 'الرقم', title: 'العنوان', type: 'النوع', status: 'الحالة', code: 'الرمز'
            },
            contractors: {
                _order: ['id', 'name', 'company', 'status', 'trade'],
                id: 'الرقم', name: 'الاسم', company: 'الشركة', status: 'الحالة', trade: 'النشاط'
            },
            'fire-equipment': {
                _order: ['id', 'assetName', 'type', 'location', 'status'],
                id: 'الرقم', assetName: 'الأصل', type: 'النوع', location: 'الموقع', status: 'الحالة'
            },
            'user-tasks': {
                _order: ['id', 'title', 'status', 'assignee', 'dueDate'],
                id: 'الرقم', title: 'العنوان', status: 'الحالة', assignee: 'المسؤول', dueDate: 'الاستحقاق'
            },
            'issue-tracking': {
                _order: ['id', 'title', 'status', 'priority', 'description'],
                id: 'الرقم', title: 'العنوان', status: 'الحالة', priority: 'الأولوية', description: 'الوصف'
            },
            'safety-calendar': {
                _order: ['id', 'title', 'start', 'end', 'location'],
                id: 'الرقم', title: 'العنوان', start: 'البداية', end: 'النهاية', location: 'الموقع'
            },
            'safety-budget': {
                _order: ['id', 'title', 'amount', 'status', 'category'],
                id: 'الرقم', title: 'العنوان', amount: 'المبلغ', status: 'الحالة', category: 'التصنيف'
            },
            sustainability: {
                _order: ['id', 'title', 'type', 'quantity', 'date'],
                id: 'الرقم', title: 'العنوان', type: 'النوع', quantity: 'الكمية', date: 'التاريخ'
            }
        };
        return maps[moduleKey] || { _order: ['id', 'title', 'name', 'status', 'date', 'description', 'details'] };
    },

    openSendModal(opts) {
        const options = opts || {};
        const moduleKey = options.moduleKey;
        if (!moduleKey) return;
        if (!this.canManualSend(moduleKey)) {
            if (typeof Notification !== 'undefined') {
                Notification.warning('الإرسال اليدوي غير مفعّل لهذا النوع. راجع إعدادات البريد.');
            }
            return;
        }
        const existing = document.getElementById('email-dispatch-modal');
        if (existing) existing.remove();

        const recipients = this.getDefaultRecipients(moduleKey);
        const label = this.getModuleLabel(moduleKey);
        const title = options.title || label;
        const fields = options.fields || [];
        const htmlBody = options.htmlBody || '';
        const attachments = Array.isArray(options.attachments) ? options.attachments : [];
        const subjectDefault = options.subject || (title + (options.recordId ? ' — ' + options.recordId : ''));

        const fieldsPreview = fields.length
            ? fields.map((f) =>
                `<div class="email-dispatch-field">
                    <span class="email-dispatch-field-label">${this._esc(f.label)}</span>
                    <span class="email-dispatch-field-value">${this._esc(f.value)}</span>
                </div>`
            ).join('')
            : '<p class="email-dispatch-empty">لا حقول للعرض</p>';

        const chipsHtml = recipients.length
            ? recipients.map((email) => `<span class="email-dispatch-chip" dir="ltr">${this._esc(email)}</span>`).join('')
            : '<span class="email-dispatch-chip email-dispatch-chip-muted">أضف مستلمين بالأسفل</span>';

        const modal = document.createElement('div');
        modal.id = 'email-dispatch-modal';
        modal.className = 'modal-overlay email-dispatch-overlay';
        modal.style.zIndex = '10050';
        modal.innerHTML = `
            <div class="modal-content email-dispatch-panel">
                <div class="email-dispatch-header">
                    <div>
                        <p class="email-dispatch-eyebrow">إرسال فوري</p>
                        <h3 class="email-dispatch-title"><i class="fas fa-paper-plane"></i> ${this._esc(label)}</h3>
                    </div>
                    <button type="button" class="email-dispatch-close" data-close="1" aria-label="إغلاق">&times;</button>
                </div>
                <div class="email-dispatch-body">
                    <div class="email-dispatch-block">
                        <label for="email-dispatch-subject">الموضوع</label>
                        <input type="text" id="email-dispatch-subject" class="form-input w-full" value="${this._escAttr(subjectDefault)}">
                    </div>
                    <div class="email-dispatch-block">
                        <label for="email-dispatch-to">المستلمون</label>
                        <div class="email-dispatch-chips">${chipsHtml}</div>
                        <textarea id="email-dispatch-to" class="form-input w-full" rows="2" placeholder="email@company.com, ...">${this._esc(recipients.join(', '))}</textarea>
                    </div>
                    <div class="email-dispatch-block">
                        <label>معاينة المحتوى</label>
                        <div class="email-dispatch-preview">${fieldsPreview}</div>
                    </div>
                </div>
                <div class="email-dispatch-footer">
                    <button type="button" class="btn-secondary" data-close="1">إلغاء</button>
                    <button type="button" class="btn-primary email-dispatch-confirm-btn" id="email-dispatch-confirm">
                        <i class="fas fa-paper-plane ml-2"></i>إرسال الآن
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('is-open'));

        const closeModal = () => {
            modal.classList.remove('is-open');
            setTimeout(() => modal.remove(), 160);
        };
        modal.querySelectorAll('[data-close]').forEach((el) => {
            el.addEventListener('click', closeModal);
        });
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        const onKey = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', onKey);
            }
        };
        document.addEventListener('keydown', onKey);

        const toInput = modal.querySelector('#email-dispatch-to');
        const chipsEl = modal.querySelector('.email-dispatch-chips');
        const refreshChips = () => {
            const list = String(toInput?.value || '')
                .split(/[,;\s]+/)
                .map((s) => s.trim().toLowerCase())
                .filter((s) => s.includes('@'));
            if (!chipsEl) return;
            chipsEl.innerHTML = list.length
                ? list.map((email) => `<span class="email-dispatch-chip" dir="ltr">${this._esc(email)}</span>`).join('')
                : '<span class="email-dispatch-chip email-dispatch-chip-muted">أضف مستلمين بالأسفل</span>';
        };
        if (toInput) toInput.addEventListener('input', refreshChips);

        const confirmBtn = modal.querySelector('#email-dispatch-confirm');
        confirmBtn.addEventListener('click', async () => {
            const subject = modal.querySelector('#email-dispatch-subject')?.value?.trim() || subjectDefault;
            const toRaw = modal.querySelector('#email-dispatch-to')?.value || '';
            const to = toRaw.split(/[,;\s]+/).map((s) => s.trim().toLowerCase()).filter((s) => s.includes('@'));
            if (!to.length) {
                Notification.error('أدخل مستلماً واحداً على الأقل');
                return;
            }
            confirmBtn.disabled = true;
            const prev = confirmBtn.innerHTML;
            confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الإرسال...';
            try {
                const userData = AppState.currentUser || {};
                const result = await GoogleIntegration.sendToAppsScript('sendDirectEmail', {
                    moduleKey,
                    recordId: options.recordId || '',
                    subject,
                    title,
                    to,
                    fields,
                    htmlBody: htmlBody || undefined,
                    attachments: attachments.length ? attachments : undefined,
                    userData
                });
                if (result && result.success) {
                    Notification.success(result.message || 'تم الإرسال');
                    document.removeEventListener('keydown', onKey);
                    closeModal();
                } else {
                    Notification.error((result && result.message) || 'فشل الإرسال');
                    confirmBtn.disabled = false;
                    confirmBtn.innerHTML = prev;
                }
            } catch (err) {
                console.error(err);
                Notification.error('خطأ في الإرسال: ' + (err.message || err));
                confirmBtn.disabled = false;
                confirmBtn.innerHTML = prev;
            }
        });
    },

    _esc(v) {
        if (typeof Utils !== 'undefined' && Utils.escapeHTML) return Utils.escapeHTML(String(v == null ? '' : v));
        return String(v == null ? '' : v)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    _escAttr(v) {
        return this._esc(v).replace(/'/g, '&#39;');
    }
};

if (typeof window !== 'undefined') {
    window.EmailDispatch = EmailDispatch;
}
