/**
 * Safety Calendar Module — تقويم السلامة
 */
const SafetyCalendar = {
    _calendar: null,
    _dashCalendar: null,
    _fcLoadPromise: null,
    _activeCategories: null,
    _assigneeMode: null,
    _modalEl: null,
    _PREFS_KEY: 'sc_calendar_prefs_v1',

    t(key, fallback) {
        const i18n = (window.AppI18n && window.AppI18n.t) ? window.AppI18n
            : ((window.I18n && window.I18n.t) ? window.I18n : null);
        return i18n ? i18n.t(key, null, fallback || key) : (fallback || key);
    },

    esc(str) {
        if (window.SafetyCalendarEvents && SafetyCalendarEvents.esc) {
            return SafetyCalendarEvents.esc(str);
        }
        return String(str == null ? '' : str);
    },

    _loadAsset(tag, attrs) {
        return new Promise((resolve, reject) => {
            const sel = attrs.id ? `#${attrs.id}` : `[href="${attrs.href}"]`;
            if (tag === 'script' && document.querySelector(`script[src="${attrs.src}"]`)) {
                resolve();
                return;
            }
            if (tag === 'link' && document.querySelector(`link[href="${attrs.href}"]`)) {
                resolve();
                return;
            }
            const el = document.createElement(tag);
            Object.keys(attrs).forEach((k) => { el[k] = attrs[k]; });
            el.onload = () => resolve();
            el.onerror = () => reject(new Error('load failed'));
            document.head.appendChild(el);
        });
    },

    /**
     * إنشاء خيارات التقويم مع أزرار prev/next/today تعمل عبر مرجع calendar صريح
     * (this داخل customButtons لا يشير دائماً إلى Calendar في FC v6)
     */
    _buildCalendarOptions(overrides, compactNav) {
        const calRef = { api: null };
        const self = this;
        const isCompact = compactNav === true;
        const overrideCustom = (overrides && overrides.customButtons) || {};
        const options = Object.assign({
            locale: 'ar',
            direction: 'rtl',
            customButtons: {
                scPrev: {
                    text: 'السابق',
                    hint: 'الفترة السابقة',
                    click() {
                        if (calRef.api && typeof calRef.api.prev === 'function') {
                            calRef.api.prev();
                        }
                    }
                },
                scNext: {
                    text: 'التالي',
                    hint: 'الفترة التالية',
                    click() {
                        if (calRef.api && typeof calRef.api.next === 'function') {
                            calRef.api.next();
                        }
                    }
                },
                scToday: {
                    text: 'اليوم',
                    hint: 'العودة إلى اليوم',
                    click() {
                        if (calRef.api && typeof calRef.api.today === 'function') {
                            calRef.api.today();
                        }
                    }
                }
            },
            buttonText: self._fcButtonText()
        }, overrides || {});
        options.customButtons = Object.assign({}, options.customButtons, overrideCustom);
        options._scCompactNav = isCompact;

        return {
            options,
            render(root) {
                calRef.api = new FullCalendar.Calendar(root, options);
                calRef.api.render();
                if (isCompact) {
                    root.classList.add('sc-fc-compact-nav');
                }
                return calRef.api;
            }
        };
    },

    _fcButtonText() {
        return {
            today: 'اليوم',
            month: 'شهر',
            week: 'أسبوع',
            day: 'يوم',
            list: 'قائمة'
        };
    },

    /** تمييز الجمعة والسبت + تحسين مظهر الخلايا */
    _getCalendarAppearanceHooks() {
        const markWeekend = (date, el) => {
            if (!date || !el) return;
            const dow = date.getDay();
            if (dow === 5) el.classList.add('sc-weekend-fri');
            if (dow === 6) el.classList.add('sc-weekend-sat');
            if (dow === 5 || dow === 6) el.classList.add('sc-weekend-day');
        };
        return {
            dayCellDidMount(info) {
                markWeekend(info.date, info.el);
            },
            dayHeaderDidMount(info) {
                markWeekend(info.date, info.el);
            }
        };
    },

    async ensureFullCalendarLoaded() {
        if (typeof FullCalendar !== 'undefined') return true;
        if (this._fcLoadPromise) {
            try { await this._fcLoadPromise; return typeof FullCalendar !== 'undefined'; } catch (_e) { return false; }
        }
        this._fcLoadPromise = (async () => {
            await this._loadAsset('script', {
                src: 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'
            });
        })();
        try {
            await this._fcLoadPromise;
            return typeof FullCalendar !== 'undefined';
        } catch (_e) {
            return false;
        }
    },

    getAllCategoryKeys() {
        if (!window.SafetyCalendarEvents) return [];
        return Object.keys(SafetyCalendarEvents.SAFETY_CALENDAR_CATEGORIES || {});
    },

    getEnabledCategories() {
        // null = الوضع الافتراضي (كل الأنواع)؛ مصفوفة (حتى فارغة) = اختيار صريح
        if (Array.isArray(this._activeCategories)) {
            return this._activeCategories;
        }
        return this.getAllCategoryKeys();
    },

    isEffectiveAdmin() {
        if (window.SafetyCalendarEvents && SafetyCalendarEvents.isEffectiveAdmin) {
            return SafetyCalendarEvents.isEffectiveAdmin();
        }
        return false;
    },

    getAssigneeMode() {
        if (this._assigneeMode === 'all' || this._assigneeMode === 'mine') {
            return this._assigneeMode;
        }
        if (window.SafetyCalendarEvents && SafetyCalendarEvents.resolveDefaultAssigneeMode) {
            return SafetyCalendarEvents.resolveDefaultAssigneeMode({});
        }
        return 'all';
    },

    _getPrefs() {
        try {
            const raw = localStorage.getItem(this._PREFS_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (_e) {
            return {};
        }
    },

    _savePrefs(prefs) {
        try {
            localStorage.setItem(this._PREFS_KEY, JSON.stringify(prefs || {}));
        } catch (_e) { /* ignore */ }
    },

    getShowEgyptHolidays() {
        return this._getPrefs().showEgyptHolidays !== false;
    },

    getShowIntlDays() {
        return this._getPrefs().showIntlDays !== false;
    },

    getShowCustomEvents() {
        return this._getPrefs().showCustomEvents !== false;
    },

    setReferencePref(key, value) {
        const prefs = this._getPrefs();
        prefs[key] = value === true;
        this._savePrefs(prefs);
        this.refreshCalendarEvents();
    },

    canManageCustomEvents() {
        if (this.isEffectiveAdmin()) return true;
        return typeof Permissions !== 'undefined' && Permissions.hasAccess
            && Permissions.hasAccess('safety-calendar');
    },

    async ensureCustomEventsLoaded(force) {
        if (!AppState || !AppState.appData) return;
        const existing = AppState.appData.safetyCalendarCustomEvents;
        if (!force && Array.isArray(existing) && existing.length) return;
        if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendToAppsScript) {
            if (!Array.isArray(existing)) AppState.appData.safetyCalendarCustomEvents = [];
            return;
        }
        try {
            const res = await GoogleIntegration.sendToAppsScript('getAllSafetyCalendarCustomEvents', {});
            if (res && res.success && Array.isArray(res.data)) {
                AppState.appData.safetyCalendarCustomEvents = res.data;
            } else if (!Array.isArray(AppState.appData.safetyCalendarCustomEvents)) {
                AppState.appData.safetyCalendarCustomEvents = [];
            }
        } catch (_e) {
            if (!Array.isArray(AppState.appData.safetyCalendarCustomEvents)) {
                AppState.appData.safetyCalendarCustomEvents = [];
            }
        }
    },

    _upsertLocalCustomEvent(record) {
        if (!record || !AppState?.appData) return;
        if (!Array.isArray(AppState.appData.safetyCalendarCustomEvents)) {
            AppState.appData.safetyCalendarCustomEvents = [];
        }
        const list = AppState.appData.safetyCalendarCustomEvents;
        const idx = list.findIndex((r) => String(r.id) === String(record.id));
        if (idx >= 0) list[idx] = record;
        else list.push(record);
    },

    _removeLocalCustomEvent(eventId) {
        if (!eventId || !Array.isArray(AppState?.appData?.safetyCalendarCustomEvents)) return;
        AppState.appData.safetyCalendarCustomEvents = AppState.appData.safetyCalendarCustomEvents
            .filter((r) => String(r.id) !== String(eventId));
    },

    async saveCustomEvent(payload, existingId) {
        if (!this.canManageCustomEvents()) {
            Notification?.warning?.('ليس لديك صلاحية إدارة الأحداث');
            return { success: false };
        }
        if (typeof GoogleIntegration === 'undefined') {
            Notification?.error?.('الاتصال بالخادم غير متاح');
            return { success: false };
        }
        const user = AppState?.currentUser || {};
        const body = Object.assign({}, payload);
        if (!existingId) {
            body.createdBy = user.email || user.name || user.id || '';
        }
        const action = existingId ? 'updateSafetyCalendarCustomEvent' : 'addSafetyCalendarCustomEvent';
        const req = existingId
            ? { eventId: existingId, updateData: body }
            : body;
        try {
            Loading?.show?.();
            const res = await GoogleIntegration.sendToAppsScript(action, req);
            Loading?.hide?.();
            if (!res || !res.success) {
                Notification?.error?.(res?.message || 'فشل حفظ الحدث');
                return res || { success: false };
            }
            const saved = res.data || Object.assign({ id: existingId || body.id }, body);
            if (!saved.id && res.id) saved.id = res.id;
            this._upsertLocalCustomEvent(saved);
            Notification?.success?.(existingId ? 'تم تحديث الحدث' : 'تمت إضافة الحدث');
            this.refreshCalendarEvents();
            this.refreshDashboardWidgetIfVisible();
            return res;
        } catch (err) {
            Loading?.hide?.();
            Notification?.error?.('خطأ: ' + (err.message || err));
            return { success: false };
        }
    },

    async deleteCustomEvent(eventId) {
        if (!eventId || !this.canManageCustomEvents()) return { success: false };
        if (typeof GoogleIntegration === 'undefined') return { success: false };
        try {
            Loading?.show?.();
            const res = await GoogleIntegration.sendToAppsScript('deleteSafetyCalendarCustomEvent', { eventId });
            Loading?.hide?.();
            if (!res || !res.success) {
                Notification?.error?.(res?.message || 'فشل حذف الحدث');
                return res || { success: false };
            }
            this._removeLocalCustomEvent(eventId);
            Notification?.success?.('تم حذف الحدث');
            this.refreshCalendarEvents();
            this.refreshDashboardWidgetIfVisible();
            return res;
        } catch (err) {
            Loading?.hide?.();
            Notification?.error?.('خطأ: ' + (err.message || err));
            return { success: false };
        }
    },

    canAddTasksFromCalendar() {
        return typeof Permissions !== 'undefined' && Permissions.hasAccess
            && Permissions.hasAccess('user-tasks');
    },

    canAssignTasksToOthers() {
        if (this.isEffectiveAdmin()) return true;
        const u = AppState?.currentUser;
        return u && (u.role === 'admin' || u.role === 'safety_officer');
    },

    canEditUserTask(record) {
        if (!record) return false;
        if (this.isEffectiveAdmin()) return true;
        if (!window.SafetyCalendarEvents || !SafetyCalendarEvents.isRecordAssignedToUser) return false;
        return SafetyCalendarEvents.isRecordAssignedToUser(record, 'user-tasks');
    },

    openAddTaskForm(dueDate) {
        if (!this.canAddTasksFromCalendar()) {
            if (typeof Notification !== 'undefined' && Notification.warning) {
                Notification.warning('ليس لديك صلاحية إضافة مهام');
            }
            return;
        }
        if (typeof UserTasks === 'undefined' || typeof UserTasks.showTaskForm !== 'function') {
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('موديول المهام غير متاح');
            }
            return;
        }
        const lockUserId = !this.canAssignTasksToOthers();
        UserTasks.showTaskForm(null, {
            dueDate: dueDate || '',
            lockUserId,
            skipModuleReload: true,
            onSaved: () => {
                this.refreshCalendarEvents();
                this.refreshDashboardWidgetIfVisible();
            }
        });
    },

    showDateClickMenu(dueDate) {
        const html = `
        <div class="modal-overlay sc-modal-overlay" id="sc-date-click-menu">
            <div class="modal-content sc-modal-content sc-date-menu" role="dialog" aria-modal="true">
                <div class="sc-modal-header">
                    <h3 class="sc-modal-title">إضافة في ${this.esc(dueDate || 'التاريخ')}</h3>
                    <button type="button" class="sc-modal-close" id="sc-date-menu-close" aria-label="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="sc-modal-body sc-date-menu-actions">
                    ${this.canAddTasksFromCalendar() ? `<button type="button" class="btn-primary btn-sm sc-date-action" data-action="task">
                        <i class="fas fa-tasks ml-1"></i>مهمة مستخدم
                    </button>` : ''}
                    ${this.canManageCustomEvents() ? `<button type="button" class="btn-secondary btn-sm sc-date-action" data-action="event">
                        <i class="fas fa-calendar-plus ml-1"></i>حدث مخصص
                    </button>` : ''}
                </div>
            </div>
        </div>`;
        const wrap = document.createElement('div');
        wrap.innerHTML = html;
        const modal = wrap.firstElementChild;
        document.body.appendChild(modal);
        const close = () => { try { modal.remove(); } catch (_e) { /* ignore */ } };
        modal.querySelector('#sc-date-menu-close')?.addEventListener('click', close);
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        modal.querySelectorAll('.sc-date-action').forEach((btn) => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                close();
                if (action === 'task') this.openAddTaskForm(dueDate);
                else if (action === 'event') this.openCustomEventForm(null, { startDate: dueDate });
            });
        });
    },

    openCustomEventForm(record, defaults) {
        if (!this.canManageCustomEvents()) {
            Notification?.warning?.('ليس لديك صلاحية إدارة الأحداث');
            return;
        }
        const rec = record || {};
        const def = defaults || {};
        const title = rec.title || '';
        const description = rec.description || '';
        const startDate = rec.startDate || rec.date || def.startDate || '';
        const endDate = rec.endDate || '';
        const recurring = rec.recurring || 'once';
        const color = rec.color || '#7c3aed';
        const enabled = rec.enabled !== false && rec.enabled !== 'false' && rec.enabled !== 0;
        const isEdit = !!rec.id;
        const html = `
        <div class="modal-overlay sc-modal-overlay" id="sc-custom-event-form">
            <div class="modal-content sc-modal-content sc-form-modal" role="dialog" aria-modal="true">
                <div class="sc-modal-header">
                    <h3 class="sc-modal-title">${isEdit ? 'تعديل حدث' : 'إضافة حدث'}</h3>
                    <button type="button" class="sc-modal-close" id="sc-custom-form-close" aria-label="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form class="sc-custom-form" id="sc-custom-event-form-el">
                    <label class="sc-form-field"><span>العنوان *</span>
                        <input type="text" name="title" required value="${this.esc(title)}" class="form-input"></label>
                    <label class="sc-form-field"><span>الوصف</span>
                        <textarea name="description" rows="2" class="form-input">${this.esc(description)}</textarea></label>
                    <div class="sc-form-row">
                        <label class="sc-form-field"><span>تاريخ البداية *</span>
                            <input type="date" name="startDate" required value="${this.esc(startDate)}" class="form-input"></label>
                        <label class="sc-form-field"><span>تاريخ النهاية</span>
                            <input type="date" name="endDate" value="${this.esc(endDate)}" class="form-input"></label>
                    </div>
                    <div class="sc-form-row">
                        <label class="sc-form-field"><span>التكرار</span>
                            <select name="recurring" class="form-input">
                                <option value="once" ${recurring === 'once' ? 'selected' : ''}>مرة واحدة</option>
                                <option value="yearly" ${recurring === 'yearly' || recurring === 'سنوي' ? 'selected' : ''}>سنوي</option>
                            </select></label>
                        <label class="sc-form-field"><span>اللون</span>
                            <input type="color" name="color" value="${this.esc(color)}" class="sc-color-input"></label>
                    </div>
                    <label class="sc-form-check"><input type="checkbox" name="enabled" ${enabled ? 'checked' : ''}>
                        <span>مفعّل</span></label>
                    <div class="sc-modal-footer sc-form-footer">
                        ${isEdit ? `<button type="button" class="btn-danger btn-sm" id="sc-custom-delete">
                            <i class="fas fa-trash ml-1"></i>حذف</button>` : ''}
                        <button type="button" class="btn-secondary btn-sm" id="sc-custom-cancel">إلغاء</button>
                        <button type="submit" class="btn-primary btn-sm">حفظ</button>
                    </div>
                </form>
            </div>
        </div>`;
        const wrap = document.createElement('div');
        wrap.innerHTML = html;
        const modal = wrap.firstElementChild;
        document.body.appendChild(modal);
        const close = () => { try { modal.remove(); } catch (_e) { /* ignore */ } };
        modal.querySelector('#sc-custom-form-close')?.addEventListener('click', close);
        modal.querySelector('#sc-custom-cancel')?.addEventListener('click', close);
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        modal.querySelector('#sc-custom-delete')?.addEventListener('click', async () => {
            if (!confirm('حذف هذا الحدث؟')) return;
            await this.deleteCustomEvent(rec.id);
            close();
            if (this._managerModalRefresh) this._managerModalRefresh();
        });
        modal.querySelector('#sc-custom-event-form-el')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const payload = {
                title: String(fd.get('title') || '').trim(),
                description: String(fd.get('description') || '').trim(),
                startDate: fd.get('startDate'),
                endDate: fd.get('endDate') || '',
                recurring: fd.get('recurring') || 'once',
                color: fd.get('color') || '#7c3aed',
                enabled: fd.get('enabled') === 'on'
            };
            if (!payload.title || !payload.startDate) {
                Notification?.warning?.('العنوان وتاريخ البداية مطلوبان');
                return;
            }
            const res = await this.saveCustomEvent(payload, isEdit ? rec.id : null);
            if (res && res.success) {
                close();
                if (this._managerModalRefresh) this._managerModalRefresh();
            }
        });
    },

    showCustomEventManager() {
        if (!this.canManageCustomEvents()) return;
        const list = Array.isArray(AppState?.appData?.safetyCalendarCustomEvents)
            ? AppState.appData.safetyCalendarCustomEvents.slice()
            : [];
        list.sort((a, b) => String(a.startDate || a.date || '').localeCompare(String(b.startDate || b.date || '')));
        const rows = list.length
            ? list.map((ev) => {
                const off = ev.enabled === false || ev.enabled === 'false';
                return `<tr class="${off ? 'sc-ev-disabled' : ''}">
                    <td>${this.esc(ev.title || '')}</td>
                    <td>${this.esc(ev.startDate || ev.date || '')}</td>
                    <td>${this.esc(ev.endDate || '—')}</td>
                    <td>${ev.recurring === 'yearly' ? 'سنوي' : 'مرة'}</td>
                    <td class="sc-ev-actions">
                        <button type="button" class="btn-secondary btn-sm sc-ev-edit" data-id="${this.esc(ev.id)}">تعديل</button>
                    </td>
                </tr>`;
            }).join('')
            : '<tr><td colspan="5" class="text-gray-500">لا توجد أحداث مخصصة بعد.</td></tr>';
        const html = `
        <div class="modal-overlay sc-modal-overlay" id="sc-event-manager">
            <div class="modal-content sc-modal-content sc-manager-modal" role="dialog" aria-modal="true">
                <div class="sc-modal-header">
                    <div>
                        <h3 class="sc-modal-title">إدارة أحداث التقويم</h3>
                        <p class="sc-manager-sub">أحداث مخصصة — أعياد مصر والأيام العالمية من المرجع الثابت</p>
                    </div>
                    <button type="button" class="sc-modal-close" id="sc-manager-close" aria-label="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="sc-manager-toolbar">
                    <button type="button" class="btn-primary btn-sm" id="sc-manager-add">
                        <i class="fas fa-plus ml-1"></i>إضافة حدث
                    </button>
                </div>
                <div class="sc-modal-body sc-manager-body">
                    <table class="sc-manager-table">
                        <thead><tr><th>العنوان</th><th>البداية</th><th>النهاية</th><th>التكرار</th><th></th></tr></thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>
        </div>`;
        const wrap = document.createElement('div');
        wrap.innerHTML = html;
        const modal = wrap.firstElementChild;
        document.body.appendChild(modal);
        const close = () => {
            this._managerModalRefresh = null;
            try { modal.remove(); } catch (_e) { /* ignore */ }
        };
        this._managerModalRefresh = () => {
            close();
            this.showCustomEventManager();
        };
        modal.querySelector('#sc-manager-close')?.addEventListener('click', close);
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        modal.querySelector('#sc-manager-add')?.addEventListener('click', () => {
            this.openCustomEventForm(null, {});
        });
        modal.querySelectorAll('.sc-ev-edit').forEach((btn) => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const rec = list.find((r) => String(r.id) === String(id));
                if (rec) this.openCustomEventForm(rec, {});
            });
        });
    },

    async refreshDashboardWidgetIfVisible() {
        const wrap = document.getElementById('dash-safety-calendar-wrap');
        if (wrap && wrap.querySelector('.sc-dash-body')) {
            await this.loadDashboardWidget();
        }
    },

    buildEvents() {
        if (!window.SafetyCalendarEvents) return { events: [], truncated: false };
        return SafetyCalendarEvents.buildSafetyCalendarEvents({
            categories: this.getEnabledCategories(),
            assigneeMode: this.getAssigneeMode(),
            showEgyptHolidays: this.getShowEgyptHolidays(),
            showIntlDays: this.getShowIntlDays(),
            showCustomEvents: this.getShowCustomEvents()
        });
    },

    renderReferenceToggles() {
        const egChecked = this.getShowEgyptHolidays() ? 'checked' : '';
        const intlChecked = this.getShowIntlDays() ? 'checked' : '';
        const customChecked = this.getShowCustomEvents() ? 'checked' : '';
        return `<div class="sc-ref-toggles" role="group" aria-label="طبقات التقويم">
            <span class="sc-ref-label"><i class="fas fa-layer-group ml-1"></i>طبقات:</span>
            <label class="sc-ref-toggle"><input type="checkbox" class="sc-ref-pref" data-pref="showEgyptHolidays" ${egChecked}>
                <span>أعياد مصر</span></label>
            <label class="sc-ref-toggle"><input type="checkbox" class="sc-ref-pref" data-pref="showIntlDays" ${intlChecked}>
                <span>أيام عالمية</span></label>
            <label class="sc-ref-toggle"><input type="checkbox" class="sc-ref-pref" data-pref="showCustomEvents" ${customChecked}>
                <span>أحداث مخصصة</span></label>
            ${this.canManageCustomEvents() ? `<button type="button" class="btn-secondary btn-sm sc-manage-events-btn" id="sc-manage-events-btn">
                <i class="fas fa-calendar-plus ml-1"></i>إدارة الأحداث
            </button>` : ''}
        </div>`;
    },

    renderAssigneeFilter() {
        const mode = this.getAssigneeMode();
        if (this.isEffectiveAdmin()) {
            const allActive = mode === 'all' ? 'is-active' : '';
            const mineActive = mode === 'mine' ? 'is-active' : '';
            return `<div class="sc-assignee-filter" role="group" aria-label="فلتر المكلف">
                <span class="sc-assignee-label"><i class="fas fa-user-check ml-1"></i>العرض:</span>
                <button type="button" class="sc-assignee-btn ${allActive}" data-assignee-mode="all">عرض الكل</button>
                <button type="button" class="sc-assignee-btn ${mineActive}" data-assignee-mode="mine">مهامي فقط</button>
            </div>`;
        }
        return `<div class="sc-assignee-filter sc-assignee-filter-readonly">
            <span class="sc-assignee-badge"><i class="fas fa-user ml-1"></i>مهامك + أحداث السلامة</span>
        </div>`;
    },

    renderFilterBar() {
        const cats = window.SafetyCalendarEvents
            ? SafetyCalendarEvents.SAFETY_CALENDAR_CATEGORIES
            : {};
        const enabled = new Set(this.getEnabledCategories());
        const items = Object.keys(cats).map((key) => {
            const c = cats[key];
            const checked = enabled.has(key) ? 'checked' : '';
            return `<label class="sc-filter-chip" style="--sc-color:${this.esc(c.color)}">
                <input type="checkbox" class="sc-cat-filter" data-cat="${this.esc(key)}" ${checked}>
                <span class="sc-filter-dot"></span>
                <span>${this.esc(c.label)}</span>
            </label>`;
        }).join('');
        return `<div class="sc-filter-bar">
            ${this.renderAssigneeFilter()}
            ${this.renderReferenceToggles()}
            <span class="sc-filter-label"><i class="fas fa-filter ml-1"></i>فلترة الأنواع:</span>
            <div class="sc-cat-bulk" role="group" aria-label="تحديد الأنواع">
                <button type="button" class="sc-cat-bulk-btn" id="sc-select-all">
                    <i class="fas fa-check-double ml-1"></i>تحديد الكل
                </button>
                <button type="button" class="sc-cat-bulk-btn" id="sc-clear-all">
                    <i class="fas fa-eraser ml-1"></i>إلغاء الكل
                </button>
            </div>
            <div class="sc-filter-chips">${items}</div>
            <button type="button" class="btn-secondary btn-sm sc-refresh-btn" id="sc-refresh-btn">
                <i class="fas fa-sync-alt ml-1"></i>تحديث
            </button>
        </div>`;
    },

    renderShell() {
        return `
        <div class="sc-root">
            <div class="sc-header">
                <div class="sc-header-text">
                    <h2 class="section-title sc-title">
                        <i class="fas fa-calendar-days ml-2"></i>
                        ${this.t('nav.safetyCalendar', 'تقويم السلامة')}
                    </h2>
                    <p class="section-subtitle sc-subtitle">عرض موحّد لأحداث السلامة من جميع الموديولات</p>
                </div>
            </div>
            ${this.renderFilterBar()}
            <div id="sc-truncated-warn" class="sc-truncated-warn" hidden></div>
            <div id="sc-fc-error" class="sc-error-card" hidden>
                <i class="fas fa-exclamation-triangle"></i>
                <p>تعذر تحميل مكتبة التقويم. تحقق من الاتصال ثم أعد المحاولة.</p>
                <button type="button" class="btn-primary btn-sm" id="sc-retry-fc">إعادة المحاولة</button>
            </div>
            <div id="safety-calendar-root" class="sc-calendar-root"></div>
        </div>`;
    },

    showEventModal(eventLike) {
        const props = eventLike.extendedProps || eventLike;
        const category = props.category;
        const sourceId = props.sourceId;
        if (!window.SafetyCalendarEvents) return;

        const record = SafetyCalendarEvents.getRecordForEvent(category, sourceId);
        const fields = record ? SafetyCalendarEvents.buildDetailFields(record) : [];
        const catInfo = SafetyCalendarEvents.SAFETY_CALENDAR_CATEGORIES[category] || {};
        const moduleKey = props.moduleKey || catInfo.moduleKey;

        const rows = fields.map((f) => `
            <tr>
                <th>${this.esc(f.label)}</th>
                <td>${this.esc(f.value)}</td>
            </tr>`).join('');

        const canEdit = category === 'user-tasks' && record && this.canEditUserTask(record);
        const canEditCustom = category === 'custom-event' && record && this.canManageCustomEvents();
        const isReference = props.isReference === true;
        const assigneeHint = props.assigneeHint ? `
            <p class="sc-modal-assignee"><i class="fas fa-user ml-1"></i>المكلف: ${this.esc(props.assigneeHint)}</p>` : '';

        const html = `
        <div class="modal-overlay sc-modal-overlay" id="sc-event-modal">
            <div class="modal-content sc-modal-content" role="dialog" aria-modal="true">
                <div class="sc-modal-header" style="border-color:${this.esc(catInfo.color || '#2563eb')}">
                    <div>
                        <span class="sc-modal-badge" style="background:${this.esc(catInfo.color || '#2563eb')}">
                            ${this.esc(props.categoryLabel || catInfo.label || '')}
                        </span>
                        <h3 class="sc-modal-title">${this.esc(eventLike.title || '')}</h3>
                        ${assigneeHint}
                    </div>
                    <button type="button" class="sc-modal-close" id="sc-modal-close" aria-label="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="sc-modal-body">
                    ${rows ? `<table class="sc-detail-table"><tbody>${rows}</tbody></table>`
                        : (isReference
                            ? '<p class="text-gray-500">حدث مرجعي (عطلة أو يوم عالمي) — للعرض فقط.</p>'
                            : '<p class="text-gray-500">لا تتوفر تفاصيل إضافية لهذا الحدث.</p>')}
                </div>
                <div class="sc-modal-footer">
                    <button type="button" class="btn-secondary btn-sm" id="sc-copy-id" data-id="${this.esc(sourceId)}">
                        <i class="fas fa-copy ml-1"></i>نسخ المعرف
                    </button>
                    ${canEditCustom ? `<button type="button" class="btn-secondary btn-sm" id="sc-edit-custom">
                        <i class="fas fa-pen ml-1"></i>تعديل الحدث
                    </button>` : ''}
                    ${canEdit ? `<button type="button" class="btn-secondary btn-sm" id="sc-edit-task">
                        <i class="fas fa-pen ml-1"></i>تعديل المهمة
                    </button>` : ''}
                    ${moduleKey && !isReference ? `<button type="button" class="btn-primary btn-sm" id="sc-open-module" data-module="${this.esc(moduleKey)}">
                        <i class="fas fa-external-link-alt ml-1"></i>فتح في الموديول
                    </button>` : ''}
                </div>
            </div>
        </div>`;

        if (this._modalEl) {
            try { this._modalEl.remove(); } catch (_e) { /* ignore */ }
        }
        const wrap = document.createElement('div');
        wrap.innerHTML = html;
        this._modalEl = wrap.firstElementChild;
        document.body.appendChild(this._modalEl);

        const close = () => {
            if (this._modalEl) {
                this._modalEl.remove();
                this._modalEl = null;
            }
        };

        this._modalEl.querySelector('#sc-modal-close')?.addEventListener('click', close);
        this._modalEl.addEventListener('click', (e) => {
            if (e.target === this._modalEl) close();
        });
        this._modalEl.querySelector('#sc-copy-id')?.addEventListener('click', () => {
            const id = sourceId || '';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(id).catch(() => {});
            }
            if (typeof Notification !== 'undefined' && Notification.success) {
                Notification.success('تم نسخ المعرف');
            }
        });
        this._modalEl.querySelector('#sc-open-module')?.addEventListener('click', () => {
            close();
            if (typeof UI !== 'undefined' && UI.showSection && moduleKey) {
                if (typeof Permissions !== 'undefined' && Permissions.hasAccess && !Permissions.hasAccess(moduleKey)) {
                    if (typeof Notification !== 'undefined' && Notification.error) {
                        Notification.error('ليس لديك صلاحية لهذا الموديول');
                    }
                    return;
                }
                UI.showSection(moduleKey);
            }
        });
        this._modalEl.querySelector('#sc-edit-task')?.addEventListener('click', () => {
            close();
            if (typeof UserTasks !== 'undefined' && UserTasks.showTaskForm && record) {
                UserTasks.showTaskForm(record, {
                    skipModuleReload: true,
                    onSaved: () => {
                        this.refreshCalendarEvents();
                        this.refreshDashboardWidgetIfVisible();
                    }
                });
            }
        });
        this._modalEl.querySelector('#sc-edit-custom')?.addEventListener('click', () => {
            close();
            if (record) this.openCustomEventForm(record, {});
        });
    },

    destroyCalendar() {
        if (this._calendar) {
            try { this._calendar.destroy(); } catch (_e) { /* ignore */ }
            this._calendar = null;
        }
    },

    refreshCalendarEvents() {
        const result = this.buildEvents();
        const warn = document.getElementById('sc-truncated-warn');
        if (warn) {
            if (result.truncated) {
                warn.hidden = false;
                warn.textContent = `تم عرض ${result.maxEvents} حدث كحد أقصى. قلّل النطاق بالفلاتر إن لزم.`;
            } else {
                warn.hidden = true;
            }
        }
        if (this._calendar) {
            try {
                this._calendar.getEventSources().forEach((src) => {
                    try { src.remove(); } catch (_e) { /* ignore */ }
                });
            } catch (_e) { /* ignore */ }
            this._calendar.removeAllEvents();
            if (Array.isArray(result.events) && result.events.length) {
                this._calendar.addEventSource(result.events);
            }
        }
        if (this._dashCalendar) {
            try {
                this._dashCalendar.getEventSources().forEach((src) => {
                    try { src.remove(); } catch (_e) { /* ignore */ }
                });
            } catch (_e) { /* ignore */ }
            this._dashCalendar.removeAllEvents();
            if (Array.isArray(result.events) && result.events.length) {
                this._dashCalendar.addEventSource(result.events);
            }
        }
        return result;
    },

    bindFilterEvents(section) {
        section.querySelectorAll('[data-assignee-mode]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const mode = btn.getAttribute('data-assignee-mode');
                if (mode !== 'all' && mode !== 'mine') return;
                this._assigneeMode = mode;
                section.querySelectorAll('[data-assignee-mode]').forEach((b) => {
                    b.classList.toggle('is-active', b.getAttribute('data-assignee-mode') === mode);
                });
                this.refreshCalendarEvents();
            });
        });
        const applyCategorySelection = () => {
            const selected = [];
            section.querySelectorAll('.sc-cat-filter:checked').forEach((x) => {
                selected.push(x.getAttribute('data-cat'));
            });
            this._activeCategories = selected;
            this.refreshCalendarEvents();
        };
        section.querySelectorAll('.sc-cat-filter').forEach((cb) => {
            cb.addEventListener('change', applyCategorySelection);
        });
        section.querySelector('#sc-select-all')?.addEventListener('click', () => {
            section.querySelectorAll('.sc-cat-filter').forEach((x) => { x.checked = true; });
            applyCategorySelection();
        });
        section.querySelector('#sc-clear-all')?.addEventListener('click', () => {
            section.querySelectorAll('.sc-cat-filter').forEach((x) => { x.checked = false; });
            applyCategorySelection();
        });
        section.querySelector('#sc-refresh-btn')?.addEventListener('click', () => {
            this._activeCategories = null;
            section.querySelectorAll('.sc-cat-filter').forEach((x) => { x.checked = true; });
            this.refreshCalendarEvents();
        });
        section.querySelectorAll('.sc-ref-pref').forEach((cb) => {
            cb.addEventListener('change', () => {
                const key = cb.getAttribute('data-pref');
                if (!key) return;
                this.setReferencePref(key, cb.checked);
            });
        });
        section.querySelector('#sc-manage-events-btn')?.addEventListener('click', () => {
            this.showCustomEventManager();
        });
    },

    async initFullCalendar(section) {
        const root = section.querySelector('#safety-calendar-root');
        const errCard = section.querySelector('#sc-fc-error');
        if (!root) return;

        const ok = await this.ensureFullCalendarLoaded();
        if (!ok) {
            if (errCard) errCard.hidden = false;
            section.querySelector('#sc-retry-fc')?.addEventListener('click', () => {
                this._fcLoadPromise = null;
                if (errCard) errCard.hidden = true;
                this.initFullCalendar(section);
            });
            return;
        }
        if (errCard) errCard.hidden = true;

        this.destroyCalendar();
        const result = this.buildEvents();
        const self = this;
        const headerLeft = [];
        if (this.canAddTasksFromCalendar()) headerLeft.push('addTask');
        if (this.canManageCustomEvents()) {
            headerLeft.push('addCustomEvent', 'manageEvents');
        }
        headerLeft.push('dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek');
        const fcOverrides = {
            initialView: 'dayGridMonth',
            height: 'auto',
            headerToolbar: {
                right: 'scPrev,scNext scToday',
                center: 'title',
                left: headerLeft.join(',')
            },
            events: result.events,
            eventClick: (info) => {
                info.jsEvent.preventDefault();
                self.showEventModal(info.event);
            },
            dateClick: (info) => {
                const dueDate = info.dateStr || (info.date
                    ? info.date.toISOString().slice(0, 10)
                    : '');
                if (self.canManageCustomEvents() && self.canAddTasksFromCalendar()) {
                    self.showDateClickMenu(dueDate);
                } else if (self.canManageCustomEvents()) {
                    self.openCustomEventForm(null, { startDate: dueDate });
                } else if (self.canAddTasksFromCalendar()) {
                    self.openAddTaskForm(dueDate);
                }
            },
            eventDidMount: (info) => {
                const cat = info.event.extendedProps.category;
                const colors = SafetyCalendarEvents?.SAFETY_CALENDAR_CATEGORIES?.[cat];
                if (colors && colors.color) {
                    info.el.style.backgroundColor = colors.color;
                    info.el.style.borderColor = colors.color;
                }
            },
            ...this._getCalendarAppearanceHooks()
        };
        if (this.canAddTasksFromCalendar() || this.canManageCustomEvents()) {
            fcOverrides.customButtons = Object.assign({}, fcOverrides.customButtons, {
                addTask: this.canAddTasksFromCalendar() ? {
                    text: 'إضافة مهمة',
                    hint: 'إضافة مهمة في التقويم',
                    click() {
                        self.openAddTaskForm('');
                    }
                } : undefined,
                addCustomEvent: this.canManageCustomEvents() ? {
                    text: 'إضافة حدث',
                    hint: 'إضافة حدث مخصص',
                    click() {
                        self.openCustomEventForm(null, {});
                    }
                } : undefined,
                manageEvents: this.canManageCustomEvents() ? {
                    text: 'إدارة',
                    hint: 'إدارة الأحداث المخصصة',
                    click() {
                        self.showCustomEventManager();
                    }
                } : undefined
            });
            Object.keys(fcOverrides.customButtons).forEach((k) => {
                if (fcOverrides.customButtons[k] === undefined) delete fcOverrides.customButtons[k];
            });
        }

        const builder = this._buildCalendarOptions(fcOverrides);

        this._calendar = builder.render(root);

        const warn = section.querySelector('#sc-truncated-warn');
        if (warn && result.truncated) {
            warn.hidden = false;
            warn.textContent = `تم عرض ${result.maxEvents} حدث كحد أقصى.`;
        }
    },

    async load() {
        const section = document.getElementById('safety-calendar-section');
        if (!section) return;

        if (typeof Permissions !== 'undefined' && Permissions.hasAccess
            && !Permissions.hasAccess('safety-calendar')) {
            section.innerHTML = '<div class="empty-state"><p>ليس لديك صلاحية لعرض تقويم السلامة.</p></div>';
            return;
        }

        section.innerHTML = this.renderShell();
        this.bindFilterEvents(section);
        await this.ensureCustomEventsLoaded(false);
        await this.initFullCalendar(section);
    },

    /** Dashboard widget — mini view */
    renderDashboardWidgetHtml(result, summary) {
        const events = result.events || [];
        const today = summary.today;
        const upcoming = events
            .filter((e) => e.start >= today)
            .sort((a, b) => a.start.localeCompare(b.start))
            .slice(0, 12);

        const listHtml = upcoming.length
            ? upcoming.map((ev) => {
                const cat = ev.extendedProps?.category;
                const color = SafetyCalendarEvents?.SAFETY_CALENDAR_CATEGORIES?.[cat]?.color || '#64748b';
                return `<button type="button" class="sc-dash-event" data-event-id="${this.esc(ev.id)}"
                    style="--sc-ev-color:${this.esc(color)}">
                    <span class="sc-dash-event-date">${this.esc(ev.start)}</span>
                    <span class="sc-dash-event-title">${this.esc(ev.title)}</span>
                </button>`;
            }).join('')
            : '<p class="sc-dash-empty">لا توجد أحداث قادمة في البيانات المتزامنة.</p>';

        const cats = SafetyCalendarEvents?.SAFETY_CALENDAR_CATEGORIES || {};
        const legend = Object.keys(cats).slice(0, 8).map((k) => {
            const c = cats[k];
            return `<span class="sc-dash-legend-item"><i style="background:${c.color}"></i>${this.esc(c.label)}</span>`;
        }).join('');

        return `
        <div class="card-header sc-dash-header">
            <h2 class="card-title"><i class="fas fa-calendar-days ml-2"></i>تقويم السلامة</h2>
            <button type="button" class="btn-secondary btn-sm sc-dash-full" id="sc-dash-open-full">
                عرض التقويم الكامل <i class="fas fa-arrow-left mr-1"></i>
            </button>
        </div>
        <div class="card-body sc-dash-body">
            <div class="sc-dash-kpi-row">
                <div class="sc-dash-kpi"><span class="sc-dash-kpi-val">${summary.todayCount}</span><span class="sc-dash-kpi-lbl">اليوم</span></div>
                <div class="sc-dash-kpi"><span class="sc-dash-kpi-val">${summary.weekCount}</span><span class="sc-dash-kpi-lbl">7 أيام</span></div>
                <div class="sc-dash-kpi sc-dash-kpi-warn"><span class="sc-dash-kpi-val">${summary.overdueCount}</span><span class="sc-dash-kpi-lbl">متأخرة</span></div>
            </div>
            <div class="sc-dash-grid">
                <div class="sc-dash-mini-wrap">
                    <div id="sc-dash-calendar-root" class="sc-dash-calendar-root"></div>
                </div>
                <div class="sc-dash-list-wrap">
                    <h4 class="sc-dash-list-title">القادمة</h4>
                    <div class="sc-dash-list">${listHtml}</div>
                </div>
            </div>
            <div class="sc-dash-legend">${legend}</div>
        </div>`;
    },

    async mountDashboardMiniCalendar(container) {
        const miniRoot = container.querySelector('#sc-dash-calendar-root');
        if (!miniRoot) return;
        const ok = await this.ensureFullCalendarLoaded();
        if (!ok) {
            miniRoot.innerHTML = '<p class="sc-dash-empty">التقويم المصغّر غير متاح — استخدم «عرض التقويم الكامل».</p>';
            return;
        }
        const result = this.buildEvents();
        if (this._dashCalendar) {
            try { this._dashCalendar.destroy(); } catch (_e) { /* ignore */ }
        }
        const builder = this._buildCalendarOptions({
            initialView: 'dayGridMonth',
            height: 'auto',
            contentHeight: 360,
            dayMaxEvents: 2,
            moreLinkText(n) {
                return '+' + n;
            },
            headerToolbar: { right: 'scPrev,scNext', center: 'title', left: '' },
            events: result.events,
            eventClick: (info) => {
                info.jsEvent.preventDefault();
                this.showEventModal(info.event);
            },
            ...this._getCalendarAppearanceHooks()
        }, true);
        this._dashCalendar = builder.render(miniRoot);
    },

    async loadDashboardWidget() {
        const wrap = document.getElementById('dash-safety-calendar-wrap');
        if (!wrap) return;
        if (typeof Dashboard !== 'undefined' && Dashboard.dashboardCan
            && !Dashboard.dashboardCan('safety-calendar')) {
            wrap.innerHTML = '';
            return;
        }
        if (!window.SafetyCalendarEvents) {
            wrap.innerHTML = '';
            return;
        }

        try {
            await this.ensureCustomEventsLoaded(false);
            const result = this.buildEvents();
            const summary = SafetyCalendarEvents.summarizeEvents(result.events);
            wrap.innerHTML = this.renderDashboardWidgetHtml(result, summary);

            wrap.querySelector('#sc-dash-open-full')?.addEventListener('click', () => {
                if (typeof UI !== 'undefined' && UI.showSection) {
                    UI.showSection('safety-calendar');
                }
            });

            wrap.querySelectorAll('.sc-dash-event').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-event-id');
                    const ev = (result.events || []).find((e) => e.id === id);
                    if (ev) this.showEventModal(ev);
                });
            });

            await this.mountDashboardMiniCalendar(wrap);
        } catch (err) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('Safety calendar dashboard widget:', err);
            }
            wrap.innerHTML = `
                <div class="card-header sc-dash-header">
                    <h2 class="card-title"><i class="fas fa-calendar-days ml-2"></i>تقويم السلامة</h2>
                </div>
                <div class="card-body sc-dash-body">
                    <p class="sc-dash-empty">تعذر تحميل التقويم. <button type="button" class="btn-secondary btn-sm" id="sc-dash-retry">إعادة المحاولة</button></p>
                </div>`;
            wrap.querySelector('#sc-dash-retry')?.addEventListener('click', () => this.loadDashboardWidget());
        }
    }
};

if (typeof window !== 'undefined') {
    window.SafetyCalendar = SafetyCalendar;
}
