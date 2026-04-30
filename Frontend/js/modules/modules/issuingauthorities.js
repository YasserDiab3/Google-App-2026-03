/**
 * Issuing Authorities Module
 * موديول إدارة الأشخاص المصرح لهم بالتوقيع على تصاريح العمل
 *
 * قيم الصلاحية:
 *   G = مصرح بالتوقيع في كل الحالات
 *   Y = مصرح بالتوقيع بعد التنسيق مع مدير السلامة (يُضاف شرط HSE)
 *   X = غير مصرح له بالتوقيع على هذا النوع
 */

const IssuingAuthorities = {
    _data: [],
    _loading: false,
    _activeCategory: 'employees',
    _contractorOptions: [],
    _employeesCache: null,
    _unsupportedActions: {
        employees: false,
        contractors: false
    },

    /** فلترة القائمة (مشابه لتبويب زيارات العيادة) */
    _listFilters: {
        search: '',
        factory: '',
        department: '',
        status: ''
    },
    _filterSearchTimer: null,

    _isActionUnknownMessage(message) {
        const msg = String(message || '').toLowerCase();
        return msg.includes('غير معترف') || msg.includes('not recognized') || msg.includes('unknown action');
    },

    _isNoisyExtensionError(message) {
        const msg = String(message || '').toLowerCase();
        return msg.includes('could not establish connection') || msg.includes('receiving end does not exist');
    },

    _classifyRequestError(message) {
        const msg = String(message || '').toLowerCase();
        if (msg.includes('403') || msg.includes('forbidden')) return 'forbidden';
        if (msg.includes('timeout') || msg.includes('مهلة') || msg.includes('timed out')) return 'timeout';
        if (this._isActionUnknownMessage(msg)) return 'unknown_action';
        if (msg.includes('cors') || msg.includes('access-control-allow-origin')) return 'cors';
        return 'generic';
    },

    _getFriendlyErrorMessage(rawMessage) {
        const kind = this._classifyRequestError(rawMessage);
        if (kind === 'forbidden') {
            return 'تعذر الاتصال بالخادم (403). تحقق من صلاحية نشر Web App (Who has access) وأن الرابط صحيح.';
        }
        if (kind === 'timeout') {
            return 'الخادم تأخر في الاستجابة. يرجى إعادة المحاولة أو التحقق من حالة Google Apps Script.';
        }
        if (kind === 'unknown_action') {
            return 'نسخة الخادم أقدم من الواجهة الحالية. يلزم إعادة نشر Web App بأحدث ملفات Backend.';
        }
        if (kind === 'cors') {
            return 'فشل الاتصال بسبب إعدادات CORS/الوصول في Web App. تأكد من إعدادات النشر.';
        }
        return 'تعذر تحميل البيانات من الخادم. يرجى إعادة المحاولة.';
    },

    _reportModuleError(contextLabel, rawError) {
        const rawMessage = String((rawError && rawError.message) || rawError || '');
        if (this._isNoisyExtensionError(rawMessage)) {
            // Ignore browser extension noise for this module only.
            return;
        }
        const friendly = this._getFriendlyErrorMessage(rawMessage);
        if (typeof Utils !== 'undefined' && Utils.showNotification) {
            Utils.showNotification(friendly, 'error');
        }
        if (typeof Utils !== 'undefined') {
            Utils.safeWarn(`${contextLabel}: ${friendly}`, rawMessage);
        }
    },

    _normalizeEmployeeCode(v) {
        let s = String(v || '').trim().toLowerCase();
        if (!s) return '';
        s = s
            .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
            .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
        s = s.replace(/\.0+$/g, '').replace(/[\s\-_\/\\]+/g, '');
        return s;
    },

    _findEmployeeLocal(query) {
        const list = Array.isArray(this._employeesCache)
            ? this._employeesCache
            : (Array.isArray(AppState?.appData?.employees) ? AppState.appData.employees : []);
        if (!list.length) return null;
        const normText = (v) => String(v || '').trim().toLowerCase();
        const targetCode = this._normalizeEmployeeCode(query);
        const targetText = normText(query);
        let emp = list.find((e) =>
            this._normalizeEmployeeCode(e.employeeNumber) === targetCode ||
            this._normalizeEmployeeCode(e.sapId) === targetCode ||
            this._normalizeEmployeeCode(e.id) === targetCode ||
            this._normalizeEmployeeCode(e.employeeCode) === targetCode
        );
        if (!emp && targetCode) {
            emp = list.find((e) => {
                const codes = [
                    this._normalizeEmployeeCode(e.employeeNumber),
                    this._normalizeEmployeeCode(e.sapId),
                    this._normalizeEmployeeCode(e.id),
                    this._normalizeEmployeeCode(e.employeeCode)
                ].filter(Boolean);
                return codes.some((c) => c.includes(targetCode) || targetCode.includes(c));
            });
        }
        if (!emp) emp = list.find((e) => normText(e.name) === targetText);
        if (!emp) emp = list.find((e) => normText(e.name).includes(targetText));
        return emp || null;
    },

    async _ensureEmployeesLoaded() {
        if (Array.isArray(this._employeesCache) && this._employeesCache.length > 0) return this._employeesCache;
        let local = Array.isArray(AppState?.appData?.employees) ? AppState.appData.employees : [];
        if (local.length > 0) {
            this._employeesCache = local;
            return local;
        }
        try {
            const res = await this._withTimeout(GoogleIntegration.sendRequest({
                action: 'readFromSheet',
                data: { sheetName: 'Employees' }
            }), 8000);
            if (res && res.success && Array.isArray(res.data)) {
                this._employeesCache = res.data;
                if (!AppState.appData) AppState.appData = {};
                AppState.appData.employees = res.data;
                return res.data;
            }
        } catch (_) {
            // ignore and return empty array below
        }
        this._employeesCache = [];
        return [];
    },

    _fillEmployeeFields(data) {
        if (document.getElementById('ia-f-employee-code')) document.getElementById('ia-f-employee-code').value = data.employeeCode || '';
        if (document.getElementById('ia-f-name')) document.getElementById('ia-f-name').value = data.name || '';
        if (document.getElementById('ia-f-dept')) document.getElementById('ia-f-dept').value = data.departmentName || '';
        if (document.getElementById('ia-f-job-title')) document.getElementById('ia-f-job-title').value = data.jobTitle || '';
        if (document.getElementById('ia-f-branch')) document.getElementById('ia-f-branch').value = data.branch || '';
        const factoryEl = document.getElementById('ia-f-factory');
        if (factoryEl) {
            const desiredFactory = String(data.factory || '').trim();
            if (desiredFactory && !Array.from(factoryEl.options || []).some(o => String(o.value || '').trim() === desiredFactory)) {
                const fallbackOpt = document.createElement('option');
                fallbackOpt.value = desiredFactory;
                fallbackOpt.textContent = desiredFactory;
                factoryEl.appendChild(fallbackOpt);
            }
            factoryEl.value = desiredFactory;
        }
        if (document.getElementById('ia-f-location')) document.getElementById('ia-f-location').value = data.location || '';
        this._refreshSublocationOptions(data.sublocation || '');
    },

    _getSiteOptions() {
        try {
            if (typeof Permissions !== 'undefined' && Permissions.formSettingsState && Array.isArray(Permissions.formSettingsState.sites)) {
                return Permissions.formSettingsState.sites.map(site => ({
                    id: String(site.id || site.siteId || '').trim(),
                    name: String(site.name || site.title || site.label || '').trim()
                })).filter(s => s.id && s.name);
            }
            if (Array.isArray(AppState?.appData?.observationSites) && AppState.appData.observationSites.length > 0) {
                return AppState.appData.observationSites.map(site => ({
                    id: String(site.id || site.siteId || '').trim(),
                    name: String(site.name || site.title || site.label || '').trim()
                })).filter(s => s.id && s.name);
            }
            if (typeof DailyObservations !== 'undefined' && Array.isArray(DailyObservations.DEFAULT_SITES)) {
                return DailyObservations.DEFAULT_SITES.map(site => ({
                    id: String(site.id || site.siteId || '').trim(),
                    name: String(site.name || site.title || site.label || '').trim()
                })).filter(s => s.id && s.name);
            }
        } catch (e) {
            if (typeof Utils !== 'undefined') Utils.safeWarn('IssuingAuthorities._getSiteOptions', e);
        }
        return [];
    },

    _getPlaceOptions(siteId) {
        try {
            const selectedSiteId = String(siteId || '').trim();
            if (!selectedSiteId) return [];

            const getPlaces = (site) => {
                const placesSource = Array.isArray(site?.places)
                    ? site.places
                    : Array.isArray(site?.locations)
                        ? site.locations
                        : Array.isArray(site?.children)
                            ? site.children
                            : Array.isArray(site?.areas)
                                ? site.areas
                                : [];
                return placesSource.map((p, idx) => ({
                    id: String(p.id || p.placeId || p.value || `PLACE_${idx + 1}`).trim(),
                    name: String(p.name || p.placeName || p.title || p.label || p.locationName || `مكان ${idx + 1}`).trim()
                })).filter(p => p.id && p.name);
            };

            if (typeof Permissions !== 'undefined' && Permissions.formSettingsState && Array.isArray(Permissions.formSettingsState.sites)) {
                const site = Permissions.formSettingsState.sites.find(s => String(s.id || s.siteId || '').trim() === selectedSiteId);
                if (site) return getPlaces(site);
            }
            if (Array.isArray(AppState?.appData?.observationSites)) {
                const site = AppState.appData.observationSites.find(s => String(s.id || s.siteId || '').trim() === selectedSiteId);
                if (site) return getPlaces(site);
            }
        } catch (e) {
            if (typeof Utils !== 'undefined') Utils.safeWarn('IssuingAuthorities._getPlaceOptions', e);
        }
        return [];
    },

    _renderFactoryOptions(selectedFactory) {
        const selected = String(selectedFactory || '').trim();
        const options = this._getSiteOptions();
        const esc = (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML : (s) => String(s == null ? '' : s);
        let html = '<option value="">-- اختر المصنع --</option>';
        html += options.map(site => `<option value="${esc(site.id)}" ${selected === site.id ? 'selected' : ''}>${esc(site.name)}</option>`).join('');
        if (selected && !options.some(site => site.id === selected)) {
            html += `<option value="${esc(selected)}" selected>${esc(selected)}</option>`;
        }
        return html;
    },

    _renderSublocationOptions(factoryId, selectedSublocation) {
        const selected = String(selectedSublocation || '').trim();
        const options = this._getPlaceOptions(factoryId);
        const esc = (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML : (s) => String(s == null ? '' : s);
        let html = '<option value="">-- اختر الموقع الفرعي --</option>';
        html += options.map(place => `<option value="${esc(place.id)}" ${selected === place.id ? 'selected' : ''}>${esc(place.name)}</option>`).join('');
        if (selected && !options.some(place => place.id === selected)) {
            html += `<option value="${esc(selected)}" selected>${esc(selected)}</option>`;
        }
        return html;
    },

    _refreshSublocationOptions(selectedSublocation = '') {
        const factoryEl = document.getElementById('ia-f-factory');
        const subEl = document.getElementById('ia-f-sublocation');
        if (!factoryEl || !subEl) return;
        subEl.innerHTML = this._renderSublocationOptions(factoryEl.value, selectedSublocation);
    },

    /**
     * نفس أسلوب نموذج تسجيل زيارة العيادة: استنساخ حقل الكود لإزالة أي معالجات قديمة ثم EmployeeHelper.setupEmployeeCodeSearch.
     */
    _installEmployeeCodeLookupLikeClinic() {
        const personType = (document.getElementById('ia-f-person-type')?.value || 'employee').toLowerCase();
        if (personType !== 'employee') return;
        if (typeof EmployeeHelper === 'undefined' || !EmployeeHelper.setupEmployeeCodeSearch) return;

        const codeInput = document.getElementById('ia-f-employee-code');
        if (!codeInput || !codeInput.parentNode) return;

        const freshInput = codeInput.cloneNode(true);
        codeInput.parentNode.replaceChild(freshInput, codeInput);

        EmployeeHelper.setupEmployeeCodeSearch('ia-f-employee-code', 'ia-f-name', (employee) => {
            if (!employee) return;
            this._fillEmployeeFields({
                employeeCode: String(employee.employeeNumber || employee.employeeCode || employee.sapId || employee.id || '').trim(),
                name: String(employee.name || '').trim(),
                departmentName: String(employee.department || employee.unit || employee.section || '').trim(),
                jobTitle: String(employee.position || employee.job || employee.jobTitle || '').trim(),
                branch: String(employee.branch || '').trim(),
                factory: String(employee.factoryId || employee.factory || employee.factoryName || '').trim(),
                location: String(employee.location || employee.locationName || employee.employeeLocation || '').trim(),
                sublocation: String(employee.sublocation || employee.subLocation || employee.subLocationName || '').trim()
            });
            if (Array.isArray(AppState?.appData?.employees)) {
                this._employeesCache = AppState.appData.employees;
            }
        }, {
            inlineAlertId: 'ia-form-alerts',
            employeeNotFoundWarn: 'enter'
        });
    },

    _bindModalFieldEvents() {
        document.getElementById('ia-lookup-employee-btn')?.addEventListener('click', () => {
            const inp = document.getElementById('ia-f-employee-code');
            if (!inp) return;
            inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
        });

        document.getElementById('ia-f-contractor-name')?.addEventListener('change', () => this._onContractorChanged());
        document.getElementById('ia-f-factory')?.addEventListener('change', () => this._refreshSublocationOptions(''));
        document.getElementById('ia-f-name')?.addEventListener('blur', () => {
            const personType = (document.getElementById('ia-f-person-type')?.value || 'employee').toLowerCase();
            const code = (document.getElementById('ia-f-employee-code')?.value || '').trim();
            const name = (document.getElementById('ia-f-name')?.value || '').trim();
            if (personType === 'employee' && !code && name) {
                this._lookupEmployeeByCode(name);
            }
        });

        this._installEmployeeCodeLookupLikeClinic();
    },

    _withTimeout(promise, timeoutMs = 7000) {
        return Promise.race([
            promise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeoutMs))
        ]);
    },

    _normalizeBoolean(value, defaultValue = false) {
        if (value === true || value === false) return value;
        if (typeof value === 'string') {
            const v = value.trim().toLowerCase();
            if (v === 'true') return true;
            if (v === 'false') return false;
        }
        return defaultValue;
    },

    _normalizeRow(row) {
        const normalized = { ...(row || {}) };
        normalized.id = String(normalized.id || '').trim();
        normalized.personType = String(normalized.personType || '').toLowerCase().trim() === 'contractor' ? 'contractor' : 'employee';
        normalized.employeeCode = String(normalized.employeeCode || '').trim();
        normalized.name = String(normalized.name || '').trim();
        normalized.departmentName = String(normalized.departmentName || '').trim();
        normalized.jobTitle = String(normalized.jobTitle || '').trim();
        normalized.branch = String(normalized.branch || '').trim();
        normalized.factory = String(normalized.factory || '').trim();
        normalized.location = String(normalized.location || '').trim();
        normalized.sublocation = String(normalized.sublocation || '').trim();
        normalized.email = String(normalized.email || '').trim();
        normalized.phone = String(normalized.phone || '').trim();
        normalized.notes = String(normalized.notes || '').trim();
        normalized.isActive = this._normalizeBoolean(normalized.isActive, true);
        this.PERMIT_TYPES.forEach(pt => {
            const value = String(normalized[pt.key] || 'X').toUpperCase().trim();
            normalized[pt.key] = ['G', 'Y', 'X'].includes(value) ? value : 'X';
        });
        return normalized;
    },

    async _fetchViaReadFromSheet() {
        try {
            const sheetName = this._activeCategory === 'contractors'
                ? 'PTWContractorIssuingAuthorities'
                : 'PTWIssuingAuthorities';
            const fallbackResult = await this._withTimeout(GoogleIntegration.sendRequest({
                action: 'readFromSheet',
                data: { sheetName }
            }), 7000);
            if (fallbackResult && fallbackResult.success) {
                const raw = Array.isArray(fallbackResult.data) ? fallbackResult.data : [];
                this._data = raw.map(r => this._normalizeRow(r)).filter(r => r.id || r.name);
                return true;
            }
        } catch (err) {
            // Keep silent here to avoid noisy console loops on legacy backends.
            // _fetchData() decides whether to show one final warning.
        }
        return false;
    },

    // أنواع التصاريح وتسمياتها (مطابق للنموذج الورقي)
    PERMIT_TYPES: [
        { key: 'coldWork',      labelAr: 'الأعمال الباردة',         labelEn: 'Cold Work' },
        { key: 'loto',          labelAr: 'عزل مصادر الطاقة',        labelEn: 'LOTO' },
        { key: 'hotWork',       labelAr: 'الأعمال الساخنة',         labelEn: 'Hot Work' },
        { key: 'workAtHeight',  labelAr: 'العمل على ارتفاعات',      labelEn: 'W@ H' },
        { key: 'confinedSpace', labelAr: 'دخول الأماكن المغلقة',    labelEn: 'Confined Space' },
        { key: 'excavation',    labelAr: 'الحفر',                   labelEn: 'Excavation' },
        { key: 'contractorPTW', labelAr: 'تصريح دخول مقاول',       labelEn: 'Contractor PTW' },
        { key: 'liftingPlan',   labelAr: 'خطة الرفع',              labelEn: 'Lifting plan' }
    ],

    PERMIT_VALUE_STYLES: {
        G: { label: 'G', class: 'ia-badge-g', title: 'مصرح بالتوقيع في كل الحالات' },
        Y: { label: 'Y', class: 'ia-badge-y', title: 'مصرح بالتوقيع بعد التنسيق مع مدير السلامة' },
        X: { label: 'X', class: 'ia-badge-x', title: 'غير مصرح له بالتوقيع' }
    },

    isAdmin() {
        if (typeof Permissions !== 'undefined' && Permissions.isCurrentUserEffectiveAdmin) {
            return Permissions.isCurrentUserEffectiveAdmin();
        }
        const user = AppState && AppState.currentUser;
        if (!user) return false;
        const role = String(user.role || '').toLowerCase();
        return role === 'admin' || role === 'administrator';
    },

    _categoryTitleAr() {
        return this._activeCategory === 'contractors' ? 'المقاولين' : 'الموظفين';
    },

    _actionsForCategory(category, personType) {
        const isContractorCategory = (category === 'contractors');
        const isContractorPerson = String(personType || '').toLowerCase().trim() === 'contractor';
        const useContractorDb = isContractorCategory || isContractorPerson;
        return useContractorDb
            ? {
                add: 'addContractorIssuingAuthority',
                update: 'updateContractorIssuingAuthority',
                remove: 'deleteContractorIssuingAuthority'
            }
            : {
                add: 'addIssuingAuthority',
                update: 'updateIssuingAuthority',
                remove: 'deleteIssuingAuthority'
            };
    },

    async load() {
        const section = document.getElementById('issuing-authorities-section');
        if (!section) return;

        await this._fetchContractorOptions();
        section.innerHTML = this._renderShell();
        this._injectStyles();

        await this._fetchData();
        this._renderTable();
        this._attachEvents();
    },

    async _fetchContractorOptions() {
        try {
            let rows = [];
            const primary = await this._withTimeout(GoogleIntegration.sendRequest({
                action: 'getAllApprovedContractors',
                data: { filters: {} }
            }), 7000);
            if (primary && primary.success && Array.isArray(primary.data)) {
                rows = primary.data;
            } else {
                const fallback = await this._withTimeout(GoogleIntegration.sendRequest({
                    action: 'readFromSheet',
                    data: { sheetName: 'ApprovedContractors' }
                }), 7000);
                if (fallback && fallback.success && Array.isArray(fallback.data)) {
                    rows = fallback.data;
                }
            }

            this._contractorOptions = (rows || [])
                .filter((c) => {
                    const status = String(c.status || '').toLowerCase().trim();
                    const active = String(c.isActive ?? '').toLowerCase().trim();
                    return (status === '' || status === 'approved') && active !== 'false' && active !== 'inactive';
                })
                .map((c) => ({
                    id: String(c.id || c.contractorId || c.code || '').trim(),
                    name: String(c.companyName || c.name || c.contractorName || '').trim()
                }))
                .filter((c) => c.name)
                .sort((a, b) => a.name.localeCompare(b.name, 'ar'));
        } catch (_) {
            this._contractorOptions = [];
        }
    },

    _iaNotify(message, type = 'info') {
        const msg = String(message || '');
        if (!msg) return;
        if (typeof Notification !== 'undefined') {
            if (type === 'success' && Notification.success) Notification.success(msg);
            else if (type === 'error' && Notification.error) Notification.error(msg);
            else if (type === 'warning' && Notification.warning) Notification.warning(msg);
            else if (Notification.info) Notification.info(msg);
            else if (Notification.success) Notification.success(msg);
            return;
        }
        if (typeof Utils !== 'undefined' && Utils.showNotification) {
            const t = type === 'error' ? 'error' : type === 'warning' ? 'warning' : type === 'success' ? 'success' : 'info';
            Utils.showNotification(msg, t);
        }
    },

    _collectFilterOptionLists() {
        const factories = [...new Set(this._data.map(r => String(r.factory || '').trim()).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b, 'ar'));
        const departments = [...new Set(this._data.map(r => String(r.departmentName || '').trim()).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b, 'ar'));
        return { factories, departments };
    },

    _getBaseRecordsForView() {
        const isAdmin = this.isAdmin();
        if (!isAdmin) return this._data.filter(r => r.isActive !== false);
        return this._data.slice();
    },

    _getFilteredRecords() {
        let list = this._getBaseRecordsForView();
        const f = this._listFilters;
        const st = String(f.status || '').trim();
        if (st === 'active') {
            list = list.filter(r => r.isActive !== false);
        } else if (st === 'inactive' && this.isAdmin()) {
            list = list.filter(r => r.isActive === false);
        }
        const fac = String(f.factory || '').trim();
        if (fac) list = list.filter(r => String(r.factory || '').trim() === fac);
        const dep = String(f.department || '').trim();
        if (dep) list = list.filter(r => String(r.departmentName || '').trim() === dep);
        const q = String(f.search || '').trim().toLowerCase();
        if (q) {
            list = list.filter((r) => {
                const hay = [
                    r.name, r.employeeCode, r.departmentName, r.jobTitle, r.branch, r.factory,
                    r.location, r.sublocation, r.email, r.phone, r.notes
                ].map(x => String(x || '').toLowerCase()).join(' ');
                return hay.includes(q);
            });
        }
        return list;
    },

    _readFiltersFromDom() {
        this._listFilters.search = (document.getElementById('ia-filter-search')?.value || '').trim();
        this._listFilters.factory = (document.getElementById('ia-filter-factory')?.value || '').trim();
        this._listFilters.department = (document.getElementById('ia-filter-department')?.value || '').trim();
        this._listFilters.status = (document.getElementById('ia-filter-status')?.value || '').trim();
    },

    _applyFiltersAndRender() {
        this._readFiltersFromDom();
        this._renderTable();
    },

    _syncFilterDropdowns() {
        const fac = document.getElementById('ia-filter-factory');
        const dep = document.getElementById('ia-filter-department');
        if (!fac || !dep) return;
        const { factories, departments } = this._collectFilterOptionLists();
        const esc = (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML : (s) => String(s == null ? '' : s);
        const curF = this._listFilters.factory;
        const curD = this._listFilters.department;
        fac.innerHTML = '<option value="">كل المصانع</option>' + factories.map(f =>
            `<option value="${esc(f)}" ${f === curF ? 'selected' : ''}>${esc(f)}</option>`
        ).join('');
        dep.innerHTML = '<option value="">كل الإدارات</option>' + departments.map(d =>
            `<option value="${esc(d)}" ${d === curD ? 'selected' : ''}>${esc(d)}</option>`
        ).join('');
    },

    _renderFiltersHtml() {
        const f = this._listFilters;
        const esc = (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML : (s) => String(s == null ? '' : s);
        const isAdmin = this.isAdmin();
        const { factories, departments } = this._collectFilterOptionLists();
        const statusOpts = `
            <option value="" ${!f.status ? 'selected' : ''}>الكل</option>
            <option value="active" ${f.status === 'active' ? 'selected' : ''}>نشط فقط</option>
            ${isAdmin ? `<option value="inactive" ${f.status === 'inactive' ? 'selected' : ''}>غير نشط فقط</option>` : ''}`;
        const factoryOpts = '<option value="">كل المصانع</option>' + factories.map(v =>
            `<option value="${esc(v)}" ${v === f.factory ? 'selected' : ''}>${esc(v)}</option>`
        ).join('');
        const deptOpts = '<option value="">كل الإدارات</option>' + departments.map(v =>
            `<option value="${esc(v)}" ${v === f.department ? 'selected' : ''}>${esc(v)}</option>`
        ).join('');
        return `
        <div class="ia-filters-row" style="background:linear-gradient(135deg,#f8f9fa 0%,#e9ecef 100%);padding:16px 20px;border-radius:10px;border:1px solid #dee2e6;">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;align-items:end;">
                <div>
                    <label for="ia-filter-search" class="form-label" style="font-size:0.8rem;margin-bottom:4px;display:block;color:#334155;">
                        <i class="fas fa-search" style="margin-left:6px;"></i>بحث
                    </label>
                    <input type="text" id="ia-filter-search" class="form-input" placeholder="اسم، كود، إدارة، مصنع، موقع…" value="${esc(f.search)}" dir="rtl" style="width:100%;min-height:42px;">
                </div>
                <div>
                    <label for="ia-filter-factory" class="form-label" style="font-size:0.8rem;margin-bottom:4px;display:block;color:#334155;">
                        <i class="fas fa-industry" style="margin-left:6px;"></i>المصنع
                    </label>
                    <select id="ia-filter-factory" class="form-select" style="width:100%;min-height:42px;">${factoryOpts}</select>
                </div>
                <div>
                    <label for="ia-filter-department" class="form-label" style="font-size:0.8rem;margin-bottom:4px;display:block;color:#334155;">
                        <i class="fas fa-building" style="margin-left:6px;"></i>الإدارة
                    </label>
                    <select id="ia-filter-department" class="form-select" style="width:100%;min-height:42px;">${deptOpts}</select>
                </div>
                <div>
                    <label for="ia-filter-status" class="form-label" style="font-size:0.8rem;margin-bottom:4px;display:block;color:#334155;">
                        <i class="fas fa-toggle-on" style="margin-left:6px;"></i>حالة السجل
                    </label>
                    <select id="ia-filter-status" class="form-select" style="width:100%;min-height:42px;">${statusOpts}</select>
                </div>
                <div style="display:flex;align-items:flex-end;gap:8px;">
                    <button type="button" id="ia-filter-reset" class="btn-secondary" style="min-height:42px;white-space:nowrap;">
                        <i class="fas fa-undo" style="margin-left:6px;"></i>مسح الفلاتر
                    </button>
                </div>
            </div>
        </div>`;
    },

    _buildExportTableRowsHtml(records, { escapeForHtml = true } = {}) {
        const esc = escapeForHtml && typeof Utils !== 'undefined' && Utils.escapeHTML
            ? Utils.escapeHTML
            : (s) => String(s == null ? '' : s);
        return records.map((rec, idx) => {
            const permitCells = this.PERMIT_TYPES.map(pt => {
                const v = String(rec[pt.key] || 'X').toUpperCase().trim();
                return `<td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${esc(v)}</td>`;
            }).join('');
            const activeTxt = rec.isActive === false ? 'غير نشط' : 'نشط';
            return `
            <tr>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${idx + 1}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${esc(rec.name || '')}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${esc(rec.employeeCode || '')}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${esc(rec.departmentName || '')}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${esc(rec.jobTitle || '')}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${esc(rec.branch || '')}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${esc(rec.factory || '')}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${esc(rec.location || '')}</td>
                <td style="border:1px solid #d1d5db;padding:6px;text-align:right;">${esc(rec.sublocation || '')}</td>
                ${permitCells}
                <td style="border:1px solid #d1d5db;padding:6px;text-align:center;">${esc(activeTxt)}</td>
            </tr>`;
        }).join('');
    },

    _buildExportTableHtml(records) {
        const permitHeaders = this.PERMIT_TYPES.map(pt =>
            `<th style="border:1px solid #d1d5db;padding:8px;text-align:center;font-size:10px;">${pt.labelAr}<br><span style="color:#6b7280;font-weight:500;">${pt.labelEn}</span></th>`
        ).join('');
        const rows = this._buildExportTableRowsHtml(records, { escapeForHtml: true });
        const title = `الأشخاص المصرح لهم — ${this._categoryTitleAr()}`;
        const subtitle = `عدد السجلات: ${records.length} — ${new Date().toLocaleString('ar-SA')}`;
        return `
        <div style="margin-bottom:16px;text-align:center;">
            <h2 style="margin:0 0 8px;color:#1f2937;font-size:18px;">${title}</h2>
            <p style="margin:0;color:#6b7280;font-size:13px;">${subtitle}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:11px;direction:rtl;">
            <thead>
                <tr style="background:#f3f4f6;">
                    <th style="border:1px solid #d1d5db;padding:8px;">م</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">الاسم</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">الكود</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">الإدارة</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">الوظيفة</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">الفرع</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">المصنع</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">الموقع</th>
                    <th style="border:1px solid #d1d5db;padding:8px;">الموقع الفرعي</th>
                    ${permitHeaders}
                    <th style="border:1px solid #d1d5db;padding:8px;">الحالة</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>`;
    },

    printFilteredList() {
        const records = this._getFilteredRecords();
        if (!records.length) {
            this._iaNotify('لا توجد بيانات مطابقة للفلتر للطباعة', 'warning');
            return;
        }
        const inner = this._buildExportTableHtml(records);
        const w = window.open('', '_blank');
        if (!w) {
            this._iaNotify('يرجى السماح بالنوافذ المنبثقة للطباعة', 'error');
            return;
        }
        w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>طباعة المصرح لهم</title></head><body style="padding:16px;font-family:Segoe UI,Tahoma,sans-serif;">${inner}</body></html>`);
        w.document.close();
        w.onload = () => {
            setTimeout(() => {
                try { w.print(); } catch (e) { /* ignore */ }
                this._iaNotify('تم فتح نافذة الطباعة', 'success');
            }, 200);
        };
    },

    exportListToExcel() {
        const records = this._getFilteredRecords();
        if (!records.length) {
            this._iaNotify('لا توجد بيانات مطابقة للفلتر للتصدير', 'warning');
            return;
        }
        if (typeof XLSX === 'undefined') {
            this._iaNotify('مكتبة Excel غير متوفرة في الصفحة', 'error');
            return;
        }
        try {
            const rows = records.map((rec) => {
                const row = {
                    'الاسم': rec.name || '',
                    'الكود الوظيفي': rec.employeeCode || '',
                    'الإدارة': rec.departmentName || '',
                    'الوظيفة': rec.jobTitle || '',
                    'الفرع': rec.branch || '',
                    'المصنع': rec.factory || '',
                    'الموقع': rec.location || '',
                    'الموقع الفرعي': rec.sublocation || '',
                    'الحالة': rec.isActive === false ? 'غير نشط' : 'نشط'
                };
                this.PERMIT_TYPES.forEach((pt) => {
                    row[`تصريح: ${pt.labelAr}`] = String(rec[pt.key] || 'X').toUpperCase();
                });
                return row;
            });
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(rows);
            XLSX.utils.book_append_sheet(workbook, worksheet, `مصرح_${this._activeCategory === 'contractors' ? 'مقاولين' : 'موظفين'}`);
            const fileName = `IssuingAuthorities_${this._activeCategory}_${new Date().toISOString().slice(0, 10)}.xlsx`;
            XLSX.writeFile(workbook, fileName);
            this._iaNotify('تم تصدير Excel بنجاح', 'success');
        } catch (err) {
            if (typeof Utils !== 'undefined') Utils.safeWarn('IssuingAuthorities.exportListToExcel', err);
            this._iaNotify('فشل تصدير Excel', 'error');
        }
    },

    exportListToPDF() {
        const records = this._getFilteredRecords();
        if (!records.length) {
            this._iaNotify('لا توجد بيانات مطابقة للفلتر للتصدير', 'warning');
            return;
        }
        let url = null;
        try {
            const content = this._buildExportTableHtml(records);
            const formCode = `IA-LIST-${new Date().toISOString().slice(0, 10)}`;
            const formTitle = 'الأشخاص المصرح لهم بتصاريح العمل';
            const htmlContent = typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML
                ? FormHeader.generatePDFHTML(formCode, formTitle, content, false, true, { source: 'IssuingAuthorities' }, new Date().toISOString(), new Date().toISOString())
                : `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${formTitle}</title></head><body style="padding:16px;">${content}</body></html>`;
            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            url = URL.createObjectURL(blob);
            const printWindow = window.open(url, '_blank');
            if (printWindow) {
                printWindow.onload = () => {
                    setTimeout(() => {
                        printWindow.print();
                        setTimeout(() => { if (url) URL.revokeObjectURL(url); }, 1000);
                        this._iaNotify('تم تحضير PDF / الطباعة', 'success');
                    }, 250);
                };
            } else {
                if (url) URL.revokeObjectURL(url);
                this._iaNotify('يرجى السماح بالنوافذ المنبثقة', 'error');
            }
        } catch (err) {
            if (url) try { URL.revokeObjectURL(url); } catch (e) { /* ignore */ }
            if (typeof Utils !== 'undefined') Utils.safeWarn('IssuingAuthorities.exportListToPDF', err);
            this._iaNotify('فشل تصدير PDF', 'error');
        }
    },

    _bindListFilterEvents() {
        const onChange = () => this._applyFiltersAndRender();
        document.getElementById('ia-filter-factory')?.addEventListener('change', onChange);
        document.getElementById('ia-filter-department')?.addEventListener('change', onChange);
        document.getElementById('ia-filter-status')?.addEventListener('change', onChange);
        const searchEl = document.getElementById('ia-filter-search');
        if (searchEl) {
            searchEl.addEventListener('input', () => {
                if (this._filterSearchTimer) clearTimeout(this._filterSearchTimer);
                this._filterSearchTimer = setTimeout(() => this._applyFiltersAndRender(), 320);
            });
        }
        document.getElementById('ia-filter-reset')?.addEventListener('click', () => {
            this._listFilters = { search: '', factory: '', department: '', status: '' };
            const s = document.getElementById('ia-filter-search');
            if (s) s.value = '';
            const ff = document.getElementById('ia-filter-factory');
            if (ff) ff.value = '';
            const dd = document.getElementById('ia-filter-department');
            if (dd) dd.value = '';
            const st = document.getElementById('ia-filter-status');
            if (st) st.value = '';
            this._applyFiltersAndRender();
            this._syncFilterDropdowns();
        });
        document.getElementById('ia-print-btn')?.addEventListener('click', () => this.printFilteredList());
        document.getElementById('ia-export-excel-btn')?.addEventListener('click', () => this.exportListToExcel());
        document.getElementById('ia-export-pdf-btn')?.addEventListener('click', () => this.exportListToPDF());
    },

    _renderShell() {
        const isAdmin = this.isAdmin();
        return `
        <div class="ia-module" id="ia-module-root">
            <div class="content-card">
                <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
                    <div>
                        <h2 class="card-title" style="margin:0;">
                            <i class="fas fa-user-check" style="margin-left:8px;color:#2563eb;"></i>
                            قائمة الأشخاص المصرح لهم بالتوقيع على تصاريح العمل
                        </h2>
                        <p class="card-subtitle" style="margin:4px 0 0;color:#64748b;font-size:0.85rem;">
                            Issuing Authorities for Work Permits - ${this._categoryTitleAr()}
                        </p>
                    </div>
                    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                        ${isAdmin ? `
                        <button class="btn-primary" id="ia-add-btn" style="gap:6px;">
                            <i class="fas fa-plus"></i>
                            <span>إضافة شخص</span>
                        </button>` : ''}
                        <button type="button" class="btn-secondary" id="ia-print-btn" style="gap:6px;" title="طباعة القائمة المفلترة">
                            <i class="fas fa-print"></i>
                            <span>طباعة</span>
                        </button>
                        <button type="button" class="btn-success" id="ia-export-excel-btn" style="gap:6px;" title="تصدير Excel للقائمة المفلترة">
                            <i class="fas fa-file-excel"></i>
                            <span>Excel</span>
                        </button>
                        <button type="button" class="btn-secondary" id="ia-export-pdf-btn" style="gap:6px;" title="تصدير / طباعة PDF">
                            <i class="fas fa-file-pdf"></i>
                            <span>PDF</span>
                        </button>
                        <button class="btn-secondary" id="ia-refresh-btn" style="gap:6px;">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>

                <div style="padding:0 16px 10px;">
                    <div class="ia-category-tabs">
                        <button type="button" class="ia-tab-btn ${this._activeCategory === 'employees' ? 'active' : ''}" data-category="employees">الموظفين</button>
                        <button type="button" class="ia-tab-btn ${this._activeCategory === 'contractors' ? 'active' : ''}" data-category="contractors">المقاولين</button>
                    </div>
                </div>

                <!-- شرح مفتاح الجدول -->
                <div class="ia-legend" style="margin:0 16px 12px;padding:10px 14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">
                    <strong style="font-size:0.82rem;color:#475569;">مفتاح الجدول:</strong>
                    <span class="ia-badge-g" style="margin-right:10px;">G</span>
                    <span style="font-size:0.82rem;color:#166534;margin-left:4px;">التوقيع في كل الحالات</span>
                    <span class="ia-badge-y" style="margin-right:14px;">Y</span>
                    <span style="font-size:0.82rem;color:#854d0e;margin-left:4px;">التوقيع بعد التنسيق مع مدير السلامة والصحة المهنية</span>
                    <span class="ia-badge-x" style="margin-right:14px;">X</span>
                    <span style="font-size:0.82rem;color:#991b1b;margin-left:4px;">غير مصرح له بالتوقيع</span>
                </div>

                <div id="ia-filters-wrap" style="margin:0 16px 12px;">
                    ${this._renderFiltersHtml()}
                </div>
                <p id="ia-filter-count" style="margin:0 16px 8px;font-size:0.82rem;color:#64748b;display:none;"></p>

                <div class="card-body" style="padding:0 0 16px;">
                    <div id="ia-table-wrapper" style="overflow-x:auto;">
                        <div id="ia-loading" style="text-align:center;padding:40px;">
                            <i class="fas fa-spinner fa-spin" style="font-size:1.8rem;color:#2563eb;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal إضافة/تعديل -->
        <div id="ia-modal-overlay" class="modal-overlay" style="display:none;" role="dialog" aria-modal="true" aria-labelledby="ia-modal-title">
            <div class="modal-container ia-modal-container" style="max-width:900px;width:95%;">
                <div class="modal-header">
                    <h3 id="ia-modal-title" class="modal-title">إضافة شخص مصرح له</h3>
                    <button class="modal-close" id="ia-modal-close" aria-label="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body ia-modal-body" id="ia-modal-body">
                    ${this._renderForm()}
                </div>
                <div class="modal-footer ia-modal-footer">
                    <button class="btn-secondary" id="ia-modal-cancel">إلغاء</button>
                    <button class="btn-primary" id="ia-modal-save">
                        <i class="fas fa-save" style="margin-left:6px;"></i>حفظ
                    </button>
                </div>
            </div>
        </div>

        <!-- Confirm Delete Modal -->
        <div id="ia-delete-modal" class="modal-overlay" style="display:none;">
            <div class="modal-container" style="max-width:420px;width:90%;">
                <div class="modal-header">
                    <h3 class="modal-title" style="color:#dc2626;">
                        <i class="fas fa-exclamation-triangle" style="margin-left:8px;"></i>
                        تأكيد الحذف
                    </h3>
                </div>
                <div class="modal-body">
                    <p id="ia-delete-msg" style="color:#374151;"></p>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" id="ia-delete-cancel">إلغاء</button>
                    <button class="btn-danger" id="ia-delete-confirm">
                        <i class="fas fa-trash" style="margin-left:6px;"></i>حذف
                    </button>
                </div>
            </div>
        </div>
        `;
    },

    _renderForm(record) {
        const val = (key) => record ? (record[key] || '') : '';
        const pv  = (key) => record ? (String(record[key] || 'X').toUpperCase()) : 'X';
        const personType = String(val('personType') || (this._activeCategory === 'contractors' ? 'contractor' : 'employee')).toLowerCase() === 'contractor'
            ? 'contractor'
            : 'employee';
        const contractorName = String(val('name') || '').trim();
        const contractorOptionsHtml = (this._contractorOptions || []).map(c => `
            <option value="${c.name}" ${contractorName === c.name ? 'selected' : ''}>${c.name}</option>
        `).join('');

        const permitRows = this.PERMIT_TYPES.map(pt => `
            <div class="ia-permit-row">
                <label class="ia-permit-label">
                    <span>${pt.labelAr}</span>
                    <span class="ia-permit-label-en">${pt.labelEn}</span>
                </label>
                <div class="ia-radio-group">
                    ${['G', 'Y', 'X'].map(v => `
                        <label class="ia-radio-label ia-radio-${v.toLowerCase()} ${pv(pt.key) === v ? 'is-selected' : ''}">
                            <input type="radio" name="permit_${pt.key}" value="${v}" ${pv(pt.key) === v ? 'checked' : ''} style="display:none;">
                            ${v}
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');

        return `
        <div class="ia-form ia-form-grid">
            <div id="ia-form-alerts" class="ia-form-alerts" style="display:none;margin-bottom:10px;"></div>
            <section class="ia-form-section">
                <h4 class="ia-form-section-title">بيانات الشخص</h4>
                <div class="ia-person-mode-hint" id="ia-person-mode-hint">
                    ${personType === 'employee'
                        ? 'وضع الموظف: أدخل الكود الوظيفي ثم اضغط "بحث" لملء البيانات تلقائياً.'
                        : 'وضع المقاول: أدخل البيانات يدويًا.'}
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">نوع الشخص <span style="color:red;">*</span></label>
                    <select id="ia-f-person-type" class="form-select ia-form-select">
                        <option value="employee" ${personType === 'employee' ? 'selected' : ''}>موظف</option>
                        <option value="contractor" ${personType === 'contractor' ? 'selected' : ''}>مقاول</option>
                    </select>
                </div>
                <div class="form-group ia-contractor-wrap" id="ia-contractor-wrap" style="${personType === 'contractor' ? '' : 'display:none;'}">
                    <label class="form-label">المقاول <span style="color:red;">*</span></label>
                    <select id="ia-f-contractor-name" class="form-select ia-form-select">
                        <option value="">-- اختر المقاول --</option>
                        ${contractorOptionsHtml}
                    </select>
                </div>
                <div class="form-group ia-employee-code-wrap" id="ia-employee-code-wrap" style="${personType === 'employee' ? '' : 'display:none;'}">
                    <label class="form-label">الكود الوظيفي <span style="color:red;">*</span></label>
                    <div class="ia-employee-lookup-row">
                        <input type="text" id="ia-f-employee-code" class="form-input" value="${val('employeeCode')}" placeholder="أدخل الكود الوظيفي">
                        <button type="button" class="btn-secondary ia-lookup-btn" id="ia-lookup-employee-btn">بحث</button>
                    </div>
                </div>
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">الاسم <span style="color:red;">*</span></label>
                    <input type="text" id="ia-f-name" class="form-input" value="${val('name')}" placeholder="اسم الشخص المصرح له" required>
                </div>
                <div class="form-group">
                    <label class="form-label">الإدارة / القسم</label>
                    <input type="text" id="ia-f-dept" class="form-input" value="${val('departmentName')}" placeholder="اسم الإدارة">
                </div>
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">الوظيفة</label>
                    <input type="text" id="ia-f-job-title" class="form-input" value="${val('jobTitle')}" placeholder="المسمى الوظيفي">
                </div>
                <div class="form-group">
                    <label class="form-label">الفرع / Branch</label>
                    <input type="text" id="ia-f-branch" class="form-input" value="${val('branch') || ''}" placeholder="اسم الفرع">
                </div>
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">الموقع</label>
                    <input type="text" id="ia-f-location" class="form-input" value="${val('location')}" placeholder="الموقع">
                </div>
                <div class="form-group">
                    <label class="form-label">المصنع</label>
                    <select id="ia-f-factory" class="form-select ia-form-select">
                        ${this._renderFactoryOptions(val('factoryId') || val('factory'))}
                    </select>
                </div>
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">الموقع الفرعي</label>
                    <select id="ia-f-sublocation" class="form-select ia-form-select">
                        ${this._renderSublocationOptions(val('factoryId') || val('factory'), val('sublocationId') || val('sublocation'))}
                    </select>
                </div>
                <div class="form-group"></div>
                </div>
                <div class="ia-form-two-cols">
                <div class="form-group">
                    <label class="form-label">البريد الإلكتروني</label>
                    <input type="email" id="ia-f-email" class="form-input" value="${val('email')}" placeholder="example@company.com" dir="ltr">
                </div>
                <div class="form-group">
                    <label class="form-label">رقم الهاتف</label>
                    <input type="text" id="ia-f-phone" class="form-input" value="${val('phone')}" placeholder="01xxxxxxxxx" dir="ltr">
                </div>
                </div>
            </section>

            <section class="ia-form-section">
                <h4 class="ia-form-section-title">
                    صلاحيات التوقيع على أنواع التصاريح
                    <span class="ia-form-section-subtitle">اختر G أو Y أو X لكل نوع تصريح</span>
                </h4>
                <div class="ia-legend-inline">
                    <span class="ia-badge-g">G</span><span>توقيع مباشر في كل الحالات</span>
                    <span class="ia-badge-y">Y</span><span>توقيع بعد التنسيق مع HSE</span>
                    <span class="ia-badge-x">X</span><span>غير مصرح بالتوقيع</span>
                </div>
                <div class="ia-permits-card">
                    ${permitRows}
                </div>
            </section>

            <section class="ia-form-section">
                <h4 class="ia-form-section-title">إعدادات السجل</h4>
                <div class="ia-form-two-cols ia-settings-row">
                    <div class="form-group">
                        <label class="form-label">ملاحظات</label>
                        <input type="text" id="ia-f-notes" class="form-input" value="${val('notes')}" placeholder="ملاحظات اختيارية">
                    </div>
                    <div class="form-group ia-active-group">
                        <input type="checkbox" id="ia-f-active" ${!record || record.isActive !== false ? 'checked' : ''} style="width:16px;height:16px;cursor:pointer;">
                        <label for="ia-f-active">نشط (مفعّل في قائمة المرشحين)</label>
                    </div>
                </div>
            </section>
        </div>
        `;
    },

    async _fetchData() {
        this._loading = true;
        try {
            const categoryKey = this._activeCategory === 'contractors' ? 'contractors' : 'employees';
            const getAction = this._activeCategory === 'contractors'
                ? 'getAllContractorIssuingAuthorities'
                : 'getAllIssuingAuthorities';
            let ok = false;

            // Fast path: direct sheet read avoids delays/noise on legacy deployments.
            ok = await this._fetchViaReadFromSheet();

            // If this endpoint already proved it doesn't support this action, skip noisy RPC and go straight to fallback.
            if (!ok && !this._unsupportedActions[categoryKey]) {
                try {
                    const result = await this._withTimeout(
                        GoogleIntegration.sendRequest({ action: getAction, data: {} }),
                        4500
                    );
                    if (result && result.success) {
                        const raw = Array.isArray(result.data) ? result.data : [];
                        this._data = raw.map(r => this._normalizeRow(r)).filter(r => r.id || r.name);
                        ok = true;
                    }
                } catch (rpcErr) {
                    const msg = String((rpcErr && rpcErr.message) || '');
                    if (this._isActionUnknownMessage(msg)) {
                        this._unsupportedActions[categoryKey] = true;
                    } else if (typeof Utils !== 'undefined') {
                        Utils.safeWarn(`تعذر تنفيذ ${getAction} وسيتم التحويل إلى fallback`, msg);
                    }
                }
            }
            if (!ok) {
                this._data = [];
                if (typeof Utils !== 'undefined') Utils.safeWarn('تحذير: فشل تحميل بيانات Issuing Authorities');
            }
        } catch (err) {
            this._data = [];
            this._reportModuleError('IssuingAuthorities._fetchData', err);
        }
        this._loading = false;
    },

    _renderTable() {
        const wrapper = document.getElementById('ia-table-wrapper');
        if (!wrapper) return;

        if (this._loading) {
            wrapper.innerHTML = `<div style="text-align:center;padding:40px;"><i class="fas fa-spinner fa-spin" style="font-size:1.8rem;color:#2563eb;"></i></div>`;
            return;
        }

        const isAdmin = this.isAdmin();
        const baseCount = this._getBaseRecordsForView().length;
        const records = this._getFilteredRecords();

        const countEl = document.getElementById('ia-filter-count');
        if (countEl) {
            const fActive = !!(this._listFilters.search || this._listFilters.factory || this._listFilters.department || this._listFilters.status);
            if (this._data.length && fActive) {
                countEl.style.display = 'block';
                countEl.textContent = `عرض ${records.length} من أصل ${baseCount} سجلًا (بعد تطبيق الفلتر).`;
            } else {
                countEl.style.display = 'none';
            }
        }

        if (records.length === 0) {
            const hasAnyData = this._getBaseRecordsForView().length > 0;
            wrapper.innerHTML = `
                <div class="empty-state" style="padding:48px 24px;">
                    <i class="fas fa-user-check" style="font-size:2.5rem;color:#cbd5e1;margin-bottom:12px;"></i>
                    <h3 style="color:#64748b;margin-bottom:6px;">${hasAnyData ? 'لا توجد نتائج مطابقة للفلتر' : 'لا يوجد سجلات بعد'}</h3>
                    <p style="color:#94a3b8;font-size:0.88rem;">
                        ${hasAnyData ? 'جرّب تعديل البحث أو الفلاتر أعلاه.' : (isAdmin ? `انقر على "إضافة شخص" لإضافة أول سجل في قائمة ${this._categoryTitleAr()}.` : `لم تتم إضافة سجلات ${this._categoryTitleAr()} بعد.`)}
                    </p>
                </div>`;
            this._syncFilterDropdowns();
            return;
        }

        const headerCells = this.PERMIT_TYPES.map(pt => `
            <th style="text-align:center;white-space:nowrap;padding:8px 6px;font-size:0.8rem;">
                <div style="font-weight:700;color:#1e40af;">${pt.labelEn}</div>
                <div style="font-weight:400;color:#64748b;font-size:0.72rem;">${pt.labelAr}</div>
            </th>
        `).join('');

        const bodyRows = records.map((rec, idx) => {
            const permitCells = this.PERMIT_TYPES.map(pt => {
                const v = String(rec[pt.key] || 'X').toUpperCase().trim();
                const style = this.PERMIT_VALUE_STYLES[v] || this.PERMIT_VALUE_STYLES.X;
                return `<td style="text-align:center;"><span class="${style.class}" title="${style.title}">${v}</span></td>`;
            }).join('');

            const activeIndicator = rec.isActive === false
                ? '<span style="color:#ef4444;font-size:0.75rem;">(غير نشط)</span>'
                : '';

            const actionBtns = isAdmin ? `
                <button class="ia-btn-edit" data-id="${rec.id}" title="تعديل" style="padding:4px 8px;border:none;background:none;cursor:pointer;color:#2563eb;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="ia-btn-delete" data-id="${rec.id}" data-name="${rec.name || ''}" title="حذف" style="padding:4px 8px;border:none;background:none;cursor:pointer;color:#dc2626;">
                    <i class="fas fa-trash"></i>
                </button>` : '';

            return `
            <tr style="border-bottom:1px solid #f1f5f9;${rec.isActive === false ? 'opacity:0.55;' : ''}">
                <td style="text-align:center;color:#64748b;font-size:0.85rem;padding:8px 6px;">${idx + 1}</td>
                <td style="padding:8px 10px;">
                    <div style="font-weight:600;color:#1e293b;">${rec.name || ''}</div>
                    <div style="font-size:0.78rem;color:#64748b;">${rec.departmentName || ''} ${activeIndicator}</div>
                    <div style="font-size:0.75rem;color:#94a3b8;">${[rec.jobTitle, rec.factory, rec.location, rec.sublocation].filter(Boolean).join(' - ')}</div>
                </td>
                ${permitCells}
                ${isAdmin ? `<td style="text-align:center;white-space:nowrap;">${actionBtns}</td>` : ''}
            </tr>`;
        }).join('');

        const actionHeader = isAdmin ? '<th style="text-align:center;padding:8px 6px;">إجراءات</th>' : '';

        wrapper.innerHTML = `
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
                <tr style="background:#eff6ff;border-bottom:2px solid #bfdbfe;">
                    <th style="text-align:center;padding:8px 6px;color:#1e40af;width:40px;">م</th>
                    <th style="text-align:right;padding:8px 12px;color:#1e40af;min-width:160px;">اسم الشخص المصرح له</th>
                    ${headerCells}
                    ${actionHeader}
                </tr>
            </thead>
            <tbody id="ia-tbody">
                ${bodyRows}
            </tbody>
        </table>`;
        this._syncFilterDropdowns();
    },

    _attachEvents() {
        const root = document.getElementById('ia-module-root');
        if (!root) return;

        // زر إضافة
        const addBtn = document.getElementById('ia-add-btn');
        if (addBtn) addBtn.addEventListener('click', () => this._openModal());

        // زر تحديث
        const refreshBtn = document.getElementById('ia-refresh-btn');
        if (refreshBtn) refreshBtn.addEventListener('click', async () => {
            this._readFiltersFromDom();
            await this._fetchData();
            this._renderTable();
        });

        root.querySelectorAll('.ia-tab-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const nextCategory = btn.getAttribute('data-category') || 'employees';
                if (nextCategory === this._activeCategory) return;
                this._activeCategory = nextCategory;
                this._listFilters = { search: '', factory: '', department: '', status: '' };
                const section = document.getElementById('issuing-authorities-section');
                if (!section) return;
                section.innerHTML = this._renderShell();
                await this._fetchData();
                this._renderTable();
                this._attachEvents();
            });
        });

        // أزرار تعديل وحذف (event delegation)
        document.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.ia-btn-edit');
            if (editBtn) {
                const id = editBtn.getAttribute('data-id');
                const rec = this._data.find(r => r.id === id);
                if (rec) this._openModal(rec);
                return;
            }
            const deleteBtn = e.target.closest('.ia-btn-delete');
            if (deleteBtn) {
                const id = deleteBtn.getAttribute('data-id');
                const name = deleteBtn.getAttribute('data-name');
                this._confirmDelete(id, name);
            }
        });

        // Modal controls
        const modalOverlay = document.getElementById('ia-modal-overlay');
        document.getElementById('ia-modal-close')?.addEventListener('click', () => this._closeModal());
        document.getElementById('ia-modal-cancel')?.addEventListener('click', () => this._closeModal());
        document.getElementById('ia-modal-save')?.addEventListener('click', () => this._saveModal());

        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) this._closeModal();
            });
        }

        // Radio visual feedback
        document.addEventListener('change', (e) => {
            if (e.target.type === 'radio' && e.target.name && e.target.name.startsWith('permit_')) {
                const group = document.querySelectorAll(`input[name="${e.target.name}"]`);
                group.forEach(radio => {
                    const lbl = radio.closest('label.ia-radio-label');
                    if (lbl) {
                        lbl.classList.toggle('is-selected', !!radio.checked);
                    }
                });
            }
            if (e.target.id === 'ia-f-person-type') {
                this._togglePersonTypeInputs();
            }
        });

        // Delete modal
        document.getElementById('ia-delete-cancel')?.addEventListener('click', () => {
            const m = document.getElementById('ia-delete-modal');
            if (m) m.style.display = 'none';
        });

        this._bindModalFieldEvents();
        this._bindListFilterEvents();
    },

    _togglePersonTypeInputs() {
        const type = (document.getElementById('ia-f-person-type')?.value || 'employee').toLowerCase();
        const codeWrap = document.getElementById('ia-employee-code-wrap');
        const contractorWrap = document.getElementById('ia-contractor-wrap');
        if (codeWrap) codeWrap.style.display = type === 'employee' ? '' : 'none';
        if (contractorWrap) contractorWrap.style.display = type === 'contractor' ? '' : 'none';
        const hint = document.getElementById('ia-person-mode-hint');
        if (hint) {
            hint.textContent = type === 'employee'
                ? 'وضع الموظف: أدخل الكود الوظيفي ثم اضغط "بحث" لملء البيانات تلقائياً.'
                : 'وضع المقاول: أدخل البيانات يدويًا.';
        }
        const autoFields = ['ia-f-name', 'ia-f-dept', 'ia-f-job-title', 'ia-f-branch'];
        autoFields.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (type === 'employee') {
                el.removeAttribute('readonly');
            } else {
                el.removeAttribute('readonly');
            }
        });
        if (type === 'contractor') this._onContractorChanged();
        if (type === 'employee') this._installEmployeeCodeLookupLikeClinic();
    },

    _onContractorChanged() {
        const personType = (document.getElementById('ia-f-person-type')?.value || 'employee').toLowerCase();
        if (personType !== 'contractor') return;
        const selectedName = (document.getElementById('ia-f-contractor-name')?.value || '').trim();
        if (!selectedName) return;
        const nameInput = document.getElementById('ia-f-name');
        if (nameInput) nameInput.value = selectedName;
    },

    async _lookupEmployeeByCode(queryOverride) {
        try {
            const personType = (document.getElementById('ia-f-person-type')?.value || 'employee').toLowerCase();
            if (personType !== 'employee') return;
            const query = String(queryOverride || '').trim() || (document.getElementById('ia-f-employee-code')?.value || '').trim();
            if (!query) return;
            await this._ensureEmployeesLoaded();

            // 1) Fast local lookup (same spirit as clinic flow).
            const localEmployee = this._findEmployeeLocal(query);
            if (localEmployee) {
                this._fillEmployeeFields({
                    employeeCode: String(localEmployee.employeeNumber || localEmployee.employeeCode || localEmployee.sapId || localEmployee.id || '').trim(),
                    name: String(localEmployee.name || '').trim(),
                    departmentName: String(localEmployee.department || localEmployee.unit || localEmployee.section || '').trim(),
                    jobTitle: String(localEmployee.position || localEmployee.job || localEmployee.jobTitle || '').trim(),
                    branch: String(localEmployee.branch || '').trim(),
                    factory: String(localEmployee.factoryId || localEmployee.factory || localEmployee.factoryName || '').trim(),
                    location: String(localEmployee.location || localEmployee.locationName || localEmployee.employeeLocation || '').trim(),
                    sublocation: String(localEmployee.sublocation || localEmployee.subLocation || localEmployee.subLocationName || '').trim()
                });
                if (typeof Utils !== 'undefined' && Utils.showNotification) {
                    Utils.showNotification('تم تحميل بيانات الموظف بنجاح', 'success');
                }
                return;
            }

            // 2) Backend lookup/fallback if local cache misses.
            let result = null;
            try {
                result = await this._withTimeout(GoogleIntegration.sendRequest({
                    action: 'getEmployeeByCode',
                    data: { employeeCode: query }
                }), 4500);
            } catch (_) {
                // fallback below
            }
            if (!result || !result.success || !result.data) {
                const fallback = await this._withTimeout(GoogleIntegration.sendRequest({
                    action: 'readFromSheet',
                    data: { sheetName: 'Employees' }
                }), 7000);
                if (fallback && fallback.success && Array.isArray(fallback.data)) {
                    const norm = (v) => String(v || '').trim().toLowerCase();
                    const target = norm(query);
                    const emp = fallback.data.find((e) =>
                        norm(e.employeeNumber) === target ||
                        norm(e.sapId) === target ||
                        norm(e.id) === target ||
                        norm(e.employeeCode) === target ||
                        norm(e.name) === target ||
                        norm(e.name).includes(target)
                    );
                    if (emp) {
                        result = {
                            success: true,
                            data: {
                                employeeCode: String(emp.employeeNumber || emp.sapId || emp.id || '').trim(),
                                name: String(emp.name || '').trim(),
                                departmentName: String(emp.department || '').trim(),
                                jobTitle: String(emp.job || emp.position || '').trim(),
                                branch: String(emp.branch || '').trim(),
                                factory: String(emp.factoryId || emp.factory || '').trim(),
                                location: String(emp.location || '').trim(),
                                sublocation: String(emp.sublocation || emp.subLocation || emp.subLocationName || emp.locationName || '').trim()
                            }
                        };
                    }
                }
            }
            if (!result || !result.success || !result.data) {
                if (typeof Utils !== 'undefined' && Utils.showNotification) {
                    Utils.showNotification((result && result.message) || 'لم يتم العثور على بيانات موظف', 'warning');
                }
                return;
            }
            const data = result.data;
            this._fillEmployeeFields({
                employeeCode: data.employeeCode || query,
                name: data.name || '',
                departmentName: data.departmentName || '',
                jobTitle: data.jobTitle || '',
                branch: data.branch || '',
                factory: data.factory || '',
                location: data.location || '',
                sublocation: data.sublocation || ''
            });
            if (typeof Utils !== 'undefined' && Utils.showNotification) {
                Utils.showNotification('تم تحميل بيانات الموظف بنجاح', 'success');
            }
        } catch (err) {
            this._reportModuleError('IssuingAuthorities._lookupEmployeeByCode', err);
        }
    },

    _currentEditId: null,

    async _openModal(record) {
        const modal = document.getElementById('ia-modal-overlay');
        const title = document.getElementById('ia-modal-title');
        const body  = document.getElementById('ia-modal-body');
        if (!modal || !title || !body) return;

        this._currentEditId = record ? record.id : null;
        title.textContent = record ? 'تعديل بيانات الشخص المصرح له' : 'إضافة شخص مصرح له';
        await this._fetchContractorOptions();
        body.innerHTML = this._renderForm(record);
        modal.style.display = 'flex';
        this._togglePersonTypeInputs();
        this._bindModalFieldEvents();
        this._refreshSublocationOptions(String(record?.sublocationId || record?.sublocation || ''));

        // Re-attach radio feedback
        body.querySelectorAll('input[type="radio"]').forEach(radio => {
            const lbl = radio.closest('label.ia-radio-label');
            if (lbl) {
                lbl.classList.toggle('is-selected', !!radio.checked);
            }
        });
    },

    _closeModal() {
        const modal = document.getElementById('ia-modal-overlay');
        if (modal) modal.style.display = 'none';
        this._currentEditId = null;
    },

    async _saveModal() {
        const personType = (document.getElementById('ia-f-person-type')?.value || 'employee').toLowerCase() === 'contractor'
            ? 'contractor'
            : 'employee';
        const employeeCode = (document.getElementById('ia-f-employee-code')?.value || '').trim();
        const contractorName = (document.getElementById('ia-f-contractor-name')?.value || '').trim();
        const name = personType === 'contractor'
            ? contractorName
            : (document.getElementById('ia-f-name')?.value || '').trim();
        if (!name) {
            if (typeof Utils !== 'undefined' && Utils.showNotification) {
                Utils.showNotification('اسم الشخص مطلوب', 'error');
            } else {
                alert('اسم الشخص مطلوب');
            }
            return;
        }
        if (personType === 'employee' && !employeeCode) {
            if (typeof Utils !== 'undefined' && Utils.showNotification) {
                Utils.showNotification('الكود الوظيفي مطلوب للموظف', 'error');
            } else {
                alert('الكود الوظيفي مطلوب للموظف');
            }
            return;
        }
        if (personType === 'contractor' && !contractorName) {
            if (typeof Utils !== 'undefined' && Utils.showNotification) {
                Utils.showNotification('اختيار المقاول مطلوب', 'error');
            } else {
                alert('اختيار المقاول مطلوب');
            }
            return;
        }

        const userData = AppState && AppState.currentUser ? AppState.currentUser : {};
        const factorySelect = document.getElementById('ia-f-factory');
        const sublocationSelect = document.getElementById('ia-f-sublocation');
        const selectedFactoryText = factorySelect?.options?.[factorySelect.selectedIndex]?.text || '';
        const selectedSublocationText = sublocationSelect?.options?.[sublocationSelect.selectedIndex]?.text || '';
        const payload = {
            personType,
            employeeCode,
            name,
            departmentName: document.getElementById('ia-f-dept')?.value?.trim() || '',
            jobTitle:       document.getElementById('ia-f-job-title')?.value?.trim() || '',
            branch:         document.getElementById('ia-f-branch')?.value?.trim() || '',
            factory:        (selectedFactoryText && !selectedFactoryText.includes('اختر')) ? selectedFactoryText.trim() : (document.getElementById('ia-f-factory')?.value?.trim() || ''),
            factoryId:      document.getElementById('ia-f-factory')?.value?.trim() || '',
            location:       document.getElementById('ia-f-location')?.value?.trim() || '',
            sublocation:    (selectedSublocationText && !selectedSublocationText.includes('اختر')) ? selectedSublocationText.trim() : (document.getElementById('ia-f-sublocation')?.value?.trim() || ''),
            sublocationId:  document.getElementById('ia-f-sublocation')?.value?.trim() || '',
            email:          document.getElementById('ia-f-email')?.value?.trim() || '',
            phone:          document.getElementById('ia-f-phone')?.value?.trim() || '',
            isActive:       document.getElementById('ia-f-active')?.checked !== false,
            notes:          document.getElementById('ia-f-notes')?.value?.trim() || '',
            userData
        };

        // جمع قيم أنواع التصاريح
        this.PERMIT_TYPES.forEach(pt => {
            const checked = document.querySelector(`input[name="permit_${pt.key}"]:checked`);
            payload[pt.key] = checked ? checked.value : 'X';
        });

        const saveBtn = document.getElementById('ia-modal-save');
        if (saveBtn) { saveBtn.disabled = true; saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...'; }

        try {
            let result;
            const actions = this._actionsForCategory(this._activeCategory, personType);
            if (this._currentEditId) {
                payload.id = this._currentEditId;
                result = await GoogleIntegration.sendRequest({
                    action: actions.update,
                    data: payload
                });
            } else {
                result = await GoogleIntegration.sendRequest({
                    action: actions.add,
                    data: payload
                });
            }

            if (result && result.success) {
                this._closeModal();
                await this._fetchData();
                this._renderTable();
                if (typeof Utils !== 'undefined' && Utils.showNotification) {
                    Utils.showNotification(this._currentEditId ? 'تم التحديث بنجاح' : 'تم الإضافة بنجاح', 'success');
                }
                // إعلام PTW بتغيير البيانات
                document.dispatchEvent(new CustomEvent('issuingAuthoritiesUpdated', { detail: { data: this._data } }));
            } else {
                const msg = (result && result.message) || 'فشل الحفظ';
                if (typeof Utils !== 'undefined' && Utils.showNotification) {
                    Utils.showNotification(msg, 'error');
                } else {
                    alert(msg);
                }
            }
        } catch (err) {
            this._reportModuleError('IssuingAuthorities._saveModal', err);
        } finally {
            if (saveBtn) { saveBtn.disabled = false; saveBtn.innerHTML = '<i class="fas fa-save" style="margin-left:6px;"></i>حفظ'; }
        }
    },

    _confirmDelete(id, name) {
        const modal = document.getElementById('ia-delete-modal');
        const msg   = document.getElementById('ia-delete-msg');
        if (!modal || !msg) return;
        msg.textContent = `هل تريد حذف السجل الخاص بـ "${name}"؟ لا يمكن التراجع عن هذا الإجراء.`;
        modal.style.display = 'flex';

        const confirmBtn = document.getElementById('ia-delete-confirm');
        if (confirmBtn) {
            const newBtn = confirmBtn.cloneNode(true);
            confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
            newBtn.addEventListener('click', async () => {
                modal.style.display = 'none';
                await this._deleteRecord(id);
            });
        }
    },

    async _deleteRecord(id) {
        try {
            const userData = AppState && AppState.currentUser ? AppState.currentUser : {};
            const rec = (this._data || []).find(x => x.id === id) || {};
            const actions = this._actionsForCategory(this._activeCategory, rec.personType);
            const result = await GoogleIntegration.sendRequest({
                action: actions.remove,
                data: { id, userData }
            });
            if (result && result.success) {
                await this._fetchData();
                this._renderTable();
                if (typeof Utils !== 'undefined' && Utils.showNotification) {
                    Utils.showNotification('تم حذف السجل بنجاح', 'success');
                }
                document.dispatchEvent(new CustomEvent('issuingAuthoritiesUpdated', { detail: { data: this._data } }));
            } else {
                const msg = (result && result.message) || 'فشل الحذف';
                if (typeof Utils !== 'undefined' && Utils.showNotification) {
                    Utils.showNotification(msg, 'error');
                } else {
                    alert(msg);
                }
            }
        } catch (err) {
            this._reportModuleError('IssuingAuthorities._deleteRecord', err);
        }
    },

    /**
     * API عام: الحصول على المرشحين المؤهلين لنوع تصريح معين
     * يُستخدم من PTW عند بناء Workflow
     *
     * @param {string} permitType - مفتاح نوع التصريح
     * @returns {Promise<Array>} قائمة المرشحين مع permitLevel وrequiresHseCoApproval
     */
    async getAuthoritiesForPermitType(permitType) {
        try {
            const key = String(permitType || '').trim();
            if (!key) return [];
            // Avoid extra network calls if data for the active category is already loaded.
            if (!this._data || this._data.length === 0) {
                await this._fetchData();
            }
            const originalCategory = this._activeCategory;
            const employeeData = originalCategory === 'employees'
                ? (Array.isArray(this._data) ? [...this._data] : [])
                : [];

            let merged = employeeData;
            if (key === 'contractorPTW') {
                if (originalCategory !== 'employees') {
                    this._activeCategory = 'employees';
                    await this._fetchData();
                    merged = Array.isArray(this._data) ? [...this._data] : [];
                }
                this._activeCategory = 'contractors';
                await this._fetchData();
                const contractorData = Array.isArray(this._data) ? [...this._data] : [];
                merged = merged.concat(contractorData);
            } else if (originalCategory !== 'employees') {
                this._activeCategory = 'employees';
                await this._fetchData();
                merged = Array.isArray(this._data) ? [...this._data] : [];
            }
            this._activeCategory = originalCategory;
            return (merged || [])
                .filter(r => r.isActive !== false)
                .map(r => {
                    const level = String(r[key] || 'X').toUpperCase().trim();
                    return {
                        id: r.id,
                        name: r.name,
                        departmentId: r.departmentId,
                        departmentName: r.departmentName,
                        email: r.email,
                        phone: r.phone,
                        permitLevel: level,
                        requiresHseCoApproval: level === 'Y'
                    };
                })
                .filter(x => x.permitLevel === 'G' || x.permitLevel === 'Y')
                .sort((a, b) => (a.permitLevel === 'G' && b.permitLevel !== 'G') ? -1 : (b.permitLevel === 'G' && a.permitLevel !== 'G') ? 1 : 0);
        } catch (err) {
            if (typeof Utils !== 'undefined') Utils.safeError('IssuingAuthorities.getAuthoritiesForPermitType error:', err);
            return [];
        }
    },

    /**
     * تحويل نوع تصريح PTW (من بيانات النموذج) إلى مفتاح حقل Issuing Authorities
     * يُستخدم من PTW module
     */
    mapPermitTypeToField(permitType) {
        const mapping = {
            'أعمال باردة':            'coldWork',
            'cold work':              'coldWork',
            'عزل مصادر الطاقة':       'loto',
            'loto':                   'loto',
            'أعمال ساخنة':            'hotWork',
            'hot work':               'hotWork',
            'العمل على ارتفاعات':     'workAtHeight',
            'work at height':         'workAtHeight',
            'w@h':                    'workAtHeight',
            'دخول أماكن مغلقة':      'confinedSpace',
            'confined space':         'confinedSpace',
            'حفر':                    'excavation',
            'excavation':             'excavation',
            'دخول مقاول':             'contractorPTW',
            'contractor ptw':         'contractorPTW',
            'خطة الرفع':             'liftingPlan',
            'lifting plan':           'liftingPlan'
        };
        const key = String(permitType || '').toLowerCase().trim();
        return mapping[key] || null;
    },

    _injectStyles() {
        let style = document.getElementById('ia-styles');
        if (!style) {
            style = document.createElement('style');
            style.id = 'ia-styles';
            document.head.appendChild(style);
        }
        style.textContent = `
            .ia-badge-g {
                display:inline-block;padding:2px 8px;border-radius:4px;font-weight:700;font-size:0.8rem;
                background:#dcfce7;color:#166534;border:1px solid #86efac;
            }
            .ia-badge-y {
                display:inline-block;padding:2px 8px;border-radius:4px;font-weight:700;font-size:0.8rem;
                background:#fef9c3;color:#854d0e;border:1px solid #fde047;
            }
            .ia-badge-x {
                display:inline-block;padding:2px 8px;border-radius:4px;font-weight:700;font-size:0.8rem;
                background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;
            }
            /* أزرار G / Y / X: غير المحدد = إطار ملون واضح؛ المحدد = تعبئة قوية + هالة */
            .ia-radio-label {
                border-radius:8px;
                cursor:pointer;
                padding:8px 14px;
                font-weight:800;
                font-size:0.88rem;
                min-width:42px;
                text-align:center;
                user-select:none;
                -webkit-tap-highlight-color:transparent;
                border:2px solid transparent;
                transition:transform .12s ease, box-shadow .15s ease, background .15s ease, color .15s ease, border-color .15s ease;
            }
            .ia-radio-label.ia-radio-g {
                background:#ffffff;
                color:#047857;
                border-color:#6ee7b7;
                box-shadow:0 1px 2px rgba(15,23,42,0.06);
            }
            .ia-radio-label.ia-radio-g.is-selected {
                background:linear-gradient(180deg,#34d399 0%,#10b981 100%);
                color:#ffffff;
                border-color:#047857;
                box-shadow:0 0 0 3px rgba(16,185,129,0.45), 0 4px 14px rgba(5,150,105,0.28);
                transform:scale(1.06);
            }
            .ia-radio-label.ia-radio-y {
                background:#ffffff;
                color:#b45309;
                border-color:#fcd34d;
                box-shadow:0 1px 2px rgba(15,23,42,0.06);
            }
            .ia-radio-label.ia-radio-y.is-selected {
                background:linear-gradient(180deg,#fbbf24 0%,#f59e0b 100%);
                color:#422006;
                border-color:#b45309;
                box-shadow:0 0 0 3px rgba(245,158,11,0.5), 0 4px 14px rgba(180,83,9,0.22);
                transform:scale(1.06);
            }
            .ia-radio-label.ia-radio-x {
                background:#ffffff;
                color:#b91c1c;
                border-color:#fca5a5;
                box-shadow:0 1px 2px rgba(15,23,42,0.06);
            }
            .ia-radio-label.ia-radio-x.is-selected {
                background:linear-gradient(180deg,#f87171 0%,#ef4444 100%);
                color:#ffffff;
                border-color:#991b1b;
                box-shadow:0 0 0 3px rgba(239,68,68,0.45), 0 4px 14px rgba(185,28,28,0.25);
                transform:scale(1.06);
            }
            .ia-radio-label:hover:not(.is-selected) {
                transform:translateY(-1px);
                filter:brightness(0.98);
            }
            .ia-radio-label.is-selected:hover {
                transform:scale(1.07);
            }
            .ia-module table th, .ia-module table td {
                border-bottom:1px solid #f1f5f9;
            }
            .ia-category-tabs { display:flex; gap:8px; flex-wrap:wrap; }
            .ia-tab-btn {
                border:1px solid #cbd5e1; background:#fff; color:#334155; border-radius:8px; padding:6px 12px; cursor:pointer; font-weight:700;
            }
            .ia-tab-btn.active { border-color:#2563eb; color:#1d4ed8; background:#eff6ff; }
            .ia-module table tbody tr:hover { background:#f8fafc; }
            .ia-modal-container { border-radius:12px; overflow:hidden; }
            .ia-modal-container .modal-header {
                position:sticky; top:0; z-index:3; background:#ffffff;
                border-bottom:1px solid #e2e8f0;
            }
            .ia-modal-body {
                max-height:68vh; overflow:auto; padding:14px;
                background:#f1f5f9;
            }
            .ia-modal-footer.ia-modal-footer {
                position:sticky; bottom:0; z-index:3;
                background:#ffffff; border-top:1px solid #e2e8f0;
            }
            .ia-form-grid { display:grid; gap:14px; }
            .ia-form-section { border:1px solid #dbeafe; border-radius:10px; padding:14px; background:#ffffff; box-shadow:0 1px 2px rgba(15,23,42,0.03); }
            .ia-form-section-title { margin:0 0 10px; color:#1e3a8a; font-size:0.95rem; font-weight:700; }
            .ia-form-section-subtitle { display:block; margin-top:4px; color:#475569; font-size:0.78rem; font-weight:500; }
            .ia-form-two-cols { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
            .ia-form-select,
            .ia-form .form-input,
            .ia-form .form-select {
                width:100%;
                border:1px solid #cbd5e1;
                border-radius:8px;
                padding:10px 12px;
                font-size:0.9rem;
                background:#fff;
            }
            .ia-form .form-input:focus,
            .ia-form .form-select:focus {
                outline:none;
                border-color:#3b82f6;
                box-shadow:0 0 0 3px rgba(59,130,246,0.15);
            }
            .ia-form .form-input[readonly] {
                background:#f8fafc;
                color:#475569;
            }
            .ia-employee-lookup-row { display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; }
            .ia-lookup-btn { min-width:72px; height:42px; white-space:nowrap; border-radius:8px; }
            .ia-person-mode-hint {
                margin-bottom:10px;
                padding:8px 10px;
                border-radius:8px;
                background:#f1f5f9;
                border:1px dashed #cbd5e1;
                color:#334155;
                font-size:0.82rem;
                font-weight:600;
            }
            .ia-legend-inline {
                display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:10px;
                color:#334155; font-size:0.8rem;
            }
            .ia-permits-card { background:#f1f5f9; border:1px solid #cbd5e1; border-radius:10px; padding:12px 14px; box-shadow:inset 0 1px 0 rgba(255,255,255,0.7); }
            .ia-permit-row { display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid #e5e7eb; gap:10px; }
            .ia-permit-row:last-child { border-bottom:none; }
            .ia-permit-label { font-size:0.9rem; color:#1f2937; font-weight:600; display:flex; align-items:center; gap:6px; }
            .ia-permit-label-en { color:#64748b; font-size:0.78rem; font-weight:500; }
            .ia-radio-group { display:flex; gap:8px; }
            .ia-settings-row { align-items:center; }
            .ia-active-group { display:flex; align-items:center; gap:10px; padding-top:24px; }
            .ia-active-group label { cursor:pointer; font-size:0.9rem; color:#334155; font-weight:600; }
            .ia-form .form-label { color:#334155; font-weight:700; }
            .ia-form .form-input::placeholder { color:#94a3b8; }
            @media (max-width: 768px) {
                .ia-form-two-cols { grid-template-columns:1fr; }
                .ia-employee-lookup-row { grid-template-columns:1fr; }
                .ia-lookup-btn { width:100%; }
                .ia-active-group { padding-top:4px; }
                .ia-permit-row { flex-direction:column; align-items:flex-start; }
            }
        `;
    }
};

// تصدير على window
if (typeof window !== 'undefined') {
    window.IssuingAuthorities = IssuingAuthorities;
}
