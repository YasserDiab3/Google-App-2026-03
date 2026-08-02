/**
 * ClientErrorsAdmin — لوحة مراقبة أخطاء العملاء للمدير
 * إعدادات + تبويب مباشر بتحديث تلقائي
 */
const ClientErrorsAdmin = {
    _data: [],
    _stats: null,
    _loading: false,
    _pollTimer: null,
    _live: false,
    _knownIds: new Set(),
    _filters: { level: '', status: 'new', q: '', limit: 150 },
    _rootId: null,

    _isAdmin() {
        try {
            if (typeof Permissions !== 'undefined' && Permissions.isCurrentUserAdmin) {
                return Permissions.isCurrentUserAdmin();
            }
        } catch (_e) {}
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
        return `<span style="background:${m.bg};color:${m.color};border-radius:999px;padding:2px 8px;font-size:11px;font-weight:700;">${m.label}</span>`;
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
        return `<span style="background:${m.bg};color:${m.color};border-radius:999px;padding:2px 8px;font-size:11px;font-weight:600;">${m.label}</span>`;
    },

    async open() {
        if (!this._isAdmin()) {
            Notification.error('هذه الصفحة متاحة لمدير النظام فقط');
            return;
        }
        const existing = document.getElementById('client-errors-admin-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'client-errors-admin-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 1180px; max-height: 92vh; overflow-y: auto;">
                <div class="modal-header" style="background: linear-gradient(135deg, #b91c1c, #7f1d1d); color: #fff;">
                    <h2 class="modal-title" style="color:#fff;">
                        <i class="fas fa-bug ml-2"></i>
                        مراقبة أخطاء المستخدمين
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color:#fff;" title="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="cea-modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.stopLive();
                modal.remove();
            }
        });
        modal.querySelector('.modal-close')?.addEventListener('click', () => this.stopLive());
        this.mount(modal.querySelector('#cea-modal-body'), { liveDefault: true });
    },

    /** تحميل داخل قسم الصفحة */
    async load() {
        if (!this._isAdmin()) {
            const section = document.getElementById('client-errors-section');
            if (section) {
                section.innerHTML = '<div class="p-6 text-slate-600">هذا القسم متاح لمدير النظام فقط.</div>';
            }
            return;
        }
        const section = document.getElementById('client-errors-section');
        if (!section) return;
        section.innerHTML = '<div id="cea-section-root" class="p-4"></div>';
        this.mount(section.querySelector('#cea-section-root'), { liveDefault: true });
    },

    mount(root, opts = {}) {
        if (!root) return;
        this._rootId = root.id || ('cea-root-' + Date.now());
        if (!root.id) root.id = this._rootId;
        root.innerHTML = this._shellHtml(!!opts.liveDefault);
        this._bindShell(root);
        this.refresh();
        if (opts.liveDefault) this.startLive();
    },

    _shellHtml(liveOn) {
        return `
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div class="text-sm text-slate-600">
                    <i class="fas fa-satellite-dish text-red-600 ml-1"></i>
                    مراقبة مباشرة لرسائل الخطأ الظاهرة للمستخدمين
                    <span id="cea-live-indicator" class="mr-2" style="font-weight:700;color:${liveOn ? '#047857' : '#64748b'};">
                        ${liveOn ? '● مباشر' : '○ متوقف'}
                    </span>
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

            <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
                <input id="cea-q" class="form-input" placeholder="بحث في الرسالة / المستخدم..." value="${this._esc(this._filters.q)}" />
                <select id="cea-level" class="form-input">
                    <option value="">كل المستويات</option>
                    <option value="error" ${this._filters.level === 'error' ? 'selected' : ''}>خطأ</option>
                    <option value="warning" ${this._filters.level === 'warning' ? 'selected' : ''}>تنبيه</option>
                    <option value="unhandled" ${this._filters.level === 'unhandled' ? 'selected' : ''}>غير معالج</option>
                </select>
                <select id="cea-status" class="form-input">
                    <option value="">كل الحالات</option>
                    <option value="new" ${this._filters.status === 'new' ? 'selected' : ''}>جديد</option>
                    <option value="seen" ${this._filters.status === 'seen' ? 'selected' : ''}>تمت المشاهدة</option>
                    <option value="ignored" ${this._filters.status === 'ignored' ? 'selected' : ''}>متجاهل</option>
                    <option value="resolved" ${this._filters.status === 'resolved' ? 'selected' : ''}>محلول</option>
                </select>
                <button type="button" id="cea-apply-filters" class="btn-secondary"><i class="fas fa-filter ml-2"></i>تطبيق الفلتر</button>
            </div>

            <div id="cea-table" class="overflow-x-auto"></div>
        `;
    },

    _bindShell(root) {
        root.querySelector('#cea-refresh-btn')?.addEventListener('click', () => this.refresh());
        root.querySelector('#cea-live-btn')?.addEventListener('click', () => {
            if (this._live) this.stopLive();
            else this.startLive();
            const btn = root.querySelector('#cea-live-btn');
            const ind = root.querySelector('#cea-live-indicator');
            if (btn) btn.innerHTML = `<i class="fas fa-broadcast-tower ml-2"></i>${this._live ? 'إيقاف المباشر' : 'تشغيل المباشر'}`;
            if (ind) {
                ind.style.color = this._live ? '#047857' : '#64748b';
                ind.textContent = this._live ? '● مباشر' : '○ متوقف';
            }
        });
        root.querySelector('#cea-export-btn')?.addEventListener('click', () => this.exportToExcel());
        root.querySelector('#cea-apply-filters')?.addEventListener('click', () => {
            this._filters.q = root.querySelector('#cea-q')?.value?.trim() || '';
            this._filters.level = root.querySelector('#cea-level')?.value || '';
            this._filters.status = root.querySelector('#cea-status')?.value || '';
            this.refresh();
        });
        root.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-cea-action]');
            if (!btn) return;
            const id = btn.getAttribute('data-id');
            const action = btn.getAttribute('data-cea-action');
            if (action === 'status') this.setStatus(id, btn.getAttribute('data-status'));
            if (action === 'report') this.reportIssue(id);
            if (action === 'detail') this.showDetail(id);
        });
    },

    startLive() {
        this.stopLive();
        this._live = true;
        this._pollTimer = setInterval(() => {
            if (document.visibilityState === 'hidden') return;
            this.refresh({ silent: true });
        }, 12000);
    },

    stopLive() {
        this._live = false;
        if (this._pollTimer) {
            clearInterval(this._pollTimer);
            this._pollTimer = null;
        }
    },

    async refresh(opts = {}) {
        if (this._loading) return;
        this._loading = true;
        try {
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.resetCircuitBreaker) {
                GoogleIntegration.resetCircuitBreaker();
            }
            const filters = {
                ...this._filters,
                __timeoutMs: 45000
            };
            const [listRes, statsRes] = await Promise.all([
                GoogleIntegration.sendToAppsScript('getAllClientErrorLogs', { filters, __timeoutMs: 45000 }),
                GoogleIntegration.sendToAppsScript('getClientErrorStats', { filters: {}, __timeoutMs: 45000 })
            ]);
            const rows = (listRes && listRes.success && Array.isArray(listRes.data)) ? listRes.data : [];
            let newCount = 0;
            rows.forEach((r) => {
                if (r.id && !this._knownIds.has(r.id)) {
                    if (this._knownIds.size > 0) newCount += 1;
                    this._knownIds.add(r.id);
                }
            });
            this._data = rows;
            this._stats = (statsRes && statsRes.success) ? statsRes : null;
            this._renderStats();
            this._renderTable(newCount);
            if (!opts.silent && listRes && listRes.success === false) {
                Notification.error('فشل تحميل سجل الأخطاء: ' + (listRes.message || ''));
            }
        } catch (error) {
            if (!opts.silent) {
                Notification.error('فشل تحميل سجل الأخطاء: ' + (error.message || error));
            }
        } finally {
            this._loading = false;
        }
    },

    _renderStats() {
        const root = document.getElementById(this._rootId);
        const box = root && root.querySelector('#cea-stats');
        if (!box) return;
        const s = this._stats || {};
        const byLevel = s.byLevel || {};
        const byStatus = s.byStatus || {};
        const cards = [
            { label: 'إجمالي السجلات', value: s.total || 0, color: '#0f766e', bg: '#f0fdfa' },
            { label: 'آخر 24 ساعة', value: s.last24h || 0, color: '#b91c1c', bg: '#fef2f2' },
            { label: 'جديد', value: byStatus.new || 0, color: '#0e7490', bg: '#ecfeff' },
            { label: 'أخطاء', value: byLevel.error || 0, color: '#7f1d1d', bg: '#fff1f2' }
        ];
        box.innerHTML = cards.map((c) => `
            <div style="background:${c.bg};border:1px solid rgba(0,0,0,0.06);border-radius:12px;padding:12px;">
                <div style="font-size:1.4rem;font-weight:800;color:${c.color};" dir="ltr">${c.value}</div>
                <div style="font-size:0.75rem;color:#64748b;">${c.label}</div>
            </div>
        `).join('');
    },

    _renderTable(newCount) {
        const root = document.getElementById(this._rootId);
        const box = root && root.querySelector('#cea-table');
        if (!box) return;
        if (!this._data.length) {
            box.innerHTML = '<div class="text-center text-slate-500 py-10">لا توجد أخطاء مطابقة للفلتر حالياً.</div>';
            return;
        }
        const banner = newCount > 0
            ? `<div class="mb-3 p-2 rounded" style="background:#fef2f2;color:#b91c1c;font-weight:700;">ورد ${newCount} خطأ جديد</div>`
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
                    ${this._data.map((r) => `
                        <tr style="border-top:1px solid #e2e8f0;vertical-align:top;">
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
                            <td class="p-2">${this._statusBadge(r.status)}</td>
                            <td class="p-2 whitespace-nowrap">
                                <button type="button" class="btn-secondary text-xs mb-1" data-cea-action="detail" data-id="${this._esc(r.id)}">تفاصيل</button>
                                <button type="button" class="btn-secondary text-xs mb-1" data-cea-action="status" data-status="seen" data-id="${this._esc(r.id)}">مشاهدة</button>
                                <button type="button" class="btn-secondary text-xs mb-1" data-cea-action="status" data-status="resolved" data-id="${this._esc(r.id)}">حل</button>
                                <button type="button" class="btn-primary text-xs mb-1" data-cea-action="report" data-id="${this._esc(r.id)}">إبلاغ</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    showDetail(id) {
        const row = this._data.find((r) => String(r.id) === String(id));
        if (!row) return;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width:720px;">
                <div class="modal-header"><h3 class="modal-title">تفاصيل الخطأ</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body text-sm" style="white-space:pre-wrap;direction:ltr;text-align:left;">
${this._esc(JSON.stringify(row, null, 2))}
                </div>
            </div>`;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    },

    async setStatus(id, status) {
        try {
            const res = await GoogleIntegration.sendToAppsScript('updateClientErrorStatus', {
                id, status, __timeoutMs: 30000
            });
            if (res && res.success) {
                Notification.success('تم تحديث الحالة');
                this.refresh({ silent: true });
            } else {
                Notification.error(res?.message || 'فشل تحديث الحالة');
            }
        } catch (e) {
            Notification.error(e.message || 'فشل تحديث الحالة');
        }
    },

    async reportIssue(id) {
        const row = this._data.find((r) => String(r.id) === String(id));
        if (!row) return;
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

            const payload = {
                title,
                description,
                category: 'technical',
                priority: String(row.level).toLowerCase() === 'warning' ? 'Medium' : 'High',
                status: 'New',
                module: row.module || 'client-errors',
                reportedBy: AppState.currentUser?.email || '',
                sourceErrorId: row.id || '',
                __timeoutMs: 45000
            };

            const res = await GoogleIntegration.sendToAppsScript('addIssue', payload);
            if (res && res.success) {
                await this.setStatus(id, 'seen');
                Notification.success('تم إنشاء بلاغ مشكلة من الخطأ');
            } else {
                Notification.error(res?.message || 'فشل إنشاء البلاغ');
            }
        } catch (e) {
            Notification.error(e.message || 'فشل إنشاء البلاغ');
        }
    },

    exportToExcel() {
        try {
            if (typeof XLSX === 'undefined') {
                Notification.error('مكتبة Excel غير متاحة');
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
            Notification.success('تم التصدير');
        } catch (e) {
            Notification.error(e.message || 'فشل التصدير');
        }
    }
};

if (typeof window !== 'undefined') {
    window.ClientErrorsAdmin = ClientErrorsAdmin;
}
