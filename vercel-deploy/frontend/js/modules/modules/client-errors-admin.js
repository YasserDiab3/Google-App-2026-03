/**
 * ClientErrorsAdmin — لوحة مراقبة أخطاء العملاء للمدير
 * استقرار العرض: لا تُمسح البيانات عند فشل التحديث؛ فلتر افتراضي = الكل
 */
const ClientErrorsAdmin = {
    _data: [],
    _stats: null,
    _loading: false,
    _pollTimer: null,
    _live: false,
    _knownIds: new Set(),
    _filters: { level: '', status: '', q: '', limit: 200 },
    _rootId: null,
    _mounted: false,
    _refreshSeq: 0,
    _actionBusy: false,
    _lastError: '',

    _isAdmin() {
        try {
            if (typeof Permissions !== 'undefined' && Permissions.isCurrentUserAdmin) {
                return Permissions.isCurrentUserAdmin();
            }
        } catch (_e) { /* ignore */ }
        return String(AppState.currentUser?.role || '').toLowerCase() === 'admin';
    },

    _esc(v) {
        if (typeof Utils !== 'undefined' && Utils.escapeHTML) return Utils.escapeHTML(String(v ?? ''));
        return String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    },

    _fmtTime(iso) {
        try {
            if (!iso) return '—';
            const d = new Date(iso);
            if (isNaN(d.getTime())) return String(iso);
            return d.toLocaleString('ar-EG', { hour12: false });
        } catch (_e) {
            return String(iso || '—');
        }
    },

    _levelBadge(level) {
        const lv = String(level || 'error').toLowerCase();
        const map = {
            error: { bg: '#fef2f2', color: '#b91c1c', label: 'خطأ' },
            warning: { bg: '#fffbeb', color: '#b45309', label: 'تنبيه' },
            unhandled: { bg: '#f5f3ff', color: '#6d28d9', label: 'غير معالج' },
            info: { bg: '#eff6ff', color: '#1d4ed8', label: 'معلومة' }
        };
        const m = map[lv] || map.error;
        return `<span class="cea-badge" style="background:${m.bg};color:${m.color};">${m.label}</span>`;
    },

    _statusBadge(status) {
        const st = String(status || 'new').toLowerCase();
        const map = {
            new: { bg: '#ecfeff', color: '#0e7490', label: 'جديد' },
            seen: { bg: '#f1f5f9', color: '#475569', label: 'تمت المشاهدة' },
            ignored: { bg: '#f8fafc', color: '#64748b', label: 'متجاهل' },
            resolved: { bg: '#ecfdf5', color: '#047857', label: 'محلول' }
        };
        const m = map[st] || map.new;
        return `<span class="cea-badge" style="background:${m.bg};color:${m.color};">${m.label}</span>`;
    },

    _getRoot() {
        if (!this._rootId) return null;
        return document.getElementById(this._rootId);
    },

    _isPanelVisible() {
        try {
            const onSection = typeof AppState !== 'undefined' && AppState.currentSection === 'client-errors';
            const modalOpen = !!document.getElementById('client-errors-admin-modal');
            return !!(onSection || modalOpen);
        } catch (_e) {
            return !!this._getRoot();
        }
    },

    async open() {
        if (!this._isAdmin()) {
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('هذه الصفحة متاحة لمدير النظام فقط');
            }
            return;
        }
        const existing = document.getElementById('client-errors-admin-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'client-errors-admin-modal';
        modal.innerHTML = `
            <div class="modal-content cea-panel-modal" style="max-width: 1180px; max-height: 92vh; overflow-y: auto;">
                <div class="modal-header" style="background: linear-gradient(135deg, #b91c1c, #7f1d1d); color: #fff;">
                    <h2 class="modal-title" style="color:#fff;">
                        <i class="fas fa-bug ml-2"></i>
                        مراقبة أخطاء المستخدمين
                    </h2>
                    <button type="button" class="modal-close" id="cea-modal-x" style="color:#fff;" title="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="cea-modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
        const closeModal = () => {
            this.stopLive();
            this._mounted = false;
            modal.remove();
        };
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        modal.querySelector('#cea-modal-x')?.addEventListener('click', closeModal);
        this.mount(modal.querySelector('#cea-modal-body'), { liveDefault: true });
    },

    /** تحميل داخل قسم الصفحة — لا يعيد البناء إن كان مُثبّتاً */
    async load() {
        if (!this._isAdmin()) {
            const section = document.getElementById('client-errors-section');
            if (section) {
                section.innerHTML = '<div class="p-6 text-slate-600">هذا القسم متاح لمدير النظام فقط.</div>';
            }
            this._mounted = false;
            return;
        }
        const section = document.getElementById('client-errors-section');
        if (!section) return;

        let root = section.querySelector('#cea-section-root');
        if (root && this._mounted && this._rootId === 'cea-section-root' && this._getRoot()) {
            this.refresh({ silent: true });
            if (!this._live) this.startLive();
            return;
        }

        section.innerHTML = '<div id="cea-section-root" class="p-4 cea-panel"></div>';
        root = section.querySelector('#cea-section-root');
        this.mount(root, { liveDefault: true });
    },

    mount(root, opts = {}) {
        if (!root) return;
        this._rootId = root.id || ('cea-root-' + Date.now());
        if (!root.id) root.id = this._rootId;
        root.innerHTML = this._shellHtml(!!opts.liveDefault);
        this._bindShell(root);
        this._mounted = true;
        this.refresh({ force: true });
        if (opts.liveDefault) this.startLive();
    },

    _shellHtml(liveOn) {
        return `
            <div class="cea-toolbar flex flex-wrap items-center justify-between gap-2 mb-4">
                <div class="text-sm text-slate-600">
                    <i class="fas fa-satellite-dish text-red-600 ml-1"></i>
                    مراقبة أخطاء المستخدمين الظاهرة في الواجهة
                    <span id="cea-live-indicator" class="mr-2" style="font-weight:700;color:${liveOn ? '#047857' : '#64748b'};">
                        ${liveOn ? '● مباشر' : '○ متوقف'}
                    </span>
                    <span id="cea-sync-hint" class="text-xs text-slate-400 mr-2"></span>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button type="button" id="cea-refresh-btn" class="btn-secondary"><i class="fas fa-sync-alt ml-2"></i>تحديث</button>
                    <button type="button" id="cea-live-btn" class="btn-primary" style="background:linear-gradient(135deg,#b91c1c,#7f1d1d);">
                        <i class="fas fa-broadcast-tower ml-2"></i>${liveOn ? 'إيقاف المباشر' : 'تشغيل المباشر'}
                    </button>
                    <button type="button" id="cea-export-btn" class="btn-success"><i class="fas fa-file-excel ml-2"></i>تصدير</button>
                </div>
            </div>

            <div id="cea-stats" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"></div>
            <div id="cea-banner" class="mb-3" hidden></div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
                <input id="cea-q" class="form-input" placeholder="بحث في الرسالة / المستخدم..." value="${this._esc(this._filters.q)}" />
                <select id="cea-level" class="form-input">
                    <option value="">كل المستويات</option>
                    <option value="error" ${this._filters.level === 'error' ? 'selected' : ''}>خطأ</option>
                    <option value="warning" ${this._filters.level === 'warning' ? 'selected' : ''}>تنبيه</option>
                    <option value="unhandled" ${this._filters.level === 'unhandled' ? 'selected' : ''}>غير معالج</option>
                </select>
                <select id="cea-status" class="form-input">
                    <option value="" ${!this._filters.status ? 'selected' : ''}>كل الحالات</option>
                    <option value="new" ${this._filters.status === 'new' ? 'selected' : ''}>جديد</option>
                    <option value="seen" ${this._filters.status === 'seen' ? 'selected' : ''}>تمت المشاهدة</option>
                    <option value="ignored" ${this._filters.status === 'ignored' ? 'selected' : ''}>متجاهل</option>
                    <option value="resolved" ${this._filters.status === 'resolved' ? 'selected' : ''}>محلول</option>
                </select>
                <button type="button" id="cea-apply-filters" class="btn-secondary"><i class="fas fa-filter ml-2"></i>تطبيق الفلتر</button>
            </div>

            <div id="cea-table" class="overflow-x-auto"></div>
            <style>
                .cea-badge{border-radius:999px;padding:2px 8px;font-size:11px;font-weight:700;display:inline-block;}
                .cea-row-actions{display:flex;flex-wrap:wrap;gap:4px;}
                .cea-row-actions button{font-size:11px;padding:4px 8px;white-space:nowrap;}
                .cea-row-actions button:disabled{opacity:.55;cursor:not-allowed;}
                #cea-stats .cea-stat{border:1px solid rgba(0,0,0,.06);border-radius:12px;padding:12px;min-height:72px;}
                #cea-banner .cea-alert{padding:10px 12px;border-radius:10px;font-size:.85rem;font-weight:600;}
                #cea-banner .cea-alert-warn{background:#fffbeb;color:#92400e;border:1px solid #fde68a;}
                #cea-banner .cea-alert-err{background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;}
                #cea-banner .cea-alert-ok{background:#f0fdfa;color:#0f766e;border:1px solid #99f6e4;}
            </style>
        `;
    },

    _bindShell(root) {
        root.querySelector('#cea-refresh-btn')?.addEventListener('click', () => this.refresh({ force: true }));
        root.querySelector('#cea-live-btn')?.addEventListener('click', () => {
            if (this._live) this.stopLive();
            else this.startLive();
            this._updateLiveUi(root);
        });
        root.querySelector('#cea-export-btn')?.addEventListener('click', () => this.exportToExcel());
        root.querySelector('#cea-apply-filters')?.addEventListener('click', () => {
            this._filters.q = root.querySelector('#cea-q')?.value?.trim() || '';
            this._filters.level = root.querySelector('#cea-level')?.value || '';
            this._filters.status = root.querySelector('#cea-status')?.value || '';
            this.refresh({ force: true });
        });
        // تفويض أحداث الصف — يمنع فقدان الأزرار بعد إعادة الرسم
        root.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-cea-action]');
            if (!btn || !root.contains(btn)) return;
            e.preventDefault();
            e.stopPropagation();
            if (this._actionBusy || btn.disabled) return;
            const id = btn.getAttribute('data-id');
            const action = btn.getAttribute('data-cea-action');
            if (!id || !action) return;
            if (action === 'status') this.setStatus(id, btn.getAttribute('data-status'));
            else if (action === 'report') this.reportIssue(id);
            else if (action === 'detail') this.showDetail(id);
            else if (action === 'ignore') this.setStatus(id, 'ignored');
        });
    },

    _updateLiveUi(root) {
        const host = root || this._getRoot();
        if (!host) return;
        const btn = host.querySelector('#cea-live-btn');
        const ind = host.querySelector('#cea-live-indicator');
        if (btn) btn.innerHTML = `<i class="fas fa-broadcast-tower ml-2"></i>${this._live ? 'إيقاف المباشر' : 'تشغيل المباشر'}`;
        if (ind) {
            ind.style.color = this._live ? '#047857' : '#64748b';
            ind.textContent = this._live ? '● مباشر' : '○ متوقف';
        }
    },

    startLive() {
        this.stopLive();
        this._live = true;
        this._pollTimer = setInterval(() => {
            if (document.visibilityState === 'hidden') return;
            if (!this._isPanelVisible()) {
                this.stopLive();
                return;
            }
            this.refresh({ silent: true });
        }, 20000);
        this._updateLiveUi();
    },

    stopLive() {
        this._live = false;
        if (this._pollTimer) {
            clearInterval(this._pollTimer);
            this._pollTimer = null;
        }
        this._updateLiveUi();
    },

    cleanup() {
        this.stopLive();
        this._mounted = false;
    },

    _setSyncHint(text) {
        const root = this._getRoot();
        const el = root && root.querySelector('#cea-sync-hint');
        if (el) el.textContent = text || '';
    },

    _setBanner(html, kind) {
        const root = this._getRoot();
        const box = root && root.querySelector('#cea-banner');
        if (!box) return;
        if (!html) {
            box.hidden = true;
            box.innerHTML = '';
            return;
        }
        const cls = kind === 'ok' ? 'cea-alert-ok' : (kind === 'warn' ? 'cea-alert-warn' : 'cea-alert-err');
        box.hidden = false;
        box.innerHTML = `<div class="cea-alert ${cls}">${html}</div>`;
    },

    async refresh(opts = {}) {
        if (this._loading && !opts.force) return;
        if (opts.silent && !this._isPanelVisible()) {
            this.stopLive();
            return;
        }
        if (!this._getRoot()) return;

        this._loading = true;
        const seq = ++this._refreshSeq;
        this._setSyncHint('جاري التحديث…');
        try {
            const filters = {
                level: this._filters.level || '',
                status: this._filters.status || '',
                q: this._filters.q || '',
                limit: Number(this._filters.limit) || 200
            };
            const [listRes, statsRes] = await Promise.all([
                GoogleIntegration.sendToAppsScript('getAllClientErrorLogs', {
                    filters: filters,
                    __timeoutMs: 45000,
                    __highPriority: false
                }),
                GoogleIntegration.sendToAppsScript('getClientErrorStats', {
                    filters: {},
                    __timeoutMs: 45000,
                    __highPriority: false
                })
            ]);

            if (seq !== this._refreshSeq) return;

            const listOk = !!(listRes && listRes.success && Array.isArray(listRes.data));
            const statsOk = !!(statsRes && statsRes.success);

            if (listOk) {
                const rows = listRes.data;
                let newCount = 0;
                rows.forEach((r) => {
                    if (r.id && !this._knownIds.has(r.id)) {
                        if (this._knownIds.size > 0) newCount += 1;
                        this._knownIds.add(r.id);
                    }
                });
                this._data = rows;
                this._lastError = '';
                this._renderTable(newCount);
                if (newCount > 0) {
                    this._setBanner(`ورد ${newCount} خطأ جديد`, 'ok');
                } else {
                    this._setBanner('');
                }
            } else {
                // لا تمسح البيانات السابقة عند الفشل
                this._lastError = (listRes && listRes.message) || 'فشل تحميل السجل';
                this._setBanner(
                    `تعذر تحديث القائمة — تم الإبقاء على آخر بيانات ناجحة. ${this._esc(this._lastError)}`,
                    'warn'
                );
                if (!opts.silent && typeof Notification !== 'undefined' && Notification.error) {
                    Notification.error('فشل تحميل سجل الأخطاء: ' + this._lastError);
                }
                if (!this._data.length) this._renderTable(0);
            }

            if (statsOk) {
                this._stats = statsRes;
            }
            this._renderStats();
            this._setSyncHint(listOk ? ('آخر تحديث: ' + new Date().toLocaleTimeString('ar-EG')) : 'تحديث جزئي');
        } catch (error) {
            if (seq !== this._refreshSeq) return;
            this._lastError = error && error.message ? error.message : String(error || 'خطأ شبكة');
            this._setBanner(
                `تعذر الاتصال — الإبقاء على آخر بيانات. ${this._esc(this._lastError)}`,
                'err'
            );
            if (!opts.silent && typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('فشل تحميل سجل الأخطاء: ' + this._lastError);
            }
            this._renderStats();
            if (!this._data.length) this._renderTable(0);
            this._setSyncHint('فشل التحديث');
        } finally {
            if (seq === this._refreshSeq) this._loading = false;
        }
    },

    _renderStats() {
        const root = this._getRoot();
        const box = root && root.querySelector('#cea-stats');
        if (!box) return;
        const s = this._stats || {};
        const byLevel = s.byLevel || {};
        const byStatus = s.byStatus || {};
        const cards = [
            { label: 'إجمالي السجلات', value: s.total != null ? s.total : (this._data.length || 0), color: '#0f766e', bg: '#f0fdfa' },
            { label: 'آخر 24 ساعة', value: s.last24h || 0, color: '#b91c1c', bg: '#fef2f2' },
            { label: 'جديد', value: byStatus.new || 0, color: '#0e7490', bg: '#ecfeff' },
            { label: 'أخطاء', value: byLevel.error || 0, color: '#7f1d1d', bg: '#fff1f2' }
        ];
        box.innerHTML = cards.map((c) => `
            <div class="cea-stat" style="background:${c.bg};">
                <div style="font-size:1.4rem;font-weight:800;color:${c.color};" dir="ltr">${c.value}</div>
                <div style="font-size:0.75rem;color:#64748b;">${c.label}</div>
            </div>
        `).join('');
    },

    _renderTable(newCount) {
        const root = this._getRoot();
        const box = root && root.querySelector('#cea-table');
        if (!box) return;
        if (!this._data.length) {
            box.innerHTML = `<div class="text-center text-slate-500 py-10">
                لا توجد أخطاء مطابقة للفلتر حالياً.
                ${this._filters.status || this._filters.level || this._filters.q
                    ? '<div class="mt-2 text-xs">جرّب اختيار «كل الحالات» ثم تحديث.</div>'
                    : ''}
            </div>`;
            return;
        }
        const banner = newCount > 0
            ? `<div class="mb-3 p-2 rounded" style="background:#fef2f2;color:#b91c1c;font-weight:700;">ورد ${newCount} خطأ جديد في هذه الجولة</div>`
            : '';
        box.innerHTML = banner + `
            <table class="w-full text-sm" style="border-collapse:collapse;">
                <thead>
                    <tr style="background:#f8fafc;text-align:right;">
                        <th class="p-2">الوقت</th>
                        <th class="p-2">المستوى</th>
                        <th class="p-2">الرسالة</th>
                        <th class="p-2">المستخدم</th>
                        <th class="p-2">الموديول</th>
                        <th class="p-2">الحالة</th>
                        <th class="p-2">إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${this._data.map((r) => {
                        const rid = this._esc(r.id);
                        return `
                        <tr data-cea-row="${rid}" style="border-top:1px solid #e2e8f0;vertical-align:top;">
                            <td class="p-2 whitespace-nowrap" dir="ltr">${this._esc(this._fmtTime(r.createdAt))}</td>
                            <td class="p-2">${this._levelBadge(r.level)}</td>
                            <td class="p-2" style="max-width:340px;">
                                <div style="font-weight:600;">${this._esc(String(r.message || '').slice(0, 160))}</div>
                                <div class="text-xs text-slate-500" dir="ltr">${this._esc(String(r.appVersion || ''))} · ${this._esc(String(r.source || '').slice(0, 60))}</div>
                            </td>
                            <td class="p-2">
                                <div>${this._esc(r.username || '—')}</div>
                                <div class="text-xs text-slate-500" dir="ltr">${this._esc(r.userEmail || '')}</div>
                            </td>
                            <td class="p-2">${this._esc(r.module || '—')}</td>
                            <td class="p-2 cea-status-cell">${this._statusBadge(r.status)}</td>
                            <td class="p-2">
                                <div class="cea-row-actions">
                                    <button type="button" class="btn-secondary" data-cea-action="detail" data-id="${rid}">تفاصيل</button>
                                    <button type="button" class="btn-secondary" data-cea-action="status" data-status="seen" data-id="${rid}">مشاهدة</button>
                                    <button type="button" class="btn-secondary" data-cea-action="status" data-status="resolved" data-id="${rid}">حل</button>
                                    <button type="button" class="btn-secondary" data-cea-action="ignore" data-id="${rid}">تجاهل</button>
                                    <button type="button" class="btn-primary" data-cea-action="report" data-id="${rid}">إبلاغ</button>
                                </div>
                            </td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
        `;
    },

    _patchRowStatus(id, status) {
        const row = this._data.find((r) => String(r.id) === String(id));
        if (row) row.status = status;
        const root = this._getRoot();
        const tr = root && root.querySelector(`[data-cea-row="${CSS.escape ? CSS.escape(String(id)) : String(id).replace(/"/g, '\\"')}"]`);
        const cell = tr && tr.querySelector('.cea-status-cell');
        if (cell) cell.innerHTML = this._statusBadge(status);
        // إن كان الفلتر يستبعد الحالة الجديدة — أعد الجلب لاحقاً فقط
        if (this._filters.status && this._filters.status !== status) {
            // أبقِ الصف حتى التحديث اليدوي؛ لا تُفرغ القائمة فوراً
        }
        this._renderStats();
    },

    showDetail(id) {
        const row = this._data.find((r) => String(r.id) === String(id));
        if (!row) return;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width:720px;">
                <div class="modal-header"><h3 class="modal-title">تفاصيل الخطأ</h3>
                    <button type="button" class="modal-close" id="cea-detail-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body text-sm" style="white-space:pre-wrap;direction:ltr;text-align:left;">
${this._esc(JSON.stringify(row, null, 2))}
                </div>
            </div>`;
        document.body.appendChild(modal);
        const close = () => modal.remove();
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        modal.querySelector('#cea-detail-close')?.addEventListener('click', close);
    },

    async setStatus(id, status) {
        if (!id || !status) return;
        if (this._actionBusy) return;
        this._actionBusy = true;
        try {
            const res = await GoogleIntegration.sendToAppsScript('updateClientErrorStatus', {
                id: id,
                status: status,
                __timeoutMs: 30000,
                __highPriority: false
            });
            if (res && res.success) {
                this._patchRowStatus(id, status);
                if (typeof Notification !== 'undefined' && Notification.success) {
                    Notification.success('تم تحديث الحالة');
                }
                // تحديث صامت لاحقاً دون مسح القائمة
                setTimeout(() => this.refresh({ silent: true }), 800);
            } else {
                if (typeof Notification !== 'undefined' && Notification.error) {
                    Notification.error((res && res.message) || 'فشل تحديث الحالة');
                }
            }
        } catch (e) {
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error(e.message || 'فشل تحديث الحالة');
            }
        } finally {
            this._actionBusy = false;
        }
    },

    async reportIssue(id) {
        const row = this._data.find((r) => String(r.id) === String(id));
        if (!row) {
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('لم يُعثر على سجل الخطأ في الذاكرة — حدّث القائمة ثم أعد المحاولة');
            }
            return;
        }
        if (this._actionBusy) return;
        this._actionBusy = true;
        try {
            const title = ('خطأ واجهة: ' + String(row.message || '').slice(0, 80)).trim();
            const description = [
                'بلاغ تلقائي من مراقبة أخطاء العملاء',
                'Error ID: ' + (row.id || ''),
                'Level: ' + (row.level || ''),
                'Module: ' + (row.module || ''),
                'User: ' + (row.username || '') + ' <' + (row.userEmail || '') + '>',
                'Version: ' + (row.appVersion || ''),
                'Source: ' + (row.source || ''),
                'URL: ' + (row.pageUrl || ''),
                '',
                'Message:',
                row.message || '',
                '',
                'Stack:',
                row.stack || '—'
            ].join('\n');

            let res = null;
            if (typeof IssueTrackingService !== 'undefined' && typeof IssueTrackingService.reportIssue === 'function') {
                res = await IssueTrackingService.reportIssue(
                    {
                        title: title,
                        description: description,
                        category: 'Bug',
                        priority: String(row.level || '').toLowerCase() === 'warning' ? 'Medium' : 'High'
                    },
                    {
                        module: row.module || 'client-errors',
                        recordId: row.id || null,
                        section: 'client-errors',
                        action: 'client-error-report'
                    }
                );
            } else {
                res = await GoogleIntegration.sendToAppsScript('addIssue', {
                    title: title,
                    description: description,
                    category: 'Bug',
                    priority: String(row.level || '').toLowerCase() === 'warning' ? 'Medium' : 'High',
                    status: 'New',
                    module: row.module || 'client-errors',
                    reportedBy: AppState.currentUser?.name || AppState.currentUser?.email || '',
                    createdBy: AppState.currentUser?.email || '',
                    sourceErrorId: row.id || '',
                    __timeoutMs: 45000,
                    __highPriority: false
                });
            }

            if (res && res.success) {
                this._patchRowStatus(id, 'seen');
                // تحديث الخادم دون انتظار فشل يمنع الرسالة
                GoogleIntegration.sendToAppsScript('updateClientErrorStatus', {
                    id: id,
                    status: 'seen',
                    __timeoutMs: 30000,
                    __highPriority: false
                }).catch(() => {});
                if (typeof Notification !== 'undefined' && Notification.success) {
                    const issueId = res.issueId || res.data?.id || '';
                    Notification.success(issueId
                        ? ('تم إنشاء بلاغ مشكلة: ' + issueId)
                        : 'تم إنشاء بلاغ مشكلة من الخطأ');
                }
            } else {
                if (typeof Notification !== 'undefined' && Notification.error) {
                    Notification.error((res && res.message) || 'فشل إنشاء البلاغ');
                }
            }
        } catch (e) {
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error(e.message || 'فشل إنشاء البلاغ');
            }
        } finally {
            this._actionBusy = false;
        }
    },

    exportToExcel() {
        try {
            if (typeof XLSX === 'undefined') {
                if (typeof Notification !== 'undefined' && Notification.error) {
                    Notification.error('مكتبة Excel غير متاحة');
                }
                return;
            }
            if (!this._data.length) {
                if (typeof Notification !== 'undefined' && Notification.warning) {
                    Notification.warning('لا توجد بيانات للتصدير');
                }
                return;
            }
            const rows = this._data.map((r) => ({
                id: r.id,
                createdAt: r.createdAt,
                level: r.level,
                status: r.status,
                message: r.message,
                module: r.module,
                username: r.username,
                userEmail: r.userEmail,
                appVersion: r.appVersion,
                source: r.source,
                pageUrl: r.pageUrl,
                fingerprint: r.fingerprint
            }));
            const ws = XLSX.utils.json_to_sheet(rows);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'ClientErrors');
            XLSX.writeFile(wb, 'client-errors-' + new Date().toISOString().slice(0, 10) + '.xlsx');
            if (typeof Notification !== 'undefined' && Notification.success) {
                Notification.success('تم التصدير');
            }
        } catch (e) {
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error(e.message || 'فشل التصدير');
            }
        }
    }
};

if (typeof window !== 'undefined') {
    window.ClientErrorsAdmin = ClientErrorsAdmin;
}
