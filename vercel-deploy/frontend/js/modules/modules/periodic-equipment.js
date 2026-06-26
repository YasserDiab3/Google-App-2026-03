/**
 * Periodic Equipment Tab — قاعدة بيانات المعدات (الفحوصات الدورية)
 */
const PeriodicEquipment = {
    state: {
        filters: { search: '', typeId: 'all', status: 'all', location: 'all' }
    },
    _qrStream: null,
    _qrScanInterval: null,

    isAdmin() {
        if (typeof PeriodicInspections !== 'undefined' && typeof PeriodicInspections.isCurrentUserAdmin === 'function') {
            return PeriodicInspections.isCurrentUserAdmin();
        }
        return false;
    },

    _t(key, fallback) {
        try {
            if (typeof I18n !== 'undefined' && I18n.t) return I18n.t(key, fallback);
        } catch (_) {}
        return fallback;
    },

    ensureData() {
        if (typeof PeriodicEquipmentStore !== 'undefined') {
            PeriodicEquipmentStore.ensureInitialized();
        }
    },

    getSiteOptions() {
        if (typeof PeriodicInspections !== 'undefined' && typeof PeriodicInspections.getSiteOptions === 'function') {
            return PeriodicInspections.getSiteOptions();
        }
        return [];
    },

    getPlaceOptions(siteId) {
        if (typeof PeriodicInspections !== 'undefined' && typeof PeriodicInspections.getPlaceOptions === 'function') {
            return PeriodicInspections.getPlaceOptions(siteId);
        }
        return [];
    },

    resolveAssetFactoryId(asset) {
        if (!asset) return '';
        if (asset.factoryId) return String(asset.factoryId);
        if (asset.factory) return String(asset.factory);
        if (asset.location) {
            const byName = this.getSiteOptions().find(s => s.name === asset.location);
            if (byName) return String(byName.id);
        }
        return '';
    },

    resolveAssetSubLocationId(asset, factoryId) {
        if (!asset) return '';
        if (asset.subLocationId) return String(asset.subLocationId);
        const fid = factoryId || this.resolveAssetFactoryId(asset);
        if (asset.subLocation && fid) {
            const byName = this.getPlaceOptions(fid).find(p => p.name === asset.subLocation || p.id === asset.subLocation);
            if (byName) return String(byName.id);
        }
        return '';
    },

    getAssetSiteLabel(asset) {
        return asset?.factoryName || asset?.location || '-';
    },

    getAssetSubLocationLabel(asset) {
        return asset?.subLocationName || asset?.subLocation || '-';
    },

    getAssets() {
        this.ensureData();
        return PeriodicEquipmentStore.listAssets();
    },

    statusOptions: [
        { value: 'صالح', label: 'صالح', cls: 'badge-success' },
        { value: 'يحتاج صيانة', label: 'يحتاج صيانة', cls: 'badge-warning' },
        { value: 'خارج الخدمة', label: 'خارج الخدمة', cls: 'badge-danger' }
    ],

    getStatusBadge(status) {
        const opt = this.statusOptions.find(s => s.value === status) || { label: status || '-', cls: 'badge-secondary' };
        return `<span class="badge ${opt.cls}">${Utils.escapeHTML(opt.label)}</span>`;
    },

    async renderTab() {
        this.ensureData();
        return await this.renderDatabaseTab();
    },

    async renderDatabaseTab() {
        const assets = this.getFilteredAssets();
        const stats = this.getStats();
        const types = PeriodicEquipmentStore.listTypes();

        return `
            <div class="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-800">
                    <i class="fas fa-database ml-2"></i>
                    ${this._t('module.periodic.equipment.title', 'قاعدة بيانات المعدات')}
                </h3>
                <div class="flex flex-wrap gap-2">
                    ${this.isAdmin() ? `
                    <button type="button" id="pe-manage-types-btn" class="btn-secondary">
                        <i class="fas fa-cog ml-2"></i>${this._t('module.periodic.equipment.manageTypes', 'إدارة الأنواع')}
                    </button>
                    <button type="button" id="pe-add-asset-btn" class="btn-secondary">
                        <i class="fas fa-plus ml-2"></i>${this._t('module.periodic.equipment.addAsset', 'إضافة معدة')}
                    </button>
                    ` : ''}
                    <button type="button" id="pe-scan-qr-btn" class="btn-primary">
                        <i class="fas fa-qrcode ml-2"></i>${this._t('module.periodic.equipment.scanQr', 'مسح QR للفحص')}
                    </button>
                    <button type="button" id="pe-refresh-btn" class="btn-secondary">
                        <i class="fas fa-sync-alt ml-2"></i>${this._t('module.periodic.equipment.refresh', 'تحديث')}
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="content-card text-center">
                    <p class="text-sm text-gray-500">${this._t('module.periodic.equipment.total', 'إجمالي المعدات')}</p>
                    <p class="text-2xl font-bold text-blue-600" id="pe-stat-total">${stats.total}</p>
                </div>
                <div class="content-card text-center">
                    <p class="text-sm text-gray-500">${this._t('module.periodic.equipment.valid', 'صالح')}</p>
                    <p class="text-2xl font-bold text-green-600" id="pe-stat-valid">${stats.valid}</p>
                </div>
                <div class="content-card text-center">
                    <p class="text-sm text-gray-500">${this._t('module.periodic.equipment.needsAttention', 'بحاجة متابعة')}</p>
                    <p class="text-2xl font-bold text-yellow-600" id="pe-stat-attention">${stats.needsAttention}</p>
                </div>
            </div>
            <div class="content-card mb-4">
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="form-label">${this._t('module.periodic.equipment.search', 'بحث')}</label>
                            <input type="text" id="pe-filter-search" class="form-input" value="${Utils.escapeHTML(this.state.filters.search)}" placeholder="رقم، نوع، موقع...">
                        </div>
                        <div>
                            <label class="form-label">${this._t('module.periodic.equipment.type', 'النوع')}</label>
                            <select id="pe-filter-type" class="form-input">
                                <option value="all">${this._t('module.periodic.equipment.allTypes', 'جميع الأنواع')}</option>
                                ${types.map(t => `<option value="${Utils.escapeHTML(t.id)}" ${this.state.filters.typeId === t.id ? 'selected' : ''}>${Utils.escapeHTML(t.name)}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="form-label">${this._t('module.periodic.equipment.status', 'الحالة')}</label>
                            <select id="pe-filter-status" class="form-input">
                                <option value="all">${this._t('module.periodic.equipment.allStatuses', 'جميع الحالات')}</option>
                                ${this.statusOptions.map(s => `<option value="${s.value}" ${this.state.filters.status === s.value ? 'selected' : ''}>${Utils.escapeHTML(s.label)}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="form-label">${this._t('module.periodic.equipment.location', 'الموقع')}</label>
                            <select id="pe-filter-location" class="form-input">
                                <option value="all">${this._t('module.periodic.equipment.allLocations', 'جميع المواقع')}</option>
                                ${this.getSiteOptions().map(site => `<option value="${Utils.escapeHTML(site.id)}" ${this.state.filters.location === site.id ? 'selected' : ''}>${Utils.escapeHTML(site.name)}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-list ml-2"></i>${this._t('module.periodic.equipment.registry', 'سجل المعدات')}</h2>
                </div>
                <div class="card-body" id="pe-assets-table-wrap">
                    ${this.renderAssetsTable(assets)}
                </div>
            </div>
        `;
    },

    getStats() {
        const assets = this.getAssets();
        return {
            total: assets.length,
            valid: assets.filter(a => a.status === 'صالح').length,
            needsAttention: assets.filter(a => a.status === 'يحتاج صيانة' || a.status === 'خارج الخدمة').length
        };
    },

    getFilteredAssets() {
        const f = this.state.filters;
        return this.getAssets().filter(a => {
            if (f.typeId !== 'all' && a.typeId !== f.typeId) return false;
            if (f.status !== 'all' && a.status !== f.status) return false;
            if (f.location !== 'all') {
                const matchLocation = a.factoryId === f.location || a.factory === f.location || a.location === f.location;
                if (!matchLocation) return false;
            }
            if (f.search) {
                const q = f.search.toLowerCase();
                const hay = [a.id, a.assetNumber, a.typeName, a.location, a.serialNumber, a.manufacturer].join(' ').toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    },

    renderAssetsTable(assets) {
        if (!assets.length) {
            return `<div class="empty-state"><p class="text-gray-500">${this._t('module.periodic.equipment.empty', 'لا توجد معدات مسجلة')}</p></div>`;
        }
        return `
            <div class="table-wrapper overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>${this._t('module.periodic.equipment.colNumber', 'الرقم')}</th>
                            <th>${this._t('module.periodic.equipment.colType', 'النوع')}</th>
                            <th>${this._t('module.periodic.equipment.colLocation', 'الموقع')}</th>
                            <th>${this._t('module.periodic.equipment.colSubLocation', 'الموقع الفرعي')}</th>
                            <th>${this._t('module.periodic.equipment.colStatus', 'الحالة')}</th>
                            <th>${this._t('module.periodic.equipment.colLastInspection', 'آخر فحص')}</th>
                            <th>${this._t('module.periodic.equipment.colActions', 'إجراءات')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${assets.map(a => `
                            <tr>
                                <td><span class="font-mono font-semibold">${Utils.escapeHTML(a.assetNumber || a.id)}</span></td>
                                <td>${Utils.escapeHTML(a.typeName || '-')}</td>
                                <td>${Utils.escapeHTML(this.getAssetSiteLabel(a))}</td>
                                <td class="text-sm text-gray-600">${Utils.escapeHTML(this.getAssetSubLocationLabel(a))}</td>
                                <td>${this.getStatusBadge(a.status)}</td>
                                <td>${a.lastInspection ? Utils.formatDate(a.lastInspection) : '-'}</td>
                                <td>
                                    <div class="flex gap-1">
                                        <button type="button" class="btn-icon btn-icon-primary" data-pe-action="view" data-id="${Utils.escapeHTML(a.id)}" title="عرض"><i class="fas fa-eye"></i></button>
                                        <button type="button" class="btn-icon btn-icon-success" data-pe-action="inspect" data-id="${Utils.escapeHTML(a.id)}" title="فحص"><i class="fas fa-clipboard-check"></i></button>
                                        ${this.isAdmin() ? `
                                        <button type="button" class="btn-icon btn-icon-warning" data-pe-action="edit" data-id="${Utils.escapeHTML(a.id)}" title="تعديل"><i class="fas fa-edit"></i></button>
                                        <button type="button" class="btn-icon btn-icon-danger" data-pe-action="delete" data-id="${Utils.escapeHTML(a.id)}" title="حذف"><i class="fas fa-trash"></i></button>
                                        ` : ''}
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    bindTabEvents(root) {
        const section = root || document.getElementById('periodic-inspections-content-area');
        if (!section) return;

        const refreshTable = () => {
            const wrap = document.getElementById('pe-assets-table-wrap');
            if (!wrap) return;
            const assets = this.getFilteredAssets();
            wrap.innerHTML = this.renderAssetsTable(assets);
            const stats = this.getStats();
            const t = document.getElementById('pe-stat-total');
            const v = document.getElementById('pe-stat-valid');
            const a = document.getElementById('pe-stat-attention');
            if (t) t.textContent = stats.total;
            if (v) v.textContent = stats.valid;
            if (a) a.textContent = stats.needsAttention;
            this.bindTableActions(section);
        };

        ['pe-filter-search', 'pe-filter-type', 'pe-filter-status', 'pe-filter-location'].forEach(id => {
            const el = section.querySelector('#' + id) || document.getElementById(id);
            if (!el || el.dataset.peBound === '1') return;
            el.dataset.peBound = '1';
            const handler = () => {
                this.state.filters.search = (document.getElementById('pe-filter-search')?.value || '').trim();
                this.state.filters.typeId = document.getElementById('pe-filter-type')?.value || 'all';
                this.state.filters.status = document.getElementById('pe-filter-status')?.value || 'all';
                this.state.filters.location = document.getElementById('pe-filter-location')?.value || 'all';
                refreshTable();
            };
            el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', handler);
        });

        const bindBtn = (id, fn) => {
            const btn = document.getElementById(id);
            if (!btn || btn.dataset.peBound === '1') return;
            btn.dataset.peBound = '1';
            btn.addEventListener('click', fn);
        };

        bindBtn('pe-add-asset-btn', () => this.showAssetForm());
        bindBtn('pe-manage-types-btn', () => this.showTypeManagement());
        bindBtn('pe-scan-qr-btn', () => this.startQRScan());
        bindBtn('pe-refresh-btn', async () => {
            await this.loadDataFromBackend(true);
            if (typeof PeriodicInspections !== 'undefined') {
                await PeriodicInspections.refreshCurrentTabContent();
            }
        });

        this.bindTableActions(section);
    },

    bindTableActions(root) {
        const container = root || document.getElementById('periodic-inspections-content-area');
        if (!container) return;
        container.querySelectorAll('[data-pe-action]').forEach(btn => {
            if (btn.dataset.peActionBound === '1') return;
            btn.dataset.peActionBound = '1';
            btn.addEventListener('click', async () => {
                const action = btn.getAttribute('data-pe-action');
                const id = btn.getAttribute('data-id');
                const asset = PeriodicEquipmentStore.getAssetById(id);
                if (!asset) return;
                if (action === 'view') await this.showAssetDetails(asset);
                else if (action === 'inspect') await this.showInspectionForm(asset);
                else if (action === 'edit') await this.showAssetForm(asset);
                else if (action === 'delete') await this.deleteAsset(asset);
            });
        });
    },

    async showAssetForm(asset = null) {
        if (!this.isAdmin()) {
            Notification.error('ليس لديك صلاحية. يجب أن تكون مدير النظام.');
            return;
        }
        if (typeof Permissions !== 'undefined' && typeof Permissions.ensureFormSettingsState === 'function') {
            await Permissions.ensureFormSettingsState();
        }
        const isEdit = !!asset;
        const types = PeriodicEquipmentStore.listTypes();
        const assetId = asset?.id || PeriodicEquipmentStore.generateAssetId();
        const resolvedFactoryId = this.resolveAssetFactoryId(asset);
        const resolvedSubLocationId = this.resolveAssetSubLocationId(asset, resolvedFactoryId);
        const initialPlaces = this.getPlaceOptions(resolvedFactoryId);

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header">
                    <h2 class="modal-title">${isEdit ? 'تعديل معدة' : 'إضافة معدة جديدة'}</h2>
                    <button type="button" class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <form id="pe-asset-form">
                    <div class="modal-body space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">نوع المعدة *</label>
                                <select id="pe-asset-type" class="form-input" required>
                                    <option value="">اختر النوع</option>
                                    ${types.map(t => `<option value="${Utils.escapeHTML(t.id)}" ${asset?.typeId === t.id ? 'selected' : ''}>${Utils.escapeHTML(t.name)}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">رقم المعدة</label>
                                <input type="text" id="pe-asset-number" class="form-input" value="${Utils.escapeHTML(asset?.assetNumber || assetId)}" readonly>
                            </div>
                            <div>
                                <label class="form-label">الموقع *</label>
                                <select id="pe-asset-site" class="form-input" required>
                                    <option value="">-- اختر الموقع --</option>
                                    ${this.getSiteOptions().map(site => {
                                        const isSelected = resolvedFactoryId && (resolvedFactoryId === site.id || resolvedFactoryId === String(site.id));
                                        return `<option value="${Utils.escapeHTML(site.id)}" ${isSelected ? 'selected' : ''}>${Utils.escapeHTML(site.name)}</option>`;
                                    }).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">الموقع الفرعي</label>
                                <select id="pe-asset-sub-location" class="form-input">
                                    <option value="">-- اختر الموقع الفرعي --</option>
                                    ${initialPlaces.map(place => {
                                        const isSelected = resolvedSubLocationId && (resolvedSubLocationId === place.id || resolvedSubLocationId === String(place.id));
                                        return `<option value="${Utils.escapeHTML(place.id)}" ${isSelected ? 'selected' : ''}>${Utils.escapeHTML(place.name)}</option>`;
                                    }).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">الشركة المصنعة</label>
                                <input type="text" id="pe-asset-manufacturer" class="form-input" value="${Utils.escapeHTML(asset?.manufacturer || '')}">
                            </div>
                            <div>
                                <label class="form-label">الموديل</label>
                                <input type="text" id="pe-asset-model" class="form-input" value="${Utils.escapeHTML(asset?.model || '')}">
                            </div>
                            <div>
                                <label class="form-label">الرقم التسلسلي</label>
                                <input type="text" id="pe-asset-serial" class="form-input" value="${Utils.escapeHTML(asset?.serialNumber || '')}">
                            </div>
                            <div>
                                <label class="form-label">الحالة</label>
                                <select id="pe-asset-status" class="form-input">
                                    ${this.statusOptions.map(s => `<option value="${s.value}" ${asset?.status === s.value ? 'selected' : ''}>${Utils.escapeHTML(s.label)}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">المسؤول</label>
                                <input type="text" id="pe-asset-responsible" class="form-input" value="${Utils.escapeHTML(asset?.responsible || '')}">
                            </div>
                            <div>
                                <label class="form-label">تاريخ التركيب</label>
                                <input type="date" id="pe-asset-install" class="form-input" value="${asset?.installationDate ? String(asset.installationDate).slice(0, 10) : ''}">
                            </div>
                        </div>
                        <div>
                            <label class="form-label">ملاحظات</label>
                            <textarea id="pe-asset-notes" class="form-input" rows="2">${Utils.escapeHTML(asset?.notes || '')}</textarea>
                        </div>
                        ${asset?.typeId === 'pet_extinguisher' ? `
                        <div class="p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                            <i class="fas fa-info-circle ml-1"></i>
                            هذا السجل خاص بالفحوصات الدورية وليس مديول معدات الإطفاء المنفصل.
                        </div>` : ''}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" data-close>إلغاء</button>
                        <button type="submit" class="btn-primary"><i class="fas fa-save ml-2"></i>حفظ</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        const close = () => modal.remove();
        modal.querySelector('.modal-close')?.addEventListener('click', close);
        modal.querySelector('[data-close]')?.addEventListener('click', close);
        modal.addEventListener('click', e => { if (e.target === modal) close(); });

        const siteSelect = modal.querySelector('#pe-asset-site');
        const subLocationSelect = modal.querySelector('#pe-asset-sub-location');
        if (siteSelect && subLocationSelect) {
            siteSelect.addEventListener('change', () => {
                const places = this.getPlaceOptions(siteSelect.value);
                subLocationSelect.innerHTML = '<option value="">-- اختر الموقع الفرعي --</option>' +
                    places.map(place => `<option value="${Utils.escapeHTML(place.id)}">${Utils.escapeHTML(place.name)}</option>`).join('');
            });
        }

        modal.querySelector('#pe-asset-form')?.addEventListener('submit', async e => {
            e.preventDefault();
            try {
                const typeId = modal.querySelector('#pe-asset-type')?.value;
                const type = PeriodicEquipmentStore.getTypeById(typeId);
                const factoryId = modal.querySelector('#pe-asset-site')?.value || '';
                const subLocationId = modal.querySelector('#pe-asset-sub-location')?.value || '';
                if (!factoryId) {
                    Notification.warning('يجب اختيار الموقع');
                    return;
                }
                const sites = this.getSiteOptions();
                const selectedSite = sites.find(s => s.id === factoryId);
                const places = this.getPlaceOptions(factoryId);
                const selectedPlace = places.find(p => p.id === subLocationId);
                const payload = {
                    ...(asset || {}),
                    id: assetId,
                    typeId,
                    typeName: type?.name || '',
                    assetNumber: modal.querySelector('#pe-asset-number')?.value.trim() || assetId,
                    factoryId,
                    factory: factoryId,
                    factoryName: selectedSite?.name || '',
                    location: selectedSite?.name || '',
                    subLocationId: subLocationId || '',
                    subLocation: selectedPlace?.name || '',
                    subLocationName: selectedPlace?.name || '',
                    manufacturer: modal.querySelector('#pe-asset-manufacturer')?.value.trim(),
                    model: modal.querySelector('#pe-asset-model')?.value.trim(),
                    serialNumber: modal.querySelector('#pe-asset-serial')?.value.trim(),
                    status: modal.querySelector('#pe-asset-status')?.value,
                    responsible: modal.querySelector('#pe-asset-responsible')?.value.trim(),
                    installationDate: modal.querySelector('#pe-asset-install')?.value || '',
                    notes: modal.querySelector('#pe-asset-notes')?.value.trim()
                };
                PeriodicEquipmentStore.upsertAsset(payload);
                if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                    await GoogleIntegration.sendRequest({ action: 'saveOrUpdatePeriodicEquipmentAsset', data: payload }).catch(() => {});
                }
                Notification.success(isEdit ? 'تم تحديث المعدة' : 'تم إضافة المعدة');
                close();
                if (typeof PeriodicInspections !== 'undefined') await PeriodicInspections.refreshCurrentTabContent();
            } catch (err) {
                Notification.error(err.message || 'فشل الحفظ');
            }
        });
    },

    async deleteAsset(asset) {
        if (!this.isAdmin()) return;
        if (!confirm(`حذف المعدة ${asset.assetNumber || asset.id}؟`)) return;
        try {
            PeriodicEquipmentStore.deleteAsset(asset.id);
            if (typeof GoogleIntegration !== 'undefined') {
                await GoogleIntegration.sendRequest({ action: 'deletePeriodicEquipmentAsset', data: { assetId: asset.id } }).catch(() => {});
            }
            Notification.success('تم الحذف');
            if (typeof PeriodicInspections !== 'undefined') await PeriodicInspections.refreshCurrentTabContent();
        } catch (e) {
            Notification.error(e.message || 'فشل الحذف');
        }
    },

    async showTypeManagement() {
        if (!this.isAdmin()) {
            Notification.error('ليس لديك صلاحية.');
            return;
        }
        const types = PeriodicEquipmentStore.getAllTypes();
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <h2 class="modal-title text-white"><i class="fas fa-cog ml-2"></i>إدارة أنواع المعدات</h2>
                    <button type="button" class="modal-close text-white"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="flex justify-end mb-3">
                        <button type="button" id="pe-add-type-btn" class="btn-primary btn-sm"><i class="fas fa-plus ml-1"></i>نوع جديد</button>
                    </div>
                    <div class="space-y-2" id="pe-types-list">
                        ${types.map(t => `
                            <div class="flex items-center justify-between border rounded p-3 gap-2">
                                <div class="flex items-center gap-2">
                                    <i class="fas ${Utils.escapeHTML(t.icon || 'fa-toolbox')} text-blue-600"></i>
                                    <div>
                                        <div class="font-semibold">${Utils.escapeHTML(t.name)}${t.isDefault ? ' <span class="text-xs text-gray-400">(افتراضي)</span>' : ''}</div>
                                        <div class="text-xs text-gray-500">${Utils.escapeHTML(t.description || '')}</div>
                                    </div>
                                </div>
                                <div class="flex gap-1">
                                    <button type="button" class="btn-icon btn-icon-warning" data-edit-type="${Utils.escapeHTML(t.id)}"><i class="fas fa-edit"></i></button>
                                    ${!t.isDefault ? `<button type="button" class="btn-icon btn-icon-danger" data-del-type="${Utils.escapeHTML(t.id)}"><i class="fas fa-trash"></i></button>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        const close = () => modal.remove();
        modal.querySelector('.modal-close')?.addEventListener('click', close);
        modal.addEventListener('click', e => { if (e.target === modal) close(); });

        const openTypeForm = (type = null) => {
            const fm = document.createElement('div');
            fm.className = 'modal-overlay';
            fm.style.zIndex = '10001';
            fm.innerHTML = `
                <div class="modal-content" style="max-width: 500px;">
                    <div class="modal-header"><h2 class="modal-title">${type ? 'تعديل نوع' : 'نوع جديد'}</h2></div>
                    <form id="pe-type-form">
                        <div class="modal-body space-y-3">
                            <div><label class="form-label">الاسم *</label><input id="pe-type-name" class="form-input" required value="${Utils.escapeHTML(type?.name || '')}"></div>
                            <div><label class="form-label">الأيقونة (FontAwesome)</label><input id="pe-type-icon" class="form-input" value="${Utils.escapeHTML(type?.icon || 'fa-toolbox')}" placeholder="fa-toolbox"></div>
                            <div><label class="form-label">قالب الفحص المرتبط</label>
                                <select id="pe-type-template" class="form-input">
                                    <option value="">— افتراضي —</option>
                                    ${Object.values(PeriodicInspections?.INSPECTION_TEMPLATES || {}).map(tpl => `<option value="${Utils.escapeHTML(tpl.id)}" ${type?.linkedTemplateId === tpl.id ? 'selected' : ''}>${Utils.escapeHTML(tpl.name)}</option>`).join('')}
                                </select>
                            </div>
                            <div><label class="form-label">الوصف</label><textarea id="pe-type-desc" class="form-input" rows="2">${Utils.escapeHTML(type?.description || '')}</textarea></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-secondary" data-close>إلغاء</button>
                            <button type="submit" class="btn-primary">حفظ</button>
                        </div>
                    </form>
                </div>
            `;
            document.body.appendChild(fm);
            const closeFm = () => fm.remove();
            fm.querySelector('[data-close]')?.addEventListener('click', closeFm);
            fm.querySelector('#pe-type-form')?.addEventListener('submit', async ev => {
                ev.preventDefault();
                try {
                    const saved = PeriodicEquipmentStore.upsertType({
                        ...(type || {}),
                        name: fm.querySelector('#pe-type-name')?.value.trim(),
                        icon: fm.querySelector('#pe-type-icon')?.value.trim(),
                        linkedTemplateId: fm.querySelector('#pe-type-template')?.value || '',
                        description: fm.querySelector('#pe-type-desc')?.value.trim()
                    });
                    if (typeof GoogleIntegration !== 'undefined') {
                        await GoogleIntegration.sendRequest({ action: 'savePeriodicEquipmentType', data: saved }).catch(() => {});
                    }
                    Notification.success('تم الحفظ');
                    closeFm();
                    close();
                    await this.showTypeManagement();
                } catch (err) {
                    Notification.error(err.message);
                }
            });
        };

        modal.querySelector('#pe-add-type-btn')?.addEventListener('click', () => openTypeForm());
        modal.querySelectorAll('[data-edit-type]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-edit-type');
                openTypeForm(PeriodicEquipmentStore.getTypeById(id));
            });
        });
        modal.querySelectorAll('[data-del-type]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-del-type');
                if (!confirm('حذف هذا النوع؟')) return;
                try {
                    PeriodicEquipmentStore.deleteType(id);
                    await GoogleIntegration?.sendRequest?.({ action: 'deletePeriodicEquipmentType', data: { typeId: id } }).catch(() => {});
                    Notification.success('تم الحذف');
                    close();
                    await this.showTypeManagement();
                } catch (e) {
                    Notification.error(e.message);
                }
            });
        });
    },

    async showAssetDetails(asset) {
        const inspections = PeriodicEquipmentStore.listInspections(asset.id);
        const qrImage = typeof QRCode !== 'undefined'
            ? QRCode.generate(asset.qrCodeData || asset.id, 180)
            : null;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 820px;">
                <div class="modal-header"><h2 class="modal-title">معدة ${Utils.escapeHTML(asset.assetNumber || asset.id)}</h2>
                    <button type="button" class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="content-card"><div class="card-body text-sm space-y-1">
                            <p><strong>النوع:</strong> ${Utils.escapeHTML(asset.typeName || '-')}</p>
                            <p><strong>الموقع:</strong> ${Utils.escapeHTML(this.getAssetSiteLabel(asset))}</p>
                            <p><strong>الموقع الفرعي:</strong> ${Utils.escapeHTML(this.getAssetSubLocationLabel(asset))}</p>
                            <p><strong>الحالة:</strong> ${this.getStatusBadge(asset.status)}</p>
                            <p><strong>المصنع:</strong> ${Utils.escapeHTML(asset.manufacturer || '-')}</p>
                            <p><strong>الموديل:</strong> ${Utils.escapeHTML(asset.model || '-')}</p>
                            <p><strong>التسلسلي:</strong> ${Utils.escapeHTML(asset.serialNumber || '-')}</p>
                            <p><strong>المسؤول:</strong> ${Utils.escapeHTML(asset.responsible || '-')}</p>
                            ${asset.notes ? `<p><strong>ملاحظات:</strong> ${Utils.escapeHTML(asset.notes)}</p>` : ''}
                        </div></div>
                        <div class="content-card text-center"><div class="card-body">
                            ${qrImage ? `<img src="${qrImage}" alt="QR" class="mx-auto h-36 w-36 border p-2 bg-white">` : '<p class="text-gray-500">لا يوجد QR</p>'}
                            <button type="button" class="btn-secondary mt-2" id="pe-print-qr"><i class="fas fa-print ml-1"></i>طباعة QR</button>
                            <p class="text-xs text-gray-400 mt-2 break-all">${Utils.escapeHTML(asset.qrCodeData || asset.id)}</p>
                        </div></div>
                    </div>
                    <div class="content-card">
                        <div class="card-header"><h3 class="card-title">سجل الفحوصات (${inspections.length})</h3></div>
                        <div class="card-body">
                            ${inspections.length ? `<table class="data-table text-sm"><thead><tr><th>التاريخ</th><th>المفتش</th><th>النتيجة</th></tr></thead><tbody>
                                ${inspections.slice(0, 10).map(i => `<tr><td>${Utils.formatDate(i.inspectionDate)}</td><td>${Utils.escapeHTML(i.inspector || '-')}</td><td>${Utils.escapeHTML(i.result || '-')}</td></tr>`).join('')}
                            </tbody></table>` : '<p class="text-gray-500">لا فحوصات بعد</p>'}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-close>إغلاق</button>
                    <button type="button" class="btn-primary" id="pe-detail-inspect"><i class="fas fa-clipboard-check ml-1"></i>فحص الآن</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        const close = () => modal.remove();
        modal.querySelector('.modal-close')?.addEventListener('click', close);
        modal.querySelector('[data-close]')?.addEventListener('click', close);
        modal.querySelector('#pe-print-qr')?.addEventListener('click', () => this.printQr(asset));
        modal.querySelector('#pe-detail-inspect')?.addEventListener('click', () => { close(); this.showInspectionForm(asset); });
    },

    printQr(asset) {
        const qrImage = typeof QRCode !== 'undefined' ? QRCode.generate(asset.qrCodeData || asset.id, 240) : '';
        const w = window.open('', '_blank');
        if (!w) { Notification.warning('اسمح بالنوافذ المنبثقة للطباعة'); return; }
        w.document.write(`<html dir="rtl"><head><title>QR ${asset.id}</title></head><body style="text-align:center;font-family:sans-serif;padding:24px">
            <h2>${Utils.escapeHTML(asset.typeName || '')}</h2>
            <p>${Utils.escapeHTML(asset.assetNumber || asset.id)} — ${Utils.escapeHTML(this.getAssetSiteLabel(asset))}</p>
            ${qrImage ? `<img src="${qrImage}" style="width:240px;height:240px">` : ''}
            <p style="font-size:12px;margin-top:12px">${Utils.escapeHTML(asset.qrCodeData || asset.id)}</p>
            <script>window.onload=function(){window.print();}</script></body></html>`);
        w.document.close();
    },

    async showInspectionForm(asset) {
        const checklist = PeriodicEquipmentStore.getChecklistForAsset(asset);
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 720px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-clipboard-check ml-2"></i>فحص: ${Utils.escapeHTML(asset.typeName || '')} — ${Utils.escapeHTML(asset.assetNumber || asset.id)}</h2>
                    <button type="button" class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <form id="pe-inspection-form">
                    <div class="modal-body space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label class="form-label">تاريخ الفحص</label><input type="date" id="pe-insp-date" class="form-input" value="${new Date().toISOString().slice(0, 10)}" required></div>
                            <div><label class="form-label">المفتش</label><input type="text" id="pe-insp-inspector" class="form-input" value="${Utils.escapeHTML(AppState.currentUser?.name || '')}"></div>
                        </div>
                        <div class="content-card"><div class="card-header"><h3 class="card-title text-sm">قائمة الفحص</h3></div><div class="card-body space-y-2">
                            ${checklist.map((item, idx) => `
                                <label class="flex items-start gap-2 p-2 border rounded cursor-pointer">
                                    <input type="checkbox" class="mt-1 pe-check-item" data-id="${Utils.escapeHTML(item.id)}" data-label="${Utils.escapeHTML(item.label)}" data-required="${item.required ? '1' : '0'}">
                                    <span>${Utils.escapeHTML(item.label)}${item.required ? ' <span class="text-red-500">*</span>' : ''}</span>
                                </label>
                            `).join('')}
                        </div></div>
                        <div><label class="form-label">ملاحظات</label><textarea id="pe-insp-findings" class="form-input" rows="2"></textarea></div>
                        <div><label class="form-label">النتيجة الإجمالية</label>
                            <select id="pe-insp-result" class="form-input">
                                <option value="مطابق">مطابق</option>
                                <option value="غير مطابق">غير مطابق</option>
                                <option value="يحتاج متابعة">يحتاج متابعة</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" data-close>إلغاء</button>
                        <button type="submit" class="btn-primary"><i class="fas fa-save ml-2"></i>حفظ الفحص</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        const close = () => modal.remove();
        modal.querySelector('.modal-close')?.addEventListener('click', close);
        modal.querySelector('[data-close]')?.addEventListener('click', close);

        modal.querySelector('#pe-inspection-form')?.addEventListener('submit', async e => {
            e.preventDefault();
            const items = [...modal.querySelectorAll('.pe-check-item')];
            const checklistResults = items.map(cb => ({
                id: cb.dataset.id,
                label: cb.dataset.label,
                passed: cb.checked,
                required: cb.dataset.required === '1'
            }));
            const missingRequired = checklistResults.filter(r => r.required && !r.passed);
            if (missingRequired.length) {
                Notification.warning('يرجى استيفاء جميع بنود الفحص المطلوبة أو اختيار «غير مطابق»');
            }
            try {
                const record = PeriodicEquipmentStore.addInspection({
                    assetId: asset.id,
                    assetNumber: asset.assetNumber,
                    inspectionDate: new Date(modal.querySelector('#pe-insp-date')?.value).toISOString(),
                    inspector: modal.querySelector('#pe-insp-inspector')?.value.trim(),
                    result: modal.querySelector('#pe-insp-result')?.value,
                    findings: modal.querySelector('#pe-insp-findings')?.value.trim(),
                    checklistResults
                });
                if (typeof GoogleIntegration !== 'undefined') {
                    await GoogleIntegration.sendRequest({ action: 'addPeriodicEquipmentInspection', data: record }).catch(() => {});
                    await GoogleIntegration.sendRequest({
                        action: 'saveOrUpdatePeriodicEquipmentAsset',
                        data: PeriodicEquipmentStore.getAssetById(asset.id)
                    }).catch(() => {});
                }
                Notification.success('تم حفظ الفحص');
                close();
                if (typeof PeriodicInspections !== 'undefined') await PeriodicInspections.refreshCurrentTabContent();
            } catch (err) {
                Notification.error(err.message || 'فشل حفظ الفحص');
            }
        });
    },

    async startQRScan() {
        if (!navigator.mediaDevices?.getUserMedia) {
            Notification.error('المتصفح لا يدعم الكاميرا — استخدم الإدخال اليدوي');
            return;
        }
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header"><h2 class="modal-title"><i class="fas fa-qrcode ml-2"></i>مسح QR للفحص</h2>
                    <button type="button" class="modal-close" id="pe-qr-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div id="pe-qr-container" style="position:relative;background:#000;border-radius:8px;overflow:hidden">
                        <video id="pe-qr-video" autoplay playsinline muted style="width:100%;max-height:50vh;display:block"></video>
                        <canvas id="pe-qr-canvas" style="display:none"></canvas>
                    </div>
                    <div class="mt-4 flex gap-2">
                        <input type="text" id="pe-manual-id" class="form-input flex-1" placeholder="PEA-0001">
                        <button type="button" id="pe-manual-submit" class="btn-primary">تأكيد</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        const video = modal.querySelector('#pe-qr-video');
        const canvas = modal.querySelector('#pe-qr-canvas');
        const ctx = canvas.getContext('2d');
        const closeModal = () => { this.stopQRScan(); modal.remove(); };
        modal.querySelector('#pe-qr-close')?.addEventListener('click', closeModal);
        const processId = async (id) => {
            const trimmed = String(id || '').trim();
            if (!trimmed) return;
            closeModal();
            const asset = PeriodicEquipmentStore.getAssetById(trimmed);
            if (!asset) { Notification.error(`لم يُعثر على معدة: ${trimmed}`); return; }
            await this.showInspectionForm(asset);
        };
        modal.querySelector('#pe-manual-submit')?.addEventListener('click', () => processId(modal.querySelector('#pe-manual-id')?.value));
        try {
            this._qrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } } });
            video.srcObject = this._qrStream;
            video.addEventListener('loadedmetadata', () => { canvas.width = video.videoWidth; canvas.height = video.videoHeight; });
            this._qrScanInterval = setInterval(() => {
                if (video.readyState !== video.HAVE_ENOUGH_DATA || typeof jsQR === 'undefined') return;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const code = jsQR(ctx.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
                if (code?.data) processId(code.data.trim());
            }, 200);
        } catch (_) {
            Notification.warning('تعذر فتح الكاميرا — أدخل الرقم يدوياً');
        }
    },

    stopQRScan() {
        if (this._qrStream) {
            this._qrStream.getTracks().forEach(t => t.stop());
            this._qrStream = null;
        }
        if (this._qrScanInterval) {
            clearInterval(this._qrScanInterval);
            this._qrScanInterval = null;
        }
    },

    async loadDataFromBackend(force) {
        if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendRequest) return;
        this.ensureData();
        const hasLocal = (AppState.appData.periodicEquipmentAssets?.length > 0);
        if (!force && hasLocal && PeriodicInspections?._peDataLoadedOnce) return;

        const [typesRes, assetsRes, inspRes] = await Promise.allSettled([
            GoogleIntegration.sendRequest({ action: 'getAllPeriodicEquipmentTypes', data: {} }),
            GoogleIntegration.sendRequest({ action: 'getAllPeriodicEquipmentAssets', data: {} }),
            GoogleIntegration.sendRequest({ action: 'getAllPeriodicEquipmentInspections', data: {} })
        ]);

        const mergeSheet = (key, res) => {
            if (res.status !== 'fulfilled' || !res.value?.success || !Array.isArray(res.value.data)) return;
            const incoming = res.value.data;
            if (!incoming.length && (AppState.appData[key]?.length > 0)) return;
            AppState.appData[key] = incoming;
        };

        mergeSheet('periodicEquipmentTypes', typesRes);
        mergeSheet('periodicEquipmentAssets', assetsRes);
        mergeSheet('periodicEquipmentInspections', inspRes);
        PeriodicEquipmentStore.ensureInitialized();
        if (typeof DataManager !== 'undefined' && DataManager.save) DataManager.save();
        if (typeof PeriodicInspections !== 'undefined') PeriodicInspections._peDataLoadedOnce = true;
    }
};

if (typeof window !== 'undefined') {
    window.PeriodicEquipment = PeriodicEquipment;
}
