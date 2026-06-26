/**
 * Periodic Equipment Store — أنواع وأجهزة وفحوصات المعدات (الفحوصات الدورية)
 */

const DEFAULT_PERIODIC_EQUIPMENT_TYPES = [
    {
        id: 'pet_forklift',
        name: 'كلارك',
        icon: 'fa-truck-loading',
        linkedTemplateId: 'forklift',
        description: 'الرافعات الشوكية',
        isDefault: true,
        active: true,
        order: 1
    },
    {
        id: 'pet_ladders',
        name: 'سلالم',
        icon: 'fa-stairs',
        linkedTemplateId: 'ladders',
        description: 'السلالم الثابتة والمتحركة',
        isDefault: true,
        active: true,
        order: 2
    },
    {
        id: 'pet_extinguisher',
        name: 'استكر',
        icon: 'fa-fire-extinguisher',
        linkedTemplateId: 'fire-extinguisher',
        description: 'معدات الإطفاء (استكر) — سجل الفحوصات الدورية',
        isDefault: true,
        active: true,
        order: 3
    },
    {
        id: 'pet_other',
        name: 'معدات أخرى',
        icon: 'fa-toolbox',
        linkedTemplateId: '',
        description: 'معدات متنوعة قابلة للتخصيص',
        isDefault: true,
        active: true,
        order: 99
    }
];

