/**
 * BehaviorMonitoring Module
 * ØªÙ… Ø§Ø³ØªØ®Ø±Ø§Ø¬Ù‡ …Ù† app-modules.js
 */
// ===== Behavior Monitoring Module (مراقبة السلوكيات) =====
const BehaviorMonitoring = {
    // مراجع لتنظيف الموارد
    _setupTimeoutId: null,
    _eventListenersAbortController: null,
    _modalAbortController: null,
    _employeeSubmitLock: false,
    _contractorSubmitLock: false,

    /**
     * معالجة الصور (تحويل روابط Google Drive القديمة و Base64)
     */
    processPhoto(photoData) {
        if (typeof Utils !== 'undefined' && typeof Utils.normalizeImageSource === 'function') {
            return Utils.normalizeImageSource(photoData) || null;
        }
        if (!photoData || typeof photoData !== 'string') return null;
        return photoData.trim() || null;
    },

    state: {
        activeTab: 'log', // overview | log | contractors
        filters: {
            search: '',
            behaviorType: '',
            rating: '',
            dateFrom: '',
            dateTo: ''
        },
        sort: 'date_desc', // date_desc | date_asc
        contractorFilters: {
            search: '',
            behaviorType: '',
            rating: '',
            dateFrom: '',
            dateTo: ''
        },
        contractorSort: 'date_desc',
        logPage: 1,
        contractorLogPage: 1,
        pageSize: 50
    },

    getPageSize() {
        const n = Number(this.state?.pageSize);
        return Number.isFinite(n) && n > 0 ? n : 50;
    },

    paginateItems(items, page) {
        const list = Array.isArray(items) ? items : [];
        const size = this.getPageSize();
        const total = list.length;
        const totalPages = Math.max(1, Math.ceil(total / size) || 1);
        const safePage = Math.min(Math.max(1, Number(page) || 1), totalPages);
        const start = (safePage - 1) * size;
        return {
            page: safePage,
            totalPages,
            total,
            start,
            end: Math.min(start + size, total),
            items: list.slice(start, start + size)
        };
    },

    renderTablePaginationHTML(kind, pageInfo) {
        const { page, totalPages, total, start, end } = pageInfo;
        if (total <= this.getPageSize()) {
            return total
                ? `<div class="bhm-pagination text-sm text-gray-500 mt-3">${start + 1}–${end} / ${total}</div>`
                : '';
        }
        const prevDisabled = page <= 1 ? 'disabled' : '';
        const nextDisabled = page >= totalPages ? 'disabled' : '';
        const setter = kind === 'contractor' ? 'setContractorLogPage' : 'setLogPage';
        return `
            <div class="bhm-pagination flex flex-wrap items-center justify-between gap-3 mt-3">
                <span class="text-sm text-gray-600">${start + 1}–${end} / ${total}</span>
                <div class="flex items-center gap-2">
                    <button type="button" class="btn-secondary btn-sm" ${prevDisabled} onclick="BehaviorMonitoring.${setter}(${page - 1})">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <span class="text-sm font-semibold">${page} / ${totalPages}</span>
                    <button type="button" class="btn-secondary btn-sm" ${nextDisabled} onclick="BehaviorMonitoring.${setter}(${page + 1})">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                </div>
            </div>
        `;
    },

    setLogPage(page) {
        this.state.logPage = Math.max(1, Number(page) || 1);
        this.renderLogTable();
    },

    setContractorLogPage(page) {
        this.state.contractorLogPage = Math.max(1, Number(page) || 1);
        this.renderContractorLogTable();
    },

    t(key, fallback) {
        try {
            if (typeof AppI18n !== 'undefined' && typeof AppI18n.t === 'function') {
                return AppI18n.t(key, null, fallback != null ? String(fallback) : '');
            }
            if (typeof I18n !== 'undefined' && typeof I18n.t === 'function') {
                return I18n.t(key, null, fallback != null ? String(fallback) : '');
            }
        } catch (e) { /* ignore */ }
        return fallback != null ? String(fallback) : key;
    },

    NEGATIVE_ACTIONS: [
        'توعية / توجيه',
        'إعادة تدريب',
        'تحذير شفهي',
        'إنذار كتابي',
        'إيقاف مؤقت عن العمل',
        'تطبيق / تعديل إجراء عمل',
        'تحسينات هندسية (Engineering)',
        'توفير / إلزام PPE',
        'أخرى'
    ],

    // الحصول على قائمة المواقع (المصانع) من الإعدادات (نفس نمط Training/Clinic)
    getSiteOptions() {
        try {
            if (typeof Permissions !== 'undefined' && Permissions.formSettingsState && Permissions.formSettingsState.sites) {
                return Permissions.formSettingsState.sites.map(site => ({ id: site.id, name: site.name }));
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
            Utils.safeWarn('⚠️ خطأ في الحصول على قائمة المواقع:', error);
            return [];
        }
    },

    // الحصول على قائمة الأماكن الفرعية لموقع محدد
    getPlaceOptions(siteId) {
        try {
            if (!siteId) return [];

            if (typeof Permissions !== 'undefined' && Permissions.formSettingsState && Permissions.formSettingsState.sites) {
                const site = Permissions.formSettingsState.sites.find(s => s.id === siteId);
                if (site && Array.isArray(site.places)) {
                    return site.places.map(place => ({ id: place.id, name: place.name }));
                }
            }

            if (Array.isArray(AppState.appData?.observationSites)) {
                const site = AppState.appData.observationSites.find(s => (s.id || s.siteId) === siteId);
                if (site) {
                    const placesSource = Array.isArray(site.places)
                        ? site.places
                        : Array.isArray(site.locations)
                            ? site.locations
                            : Array.isArray(site.children)
                                ? site.children
                                : Array.isArray(site.areas)
                                    ? site.areas
                                    : [];
                    return placesSource.map((place, idx) => ({
                        id: place.id || place.placeId || place.value || Utils.generateId('PLACE'),
                        name: place.name || place.placeName || place.title || place.label || place.locationName || `مكان ${idx + 1}`
                    }));
                }
            }

            if (typeof DailyObservations !== 'undefined' && Array.isArray(DailyObservations.DEFAULT_SITES)) {
                const site = DailyObservations.DEFAULT_SITES.find(s => (s.id || s.siteId) === siteId);
                if (site) {
                    const placesSource = Array.isArray(site.places)
                        ? site.places
                        : Array.isArray(site.locations)
                            ? site.locations
                            : Array.isArray(site.children)
                                ? site.children
                                : Array.isArray(site.areas)
                                    ? site.areas
                                    : [];
                    return placesSource.map((place, idx) => ({
                        id: place.id || place.placeId || place.value || Utils.generateId('PLACE'),
                        name: place.name || place.placeName || place.title || place.label || place.locationName || `مكان ${idx + 1}`
                    }));
                }
            }

            return [];
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في الحصول على قائمة الأماكن:', error);
            return [];
        }
    },

    refreshSiteDropdowns() {
        try {
            var sites = this.getSiteOptions();
            if (!sites || !sites.length) return;
            var esc = (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML : function(s) { return String(s == null ? '' : s); };
            document.querySelectorAll('select[id$="-factory"]').forEach(function(el) {
                if (el.tagName !== 'SELECT') return;
                var v = el.value;
                el.innerHTML = '<option value="">' + this.t('module.behavior.selectFactory', 'اختر المصنع') + '</option>' + sites.map(function(s) { return '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>'; }).join('');
                if (v) el.value = v;
            });
        } catch (e) { if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('⚠️ BehaviorMonitoring.refreshSiteDropdowns:', e); }
    },

    resolveSiteName(siteIdOrName) {
        const v = (siteIdOrName || '').toString();
        if (!v) return '';
        const sites = this.getSiteOptions();
        const site = sites.find(s => s.id === v) || sites.find(s => (s.name || '') === v);
        return site?.name || v;
    },

    resolvePlaceName(placeIdOrName, siteIdOrName) {
        const v = (placeIdOrName || '').toString();
        if (!v) return '';
        const parent = (siteIdOrName || '').toString();
        const places = this.getPlaceOptions(parent);
        const place = places.find(p => p.id === v) || places.find(p => (p.name || '') === v);
        return place?.name || v;
    },

    async load() {
        // Add language change listener
        if (!this._languageChangeListenerAdded) {
            document.addEventListener('language-changed', () => {
                // loadSectionData يعيد تحميل القسم الظاهر؛ لا تعِد تحميل موديول مخفي أو مزدوج
                if (typeof AppState !== 'undefined' && AppState._languageRefresh) return;
                if (AppState?.currentSection && AppState.currentSection !== 'behavior-monitoring') return;
                this.load();
            });
            this._languageChangeListenerAdded = true;
        }

        // التحقق من وجود التبعيات المطلوبة
        if (typeof Utils === 'undefined') {
            console.error('Utils غير متوفر!');
            return;
        }
        if (typeof AppState === 'undefined') {
            // لا تترك الواجهة فارغة
            const section = document.getElementById('behavior-monitoring-section');
            if (section) {
                section.innerHTML = `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-2">${this.t('module.behavior.loadFailed', 'تعذر تحميل مراقبة السلوكيات')}</p>
                                <p class="text-sm text-gray-400">${this.t('module.behavior.appStateMissing', 'AppState غير متوفر حالياً. جرّب تحديث الصفحة.')}</p>
                                <button onclick="location.reload()" class="btn-primary mt-4">
                                    <i class="fas fa-redo ml-2"></i>
                                    تحديث الصفحة
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
            Utils.safeError('AppState غير متوفر!');
            return;
        }

        const section = document.getElementById('behavior-monitoring-section');
        if (!section) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ قسم behavior-monitoring-section غير موجود');
            } else {
                console.warn('⚠️ قسم behavior-monitoring-section غير موجود');
            }
            return;
        }

        // التأكد من وجود البيانات
        if (!AppState.appData) {
            AppState.appData = {};
        }
        if (!AppState.appData.behaviorMonitoring) {
            AppState.appData.behaviorMonitoring = [];
        }
        if (!AppState.appData.contractorBehaviorMonitoring) {
            AppState.appData.contractorBehaviorMonitoring = [];
        }

        // عرض الواجهة أولاً لتحسين تجربة المستخدم
        try {
            const requestedTab = this.state?.activeTab || 'log';
            const activeTab = requestedTab === 'form' ? 'log' : requestedTab;
            this.state.activeTab = activeTab;

            section.innerHTML = `
                <div class="section-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-eye ml-3"></i>
                                ${this.t('module.behavior.title', 'مراقبة السلوكيات')}
                            </h1>
                            <p class="section-subtitle">${this.t('module.behavior.subtitle', 'تسجيل ومتابعة سلوكيات الموظفين والمقاولين')}</p>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap justify-end">
                            <button id="behavior-refresh-btn" class="btn-secondary">
                                <i class="fas fa-sync-alt ml-2"></i>
                                ${this.t('common.refresh', 'تحديث')}
                            </button>
                            <button id="behavior-add-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>
                                ${this.t('module.behavior.addEmployee', 'تسجيل تصرف موظف')}
                            </button>
                            <button id="behavior-add-contractor-header-btn" type="button" class="btn-secondary">
                                <i class="fas fa-users-cog ml-2"></i>
                                ${this.t('module.behavior.addContractor', 'تسجيل تصرف مقاول')}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-6">
                    <div class="module-tabs-wrapper">
                        <div class="module-tabs-container">
                            <button class="module-tab-btn ${activeTab === 'overview' ? 'active' : ''}" data-tab="overview" onclick="BehaviorMonitoring.switchTab('overview')">
                                <i class="fas fa-chart-pie ml-2"></i>${this.t('module.behavior.tabs.overview', 'نظرة عامة')}
                            </button>
                            <button class="module-tab-btn ${activeTab === 'log' ? 'active' : ''}" data-tab="log" onclick="BehaviorMonitoring.switchTab('log')">
                                <i class="fas fa-list ml-2"></i>${this.t('module.behavior.tabs.employeeLog', 'تصرفات الموظفين')}
                            </button>
                            <button class="module-tab-btn ${activeTab === 'contractors' ? 'active' : ''}" data-tab="contractors" onclick="BehaviorMonitoring.switchTab('contractors')">
                                <i class="fas fa-users-cog ml-2"></i>${this.t('module.behavior.tabs.contractorLog', 'تصرفات المقاولين')}
                            </button>
                        </div>
                    </div>
                </div>

                <div id="behavior-content" class="mt-6">
                    ${this.renderTabSkeleton(activeTab)}
                </div>
            `;

            this.setupEventListeners();
            // render active tab (sync) then bind events
            await this.switchTab(activeTab, { initial: true });

            // تغيير لغة: لا تعيد جلب الشبكة — البيانات لم تتغير
            if (typeof AppState !== 'undefined' && AppState._languageRefresh === true) {
                return;
            }
            
            // تحميل البيانات بشكل غير متزامن بعد عرض الواجهة
            setTimeout(() => {
                this.loadBehaviorDataAsync().then(() => {
                    // تحديث الواجهة بعد تحميل البيانات لضمان عدم بقاء الواجهة فارغة
                    const activeTab = this.state?.activeTab || 'log';
                    this.switchTab(activeTab, { silent: true }).catch(() => {
                        // في حالة الفشل، على الأقل تأكد من أن الواجهة ليست فارغة
                        this.refreshCurrentTab();
                    });
                }).catch(error => {
                    if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                        Utils.safeWarn('⚠️ تعذر تحميل بيانات مراقبة السلوك:', error);
                    } else {
                        console.warn('⚠️ تعذر تحميل بيانات مراقبة السلوك:', error);
                    }
                    // حتى في حالة الخطأ، تأكد من تحديث التبويب الحالي
                    this.refreshCurrentTab();
                });
            }, 100);
        } catch (error) {
            Utils.safeError('❌ خطأ في تحميل مديول مراقبة السلوكيات:', error);
            section.innerHTML = `
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-eye ml-3"></i>
                            مراقبة السلوكيات
                        </h1>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-2">${this.t('module.behavior.dataLoadError', 'حدث خطأ أثناء تحميل البيانات')}</p>
                                <p class="text-sm text-gray-400 mb-4">${error && error.message ? Utils.escapeHTML(error.message) : this.t('common.unknownError', 'خطأ غير معروف')}</p>
                                <button onclick="BehaviorMonitoring.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    إعادة المحاولة
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    },

    async loadBehaviorDataAsync() {
        try {
            const behaviorResult = await GoogleIntegration.sendRequest({
                action: 'getAllBehaviors',
                data: {}
            }).catch(error => {
                const errorMsg = error.message || error.toString() || '';
                if (errorMsg.includes('انتهت مهلة الاتصال') || errorMsg.includes('timeout')) {
                    Utils.safeWarn('⚠️ انتهت مهلة الاتصال بالخادم');
                    return { success: false, data: [] };
                }
                Utils.safeWarn('⚠️ تعذر تحميل بيانات مراقبة السلوك:', error);
                return { success: false, data: [] };
            });

            const contractorResult = await GoogleIntegration.sendRequest({
                action: 'getAllContractorBehaviors',
                data: {}
            }).catch(error => {
                Utils.safeWarn('⚠️ تعذر تحميل تصرفات المقاولين:', error);
                return { success: false, data: [] };
            });

            // معالجة نتائج البيانات — P1.3: لا تستبدل محلياً غير فارغ بمصفوفة فارغة
            if (behaviorResult && behaviorResult.success && Array.isArray(behaviorResult.data)) {
                const localBehavior = Array.isArray(AppState.appData.behaviorMonitoring) ? AppState.appData.behaviorMonitoring : [];
                if (behaviorResult.data.length === 0 && localBehavior.length > 0) {
                    Utils.safeWarn(`⚠️ تجاهل behaviorMonitoring فارغ من الخادم — الإبقاء على ${localBehavior.length} سجل محلي`);
                } else {
                    AppState.appData.behaviorMonitoring = behaviorResult.data;
                    Utils.safeLog(`✅ تم تحميل ${behaviorResult.data.length} سجل من Google Sheets`);
                }
            }

            if (contractorResult && contractorResult.success && Array.isArray(contractorResult.data)) {
                const localContractor = Array.isArray(AppState.appData.contractorBehaviorMonitoring) ? AppState.appData.contractorBehaviorMonitoring : [];
                if (contractorResult.data.length === 0 && localContractor.length > 0) {
                    Utils.safeWarn(`⚠️ تجاهل contractorBehaviorMonitoring فارغ من الخادم — الإبقاء على ${localContractor.length} سجل محلي`);
                } else {
                    AppState.appData.contractorBehaviorMonitoring = contractorResult.data;
                    Utils.safeLog(`✅ تم تحميل ${contractorResult.data.length} سجل تصرفات مقاولين`);
                }
            }

            if ((behaviorResult && behaviorResult.success) || (contractorResult && contractorResult.success)) {
                this.refreshCurrentTab();
            }

            // حفظ البيانات محلياً
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }
        } catch (error) {
            const errorMsg = error.message || error.toString() || '';
            Utils.safeError('❌ خطأ في تحميل بيانات مراقبة السلوك من Google Sheets:', error);
            
            // عرض رسالة خطأ واضحة للمستخدم
            if (errorMsg.includes('انتهت مهلة الاتصال') || errorMsg.includes('timeout')) {
                Notification.error({
                    title: 'الربط مع الخلفية',
                    message: 'انتهت مهلة الاتصال بالخادم. سيتم استخدام البيانات المحلية.',
                    duration: 5000,
                    persistent: false
                });
            } else {
                Notification.warning('حدث خطأ في تحميل بعض البيانات. سيتم استخدام البيانات المحلية.');
            }
        }
    },

    renderTabSkeleton(tab) {
        if (tab === 'overview') return this.renderOverviewTab(true);
        if (tab === 'contractors') return this.renderContractorsTab(true);
        return this.renderLogTab(true);
    },

    getBehaviors() {
        if (!AppState?.appData?.behaviorMonitoring || !Array.isArray(AppState.appData.behaviorMonitoring)) return [];
        return AppState.appData.behaviorMonitoring.map((b) => this.presentBehavior(b));
    },

    getRawBehaviorById(id) {
        const list = AppState?.appData?.behaviorMonitoring;
        if (!Array.isArray(list)) return null;
        return list.find((b) => b && b.id === id) || null;
    },

    /**
     * دمج مفاتيح بديلة (عربي / أسماء أعمدة قديمة / اختلاف حالة الأحرف) مع الحقول القياسية.
     */
    normalizeBehaviorRecord(raw) {
        if (!raw || typeof raw !== 'object') return raw;
        const out = { ...raw };
        const pick = (aliases) => {
            for (let i = 0; i < aliases.length; i++) {
                const k = aliases[i];
                if (!Object.prototype.hasOwnProperty.call(raw, k)) continue;
                const v = raw[k];
                if (v !== undefined && v !== null && String(v).trim() !== '') return v;
            }
            return undefined;
        };
        const setIfEmpty = (canon, aliases) => {
            const cur = out[canon];
            if (cur !== undefined && cur !== null && String(cur).trim() !== '') return;
            const pv = pick(aliases);
            if (pv !== undefined) out[canon] = pv;
        };
        setIfEmpty('isoCode', ['isoCode', 'ISO', 'IsoCode', 'كود ISO']);
        setIfEmpty('employeeCode', ['employeeCode', 'employee_number', 'EmployeeCode', 'الكود الوظيفي']);
        setIfEmpty('employeeNumber', ['employeeNumber', 'employeeCode', 'الكود الوظيفي']);
        setIfEmpty('employeeName', ['employeeName', 'EmployeeName', 'اسم الموظف']);
        setIfEmpty('department', ['department', 'Department', 'القسم', 'employeeDepartment', 'Dept']);
        setIfEmpty('job', ['job', 'Job', 'position', 'Position', 'الوظيفة', 'المسمى الوظيفي', 'jobTitle']);
        setIfEmpty('factory', ['factory', 'factoryId', 'Factory', 'FactoryId']);
        setIfEmpty('factoryId', ['factoryId', 'factory']);
        setIfEmpty('factoryName', ['factoryName', 'FactoryName', 'factory_name', 'اسم المصنع', 'المصنع', 'الموقع', 'موقع العمل', 'siteName', 'Site']);
        setIfEmpty('subLocation', ['subLocation', 'subLocationId', 'SubLocation']);
        setIfEmpty('subLocationId', ['subLocationId', 'subLocation']);
        setIfEmpty('subLocationName', ['subLocationName', 'sub_location_name', 'الموقع الفرعي', 'موقع فرعي', 'SubLocationName', 'المكان']);
        setIfEmpty('behaviorType', ['behaviorType', 'نوع التصرف', 'Type']);
        setIfEmpty('rating', ['rating', 'التقييم']);
        setIfEmpty('description', ['description', 'Description', 'الوصف', 'ملاحظات', 'Notes', 'details']);
        setIfEmpty('correctiveAction', ['correctiveAction', 'الإجراء التصحيحي']);
        setIfEmpty('correctiveActionDetails', ['correctiveActionDetails', 'تفاصيل الإجراء']);
        setIfEmpty('date', ['date', 'Date', 'التاريخ', 'behaviorDate']);
        setIfEmpty('photo', ['photo', 'Photo', 'صورة', 'image']);
        return out;
    },

    enrichBehaviorRecord(out) {
        if (!out || typeof out !== 'object') return out;
        const merged = { ...out };
        const code = String(merged.employeeCode || merged.employeeNumber || '').trim();
        const needDept = !String(merged.department || '').trim();
        const needJob = !String(merged.job || merged.position || '').trim();
        if (code && (needDept || needJob)) {
            const employees = Array.isArray(AppState?.appData?.employees) ? AppState.appData.employees : [];
            const emp = employees.find((e) =>
                String(e.employeeNumber || '').trim() === code ||
                String(e.sapId || '').trim() === code ||
                String(e.id || '').trim() === code
            );
            if (emp) {
                if (needDept) merged.department = emp.department || emp.dept || '';
                if (needJob) merged.job = emp.job || emp.position || emp.jobTitle || '';
            }
        }
        const factoryKey = String(merged.factoryId || merged.factory || '').trim();
        if (factoryKey && !String(merged.factoryName || '').trim()) {
            merged.factoryName = this.resolveSiteName(factoryKey);
        }
        if (!String(merged.factoryName || '').trim() && String(merged.factory || '').trim()) {
            merged.factoryName = this.resolveSiteName(merged.factory);
        }
        const subKey = String(merged.subLocationId || merged.subLocation || '').trim();
        if (subKey && !String(merged.subLocationName || '').trim()) {
            merged.subLocationName = this.resolvePlaceName(subKey, factoryKey || merged.factory);
        }
        return merged;
    },

    presentBehavior(raw) {
        if (!raw || typeof raw !== 'object') return raw;
        return this.enrichBehaviorRecord(this.normalizeBehaviorRecord(raw));
    },

    editBehavior(id) {
        const raw = this.getRawBehaviorById(id);
        if (!raw) {
            Notification.error('التصرف غير موجود');
            return;
        }
        this.showForm(this.presentBehavior(raw));
    },

    /** تاريخ عرض واضح بالعربية دون ترتيب غريب لـ toLocaleDateString(en-GB) */
    formatBehaviorDateDisplay(behaviorOrValue) {
        const v = behaviorOrValue && typeof behaviorOrValue === 'object' && !Array.isArray(behaviorOrValue)
            ? this.getBehaviorDate(behaviorOrValue)
            : behaviorOrValue;
        if (!v) return '—';
        try {
            let d;
            const s = String(v).trim();
            if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
                const p = s.split('-').map(Number);
                d = new Date(p[0], p[1] - 1, p[2]);
            } else {
                d = new Date(v);
            }
            if (isNaN(d.getTime())) return '—';
            return d.toLocaleDateString('ar-EG-u-ca-gregory', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return '—';
        }
    },

    parseDateSafe(value) {
        try {
            const d = value instanceof Date ? value : new Date(value);
            if (!d || Number.isNaN(d.getTime())) return null;
            return d;
        } catch (e) {
            return null;
        }
    },

    getBehaviorDate(behavior) {
        if (!behavior) return null;
        return behavior.date || behavior.Date || behavior['التاريخ'] || behavior.behaviorDate
            || behavior.createdAt || behavior.updatedAt || null;
    },

    /** يوم YYYY-MM-DD للمقارنة بدون وقت */
    normalizeBehaviorDayKey(dateValue) {
        const d = this.parseDateSafe ? this.parseDateSafe(dateValue) : null;
        if (!d || Number.isNaN(d.getTime())) {
            const raw = String(dateValue || '').trim();
            const m = raw.match(/^(\d{4}-\d{2}-\d{2})/);
            return m ? m[1] : '';
        }
        const y = d.getFullYear();
        const mo = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${mo}-${day}`;
    },

    normalizeBehaviorCompareText(value) {
        return String(value ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
    },

    isSameBehaviorEmployeePerson(existing, candidate) {
        const codeA = this.normalizeBehaviorCompareText(existing?.employeeCode || existing?.employeeNumber || existing?.employeeId);
        const codeB = this.normalizeBehaviorCompareText(candidate?.employeeCode || candidate?.employeeNumber || candidate?.employeeId);
        const nameA = this.normalizeBehaviorCompareText(existing?.employeeName);
        const nameB = this.normalizeBehaviorCompareText(candidate?.employeeName);
        if (codeA && codeB && codeA === codeB) return true;
        if (nameA && nameB && nameA === nameB) return true;
        return false;
    },

    isSameBehaviorContractorPerson(existing, candidate) {
        const idA = this.normalizeBehaviorCompareText(existing?.contractorId);
        const idB = this.normalizeBehaviorCompareText(candidate?.contractorId);
        const nameA = this.normalizeBehaviorCompareText(existing?.contractorName);
        const nameB = this.normalizeBehaviorCompareText(candidate?.contractorName);
        const workerA = this.normalizeBehaviorCompareText(existing?.contractorWorker);
        const workerB = this.normalizeBehaviorCompareText(candidate?.contractorWorker);
        const sameContractor = (idA && idB && idA === idB) || (nameA && nameB && nameA === nameB);
        if (!sameContractor) return false;
        return workerA === workerB;
    },

    isSameBehaviorPayload(existing, candidate) {
        if (this.normalizeBehaviorDayKey(this.getBehaviorDate(existing) || existing?.date) !== this.normalizeBehaviorDayKey(candidate?.date)) {
            return false;
        }
        if (this.normalizeBehaviorCompareText(existing?.behaviorType) !== this.normalizeBehaviorCompareText(candidate?.behaviorType)) return false;
        if (this.normalizeBehaviorCompareText(existing?.description) !== this.normalizeBehaviorCompareText(candidate?.description)) return false;
        if (this.normalizeBehaviorCompareText(existing?.rating) !== this.normalizeBehaviorCompareText(candidate?.rating)) return false;
        if (this.normalizeBehaviorCompareText(existing?.factoryId || existing?.factory) !== this.normalizeBehaviorCompareText(candidate?.factoryId || candidate?.factory)) return false;
        if (this.normalizeBehaviorCompareText(existing?.subLocationId || existing?.subLocation) !== this.normalizeBehaviorCompareText(candidate?.subLocationId || candidate?.subLocation)) return false;
        if (this.normalizeBehaviorCompareText(existing?.correctiveAction) !== this.normalizeBehaviorCompareText(candidate?.correctiveAction)) return false;
        return true;
    },

    /** سجل موظف مكرر: نفس الشخص + نفس اليوم + نفس بيانات التصرف */
    findDuplicateEmployeeBehavior(candidate, excludeId = null) {
        const list = Array.isArray(AppState?.appData?.behaviorMonitoring) ? AppState.appData.behaviorMonitoring : [];
        return list.find((b) => {
            if (!b || (excludeId && b.id === excludeId)) return false;
            if (!this.isSameBehaviorEmployeePerson(b, candidate)) return false;
            return this.isSameBehaviorPayload(b, candidate);
        }) || null;
    },

    /** سجل مقاول مكرر: نفس المقاول/العامل + نفس اليوم + نفس بيانات التصرف */
    findDuplicateContractorBehavior(candidate, excludeId = null) {
        const list = Array.isArray(AppState?.appData?.contractorBehaviorMonitoring) ? AppState.appData.contractorBehaviorMonitoring : [];
        return list.find((b) => {
            if (!b || (excludeId && b.id === excludeId)) return false;
            if (!this.isSameBehaviorContractorPerson(b, candidate)) return false;
            return this.isSameBehaviorPayload(b, candidate);
        }) || null;
    },

    isAdmin() {
        if (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserAdmin === 'function') {
            return !!Permissions.isCurrentUserAdmin();
        }
        const role = String(AppState?.currentUser?.role || '').trim().toLowerCase();
        return role === 'admin' || role === 'administrator' || role === 'system_admin' || role === 'مدير النظام';
    },

    canDeleteBehavior() {
        return this.isAdmin();
    },

    getEmployeeBehaviorDedupKey(b) {
        const person = this.normalizeBehaviorCompareText(b?.employeeCode || b?.employeeNumber || b?.employeeId || b?.employeeName);
        const day = this.normalizeBehaviorDayKey(this.getBehaviorDate(b) || b?.date);
        return [
            person,
            day,
            this.normalizeBehaviorCompareText(b?.behaviorType),
            this.normalizeBehaviorCompareText(b?.description),
            this.normalizeBehaviorCompareText(b?.rating),
            this.normalizeBehaviorCompareText(b?.factoryId || b?.factory),
            this.normalizeBehaviorCompareText(b?.subLocationId || b?.subLocation),
            this.normalizeBehaviorCompareText(b?.correctiveAction)
        ].join('|');
    },

    getContractorBehaviorDedupKey(b) {
        const person = [
            this.normalizeBehaviorCompareText(b?.contractorId || b?.contractorName),
            this.normalizeBehaviorCompareText(b?.contractorWorker)
        ].join('::');
        const day = this.normalizeBehaviorDayKey(this.getBehaviorDate(b) || b?.date);
        return [
            person,
            day,
            this.normalizeBehaviorCompareText(b?.behaviorType),
            this.normalizeBehaviorCompareText(b?.description),
            this.normalizeBehaviorCompareText(b?.rating),
            this.normalizeBehaviorCompareText(b?.factoryId || b?.factory),
            this.normalizeBehaviorCompareText(b?.subLocationId || b?.subLocation),
            this.normalizeBehaviorCompareText(b?.correctiveAction)
        ].join('|');
    },

    collectDuplicateBehaviorIdsToRemove(list, keyFn) {
        const groups = new Map();
        (Array.isArray(list) ? list : []).forEach((b) => {
            if (!b || !b.id) return;
            const key = keyFn.call(this, b);
            if (!key) return;
            const personPart = String(key).split('|')[0] || '';
            if (!personPart.trim()) return;
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(b);
        });
        const removeIds = [];
        groups.forEach((items) => {
            if (items.length < 2) return;
            items.sort((a, b) => {
                const ta = Date.parse(a.createdAt || a.updatedAt || a.date || 0) || 0;
                const tb = Date.parse(b.createdAt || b.updatedAt || b.date || 0) || 0;
                if (ta !== tb) return ta - tb;
                return String(a.id).localeCompare(String(b.id));
            });
            items.slice(1).forEach((dup) => removeIds.push(dup.id));
        });
        return removeIds;
    },

    async persistBehaviorList(sheetName, listKey) {
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        }
        if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.autoSave) {
            await GoogleIntegration.autoSave(sheetName, AppState.appData[listKey] || []);
        }
    },

    async deleteBehaviorById(id) {
        if (!this.canDeleteBehavior()) {
            Notification.error('الحذف متاح للمدير فقط');
            return;
        }
        const behaviorId = String(id || '').trim();
        if (!behaviorId) return;
        const raw = this.getRawBehaviorById(behaviorId);
        if (!raw) {
            Notification.error('التصرف غير موجود');
            return;
        }
        const label = `${raw.employeeName || raw.employeeCode || behaviorId} — ${this.formatBehaviorDateDisplay(raw) || ''}`;
        if (!window.confirm(`حذف تصرف الموظف؟\n${label}\n\nلا يمكن التراجع.`)) return;

        Loading.show();
        try {
            AppState.appData.behaviorMonitoring = (AppState.appData.behaviorMonitoring || []).filter((b) => b && b.id !== behaviorId);
            await this.persistBehaviorList('BehaviorMonitoring', 'behaviorMonitoring');
            Notification.success('تم حذف التصرف');
            document.querySelectorAll('.modal-overlay').forEach((m) => {
                if (m.classList.contains('bhm-detail-overlay') || m.querySelector('.bhm-detail-title')) {
                    m.remove();
                }
            });
            this.refreshCurrentTab();
        } catch (error) {
            Notification.error('فشل الحذف: ' + (error?.message || error));
        } finally {
            Loading.hide();
        }
    },

    async deleteContractorBehaviorById(id) {
        if (!this.canDeleteBehavior()) {
            Notification.error('الحذف متاح للمدير فقط');
            return;
        }
        const behaviorId = String(id || '').trim();
        if (!behaviorId) return;
        const raw = this.getRawContractorBehaviorById(behaviorId);
        if (!raw) {
            Notification.error('التصرف غير موجود');
            return;
        }
        const label = `${raw.contractorName || ''} / ${raw.contractorWorker || behaviorId} — ${this.formatBehaviorDateDisplay(raw) || ''}`;
        if (!window.confirm(`حذف تصرف المقاول؟\n${label}\n\nلا يمكن التراجع.`)) return;

        Loading.show();
        try {
            AppState.appData.contractorBehaviorMonitoring = (AppState.appData.contractorBehaviorMonitoring || [])
                .filter((b) => b && b.id !== behaviorId);
            await this.persistBehaviorList('ContractorBehaviorMonitoring', 'contractorBehaviorMonitoring');
            Notification.success('تم حذف التصرف');
            this.refreshCurrentTab();
        } catch (error) {
            Notification.error('فشل الحذف: ' + (error?.message || error));
        } finally {
            Loading.hide();
        }
    },

    async cleanupDuplicateEmployeeBehaviors() {
        if (!this.canDeleteBehavior()) {
            Notification.error('حذف المكررات متاح للمدير فقط');
            return;
        }
        const list = Array.isArray(AppState.appData.behaviorMonitoring) ? AppState.appData.behaviorMonitoring : [];
        const removeIds = this.collectDuplicateBehaviorIdsToRemove(list, this.getEmployeeBehaviorDedupKey);
        if (!removeIds.length) {
            Notification.info('لا توجد تصرفات موظفين مكررة');
            return;
        }
        if (!window.confirm(
            `سيتم حذف ${removeIds.length} سجل مكرر لتصرفات الموظفين.\n` +
            `يُبقى أقدم سجل لكل مجموعة (نفس الشخص + نفس اليوم + نفس البيانات).\nهل تريد المتابعة؟`
        )) return;

        Loading.show();
        try {
            const removeSet = new Set(removeIds.map(String));
            AppState.appData.behaviorMonitoring = list.filter((b) => b && !removeSet.has(String(b.id)));
            await this.persistBehaviorList('BehaviorMonitoring', 'behaviorMonitoring');
            Notification.success(`تم حذف ${removeIds.length} تصرف مكرر`);
            this.refreshCurrentTab();
        } catch (error) {
            Notification.error('فشل حذف المكررات: ' + (error?.message || error));
        } finally {
            Loading.hide();
        }
    },

    async cleanupDuplicateContractorBehaviors() {
        if (!this.canDeleteBehavior()) {
            Notification.error('حذف المكررات متاح للمدير فقط');
            return;
        }
        const list = Array.isArray(AppState.appData.contractorBehaviorMonitoring) ? AppState.appData.contractorBehaviorMonitoring : [];
        const removeIds = this.collectDuplicateBehaviorIdsToRemove(list, this.getContractorBehaviorDedupKey);
        if (!removeIds.length) {
            Notification.info('لا توجد تصرفات مقاولين مكررة');
            return;
        }
        if (!window.confirm(
            `سيتم حذف ${removeIds.length} سجل مكرر لتصرفات المقاولين.\n` +
            `يُبقى أقدم سجل لكل مجموعة (نفس المقاول/العامل + نفس اليوم + نفس البيانات).\nهل تريد المتابعة؟`
        )) return;

        Loading.show();
        try {
            const removeSet = new Set(removeIds.map(String));
            AppState.appData.contractorBehaviorMonitoring = list.filter((b) => b && !removeSet.has(String(b.id)));
            await this.persistBehaviorList('ContractorBehaviorMonitoring', 'contractorBehaviorMonitoring');
            Notification.success(`تم حذف ${removeIds.length} تصرف مكرر`);
            this.refreshCurrentTab();
        } catch (error) {
            Notification.error('فشل حذف المكررات: ' + (error?.message || error));
        } finally {
            Loading.hide();
        }
    },

    getBehaviorTypeBadgeClass(behaviorType) {
        if (behaviorType === 'إيجابي') return 'badge-success';
        if (behaviorType === 'سلبي') return 'badge-danger';
        return 'badge-secondary';
    },

    getRatingBadgeClass(rating) {
        if (rating === 'ممتاز') return 'badge-success';
        if (rating === 'جيد') return 'badge-primary';
        if (rating === 'مقبول') return 'badge-warning';
        if (rating === 'ضعيف') return 'badge-danger';
        return 'badge-secondary';
    },

    matchesSearch(behavior, q) {
        const query = (q || '').toString().trim().toLowerCase();
        if (!query) return true;
        const hay = [
            behavior?.isoCode,
            behavior?.employeeName,
            behavior?.employeeCode,
            behavior?.employeeNumber,
            behavior?.department,
            behavior?.factoryName,
            behavior?.subLocationName,
            behavior?.behaviorType,
            behavior?.rating,
            behavior?.description
        ].filter(Boolean).join(' ').toLowerCase();
        return hay.includes(query);
    },

    getFilteredBehaviors() {
        const all = this.getBehaviors();
        const filters = this.state?.filters || {};
        const behaviorType = (filters.behaviorType || '').toString().trim();
        const rating = (filters.rating || '').toString().trim();
        const q = (filters.search || '').toString();

        const from = filters.dateFrom ? this.parseDateSafe(filters.dateFrom) : null;
        const to = filters.dateTo ? this.parseDateSafe(filters.dateTo) : null;

        const filtered = all.filter((b) => {
            if (!this.matchesSearch(b, q)) return false;
            if (behaviorType && (b?.behaviorType || '') !== behaviorType) return false;
            if (rating && (b?.rating || '') !== rating) return false;

            const d = this.parseDateSafe(this.getBehaviorDate(b));
            if (from && (!d || d < from)) return false;
            if (to) {
                // include whole day for to
                const toEnd = new Date(to);
                toEnd.setHours(23, 59, 59, 999);
                if (!d || d > toEnd) return false;
            }

            return true;
        });

        const sort = this.state?.sort || 'date_desc';
        filtered.sort((a, b) => {
            const da = this.parseDateSafe(this.getBehaviorDate(a))?.getTime() || 0;
            const db = this.parseDateSafe(this.getBehaviorDate(b))?.getTime() || 0;
            return sort === 'date_asc' ? (da - db) : (db - da);
        });

        return filtered;
    },

    refreshCurrentTab() {
        const tab = this.state?.activeTab || 'log';
        if (tab === 'overview') {
            const container = document.getElementById('behavior-overview-container');
            if (container) container.innerHTML = this.renderOverviewTab(false);
            this.bindCurrentTabEvents();
            return;
        }
        if (tab === 'contractors') {
            const content = document.getElementById('behavior-content');
            if (content) content.innerHTML = this.renderContractorsTab(false);
            this.bindCurrentTabEvents();
            return;
        }
        // log
        const container = document.getElementById('behavior-log-container');
        if (container) container.innerHTML = this.renderLogTab(false);
        this.bindCurrentTabEvents();
    },

    async switchTab(tab, options = {}) {
        try {
            const requestedTab = tab || 'log';
            const nextTab = requestedTab === 'form' ? 'log' : requestedTab;
            this.state = this.state || {};
            this.state.activeTab = nextTab;

            // update active button style
            document.querySelectorAll('#behavior-monitoring-section .module-tab-btn').forEach((btn) => {
                const t = btn.getAttribute('data-tab');
                if (t === nextTab) btn.classList.add('active');
                else btn.classList.remove('active');
            });

            const content = document.getElementById('behavior-content');
            if (!content) return;

            if (nextTab === 'overview') content.innerHTML = this.renderOverviewTab(false);
            else if (nextTab === 'contractors') content.innerHTML = this.renderContractorsTab(false);
            else content.innerHTML = this.renderLogTab(false);

            this.bindCurrentTabEvents();

            // initial render: try show data quickly
            if (options?.initial && nextTab === 'log') {
                this.renderLogTable();
            }
            if (options?.initial && nextTab === 'contractors') {
                this.renderContractorLogTable();
            }
        } catch (e) {
            Utils.safeError('❌ خطأ في تبديل تبويب مراقبة السلوكيات:', e);
        }
    },

    renderOverviewTab(isSkeleton = false) {
        const employeeBehaviors = this.getBehaviors();
        const contractorBehaviors = this.getContractorBehaviors();
        const allBehaviors = [...employeeBehaviors, ...contractorBehaviors];
        const total = allBehaviors.length;
        const employeeCount = employeeBehaviors.length;
        const contractorCount = contractorBehaviors.length;
        const positives = allBehaviors.filter(b => b?.behaviorType === 'إيجابي').length;
        const negatives = allBehaviors.filter(b => b?.behaviorType === 'سلبي').length;
        const last5 = [...allBehaviors].sort((a, b) => {
            const da = this.parseDateSafe(this.getBehaviorDate(a))?.getTime() || 0;
            const db = this.parseDateSafe(this.getBehaviorDate(b))?.getTime() || 0;
            return db - da;
        }).slice(0, 5);
        const heading = this.t('module.behaviorMonitoring.overview.title', 'نظرة عامة');
        const totalLabel = this.t('module.behaviorMonitoring.overview.total', 'إجمالي السجلات');
        const employeeLabel = this.t('module.behaviorMonitoring.overview.employees', 'تصرفات الموظفين');
        const contractorLabel = this.t('module.behaviorMonitoring.overview.contractorsExternal', 'تصرفات المقاولين / شركات خارجية');
        const posLabel = this.t('module.behaviorMonitoring.overview.positive', 'تصرفات إيجابية');
        const negLabel = this.t('module.behaviorMonitoring.overview.negative', 'تصرفات سلبية');
        const recentLabel = this.t('module.behaviorMonitoring.overview.last5', 'آخر 5 تصرفات');
        const loadingLabel = this.t('common.loading', 'جاري التحميل...');
        const emptyLabel = this.t('module.behaviorMonitoring.overview.empty', 'لا توجد تصرفات مسجلة');

        return `
            <div id="behavior-overview-container">
                <div class="content-card behavior-overview-card">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-chart-line ml-2"></i>${Utils.escapeHTML(heading)}</h2>
                    </div>
                    <div class="card-body">
                        <div class="behavior-overview-stats-scroller mb-6">
                            <div class="behavior-overview-stats">
                                <div class="behavior-stat behavior-stat-total">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(totalLabel)}</p>
                                            <p class="behavior-stat-value">${isSkeleton ? '—' : total}</p>
                                        </div>
                                        <i class="fas fa-layer-group behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-employees">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(employeeLabel)}</p>
                                            <p class="behavior-stat-value">${isSkeleton ? '—' : employeeCount}</p>
                                        </div>
                                        <i class="fas fa-user-tie behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-contractors">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(contractorLabel)}</p>
                                            <p class="behavior-stat-value">${isSkeleton ? '—' : contractorCount}</p>
                                        </div>
                                        <i class="fas fa-users-cog behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-negative">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(negLabel)}</p>
                                            <p class="behavior-stat-value">${isSkeleton ? '—' : negatives}</p>
                                        </div>
                                        <i class="fas fa-triangle-exclamation behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="behavior-stat behavior-stat-positive">
                                    <div class="behavior-stat-inner">
                                        <div>
                                            <p class="stat-label behavior-stat-caption">${Utils.escapeHTML(posLabel)}</p>
                                            <p class="behavior-stat-value">${isSkeleton ? '—' : positives}</p>
                                        </div>
                                        <i class="fas fa-circle-check behavior-stat-fa" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="content-card behavior-mini-card">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-clock ml-2"></i>${Utils.escapeHTML(recentLabel)}</h3>
                            </div>
                            <div class="card-body">
                                ${isSkeleton ? `
                                    <div class="empty-state"><p class="text-gray-500">${Utils.escapeHTML(loadingLabel)}</p></div>
                                ` : (last5.length ? `
                                    <div class="table-wrapper" style="overflow-x:auto;">
                                        <table class="data-table table-header-purple">
                                            <thead>
                                                <tr>
                                                    <th>ISO</th>
                                                    <th>الاسم</th>
                                                    <th>الفئة</th>
                                                    <th>المصنع</th>
                                                    <th>الموقع الفرعي</th>
                                                    <th>نوع التصرف</th>
                                                    <th>التاريخ</th>
                                                    <th>التقييم</th>
                                                    <th class="text-center">إجراء</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${last5.map(b => `
                                                    <tr>
                                                        <td>${Utils.escapeHTML(b.isoCode || '')}</td>
                                                        <td>${Utils.escapeHTML(b.employeeName || b.contractorName || '')}</td>
                                                        <td>${Utils.escapeHTML(b.contractorName ? 'مقاول/شركة خارجية' : 'موظف')}</td>
                                                        <td>${Utils.escapeHTML(b.factoryName || b.factory || '—')}</td>
                                                        <td>${Utils.escapeHTML(b.subLocationName || b.subLocation || '—')}</td>
                                                        <td><span class="badge ${this.getBehaviorTypeBadgeClass(b.behaviorType)}">${Utils.escapeHTML(b.behaviorType || '—')}</span></td>
                                                        <td>${this.getBehaviorDate(b) ? this.formatBehaviorDateDisplay(b) : '—'}</td>
                                                        <td><span class="badge ${this.getRatingBadgeClass(b.rating)}">${Utils.escapeHTML(b.rating || '—')}</span></td>
                                                        <td class="text-center">
                                                            <button onclick="BehaviorMonitoring.viewBehavior(${JSON.stringify(String(b.id || ''))})" class="btn-icon btn-icon-primary" title="${this.t('common.view', 'عرض')}">
                                                                <i class="fas fa-eye"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                `).join('')}
                                            </tbody>
                                        </table>
                                    </div>
                                ` : `<div class="empty-state"><p class="text-gray-500">${Utils.escapeHTML(emptyLabel)}</p></div>`)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderLogTab(isSkeleton = false) {
        const filters = this.state?.filters || {};
        const safe = (v) => Utils.escapeHTML((v ?? '').toString());
        const activeFilterChips = this.renderEmployeeActiveFilterChips();

        return `
            <div id="behavior-log-container">
                <div class="content-card">
                    <div class="card-header flex flex-wrap items-center justify-between gap-2" style="padding: 12px 16px;">
                        <div class="flex items-center gap-2">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-list ml-2"></i>${this.t('module.behavior.employeeBehaviorsTitle', 'تصرفات الموظفين (بحث/فلترة)')}</h2>
                            <span class="badge badge-secondary" id="behavior-filter-count">${isSkeleton ? '—' : this.getFilteredBehaviors().length}</span>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            ${this.canDeleteBehavior() ? `
                            <button type="button" id="behavior-cleanup-duplicates-btn" class="btn-danger btn-sm" title="حذف السجلات المكررة لنفس الشخص ونفس اليوم ونفس البيانات">
                                <i class="fas fa-clone ml-1"></i>حذف المكررات
                            </button>
                            ` : ''}
                            <button id="behavior-export-csv-btn" class="btn-success btn-sm">
                                <i class="fas fa-file-csv ml-1"></i>${this.t('common.exportCSV', 'تصدير CSV')}
                            </button>
                        </div>
                    </div>
                    <div class="card-body" style="padding: 12px 16px;">
                        <div class="behavior-filter-card" style="width: 100%; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; align-items: flex-end; width: 100%;">
                                <div style="grid-column: span 2; min-width: 220px;">
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-search text-purple-600"></i> ${this.t('module.common.search', 'البحث')}
                                    </label>
                                    <div class="relative" style="width: 100%;">
                                        <input id="behavior-filter-search" type="text" class="form-input" style="height: 38px; width: 100%; padding-right: 34px;" placeholder="${this.t('common.searchPlaceholder', 'ISO / اسم / كود / وصف')}" value="${safe(filters.search)}" autocomplete="off">
                                        <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                                    </div>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-tags text-purple-600"></i> ${this.t('module.behavior.behaviorType', 'نوع التصرف')}
                                    </label>
                                    <select id="behavior-filter-type" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="">${this.t('common.allTypes', 'جميع الأنواع')}</option>
                                        <option value="إيجابي" ${filters.behaviorType === 'إيجابي' ? 'selected' : ''}>${this.t('module.behavior.positive', 'إيجابي')}</option>
                                        <option value="سلبي" ${filters.behaviorType === 'سلبي' ? 'selected' : ''}>${this.t('module.behavior.negative', 'سلبي')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-star text-purple-600"></i> ${this.t('module.behavior.rating', 'التقييم')}
                                    </label>
                                    <select id="behavior-filter-rating" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="">${this.t('common.allRatings', 'جميع التقييمات')}</option>
                                        <option value="ممتاز" ${filters.rating === 'ممتاز' ? 'selected' : ''}>${this.t('module.behavior.excellent', 'ممتاز')}</option>
                                        <option value="جيد" ${filters.rating === 'جيد' ? 'selected' : ''}>${this.t('module.behavior.good', 'جيد')}</option>
                                        <option value="مقبول" ${filters.rating === 'مقبول' ? 'selected' : ''}>${this.t('module.behavior.acceptable', 'مقبول')}</option>
                                        <option value="ضعيف" ${filters.rating === 'ضعيف' ? 'selected' : ''}>${this.t('module.behavior.poor', 'ضعيف')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-calendar-alt text-purple-600"></i> ${this.t('common.fromDate', 'من تاريخ')}
                                    </label>
                                    <input id="behavior-filter-from" type="date" class="form-input" style="height: 38px; width: 100%;" value="${safe(filters.dateFrom)}">
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-calendar-check text-purple-600"></i> ${this.t('common.toDate', 'إلى تاريخ')}
                                    </label>
                                    <input id="behavior-filter-to" type="date" class="form-input" style="height: 38px; width: 100%;" value="${safe(filters.dateTo)}">
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-sort-amount-down text-purple-600"></i> ${this.t('common.sort', 'الترتيب')}
                                    </label>
                                    <select id="behavior-sort" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="date_desc" ${this.state?.sort === 'date_desc' ? 'selected' : ''}>${this.t('common.newestFirst', 'الأحدث أولاً')}</option>
                                        <option value="date_asc" ${this.state?.sort === 'date_asc' ? 'selected' : ''}>${this.t('common.oldestFirst', 'الأقدم أولاً')}</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="button" id="behavior-clear-filters-btn" class="btn-secondary w-full" style="height: 38px; display: flex; align-items: center; justify-content: center; gap: 6px;" title="${this.t('common.clearFilters', 'مسح الفلاتر')}">
                                        <i class="fas fa-eraser"></i><span>${this.t('common.clearFilters', 'مسح')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="behavior-active-filter-chips" class="behavior-active-filter-chips">
                            ${activeFilterChips}
                        </div>
                        <div id="behavior-log-table-container">
                            ${isSkeleton ? `<div class="empty-state"><p class="text-gray-500">${this.t('common.loading', 'جاري التحميل...')}</p></div>` : this.renderLogTableHTML()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderEmployeeActiveFilterChips() {
        const filters = this.state?.filters || {};
        const chips = [];
        const pushChip = (label, value) => {
            const v = String(value || '').trim();
            if (!v) return;
            chips.push(`<span class="behavior-filter-chip"><strong>${Utils.escapeHTML(label)}:</strong> ${Utils.escapeHTML(v)}</span>`);
        };
        pushChip(this.t('module.common.search', 'البحث'), filters.search);
        pushChip('النوع', filters.behaviorType);
        pushChip('التقييم', filters.rating);
        pushChip('من', filters.dateFrom);
        pushChip('إلى', filters.dateTo);
        if (!chips.length) {
            return `<span class="behavior-filter-chip behavior-filter-chip-muted">${this.t('module.behavior.noActiveFilters', 'لا توجد فلاتر مفعلة')}</span>`;
        }
        return chips.join('');
    },

    renderLogTableHTML() {
        const all = this.getFilteredBehaviors();
        if (!all.length) {
            return `<div class="empty-state"><p class="text-gray-500">${this.t('common.noMatchingResults', 'لا توجد نتائج مطابقة للفلاتر الحالية')}</p></div>`;
        }
        const pageInfo = this.paginateItems(all, this.state.logPage || 1);
        this.state.logPage = pageInfo.page;
        const behaviors = pageInfo.items;

        return `
            <div class="table-wrapper" style="overflow-x:auto;">
                <table class="data-table table-header-purple">
                    <thead>
                        <tr>
                            <th>${this.t('module.behavior.isoCode', 'كود ISO')}</th>
                            <th>${this.t('module.behavior.employeeName', 'اسم الموظف')}</th>
                            <th>${this.t('module.behavior.factory', 'المصنع')}</th>
                            <th>${this.t('module.behavior.subLocation', 'الموقع الفرعي')}</th>
                            <th>${this.t('module.behavior.behaviorType', 'نوع التصرف')}</th>
                            <th>${this.t('module.behavior.date', 'التاريخ')}</th>
                            <th>${this.t('module.behavior.rating', 'التقييم')}</th>
                            <th class="text-center">${this.t('common.actions', 'الإجراءات')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${behaviors.map(b => `
                            <tr>
                                <td>${Utils.escapeHTML(b.isoCode || '')}</td>
                                <td>
                                    <div class="flex flex-col">
                                        <span class="font-semibold">${Utils.escapeHTML(b.employeeName || '')}</span>
                                        <span class="text-xs text-gray-500">${Utils.escapeHTML(b.employeeCode || b.employeeNumber || '')}</span>
                                    </div>
                                </td>
                                <td>${Utils.escapeHTML(b.factoryName || b.factory || '—')}</td>
                                <td>${Utils.escapeHTML(b.subLocationName || b.subLocation || '—')}</td>
                                <td><span class="badge ${this.getBehaviorTypeBadgeClass(b.behaviorType)}">${Utils.escapeHTML(b.behaviorType || '—')}</span></td>
                                <td>${this.getBehaviorDate(b) ? this.formatBehaviorDateDisplay(b) : '—'}</td>
                                <td><span class="badge ${this.getRatingBadgeClass(b.rating)}">${Utils.escapeHTML(b.rating || '—')}</span></td>
                                <td class="text-center bhm-log-table-actions">
                                    <div class="flex items-center justify-center gap-2 flex-wrap">
                                        <button type="button" onclick="BehaviorMonitoring.viewBehavior(${JSON.stringify(String(b.id || ''))})" class="btn-icon btn-icon-primary bhm-action-icon" title="${this.t('common.view', 'عرض')}">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        ${this.canDeleteBehavior() ? `
                                        <button type="button" onclick="BehaviorMonitoring.deleteBehaviorById(${JSON.stringify(String(b.id || ''))})" class="btn-icon btn-icon-danger bhm-action-icon" title="${this.t('common.delete', 'حذف')}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        ` : ''}
                                        <button type="button" onclick="BehaviorMonitoring.exportPDF(${JSON.stringify(String(b.id || ''))})" class="btn-icon btn-icon-success bhm-action-icon" title="${this.t('common.exportPDF', 'تصدير PDF')}">
                                            <i class="fas fa-file-pdf"></i>
                                        </button>
                                        <button type="button" onclick="BehaviorMonitoring.printReport(${JSON.stringify(String(b.id || ''))})" class="btn-icon btn-icon-info bhm-action-icon" title="${this.t('common.print', 'طباعة')}">
                                            <i class="fas fa-print"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ${this.renderTablePaginationHTML('employee', pageInfo)}
        `;
    },

    renderLogTable() {
        const tableContainer = document.getElementById('behavior-log-table-container');
        if (tableContainer) tableContainer.innerHTML = this.renderLogTableHTML();
        const countEl = document.getElementById('behavior-filter-count');
        if (countEl) countEl.textContent = String(this.getFilteredBehaviors().length);
        const chipsEl = document.getElementById('behavior-active-filter-chips');
        if (chipsEl) chipsEl.innerHTML = this.renderEmployeeActiveFilterChips();
    },

    clearFilters() {
        this.state.filters = { search: '', behaviorType: '', rating: '', dateFrom: '', dateTo: '' };
        this.state.sort = 'date_desc';
        this.state.logPage = 1;
        this.refreshCurrentTab();
    },

    exportLogCSV() {
        const rows = this.getFilteredBehaviors();
        if (!rows.length) {
            Notification.info('لا توجد بيانات لتصديرها');
            return;
        }

        const escapeCsv = (v) => {
            const s = (v ?? '').toString().replace(/\r?\n/g, ' ').trim();
            if (s.includes('"') || s.includes(',') || s.includes(';')) {
                return `"${s.replace(/"/g, '""')}"`;
            }
            return s;
        };

        const header = ['ISO', 'EmployeeName', 'EmployeeCode', 'Department', 'Job', 'Factory', 'SubLocation', 'BehaviorType', 'Date', 'Rating', 'CorrectiveAction', 'CorrectiveActionDetails', 'Description'];
        const csv = [
            header.join(','),
            ...rows.map(b => [
                escapeCsv(b.isoCode || ''),
                escapeCsv(b.employeeName || ''),
                escapeCsv(b.employeeCode || b.employeeNumber || ''),
                escapeCsv(b.department || ''),
                escapeCsv(b.job || b.position || ''),
                escapeCsv(b.factoryName || b.factory || ''),
                escapeCsv(b.subLocationName || b.subLocation || ''),
                escapeCsv(b.behaviorType || ''),
                escapeCsv(this.getBehaviorDate(b) ? Utils.formatDateForInput(this.getBehaviorDate(b)) : ''),
                escapeCsv(b.rating || ''),
                escapeCsv(b.correctiveAction || ''),
                escapeCsv(b.correctiveActionDetails || ''),
                escapeCsv(b.description || '')
            ].join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `BehaviorMonitoring_Log_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    },

    renderFormTab(isSkeleton = false) {
        const uid = `bhm-tab-${Date.now()}`;
        return `
            <div id="behavior-form-container">
                <div class="content-card behavior-form-card">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-pen-to-square ml-2"></i>${this.t('module.behavior.recordBehavior', 'تسجيل تصرف')}</h2>
                    </div>
                    <div class="card-body">
                        ${isSkeleton ? `<div class="empty-state"><p class="text-gray-500">${this.t('common.loading', 'جاري التحميل...')}</p></div>` : this.getBehaviorFormHTML(null, uid, { inline: true })}
                    </div>
                </div>
            </div>
        `;
    },

    bindCurrentTabEvents() {
        // reset listeners for current tab
        if (this._eventListenersAbortController) {
            this._eventListenersAbortController.abort();
        }
        this._eventListenersAbortController = new AbortController();
        const signal = this._eventListenersAbortController.signal;

        const tab = this.state?.activeTab || 'log';
        if (tab === 'log') {
            const search = document.getElementById('behavior-filter-search');
            const type = document.getElementById('behavior-filter-type');
            const rating = document.getElementById('behavior-filter-rating');
            const from = document.getElementById('behavior-filter-from');
            const to = document.getElementById('behavior-filter-to');
            const sort = document.getElementById('behavior-sort');
            const clearBtn = document.getElementById('behavior-clear-filters-btn');
            const exportBtn = document.getElementById('behavior-export-csv-btn');

            const onAnyChange = () => {
                this.state.filters = this.state.filters || {};
                this.state.filters.search = (search?.value || '').toString();
                this.state.filters.behaviorType = (type?.value || '').toString();
                this.state.filters.rating = (rating?.value || '').toString();
                this.state.filters.dateFrom = (from?.value || '').toString();
                this.state.filters.dateTo = (to?.value || '').toString();
                this.state.sort = (sort?.value || 'date_desc').toString();
                this.state.logPage = 1;
                this.renderLogTable();
            };

            search?.addEventListener('input', onAnyChange, { signal });
            type?.addEventListener('change', onAnyChange, { signal });
            rating?.addEventListener('change', onAnyChange, { signal });
            from?.addEventListener('change', onAnyChange, { signal });
            to?.addEventListener('change', onAnyChange, { signal });
            sort?.addEventListener('change', onAnyChange, { signal });
            clearBtn?.addEventListener('click', () => this.clearFilters(), { signal });
            exportBtn?.addEventListener('click', () => this.exportLogCSV(), { signal });
            document.getElementById('behavior-cleanup-duplicates-btn')
                ?.addEventListener('click', () => this.cleanupDuplicateEmployeeBehaviors(), { signal });

            // first render
            this.renderLogTable();
            return;
        }

        if (tab === 'form') {
            // bind inline form (we rendered with unique ids)
            const form = document.querySelector('#behavior-form-container form[data-behavior-form="true"]');
            const uid = form?.getAttribute('data-form-uid');
            if (form && uid) {
                this.bindBehaviorForm({ form, uid, data: null, modal: null, signal });
                const wrap = document.getElementById('behavior-form-container');
                if (wrap && typeof Utils.hydrateDriveProxyImages === 'function') {
                    Utils.hydrateDriveProxyImages(wrap, {
                        onFetchFail: (img) => {
                            try {
                                img.onerror = null;
                                img.removeAttribute('src');
                            } catch (e) { /* ignore */ }
                        }
                    });
                }
            }
            return;
        }

        if (tab === 'contractors') {
            const search = document.getElementById('bhmc-filter-search');
            const type = document.getElementById('bhmc-filter-type');
            const rating = document.getElementById('bhmc-filter-rating');
            const from = document.getElementById('bhmc-filter-from');
            const to = document.getElementById('bhmc-filter-to');
            const sort = document.getElementById('bhmc-sort');
            const clearBtn = document.getElementById('bhmc-clear-filters-btn');
            const exportBtn = document.getElementById('bhmc-export-csv-btn');
            const addBtn = document.getElementById('behavior-add-contractor-btn');

            const onAnyChange = () => {
                this.state.contractorFilters = this.state.contractorFilters || {};
                this.state.contractorFilters.search = (search?.value || '').toString();
                this.state.contractorFilters.behaviorType = (type?.value || '').toString();
                this.state.contractorFilters.rating = (rating?.value || '').toString();
                this.state.contractorFilters.dateFrom = (from?.value || '').toString();
                this.state.contractorFilters.dateTo = (to?.value || '').toString();
                this.state.contractorSort = (sort?.value || 'date_desc').toString();
                this.state.contractorLogPage = 1;
                this.renderContractorLogTable();
            };

            search?.addEventListener('input', onAnyChange, { signal });
            type?.addEventListener('change', onAnyChange, { signal });
            rating?.addEventListener('change', onAnyChange, { signal });
            from?.addEventListener('change', onAnyChange, { signal });
            to?.addEventListener('change', onAnyChange, { signal });
            sort?.addEventListener('change', onAnyChange, { signal });
            clearBtn?.addEventListener('click', () => this.clearContractorFilters(), { signal });
            exportBtn?.addEventListener('click', () => this.exportContractorLogCSV(), { signal });
            addBtn?.addEventListener('click', () => this.showContractorForm(null), { signal });
            document.getElementById('bhmc-cleanup-duplicates-btn')
                ?.addEventListener('click', () => this.cleanupDuplicateContractorBehaviors(), { signal });

            this.renderContractorLogTable();
        }
    },

    setupEventListeners() {
        // تنظيف timeout القديم إن وجد
        if (this._setupTimeoutId) {
            clearTimeout(this._setupTimeoutId);
        }

        this._setupTimeoutId = setTimeout(() => {
            const addBtn = document.getElementById('behavior-add-btn');
            if (addBtn) addBtn.addEventListener('click', () => this.showForm(), { passive: true });

            const addContractorHeaderBtn = document.getElementById('behavior-add-contractor-header-btn');
            if (addContractorHeaderBtn) {
                addContractorHeaderBtn.addEventListener('click', () => this.showContractorForm(null), { passive: true });
            }

            const refreshBtn = document.getElementById('behavior-refresh-btn');
            if (refreshBtn) refreshBtn.addEventListener('click', () => {
                this.loadBehaviorDataAsync();
                Notification.success('تم تحديث البيانات');
            }, { passive: true });
        }, 50);
    },

    getBehaviorFormHTML(data = null, uid, options = {}) {
        const ids = {
            employeeCode: `${uid}-employee-code`,
            employeeName: `${uid}-employee-name`,
            dropdown: `${uid}-employee-dropdown`,
            department: `${uid}-department`,
            job: `${uid}-job`,
            factory: `${uid}-factory`,
            subLocation: `${uid}-sublocation`,
            photoInput: `${uid}-photo-input`,
            photoPreview: `${uid}-photo-preview`,
            photoImg: `${uid}-photo-img`,
            behaviorType: `${uid}-type`,
            behaviorDate: `${uid}-date`,
            behaviorRating: `${uid}-rating`,
            correctiveAction: `${uid}-corrective-action`,
            correctiveActionDetails: `${uid}-corrective-action-details`,
            description: `${uid}-description`,
            saveBtn: `${uid}-save-btn`
        };

        const dateValue = data?.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        const inline = !!options.inline;

        const sites = this.getSiteOptions();
        const selectedFactory = data?.factory || data?.factoryId || data?.siteId || '';
        const selectedSub = data?.subLocation || data?.subLocationId || data?.location || '';
        const resolvedFactoryId =
            sites.find(s => s.id === selectedFactory)?.id ||
            sites.find(s => s.name === selectedFactory)?.id ||
            selectedFactory;
        const places = this.getPlaceOptions(resolvedFactoryId);
        const resolvedSubId =
            places.find(p => p.id === selectedSub)?.id ||
            places.find(p => p.name === selectedSub)?.id ||
            selectedSub;
        const isNegative = (data?.behaviorType || '') === 'سلبي';

        const existingPhoto = this.processPhoto(data?.photo);
        const photoDisp = existingPhoto && typeof Utils.resolveDriveAwareImgDisplay === 'function'
            ? Utils.resolveDriveAwareImgDisplay(existingPhoto)
            : { canonical: existingPhoto || '', displaySrc: existingPhoto || '', needsProxy: false, proxyFileId: '' };
        const photoThumbSrc = photoDisp.canonical ? photoDisp.displaySrc : '';
        const photoThumbProxyAttr = typeof Utils.driveProxyImgAttrs === 'function' ? Utils.driveProxyImgAttrs(photoDisp) : '';

        return `
            <div class="behavior-form-wrapper bhm-form ${inline ? 'behavior-form-inline' : 'behavior-form-modal'}" data-behavior-type="${Utils.escapeHTML(data?.behaviorType || '')}">
                <form data-behavior-form="true" data-form-uid="${uid}" class="bhm-form-inner">
                    <section class="bhm-section" aria-labelledby="${uid}-sec-emp">
                        <div class="bhm-section-head" id="${uid}-sec-emp">
                            <span class="bhm-section-icon" aria-hidden="true"><i class="fas fa-id-card"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t('module.behavior.form.employeeSection', 'بيانات الموظف')}</h4>
                                <p class="bhm-section-hint">${this.t('module.behavior.form.employeeHint', 'الكود والاسم والقسم والوظيفة')}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${ids.employeeCode}" class="bhm-label">${this.t('module.behavior.form.employeeCode', 'الكود الوظيفي')} <span class="bhm-req">*</span></label>
                                    <input type="text" id="${ids.employeeCode}" required class="form-input bhm-input"
                                        value="${Utils.escapeHTML(data?.employeeCode || data?.employeeNumber || '')}" placeholder="${this.t('module.behavior.form.employeeCodePh', 'أدخل الكود الوظيفي')}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.employeeName}" class="bhm-label">${this.t('module.behavior.employeeName', 'اسم الموظف')} <span class="bhm-req">*</span></label>
                                    <div class="relative">
                                        <input type="text" id="${ids.employeeName}" required class="form-input bhm-input"
                                            value="${Utils.escapeHTML(data?.employeeName || '')}" placeholder="${this.t('module.behavior.form.employeeNamePh', 'ابحث بالاسم أو الكود')}" autocomplete="off">
                                        <div id="${ids.dropdown}" class="hse-lookup-dropdown absolute z-50 hidden w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"></div>
                                    </div>
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.department}" class="bhm-label">${this.t('module.behavior.form.department', 'القسم')} <span class="bhm-req">*</span></label>
                                    <input type="text" id="${ids.department}" required class="form-input bhm-input"
                                        value="${Utils.escapeHTML(data?.department || data?.employeeDepartment || '')}" placeholder="${this.t('module.behavior.form.autoFillPh', 'يُعبَّأ تلقائياً من بيانات الموظف')}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.job}" class="bhm-label">${this.t('module.behavior.form.job', 'الوظيفة')} <span class="bhm-req">*</span></label>
                                    <input type="text" id="${ids.job}" required class="form-input bhm-input"
                                        value="${Utils.escapeHTML(data?.job || data?.position || data?.employeeJob || '')}" placeholder="${this.t('module.behavior.form.autoFillPh', 'يُعبَّأ تلقائياً من بيانات الموظف')}">
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="bhm-section" aria-labelledby="${uid}-sec-act">
                        <div class="bhm-section-head" id="${uid}-sec-act">
                            <span class="bhm-section-icon bhm-section-icon--violet" aria-hidden="true"><i class="fas fa-clipboard-list"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t('module.behavior.form.detailsSection', 'تفاصيل التصرف')}</h4>
                                <p class="bhm-section-hint">${this.t('module.behavior.form.detailsHint', 'النوع، التاريخ، والتقييم')}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-3">
                                <div class="bhm-field bhm-field-type">
                                    <div class="bhm-label-row">
                                        <label for="${ids.behaviorType}" class="bhm-label mb-0">${this.t('module.behavior.behaviorType', 'نوع التصرف')} <span class="bhm-req">*</span></label>
                                        <span class="badge ${this.getBehaviorTypeBadgeClass(data?.behaviorType)} bhm-type-chip" id="${uid}-type-badge">${Utils.escapeHTML(data?.behaviorType || '—')}</span>
                                    </div>
                                    <select id="${ids.behaviorType}" required class="form-input bhm-input mt-2">
                                        <option value="">${this.t('module.behavior.selectType', 'اختر النوع')}</option>
                                        <option value="إيجابي" ${data?.behaviorType === 'إيجابي' ? 'selected' : ''}>${this.t('module.behavior.positive', 'إيجابي')}</option>
                                        <option value="سلبي" ${data?.behaviorType === 'سلبي' ? 'selected' : ''}>${this.t('module.behavior.negative', 'سلبي')}</option>
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.behaviorDate}" class="bhm-label">${this.t('module.behavior.date', 'التاريخ')} <span class="bhm-req">*</span></label>
                                    <input type="date" id="${ids.behaviorDate}" required class="form-input bhm-input" value="${dateValue}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.behaviorRating}" class="bhm-label">${this.t('module.behavior.rating', 'التقييم')} <span class="bhm-req">*</span></label>
                                    <select id="${ids.behaviorRating}" required class="form-input bhm-input">
                                        <option value="">${this.t('module.behavior.selectRating', 'اختر التقييم')}</option>
                                        <option value="ممتاز" ${data?.rating === 'ممتاز' ? 'selected' : ''}>${this.t('module.behavior.excellent', 'ممتاز')}</option>
                                        <option value="جيد" ${data?.rating === 'جيد' ? 'selected' : ''}>${this.t('module.behavior.good', 'جيد')}</option>
                                        <option value="مقبول" ${data?.rating === 'مقبول' ? 'selected' : ''}>${this.t('module.behavior.acceptable', 'مقبول')}</option>
                                        <option value="ضعيف" ${data?.rating === 'ضعيف' ? 'selected' : ''}>${this.t('module.behavior.poor', 'ضعيف')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="bhm-section" aria-labelledby="${uid}-sec-loc">
                        <div class="bhm-section-head" id="${uid}-sec-loc">
                            <span class="bhm-section-icon bhm-section-icon--teal" aria-hidden="true"><i class="fas fa-map-marked-alt"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t('module.behavior.form.locationSection', 'الموقع')}</h4>
                                <p class="bhm-section-hint">${this.t('module.behavior.form.locationHint', 'المصنع والموقع الفرعي للملاحظة')}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${ids.factory}" class="bhm-label"><i class="fas fa-industry ml-1 opacity-70"></i> ${this.t('module.behavior.factory', 'المصنع')} <span class="bhm-req">*</span></label>
                                    <select id="${ids.factory}" required class="form-input bhm-input">
                                        <option value="">${this.t('module.behavior.selectFactory', 'اختر المصنع')}</option>
                                        ${sites.map(site => `
                                            <option value="${site.id}" ${(resolvedFactoryId === site.id || selectedFactory === site.name) ? 'selected' : ''}>${Utils.escapeHTML(site.name)}</option>
                                        `).join('')}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.subLocation}" class="bhm-label"><i class="fas fa-map-marker-alt ml-1 opacity-70"></i> ${this.t('module.behavior.subLocation', 'الموقع الفرعي')} <span class="bhm-req">*</span></label>
                                    <select id="${ids.subLocation}" required class="form-input bhm-input">
                                        <option value="">${this.t('module.behavior.selectSubLocation', 'اختر الموقع الفرعي')}</option>
                                        ${places.map(place => `
                                            <option value="${place.id}" ${(resolvedSubId === place.id || selectedSub === place.name) ? 'selected' : ''}>${Utils.escapeHTML(place.name)}</option>
                                        `).join('')}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="${uid}-negative-section" class="bhm-negative-panel" style="${isNegative ? '' : 'display:none;'}">
                        <div class="bhm-negative-head">
                            <span class="bhm-negative-icon" aria-hidden="true"><i class="fas fa-exclamation-triangle"></i></span>
                            <div>
                                <h4 class="bhm-negative-title">${this.t('module.behavior.form.correctiveTitle', 'إجراء تصحيحي (للتصرف السلبي)')}</h4>
                                <p class="bhm-negative-sub">${this.t('module.behavior.form.correctiveHint', 'يظهر هذا القسم عند اختيار تصرف سلبي فقط')}</p>
                            </div>
                        </div>
                        <div class="bhm-negative-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${ids.correctiveAction}" class="bhm-label">${this.t('module.behavior.form.correctiveAction', 'الإجراء التصحيحي')} <span class="bhm-req">*</span></label>
                                    <select id="${ids.correctiveAction}" class="form-input bhm-input" ${isNegative ? 'required' : ''}>
                                        <option value="">${this.t('module.behavior.selectAction', 'اختر الإجراء')}</option>
                                        ${this.NEGATIVE_ACTIONS.map(a => `
                                            <option value="${Utils.escapeHTML(a)}" ${data?.correctiveAction === a ? 'selected' : ''}>${Utils.escapeHTML(a)}</option>
                                        `).join('')}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.correctiveActionDetails}" class="bhm-label">${this.t('module.behavior.form.extraDetails', 'تفاصيل إضافية')} <span class="bhm-optional">(${this.t('common.optional', 'اختياري')})</span></label>
                                    <input type="text" id="${ids.correctiveActionDetails}" class="form-input bhm-input"
                                        value="${Utils.escapeHTML(data?.correctiveActionDetails || '')}" placeholder="مثال: تدريب على SOP-01 / إنذار رقم…">
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="bhm-section bhm-section--media" aria-labelledby="${uid}-sec-desc">
                        <div class="bhm-section-head" id="${uid}-sec-desc">
                            <span class="bhm-section-icon bhm-section-icon--amber" aria-hidden="true"><i class="fas fa-align-right"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t('module.behavior.form.descSection', 'الوصف والمرفقات')}</h4>
                                <p class="bhm-section-hint">${this.t('module.behavior.form.descHint', 'وصف التصرف وصورة اختيارية')}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-media">
                                <div class="bhm-field bhm-upload-wrap">
                                    <label for="${ids.photoInput}" class="bhm-label"><i class="fas fa-image ml-1 opacity-70"></i> ${this.t('module.behavior.form.photo', 'صورة')} <span class="bhm-optional">(${this.t('common.optional', 'اختياري')})</span></label>
                                    <div class="bhm-file-slot">
                                        <input type="file" id="${ids.photoInput}" accept="image/*" class="bhm-file-input">
                                        <span class="bhm-file-hint">${this.t('module.behavior.form.photoHint', 'PNG أو JPG — حتى 2 ميجا')}</span>
                                    </div>
                                    <div id="${ids.photoPreview}" class="bhm-photo-preview mt-3 ${data?.photo ? '' : 'hidden'}">
                                        <img src="${Utils.escapeHTML(photoThumbSrc)}" alt="معاينة"${photoThumbProxyAttr} class="bhm-photo-thumb" id="${ids.photoImg}">
                                        <button type="button" class="bhm-photo-clear" data-action="clear-photo">${this.t('module.behavior.form.clearPhoto', 'حذف الصورة')}</button>
                                    </div>
                                </div>
                                <div class="bhm-field bhm-field-grow">
                                    <label for="${ids.description}" class="bhm-label">${this.t('module.behavior.form.description', 'الوصف')} <span class="bhm-req">*</span></label>
                                    <textarea id="${ids.description}" required class="form-input bhm-input bhm-textarea" rows="5" placeholder="${this.t('module.behavior.form.descriptionPh', 'وصف التصرف والظروف…')}">${Utils.escapeHTML(data?.description || '')}</textarea>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div class="bhm-form-footer">
                        ${inline ? '' : `<button type="button" class="btn-secondary bhm-btn-cancel" data-action="cancel-form">${this.t('common.cancel', 'إلغاء')}</button>`}
                        <button type="button" id="${ids.saveBtn}" class="btn-primary bhm-btn-save">
                            <i class="fas fa-save ml-2"></i>
                            ${this.t('common.save', 'حفظ')}
                        </button>
                    </div>
                </form>
            </div>
        `;
    },

    bindBehaviorForm({ form, uid, data, modal, signal }) {
        // Employee autocomplete
        if (typeof EmployeeHelper !== 'undefined') {
            try {
                EmployeeHelper.setupAutocomplete(`${uid}-employee-name`, (employee) => {
                    if (employee) {
                        const codeEl = document.getElementById(`${uid}-employee-code`);
                        const nameEl = document.getElementById(`${uid}-employee-name`);
                        const depEl = document.getElementById(`${uid}-department`);
                        const jobEl = document.getElementById(`${uid}-job`);
                        if (codeEl) codeEl.value = employee.code || '';
                        if (nameEl) nameEl.value = employee.name || '';
                        if (depEl && (employee.department || employee.employeeDepartment)) depEl.value = employee.department || employee.employeeDepartment || '';
                        if (jobEl && (employee.job || employee.position || employee.title)) jobEl.value = employee.job || employee.position || employee.title || '';
                    }
                });
                EmployeeHelper.setupEmployeeCodeSearch(`${uid}-employee-code`, `${uid}-employee-name`);
            } catch (e) {
                Utils.safeWarn('⚠️ تعذر تفعيل البحث عن الموظف:', e);
            }
        }

        // مزامنة القسم/الوظيفة عند تغيير الكود/الاسم (في حال لم يعيد EmployeeHelper تفاصيل كافية)
        const syncEmployeeMeta = () => {
            try {
                const code = (document.getElementById(`${uid}-employee-code`)?.value || '').trim();
                const name = (document.getElementById(`${uid}-employee-name`)?.value || '').trim();
                const employees = Array.isArray(AppState?.appData?.employees) ? AppState.appData.employees : [];
                const emp = employees.find(e =>
                    (code && ((e.employeeNumber && e.employeeNumber === code) || (e.sapId && e.sapId === code))) ||
                    (name && (e.name === name))
                );
                if (!emp) return;
                const depEl = document.getElementById(`${uid}-department`);
                const jobEl = document.getElementById(`${uid}-job`);
                if (depEl && !depEl.value) depEl.value = emp.department || emp.employeeDepartment || '';
                if (jobEl && !jobEl.value) jobEl.value = emp.job || emp.position || emp.title || '';
            } catch (e) {
                // ignore
            }
        };
        document.getElementById(`${uid}-employee-code`)?.addEventListener('blur', syncEmployeeMeta, { signal });
        document.getElementById(`${uid}-employee-name`)?.addEventListener('blur', syncEmployeeMeta, { signal });

        // Photo preview
        const photoInput = document.getElementById(`${uid}-photo-input`);
        const photoPreview = document.getElementById(`${uid}-photo-preview`);
        const photoImg = document.getElementById(`${uid}-photo-img`);

        if (photoInput && photoPreview && photoImg) {
            photoInput.addEventListener('change', (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                    Notification.error('حجم الصورة كبير جداً. الحد الأقصى 2MB');
                    photoInput.value = '';
                    return;
                }
                const reader = new FileReader();
                reader.onload = (ev) => {
                    photoImg.src = ev.target.result;
                    photoPreview.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }, { signal });
        }

        // Clear photo
        form.querySelector('[data-action="clear-photo"]')?.addEventListener('click', () => {
            const inp = document.getElementById(`${uid}-photo-input`);
            const preview = document.getElementById(`${uid}-photo-preview`);
            if (inp) inp.value = '';
            if (preview) preview.classList.add('hidden');
        }, { signal });

        // Theme badge + header tint
        const typeSelect = document.getElementById(`${uid}-type`);
        const typeBadge = document.getElementById(`${uid}-type-badge`);
        const wrapper = form.closest('.behavior-form-wrapper') || form.parentElement;
        const negativeSection = document.getElementById(`${uid}-negative-section`);
        const correctiveActionEl = document.getElementById(`${uid}-corrective-action`);
        const applyType = (t) => {
            if (wrapper) wrapper.setAttribute('data-behavior-type', t || '');
            if (typeBadge) {
                typeBadge.className = `badge ${this.getBehaviorTypeBadgeClass(t)}`;
                typeBadge.textContent = t || '—';
            }
            const modalContent = modal?.querySelector?.('.behavior-modal');
            if (modalContent) modalContent.setAttribute('data-behavior-type', t || '');

            // إظهار/إخفاء قسم الإجراء التصحيحي للتصرف السلبي
            const isNegative = (t || '') === 'سلبي';
            if (negativeSection) negativeSection.style.display = isNegative ? '' : 'none';
            if (correctiveActionEl) {
                if (isNegative) correctiveActionEl.setAttribute('required', 'required');
                else correctiveActionEl.removeAttribute('required');
            }
        };
        applyType(typeSelect?.value || data?.behaviorType || '');
        typeSelect?.addEventListener('change', () => applyType(typeSelect.value), { signal });

        // ربط المصنع -> تحديث المواقع الفرعية
        const factoryEl = document.getElementById(`${uid}-factory`);
        const subEl = document.getElementById(`${uid}-sublocation`);
        const refreshPlaces = () => {
            if (!factoryEl || !subEl) return;
            const factoryId = factoryEl.value;
            const places = this.getPlaceOptions(factoryId);
            const prev = subEl.value;
            subEl.innerHTML = `
                <option value="">${this.t('module.behavior.selectSubLocation', 'اختر الموقع الفرعي')}</option>
                ${places.map(p => `<option value="${p.id}">${Utils.escapeHTML(p.name)}</option>`).join('')}
            `;
            if (prev && places.some(p => p.id === prev)) subEl.value = prev;
        };
        factoryEl?.addEventListener('change', refreshPlaces, { signal });

        // Cancel (modal)
        form.querySelector('[data-action="cancel-form"]')?.addEventListener('click', () => modal?.remove(), { signal });

        // Save
        const saveBtn = document.getElementById(`${uid}-save-btn`);
        saveBtn?.addEventListener('click', () => this.handleSubmit({ uid, form, editId: data?.id || null, modal }), { signal });
    },

    async showForm(data = null) {
        if (typeof Permissions !== 'undefined' && Permissions.ensureFormSettingsState) {
            try { await Permissions.ensureFormSettingsState(); } catch (e) { /* ignore */ }
        }
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        const uid = `bhm-modal-${Date.now()}`;
        modal.innerHTML = `
            <div class="modal-content behavior-modal bhm-registration-modal" data-behavior-type="${Utils.escapeHTML(data?.behaviorType || '')}">
                <div class="bhm-modal-hero">
                    <div class="bhm-modal-hero-text">
                        <p class="bhm-modal-kicker"><i class="fas fa-user-check ml-2"></i>مراقبة السلوكيات</p>
                        <h2 class="bhm-modal-title">${data ? this.t('module.behavior.editBehavior', 'تعديل التصرف') : this.t('module.behavior.addEmployee', 'تسجيل تصرف موظف')}</h2>
                        <p class="bhm-modal-sub">${data ? 'تحديث بيانات التسجيل ثم احفظ.' : 'أدخل بيانات الموظف والموقع ثم وصف التصرف.'}</p>
                    </div>
                    <button type="button" class="bhm-modal-close" onclick="this.closest('.modal-overlay').remove()" aria-label="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body bhm-modal-body">
                    ${this.getBehaviorFormHTML(data, uid, { inline: false })}
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // bind form in modal with isolated listeners
        if (this._modalAbortController) this._modalAbortController.abort();
        this._modalAbortController = new AbortController();
        const signal = this._modalAbortController.signal;

        const form = modal.querySelector('form[data-behavior-form="true"]');
        if (form) this.bindBehaviorForm({ form, uid, data, modal, signal });

        if (typeof Utils.hydrateDriveProxyImages === 'function') {
            Utils.hydrateDriveProxyImages(modal, {
                onFetchFail: (img) => {
                    try {
                        img.onerror = null;
                        img.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22200%22 height=%22150%22/%3E%3Ctext fill=%22%23999%22 font-size=%2212%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3Eمعاينة%3C/text%3E%3C/svg%3E';
                    } catch (e) { /* ignore */ }
                }
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        }, { signal });
    },

    async convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    async handleSubmit({ uid, form, editId = null, modal }) {
        if (this._employeeSubmitLock) {
            Notification.warning('جاري حفظ التصرف... يرجى الانتظار لمنع التكرار');
            return;
        }

        const saveBtn = document.getElementById(`${uid}-save-btn`);
        this._employeeSubmitLock = true;
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.setAttribute('aria-busy', 'true');
        }

        try {
            // معالجة الصورة
            let photoBase64 = editId ? (this.getBehaviors().find(b => b.id === editId)?.photo || '') : '';
            const photoInput = document.getElementById(`${uid}-photo-input`);
            if (photoInput && photoInput.files.length > 0) {
                const file = photoInput.files[0];
                if (file.size > 2 * 1024 * 1024) {
                    Notification.error('حجم الصورة كبير جداً. الحد الأقصى 2MB');
                    return;
                }
                photoBase64 = await this.convertImageToBase64(file);
            }

            const employeeCode = (document.getElementById(`${uid}-employee-code`)?.value || '').trim();
            const employeeName = (document.getElementById(`${uid}-employee-name`)?.value || '').trim();
            const employees = Array.isArray(AppState?.appData?.employees) ? AppState.appData.employees : [];
            const employee = employees.find(e =>
                (e.employeeNumber && e.employeeNumber === employeeCode) ||
                (e.sapId && e.sapId === employeeCode) ||
                e.name === employeeName
            );

            // فحص العناصر قبل الاستخدام
            const behaviorTypeEl = document.getElementById(`${uid}-type`);
            const behaviorDateEl = document.getElementById(`${uid}-date`);
            const behaviorRatingEl = document.getElementById(`${uid}-rating`);
            const behaviorDescriptionEl = document.getElementById(`${uid}-description`);
            const departmentEl = document.getElementById(`${uid}-department`);
            const jobEl = document.getElementById(`${uid}-job`);
            const factoryEl = document.getElementById(`${uid}-factory`);
            const subEl = document.getElementById(`${uid}-sublocation`);
            const correctiveActionEl = document.getElementById(`${uid}-corrective-action`);
            const correctiveActionDetailsEl = document.getElementById(`${uid}-corrective-action-details`);

            if (!behaviorTypeEl || !behaviorDateEl || !behaviorRatingEl || !behaviorDescriptionEl || !departmentEl || !jobEl || !factoryEl || !subEl) {
                Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
                return;
            }

            // تحقق إضافي: عند التصرف السلبي يجب إدخال إجراء تصحيحي
            const isNegative = (behaviorTypeEl.value || '') === 'سلبي';
            if (isNegative && (!correctiveActionEl || !correctiveActionEl.value)) {
                Notification.error('يرجى اختيار الإجراء التصحيحي للتصرف السلبي');
                return;
            }

            const formData = {
                id: editId || Utils.generateId('BEHAV'),
                isoCode: generateISOCode('BEH', AppState.appData.behaviorMonitoring),
                employeeId: employee?.id || '',
                employeeCode: employeeCode,
                employeeNumber: employeeCode,
                employeeName: employeeName,
                department: (departmentEl.value || '').trim(),
                job: (jobEl.value || '').trim(),
                factory: (factoryEl.value || '').trim(),
                factoryId: factoryEl.value ? String(factoryEl.value).trim() : null,
                factoryName: this.resolveSiteName(factoryEl.value),
                subLocation: (subEl.value || '').trim(),
                subLocationId: subEl.value ? String(subEl.value).trim() : null,
                subLocationName: this.resolvePlaceName(subEl.value, factoryEl.value),
                photo: photoBase64,
                behaviorType: behaviorTypeEl.value,
                date: new Date(behaviorDateEl.value).toISOString(),
                rating: behaviorRatingEl.value,
                correctiveAction: isNegative ? (correctiveActionEl?.value || '') : '',
                correctiveActionDetails: isNegative ? ((correctiveActionDetailsEl?.value || '').trim()) : '',
                description: behaviorDescriptionEl.value.trim(),
                createdAt: editId ? this.getBehaviors().find(b => b.id === editId)?.createdAt : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // منع تكرار نفس الشخص + نفس اليوم + نفس بيانات التصرف
            const duplicate = this.findDuplicateEmployeeBehavior(formData, editId);
            if (duplicate) {
                Notification.warning('تم تسجيل نفس التصرف لنفس الشخص في نفس التاريخ مسبقاً. لن يتم التكرار.');
                return;
            }

            Loading.show();
            try {
                if (editId) {
                    const index = AppState.appData.behaviorMonitoring.findIndex(b => b.id === editId);
                    if (index !== -1) AppState.appData.behaviorMonitoring[index] = formData;
                    Notification.success('تم تحديث التصرف بنجاح');
                } else {
                    // فحص أخير قبل الدفع (ضغط مزدوج سريع)
                    if (this.findDuplicateEmployeeBehavior(formData, editId)) {
                        Notification.warning('تم تسجيل نفس التصرف مسبقاً. لن يتم التكرار.');
                        return;
                    }
                    AppState.appData.behaviorMonitoring.push(formData);
                    Notification.success('تم تسجيل التصرف بنجاح');
                }

                // حفظ البيانات باستخدام window.DataManager
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                } else {
                    Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
                }

                // حفظ تلقائي في Google Sheets
                await GoogleIntegration.autoSave('BehaviorMonitoring', AppState.appData.behaviorMonitoring);

                if (modal) modal.remove();
                this.refreshCurrentTab();
            } catch (error) {
                Notification.error('حدث خطأ: ' + error.message);
            } finally {
                Loading.hide();
            }
        } finally {
            this._employeeSubmitLock = false;
            if (saveBtn && document.body.contains(saveBtn)) {
                saveBtn.disabled = false;
                saveBtn.removeAttribute('aria-busy');
            }
        }
    },

    async viewBehavior(id) {
        const raw = this.getRawBehaviorById(id);
        if (!raw) {
            Notification.error('التصرف غير موجود');
            return;
        }
        const behavior = this.presentBehavior(raw);
        const esc = (v) => Utils.escapeHTML((v ?? '').toString());
        const valOrDash = (v) => {
            const s = (v ?? '').toString().trim();
            return s ? esc(s) : '<span class="bhm-detail-empty">—</span>';
        };
        const descText = (behavior.description || '').toString().trim();
        const descBlock = descText
            ? `<div class="bhm-detail-value bhm-detail-desc">${esc(descText)}</div>`
            : '<div class="bhm-detail-empty-block"><i class="fas fa-align-right ml-2"></i>لا يوجد وصف مسجل لهذا التصرف.</div>';
        const dateStr = this.getBehaviorDate(behavior) ? this.formatBehaviorDateDisplay(behavior) : '—';

        const modal = document.createElement('div');
        modal.className = 'modal-overlay bhm-detail-overlay';
        modal.innerHTML = `
            <div class="modal-content behavior-modal bhm-detail-modal" style="max-width: 820px;">
                <div class="bhm-detail-hero">
                    <div class="bhm-detail-hero-text">
                        <p class="bhm-detail-kicker"><i class="fas fa-clipboard-list ml-2"></i>مراقبة السلوكيات</p>
                        <h2 class="bhm-detail-title">تفاصيل التصرف</h2>
                        <p class="bhm-detail-sub">${esc(behavior.isoCode || '—')} <span class="bhm-detail-sub-sep">·</span> ${esc(behavior.employeeName || '')}</p>
                    </div>
                    <button type="button" class="bhm-detail-close" onclick="this.closest('.modal-overlay').remove()" aria-label="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body bhm-detail-body">
                    <div class="bhm-detail-grid">
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">كود ISO</span>
                            <div class="bhm-detail-value">${valOrDash(behavior.isoCode)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">الكود الوظيفي</span>
                            <div class="bhm-detail-value">${valOrDash(behavior.employeeCode || behavior.employeeNumber)}</div>
                        </div>
                        <div class="bhm-detail-field bhm-detail-field-span2">
                            <span class="bhm-detail-label">اسم الموظف</span>
                            <div class="bhm-detail-value bhm-detail-value-strong">${valOrDash(behavior.employeeName)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">القسم</span>
                            <div class="bhm-detail-value">${valOrDash(behavior.department || behavior.employeeDepartment)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">الوظيفة</span>
                            <div class="bhm-detail-value">${valOrDash(behavior.job || behavior.position)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">المصنع / الموقع</span>
                            <div class="bhm-detail-value">${valOrDash(behavior.factoryName || behavior.factory)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">الموقع الفرعي</span>
                            <div class="bhm-detail-value">${valOrDash(behavior.subLocationName || behavior.subLocation)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">نوع التصرف</span>
                            <div class="bhm-detail-value">
                                <span class="badge ${this.getBehaviorTypeBadgeClass(behavior.behaviorType)}">${esc(behavior.behaviorType || '—')}</span>
                            </div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">التاريخ</span>
                            <div class="bhm-detail-value">${dateStr === '—' ? '<span class="bhm-detail-empty">—</span>' : esc(dateStr)}</div>
                        </div>
                        <div class="bhm-detail-field">
                            <span class="bhm-detail-label">التقييم</span>
                            <div class="bhm-detail-value">
                                <span class="badge ${this.getRatingBadgeClass(behavior.rating)}">${esc(behavior.rating || '—')}</span>
                            </div>
                        </div>
                        <div class="bhm-detail-field bhm-detail-field-span2">
                            <span class="bhm-detail-label">الوصف</span>
                            ${descBlock}
                        </div>
                        ${(behavior.behaviorType === 'سلبي' && (behavior.correctiveAction || behavior.correctiveActionDetails)) ? `
                            <div class="bhm-detail-field bhm-detail-field-span2 bhm-detail-corrective">
                                <span class="bhm-detail-label">الإجراء التصحيحي</span>
                                <div class="bhm-detail-value">
                                    <span class="badge badge-danger">${esc(behavior.correctiveAction || '—')}</span>
                                    ${behavior.correctiveActionDetails ? `<div class="bhm-detail-corrective-details">${esc(behavior.correctiveActionDetails)}</div>` : ''}
                                </div>
                            </div>
                        ` : ''}
                        ${(() => {
                            const photoUrl = this.processPhoto(behavior.photo);
                            if (!photoUrl) return '';
                            const disp = typeof Utils.resolveDriveAwareImgDisplay === 'function'
                                ? Utils.resolveDriveAwareImgDisplay(photoUrl)
                                : { canonical: photoUrl, displaySrc: photoUrl, needsProxy: false, proxyFileId: '' };
                            const pa = typeof Utils.driveProxyImgAttrs === 'function' ? Utils.driveProxyImgAttrs(disp) : '';
                            return `
                            <div class="bhm-detail-field bhm-detail-field-span2">
                                <span class="bhm-detail-label">الصورة</span>
                                <div class="bhm-detail-photo-wrap">
                                    <img src="${Utils.escapeHTML(disp.displaySrc)}" alt="صورة التصرف"${pa} class="bhm-detail-photo"
                                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';">
                                </div>
                            </div>
                        `;})()}
                    </div>
                </div>
                <div class="bhm-detail-footer">
                    <button type="button" class="btn-primary" onclick="BehaviorMonitoring.editBehavior(${JSON.stringify(String(behavior.id || ''))}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-pen ml-2"></i>تعديل
                    </button>
                    ${typeof EmailDispatch !== 'undefined' ? EmailDispatch.renderFooterButtonHtml('behavior-monitoring') : ''}
                    ${this.canDeleteBehavior() ? `
                    <button type="button" class="btn-danger" onclick="BehaviorMonitoring.deleteBehaviorById(${JSON.stringify(String(behavior.id || ''))});">
                        <i class="fas fa-trash ml-2"></i>حذف
                    </button>
                    ` : ''}
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.printReport(${JSON.stringify(String(behavior.id || ''))});">
                        <i class="fas fa-print ml-2"></i>طباعة
                    </button>
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.exportPDF(${JSON.stringify(String(behavior.id || ''))});">
                        <i class="fas fa-file-pdf ml-2"></i>تصدير PDF
                    </button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        if (typeof EmailDispatch !== 'undefined') {
            EmailDispatch.bindFooterButtons(modal, { moduleKey: 'behavior-monitoring', record: behavior, recordId: behavior.id || behavior.isoCode || '' });
        }
        if (typeof Utils.hydrateDriveProxyImages === 'function') {
            Utils.hydrateDriveProxyImages(modal, {
                onFetchFail: (img) => {
                    try {
                        img.onerror = null;
                        img.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';
                    } catch (e) { /* ignore */ }
                }
            });
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async exportPDF(id) {
        const raw = this.getRawBehaviorById(id);
        if (!raw) {
            Notification.error('التصرف غير موجود');
            return;
        }
        const behavior = this.presentBehavior(raw);

        try {
            Loading.show();
            const formCode = behavior.isoCode || `BEH-${behavior.id?.substring(0, 8) || 'UNKNOWN'}`;
            const formTitle = 'تقرير مراقبة التصرفات';
            const pdfDate = this.getBehaviorDate(behavior) ? this.formatBehaviorDateDisplay(behavior) : '—';

            const content = `
                <table>
                    <tr><th>كود ISO</th><td>${Utils.escapeHTML(behavior.isoCode || '')}</td></tr>
                    <tr><th>الكود الوظيفي</th><td>${Utils.escapeHTML(behavior.employeeCode || behavior.employeeNumber || '')}</td></tr>
                    <tr><th>اسم الموظف</th><td>${Utils.escapeHTML(behavior.employeeName || '')}</td></tr>
                    <tr><th>القسم</th><td>${Utils.escapeHTML(behavior.department || behavior.employeeDepartment || '')}</td></tr>
                    <tr><th>الوظيفة</th><td>${Utils.escapeHTML(behavior.job || behavior.position || '')}</td></tr>
                    <tr><th>المصنع</th><td>${Utils.escapeHTML(behavior.factoryName || behavior.factory || '')}</td></tr>
                    <tr><th>الموقع الفرعي</th><td>${Utils.escapeHTML(behavior.subLocationName || behavior.subLocation || '')}</td></tr>
                    <tr><th>نوع التصرف</th><td>${Utils.escapeHTML(behavior.behaviorType || '')}</td></tr>
                    <tr><th>التاريخ</th><td>${Utils.escapeHTML(pdfDate)}</td></tr>
                    <tr><th>التقييم</th><td>${Utils.escapeHTML(behavior.rating || '')}</td></tr>
                    ${(behavior.behaviorType === 'سلبي' && (behavior.correctiveAction || behavior.correctiveActionDetails)) ? `
                        <tr><th>الإجراء التصحيحي</th><td>${Utils.escapeHTML(behavior.correctiveAction || '')}</td></tr>
                        <tr><th>تفاصيل الإجراء</th><td>${Utils.escapeHTML(behavior.correctiveActionDetails || '')}</td></tr>
                    ` : ''}
                    <tr><th colspan="2">الوصف</th></tr>
                    <tr><td colspan="2">${Utils.escapeHTML(behavior.description || '')}</td></tr>
                </table>
                ${(() => {
                    const photoUrl = this.processPhoto(behavior.photo);
                    return photoUrl ? `
                <div class="section-title">صورة التصرف:</div>
                <div style="text-align: center; margin: 20px 0;">
                    <img src="${Utils.escapeHTML(photoUrl)}" alt="صورة التصرف" style="max-width: 100%; max-height: 400px; border: 1px solid #ddd; border-radius: 8px;"
                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';">
                </div>
                ` : '';})()}
            `;

            const htmlContent = typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML
                ? FormHeader.generatePDFHTML(formCode, formTitle, content, false, true, { version: '1.0' }, behavior.createdAt, behavior.updatedAt)
                : `<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>متابعة السلوك</title></head><body>${content}</body></html>`;

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
                Notification.error('يرجى السماح بالنوافذ المنبثقة');
            }
        } catch (error) {
            Loading.hide();
            // Ensure cleanup on error
            if (typeof url !== 'undefined') {
                URL.revokeObjectURL(url);
            }
            Notification.error('حدث خطأ في تصدير PDF: ' + error.message);
        }
    },

    async printReport(id) {
        await this.exportPDF(id);
    },

    // ----- تصرفات المقاولين (ورقة ContractorBehaviorMonitoring) -----

    getContractorBehaviors() {
        if (!AppState?.appData?.contractorBehaviorMonitoring || !Array.isArray(AppState.appData.contractorBehaviorMonitoring)) return [];
        return AppState.appData.contractorBehaviorMonitoring.map((b) => this.presentContractorBehavior(b));
    },

    getRawContractorBehaviorById(id) {
        const list = AppState?.appData?.contractorBehaviorMonitoring;
        if (!Array.isArray(list)) return null;
        return list.find((b) => b && b.id === id) || null;
    },

    normalizeContractorBehaviorRecord(raw) {
        if (!raw || typeof raw !== 'object') return raw;
        const out = { ...raw };
        const pick = (aliases) => {
            for (let i = 0; i < aliases.length; i++) {
                const k = aliases[i];
                if (!Object.prototype.hasOwnProperty.call(raw, k)) continue;
                const v = raw[k];
                if (v !== undefined && v !== null && String(v).trim() !== '') return v;
            }
            return undefined;
        };
        const setIfEmpty = (canon, aliases) => {
            const cur = out[canon];
            if (cur !== undefined && cur !== null && String(cur).trim() !== '') return;
            const pv = pick(aliases);
            if (pv !== undefined) out[canon] = pv;
        };
        setIfEmpty('isoCode', ['isoCode', 'ISO', 'IsoCode', 'كود ISO']);
        setIfEmpty('contractorId', ['contractorId', 'ContractorId', 'معرف المقاول']);
        setIfEmpty('contractorName', ['contractorName', 'اسم المقاول', 'ContractorName']);
        setIfEmpty('contractorWorker', ['contractorWorker', 'عامل المقاول', 'ContractorWorker']);
        setIfEmpty('department', ['department', 'القسم', 'Dept']);
        setIfEmpty('job', ['job', 'position', 'الوظيفة', 'jobTitle']);
        setIfEmpty('factory', ['factory', 'factoryId', 'Factory']);
        setIfEmpty('factoryId', ['factoryId', 'factory']);
        setIfEmpty('factoryName', ['factoryName', 'اسم المصنع', 'المصنع', 'siteName']);
        setIfEmpty('subLocation', ['subLocation', 'subLocationId']);
        setIfEmpty('subLocationId', ['subLocationId', 'subLocation']);
        setIfEmpty('subLocationName', ['subLocationName', 'الموقع الفرعي', 'SubLocationName']);
        setIfEmpty('behaviorType', ['behaviorType', 'نوع التصرف', 'Type']);
        setIfEmpty('rating', ['rating', 'التقييم']);
        setIfEmpty('description', ['description', 'الوصف', 'Notes']);
        setIfEmpty('correctiveAction', ['correctiveAction', 'الإجراء التصحيحي']);
        setIfEmpty('correctiveActionDetails', ['correctiveActionDetails', 'تفاصيل الإجراء']);
        setIfEmpty('date', ['date', 'Date', 'التاريخ', 'behaviorDate']);
        setIfEmpty('photo', ['photo', 'صورة', 'Photo']);
        return out;
    },

    enrichContractorBehaviorRecord(out) {
        if (!out || typeof out !== 'object') return out;
        const merged = { ...out };
        const factoryKey = String(merged.factoryId || merged.factory || '').trim();
        if (factoryKey && !String(merged.factoryName || '').trim()) {
            merged.factoryName = this.resolveSiteName(factoryKey);
        }
        if (!String(merged.factoryName || '').trim() && String(merged.factory || '').trim()) {
            merged.factoryName = this.resolveSiteName(merged.factory);
        }
        const subKey = String(merged.subLocationId || merged.subLocation || '').trim();
        if (subKey && !String(merged.subLocationName || '').trim()) {
            merged.subLocationName = this.resolvePlaceName(subKey, factoryKey || merged.factory);
        }
        return merged;
    },

    presentContractorBehavior(raw) {
        if (!raw || typeof raw !== 'object') return raw;
        return this.enrichContractorBehaviorRecord(this.normalizeContractorBehaviorRecord(raw));
    },

    matchesContractorSearch(behavior, q) {
        const query = (q || '').toString().trim().toLowerCase();
        if (!query) return true;
        const hay = [
            behavior?.isoCode,
            behavior?.contractorName,
            behavior?.contractorWorker,
            behavior?.department,
            behavior?.factoryName,
            behavior?.subLocationName,
            behavior?.behaviorType,
            behavior?.rating,
            behavior?.description
        ].filter(Boolean).join(' ').toLowerCase();
        return hay.includes(query);
    },

    getFilteredContractorBehaviors() {
        const all = this.getContractorBehaviors();
        const filters = this.state?.contractorFilters || {};
        const behaviorType = (filters.behaviorType || '').toString().trim();
        const rating = (filters.rating || '').toString().trim();
        const q = (filters.search || '').toString();
        const from = filters.dateFrom ? this.parseDateSafe(filters.dateFrom) : null;
        const to = filters.dateTo ? this.parseDateSafe(filters.dateTo) : null;
        const filtered = all.filter((b) => {
            if (!this.matchesContractorSearch(b, q)) return false;
            if (behaviorType && (b?.behaviorType || '') !== behaviorType) return false;
            if (rating && (b?.rating || '') !== rating) return false;
            const d = this.parseDateSafe(this.getBehaviorDate(b));
            if (from && (!d || d < from)) return false;
            if (to) {
                const toEnd = new Date(to);
                toEnd.setHours(23, 59, 59, 999);
                if (!d || d > toEnd) return false;
            }
            return true;
        });
        const sort = this.state?.contractorSort || 'date_desc';
        filtered.sort((a, b) => {
            const da = this.parseDateSafe(this.getBehaviorDate(a))?.getTime() || 0;
            const db = this.parseDateSafe(this.getBehaviorDate(b))?.getTime() || 0;
            return sort === 'date_asc' ? (da - db) : (db - da);
        });
        return filtered;
    },

    clearContractorFilters() {
        this.state.contractorFilters = { search: '', behaviorType: '', rating: '', dateFrom: '', dateTo: '' };
        this.state.contractorSort = 'date_desc';
        this.state.contractorLogPage = 1;
        this.refreshCurrentTab();
    },

    renderContractorsTab(isSkeleton = false) {
        const filters = this.state?.contractorFilters || {};
        const safe = (v) => Utils.escapeHTML((v ?? '').toString());
        const countLabel = isSkeleton ? '—' : String(this.getFilteredContractorBehaviors().length);
        return `
            <div id="behavior-contractors-container">
                <div class="content-card">
                    <div class="card-header flex flex-wrap items-center justify-between gap-2" style="padding: 12px 16px;">
                        <div class="flex items-center gap-2">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-users-cog ml-2"></i>${this.t('module.behavior.contractorBehaviorsTitle', 'سجل تصرفات المقاولين')}</h2>
                            <span class="badge badge-secondary" id="bhmc-filter-count">${countLabel}</span>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <button type="button" id="behavior-add-contractor-btn" class="btn-primary btn-sm">
                                <i class="fas fa-plus ml-1"></i>${this.t('module.behavior.addContractor', 'تسجيل تصرف مقاول')}
                            </button>
                            ${this.canDeleteBehavior() ? `
                            <button type="button" id="bhmc-cleanup-duplicates-btn" class="btn-danger btn-sm" title="حذف السجلات المكررة لنفس المقاول/العامل ونفس اليوم ونفس البيانات">
                                <i class="fas fa-clone ml-1"></i>حذف المكررات
                            </button>
                            ` : ''}
                            <button id="bhmc-export-csv-btn" class="btn-success btn-sm">
                                <i class="fas fa-file-csv ml-1"></i>${this.t('common.exportCSV', 'تصدير CSV')}
                            </button>
                        </div>
                    </div>
                    <div class="card-body" style="padding: 12px 16px;">
                        <div class="behavior-filter-card" style="width: 100%; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; align-items: flex-end; width: 100%;">
                                <div style="grid-column: span 2; min-width: 220px;">
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-search text-purple-600"></i> ${this.t('module.common.search', 'البحث')}
                                    </label>
                                    <div class="relative" style="width: 100%;">
                                        <input id="bhmc-filter-search" type="text" class="form-input" style="height: 38px; width: 100%; padding-right: 34px;" placeholder="${this.t('common.searchPlaceholder', 'ISO / مقاول / عامل / وصف')}" value="${safe(filters.search)}" autocomplete="off">
                                        <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                                    </div>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-tags text-purple-600"></i> ${this.t('module.behavior.behaviorType', 'نوع التصرف')}
                                    </label>
                                    <select id="bhmc-filter-type" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="">${this.t('common.allTypes', 'جميع الأنواع')}</option>
                                        <option value="إيجابي" ${filters.behaviorType === 'إيجابي' ? 'selected' : ''}>${this.t('module.behavior.positive', 'إيجابي')}</option>
                                        <option value="سلبي" ${filters.behaviorType === 'سلبي' ? 'selected' : ''}>${this.t('module.behavior.negative', 'سلبي')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-star text-purple-600"></i> ${this.t('module.behavior.rating', 'التقييم')}
                                    </label>
                                    <select id="bhmc-filter-rating" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="">${this.t('common.allRatings', 'جميع التقييمات')}</option>
                                        <option value="ممتاز" ${filters.rating === 'ممتاز' ? 'selected' : ''}>${this.t('module.behavior.excellent', 'ممتاز')}</option>
                                        <option value="جيد" ${filters.rating === 'جيد' ? 'selected' : ''}>${this.t('module.behavior.good', 'جيد')}</option>
                                        <option value="مقبول" ${filters.rating === 'مقبول' ? 'selected' : ''}>${this.t('module.behavior.acceptable', 'مقبول')}</option>
                                        <option value="ضعيف" ${filters.rating === 'ضعيف' ? 'selected' : ''}>${this.t('module.behavior.poor', 'ضعيف')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-calendar-alt text-purple-600"></i> ${this.t('common.fromDate', 'من تاريخ')}
                                    </label>
                                    <input id="bhmc-filter-from" type="date" class="form-input" style="height: 38px; width: 100%;" value="${safe(filters.dateFrom)}">
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-calendar-check text-purple-600"></i> ${this.t('common.toDate', 'إلى تاريخ')}
                                    </label>
                                    <input id="bhmc-filter-to" type="date" class="form-input" style="height: 38px; width: 100%;" value="${safe(filters.dateTo)}">
                                </div>
                                <div>
                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                        <i class="fas fa-sort-amount-down text-purple-600"></i> ${this.t('common.sort', 'الترتيب')}
                                    </label>
                                    <select id="bhmc-sort" class="form-input" style="height: 38px; width: 100%;">
                                        <option value="date_desc" ${this.state?.contractorSort === 'date_desc' ? 'selected' : ''}>${this.t('common.newestFirst', 'الأحدث أولاً')}</option>
                                        <option value="date_asc" ${this.state?.contractorSort === 'date_asc' ? 'selected' : ''}>${this.t('common.oldestFirst', 'الأقدم أولاً')}</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="button" id="bhmc-clear-filters-btn" class="btn-secondary w-full" style="height: 38px; display: flex; align-items: center; justify-content: center; gap: 6px;" title="${this.t('common.clearFilters', 'مسح الفلاتر')}">
                                        <i class="fas fa-eraser"></i><span>${this.t('common.clearFilters', 'مسح')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="bhmc-log-table-container">
                            ${isSkeleton ? `<div class="empty-state"><p class="text-gray-500">${this.t('common.loading', 'جاري التحميل...')}</p></div>` : this.renderContractorLogTableHTML()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderContractorLogTableHTML() {
        const all = this.getFilteredContractorBehaviors();
        if (!all.length) {
            return `<div class="empty-state"><p class="text-gray-500">${this.t('common.noMatchingResults', 'لا توجد نتائج مطابقة للفلاتر الحالية')}</p></div>`;
        }
        const pageInfo = this.paginateItems(all, this.state.contractorLogPage || 1);
        this.state.contractorLogPage = pageInfo.page;
        const behaviors = pageInfo.items;
        return `
            <div class="table-wrapper" style="overflow-x:auto;">
                <table class="data-table table-header-purple">
                    <thead>
                        <tr>
                            <th style="width: 110px;">${this.t('module.behavior.isoCode', 'كود ISO')}</th>
                            <th>${this.t('module.behavior.contractorName', 'المقاول')}</th>
                            <th style="width: 140px;">${this.t('module.behavior.contractorWorker', 'العامل')}</th>
                            <th style="width: 130px;">${this.t('module.behavior.factory', 'المصنع')}</th>
                            <th style="width: 140px;">${this.t('module.behavior.subLocation', 'الموقع الفرعي')}</th>
                            <th style="width: 110px;">${this.t('module.behavior.behaviorType', 'نوع التصرف')}</th>
                            <th style="width: 140px;">${this.t('module.behavior.date', 'التاريخ')}</th>
                            <th style="width: 100px;">${this.t('module.behavior.rating', 'التقييم')}</th>
                            <th class="text-center" style="width: 140px;">${this.t('common.actions', 'الإجراءات')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${behaviors.map((b) => `
                            <tr>
                                <td>${Utils.escapeHTML(b.isoCode || '')}</td>
                                <td><span class="font-semibold">${Utils.escapeHTML(b.contractorName || '')}</span></td>
                                <td>${Utils.escapeHTML(b.contractorWorker || '—')}</td>
                                <td>${Utils.escapeHTML(b.factoryName || b.factory || '—')}</td>
                                <td>${Utils.escapeHTML(b.subLocationName || b.subLocation || '—')}</td>
                                <td><span class="badge ${this.getBehaviorTypeBadgeClass(b.behaviorType)}">${Utils.escapeHTML(b.behaviorType || '—')}</span></td>
                                <td>${this.getBehaviorDate(b) ? this.formatBehaviorDateDisplay(b) : '—'}</td>
                                <td><span class="badge ${this.getRatingBadgeClass(b.rating)}">${Utils.escapeHTML(b.rating || '—')}</span></td>
                                <td class="text-center">
                                    <div class="flex items-center justify-center gap-2 flex-wrap">
                                        <button type="button" onclick="BehaviorMonitoring.viewContractorBehavior(${JSON.stringify(String(b.id || ''))})" class="btn-icon btn-icon-primary" title="${this.t('common.view', 'عرض')}"><i class="fas fa-eye"></i></button>
                                        <button type="button" onclick="BehaviorMonitoring.editContractorBehavior(${JSON.stringify(String(b.id || ''))})" class="btn-icon btn-icon-warning" title="${this.t('common.edit', 'تعديل')}"><i class="fas fa-edit"></i></button>
                                        ${this.canDeleteBehavior() ? `
                                        <button type="button" onclick="BehaviorMonitoring.deleteContractorBehaviorById(${JSON.stringify(String(b.id || ''))})" class="btn-icon btn-icon-danger" title="${this.t('common.delete', 'حذف')}"><i class="fas fa-trash"></i></button>
                                        ` : ''}
                                        <button type="button" onclick="BehaviorMonitoring.exportContractorPDF(${JSON.stringify(String(b.id || ''))})" class="btn-icon btn-icon-success" title="${this.t('common.exportPDF', 'تصدير PDF')}"><i class="fas fa-file-pdf"></i></button>
                                        <button type="button" onclick="BehaviorMonitoring.printContractorReport(${JSON.stringify(String(b.id || ''))})" class="btn-icon btn-icon-info" title="${this.t('common.print', 'طباعة')}"><i class="fas fa-print"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ${this.renderTablePaginationHTML('contractor', pageInfo)}
        `;
    },

    renderContractorLogTable() {
        const tableContainer = document.getElementById('bhmc-log-table-container');
        if (tableContainer) tableContainer.innerHTML = this.renderContractorLogTableHTML();
        const countEl = document.getElementById('bhmc-filter-count');
        if (countEl) countEl.textContent = String(this.getFilteredContractorBehaviors().length);
    },

    exportContractorLogCSV() {
        const rows = this.getFilteredContractorBehaviors();
        if (!rows.length) {
            Notification.info('لا توجد بيانات لتصديرها');
            return;
        }
        const escapeCsv = (v) => {
            const s = (v ?? '').toString().replace(/\r?\n/g, ' ').trim();
            if (s.includes('"') || s.includes(',') || s.includes(';')) return `"${s.replace(/"/g, '""')}"`;
            return s;
        };
        const header = ['ISO', 'ContractorName', 'ContractorWorker', 'Department', 'Job', 'Factory', 'SubLocation', 'BehaviorType', 'Date', 'Rating', 'CorrectiveAction', 'CorrectiveActionDetails', 'Description'];
        const csv = [
            header.join(','),
            ...rows.map((b) => [
                escapeCsv(b.isoCode || ''),
                escapeCsv(b.contractorName || ''),
                escapeCsv(b.contractorWorker || ''),
                escapeCsv(b.department || ''),
                escapeCsv(b.job || b.position || ''),
                escapeCsv(b.factoryName || b.factory || ''),
                escapeCsv(b.subLocationName || b.subLocation || ''),
                escapeCsv(b.behaviorType || ''),
                escapeCsv(this.getBehaviorDate(b) ? Utils.formatDateForInput(this.getBehaviorDate(b)) : ''),
                escapeCsv(b.rating || ''),
                escapeCsv(b.correctiveAction || ''),
                escapeCsv(b.correctiveActionDetails || ''),
                escapeCsv(b.description || '')
            ].join(','))
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ContractorBehaviorMonitoring_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    },

    getContractorBehaviorFormHTML(data, uid) {
        const dateValue = data?.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        const sites = this.getSiteOptions();
        const selectedFactory = data?.factory || data?.factoryId || '';
        const selectedSub = data?.subLocation || data?.subLocationId || '';
        const resolvedFactoryId = sites.find((s) => s.id === selectedFactory)?.id || sites.find((s) => s.name === selectedFactory)?.id || selectedFactory;
        const places = this.getPlaceOptions(resolvedFactoryId);
        const resolvedSubId = places.find((p) => p.id === selectedSub)?.id || places.find((p) => p.name === selectedSub)?.id || selectedSub;
        const isNegative = (data?.behaviorType || '') === 'سلبي';
        const existingPhoto = this.processPhoto(data?.photo);
        const photoDisp = existingPhoto && typeof Utils.resolveDriveAwareImgDisplay === 'function'
            ? Utils.resolveDriveAwareImgDisplay(existingPhoto)
            : { canonical: existingPhoto || '', displaySrc: existingPhoto || '', needsProxy: false, proxyFileId: '' };
        const photoThumbSrc = photoDisp.canonical ? photoDisp.displaySrc : '';
        const photoThumbProxyAttr = typeof Utils.driveProxyImgAttrs === 'function' ? Utils.driveProxyImgAttrs(photoDisp) : '';
        const ids = {
            contractorSelect: `${uid}-contractor-select`,
            contractorWorker: `${uid}-contractor-worker`,
            department: `${uid}-cb-department`,
            job: `${uid}-cb-job`,
            factory: `${uid}-cb-factory`,
            subLocation: `${uid}-cb-sublocation`,
            behaviorType: `${uid}-cb-type`,
            behaviorDate: `${uid}-cb-date`,
            behaviorRating: `${uid}-cb-rating`,
            correctiveAction: `${uid}-cb-corrective`,
            correctiveActionDetails: `${uid}-cb-corrective-details`,
            description: `${uid}-cb-description`,
            photoInput: `${uid}-cb-photo-input`,
            photoPreview: `${uid}-cb-photo-preview`,
            photoImg: `${uid}-cb-photo-img`,
            saveBtn: `${uid}-cb-save-btn`,
            typeBadge: `${uid}-cb-type-badge`,
            negativeSection: `${uid}-cb-negative-section`
        };
        return `
            <div class="behavior-form-wrapper bhm-form behavior-form-modal" data-behavior-type="${Utils.escapeHTML(data?.behaviorType || '')}">
                <form data-contractor-behavior-form="true" data-form-uid="${uid}" class="bhm-form-inner">
                    <section class="bhm-section">
                        <div class="bhm-section-head">
                            <span class="bhm-section-icon"><i class="fas fa-users-cog"></i></span>
                            <div>
                                <h4 class="bhm-section-title">${this.t('module.behavior.form.contractorSection', 'بيانات المقاول')}</h4>
                                <p class="bhm-section-hint">${this.t('module.behavior.form.contractorHint', 'اختر المقاول ويمكن إضافة اسم العامل')}</p>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${ids.contractorSelect}" class="bhm-label">${this.t('module.behavior.contractorName', 'المقاول')} <span class="bhm-req">*</span></label>
                                    <select id="${ids.contractorSelect}" required class="form-input bhm-input">
                                        <option value="">${this.t('module.behavior.selectContractor', '-- اختر المقاول --')}</option>
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.contractorWorker}" class="bhm-label">${this.t('module.behavior.contractorWorker', 'اسم العامل')} <span class="bhm-optional">(${this.t('common.optional', 'اختياري')})</span></label>
                                    <input type="text" id="${ids.contractorWorker}" class="form-input bhm-input" value="${Utils.escapeHTML(data?.contractorWorker || '')}" placeholder="${this.t('module.behavior.form.workerPh', 'عامل تابع للمقاول')}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.department}" class="bhm-label">${this.t('module.behavior.form.department', 'القسم')}</label>
                                    <input type="text" id="${ids.department}" class="form-input bhm-input" value="${Utils.escapeHTML(data?.department || '')}" placeholder="${this.t('common.optional', 'اختياري')}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.job}" class="bhm-label">${this.t('module.behavior.form.job', 'الوظيفة')}</label>
                                    <input type="text" id="${ids.job}" class="form-input bhm-input" value="${Utils.escapeHTML(data?.job || data?.position || '')}" placeholder="${this.t('common.optional', 'اختياري')}">
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="bhm-section">
                        <div class="bhm-section-head">
                            <span class="bhm-section-icon bhm-section-icon--violet"><i class="fas fa-clipboard-list"></i></span>
                            <div>
                                <h4 class="bhm-section-title">تفاصيل التصرف</h4>
                            </div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhmc-contractor-detail-grid">
                                <div class="bhm-field bhmc-contractor-detail-type">
                                    <div class="bhm-label-row">
                                        <label for="${ids.behaviorType}" class="bhm-label mb-0">${this.t('module.behavior.behaviorType', 'نوع التصرف')} <span class="bhm-req">*</span></label>
                                        <span class="badge ${this.getBehaviorTypeBadgeClass(data?.behaviorType)} bhm-type-chip" id="${ids.typeBadge}">${Utils.escapeHTML(data?.behaviorType || '—')}</span>
                                    </div>
                                    <select id="${ids.behaviorType}" required class="form-input bhm-input mt-2">
                                        <option value="">${this.t('module.behavior.selectType', 'اختر النوع')}</option>
                                        <option value="إيجابي" ${data?.behaviorType === 'إيجابي' ? 'selected' : ''}>${this.t('module.behavior.positive', 'إيجابي')}</option>
                                        <option value="سلبي" ${data?.behaviorType === 'سلبي' ? 'selected' : ''}>${this.t('module.behavior.negative', 'سلبي')}</option>
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.behaviorDate}" class="bhm-label">${this.t('module.behavior.date', 'التاريخ')} <span class="bhm-req">*</span></label>
                                    <input type="date" id="${ids.behaviorDate}" required class="form-input bhm-input" value="${dateValue}">
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.behaviorRating}" class="bhm-label">${this.t('module.behavior.rating', 'التقييم')} <span class="bhm-req">*</span></label>
                                    <select id="${ids.behaviorRating}" required class="form-input bhm-input">
                                        <option value="">${this.t('module.behavior.selectRating', 'اختر التقييم')}</option>
                                        <option value="ممتاز" ${data?.rating === 'ممتاز' ? 'selected' : ''}>${this.t('module.behavior.excellent', 'ممتاز')}</option>
                                        <option value="جيد" ${data?.rating === 'جيد' ? 'selected' : ''}>${this.t('module.behavior.good', 'جيد')}</option>
                                        <option value="مقبول" ${data?.rating === 'مقبول' ? 'selected' : ''}>${this.t('module.behavior.acceptable', 'مقبول')}</option>
                                        <option value="ضعيف" ${data?.rating === 'ضعيف' ? 'selected' : ''}>${this.t('module.behavior.poor', 'ضعيف')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="bhm-section">
                        <div class="bhm-section-head">
                            <span class="bhm-section-icon bhm-section-icon--teal"><i class="fas fa-map-marked-alt"></i></span>
                            <div><h4 class="bhm-section-title">الموقع</h4></div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${ids.factory}" class="bhm-label">المصنع <span class="bhm-req">*</span></label>
                                    <select id="${ids.factory}" required class="form-input bhm-input">
                                        <option value="">${this.t('module.behavior.selectFactory', 'اختر المصنع')}</option>
                                        ${sites.map((site) => `
                                            <option value="${site.id}" ${(resolvedFactoryId === site.id || selectedFactory === site.name) ? 'selected' : ''}>${Utils.escapeHTML(site.name)}</option>
                                        `).join('')}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.subLocation}" class="bhm-label">الموقع الفرعي <span class="bhm-req">*</span></label>
                                    <select id="${ids.subLocation}" required class="form-input bhm-input">
                                        <option value="">${this.t('module.behavior.selectSubLocation', 'اختر الموقع الفرعي')}</option>
                                        ${places.map((place) => `
                                            <option value="${place.id}" ${(resolvedSubId === place.id || selectedSub === place.name) ? 'selected' : ''}>${Utils.escapeHTML(place.name)}</option>
                                        `).join('')}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="${ids.negativeSection}" class="bhm-negative-panel" style="${isNegative ? '' : 'display:none;'}">
                        <div class="bhm-negative-head">
                            <span class="bhm-negative-icon"><i class="fas fa-exclamation-triangle"></i></span>
                            <div><h4 class="bhm-negative-title">إجراء تصحيحي (للتصرف السلبي)</h4></div>
                        </div>
                        <div class="bhm-negative-body">
                            <div class="bhm-grid bhm-grid-2">
                                <div class="bhm-field">
                                    <label for="${ids.correctiveAction}" class="bhm-label">${this.t('module.behavior.form.correctiveAction', 'الإجراء التصحيحي')} <span class="bhm-req">*</span></label>
                                    <select id="${ids.correctiveAction}" class="form-input bhm-input" ${isNegative ? 'required' : ''}>
                                        <option value="">${this.t('module.behavior.selectAction', 'اختر الإجراء')}</option>
                                        ${this.NEGATIVE_ACTIONS.map((a) => `
                                            <option value="${Utils.escapeHTML(a)}" ${data?.correctiveAction === a ? 'selected' : ''}>${Utils.escapeHTML(a)}</option>
                                        `).join('')}
                                    </select>
                                </div>
                                <div class="bhm-field">
                                    <label for="${ids.correctiveActionDetails}" class="bhm-label">تفاصيل إضافية</label>
                                    <input type="text" id="${ids.correctiveActionDetails}" class="form-input bhm-input" value="${Utils.escapeHTML(data?.correctiveActionDetails || '')}">
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="bhm-section bhm-section--media">
                        <div class="bhm-section-head">
                            <span class="bhm-section-icon bhm-section-icon--amber"><i class="fas fa-align-right"></i></span>
                            <div><h4 class="bhm-section-title">الوصف والمرفقات</h4></div>
                        </div>
                        <div class="bhm-section-body">
                            <div class="bhm-grid bhm-grid-media">
                                <div class="bhm-field bhm-upload-wrap">
                                    <label for="${ids.photoInput}" class="bhm-label">صورة</label>
                                    <input type="file" id="${ids.photoInput}" accept="image/*" class="bhm-file-input">
                                    <div id="${ids.photoPreview}" class="bhm-photo-preview mt-3 ${data?.photo ? '' : 'hidden'}">
                                        <img src="${Utils.escapeHTML(photoThumbSrc)}" alt=""${photoThumbProxyAttr} class="bhm-photo-thumb" id="${ids.photoImg}">
                                        <button type="button" class="bhm-photo-clear" data-action="cb-clear-photo">${this.t('module.behavior.form.clearPhoto', 'حذف الصورة')}</button>
                                    </div>
                                </div>
                                <div class="bhm-field bhm-field-grow">
                                    <label for="${ids.description}" class="bhm-label">${this.t('module.behavior.form.description', 'الوصف')} <span class="bhm-req">*</span></label>
                                    <textarea id="${ids.description}" required class="form-input bhm-input bhm-textarea" rows="5">${Utils.escapeHTML(data?.description || '')}</textarea>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="bhm-form-footer">
                        <button type="button" class="btn-secondary bhm-btn-cancel" data-action="cb-cancel-form">إلغاء</button>
                        <button type="button" id="${ids.saveBtn}" class="btn-primary bhm-btn-save"><i class="fas fa-save ml-2"></i>حفظ</button>
                    </div>
                </form>
            </div>
        `;
    },

    bindContractorBehaviorForm({ form, uid, data, modal, signal }) {
        const sel = document.getElementById(`${uid}-contractor-select`);
        if (sel && typeof Contractors !== 'undefined' && Contractors.populateContractorSelect) {
            try {
                Contractors.populateContractorSelect(sel, {
                    placeholder: '-- اختر المقاول --',
                    selectedValue: data?.contractorName || '',
                    selectedContractorId: data?.contractorId || '',
                    valueMode: 'name',
                    showServiceType: true,
                    includeSuppliers: true,
                    approvedOnly: false
                });
            } catch (e) {
                Utils.safeWarn('⚠️ تعذر تحميل قائمة المقاولين:', e);
            }
        }

        const factoryEl = document.getElementById(`${uid}-cb-factory`);
        const subEl = document.getElementById(`${uid}-cb-sublocation`);
        const refreshPlaces = () => {
            if (!factoryEl || !subEl) return;
            const places = this.getPlaceOptions(factoryEl.value);
            const prev = subEl.value;
            subEl.innerHTML = '<option value="">' + this.t('module.behavior.selectSubLocation', 'اختر الموقع الفرعي') + '</option>' +
                places.map((p) => `<option value="${p.id}">${Utils.escapeHTML(p.name)}</option>`).join('');
            if (prev && places.some((p) => p.id === prev)) subEl.value = prev;
        };
        factoryEl?.addEventListener('change', refreshPlaces, { signal });

        const typeSelect = document.getElementById(`${uid}-cb-type`);
        const typeBadge = document.getElementById(`${uid}-cb-type-badge`);
        const negativeSection = document.getElementById(`${uid}-cb-negative-section`);
        const correctiveActionEl = document.getElementById(`${uid}-cb-corrective`);
        const applyType = (t) => {
            const wrapper = form.closest('.behavior-form-wrapper');
            if (wrapper) wrapper.setAttribute('data-behavior-type', t || '');
            if (typeBadge) {
                typeBadge.className = `badge ${this.getBehaviorTypeBadgeClass(t)} bhm-type-chip`;
                typeBadge.textContent = t || '—';
            }
            const isNegative = (t || '') === 'سلبي';
            if (negativeSection) negativeSection.style.display = isNegative ? '' : 'none';
            if (correctiveActionEl) {
                if (isNegative) correctiveActionEl.setAttribute('required', 'required');
                else correctiveActionEl.removeAttribute('required');
            }
        };
        applyType(typeSelect?.value || data?.behaviorType || '');
        typeSelect?.addEventListener('change', () => applyType(typeSelect.value), { signal });

        const photoInput = document.getElementById(`${uid}-cb-photo-input`);
        const photoPreview = document.getElementById(`${uid}-cb-photo-preview`);
        const photoImg = document.getElementById(`${uid}-cb-photo-img`);
        if (photoInput && photoPreview && photoImg) {
            photoInput.addEventListener('change', (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                    Notification.error('حجم الصورة كبير جداً. الحد الأقصى 2MB');
                    photoInput.value = '';
                    return;
                }
                const reader = new FileReader();
                reader.onload = (ev) => {
                    photoImg.src = ev.target.result;
                    photoPreview.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }, { signal });
        }
        form.querySelector('[data-action="cb-clear-photo"]')?.addEventListener('click', () => {
            const inp = document.getElementById(`${uid}-cb-photo-input`);
            const preview = document.getElementById(`${uid}-cb-photo-preview`);
            if (inp) inp.value = '';
            if (preview) preview.classList.add('hidden');
        }, { signal });

        form.querySelector('[data-action="cb-cancel-form"]')?.addEventListener('click', () => modal?.remove(), { signal });

        document.getElementById(`${uid}-cb-save-btn`)?.addEventListener('click', () => this.handleContractorSubmit({ uid, form, editId: data?.id || null, modal }), { signal });
    },

    async handleContractorSubmit({ uid, form, editId = null, modal }) {
        if (this._contractorSubmitLock) {
            Notification.warning('جاري حفظ التصرف... يرجى الانتظار لمنع التكرار');
            return;
        }

        const saveBtn = document.getElementById(`${uid}-cb-save-btn`);
        this._contractorSubmitLock = true;
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.setAttribute('aria-busy', 'true');
        }

        try {
            let photoBase64 = editId ? (this.getRawContractorBehaviorById(editId)?.photo || '') : '';
            const photoInput = document.getElementById(`${uid}-cb-photo-input`);
            if (photoInput && photoInput.files.length > 0) {
                const file = photoInput.files[0];
                if (file.size > 2 * 1024 * 1024) {
                    Notification.error('حجم الصورة كبير جداً. الحد الأقصى 2MB');
                    return;
                }
                photoBase64 = await this.convertImageToBase64(file);
            }

            const contractorSel = document.getElementById(`${uid}-contractor-select`);
            const opt = contractorSel?.selectedOptions?.[0];
            const contractorName = (contractorSel?.value || '').trim();
            const contractorId = (opt?.dataset?.contractorId || '').trim();
            if (!contractorName) {
                Notification.error('يرجى اختيار المقاول');
                return;
            }

            const behaviorTypeEl = document.getElementById(`${uid}-cb-type`);
            const behaviorDateEl = document.getElementById(`${uid}-cb-date`);
            const behaviorRatingEl = document.getElementById(`${uid}-cb-rating`);
            const behaviorDescriptionEl = document.getElementById(`${uid}-cb-description`);
            const departmentEl = document.getElementById(`${uid}-cb-department`);
            const jobEl = document.getElementById(`${uid}-cb-job`);
            const factoryEl = document.getElementById(`${uid}-cb-factory`);
            const subEl = document.getElementById(`${uid}-cb-sublocation`);
            const correctiveActionEl = document.getElementById(`${uid}-cb-corrective`);
            const correctiveActionDetailsEl = document.getElementById(`${uid}-cb-corrective-details`);
            const workerEl = document.getElementById(`${uid}-contractor-worker`);

            if (!behaviorTypeEl || !behaviorDateEl || !behaviorRatingEl || !behaviorDescriptionEl || !factoryEl || !subEl) {
                Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة.');
                return;
            }

            const isNegative = (behaviorTypeEl.value || '') === 'سلبي';
            if (isNegative && (!correctiveActionEl || !correctiveActionEl.value)) {
                Notification.error('يرجى اختيار الإجراء التصحيحي للتصرف السلبي');
                return;
            }

            const list = AppState.appData.contractorBehaviorMonitoring || [];
            const existing = editId ? this.getRawContractorBehaviorById(editId) : null;
            const isoFn = typeof generateISOCode === 'function' ? generateISOCode : null;
            const formData = {
                id: editId || Utils.generateId('CBHM'),
                isoCode: (existing && existing.isoCode) ? existing.isoCode : (isoFn ? isoFn('BHC', list) : (`BHC-${Date.now()}`)),
                contractorId,
                contractorName,
                contractorWorker: (workerEl?.value || '').trim(),
                department: (departmentEl?.value || '').trim(),
                job: (jobEl?.value || '').trim(),
                factory: (factoryEl.value || '').trim(),
                factoryId: factoryEl.value ? String(factoryEl.value).trim() : null,
                factoryName: this.resolveSiteName(factoryEl.value),
                subLocation: (subEl.value || '').trim(),
                subLocationId: subEl.value ? String(subEl.value).trim() : null,
                subLocationName: this.resolvePlaceName(subEl.value, factoryEl.value),
                photo: photoBase64,
                behaviorType: behaviorTypeEl.value,
                date: new Date(behaviorDateEl.value).toISOString(),
                rating: behaviorRatingEl.value,
                correctiveAction: isNegative ? (correctiveActionEl?.value || '') : '',
                correctiveActionDetails: isNegative ? ((correctiveActionDetailsEl?.value || '').trim()) : '',
                description: behaviorDescriptionEl.value.trim(),
                createdAt: editId ? this.getRawContractorBehaviorById(editId)?.createdAt : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const duplicate = this.findDuplicateContractorBehavior(formData, editId);
            if (duplicate) {
                Notification.warning('تم تسجيل نفس التصرف لنفس الشخص في نفس التاريخ مسبقاً. لن يتم التكرار.');
                return;
            }

            Loading.show();
            try {
                if (!Array.isArray(AppState.appData.contractorBehaviorMonitoring)) {
                    AppState.appData.contractorBehaviorMonitoring = [];
                }
                if (editId) {
                    const index = AppState.appData.contractorBehaviorMonitoring.findIndex((b) => b.id === editId);
                    if (index !== -1) AppState.appData.contractorBehaviorMonitoring[index] = formData;
                    Notification.success('تم تحديث التصرف بنجاح');
                } else {
                    if (this.findDuplicateContractorBehavior(formData, editId)) {
                        Notification.warning('تم تسجيل نفس التصرف مسبقاً. لن يتم التكرار.');
                        return;
                    }
                    AppState.appData.contractorBehaviorMonitoring.push(formData);
                    Notification.success('تم تسجيل التصرف بنجاح');
                }
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }
                await GoogleIntegration.autoSave('ContractorBehaviorMonitoring', AppState.appData.contractorBehaviorMonitoring);
                if (modal) modal.remove();
                this.refreshCurrentTab();
            } catch (error) {
                Notification.error('حدث خطأ: ' + error.message);
            } finally {
                Loading.hide();
            }
        } finally {
            this._contractorSubmitLock = false;
            if (saveBtn && document.body.contains(saveBtn)) {
                saveBtn.disabled = false;
                saveBtn.removeAttribute('aria-busy');
            }
        }
    },

    async showContractorForm(data = null) {
        if (typeof Permissions !== 'undefined' && Permissions.ensureFormSettingsState) {
            try { await Permissions.ensureFormSettingsState(); } catch (e) { /* ignore */ }
        }
        const modal = document.createElement('div');
        modal.className = 'modal-overlay bhmc-contractor-overlay';
        const uid = `bhmc-modal-${Date.now()}`;
        const presented = data ? this.presentContractorBehavior(data) : null;
        modal.innerHTML = `
            <div class="modal-content behavior-modal bhm-registration-modal bhmc-contractor-dialog">
                <div class="bhm-modal-hero">
                    <div class="bhm-modal-hero-text">
                        <p class="bhm-modal-kicker"><i class="fas fa-users-cog ml-2"></i>تصرفات المقاولين</p>
                        <h2 class="bhm-modal-title">${data ? 'تعديل التصرف' : 'تسجيل تصرف مقاول'}</h2>
                    </div>
                    <button type="button" class="bhm-modal-close" onclick="this.closest('.modal-overlay').remove()" aria-label="إغلاق"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body bhm-modal-body">
                    ${this.getContractorBehaviorFormHTML(presented, uid)}
                </div>
            </div>`;
        document.body.appendChild(modal);
        if (this._modalAbortController) this._modalAbortController.abort();
        this._modalAbortController = new AbortController();
        const signal = this._modalAbortController.signal;
        const form = modal.querySelector('form[data-contractor-behavior-form="true"]');
        if (form) this.bindContractorBehaviorForm({ form, uid, data: presented, modal, signal });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        }, { signal });
    },

    editContractorBehavior(id) {
        const raw = this.getRawContractorBehaviorById(id);
        if (!raw) {
            Notification.error('التصرف غير موجود');
            return;
        }
        this.showContractorForm(raw);
    },

    async viewContractorBehavior(id) {
        const raw = this.getRawContractorBehaviorById(id);
        if (!raw) {
            Notification.error('التصرف غير موجود');
            return;
        }
        const b = this.presentContractorBehavior(raw);
        const esc = (v) => Utils.escapeHTML((v ?? '').toString());
        const valOrDash = (v) => {
            const s = (v ?? '').toString().trim();
            return s ? esc(s) : '<span class="bhm-detail-empty">—</span>';
        };
        const dateStr = this.getBehaviorDate(b) ? this.formatBehaviorDateDisplay(b) : '—';
        const modal = document.createElement('div');
        modal.className = 'modal-overlay bhm-detail-overlay';
        modal.innerHTML = `
            <div class="modal-content behavior-modal bhm-detail-modal" style="max-width: 820px;">
                <div class="bhm-detail-hero">
                    <div class="bhm-detail-hero-text">
                        <p class="bhm-detail-kicker"><i class="fas fa-users-cog ml-2"></i>تصرف مقاول</p>
                        <h2 class="bhm-detail-title">تفاصيل التصرف</h2>
                        <p class="bhm-detail-sub">${esc(b.isoCode || '—')} · ${esc(b.contractorName || '')}</p>
                    </div>
                    <button type="button" class="bhm-detail-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body bhm-detail-body">
                    <div class="bhm-detail-grid">
                        <div class="bhm-detail-field"><span class="bhm-detail-label">كود ISO</span><div class="bhm-detail-value">${valOrDash(b.isoCode)}</div></div>
                        <div class="bhm-detail-field bhm-detail-field-span2"><span class="bhm-detail-label">المقاول</span><div class="bhm-detail-value bhm-detail-value-strong">${valOrDash(b.contractorName)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">العامل</span><div class="bhm-detail-value">${valOrDash(b.contractorWorker)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">القسم</span><div class="bhm-detail-value">${valOrDash(b.department)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">الوظيفة</span><div class="bhm-detail-value">${valOrDash(b.job)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">المصنع</span><div class="bhm-detail-value">${valOrDash(b.factoryName || b.factory)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">الموقع الفرعي</span><div class="bhm-detail-value">${valOrDash(b.subLocationName || b.subLocation)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">نوع التصرف</span><div class="bhm-detail-value"><span class="badge ${this.getBehaviorTypeBadgeClass(b.behaviorType)}">${esc(b.behaviorType || '—')}</span></div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">التاريخ</span><div class="bhm-detail-value">${esc(dateStr)}</div></div>
                        <div class="bhm-detail-field"><span class="bhm-detail-label">التقييم</span><div class="bhm-detail-value"><span class="badge ${this.getRatingBadgeClass(b.rating)}">${esc(b.rating || '—')}</span></div></div>
                        <div class="bhm-detail-field bhm-detail-field-span2"><span class="bhm-detail-label">الوصف</span><div class="bhm-detail-value">${valOrDash(b.description)}</div></div>
                    </div>
                </div>
                <div class="bhm-detail-footer">
                    <button type="button" class="btn-primary" onclick="BehaviorMonitoring.editContractorBehavior(${JSON.stringify(String(b.id || ''))}); this.closest('.modal-overlay').remove();"><i class="fas fa-pen ml-2"></i>تعديل</button>
                    ${typeof EmailDispatch !== 'undefined' ? EmailDispatch.renderFooterButtonHtml('behavior-monitoring') : ''}
                    ${this.canDeleteBehavior() ? `
                    <button type="button" class="btn-danger" onclick="BehaviorMonitoring.deleteContractorBehaviorById(${JSON.stringify(String(b.id || ''))})"><i class="fas fa-trash ml-2"></i>حذف</button>
                    ` : ''}
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.printContractorReport(${JSON.stringify(String(b.id || ''))})"><i class="fas fa-print ml-2"></i>طباعة</button>
                    <button type="button" class="btn-secondary" onclick="BehaviorMonitoring.exportContractorPDF(${JSON.stringify(String(b.id || ''))})"><i class="fas fa-file-pdf ml-2"></i>PDF</button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                </div>
            </div>`;
        document.body.appendChild(modal);
        if (typeof EmailDispatch !== 'undefined') {
            EmailDispatch.bindFooterButtons(modal, { moduleKey: 'behavior-monitoring', record: b, recordId: b.id || b.isoCode || '' });
        }
    },

    async exportContractorPDF(id) {
        const raw = this.getRawContractorBehaviorById(id);
        if (!raw) {
            Notification.error('التصرف غير موجود');
            return;
        }
        const behavior = this.presentContractorBehavior(raw);
        try {
            Loading.show();
            const formCode = behavior.isoCode || `BHC-${behavior.id?.substring(0, 8) || 'UNKNOWN'}`;
            const formTitle = 'تقرير تصرف مقاول';
            const pdfDate = this.getBehaviorDate(behavior) ? this.formatBehaviorDateDisplay(behavior) : '—';
            const content = `
                <table>
                    <tr><th>كود ISO</th><td>${Utils.escapeHTML(behavior.isoCode || '')}</td></tr>
                    <tr><th>المقاول</th><td>${Utils.escapeHTML(behavior.contractorName || '')}</td></tr>
                    <tr><th>العامل</th><td>${Utils.escapeHTML(behavior.contractorWorker || '')}</td></tr>
                    <tr><th>القسم</th><td>${Utils.escapeHTML(behavior.department || '')}</td></tr>
                    <tr><th>الوظيفة</th><td>${Utils.escapeHTML(behavior.job || '')}</td></tr>
                    <tr><th>المصنع</th><td>${Utils.escapeHTML(behavior.factoryName || behavior.factory || '')}</td></tr>
                    <tr><th>الموقع الفرعي</th><td>${Utils.escapeHTML(behavior.subLocationName || behavior.subLocation || '')}</td></tr>
                    <tr><th>نوع التصرف</th><td>${Utils.escapeHTML(behavior.behaviorType || '')}</td></tr>
                    <tr><th>التاريخ</th><td>${Utils.escapeHTML(pdfDate)}</td></tr>
                    <tr><th>التقييم</th><td>${Utils.escapeHTML(behavior.rating || '')}</td></tr>
                    ${(behavior.behaviorType === 'سلبي' && (behavior.correctiveAction || behavior.correctiveActionDetails)) ? `
                        <tr><th>الإجراء التصحيحي</th><td>${Utils.escapeHTML(behavior.correctiveAction || '')}</td></tr>
                        <tr><th>تفاصيل الإجراء</th><td>${Utils.escapeHTML(behavior.correctiveActionDetails || '')}</td></tr>
                    ` : ''}
                    <tr><th colspan="2">الوصف</th></tr>
                    <tr><td colspan="2">${Utils.escapeHTML(behavior.description || '')}</td></tr>
                </table>`;
            const htmlContent = typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML
                ? FormHeader.generatePDFHTML(formCode, formTitle, content, false, true, { version: '1.0' }, behavior.createdAt, behavior.updatedAt)
                : `<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${formTitle}</title></head><body>${content}</body></html>`;
            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const printWindow = window.open(url, '_blank');
            if (printWindow) {
                printWindow.onload = () => {
                    setTimeout(() => {
                        printWindow.print();
                        setTimeout(() => URL.revokeObjectURL(url), 1000);
                        Loading.hide();
                    }, 500);
                };
            } else {
                URL.revokeObjectURL(url);
                Loading.hide();
                Notification.error('يرجى السماح بالنوافذ المنبثقة');
            }
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ في تصدير PDF: ' + error.message);
        }
    },

    async printContractorReport(id) {
        await this.exportContractorPDF(id);
    },

    /**
     * تنظيف جميع الموارد عند إلغاء تحميل الموديول
     * يمنع تسريبات الذاكرة (Memory Leaks)
     */
    cleanup() {
        try {
            if (typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('🧹 تنظيف موارد BehaviorMonitoring module...');
            }

            // تنظيف event listeners
            if (this._eventListenersAbortController) {
                this._eventListenersAbortController.abort();
                this._eventListenersAbortController = null;
            }

            // تنظيف listeners الخاصة بالمودالات
            if (this._modalAbortController) {
                this._modalAbortController.abort();
                this._modalAbortController = null;
            }

            // تنظيف timeout
            if (this._setupTimeoutId) {
                clearTimeout(this._setupTimeoutId);
                this._setupTimeoutId = null;
            }

            if (typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ تم تنظيف موارد BehaviorMonitoring module');
            }
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ خطأ في تنظيف BehaviorMonitoring module:', error);
            }
        }
    }
};

// ===== Export module to global scope =====
// تصدير الموديول إلى window فوراً لضمان توافره
(function () {
    'use strict';
    try {
        if (typeof window !== 'undefined' && typeof BehaviorMonitoring !== 'undefined') {
            window.BehaviorMonitoring = BehaviorMonitoring;
            
            // إشعار عند تحميل الموديول بنجاح
            if (typeof AppState !== 'undefined' && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ BehaviorMonitoring module loaded and available on window.BehaviorMonitoring');
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تصدير BehaviorMonitoring:', error);
        // محاولة التصدير مرة أخرى حتى في حالة الخطأ
        if (typeof window !== 'undefined' && typeof BehaviorMonitoring !== 'undefined') {
            try {
                window.BehaviorMonitoring = BehaviorMonitoring;
            } catch (e) {
                console.error('❌ فشل تصدير BehaviorMonitoring:', e);
            }
        }
    }
})();
