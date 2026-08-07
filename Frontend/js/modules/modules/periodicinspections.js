/**
 * PeriodicInspections Module
 * تم استخراجه من app-modules.js
 */
// ===== PeriodicInspections Module =====
const PeriodicInspections = {
    // قوالب الفحوصات الجاهزة
    INSPECTION_TEMPLATES: {
        'emergency-lights': {
            id: 'emergency-lights',
            name: 'فحص كشافات الطوارئ',
            icon: 'fa-lightbulb',
            checklist: [
                { id: 'el1', label: 'فحص عمل الكشافات بشكل تلقائي عند انقطاع الكهرباء', required: true },
                { id: 'el2', label: 'فحص شدة الإضاءة (يجب أن تكون كافية للرؤية)', required: true },
                { id: 'el3', label: 'فحص حالة البطارية (شحن كامل)', required: true },
                { id: 'el4', label: 'فحص حالة الكشاف الخارجي (عدم وجود كسور أو تشققات)', required: true },
                { id: 'el5', label: 'فحص التوصيلات الكهربائية (عدم وجود أسلاك مكشوفة)', required: true },
                { id: 'el6', label: 'فحص مؤشر الشحن (يعمل بشكل صحيح)', required: false },
                { id: 'el7', label: 'فحص تاريخ آخر صيانة', required: false },
                { id: 'el8', label: 'فحص موقع التثبيت (في المكان الصحيح)', required: true }
            ]
        },
        'fire-extinguisher': {
            id: 'fire-extinguisher',
            name: 'فحص معدات الإطفاء (الاستكر)',
            icon: 'fa-fire-extinguisher',
            checklist: [
                { id: 'fe1', label: 'فحص تاريخ الصلاحية (لم تنتهِ)', required: true },
                { id: 'fe2', label: 'فحص عداد الضغط (في المنطقة الخضراء)', required: true },
                { id: 'fe3', label: 'فحص سلامة الختم (غير مكسور)', required: true },
                { id: 'fe4', label: 'فحص حالة الخرطوم (لا يوجد تلف أو تشققات)', required: true },
                { id: 'fe5', label: 'فحص حالة الفوهة (نظيفة وغير مسدودة)', required: true },
                { id: 'fe6', label: 'فحص موقع التثبيت (في المكان المحدد)', required: true },
                { id: 'fe7', label: 'فحص لافتة التعريف (واضحة ومقروءة)', required: true },
                { id: 'fe8', label: 'فحص سهولة الوصول (غير معوق)', required: true },
                { id: 'fe9', label: 'فحص نوع المادة (مناسبة لنوع الحريق)', required: true },
                { id: 'fe10', label: 'فحص حالة الحامل (مثبت بشكل آمن)', required: false }
            ]
        },
        'forklift': {
            id: 'forklift',
            name: 'فحص معدات الكلارك (الرافعات الشوكية)',
            icon: 'fa-truck-loading',
            checklist: [
                { id: 'fl1', label: 'فحص نظام الفرامل (يعمل بشكل صحيح)', required: true },
                { id: 'fl2', label: 'فحص شوكتي الرفع (عدم وجود تشققات أو تلف)', required: true },
                { id: 'fl3', label: 'فحص البطارية أو خزان الوقود (ممتلئ، لا يوجد تسريب)', required: true },
                { id: 'fl4', label: 'فحص الإطارات (حالة جيدة، ضغط مناسب)', required: true },
                { id: 'fl5', label: 'فحص نظام الإضاءة (المصابيح الأمامية والخلفية)', required: true },
                { id: 'fl6', label: 'فحص نظام الإنذار (الصافرة تعمل)', required: true },
                { id: 'fl7', label: 'فحص حزام الأمان (سليم ويعمل)', required: true },
                { id: 'fl8', label: 'فحص نظام الرفع والهبوط (يعمل بسلاسة)', required: true },
                { id: 'fl9', label: 'فحص المرايا (نظيفة ومثبتة)', required: false },
                { id: 'fl10', label: 'فحص مستويات الزيوت والمواد الهيدروليكية', required: true },
                { id: 'fl11', label: 'فحص شهادة الصيانة الدورية', required: true },
                { id: 'fl12', label: 'فحص رخصة السائق (سارية)', required: true }
            ]
        },
        'ladders': {
            id: 'ladders',
            name: 'فحص السلالم الثابتة والمتحركة',
            icon: 'fa-stairs',
            checklist: [
                { id: 'ld1', label: 'ثبات السلم وعدم وجود اهتزاز', required: true },
                { id: 'ld2', label: 'سلامة الدرجات وعدم وجود كسر أو تشققات', required: true },
                { id: 'ld3', label: 'نظافة السلم وخلوه من الزيوت أو الشحوم', required: false },
                { id: 'ld4', label: 'سلامة الدرابزين والحواجز', required: true },
                { id: 'ld5', label: 'التثبيت والربط بشكل آمن', required: true },
                { id: 'ld6', label: 'لافتة التعريف أو بطاقة الفحص واضحة', required: false }
            ]
        },
        'emergency-doors': {
            id: 'emergency-doors',
            name: 'فحص أبواب الطوارئ',
            icon: 'fa-door-open',
            checklist: [
                { id: 'ed1', label: 'فحص سهولة الفتح (يفتح بسهولة دون قوة زائدة)', required: true },
                { id: 'ed2', label: 'فحص اتجاه الفتح (يفتح للخارج)', required: true },
                { id: 'ed3', label: 'فحص حالة القفل (يعمل بشكل صحيح)', required: true },
                { id: 'ed4', label: 'فحص لافتة "مخرج طوارئ" (واضحة ومضيئة)', required: true },
                { id: 'ed5', label: 'فحص الإضاءة الطارئة فوق الباب (تعمل)', required: true },
                { id: 'ed6', label: 'فحص عدم وجود عوائق أمام الباب', required: true },
                { id: 'ed7', label: 'فحص حالة الباب (لا يوجد تلف أو تشققات)', required: true },
                { id: 'ed8', label: 'فحص نظام الإنذار (يعمل عند الفتح)', required: false },
                { id: 'ed9', label: 'فحص عرض الباب (كافٍ لمرور الأشخاص)', required: true }
            ]
        },
        'boiler': {
            id: 'boiler',
            name: 'فحص الغلاية / المرجل البخارية',
            icon: 'fa-fire',
            checklist: [
                { id: 'bl1', label: 'فحص عداد الضغط (في النطاق الآمن)', required: true },
                { id: 'bl2', label: 'فحص صمام الأمان (يعمل بشكل صحيح)', required: true },
                { id: 'bl3', label: 'فحص مستوى الماء (في المستوى المطلوب)', required: true },
                { id: 'bl4', label: 'فحص نظام الاحتراق (يعمل بكفاءة)', required: true },
                { id: 'bl5', label: 'فحص عدم وجود تسريبات (ماء، بخار، وقود)', required: true },
                { id: 'bl6', label: 'فحص نظام التهوية (يعمل بشكل صحيح)', required: true },
                { id: 'bl7', label: 'فحص حالة العزل الحراري (سليم)', required: true },
                { id: 'bl8', label: 'فحص شهادة الفحص الدوري (سارية)', required: true },
                { id: 'bl9', label: 'فحص نظام الإنذار (يعمل)', required: true },
                { id: 'bl10', label: 'فحص حالة الأنابيب والوصلات (لا يوجد تآكل)', required: true },
                { id: 'bl11', label: 'فحص سجل الصيانة (محدث)', required: false },
                { id: 'bl12', label: 'فحص درجة حرارة التشغيل (في النطاق الآمن)', required: true }
            ]
        },
        'rocket': {
            id: 'rocket',
            name: 'فحص الصاروخ',
            icon: 'fa-rocket',
            checklist: [
                { id: 'rk1', label: 'فحص حالة الهيكل الخارجي (لا يوجد تلف أو تشققات)', required: true },
                { id: 'rk2', label: 'فحص نظام التوجيه (يعمل بشكل صحيح)', required: true },
                { id: 'rk3', label: 'فحص نظام الدفع (سليم)', required: true },
                { id: 'rk4', label: 'فحص نظام الأمان (يعمل)', required: true },
                { id: 'rk5', label: 'فحص التوصيلات الكهربائية (سليمة)', required: true },
                { id: 'rk6', label: 'فحص حالة التخزين (في مكان آمن ومناسب)', required: true },
                { id: 'rk7', label: 'فحص شهادة الصيانة (سارية)', required: true },
                { id: 'rk8', label: 'فحص نظام الإنذار (يعمل)', required: false }
            ]
        },
        'welding-machine': {
            id: 'welding-machine',
            name: 'فحص مكينة اللحام',
            icon: 'fa-wrench',
            checklist: [
                { id: 'wm1', label: 'فحص التوصيلات الكهربائية (سليمة، لا يوجد أسلاك مكشوفة)', required: true },
                { id: 'wm2', label: 'فحص قاطع التيار (يعمل بشكل صحيح)', required: true },
                { id: 'wm3', label: 'فحص حالة الكابل (لا يوجد تلف أو تشققات)', required: true },
                { id: 'wm4', label: 'فحص قطب اللحام (في حالة جيدة)', required: true },
                { id: 'wm5', label: 'فحص نظام التبريد (يعمل إذا كان موجوداً)', required: false },
                { id: 'wm6', label: 'فحص عداد التيار (يعمل)', required: true },
                { id: 'wm7', label: 'فحص نظام التأريض (متصل بشكل صحيح)', required: true },
                { id: 'wm8', label: 'فحص حالة الهيكل (لا يوجد تلف)', required: true },
                { id: 'wm9', label: 'فحص لافتة التحذير (واضحة)', required: false },
                { id: 'wm10', label: 'فحص شهادة الصيانة (سارية)', required: true }
            ]
        },
        'electrical-rooms': {
            id: 'electrical-rooms',
            name: 'فحص غرف الكهرباء',
            icon: 'fa-bolt',
            checklist: [
                { id: 'er1', label: 'فحص نظام التهوية (يعمل بشكل صحيح)', required: true },
                { id: 'er2', label: 'فحص درجة الحرارة (في النطاق الآمن)', required: true },
                { id: 'er3', label: 'فحص نظام الإضاءة (كافٍ)', required: true },
                { id: 'er4', label: 'فحص لافتة "خطر - كهرباء" (واضحة)', required: true },
                { id: 'er5', label: 'فحص عدم وجود رطوبة أو تسريبات', required: true },
                { id: 'er6', label: 'فحص حالة الألواح الكهربائية (مغلقة بشكل آمن)', required: true },
                { id: 'er7', label: 'فحص نظام التأريض (متصل)', required: true },
                { id: 'er8', label: 'فحص عدم وجود مواد قابلة للاشتعال', required: true },
                { id: 'er9', label: 'فحص نظام الإنذار (يعمل)', required: false },
                { id: 'er10', label: 'فحص سهولة الوصول (غير معوق)', required: true },
                { id: 'er11', label: 'فحص حالة الكابلات (لا يوجد تلف)', required: true },
                { id: 'er12', label: 'فحص طفاية الحريق (موجودة وسارية)', required: true }
            ]
        },
        'hand-tools': {
            id: 'hand-tools',
            name: 'فحص العدد اليدوية',
            icon: 'fa-tools',
            checklist: [
                { id: 'ht1', label: 'فحص حالة العدد (لا يوجد تلف أو كسر)', required: true },
                { id: 'ht2', label: 'فحص المقابض (سليمة وآمنة)', required: true },
                { id: 'ht3', label: 'فحص عدم وجود صدأ أو تآكل', required: true },
                { id: 'ht4', label: 'فحص حدة الأدوات القاطعة (حادة وآمنة)', required: true },
                { id: 'ht5', label: 'فحص التخزين (في مكان مناسب ومنظم)', required: true },
                { id: 'ht6', label: 'فحص وجود لافتات التعريف (واضحة)', required: false },
                { id: 'ht7', label: 'فحص عدم وجود عيوب في التصنيع', required: true },
                { id: 'ht8', label: 'فحص تاريخ الشراء (إن أمكن)', required: false }
            ]
        },
        'safety-belt': {
            id: 'safety-belt',
            name: 'فحص حزام الأمان',
            icon: 'fa-user-shield',
            checklist: [
                { id: 'sb1', label: 'فحص حالة الحزام (لا يوجد تلف أو تمزق)', required: true },
                { id: 'sb2', label: 'فحص نظام القفل (يعمل بشكل صحيح)', required: true },
                { id: 'sb3', label: 'فحص طول الحزام (مناسب للاستخدام)', required: true },
                { id: 'sb4', label: 'فحص نقاط التثبيت (سليمة وآمنة)', required: true },
                { id: 'sb5', label: 'فحص تاريخ الصلاحية (لم تنتهِ)', required: true },
                { id: 'sb6', label: 'فحص لافتة التعريف (واضحة)', required: false },
                { id: 'sb7', label: 'فحص عدم وجود تآكل في المعادن', required: true },
                { id: 'sb8', label: 'فحص شهادة الفحص (سارية)', required: true }
            ]
        },
        'vehicles': {
            id: 'vehicles',
            name: 'فحص السيارات (الملاكي / الميكروباص)',
            icon: 'fa-car',
            checklist: [
                { id: 'vh1', label: 'فحص صلاحية التأمين (ساري)', required: true },
                { id: 'vh2', label: 'فحص صلاحية الرخصة (سارية)', required: true },
                { id: 'vh3', label: 'فحص الإطارات (حالة جيدة، ضغط مناسب)', required: true },
                { id: 'vh4', label: 'فحص نظام الفرامل (يعمل بشكل صحيح)', required: true },
                { id: 'vh5', label: 'فحص نظام الإضاءة (المصابيح تعمل)', required: true },
                { id: 'vh6', label: 'فحص المرايا (نظيفة ومثبتة)', required: true },
                { id: 'vh7', label: 'فحص حزام الأمان (يعمل)', required: true },
                { id: 'vh8', label: 'فحص وجود طفاية حريق (سارية)', required: true },
                { id: 'vh9', label: 'فحص وجود حقيبة إسعافات أولية', required: false },
                { id: 'vh10', label: 'فحص نظام الإنذار (الصافرة تعمل)', required: true },
                { id: 'vh11', label: 'فحص مستويات الزيوت والمواد', required: true },
                { id: 'vh12', label: 'فحص شهادة الفحص الدوري (سارية)', required: true }
            ]
        },
        'scaffolding': {
            id: 'scaffolding',
            name: 'فحص السقالة',
            icon: 'fa-layer-group',
            checklist: [
                { id: 'sc1', label: 'فحص استقرار السقالة (مثبتة بشكل آمن)', required: true },
                { id: 'sc2', label: 'فحص حالة الأعمدة (لا يوجد تلف أو تشققات)', required: true },
                { id: 'sc3', label: 'فحص حالة الألواح (سليمة وآمنة)', required: true },
                { id: 'sc4', label: 'فحص نظام التثبيت (مثبت بشكل صحيح)', required: true },
                { id: 'sc5', label: 'فحص وجود درابزين الحماية', required: true },
                { id: 'sc6', label: 'فحص وجود لوح الحماية السفلي', required: true },
                { id: 'sc7', label: 'فحص عدم وجود عيوب في اللحامات', required: true },
                { id: 'sc8', label: 'فحص سهولة الصعود والنزول', required: true },
                { id: 'sc9', label: 'فحص لافتة "تم الفحص" (واضحة)', required: false },
                { id: 'sc10', label: 'فحص شهادة الفحص (سارية)', required: true }
            ]
        },
        'emergency-light-bulb': {
            id: 'emergency-light-bulb',
            name: 'فحص لمبة القطعية',
            icon: 'fa-lightbulb',
            checklist: [
                { id: 'elb1', label: 'فحص عمل اللمبة عند انقطاع الكهرباء', required: true },
                { id: 'elb2', label: 'فحص شدة الإضاءة (كافية)', required: true },
                { id: 'elb3', label: 'فحص حالة اللمبة (لا يوجد كسر)', required: true },
                { id: 'elb4', label: 'فحص حالة البطارية (مشحونة)', required: true },
                { id: 'elb5', label: 'فحص التوصيلات الكهربائية (سليمة)', required: true },
                { id: 'elb6', label: 'فحص موقع التثبيت (في المكان الصحيح)', required: true },
                { id: 'elb7', label: 'فحص مؤشر الشحن (يعمل)', required: false },
                { id: 'elb8', label: 'فحص تاريخ آخر صيانة', required: false }
            ]
        }
    },

    state: {
        currentTab: 'inspections-list', // inspections-list, inspection-records, daily-safety-checklist, equipment-database
        filters: {
            category: '',
            result: '',
            dateRange: {
                start: '',
                end: ''
            },
            inspector: ''
        },
        dailySafetyFilters: {
            search: '',
            siteId: '',
            inspectorName: '',
            shift: '',
            dateFrom: '',
            dateTo: ''
        },
        dailySafetyAnalyticsControls: {
            topN: 18,
            rankingMetric: 'nonCompliantRate',
            cardStyle: 'gradient',
            barStyle: 'rounded'
        },
        dailySafetyFilterPanelOpen: false,
        currentView: 'list', // list, form, edit
        currentEditId: null,
        selectedTemplate: null
    },

    _t(key, fallback = '') {
        if (window.AppI18n && typeof window.AppI18n.t === 'function') {
            return window.AppI18n.t(key, fallback);
        }
        if (typeof I18n !== 'undefined' && I18n && typeof I18n.t === 'function') {
            return I18n.t(key, fallback);
        }
        return fallback;
    },

    _isEnglishUI() {
        try {
            if (typeof I18n !== 'undefined' && I18n && typeof I18n.getCurrentLanguage === 'function') {
                return I18n.getCurrentLanguage() === 'en';
            }
        } catch (_) {}
        return false;
    },

    _formatDailyShiftLabel(value) {
        const raw = String(value || '').trim();
        const mapAr = {
            'الأولى': this._t('module.periodic.dsc.shift.first', 'الوردية الأولى'),
            'الثانية': this._t('module.periodic.dsc.shift.second', 'الوردية الثانية'),
            'الثالثة': this._t('module.periodic.dsc.shift.third', 'الوردية الثالثة')
        };
        const mapEn = {
            'الأولى': this._t('module.periodic.dsc.shift.first', 'First Shift'),
            'الثانية': this._t('module.periodic.dsc.shift.second', 'Second Shift'),
            'الثالثة': this._t('module.periodic.dsc.shift.third', 'Third Shift')
        };
        return this._isEnglishUI() ? (mapEn[raw] || raw || '-') : (mapAr[raw] || raw || '-');
    },

    _sanitizeFileNamePart(value) {
        return String(value || '')
            .trim()
            .replace(/[\\/:*?"<>|]/g, '-')
            .replace(/\s+/g, ' ')
            .replace(/-+/g, '-');
    },

    _buildDailySafetyFileName({ ext = 'pdf', dateValue = '', shiftValue = '', full = false } = {}) {
        const reportTitle = this._isEnglishUI() ? 'Daily Safety Report' : 'تقرير_المرور_اليومي_للسلامة';
        const safeTitle = this._sanitizeFileNamePart(reportTitle).replace(/\s+/g, '_');
        const rawDate = String(dateValue || '').slice(0, 10);
        const safeDate = rawDate || new Date().toISOString().slice(0, 10);
        const shiftLabel = this._formatDailyShiftLabel(shiftValue || '').replace(/^الوردية\s+/i, '');
        const safeShift = this._sanitizeFileNamePart(shiftLabel || (this._isEnglishUI() ? 'Shift-Unknown' : 'وردية-غير-محددة')).replace(/\s+/g, '_');
        const safeExt = String(ext || 'pdf').replace('.', '').toLowerCase();
        const fullTag = full ? (this._isEnglishUI() ? 'Full' : 'كامل') : '';
        return [safeTitle, safeDate, safeShift, fullTag].filter(Boolean).join('_') + '.' + safeExt;
    },

    _getDailySafetyQuestionLabel(question) {
        const key = question && question.key ? `module.periodic.dsc.question.${question.key}` : '';
        if (!key) return String(question?.label || '');
        return this._t(key, String(question?.label || ''));
    },

    _getDailySafetyQuestionRecordKey(questionKey) {
        const map = { q16: 'q15Reading', q17: 'q16', q18: 'q17' };
        return map[questionKey] || questionKey;
    },

    _getDailySafetyStatusKind(value) {
        const raw = String(value || '').trim();
        if (!raw) return 'empty';
        if (raw === 'مطابق') return 'compliant';
        if (raw === 'غير مطابق') return 'nonCompliant';
        return 'other';
    },

    _normalizeDateOnly(value) {
        if (!value) return '';
        const raw = String(value || '');
        // تاريخ فقط بدون وقت — يُرجع كما هو
        if (/^\d{4}-\d{2}-\d{2}$/.test(raw.slice(0, 10))) {
            if (raw.length <= 10) return raw.slice(0, 10);
            // يوجد وقت بعد التاريخ — يجب المرور عبر Date لتصحيح المنطقة الزمنية
            // (الباكند يرسل ISO UTC مثل 2026-08-06T21:00:00.000Z لتاريخ محلي 2026-08-07)
        }
        const dt = new Date(value);
        if (isNaN(dt.getTime())) return '';
        const y = dt.getFullYear();
        const m = String(dt.getMonth() + 1).padStart(2, '0');
        const d = String(dt.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    },

    getDailySafetyFilterOptions(records) {
        const list = Array.isArray(records) ? records : this.getDailySafetyCheckListRecords();
        const siteMap = new Map();
        const inspectors = new Set();
        const shifts = new Set();
        list.forEach((r) => {
            const siteId = String(r.siteId || '').trim();
            const siteName = String(r.siteName || '').trim();
            if (siteId || siteName) siteMap.set(siteId || siteName, siteName || siteId);
            if (r.inspectorName) inspectors.add(String(r.inspectorName).trim());
            if (r.shift) shifts.add(String(r.shift).trim());
        });
        return {
            sites: Array.from(siteMap.entries()).map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name, 'ar')),
            inspectors: Array.from(inspectors).sort((a, b) => a.localeCompare(b, 'ar')),
            shifts: Array.from(shifts)
        };
    },

    applyDailySafetyFilters(records) {
        const list = Array.isArray(records) ? records : [];
        const f = this.state.dailySafetyFilters || {};
        const search = String(f.search || '').trim().toLowerCase();
        const from = this._normalizeDateOnly(f.dateFrom);
        const to = this._normalizeDateOnly(f.dateTo);
        return list.filter((r) => {
            const dateOnly = this._normalizeDateOnly(r.date || r.createdAt);
            if (f.siteId && String(r.siteId || r.siteName || '') !== String(f.siteId)) return false;
            if (f.inspectorName && String(r.inspectorName || '') !== String(f.inspectorName)) return false;
            if (f.shift && String(r.shift || '') !== String(f.shift)) return false;
            if (from && (!dateOnly || dateOnly < from)) return false;
            if (to && (!dateOnly || dateOnly > to)) return false;
            if (search) {
                const haystack = [
                    r.id, this.getDailySafetyCheckListSerialNumber(r), r.siteName, r.inspectorName, r.shift, r.notes
                ].join(' ').toLowerCase();
                if (!haystack.includes(search)) return false;
            }
            return true;
        });
    },

    _computeDailySafetyEntityCompliance(records, getKeyFn) {
        const map = {};
        (Array.isArray(records) ? records : []).forEach((r) => {
            const key = String(getKeyFn(r) || '-').trim() || '-';
            if (!map[key]) map[key] = { name: key, count: 0, compliant: 0, nonCompliant: 0, totalAnswers: 0 };
            map[key].count += 1;
            this.DAILY_SAFETY_CHECKLIST_QUESTIONS.forEach((q) => {
                const val = r[this._getDailySafetyQuestionRecordKey(q.key)];
                const kind = this._getDailySafetyStatusKind(val);
                if (kind === 'empty') return;
                map[key].totalAnswers += 1;
                if (kind === 'compliant') map[key].compliant += 1;
                else if (kind === 'nonCompliant') map[key].nonCompliant += 1;
            });
        });
        return Object.values(map).map((e) => ({
            ...e,
            complianceRate: e.totalAnswers > 0 ? Math.round((e.compliant / e.totalAnswers) * 100) : 0,
            nonCompliantRate: e.totalAnswers > 0 ? Math.round((e.nonCompliant / e.totalAnswers) * 100) : 0
        }));
    },

    getDailySafetyAnalytics(records) {
        const list = Array.isArray(records) ? records : [];
        const siteCount = {};
        const inspectorCount = {};
        const shiftCount = {};
        const points = this.DAILY_SAFETY_CHECKLIST_QUESTIONS.map((q) => ({
            key: q.key,
            label: this._getDailySafetyQuestionLabel(q),
            total: 0,
            compliant: 0,
            nonCompliant: 0,
            other: 0
        }));
        const pointByKey = points.reduce((acc, p) => { acc[p.key] = p; return acc; }, {});
        let recordsWithIssues = 0;
        let totalRecordNonCompliant = 0;
        const uniqueDays = new Set();
        const uniqueSites = new Set();
        const uniqueInspectors = new Set();

        list.forEach((r) => {
            const siteName = String(r.siteName || '-').trim();
            const inspectorName = String(r.inspectorName || '-').trim();
            const shift = String(r.shift || '-').trim();
            const dayKey = this._normalizeDateOnly(r.date || r.createdAt);
            if (dayKey) uniqueDays.add(dayKey);
            uniqueSites.add(siteName);
            uniqueInspectors.add(inspectorName);
            siteCount[siteName] = (siteCount[siteName] || 0) + 1;
            inspectorCount[inspectorName] = (inspectorCount[inspectorName] || 0) + 1;
            shiftCount[shift] = (shiftCount[shift] || 0) + 1;

            let recNonCompliant = 0;
            this.DAILY_SAFETY_CHECKLIST_QUESTIONS.forEach((q) => {
                const point = pointByKey[q.key];
                if (!point) return;
                const val = r[this._getDailySafetyQuestionRecordKey(q.key)];
                const kind = this._getDailySafetyStatusKind(val);
                if (kind === 'empty') return;
                point.total += 1;
                if (kind === 'compliant') point.compliant += 1;
                else if (kind === 'nonCompliant') {
                    point.nonCompliant += 1;
                    recNonCompliant += 1;
                } else point.other += 1;
            });
            if (recNonCompliant > 0) recordsWithIssues += 1;
            totalRecordNonCompliant += recNonCompliant;
        });

        const toSortedList = (obj) => Object.entries(obj)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);

        const overallPointsTotal = points.reduce((sum, p) => sum + p.total, 0);
        const overallCompliant = points.reduce((sum, p) => sum + p.compliant, 0);
        const overallNonCompliant = points.reduce((sum, p) => sum + p.nonCompliant, 0);
        const complianceRate = overallPointsTotal > 0
            ? Math.round((overallCompliant / overallPointsTotal) * 100)
            : 0;

        points.forEach((p) => {
            p.nonCompliantRate = p.total > 0 ? Math.round((p.nonCompliant / p.total) * 100) : 0;
            p.complianceRate = p.total > 0 ? Math.round((p.compliant / p.total) * 100) : 0;
        });

        const siteStats = this._computeDailySafetyEntityCompliance(list, (r) => r.siteName || '-')
            .sort((a, b) => b.nonCompliantRate - a.nonCompliantRate || b.count - a.count);
        const inspectorStats = this._computeDailySafetyEntityCompliance(list, (r) => r.inspectorName || '-')
            .sort((a, b) => b.count - a.count);
        const shiftStats = this._computeDailySafetyEntityCompliance(list, (r) => r.shift || '-')
            .filter((s) => ['الأولى', 'الثانية', 'الثالثة'].includes(s.name))
            .sort((a, b) => {
                const order = { 'الأولى': 1, 'الثانية': 2, 'الثالثة': 3 };
                return (order[a.name] || 9) - (order[b.name] || 9);
            });

        const sortedPoints = [...points].sort((a, b) => b.nonCompliantRate - a.nonCompliantRate);
        const topRiskPoint = sortedPoints.find((p) => p.total > 0 && p.nonCompliant > 0) || null;
        const worstSite = siteStats.find((s) => s.totalAnswers > 0 && s.nonCompliant > 0) || null;
        const bestSite = [...siteStats].filter((s) => s.totalAnswers > 0).sort((a, b) => b.complianceRate - a.complianceRate)[0] || null;

        return {
            totalRecords: list.length,
            siteList: toSortedList(siteCount),
            inspectorList: toSortedList(inspectorCount),
            shiftList: toSortedList(shiftCount),
            siteStats,
            inspectorStats,
            shiftStats,
            points: sortedPoints,
            overallCompliant,
            overallNonCompliant,
            overallPointsTotal,
            complianceRate,
            recordsWithIssues,
            recordsCleanRate: list.length > 0 ? Math.round(((list.length - recordsWithIssues) / list.length) * 100) : 0,
            avgNonCompliantPerRecord: list.length > 0 ? Math.round((totalRecordNonCompliant / list.length) * 10) / 10 : 0,
            uniqueDays: uniqueDays.size,
            uniqueSites: uniqueSites.size,
            uniqueInspectors: uniqueInspectors.size,
            highRiskPoints: sortedPoints.filter((p) => p.nonCompliantRate >= 40 && p.total > 0).length,
            mediumRiskPoints: sortedPoints.filter((p) => p.nonCompliantRate >= 20 && p.nonCompliantRate < 40 && p.total > 0).length,
            lowRiskPoints: sortedPoints.filter((p) => p.nonCompliantRate < 20 && p.total > 0).length,
            topRiskPoint,
            worstSite,
            bestSite
        };
    },

    getDailySafetyWeeklyTrend(records) {
        const list = Array.isArray(records) ? records : [];
        const now = new Date();
        const weeks = [];
        for (let i = 7; i >= 0; i--) {
            const end = new Date(now);
            end.setDate(end.getDate() - i * 7);
            const start = new Date(end);
            start.setDate(start.getDate() - 6);
            weeks.push({ start, end, label: `${start.getDate()}/${start.getMonth() + 1}` });
        }
        return weeks.map((w) => {
            const weekRec = list.filter((r) => {
                const d = new Date(r.date || r.createdAt || '');
                if (Number.isNaN(d.getTime())) return false;
                const t = d.getTime();
                return t >= w.start.getTime() && t <= w.end.getTime() + 86400000;
            });
            const sub = this.getDailySafetyAnalytics(weekRec);
            return {
                label: w.label,
                records: weekRec.length,
                complianceRate: sub.complianceRate,
                nonCompliant: sub.overallNonCompliant
            };
        });
    },

    buildDailySafetyInsights(analytics, records) {
        const t = (key, fallback) => this._t(key, fallback);
        const insights = [];
        if (!analytics.totalRecords) return insights;

        insights.push({
            type: 'info',
            icon: 'fa-clipboard-check',
            text: t('module.periodic.analytics.insight.records', '{n} سجل مرور على {sites} موقع و{days} يوم عمل')
                .replace('{n}', analytics.totalRecords)
                .replace('{sites}', analytics.uniqueSites)
                .replace('{days}', analytics.uniqueDays)
        });

        if (analytics.recordsWithIssues > 0) {
            insights.push({
                type: 'warning',
                icon: 'fa-exclamation-triangle',
                text: t('module.periodic.analytics.insight.issues', '{n} سجل ({pct}%) يحتوي ملاحظات غير مطابقة — متوسط {avg} ملاحظة/سجل')
                    .replace('{n}', analytics.recordsWithIssues)
                    .replace('{pct}', 100 - analytics.recordsCleanRate)
                    .replace('{avg}', analytics.avgNonCompliantPerRecord)
            });
        } else {
            insights.push({
                type: 'success',
                icon: 'fa-check-circle',
                text: t('module.periodic.analytics.insight.allClean', 'جميع السجلات خالية من الملاحظات غير المطابقة')
            });
        }

        if (analytics.topRiskPoint) {
            insights.push({
                type: 'danger',
                icon: 'fa-fire',
                text: t('module.periodic.analytics.insight.topRisk', 'أعلى بند خطورة: «{label}» — {rate}% غير مطابق ({count}/{total})')
                    .replace('{label}', analytics.topRiskPoint.label.length > 45 ? analytics.topRiskPoint.label.slice(0, 43) + '…' : analytics.topRiskPoint.label)
                    .replace('{rate}', analytics.topRiskPoint.nonCompliantRate)
                    .replace('{count}', analytics.topRiskPoint.nonCompliant)
                    .replace('{total}', analytics.topRiskPoint.total)
            });
        }

        if (analytics.worstSite) {
            insights.push({
                type: 'warning',
                icon: 'fa-industry',
                text: t('module.periodic.analytics.insight.worstSite', 'أضعف موقع: {name} — امتثال {rate}% ({non} غير مطابق)')
                    .replace('{name}', analytics.worstSite.name)
                    .replace('{rate}', analytics.worstSite.complianceRate)
                    .replace('{non}', analytics.worstSite.nonCompliant)
            });
        }

        const trend = this.getDailySafetyTrend(records);
        if (trend.length >= 2) {
            const last = trend[trend.length - 1];
            const prev = trend[trend.length - 2];
            const diff = last.complianceRate - prev.complianceRate;
            if (diff !== 0) {
                insights.push({
                    type: diff > 0 ? 'success' : 'danger',
                    icon: diff > 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down',
                    text: diff > 0
                        ? t('module.periodic.analytics.insight.trendUp', 'تحسّن الامتثال {diff}% مقارنة بالشهر السابق ({prev}% → {last}%)')
                            .replace('{diff}', diff).replace('{prev}', prev.complianceRate).replace('{last}', last.complianceRate)
                        : t('module.periodic.analytics.insight.trendDown', 'تراجع الامتثال {diff}% مقارنة بالشهر السابق ({prev}% → {last}%)')
                            .replace('{diff}', Math.abs(diff)).replace('{prev}', prev.complianceRate).replace('{last}', last.complianceRate)
                });
            }
        }

        return insights;
    },

    getDailySafetyTrend(records) {
        const list = Array.isArray(records) ? records : [];
        const byMonth = {};
        list.forEach((r) => {
            const date = new Date(r.date || r.createdAt || '');
            if (Number.isNaN(date.getTime())) return;
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (!byMonth[monthKey]) byMonth[monthKey] = { records: 0, compliant: 0, nonCompliant: 0, totalAnswers: 0 };
            byMonth[monthKey].records += 1;
            this.DAILY_SAFETY_CHECKLIST_QUESTIONS.forEach((q) => {
                const val = r[this._getDailySafetyQuestionRecordKey(q.key)];
                const kind = this._getDailySafetyStatusKind(val);
                if (kind === 'empty') return;
                byMonth[monthKey].totalAnswers += 1;
                if (kind === 'compliant') byMonth[monthKey].compliant += 1;
                if (kind === 'nonCompliant') byMonth[monthKey].nonCompliant += 1;
            });
        });
        return Object.entries(byMonth)
            .map(([month, v]) => ({
                month,
                records: v.records,
                complianceRate: v.totalAnswers > 0 ? Math.round((v.compliant / v.totalAnswers) * 100) : 0,
                nonCompliantRate: v.totalAnswers > 0 ? Math.round((v.nonCompliant / v.totalAnswers) * 100) : 0
            }))
            .sort((a, b) => a.month.localeCompare(b.month));
    },

    _getDailySafetyAnalyticsRecordsByScope(scopeInspector = '') {
        const allRecords = this.getDailySafetyCheckListRecords();
        let records = this.applyDailySafetyFilters(allRecords);
        if (scopeInspector && scopeInspector !== '__all__') {
            records = records.filter((r) => String(r.inspectorName || '') === String(scopeInspector));
        }
        return records;
    },

    _injectPeriodicIdentityStyles() {
        try {
            if (document.getElementById('periodic-professional-identity-styles')) return;
            const style = document.createElement('style');
            style.id = 'periodic-professional-identity-styles';
            style.textContent = `
                #periodic-inspections-section .periodic-workspace {
                    --p-navy: #0b2a55;
                    --p-blue: #1e40af;
                    --p-blue2: #2563eb;
                    --p-sky: #93c5fd;
                    --p-line: #dce7f5;
                }
                /* ✅ الهوية — ترويسة المديول (Hero) */
                #periodic-inspections-section .periodic-id-hero {
                    position: relative; overflow: hidden;
                    display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
                    padding: 20px 24px; border-radius: 18px; color: #fff;
                    background: linear-gradient(130deg, #0b2a55 0%, #1e40af 55%, #2563eb 100%);
                    box-shadow: 0 14px 34px rgba(11,42,85,.25);
                }
                #periodic-inspections-section .periodic-id-hero::after {
                    content: ""; position: absolute; inset-inline-end: -64px; top: -96px;
                    width: 220px; height: 220px; border: 30px solid rgba(255,255,255,.05); border-radius: 50%; pointer-events: none;
                }
                #periodic-inspections-section .periodic-id-hero::before {
                    content: ""; position: absolute; inset-inline-start: 38%; bottom: -70px;
                    width: 150px; height: 150px; border: 20px solid rgba(255,255,255,.04); border-radius: 50%; pointer-events: none;
                }
                #periodic-inspections-section .periodic-id-hero__copy { position: relative; z-index: 1; display: flex; align-items: center; gap: 15px; min-width: min(100%, 340px); }
                #periodic-inspections-section .periodic-id-hero__icon {
                    flex: 0 0 auto; width: 54px; height: 54px; display: grid; place-items: center;
                    border: 1px solid rgba(255,255,255,.24); border-radius: 15px; background: rgba(255,255,255,.12); font-size: 23px; color: #fde68a;
                }
                #periodic-inspections-section .periodic-id-hero__eyebrow { display: block; margin-bottom: 4px; color: #bfdbfe; font-size: .68rem; font-weight: 800; letter-spacing: .04em; }
                #periodic-inspections-section .periodic-id-hero h1 { margin: 0; color: #fff; font-size: 1.3rem; font-weight: 900; line-height: 1.35; }
                #periodic-inspections-section .periodic-id-hero p { margin: 5px 0 0; color: #dbeafe; font-size: .78rem; }
                #periodic-inspections-section .periodic-id-hero__meta { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                #periodic-inspections-section .periodic-id-hero__meta span {
                    display: inline-flex; align-items: center; gap: 7px; padding: 8px 12px;
                    border: 1px solid rgba(255,255,255,.22); border-radius: 10px; background: rgba(255,255,255,.1);
                    font-size: .72rem; font-weight: 750; white-space: nowrap;
                }
                #periodic-inspections-section .periodic-id-hero__meta span i { color: #93c5fd; }
                #periodic-inspections-section .periodic-id-hero .btn-primary {
                    background: linear-gradient(135deg,#fbbf24,#f59e0b); color: #7c2d12; border: none; font-weight: 800;
                    box-shadow: 0 6px 18px rgba(0,0,0,.18);
                }
                /* ✅ الهوية — شريط التبويبات */
                #periodic-inspections-section .periodic-workspace .tabs-container { margin-top: 18px; }
                #periodic-inspections-section .periodic-workspace .tabs-nav {
                    display: flex; gap: 8px; padding: 8px; border-radius: 16px; overflow-x: auto;
                    border: 1px solid rgba(255,255,255,.14);
                    background: radial-gradient(circle at 8% 0%, rgba(251,191,36,.16), transparent 30%),
                                linear-gradient(125deg, #0b2a55 0%, #1e3a75 70%, #245a9b 100%);
                    box-shadow: 0 12px 30px rgba(11,37,85,.22);
                }
                #periodic-inspections-section .periodic-workspace .tabs-nav .tab-btn {
                    min-height: 46px; min-width: max-content; gap: 8px; padding: 9px 14px; margin: 0;
                    border: 1px solid rgba(255,255,255,.15); border-radius: 11px;
                    background: rgba(255,255,255,.08); color: rgba(255,255,255,.85);
                    font-weight: 700; white-space: nowrap; transition: all .2s ease;
                }
                #periodic-inspections-section .periodic-workspace .tabs-nav .tab-btn::before { display: none; }
                #periodic-inspections-section .periodic-workspace .tabs-nav .tab-btn i {
                    display: inline-flex; align-items: center; justify-content: center;
                    width: 28px; height: 28px; border-radius: 8px; background: rgba(255,255,255,.12); font-size: .78rem; color: #fde68a;
                }
                #periodic-inspections-section .periodic-workspace .tabs-nav .tab-btn:hover { background: rgba(255,255,255,.15); color: #fff; transform: translateY(-1px); }
                #periodic-inspections-section .periodic-workspace .tabs-nav .tab-btn.active {
                    border-color: #fff; background: #fff; color: var(--p-blue);
                    box-shadow: 0 8px 22px rgba(0,0,0,.2);
                }
                #periodic-inspections-section .periodic-workspace .tabs-nav .tab-btn.active i { background: #eff6ff; color: var(--p-blue); }
                /* ✅ الهوية — أسطح المحتوى (قائمة الفحوصات / سجل الفحوصات / قاعدة المعدات) */
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area { animation: periodicSurfaceIn .24s ease-out; }
                @keyframes periodicSurfaceIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .content-card {
                    border-radius: 16px; border-color: var(--p-line) !important;
                    box-shadow: 0 8px 24px rgba(15,47,90,.07);
                }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .card-header {
                    border-bottom: 1px solid #e5edf7; background: linear-gradient(180deg, #f8fbff, #fff); border-radius: 16px 16px 0 0;
                }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .data-table thead th {
                    background: linear-gradient(90deg, #1e40af, #2563eb); color: #fff; font-weight: 700; white-space: nowrap;
                }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .data-table tbody tr:hover td { background: #f2f7ff !important; }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .data-table td { vertical-align: middle; }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .bg-white.border-gray-200 {
                    border-radius: 12px; border: 1px solid #e2eaf6 !important; background: #fff !important;
                }
                @media (max-width: 820px) {
                    #periodic-inspections-section .periodic-id-hero { padding: 18px; }
                    #periodic-inspections-section .periodic-id-hero__copy { align-items: flex-start; }
                    #periodic-inspections-section .periodic-id-hero__icon { width: 46px; height: 46px; font-size: 19px; }
                    #periodic-inspections-section .periodic-id-hero h1 { font-size: 1.05rem; }
                    #periodic-inspections-section .periodic-id-hero__meta { width: 100%; }
                    #periodic-inspections-section .periodic-id-hero__meta span { flex: 1; justify-content: center; }
                }
                /* ✅ الهوية — سجل الفحوصات الدورية (كروت احترافية) */
                #periodic-inspections-section .pinsp-stat {
                    position: relative; overflow: hidden; border-radius: 16px; border: 1px solid var(--p-line);
                    background: linear-gradient(160deg, #ffffff, #f4f8ff); box-shadow: 0 8px 22px rgba(15,47,90,.07);
                    display: flex; align-items: center; gap: 12px; padding: 16px; transition: transform .18s ease, box-shadow .18s ease;
                }
                #periodic-inspections-section .pinsp-stat:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(15,47,90,.12); }
                #periodic-inspections-section .pinsp-stat__icon { flex: 0 0 auto; width: 48px; height: 48px; display: grid; place-items: center; border-radius: 13px; color: #fff; font-size: 1.15rem; }
                #periodic-inspections-section .pinsp-stat__icon--blue { background: linear-gradient(135deg,#1e40af,#3b82f6); }
                #periodic-inspections-section .pinsp-stat__icon--green { background: linear-gradient(135deg,#15803d,#22c55e); }
                #periodic-inspections-section .pinsp-stat__icon--red { background: linear-gradient(135deg,#b91c1c,#ef4444); }
                #periodic-inspections-section .pinsp-stat__icon--amber { background: linear-gradient(135deg,#b45309,#f59e0b); }
                #periodic-inspections-section .pinsp-stat__body { flex: 1; min-width: 0; }
                #periodic-inspections-section .pinsp-stat__label { font-size: .74rem; font-weight: 700; color: #64748b; margin: 0 0 2px; }
                #periodic-inspections-section .pinsp-stat__value { font-size: 1.7rem; font-weight: 900; line-height: 1.15; margin: 0; }
                #periodic-inspections-section .pinsp-stat__bar { height: 5px; margin-top: 7px; border-radius: 99px; background: #e5edf7; overflow: hidden; }
                #periodic-inspections-section .pinsp-stat__bar span { display: block; height: 100%; border-radius: 99px; }
                #periodic-inspections-section .pinsp-stat__pct { font-size: .7rem; font-weight: 700; color: #94a3b8; }
                #periodic-inspections-section .pinsp-month { margin-bottom: 26px; }
                #periodic-inspections-section .pinsp-month__head {
                    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
                    padding: 10px 14px; margin-bottom: 12px; border-radius: 14px;
                    background: linear-gradient(90deg, #eef4ff, #f8fbff); border: 1px solid #dbe7fb;
                }
                #periodic-inspections-section .pinsp-month__icon { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 11px; background: linear-gradient(135deg,#1e40af,#2563eb); color: #fff; font-size: 1rem; box-shadow: 0 6px 14px rgba(30,64,175,.28); }
                #periodic-inspections-section .pinsp-month__title { margin: 0; font-size: 1.02rem; font-weight: 800; color: #172033; }
                #periodic-inspections-section .pinsp-month__count { display: inline-block; margin-top: 3px; font-size: .7rem; font-weight: 700; color: #475569; }
                #periodic-inspections-section .pinsp-month__count i { margin-inline-end: 4px; color: #2563eb; }
                #periodic-inspections-section .pinsp-month__chips { display: flex; gap: 6px; margin-inline-start: auto; flex-wrap: wrap; }
                #periodic-inspections-section .pinsp-month__chips span { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 99px; font-size: .68rem; font-weight: 800; }
                #periodic-inspections-section .pinsp-month__chips .m-green { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
                #periodic-inspections-section .pinsp-month__chips .p-red { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
                #periodic-inspections-section .pinsp-month__chips .p-amber { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
                #periodic-inspections-section .pinsp-month__chips .p-blue { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
                #periodic-inspections-section .pinsp-record { list-style: none; margin: 0 0 12px; padding: 0; }
                #periodic-inspections-section article.pinsp-record__card {
                    position: relative; overflow: hidden; border-radius: 14px; border: 1px solid #e2eaf6; background: #fff;
                    box-shadow: 0 4px 14px rgba(15,47,90,.05); transition: transform .18s ease, box-shadow .18s ease;
                }
                #periodic-inspections-section article.pinsp-record__card:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(15,47,90,.12); }
                #periodic-inspections-section article.pinsp-record__card::before { content: ""; position: absolute; inset-inline-start: 0; top: 0; bottom: 0; width: 4px; }
                #periodic-inspections-section article.pinsp-record__card.accent-green::before { background: #16a34a; }
                #periodic-inspections-section article.pinsp-record__card.accent-red::before { background: #dc2626; }
                #periodic-inspections-section article.pinsp-record__card.accent-amber::before { background: #d97706; }
                #periodic-inspections-section article.pinsp-record__card.accent-blue::before { background: #2563eb; }
                #periodic-inspections-section article.pinsp-record__card.accent-gray::before { background: #94a3b8; }
                #periodic-inspections-section .pinsp-record__top { display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px 8px; }
                #periodic-inspections-section .pinsp-record__icon { flex: 0 0 auto; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 11px; font-size: .95rem; }
                #periodic-inspections-section .pinsp-record__title { flex: 1; min-width: 0; }
                #periodic-inspections-section .pinsp-record__title h5 { margin: 0; font-size: .98rem; font-weight: 800; color: #172033; }
                #periodic-inspections-section .pinsp-record__sub { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 5px; font-size: .72rem; color: #64748b; }
                #periodic-inspections-section .pinsp-record__sub span { display: inline-flex; align-items: center; gap: 5px; }
                #periodic-inspections-section .pinsp-record__num { font-family: "Courier New", monospace; font-weight: 700; color: #2563eb; }
                #periodic-inspections-section .pinsp-record__meta {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 8px 14px;
                    padding: 10px 16px 12px 20px; border-top: 1px dashed #e6eef8; background: #fafcff;
                }
                #periodic-inspections-section .pinsp-record__meta span { display: flex; align-items: center; gap: 7px; font-size: .78rem; color: #334155; font-weight: 600; }
                #periodic-inspections-section .pinsp-record__meta span i { width: 15px; text-align: center; color: #64748b; }
                #periodic-inspections-section .pinsp-record__notes { margin: 0 16px 12px; padding: 8px 12px; border-radius: 10px; background: #fffbeb; border: 1px solid #fde68a; font-size: .76rem; color: #92400e; }
                #periodic-inspections-section .pinsp-record__actions { position: relative; z-index: 1; padding: 0 16px 12px; }
                @media (max-width: 640px) {
                    #periodic-inspections-section .pinsp-record__top { flex-wrap: wrap; }
                    #periodic-inspections-section .pinsp-record__actions { width: 100%; }
                    #periodic-inspections-section .pinsp-month__chips { margin-inline-start: 0; }
                }
                [data-theme="dark"] #periodic-inspections-section .pinsp-stat { background: linear-gradient(160deg,#15283f,#1a2f4a); border-color: #243b55; }
                [data-theme="dark"] #periodic-inspections-section .pinsp-stat__label { color: #93a7bd; }
                [data-theme="dark"] #periodic-inspections-section .pinsp-month__head { background: #16293f; border-color: #243b55; }
                [data-theme="dark"] #periodic-inspections-section .pinsp-month__title { color: #e6eef5; }
                [data-theme="dark"] #periodic-inspections-section article.pinsp-record__card { background: #15283f; border-color: #243b55; }
                [data-theme="dark"] #periodic-inspections-section .pinsp-record__title h5 { color: #e8f0f8; }
                [data-theme="dark"] #periodic-inspections-section .pinsp-record__meta { background: #122338; border-top-color: #1f3a55; }
                [data-theme="dark"] #periodic-inspections-section .pinsp-record__notes { background: #3a2f12; border-color: #6b5c1e; color: #fcd34d; }

                /* ✅ الهوية — صفوف الجداول بتظليل النتيجة */
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .pinsp-row td:first-child { box-shadow: inset 4px 0 0 transparent; }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .pinsp-row.accent-green td:first-child { box-shadow: inset 4px 0 0 #16a34a; }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .pinsp-row.accent-red td:first-child { box-shadow: inset 4px 0 0 #dc2626; }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .pinsp-row.accent-amber td:first-child { box-shadow: inset 4px 0 0 #d97706; }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .pinsp-row.accent-blue td:first-child { box-shadow: inset 4px 0 0 #2563eb; }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .pinsp-row.accent-gray td:first-child { box-shadow: inset 4px 0 0 #94a3b8; }
                #periodic-inspections-section .pinsp-row-icon {
                    display: inline-flex; align-items: center; justify-content: center;
                    width: 26px; height: 26px; border-radius: 8px; font-size: .72rem; flex: 0 0 auto;
                }
                #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .pinsp-equipment-row td:first-child { box-shadow: inset 4px 0 0 transparent; }
                #periodic-inspections-section .periodic-workspace .pinsp-equip-marker { display: none; }

                [data-theme="dark"] #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .content-card { background: #15283f !important; }
                [data-theme="dark"] #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .card-header { background: #16293f; border-bottom-color: #243b55; }
                [data-theme="dark"] #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .data-table tbody tr:hover td { background: #1c3350 !important; }
                [data-theme="dark"] #periodic-inspections-section .periodic-workspace #periodic-inspections-content-area .bg-white.border-gray-200 { background: #16293f !important; border-color: #243b55 !important; }
            `;
            document.head.appendChild(style);
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('⚠️ فشل حقن هوية الفحوصات الدورية:', error);
        }
    },

    _renderPeriodicHero(withMeta = true, extraHtml = '') {
        const inspCount = (AppState.appData && AppState.appData.periodicInspections) ? AppState.appData.periodicInspections.length : 0;
        const dscCount = (AppState.appData && AppState.appData.dailySafetyCheckList) ? AppState.appData.dailySafetyCheckList.length : 0;
        let assetCount = 0;
        try {
            if (typeof window !== 'undefined' && window.PeriodicEquipment && typeof window.PeriodicEquipment.getAssets === 'function') {
                assetCount = window.PeriodicEquipment.getAssets().length;
            }
        } catch (e) { /* تجاهل */ }
        const meta = withMeta ? `
                <span><i class="fas fa-clipboard-list"></i>${inspCount} ${this._t('module.periodic.heroInspections', 'فحص دوري')}</span>
                <span><i class="fas fa-database"></i>${assetCount} ${this._t('module.periodic.heroAssets', 'معدة مسجلة')}</span>
                <span><i class="fas fa-tasks"></i>${dscCount} ${this._t('module.periodic.heroDsc', 'مرور يومي')}</span>` : '';
        return `
            <div class="periodic-id-hero">
                <div class="periodic-id-hero__copy">
                    <span class="periodic-id-hero__icon"><i class="fas fa-clipboard-check"></i></span>
                    <div>
                        <span class="periodic-id-hero__eyebrow"><i class="fas fa-shield-halved ml-1"></i>${this._t('module.periodic.heroEyebrow', 'منظومة السلامة والصحة المهنية')}</span>
                        <h1>${this._t('module.periodic.title', 'الفحوصات الدورية')}</h1>
                        <p>${this._t('module.periodic.subtitle', 'تسجيل ومتابعة الفحوصات الدورية للمعدات والمنشآت')}</p>
                    </div>
                </div>
                <div class="periodic-id-hero__meta">
                    ${meta}
                    ${extraHtml}
                </div>
            </div>`;
    },

    async load() {
        // Add language change listener
        if (!this._languageChangeListenerAdded) {
            document.addEventListener('language-changed', () => {
                if (typeof AppState !== 'undefined' && AppState._languageRefresh) return;
                this.load();
            });
            this._languageChangeListenerAdded = true;
        }

        this._injectPeriodicIdentityStyles();

        const section = document.getElementById('periodic-inspections-section');
        if (!section) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ قسم periodic-inspections-section غير موجود');
            } else {
                console.warn('⚠️ قسم periodic-inspections-section غير موجود');
            }
            return;
        }

        // التأكد من وجود البيانات الأساسية أولاً (لا فقدان بيانات عند التحديث — البيانات من DataManager/localStorage)
        try {
            if (!AppState || !AppState.appData) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ AppState غير جاهز - جاري الانتظار...');
                } else {
                    console.warn('⚠️ AppState غير جاهز - جاري الانتظار...');
                }
                await new Promise(resolve => {
                    let attempts = 0;
                    const maxAttempts = 50; // 5 ثوان
                    const checkInterval = setInterval(() => {
                        attempts++;
                        if (AppState && AppState.appData) {
                            clearInterval(checkInterval);
                            resolve();
                        } else if (attempts >= maxAttempts) {
                            clearInterval(checkInterval);
                            if (!AppState) AppState = {};
                            if (!AppState.appData) AppState.appData = {};
                            resolve();
                        }
                    }, 100);
                });
            }
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ خطأ في التحقق من AppState:', error);
            } else {
                console.warn('⚠️ خطأ في التحقق من AppState:', error);
            }
            if (!AppState) AppState = {};
            if (!AppState.appData) AppState.appData = {};
        }

        if (!AppState.appData.periodicInspections) {
            AppState.appData.periodicInspections = [];
        }
        if (!AppState.appData.dailySafetyCheckList) {
            AppState.appData.dailySafetyCheckList = [];
        }

        const hasCachedData = (AppState.appData.periodicInspections && AppState.appData.periodicInspections.length > 0) ||
            (AppState.appData.dailySafetyCheckList && AppState.appData.dailySafetyCheckList.length > 0);

        // ✅ تحميل مباشر عند أول فتح إذا لم تكن البيانات جاهزة محلياً (بدون تكرار طلبات متوازية)
        if (!hasCachedData && typeof GoogleIntegration !== 'undefined') {
            try {
                await Promise.race([
                    this.loadInspectionDataAsync(),
                    new Promise(resolve => setTimeout(resolve, 1200)),
                ]);
            } catch (e) {
                // تجاهل — سنعرض الواجهة بالبيانات المحلية ثم نكمل في الخلفية
            }
        }

        if (!hasCachedData) {
            section.innerHTML = `
            <div class="periodic-workspace">
                ${this._renderPeriodicHero(false)}
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500">${this._t('module.periodic.preparingUi', 'جاري تجهيز الواجهة...')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        }

        // تحميل محتوى التبويب الحالي مباشرة من AppState (بدون تأخير — قائمة الفحوصات / سجل الفحوصات الدورية / Daily Safety Check List)
        try {
            let content = '';
            try {
                const contentPromise = this.renderContent();
                content = await Utils.promiseWithTimeout(
                    contentPromise,
                    10000,
                    () => new Error('Timeout: renderContent took too long')
                );
            } catch (error) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ خطأ في تحميل محتوى الواجهة:', error);
                } else {
                    console.warn('⚠️ خطأ في تحميل محتوى الواجهة:', error);
                }
                content = `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${this._t('module.periodic.loadError', 'حدث خطأ في تحميل البيانات')}</p>
                                <button onclick="PeriodicInspections.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${this._t('module.periodic.retry', 'إعادة المحاولة')}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }

            section.innerHTML = `
            <div class="periodic-workspace">
                ${this._renderPeriodicHero(
                    true,
                    (this.state.currentView !== 'form' && this.state.currentView !== 'edit') ? `
                        <button id="add-periodic-inspection-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            ${this._t('module.periodic.addNewInspection', 'إضافة فحص دوري جديد')}
                        </button>
                    ` : ''
                )}

            ${this.state.currentView !== 'form' && this.state.currentView !== 'edit' ? `
            <!-- Tabs Navigation -->
            <div class="tabs-container mt-6">
                <div class="tabs-nav">
                    <button class="tab-btn ${this.state.currentTab === 'inspections-list' ? 'active' : ''}" data-tab="inspections-list">
                        <i class="fas fa-list ml-2"></i>
                        <span data-i18n="module.periodic.tab.inspectionsList">${this._t('module.periodic.tab.inspectionsList', 'قائمة الفحوصات')}</span>
                    </button>
                    <button class="tab-btn ${this.state.currentTab === 'inspection-records' ? 'active' : ''}" data-tab="inspection-records">
                        <i class="fas fa-history ml-2"></i>
                        <span data-i18n="module.periodic.tab.inspectionsRecords">${this._t('module.periodic.tab.inspectionsRecords', 'سجل الفحوصات الدورية')}</span>
                    </button>
                    <button class="tab-btn ${this.state.currentTab === 'daily-safety-checklist' ? 'active' : ''}" data-tab="daily-safety-checklist">
                        <i class="fas fa-tasks ml-2"></i>
                        <span data-i18n="module.periodic.tab.dailySafety">${this._t('module.periodic.tab.dailySafety', 'قائمة المرور اليومي للسلامة')}</span>
                    </button>
                    <button class="tab-btn ${this.state.currentTab === 'daily-safety-analytics' ? 'active' : ''}" data-tab="daily-safety-analytics">
                        <i class="fas fa-chart-line ml-2"></i>
                        <span data-i18n="module.periodic.tab.dailySafetyAnalytics">${this._t('module.periodic.tab.dailySafetyAnalytics', 'تحليل البيانات')}</span>
                    </button>
                    <button class="tab-btn ${this.state.currentTab === 'equipment-database' ? 'active' : ''}" data-tab="equipment-database">
                        <i class="fas fa-database ml-2"></i>
                        <span data-i18n="module.periodic.tab.equipmentDatabase">${this._t('module.periodic.tab.equipmentDatabase', 'قاعدة بيانات المعدات')}</span>
                    </button>
                </div>
            </div>
            ` : ''}

            <div class="mt-6" id="periodic-inspections-content-area">
                ${content}
            </div>
        </div>
        `;
            try {
                this.setupEventListeners();
            } catch (error) {
                Utils.safeWarn('⚠️ خطأ في setupEventListeners:', error);
            }

            // تحديث البيانات من الخادم في الخلفية دون مسح العرض الحالي (البيانات المحلية معروضة فوراً)
            // ✅ تجنب إعادة التحميل مباشرة بعد انتظار التحميل الأولي أعلاه
            let skipBg = false;
            try {
                const ls = localStorage.getItem('periodic_inspections_last_sync');
                if (ls) skipBg = (Date.now() - parseInt(ls, 10)) < 3000;
            } catch (e) {}
            if (!skipBg) {
                this.loadInspectionDataAsync().catch(error => {
                    Utils.safeWarn('⚠️ تعذر تحميل بيانات الفحوصات الدورية:', error);
                    if (this.state.currentView !== 'form' && this.state.currentView !== 'edit') {
                        this.refreshCurrentTabContent().catch(() => {});
                    }
                });
            }
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('❌ خطأ في تحميل مديول الفحوصات الدورية:', error);
            } else {
                console.error('❌ خطأ في تحميل مديول الفحوصات الدورية:', error);
            }
            section.innerHTML = `
                <div class="periodic-workspace">
                    ${this._renderPeriodicHero(false)}
                    <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-2">حدث خطأ أثناء تحميل البيانات</p>
                                <p class="text-sm text-gray-400 mb-4">${error && error.message ? Utils.escapeHTML(error.message) : 'خطأ غير معروف'}</p>
                                <button onclick="PeriodicInspections.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    إعادة المحاولة
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            `;
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('حدث خطأ أثناء تحميل الفحوصات الدورية. يُرجى المحاولة مرة أخرى.', { duration: 5000 });
            }
        }
    },

    async loadInspectionDataAsync() {
        if (this._periodicInspectionLoadPromise) {
            return this._periodicInspectionLoadPromise;
        }
        this._periodicInspectionLoadPromise = (async () => {
        try {
            const inspectionResult = await GoogleIntegration.sendRequest({
                action: 'getAllPeriodicInspections',
                data: {}
            }).catch(error => {
                const errorMsg = error.message || error.toString() || '';
                if (errorMsg.includes('انتهت مهلة الاتصال') || errorMsg.includes('timeout')) {
                    Utils.safeWarn('⚠️ انتهت مهلة الاتصال بالخادم');
                    return { success: false, data: [] };
                }
                Utils.safeWarn('⚠️ تعذر تحميل بيانات الفحوصات الدورية:', error);
                return { success: false, data: [] };
            });

            // معالجة نتائج البيانات
            let dataUpdated = false;
            if (inspectionResult && inspectionResult.success && Array.isArray(inspectionResult.data)) {
                // معالجة البيانات المعقدة (تحويل JSON strings إلى كائنات)
                AppState.appData.periodicInspections = inspectionResult.data.map(inspection => {
                    // معالجة checklistResults إذا كانت JSON string
                    if (inspection.checklistResults && typeof inspection.checklistResults === 'string') {
                        try {
                            inspection.checklistResults = JSON.parse(inspection.checklistResults);
                        } catch (e) {
                            Utils.safeWarn('⚠️ خطأ في تحليل checklistResults:', e);
                            inspection.checklistResults = [];
                        }
                    }
                    // التأكد من أن checklistResults هي مصفوفة
                    if (!Array.isArray(inspection.checklistResults)) {
                        inspection.checklistResults = [];
                    }
                    return inspection;
                });
                dataUpdated = true;
                Utils.safeLog(`✅ تم تحميل ${inspectionResult.data.length} فحص دوري من Google Sheets`);
            } else {
                // التأكد من وجود مصفوفة فارغة إذا لم يتم تحميل البيانات
                if (!AppState.appData.periodicInspections) {
                    AppState.appData.periodicInspections = [];
                }
            }

            // تحميل سجل المرور اليومي للسلامة (Daily Safety Check List) من قاعدة البيانات
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.readFromSheets) {
                try {
                    this._dscLastAttemptAt = Date.now();
                    const dscData = await GoogleIntegration.readFromSheets('DailySafetyCheckList');
                    if (Array.isArray(dscData)) {
                        AppState.appData.dailySafetyCheckList = dscData;
                        this._dscDataLoadedOnce = true;
                        dataUpdated = true;
                        if (dscData.length > 0 && typeof Utils !== 'undefined' && Utils.safeLog) {
                            Utils.safeLog('✅ تم تحميل سجل المرور اليومي للسلامة: ' + dscData.length + ' سجل');
                        }
                    } else if (!AppState.appData.dailySafetyCheckList) {
                        AppState.appData.dailySafetyCheckList = [];
                    }
                } catch (dscError) {
                    if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('⚠️ تعذر تحميل سجل المرور اليومي للسلامة:', dscError);
                    if (!AppState.appData.dailySafetyCheckList) AppState.appData.dailySafetyCheckList = [];
                }
            } else if (!AppState.appData.dailySafetyCheckList) {
                AppState.appData.dailySafetyCheckList = [];
            }

            try { localStorage.setItem('periodic_inspections_last_sync', String(Date.now())); } catch (e) {}
            
            // تحديث محتوى التبويب الحالي فقط بعد جلب البيانات (بدون مسح البيانات المحلية عند فشل الشبكة)
            if (this.state.currentView !== 'form' && this.state.currentView !== 'edit') {
                try {
                    await this.refreshCurrentTabContent();
                } catch (error) {
                    Utils.safeWarn('⚠️ خطأ في تحديث الواجهة بعد تحميل البيانات:', error);
                    const contentDiv = document.getElementById('periodic-inspections-content-area');
                    if (contentDiv) {
                        contentDiv.innerHTML = `
                            <div class="content-card">
                                <div class="card-body">
                                    <div class="empty-state">
                                        <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                        <p class="text-gray-500 mb-4">حدث خطأ في تحديث الواجهة</p>
                                        <button onclick="PeriodicInspections.load()" class="btn-primary">
                                            <i class="fas fa-redo ml-2"></i>
                                            إعادة المحاولة
                                        </button>
                                    </div>
                                </div>
                            </div>`;
                        this.setupEventListeners();
                    }
                }
            }

            // حفظ البيانات محلياً
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }
        } catch (error) {
            const errorMsg = error.message || error.toString() || '';
            Utils.safeError('❌ خطأ في تحميل بيانات الفحوصات الدورية من Google Sheets:', error);
            
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
        })().finally(() => {
            this._periodicInspectionLoadPromise = null;
        });
        return this._periodicInspectionLoadPromise;
    },

    async renderContent() {
        switch (this.state.currentView) {
            case 'form':
            case 'edit':
                return await this.renderForm();
            case 'list':
            default:
                if (this.state.currentTab === 'daily-safety-checklist') {
                    return await this.renderDailySafetyCheckListContent();
                }
                if (this.state.currentTab === 'daily-safety-analytics') {
                    return await this.renderDailySafetyAnalyticsContent();
                }
                if (this.state.currentTab === 'inspection-records') {
                    return await this.renderInspectionRecords();
                }
                if (this.state.currentTab === 'equipment-database') {
                    if (typeof PeriodicEquipment !== 'undefined' && typeof PeriodicEquipment.renderTab === 'function') {
                        return await PeriodicEquipment.renderTab();
                    }
                    return '<div class="content-card"><div class="card-body"><p class="text-gray-500">جاري تحميل قاعدة المعدات...</p></div></div>';
                }
                return await this.renderList();
        }
    },

    async renderList() {
        try {
            if (!AppState.appData || !AppState.appData.periodicInspections) {
                return `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <p class="text-gray-500">لا توجد فحوصات دورية مسجلة</p>
                            </div>
                        </div>
                    </div>
                `;
            }
            const inspections = AppState.appData.periodicInspections || [];
            const filteredInspections = this.applyFilters(inspections);
            
            // حساب الإحصائيات
            const stats = this.calculateStatistics(inspections);
            const filteredStats = this.calculateStatistics(filteredInspections);

        return `
            <!-- إحصائيات الفحوصات — كروت هوية -->
            ${this._renderPinspStats(stats, {
                totalIcon: 'fas fa-clipboard-list',
                totalLabel: 'إجمالي الفحوصات',
                totalSub: filteredStats.total !== stats.total ? `مُصفّى: ${filteredStats.total}` : 'الكل'
            })}

            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-2">
                        <h3 class="card-title">
                            <i class="fas fa-list ml-2"></i>
                            قائمة الفحوصات الدورية
                            ${filteredStats.total !== stats.total ? `<span class="text-sm font-normal text-gray-500 mr-2">(${filteredStats.total} من ${stats.total})</span>` : ''}
                        </h3>
                        <div class="flex gap-2 flex-wrap">
                            <span class="badge badge-info">${filteredInspections.length} فحص معروض</span>
                            ${this.isCurrentUserAdmin() ? `
                                <button id="manage-templates-btn" class="btn-secondary" title="إدارة قوالب الفحص (مدير النظام فقط)">
                                    <i class="fas fa-cog ml-2"></i>
                                    إدارة القوالب
                                </button>
                            ` : ''}
                            <button id="filter-periodic-inspections-btn" class="btn-secondary">
                                <i class="fas fa-filter ml-2"></i>
                                تصفية
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    ${filteredInspections.length === 0 ? `
                        <div class="empty-state">
                            <i class="fas fa-clipboard-check text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">لا توجد فحوصات دورية مسجلة</p>
                        </div>
                    ` : `
                        <div class="table-wrapper" style="overflow-x: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>رقم الفحص</th>
                                        <th>نوع الفحص</th>
                                        <th>الموقع/المعدة</th>
                                        <th>تاريخ الفحص</th>
                                        <th>المفتش</th>
                                        <th>النتيجة</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filteredInspections.map(inspection => {
                                        const template = inspection.templateId ? this.INSPECTION_TEMPLATES[inspection.templateId] : null;
                                        const categoryDisplay = template ? template.name : (inspection.category || '');
                                        const resultBadgeClass = this.getResultBadgeClass(inspection.result);
                                        const resultIcon = this.getResultIcon(inspection.result);
                                        const accent = this._getResultAccent(inspection.result);
                                        return `
                                        <tr class="hover:bg-gray-50 transition-colors pinsp-row accent-${accent}">
                                            <td class="font-mono font-semibold text-blue-600">${Utils.escapeHTML(inspection.inspectionNumber || inspection.id || '')}</td>
                                            <td>
                                                <span class="inline-flex items-center gap-2">
                                                    <span class="pinsp-tag" style="background:${this._getResultHex('blue')}14;color:${this._getResultHex('blue')};"><i class="${template ? template.icon : 'fas fa-clipboard-list'}"></i></span>
                                                    <span class="font-medium">${Utils.escapeHTML(categoryDisplay)}</span>
                                                </span>
                                            </td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <i class="fas fa-map-marker-alt text-gray-400 text-xs"></i>
                                                    <span>${Utils.escapeHTML(inspection.location || inspection.equipment || '-')}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <i class="fas fa-calendar text-gray-400 text-xs"></i>
                                                    <span>${inspection.inspectionDate ? Utils.formatDate(inspection.inspectionDate) : '-'}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <i class="fas fa-user text-gray-400 text-xs"></i>
                                                    <span>${Utils.escapeHTML(inspection.inspector || '-')}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="badge ${resultBadgeClass} inline-flex items-center gap-1">
                                                    <i class="${resultIcon}"></i>
                                                    ${Utils.escapeHTML(inspection.result || '-')}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <button onclick="PeriodicInspections.viewInspection(${JSON.stringify(String(inspection.id || ''))})" class="btn-icon btn-icon-info hover:scale-110 transition-transform" title="عرض التفاصيل">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                    <button onclick="PeriodicInspections.exportInspectionById(${JSON.stringify(String(inspection.id || ''))})" class="btn-icon btn-icon-success hover:scale-110 transition-transform" title="تحميل PDF">
                                                        <i class="fas fa-file-pdf"></i>
                                                    </button>
                                                    <button onclick="PeriodicInspections.editInspection(${JSON.stringify(String(inspection.id || ''))})" class="btn-icon btn-icon-primary hover:scale-110 transition-transform" title="تعديل">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button onclick="PeriodicInspections.deleteInspection(${JSON.stringify(String(inspection.id || ''))})" class="btn-icon btn-icon-danger hover:scale-110 transition-transform" title="حذف">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    `}
                </div>
            </div>
        `;
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في عرض قائمة الفحوصات الدورية:', error);
            return `
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500">حدث خطأ في تحميل البيانات</p>
                        </div>
                    </div>
                </div>
            `;
        }
    },

    calculateStatistics(inspections) {
        const stats = {
            total: inspections.length,
            compliant: 0,
            nonCompliant: 0,
            partialCompliant: 0,
            pending: 0
        };

        inspections.forEach(inspection => {
            const result = inspection.result || '';
            if (result === 'مطابق') {
                stats.compliant++;
            } else if (result === 'غير مطابق') {
                stats.nonCompliant++;
            } else if (result === 'مطابق جزئياً') {
                stats.partialCompliant++;
            } else if (result === 'قيد المراجعة') {
                stats.pending++;
            }
        });

        return stats;
    },

    getResultBadgeClass(result) {
        const resultMap = {
            'مطابق': 'badge-success',
            'غير مطابق': 'badge-danger',
            'مطابق جزئياً': 'badge-warning',
            'قيد المراجعة': 'badge-info'
        };
        return resultMap[result] || 'badge-secondary';
    },

    getResultIcon(result) {
        const iconMap = {
            'مطابق': 'fas fa-check-circle',
            'غير مطابق': 'fas fa-times-circle',
            'مطابق جزئياً': 'fas fa-exclamation-circle',
            'قيد المراجعة': 'fas fa-clock'
        };
        return iconMap[result] || 'fas fa-question-circle';
    },

    _getResultAccent(result) {
        const key = String(result || '').trim();
        if (key === 'مطابق') return 'green';
        if (key === 'غير مطابق') return 'red';
        if (key === 'مطابق جزئياً') return 'amber';
        if (key === 'قيد المراجعة') return 'blue';
        return 'gray';
    },

    _getResultHex(accent) {
        const map = { green: '#16a34a', red: '#dc2626', amber: '#d97706', blue: '#2563eb', gray: '#64748b' };
        return map[accent] || map.gray;
    },

    // ✅ كروت الإحصائيات المشتركة (هوية المديول) — للقائمة والسجل
    _renderPinspStats(stats, opts = {}) {
        const total = (stats && stats.total) || 0;
        const pct = n => (total > 0 ? Math.round((n / total) * 100) : 0);
        const card = (icon, iconCls, label, value, pctVal, bar, sub) => `
            <div class="pinsp-stat">
                <div class="pinsp-stat__icon pinsp-stat__icon--${iconCls}"><i class="${icon}"></i></div>
                <div class="pinsp-stat__body">
                    <p class="pinsp-stat__label">${label}</p>
                    <p class="pinsp-stat__value">${value}</p>
                    <div class="pinsp-stat__bar"><span style="width:${Math.min(Math.max(pctVal, 0), 100)}%; background:${bar};"></span></div>
                </div>
                <span class="pinsp-stat__pct">${sub || (pctVal + '%')}</span>
            </div>`;
        return `
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                ${card(opts.totalIcon || 'fas fa-file-alt', 'blue', opts.totalLabel || 'إجمالي السجلات', total, 100, '#2563eb', opts.totalSub || 'الكل')}
                ${card('fas fa-check-circle', 'green', 'مطابق', (stats && stats.compliant) || 0, pct(stats && stats.compliant), '#22c55e')}
                ${card('fas fa-times-circle', 'red', 'غير مطابق', (stats && stats.nonCompliant) || 0, pct(stats && stats.nonCompliant), '#ef4444')}
                ${card('fas fa-exclamation-circle', 'amber', 'مطابق جزئياً', (stats && stats.partialCompliant) || 0, pct(stats && stats.partialCompliant), '#f59e0b')}
            </div>`;
    },

    getComplianceRateColor(rate) {
        const value = Number(rate) || 0;
        if (value >= 90) return '#15803d';
        if (value >= 75) return '#1d4ed8';
        if (value >= 60) return '#b45309';
        return '#b91c1c';
    },

    getComplianceRateLabel(rate) {
        const value = Number(rate) || 0;
        if (value >= 90) return 'ممتاز';
        if (value >= 75) return 'جيد';
        if (value >= 60) return 'مقبول';
        return 'ضعيف';
    },

    buildEmptyChecklistEvaluation(totalItems = 0) {
        return {
            total: totalItems,
            compliant: 0,
            nonCompliant: 0,
            other: 0,
            pending: totalItems,
            rated: 0,
            complianceRate: 0,
            result: 'قيد المراجعة',
            ratingLabel: '—'
        };
    },

    deriveInspectionResultFromEvaluation(stats) {
        const rated = Number(stats?.rated) || 0;
        const rate = Number(stats?.complianceRate) || 0;
        const nonCompliant = Number(stats?.nonCompliant) || 0;
        if (!rated) return 'قيد المراجعة';
        if (nonCompliant > 0 && rate < 60) return 'غير مطابق';
        if (rate >= 90) return 'مطابق';
        if (rate >= 60) return 'مطابق جزئياً';
        return 'غير مطابق';
    },

    calculateChecklistEvaluationFromStatuses(statuses) {
        const list = Array.isArray(statuses) ? statuses : [];
        const stats = {
            total: list.length,
            compliant: 0,
            nonCompliant: 0,
            other: 0,
            pending: 0,
            rated: 0
        };
        list.forEach((rawStatus) => {
            const status = this._normalizeChecklistComplianceStatus(rawStatus);
            if (!status) {
                stats.pending += 1;
                return;
            }
            stats.rated += 1;
            if (status === 'مطابق') stats.compliant += 1;
            else if (status === 'غير مطابق') stats.nonCompliant += 1;
            else stats.other += 1;
        });
        const complianceRate = stats.rated > 0
            ? Math.round((stats.compliant / stats.rated) * 100)
            : 0;
        const result = this.deriveInspectionResultFromEvaluation({ ...stats, complianceRate });
        return {
            ...stats,
            complianceRate,
            result,
            ratingLabel: stats.rated > 0 ? this.getComplianceRateLabel(complianceRate) : '—'
        };
    },

    calculateChecklistEvaluationFromItems(items) {
        const list = Array.isArray(items) ? items : [];
        return this.calculateChecklistEvaluationFromStatuses(
            list.map((item) => item?.status || '')
        );
    },

    collectChecklistStatusesFromForm() {
        const statuses = [];
        document.querySelectorAll('[id^="checklist-status-"]').forEach((select) => {
            statuses.push(select.value || '');
        });
        return statuses;
    },

    renderInspectionResultPanelHTML(evaluation) {
        const evalData = evaluation || this.buildEmptyChecklistEvaluation();
        const rate = evalData.complianceRate || 0;
        const color = this.getComplianceRateColor(rate);
        const badgeClass = this.getResultBadgeClass(evalData.result);
        const icon = this.getResultIcon(evalData.result);
        const ringOffset = Math.max(0, 283 - (283 * rate / 100));
        return `
            <div style="border: 2px solid ${color}40; border-radius: 14px; overflow: hidden; background: linear-gradient(135deg, #ffffff 0%, ${color}0d 100%); box-shadow: 0 2px 8px rgba(15,23,42,0.06);">
                <div style="padding: 18px 20px;">
                    <p style="margin: 0 0 14px 0; font-size: 12px; font-weight: 700; color: #64748b; text-align: center; line-height: 1.5;">
                        نتيجة الفحص — محسوبة تلقائياً من بنود قائمة الفحص
                    </p>
                    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 20px; margin-bottom: 16px;">
                        <div style="position: relative; width: 112px; height: 112px; flex-shrink: 0;">
                            <svg viewBox="0 0 100 100" style="width: 112px; height: 112px; transform: rotate(-90deg); display: block;">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="8"></circle>
                                <circle cx="50" cy="50" r="45" fill="none" stroke="${color}" stroke-width="8"
                                    stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="${ringOffset}"></circle>
                            </svg>
                            <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; pointer-events: none;">
                                <span style="font-size: 26px; font-weight: 800; line-height: 1; color: ${color};">${rate}%</span>
                                <span style="font-size: 11px; font-weight: 700; margin-top: 4px; color: ${color}; line-height: 1.3;">${Utils.escapeHTML(evalData.ratingLabel || '—')}</span>
                            </div>
                        </div>
                        <div style="flex: 1 1 200px; min-width: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; text-align: center;">
                            <span class="badge ${badgeClass}" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; font-size: 15px; font-weight: 700; line-height: 1.4; white-space: normal; max-width: 100%;">
                                <i class="${icon}" style="flex-shrink: 0;"></i>
                                <span>${Utils.escapeHTML(evalData.result || 'قيد المراجعة')}</span>
                            </span>
                            <span style="font-size: 12px; font-weight: 600; color: #475569; line-height: 1.5;">
                                نسبة المطابقة: <strong style="color: ${color};">${rate}%</strong>
                            </span>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-bottom: 12px;">
                        <div style="border-radius: 10px; padding: 10px 8px; text-align: center; background: #f0fdf4; border: 1px solid #bbf7d0;">
                            <div style="font-size: 18px; font-weight: 800; color: #15803d; line-height: 1.2;">${evalData.compliant || 0}</div>
                            <div style="font-size: 11px; font-weight: 600; color: #16a34a; margin-top: 4px; line-height: 1.3;">مطابق</div>
                        </div>
                        <div style="border-radius: 10px; padding: 10px 8px; text-align: center; background: #fef2f2; border: 1px solid #fecaca;">
                            <div style="font-size: 18px; font-weight: 800; color: #b91c1c; line-height: 1.2;">${evalData.nonCompliant || 0}</div>
                            <div style="font-size: 11px; font-weight: 600; color: #dc2626; margin-top: 4px; line-height: 1.3;">غير مطابق</div>
                        </div>
                        <div style="border-radius: 10px; padding: 10px 8px; text-align: center; background: #fff7ed; border: 1px solid #fed7aa;">
                            <div style="font-size: 18px; font-weight: 800; color: #c2410c; line-height: 1.2;">${evalData.other || 0}</div>
                            <div style="font-size: 11px; font-weight: 600; color: #ea580c; margin-top: 4px; line-height: 1.3;">أخرى</div>
                        </div>
                        <div style="border-radius: 10px; padding: 10px 8px; text-align: center; background: #f8fafc; border: 1px solid #e2e8f0;">
                            <div style="font-size: 18px; font-weight: 800; color: #475569; line-height: 1.2;">${evalData.pending || 0}</div>
                            <div style="font-size: 11px; font-weight: 600; color: #64748b; margin-top: 4px; line-height: 1.3;">لم يُقيَّم</div>
                        </div>
                    </div>
                    <p style="margin: 0; font-size: 11px; color: #64748b; line-height: 1.6; text-align: center;">
                        تُحدَّث النتيجة ونسبة المطابقة فور اختيار حالة كل بند. ≥90% مطابق، 60–89% مطابق جزئياً، أقل من 60% غير مطابق.
                    </p>
                </div>
            </div>
        `;
    },

    updateInspectionResultFromChecklist() {
        const evaluation = this.calculateChecklistEvaluationFromStatuses(this.collectChecklistStatusesFromForm());
        const resultInput = document.getElementById('inspection-result');
        const scoreInput = document.getElementById('inspection-compliance-score');
        if (resultInput) resultInput.value = evaluation.result || 'قيد المراجعة';
        if (scoreInput) scoreInput.value = String(evaluation.complianceRate || 0);

        const panel = document.getElementById('inspection-result-panel');
        if (panel) panel.innerHTML = this.renderInspectionResultPanelHTML(evaluation);

        this.updateChecklistProgress(evaluation);
    },

    isCurrentUserAdmin() {
        if (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserAdmin === 'function') {
            return Permissions.isCurrentUserAdmin();
        }
        const userRole = (AppState.currentUser?.role || '').toLowerCase();
        return userRole === 'admin' || userRole === 'مدير' || userRole === 'مدير النظام';
    },

    applyFilters(inspections) {
        let filtered = [...inspections];

        if (this.state.filters.category) {
            filtered = filtered.filter(i => i.category === this.state.filters.category);
        }

        if (this.state.filters.result) {
            filtered = filtered.filter(i => i.result === this.state.filters.result);
        }

        if (this.state.filters.inspector) {
            filtered = filtered.filter(i => i.inspector === this.state.filters.inspector);
        }

        if (this.state.filters.dateRange.start) {
            filtered = filtered.filter(i => {
                const date = new Date(i.inspectionDate);
                return date >= new Date(this.state.filters.dateRange.start);
            });
        }

        if (this.state.filters.dateRange.end) {
            filtered = filtered.filter(i => {
                const date = new Date(i.inspectionDate);
                return date <= new Date(this.state.filters.dateRange.end);
            });
        }

        return filtered;
    },

    updateChecklistProgress(evaluation) {
        const progressBar = document.getElementById('checklist-progress');
        const progressText = document.getElementById('checklist-progress-text');
        if (!progressBar) return;

        const evalData = evaluation || this.calculateChecklistEvaluationFromStatuses(this.collectChecklistStatusesFromForm());
        const percentage = evalData.complianceRate || 0;
        const color = this.getComplianceRateColor(percentage);

        progressBar.style.width = percentage + '%';
        progressBar.style.background = `linear-gradient(90deg, ${color}, ${color}dd)`;

        if (progressText) {
            progressText.textContent = percentage + '%';
            progressText.style.color = color;
        }
    },

    // الحصول على قائمة المواقع (المصانع) من قاعدة البيانات
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
            var opts = '<option value="">-- اختر المصنع --</option>' + (sites || []).map(function(s) { return '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>'; }).join('');
            var el = document.getElementById('inspection-factory');
            if (el && el.tagName === 'SELECT') { var v = el.value; el.innerHTML = opts; if (v) el.value = v; }
        } catch (e) { if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('⚠️ PeriodicInspections.refreshSiteDropdowns:', e); }
    },

    // الحصول على قائمة الأماكن الفرعية لموقع محدد
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
            Utils.safeWarn('⚠️ خطأ في الحصول على قائمة الأماكن:', error);
            return [];
        }
    },

    toggleNoteField(itemId) {
        const statusSelect = document.getElementById(`checklist-status-${itemId}`);
        const noteWrapper = document.getElementById(`checklist-note-wrapper-${itemId}`);
        if (statusSelect && noteWrapper) {
            if (statusSelect.value === 'غير مطابق') {
                noteWrapper.style.display = 'block';
            } else {
                noteWrapper.style.display = 'none';
                // مسح الملاحظة إذا لم يكن "غير مطابق"
                const noteTextarea = document.getElementById(`checklist-note-${itemId}`);
                if (noteTextarea) {
                    noteTextarea.value = '';
                }
            }
        }
    },

    updateResultBadge(result) {
        const badgePreview = document.getElementById('result-badge-preview');
        if (!badgePreview || !result) {
            if (badgePreview) badgePreview.innerHTML = '';
            return;
        }

        const badgeClass = this.getResultBadgeClass(result);
        const icon = this.getResultIcon(result);
        badgePreview.innerHTML = `
            <span class="badge ${badgeClass} inline-flex items-center gap-2 px-3 py-1.5">
                <i class="${icon}"></i>
                <span class="font-medium">${result}</span>
            </span>
        `;
    },

    setupEventListeners() {
        setTimeout(() => {
            // إعداد التبويبات
            this.setupTabsNavigation();

            // ✅ ربط الأحداث لكلا تبويبي المرور اليومي (قائمة السجلات + تحليل البيانات)
            if (this.state.currentTab === 'daily-safety-checklist' || this.state.currentTab === 'daily-safety-analytics') {
                this.bindDailySafetyCheckListTableEvents();
            }

            if (this.state.currentTab === 'equipment-database' && typeof PeriodicEquipment !== 'undefined') {
                PeriodicEquipment.bindTabEvents();
                this.loadPeriodicEquipmentData(false).catch(() => {});
            }

            const addBtn = document.getElementById('add-periodic-inspection-btn');
            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    this.showFormModal();
                });
            }

            const filterBtn = document.getElementById('filter-periodic-inspections-btn');
            if (filterBtn) {
                filterBtn.addEventListener('click', () => this.showFilterModal());
            }

            const manageTemplatesBtn = document.getElementById('manage-templates-btn');
            if (manageTemplatesBtn && this.isCurrentUserAdmin()) {
                manageTemplatesBtn.addEventListener('click', () => this.showTemplateManagement());
            }

            // إعداد معالج إرسال النموذج
            const form = document.getElementById('periodic-inspection-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleFormSubmit();
                });
            }

            // تحديث التقييم التلقائي عند تحميل النموذج
            setTimeout(() => {
                this.updateInspectionResultFromChecklist();
            }, 200);
        }, 100);
    },

    async handleFormSubmit() {
        const form = document.getElementById('periodic-inspection-form');
        if (!form) return;

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
            const templateId = document.getElementById('inspection-template')?.value || '';
            const template = templateId ? this.INSPECTION_TEMPLATES[templateId] : null;
            
            // جمع بيانات القائمة
            const checklistResults = [];
            if (template && template.checklist) {
                template.checklist.forEach(item => {
                    const checkbox = document.getElementById(`checklist-${item.id}`);
                    const statusSelect = document.getElementById(`checklist-status-${item.id}`);
                    const noteTextarea = document.getElementById(`checklist-note-${item.id}`);
                    checklistResults.push({
                        id: item.id,
                        label: item.label,
                        checked: checkbox ? checkbox.checked : false,
                        status: statusSelect ? statusSelect.value : '',
                        note: noteTextarea ? noteTextarea.value.trim() : '',
                        required: item.required
                    });
                });
            }

            // جمع بيانات المصنع والموقع الفرعي
            const factoryId = document.getElementById('inspection-factory')?.value || '';
            const subLocationId = document.getElementById('inspection-sub-location')?.value || '';
            const sites = this.getSiteOptions();
            const selectedSite = sites.find(s => s.id === factoryId);
            const places = this.getPlaceOptions(factoryId);
            const selectedPlace = places.find(p => p.id === subLocationId);

            this.updateInspectionResultFromChecklist();
            const computedEvaluation = this.calculateChecklistEvaluationFromStatuses(
                checklistResults.map((item) => item.status || '')
            );

            // جمع بيانات النموذج
            const inspectionData = {
                id: this.state.currentEditId || Utils.generateId('PINSP'),
                templateId: templateId,
                category: document.getElementById('inspection-category')?.value || '',
                inspectionDate: document.getElementById('inspection-date')?.value || '',
                location: document.getElementById('inspection-location')?.value || '',
                inspector: document.getElementById('inspection-inspector')?.value || '',
                result: document.getElementById('inspection-result')?.value || computedEvaluation.result || 'قيد المراجعة',
                complianceScore: Number(document.getElementById('inspection-compliance-score')?.value || computedEvaluation.complianceRate || 0),
                assetCode: document.getElementById('inspection-asset-code')?.value || '',
                factory: factoryId,
                factoryId: factoryId,
                factoryName: selectedSite ? selectedSite.name : '',
                subLocation: subLocationId,
                subLocationId: subLocationId,
                subLocationName: selectedPlace ? selectedPlace.name : '',
                notes: document.getElementById('inspection-notes')?.value || '',
                correctiveActions: document.getElementById('inspection-corrective-actions')?.value || '',
                checklistResults: checklistResults,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // التحقق من الحقول المطلوبة
            if (!inspectionData.category || !inspectionData.inspectionDate || !inspectionData.location || !inspectionData.inspector || !inspectionData.result) {
                Notification.error('يرجى ملء جميع الحقول المطلوبة');
                // استعادة الزر عند فشل التحقق
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                return;
            }

            // التحقق من القائمة المطلوبة
            if (template && template.checklist) {
                const requiredItems = template.checklist.filter(item => item.required);
                const missingStatusRequired = requiredItems.filter(item => {
                    const result = checklistResults.find(r => r.id === item.id);
                    return !result || !this._normalizeChecklistComplianceStatus(result.status);
                });

                if (missingStatusRequired.length > 0) {
                    Notification.warning(`يرجى تحديد حالة المطابقة لجميع البنود المطلوبة (${missingStatusRequired.length} بند)`);
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }
                    return;
                }

                if (computedEvaluation.rated === 0) {
                    Notification.warning('يرجى تقييم بنود قائمة الفحص قبل الحفظ');
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }
                    return;
                }
            }

            // حفظ البيانات
            if (!AppState.appData.periodicInspections) {
                AppState.appData.periodicInspections = [];
            }

            if (this.state.currentEditId) {
                const index = AppState.appData.periodicInspections.findIndex(i => i.id === this.state.currentEditId);
                if (index !== -1) {
                    AppState.appData.periodicInspections[index] = { ...AppState.appData.periodicInspections[index], ...inspectionData };
                }
            } else {
                inspectionData.inspectionNumber = `PIN-${Date.now()}`;
                AppState.appData.periodicInspections.push(inspectionData);
            }

            // حفظ في Google Sheets
            try {
                let result;
                if (this.state.currentEditId) {
                    // تحديث فحص موجود
                    result = await GoogleIntegration.sendRequest({
                        action: 'updatePeriodicInspection',
                        data: {
                            inspectionId: this.state.currentEditId,
                            updateData: inspectionData
                        }
                    });
                } else {
                    // إضافة فحص جديد
                    result = await GoogleIntegration.sendRequest({
                        action: 'addPeriodicInspection',
                        data: inspectionData
                    });
                }
                
                if (result && result.success) {
                    Notification.success(this.state.currentEditId ? 'تم تحديث الفحص بنجاح' : 'تم إضافة الفحص بنجاح');
                } else {
                    Notification.warning('تم حفظ البيانات محلياً، لكن حدث خطأ في الاتصال بالخادم');
                }
            } catch (error) {
                Utils.safeWarn('⚠️ خطأ في حفظ البيانات في Google Sheets:', error);
                Notification.warning('تم حفظ البيانات محلياً فقط');
            }

            // حفظ محلياً
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            // استعادة الزر بعد النجاح
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }

            // إغلاق modal والعودة إلى القائمة
            const modal = document.querySelector('.modal-overlay');
            if (modal) {
                modal.remove();
            }
            this.state.currentView = 'list';
            this.state.currentEditId = null;
            this.state.selectedTemplate = null;
            this.load();

        } catch (error) {
            Utils.safeError('❌ خطأ في حفظ الفحص:', error);
            Notification.error('حدث خطأ أثناء حفظ الفحص');
            
            // استعادة الزر في حالة الخطأ
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        }
    },

    async showFilterModal() {
        // جمع جميع أنواع الفحوصات من القوالب والفحوصات الموجودة
        const allCategories = new Set();
        Object.values(this.INSPECTION_TEMPLATES).forEach(template => {
            allCategories.add(template.name);
        });
        if (AppState.appData && AppState.appData.periodicInspections) {
            AppState.appData.periodicInspections.forEach(inspection => {
                if (inspection.category) allCategories.add(inspection.category);
            });
        }

        const categoryOptions = Array.from(allCategories).sort().map(cat => 
            `<option value="${Utils.escapeHTML(cat)}" ${this.state.filters.category === cat ? 'selected' : ''}>${Utils.escapeHTML(cat)}</option>`
        ).join('');

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <h2 class="modal-title text-white">
                        <i class="fas fa-filter ml-2"></i>
                        تصفية الفحوصات الدورية
                    </h2>
                    <button class="modal-close text-white hover:bg-white/20" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="filter-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-tag text-blue-500"></i>
                                    نوع الفحص
                                </label>
                                <select id="filter-category" class="form-input border-2">
                                    <option value="">الكل</option>
                                    ${categoryOptions}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-flag-checkered text-blue-500"></i>
                                    النتيجة
                                </label>
                                <select id="filter-result" class="form-input border-2">
                                    <option value="">الكل</option>
                                    <option value="مطابق" ${this.state.filters.result === 'مطابق' ? 'selected' : ''}>مطابق</option>
                                    <option value="غير مطابق" ${this.state.filters.result === 'غير مطابق' ? 'selected' : ''}>غير مطابق</option>
                                    <option value="مطابق جزئياً" ${this.state.filters.result === 'مطابق جزئياً' ? 'selected' : ''}>مطابق جزئياً</option>
                                    <option value="قيد المراجعة" ${this.state.filters.result === 'قيد المراجعة' ? 'selected' : ''}>قيد المراجعة</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-calendar text-blue-500"></i>
                                    من تاريخ
                                </label>
                                <input type="date" id="filter-date-start" class="form-input border-2" value="${this.state.filters.dateRange.start || ''}">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-calendar-check text-blue-500"></i>
                                    إلى تاريخ
                                </label>
                                <input type="date" id="filter-date-end" class="form-input border-2" value="${this.state.filters.dateRange.end || ''}">
                            </div>
                        </div>
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p class="text-xs text-blue-800 flex items-center gap-2">
                                <i class="fas fa-info-circle"></i>
                                استخدم التصفية للعثور على الفحوصات المحددة بسرعة
                            </p>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                                <i class="fas fa-times ml-2"></i>
                                إلغاء
                            </button>
                            <button type="button" class="btn-secondary" onclick="PeriodicInspections.clearFilters(); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-eraser ml-2"></i>
                                مسح التصفية
                            </button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-filter ml-2"></i>
                                تطبيق التصفية
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const form = modal.querySelector('#filter-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.state.filters.category = document.getElementById('filter-category').value;
            this.state.filters.result = document.getElementById('filter-result').value;
            this.state.filters.dateRange.start = document.getElementById('filter-date-start').value;
            this.state.filters.dateRange.end = document.getElementById('filter-date-end').value;
            modal.remove();
            this.refreshCurrentTabContent();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    clearFilters() {
        this.state.filters = {
            category: '',
            result: '',
            dateRange: {
                start: '',
                end: ''
            },
            inspector: ''
        };
        this.refreshCurrentTabContent();
    },

    async renderForm() {
        const inspection = this.state.currentEditId
            ? (AppState.appData.periodicInspections || []).find(i => i.id === this.state.currentEditId)
            : null;

        // معالجة checklistResults إذا كانت JSON string
        if (inspection && inspection.checklistResults && typeof inspection.checklistResults === 'string') {
            try {
                inspection.checklistResults = JSON.parse(inspection.checklistResults);
            } catch (e) {
                Utils.safeWarn('⚠️ خطأ في تحليل checklistResults:', e);
                inspection.checklistResults = [];
            }
        }
        if (inspection && !Array.isArray(inspection.checklistResults)) {
            inspection.checklistResults = [];
        }

        // تحديد القالب المختار
        const selectedTemplateId = this.state.selectedTemplate || inspection?.templateId || '';
        const selectedTemplate = selectedTemplateId ? this.INSPECTION_TEMPLATES[selectedTemplateId] : null;
        const initialEvaluation = selectedTemplate
            ? (inspection
                ? this.calculateChecklistEvaluationFromItems(this.resolveInspectionChecklistItems(inspection))
                : this.buildEmptyChecklistEvaluation(selectedTemplate.checklist.length))
            : this.buildEmptyChecklistEvaluation(0);
        const initialResult = inspection?.result || initialEvaluation.result || 'قيد المراجعة';
        const initialScore = inspection?.complianceScore != null
            ? Number(inspection.complianceScore)
            : initialEvaluation.complianceRate;

        // إنشاء خيارات القوالب
        const templateOptions = Object.values(this.INSPECTION_TEMPLATES).map(template => 
            `<option value="${template.id}" ${selectedTemplateId === template.id ? 'selected' : ''}>
                ${template.name}
            </option>`
        ).join('');

        // إنشاء قائمة الفحص إذا كان هناك قالب مختار
        let checklistHtml = '';
        if (selectedTemplate && selectedTemplate.checklist) {
            const totalItems = selectedTemplate.checklist.length;
            const requiredItems = selectedTemplate.checklist.filter(item => item.required).length;
            checklistHtml = `
                <div class="mt-6 border-t pt-6">
                    <div class="bg-white border-2 border-blue-100 rounded-xl p-5 mb-4 shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between flex-wrap gap-4">
                            <div class="flex items-center gap-4 flex-1 min-w-0">
                                <div class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-sm">
                                    <i class="fas ${selectedTemplate.icon} text-white text-lg"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                                        <span>قائمة فحص ${selectedTemplate.name}</span>
                                    </h4>
                                    <div class="flex items-center gap-3 flex-wrap text-sm text-gray-600">
                                        <span class="flex items-center gap-1">
                                            <i class="fas fa-list-ul text-blue-500 text-xs"></i>
                                            <span class="font-medium text-gray-700">${totalItems}</span>
                                            <span class="text-gray-500">عنصر</span>
                                        </span>
                                        <span class="text-gray-300">|</span>
                                        <span class="flex items-center gap-1">
                                            <i class="fas fa-exclamation-circle text-red-500 text-xs"></i>
                                            <span class="font-medium text-red-600">${requiredItems}</span>
                                            <span class="text-gray-500">مطلوب</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="text-right">
                                    <p class="text-xs font-medium text-gray-600 mb-2">نسبة المطابقة</p>
                                    <div class="flex items-center gap-2">
                                        <div class="progress-bar-container" style="width: 120px; height: 10px; background: #e5e7eb; border-radius: 5px; overflow: hidden;">
                                            <div class="progress-bar-fill" style="width: ${initialEvaluation.complianceRate || 0}%; height: 100%; background: linear-gradient(90deg, ${this.getComplianceRateColor(initialEvaluation.complianceRate || 0)}, ${this.getComplianceRateColor(initialEvaluation.complianceRate || 0)}dd); border-radius: 5px; transition: width 0.3s ease;" id="checklist-progress"></div>
                                        </div>
                                        <span class="text-xs font-bold text-gray-700" id="checklist-progress-text" style="color: ${this.getComplianceRateColor(initialEvaluation.complianceRate || 0)};">${initialEvaluation.complianceRate || 0}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-3">
                        ${selectedTemplate.checklist.map((item, index) => {
                            const isChecked = inspection?.checklistResults?.find(r => r.id === item.id && r.checked);
                            return `
                            <div class="group relative flex items-start gap-3 p-4 bg-white rounded-xl border ${isChecked ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' : 'border-gray-200 bg-white'} hover:border-blue-300 hover:shadow-lg transition-all duration-300 ${isChecked ? 'shadow-sm' : ''}">
                                <div class="flex items-center pt-1 flex-shrink-0">
                                    <input type="checkbox" 
                                           id="checklist-${item.id}" 
                                           name="checklist-${item.id}"
                                           class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
                                           ${isChecked ? 'checked' : ''}
                                           onchange="PeriodicInspections.updateInspectionResultFromChecklist()">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-start justify-between gap-3 mb-2">
                                        <label for="checklist-${item.id}" class="text-sm font-medium text-gray-800 cursor-pointer flex-1 min-w-0 flex items-start gap-2">
                                            <span class="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-md ${isChecked ? 'bg-green-500 text-white' : 'bg-blue-50 text-blue-700'} text-xs font-bold leading-none flex-shrink-0 transition-colors">${index + 1}</span>
                                            <span class="break-words flex-1 ${isChecked ? 'text-gray-700' : 'text-gray-800'}">${Utils.escapeHTML(item.label)}</span>
                                            ${item.required ? '<span class="text-red-500 mr-1 font-bold flex-shrink-0 text-base" title="عنصر مطلوب">*</span>' : ''}
                                        </label>
                                        ${isChecked ? '<div class="flex-shrink-0"><i class="fas fa-check-circle text-green-500 text-lg"></i></div>' : ''}
                                    </div>
                                    <div class="mt-3 space-y-2">
                                        <div>
                                            <select 
                                                id="checklist-status-${item.id}"
                                                name="checklist-status-${item.id}"
                                                class="form-input text-sm w-full border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                                                onchange="PeriodicInspections.toggleNoteField('${item.id}'); PeriodicInspections.updateInspectionResultFromChecklist();">
                                                <option value="">-- اختر الحالة --</option>
                                                <option value="مطابق" ${inspection?.checklistResults?.find(r => r.id === item.id)?.status === 'مطابق' ? 'selected' : ''}>مطابق</option>
                                                <option value="غير مطابق" ${inspection?.checklistResults?.find(r => r.id === item.id)?.status === 'غير مطابق' ? 'selected' : ''}>غير مطابق</option>
                                                <option value="أخرى" ${inspection?.checklistResults?.find(r => r.id === item.id)?.status === 'أخرى' ? 'selected' : ''}>أخرى</option>
                                            </select>
                                        </div>
                                        <div id="checklist-note-wrapper-${item.id}" style="display: ${inspection?.checklistResults?.find(r => r.id === item.id)?.status === 'غير مطابق' ? 'block' : 'none'};">
                                            <textarea 
                                                id="checklist-note-${item.id}"
                                                name="checklist-note-${item.id}"
                                                class="form-input text-xs w-full border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all" 
                                                rows="1"
                                                placeholder="أضف ملاحظة (اختياري)">${inspection?.checklistResults?.find(r => r.id === item.id)?.note || ''}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        }).join('')}
                    </div>
                </div>
            `;
        }

        return `
            <div class="content-card" style="border: none; box-shadow: none; margin: 0;">
                <div class="card-body" style="padding: 1.5rem;">
                    <form id="periodic-inspection-form" class="space-y-6">
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-xl p-5 mb-6 shadow-sm">
                            <div class="flex items-start gap-3 mb-3">
                                <div class="bg-blue-500 rounded-lg p-2">
                                    <i class="fas fa-clipboard-list text-white text-xl"></i>
                                </div>
                                <div class="flex-1">
                                    <label class="block text-base font-bold text-gray-800 mb-2">
                                        اختر نموذج الفحص الجاهز <span class="text-red-500">*</span>
                                    </label>
                                    <select id="inspection-template" required class="form-input text-base font-medium border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                                            onchange="PeriodicInspections.onTemplateChange(this.value)">
                                        <option value="">-- اختر نموذج الفحص من القائمة --</option>
                                        ${templateOptions}
                                    </select>
                                    <p class="text-sm text-gray-600 mt-3 flex items-center gap-2">
                                        <i class="fas fa-info-circle text-blue-500"></i>
                                        اختر نوع المعدة أو الفحص من القائمة أعلاه لعرض قائمة الفحص المخصصة
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div class="space-y-1">
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-tag text-blue-500"></i>
                                    نوع الفحص <span class="text-red-500">*</span>
                                </label>
                                <input type="text" id="inspection-category" required class="form-input border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    value="${selectedTemplate ? Utils.escapeHTML(selectedTemplate.name) : Utils.escapeHTML(inspection?.category || '')}"
                                    placeholder="سيتم ملؤه تلقائياً عند اختيار النموذج" readonly>
                            </div>
                            <div class="space-y-1">
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-calendar-alt text-blue-500"></i>
                                    تاريخ الفحص <span class="text-red-500">*</span>
                                </label>
                                <input type="date" id="inspection-date" required class="form-input border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    value="${inspection?.inspectionDate ? new Date(inspection.inspectionDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}">
                            </div>
                            <div class="space-y-1">
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-map-marker-alt text-blue-500"></i>
                                    الموقع/المعدة <span class="text-red-500">*</span>
                                </label>
                                <input type="text" id="inspection-location" required class="form-input border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    value="${Utils.escapeHTML(inspection?.location || inspection?.equipment || '')}"
                                    placeholder="أدخل الموقع أو المعدة">
                            </div>
                            <div class="space-y-1">
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-user-check text-blue-500"></i>
                                    المفتش <span class="text-red-500">*</span>
                                </label>
                                <input type="text" id="inspection-inspector" required class="form-input border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    value="${Utils.escapeHTML(inspection?.inspector || '')}"
                                    placeholder="اسم المفتش">
                            </div>
                            <div class="space-y-1">
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-industry text-blue-500"></i>
                                    المصنع
                                </label>
                                <select id="inspection-factory" class="form-input border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                                    <option value="">-- اختر المصنع --</option>
                                    ${this.getSiteOptions().map(site => {
                                        const isSelected = inspection && (inspection.factoryId === site.id || inspection.factoryId === String(site.id) || (inspection.factory === site.id && !inspection.factoryId) || inspection.factory === site.name);
                                        return `<option value="${site.id}" ${isSelected ? 'selected' : ''}>${Utils.escapeHTML(site.name)}</option>`;
                                    }).join('')}
                                </select>
                            </div>
                            <div class="space-y-1">
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-map-marker-alt text-blue-500"></i>
                                    الموقع الفرعي
                                </label>
                                <select id="inspection-sub-location" class="form-input border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                                    <option value="">-- اختر الموقع الفرعي --</option>
                                    ${(() => {
                                        const factoryId = inspection?.factoryId || inspection?.factory || '';
                                        const places = this.getPlaceOptions(factoryId);
                                        return places.map(place => {
                                            const isSelected = inspection && (inspection.subLocationId === place.id || inspection.subLocationId === String(place.id) || (inspection.subLocation === place.id && !inspection.subLocationId) || inspection.subLocation === place.name);
                                            return `<option value="${place.id}" ${isSelected ? 'selected' : ''}>${Utils.escapeHTML(place.name)}</option>`;
                                        }).join('');
                                    })()}
                                </select>
                            </div>
                            <div class="space-y-1">
                                <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="fas fa-barcode text-blue-500"></i>
                                    رقم المعدة / الكود
                                </label>
                                <input type="text" id="inspection-asset-code" class="form-input border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    value="${Utils.escapeHTML(inspection?.assetCode || '')}"
                                    placeholder="رقم أو كود المعدة (اختياري)">
                            </div>
                        </div>

                        ${checklistHtml}

                        ${selectedTemplate ? `
                        <div class="mt-4">
                            <input type="hidden" id="inspection-result" value="${Utils.escapeHTML(initialResult)}">
                            <input type="hidden" id="inspection-compliance-score" value="${initialScore || 0}">
                            <div id="inspection-result-panel">${this.renderInspectionResultPanelHTML({ ...initialEvaluation, result: initialResult, complianceRate: initialScore || initialEvaluation.complianceRate })}</div>
                        </div>
                        ` : `
                        <div class="mt-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
                            <i class="fas fa-info-circle ml-1 text-blue-500"></i>
                            اختر نموذج فحص لاحتساب النتيجة ونسبة المطابقة تلقائياً من البنود.
                            <input type="hidden" id="inspection-result" value="${Utils.escapeHTML(initialResult || 'قيد المراجعة')}">
                            <input type="hidden" id="inspection-compliance-score" value="0">
                            <div id="inspection-result-panel" class="hidden"></div>
                        </div>
                        `}
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">ملاحظات عامة</label>
                            <textarea id="inspection-notes" class="form-input" rows="2"
                                placeholder="ملاحظات إضافية أو توصيات">${Utils.escapeHTML(inspection?.notes || '')}</textarea>
                        </div>
                        
                        <div class="rounded-xl p-4 border" style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-color: #fca5a5;">
                            <label class="block text-sm font-semibold mb-2" style="color: #991b1b;">الإجراءات التصحيحية المطلوبة</label>
                            <textarea id="inspection-corrective-actions" class="form-input" rows="3"
                                placeholder="في حالة وجود عدم مطابقة، اذكر الإجراءات التصحيحية المطلوبة" style="border-color: #fca5a5;">${Utils.escapeHTML(inspection?.correctiveActions || '')}</textarea>
                            <div class="flex flex-wrap justify-center gap-3 mt-3">
                                <button type="button" class="px-4 py-2 rounded-xl font-semibold transition-all text-white" style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);" onclick="PeriodicInspections.printInspection()" title="طباعة الفحص">
                                    <i class="fas fa-print ml-2"></i>
                                    طباعة
                                </button>
                                <button type="button" class="px-4 py-2 rounded-xl font-semibold transition-all text-white" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);" onclick="PeriodicInspections.exportInspection()" title="تحميل PDF">
                                    <i class="fas fa-file-pdf ml-2"></i>
                                    تحميل PDF
                                </button>
                            </div>
                        </div>

                        <div class="flex flex-wrap justify-center items-center gap-3 pt-6 border-t" style="border-color: #e7e5e4;">
                            <button type="button" class="px-4 py-2.5 rounded-xl font-semibold transition-all border" style="background: #fafaf9; border-color: #d6d3d1; color: #57534e;" onclick="PeriodicInspections.cancelForm()">إلغاء</button>
                            <button type="button" class="px-4 py-2.5 rounded-xl font-semibold transition-all text-white" style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);" onclick="PeriodicInspections.printInspection()" title="طباعة الفحص">
                                <i class="fas fa-print ml-2"></i>
                                طباعة
                            </button>
                            <button type="button" class="px-4 py-2.5 rounded-xl font-semibold transition-all text-white" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);" onclick="PeriodicInspections.exportInspection()" title="تحميل PDF">
                                <i class="fas fa-file-pdf ml-2"></i>
                                تحميل PDF
                            </button>
                            <button type="submit" class="px-4 py-2.5 rounded-xl font-semibold transition-all text-white" style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);">
                                <i class="fas fa-save ml-2"></i>
                                ${inspection ? 'حفظ التعديلات' : 'حفظ الفحص'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    async showFormModal(inspectionId = null) {
        if (typeof Permissions !== 'undefined' && Permissions.ensureFormSettingsState) {
            try { await Permissions.ensureFormSettingsState(); } catch (e) { /* ignore */ }
        }
        // إزالة أي modal موجود مسبقاً
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        // تعيين حالة التعديل أو الإضافة
        this.state.currentEditId = inspectionId;
        this.state.selectedTemplate = inspectionId 
            ? (AppState.appData.periodicInspections || []).find(i => i.id === inspectionId)?.templateId || null
            : null;

        // إنشاء modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        // الحصول على محتوى النموذج
        const formHtml = await this.renderForm();
        
        const inspection = inspectionId 
            ? (AppState.appData.periodicInspections || []).find(i => i.id === inspectionId)
            : null;

        modal.innerHTML = `
            <div class="modal-content" style="max-width: 1200px; max-height: 95vh; overflow-y: auto;">
                <div class="modal-header border-b-2" style="position: relative; z-index: 10; background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); border-color: #1e293b;">
                    <div class="flex items-center justify-center py-2" style="position: relative;">
                        <button class="modal-close rounded-lg p-2 transition-colors" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); color: #fef3c7; background: rgba(254,243,199,0.15);" onmouseover="this.style.background='rgba(254,243,199,0.25)'" onmouseout="this.style.background='rgba(254,243,199,0.15)'" onclick="PeriodicInspections.cancelForm()">
                            <i class="fas fa-times"></i>
                        </button>
                        <h2 class="modal-title text-center mb-0" style="color: #fef3c7 !important; font-weight: 700;">
                            <i class="fas fa-${inspection ? 'edit' : 'plus-circle'} ml-2" style="color: #fcd34d;"></i>
                            ${inspection ? 'تعديل فحص دوري' : 'إضافة فحص دوري جديد'}
                        </h2>
                    </div>
                </div>
                <div class="modal-body" style="padding: 0;">
                    ${formHtml}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // إعداد الأحداث
        this.setupFormEventListeners(modal);

        // إغلاق modal عند النقر خارج المحتوى
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.cancelForm();
            }
        });

        // إغلاق modal عند الضغط على ESC
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                this.cancelForm();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    },

    setupFormEventListeners(modal) {
        // إعداد معالج إرسال النموذج
        const form = modal.querySelector('#periodic-inspection-form');
        if (form) {
            // إزالة المستمعين السابقين
            const newForm = form.cloneNode(true);
            form.parentNode.replaceChild(newForm, form);
            
            newForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }

        // ربط المصنع بالموقع الفرعي
        const factorySelect = modal.querySelector('#inspection-factory');
        const subLocationSelect = modal.querySelector('#inspection-sub-location');
        if (factorySelect && subLocationSelect) {
            factorySelect.addEventListener('change', () => {
                const factoryId = factorySelect.value;
                const places = this.getPlaceOptions(factoryId);

                // مسح الخيارات الحالية
                subLocationSelect.innerHTML = '<option value="">-- اختر الموقع الفرعي --</option>';

                // إضافة الأماكن الجديدة
                places.forEach(place => {
                    const option = document.createElement('option');
                    option.value = place.id;
                    option.textContent = place.name;
                    subLocationSelect.appendChild(option);
                });
            });
        }

        // تحديث معاينة النتيجة
        setTimeout(() => {
            this.updateInspectionResultFromChecklist();
        }, 200);

        // ربط أحداث قوائم المطابقة
        const statusSelects = modal.querySelectorAll('[id^="checklist-status-"]');
        statusSelects.forEach(select => {
            const itemId = select.id.replace('checklist-status-', '');
            // إزالة event listener القديم إذا كان موجوداً
            const newSelect = select.cloneNode(true);
            select.parentNode.replaceChild(newSelect, select);
            newSelect.addEventListener('change', () => {
                this.toggleNoteField(itemId);
                this.updateInspectionResultFromChecklist();
            });
            // التأكد من إظهار/إخفاء حقل الملاحظات عند التحميل
            if (newSelect.value === 'غير مطابق') {
                const noteWrapper = modal.querySelector(`#checklist-note-wrapper-${itemId}`);
                if (noteWrapper) {
                    noteWrapper.style.display = 'block';
                }
            }
        });

        // تحديث شريط التقدم
        setTimeout(() => {
            this.updateInspectionResultFromChecklist();
        }, 250);

        // تحديث زر الإلغاء
        const cancelBtn = modal.querySelector('button[onclick*="cancelForm"]');
        if (cancelBtn) {
            cancelBtn.onclick = () => this.cancelForm();
        }
    },

    async onTemplateChange(templateId) {
        this.state.selectedTemplate = templateId;
        const template = this.INSPECTION_TEMPLATES[templateId];
        if (template) {
            // تحديث نوع الفحص تلقائياً
            const categoryInput = document.getElementById('inspection-category');
            if (categoryInput) {
                categoryInput.value = template.name;
            }
        }
        // إعادة عرض النموذج في modal
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                const formHtml = await this.renderForm();
                modalBody.innerHTML = formHtml;
                // إعادة ربط الأحداث
                this.setupFormEventListeners(modal);
            }
        }
    },

    cancelForm() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
        this.state.currentView = 'list';
        this.state.currentEditId = null;
        this.state.selectedTemplate = null;
    },

    async showTemplateManagement() {
        if (!this.isCurrentUserAdmin()) {
            Notification.error('ليس لديك صلاحية للوصول إلى هذه الصفحة. يجب أن تكون مدير النظام.');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <h2 class="modal-title text-white">
                        <i class="fas fa-cog ml-2"></i>
                        إدارة قوالب الفحوصات الدورية
                    </h2>
                    <button class="modal-close text-white hover:bg-white/20" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p class="text-sm text-blue-800 flex items-center gap-2">
                            <i class="fas fa-info-circle"></i>
                            يمكنك هنا إضافة، تعديل، أو حذف قوالب الفحوصات الجاهزة. القوالب تساعد في تسريع عملية الفحص من خلال توفير قوائم فحص مخصصة لكل نوع من المعدات.
                        </p>
                    </div>
                    <div class="flex justify-end mb-4">
                        <button id="add-template-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            إضافة قالب جديد
                        </button>
                    </div>
                    <div class="space-y-4">
                        ${Object.values(this.INSPECTION_TEMPLATES).map(template => `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex items-center gap-3">
                                        <div class="bg-blue-100 rounded-lg p-2">
                                            <i class="fas ${template.icon} text-blue-600 text-xl"></i>
                                        </div>
                                        <div>
                                            <h3 class="text-lg font-bold text-gray-800">${Utils.escapeHTML(template.name)}</h3>
                                            <p class="text-sm text-gray-600 mt-1">
                                                <span class="font-medium">${template.checklist?.length || 0}</span> عنصر في قائمة الفحص
                                                <span class="mx-2">•</span>
                                                <span class="font-medium text-red-600">${template.checklist?.filter(item => item.required).length || 0}</span> عنصر مطلوب
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="PeriodicInspections.editTemplate(${JSON.stringify(String(template.id || ''))})" class="btn-icon btn-icon-primary" title="تعديل">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="PeriodicInspections.deleteTemplate(${JSON.stringify(String(template.id || ''))})" class="btn-icon btn-icon-danger" title="حذف">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-3 pt-3 border-t border-gray-200">
                                    <p class="text-xs text-gray-500 mb-2 font-medium">عناصر قائمة الفحص:</p>
                                    <div class="flex flex-wrap gap-2">
                                        ${(template.checklist || []).slice(0, 5).map(item => `
                                            <span class="text-xs px-2 py-1 bg-gray-100 rounded border ${item.required ? 'border-red-200 text-red-700' : 'border-gray-200'}">
                                                ${Utils.escapeHTML(item.label.substring(0, 30))}${item.label.length > 30 ? '...' : ''}
                                                ${item.required ? ' <span class="text-red-500">*</span>' : ''}
                                            </span>
                                        `).join('')}
                                        ${(template.checklist || []).length > 5 ? `
                                            <span class="text-xs px-2 py-1 bg-gray-100 rounded border border-gray-200 text-gray-600">
                                                +${(template.checklist || []).length - 5} عنصر آخر
                                            </span>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const addBtn = modal.querySelector('#add-template-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                modal.remove();
                this.showAddEditTemplateModal();
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async showAddEditTemplateModal(templateId = null) {
        const template = templateId ? this.INSPECTION_TEMPLATES[templateId] : null;
        const isEdit = !!template;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <h2 class="modal-title text-white">
                        <i class="fas fa-${isEdit ? 'edit' : 'plus'} ml-2"></i>
                        ${isEdit ? 'تعديل قالب' : 'إضافة قالب جديد'}
                    </h2>
                    <button class="modal-close text-white hover:bg-white/20" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="template-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">اسم القالب *</label>
                            <input type="text" id="template-name" required class="form-input" 
                                   value="${template ? Utils.escapeHTML(template.name) : ''}"
                                   placeholder="مثال: فحص كشافات الطوارئ">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">أيقونة القالب</label>
                            <select id="template-icon" class="form-input">
                                <option value="fa-lightbulb" ${template?.icon === 'fa-lightbulb' ? 'selected' : ''}>💡 لمبة</option>
                                <option value="fa-fire-extinguisher" ${template?.icon === 'fa-fire-extinguisher' ? 'selected' : ''}>🧯 طفاية حريق</option>
                                <option value="fa-truck-loading" ${template?.icon === 'fa-truck-loading' ? 'selected' : ''}>🚚 رافعة</option>
                                <option value="fa-door-open" ${template?.icon === 'fa-door-open' ? 'selected' : ''}>🚪 باب</option>
                                <option value="fa-fire" ${template?.icon === 'fa-fire' ? 'selected' : ''}>🔥 نار</option>
                                <option value="fa-wrench" ${template?.icon === 'fa-wrench' ? 'selected' : ''}>🔧 مفتاح</option>
                                <option value="fa-bolt" ${template?.icon === 'fa-bolt' ? 'selected' : ''}>⚡ كهرباء</option>
                                <option value="fa-tools" ${template?.icon === 'fa-tools' ? 'selected' : ''}>🔨 أدوات</option>
                                <option value="fa-car" ${template?.icon === 'fa-car' ? 'selected' : ''}>🚗 سيارة</option>
                                <option value="fa-clipboard-list" ${template?.icon === 'fa-clipboard-list' ? 'selected' : ''}>📋 قائمة</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">
                                عناصر قائمة الفحص *
                                <span class="text-xs font-normal text-gray-500">(يمكنك إضافة/تعديل/حذف العناصر)</span>
                            </label>
                            <div id="checklist-items-container" class="space-y-2 border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                                ${template && template.checklist ? template.checklist.map((item, index) => `
                                    <div class="checklist-item bg-white p-3 rounded border border-gray-200">
                                        <div class="flex items-start gap-2">
                                            <input type="checkbox" class="item-required mt-1" ${item.required ? 'checked' : ''}>
                                            <input type="text" class="form-input flex-1 item-label" value="${Utils.escapeHTML(item.label)}" placeholder="نص العنصر">
                                            <button type="button" class="btn-icon btn-icon-danger remove-item" title="حذف">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                `).join('') : ''}
                            </div>
                            <button type="button" id="add-checklist-item-btn" class="btn-secondary mt-2">
                                <i class="fas fa-plus ml-2"></i>
                                إضافة عنصر جديد
                            </button>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>
                                ${isEdit ? 'حفظ التعديلات' : 'حفظ القالب'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // إضافة عنصر جديد
        const addItemBtn = modal.querySelector('#add-checklist-item-btn');
        const itemsContainer = modal.querySelector('#checklist-items-container');
        
        addItemBtn.addEventListener('click', () => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'checklist-item bg-white p-3 rounded border border-gray-200';
            itemDiv.innerHTML = `
                <div class="flex items-start gap-2">
                    <input type="checkbox" class="item-required mt-1">
                    <input type="text" class="form-input flex-1 item-label" placeholder="نص العنصر">
                    <button type="button" class="btn-icon btn-icon-danger remove-item" title="حذف">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            itemsContainer.appendChild(itemDiv);
            
            itemDiv.querySelector('.remove-item').addEventListener('click', () => {
                itemDiv.remove();
            });
        });

        // حذف عناصر موجودة
        modal.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.checklist-item').remove();
            });
        });

        // معالجة النموذج
        const form = modal.querySelector('#template-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = modal.querySelector('#template-name').value.trim();
            const icon = modal.querySelector('#template-icon').value;
            const items = Array.from(modal.querySelectorAll('.checklist-item')).map((itemDiv, index) => {
                const label = itemDiv.querySelector('.item-label').value.trim();
                const required = itemDiv.querySelector('.item-required').checked;
                return label ? { id: `item_${Date.now()}_${index}`, label, required } : null;
            }).filter(item => item !== null);

            if (!name) {
                Notification.error('يرجى إدخال اسم القالب');
                return;
            }

            if (items.length === 0) {
                Notification.error('يرجى إضافة عنصر واحد على الأقل لقائمة الفحص');
                return;
            }

            const templateData = {
                id: isEdit ? templateId : `template_${Date.now()}`,
                name,
                icon,
                checklist: items
            };

            if (isEdit) {
                // تحديث القالب الموجود مع الحفاظ على نفس الـ ID
                this.INSPECTION_TEMPLATES[templateId] = templateData;
                Notification.success('تم تحديث القالب بنجاح');
            } else {
                // إضافة قالب جديد
                this.INSPECTION_TEMPLATES[templateData.id] = templateData;
                Notification.success('تم إضافة القالب بنجاح');
            }

            modal.remove();
            this.showTemplateManagement();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    editTemplate(templateId) {
        this.showAddEditTemplateModal(templateId);
    },

    deleteTemplate(templateId) {
        const template = this.INSPECTION_TEMPLATES[templateId];
        if (!template) return;

        if (!confirm(`هل أنت متأكد من حذف قالب "${template.name}"؟\n\nملاحظة: لن يتم حذف الفحوصات الموجودة التي استخدمت هذا القالب، ولكن لن يتمكن المستخدمون من استخدام هذا القالب في الفحوصات الجديدة.`)) {
            return;
        }

        delete this.INSPECTION_TEMPLATES[templateId];
        Notification.success('تم حذف القالب بنجاح');
        
        // إعادة عرض نافذة الإدارة
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) existingModal.remove();
        this.showTemplateManagement();
    },

    async viewInspection(id) {
        const inspection = (AppState.appData.periodicInspections || []).find(i => i.id === id);
        if (!inspection) return;

        // معالجة checklistResults إذا كانت JSON string
        if (inspection.checklistResults && typeof inspection.checklistResults === 'string') {
            try {
                inspection.checklistResults = JSON.parse(inspection.checklistResults);
            } catch (e) {
                Utils.safeWarn('⚠️ خطأ في تحليل checklistResults:', e);
                inspection.checklistResults = [];
            }
        }
        if (!Array.isArray(inspection.checklistResults)) {
            inspection.checklistResults = [];
        }

        const template = inspection.templateId ? this.INSPECTION_TEMPLATES[inspection.templateId] : null;
        
        // حساب إحصائيات القائمة
        const checklistStats = template && inspection.checklistResults && inspection.checklistResults.length > 0 ? {
            total: inspection.checklistResults.length,
            checked: inspection.checklistResults.filter(r => r.checked).length,
            unchecked: inspection.checklistResults.filter(r => !r.checked).length
        } : null;

        // عرض نتائج القائمة
        let checklistHtml = '';
        if (template && inspection.checklistResults && inspection.checklistResults.length > 0) {
            checklistHtml = `
                <div class="mt-6 border-t pt-6">
                    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="bg-blue-500 rounded-lg p-2">
                                    <i class="fas ${template.icon} text-white text-xl"></i>
                                </div>
                                <div>
                                    <h4 class="text-lg font-bold text-gray-800">نتائج قائمة الفحص</h4>
                                    <p class="text-sm text-gray-600 mt-1">
                                        ${template.name}
                                    </p>
                                </div>
                            </div>
                            ${checklistStats ? `
                                <div class="text-left">
                                    <div class="flex items-center gap-4">
                                        <div class="text-center">
                                            <p class="text-2xl font-bold text-green-600">${checklistStats.checked}</p>
                                            <p class="text-xs text-gray-600">مطابق</p>
                                        </div>
                                        <div class="text-center">
                                            <p class="text-2xl font-bold text-red-600">${checklistStats.unchecked}</p>
                                            <p class="text-xs text-gray-600">غير مطابق</p>
                                        </div>
                                        <div class="text-center">
                                            <p class="text-2xl font-bold text-blue-600">${checklistStats.total}</p>
                                            <p class="text-xs text-gray-600">الإجمالي</p>
                                        </div>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="space-y-3">
                        ${inspection.checklistResults.map((result, index) => {
                            const item = template.checklist.find(i => i.id === result.id);
                            if (!item) return '';
                            const resultBadgeClass = result.checked ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300';
                            const resultIcon = result.checked ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600';
                            return `
                                <div class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-lg border-2 ${resultBadgeClass} hover:shadow-md transition-shadow">
                                    <div class="flex items-center pt-1 flex-shrink-0">
                                        <i class="fas ${resultIcon} text-base sm:text-xl"></i>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-start justify-between gap-2">
                                            <label class="text-sm font-bold text-gray-800 cursor-pointer flex-1 min-w-0">
                                                <span class="inline-flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ${result.checked ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-[10px] sm:text-[11px] font-bold ml-2 leading-none flex-shrink-0">${index + 1}</span>
                                                <span class="break-words">${Utils.escapeHTML(result.label || item.label)}</span>
                                                ${item.required ? '<span class="text-red-500 mr-1 font-bold flex-shrink-0">*</span>' : ''}
                                            </label>
                                        </div>
                                        ${result.note ? `
                                            <div class="mt-3 p-3 bg-white border border-gray-200 rounded-lg">
                                                <div class="flex items-start gap-2">
                                                    <i class="fas fa-sticky-note text-gray-400 text-sm mt-0.5"></i>
                                                    <div class="flex-1">
                                                        <p class="text-xs font-semibold text-gray-600 mb-1">ملاحظة:</p>
                                                        <p class="text-sm text-gray-800">${Utils.escapeHTML(result.note)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }

        const resultBadgeClass = this.getResultBadgeClass(inspection.result);
        const resultIcon = this.getResultIcon(inspection.result);
        const viewEvaluation = inspection.complianceScore != null && inspection.complianceScore !== ''
            ? { complianceRate: Number(inspection.complianceScore), ratingLabel: this.getComplianceRateLabel(Number(inspection.complianceScore)) }
            : this.calculateChecklistEvaluationFromItems(this.resolveInspectionChecklistItems(inspection));
        const viewScoreColor = this.getComplianceRateColor(viewEvaluation.complianceRate || 0);

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content periodic-inspection-details-modal" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header" style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); color: #fef3c7; position: relative;">
                    <div class="flex items-center justify-center py-2" style="position: relative;">
                        <button class="modal-close rounded-lg p-2 transition-colors" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); color: #fef3c7; background: rgba(254,243,199,0.15);" onmouseover="this.style.background='rgba(254,243,199,0.25)'" onmouseout="this.style.background='rgba(254,243,199,0.15)'" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                        <div class="text-center">
                            <h2 class="modal-title mb-0" style="color: #fef3c7 !important; font-weight: 700; font-size: 1.35rem;">
                                <i class="fas fa-clipboard-check ml-2" style="color: #fcd34d;"></i>
                                تفاصيل الفحص الدوري
                            </h2>
                            <p class="text-sm mt-1" style="color: rgba(254,243,199,0.85);">رقم الفحص: ${Utils.escapeHTML(inspection.inspectionNumber || inspection.id || '')}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-body" style="background: linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%);">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="rounded-xl p-4 border" style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border-color: #fcd34d;">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="rounded-lg p-2" style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%);">
                                    <i class="fas fa-tag text-white"></i>
                                </div>
                                <div>
                                    <label class="text-xs font-semibold uppercase" style="color: #92400e;">نوع الفحص</label>
                                    <p class="text-base font-bold mt-1" style="color: #1c1917;">${Utils.escapeHTML(inspection.category || '-')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-xl p-4 border" style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-color: #6ee7b7;">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="rounded-lg p-2" style="background: linear-gradient(135deg, #059669 0%, #047857 100%);">
                                    <i class="fas fa-flag-checkered text-white"></i>
                                </div>
                                <div>
                                    <label class="text-xs font-semibold uppercase" style="color: #065f46;">النتيجة</label>
                                    <div class="mt-1">
                                        <span class="badge ${resultBadgeClass} inline-flex items-center gap-2 px-3 py-1.5 text-base">
                                            <i class="${resultIcon}"></i>
                                            ${Utils.escapeHTML(inspection.result || '-')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-xl p-4 border" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-color: #86efac;">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="rounded-lg p-2" style="background: linear-gradient(135deg, #15803d 0%, #166534 100%);">
                                    <i class="fas fa-chart-pie text-white"></i>
                                </div>
                                <div>
                                    <label class="text-xs font-semibold uppercase" style="color: #166534;">نسبة المطابقة</label>
                                    <p class="text-2xl font-extrabold mt-1" style="color: ${viewScoreColor};">${viewEvaluation.complianceRate || 0}%</p>
                                    <p class="text-xs font-semibold mt-1" style="color: ${viewScoreColor};">${Utils.escapeHTML(viewEvaluation.ratingLabel || '—')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-xl p-4 border" style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-color: #c4b5fd;">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="rounded-lg p-2" style="background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%);">
                                    <i class="fas fa-map-marker-alt text-white"></i>
                                </div>
                                <div>
                                    <label class="text-xs font-semibold uppercase" style="color: #5b21b6;">الموقع/المعدة</label>
                                    <p class="text-base font-bold mt-1" style="color: #1c1917;">${Utils.escapeHTML(inspection.location || inspection.equipment || '-')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-xl p-4 border" style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-color: #fdba74;">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="rounded-lg p-2" style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);">
                                    <i class="fas fa-user-check text-white"></i>
                                </div>
                                <div>
                                    <label class="text-xs font-semibold uppercase" style="color: #9a3412;">المفتش</label>
                                    <p class="text-base font-bold mt-1" style="color: #1c1917;">${Utils.escapeHTML(inspection.inspector || '-')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-xl p-4 border" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-color: #93c5fd;">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="rounded-lg p-2" style="background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);">
                                    <i class="fas fa-calendar-alt text-white"></i>
                                </div>
                                <div>
                                    <label class="text-xs font-semibold uppercase" style="color: #1e40af;">تاريخ الفحص</label>
                                    <p class="text-base font-bold mt-1" style="color: #1c1917;">${inspection.inspectionDate ? Utils.formatDate(inspection.inspectionDate) : '-'}</p>
                                </div>
                            </div>
                        </div>
                        ${inspection.assetCode ? `
                            <div class="rounded-xl p-4 border" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-color: #cbd5e1;">
                                <div class="flex items-center gap-3 mb-2">
                                    <div class="rounded-lg p-2" style="background: linear-gradient(135deg, #475569 0%, #334155 100%);">
                                        <i class="fas fa-barcode text-white"></i>
                                    </div>
                                    <div>
                                        <label class="text-xs font-semibold uppercase" style="color: #475569;">رقم/كود المعدة</label>
                                        <p class="text-base font-bold mt-1" style="color: #1c1917;">${Utils.escapeHTML(inspection.assetCode)}</p>
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    ${checklistHtml}
                    ${inspection.notes ? `
                        <div class="border-t pt-6">
                            <div class="rounded-xl p-4 border" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-color: #e2e8f0;">
                                <div class="flex items-start gap-3">
                                    <div class="rounded-lg p-2" style="background: linear-gradient(135deg, #64748b 0%, #475569 100%);">
                                        <i class="fas fa-sticky-note text-white"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="text-base font-bold mb-2" style="color: #1e293b;">ملاحظات عامة</h4>
                                        <p class="text-sm leading-relaxed" style="color: #475569;">${Utils.escapeHTML(inspection.notes)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                    ${inspection.correctiveActions ? `
                        <div class="border-t pt-6">
                            <div class="rounded-xl p-4 border" style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-color: #fca5a5;">
                                <div class="flex items-start gap-3">
                                    <div class="rounded-lg p-2" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);">
                                        <i class="fas fa-tools text-white"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="text-base font-bold mb-2" style="color: #1e293b;">الإجراءات التصحيحية المطلوبة</h4>
                                        <p class="text-sm leading-relaxed" style="color: #475569;">${Utils.escapeHTML(inspection.correctiveActions)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="modal-footer" style="background: linear-gradient(180deg, #f5f5f4 0%, #e7e5e4 100%); border-top: 1px solid #d6d3d1;">
                    <div class="flex flex-wrap justify-center items-center gap-3 w-full">
                        <button type="button" class="px-4 py-2.5 rounded-xl font-semibold transition-all border" style="background: #fafaf9; border-color: #d6d3d1; color: #57534e;" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times ml-2"></i>
                            إغلاق
                        </button>
                        ${typeof EmailDispatch !== 'undefined' ? EmailDispatch.renderFooterButtonHtml('periodic-inspections') : ''}
                        <button type="button" class="px-4 py-2.5 rounded-xl font-semibold transition-all text-white" style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); border: 1px solid #1e293b;" onclick="PeriodicInspections.printInspectionById(${JSON.stringify(String(id || ''))});">
                            <i class="fas fa-print ml-2"></i>
                            طباعة
                        </button>
                        <button type="button" class="px-4 py-2.5 rounded-xl font-semibold transition-all text-white" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border: 1px solid #991b1b;" onclick="PeriodicInspections.exportInspectionById(${JSON.stringify(String(id || ''))});">
                            <i class="fas fa-file-pdf ml-2"></i>
                            تحميل PDF
                        </button>
                        <button type="button" class="px-4 py-2.5 rounded-xl font-semibold transition-all text-white" style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); border: 1px solid #1e40af;" onclick="PeriodicInspections.editInspection(${JSON.stringify(String(id || ''))}); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-edit ml-2"></i>
                            تعديل الفحص
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        if (typeof EmailDispatch !== 'undefined') {
            EmailDispatch.bindFooterButtons(modal, { moduleKey: 'periodic-inspections', record: inspection, recordId: inspection.id || inspection.isoCode || '' });
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    _buildPeriodicInspectionFileName({ category, dateValue, ext = 'pdf' } = {}) {
        const safeCategory = this._sanitizeFileNamePart(category || 'فحص').replace(/\s+/g, '_');
        const safeDate = String(dateValue || '').slice(0, 10) || new Date().toISOString().slice(0, 10);
        const safeExt = String(ext || 'pdf').replace('.', '').toLowerCase();
        return `تقرير_فحص_دوري_${safeCategory}_${safeDate}.${safeExt}`;
    },

    parseInspectionRecordForExport(inspection) {
        if (!inspection || typeof inspection !== 'object') return null;
        const checklistItems = this.resolveInspectionChecklistItems(inspection);
        return {
            category: inspection.category || '',
            inspectionDate: inspection.inspectionDate || '',
            location: inspection.location || inspection.equipment || '',
            inspector: inspection.inspector || '',
            result: inspection.result || '',
            complianceScore: inspection.complianceScore != null ? Number(inspection.complianceScore) : null,
            assetCode: inspection.assetCode || '',
            factoryName: inspection.factoryName || '',
            subLocationName: inspection.subLocationName || '',
            notes: inspection.notes || '',
            correctiveActions: inspection.correctiveActions || '',
            checklistItems
        };
    },

    _normalizeChecklistComplianceStatus(value) {
        const raw = String(value || '').trim().replace(/\s+/g, ' ');
        if (!raw) return '';
        if (raw === 'مطابق' || (raw.includes('مطابق') && !raw.includes('غير') && !raw.includes('جزئ'))) return 'مطابق';
        if (raw === 'غير مطابق' || raw.includes('غير مطابق')) return 'غير مطابق';
        if (raw === 'أخرى') return 'أخرى';
        if (/^compliant$/i.test(raw) || /^pass$/i.test(raw)) return 'مطابق';
        if (/^non[- ]?compliant$/i.test(raw) || /^fail$/i.test(raw)) return 'غير مطابق';
        return raw;
    },

    _resolveChecklistResultMatch(checklistResults, templateItem, index) {
        if (!Array.isArray(checklistResults) || checklistResults.length === 0) return {};
        const templateId = templateItem?.id != null ? String(templateItem.id) : '';
        if (templateId) {
            const byId = checklistResults.find((r) => {
                const resultId = r?.id ?? r?.itemId ?? r?.checklistId;
                return resultId != null && String(resultId) === templateId;
            });
            if (byId) return byId;
        }
        const byIndex = checklistResults[index];
        if (byIndex) {
            if (!templateItem?.label || !byIndex.label || String(byIndex.label).trim() === String(templateItem.label).trim()) {
                return byIndex;
            }
        }
        if (templateItem?.label) {
            const byLabel = checklistResults.find((r) => String(r?.label || '').trim() === String(templateItem.label).trim());
            if (byLabel) return byLabel;
        }
        return byIndex || {};
    },

    _mapChecklistItemForExport(templateItem, result, index) {
        const status = this._normalizeChecklistComplianceStatus(
            result?.status || result?.complianceStatus || result?.compliance || ''
        );
        const hasCheckedValue = result && Object.prototype.hasOwnProperty.call(result, 'checked');
        const checked = hasCheckedValue ? !!result.checked : status === 'مطابق';
        return {
            number: index + 1,
            label: templateItem?.label || result?.label || '',
            checked,
            status,
            note: String(result?.note || result?.notes || '').trim(),
            required: !!(templateItem?.required ?? result?.required)
        };
    },

    resolveInspectionChecklistItems(inspection) {
        if (!inspection || typeof inspection !== 'object') return [];
        let checklistResults = inspection.checklistResults;
        if (checklistResults && typeof checklistResults === 'string') {
            try { checklistResults = JSON.parse(checklistResults); } catch (_e) { checklistResults = []; }
        }
        if (!Array.isArray(checklistResults)) checklistResults = [];

        const templateId = inspection.templateId || inspection.template || '';
        const template = templateId ? this.INSPECTION_TEMPLATES[templateId] : null;
        if (template && Array.isArray(template.checklist) && template.checklist.length) {
            return template.checklist.map((item, index) => {
                const result = this._resolveChecklistResultMatch(checklistResults, item, index);
                return this._mapChecklistItemForExport(item, result, index);
            });
        }

        return checklistResults.map((r, index) => this._mapChecklistItemForExport(null, r, index));
    },

    collectChecklistItemsFromForm(template) {
        const templateId = document.getElementById('inspection-template')?.value || this.state?.selectedTemplate || '';
        const resolvedTemplate = template || (templateId ? this.INSPECTION_TEMPLATES[templateId] : null);

        if (resolvedTemplate && Array.isArray(resolvedTemplate.checklist) && resolvedTemplate.checklist.length) {
            return resolvedTemplate.checklist.map((item, index) => {
                const checkbox = document.getElementById(`checklist-${item.id}`);
                const statusSelect = document.getElementById(`checklist-status-${item.id}`);
                const noteTextarea = document.getElementById(`checklist-note-${item.id}`);
                return {
                    number: index + 1,
                    label: item.label,
                    checked: checkbox ? checkbox.checked : false,
                    status: this._normalizeChecklistComplianceStatus(statusSelect ? statusSelect.value : ''),
                    note: noteTextarea ? noteTextarea.value.trim() : '',
                    required: item.required
                };
            });
        }

        const items = [];
        const statusSelects = document.querySelectorAll('[id^="checklist-status-"]');
        statusSelects.forEach((statusSelect, index) => {
            const itemId = statusSelect.id.replace('checklist-status-', '');
            const checkbox = document.getElementById(`checklist-${itemId}`);
            const noteTextarea = document.getElementById(`checklist-note-${itemId}`);
            const labelEl = document.querySelector(`label[for="checklist-${itemId}"]`);
            let label = '';
            if (labelEl) {
                label = String(labelEl.textContent || '')
                    .replace(/^\s*\d+\.\s*/, '')
                    .replace(/\*+\s*مطلوب\s*$/g, '')
                    .trim();
            }
            items.push({
                number: index + 1,
                label,
                checked: checkbox ? checkbox.checked : false,
                status: this._normalizeChecklistComplianceStatus(statusSelect ? statusSelect.value : ''),
                note: noteTextarea ? noteTextarea.value.trim() : '',
                required: labelEl ? /مطلوب/.test(labelEl.textContent || '') : false
            });
        });
        return items;
    },

    collectInspectionFormData() {
        const form = document.getElementById('periodic-inspection-form');
        if (!form) return null;

        const templateId = document.getElementById('inspection-template')?.value || this.state?.selectedTemplate || '';
        const template = templateId ? this.INSPECTION_TEMPLATES[templateId] : null;
        const category = document.getElementById('inspection-category')?.value || '';
        const inspectionDate = document.getElementById('inspection-date')?.value || '';
        const location = document.getElementById('inspection-location')?.value || '';
        const inspector = document.getElementById('inspection-inspector')?.value || '';
        const result = document.getElementById('inspection-result')?.value || '';
        const complianceScore = Number(document.getElementById('inspection-compliance-score')?.value || 0);
        const assetCode = document.getElementById('inspection-asset-code')?.value || '';
        const factoryId = document.getElementById('inspection-factory')?.value || '';
        const subLocationId = document.getElementById('inspection-sub-location')?.value || '';
        const sites = this.getSiteOptions();
        const selectedSite = sites.find(s => s.id === factoryId);
        const places = this.getPlaceOptions(factoryId);
        const selectedPlace = places.find(p => p.id === subLocationId);
        const factoryName = selectedSite ? selectedSite.name : '';
        const subLocationName = selectedPlace ? selectedPlace.name : '';
        const notes = document.getElementById('inspection-notes')?.value || '';
        const correctiveActions = document.getElementById('inspection-corrective-actions')?.value || '';
        const checklistItems = this.collectChecklistItemsFromForm(template);

        return {
            category,
            inspectionDate,
            location,
            inspector,
            result,
            complianceScore,
            assetCode,
            factoryName,
            subLocationName,
            notes,
            correctiveActions,
            checklistItems,
            templateId
        };
    },

    _formatChecklistInspectedMark(item) {
        const status = this._normalizeChecklistComplianceStatus(item?.status);
        if (status === 'مطابق') {
            return '<span style="color: #16a34a; font-weight: bold; font-size: 16px; font-family: Arial, Tahoma, sans-serif;">✓</span>';
        }
        if (status === 'غير مطابق') {
            return '<span style="color: #dc2626; font-weight: bold; font-size: 16px; font-family: Arial, Tahoma, sans-serif;">✗</span>';
        }
        if (item?.checked === true) {
            return '<span style="color: #16a34a; font-weight: bold; font-size: 16px; font-family: Arial, Tahoma, sans-serif;">✓</span>';
        }
        if (item?.checked === false) {
            return '<span style="color: #dc2626; font-weight: bold; font-size: 16px; font-family: Arial, Tahoma, sans-serif;">✗</span>';
        }
        return '<span style="color: #64748b;">-</span>';
    },

    buildPeriodicInspectionPrintContent(data) {
        const checklistItems = Array.isArray(data?.checklistItems) ? data.checklistItems : [];
        const printEvaluation = data?.complianceScore != null && data.complianceScore !== ''
            ? { complianceRate: Number(data.complianceScore), ratingLabel: this.getComplianceRateLabel(Number(data.complianceScore)) }
            : this.calculateChecklistEvaluationFromItems(checklistItems);
        const scoreColor = this.getComplianceRateColor(printEvaluation.complianceRate || 0);
        const checklistRows = checklistItems.map(item => `
            <tr>
                <td style="text-align: center; padding: 8px; border: 1px solid #ddd;">${item.number}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${Utils.escapeHTML(item.label)} ${item.required ? '<span style="color: red;">*</span>' : ''}</td>
                <td style="text-align: center; padding: 8px; border: 1px solid #ddd;">${this._formatChecklistInspectedMark(item)}</td>
                <td style="text-align: center; padding: 8px; border: 1px solid #ddd; ${item.status === 'مطابق' ? 'color: green; font-weight: bold;' : item.status === 'غير مطابق' ? 'color: red; font-weight: bold;' : item.status === 'أخرى' ? 'color: orange; font-weight: bold;' : ''}">${Utils.escapeHTML(item.status) || '-'}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${Utils.escapeHTML(item.note) || '-'}</td>
            </tr>
        `).join('');

        return `
            <style>
                .pi-print-report { direction: rtl; unicode-bidi: embed; }
                .pi-print-report .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
                .pi-print-report .info-item { padding: 10px; background: #fffbeb; border-right: 3px solid #d97706; border-radius: 5px; }
                .pi-print-report .info-label { font-weight: bold; color: #92400e; font-size: 12px; margin-bottom: 4px; }
                .pi-print-report .info-value { color: #1e293b; font-size: 14px; }
                .pi-print-report table { width: 100%; border-collapse: collapse; margin-top: 16px; table-layout: auto; }
                .pi-print-report th {
                    background: linear-gradient(135deg, #1e3a5f, #0f172a);
                    color: #fef3c7;
                    padding: 10px 8px;
                    text-align: center;
                    font-weight: bold;
                    font-size: 12px;
                    white-space: nowrap;
                    word-break: normal;
                    overflow-wrap: normal;
                    hyphens: none;
                    letter-spacing: 0;
                    direction: rtl;
                    unicode-bidi: plaintext;
                }
                .pi-print-report td {
                    padding: 8px;
                    border: 1px solid #ddd;
                    font-size: 12px;
                    word-break: normal;
                    overflow-wrap: normal;
                    hyphens: none;
                    direction: rtl;
                    unicode-bidi: plaintext;
                    vertical-align: top;
                }
                .pi-print-report .info-label,
                .pi-print-report .info-value,
                .pi-print-report .notes-title,
                .pi-print-report h3,
                .pi-print-report p {
                    word-break: normal;
                    overflow-wrap: normal;
                    hyphens: none;
                    letter-spacing: 0;
                    direction: rtl;
                    unicode-bidi: plaintext;
                }
                .pi-print-report .notes-section { margin-top: 16px; padding: 12px; background: #fafaf9; border-radius: 8px; border: 1px solid #e7e5e4; }
                .pi-print-report .notes-title { font-weight: bold; color: #1e3a5f; margin-bottom: 8px; }
            </style>
            <div class="pi-print-report">
                <div class="info-grid">
                    <div class="info-item"><div class="info-label">نوع الفحص</div><div class="info-value">${Utils.escapeHTML(data.category || '')}</div></div>
                    <div class="info-item"><div class="info-label">تاريخ الفحص</div><div class="info-value">${data.inspectionDate || '-'}</div></div>
                    <div class="info-item"><div class="info-label">الموقع/المعدة</div><div class="info-value">${Utils.escapeHTML(data.location || '')}</div></div>
                    <div class="info-item"><div class="info-label">المفتش</div><div class="info-value">${Utils.escapeHTML(data.inspector || '')}</div></div>
                    <div class="info-item"><div class="info-label">النتيجة</div><div class="info-value">${Utils.escapeHTML(data.result || '')}</div></div>
                    <div class="info-item"><div class="info-label">نسبة المطابقة</div><div class="info-value" style="color: ${scoreColor}; font-weight: bold;">${printEvaluation.complianceRate || 0}% — ${Utils.escapeHTML(printEvaluation.ratingLabel || '—')}</div></div>
                    ${data.factoryName ? `<div class="info-item"><div class="info-label">المصنع</div><div class="info-value">${Utils.escapeHTML(data.factoryName)}</div></div>` : ''}
                    ${data.subLocationName ? `<div class="info-item"><div class="info-label">الموقع الفرعي</div><div class="info-value">${Utils.escapeHTML(data.subLocationName)}</div></div>` : ''}
                    ${data.assetCode ? `<div class="info-item"><div class="info-label">رقم المعدة/الكود</div><div class="info-value">${Utils.escapeHTML(data.assetCode)}</div></div>` : ''}
                </div>
                ${checklistItems.length ? `
                <h3 style="margin: 14px 0 8px; color: #1e3a5f; font-size: 14px; font-weight: bold;">قائمة الفحص (${checklistItems.length} بند)</h3>
                <table><thead><tr><th style="width: 40px;">#</th><th style="min-width: 140px;">عنصر الفحص</th><th style="min-width: 88px;">تم الفحص</th><th style="min-width: 108px;">حالة المطابقة</th><th style="min-width: 90px;">ملاحظات</th></tr></thead><tbody>${checklistRows}</tbody></table>
                ` : ''}
                ${data.notes || data.correctiveActions ? `<div class="notes-section">${data.notes ? `<div class="notes-title">ملاحظات عامة:</div><p style="margin: 0 0 12px 0; line-height: 1.6;">${Utils.escapeHTML(data.notes)}</p>` : ''}${data.correctiveActions ? `<div class="notes-title">الإجراءات التصحيحية المطلوبة:</div><p style="margin: 0; line-height: 1.6;">${Utils.escapeHTML(data.correctiveActions)}</p>` : ''}</div>` : ''}
            </div>
        `;
    },

    buildPeriodicInspectionPdfHtml(data, options = {}) {
        const inspectionDate = data?.inspectionDate || '';
        const formCode = options.formCode || `PINSP-${(inspectionDate || new Date().toISOString().slice(0, 10)).replace(/-/g, '')}-${Date.now().toString().slice(-6)}`;
        const formTitle = `تقرير فحص دوري - ${Utils.escapeHTML(data?.category || '')}`;
        const content = this.buildPeriodicInspectionPrintContent(data);
        const createdAt = options.createdAt || new Date().toISOString();
        const updatedAt = options.updatedAt || createdAt;

        if (typeof FormHeader !== 'undefined' && typeof FormHeader.generatePDFHTML === 'function') {
            return FormHeader.generatePDFHTML(
                formCode,
                formTitle,
                content,
                false,
                false,
                {
                    source: 'PeriodicInspection',
                    titleEn: 'Periodic Inspection Report',
                    titleAr: 'تقرير فحص دوري',
                    version: '1.0',
                    includeQRCode: false,
                    compactPdfFooter: true
                },
                createdAt,
                updatedAt
            );
        }

        return `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${formTitle}</title></head><body style="font-family:Arial,Tahoma,sans-serif;direction:rtl;padding:20px;">${content}</body></html>`;
    },

    preparePeriodicInspectionPdfHtmlContent(htmlContent) {
        const overrideStyle = `
            <style id="pi-pdf-export-overrides">
                @page { size: A4 portrait !important; margin: 6mm !important; }
                html, body {
                    min-height: auto !important;
                    height: auto !important;
                    background: #ffffff !important;
                }
                body {
                    display: block !important;
                    line-height: 1.35 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif !important;
                }
                .report-wrapper {
                    min-height: auto !important;
                    height: auto !important;
                    display: block !important;
                    box-shadow: none !important;
                    border-radius: 0 !important;
                    padding: 10px !important;
                }
                .report-body {
                    flex: none !important;
                    min-height: auto !important;
                }
                .report-footer {
                    margin-top: 8px !important;
                    padding-top: 2px !important;
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                }
                .pdf-compact-footer .footer-watermark-frame {
                    padding: 5px 8px !important;
                    margin-top: 2px !important;
                    border-radius: 6px !important;
                    border-width: 1px !important;
                }
                .pdf-compact-footer .footer-bottom {
                    gap: 3px !important;
                }
                .pdf-compact-footer .footer-meta-line {
                    gap: 4px !important;
                    padding: 2px 0 !important;
                    margin-top: 2px !important;
                    font-size: 9px !important;
                }
                .pdf-compact-footer .footer-meta-item {
                    font-size: 9px !important;
                    padding: 1px 2px !important;
                    line-height: 1.3 !important;
                }
                .pdf-compact-footer .footer-bottom-text {
                    font-size: 9px !important;
                    gap: 1px !important;
                    line-height: 1.35 !important;
                }
                .pdf-compact-footer .report-header {
                    grid-template-columns: minmax(240px, 1.45fr) minmax(300px, 1.85fr) minmax(88px, 112px) !important;
                    gap: 14px !important;
                }
                .pdf-compact-footer .report-header .company-brand .company-name,
                .pdf-compact-footer .report-header .company-brand .company-name-secondary {
                    white-space: nowrap !important;
                    word-break: keep-all !important;
                    overflow-wrap: normal !important;
                    hyphens: none !important;
                    direction: rtl !important;
                    unicode-bidi: plaintext !important;
                    line-height: 1.35 !important;
                    letter-spacing: 0 !important;
                }
                .pdf-compact-footer .footer-bottom-text span {
                    word-break: normal !important;
                    overflow-wrap: normal !important;
                    hyphens: none !important;
                    direction: rtl !important;
                    unicode-bidi: plaintext !important;
                    white-space: normal !important;
                    letter-spacing: 0 !important;
                }
                .pi-print-report table {
                    page-break-inside: auto !important;
                }
                .pi-print-report tr {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                }
                .pi-print-report th,
                .pi-print-report td,
                .pi-print-report .info-label,
                .pi-print-report .info-value,
                .pi-print-report .notes-title,
                .pi-print-report h3,
                .pi-print-report p {
                    word-break: normal !important;
                    overflow-wrap: normal !important;
                    hyphens: none !important;
                    direction: rtl !important;
                    unicode-bidi: plaintext !important;
                    letter-spacing: 0 !important;
                }
                .pi-print-report th {
                    white-space: nowrap !important;
                }
            </style>
        `;

        if (/<\/head>/i.test(htmlContent)) {
            return htmlContent.replace(/<\/head>/i, `${overrideStyle}</head>`);
        }
        return `${overrideStyle}${htmlContent}`;
    },

    async downloadPeriodicInspectionPdf(data, options = {}) {
        if (!data) return false;
        if (typeof Loading !== 'undefined' && Loading.show) {
            Loading.show('جاري إعداد ملف PDF...');
        }
        try {
            const rawHtmlContent = this.buildPeriodicInspectionPdfHtml(data, options);
            const htmlContent = this.preparePeriodicInspectionPdfHtmlContent(rawHtmlContent);
            const fileName = this._buildPeriodicInspectionFileName({
                category: data.category,
                dateValue: data.inspectionDate
            });
            return await this.exportDailySafetyHtmlToPdf({
                htmlContent,
                fileName,
                orientation: 'p',
                forceSinglePage: false
            });
        } finally {
            if (typeof Loading !== 'undefined' && Loading.hide) Loading.hide();
        }
    },

    printInspectionById(id) {
        const inspection = (AppState.appData.periodicInspections || []).find(i => i.id === id);
        if (!inspection) {
            Notification.warning('الفحص المطلوب غير موجود');
            return;
        }
        this._printOrExportInspection(inspection, 'print');
    },

    exportInspectionById(id) {
        const inspection = (AppState.appData.periodicInspections || []).find(i => i.id === id);
        if (!inspection) {
            Notification.warning('الفحص المطلوب غير موجود');
            return;
        }
        this._printOrExportInspection(inspection, 'export');
    },

    _printOrExportInspection(inspection, mode) {
        const data = this.parseInspectionRecordForExport(inspection);
        if (!data) {
            Notification.warning('تعذر تجهيز بيانات الفحص');
            return;
        }

        if (mode === 'export') {
            this.downloadPeriodicInspectionPdf(data, {
                createdAt: inspection.createdAt,
                updatedAt: inspection.updatedAt,
                formCode: inspection.isoCode || inspection.id
            }).then((ok) => {
                if (ok) Notification.success('تم تحميل تقرير الفحص PDF بنجاح');
            });
            return;
        }

        const formCode = inspection.isoCode || inspection.id || `PINSP-${(data.inspectionDate || new Date().toISOString().slice(0, 10)).replace(/-/g, '')}-${Date.now().toString().slice(-6)}`;
        const formTitle = `تقرير فحص دوري - ${Utils.escapeHTML(data.category)}`;
        const htmlContent = this.buildPeriodicInspectionPdfHtml(data, {
            formCode,
            createdAt: inspection.createdAt || new Date().toISOString(),
            updatedAt: inspection.updatedAt || inspection.createdAt || new Date().toISOString()
        });
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
            printWindow.onload = () => {
                setTimeout(() => {
                    printWindow.print();
                    setTimeout(() => URL.revokeObjectURL(url), 500);
                }, 300);
            };
        } else {
            Notification.error('يرجى السماح للنوافذ المنبثقة لعرض التقرير');
        }
    },

    async editInspection(id) {
        const inspection = (AppState.appData.periodicInspections || []).find(i => i.id === id);
        if (inspection) {
            await this.showFormModal(id);
        } else {
            Notification.error('الفحص المطلوب غير موجود');
        }
    },

    async deleteInspection(id) {
        if (!confirm('هل أنت متأكد من حذف هذا الفحص الدوري؟')) return;

        const inspections = AppState.appData.periodicInspections || [];
        const index = inspections.findIndex(i => i.id === id);
        if (index !== -1) {
            inspections.splice(index, 1);
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }
            Notification.success('تم حذف الفحص الدوري بنجاح');
            this.load();
        }
    },

    printInspection() {
        const data = this.collectInspectionFormData();
        if (!data) {
            Notification.warning('لا يمكن طباعة النموذج قبل ملء البيانات');
            return;
        }

        const htmlContent = this.buildPeriodicInspectionPdfHtml(data);
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');

        if (printWindow) {
            printWindow.onload = () => {
                setTimeout(() => {
                    printWindow.print();
                    setTimeout(() => URL.revokeObjectURL(url), 500);
                }, 300);
            };
        } else {
            Notification.error('يرجى السماح للنوافذ المنبثقة لعرض التقرير');
        }
    },

    async exportInspection() {
        const data = this.collectInspectionFormData();
        if (!data) {
            Notification.warning('لا يمكن تصدير النموذج قبل ملء البيانات');
            return;
        }
        const ok = await this.downloadPeriodicInspectionPdf(data);
        if (ok) Notification.success('تم تحميل تقرير الفحص PDF بنجاح');
    },

    // ========== Daily Safety Check List (قائمة المرور اليومي للسلامة) ==========
    _getDailySafetyCompactFooterStyle() {
        return `
            <style>
                @page { size: A4 portrait !important; margin: 10mm 8mm !important; }
                html, body { min-height: 100% !important; }
                body { display: flex !important; flex-direction: column !important; }
                .report-wrapper {
                    padding-bottom: 10px !important;
                    flex: 1 0 auto !important;
                    display: flex !important;
                    flex-direction: column !important;
                    min-height: 100vh !important;
                    min-height: 100dvh !important;
                }
                .report-body { flex: 1 1 auto !important; min-height: 0 !important; }
                .report-footer { margin-top: auto !important; padding-top: 6px !important; font-size: 9px !important; }
                .footer-watermark-frame { padding: 5px 8px !important; margin-top: 2px !important; border-radius: 7px !important; border-width: 1px !important; }
                .footer-bottom { gap: 2px !important; }
                .footer-bottom-qr { width: 52px !important; height: 52px !important; border-radius: 6px !important; }
                .footer-meta-line { gap: 4px !important; padding: 2px 0 !important; margin-top: 1px !important; font-size: 9px !important; }
                .footer-meta-item { padding: 1px 2px !important; font-size: 9px !important; line-height: 1.2 !important; }
                .footer-bottom-text { gap: 0 !important; font-size: 9px !important; line-height: 1.2 !important; }
            </style>
        `;
    },

    getDailySafetyCheckListRecords() {
        if (!AppState.appData.dailySafetyCheckList) AppState.appData.dailySafetyCheckList = [];
        return AppState.appData.dailySafetyCheckList;
    },

    /**
     * ✅ تحميل بيانات قائمة المرور اليومي للسلامة عند الطلب — مستقل تماماً
     * عن loadInspectionDataAsync (الذي يُحجب بحارس 3 ثوانٍ skipBg ويأتي بعد
     * getAllPeriodicInspections). هذا يضمن تحميل بيانات DSC دائماً عند فتح
     * التبويب، حتى لو كانت البيانات المحلية مبتورة (heavy-key truncation) أو
     * تخطّى التحميل الخلفي بسبب الحارس الزمني.
     *
     * - يُعيد القيمة الحالية فوراً إذا كانت محمَّلة سابقاً (ما لم يُطلب force).
     * - يمنع الطلبات المتزامنة المكررة عبر _dscDataLoadPromise.
     */
     async ensureDailySafetyDataLoaded(force = false, staleMs = 60000) {
        // طلب جارٍ بالفعل — أعِد نفس الوعد
        if (this._dscDataLoadPromise) return this._dscDataLoadPromise;

        const arr = AppState.appData.dailySafetyCheckList;
        const alreadyLoaded = Array.isArray(arr) && this._dscDataLoadedOnce === true;
        const lastAttempt = this._dscLastAttemptAt || 0;
        const freshEnough = (Date.now() - lastAttempt) < staleMs;
        // البيانات محمَّلة ولم تنتهِ صلاحيتها — نعيدها فوراً.
        // الانتهاء من المدة (TTL) يسمح بإعادة الجلب لظهور السجلات الجديدة تلقائياً.
        if (alreadyLoaded && !force && freshEnough) return true;

        // الخادم غير مهيأ — نكتفي بالبيانات المحلية
        if (typeof GoogleIntegration === 'undefined' || typeof GoogleIntegration.readFromSheets !== 'function') {
            if (!Array.isArray(AppState.appData.dailySafetyCheckList)) AppState.appData.dailySafetyCheckList = [];
            return false;
        }

        this._dscLastAttemptAt = Date.now();
        this._dscDataLoadPromise = (async () => {
            try {
                // مزامنة فورم → ورقة التطبيق قبل القراءة (أفضل جهد، تخطى لو not admin/غير متاح)
                try {
                    if (typeof GoogleIntegration !== 'undefined' && typeof GoogleIntegration.sendRequest === 'function') {
                        const user = AppState.currentUser || {};
                        if (user.email || user.id) {
                            await GoogleIntegration.sendRequest({
                                action: 'syncDailySafetyFormData',
                                data: { userData: user }
                            }).catch(() => null);
                        }
                    }
                } catch (_syncErr) { /* fغير حرج — البيانات تُقرأ من الورقة مهما كانت حالة المزامنة */ }

                const dscData = await GoogleIntegration.readFromSheets('DailySafetyCheckList', 20000);
                if (Array.isArray(dscData)) {
                    AppState.appData.dailySafetyCheckList = dscData;
                    this._dscDataLoadedOnce = true;
                    if (typeof DataManager !== 'undefined' && DataManager.save) {
                        try { DataManager.save(); } catch (e) { /* ignore */ }
                    }
                    if (typeof Utils !== 'undefined' && Utils.safeLog) {
                        Utils.safeLog('✅ [DSC] تم تحميل قائمة المرور اليومي: ' + dscData.length + ' سجل');
                    }
                    return true;
                }
                // النتيجة ليست مصفوفة (timeout/خطأ) — لا نمسح البيانات الحالية
                if (!Array.isArray(AppState.appData.dailySafetyCheckList)) {
                    AppState.appData.dailySafetyCheckList = [];
                }
                return false;
            } catch (e) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ [DSC] تعذّر تحميل قائمة المرور اليومي:', e);
                }
                if (!Array.isArray(AppState.appData.dailySafetyCheckList)) {
                    AppState.appData.dailySafetyCheckList = [];
                }
                return false;
            } finally {
                this._dscDataLoadPromise = null;
            }
        })();
        return this._dscDataLoadPromise;
    },

    getSafetyTeamMembersForCheckList() {
        try {
            const settingsTeam = AppState.companySettings?.safetyTeam || AppState.companySettings?.safetyTeamMembers;
            if (Array.isArray(settingsTeam) && settingsTeam.length > 0) {
                return settingsTeam.map(m => (typeof m === 'string' ? { id: m, name: m } : { id: m.id || m.name, name: m.name || m }));
            }
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                return GoogleIntegration.sendRequest({ action: 'getSafetyTeamMembers', data: {} })
                    .then(result => (result && Array.isArray(result.data) ? result.data.map(m => ({ id: m.id || m.name, name: m.name || m })) : []))
                    .catch(() => []);
            }
            return [];
        } catch (e) {
            Utils.safeWarn('⚠️ getSafetyTeamMembersForCheckList:', e);
            return [];
        }
    },

    _getDailySafetyActiveFilterChips(f, filterOptions, t) {
        const chips = [];
        const tf = (key, fallback) => (typeof t === 'function' ? t(key, fallback) : fallback);
        if (f.search && String(f.search).trim()) {
            chips.push({ key: 'search', label: String(f.search).trim(), icon: 'fa-search' });
        }
        if (f.siteId) {
            const site = (filterOptions.sites || []).find((s) => String(s.id) === String(f.siteId));
            chips.push({ key: 'siteId', label: site?.name || f.siteId, icon: 'fa-industry' });
        }
        if (f.inspectorName) {
            chips.push({ key: 'inspectorName', label: f.inspectorName, icon: 'fa-user-hard-hat' });
        }
        if (f.shift) {
            chips.push({ key: 'shift', label: this._formatDailyShiftLabel(f.shift), icon: 'fa-layer-group' });
        }
        if (f.dateFrom) {
            chips.push({ key: 'dateFrom', label: `${tf('module.periodic.fromDate', 'من')}: ${f.dateFrom}`, icon: 'fa-calendar-alt' });
        }
        if (f.dateTo) {
            chips.push({ key: 'dateTo', label: `${tf('module.periodic.toDate', 'إلى')}: ${f.dateTo}`, icon: 'fa-calendar-alt' });
        }
        return chips;
    },

    _clearDailySafetyFilterKey(key) {
        const defaults = { search: '', siteId: '', inspectorName: '', shift: '', dateFrom: '', dateTo: '' };
        if (!Object.prototype.hasOwnProperty.call(defaults, key)) return;
        this.state.dailySafetyFilters[key] = defaults[key];
        if (key === 'dateFrom' || key === 'dateTo') this._dscPeriod = '0';
    },

    getDailySafetyCheckListStats(records) {
        const list = records || this.getDailySafetyCheckListRecords();
        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const total = list.length;
        const thisMonth = list.filter(r => {
            const d = r.date ? new Date(r.date) : (r.createdAt ? new Date(r.createdAt) : null);
            return d && d >= thisMonthStart;
        }).length;
        const shift1 = list.filter(r => r.shift === 'الأولى').length;
        const shift2 = list.filter(r => r.shift === 'الثانية').length;
        const shift3 = list.filter(r => r.shift === 'الثالثة').length;
        return { total, thisMonth, shift1, shift2, shift3 };
    },

    async renderDailySafetyCheckListContent() {
        const records = this.getDailySafetyCheckListRecords();
        const filteredRecords = this.applyDailySafetyFilters(records);
        const stats = this.getDailySafetyCheckListStats(filteredRecords);
        const allStats = this.getDailySafetyCheckListStats(records);
        const filterOptions = this.getDailySafetyFilterOptions(records);
        const f = this.state.dailySafetyFilters || {};
        const t = (key, fallback) => this._t(key, fallback);
        const en = this._isEnglishUI();
        const dscDir = en ? 'ltr' : 'rtl';
        const dscAlign = en ? 'left' : 'right';
        const dscItems = en ? 'items-start' : 'items-end';
        const dscJustify = en ? 'flex-start' : 'flex-end';
        // حساب عدد الفلاتر النشطة
        const activeFilterCount = [f.search, f.siteId, f.inspectorName, f.shift, f.dateFrom, f.dateTo].filter(v => v && String(v).trim()).length;
        const filterChips = this._getDailySafetyActiveFilterChips(f, filterOptions, t);
        const filterPanelOpen = Boolean(this.state.dailySafetyFilterPanelOpen);
        const listPeriod = this._dscPeriod || '0';
        // نسبة تغطية كل وردية (لشريط التقدم)
        const totalForBar = stats.total || 1;
        const shift1Pct = Math.round((stats.shift1 / totalForBar) * 100);
        const shift2Pct = Math.round((stats.shift2 / totalForBar) * 100);
        const shift3Pct = Math.round((stats.shift3 / totalForBar) * 100);
        return `
            <style>
                /* ═══ Stats cards ═══════════════════════════════════════════════════ */
                .dsc-kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:1.25rem; }
                @media(max-width:900px){ .dsc-kpi-grid{ grid-template-columns:repeat(2,1fr); } }
                @media(max-width:520px){ .dsc-kpi-grid{ grid-template-columns:1fr; } }
                .dsc-kpi-card {
                    border-radius:14px; padding:1.1rem 1.2rem 0.9rem;
                    display:flex; flex-direction:column; gap:0.5rem;
                    background:#fff; box-shadow:0 2px 12px rgba(0,0,0,0.07);
                    border:1px solid transparent; transition:transform 0.15s, box-shadow 0.15s;
                    position:relative; overflow:hidden;
                }
                .dsc-kpi-card:hover{ transform:translateY(-2px); box-shadow:0 6px 24px rgba(0,0,0,0.11); }
                .dsc-kpi-card .kpi-accent-bar {
                    position:absolute; top:0; right:0; left:0; height:4px; border-radius:14px 14px 0 0;
                }
                .dsc-kpi-card .kpi-top { display:flex; align-items:center; justify-content:space-between; }
                .dsc-kpi-card .kpi-icon {
                    width:40px; height:40px; border-radius:10px;
                    display:flex; align-items:center; justify-content:center;
                    font-size:1.15rem; flex-shrink:0;
                }
                .dsc-kpi-card .kpi-badge {
                    font-size:0.7rem; font-weight:700; padding:0.15rem 0.5rem;
                    border-radius:999px; letter-spacing:0.3px;
                }
                .dsc-kpi-card .kpi-number {
                    font-size:2.4rem; font-weight:800; line-height:1; letter-spacing:-0.5px; margin:0.1rem 0;
                }
                .dsc-kpi-card .kpi-label { font-size:0.82rem; font-weight:600; }
                .dsc-kpi-card .kpi-sublabel { font-size:0.74rem; opacity:0.75; }
                .dsc-kpi-card .kpi-bar-wrap { height:4px; background:#f1f5f9; border-radius:999px; margin-top:0.3rem; overflow:hidden; }
                .dsc-kpi-card .kpi-bar-fill { height:100%; border-radius:999px; transition:width 0.6s ease; }
                /* ═══ Action bar ════════════════════════════════════════════════════ */
                .dsc-action-bar {
                    display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap;
                    gap:0.75rem; margin-bottom:1rem; padding:0.85rem 1rem;
                    background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
                    border-radius:12px; box-shadow:0 4px 15px rgba(37,99,235,0.25);
                }
                .dsc-action-bar .dsc-title-block h3 { margin:0; font-size:1.1rem; font-weight:700; color:#fff; }
                .dsc-action-bar .dsc-title-block p { margin:0; font-size:0.78rem; color:rgba(255,255,255,0.8); margin-top:2px; }
                .dsc-action-bar .dsc-action-btns { display:flex; gap:0.5rem; flex-wrap:wrap; }
                .dsc-btn-white {
                    background:#fff; border:none; color:#1e40af; padding:0.5rem 1rem;
                    border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;
                    display:inline-flex; align-items:center; gap:0.35rem;
                    transition:all 0.15s; box-shadow:0 2px 6px rgba(0,0,0,0.08);
                }
                .dsc-btn-white:hover { background:#eff6ff; transform:translateY(-1px); box-shadow:0 4px 10px rgba(0,0,0,0.12); }
                .dsc-btn-white-outline {
                    background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.6); color:#fff;
                    padding:0.5rem 1rem; border-radius:8px; font-weight:600; font-size:0.85rem; cursor:pointer;
                    display:inline-flex; align-items:center; gap:0.35rem; transition:all 0.15s;
                }
                .dsc-btn-white-outline:hover { background:rgba(255,255,255,0.28); }
                /* ═══ Compact filter strip ══════════════════════════════════════════ */
                .dsc-filter-strip {
                    display:flex; align-items:center; gap:0.55rem; flex-wrap:wrap;
                    margin-bottom:0.65rem; padding:0.45rem 0.65rem;
                    background:linear-gradient(180deg,#f8fafc 0%,#fff 100%);
                    border:1px solid #e2e8f0; border-radius:10px;
                    box-shadow:0 1px 4px rgba(15,23,42,0.04);
                }
                .dsc-filter-strip-search {
                    flex:1 1 220px; min-width:180px; max-width:420px;
                    display:flex; align-items:center; gap:0.45rem;
                    background:#fff; border:1.5px solid #e2e8f0; border-radius:8px;
                    padding:0.35rem 0.6rem; transition:border-color 0.15s, box-shadow 0.15s;
                }
                .dsc-filter-strip-search:focus-within {
                    border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,0.1);
                }
                .dsc-filter-strip-search i { color:#94a3b8; font-size:0.82rem; flex-shrink:0; }
                .dsc-filter-strip-search input {
                    flex:1; border:none; outline:none; background:transparent;
                    font-size:0.82rem; color:#1e293b; min-width:0;
                }
                .dsc-filter-strip-actions {
                    display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap; margin-${en ? 'left' : 'right'}:auto;
                }
                .dsc-filter-toggle-btn {
                    display:inline-flex; align-items:center; gap:0.35rem;
                    padding:0.38rem 0.72rem; border-radius:8px; cursor:pointer;
                    border:1.5px solid #cbd5e1; background:#fff; color:#334155;
                    font-size:0.78rem; font-weight:700; transition:all 0.15s;
                }
                .dsc-filter-toggle-btn:hover { border-color:#2563eb; color:#1d4ed8; background:#eff6ff; }
                .dsc-filter-toggle-btn.is-open { border-color:#2563eb; background:#eff6ff; color:#1d4ed8; }
                .dsc-filter-count-pill {
                    background:#dbeafe; color:#1e40af; font-size:0.68rem; font-weight:800;
                    padding:0.1rem 0.42rem; border-radius:999px; min-width:1.1rem; text-align:center;
                }
                .dsc-filter-result-pill {
                    font-size:0.72rem; font-weight:600; color:#64748b;
                    background:#f1f5f9; padding:0.28rem 0.55rem; border-radius:999px; white-space:nowrap;
                }
                .dsc-filter-chips {
                    display:flex; align-items:center; gap:0.35rem; flex-wrap:wrap;
                    margin:-0.25rem 0 0.55rem; min-height:0;
                }
                .dsc-filter-chip {
                    display:inline-flex; align-items:center; gap:0.3rem;
                    padding:0.2rem 0.45rem 0.2rem 0.55rem; border-radius:999px;
                    background:#eff6ff; border:1px solid #bfdbfe; color:#1e40af;
                    font-size:0.72rem; font-weight:600; max-width:220px;
                }
                .dsc-filter-chip span { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
                .dsc-filter-chip button {
                    border:none; background:transparent; color:#3b82f6; cursor:pointer;
                    padding:0; line-height:1; font-size:0.72rem; flex-shrink:0;
                }
                .dsc-filter-chip button:hover { color:#dc2626; }
                .dsc-filter-panel-compact {
                    background:#fff; border:1px solid #e2e8f0; border-radius:10px;
                    margin-bottom:0.75rem; overflow:hidden;
                    box-shadow:0 2px 10px rgba(15,23,42,0.05);
                    animation:dscFilterSlide 0.18s ease-out;
                }
                @keyframes dscFilterSlide {
                    from { opacity:0; transform:translateY(-4px); }
                    to { opacity:1; transform:translateY(0); }
                }
                .dsc-filter-panel-head {
                    display:flex; align-items:center; justify-content:space-between; gap:0.5rem;
                    padding:0.55rem 0.75rem; background:#f8fafc; border-bottom:1px solid #e2e8f0;
                }
                .dsc-filter-panel-head .fp-title {
                    font-size:0.78rem; font-weight:700; color:#334155;
                    display:flex; align-items:center; gap:0.35rem;
                }
                .dsc-filter-period-group { display:flex; gap:0.25rem; flex-wrap:wrap; }
                .dsc-filter-period-btn {
                    padding:0.28rem 0.55rem; border-radius:999px; border:1px solid #e2e8f0;
                    background:#fff; color:#64748b; font-size:0.7rem; font-weight:700;
                    cursor:pointer; transition:all 0.15s;
                }
                .dsc-filter-period-btn:hover { border-color:#93c5fd; color:#2563eb; }
                .dsc-filter-period-btn.is-active {
                    background:#2563eb; border-color:#2563eb; color:#fff;
                    box-shadow:0 2px 6px rgba(37,99,235,0.25);
                }
                .dsc-filter-grid {
                    display:grid; grid-template-columns:repeat(auto-fill,minmax(155px,1fr));
                    gap:0.55rem; padding:0.65rem 0.75rem 0.75rem;
                }
                .dsc-filter-grid .dsc-field label {
                    font-size:0.7rem; font-weight:700; color:#64748b;
                    margin-bottom:0.2rem; display:flex; align-items:center; gap:0.25rem;
                }
                .dsc-filter-grid .dsc-field label i { font-size:0.68rem; }
                .dsc-filter-grid .dsc-field input,
                .dsc-filter-grid .dsc-field select {
                    width:100%; padding:0.42rem 0.55rem; font-size:0.8rem;
                    border:1.5px solid #e2e8f0; border-radius:7px; background:#fff;
                    transition:border-color 0.15s, box-shadow 0.15s; outline:none;
                }
                .dsc-filter-grid .dsc-field input:focus,
                .dsc-filter-grid .dsc-field select:focus {
                    border-color:#2563eb; box-shadow:0 0 0 2px rgba(37,99,235,0.1);
                }
                .dsc-reset-btn {
                    background:#fff; border:1px solid #cbd5e1; color:#64748b;
                    padding:0.32rem 0.65rem; border-radius:7px; font-size:0.74rem;
                    font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:0.3rem;
                    transition:all 0.15s;
                }
                .dsc-reset-btn:hover { border-color:#ef4444; color:#ef4444; background:#fff1f2; }
            </style>

            <!-- ════ KPI Cards ════════════════════════════════════════════════════ -->
            <div class="dsc-kpi-grid">

                <!-- كارت الإجمالي -->
                <div class="dsc-kpi-card" style="border-color:#bfdbfe;">
                    <div class="kpi-accent-bar" style="background:linear-gradient(90deg,#2563eb,#60a5fa);"></div>
                    <div class="kpi-top">
                        <div class="kpi-icon" style="background:#dbeafe; color:#1d4ed8;"><i class="fas fa-clipboard-list"></i></div>
                        <span class="kpi-badge" style="background:#dbeafe; color:#1e40af;">TOTAL</span>
                    </div>
                    <div class="kpi-number" style="color:#1e40af;">${stats.total}</div>
                    <div class="kpi-label" style="color:#1e40af;">${t('module.periodic.dsc.stats.total', 'إجمالي السجلات')}</div>
                    <div class="kpi-sublabel">${records.length !== filteredRecords.length ? `${t('module.periodic.filtered','بعد التصفية')}: ${filteredRecords.length} / ${records.length}` : t('module.periodic.allData','كل البيانات')}</div>
                </div>

                <!-- كارت هذا الشهر -->
                <div class="dsc-kpi-card" style="border-color:#c7d2fe;">
                    <div class="kpi-accent-bar" style="background:linear-gradient(90deg,#6366f1,#a5b4fc);"></div>
                    <div class="kpi-top">
                        <div class="kpi-icon" style="background:#e0e7ff; color:#4338ca;"><i class="fas fa-calendar-check"></i></div>
                        <span class="kpi-badge" style="background:#e0e7ff; color:#4338ca;">MONTH</span>
                    </div>
                    <div class="kpi-number" style="color:#4338ca;">${stats.thisMonth}</div>
                    <div class="kpi-label" style="color:#4338ca;">${t('module.periodic.dsc.stats.thisMonth', 'هذا الشهر')}</div>
                    <div class="kpi-sublabel">${t('module.periodic.total','الإجمالي')}: ${allStats.thisMonth}</div>
                </div>

                <!-- كارت الوردية الأولى -->
                <div class="dsc-kpi-card" style="border-color:#bbf7d0;">
                    <div class="kpi-accent-bar" style="background:linear-gradient(90deg,#16a34a,#4ade80);"></div>
                    <div class="kpi-top">
                        <div class="kpi-icon" style="background:#dcfce7; color:#15803d;"><i class="fas fa-sun"></i></div>
                        <span class="kpi-badge" style="background:#dcfce7; color:#166534;">SHIFT 1</span>
                    </div>
                    <div class="kpi-number" style="color:#15803d;">${stats.shift1}</div>
                    <div class="kpi-label" style="color:#15803d;">${t('module.periodic.dsc.stats.shift1', 'الوردية الأولى')}</div>
                    <div class="kpi-bar-wrap"><div class="kpi-bar-fill" style="width:${shift1Pct}%; background:linear-gradient(90deg,#16a34a,#4ade80);"></div></div>
                </div>

                <!-- كارت الوردية الثانية/الثالثة -->
                <div class="dsc-kpi-card" style="border-color:#fed7aa;">
                    <div class="kpi-accent-bar" style="background:linear-gradient(90deg,#ea580c,#fb923c);"></div>
                    <div class="kpi-top">
                        <div class="kpi-icon" style="background:#ffedd5; color:#c2410c;"><i class="fas fa-moon"></i></div>
                        <span class="kpi-badge" style="background:#ffedd5; color:#9a3412;">SHIFT 2&3</span>
                    </div>
                    <div class="kpi-number" style="color:#c2410c;">${stats.shift2 + stats.shift3}</div>
                    <div class="kpi-label" style="color:#c2410c;">${t('module.periodic.dsc.stats.shift23', 'الوردية الثانية / الثالثة')}</div>
                    <div style="display:flex; gap:6px; margin-top:4px;">
                        <span style="font-size:0.72rem; background:#fef3c7; color:#d97706; padding:0.1rem 0.4rem; border-radius:999px;">٢: ${stats.shift2}</span>
                        <span style="font-size:0.72rem; background:#ede9fe; color:#7c3aed; padding:0.1rem 0.4rem; border-radius:999px;">٣: ${stats.shift3}</span>
                    </div>
                    <div class="kpi-bar-wrap"><div class="kpi-bar-fill" style="width:${shift2Pct + shift3Pct}%; background:linear-gradient(90deg,#ea580c,#fb923c);"></div></div>
                </div>
            </div>

            <!-- ════ Action bar ══════════════════════════════════════════════════ -->
            <div class="dsc-action-bar" style="direction:${dscDir};">
                <div class="dsc-title-block">
                    <h3><i class="fas fa-tasks" style="margin-${en?'right':'left'}:0.4rem;"></i>${en ? t('module.periodic.tab.dailySafety','Daily Safety Walk Checklist') : t('module.periodic.dsc.recordTitleAr','سجل المرور اليومي للسلامة')}</h3>
                    <p>${en ? t('module.periodic.dsc.recordTitleAr','سجل المرور اليومي للسلامة') : t('module.periodic.dsc.recordTitleEn','Daily Safety Report')}</p>
                </div>
                <div class="dsc-action-btns">
                    <button type="button" id="daily-safety-checklist-add-btn" class="dsc-btn-white">
                        <i class="fas fa-plus"></i>${t('module.periodic.dsc.addRecord','إضافة سجل')}
                    </button>
                    <button type="button" id="daily-safety-checklist-export-pdf-btn" class="dsc-btn-white-outline" title="${t('module.periodic.dsc.exportPdfHint','تصدير السجل كامل إلى PDF')}">
                        <i class="fas fa-file-pdf"></i>${t('module.periodic.dsc.exportPdf','تصدير PDF')}
                    </button>
                    <button type="button" id="daily-safety-checklist-export-excel-btn" class="dsc-btn-white-outline" title="${t('module.periodic.dsc.exportExcelHint','تصدير السجل كامل إلى Excel')}">
                        <i class="fas fa-file-excel"></i>${t('module.periodic.dsc.exportExcel','تصدير Excel')}
                    </button>
                </div>
            </div>

            <!-- ════ Compact filter strip ════════════════════════════════════════ -->
            <div class="dsc-filter-strip" style="direction:${dscDir};">
                <div class="dsc-filter-strip-search">
                    <i class="fas fa-search"></i>
                    <input id="dsc-filter-search" type="text" value="${Utils.escapeHTML(f.search || '')}" placeholder="${t('module.periodic.searchPlaceholder','بحث برقم التقرير، الموقع، الاسم...')}" autocomplete="off">
                </div>
                <div class="dsc-filter-strip-actions">
                    ${records.length !== filteredRecords.length ? `<span class="dsc-filter-result-pill">${filteredRecords.length} / ${records.length}</span>` : ''}
                    <button type="button" id="dsc-list-toggle-filters-btn" class="dsc-filter-toggle-btn${filterPanelOpen ? ' is-open' : ''}" aria-expanded="${filterPanelOpen}">
                        <i class="fas fa-sliders-h"></i>
                        <span>${t('module.periodic.analytics.filterData','فلترة')}</span>
                        ${activeFilterCount > 0 ? `<span class="dsc-filter-count-pill">${activeFilterCount}</span>` : ''}
                        <i class="fas fa-chevron-down" id="dsc-list-filter-chevron" style="font-size:0.65rem;transition:transform .2s;transform:rotate(${filterPanelOpen ? '180deg' : '0deg'});"></i>
                    </button>
                    ${activeFilterCount > 0 ? `<button type="button" id="dsc-filter-reset-btn" class="dsc-reset-btn"><i class="fas fa-times"></i>${t('module.periodic.resetFilters','مسح')}</button>` : ''}
                </div>
            </div>

            ${!filterPanelOpen && filterChips.length > 0 ? `
            <div class="dsc-filter-chips" id="dsc-filter-chips" style="direction:${dscDir};">
                ${filterChips.map((chip) => `
                    <span class="dsc-filter-chip" title="${Utils.escapeHTML(chip.label)}">
                        <i class="fas ${chip.icon}"></i>
                        <span>${Utils.escapeHTML(chip.label)}</span>
                        <button type="button" class="dsc-filter-chip-remove" data-filter-key="${chip.key}" aria-label="${t('module.periodic.resetFilters','مسح')}"><i class="fas fa-times"></i></button>
                    </span>
                `).join('')}
            </div>` : ''}

            <div id="dsc-list-filter-panel" class="dsc-filter-panel-compact" style="display:${filterPanelOpen ? 'block' : 'none'}; direction:${dscDir};">
                <div class="dsc-filter-panel-head">
                    <div class="fp-title">
                        <i class="fas fa-filter" style="color:#2563eb;"></i>
                        ${t('module.periodic.analytics.filterData','فلترة البيانات')}
                    </div>
                    <div class="dsc-filter-period-group">
                        ${[
                            { v: '7', label: en ? '7d' : '7 أيام' },
                            { v: '30', label: en ? '30d' : '30 يوم' },
                            { v: '90', label: en ? '3mo' : '3 أشهر' },
                            { v: '0', label: t('module.periodic.all','الكل') }
                        ].map((p) => `<button type="button" class="dsc-filter-period-btn dsc-list-period-btn${listPeriod === p.v ? ' is-active' : ''}" data-period="${p.v}">${p.label}</button>`).join('')}
                    </div>
                </div>
                <div class="dsc-filter-grid">
                    <div class="dsc-field">
                        <label><i class="fas fa-calendar-alt" style="color:#2563eb;"></i>${t('module.periodic.fromDate','من تاريخ')}</label>
                        <input id="dsc-filter-date-from" type="date" value="${Utils.escapeHTML(f.dateFrom || '')}">
                    </div>
                    <div class="dsc-field">
                        <label><i class="fas fa-calendar-alt" style="color:#2563eb;"></i>${t('module.periodic.toDate','إلى تاريخ')}</label>
                        <input id="dsc-filter-date-to" type="date" value="${Utils.escapeHTML(f.dateTo || '')}">
                    </div>
                    <div class="dsc-field">
                        <label><i class="fas fa-layer-group" style="color:#f59e0b;"></i>${t('module.periodic.dsc.table.shift','الوردية')}</label>
                        <select id="dsc-filter-shift">
                            <option value="">${t('module.periodic.all','الكل')}</option>
                            ${filterOptions.shifts.map(shift => `<option value="${Utils.escapeHTML(shift)}" ${String(f.shift || '') === String(shift) ? 'selected' : ''}>${Utils.escapeHTML(this._formatDailyShiftLabel(shift))}</option>`).join('')}
                        </select>
                    </div>
                    <div class="dsc-field">
                        <label><i class="fas fa-user-hard-hat" style="color:#6366f1;"></i>${t('module.periodic.dsc.table.inspector','القائم بالمرور')}</label>
                        <select id="dsc-filter-inspector">
                            <option value="">${t('module.periodic.all','الكل')}</option>
                            ${filterOptions.inspectors.map(name => `<option value="${Utils.escapeHTML(name)}" ${String(f.inspectorName || '') === String(name) ? 'selected' : ''}>${Utils.escapeHTML(name)}</option>`).join('')}
                        </select>
                    </div>
                    <div class="dsc-field">
                        <label><i class="fas fa-industry" style="color:#0ea5e9;"></i>${t('module.periodic.dsc.table.site','المصنع/الموقع')}</label>
                        <select id="dsc-filter-site">
                            <option value="">${t('module.periodic.all','الكل')}</option>
                            ${filterOptions.sites.map(s => `<option value="${Utils.escapeHTML(s.id)}" ${String(f.siteId || '') === String(s.id) ? 'selected' : ''}>${Utils.escapeHTML(s.name)}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>

            <!-- ════ Records table ═══════════════════════════════════════════════ -->
            <div class="content-card" style="border-radius:12px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.06);">
                <div class="card-header" style="background:linear-gradient(90deg,#f8fafc,#fff); border-bottom:2px solid #e2e8f0; padding:0.85rem 1.1rem;">
                    <h2 class="card-title" style="margin:0; font-size:0.95rem; font-weight:700; color:#1e293b;">
                        <i class="fas fa-list-check ml-2" style="color:#2563eb;"></i>
                        ${en ? t('module.periodic.dsc.recordTitle','Daily Safety Report Log') : t('module.periodic.dsc.recordTitleAr','سجل المرور اليومي للسلامة')}
                    </h2>
                </div>
                <div class="card-body" id="daily-safety-checklist-table" style="padding:0.75rem;">
                    ${this.renderDailySafetyCheckListTable(filteredRecords)}
                </div>
            </div>
        `;
    },

    renderDailySafetyCheckListTable(records) {
        const t = (key, fallback) => this._t(key, fallback);
        if (!records || records.length === 0) return `<div class="empty-state"><p class="text-gray-500">${t('module.periodic.dsc.emptyRecords', 'لا توجد سجلات. اضغط "إضافة سجل" لتسجيل مرور يومي جديد.')}</p></div>`;

        // ✅ ترتيب تنازلي حسب التاريخ — أحدث السجلات في الأعلى
        const sorted = [...records].sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));

        // ✅ تجميع السجلات حسب التاريخ لإضافة رؤوس فاصلة تسهّل التنقّل
        const groupedByDate = {};
        sorted.forEach(r => {
            const dateKey = this._normalizeDateOnly(r.date || r.createdAt) || 'unknown';
            if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
            groupedByDate[dateKey].push(r);
        });
        const dateKeys = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

        // ✅ بناء الصفوف مع فواصل التاريخ
        const tbodyRows = dateKeys.map(dateKey => {
            const dayRecords = groupedByDate[dateKey];
            const dateLabel = dateKey !== 'unknown' ? Utils.formatDate(dateKey) : '-';
            const dateAnchorId = `dsc-day-${dateKey.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
            const dateHeaderRow = `
                <tr class="dsc-date-divider" id="${dateAnchorId}">
                    <td colspan="6" style="background: linear-gradient(90deg, #eff6ff 0%, #dbeafe 100%); padding: 0.65rem 1rem; border-top: 2px solid #2563eb; font-weight: 700; color: #1e40af;">
                        <i class="fas fa-calendar-day ml-2"></i>${Utils.escapeHTML(dateLabel)}
                        <span style="background:#2563eb; color:#fff; padding:0.15rem 0.55rem; border-radius:999px; font-size:0.75rem; margin-right:0.5rem;">${dayRecords.length}</span>
                    </td>
                </tr>`;
            const dataRows = dayRecords.map(r => {
                const serial = this.getDailySafetyCheckListSerialNumber(r);
                const shiftLabel = this._formatDailyShiftLabel(r.shift || '-');
                const shiftCode = ({ 'الأولى': '1', 'الثانية': '2', 'الثالثة': '3' })[r.shift] || '?';
                const shiftColor = shiftCode === '1' ? '#16a34a' : shiftCode === '2' ? '#ea580c' : shiftCode === '3' ? '#7c3aed' : '#64748b';
                return `
                <tr class="dsc-data-row" data-record-id="${Utils.escapeHTML(r.id)}" style="transition: background-color 0.15s ease;">
                    <td>
                        <span class="dsc-serial-badge" style="display:inline-block; padding:0.3rem 0.65rem; background:linear-gradient(135deg,#1e40af,#2563eb); color:#fff; font-weight:700; font-family:'Courier New',monospace; border-radius:6px; font-size:0.85rem; letter-spacing:0.5px;" dir="ltr">${Utils.escapeHTML(serial)}</span>
                    </td>
                    <td>${Utils.escapeHTML(r.siteName || '-')}</td>
                    <td>${r.date ? Utils.formatDate(r.date) : '-'}</td>
                    <td>${Utils.escapeHTML(r.inspectorName || '-')}</td>
                    <td>
                        <span style="display:inline-flex; align-items:center; gap:0.3rem; padding:0.2rem 0.55rem; background:${shiftColor}1A; color:${shiftColor}; border:1px solid ${shiftColor}55; border-radius:999px; font-size:0.8rem; font-weight:600;">
                            <i class="fas fa-${shiftCode === '1' ? 'sun' : 'moon'}" style="font-size:0.7rem;"></i>${Utils.escapeHTML(shiftLabel)}
                        </span>
                    </td>
                    <td class="text-left">
                        <button type="button" class="btn-icon btn-icon-info ml-2" onclick="PeriodicInspections.showDailySafetyCheckListView('${Utils.escapeHTML(r.id)}')" title="${t('module.periodic.dsc.action.view', 'عرض')}"><i class="fas fa-eye"></i></button>
                        <button type="button" class="btn-icon btn-icon-success ml-2" onclick="PeriodicInspections.exportDailySafetyCheckListRecord('${Utils.escapeHTML(r.id)}')" title="${t('module.periodic.dsc.action.downloadPdf', 'تحميل PDF')}"><i class="fas fa-file-pdf"></i></button>
                        <button type="button" class="btn-icon btn-icon-primary" onclick="PeriodicInspections.showDailySafetyCheckListForm('${Utils.escapeHTML(r.id)}')" title="${t('module.periodic.dsc.action.edit', 'تعديل')}"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn-icon btn-icon-danger" onclick="PeriodicInspections.deleteDailySafetyCheckListRecord('${Utils.escapeHTML(r.id)}')" title="${t('module.periodic.dsc.action.delete', 'حذف')}"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;
            }).join('');
            return dateHeaderRow + dataRows;
        }).join('');

        // ✅ بناء أزرار "القفز إلى تاريخ معين" — تتيح للمستخدم الانتقال السريع لأي يوم محفوظ
        const todayStr = this._normalizeDateOnly(new Date());
        const todayKey = `dsc-day-${todayStr.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
        const hasToday = dateKeys.includes(todayStr);
        const quickJumpButtons = dateKeys.slice(0, 7).map(dateKey => {
            const anchor = `dsc-day-${dateKey.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
            const label = Utils.formatDate(dateKey);
            const count = groupedByDate[dateKey].length;
            return `<button type="button" class="dsc-quick-jump-btn" onclick="document.getElementById('${anchor}')?.scrollIntoView({ behavior: 'smooth', block: 'start' });" style="background:#fff; border:1px solid #cbd5e1; color:#1e293b; padding:0.4rem 0.8rem; border-radius:8px; font-size:0.8rem; font-weight:600; cursor:pointer; transition:all 0.15s; white-space:nowrap;">
                <i class="fas fa-calendar-day ml-1 text-blue-600"></i>${Utils.escapeHTML(label)}
                <span style="background:#1e40af; color:#fff; padding:0.05rem 0.4rem; border-radius:999px; font-size:0.7rem; margin-right:0.3rem;">${count}</span>
            </button>`;
        }).join('');

        return `
            <style>
                /* ✅ Sticky header — يبقى رأس الجدول مرئياً عند التمرير */
                .dsc-table-shell { position: relative; }
                .dsc-table-shell .dsc-table-scroll { max-height: 70vh; overflow-y: auto; overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 10px; scroll-behavior: smooth; }
                .dsc-table-shell .dsc-table-scroll table { width: 100%; border-collapse: separate; border-spacing: 0; }
                .dsc-table-shell .dsc-table-scroll thead th {
                    position: sticky; top: 0; z-index: 5;
                    background: linear-gradient(180deg, #dc2626 0%, #b91c1c 100%);
                    color: #fff; padding: 0.85rem 0.75rem; font-weight: 700; font-size: 0.85rem;
                    text-align: right; box-shadow: 0 2px 4px rgba(0,0,0,0.08);
                }
                .dsc-table-shell .dsc-data-row td { padding: 0.65rem 0.75rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
                .dsc-table-shell .dsc-data-row:hover { background-color: #f8fafc; }
                .dsc-table-shell .dsc-date-divider td { position: sticky; top: 40px; z-index: 3; }
                /* أزرار القفز السريع */
                .dsc-quick-jump-btn:hover { background: #1e40af !important; color: #fff !important; border-color: #1e40af !important; transform: translateY(-1px); box-shadow: 0 2px 6px rgba(30,64,175,0.25); }
                .dsc-quick-jump-btn:hover .text-blue-600 { color: #fff !important; }
                /* Floating scroll-to-top button */
                #dsc-scroll-top-fab { position: fixed; bottom: 24px; left: 24px; width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #1e40af, #2563eb); color: #fff; border: none; box-shadow: 0 6px 20px rgba(30,64,175,0.4); cursor: pointer; opacity: 0; pointer-events: none; transform: translateY(20px); transition: all 0.2s; z-index: 50; font-size: 1.1rem; }
                #dsc-scroll-top-fab.visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
                #dsc-scroll-top-fab:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(30,64,175,0.5); }
                @media (max-width: 768px) {
                    .dsc-table-shell .dsc-table-scroll { max-height: 60vh; }
                    #dsc-scroll-top-fab { bottom: 16px; left: 16px; width: 44px; height: 44px; }
                }
            </style>
            <!-- ✅ شريط القفز السريع للأيام الأخيرة (آخر 7 أيام محفوظة) -->
            ${dateKeys.length > 1 ? `
            <div style="margin-bottom: 0.75rem; padding: 0.65rem 0.75rem; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px;">
                <div style="font-size: 0.8rem; font-weight: 600; color: #475569; margin-bottom: 0.5rem;">
                    <i class="fas fa-bolt ml-1 text-amber-500"></i>${t('module.periodic.dsc.quickJump', 'انتقال سريع إلى تاريخ')}:
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    ${hasToday ? `<button type="button" class="dsc-quick-jump-btn" onclick="document.getElementById('${todayKey}')?.scrollIntoView({ behavior: 'smooth', block: 'start' });" style="background:#dcfce7; border:1px solid #16a34a; color:#15803d; padding:0.4rem 0.8rem; border-radius:8px; font-size:0.8rem; font-weight:700; cursor:pointer; transition:all 0.15s; white-space:nowrap;">
                        <i class="fas fa-star ml-1"></i>${t('module.periodic.dsc.today', 'اليوم')}
                    </button>` : ''}
                    ${quickJumpButtons}
                </div>
            </div>` : ''}

            <!-- ✅ معلومات العدّ -->
            <div style="margin-bottom: 0.5rem; font-size: 0.85rem; color: #64748b;">
                <i class="fas fa-list-ol ml-1"></i>${t('module.periodic.dsc.totalRecords', 'إجمالي السجلات')}: <strong style="color:#1e40af;">${sorted.length}</strong>
                · ${t('module.periodic.dsc.acrossDays', 'موزَّعة على')} <strong style="color:#1e40af;">${dateKeys.filter(k => k !== 'unknown').length}</strong> ${t('module.periodic.dsc.daysWord', 'يوم')}
            </div>

            <!-- ✅ الجدول مع sticky header + smooth scroll + max-height -->
            <div class="dsc-table-shell">
                <div class="dsc-table-scroll">
                    <table class="data-table" style="width:100%;">
                        <thead>
                            <tr>
                                <th style="min-width:110px;">${t('module.periodic.dsc.table.reportNumber', 'رقم التقرير')}</th>
                                <th style="min-width:130px;">${t('module.periodic.dsc.table.site', 'المصنع/الموقع')}</th>
                                <th style="min-width:110px;">${t('module.periodic.dsc.table.date', 'التاريخ')}</th>
                                <th style="min-width:130px;">${t('module.periodic.dsc.table.inspector', 'القائم بالمرور')}</th>
                                <th style="min-width:120px;">${t('module.periodic.dsc.table.shift', 'الوردية')}</th>
                                <th style="min-width:160px;">${t('module.periodic.dsc.table.action', 'الإجراء')}</th>
                            </tr>
                        </thead>
                        <tbody>${tbodyRows}</tbody>
                    </table>
                </div>
            </div>

            <!-- ✅ زر العودة لأعلى الصفحة (floating) — يظهر فقط بعد التمرير -->
            <button id="dsc-scroll-top-fab" type="button" title="${t('module.periodic.dsc.scrollTop', 'العودة لأعلى')}" aria-label="${t('module.periodic.dsc.scrollTop', 'العودة لأعلى')}">
                <i class="fas fa-arrow-up"></i>
            </button>
            <script>
                (function() {
                    // إعداد الزر العائم للعودة لأعلى — يستهدف الـ scroll container الخاص بالجدول
                    var fab = document.getElementById('dsc-scroll-top-fab');
                    var scrollContainer = document.querySelector('.dsc-table-shell .dsc-table-scroll');
                    if (!fab || !scrollContainer) return;
                    function onScroll() {
                        if (scrollContainer.scrollTop > 200) fab.classList.add('visible');
                        else fab.classList.remove('visible');
                    }
                    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
                    fab.addEventListener('click', function() {
                        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                })();
            </script>
        `;
    },

    async renderDailySafetyAnalyticsContent() {
        const allRecords = this.getDailySafetyCheckListRecords();
        const filteredRecords = this._getDailySafetyAnalyticsRecordsByScope('__all__');
        const analytics = this.getDailySafetyAnalytics(filteredRecords);
        const t = (key, fallback) => this._t(key, fallback);
        const controls = this.state.dailySafetyAnalyticsControls || { topN: 18, rankingMetric: 'nonCompliantRate', cardStyle: 'gradient', barStyle: 'rounded' };
        const topN = Math.max(3, Math.min(20, Number(controls.topN || 10)));
        const trend = this.getDailySafetyTrend(filteredRecords);
        const weeklyTrend = this.getDailySafetyWeeklyTrend(filteredRecords);
        const insights = this.buildDailySafetyInsights(analytics, filteredRecords);
        const isAdmin = this.isCurrentUserAdmin();
        const topInspectors = analytics.inspectorList.slice(0, topN);
        const topSites = analytics.siteList.slice(0, topN);
        const points = [...analytics.points];
        if (controls.rankingMetric === 'complianceRate') {
            points.sort((a, b) => b.complianceRate - a.complianceRate);
        } else if (controls.rankingMetric === 'nonCompliantCount') {
            points.sort((a, b) => b.nonCompliant - a.nonCompliant);
        } else {
            points.sort((a, b) => b.nonCompliantRate - a.nonCompliantRate);
        }
        const worstPoints = points.slice(0, this.DAILY_SAFETY_CHECKLIST_QUESTIONS.length);
        const filterOptions = this.getDailySafetyFilterOptions(allRecords);
        const f = this.state.dailySafetyFilters || {};
        const trendMax = Math.max(1, ...(trend.map((r) => r.records)));
        const activeFilterCount = [f.search, f.siteId, f.inspectorName, f.shift, f.dateFrom, f.dateTo].filter(v => v && String(v).trim()).length;
        const period = this._dscPeriod || '0';

        // ── KPI cards ─────────────────────────────────────────────────────────
        const shift1count = analytics.shiftList.find(s => s.name === 'الأولى')?.count || 0;
        const shift2count = analytics.shiftList.find(s => s.name === 'الثانية')?.count || 0;
        const shift3count = analytics.shiftList.find(s => s.name === 'الثالثة')?.count || 0;
        const kpis = [
            { label: t('module.periodic.dsc.stats.total','إجمالي السجلات'),       value: analytics.totalRecords,          icon:'fas fa-clipboard-list',  color:'#2563eb', bg:'#eff6ff', border:'#bfdbfe' },
            { label: t('module.periodic.complianceRate','نسبة المطابقة'),         value: analytics.complianceRate + '%',   icon:'fas fa-check-circle',    color:'#15803d', bg:'#f0fdf4', border:'#bbf7d0' },
            { label: t('module.periodic.nonCompliantPoints','غير المطابق'),       value: analytics.overallNonCompliant,    icon:'fas fa-times-circle',    color:'#dc2626', bg:'#fef2f2', border:'#fecaca' },
            { label: t('module.periodic.pointsChecked','نقاط الفحص'),             value: analytics.overallPointsTotal,     icon:'fas fa-tasks',           color:'#6366f1', bg:'#eef2ff', border:'#c7d2fe' },
            { label: t('module.periodic.dsc.stats.shift1','الوردية الأولى'),      value: shift1count,                      icon:'fas fa-sun',             color:'#ca8a04', bg:'#fefce8', border:'#fde68a' },
            { label: t('module.periodic.dsc.stats.shift23','الوردية 2/3'),        value: shift2count + shift3count,        icon:'fas fa-moon',            color:'#7c3aed', bg:'#f5f3ff', border:'#ddd6fe' },
        ];
        const kpisExtended = [
            { label: t('module.periodic.analytics.recordsWithIssues','سجلات بملاحظات'), value: analytics.recordsWithIssues, icon:'fas fa-exclamation-circle', color:'#ea580c', bg:'#fff7ed', border:'#fed7aa' },
            { label: t('module.periodic.analytics.avgIssuesPerRecord','متوسط ملاحظات/سجل'), value: analytics.avgNonCompliantPerRecord, icon:'fas fa-calculator', color:'#0891b2', bg:'#ecfeff', border:'#a5f3fc' },
            { label: t('module.periodic.analytics.activeSites','مواقع نشطة'), value: analytics.uniqueSites, icon:'fas fa-map-marker-alt', color:'#0d9488', bg:'#f0fdfa', border:'#99f6e4' },
            { label: t('module.periodic.analytics.workDays','أيام تغطية'), value: analytics.uniqueDays, icon:'fas fa-calendar-day', color:'#4f46e5', bg:'#eef2ff', border:'#c7d2fe' },
            { label: t('module.periodic.analytics.inspectorsCount','قائمون بالمرور'), value: analytics.uniqueInspectors, icon:'fas fa-users', color:'#16a34a', bg:'#f0fdf4', border:'#bbf7d0' },
            { label: t('module.periodic.analytics.cleanRecordsRate','سجلات خالية'), value: analytics.recordsCleanRate + '%', icon:'fas fa-shield-alt', color:'#15803d', bg:'#dcfce7', border:'#86efac' },
        ];
        const insightColors = { info:'#2563eb', success:'#15803d', warning:'#d97706', danger:'#dc2626' };
        const insightBgs = { info:'#eff6ff', success:'#f0fdf4', warning:'#fffbeb', danger:'#fef2f2' };
        const topSiteStats = analytics.siteStats.slice(0, topN);
        const topInspectorStats = analytics.inspectorStats.slice(0, topN);
        const activePoints = worstPoints.filter(p => p.total > 0);

        return `
        <div id="dsc-analytics-root" style="font-family:inherit;">

            <!-- ══ شريط الأدوات الرئيسي (نفس نمط العيادة والملاحظات) ══ -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(37,99,235,0.3);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-chart-line" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">${t('module.periodic.tab.dailySafetyAnalytics','لوحة تحليل المرور اليومي للسلامة')}</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.85;">${t('module.periodic.analytics.subtitle','تحليل شامل وفوري • فلاتر تفاعلية • تصدير PDF')}</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-left:2px;">الفترة:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${['30','90','180','365','0'].map((v,i) => {
                            const labels=['30 يوم','3 أشهر','6 أشهر','سنة','الكل'];
                            const active = period === v;
                            return `<button class="dsc-an-period-btn" data-period="${v}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${active?'#fff':'rgba(255,255,255,0.15)'};color:${active?'#1e40af':'#fff'};">${labels[i]}</button>`;
                        }).join('')}
                    </div>
                    <button id="dsc-an-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                        <i class="fas fa-sliders-h"></i><span>فلاتر</span><span id="dsc-an-filter-badge" style="${activeFilterCount>0?'':'display:none;'}background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">${activeFilterCount||'●'}</span>
                    </button>
                    <!-- مختار الشخص للتصدير (مرئي في الشريط) -->
                    <div style="display:flex;align-items:center;gap:4px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.3);border-radius:8px;padding:3px 6px;">
                        <i class="fas fa-user" style="font-size:0.72rem;opacity:0.8;"></i>
                        <select id="dsc-analytics-export-inspector" style="background:transparent;border:none;color:#fff;font-size:0.75rem;font-weight:600;outline:none;cursor:pointer;padding:2px 0;max-width:130px;" title="نطاق التصدير">
                            <option value="__all__" style="color:#1e293b;background:#fff;">الكل</option>
                            ${filterOptions.inspectors.map(n=>`<option value="${Utils.escapeHTML(n)}" style="color:#1e293b;background:#fff;">${Utils.escapeHTML(n)}</option>`).join('')}
                        </select>
                    </div>
                    <button id="dsc-analytics-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(239,68,68,0.85);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(239,68,68,1)'" onmouseout="this.style.background='rgba(239,68,68,0.85)'" title="تصدير PDF للشخص المحدد">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="dsc-analytics-export-excel-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(22,163,74,0.85);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(22,163,74,1)'" onmouseout="this.style.background='rgba(22,163,74,0.85)'" title="تصدير Excel للشخص المحدد">
                        <i class="fas fa-file-excel"></i><span>Excel</span>
                    </button>
                    <button id="dsc-an-refresh-btn" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" title="تحديث البيانات">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <!-- ══ لوحة الفلاتر التفاعلية (مخفية افتراضياً) ══ -->
            <div id="dsc-an-filter-panel" style="display:none;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#2563eb;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#1e3a8a;">الفلاتر التفاعلية</span>
                        <span id="dsc-an-filter-count" style="background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;">${filteredRecords.length} سجل</span>
                    </div>
                    <button id="dsc-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #e2e8f0;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;transition:all .2s;" onmouseover="this.style.background='#fef2f2';this.style.color='#ef4444';this.style.borderColor='#fecaca'" onmouseout="this.style.background='#fff';this.style.color='#64748b';this.style.borderColor='#e2e8f0'">
                        <i class="fas fa-times ml-1"></i>مسح الكل
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin-bottom:12px;">
                    ${[
                        {id:'dsc-filter-date-from', icon:'fas fa-calendar-alt', color:'#2563eb', label:'من تاريخ', type:'date', val: Utils.escapeHTML(f.dateFrom||'')},
                        {id:'dsc-filter-date-to',   icon:'fas fa-calendar-alt', color:'#2563eb', label:'إلى تاريخ', type:'date', val: Utils.escapeHTML(f.dateTo||'')},
                    ].map(field => `
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                                <i class="${field.icon}" style="color:${field.color};margin-left:4px;"></i>${field.label}
                            </label>
                            <input id="${field.id}" type="${field.type}" value="${field.val}" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                        </div>
                    `).join('')}
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-layer-group" style="color:#f59e0b;margin-left:4px;"></i>الوردية
                        </label>
                        <select id="dsc-filter-shift" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                            <option value="">الكل</option>
                            ${filterOptions.shifts.map(s=>`<option value="${Utils.escapeHTML(s)}" ${String(f.shift||'')===String(s)?'selected':''}>${Utils.escapeHTML(this._formatDailyShiftLabel(s))}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-user-hard-hat" style="color:#6366f1;margin-left:4px;"></i>القائم بالمرور
                        </label>
                        <select id="dsc-filter-inspector" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                            <option value="">الكل</option>
                            ${filterOptions.inspectors.map(n=>`<option value="${Utils.escapeHTML(n)}" ${String(f.inspectorName||'')===n?'selected':''}>${Utils.escapeHTML(n)}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-industry" style="color:#0ea5e9;margin-left:4px;"></i>المصنع/الموقع
                        </label>
                        <select id="dsc-filter-site" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                            <option value="">الكل</option>
                            ${filterOptions.sites.map(s=>`<option value="${Utils.escapeHTML(s.id)}" ${String(f.siteId||'')===String(s.id)?'selected':''}>${Utils.escapeHTML(s.name)}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                            <i class="fas fa-search" style="color:#94a3b8;margin-left:4px;"></i>بحث
                        </label>
                        <input id="dsc-filter-search" type="text" value="${Utils.escapeHTML(f.search||'')}" placeholder="رقم / الموقع / الاسم" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                    </div>
                </div>
                <!-- عناصر التحكم بالعرض -->
                <div style="border-top:1px solid #e2e8f0;padding-top:12px;">
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;">
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;"><i class="fas fa-sort-amount-down" style="color:#94a3b8;margin-left:4px;"></i>ترتيب البنود حسب</label>
                            <select id="dsc-analytics-ranking" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                                <option value="nonCompliantRate" ${controls.rankingMetric==='nonCompliantRate'?'selected':''}>معدل الخطورة</option>
                                <option value="nonCompliantCount" ${controls.rankingMetric==='nonCompliantCount'?'selected':''}>عدد غير المطابق</option>
                                <option value="complianceRate" ${controls.rankingMetric==='complianceRate'?'selected':''}>نسبة المطابقة</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;"><i class="fas fa-list-ol" style="color:#94a3b8;margin-left:4px;"></i>عدد العناصر</label>
                            <select id="dsc-analytics-topn" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;cursor:pointer;transition:border .2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                                ${[5,8,10,12,15,18,20].map(n=>`<option value="${n}" ${n===topN?'selected':''}>Top ${n}</option>`).join('')}
                            </select>
                        </div>
                        <!-- نطاق التصدير موجود في الشريط العلوي (dsc-analytics-export-inspector) — لا نكرره هنا -->
                        ${isAdmin ? `
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">نمط الكروت</label>
                            <select id="dsc-analytics-card-style" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;cursor:pointer;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                                <option value="gradient" ${controls.cardStyle==='gradient'?'selected':''}>متدرج</option>
                                <option value="flat" ${controls.cardStyle==='flat'?'selected':''}>مسطح</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">نمط الأشرطة</label>
                            <select id="dsc-analytics-bar-style" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;cursor:pointer;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
                                <option value="rounded" ${controls.barStyle==='rounded'?'selected':''}>حواف ناعمة</option>
                                <option value="square" ${controls.barStyle==='square'?'selected':''}>حواف مستقيمة</option>
                            </select>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>

            <!-- ══ KPI Cards (نفس نمط العيادة) ══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                ${kpis.map(k=>`
                <div style="background:${k.bg};border:1px solid ${k.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${k.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${k.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${k.color};line-height:1;">${k.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${k.label}</div>
                    </div>
                </div>`).join('')}
            </div>

            <!-- ══ رؤى تحليلية تلقائية ══ -->
            ${insights.length ? `
            <div style="background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);border:1.5px solid #e2e8f0;border-radius:12px;padding:14px 18px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                    <i class="fas fa-lightbulb" style="color:#f59e0b;font-size:15px;"></i>
                    <span style="font-weight:700;font-size:0.9rem;color:#1e3a8a;">${t('module.periodic.analytics.insightsTitle','رؤى تحليلية')}</span>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:8px;">
                    ${insights.map(ins => `
                    <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;background:${insightBgs[ins.type]||'#f8fafc'};border:1px solid ${insightColors[ins.type]||'#e2e8f0'}33;border-right:3px solid ${insightColors[ins.type]||'#64748b'};border-radius:8px;">
                        <i class="fas ${ins.icon}" style="color:${insightColors[ins.type]||'#64748b'};margin-top:2px;flex-shrink:0;"></i>
                        <span style="font-size:0.78rem;color:#334155;line-height:1.5;">${Utils.escapeHTML(ins.text)}</span>
                    </div>`).join('')}
                </div>
            </div>` : ''}

            <!-- ══ KPI تفصيلية إضافية ══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                ${kpisExtended.map(k=>`
                <div style="background:${k.bg};border:1px solid ${k.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${k.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${k.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${k.color};line-height:1;">${k.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${k.label}</div>
                    </div>
                </div>`).join('')}
            </div>

            <!-- ══ Row 1: توزيع الورديات + الاتجاه الزمني ══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-layer-group" style="color:#f59e0b;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">التوزيع حسب الوردية</span>
                    </div>
                    <div style="padding:12px;position:relative;height:220px;">
                        <canvas id="dsc-chart-shift"></canvas>
                        <div id="dsc-chart-shift-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-chart-area" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">الاتجاه الزمني (آخر 12 شهر)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:220px;">
                        <canvas id="dsc-chart-trend"></canvas>
                        <div id="dsc-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
            </div>

            <!-- ══ Row 2: القائمون بالمرور + المواقع ══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-user-shield" style="color:#16a34a;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">تحليل القائمين بالمرور (أعلى ${topN})</span>
                    </div>
                    <div style="padding:12px;position:relative;height:${Math.max(200, topInspectors.length * 32 + 40)}px;">
                        <canvas id="dsc-chart-inspectors"></canvas>
                        <div id="dsc-chart-inspectors-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-industry" style="color:#0ea5e9;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">تحليل المواقع (أعلى ${topN})</span>
                    </div>
                    <div style="padding:12px;position:relative;height:${Math.max(200, topSites.length * 32 + 40)}px;">
                        <canvas id="dsc-chart-sites"></canvas>
                        <div id="dsc-chart-sites-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
            </div>

            <!-- ══ Row 2b: امتثال الورديات + الاتجاه الأسبوعي ══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-percentage" style="color:#16a34a;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${t('module.periodic.analytics.shiftCompliance','نسبة الامتثال حسب الوردية')}</span>
                    </div>
                    <div style="padding:12px;position:relative;height:220px;">
                        <canvas id="dsc-chart-shift-compliance"></canvas>
                        <div id="dsc-chart-shift-compliance-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-calendar-week" style="color:#7c3aed;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${t('module.periodic.analytics.weeklyTrend','الاتجاه الأسبوعي (آخر 8 أسابيع)')}</span>
                    </div>
                    <div style="padding:12px;position:relative;height:220px;">
                        <canvas id="dsc-chart-weekly"></canvas>
                        <div id="dsc-chart-weekly-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
            </div>

            <!-- ══ Row 2c: امتثال المواقع + غير المطابق شهرياً ══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-building" style="color:#0ea5e9;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${t('module.periodic.analytics.siteCompliance','امتثال المواقع (أعلى خطورة)')}</span>
                    </div>
                    <div style="padding:12px;position:relative;height:${Math.max(200, topSiteStats.length * 32 + 40)}px;">
                        <canvas id="dsc-chart-site-compliance"></canvas>
                        <div id="dsc-chart-site-compliance-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-chart-line" style="color:#dc2626;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${t('module.periodic.analytics.nonCompliantTrend','اتجاه الملاحظات غير المطابقة')}</span>
                    </div>
                    <div style="padding:12px;position:relative;height:220px;">
                        <canvas id="dsc-chart-noncompliant-trend"></canvas>
                        <div id="dsc-chart-noncompliant-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
            </div>

            <!-- ══ Row 3: نقاط الفحص – امتثال كامل (عرض كامل) ══ -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 12px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-tasks" style="color:#dc2626;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">امتثال نقاط الفحص (${worstPoints.filter(p=>p.total>0).length} بند)</span>
                    </div>
                    <div style="display:flex;gap:6px;font-size:0.72rem;font-weight:700;">
                        <span style="background:#fee2e2;color:#dc2626;padding:2px 8px;border-radius:12px;">${worstPoints.filter(p=>p.nonCompliantRate>=40).length} عالي</span>
                        <span style="background:#fef3c7;color:#d97706;padding:2px 8px;border-radius:12px;">${worstPoints.filter(p=>p.nonCompliantRate>=20&&p.nonCompliantRate<40).length} متوسط</span>
                        <span style="background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:12px;">${worstPoints.filter(p=>p.nonCompliantRate<20&&p.total>0).length} سليم</span>
                    </div>
                </div>
                <div style="padding:12px;position:relative;height:${Math.max(300, worstPoints.filter(p=>p.total>0).length * 32 + 60)}px;">
                    <canvas id="dsc-chart-compliance"></canvas>
                    <div id="dsc-chart-compliance-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                </div>
            </div>

            <!-- ══ Row 4: جداول تفصيلية ══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:16px;margin-bottom:16px;">
                <!-- جدول أداء القائمين بالمرور -->
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-user-check" style="color:#16a34a;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${t('module.periodic.analytics.inspectorPerformance','أداء القائمين بالمرور — تفصيلي')}</span>
                    </div>
                    <div style="overflow-x:auto;max-height:380px;overflow-y:auto;">
                        <table style="width:100%;border-collapse:collapse;font-size:0.78rem;">
                            <thead style="position:sticky;top:0;z-index:1;">
                                <tr style="background:#f1f5f9;">
                                    <th style="padding:8px 10px;text-align:right;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">#</th>
                                    <th style="padding:8px 10px;text-align:right;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">${t('module.periodic.dsc.table.inspector','القائم بالمرور')}</th>
                                    <th style="padding:8px 10px;text-align:center;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">${t('module.periodic.dsc.stats.total','السجلات')}</th>
                                    <th style="padding:8px 10px;text-align:center;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">${t('module.periodic.complianceRate','الامتثال')}</th>
                                    <th style="padding:8px 10px;text-align:center;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">${t('module.periodic.nonCompliantPoints','غير مطابق')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${topInspectorStats.length ? topInspectorStats.map((insp, i) => {
                                    const cc = insp.complianceRate >= 90 ? '#15803d' : insp.complianceRate >= 75 ? '#2563eb' : insp.complianceRate >= 60 ? '#d97706' : '#dc2626';
                                    return `<tr style="background:${i%2===0?'#fff':'#f8fafc'};border-bottom:1px solid #f1f5f9;">
                                        <td style="padding:7px 10px;color:#94a3b8;text-align:center;">${i+1}</td>
                                        <td style="padding:7px 10px;font-weight:600;color:#1e293b;">${Utils.escapeHTML(insp.name)}</td>
                                        <td style="padding:7px 10px;text-align:center;font-weight:700;color:#2563eb;">${insp.count}</td>
                                        <td style="padding:7px 10px;text-align:center;">
                                            <span style="color:${cc};font-weight:700;">${insp.complianceRate}%</span>
                                            <div style="height:4px;background:#e2e8f0;border-radius:2px;margin-top:3px;overflow:hidden;"><div style="width:${insp.complianceRate}%;height:100%;background:${cc};border-radius:2px;"></div></div>
                                        </td>
                                        <td style="padding:7px 10px;text-align:center;color:#dc2626;font-weight:700;">${insp.nonCompliant}</td>
                                    </tr>`;
                                }).join('') : `<tr><td colspan="5" style="padding:20px;text-align:center;color:#94a3b8;">لا توجد بيانات</td></tr>`}
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- جدول امتثال المواقع -->
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marked-alt" style="color:#0ea5e9;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${t('module.periodic.analytics.sitePerformance','تحليل المواقع — تفصيلي')}</span>
                    </div>
                    <div style="overflow-x:auto;max-height:380px;overflow-y:auto;">
                        <table style="width:100%;border-collapse:collapse;font-size:0.78rem;">
                            <thead style="position:sticky;top:0;z-index:1;">
                                <tr style="background:#f1f5f9;">
                                    <th style="padding:8px 10px;text-align:right;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">#</th>
                                    <th style="padding:8px 10px;text-align:right;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">${t('module.periodic.dsc.table.site','الموقع')}</th>
                                    <th style="padding:8px 10px;text-align:center;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">${t('module.periodic.dsc.stats.total','السجلات')}</th>
                                    <th style="padding:8px 10px;text-align:center;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">${t('module.periodic.complianceRate','الامتثال')}</th>
                                    <th style="padding:8px 10px;text-align:center;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">${t('module.periodic.analytics.riskRate','الخطورة')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${topSiteStats.length ? topSiteStats.map((site, i) => {
                                    const rc = site.nonCompliantRate >= 40 ? '#dc2626' : site.nonCompliantRate >= 20 ? '#d97706' : '#15803d';
                                    const rl = site.nonCompliantRate >= 40 ? 'عالي' : site.nonCompliantRate >= 20 ? 'متوسط' : 'منخفض';
                                    return `<tr style="background:${i%2===0?'#fff':'#f8fafc'};border-bottom:1px solid #f1f5f9;">
                                        <td style="padding:7px 10px;color:#94a3b8;text-align:center;">${i+1}</td>
                                        <td style="padding:7px 10px;font-weight:600;color:#1e293b;">${Utils.escapeHTML(site.name)}</td>
                                        <td style="padding:7px 10px;text-align:center;font-weight:700;color:#2563eb;">${site.count}</td>
                                        <td style="padding:7px 10px;text-align:center;font-weight:700;color:#15803d;">${site.complianceRate}%</td>
                                        <td style="padding:7px 10px;text-align:center;"><span style="background:${rc}18;color:${rc};padding:2px 8px;border-radius:10px;font-size:0.72rem;font-weight:700;">${site.nonCompliantRate}% ${rl}</span></td>
                                    </tr>`;
                                }).join('') : `<tr><td colspan="5" style="padding:20px;text-align:center;color:#94a3b8;">لا توجد بيانات</td></tr>`}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ══ Row 5: جدول بنود الفحص التفصيلي ══ -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 12px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-table" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">${t('module.periodic.analytics.checkpointTable','جدول بنود الفحص التفصيلي')} (${activePoints.length})</span>
                    </div>
                    <div style="display:flex;gap:6px;font-size:0.72rem;font-weight:700;">
                        <span style="background:#fee2e2;color:#dc2626;padding:2px 8px;border-radius:12px;">${analytics.highRiskPoints} ${t('module.periodic.analytics.highRisk','عالي')}</span>
                        <span style="background:#fef3c7;color:#d97706;padding:2px 8px;border-radius:12px;">${analytics.mediumRiskPoints} ${t('module.periodic.analytics.mediumRisk','متوسط')}</span>
                        <span style="background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:12px;">${analytics.lowRiskPoints} ${t('module.periodic.analytics.lowRisk','سليم')}</span>
                    </div>
                </div>
                <div style="overflow-x:auto;max-height:420px;overflow-y:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.78rem;">
                        <thead style="position:sticky;top:0;z-index:1;">
                            <tr style="background:#1e3a8a;color:#fff;">
                                <th style="padding:8px 10px;text-align:center;font-weight:700;width:36px;">#</th>
                                <th style="padding:8px 10px;text-align:right;font-weight:700;">${t('module.periodic.point','البند')}</th>
                                <th style="padding:8px 10px;text-align:center;font-weight:700;width:70px;">${t('module.periodic.checked','الفحوصات')}</th>
                                <th style="padding:8px 10px;text-align:center;font-weight:700;width:65px;">${t('module.periodic.compliant','مطابق')}</th>
                                <th style="padding:8px 10px;text-align:center;font-weight:700;width:75px;">${t('module.periodic.nonCompliant','غير مطابق')}</th>
                                <th style="padding:8px 10px;text-align:center;font-weight:700;width:90px;">${t('module.periodic.complianceRate','الامتثال')}</th>
                                <th style="padding:8px 10px;text-align:center;font-weight:700;width:80px;">${t('module.periodic.analytics.riskLevel','المستوى')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${activePoints.length ? activePoints.map((p, i) => {
                                const rc = p.nonCompliantRate >= 40 ? '#dc2626' : p.nonCompliantRate >= 20 ? '#d97706' : '#15803d';
                                const rl = p.nonCompliantRate >= 40 ? 'عالي' : p.nonCompliantRate >= 20 ? 'متوسط' : 'منخفض';
                                const cc = p.complianceRate >= 90 ? '#15803d' : p.complianceRate >= 75 ? '#2563eb' : p.complianceRate >= 60 ? '#d97706' : '#dc2626';
                                return `<tr style="background:${i%2===0?'#fff':'#f8fafc'};border-bottom:1px solid #f1f5f9;">
                                    <td style="padding:7px 8px;text-align:center;color:#94a3b8;">${String(i+1).padStart(2,'0')}</td>
                                    <td style="padding:7px 10px;color:#1e293b;line-height:1.4;">${Utils.escapeHTML(p.label)}</td>
                                    <td style="padding:7px 8px;text-align:center;font-weight:700;">${p.total}</td>
                                    <td style="padding:7px 8px;text-align:center;color:#15803d;font-weight:700;">${p.compliant}</td>
                                    <td style="padding:7px 8px;text-align:center;color:#dc2626;font-weight:700;">${p.nonCompliant}</td>
                                    <td style="padding:7px 8px;text-align:center;">
                                        <div style="display:flex;align-items:center;gap:6px;justify-content:center;">
                                            <div style="flex:1;max-width:60px;height:5px;background:#e2e8f0;border-radius:3px;overflow:hidden;"><div style="width:${p.complianceRate}%;height:100%;background:${cc};"></div></div>
                                            <span style="color:${cc};font-weight:700;min-width:32px;">${p.complianceRate}%</span>
                                        </div>
                                    </td>
                                    <td style="padding:7px 8px;text-align:center;"><span style="background:${rc}18;color:${rc};padding:2px 8px;border-radius:10px;font-size:0.7rem;font-weight:700;">${rl}</span></td>
                                </tr>`;
                            }).join('') : `<tr><td colspan="7" style="padding:24px;text-align:center;color:#94a3b8;">لا توجد بيانات</td></tr>`}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        `;
    },

    /**
     * رسم مخططات تحليل المرور اليومي بعد inject الـ HTML (نفس نمط clinic/obs)
     * يُستدعى من refreshCurrentTabContent بعد contentContainer.innerHTML = html
     */
    async _dscDrawCharts() {
        const root = document.getElementById('dsc-analytics-root');
        if (!root) return;

        // ── تحميل Chart.js (من CDN إذا لم يكن محمَّلاً) ──
        if (typeof Chart === 'undefined') {
            await new Promise((resolve) => {
                const existing = document.querySelector('script[src*="chart"]');
                if (existing) {
                    const iv = setInterval(() => { if (typeof Chart !== 'undefined') { clearInterval(iv); resolve(); } }, 150);
                    setTimeout(() => { clearInterval(iv); resolve(); }, 6000);
                    return;
                }
                const s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
                s.onload = () => setTimeout(resolve, 400);
                s.onerror = () => { s.src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'; s.onerror=()=>resolve(); document.head.appendChild(s); };
                document.head.appendChild(s);
            });
        }
        if (typeof Chart === 'undefined') return; // graceful fail

        const allRecords = this.getDailySafetyCheckListRecords();
        const filteredRecords = this._getDailySafetyAnalyticsRecordsByScope('__all__');
        const analytics = this.getDailySafetyAnalytics(filteredRecords);
        const trend = this.getDailySafetyTrend(filteredRecords);
        const weeklyTrend = this.getDailySafetyWeeklyTrend(filteredRecords);
        const controls = this.state.dailySafetyAnalyticsControls || { topN: 18, rankingMetric: 'nonCompliantRate' };
        const topN = Math.max(3, Math.min(20, Number(controls.topN || 10)));
        const topInspectors = analytics.inspectorList.slice(0, topN);
        const topSites = analytics.siteList.slice(0, topN);
        const points = [...analytics.points];
        if (controls.rankingMetric === 'complianceRate') points.sort((a,b) => b.complianceRate - a.complianceRate);
        else if (controls.rankingMetric === 'nonCompliantCount') points.sort((a,b) => b.nonCompliant - a.nonCompliant);
        else points.sort((a,b) => b.nonCompliantRate - a.nonCompliantRate);
        const worstPoints = points.filter(p => p.total > 0);

        if (!this._dscCharts) this._dscCharts = {};
        const _chart = (id, config) => {
            const canvas = document.getElementById(id);
            const emptyEl = document.getElementById(id + '-empty');
            if (!canvas) return;
            try { if (this._dscCharts[id]) { this._dscCharts[id].destroy(); delete this._dscCharts[id]; } } catch(e) {}
            this._dscCharts[id] = new Chart(canvas, config);
            if (emptyEl) emptyEl.style.display = 'none';
            canvas.style.display = '';
        };
        const _empty = (id) => {
            const canvas = document.getElementById(id);
            const emptyEl = document.getElementById(id + '-empty');
            if (canvas) canvas.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
        };

        // 1) Shift distribution — Doughnut
        const shiftMap = { 'الأولى': 0, 'الثانية': 0, 'الثالثة': 0 };
        filteredRecords.forEach(r => { if (r.shift in shiftMap) shiftMap[r.shift]++; });
        const sValues = Object.values(shiftMap);
        if (sValues.reduce((a,b) => a+b, 0) > 0) {
            _chart('dsc-chart-shift', {
                type: 'doughnut',
                data: { labels: ['الوردية الأولى','الوردية الثانية','الوردية الثالثة'], datasets: [{ data: sValues, backgroundColor: ['rgba(22,163,74,0.85)','rgba(234,88,12,0.85)','rgba(124,58,237,0.85)'], borderWidth: 2, borderColor: '#fff', hoverOffset: 6 }] },
                options: { responsive: true, maintainAspectRatio: false, cutout: '58%', plugins: { legend: { position: 'bottom', labels: { padding: 10, font: { size: 11 }, usePointStyle: true, boxWidth: 9 } }, tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}` } } } }
            });
        } else _empty('dsc-chart-shift');

        // 2) Trend — bar + line (نفس نمط clinic._cTrend)
        const arabicMonths = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
        const now = new Date();
        const months12 = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months12.push({ y: d.getFullYear(), m: d.getMonth(), label: `${arabicMonths[d.getMonth()]} ${d.getFullYear()}` });
        }
        const trendCounts = months12.map(mo => filteredRecords.filter(r => {
            const d = new Date(r.date || r.createdAt || '');
            return !isNaN(d.getTime()) && d.getFullYear() === mo.y && d.getMonth() === mo.m;
        }).length);
        const trendCompRate = months12.map((mo, i) => {
            const monthRec = filteredRecords.filter(r => {
                const d = new Date(r.date || r.createdAt || '');
                return !isNaN(d.getTime()) && d.getFullYear() === mo.y && d.getMonth() === mo.m;
            });
            const sub = this.getDailySafetyAnalytics(monthRec);
            return sub.complianceRate;
        });
        if (trendCounts.reduce((a,b) => a+b, 0) > 0) {
            _chart('dsc-chart-trend', {
                type: 'bar',
                data: { labels: months12.map(m => m.label), datasets: [
                    { label: 'السجلات', data: trendCounts, backgroundColor: trendCounts.map(c => c === Math.max(...trendCounts) ? 'rgba(37,99,235,0.9)' : 'rgba(37,99,235,0.5)'), borderRadius: 4, borderSkipped: false, order: 1 },
                    { label: 'المطابقة%', data: trendCompRate, type: 'line', borderColor: 'rgba(22,163,74,0.9)', backgroundColor: 'rgba(22,163,74,0.07)', borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: '#16a34a', tension: 0.4, fill: true, yAxisID: 'y2', order: 0 }
                ]},
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { usePointStyle: true, font: { size: 11 } } }, tooltip: { mode: 'index', intersect: false } },
                    scales: { x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 40 } }, y: { beginAtZero: true, position: 'right', ticks: { precision: 0, font: { size: 11 } }, grid: { color: '#f8fafc' } }, y2: { beginAtZero: true, max: 100, position: 'left', ticks: { font: { size: 11 }, callback: v => v + '%' }, grid: { display: false } } } }
            });
        } else _empty('dsc-chart-trend');

        // 3) Inspector ranking — Horizontal Bar
        if (topInspectors.length > 0) {
            _chart('dsc-chart-inspectors', {
                type: 'bar',
                data: { labels: topInspectors.map(i => i.name), datasets: [{ data: topInspectors.map(i => i.count), backgroundColor: 'rgba(22,163,74,0.72)', borderRadius: 5, borderSkipped: false }] },
                options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.x} سجل` } } },
                    scales: { x: { beginAtZero: true, ticks: { precision: 0, font: { size: 11 } }, grid: { color: '#f1f5f9' } }, y: { ticks: { font: { size: 11 }, callback: v => { const lbl = topInspectors[v]?.name || ''; return lbl.length > 18 ? lbl.slice(0, 17) + '…' : lbl; } } } } }
            });
        } else _empty('dsc-chart-inspectors');

        // 4) Sites distribution — Horizontal Bar
        if (topSites.length > 0) {
            _chart('dsc-chart-sites', {
                type: 'bar',
                data: { labels: topSites.map(s => s.name), datasets: [{ data: topSites.map(s => s.count), backgroundColor: 'rgba(14,165,233,0.72)', borderRadius: 5, borderSkipped: false }] },
                options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.x} سجل` } } },
                    scales: { x: { beginAtZero: true, ticks: { precision: 0, font: { size: 11 } }, grid: { color: '#f1f5f9' } }, y: { ticks: { font: { size: 11 }, callback: v => { const lbl = topSites[v]?.name || ''; return lbl.length > 18 ? lbl.slice(0, 17) + '…' : lbl; } } } } }
            });
        } else _empty('dsc-chart-sites');

        // 5) Compliance by checkpoint — Horizontal Bar (color-coded by risk)
        const cpPoints = worstPoints;
        if (cpPoints.length > 0) {
            const cpColors = cpPoints.map(p => p.nonCompliantRate >= 40 ? 'rgba(220,38,38,0.78)' : p.nonCompliantRate >= 20 ? 'rgba(217,119,6,0.78)' : 'rgba(22,163,74,0.78)');
            _chart('dsc-chart-compliance', {
                type: 'bar',
                data: { labels: cpPoints.map((p, i) => `${String(i+1).padStart(2,'0')} ${p.label.length > 35 ? p.label.slice(0,33)+'…' : p.label}`),
                    datasets: [
                        { label: 'نسبة المطابقة%', data: cpPoints.map(p => p.complianceRate), backgroundColor: cpColors.map(c => c.replace('0.78','0.2')), borderColor: cpColors, borderWidth: 1.5, borderRadius: 4, borderSkipped: false }
                    ]
                },
                options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => { const p = cpPoints[ctx.dataIndex]; return ` المطابقة: ${p.complianceRate}% | غير مطابق: ${p.nonCompliant}/${p.total}`; } } } },
                    scales: {
                        x: { beginAtZero: true, max: 100, ticks: { font: { size: 10 }, callback: v => v + '%' }, grid: { color: '#f1f5f9' } },
                        y: { ticks: { font: { size: 10 } } }
                    }
                }
            });
        } else _empty('dsc-chart-compliance');

        // 6) Shift compliance — grouped bar
        const shiftStats = analytics.shiftStats || [];
        if (shiftStats.length > 0) {
            const shiftLabels = shiftStats.map(s => this._formatDailyShiftLabel(s.name));
            _chart('dsc-chart-shift-compliance', {
                type: 'bar',
                data: { labels: shiftLabels, datasets: [
                    { label: 'نسبة الامتثال%', data: shiftStats.map(s => s.complianceRate), backgroundColor: 'rgba(22,163,74,0.75)', borderRadius: 5, borderSkipped: false },
                    { label: 'معدل الخطر%', data: shiftStats.map(s => s.nonCompliantRate), backgroundColor: 'rgba(220,38,38,0.65)', borderRadius: 5, borderSkipped: false }
                ]},
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { usePointStyle: true, font: { size: 11 } } } },
                    scales: { x: { grid: { display: false }, ticks: { font: { size: 10 } } }, y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%', font: { size: 10 } }, grid: { color: '#f1f5f9' } } } }
            });
        } else _empty('dsc-chart-shift-compliance');

        // 7) Weekly trend — bar + line
        const weekHasData = weeklyTrend.some(w => w.records > 0);
        if (weekHasData) {
            _chart('dsc-chart-weekly', {
                type: 'bar',
                data: { labels: weeklyTrend.map(w => w.label), datasets: [
                    { label: 'السجلات', data: weeklyTrend.map(w => w.records), backgroundColor: 'rgba(99,102,241,0.65)', borderRadius: 4, borderSkipped: false, order: 1 },
                    { label: 'الامتثال%', data: weeklyTrend.map(w => w.complianceRate), type: 'line', borderColor: 'rgba(22,163,74,0.9)', backgroundColor: 'rgba(22,163,74,0.08)', borderWidth: 2.5, pointRadius: 4, tension: 0.35, fill: true, yAxisID: 'y2', order: 0 }
                ]},
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { usePointStyle: true, font: { size: 11 } } } },
                    scales: { x: { grid: { display: false }, ticks: { font: { size: 10 } } }, y: { beginAtZero: true, position: 'right', ticks: { precision: 0, font: { size: 10 } }, grid: { color: '#f8fafc' } }, y2: { beginAtZero: true, max: 100, position: 'left', ticks: { callback: v => v + '%', font: { size: 10 } }, grid: { display: false } } } }
            });
        } else _empty('dsc-chart-weekly');

        // 8) Site compliance ranking — horizontal bar (by non-compliance rate)
        const siteStatsTop = (analytics.siteStats || []).slice(0, topN).filter(s => s.totalAnswers > 0);
        if (siteStatsTop.length > 0) {
            const siteColors = siteStatsTop.map(s => s.nonCompliantRate >= 40 ? 'rgba(220,38,38,0.78)' : s.nonCompliantRate >= 20 ? 'rgba(217,119,6,0.78)' : 'rgba(22,163,74,0.78)');
            _chart('dsc-chart-site-compliance', {
                type: 'bar',
                data: { labels: siteStatsTop.map(s => s.name), datasets: [{ label: 'معدل الخطر%', data: siteStatsTop.map(s => s.nonCompliantRate), backgroundColor: siteColors, borderRadius: 5, borderSkipped: false }] },
                options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => { const s = siteStatsTop[ctx.dataIndex]; return ` خطورة: ${s.nonCompliantRate}% | امتثال: ${s.complianceRate}% | ${s.count} سجل`; } } } },
                    scales: { x: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%', font: { size: 10 } }, grid: { color: '#f1f5f9' } }, y: { ticks: { font: { size: 11 }, callback: v => { const lbl = siteStatsTop[v]?.name || ''; return lbl.length > 20 ? lbl.slice(0, 19) + '…' : lbl; } } } } }
            });
        } else _empty('dsc-chart-site-compliance');

        // 9) Non-compliant monthly trend — line chart
        const trendNonComp = months12.map((mo) => {
            const monthRec = filteredRecords.filter(r => {
                const d = new Date(r.date || r.createdAt || '');
                return !isNaN(d.getTime()) && d.getFullYear() === mo.y && d.getMonth() === mo.m;
            });
            return this.getDailySafetyAnalytics(monthRec).overallNonCompliant;
        });
        if (trendNonComp.reduce((a, b) => a + b, 0) > 0) {
            _chart('dsc-chart-noncompliant-trend', {
                type: 'line',
                data: { labels: months12.map(m => m.label), datasets: [
                    { label: 'غير مطابق', data: trendNonComp, borderColor: 'rgba(220,38,38,0.9)', backgroundColor: 'rgba(220,38,38,0.1)', borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: '#dc2626', tension: 0.35, fill: true }
                ]},
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y} ملاحظة غير مطابقة` } } },
                    scales: { x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 40 } }, y: { beginAtZero: true, ticks: { precision: 0, font: { size: 10 } }, grid: { color: '#f1f5f9' } } } }
            });
        } else _empty('dsc-chart-noncompliant-trend');
    },

    async exportDailySafetyAnalyticsPDF(scopeInspector = '__all__') {
        const t = (key, fallback) => this._t(key, fallback);
        const records = this._getDailySafetyAnalyticsRecordsByScope(scopeInspector);
        if (!records.length) {
            Notification.warning(t('module.periodic.dsc.noRecordsToExport', 'لا توجد سجلات لتصديرها'));
            return;
        }

        try {
            const analytics = this.getDailySafetyAnalytics(records);
            const trend     = this.getDailySafetyTrend(records);
            const inspectorLabel = (scopeInspector && scopeInspector !== '__all__') ? scopeInspector : 'الكل';
            const isPersonReport = (scopeInspector && scopeInspector !== '__all__');
            const now = new Date();
            const dateLabel = now.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
            const formCode  = `DSC-AN-${now.toISOString().slice(0,10).replace(/-/g,'')}`;
            const formTitle = 'تقرير تحليل المرور اليومي للسلامة';

            // ── colour helpers (inline only — no class names) ─────────────────
            const riskColor  = r => r >= 40 ? '#b91c1c' : r >= 20 ? '#b45309' : '#15803d';
            const riskBgCol  = r => r >= 40 ? '#fff1f2' : r >= 20 ? '#fffbeb' : '#f0fdf4';
            const riskBorder = r => r >= 40 ? '#fca5a5' : r >= 20 ? '#fde68a' : '#bbf7d0';
            const riskLbl    = r => r >= 40 ? 'عالي' : r >= 20 ? 'متوسط' : 'منخفض';
            const compColor  = r => r >= 90 ? '#15803d' : r >= 75 ? '#1d4ed8' : r >= 60 ? '#b45309' : '#b91c1c';
            const compLbl    = r => r >= 90 ? 'ممتاز' : r >= 75 ? 'جيد' : r >= 60 ? 'مقبول' : 'ضعيف';
            const TH = (txt, extra='') =>
                `<th style="padding:7px 9px;font-weight:700;text-align:right;background:#1e3a8a;color:#ffffff;border:1px solid #2563eb;${extra}">${txt}</th>`;
            const rowBg = i => i % 2 === 0 ? '#f8fafc' : '#ffffff';

            // ── KPI tiles ─────────────────────────────────────────────────────
            const shift1 = analytics.shiftList.find(s => s.name === 'الأولى')?.count || 0;
            const shift2 = analytics.shiftList.find(s => s.name === 'الثانية')?.count || 0;
            const shift3 = analytics.shiftList.find(s => s.name === 'الثالثة')?.count || 0;
            const kpiDefs = [
                { lbl:'إجمالي السجلات',    val: analytics.totalRecords,          bg:'#eff6ff', clr:'#1d4ed8', bdr:'#93c5fd' },
                { lbl:'نسبة المطابقة',     val: analytics.complianceRate+'%',    bg:'#f0fdf4', clr: compColor(analytics.complianceRate), bdr:'#86efac' },
                { lbl:'إجمالي غير المطابق',val: analytics.overallNonCompliant,  bg:'#fff1f2', clr:'#b91c1c', bdr:'#fca5a5' },
                { lbl:'نقاط الفحص',        val: analytics.overallPointsTotal,    bg:'#eef2ff', clr:'#4338ca', bdr:'#a5b4fc' },
                { lbl:'الوردية الأولى',    val: shift1,                           bg:'#fefce8', clr:'#a16207', bdr:'#fde68a' },
                { lbl:'الوردية الثانية/3', val: shift2+shift3,                   bg:'#faf5ff', clr:'#7e22ce', bdr:'#d8b4fe' },
            ];
            const kpiTiles = kpiDefs.map(k =>
                `<td style="width:${Math.floor(100/kpiDefs.length)}%;padding:4px;">
                    <div style="background:${k.bg};border:1px solid ${k.bdr};border-radius:6px;padding:9px 8px;text-align:center;">
                        <div style="font-size:22px;font-weight:900;color:${k.clr};line-height:1;">${k.val}</div>
                        <div style="font-size:9px;color:#475569;margin-top:4px;">${k.lbl}</div>
                    </div>
                </td>`).join('');

            // ── Checkpoint rows (PAGE 1) ──────────────────────────────────────
            const pointRows = analytics.points
                .filter(p => p.total > 0)
                .sort((a,b) => b.nonCompliantRate - a.nonCompliantRate)
                .map((p, i) => {
                    const rc = riskColor(p.nonCompliantRate);
                    const rb = riskBgCol(p.nonCompliantRate);
                    const rbd= riskBorder(p.nonCompliantRate);
                    const cc = compColor(p.complianceRate);
                    const barW = Math.max(2, p.complianceRate);
                    return `<tr style="background:${rowBg(i)};">
                        <td style="padding:5px 7px;color:#94a3b8;font-size:9px;border:1px solid #f1f5f9;text-align:center;">${i+1}</td>
                        <td style="padding:5px 7px;font-size:10px;border:1px solid #f1f5f9;line-height:1.4;">${Utils.escapeHTML(p.label)}</td>
                        <td style="padding:5px 7px;text-align:center;font-weight:700;border:1px solid #f1f5f9;">${p.total}</td>
                        <td style="padding:5px 7px;text-align:center;color:#15803d;font-weight:700;border:1px solid #f1f5f9;">${p.compliant}</td>
                        <td style="padding:5px 7px;text-align:center;color:#b91c1c;font-weight:700;border:1px solid #f1f5f9;">${p.nonCompliant}</td>
                        <td style="padding:5px 7px;border:1px solid #f1f5f9;min-width:80px;">
                            <div style="height:5px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:2px;">
                                <div style="width:${barW}%;height:100%;background:${cc};border-radius:3px;"></div>
                            </div>
                            <div style="font-size:9px;color:${cc};font-weight:700;text-align:center;">${p.complianceRate}% — ${compLbl(p.complianceRate)}</div>
                        </td>
                        <td style="padding:5px 7px;text-align:center;border:1px solid ${rbd};background:${rb};">
                            <span style="color:${rc};font-size:9px;font-weight:700;">${riskLbl(p.nonCompliantRate)}</span>
                        </td>
                    </tr>`;
                }).join('');

            // ── Trend rows (PAGE 2) ───────────────────────────────────────────
            const trendMax = Math.max(1, ...trend.map(r => r.records));
            const trendRows = trend.map((r, i) => {
                const cc = compColor(r.complianceRate);
                const bw = Math.max(2, Math.round((r.records / trendMax) * 100));
                return `<tr style="background:${rowBg(i)};">
                    <td style="padding:5px 8px;font-weight:600;border:1px solid #f1f5f9;">${Utils.escapeHTML(r.month)}</td>
                    <td style="padding:5px 8px;text-align:center;font-weight:700;color:#1d4ed8;border:1px solid #f1f5f9;">${r.records}</td>
                    <td style="padding:5px 8px;border:1px solid #f1f5f9;min-width:90px;">
                        <div style="height:5px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                            <div style="width:${bw}%;height:100%;background:#2563eb;border-radius:3px;"></div>
                        </div>
                    </td>
                    <td style="padding:5px 8px;text-align:center;border:1px solid #f1f5f9;">
                        <span style="color:${cc};font-weight:700;">${r.complianceRate}%</span>
                        <span style="font-size:8px;background:${riskBgCol(100-r.complianceRate)};color:${cc};padding:1px 4px;border-radius:3px;margin-right:3px;">${compLbl(r.complianceRate)}</span>
                    </td>
                    <td style="padding:5px 8px;text-align:center;color:${riskColor(r.nonCompliantRate)};font-weight:700;border:1px solid #f1f5f9;">${r.nonCompliantRate}%</td>
                </tr>`;
            }).join('');

            // ── Inspector rows (PAGE 2) ───────────────────────────────────────
            const inspList  = analytics.inspectorList.slice(0, 10);
            const maxInsp   = Math.max(1, ...inspList.map(i => i.count));
            const totInsp   = inspList.reduce((s, i) => s + i.count, 0) || 1;
            const inspRows  = inspList.map((item, i) => {
                const bw = Math.round((item.count / maxInsp) * 100);
                const sh = Math.round((item.count / totInsp) * 100);
                return `<tr style="background:${rowBg(i)};">
                    <td style="padding:5px 8px;color:#94a3b8;font-size:9px;text-align:center;border:1px solid #f1f5f9;">${i+1}</td>
                    <td style="padding:5px 8px;font-weight:600;border:1px solid #f1f5f9;">${Utils.escapeHTML(item.name || '-')}</td>
                    <td style="padding:5px 8px;text-align:center;font-weight:700;color:#1d4ed8;border:1px solid #f1f5f9;">${item.count}</td>
                    <td style="padding:5px 8px;border:1px solid #f1f5f9;min-width:90px;">
                        <div style="height:5px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                            <div style="width:${bw}%;height:100%;background:#16a34a;border-radius:3px;"></div>
                        </div>
                    </td>
                    <td style="padding:5px 8px;text-align:center;color:#64748b;border:1px solid #f1f5f9;">${sh}%</td>
                </tr>`;
            }).join('');

            // ── Scope banner ──────────────────────────────────────────────────
            const scopeBanner = isPersonReport
                ? `<div style="padding:9px 14px;background:#eff6ff;border:1px solid #93c5fd;border-radius:6px;margin-bottom:12px;">
                       <span style="font-size:10px;color:#475569;">القائم بالمرور: </span>
                       <span style="font-size:14px;font-weight:900;color:#1d4ed8;">${Utils.escapeHTML(inspectorLabel)}</span>
                       <span style="float:left;font-size:10px;color:#64748b;">${dateLabel}</span>
                   </div>`
                : `<div style="padding:7px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:12px;font-size:10px;color:#64748b;">
                       نطاق التقرير: <strong style="color:#1e293b;">جميع القائمين بالمرور</strong>
                       <span style="float:left;">${dateLabel}</span>
                   </div>`;

            const sTitle = (icon, txt) =>
                `<div style="font-size:11px;font-weight:700;color:#1e40af;padding:5px 9px;background:#eff6ff;border-right:3px solid #1e40af;border-radius:3px;margin:12px 0 7px;">${icon} ${txt}</div>`;

            // ── PAGE 1 content ────────────────────────────────────────────────
            const page1 = `
                ${scopeBanner}
                ${sTitle('', 'مؤشرات الأداء الرئيسية')}
                <table style="width:100%;border-collapse:collapse;margin-bottom:12px;"><tbody><tr>${kpiTiles}</tr></tbody></table>

                ${sTitle('', 'تحليل نقاط الفحص — مرتبة حسب مستوى الخطر')}
                <table style="width:100%;border-collapse:collapse;font-size:10px;">
                    <thead><tr>
                        ${TH('#','width:26px;text-align:center;')}
                        ${TH('البند')}
                        ${TH('الفحوصات','text-align:center;width:55px;')}
                        ${TH('مطابق','text-align:center;width:55px;')}
                        ${TH('غير مطابق','text-align:center;width:60px;')}
                        ${TH('الامتثال','width:105px;')}
                        ${TH('الخطر','text-align:center;width:55px;')}
                    </tr></thead>
                    <tbody>${pointRows || `<tr><td colspan="7" style="text-align:center;padding:10px;color:#94a3b8;">لا توجد بيانات</td></tr>`}</tbody>
                </table>`;

            // ── PAGE 2 content ────────────────────────────────────────────────
            const page2Parts = [];
            if (trend.length > 0) {
                page2Parts.push(`
                    ${sTitle('', 'الاتجاه الزمني — آخر 12 شهر')}
                    <table style="width:100%;border-collapse:collapse;font-size:10px;">
                        <thead><tr>
                            ${TH('الشهر')}
                            ${TH('السجلات','text-align:center;width:60px;')}
                            ${TH('الحجم النسبي','width:100px;')}
                            ${TH('نسبة المطابقة','text-align:center;width:140px;')}
                            ${TH('معدل الخطر','text-align:center;width:70px;')}
                        </tr></thead>
                        <tbody>${trendRows}</tbody>
                    </table>`);
            }
            if (!isPersonReport && inspList.length > 0) {
                page2Parts.push(`
                    ${sTitle('', 'أنشط القائمين بالمرور')}
                    <table style="width:100%;border-collapse:collapse;font-size:10px;">
                        <thead><tr>
                            ${TH('#','width:26px;text-align:center;')}
                            ${TH('الاسم')}
                            ${TH('عدد التقارير','text-align:center;width:80px;')}
                            ${TH('النشاط النسبي','width:100px;')}
                            ${TH('الحصة','text-align:center;width:60px;')}
                        </tr></thead>
                        <tbody>${inspRows}</tbody>
                    </table>`);
            }

            const page2 = page2Parts.length > 0
                ? `<div class="dsc-page2">${page2Parts.join('')}</div>`
                : '';

            // ── Assemble full content ─────────────────────────────────────────
            // ✅ ANALYTICS OVERRIDE: يلغي flex-layout الأحادي الصفحة من
            //    _getDailySafetyCompactFooterStyle() الذي يضع min-height:100vh
            //    على .report-wrapper ويجعل body flex — هذا يكسر pagination
            //    في تقارير متعددة الصفحات ويسبب فراغات أو تداخل صفحات خاطئ.
            //    نحتاج normal document flow حتى يتحكم @page بفواصل الصفحات.
            const analyticsLayoutOverride = `
                <style id="dsc-analytics-layout-override">
                    /* Reset: الغاء flex layout للتقارير متعددة الصفحات */
                    html, body {
                        min-height: 0 !important;
                        height: auto !important;
                        display: block !important;
                    }
                    body {
                        flex-direction: unset !important;
                        font-family: Tahoma, 'Arial Unicode MS', Arial, sans-serif !important;
                    }
                    .report-wrapper {
                        display: block !important;
                        flex: none !important;
                        min-height: 0 !important;
                        height: auto !important;
                        padding-bottom: 0 !important;
                    }
                    .report-body {
                        flex: none !important;
                        min-height: 0 !important;
                    }
                    .report-footer {
                        margin-top: 18px !important;
                        padding-top: 6px !important;
                    }
                    /* @page: A4 portrait مع هوامش مناسبة */
                    @page {
                        size: A4 portrait !important;
                        margin: 10mm 8mm !important;
                    }
                    @media print {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                    /* لا تقطع الجداول داخل سطر واحد */
                    tr  { page-break-inside: avoid !important; break-inside: avoid !important; }
                    /* الصفحة الثانية تبدأ دائماً على ورقة جديدة */
                    .dsc-page2 {
                        page-break-before: always !important;
                        break-before: page !important;
                        padding-top: 4px;
                    }
                    * { box-sizing: border-box; }
                </style>
            `;

            const content = `
                ${analyticsLayoutOverride}
                ${page1}
                ${page2}
            `;

            // ── Wrap with FormHeader (شعار + هيدر + فوتر رسمي) ───────────────
            // نمرر _getDailySafetyCompactFooterStyle() أولاً ثم analyticsLayoutOverride
            // داخل content — لأن CSS الأخير يفوز في ترتيب التتالي (cascade order)
            const rawHtml = (typeof FormHeader !== 'undefined' && typeof FormHeader.generatePDFHTML === 'function')
                ? FormHeader.generatePDFHTML(
                    formCode, formTitle,
                    this._getDailySafetyCompactFooterStyle() + content,
                    false, false,
                    { source:'DailySafetyAnalytics', titleEn:'Daily Safety — Analytics Report', titleAr:'تحليل المرور اليومي للسلامة' },
                    now.toISOString(), now.toISOString()
                )
                : `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${formTitle}</title></head><body style="font-family:Tahoma,Arial,sans-serif;">${content}</body></html>`;

            // ✅ استخدام window.open + print() بدلاً من html2canvas
            // → يعالج النصوص العربية بشكل صحيح (browser native shaping)
            // → لا بكسلة، لا كسر في الحروف، لا مشاكل ligatures
            const blob = new Blob([rawHtml], { type: 'text/html;charset=utf-8' });
            const url  = URL.createObjectURL(blob);
            const win  = window.open(url, '_blank');

            if (win) {
                win.addEventListener('load', () => {
                    // انتظر تحميل الخطوط قبل الطباعة
                    const doPrint = () => { setTimeout(() => { win.print(); setTimeout(() => URL.revokeObjectURL(url), 1500); }, 400); };
                    if (win.document && win.document.fonts && win.document.fonts.ready) {
                        win.document.fonts.ready.then(doPrint).catch(doPrint);
                    } else {
                        doPrint();
                    }
                });
                Notification.success(t('module.periodic.analytics.exportPdfSuccess', 'تم فتح نافذة التقرير — اختر "حفظ كـ PDF"'));
            } else {
                Notification.error('يرجى السماح للنوافذ المنبثقة لعرض التقرير');
                URL.revokeObjectURL(url);
            }
        } catch (err) {
            Utils.safeError('❌ خطأ في تصدير تقرير تحليل المرور اليومي:', err);
            Notification.error(t('module.periodic.analytics.exportPdfError', 'تعذر تصدير تقرير التحليل PDF'));
        }
    },

    exportDailySafetyAnalyticsExcel(scopeInspector = '__all__') {
        const t = (key, fallback) => this._t(key, fallback);
        const records = this._getDailySafetyAnalyticsRecordsByScope(scopeInspector);
        if (!records.length) {
            Notification.warning(t('module.periodic.dsc.noRecordsToExport', 'لا توجد سجلات لتصديرها'));
            return;
        }
        const analytics = this.getDailySafetyAnalytics(records);
        const rows = analytics.points.map((p) => [p.label, p.total, p.compliant, p.nonCompliant, `${p.nonCompliantRate}%`]);
        const header = [t('module.periodic.point', 'النقطة'), t('module.periodic.checked', 'المرات المفحوصة'), t('module.periodic.compliant', 'مطابق'), t('module.periodic.nonCompliant', 'غير مطابق'), t('module.periodic.riskRate', 'معدل الخطورة')];
        const csvContent = '\uFEFF' + [header.join('\t'), ...rows.map((r) => r.join('\t'))].join('\r\n');
        const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const inspectorLabel = (scopeInspector && scopeInspector !== '__all__') ? scopeInspector : t('module.periodic.analytics.exportAll', 'الكل');
        link.download = this._buildDailySafetyFileName({ ext: 'xls', dateValue: new Date().toISOString(), shiftValue: inspectorLabel, full: true });
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        Notification.success(t('module.periodic.analytics.exportExcelSuccess', 'تم تصدير تقرير التحليل Excel بنجاح'));
    },

    bindDailySafetyCheckListTableEvents() {
        const addBtn = document.getElementById('daily-safety-checklist-add-btn');
        if (addBtn) {
            const newBtn = addBtn.cloneNode(true);
            addBtn.parentNode.replaceChild(newBtn, addBtn);
            newBtn.addEventListener('click', () => this.showDailySafetyCheckListForm(null));
        }
        const excelBtn = document.getElementById('daily-safety-checklist-export-excel-btn');
        if (excelBtn) {
            const excelBtnNew = excelBtn.cloneNode(true);
            excelBtn.parentNode.replaceChild(excelBtnNew, excelBtn);
            excelBtnNew.addEventListener('click', () => this.exportDailySafetyCheckListFullExcel());
        }
        const pdfBtn = document.getElementById('daily-safety-checklist-export-pdf-btn');
        if (pdfBtn) {
            const pdfBtnNew = pdfBtn.cloneNode(true);
            pdfBtn.parentNode.replaceChild(pdfBtnNew, pdfBtn);
            pdfBtnNew.addEventListener('click', () => this.exportDailySafetyCheckListFullPDF());
        }

        const updateFilterState = () => {
            this.state.dailySafetyFilters.search = (document.getElementById('dsc-filter-search')?.value || '').trim();
            this.state.dailySafetyFilters.siteId = document.getElementById('dsc-filter-site')?.value || '';
            this.state.dailySafetyFilters.inspectorName = document.getElementById('dsc-filter-inspector')?.value || '';
            this.state.dailySafetyFilters.shift = document.getElementById('dsc-filter-shift')?.value || '';
            this.state.dailySafetyFilters.dateFrom = document.getElementById('dsc-filter-date-from')?.value || '';
            this.state.dailySafetyFilters.dateTo = document.getElementById('dsc-filter-date-to')?.value || '';
        };
        const onFilterChange = () => {
            updateFilterState();
            this.refreshCurrentTabContent();
        };
        ['dsc-filter-search', 'dsc-filter-site', 'dsc-filter-inspector', 'dsc-filter-shift', 'dsc-filter-date-from', 'dsc-filter-date-to']
            .forEach((id) => {
                const el = document.getElementById(id);
                if (!el) return;
                const eventName = el.tagName === 'INPUT' && el.type === 'text' ? 'input' : 'change';
                el.addEventListener(eventName, onFilterChange);
            });

        const resetBtn = document.getElementById('dsc-filter-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.state.dailySafetyFilters = { search: '', siteId: '', inspectorName: '', shift: '', dateFrom: '', dateTo: '' };
                this._dscPeriod = '0';
                this.refreshCurrentTabContent();
            });
        }

        const listFilterToggleBtn = document.getElementById('dsc-list-toggle-filters-btn');
        if (listFilterToggleBtn) {
            listFilterToggleBtn.addEventListener('click', () => {
                this.state.dailySafetyFilterPanelOpen = !this.state.dailySafetyFilterPanelOpen;
                this.refreshCurrentTabContent();
            });
        }

        document.querySelectorAll('.dsc-filter-chip-remove').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const key = btn.getAttribute('data-filter-key');
                if (!key) return;
                this._clearDailySafetyFilterKey(key);
                this.refreshCurrentTabContent();
            });
        });

        document.querySelectorAll('.dsc-list-period-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const v = btn.getAttribute('data-period') || '0';
                this._dscPeriod = v;
                if (v === '0') {
                    this.state.dailySafetyFilters.dateFrom = '';
                    this.state.dailySafetyFilters.dateTo = '';
                } else {
                    const days = parseInt(v, 10);
                    const d = new Date();
                    d.setDate(d.getDate() - days);
                    this.state.dailySafetyFilters.dateFrom = d.toISOString().slice(0, 10);
                    this.state.dailySafetyFilters.dateTo = '';
                }
                this.refreshCurrentTabContent();
            });
        });

        const topNEl = document.getElementById('dsc-analytics-topn');
        if (topNEl) {
            topNEl.addEventListener('change', () => {
                const val = Number(topNEl.value || 10);
                this.state.dailySafetyAnalyticsControls.topN = Number.isFinite(val) ? val : 10;
                this.refreshCurrentTabContent();
            });
        }
        const rankingEl = document.getElementById('dsc-analytics-ranking');
        if (rankingEl) {
            rankingEl.addEventListener('change', () => {
                this.state.dailySafetyAnalyticsControls.rankingMetric = rankingEl.value || 'nonCompliantRate';
                this.refreshCurrentTabContent();
            });
        }

        const cardStyleEl = document.getElementById('dsc-analytics-card-style');
        if (cardStyleEl) {
            cardStyleEl.addEventListener('change', () => {
                this.state.dailySafetyAnalyticsControls.cardStyle = cardStyleEl.value || 'gradient';
                this.refreshCurrentTabContent();
            });
        }
        const barStyleEl = document.getElementById('dsc-analytics-bar-style');
        if (barStyleEl) {
            barStyleEl.addEventListener('change', () => {
                this.state.dailySafetyAnalyticsControls.barStyle = barStyleEl.value || 'rounded';
                this.refreshCurrentTabContent();
            });
        }
        const exportPdfBtn = document.getElementById('dsc-analytics-export-pdf-btn');
        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', () => {
                const scope = document.getElementById('dsc-analytics-export-inspector')?.value || '__all__';
                this.exportDailySafetyAnalyticsPDF(scope);
            });
        }
        const exportExcelBtn = document.getElementById('dsc-analytics-export-excel-btn');
        if (exportExcelBtn) {
            exportExcelBtn.addEventListener('click', () => {
                const scope = document.getElementById('dsc-analytics-export-inspector')?.value || '__all__';
                this.exportDailySafetyAnalyticsExcel(scope);
            });
        }

        // ✅ أزرار الفترة الزمنية (نمط موحد مع العيادة والملاحظات)
        document.querySelectorAll('.dsc-an-period-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const v = btn.getAttribute('data-period') || '0';
                this._dscPeriod = v;
                // تحديث حالة الفلاتر: حساب dateFrom / dateTo من الفترة المختارة
                if (v === '0') {
                    this.state.dailySafetyFilters.dateFrom = '';
                    this.state.dailySafetyFilters.dateTo = '';
                } else {
                    const days = parseInt(v, 10);
                    const d = new Date();
                    d.setDate(d.getDate() - days);
                    this.state.dailySafetyFilters.dateFrom = d.toISOString().slice(0, 10);
                    this.state.dailySafetyFilters.dateTo = '';
                }
                this.refreshCurrentTabContent();
            });
        });

        // ✅ زر إظهار/إخفاء لوحة الفلاتر (نمط موحد)
        const filterToggleBtn = document.getElementById('dsc-an-toggle-filters-btn');
        if (filterToggleBtn) {
            filterToggleBtn.addEventListener('click', () => {
                const panel = document.getElementById('dsc-an-filter-panel');
                if (!panel) return;
                const isHidden = panel.style.display === 'none' || !panel.style.display;
                panel.style.display = isHidden ? 'block' : 'none';
            });
        }

        // ✅ زر التحديث — يُجبر إعادة جلب البيانات من الخادم
        const refreshBtn = document.getElementById('dsc-an-refresh-btn');
        if (refreshBtn) {
            const icon = refreshBtn.querySelector('i');
            refreshBtn.addEventListener('click', () => {
                if (icon) { icon.style.transition='transform 0.5s'; icon.style.transform='rotate(360deg)'; setTimeout(()=>{icon.style.transform='';},500); }
                // إجبار إعادة الجلب: نُلغي علامة "محمَّل" ثم نُعيد الرسم (سيجلب من جديد)
                this._dscDataLoadedOnce = false;
                this.refreshCurrentTabContent();
            });
        }
    },

    /**
     * تصدير سجل Daily Safety Check List بالكامل إلى Excel
     */
    getJsPdfCtor() {
        if (window.jsPDF && window.jsPDF.jsPDF) return window.jsPDF.jsPDF;
        if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
        return null;
    },

    async ensureJsPdfReadyForDailySafetyExport() {
        if (this.getJsPdfCtor()) return true;

        const loadScript = (src) => new Promise((resolve, reject) => {
            const existing = Array.from(document.querySelectorAll('script[src]'))
                .find((s) => String(s.src || '').includes(src));

            if (existing) {
                // السكربت موجود مسبقاً وقد يكون محملاً قبل إضافة listener
                if (this.getJsPdfCtor() || existing.dataset.loaded === 'true' || existing.readyState === 'complete') {
                    resolve(true);
                    return;
                }
                const timeoutId = setTimeout(() => {
                    if (this.getJsPdfCtor()) resolve(true);
                    else reject(new Error('script load timeout'));
                }, 4000);
                existing.addEventListener('load', () => {
                    clearTimeout(timeoutId);
                    resolve(true);
                }, { once: true });
                existing.addEventListener('error', () => {
                    clearTimeout(timeoutId);
                    reject(new Error('failed to load script'));
                }, { once: true });
                return;
            }

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;
            script.crossOrigin = 'anonymous';
            script.onload = () => {
                script.dataset.loaded = 'true';
                resolve(true);
            };
            script.onerror = () => reject(new Error('failed to load script'));
            document.head.appendChild(script);
        });

        try {
            await loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
            await loadScript('https://cdn.jsdelivr.net/npm/jspdf-autotable@3.5.24/dist/jspdf.plugin.autotable.min.js');
            return Boolean(this.getJsPdfCtor());
        } catch (error) {
            Utils.safeWarn('تعذر تحميل مكتبات PDF للتصدير المباشر:', error);
            return false;
        }
    },

    async ensureHtml2CanvasReadyForDailySafetyExport() {
        if (typeof window.html2canvas === 'function') return true;

        const loadScript = (src) => new Promise((resolve, reject) => {
            const existing = Array.from(document.querySelectorAll('script[src]'))
                .find((s) => String(s.src || '').includes(src));

            if (existing) {
                if (typeof window.html2canvas === 'function' || existing.dataset.loaded === 'true' || existing.readyState === 'complete') {
                    resolve(true);
                    return;
                }
                const timeoutId = setTimeout(() => {
                    if (typeof window.html2canvas === 'function') resolve(true);
                    else reject(new Error('html2canvas load timeout'));
                }, 6000);
                existing.addEventListener('load', () => {
                    clearTimeout(timeoutId);
                    resolve(true);
                }, { once: true });
                existing.addEventListener('error', () => {
                    clearTimeout(timeoutId);
                    reject(new Error('failed to load html2canvas'));
                }, { once: true });
                return;
            }

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;
            script.crossOrigin = 'anonymous';
            script.onload = () => {
                script.dataset.loaded = 'true';
                resolve(true);
            };
            script.onerror = () => reject(new Error('failed to load html2canvas'));
            document.head.appendChild(script);
        });

        try {
            await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
            if (typeof window.html2canvas !== 'function') {
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
            }
            return typeof window.html2canvas === 'function';
        } catch (error) {
            Utils.safeWarn('تعذر تحميل html2canvas لتصدير PDF:', error);
            return false;
        }
    },

    async exportDailySafetyHtmlToPdf({ htmlContent, fileName, orientation = 'p', forceSinglePage = false }) {
        const pdfReady = await this.ensureJsPdfReadyForDailySafetyExport();
        if (!pdfReady) {
            Notification.error(this._t('module.periodic.dsc.pdfLibLoadError', 'تعذر تحميل مكتبة PDF. يرجى التحقق من الاتصال بالإنترنت ثم إعادة المحاولة.'));
            return false;
        }

        const canvasReady = await this.ensureHtml2CanvasReadyForDailySafetyExport();
        if (!canvasReady) {
            Notification.error(this._t('module.periodic.dsc.pdfCanvasLoadError', 'تعذر تحميل محرك تحويل الصفحة إلى PDF. يرجى إعادة المحاولة.'));
            return false;
        }

        let container = null;
        try {
            const jsPDF = this.getJsPdfCtor();
            const doc = new jsPDF(orientation, 'mm', 'a4', { compress: true });

            container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.left = '-100000px';
            container.style.top = '0';
            container.style.width = orientation === 'l' ? '1120px' : '794px';
            container.style.background = '#fff';
            container.style.direction = 'rtl';
            container.style.fontFamily = 'Tahoma, Arial, sans-serif';
            container.innerHTML = htmlContent;
            document.body.appendChild(container);

            const canvas = await window.html2canvas(container, {
                scale: Utils.PdfExport.getOptimalCaptureScale(container.scrollWidth, container.scrollHeight, Utils.PdfExport.DEFAULT_CAPTURE_SCALE),
                useCORS: true,
                allowTaint: false,
                backgroundColor: '#ffffff',
                scrollX: 0,
                scrollY: 0,
                logging: false,
                imageTimeout: 15000,
                removeContainer: true,
                windowWidth: container.scrollWidth,
                windowHeight: container.scrollHeight
            });
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 5;
            const usableWidth = pageWidth - margin * 2;
            const usableHeight = pageHeight - margin * 2;
            const pxPerMm = canvas.width / usableWidth;

            const headerEl = container.querySelector('.report-header');
            const footerEl = container.querySelector('.report-footer');
            const headerCssPx = headerEl ? headerEl.getBoundingClientRect().height : 0;
            const footerCssPx = footerEl ? footerEl.getBoundingClientRect().height : 0;
            const renderScale = canvas.width / Math.max(1, container.getBoundingClientRect().width);
            const headerPx = Math.max(0, Math.round(headerCssPx * renderScale));
            const footerPx = Math.max(0, Math.round(footerCssPx * renderScale));

            const headerMm = headerPx > 0 ? (headerPx / pxPerMm) : 0;
            const footerMm = footerPx > 0 ? (footerPx / pxPerMm) : 0;
            const bodyMmPerPage = Math.max(10, usableHeight - headerMm - footerMm);
            const bodyPxPerPage = Math.max(1, Math.floor(bodyMmPerPage * pxPerMm));

            const contentStartPx = headerPx;
            const contentEndPx = Math.max(contentStartPx, canvas.height - footerPx);
            const contentHeightPx = Math.max(1, contentEndPx - contentStartPx);
            const totalPages = forceSinglePage ? 1 : Math.max(1, Math.ceil(contentHeightPx / bodyPxPerPage));

            const sliceToImage = (yPx, hPx) => {
                if (hPx <= 0) return { dataUrl: '', format: 'JPEG' };
                const temp = Utils.PdfExport.createSliceCanvas(canvas, yPx, hPx);
                const budget = Math.floor(Utils.PdfExport.TARGET_MAX_BYTES / Math.max(1, totalPages * 3));
                return Utils.PdfExport.compressCanvasToJpegDataUrl(temp, budget);
            };

            const headerSlice = headerPx > 0 ? sliceToImage(0, headerPx) : { dataUrl: '', format: 'JPEG' };
            const footerSlice = footerPx > 0 ? sliceToImage(canvas.height - footerPx, footerPx) : { dataUrl: '', format: 'JPEG' };
            const headerImg = headerSlice.dataUrl;
            const footerImg = footerSlice.dataUrl;
            const headerFmt = headerSlice.format;
            const footerFmt = footerSlice.format;

            for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
                if (pageIndex > 0) doc.addPage();

                let cursorY = margin;

                if (headerImg) {
                    doc.addImage(headerImg, headerFmt, margin, cursorY, usableWidth, headerMm, undefined, 'FAST');
                    cursorY += headerMm;
                }

                const bodyStartPx = contentStartPx + pageIndex * bodyPxPerPage;
                const bodyHeightPx = forceSinglePage
                    ? Math.max(1, contentEndPx - contentStartPx)
                    : Math.max(1, Math.min(bodyPxPerPage, contentEndPx - bodyStartPx));
                const bodySlice = sliceToImage(bodyStartPx, bodyHeightPx);
                const rawBodyMm = bodyHeightPx / pxPerMm;
                const bodyMm = forceSinglePage ? Math.min(rawBodyMm, bodyMmPerPage) : rawBodyMm;
                doc.addImage(bodySlice.dataUrl, bodySlice.format, margin, cursorY, usableWidth, bodyMm, undefined, 'FAST');

                if (footerImg) {
                    const footerY = margin + usableHeight - footerMm;
                    doc.addImage(footerImg, footerFmt, margin, footerY, usableWidth, footerMm, undefined, 'FAST');
                }
            }

            const pdfBlobSize = (() => {
                try { return doc.output('arraybuffer').byteLength; } catch (_e) { return 0; }
            })();
            if (pdfBlobSize > Utils.PdfExport.TARGET_MAX_BYTES && typeof Notification !== 'undefined') {
                Notification.warning(`تم التصدير (${Utils.PdfExport.formatBytes(pdfBlobSize)}). للحصول على ملف أصغر جرّب تقليل نطاق التقرير.`);
            }

            doc.save(fileName);
            return true;
        } catch (error) {
            Utils.safeWarn('فشل تحويل HTML إلى PDF:', error);
            return false;
        } finally {
            if (container && container.parentNode) {
                container.remove();
            }
        }
    },

    prepareDailySafetyPdfHtmlContent(htmlContent, { landscape = false } = {}) {
        const overrideStyle = `
            <style id="dsc-pdf-export-overrides">
                @page { size: ${landscape ? 'A4 landscape' : 'A4 portrait'} !important; margin: 6mm !important; }
                html, body {
                    min-height: auto !important;
                    height: auto !important;
                    background: #ffffff !important;
                }
                body {
                    display: block !important;
                    line-height: 1.35 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }
                .report-wrapper {
                    min-height: auto !important;
                    height: auto !important;
                    display: block !important;
                    box-shadow: none !important;
                    border-radius: 0 !important;
                    padding: 10px !important;
                }
                .report-body {
                    flex: none !important;
                    min-height: auto !important;
                }
                .report-footer {
                    margin-top: 10px !important;
                    padding-top: 4px !important;
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                }
                .report-header {
                    grid-template-columns: minmax(240px, 1.45fr) minmax(280px, 1.75fr) minmax(88px, 120px) !important;
                    gap: 14px !important;
                }
                .report-header .company-brand .company-name,
                .report-header .company-brand .company-name-secondary {
                    white-space: nowrap !important;
                    word-break: keep-all !important;
                    overflow-wrap: normal !important;
                }
            </style>
        `;

        if (/<\/head>/i.test(htmlContent)) {
            return htmlContent.replace(/<\/head>/i, `${overrideStyle}</head>`);
        }
        return `${overrideStyle}${htmlContent}`;
    },

    /**
     * تصدير سجل Daily Safety Check List بالكامل إلى Excel
     */
    exportDailySafetyCheckListFullExcel() {
        const records = this.getDailySafetyCheckListRecords();
        if (!records || records.length === 0) {
            Notification.warning(this._t('module.periodic.dsc.noRecordsToExport', 'لا توجد سجلات لتصديرها'));
            return;
        }
        const fieldToRecordKey = { q16: 'q15Reading', q17: 'q16', q18: 'q17' };
        const headers = [this._t('module.periodic.dsc.excel.serial', 'رقم التسلسل'), this._t('module.periodic.dsc.table.site', 'المصنع/الموقع'), this._t('module.periodic.dsc.table.date', 'التاريخ'), this._t('module.periodic.dsc.table.inspector', 'القائم بالمرور'), this._t('module.periodic.dsc.table.shift', 'الوردية'), this._t('module.periodic.dsc.notes', 'الملاحظات')].concat(this.DAILY_SAFETY_CHECKLIST_QUESTIONS.map(q => this._getDailySafetyQuestionLabel(q)));
        const rows = records.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)).map((r, idx) => {
            const serial = this.getDailySafetyCheckListSerialNumber(r);
            const base = [serial, Utils.escapeHTML(r.siteName || ''), r.date ? Utils.formatDate(r.date) : '', Utils.escapeHTML(r.inspectorName || ''), Utils.escapeHTML(r.shift || ''), Utils.escapeHTML((r.notes || '').replace(/\r?\n/g, ' '))];
            const qVals = this.DAILY_SAFETY_CHECKLIST_QUESTIONS.map(q => {
                const key = fieldToRecordKey[q.key] || q.key;
                return Utils.escapeHTML(String(r[key] != null ? r[key] : ''));
            });
            return base.concat(qVals);
        });
        const csvContent = '\uFEFF' + [headers.join('\t'), ...rows.map(row => row.join('\t'))].join('\r\n');
        const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const firstRecord = (records || [])[0] || {};
        link.download = this._buildDailySafetyFileName({
            ext: 'xls',
            dateValue: firstRecord.date || new Date().toISOString(),
            shiftValue: firstRecord.shift || '',
            full: true
        });
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        Notification.success(this._t('module.periodic.dsc.exportExcelSuccess', 'تم تصدير السجل إلى Excel بنجاح'));
    },

    /**
     * تصدير سجل Daily Safety Check List بالكامل إلى PDF (ملف .pdf فعلي عند توفر jsPDF، وإلا نافذة طباعة لحفظ كـ PDF)
     */
    async exportDailySafetyCheckListFullPDF() {
        const records = this.getDailySafetyCheckListRecords();
        if (!records || records.length === 0) {
            Notification.warning(this._t('module.periodic.dsc.noRecordsToExport', 'لا توجد سجلات لتصديرها'));
            return;
        }
        const fieldToRecordKey = { q16: 'q15Reading', q17: 'q16', q18: 'q17' };
        const fullTableRows = records.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)).map(r => {
            const serial = this.getDailySafetyCheckListSerialNumber(r);
            const qCells = this.DAILY_SAFETY_CHECKLIST_QUESTIONS.map(q => {
                const key = fieldToRecordKey[q.key] || q.key;
                const v = r[key] != null ? String(r[key]) : '-';
                return `<td style="padding:4px; border:1px solid #ddd; font-size:10px;">${Utils.escapeHTML(v)}</td>`;
            }).join('');
            return `<tr><td style="padding:4px; border:1px solid #ddd;">${Utils.escapeHTML(serial)}</td><td style="padding:4px; border:1px solid #ddd;">${Utils.escapeHTML(r.siteName || '-')}</td><td style="padding:4px; border:1px solid #ddd;">${r.date ? Utils.formatDate(r.date) : '-'}</td><td style="padding:4px; border:1px solid #ddd;">${Utils.escapeHTML(r.inspectorName || '-')}</td><td style="padding:4px; border:1px solid #ddd;">${Utils.escapeHTML(r.shift || '-')}</td>${qCells}</tr>`;
        }).join('');
        const qHeaders = this.DAILY_SAFETY_CHECKLIST_QUESTIONS.map(q => `<th style="padding:4px; border:1px solid #ddd; background:#003865; color:#fff; font-size:10px;">${Utils.escapeHTML(this._getDailySafetyQuestionLabel(q))}</th>`).join('');
        const content = `
            ${this._getDailySafetyCompactFooterStyle().replace('portrait', 'landscape')}
            <p style="text-align:center; margin:0 0 12px 0; font-weight:bold;">${this._t('module.periodic.dsc.fullExportHeadingAr', 'تصدير كامل لسجل قائمة المرور اليومي للسلامة')} (${records.length} ${this._t('module.periodic.dsc.recordsWord', 'سجل')})</p>
            <table style="width:100%; border-collapse:collapse; font-size:11px;">
                <thead>
                    <tr style="background:#003865; color:#fff;">
                        <th style="padding:6px; border:1px solid #ddd;">رقم التقرير</th>
                        <th style="padding:6px; border:1px solid #ddd;">المصنع/الموقع</th>
                        <th style="padding:6px; border:1px solid #ddd;">التاريخ</th>
                        <th style="padding:6px; border:1px solid #ddd;">القائم بالمرور</th>
                        <th style="padding:6px; border:1px solid #ddd;">الوردية</th>
                        ${qHeaders}
                    </tr>
                </thead>
                <tbody>${fullTableRows}</tbody>
            </table>
        `;
        const formTitle = this._t('module.periodic.dsc.fullExportFormTitleAr', 'سجل قائمة المرور اليومي للسلامة - تصدير كامل');
        const rawHtmlContent = typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML
            ? FormHeader.generatePDFHTML('DSC-FULL-' + new Date().toISOString().slice(0, 10), formTitle, content, false, false, { source: 'DailySafetyCheckList', titleEn: this._t('module.periodic.dsc.titleEn', 'Daily Safety Report'), titleAr: this._t('module.periodic.dsc.titleAr', 'قائمة المرور اليومي للسلامة') }, new Date().toISOString(), new Date().toISOString())
            : `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${formTitle}</title></head><body style="font-family:Arial,Tahoma,sans-serif;direction:rtl;padding:20px;">${content}</body></html>`;
        const htmlContent = this.prepareDailySafetyPdfHtmlContent(rawHtmlContent, { landscape: true });

        const firstRecord = (records || [])[0] || {};
        const fileName = this._buildDailySafetyFileName({
            ext: 'pdf',
            dateValue: firstRecord.date || new Date().toISOString(),
            shiftValue: firstRecord.shift || '',
            full: true
        });
        const ok = await this.exportDailySafetyHtmlToPdf({ htmlContent, fileName, orientation: 'l', forceSinglePage: true });
        if (ok) Notification.success(this._t('module.periodic.dsc.exportPdfSuccess', 'تم تصدير السجل إلى PDF بنجاح'));
        else Notification.error(this._t('module.periodic.dsc.exportPdfError', 'تعذر إنشاء ملف PDF بشكل مباشر.'));
    },

    DAILY_SAFETY_CHECKLIST_QUESTIONS: [
        { key: 'q1', label: 'تم المرور على غرفة الطلمبات لمياه الحريق وشبكة الإطفاء الأوتوماتيك وحنفيات الحريق وأجهزة الإطفاء اليدوية ومنسوب المياة بخزان الحريق' },
        { key: 'q2', label: 'المرور على المخازن (عنابر التخزين المبرد والمجمد والتاكد من عدم وجود أي ملاحظة متعلقة بممارسات التخزين)' },
        { key: 'q3', label: 'المرور على مخزن المواد الأولية والتاكد من اشترطات السلامة بالمخزن' },
        { key: 'q4', label: 'المرور علي مخزن قطع الغيار والتاكد من مطابقة لاشتراطات السلامة والصحة المهنية' },
        { key: 'q5', label: 'المرور على نقط شحن بطاريات الفورك ليفت - الترانس بالت' },
        { key: 'q6', label: 'المرور على رصيف الشحن والتاكد من عدم وجود أي ملاحظات' },
        { key: 'q7', label: 'المرور على الأسوار الداخلية للمصنع - بوابات الخارجية (ومنطقة انتظار السيرات - الميزان البسكول- وصلة الدفاع المدني الخارجية وعدم وجود اشغالات)' },
        { key: 'q8', label: 'المرور على غرفة محطة ضواغط الهواء وابراج التبريد الخاص بمحطات الامونيا' },
        { key: 'q9', label: 'المرور على ورشة الإدارة الصيانة وورشة الحركة والتاكد من عدم وجود أي ملاحظات بالمكان' },
        { key: 'q10', label: 'المرور على غرف توزيع الكهرباء الرئيسية - غرف المحولات الرئيسية' },
        { key: 'q11', label: 'المرور على منطقة المخلفات - منطقة تجميع المخلفات' },
        { key: 'q12', label: 'المرور على صالات الإنتاج والتعبئة والتاكد من توفر اشتراطات السلامة' },
        { key: 'q13', label: 'المرور على فريق الصيانة الداخلي أو المقاول مع عدم السماح لهم بالعمل بدون استخراج على تصاريح عمل' },
        { key: 'q14', label: 'المرور على لوحة الإنذار الرئيسية والفرعية بالمصنع وعمل Rest إذا لزم الأمر' },
        { key: 'q15', label: 'المرور على نظام الإنذار والإطفاء التلقائي لغرف محول الكهرباء والغرف' },
        { key: 'q16', label: 'المرور على غرفة الطلمبات وقراءة الضغط - وكانت القراءة' },
        { key: 'q17', label: 'المرور على غرفة تغيير الملابس للعاملين والتاكد من عدم وجود أي ملاحظات غير امنة' },
        { key: 'q18', label: 'المرور علي منطقة الغلاية وعدم وجود أي ملاحظة' }
    ],

    showDailySafetyCheckListForm(editId) {
        const t = (key, fallback) => this._t(key, fallback);
        const record = editId ? this.getDailySafetyCheckListRecords().find(r => r.id === editId) : null;
        const sites = this.getSiteOptions();
        const complianceOptions = `<option value="">${t('module.periodic.dsc.select.choose', 'اختر')}</option><option value="مطابق">${t('module.periodic.dsc.status.compliant', 'مطابق')}</option><option value="غير مطابق">${t('module.periodic.dsc.status.nonCompliant', 'غير مطابق')}</option>`;
        const shiftOptions = `<option value="">${t('module.periodic.dsc.select.shift', 'اختر الوردية')}</option><option value="الأولى">${t('module.periodic.dsc.shift.first', 'الوردية الأولى')}</option><option value="الثانية">${t('module.periodic.dsc.shift.second', 'الوردية الثانية')}</option><option value="الثالثة">${t('module.periodic.dsc.shift.third', 'الوردية الثالثة')}</option>`;
        const fieldToRecordKey = { q16: 'q15Reading', q17: 'q16', q18: 'q17' };
        const questionsHtml = this.DAILY_SAFETY_CHECKLIST_QUESTIONS.map((q, idx) => {
            const isReading = q.key === 'q16';
            const recordKey = fieldToRecordKey[q.key] || q.key;
            const val = record ? (record[recordKey] || '') : '';
            const qLabel = this._getDailySafetyQuestionLabel(q);
            if (isReading) return `<div class="form-group"><label class="form-label required">${idx + 1}- ${Utils.escapeHTML(qLabel)}</label><input type="text" id="dsc-${q.key}" class="form-input" value="${Utils.escapeHTML(val)}" placeholder="${t('module.periodic.dsc.readingPlaceholder', 'أدخل القراءة')}" required></div>`;
            return `<div class="form-group"><label class="form-label required">${idx + 1}- ${Utils.escapeHTML(qLabel)}</label><select id="dsc-${q.key}" class="form-input" required>${complianceOptions}</select></div>`;
        }).join('');
        const siteOptions = `<option value="">${t('module.periodic.dsc.select.site', 'اختر المصنع/الموقع')}</option>` + (sites.map(s => `<option value="${Utils.escapeHTML(s.id)}">${Utils.escapeHTML(s.name)}</option>`).join(''));
        const dateVal = record && record.date ? this._normalizeDateOnly(record.date) : this._normalizeDateOnly(new Date());
        const modal = document.createElement('div');
        modal.className = 'modal-overlay dsc-modal-overlay';
        const reportNumberDisplayValue = record
            ? Utils.escapeHTML(record.reportNumber || this.getDailySafetyCheckListSerialNumber(record))
            : '';
        modal.innerHTML = `
            <style>
                .dsc-modal-overlay .dsc-modal-box { max-width: 780px; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); background: #fff; }
                .dsc-modal-overlay .dsc-modal-header { text-align: center; padding: 1.25rem 3rem 1rem; position: relative; border-bottom: 2px solid #e5e7eb; background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); color: #fff; border-radius: 12px 12px 0 0; }
                .dsc-modal-overlay .dsc-modal-header .dsc-modal-title { margin: 0; font-size: 1.25rem; font-weight: 700; }
                .dsc-modal-overlay .dsc-modal-close { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.2); border: none; color: #fff; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
                .dsc-modal-overlay .dsc-modal-close:hover { background: rgba(255,255,255,0.35); }
                .dsc-modal-overlay .dsc-modal-body { overflow-y: auto; padding: 1.25rem; flex: 1; }
                .dsc-modal-overlay .dsc-section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 1rem; }
                .dsc-modal-overlay .dsc-section-title { font-size: 0.95rem; font-weight: 700; color: #1e40af; margin: 0 0 0.75rem; padding-bottom: 0.5rem; border-bottom: 2px solid #93c5fd; display: flex; align-items: center; gap: 0.5rem; }
                .dsc-modal-overlay .dsc-section-title i { color: #2563eb; }
                .dsc-modal-overlay .dsc-modal-footer { padding: 1rem 1.25rem; border-top: 2px solid #e5e7eb; background: #f8fafc; border-radius: 0 0 12px 12px; display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; }
                .dsc-modal-overlay .dsc-modal-footer .btn-primary { background: linear-gradient(135deg, #2563eb, #1d4ed8); border: none; padding: 0.6rem 1.5rem; border-radius: 8px; font-weight: 600; }
                .dsc-modal-overlay .dsc-modal-footer .btn-secondary { background: #e2e8f0; color: #374151; border: none; padding: 0.6rem 1.5rem; border-radius: 8px; font-weight: 600; }
            </style>
            <div class="modal-content dsc-modal-box">
                <div class="dsc-modal-header">
                    <button type="button" class="dsc-modal-close" aria-label="${t('module.periodic.dsc.action.close', 'إغلاق')}" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                    <h2 class="dsc-modal-title"><i class="fas fa-clipboard-check ml-2"></i>${record ? t('module.periodic.dsc.action.edit', 'تعديل') : t('module.periodic.dsc.action.add', 'إضافة')} ${this._t('module.periodic.dsc.recordTitle', 'سجل المرور اليومي للسلامة')}</h2>
                    <p class="dsc-form-serial" style="margin: 0.25rem 0 0; font-size: 0.9rem; opacity: 0.95;">${record ? `${t('module.periodic.dsc.table.reportNumber', 'رقم التقرير')}: ` + Utils.escapeHTML(this.getDailySafetyCheckListSerialNumber(record)) : `${t('module.periodic.dsc.table.reportNumber', 'رقم التقرير')}: ${t('module.periodic.dsc.reportNumberAuto', 'سيُعيّن تلقائياً عند الحفظ (اليوم-الوردية-الترتيب)')}`}</p>
                </div>
                <div class="dsc-modal-body">
                    <div class="dsc-section">
                        <h3 class="dsc-section-title"><i class="fas fa-info-circle"></i>${t('module.periodic.dsc.section.basicData', 'البيانات الأساسية')}</h3>
                        <div class="form-grid form-grid-2">
                            <div class="form-group"><label class="form-label">${t('module.periodic.dsc.table.reportNumber', 'رقم التقرير')}</label><input type="text" id="dsc-reportNumber" class="form-input" value="${reportNumberDisplayValue}" placeholder="${t('module.periodic.dsc.reportNumberAutoSimple', 'سيُعيّن تلقائياً عند الحفظ')}" readonly></div>
                            <div class="form-group"><label class="form-label required">${t('module.periodic.dsc.table.site', 'المصنع/الموقع')}</label><select id="dsc-siteId" class="form-input" required>${siteOptions}</select></div>
                            <div class="form-group"><label class="form-label required">${t('module.periodic.dsc.table.date', 'التاريخ')}</label><input type="date" id="dsc-date" class="form-input" required value="${dateVal}"></div>
                            <div class="form-group"><label class="form-label required">${t('module.periodic.dsc.table.inspector', 'القائم بالمرور')}</label><select id="dsc-inspectorName" class="form-input" required><option value="">${t('module.periodic.dsc.loading', 'جاري التحميل...')}</option></select></div>
                            <div class="form-group"><label class="form-label required">${t('module.periodic.dsc.table.shift', 'الوردية')}</label><select id="dsc-shift" class="form-input" required>${shiftOptions}</select></div>
                        </div>
                    </div>
                    <div class="dsc-section">
                        <h3 class="dsc-section-title"><i class="fas fa-tasks"></i>${t('module.periodic.dsc.section.items', 'بنود المرور اليومي للسلامة')}</h3>
                        <div class="space-y-3" style="max-height: 42vh; overflow-y: auto;">${questionsHtml}</div>
                    </div>
                    <div class="dsc-section">
                        <h3 class="dsc-section-title"><i class="fas fa-sticky-note"></i>${t('module.periodic.dsc.notes', 'الملاحظات')}</h3>
                        <textarea id="dsc-notes" class="form-input form-textarea" rows="3" placeholder="${t('module.periodic.dsc.notesPlaceholder', 'الملاحظات الموجودة أثناء المرور...')}">${record ? Utils.escapeHTML(record.notes || '') : ''}</textarea>
                    </div>
                </div>
                <div class="dsc-modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${t('module.periodic.dsc.action.cancel', 'إلغاء')}</button>
                    <button type="button" id="dsc-save-btn" class="btn-primary"><i class="fas fa-save ml-2"></i>${t('module.periodic.dsc.action.save', 'حفظ')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        const siteSelect = modal.querySelector('#dsc-siteId');
        const inspectorSelect = modal.querySelector('#dsc-inspectorName');
        if (record) {
            siteSelect.value = record.siteId || '';
            modal.querySelector('#dsc-shift').value = record.shift || '';
            this.DAILY_SAFETY_CHECKLIST_QUESTIONS.forEach(q => {
                const el = modal.querySelector('#dsc-' + q.key);
                const recordKey = (fieldToRecordKey[q.key] || q.key);
                if (el) el.value = record[recordKey] || '';
            });
        }
        const fillInspectorAndRecord = (members) => {
            inspectorSelect.innerHTML = `<option value="">${t('module.periodic.dsc.select.inspector', 'اختر القائم بالمرور')}</option>` + (members.map(m => `<option value="${Utils.escapeHTML(m.name)}">${Utils.escapeHTML(m.name)}</option>`).join(''));
            if (record && record.inspectorName) inspectorSelect.value = record.inspectorName;
        };
        Promise.resolve(this.getSafetyTeamMembersForCheckList()).then(members => { const arr = Array.isArray(members) ? members : []; fillInspectorAndRecord(arr); }).catch(() => fillInspectorAndRecord([]));
        modal.querySelector('#dsc-save-btn').addEventListener('click', () => this.saveDailySafetyCheckListRecord(modal, record ? record.id : null));
    },

    /**
     * رقم تسلسلي للتقرير: DSC-YYYY-MM-DD-SH-NN
     * YYYY-MM-DD = التاريخ، SH = كود الوردية (1/2/3)، NN = ترتيب السجل لنفس اليوم والوردية
     */
    getDailySafetyCheckListSerialNumber(record) {
        if (!record) return 'DSC-0000-00-00-0-00';
        if (record.reportNumber && String(record.reportNumber).trim()) return String(record.reportNumber).trim();
        const parts = this._dscExtractDateParts(record.date);
        const shiftMap = { 'الأولى': '1', 'الثانية': '2', 'الثالثة': '3' };
        const sh = shiftMap[record.shift] || '0';
        const keyDate = `${parts.y}-${parts.m}-${parts.d}`;
        const list = this.getDailySafetyCheckListRecords();
        const sameDayShift = list.filter(r => {
            const rParts = this._dscExtractDateParts(r.date);
            return `${rParts.y}-${rParts.m}-${rParts.d}` === keyDate && (shiftMap[r.shift] || '0') === sh;
        }).sort((a, b) => new Date(a.createdAt || a.id) - new Date(b.createdAt || b.id));
        const idx = sameDayShift.findIndex(r => r.id === record.id);
        const no = idx >= 0 ? idx + 1 : sameDayShift.length + 1;
        return `DSC-${keyDate}-${sh}-${String(no).padStart(2, '0')}`;
    },

    /**
     * استخراج أجزاء التاريخ (سنة/شهر/يوم) من قيمة date بصيغة موحّدة
     */
    _dscExtractDateParts(v) {
        const s = String(v || '');
        let y = '', m = '', d = '';
        const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (iso) { y = iso[1]; m = iso[2]; d = iso[3]; return { y, m, d }; }
        const dt = new Date(v);
        if (!isNaN(dt.getTime())) {
            y = String(dt.getFullYear());
            m = String(dt.getMonth() + 1).padStart(2, '0');
            d = String(dt.getDate()).padStart(2, '0');
        }
        return { y, m, d };
    },

    /**
     * توليد رقم تقرير ثابت عند الإنشاء: DSC-YYYY-MM-DD-SH-NN
     * يعتمد على أكبر NN موجود لنفس اليوم والوردية (باستخدام reportNumber إن وُجد).
     */
    getNextDailySafetyCheckListReportNumber(payload, records) {
        const parts = this._dscExtractDateParts(payload && payload.date);
        const shiftMap = { 'الأولى': '1', 'الثانية': '2', 'الثالثة': '3' };
        const sh = shiftMap[payload && payload.shift] || '0';
        const keyDate = `${parts.y}-${parts.m}-${parts.d}`;
        const list = Array.isArray(records) ? records : this.getDailySafetyCheckListRecords();
        let maxNo = 0;
        for (let i = 0; i < list.length; i++) {
            const r = list[i];
            if (!r) continue;
            const rParts = this._dscExtractDateParts(r.date);
            const rKeyDate = `${rParts.y}-${rParts.m}-${rParts.d}`;
            const rSh = shiftMap[r.shift] || '0';
            if (rKeyDate !== keyDate || rSh !== sh) continue;
            const rn = (r.reportNumber && String(r.reportNumber).trim()) ? String(r.reportNumber).trim() : '';
            const m = rn.match(/^DSC-\d{4}-\d{2}-\d{2}-[1-3]-(\d+)$/);
            if (m) {
                const n = parseInt(m[1], 10);
                if (!isNaN(n) && n > maxNo) maxNo = n;
                continue;
            }
            const serial = this.getDailySafetyCheckListSerialNumber(r);
            const m2 = String(serial || '').trim().match(/^DSC-\d{4}-\d{2}-\d{2}-[1-3]-(\d+)$/);
            if (m2) {
                const n = parseInt(m2[1], 10);
                if (!isNaN(n) && n > maxNo) maxNo = n;
            }
        }
        return `DSC-${keyDate}-${sh}-${String(maxNo + 1).padStart(2, '0')}`;
    },

    /**
     * عرض سجل Daily Safety Check List بالكامل مع أزرار الطباعة والتصدير والتعديل والحذف
     */
    showDailySafetyCheckListView(recordId) {
        const t = (key, fallback) => this._t(key, fallback);
        const record = this.getDailySafetyCheckListRecords().find(r => r.id === recordId);
        if (!record) { Notification.error(t('module.periodic.dsc.recordNotFound', 'السجل غير موجود')); return; }
        const serialNo = this.getDailySafetyCheckListSerialNumber(record);
        const fieldToRecordKey = { q16: 'q15Reading', q17: 'q16', q18: 'q17' };
        const questionsRows = this.DAILY_SAFETY_CHECKLIST_QUESTIONS.map((q, idx) => {
            const recordKey = fieldToRecordKey[q.key] || q.key;
            const val = record[recordKey] != null ? String(record[recordKey]).trim() : '-';
            return `<tr><td style="width:28px; text-align:center; font-weight:bold;">${idx + 1}</td><td style="padding:8px; border:1px solid #e2e8f0;">${Utils.escapeHTML(this._getDailySafetyQuestionLabel(q))}</td><td style="padding:8px; border:1px solid #e2e8f0; min-width:100px;">${Utils.escapeHTML(val)}</td></tr>`;
        }).join('');
        const modal = document.createElement('div');
        modal.className = 'modal-overlay dsc-view-modal-overlay';
        modal.innerHTML = `
            <style>
                .dsc-view-modal-overlay .dsc-view-box { max-width: 820px; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); background: #fff; }
                .dsc-view-modal-overlay .dsc-view-header { text-align: center; padding: 1rem 2rem; border-bottom: 2px solid #e5e7eb; background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); color: #fff; border-radius: 12px 12px 0 0; }
                .dsc-view-modal-overlay .dsc-view-header .dsc-view-title { margin: 0; font-size: 1.2rem; font-weight: 700; }
                .dsc-view-modal-overlay .dsc-view-close { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.2); border: none; color: #fff; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; }
                .dsc-view-modal-overlay .dsc-view-body { overflow-y: auto; padding: 1rem 1.5rem; flex: 1; }
                .dsc-view-modal-overlay .dsc-view-section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem; margin-bottom: 1rem; }
                .dsc-view-modal-overlay .dsc-view-section-title { font-size: 0.95rem; font-weight: 700; color: #1e40af; margin: 0 0 0.5rem; }
                .dsc-view-modal-overlay .dsc-view-footer { padding: 1rem; border-top: 2px solid #e5e7eb; background: #f8fafc; border-radius: 0 0 12px 12px; display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap; }
                .dsc-view-modal-overlay .dsc-view-footer .btn-primary { background: linear-gradient(135deg, #2563eb, #1d4ed8); border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; }
                .dsc-view-modal-overlay .dsc-view-footer .btn-secondary { background: #e2e8f0; color: #374151; border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; }
                .dsc-view-modal-overlay .dsc-view-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
            </style>
            <div class="modal-content dsc-view-box">
                <div class="dsc-view-header" style="position: relative;">
                    <button type="button" class="dsc-view-close" aria-label="${t('module.periodic.dsc.action.close', 'إغلاق')}" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                    <h2 class="dsc-view-title"><i class="fas fa-clipboard-check ml-2"></i>${t('module.periodic.dsc.action.view', 'عرض')} ${this._t('module.periodic.dsc.recordTitle', 'سجل المرور اليومي للسلامة')}</h2>
                    <p class="dsc-view-serial" style="margin: 0.25rem 0 0; font-size: 0.95rem; opacity: 0.95;">${t('module.periodic.dsc.table.reportNumber', 'رقم التقرير')}: ${Utils.escapeHTML(serialNo)}</p>
                </div>
                <div class="dsc-view-body">
                    <div class="dsc-view-section">
                        <div class="dsc-view-section-title"><i class="fas fa-info-circle ml-2"></i>${t('module.periodic.dsc.section.basicData', 'البيانات الأساسية')}</div>
                        <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
                            <div><span style="color:#64748b;">${t('module.periodic.dsc.table.site', 'المصنع/الموقع')}:</span> ${Utils.escapeHTML(record.siteName || '-')}</div>
                            <div><span style="color:#64748b;">${t('module.periodic.dsc.table.date', 'التاريخ')}:</span> ${record.date ? Utils.formatDate(record.date) : '-'}</div>
                            <div><span style="color:#64748b;">${t('module.periodic.dsc.table.inspector', 'القائم بالمرور')}:</span> ${Utils.escapeHTML(record.inspectorName || '-')}</div>
                            <div><span style="color:#64748b;">${t('module.periodic.dsc.table.shift', 'الوردية')}:</span> ${Utils.escapeHTML(this._formatDailyShiftLabel(record.shift || '-'))}</div>
                        </div>
                    </div>
                    <div class="dsc-view-section">
                        <div class="dsc-view-section-title"><i class="fas fa-tasks ml-2"></i>${t('module.periodic.dsc.section.items', 'بنود المرور اليومي للسلامة')}</div>
                        <table class="dsc-view-table">
                            <thead><tr><th style="width:28px;">#</th><th>${t('module.periodic.dsc.table.items', 'البنود')}</th><th style="min-width:100px;">${t('module.periodic.dsc.table.answer', 'الإجابة')}</th></tr></thead>
                            <tbody>${questionsRows}</tbody>
                        </table>
                    </div>
                    ${(record.notes || '').trim() ? `<div class="dsc-view-section"><div class="dsc-view-section-title"><i class="fas fa-sticky-note ml-2"></i>${t('module.periodic.dsc.notes', 'الملاحظات')}</div><p style="margin:0;">${Utils.escapeHTML(record.notes)}</p></div>` : ''}
                </div>
                <div class="dsc-view-footer">
                    <button type="button" class="btn-primary" onclick="PeriodicInspections.printDailySafetyCheckListRecord('${Utils.escapeHTML(record.id)}')"><i class="fas fa-print ml-2"></i>${t('module.periodic.dsc.action.print', 'طباعة')}</button>
                    <button type="button" class="btn-primary" onclick="PeriodicInspections.exportDailySafetyCheckListRecord('${Utils.escapeHTML(record.id)}')"><i class="fas fa-file-pdf ml-2"></i>${t('module.periodic.dsc.action.downloadPdf', 'تحميل PDF')}</button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove(); PeriodicInspections.showDailySafetyCheckListForm('${Utils.escapeHTML(record.id)}');"><i class="fas fa-edit ml-2"></i>${t('module.periodic.dsc.action.edit', 'تعديل')}</button>
                    <button type="button" class="btn-secondary" style="color:#b91c1c;" onclick="if(confirm('${t('module.periodic.dsc.confirmDelete', 'هل أنت متأكد من حذف هذا السجل؟')}')) { this.closest('.modal-overlay').remove(); PeriodicInspections.deleteDailySafetyCheckListRecord('${Utils.escapeHTML(record.id)}'); }"><i class="fas fa-trash ml-2"></i>${t('module.periodic.dsc.action.delete', 'حذف')}</button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times ml-2"></i>${t('module.periodic.dsc.action.close', 'إغلاق')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    /**
     * محتوى HTML للطباعة/التصدير (بدون هيدر/فوتر) لسجل Daily Safety Check List
     */
    getDailySafetyCheckListRecordPrintContent(record) {
        if (!record) return '';
        const serialNo = this.getDailySafetyCheckListSerialNumber(record);
        const fieldToRecordKey = { q16: 'q15Reading', q17: 'q16', q18: 'q17' };
        const rows = this.DAILY_SAFETY_CHECKLIST_QUESTIONS.map((q, idx) => {
            const recordKey = fieldToRecordKey[q.key] || q.key;
            const val = record[recordKey] != null ? String(record[recordKey]).trim() : '-';
            return `<tr><td style="text-align:center; padding:5px 6px; border:1px solid #d7e0ea; width:38px;">${idx + 1}</td><td style="padding:5px 6px; border:1px solid #d7e0ea; line-height:1.35;">${Utils.escapeHTML(this._getDailySafetyQuestionLabel(q))}</td><td style="padding:5px 6px; border:1px solid #d7e0ea; width:88px; text-align:center; font-weight:600;">${Utils.escapeHTML(val)}</td></tr>`;
        }).join('');
        return `
            <style>
                .dsc-print-report {
                    font-size: 10.5px;
                    line-height: 1.25;
                    color: #1f2937;
                }
                .dsc-print-report .dsc-print-serial {
                    text-align: center;
                    margin: 0 0 10px 0;
                    font-weight: 700;
                    font-size: 0.95rem;
                }
                .dsc-print-report .info-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 8px;
                    margin-bottom: 12px;
                }
                .dsc-print-report .info-item {
                    padding: 7px 9px;
                    background: #f8fafc;
                    border-right: 3px solid #3b82f6;
                    border-radius: 5px;
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                .dsc-print-report .info-label {
                    font-weight: 700;
                    color: #64748b;
                    font-size: 11px;
                    margin-bottom: 2px;
                }
                .dsc-print-report .info-value {
                    color: #1e293b;
                    font-size: 11px;
                    font-weight: 600;
                }
                .dsc-print-report .dsc-print-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                    table-layout: fixed;
                }
                .dsc-print-report .dsc-print-table thead tr {
                    background: #2563eb;
                    color: #fff;
                }
                .dsc-print-report .dsc-print-table th {
                    padding: 7px 6px;
                    font-size: 11px;
                }
                .dsc-print-report .dsc-print-table tbody tr,
                .dsc-print-report .dsc-print-notes,
                .dsc-print-report .info-item {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                .dsc-print-report .dsc-print-notes {
                    margin-top: 12px;
                    padding: 10px 12px;
                    background: #f8fafc;
                    border-radius: 5px;
                }
                .dsc-print-report .dsc-print-notes-title {
                    font-weight: 700;
                    color: #1e40af;
                    margin-bottom: 6px;
                }
                .dsc-print-report .dsc-print-notes-text {
                    margin: 0;
                    line-height: 1.5;
                }
                @media print {
                    .dsc-print-report {
                        font-size: 10px;
                    }
                    .dsc-print-report .info-grid {
                        gap: 6px;
                        margin-bottom: 10px;
                    }
                    .dsc-print-report .info-item {
                        padding: 6px 8px;
                    }
                    .dsc-print-report .dsc-print-table {
                        margin-top: 8px;
                    }
                    .dsc-print-report .dsc-print-table th {
                        padding: 6px 5px;
                        font-size: 10px;
                    }
                    .dsc-print-report .dsc-print-notes {
                        margin-top: 10px;
                        padding: 8px 10px;
                    }
                }
            </style>
            <div class="dsc-print-report">
            <p class="dsc-print-serial">رقم التقرير: ${Utils.escapeHTML(serialNo)}</p>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">المصنع/الموقع</div>
                    <div class="info-value">${Utils.escapeHTML(record.siteName || '-')}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">التاريخ</div>
                    <div class="info-value">${record.date ? Utils.formatDate(record.date) : '-'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">القائم بالمرور</div>
                    <div class="info-value">${Utils.escapeHTML(record.inspectorName || '-')}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">الوردية</div>
                    <div class="info-value">${Utils.escapeHTML(record.shift || '-')}</div>
                </div>
            </div>
            <table class="dsc-print-table">
                <thead><tr><th style="width:38px;">#</th><th style="text-align:right;">البنود</th><th style="width:88px;">الإجابة</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
            ${(record.notes || '').trim() ? `<div class="dsc-print-notes"><div class="dsc-print-notes-title">الملاحظات</div><p class="dsc-print-notes-text">${Utils.escapeHTML(record.notes)}</p></div>` : ''}
            </div>
        `;
    },

    printDailySafetyCheckListRecord(recordId) {
        const record = this.getDailySafetyCheckListRecords().find(r => r.id === recordId);
        if (!record) { Notification.error(this._t('module.periodic.dsc.recordNotFound', 'السجل غير موجود')); return; }
        const content = this.getDailySafetyCheckListRecordPrintContent(record);
        const formCode = `DSC-${record.id || ''}-${(record.date || '').toString().slice(0, 10)}`;
        const formTitle = this._t('module.periodic.dsc.singleRecordTitleAr', 'سجل Daily Safety Report - قائمة المرور اليومي للسلامة');
        const htmlContent = typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML
            ? FormHeader.generatePDFHTML(formCode, formTitle, this._getDailySafetyCompactFooterStyle() + content, false, false, { source: 'DailySafetyCheckList', titleEn: this._t('module.periodic.dsc.titleEn', 'Daily Safety Report'), titleAr: this._t('module.periodic.dsc.titleAr', 'قائمة المرور اليومي للسلامة') }, record.createdAt || new Date().toISOString(), record.updatedAt || record.createdAt || new Date().toISOString())
            : `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${formTitle}</title></head><body style="font-family:Arial,Tahoma,sans-serif;direction:rtl;padding:20px;">${content}</body></html>`;
        const blob = new Blob(['\ufeff' + htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
            printWindow.onload = () => {
                try {
                    if (typeof requestAnimationFrame === 'function') {
                        requestAnimationFrame(() => printWindow.print());
                    } else {
                        printWindow.print();
                    }
                    const cleanup = () => {
                        try { URL.revokeObjectURL(url); } catch (e) {}
                        try { printWindow.removeEventListener('afterprint', cleanup); } catch (e) {}
                    };
                    printWindow.addEventListener('afterprint', cleanup);
                    setTimeout(cleanup, 1200);
                } catch (e) {
                    setTimeout(() => URL.revokeObjectURL(url), 1200);
                }
            };
        } else {
            Notification.error(this._t('module.periodic.dsc.allowPopupsPrint', 'يرجى السماح للنوافذ المنبثقة للطباعة'));
        }
    },

    async exportDailySafetyCheckListRecord(recordId) {
        const record = this.getDailySafetyCheckListRecords().find(r => r.id === recordId);
        if (!record) { Notification.error(this._t('module.periodic.dsc.recordNotFound', 'السجل غير موجود')); return; }
        const content = this.getDailySafetyCheckListRecordPrintContent(record);
        const formTitle = this._t('module.periodic.dsc.singleRecordTitleAr', 'سجل Daily Safety Report - قائمة المرور اليومي للسلامة');
        const rawHtmlContent = typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML
            ? FormHeader.generatePDFHTML(`DSC-${record.id || ''}`, formTitle, this._getDailySafetyCompactFooterStyle() + content, false, false, { source: 'DailySafetyCheckList', titleEn: this._t('module.periodic.dsc.titleEn', 'Daily Safety Report'), titleAr: this._t('module.periodic.dsc.titleAr', 'قائمة المرور اليومي للسلامة') }, record.createdAt || new Date().toISOString(), record.updatedAt || record.createdAt || new Date().toISOString())
            : `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${formTitle}</title></head><body style="font-family:Arial,Tahoma,sans-serif;direction:rtl;padding:20px;">${content}</body></html>`;
        const htmlContent = this.prepareDailySafetyPdfHtmlContent(rawHtmlContent, { landscape: false });
        const fileName = this._buildDailySafetyFileName({
            ext: 'pdf',
            dateValue: record.date || new Date().toISOString(),
            shiftValue: record.shift || '',
            full: false
        });
        const ok = await this.exportDailySafetyHtmlToPdf({ htmlContent, fileName, orientation: 'p', forceSinglePage: true });
        if (ok) Notification.success(this._t('module.periodic.dsc.exportPdfSuccess', 'تم تصدير السجل إلى PDF بنجاح'));
        else Notification.error(this._t('module.periodic.dsc.exportPdfError', 'تعذر إنشاء ملف PDF بشكل مباشر.'));
    },

    /**
     * التحقق من استكمال جميع بيانات نموذج Daily Safety Check List قبل الحفظ
     * @param {HTMLElement} modalElement - عنصر النموذج
     * @returns {{ valid: boolean, message?: string }}
     */
    validateDailySafetyCheckListForm(modalElement) {
        const siteId = (modalElement.querySelector('#dsc-siteId') || {}).value || '';
        const date = (modalElement.querySelector('#dsc-date') || {}).value || '';
        const inspectorName = (modalElement.querySelector('#dsc-inspectorName') || {}).value || '';
        const shift = (modalElement.querySelector('#dsc-shift') || {}).value || '';
        if (!siteId || !date || !inspectorName || !shift) {
            return { valid: false, message: this._t('module.periodic.dsc.validation.basicFields', 'يرجى استكمال جميع البيانات الأساسية (المصنع/الموقع، التاريخ، القائم بالمرور، الوردية).') };
        }
        const fieldToRecordKey = { q16: 'q15Reading', q17: 'q16', q18: 'q17' };
        for (const q of this.DAILY_SAFETY_CHECKLIST_QUESTIONS) {
            const el = modalElement.querySelector('#dsc-' + q.key);
            const val = el ? (el.value || '').trim() : '';
            if (!val) {
                const label = q.key === 'q16'
                    ? this._t('module.periodic.dsc.readingLabel', 'قراءة الضغط (السؤال 16)')
                    : `${this._t('module.periodic.dsc.questionWord', 'السؤال')} ${this.DAILY_SAFETY_CHECKLIST_QUESTIONS.indexOf(q) + 1}`;
                return { valid: false, message: `${this._t('module.periodic.dsc.validation.answerAll', 'يرجى الإجابة على جميع بنود الفحص. الحقل الناقص:')} ${label}.` };
            }
        }
        return { valid: true };
    },

    saveDailySafetyCheckListRecord(modalElement, editId) {
        const validation = this.validateDailySafetyCheckListForm(modalElement);
        if (!validation.valid) {
            if (typeof Notification !== 'undefined' && Notification.error) Notification.error(validation.message || this._t('module.periodic.dsc.validation.completeAll', 'يرجى استكمال جميع البيانات والأسئلة قبل الحفظ'));
            return;
        }
        const siteSelect = modalElement.querySelector('#dsc-siteId');
        const siteId = siteSelect ? siteSelect.value : '';
        const sites = this.getSiteOptions();
        const siteName = (sites.find(s => s.id === siteId) || {}).name || '';
        const date = modalElement.querySelector('#dsc-date')?.value || '';
        const inspectorName = modalElement.querySelector('#dsc-inspectorName')?.value || '';
        const shift = modalElement.querySelector('#dsc-shift')?.value || '';
        const notes = modalElement.querySelector('#dsc-notes')?.value || '';
        const payload = { siteId, siteName, date, inspectorName, shift, notes,
            q1: modalElement.querySelector('#dsc-q1')?.value || '', q2: modalElement.querySelector('#dsc-q2')?.value || '', q3: modalElement.querySelector('#dsc-q3')?.value || '', q4: modalElement.querySelector('#dsc-q4')?.value || '', q5: modalElement.querySelector('#dsc-q5')?.value || '', q6: modalElement.querySelector('#dsc-q6')?.value || '', q7: modalElement.querySelector('#dsc-q7')?.value || '', q8: modalElement.querySelector('#dsc-q8')?.value || '', q9: modalElement.querySelector('#dsc-q9')?.value || '', q10: modalElement.querySelector('#dsc-q10')?.value || '', q11: modalElement.querySelector('#dsc-q11')?.value || '', q12: modalElement.querySelector('#dsc-q12')?.value || '', q13: modalElement.querySelector('#dsc-q13')?.value || '', q14: modalElement.querySelector('#dsc-q14')?.value || '', q15: modalElement.querySelector('#dsc-q15')?.value || '', q15Reading: modalElement.querySelector('#dsc-q16')?.value || '', q16: modalElement.querySelector('#dsc-q17')?.value || '', q17: modalElement.querySelector('#dsc-q18')?.value || '' };
        this.getDailySafetyCheckListRecords();
        const list = AppState.appData.dailySafetyCheckList;
        const now = new Date().toISOString();
        if (editId) {
            const idx = list.findIndex(r => r.id === editId);
            if (idx >= 0) {
                const oldRecord = list[idx];
                const dateChanged = this._normalizeDateOnly(oldRecord.date) !== this._normalizeDateOnly(payload.date);
                const shiftChanged = (oldRecord.shift || '') !== (payload.shift || '');
                // ✅ FIX: عند تغيير التاريخ أو الوردية، نُعيد توليد رقم التقرير
                // كي يبقى تنسيق DD-SH-NO متوافقاً مع البيانات الفعلية (وإلا يبقى الرقم
                // مرتبطاً بالتاريخ/الوردية القديمة → معلومة مضلِّلة في الجدول والـ PDF).
                let updatedReportNumber = oldRecord.reportNumber;
                if (dateChanged || shiftChanged) {
                    // نستبعد السجل الحالي من قائمة الحساب لتفادي عدّه ضد نفسه
                    const otherRecords = list.filter((_, i) => i !== idx);
                    updatedReportNumber = this.getNextDailySafetyCheckListReportNumber(payload, otherRecords);
                }
                list[idx] = { ...oldRecord, ...payload, reportNumber: updatedReportNumber, updatedAt: now };
            }
        } else {
            const id = 'DSC-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
            const reportNumber = this.getNextDailySafetyCheckListReportNumber(payload, list);
            list.push({ id, reportNumber, ...payload, createdAt: now, updatedAt: now });
        }
        if (typeof DataManager !== 'undefined' && DataManager.save) DataManager.save();
        // إغلاق النموذج فوراً ثم تحديث الجدول والمزامنة في الخلفية
        modalElement.remove();
        if (this.state.currentTab === 'daily-safety-checklist' || this.state.currentTab === 'daily-safety-analytics') {
            const contentContainer = document.getElementById('periodic-inspections-content-area');
            if (contentContainer) {
                this.refreshCurrentTabContent().catch(() => {});
            }
        }
        if (editId) Notification.success('تم تحديث السجل بنجاح');
        else Notification.success('تم إضافة السجل بنجاح');
        // إشعار المشرفين + تسجيل النشاط (في الخلفية)
        if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
            GoogleIntegration.sendRequest({
                action: 'addNotification',
                data: {
                    userId: 'admin',
                    title: editId ? 'تحديث سجل مرور يومي' : 'سجل مرور يومي جديد',
                    message: `${editId ? 'تم تحديث' : 'تم إضافة'} سجل مرور يومي للسلامة: ${payload.siteName || ''} - ${payload.date || ''} (${payload.shift || ''})`,
                    type: 'info',
                    priority: 'normal',
                    link: '#periodic-inspections-section',
                    data: { module: 'periodic-inspections', action: editId ? 'daily_safety_checklist_updated' : 'daily_safety_checklist_added', recordId: editId || '' }
                }
            }).catch(() => {});
        }
        if (typeof UserActivityLog !== 'undefined' && UserActivityLog.log) {
            UserActivityLog.log(editId ? 'update' : 'add', 'DailySafetyCheckList', editId || '', {
                description: `${editId ? 'تحديث' : 'إضافة'} سجل مرور يومي: ${payload.siteName || ''} - ${payload.date || ''}`,
                siteName: payload.siteName,
                inspectorName: payload.inspectorName
            }).catch(() => {});
        }
        // المزامنة مع الخلفية في الخلفية (بدون انتظار)
        if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.autoSave) {
            GoogleIntegration.autoSave('DailySafetyCheckList', list).catch(() => {});
        }
    },

    /**
     * استرجاع صف/صفوف من جدول إجابات فورم المرور اليومي إلى DailySafetyCheckList (مدير فقط).
     * مثال من الكونسول: reprocessDailySafetyFormRows(492, 492)
     */
    async reprocessDailySafetyFormRows(fromRow, toRow) {
        if (typeof GoogleIntegration === 'undefined' || typeof GoogleIntegration.sendRequest !== 'function') {
            throw new Error('GoogleIntegration غير متاح');
        }
        const payload = {
            fromRow,
            toRow: toRow != null ? toRow : fromRow
        };
        if (typeof AppState !== 'undefined' && AppState.currentUser) {
            payload.userData = AppState.currentUser;
        }
        const result = await GoogleIntegration.sendRequest({
            action: 'reprocessDailySafetyFormRows',
            data: payload
        });
        if (typeof Utils !== 'undefined' && Utils.safeLog) {
            Utils.safeLog('reprocessDailySafetyFormRows:', result);
        } else {
            console.log('reprocessDailySafetyFormRows:', result);
        }
        return result;
    },

    async deleteDailySafetyCheckListRecord(id) {
        if (!confirm('هل أنت متأكد من حذف هذا السجل؟')) return;
        this.getDailySafetyCheckListRecords();
        const list = AppState.appData.dailySafetyCheckList;
        const idx = list.findIndex(r => r.id === id);
        if (idx === -1) { Notification.error('لم يتم العثور على السجل'); return; }
        list.splice(idx, 1);
        if (typeof DataManager !== 'undefined' && DataManager.save) DataManager.save();
        if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.autoSave) await GoogleIntegration.autoSave('DailySafetyCheckList', list).catch(() => {});
        Notification.success('تم حذف السجل');
        if (this.state.currentTab === 'daily-safety-checklist' || this.state.currentTab === 'daily-safety-analytics') {
            const contentContainer = document.getElementById('periodic-inspections-content-area');
            if (contentContainer) await this.refreshCurrentTabContent();
        }
    },

    /**
     * تحديث محتوى التبويب الحالي فقط (بدون إعادة تحميل كامل الموديول) — يضمن عدم فقدان البيانات وعدم تأخير العرض
     */
    async refreshCurrentTabContent() {
        const contentContainer = document.getElementById('periodic-inspections-content-area');
        if (!contentContainer || this.state.currentView === 'form' || this.state.currentView === 'edit') return;
        try {
            const isDscTab = (this.state.currentTab === 'daily-safety-checklist' || this.state.currentTab === 'daily-safety-analytics');

            // ✅ FIX تحميل البيانات: تبويبا المرور اليومي يحتاجان بيانات DailySafetyCheckList.
            // إذا لم تكن محمَّلة بعد، نضمن تحميلها عند الطلب (مستقل عن الحارس الزمني 3 ثوانٍ
            // وعن سلسلة getAllPeriodicInspections). نعرض الواجهة فوراً بالبيانات المتاحة،
            // ثم نُعيد الرسم تلقائياً بعد وصول البيانات من الخادم.
            let needsBackgroundDscFetch = false;
            let needsBackgroundPeFetch = false;
            if (isDscTab) {
                const dscArr = AppState.appData.dailySafetyCheckList;
                const hasData = Array.isArray(dscArr) && dscArr.length > 0;
                const lastAttempt = this._dscLastAttemptAt || 0;
                // إعادة الجلب عند فتح التبويب إذا انتهت صلاحية البيانات (60 ثانية) —
                // هذا يضمن ظهور السجلات الجديدة (من أجهزة/مستخدمين/فورم آخر) تلقائياً.
                const dataStale = (Date.now() - lastAttempt) > 60000;
                if ((!this._dscDataLoadedOnce || dataStale) && !this._dscDataLoadPromise) {
                    needsBackgroundDscFetch = true;
                    // عرض مؤشر تحميل خفيف فقط إذا لا توجد بيانات محلية لعرضها
                    if (!hasData) {
                        contentContainer.innerHTML = `
                            <div class="content-card">
                                <div class="card-body">
                                    <div class="empty-state" style="padding:2.5rem 1rem;text-align:center;">
                                        <div style="width:280px;margin:0 auto 14px;">
                                            <div style="width:100%;height:6px;background:rgba(37,99,235,0.18);border-radius:3px;overflow:hidden;">
                                                <div style="height:100%;background:linear-gradient(90deg,#3b82f6,#2563eb,#3b82f6);background-size:200% 100%;border-radius:3px;animation:loadingProgress 1.4s ease-in-out infinite;"></div>
                                            </div>
                                        </div>
                                        <p class="text-gray-500" style="font-size:0.9rem;">جاري تحميل بيانات قائمة المرور اليومي للسلامة...</p>
                                    </div>
                                </div>
                            </div>`;
                    }
                }
            }

            if (this.state.currentTab === 'equipment-database') {
                const peArr = AppState.appData.periodicEquipmentAssets;
                const hasPeData = Array.isArray(peArr) && peArr.length > 0;
                if (!this._peDataLoadedOnce && !this._peDataLoadPromise) {
                    needsBackgroundPeFetch = true;
                    if (!hasPeData) {
                        contentContainer.innerHTML = `
                            <div class="content-card"><div class="card-body">
                                <div class="empty-state" style="padding:2.5rem 1rem;text-align:center;">
                                    <p class="text-gray-500">جاري تحميل قاعدة بيانات المعدات...</p>
                                </div>
                            </div></div>`;
                    }
                }
            }

            let html = '';
            if (this.state.currentTab === 'daily-safety-checklist') {
                html = await this.renderDailySafetyCheckListContent();
            } else if (this.state.currentTab === 'daily-safety-analytics') {
                html = await this.renderDailySafetyAnalyticsContent();
            } else if (this.state.currentTab === 'inspection-records') {
                html = await this.renderInspectionRecords();
            } else if (this.state.currentTab === 'equipment-database') {
                if (typeof PeriodicEquipment !== 'undefined') {
                    html = await PeriodicEquipment.renderTab();
                }
            } else {
                html = await this.renderList();
            }
            // إذا كنا نعرض مؤشر التحميل (لا بيانات محلية)، لا نكتب فوقه HTML الفارغ — ننتظر الجلب
            const dscArrNow = AppState.appData.dailySafetyCheckList;
            const showingLoader = needsBackgroundDscFetch && !(Array.isArray(dscArrNow) && dscArrNow.length > 0);
            if (html && !showingLoader) {
                contentContainer.innerHTML = html;
                this.setupEventListeners();
                // ✅ رسم مخططات تحليل البيانات بعد inject الـ HTML (نفس نمط clinic/obs)
                if (this.state.currentTab === 'daily-safety-analytics') {
                    requestAnimationFrame(() => { this._dscDrawCharts().catch(() => {}); });
                }
                if (this.state.currentTab === 'equipment-database' && typeof PeriodicEquipment !== 'undefined') {
                    PeriodicEquipment.bindTabEvents();
                }
            }

            // ✅ الجلب في الخلفية ثم إعادة الرسم عند وصول البيانات
            if (needsBackgroundPeFetch) {
                this.loadPeriodicEquipmentData(false).then(() => {
                    this._peDataLoadedOnce = true;
                    if (this.state.currentTab === 'equipment-database') {
                        this.refreshCurrentTabContent().catch(() => {});
                    }
                }).catch(() => {
                    this._peDataLoadedOnce = true;
                    if (this.state.currentTab === 'equipment-database') {
                        this.refreshCurrentTabContent().catch(() => {});
                    }
                });
            }
            if (needsBackgroundDscFetch) {
                this.ensureDailySafetyDataLoaded().then(() => {
                    // النجاح: ensureDailySafetyDataLoaded يُضبط _dscDataLoadedOnce=true.
                    // عند الفشل: تبقى البيانات الحالية معروضة وتبقى إعادة المحاولة متاحة بعد انتهاء TTL.
                    if (this.state.currentTab === 'daily-safety-checklist' || this.state.currentTab === 'daily-safety-analytics') {
                        this.refreshCurrentTabContent().catch(() => {});
                    }
                }).catch(() => {
                    if (this.state.currentTab === 'daily-safety-checklist' || this.state.currentTab === 'daily-safety-analytics') {
                        this.refreshCurrentTabContent().catch(() => {});
                    }
                });
            }
        } catch (e) {
            Utils.safeWarn('⚠️ خطأ في refreshCurrentTabContent:', e);
        }
    },

    /**
     * تحميل بيانات قاعدة المعدات — مستقل عن loadInspectionDataAsync (تبويب equipment-database فقط)
     */
    async loadPeriodicEquipmentData(force) {
        if (this.state?.currentTab !== 'equipment-database') return;
        if (this._peDataLoadPromise && !force) {
            try { await this._peDataLoadPromise; } catch (_e) {}
            return;
        }
        if (typeof PeriodicEquipment === 'undefined' || typeof PeriodicEquipment.loadDataFromBackend !== 'function') return;
        this._peDataLoadPromise = PeriodicEquipment.loadDataFromBackend(!!force).finally(() => {
            this._peDataLoadPromise = null;
        });
        await this._peDataLoadPromise;
    },

    setupTabsNavigation() {
        setTimeout(() => {
            const tabButtons = document.querySelectorAll('#periodic-inspections-section .tab-btn[data-tab]');
            const tabContents = document.querySelectorAll('#periodic-inspections-section .tab-content');

            tabButtons.forEach(button => {
                // ✅ FIX أداء (إصلاح التباطؤ التراكمي):
                // أزرار التبويبات موجودة في ترويسة المديول — خارج content-area —
                // فهي تبقى عبر كل refreshCurrentTabContent. سابقاً كنا نُضيف
                // addEventListener('click') جديد في كل مرة → تتراكم المستمعات،
                // فالنقرة الواحدة تُطلق refreshCurrentTabContent عدة مرات
                // (كل مرة تعيد رسم HTML ضخم + 5 رسوم Chart.js) → بطء متضاعف.
                // الحل: ربط مرة واحدة فقط لكل زر عبر علامة dataset.
                if (button.dataset.tabNavBound === 'true') return;
                button.dataset.tabNavBound = 'true';

                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');
                    // إعادة قراءة الأزرار لحظة النقر (قد تتغير الحالة بين الربط والنقر)
                    const allBtns = document.querySelectorAll('#periodic-inspections-section .tab-btn[data-tab]');
                    const allContents = document.querySelectorAll('#periodic-inspections-section .tab-content');
                    allBtns.forEach(btn => btn.classList.remove('active'));
                    allContents.forEach(content => content.classList.remove('active'));
                    button.classList.add('active');

                    // تفادي إعادة رسم نفس التبويب المعروض حالياً (لا داعي لإعادة العمل)
                    if (this.state.currentTab === targetTab) return;

                    this.state.currentTab = targetTab;
                    this.refreshCurrentTabContent();
                });
            });
        }, 100);
    },

    async renderInspectionRecords() {
        try {
            if (!AppState.appData || !AppState.appData.periodicInspections) {
                return `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-history text-4xl text-gray-300 mb-4"></i>
                                <p class="text-gray-500">لا توجد سجلات فحوصات دورية</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            const inspections = AppState.appData.periodicInspections || [];
            
            // ترتيب حسب التاريخ (الأحدث أولاً)
            const sortedInspections = [...inspections].sort((a, b) => {
                const dateA = new Date(a.inspectionDate || a.createdAt || 0);
                const dateB = new Date(b.inspectionDate || b.createdAt || 0);
                return dateB - dateA;
            });

            // تجميع حسب الشهر
            const groupedByMonth = {};
            sortedInspections.forEach(inspection => {
                const date = new Date(inspection.inspectionDate || inspection.createdAt);
                const monthKey = date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long' });
                if (!groupedByMonth[monthKey]) {
                    groupedByMonth[monthKey] = [];
                }
                groupedByMonth[monthKey].push(inspection);
            });

            // حساب الإحصائيات
            const stats = this.calculateStatistics(inspections);

            // ✅ ملخص مصغّر لكل شهر (مطابق / جزئي / غير مطابق / قيد المراجعة)
            const monthSummary = records => {
                let ok = 0, bad = 0, part = 0, pend = 0;
                records.forEach(r => {
                    const res = r.result || '';
                    if (res === 'مطابق') ok++;
                    else if (res === 'غير مطابق') bad++;
                    else if (res === 'مطابق جزئياً') part++;
                    else if (res === 'قيد المراجعة') pend++;
                });
                return { ok, bad, part, pend };
            };

            // ✅ كرت سجل فحص كامل
            const recordCard = inspection => {
                const template = inspection.templateId ? this.INSPECTION_TEMPLATES[inspection.templateId] : null;
                const categoryDisplay = template ? template.name : (inspection.category || 'فحص دوري');
                const icon = template ? template.icon : 'fas fa-clipboard-list';
                const resultBadgeClass = this.getResultBadgeClass(inspection.result);
                const resultIcon = this.getResultIcon(inspection.result);
                const accent = this._getResultAccent(inspection.result);
                const hex = this._getResultHex(accent);
                const date = new Date(inspection.inspectionDate || inspection.createdAt);
                const number = inspection.inspectionNumber || inspection.id || '-';
                const notes = (inspection.notes || '').trim();
                return `
                    <article class="pinsp-record__card accent-${accent}">
                        <div class="pinsp-record__top">
                            <span class="pinsp-record__icon" style="background:${hex}1A;color:${hex};"><i class="${icon}"></i></span>
                            <div class="pinsp-record__title">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <h5>${Utils.escapeHTML(categoryDisplay)}</h5>
                                    <span class="badge ${resultBadgeClass} inline-flex items-center gap-1">
                                        <i class="${resultIcon}"></i>${Utils.escapeHTML(inspection.result || 'قيد المراجعة')}
                                    </span>
                                </div>
                                <div class="pinsp-record__sub">
                                    <span class="pinsp-record__num" dir="ltr"><i class="fas fa-hashtag"></i>${Utils.escapeHTML(String(number))}</span>
                                    <span><i class="far fa-calendar-check"></i>${Utils.formatDate(date)}</span>
                                </div>
                            </div>
                            <div class="pinsp-record__actions">
                                <div class="flex items-center gap-2">
                                    <button onclick="PeriodicInspections.viewInspection('${inspection.id}')" class="btn-icon btn-icon-info" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                                    <button onclick="PeriodicInspections.exportInspectionById('${inspection.id}')" class="btn-icon btn-icon-success" title="تحميل PDF"><i class="fas fa-file-pdf"></i></button>
                                    <button onclick="PeriodicInspections.editInspection('${inspection.id}')" class="btn-icon btn-icon-primary" title="تعديل"><i class="fas fa-edit"></i></button>
                                    <button onclick="PeriodicInspections.deleteInspection('${inspection.id}')" class="btn-icon btn-icon-danger" title="حذف"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="pinsp-record__meta">
                            <span><i class="fas fa-map-marker-alt"></i>${Utils.escapeHTML(inspection.location || inspection.equipment || '-')}</span>
                            <span><i class="fas fa-user-tie"></i>${Utils.escapeHTML(inspection.inspector || '-')}</span>
                            <span><i class="fas fa-clock"></i><span dir="ltr">${date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span></span>
                        </div>
                        ${notes ? `
                        <div class="pinsp-record__notes">
                            <i class="fas fa-sticky-note ml-2"></i><strong>ملاحظات:</strong> ${Utils.escapeHTML(notes.length > 160 ? notes.substring(0, 160) + '…' : notes)}
                        </div>` : ''}
                    </article>`;
            };

            return `
                <!-- ✅ إحصائيات السجل — كروت هوية -->
                ${this._renderPinspStats(stats)}

                <!-- ✅ سجل الفحوصات الدورية — كروت احترافية -->
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between flex-wrap gap-2">
                            <h3 class="card-title">
                                <i class="fas fa-history ml-2"></i>
                                سجل الفحوصات الدورية
                            </h3>
                            <span class="badge badge-info">${sortedInspections.length} سجل</span>
                        </div>
                    </div>
                    <div class="card-body">
                        ${Object.keys(groupedByMonth).length === 0 ? `
                            <div class="empty-state">
                                <i class="fas fa-clipboard-check text-4xl text-gray-300 mb-4"></i>
                                <p class="text-gray-500">لا توجد سجلات فحوصات دورية</p>
                            </div>
                        ` : Object.keys(groupedByMonth).map(month => {
                            const records = groupedByMonth[month];
                            const m = monthSummary(records);
                            const chips = `
                                ${m.ok ? `<span class="p-green"><i class="fas fa-check-circle"></i>${m.ok} مطابق</span>` : ''}
                                ${m.part ? `<span class="p-amber"><i class="fas fa-exclamation-circle"></i>${m.part} جزئي</span>` : ''}
                                ${m.bad ? `<span class="p-red"><i class="fas fa-times-circle"></i>${m.bad} غير مطابق</span>` : ''}
                                ${m.pend ? `<span class="p-blue"><i class="fas fa-clock"></i>${m.pend} قيد المراجعة</span>` : ''}
                            `;
                            return `
                            <div class="pinsp-month">
                                <div class="pinsp-month__head">
                                    <div class="pinsp-month__icon"><i class="fas fa-calendar-alt"></i></div>
                                    <div>
                                        <h4 class="pinsp-month__title">${month}</h4>
                                        <span class="pinsp-month__count"><i class="fas fa-clipboard-list"></i>${records.length} فحص</span>
                                    </div>
                                    ${chips ? `<div class="pinsp-month__chips">${chips}</div>` : ''}
                                </div>
                                ${records.map(recordCard).join('')}
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            `;
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في عرض سجل الفحوصات الدورية:', error);
            return `
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500">حدث خطأ في تحميل البيانات</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }
};

// Bind methods to maintain 'this' context
Object.keys(PeriodicInspections).forEach(key => {
    if (typeof PeriodicInspections[key] === 'function') {
        PeriodicInspections[key] = PeriodicInspections[key].bind(PeriodicInspections);
    }
});

// ===== Export module to global scope =====
// تصدير الموديول إلى window فوراً لضمان توافره
(function () {
    'use strict';
    try {
        if (typeof window !== 'undefined' && typeof PeriodicInspections !== 'undefined') {
            window.PeriodicInspections = PeriodicInspections;
            window.reprocessDailySafetyFormRows = function (fromRow, toRow) {
                return PeriodicInspections.reprocessDailySafetyFormRows(fromRow, toRow);
            };

            // إشعار عند تحميل الموديول بنجاح
            if (typeof AppState !== 'undefined' && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ PeriodicInspections module loaded and available on window.PeriodicInspections');
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تصدير PeriodicInspections:', error);
        // محاولة التصدير مرة أخرى حتى في حالة الخطأ
        if (typeof window !== 'undefined' && typeof PeriodicInspections !== 'undefined') {
            try {
                window.PeriodicInspections = PeriodicInspections;
            } catch (e) {
                console.error('❌ فشل تصدير PeriodicInspections:', e);
            }
        }
    }
})();