const PeriodicEquipmentStore = {
    ensureInitialized() {
        if (!AppState || !AppState.appData) return;
        const data = AppState.appData;
        if (!Array.isArray(data.periodicEquipmentTypes)) data.periodicEquipmentTypes = [];
        if (!Array.isArray(data.periodicEquipmentAssets)) data.periodicEquipmentAssets = [];
        if (!Array.isArray(data.periodicEquipmentInspections)) data.periodicEquipmentInspections = [];

        const now = new Date().toISOString();
        DEFAULT_PERIODIC_EQUIPMENT_TYPES.forEach(def => {
            const exists = data.periodicEquipmentTypes.some(t => t.id === def.id || t.name === def.name);
            if (!exists) {
                data.periodicEquipmentTypes.push({
                    ...def,
                    createdAt: now,
                    updatedAt: now
                });
            }
        });
    },

    listTypes() {
        this.ensureInitialized();
        return (AppState.appData.periodicEquipmentTypes || [])
            .filter(t => t.active !== false)
            .slice()
            .sort((a, b) => (a.order || 999) - (b.order || 999));
    },

    getAllTypes() {
        this.ensureInitialized();
        return (AppState.appData.periodicEquipmentTypes || []).slice();
    },

    getTypeById(typeId) {
        if (!typeId) return null;
        this.ensureInitialized();
        return (AppState.appData.periodicEquipmentTypes || []).find(t => t.id === typeId) || null;
    },

    upsertType(type, options = {}) {
        if (!type || !type.name) throw new Error('يجب إدخال اسم النوع');
        this.ensureInitialized();
        const data = AppState.appData.periodicEquipmentTypes;
        const now = new Date().toISOString();
        const normalized = {
            id: type.id || Utils.generateId('PET'),
            name: String(type.name).trim(),
            icon: type.icon ? String(type.icon).trim() : 'fa-toolbox',
            linkedTemplateId: type.linkedTemplateId ? String(type.linkedTemplateId).trim() : '',
            description: type.description ? String(type.description).trim() : '',
            isDefault: type.isDefault === true,
            active: type.active !== false,
            order: typeof type.order === 'number' ? type.order : 50,
            createdAt: type.createdAt || now,
            updatedAt: now
        };

        const dup = data.find(t => t.id !== normalized.id && t.name.toLowerCase() === normalized.name.toLowerCase());
        if (dup) throw new Error('يوجد نوع بنفس الاسم');

        const idx = data.findIndex(t => t.id === normalized.id);
        if (idx >= 0) data[idx] = normalized;
        else data.push(normalized);

        if (typeof DataManager !== 'undefined' && DataManager.save) DataManager.save();
        if (options.autoSave !== false && GoogleIntegration?.autoSave) {
            GoogleIntegration.autoSave('PeriodicEquipmentTypes', data).catch(() => {});
        }
        return normalized;
    },

    deleteType(typeId) {
        if (!typeId) return false;
        this.ensureInitialized();
        const data = AppState.appData;
        const type = data.periodicEquipmentTypes.find(t => t.id === typeId);
        if (!type) throw new Error('النوع غير موجود');
        if (type.isDefault) throw new Error('لا يمكن حذف النوع الافتراضي');
        if ((data.periodicEquipmentAssets || []).some(a => a.typeId === typeId)) {
            throw new Error('لا يمكن حذف النوع لوجود أجهزة مرتبطة');
        }
        data.periodicEquipmentTypes = data.periodicEquipmentTypes.filter(t => t.id !== typeId);
        if (typeof DataManager !== 'undefined' && DataManager.save) DataManager.save();
        if (GoogleIntegration?.autoSave) {
            GoogleIntegration.autoSave('PeriodicEquipmentTypes', data.periodicEquipmentTypes).catch(() => {});
        }
        return true;
    },

    listAssets() {
        this.ensureInitialized();
        return Array.isArray(AppState.appData.periodicEquipmentAssets)
            ? AppState.appData.periodicEquipmentAssets.slice()
            : [];
    },

    getAssetById(assetId) {
        if (!assetId) return null;
        return this.listAssets().find(a => a.id === assetId || a.assetNumber === assetId) || null;
    },

    generateAssetId() {
        const assets = this.listAssets();
        const nums = assets
            .map(a => a.id)
            .filter(id => id && /^PEA-\d{4}$/.test(id))
            .map(id => parseInt(id.split('-')[1], 10))
            .filter(n => !isNaN(n));
        const next = nums.length ? Math.max(...nums) + 1 : 1;
        return `PEA-${String(next).padStart(4, '0')}`;
    },

    upsertAsset(asset, options = {}) {
        if (!asset) throw new Error('بيانات الجهاز مطلوبة');
        this.ensureInitialized();
        const data = AppState.appData.periodicEquipmentAssets;
        const now = new Date().toISOString();
        const id = asset.id || this.generateAssetId();
        const type = this.getTypeById(asset.typeId);
        const normalized = {
            id,
            assetNumber: asset.assetNumber || asset.number || id,
            typeId: asset.typeId || '',
            typeName: asset.typeName || type?.name || '',
            location: asset.location ? String(asset.location).trim() : '',
            subLocation: asset.subLocation ? String(asset.subLocation).trim() : '',
            factory: asset.factory ? String(asset.factory).trim() : '',
            factoryId: asset.factoryId || '',
            manufacturer: asset.manufacturer ? String(asset.manufacturer).trim() : '',
            model: asset.model ? String(asset.model).trim() : '',
            serialNumber: asset.serialNumber ? String(asset.serialNumber).trim() : '',
            manufacturingYear: asset.manufacturingYear || '',
            installationDate: asset.installationDate || '',
            status: asset.status || 'صالح',
            responsible: asset.responsible ? String(asset.responsible).trim() : '',
            notes: asset.notes ? String(asset.notes).trim() : '',
            qrCodeData: asset.qrCodeData || id,
            lastInspection: asset.lastInspection || '',
            nextInspection: asset.nextInspection || '',
            createdAt: asset.createdAt || now,
            updatedAt: now
        };

        if (!normalized.typeId) throw new Error('يجب اختيار نوع المعدة');

        const idx = data.findIndex(a => a.id === id);
        if (idx >= 0) data[idx] = normalized;
        else data.push(normalized);

        if (typeof DataManager !== 'undefined' && DataManager.save) DataManager.save();
        if (options.autoSave !== false && GoogleIntegration?.autoSave) {
            GoogleIntegration.autoSave('PeriodicEquipmentAssets', data).catch(() => {});
        }
        return normalized;
    },

    deleteAsset(assetId) {
        if (!assetId) return false;
        this.ensureInitialized();
        const data = AppState.appData;
        data.periodicEquipmentAssets = (data.periodicEquipmentAssets || []).filter(a => a.id !== assetId);
        data.periodicEquipmentInspections = (data.periodicEquipmentInspections || []).filter(i => i.assetId !== assetId);
        if (typeof DataManager !== 'undefined' && DataManager.save) DataManager.save();
        if (GoogleIntegration?.autoSave) {
            GoogleIntegration.autoSave('PeriodicEquipmentAssets', data.periodicEquipmentAssets).catch(() => {});
            GoogleIntegration.autoSave('PeriodicEquipmentInspections', data.periodicEquipmentInspections).catch(() => {});
        }
        return true;
    },

    listInspections(assetId) {
        this.ensureInitialized();
        let list = Array.isArray(AppState.appData.periodicEquipmentInspections)
            ? AppState.appData.periodicEquipmentInspections.slice()
            : [];
        if (assetId) list = list.filter(i => i.assetId === assetId);
        return list.sort((a, b) => new Date(b.inspectionDate || b.createdAt || 0) - new Date(a.inspectionDate || a.createdAt || 0));
    },

    addInspection(inspection, options = {}) {
        if (!inspection || !inspection.assetId) throw new Error('معرف الجهاز مطلوب');
        this.ensureInitialized();
        const data = AppState.appData.periodicEquipmentInspections;
        const now = new Date().toISOString();
        const asset = this.getAssetById(inspection.assetId);
        const record = {
            id: inspection.id || Utils.generateId('PEI'),
            assetId: inspection.assetId,
            assetNumber: inspection.assetNumber || asset?.assetNumber || asset?.id || '',
            inspectionDate: inspection.inspectionDate || now,
            inspector: inspection.inspector || AppState.currentUser?.name || '',
            result: inspection.result || 'مطابق',
            checklistResults: inspection.checklistResults || [],
            findings: inspection.findings || '',
            status: inspection.status || 'مكتمل',
            createdAt: now,
            updatedAt: now
        };

        data.push(record);

        if (asset) {
            const next = new Date(record.inspectionDate);
            next.setMonth(next.getMonth() + 1);
            this.upsertAsset({
                ...asset,
                lastInspection: record.inspectionDate,
                nextInspection: next.toISOString().split('T')[0]
            }, { autoSave: false });
        }

        if (typeof DataManager !== 'undefined' && DataManager.save) DataManager.save();
        if (options.autoSave !== false && GoogleIntegration?.autoSave) {
            GoogleIntegration.autoSave('PeriodicEquipmentInspections', data).catch(() => {});
            GoogleIntegration.autoSave('PeriodicEquipmentAssets', AppState.appData.periodicEquipmentAssets).catch(() => {});
        }
        return record;
    },

    getChecklistForAsset(asset) {
        if (!asset) return [];
        const type = this.getTypeById(asset.typeId);
        const templateId = type?.linkedTemplateId;
        if (templateId && typeof PeriodicInspections !== 'undefined' && PeriodicInspections.INSPECTION_TEMPLATES) {
            const tpl = PeriodicInspections.INSPECTION_TEMPLATES[templateId];
            if (tpl?.checklist) return tpl.checklist;
        }
        return [
            { id: 'pe_default_1', label: 'الحالة العامة للمعدة', required: true },
            { id: 'pe_default_2', label: 'سلامة التشغيل', required: true },
            { id: 'pe_default_3', label: 'الموقع والتثبيت', required: false }
        ];
    }
};

if (typeof window !== 'undefined') {
    window.PeriodicEquipmentStore = PeriodicEquipmentStore;
    window.DEFAULT_PERIODIC_EQUIPMENT_TYPES = DEFAULT_PERIODIC_EQUIPMENT_TYPES;
}
