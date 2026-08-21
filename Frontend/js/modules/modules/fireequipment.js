/**
 * FireEquipment Module
 * تم استخراجه من app-modules.js
 */
// ===== Fire Equipment Module v2 (قاعدة بيانات معدات الحريق) =====
FireEquipment = {
    state: {
        currentTab: 'database', // 'database' أو 'register' أو 'inspections' أو 'analytics' أو 'approval-requests'
        filters: {
            search: '',
            type: 'all',
            status: 'all',
            location: 'all'
        }
    },
    applyModuleI18n(root) {
        const i18nCore = (window.AppI18n && typeof window.AppI18n.applyI18n === 'function')
            ? window.AppI18n
            : ((window.I18n && typeof window.I18n.applyI18n === 'function') ? window.I18n : null);
        if (!i18nCore) return;
        const target = root || document.getElementById('fire-equipment-section') || document;
        i18nCore.applyI18n(target);
        if (typeof i18nCore.applyLiteralTranslations === 'function') {
            i18nCore.applyLiteralTranslations(target);
        }
    },

    assetTypes: [
        'طفاية حريق',
        'خرطوم حريق',
        'صندوق حريق',
        'جهاز إنذار',
        'نظام رش مائي',
        'مضخة حريق',
        'صمام حريق',
        'أخرى'
    ],

    statusOptions: [
        { value: 'صالح', label: 'صالح' },
        { value: 'يحتاج صيانة', label: 'يحتاج صيانة' },
        { value: 'خارج الخدمة', label: 'خارج الخدمة' }
    ],

    /**
     * تأكيد إغلاق النموذج
     * @param {HTMLElement} button - زر الإغلاق المضغوط عليه
     */
    confirmClose(button) {
        if (confirm('هل أنت متأكد من إغلاق هذا النموذج؟\nسيتم فقدان أي بيانات غير محفوظة.')) {
            button.closest('.modal-overlay').remove();
        }
    },

    /**
     * إغلاق النموذج مباشرة بدون تأكيد (لنماذج العرض فقط)
     * @param {HTMLElement} button - زر الإغلاق المضغوط عليه
     */
    closeModal(button) {
        const modal = button.closest('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    },

    /**
     * توليد DeviceID بتنسيق EFA-0000 (3 حروف - 4 أرقام)
     * @returns {string} DeviceID بالتنسيق الجديد
     */
    generateFireDeviceID() {
        const assets = this.getAssets();
        const existingNumbers = assets
            .map(a => a.id)
            .filter(id => id && id.match(/^EFA-\d{4}$/))
            .map(id => parseInt(id.split('-')[1]))
            .filter(num => !isNaN(num));

        const nextNumber = existingNumbers.length > 0
            ? Math.max(...existingNumbers) + 1
            : 1;

        const paddedNumber = String(nextNumber).padStart(4, '0');
        return `EFA-${paddedNumber}`;
    },

    _injectFireIdentityStyles() {
        try {
            if (document.getElementById('fire-professional-identity-styles')) return;
            const style = document.createElement('style');
            style.id = 'fire-professional-identity-styles';
            style.textContent = `
                #fire-equipment-section .fire-id-hero {
                    --f-navy: #0b2a55;
                    --f-blue: #1e40af;
                    --f-blue2: #2563eb;
                }
                #fire-equipment-section .fire-id-hero {
                    position: relative; overflow: hidden;
                    display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
                    padding: 20px 24px; border-radius: 18px; color: #fff;
                    background: linear-gradient(130deg, #0b2a55 0%, #1e40af 55%, #2563eb 100%);
                    box-shadow: 0 14px 34px rgba(11,42,85,.25);
                }
                #fire-equipment-section .fire-id-hero::after {
                    content: ""; position: absolute; inset-inline-end: -64px; top: -96px;
                    width: 220px; height: 220px; border: 30px solid rgba(255,255,255,.05); border-radius: 50%; pointer-events: none;
                }
                #fire-equipment-section .fire-id-hero::before {
                    content: ""; position: absolute; inset-inline-start: 38%; bottom: -70px;
                    width: 150px; height: 150px; border: 20px solid rgba(255,255,255,.04); border-radius: 50%; pointer-events: none;
                }
                #fire-equipment-section .fire-id-hero__copy { position: relative; z-index: 1; display: flex; align-items: center; gap: 15px; min-width: min(100%, 340px); }
                #fire-equipment-section .fire-id-hero__icon {
                    flex: 0 0 auto; width: 54px; height: 54px; display: grid; place-items: center;
                    border: 1px solid rgba(255,255,255,.24); border-radius: 15px; background: rgba(255,255,255,.12); font-size: 23px; color: #fde68a;
                }
                #fire-equipment-section .fire-id-hero__eyebrow { display: block; margin-bottom: 4px; color: #bfdbfe; font-size: .68rem; font-weight: 800; letter-spacing: .04em; }
                #fire-equipment-section .fire-id-hero h1 { margin: 0; color: #fff; font-size: 1.3rem; font-weight: 900; line-height: 1.35; }
                #fire-equipment-section .fire-id-hero p { margin: 5px 0 0; color: #dbeafe; font-size: .78rem; }
                #fire-equipment-section .fire-id-hero__meta { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                #fire-equipment-section .fire-id-hero__meta span {
                    display: inline-flex; align-items: center; gap: 7px; padding: 8px 12px;
                    border: 1px solid rgba(255,255,255,.22); border-radius: 10px; background: rgba(255,255,255,.1);
                    font-size: .72rem; font-weight: 750; white-space: nowrap;
                }
                #fire-equipment-section .fire-id-hero__meta span i { color: #93c5fd; }
                #fire-equipment-section .fire-id-hero__actions { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
                #fire-equipment-section .fire-id-hero__actions .btn-primary {
                    background: linear-gradient(135deg,#fbbf24,#f59e0b); color: #7c2d12; border: none; font-weight: 800;
                    box-shadow: 0 6px 18px rgba(0,0,0,.18);
                }
                #fire-equipment-section .fire-id-hero__actions .btn-secondary {
                    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.25); color: #fff; font-weight: 700;
                }
                #fire-equipment-section .fire-id-hero__actions .btn-secondary:hover { background: rgba(255,255,255,.2); color: #fff; }
                @media (max-width: 820px) {
                    #fire-equipment-section .fire-id-hero { padding: 18px; }
                    #fire-equipment-section .fire-id-hero__copy { align-items: flex-start; }
                    #fire-equipment-section .fire-id-hero__icon { width: 46px; height: 46px; font-size: 19px; }
                    #fire-equipment-section .fire-id-hero h1 { font-size: 1.05rem; }
                    #fire-equipment-section .fire-id-hero__meta { width: 100%; }
                    #fire-equipment-section .fire-id-hero__meta span { flex: 1; justify-content: center; }
                    #fire-equipment-section .fire-id-hero__actions { width: 100%; }
                    #fire-equipment-section .fire-id-hero__actions .btn { flex: 1; justify-content: center; }
                }
                /* ✅ الهوية — شريط التبويبات (نمط هوية المديولات) */
                #fire-equipment-section .fire-id-tabs-wrap {
                    display: flex; gap: 8px; padding: 8px; border-radius: 16px; overflow-x: auto; margin-bottom: 18px;
                    border: 1px solid rgba(255,255,255,.14);
                    background: radial-gradient(circle at 8% 0%, rgba(251,191,36,.16), transparent 30%),
                                linear-gradient(125deg, #0b2a55 0%, #1e3a75 70%, #245a9b 100%);
                    box-shadow: 0 12px 30px rgba(11,37,85,.22);
                }
                #fire-equipment-section .fire-id-tabs { border-bottom: none; flex-wrap: nowrap; gap: 8px; min-width: max-content; }
                #fire-equipment-section .fire-tab-btn {
                    min-height: 46px; padding: 9px 16px; margin: 0;
                    border: 1px solid rgba(255,255,255,.15); border-radius: 11px;
                    background: rgba(255,255,255,.08); color: rgba(255,255,255,.85);
                    font-weight: 700; white-space: nowrap; transition: all .2s ease;
                }
                #fire-equipment-section .fire-tab-btn:hover { background: rgba(255,255,255,.15); color: #fff; transform: translateY(-1px); }
                #fire-equipment-section .fire-tab-btn.active {
                    border-color: #fff; background: #fff !important; color: var(--f-blue, #1e40af);
                    box-shadow: 0 8px 22px rgba(0,0,0,.2);
                }
                #fire-equipment-section .fire-tab-btn.active i { color: var(--f-blue, #1e40af); }
                /* ✅ الهوية — أسطح المحتوى والجداول */
                #fire-equipment-section #fire-tab-content { animation: fireSurfaceIn .24s ease-out; }
                @keyframes fireSurfaceIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                #fire-equipment-section #fire-tab-content .content-card {
                    border-radius: 16px; border-color: #dce7f5 !important;
                    box-shadow: 0 8px 24px rgba(15,47,90,.07);
                }
                #fire-equipment-section #fire-tab-content .card-header {
                    border-bottom: 1px solid #e5edf7; background: linear-gradient(180deg, #f8fbff, #fff); border-radius: 16px 16px 0 0;
                }
                #fire-equipment-section .data-table thead th,
                #fire-equipment-section .table-header-red thead th {
                    background: linear-gradient(90deg, #1e40af, #2563eb) !important; color: #fff !important;
                    font-weight: 700; white-space: nowrap; border: none !important;
                }
                #fire-equipment-section .data-table tbody tr:hover td { background: #f2f7ff !important; }
                #fire-equipment-section .data-table td { vertical-align: middle; }
                /* ✅ الهوية — كروت الإحصائيات (نمط KPI الموحّد) */
                #fire-equipment-section .fire-stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 22px; }
                @media (max-width: 1100px) { #fire-equipment-section .fire-stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
                @media (max-width: 540px) { #fire-equipment-section .fire-stat-grid { grid-template-columns: 1fr; } }
                #fire-equipment-section .fire-stat {
                    position: relative; overflow: hidden; border-radius: 16px; padding: 18px 18px 20px;
                    background: linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%);
                    border: 1px solid #dce7f5; display: flex; gap: 14px; align-items: flex-start;
                    box-shadow: 0 8px 24px rgba(15,47,90,.07);
                    transition: transform .2s ease, box-shadow .2s ease;
                }
                #fire-equipment-section .fire-stat:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(15,47,90,.13); }
                #fire-equipment-section .fire-stat::before {
                    content: ""; position: absolute; inset-inline-start: 0; top: 14px; bottom: 14px; width: 4px;
                    border-radius: 4px; background: var(--fs-tone, #2563eb);
                }
                #fire-equipment-section .fire-stat__icon {
                    flex: 0 0 auto; width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center;
                    font-size: 20px; color: #fff;
                    background: linear-gradient(135deg, var(--fs-tone, #1e40af), var(--fs-tone2, #2563eb));
                }
                #fire-equipment-section .fire-stat--blue   { --fs-tone: #1e40af; --fs-tone2: #2563eb; }
                #fire-equipment-section .fire-stat--green  { --fs-tone: #15803d; --fs-tone2: #16a34a; }
                #fire-equipment-section .fire-stat--amber  { --fs-tone: #d97706; --fs-tone2: #f59e0b; }
                #fire-equipment-section .fire-stat--red    { --fs-tone: #b91c1c; --fs-tone2: #dc2626; }
                #fire-equipment-section .fire-stat__body { min-width: 0; flex: 1; }
                #fire-equipment-section .fire-stat__label { display: block; font-size: .74rem; font-weight: 800; color: #475569; margin-bottom: 4px; }
                #fire-equipment-section .fire-stat__value { display: block; font-size: 1.9rem; font-weight: 800; line-height: 1.05; color: var(--fs-tone, #1e40af); }
                #fire-equipment-section .fire-stat__sub { display: block; margin-top: 4px; font-size: .68rem; font-weight: 600; color: #94a3b8; }
                #fire-equipment-section .fire-stat__bar { position: absolute; inset-inline: 0; bottom: 0; height: 4px; background: #e8eef7; }
                #fire-equipment-section .fire-stat__bar-fill { display: block; height: 100%; width: var(--fs-pct, 0%); background: linear-gradient(90deg, var(--fs-tone, #1e40af), var(--fs-tone2, #2563eb)); transition: width .5s ease; }
                /* ✅ الهوية — النماذج (الروابط الديناميكية داخل modals) */
                .fire-modal .modal-content { border: 1px solid #d5e2ef; border-top-width: 5px; border-top-style: solid; border-top-color: #1e40af; border-radius: 18px; box-shadow: 0 24px 60px rgba(15,23,42,.25); }
                .fire-modal .modal-header { background: linear-gradient(130deg, #0b2a55 0%, #1e40af 60%, #2563eb 100%); }
                .fire-modal .modal-title { color: #fff !important; }
                .fire-modal .modal-close { color: rgba(255,255,255,.85); background: rgba(255,255,255,.14); border-radius: 50%; transition: background .2s ease, color .2s ease; }
                .fire-modal .modal-close:hover { background: rgba(255,255,255,.28); color: #fff; }
                .fire-modal .form-label { font-size: .72rem; font-weight: 800; color: #334155; letter-spacing: .02em; }
                .fire-modal .form-input, .fire-modal select.form-input, .fire-modal input.form-input {
                    border: 1px solid #cbd5e1; border-radius: 10px; padding: .6rem .8rem; min-height: 44px;
                    background: #fbfdff; color: #0f172a; transition: border .2s ease, box-shadow .2s ease, background .2s ease;
                }
                .fire-modal .form-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.14); background: #fff; outline: none; }
                .fire-modal .btn-primary { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #7c2d12; border: none; font-weight: 800; border-radius: 10px; box-shadow: 0 8px 16px -8px rgba(245,158,11,.55); }
                .fire-modal .btn-primary:hover { filter: brightness(1.05); transform: translateY(-1px); }
                .fire-modal .btn-secondary { border-radius: 10px; font-weight: 700; }
                /* ✅ الهوية — بطاقة التصفية التفاعلية */
                #fire-equipment-section .fire-filter-card { border-radius: 16px; border-color: #dce7f5 !important; box-shadow: 0 8px 24px rgba(15,47,90,.07); }
                #fire-equipment-section .fire-filter-head { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
                #fire-equipment-section .fire-clear-btn { display: none; border-radius: 10px; font-weight: 700; color: #dc2626; border-color: #fecaca; background: #fef2f2; }
                #fire-equipment-section .fire-clear-btn:hover { background: #fee2e2; }
                #fire-equipment-section .fire-clear-btn.visible { display: inline-flex; align-items: center; }
                #fire-equipment-section .fire-filter-select option { font-weight: 600; }
                #fire-equipment-section .fire-filter-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
                #fire-equipment-section .fire-status-chips { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                #fire-equipment-section .fire-chip {
                    display: inline-flex; align-items: center; gap: 7px; padding: 8px 14px; cursor: pointer;
                    border: 1px solid #d8e2f0; border-radius: 999px; background: #f6faff; color: #475569;
                    font-size: .74rem; font-weight: 800; transition: all .2s ease;
                }
                #fire-equipment-section .fire-chip:hover { transform: translateY(-1px); box-shadow: 0 6px 14px rgba(15,47,90,.12); }
                #fire-equipment-section .fire-chip.active {
                    border-color: #1e40af; color: #fff;
                    background: linear-gradient(135deg, #1e40af, #2563eb);
                    box-shadow: 0 8px 18px -6px rgba(37,99,235,.5);
                }
                #fire-equipment-section .fire-chip--green.active { border-color: #15803d; background: linear-gradient(135deg, #15803d, #16a34a); box-shadow: 0 8px 18px -6px rgba(22,163,74,.5); }
                #fire-equipment-section .fire-chip--amber.active { border-color: #d97706; background: linear-gradient(135deg, #d97706, #f59e0b); box-shadow: 0 8px 18px -6px rgba(245,158,11,.5); }
                #fire-equipment-section .fire-chip--red.active { border-color: #b91c1c; background: linear-gradient(135deg, #b91c1c, #dc2626); box-shadow: 0 8px 18px -6px rgba(220,38,38,.5); }
                #fire-equipment-section .fire-filter-results {
                    display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px;
                    border: 1px solid #dbe7f5; border-radius: 999px; background: #f8fbff; color: #64748b;
                    font-size: .74rem; font-weight: 800; white-space: nowrap;
                }
                #fire-equipment-section .fire-filter-results i { color: #2563eb; }
                #fire-equipment-section .fire-filter-results.is-filtered { border-color: #fbbf24; background: #fffbeb; color: #92400e; }
                #fire-equipment-section .fire-filter-results.is-filtered i { color: #f59e0b; }
            `;
            document.head.appendChild(style);
        } catch (e) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('⚠️ تعذر حقن هوية معدات الحريق:', e);
        }
    },

    async load() {
        try {
        this._injectFireIdentityStyles();
        const section = document.getElementById('fire-equipment-section');
        if (!section) {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('قسم fire-equipment-section غير موجود!');
            } else {
                console.error('قسم fire-equipment-section غير موجود!');
            }
            return;
        }

        // التأكد من وجود AppState و appData لمنع الشاشة البيضاء
        if (typeof AppState === 'undefined') {
            section.innerHTML = '<div class="content-card"><div class="card-body"><p class="text-red-600">لم يتم تهيئة التطبيق بشكل صحيح. يرجى تحديث الصفحة.</p></div></div>';
            this.applyModuleI18n(section);
            return;
        }
        if (!AppState.appData) {
            AppState.appData = {};
        }

            const loadingPlaceholder = '<div class="fire-tab-loading"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>جاري التحميل...</p></div>';

            section.innerHTML = `
                <div class="fire-id-hero">
                    <div class="fire-id-hero__copy">
                        <div class="fire-id-hero__icon"><i class="fas fa-fire-extinguisher"></i></div>
                        <div>
                            <span class="fire-id-hero__eyebrow">منظومة السلامة والصحة المهنية — HSE</span>
                            <h1>سجل وفحص معدات الحريق</h1>
                            <p>إدارة قاعدة بيانات كاملة لكل معدات الإطفاء مع تتبع الفحوصات وQR Code لكل جهاز</p>
                        </div>
                    </div>
                    <div class="fire-id-hero__meta">
                        <span><i class="fas fa-database"></i> قاعدة بيانات الأجهزة</span>
                        <span><i class="fas fa-clipboard-check"></i> الفحوصات الشهرية</span>
                        <span><i class="fas fa-qrcode"></i> QR Code لكل جهاز</span>
                    </div>
                    <div class="fire-id-hero__actions">
                        ${this.canAdd() ? `
                        <button id="add-fire-asset-btn" class="btn-secondary">
                            <i class="fas fa-plus ml-2"></i>
                            إضافة جهاز جديد
                        </button>
                        ` : ''}
                        <button id="public-fire-link-btn" class="btn-secondary" title="رابط وبوستر الفحص الشهري العام">
                            <i class="fas fa-link ml-2"></i>
                            رابط الفحص العام
                        </button>
                        <button id="batch-print-qr-btn" class="btn-secondary" title="طباعة كروت ورموز QR لجميع الأجهزة دفعة واحدة">
                            <i class="fas fa-print ml-2"></i>
                            طباعة كروت QR شاملة
                        </button>
                        <button id="scan-qr-inspection-btn" class="btn-primary">
                            <i class="fas fa-qrcode ml-2"></i>
                            مسح QR Code للفحص الشهري
                        </button>
                        <button id="refresh-fire-equipment-btn" class="btn-secondary">
                            <i class="fas fa-sync-alt ml-2"></i>
                            تحديث
                        </button>
                    </div>
                </div>
                <style>
                    .fire-tabs-container {
                        margin-bottom: 1.5rem;
                    }
                    .fire-tabs-header {
                        display: flex;
                        gap: 0.5rem;
                        border-bottom: 2px solid #e5e7eb;
                        padding-bottom: 0;
                    }
                    .fire-tab-btn {
                        padding: 0.75rem 1.5rem;
                        background: none;
                        border: none;
                        border-bottom: 3px solid transparent;
                        color: #6b7280;
                        font-size: 0.9375rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        position: relative;
                        margin-bottom: -2px;
                    }
                    .fire-tab-btn:hover {
                        color: #3b82f6;
                        background-color: rgba(59, 130, 246, 0.05);
                    }
                    .fire-tab-btn.active {
                        color: #3b82f6;
                        border-bottom-color: #3b82f6;
                        font-weight: 600;
                    }
                    .fire-tab-btn i {
                        font-size: 14px;
                    }
                    .fire-tab-content {
                        display: none;
                    }
                    .fire-tab-content.active {
                        display: block;
                    }
                    .fire-tab-loading {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 3rem;
                        min-height: 200px;
                    }
                    .fire-tab-loading i {
                        font-size: 2rem;
                        color: #3b82f6;
                        margin-bottom: 1rem;
                    }
                    @media (max-width: 768px) {
                        .fire-tabs-header {
                            flex-wrap: wrap;
                            gap: 0.25rem;
                        }
                        .fire-tab-btn {
                            padding: 0.625rem 1rem;
                            font-size: 0.875rem;
                        }
                    }
                </style>
                <div class="fire-tabs-container fire-id-tabs-wrap mt-6">
                    <div class="fire-tabs-header fire-id-tabs">
                        ${this.hasTabAccess('database') ? `
                        <button class="fire-tab-btn active" data-tab="database" onclick="FireEquipment.switchTab('database')">
                            <i class="fas fa-database ml-2"></i>
                            قاعدة بيانات معدات الحريق
                        </button>
                        ` : ''}
                        ${this.hasTabAccess('register') ? `
                        <button class="fire-tab-btn" data-tab="register" onclick="FireEquipment.switchTab('register')">
                            <i class="fas fa-clipboard-list ml-2"></i>
                            سجل معدات الاطفاء والانذار
                        </button>
                        ` : ''}
                        ${this.hasTabAccess('inspections') ? `
                        <button class="fire-tab-btn" data-tab="inspections" onclick="FireEquipment.switchTab('inspections')">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            الفحوصات الشهرية
                        </button>
                        ` : ''}
                        ${this.hasTabAccess('analytics') ? `
                        <button class="fire-tab-btn" data-tab="analytics" onclick="FireEquipment.switchTab('analytics')">
                            <i class="fas fa-chart-line ml-2"></i>
                            تحليل البيانات
                        </button>
                        ` : ''}
                        ${this.hasTabAccess('approval-requests') ? `
                        <button class="fire-tab-btn" data-tab="approval-requests" onclick="FireEquipment.switchTab('approval-requests')">
                            <i class="fas fa-check-circle ml-2"></i>
                            طلبات الموافقة
                        </button>
                        ` : ''}
                    </div>
                </div>
                <div id="fire-tab-content">
                    <div id="fire-tab-database" class="fire-tab-content active">
                        ${loadingPlaceholder}
                    </div>
                    <div id="fire-tab-register" class="fire-tab-content" style="display: none;">
                        ${loadingPlaceholder}
                    </div>
                    <div id="fire-tab-inspections" class="fire-tab-content" style="display: none;">
                        ${loadingPlaceholder}
                    </div>
                    ${this.isAdmin() ? `
                    <div id="fire-tab-analytics" class="fire-tab-content" style="display: none;">
                        ${loadingPlaceholder}
                    </div>
                    <div id="fire-tab-approval-requests" class="fire-tab-content" style="display: none;">
                        ${loadingPlaceholder}
                    </div>
                    ` : ''}
                </div>
            `;
            this.applyModuleI18n(section);

            try {
                this.setupEventListeners();
            } catch (error) {
                Utils.safeWarn('⚠️ خطأ في setupEventListeners:', error);
            }

            setTimeout(async () => {
                try {
                    const checkAppState = () => {
                        return new Promise((resolve) => {
                            if (typeof AppState !== 'undefined' && AppState && AppState.appData) {
                                resolve();
                                return;
                            }

                            let attempts = 0;
                            const maxAttempts = 50;
                            const checkInterval = setInterval(() => {
                                attempts++;
                                if (typeof AppState !== 'undefined' && AppState && AppState.appData) {
                                    clearInterval(checkInterval);
                                    resolve();
                                } else if (attempts >= maxAttempts) {
                                    clearInterval(checkInterval);
                                    if (typeof AppState === 'undefined' || !AppState) AppState = {};
                                    if (!AppState.appData) AppState.appData = {};
                                    resolve();
                                }
                            }, 100);
                        });
                    };

                    await checkAppState();

                    let migrated = false;
                    try {
                        migrated = this.ensureData();
                    } catch (error) {
                        Utils.safeWarn('⚠️ خطأ في ensureData:', error);
                    }

                    if (migrated) {
                        try {
                            setTimeout(async () => {
                                try {
                                    await this.persistAll();
                                } catch (error) {
                                    Utils.safeWarn('⚠️ خطأ في persistAll:', error);
                                }
                            }, 0);
                        } catch (error) {
                            Utils.safeWarn('⚠️ خطأ في persistAll:', error);
                        }
                    }

                    const databaseTab = document.getElementById('fire-tab-database');
                    if (databaseTab) {
                        const renderWithTimeout = async (renderFn) => {
                            const timeoutWrapper = (promise, timeout, msg) => {
                                const timeoutPromise = new Promise((_, reject) => {
                                    setTimeout(() => reject(new Error(msg || 'Timeout')), timeout);
                                });
                                return Promise.race([promise, timeoutPromise]);
                            };
                            if (typeof Utils !== 'undefined' && Utils.promiseWithTimeout) {
                                return await Utils.promiseWithTimeout(renderFn(), 10000, 'Timeout: renderTabContent');
                            }
                            return await timeoutWrapper(renderFn(), 10000, 'Timeout: renderTabContent');
                        };
                        const fallbackDatabaseHtml = `
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">إجمالي الأجهزة</p><p class="text-2xl font-bold" id="fire-summary-total">0</p></div></div>
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">أجهزة فعّالة</p><p class="text-2xl font-bold text-green-600" id="fire-summary-active">0</p></div></div>
                                <div class="content-card"><div class="text-center"><p class="text-sm text-gray-500">بحاجة إلى متابعة</p><p class="text-2xl font-bold text-yellow-600" id="fire-summary-maintenance">0</p></div></div>
                            </div>
                            <div class="content-card mt-6"><div class="card-body"><div id="fire-assets-table" class="overflow-x-auto"><div class="empty-state"><p class="text-gray-500">لا توجد معدات مسجلة أو جاري التحميل.</p></div></div></div>
                        `;
                        try {
                            const databaseContent = await renderWithTimeout(() => this.renderTabContent('database'));
                            databaseTab.innerHTML = (databaseContent && databaseContent.trim()) ? databaseContent : fallbackDatabaseHtml;
                        } catch (error) {
                            Utils.safeWarn('⚠️ خطأ في تحميل محتوى قاعدة البيانات:', error);
                            databaseTab.innerHTML = fallbackDatabaseHtml;
                        }
                        try {
                            this.renderAssets();
                        } catch (renderError) {
                            Utils.safeWarn('⚠️ خطأ في renderAssets:', renderError);
                        }
                    }

                    // تحميل بيانات معدات الحريق من الخادم دائماً عند فتح الموديول (لضمان عرض أحدث البيانات حتى لو كانت محلياً فارغة أو قديمة)
                    if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                        this.loadFireEquipmentDataAsync()
                            .then(() => {
                                if (this.state.currentTab === 'database') {
                                    try {
                                        this.renderAssets();
                                    } catch (error) {
                                        Utils.safeWarn('⚠️ خطأ في تحديث renderAssets:', error);
                                    }
                                }
                                if (this.state.currentTab === 'register') {
                                    try {
                                        if (typeof this.refreshRegisterTable === 'function') {
                                            this.refreshRegisterTable();
                                        } else if (typeof this.refreshCurrentTab === 'function') {
                                            this.refreshCurrentTab();
                                        }
                                    } catch (err) {
                                        Utils.safeWarn('⚠️ خطأ في تحديث تبويب السجل:', err);
                                    }
                                }
                            })
                            .catch(error => {
                                Utils.safeWarn('⚠️ تعذر تحميل بيانات معدات الحريق:', error);
                                if (this.state.currentTab === 'database') {
                                    try {
                                        this.renderAssets();
                                    } catch (e) {
                                        Utils.safeWarn('⚠️ خطأ في renderAssets بعد فشل التحميل:', e);
                                    }
                                }
                            });
                    } else {
                        if (this.state.currentTab === 'database') {
                            try {
                                this.renderAssets();
                            } catch (error) {
                                Utils.safeWarn('⚠️ خطأ في renderAssets:', error);
                            }
                        }
                    }
                } catch (error) {
                    Utils.safeError('❌ خطأ في تحميل محتوى التبويبات:', error);
                }
            }, 0);
        } catch (error) {
            Utils.safeError('❌ خطأ في تحميل مديول معدات الحريق:', error);

            if (section) {
                section.innerHTML = `
                    <div class="fire-id-hero">
                        <div class="fire-id-hero__copy">
                            <div class="fire-id-hero__icon"><i class="fas fa-fire-extinguisher"></i></div>
                            <div>
                                <span class="fire-id-hero__eyebrow">منظومة السلامة والصحة المهنية — HSE</span>
                                <h1>سجل وفحص معدات الحريق</h1>
                            </div>
                        </div>
                        <div class="fire-id-hero__actions">
                            <button onclick="FireEquipment.load()" class="btn-secondary">
                                <i class="fas fa-redo ml-2"></i>
                                إعادة المحاولة
                            </button>
                        </div>
                    </div>
                    <div class="mt-6">
                        <div class="content-card">
                            <div class="card-body">
                                <div class="empty-state">
                                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                    <p class="text-gray-500 mb-2">حدث خطأ أثناء تحميل البيانات</p>
                                    <p class="text-sm text-gray-400 mb-4">${error && error.message ? Utils.escapeHTML(error.message) : 'خطأ غير معروف'}</p>
                                    <button onclick="FireEquipment.load()" class="btn-primary">
                                        <i class="fas fa-redo ml-2"></i>
                                        إعادة المحاولة
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                this.applyModuleI18n(section);
            }

            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('حدث خطأ أثناء تحميل معدات الحريق. يُرجى المحاولة مرة أخرى.', { duration: 3000 });
            }
        }
    },

    /**
     * التنقل بين التبويبات
     * @param {string} tabName - اسم التبويب ('database' أو 'register' أو 'inspections')
     */
    async switchTab(tabName) {
        // إذا كان التبويب المطلوب هو نفس التبويب الحالي، لا حاجة للتبديل
        if (this.state.currentTab === tabName) {
            return;
        }

        // التأكد من تهيئة البيانات - دائماً قبل أي عملية
        this.ensureData();

        // تحديث أزرار التبويبات
        document.querySelectorAll('.fire-tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // إخفاء جميع التبويبات
        document.querySelectorAll('.fire-tab-content').forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });

        // إظهار التبويب المطلوب
        const activeTab = document.getElementById(`fire-tab-${tabName}`);
        if (activeTab) {
            activeTab.style.display = 'block';
            activeTab.classList.add('active');
            
            // ✅ تحميل محتوى التبويب إذا كان placeholder (lazy loading)
            const hasPlaceholder = activeTab.innerHTML.includes('fire-tab-loading') || 
                                   activeTab.innerHTML.includes('جاري التحميل');
            if (hasPlaceholder) {
                // تحميل المحتوى بشكل async مع timeout protection
                try {
                    const renderWithTimeout = async (renderFn) => {
                        if (typeof Utils !== 'undefined' && Utils.promiseWithTimeout) {
                            return await Utils.promiseWithTimeout(
                                renderFn(),
                                10000, // 10 ثوان timeout لكل tab
                                'Timeout: renderTabContent took too long'
                            );
                        }
                        return await renderFn();
                    };
                    
                    const tabContent = await renderWithTimeout(() => this.renderTabContent(tabName));
                    activeTab.innerHTML = tabContent || '<div class="fire-tab-loading"><p>خطأ في تحميل المحتوى</p></div>';
                    this.applyModuleI18n(activeTab);
                } catch (error) {
                    Utils.safeWarn(`⚠️ خطأ في تحميل محتوى التبويب ${tabName}:`, error);
                    activeTab.innerHTML = '<div class="fire-tab-loading"><p>خطأ في تحميل المحتوى</p></div>';
                    this.applyModuleI18n(activeTab);
                }
            }
        } else {
            // إذا لم يكن التبويب موجوداً، إنشاؤه
            const contentContainer = document.getElementById('fire-tab-content');
            if (contentContainer) {
                const newTab = document.createElement('div');
                newTab.id = `fire-tab-${tabName}`;
                newTab.className = 'fire-tab-content active';
                
                // ✅ عرض placeholder أولاً
                const loadingPlaceholder = '<div class="fire-tab-loading"><div style="width: 300px; margin: 0 auto 16px;"><div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div></div></div><p>جاري التحميل...</p></div>';
                newTab.innerHTML = loadingPlaceholder;
                contentContainer.appendChild(newTab);
                
                    // ✅ تحميل المحتوى بشكل async مع timeout protection
                try {
                    // Fallback implementation if Utils.promiseWithTimeout is not available
                    const timeoutWrapper = (promise, timeout, message) => {
                        const timeoutPromise = new Promise((_, reject) => {
                            setTimeout(() => {
                                reject(new Error(message || `Timeout: العملية استغرقت أكثر من ${timeout}ms`));
                            }, timeout);
                        });
                        return Promise.race([promise, timeoutPromise]);
                    };
                    
                    const renderWithTimeout = async (renderFn) => {
                        if (typeof Utils !== 'undefined' && Utils.promiseWithTimeout) {
                            return await Utils.promiseWithTimeout(
                                renderFn(),
                                10000, // 10 ثوان timeout لكل tab
                                'Timeout: renderTabContent took too long'
                            );
                        }
                        // استخدام fallback implementation
                        return await timeoutWrapper(
                            renderFn(),
                            10000, // 10 ثوان timeout لكل tab
                            'Timeout: renderTabContent took too long'
                        );
                    };
                    
                    const tabContent = await renderWithTimeout(() => this.renderTabContent(tabName));
                    newTab.innerHTML = tabContent || '<div class="fire-tab-loading"><p>خطأ في تحميل المحتوى</p></div>';
                    this.applyModuleI18n(newTab);
                } catch (error) {
                    Utils.safeWarn(`⚠️ خطأ في تحميل محتوى التبويب ${tabName}:`, error);
                    newTab.innerHTML = '<div class="fire-tab-loading"><p>خطأ في تحميل المحتوى</p></div>';
                    this.applyModuleI18n(newTab);
                }
            }
        }

        // تحديث التبويب الحالي
        this.state.currentTab = tabName;

        // ✅ عرض الواجهة فوراً بالبيانات المتوفرة (مثل مديول العيادة)
        // هذا يضمن بقاء الواجهة ثابتة ومرئية أثناء التحميل
        if (tabName === 'database') {
            // عرض الواجهة فوراً بالبيانات المتوفرة
            this.renderAssets();
            
            // إذا لم تكن هناك بيانات محلية، تحميل من Backend في الخلفية وتحديث الواجهة
            const currentAssets = this.getAssets();
            if (!currentAssets || currentAssets.length === 0) {
                this.loadFireEquipmentDataAsync().then(() => {
                    if (this.state.currentTab === 'database') {
                        this.renderAssets();
                    }
                }).catch(error => {
                    Utils.safeWarn('⚠️ تعذر تحميل بيانات قاعدة البيانات:', error);
                });
            }
        } else if (tabName === 'register') {
            // عرض الواجهة فوراً بالبيانات المتوفرة
            await this.refreshRegisterTable();
            
            // إذا لم تكن هناك بيانات محلية، تحميل من Backend في الخلفية وتحديث الواجهة
            const currentAssets = this.getAssets();
            if (!currentAssets || currentAssets.length === 0) {
                this.loadFireEquipmentDataAsync().then(() => {
                    if (this.state.currentTab === 'register') {
                        this.refreshRegisterTable();
                    }
                }).catch(error => {
                    Utils.safeWarn('⚠️ تعذر تحميل بيانات السجل:', error);
                });
            }
        } else if (tabName === 'inspections') {
            // عرض الواجهة فوراً بالبيانات المتوفرة
            const monthlyInspections = this.getMonthlyInspections();
            const completedEl = document.getElementById('inspections-completed');
            const needsRepairEl = document.getElementById('inspections-needs-repair');
            const outOfServiceEl = document.getElementById('inspections-out-of-service');
            const totalEl = document.getElementById('inspections-total');

            if (completedEl) completedEl.textContent = monthlyInspections.completed;
            if (needsRepairEl) needsRepairEl.textContent = monthlyInspections.needsRepair;
            if (outOfServiceEl) outOfServiceEl.textContent = monthlyInspections.outOfService;
            if (totalEl) totalEl.textContent = monthlyInspections.total;

            const tableContainer = document.getElementById('monthly-inspections-table');
            if (tableContainer) {
                tableContainer.innerHTML = this.renderMonthlyInspectionsTable(monthlyInspections.list);
            }
            
            // إذا لم تكن هناك بيانات محلية، تحميل من Backend في الخلفية وتحديث الواجهة
            const currentInspections = this.getInspections();
            if (!currentInspections || currentInspections.length === 0) {
                this.loadFireEquipmentDataAsync().then(() => {
                    if (this.state.currentTab === 'inspections') {
                        const updatedInspections = this.getMonthlyInspections();
                        const completedEl = document.getElementById('inspections-completed');
                        const needsRepairEl = document.getElementById('inspections-needs-repair');
                        const outOfServiceEl = document.getElementById('inspections-out-of-service');
                        const totalEl = document.getElementById('inspections-total');
                        const tableContainer = document.getElementById('monthly-inspections-table');
                        
                        if (completedEl) completedEl.textContent = updatedInspections.completed;
                        if (needsRepairEl) needsRepairEl.textContent = updatedInspections.needsRepair;
                        if (outOfServiceEl) outOfServiceEl.textContent = updatedInspections.outOfService;
                        if (totalEl) totalEl.textContent = updatedInspections.total;
                        if (tableContainer) {
                            tableContainer.innerHTML = this.renderMonthlyInspectionsTable(updatedInspections.list);
                        }
                    }
                }).catch(error => {
                    Utils.safeWarn('⚠️ تعذر تحميل بيانات الفحوصات:', error);
                });
            }
        } else if (tabName === 'analytics') {
            const tabElement = document.getElementById('fire-tab-analytics');
            if (tabElement) {
                const content = await this.renderAnalyticsTab();
                tabElement.innerHTML = content;
                this._fireBindAnalyticsEvents();
                requestAnimationFrame(() => {
                    this.updateFireAnalyticsDashboard();
                });
            }
        } else if (tabName === 'approval-requests') {
            // عرض الواجهة فوراً بالبيانات المتوفرة
            const tabElement = document.getElementById('fire-tab-approval-requests');
            if (tabElement) {
                // تحميل المحتوى فوراً
                const content = await this.renderApprovalRequestsTab();
                tabElement.innerHTML = content;
                this.setupApprovalRequestsEventListeners();
                
                // إذا لم تكن هناك بيانات محلية، تحميل من Backend في الخلفية وتحديث الواجهة
                const currentRequests = this.getApprovalRequests();
                if (!currentRequests || currentRequests.length === 0) {
                    this.loadApprovalRequestsFromBackend().then(async () => {
                        if (this.state.currentTab === 'approval-requests') {
                            const updatedContent = await this.renderApprovalRequestsTab();
                            tabElement.innerHTML = updatedContent;
                            this.setupApprovalRequestsEventListeners();
                        }
                    }).catch(error => {
                        Utils.safeWarn('⚠️ تعذر تحميل طلبات الموافقة:', error);
                    });
                }
            }
        }

        // تهيئة الأحداث للتبويب النشط
        this.setupTabEventListeners(tabName);
    },

    /**
     * تحميل بيانات معدات الحريق بشكل غير متزامن
     */
    async loadFireEquipmentDataAsync() {
        try {
            const [equipmentResult, inspectionsResult, approvalRequestsResult] = await Promise.allSettled([
                GoogleIntegration.sendRequest({
                    // ✅ الأصول تُحفظ في FireEquipmentAssets (وليس FireEquipment القديم)
                    action: 'getAllFireEquipmentAssets',
                    data: {}
                }).catch(error => {
                    const errorMsg = error.message || error.toString() || '';
                    if (errorMsg.includes('انتهت مهلة الاتصال') || errorMsg.includes('timeout')) {
                        Utils.safeWarn('⚠️ انتهت مهلة الاتصال بالخادم');
                        return { success: false, data: [] };
                    }
                    Utils.safeWarn('⚠️ تعذر تحميل بيانات أصول معدات الحريق:', error);
                    return { success: false, data: [] };
                }),
                GoogleIntegration.sendRequest({
                    action: 'getAllFireEquipmentInspections',
                    data: {}
                }).catch(error => {
                    const errorMsg = error.message || error.toString() || '';
                    if (errorMsg.includes('انتهت مهلة الاتصال') || errorMsg.includes('timeout')) {
                        Utils.safeWarn('⚠️ انتهت مهلة الاتصال بالخادم');
                        return { success: false, data: [] };
                    }
                    Utils.safeWarn('⚠️ تعذر تحميل بيانات فحوصات معدات الحريق:', error);
                    return { success: false, data: [] };
                }),
                GoogleIntegration.sendRequest({
                    action: 'getFireEquipmentApprovalRequests',
                    data: {}
                }).catch(error => {
                    const errorMsg = error.message || error.toString() || '';
                    if (errorMsg.includes('انتهت مهلة الاتصال') || errorMsg.includes('timeout')) {
                        Utils.safeWarn('⚠️ انتهت مهلة الاتصال بالخادم');
                        return { success: false, data: [] };
                    }
                    Utils.safeWarn('⚠️ تعذر تحميل طلبات الموافقة:', error);
                    return { success: false, data: [] };
                })
            ]);

            // متغير لتتبع ما إذا تم تحديث البيانات
            let assetsUpdated = false;
            let inspectionsUpdated = false;

            // معالجة نتائج بيانات الأجهزة
            if (equipmentResult.status === 'fulfilled' && equipmentResult.value && equipmentResult.value.success && Array.isArray(equipmentResult.value.data)) {
                // التأكد من تهيئة المصفوفة قبل التحديث
                if (!AppState.appData.fireEquipmentAssets) {
                    AppState.appData.fireEquipmentAssets = [];
                }
                
                // دمج البيانات من Backend مع البيانات المحلية بدلاً من الاستبدال الكامل
                // هذا يضمن عدم فقدان البيانات الجديدة التي لم تُحفظ بعد
                const existingAssets = AppState.appData.fireEquipmentAssets || [];
                const backendAssets = equipmentResult.value.data;
                
                // إنشاء خريطة للأجهزة الموجودة باستخدام ID
                const existingMap = new Map();
                existingAssets.forEach(asset => {
                    if (asset.id) {
                        existingMap.set(asset.id, asset);
                    }
                });
                
                // دمج البيانات: البيانات من Backend لها الأولوية، لكن نحتفظ بالبيانات المحلية الجديدة
                backendAssets.forEach(backendAsset => {
                    if (backendAsset.id) {
                        existingMap.set(backendAsset.id, backendAsset);
                    }
                });
                
                // تحويل الخريطة إلى مصفوفة
                AppState.appData.fireEquipmentAssets = Array.from(existingMap.values());
                assetsUpdated = true;
                Utils.safeLog(`✅ تم تحميل ودمج ${equipmentResult.value.data.length} جهاز من Google Sheets (إجمالي: ${AppState.appData.fireEquipmentAssets.length})`);
            }

            // معالجة نتائج بيانات الفحوصات
            if (inspectionsResult.status === 'fulfilled' && inspectionsResult.value && inspectionsResult.value.success && Array.isArray(inspectionsResult.value.data)) {
                // إصلاح: حفظ البيانات في المكان الصحيح
                if (!AppState.appData.fireEquipmentInspections) {
                    AppState.appData.fireEquipmentInspections = [];
                }
                
                // دمج البيانات من Backend مع البيانات المحلية
                const existingInspections = AppState.appData.fireEquipmentInspections || [];
                const backendInspections = inspectionsResult.value.data;
                
                // إنشاء خريطة للفحوصات الموجودة باستخدام ID
                const existingMap = new Map();
                existingInspections.forEach(inspection => {
                    if (inspection.id) {
                        existingMap.set(inspection.id, inspection);
                    }
                });
                
                // دمج البيانات: البيانات من Backend لها الأولوية
                backendInspections.forEach(backendInspection => {
                    if (backendInspection.id) {
                        existingMap.set(backendInspection.id, backendInspection);
                    }
                });
                
                // تحويل الخريطة إلى مصفوفة
                AppState.appData.fireEquipmentInspections = Array.from(existingMap.values());
                inspectionsUpdated = true;
                Utils.safeLog(`✅ تم تحميل ودمج ${inspectionsResult.value.data.length} فحص من Google Sheets (إجمالي: ${AppState.appData.fireEquipmentInspections.length})`);
            }

            // معالجة نتائج طلبات الموافقة
            if (approvalRequestsResult.status === 'fulfilled' && approvalRequestsResult.value && approvalRequestsResult.value.success && Array.isArray(approvalRequestsResult.value.data)) {
                if (!AppState.appData.fireEquipmentApprovalRequests) {
                    AppState.appData.fireEquipmentApprovalRequests = [];
                }
                
                // دمج البيانات من Backend مع البيانات المحلية
                const existingRequests = AppState.appData.fireEquipmentApprovalRequests || [];
                const backendRequests = approvalRequestsResult.value.data;
                
                // إنشاء خريطة للطلبات الموجودة باستخدام ID
                const existingMap = new Map();
                existingRequests.forEach(request => {
                    if (request.id) {
                        existingMap.set(request.id, request);
                    }
                });
                
                // دمج البيانات: البيانات من Backend لها الأولوية
                backendRequests.forEach(backendRequest => {
                    if (backendRequest.id) {
                        existingMap.set(backendRequest.id, backendRequest);
                    }
                });
                
                // تحويل الخريطة إلى مصفوفة
                AppState.appData.fireEquipmentApprovalRequests = Array.from(existingMap.values());
                localStorage.setItem('fire_equipment_approval_requests', JSON.stringify(AppState.appData.fireEquipmentApprovalRequests));
                Utils.safeLog(`✅ تم تحميل ودمج ${approvalRequestsResult.value.data.length} طلب موافقة من Backend (إجمالي: ${AppState.appData.fireEquipmentApprovalRequests.length})`);
            }

            // تحديث الواجهة بناءً على التبويب الحالي (بعد تحميل جميع البيانات)
            // يتم التحديث مرة واحدة فقط لضمان الكفاءة
            // ملاحظة: التحقق من التبويب الحالي مهم لتجنب تحديث تبويب قد تم تبديله
            const currentTab = this.state.currentTab;
            
            // تحديث الواجهة بعد تحميل البيانات (ضمان عدم بقاء الواجهة فارغة)
            // إذا كان التبويب الحالي هو 'database'، قم بتحديث الواجهة دائماً
            if (currentTab === 'database') {
                // تحديث الواجهة دائماً لتضمن عرض البيانات المحملة (حتى لو كانت فارغة)
                // هذا يضمن عدم بقاء الواجهة فارغة بعد التحميل
                    this.renderAssets();
                } else if (currentTab === 'register' && (assetsUpdated || inspectionsUpdated)) {
                    // التحقق من أن التبويب لم يتغير أثناء التحميل
                    if (this.state.currentTab === 'register') {
                        // تحديث جدول السجل وكروت الإحصائيات بشكل موثوق بعد تحديث البيانات
                        // هذا يضمن عرض البيانات المحدثة فوراً
                        await this.refreshRegisterTable();
                    }
                } else if (currentTab === 'inspections' && inspectionsUpdated) {
                    // التحقق من أن التبويب لم يتغير أثناء التحميل
                    if (this.state.currentTab === 'inspections') {
                        // تحديث الواجهة إذا كان التبويب الحالي يتضمن الفحوصات
                        const inspections = this.getMonthlyInspections();
                        const completedEl = document.getElementById('inspections-completed');
                        const needsRepairEl = document.getElementById('inspections-needs-repair');
                        const outOfServiceEl = document.getElementById('inspections-out-of-service');
                        const totalEl = document.getElementById('inspections-total');
                        if (completedEl) completedEl.textContent = inspections.completed;
                        if (needsRepairEl) needsRepairEl.textContent = inspections.needsRepair;
                        if (outOfServiceEl) outOfServiceEl.textContent = inspections.outOfService;
                        if (totalEl) totalEl.textContent = inspections.total;
                        const tableContainer = document.getElementById('monthly-inspections-table');
                        if (tableContainer) {
                            tableContainer.innerHTML = this.renderMonthlyInspectionsTable(inspections.list);
                    }
                }
            }

            // حفظ البيانات محلياً
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }
        } catch (error) {
            const errorMsg = error.message || error.toString() || '';
            Utils.safeError('❌ خطأ في تحميل بيانات معدات الحريق من Google Sheets:', error);

            // عرض رسالة خطأ واضحة للمستخدم
            if (errorMsg.includes('انتهت مهلة الاتصال') || errorMsg.includes('timeout')) {
                Notification.warning({
                    title: 'الربط مع الخلفية',
                    message: 'انتهت مهلة الاتصال. سيتم استخدام البيانات المحلية.',
                    duration: 5000,
                    persistent: false
                });
            }
        }
    },

    /**
     * عرض محتوى التبويب بشكل متزامن مع حالة تحميل (لضمان عدم اختفاء الواجهة)
     * @param {string} tabName - اسم التبويب
     * @returns {string} HTML للمحتوى مع حالة تحميل
     */
    renderTabContentSync(tabName) {
        const loadingHTML = `
            <div class="fire-tab-loading">
                <div style="width: 300px; margin: 0 auto 16px;">
                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                    </div>
                </div>
                <p class="text-gray-500">جاري تحميل البيانات...</p>
            </div>
        `;

        if (tabName === 'database') {
            return `
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-database ml-2"></i>
                            قاعدة بيانات معدات الحريق
                        </h2>
                    </div>
                    <div class="card-body">
                        ${loadingHTML}
                        <div id="fire-assets-container" style="display: none;"></div>
                    </div>
                </div>
            `;
        } else if (tabName === 'register') {
            return loadingHTML;
        } else if (tabName === 'inspections') {
            return loadingHTML;
        } else if (tabName === 'analytics') {
            return loadingHTML;
        } else if (tabName === 'approval-requests') {
            return loadingHTML;
        }
        return loadingHTML;
    },

    /**
     * إخفاء حالة التحميل واستبدالها بالمحتوى الفعلي
     */
    async hideLoadingAndShowContent() {
        const activeTab = this.state.currentTab;
        const tabElement = document.getElementById(`fire-tab-${activeTab}`);
        
        if (tabElement) {
            // إخفاء حالة التحميل
            const loadingElement = tabElement.querySelector('.fire-tab-loading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            // تحميل المحتوى الفعلي للتبويب النشط
            try {
                const content = await this.renderTabContent(activeTab);
                if (content) {
                    // استبدال المحتوى مع الحفاظ على التبويب مرئياً
                    tabElement.innerHTML = content;
                    // إعادة تهيئة الأحداث
                    this.setupTabEventListeners(activeTab);
                }
            } catch (error) {
                Utils.safeWarn('⚠️ خطأ في تحميل محتوى التبويب:', error);
            }
        }
    },

    async renderTabContent(tabName) {
        if (tabName === 'database') {
            return await this.renderDatabaseTab();
        } else if (tabName === 'register') {
            return await this.renderRegisterTab();
        } else if (tabName === 'inspections') {
            return await this.renderInspectionsTab();
        } else if (tabName === 'analytics') {
            return await this.renderAnalyticsTab();
        } else if (tabName === 'approval-requests') {
            return await this.renderApprovalRequestsTab();
        }
        return '';
    },

    /**
     * عرض تبويب قاعدة بيانات معدات الحريق
     */
    async renderDatabaseTab() {
        // إرجاع HTML أولاً
        return `
            <div class="fire-stat-grid" id="fire-db-kpis">
                <div class="fire-stat fire-stat--blue">
                    <div class="fire-stat__icon"><i class="fas fa-fire-extinguisher"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">إجمالي الأجهزة</span>
                        <span class="fire-stat__value" id="fire-summary-total">0</span>
                        <span class="fire-stat__sub">جميع الأجهزة المسجلة</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" id="fire-bar-total" style="--fs-pct:0%"></span></div>
                </div>
                <div class="fire-stat fire-stat--green">
                    <div class="fire-stat__icon"><i class="fas fa-check-circle"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">أجهزة صالحة</span>
                        <span class="fire-stat__value" id="fire-summary-active">0</span>
                        <span class="fire-stat__sub">جاهزة للاستخدام الفوري</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" id="fire-bar-active" style="--fs-pct:0%"></span></div>
                </div>
                <div class="fire-stat fire-stat--amber">
                    <div class="fire-stat__icon"><i class="fas fa-tools"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">تحتاج صيانة</span>
                        <span class="fire-stat__value" id="fire-summary-maintenance">0</span>
                        <span class="fire-stat__sub">تتطلب متابعة وإصلاح</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" id="fire-bar-maintenance" style="--fs-pct:0%"></span></div>
                </div>
                <div class="fire-stat fire-stat--red">
                    <div class="fire-stat__icon"><i class="fas fa-ban"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">خارج الخدمة</span>
                        <span class="fire-stat__value" id="fire-summary-out">0</span>
                        <span class="fire-stat__sub">غير متاحة للاستخدام</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" id="fire-bar-out" style="--fs-pct:0%"></span></div>
                </div>
            </div>
            <div class="content-card fire-filter-card mt-6">
                <div class="card-header fire-filter-head">
                    <h2 class="card-title"><i class="fas fa-filter ml-2"></i>تصفية السجل</h2>
                    <button type="button" id="fire-clear-filters" class="btn-secondary fire-clear-btn">
                        <i class="fas fa-rotate-left ml-1"></i>
                        مسح الفلاتر
                    </button>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="form-label">بحث</label>
                            <input type="text" id="fire-assets-search" class="form-input" placeholder="رقم الجهاز، النوع، الموقع، المسؤول...">
                        </div>
                        <div>
                            <label class="form-label">النوع</label>
                            <select id="fire-assets-type" class="form-input fire-filter-select">
                                <option value="all">جميع الأنواع</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label">الحالة</label>
                            <select id="fire-assets-status" class="form-input fire-filter-select">
                                <option value="all">جميع الحالات</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label">الموقع</label>
                            <select id="fire-assets-location" class="form-input fire-filter-select">
                                <option value="all">جميع المواقع</option>
                            </select>
                        </div>
                    </div>
                    <div class="fire-filter-row">
                        <div class="fire-status-chips" id="fire-status-chips">
                            <button type="button" class="fire-chip active" data-status="all"><i class="fas fa-th-list"></i> الكل</button>
                            <button type="button" class="fire-chip fire-chip--green" data-status="صالح"><i class="fas fa-check-circle"></i> صالح</button>
                            <button type="button" class="fire-chip fire-chip--amber" data-status="يحتاج صيانة"><i class="fas fa-tools"></i> صيانة</button>
                            <button type="button" class="fire-chip fire-chip--red" data-status="خارج الخدمة"><i class="fas fa-ban"></i> خارج الخدمة</button>
                        </div>
                        <div class="fire-filter-results" id="fire-results-chip">
                            <i class="fas fa-chart-line ml-1"></i>
                            <span id="fire-results-text">-</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-6">
                <div class="content-card xl:col-span-2">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-database ml-2"></i>قاعدة بيانات معدات الحريق</h2>
                    </div>
                    <div class="card-body" id="fire-assets-table"></div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title"><i class="fas fa-history ml-2"></i>أحدث الفحوصات</h2>
                    </div>
                    <div class="card-body" id="fire-recent-inspections"></div>
                </div>
            </div>
        `;
    },

    /**
     * عرض كروت الإحصائيات لتبويب السجل
     */
    renderRegisterStatisticsCards() {
        const stats = this.getRegisterStatistics();
        const pct = (v) => stats.total ? Math.round((Number(v) || 0) / stats.total * 100) : 0;
        
        return `
            <div class="fire-stat-grid">
                <div class="fire-stat fire-stat--blue">
                    <div class="fire-stat__icon"><i class="fas fa-fire-extinguisher"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">إجمالي الأجهزة</span>
                        <span class="fire-stat__value" id="register-stat-total">${stats.total}</span>
                        <span class="fire-stat__sub">جميع المعدات المسجلة في النظام</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${pct(stats.total)}%"></span></div>
                </div>

                <div class="fire-stat fire-stat--green">
                    <div class="fire-stat__icon"><i class="fas fa-check-circle"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">الأجهزة الصالحة</span>
                        <span class="fire-stat__value" id="register-stat-operational">${stats.operational}</span>
                        <span class="fire-stat__sub">جاهزة للاستخدام الفوري</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${pct(stats.operational)}%"></span></div>
                </div>

                <div class="fire-stat fire-stat--amber">
                    <div class="fire-stat__icon"><i class="fas fa-tools"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">تحتاج صيانة</span>
                        <span class="fire-stat__value" id="register-stat-needs-maintenance">${stats.needsMaintenance}</span>
                        <span class="fire-stat__sub">تتطلب متابعة وإصلاح</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${pct(stats.needsMaintenance)}%"></span></div>
                </div>

                <div class="fire-stat fire-stat--red">
                    <div class="fire-stat__icon"><i class="fas fa-ban"></i></div>
                    <div class="fire-stat__body">
                        <span class="fire-stat__label">خارج الخدمة</span>
                        <span class="fire-stat__value" id="register-stat-out-of-service">${stats.outOfService}</span>
                        <span class="fire-stat__sub">غير متاحة للاستخدام</span>
                    </div>
                    <div class="fire-stat__bar"><span class="fire-stat__bar-fill" style="--fs-pct:${pct(stats.outOfService)}%"></span></div>
                </div>
            </div>
        `;
    },

    /**
     * تحديث كروت الإحصائيات
     * هذه الدالة آمنة للاستدعاء حتى لو لم تكن الكروت موجودة في DOM
     */
    updateRegisterStatisticsCards() {
        // التأكد من تهيئة البيانات قبل الحساب
        this.ensureData();
        
        const stats = this.getRegisterStatistics();
        
        const totalEl = document.getElementById('register-stat-total');
        const operationalEl = document.getElementById('register-stat-operational');
        const needsMaintenanceEl = document.getElementById('register-stat-needs-maintenance');
        const outOfServiceEl = document.getElementById('register-stat-out-of-service');
        
        // تحديث القيم فقط إذا كانت العناصر موجودة في DOM
        if (totalEl) totalEl.textContent = stats.total;
        if (operationalEl) operationalEl.textContent = stats.operational;
        if (needsMaintenanceEl) needsMaintenanceEl.textContent = stats.needsMaintenance;
        if (outOfServiceEl) outOfServiceEl.textContent = stats.outOfService;
    },

    /**
     * عرض تبويب سجل معدات الاطفاء والانذار
     * يعرض البيانات مباشرة إذا كانت موجودة، وإلا يعرض حالة تحميل
     */
    async renderRegisterTab() {
        // التأكد من تهيئة البيانات قبل العرض
        this.ensureData();
        
        // التحقق من وجود البيانات - إذا كانت موجودة، عرضها مباشرة
        const assets = this.getAssets();
        const hasData = assets && assets.length > 0;
        
        // تحديد محتوى الجدول بناءً على وجود البيانات
        let tableContent = '';
        if (hasData) {
            // إذا كانت البيانات موجودة، عرضها مباشرة
            tableContent = this.renderRegisterTable();
        } else {
            // إذا لم تكن البيانات موجودة، عرض حالة تحميل
            tableContent = `
                <div class="empty-state">
                    <div style="width: 300px; margin: 0 auto 16px;">
                        <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                        </div>
                    </div>
                    <p class="text-gray-500">جاري تحميل البيانات...</p>
                </div>
            `;
        }
        
        return `
            ${this.renderRegisterStatisticsCards()}
            <div class="content-card">
                <div class="card-header flex items-center justify-between flex-wrap gap-3">
                    <h2 class="card-title">
                        <i class="fas fa-clipboard-list ml-2"></i>
                        سجل معدات الاطفاء والانذار
                    </h2>
                    <div class="flex items-center gap-2 flex-wrap">
                        <button id="register-import-excel-btn" class="btn-secondary">
                            <i class="fas fa-file-import ml-2"></i>
                            استيراد من Excel
                        </button>
                        <button id="register-export-excel-btn" class="btn-secondary">
                            <i class="fas fa-file-excel ml-2"></i>
                            تصدير إلى Excel
                        </button>
                        <button id="register-export-pdf-btn" class="btn-secondary">
                            <i class="fas fa-file-pdf ml-2"></i>
                            تصدير إلى PDF
                        </button>
                        <button id="register-batch-print-qr-btn" class="btn-secondary" title="طباعة ملصقات QR لجميع الأجهزة دفعة واحدة">
                            <i class="fas fa-print ml-2"></i>
                            طباعة كروت QR
                        </button>
                        <button id="register-add-device-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            إضافة جهاز جديد
                        </button>
                    </div>
                </div>
                <div class="card-body" id="fire-register-table">
                    ${tableContent}
                </div>
            </div>
        `;
    },

    /**
     * عرض جدول سجل معدات الاطفاء والانذار
     */
    renderRegisterTable() {
        const assets = this.getAssets();

        if (!assets || assets.length === 0) {
            return '<div class="empty-state"><p class="text-gray-500">لا توجد معدات مسجلة بعد، قم بإضافة جهاز جديد لبدء المتابعة.</p></div>';
        }

        const rows = assets.map(asset => {
            const statusBadge = this.getStatusBadge(asset.status);
            const manufacturingYear = asset.manufacturingYear || '-';

            return `
                <tr>
                    <td>${Utils.escapeHTML(asset.factoryName || asset.factory || '-')}</td>
                    <td>${Utils.escapeHTML(asset.subLocationName || asset.subLocation || '-')}</td>
                    <td>${Utils.escapeHTML(asset.location || '-')}</td>
                    <td>${Utils.escapeHTML(asset.type || '-')}</td>
                    <td>${Utils.escapeHTML(asset.capacity || asset.capacityKg || '-')}</td>
                    <td>${Utils.escapeHTML(asset.siteNumber || asset.number || '-')}</td>
                    <td>${Utils.escapeHTML(asset.manufacturer || '-')}</td>
                    <td>${Utils.escapeHTML(manufacturingYear)}</td>
                    <td>${Utils.escapeHTML(asset.serialNumber || '-')}</td>
                    <td>${statusBadge}</td>
                    <td style="word-wrap: break-word; max-width: 120px;">${Utils.escapeHTML(asset.installationMethod || '-')}</td>
                    <td>
                        <div class="flex flex-wrap gap-2" style="min-width: 150px;">
                            <button class="btn-icon btn-icon-primary" data-action="view-details" data-id="${asset.id}" title="عرض التفاصيل">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon btn-icon-secondary" data-action="print-qr" data-id="${asset.id}" title="طباعة QR">
                                <i class="fas fa-qrcode"></i>
                            </button>
                            ${this.canEdit() ? `
                            <button class="btn-icon btn-icon-warning" data-action="edit-device" data-id="${asset.id}" title="تعديل">
                                <i class="fas fa-edit"></i>
                            </button>
                            ` : ''}
                            ${this.canDelete() ? `
                            <button class="btn-icon btn-icon-danger" data-action="delete-device" data-id="${asset.id}" title="حذف">
                                <i class="fas fa-trash"></i>
                            </button>
                            ` : ''}
                        </div>
                    </td>
                    <td style="word-wrap: break-word; max-width: 200px; white-space: normal;">${Utils.escapeHTML(asset.notes || '-')}</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="table-wrapper fire-register-table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; overflow-y: auto; max-height: 70vh; position: relative;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 100px;">المصنع</th>
                            <th style="min-width: 120px;">الموقع الفرعي</th>
                            <th style="min-width: 150px;">مكان / موقع الجهاز</th>
                            <th style="min-width: 100px;">نوع الجهاز</th>
                            <th style="min-width: 80px;">السعة / كجم</th>
                            <th style="min-width: 120px;">رقم الجهاز بالموقع</th>
                            <th style="min-width: 120px;">الشركة المصنعة</th>
                            <th style="min-width: 80px;">سنة الصنع</th>
                            <th style="min-width: 120px;">رقم مسلسل الجهاز</th>
                            <th style="min-width: 100px;">حالة الجهاز</th>
                            <th style="min-width: 100px;">طريقة تثبيت</th>
                            <th style="min-width: 150px;">الإجراء</th>
                            <th style="min-width: 150px; word-wrap: break-word;">ملاحظات</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                    <tfoot style="display: none;"></tfoot>
                </table>
            </div>
        `;
    },

    /**
     * عرض تبويب الفحوصات الشهرية مع نظام المراجعة والاعتماد
     */
    async renderInspectionsTab() {
        this.ensureData();
        
        const allInspections = this.getInspections() || [];
        const pendingCount = allInspections.filter(i => String(i.approvalStatus || '').toLowerCase() === 'pending' || (!i.approvalStatus && i.submittedBy && String(i.submittedBy).includes('Public'))).length;
        const approvedCount = allInspections.filter(i => String(i.approvalStatus || '').toLowerCase() === 'approved').length;
        const rejectedCount = allInspections.filter(i => String(i.approvalStatus || '').toLowerCase() === 'rejected').length;
        const needsRepairCount = allInspections.filter(i => i.status === 'يحتاج صيانة').length;
        const outOfServiceCount = allInspections.filter(i => i.status === 'خارج الخدمة').length;

        const currentFilter = this.state.inspectionApprovalFilter || 'all';
        let displayList = allInspections;
        if (currentFilter === 'pending') {
            displayList = allInspections.filter(i => String(i.approvalStatus || '').toLowerCase() === 'pending' || (!i.approvalStatus && i.submittedBy && String(i.submittedBy).includes('Public')));
        } else if (currentFilter === 'approved') {
            displayList = allInspections.filter(i => String(i.approvalStatus || '').toLowerCase() === 'approved' || i.status === 'صالح');
        } else if (currentFilter === 'needsRepair') {
            displayList = allInspections.filter(i => i.status === 'يحتاج صيانة');
        } else if (currentFilter === 'outOfService') {
            displayList = allInspections.filter(i => i.status === 'خارج الخدمة' || String(i.approvalStatus || '').toLowerCase() === 'rejected');
        }

        return `
            <div class="flex flex-col sm:flex-row gap-3 items-center justify-between mb-5">
                <div>
                    <h3 class="text-xl font-bold text-gray-800" style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-clipboard-check text-red-600"></i>
                        <span>الفحوصات الشهرية لمعدات الإطفاء</span>
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">متابعة واعتماد الفحوصات الميدانية المسجلة عبر البوابة ورموز الـ QR</p>
                </div>
                <div class="flex gap-2 w-full sm:w-auto">
                    <button id="mobile-scan-qr-btn" class="btn-primary" style="padding: 0.75rem 1.25rem; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; border-radius: 10px;">
                        <i class="fas fa-qrcode"></i>
                        <span>مسح QR للفحص</span>
                    </button>
                    <button class="btn-secondary" onclick="FireEquipment.showPublicLinkModal()" style="padding: 0.75rem 1.25rem; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; border-radius: 10px;">
                        <i class="fas fa-share-alt text-blue-500"></i>
                        <span>بوابة الفحص العام</span>
                    </button>
                </div>
            </div>

            <!-- كروت الإحصائيات الأربعة المنمقة على نمط مديول التدريب -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <!-- 1. إجمالي الفحوصات -->
                <div class="content-card fire-kpi-card" style="background: #ffffff; border-radius: 16px; border: 1.5px solid ${currentFilter === 'all' ? '#3b82f6' : '#e2e8f0'}; padding: 18px 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.03); cursor: pointer; transition: all 0.25s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px rgba(59,130,246,0.12)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 14px rgba(0,0,0,0.03)';" onclick="FireEquipment.filterInspectionsByApproval('all')">
                    <div class="flex items-center justify-between">
                        <div>
                            <p style="font-size: 0.82rem; font-weight: 700; color: #64748b; margin: 0 0 4px 0;">إجمالي الفحوصات</p>
                            <h3 id="inspections-total" style="font-size: 1.85rem; font-weight: 800; color: #1e293b; margin: 0; line-height: 1.1;">${allInspections.length}</h3>
                            <div style="display: flex; align-items: center; gap: 4px; margin-top: 6px;">
                                <span style="font-size: 0.72rem; color: #3b82f6; font-weight: 600;">سجل الفحص الميداني</span>
                            </div>
                        </div>
                        <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border: 1px solid #bfdbfe; box-shadow: 0 4px 10px rgba(37,99,235,0.12);">
                            <i class="fas fa-clipboard-list"></i>
                        </div>
                    </div>
                </div>

                <!-- 2. صالح -->
                <div class="content-card fire-kpi-card" style="background: #ffffff; border-radius: 16px; border: 1.5px solid ${currentFilter === 'approved' ? '#10b981' : '#e2e8f0'}; padding: 18px 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.03); cursor: pointer; transition: all 0.25s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px rgba(16,185,129,0.12)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 14px rgba(0,0,0,0.03)';" onclick="FireEquipment.filterInspectionsByApproval('approved')">
                    <div class="flex items-center justify-between">
                        <div>
                            <p style="font-size: 0.82rem; font-weight: 700; color: #047857; margin: 0 0 4px 0;">صالح للعمل</p>
                            <h3 id="inspections-completed" style="font-size: 1.85rem; font-weight: 800; color: #065f46; margin: 0; line-height: 1.1;">${approvedCount || allInspections.filter(i=>i.status==='صالح').length}</h3>
                            <div style="display: flex; align-items: center; gap: 4px; margin-top: 6px;">
                                <span style="font-size: 0.72rem; color: #10b981; font-weight: 600;">جاهزة ومطابقة للمواصفات</span>
                            </div>
                        </div>
                        <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); color: #059669; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border: 1px solid #bbf7d0; box-shadow: 0 4px 10px rgba(5,150,105,0.12);">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </div>
                </div>

                <!-- 3. يحتاج صيانة -->
                <div class="content-card fire-kpi-card" style="background: #ffffff; border-radius: 16px; border: 1.5px solid ${currentFilter === 'needsRepair' ? '#f59e0b' : '#e2e8f0'}; padding: 18px 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.03); cursor: pointer; transition: all 0.25s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px rgba(245,158,11,0.12)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 14px rgba(0,0,0,0.03)';" onclick="FireEquipment.filterInspectionsByApproval('needsRepair')">
                    <div class="flex items-center justify-between">
                        <div>
                            <p style="font-size: 0.82rem; font-weight: 700; color: #b45309; margin: 0 0 4px 0;">يحتاج صيانة</p>
                            <h3 id="inspections-needs-repair" style="font-size: 1.85rem; font-weight: 800; color: #92400e; margin: 0; line-height: 1.1;">${needsRepairCount}</h3>
                            <div style="display: flex; align-items: center; gap: 4px; margin-top: 6px;">
                                <span style="font-size: 0.72rem; color: #d97706; font-weight: 600;">تتطلب ضغط أو صيانة</span>
                            </div>
                        </div>
                        <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); color: #d97706; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border: 1px solid #fde68a; box-shadow: 0 4px 10px rgba(217,119,6,0.12);">
                            <i class="fas fa-tools"></i>
                        </div>
                    </div>
                </div>

                <!-- 4. خارج الخدمة -->
                <div class="content-card fire-kpi-card" style="background: #ffffff; border-radius: 16px; border: 1.5px solid ${currentFilter === 'outOfService' ? '#ef4444' : '#e2e8f0'}; padding: 18px 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.03); cursor: pointer; transition: all 0.25s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px rgba(239,68,68,0.12)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 14px rgba(0,0,0,0.03)';" onclick="FireEquipment.filterInspectionsByApproval('outOfService')">
                    <div class="flex items-center justify-between">
                        <div>
                            <p style="font-size: 0.82rem; font-weight: 700; color: #b91c1c; margin: 0 0 4px 0;">خارج الخدمة</p>
                            <h3 id="inspections-out-of-service" style="font-size: 1.85rem; font-weight: 800; color: #991b1b; margin: 0; line-height: 1.1;">${outOfServiceCount}</h3>
                            <div style="display: flex; align-items: center; gap: 4px; margin-top: 6px;">
                                <span style="font-size: 0.72rem; color: #ef4444; font-weight: 600;">معطلة أو غير صالحة</span>
                            </div>
                        </div>
                        <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border: 1px solid #fecaca; box-shadow: 0 4px 10px rgba(220,38,38,0.12);">
                            <i class="fas fa-ban"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- شريط حالة الاعتماد والتصفية السريعة -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn ${currentFilter === 'all' ? 'btn-primary' : 'btn-secondary'}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px;" onclick="FireEquipment.filterInspectionsByApproval('all')">
                        الكل (${allInspections.length})
                    </button>
                    <button class="btn ${currentFilter === 'pending' ? 'btn-primary' : 'btn-secondary'}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px; ${currentFilter === 'pending' ? 'background:#d97706; border-color:#d97706;' : ''}" onclick="FireEquipment.filterInspectionsByApproval('pending')">
                        ⏳ بانتظار الاعتماد (${pendingCount})
                    </button>
                    <button class="btn ${currentFilter === 'approved' ? 'btn-primary' : 'btn-secondary'}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px;" onclick="FireEquipment.filterInspectionsByApproval('approved')">
                        ✅ المعتمدة (${approvedCount})
                    </button>
                    <button class="btn ${currentFilter === 'needsRepair' ? 'btn-primary' : 'btn-secondary'}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px;" onclick="FireEquipment.filterInspectionsByApproval('needsRepair')">
                        🟡 تحتاج صيانة (${needsRepairCount})
                    </button>
                    <button class="btn ${currentFilter === 'outOfService' ? 'btn-primary' : 'btn-secondary'}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 20px;" onclick="FireEquipment.filterInspectionsByApproval('outOfService')">
                        🔴 خارج الخدمة (${outOfServiceCount})
                    </button>
                </div>
            </div>

            <div class="content-card">
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                    <h2 class="card-title">
                        <i class="fas fa-clipboard-list ml-2"></i>
                        سجل الفحوصات الشهرية
                    </h2>
                    <span class="text-xs text-gray-500">عدد الفحوصات المعروضة: ${displayList.length}</span>
                </div>
                <div class="card-body" id="monthly-inspections-table">
                    ${this.renderMonthlyInspectionsTable(displayList)}
                </div>
            </div>
        `;
    },

    /**
     * فلترة الفحوصات حسب حالة الاعتماد
     */
    async filterInspectionsByApproval(filterType) {
        this.state.inspectionApprovalFilter = filterType;
        const container = document.getElementById('fire-tab-content');
        if (container) {
            container.innerHTML = await this.renderInspectionsTab();
            this.setupEventListeners();
        }
    },

    /**
     * تحديث جدول السجل بشكل موثوق
     * هذه الدالة مسؤولة عن تحديث الجدول والكروت الإحصائية بالبيانات الحالية من AppState
     * يتم استدعاؤها دائماً بعد استبدال innerHTML في switchTab() أو عند تحديث البيانات
     */
    async refreshRegisterTable() {
        // التأكد من تهيئة البيانات - خطوة مهمة جداً
        this.ensureData();
        
        // تحديث كروت الإحصائيات أولاً (يتم التحقق من وجود العناصر داخل الدالة)
        this.updateRegisterStatisticsCards();
        
        const tableContainer = document.getElementById('fire-register-table');
        if (!tableContainer) {
            // إذا لم يكن الجدول موجوداً في DOM، لا حاجة للتحديث
            // قد يحدث هذا إذا لم يتم تحميل التبويب بعد أو كان التبويب مختلف
            return;
        }
        
        // الحصول على البيانات الحالية من AppState
        const assets = this.getAssets();
        
        // تحديث محتوى الجدول بناءً على البيانات الموجودة
        if (!assets || assets.length === 0) {
            // إذا لم تكن هناك بيانات، عرض رسالة واضحة
            tableContainer.innerHTML = '<div class="empty-state"><p class="text-gray-500">لا توجد معدات مسجلة بعد، قم بإضافة جهاز جديد لبدء المتابعة.</p></div>';
        } else {
            // إذا كانت هناك بيانات، عرض الجدول
            tableContainer.innerHTML = this.renderRegisterTable();
            // إعادة تعيين eventsBound لأن innerHTML تم استبداله
            tableContainer.dataset.eventsBound = 'false';
            // ربط الأحداث بعد عرض الجدول
            this.bindRegisterTableEvents(tableContainer);
        }
    },

    /**
     * تحديث التبويب الحالي
     */
    async refreshCurrentTab(skipSync = false) {
        // ✅ skipSync: إذا كان true، لا يتم إعادة تحميل البيانات من Backend
        // هذا مهم بعد الحذف لمنع إعادة الجهاز المحذوف
        
        if (this.state.currentTab === 'database') {
            this.renderAssets();
        } else if (this.state.currentTab === 'register') {
            // تحديث الكروت الإحصائية والجدول
            // ملاحظة: updateRegisterStatisticsCards() يتم استدعاؤها داخل refreshRegisterTable()
            await this.refreshRegisterTable();
        } else if (this.state.currentTab === 'inspections') {
            // تحديث تبويب الفحوصات الشهرية
            const inspections = this.getMonthlyInspections();

            // تحديث الإحصائيات
            const completedEl = document.getElementById('inspections-completed');
            const needsRepairEl = document.getElementById('inspections-needs-repair');
            const outOfServiceEl = document.getElementById('inspections-out-of-service');
            const totalEl = document.getElementById('inspections-total');

            if (completedEl) completedEl.textContent = inspections.completed;
            if (needsRepairEl) needsRepairEl.textContent = inspections.needsRepair;
            if (outOfServiceEl) outOfServiceEl.textContent = inspections.outOfService;
            if (totalEl) totalEl.textContent = inspections.total;

            // تحديث الجدول
            const tableContainer = document.getElementById('monthly-inspections-table');
            if (tableContainer) {
                tableContainer.innerHTML = this.renderMonthlyInspectionsTable(inspections.list);
            }
        } else {
            // تحديث كلا التبويبين
            this.renderAssets();
        }
        
        // ✅ إذا كان skipSync = true، لا نعيد تحميل البيانات من Backend
        // هذا يمنع إعادة الجهاز المحذوف بعد الحذف
    },

    /**
     * الحصول على الفحوصات الشهرية
     */
    getMonthlyInspections() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const monthlyInspections = this.getInspections().filter(inspection => {
            const inspectionDate = new Date(inspection.checkDate || inspection.createdAt);
            return inspectionDate >= startOfMonth && inspectionDate <= endOfMonth;
        }).sort((a, b) => {
            const dateA = new Date(a.checkDate || a.createdAt);
            const dateB = new Date(b.checkDate || b.createdAt);
            return dateB - dateA;
        });

        return {
            list: monthlyInspections,
            total: monthlyInspections.length,
            completed: monthlyInspections.filter(i => i.status === 'صالح').length,
            needsRepair: monthlyInspections.filter(i => i.status === 'يحتاج صيانة').length,
            outOfService: monthlyInspections.filter(i => i.status === 'خارج الخدمة').length
        };
    },

    /**
     * عرض شارة حالة الاعتماد
     */
    getApprovalBadge(status, submittedBy) {
        const s = String(status || '').toLowerCase();
        if (s === 'approved') {
            return `<span class="badge" style="background:#dcfce7; color:#166534; border:1px solid #bbf7d0; font-weight:700; padding:3px 8px; border-radius:6px; font-size:0.8rem;"><i class="fas fa-check-circle ml-1 text-emerald-600"></i> معتمد</span>`;
        } else if (s === 'rejected') {
            return `<span class="badge" style="background:#fee2e2; color:#991b1b; border:1px solid #fecaca; font-weight:700; padding:3px 8px; border-radius:6px; font-size:0.8rem;"><i class="fas fa-times-circle ml-1 text-red-600"></i> مرفوض</span>`;
        } else {
            return `<span class="badge" style="background:#fef3c7; color:#92400e; border:1px solid #fde68a; font-weight:700; padding:3px 8px; border-radius:6px; font-size:0.8rem;"><i class="fas fa-clock ml-1 text-amber-600"></i> قيد المراجعة</span>`;
        }
    },

    /**
     * عرض جدول الفحوصات الشهرية
     */
    renderMonthlyInspectionsTable(inspections) {
        if (!inspections || inspections.length === 0) {
            return '<div class="empty-state" style="padding: 30px; text-align: center;"><i class="fas fa-clipboard-check text-4xl text-gray-300 mb-2"></i><p class="text-gray-500">لا توجد فحوصات مسجلة تطابق التحديد</p></div>';
        }

        const rows = inspections.map(inspection => {
            const asset = this.getAssets().find(a => a.id === inspection.assetId);
            const assetLabel = asset ? `${asset.number || asset.id} - ${asset.location || ''}` : inspection.assetId;
            const statusBadge = this.getStatusBadge(inspection.status);
            const approvalBadge = this.getApprovalBadge(inspection.approvalStatus, inspection.submittedBy);
            const checkDate = inspection.checkDate ? Utils.formatDate(inspection.checkDate) : '-';
            const isPending = String(inspection.approvalStatus || '').toLowerCase() === 'pending' || (!inspection.approvalStatus && inspection.submittedBy && String(inspection.submittedBy).includes('Public'));

            return `
                <tr>
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(assetLabel)}</div>
                        <div class="text-xs text-gray-400" style="direction: ltr; text-align: right;">ID: ${Utils.escapeHTML(inspection.assetId || '-')}</div>
                    </td>
                    <td>${checkDate}</td>
                    <td>
                        <div class="font-medium text-gray-800">${Utils.escapeHTML(inspection.inspector || '-')}</div>
                        ${inspection.submittedBy ? `<div class="text-xs text-gray-400">بوابة عامة</div>` : ''}
                    </td>
                    <td>${statusBadge}</td>
                    <td>${approvalBadge}</td>
                    <td style="word-wrap: break-word; max-width: 180px; white-space: normal; font-size: 0.85rem;">
                        ${Utils.escapeHTML(inspection.remarks || '-')}
                    </td>
                    <td>
                        <div style="display: flex; gap: 4px; align-items: center;">
                            <button class="btn-icon btn-icon-primary" onclick="FireEquipment.viewInspection('${inspection.id}')" title="عرض التفاصيل الكاملة">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${isPending ? `
                                <button class="btn-icon" style="color: #16a34a; background: #f0fdf4; border: 1px solid #bbf7d0;" onclick="FireEquipment.approveInspection('${inspection.id}')" title="اعتماد الفحص وتحديث السجل">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn-icon" style="color: #dc2626; background: #fef2f2; border: 1px solid #fecaca;" onclick="FireEquipment.rejectInspection('${inspection.id}')" title="رفض الفحص الميداني">
                                    <i class="fas fa-times"></i>
                                </button>
                            ` : ''}
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        return `
            <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 150px;">الجهاز</th>
                            <th style="min-width: 110px;">تاريخ الفحص</th>
                            <th style="min-width: 130px;">المفتش</th>
                            <th style="min-width: 100px;">الحالة الفنية</th>
                            <th style="min-width: 110px;">حالة الاعتماد</th>
                            <th style="min-width: 160px; word-wrap: break-word;">الملاحظات</th>
                            <th style="min-width: 120px;">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    },

    /**
     * عرض تفاصيل فحص مع إجراءات الاعتماد
     */
    viewInspection(inspectionId) {
        const inspection = this.getInspections().find(i => i.id === inspectionId);
        if (!inspection) {
            Notification.error('لم يتم العثور على بيانات الفحص');
            return;
        }

        const asset = this.getAssets().find(a => a.id === inspection.assetId);
        const assetLabel = asset ? `${asset.number || asset.id} - ${asset.location || ''}` : inspection.assetId;
        const isPending = String(inspection.approvalStatus || '').toLowerCase() === 'pending' || (!inspection.approvalStatus && inspection.submittedBy && String(inspection.submittedBy).includes('Public'));

        // معالجة المرفقات
        let attachmentsList = [];
        if (inspection.attachments) {
            try {
                attachmentsList = typeof inspection.attachments === 'string' ? JSON.parse(inspection.attachments) : inspection.attachments;
            } catch(e) {}
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay fire-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 720px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #ffffff; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(220, 38, 38, 0.2); border: 1px solid rgba(220, 38, 38, 0.4); display: flex; align-items: center; justify-content: center; color: #f87171;">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 2px 0;">تفاصيل الفحص الشهري</h2>
                            <p style="font-size: 0.8rem; color: #94a3b8; margin: 0;">كود الفحص: ${Utils.escapeHTML(inspection.id)}</p>
                        </div>
                    </div>
                    <button class="modal-close" style="color: #94a3b8; font-size: 1.25rem;" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 22px; background: #f8fafc;">
                    <!-- شريط حالة الاعتماد -->
                    <div style="display: flex; align-items: center; justify-content: space-between; background: #ffffff; padding: 12px 16px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
                        <span style="font-weight: 700; color: #334155; font-size: 0.9rem;">حالة اعتماد الفحص:</span>
                        <div>${this.getApprovalBadge(inspection.approvalStatus, inspection.submittedBy)}</div>
                    </div>

                    <div class="space-y-4" style="background: #ffffff; padding: 18px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs font-semibold text-gray-500">الجهاز والموقع:</label>
                                <p class="text-gray-900 font-bold mt-1">${Utils.escapeHTML(assetLabel)}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">كود الأصل (DeviceID):</label>
                                <p class="text-gray-900 font-bold mt-1" style="direction: ltr; text-align: right;">${Utils.escapeHTML(inspection.assetId || '-')}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">تاريخ الفحص:</label>
                                <p class="text-gray-800 mt-1">${inspection.checkDate ? Utils.formatDate(inspection.checkDate) : '-'}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">مسؤول / مفتش السلامة:</label>
                                <p class="text-gray-800 font-bold mt-1">${Utils.escapeHTML(inspection.inspector || '-')}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">الحالة التشغيلية للجهاز:</label>
                                <p class="mt-1">${this.getStatusBadge(inspection.status)}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">مؤشر عداد الضغط:</label>
                                <p class="text-gray-800 mt-1">${Utils.escapeHTML(inspection.gaugeReading || 'سليم')}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">صمام وتيلة الأمان:</label>
                                <p class="text-gray-800 font-bold mt-1">${Utils.escapeHTML(inspection.sealIntact === true ? 'سليم' : inspection.sealIntact === false ? 'مكسور' : (inspection.sealIntact || 'سليم'))}</p>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-gray-500">الخرطوم والقاذف / جسم الأسطوانة:</label>
                                <p class="text-gray-800 mt-1">${Utils.escapeHTML(inspection.hoseCondition || inspection.bodyCondition || 'سليم')}</p>
                            </div>
                        </div>

                        ${inspection.remarks ? `
                        <div style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
                            <label class="text-xs font-semibold text-gray-500">الملاحظات الميدانية:</label>
                            <p class="text-gray-800 mt-1 bg-gray-50 p-2 rounded">${Utils.escapeHTML(inspection.remarks)}</p>
                        </div>` : ''}

                        ${inspection.actions ? `
                        <div style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
                            <label class="text-xs font-semibold text-gray-500">الإجراءات المتخذة:</label>
                            <p class="text-gray-800 mt-1 bg-gray-50 p-2 rounded">${Utils.escapeHTML(inspection.actions)}</p>
                        </div>` : ''}

                        <!-- بيانات التدقيق والاعتماد -->
                        ${inspection.approvedBy ? `
                        <div style="border-top: 1px solid #dcfce7; background: #f0fdf4; padding: 10px 14px; border-radius: 8px; margin-top: 10px;">
                            <span class="text-xs font-bold text-green-800">✅ تم الاعتماد بواسطة:</span>
                            <span class="text-xs text-green-900 font-bold mr-1">${Utils.escapeHTML(inspection.approvedBy)}</span>
                            ${inspection.approvedAt ? `<span class="text-xs text-green-700">بتاريخ (${Utils.formatDate(inspection.approvedAt)})</span>` : ''}
                        </div>` : ''}

                        ${inspection.rejectedBy ? `
                        <div style="border-top: 1px solid #fee2e2; background: #fef2f2; padding: 10px 14px; border-radius: 8px; margin-top: 10px;">
                            <span class="text-xs font-bold text-red-800">❌ تم الرفض بواسطة:</span>
                            <span class="text-xs text-red-900 font-bold mr-1">${Utils.escapeHTML(inspection.rejectedBy)}</span>
                            <p class="text-xs text-red-700 mt-1">السبب: ${Utils.escapeHTML(inspection.reviewNotes || '-')}</p>
                        </div>` : ''}

                        <!-- معاينة الصورة المرفقة إن وُجدت -->
                        ${attachmentsList && attachmentsList.length > 0 ? `
                        <div style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
                            <label class="text-xs font-semibold text-gray-500 mb-2 block">الصورة المرفقة من الفحص الميداني:</label>
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${attachmentsList.map(att => `
                                    <a href="${att.url}" target="_blank" style="display: inline-block; border: 1.5px solid #cbd5e1; border-radius: 8px; overflow: hidden; max-width: 200px;">
                                        <img src="${att.url}" alt="صورة الفحص" style="max-width: 100%; max-height: 140px; display: block;">
                                    </a>
                                `).join('')}
                            </div>
                        </div>` : ''}
                    </div>
                </div>
                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; gap: 8px;">
                        ${isPending ? `
                            <button type="button" class="btn-primary" style="background: #16a34a; display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px;" onclick="FireEquipment.approveInspection('${inspection.id}', this)">
                                <i class="fas fa-check"></i> اعتماد وتحديث سجل الطفاية
                            </button>
                            <button type="button" class="btn-danger" style="background: #dc2626; color:#ffffff; display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; border:none;" onclick="FireEquipment.rejectInspection('${inspection.id}', this)">
                                <i class="fas fa-times"></i> رفض الفحص
                            </button>
                        ` : ''}
                    </div>
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    },

    /**
     * اعتماد الفحص الشهري وتحديث سجل الطفاية فورياً مع المزامنة في الخلفية
     */
    async approveInspection(inspectionId, btnEl) {
        if (!confirm('هل أنت متأكد من اعتماد نتيجة هذا الفحص وتحديث السجل الرسمي للطفاية؟')) {
            return;
        }

        try {
            const currentUser = AppState.currentUser || {};
            const approverName = currentUser.name || currentUser.fullName || currentUser.userName || 'مدير النظام';
            const nowIso = new Date().toISOString();

            // 1. تحديث فوري محلي في الذاكرة (Optimistic Update)
            const inspections = this.getInspections() || [];
            const insp = inspections.find(i => i.id === inspectionId);
            if (insp) {
                insp.approvalStatus = 'approved';
                insp.approvedBy = approverName;
                insp.approvedAt = nowIso;
                insp.reviewNotes = 'تم الاعتماد الميداني';

                // تحديث سجل الأصل المرتبط فوراً
                if (insp.assetId) {
                    const assets = this.getAssets() || [];
                    const asset = assets.find(a => a.id === insp.assetId);
                    if (asset) {
                        asset.status = insp.status || 'صالح';
                        asset.lastInspection = insp.checkDate || nowIso.split('T')[0];
                        var nextDate = new Date(insp.checkDate || Date.now());
                        nextDate.setMonth(nextDate.getMonth() + 1);
                        asset.nextInspection = nextDate.toISOString().split('T')[0];
                        asset.updatedAt = nowIso;
                    }
                }
            }

            // حفظ التغيير محلياً فوراً
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            // إغلاق نافذة المعاينة فوراً
            document.querySelectorAll('.modal-overlay.fire-modal').forEach(m => m.remove());

            // إعادة رسم الجدول والكروت فوراً
            await this.refreshCurrentTab(true);

            // إشعار فوري بنجاح الاعتماد
            if (typeof Notification !== 'undefined') {
                Notification.success('✅ تم اعتماد الفحص وتحديث سجل جهاز الإطفاء فوراً');
            }

            // 2. إرسال المزامنة للسيرفر في الخلفية بدون حظر الواجهة (Background Sync)
            if (typeof GoogleIntegration !== 'undefined' && AppState.googleConfig?.appsScript?.enabled) {
                GoogleIntegration.sendRequest({
                    action: 'approveFireEquipmentInspection',
                    data: {
                        inspectionId: inspectionId,
                        approverData: {
                            name: approverName,
                            id: currentUser.id || currentUser.userId || '',
                            role: currentUser.role || 'admin'
                        },
                        reviewNotes: 'تم الاعتماد الميداني'
                    }
                }).then(res => {
                    Utils.safeLog('✅ Backend inspection approval sync complete:', res);
                }).catch(err => {
                    Utils.safeWarn('⚠️ Background approval sync notice (saved locally):', err);
                });
            }
        } catch (err) {
            Utils.safeError('Error in approveInspection:', err);
            if (typeof Notification !== 'undefined') {
                Notification.error('حدث خطأ: ' + err.message);
            }
        }
    },

    /**
     * رفض الفحص الشهري مع كتابة السبب فورياً مع المزامنة في الخلفية
     */
    async rejectInspection(inspectionId, btnEl) {
        const reason = prompt('يرجى كتابة سبب رفض هذا الفحص الميداني (أو طلب إعادة الفحص):');
        if (reason === null) return;

        try {
            const currentUser = AppState.currentUser || {};
            const approverName = currentUser.name || currentUser.fullName || currentUser.userName || 'مدير النظام';
            const nowIso = new Date().toISOString();

            // 1. تحديث فوري محلي في الذاكرة (Optimistic Update)
            const inspections = this.getInspections() || [];
            const insp = inspections.find(i => i.id === inspectionId);
            if (insp) {
                insp.approvalStatus = 'rejected';
                insp.rejectedBy = approverName;
                insp.rejectedAt = nowIso;
                insp.reviewNotes = reason || 'مرفوض - يلزم إعادة الفحص';
            }

            // حفظ التغيير محلياً فوراً
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            // إغلاق نافذة المعاينة فوراً
            document.querySelectorAll('.modal-overlay.fire-modal').forEach(m => m.remove());

            // إعادة رسم الجدول والكروت فوراً
            await this.refreshCurrentTab(true);

            // إشعار فوري
            if (typeof Notification !== 'undefined') {
                Notification.success('✅ تم توثيق رفض الفحص الميداني فوراً');
            }

            // 2. إرسال المزامنة للسيرفر في الخلفية بدون حظر الواجهة (Background Sync)
            if (typeof GoogleIntegration !== 'undefined' && AppState.googleConfig?.appsScript?.enabled) {
                GoogleIntegration.sendRequest({
                    action: 'rejectFireEquipmentInspection',
                    data: {
                        inspectionId: inspectionId,
                        approverData: {
                            name: approverName,
                            id: currentUser.id || currentUser.userId || '',
                            role: currentUser.role || 'admin'
                        },
                        reason: reason || 'مرفوض - يلزم إعادة الفحص'
                    }
                }).then(res => {
                    Utils.safeLog('✅ Backend inspection rejection sync complete:', res);
                }).catch(err => {
                    Utils.safeWarn('⚠️ Background rejection sync notice (saved locally):', err);
                });
            }
        } catch (err) {
            Utils.safeError('Error in rejectInspection:', err);
            if (typeof Notification !== 'undefined') {
                Notification.error('حدث خطأ: ' + err.message);
            }
        }
    },

    /**
     * تحميل الأجهزة مباشرة من Backend
     */
    async loadAssetsFromBackend() {
        try {
            if (!GoogleIntegration || !AppState.googleConfig?.appsScript?.enabled) {
                Utils.safeWarn('⚠️ Backend غير متاح - استخدام البيانات المحلية');
                return;
            }

            // التأكد من تهيئة البيانات قبل التحميل
            this.ensureData();

            Utils.safeLog('🔄 تحميل أجهزة الحريق من Backend...');

            const result = await GoogleIntegration.sendRequest({
                action: 'getAllFireEquipmentAssets',
                data: {}
            });

            if (result && result.success && Array.isArray(result.data)) {
                // دمج البيانات من Backend مع البيانات المحلية بدلاً من الاستبدال الكامل
                // هذا يضمن عدم فقدان البيانات الجديدة التي لم تُحفظ بعد
                const existingAssets = AppState.appData.fireEquipmentAssets || [];
                const backendAssets = result.data;
                
                // إنشاء خريطة للأجهزة الموجودة باستخدام ID
                const existingMap = new Map();
                existingAssets.forEach(asset => {
                    if (asset.id) {
                        existingMap.set(asset.id, asset);
                    }
                });
                
                // دمج البيانات: البيانات من Backend لها الأولوية، لكن نحتفظ بالبيانات المحلية الجديدة
                backendAssets.forEach(backendAsset => {
                    if (backendAsset.id) {
                        existingMap.set(backendAsset.id, backendAsset);
                    }
                });
                
                // تحويل الخريطة إلى مصفوفة
                AppState.appData.fireEquipmentAssets = Array.from(existingMap.values());

                // حفظ محلياً
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }

                Utils.safeLog(`✅ تم تحميل ودمج ${result.data.length} جهاز من Backend (إجمالي: ${AppState.appData.fireEquipmentAssets.length})`);
            } else {
                Utils.safeWarn('⚠️ فشل تحميل البيانات من Backend:', result?.message);
                // في حالة الفشل، البيانات المحلية تبقى في AppState
            }
        } catch (error) {
            Utils.safeError('❌ خطأ في تحميل البيانات من Backend:', error);
            // في حالة الخطأ، البيانات المحلية تبقى في AppState
        }
    },

    ensureData() {
        if (typeof AppState === 'undefined') AppState = {};
        if (!AppState.appData) AppState.appData = {};
        const data = AppState.appData;
        let migrated = false;

        if (!Array.isArray(data.fireEquipmentAssets)) {
            data.fireEquipmentAssets = [];
        }
        if (!Array.isArray(data.fireEquipmentInspections)) {
            data.fireEquipmentInspections = [];
        }
        // نقل الفحوصات من الموقع القديم (fireEquipment) إلى الجديد (fireEquipmentInspections)
        // إذا كانت fireEquipment تحتوي على فحوصات (لها assetId و checkDate)
        if (Array.isArray(data.fireEquipment) && data.fireEquipment.length > 0) {
            const inspectionsToMigrate = data.fireEquipment.filter(entry => 
                entry.assetId && (entry.checkDate || entry.createdAt)
            );
            
            if (inspectionsToMigrate.length > 0) {
                // نقل الفحوصات إلى الموقع الصحيح
                inspectionsToMigrate.forEach(inspection => {
                    const exists = data.fireEquipmentInspections.some(i => i.id === inspection.id);
                    if (!exists) {
                        data.fireEquipmentInspections.push({
                            id: inspection.id || Utils.generateId('FEI'),
                            assetId: inspection.assetId,
                            checkDate: inspection.checkDate || inspection.createdAt,
                            inspector: inspection.inspector || '',
                            status: inspection.status || 'صالح',
                            gaugeReading: inspection.gaugeReading || '',
                            sealIntact: typeof inspection.sealIntact === 'boolean' ? inspection.sealIntact : null,
                            remarks: inspection.remarks || inspection.notes || '',
                            actions: inspection.actions || '',
                            createdAt: inspection.createdAt || new Date().toISOString(),
                            updatedAt: inspection.updatedAt || new Date().toISOString()
                        });
                    }
                });
                migrated = true;
            }
        }

        // معالجة البيانات الجديدة من fireEquipment (بعد المزامنة)
        if (
            Array.isArray(data.fireEquipment) &&
            data.fireEquipment.length > 0
        ) {
            // إنشاء خرائط من البيانات الموجودة لتجنب التكرار
            const existingAssetsMap = new Map();
            const existingInspectionsMap = new Map();

            data.fireEquipmentAssets.forEach(asset => {
                if (asset.id) existingAssetsMap.set(asset.id, asset);
                if (asset.number) existingAssetsMap.set(asset.number.toLowerCase(), asset);
            });

            data.fireEquipmentInspections.forEach(inspection => {
                if (inspection.id) existingInspectionsMap.set(inspection.id, inspection);
            });

            const numberMap = new Map();
            const idMap = new Map();
            const statusMap = {
                'صالح': 'صالح',
                'يحتاج إصلاح': 'يحتاج صيانة',
                'معطل': 'خارج الخدمة'
            };

            data.fireEquipment.forEach(entry => {
                const rawNumber = String(entry.equipmentNumber || entry.number || '').trim();
                const key = rawNumber.toLowerCase();
                let asset = key ? numberMap.get(key) : null;

                // التحقق من البيانات الموجودة أولاً
                if (!asset && key) {
                    asset = existingAssetsMap.get(key);
                }

                // معالجة assetId
                let entryAssetId = entry.assetId ? String(entry.assetId) : null;

                // تحويل IDs القديمة (FEA_...) إلى التنسيق الجديد (EFA-XXXX)
                if (entryAssetId && entryAssetId.startsWith('FEA_')) {
                    // إذا كان لدينا ID قديم، نتجاهله ونطلب توليد جديد
                    // إلا إذا كان مسجلاً بالفعل في النظام بتنسيق جديد
                    const existingWithOldId = existingAssetsMap.get(entryAssetId);
                    if (existingWithOldId && existingWithOldId.id.match(/^EFA-\d{4}$/)) {
                        entryAssetId = existingWithOldId.id; // استخدم الجديد الموجود
                    } else {
                        entryAssetId = null; // سيتم توليد جديد بالأسفل
                    }
                }

                if (!asset && entryAssetId) {
                    asset = existingAssetsMap.get(entryAssetId);
                }

                if (!asset) {
                    // توليد ID جديد بالتنسيق القياسي EFA-XXXX
                    const assetId = entryAssetId && entryAssetId.match(/^EFA-\d{4}$/)
                        ? entryAssetId
                        : this.generateFireDeviceID();

                    const qrData = this.generateQrData(assetId);
                    const status = statusMap[entry.status] || entry.status || 'صالح';

                    asset = {
                        id: assetId,
                        number: rawNumber || assetId,
                        type: entry.equipmentType || '',
                        location: entry.location || '',
                        manufacturer: entry.manufacturer || '',
                        model: entry.model || '',
                        capacity: entry.capacity || '',
                        installationDate: entry.installationDate || '',
                        lastServiceDate: entry.checkDate || entry.lastServiceDate || '',
                        status,
                        responsible: entry.inspector || '',
                        notes: entry.notes || '',
                        qrCodeData: qrData,
                        createdAt: entry.createdAt || new Date().toISOString(),
                        updatedAt: entry.updatedAt || new Date().toISOString()
                    };

                    if (key) {
                        numberMap.set(key, asset);
                    }
                    idMap.set(asset.id, asset);
                } else {
                    // تحديث البيانات الموجودة
                    if (entry.equipmentType) asset.type = entry.equipmentType;
                    if (entry.location) asset.location = entry.location;
                    if (entry.manufacturer) asset.manufacturer = entry.manufacturer;
                    if (entry.model) asset.model = entry.model;
                    if (entry.capacity) asset.capacity = entry.capacity;
                    if (entry.installationDate) asset.installationDate = entry.installationDate;
                    if (entry.checkDate || entry.lastServiceDate) asset.lastServiceDate = entry.checkDate || entry.lastServiceDate;
                    if (entry.status) asset.status = statusMap[entry.status] || entry.status;
                    if (entry.inspector) asset.responsible = entry.inspector;
                    if (entry.notes) asset.notes = entry.notes;
                    if (entry.updatedAt) asset.updatedAt = entry.updatedAt;

                    idMap.set(asset.id, asset);
                }

                const baseId = entry.id ? String(entry.id) : Utils.generateId('FEI');
                const inspectionId = baseId.startsWith('FEI') ? baseId : baseId.replace(/^FIRE_EQUIP/, 'FEI');
                const inspectionDate = entry.checkDate || entry.createdAt || new Date().toISOString();
                const inspectionStatus = statusMap[entry.status] || entry.status || 'صالح';

                // التحقق من وجود الفحص مسبقاً
                let inspection = existingInspectionsMap.get(inspectionId);
                if (!inspection) {
                    inspection = {
                        id: inspectionId,
                        assetId: asset.id,
                        checkDate: inspectionDate,
                        inspector: entry.inspector || asset.responsible || '',
                        status: inspectionStatus,
                        gaugeReading: entry.gaugeReading || '',
                        sealIntact: typeof entry.sealIntact === 'boolean' ? entry.sealIntact : null,
                        remarks: entry.notes || '',
                        actions: entry.actions || '',
                        createdAt: entry.createdAt || inspectionDate,
                        updatedAt: entry.updatedAt || inspectionDate
                    };
                    data.fireEquipmentInspections.push(inspection);
                } else {
                    // تحديث الفحص الموجود
                    if (entry.checkDate) inspection.checkDate = entry.checkDate;
                    if (entry.inspector) inspection.inspector = entry.inspector;
                    if (entry.status) inspection.status = statusMap[entry.status] || entry.status;
                    if (entry.gaugeReading !== undefined) inspection.gaugeReading = entry.gaugeReading;
                    if (typeof entry.sealIntact === 'boolean') inspection.sealIntact = entry.sealIntact;
                    if (entry.notes) inspection.remarks = entry.notes;
                    if (entry.actions) inspection.actions = entry.actions;
                    if (entry.updatedAt) inspection.updatedAt = entry.updatedAt;
                }
            });

            // دمج الأصول الجديدة مع الموجودة
            const mergedAssets = [...data.fireEquipmentAssets];
            idMap.forEach((asset, id) => {
                const existingIndex = mergedAssets.findIndex(a => a.id === id);
                if (existingIndex >= 0) {
                    mergedAssets[existingIndex] = asset;
                } else {
                    mergedAssets.push(asset);
                }
            });

            data.fireEquipmentAssets = mergedAssets;
            data.fireEquipment = [];
            migrated = true;
        }

        return migrated;
    },

    getAssets() {
        return Array.isArray(AppState.appData.fireEquipmentAssets)
            ? AppState.appData.fireEquipmentAssets
            : [];
    },

    /**
     * الحصول على إحصائيات الأجهزة
     */
    getRegisterStatistics() {
        const assets = this.getAssets();
        
        return {
            total: assets.length,
            operational: assets.filter(a => a.status === 'صالح').length,
            needsMaintenance: assets.filter(a => a.status === 'يحتاج صيانة').length,
            outOfService: assets.filter(a => a.status === 'خارج الخدمة').length
        };
    },

    getInspections() {
        // دعم التوافق مع البيانات القديمة والجديدة
        const inspections = Array.isArray(AppState.appData.fireEquipmentInspections)
            ? AppState.appData.fireEquipmentInspections
            : [];
        
        // إذا كانت البيانات محفوظة في المكان القديم، نقلها
        if (inspections.length === 0 && Array.isArray(AppState.appData.fireEquipment) && AppState.appData.fireEquipment.length > 0) {
            AppState.appData.fireEquipmentInspections = AppState.appData.fireEquipment;
            // الاحتفاظ بنسخة احتياطية مؤقتة
            return AppState.appData.fireEquipment;
        }
        
        return inspections;
    },

    async renderAssets() {
        this.refreshFilterOptions();
        this.renderSummary();

        const assets = this.getFilteredAssets();
        const tableContainer = document.getElementById('fire-assets-table');
        if (tableContainer) {
            tableContainer.innerHTML = this.renderAssetsTable(assets);
            this.bindTableEvents(tableContainer);
        }

        const recentContainer = document.getElementById('fire-recent-inspections');
        if (recentContainer) {
            recentContainer.innerHTML = this.renderRecentInspections();
        }
    },

    refreshFilterOptions() {
        const assets = this.getAssets();
        const typeSelect = document.getElementById('fire-assets-type');
        const statusSelect = document.getElementById('fire-assets-status');
        const locationSelect = document.getElementById('fire-assets-location');

        if (typeSelect) {
            const current = this.state.filters.type;
            const types = Array.from(new Set(assets.map(asset => asset.type).filter(Boolean)));
            typeSelect.innerHTML = [
                '<option value="all">جميع الأنواع</option>',
                ...types.map(type => `<option value="${Utils.escapeHTML(type)}">${Utils.escapeHTML(type)} (${assets.filter(a => a.type === type).length})</option>`)
            ].join('');
            typeSelect.value = types.includes(current) ? current : 'all';
            this.state.filters.type = typeSelect.value;
        }

        if (statusSelect) {
            const current = this.state.filters.status;
            statusSelect.innerHTML = [
                '<option value="all">جميع الحالات</option>',
                ...this.statusOptions.map(option => `<option value="${option.value}">${option.label} (${assets.filter(a => a.status === option.value).length})</option>`)
            ].join('');
            statusSelect.value = this.statusOptions.some(option => option.value === current) ? current : 'all';
            this.state.filters.status = statusSelect.value;
        }

        if (locationSelect) {
            const current = this.state.filters.location;
            const locations = Array.from(new Set(assets.map(asset => asset.location).filter(Boolean)));
            locationSelect.innerHTML = [
                '<option value="all">جميع المواقع</option>',
                ...locations.map(location => `<option value="${Utils.escapeHTML(location)}">${Utils.escapeHTML(location)} (${assets.filter(a => a.location === location).length})</option>`)
            ].join('');
            locationSelect.value = locations.includes(current) ? current : 'all';
            this.state.filters.location = locationSelect.value;
        }
    },

    renderSummary() {
        const all = this.getAssets();
        const filtered = this.getFilteredAssets();
        const stats = this.getAssetStatsForList(filtered);
        const base = Math.max(filtered.length, 1);

        const setBar = (id, v) => {
            const bar = document.getElementById(id);
            if (bar) bar.style.setProperty('--fs-pct', `${Math.round((Number(v) || 0) / base * 100)}%`);
        };

        const totalEl = document.getElementById('fire-summary-total');
        const activeEl = document.getElementById('fire-summary-active');
        const maintenanceEl = document.getElementById('fire-summary-maintenance');
        const outEl = document.getElementById('fire-summary-out');
        if (totalEl) totalEl.textContent = filtered.length;
        if (activeEl) activeEl.textContent = stats.active;
        if (maintenanceEl) maintenanceEl.textContent = stats.needsMaintenance;
        if (outEl) outEl.textContent = stats.outOfService;
        setBar('fire-bar-total', filtered.length);
        setBar('fire-bar-active', stats.active);
        setBar('fire-bar-maintenance', stats.needsMaintenance);
        setBar('fire-bar-out', stats.outOfService);

        // ✅ تفاعلية: شارة النتائج + شريحة الحالة النشطة + زر مسح الفلاتر
        const hasFilter = !!(this.state.filters.search || this.state.filters.type !== 'all' || this.state.filters.status !== 'all' || this.state.filters.location !== 'all');
        const resultsText = document.getElementById('fire-results-text');
        if (resultsText) {
            resultsText.textContent = hasFilter ? `${filtered.length} من أصل ${all.length} جهاز` : `عرض ${filtered.length} جهاز`;
        }
        const resultsChip = document.getElementById('fire-results-chip');
        if (resultsChip) resultsChip.classList.toggle('is-filtered', hasFilter);
        const clearBtn = document.getElementById('fire-clear-filters');
        if (clearBtn) clearBtn.classList.toggle('visible', hasFilter);
        document.querySelectorAll('#fire-status-chips .fire-chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.status === (this.state.filters.status || 'all'));
        });
    },

    getAssetStatsForList(list) {
        list = list || [];
        const total = list.length;
        const active = list.filter(asset => asset.status === 'صالح').length;
        const needsMaintenance = list.filter(asset => asset.status === 'يحتاج صيانة').length;
        const outOfService = list.filter(asset => asset.status === 'خارج الخدمة').length;
        return { total, active, needsMaintenance, outOfService };
    },

    renderAssetsTable(assets) {
        if (!assets.length) {
            return '<div class="empty-state"><p class="text-gray-500">لا توجد معدات مسجلة بعد، قم بإضافة جهاز جديد لبدء المتابعة.</p></div>';
        }

        const rows = assets.map(asset => {
            const latest = this.getLatestInspection(asset.id);
            const lastCheck = latest ? Utils.formatDate(latest.checkDate) : '-';
            const statusBadge = this.getStatusBadge(asset.status);

            return `
                <tr>
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(asset.number || '-')}</div>
                        <div class="text-xs text-gray-400">${Utils.escapeHTML(asset.model || '')}</div>
                    </td>
                    <td>${Utils.escapeHTML(asset.type || '')}</td>
                    <td>${Utils.escapeHTML(asset.location || '')}</td>
                    <td>${statusBadge}</td>
                    <td>${lastCheck}</td>
                    <td>
                        <div class="flex flex-wrap gap-2">
                            <button class="btn-icon btn-icon-primary" data-action="view" data-id="${asset.id}" title="عرض التفاصيل">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon btn-icon-secondary" data-action="qr" data-id="${asset.id}" title="طباعة QR Code">
                                <i class="fas fa-qrcode"></i>
                            </button>
                            ${this.canEdit() ? `
                            <button class="btn-icon btn-icon-warning" data-action="edit" data-id="${asset.id}" title="تعديل الجهاز">
                                <i class="fas fa-edit"></i>
                            </button>
                            ` : ''}
                            ${this.canDelete() ? `
                            <button class="btn-icon btn-icon-danger" data-action="delete" data-id="${asset.id}" title="حذف الجهاز">
                                <i class="fas fa-trash"></i>
                            </button>
                            ` : ''}
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        return `
            <div class="table-wrapper fire-assets-table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; overflow-y: auto; max-height: 70vh; position: relative;">
                <table class="data-table table-header-red" style="width: 100%; min-width: 100%; table-layout: auto;">
                    <thead>
                        <tr>
                            <th style="min-width: 120px;">رقم الجهاز</th>
                            <th style="min-width: 100px;">النوع</th>
                            <th style="min-width: 150px;">الموقع</th>
                            <th style="min-width: 100px;">الحالة</th>
                            <th style="min-width: 120px;">آخر فحص</th>
                            <th style="min-width: 150px;">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    },

    renderRecentInspections() {
        const inspections = this.getInspections()
            .slice()
            .sort((a, b) => new Date(b.checkDate || b.createdAt || 0) - new Date(a.checkDate || a.createdAt || 0))
            .slice(0, 6);

        if (!inspections.length) {
            return '<div class="empty-state"><p class="text-gray-500">لا توجد فحوصات مسجلة مؤخراً.</p></div>';
        }

        const items = inspections.map(inspection => {
            const asset = this.getAssets().find(item => item.id === inspection.assetId);
            const assetLabel = asset ? asset.number : inspection.assetId;
            return `
                <div class="border-b border-gray-100 py-3 last:border-b-0">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="font-semibold text-gray-800">${Utils.escapeHTML(assetLabel || '-')}</p>
                            <p class="text-xs text-gray-500">${Utils.formatDate(inspection.checkDate)}</p>
                        </div>
                        <div>${this.getStatusBadge(inspection.status)}</div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">المفتش: ${Utils.escapeHTML(inspection.inspector || '-')}</p>
                </div>
            `;
        }).join('');

        return `<div class="divide-y divide-gray-100">${items}</div>`;
    },

    getStatusBadge(status) {
        const normalized = status || '';
        let badgeClass = 'badge-info';
        if (normalized === 'صالح') badgeClass = 'badge-success';
        else if (normalized === 'يحتاج صيانة') badgeClass = 'badge-warning';
        else if (normalized === 'خارج الخدمة') badgeClass = 'badge-danger';
        return `<span class="badge ${badgeClass}">${Utils.escapeHTML(normalized || '-')}</span>`;
    },

    bindTableEvents(container) {
        if (!container || container.dataset.eventsBound === 'true') {
            return;
        }

        container.addEventListener('click', async event => {
            const target = event.target.closest('[data-action]');
            if (!target) return;

            event.preventDefault();
            const action = target.dataset.action;
            const id = target.dataset.id;

            switch (action) {
                case 'view':
                    this.viewAsset(id);
                    break;
                case 'qr':
                    this.printQr(id);
                    break;
                case 'edit':
                    await this.showAssetForm(this.getAssets().find(asset => asset.id === id) || null);
                    break;
                case 'delete':
                    await this.deleteAsset(id);
                    break;
                default:
                    break;
            }
        });

        container.dataset.eventsBound = 'true';
    },

    setupEventListeners() {
        // الأزرار العامة (موجودة في جميع التبويبات)
        const addAssetBtn = document.getElementById('add-fire-asset-btn');
        if (addAssetBtn) {
            addAssetBtn.addEventListener('click', async () => await this.showAssetForm());
        }

        const publicLinkBtn = document.getElementById('public-fire-link-btn');
        if (publicLinkBtn) {
            publicLinkBtn.addEventListener('click', () => this.showPublicLinkModal());
        }

        const batchPrintBtn = document.getElementById('batch-print-qr-btn');
        if (batchPrintBtn) {
            batchPrintBtn.addEventListener('click', () => this.showBatchPrintQrModal());
        }

        const scanQrBtn = document.getElementById('scan-qr-inspection-btn');
        if (scanQrBtn) {
            scanQrBtn.addEventListener('click', () => this.startQRScan());
        }

        // زر مسح QR للموبايل
        const mobileScanBtn = document.getElementById('mobile-scan-qr-btn');
        if (mobileScanBtn) {
            mobileScanBtn.addEventListener('click', () => this.startQRScan());
        }

        const refreshBtn = document.getElementById('refresh-fire-equipment-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', async () => {
                try {
                    // إظهار حالة التحميل على الزر
                    const originalHtml = refreshBtn.innerHTML;
                    refreshBtn.disabled = true;
                    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري التحديث...';
                    
                    // تحميل البيانات من الخادم
                    await this.loadFireEquipmentDataAsync();
                    
                    // تحديث التبويب الحالي
                    await this.refreshCurrentTab();
                    
                    // إرجاع حالة الزر
                    refreshBtn.disabled = false;
                    refreshBtn.innerHTML = originalHtml;
                    
                    if (typeof Notification !== 'undefined') {
                        Notification.success('تم تحديث البيانات بنجاح');
                    }
                } catch (error) {
                    Utils.safeError('❌ خطأ في تحديث البيانات:', error);
                    if (typeof Notification !== 'undefined') {
                        Notification.error('حدث خطأ أثناء تحديث البيانات');
                    }
                    refreshBtn.disabled = false;
                    refreshBtn.innerHTML = '<i class="fas fa-sync-alt ml-2"></i>تحديث';
                }
            });
        }

        // تهيئة أحداث التبويب الحالي
        this.setupTabEventListeners(this.state.currentTab);
    },

    /**
     * ربط أحداث جدول السجل
     */
    bindRegisterTableEvents(container) {
        if (!container || container.dataset.eventsBound === 'true') {
            return;
        }

        container.addEventListener('click', async event => {
            const target = event.target.closest('[data-action]');
            if (!target) return;

            event.preventDefault();
            const action = target.dataset.action;
            const id = target.dataset.id;

            switch (action) {
                case 'view-details':
                    this.viewAsset(id);
                    break;
                case 'print-qr':
                    this.printQr(id);
                    break;
                case 'edit-device':
                    await this.showAssetForm(this.getAssets().find(asset => asset.id === id) || null);
                    break;
                case 'delete-device':
                    await this.deleteAsset(id);
                    break;
                default:
                    break;
            }
        });

        container.dataset.eventsBound = 'true';
    },

    /**
     * تهيئة أحداث التبويب المحدد
     * @param {string} tabName - اسم التبويب
     */
    setupTabEventListeners(tabName) {
        if (tabName === 'database') {
            // أحداث تبويب قاعدة البيانات
            const searchInput = document.getElementById('fire-assets-search');
            if (searchInput) {
                // إزالة المستمعين السابقين
                const newSearchInput = searchInput.cloneNode(true);
                searchInput.parentNode.replaceChild(newSearchInput, searchInput);
                newSearchInput.addEventListener('input', () => this.applyFilters());
            }

            const typeSelect = document.getElementById('fire-assets-type');
            if (typeSelect) {
                const newTypeSelect = typeSelect.cloneNode(true);
                typeSelect.parentNode.replaceChild(newTypeSelect, typeSelect);
                newTypeSelect.addEventListener('change', () => this.applyFilters());
            }

            const statusSelect = document.getElementById('fire-assets-status');
            if (statusSelect) {
                const newStatusSelect = statusSelect.cloneNode(true);
                statusSelect.parentNode.replaceChild(newStatusSelect, statusSelect);
                newStatusSelect.addEventListener('change', () => this.applyFilters());
            }

            const locationSelect = document.getElementById('fire-assets-location');
            if (locationSelect) {
                const newLocationSelect = locationSelect.cloneNode(true);
                locationSelect.parentNode.replaceChild(newLocationSelect, locationSelect);
                newLocationSelect.addEventListener('change', () => this.applyFilters());
            }

            // ✅ تفاعلية: شرائح الحالة السريعة (سريعة فوق القائمة)
            const chipsWrap = document.getElementById('fire-status-chips');
            if (chipsWrap) {
                const newChips = chipsWrap.cloneNode(true);
                chipsWrap.parentNode.replaceChild(newChips, chipsWrap);
                newChips.addEventListener('click', (e) => {
                    const chip = e.target.closest('.fire-chip');
                    if (!chip) return;
                    this.state.filters.status = chip.dataset.status || 'all';
                    const statusSelect = document.getElementById('fire-assets-status');
                    if (statusSelect) statusSelect.value = this.state.filters.status;
                    this.applyFilters();
                });
            }

            // ✅ تفاعلية: زر مسح جميع الفلاتر
            const clearFiltersBtn = document.getElementById('fire-clear-filters');
            if (clearFiltersBtn) {
                const newClearBtn = clearFiltersBtn.cloneNode(true);
                clearFiltersBtn.parentNode.replaceChild(newClearBtn, clearFiltersBtn);
                newClearBtn.addEventListener('click', () => {
                    this.state.filters = { search: '', type: 'all', status: 'all', location: 'all' };
                    const searchInput = document.getElementById('fire-assets-search');
                    if (searchInput) searchInput.value = '';
                    const typeSelect = document.getElementById('fire-assets-type');
                    if (typeSelect) typeSelect.value = 'all';
                    const statusSelect = document.getElementById('fire-assets-status');
                    if (statusSelect) statusSelect.value = 'all';
                    const locationSelect = document.getElementById('fire-assets-location');
                    if (locationSelect) locationSelect.value = 'all';
                    this.renderAssets();
                    // نتيجة بعد إنهاء التصفية
                    if (typeof Notification !== 'undefined' && Notification.info) {
                        Notification.info('تمت إزالة جميع الفلاتر');
                    }
                });
            }
        } else if (tabName === 'inspections') {
            // أحداث تبويب الفحوصات الشهرية
            const newInspectionBtn = document.getElementById('new-inspection-btn');
            if (newInspectionBtn) {
                // إزالة المستمعين السابقين
                const newBtn = newInspectionBtn.cloneNode(true);
                newInspectionBtn.parentNode.replaceChild(newBtn, newInspectionBtn);
                newBtn.addEventListener('click', () => {
                    this.startQRScan();
                });
            }
            
            // زر مسح QR للموبايل
            const mobileScanBtn = document.getElementById('mobile-scan-qr-btn');
            if (mobileScanBtn) {
                const newMobileBtn = mobileScanBtn.cloneNode(true);
                mobileScanBtn.parentNode.replaceChild(newMobileBtn, mobileScanBtn);
                newMobileBtn.addEventListener('click', () => {
                    this.startQRScan();
                });
            }
        } else if (tabName === 'register') {
            // أحداث تبويب السجل
            const registerTable = document.getElementById('fire-register-table');
            if (registerTable) {
                this.bindRegisterTableEvents(registerTable);
            }

            const addDeviceBtn = document.getElementById('register-add-device-btn');
            if (addDeviceBtn) {
                const newAddBtn = addDeviceBtn.cloneNode(true);
                addDeviceBtn.parentNode.replaceChild(newAddBtn, addDeviceBtn);
                newAddBtn.addEventListener('click', async () => {
                    await this.showAssetForm();
                });
            }

            const batchPrintBtn = document.getElementById('register-batch-print-qr-btn');
            if (batchPrintBtn) {
                const newBatchBtn = batchPrintBtn.cloneNode(true);
                batchPrintBtn.parentNode.replaceChild(newBatchBtn, batchPrintBtn);
                newBatchBtn.addEventListener('click', () => {
                    this.showBatchPrintQrModal();
                });
            }

            const importExcelBtn = document.getElementById('register-import-excel-btn');
            if (importExcelBtn) {
                const newImportBtn = importExcelBtn.cloneNode(true);
                importExcelBtn.parentNode.replaceChild(newImportBtn, importExcelBtn);
                newImportBtn.addEventListener('click', () => {
                    this.showImportExcelModal();
                });
            }

            const exportExcelBtn = document.getElementById('register-export-excel-btn');
            if (exportExcelBtn) {
                const newExportBtn = exportExcelBtn.cloneNode(true);
                exportExcelBtn.parentNode.replaceChild(newExportBtn, exportExcelBtn);
                newExportBtn.addEventListener('click', () => {
                    this.exportToExcel();
                });
            }

            const exportPdfBtn = document.getElementById('register-export-pdf-btn');
            if (exportPdfBtn) {
                const newPdfBtn = exportPdfBtn.cloneNode(true);
                exportPdfBtn.parentNode.replaceChild(newPdfBtn, exportPdfBtn);
                newPdfBtn.addEventListener('click', () => {
                    this.exportRegisterToPDF();
                });
            }
        } else if (tabName === 'analytics') {
            // أحداث تبويب تحليل البيانات
            this.setupAnalyticsEventListeners();
        } else if (tabName === 'approval-requests') {
            // أحداث تبويب طلبات الموافقة
            this.setupApprovalRequestsEventListeners();
        }
    },

    applyFilters() {
        const searchInput = document.getElementById('fire-assets-search');
        const typeSelect = document.getElementById('fire-assets-type');
        const statusSelect = document.getElementById('fire-assets-status');
        const locationSelect = document.getElementById('fire-assets-location');

        this.state.filters.search = (searchInput?.value || '').trim().toLowerCase();
        this.state.filters.type = typeSelect ? typeSelect.value : 'all';
        this.state.filters.status = statusSelect ? statusSelect.value : 'all';
        this.state.filters.location = locationSelect ? locationSelect.value : 'all';

        this.renderAssets();
    },

    getFilteredAssets() {
        const filters = this.state.filters;
        return this.getAssets().filter(asset => {
            const searchValue = filters.search;
            const matchesSearch =
                !searchValue ||
                [
                    asset.number,
                    asset.type,
                    asset.location,
                    asset.manufacturer,
                    asset.responsible
                ].some(value => String(value || '').toLowerCase().includes(searchValue));

            const matchesType = filters.type === 'all' || asset.type === filters.type;
            const matchesStatus = filters.status === 'all' || asset.status === filters.status;
            const matchesLocation = filters.location === 'all' || asset.location === filters.location;

            return matchesSearch && matchesType && matchesStatus && matchesLocation;
        });
    },

    async showAssetForm(asset = null) {
        const isEdit = !!asset;

        // التحقق من الصلاحيات
        if (isEdit && !this.canEdit()) {
            Notification.error('ليس لديك صلاحية لتعديل الأجهزة. يجب أن تكون مدير النظام أو لديك صلاحية التعديل.');
            return;
        }

        if (!isEdit && !this.canAdd()) {
            Notification.error('ليس لديك صلاحية لإضافة أجهزة جديدة. يجب أن تكون مدير النظام أو لديك صلاحية الإضافة.');
            return;
        }

        const assetId = asset?.id || this.generateFireDeviceID();

        // التأكد من تحميل إعدادات النماذج
        if (typeof Permissions !== 'undefined' && typeof Permissions.ensureFormSettingsState === 'function') {
            await Permissions.ensureFormSettingsState();
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay fire-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 760px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${isEdit ? 'تعديل جهاز' : 'إضافة جهاز إطفاء جديد'}</h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="fire-asset-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">المصنع</label>
                                <select id="asset-factory" class="form-input">
                                    <option value="">اختر المصنع</option>
                                    ${this.getSiteOptions().map(site => {
            const isSelected = asset && (asset.factoryId === site.id || asset.factoryId === String(site.id) || (asset.factory === site.id && !asset.factoryId) || asset.factory === site.name);
            return `<option value="${site.id}" ${isSelected ? 'selected' : ''}>${Utils.escapeHTML(site.name)}</option>`;
        }).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">الموقع الفرعي</label>
                                <select id="asset-sub-location" class="form-input">
                                    <option value="">اختر الموقع الفرعي</option>
                                    ${(() => {
                const factoryId = asset?.factoryId || asset?.factory || '';
                const places = this.getPlaceOptions(factoryId);
                return places.map(place => {
                    const isSelected = asset && (asset.subLocationId === place.id || asset.subLocationId === String(place.id) || (asset.subLocation === place.id && !asset.subLocationId) || asset.subLocation === place.name);
                    return `<option value="${place.id}" ${isSelected ? 'selected' : ''}>${Utils.escapeHTML(place.name)}</option>`;
                }).join('');
            })()}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">مكان / موقع الجهاز *</label>
                                <input type="text" id="asset-location" required class="form-input" value="${Utils.escapeHTML(asset?.location || '')}" placeholder="المبنى / الدور / المنطقة">
                            </div>
                            <div>
                                <label class="form-label">نوع الجهاز *</label>
                                <div class="flex gap-2">
                                    <input type="text" id="asset-type" list="fire-asset-types" required class="form-input flex-1" value="${Utils.escapeHTML(asset?.type || '')}" placeholder="اختر أو أضف نوع جديد">
                                    <button type="button" id="manage-types-btn" class="btn-secondary" title="إدارة أنواع الأجهزة">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                </div>
                                <datalist id="fire-asset-types">
                                    ${this.assetTypes.map(type => `<option value="${Utils.escapeHTML(type)}"></option>`).join('')}
                                </datalist>
                            </div>
                            <div>
                                <label class="form-label">السعة / كجم *</label>
                                <input type="text" id="asset-capacity" required class="form-input" value="${Utils.escapeHTML(asset?.capacity || asset?.capacityKg || '')}" placeholder="مثال: 6 كجم">
                            </div>
                            <div>
                                <label class="form-label">رقم الجهاز بالموقع *</label>
                                <input type="text" id="asset-site-number" required class="form-input" value="${Utils.escapeHTML(asset?.siteNumber || asset?.number || '')}" placeholder="رقم الجهاز في الموقع">
                            </div>
                            <div>
                                <label class="form-label">الشركة المصنعة</label>
                                <input type="text" id="asset-manufacturer" class="form-input" value="${Utils.escapeHTML(asset?.manufacturer || '')}" placeholder="الشركة المصنعة">
                            </div>
                            <div>
                                <label class="form-label">سنة الصنع</label>
                                <input type="number" id="asset-manufacturing-year" class="form-input" value="${asset?.manufacturingYear || ''}" placeholder="مثال: 2023" min="1900" max="2100">
                            </div>
                            <div>
                                <label class="form-label">رقم مسلسل الجهاز</label>
                                <input type="text" id="asset-serial-number" class="form-input" value="${Utils.escapeHTML(asset?.serialNumber || '')}" placeholder="الرقم المسلسل">
                            </div>
                            <div>
                                <label class="form-label">حالة الجهاز *</label>
                                <select id="asset-status" class="form-input" required>
                                    ${this.statusOptions.map(option => `<option value="${option.value}" ${asset?.status === option.value ? 'selected' : ''}>${option.label}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">طريقة تثبيت</label>
                                <input type="text" id="asset-installation-method" class="form-input" value="${Utils.escapeHTML(asset?.installationMethod || '')}" placeholder="مثال: مثبت على الحائط، متحرك">
                            </div>
                            <div>
                                <label class="form-label">الموديل / المواصفات</label>
                                <input type="text" id="asset-model" class="form-input" value="${Utils.escapeHTML(asset?.model || '')}" placeholder="الموديل أو المواصفات">
                            </div>
                            <div>
                                <label class="form-label">تاريخ التركيب</label>
                                <input type="date" id="asset-installation" class="form-input" value="${asset?.installationDate ? new Date(asset.installationDate).toISOString().slice(0, 10) : ''}">
                            </div>
                            <div>
                                <label class="form-label">آخر صيانة</label>
                                <input type="date" id="asset-last-service" class="form-input" value="${asset?.lastServiceDate ? new Date(asset.lastServiceDate).toISOString().slice(0, 10) : ''}">
                            </div>
                            <div>
                                <label class="form-label">المسؤول عن الجهاز</label>
                                <input type="text" id="asset-responsible" class="form-input" value="${Utils.escapeHTML(asset?.responsible || '')}" placeholder="اسم المسؤول أو القسم">
                            </div>
                            <div class="md:col-span-2">
                                <label class="form-label">ملاحظات</label>
                                <textarea id="asset-notes" class="form-input" rows="3" placeholder="أي معلومات إضافية">${Utils.escapeHTML(asset?.notes || '')}</textarea>
                            </div>
                        </div>
                        <div class="flex items-center justify-center gap-3 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">إلغاء</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${isEdit ? 'حفظ التغييرات' : 'إضافة الجهاز'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        // إزالة الإغلاق التلقائي عند النقر على الخلفية

        const form = modal.querySelector('#fire-asset-form');
        form.addEventListener('submit', async event => {
            event.preventDefault();
            
            // منع النقر المتكرر
            const submitBtn = form?.querySelector('button[type="submit"]');
            if (submitBtn && submitBtn.disabled) {
                return; // النموذج قيد المعالجة
            }

            // تعطيل الزر لمنع النقر المتكرر
            let originalText = '';
            if (submitBtn) {
                originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الحفظ...';
            }

            try {
                const now = new Date().toISOString();

                const assets = this.getAssets();
            const index = assets.findIndex(item => item.id === assetId);

            // إضافة نوع جديد إذا لم يكن موجوداً
            const typeValue = document.getElementById('asset-type').value.trim();
            if (typeValue && !this.assetTypes.includes(typeValue)) {
                this.assetTypes.push(typeValue);
            }

            // Helper function to safely get element value
                const getElementValue = (id) => {
                    const element = document.getElementById(id);
                    return element ? element.value.trim() : '';
                };

                const getElementValueOrNull = (id) => {
                    const element = document.getElementById(id);
                    return element ? element.value.trim() : null;
                };

                // الحصول على بيانات المصنع والموقع الفرعي (ID واسم)
                const factoryId = getElementValue('asset-factory');
                const subLocationId = getElementValue('asset-sub-location');
                const sites = this.getSiteOptions();
                const selectedSite = sites.find(s => s.id === factoryId);
                const places = this.getPlaceOptions(factoryId);
                const selectedPlace = places.find(p => p.id === subLocationId);

                const updatedAsset = {
                id: assetId,
                number: getElementValue('asset-site-number') || assetId,
                siteNumber: getElementValue('asset-site-number') || assetId,
                type: typeValue,
                location: getElementValue('asset-location'),
                subLocation: subLocationId,
                subLocationId: subLocationId ? String(subLocationId).trim() : null,
                subLocationName: selectedPlace ? selectedPlace.name : '',
                manufacturer: getElementValue('asset-manufacturer'),
                factory: factoryId,
                factoryId: factoryId ? String(factoryId).trim() : null,
                factoryName: selectedSite ? selectedSite.name : '',
                model: getElementValue('asset-model'),
                capacity: getElementValue('asset-capacity'),
                capacityKg: getElementValue('asset-capacity'),
                manufacturingYear: (() => {
                    const element = document.getElementById('asset-manufacturing-year');
                    return element && element.value ? parseInt(element.value) : null;
                })(),
                productionDate: (() => {
                    const element = document.getElementById('asset-production-date');
                    return element ? this.toISODate(element.value) : null;
                })(),
                serialNumber: getElementValue('asset-serial-number'),
                installationMethod: getElementValue('asset-installation-method'),
                installationDate: (() => {
                    const element = document.getElementById('asset-installation');
                    return element ? this.toISODate(element.value) : null;
                })(),
                lastServiceDate: (() => {
                    const element = document.getElementById('asset-last-service');
                    return element ? this.toISODate(element.value) : null;
                })(),
                status: getElementValue('asset-status'),
                responsible: getElementValue('asset-responsible'),
                notes: getElementValue('asset-notes'),
                    qrCodeData: asset?.qrCodeData || this.generateQrData(assetId),
                    createdAt: asset?.createdAt || now,
                    updatedAt: now
                };

                // تحديث AppState مباشرة قبل الحفظ في Backend
                // هذا يضمن بقاء البيانات في الواجهة حتى لو فشل التحميل من Backend
                if (index > -1) {
                    assets[index] = { ...assets[index], ...updatedAsset };
                } else {
                    assets.push(updatedAsset);
                }

                // حفظ مباشر في Backend بدلاً من persistAll
                Loading.show();
                
                let backendResult;

                if (GoogleIntegration && AppState.googleConfig?.appsScript?.enabled) {
                    // استخدام saveOrUpdateFireEquipmentAsset للحفظ المباشر
                    backendResult = await GoogleIntegration.sendRequest({
                        action: 'saveOrUpdateFireEquipmentAsset',
                        data: updatedAsset
                    });

                    if (!backendResult.success) {
                        throw new Error(backendResult.message || 'فشل حفظ الجهاز');
                    }

                    Utils.safeLog('✅ تم حفظ الجهاز في Backend:', updatedAsset.id);
                    
                    // بعد الحفظ الناجح في Backend، تحديث AppState بالبيانات المحدثة من Backend
                    // هذا يضمن التطابق مع قاعدة البيانات
                    try {
                        await this.loadAssetsFromBackend();
                    } catch (loadError) {
                        // إذا فشل التحميل، البيانات المحلية تبقى في AppState
                        Utils.safeWarn('⚠️ فشل تحميل البيانات من Backend، سيتم استخدام البيانات المحلية:', loadError);
                    }
                }

                // حفظ محلياً - دائماً بعد تحديث AppState
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }

                Loading.hide();
                Notification.success(isEdit ? 'تم تحديث بيانات الجهاز' : 'تم إضافة الجهاز بنجاح');
                
                // استعادة الزر بعد النجاح
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                
                modal.remove();

                // تحديث التبويب الحالي - البيانات موجودة بالفعل في AppState
                if (this.state.currentTab === 'database') {
                    this.renderAssets();
                } else if (this.state.currentTab === 'register') {
                    // استخدام refreshRegisterTable() لتحديث الجدول والكروت الإحصائية
                    await this.refreshRegisterTable();
                } else {
                    // إذا كان التبويب مختلف، تحديث عام
                    await this.refreshCurrentTab();
                }
            } catch (error) {
                Loading.hide();
                Utils.safeError('خطأ في حفظ الجهاز:', error);
                Notification.error('فشل حفظ الجهاز: ' + (error.message || error));
                
                // استعادة الزر في حالة الخطأ
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            }
        });

        // زر إدارة أنواع الأجهزة
        const manageTypesBtn = modal.querySelector('#manage-types-btn');
        if (manageTypesBtn) {
            manageTypesBtn.addEventListener('click', () => {
                this.showManageTypesModal();
            });
        }

        // ربط المصنع بالموقع الفرعي
        setTimeout(() => {
            const factorySelect = modal.querySelector('#asset-factory');
            const subLocationSelect = modal.querySelector('#asset-sub-location');

            if (factorySelect && subLocationSelect) {
                factorySelect.addEventListener('change', () => {
                    const factoryId = factorySelect.value;
                    const places = this.getPlaceOptions(factoryId);

                    // مسح الخيارات الحالية
                    subLocationSelect.innerHTML = '<option value="">اختر الموقع الفرعي</option>';

                    // إضافة الأماكن الجديدة
                    places.forEach(place => {
                        const option = document.createElement('option');
                        option.value = place.id;
                        option.textContent = place.name;
                        subLocationSelect.appendChild(option);
                    });
                });
            }
        }, 100);

        // إزالة الإغلاق التلقائي عند النقر على الخلفية
    },

    /**
     * بدء مسح QR Code للفحص الشهري
     */
    async startQRScan() {
        // التحقق من دعم الكاميرا
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            Notification.error('المتصفح لا يدعم الوصول إلى الكاميرا. يرجى استخدام متصفح حديث.');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay fire-modal';
        modal.innerHTML = `
            <style>
                .qr-scanner-modal {
                    max-width: 95%;
                    width: 100%;
                    max-height: 95vh;
                    overflow-y: auto;
                }
                @media (min-width: 768px) {
                    .qr-scanner-modal {
                        max-width: 650px;
                    }
                }
                #qr-scanner-container {
                    position: relative;
                    width: 100%;
                    max-width: 100%;
                    margin: 0 auto;
                    background: #000;
                    border-radius: 12px;
                    overflow: hidden;
                }
                #qr-video {
                    width: 100%;
                    height: auto;
                    min-height: 300px;
                    max-height: 60vh;
                    object-fit: cover;
                    display: block;
                }
                #qr-scan-overlay {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 70%;
                    max-width: 250px;
                    height: 250px;
                    border: 3px solid #3B82F6;
                    border-radius: 12px;
                    pointer-events: none;
                    animation: pulse-border 2s infinite;
                }
                @keyframes pulse-border {
                    0%, 100% { border-color: #3B82F6; box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
                    50% { border-color: #60A5FA; box-shadow: 0 0 30px rgba(96, 165, 250, 0.8); }
                }
                .qr-scan-status {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                }
                .manual-input-section {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    padding: 20px;
                    border-radius: 12px;
                    margin-top: 20px;
                }
            </style>
            <div class="modal-content qr-scanner-modal">
                <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                    <h2 class="modal-title" style="font-size: 1.5rem; font-weight: 700; color: white;">
                        <i class="fas fa-qrcode ml-2"></i>
                        مسح QR Code للفحص الشهري
                    </h2>
                    <button class="modal-close" onclick="if(confirm('هل أنت متأكد من إغلاق نافذة المسح؟')) { this.closest('.modal-overlay').remove(); FireEquipment.stopQRScan(); }" style="color: white; font-size: 1.5rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div id="qr-scanner-container">
                        <video id="qr-video" autoplay playsinline muted></video>
                        <canvas id="qr-canvas" style="display: none;"></canvas>
                        <div id="qr-scan-overlay"></div>
                        <div class="qr-scan-status">
                            <i class="fas fa-camera ml-2"></i>
                            جاري المسح...
                        </div>
                    </div>
                    <div class="text-center mt-4">
                        <p class="text-base font-semibold text-gray-700 mb-2">
                            <i class="fas fa-info-circle ml-2 text-blue-500"></i>
                            وجّه الكاميرا نحو QR Code المُلصق على الجهاز
                        </p>
                        <p class="text-sm text-gray-500">
                            تأكد من وضوح الإضاءة والتركيز على الكود
                        </p>
                    </div>
                    <div class="manual-input-section">
                        <label class="form-label" style="font-weight: 600; color: #495057; margin-bottom: 10px; display: block;">
                            <i class="fas fa-keyboard ml-2"></i>
                            أو أدخل DeviceID يدوياً:
                        </label>
                        <div class="flex gap-2">
                            <input type="text" id="manual-device-id" class="form-input flex-1" placeholder="مثال: EFA-0001" style="border: 2px solid #667eea; font-size: 1rem; padding: 12px;">
                            <button type="button" id="manual-submit-btn" class="btn-primary" style="padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); white-space: nowrap;">
                                <i class="fas fa-check ml-2"></i>تأكيد
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">
                            <i class="fas fa-lightbulb ml-1"></i>
                            التنسيق المتوقع: EFA-0000
                        </p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const video = modal.querySelector('#qr-video');
        const canvas = modal.querySelector('#qr-canvas');
        const context = canvas.getContext('2d');
        let stream = null;
        let scanInterval = null;

        // إزالة الإغلاق التلقائي - سيتم التعامل معه عبر confirmClose

        // زر الإدخال اليدوي
        const manualSubmitBtn = modal.querySelector('#manual-submit-btn');
        const manualDeviceIdInput = modal.querySelector('#manual-device-id');
        const statusEl = modal.querySelector('.qr-scan-status');

        manualSubmitBtn.addEventListener('click', async () => {
            const deviceId = manualDeviceIdInput.value.trim();
            if (!deviceId) {
                Notification.warning('يرجى إدخال DeviceID');
                return;
            }
            this.stopQRScan();
            modal.remove();
            await this.processScannedDeviceId(deviceId);
        });

        // السماح بالإدخال عند الضغط على Enter
        manualDeviceIdInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                manualSubmitBtn.click();
            }
        });

        // بدء الكاميرا
        try {
            // محاولة استخدام الكاميرا الخلفية للهواتف
            const constraints = {
                video: {
                    facingMode: { ideal: 'environment' },
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = stream;

            if (statusEl) {
                statusEl.innerHTML = '<i class="fas fa-camera ml-2"></i>جاري المسح...';
                statusEl.style.background = 'rgba(34, 197, 94, 0.8)';
            }

            // ضبط حجم Canvas
            video.addEventListener('loadedmetadata', () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            });

            // بدء المسح
            scanInterval = setInterval(() => {
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

                    if (typeof jsQR !== 'undefined') {
                        const code = jsQR(imageData.data, imageData.width, imageData.height, {
                            inversionAttempts: 'dontInvert'
                        });
                        if (code && code.data) {
                            const deviceId = code.data.trim();
                            if (statusEl) {
                                statusEl.innerHTML = '<i class="fas fa-check-circle ml-2"></i>تم المسح!';
                                statusEl.style.background = 'rgba(34, 197, 94, 0.9)';
                            }
                            this.stopQRScan();
                            setTimeout(() => modal.remove(), 300);
                            this.processScannedDeviceId(deviceId);
                        }
                    }
                }
            }, 100);
        } catch (error) {
            // قمع تحذيرات Permissions Policy - تم إضافة Permissions-Policy في meta tag
            const errorMessage = error?.message || error?.toString() || '';
            const isPermissionsPolicyError = 
                errorMessage.includes('Permissions policy') ||
                errorMessage.includes('Permission policy') ||
                errorMessage.includes('[Violation]') ||
                errorMessage.includes('not allowed in this document');
            
            // استخدام safeError فقط للأخطاء الحقيقية (ليس تحذيرات Permissions Policy)
            if (!isPermissionsPolicyError) {
            Utils.safeError('خطأ في الوصول إلى الكاميرا:', error);
            }
            
            if (statusEl) {
                statusEl.innerHTML = '<i class="fas fa-exclamation-triangle ml-2"></i>فشل الوصول للكاميرا';
                statusEl.style.background = 'rgba(239, 68, 68, 0.8)';
            }
            
            // رسالة مستخدم محسّنة
            if (isPermissionsPolicyError) {
                Notification.warning('يرجى السماح بالوصول إلى الكاميرا في إعدادات المتصفح أو استخدام الإدخال اليدوي.');
            } else {
            Notification.error('فشل الوصول إلى الكاميرا. يرجى السماح بالوصول إلى الكاميرا أو استخدام الإدخال اليدوي.');
            }
        }

        // حفظ مرجع stream للإيقاف لاحقاً
        modal.dataset.stream = 'active';
        window._fireEquipmentStream = stream;
        window._fireEquipmentScanInterval = scanInterval;
    },

    /**
     * إيقاف مسح QR Code
     */
    stopQRScan() {
        if (window._fireEquipmentStream) {
            window._fireEquipmentStream.getTracks().forEach(track => track.stop());
            window._fireEquipmentStream = null;
        }
        if (window._fireEquipmentScanInterval) {
            clearInterval(window._fireEquipmentScanInterval);
            window._fireEquipmentScanInterval = null;
        }
    },

    /**
     * معالجة DeviceID الممسوح
     * @param {string} deviceId - DeviceID المستخرج من QR Code
     */
    async processScannedDeviceId(deviceId) {
        if (!deviceId) {
            Notification.error('DeviceID غير صحيح');
            return;
        }

        Loading.show();
        try {
            // جلب بيانات الجهاز من قاعدة البيانات
            const deviceData = await this.getDeviceDataFromRegister(deviceId);

            if (!deviceData) {
                Notification.error(`لم يتم العثور على جهاز برقم: ${deviceId}`);
                Loading.hide();
                return;
            }

            // عرض بيانات الجهاز
            await this.showDeviceDataFromQR(deviceData);
        } catch (error) {
            console.error('خطأ في معالجة DeviceID:', error);
            Notification.error('حدث خطأ أثناء جلب بيانات الجهاز: ' + error.message);
        } finally {
            Loading.hide();
        }
    },

    /**
     * جلب بيانات الجهاز من Fire Inspection Register عبر DeviceID
     * @param {string} deviceId - DeviceID الفريد للجهاز
     * @returns {object|null} بيانات الجهاز أو null إذا لم يتم العثور عليه
     */
    getDeviceDataFromRegister(deviceId) {
        // البحث في FireEquipmentAssets أولاً
        const asset = this.getAssets().find(a => a.id === deviceId);
        if (!asset) {
            return null;
        }

        // جلب آخر فحص من FireEquipmentInspections
        const latestInspection = this.getLatestInspection(deviceId);

        return {
            deviceId: asset.id,
            deviceNumber: asset.number || asset.id,
            deviceType: asset.type || '',
            location: asset.location || '',
            capacity: asset.capacity || '',
            // بيانات آخر فحص
            lastInspectionDate: latestInspection ? latestInspection.checkDate : null,
            lastInspector: latestInspection ? latestInspection.inspector : '',
            deviceStatus: asset.status || '',
            // بيانات إضافية
            manufacturer: asset.manufacturer || '',
            model: asset.model || '',
            installationDate: asset.installationDate || ''
        };
    },

    /**
     * عرض بيانات الجهاز بعد مسح QR Code
     * @param {object} deviceData - بيانات الجهاز
     */
    async showDeviceDataFromQR(deviceData) {
        // التحقق من أن الجهاز لم يُفحص هذا الشهر
        const canInspect = this.checkMonthlyInspectionAllowed(deviceData.deviceId);
        
        if (!canInspect.allowed) {
            Notification.warning(canInspect.reason || 'لا يمكن إجراء الفحص في هذا الوقت');
            return;
        }

        // التحقق من الصلاحيات - السماح لمراقبي السلامة أيضاً
        const currentUser = AppState.currentUser;
        const isAdmin = currentUser && (
            currentUser.role === 'admin' ||
            currentUser.role === 'مدير النظام' ||
            currentUser.role === 'system_admin' ||
            (typeof Permissions !== 'undefined' && Permissions.isCurrentUserAdmin && Permissions.isCurrentUserAdmin())
        );

        // السماح لمراقبي السلامة مع صلاحية الفحص
        const isSafetyOfficer = currentUser && (
            currentUser.role === 'safety_officer' ||
            currentUser.role === 'مسئول السلامة'
        );
        
        const hasInspectionPermission = typeof Permissions !== 'undefined' && 
            Permissions.hasDetailedPermission && 
            Permissions.hasDetailedPermission('fire-equipment', 'inspections');

        // إذا لم يكن مدير ولا مراقب سلامة مع صلاحية، نعرض رسالة خطأ
        if (!isAdmin && !(isSafetyOfficer && hasInspectionPermission)) {
            // إذا كان المستخدم لديه صلاحية عامة للموديول، نسمح له
            const hasModuleAccess = typeof Permissions !== 'undefined' && 
                Permissions.hasAccess && 
                Permissions.hasAccess('fire-equipment');
            
            if (!hasModuleAccess) {
                Notification.error('هذا الإجراء يتطلب صلاحية فحص معدات الإطفاء. يرجى التواصل مع مدير النظام.');
                return;
            }
        }

        // فتح نموذج الفحص المبسط للموبايل مباشرة
        this.showMobileInspectionForm(null, deviceData.deviceId);
    },

    /**
     * بدء عملية الفحص الشهري (مع التحقق من القيود)
     * @param {string} deviceId - DeviceID للجهاز
     */
    async initiateMonthlyInspection(deviceId) {
        // التحقق من الفحص الشهري
        const canInspect = this.checkMonthlyInspectionAllowed(deviceId);

        if (!canInspect.allowed) {
            Notification.warning(canInspect.reason || 'لا يمكن إجراء الفحص في هذا الوقت');
            return;
        }

        // طلب موافقة المدير
        const approved = await this.requestAdminApproval(deviceId);
        if (!approved) {
            Notification.info('تم إلغاء العملية - مطلوب موافقة المدير');
            return;
        }

        // فتح نموذج الفحص
        this.showInspectionForm(null, deviceId);
    },

    /**
     * التحقق من إمكانية إجراء الفحص الشهري
     * @param {string} deviceId - DeviceID للجهاز
     * @returns {object} {allowed: boolean, reason: string}
     */
    checkMonthlyInspectionAllowed(deviceId) {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // البحث عن فحوصات هذا الشهر للجهاز
        const monthlyInspections = this.getInspections().filter(inspection => {
            if (inspection.assetId !== deviceId) return false;
            const inspectionDate = new Date(inspection.checkDate || inspection.createdAt);
            return inspectionDate.getMonth() === currentMonth &&
                inspectionDate.getFullYear() === currentYear;
        });

        // إذا كان هناك فحص في نفس الشهر → منع
        if (monthlyInspections.length > 0) {
            const lastInspection = monthlyInspections[0];
            const lastDate = Utils.formatDate(lastInspection.checkDate || lastInspection.createdAt);
            return {
                allowed: false,
                reason: `تم فحص هذا الجهاز بالفعل في هذا الشهر (${lastDate}). لا يمكن إجراء فحص آخر في نفس الشهر.`
            };
        }

        // إذا لم يُفحص في هذا الشهر → مسموح
        return {
            allowed: true,
            reason: ''
        };
    },

    /**
     * طلب موافقة المدير قبل فتح نموذج الفحص
     * @param {string} deviceId - DeviceID للجهاز
     * @returns {Promise<boolean>} true إذا تمت الموافقة
     */
    async requestAdminApproval(deviceId) {
        return new Promise(async (resolve) => {
            // التحقق من أن المستخدم الحالي هو مدير
            const currentUser = AppState.currentUser;
            const isAdmin = currentUser && (
                currentUser.role === 'admin' ||
                currentUser.role === 'مدير النظام' ||
                (typeof Permissions !== 'undefined' && Permissions.isCurrentUserAdmin && Permissions.isCurrentUserAdmin())
            );

            // إذا كان المستخدم مدير → موافقة تلقائية
            if (isAdmin) {
                resolve(true);
                return;
            }

            // إذا لم يكن مديراً، إنشاء طلب موافقة
            try {
                const asset = this.getAssets().find(a => a.id === deviceId);
                const assetNumber = asset ? (asset.number || asset.id) : deviceId;
                const assetLocation = asset ? (asset.location || '') : '';

                // إنشاء طلب موافقة
                const approvalRequest = await this.createInspectionApprovalRequest(deviceId, assetNumber, assetLocation);

                if (approvalRequest) {
                    Notification.info('تم إرسال طلب الموافقة. سيتم إشعار المدير للمراجعة.');
                    
                    // تحديث الإشعارات
                    if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) {
                        AppUI.updateNotificationsBadge();
                    }

                    // إرسال إشعار Real-time للمديرين
                    if (typeof RealtimeSyncManager !== 'undefined' && RealtimeSyncManager.notifyChange) {
                        RealtimeSyncManager.notifyChange('fireEquipmentApprovalRequests', 'add', approvalRequest.id);
                    }
                }

                resolve(false); // لا يتم فتح النموذج حتى تتم الموافقة
            } catch (error) {
                Utils.safeError('خطأ في إنشاء طلب الموافقة:', error);
                Notification.error('حدث خطأ أثناء إرسال طلب الموافقة');
            resolve(false);
            }
        });
    },

    /**
     * إنشاء طلب موافقة للفحص الشهري
     * @param {string} deviceId - DeviceID للجهاز
     * @param {string} assetNumber - رقم الجهاز
     * @param {string} assetLocation - موقع الجهاز
     * @returns {Promise<object>} بيانات الطلب
     */
    async createInspectionApprovalRequest(deviceId, assetNumber, assetLocation) {
        const currentUser = AppState.currentUser;
        if (!currentUser) {
            throw new Error('المستخدم غير مسجل دخول');
        }

        const requestId = Utils.generateId('FEAR');
        const now = new Date().toISOString();

        const approvalRequest = {
            id: requestId,
            type: 'inspection',
            assetId: deviceId,
            assetNumber: assetNumber,
            assetLocation: assetLocation,
            requestedBy: currentUser.name || currentUser.email || 'مستخدم غير محدد',
            requestedById: currentUser.id || currentUser.email || '',
            userEmail: currentUser.email || '',
            requestedAt: now,
            status: 'pending',
            comments: `طلب موافقة لإجراء فحص شهري على الجهاز: ${assetNumber}${assetLocation ? ` - ${assetLocation}` : ''}`,
            createdAt: now,
            updatedAt: now
        };

        // حفظ محلياً
        if (!AppState.appData) AppState.appData = {};
        if (!AppState.appData.fireEquipmentApprovalRequests) {
            AppState.appData.fireEquipmentApprovalRequests = [];
        }
        AppState.appData.fireEquipmentApprovalRequests.push(approvalRequest);
        
        // حفظ في localStorage أيضاً
        if (typeof DataManager !== 'undefined' && DataManager.save) {
            DataManager.save();
        } else {
            localStorage.setItem('fire_equipment_approval_requests', JSON.stringify(AppState.appData.fireEquipmentApprovalRequests));
        }

        // ✅ تحديث الإشعارات فوراً بعد الحفظ المحلي
        if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) {
            AppUI.updateNotificationsBadge();
        }

        // حفظ في Backend (في الخلفية)
        (async () => {
            try {
                if (GoogleIntegration && AppState.googleConfig?.appsScript?.enabled) {
                    const result = await GoogleIntegration.sendRequest({
                        action: 'addFireEquipmentApprovalRequest',
                        data: approvalRequest
                    });

                    if (!result.success) {
                        Utils.safeWarn('⚠️ فشل حفظ الطلب في Backend:', result.message);
                    } else {
                        Utils.safeLog('✅ تم حفظ طلب الموافقة في Backend:', requestId);
                        // تحديث الطلبات بعد الحفظ
                        await this.loadApprovalRequestsFromBackend();
                        // ✅ تحديث الإشعارات مرة أخرى بعد تحميل البيانات من Backend
                        if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) {
                            AppUI.updateNotificationsBadge();
                        }
                    }
                }
            } catch (error) {
                Utils.safeWarn('⚠️ خطأ في حفظ الطلب في Backend:', error);
            }
        })();

        // إرسال إشعارات للمديرين (في الخلفية)
        this.notifyAdminsAboutApprovalRequest(approvalRequest).catch(error => {
            Utils.safeWarn('⚠️ خطأ في إرسال إشعارات للمديرين:', error);
        });

        return approvalRequest;
    },

    /**
     * إرسال إشعارات للمديرين عند إنشاء طلب موافقة جديد
     * @param {object} request - بيانات الطلب
     */
    async notifyAdminsAboutApprovalRequest(request) {
        try {
            // الحصول على قائمة المديرين
            const admins = [];
            if (AppState.appData && AppState.appData.users) {
                admins.push(...AppState.appData.users.filter(user => 
                    user.role === 'admin' || 
                    user.role === 'مدير النظام' ||
                    (typeof Permissions !== 'undefined' && Permissions.isUserAdmin && Permissions.isUserAdmin(user))
                ));
            }

            // إذا لم يتم العثور على مديرين في البيانات المحلية، إرسال إشعار عام
            if (admins.length === 0) {
                // إرسال إشعار عام للمديرين
                if (GoogleIntegration && AppState.googleConfig?.appsScript?.enabled) {
                    await GoogleIntegration.sendRequest({
                        action: 'addNotification',
                        data: {
                            userId: 'admin', // إشعار عام للمديرين
                            title: 'طلب موافقة على فحص معدات الإطفاء',
                            message: `طلب ${request.requestedBy} الموافقة على فحص الجهاز: ${request.assetNumber}${request.assetLocation ? ` - ${request.assetLocation}` : ''}`,
                            type: 'approval_request',
                            priority: 'high',
                            link: '#fire-equipment-approval-requests',
                            data: {
                                module: 'fire-equipment',
                                action: 'inspection_approval',
                                requestId: request.id
                            }
                        }
                    }).catch(error => {
                        Utils.safeWarn('⚠️ فشل إرسال الإشعار:', error);
                    });
                }
            } else {
                // إرسال إشعار لكل مدير
                for (const admin of admins) {
                    if (admin.id || admin.email) {
                        try {
                            if (GoogleIntegration && AppState.googleConfig?.appsScript?.enabled) {
                                await GoogleIntegration.sendRequest({
                                    action: 'addNotification',
                                    data: {
                                        userId: admin.id || admin.email,
                                        title: 'طلب موافقة على فحص معدات الإطفاء',
                                        message: `طلب ${request.requestedBy} الموافقة على فحص الجهاز: ${request.assetNumber}${request.assetLocation ? ` - ${request.assetLocation}` : ''}`,
                                        type: 'approval_request',
                                        priority: 'high',
                                        link: '#fire-equipment-approval-requests',
                                        data: {
                                            module: 'fire-equipment',
                                            action: 'inspection_approval',
                                            requestId: request.id
                                        }
                                    }
                                }).catch(error => {
                                    Utils.safeWarn(`⚠️ فشل إرسال الإشعار للمدير ${admin.name || admin.email}:`, error);
                                });
                            }
                        } catch (error) {
                            Utils.safeWarn(`⚠️ خطأ في إرسال الإشعار للمدير ${admin.name || admin.email}:`, error);
                        }
                    }
                }
            }

            Utils.safeLog('✅ تم إرسال إشعارات للمديرين بخصوص طلب الموافقة:', request.id);
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في إرسال إشعارات الموافقة:', error);
        }
    },

    /**
     * عرض نموذج الفحص الشهري (يُفتح فقط بعد QR Scan وموافقة المدير)
     * @param {object} inspection - بيانات الفحص (للتعديل)
     * @param {string} assetId - DeviceID من QR Scan (مطلوب)
     */
    showInspectionForm(inspection = null, assetId = null) {
        // الفحص الشهري يتم فقط عبر QR Scan
        if (!assetId && !inspection?.assetId) {
            Notification.warning('يجب مسح QR Code أولاً لبدء الفحص الشهري');
            return;
        }

        const isEdit = !!inspection;
        const inspectionId = inspection?.id || Utils.generateId('FEI');
        const targetAssetId = inspection?.assetId || assetId;

        // التحقق من وجود الجهاز
        const asset = this.getAssets().find(a => a.id === targetAssetId);
        if (!asset) {
            Notification.error('لم يتم العثور على بيانات الجهاز');
            return;
        }

        const defaultDate = inspection?.checkDate
            ? new Date(inspection.checkDate).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10);

        const modal = document.createElement('div');
        modal.className = 'modal-overlay fire-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">${isEdit ? 'تعديل فحص جهاز' : 'تسجيل فحص شهري للجهاز'}</h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="fire-inspection-form" class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <p class="text-sm text-blue-800">
                                <i class="fas fa-info-circle ml-2"></i>
                                <strong>DeviceID:</strong> ${Utils.escapeHTML(asset.id)} | 
                                <strong>الجهاز:</strong> ${Utils.escapeHTML(asset.number || asset.id)} | 
                                <strong>الموقع:</strong> ${Utils.escapeHTML(asset.location || '-')}
                            </p>
                        </div>
                        <input type="hidden" id="inspection-asset" value="${targetAssetId}">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">تاريخ الفحص *</label>
                                <input type="date" id="inspection-date" required class="form-input" value="${defaultDate}">
                            </div>
                            <div>
                                <label class="form-label">المفتش *</label>
                                <input type="text" id="inspection-inspector" required class="form-input" value="${Utils.escapeHTML(inspection?.inspector || '')}" placeholder="اسم المفتش">
                            </div>
                            <div>
                                <label class="form-label">الحالة *</label>
                                <select id="inspection-status" class="form-input" required>
                                    ${this.statusOptions.map(option => `<option value="${option.value}" ${inspection?.status === option.value ? 'selected' : ''}>${option.label}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="form-label">قراءة العداد / الضغط</label>
                                <input type="text" id="inspection-gauge" class="form-input" value="${Utils.escapeHTML(inspection?.gaugeReading || '')}" placeholder="مثال: 150 PSI">
                            </div>
                            <div>
                                <label class="form-label">صمام وتيلة الأمان</label>
                                <select id="inspection-seal" class="form-input">
                                    <option value="unknown">غير محدد</option>
                                    <option value="true" ${inspection?.sealIntact === true ? 'selected' : ''}>سليم</option>
                                    <option value="false" ${inspection?.sealIntact === false ? 'selected' : ''}>مكسور / مفقود</option>
                                </select>
                            </div>
                            <div class="md:col-span-2">
                                <label class="form-label">الملاحظات</label>
                                <textarea id="inspection-remarks" class="form-input" rows="3" placeholder="أية ملاحظات إضافية">${Utils.escapeHTML(inspection?.remarks || '')}</textarea>
                            </div>
                            <div class="md:col-span-2">
                                <label class="form-label">الإجراءات المتخذة</label>
                                <textarea id="inspection-actions" class="form-input" rows="2" placeholder="إجراءات الصيانة أو التوصيات">${Utils.escapeHTML(inspection?.actions || '')}</textarea>
                            </div>
                        </div>
                        <div class="flex items-center justify-center gap-3 pt-4 border-t form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">إلغاء</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${isEdit ? 'حفظ التغييرات' : 'تسجيل الفحص'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const form = modal.querySelector('#fire-inspection-form');
        if (!form) {
            Utils.safeError('❌ لم يتم العثور على النموذج #fire-inspection-form');
            return;
        }

        // منع إرسال متعدد
        let isSubmitting = false;

        form.addEventListener('submit', async event => {
            event.preventDefault();
            event.stopPropagation();

            // منع الإرسال المتعدد
            if (isSubmitting) {
                Utils.safeWarn('⚠️ النموذج قيد المعالجة بالفعل');
                return;
            }

            isSubmitting = true;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

            try {
                // تعطيل الزر أثناء المعالجة
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الحفظ...';
                }

            const now = new Date().toISOString();

            // Helper function to safely get element value
            const getElementValue = (id) => {
                const element = document.getElementById(id);
                return element ? element.value.trim() : '';
            };

            const getElementValueOrNull = (id) => {
                const element = document.getElementById(id);
                return element ? element.value : null;
            };

            const assetElement = document.getElementById('inspection-asset');
            const selectedAssetId = (assetElement ? assetElement.value : '') || targetAssetId;
            if (!selectedAssetId) {
                Notification.error('خطأ: DeviceID غير موجود');
                    isSubmitting = false;
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                return;
            }

            // التحقق مرة أخرى من الفحص الشهري قبل الحفظ
            if (!isEdit) {
                const canInspect = this.checkMonthlyInspectionAllowed(selectedAssetId);
                if (!canInspect.allowed) {
                    Notification.warning(canInspect.reason || 'لا يمكن إجراء الفحص في هذا الوقت');
                        isSubmitting = false;
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalBtnText;
                        }
                    return;
                }
            }

            const inspectionPayload = {
                id: inspectionId,
                assetId: selectedAssetId,
                checkDate: (() => {
                    const element = document.getElementById('inspection-date');
                    return element ? (this.toISODate(element.value) || now) : now;
                })(),
                inspector: getElementValue('inspection-inspector'),
                status: getElementValue('inspection-status'),
                gaugeReading: getElementValue('inspection-gauge'),
                sealIntact: (() => {
                    const element = document.getElementById('inspection-seal');
                    if (!element) return null;
                    const value = element.value;
                    if (value === 'true') return true;
                    if (value === 'false') return false;
                    return null;
                })(),
                remarks: getElementValue('inspection-remarks'),
                actions: getElementValue('inspection-actions'),
                createdAt: inspection?.createdAt || now,
                updatedAt: now
            };

                // ✅ حفظ الفحص الشهري في FireEquipmentInspections فقط (وليس في Assets)
            if (!AppState.appData.fireEquipmentInspections) {
                AppState.appData.fireEquipmentInspections = [];
            }
            
            const inspections = AppState.appData.fireEquipmentInspections;
            const existingIndex = inspections.findIndex(item => item.id === inspectionId);
            if (existingIndex > -1) {
                inspections[existingIndex] = { ...inspections[existingIndex], ...inspectionPayload };
            } else {
                inspections.push(inspectionPayload);
            }

                // ✅ تحديث حالة الجهاز فقط (lastServiceDate و status) - الفحص نفسه لا يُضاف في Assets
            const asset = this.getAssets().find(item => item.id === selectedAssetId);
            if (asset) {
                    // تحديث تاريخ آخر خدمة وحالة الجهاز فقط
                asset.lastServiceDate = inspectionPayload.checkDate;
                asset.status = inspectionPayload.status;
                asset.updatedAt = now;
                    // ملاحظة: الفحص نفسه (inspectionPayload) يُحفظ فقط في FireEquipmentInspections
                }

                // ✅ حفظ محلياً أولاً (فوري)
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }

                // ✅ إغلاق النموذج فوراً
                if (modal && modal.parentNode) {
                    modal.remove();
                }

                // ✅ تحديث التبويب فوراً
                this.refreshCurrentTab().catch(err => {
                    Utils.safeError('خطأ في تحديث التبويب:', err);
                });

                // ✅ إظهار رسالة النجاح
                Notification.success(isEdit ? 'تم تحديث بيانات الفحص' : 'تم تسجيل الفحص بنجاح');

                // ✅ المزامنة في الخلفية (بدون انتظار)
                (async () => {
            try {
                if (GoogleIntegration && AppState.googleConfig?.appsScript?.enabled) {
                            // حفظ الفحص في Backend
                    const inspectionResult = await GoogleIntegration.sendRequest({
                        action: isEdit ? 'updateFireEquipmentInspection' : 'addFireEquipmentInspection',
                        data: inspectionPayload
                    });

                    if (!inspectionResult.success) {
                        throw new Error(inspectionResult.message || 'فشل حفظ الفحص');
                    }

                    Utils.safeLog('✅ تم حفظ الفحص في Backend:', inspectionPayload.id);

                    // تحديث asset في Backend إذا تغير status
                    if (asset) {
                        await GoogleIntegration.sendRequest({
                            action: 'saveOrUpdateFireEquipmentAsset',
                            data: asset
                        });
                        Utils.safeLog('✅ تم تحديث حالة الجهاز:', asset.id);
                    }

                            // تحديث التبويب مرة أخرى بعد المزامنة
                            this.refreshCurrentTab().catch(err => {
                                Utils.safeError('خطأ في تحديث التبويب بعد المزامنة:', err);
                            });
                        }
                    } catch (error) {
                        Utils.safeError('خطأ في مزامنة الفحص:', error);
                        // لا نعرض رسالة خطأ للمستخدم لأن النموذج أُغلق بالفعل
                        // يمكن إضافة إشعار خفيف إذا لزم الأمر
                    }
                })();

                // ✅ إعادة تفعيل الزر
                isSubmitting = false;
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            } catch (error) {
                Loading.hide();
                Utils.safeError('خطأ غير متوقع في النموذج:', error);
                Notification.error('حدث خطأ غير متوقع: ' + (error.message || error));
                isSubmitting = false;
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }
        });

        // إزالة الإغلاق التلقائي عند النقر على الخلفية
    },

    /**
     * واجهة فحص مبسطة للموبايل
     * @param {object} inspection - بيانات الفحص (للتعديل)
     * @param {string} assetId - DeviceID من QR Scan
     */
    showMobileInspectionForm(inspection = null, assetId = null) {
        if (!assetId && !inspection?.assetId) {
            Notification.warning('يجب مسح QR Code أولاً لبدء الفحص الشهري');
            return;
        }

        const isEdit = !!inspection;
        const inspectionId = inspection?.id || Utils.generateId('FEI');
        const targetAssetId = inspection?.assetId || assetId;
        const asset = this.getAssets().find(a => a.id === targetAssetId);
        
        if (!asset) {
            Notification.error('لم يتم العثور على بيانات الجهاز');
            return;
        }

        const defaultDate = inspection?.checkDate
            ? new Date(inspection.checkDate).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10);

        const modal = document.createElement('div');
        modal.className = 'modal-overlay fire-modal';
        modal.innerHTML = `
            <style>
                .mobile-inspection-modal {
                    max-width: 100%;
                    width: 100%;
                    max-height: 100vh;
                    height: 100vh;
                    margin: 0;
                    border-radius: 0;
                    display: flex;
                    flex-direction: column;
                }
                @media (min-width: 768px) {
                    .mobile-inspection-modal {
                        max-width: 600px;
                        max-height: 95vh;
                        height: auto;
                        margin: auto;
                        border-radius: 12px;
                    }
                }
                .mobile-inspection-header {
                    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                    color: white;
                    padding: 1.25rem;
                    border-radius: 0;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                @media (min-width: 768px) {
                    .mobile-inspection-header {
                        border-radius: 12px 12px 0 0;
                    }
                }
                .mobile-inspection-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1.25rem;
                    -webkit-overflow-scrolling: touch;
                }
                .mobile-inspection-form-group {
                    margin-bottom: 1.5rem;
                }
                .mobile-inspection-label {
                    display: block;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 0.5rem;
                    font-size: 0.95rem;
                }
                .mobile-inspection-input {
                    width: 100%;
                    padding: 0.875rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: border-color 0.2s;
                }
                .mobile-inspection-input:focus {
                    outline: none;
                    border-color: #dc2626;
                }
                .mobile-inspection-select {
                    width: 100%;
                    padding: 0.875rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    background: white;
                }
                .mobile-inspection-textarea {
                    width: 100%;
                    padding: 0.875rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    min-height: 100px;
                    resize: vertical;
                }
                .mobile-inspection-actions {
                    position: sticky;
                    bottom: 0;
                    background: white;
                    padding: 1rem;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    gap: 0.75rem;
                }
                .mobile-inspection-btn {
                    flex: 1;
                    padding: 1rem;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 1rem;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .mobile-inspection-btn-primary {
                    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                    color: white;
                }
                .mobile-inspection-btn-secondary {
                    background: #f3f4f6;
                    color: #374151;
                }
                .device-info-card {
                    background: #f9fafb;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                }
                .device-info-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #e5e7eb;
                }
                .device-info-row:last-child {
                    border-bottom: none;
                }
                .device-info-label {
                    font-weight: 600;
                    color: #6b7280;
                    font-size: 0.875rem;
                }
                .device-info-value {
                    color: #111827;
                    font-weight: 500;
                }
                @media (max-width: 480px) {
                    .mobile-inspection-body {
                        padding: 1rem;
                    }
                    .mobile-inspection-form-group {
                        margin-bottom: 1.25rem;
                    }
                }
            </style>
            <div class="modal-content mobile-inspection-modal">
                <div class="mobile-inspection-header">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: white;">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            ${isEdit ? 'تعديل فحص' : 'فحص شهري'}
                        </h2>
                        <button class="modal-close" onclick="FireEquipment.confirmClose(this)" style="color: white; font-size: 1.5rem; background: rgba(255,255,255,0.2); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="mobile-inspection-body">
                    <form id="mobile-inspection-form">
                        <div class="device-info-card">
                            <div class="device-info-row">
                                <span class="device-info-label">DeviceID:</span>
                                <span class="device-info-value">${Utils.escapeHTML(asset.id)}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">الجهاز:</span>
                                <span class="device-info-value">${Utils.escapeHTML(asset.number || asset.id)}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">الموقع:</span>
                                <span class="device-info-value">${Utils.escapeHTML(asset.location || '-')}</span>
                            </div>
                            <div class="device-info-row">
                                <span class="device-info-label">النوع:</span>
                                <span class="device-info-value">${Utils.escapeHTML(asset.type || asset.equipmentType || '-')}</span>
                            </div>
                        </div>

                        <input type="hidden" id="mobile-inspection-asset" value="${targetAssetId}">

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-calendar ml-2"></i>
                                تاريخ الفحص *
                            </label>
                            <input type="date" id="mobile-inspection-date" required class="mobile-inspection-input" value="${defaultDate}">
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-user ml-2"></i>
                                اسم المفتش *
                            </label>
                            <input type="text" id="mobile-inspection-inspector" required class="mobile-inspection-input" 
                                   value="${Utils.escapeHTML(inspection?.inspector || '')}" 
                                   placeholder="أدخل اسم المفتش">
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-check-circle ml-2"></i>
                                حالة الجهاز *
                            </label>
                            <select id="mobile-inspection-status" class="mobile-inspection-select" required>
                                ${this.statusOptions.map(option => 
                                    `<option value="${option.value}" ${inspection?.status === option.value ? 'selected' : ''}>${option.label}</option>`
                                ).join('')}
                            </select>
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-gauge ml-2"></i>
                                قراءة العداد / الضغط
                            </label>
                            <input type="text" id="mobile-inspection-gauge" class="mobile-inspection-input" 
                                   value="${Utils.escapeHTML(inspection?.gaugeReading || '')}" 
                                   placeholder="مثال: 150 PSI">
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-lock ml-2"></i>
                                صمام وتيلة الأمان
                            </label>
                            <select id="mobile-inspection-seal" class="mobile-inspection-select">
                                <option value="unknown">غير محدد</option>
                                <option value="true" ${inspection?.sealIntact === true ? 'selected' : ''}>سليم</option>
                                <option value="false" ${inspection?.sealIntact === false ? 'selected' : ''}>مكسور / مفقود</option>
                            </select>
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-comment ml-2"></i>
                                الملاحظات
                            </label>
                            <textarea id="mobile-inspection-remarks" class="mobile-inspection-textarea" 
                                      placeholder="أية ملاحظات إضافية عن حالة الجهاز">${Utils.escapeHTML(inspection?.remarks || '')}</textarea>
                        </div>

                        <div class="mobile-inspection-form-group">
                            <label class="mobile-inspection-label">
                                <i class="fas fa-tools ml-2"></i>
                                الإجراءات المتخذة
                            </label>
                            <textarea id="mobile-inspection-actions" class="mobile-inspection-textarea" 
                                      placeholder="إجراءات الصيانة أو التوصيات">${Utils.escapeHTML(inspection?.actions || '')}</textarea>
                        </div>
                    </form>
                </div>
                <div class="mobile-inspection-actions">
                    <button type="button" class="mobile-inspection-btn mobile-inspection-btn-secondary" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times ml-2"></i>
                        إلغاء
                    </button>
                    <button type="submit" form="mobile-inspection-form" class="mobile-inspection-btn mobile-inspection-btn-primary">
                        <i class="fas fa-save ml-2"></i>
                        ${isEdit ? 'حفظ' : 'تسجيل الفحص'}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const form = modal.querySelector('#mobile-inspection-form');
        if (!form) {
            Utils.safeError('❌ لم يتم العثور على النموذج #mobile-inspection-form');
            return;
        }

        // منع إرسال متعدد
        let isSubmitting = false;
        
        form.addEventListener('submit', async event => {
            event.preventDefault();
            event.stopPropagation();

            // منع الإرسال المتعدد
            if (isSubmitting) {
                Utils.safeWarn('⚠️ النموذج قيد المعالجة بالفعل');
                return;
            }

            isSubmitting = true;
            const submitBtn = modal.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
            
            try {
                // تعطيل الزر أثناء المعالجة
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الحفظ...';
                }

                const now = new Date().toISOString();

                const getElementValue = (id) => {
                    const element = document.getElementById(id);
                    return element ? element.value.trim() : '';
                };

                const assetElement = document.getElementById('mobile-inspection-asset');
                const selectedAssetId = (assetElement ? assetElement.value : '') || targetAssetId;
                
                if (!selectedAssetId) {
                    Notification.error('خطأ: DeviceID غير موجود');
                    isSubmitting = false;
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                    return;
                }

                if (!isEdit) {
                    const canInspect = this.checkMonthlyInspectionAllowed(selectedAssetId);
                    if (!canInspect.allowed) {
                        Notification.warning(canInspect.reason || 'لا يمكن إجراء الفحص في هذا الوقت');
                        isSubmitting = false;
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalBtnText;
                        }
                        return;
                    }
                }

                const inspectionPayload = {
                    id: inspectionId,
                    assetId: selectedAssetId,
                    checkDate: (() => {
                        const element = document.getElementById('mobile-inspection-date');
                        return element ? (this.toISODate(element.value) || now) : now;
                    })(),
                    inspector: getElementValue('mobile-inspection-inspector'),
                    status: getElementValue('mobile-inspection-status'),
                    gaugeReading: getElementValue('mobile-inspection-gauge'),
                    sealIntact: (() => {
                        const element = document.getElementById('mobile-inspection-seal');
                        if (!element) return null;
                        const value = element.value;
                        if (value === 'true') return true;
                        if (value === 'false') return false;
                        return null;
                    })(),
                    remarks: getElementValue('mobile-inspection-remarks'),
                    actions: getElementValue('mobile-inspection-actions'),
                    createdAt: inspection?.createdAt || now,
                    updatedAt: now
                };

                // ✅ حفظ الفحص الشهري في FireEquipmentInspections فقط (وليس في Assets)
                if (!AppState.appData.fireEquipmentInspections) {
                    AppState.appData.fireEquipmentInspections = [];
                }
                
                const inspections = AppState.appData.fireEquipmentInspections;
                const existingIndex = inspections.findIndex(item => item.id === inspectionId);
                if (existingIndex > -1) {
                    inspections[existingIndex] = { ...inspections[existingIndex], ...inspectionPayload };
                } else {
                    inspections.push(inspectionPayload);
                }

                // ✅ تحديث حالة الجهاز فقط (lastServiceDate و status) - الفحص نفسه لا يُضاف في Assets
                const asset = this.getAssets().find(item => item.id === selectedAssetId);
                if (asset) {
                    // تحديث تاريخ آخر خدمة وحالة الجهاز فقط
                    asset.lastServiceDate = inspectionPayload.checkDate;
                    asset.status = inspectionPayload.status;
                    asset.updatedAt = now;
                    // ملاحظة: الفحص نفسه (inspectionPayload) يُحفظ فقط في FireEquipmentInspections
                }

                // ✅ حفظ محلياً أولاً (فوري)
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }

                // ✅ إغلاق النموذج فوراً
                if (modal && modal.parentNode) {
                modal.remove();
                }

                // ✅ تحديث التبويب فوراً
                this.refreshCurrentTab().catch(err => {
                    Utils.safeError('خطأ في تحديث التبويب:', err);
                });

                // ✅ إظهار رسالة النجاح
                Notification.success(isEdit ? 'تم تحديث بيانات الفحص' : 'تم تسجيل الفحص بنجاح');

                // ✅ المزامنة في الخلفية (بدون انتظار)
                (async () => {
                    try {
                        if (GoogleIntegration && AppState.googleConfig?.appsScript?.enabled) {
                            // حفظ الفحص في Backend
                            const inspectionResult = await GoogleIntegration.sendRequest({
                                action: isEdit ? 'updateFireEquipmentInspection' : 'addFireEquipmentInspection',
                                data: inspectionPayload
                            });

                            if (!inspectionResult.success) {
                                throw new Error(inspectionResult.message || 'فشل حفظ الفحص');
                            }

                            Utils.safeLog('✅ تم حفظ الفحص في Backend:', inspectionPayload.id);

                            // تحديث asset في Backend إذا تغير status
                            if (asset) {
                                await GoogleIntegration.sendRequest({
                                    action: 'saveOrUpdateFireEquipmentAsset',
                                    data: asset
                                });
                                Utils.safeLog('✅ تم تحديث حالة الجهاز:', asset.id);
                            }

                            // تحديث التبويب مرة أخرى بعد المزامنة
                            this.refreshCurrentTab().catch(err => {
                                Utils.safeError('خطأ في تحديث التبويب بعد المزامنة:', err);
                            });
                        }
                    } catch (error) {
                        Utils.safeError('خطأ في مزامنة الفحص:', error);
                        // لا نعرض رسالة خطأ للمستخدم لأن النموذج أُغلق بالفعل
                        // يمكن إضافة إشعار خفيف إذا لزم الأمر
                    }
                })();

                // ✅ إعادة تفعيل الزر
                isSubmitting = false;
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            } catch (error) {
                Loading.hide();
                Utils.safeError('خطأ غير متوقع في النموذج:', error);
                Notification.error('حدث خطأ غير متوقع: ' + (error.message || error));
                isSubmitting = false;
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }
        });
    },

    viewAsset(assetId) {
        const asset = this.getAssets().find(item => item.id === assetId);
        if (!asset) {
            Notification.error('لم يتم العثور على بيانات الجهاز.');
            return;
        }

        const inspections = this.getInspectionsByAsset(assetId);
        const qrImage = typeof QRCode !== 'undefined'
            ? QRCode.generate(asset.qrCodeData || this.generateQrData(asset.id), 200)
            : null;
        const assetJson = JSON.stringify(asset).replace(/"/g, '&quot;');

        const modal = document.createElement('div');
        modal.className = 'modal-overlay fire-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 820px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">تفاصيل الجهاز ${Utils.escapeHTML(asset.number || '')}</h2>
                    <button class="modal-close" onclick="FireEquipment.closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="content-card">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-info-circle ml-2"></i>بيانات الجهاز</h3>
                            </div>
                            <div class="card-body space-y-2 text-sm">
                                <p><strong>مكان / موقع الجهاز:</strong> ${Utils.escapeHTML(asset.location || '-')}</p>
                                <p><strong>الموقع الفرعي:</strong> ${Utils.escapeHTML(asset.subLocationName || asset.subLocation || '-')}</p>
                                <p><strong>نوع الجهاز:</strong> ${Utils.escapeHTML(asset.type || '-')}</p>
                                <p><strong>السعة / كجم:</strong> ${Utils.escapeHTML(asset.capacity || asset.capacityKg || '-')}</p>
                                <p><strong>رقم الجهاز بالموقع:</strong> ${Utils.escapeHTML(asset.siteNumber || asset.number || '-')}</p>
                                <p><strong>الشركة المصنعة:</strong> ${Utils.escapeHTML(asset.manufacturer || '-')}</p>
                                <p><strong>المصنع:</strong> ${Utils.escapeHTML(asset.factoryName || asset.factory || '-')}</p>
                                <p><strong>سنة الصنع:</strong> ${asset.manufacturingYear || '-'}</p>
                                <p><strong>تاريخ الانتاج:</strong> ${asset.productionDate ? Utils.formatDate(asset.productionDate) : '-'}</p>
                                <p><strong>رقم مسلسل الجهاز:</strong> ${Utils.escapeHTML(asset.serialNumber || '-')}</p>
                                <p><strong>حالة الجهاز:</strong> ${this.getStatusBadge(asset.status)}</p>
                                <p><strong>طريقة تثبيت:</strong> ${Utils.escapeHTML(asset.installationMethod || '-')}</p>
                                <p><strong>الموديل:</strong> ${Utils.escapeHTML(asset.model || '-')}</p>
                                <p><strong>تاريخ التركيب:</strong> ${asset.installationDate ? Utils.formatDate(asset.installationDate) : '-'}</p>
                                <p><strong>آخر صيانة:</strong> ${asset.lastServiceDate ? Utils.formatDate(asset.lastServiceDate) : '-'}</p>
                                <p><strong>المسؤول:</strong> ${Utils.escapeHTML(asset.responsible || '-')}</p>
                                ${asset.notes ? `<p><strong>ملاحظات:</strong> ${Utils.escapeHTML(asset.notes)}</p>` : ''}
                            </div>
                        </div>
                        <div class="content-card">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-qrcode ml-2"></i>QR Code للجهاز</h3>
                            </div>
                            <div class="card-body text-center space-y-3">
                                ${qrImage ? `<img src="${qrImage}" alt="QR Code" class="mx-auto h-40 w-40 border border-gray-200 p-2 bg-white">` : '<p class="text-gray-500">لم يتم توليد QR Code</p>'}
                                <div class="flex flex-wrap justify-center gap-2">
                                    <button class="btn-secondary" onclick="FireEquipment.printQr('${asset.id}')">
                                        <i class="fas fa-print ml-2"></i>طباعة QR Code
                                    </button>
                                </div>
                                <p class="text-xs text-gray-500 mt-2">
                                    <i class="fas fa-info-circle ml-1"></i>
                                    للفحص الشهري: استخدم زر "مسح QR Code للفحص الشهري" في الصفحة الرئيسية
                                </p>
                                <p class="text-xs text-gray-400 break-words">${Utils.escapeHTML(asset.qrCodeData || this.generateQrData(asset.id))}</p>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="card-header flex items-center justify-between">
                            <h3 class="card-title"><i class="fas fa-history ml-2"></i>سجل الفحوصات</h3>
                            <span class="text-xs text-gray-400">${inspections.length} فحص</span>
                        </div>
                        <div class="card-body">
                            ${inspections.length ? `
                                <div class="table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto;">
                                    <table class="data-table text-sm" style="width: 100%; min-width: 100%; table-layout: auto;">
                                        <thead>
                                            <tr>
                                                <th style="min-width: 120px;">التاريخ</th>
                                                <th style="min-width: 120px;">المفتش</th>
                                                <th style="min-width: 100px;">الحالة</th>
                                                <th style="min-width: 200px; word-wrap: break-word;">الملاحظات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${inspections.map(item => `
                                                <tr>
                                                    <td style="word-wrap: break-word; white-space: normal;">${Utils.formatDate(item.checkDate)}</td>
                                                    <td style="word-wrap: break-word; white-space: normal;">${Utils.escapeHTML(item.inspector || '-')}</td>
                                                    <td style="word-wrap: break-word;">${this.getStatusBadge(item.status)}</td>
                                                    <td style="word-wrap: break-word; white-space: normal; max-width: 250px;">${Utils.escapeHTML(item.remarks || '-')}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            ` : '<div class="empty-state"><p class="text-gray-500">لا توجد فحوصات مسجلة لهذا الجهاز.</p></div>'}
                        </div>
                    </div>
                </div>
                <div class="modal-footer flex justify-center gap-2 form-actions-centered">
                    <button class="btn-secondary" onclick="FireEquipment.closeModal(this)">إغلاق</button>
                    ${typeof EmailDispatch !== 'undefined' ? EmailDispatch.renderFooterButtonHtml('fire-equipment') : ''}
                    <button class="btn-primary" onclick="FireEquipment.showAssetForm(${assetJson}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>تعديل الجهاز
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        if (typeof EmailDispatch !== 'undefined') {
            EmailDispatch.bindFooterButtons(modal, { moduleKey: 'fire-equipment', record: asset, recordId: asset.id || asset.number || asset.isoCode || '' });
        }

        // إضافة معالج لإغلاق النموذج عند النقر على الخلفية
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // منع إغلاق النموذج عند النقر على المحتوى
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    },

    getInspectionsByAsset(assetId) {
        return this.getInspections()
            .filter(item => item.assetId === assetId)
            .sort((a, b) => new Date(b.checkDate || b.createdAt || 0) - new Date(a.checkDate || a.createdAt || 0));
    },

    getLatestInspection(assetId) {
        const inspections = this.getInspectionsByAsset(assetId);
        return inspections.length ? inspections[0] : null;
    },

    getAssetStats() {
        const assets = this.getAssets();
        const total = assets.length;
        const active = assets.filter(asset => asset.status === 'صالح').length;
        const needsMaintenance = assets.filter(asset => asset.status === 'يحتاج صيانة').length;
        const outOfService = assets.filter(asset => asset.status === 'خارج الخدمة').length;
        return { total, active, needsMaintenance, outOfService };
    },

    /**
     * توليد QR Code Data - يحتوي على DeviceID فقط (ثابت ومُلصق على الجهاز)
     * @param {string} assetId - DeviceID الفريد للجهاز
     * @returns {string} DeviceID فقط
     */
    generateQrData(assetId) {
        // QR Code يحتوي على DeviceID فقط - ثابت ولا يتغير
        return String(assetId || '').trim();
    },

    async persistAll() {
        // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

        // حفظ في Google Sheets - استخدام الطريقة الآمنة
        if (AppState.googleConfig?.appsScript?.enabled) {
            try {
                Utils.safeLog('🔄 بدء حفظ بيانات معدات الحريق...');

                // حفظ Assets - واحد تلو الآخر لتجنب فقدان البيانات
                const assetsPayload = AppState.appData.fireEquipmentAssets || [];
                if (assetsPayload.length > 0) {
                    Utils.safeLog(`📦 حفظ ${assetsPayload.length} جهاز...`);

                    // استخدام saveOrUpdateFireEquipmentAsset بدلاً من saveToSheet
                    const savePromises = assetsPayload.map(async (asset) => {
                        try {
                            await GoogleIntegration.sendRequest({
                                action: 'saveOrUpdateFireEquipmentAsset',
                                data: asset
                            });
                            return { success: true, id: asset.id };
                        } catch (err) {
                            Utils.safeWarn(`⚠️ فشل حفظ الجهاز ${asset.id}:`, err);
                            return { success: false, id: asset.id, error: err };
                        }
                    });

                    const results = await Promise.allSettled(savePromises);
                    const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
                    const failCount = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success)).length;

                    Utils.safeLog(`✅ تم حفظ ${successCount} جهاز، فشل ${failCount}`);
                }

                // حفظ Inspections - نفس الطريقة
                const inspectionsPayload = AppState.appData.fireEquipmentInspections || [];
                if (inspectionsPayload.length > 0) {
                    Utils.safeLog(`📋 حفظ ${inspectionsPayload.length} فحص...`);

                    // يمكن استخدام saveToSheet للفحوصات لأنها لا تسبب نفس المشكلة
                    await GoogleIntegration.sendRequest({
                        action: 'saveToSheet',
                        data: {
                            sheetName: 'FireEquipmentInspections',
                            data: inspectionsPayload
                        }
                    });
                }

                Utils.safeLog('✅ تم حفظ جميع البيانات بنجاح');
            } catch (error) {
                Utils.safeWarn('⚠️ فشل حفظ بيانات معدات الحريق في Google Sheets:', error);

                // استخدام autoSave كبديل فقط في حالة الفشل
                if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.autoSave) {
                    try {
                        const assetsPayload = AppState.appData.fireEquipmentAssets.map(asset => ({ ...asset }));
                        const inspectionsPayload = AppState.appData.fireEquipmentInspections.map(inspection => ({ ...inspection }));
                        await Promise.allSettled([
                            GoogleIntegration.autoSave('FireEquipmentAssets', assetsPayload),
                            GoogleIntegration.autoSave('FireEquipmentInspections', inspectionsPayload)
                        ]);
                    } catch (fallbackError) {
                        Utils.safeWarn('⚠️ فشل حفظ البيانات حتى باستخدام autoSave:', fallbackError);
                    }
                }
            }
        } else if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.autoSave) {
            // إذا لم يكن Google Apps Script مفعّل، نستخدم autoSave
            try {
                const assetsPayload = AppState.appData.fireEquipmentAssets.map(asset => ({ ...asset }));
                const inspectionsPayload = AppState.appData.fireEquipmentInspections.map(inspection => ({ ...inspection }));
                await Promise.allSettled([
                    GoogleIntegration.autoSave('FireEquipmentAssets', assetsPayload),
                    GoogleIntegration.autoSave('FireEquipmentInspections', inspectionsPayload)
                ]);
            } catch (error) {
                Utils.safeWarn('⚠️ فشل حفظ بيانات معدات الحريق في Google Sheets', error);
            }
        }
    },

    /**
     * الحصول على الرابط العام المباشر لفحص أجهزة الإطفاء
     */
    getPublicInspectionUrl(assetId = '', inspector = '') {
        try {
            const loc = window.location;
            const pathParts = loc.pathname.split('/');
            pathParts.pop(); // remove index.html or current file
            const basePath = pathParts.join('/');
            const origin = loc.origin || (loc.protocol + '//' + loc.host);
            let targetUrl = `${origin}${basePath}/public-fire-inspection.html`.replace(/([^:]\/)\/+/g, '$1');

            let query = [];
            if (assetId) query.push(`id=${encodeURIComponent(assetId)}`);
            if (inspector) query.push(`inspector=${encodeURIComponent(inspector)}`);
            if (query.length > 0) targetUrl += `?${query.join('&')}`;

            return targetUrl;
        } catch(e) {
            return `public-fire-inspection.html${assetId ? `?id=${encodeURIComponent(assetId)}` : ''}`;
        }
    },

    /**
     * استخراج قائمة أعضاء فريق السلامة والصحة المهنية حصراً
     */
    getSafetyMembersList() {
        const isResigned = (emp) => {
            if (!emp) return false;
            if (emp.isActive === false || emp.active === false || emp.isActive === 'false' || emp.active === 'false') return true;
            const s = String(emp.status || emp.employeeStatus || emp.workStatus || emp.employmentStatus || '').trim().toLowerCase();
            if (!s) return false;
            return s.includes('مستقيل') || s.includes('استقال') || s.includes('منتهي') || s.includes('فصل') || s.includes('ترك') || s.includes('resign') || s.includes('terminated') || s.includes('inactive') || s.includes('left');
        };

        const isArabicPersonName = (name) => {
            if (!name || name.length < 3) return false;
            if (/[a-zA-Z]/.test(name)) return false;
            return /[\u0600-\u06FF]/.test(name);
        };

        const normalizeKey = (name) => {
            return String(name || '')
                .trim()
                .toLowerCase()
                .replace(/^(م\/|أ\/|د\/|مهندس\/|أستاذ\/|دكتور\/|mr\.|eng\.)\s*/i, '')
                .replace(/[أإآ]/g, 'ا')
                .replace(/ة/g, 'ه')
                .replace(/ى/g, 'ي')
                .replace(/\s+/g, ' ');
        };

        const seen = new Set();
        const members = [];

        const addMember = (rawName) => {
            const clean = String(rawName || '').trim();
            if (!isArabicPersonName(clean)) return;
            const lower = clean.toLowerCase();
            if (lower.includes('admin') || lower.includes('support') || lower.includes('system') || lower.includes('tool') || lower.includes('مجهول') || lower.includes('عامة')) return;
            const key = normalizeKey(clean);
            if (!key || seen.has(key)) return;
            seen.add(key);
            members.push({ name: clean });
        };

        // 1. من قائمة الموظفين Employees
        const employees = AppState.appData?.employees || [];
        employees.forEach(emp => {
            if (isResigned(emp)) return;
            const name = emp.name || emp.employeeName || '';
            const dept = String(emp.department || '').toLowerCase();
            const job = String(emp.job || emp.jobTitle || emp.position || '').toLowerCase();

            if (job.includes('غذاء') || job.includes('food') || dept.includes('جودة') || dept.includes('تصنيع')) return;

            const isHseDept = dept.includes('سلامة') || dept.includes('hse') || dept.includes('صحة مهنية');
            const isHseJob = job.includes('سلامة وصحة') || job.includes('سلامه وصحة') || job.includes('السلامة والصحة') ||
                             job.includes('سلامة مهنية') || job.includes('أخصائي سلامة') || job.includes('اخصائى سلامه') ||
                             job.includes('فني سلامة') || job.includes('فنى سلامة') || job.includes('مشرف سلامة') ||
                             job.includes('مدير السلامة') || job.includes('مفتش سلامة') || job.includes('مسؤول سلامة') ||
                             job.includes('إطفاء') || job.includes('حريق') ||
                             job.includes('hse officer') || job.includes('hse specialist') || job.includes('hse manager');

            if (name && isHseDept && isHseJob) {
                addMember(name);
            }
        });

        // 2. من إعدادات فريق السلامة في CompanySettings
        const settings = AppState.companySettings || {};
        const rawTeam = settings.safetyTeam || settings.safetyTeamMembers || settings.hseTeam;
        if (Array.isArray(rawTeam)) {
            rawTeam.forEach(m => addMember(typeof m === 'string' ? m : m.name));
        } else if (typeof rawTeam === 'string') {
            rawTeam.split(/[\n,]/).forEach(item => addMember(item));
        }

        members.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
        return members;
    },

    /**
     * نافذة رابط وبوستر الفحص الشهري العام لمعدات الإطفاء
     */
    showPublicLinkModal() {
        const baseUrl = this.getPublicInspectionUrl();
        const assets = this.getAssets() || [];
        const safetyMembers = this.getSafetyMembersList();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay fire-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 620px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #ffffff; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(220, 38, 38, 0.2); border: 1px solid rgba(220, 38, 38, 0.4); display: flex; align-items: center; justify-content: center; color: #f87171; font-size: 1.25rem;">
                            <i class="fas fa-fire-extinguisher"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 2px 0;">رابط وبوابة الفحص الشهري الميداني</h2>
                            <p style="font-size: 0.8rem; color: #94a3b8; margin: 0;">بوابة فحص أجهزة الإطفاء بدون تسجيل دخول لمسؤولي السلامة</p>
                        </div>
                    </div>
                    <button class="modal-close" style="color: #94a3b8; font-size: 1.25rem;" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" style="padding: 24px; background: #f8fafc;">
                    <!-- أدوات التخصيص: الجهاز + المفتش -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-fire-extinguisher ml-1 text-red-500"></i> جهاز مخصص (اختياري):
                            </label>
                            <select id="qr-fire-asset-select" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="">— بوابة عامة لجميع الأجهزة —</option>
                                ${assets.map(a => `<option value="${Utils.escapeHTML(a.id)}">${Utils.escapeHTML(a.id)} — ${Utils.escapeHTML(a.number || a.id)} (${Utils.escapeHTML(a.location || '-')})</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-user-shield ml-1 text-emerald-600"></i> مسؤول السلامة المخصص:
                            </label>
                            <select id="qr-fire-inspector-select" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="">— تحديد المفتش بالنموذج —</option>
                                ${safetyMembers.map(m => `<option value="${Utils.escapeHTML(m.name)}">${Utils.escapeHTML(m.name)}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <!-- عرض الـ QR Code -->
                    <div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; text-align: center; margin-bottom: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div id="fire-qr-container" style="display: inline-block; padding: 12px; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 12px;">
                            <img id="fire-qr-img" src="" alt="QR Code" style="width: 180px; height: 180px; display: block;">
                        </div>
                        <div style="font-size: 0.85rem; color: #1e293b; font-weight: 700;" id="fire-qr-target-text">
                            امسح الرمز بكاميرا الهاتف لفتح نموذج فحص الطفاية فوراً
                        </div>
                    </div>

                    <!-- حقل الرابط المباشر -->
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                            <i class="fas fa-link ml-1 text-indigo-500"></i> الرابط المباشر:
                        </label>
                        <div style="display: flex; gap: 8px;">
                            <input type="text" id="fire-public-link-input" readonly value="${baseUrl}" style="flex: 1; padding: 10px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; background: #ffffff; font-size: 0.85rem; direction: ltr; text-align: left;">
                            <button type="button" id="fire-copy-link-btn" class="btn-secondary" style="padding: 10px 16px; border-radius: 8px; font-weight: 700; white-space: nowrap;">
                                <i class="fas fa-copy ml-1"></i> نسخ
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <button type="button" id="fire-print-poster-btn" class="btn-primary" style="padding: 9px 20px; border-radius: 8px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; background: #b91c1c;">
                        <i class="fas fa-print"></i> طباعة بوستر فحص الإطفاء (A4)
                    </button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const assetSelect = modal.querySelector('#qr-fire-asset-select');
        const inspectorSelect = modal.querySelector('#qr-fire-inspector-select');
        const linkInput = modal.querySelector('#fire-public-link-input');
        const qrImg = modal.querySelector('#fire-qr-img');
        const qrText = modal.querySelector('#fire-qr-target-text');
        const copyBtn = modal.querySelector('#fire-copy-link-btn');
        const printBtn = modal.querySelector('#fire-print-poster-btn');

        const updateUrl = () => {
            const assetId = assetSelect.value;
            const inspector = inspectorSelect.value;
            const cleanUrl = this.getPublicInspectionUrl(assetId, inspector);

            let encHash = '';
            try {
                const companyLogoUrl = (typeof AppState !== 'undefined' && (AppState.companyLogo || AppState.companySettings?.logo)) || '';
                const compactPayload = {
                    assets: assets.map(a => ({
                        id: a.id,
                        number: a.number || a.id,
                        type: a.type || 'طفاية حريق',
                        location: a.location || '',
                        subLocation: a.subLocation || '',
                        capacity: a.capacity || '',
                        status: a.status || 'صالح',
                        lastInspection: a.lastInspection || a.lastServiceDate || ''
                    })),
                    safetyMembers: safetyMembers.map(m => m.name),
                    logo: companyLogoUrl
                };
                encHash = '#cfg=' + encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(compactPayload)))));
            } catch(e) {}

            const fullUrl = `${cleanUrl}${encHash}`;
            linkInput.value = fullUrl;

            // توليد QR كود محلي
            let localQrData = '';
            const targetUrlForQr = (fullUrl.length < 900) ? fullUrl : cleanUrl;
            if (typeof qrcode === 'function') {
                try {
                    const qr = qrcode(0, 'M');
                    qr.addData(targetUrlForQr);
                    qr.make();
                    localQrData = qr.createDataURL(5, 4);
                } catch(e) {}
            }
            if (!localQrData && window.QRCode && typeof window.QRCode.generate === 'function') {
                try {
                    localQrData = window.QRCode.generate(cleanUrl, 240);
                } catch(e) {}
            }

            if (localQrData && localQrData.startsWith('data:')) {
                qrImg.src = localQrData;
            } else {
                qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(cleanUrl)}`;
            }

            if (assetId) {
                qrText.textContent = `فحص مخصص للجهاز: ${assetId}`;
            } else {
                qrText.textContent = `بوابة الفحص الشهري الشامل لجميع أجهزة الإطفاء`;
            }
        };

        assetSelect?.addEventListener('change', updateUrl);
        inspectorSelect?.addEventListener('change', updateUrl);
        updateUrl();

        copyBtn?.addEventListener('click', () => {
            navigator.clipboard.writeText(linkInput.value).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check ml-1 text-green-600"></i> تم النسخ!';
                setTimeout(() => { copyBtn.innerHTML = '<i class="fas fa-copy ml-1"></i> نسخ'; }, 2500);
            });
        });

        printBtn?.addEventListener('click', () => {
            const rawUrl = linkInput.value;
            const printWin = window.open('', '_blank');
            if (!printWin) {
                Notification.warning('يرجى السماح بالنوافذ المنبثقة للطباعة');
                return;
            }

            printWin.document.write(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <title>بوستر فحص معدات الإطفاء - HSE</title>
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                    <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"><\/script>
                    <style>
                        @page { size: A4 portrait; margin: 10mm; }
                        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
                        body { font-family: 'Cairo', system-ui, sans-serif; text-align: center; color: #0f172a; margin: 0; padding: 10px; background: #ffffff; }
                        .no-print-bar { margin-bottom: 15px; text-align: left; }
                        .print-now-btn { background: #dc2626; color: #ffffff; border: none; padding: 10px 22px; border-radius: 8px; font-weight: 800; font-family: inherit; font-size: 15px; cursor: pointer; }
                        @media print { .no-print-bar { display: none !important; } }
                        .poster-card { border: 3.5px solid #dc2626; border-radius: 16px; padding: 24px 20px; background: #ffffff; }
                        .doc-badge-row { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px; font-size: 12px; font-weight: 800; color: #475569; }
                        .header-banner { background: #991b1b !important; color: #ffffff !important; padding: 18px 14px; border-radius: 10px; margin-bottom: 18px; }
                        .title { font-size: 25px; font-weight: 900; margin: 0 0 4px 0; color: #ffffff !important; }
                        .sub { font-size: 14px; color: #fecaca !important; margin: 0; font-weight: 700; }
                        .qr-box { background: #ffffff; border: 3px solid #dc2626; border-radius: 16px; padding: 14px; display: inline-block; margin-bottom: 18px; }
                        .qr-img { width: 250px; height: 250px; display: block; margin: 0 auto; object-fit: contain; }
                        .instruction-card { background: #fef2f2 !important; border-right: 5px solid #dc2626; border-radius: 8px; padding: 14px 18px; margin-bottom: 18px; text-align: right; }
                        .instruction-title { font-size: 17px; font-weight: 900; color: #991b1b; margin-bottom: 6px; }
                        .steps-list { font-size: 13.5px; color: #334155; line-height: 1.8; margin: 0; padding-right: 20px; font-weight: 600; }
                        .footer-meta { font-size: 11.5px; color: #64748b; border-top: 1.5px solid #e2e8f0; padding-top: 10px; display: flex; justify-content: space-between; font-weight: 700; }
                    </style>
                </head>
                <body>
                    <div class="no-print-bar">
                        <button class="print-now-btn" onclick="window.print()"><i class="fas fa-print"></i> أمر طباعة البوستر الآن (A4)</button>
                    </div>
                    <div class="poster-card">
                        <div class="doc-badge-row">
                            <div><i class="fas fa-shield-halved"></i> إدارة السلامة والصحة المهنية ومكافحة الحريق (HSE)</div>
                            <div>كود النموذج: DOC-HSE-FEI-01 | الإصدار 02</div>
                        </div>
                        <div class="header-banner">
                            <h1 class="title">بوابة الفحص الشهري الميداني لمعدات الإطفاء</h1>
                            <p class="sub">منظومة فحص ومراقبة صلاحية طفايات الحريق — HSE 360 Platform</p>
                        </div>
                        <div class="qr-box">
                            <img id="printQrImg" src="${qrImg.src}" alt="QR Code" class="qr-img">
                        </div>
                        <div class="instruction-card">
                            <div class="instruction-title"><i class="fas fa-mobile-screen-button"></i> خطوات الفحص الدوري السريع عبر الهاتف المحمول:</div>
                            <ol class="steps-list">
                                <li>افتح تطبيق الكاميرا على هاتفك المحمول ووجّه العدسة نحو رمز الاستجابة السريعة (QR Code) أعلاه.</li>
                                <li>اضغط على الرابط المنبثق لفتح نموذج الفحص الشهري مباشرة دون الحاجة لتسجيل دخول.</li>
                                <li>اختر أو امسح كود الطفاية، ثم تحقق من قراءة الضغط وصمام وتيلة الأمان واضغط حفظ.</li>
                            </ol>
                        </div>
                        <div class="footer-meta">
                            <div>معاً نحو بيئة عمل آمنة ومعدات طوارئ جاهزة دائماً</div>
                            <div>HSE Fire Protection © 2026</div>
                        </div>
                    </div>
                    <script>
                        window.addEventListener('load', function() {
                            setTimeout(function() { window.print(); }, 400);
                        });
                    <\/script>
                </body>
                </html>
            `);
            printWin.document.close();
        });
    },

    /**
     * نافذة طباعة كروت ورموز QR دفعة واحدة لجميع الأجهزة في قاعدة البيانات
     */
    showBatchPrintQrModal() {
        const assets = this.getAssets() || [];
        if (!assets || assets.length === 0) {
            Notification.warning('لا توجد أجهزة إطفاء مسجلة في قاعدة البيانات للطباعة.');
            return;
        }

        // استخراج قائمة المواقع والأنواع الفريدة
        const locations = [...new Set(assets.map(a => a.location).filter(Boolean))].sort();
        const types = [...new Set(assets.map(a => a.type || a.equipmentType).filter(Boolean))].sort();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay fire-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 640px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <div class="modal-header" style="background: linear-gradient(135deg, #0b2a55 0%, #1e40af 100%); color: #ffffff; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #fde68a; font-size: 1.25rem;">
                            <i class="fas fa-print"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 2px 0;">طباعة كروت QR الشاملة لمعدات الإطفاء</h2>
                            <p style="font-size: 0.8rem; color: #bfdbfe; margin: 0;">طباعة ملصقات QR لجميع الأجهزة دفعة واحدة بدلاً من جهاز تلو الآخر</p>
                        </div>
                    </div>
                    <button class="modal-close" style="color: #bfdbfe; font-size: 1.25rem;" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" style="padding: 24px; background: #f8fafc;">
                    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 14px; margin-bottom: 18px; display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-info-circle text-blue-600" style="font-size: 20px;"></i>
                        <div style="font-size: 0.85rem; color: #1e3a8a; font-weight: 700;">
                            إجمالي الأجهزة المسجلة بقاعدة البيانات: <span style="font-size: 1rem; color: #dc2626;" id="batch-total-count">${assets.length}</span> جهاز إطفاء
                        </div>
                    </div>

                    <!-- فلاتر التخصيص -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-map-marker-alt text-blue-600 ml-1"></i> تصفية حسب الموقع:
                            </label>
                            <select id="batch-location-filter" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="all">— جميع المواقع والأقسام —</option>
                                ${locations.map(loc => `<option value="${Utils.escapeHTML(loc)}">${Utils.escapeHTML(loc)}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-fire-extinguisher text-red-600 ml-1"></i> تصفية حسب نوع الجهاز:
                            </label>
                            <select id="batch-type-filter" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="all">— جميع أنواع الطفايات والمعدات —</option>
                                ${types.map(t => `<option value="${Utils.escapeHTML(t)}">${Utils.escapeHTML(t)}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-border-all text-indigo-600 ml-1"></i> مقاس وتخطيط الملصقات:
                            </label>
                            <select id="batch-layout-select" class="form-select" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.88rem;">
                                <option value="2x4">ملصقات قياسية (صفين × 4 = 8 كروت في صفحة A4)</option>
                                <option value="3x4">ملصقات مدمجة (3 أعمدة × 4 = 12 كارت في صفحة A4)</option>
                                <option value="2x3">كروت كبيرة واضحة (صفين × 3 = 6 كروت في صفحة A4)</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-calculator text-emerald-600 ml-1"></i> الأجهزة المحددة للطباعة:
                            </label>
                            <div style="padding: 10px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; font-weight: 800; font-size: 0.95rem; color: #047857;" id="batch-selected-preview">
                                ${assets.length} جهاز جاهز للطباعة
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <button type="button" id="start-batch-print-btn" class="btn-primary" style="padding: 10px 24px; border-radius: 8px; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; background: #1e40af;">
                        <i class="fas fa-print"></i> بدء طباعة مصفوفة الكروت الآن (A4)
                    </button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const locFilter = modal.querySelector('#batch-location-filter');
        const typeFilter = modal.querySelector('#batch-type-filter');
        const layoutSelect = modal.querySelector('#batch-layout-select');
        const previewEl = modal.querySelector('#batch-selected-preview');
        const printBtn = modal.querySelector('#start-batch-print-btn');

        const getSelectedAssets = () => {
            const locVal = locFilter.value;
            const typeVal = typeFilter.value;
            return assets.filter(a => {
                if (locVal !== 'all' && a.location !== locVal) return false;
                if (typeVal !== 'all' && (a.type || a.equipmentType) !== typeVal) return false;
                return true;
            });
        };

        const updatePreview = () => {
            const filtered = getSelectedAssets();
            previewEl.textContent = `${filtered.length} جهاز جاهز للطباعة`;
            printBtn.disabled = filtered.length === 0;
        };

        locFilter.addEventListener('change', updatePreview);
        typeFilter.addEventListener('change', updatePreview);

        printBtn.addEventListener('click', () => {
            const filtered = getSelectedAssets();
            if (filtered.length === 0) {
                Notification.warning('لا توجد أجهزة مطابقة للتصفية.');
                return;
            }
            modal.remove();
            this.batchPrintQrCards(filtered, layoutSelect.value);
        });
    },

    /**
     * تنفيذ الطباعة الجماعية لكروت QR
     */
    batchPrintQrCards(assetsToPrint, layoutType = '2x4') {
        if (!assetsToPrint || assetsToPrint.length === 0) return;

        let gridCols = 2;
        let cardMinHeight = '120px';
        let qrSize = 100;
        let fontSizeTitle = '13px';
        let fontSizeSub = '10.5px';

        if (layoutType === '3x4') {
            gridCols = 3;
            cardMinHeight = '110px';
            qrSize = 85;
            fontSizeTitle = '11.5px';
            fontSizeSub = '9.5px';
        } else if (layoutType === '2x3') {
            gridCols = 2;
            cardMinHeight = '150px';
            qrSize = 125;
            fontSizeTitle = '14px';
            fontSizeSub = '11.5px';
        }

        const printWin = window.open('', '_blank');
        if (!printWin) {
            Notification.error('يرجى السماح بالنوافذ المنبثقة لطباعة كروت QR');
            return;
        }

        // توليد HTML للكروت
        const cardsHtml = assetsToPrint.map(asset => {
            const cleanId = String(asset.id || '').trim();
            const directUrl = this.getPublicInspectionUrl(cleanId);
            
            let qrDataUri = '';
            if (typeof qrcode === 'function') {
                try {
                    const qr = qrcode(0, 'M');
                    qr.addData(directUrl);
                    qr.make();
                    qrDataUri = qr.createDataURL(4, 2);
                } catch(e) {}
            }
            if (!qrDataUri && window.QRCode && typeof window.QRCode.generate === 'function') {
                try {
                    qrDataUri = window.QRCode.generate(directUrl, 140);
                } catch(e) {}
            }
            if (!qrDataUri) {
                qrDataUri = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(directUrl)}`;
            }

            return `
                <div class="qr-card">
                    <div class="qr-card-header">
                        <span class="qr-card-tag"><i class="fas fa-fire-extinguisher"></i> HSE FIRE</span>
                        <span class="qr-card-num">${Utils.escapeHTML(asset.number || asset.id)}</span>
                    </div>
                    <div class="qr-card-body">
                        <div class="qr-card-info">
                            <div class="qr-card-id">${Utils.escapeHTML(cleanId)}</div>
                            <div class="qr-card-type">${Utils.escapeHTML(asset.type || 'طفاية حريق')}${asset.capacity ? ` - ${Utils.escapeHTML(asset.capacity)}` : ''}</div>
                            <div class="qr-card-loc"><i class="fas fa-map-pin"></i> ${Utils.escapeHTML(asset.location || '-')}${asset.subLocation ? ` (${Utils.escapeHTML(asset.subLocation)})` : ''}</div>
                            <div class="qr-card-inst">امسح للفحص الشهري</div>
                        </div>
                        <div class="qr-card-img-wrap">
                            <img src="${qrDataUri}" alt="QR ${cleanId}" class="qr-code-img">
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        printWin.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>ملصقات وكروت QR معدات الإطفاء (${assetsToPrint.length} جهاز)</title>
                <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <style>
                    @page { size: A4 portrait; margin: 6mm; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
                    body { font-family: 'Cairo', system-ui, sans-serif; color: #0f172a; margin: 0; padding: 6px; background: #ffffff; }
                    .no-print-bar { margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0; }
                    .print-btn { background: #1e40af; color: #fff; border: none; padding: 8px 20px; border-radius: 6px; font-weight: 800; font-family: inherit; font-size: 14px; cursor: pointer; }
                    @media print { .no-print-bar { display: none !important; } }
                    
                    .cards-grid {
                        display: grid;
                        grid-template-columns: repeat(${gridCols}, 1fr);
                        gap: 7mm;
                    }
                    
                    .qr-card {
                        border: 2px dashed #94a3b8;
                        border-radius: 10px;
                        padding: 8px 10px;
                        background: #ffffff;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        min-height: ${cardMinHeight};
                        page-break-inside: avoid;
                        break-inside: avoid;
                        position: relative;
                    }
                    
                    .qr-card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1.5px solid #e2e8f0;
                        padding-bottom: 4px;
                        margin-bottom: 6px;
                    }
                    
                    .qr-card-tag {
                        font-size: 9px;
                        font-weight: 800;
                        color: #dc2626;
                        display: inline-flex;
                        align-items: center;
                        gap: 3px;
                    }
                    
                    .qr-card-num {
                        font-size: 9.5px;
                        font-weight: 800;
                        color: #475569;
                    }
                    
                    .qr-card-body {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 8px;
                    }
                    
                    .qr-card-info {
                        flex: 1;
                        text-align: right;
                    }
                    
                    .qr-card-id {
                        font-size: ${fontSizeTitle};
                        font-weight: 900;
                        color: #0b2a55;
                        letter-spacing: 0.5px;
                        margin-bottom: 2px;
                    }
                    
                    .qr-card-type {
                        font-size: ${fontSizeSub};
                        font-weight: 800;
                        color: #dc2626;
                        margin-bottom: 2px;
                    }
                    
                    .qr-card-loc {
                        font-size: ${fontSizeSub};
                        font-weight: 700;
                        color: #334155;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 145px;
                        margin-bottom: 4px;
                    }
                    
                    .qr-card-inst {
                        font-size: 8.5px;
                        font-weight: 700;
                        color: #64748b;
                        background: #f1f5f9;
                        padding: 2px 6px;
                        border-radius: 4px;
                        display: inline-block;
                    }
                    
                    .qr-card-img-wrap {
                        flex: 0 0 auto;
                    }
                    
                    .qr-code-img {
                        width: ${qrSize}px;
                        height: ${qrSize}px;
                        display: block;
                        border: 1px solid #cbd5e1;
                        border-radius: 6px;
                        padding: 2px;
                        background: #fff;
                    }
                </style>
            </head>
            <body>
                <div class="no-print-bar">
                    <div style="font-weight: 800; color: #1e3a8a;">
                        جاهز لطباعة ملصقات ${assetsToPrint.length} جهاز إطفاء (A4 Sheet)
                    </div>
                    <button class="print-btn" onclick="window.print()"><i class="fas fa-print"></i> أمر الطباعة الآن</button>
                </div>

                <div class="cards-grid">
                    ${cardsHtml}
                </div>

                <script>
                    window.addEventListener('load', function() {
                        setTimeout(function() { window.print(); }, 400);
                    });
                <\/script>
            </body>
            </html>
        `);
        printWin.document.close();
    },

    printQr(assetId) {
        const asset = this.getAssets().find(item => item.id === assetId);
        if (!asset) {
            Notification.error('لا يمكن العثور على الجهاز المحدد.');
            return;
        }

        const directUrl = this.getPublicInspectionUrl(asset.id);
        let qrImage = '';
        if (typeof qrcode === 'function') {
            try {
                const qr = qrcode(0, 'M');
                qr.addData(directUrl);
                qr.make();
                qrImage = qr.createDataURL(6, 4);
            } catch(e) {}
        }
        if (!qrImage && typeof QRCode !== 'undefined') {
            qrImage = QRCode.generate(directUrl, 260);
        }
        if (!qrImage) {
            qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(directUrl)}`;
        }

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            Notification.error('يرجى السماح للنوافذ المنبثقة لطباعة QR Code');
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <title>QR Code - ${Utils.escapeHTML(asset.number || asset.id)}</title>
                <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;800;900&display=swap" rel="stylesheet">
                <style>
                    body { font-family: 'Cairo', Arial, sans-serif; text-align: center; padding: 24px; color: #0f172a; }
                    .card-box { border: 3px solid #dc2626; border-radius: 16px; padding: 20px; max-width: 380px; margin: 0 auto; }
                    .tag { color: #dc2626; font-weight: 800; font-size: 13px; margin-bottom: 6px; }
                    .id-title { font-size: 22px; font-weight: 900; color: #0b2a55; margin: 0 0 6px 0; }
                    img { width: 220px; height: 220px; margin: 12px auto; display: block; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 6px; }
                    .info { margin: 4px 0; font-size: 13px; color: #334155; font-weight: 700; }
                    .hint { font-size: 11px; color: #64748b; margin-top: 10px; border-top: 1px dashed #cbd5e1; padding-top: 8px; }
                </style>
            </head>
            <body>
                <div class="card-box">
                    <div class="tag">منظومة فحص معدات الإطفاء — HSE</div>
                    <div class="id-title">${Utils.escapeHTML(asset.id)}</div>
                    <p class="info"><strong>النوع:</strong> ${Utils.escapeHTML(asset.type || 'طفاية حريق')}${asset.capacity ? ` - ${Utils.escapeHTML(asset.capacity)}` : ''}</p>
                    <p class="info"><strong>الموقع:</strong> ${Utils.escapeHTML(asset.location || '-')}</p>
                    <img src="${qrImage}" alt="QR Code">
                    <div class="hint">امسح الرمز بكاميرا الهاتف للفحص الشهري المباشر</div>
                </div>
                <script>window.onload = () => setTimeout(() => window.print(), 300);<\/script>
            </body>
            </html>
        `);
        printWindow.document.close();
    },

    toISODate(value) {
        if (!value) return '';
        try {
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return '';
            return date.toISOString();
        } catch (error) {
            return '';
        }
    },

    /**
     * عرض نافذة إدارة أنواع الأجهزة
     */
    showManageTypesModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay fire-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-cog"></i>
                        إدارة أنواع الأجهزة
                    </h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <label class="form-label">إضافة نوع جديد</label>
                        <div class="flex gap-2">
                            <input type="text" id="new-type-input" class="form-input flex-1" placeholder="أدخل نوع الجهاز الجديد">
                            <button type="button" id="add-type-btn" class="btn-primary">
                                <i class="fas fa-plus ml-2"></i>إضافة
                            </button>
                        </div>
                    </div>
                    <div>
                        <label class="form-label">الأنواع الحالية</label>
                        <div id="types-list" class="space-y-2 max-h-64 overflow-y-auto p-3 border rounded">
                            ${this.assetTypes.map((type, index) => `
                                <div class="flex items-center justify-between p-2 bg-gray-50 rounded" data-type-index="${index}">
                                    <span>${Utils.escapeHTML(type)}</span>
                                    <button type="button" class="btn-icon btn-icon-danger btn-remove-type" data-type-index="${index}" title="حذف">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="modal-footer form-actions-centered">
                    <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">إغلاق</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // زر إضافة نوع جديد
        const addTypeBtn = modal.querySelector('#add-type-btn');
        const newTypeInput = modal.querySelector('#new-type-input');
        addTypeBtn.addEventListener('click', () => {
            const newType = newTypeInput.value.trim();
            if (!newType) {
                Notification.warning('يرجى إدخال نوع الجهاز');
                return;
            }
            if (this.assetTypes.includes(newType)) {
                Notification.warning('هذا النوع موجود بالفعل');
                return;
            }
            this.assetTypes.push(newType);
            newTypeInput.value = '';
            this.refreshTypesList(modal);
            Notification.success('تم إضافة النوع بنجاح');
        });

        // أزرار حذف الأنواع
        modal.addEventListener('click', (e) => {
            if (e.target.closest('.btn-remove-type')) {
                const index = parseInt(e.target.closest('.btn-remove-type').dataset.typeIndex);
                if (confirm('هل أنت متأكد من حذف هذا النوع؟')) {
                    this.assetTypes.splice(index, 1);
                    this.refreshTypesList(modal);
                    Notification.success('تم حذف النوع بنجاح');
                }
            }
        });

        // إزالة الإغلاق التلقائي عند النقر على الخلفية
    },

    /**
     * تحديث قائمة الأنواع في النافذة
     */
    refreshTypesList(modal) {
        const typesList = modal.querySelector('#types-list');
        if (typesList) {
            typesList.innerHTML = this.assetTypes.map((type, index) => `
                <div class="flex items-center justify-between p-2 bg-gray-50 rounded" data-type-index="${index}">
                    <span>${Utils.escapeHTML(type)}</span>
                    <button type="button" class="btn-icon btn-icon-danger btn-remove-type" data-type-index="${index}" title="حذف">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    },

    /**
     * عرض نافذة استيراد Excel
     */
    showImportExcelModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay fire-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-file-import ml-2"></i>
                        استيراد من ملف Excel
                    </h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <label class="form-label">اختر ملف Excel</label>
                        <input type="file" id="excel-file-input" accept=".xlsx,.xls" class="form-input">
                        <p class="text-xs text-gray-500 mt-2">يجب أن يحتوي الملف على الأعمدة: مكان/موقع الجهاز، الموقع الفرعي، نوع الجهاز، السعة/كجم، رقم الجهاز بالموقع، الشركة المصنعة، المصنع، سنة الصنع، تاريخ الانتاج، رقم مسلسل الجهاز، حالة الجهاز، طريقة تثبيت، ملاحظات</p>
                    </div>
                    <div id="import-preview" class="hidden">
                        <h3 class="text-lg font-semibold mb-2">معاينة البيانات</h3>
                        <div class="table-wrapper" style="width: 100%; max-width: 100%; max-height: 16rem; overflow-x: auto; overflow-y: auto;">
                            <table class="data-table" id="preview-table" style="width: 100%; min-width: 100%; table-layout: auto;">
                                <thead id="preview-head"></thead>
                                <tbody id="preview-body"></tbody>
                            </table>
                        </div>
                        <p class="text-sm text-gray-600 mt-2" id="preview-count"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">إلغاء</button>
                    <button type="button" id="confirm-import-btn" class="btn-primary" disabled>
                        <i class="fas fa-check ml-2"></i>استيراد البيانات
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const fileInput = modal.querySelector('#excel-file-input');
        const confirmBtn = modal.querySelector('#confirm-import-btn');
        const previewContainer = modal.querySelector('#import-preview');
        const previewHead = modal.querySelector('#preview-head');
        const previewBody = modal.querySelector('#preview-body');
        const previewCount = modal.querySelector('#preview-count');
        let importedData = [];

        // تحميل SheetJS إذا لم يكن محملاً
        const loadSheetJS = () => {
            if (typeof XLSX === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
                script.onerror = function () {
                    this.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
                };
                script.onload = () => {
                    fileInput.addEventListener('change', (e) => {
                        this.handleExcelFile(e.target.files[0], modal, confirmBtn, previewContainer, previewHead, previewBody, previewCount, (data) => {
                            importedData = data;
                        });
                    });
                };
                document.head.appendChild(script);
            } else {
                fileInput.addEventListener('change', (e) => {
                    this.handleExcelFile(e.target.files[0], modal, confirmBtn, previewContainer, previewHead, previewBody, previewCount, (data) => {
                        importedData = data;
                    });
                });
            }
        };

        loadSheetJS();

        confirmBtn.addEventListener('click', async () => {
            if (importedData.length === 0) {
                Notification.error('يرجى تحميل ملف Excel أولاً');
                return;
            }
            await this.processImport(importedData, modal);
        });

        // إزالة الإغلاق التلقائي عند النقر على الخلفية
    },

    /**
     * معالجة ملف Excel
     */
    async handleExcelFile(file, modal, confirmBtn, previewContainer, previewHead, previewBody, previewCount, callback) {
        if (!file) return;

        if (typeof XLSX === 'undefined') {
            Notification.error('مكتبة Excel غير متوفرة. جاري تحميلها...');
            return;
        }

        Loading.show('جاري قراءة الملف...');
        try {
            const buffer = await file.arrayBuffer();
            const workbook = XLSX.read(buffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            if (jsonData.length === 0) {
                Notification.error('الملف فارغ أو لا يحتوي على بيانات');
                Loading.hide();
                return;
            }

            // حساب آخر رقم مستخدم حالياً لتوليد أرقام متسلسلة صحيحة
            const assets = this.getAssets();
            const existingNumbers = assets
                .map(a => a.id)
                .filter(id => id && id.match(/^EFA-\d{4}$/))
                .map(id => parseInt(id.split('-')[1]))
                .filter(num => !isNaN(num));

            let nextSequenceNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

            const data = jsonData.map(row => {
                // توليد ID متسلسل بناءً على العداد المحلي للحلقة
                const paddedNumber = String(nextSequenceNumber).padStart(4, '0');
                const assetId = `EFA-${paddedNumber}`;
                nextSequenceNumber++; // زيادة العداد للصف التالي

                return {
                    id: assetId,
                    location: row['مكان / موقع الجهاز'] || row['مكان الجهاز'] || row['الموقع'] || '',
                    subLocation: row['الموقع الفرعي'] || '',
                    type: row['نوع الجهاز'] || '',
                    capacity: row['السعة / كجم'] || row['السعة'] || '',
                    capacityKg: row['السعة / كجم'] || row['السعة'] || '',
                    siteNumber: row['رقم الجهاز بالموقع'] || row['رقم الجهاز'] || '',
                    number: row['رقم الجهاز بالموقع'] || row['رقم الجهاز'] || '',
                    manufacturer: row['الشركة المصنعة'] || '',
                    factory: row['المصنع'] || '',
                    manufacturingYear: row['سنة الصنع'] ? parseInt(row['سنة الصنع']) : null,
                    productionDate: row['تاريخ الانتاج'] ? this.parseDate(row['تاريخ الانتاج']) : '',
                    serialNumber: row['رقم مسلسل الجهاز'] || row['الرقم المسلسل'] || '',
                    status: row['حالة الجهاز'] || 'صالح',
                    installationMethod: row['طريقة تثبيت'] || '',
                    notes: row['ملاحظات'] || '',
                    qrCodeData: this.generateQrData(assetId),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
            }).filter(item => item.location && item.type);

            if (data.length > 0) {
                const headers = Object.keys(jsonData[0]);
                previewHead.innerHTML = `<tr>${headers.map(h => `<th>${Utils.escapeHTML(h)}</th>`).join('')}</tr>`;
                previewBody.innerHTML = jsonData.slice(0, 5).map(row =>
                    `<tr>${headers.map(h => `<td>${Utils.escapeHTML(String(row[h] || ''))}</td>`).join('')}</tr>`
                ).join('');
                previewCount.textContent = `إجمالي الصفوف المراد استيرادها: ${data.length}`;
                previewContainer.classList.remove('hidden');
                confirmBtn.disabled = false;
                callback(data);
            } else {
                Notification.error('لا توجد بيانات صحيحة للاستيراد');
            }

            Loading.hide();
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ أثناء قراءة الملف: ' + error.message);
            console.error(error);
        }
    },

    /**
     * معالجة البيانات المستوردة
     */
    /**
     * معالجة البيانات المستوردة
     */
    async processImport(importedData, modal) {
        if (!importedData || importedData.length === 0) {
            Notification.error('لا توجد بيانات للمعالجة');
            return;
        }

        Loading.show('جاري استيراد البيانات وحفظها في قاعدة البيانات...');
        try {
            let successCount = 0;
            let failCount = 0;
            const total = importedData.length;

            // استخدام Backend للحفظ المباشر
            if (GoogleIntegration && AppState.googleConfig?.appsScript?.enabled) {
                // تقسيم البيانات إلى دفعات صغيرة لتجنب مشاكل الشبكة
                const BATCH_SIZE = 5;

                for (let i = 0; i < total; i += BATCH_SIZE) {
                    const batch = importedData.slice(i, i + BATCH_SIZE);
                    const promises = batch.map(item => {
                        return GoogleIntegration.sendRequest({
                            action: 'saveOrUpdateFireEquipmentAsset',
                            data: item
                        }).then(res => {
                            if (res.success) successCount++;
                            else failCount++;
                            return res;
                        }).catch(err => {
                            failCount++;
                            console.error(`Failed to save asset ${item.id}:`, err);
                            return { success: false, error: err };
                        });
                    });

                    // انتظار انتهاء الدفعة
                    await Promise.allSettled(promises);

                    // تحديث نسبة التقدم
                    const progress = Math.min(100, Math.round(((i + batch.length) / total) * 100));
                    Loading.show(`جاري استيراد البيانات... ${progress}% (${successCount} ناجح)`);
                }

                // إعادة تحميل البيانات بالكامل من Backend لضمان التطابق
                await this.loadAssetsFromBackend();

            } else {
                // Fallback للوضع المحلي (غير متصل)
                // هذا الجزء يعمل فقط في حالة عدم وجود اتصال بالخادم
                const assets = this.getAssets();
                let localUpdates = 0;
                let localAdds = 0;

                importedData.forEach(item => {
                    const existing = assets.find(a => a.id === item.id);
                    if (existing) {
                        Object.assign(existing, item);
                        existing.updatedAt = new Date().toISOString();
                        localUpdates++;
                    } else {
                        assets.push(item);
                        localAdds++;
                    }
                });

                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }
                successCount = localAdds + localUpdates;
            }

            Loading.hide();

            if (failCount > 0) {
                Notification.warning(`تم الاستيراد: ${successCount} ناجح، ${failCount} فشل.`);
            } else {
                Notification.success(`تم استيراد ${successCount} سجل بنجاح.`);
            }

            if (modal) modal.remove();

            // تحديث الواجهة
            if (this.state.currentTab === 'register') {
                const tableContainer = document.getElementById('fire-register-table');
                if (tableContainer) {
                    tableContainer.innerHTML = this.renderRegisterTable();
                    this.bindRegisterTableEvents(tableContainer);
                }
            } else {
                this.renderAssets();
            }

            // تحديث الإحصائيات إذا لزم الأمر
            this.renderStats();

        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ أثناء الاستيراد: ' + error.message);
            console.error(error);
        }
    },

    /**
     * تحويل تاريخ من تنسيقات مختلفة
     */
    parseDate(dateValue) {
        if (!dateValue) return '';
        if (dateValue instanceof Date) {
            return dateValue.toISOString();
        }
        // معالجة Excel serial date مع دعم الوقت (الجزء الكسري)
        if (typeof dateValue === 'number') {
            // Excel يخزن التاريخ كعدد الأيام من 1899-12-30
            // والوقت كجزء كسري من اليوم
            const totalDays = Math.floor(dateValue);
            const timeFraction = dateValue - totalDays;
            const baseDate = new Date(1899, 11, 30); // 30 ديسمبر 1899 (التوقيت المحلي)
            const date = new Date(baseDate.getTime() + totalDays * 24 * 60 * 60 * 1000);
            // إضافة الوقت من الجزء الكسري
            if (timeFraction > 0) {
                const totalSeconds = Math.round(timeFraction * 24 * 60 * 60);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                date.setHours(hours, minutes, seconds, 0);
            }
            return date.toISOString();
        }
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
            return date.toISOString();
        }
        return '';
    },

    /**
     * تصدير السجل إلى Excel
     */
    exportToExcel() {
        if (typeof XLSX === 'undefined') {
            Notification.error('مكتبة Excel غير متوفرة. جاري تحميلها...');
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
            script.onerror = function () {
                this.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
            };
            script.onload = () => this.exportToExcel();
            document.head.appendChild(script);
            return;
        }

        Loading.show('جاري تصدير البيانات...');
        try {
            const assets = this.getAssets();
            const data = assets.map(asset => ({
                'المصنع': asset.factoryName || asset.factory || '',
                'الموقع الفرعي': asset.subLocationName || asset.subLocation || '',
                'مكان / موقع الجهاز': asset.location || '',
                'نوع الجهاز': asset.type || '',
                'السعة / كجم': asset.capacity || asset.capacityKg || '',
                'رقم الجهاز بالموقع': asset.siteNumber || asset.number || '',
                'الشركة المصنعة': asset.manufacturer || '',
                'سنة الصنع': asset.manufacturingYear || '',
                'رقم مسلسل الجهاز': asset.serialNumber || '',
                'حالة الجهاز': asset.status || '',
                'طريقة تثبيت': asset.installationMethod || '',
                'ملاحظات': asset.notes || ''
            }));

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'سجل معدات الاطفاء');

            const fileName = `سجل_معدات_الاطفاء_${new Date().toISOString().split('T')[0]}.xlsx`;
            XLSX.writeFile(workbook, fileName);

            Loading.hide();
            Notification.success('تم تصدير البيانات بنجاح');
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ أثناء التصدير: ' + error.message);
            console.error(error);
        }
    },

    /**
     * تصدير السجل إلى PDF
     */
    async exportRegisterToPDF() {
        const assets = this.getAssets();
        if (assets.length === 0) {
            Notification.warning('لا توجد بيانات للتصدير');
            return;
        }

        Loading.show('جاري إنشاء PDF...');
        try {
            // استخدام window.print() إذا لم تكن مكتبة jsPDF متوفرة
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                Notification.error('يرجى السماح للنوافذ المنبثقة لعرض التقرير');
                Loading.hide();
                return;
            }

            const rows = assets.map(asset => `
                <tr>
                    <td>${Utils.escapeHTML(asset.factoryName || asset.factory || '-')}</td>
                    <td>${Utils.escapeHTML(asset.subLocationName || asset.subLocation || '-')}</td>
                    <td>${Utils.escapeHTML(asset.location || '-')}</td>
                    <td>${Utils.escapeHTML(asset.type || '-')}</td>
                    <td>${Utils.escapeHTML(asset.capacity || asset.capacityKg || '-')}</td>
                    <td>${Utils.escapeHTML(asset.siteNumber || asset.number || '-')}</td>
                    <td>${Utils.escapeHTML(asset.manufacturer || '-')}</td>
                    <td>${Utils.escapeHTML(asset.manufacturingYear || '-')}</td>
                    <td>${Utils.escapeHTML(asset.serialNumber || '-')}</td>
                    <td>${Utils.escapeHTML(asset.status || '-')}</td>
                    <td>${Utils.escapeHTML(asset.installationMethod || '-')}</td>
                    <td>${Utils.escapeHTML(asset.notes || '-')}</td>
                </tr>
            `).join('');

            const htmlContent = `
                <!DOCTYPE html>
                <html dir="rtl" lang="ar">
                <head>
                    <meta charset="UTF-8">
                    <title>سجل معدات الاطفاء والانذار</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            direction: rtl;
                            padding: 20px;
                        }
                        h1 {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                            font-size: 11px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: right;
                        }
                        th {
                            background-color: #3b82f6;
                            color: white;
                            font-weight: bold;
                        }
                        tr:nth-child(even) {
                            background-color: #f9fafb;
                        }
                        @media print {
                            body { padding: 10px; }
                            table { font-size: 9px; }
                            th, td { padding: 5px; }
                        }
                    </style>
                </head>
                <body>
                    <h1>سجل معدات الاطفاء والانذار</h1>
                    <p style="text-align: center;">تاريخ التصدير: ${new Date().toLocaleDateString('ar-SA')}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>المصنع</th>
                                <th>الموقع الفرعي</th>
                                <th>مكان / موقع الجهاز</th>
                                <th>نوع الجهاز</th>
                                <th>السعة / كجم</th>
                                <th>رقم الجهاز بالموقع</th>
                                <th>الشركة المصنعة</th>
                                <th>سنة الصنع</th>
                                <th>رقم مسلسل الجهاز</th>
                                <th>حالة الجهاز</th>
                                <th>طريقة تثبيت</th>
                                <th>ملاحظات</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                    <script>window.onload = () => setTimeout(() => window.print(), 500);</script>
                </body>
                </html>
            `;

            printWindow.document.write(htmlContent);
            printWindow.document.close();

            Loading.hide();
            Notification.success('تم إنشاء PDF بنجاح');
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ أثناء إنشاء PDF: ' + error.message);
            console.error(error);
        }
    },

    /**
     * التحقق من أن المستخدم الحالي هو مدير النظام
     */
    isAdmin() {
        if (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserEffectiveAdmin === 'function') {
            return Permissions.isCurrentUserEffectiveAdmin();
        }
        const currentUser = (typeof AppState !== 'undefined' && AppState) ? AppState.currentUser : null;
        return !!(currentUser && (
            currentUser.role === 'admin' ||
            currentUser.role === 'مدير النظام' ||
            currentUser.role === 'system_admin' ||
            (currentUser.permissions && (currentUser.permissions.admin === true || currentUser.permissions['manage-modules'] === true))
        ));
    },

    /**
     * التحقق من صلاحية الوصول لتبويب معين
     */
    hasTabAccess(tabName) {
        const user = (typeof AppState !== 'undefined' && AppState) ? AppState.currentUser : null;

        // عند عدم توفر المستخدم بعد (تحميل متأخر)، إظهار التبويب الأساسي لتجنب واجهة فارغة
        if (!user) return tabName === 'database';

        // المدير لديه صلاحيات كاملة
        if (this.isAdmin()) return true;

        // التحقق من الصلاحيات التفصيلية
        if (typeof Permissions !== 'undefined') {
            return Permissions.hasDetailedPermission('fire-equipment', tabName);
        }

        // افتراضياً، نعطي الوصول (للتوافق مع المستخدمين القدامى)
        return true;
    },

    /**
     * التحقق من صلاحية المستخدم للإضافة
     */
    canAdd() {
        const user = (typeof AppState !== 'undefined' && AppState) ? AppState.currentUser : null;

        if (!user) return false;

        // المدير لديه صلاحيات كاملة
        if (this.isAdmin()) return true;

        // التحقق من الصلاحيات المخصصة
        const permissions = user.permissions?.fireEquipment || {};
        return permissions.add === true || permissions.edit === true;
    },

    /**
     * التحقق من صلاحية المستخدم للتعديل
     */
    canEdit() {
        const user = (typeof AppState !== 'undefined' && AppState) ? AppState.currentUser : null;

        if (!user) return false;

        // المدير لديه صلاحيات كاملة
        if (this.isAdmin()) return true;

        // التحقق من الصلاحيات المخصصة
        const permissions = user.permissions?.fireEquipment || {};
        return permissions.edit === true;
    },

    /**
     * التحقق من صلاحية المستخدم للحذف
     */
    canDelete() {
        const user = (typeof AppState !== 'undefined' && AppState) ? AppState.currentUser : null;

        if (!user) return false;

        // المدير لديه صلاحيات كاملة
        if (this.isAdmin()) return true;

        // التحقق من الصلاحيات المخصصة
        const permissions = user.permissions?.fireEquipment || {};
        return permissions.delete === true;
    },

    /**
     * حذف جهاز
     */
    async deleteAsset(assetId) {
        if (!this.canDelete()) {
            Notification.error('ليس لديك صلاحية لحذف الأجهزة. يجب أن تكون مدير النظام أو لديك صلاحية الحذف.');
            return;
        }

        const asset = this.getAssets().find(a => a.id === assetId);
        if (!asset) {
            Notification.error('لم يتم العثور على الجهاز');
            return;
        }

        const confirmed = confirm(`هل أنت متأكد من حذف الجهاز "${asset.number || assetId}"؟\n\nسيتم حذف الجهاز وجميع الفحوصات المرتبطة به نهائياً.`);
        if (!confirmed) return;

        Loading.show();
        try {
            // ✅ حذف من Google Sheets أولاً (قبل الحذف المحلي)
            let deleteSuccess = false;
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                try {
                    const deleteResult = await GoogleIntegration.sendRequest({
                        action: 'deleteFireEquipment',
                        data: { assetId: assetId }
                    });

                    if (deleteResult && deleteResult.success) {
                        deleteSuccess = true;
                        Utils.safeLog('✅ تم حذف الجهاز من Backend بنجاح');
                    } else {
                        const errorMsg = deleteResult?.message || 'فشل حذف الجهاز من Backend';
                        Utils.safeWarn('⚠️ فشل حذف الجهاز من Backend:', errorMsg);
                        // استمرار الحذف المحلي حتى لو فشل Backend
                    }
                } catch (error) {
                    Utils.safeWarn('⚠️ خطأ في حذف الجهاز من Backend:', error);
                    // استمرار الحذف المحلي حتى لو فشل Backend
                }
            } else {
                // إذا لم يكن Backend متاحاً، نعتبر الحذف ناجحاً محلياً
                deleteSuccess = true;
            }

            // ✅ حذف من القائمة المحلية
            const assets = this.getAssets();
            const assetIndex = assets.findIndex(a => a.id === assetId);
            if (assetIndex > -1) {
                assets.splice(assetIndex, 1);
            }

            // ✅ حذف الفحوصات المرتبطة
            const inspections = this.getInspections();
            const relatedInspections = inspections.filter(ins => ins.assetId === assetId);
            relatedInspections.forEach(ins => {
                const insIndex = inspections.findIndex(i => i.id === ins.id);
                if (insIndex > -1) {
                    inspections.splice(insIndex, 1);
                }
            });

            // ✅ حذف طلبات الموافقة المرتبطة (إن وجدت)
            if (AppState.appData && AppState.appData.fireEquipmentApprovalRequests) {
                const approvalRequests = AppState.appData.fireEquipmentApprovalRequests;
                const relatedRequests = approvalRequests.filter(req => req.assetId === assetId);
                relatedRequests.forEach(req => {
                    const reqIndex = approvalRequests.findIndex(r => r.id === req.id);
                    if (reqIndex > -1) {
                        approvalRequests.splice(reqIndex, 1);
                    }
                });
            }

            // ✅ حفظ التغييرات محلياً (بدون مزامنة مع Backend)
            if (!AppState.appData) AppState.appData = {};
            AppState.appData.fireEquipmentAssets = assets;
            AppState.appData.fireEquipmentInspections = inspections;
            
            // حفظ في localStorage مباشرة (بدون استدعاء persistAll الذي قد يزامن مع Backend)
            if (typeof DataManager !== 'undefined' && DataManager.save) {
                DataManager.save();
            } else {
                localStorage.setItem('fire_equipment_assets', JSON.stringify(assets));
                localStorage.setItem('fire_equipment_inspections', JSON.stringify(inspections));
            }

            Utils.safeLog('✅ تم حذف الجهاز محلياً');

            Notification.success('تم حذف الجهاز بنجاح');

            // ✅ تحديث التبويب الحالي (بدون إعادة تحميل من Backend)
            // skipSync = true يمنع إعادة تحميل البيانات من Backend
            await this.refreshCurrentTab(true);

            // ✅ منع المزامنة التلقائية بعد الحذف
            // لا نستدعي loadFireEquipmentDataAsync() أو أي دالة تحميل من Backend
            // لأن ذلك قد يعيد الجهاز المحذوف إذا لم يتم حذفه من Backend بشكل صحيح
            
            // ✅ تحديث الإحصائيات والفلترة بعد الحذف
            if (this.state.currentTab === 'database') {
                this.refreshFilterOptions();
                this.renderSummary();
            } else if (this.state.currentTab === 'register') {
                this.updateRegisterStatisticsCards();
            }
            
        } catch (error) {
            Utils.safeError('❌ خطأ في حذف الجهاز:', error);
            Notification.error('حدث خطأ أثناء حذف الجهاز');
        } finally {
            Loading.hide();
        }
    },

    // ذاكرة الرسوم البيانية للتحليل
    _fireAnalyticsCharts: {},
    _fireAnalyticsPeriod: '0',
    _fireAnalyticsFilters: {},

    /** تحميل Chart.js عند الحاجة */
    async _fireEnsureChartJS() {
        if (typeof Chart !== 'undefined') return true;
        const existing = document.querySelector('script[src*="chart.js"],script[src*="chartjs"]');
        if (existing) {
            return new Promise(resolve => {
                let tries = 0;
                const t = setInterval(() => {
                    if (typeof Chart !== 'undefined') { clearInterval(t); resolve(true); }
                    else if (++tries > 50) { clearInterval(t); resolve(false); }
                }, 100);
            });
        }
        return new Promise(resolve => {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
            s.onload = () => resolve(true);
            s.onerror = () => {
                const s2 = document.createElement('script');
                s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js';
                s2.onload = () => resolve(true);
                s2.onerror = () => resolve(false);
                document.head.appendChild(s2);
            };
            document.head.appendChild(s);
        });
    },

    /**
     * عرض تبويب تحليل البيانات الشامل المنمق على نمط مهمات الوقاية
     */
    async renderAnalyticsTab() {
        if (!this.isAdmin()) {
            return '<div class="empty-state"><p class="text-gray-500">ليس لديك صلاحية للوصول إلى هذا القسم. يجب أن تكون مدير النظام.</p></div>';
        }

        // تحميل Chart.js مبكراً
        this._fireEnsureChartJS().catch(() => {});

        return `
        <div id="fire-analytics-root" style="font-family:inherit;">

            <!-- ═══ شريط الأدوات والبانر الرئيسي ═══ -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#DC2626 0%,#B91C1C 50%,#7F1D1D 100%);border-radius:14px;color:#fff;box-shadow:0 8px 28px rgba(220, 38, 38, 0.32);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:46px;height:46px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;backdrop-filter: blur(8px);font-size:22px;">
                        <i class="fas fa-fire-extinguisher"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">لوحة تحليل معدات وأجهزة الإطفاء</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.9;">تحليل شامل • الجاهزية التشغيلية • الفحوصات الشهرية • المواقع والمباني • الصيانة • تصدير PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-inline-end:2px;">الفترة:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${['30','90','180','365','0'].map((v,i) => {
                            const labels=['30 يوم','3 أشهر','6 أشهر','سنة','الكل'];
                            const active=(this._fireAnalyticsPeriod||'0')===v;
                            return `<button class="fire-period-btn" data-period="${v}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${active?'#fff':'rgba(255,255,255,0.15)'};color:${active?'#DC2626':'#fff'};">${labels[i]}</button>`;
                        }).join('')}
                    </div>
                    <button id="fire-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;">
                        <i class="fas fa-sliders-h"></i><span>فلاتر</span><span id="fire-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-inline-start:2px;">●</span>
                    </button>
                    <button id="fire-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.25);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="fire-export-csv-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;">
                        <i class="fas fa-file-excel"></i><span>Excel</span>
                    </button>
                    <button id="fire-analytics-refresh" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" title="تحديث التحليل">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <!-- ═══ لوحة الفلاتر التفاعلية ═══ -->
            <div id="fire-filter-panel" style="display:none;background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#DC2626;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#991B1B;">الفلاتر التفاعلية لمعدات الحريق</span>
                        <span id="fire-filter-count" style="background:#fee2e2;color:#991B1B;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button id="fire-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #fecaca;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;">
                        <i class="fas fa-times ml-1"></i>مسح الكل
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;">
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-flag text-red-500 ml-1"></i>الحالة الفنية
                        </label>
                        <select id="fire-af-status" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">الكل</option>
                            <option value="صالح">صالح للعمل</option>
                            <option value="يحتاج صيانة">يحتاج صيانة</option>
                            <option value="خارج الخدمة">خارج الخدمة</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-fire-extinguisher text-blue-500 ml-1"></i>نوع الطفاية
                        </label>
                        <select id="fire-af-type" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">الكل</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-building text-amber-500 ml-1"></i>الموقع / المبنى
                        </label>
                        <select id="fire-af-location" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">الكل</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-weight-hanging text-emerald-500 ml-1"></i>السعة والوزن
                        </label>
                        <select id="fire-af-capacity" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">الكل</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-clipboard-check text-purple-500 ml-1"></i>فحص هذا الشهر
                        </label>
                        <select id="fire-af-inspection" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">الكل</option>
                            <option value="inspected">مفحوصة هذا الشهر</option>
                            <option value="due">مستحقة / متأخرة</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-certificate text-teal-500 ml-1"></i>حالة الاعتماد
                        </label>
                        <select id="fire-af-approval" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;">
                            <option value="">الكل</option>
                            <option value="approved">معتمد رسمياً</option>
                            <option value="pending">⏳ قيد المراجعة</option>
                            <option value="rejected">مرفوض</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- ═══ كروت مؤشرات الأداء الرئيسية (KPI Strip) ═══ -->
            <div id="fire-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:18px;">
                <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i> جاري إعداد المؤشرات...</div>
            </div>

            <!-- ═══ توزيع الأجهزة حسب المباني والمواقع الرئيسية ═══ -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;border-radius:14px;border:1px solid #e2e8f0;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-building text-red-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;color:#1e293b;">توزيع ونسب الجاهزية حسب المباني والمواقع</span>
                    </div>
                    <span style="font-size:0.72rem;color:#64748b;">انقر على أي موقع للتصفية الفورية</span>
                </div>
                <div id="fire-factories-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;padding:16px;background:#f8fafc;">
                    <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:30px 0;grid-column:1/-1;">جاري التحميل...</div>
                </div>
            </div>

            <!-- ═══ Row 1: الرسوم البيانية الرئيسية (الحالة + الاتجاه الزمني) ═══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-chart-pie text-emerald-600"></i>
                            <span style="font-weight:700;font-size:0.88rem;">الحالة التشغيلية والجاهزية</span>
                        </div>
                    </div>
                    <div style="padding:16px;position:relative;height:270px;">
                        <canvas id="fire-chart-status"></canvas>
                        <div id="fire-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-chart-line text-red-600"></i>
                            <span style="font-weight:700;font-size:0.88rem;">الاتجاه الزمني للفحوصات الشهرية (آخر 12 شهر)</span>
                        </div>
                    </div>
                    <div style="padding:16px;position:relative;height:270px;">
                        <canvas id="fire-chart-trend"></canvas>
                        <div id="fire-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
            </div>

            <!-- ═══ Row 2: الرسوم البيانية الثانوية (الأنواع + المقارنة الشهرية) ═══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:gap:8px;">
                        <i class="fas fa-tags text-blue-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;">توزيع أنواع طفايات الحريق</span>
                    </div>
                    <div style="padding:16px;position:relative;height:270px;">
                        <canvas id="fire-chart-types"></canvas>
                        <div id="fire-chart-types-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-calendar-alt text-purple-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;">معدل الامتثال بالفحص الدوري</span>
                    </div>
                    <div style="padding:16px;position:relative;height:270px;">
                        <canvas id="fire-chart-yearly"></canvas>
                        <div id="fire-chart-yearly-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
            </div>

            <!-- ═══ Row 3: القوائم التحليلية المتقدمة مع أشرطة التقدم ═══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px;margin-bottom:16px;">
                <!-- أعلى الأنواع -->
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-fire-extinguisher text-red-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;">أكثر أنواع الطفايات كثافة</span>
                    </div>
                    <div id="fire-types-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:30px 0;">جاري التحميل...</div>
                    </div>
                </div>
                <!-- أعلى المواقع -->
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marker-alt text-amber-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;">أعلى المواقع كثافة للأجهزة</span>
                    </div>
                    <div id="fire-locations-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:30px 0;">جاري التحميل...</div>
                    </div>
                </div>
                <!-- نشاط المفتشين -->
                <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-user-shield text-teal-600"></i>
                        <span style="font-weight:700;font-size:0.88rem;">إنجاز مسؤولي السلامة الميداني</span>
                    </div>
                    <div id="fire-inspectors-list" style="padding:16px;height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;">
                        <div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:30px 0;">جاري التحميل...</div>
                    </div>
                </div>
            </div>

            <!-- ═══ Row 4: جدول سجل أحدث الفحوصات الميدانية ═══ -->
            <div class="content-card" style="padding:0;overflow:hidden;border-radius:14px;border:1px solid #e2e8f0;">
                <div style="padding:14px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-history text-red-600"></i>
                        <span style="font-weight:700;font-size:0.92rem;color:#1e293b;">سجل الفحوصات الميدانية المعتمدة والمعلقة</span>
                        <span id="fire-recent-count" style="background:#fee2e2;color:#991B1B;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;">0</span>
                    </div>
                </div>
                <div class="table-wrapper" style="overflow-x:auto;">
                    <table class="data-table" style="width:100%;margin:0;font-size:0.84rem;">
                        <thead>
                            <tr style="background:#f8fafc;">
                                <th style="padding:10px 14px;">كود الفحص</th>
                                <th style="padding:10px 14px;">الجهاز والموقع</th>
                                <th style="padding:10px 14px;">المفتش</th>
                                <th style="padding:10px 14px;">التاريخ</th>
                                <th style="padding:10px 14px;">الحالة الفنية</th>
                                <th style="padding:10px 14px;">الاعتماد</th>
                                <th style="padding:10px 14px;">الملاحظات</th>
                            </tr>
                        </thead>
                        <tbody id="fire-recent-tbody">
                            <tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;">جاري تحميل السجلات...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        `;
    },

    /**
     * ربط أحداث لوحة التحليل
     */
    _fireBindAnalyticsEvents() {
        const root = document.getElementById('fire-analytics-root');
        if (!root) return;

        // أزرار الفترات
        root.querySelectorAll('.fire-period-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const p = e.currentTarget.dataset.period;
                this._fireAnalyticsPeriod = p;
                root.querySelectorAll('.fire-period-btn').forEach(b => {
                    const active = b.dataset.period === p;
                    b.style.background = active ? '#fff' : 'rgba(255,255,255,0.15)';
                    b.style.color = active ? '#DC2626' : '#fff';
                });
                this.updateFireAnalyticsDashboard();
            });
        });

        // زر فتح / إغلاق الفلاتر
        const toggleBtn = document.getElementById('fire-toggle-filters-btn');
        const filterPanel = document.getElementById('fire-filter-panel');
        if (toggleBtn && filterPanel) {
            toggleBtn.addEventListener('click', () => {
                const isHidden = filterPanel.style.display === 'none';
                filterPanel.style.display = isHidden ? 'block' : 'none';
            });
        }

        // مسح الفلاتر
        const resetBtn = document.getElementById('fire-filter-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                ['fire-af-status', 'fire-af-type', 'fire-af-location', 'fire-af-capacity', 'fire-af-inspection', 'fire-af-approval'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.value = '';
                });
                const badge = document.getElementById('fire-filter-badge');
                if (badge) badge.style.display = 'none';
                this.updateFireAnalyticsDashboard();
            });
        }

        // تغيير أي فلتر
        ['fire-af-status', 'fire-af-type', 'fire-af-location', 'fire-af-capacity', 'fire-af-inspection', 'fire-af-approval'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', () => {
                    const hasActive = ['fire-af-status', 'fire-af-type', 'fire-af-location', 'fire-af-capacity', 'fire-af-inspection', 'fire-af-approval'].some(fId => {
                        const sel = document.getElementById(fId);
                        return sel && sel.value !== '';
                    });
                    const badge = document.getElementById('fire-filter-badge');
                    if (badge) badge.style.display = hasActive ? 'inline-block' : 'none';
                    this.updateFireAnalyticsDashboard();
                });
            }
        });

        // زر التحديث
        const refreshBtn = document.getElementById('fire-analytics-refresh');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', async () => {
                refreshBtn.querySelector('i')?.classList.add('fa-spin');
                await this.loadFireEquipmentDataAsync();
                await this.updateFireAnalyticsDashboard();
                refreshBtn.querySelector('i')?.classList.remove('fa-spin');
                if (typeof Notification !== 'undefined') Notification.success('تم تحديث بيانات التحليل بنجاح');
            });
        }

        // زر تصدير PDF
        const pdfBtn = document.getElementById('fire-export-pdf-btn');
        if (pdfBtn) {
            pdfBtn.addEventListener('click', () => this.exportFireAnalyticsPDF());
        }

        // زر تصدير Excel
        const csvBtn = document.getElementById('fire-export-csv-btn');
        if (csvBtn) {
            csvBtn.addEventListener('click', () => this.exportAnalyticsData());
        }
    },

    /**
     * إعداد أحداث تبويب التحليل (للتوافق مع النداءات القديمة)
     */
    setupAnalyticsEventListeners() {
        this._fireBindAnalyticsEvents();
        this.updateFireAnalyticsDashboard();
    },

    /**
     * تحديث وحساب بيانات لوحة التحليل ورسم المخططات
     */
    async updateFireAnalyticsDashboard() {
        const root = document.getElementById('fire-analytics-root');
        if (!root) return;

        this.ensureData();
        const allAssets = this.getAssets() || [];
        const allInspections = this.getInspections() || [];
        const period = parseInt(this._fireAnalyticsPeriod || '0', 10);

        // 1. تصفية الفحوصات حسب الفترة
        const cutoff = period > 0 ? (() => { const d = new Date(); d.setDate(d.getDate() - period); return d; })() : null;
        const inPeriodInspections = cutoff
            ? allInspections.filter(i => {
                const d = new Date(i.checkDate || i.createdAt || 0);
                return d >= cutoff;
            })
            : allInspections.slice();

        // 2. ملء خيارات الفلاتر التفاعلية
        this._firePopulateFilterSelects(allAssets);

        // 3. تطبيق الفلاتر
        const statusFilter = document.getElementById('fire-af-status')?.value || '';
        const typeFilter = document.getElementById('fire-af-type')?.value || '';
        const locationFilter = document.getElementById('fire-af-location')?.value || '';
        const capacityFilter = document.getElementById('fire-af-capacity')?.value || '';
        const inspectionFilter = document.getElementById('fire-af-inspection')?.value || '';
        const approvalFilter = document.getElementById('fire-af-approval')?.value || '';

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const filteredAssets = allAssets.filter(asset => {
            if (statusFilter && asset.status !== statusFilter) return false;
            if (typeFilter && asset.type !== typeFilter) return false;
            if (locationFilter && String(asset.location || '').indexOf(locationFilter) === -1) return false;
            if (capacityFilter && String(asset.capacity || '').indexOf(capacityFilter) === -1) return false;

            if (inspectionFilter === 'inspected') {
                const isInspected = inPeriodInspections.some(i => i.assetId === asset.id);
                if (!isInspected) return false;
            } else if (inspectionFilter === 'due') {
                const isInspected = inPeriodInspections.some(i => i.assetId === asset.id);
                if (isInspected) return false;
            }
            return true;
        });

        const filteredInspections = inPeriodInspections.filter(insp => {
            if (statusFilter && insp.status !== statusFilter) return false;
            if (approvalFilter && String(insp.approvalStatus || 'pending').toLowerCase() !== approvalFilter) return false;
            return true;
        });

        const countEl = document.getElementById('fire-filter-count');
        if (countEl) countEl.textContent = `${filteredAssets.length} جهاز • ${filteredInspections.length} فحص`;

        // 4. حساب المؤشرات الرئيسية (KPIs)
        const totalAssetsCount = filteredAssets.length;
        const validAssetsCount = filteredAssets.filter(a => a.status === 'صالح').length;
        const maintenanceCount = filteredAssets.filter(a => a.status === 'يحتاج صيانة').length;
        const outOfServiceCount = filteredAssets.filter(a => a.status === 'خارج الخدمة').length;

        // فحوصات الشهر الحالي
        const inspectedThisMonth = allInspections.filter(i => {
            if (!i.checkDate) return false;
            const d = new Date(i.checkDate);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });
        const pendingApprovalsCount = allInspections.filter(i => String(i.approvalStatus || '').toLowerCase() === 'pending' || (!i.approvalStatus && i.submittedBy && String(i.submittedBy).includes('Public'))).length;

        const readinessRate = totalAssetsCount > 0 ? ((validAssetsCount / totalAssetsCount) * 100).toFixed(0) : 0;
        const complianceRate = totalAssetsCount > 0 ? Math.min(100, ((inspectedThisMonth.length / totalAssetsCount) * 100)).toFixed(0) : 0;

        // رسم كروت الـ KPI Strip
        const kpiStripEl = document.getElementById('fire-kpi-strip');
        if (kpiStripEl) {
            const kpis = [
                { label: 'إجمالي الأجهزة', value: totalAssetsCount, icon: 'fas fa-fire-extinguisher', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
                { label: 'صالحة وجاهزة', value: validAssetsCount, icon: 'fas fa-check-circle', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
                { label: 'تحتاج صيانة', value: maintenanceCount, icon: 'fas fa-tools', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
                { label: 'خارج الخدمة', value: outOfServiceCount, icon: 'fas fa-ban', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
                { label: 'فحوصات هذا الشهر', value: inspectedThisMonth.length, icon: 'fas fa-calendar-check', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
                { label: '⏳ بانتظار الاعتماد', value: pendingApprovalsCount, icon: 'fas fa-clock', color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
                { label: 'نسبة الجاهزية', value: `${readinessRate}%`, icon: 'fas fa-shield-alt', color: '#0d9488', bg: '#f0fdfa', border: '#99f6e4' },
                { label: 'نسبة الامتثال', value: `${complianceRate}%`, icon: 'fas fa-percentage', color: '#db2777', bg: '#fdf2f8', border: '#fbcfe8' }
            ];

            kpiStripEl.innerHTML = kpis.map(k => `
                <div style="background:${k.bg};border:1px solid ${k.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.08)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${k.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:15px;">
                        <i class="${k.icon}"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${k.color};line-height:1;" dir="ltr">${k.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${k.label}</div>
                    </div>
                </div>
            `).join('');
        }

        // 5. كروت توزيع المباني والمواقع الرئيسية
        this._firePopulateLocationCards(filteredAssets);

        // 6. الرسوم البيانية التفاعلية عبر Chart.js
        const loadedChart = await this._fireEnsureChartJS();
        if (loadedChart && typeof Chart !== 'undefined') {
            // دونات الحالة
            this._fireRenderDoughnut('fire-chart-status', ['صالح للعمل', 'يحتاج صيانة', 'خارج الخدمة'], [validAssetsCount, maintenanceCount, outOfServiceCount], ['#10b981', '#f59e0b', '#ef4444']);

            // الاتجاه الزمني للفحوصات
            this._fireRenderTrend('fire-chart-trend', allInspections);

            // توزيع الأنواع
            const typeCounts = {};
            filteredAssets.forEach(a => {
                const t = a.type || 'أخرى';
                typeCounts[t] = (typeCounts[t] || 0) + 1;
            });
            const typeLabels = Object.keys(typeCounts).slice(0, 6);
            const typeValues = typeLabels.map(l => typeCounts[l]);
            const typePalette = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
            this._fireRenderDoughnut('fire-chart-types', typeLabels, typeValues, typePalette);

            // بار الامتثال الشهري
            this._fireRenderYearly('fire-chart-yearly', allInspections, allAssets.length);
        }

        // 7. القوائم التحليلية بأشرطة التقدم
        this._firePopulateRankedLists(filteredAssets, filteredInspections);

        // 8. جدول أحدث الفحوصات
        this._firePopulateRecentTable(filteredInspections, allAssets);
    },

    /**
     * ملء خيارات الفلاتر
     */
    _firePopulateFilterSelects(assets) {
        const typeSelect = document.getElementById('fire-af-type');
        const locationSelect = document.getElementById('fire-af-location');
        const capacitySelect = document.getElementById('fire-af-capacity');

        if (typeSelect && typeSelect.options.length <= 1) {
            const types = Array.from(new Set(assets.map(a => a.type).filter(Boolean))).sort();
            types.forEach(t => {
                const opt = document.createElement('option');
                opt.value = t;
                opt.textContent = t;
                typeSelect.appendChild(opt);
            });
        }

        if (locationSelect && locationSelect.options.length <= 1) {
            const locations = Array.from(new Set(assets.map(a => a.location).filter(Boolean))).sort();
            locations.forEach(l => {
                const opt = document.createElement('option');
                opt.value = l;
                opt.textContent = l;
                locationSelect.appendChild(opt);
            });
        }

        if (capacitySelect && capacitySelect.options.length <= 1) {
            const capacities = Array.from(new Set(assets.map(a => a.capacity).filter(Boolean))).sort();
            capacities.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.textContent = c;
                capacitySelect.appendChild(opt);
            });
        }
    },

    /**
     * كروت توزيع المباني والمواقع
     */
    _firePopulateLocationCards(assets) {
        const container = document.getElementById('fire-factories-cards');
        if (!container) return;

        const locMap = {};
        assets.forEach(a => {
            const loc = String(a.location || 'غير محدد').trim();
            if (!locMap[loc]) locMap[loc] = { total: 0, valid: 0, maintenance: 0, outOfService: 0 };
            locMap[loc].total++;
            if (a.status === 'صالح') locMap[loc].valid++;
            else if (a.status === 'يحتاج صيانة') locMap[loc].maintenance++;
            else if (a.status === 'خارج الخدمة') locMap[loc].outOfService++;
        });

        const sortedLocs = Object.entries(locMap).sort((a, b) => b[1].total - a[1].total).slice(0, 8);
        if (sortedLocs.length === 0) {
            container.innerHTML = '<div style="text-align:center;color:#94a3b8;grid-column:1/-1;padding:20px;">لا توجد مواقع مسجلة</div>';
            return;
        }

        container.innerHTML = sortedLocs.map(([locName, s]) => {
            const pct = s.total > 0 ? ((s.valid / s.total) * 100).toFixed(0) : 0;
            return `
                <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;cursor:pointer;transition:all 0.2s ease;box-shadow:0 2px 6px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-2px)';this.style.borderColor='#ef4444';this.style.boxShadow='0 8px 18px rgba(239,68,68,0.1)';" onmouseout="this.style.transform='none';this.style.borderColor='#e2e8f0';this.style.boxShadow='0 2px 6px rgba(0,0,0,0.02)';" onclick="const sel=document.getElementById('fire-af-location');if(sel){sel.value='${Utils.escapeHTML(locName)}';sel.dispatchEvent(new Event('change'));}">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <h4 style="margin:0;font-size:0.86rem;font-weight:700;color:#1e293b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px;">${Utils.escapeHTML(locName)}</h4>
                        <span style="background:#fee2e2;color:#991b1b;font-weight:800;font-size:0.75rem;padding:2px 7px;border-radius:8px;">${s.total} جهاز</span>
                    </div>
                    <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.75rem;color:#64748b;margin-bottom:6px;">
                        <span>نسبة الجاهزية:</span>
                        <span style="font-weight:700;color:${pct>=90?'#16a34a':pct>=70?'#d97706':'#dc2626'}">${pct}%</span>
                    </div>
                    <div style="width:100%;height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                        <div style="width:${pct}%;height:100%;background:${pct>=90?'#10b981':pct>=70?'#f59e0b':'#ef4444'};border-radius:4px;"></div>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:8px;font-size:0.7rem;color:#64748b;">
                        <span style="color:#16a34a;"><i class="fas fa-check-circle ml-1"></i>${s.valid}</span>
                        <span style="color:#d97706;"><i class="fas fa-tools ml-1"></i>${s.maintenance}</span>
                        <span style="color:#dc2626;"><i class="fas fa-ban ml-1"></i>${s.outOfService}</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    /**
     * القوائم التحليلية المتقدمة بأشرطة التقدم
     */
    _firePopulateRankedLists(assets, inspections) {
        // 1. أعلى الأنواع
        const typesEl = document.getElementById('fire-types-list');
        if (typesEl) {
            const map = {};
            assets.forEach(a => { const t = a.type || 'غير محدد'; map[t] = (map[t] || 0) + 1; });
            const list = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6);
            const total = assets.length || 1;
            typesEl.innerHTML = list.map(([name, count]) => {
                const pct = ((count / total) * 100).toFixed(1);
                return `
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:600;color:#334155;margin-bottom:4px;">
                            <span>${Utils.escapeHTML(name)}</span>
                            <span style="color:#dc2626;font-weight:700;">${count} (${pct}%)</span>
                        </div>
                        <div style="width:100%;height:7px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                            <div style="width:${pct}%;height:100%;background:linear-gradient(90deg, #ef4444 0%, #dc2626 100%);border-radius:4px;"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // 2. أعلى المواقع
        const locsEl = document.getElementById('fire-locations-list');
        if (locsEl) {
            const map = {};
            assets.forEach(a => { const l = a.location || 'غير محدد'; map[l] = (map[l] || 0) + 1; });
            const list = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6);
            const total = assets.length || 1;
            locsEl.innerHTML = list.map(([name, count]) => {
                const pct = ((count / total) * 100).toFixed(1);
                return `
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:600;color:#334155;margin-bottom:4px;">
                            <span>${Utils.escapeHTML(name)}</span>
                            <span style="color:#d97706;font-weight:700;">${count} جهاز</span>
                        </div>
                        <div style="width:100%;height:7px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                            <div style="width:${pct}%;height:100%;background:linear-gradient(90deg, #f59e0b 0%, #d97706 100%);border-radius:4px;"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // 3. نشاط المفتشين
        const inspEl = document.getElementById('fire-inspectors-list');
        if (inspEl) {
            const map = {};
            inspections.forEach(i => { const name = i.inspector || 'غير محدد'; map[name] = (map[name] || 0) + 1; });
            const list = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6);
            const total = inspections.length || 1;
            inspEl.innerHTML = list.map(([name, count]) => {
                const pct = ((count / total) * 100).toFixed(1);
                return `
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:600;color:#334155;margin-bottom:4px;">
                            <span><i class="fas fa-user-check text-teal-600 ml-1"></i>${Utils.escapeHTML(name)}</span>
                            <span style="color:#0d9488;font-weight:700;">${count} فحص</span>
                        </div>
                        <div style="width:100%;height:7px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                            <div style="width:${pct}%;height:100%;background:linear-gradient(90deg, #14b8a6 0%, #0d9488 100%);border-radius:4px;"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    },

    /**
     * جدول أحدث الفحوصات
     */
    _firePopulateRecentTable(inspections, assets) {
        const tbody = document.getElementById('fire-recent-tbody');
        const countEl = document.getElementById('fire-recent-count');
        if (!tbody) return;

        const recent = inspections.slice().sort((a, b) => {
            const da = new Date(a.checkDate || a.createdAt || 0);
            const db = new Date(b.checkDate || b.createdAt || 0);
            return db - da;
        }).slice(0, 15);

        if (countEl) countEl.textContent = `${recent.length} فحص`;

        if (recent.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;">لا توجد فحوصات مسجلة تطابق التحديد</td></tr>';
            return;
        }

        tbody.innerHTML = recent.map(r => {
            const asset = assets.find(a => a.id === r.assetId);
            const assetName = asset ? `${asset.number || asset.id} - ${asset.location || ''}` : r.assetId;
            const dateStr = r.checkDate ? Utils.formatDate(r.checkDate) : '-';
            const statusBadge = this.getStatusBadge(r.status);
            const approvalBadge = this.getApprovalBadge(r.approvalStatus, r.submittedBy);

            return `
                <tr>
                    <td style="font-weight:700;color:#1e293b;">${Utils.escapeHTML(r.id || '-')}</td>
                    <td>
                        <div style="font-weight:600;color:#1e293b;">${Utils.escapeHTML(assetName)}</div>
                        <div style="font-size:0.75rem;color:#94a3b8;">ID: ${Utils.escapeHTML(r.assetId || '-')}</div>
                    </td>
                    <td>${Utils.escapeHTML(r.inspector || '-')}</td>
                    <td>${dateStr}</td>
                    <td>${statusBadge}</td>
                    <td>${approvalBadge}</td>
                    <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.8rem;color:#475569;">
                        ${Utils.escapeHTML(r.remarks || '-')}
                    </td>
                </tr>
            `;
        }).join('');
    },

    /**
     * رسم مخطط Doughnut
     */
    _fireRenderDoughnut(canvasId, labels, data, colors) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        try { if (this._fireAnalyticsCharts[canvasId]) this._fireAnalyticsCharts[canvasId].destroy(); } catch (e) {}

        const total = data.reduce((a, b) => a + b, 0);
        const emptyEl = document.getElementById(`${canvasId}-empty`);
        if (total === 0) {
            if (emptyEl) emptyEl.style.display = 'flex';
            return;
        }
        if (emptyEl) emptyEl.style.display = 'none';

        this._fireAnalyticsCharts[canvasId] = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { family: 'inherit', size: 11 }, padding: 12 }
                    }
                },
                cutout: '65%'
            }
        });
    },

    /**
     * رسم مخطط الاتجاه الزمني (12 شهر)
     */
    _fireRenderTrend(canvasId, inspections) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        try { if (this._fireAnalyticsCharts[canvasId]) this._fireAnalyticsCharts[canvasId].destroy(); } catch (e) {}

        const monthLabels = [];
        const monthCounts = [];
        const now = new Date();

        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const m = d.getMonth();
            const y = d.getFullYear();
            monthLabels.push(d.toLocaleDateString('ar-SA', { month: 'short' }));

            const cnt = inspections.filter(insp => {
                if (!insp.checkDate) return false;
                const idate = new Date(insp.checkDate);
                return idate.getMonth() === m && idate.getFullYear() === y;
            }).length;
            monthCounts.push(cnt);
        }

        this._fireAnalyticsCharts[canvasId] = new Chart(canvas, {
            type: 'line',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: 'عدد الفحوصات الشهرية',
                    data: monthCounts,
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    fill: true,
                    tension: 0.35,
                    borderWidth: 2.5,
                    pointRadius: 4,
                    pointBackgroundColor: '#dc2626'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' } },
                    x: { grid: { display: false } }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    },

    /**
     * رسم مخطط الامتثال السنوي
     */
    _fireRenderYearly(canvasId, inspections, totalAssets) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        try { if (this._fireAnalyticsCharts[canvasId]) this._fireAnalyticsCharts[canvasId].destroy(); } catch (e) {}

        const labels = [];
        const rates = [];
        const now = new Date();
        const baseTotal = totalAssets || 1;

        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const m = d.getMonth();
            const y = d.getFullYear();
            labels.push(d.toLocaleDateString('ar-SA', { month: 'short', year: '2-digit' }));

            const cnt = inspections.filter(insp => {
                if (!insp.checkDate) return false;
                const idate = new Date(insp.checkDate);
                return idate.getMonth() === m && idate.getFullYear() === y;
            }).length;

            const rate = Math.min(100, Math.round((cnt / baseTotal) * 100));
            rates.push(rate);
        }

        this._fireAnalyticsCharts[canvasId] = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'نسبة الامتثال %',
                    data: rates,
                    backgroundColor: 'rgba(124, 58, 237, 0.85)',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 100, grid: { color: 'rgba(0,0,0,0.04)' } },
                    x: { grid: { display: false } }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    },

    /**
     * تصدير تقرير التحليل إلى PDF
     */
    exportFireAnalyticsPDF() {
        if (typeof window.print === 'function') {
            window.print();
        } else {
            Notification.info('يرجى استخدام أمر طباعة المتصفح (Ctrl+P) لحفظ التقرير كـ PDF');
        }
    },

    /**
     * تصدير بيانات التحليل كملف CSV / Excel
     */
    exportAnalyticsData() {
        try {
            const assets = this.getAssets() || [];
            const inspections = this.getInspections() || [];

            let csv = '\ufeff';
            csv += 'تقرير تحليل معدات الإطفاء والسلامة\n';
            csv += `تاريخ التقرير,${new Date().toLocaleDateString('ar-SA')}\n\n`;

            csv += 'سجل أجهزة ومعدات الإطفاء\n';
            csv += 'DeviceID,رقم الجهاز,النوع,السعة,الموقع,الحالة,تاريخ آخر فحص,تاريخ الفحص القادم\n';
            assets.forEach(a => {
                csv += `"${a.id || ''}","${a.number || ''}","${a.type || ''}","${a.capacity || ''}","${a.location || ''}","${a.status || ''}","${a.lastInspection || ''}","${a.nextInspection || ''}"\n`;
            });

            csv += '\nسجل الفحوصات الشهرية الميدانية\n';
            csv += 'كود الفحص,DeviceID,تاريخ الفحص,المفتش,الحالة الفنية,حالة الاعتماد,الملاحظات\n';
            inspections.forEach(i => {
                csv += `"${i.id || ''}","${i.assetId || ''}","${i.checkDate || ''}","${i.inspector || ''}","${i.status || ''}","${i.approvalStatus || 'pending'}","${(i.remarks || '').replace(/"/g, '""')}"\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Fire_Equipment_Analytics_${new Date().toISOString().slice(0, 10)}.csv`;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (typeof Notification !== 'undefined') {
                Notification.success('تم تصدير تقرير التحليل بنجاح');
            }
        } catch (error) {
            if (typeof Notification !== 'undefined') {
                Notification.error('حدث خطأ أثناء تصدير البيانات: ' + error.message);
            }
        }
    },

    /**
     * عرض تبويب طلبات الموافقة (للمدير فقط)
     */
   async renderApprovalRequestsTab() {
        if (!this.isAdmin()) {
            return '<div class="empty-state"><p class="text-gray-500">ليس لديك صلاحية للوصول إلى هذا القسم. يجب أن تكون مدير النظام.</p></div>';
        }

        // ✅ التأكد من تهيئة البيانات أولاً
        this.ensureData();

        // ✅ تحميل طلبات الموافقة من Backend أولاً
        try {
            const loaded = await this.loadApprovalRequestsFromBackend();
            if (loaded && loaded.length > 0) {
                Utils.safeLog(`✅ تم تحميل ${loaded.length} طلب موافقة من Backend`);
            }
        } catch (error) {
            Utils.safeWarn('⚠️ فشل تحميل طلبات الموافقة:', error);
        }

        // الحصول على طلبات الموافقة (يمكن تخزينها في AppState أو جلبها من الخادم)
        const approvalRequests = this.getApprovalRequests();
        
        // ✅ التأكد من أن الطلبات موجودة
        if (!approvalRequests || !Array.isArray(approvalRequests)) {
            Utils.safeWarn('⚠️ لا توجد طلبات موافقة متاحة');
            return '<div class="empty-state"><p class="text-gray-500">لا توجد طلبات موافقة حالياً</p></div>';
        }

        // ترتيب الطلبات: قيد الانتظار أولاً، ثم الموافق عليها، ثم المرفوضة
        const sortedRequests = [...approvalRequests].sort((a, b) => {
            const statusOrder = { 'pending': 1, 'approved': 2, 'rejected': 3 };
            const aOrder = statusOrder[a.status] || 99;
            const bOrder = statusOrder[b.status] || 99;
            if (aOrder !== bOrder) return aOrder - bOrder;
            // إذا كانت الحالة نفسها، ترتيب حسب التاريخ (الأحدث أولاً)
            const aDate = new Date(a.requestedAt || 0);
            const bDate = new Date(b.requestedAt || 0);
            return bDate - aDate;
        });

        const rows = sortedRequests.map(request => {
            const statusBadge = request.status === 'approved'
                ? '<span class="badge badge-success"><i class="fas fa-check-circle ml-1"></i>موافق عليه</span>'
                : request.status === 'rejected'
                    ? '<span class="badge badge-danger"><i class="fas fa-times-circle ml-1"></i>مرفوض</span>'
                    : '<span class="badge badge-warning"><i class="fas fa-clock ml-1"></i>قيد الانتظار</span>';

            const requestType = request.type === 'inspection' ? '<i class="fas fa-clipboard-check ml-1"></i>فحص شهري'
                : request.type === 'add' ? '<i class="fas fa-plus-circle ml-1"></i>إضافة جهاز'
                    : request.type === 'edit' ? '<i class="fas fa-edit ml-1"></i>تعديل جهاز'
                        : request.type === 'delete' ? '<i class="fas fa-trash ml-1"></i>حذف جهاز'
                            : '<i class="fas fa-question-circle ml-1"></i>طلب غير محدد';

            const asset = this.getAssets().find(a => a.id === request.assetId || a.number === request.assetNumber);
            const assetLabel = asset ? `${asset.number || asset.id} - ${asset.location || ''}` : (request.assetNumber || request.assetId || '-');

            return `
                <tr data-request-id="${request.id}" data-status="${request.status || 'pending'}" style="${request.status === 'pending' ? 'background-color: rgba(255, 193, 7, 0.05);' : ''}">
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(request.id || '-')}</div>
                        ${request.status === 'pending' ? '<div class="text-xs text-yellow-600 mt-1"><i class="fas fa-exclamation-circle ml-1"></i>يتطلب مراجعة</div>' : ''}
                    </td>
                    <td>${requestType}</td>
                    <td>
                        <div class="font-semibold">${Utils.escapeHTML(assetLabel)}</div>
                        ${asset ? `<div class="text-xs text-gray-500">${Utils.escapeHTML(asset.type || '')}</div>` : ''}
                    </td>
                    <td>
                        <div class="font-semibold">${Utils.escapeHTML(request.requestedBy || request.userName || '-')}</div>
                        ${request.userEmail ? `<div class="text-xs text-gray-500">${Utils.escapeHTML(request.userEmail)}</div>` : ''}
                    </td>
                    <td>
                        <div>${request.requestedAt ? Utils.formatDate(request.requestedAt) : '-'}</div>
                        ${request.approvedAt || request.rejectedAt ? 
                            `<div class="text-xs text-gray-500 mt-1">
                                ${request.status === 'approved' && request.approvedAt ? `موافق: ${Utils.formatDate(request.approvedAt)}` : ''}
                                ${request.status === 'rejected' && request.rejectedAt ? `مرفوض: ${Utils.formatDate(request.rejectedAt)}` : ''}
                            </div>` : ''}
                    </td>
                    <td>${statusBadge}</td>
                    <td style="word-wrap: break-word; max-width: 200px; white-space: normal;">
                        <div class="text-sm">${Utils.escapeHTML(request.comments || request.reason || '-')}</div>
                        ${request.rejectionReason ? `<div class="text-xs text-red-600 mt-1"><i class="fas fa-info-circle ml-1"></i>سبب الرفض: ${Utils.escapeHTML(request.rejectionReason)}</div>` : ''}
                    </td>
                    <td>
                        <div class="flex flex-wrap gap-2">
                            ${request.status === 'pending' ? `
                            <button class="btn-icon btn-icon-success" data-action="approve-request" data-id="${request.id}" title="الموافقة على الطلب">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="btn-icon btn-icon-danger" data-action="reject-request" data-id="${request.id}" title="رفض الطلب">
                                <i class="fas fa-times"></i>
                            </button>
                            ` : ''}
                            <button class="btn-icon btn-icon-primary" data-action="view-request" data-id="${request.id}" title="عرض تفاصيل الطلب">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${request.status === 'pending' ? `
                            <button class="btn-icon btn-icon-warning" data-action="edit-request" data-id="${request.id}" title="تعديل الطلب">
                                <i class="fas fa-edit"></i>
                            </button>
                            ` : ''}
                            <button class="btn-icon btn-icon-danger" data-action="delete-request" data-id="${request.id}" title="حذف الطلب">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        return `
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-check-circle ml-2"></i>
                            طلبات الموافقة
                        </h2>
                        <div class="flex items-center gap-2">
                            <input type="text" id="approval-requests-search" class="form-input" placeholder="بحث..." style="width: 250px;">
                            <button id="approval-requests-refresh" class="btn-secondary">
                                <i class="fas fa-sync-alt ml-2"></i>
                                تحديث
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    ${approvalRequests.length === 0 ? `
                        <div class="empty-state">
                            <i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                            <p class="text-gray-500">لا توجد طلبات موافقة حالياً</p>
                        </div>
                    ` : `
                        <div class="table-wrapper approval-requests-table-wrapper" style="width: 100%; max-width: 100%; overflow-x: auto; overflow-y: auto; max-height: 70vh; position: relative;">
                            <table class="data-table" style="width: 100%; min-width: 100%; table-layout: auto;">
                                <thead style="position: sticky; top: 0; background: var(--card-bg); z-index: 10;">
                                    <tr>
                                        <th style="min-width: 100px;">رقم الطلب</th>
                                        <th style="min-width: 120px;">نوع الطلب</th>
                                        <th style="min-width: 120px;">رقم الجهاز</th>
                                        <th style="min-width: 150px;">مقدم الطلب</th>
                                        <th style="min-width: 120px;">تاريخ الطلب</th>
                                        <th style="min-width: 100px;">الحالة</th>
                                        <th style="min-width: 200px; word-wrap: break-word;">ملاحظات</th>
                                        <th style="min-width: 150px;">إجراءات</th>
                                    </tr>
                                </thead>
                                <tbody id="approval-requests-table-body">
                                    ${rows}
                                </tbody>
                            </table>
                        </div>
                    `}
                </div>
            </div>
        `;
    },

    /**
     * تحميل طلبات الموافقة من Backend
     */
    async loadApprovalRequestsFromBackend() {
        try {
            if (GoogleIntegration && AppState.googleConfig?.appsScript?.enabled) {
                const result = await GoogleIntegration.sendRequest({
                    action: 'getFireEquipmentApprovalRequests',
                    data: {}
                });

                if (result && result.success && result.data) {
                    if (!AppState.appData) AppState.appData = {};
                    const loadedRequests = Array.isArray(result.data) ? result.data : [];
                    
                    // ✅ دمج الطلبات المحلية مع الطلبات من Backend (تجنب التكرار)
                    const localRequests = AppState.appData.fireEquipmentApprovalRequests || [];
                    const mergedRequests = [...localRequests];
                    
                    loadedRequests.forEach(loadedReq => {
                        const existingIndex = mergedRequests.findIndex(req => req.id === loadedReq.id);
                        if (existingIndex >= 0) {
                            // تحديث الطلب الموجود
                            mergedRequests[existingIndex] = { ...mergedRequests[existingIndex], ...loadedReq };
                        } else {
                            // إضافة طلب جديد
                            mergedRequests.push(loadedReq);
                        }
                    });
                    
                    AppState.appData.fireEquipmentApprovalRequests = mergedRequests;
                    
                    // حفظ في localStorage
                    if (typeof DataManager !== 'undefined' && DataManager.save) {
                        DataManager.save();
                    } else {
                        localStorage.setItem('fire_equipment_approval_requests', JSON.stringify(mergedRequests));
                    }
                    
                    Utils.safeLog(`✅ تم تحميل ودمج ${mergedRequests.length} طلب موافقة (${loadedRequests.length} من Backend)`);
                    return mergedRequests;
                } else {
                    Utils.safeWarn('⚠️ استجابة غير صحيحة من Backend:', result);
                }
            } else {
                Utils.safeWarn('⚠️ GoogleIntegration غير متاح أو غير مفعّل');
            }
        } catch (error) {
            Utils.safeWarn('⚠️ فشل تحميل طلبات الموافقة من Backend:', error);
        }
        
        // ✅ إرجاع البيانات المحلية إن وجدت
        const localRequests = this.getApprovalRequests();
        return localRequests || [];
    },

    /**
     * الحصول على طلبات الموافقة (دمج طلبات تعديل الأجهزة والفحوصات الشهرية المعلقة)
     */
    getApprovalRequests() {
        if (!AppState.appData) {
            AppState.appData = {};
        }

        let requests = [];
        if (AppState.appData.fireEquipmentApprovalRequests && Array.isArray(AppState.appData.fireEquipmentApprovalRequests)) {
            requests = [...AppState.appData.fireEquipmentApprovalRequests];
        } else {
            const stored = localStorage.getItem('fire_equipment_approval_requests');
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed)) {
                        requests = [...parsed];
                        AppState.appData.fireEquipmentApprovalRequests = parsed;
                    }
                } catch (e) {
                    Utils.safeWarn('⚠️ خطأ في تحليل طلبات الموافقة من localStorage:', e);
                }
            }
        }

        // دمج جميع الفحوصات الشهرية الميدانية المعلقة تلقائياً
        const inspections = this.getInspections() || [];
        inspections.forEach(insp => {
            const isPending = String(insp.approvalStatus || '').toLowerCase() === 'pending' || (!insp.approvalStatus && insp.submittedBy && String(insp.submittedBy).includes('Public'));
            const isApproved = String(insp.approvalStatus || '').toLowerCase() === 'approved';
            const isRejected = String(insp.approvalStatus || '').toLowerCase() === 'rejected';

            // إضافة الفحص كطلب موافقة إذا لم يكن مضافاً مسبقاً
            if (!requests.some(r => r.id === insp.id || r.inspectionId === insp.id)) {
                requests.push({
                    id: insp.id,
                    type: 'inspection',
                    assetId: insp.assetId,
                    requestedBy: insp.inspector || (insp.submittedBy ? 'بوابة الفحص الميداني' : 'مسؤول السلامة'),
                    requestedAt: insp.checkDate || insp.createdAt,
                    status: isApproved ? 'approved' : isRejected ? 'rejected' : 'pending',
                    approvedBy: insp.approvedBy || '',
                    approvedAt: insp.approvedAt || '',
                    rejectedBy: insp.rejectedBy || '',
                    rejectionReason: insp.reviewNotes || '',
                    comments: `فحص شهري ميداني - الحالة الفنية: ${insp.status || 'صالح'} | صمام الأمان: ${insp.sealIntact || 'سليم'} | عداد الضغط: ${insp.gaugeReading || 'سليم'} ${insp.remarks ? ' | ملاحظة: ' + insp.remarks : ''}`,
                    inspectionRecord: insp
                });
            }
        });

        return requests;
    },

    /**
     * تهيئة أحداث تبويب طلبات الموافقة
     */
    setupApprovalRequestsEventListeners() {
        // البحث
        const searchInput = document.getElementById('approval-requests-search');
        if (searchInput) {
            const newSearchInput = searchInput.cloneNode(true);
            searchInput.parentNode.replaceChild(newSearchInput, searchInput);
            newSearchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const rows = document.querySelectorAll('#approval-requests-table-body tr[data-request-id]');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            });
        }

        // زر التحديث
        const refreshBtn = document.getElementById('approval-requests-refresh');
        if (refreshBtn) {
            const newRefreshBtn = refreshBtn.cloneNode(true);
            if (refreshBtn.parentNode) {
                refreshBtn.parentNode.replaceChild(newRefreshBtn, refreshBtn);
            }
            newRefreshBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                    Loading.show();
                    await this.loadApprovalRequestsFromBackend();
                    await this.loadFireEquipmentDataAsync();
                    if (typeof AppUI !== 'undefined' && AppUI.updateNotificationsBadge) {
                        AppUI.updateNotificationsBadge();
                    }
                    await this.switchTab('approval-requests');
                    Notification.success('تم تحديث الطلبات بنجاح');
                } catch (error) {
                    Utils.safeError('خطأ في تحديث طلبات الموافقة:', error);
                    Notification.error('حدث خطأ أثناء تحديث الطلبات');
                } finally {
                    Loading.hide();
                }
            });
        }

        // أحداث الأزرار في الجدول
        const tableBody = document.getElementById('approval-requests-table-body');
        if (tableBody) {
            tableBody.addEventListener('click', async (e) => {
                const target = e.target.closest('[data-action]');
                if (!target) return;

                const action = target.dataset.action;
                const requestId = target.dataset.id;

                switch (action) {
                    case 'approve-request':
                        await this.approveRequest(requestId);
                        break;
                    case 'reject-request':
                        await this.rejectRequest(requestId);
                        break;
                    case 'view-request':
                        await this.viewRequest(requestId);
                        break;
                    case 'edit-request':
                        await this.editRequest(requestId);
                        break;
                    case 'delete-request':
                        await this.deleteRequest(requestId);
                        break;
                }
            });
        }
    },

    /**
     * الموافقة على طلب (سواء فحص شهري أو تعديل أصل)
     */
    async approveRequest(requestId) {
        if (!this.isAdmin()) {
            Notification.error('ليس لديك صلاحية للموافقة على الطلبات');
            return;
        }

        // إذا كان فحصاً شهرياً، استدعاء دالة اعتماد الفحص المباشرة
        if (String(requestId).startsWith('FEI-') || this.getInspections().some(i => i.id === requestId)) {
            await this.approveInspection(requestId);
            await this.switchTab('approval-requests');
            return;
        }

        const confirmed = confirm('هل أنت متأكد من الموافقة على هذا الطلب؟');
        if (!confirmed) return;

        Loading.show();
        try {
            const requests = this.getApprovalRequests();
            const request = requests.find(r => r.id === requestId);
            if (!request) {
                Notification.error('لم يتم العثور على الطلب');
                return;
            }

            request.status = 'approved';
            request.approvedBy = AppState.currentUser?.name || AppState.currentUser?.email || 'مدير النظام';
            request.approvedAt = new Date().toISOString();

            if (!AppState.appData) AppState.appData = {};
            AppState.appData.fireEquipmentApprovalRequests = requests;
            
            if (typeof DataManager !== 'undefined' && DataManager.save) {
                DataManager.save();
            }

            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                GoogleIntegration.sendRequest({
                    action: 'updateFireEquipmentApprovalRequest',
                    data: { 
                        requestId, 
                        status: 'approved', 
                        approvedBy: request.approvedBy,
                        approvedAt: request.approvedAt
                    }
                }).catch(e => Utils.safeWarn('Warning background sync:', e));
            }

            Notification.success('تمت الموافقة على الطلب بنجاح');
            await this.switchTab('approval-requests');
        } catch (error) {
            Utils.safeError('❌ خطأ في الموافقة على الطلب:', error);
            Notification.error('حدث خطأ أثناء الموافقة على الطلب');
        } finally {
            Loading.hide();
        }
    },

    /**
     * رفض طلب
     */
    async rejectRequest(requestId) {
        if (!this.isAdmin()) {
            Notification.error('ليس لديك صلاحية لرفض الطلبات');
            return;
        }

        // إذا كان فحصاً شهرياً
        if (String(requestId).startsWith('FEI-') || this.getInspections().some(i => i.id === requestId)) {
            await this.rejectInspection(requestId);
            await this.switchTab('approval-requests');
            return;
        }

        const reason = prompt('أدخل سبب الرفض:');
        if (reason === null) return;

        Loading.show();
        try {
            const requests = this.getApprovalRequests();
            const request = requests.find(r => r.id === requestId);
            if (!request) {
                Notification.error('لم يتم العثور على الطلب');
                return;
            }

            request.status = 'rejected';
            request.rejectedBy = AppState.currentUser?.name || AppState.currentUser?.email || 'مدير النظام';
            request.rejectedAt = new Date().toISOString();
            request.rejectionReason = reason || '';

            if (!AppState.appData) AppState.appData = {};
            AppState.appData.fireEquipmentApprovalRequests = requests;
            
            if (typeof DataManager !== 'undefined' && DataManager.save) {
                DataManager.save();
            }

            Notification.success('تم رفض الطلب بنجاح');
            await this.switchTab('approval-requests');
        } catch (error) {
            Utils.safeError('❌ خطأ في رفض الطلب:', error);
            Notification.error('حدث خطأ أثناء رفض الطلب');
        } finally {
            Loading.hide();
        }
    },

    /**
     * عرض تفاصيل الطلب
     */
    async viewRequest(requestId) {
        if (String(requestId).startsWith('FEI-') || this.getInspections().some(i => i.id === requestId)) {
            this.viewInspection(requestId);
            return;
        }

        const requests = this.getApprovalRequests();
        const request = requests.find(r => r.id === requestId);
        if (!request) {
            Notification.error('لم يتم العثور على الطلب');
            return;
        }

        alert(`تفاصيل الطلب: ${request.id}\nالنوع: ${request.type}\nمقدم الطلب: ${request.requestedBy}\nالحالة: ${request.status}\nالملاحظات: ${request.comments || '-'}`);
    },

    /**
     * إرسال إشعار للمستخدم عند تغيير حالة طلبه
     * @param {object} request - بيانات الطلب
     * @param {string} status - الحالة الجديدة ('approved' أو 'rejected')
     * @param {string} reason - سبب الرفض (اختياري)
     */
    async notifyUserAboutRequestStatus(request, status, reason = '') {
        try {
            const userId = request.requestedById || request.userEmail || '';
            if (!userId) {
                Utils.safeWarn('⚠️ لا يمكن إرسال إشعار: معرف المستخدم غير موجود');
                return;
            }

            const assetLabel = request.assetNumber || request.assetId || 'جهاز غير محدد';
            let title, message, type;

            if (status === 'approved') {
                title = 'تمت الموافقة على طلبك';
                message = `تمت الموافقة على طلبك لإجراء فحص شهري على الجهاز: ${assetLabel}`;
                type = 'success';
            } else if (status === 'rejected') {
                title = 'تم رفض طلبك';
                message = `تم رفض طلبك لإجراء فحص شهري على الجهاز: ${assetLabel}${reason ? `. السبب: ${reason}` : ''}`;
                type = 'error';
            } else {
                return; // حالة غير معروفة
            }

            if (GoogleIntegration && AppState.googleConfig?.appsScript?.enabled) {
                await GoogleIntegration.sendRequest({
                    action: 'addNotification',
                    data: {
                        userId: userId,
                        title: title,
                        message: message,
                        type: type,
                        priority: status === 'approved' ? 'normal' : 'high',
                        link: '#fire-equipment-inspections',
                        data: {
                            module: 'fire-equipment',
                            action: 'inspection_approval_status',
                            requestId: request.id,
                            status: status
                        }
                    }
                }).catch(error => {
                    Utils.safeWarn('⚠️ فشل إرسال الإشعار للمستخدم:', error);
                });
            }

            Utils.safeLog(`✅ تم إرسال إشعار للمستخدم بخصوص حالة الطلب: ${status}`);
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في إرسال إشعار حالة الطلب:', error);
        }
    },

    /**
     * عرض تفاصيل طلب الموافقة
     */
    async viewRequest(requestId) {
        const requests = this.getApprovalRequests();
        const request = requests.find(r => r.id === requestId);
        if (!request) {
            Notification.error('لم يتم العثور على الطلب');
            return;
        }

        const asset = this.getAssets().find(a => a.id === request.assetId || a.number === request.assetNumber);
        const statusBadge = request.status === 'approved'
            ? '<span class="badge badge-success"><i class="fas fa-check-circle ml-1"></i>موافق عليه</span>'
            : request.status === 'rejected'
                ? '<span class="badge badge-danger"><i class="fas fa-times-circle ml-1"></i>مرفوض</span>'
                : '<span class="badge badge-warning"><i class="fas fa-clock ml-1"></i>قيد الانتظار</span>';

        const requestType = request.type === 'inspection' ? 'فحص شهري'
            : request.type === 'add' ? 'إضافة جهاز'
                : request.type === 'edit' ? 'تعديل جهاز'
                    : request.type === 'delete' ? 'حذف جهاز'
                        : 'طلب غير محدد';

        const modal = document.createElement('div');
        modal.className = 'modal-overlay fire-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-file-alt ml-2"></i>
                        تفاصيل طلب الموافقة
                    </h2>
                    <button class="modal-close" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">رقم الطلب:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(request.id || '-')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">نوع الطلب:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(requestType)}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">رقم الجهاز:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(request.assetNumber || request.assetId || '-')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الجهاز:</label>
                                <p class="text-gray-800">${asset ? `${Utils.escapeHTML(asset.number || asset.id)} - ${Utils.escapeHTML(asset.location || '')}` : '-'}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">مقدم الطلب:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(request.requestedBy || request.userName || '-')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">البريد الإلكتروني:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(request.userEmail || '-')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">تاريخ الطلب:</label>
                                <p class="text-gray-800">${request.requestedAt ? Utils.formatDate(request.requestedAt) : '-'}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الحالة:</label>
                                <p class="text-gray-800">${statusBadge}</p>
                            </div>
                            ${request.status === 'approved' ? `
                            <div>
                                <label class="text-sm font-semibold text-gray-600">موافق عليه من:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(request.approvedBy || '-')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">تاريخ الموافقة:</label>
                                <p class="text-gray-800">${request.approvedAt ? Utils.formatDate(request.approvedAt) : '-'}</p>
                            </div>
                            ` : ''}
                            ${request.status === 'rejected' ? `
                            <div>
                                <label class="text-sm font-semibold text-gray-600">مرفوض من:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(request.rejectedBy || '-')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">تاريخ الرفض:</label>
                                <p class="text-gray-800">${request.rejectedAt ? Utils.formatDate(request.rejectedAt) : '-'}</p>
                            </div>
                            ` : ''}
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">الملاحظات / السبب:</label>
                            <p class="text-gray-800 bg-gray-50 p-3 rounded-lg border">${Utils.escapeHTML(request.comments || request.reason || '-')}</p>
                        </div>
                        ${request.rejectionReason ? `
                        <div>
                            <label class="text-sm font-semibold text-red-600">سبب الرفض:</label>
                            <p class="text-red-800 bg-red-50 p-3 rounded-lg border border-red-200">${Utils.escapeHTML(request.rejectionReason)}</p>
                        </div>
                        ` : ''}
                    </div>
                </div>
                <div class="modal-footer" style="padding: 1rem 1.5rem; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 0.75rem;">
                    <button type="button" class="btn-secondary" onclick="FireEquipment.confirmClose(this)">
                        <i class="fas fa-times ml-2"></i>
                        إغلاق
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    },

    /**
     * تعديل طلب
     */
    async editRequest(requestId) {
        if (!this.isAdmin()) {
            Notification.error('ليس لديك صلاحية لتعديل الطلبات');
            return;
        }

        const requests = this.getApprovalRequests();
        const request = requests.find(r => r.id === requestId);
        if (!request) {
            Notification.error('لم يتم العثور على الطلب');
            return;
        }

        const comments = prompt('تعديل الملاحظات:', request.comments || '');
        if (comments === null) return;

        Loading.show();
        try {
            request.comments = comments;
            request.updatedAt = new Date().toISOString();

            // حفظ التغييرات
            if (!AppState.appData) AppState.appData = {};
            AppState.appData.fireEquipmentApprovalRequests = requests;
            
            // حفظ في localStorage
            if (typeof DataManager !== 'undefined' && DataManager.save) {
                DataManager.save();
            } else {
                localStorage.setItem('fire_equipment_approval_requests', JSON.stringify(requests));
            }

            Notification.success('تم تحديث الطلب بنجاح');
            await this.switchTab('approval-requests');
        } catch (error) {
            Utils.safeError('❌ خطأ في تعديل الطلب:', error);
            Notification.error('حدث خطأ أثناء تعديل الطلب');
        } finally {
            Loading.hide();
        }
    },

    /**
     * حذف طلب
     */
    async deleteRequest(requestId) {
        if (!this.isAdmin()) {
            Notification.error('ليس لديك صلاحية لحذف الطلبات');
            return;
        }

        const confirmed = confirm('هل أنت متأكد من حذف هذا الطلب؟');
        if (!confirmed) return;

        Loading.show();
        try {
            const requests = this.getApprovalRequests();
            const requestIndex = requests.findIndex(r => r.id === requestId);
            if (requestIndex === -1) {
                Notification.error('لم يتم العثور على الطلب');
                return;
            }

            requests.splice(requestIndex, 1);

            // حفظ التغييرات
            if (!AppState.appData) AppState.appData = {};
            AppState.appData.fireEquipmentApprovalRequests = requests;
            
            // حفظ في localStorage
            if (typeof DataManager !== 'undefined' && DataManager.save) {
                DataManager.save();
            } else {
                localStorage.setItem('fire_equipment_approval_requests', JSON.stringify(requests));
            }

            // حذف من Google Sheets إذا كان متاحاً
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                await GoogleIntegration.sendRequest({
                    action: 'deleteFireEquipmentApprovalRequest',
                    data: { requestId }
                }).catch(error => {
                    Utils.safeWarn('⚠️ تعذر حذف الطلب من Google Sheets:', error);
                });
            }

            Notification.success('تم حذف الطلب بنجاح');
            await this.switchTab('approval-requests');
        } catch (error) {
            Utils.safeError('❌ خطأ في حذف الطلب:', error);
            Notification.error('حدث خطأ أثناء حذف الطلب');
        } finally {
            Loading.hide();
        }
    },

    /**
     * الحصول على قائمة المواقع من إعدادات النماذج
     */
    getSiteOptions() {
        try {
            // محاولة الحصول من Permissions.formSettingsState
            if (typeof Permissions !== 'undefined' && Permissions.formSettingsState && Permissions.formSettingsState.sites) {
                return Permissions.formSettingsState.sites.map(site => ({
                    id: site.id,
                    name: site.name
                }));
            }

            // محاولة الحصول من AppState.appData.observationSites
            if (Array.isArray(AppState.appData?.observationSites) && AppState.appData.observationSites.length > 0) {
                return AppState.appData.observationSites.map(site => ({
                    id: site.id || site.siteId || Utils.generateId('SITE'),
                    name: site.name || site.title || site.label || 'موقع غير محدد'
                }));
            }

            // محاولة الحصول من DailyObservations
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

    refreshSiteDropdowns() {
        try {
            var sites = this.getSiteOptions();
            var esc = (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML : function(s) { return String(s == null ? '' : s); };
            var opts = '<option value="">اختر المصنع</option>' + (sites || []).map(function(s) { return '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>'; }).join('');
            ['asset-factory', 'fire-assets-location'].forEach(function(id) {
                var el = document.getElementById(id);
                if (el && el.tagName === 'SELECT') { var v = el.value; el.innerHTML = opts; if (v) el.value = v; }
            });
            var sub = document.getElementById('asset-sub-location');
            if (sub && sub.tagName === 'SELECT') {
                var factoryId = (document.getElementById('asset-factory') || {}).value;
                var places = this.getPlaceOptions(factoryId);
                sub.innerHTML = '<option value="">اختر الموقع الفرعي</option>' + (places || []).map(function(p) { return '<option value="' + esc(p.id) + '">' + esc(p.name) + '</option>'; }).join('');
            }
        } catch (e) { if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('⚠️ FireEquipment.refreshSiteDropdowns:', e); }
    },

    /**
     * الحصول على قائمة الأماكن الفرعية لموقع محدد
     */
    getPlaceOptions(siteId) {
        try {
            if (!siteId) return [];

            const sites = this.getSiteOptions();
            const selectedSite = sites.find(s => s.id === siteId);
            if (!selectedSite) return [];

            // محاولة الحصول من Permissions.formSettingsState
            if (typeof Permissions !== 'undefined' && Permissions.formSettingsState && Permissions.formSettingsState.sites) {
                const site = Permissions.formSettingsState.sites.find(s => s.id === siteId);
                if (site && Array.isArray(site.places)) {
                    return site.places.map(place => ({
                        id: place.id,
                        name: place.name
                    }));
                }
            }

            // محاولة الحصول من AppState.appData.observationSites
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

            // محاولة الحصول من DailyObservations
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
            Utils.safeWarn('⚠️ خطأ في الحصول على قائمة الأماكن الفرعية:', error);
            return [];
        }
    }
};

// ===== Export module to global scope =====
// تصدير الموديول إلى window فوراً لضمان توافره
(function () {
    'use strict';
    try {
        if (typeof window !== 'undefined' && typeof FireEquipment !== 'undefined') {
            window.FireEquipment = FireEquipment;
            
            // إشعار عند تحميل الموديول بنجاح
            if (typeof AppState !== 'undefined' && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ FireEquipment module loaded and available on window.FireEquipment');
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تصدير FireEquipment:', error);
        // محاولة التصدير مرة أخرى حتى في حالة الخطأ
        if (typeof window !== 'undefined' && typeof FireEquipment !== 'undefined') {
            try {
                window.FireEquipment = FireEquipment;
            } catch (e) {
                console.error('❌ فشل تصدير FireEquipment:', e);
            }
        }
    }
})();