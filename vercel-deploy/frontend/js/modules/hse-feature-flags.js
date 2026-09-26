/**
 * HSE Feature Flags Module — ICAPP Safety System
 * نظام التحكم بالميزات التجريبية والجديدة (Feature Flags & Kill Switch)
 * v1.0 — 2026-09-26
 *
 * يوفر تحكماً مركزياً سلساً في تفعيل/تعطيل الميزات قيد الاختبار أو التطوير
 * دون الحاجة لإعادة نشر الكود أو تعديله، مع لوحة تحكم سرية للمشرفين.
 *
 * Usage:
 *   HseFeatureFlags.isEnabled('voice_dictation')       — فحص هل الميزة مفعلة
 *   HseFeatureFlags.openSettingsModal()                 — فتح لوحة التحكم السرية
 *   HseFeatureFlags.subscribe('voice_dictation', fn)    — الاستماع للتغييرات الحية
 *   HseFeatureFlags.toggle('voice_dictation')           — عكس حالة الميزة
 */
const HseFeatureFlags = (() => {
    'use strict';

    const STORAGE_KEY = 'HSE_FEATURE_FLAGS_OVERRIDES';
    const EVENT_FLAG_CHANGED = 'hse-feature-flag-changed';

    /**
     * ── تعريف الميزات الافتراضية (Master Flags Registry) ───────
     */
    const MASTER_FLAGS = {
        voice_dictation: {
            id: 'voice_dictation',
            default: false,
            badge: 'BETA',
            badgeColor: '#8b5cf6',
            category: 'ai_smart',
            labelAr: 'التفتيش الصوتي بدون يدين (Voice Dictation)',
            labelEn: 'Hands-Free Voice Dictation',
            descAr: 'تحويل الكلام الصوتي المباشر لملاحظات مكتوبة في كشف المرور والملاحظات الميدانية في البيئات الصعبة وثلاجات التجميد.',
            descEn: 'Transcribe spoken words into text observations in daily safety checklist and forms.'
        },
        image_smart_compress: {
            id: 'image_smart_compress',
            default: true,
            badge: 'NEW',
            badgeColor: '#10b981',
            category: 'ux_performance',
            labelAr: 'الضغط الذكي التلقائي لصور الكاميرا',
            labelEn: 'Smart Auto Image Compression',
            descAr: 'ضغط صور الملاحظات تلقائياً قبل الرفع لتسريع الإرسال وتوفير باقة الهاتف في المناطق ذات التغطية الضعيفة.',
            descEn: 'Compresses photos on device before upload to speed up field submissions in low-signal areas.'
        },
        glossary_overlay: {
            id: 'glossary_overlay',
            default: true,
            badge: 'NEW',
            badgeColor: '#0ea5e9',
            category: 'ux_performance',
            labelAr: 'المساعد التفاعلي ومعجم المصطلحات (Glossary Tooltips)',
            labelEn: 'Interactive HSE Glossary Overlay',
            descAr: 'عرض شروح فورية وبطاقات توضيحية وأمثلة عند الضغط على المصطلحات الفنية (LOTO, Near Miss, OSHA, إلخ).',
            descEn: 'Displays instant popover explanation cards for technical safety terms and standards.'
        },
        multilingual_ur: {
            id: 'multilingual_ur',
            default: false,
            badge: 'EXPERIMENTAL',
            badgeColor: '#f59e0b',
            category: 'localization',
            labelAr: 'لغة الأوردو (Urdu) للعمالة الميدانية والمقاولين',
            labelEn: 'Urdu Language for Field Contractors',
            descAr: 'إضافة الأوردو كخيار لغة ثالثة إلى جانب العربية والإنجليزية في بطاقات التوعية وجلسات TBT.',
            descEn: 'Adds Urdu as a third language option alongside Arabic and English for contractor safety inductions.'
        },
        quick_qr_scanner: {
            id: 'quick_qr_scanner',
            default: true,
            badge: 'STABLE',
            badgeColor: '#2563eb',
            category: 'inspection',
            labelAr: 'الماسح السريع لكود QR الميداني للمعدات',
            labelEn: 'Quick Equipment QR Scanner',
            descAr: 'إتاحة زر الكاميرا لمسح كود QR الملصق على الطفايات والمعدات لفتح النموذج المناسب فوراً.',
            descEn: 'Enables camera QR scanning on equipment & extinguishers to jump straight to their inspection form.'
        },
        action_closure_workflow: {
            id: 'action_closure_workflow',
            default: false,
            badge: 'BETA',
            badgeColor: '#ec4899',
            category: 'inspection',
            labelAr: 'حلقة إغلاق الملاحظات الحرجة (Action Closure)',
            labelEn: 'Critical Action Closure Workflow',
            descAr: 'إتاحة رفع صورة "بعد الإصلاح" وتوثيق إغلاق الملاحظات ذات الخطورة العالية مباشرة.',
            descEn: 'Allows uploading "after fix" photos and marking high-risk observations as closed.'
        },
        offline_queue_inspector: {
            id: 'offline_queue_inspector',
            default: true,
            badge: 'STABLE',
            badgeColor: '#10b981',
            category: 'ux_performance',
            labelAr: 'شريط فحص ومزامنة سجلات الأوفلاين',
            labelEn: 'Offline Records Inspector & Sync Bar',
            descAr: 'إظهار مؤشر تفاعلي بعدد السجلات المحفوظة في وضع عدم الاتصال مع إمكانية المزامنة اليدوية.',
            descEn: 'Shows live count of pending offline records with manual immediate sync trigger.'
        },
        strict_signature_audit: {
            id: 'strict_signature_audit',
            default: true,
            badge: 'STABLE',
            badgeColor: '#059669',
            category: 'security_audit',
            labelAr: 'التدقيق الصارم للتوقيع الرقمي ومطابقة الوردية',
            labelEn: 'Strict Digital Signature & Shift Audit',
            descAr: 'منع إرسال أي تقرير مرور أو تفتيش بدون توقيع يدوي مكتمل وتسجيل الطابع الزمني الموثق.',
            descEn: 'Enforces complete touch signature and audit timestamps on all inspection submissions.'
        }
    };

    /**
     * الفئات وتسمياتها
     */
    const CATEGORIES = {
        ai_smart: { ar: 'الذكاء الاصطناعي والميزات الذكية', en: 'AI & Smart Features', icon: 'fa-brain' },
        ux_performance: { ar: 'تجربة المستخدم وسرعة الأداء', en: 'UX & Performance', icon: 'fa-bolt' },
        inspection: { ar: 'التفتيش والمتابعة الميدانية', en: 'Field Inspection', icon: 'fa-clipboard-check' },
        localization: { ar: 'اللغات والتوطين', en: 'Languages & Localization', icon: 'fa-language' },
        security_audit: { ar: 'الحوكمة والأمن المعياري', en: 'Governance & Audit', icon: 'fa-shield-halved' }
    };

    /**
     * قراءة التعديلات المحلية (Overrides) من localStorage
     */
    function getStoredOverrides() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (_e) {
            return {};
        }
    }

    /**
     * حفظ التعديلات المحلية
     */
    function saveStoredOverrides(overrides) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
        } catch (_e) {
            console.warn('[FeatureFlags] تعذر حفظ التعديلات في localStorage');
        }
    }

    /**
     * قراءة تجاوزات شريط العنوان URL (للاختبار والمشاركة السريعة)
     * e.g., ?ff_voice_dictation=1 or ?ff_enable_all=1 or ?ff_reset=1
     */
    function getUrlOverrides() {
        const overrides = {};
        try {
            if (typeof window === 'undefined' || !window.location || !window.location.search) {
                return overrides;
            }
            const params = new URLSearchParams(window.location.search);

            if (params.get('ff_reset') === '1' || params.get('ff_reset') === 'true') {
                localStorage.removeItem(STORAGE_KEY);
            }

            params.forEach((value, key) => {
                if (key.startsWith('ff_')) {
                    const flagId = key.substring(3);
                    if (MASTER_FLAGS[flagId]) {
                        overrides[flagId] = (value === '1' || value === 'true' || value === 'yes');
                    }
                }
            });
        } catch (_e) {
            /* ignore */
        }
        return overrides;
    }

    const urlOverrides = getUrlOverrides();

    /**
     * التحقق هل ميزة معينة مفعلة
     */
    function isEnabled(flagId, fallbackDefault = false) {
        if (!flagId) return fallbackDefault;

        // 1. أولوية لـ URL Params (مفيدة للاختبار الميداني السريع)
        if (Object.prototype.hasOwnProperty.call(urlOverrides, flagId)) {
            return !!urlOverrides[flagId];
        }

        // 2. ثانياً localStorage Overrides
        const overrides = getStoredOverrides();
        if (Object.prototype.hasOwnProperty.call(overrides, flagId)) {
            return !!overrides[flagId];
        }

        // 3. ثالثاً القيمة الافتراضية المحددة في النظام
        if (MASTER_FLAGS[flagId]) {
            return !!MASTER_FLAGS[flagId].default;
        }

        return fallbackDefault;
    }

    /**
     * تعيين حالة ميزة
     */
    function set(flagId, value) {
        if (!MASTER_FLAGS[flagId]) {
            console.warn(`[FeatureFlags] ميزة غير معروفة: ${flagId}`);
            return;
        }
        const overrides = getStoredOverrides();
        overrides[flagId] = !!value;
        saveStoredOverrides(overrides);

        dispatchChangeEvent(flagId, overrides[flagId]);
    }

    /**
     * عكس حالة ميزة
     */
    function toggle(flagId) {
        const current = isEnabled(flagId);
        set(flagId, !current);
        return !current;
    }

    /**
     * استعادة القيمة الافتراضية لميزة واحدة
     */
    function reset(flagId) {
        const overrides = getStoredOverrides();
        if (Object.prototype.hasOwnProperty.call(overrides, flagId)) {
            delete overrides[flagId];
            saveStoredOverrides(overrides);
            dispatchChangeEvent(flagId, isEnabled(flagId));
        }
    }

    /**
     * استعادة كافة الميزات للوضع الافتراضي
     */
    function resetAll() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (_e) { /* ignore */ }

        Object.keys(MASTER_FLAGS).forEach(id => {
            dispatchChangeEvent(id, MASTER_FLAGS[id].default);
        });
    }

    /**
     * جلب قائمة جميع الميزات مع تفاصيلها وحالتها الحالية
     */
    function getAll() {
        const overrides = getStoredOverrides();
        return Object.keys(MASTER_FLAGS).map(id => {
            const def = MASTER_FLAGS[id];
            const hasOverride = Object.prototype.hasOwnProperty.call(overrides, id) || Object.prototype.hasOwnProperty.call(urlOverrides, id);
            const active = isEnabled(id);
            return {
                ...def,
                enabled: active,
                isOverridden: hasOverride,
                source: Object.prototype.hasOwnProperty.call(urlOverrides, id) ? 'url' : (Object.prototype.hasOwnProperty.call(overrides, id) ? 'local' : 'default')
            };
        });
    }

    /**
     * الاستماع لتغيير ميزة
     */
    function subscribe(flagIdOrWildcard, callback) {
        if (typeof window === 'undefined' || typeof callback !== 'function') return () => {};

        const handler = (evt) => {
            if (!evt || !evt.detail) return;
            const { flagId, enabled } = evt.detail;
            if (flagIdOrWildcard === '*' || flagIdOrWildcard === flagId) {
                callback(enabled, flagId);
            }
        };

        window.addEventListener(EVENT_FLAG_CHANGED, handler);
        return () => window.removeEventListener(EVENT_FLAG_CHANGED, handler);
    }

    function dispatchChangeEvent(flagId, enabled) {
        if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
            try {
                window.dispatchEvent(new CustomEvent(EVENT_FLAG_CHANGED, {
                    detail: { flagId, enabled, timestamp: Date.now() }
                }));
            } catch (_e) { /* ignore */ }
        }
    }

    /**
     * ── واجهة المستخدم للوحة التحكم بالميزات (Admin Feature Flags Modal) ──
     */
    let modalEl = null;

    function createModalDom() {
        if (modalEl && document.body.contains(modalEl)) {
            return modalEl;
        }

        const isRtl = (document.documentElement.dir === 'rtl' || !document.documentElement.dir);
        const lang = localStorage.getItem('HSE_PORTAL_LANG') || 'ar';
        const isAr = lang === 'ar';

        const wrapper = document.createElement('div');
        wrapper.id = 'hseFeatureFlagsModal';
        wrapper.className = 'hse-ff-modal-backdrop';
        wrapper.setAttribute('role', 'dialog');
        wrapper.setAttribute('aria-modal', 'true');
        wrapper.innerHTML = `
            <div class="hse-ff-modal-container">
                <div class="hse-ff-modal-header">
                    <div class="hse-ff-header-title-wrap">
                        <div class="hse-ff-header-icon"><i class="fas fa-sliders"></i></div>
                        <div>
                            <h3 class="hse-ff-title">${isAr ? 'لوحة التحكم بالميزات التجريبية' : 'Feature Flags Control Panel'}</h3>
                            <p class="hse-ff-subtitle">${isAr ? 'إدارة وتفعيل ميزات النظام التجريبية بمرونة فورية' : 'Manage & toggle experimental portal features in real-time'}</p>
                        </div>
                    </div>
                    <button type="button" class="hse-ff-close-btn" id="hseFfCloseBtn" title="${isAr ? 'إغلاق' : 'Close'}">&times;</button>
                </div>

                <div class="hse-ff-search-bar">
                    <i class="fas fa-search hse-ff-search-icon"></i>
                    <input type="text" id="hseFfSearchInput" class="hse-ff-search-input" placeholder="${isAr ? 'ابحث في الميزات أو الفئات...' : 'Search features or categories...'}" />
                    <button type="button" id="hseFfResetAllBtn" class="hse-ff-btn-secondary" title="${isAr ? 'استعادة الافتراضيات' : 'Reset All to Defaults'}">
                        <i class="fas fa-rotate-left"></i> <span>${isAr ? 'استعادة الافتراضي' : 'Reset Defaults'}</span>
                    </button>
                </div>

                <div class="hse-ff-modal-body" id="hseFfListContainer">
                    <!-- سيتم توليد بنود الميزات هنا -->
                </div>

                <div class="hse-ff-modal-footer">
                    <div class="hse-ff-footer-info">
                        <span class="hse-ff-status-pill"><i class="fas fa-code-branch"></i> ICAPP v1.0.1751</span>
                        <span style="font-size: 11.5px; color: #64748b;">${isAr ? 'التغييرات تُحفظ فورياً بهذا المتصفح' : 'Changes apply immediately to this browser'}</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" class="hse-ff-btn-primary" id="hseFfDoneBtn">
                            <i class="fas fa-check"></i> <span>${isAr ? 'تم وحفظ' : 'Done & Apply'}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(wrapper);
        modalEl = wrapper;

        // الربط بالفعاليات
        const closeBtn = wrapper.querySelector('#hseFfCloseBtn');
        const doneBtn = wrapper.querySelector('#hseFfDoneBtn');
        const resetBtn = wrapper.querySelector('#hseFfResetAllBtn');
        const searchInput = wrapper.querySelector('#hseFfSearchInput');

        if (closeBtn) closeBtn.onclick = closeSettingsModal;
        if (doneBtn) doneBtn.onclick = () => {
            closeSettingsModal();
            // ومضة تنبيه لطيفة
            if (typeof window.showToast === 'function') {
                window.showToast(isAr ? 'تم تطبيق إعدادات الميزات بنجاح' : 'Feature settings applied successfully', 'success');
            }
        };

        if (resetBtn) resetBtn.onclick = () => {
            if (confirm(isAr ? 'هل تريد استعادة جميع الميزات للوضع الافتراضي؟' : 'Reset all features to system defaults?')) {
                resetAll();
                renderFlagsList();
            }
        };

        if (searchInput) {
            searchInput.oninput = () => {
                renderFlagsList(searchInput.value.trim().toLowerCase());
            };
        }

        // إغلاق عند النقر بالخلفية
        wrapper.onclick = (e) => {
            if (e.target === wrapper) closeSettingsModal();
        };

        return wrapper;
    }

    function renderFlagsList(filterText = '') {
        const container = document.getElementById('hseFfListContainer');
        if (!container) return;

        const lang = localStorage.getItem('HSE_PORTAL_LANG') || 'ar';
        const isAr = lang === 'ar';
        const flags = getAll();

        // تجميع حسب الفئة
        const grouped = {};
        Object.keys(CATEGORIES).forEach(cat => { grouped[cat] = []; });

        flags.forEach(flag => {
            const cat = flag.category || 'ux_performance';
            if (!grouped[cat]) grouped[cat] = [];

            if (filterText) {
                const searchHaystack = `${flag.id} ${flag.labelAr} ${flag.labelEn} ${flag.descAr} ${flag.descEn}`.toLowerCase();
                if (!searchHaystack.includes(filterText)) return;
            }
            grouped[cat].push(flag);
        });

        let html = '';
        let totalRendered = 0;

        Object.keys(grouped).forEach(catKey => {
            const list = grouped[catKey];
            if (!list || list.length === 0) return;

            totalRendered += list.length;
            const catMeta = CATEGORIES[catKey] || { ar: catKey, en: catKey, icon: 'fa-folder' };

            html += `
                <div class="hse-ff-category-group">
                    <div class="hse-ff-category-header">
                        <i class="fas ${catMeta.icon}"></i>
                        <span>${isAr ? catMeta.ar : catMeta.en}</span>
                        <span class="hse-ff-cat-badge">${list.length}</span>
                    </div>
                    <div class="hse-ff-items-wrap">
            `;

            list.forEach(flag => {
                const isChecked = flag.enabled ? 'checked' : '';
                const title = isAr ? flag.labelAr : flag.labelEn;
                const desc = isAr ? flag.descAr : flag.descEn;

                let overrideBadge = '';
                if (flag.isOverridden) {
                    overrideBadge = `
                        <span class="hse-ff-override-pill" title="${isAr ? 'تم تعديلها محلياً' : 'Locally overridden'}">
                            ${isAr ? 'مُعدل محلياً' : 'Overridden'}
                        </span>
                        <button type="button" class="hse-ff-revert-btn" onclick="HseFeatureFlags.reset('${flag.id}'); HseFeatureFlags.refreshUi();" title="${isAr ? 'استعادة الافتراضي' : 'Reset to default'}">
                            <i class="fas fa-undo"></i>
                        </button>
                    `;
                }

                html += `
                    <div class="hse-ff-card ${flag.enabled ? 'is-active' : ''}">
                        <div class="hse-ff-card-info">
                            <div class="hse-ff-card-top">
                                <span class="hse-ff-card-title">${title}</span>
                                <span class="hse-ff-badge" style="background-color: ${flag.badgeColor || '#3b82f6'};">${flag.badge}</span>
                                ${overrideBadge}
                            </div>
                            <div class="hse-ff-card-desc">${desc}</div>
                            <div class="hse-ff-card-key"><code>${flag.id}</code> (Default: <strong>${flag.default ? 'ON' : 'OFF'}</strong>)</div>
                        </div>
                        <div class="hse-ff-card-action">
                            <label class="hse-ff-switch">
                                <input type="checkbox" ${isChecked} onchange="HseFeatureFlags.set('${flag.id}', this.checked); HseFeatureFlags.refreshUi();" />
                                <span class="hse-ff-slider"></span>
                            </label>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        if (totalRendered === 0) {
            html = `
                <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
                    <i class="fas fa-search" style="font-size: 2.2rem; margin-bottom: 12px; opacity: 0.5;"></i>
                    <p style="font-size: 14px; font-weight: 700; margin: 0;">${isAr ? 'لم يتم العثور على ميزات مطابقة للبحث' : 'No matching features found'}</p>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    function openSettingsModal() {
        injectStyles();
        const modal = createModalDom();
        renderFlagsList();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeSettingsModal() {
        if (modalEl) {
            modalEl.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    }

    function refreshUi() {
        if (modalEl && modalEl.classList.contains('is-open')) {
            const searchInput = modalEl.querySelector('#hseFfSearchInput');
            renderFlagsList(searchInput ? searchInput.value.trim().toLowerCase() : '');
        }
    }

    /**
     * إدراج أنماط CSS الخاصة بلوحة التحكم
     */
    function injectStyles() {
        if (document.getElementById('hseFeatureFlagsStyles')) return;

        const css = `
            /* ═════════ HSE Feature Flags Styles ═════════ */
            .hse-ff-modal-backdrop {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(15, 23, 42, 0.75);
                backdrop-filter: blur(6px);
                -webkit-backdrop-filter: blur(6px);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.25s ease, visibility 0.25s ease;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Arabic', sans-serif;
            }
            .hse-ff-modal-backdrop.is-open {
                opacity: 1;
                visibility: visible;
            }
            .hse-ff-modal-container {
                background: #ffffff;
                color: #0f172a;
                border-radius: 18px;
                width: 100%;
                max-width: 680px;
                max-height: 88vh;
                display: flex;
                flex-direction: column;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
                border: 1px solid rgba(226, 232, 240, 0.8);
                overflow: hidden;
                transform: scale(0.96);
                transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .hse-ff-modal-backdrop.is-open .hse-ff-modal-container {
                transform: scale(1);
            }
            [data-theme="dark"] .hse-ff-modal-container {
                background: #0f172a;
                color: #f8fafc;
                border-color: #334155;
            }
            .hse-ff-modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                border-bottom: 1px solid #e2e8f0;
                background: #f8fafc;
            }
            [data-theme="dark"] .hse-ff-modal-header {
                background: #1e293b;
                border-color: #334155;
            }
            .hse-ff-header-title-wrap {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .hse-ff-header-icon {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.15rem;
                box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
            }
            .hse-ff-title {
                margin: 0;
                font-size: 1.05rem;
                font-weight: 800;
                line-height: 1.3;
            }
            .hse-ff-subtitle {
                margin: 2px 0 0;
                font-size: 0.78rem;
                color: #64748b;
                line-height: 1.3;
            }
            [data-theme="dark"] .hse-ff-subtitle { color: #94a3b8; }
            .hse-ff-close-btn {
                background: none;
                border: none;
                font-size: 1.8rem;
                color: #94a3b8;
                cursor: pointer;
                line-height: 1;
                padding: 0 6px;
                border-radius: 8px;
                transition: color 0.15s, background-color 0.15s;
            }
            .hse-ff-close-btn:hover {
                color: #dc2626;
                background: #fee2e2;
            }
            [data-theme="dark"] .hse-ff-close-btn:hover { background: #450a0a; color: #f87171; }
            .hse-ff-search-bar {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px 20px;
                background: #ffffff;
                border-bottom: 1px solid #f1f5f9;
            }
            [data-theme="dark"] .hse-ff-search-bar {
                background: #0f172a;
                border-color: #1e293b;
            }
            .hse-ff-search-icon {
                color: #94a3b8;
                font-size: 0.95rem;
            }
            .hse-ff-search-input {
                flex: 1;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                padding: 7px 12px;
                font-size: 0.85rem;
                outline: none;
                transition: border-color 0.2s, box-shadow 0.2s;
            }
            .hse-ff-search-input:focus {
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
            }
            [data-theme="dark"] .hse-ff-search-input {
                background: #1e293b;
                border-color: #475569;
                color: #f8fafc;
            }
            .hse-ff-btn-secondary {
                background: #f1f5f9;
                color: #475569;
                border: 1px solid #cbd5e1;
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 0.78rem;
                font-weight: 700;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                white-space: nowrap;
                transition: all 0.2s;
            }
            .hse-ff-btn-secondary:hover {
                background: #e2e8f0;
                color: #0f172a;
            }
            [data-theme="dark"] .hse-ff-btn-secondary {
                background: #1e293b;
                color: #cbd5e1;
                border-color: #334155;
            }
            [data-theme="dark"] .hse-ff-btn-secondary:hover {
                background: #334155;
                color: #ffffff;
            }
            .hse-ff-modal-body {
                flex: 1;
                overflow-y: auto;
                padding: 16px 20px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .hse-ff-category-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .hse-ff-category-header {
                font-size: 0.82rem;
                font-weight: 800;
                color: #475569;
                display: flex;
                align-items: center;
                gap: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            [data-theme="dark"] .hse-ff-category-header { color: #94a3b8; }
            .hse-ff-cat-badge {
                font-size: 0.7rem;
                background: #e2e8f0;
                color: #475569;
                padding: 1px 7px;
                border-radius: 9999px;
            }
            [data-theme="dark"] .hse-ff-cat-badge { background: #334155; color: #cbd5e1; }
            .hse-ff-items-wrap {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .hse-ff-card {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 12px 14px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 14px;
                transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
            }
            .hse-ff-card:hover {
                border-color: #93c5fd;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            }
            .hse-ff-card.is-active {
                border-left: 3px solid #10b981;
            }
            [data-theme="dark"] .hse-ff-card {
                background: #1e293b;
                border-color: #334155;
            }
            [data-theme="dark"] .hse-ff-card:hover { border-color: #60a5fa; }
            .hse-ff-card-info {
                flex: 1;
                min-width: 0;
            }
            .hse-ff-card-top {
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
                margin-bottom: 3px;
            }
            .hse-ff-card-title {
                font-size: 0.9rem;
                font-weight: 800;
                color: #0f172a;
            }
            [data-theme="dark"] .hse-ff-card-title { color: #f8fafc; }
            .hse-ff-badge {
                font-size: 0.65rem;
                font-weight: 800;
                color: #ffffff;
                padding: 2px 6px;
                border-radius: 4px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .hse-ff-override-pill {
                font-size: 0.68rem;
                font-weight: 700;
                background: #fef3c7;
                color: #b45309;
                border: 1px solid #fde68a;
                padding: 1px 7px;
                border-radius: 9999px;
            }
            [data-theme="dark"] .hse-ff-override-pill {
                background: #451a03;
                color: #fcd34d;
                border-color: #78350f;
            }
            .hse-ff-revert-btn {
                background: none;
                border: none;
                color: #94a3b8;
                cursor: pointer;
                padding: 2px 5px;
                font-size: 0.78rem;
                border-radius: 4px;
            }
            .hse-ff-revert-btn:hover { color: #dc2626; background: #fee2e2; }
            .hse-ff-card-desc {
                font-size: 0.78rem;
                color: #475569;
                line-height: 1.4;
                margin-bottom: 4px;
            }
            [data-theme="dark"] .hse-ff-card-desc { color: #94a3b8; }
            .hse-ff-card-key {
                font-size: 0.72rem;
                color: #94a3b8;
            }
            .hse-ff-card-key code {
                font-family: monospace;
                background: #f1f5f9;
                padding: 1px 5px;
                border-radius: 4px;
                color: #2563eb;
            }
            [data-theme="dark"] .hse-ff-card-key code {
                background: #0f172a;
                color: #60a5fa;
            }
            /* iOS-style toggle switch */
            .hse-ff-switch {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 24px;
                flex-shrink: 0;
            }
            .hse-ff-switch input { opacity: 0; width: 0; height: 0; }
            .hse-ff-slider {
                position: absolute;
                cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: #cbd5e1;
                transition: .25s;
                border-radius: 24px;
            }
            [data-theme="dark"] .hse-ff-slider { background-color: #475569; }
            .hse-ff-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: .25s;
                border-radius: 50%;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }
            .hse-ff-switch input:checked + .hse-ff-slider {
                background-color: #10b981;
            }
            .hse-ff-switch input:checked + .hse-ff-slider:before {
                transform: translateX(20px);
            }
            .hse-ff-modal-footer {
                padding: 12px 20px;
                background: #f8fafc;
                border-top: 1px solid #e2e8f0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                flex-wrap: wrap;
            }
            [data-theme="dark"] .hse-ff-modal-footer {
                background: #1e293b;
                border-color: #334155;
            }
            .hse-ff-footer-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .hse-ff-status-pill {
                font-size: 0.72rem;
                font-weight: 700;
                background: #eff6ff;
                color: #1d4ed8;
                border: 1px solid #bfdbfe;
                padding: 2px 8px;
                border-radius: 9999px;
            }
            [data-theme="dark"] .hse-ff-status-pill {
                background: #172554;
                color: #93c5fd;
                border-color: #1e3a8a;
            }
            .hse-ff-btn-primary {
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                color: #ffffff;
                border: none;
                padding: 8px 18px;
                border-radius: 8px;
                font-size: 0.85rem;
                font-weight: 800;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
                transition: transform 0.15s, box-shadow 0.15s;
            }
            .hse-ff-btn-primary:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 10px rgba(37, 99, 235, 0.4);
            }
        `;

        const style = document.createElement('style');
        style.id = 'hseFeatureFlagsStyles';
        style.textContent = css;
        document.head.appendChild(style);
    }

    /**
     * إعداد مستمعات فتح النافذة السرية (Secret Trigger Setup)
     * - النقر 5 مرات سريعة على أي وسم إصدار (footer-version-pill)
     * - اختصار لوحة المفاتيح: Ctrl + Shift + F
     * - بارامتر الرابط: ?show_flags=1
     */
    function setupSecretTriggers() {
        if (typeof window === 'undefined') return;

        // 1. اختصار الكيبورد
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
                e.preventDefault();
                openSettingsModal();
            }
        });

        // 2. النقر 5 مرات سريعة
        let clickCount = 0;
        let lastClickTime = 0;

        document.addEventListener('click', (e) => {
            const target = e.target.closest('.footer-version-pill, .tbt-version-pill, .header-title, #hubTitle, [data-ff-trigger]');
            if (!target) return;

            const now = Date.now();
            if (now - lastClickTime < 600) {
                clickCount++;
            } else {
                clickCount = 1;
            }
            lastClickTime = now;

            if (clickCount >= 5) {
                clickCount = 0;
                openSettingsModal();
            }
        });

        // 3. التحقق من بارامتر الرابط
        try {
            const params = new URLSearchParams(window.location.search);
            if (params.get('show_flags') === '1' || params.get('admin_flags') === '1') {
                setTimeout(openSettingsModal, 400);
            }
        } catch (_e) { /* ignore */ }
    }

    // التهيئة التلقائية عند تحميل الصفحة
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupSecretTriggers);
        } else {
            setupSecretTriggers();
        }
    }

    // التصدير العام
    const api = {
        isEnabled,
        set,
        toggle,
        reset,
        resetAll,
        getAll,
        subscribe,
        openSettingsModal,
        closeSettingsModal,
        refreshUi,
        MASTER_FLAGS
    };

    if (typeof window !== 'undefined') {
        window.HseFeatureFlags = api;
        window.FeatureFlags = api;
        window.HSE_FLAGS = api;
    }

    return api;
})();
