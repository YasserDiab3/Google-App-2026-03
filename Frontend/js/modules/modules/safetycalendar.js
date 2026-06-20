/**
 * Safety Calendar Module — تقويم السلامة
 */
const SafetyCalendar = {
    _calendar: null,
    _fcLoadPromise: null,
    _activeCategories: null,
    _modalEl: null,

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
        if (Array.isArray(this._activeCategories) && this._activeCategories.length) {
            return this._activeCategories;
        }
        return this.getAllCategoryKeys();
    },

    buildEvents() {
        if (!window.SafetyCalendarEvents) return { events: [], truncated: false };
        return SafetyCalendarEvents.buildSafetyCalendarEvents({
            categories: this.getEnabledCategories()
        });
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
            <span class="sc-filter-label"><i class="fas fa-filter ml-1"></i>فلترة الأنواع:</span>
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

        const html = `
        <div class="modal-overlay sc-modal-overlay" id="sc-event-modal">
            <div class="modal-content sc-modal-content" role="dialog" aria-modal="true">
                <div class="sc-modal-header" style="border-color:${this.esc(catInfo.color || '#2563eb')}">
                    <div>
                        <span class="sc-modal-badge" style="background:${this.esc(catInfo.color || '#2563eb')}">
                            ${this.esc(props.categoryLabel || catInfo.label || '')}
                        </span>
                        <h3 class="sc-modal-title">${this.esc(eventLike.title || '')}</h3>
                    </div>
                    <button type="button" class="sc-modal-close" id="sc-modal-close" aria-label="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="sc-modal-body">
                    ${rows ? `<table class="sc-detail-table"><tbody>${rows}</tbody></table>`
                        : '<p class="text-gray-500">لا تتوفر تفاصيل إضافية لهذا الحدث.</p>'}
                </div>
                <div class="sc-modal-footer">
                    <button type="button" class="btn-secondary btn-sm" id="sc-copy-id" data-id="${this.esc(sourceId)}">
                        <i class="fas fa-copy ml-1"></i>نسخ المعرف
                    </button>
                    ${moduleKey ? `<button type="button" class="btn-primary btn-sm" id="sc-open-module" data-module="${this.esc(moduleKey)}">
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
            this._calendar.removeAllEvents();
            this._calendar.addEventSource(result.events);
        }
        return result;
    },

    bindFilterEvents(section) {
        section.querySelectorAll('.sc-cat-filter').forEach((cb) => {
            cb.addEventListener('change', () => {
                const selected = [];
                section.querySelectorAll('.sc-cat-filter:checked').forEach((x) => {
                    selected.push(x.getAttribute('data-cat'));
                });
                this._activeCategories = selected.length ? selected : null;
                this.refreshCalendarEvents();
            });
        });
        section.querySelector('#sc-refresh-btn')?.addEventListener('click', () => {
            this._activeCategories = null;
            section.querySelectorAll('.sc-cat-filter').forEach((x) => { x.checked = true; });
            this.refreshCalendarEvents();
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

        this._calendar = new FullCalendar.Calendar(root, {
            initialView: 'dayGridMonth',
            locale: 'ar',
            direction: 'rtl',
            height: 'auto',
            headerToolbar: {
                right: 'prev,next today',
                center: 'title',
                left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            buttonText: {
                today: 'اليوم',
                month: 'شهر',
                week: 'أسبوع',
                day: 'يوم',
                list: 'قائمة'
            },
            events: result.events,
            eventClick: (info) => {
                info.jsEvent.preventDefault();
                this.showEventModal(info.event);
            },
            eventDidMount: (info) => {
                const cat = info.event.extendedProps.category;
                const colors = SafetyCalendarEvents?.SAFETY_CALENDAR_CATEGORIES?.[cat];
                if (colors && colors.color) {
                    info.el.style.backgroundColor = colors.color;
                    info.el.style.borderColor = colors.color;
                }
            }
        });

        this._calendar.render();

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
        this._dashCalendar = new FullCalendar.Calendar(miniRoot, {
            initialView: 'dayGridMonth',
            locale: 'ar',
            direction: 'rtl',
            height: 320,
            headerToolbar: { left: 'prev,next', center: 'title', right: '' },
            events: result.events,
            eventClick: (info) => {
                info.jsEvent.preventDefault();
                this.showEventModal(info.event);
            }
        });
        this._dashCalendar.render();
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
            wrap.innerHTML = '';
        }
    }
};

if (typeof window !== 'undefined') {
    window.SafetyCalendar = SafetyCalendar;
}
