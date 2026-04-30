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

    async load() {
        const section = document.getElementById('issuing-authorities-section');
        if (!section) return;

        section.innerHTML = this._renderShell();
        this._injectStyles();

        await this._fetchData();
        this._renderTable();
        this._attachEvents();
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
                            Issuing Authorities for Work Permits
                        </p>
                    </div>
                    <div style="display:flex;gap:8px;align-items:center;">
                        ${isAdmin ? `
                        <button class="btn-primary" id="ia-add-btn" style="gap:6px;">
                            <i class="fas fa-plus"></i>
                            <span>إضافة شخص</span>
                        </button>` : ''}
                        <button class="btn-secondary" id="ia-refresh-btn" style="gap:6px;">
                            <i class="fas fa-sync-alt"></i>
                        </button>
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
            <div class="modal-container" style="max-width:680px;width:95%;">
                <div class="modal-header">
                    <h3 id="ia-modal-title" class="modal-title">إضافة شخص مصرح له</h3>
                    <button class="modal-close" id="ia-modal-close" aria-label="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="ia-modal-body">
                    ${this._renderForm()}
                </div>
                <div class="modal-footer">
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

        const permitRows = this.PERMIT_TYPES.map(pt => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;">
                <label style="font-size:0.88rem;color:#374151;font-weight:500;">
                    ${pt.labelAr}
                    <span style="color:#94a3b8;font-size:0.78rem;margin-right:4px;">${pt.labelEn}</span>
                </label>
                <div class="ia-radio-group" style="display:flex;gap:8px;">
                    ${['G', 'Y', 'X'].map(v => `
                        <label class="ia-radio-label ia-radio-${v.toLowerCase()}" style="cursor:pointer;padding:3px 10px;border-radius:4px;font-weight:600;font-size:0.82rem;${pv(pt.key) === v ? 'opacity:1;' : 'opacity:0.45;'}">
                            <input type="radio" name="permit_${pt.key}" value="${v}" ${pv(pt.key) === v ? 'checked' : ''} style="display:none;">
                            ${v}
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');

        return `
        <div class="ia-form" style="display:grid;gap:12px;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div class="form-group">
                    <label class="form-label">الاسم <span style="color:red;">*</span></label>
                    <input type="text" id="ia-f-name" class="form-input" value="${val('name')}" placeholder="اسم الشخص المصرح له" required>
                </div>
                <div class="form-group">
                    <label class="form-label">الإدارة / القسم</label>
                    <input type="text" id="ia-f-dept" class="form-input" value="${val('departmentName')}" placeholder="اسم الإدارة">
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div class="form-group">
                    <label class="form-label">البريد الإلكتروني</label>
                    <input type="email" id="ia-f-email" class="form-input" value="${val('email')}" placeholder="example@company.com" dir="ltr">
                </div>
                <div class="form-group">
                    <label class="form-label">رقم الهاتف</label>
                    <input type="text" id="ia-f-phone" class="form-input" value="${val('phone')}" placeholder="01xxxxxxxxx" dir="ltr">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" style="margin-bottom:10px;font-weight:600;color:#1e40af;">
                    <i class="fas fa-clipboard-check" style="margin-left:6px;"></i>
                    صلاحيات التوقيع على أنواع التصاريح
                </label>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;">
                    ${permitRows}
                </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div class="form-group">
                    <label class="form-label">ملاحظات</label>
                    <input type="text" id="ia-f-notes" class="form-input" value="${val('notes')}" placeholder="ملاحظات اختيارية">
                </div>
                <div class="form-group" style="display:flex;align-items:center;gap:10px;padding-top:22px;">
                    <input type="checkbox" id="ia-f-active" ${!record || record.isActive !== false ? 'checked' : ''} style="width:16px;height:16px;cursor:pointer;">
                    <label for="ia-f-active" style="cursor:pointer;font-size:0.9rem;color:#374151;">نشط (مفعّل في قائمة المرشحين)</label>
                </div>
            </div>
        </div>
        `;
    },

    async _fetchData() {
        this._loading = true;
        try {
            const result = await GoogleIntegration.sendRequest({
                action: 'getAllIssuingAuthorities',
                data: {}
            });
            if (result && result.success) {
                this._data = result.data || [];
            } else {
                this._data = [];
                if (typeof Utils !== 'undefined') {
                    Utils.safeWarn('تحذير: فشل تحميل بيانات Issuing Authorities:', result && result.message);
                }
            }
        } catch (err) {
            this._data = [];
            if (typeof Utils !== 'undefined') Utils.safeError('خطأ في تحميل Issuing Authorities:', err);
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
        const records = this._data.filter(r => isAdmin || r.isActive !== false);

        if (records.length === 0) {
            wrapper.innerHTML = `
                <div class="empty-state" style="padding:48px 24px;">
                    <i class="fas fa-user-check" style="font-size:2.5rem;color:#cbd5e1;margin-bottom:12px;"></i>
                    <h3 style="color:#64748b;margin-bottom:6px;">لا يوجد سجلات بعد</h3>
                    <p style="color:#94a3b8;font-size:0.88rem;">
                        ${isAdmin ? 'انقر على "إضافة شخص" لإضافة أول سجل في القائمة.' : 'لم تتم إضافة أي سجلات بعد.'}
                    </p>
                </div>`;
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
            await this._fetchData();
            this._renderTable();
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
                    if (lbl) lbl.style.opacity = radio.checked ? '1' : '0.45';
                });
            }
        });

        // Delete modal
        document.getElementById('ia-delete-cancel')?.addEventListener('click', () => {
            const m = document.getElementById('ia-delete-modal');
            if (m) m.style.display = 'none';
        });
    },

    _currentEditId: null,

    _openModal(record) {
        const modal = document.getElementById('ia-modal-overlay');
        const title = document.getElementById('ia-modal-title');
        const body  = document.getElementById('ia-modal-body');
        if (!modal || !title || !body) return;

        this._currentEditId = record ? record.id : null;
        title.textContent = record ? 'تعديل بيانات الشخص المصرح له' : 'إضافة شخص مصرح له';
        body.innerHTML = this._renderForm(record);
        modal.style.display = 'flex';

        // Re-attach radio feedback
        body.querySelectorAll('input[type="radio"]').forEach(radio => {
            const lbl = radio.closest('label.ia-radio-label');
            if (lbl) lbl.style.opacity = radio.checked ? '1' : '0.45';
        });
    },

    _closeModal() {
        const modal = document.getElementById('ia-modal-overlay');
        if (modal) modal.style.display = 'none';
        this._currentEditId = null;
    },

    async _saveModal() {
        const name = (document.getElementById('ia-f-name')?.value || '').trim();
        if (!name) {
            if (typeof Utils !== 'undefined' && Utils.showNotification) {
                Utils.showNotification('اسم الشخص مطلوب', 'error');
            } else {
                alert('اسم الشخص مطلوب');
            }
            return;
        }

        const userData = AppState && AppState.currentUser ? AppState.currentUser : {};
        const payload = {
            name,
            departmentName: document.getElementById('ia-f-dept')?.value?.trim() || '',
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
            if (this._currentEditId) {
                payload.id = this._currentEditId;
                result = await GoogleIntegration.sendRequest({
                    action: 'updateIssuingAuthority',
                    data: payload
                });
            } else {
                result = await GoogleIntegration.sendRequest({
                    action: 'addIssuingAuthority',
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
            const msg = err && err.message ? err.message : 'حدث خطأ أثناء الحفظ';
            if (typeof Utils !== 'undefined' && Utils.showNotification) {
                Utils.showNotification(msg, 'error');
            } else {
                alert(msg);
            }
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
            const result = await GoogleIntegration.sendRequest({
                action: 'deleteIssuingAuthority',
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
            const msg = err && err.message ? err.message : 'حدث خطأ أثناء الحذف';
            if (typeof Utils !== 'undefined' && Utils.showNotification) {
                Utils.showNotification(msg, 'error');
            }
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
            const result = await GoogleIntegration.sendRequest({
                action: 'getIssuingAuthoritiesForPermitType',
                data: { permitType }
            });
            if (result && result.success) {
                return result.authorities || [];
            }
            return [];
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
        if (document.getElementById('ia-styles')) return;
        const style = document.createElement('style');
        style.id = 'ia-styles';
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
            .ia-radio-g { background:#dcfce7;color:#166534;border:1px solid #86efac; }
            .ia-radio-y { background:#fef9c3;color:#854d0e;border:1px solid #fde047; }
            .ia-radio-x { background:#fee2e2;color:#991b1b;border:1px solid #fca5a5; }
            .ia-radio-label { border-radius:4px;transition:opacity .15s; }
            .ia-radio-label:hover { opacity:1 !important; }
            .ia-module table th, .ia-module table td {
                border-bottom:1px solid #f1f5f9;
            }
            .ia-module table tbody tr:hover { background:#f8fafc; }
        `;
        document.head.appendChild(style);
    }
};

// تصدير على window
if (typeof window !== 'undefined') {
    window.IssuingAuthorities = IssuingAuthorities;
}
