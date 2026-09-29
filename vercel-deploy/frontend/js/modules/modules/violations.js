/**
 * Violations Module
 * تم استخراجه من app-modules.js
 */
// ===== Violations Module (مخالفات الموظفين والمقاولين) =====
const Violations = {
    _t(key, fallback) {
        if (window.AppI18n && typeof window.AppI18n.t === 'function') return window.AppI18n.t(key, fallback);
        if (window.I18n && typeof window.I18n.t === 'function') return window.I18n.t(key, fallback);
        return fallback;
    },

    applyModuleI18n(root) {
        const i18nCore = (window.AppI18n && typeof window.AppI18n.applyI18n === 'function')
            ? window.AppI18n
            : ((window.I18n && typeof window.I18n.applyI18n === 'function') ? window.I18n : null);
        if (!i18nCore) return;
        const target = root || document.getElementById('viol-analytics-root');
        if (!target) return;
        if (typeof i18nCore.applyI18n === 'function') i18nCore.applyI18n(target);
        if (typeof i18nCore.applyLiteralTranslations === 'function') i18nCore.applyLiteralTranslations(target);
    },

    currentFilters: {
        search: '',
        personType: '',
        violationType: '',
        severity: '',
        status: ''
    },

    parseFineAmount(value) {
        if (value === null || value === undefined || value === '') return 0;
        if (typeof value === 'number') {
            return Number.isFinite(value) && value >= 0 ? value : 0;
        }
        const arabicIndicDigits = '٠١٢٣٤٥٦٧٨٩';
        const easternArabicDigits = '۰۱۲۳۴۵۶۷۸۹';
        const toAsciiDigits = (input) => String(input || '').replace(/[٠-٩۰-۹]/g, (char) => {
            const idxArabicIndic = arabicIndicDigits.indexOf(char);
            if (idxArabicIndic >= 0) return String(idxArabicIndic);
            const idxEasternArabic = easternArabicDigits.indexOf(char);
            return idxEasternArabic >= 0 ? String(idxEasternArabic) : char;
        });
        const normalized = String(value)
            .trim();
        const normalizedDigits = toAsciiDigits(normalized)
            .replace(/[,\u066C]/g, '')
            .replace(/\u066B/g, '.')
            .replace(/[^\d.\-]/g, '');
        const parsed = Number(normalizedDigits);
        return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    },

    // ═══════════════════════════════════════════════════════════════════
    // ✅ Currency Manager — تحويل العملة (EGP افتراضي + USD اختياري)
    // كل القيم في قاعدة البيانات مخزّنة بالجنيه المصري (EGP).
    // التحويل لـ USD يحدث فقط وقت العرض حسب exchange rate القابل للتعديل.
    // ═══════════════════════════════════════════════════════════════════
    _VIOL_CURRENCY_KEY: 'viol_currency',
    _VIOL_RATE_KEY: 'viol_exchange_rate',
    _VIOL_DEFAULT_RATE: 50, // 1 USD ≈ 50 EGP (افتراضي قابل للتعديل)

    getCurrentCurrency() {
        try {
            const stored = localStorage.getItem(this._VIOL_CURRENCY_KEY);
            return (stored === 'USD') ? 'USD' : 'EGP';
        } catch (e) { return 'EGP'; }
    },

    setCurrentCurrency(code) {
        const normalized = (code === 'USD') ? 'USD' : 'EGP';
        try { localStorage.setItem(this._VIOL_CURRENCY_KEY, normalized); } catch (e) {}
        return normalized;
    },

    getExchangeRate() {
        try {
            const stored = parseFloat(localStorage.getItem(this._VIOL_RATE_KEY));
            return (Number.isFinite(stored) && stored > 0) ? stored : this._VIOL_DEFAULT_RATE;
        } catch (e) { return this._VIOL_DEFAULT_RATE; }
    },

    setExchangeRate(rate) {
        const num = parseFloat(rate);
        if (!Number.isFinite(num) || num <= 0) return false;
        try { localStorage.setItem(this._VIOL_RATE_KEY, String(num)); } catch (e) {}
        return true;
    },

    /**
     * تحويل المبلغ من EGP إلى العملة المطلوبة
     * @param {number} amountEGP - المبلغ بالجنيه المصري
     * @param {string} [toCurrency] - العملة المستهدفة (افتراضي: الحالية)
     * @returns {number} المبلغ بالعملة المستهدفة
     */
    convertFineAmount(amountEGP, toCurrency) {
        const target = toCurrency || this.getCurrentCurrency();
        const num = Number(amountEGP) || 0;
        if (target === 'USD') {
            const rate = this.getExchangeRate();
            return rate > 0 ? num / rate : 0;
        }
        return num; // EGP
    },

    /**
     * تنسيق المبلغ بصورة جاهزة للعرض (مع رمز العملة الحالية)
     * مثال: 1500 → "1,500 ج.م" أو "30 $"
     */
    formatFineAmount(amountEGP, options = {}) {
        const currency = options.currency || this.getCurrentCurrency();
        const symbol = currency === 'USD' ? '$' : 'ج.م';
        const converted = this.convertFineAmount(amountEGP, currency);
        // الجنيه المصري: بدون كسور. الدولار: حتى منزلتين عشريتين
        const formatted = currency === 'USD'
            ? converted.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
            : converted.toLocaleString('en-US', { maximumFractionDigits: 0 });
        return currency === 'USD' ? `${formatted} $` : `${formatted} ${symbol}`;
    },

    /**
     * إرجاع رمز/اسم العملة الحالية للاستخدام في عناوين المخططات
     */
    getCurrencyLabel(form = 'short') {
        const currency = this.getCurrentCurrency();
        if (currency === 'USD') return form === 'long' ? this._t('module.violations.analytics.currency.usd_long', 'دولار أمريكي') : '$';
        return form === 'long' ? this._t('module.violations.analytics.currency.egp_long', 'جنيه مصري') : this._t('module.violations.analytics.currency.egp_short', 'ج.م');
    },

    normalizeViolationRecord(record) {
        if (!record || typeof record !== 'object') return null;
        try {
            const fineAmountRaw =
                record.fineAmount ??
                record.defaultFineAmount ??
                record.fine_amount ??
                record.fine ??
                record.amount ??
                record['القيمة المالية'] ??
                record['قيمة مالية'] ??
                0;
            const fineAmount = this.parseFineAmount(fineAmountRaw);
            const personType = record.personType || (record.contractorName ? 'contractor' : 'employee');

            // تنقية وتطهير صيغة الوقت المسجل مع استخراج الوقت البديل إن كان حقل الوقت فارغاً أو متأثراً بـ 1899-12-30
            let cleanedTime = '';
            try {
                if (typeof this.getResolvedViolationTime === 'function') {
                    cleanedTime = this.getResolvedViolationTime(record);
                }
            } catch (eTime) {
                cleanedTime = '';
            }

            if (!cleanedTime) {
                let rawTime = String(record.violationTime ?? record['وقت المخالفة'] ?? '').trim();
                if (rawTime && rawTime !== '—' && rawTime !== '-') {
                    const isEpoch = rawTime.includes('1899-12-30') || rawTime.includes('1899-12-31') || rawTime.includes('1900-01-00');
                    const tm = rawTime.match(/(?:T|\s|^)(\d{1,2}):(\d{2})/);
                    if (tm) {
                        const hNum = parseInt(tm[1], 10);
                        const mNum = parseInt(tm[2], 10);
                        const isMidnightEpoch = isEpoch && (hNum === 0 || hNum === 2 || hNum === 3) && mNum === 0;
                        if (!isMidnightEpoch) {
                            cleanedTime = `${String(hNum).padStart(2, '0')}:${String(mNum).padStart(2, '0')}`;
                        }
                    }
                }
            }

            // تنقية كود المقاول من التواريخ الشاردة في جداول جوجل
            let contractorId = String(record.contractorId || '').trim();
            let contractorCode = String(record.contractorCode || '').trim();
            if (/^\d{4}-\d{2}-\d{2}/.test(contractorId) || /^\d{1,2}\/\d{1,2}\/\d{4}/.test(contractorId)) {
                contractorId = '';
            }
            if (/^\d{4}-\d{2}-\d{2}/.test(contractorCode) || /^\d{1,2}\/\d{1,2}\/\d{4}/.test(contractorCode)) {
                contractorCode = '';
            }

            // تنقية مكان وموقع المخالفة لمنع تشوه الحروف العربية وإزالة التطويل والشرطات السفلية
            let violationPlace = record.violationPlace ?? record['مكان المخالفة'] ?? '';
            if (violationPlace) {
                violationPlace = typeof this.formatLocationPlace === 'function' ? this.formatLocationPlace(violationPlace) : String(violationPlace).replace(/\u0640+/g, '').replace(/_+/g, ' - ').trim();
            }
            let violationLocation = record.violationLocation ?? record['الموقع'] ?? '';
            if (violationLocation) {
                violationLocation = typeof this.formatLocationPlace === 'function' ? this.formatLocationPlace(violationLocation) : String(violationLocation).replace(/\u0640+/g, '').replace(/_+/g, ' - ').trim();
            }

            // تنقية معرف نوع المخالفة لمنع ظهور المعرفات العشوائية VTYPE_ في التقارير
            let violationTypeId = String(record.violationTypeId || '').trim();
            if (/^VTYPE_/i.test(violationTypeId) && typeof this.getCleanViolationTypeCode === 'function') {
                try {
                    violationTypeId = this.getCleanViolationTypeCode(record);
                } catch (eType) {}
            }

            // تنقية السبب الجذري للمخالفة RCA
            let rootCause = String(record.rootCause ?? record['السبب الجذري'] ?? record['سبب المخالفة'] ?? '').trim();

            return {
                ...record,
                personType,
                fineAmount,
                violationTime: cleanedTime,
                violationTypeId,
                contractorId,
                contractorCode,
                violationPlace: violationPlace || record.violationPlace,
                violationLocation: violationLocation || record.violationLocation,
                rootCause: rootCause || record.rootCause || ''
            };
        } catch (fatalNorm) {
            return record;
        }
    },

    /** معرّف آمن لاستخدامه داخل onclick (يفادي كسر السلسلة عند وجود علامات اقتباس أو شرطة مائلة) */
    _escapeIdForHandler(id) {
        return JSON.stringify(id == null ? '' : String(id));
    },

    /**
     * القيمة المالية المعروضة: إن كانت 0 أو فارغة في السجل لكن نوع المخالفة له غرامة افتراضية، تُعرض غرامة النوع فوراً (بدون انتظار مزامنة الشيت).
     */
    getEffectiveFineAmount(record) {
        const norm = this.normalizeViolationRecord(record);
        if (!norm) return 0;
        const stored = this.parseFineAmount(norm.fineAmount);
        if (stored > 0) return stored;
        let types = [];
        try {
            if (typeof ViolationTypesManager !== 'undefined' && ViolationTypesManager.ensureInitialized && ViolationTypesManager.getAll) {
                ViolationTypesManager.ensureInitialized();
                types = ViolationTypesManager.getAll() || [];
            }
        } catch (e) {
            types = [];
        }
        if (!types.length && typeof AppState !== 'undefined' && Array.isArray(AppState?.appData?.violationTypes)) {
            types = AppState.appData.violationTypes;
        }
        const id = String(norm.violationTypeId || '').trim();
        const name = String(norm.violationType || '').trim().toLowerCase();
        let typeFine = 0;
        if (id) {
            const t = types.find((x) => x && String(x.id) === id);
            if (t) typeFine = this.parseFineAmount(t.fineAmount);
        }
        if (typeFine <= 0 && name) {
            const t = types.find((x) => x && String(x.name || '').trim().toLowerCase() === name);
            if (t) typeFine = this.parseFineAmount(t.fineAmount);
        }
        return typeFine > 0 ? typeFine : stored;
    },

    _normKeyStr(v) {
        if (v == null) return '';
        let str = String(v).trim().toLowerCase();
        // إزالة الحركات (التشكيل)
        str = str.replace(/[\u064B-\u065F\u0670]/g, '');
        // توحيد الألف (أ، إ، آ) إلى ألف عادية (ا)
        str = str.replace(/[أإآ]/g, 'ا');
        // توحيد التاء المربوطة (ة) إلى هاء (ه)
        str = str.replace(/ة/g, 'ه');
        // توحيد الياء والألف المقصورة (ى) إلى ياء عادية (ي)
        str = str.replace(/[ى]/g, 'ي');
        // إزالة المسافات المتعددة
        str = str.replace(/\s+/g, ' ');
        // إزالة الرموز وعلامات الترقيم التي قد تختلف
        str = str.replace(/[^\w\s\u0600-\u06FF]/g, '');
        return str.trim();
    },

    sameViolationPersonForSequence(draft, existing) {
        const pt = this._normKeyStr(draft.personType) || 'employee';
        const p2 = this._normKeyStr(existing.personType) || 'employee';
        if (pt !== p2) return false;
        if (pt === 'contractor') {
            const w1 = this._normKeyStr(draft.contractorWorker);
            const w2 = this._normKeyStr(existing.contractorWorker);
            // مطابقة اسم العامل التابع للمقاول مباشرة إذا تطابق الاسمان
            if (w1 && w2 && w1 === w2) return true;

            const id1 = this._normKeyStr(draft.contractorId);
            const id2 = this._normKeyStr(existing.contractorId);
            if (id1 && id2 && id1 === id2) {
                if (!w1 && !w2) return true;
                return !w1 || !w2 || w1 === w2;
            }
            const n1 = this._normKeyStr(draft.contractorName);
            const n2 = this._normKeyStr(existing.contractorName);
            if (!n1 || !n2 || n1 !== n2) return false;
            if (!w1 && !w2) return true;
            return w1 === w2;
        }
        const c1 = this._normKeyStr(draft.employeeCode || draft.employeeNumber);
        const c2 = this._normKeyStr(existing.employeeCode || existing.employeeNumber);
        if (c1 && c2) return c1 === c2;
        const n1 = this._normKeyStr(draft.employeeName);
        const n2 = this._normKeyStr(existing.employeeName);
        return !!n1 && n1 === n2;
    },

    getViolationYearMonthKey(violationDate) {
        const d = new Date(violationDate);
        if (isNaN(d.getTime())) return null;
        return d.getFullYear() * 12 + d.getMonth();
    },

    _recentViolationDupKeys: [],
    _violationSubmitLock: false,
    _violationInflightDupKey: '',

    _violationDateKey(v) {
        const raw = v && v.violationDate;
        if (raw == null || raw === '') return '';
        const s = String(raw).trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
        const d = new Date(s);
        if (!isNaN(d.getTime())) {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        }
        const isoDay = s.match(/^(\d{4}-\d{2}-\d{2})/);
        return isoDay ? isoDay[1] : '';
    },

    /**
     * تنقية وتطهير نصوص الأماكن والمواقع من أي تشوهات أو تطويل أو شرطات سفلية مسببة لتفكك الحروف
     */
    formatLocationPlace(place) {
        if (!place) return '—';
        let str = String(place).trim();
        if (!str || str === '—' || str === '-') return '—';
        // إزالة التطويل / الكشيدة (\u0640) التي تسبب تشوه أو تفكك اتصال الحروف العربية
        str = str.replace(/\u0640+/g, '');
        // إزالة الحروف غير المرئية ومحارف التوجيه الخفية
        str = str.replace(/[\u200B-\u200F\uFEFF]/g, '');
        // استبدال الشرطات السفلية _ بفاصل نظيف يفصل الإنجليزية عن العربية
        str = str.replace(/_+/g, ' - ');
        // ضبط الفواصل والمسافات الزائدة
        str = str.replace(/\s*-\s*-\s*/g, ' - ').replace(/\s+/g, ' ').trim();
        return str || '—';
    },

    /**
     * استخراج كود المقاول بشكل نظيف وموثوق مع تطهيره من أي تواريخ شاردة في جداول جوجل
     */
    getCleanContractorCode(v) {
        if (!v) return '—';
        let code = String(v.contractorCode || v.contractorId || '').trim();
        const isDateString = /^\d{4}-\d{2}-\d{2}/.test(code) || /^\d{1,2}\/\d{1,2}\/\d{4}/.test(code);
        if (!code || isDateString || code === '—' || code === '-') {
            // محاولة جلب كود المقاول الحقيقي من مديول المقاولين
            if (v.contractorName && typeof Contractors !== 'undefined' && typeof Contractors.resolveContractorForAnalytics === 'function') {
                try {
                    const c = Contractors.resolveContractorForAnalytics('', v.contractorName);
                    if (c) {
                        const candidate = String(c.code || c.contractorCode || c.isoCode || c.id || '').trim();
                        if (candidate && !/^\d{4}-\d{2}-\d{2}/.test(candidate)) {
                            return candidate;
                        }
                    }
                } catch (e) {}
            }
            // فحص قائمة المقاولين المعتمدين مباشرة في AppState
            if (v.contractorName && typeof AppState !== 'undefined' && Array.isArray(AppState.appData?.approvedContractors)) {
                const normName = String(v.contractorName).trim().toLowerCase();
                const found = AppState.appData.approvedContractors.find(c => {
                    const cName = String(c.companyName || c.name || '').trim().toLowerCase();
                    return cName && (cName === normName || cName.includes(normName) || normName.includes(cName));
                });
                if (found) {
                    const candidate = String(found.code || found.contractorCode || found.isoCode || found.id || '').trim();
                    if (candidate && !/^\d{4}-\d{2}-\d{2}/.test(candidate)) {
                        return candidate;
                    }
                }
            }
            return '—';
        }
        return code;
    },

    /**
     * استخراج وتحديد توقيت المخالفة الفعلي من جميع الحقول المتاحة (violationTime, violationDate, createdAt)
     */
    getResolvedViolationTime(record) {
        if (!record) return '';
        try {
            // 1. فحص حقل الوقت المباشر
            const rawTime = record.violationTime ?? record['وقت المخالفة'] ?? record.time;
            if (rawTime !== undefined && rawTime !== null && rawTime !== '' && rawTime !== '—' && rawTime !== '-') {
                const timeStr = String(rawTime).trim();
                if (/^0\.\d+$/.test(timeStr)) {
                    const frac = parseFloat(timeStr);
                    const totalMin = Math.round(frac * 24 * 60);
                    const h = Math.floor(totalMin / 60);
                    const m = totalMin % 60;
                    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                }
                const tm = timeStr.match(/(?:T|\s|^)(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM|am|pm|[صم]))?/i);
                if (tm) {
                    const isEpoch = timeStr.includes('1899-12-30') || timeStr.includes('1899-12-31') || timeStr.includes('1900-01-00');
                    let h = parseInt(tm[1], 10);
                    const m = String(tm[2] || '00').padStart(2, '0');
                    const marker = String(tm[4] || '').toUpperCase();
                    if (marker === 'PM' || marker === 'م') {
                        if (h < 12) h += 12;
                    } else if (marker === 'AM' || marker === 'ص') {
                        if (h === 12) h = 0;
                    }
                    const isMidnightEpoch = isEpoch && (h === 0 || h === 2 || h === 3) && (m === '00' || m === '0');
                    if (!isMidnightEpoch) {
                        return `${String(h).padStart(2, '0')}:${m}`;
                    }
                }
            }

            // 2. فحص تاريخ المخالفة إذا كان يحوي طابعاً زمنياً حقيقياً (استبعاد منتصف الليل المنزاح بتوقيت القاهرة 00:00, 02:00, 03:00)
            const rawDate = record.violationDate ?? record['تاريخ المخالفة'] ?? record.date;
            if (rawDate && typeof rawDate === 'string' && (rawDate.includes('T') || rawDate.includes(' '))) {
                const d = new Date(rawDate);
                if (!isNaN(d.getTime())) {
                    const h = d.getHours();
                    const m = d.getMinutes();
                    const s = d.getSeconds();
                    const isMidnightArtifact = (h === 0 || h === 2 || h === 3) && m === 0 && s === 0;
                    if (!isMidnightArtifact && (h !== 0 || m !== 0)) {
                        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                    }
                }
            }

            // 3. فحص معرّف المخالفة إذا كان يحمل طابعاً زمنياً حقيقياً لحظة التسجيل الميداني (VIOLATION_<timestamp>_...)
            const rawId = String(record.id || '').trim();
            const idTimestampMatch = rawId.match(/VIOLATION_(\d{13})_/);
            if (idTimestampMatch) {
                const ts = parseInt(idTimestampMatch[1], 10);
                if (!isNaN(ts) && ts > 1600000000000) {
                    const d = new Date(ts);
                    if (!isNaN(d.getTime())) {
                        const h = d.getHours();
                        const m = d.getMinutes();
                        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                    }
                }
            }

            // 4. فحص وقت إنشاء السجل في النظام الميداني
            const rawCreated = record.createdAt ?? record['تاريخ الإنشاء'] ?? record.timestamp;
            if (rawCreated && typeof rawCreated === 'string' && (rawCreated.includes('T') || rawCreated.includes(' '))) {
                const d = new Date(rawCreated);
                if (!isNaN(d.getTime())) {
                    const h = d.getHours();
                    const m = d.getMinutes();
                    const s = d.getSeconds();
                    const isMidnight = (h === 0 || h === 2 || h === 3) && m === 0 && s === 0;
                    if (!isMidnight && (h !== 0 || m !== 0)) {
                        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                    }
                }
            }

            return '';
        } catch (e) {
            return '';
        }
    },

    /**
     * استخراج كود تصنيف نوع المخالفة بشكل مهني ومعتمد لمعايير ISO وتطهيره من المعرفات الداخلية العشوائية
     */
    getCleanViolationTypeCode(v) {
        if (!v) return '—';
        const rawId = String(v.violationTypeId || '').trim();
        const typeName = String(v.violationType || '').trim().toLowerCase();

        let allTypes = [];
        try {
            if (typeof ViolationTypesManager !== 'undefined' && ViolationTypesManager.getAll) {
                allTypes = ViolationTypesManager.getAll() || [];
            }
        } catch (e) {}
        if (!allTypes.length && typeof AppState !== 'undefined' && Array.isArray(AppState.appData?.violationTypes)) {
            allTypes = AppState.appData.violationTypes;
        }

        const typeObj = allTypes.find(t =>
            (rawId && String(t.id).trim() === rawId) ||
            (typeName && String(t.name || '').trim().toLowerCase() === typeName)
        );

        if (typeObj) {
            const exp = typeObj.code || typeObj.isoCode || typeObj.typeCode;
            let code = '';
            if (exp && !exp.startsWith('VTYPE_')) {
                code = exp;
            } else {
                const idx = allTypes.findIndex(t => t.id === typeObj.id);
                code = `VT-${String(idx >= 0 ? idx + 1 : 1).padStart(2, '0')}`;
            }
            if (typeObj.category) {
                return `${code} (${typeObj.category})`;
            }
            return code;
        }

        if (/^VTYPE_/i.test(rawId)) {
            return 'VT-01';
        }

        return rawId || '—';
    },

    /**
     * تنسيق وقت المخالفة بشكل سليم باللغة العربية (12 ساعة ص/م) وتطهيره من أي تواريخ Google Sheets افتراضية
     */
    formatViolationTime(timeVal) {
        if (!timeVal) return '';
        try {
            const str = String(timeVal).trim();
            if (!str || str === '—' || str === '-') return '';
            if (/^\d{4}-\d{2}-\d{2}$/.test(str) || /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) return '';
            const isEpoch = str.includes('1899-12-30') || str.includes('1899-12-31') || str.includes('1900-01-00');
            const tm = str.match(/(?:T|\s|^)(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM|am|pm|[صم]))?/i);
            if (!tm) return '';
            let h24 = parseInt(tm[1], 10);
            const mm = String(tm[2] || '00').padStart(2, '0');
            const marker = String(tm[4] || '').toUpperCase();
            if (isEpoch && h24 === 0 && (mm === '00' || mm === '0')) return '';
            if (marker === 'PM' || marker === 'م') {
                if (h24 < 12) h24 += 12;
            } else if (marker === 'AM' || marker === 'ص') {
                if (h24 === 12) h24 = 0;
            }
            const period = h24 >= 12 ? 'م' : 'ص';
            const h12 = (h24 % 12) || 12;
            return `${h12}:${mm} ${period}`;
        } catch (e) {
            return '';
        }
    },

    _violationTimeKey(v) {
        const t = String((v && v.violationTime) || '').trim();
        const m = t.match(/(\d{1,2}):(\d{2})/);
        if (m) return `${String(Number(m[1])).padStart(2, '0')}:${m[2]}`;
        const d = new Date(v && v.violationDate);
        if (!isNaN(d.getTime())) {
            return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        }
        return '';
    },

    _sameViolationTextField(a, b) {
        const na = this._normKeyStr(a);
        const nb = this._normKeyStr(b);
        if (!na && !nb) return true;
        return !!na && na === nb;
    },

    isDuplicateViolationRecord(draft, existing) {
        if (!draft || !existing) return false;
        if (!this.sameViolationPersonForSequence(draft, existing)) return false;
        if (this._violationDateKey(draft) !== this._violationDateKey(existing)) return false;
        if (this._violationTimeKey(draft) !== this._violationTimeKey(existing)) return false;
        const typeA = this._normKeyStr(draft.violationTypeId || draft.violationType);
        const typeB = this._normKeyStr(existing.violationTypeId || existing.violationType);
        if (typeA !== typeB) return false;
        const locIdA = this._normKeyStr(draft.violationLocationId);
        const locIdB = this._normKeyStr(existing.violationLocationId);
        if (locIdA && locIdB) {
            if (locIdA !== locIdB) return false;
        } else if (!this._sameViolationTextField(draft.violationLocation, existing.violationLocation)) {
            return false;
        }
        const placeIdA = this._normKeyStr(draft.violationPlaceId);
        const placeIdB = this._normKeyStr(existing.violationPlaceId);
        if (placeIdA && placeIdB) {
            if (placeIdA !== placeIdB) return false;
        } else if (!this._sameViolationTextField(draft.violationPlace, existing.violationPlace)) {
            return false;
        }
        return true;
    },

    _buildViolationDupKey(v) {
        const pt = this._normKeyStr(v && v.personType) || 'employee';
        const person = pt === 'contractor'
            ? `${this._normKeyStr(v.contractorName)}|${this._normKeyStr(v.contractorWorker)}`
            : this._normKeyStr((v && (v.employeeCode || v.employeeNumber)) || '');
        return [
            pt,
            person,
            this._violationDateKey(v),
            this._violationTimeKey(v),
            this._normKeyStr((v && (v.violationTypeId || v.violationType)) || ''),
            this._normKeyStr((v && (v.violationLocationId || v.violationLocation)) || ''),
            this._normKeyStr((v && (v.violationPlaceId || v.violationPlace)) || ''),
            this._normKeyStr((v && v.violationDetails) || '')
        ].join('||');
    },

    _rememberViolationDupKey(draft) {
        if (!Array.isArray(this._recentViolationDupKeys)) this._recentViolationDupKeys = [];
        const key = this._buildViolationDupKey(draft);
        if (!key) return;
        const now = Date.now();
        this._recentViolationDupKeys = this._recentViolationDupKeys.filter((x) => x && now - x.at < 10 * 60 * 1000);
        if (!this._recentViolationDupKeys.some((x) => x.key === key)) {
            this._recentViolationDupKeys.push({ key, at: now });
        }
    },

    findDuplicateViolation(draft, opts = {}) {
        if (!draft) return null;
        const excludeId = opts.excludeId ? String(opts.excludeId) : '';
        const list = (typeof AppState !== 'undefined' && AppState.appData && AppState.appData.violations) || [];
        for (let i = 0; i < list.length; i++) {
            const v = list[i];
            if (!v) continue;
            if (excludeId && String(v.id) === excludeId) continue;
            if (this.isDuplicateViolationRecord(draft, v)) {
                return { source: 'saved', record: v };
            }
        }
        const pending = this._violApprovalRequestsCache || [];
        for (let i = 0; i < pending.length; i++) {
            const r = pending[i];
            if (!r) continue;
            const st = String(r.status || '').toLowerCase();
            if (st !== 'pending') continue;
            const vd = r.violationData || {};
            if (excludeId && (String(vd.id || '') === excludeId || String(r.originalViolationId || '') === excludeId)) continue;
            if (this.isDuplicateViolationRecord(draft, vd)) {
                return { source: 'pending', record: vd, request: r };
            }
        }
        const now = Date.now();
        if (!Array.isArray(this._recentViolationDupKeys)) this._recentViolationDupKeys = [];
        this._recentViolationDupKeys = this._recentViolationDupKeys.filter((x) => x && now - x.at < 10 * 60 * 1000);
        const key = this._buildViolationDupKey(draft);
        if (key && this._violationInflightDupKey && key === this._violationInflightDupKey) {
            return { source: 'inflight' };
        }
        if (key && this._recentViolationDupKeys.some((x) => x.key === key)) {
            return { source: 'recent' };
        }
        return null;
    },

    // ───────── دائرة اعتماد المخالفات ─────────
    // Cache للإعدادات (يُجدَّد كل 5 دقائق)
    _violApprovalSettingsCache: null,
    _violApprovalSettingsCacheAt: 0,
    _violApprovalRequestsCache: null,
    _violApprovalRequestsCacheAt: 0,
    _violApprovalRequestsCacheKey: '',

    /**
     * احصل على إعدادات دائرة الاعتماد (مع cache)
     */
    async getViolationApprovalSettings() {
        const now = Date.now();
        if (this._violApprovalSettingsCache && (now - this._violApprovalSettingsCacheAt) < 5 * 60 * 1000) {
            return this._violApprovalSettingsCache;
        }
        try {
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                const res = await GoogleIntegration.sendRequest({
                    action: 'getViolationApprovalSettings',
                    data: { __timeoutMs: 20000 }
                });
                if (res && res.success && res.data) {
                    this._violApprovalSettingsCache = {
                        requireApproval: res.data.requireApproval === true,
                        defaultApprovers: Array.isArray(res.data.defaultApprovers) ? res.data.defaultApprovers : [],
                        bypassRoles: Array.isArray(res.data.bypassRoles) ? res.data.bypassRoles : ['admin', 'مدير النظام']
                    };
                    this._violApprovalSettingsCacheAt = now;
                    return this._violApprovalSettingsCache;
                }
            }
        } catch (e) {
            if (AppState.debugMode) Utils.safeWarn('getViolationApprovalSettings:', e);
        }
        // Fallback افتراضي (آمن: لا اعتماد)
        return { requireApproval: false, defaultApprovers: [], bypassRoles: ['admin', 'مدير النظام'] };
    },

    /**
     * هل المستخدم الحالي يتجاوز دائرة الاعتماد؟ (مدير النظام مثلاً)
     */
    isCurrentUserBypassApproval(bypassRoles) {
        try {
            if (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserEffectiveAdmin === 'function') {
                if (Permissions.isCurrentUserEffectiveAdmin()) return true;
            }
            const role = AppState.currentUser?.role || '';
            if (Array.isArray(bypassRoles) && bypassRoles.length > 0) {
                const roleLower = String(role).toLowerCase();
                return bypassRoles.some(br => String(br).toLowerCase() === roleLower || String(br) === role);
            }
        } catch (e) { /* ignore */ }
        return false;
    },

    /**
     * فحص بوابة الاعتماد قبل الحفظ
     * يُرجع { requiresApproval: boolean, settings }
     */
    async checkViolationApprovalGate(formData, opts = {}) {
        const settings = await this.getViolationApprovalSettings();
        if (!settings || !settings.requireApproval) {
            return { requiresApproval: false, settings };
        }
        // المدير يتجاوز
        if (this.isCurrentUserBypassApproval(settings.bypassRoles)) {
            return { requiresApproval: false, settings, bypassed: true };
        }
        // لا توجد قائمة معتمدين → لا يمكن الاعتماد، نسمح بالحفظ المباشر
        if (!Array.isArray(settings.defaultApprovers) || settings.defaultApprovers.length === 0) {
            if (AppState.debugMode) Utils.safeWarn('approval required but no approvers configured — allowing direct save');
            return { requiresApproval: false, settings, reason: 'no_approvers' };
        }
        return { requiresApproval: true, settings };
    },

    /**
     * إرسال المخالفة لدائرة الاعتماد
     */
    async submitViolationForApproval(formData, opts = {}) {
        try {
            const settings = await this.getViolationApprovalSettings();
            const approvers = (settings.defaultApprovers || []).slice();
            const cu = AppState.currentUser || {};

            const payload = {
                requestType: opts.isEdit ? 'update' : 'add',
                violationData: formData,
                originalViolationId: opts.originalId || '',
                approvers: approvers,
                createdBy: cu.id || cu.email || '',
                createdByName: cu.name || cu.email || '',
                notes: opts.notes || ''
            };

            const res = await GoogleIntegration.sendRequest({
                action: 'addViolationApprovalRequest',
                data: { ...payload, __timeoutMs: 30000 }
            });

            return res || { success: false, message: 'لا توجد استجابة من الخادم' };
        } catch (error) {
            return { success: false, message: error?.message || String(error) };
        }
    },

    /**
     * جلب طلبات اعتماد المخالفات (للوحة الإدارة)
     */
    async fetchViolationApprovalRequests(filters = {}) {
        try {
            const res = await GoogleIntegration.sendRequest({
                action: 'getAllViolationApprovalRequests',
                data: { ...filters, __timeoutMs: 25000 }
            });
            return (res && res.success && Array.isArray(res.data)) ? res.data : [];
        } catch (e) {
            if (AppState.debugMode) Utils.safeWarn('fetchViolationApprovalRequests:', e);
            return [];
        }
    },

    /**
     * اعتماد طلب
     */
    async approveViolationRequest(requestId, opts = {}) {
        const cu = AppState.currentUser || {};
        const approver = {
            userId: cu.id || cu.email || '',
            userName: cu.name || '',
            userEmail: cu.email || ''
        };
        try {
            const res = await GoogleIntegration.sendRequest({
                action: 'approveViolationApprovalRequest',
                data: { requestId, approver, notes: opts.notes || '', force: opts.force === true, __timeoutMs: 30000 }
            });
            // إبطال cache الإعدادات
            this._violApprovalSettingsCache = null;
            this._invalidateViolationApprovalRequestsCache();
            return res || { success: false, message: 'لا توجد استجابة' };
        } catch (e) {
            return { success: false, message: e?.message || String(e) };
        }
    },

    /**
     * رفض طلب
     */
    async rejectViolationRequest(requestId, reason) {
        const cu = AppState.currentUser || {};
        const approver = {
            userId: cu.id || cu.email || '',
            userName: cu.name || '',
            userEmail: cu.email || ''
        };
        try {
            const res = await GoogleIntegration.sendRequest({
                action: 'rejectViolationApprovalRequest',
                data: { requestId, approver, reason: String(reason || '').trim(), __timeoutMs: 30000 }
            });
            this._invalidateViolationApprovalRequestsCache();
            return res || { success: false, message: 'لا توجد استجابة' };
        } catch (e) {
            return { success: false, message: e?.message || String(e) };
        }
    },

    /**
     * حفظ إعدادات دائرة الاعتماد (للمدير)
     */
    async saveViolationApprovalSettings(settings) {
        const cu = AppState.currentUser || {};
        try {
            const res = await GoogleIntegration.sendRequest({
                action: 'updateViolationApprovalSettings',
                data: {
                    requireApproval: settings.requireApproval === true,
                    defaultApprovers: Array.isArray(settings.defaultApprovers) ? settings.defaultApprovers : [],
                    bypassRoles: Array.isArray(settings.bypassRoles) ? settings.bypassRoles : ['admin', 'مدير النظام'],
                    updatedBy: cu.id || cu.email || '',
                    updatedByName: cu.name || '',
                    __timeoutMs: 25000
                }
            });
            // إبطال cache
            this._violApprovalSettingsCache = null;
            this._invalidateViolationApprovalRequestsCache();
            return res || { success: false, message: 'لا توجد استجابة' };
        } catch (e) {
            return { success: false, message: e?.message || String(e) };
        }
    },

    _getViolationApprovalRequestsCacheKey(isAdmin, cu) {
        return isAdmin ? 'admin' : String(cu?.email || cu?.id || 'user');
    },

    _getCachedViolationApprovalRequests(isAdmin, cu) {
        const key = this._getViolationApprovalRequestsCacheKey(isAdmin, cu);
        const now = Date.now();
        if (this._violApprovalRequestsCache && this._violApprovalRequestsCacheKey === key &&
            (now - this._violApprovalRequestsCacheAt) < 2 * 60 * 1000) {
            return this._violApprovalRequestsCache;
        }
        return null;
    },

    _setCachedViolationApprovalRequests(requests, isAdmin, cu) {
        this._violApprovalRequestsCache = Array.isArray(requests) ? requests : [];
        this._violApprovalRequestsCacheKey = this._getViolationApprovalRequestsCacheKey(isAdmin, cu);
        this._violApprovalRequestsCacheAt = Date.now();
    },

    _invalidateViolationApprovalRequestsCache() {
        this._violApprovalRequestsCache = null;
        this._violApprovalRequestsCacheAt = 0;
        this._violApprovalRequestsCacheKey = '';
    },

    _cloneViolationApprovalSettings(settings) {
        const s = settings || {};
        return {
            requireApproval: s.requireApproval === true,
            defaultApprovers: Array.isArray(s.defaultApprovers) ? s.defaultApprovers.map(a => ({ ...a })) : [],
            bypassRoles: Array.isArray(s.bypassRoles) ? [...s.bypassRoles] : ['admin', 'مدير النظام']
        };
    },

    _getViolationApprovalSettingsSnapshot() {
        const now = Date.now();
        if (this._violApprovalSettingsCache && (now - this._violApprovalSettingsCacheAt) < 5 * 60 * 1000) {
            return this._cloneViolationApprovalSettings(this._violApprovalSettingsCache);
        }
        return { requireApproval: false, defaultApprovers: [], bypassRoles: ['admin', 'مدير النظام'] };
    },

    _prefetchViolationApprovalPanelData() {
        const isAdmin = (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserEffectiveAdmin === 'function')
            ? Permissions.isCurrentUserEffectiveAdmin()
            : false;
        const cu = AppState.currentUser || {};
        const filters = {
            userEmail: isAdmin ? '' : (cu.email || ''),
            userId: isAdmin ? '' : (cu.id || '')
        };
        void Promise.all([
            this.getViolationApprovalSettings(),
            this.fetchViolationApprovalRequests(filters)
        ]).then(([, requests]) => {
            this._setCachedViolationApprovalRequests(requests, isAdmin, cu);
            this._updateViolationApprovalsHeaderBadge(requests);
        }).catch(() => { /* خلفية فقط */ });
    },

    _updateViolationApprovalsHeaderBadge(requests) {
        const el = document.getElementById('viol-approvals-pending-badge');
        if (!el) return;
        const list = Array.isArray(requests) ? requests : (this._violApprovalRequestsCache || []);
        const n = list.filter((r) => r && String(r.status || '').toLowerCase() === 'pending').length;
        if (n > 0) {
            el.hidden = false;
            el.textContent = String(n);
            el.setAttribute('aria-label', String(n));
        } else {
            el.hidden = true;
            el.textContent = '';
        }
    },

    _sameViolationApproverIdentity(a, b) {
        const n = (v) => String(v || '').trim().toLowerCase();
        const pack = (o) => [n(o?.userId), n(o?.id), n(o?.email), n(o?.userEmail)].filter(Boolean);
        const left = pack(a);
        const right = pack(b);
        return left.some((x) => right.includes(x));
    },

    _isCurrentViolationApprover(request) {
        if (!request || String(request.status || '').toLowerCase() !== 'pending') return false;
        const approvers = Array.isArray(request.approvers) ? request.approvers : [];
        const idx = parseInt(request.currentApproverIndex, 10) || 0;
        const current = approvers[idx];
        if (!current) return false;
        return this._sameViolationApproverIdentity(current, AppState.currentUser || {});
    },

    _canActOnViolationApproval(request, isAdmin) {
        return !!(request && String(request.status || '').toLowerCase() === 'pending' && (isAdmin || this._isCurrentViolationApprover(request)));
    },

    _filterViolationApprovalRequests(state) {
        const filter = (state && state.filter) || 'pending';
        const q = String((state && state.query) || '').trim().toLowerCase();
        let list = Array.isArray(state?.requests) ? state.requests.slice() : [];
        if (filter === 'approved') {
            list = list.filter((r) => ['approved', 'committed'].includes(String(r.status || '').toLowerCase()));
        } else if (filter !== 'all') {
            list = list.filter((r) => String(r.status || '').toLowerCase() === filter);
        }
        if (q) {
            list = list.filter((r) => {
                const vd = r.violationData || {};
                const blob = [
                    r.id, r.createdByName, r.createdBy,
                    vd.employeeName, vd.contractorName, vd.contractorWorker,
                    vd.violationType, vd.violationLocation, vd.violationPlace, vd.violationDetails
                ].join(' ').toLowerCase();
                return blob.includes(q);
            });
        }
        list.sort((a, b) => {
            const mineA = this._isCurrentViolationApprover(a) ? 0 : 1;
            const mineB = this._isCurrentViolationApprover(b) ? 0 : 1;
            if (mineA !== mineB) return mineA - mineB;
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        });
        return list;
    },

    _countViolationApprovalsByFilter(requests, key) {
        const list = Array.isArray(requests) ? requests : [];
        if (key === 'all') return list.length;
        if (key === 'approved') {
            return list.filter((r) => ['approved', 'committed'].includes(String(r.status || '').toLowerCase())).length;
        }
        return list.filter((r) => String(r.status || '').toLowerCase() === key).length;
    },

    _ensureViolationApprovalsStyles() {
        if (document.getElementById('viol-approvals-ux-css')) return;
        const style = document.createElement('style');
        style.id = 'viol-approvals-ux-css';
        style.textContent = `
            .vap-nav-badge{display:inline-flex;align-items:center;justify-content:center;min-width:1.35rem;height:1.35rem;padding:0 .35rem;margin-inline-start:.4rem;border-radius:999px;background:#fff;color:#b91c1c;font-size:.72rem;font-weight:800;line-height:1;}
            .vap-shell{background:var(--vap-bg,#fff);color:var(--vap-fg,#0f172a);border-radius:18px;max-width:1080px;width:100%;max-height:92vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 48px rgba(15,23,42,.28);}
            .vap-head{background:linear-gradient(135deg,#b91c1c,#7f1d1d);color:#fff;padding:18px 22px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
            .vap-head h3{margin:0;font-size:1.2rem;font-weight:800;letter-spacing:-.01em;}
            .vap-head p{margin:.28rem 0 0;font-size:.82rem;opacity:.88;line-height:1.45;max-width:42rem;}
            .vap-close{background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.28);border-radius:10px;color:#fff;width:40px;height:40px;cursor:pointer;font-size:1.25rem;flex-shrink:0;}
            .vap-close:hover,.vap-close:focus-visible{background:rgba(255,255,255,.28);outline:none;}
            .vap-tabs{display:flex;gap:6px;padding:10px 16px 0;background:inherit;}
            .vap-tab{border:none;background:transparent;color:inherit;opacity:.55;padding:10px 14px;border-radius:10px 10px 0 0;cursor:pointer;font-weight:700;font-size:.9rem;}
            .vap-tab.is-active{opacity:1;background:rgba(127,29,29,.08);}
            .vap-body{padding:16px 18px 20px;overflow:auto;flex:1;}
            .vap-toolbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:14px;}
            .vap-filters{display:flex;flex-wrap:wrap;gap:6px;}
            .vap-chip{border:1px solid #e2e8f0;background:#f8fafc;color:#334155;padding:7px 12px;border-radius:999px;cursor:pointer;font-size:.82rem;font-weight:650;}
            .vap-chip .vap-n{margin-inline-start:.35rem;opacity:.7;font-variant-numeric:tabular-nums;}
            .vap-chip.is-active{background:#0f172a;color:#fff;border-color:#0f172a;}
            .vap-search{flex:1;min-width:180px;position:relative;}
            .vap-search input{width:100%;border:1px solid #e2e8f0;border-radius:12px;padding:9px 12px;padding-inline-start:36px;font-size:.9rem;background:#fff;}
            .vap-search i{position:absolute;inset-inline-start:12px;top:50%;transform:translateY(-50%);color:#94a3b8;pointer-events:none;}
            .vap-card{background:#fff;border:1px solid #e8edf4;border-radius:16px;padding:14px 16px;margin-bottom:10px;box-shadow:0 8px 18px rgba(15,23,42,.05);}
            .vap-card.is-mine{border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,.18);}
            .vap-mine-flag{display:inline-flex;align-items:center;gap:6px;background:#fffbeb;color:#92400e;border:1px solid #fcd34d;border-radius:999px;padding:4px 10px;font-size:.75rem;font-weight:800;margin-bottom:8px;}
            .vap-summary{background:#fffbeb;border:1px solid #fde68a;color:#92400e;border-radius:14px;padding:10px 14px;margin-bottom:12px;font-size:.88rem;font-weight:700;display:flex;align-items:center;gap:8px;}
            .vap-summary[hidden]{display:none;}
            .vap-card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;}
            .vap-person{font-weight:800;font-size:.98rem;color:#0f172a;}
            .vap-meta{font-size:.78rem;color:#64748b;margin-top:4px;line-height:1.5;}
            .vap-badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:999px;font-size:.72rem;font-weight:800;}
            .vap-badge-pending{background:#fef3c7;color:#92400e;}
            .vap-badge-ok{background:#dcfce7;color:#166534;}
            .vap-badge-no{background:#fee2e2;color:#991b1b;}
            .vap-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;font-size:.8rem;color:#475569;background:#f8fafc;padding:10px 12px;border-radius:12px;margin:10px 0;}
            .vap-grid strong{color:#0f172a;}
            .vap-steps{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0 0 10px;padding:0;}
            .vap-step{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:12px;background:#f1f5f9;color:#64748b;font-size:.78rem;max-width:100%;}
            .vap-step-num{width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:.72rem;background:#cbd5e1;color:#0f172a;flex-shrink:0;}
            .vap-step.is-done{background:#ecfdf5;color:#166534;}
            .vap-step.is-done .vap-step-num{background:#16a34a;color:#fff;}
            .vap-step.is-current{background:#fffbeb;color:#92400e;box-shadow:inset 0 0 0 1px #fcd34d;}
            .vap-step.is-current .vap-step-num{background:#d97706;color:#fff;}
            .vap-actions{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;}
            .vap-btn{border:none;border-radius:11px;padding:9px 16px;cursor:pointer;font-weight:750;font-size:.86rem;min-height:40px;}
            .vap-btn:focus-visible{outline:2px solid #b91c1c;outline-offset:2px;}
            .vap-btn-ok{background:#15803d;color:#fff;}
            .vap-btn-no{background:#fff;color:#b91c1c;border:1px solid #fecaca;}
            .vap-btn:disabled{opacity:.65;cursor:wait;}
            .vap-empty{text-align:center;padding:40px 16px;color:#64748b;background:#f8fafc;border-radius:16px;}
            .vap-empty i{font-size:1.8rem;color:#cbd5e1;margin-bottom:10px;display:block;}
            .vap-settings{background:#fff7ed;border:1px solid #fed7aa;border-radius:16px;padding:16px;}
            .vap-toggle{display:flex;align-items:flex-start;gap:12px;cursor:pointer;margin:12px 0 16px;}
            .vap-toggle input{width:18px;height:18px;margin-top:2px;}
            .vap-approver-row{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:8px 10px;margin-bottom:6px;}
            .vap-approver-row .ord{width:26px;height:26px;border-radius:8px;background:#0f172a;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:800;flex-shrink:0;}
            .vap-icon-btn{border:none;background:#f1f5f9;color:#334155;width:32px;height:32px;border-radius:8px;cursor:pointer;}
            .vap-icon-btn:hover{background:#e2e8f0;}
            .vap-sheet{position:absolute;inset:0;background:rgba(15,23,42,.45);display:flex;align-items:flex-end;justify-content:center;padding:16px;z-index:2;}
            .vap-sheet[hidden]{display:none;}
            .vap-sheet-card{background:#fff;border-radius:16px 16px 12px 12px;padding:18px;width:min(520px,100%);box-shadow:0 16px 40px rgba(0,0,0,.2);}
            .vap-sheet textarea{width:100%;min-height:96px;border:1px solid #e2e8f0;border-radius:12px;padding:10px;font:inherit;resize:vertical;}
            .vap-shell{position:relative;}
            [data-theme="dark"] .vap-shell{--vap-bg:#0f172a;--vap-fg:#e2e8f0;}
            [data-theme="dark"] .vap-card,[data-theme="dark"] .vap-sheet-card,[data-theme="dark"] .vap-search input,[data-theme="dark"] .vap-settings,[data-theme="dark"] .vap-approver-row{background:#1e293b;border-color:#334155;color:#e2e8f0;}
            [data-theme="dark"] .vap-grid,[data-theme="dark"] .vap-empty,[data-theme="dark"] .vap-chip{background:#0f172a;border-color:#334155;color:#cbd5e1;}
            [data-theme="dark"] .vap-chip.is-active{background:#f8fafc;color:#0f172a;}
            [data-theme="dark"] .vap-person,[data-theme="dark"] .vap-grid strong{color:#f8fafc;}
            [data-theme="dark"] .vap-tab.is-active{background:rgba(255,255,255,.08);}
            @media (max-width:640px){
                .vap-head{padding:14px 14px;}
                .vap-body{padding:12px;}
                .vap-actions{justify-content:stretch;}
                .vap-btn{flex:1;}
            }
        `;
        document.head.appendChild(style);
    },

    _buildViolationApprovalsSettingsHtml(settings, isAdmin, allUsers) {
        if (!isAdmin) return '';
        const t = (k, f) => this._t(k, f);
        const s = settings || { requireApproval: false, defaultApprovers: [] };
        const approvers = Array.isArray(s.defaultApprovers) ? s.defaultApprovers : [];
        return `
                    <div id="viol-approvals-settings-panel" class="vap-settings">
                        <h4 style="margin:0;font-size:1rem;font-weight:800;">${t('module.violations.approvals.settingsTitle', 'تشغيل الدائرة والمعتمدون')}</h4>
                        <p style="margin:6px 0 0;font-size:.82rem;color:#9a3412;line-height:1.5;">${t('module.violations.approvals.settingsLead', 'الترتيب هو تسلسل الاعتماد. المدير يتجاوز الدائرة عند الحفظ.')}</p>
                        <label class="vap-toggle">
                            <input type="checkbox" id="viol-require-approval" ${s.requireApproval ? 'checked' : ''}>
                            <span style="font-weight:700;">${t('module.violations.approvals.enable', 'تفعيل الاعتماد قبل تسجيل المخالفة')}</span>
                        </label>
                        <div style="font-weight:700;margin-bottom:8px;">${t('module.violations.approvals.approvers', 'المعتمدون المعيَّنون')}</div>
                        <div id="viol-approvers-list">
                            ${approvers.length ? approvers.map((a, idx) => `
                                <div class="vap-approver-row" data-approver-idx="${idx}">
                                    <span class="ord">${idx + 1}</span>
                                    <span style="flex:1;font-weight:650;">${Utils.escapeHTML(a.userName || a.userEmail || a.userId || '?')}</span>
                                    <button type="button" class="vap-icon-btn viol-approver-up" data-idx="${idx}" title="${t('module.violations.approvals.moveUp', 'تقديم')}" ${idx === 0 ? 'disabled' : ''}><i class="fas fa-arrow-up"></i></button>
                                    <button type="button" class="vap-icon-btn viol-approver-down" data-idx="${idx}" title="${t('module.violations.approvals.moveDown', 'تأخير')}" ${idx === approvers.length - 1 ? 'disabled' : ''}><i class="fas fa-arrow-down"></i></button>
                                    <button type="button" class="vap-icon-btn viol-remove-approver" data-idx="${idx}" title="${t('module.violations.approvals.remove', 'إزالة')}" style="color:#b91c1c;"><i class="fas fa-times"></i></button>
                                </div>
                            `).join('') : `<div class="vap-empty" style="padding:16px;">${t('module.violations.approvals.noApprovers', 'أضف معتمداً واحداً على الأقل حتى تعمل الدائرة')}</div>`}
                        </div>
                        <div style="display:flex;gap:8px;align-items:flex-end;margin-top:12px;flex-wrap:wrap;">
                            <div style="flex:1;min-width:200px;">
                                <label style="display:block;font-size:.8rem;margin-bottom:4px;">${t('module.violations.approvals.addApprover', 'إضافة معتمد')}</label>
                                <select id="viol-add-approver-select" class="form-input" style="width:100%;padding:9px;border:1px solid #d1d5db;border-radius:10px;">
                                    <option value="">${t('module.violations.approvals.chooseUser', 'اختر مستخدماً')}</option>
                                    ${(allUsers || []).map(u => `
                                        <option value="${Utils.escapeHTML(String(u.id || u.email || ''))}"
                                                data-name="${Utils.escapeHTML(String(u.name || ''))}"
                                                data-email="${Utils.escapeHTML(String(u.email || ''))}"
                                                data-role="${Utils.escapeHTML(String(u.role || ''))}">
                                            ${Utils.escapeHTML(u.name || u.email || u.id)} ${u.role ? '(' + Utils.escapeHTML(u.role) + ')' : ''}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                            <button type="button" id="viol-add-approver-btn" class="vap-btn" style="background:#1e3a8a;color:#fff;">
                                <i class="fas fa-plus"></i> ${t('module.violations.approvals.add', 'إضافة')}
                            </button>
                        </div>
                        <div style="margin-top:14px;display:flex;justify-content:flex-end;">
                            <button type="button" id="viol-save-settings-btn" class="vap-btn vap-btn-ok">
                                <i class="fas fa-save"></i> ${t('module.violations.approvals.save', 'حفظ الإعدادات')}
                            </button>
                        </div>
                    </div>`;
    },

    _buildViolationApprovalsRequestsHtml(state) {
        const t = (k, f) => this._t(k, f);
        if (state.loading) {
            return `<div class="vap-empty">
                <i class="fas fa-spinner fa-spin"></i>
                ${t('module.violations.approvals.loading', 'جاري تحميل الطلبات…')}
            </div>`;
        }
        const filtered = this._filterViolationApprovalRequests(state);
        return this._renderViolationApprovalRequests(filtered, { isAdmin: state.isAdmin });
    },

    _renderViolationApprovalFilterBar(state) {
        const t = (k, f) => this._t(k, f);
        const active = (state && state.filter) || 'pending';
        const keys = [
            ['pending', 'module.violations.approvals.filter.pending', 'معلّقة'],
            ['approved', 'module.violations.approvals.filter.approved', 'معتمدة'],
            ['rejected', 'module.violations.approvals.filter.rejected', 'مرفوضة'],
            ['all', 'module.violations.approvals.filter.all', 'الكل']
        ];
        return keys.map(([id, key, fb]) => {
            const n = this._countViolationApprovalsByFilter(state.requests, id);
            return `<button type="button" class="vap-chip viol-req-filter${active === id ? ' is-active viol-req-filter-active' : ''}" data-filter="${id}">
                ${t(key, fb)}<span class="vap-n">${n}</span>
            </button>`;
        }).join('');
    },

    _refreshViolationApprovalsModalBody(modal, state, opts = {}) {
        const pendingCount = this._countViolationApprovalsByFilter(state.requests, 'pending');
        const countEl = modal.querySelector('#viol-approval-pending-count');
        if (countEl) countEl.textContent = state.loading ? '…' : String(pendingCount);
        this._updateViolationApprovalsHeaderBadge(state.requests);

        const filtersEl = modal.querySelector('#vap-filters');
        if (filtersEl) filtersEl.innerHTML = this._renderViolationApprovalFilterBar(state);

        const mineSummary = modal.querySelector('#vap-mine-summary');
        if (mineSummary) {
            const mineN = (state.requests || []).filter((r) => this._isCurrentViolationApprover(r)).length;
            if (mineN > 0 && (state.filter === 'pending' || state.filter === 'all')) {
                mineSummary.hidden = false;
                mineSummary.innerHTML = `<i class="fas fa-bell"></i> لديك ${mineN} طلب بانتظار اعتمادك — ظاهرة أولاً في القائمة`;
            } else {
                mineSummary.hidden = true;
                mineSummary.textContent = '';
            }
        }

        const searchEl = modal.querySelector('#vap-search-input');
        if (searchEl && searchEl.value !== (state.query || '')) {
            searchEl.value = state.query || '';
        }

        if (opts.settings !== false) {
            const settingsPanel = modal.querySelector('#viol-approvals-settings-panel');
            if (settingsPanel && state.isAdmin) {
                const tmp = document.createElement('div');
                tmp.innerHTML = this._buildViolationApprovalsSettingsHtml(state.settings, true, state.allUsers);
                const fresh = tmp.firstElementChild;
                if (fresh) settingsPanel.replaceWith(fresh);
            }
        }

        const listEl = modal.querySelector('#viol-approval-requests-list');
        if (listEl) {
            listEl.innerHTML = this._buildViolationApprovalsRequestsHtml(state);
            this._wireViolationApprovalActions(modal, state.isAdmin);
        }
    },

    async _loadViolationApprovalsPanelData(modal, state) {
        try {
            const [requests, settings] = await Promise.all([
                this.fetchViolationApprovalRequests(state.filters),
                this.getViolationApprovalSettings()
            ]);
            if (!modal.isConnected) return;
            state.requests = Array.isArray(requests) ? requests : [];
            state.settings = this._cloneViolationApprovalSettings(settings);
            state.loading = false;
            this._setCachedViolationApprovalRequests(state.requests, state.isAdmin, AppState.currentUser || {});
            this._refreshViolationApprovalsModalBody(modal, state);
        } catch (e) {
            if (!modal.isConnected) return;
            state.loading = false;
            const listEl = modal.querySelector('#viol-approval-requests-list');
            if (listEl) {
                listEl.innerHTML = `<div class="vap-empty" style="color:#b91c1c;background:#fef2f2;">
                    <i class="fas fa-exclamation-circle"></i>
                    ${this._t('module.violations.approvals.loadError', 'تعذّر تحميل الطلبات — أعد المحاولة')}
                    <div style="margin-top:12px;"><button type="button" class="vap-btn" id="vap-retry-load" style="background:#0f172a;color:#fff;">${this._t('module.violations.approvals.retry', 'إعادة المحاولة')}</button></div>
                </div>`;
            }
            if (AppState.debugMode) Utils.safeWarn('_loadViolationApprovalsPanelData:', e);
        }
    },

    _bindViolationApprovalsModalEvents(modal) {
        if (modal._violApprovalsEventsBound) return;
        modal._violApprovalsEventsBound = true;
        const state = () => modal._violApprovalState;
        const t = (k, f) => this._t(k, f);

        const closeModal = () => {
            document.removeEventListener('keydown', modal._vapEsc);
            modal.remove();
        };
        modal._vapEsc = (ev) => {
            if (ev.key === 'Escape') {
                const sheet = modal.querySelector('#vap-reject-sheet');
                if (sheet && !sheet.hidden) {
                    sheet.hidden = true;
                    return;
                }
                closeModal();
            }
        };
        document.addEventListener('keydown', modal._vapEsc);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
                return;
            }
            if (e.target.closest('#viol-approvals-close')) {
                closeModal();
                return;
            }

            const tabBtn = e.target.closest('[data-vap-tab]');
            if (tabBtn) {
                const tab = tabBtn.getAttribute('data-vap-tab');
                modal.querySelectorAll('[data-vap-tab]').forEach((b) => b.classList.toggle('is-active', b === tabBtn));
                modal.querySelectorAll('[data-vap-pane]').forEach((p) => {
                    p.hidden = p.getAttribute('data-vap-pane') !== tab;
                });
                return;
            }

            if (e.target.closest('#vap-retry-load')) {
                const st = state();
                if (!st) return;
                st.loading = true;
                this._refreshViolationApprovalsModalBody(modal, st);
                void this._loadViolationApprovalsPanelData(modal, st);
                return;
            }

            const upBtn = e.target.closest('.viol-approver-up');
            if (upBtn) {
                const idx = parseInt(upBtn.getAttribute('data-idx'), 10);
                const st = state();
                if (!st || isNaN(idx) || idx <= 0) return;
                const arr = st.settings.defaultApprovers;
                [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                this._refreshViolationApprovalsModalBody(modal, st);
                return;
            }
            const downBtn = e.target.closest('.viol-approver-down');
            if (downBtn) {
                const idx = parseInt(downBtn.getAttribute('data-idx'), 10);
                const st = state();
                if (!st || isNaN(idx)) return;
                const arr = st.settings.defaultApprovers;
                if (idx >= arr.length - 1) return;
                [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
                this._refreshViolationApprovalsModalBody(modal, st);
                return;
            }

            const removeBtn = e.target.closest('.viol-remove-approver');
            if (removeBtn) {
                const idx = parseInt(removeBtn.getAttribute('data-idx'), 10);
                const st = state();
                if (!st || isNaN(idx)) return;
                st.settings.defaultApprovers.splice(idx, 1);
                this._refreshViolationApprovalsModalBody(modal, st);
                return;
            }

            const filterBtn = e.target.closest('.viol-req-filter');
            if (filterBtn) {
                const st = state();
                if (!st) return;
                st.filter = filterBtn.getAttribute('data-filter') || 'pending';
                this._refreshViolationApprovalsModalBody(modal, st, { settings: false });
                return;
            }

            if (e.target.closest('#viol-add-approver-btn')) {
                const st = state();
                if (!st) return;
                const sel = modal.querySelector('#viol-add-approver-select');
                const val = sel?.value;
                if (!val) { Notification.warning(t('module.violations.approvals.pickUser', 'اختر مستخدماً أولاً')); return; }
                const opt = sel.options[sel.selectedIndex];
                const newApprover = {
                    userId: val,
                    userName: opt?.dataset?.name || '',
                    userEmail: opt?.dataset?.email || '',
                    role: opt?.dataset?.role || ''
                };
                if (st.settings.defaultApprovers.some(a => a.userId === newApprover.userId)) {
                    Notification.warning(t('module.violations.approvals.alreadyAdded', 'هذا المستخدم مضاف بالفعل'));
                    return;
                }
                st.settings.defaultApprovers.push(newApprover);
                this._refreshViolationApprovalsModalBody(modal, st);
                return;
            }

            if (e.target.closest('#viol-save-settings-btn')) {
                const st = state();
                if (!st) return;
                const btn = e.target.closest('#viol-save-settings-btn');
                if (btn.disabled) return;
                btn.disabled = true;
                const requireApproval = modal.querySelector('#viol-require-approval')?.checked === true;
                const newSettings = {
                    requireApproval,
                    defaultApprovers: st.settings.defaultApprovers,
                    bypassRoles: st.settings.bypassRoles
                };
                this.saveViolationApprovalSettings(newSettings).then((res) => {
                    btn.disabled = false;
                    if (res && res.success) {
                        st.settings = this._cloneViolationApprovalSettings(newSettings);
                        Notification.success(t('module.violations.approvals.saved', 'تم حفظ الإعدادات بنجاح'));
                    } else {
                        Notification.error((res && res.message) || 'فشل حفظ الإعدادات');
                    }
                }).catch(() => { btn.disabled = false; });
            }

            if (e.target.closest('#vap-reject-cancel')) {
                const sheet = modal.querySelector('#vap-reject-sheet');
                if (sheet) sheet.hidden = true;
                return;
            }
        });

        modal.addEventListener('input', (e) => {
            if (e.target && e.target.id === 'vap-search-input') {
                const st = state();
                if (!st) return;
                st.query = e.target.value || '';
                const listEl = modal.querySelector('#viol-approval-requests-list');
                if (listEl) {
                    listEl.innerHTML = this._buildViolationApprovalsRequestsHtml(st);
                    this._wireViolationApprovalActions(modal, st.isAdmin);
                }
            }
        });
    },

    /**
     * عرض شاشة إدارة طلبات الاعتماد + الإعدادات
     */
    showViolationApprovalsManager() {
        this._ensureViolationApprovalsStyles();
        const t = (k, f) => this._t(k, f);
        const isAdmin = (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserEffectiveAdmin === 'function')
            ? Permissions.isCurrentUserEffectiveAdmin()
            : false;
        const cu = AppState.currentUser || {};
        const allUsers = (AppState.appData?.users || []).filter(u => u && (u.email || u.id || u.name));
        const filters = {
            userEmail: isAdmin ? '' : (cu.email || ''),
            userId: isAdmin ? '' : (cu.id || '')
        };

        const cachedRequests = this._getCachedViolationApprovalRequests(isAdmin, cu);
        const state = {
            settings: this._getViolationApprovalSettingsSnapshot(),
            requests: cachedRequests || [],
            isAdmin,
            allUsers,
            filters,
            loading: !cachedRequests,
            filter: 'pending',
            query: ''
        };

        const existing = document.getElementById('viol-approvals-manager-modal');
        if (existing) {
            if (existing._vapEsc) document.removeEventListener('keydown', existing._vapEsc);
            existing.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'viol-approvals-manager-modal';
        modal.className = 'modal modal-open';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'vap-title');
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;';
        const pendingCount = state.loading ? '…' : String(this._countViolationApprovalsByFilter(state.requests, 'pending'));
        modal.innerHTML = `
            <div class="vap-shell" data-no-literal-translate>
                <div class="vap-head">
                    <div>
                        <h3 id="vap-title">${t('module.violations.approvals.title', 'دائرة اعتماد المخالفات')}</h3>
                        <p>${t('module.violations.approvals.subtitle', 'راجع الطلبات بالترتيب، ثم اعتمد أو ارفض بوضوح')}</p>
                    </div>
                    <button type="button" id="viol-approvals-close" class="vap-close" aria-label="${t('module.violations.approvals.close', 'إغلاق')}">×</button>
                </div>
                ${isAdmin ? `
                <div class="vap-tabs" role="tablist">
                    <button type="button" class="vap-tab is-active" data-vap-tab="inbox" role="tab">
                        ${t('module.violations.approvals.tab.inbox', 'الطلبات')}
                        <span id="viol-approval-pending-count" class="vap-n" style="margin-inline-start:.35rem;opacity:.8;">${pendingCount}</span>
                    </button>
                    <button type="button" class="vap-tab" data-vap-tab="settings" role="tab">${t('module.violations.approvals.tab.settings', 'الإعدادات')}</button>
                </div>` : `<div class="vap-tabs"><span id="viol-approval-pending-count" hidden>${pendingCount}</span></div>`}
                <div class="vap-body">
                    <div data-vap-pane="inbox">
                        <div class="vap-toolbar">
                            <div class="vap-filters" id="vap-filters">${this._renderViolationApprovalFilterBar(state)}</div>
                            <div class="vap-search">
                                <i class="fas fa-search"></i>
                                <input type="search" id="vap-search-input" placeholder="${t('module.violations.approvals.search', 'بحث بالاسم أو النوع أو رقم الطلب…')}" autocomplete="off">
                            </div>
                        </div>
                        <div id="vap-mine-summary" class="vap-summary" hidden></div>
                        <div id="viol-approval-requests-list">
                            ${this._buildViolationApprovalsRequestsHtml(state)}
                        </div>
                    </div>
                    ${isAdmin ? `<div data-vap-pane="settings" hidden>${this._buildViolationApprovalsSettingsHtml(state.settings, isAdmin, allUsers)}</div>` : ''}
                </div>
                <div id="vap-reject-sheet" class="vap-sheet" hidden>
                    <div class="vap-sheet-card">
                        <h4 style="margin:0 0 6px;font-size:1rem;">${t('module.violations.approvals.rejectTitle', 'سبب الرفض')}</h4>
                        <p style="margin:0 0 10px;font-size:.82rem;color:#64748b;">${t('module.violations.approvals.rejectHint', 'اكتب سبباً واضحاً يصل لمُسجّل المخالفة.')}</p>
                        <textarea id="vap-reject-reason" placeholder="${t('module.violations.approvals.rejectPlaceholder', 'مثال: البيانات ناقصة أو الغرامة غير مطابقة للائحة…')}"></textarea>
                        <div class="vap-actions" style="margin-top:12px;">
                            <button type="button" id="vap-reject-cancel" class="vap-btn vap-btn-no">${t('module.violations.approvals.cancel', 'إلغاء')}</button>
                            <button type="button" id="vap-reject-confirm" class="vap-btn" style="background:#b91c1c;color:#fff;">${t('module.violations.approvals.rejectConfirm', 'تأكيد الرفض')}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal._violApprovalState = state;
        modal._violApprovalsEventsBound = false;
        this._bindViolationApprovalsModalEvents(modal);
        if (!state.loading) {
            this._wireViolationApprovalActions(modal, isAdmin);
        }

        void this._loadViolationApprovalsPanelData(modal, state);
    },

    _renderViolationApprovalRequests(requests, opts = {}) {
        const t = (k, f) => this._t(k, f);
        if (!requests || requests.length === 0) {
            return `<div class="vap-empty">
                <i class="fas fa-inbox"></i>
                <div style="font-weight:800;color:#334155;">${t('module.violations.approvals.empty', 'لا توجد طلبات في هذا التبويب')}</div>
                <div style="margin-top:6px;font-size:.85rem;">${t('module.violations.approvals.emptyHint', 'عند تفعيل الدائرة ستظهر هنا طلبات الإضافة والتعديل بانتظار اعتمادك.')}</div>
            </div>`;
        }
        return requests.map(r => {
            const vd = r.violationData || {};
            const personName = vd.employeeName || vd.contractorWorker || vd.contractorName || '—';
            const st = String(r.status || '').toLowerCase();
            const badgeClass = st === 'rejected' ? 'vap-badge-no' : (st === 'pending' ? 'vap-badge-pending' : 'vap-badge-ok');
            const badgeKey = st === 'committed' ? 'committed' : (st === 'approved' ? 'approved' : (st === 'rejected' ? 'rejected' : 'pending'));
            const badgeLabel = t('module.violations.approvals.status.' + badgeKey, st);
            const dateStr = r.createdAt
                ? (typeof Utils.formatDateTime === 'function'
                    ? Utils.formatDateTime(r.createdAt)
                    : String(r.createdAt))
                : '—';
            const approvers = Array.isArray(r.approvers) ? r.approvers : [];
            const currentIdx = parseInt(r.currentApproverIndex, 10) || 0;
            const isMine = this._isCurrentViolationApprover(r);
            const showActions = this._canActOnViolationApproval(r, opts.isAdmin);
            const details = String(vd.violationDetails || '').trim();
            const detailsShort = details.length > 140 ? details.slice(0, 140) + '…' : details;

            const steps = approvers.length > 0 ? `
                        <div style="font-size:.75rem;font-weight:700;color:#64748b;margin-bottom:6px;">${t('module.violations.approvals.circuit', 'مسار الاعتماد')}</div>
                        <ol class="vap-steps">
                            ${approvers.map((a, i) => {
                                const done = !!a.approved;
                                const current = !done && i === currentIdx && st === 'pending';
                                const cls = done ? 'is-done' : (current ? 'is-current' : 'is-wait');
                                const meta = done
                                    ? t('module.violations.approvals.doneStep', 'تم')
                                    : (current
                                        ? (isMine ? t('module.violations.approvals.yourTurn', 'دورك الآن') : t('module.violations.approvals.waiting', 'بانتظار اعتماده'))
                                        : t('module.violations.approvals.queued', 'التالي'));
                                return `<li class="vap-step ${cls}">
                                    <span class="vap-step-num">${done ? '✓' : (i + 1)}</span>
                                    <span>${Utils.escapeHTML(a.userName || a.userEmail || '?')} · ${meta}</span>
                                </li>`;
                            }).join('')}
                        </ol>
                    ` : '';

            return `
                <article class="vap-card${isMine ? ' is-mine' : ''}" data-request-id="${Utils.escapeHTML(String(r.id))}">
                    ${isMine ? `<div class="vap-mine-flag"><i class="fas fa-user-check"></i> ${t('module.violations.approvals.yourTurn', 'دورك الآن — اعتمد أو ارفض')}</div>` : ''}
                    <div class="vap-card-top">
                        <div>
                            <div class="vap-person">${Utils.escapeHTML(personName)} — ${Utils.escapeHTML(vd.violationType || '—')}</div>
                            <div class="vap-meta">${t('module.violations.approvals.requestNo', 'رقم الطلب')}: ${Utils.escapeHTML(String(r.id))} · ${t('module.violations.approvals.createdAt', 'أُنشئ')}: ${dateStr} · ${t('module.violations.approvals.createdBy', 'بواسطة')}: ${Utils.escapeHTML(r.createdByName || r.createdBy || '—')}</div>
                        </div>
                        <span class="vap-badge ${badgeClass}">${badgeLabel}</span>
                    </div>
                    <div class="vap-grid">
                        <div><strong>${t('module.violations.approvals.site', 'الموقع')}:</strong> ${Utils.escapeHTML(vd.violationLocation || '—')}</div>
                        <div><strong>${t('module.violations.approvals.place', 'المكان')}:</strong> ${Utils.escapeHTML(vd.violationPlace || '—')}</div>
                        <div><strong>${t('module.violations.approvals.date', 'التاريخ')}:</strong> ${vd.violationDate ? new Date(vd.violationDate).toLocaleDateString('ar-EG-u-nu-latn') : '—'}</div>
                        <div><strong>${t('module.violations.approvals.time', 'الوقت')}:</strong> ${Utils.escapeHTML(vd.violationTime || '—')}</div>
                        <div><strong>${t('module.violations.approvals.severity', 'الشدة')}:</strong> ${Utils.escapeHTML(vd.severity || '—')}</div>
                        <div><strong>${t('module.violations.approvals.fine', 'الغرامة')}:</strong> ${vd.fineAmount ? Number(vd.fineAmount).toLocaleString('en-US') + ' ج.م' : '—'}</div>
                    </div>
                    ${detailsShort ? `<div style="font-size:.82rem;color:#475569;margin-bottom:10px;line-height:1.5;"><strong>${t('module.violations.approvals.details', 'التفاصيل')}:</strong> ${Utils.escapeHTML(detailsShort)}</div>` : ''}
                    ${steps}
                    ${r.rejectionReason ? `<div style="background:#fef2f2;border-inline-start:3px solid #dc2626;padding:8px 10px;border-radius:8px;font-size:.82rem;color:#7f1d1d;margin-bottom:8px;"><strong>${t('module.violations.approvals.rejectionReason', 'سبب الرفض')}:</strong> ${Utils.escapeHTML(r.rejectionReason)}</div>` : ''}
                    ${showActions ? `
                        <div class="vap-actions">
                            <button type="button" class="vap-btn vap-btn-no viol-req-reject-btn" data-id="${Utils.escapeHTML(String(r.id))}">
                                <i class="fas fa-times"></i> ${t('module.violations.approvals.reject', 'رفض')}
                            </button>
                            <button type="button" class="vap-btn vap-btn-ok viol-req-approve-btn" data-id="${Utils.escapeHTML(String(r.id))}">
                                <i class="fas fa-check"></i> ${t('module.violations.approvals.approve', 'اعتماد')}
                            </button>
                        </div>
                    ` : ''}
                </article>
            `;
        }).join('');
    },

    _reloadViolationApprovalsInPlace(modal) {
        const st = modal && modal._violApprovalState;
        if (!st) return;
        this._invalidateViolationApprovalRequestsCache();
        st.loading = true;
        this._refreshViolationApprovalsModalBody(modal, st, { settings: false });
        void this._loadViolationApprovalsPanelData(modal, st);
        try { if (this.load) this.load(); } catch (e) {}
    },

    _wireViolationApprovalActions(modal, isAdmin) {
        const t = (k, f) => this._t(k, f);
        const sheet = modal.querySelector('#vap-reject-sheet');
        const reasonEl = modal.querySelector('#vap-reject-reason');
        const confirmBtn = modal.querySelector('#vap-reject-confirm');

        modal.querySelectorAll('.viol-req-approve-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                if (!id) return;
                const st = modal._violApprovalState;
                const req = (st?.requests || []).find((r) => String(r.id) === String(id));
                const force = !!(isAdmin && req && !this._isCurrentViolationApprover(req));
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + t('module.violations.approvals.approving', 'جاري الاعتماد…');
                const res = await this.approveViolationRequest(id, { force });
                if (res && res.success) {
                    Notification.success(res.message || t('module.violations.approvals.approve', 'اعتماد'));
                    this._reloadViolationApprovalsInPlace(modal);
                } else {
                    Notification.error((res && res.message) || 'فشل الاعتماد');
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-check"></i> ' + t('module.violations.approvals.approve', 'اعتماد');
                }
            });
        });
        modal.querySelectorAll('.viol-req-reject-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (!id || !sheet) return;
                sheet.hidden = false;
                sheet.dataset.requestId = id;
                if (reasonEl) {
                    reasonEl.value = '';
                    setTimeout(() => reasonEl.focus(), 30);
                }
            });
        });
        if (confirmBtn && !confirmBtn.dataset.bound) {
            confirmBtn.dataset.bound = '1';
            confirmBtn.addEventListener('click', async () => {
                const id = sheet && sheet.dataset.requestId;
                const reason = String(reasonEl?.value || '').trim();
                if (!id) return;
                if (!reason) {
                    Notification.warning(t('module.violations.approvals.rejectRequired', 'سبب الرفض إلزامي'));
                    reasonEl?.focus();
                    return;
                }
                confirmBtn.disabled = true;
                const res = await this.rejectViolationRequest(id, reason);
                confirmBtn.disabled = false;
                if (res && res.success) {
                    if (sheet) sheet.hidden = true;
                    Notification.success(res.message || t('module.violations.approvals.reject', 'رفض'));
                    this._reloadViolationApprovalsInPlace(modal);
                } else {
                    Notification.error((res && res.message) || 'فشل الرفض');
                }
            });
        }
    },

    countPriorViolationsSamePersonMonth(draft, excludeId) {
        const ym = this.getViolationYearMonthKey(draft.violationDate);
        if (ym == null) return 0;
        const list = AppState.appData.violations || [];
        let n = 0;
        for (let i = 0; i < list.length; i++) {
            const v = list[i];
            if (!v || (excludeId && String(v.id) === String(excludeId))) continue;
            if (this.getViolationYearMonthKey(v.violationDate) !== ym) continue;
            if (this.sameViolationPersonForSequence(draft, v)) n++;
        }
        return n;
    },

    /**
     * رصد التكرار الذكي للجزاءات (Three-Strike / Repeat Offender Alert)
     * يحسب عدد المخالفات السابقة لنفس الشخص (تاريخياً وفي نفس الشهر) ويحدد مستوى Strike والإجراء المقترح
     */
    getPersonViolationHistory(draft, excludeViolationId = null) {
        if (!draft) {
            return {
                totalCount: 0,
                monthCount: 0,
                nextSequence: 1,
                strikeLevel: 1,
                strikeBadgeText: 'المخالفة الأولى (Strike 1)',
                priorList: [],
                suggestedAction: 'إنذار وتنبيه شفهي وتوعية ميدانية مع التعهد بعدم التكرار'
            };
        }

        const list = AppState.appData?.violations || [];
        const ym = this.getViolationYearMonthKey(draft.violationDate);
        let totalCount = 0;
        let monthCount = 0;
        const priorList = [];

        for (let i = 0; i < list.length; i++) {
            const v = list[i];
            if (!v || (excludeViolationId && String(v.id) === String(excludeViolationId))) continue;
            if (this.sameViolationPersonForSequence(draft, v)) {
                totalCount++;
                if (ym != null && this.getViolationYearMonthKey(v.violationDate) === ym) {
                    monthCount++;
                }
                priorList.push(v);
            }
        }

        priorList.sort((a, b) => new Date(b.violationDate || 0) - new Date(a.violationDate || 0));

        const nextSequence = totalCount + 1;
        let strikeLevel = 1;
        let strikeBadgeText = 'المخالفة الأولى (Strike 1)';
        let suggestedAction = 'إنذار وتنبيه شفهي وتوعية ميدانية مع التعهد بعدم التكرار';

        if (nextSequence === 2) {
            strikeLevel = 2;
            strikeBadgeText = 'مكرر — المخالفة رقم 2 (Strike 2)';
            suggestedAction = 'إنذار كتابي رسمي مع تطبيق الجزاء والغرامة المالية المقررة';
        } else if (nextSequence >= 3) {
            strikeLevel = 3;
            strikeBadgeText = `تكرار حرج — المخالفة رقم ${nextSequence} (Strike 3+)`;
            suggestedAction = 'تصعيد فوري للإدارة العليا وإصدار أمر منع واستبعاد من المنشأة (Ban Order)';
        }

        return {
            totalCount,
            monthCount,
            nextSequence,
            strikeLevel,
            strikeBadgeText,
            priorList,
            suggestedAction
        };
    },

    refreshViolationSequenceBadgeInModal(modal, excludeViolationId) {
        const info = modal && modal.querySelector ? modal.querySelector('#violation-sequence-info') : null;
        if (!info) return;
        const personType = document.getElementById('violation-person-type')?.value;
        const rawDate = document.getElementById('violation-date')?.value;
        const violationDate = rawDate || new Date().toISOString().slice(0, 10);
        if (!personType) {
            info.innerHTML = '';
            info.classList.add('hidden');
            return;
        }
        const draft = { personType, violationDate: `${violationDate}T12:00:00` };
        if (personType === 'employee') {
            draft.employeeCode = document.getElementById('violation-employee-code')?.value.trim() || '';
            draft.employeeName = document.getElementById('violation-person-name')?.value.trim() || '';
            if (!draft.employeeCode && !draft.employeeName) {
                info.innerHTML = '';
                info.classList.add('hidden');
                return;
            }
        } else {
            const sel = document.getElementById('violation-contractor-select');
            draft.contractorName = (sel?.value || '').trim();
            draft.contractorWorker = document.getElementById('violation-contractor-worker')?.value.trim() || '';
            if (!draft.contractorName && !draft.contractorWorker) {
                info.innerHTML = '';
                info.classList.add('hidden');
                return;
            }
        }

        const history = this.getPersonViolationHistory(draft, excludeViolationId);
        const lastViol = history.priorList[0];
        const lastViolType = lastViol?.violationType || '';
        const cleanLastDate = (() => {
            if (!lastViol?.violationDate) return '';
            const d = new Date(lastViol.violationDate);
            if (isNaN(d.getTime())) return String(lastViol.violationDate).slice(0, 10);
            return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
        })();

        let badgeHtml = '';
        if (history.strikeLevel === 1) {
            info.className = 'mt-3';
            badgeHtml = `
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-right: 4px solid #16a34a; border-radius: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 34px; height: 34px; border-radius: 8px; background: #dcfce7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <i class="fas fa-check-circle" style="color: #16a34a; font-size: 17px;"></i>
                        </div>
                        <div>
                            <strong style="color: #166534; font-size: 0.88rem; display: block;">السجل سليم (المخالفة الأولى — Strike 1)</strong>
                            <p style="margin: 2px 0 0 0; font-size: 0.78rem; color: #15803d; line-height: 1.4;">لا توجد مخالفات سابقة مسجلة لهذا الشخص. الإجراء الموصى به: ${history.suggestedAction}</p>
                        </div>
                    </div>
                    <span style="background: #dcfce7; color: #166534; border: 1px solid #86efac; padding: 3px 12px; border-radius: 9999px; font-weight: 800; font-size: 11px; white-space: nowrap;">
                        سجل نظيف
                    </span>
                </div>
            `;
        } else if (history.strikeLevel === 2) {
            info.className = 'mt-3';
            badgeHtml = `
                <div style="display: flex; flex-direction: column; gap: 8px; padding: 13px 16px; background: #fffbeb; border: 1px solid #fde68a; border-right: 4px solid #d97706; border-radius: 12px; box-shadow: 0 1px 3px rgba(217, 119, 6, 0.08);">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 34px; height: 34px; border-radius: 8px; background: #fef3c7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <i class="fas fa-exclamation-triangle" style="color: #d97706; font-size: 16px;"></i>
                            </div>
                            <strong style="color: #92400e; font-size: 0.9rem;">تنبيه تكرار الجزاء (المخالفة رقم 2 — Strike 2)</strong>
                        </div>
                        <span style="background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; padding: 3px 12px; border-radius: 9999px; font-weight: 800; font-size: 11px;">
                            ⚠️ مخالفة مكررة (2)
                        </span>
                    </div>
                    <p style="margin: 0; font-size: 0.82rem; color: #78350f; line-height: 1.5;">
                        لدى الشخص مخالفة سابقة مسجلة بتاريخ <strong dir="ltr">${cleanLastDate}</strong> (${Utils.escapeHTML(lastViolType)}).
                        <br><strong>الإجراء النظامي المقترح:</strong> ${history.suggestedAction}
                    </p>
                    <div style="display: flex; gap: 8px; margin-top: 4px;">
                        <button type="button" onclick="const a = document.getElementById('violation-action'); if(a){ a.value = '${history.suggestedAction}'; a.focus(); }" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: #fff; border: none; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 2px 4px rgba(180, 83, 9, 0.2); transition: all 0.15s;">
                            <i class="fas fa-magic"></i> تطبيق الإجراء المقترح تلقائياً
                        </button>
                    </div>
                </div>
            `;
        } else {
            info.className = 'mt-3';
            badgeHtml = `
                <div style="display: flex; flex-direction: column; gap: 8px; padding: 13px 16px; background: #fef2f2; border: 1px solid #fecaca; border-right: 4px solid #dc2626; border-radius: 12px; box-shadow: 0 1px 3px rgba(220, 38, 38, 0.1);">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 34px; height: 34px; border-radius: 8px; background: #fee2e2; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <i class="fas fa-radiation text-red-600 text-lg animate-pulse"></i>
                            </div>
                            <strong style="color: #991b1b; font-size: 0.92rem;">🚨 تحذير عالي الخطورة (تكرار حرج — المخالفة رقم ${history.nextSequence} — Strike 3+)</strong>
                        </div>
                        <span style="background: #fee2e2; color: #991b1b; border: 1.5px solid #f87171; padding: 3px 12px; border-radius: 9999px; font-weight: 900; font-size: 11px;">
                            حظر واستبعاد مقترح
                        </span>
                    </div>
                    <p style="margin: 0; font-size: 0.82rem; color: #7f1d1d; line-height: 1.5;">
                        الشخص بلغ الحد الأقصى للمخالفات (${history.totalCount} مخالفات سابقة). آخرها بتاريخ <strong dir="ltr">${cleanLastDate}</strong>.
                        <br><strong>الإجراء الصارم المطلوب:</strong> ${history.suggestedAction}
                    </p>
                    <div style="display: flex; gap: 8px; margin-top: 4px; flex-wrap: wrap;">
                        <button type="button" onclick="const a = document.getElementById('violation-action'); if(a){ a.value = '${history.suggestedAction}'; a.focus(); }" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #fff; border: none; border-radius: 8px; font-size: 12px; font-weight: 800; cursor: pointer; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.25); transition: all 0.15s;">
                            <i class="fas fa-ban"></i> تطبيق إجراء المنع والاستبعاد المقترح
                        </button>
                    </div>
                </div>
            `;
        }

        info.innerHTML = badgeHtml;
        info.classList.remove('hidden');
    },

    /**
     * الحصول على قائمة إدارات النظام المعتمدة رسمياً فقط (مطابقة لقائمة الإدارات الرسمية)
     */
    getSystemDepartmentOptions() {
        try {
            if (typeof DailyObservations !== 'undefined' && typeof DailyObservations.getDepartments === 'function') {
                const depts = DailyObservations.getDepartments();
                if (Array.isArray(depts) && depts.length > 0) {
                    return depts;
                }
            }
        } catch (e) { /* ignore */ }

        const departments = new Set();
        const compSettings = AppState.companySettings || {};
        const formDepts = Array.isArray(compSettings.formDepartments)
            ? compSettings.formDepartments
            : (typeof compSettings.formDepartments === 'string' ? compSettings.formDepartments.split(/\n|,/) : []);
        formDepts.forEach(d => { if (d && String(d).trim()) departments.add(String(d).trim()); });

        const legacyDepts = Array.isArray(compSettings.departments)
            ? compSettings.departments
            : (typeof compSettings.departments === 'string' ? compSettings.departments.split(/\n|,/) : []);
        legacyDepts.forEach(d => { if (d && String(d).trim()) departments.add(String(d).trim()); });

        (AppState.appData?.departments || []).forEach(d => {
            const val = typeof d === 'string' ? d : (d.name || d.departmentName || d.title || '');
            if (val && typeof val === 'string' && val.trim()) departments.add(val.trim());
        });

        if (departments.size === 0) {
            [
                'السلامة والصحة المهنية والبيئة',
                'الإدارة الهندسية والمشروعات',
                'إدارة الإنتاج والعمليات',
                'إدارة الصيانة الميكانيكية',
                'إدارة الصيانة الكهربائية',
                'إدارة الجودة ومراقبة العمليات',
                'إدارة المخازن واللوجستيات',
                'إدارة الموارد البشرية والشؤون الإدارية',
                'إدارة الأمن الإداري والحراسات',
                'إدارة المرافق والخدمات العامة'
            ].forEach(d => departments.add(d));
        }
        return Array.from(departments).sort((a, b) => a.localeCompare(b, 'ar'));
    },

    /**
     * فحص المخالفات السابقة في نفس المنطقة / المكان (Area Hotspot Checker)
     */
    checkLocationAreaViolations(location, place, excludeViolationId = null) {
        if (!location && !place) return null;
        const list = AppState.appData?.violations || [];
        const normLoc = String(location || '').trim().toLowerCase();
        const normPlc = String(place || '').trim().toLowerCase();

        const matched = list.filter(v => {
            if (!v || (excludeViolationId && String(v.id) === String(excludeViolationId))) return false;
            const vLoc = String(v.violationLocation || '').trim().toLowerCase();
            const vPlc = String(v.violationPlace || '').trim().toLowerCase();

            if (normPlc && normPlc !== '-- اختر مكان المخالفة --' && normPlc !== '__custom__') {
                if (vPlc === normPlc || (vPlc && (vPlc.includes(normPlc) || normPlc.includes(vPlc)))) {
                    return true;
                }
            }
            if (!normPlc && normLoc && normLoc !== '-- اختر الموقع --') {
                if (vLoc === normLoc || (vLoc && (vLoc.includes(normLoc) || normLoc.includes(vLoc)))) {
                    return true;
                }
            }
            return false;
        });

        if (matched.length === 0) return null;

        matched.sort((a, b) => new Date(b.violationDate || 0) - new Date(a.violationDate || 0));
        return {
            count: matched.length,
            lastViolation: matched[0],
            list: matched
        };
    },

    /**
     * تحديث بطاقة تنبيه بؤرة الخطر وتكرار المخالفات في المنطقة
     */
    refreshAreaHotspotInModal(modal, excludeViolationId = null) {
        if (!modal) return;
        const container = modal.querySelector('#violation-area-hotspot-container');
        if (!container) return;

        const personType = modal.querySelector('#violation-person-type')?.value;
        const locationSelect = personType === 'contractor' 
            ? modal.querySelector('#violation-contractor-location') 
            : modal.querySelector('#violation-employee-location');
        const placeSelect = personType === 'contractor' 
            ? modal.querySelector('#violation-contractor-place') 
            : modal.querySelector('#violation-employee-place');

        const location = locationSelect?.options[locationSelect?.selectedIndex]?.text || locationSelect?.value || '';
        const place = placeSelect?.options[placeSelect?.selectedIndex]?.text || placeSelect?.value || '';

        if (!location || location.includes('-- اختر') || !place || place.includes('-- اختر') || place === '__custom__') {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        const hotspot = this.checkLocationAreaViolations(location, place, excludeViolationId);
        if (!hotspot || hotspot.count === 0) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        const lastV = hotspot.lastViolation;
        const lastDate = lastV?.violationDate ? Utils.formatDate(lastV.violationDate) : '';
        const lastType = lastV?.violationType || '';
        const lastSev = lastV?.severity || '';
        const sevColor = lastSev === 'عالية' ? '#dc2626' : (lastSev === 'متوسطة' ? '#d97706' : '#2563eb');

        container.className = 'mt-3 p-3 rounded-xl border border-amber-300 shadow-sm';
        container.style.background = 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)';
        container.innerHTML = `
            <div style="display: flex; align-items: start; gap: 10px;">
                <div style="width: 32px; height: 32px; border-radius: 8px; background: #fde68a; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <i class="fas fa-map-marked-alt text-amber-800 text-base"></i>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                        <strong style="color: #92400e; font-size: 0.9rem;">
                            ⚠️ تنبيه بؤرة خطر: رُصد سابقاً (${hotspot.count}) مخالفات في منطقة "${Utils.escapeHTML(place)}"
                        </strong>
                        <span class="badge" style="background: #fef08a; color: #854d0e; font-size: 11px; padding: 2px 8px; border-radius: 9999px; font-weight: 800; border: 1px solid #fcd34d;">
                            تكرار مكاني
                        </span>
                    </div>
                    <p style="margin: 4px 0 0 0; font-size: 0.82rem; color: #78350f; line-height: 1.45;">
                        آخر مخالفة مسجلة في هذا المكان: <strong style="color: ${sevColor};">${Utils.escapeHTML(lastType)}</strong> بتاريخ <strong>${lastDate}</strong> (${lastV.status || 'محلول'}).
                        <br><span style="color: #b45309; font-weight: 600;">💡 توجيه السلامة: يرجى التحقق من أسباب تكرار المخالفات في هذه المنطقة المحددة والتوصية بإجراء تصحيحي جذري.</span>
                    </p>
                </div>
            </div>
        `;
        container.classList.remove('hidden');
    },

    /**
     * مقترحات تفاصيل المخالفة والإجراء المتخذ التفاعلية
     */
    getViolationSuggestionChips(type = '') {
        const normType = String(type || '').toLowerCase();
        
        let detailsChips = [];
        const actionChips = [
            'توجيه إنذار وتنبيه شفهي فوري وتوعية العامل باشتراطات السلامة المهنية',
            'إصدار إنذار كتابي رسمي أول والتنبيه بعدم التكرار',
            'إنذار كتابي نهائي مع التوصية بتطبيق خصم مالي وفق اللائحة',
            'إيقاف العمل فوراً وتصحيح الوضع المخالف وإزالة الخطر قبل الاستئناف',
            'سحب تصريح العمل وإلزام المقاول بتقديم خطة عمل آمنة معتمدة',
            'استبعاد فوري للعامل المخالف من الموقع وسحب تصريح الدخول الخاص به',
            'إلزام العامل بحضور تدريب تنشيطي للسلامة والصحة المهنية (Toolbox Talk)'
        ];

        if (normType.includes('مهمات') || normType.includes('وقاية') || normType.includes('ppe')) {
            detailsChips = [
                'عدم الالتزام بارتداء الخوذة وحذاء السلامة في منطقة العمليات والإنتاج',
                'العمل بالصاروخ / التجليخ بدون نظارات حماية العين أو واقي الوجه الشفاف',
                'عدم ارتداء كمامة التنفس الواقية المناسبة في بيئة بها أتربة وأبخرة',
                'استخدام قفازات تالفة أو غير ملائمة لطبيعة الأنشطة الحرارية والميكانيكية'
            ];
        } else if (normType.includes('ارتفاع') || normType.includes('سقالة') || normType.includes('سقالات')) {
            detailsChips = [
                'العمل على ارتفاع يتجاوز 1.8 متر بدون ربط حزام الأمان بنقطة تثبيت معتمدة',
                'استخدام سقالة غير مكتملة وخالية من كارت الاعتماد الأخضر (Scaffold Tag)',
                'عدم توفير حبل نجاة (Life Line) أثناء حركة الفنيين على الارتفاعات',
                'الصعود على هياكل غير مخصصة بدلاً من السلالم المطابقة للمواصفات'
            ];
        } else if (normType.includes('تدخين') || normType.includes('حريق') || normType.includes('اشتعال')) {
            detailsChips = [
                'التدخين داخل منطقة محظورة تحوي مواد كيميائية / بترولية قابلة للاشتعال',
                'تنفيذ أعمال قطع ولحام ساخن بدون مراقب حريق (Fire Watcher) وطفاية',
                'وضع عوائق ومواد خام أمام طفاية الحريق ولوحة الطوارئ تعيق الوصول',
                'عدم فحص صلاحية طفاية الحريق قبل بدء الأعمال الساخنة'
            ];
        } else if (normType.includes('تصريح') || normType.includes('ptw') || normType.includes('عزل') || normType.includes('loto')) {
            detailsChips = [
                'بدء العمل الميداني بدون استخراج وتوقيع تصريح العمل (PTW) المطلوب',
                'تجاوز وقت انتهاء تصريح العمل دون طلب تمديد رسمي من مسؤول السلامة',
                'عدم تطبيق إجراءات عزل الطاقة وتأمين مصادر الخطر بالقفل والبطاقة (LOTO)',
                'دخول مكان مغلق (Confined Space) بدون قياس نسبة الغازات والأكسجين'
            ];
        } else {
            detailsChips = [
                'سوء الترتيب والنظافة وتراكم المخلفات مما يعيق ممرات المشاة ومخارج الطوارئ',
                'قيادة المعدة / الرافعة الشوكية بسرعة زائدة أو بدون تفويض رسمي معتمد',
                'تخزين مواد كيميائية في عبوات غير مخصصة وبدون ملصقات التحذير (GHS)',
                'استخدام معدة أو أداة كهربائية بها أسلاك مكشوفة ودون تأريض مناسب'
            ];
        }

        return { detailsChips, actionChips };
    },

    _violationsImportNormalizeHeaderKey(h) {
        return String(h == null ? '' : h).trim().replace(/\s+/g, '_').replace(/[^\w\u0600-\u06FF]/g, '').toLowerCase();
    },

    _violationsImportPick(row, candidates) {
        const map = {};
        Object.keys(row || {}).forEach((k) => {
            map[this._violationsImportNormalizeHeaderKey(k)] = row[k];
        });
        for (let i = 0; i < candidates.length; i++) {
            const ck = this._violationsImportNormalizeHeaderKey(candidates[i]);
            if (map[ck] !== undefined && map[ck] !== null && String(map[ck]).trim() !== '') {
                return map[ck];
            }
        }
        return '';
    },

    downloadViolationsImportTemplate() {
        if (typeof XLSX === 'undefined') {
            Notification.error('مكتبة Excel غير محمّلة. حدّث الصفحة وحاول مرة أخرى.');
            return;
        }
        const headers = [
            'نوع_الشخص',
            'الكود_الوظيفي',
            'اسم_الموظف',
            'اسم_المقاول',
            'عامل_المقاول',
            'نوع_المخالفة',
            'تاريخ_المخالفة',
            'وقت_المخالفة',
            'الموقع',
            'مكان_المخالفة',
            'الشدة',
            'الحالة',
            'التفاصيل',
            'الاجراء_المتخذ',
            'الغرامة'
        ];
        const example = [
            'موظف',
            '12345',
            '',
            '',
            '',
            'تأخر عن العمل',
            '2026-05-01',
            '08:30',
            'المصنع الرئيسي',
            'خط الإنتاج 1',
            'متوسطة',
            'قيد المراجعة',
            'وصف مختصر',
            'إنذار شفهي',
            '100'
        ];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([headers, example]);
        ws['!cols'] = headers.map(() => ({ wch: 18 }));
        XLSX.utils.book_append_sheet(wb, ws, 'المخالفات');
        const note = [
            ['تعليمات:'],
            ['• نوع_الشخص: اكتب "موظف" أو "مقاول".'],
            ['• للموظف: عبّئ الكود_الوظيفي ونوع_المخالفة والتاريخ والوقت والموقع ومكان_المخالفة.'],
            ['• للمقاول: عبّئ اسم_المقاول كما في القائمة ويمكن تعبئة عامل_المقاول.'],
            ['• التاريخ بصيغة YYYY-MM-DD أو تنسيق تاريخ إكسل.']
        ];
        const ws2 = XLSX.utils.aoa_to_sheet(note);
        XLSX.utils.book_append_sheet(wb, ws2, 'تعليمات');
        XLSX.writeFile(wb, `قالب_استيراد_المخالفات_${new Date().toISOString().slice(0, 10)}.xlsx`);
    },

    showViolationsImportModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2 text-green-600"></i>استيراد مخالفات من Excel</h2>
                    <button type="button" class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-900">
                        <p class="m-0 mb-2"><i class="fas fa-download ml-2"></i>حمّل القالب الفارغ (صف عناوين + صف مثال)، عبّئ البيانات ثم ارفع الملف.</p>
                        <button type="button" id="violations-import-download-template" class="btn-secondary btn-sm">
                            <i class="fas fa-file-download ml-2"></i>تحميل قالب Excel
                        </button>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">ملف Excel (.xlsx)</label>
                        <input type="file" id="violations-import-file" accept=".xlsx,.xls" class="form-input">
                    </div>
                    <div id="violations-import-preview" class="hidden text-sm text-gray-600 max-h-48 overflow-auto border rounded p-2 bg-gray-50"></div>
                    <div class="flex justify-end gap-2 pt-2 border-t">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                        <button type="button" id="violations-import-confirm" class="btn-primary" disabled>
                            <i class="fas fa-upload ml-2"></i>تأكيد الاستيراد
                        </button>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(modal);
        let parsedRows = [];
        const fileInput = modal.querySelector('#violations-import-file');
        const preview = modal.querySelector('#violations-import-preview');
        const confirmBtn = modal.querySelector('#violations-import-confirm');
        modal.querySelector('#violations-import-download-template')?.addEventListener('click', () => this.downloadViolationsImportTemplate());
        fileInput?.addEventListener('change', async (e) => {
            const f = e.target.files && e.target.files[0];
            parsedRows = [];
            confirmBtn.disabled = true;
            preview.classList.add('hidden');
            if (!f) return;
            if (typeof XLSX === 'undefined') {
                Notification.error('مكتبة Excel غير محمّلة.');
                return;
            }
            try {
                const buf = await f.arrayBuffer();
                const wb = XLSX.read(buf, { type: 'array' });
                const sheet = wb.Sheets[wb.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
                parsedRows = Array.isArray(json) ? json : [];
                preview.innerHTML = `<p>تم قراءة <strong>${parsedRows.length}</strong> صفاً من الورقة الأولى «${Utils.escapeHTML(wb.SheetNames[0] || '')}».</p>`;
                preview.classList.remove('hidden');
                confirmBtn.disabled = parsedRows.length === 0;
            } catch (err) {
                Utils.safeError('استيراد مخالفات:', err);
                Notification.error('تعذّر قراءة الملف: ' + (err.message || ''));
            }
        });
        confirmBtn?.addEventListener('click', async () => {
            if (!parsedRows.length) return;
            confirmBtn.disabled = true;
            await this.processViolationsImportRows(parsedRows, modal);
        });
        modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.remove(); });
    },

    async processViolationsImportRows(rows, modal) {
        let ok = 0;
        let fail = 0;
        const errors = [];
        if (!Array.isArray(AppState.appData.violations)) AppState.appData.violations = [];
        let violationTypes = [];
        if (typeof ViolationTypesManager !== 'undefined' && ViolationTypesManager.ensureInitialized && ViolationTypesManager.getAll) {
            try {
                ViolationTypesManager.ensureInitialized();
                violationTypes = ViolationTypesManager.getAll();
            } catch (e) {
                violationTypes = AppState.appData.violationTypes || [];
            }
        } else {
            violationTypes = AppState.appData.violationTypes || [];
        }
        const typeByName = new Map((violationTypes || []).map(t => [String(t.name || '').trim().toLowerCase(), t]));
        const uniqueMissingTypeNames = new Set();
        for (let r = 0; r < rows.length; r++) {
            const row0 = rows[r] || {};
            const nm = String(this._violationsImportPick(row0, ['نوع_المخالفة', 'نوع المخالفة', 'violationType']) || '').trim();
            if (nm && !typeByName.has(nm.toLowerCase())) uniqueMissingTypeNames.add(nm);
        }
        if (typeof ViolationTypesManager !== 'undefined' && ViolationTypesManager.ensureInitialized && ViolationTypesManager.addType && ViolationTypesManager.getTypeByName) {
            try {
                ViolationTypesManager.ensureInitialized();
                uniqueMissingTypeNames.forEach((typeName) => {
                    const lk = typeName.toLowerCase();
                    try {
                        const nt = ViolationTypesManager.addType({ name: typeName, description: '', fineAmount: 0 });
                        typeByName.set(lk, nt);
                    } catch (addErr) {
                        const ex = ViolationTypesManager.getTypeByName(typeName);
                        if (ex) typeByName.set(lk, ex);
                    }
                });
            } catch (batchVtErr) {
                Utils.safeWarn('استيراد: تعذر إنشاء أنواع مخالفات جديدة من الملف:', batchVtErr);
            }
        }
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i] || {};
            try {
                const ptRaw = String(this._violationsImportPick(row, ['نوع_الشخص', 'نوع الشخص', 'personType', 'persontype']) || '').trim();
                const ptLower = ptRaw.toLowerCase();
                const personType = (ptLower.includes('مقاول') || ptLower === 'contractor') ? 'contractor' : 'employee';
                const empCode = String(this._violationsImportPick(row, ['الكود_الوظيفي', 'الكود الوظيفي', 'employeeCode', 'employeenumber', 'employeeNumber']) || '').trim();
                const empName = String(this._violationsImportPick(row, ['اسم_الموظف', 'اسم الموظف', 'employeeName']) || '').trim();
                const cName = String(this._violationsImportPick(row, ['اسم_المقاول', 'اسم المقاول', 'contractorName']) || '').trim();
                const cWorker = String(this._violationsImportPick(row, ['عامل_المقاول', 'عامل المقاول', 'contractorWorker']) || '').trim();
                const vTypeName = String(this._violationsImportPick(row, ['نوع_المخالفة', 'نوع المخالفة', 'violationType']) || '').trim();
                const vDateRaw = this._violationsImportPick(row, ['تاريخ_المخالفة', 'تاريخ المخالفة', 'violationDate', 'date']);
                const vTimeRaw = String(this._violationsImportPick(row, ['وقت_المخالفة', 'وقت المخالفة', 'violationTime', 'time']) || '08:00');
                const loc = String(this._violationsImportPick(row, ['الموقع', 'violationLocation', 'location']) || '').trim();
                const place = String(this._violationsImportPick(row, ['مكان_المخالفة', 'مكان المخالفة', 'violationPlace', 'place']) || '').trim();
                const sev = String(this._violationsImportPick(row, ['الشدة', 'severity']) || 'متوسطة').trim();
                const st = String(this._violationsImportPick(row, ['الحالة', 'status']) || 'قيد المراجعة').trim();
                const details = String(this._violationsImportPick(row, ['التفاصيل', 'violationDetails', 'details']) || '').trim();
                const action = String(this._violationsImportPick(row, ['الاجراء_المتخذ', 'الإجراء المتخذ', 'actionTaken', 'action']) || '').trim();
                const fineRaw = this._violationsImportPick(row, ['الغرامة', 'fineAmount', 'fine']);
                if (!vTypeName || !vDateRaw) {
                    fail++;
                    errors.push(`صف ${i + 2}: نوع المخالفة أو التاريخ ناقص`);
                    continue;
                }
                if (personType === 'employee' && !empCode) {
                    fail++;
                    errors.push(`صف ${i + 2}: الكود الوظيفي مطلوب للموظف`);
                    continue;
                }
                if (personType === 'contractor' && !cName) {
                    fail++;
                    errors.push(`صف ${i + 2}: اسم المقاول مطلوب`);
                    continue;
                }
                let violationDate = vDateRaw;
                if (typeof violationDate === 'number' && typeof XLSX !== 'undefined' && XLSX.SSF) {
                    try {
                        const d = XLSX.SSF.parse_date_code(violationDate);
                        if (d) violationDate = new Date(Date.UTC(d.y, d.m - 1, d.d)).toISOString();
                    } catch (e1) { /* keep */ }
                } else if (typeof violationDate === 'string' && /^\d{4}-\d{2}-\d{2}/.test(violationDate.trim())) {
                    violationDate = new Date(violationDate.trim().slice(0, 10) + 'T12:00:00').toISOString();
                } else {
                    const dTry = new Date(violationDate);
                    violationDate = isNaN(dTry.getTime()) ? new Date().toISOString() : dTry.toISOString();
                }
                const typeObj = typeByName.get(vTypeName.toLowerCase());
                const violationTypeId = typeObj ? String(typeObj.id || '') : '';
                const fineAmount = this.parseFineAmount(fineRaw !== '' && fineRaw !== undefined ? fineRaw : (typeObj ? typeObj.fineAmount : 0));
                const draft = {
                    personType,
                    violationDate,
                    employeeCode: empCode,
                    employeeNumber: empCode,
                    employeeName: empName,
                    contractorName: cName,
                    contractorWorker: cWorker
                };
                const seq = this.countPriorViolationsSamePersonMonth(draft, null) + 1;
                const rec = {
                    id: Utils.generateId('VIOLATION'),
                    isoCode: typeof generateISOCode === 'function' ? generateISOCode('VIOL', AppState.appData.violations) : ('VIOL-' + Date.now() + '-' + i),
                    personType,
                    employeeId: personType === 'employee' ? Utils.generateId('EMP') : '',
                    employeeName: personType === 'employee' ? empName : '',
                    employeeCode: personType === 'employee' ? empCode : '',
                    employeeNumber: personType === 'employee' ? empCode : '',
                    employeePosition: '',
                    employeeDepartment: '',
                    contractorId: '',
                    contractorName: personType === 'contractor' ? cName : '',
                    contractorWorker: personType === 'contractor' ? cWorker : '',
                    contractorPosition: '',
                    contractorDepartment: '',
                    violationTypeId,
                    violationType: vTypeName,
                    fineAmount,
                    violationDate,
                    violationTime: vTimeRaw.length >= 5 ? vTimeRaw.slice(0, 5) : '08:00',
                    violationLocation: loc,
                    violationLocationId: loc,
                    violationPlace: place,
                    violationPlaceId: place,
                    violationDetails: details,
                    severity: sev || 'متوسطة',
                    actionTaken: action,
                    status: st || 'قيد المراجعة',
                    photo: '',
                    violationSequenceInMonth: seq,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                AppState.appData.violations.push(this.normalizeViolationRecord(rec));
                ok++;
            } catch (rowErr) {
                fail++;
                errors.push(`صف ${i + 2}: ${rowErr.message || rowErr}`);
            }
        }
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            try { window.DataManager.save(); } catch (e) { /* ignore */ }
        }
        GoogleIntegration.autoSave('Violations', AppState.appData.violations).catch(() => {
            Notification.warning('تم الاستيراد محلياً. راجع المزامنة مع الشيت لاحقاً.');
        });
        if (typeof ViolationTypesManager !== 'undefined' && ViolationTypesManager.ensureViolationsTypeIds) {
            try {
                ViolationTypesManager.ensureViolationsTypeIds();
            } catch (eId) { /* ignore */ }
        }
        if (modal && modal.parentNode) modal.remove();
        Notification.success(`تم استيراد ${ok} مخالفة${fail ? ` (تخطي ${fail})` : ''}.`);
        if (errors.length && errors.length <= 5) {
            errors.forEach((m) => Utils.safeWarn(m));
        } else if (errors.length) {
            Utils.safeWarn('استيراد مخالفات: ' + errors.slice(0, 5).join(' | ') + ' ...');
        }
        this.load();
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

        // التحقق من المتطلبات الأساسية
        if (typeof Utils === 'undefined') {
            console.error('❌ Utils غير متوفر - يرجى تحديث الصفحة');
            const section = document.getElementById('violations-section');
            if (section) {
                section.innerHTML = `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">فشل تحميل الموديول</h3>
                                <p class="text-gray-500 mb-4">يرجى تحديث الصفحة</p>
                                <button onclick="location.reload()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>تحديث الصفحة
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
            return;
        }

        const section = document.getElementById('violations-section');
        if (!section) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ قسم violations-section غير موجود');
            }
            return;
        }
        try {
            // التأكد من وجود AppState
            if (typeof AppState === 'undefined') {
                const errorMsg = '❌ AppState غير متوفر. يرجى تحديث الصفحة.';
                Utils.safeError(errorMsg);
                section.innerHTML = `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">فشل تحميل الموديول</h3>
                                <p class="text-gray-500 mb-4">يرجى تحديث الصفحة</p>
                                <button onclick="location.reload()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>تحديث الصفحة
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                return;
            }

            // التأكد من وجود البيانات
            if (!AppState.appData) {
                AppState.appData = {};
            }
            if (!AppState.appData.violations) {
                AppState.appData.violations = [];
            }
            if (!AppState.appData.blacklistRegister) {
                AppState.appData.blacklistRegister = [];
            }

            // التحقق من وجود ViolationTypesManager قبل الاستدعاء
            if (typeof ViolationTypesManager !== 'undefined' && ViolationTypesManager.ensureInitialized) {
                try {
                    ViolationTypesManager.ensureInitialized();
                } catch (vtError) {
                    if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                        Utils.safeWarn('⚠️ خطأ في تهيئة ViolationTypesManager:', vtError);
                    }
                }
            } else {
                // استخدام القيم الافتراضية إذا لم يكن ViolationTypesManager متوفراً
                if (!AppState.appData.violationTypes || !Array.isArray(AppState.appData.violationTypes)) {
                    AppState.appData.violationTypes = [];
                }
            }

            // ✅ تحميل مباشر من قاعدة البيانات/Sheets عند أول فتح (بدون تكرار طلبات متوازية)
            const hasViolationsData = Array.isArray(AppState.appData.violations) && AppState.appData.violations.length > 0;
            const lastSync = (() => {
                try { return localStorage.getItem('violations_last_sync'); } catch (e) { return null; }
            })();
            const cacheAge = lastSync ? (Date.now() - parseInt(lastSync, 10)) : Infinity;
            const CACHE_DURATION = 10 * 60 * 1000; // 10 دقائق
            const isStale = cacheAge >= CACHE_DURATION;
            const canFetch = typeof GoogleIntegration !== 'undefined' && GoogleIntegration.readFromSheets;
            const isEnabled = AppState?.googleConfig?.appsScript?.enabled && AppState?.googleConfig?.appsScript?.scriptUrl;
            if (!hasViolationsData && canFetch && isEnabled) {
                try {
                    await this.ensureViolationsCoreDataLoaded({ force: true });
                } catch (e) {
                    // عرض محلي ثم يكمّل التحديث في الخلفية
                }
            } else if (isStale && hasViolationsData && canFetch && isEnabled) {
                void this.ensureViolationsCoreDataLoaded({ force: true }).then(() => {
                    try {
                        const stats = document.getElementById('violations-stats-cards');
                        if (stats) stats.outerHTML = this.renderAllViolationsStats();
                        const list = document.getElementById('violations-list');
                        if (list) list.innerHTML = this.renderViolationsList();
                        const filters = document.getElementById('violations-filters-container');
                        if (filters) filters.innerHTML = this.renderFilters();
                        this.bindFilters();
                    } catch (e2) { /* ignore */ }
                });
            }

            const t = (k, f) => this._t(k, f);
            section.innerHTML = `
            <div class="section-header" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); border-radius: 16px; padding: 24px 32px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(220, 38, 38, 0.25);">
                <div class="flex items-center justify-between flex-wrap gap-3">
                    <div class="text-center w-full" style="flex-grow: 1; min-width: 200px;">
                        <h1 class="section-title" style="color: white; font-size: 2rem; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2); margin-bottom: 8px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-exclamation-triangle ml-3" style="font-size: 1.8rem;"></i>
                            ${t('module.violations.title', 'سجل المخالفات')}
                        </h1>
                        <p class="section-subtitle" style="color: rgba(255,255,255,0.9); font-size: 1rem; margin: 0;">${t('module.violations.subtitle', 'تسجيل ومتابعة مخالفات الموظفين والمقاولين')}</p>
                    </div>
                    <div class="flex flex-shrink-0 flex-wrap gap-2 justify-center">
                        <button type="button" id="add-violation-btn" class="btn-primary" style="background: white; color: #dc2626; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;">
                            <i class="fas fa-plus ml-2"></i>
                            ${t('module.violations.btn.new', 'تسجيل مخالفة جديدة')}
                        </button>
                        <button type="button" id="viol-approvals-btn" onclick="Violations.showViolationApprovalsManager()" style="background: rgba(255,255,255,0.18); color: #fff; border: 2px solid rgba(255,255,255,0.4); padding: 12px 18px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; position: relative;" title="${t('module.violations.btn.approvals', 'دائرة اعتماد المخالفات')}">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            ${t('module.violations.btn.approvals', 'دائرة الاعتماد')}
                            <span id="viol-approvals-pending-badge" class="vap-nav-badge" hidden></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <!-- Tabs Navigation -->
                <div class="tabs-container mb-4">
                    <div class="tabs-nav" style="flex-wrap: nowrap; overflow-x: auto; overflow-y: visible; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box;">
                        <button class="tab-btn active" data-tab="all" onclick="Violations.switchTab('all')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-list ml-2"></i>${t('module.violations.tab.all', 'جميع المخالفات')}
                        </button>
                        <button class="tab-btn" data-tab="employees" onclick="Violations.switchTab('employees')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-user-tie ml-2"></i>${t('module.violations.tab.employees', 'مخالفات الموظفين')}
                        </button>
                        <button class="tab-btn" data-tab="contractors" onclick="Violations.switchTab('contractors')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-users-cog ml-2"></i>${t('module.violations.tab.contractors', 'مخالفات المقاولين')}
                        </button>
                        <button class="tab-btn" data-tab="analytics" onclick="Violations.switchTab('analytics')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-chart-bar ml-2"></i>${t('module.violations.tab.analytics', 'تحليل البيانات')}
                        </button>
                        <button class="tab-btn" data-tab="blacklist" onclick="Violations.switchTabAsync('blacklist')" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-user-slash ml-2"></i>${t('module.violations.tab.blacklist', 'سجل الممنوعين من الدخول – Blacklist')}
                        </button>
                        <button id="violations-btn-refresh" type="button" class="tab-btn" onclick="Violations.refreshModule()" title="${t('module.common.refresh', 'تحديث البيانات')}" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-sync-alt ml-2"></i>${t('module.common.refresh', 'تحديث')}
                        </button>
                    </div>
                </div>
                
                <!-- Tab Content -->
                <div id="violations-tab-content">
                    <div class="content-card" id="violations-list-tab">
                    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <h2 class="card-title" style="margin: 0;"><i class="fas fa-list ml-2"></i>قائمة المخالفات</h2>
                        <div style="display: flex; gap: 8px;">
                            <button type="button" class="btn-primary" onclick="Violations.exportCurrentFilteredViolationsToExcel()" style="background: linear-gradient(135deg, #059669, #047857); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(5,150,105,0.25);" title="تصدير السجل الحالي إلى Excel منسق مع ملخص المقاولين وتحليل RCA">
                                <i class="fas fa-file-excel ml-1"></i>تصدير Excel (مع ملخص المقاولين و RCA)
                            </button>
                            <button type="button" class="btn-primary" onclick="Violations.showAllViolationsReportDialog()" style="background: linear-gradient(135deg, #1e3a8a, #0f172a); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(30,58,138,0.25);">
                                <i class="fas fa-file-pdf ml-1"></i>تصدير السجل العام (ISO PDF)
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        ${this.renderAllViolationsStats()}
                        <div id="violations-filters-container" class="mb-4">
                            ${this.renderFilters()}
                        </div>
                        <div id="violations-list" class="violations-list-scroll">
                            ${this.renderViolationsList()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
            this.setupEventListeners();
            this._ensureViolationApprovalsStyles();
            void this._prefetchViolationApprovalPanelData();

            // ✅ تحديث خلفي بعد العرض (بدون إعادة بناء كامل إذا كانت البيانات محدثة)
            Promise.resolve(this.ensureViolationsCoreDataLoaded({ force: false }))
                .then(() => {
                    try {
                        const stats = document.getElementById('violations-stats-cards');
                        if (stats) stats.outerHTML = this.renderAllViolationsStats();
                        const list = document.getElementById('violations-list');
                        if (list) list.innerHTML = this.renderViolationsList();
                        const filters = document.getElementById('violations-filters-container');
                        if (filters) filters.innerHTML = this.renderFilters();
                        this.bindFilters();
                    } catch (e) {}
                })
                .catch(() => {});
        } catch (error) {
            Utils.safeError('❌ خطأ في تحميل مديول المخالفات:', error);
            section.innerHTML = `
                <div class="section-header">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-exclamation-circle ml-3"></i>
                            سجل المخالفات
                        </h1>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">حدث خطأ أثناء تحميل البيانات</p>
                                <button onclick="Violations.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    إعادة المحاولة
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    },

    /**
     * تحميل بيانات المخالفات الأساسية من قاعدة SQL مرة واحدة (مع منع التكرار)
     */
    async ensureViolationsCoreDataLoaded({ force = false } = {}) {
        if (this._violationsCoreLoadPromise && !force) {
            return this._violationsCoreLoadPromise;
        }
        this._violationsCoreLoadPromise = (async () => {
            if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.readFromSheets) return;

            const isEnabled = AppState?.googleConfig?.appsScript?.enabled && AppState?.googleConfig?.appsScript?.scriptUrl;
            if (!isEnabled) return;

            const [violationsData, typesData] = await Promise.all([
                GoogleIntegration.readFromSheets('Violations').catch(() => null),
                GoogleIntegration.readFromSheets('ViolationTypes').catch(() => null),
            ]);

            if (Array.isArray(violationsData)) {
                const serverNormalized = violationsData
                    .map((item) => this.normalizeViolationRecord(item))
                    .filter(Boolean);
                const localViolations = Array.isArray(AppState.appData.violations) ? AppState.appData.violations : [];
                // P1.4: لا تستبدل محلياً غير فارغ بمصفوفة فارغة من الخادم (مثل العيادة)
                if (serverNormalized.length === 0 && localViolations.length > 0) {
                    Utils.safeWarn(`⚠️ تجاهل مخالفات فارغة من الخادم — الإبقاء على ${localViolations.length} مخالفة محلية`);
                } else {
                    // حماية إضافية: لا تفقد مخالفات محلية حديثة لم تصلها الخادم بعد
                    const serverIds = new Set(serverNormalized.map(v => v && v.id).filter(Boolean));
                    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
                    const localOnlyRecent = localViolations.filter(v => {
                        if (!v || !v.id || serverIds.has(v.id)) return false;
                        const created = new Date(v.createdAt || v.timestamp || 0).getTime();
                        return created >= fiveMinutesAgo;
                    });
                    AppState.appData.violations = localOnlyRecent.length > 0
                        ? [...localOnlyRecent, ...serverNormalized]
                        : serverNormalized;
                }
            }
            // لا تستبدل أنواعاً محلية/مستوردة بمصفوفة فارغة من الشيت (استجابة خاطئة أو تأخر) — يمنع الرجوع للافتراضي بعد التحديث
            if (Array.isArray(typesData)) {
                const localTypes = Array.isArray(AppState.appData.violationTypes) ? AppState.appData.violationTypes : [];
                if (typesData.length > 0) {
                    AppState.appData.violationTypes = typesData;
                } else if (localTypes.length === 0) {
                    AppState.appData.violationTypes = [];
                }
                if (typesData.length > 0 || (typesData.length === 0 && localTypes.length === 0)) {
                    try {
                        if (!AppState.syncMeta) AppState.syncMeta = { sheets: {}, users: 0, lastSyncTime: 0, userEmail: null };
                        if (!AppState.syncMeta.sheets) AppState.syncMeta.sheets = {};
                        AppState.syncMeta.sheets.ViolationTypes = Date.now();
                    } catch (eMeta) { /* ignore */ }
                }
            }

            try {
                if (typeof ViolationTypesManager !== 'undefined' && ViolationTypesManager.ensureInitialized) {
                    ViolationTypesManager.ensureInitialized();
                }
            } catch (e) {}

            try { localStorage.setItem('violations_last_sync', String(Date.now())); } catch (e) {}

            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                try { window.DataManager.save(); } catch (e) {}
            }
        })().finally(() => {
            this._violationsCoreLoadPromise = null;
        });
        return this._violationsCoreLoadPromise;
    },

    renderViolationsList() {
        try {
            const violations = this.getFilteredViolations();
            if (!violations || violations.length === 0) {
                const message = this.hasActiveFilters()
                    ? 'لا توجد مخالفات مطابقة لعوامل التصفية الحالية'
                    : 'لا توجد مخالفات مسجلة';
                return `<div class="empty-state"><p class="text-gray-500">${message}</p></div>`;
            }
            return `
                <div class="table-responsive" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
                    <table class="data-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);">
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">اسم الموظف/المقاول</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">نوع المخالفة</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">القيمة المالية</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الموقع</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">التاريخ</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.85rem;">تسلسل الشهر</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الشدة</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الحالة</th>
                                <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${violations.map((violation, index) => `
                                <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#fef2f2'}; transition: all 0.2s ease;" onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='${index % 2 === 0 ? '#ffffff' : '#fef2f2'}'">
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca; font-weight: 500;">
                                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                                            <i class="fas ${violation.employeeName ? 'fa-user-tie' : 'fa-hard-hat'}" style="color: ${violation.employeeName ? '#3b82f6' : '#f59e0b'};"></i>
                                            ${Utils.escapeHTML(violation.employeeName || violation.contractorName || '-')}
                                        </div>
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca;">
                                        ${Utils.escapeHTML(violation.violationType || '-')}
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca; font-weight: 600; color: #166534;">
                                        ${this.formatFineAmount(Number(violation.fineAmount || 0))}
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca; font-size: 0.85rem; color: #6b7280;">
                                        ${Utils.escapeHTML(violation.violationLocation || '-')}
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca;">
                                        ${violation.violationDate ? Utils.formatDate(violation.violationDate) : '-'}
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca; font-size: 0.85rem; color: #92400e;">
                                        ${violation.violationSequenceInMonth != null && violation.violationSequenceInMonth !== '' ? Utils.escapeHTML(String(violation.violationSequenceInMonth)) : '—'}
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca;">
                                        <span style="display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: ${violation.severity === 'عالية' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : violation.severity === 'متوسطة' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #3b82f6, #2563eb)'}; color: white; box-shadow: 0 2px 6px ${violation.severity === 'عالية' ? 'rgba(239,68,68,0.3)' : violation.severity === 'متوسطة' ? 'rgba(245,158,11,0.3)' : 'rgba(59,130,246,0.3)'};">
                                            ${violation.severity || '-'}
                                        </span>
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca;">
                                        <span style="display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: ${violation.status === 'محلول' ? 'linear-gradient(135deg, #10b981, #059669)' : violation.status === 'قيد المراجعة' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'linear-gradient(135deg, #f59e0b, #d97706)'}; color: white;">
                                            ${violation.status || '-'}
                                        </span>
                                    </td>
                                    <td style="padding: 14px 12px; text-align: center; border-bottom: 1px solid #fecaca;">
                                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                                            <button type="button" onclick='Violations.viewViolation(${this._escapeIdForHandler(violation.id)})' style="width: 36px; height: 36px; border-radius: 8px; border: none; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(59,130,246,0.3);" title="عرض التفاصيل">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button type="button" onclick='Violations.showViolationForm(${this._escapeIdForHandler(violation.id)})' style="width: 36px; height: 36px; border-radius: 8px; border: none; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(139,92,246,0.3);" title="تعديل">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button type="button" onclick='Violations.printViolationProfessional(${this._escapeIdForHandler(violation.id)})' style="width: 36px; height: 36px; border-radius: 8px; border: none; background: linear-gradient(135deg, #0f766e, #0d9488); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(15,118,110,0.3);" title="معاينة وطباعة النموذج (ISO)">
                                                <i class="fas fa-print"></i>
                                            </button>
                                            <button type="button" onclick='Violations.downloadViolationReport(${this._escapeIdForHandler(violation.id)}, this)' style="width: 36px; height: 36px; border-radius: 8px; border: none; background: linear-gradient(135deg, #10b981, #059669); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(16,185,129,0.3);" title="تحميل تقرير المخالفة PDF مباشرة" aria-label="تحميل تقرير المخالفة PDF">
                                                <i class="fas fa-file-download"></i>
                                            </button>
                                            <button type="button" onclick='Violations.deleteViolation(${this._escapeIdForHandler(violation.id)})' style="width: 36px; height: 36px; border-radius: 8px; border: none; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(239,68,68,0.3);" title="حذف">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('خطأ في renderViolationsList:', error);
            }
            return `<div class="empty-state"><p class="text-gray-500">حدث خطأ في عرض البيانات</p></div>`;
        }
    },

    /**
     * تحديث كروت إحصائيات "جميع المخالفات" بشكل فوري بدون إعادة تحميل
     * يستبدل DOM الكروت فقط، فيظهر التحديث مباشرة بعد أي إضافة/تعديل/حذف
     */
    updateAllViolationsStats() {
        try {
            const container = document.getElementById('violations-stats-cards');
            if (!container) return;
            // إنشاء عنصر مؤقت لاستخراج HTML الكروت الجديدة
            const wrapper = document.createElement('div');
            wrapper.innerHTML = this.renderAllViolationsStats();
            const newCards = wrapper.querySelector('#violations-stats-cards');
            if (newCards) {
                container.replaceWith(newCards);
            }
        } catch (e) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ فشل تحديث كروت المخالفات الفوري:', e);
            }
        }
    },

    renderAllViolationsStats() {
        const violations = this.getFilteredViolations();
        const total = violations.length;
        const employeeCount = violations.filter(v => v && (v.personType === 'employee' || (!!v.employeeName && !v.contractorName))).length;
        const contractorCount = violations.filter(v => v && (v.personType === 'contractor' || !!v.contractorName)).length;
        const totalFineAmount = violations.reduce((sum, violation) => {
            const amount = Number(violation?.fineAmount || 0);
            return sum + (Number.isFinite(amount) && amount > 0 ? amount : 0);
        }, 0);

        return `
            <div id="violations-stats-cards" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
                <div class="stat-card" style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 1px solid #fca5a5;">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="stat-label">إجمالي المخالفات</p>
                            <p class="text-2xl font-bold text-red-700">${total}</p>
                        </div>
                        <i class="fas fa-list text-red-600 text-xl"></i>
                    </div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 1px solid #86efac;">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="stat-label">إجمالي القيمة المالية</p>
                            <p class="text-2xl font-bold text-green-700">${this.formatFineAmount(totalFineAmount)}</p>
                        </div>
                        <i class="fas fa-money-bill-wave text-green-600 text-xl"></i>
                    </div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 1px solid #93c5fd;">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="stat-label">مخالفات الموظفين</p>
                            <p class="text-2xl font-bold text-blue-700">${employeeCount}</p>
                        </div>
                        <i class="fas fa-user-tie text-blue-600 text-xl"></i>
                    </div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%); border: 1px solid #fdba74;">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="stat-label">مخالفات المقاولين</p>
                            <p class="text-2xl font-bold text-orange-700">${contractorCount}</p>
                        </div>
                        <i class="fas fa-users-cog text-orange-600 text-xl"></i>
                    </div>
                </div>
            </div>
        `;
    },

    hasActiveFilters() {
        const filters = this.currentFilters || {};
        return !!(filters.search || filters.personType || filters.violationType || filters.severity || filters.status);
    },

    getViolationsPermissions(user = AppState.currentUser) {
        if (!user) return { viewDepartmentOnly: true, viewAll: false };
        if (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserEffectiveAdmin === 'function' && Permissions.isCurrentUserEffectiveAdmin(user)) {
            return { viewDepartmentOnly: false, viewAll: true };
        }
        const userPerms = user.permissions || {};
        const normalized = typeof Permissions !== 'undefined' && typeof Permissions.normalizePermissions === 'function'
            ? Permissions.normalizePermissions(userPerms)
            : userPerms;

        const detailed = (normalized && normalized.violationsPermissions) || {};
        const canViewAll = detailed['violations-view-all'] === true;

        return {
            viewDepartmentOnly: !canViewAll,
            viewAll: canViewAll
        };
    },

    isDepartmentMatch(dept1, dept2) {
        if (!dept1 || !dept2) return false;
        const clean = (d) => String(d).trim().toLowerCase()
            .replace(/^(إدارة|قسم)\s+/, '')
            .replace(/\s+/g, ' ');
        const d1 = clean(dept1);
        const d2 = clean(dept2);
        return d1 === d2 || d1.includes(d2) || d2.includes(d1);
    },

    isViolationVisibleToCurrentUser(violation) {
        if (!violation) return false;
        const norm = this.normalizeViolationRecord(violation);
        if (!norm) return false;

        // 1. المدراء ينالون الوصول الكامل تلقائياً
        if (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserEffectiveAdmin === 'function' && Permissions.isCurrentUserEffectiveAdmin()) {
            return true;
        }

        // 2. فحص ما إذا تم منح صلاحية رؤية جميع الإدارات صراحة
        const permScope = this.getViolationsPermissions();
        if (permScope.viewAll) {
            return true;
        }

        // 3. تقييد مخالفات الموظفين بإدارة المستخدم الحالي فقط
        const isEmployeeRecord = norm.personType === 'employee' || !!String(norm.employeeName || '').trim();
        if (isEmployeeRecord) {
            const currentUserDept = String(AppState.currentUser?.department || '').trim();
            let empDept = String(norm.employeeDepartment || '').trim();

            if (!empDept && (norm.employeeId || norm.employeeCode || norm.employeeName)) {
                const empList = AppState.appData?.employees || [];
                const empCodeOrId = String(norm.employeeId || norm.employeeCode || norm.employeeName).trim().toLowerCase();
                const matchedEmp = empList.find(e => {
                    if (!e) return false;
                    const code = String(e.id || e.employeeId || e.code || '').trim().toLowerCase();
                    const name = String(e.name || e.employeeName || '').trim().toLowerCase();
                    return (code && code === empCodeOrId) || (name && name === empCodeOrId);
                });
                if (matchedEmp) {
                    empDept = String(matchedEmp.department || matchedEmp.section || '').trim();
                }
            }

            if (!currentUserDept || !empDept) {
                return false;
            }

            return this.isDepartmentMatch(currentUserDept, empDept);
        }

        // مخالفات المقاولين تظل ملموسة لجميع المستحقين للمديول
        return true;
    },

    getFilteredViolations() {
        try {
            if (typeof AppState === 'undefined' || !AppState.appData) {
                return [];
            }
            const violations = (AppState.appData.violations || [])
                .map((item) => {
                    const n = this.normalizeViolationRecord(item);
                    if (!n) return null;
                    const eff = this.getEffectiveFineAmount(n);
                    return eff === n.fineAmount ? n : { ...n, fineAmount: eff };
                })
                .filter(Boolean)
                .filter(v => this.isViolationVisibleToCurrentUser(v));
            const filters = this.currentFilters || {};
            const searchFilter = String(filters.search || '').trim().toLowerCase();
            const personFilter = filters.personType || '';
            const typeFilter = (filters.violationType || '').toLowerCase();
            const severityFilter = filters.severity || '';
            const statusFilter = filters.status || '';

            let contractorMatchers = [];
            if (searchFilter && typeof Utils !== 'undefined' && typeof Utils.findApprovedContractorByTerm === 'function') {
                const approvedList = [
                    ...(AppState?.appData?.approvedContractors || []),
                    ...(AppState?.appData?.contractors || [])
                ].filter(Boolean);
                const searchRes = Utils.findApprovedContractorByTerm(searchFilter, approvedList);
                const matchedContractors = (searchRes.matches && searchRes.matches.length > 0)
                    ? searchRes.matches
                    : (searchRes.contractor ? [searchRes.contractor] : []);
                contractorMatchers = matchedContractors.map(c => Utils.buildContractorIdentityMatcher(c, searchFilter));
            }

            return violations.filter(violation => {
                if (!violation) return false;

                if (personFilter === 'employee' && !violation.employeeName && violation.personType !== 'employee') return false;
                if (personFilter === 'contractor' && !violation.contractorName && !violation.contractorCode && !violation.contractorId && violation.personType !== 'contractor') return false;

                if (typeFilter) {
                    const violationType = (violation.violationType || '').trim().toLowerCase();
                    if (violationType !== typeFilter) return false;
                }

                if (severityFilter && (violation.severity || '') !== severityFilter) return false;
                if (statusFilter && (violation.status || '') !== statusFilter) return false;
                if (searchFilter) {
                    let matchesSearch = false;
                    if (contractorMatchers.length > 0 && contractorMatchers.some(m => m.violationBelongsToContractor(violation))) {
                        matchesSearch = true;
                    }
                    if (!matchesSearch) {
                        const searchableText = Object.values(violation || {})
                            .map((value) => String(value == null ? '' : value).toLowerCase())
                            .join(' ');
                        matchesSearch = searchableText.includes(searchFilter);
                    }
                    if (!matchesSearch) return false;
                }

                return true;
            });
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('خطأ في getFilteredViolations:', error);
            }
            return [];
        }
    },

    renderFilters(defaultPersonType = null) {
        const filters = this.currentFilters || {};
        if (defaultPersonType !== null && defaultPersonType !== undefined) {
            filters.personType = defaultPersonType;
        }

        // التحقق من وجود ViolationTypesManager
        let types = [];
        if (typeof ViolationTypesManager !== 'undefined' && ViolationTypesManager.ensureInitialized && ViolationTypesManager.getAll) {
            try {
                ViolationTypesManager.ensureInitialized();
                types = ViolationTypesManager.getAll();
            } catch (vtError) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ خطأ في الحصول على أنواع المخالفات:', vtError);
                }
                types = [];
            }
        } else {
            // استخدام القيم الافتراضية
            types = (typeof AppState !== 'undefined' && AppState?.appData?.violationTypes) ? AppState.appData.violationTypes : [];
        }

        const typeOptions = types.map(type => `
            <option value="${Utils.escapeHTML(type.name)}" ${filters.violationType === type.name ? 'selected' : ''}>
                ${Utils.escapeHTML(type.name)}
            </option>
        `).join('');

        return `
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%); padding: 14px 16px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <div style="display:grid; grid-template-columns: minmax(170px, 0.9fr) repeat(4, minmax(140px, 1fr)) minmax(150px, 0.9fr); gap: 10px; align-items:end;">
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label for="violations-filter-search" style="font-size:12px; font-weight:700; color:#4a5568;">بحث</label>
                        <div class="relative">
                            <input type="text" id="violations-filter-search" class="form-input pr-10" style="width:100%; font-size:13px; border:1px solid #d1d5db; border-radius:8px;" placeholder="بحث..." value="${Utils.escapeHTML(filters.search || '')}">
                            <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none"></i>
                        </div>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label for="violations-filter-person" style="font-size:12px; font-weight:700; color:#4a5568;">نوع الشخص</label>
                        <select id="violations-filter-person" class="form-input" style="width:100%; font-size:13px; border:1px solid #d1d5db; border-radius:8px;">
                            <option value="" ${filters.personType === '' ? 'selected' : ''}>جميع الأشخاص</option>
                            <option value="employee" ${filters.personType === 'employee' ? 'selected' : ''}>الموظفون</option>
                            <option value="contractor" ${filters.personType === 'contractor' ? 'selected' : ''}>المقاولون</option>
                        </select>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label for="violations-filter-type" style="font-size:12px; font-weight:700; color:#4a5568;">نوع المخالفة</label>
                        <select id="violations-filter-type" class="form-input" style="width:100%; font-size:13px; border:1px solid #d1d5db; border-radius:8px;">
                            <option value="" ${filters.violationType === '' ? 'selected' : ''}>جميع الأنواع</option>
                            ${typeOptions}
                        </select>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label for="violations-filter-severity" style="font-size:12px; font-weight:700; color:#4a5568;">الشدة</label>
                        <select id="violations-filter-severity" class="form-input" style="width:100%; font-size:13px; border:1px solid #d1d5db; border-radius:8px;">
                            <option value="" ${filters.severity === '' ? 'selected' : ''}>جميع الدرجات</option>
                            <option value="عالية" ${filters.severity === 'عالية' ? 'selected' : ''}>عالية</option>
                            <option value="متوسطة" ${filters.severity === 'متوسطة' ? 'selected' : ''}>متوسطة</option>
                            <option value="منخضة" ${filters.severity === 'منخضة' ? 'selected' : ''}>منخضة</option>
                        </select>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label for="violations-filter-status" style="font-size:12px; font-weight:700; color:#4a5568;">الحالة</label>
                        <select id="violations-filter-status" class="form-input" style="width:100%; font-size:13px; border:1px solid #d1d5db; border-radius:8px;">
                            <option value="" ${filters.status === '' ? 'selected' : ''}>جميع الحالات</option>
                            <option value="قيد المراجعة" ${filters.status === 'قيد المراجعة' ? 'selected' : ''}>قيد المراجعة</option>
                            <option value="محلول" ${filters.status === 'محلول' ? 'selected' : ''}>محلول</option>
                            <option value="غير محلول" ${filters.status === 'غير محلول' ? 'selected' : ''}>غير محلول</option>
                        </select>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label style="font-size:12px; font-weight:700; color:#4a5568;">&nbsp;</label>
                        <button type="button" id="violations-filter-reset" style="width:100%; height:42px; border:none; border-radius:8px; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:#fff; font-size:13px; font-weight:700; cursor:pointer;">
                            <i class="fas fa-undo ml-2"></i>إعادة التعيين
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    bindFilters() {
        const searchInput = document.getElementById('violations-filter-search');
        const personSelect = document.getElementById('violations-filter-person');
        const typeSelect = document.getElementById('violations-filter-type');
        const severitySelect = document.getElementById('violations-filter-severity');
        const statusSelect = document.getElementById('violations-filter-status');
        const resetBtn = document.getElementById('violations-filter-reset');

        if (searchInput) {
            searchInput.value = this.currentFilters.search || '';
            searchInput.oninput = () => {
                this.currentFilters.search = searchInput.value || '';
                // لا نعيد رسم الفلاتر أثناء الكتابة حتى لا يفقد الحقل التركيز.
                this.refreshViolationsView({ skipFilterRerender: true });
            };
        }

        if (personSelect) {
            personSelect.value = this.currentFilters.personType || '';
            personSelect.onchange = () => {
                this.currentFilters.personType = personSelect.value;
                this.refreshViolationsView();
            };
        }

        if (typeSelect) {
            typeSelect.value = this.currentFilters.violationType || '';
            typeSelect.onchange = () => {
                this.currentFilters.violationType = typeSelect.value;
                this.refreshViolationsView();
            };
        }

        if (severitySelect) {
            severitySelect.value = this.currentFilters.severity || '';
            severitySelect.onchange = () => {
                this.currentFilters.severity = severitySelect.value;
                this.refreshViolationsView();
            };
        }

        if (statusSelect) {
            statusSelect.value = this.currentFilters.status || '';
            statusSelect.onchange = () => {
                this.currentFilters.status = statusSelect.value;
                this.refreshViolationsView();
            };
        }

        if (resetBtn) {
            resetBtn.onclick = () => {
                this.currentFilters = {
                    search: '',
                    personType: '',
                    violationType: '',
                    severity: '',
                    status: ''
                };
                this.refreshViolationsView();
            };
        }
    },

    refreshViolationsView(options = {}) {
        const skipFilterRerender = !!options.skipFilterRerender;
        const listContainer = document.getElementById('violations-list');
        if (listContainer) {
            // Check which tab is active
            const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'all';
            switch (activeTab) {
                case 'employees':
                    listContainer.innerHTML = this.renderEmployeeViolationsList();
                    break;
                case 'contractors':
                    listContainer.innerHTML = this.renderContractorViolationsList();
                    break;
                case 'analytics':
                    // Analytics tab doesn't need refresh
                    return;
                default:
                    listContainer.innerHTML = this.renderViolationsList();
            }
        }
        const statsContainer = document.getElementById('violations-stats-cards');
        if (statsContainer) {
            statsContainer.outerHTML = this.renderAllViolationsStats();
        }
        const filtersContainer = document.getElementById('violations-filters-container');
        if (filtersContainer && !skipFilterRerender) {
            const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'all';
            const defaultPersonType = activeTab === 'employees' ? 'employee' : activeTab === 'contractors' ? 'contractor' : '';
            filtersContainer.innerHTML = this.renderFilters(defaultPersonType);
        }
        if (!skipFilterRerender) {
            this.bindFilters();
        }
    },

    setupEventListeners() {
        setTimeout(() => {
            const addBtn = document.getElementById('add-violation-btn');
            if (addBtn) addBtn.addEventListener('click', () => this.showViolationForm());
            this.bindFilters();
        }, 100);
    },

    async switchTab(tabName) {
        // Update tab buttons
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
            // التأكد من الحفاظ على styles لمنع التكسير
            if (!btn.style.flexShrink) {
                btn.style.setProperty('flex-shrink', '0', 'important');
                btn.style.setProperty('min-width', 'fit-content', 'important');
                btn.style.setProperty('white-space', 'nowrap', 'important');
                btn.style.setProperty('width', 'auto', 'important');
                btn.style.setProperty('max-width', 'none', 'important');
            }
        });
        
        // التأكد من الحفاظ على styles للـ container
        const tabContainer = document.querySelector('.tabs-nav');
        if (tabContainer && !tabContainer.style.flexWrap) {
            tabContainer.style.setProperty('flex-wrap', 'nowrap', 'important');
            tabContainer.style.setProperty('overflow-x', 'auto', 'important');
            tabContainer.style.setProperty('overflow-y', 'visible', 'important');
        }

        // Update content
        const contentContainer = document.getElementById('violations-tab-content');
        if (!contentContainer) return;

        switch (tabName) {
            case 'all':
                this.currentFilters.personType = '';
                contentContainer.innerHTML = `
                    <div class="content-card" id="violations-list-tab">
                        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-list ml-2"></i>قائمة المخالفات</h2>
                            <div style="display: flex; gap: 8px;">
                                <button type="button" class="btn-primary" onclick="Violations.exportCurrentFilteredViolationsToExcel()" style="background: linear-gradient(135deg, #059669, #047857); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(5,150,105,0.25);" title="تصدير السجل الحالي إلى Excel منسق مع ملخص المقاولين وتحليل RCA">
                                    <i class="fas fa-file-excel ml-1"></i>تصدير Excel (مع ملخص المقاولين و RCA)
                                </button>
                                <button type="button" class="btn-primary" onclick="Violations.showAllViolationsReportDialog()" style="background: linear-gradient(135deg, #1e3a8a, #0f172a); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(30,58,138,0.25);">
                                    <i class="fas fa-file-pdf ml-1"></i>تصدير السجل العام (ISO PDF)
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            ${this.renderAllViolationsStats()}
                            <div id="violations-filters-container" class="mb-4">
                                ${this.renderFilters('')}
                            </div>
                            <div id="violations-list" class="violations-list-scroll">
                                ${this.renderViolationsList()}
                            </div>
                        </div>
                    </div>
                `;
                this.bindFilters();
                break;
            case 'employees':
                this.currentFilters.personType = 'employee';
                contentContainer.innerHTML = `
                    <div class="content-card">
                        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-user-tie ml-2"></i>مخالفات الموظفين</h2>
                            <div style="display: flex; gap: 8px;">
                                <button type="button" class="btn-primary" onclick="Violations.exportCurrentFilteredViolationsToExcel()" style="background: linear-gradient(135deg, #059669, #047857); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(5,150,105,0.25);" title="تصدير سجل مخالفات الموظفين المفلتر إلى Excel">
                                    <i class="fas fa-file-excel ml-1"></i>تصدير Excel
                                </button>
                                <button type="button" class="btn-primary" onclick="Violations.showAllViolationsReportDialog('employee')" style="background: linear-gradient(135deg, #1e3a8a, #0f172a); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(30,58,138,0.25);">
                                    <i class="fas fa-file-pdf ml-1"></i>تصدير سجل الموظفين (ISO PDF)
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="violations-filters-container" class="mb-4">
                                ${this.renderFilters('employee')}
                            </div>
                            <div id="violations-list">
                                ${this.renderEmployeeViolationsList()}
                            </div>
                        </div>
                    </div>
                `;
                this.bindFilters();
                break;
            case 'contractors':
                this.currentFilters.personType = 'contractor';
                contentContainer.innerHTML = `
                    <div class="content-card">
                        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <h2 class="card-title" style="margin: 0;"><i class="fas fa-users-cog ml-2"></i>مخالفات المقاولين</h2>
                            <div style="display: flex; gap: 8px;">
                                <button type="button" class="btn-primary" onclick="Violations.exportCurrentFilteredViolationsToExcel()" style="background: linear-gradient(135deg, #059669, #047857); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(5,150,105,0.25);" title="تصدير سجل مخالفات المقاولين مع ملخص التقييم والخطورة إلى Excel">
                                    <i class="fas fa-file-excel ml-1"></i>تصدير Excel (مع ملخص المقاولين و RCA)
                                </button>
                                <button type="button" class="btn-primary" onclick="Violations.showContractorViolationsReportDialog()">
                                    <i class="fas fa-file-export ml-1"></i>تصدير تقرير مخالفة المقاولين
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="violations-filters-container" class="mb-4">
                                ${this.renderFilters('contractor')}
                            </div>
                            <div id="violations-list">
                                ${this.renderContractorViolationsList()}
                            </div>
                        </div>
                    </div>
                `;
                this.bindFilters();
                break;
            case 'analytics':
                contentContainer.innerHTML = this.renderAnalyticsTab();
                // تشغيل التحليل وربط الأحداث بعد رسم الـ DOM
                setTimeout(() => {
                    this.updateViolationAnalytics();
                    this._vBindAnalyticsEvents();
                }, 80);
                break;
            case 'blacklist':
                // عرض الواجهة مباشرة مع البيانات المحلية (إن وجدت)
                contentContainer.innerHTML = this.renderBlacklistTab();
                this.setupBlacklistEventListeners();
                // تحميل البيانات من قاعدة SQL في الخلفية وتحديث الواجهة
                this.loadBlacklistDataAsync().then(() => {
                    // تحديث الواجهة بعد تحميل البيانات
                    this.refreshBlacklistDisplay();
                }).catch(error => {
                    Utils.safeWarn('⚠️ خطأ في تحميل بيانات Blacklist:', error);
                });
                break;
        }
    },

    /**
     * Wrapper function للتعامل مع async في onclick
     */
    async switchTabAsync(tabName) {
        try {
            await this.switchTab(tabName);
        } catch (error) {
            Utils.safeError('خطأ في التبديل إلى التبويب:', error);
        }
    },

    /**
     * تحديث المديول (إعادة تحميل البيانات مع الحفاظ على التبويب الحالي)
     */
    refreshModule() {
        const btn = document.getElementById('violations-btn-refresh');
        if (btn) {
            btn.disabled = true;
            const icon = btn.querySelector('i.fa-sync-alt');
            if (icon) icon.classList.add('fa-spin');
        }
        const loadPromise = typeof this.load === 'function' ? this.load() : Promise.resolve();
        Promise.resolve(loadPromise).finally(() => {
            const refBtn = document.getElementById('violations-btn-refresh');
            if (refBtn) {
                refBtn.disabled = false;
                const refIcon = refBtn.querySelector('i.fa-sync-alt');
                if (refIcon) refIcon.classList.remove('fa-spin');
            }
        });
    },

    renderEmployeeViolationsList() {
        const violations = this.getFilteredViolations().filter(v =>
            v.employeeName || v.personType === 'employee' || (!v.contractorName && v.employeeName)
        );
        if (violations.length === 0) {
            return `<div class="empty-state"><p class="text-gray-500">لا توجد مخالفات للموظفين</p></div>`;
        }
        return `
            <div class="table-responsive" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);">
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">اسم الموظف</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الكود الوظيفي</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">نوع المخالفة</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">التاريخ</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الشدة</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الإجراء المتخذ</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الحالة</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${violations.map(violation => `
                        <tr>
                            <td>${Utils.escapeHTML(violation.employeeName || '')}</td>
                            <td>${Utils.escapeHTML(violation.employeeCode || violation.employeeNumber || '-')}</td>
                            <td>${Utils.escapeHTML(violation.violationType || '')}</td>
                            <td>${violation.violationDate ? Utils.formatDate(violation.violationDate) : '-'}</td>
                            <td>
                                <span class="badge badge-${violation.severity === 'عالية' ? 'danger' : violation.severity === 'متوسطة' ? 'warning' : 'info'}">
                                    ${violation.severity || '-'}
                                </span>
                            </td>
                            <td>${Utils.escapeHTML(violation.actionTaken || '')}</td>
                            <td>
                                <span class="badge badge-${violation.status === 'محلول' ? 'success' : 'warning'}">
                                    ${violation.status || '-'}
                                </span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button type="button" onclick='Violations.viewViolation(${this._escapeIdForHandler(violation.id)})' class="btn-icon btn-icon-primary" title="عرض">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" onclick='Violations.showViolationForm(${this._escapeIdForHandler(violation.id)})' class="btn-icon btn-icon-warning" title="تعديل">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" onclick='Violations.deleteViolation(${this._escapeIdForHandler(violation.id)})' class="btn-icon btn-icon-danger" title="حذف">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
        `;
    },

    renderContractorViolationsList() {
        const violations = this.getFilteredViolations().filter(v =>
            v.contractorName || v.contractorCode || v.contractorId || v.personType === 'contractor'
        );
        if (violations.length === 0) {
            return `<div class="empty-state"><p class="text-gray-500">لا توجد مخالفات للمقاولين</p></div>`;
        }
        return `
            <div class="table-responsive" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);">
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">اسم المقاول</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">نوع المخالفة</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">التاريخ</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الشدة</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الإجراء المتخذ</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الحالة</th>
                        <th style="color: white; font-weight: 600; padding: 16px 12px; text-align: center; font-size: 0.9rem;">الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${violations.map(violation => `
                        <tr>
                            <td>${Utils.escapeHTML(violation.contractorName || '')}</td>
                            <td>${Utils.escapeHTML(violation.violationType || '')}</td>
                            <td>${violation.violationDate ? Utils.formatDate(violation.violationDate) : '-'}</td>
                            <td>
                                <span class="badge badge-${violation.severity === 'عالية' ? 'danger' : violation.severity === 'متوسطة' ? 'warning' : 'info'}">
                                    ${violation.severity || '-'}
                                </span>
                            </td>
                            <td>${Utils.escapeHTML(violation.actionTaken || '')}</td>
                            <td>
                                <span class="badge badge-${violation.status === 'محلول' ? 'success' : 'warning'}">
                                    ${violation.status || '-'}
                                </span>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button type="button" onclick='Violations.viewViolation(${this._escapeIdForHandler(violation.id)})' class="btn-icon btn-icon-primary" title="عرض">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" onclick='Violations.showViolationForm(${this._escapeIdForHandler(violation.id)})' class="btn-icon btn-icon-warning" title="تعديل">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" onclick='Violations.downloadViolationReport(${this._escapeIdForHandler(violation.id)}, this)' class="btn-icon violation-report-download-btn" title="تحميل تقرير المخالفة PDF مباشرة" aria-label="تحميل تقرير مخالفة المقاول PDF" style="background:linear-gradient(135deg,#059669,#047857);color:#fff;border:1px solid rgba(4,120,87,.25);box-shadow:0 4px 10px rgba(5,150,105,.24);">
                                        <i class="fas fa-file-download"></i>
                                    </button>
                                    <button type="button" onclick='Violations.deleteViolation(${this._escapeIdForHandler(violation.id)})' class="btn-icon btn-icon-danger" title="حذف">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
        `;
    },

    getContractorViolationsExportOptions() {
        const optionsMap = new Map();
        const addEntry = (id, name, code = '') => {
            const cleanName = String(name || '').replace(/\s+/g, ' ').trim();
            if (!cleanName) return;
            const nameKey = this._normalizeContractorExportName(cleanName);
            if (!nameKey || optionsMap.has(nameKey)) return;
            optionsMap.set(nameKey, {
                id: String(id || code || cleanName).trim(),
                name: cleanName,
                code: String(code || '').trim()
            });
        };

        if (typeof Contractors !== 'undefined' && typeof Contractors.getContractorOptionsForModules === 'function') {
            Contractors.getContractorOptionsForModules({ includeSuppliers: true, approvedOnly: false })
                .forEach((c) => addEntry(c.id, c.name, c.code));
        } else {
            (AppState.appData?.contractors || []).forEach((c) => {
                addEntry(c.id || c.contractorId, c.name || c.companyName, c.code || c.contractorCode || c.isoCode);
            });
            (AppState.appData?.approvedContractors || []).forEach((c) => {
                addEntry(c.id || c.contractorId, c.companyName || c.name, c.code || c.contractorCode);
            });
        }

        (AppState.appData?.violations || []).forEach((v) => {
            if (!v?.contractorName) return;
            addEntry(v.contractorId, v.contractorName, v.contractorCode || v.code || v.isoCode);
        });

        return Array.from(optionsMap.values())
            .sort((a, b) => a.name.localeCompare(b.name, 'ar', { sensitivity: 'base' }));
    },

    _normalizeContractorExportName(name) {
        const raw = String(name || '').replace(/\s+/g, ' ').trim();
        if (!raw) return '';
        const dashIdx = raw.indexOf(' - ');
        const baseName = dashIdx > 0 ? raw.slice(0, dashIdx).trim() : raw;
        return this._normKeyStr(baseName);
    },

    _buildContractorExportMatcher(contractorId = '', contractorName = '', contractorCode = '') {
        const id = String(contractorId || '').trim();
        const name = String(contractorName || '').trim();
        const code = String(contractorCode || '').trim();
        if (!id && !name && !code) return null;

        let contractorRecord = null;
        if (typeof Contractors !== 'undefined' && typeof Contractors.resolveContractorForAnalytics === 'function') {
            contractorRecord = Contractors.resolveContractorForAnalytics(id || code, name);
        }

        const lookupKey = id || code || name;
        const baseRecord = contractorRecord || {
            id,
            name,
            companyName: name,
            code,
            contractorCode: code
        };

        if (typeof Utils !== 'undefined' && typeof Utils.buildContractorIdentityMatcher === 'function') {
            return Utils.buildContractorIdentityMatcher(baseRecord, lookupKey);
        }
        if (typeof Contractors !== 'undefined' && typeof Contractors.buildContractorAnalyticsMatchers === 'function') {
            return Contractors.buildContractorAnalyticsMatchers(baseRecord, lookupKey);
        }

        const targetName = this._normalizeContractorExportName(name || id);
        const targetIds = new Set([id, code].filter(Boolean).map((v) => String(v).trim().toLowerCase()));
        return {
            violationBelongsToContractor: (record) => {
                if (!record) return false;
                const isContractorViolation = record.personType === 'contractor'
                    || !!String(record.contractorName || '').trim();
                if (!isContractorViolation) return false;

                const recordName = this._normalizeContractorExportName(record.contractorName);
                const recordId = String(record.contractorId || record.contractorCode || record.code || '').trim().toLowerCase();
                const idMatches = recordId && targetIds.has(recordId);

                if (idMatches) {
                    return true;
                }
                return !!targetName && recordName === targetName;
            }
        };
    },

    showContractorViolationsReportDialog() {
        const contractors = this.getContractorViolationsExportOptions();
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const months = [];
        for (let i = 0; i < 24; i++) {
            const date = new Date(currentYear, currentDate.getMonth() - i, 1);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const monthKey = `${year}-${String(month).padStart(2, '0')}`;
            const monthLabel = date.toLocaleDateString('ar-SA-u-nu-latn', { year: 'numeric', month: 'long' });
            months.push({ value: monthKey, label: monthLabel });
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-file-export ml-2"></i>
                        تصدير تقرير مخالفات المقاولين
                    </h2>
                    <button class="modal-close" title="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-building ml-2"></i>
                            اختر المقاول
                        </label>
                        <select id="contractor-violations-report-select" class="form-input">
                            <option value="">جميع المقاولين</option>
                            ${contractors.map(contractor => `
                                <option value="${Utils.escapeHTML(String(contractor.id ?? '').trim())}" data-contractor-name="${Utils.escapeHTML(contractor.name || '')}" data-contractor-code="${Utils.escapeHTML(contractor.code || '')}">
                                    ${Utils.escapeHTML(contractor.name || 'بدون اسم')}
                                </option>
                            `).join('')}
                        </select>
                        <p class="text-xs text-gray-500 mt-2">
                            <i class="fas fa-info-circle ml-1"></i>
                            اختر مقاولاً محدداً لعرض تقريره فقط، أو اتركه فارغاً لعرض جميع المقاولين
                        </p>
                    </div>

                    <div style="border-top: 1px solid #E5E7EB; padding-top: 16px; margin-top: 16px;">
                        <label class="block text-sm font-semibold text-gray-700 mb-3">
                            <i class="fas fa-calendar-alt ml-2"></i>
                            فترة التصدير
                        </label>
                        <div class="space-y-3">
                            <div class="flex items-center">
                                <input type="radio" id="contractor-violations-range-all" name="contractor-violations-range-type" value="all" class="ml-2" checked>
                                <label for="contractor-violations-range-all" class="text-sm text-gray-700 cursor-pointer">جميع السجلات</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" id="contractor-violations-range-month" name="contractor-violations-range-type" value="month" class="ml-2">
                                <label for="contractor-violations-range-month" class="text-sm text-gray-700 cursor-pointer mr-2">شهر محدد</label>
                                <select id="contractor-violations-report-month" class="form-input flex-1" disabled style="max-width: 300px;">
                                    <option value="">اختر الشهر</option>
                                    ${months.map(month => `<option value="${month.value}">${month.label}</option>`).join('')}
                                </select>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" id="contractor-violations-range-custom" name="contractor-violations-range-type" value="custom" class="ml-2">
                                <label for="contractor-violations-range-custom" class="text-sm text-gray-700 cursor-pointer mr-2">فترة محددة</label>
                                <div class="flex items-center gap-2 flex-1" style="max-width: 400px;">
                                    <input type="date" id="contractor-violations-report-from-date" class="form-input flex-1" disabled>
                                    <span class="text-sm text-gray-600">إلى</span>
                                    <input type="date" id="contractor-violations-report-to-date" class="form-input flex-1" disabled>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="border-top: 1px solid #E5E7EB; padding-top: 16px; margin-top: 16px;">
                        <label class="block text-sm font-semibold text-gray-700 mb-3">
                            <i class="fas fa-file ml-2"></i>
                            صيغة التصدير
                        </label>
                        <div class="flex flex-wrap items-center gap-4">
                            <div class="flex items-center">
                                <input type="radio" id="contractor-violations-format-pdf" name="contractor-violations-export-format" value="pdf" class="ml-2" checked>
                                <label for="contractor-violations-format-pdf" class="text-sm text-gray-700 cursor-pointer">
                                    <i class="fas fa-file-pdf text-red-600 ml-1"></i>PDF
                                </label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" id="contractor-violations-format-excel" name="contractor-violations-export-format" value="excel" class="ml-2">
                                <label for="contractor-violations-format-excel" class="text-sm text-gray-700 cursor-pointer">
                                    <i class="fas fa-file-excel text-green-600 ml-1"></i>Excel (.xlsx)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-action="close">إلغاء</button>
                    <button type="button" class="btn-primary" id="generate-contractor-violations-report-btn">
                        <i class="fas fa-file-export ml-2"></i>
                        إنشاء التقرير
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const close = () => modal.remove();
        modal.querySelector('.modal-close')?.addEventListener('click', close);
        modal.querySelector('[data-action="close"]')?.addEventListener('click', close);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) close();
        });

        const rangeInputs = modal.querySelectorAll('input[name="contractor-violations-range-type"]');
        const monthSelect = modal.querySelector('#contractor-violations-report-month');
        const fromDateInput = modal.querySelector('#contractor-violations-report-from-date');
        const toDateInput = modal.querySelector('#contractor-violations-report-to-date');

        const updateDateFields = () => {
            const selectedType = modal.querySelector('input[name="contractor-violations-range-type"]:checked')?.value || 'all';
            monthSelect.disabled = selectedType !== 'month';
            monthSelect.required = selectedType === 'month';
            fromDateInput.disabled = selectedType !== 'custom';
            fromDateInput.required = selectedType === 'custom';
            toDateInput.disabled = selectedType !== 'custom';
            toDateInput.required = selectedType === 'custom';
        };
        rangeInputs.forEach(input => input.addEventListener('change', updateDateFields));

        modal.querySelector('#generate-contractor-violations-report-btn')?.addEventListener('click', async () => {
            const contractorSelect = modal.querySelector('#contractor-violations-report-select');
            const selectedOption = contractorSelect && contractorSelect.selectedIndex >= 0
                ? contractorSelect.options[contractorSelect.selectedIndex]
                : null;
            const isAllContractors = contractorSelect?.selectedIndex === 0;
            const selectedContractorId = !isAllContractors && selectedOption?.value
                ? String(selectedOption.value).trim()
                : '';
            const selectedContractorName = !isAllContractors && selectedOption?.dataset?.contractorName
                ? String(selectedOption.dataset.contractorName).trim()
                : '';
            const selectedContractorCode = !isAllContractors && selectedOption?.dataset?.contractorCode
                ? String(selectedOption.dataset.contractorCode).trim()
                : '';
            const dateRangeType = modal.querySelector('input[name="contractor-violations-range-type"]:checked')?.value || 'all';
            const month = modal.querySelector('#contractor-violations-report-month')?.value || '';
            const fromDate = modal.querySelector('#contractor-violations-report-from-date')?.value || '';
            const toDate = modal.querySelector('#contractor-violations-report-to-date')?.value || '';
            const exportFormat = modal.querySelector('input[name="contractor-violations-export-format"]:checked')?.value || 'pdf';

            if (dateRangeType === 'month' && !month) {
                Notification.warning('يرجى اختيار الشهر المطلوب');
                return;
            }
            if (dateRangeType === 'custom') {
                if (!fromDate || !toDate) {
                    Notification.warning('يرجى اختيار تاريخ البداية والنهاية للفترة');
                    return;
                }
                if (new Date(fromDate) > new Date(toDate)) {
                    Notification.warning('تاريخ البداية يجب أن يكون قبل تاريخ النهاية');
                    return;
                }
            }

            close();
            await this.generateContractorViolationsReport(selectedContractorId, {
                dateRangeType,
                month,
                fromDate,
                toDate,
                exportFormat
            }, selectedContractorName, selectedContractorCode);
        });
    },

    _collectContractorViolationsForExport_(contractorId = '', dateFilter = {}, selectedContractorName = '', selectedContractorCode = '') {
        const contractorMatcher = this._buildContractorExportMatcher(
            contractorId,
            selectedContractorName,
            selectedContractorCode
        );
        let violations = (AppState.appData.violations || [])
            .map((item) => this.normalizeViolationRecord(item))
            .filter(Boolean)
            .filter(v => v?.personType === 'contractor' || !!String(v?.contractorName || '').trim());

        if (contractorMatcher) {
            violations = violations.filter(v => contractorMatcher.violationBelongsToContractor(v));
        }

        const { dateRangeType = 'all', month = '', fromDate = '', toDate = '' } = dateFilter || {};
        if (dateRangeType === 'month' && month) {
            const [year, monthNum] = month.split('-');
            violations = violations.filter(v => {
                if (!v.violationDate) return false;
                const d = new Date(v.violationDate);
                return d.getFullYear() === parseInt(year, 10) && (d.getMonth() + 1) === parseInt(monthNum, 10);
            });
        } else if (dateRangeType === 'custom' && fromDate && toDate) {
            const start = new Date(fromDate); start.setHours(0, 0, 0, 0);
            const end = new Date(toDate); end.setHours(23, 59, 59, 999);
            violations = violations.filter(v => {
                if (!v.violationDate) return false;
                const d = new Date(v.violationDate);
                return d >= start && d <= end;
            });
        }

        let periodInfo = '';
        if (dateRangeType === 'month' && month) {
            const [y, m] = month.split('-');
            const d = new Date(parseInt(y, 10), parseInt(m, 10) - 1, 1);
            periodInfo = d.toLocaleDateString('ar-SA-u-nu-latn', { year: 'numeric', month: 'long' });
        } else if (dateRangeType === 'custom' && fromDate && toDate) {
            periodInfo = `من ${Utils.formatDate(fromDate)} إلى ${Utils.formatDate(toDate)}`;
        }

        return { violations, periodInfo, dateRangeType };
    },

    exportContractorViolationsToExcel_(violations, selectedContractorName = '', periodInfo = '') {
        if (typeof XLSX === 'undefined') {
            Notification.error('مكتبة Excel غير محمّلة. حدّث الصفحة وحاول مرة أخرى.');
            return false;
        }

        const excelData = violations.map((v, index) => ({
            '#': index + 1,
            'اسم المقاول': v.contractorName || '',
            'كود المقاول': v.contractorCode || '',
            'عامل المقاول': v.contractorWorker || '',
            'نوع المخالفة': v.violationType || '',
            'التاريخ': v.violationDate ? Utils.formatDate(v.violationDate) : '',
            'الشدة': v.severity || '',
            'الإجراء المتخذ': v.actionTaken || '',
            'الحالة': v.status || '',
            'القيمة المالية': Number(this.getEffectiveFineAmount(v)) || 0,
            'الموقع': v.location || v.site || '',
            'الوصف': v.description || v.notes || '',
            'الفترة': periodInfo || ''
        }));

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        worksheet['!cols'] = [
            { wch: 6 },
            { wch: 28 },
            { wch: 14 },
            { wch: 18 },
            { wch: 22 },
            { wch: 14 },
            { wch: 12 },
            { wch: 24 },
            { wch: 12 },
            { wch: 14 },
            { wch: 18 },
            { wch: 36 },
            { wch: 22 }
        ];
        XLSX.utils.book_append_sheet(workbook, worksheet, 'مخالفات المقاولين');

        const reportTitle = selectedContractorName
            ? `تقرير_مخالفات_المقاول_${selectedContractorName}`
            : 'تقرير_مخالفات_المقاولين';
        const safeName = String(reportTitle).replace(/[\\/:*?"<>|]/g, '_').slice(0, 80);
        const fileName = `${safeName}_${new Date().toISOString().slice(0, 10)}.xlsx`;
        XLSX.writeFile(workbook, fileName);
        return true;
    },

    async generateContractorViolationsReport(contractorId = '', dateFilter = {}, selectedContractorName = '', selectedContractorCode = '') {
        const exportFormat = String(dateFilter?.exportFormat || 'pdf').toLowerCase() === 'excel' ? 'excel' : 'pdf';
        const { violations, periodInfo } = this._collectContractorViolationsForExport_(
            contractorId,
            dateFilter,
            selectedContractorName,
            selectedContractorCode
        );

        if (!violations.length) {
            Notification.warning('لا توجد بيانات لمخالفات المقاولين وفق المحددات المختارة');
            return;
        }

        if (exportFormat === 'excel') {
            try {
                Loading.show('جاري إنشاء ملف Excel لمخالفات المقاولين...');
                const ok = this.exportContractorViolationsToExcel_(violations, selectedContractorName, periodInfo);
                Loading.hide();
                if (ok) {
                    Notification.success('تم تحميل تقرير مخالفات المقاولين بصيغة Excel بنجاح');
                }
            } catch (error) {
                Loading.hide();
                Utils.safeError('خطأ في تصدير Excel لمخالفات المقاولين:', error);
                Notification.error('تعذر تصدير Excel: ' + (error.message || 'خطأ غير معروف'));
            }
            return;
        }

        try {
            Loading.show('جاري إنشاء تقرير مخالفات المقاولين (ISO 45001)...');

            const highCount = violations.filter(v => String(v.severity || '').trim() === 'عالية').length;
            const mediumCount = violations.filter(v => String(v.severity || '').trim() === 'متوسطة').length;
            const lowCount = violations.filter(v => String(v.severity || '').trim() === 'منخفضة').length;
            const resolvedCount = violations.filter(v => String(v.status || '').trim() === 'محلول').length;
            const unresolvedCount = Math.max(0, violations.length - resolvedCount);
            const resolutionRate = violations.length > 0 ? Math.round((resolvedCount / violations.length) * 100) : 0;
            const uniqueContractors = new Set(violations.map(v => String(v.contractorName || '').trim()).filter(Boolean)).size;
            const totalFineAmount = violations.reduce((sum, v) => sum + (Number(this.getEffectiveFineAmount(v)) || 0), 0);

            const reportTitle = selectedContractorName
                ? `تقرير مخالفات المقاول: ${selectedContractorName}`
                : 'تقرير سجل مخالفات مقاولي الشركة';

            // تقسيم الصفحات بنظام .report-page landscape
            const pagesData = this._paginateViolationsList(violations, 8, 11);
            const totalPages = pagesData.length;

            const pagesHtml = pagesData.map((pageRecords, pageIdx) => {
                const pageNum = pageIdx + 1;
                const isFirstPage = pageNum === 1;
                const isLastPage = pageNum === totalPages;

                const rowsHtml = pageRecords.map((v, rIdx) => {
                    const globalIdx = (pageIdx === 0 ? 0 : 8 + (pageIdx - 1) * 11) + rIdx + 1;
                    const fineVal = Number(this.getEffectiveFineAmount(v)) || 0;

                    return `
                        <tr>
                            <td style="font-weight: 700;">${globalIdx}</td>
                            <td style="font-weight: 800; text-align: right;">${Utils.escapeHTML(v.contractorName || '-')}</td>
                            <td style="text-align: right; font-weight: 700;">${Utils.escapeHTML(v.violationType || '-')}</td>
                            <td>${v.violationDate ? Utils.formatDate(v.violationDate) : '-'}</td>
                            <td>
                                <span style="font-weight: 800; color: ${v.severity === 'عالية' ? '#b91c1c' : v.severity === 'متوسطة' ? '#d97706' : '#2563eb'};">
                                    ${Utils.escapeHTML(v.severity || '-')}
                                </span>
                            </td>
                            <td style="font-weight: 800; color: #166534;">${this.formatFineAmount(fineVal)}</td>
                            <td style="text-align: right; font-size: 9.5px; line-height: 1.35; white-space: normal; word-break: break-word;">${Utils.escapeHTML(v.actionTaken || '-')}</td>
                            <td>
                                <span style="font-weight: 800; color: ${v.status === 'محلول' ? '#047857' : '#b91c1c'};">
                                    ${Utils.escapeHTML(v.status || '-')}
                                </span>
                            </td>
                        </tr>
                    `;
                }).join('');

                return `
                    <div class="report-page landscape">
                        ${this.getIsoPrintHeaderHtml(
                            reportTitle,
                            isFirstPage ? 'سجل رسمي موثق لمخالفات المقاولين ومعدلات الامتثال والسلامة الميدانية' : `تابع جدول ${reportTitle} — استكمال البيانات`,
                            'DOC-HSE-VIO-CON-01',
                            'Rev. 03',
                            'سري وداخلي'
                        )}

                        ${isFirstPage ? `
                            ${periodInfo ? `
                                <div style="display: flex; justify-content: space-between; align-items: center; background: #fff7ed; border-right: 4px solid #ea580c; border-radius: 6px; padding: 6px 12px; margin-bottom: 10px; font-size: 11px;">
                                    <div><strong style="color: #9a3412;">الفترة الزمنية المحددة:</strong> <span style="color: #0f172a; font-weight: 700;">${Utils.escapeHTML(periodInfo)}</span></div>
                                    <div><strong style="color: #9a3412;">تاريخ الاستخراج:</strong> ${Utils.formatDate(new Date())}</div>
                                </div>
                            ` : ''}

                            <div class="summary-cards-row">
                                <div class="kpi-stat-card accent-red">
                                    <div class="kpi-card-label">إجمالي المخالفات</div>
                                    <div class="kpi-card-value" style="color: #991b1b;">${violations.length}</div>
                                </div>
                                <div class="kpi-stat-card accent-blue">
                                    <div class="kpi-card-label">عدد المقاولين</div>
                                    <div class="kpi-card-value" style="color: #1e3a8a;">${uniqueContractors}</div>
                                </div>
                                <div class="kpi-stat-card accent-green">
                                    <div class="kpi-card-label">القيمة المالية للمخالفات</div>
                                    <div class="kpi-card-value" style="color: #166534; font-size: 16px;">${this.formatFineAmount(Number(totalFineAmount))}</div>
                                </div>
                                <div class="kpi-stat-card accent-amber">
                                    <div class="kpi-card-label">عالية / متوسطة / منخفضة</div>
                                    <div class="kpi-card-value" style="color: #92400e; font-size: 15px;">${highCount} / ${mediumCount} / ${lowCount}</div>
                                </div>
                                <div class="kpi-stat-card accent-green">
                                    <div class="kpi-card-label">معدل الحل والإغلاق</div>
                                    <div class="kpi-card-value" style="color: #065f46;">${resolutionRate}% <small style="font-size: 11px; font-weight: 700;">(${resolvedCount} محلول / ${unresolvedCount} مفتوح)</small></div>
                                </div>
                            </div>
                        ` : ''}

                        <table class="iso-table">
                            <thead>
                                <tr>
                                    <th style="width: 35px;">#</th>
                                    <th>اسم المقاول</th>
                                    <th>نوع المخالفة</th>
                                    <th style="width: 80px;">التاريخ</th>
                                    <th style="width: 65px;">الشدة</th>
                                    <th style="width: 85px;">الغرامة</th>
                                    <th>الإجراء المتخذ</th>
                                    <th style="width: 70px;">الحالة</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>

                        ${isLastPage ? `
                            <div class="signatures-grid">
                                <div class="sig-card">
                                    <div class="sig-card-title">ممثل المقاول / المشرف المسؤول</div>
                                    <div class="sig-card-name">العلم والتعهد بتلافي المخالفات</div>
                                    <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">ضابط السلامة الميداني</div>
                                    <div class="sig-card-name">المراجع والمدقق الميداني</div>
                                    <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">الاعتماد الرسمي</div>
                                    <div class="sig-card-name">مدير إدارة السلامة والصحة المهنية والبيئة</div>
                                    <div class="sig-line-area">الاعتماد والختم: ............................</div>
                                </div>
                            </div>

                            ${this.getIsoPrintFooterHtml('DOC-HSE-VIO-CON-01', 'Rev. 03', 'ISO 45001:2018 (Clause 8.1.4.2 & 10.2)')}
                        ` : ''}

                        <div class="page-counter-footer">صفحة ${pageNum} من ${totalPages}</div>
                    </div>
                `;
            }).join('');

            Loading.hide();

            const safeFileName = `${String(reportTitle).replace(/[^\w\u0600-\u06FF.-]/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
            await this.downloadIsoReportAsPdf(reportTitle, pagesHtml, safeFileName, true);
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في إنشاء تقرير مخالفات المقاولين:', error);
            Notification.error('فشل في إنشاء التقرير: ' + (error.message || 'خطأ غير معروف'));
        }
    },

        async deleteViolation(id) {
        if (!id) {
            if (typeof Utils !== 'undefined' && Utils.showToast) {
                Utils.showToast('معرف المخالفة غير موجود', 'error');
            }
            return;
        }

        const targetViolation = (AppState.appData?.violations || []).find(v => v.id === id);
        if (targetViolation && !this.isViolationVisibleToCurrentUser(targetViolation)) {
            if (typeof Notification !== 'undefined') Notification.error('عذراً، ليس لديك صلاحية لحذف مخالفات تابعة لإدارة أخرى');
            else if (typeof Utils !== 'undefined' && Utils.showToast) Utils.showToast('عذراً، ليس لديك صلاحية لحذف مخالفات تابعة لإدارة أخرى', 'error');
            return;
        }

        if (!confirm('هل أنت متأكد من حذف هذه المخالفة؟ لا يمكن التراجع عن هذا الإجراء.')) {
            return;
        }

        if (typeof Loading !== 'undefined' && Loading.show) {
            Loading.show('جاري حذف المخالفة...');
        }

        try {
            // 1. الحصول على بيانات المخالفة قبل الحذف للتنظيف
            const violation = (AppState.appData?.violations || []).find(v => v.id === id);
            const contractorId = violation?.contractorId || '';
            const contractorName = violation?.contractorName || '';
            const employeeId = violation?.employeeId || '';
            const employeeCode = violation?.employeeCode || violation?.employeeNumber || '';
            const employeeName = violation?.employeeName || '';

            // 2. حذف من قاعدة البيانات (Backend)
            let result;
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.callBackend) {
                result = await GoogleIntegration.callBackend('deleteViolationFromSheet', { id: id });
            } else {
                throw new Error('خدمة الاتصال بالخلفية غير متوفرة');
            }

            if (result && result.success) {
                // 3. تحديث البيانات المحلية
                if (AppState.appData && AppState.appData.violations) {
                    AppState.appData.violations = AppState.appData.violations.filter(v => v.id !== id);
                }

                // 4. تنظيف أي مراجع في بيانات المقاولين (إذا كانت موجودة)
                if (contractorId || contractorName) {
                    const contractors = AppState.appData?.contractors || [];
                    contractors.forEach(contractor => {
                        if (contractor && (
                            contractor.id === contractorId || 
                            contractor.name === contractorName ||
                            contractor.contractorName === contractorName
                        )) {
                            // إذا كان المقاول يحتوي على مصفوفة violations، نزيل المخالفة منها
                            if (Array.isArray(contractor.violations)) {
                                contractor.violations = contractor.violations.filter(v => v.id !== id);
                            }
                            // تنظيف أي مراجع أخرى
                            if (contractor.violationIds && Array.isArray(contractor.violationIds)) {
                                contractor.violationIds = contractor.violationIds.filter(vId => vId !== id);
                            }
                        }
                    });
                }

                // 5. تنظيف أي مراجع في بيانات الموظفين (إذا كانت موجودة)
                if (employeeId || employeeCode || employeeName) {
                    const employees = AppState.appData?.employees || [];
                    employees.forEach(employee => {
                        if (employee && (
                            employee.id === employeeId ||
                            employee.employeeNumber === employeeCode ||
                            employee.employeeCode === employeeCode ||
                            employee.name === employeeName
                        )) {
                            // إذا كان الموظف يحتوي على مصفوفة violations، نزيل المخالفة منها
                            if (Array.isArray(employee.violations)) {
                                employee.violations = employee.violations.filter(v => v.id !== id);
                            }
                            // تنظيف أي مراجع أخرى
                            if (employee.violationIds && Array.isArray(employee.violationIds)) {
                                employee.violationIds = employee.violationIds.filter(vId => vId !== id);
                            }
                        }
                    });
                }

                // 6. حفظ البيانات المحلية
                if (typeof DataManager !== 'undefined' && DataManager.save) {
                    DataManager.save();
                }

                // 7. تحديث الكروت فوراً (مباشر) ثم العروض
                try { this.updateAllViolationsStats(); } catch (e) { /* ignore */ }
                this.refreshViolationsView();

                // 8. تحديث عروض المقاولين والموظفين إذا كانت مفتوحة
                if (typeof Contractors !== 'undefined' && Contractors.load) {
                    try {
                        const currentSection = AppState?.currentSection || '';
                        // ✅ CRITICAL: منع استدعاء load إذا كان قيد التنفيذ
                        if (currentSection === 'contractors' && !Contractors._isLoading) {
                            Contractors.load();
                        }
                    } catch (e) {
                        console.warn('Could not refresh contractors view:', e);
                    }
                }

                if (typeof Employees !== 'undefined' && Employees.loadEmployeesList) {
                    try {
                        const currentSection = AppState?.currentSection || '';
                        if (currentSection === 'employees') {
                            Employees.loadEmployeesList();
                        }
                    } catch (e) {
                        console.warn('Could not refresh employees view:', e);
                    }
                }

                if (typeof Utils !== 'undefined' && Utils.showToast) {
                    Utils.showToast('تم حذف المخالفة بنجاح من قاعدة البيانات وجميع السجلات المرتبطة', 'success');
                }
            } else {
                throw new Error(result?.message || 'فشل حذف المخالفة من قاعدة البيانات');
            }
        } catch (error) {
            console.error('Error deleting violation:', error);
            if (typeof Utils !== 'undefined' && Utils.showToast) {
                Utils.showToast('حدث خطأ أثناء حذف المخالفة: ' + error.message, 'error');
            } else {
                alert('حدث خطأ أثناء حذف المخالفة: ' + error.message);
            }
        } finally {
            if (typeof Loading !== 'undefined' && Loading.hide) {
                Loading.hide();
            }
        }
    },

    // ══════════════════════════════════════════════════════════════════
    //  لوحة تحليل المخالفات الاحترافية
    // ══════════════════════════════════════════════════════════════════

    renderAnalyticsTab() {
        // بدء تحميل Chart.js مبكراً
        this._vEnsureChartJS().catch(() => {});
        const t = (key, fallback) => this._t(key, fallback);
        const currentCurrency = this.getCurrentCurrency();
        return `
        <div id="viol-analytics-root" style="font-family:'Cairo','Inter',sans-serif !important;">

            <!-- ── شريط الأدوات الرئيسي (يُخفى عند تصدير PDF) ── -->
            <div id="viol-analytics-toolbar" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(220,38,38,0.35);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-chart-bar" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.3rem;font-weight:800;">${t('module.violations.analytics.title', 'لوحة تحليل المخالفات')}</h2>
                        <p style="margin:4px 0 0 0;font-size:0.9rem;font-weight:500;opacity:0.95;">${t('module.violations.analytics.subtitle', 'تحليل شامل وفوري • فلاتر تفاعلية • تصدير PDF')}</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                    <span style="font-size:0.85rem;font-weight:700;opacity:0.95;margin-left:2px;">${t('module.violations.analytics.period', 'الفترة:')}</span>
                    <div style="display:flex;gap:4px;flex-wrap:wrap;">
                        ${['30','90','180','365','0'].map((v,i) => {
                            const labels = [
                                t('module.violations.analytics.period.30d', '30 يوم'),
                                t('module.violations.analytics.period.3m', '3 أشهر'),
                                t('module.violations.analytics.period.6m', '6 أشهر'),
                                t('module.violations.analytics.period.1y', 'سنة'),
                                t('module.violations.analytics.period.all', 'الكل')
                            ];
                            const active = (this._violPeriod || '0') === v;
                            return `<button class="viol-period-btn" data-period="${v}" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;font-size:0.85rem;font-weight:700;transition:all .2s;background:${active?'#fff':'rgba(255,255,255,0.18)'};color:${active?'#991b1b':'#fff'};">${labels[i]}</button>`;
                        }).join('')}
                    </div>
                    <button id="viol-toggle-filters-btn" style="padding:7px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.85rem;font-weight:700;transition:all .2s;display:flex;align-items:center;gap:6px;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">
                        <i class="fas fa-sliders-h"></i><span>${t('module.violations.analytics.filters', 'فلاتر')}</span><span id="viol-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.72rem;padding:2px 6px;border-radius:10px;margin-right:2px;">●</span>
                    </button>
                    <!-- ✅ تبديل العملة EGP ⇄ USD -->
                    <div style="display:inline-flex;align-items:center;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.4);border-radius:8px;overflow:hidden;">
                        <button id="viol-curr-egp" data-curr="EGP" class="viol-curr-btn" style="padding:7px 12px;border:none;cursor:pointer;background:${currentCurrency==='EGP'?'#fff':'transparent'};color:${currentCurrency==='EGP'?'#991b1b':'#fff'};font-size:0.85rem;font-weight:800;transition:all .15s;" title="${t('module.violations.analytics.currency.egp_long', 'جنيه مصري')}">${t('module.violations.analytics.currency.egp_short', 'ج.م')}</button>
                        <button id="viol-curr-usd" data-curr="USD" class="viol-curr-btn" style="padding:7px 12px;border:none;cursor:pointer;background:${currentCurrency==='USD'?'#fff':'transparent'};color:${currentCurrency==='USD'?'#991b1b':'#fff'};font-size:0.85rem;font-weight:800;transition:all .15s;" title="${t('module.violations.analytics.currency.usd_long', 'دولار أمريكي')}">$</button>
                        <button id="viol-curr-rate-btn" style="padding:7px 10px;border:none;border-right:1px solid rgba(255,255,255,0.25);cursor:pointer;background:transparent;color:#fff;font-size:0.85rem;transition:all .15s;" title="${t('module.violations.analytics.currency.rate_edit', 'تعديل سعر الصرف')}" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='transparent'"><i class="fas fa-cog"></i></button>
                    </div>
                    <button id="viol-export-pdf-btn" style="padding:7px 16px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.35);color:#fff;font-size:0.85rem;font-weight:700;transition:all .2s;display:flex;align-items:center;gap:6px;" onmouseover="this.style.background='rgba(0,0,0,0.55)'" onmouseout="this.style.background='rgba(0,0,0,0.35)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="viol-analytics-refresh" style="padding:7px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.18);color:#fff;font-size:0.85rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.35)'" onmouseout="this.style.background='rgba(255,255,255,0.18)'" title="${t('module.common.refresh', 'تحديث')}">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <div id="viol-analytics-capture">
            <div id="viol-filter-panel" style="display:none;background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#dc2626;font-size:16px;"></i>
                        <span style="font-weight:800;font-size:1.05rem;color:#7f1d1d;">${t('module.violations.analytics.filters.interactive', 'الفلاتر التفاعلية')}</span>
                        <span id="viol-filter-count" style="background:#fee2e2;color:#991b1b;padding:3px 10px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                    </div>
                    <button id="viol-filter-reset-btn" style="padding:6px 14px;border-radius:8px;border:1px solid #fecaca;background:#fff;color:#475569;font-size:0.82rem;font-weight:700;cursor:pointer;" onmouseover="this.style.background='#fee2e2';this.style.color='#dc2626'" onmouseout="this.style.background='#fff';this.style.color='#475569'">
                        <i class="fas fa-times ml-1"></i>${t('module.common.reset', 'مسح الكل')}
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;">
                    ${[
                        {id:'viol-af-factory', icon:'fas fa-industry',          color:'#ec4899', label:t('module.violations.analytics.filter.factory', 'المصنع الرئيسي')},
                        {id:'viol-af-ptype',   icon:'fas fa-id-badge',          color:'#6366f1', label:t('module.violations.analytics.filter.personType', 'نوع الشخص')},
                        {id:'viol-af-type',    icon:'fas fa-tag',               color:'#dc2626', label:t('module.violations.analytics.filter.type', 'نوع المخالفة')},
                        {id:'viol-af-sev',     icon:'fas fa-exclamation-circle', color:'#f59e0b', label:t('module.violations.analytics.filter.severity', 'درجة الشدة')},
                        {id:'viol-af-status',  icon:'fas fa-circle',            color:'#10b981', label:t('module.violations.analytics.filter.status', 'الحالة')},
                        {id:'viol-af-loc',     icon:'fas fa-map-marker-alt',    color:'#3b82f6', label:t('module.violations.analytics.filter.location', 'الموقع الفرعي')},
                        {id:'viol-af-rca',     icon:'fas fa-search-plus',       color:'#b91c1c', label:t('module.violations.analytics.filter.rca', 'السبب الجذري (RCA)')},
                    ].map(f => `
                        <div>
                            <label style="font-size:0.85rem;font-weight:700;color:#334155;display:block;margin-bottom:6px;">
                                <i class="${f.icon}" style="color:${f.color};margin-left:5px;"></i>${f.label}
                            </label>
                            <select id="${f.id}" style="width:100%;padding:8px 12px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.92rem;font-weight:600;background:#fff;color:#1e293b;cursor:pointer;" onfocus="this.style.borderColor='#dc2626'" onblur="this.style.borderColor='#fecaca'">
                                <option value="">${t('module.common.all', 'الكل')}</option>
                            </select>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- ── KPI Cards (تفاعلية عند النقر) ── -->
            <div id="viol-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <!-- ── المصنع الرئيسي (توزيع ونسب المخالفات) ── -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:18px;">
                <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-industry" style="color:#ec4899;font-size:1.15rem;"></i>
                        <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${t('module.violations.analytics.chart.byFactory', 'توزيع ونسب المخالفات حسب المصانع الرئيسية')}</span>
                    </div>
                    <span id="viol-factory-total-badge" style="background:#fdf2f8;color:#be185d;padding:4px 12px;border-radius:12px;font-size:0.85rem;font-weight:700;"></span>
                </div>
                <div style="padding:20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:24px;align-items:center;">
                    <div style="position:relative;height:260px;">
                        <canvas id="viol-chart-factory"></canvas>
                        <div id="viol-chart-factory-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${t('module.violations.analytics.noData', 'لا توجد بيانات')}</div>
                    </div>
                    <div id="viol-factory-breakdown-list" style="display:flex;flex-direction:column;gap:12px;max-height:260px;overflow-y:auto;padding-left:4px;">
                        <!-- dynamic factory breakdown items -->
                    </div>
                </div>
            </div>

            <!-- ── Row 1: الحالة + الشدة ── -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:18px;margin-bottom:18px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-tasks" style="color:#3b82f6;font-size:1.15rem;"></i>
                        <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${t('module.violations.analytics.chart.status', 'التوزيع حسب الحالة')}</span>
                    </div>
                    <div style="padding:14px;position:relative;height:250px;">
                        <canvas id="viol-chart-status"></canvas>
                        <div id="viol-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${t('module.violations.analytics.noData', 'لا توجد بيانات')}</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-exclamation-circle" style="color:#ef4444;font-size:1.15rem;"></i>
                        <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${t('module.violations.analytics.chart.severity', 'التوزيع حسب درجة الشدة')}</span>
                    </div>
                    <div style="padding:14px;position:relative;height:250px;">
                        <canvas id="viol-chart-sev"></canvas>
                        <div id="viol-chart-sev-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${t('module.violations.analytics.noData', 'لا توجد بيانات')}</div>
                    </div>
                </div>
            </div>

            <!-- ── الاتجاه الزمني ── -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:18px;">
                <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px;">
                    <i class="fas fa-chart-area" style="color:#8b5cf6;font-size:1.15rem;"></i>
                    <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${t('module.violations.analytics.chart.trend', 'الاتجاه الزمني للمخالفات (آخر 12 شهر)')}</span>
                </div>
                <div style="padding:14px;position:relative;height:270px;">
                    <canvas id="viol-chart-trend"></canvas>
                    <div id="viol-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${t('module.violations.analytics.noData', 'لا توجد بيانات')}</div>
                </div>
            </div>

            <!-- ── تحليل الأسباب الجذرية للمخالفات (RCA) ── -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:18px;">
                <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-search-plus" style="color:#b91c1c;font-size:1.15rem;"></i>
                        <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${t('module.violations.analytics.chart.rootCause', 'تحليل الأسباب الجذرية للمخالفات (Root Cause Analysis - RCA)')}</span>
                    </div>
                    <span id="viol-rca-total-badge" style="background:#fef2f2;color:#991b1b;padding:4px 12px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                </div>
                <div style="padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;align-items:center;">
                    <div style="position:relative;height:250px;">
                        <canvas id="viol-chart-rca"></canvas>
                        <div id="viol-chart-rca-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${t('module.violations.analytics.noData', 'لا توجد بيانات')}</div>
                    </div>
                    <div id="viol-rca-breakdown-list" style="display:flex;flex-direction:column;gap:10px;max-height:260px;overflow-y:auto;padding-left:4px;"></div>
                </div>
            </div>

            <!-- ── Row 2: نوع المخالفة + الموقع ── -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:18px;margin-bottom:18px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-tag" style="color:#dc2626;font-size:1.15rem;"></i>
                            <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${t('module.violations.analytics.chart.byType', 'حسب نوع المخالفة (أعلى 10)')}</span>
                        </div>
                        <span id="viol-type-total-badge" style="background:#fef2f2;color:#b91c1c;padding:4px 12px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                    </div>
                    <div style="padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;align-items:center;">
                        <div style="position:relative;height:240px;">
                            <canvas id="viol-chart-type"></canvas>
                            <div id="viol-chart-type-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${t('module.violations.analytics.noData', 'لا توجد بيانات')}</div>
                        </div>
                        <div id="viol-type-breakdown-list" style="display:flex;flex-direction:column;gap:10px;max-height:260px;overflow-y:auto;padding-left:4px;">
                        </div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-map-marker-alt" style="color:#f59e0b;font-size:1.15rem;"></i>
                            <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${t('module.violations.analytics.chart.byLocation', 'حسب الموقع (أعلى 8)')}</span>
                        </div>
                        <span id="viol-loc-total-badge" style="background:#fffbeb;color:#92400e;padding:4px 12px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                    </div>
                    <div style="padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;align-items:center;">
                        <div style="position:relative;height:220px;">
                            <canvas id="viol-chart-loc"></canvas>
                            <div id="viol-chart-loc-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${t('module.violations.analytics.noData', 'لا توجد بيانات')}</div>
                        </div>
                        <div id="viol-loc-breakdown-list" style="display:flex;flex-direction:column;gap:9px;max-height:240px;overflow-y:auto;padding-left:4px;"></div>
                    </div>
                </div>
            </div>

            <!-- ── Row 3: أكثر الموظفين + أكثر المقاولين ── -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:18px;margin-bottom:18px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-user-tie" style="color:#6366f1;font-size:1.15rem;"></i>
                            <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${t('module.violations.analytics.chart.topEmployees', 'أكثر الموظفين مخالفةً (أعلى 10)')}</span>
                        </div>
                        <span id="viol-emp-total-badge" style="background:#eef2ff;color:#4338ca;padding:4px 12px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                    </div>
                    <div style="padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;align-items:center;">
                        <div style="position:relative;height:220px;">
                            <canvas id="viol-chart-emp"></canvas>
                            <div id="viol-chart-emp-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${t('module.violations.analytics.chart.noEmpViolations', 'لا توجد مخالفات موظفين')}</div>
                        </div>
                        <div id="viol-emp-breakdown-list" style="display:flex;flex-direction:column;gap:9px;max-height:240px;overflow-y:auto;padding-left:4px;"></div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-users-cog" style="color:#f97316;font-size:1.15rem;"></i>
                            <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${t('module.violations.analytics.chart.topContractors', 'أكثر المقاولين مخالفةً (أعلى 10)')}</span>
                        </div>
                        <span id="viol-con-total-badge" style="background:#fff7ed;color:#c2410c;padding:4px 12px;border-radius:12px;font-size:0.82rem;font-weight:700;"></span>
                    </div>
                    <div style="padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;align-items:center;">
                        <div style="position:relative;height:220px;">
                            <canvas id="viol-chart-con"></canvas>
                            <div id="viol-chart-con-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${t('module.violations.analytics.chart.noConViolations', 'لا توجد مخالفات مقاولين')}</div>
                        </div>
                        <div id="viol-con-breakdown-list" style="display:flex;flex-direction:column;gap:9px;max-height:240px;overflow-y:auto;padding-left:4px;"></div>
                    </div>
                </div>
            </div>

            <!-- ── مخطط الغرامات حسب نوع المخالفة ── -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:18px;">
                <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px;">
                    <i class="fas fa-coins" style="color:#d97706;font-size:1.15rem;"></i>
                    <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${t('module.violations.analytics.chart.finesByType', 'إجمالي الغرامات حسب نوع المخالفة ({currency})').replace('{currency}', this.getCurrencyLabel('long') === 'دولار أمريكي' ? t('module.violations.analytics.currency.usd_long', 'دولار أمريكي') : t('module.violations.analytics.currency.egp_long', 'جنيه مصري'))}</span>
                    <span style="font-size:0.82rem;font-weight:600;color:#64748b;margin-right:auto;">${t('module.violations.analytics.top10Types', '(أعلى 10 أنواع)')}</span>
                </div>
                <div style="padding:14px;position:relative;height:270px;">
                    <canvas id="viol-chart-fines"></canvas>
                    <div id="viol-chart-fines-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${t('module.violations.analytics.chart.noFinesData', 'لا توجد بيانات غرامات')}</div>
                </div>
            </div>

            <!-- ── جدول أشد المخالفات ── -->
            <div class="content-card" style="padding:0;overflow:hidden;">
                <div style="padding:15px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <i class="fas fa-fire" style="color:#dc2626;font-size:1.15rem;"></i>
                        <span style="font-weight:800;font-size:1.02rem;color:#0f172a;">${t('module.violations.analytics.table.criticalTitle', 'أشد المخالفات (عالية الشدة — غير محلولة)')}</span>
                    </div>
                    <span id="viol-critical-count" style="background:#fef2f2;color:#b91c1c;padding:4px 12px;border-radius:20px;font-size:0.85rem;font-weight:700;"></span>
                </div>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
                        <thead>
                            <tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0;">
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${t('module.violations.analytics.table.date', 'التاريخ')}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${t('module.violations.analytics.table.name', 'الاسم')}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${t('module.violations.analytics.table.personType', 'نوع الشخص')}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${t('module.violations.analytics.table.type', 'نوع المخالفة')}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${t('module.violations.analytics.table.location', 'الموقع')}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${t('module.violations.analytics.table.severity', 'الشدة')}</th>
                                <th style="padding:12px 14px;text-align:right;font-weight:800;color:#0f172a;white-space:nowrap;">${t('module.violations.analytics.table.status', 'الحالة')}</th>
                                <th style="padding:12px 14px;text-align:center;font-weight:800;color:#0f172a;white-space:nowrap;">${t('module.violations.analytics.table.fine', 'الغرامة ({currency})').replace('{currency}', this.getCurrencyLabel('short'))}</th>
                            </tr>
                        </thead>
                        <tbody id="viol-critical-tbody">
                            <tr><td colspan="8" style="padding:20px;text-align:center;color:#94a3b8;font-size:0.92rem;font-weight:600;">${t('module.common.loading', 'جارٍ التحميل…')}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>`;
    },

    // ── تحديث لوحة تحليل المخالفات ──
    async updateViolationAnalytics() {
        const root = document.getElementById('viol-analytics-root');
        if (!root) return;
        const t = (key, fallback) => this._t(key, fallback);
        const lang = window.AppI18n && typeof window.AppI18n.getCurrentLang === 'function' ? window.AppI18n.getCurrentLang() : 'ar';
        const dateLocale = lang === 'en' ? 'en-US' : 'ar-SA-u-nu-latn';

        // ── 1. جمع البيانات وتطبيع السجلات ──
        const period = parseInt(this._violPeriod || '0', 10);
        const rawAll = AppState.appData.violations || [];
        const allViol = rawAll.map(r => this.normalizeViolationRecord(r)).filter(v => v && this.isViolationVisibleToCurrentUser(v));

        // ── 2. تصفية بالفترة الزمنية ──
        const violByPeriod = this._vFilterByPeriod(allViol, period);

        // ── 3. ملء قوائم الفلاتر من بيانات الفترة ──
        this._vPopulateFilters(violByPeriod);

        // ── 4. تطبيق الفلاتر التفاعلية ──
        const viol = this._vApplyFilters(violByPeriod);
        const total = viol.length;
        const countEl = document.getElementById('viol-filter-count');
        if (countEl) countEl.textContent = `${total} ${t('module.violations.analytics.violationUnit', 'مخالفة')}`;

        // ── 5. حساب KPIs ──
        const empViol  = viol.filter(v => v.personType === 'employee');
        const conViol  = viol.filter(v => v.personType === 'contractor');
        const highSev  = viol.filter(v => v.severity === 'عالية').length;
        const resolved = viol.filter(v => v.status === 'محلول').length;
        const unresol  = viol.filter(v => v.status === 'غير محلول').length;
        const pending  = viol.filter(v => v.status === 'قيد المراجعة').length;
        const resolRate= total > 0 ? Math.round((resolved/total)*100) : 0;
        const totalFines = viol.reduce((s,v) => s + (Number(v.fineAmount)||0), 0);
        const thisMonth  = viol.filter(v => {
            if (!v.violationDate) return false;
            const d = new Date(v.violationDate), n = new Date();
            return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
        }).length;

        const kpiEl = document.getElementById('viol-kpi-strip');
        if (kpiEl) {
            const kpis = [
                { id:'total',       label:t('module.violations.analytics.kpi.total', 'إجمالي المخالفات'),    value:total.toLocaleString('en-US'),    icon:'fas fa-exclamation-circle', color:'#dc2626', bg:'#fef2f2', border:'#fecaca' },
                { id:'employees',   label:t('module.violations.analytics.kpi.employees', 'مخالفات الموظفين'),    value:empViol.length.toLocaleString('en-US'), icon:'fas fa-user-tie',           color:'#6366f1', bg:'#eef2ff', border:'#c7d2fe' },
                { id:'contractors', label:t('module.violations.analytics.kpi.contractors', 'مخالفات المقاولين'),   value:conViol.length.toLocaleString('en-US'), icon:'fas fa-users-cog',          color:'#f97316', bg:'#fff7ed', border:'#fed7aa' },
                { id:'highSev',     label:t('module.violations.analytics.kpi.highSeverity', 'عالية الشدة'),          value:highSev.toLocaleString('en-US'),       icon:'fas fa-bomb',               color:'#b91c1c', bg:'#fef2f2', border:'#fca5a5' },
                { id:'resolved',    label:t('module.violations.analytics.kpi.resolved', 'محلولة'),               value:resolved.toLocaleString('en-US'),      icon:'fas fa-check-circle',       color:'#10b981', bg:'#ecfdf5', border:'#a7f3d0' },
                { id:'unresolved',  label:t('module.violations.analytics.kpi.unresolved', 'غير محلولة'),           value:unresol.toLocaleString('en-US'),       icon:'fas fa-times-circle',       color:'#f59e0b', bg:'#fffbeb', border:'#fde68a' },
                { id:'resolRate',   label:t('module.violations.analytics.kpi.resolRate', 'معدل الحل'),            value:resolRate.toLocaleString('en-US')+'%', icon:'fas fa-chart-pie',          color:'#0ea5e9', bg:'#f0f9ff', border:'#bae6fd' },
                { id:'totalFines',  label:t('module.violations.analytics.kpi.totalFines', 'إجمالي الغرامات'),      value: totalFines > 0 ? this.formatFineAmount(totalFines) : '—', icon:'fas fa-coins', color:'#d97706', bg:'#fffbeb', border:'#fde68a' },
                { id:'thisMonth',   label:t('module.violations.analytics.kpi.thisMonth', 'هذا الشهر'),            value:thisMonth.toLocaleString('en-US'),     icon:'fas fa-calendar-day',       color:'#8b5cf6', bg:'#f5f3ff', border:'#ddd6fe' },
            ];
            kpiEl.innerHTML = kpis.map(k => `
                <div class="viol-kpi-card" data-kpi="${k.id}" title="انقر للتصفية التفاعلية حسب هذا المعيار" style="background:${k.bg};border:1.5px solid ${k.border};border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:12px;transition:all .2s;cursor:pointer;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:42px;height:42px;background:${k.color};border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${k.icon}" style="color:#fff;font-size:17px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.4rem;font-weight:800;color:${k.color};line-height:1.1;">${k.value}</div>
                        <div style="font-size:0.82rem;font-weight:700;color:#475569;margin-top:4px;white-space:nowrap;">${k.label}</div>
                    </div>
                </div>`).join('');
        }

        // ── 6. تحميل Chart.js ──
        const loaded = await this._vEnsureChartJS();
        if (!loaded || typeof Chart === 'undefined') {
            root.insertAdjacentHTML('afterbegin', `<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">${t('module.violations.analytics.chartError', 'تعذّر تحميل مكتبة الرسوم البيانية. البيانات الإجمالية متاحة في الأرقام أعلاه.')}</span></div>`);
            return;
        }

        // ── 7. الرسوم البيانية ──
        // 🏭 المصنع الرئيسي (توزيع ونسب المخالفات)
        this._vDrawFactoryBreakdown('viol-chart-factory', 'viol-factory-breakdown-list', viol);

        // الحالة — يدعم عربي وإنجليزي
        const statusG = this._vGroupBy(viol, 'status');
        const statusColors = {
            'محلول':'rgba(16,185,129,0.85)',    'resolved':'rgba(16,185,129,0.85)',
            'غير محلول':'rgba(239,68,68,0.85)', 'unresolved':'rgba(239,68,68,0.85)', 'open':'rgba(239,68,68,0.85)',
            'قيد المراجعة':'rgba(245,158,11,0.85)', 'in progress':'rgba(245,158,11,0.85)', 'under review':'rgba(245,158,11,0.85)'
        };
        this._vDrawDoughnut('viol-chart-status', statusG.labels.map(l => t('module.violations.status.' + l, l)), statusG.data, statusG.labels.map(l => statusColors[l.toLowerCase()] || statusColors[l] || 'rgba(148,163,184,0.8)'));

        // الشدة — يدعم عربي وإنجليزي
        const sevG = this._vGroupBy(viol, 'severity');
        const sevColors = {
            'عالية':'rgba(239,68,68,0.85)',   'high':'rgba(239,68,68,0.85)',
            'متوسطة':'rgba(245,158,11,0.85)', 'medium':'rgba(245,158,11,0.85)', 'moderate':'rgba(245,158,11,0.85)',
            'منخفضة':'rgba(16,185,129,0.85)', 'low':'rgba(16,185,129,0.85)',
            'منخضة':'rgba(16,185,129,0.85)'
        };
        this._vDrawDoughnut('viol-chart-sev', sevG.labels.map(l => t('module.violations.severity.' + l, l)), sevG.data, sevG.labels.map(l => sevColors[l.toLowerCase()] || sevColors[l] || 'rgba(148,163,184,0.8)'));

        // الاتجاه الزمني
        this._vDrawTrend('viol-chart-trend', violByPeriod);

        // تحليل الأسباب الجذرية (Root Cause Analysis - RCA)
        this._vDrawListBreakdown('viol-chart-rca', 'viol-rca-breakdown-list', viol, 'rootCause', 10, [
            'rgba(220,38,38,0.85)', 'rgba(234,88,12,0.85)', 'rgba(217,119,6,0.85)',
            'rgba(13,148,136,0.85)', 'rgba(37,99,235,0.85)', 'rgba(124,58,237,0.85)',
            'rgba(190,24,93,0.85)', 'rgba(75,85,99,0.85)'
        ], '#fef2f2', '#991b1b', 'viol-rca-total-badge', 'viol-af-rca', null);

        // نوع المخالفة (توزيع تفاعلي مع Doughnut + قائمة)
        this._vDrawTypeBreakdown('viol-chart-type', 'viol-type-breakdown-list', viol, 10);

        // الموقع (توزيع تفاعلي)
        this._vDrawListBreakdown('viol-chart-loc', 'viol-loc-breakdown-list', viol, 'violationLocation', 8, [
            'rgba(245,158,11,0.85)','rgba(234,179,8,0.85)','rgba(202,138,4,0.85)',
            'rgba(161,98,7,0.85)','rgba(120,53,15,0.85)','rgba(234,88,12,0.85)',
            'rgba(194,65,12,0.85)','rgba(154,52,18,0.85)'
        ], '#fffbeb', '#92400e', 'viol-loc-total-badge', 'viol-af-loc', null);

        // أكثر الموظفين مخالفة (توزيع تفاعلي)
        this._vDrawListBreakdown('viol-chart-emp', 'viol-emp-breakdown-list', empViol, 'employeeName', 10, [
            'rgba(99,102,241,0.85)','rgba(79,70,229,0.85)','rgba(67,56,202,0.85)',
            'rgba(55,48,163,0.85)','rgba(109,40,217,0.85)','rgba(124,58,237,0.85)',
            'rgba(139,92,246,0.85)','rgba(167,139,250,0.85)','rgba(196,181,253,0.9)','rgba(76,29,149,0.85)'
        ], '#eef2ff', '#4338ca', 'viol-emp-total-badge', null, null);

        // أكثر المقاولين مخالفة (توزيع تفاعلي)
        this._vDrawListBreakdown('viol-chart-con', 'viol-con-breakdown-list', conViol, 'contractorName', 10, [
            'rgba(249,115,22,0.85)','rgba(234,88,12,0.85)','rgba(194,65,12,0.85)',
            'rgba(154,52,18,0.85)','rgba(180,83,9,0.85)','rgba(217,119,6,0.85)',
            'rgba(245,158,11,0.85)','rgba(202,138,4,0.85)','rgba(161,98,7,0.85)','rgba(120,53,15,0.85)'
        ], '#fff7ed', '#c2410c', 'viol-con-total-badge', null, null);

        // الغرامات حسب النوع
        this._vDrawFinesByType('viol-chart-fines', viol);

        // ── 8. جدول المخالفات الحرجة ──
        const critViol = viol
            .filter(v => {
                const sev = String(v.severity||'').trim().toLowerCase();
                const sta = String(v.status||'').trim().toLowerCase();
                const isHigh = sev === 'عالية' || sev === 'high';
                const isResolved = sta === 'محلول' || sta === 'resolved';
                return isHigh && !isResolved;
            })
            .sort((a,b) => (b.fineAmount||0) - (a.fineAmount||0))
            .slice(0, 20);
        const critCountEl = document.getElementById('viol-critical-count');
        const tbody = document.getElementById('viol-critical-tbody');
        if (critCountEl) critCountEl.textContent = `${critViol.length} ${t('module.violations.analytics.violationUnit', 'مخالفة')}`;
        if (tbody) {
            if (critViol.length === 0) {
                tbody.innerHTML = `<tr><td colspan="8" style="padding:24px;text-align:center;color:#10b981;"><i class="fas fa-check-circle ml-2"></i>${t('module.violations.analytics.table.noCritical', 'لا توجد مخالفات حرجة غير محلولة')}</td></tr>`;
            } else {
                tbody.innerHTML = critViol.map((v,i) => {
                    const personName = Utils.escapeHTML(v.employeeName || v.contractorName || '—');
                    const personTypeLbl = v.personType === 'contractor' 
                        ? `<span style="background:#fff7ed;color:#c2410c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t('module.violations.analytics.person.contractor', 'مقاول')}</span>` 
                        : `<span style="background:#eef2ff;color:#4338ca;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t('module.violations.analytics.person.employee', 'موظف')}</span>`;
                    const sevBadge = `<span style="background:#fef2f2;color:#b91c1c;padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;">${t('module.violations.analytics.severity.high', 'عالية')}</span>`;
                    const statusBadge = { 'غير محلول':'background:#fef3c7;color:#92400e;', 'قيد المراجعة':'background:#ede9fe;color:#5b21b6;' }[v.status] || 'background:#f1f5f9;color:#374151;';
                    const fine = Number(v.fineAmount)||0;
                    const rowBg = i%2===0 ? '#fff' : '#fafafa';
                    return `<tr style="border-bottom:1px solid #f8fafc;background:${rowBg};" onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background='${rowBg}'">
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${v.violationDate ? new Date(v.violationDate).toLocaleDateString(dateLocale,{year:'numeric',month:'short',day:'numeric'}) : '—'}</td>
                        <td style="padding:9px 12px;font-weight:600;color:#1e40af;">${personName}</td>
                        <td style="padding:9px 12px;">${personTypeLbl}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(v.violationType||'—')}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(v.violationLocation||'—')}</td>
                        <td style="padding:9px 12px;">${sevBadge}</td>
                        <td style="padding:9px 12px;"><span style="padding:2px 7px;border-radius:12px;font-size:0.7rem;font-weight:700;${statusBadge}">${t('module.violations.status.' + v.status, v.status)}</span></td>
                        <td style="padding:9px 12px;text-align:center;font-weight:700;color:${fine>0?'#dc2626':'#94a3b8'};">${fine>0 ? this.formatFineAmount(fine) : '—'}</td>
                    </tr>`;
                }).join('');
            }
        }
    },

    // ── مساعد: تصفية بالفترة الزمنية ──
    _vFilterByPeriod(viol, days) {
        if (!days || days === 0) return viol;
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        return viol.filter(v => {
            if (!v.violationDate) return true;
            const d = new Date(v.violationDate);
            return !isNaN(d.getTime()) && d >= cutoff;
        });
    },

    // ── مساعد: تجميع حسب حقل ──
    _vGroupBy(viol, field, limit = 0) {
        const undefLabel = this._t ? this._t('module.violations.analytics.undefined', 'غير محدد') : 'غير محدد';
        const map = {};
        viol.forEach(v => {
            const val = String(v[field] || undefLabel).trim() || undefLabel;
            map[val] = (map[val] || 0) + 1;
        });
        let entries = Object.entries(map).sort((a,b) => b[1]-a[1]);
        if (limit > 0) entries = entries.slice(0, limit);
        return { labels: entries.map(e=>e[0]), data: entries.map(e=>e[1]) };
    },

    // ── مساعد: استخراج اسم المصنع الرئيسي ──
    _vGetFactoryName(record) {
        const undefLabel = this._t ? this._t('module.violations.analytics.undefined', 'غير محدد') : 'غير محدد';
        if (!record || typeof record !== 'object') return undefLabel;
        return String(record.factory || record.violationLocation || record.violationPlace || undefLabel).trim() || undefLabel;
    },

    // ── مساعد: تطبيق الفلاتر التفاعلية ──
    _vApplyFilters(viol) {
        const get = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
        const fFactory= get('viol-af-factory');
        const fPtype  = get('viol-af-ptype');
        const fType   = get('viol-af-type');
        const fSev    = get('viol-af-sev');
        const fStatus = get('viol-af-status');
        const fLoc    = get('viol-af-loc');
        const fRca    = get('viol-af-rca');
        const hasAny  = [fFactory,fPtype,fType,fSev,fStatus,fLoc,fRca].some(v => v !== '');
        const badge = document.getElementById('viol-filter-badge');
        if (badge) badge.style.display = hasAny ? 'inline' : 'none';
        return viol.filter(v => {
            if (fFactory&& this._vGetFactoryName(v) !== fFactory) return false;
            if (fPtype  && String(v.personType||'').trim()          !== fPtype)  return false;
            if (fType   && String(v.violationType||'').trim()        !== fType)   return false;
            if (fSev    && String(v.severity||'').trim()             !== fSev)    return false;
            if (fStatus && String(v.status||'').trim()               !== fStatus) return false;
            if (fLoc    && String(v.violationLocation||'').trim()    !== fLoc)    return false;
            if (fRca    && String(v.rootCause||'').trim()            !== fRca)    return false;
            return true;
        });
    },

    // ── مساعد: ملء قوائم الفلاتر ──
    _vPopulateFilters(viol) {
        const t = (key, fallback) => this._t(key, fallback);
        const unique = fn => [...new Set(viol.map(fn).filter(Boolean))].sort();
        const fill = (id, values, translationPrefix) => {
            const el = document.getElementById(id);
            if (!el) return;
            const cur = el.value;
            el.innerHTML = `<option value="">${t('module.common.all', 'الكل')}</option>` + values.map(v => {
                const label = translationPrefix ? t(translationPrefix + v, v) : v;
                return `<option value="${v}"${v===cur?' selected':''}>${label}</option>`;
            }).join('');
        };
        
        // خيارات نوع الشخص
        const ptypeEl = document.getElementById('viol-af-ptype');
        if (ptypeEl) {
            const cur = ptypeEl.value;
            ptypeEl.innerHTML = `
                <option value="">${t('module.common.all', 'الكل')}</option>
                <option value="employee"${cur==='employee'?' selected':''}>${t('module.violations.analytics.person.employee', 'موظف')}</option>
                <option value="contractor"${cur==='contractor'?' selected':''}>${t('module.violations.analytics.person.contractor', 'مقاول')}</option>
            `;
        }

        fill('viol-af-factory',unique(v => this._vGetFactoryName(v)));
        fill('viol-af-type',   unique(v => String(v.violationType||'').trim()));
        fill('viol-af-sev',    unique(v => String(v.severity||'').trim()), 'module.violations.severity.');
        fill('viol-af-status', unique(v => String(v.status||'').trim()), 'module.violations.status.');
        fill('viol-af-loc',    unique(v => String(v.violationLocation||'').trim()));
        fill('viol-af-rca',    unique(v => String(v.rootCause||'').trim()));
    },

    // ── مساعد: رسم عام — Doughnut + قائمة Progress Bars ──
    _vDrawListBreakdown(canvasId, listId, records, field, limit, colors, badgeBg, badgeColor, badgeId, filterSelectId, translationPrefix) {
        const canvas  = document.getElementById(canvasId);
        const emptyEl = document.getElementById(canvasId + '-empty');
        const listEl  = document.getElementById(listId);
        const badgeEl = badgeId ? document.getElementById(badgeId) : null;
        if (!canvas) return;
        const t = (key, fallback) => this._t(key, fallback);
        const undefLabel = t('module.violations.analytics.undefined', 'غير محدد');

        const map = {};
        records.forEach(v => {
            const val = String(v[field] || undefLabel).trim() || undefLabel;
            map[val] = (map[val] || 0) + 1;
        });
        let sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
        if (limit > 0) sorted = sorted.slice(0, limit);
        const labels = sorted.map(e => e[0]);
        const data   = sorted.map(e => e[1]);
        const total  = records.length;

        if (badgeEl) {
            badgeEl.textContent = `${total.toLocaleString('en-US')} ${t('module.violations.analytics.violationUnit', 'مخالفة')}`;
            if (badgeBg) badgeEl.style.background = badgeBg;
            if (badgeColor) badgeEl.style.color = badgeColor;
        }

        if (!data.length || total === 0) {
            canvas.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
            if (listEl) listEl.innerHTML = `<div style="text-align:center;color:#94a3b8;font-size:0.92rem;padding:20px;">${t('module.violations.analytics.noData', 'لا توجد بيانات')}</div>`;
            return;
        }
        if (emptyEl) emptyEl.style.display = 'none';
        canvas.style.display = '';

        if (!this._violCharts) this._violCharts = {};
        const prev = this._violCharts[canvasId];
        if (prev) { try { prev.destroy(); } catch(e){} }
        this._violCharts[canvasId] = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{ data, backgroundColor: labels.map((_, i) => colors[i % colors.length]), borderWidth: 2, borderColor: '#fff', hoverOffset: 6 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '60%',
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: ctx => {
                        const val = ctx.parsed;
                        const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
                        return ` ${ctx.label}: ${val.toLocaleString('en-US')} (${pct}%)`;
                    }}}
                }
            }
        });

        if (listEl) {
            listEl.innerHTML = sorted.map((item, idx) => {
                const name  = item[0];
                const cnt   = item[1];
                const pct   = total > 0 ? ((cnt / total) * 100).toFixed(1) : 0;
                const color = colors[idx % colors.length];
                const rank  = idx + 1;
                const label = translationPrefix ? t(translationPrefix + name, name) : name;
                return `
                <div class="viol-list-item" data-filter-val="${Utils.escapeHTML(name)}" data-filter-id="${filterSelectId || ''}" title="${Utils.escapeHTML(label)}" style="background:#fff;border:1.5px solid #f1f5f9;border-radius:10px;padding:9px 12px;cursor:${filterSelectId ? 'pointer' : 'default'};transition:all 0.2s;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
                        <div style="display:flex;align-items:center;gap:7px;">
                            <span style="width:20px;height:20px;border-radius:50%;background:${color};color:#fff;font-size:0.68rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${rank}</span>
                            <span style="font-weight:800;font-size:0.85rem;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:155px;">${Utils.escapeHTML(label)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:5px;white-space:nowrap;">
                            <span style="font-weight:800;font-size:0.95rem;color:${color.replace('0.85','1')};">${cnt.toLocaleString('en-US')}</span>
                            <span style="font-size:0.78rem;font-weight:700;color:#64748b;">(${pct}%)</span>
                        </div>
                    </div>
                    <div style="height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden;">
                        <div style="width:${pct}%;height:100%;background:${color};border-radius:3px;transition:width 0.6s ease;"></div>
                    </div>
                </div>`;
            }).join('');

            if (filterSelectId) {
                listEl.querySelectorAll('.viol-list-item').forEach(el => {
                    el.addEventListener('mouseover', () => { el.style.background='#f8fafc'; el.style.borderColor='#cbd5e1'; });
                    el.addEventListener('mouseout',  () => { el.style.background='#fff';    el.style.borderColor='#f1f5f9'; });
                    el.addEventListener('click', () => {
                        const val = el.getAttribute('data-filter-val');
                        const sel = document.getElementById(filterSelectId);
                        if (sel) { sel.value = sel.value === val ? '' : val; this.updateViolationAnalytics(); }
                    });
                });
            }
        }
    },

    // ── مساعد: رسم وتفصيل توزيع نوع المخالفة ──
    _vDrawTypeBreakdown(canvasId, listContainerId, viol, limit) {
        const canvas  = document.getElementById(canvasId);
        const emptyEl = document.getElementById(canvasId + '-empty');
        const listEl  = document.getElementById(listContainerId);
        const badgeEl = document.getElementById('viol-type-total-badge');
        if (!canvas) return;

        const t = (key, fallback) => this._t(key, fallback);
        const total = viol.length;
        if (badgeEl) badgeEl.textContent = `${total.toLocaleString('en-US')} ${t('module.violations.analytics.violationUnit', 'مخالفة')}`;

        // تجميع حسب نوع المخالفة
        const typeMap = {};
        viol.forEach(v => {
            const tp = String(v.violationType || 'غير محدد').trim() || 'غير محدد';
            if (!typeMap[tp]) typeMap[tp] = 0;
            typeMap[tp]++;
        });

        let sorted = Object.entries(typeMap).sort((a, b) => b[1] - a[1]);
        if (limit > 0) sorted = sorted.slice(0, limit);

        const labels = sorted.map(e => e[0]);
        const data   = sorted.map(e => e[1]);
        const typeColors = [
            'rgba(220,38,38,0.85)',  'rgba(234,88,12,0.85)',  'rgba(202,138,4,0.85)',
            'rgba(22,163,74,0.85)',  'rgba(2,132,199,0.85)',  'rgba(99,102,241,0.85)',
            'rgba(168,85,247,0.85)', 'rgba(236,72,153,0.85)', 'rgba(20,184,166,0.85)',
            'rgba(107,114,128,0.85)'
        ];

        if (!data.length || total === 0) {
            canvas.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
            if (listEl) listEl.innerHTML = `<div style="text-align:center;color:#94a3b8;font-size:0.92rem;padding:20px;">${t('module.violations.analytics.noData', 'لا توجد بيانات')}</div>`;
            return;
        }
        if (emptyEl) emptyEl.style.display = 'none';
        canvas.style.display = '';

        // 1. Doughnut
        if (!this._violCharts) this._violCharts = {};
        const prev = this._violCharts[canvasId];
        if (prev) { try { prev.destroy(); } catch(e){} }

        this._violCharts[canvasId] = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: labels.map((_, i) => typeColors[i % typeColors.length]),
                    borderWidth: 2,
                    borderColor: '#fff',
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '60%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => {
                                const val = ctx.parsed;
                                const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
                                return ` ${ctx.label}: ${val.toLocaleString('en-US')} (${pct}%)`;
                            }
                        }
                    }
                }
            }
        });

        // 2. قائمة Progress Bars مع فلترة تفاعلية
        if (listEl) {
            listEl.innerHTML = sorted.map((item, idx) => {
                const typeName = item[0];
                const cnt  = item[1];
                const pct  = total > 0 ? ((cnt / total) * 100).toFixed(1) : 0;
                const color = typeColors[idx % typeColors.length];
                const rank  = idx + 1;
                return `
                <div class="viol-type-item" data-vtype="${Utils.escapeHTML(typeName)}" title="انقر لتصفية حسب نوع ${Utils.escapeHTML(typeName)}" style="background:#fff;border:1.5px solid #f1f5f9;border-radius:12px;padding:10px 14px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='#fef2f2';this.style.borderColor='#fca5a5';" onmouseout="this.style.background='#fff';this.style.borderColor='#f1f5f9';">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span style="width:22px;height:22px;border-radius:50%;background:${color};color:#fff;font-size:0.72rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${rank}</span>
                            <span style="font-weight:800;font-size:0.88rem;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:170px;" title="${Utils.escapeHTML(typeName)}">${Utils.escapeHTML(typeName)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;white-space:nowrap;">
                            <span style="font-weight:800;font-size:1.0rem;color:${color.replace('0.85','1')};">${cnt.toLocaleString('en-US')}</span>
                            <span style="font-size:0.82rem;font-weight:700;color:#64748b;">(${pct}%)</span>
                        </div>
                    </div>
                    <div style="height:7px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                        <div style="width:${pct}%;height:100%;background:${color};border-radius:4px;transition:width 0.6s ease;"></div>
                    </div>
                </div>`;
            }).join('');

            listEl.querySelectorAll('.viol-type-item').forEach(el => {
                el.addEventListener('click', () => {
                    const vtype = el.getAttribute('data-vtype');
                    const sel = document.getElementById('viol-af-type');
                    if (sel) {
                        sel.value = sel.value === vtype ? '' : vtype;
                        this.updateViolationAnalytics();
                    }
                });
            });
        }
    },

    // ── مساعد: رسم وتفصيل توزيع المصنع الرئيسي ──
    _vDrawFactoryBreakdown(canvasId, listContainerId, viol) {
        const canvas = document.getElementById(canvasId);
        const emptyEl = document.getElementById(canvasId + '-empty');
        const listEl = document.getElementById(listContainerId);
        const badgeEl = document.getElementById('viol-factory-total-badge');
        if (!canvas) return;
        
        const t = (key, fallback) => this._t(key, fallback);
        const total = viol.length;
        if (badgeEl) badgeEl.textContent = `${total.toLocaleString('en-US')} ${t('module.violations.analytics.violationUnit', 'مخالفة')}`;

        // التجميع حسب المصنع الرئيسي
        const factoryMap = {};
        viol.forEach(v => {
            const fac = this._vGetFactoryName(v);
            if (!factoryMap[fac]) factoryMap[fac] = { count: 0, fineSum: 0 };
            factoryMap[fac].count += 1;
            factoryMap[fac].fineSum += (Number(v.fineAmount) || 0);
        });

        const sorted = Object.entries(factoryMap).sort((a, b) => b[1].count - a[1].count);
        const labels = sorted.map(e => e[0]);
        const data = sorted.map(e => e[1].count);
        const factoryColors = [
            'rgba(236,72,153,0.85)', 'rgba(99,102,241,0.85)', 'rgba(245,158,11,0.85)', 
            'rgba(16,185,129,0.85)', 'rgba(59,130,246,0.85)', 'rgba(139,92,246,0.85)',
            'rgba(239,68,68,0.85)',  'rgba(20,184,166,0.85)', 'rgba(107,114,128,0.85)'
        ];

        if (!data.length || total === 0) {
            canvas.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
            if (listEl) listEl.innerHTML = `<div style="text-align:center;color:#94a3b8;font-size:0.85rem;padding:20px;">${t('module.violations.analytics.noData', 'لا توجد بيانات')}</div>`;
            return;
        }

        if (emptyEl) emptyEl.style.display = 'none';
        canvas.style.display = '';

        // 1. رسم Doughnut Chart للمصانع
        if (!this._violCharts) this._violCharts = {};
        const prev = this._violCharts[canvasId];
        if (prev) { try { prev.destroy(); } catch(e){} }

        this._violCharts[canvasId] = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: labels.map((_, i) => factoryColors[i % factoryColors.length]),
                    borderWidth: 2,
                    borderColor: '#fff',
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '65%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => {
                                const val = ctx.parsed;
                                const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
                                return ` ${ctx.label}: ${val.toLocaleString('en-US')} (${pct}%)`;
                            }
                        }
                    }
                }
            }
        });

        // 2. قائمة التفاصيل والنسب المئوية مع الفلترة التفاعلية بالنقر
        if (listEl) {
            listEl.innerHTML = sorted.map((item, idx) => {
                const facName = item[0];
                const cnt = item[1].count;
                const fineSum = item[1].fineSum;
                const pct = total > 0 ? ((cnt / total) * 100).toFixed(1) : 0;
                const color = factoryColors[idx % factoryColors.length];
                const fineStr = fineSum > 0 ? this.formatFineAmount(fineSum) : '';

                return `
                <div class="viol-factory-item" data-factory="${Utils.escapeHTML(facName)}" title="انقر لتصفية التحليلات حسب مصنع ${Utils.escapeHTML(facName)}" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:11px 14px;cursor:pointer;transition:all 0.2s ease;box-shadow:0 1px 3px rgba(0,0,0,0.03);" onmouseover="this.style.background='#fdf2f8';this.style.borderColor='#fbcfe8';" onmouseout="this.style.background='#ffffff';this.style.borderColor='#e2e8f0';">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;">
                        <div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:0.95rem;color:#0f172a;">
                            <span style="width:12px;height:12px;border-radius:50%;background:${color};display:inline-block;flex-shrink:0;box-shadow:0 0 6px ${color};"></span>
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px;" title="${Utils.escapeHTML(facName)}">${Utils.escapeHTML(facName)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;font-size:0.88rem;">
                            <span style="font-weight:800;color:#be185d;font-size:1.05rem;">${cnt.toLocaleString('en-US')}</span>
                            <span style="color:#64748b;font-size:0.85rem;font-weight:700;">(${pct}%)</span>
                            ${fineStr ? `<span style="background:#fffbeb;color:#b45309;padding:2px 8px;border-radius:8px;font-weight:700;font-size:0.8rem;">${fineStr}</span>` : ''}
                        </div>
                    </div>
                    <div style="height:8px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                        <div style="width:${pct}%;height:100%;background:${color};border-radius:4px;transition:width 0.5s ease;"></div>
                    </div>
                </div>`;
            }).join('');

            // ربط أحداث النقر على المصنع في القائمة
            listEl.querySelectorAll('.viol-factory-item').forEach(el => {
                el.addEventListener('click', () => {
                    const fac = el.getAttribute('data-factory');
                    const select = document.getElementById('viol-af-factory');
                    if (select) {
                        select.value = select.value === fac ? '' : fac;
                        this.updateViolationAnalytics();
                    }
                });
            });
        }
    },

    // ── مساعد: رسم Doughnut ──
    _vDrawDoughnut(canvasId, labels, data, colors) {
        const canvas  = document.getElementById(canvasId);
        const emptyEl = document.getElementById(canvasId + '-empty');
        if (!canvas) return;
        if (!data.length || data.reduce((a,b)=>a+b,0) === 0) {
            canvas.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
            return;
        }
        if (emptyEl) emptyEl.style.display = 'none';
        canvas.style.display = '';
        const total = data.reduce((a,b)=>a+b,0);
        if (!this._violCharts) this._violCharts = {};
        const prev = this._violCharts[canvasId];
        if (prev) { try { prev.destroy(); } catch(e){} }
        this._violCharts[canvasId] = new Chart(canvas, {
            type: 'doughnut',
            data: { labels, datasets: [{ data, backgroundColor: colors || this._vChartColors(data.length), borderWidth: 2, borderColor: '#fff', hoverOffset: 6 }] },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '62%',
                plugins: {
                    legend: { position:'bottom', labels:{ padding:12, font:{size:13, weight:'bold', family:"'Cairo', sans-serif"}, usePointStyle:true, boxWidth:10 } },
                    tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed.toLocaleString('en-US')} (${total>0?((ctx.parsed/total)*100).toFixed(1):0}%)` } }
                }
            }
        });
    },

    // ── مساعد: رسم HBar ──
    _vDrawHBar(canvasId, labels, data, color) {
        const canvas  = document.getElementById(canvasId);
        const emptyEl = document.getElementById(canvasId + '-empty');
        if (!canvas) return;
        if (!data.length || data.reduce((a,b)=>a+b,0) === 0) {
            canvas.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
            return;
        }
        if (emptyEl) emptyEl.style.display = 'none';
        canvas.style.display = '';
        if (!this._violCharts) this._violCharts = {};
        const prev = this._violCharts[canvasId];
        if (prev) { try { prev.destroy(); } catch(e){} }
        this._violCharts[canvasId] = new Chart(canvas, {
            type: 'bar',
            data: { labels, datasets: [{ data, backgroundColor: color || 'rgba(220,38,38,0.75)', borderRadius: 5, borderSkipped: false }] },
            options: {
                indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                plugins: { legend:{display:false}, tooltip:{ callbacks:{ label: ctx => ` ${ctx.parsed.x.toLocaleString('en-US')}` } } },
                scales: {
                    x: { beginAtZero:true, ticks:{ precision:0, font:{size:12, weight:'bold'} }, grid:{color:'#f1f5f9'} },
                    y: { ticks:{ font:{size:12, weight:'bold', family:"'Cairo', sans-serif"}, callback: v => String(labels[v]).length>22 ? String(labels[v]).slice(0,21)+'…' : labels[v] } }
                }
            }
        });
    },

    // ── مساعد: رسم الاتجاه الزمني ──
    _vDrawTrend(canvasId, viol) {
        const canvas  = document.getElementById(canvasId);
        const emptyEl = document.getElementById(canvasId + '-empty');
        if (!canvas) return;
        const t = (key, fallback) => this._t(key, fallback);
        const lang = window.AppI18n && typeof window.AppI18n.getCurrentLang === 'function' ? window.AppI18n.getCurrentLang() : 'ar';
        const dateLocale = lang === 'en' ? 'en-US' : 'ar-SA-u-nu-latn';
        const now = new Date();
        const months = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthLabel = d.toLocaleDateString(dateLocale, { month: 'long' });
            months.push({ year:d.getFullYear(), month:d.getMonth(), label:`${monthLabel} ${d.getFullYear()}` });
        }
        const counts = months.map(m => viol.filter(v => {
            if (!v.violationDate) return false;
            const d = new Date(v.violationDate);
            return !isNaN(d.getTime()) && d.getFullYear()===m.year && d.getMonth()===m.month;
        }).length);
        if (counts.reduce((a,b)=>a+b,0) === 0) {
            canvas.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
            return;
        }
        if (emptyEl) emptyEl.style.display = 'none';
        canvas.style.display = '';
        if (!this._violCharts) this._violCharts = {};
        const prev = this._violCharts[canvasId];
        if (prev) { try { prev.destroy(); } catch(e){} }
        this._violCharts[canvasId] = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: months.map(m=>m.label),
                datasets: [
                    { label:t('module.violations.analytics.chart.violationCount', 'عدد المخالفات'), data:counts, backgroundColor: counts.map(c => c===Math.max(...counts) ? 'rgba(220,38,38,0.85)' : 'rgba(220,38,38,0.5)'), borderRadius:6, borderSkipped:false, order:1 },
                    { label:t('module.violations.analytics.chart.trendLine', 'الاتجاه'), data:counts, type:'line', borderColor:'rgba(139,92,246,0.9)', backgroundColor:'rgba(139,92,246,0.08)', borderWidth:2.5, pointRadius:4, pointBackgroundColor:'#8b5cf6', tension:0.4, fill:true, order:0 }
                ]
            },
            options: {
                responsive:true, maintainAspectRatio:false,
                plugins:{ legend:{position:'top',labels:{usePointStyle:true,font:{size:11}}}, tooltip:{mode:'index',intersect:false} },
                scales:{ x:{grid:{display:false},ticks:{font:{size:10},maxRotation:45}}, y:{beginAtZero:true,ticks:{precision:0,font:{size:11}},grid:{color:'#f8fafc'}} }
            }
        });
    },

    // ── مساعد: رسم الغرامات حسب النوع ──
    _vDrawFinesByType(canvasId, viol) {
        const canvas  = document.getElementById(canvasId);
        const emptyEl = document.getElementById(canvasId + '-empty');
        if (!canvas) return;
        const withFines = viol.filter(v => (Number(v.fineAmount)||0) > 0);
        if (!withFines.length) {
            canvas.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
            return;
        }
        if (emptyEl) emptyEl.style.display = 'none';
        canvas.style.display = '';
        const map = {};
        withFines.forEach(v => {
            const t = String(v.violationType||'غير محدد').trim();
            map[t] = (map[t]||0) + (Number(v.fineAmount)||0);
        });
        const entries = Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,10);
        const labels  = entries.map(e=>e[0]);
        // ✅ تحويل القيم إلى العملة المختارة (EGP افتراضي أو USD)
        const currency = this.getCurrentCurrency();
        const currencyLabel = this.getCurrencyLabel('long');
        const data = entries.map(e => {
            const converted = this.convertFineAmount(e[1], currency);
            // الجنيه: تقريب لأقرب عدد صحيح. الدولار: منزلتان عشريتان
            return currency === 'USD' ? Number(converted.toFixed(2)) : Math.round(converted);
        });
        if (!this._violCharts) this._violCharts = {};
        const prev = this._violCharts[canvasId];
        if (prev) { try { prev.destroy(); } catch(e){} }
        // ✅ تنسيق tooltip حسب العملة (بدون كسور للجنيه، حتى منزلتين للدولار)
        const fmt = (v) => currency === 'USD'
            ? v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
            : v.toLocaleString('en-US', { maximumFractionDigits: 0 });
        this._violCharts[canvasId] = new Chart(canvas, {
            type: 'bar',
            data: { labels, datasets: [{ data, backgroundColor: 'rgba(217,119,6,0.75)', borderRadius:5, borderSkipped:false }] },
            options: {
                indexAxis:'y', responsive:true, maintainAspectRatio:false,
                plugins:{ legend:{display:false}, tooltip:{ callbacks:{ label: ctx => ` ${fmt(ctx.parsed.x)} ${currencyLabel}` } } },
                scales:{
                    x:{ beginAtZero:true, ticks:{ font:{size:11}, callback: v => fmt(v) }, grid:{color:'#f1f5f9'}, title:{display:true,text:`الغرامة الإجمالية (${currencyLabel})`,font:{size:11}} },
                    y:{ ticks:{ font:{size:11}, callback: v => String(labels[v]).length>18 ? String(labels[v]).slice(0,17)+'…' : labels[v] } }
                }
            }
        });
    },

    // ── مساعد: تحميل Chart.js ──
    async _vEnsureChartJS() {
        if (typeof Chart !== 'undefined') return true;
        const ex = document.querySelector('script[src*="chart.js"],script[src*="chartjs"]');
        if (ex) {
            return new Promise(resolve => {
                const t = setInterval(() => { if (typeof Chart !== 'undefined') { clearInterval(t); resolve(true); } }, 100);
                setTimeout(() => { clearInterval(t); resolve(false); }, 5000);
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

    // ── مساعد: ألوان احترافية ──
    _vChartColors(n) {
        const palette = ['rgba(220,38,38,0.8)','rgba(245,158,11,0.8)','rgba(16,185,129,0.8)','rgba(99,102,241,0.8)','rgba(249,115,22,0.8)','rgba(139,92,246,0.8)','rgba(59,130,246,0.8)','rgba(236,72,153,0.8)','rgba(20,184,166,0.8)','rgba(168,85,247,0.8)'];
        return Array.from({length:n}, (_,i) => palette[i % palette.length]);
    },

    async _loadReportPdfLib_(src, checkFn) {
        if (checkFn()) return true;
        return new Promise((resolve) => {
            const existing = Array.from(document.querySelectorAll('script[src]'))
                .find((s) => String(s.src || '').includes(src));
            if (existing) {
                const done = () => resolve(!!checkFn());
                existing.addEventListener('load', done, { once: true });
                setTimeout(done, 4000);
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => resolve(!!checkFn());
            script.onerror = () => resolve(false);
            document.head.appendChild(script);
        });
    },

    async _ensureReportPdfLibs_() {
        const html2canvasOk = await this._loadReportPdfLib_(
            'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
            () => typeof html2canvas !== 'undefined'
        );
        const jsPdfOk = await this._loadReportPdfLib_(
            'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
            () => typeof window.jspdf !== 'undefined'
        );
        return html2canvasOk && jsPdfOk;
    },

    /** أنماط عربية آمنة لـ PDF — منع تفكيك الحروف (letter-spacing) */
    _AR_PDF_TEXT_STYLE_: "font-family:'Cairo','Tahoma','Segoe UI',sans-serif;direction:rtl;unicode-bidi:embed;letter-spacing:0;word-spacing:normal;",

    _stripScriptsFromHtml_(htmlContent) {
        return String(htmlContent || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    },

    async _preloadCairoFontForPdf_() {
        if (!document.getElementById('viol-cairo-font-link')) {
            const link = document.createElement('link');
            link.id = 'viol-cairo-font-link';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap';
            document.head.appendChild(link);
        }
        try {
            if (document.fonts && typeof document.fonts.load === 'function') {
                await document.fonts.load("400 14px Cairo");
                await document.fonts.load("700 20px Cairo");
                await document.fonts.ready;
            }
        } catch (_e) { /* ignore */ }
    },

    _prepareArabicPdfHtml_(htmlContent) {
        const arabicFix = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<style id="violations-arabic-pdf-fix">
    html, body {
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', 'Arial', sans-serif !important;
        direction: rtl !important;
        unicode-bidi: embed;
        letter-spacing: 0 !important;
        word-spacing: normal !important;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    body *, .report-wrapper, .report-wrapper * {
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', 'Arial', sans-serif !important;
        letter-spacing: 0 !important;
        word-spacing: normal !important;
    }
    h1, h2, h3, .header-title-ar, .company-name, .company-name-secondary,
    .footer-bottom-text, .footer-bottom-text span, .footer-meta-item,
    th, td, .meta-label, .meta-value {
        direction: rtl !important;
        unicode-bidi: embed;
        letter-spacing: 0 !important;
        word-break: normal !important;
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', sans-serif !important;
    }
    .report-header .company-brand .company-name,
    .export-header .company-name,
    .att-report-brand-name,
    .ptw-paper-header-company,
    .card-header .company-name {
        white-space: nowrap !important;
        word-break: keep-all !important;
        overflow-wrap: normal !important;
    }
    .report-header {
        grid-template-columns: minmax(240px, 1.45fr) minmax(280px, 1.75fr) minmax(88px, 120px) !important;
        gap: 14px !important;
    }
    table, thead, tbody, tr, th, td { direction: rtl !important; }
    .header-info h1 { letter-spacing: 0 !important; }
</style>`;
        const cleaned = this._stripScriptsFromHtml_(htmlContent);
        if (!cleaned) return arabicFix;
        if (cleaned.includes('</head>')) {
            return cleaned.replace('</head>', `${arabicFix}</head>`);
        }
        return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${arabicFix}</head><body>${cleaned}</body></html>`;
    },

    async _waitArabicPdfFontsReady_(doc) {
        if (!doc || !doc.fonts || typeof doc.fonts.load !== 'function') return;
        try {
            await Promise.all([
                doc.fonts.load("400 12px Cairo"),
                doc.fonts.load("600 14px Cairo"),
                doc.fonts.load("700 18px Cairo"),
                doc.fonts.load("800 24px Cairo")
            ]);
            await doc.fonts.ready;
        } catch (_e) { /* ignore */ }
    },

    /**
     * تحويل HTML كامل إلى PDF وتحميله مباشرة (بدون نافذة طباعة)
     */
    async _captureHtmlToCanvas_(root, opts = {}) {
        const baseOpts = {
            scale: 2.5,
            backgroundColor: '#ffffff',
            logging: false,
            windowWidth: Math.max(root.scrollWidth, 900),
            windowHeight: Math.max(root.scrollHeight, 1),
            scrollX: 0,
            scrollY: 0
        };
        const attempts = [
            { ...baseOpts, useCORS: true, allowTaint: false },
            { ...baseOpts, useCORS: true, allowTaint: true },
            { ...baseOpts, useCORS: false, allowTaint: true }
        ];
        let lastError = null;
        for (let i = 0; i < attempts.length; i++) {
            try {
                const canvas = await html2canvas(root, attempts[i]);
                if (canvas && canvas.width > 0 && canvas.height > 0) {
                    return canvas;
                }
            } catch (err) {
                lastError = err;
            }
        }
        if (lastError) throw lastError;
        return null;
    },

    async _downloadHtmlReportAsPdf(htmlContent, fileName = 'report.pdf') {
        const libsReady = await this._ensureReportPdfLibs_();
        if (!libsReady || typeof html2canvas === 'undefined' || !window.jspdf) {
            return false;
        }

        await this._preloadCairoFontForPdf_();
        const preparedHtml = this._prepareArabicPdfHtml_(htmlContent);
        const pdfFileName = String(fileName || 'report.pdf').toLowerCase().endsWith('.pdf')
            ? String(fileName)
            : `${String(fileName)}.pdf`;

        const iframe = document.createElement('iframe');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.style.cssText = 'position:fixed;left:-100000px;top:0;width:900px;height:1200px;border:0;visibility:hidden;';
        document.body.appendChild(iframe);

        try {
            iframe.srcdoc = preparedHtml;
            await new Promise((resolve) => {
                iframe.onload = resolve;
                iframe.onerror = resolve;
                setTimeout(resolve, 6000);
            });

            const iDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iDoc) return false;

            await this._waitArabicPdfFontsReady_(iDoc);

            const images = Array.from(iDoc.images || []);
            await Promise.all(images.map((img) => new Promise((resolve) => {
                if (img.complete) return resolve();
                img.onload = resolve;
                img.onerror = resolve;
                setTimeout(resolve, 3000);
            })));

            const root = iDoc.querySelector('.report-wrapper') || iDoc.body;
            if (!root) return false;

            const canvas = await this._captureHtmlToCanvas_(root);
            if (!canvas) return false;

            const pdf = Utils.PdfExport.createPdf({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            if (!pdf) return false;
            Utils.PdfExport.appendCanvasAsPdfPages(pdf, canvas, { marginMm: 8 });
            Utils.PdfExport.savePdf(pdf, pdfFileName);
            return true;
        } catch (error) {
            Utils.safeWarn('فشل تحميل تقرير PDF:', error);
            return false;
        } finally {
            iframe.remove();
        }
    },

    // ── تصدير لوحة المخالفات PDF ──
    _getViolAnalyticsPeriodLabel_() {
        const map = { '30': '30 يوم', '90': '3 أشهر', '180': '6 أشهر', '365': 'سنة', '0': 'الكل' };
        return map[String(this._violPeriod || '0')] || 'الكل';
    },

    _buildViolAnalyticsExportLegend_() {
        const esc = (v) => (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML(v) : String(v ?? '');
        const period = esc(this._getViolAnalyticsPeriodLabel_());
        const countText = esc(document.getElementById('viol-filter-count')?.textContent?.trim() || '');
        const exportDate = esc(new Date().toLocaleString('ar-SA-u-nu-latn', { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric' }));
        return `
        <div class="ia-export-legend" dir="rtl" style="margin-top:12px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;page-break-inside:avoid;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
            <div style="font-weight:700;font-size:12px;color:#475569;margin-bottom:10px;">ملخص التقرير</div>
            <div style="display:flex;flex-wrap:wrap;gap:10px 18px;font-size:11px;line-height:1.55;color:#334155;">
                <div><strong style="color:#64748b;">الفترة:</strong> ${period}</div>
                ${countText ? `<div><strong style="color:#64748b;">السجلات:</strong> ${countText}</div>` : ''}
                <div><strong style="color:#64748b;">تاريخ التصدير:</strong> ${exportDate}</div>
            </div>
        </div>`;
    },

    async _vExportPDF() {
        const captureRoot = document.getElementById('viol-analytics-capture');
        if (!captureRoot) return;
        const btn = document.getElementById('viol-export-pdf-btn');
        const origHtml = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; }
        try {
            await this._ensureReportPdfLibs_();
            if (typeof html2canvas === 'undefined') {
                throw new Error('html2canvas unavailable');
            }

            const filterPanel = document.getElementById('viol-filter-panel');
            const wasVisible = filterPanel && filterPanel.style.display !== 'none';
            if (wasVisible) filterPanel.style.display = 'none';

            const scale = Utils.PdfExport.getOptimalCaptureScale(
                captureRoot.scrollWidth,
                captureRoot.scrollHeight,
                Utils.PdfExport.DEFAULT_CAPTURE_SCALE
            );
            const canvas = await html2canvas(captureRoot, {
                scale,
                useCORS: true,
                backgroundColor: '#f8fafc',
                scrollX: 0,
                scrollY: 0,
                logging: false
            });
            if (wasVisible) filterPanel.style.display = '';

            const { dataUrl } = Utils.PdfExport.compressCanvasToJpegDataUrl(canvas, Utils.PdfExport.TARGET_MAX_BYTES);
            
            const formTitleAr = 'تقرير تحليلات ومؤشرات أداء المخالفات';
            const formTitleEn = 'Violations Performance Analytics & Incident Metrics KPI Report';
            const legendHtml = this._buildViolAnalyticsExportLegend_();

            const fullContent = `
                <div class="report-page landscape">
                    ${this.getIsoPrintHeaderHtml(formTitleAr, formTitleEn, 'DOC-HSE-VIO-KPI-01', 'Rev. 03', 'سري وداخلي')}

                    <div style="margin: 0 auto 12px auto; max-width: 100%; text-align: center;">
                        <img src="${dataUrl}" alt="Violations Analytics Dashboard" style="width: 100%; max-width: 100%; height: auto; display: block; border-radius: 8px; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
                    </div>

                    ${legendHtml ? `<div style="margin-top: 8px;">${legendHtml}</div>` : ''}

                    <div class="signatures-grid">
                        <div class="sig-card">
                            <div class="sig-card-title">إعداد وتحليل البيانات</div>
                            <div class="sig-card-name">مسؤول الإحصاء ومؤشرات السلامة</div>
                            <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">المراجعة والتدقيق الإداري</div>
                            <div class="sig-card-name">رئيس قسم السلامة والصحة المهنية</div>
                            <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">الاعتماد الرسمي</div>
                            <div class="sig-card-name">مدير إدارة السلامة والصحة المهنية والبيئة</div>
                            <div class="sig-line-area">الاعتماد والختم: ............................</div>
                        </div>
                    </div>

                    ${this.getIsoPrintFooterHtml('DOC-HSE-VIO-KPI-01', 'Rev. 03', 'ISO 45001:2018 (Clause 9.1)')}
                </div>
            `;

            const fileName = `Violations-Analysis-${new Date().toISOString().slice(0, 10)}.pdf`;
            await this.downloadIsoReportAsPdf(formTitleAr, fullContent, fileName, true);
        } catch (err) {
            console.error('PDF export error:', err);
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('تعذّر تصدير PDF — تأكد من الاتصال بالإنترنت');
            }
        } finally {
            if (btn) { btn.disabled = false; btn.innerHTML = origHtml; }
        }
    },

        // ── ربط أحداث لوحة التحليل ──
    _vBindAnalyticsEvents() {
        const root = document.getElementById('viol-analytics-root');
        if (!root) return;

        // أزرار الفترة
        root.querySelectorAll('.viol-period-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this._violPeriod = btn.getAttribute('data-period');
                root.querySelectorAll('.viol-period-btn').forEach(b => {
                    const active = b === btn;
                    b.style.background = active ? '#fff' : 'rgba(255,255,255,0.15)';
                    b.style.color      = active ? '#991b1b' : '#fff';
                });
                this.updateViolationAnalytics();
            });
        });

        // زر تحديث
        const refreshBtn = document.getElementById('viol-analytics-refresh');
        if (refreshBtn) refreshBtn.addEventListener('click', () => this.updateViolationAnalytics());

        // زر تصدير PDF
        const pdfBtn = document.getElementById('viol-export-pdf-btn');
        if (pdfBtn) pdfBtn.addEventListener('click', () => this._vExportPDF());

        // زر تبديل لوحة الفلاتر
        const toggleBtn  = document.getElementById('viol-toggle-filters-btn');
        const filterPanel = document.getElementById('viol-filter-panel');
        if (toggleBtn && filterPanel) {
            toggleBtn.addEventListener('click', () => {
                const isOpen = filterPanel.style.display !== 'none';
                filterPanel.style.display = isOpen ? 'none' : 'block';
                toggleBtn.style.background = isOpen ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.35)';
            });
        }

        // زر إعادة تعيين الفلاتر
        const resetBtn = document.getElementById('viol-filter-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                ['viol-af-factory','viol-af-ptype','viol-af-type','viol-af-sev','viol-af-status','viol-af-loc','viol-af-rca'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.value = '';
                });
                this.updateViolationAnalytics();
            });
        }

        // قوائم الفلاتر
        ['viol-af-factory','viol-af-ptype','viol-af-type','viol-af-sev','viol-af-status','viol-af-loc','viol-af-rca'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', () => this.updateViolationAnalytics());
        });

        // ✅ التفاعلية المباشرة لكروت KPI عند النقر
        root.querySelectorAll('.viol-kpi-card').forEach(card => {
            card.addEventListener('click', () => {
                const kpi = card.getAttribute('data-kpi');
                if (kpi === 'total') {
                    ['viol-af-factory','viol-af-ptype','viol-af-type','viol-af-sev','viol-af-status','viol-af-loc','viol-af-rca'].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.value = '';
                    });
                } else if (kpi === 'employees') {
                    const el = document.getElementById('viol-af-ptype');
                    if (el) el.value = el.value === 'employee' ? '' : 'employee';
                } else if (kpi === 'contractors') {
                    const el = document.getElementById('viol-af-ptype');
                    if (el) el.value = el.value === 'contractor' ? '' : 'contractor';
                } else if (kpi === 'highSev') {
                    const el = document.getElementById('viol-af-sev');
                    if (el) el.value = el.value === 'عالية' ? '' : 'عالية';
                } else if (kpi === 'resolved') {
                    const el = document.getElementById('viol-af-status');
                    if (el) el.value = el.value === 'محلول' ? '' : 'محلول';
                } else if (kpi === 'unresolved') {
                    const el = document.getElementById('viol-af-status');
                    if (el) el.value = el.value === 'غير محلول' ? '' : 'غير محلول';
                }
                this.updateViolationAnalytics();
            });
        });

        // ✅ أزرار تبديل العملة (EGP / USD)
        root.querySelectorAll('.viol-curr-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const newCurr = btn.getAttribute('data-curr');
                this.setCurrentCurrency(newCurr);
                // تحديث الأنماط البصرية فوراً
                root.querySelectorAll('.viol-curr-btn').forEach(b => {
                    const active = b.getAttribute('data-curr') === newCurr;
                    b.style.background = active ? '#fff' : 'transparent';
                    b.style.color = active ? '#991b1b' : '#fff';
                });
                // إعادة رسم التحليلات بالعملة الجديدة
                this.updateViolationAnalytics();
            });
        });

        // ✅ زر تعديل سعر الصرف
        const rateBtn = document.getElementById('viol-curr-rate-btn');
        if (rateBtn) {
            rateBtn.addEventListener('click', () => {
                const current = this.getExchangeRate();
                const input = window.prompt(
                    `أدخل سعر صرف الدولار (كم جنيه مصري يساوي 1 دولار أمريكي):\n\nالسعر الحالي: ${current} جنيه = 1 دولار`,
                    String(current)
                );
                if (input === null) return; // إلغاء
                const newRate = parseFloat(String(input).trim());
                if (!Number.isFinite(newRate) || newRate <= 0) {
                    if (typeof Notification !== 'undefined' && Notification.error) {
                        Notification.error('سعر صرف غير صالح');
                    } else {
                        alert('سعر صرف غير صالح');
                    }
                    return;
                }
                this.setExchangeRate(newRate);
                if (typeof Notification !== 'undefined' && Notification.success) {
                    Notification.success(`تم تحديث سعر الصرف إلى ${newRate} جنيه = 1 دولار`);
                }
                this.updateViolationAnalytics();
            });
        }
    },

    /**
     * تحميل قائمة المقاولين في select element
     * @param {HTMLElement} selectElement - عنصر select المراد تحميل المقاولين فيه
     * @param {string} selectedValue - القيمة المحددة مسبقاً (اسم المقاول)
     * @param {string} selectedContractorId - معرف المقاول المحدد مسبقاً
     */
    loadContractorsIntoSelect(selectElement, selectedValue = '', selectedContractorId = '') {
        if (!selectElement || selectElement.tagName !== 'SELECT') {
            Utils.safeWarn('⚠️ loadContractorsIntoSelect: عنصر select غير صالح');
            return;
        }

        // ✅ مصدر موحّد: استخدام Contractors مباشرة (بدون الاعتماد على Clinic)
        if (typeof Contractors !== 'undefined' && typeof Contractors.populateContractorSelect === 'function') {
            Contractors.populateContractorSelect(selectElement, {
                placeholder: '-- اختر المقاول --',
                selectedValue,
                selectedContractorId,
                valueMode: 'name', // نموذج المخالفة يحفظ الاسم + contractorId في dataset
                showServiceType: true,
                includeSuppliers: true,
                approvedOnly: false // ✅ إصلاح: تضمين جميع المقاولين (بما فيهم غير المعتمدين)
            });
            return;
        }

        // بديل محسّن: تحميل جميع المقاولين من AppState
        let contractors = [];

        // محاولة استخدام الدالة المساعدة الجديدة أولاً
        if (typeof Contractors !== 'undefined' && typeof Contractors.getAllContractorsForModules === 'function') {
            try {
                const allContractors = Contractors.getAllContractorsForModules();
                if (allContractors && allContractors.length > 0) {
                    const contractorMap = new Map(); // لإزالة التكرار
                    allContractors.forEach(contractor => {
                        const name = (contractor.name || '').trim();
                        if (!name || name === 'غير معروف') return;

                        // ✅ إصلاح: إزالة التكرار بشكل صحيح (code → id → name)
                        const code = ((contractor.code || contractor.isoCode || '') + '').trim().toUpperCase();
                        const lic = ((contractor.licenseNumber || '') + '').trim();
                        const key = (/^CON-\d+$/i.test(code) ? `CODE:${code}` : (lic ? `LIC:${lic}` : (contractor.id ? `ID:${contractor.id}` : `NAME:${name.toLowerCase()}`)));

                        if (!contractorMap.has(key)) {
                            contractorMap.set(key, {
                                id: contractor.id || '',
                                name: name,
                                serviceType: (contractor.serviceType || '').trim(),
                                licenseNumber: (contractor.licenseNumber || '').trim()
                            });
                        }
                    });
                    contractors = Array.from(contractorMap.values())
                        .sort((a, b) => {
                            const nameA = a.name.toLowerCase();
                            const nameB = b.name.toLowerCase();
                            return nameA.localeCompare(nameB, 'ar', { sensitivity: 'base' });
                        });
                }
            } catch (error) {
                Utils.safeWarn('⚠️ خطأ في الحصول على المقاولين من getAllContractorsForModules:', error);
            }
        }

        // بديل: استخدام getApprovedOptions
        if (contractors.length === 0 && typeof Contractors !== 'undefined' && typeof Contractors.getApprovedOptions === 'function') {
            try {
                const approved = Contractors.getApprovedOptions(false);
                if (approved && approved.length > 0) {
                    contractors = approved.map(item => ({
                        id: item.id || item.contractorId || '',
                        name: (item.name || '').trim(),
                        serviceType: (item.serviceType || '').trim(),
                        licenseNumber: (item.licenseNumber || '').trim()
                    })).filter(c => c.name); // تصفية المقاولين بدون أسماء
                }
            } catch (error) {
                Utils.safeWarn('⚠️ خطأ في الحصول على المقاولين المعتمدة:', error);
            }
        }

        // ✅ إذا لم توجد مقاولين، استخدم المقاولين المعتمدين النشطين من AppState
        if (contractors.length === 0) {
            const allContractors = AppState.appData.approvedContractors || [];
            const contractorMap = new Map(); // لإزالة التكرار

            allContractors
                .filter(c => c && (c.companyName || c.name) && c.isActive !== 'inactive' && c.isActive !== false && c.isActive !== 'false' && c.isActive !== 'FALSE') // تصفية غير النشطين
                .forEach(contractor => {
                    const name = (contractor.companyName || contractor.name || '').trim();
                    if (!name || name === 'غير معروف') return;

                    // إزالة التكرار بناءً على الاسم
                    if (!contractorMap.has(name)) {
                        contractorMap.set(name, {
                            id: contractor.id || '',
                            name: name,
                            serviceType: (contractor.serviceType || '').trim(),
                            licenseNumber: (contractor.licenseNumber || contractor.contractNumber || '').trim()
                        });
                    }
                });

            contractors = Array.from(contractorMap.values())
                .sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    return nameA.localeCompare(nameB, 'ar', { sensitivity: 'base' });
                });
        }

        // مسح الخيارات الحالية
        selectElement.innerHTML = '<option value="">-- اختر المقاول --</option>';

        // استخدام DocumentFragment لتحسين الأداء
        const fragment = document.createDocumentFragment();
        let selectedOption = null;

        // إضافة المقاولين
        contractors.forEach(contractor => {
            if (!contractor || !contractor.name) return;

            const option = document.createElement('option');
            option.value = contractor.name; // القيمة الأصلية للاستخدام في value
            option.textContent = contractor.name; // textContent آمن تلقائياً من XSS
            if (contractor.serviceType) {
                option.textContent += ` - ${contractor.serviceType}`;
            }
            option.dataset.contractorId = contractor.id || '';

            // تحديد القيمة المحددة مسبقاً
            if (selectedValue && contractor.name === selectedValue) {
                option.selected = true;
                selectedOption = option;
            } else if (selectedContractorId && contractor.id === selectedContractorId) {
                option.selected = true;
                selectedOption = option;
            }

            fragment.appendChild(option);
        });

        selectElement.appendChild(fragment);

        // إذا لم يتم العثور على القيمة المحددة، حاول تعيينها يدوياً
        if (selectedValue && !selectedOption && selectElement.value !== selectedValue) {
            try {
                selectElement.value = selectedValue;
            } catch (e) {
                // القيمة غير موجودة في القائمة
                Utils.safeWarn('⚠️ المقاول المحدد غير موجود في القائمة:', selectedValue);
            }
        }
    },

    async showViolationForm(violationDataOrId = null) {
        // دعم تمرير ID أو كائن كامل
        let violationData = null;
        if (typeof violationDataOrId === 'string') {
            // إذا تم تمرير ID، نبحث عن البيانات
            violationData = AppState.appData.violations?.find(v => v.id === violationDataOrId) || null;
        } else if (typeof violationDataOrId === 'object') {
            violationData = violationDataOrId;
        }
        violationData = this.normalizeViolationRecord(violationData);
        if (violationData && !this.isViolationVisibleToCurrentUser(violationData)) {
            if (typeof Notification !== 'undefined') {
                Notification.error('عذراً، ليس لديك صلاحية لمشاهدة أو تعديل مخالفات تابعة لإدارة أخرى');
            }
            return;
        }
        const effectiveFineForForm = violationData ? this.getEffectiveFineAmount(violationData) : 0;
        const isEdit = !!violationData;
        const recordPersonType = String(violationData?.personType || '').trim().toLowerCase();
        const isContractorRecord = recordPersonType === 'contractor' || (!!violationData?.contractorName && !violationData?.employeeName);
        const isEmployeeRecord = !isContractorRecord;
        const selectedLocationValue = String(violationData?.violationLocationId || violationData?.violationLocation || '').trim();
        const selectedPlaceValue = String(violationData?.violationPlaceId || violationData?.violationPlace || '').trim();

        // التحقق من وجود ViolationTypesManager
        let violationTypes = [];
        if (typeof ViolationTypesManager !== 'undefined' && ViolationTypesManager.ensureInitialized && ViolationTypesManager.getAll) {
            try {
                ViolationTypesManager.ensureInitialized();
                violationTypes = ViolationTypesManager.getAll();
            } catch (vtError) {
                Utils.safeWarn('⚠️ خطأ في الحصول على أنواع المخالفات:', vtError);
                violationTypes = AppState?.appData?.violationTypes || [];
            }
        } else {
            violationTypes = AppState?.appData?.violationTypes || [];
        }
        const selectedTypeId = violationData?.violationTypeId || '';
        const selectedTypeName = (violationData?.violationType || '').trim();
        const currentUserRole = (AppState?.currentUser?.role || '').toString().trim().toLowerCase();
        const canManagerEditFineAmount = ['admin', 'manager', 'مدير', 'مدير النظام', 'system-manager', 'system_admin'].includes(currentUserRole);
        const typeOptions = violationTypes.map(type => {
            const isSelected = selectedTypeId
                ? type.id === selectedTypeId
                : type.name === selectedTypeName;
            const typeFineAmount = Number(type?.fineAmount || 0);
            return `
                <option value="${Utils.escapeHTML(type.name)}" data-type-id="${Utils.escapeHTML(type.id)}" data-fine-amount="${typeFineAmount}" ${isSelected ? 'selected' : ''}>
                    ${Utils.escapeHTML(type.name)}
                </option>
            `;
        }).join('');
        const hasSelectedType = violationTypes.some(type => selectedTypeId
            ? type.id === selectedTypeId
            : type.name === selectedTypeName);
        const legacyTypeOption = !hasSelectedType && selectedTypeName
            ? `
                <option value="${Utils.escapeHTML(selectedTypeName)}" data-type-id="${Utils.escapeHTML(selectedTypeId)}" data-fine-amount="${Number(effectiveFineForForm)}" selected>
                    ${Utils.escapeHTML(selectedTypeName)} (غير معرف)
                </option>
            `
            : '';
        // تجهيز قوائم الإكمال التلقائي لعمالة المقاولين
        const contractorWorkerNames = Array.from(new Set(
            (AppState.appData?.violations || [])
                .map(v => (v.contractorWorker || '').trim())
                .filter(w => w && w !== 'غير محدد')
        )).sort((a, b) => a.localeCompare(b, 'ar'));
        const workerDatalistHtml = contractorWorkerNames.map(w => `<option value="${Utils.escapeHTML(w)}"></option>`).join('');

        // المسميات الوظيفية القياسية والتاريخية للعمالة
        const standardPositions = [
            'عامل عادي',
            'فني كهرباء',
            'فني ميكانيكا',
            'لحام / براد',
            'فني سقالات',
            'مشرف سقالات',
            'مشغل رافعة شوكية',
            'سائق معدات ثقيلة',
            'مشرف سلامة وصحة مهنية',
            'مراقب حريق (Fire Watcher)',
            'فني دهان وعزل',
            'فني مدني وبناء',
            'مساعد فني / شيال'
        ];
        const pastPositions = (AppState.appData?.violations || [])
            .map(v => (v.contractorPosition || '').trim())
            .filter(Boolean);
        const allPositions = Array.from(new Set([...standardPositions, ...pastPositions]))
            .sort((a, b) => a.localeCompare(b, 'ar'));
        const positionDatalistHtml = allPositions.map(p => `<option value="${Utils.escapeHTML(p)}"></option>`).join('');

        // إدارات النظام المعتمدة لمخالفة المقاول (مطابقة حصراً لقائمة الإدارات الرسمية بالنظام)
        const systemDepts = this.getSystemDepartmentOptions();
        const contractorDeptOptions = systemDepts.map(d => {
            const isSel = violationData?.contractorDepartment === d;
            return `<option value="${Utils.escapeHTML(d)}" ${isSel ? 'selected' : ''}>${Utils.escapeHTML(d)}</option>`;
        }).join('');

        // افتراضات التاريخ والوقت (تاريخ اليوم والوقت الحالي للمخالفة الجديدة)
        const todayStr = new Date().toISOString().slice(0, 10);
        const currentTimeStr = new Date().toTimeString().slice(0, 5);
        const formDateValue = violationData?.violationDate 
            ? new Date(violationData.violationDate).toISOString().slice(0, 10) 
            : todayStr;
        const formTimeValue = violationData?.violationTime || currentTimeStr;

        const initialPhoto1 = violationData?.photo || (Array.isArray(violationData?.photos) && violationData.photos.length > 0 ? violationData.photos[0] : '') || '';
        const initialPhoto2 = violationData?.photo2 || (Array.isArray(violationData?.photos) && violationData.photos.length > 1 ? violationData.photos[1] : '') || '';

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'violation-modal-overlay';
        modal.innerHTML = `
            <style>
                #violation-modal-overlay .form-input,
                #violation-modal-overlay select.form-input,
                #violation-modal-overlay input[type="text"].form-input,
                #violation-modal-overlay input[type="date"].form-input,
                #violation-modal-overlay input[type="time"].form-input,
                #violation-modal-overlay input[type="number"].form-input {
                    box-sizing: border-box !important;
                    min-height: 44px !important;
                    height: 44px !important;
                    padding-top: 6px !important;
                    padding-bottom: 6px !important;
                    padding-right: 12px !important;
                    padding-left: 12px !important;
                    font-size: 0.92rem !important;
                    line-height: 1.5 !important;
                    border-radius: 10px !important;
                    border: 1.5px solid #cbd5e1 !important;
                    background-color: #ffffff !important;
                    color: #0f172a !important;
                    display: block !important;
                    width: 100% !important;
                    outline: none !important;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
                }
                #violation-modal-overlay select.form-input {
                    padding-right: 12px !important;
                    padding-left: 32px !important;
                    appearance: auto !important;
                    -webkit-appearance: menulist !important;
                    -moz-appearance: menulist !important;
                    cursor: pointer !important;
                }
                #violation-modal-overlay textarea.form-input {
                    box-sizing: border-box !important;
                    min-height: 85px !important;
                    height: auto !important;
                    padding: 10px 14px !important;
                    font-size: 0.92rem !important;
                    line-height: 1.55 !important;
                    border-radius: 10px !important;
                    border: 1.5px solid #cbd5e1 !important;
                    background-color: #ffffff !important;
                    color: #0f172a !important;
                    display: block !important;
                    width: 100% !important;
                    resize: vertical !important;
                    outline: none !important;
                }
                #violation-modal-overlay .form-input:focus {
                    border-color: #2563eb !important;
                    box-shadow: 0 0 0 3.5px rgba(37, 99, 235, 0.18) !important;
                }
                @media (max-width: 768px) {
                    #violation-modal-overlay .v-contractor-row-1,
                    #violation-modal-overlay .v-contractor-row-2,
                    #violation-modal-overlay .v-employee-row-2 {
                        grid-template-columns: 1fr !important;
                        gap: 16px !important;
                    }
                }
            </style>
            <div class="modal-content" style="max-width: 880px; max-height: 92vh; display: flex; flex-direction: column; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.35); border: 1px solid #cbd5e1;">
                <!-- شريط الهوية المؤسسية العلوية (Corporate Identity Ribbon) -->
                <div style="height: 5px; width: 100%; background: linear-gradient(90deg, #1d4ed8 0%, #38bdf8 35%, #fbbf24 70%, #10b981 100%);"></div>

                <!-- رأس النموذج التنفيذي -->
                <div class="modal-header" style="background: linear-gradient(135deg, #0b1329 0%, #1e293b 60%, #0f172a 100%); color: #ffffff; padding: 18px 24px; border-bottom: 2px solid #2563eb; display: flex; align-items: center; justify-content: space-between; position: relative;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg, rgba(37, 99, 235, 0.25) 0%, rgba(245, 158, 11, 0.22) 100%); border: 1.5px solid rgba(245, 158, 11, 0.45); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);">
                            <i class="fas fa-shield-halved" style="color: #fbbf24; font-size: 1.35rem;"></i>
                        </div>
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <h2 style="font-size: 1.18rem; font-weight: 800; color: #ffffff; margin: 0; letter-spacing: -0.2px;">
                                    ${isEdit ? 'تعديل بيانات المخالفة المسجلة' : 'تسجيل مخالفة ميدانية جديدة'}
                                </h2>
                                <span style="font-size: 0.70rem; font-weight: 800; color: #38bdf8; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.35); padding: 2px 7px; border-radius: 5px;">
                                    HSE-OFFICIAL
                                </span>
                            </div>
                            <p style="margin: 3px 0 0 0; font-size: 0.80rem; color: #cbd5e1; font-weight: 500; display: flex; align-items: center; gap: 6px;">
                                <span style="color: #60a5fa; font-weight: 700;">منظومة إدارة السلامة والصحة المهنية والبيئة (QHSE)</span>
                                <span style="color: #64748b;">•</span>
                                <span>سجل توثيق المخالفات الميدانية المعتمد</span>
                            </p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="hidden sm:flex" style="flex-direction: column; align-items: flex-end; gap: 2px; text-align: left;">
                            <span style="font-size: 0.72rem; font-weight: 800; color: #38bdf8; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(56, 189, 248, 0.25); padding: 2px 8px; border-radius: 6px; letter-spacing: 0.5px; font-family: monospace;">
                                HSE-VIO-01
                            </span>
                            <span style="font-size: 0.66rem; color: #94a3b8; font-weight: 600;">وثيقة جودة وسلامة معتمدة</span>
                        </div>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" title="إغلاق النافذة" style="width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); color: #cbd5e1; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;">
                            <i class="fas fa-times" style="font-size: 15px;"></i>
                        </button>
                    </div>
                </div>

                <!-- جسم النموذج -->
                <div class="modal-body" style="background: #f8fafc; padding: 18px 22px; overflow-y: auto; flex: 1;">
                    <!-- ✅ شريط تنبيه داخل النموذج -->
                    <div id="violation-form-banner" class="hidden mb-4 rounded-xl border p-3.5 flex items-start gap-3" role="alert" style="font-size: 0.9rem;">
                        <i id="violation-form-banner-icon" class="fas fa-circle-info text-lg mt-0.5"></i>
                        <div class="flex-1 min-w-0">
                            <div id="violation-form-banner-title" class="font-bold mb-0.5"></div>
                            <div id="violation-form-banner-text" class="leading-relaxed"></div>
                        </div>
                        <button type="button" id="violation-form-banner-close" class="text-gray-400 hover:text-gray-700 ms-2" title="إخفاء">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <form id="violation-form" class="space-y-4">
                        <!-- البطاقة 1: بيانات الشخص المخالف -->
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); margin-bottom: 20px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-bottom: 1px solid #e2e8f0; padding: 13px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 8px; background: linear-gradient(135deg, #1d4ed8, #2563eb); color: #ffffff; font-weight: 800; font-size: 13px; box-shadow: 0 2px 4px rgba(37,99,235,0.25);">1</span>
                                    <span style="font-size: 0.96rem; font-weight: 800; color: #0f172a;">بيانات الشخص المخالف (الموظف / المقاول)</span>
                                </div>
                                <span style="font-size: 0.78rem; font-weight: 700; color: #2563eb; background: #eff6ff; border: 1px solid #dbeafe; padding: 4px 12px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                                    <i class="fas fa-bolt-lightning text-amber-500"></i> فحص ذكي فوري لسجل الجزاءات والتكرار الشهري
                                </span>
                            </div>

                            <div style="padding: 22px 20px;">
                                <!-- الصف الأول: نوع الشخص + الشركة/الكود (متباعد ومريح) -->
                                <div class="v-contractor-row-1" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px;">
                                    <div>
                                        <label for="violation-person-type" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                            <i class="fas fa-user-tag text-blue-600" style="font-size: 0.95rem;"></i>
                                            <span>نوع الشخص المخالف</span>
                                            <span style="color: #dc2626;">*</span>
                                        </label>
                                        <select id="violation-person-type" required class="form-input" style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;">
                                            <option value="">-- اختر صفة المخالف --</option>
                                            <option value="employee" ${isEmployeeRecord ? 'selected' : ''}>موظف بالشركة</option>
                                            <option value="contractor" ${isContractorRecord ? 'selected' : ''}>عمالة تابعة لمقاول</option>
                                        </select>
                                    </div>

                                    <!-- للموظف: الكود الوظيفي -->
                                    <div id="violation-employee-code-container" style="display: ${isEmployeeRecord ? 'block' : 'none'};">
                                        <label for="violation-employee-code" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                            <i class="fas fa-id-card text-indigo-600" style="font-size: 0.95rem;"></i>
                                            <span>الكود الوظيفي المخالف</span>
                                            <span style="color: #dc2626;">*</span>
                                        </label>
                                        <input type="text" id="violation-employee-code" class="form-input"
                                            value="${violationData?.employeeCode || violationData?.employeeNumber || ''}" 
                                            placeholder="أدخل الكود (جلب فوري للاسم والإدارة)..."
                                            style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;"
                                            ${isEmployeeRecord ? 'required' : ''}>
                                    </div>

                                    <!-- للمقاول: شركة المقاول -->
                                    <div id="violation-contractor-company-container" style="display: ${isContractorRecord ? 'block' : 'none'};">
                                        <label for="violation-contractor-select" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                            <i class="fas fa-building text-amber-600" style="font-size: 0.95rem;"></i>
                                            <span>شركة المقاول المعتمدة</span>
                                            <span style="color: #dc2626;">*</span>
                                        </label>
                                        <select id="violation-contractor-select" class="form-input" style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;"
                                            ${isContractorRecord ? 'required' : ''}>
                                            <option value="">-- اختر شركة المقاول --</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- تفاصيل الموظف التلقائية -->
                                <div id="violation-employee-details-grid" class="v-employee-row-2" style="display: ${isEmployeeRecord ? 'grid' : 'none'}; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 22px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
                                    <div>
                                        <label for="violation-person-name" style="display: flex; align-items: center; gap: 7px; font-size: 0.84rem; font-weight: 700; color: #475569; margin-bottom: 8px;" id="violation-person-name-label">
                                            <i class="fas fa-user text-slate-500"></i>
                                            <span>اسم الموظف</span>
                                        </label>
                                        <input type="text" id="violation-person-name" class="form-input"
                                            value="${violationData?.employeeName || ''}" 
                                            placeholder="سيتم الجلب تلقائياً" readonly
                                            style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; background: #f8fafc; border: 1.5px solid #e2e8f0; font-size: 0.94rem; font-weight: 700; color: #0f172a; width: 100%;">
                                    </div>
                                    <div id="violation-employee-position-container">
                                        <label for="violation-employee-position" style="display: flex; align-items: center; gap: 7px; font-size: 0.84rem; font-weight: 700; color: #475569; margin-bottom: 8px;">
                                            <i class="fas fa-briefcase text-slate-500"></i>
                                            <span>الوظيفة</span>
                                        </label>
                                        <input type="text" id="violation-employee-position" class="form-input"
                                            value="${violationData?.employeePosition || ''}" 
                                            placeholder="سيتم الجلب تلقائياً" readonly
                                            style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; background: #f8fafc; border: 1.5px solid #e2e8f0; font-size: 0.94rem; font-weight: 600; color: #334155; width: 100%;">
                                    </div>
                                    <div id="violation-employee-department-container">
                                        <label for="violation-employee-department" style="display: flex; align-items: center; gap: 7px; font-size: 0.84rem; font-weight: 700; color: #475569; margin-bottom: 8px;">
                                            <i class="fas fa-sitemap text-slate-500"></i>
                                            <span>الإدارة</span>
                                        </label>
                                        <input type="text" id="violation-employee-department" class="form-input"
                                            value="${violationData?.employeeDepartment || ''}" 
                                            placeholder="سيتم الجلب تلقائياً" readonly
                                            style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; background: #f8fafc; border: 1.5px solid #e2e8f0; font-size: 0.94rem; font-weight: 600; color: #334155; width: 100%;">
                                    </div>
                                </div>

                                <!-- تفاصيل عمالة المقاول الذكية: متباعدة، كبيرة، وواضحة جداً دون أي التصاق -->
                                <div id="violation-contractor-fields-container" style="display: ${isContractorRecord ? 'block' : 'none'}; margin-top: 22px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
                                    <div class="v-contractor-row-2" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px;">
                                        <div id="violation-contractor-worker-container">
                                            <label for="violation-contractor-worker" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                                <i class="fas fa-user-hard-hat text-amber-600" style="font-size: 0.95rem;"></i>
                                                <span>اسم العامل التابع للمقاول</span>
                                            </label>
                                            <input type="text" id="violation-contractor-worker" list="violation-contractor-workers-list" class="form-input"
                                                value="${violationData?.contractorWorker || ''}" 
                                                placeholder="اختر أو اكتب اسم العامل..."
                                                style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;">
                                            <datalist id="violation-contractor-workers-list">
                                                ${workerDatalistHtml}
                                            </datalist>
                                        </div>
                                        <div id="violation-contractor-position-container">
                                            <label for="violation-contractor-position" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                                <i class="fas fa-briefcase text-slate-600" style="font-size: 0.95rem;"></i>
                                                <span>مهنة / وظيفة العامل</span>
                                            </label>
                                            <input type="text" id="violation-contractor-position" list="violation-contractor-positions-list" class="form-input"
                                                value="${violationData?.contractorPosition || ''}" 
                                                placeholder="اختر أو اكتب المهنة الميدانية..."
                                                style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;">
                                            <datalist id="violation-contractor-positions-list">
                                                ${positionDatalistHtml}
                                            </datalist>
                                        </div>
                                        <div id="violation-contractor-department-container">
                                            <label for="violation-contractor-department" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                                <i class="fas fa-sitemap text-teal-600" style="font-size: 0.95rem;"></i>
                                                <span>الإدارة التابع له المقاول</span>
                                                <span style="color: #dc2626;">*</span>
                                            </label>
                                            <select id="violation-contractor-department" class="form-input" style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;">
                                                <option value="">-- اختر الإدارة التابع له المقاول --</option>
                                                ${contractorDeptOptions}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- ✅ بطاقة رصد تكرار الجزاءات الذكية (Strike Alert Card) -->
                                <div id="violation-sequence-info" class="hidden"></div>
                            </div>
                        </div>

                        <!-- البطاقة 2: الموقع وتوقيت الرصد الميداني -->
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); margin-bottom: 20px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-bottom: 1px solid #e2e8f0; padding: 13px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 8px; background: linear-gradient(135deg, #059669, #10b981); color: #ffffff; font-weight: 800; font-size: 13px; box-shadow: 0 2px 4px rgba(16,185,129,0.25);">2</span>
                                    <span style="font-size: 0.96rem; font-weight: 800; color: #0f172a;">الموقع وتوقيت الرصد الميداني</span>
                                </div>
                                <span style="font-size: 0.78rem; font-weight: 700; color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 4px 12px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                                    <i class="fas fa-location-crosshairs text-emerald-600"></i> فحص وتنبيه تلقائي لبؤر الخطر بالمنطقة
                                </span>
                            </div>

                            <div style="padding: 22px 20px;">
                                <div class="v-contractor-row-1" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px;">
                                    <!-- للموظف: الموقع والمكان -->
                                    <div id="violation-location-fields-container" class="contents" style="display: ${isEmployeeRecord ? 'contents' : 'none'};">
                                        <div>
                                            <label for="violation-employee-location" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                                <i class="fas fa-industry text-emerald-600" style="font-size: 0.95rem;"></i>
                                                <span>الموقع الرئيسي</span>
                                                <span style="color: #dc2626;">*</span>
                                            </label>
                                            <select id="violation-employee-location" class="form-input" style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;" ${isEmployeeRecord ? 'required' : ''}>
                                                <option value="">-- اختر الموقع --</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="violation-employee-place" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                                <i class="fas fa-compass text-emerald-600" style="font-size: 0.95rem;"></i>
                                                <span>مكان / منطقة المخالفة</span>
                                                <span style="color: #dc2626;">*</span>
                                            </label>
                                            <select id="violation-employee-place" class="form-input" style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;" ${isEmployeeRecord ? 'required' : ''}>
                                                <option value="">-- اختر مكان المخالفة --</option>
                                            </select>
                                            <div id="violation-employee-custom-place-box" class="hidden mt-2">
                                                <input type="text" id="violation-employee-custom-place" class="form-input" placeholder="اكتب اسم المكان المخصص بالتحديد..." style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem;">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- للمقاول: الموقع والمكان -->
                                    <div id="violation-contractor-location-fields-container" class="contents" style="display: ${isContractorRecord ? 'contents' : 'none'};">
                                        <div>
                                            <label for="violation-contractor-location" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                                <i class="fas fa-industry text-emerald-600" style="font-size: 0.95rem;"></i>
                                                <span>الموقع الرئيسي</span>
                                                <span style="color: #dc2626;">*</span>
                                            </label>
                                            <select id="violation-contractor-location" class="form-input" style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;" ${isContractorRecord ? 'required' : ''}>
                                                <option value="">-- اختر الموقع --</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="violation-contractor-place" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                                <i class="fas fa-compass text-emerald-600" style="font-size: 0.95rem;"></i>
                                                <span>مكان / منطقة المخالفة</span>
                                                <span style="color: #dc2626;">*</span>
                                            </label>
                                            <select id="violation-contractor-place" class="form-input" style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;" ${isContractorRecord ? 'required' : ''}>
                                                <option value="">-- اختر مكان المخالفة --</option>
                                            </select>
                                            <div id="violation-contractor-custom-place-box" class="hidden mt-2">
                                                <input type="text" id="violation-contractor-custom-place" class="form-input" placeholder="اكتب اسم المكان المخصص بالتحديد..." style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem;">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- التاريخ والوقت -->
                                    <div>
                                        <label for="violation-date" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                            <i class="fas fa-calendar-alt text-blue-600" style="font-size: 0.95rem;"></i>
                                            <span>تاريخ رصد المخالفة</span>
                                            <span style="color: #dc2626;">*</span>
                                        </label>
                                        <input type="date" id="violation-date" required class="form-input"
                                            value="${formDateValue}"
                                            style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;">
                                    </div>
                                    <div>
                                        <label for="violation-time" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                            <i class="fas fa-clock text-purple-600" style="font-size: 0.95rem;"></i>
                                            <span>وقت المخالفة</span>
                                            <span style="color: #dc2626;">*</span>
                                        </label>
                                        <input type="time" id="violation-time" required class="form-input"
                                            value="${formTimeValue}"
                                            style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;">
                                    </div>
                                </div>

                                <!-- ✅ بطاقة تنبيه بؤرة الخطر في المنطقة المحددة -->
                                <div id="violation-area-hotspot-container" class="hidden" style="margin-top: 16px;"></div>
                            </div>
                        </div>

                        <!-- البطاقة 3: تصنيف المخالفة والغرامة والسبب الجذري -->
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); margin-bottom: 20px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-bottom: 1px solid #e2e8f0; padding: 13px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 8px; background: linear-gradient(135deg, #d97706, #f59e0b); color: #ffffff; font-weight: 800; font-size: 13px; box-shadow: 0 2px 4px rgba(245,158,11,0.25);">3</span>
                                    <span style="font-size: 0.96rem; font-weight: 800; color: #0f172a;">تصنيف المخالفة والغرامة والسبب الجذري</span>
                                </div>
                                <span style="font-size: 0.78rem; font-weight: 700; color: #d97706; background: #fffbeb; border: 1px solid #fde68a; padding: 4px 12px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                                    <i class="fas fa-coins text-amber-500"></i> تحديد النوع يضبط الغرامة والمقترحات تلقائياً
                                </span>
                            </div>

                            <div style="padding: 22px 20px;">
                                <div class="v-contractor-row-1" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px;">
                                    <div>
                                        <label for="violation-type" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                            <i class="fas fa-exclamation-circle text-red-600" style="font-size: 0.95rem;"></i>
                                            <span>نوع وتوصيف المخالفة</span>
                                            <span style="color: #dc2626;">*</span>
                                        </label>
                                        <select id="violation-type" required class="form-input" style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 700; width: 100%;">
                                            <option value="">-- اختر نوع المخالفة --</option>
                                            ${legacyTypeOption}
                                            ${typeOptions}
                                        </select>
                                    </div>

                                    <div>
                                        <label for="violation-fine-amount" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                            <i class="fas fa-money-bill-wave text-green-600" style="font-size: 0.95rem;"></i>
                                            <span>القيمة المالية للغرامة (ج.م)</span>
                                        </label>
                                        <input type="number" id="violation-fine-amount" class="form-input" min="0" step="1"
                                            value="${Number(effectiveFineForForm)}"
                                            placeholder="القيمة المالية"
                                            style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 700; width: 100%;">
                                        <p style="font-size: 0.74rem; color: #64748b; margin: 5px 0 0 0;">
                                            ${canManagerEditFineAmount ? 'يتم التحديد تلقائياً حسب نوع المخالفة، والتعديل متاح للمدير.' : 'يتم التحديد تلقائياً حسب اللائحة، وتعديلها متاح للمدير فقط.'}
                                        </p>
                                    </div>
                                </div>

                                <div class="v-contractor-row-2" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 22px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
                                    <div>
                                        <label for="violation-severity" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                            <i class="fas fa-signal text-orange-600" style="font-size: 0.95rem;"></i>
                                            <span>مستوى الشدة والخطورة</span>
                                            <span style="color: #dc2626;">*</span>
                                        </label>
                                        <select id="violation-severity" required class="form-input" style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;">
                                            <option value="">اختر الشدة</option>
                                            <option value="عالية" ${violationData?.severity === 'عالية' ? 'selected' : ''}>🔴 عالية الخطورة</option>
                                            <option value="متوسطة" ${violationData?.severity === 'متوسطة' ? 'selected' : ''}>🟡 متوسطة</option>
                                            <option value="منخفضة" ${violationData?.severity === 'منخفضة' || violationData?.severity === 'منخضة' ? 'selected' : ''}>🟢 منخفضة</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label for="violation-status" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                            <i class="fas fa-info-circle text-blue-600" style="font-size: 0.95rem;"></i>
                                            <span>حالة المعالجة والمتابعة</span>
                                            <span style="color: #dc2626;">*</span>
                                        </label>
                                        <select id="violation-status" required class="form-input" style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;">
                                            <option value="">اختر الحالة</option>
                                            <option value="قيد المراجعة" ${!violationData?.status || violationData?.status === 'قيد المراجعة' ? 'selected' : ''}>⏳ قيد المراجعة والمتابعة</option>
                                            <option value="محلول" ${violationData?.status === 'محلول' ? 'selected' : ''}>✅ تم المعالجة والتصحيح (محلول)</option>
                                            <option value="غير محلول" ${violationData?.status === 'غير محلول' ? 'selected' : ''}>❌ غير محلول (مفتوح)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label for="violation-root-cause" style="display: flex; align-items: center; gap: 7px; font-size: 0.86rem; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
                                            <i class="fas fa-search-plus text-teal-600" style="font-size: 0.95rem;"></i>
                                            <span>تصنيف السبب الجذري (RCA)</span>
                                        </label>
                                        <select id="violation-root-cause" class="form-input" style="min-height: 48px; height: 48px; box-sizing: border-box; padding: 8px 14px; border-radius: 10px; font-size: 0.94rem; font-weight: 600; width: 100%;">
                                            <option value="">اختر السبب الجذري</option>
                                            <option value="سلوك غير آمن (Unsafe Act)" ${violationData?.rootCause === 'سلوك غير آمن (Unsafe Act)' ? 'selected' : ''}>سلوك غير آمن (Unsafe Act)</option>
                                            <option value="ظرف عمل غير آمن (Unsafe Condition)" ${violationData?.rootCause === 'ظرف عمل غير آمن (Unsafe Condition)' ? 'selected' : ''}>ظرف عمل غير آمن (Unsafe Condition)</option>
                                            <option value="قصور تدريبي وتوعوي (Training Gap)" ${violationData?.rootCause === 'قصور تدريبي وتوعوي (Training Gap)' ? 'selected' : ''}>قصور تدريبي وتوعوي (Training Gap)</option>
                                            <option value="قصور إشرافي وإجرائي (Supervisory Defect)" ${violationData?.rootCause === 'قصور إشرافي وإجرائي (Supervisory Defect)' ? 'selected' : ''}>قصور إشرافي وإجرائي (Supervisory Defect)</option>
                                            <option value="خلل في المعدات ومهمات الوقاية" ${violationData?.rootCause === 'خلل في المعدات ومهمات الوقاية' ? 'selected' : ''}>خلل في المعدات ومهمات الوقاية</option>
                                            <option value="عوامل خارجية وبيئية" ${violationData?.rootCause === 'عوامل خارجية وبيئية' ? 'selected' : ''}>عوامل خارجية وبيئية</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- البطاقة 4: الوصف التفصيلي والإجراءات والمقترحات والمرفقات -->
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-bottom: 8px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-bottom: 1px solid #e2e8f0; padding: 11px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                                <div style="display: flex; align-items: center; gap: 9px;">
                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 7px; background: #7c3aed; color: #ffffff; font-weight: 800; font-size: 12px; box-shadow: 0 1px 2px rgba(124,58,237,0.25);">4</span>
                                    <span style="font-size: 0.92rem; font-weight: 800; color: #1e293b;">الوصف التفصيلي والإجراءات المتخذة وتوثيق الصورتين</span>
                                </div>
                                <span style="font-size: 0.76rem; font-weight: 700; color: #7c3aed; background: #f5f3ff; border: 1px solid #ddd6fe; padding: 2px 10px; border-radius: 20px;">
                                    انقر على أي مقترح ذكي لإضافته بنقرة واحدة
                                </span>
                            </div>

                            <div style="padding: 16px 18px;">
                                <!-- تفاصيل المخالفة والمقترحات -->
                                <div style="margin-bottom: 18px;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                                        <label for="violation-details" class="block text-xs font-bold text-gray-700" style="margin: 0;">
                                            <i class="fas fa-file-alt ml-1 text-amber-600"></i> تفاصيل المخالفة ووصف الحالة الميدانية
                                        </label>
                                        <span style="font-size: 0.75rem; font-weight: 700; color: #92400e; background: #fef3c7; border: 1px solid #fde68a; padding: 2px 10px; border-radius: 6px;">
                                            💡 مقترحات سريعة حسب نوع المخالفة (انقر للإضافة):
                                        </span>
                                    </div>
                                    <div id="violation-details-chips" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; min-height: 32px;"></div>
                                    <textarea id="violation-details" class="form-input" rows="3"
                                        placeholder="اكتب تفاصيل المخالفة ووصفها الكامل، أو انقر على المقترحات الذكية الجاهزة أعلاه للإدراج المباشر..."
                                        style="width: 100%; min-height: 85px; border-radius: 9px; padding: 10px 12px; font-size: 0.88rem; line-height: 1.55; resize: vertical;">${violationData?.violationDetails || ''}</textarea>
                                </div>

                                <!-- الإجراء المتخذ والمقترحات -->
                                <div style="margin-bottom: 18px;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                                        <label for="violation-action" class="block text-xs font-bold text-gray-700" style="margin: 0;">
                                            <i class="fas fa-tasks ml-1 text-indigo-600"></i> الإجراء المتخذ فورياً / الإجراء التصحيحي
                                        </label>
                                        <span style="font-size: 0.75rem; font-weight: 700; color: #3730a3; background: #e0e7ff; border: 1px solid #c7d2fe; padding: 2px 10px; border-radius: 6px;">
                                            ⚡ مقترحات الإجراءات النظامية المعتمدة:
                                        </span>
                                    </div>
                                    <div id="violation-action-chips" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; min-height: 32px;"></div>
                                    <textarea id="violation-action" class="form-input" rows="3"
                                        placeholder="حدد الإجراء الميداني المتخذ أو اختر من مقترحات الإجراءات النظامية السريعة أعلاه..."
                                        style="width: 100%; min-height: 75px; border-radius: 9px; padding: 10px 12px; font-size: 0.88rem; line-height: 1.55; resize: vertical;">${violationData?.actionTaken || ''}</textarea>
                                </div>

                                <!-- توثيق المخالفة بالصور الميدانية (صورتين احترافيتين مع خيارات كاملة) -->
                                <div style="margin-top: 18px; padding: 16px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <span style="display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 7px; background: #e0e7ff; color: #4338ca; font-size: 13px;">
                                                <i class="fas fa-camera-retro"></i>
                                            </span>
                                            <div>
                                                <h4 style="margin: 0; font-size: 0.88rem; font-weight: 800; color: #1e293b;">
                                                    توثيق المخالفة بالصور الميدانية (صورتين)
                                                </h4>
                                                <p style="margin: 2px 0 0 0; font-size: 0.72rem; color: #64748b;">
                                                    صورة لمشهد المخالفة الأساسي (قبل) + صورة إضافية توثيقية أو بعد الإجراء التصحيحي (بعد)
                                                </p>
                                            </div>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <button type="button" id="violation-photos-swap-btn" class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer" title="تبديل ترتيب الصورتين">
                                                <i class="fas fa-right-left text-indigo-600"></i>
                                                <span>تبديل الصورتين (⇄)</span>
                                            </button>
                                            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 600;">الحد الأقصى: 2MB</span>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <!-- كارت الصورة 1 -->
                                        <div id="violation-photo-card-1" style="background: #ffffff; border: 1.5px dashed #cbd5e1; border-radius: 10px; padding: 12px; transition: all 0.2s;">
                                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                                                <span style="font-size: 0.78rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 6px;">
                                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 6px; background: #2563eb; color: #ffffff; font-size: 11px; font-weight: 800;">1</span>
                                                    مشهد المخالفة (قبل المعالجة)
                                                </span>
                                                <span id="violation-photo-badge-1" style="font-size: 0.72rem; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 2px 8px; border-radius: 6px;">
                                                    ${initialPhoto1 ? 'مرفقة ✓' : 'فارغ'}
                                                </span>
                                            </div>

                                            <!-- منطقة الرفع 1 -->
                                            <div id="violation-photo-dropzone-1" style="border: 2px dashed #93c5fd; border-radius: 8px; background: #f8fafc; padding: 18px 10px; text-align: center; cursor: pointer; transition: all 0.2s; display: ${initialPhoto1 ? 'none' : 'block'};">
                                                <i class="fas fa-cloud-arrow-up text-2xl text-blue-500 mb-1.5" style="display: block;"></i>
                                                <p style="margin: 0 0 3px 0; font-size: 0.8rem; font-weight: 700; color: #1e293b;">انقر للاختيار أو اسحب الصورة هنا</p>
                                                <p style="margin: 0; font-size: 0.7rem; color: #64748b;">JPG, PNG حتى 2 ميجابايت</p>
                                                <input type="file" id="violation-photo-input-1" accept="image/*" style="display: none;">
                                            </div>

                                            <!-- معاينة الصورة 1 -->
                                            <div id="violation-photo-preview-box-1" style="display: ${initialPhoto1 ? 'block' : 'none'};">
                                                <div style="position: relative; height: 160px; border-radius: 8px; overflow: hidden; background: #0f172a; display: flex; align-items: center; justify-content: center; border: 1px solid #cbd5e1;">
                                                    <img id="violation-photo-img-1" src="${initialPhoto1 || ''}" alt="صورة المخالفة 1" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                                                    <button type="button" id="violation-photo-zoom-btn-1" title="تكبير الصورة" style="position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 6px; background: rgba(0,0,0,0.65); border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s;">
                                                        <i class="fas fa-magnifying-glass-plus" style="font-size: 12px;"></i>
                                                    </button>
                                                </div>
                                                <div style="display: flex; gap: 8px; margin-top: 8px;">
                                                    <button type="button" id="violation-photo-change-btn-1" style="flex: 1; height: 32px; border-radius: 7px; background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                                                        <i class="fas fa-sync text-blue-600"></i> تغيير الصورة
                                                    </button>
                                                    <button type="button" id="violation-photo-del-btn-1" style="height: 32px; padding: 0 12px; border-radius: 7px; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 5px;">
                                                        <i class="fas fa-trash-alt"></i> حذف
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- كارت الصورة 2 -->
                                        <div id="violation-photo-card-2" style="background: #ffffff; border: 1.5px dashed #cbd5e1; border-radius: 10px; padding: 12px; transition: all 0.2s;">
                                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                                                <span style="font-size: 0.78rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 6px;">
                                                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 6px; background: #059669; color: #ffffff; font-size: 11px; font-weight: 800;">2</span>
                                                    توثيق إضافي / بعد التصحيح
                                                </span>
                                                <span id="violation-photo-badge-2" style="font-size: 0.72rem; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 2px 8px; border-radius: 6px;">
                                                    ${initialPhoto2 ? 'مرفقة ✓' : 'فارغ'}
                                                </span>
                                            </div>

                                            <!-- منطقة الرفع 2 -->
                                            <div id="violation-photo-dropzone-2" style="border: 2px dashed #a7f3d0; border-radius: 8px; background: #f8fafc; padding: 18px 10px; text-align: center; cursor: pointer; transition: all 0.2s; display: ${initialPhoto2 ? 'none' : 'block'};">
                                                <i class="fas fa-cloud-arrow-up text-2xl text-emerald-500 mb-1.5" style="display: block;"></i>
                                                <p style="margin: 0 0 3px 0; font-size: 0.8rem; font-weight: 700; color: #1e293b;">انقر للاختيار أو اسحب الصورة هنا</p>
                                                <p style="margin: 0; font-size: 0.7rem; color: #64748b;">JPG, PNG حتى 2 ميجابايت</p>
                                                <input type="file" id="violation-photo-input-2" accept="image/*" style="display: none;">
                                            </div>

                                            <!-- معاينة الصورة 2 -->
                                            <div id="violation-photo-preview-box-2" style="display: ${initialPhoto2 ? 'block' : 'none'};">
                                                <div style="position: relative; height: 160px; border-radius: 8px; overflow: hidden; background: #0f172a; display: flex; align-items: center; justify-content: center; border: 1px solid #cbd5e1;">
                                                    <img id="violation-photo-img-2" src="${initialPhoto2 || ''}" alt="صورة المخالفة 2" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                                                    <button type="button" id="violation-photo-zoom-btn-2" title="تكبير الصورة" style="position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 6px; background: rgba(0,0,0,0.65); border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s;">
                                                        <i class="fas fa-magnifying-glass-plus" style="font-size: 12px;"></i>
                                                    </button>
                                                </div>
                                                <div style="display: flex; gap: 8px; margin-top: 8px;">
                                                    <button type="button" id="violation-photo-change-btn-2" style="flex: 1; height: 32px; border-radius: 7px; background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                                                        <i class="fas fa-sync text-emerald-600"></i> تغيير الصورة
                                                    </button>
                                                    <button type="button" id="violation-photo-del-btn-2" style="height: 32px; padding: 0 12px; border-radius: 7px; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 5px;">
                                                        <i class="fas fa-trash-alt"></i> حذف
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- شريط الأزرار السفلي المدمج بهوية تنفيذية فاخرة -->
                        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <div style="font-size: 0.82rem; color: #64748b; font-weight: 600; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-shield-check text-emerald-600 text-sm"></i>
                                <span>الحقول الموسومة بـ (*) إلزامية لتوثيق المخالفة بالسجل الرسمي</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="height: 44px; padding: 0 22px; border-radius: 10px; font-weight: 700; font-size: 0.90rem; background: #ffffff; border: 1.5px solid #cbd5e1; color: #475569; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
                                    <i class="fas fa-times"></i> إلغاء
                                </button>
                                <button type="submit" id="violation-submit-btn" class="btn-primary" style="height: 44px; padding: 0 28px; border-radius: 10px; font-weight: 800; font-size: 0.94rem; background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%); color: #ffffff; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(37,99,235,0.35); transition: all 0.2s ease;">
                                    <i class="fas fa-save"></i> ${isEdit ? 'حفظ التعديلات' : 'تسجيل المخالفة'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Setup employee autocomplete for employee type
        const personTypeSelect = document.getElementById('violation-person-type');
        const employeeCodeContainer = document.getElementById('violation-employee-code-container');
        const employeeCodeInput = document.getElementById('violation-employee-code');
        const personNameInput = document.getElementById('violation-person-name');
        const personNameLabel = document.getElementById('violation-person-name-label');
        const employeeDetailsGrid = document.getElementById('violation-employee-details-grid');
        const contractorCompanyContainer = document.getElementById('violation-contractor-company-container');

        const contractorSelect = document.getElementById('violation-contractor-select');

        // تحميل قائمة المقاولين في القائمة المنسدلة
        if (contractorSelect) {
            const currentValue = violationData?.contractorName || '';
            const currentContractorId = violationData?.contractorId || '';
            this.loadContractorsIntoSelect(contractorSelect, currentValue, currentContractorId);
        }

        // الحصول على عناصر الحقول
        const employeePositionContainer = document.getElementById('violation-employee-position-container');
        const employeeDepartmentContainer = document.getElementById('violation-employee-department-container');
        const employeePositionInput = document.getElementById('violation-employee-position');
        const employeeDepartmentInput = document.getElementById('violation-employee-department');

        const contractorFieldsContainer = document.getElementById('violation-contractor-fields-container');
        const contractorWorkerContainer = document.getElementById('violation-contractor-worker-container');
        const contractorPositionContainer = document.getElementById('violation-contractor-position-container');
        const contractorDepartmentContainer = document.getElementById('violation-contractor-department-container');
        const contractorWorkerInput = document.getElementById('violation-contractor-worker');
        const contractorPositionInput = document.getElementById('violation-contractor-position');
        const contractorDepartmentInput = document.getElementById('violation-contractor-department');

        const locationFieldsContainer = document.getElementById('violation-location-fields-container');
        const contractorLocationFieldsContainer = document.getElementById('violation-contractor-location-fields-container');
        const violationTypeSelect = document.getElementById('violation-type');
        const fineAmountInput = document.getElementById('violation-fine-amount');
        const typeById = new Map((violationTypes || []).map(type => [String(type.id || '').trim(), type]));
        const typeByName = new Map((violationTypes || []).map(type => [String(type.name || '').trim().toLowerCase(), type]));

        const getDefaultFineAmountForSelectedType = () => {
            const selectedOption = violationTypeSelect?.selectedOptions?.[0];
            const typeId = selectedOption?.getAttribute('data-type-id') || '';
            const typeName = (violationTypeSelect?.value || '').trim().toLowerCase();
            const type = (typeId && typeById.get(typeId)) || (typeName && typeByName.get(typeName)) || null;
            const optionFine = Number(selectedOption?.getAttribute('data-fine-amount') || 0);
            const mappedFine = Number(type?.fineAmount ?? optionFine ?? 0);
            return Number.isFinite(mappedFine) && mappedFine >= 0 ? mappedFine : 0;
        };

        const applyFineAmountFromType = ({ force = false } = {}) => {
            if (!fineAmountInput) return;
            const defaultFineAmount = getDefaultFineAmountForSelectedType();
            if (force || !canManagerEditFineAmount || fineAmountInput.value === '') {
                fineAmountInput.value = String(defaultFineAmount);
            }
        };

        // دالة توليد مقترحات تفاصيل المخالفة والإجراء المتخذ (تصميم أنيق وسلس)
        const renderSuggestionChips = () => {
            const selectedType = violationTypeSelect?.value || '';
            const { detailsChips, actionChips } = this.getViolationSuggestionChips(selectedType);

            const detailsContainer = modal.querySelector('#violation-details-chips');
            const actionContainer = modal.querySelector('#violation-action-chips');
            const detailsInput = modal.querySelector('#violation-details');
            const actionInput = modal.querySelector('#violation-action');

            if (detailsContainer) {
                detailsContainer.innerHTML = '';
                detailsChips.forEach(chipText => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.style.cssText = `
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        padding: 6px 13px;
                        font-size: 12px;
                        font-weight: 600;
                        line-height: 1.4;
                        color: #78350f;
                        background: #fffbeb;
                        border: 1px solid #fde68a;
                        border-radius: 9999px;
                        cursor: pointer;
                        text-align: right;
                        white-space: normal;
                        box-shadow: 0 1px 2px rgba(0,0,0,0.03);
                        transition: all 0.15s ease-in-out;
                    `;
                    btn.onmouseenter = () => {
                        btn.style.background = '#fef3c7';
                        btn.style.borderColor = '#f59e0b';
                        btn.style.color = '#92400e';
                        btn.style.transform = 'translateY(-1px)';
                        btn.style.boxShadow = '0 2px 4px rgba(245, 158, 11, 0.15)';
                    };
                    btn.onmouseleave = () => {
                        btn.style.background = '#fffbeb';
                        btn.style.borderColor = '#fde68a';
                        btn.style.color = '#78350f';
                        btn.style.transform = 'translateY(0)';
                        btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
                    };
                    btn.innerHTML = `<i class="fas fa-plus" style="color: #d97706; font-size: 10px;"></i><span>${Utils.escapeHTML(chipText)}</span>`;
                    btn.addEventListener('click', () => {
                        if (!detailsInput) return;
                        const current = detailsInput.value.trim();
                        if (!current) {
                            detailsInput.value = chipText;
                        } else if (!current.includes(chipText)) {
                            detailsInput.value = current + ' - ' + chipText;
                        }
                        detailsInput.focus();
                    });
                    detailsContainer.appendChild(btn);
                });
            }

            if (actionContainer) {
                actionContainer.innerHTML = '';
                actionChips.forEach(chipText => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.style.cssText = `
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        padding: 6px 13px;
                        font-size: 12px;
                        font-weight: 600;
                        line-height: 1.4;
                        color: #312e81;
                        background: #eef2ff;
                        border: 1px solid #c7d2fe;
                        border-radius: 9999px;
                        cursor: pointer;
                        text-align: right;
                        white-space: normal;
                        box-shadow: 0 1px 2px rgba(0,0,0,0.03);
                        transition: all 0.15s ease-in-out;
                    `;
                    btn.onmouseenter = () => {
                        btn.style.background = '#e0e7ff';
                        btn.style.borderColor = '#6366f1';
                        btn.style.color = '#1e1b4b';
                        btn.style.transform = 'translateY(-1px)';
                        btn.style.boxShadow = '0 2px 4px rgba(99, 102, 241, 0.15)';
                    };
                    btn.onmouseleave = () => {
                        btn.style.background = '#eef2ff';
                        btn.style.borderColor = '#c7d2fe';
                        btn.style.color = '#312e81';
                        btn.style.transform = 'translateY(0)';
                        btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
                    };
                    btn.innerHTML = `<i class="fas fa-bolt" style="color: #6366f1; font-size: 10px;"></i><span>${Utils.escapeHTML(chipText)}</span>`;
                    btn.addEventListener('click', () => {
                        if (!actionInput) return;
                        actionInput.value = chipText;
                        actionInput.focus();
                    });
                    actionContainer.appendChild(btn);
                });
            }
        };

        if (fineAmountInput) {
            fineAmountInput.readOnly = !canManagerEditFineAmount;
        }
        if (violationTypeSelect) {
            violationTypeSelect.addEventListener('change', () => {
                applyFineAmountFromType({ force: true });
                renderSuggestionChips();
            });
            violationTypeSelect.addEventListener('input', () => {
                applyFineAmountFromType({ force: true });
                renderSuggestionChips();
            });
        }
        if (fineAmountInput && canManagerEditFineAmount && violationData && violationData.fineAmount !== undefined && violationData.fineAmount !== null) {
            fineAmountInput.value = String(Number(effectiveFineForForm));
        } else {
            applyFineAmountFromType({ force: true });
        }

        // تشغيل المقترحات لأول مرة
        renderSuggestionChips();

        // التبديل بين نوع الشخص (موظف / مقاول)
        personTypeSelect.addEventListener('change', (e) => {
            const personType = e.target.value;
            if (personType === 'employee') {
                if (employeeCodeContainer) employeeCodeContainer.style.display = 'block';
                if (employeeCodeInput) {
                    employeeCodeInput.required = true;
                    employeeCodeInput.placeholder = 'أدخل الكود الوظيفي (سيتم جلب البيانات تلقائياً)';
                }
                if (employeeDetailsGrid) employeeDetailsGrid.style.display = 'grid';

                if (contractorCompanyContainer) contractorCompanyContainer.style.display = 'none';
                if (contractorSelect) {
                    contractorSelect.required = false;
                }

                if (contractorFieldsContainer) contractorFieldsContainer.style.display = 'none';
                if (locationFieldsContainer) locationFieldsContainer.style.display = 'contents';
                if (contractorLocationFieldsContainer) contractorLocationFieldsContainer.style.display = 'none';

                this.loadLocationOptions('employee').then(() => {
                    const employeeLocationSelect = document.getElementById('violation-employee-location');
                    if (employeeLocationSelect) {
                        const newSelect = employeeLocationSelect.cloneNode(true);
                        employeeLocationSelect.parentNode.replaceChild(newSelect, employeeLocationSelect);
                        const updatedSelect = document.getElementById('violation-employee-location');
                        if (updatedSelect) {
                            updatedSelect.addEventListener('change', (ev) => {
                                const selectedSiteId = ev.target.value;
                                this.loadPlaceOptions(selectedSiteId, '', 'employee');
                                this.refreshAreaHotspotInModal(modal, isEdit ? violationData?.id : null);
                            });
                        }
                    }
                });

                if (typeof EmployeeHelper !== 'undefined' && employeeCodeInput && employeeCodeInput.parentNode) {
                    try {
                        const newCodeInput = employeeCodeInput.cloneNode(true);
                        employeeCodeInput.parentNode.replaceChild(newCodeInput, employeeCodeInput);
                        const updatedCodeInput = document.getElementById('violation-employee-code');
                        if (updatedCodeInput) {
                            EmployeeHelper.setupEmployeeCodeSearch('violation-employee-code', 'violation-person-name', (employee) => {
                                if (employee) {
                                    const nameField = document.getElementById('violation-person-name');
                                    const positionField = document.getElementById('violation-employee-position');
                                    const departmentField = document.getElementById('violation-employee-department');
                                    if (nameField) nameField.value = employee.name || '';
                                    if (positionField) positionField.value = employee.position || employee.jobTitle || '';
                                    if (departmentField) departmentField.value = employee.department || employee.section || '';
                                }
                                scheduleViolationSeqBadge();
                            });
                        }
                    } catch (error) {
                        Utils.safeError('خطأ في إعداد البحث بالكود الوظيفي:', error);
                    }
                }
            } else {
                applyFineAmountFromType({ force: true });
                if (employeeCodeContainer) employeeCodeContainer.style.display = 'none';
                if (employeeCodeInput) {
                    employeeCodeInput.required = false;
                    employeeCodeInput.value = '';
                }
                if (employeeDetailsGrid) employeeDetailsGrid.style.display = 'none';

                if (contractorCompanyContainer) contractorCompanyContainer.style.display = 'block';
                if (contractorSelect) {
                    contractorSelect.required = true;
                    this.loadContractorsIntoSelect(contractorSelect);
                }

                if (contractorFieldsContainer) contractorFieldsContainer.style.display = 'block';
                if (locationFieldsContainer) locationFieldsContainer.style.display = 'none';
                if (contractorLocationFieldsContainer) contractorLocationFieldsContainer.style.display = 'contents';

                this.loadLocationOptions('contractor').then(() => {
                    const contractorLocationSelect = document.getElementById('violation-contractor-location');
                    if (contractorLocationSelect) {
                        const newSelect = contractorLocationSelect.cloneNode(true);
                        contractorLocationSelect.parentNode.replaceChild(newSelect, contractorLocationSelect);
                        const updatedSelect = document.getElementById('violation-contractor-location');
                        if (updatedSelect) {
                            updatedSelect.addEventListener('change', (ev) => {
                                const selectedSiteId = ev.target.value;
                                this.loadPlaceOptions(selectedSiteId, '', 'contractor');
                                this.refreshAreaHotspotInModal(modal, isEdit ? violationData?.id : null);
                            });
                        }
                    }
                });
            }
            scheduleViolationSeqBadge();
            this.refreshAreaHotspotInModal(modal, isEdit ? violationData?.id : null);
        });

        // الاستماع لتغيير اسم عامل المقاول لملء بياناته ومقاوله تلقائياً وتفعيل تنبيه التكرار فوراً
        const onContractorWorkerInput = () => {
            const workerVal = (contractorWorkerInput?.value || '').trim().toLowerCase();
            if (workerVal) {
                const past = (AppState.appData?.violations || []).find(v => 
                    v && (v.contractorWorker || '').trim().toLowerCase() === workerVal
                );
                if (past) {
                    if (contractorPositionInput && !contractorPositionInput.value && past.contractorPosition) {
                        contractorPositionInput.value = past.contractorPosition;
                    }
                    if (contractorSelect && !contractorSelect.value && past.contractorName) {
                        contractorSelect.value = past.contractorName;
                    }
                    if (contractorDepartmentInput && !contractorDepartmentInput.value && past.contractorDepartment) {
                        contractorDepartmentInput.value = past.contractorDepartment;
                    }
                }
            }
            scheduleViolationSeqBadge();
        };
        if (contractorWorkerInput) {
            contractorWorkerInput.addEventListener('input', onContractorWorkerInput);
            contractorWorkerInput.addEventListener('change', onContractorWorkerInput);
        }

        const scheduleViolationSeqBadge = () => {
            clearTimeout(this._violationSeqBadgeTimer);
            this._violationSeqBadgeTimer = setTimeout(() => {
                this.refreshViolationSequenceBadgeInModal(modal, isEdit ? violationData?.id : null);
            }, 180);
        };
        modal.addEventListener('input', scheduleViolationSeqBadge);
        modal.addEventListener('change', scheduleViolationSeqBadge);
        setTimeout(scheduleViolationSeqBadge, 300);

        // تفعيل البحث عند تحديث النموذج إذا كان موظف
        if (typeof EmployeeHelper !== 'undefined' && violationData?.employeeName && employeeCodeInput && employeeCodeInput.parentNode) {
            try {
                const newCodeInput = employeeCodeInput.cloneNode(true);
                employeeCodeInput.parentNode.replaceChild(newCodeInput, employeeCodeInput);
                const updatedCodeInput = document.getElementById('violation-employee-code');
                if (updatedCodeInput) {
                    EmployeeHelper.setupEmployeeCodeSearch('violation-employee-code', 'violation-person-name', (employee) => {
                        if (employee) {
                            const nameField = document.getElementById('violation-person-name');
                            const positionField = document.getElementById('violation-employee-position');
                            const departmentField = document.getElementById('violation-employee-department');
                            if (nameField) nameField.value = employee.name || '';
                            if (positionField) positionField.value = employee.position || employee.jobTitle || '';
                            if (departmentField) departmentField.value = employee.department || employee.section || '';
                        }
                        scheduleViolationSeqBadge();
                    });
                }
            } catch (error) {
                Utils.safeError('خطأ في إعداد البحث بالكود الوظيفي:', error);
            }
        }

        // تحميل قائمة المواقع وإعداد listeners للأماكن وبؤر الخطر
        const initialPersonType = isContractorRecord ? 'contractor' : 'employee';
        setTimeout(async () => {
            await this.loadLocationOptions('employee');
            await this.loadLocationOptions('contractor');

            // إعداد event listeners للموظف
            const employeeLocationSelect = document.getElementById('violation-employee-location');
            const employeePlaceSelect = document.getElementById('violation-employee-place');
            const employeeCustomPlaceBox = document.getElementById('violation-employee-custom-place-box');
            if (employeeLocationSelect && employeePlaceSelect) {
                const newLocSelect = employeeLocationSelect.cloneNode(true);
                employeeLocationSelect.parentNode.replaceChild(newLocSelect, employeeLocationSelect);
                const newPlcSelect = employeePlaceSelect.cloneNode(true);
                employeePlaceSelect.parentNode.replaceChild(newPlcSelect, employeePlaceSelect);

                const updatedLoc = document.getElementById('violation-employee-location');
                const updatedPlc = document.getElementById('violation-employee-place');
                if (updatedLoc) {
                    updatedLoc.addEventListener('change', (e) => {
                        const selectedSiteId = e.target.value;
                        this.loadPlaceOptions(selectedSiteId, '', 'employee');
                        this.refreshAreaHotspotInModal(modal, isEdit ? violationData?.id : null);
                    });
                }
                if (updatedPlc) {
                    updatedPlc.addEventListener('change', (e) => {
                        if (employeeCustomPlaceBox) {
                            employeeCustomPlaceBox.classList.toggle('hidden', e.target.value !== '__custom__');
                            if (e.target.value === '__custom__') {
                                document.getElementById('violation-employee-custom-place')?.focus();
                            }
                        }
                        this.refreshAreaHotspotInModal(modal, isEdit ? violationData?.id : null);
                    });
                }
            }

            // إعداد event listeners للمقاول
            const contractorLocationSelect = document.getElementById('violation-contractor-location');
            const contractorPlaceSelect = document.getElementById('violation-contractor-place');
            const contractorCustomPlaceBox = document.getElementById('violation-contractor-custom-place-box');
            if (contractorLocationSelect && contractorPlaceSelect) {
                const newLocSelect = contractorLocationSelect.cloneNode(true);
                contractorLocationSelect.parentNode.replaceChild(newLocSelect, contractorLocationSelect);
                const newPlcSelect = contractorPlaceSelect.cloneNode(true);
                contractorPlaceSelect.parentNode.replaceChild(newPlcSelect, contractorPlaceSelect);

                const updatedLoc = document.getElementById('violation-contractor-location');
                const updatedPlc = document.getElementById('violation-contractor-place');
                if (updatedLoc) {
                    updatedLoc.addEventListener('change', (e) => {
                        const selectedSiteId = e.target.value;
                        this.loadPlaceOptions(selectedSiteId, '', 'contractor');
                        this.refreshAreaHotspotInModal(modal, isEdit ? violationData?.id : null);
                    });
                }
                if (updatedPlc) {
                    updatedPlc.addEventListener('change', (e) => {
                        if (contractorCustomPlaceBox) {
                            contractorCustomPlaceBox.classList.toggle('hidden', e.target.value !== '__custom__');
                            if (e.target.value === '__custom__') {
                                document.getElementById('violation-contractor-custom-place')?.focus();
                            }
                        }
                        this.refreshAreaHotspotInModal(modal, isEdit ? violationData?.id : null);
                    });
                }
            }

            // إعداد البحث بالكود الوظيفي للموظف الافتراضي
            if (initialPersonType === 'employee' && personTypeSelect.value === 'employee') {
                if (typeof EmployeeHelper !== 'undefined') {
                    const codeInput = document.getElementById('violation-employee-code');
                    if (codeInput) {
                        try {
                            EmployeeHelper.setupEmployeeCodeSearch('violation-employee-code', 'violation-person-name', (employee) => {
                                if (employee) {
                                    const nameField = document.getElementById('violation-person-name');
                                    const positionField = document.getElementById('violation-employee-position');
                                    const departmentField = document.getElementById('violation-employee-department');
                                    if (nameField) nameField.value = employee.name || '';
                                    if (positionField) positionField.value = employee.position || employee.jobTitle || '';
                                    if (departmentField) departmentField.value = employee.department || employee.section || '';
                                }
                                scheduleViolationSeqBadge();
                            });
                        } catch (error) {
                            Utils.safeError('خطأ في إعداد البحث بالكود الوظيفي:', error);
                        }
                    }
                }
            }
        }, 100);

        // تعيين قيم التعديل إذا كانت موجودة
        if (selectedLocationValue) {
            setTimeout(() => {
                if (initialPersonType === 'employee') {
                    const employeeLocationSelect = document.getElementById('violation-employee-location');
                    if (employeeLocationSelect) {
                        employeeLocationSelect.value = selectedLocationValue;
                        if (selectedLocationValue) {
                            this.loadPlaceOptions(selectedLocationValue, selectedPlaceValue, 'employee');
                        }
                    }
                } else if (initialPersonType === 'contractor') {
                    const contractorLocationSelect = document.getElementById('violation-contractor-location');
                    if (contractorLocationSelect) {
                        contractorLocationSelect.value = selectedLocationValue;
                        if (selectedLocationValue) {
                            this.loadPlaceOptions(selectedLocationValue, selectedPlaceValue, 'contractor');
                        }
                    }
                }
                setTimeout(() => {
                    this.refreshAreaHotspotInModal(modal, isEdit ? violationData?.id : null);
                }, 250);
            }, 200);
        }

        // ========== إدارة الصورتين التوثيقيتين باحترافية كاملة ==========
        let currentPhoto1 = initialPhoto1;
        let currentPhoto2 = initialPhoto2;

        const syncPhotoCards = () => {
            const dropzone1 = modal.querySelector('#violation-photo-dropzone-1');
            const previewBox1 = modal.querySelector('#violation-photo-preview-box-1');
            const img1 = modal.querySelector('#violation-photo-img-1');
            const badge1 = modal.querySelector('#violation-photo-badge-1');
            const card1 = modal.querySelector('#violation-photo-card-1');

            if (currentPhoto1) {
                if (dropzone1) dropzone1.style.display = 'none';
                if (previewBox1) previewBox1.style.display = 'block';
                if (img1) img1.src = currentPhoto1;
                if (badge1) {
                    badge1.textContent = 'مرفقة ✓';
                    badge1.style.color = '#15803d';
                    badge1.style.background = '#dcfce7';
                }
                if (card1) card1.style.borderStyle = 'solid';
            } else {
                if (dropzone1) dropzone1.style.display = 'block';
                if (previewBox1) previewBox1.style.display = 'none';
                if (img1) img1.src = '';
                if (badge1) {
                    badge1.textContent = 'فارغ';
                    badge1.style.color = '#64748b';
                    badge1.style.background = '#f1f5f9';
                }
                if (card1) card1.style.borderStyle = 'dashed';
            }

            const dropzone2 = modal.querySelector('#violation-photo-dropzone-2');
            const previewBox2 = modal.querySelector('#violation-photo-preview-box-2');
            const img2 = modal.querySelector('#violation-photo-img-2');
            const badge2 = modal.querySelector('#violation-photo-badge-2');
            const card2 = modal.querySelector('#violation-photo-card-2');

            if (currentPhoto2) {
                if (dropzone2) dropzone2.style.display = 'none';
                if (previewBox2) previewBox2.style.display = 'block';
                if (img2) img2.src = currentPhoto2;
                if (badge2) {
                    badge2.textContent = 'مرفقة ✓';
                    badge2.style.color = '#15803d';
                    badge2.style.background = '#dcfce7';
                }
                if (card2) card2.style.borderStyle = 'solid';
            } else {
                if (dropzone2) dropzone2.style.display = 'block';
                if (previewBox2) previewBox2.style.display = 'none';
                if (img2) img2.src = '';
                if (badge2) {
                    badge2.textContent = 'فارغ';
                    badge2.style.color = '#64748b';
                    badge2.style.background = '#f1f5f9';
                }
                if (card2) card2.style.borderStyle = 'dashed';
            }
        };

        const processPhotoFile = async (file, slot) => {
            if (!file) return;
            if (file.size > 2 * 1024 * 1024) {
                if (typeof Notification !== 'undefined') {
                    Notification.warning('حجم الصورة كبير جداً. الحد الأقصى 2MB');
                }
                showFormBanner('warning', 'حجم الصورة كبير جداً', 'الحد الأقصى المسموح به هو 2 ميجابايت.');
                return;
            }
            try {
                const base64 = await Violations.convertImageToBase64(file);
                if (slot === 1) currentPhoto1 = base64;
                else currentPhoto2 = base64;
                syncPhotoCards();
            } catch (err) {
                Utils.safeError('خطأ في معالجة الصورة:', err);
            }
        };

        // أحداث الصورة 1
        const inputPhoto1 = modal.querySelector('#violation-photo-input-1');
        const dropzonePhoto1 = modal.querySelector('#violation-photo-dropzone-1');
        const changePhoto1 = modal.querySelector('#violation-photo-change-btn-1');
        const delPhoto1 = modal.querySelector('#violation-photo-del-btn-1');
        const zoomPhoto1 = modal.querySelector('#violation-photo-zoom-btn-1');
        const imgPhoto1 = modal.querySelector('#violation-photo-img-1');

        if (dropzonePhoto1 && inputPhoto1) {
            dropzonePhoto1.addEventListener('click', () => inputPhoto1.click());
            dropzonePhoto1.addEventListener('dragover', (e) => { e.preventDefault(); dropzonePhoto1.style.background = '#dbeafe'; });
            dropzonePhoto1.addEventListener('dragleave', () => { dropzonePhoto1.style.background = '#f8fafc'; });
            dropzonePhoto1.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzonePhoto1.style.background = '#f8fafc';
                if (e.dataTransfer?.files?.[0]) processPhotoFile(e.dataTransfer.files[0], 1);
            });
            inputPhoto1.addEventListener('change', (e) => {
                if (e.target.files?.[0]) processPhotoFile(e.target.files[0], 1);
            });
        }
        if (changePhoto1 && inputPhoto1) {
            changePhoto1.addEventListener('click', () => inputPhoto1.click());
        }
        if (delPhoto1) {
            delPhoto1.addEventListener('click', () => {
                currentPhoto1 = '';
                if (inputPhoto1) inputPhoto1.value = '';
                syncPhotoCards();
            });
        }
        if (zoomPhoto1) {
            zoomPhoto1.addEventListener('click', () => {
                if (currentPhoto1) Violations.openPhotoLightbox(currentPhoto1, 'مشهد المخالفة الميدانية (قبل المعالجة)');
            });
        }
        if (imgPhoto1) {
            imgPhoto1.style.cursor = 'pointer';
            imgPhoto1.addEventListener('click', () => {
                if (currentPhoto1) Violations.openPhotoLightbox(currentPhoto1, 'مشهد المخالفة الميدانية (قبل المعالجة)');
            });
        }

        // أحداث الصورة 2
        const inputPhoto2 = modal.querySelector('#violation-photo-input-2');
        const dropzonePhoto2 = modal.querySelector('#violation-photo-dropzone-2');
        const changePhoto2 = modal.querySelector('#violation-photo-change-btn-2');
        const delPhoto2 = modal.querySelector('#violation-photo-del-btn-2');
        const zoomPhoto2 = modal.querySelector('#violation-photo-zoom-btn-2');
        const imgPhoto2 = modal.querySelector('#violation-photo-img-2');

        if (dropzonePhoto2 && inputPhoto2) {
            dropzonePhoto2.addEventListener('click', () => inputPhoto2.click());
            dropzonePhoto2.addEventListener('dragover', (e) => { e.preventDefault(); dropzonePhoto2.style.background = '#d1fae5'; });
            dropzonePhoto2.addEventListener('dragleave', () => { dropzonePhoto2.style.background = '#f8fafc'; });
            dropzonePhoto2.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzonePhoto2.style.background = '#f8fafc';
                if (e.dataTransfer?.files?.[0]) processPhotoFile(e.dataTransfer.files[0], 2);
            });
            inputPhoto2.addEventListener('change', (e) => {
                if (e.target.files?.[0]) processPhotoFile(e.target.files[0], 2);
            });
        }
        if (changePhoto2 && inputPhoto2) {
            changePhoto2.addEventListener('click', () => inputPhoto2.click());
        }
        if (delPhoto2) {
            delPhoto2.addEventListener('click', () => {
                currentPhoto2 = '';
                if (inputPhoto2) inputPhoto2.value = '';
                syncPhotoCards();
            });
        }
        if (zoomPhoto2) {
            zoomPhoto2.addEventListener('click', () => {
                if (currentPhoto2) Violations.openPhotoLightbox(currentPhoto2, 'صورة إضافية / بعد الإجراء التصحيحي');
            });
        }
        if (imgPhoto2) {
            imgPhoto2.style.cursor = 'pointer';
            imgPhoto2.addEventListener('click', () => {
                if (currentPhoto2) Violations.openPhotoLightbox(currentPhoto2, 'صورة إضافية / بعد الإجراء التصحيحي');
            });
        }

        // زر تبديل الصورتين (⇄)
        const swapPhotosBtn = modal.querySelector('#violation-photos-swap-btn');
        if (swapPhotosBtn) {
            swapPhotosBtn.addEventListener('click', () => {
                if (!currentPhoto1 && !currentPhoto2) {
                    if (typeof Notification !== 'undefined') Notification.info('يرجى إرفاق صورة واحدة على الأقل لتبديل مكانها');
                    return;
                }
                const temp = currentPhoto1;
                currentPhoto1 = currentPhoto2;
                currentPhoto2 = temp;
                syncPhotoCards();
                if (typeof Notification !== 'undefined') Notification.success('تم تبديل مكان الصورتين (⇄)');
            });
        }

        // تشغيل المزامنة الأولية لكروت الصور
        syncPhotoCards();

        // الحصول على النموذج وزر الإرسال
        const form = modal.querySelector('#violation-form');
        const initialSubmitBtn = modal.querySelector('#violation-submit-btn') || form?.querySelector('button[type="submit"]');

        if (!form || !initialSubmitBtn) {
            if (AppState.debugMode) Utils.safeError('❌ النموذج أو زر الإرسال غير موجود');
            Notification.error('خطأ في تحميل النموذج. يرجى إعادة المحاولة.');
            return;
        }

        // إزالة معالجات قديمة قبل الربط — القفل يعتمد على الزر الحي وليس النسخة المستبدَلة
        if (initialSubmitBtn.parentNode) {
            const clonedSubmitBtn = initialSubmitBtn.cloneNode(true);
            clonedSubmitBtn.disabled = false;
            clonedSubmitBtn.removeAttribute('aria-busy');
            initialSubmitBtn.parentNode.replaceChild(clonedSubmitBtn, initialSubmitBtn);
        }

        let submitInFlight = false;
        const getLiveSubmitBtn = () => modal.querySelector('#violation-submit-btn') || form.querySelector('button[type="submit"]');
        const savingLabel = this._t('module.violations.submit.saving', 'جاري الحفظ...');

        // ✅ Helper: التحكم بشريط التنبيه أعلى النموذج (يبقي النموذج مفتوحاً)
        const showFormBanner = (type, title, text) => {
            const banner = modal.querySelector('#violation-form-banner');
            const icon   = modal.querySelector('#violation-form-banner-icon');
            const titleEl= modal.querySelector('#violation-form-banner-title');
            const textEl = modal.querySelector('#violation-form-banner-text');
            if (!banner || !icon || !titleEl || !textEl) return;

            // ألوان حسب النوع
            const themes = {
                error:   { bg:'#fef2f2', border:'#fecaca', text:'#991b1b', icon:'fa-circle-xmark text-red-600' },
                warning: { bg:'#fffbeb', border:'#fde68a', text:'#92400e', icon:'fa-triangle-exclamation text-amber-600' },
                success: { bg:'#ecfdf5', border:'#a7f3d0', text:'#065f46', icon:'fa-circle-check text-emerald-600' },
                info:    { bg:'#eff6ff', border:'#bfdbfe', text:'#1e40af', icon:'fa-circle-info text-blue-600' }
            };
            const theme = themes[type] || themes.info;
            banner.style.background  = theme.bg;
            banner.style.borderColor = theme.border;
            banner.style.color       = theme.text;
            icon.className = 'fas ' + theme.icon + ' text-lg mt-0.5';
            titleEl.textContent = title || '';
            textEl.textContent  = text  || '';
            banner.classList.remove('hidden');
            // التمرير لأعلى داخل المودال حتى يرى المستخدم التنبيه
            try {
                const modalBody = modal.querySelector('.modal-body');
                if (modalBody) modalBody.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (e) { /* ignore */ }
        };
        const hideFormBanner = () => {
            const banner = modal.querySelector('#violation-form-banner');
            if (banner) banner.classList.add('hidden');
        };

        // ربط زر إغلاق التنبيه
        const bannerCloseBtn = modal.querySelector('#violation-form-banner-close');
        if (bannerCloseBtn) bannerCloseBtn.addEventListener('click', hideFormBanner);

        // ========== كود جديد بسيط ونظيف ==========

        // معالج النقر على زر التسجيل
        const handleSubmit = async (e) => {
            // منع السلوك الافتراضي للنموذج
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }

            if (submitInFlight || this._violationSubmitLock || form.dataset.submitting === '1') {
                if (typeof Notification !== 'undefined' && Notification.warning) {
                    Notification.warning(this._t('module.violations.duplicate.click', 'جاري التسجيل الآن. لا تضغط مرة أخرى.'));
                }
                if (AppState.debugMode) Utils.safeLog('⚠️ النموذج قيد المعالجة...');
                return;
            }

            submitInFlight = true;
            this._violationSubmitLock = true;
            form.dataset.submitting = '1';
            const btn = getLiveSubmitBtn();
            const originalText = btn ? btn.innerHTML : '';
            const restoreSubmitBtn = () => {
                submitInFlight = false;
                this._violationSubmitLock = false;
                this._violationInflightDupKey = '';
                try { form.dataset.submitting = ''; } catch (_e) { /* ignore */ }
                const live = getLiveSubmitBtn();
                if (live) {
                    live.disabled = false;
                    live.removeAttribute('aria-busy');
                    live.innerHTML = originalText;
                }
            };
            if (btn) {
                btn.disabled = true;
                btn.setAttribute('aria-busy', 'true');
                btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> ' + savingLabel;
            }

            try {
                // جمع البيانات من النموذج
                const personType = document.getElementById('violation-person-type')?.value;
                const violationDate = document.getElementById('violation-date')?.value;
                const violationTime = document.getElementById('violation-time')?.value;
                const violationType = document.getElementById('violation-type')?.value;
                const severity = document.getElementById('violation-severity')?.value;
                const status = document.getElementById('violation-status')?.value;
                const violationDetails = document.getElementById('violation-details')?.value.trim() || '';
                const actionTaken = document.getElementById('violation-action')?.value.trim() || '';
                const rootCause = document.getElementById('violation-root-cause')?.value.trim() || '';
                const fineAmountRaw = document.getElementById('violation-fine-amount')?.value;
                let fineAmount = '';
                if (fineAmountRaw !== '' && fineAmountRaw !== null && fineAmountRaw !== undefined) {
                    const fineAmountParsed = this.parseFineAmount(fineAmountRaw);
                    if (Number.isFinite(fineAmountParsed) && fineAmountParsed >= 0) {
                        fineAmount = fineAmountParsed;
                    }
                } else {
                    fineAmount = this.parseFineAmount(getDefaultFineAmountForSelectedType());
                }

                // التحقق من البيانات الإلزامية
                const missing = [];
                if (!personType) missing.push('نوع المخالفة (موظف/مقاول)');
                if (!violationDate) missing.push('تاريخ المخالفة');
                if (!violationTime) missing.push('وقت المخالفة');
                if (!violationType) missing.push('نوع المخالفة');
                if (!severity) missing.push('شدة المخالفة');
                if (!status) missing.push('حالة المخالفة');

                // التحقق من بيانات الشخص
                let personName = '';
                let contractorId = '';
                if (personType === 'employee') {
                    const code = document.getElementById('violation-employee-code')?.value.trim();
                    personName = document.getElementById('violation-person-name')?.value.trim();
                    if (!code) missing.push('الكود الوظيفي');
                    if (!personName) missing.push('اسم الموظف');
                } else if (personType === 'contractor') {
                    const contractorSelect = document.getElementById('violation-contractor-select');
                    if (!contractorSelect || !contractorSelect.value) {
                        missing.push('اسم المقاول');
                    } else {
                        personName = contractorSelect.value;
                        const selectedOption = contractorSelect.options[contractorSelect.selectedIndex];
                        contractorId = selectedOption?.dataset.contractorCode || selectedOption?.dataset.contractorId || '';
                    }
                    const contractorDept = document.getElementById('violation-contractor-department')?.value.trim();
                    if (!contractorDept) {
                        missing.push('الإدارة التابع له المقاول');
                    }
                }

                // التحقق من الموقع ومكان المخالفة
                let location = '';
                let locationName = '';
                let place = '';
                let placeName = '';
                if (personType === 'employee') {
                    const locationSelect = document.getElementById('violation-employee-location');
                    const placeSelect = document.getElementById('violation-employee-place');
                    location = locationSelect?.value || '';
                    locationName = locationSelect?.options[locationSelect?.selectedIndex]?.text || '';
                    place = placeSelect?.value || '';
                    placeName = placeSelect?.options[placeSelect?.selectedIndex]?.text || '';
                    if (place === '__custom__') {
                        const customVal = document.getElementById('violation-employee-custom-place')?.value.trim() || '';
                        place = customVal;
                        placeName = customVal;
                    }
                } else if (personType === 'contractor') {
                    const locationSelect = document.getElementById('violation-contractor-location');
                    const placeSelect = document.getElementById('violation-contractor-place');
                    location = locationSelect?.value || '';
                    locationName = locationSelect?.options[locationSelect?.selectedIndex]?.text || '';
                    place = placeSelect?.value || '';
                    placeName = placeSelect?.options[placeSelect?.selectedIndex]?.text || '';
                    if (place === '__custom__') {
                        const customVal = document.getElementById('violation-contractor-custom-place')?.value.trim() || '';
                        place = customVal;
                        placeName = customVal;
                    }
                }
                if (!location) missing.push('الموقع');
                if (!place) missing.push('مكان المخالفة');

                // إذا كانت هناك حقول ناقصة
                if (missing.length > 0) {
                    // ✅ تنبيه أعلى النموذج (وليس toast سفلي) — يبقى مرئياً حتى يُكمل المستخدم
                    showFormBanner(
                        'error',
                        'بيانات إلزامية ناقصة',
                        'يرجى استكمال: ' + missing.join('، ')
                    );
                    restoreSubmitBtn();

                    // إبراز الحقول الناقصة
                    missing.forEach(field => {
                        let inputId = '';
                        if (field.includes('الكود الوظيفي')) inputId = 'violation-employee-code';
                        else if (field.includes('اسم الموظف')) inputId = 'violation-person-name';
                        else if (field.includes('اسم المقاول')) inputId = 'violation-contractor-select';
                        else if (field.includes('الإدارة التابع له المقاول')) inputId = 'violation-contractor-department';
                        else if (field.includes('تاريخ')) inputId = 'violation-date';
                        else if (field.includes('وقت')) inputId = 'violation-time';
                        else if (field.includes('نوع المخالفة')) inputId = 'violation-type';
                        else if (field.includes('الشدة')) inputId = 'violation-severity';
                        else if (field.includes('الحالة')) inputId = 'violation-status';
                        else if (field.includes('الموقع')) inputId = personType === 'employee' ? 'violation-employee-location' : 'violation-contractor-location';
                        else if (field.includes('مكان المخالفة')) inputId = personType === 'employee' ? 'violation-employee-place' : 'violation-contractor-place';

                        if (inputId) {
                            const input = document.getElementById(inputId);
                            if (input) {
                                input.classList.add('border-red-500', 'ring-2', 'ring-red-300');
                                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                setTimeout(() => {
                                    input.classList.remove('border-red-500', 'ring-2', 'ring-red-300');
                                }, 3000);
                            }
                        }
                    });
                    return;
                }

                // معالجة الصورتين
                const photo1 = currentPhoto1 || '';
                const photo2 = currentPhoto2 || '';
                const photos = [photo1, photo2].filter(Boolean);

                // ✅ مسح أي تنبيه سابق قبل المتابعة
                hideFormBanner();

                // إنشاء كائن البيانات
                const violationTypeOption = violationTypeSelect?.selectedOptions?.[0];
                const violationTypeId = violationTypeOption?.getAttribute('data-type-id') || '';

                const violationDateTime = violationDate && violationTime
                    ? new Date(`${violationDate}T${violationTime}`).toISOString()
                    : new Date().toISOString();

                const formData = {
                    id: violationData?.id || Utils.generateId('VIOLATION'),
                    isoCode: violationData?.isoCode || generateISOCode('VIOL', AppState.appData.violations || []),
                    personType: personType,
                    employeeId: personType === 'employee' ? (violationData?.employeeId || Utils.generateId('EMP')) : '',
                    employeeName: personType === 'employee' ? personName : '',
                    employeeCode: personType === 'employee' ? document.getElementById('violation-employee-code')?.value.trim() || '' : '',
                    employeeNumber: personType === 'employee' ? document.getElementById('violation-employee-code')?.value.trim() || '' : '',
                    employeePosition: personType === 'employee' ? document.getElementById('violation-employee-position')?.value.trim() || '' : '',
                    employeeDepartment: personType === 'employee' ? document.getElementById('violation-employee-department')?.value.trim() || '' : '',
                    contractorId: personType === 'contractor' ? contractorId : '',
                    contractorName: personType === 'contractor' ? personName : '',
                    contractorWorker: personType === 'contractor' ? document.getElementById('violation-contractor-worker')?.value.trim() || '' : '',
                    contractorPosition: personType === 'contractor' ? document.getElementById('violation-contractor-position')?.value.trim() || '' : '',
                    contractorDepartment: personType === 'contractor' ? document.getElementById('violation-contractor-department')?.value.trim() || '' : '',
                    violationTypeId: violationTypeId,
                    violationType: violationType,
                    fineAmount: this.parseFineAmount(fineAmount),
                    violationDate: violationDateTime,
                    violationTime: violationTime,
                    // حفظ ID الموقع واسمه
                    violationLocation: locationName && locationName !== '-- اختر الموقع --' ? locationName : location,
                    violationLocationId: location ? String(location).trim() : null,
                    // حفظ ID المكان واسمه
                    violationPlace: placeName && placeName !== '-- اختر مكان المخالفة --' ? placeName : place,
                    violationPlaceId: place ? String(place).trim() : null,
                    violationDetails: violationDetails,
                    severity: severity,
                    actionTaken: actionTaken,
                    status: status,
                    rootCause: rootCause || violationData?.rootCause || 'سلوك غير آمن (Unsafe Act)',
                    photo: photo1,
                    photo2: photo2,
                    photos: photos,
                    createdAt: violationData?.createdAt || new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    violationDateKey: '',
                    violationTimeKey: ''
                };
                formData.violationDateKey = this._violationDateKey(formData);
                formData.violationTimeKey = this._violationTimeKey(formData);

                const seqDraft = {
                    personType,
                    violationDate: violationDateTime,
                    employeeCode: formData.employeeCode,
                    employeeNumber: formData.employeeNumber,
                    contractorName: formData.contractorName,
                    contractorWorker: formData.contractorWorker
                };
                const priorSeq = this.countPriorViolationsSamePersonMonth(
                    seqDraft,
                    isEdit && violationData?.id ? violationData.id : null
                );
                formData.violationSequenceInMonth = priorSeq + 1;

                const dupHit = this.findDuplicateViolation(formData, {
                    excludeId: isEdit && violationData?.id ? violationData.id : null
                });
                if (dupHit) {
                    const title = this._t('module.violations.duplicate.title', 'تم تسجيل هذه المخالفة مسبقاً');
                    const text = dupHit.source === 'pending'
                        ? this._t('module.violations.duplicate.pending', 'طلب مماثل معلّق في دائرة الاعتماد. لن يُعاد الإرسال.')
                        : (dupHit.source === 'inflight'
                            ? this._t('module.violations.duplicate.click', 'جاري التسجيل الآن. لا تضغط مرة أخرى.')
                            : this._t('module.violations.duplicate.text', 'نفس الموظف أو المقاول ونفس التاريخ والوقت ونوع المخالفة موجودة بالفعل. لن يُعاد التسجيل.'));
                    showFormBanner('warning', title, text);
                    if (typeof Notification !== 'undefined' && Notification.warning) Notification.warning(title);
                    restoreSubmitBtn();
                    return;
                }

                this._violationInflightDupKey = this._buildViolationDupKey(formData);

                // ✅ دائرة اعتماد المخالفات: إذا فُعِّلت ولم يكن المستخدم مديراً، أرسل طلب اعتماد بدل الحفظ المباشر
                try {
                    const approvalGate = await this.checkViolationApprovalGate(formData, { isEdit });
                    if (approvalGate && approvalGate.requiresApproval) {
                        // 🛡️ حماية حرجة: مسار الاعتماد يخزّن violationData كـ JSON.stringify في خلية واحدة
                        // (قاعدة SQL يحدّ الخلية بـ 50000 حرف). صورة base64 بحجم 2MB ≈ 2.7M حرف!
                        // نرفع الصورة لـ Drive أولاً ثم نضع الرابط فقط في الـ payload.
                        let approvalPhoto = photo;
                        if (approvalPhoto && typeof approvalPhoto === 'string' && approvalPhoto.startsWith('data:')) {
                            try {
                                btn.innerHTML = '<i class="fas fa-cloud-upload-alt fa-spin ml-2"></i> جاري رفع الصورة...';
                                const uploadRes = await GoogleIntegration.uploadFileToDrive?.(
                                    approvalPhoto,
                                    `violation_${formData.id}_${Date.now()}.jpg`,
                                    'image/jpeg',
                                    'Violations'
                                );
                                if (uploadRes && uploadRes.success) {
                                    approvalPhoto = uploadRes.directLink || uploadRes.shareableLink || '';
                                } else {
                                    // 🚨 لا نُمرر base64 للخلية أبداً — نُسقط الصورة مع تنبيه واضح
                                    approvalPhoto = '';
                                    showFormBanner(
                                        'warning',
                                        'تعذّر رفع الصورة',
                                        'سيتم إرسال طلب الاعتماد بدون الصورة. تحقق من اتصال الإنترنت أو حاول مرة أخرى لاحقاً.'
                                    );
                                }
                                btn.innerHTML = originalText;
                                btn.disabled = true;
                                btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الحفظ...';
                            } catch (upErr) {
                                if (AppState.debugMode) Utils.safeWarn('Drive upload failed in approval path:', upErr);
                                approvalPhoto = ''; // حماية: لا نُمرر base64 أبداً
                            }
                        }
                        const safeFormData = { ...formData, photo: approvalPhoto };

                        // إرسال طلب الاعتماد للـ backend وعدم الحفظ المحلي
                        const approvalResult = await this.submitViolationForApproval(safeFormData, { isEdit, originalId: violationData?.id });
                        if (approvalResult && approvalResult.success) {
                            this._rememberViolationDupKey(formData);
                            this._violationInflightDupKey = '';
                            this._violationSubmitLock = false;
                            this._invalidateViolationApprovalRequestsCache();
                            modal.remove();
                            Notification.success(approvalResult.message || 'تم إرسال المخالفة لدائرة الاعتماد بنجاح. ستظهر بعد اعتمادها.');
                            // إطلاق حدث لتحديث قائمة طلبات الاعتماد إن كانت مفتوحة
                            try {
                                document.dispatchEvent(new CustomEvent('violation-approval-request-created', { detail: approvalResult.data || {} }));
                            } catch (e) { /* ignore */ }
                            return; // ⚠️ نخرج هنا — لا نكمل مسار الحفظ المباشر
                        } else if (approvalResult && approvalResult.duplicate) {
                            restoreSubmitBtn();
                            showFormBanner(
                                'warning',
                                this._t('module.violations.duplicate.title', 'تم تسجيل هذه المخالفة مسبقاً'),
                                approvalResult.message || this._t('module.violations.duplicate.pending', 'طلب مماثل معلّق في دائرة الاعتماد. لن يُعاد الإرسال.')
                            );
                            if (typeof Notification !== 'undefined' && Notification.warning) {
                                Notification.warning(this._t('module.violations.duplicate.title', 'تم تسجيل هذه المخالفة مسبقاً'));
                            }
                            return;
                        } else {
                            restoreSubmitBtn();
                            // ✅ تنبيه أعلى النموذج (يبقي النموذج مفتوحاً ليُعيد المستخدم المحاولة)
                            const msg = (approvalResult && approvalResult.message) || 'فشل إرسال طلب الاعتماد. حاول مرة أخرى.';
                            showFormBanner('error', 'تعذّر إرسال طلب الاعتماد', msg);
                            return;
                        }
                    }
                } catch (gateErr) {
                    if (AppState.debugMode) Utils.safeWarn('approvalGate error (continuing with direct save):', gateErr);
                    // في حال خطأ في فحص الاعتماد، نُكمل المسار العادي حفاظاً على عدم تعطيل العمل
                }

                // حفظ في AppState
                if (!AppState.appData.violations) {
                    AppState.appData.violations = [];
                }

                if (isEdit && violationData?.id) {
                    const index = AppState.appData.violations.findIndex(v => v.id === violationData.id);
                    if (index !== -1) {
                        // نحافظ على البيانات المرتبطة القديمة (المرفقات/المرجعيات) أثناء التعديل
                        AppState.appData.violations[index] = {
                            ...AppState.appData.violations[index],
                            ...formData,
                            id: violationData.id,
                            isoCode: violationData.isoCode || formData.isoCode,
                            createdAt: violationData.createdAt || formData.createdAt,
                            updatedAt: new Date().toISOString()
                        };
                    } else {
                        throw new Error('تعذر العثور على سجل المخالفة الأصلي للتعديل. أعد تحميل الصفحة ثم حاول مرة أخرى.');
                    }
                } else {
                    AppState.appData.violations.push(formData);
                }

                this._rememberViolationDupKey(formData);
                this._violationInflightDupKey = '';
                this._violationSubmitLock = false;

                // حفظ محلياً
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }

                // 2. إغلاق النموذج بشكل مباشر وسريع جداً بدون أي تأخير
                modal.remove();

                // 3. عرض رسالة نجاح فورية (محلية أولاً مع إشارة جاري المزامنة)
                Notification.success(`تم ${isEdit ? 'تحديث' : 'تسجيل'} المخالفة بنجاح وجاري المزامنة في الخلفية...`);

                // 4. تحديث الكروت فوراً (مباشر بدون انتظار) ثم القائمة بالكامل
                try { this.updateAllViolationsStats(); } catch (e) { /* ignore */ }
                // ✅ تحديث كروت لوحة التحكم فوراً
                try {
                    if (typeof Dashboard !== 'undefined') {
                        if (typeof Dashboard.updateStats === 'function') Dashboard.updateStats();
                        if (typeof Dashboard.updateReportsStatistics === 'function') Dashboard.updateReportsStatistics();
                    }
                } catch (e) { /* ignore */ }
                // ✅ إطلاق حدث data-saved ليستجيب له أي مستمع آخر
                try {
                    document.dispatchEvent(new CustomEvent('data-saved', {
                        detail: { module: 'violations', action: isEdit ? 'تحديث' : 'إضافة', data: formData }
                    }));
                } catch (e) { /* ignore */ }
                // ✅ تحديث القائمة في المكان (بدون إعادة بناء كامل للـ DOM)
                // Violations.load() كانت تُعيد بناء كل شيء وتطلق جلب خلفي يُلغي المخالفة الجديدة
                try {
                    if (typeof Violations !== 'undefined' && typeof Violations.refreshViolationsView === 'function') {
                        Violations.refreshViolationsView();
                    } else if (typeof Violations !== 'undefined' && Violations.load) {
                        Violations.load();
                    }
                } catch (e) { /* ignore */ }

                // 5. المزامنة والرفع في الخلفية دون تعطيل واجهة المستخدم
                const performBackgroundSync = async (localPhoto1, localPhoto2) => {
                    let finalPhoto1 = localPhoto1;
                    let finalPhoto2 = localPhoto2;
                    let hasUpdatedPhoto = false;

                    // رفع الصورة 1 في الخلفية إذا كانت base64
                    if (localPhoto1 && localPhoto1.startsWith('data:')) {
                        try {
                            const uploadResult = await GoogleIntegration.uploadFileToDrive?.(
                                localPhoto1,
                                `violation_${formData.id}_photo1_${Date.now()}.jpg`,
                                'image/jpeg',
                                'Violations'
                            );
                            if (uploadResult?.success) {
                                finalPhoto1 = uploadResult.directLink || uploadResult.shareableLink || localPhoto1;
                                hasUpdatedPhoto = true;
                            }
                        } catch (err) {
                            if (AppState.debugMode) Utils.safeWarn('خطأ في رفع الصورة 1 في الخلفية:', err);
                        }
                    }

                    // رفع الصورة 2 في الخلفية إذا كانت base64
                    if (localPhoto2 && localPhoto2.startsWith('data:')) {
                        try {
                            const uploadResult = await GoogleIntegration.uploadFileToDrive?.(
                                localPhoto2,
                                `violation_${formData.id}_photo2_${Date.now()}.jpg`,
                                'image/jpeg',
                                'Violations'
                            );
                            if (uploadResult?.success) {
                                finalPhoto2 = uploadResult.directLink || uploadResult.shareableLink || localPhoto2;
                                hasUpdatedPhoto = true;
                            }
                        } catch (err) {
                            if (AppState.debugMode) Utils.safeWarn('خطأ في رفع الصورة 2 في الخلفية:', err);
                        }
                    }

                    // إذا تم تحديث أي صورة بعيدة، نحدث السجل المحلي
                    if (hasUpdatedPhoto) {
                        const currentViolations = AppState.appData.violations || [];
                        const index = currentViolations.findIndex(v => v.id === formData.id);
                        if (index !== -1) {
                            currentViolations[index].photo = finalPhoto1;
                            currentViolations[index].photo2 = finalPhoto2;
                            currentViolations[index].photos = [finalPhoto1, finalPhoto2].filter(Boolean);
                            formData.photo = finalPhoto1;
                            formData.photo2 = finalPhoto2;
                            formData.photos = [finalPhoto1, finalPhoto2].filter(Boolean);
                            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                                window.DataManager.save();
                            }
                            // إعادة تحميل خفيفة لتحديث صورة الكارت إذا كانت معروضة
                            if (typeof Violations !== 'undefined' && Violations.load) {
                                Violations.load();
                            }
                        }
                    }

                    // المزامنة مع قاعدة SQL في الخلفية — استخدام addViolation/updateViolation
                    try {
                        if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                            // تحضير نسخة من البيانات مع الصور النهائية (إن رُفعت)
                            const payload = Object.assign({}, formData, {
                                photo: finalPhoto1,
                                photo2: finalPhoto2,
                                photos: [finalPhoto1, finalPhoto2].filter(Boolean)
                            });
                            let saveRes;
                            if (isEdit) {
                                saveRes = await GoogleIntegration.sendRequest({
                                    action: 'updateViolation',
                                    data: { violationId: formData.id, updateData: payload }
                                });
                            } else {
                                saveRes = await GoogleIntegration.sendRequest({
                                    action: 'addViolation',
                                    data: payload
                                });
                            }
                            if (saveRes && (saveRes.success === true || saveRes.duplicate === true)) {
                                try { localStorage.setItem('violations_last_sync', String(Date.now())); } catch (eLs) { /* ignore */ }
                                if (AppState.debugMode) Utils.safeLog('✅ حفظ المخالفة في الخادم بنجاح');
                            } else {
                                if (AppState.debugMode) Utils.safeWarn('⚠️ فشل حفظ المخالفة في الخادم:', saveRes && saveRes.message);
                                // إضافة لقائمة الانتظار للمزامنة لاحقاً
                                try {
                                    if (typeof DataManager !== 'undefined' && DataManager.addToPendingSync) {
                                        DataManager.addToPendingSync('Violations', AppState.appData.violations);
                                    }
                                } catch (eP) { /* ignore */ }
                            }
                        }
                    } catch (err) {
                        if (AppState.debugMode) Utils.safeWarn('خطأ في حفظ المخالفة في الخلفية:', err);
                        // محاولة إضافة لقائمة الانتظار لإعادة المحاولة لاحقاً
                        try {
                            if (typeof DataManager !== 'undefined' && DataManager.addToPendingSync) {
                                DataManager.addToPendingSync('Violations', AppState.appData.violations);
                            }
                        } catch (eP) { /* ignore */ }
                    }
                };

                // إطلاق المهمة في الخلفية دون await
                performBackgroundSync(photo1, photo2).catch(err => {
                    Utils.safeError('خطأ غير متوقع في مزامنة الخلفية للمخالفة:', err);
                });

            } catch (error) {
                Utils.safeError('❌ خطأ في حفظ المخالفة:', error);
                // ✅ تنبيه أعلى النموذج بدلاً من toast سفلي
                showFormBanner('error', 'حدث خطأ', (error && (error.message || error.toString())) || 'فشل حفظ المخالفة');
                restoreSubmitBtn();
            }
        };

        form.addEventListener('submit', handleSubmit, { once: false });

        const liveSubmitBtn = getLiveSubmitBtn();
        if (liveSubmitBtn) {
            liveSubmitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit(e);
            });
        }

        // إغلاق النموذج عند النقر خارجه
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // إغلاق النموذج عند الضغط على ESC
        const handleEscape = (e) => {
            if (e.key === 'Escape' && document.body.contains(modal)) {
                modal.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    },

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
            var el = document.getElementById('blacklist-factory');
            if (el && el.tagName === 'SELECT') { var v = el.value; el.innerHTML = opts; if (v) el.value = v; }
        } catch (e) { if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('⚠️ Violations.refreshSiteDropdowns:', e); }
    },

    getPlaceOptions(siteId) {
        try {
            if (!siteId) return [];
            const placesMap = new Map();
            const addP = (id, name) => {
                const clean = String(name || '').trim();
                if (!clean || clean.includes('-- اختر') || clean === 'مكان غير محدد') return;
                const key = clean.toLowerCase();
                if (!placesMap.has(key)) {
                    placesMap.set(key, { id: id || Utils.generateId('PLACE'), name: clean });
                }
            };

            const sites = this.getSiteOptions();
            const normSiteId = String(siteId).trim().toLowerCase();
            const selectedSite = sites.find(s => 
                String(s.id).trim().toLowerCase() === normSiteId || 
                String(s.name).trim().toLowerCase() === normSiteId
            );
            const targetSiteName = selectedSite ? selectedSite.name : siteId;

            // 1. من Permissions.formSettingsState
            if (typeof Permissions !== 'undefined' && Permissions.formSettingsState && Permissions.formSettingsState.sites) {
                const site = Permissions.formSettingsState.sites.find(s => 
                    String(s.id).toLowerCase() === normSiteId || String(s.name).toLowerCase() === normSiteId
                );
                if (site && Array.isArray(site.places)) {
                    site.places.forEach(p => addP(p.id || p.placeId, p.name || p.placeName));
                }
            }

            // 2. من AppState.appData.observationSites
            if (Array.isArray(AppState.appData?.observationSites)) {
                const site = AppState.appData.observationSites.find(s =>
                    String(s.id).toLowerCase() === normSiteId || String(s.siteId).toLowerCase() === normSiteId || String(s.name).toLowerCase() === normSiteId
                );
                if (site) {
                    const list = site.places || site.locations || site.children || site.areas || [];
                    list.forEach(p => addP(p.id || p.placeId, p.name || p.placeName || p.title || p.label));
                }
            }

            // 3. استخراج الأماكن المسجلة مسبقاً في سجل المخالفات لنفس هذا الموقع
            (AppState.appData?.violations || []).forEach(v => {
                if (!v) return;
                const vLoc = String(v.violationLocation || '').trim().toLowerCase();
                const vLocId = String(v.violationLocationId || '').trim().toLowerCase();
                if (vLoc === normSiteId || vLocId === normSiteId || (targetSiteName && vLoc === String(targetSiteName).toLowerCase())) {
                    if (v.violationPlace) addP(v.violationPlaceId, v.violationPlace);
                }
            });

            // 4. أماكن قياسية للمصانع والمواقع لضمان عدم خلو القائمة نهائياً
            const defaultPlantAreas = [
                'عنبر الإنتاج الرئيسي',
                'منطقة التعبئة والتغليف',
                'مستودع المواد الخام',
                'مستودع المنتج التام',
                'غرفة الغاز الطبيعي',
                'محطة المحولات الكهربائية',
                'ورشة الصيانة الميكانيكية',
                'ورشة الصيانة الكهربائية',
                'منطقة الشحن والتفريغ (Ramps)',
                'مبنى الإدارة والمكاتب',
                'معمل الجودة ومراقبة العمليات',
                'منطقة تخريد النفايات والمخلفات',
                'ممر الطوارئ والهروب الرئيسي',
                'منطقة الخزانات والمضخات'
            ];
            defaultPlantAreas.forEach(p => addP(null, p));

            return Array.from(placesMap.values());
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في الحصول على قائمة الأماكن:', error);
            return [];
        }
    },

    async loadLocationOptions(personType = 'employee') {
        try {
            // التأكد من تحميل إعدادات النماذج
            if (typeof Permissions !== 'undefined' && typeof Permissions.ensureFormSettingsState === 'function') {
                await Permissions.ensureFormSettingsState();
            }

            const sites = this.getSiteOptions();
            const locationSelectId = personType === 'employee' ? 'violation-employee-location' : 'violation-contractor-location';
            const locationSelect = document.getElementById(locationSelectId);

            if (!locationSelect) return;

            locationSelect.innerHTML = '<option value="">-- اختر الموقع --</option>';

            if (sites && sites.length > 0) {
                sites.forEach(site => {
                    const option = document.createElement('option');
                    option.value = site.name || site.id;
                    option.textContent = site.name || site.id;
                    locationSelect.appendChild(option);
                });
            }
        } catch (error) {
            Utils.safeError('❌ خطأ في تحميل المواقع:', error);
        }
    },

    loadPlaceOptions(siteId, selectedPlaceId = '', personType = 'employee') {
        try {
            const placeSelectId = personType === 'employee' ? 'violation-employee-place' : 'violation-contractor-place';
            const placeSelect = document.getElementById(placeSelectId);
            if (!placeSelect) return;

            placeSelect.innerHTML = '<option value="">-- اختر مكان المخالفة --</option>';

            const places = this.getPlaceOptions(siteId);
            let hasSelected = false;

            if (places && places.length > 0) {
                places.forEach(place => {
                    const option = document.createElement('option');
                    option.value = place.name;
                    option.textContent = place.name;
                    if (selectedPlaceId && (place.id === selectedPlaceId || place.name === selectedPlaceId)) {
                        option.selected = true;
                        hasSelected = true;
                    }
                    placeSelect.appendChild(option);
                });
            }

            // إذا كانت القيمة المحددة مسبقاً غير موجودة بالقائمة، نضيفها مباشرة
            if (selectedPlaceId && !hasSelected && selectedPlaceId !== '__custom__') {
                const customOpt = document.createElement('option');
                customOpt.value = selectedPlaceId;
                customOpt.textContent = selectedPlaceId;
                customOpt.selected = true;
                placeSelect.appendChild(customOpt);
            }

            // خيار إدخال مكان مخصص يدوياً
            const addCustomOpt = document.createElement('option');
            addCustomOpt.value = '__custom__';
            addCustomOpt.textContent = '➕ مكان آخر (إدخال يدوي مخصص)...';
            placeSelect.appendChild(addCustomOpt);

            // تفعيل فحص بؤرة الخطر فور تعبئة الأماكن
            const modal = document.querySelector('.modal-overlay');
            if (modal) {
                this.refreshAreaHotspotInModal(modal);
            }
        } catch (error) {
            Utils.safeError('❌ خطأ في تحميل الأماكن:', error);
        }
    },

    async convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    openPhotoLightbox(photoUrl, title = 'صورة المخالفة') {
        if (!photoUrl) return;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);';
        modal.innerHTML = `
            <div style="position:relative;max-width:92vw;max-height:92vh;display:flex;flex-direction:column;background:#1e293b;border-radius:12px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.1);">
                <div style="padding:10px 16px;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #334155;">
                    <span style="font-size:0.9rem;font-weight:700;"><i class="fas fa-image text-blue-400 ml-2"></i>${Utils.escapeHTML(title)}</span>
                    <button type="button" class="lightbox-close-btn" style="color:#94a3b8;background:none;border:none;font-size:1.1rem;cursor:pointer;padding:4px 8px;border-radius:6px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div style="padding:10px;display:flex;align-items:center;justify-content:center;background:#020617;overflow:auto;">
                    <img src="${Utils.escapeHTML(photoUrl)}" alt="عرض الصورة" style="max-width:100%;max-height:80vh;object-fit:contain;border-radius:6px;">
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        const close = () => modal.remove();
        modal.querySelector('.lightbox-close-btn')?.addEventListener('click', close);
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        const escListener = (e) => {
            if (e.key === 'Escape') {
                close();
                document.removeEventListener('keydown', escListener);
            }
        };
        document.addEventListener('keydown', escListener);
    },

    async viewViolation(id) {
        const raw = AppState.appData?.violations?.find(v => v.id === id);
        if (!raw) {
            if (typeof Notification !== 'undefined') Notification.error('المخالفة غير موجودة');
            return;
        }
        const violation = this.normalizeViolationRecord(raw) || raw;
        if (!this.isViolationVisibleToCurrentUser(violation)) {
            if (typeof Notification !== 'undefined') Notification.error('عذراً، ليس لديك صلاحية لعرض مخالفة تابعة لإدارة أخرى');
            return;
        }
        const qSev = String(violation.severity || '').trim();
        const qStat = String(violation.status || '').trim();
        const personHistory = typeof this.getPersonViolationHistory === 'function' ? this.getPersonViolationHistory(violation, violation.id) : null;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 750px; border-radius: 16px; overflow: hidden;">
                <div class="modal-header" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 20px 24px;">
                    <h2 class="modal-title" style="color: white; display: flex; align-items: center; gap: 12px; font-size: 1.3rem;">
                        <i class="fas fa-exclamation-triangle"></i>
                        تفاصيل المخالفة
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white; background: rgba(255,255,255,0.2); border-radius: 8px; width: 36px; height: 36px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 24px;">
                    <div class="space-y-4">
                        <!-- معلومات المخالف (نفس التصميم للموظفين والمقاولين) -->
                        <div style="background: #fef2f2; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                            <h3 style="font-weight: 600; color: #991b1b; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                                <span><i class="fas fa-user"></i> معلومات المخالف</span>
                                ${personHistory ? `
                                    <span class="badge" style="background: ${personHistory.strikeLevel >= 3 ? '#fee2e2' : personHistory.strikeLevel === 2 ? '#fef3c7' : '#d1fae5'}; color: ${personHistory.strikeLevel >= 3 ? '#991b1b' : personHistory.strikeLevel === 2 ? '#92400e' : '#065f46'}; border: 1px solid ${personHistory.strikeLevel >= 3 ? '#fca5a5' : personHistory.strikeLevel === 2 ? '#fcd34d' : '#a7f3d0'}; padding: 3px 10px; border-radius: 9999px; font-weight: 800; font-size: 11px;">
                                        <i class="fas ${personHistory.strikeLevel >= 3 ? 'fa-radiation' : personHistory.strikeLevel === 2 ? 'fa-exclamation-triangle' : 'fa-shield-alt'} ml-1"></i>${personHistory.strikeBadgeText}
                                    </span>
                                ` : ''}
                            </h3>
                            <div class="grid grid-cols-2 gap-4">
                                ${(violation.contractorName || violation.personType === 'contractor') ? `
                                <!-- مقاول: اسم المخالف (العامل) + الوظيفة + اسم المقاول + الإدارة -->
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">اسم المخالف:</label>
                                    <p class="text-gray-800 font-medium">${Utils.escapeHTML(violation.contractorWorker || violation.employeeName || violation.contractorName || '-')}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">الوظيفة:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(violation.contractorPosition || '-')}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">اسم المقاول:</label>
                                    <p class="text-gray-800 font-medium">${Utils.escapeHTML(violation.contractorName || '-')}</p>
                                </div>
                                ${violation.contractorDepartment ? `
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">الإدارة التابع له المقاول:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(violation.contractorDepartment || '-')}</p>
                                </div>
                                ` : ''}
                                ` : `
                                <!-- موظف: اسم المخالف + الكود الوظيفي + الوظيفة + الإدارة -->
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">اسم المخالف:</label>
                                    <p class="text-gray-800 font-medium">${Utils.escapeHTML(violation.employeeName || '-')}</p>
                                </div>
                                ${violation.employeeCode ? `
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">الكود الوظيفي:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(violation.employeeCode || violation.employeeNumber || '-')}</p>
                                </div>
                                ` : ''}
                                ${violation.employeePosition ? `
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">الوظيفة:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(violation.employeePosition || '-')}</p>
                                </div>
                                ` : ''}
                                ${violation.employeeDepartment ? `
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">الإدارة:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(violation.employeeDepartment || '-')}</p>
                                </div>
                                ` : ''}
                                `}
                            </div>
                        </div>

                        <!-- تفاصيل المخالفة -->
                        <div style="background: #fff7ed; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                            <h3 style="font-weight: 600; color: #c2410c; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-info-circle"></i> تفاصيل المخالفة
                            </h3>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">نوع المخالفة:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(violation.violationType || '-')}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">تاريخ المخالفة:</label>
                                    <p class="text-gray-800">${violation.violationDate ? Utils.formatDate(violation.violationDate) : '-'}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">الموقع:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(violation.violationLocation || '-')}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">المكان:</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(violation.violationPlace || '-')}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">الشدة:</label>
                                    <span style="display: inline-block; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; font-weight: 600; background: ${violation.severity === 'عالية' ? '#fef2f2' : violation.severity === 'متوسطة' ? '#fffbeb' : '#eff6ff'}; color: ${violation.severity === 'عالية' ? '#dc2626' : violation.severity === 'متوسطة' ? '#d97706' : '#2563eb'}; border: 1px solid ${violation.severity === 'عالية' ? '#fecaca' : violation.severity === 'متوسطة' ? '#fde68a' : '#bfdbfe'};">
                                        ${violation.severity || '-'}
                                    </span>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">الحالة:</label>
                                    <span style="display: inline-block; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; font-weight: 600; background: ${violation.status === 'محلول' ? '#ecfdf5' : '#fef3c7'}; color: ${violation.status === 'محلول' ? '#059669' : '#d97706'}; border: 1px solid ${violation.status === 'محلول' ? '#a7f3d0' : '#fde68a'};">
                                        ${violation.status || '-'}
                                    </span>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">القيمة المالية:</label>
                                    <p class="text-gray-800 font-semibold">${this.formatFineAmount(Number(this.getEffectiveFineAmount(violation)))}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">السبب الجذري (RCA):</label>
                                    <span style="display: inline-block; padding: 4px 12px; border-radius: 16px; font-size: 0.85rem; font-weight: 700; background: #f0fdfa; color: #0f766e; border: 1px solid #99f6e4;">
                                        ${Utils.escapeHTML(violation.rootCause || 'سلوك غير آمن (Unsafe Act)')}
                                    </span>
                                </div>
                            </div>
                            ${violation.violationDetails ? `
                            <div class="mt-4">
                                <label class="text-sm font-semibold text-gray-600">تفاصيل المخالفة:</label>
                                <p class="text-gray-800 mt-1 p-3 bg-white rounded-lg border">${Utils.escapeHTML(violation.violationDetails)}</p>
                            </div>
                            ` : ''}
                        </div>

                        <!-- الإجراء المتخذ -->
                        ${violation.actionTaken ? `
                        <div style="background: #f0fdf4; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                            <h3 style="font-weight: 600; color: #166534; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-tasks"></i> الإجراء المتخذ
                            </h3>
                            <p class="text-gray-800 p-3 bg-white rounded-lg border">${Utils.escapeHTML(violation.actionTaken)}</p>
                        </div>
                        ` : ''}

                        <!-- صور المخالفة (صورة أساسية وصورة إضافية/بعد التصحيح) -->
                        ${(() => {
                            const p1Raw = violation.photo || (Array.isArray(violation.photos) && violation.photos.length > 0 ? violation.photos[0] : '');
                            const p2Raw = violation.photo2 || (Array.isArray(violation.photos) && violation.photos.length > 1 ? violation.photos[1] : '');
                            const photoUrl1 = this.processPhoto(p1Raw);
                            const photoUrl2 = this.processPhoto(p2Raw);
                            if (!photoUrl1 && !photoUrl2) return '';

                            const renderCard = (pUrl, slotNum, title, sub) => {
                                if (!pUrl) return '';
                                const disp = typeof Utils.resolveDriveAwareImgDisplay === 'function'
                                    ? Utils.resolveDriveAwareImgDisplay(pUrl)
                                    : { canonical: pUrl, displaySrc: pUrl, needsProxy: false, proxyFileId: '' };
                                const proxyAttr = typeof Utils.driveProxyImgAttrs === 'function' ? Utils.driveProxyImgAttrs(disp) : '';
                                return `
                                    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); display: flex; flex-direction: column;">
                                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                                            <span style="font-size: 0.8rem; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 6px;">
                                                <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 6px; background: ${slotNum === 1 ? '#2563eb' : '#059669'}; color: #fff; font-size: 11px; font-weight: 800;">${slotNum}</span>
                                                ${Utils.escapeHTML(title)}
                                            </span>
                                            <span style="font-size: 0.72rem; color: #64748b; font-weight: 600;">${Utils.escapeHTML(sub)}</span>
                                        </div>
                                        <div style="position: relative; height: 200px; border-radius: 8px; overflow: hidden; background: #0f172a; display: flex; align-items: center; justify-content: center; border: 1px solid #cbd5e1; cursor: pointer;"
                                             onclick="Violations.openPhotoLightbox('${Utils.escapeHTML(disp.displaySrc)}', '${Utils.escapeHTML(title)}')">
                                            <img src="${Utils.escapeHTML(disp.displaySrc)}"${proxyAttr} alt="${Utils.escapeHTML(title)}" class="violation-detail-photo"
                                                 style="max-height: 100%; max-width: 100%; object-fit: contain;"
                                                 onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';">
                                            <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.65); color: #fff; padding: 3px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; display: flex; align-items: center; gap: 5px;">
                                                <i class="fas fa-search-plus"></i> تكبير
                                            </div>
                                        </div>
                                    </div>
                                `;
                            };

                            const hasBoth = Boolean(photoUrl1 && photoUrl2);
                            return `
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                                <h3 style="font-weight: 700; color: #334155; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; font-size: 0.95rem;">
                                    <span style="display: flex; align-items: center; gap: 8px;">
                                        <i class="fas fa-camera-retro text-indigo-600"></i> توثيق المخالفة بالصور الميدانية
                                    </span>
                                    <span style="font-size: 0.75rem; font-weight: 600; color: #64748b;">
                                        ${hasBoth ? 'صورتان موثقتان (قبل / بعد)' : 'صورة واحدة موثقة'}
                                    </span>
                                </h3>
                                <div class="grid grid-cols-1 ${hasBoth ? 'md:grid-cols-2' : ''} gap-4">
                                    ${renderCard(photoUrl1, 1, 'مشهد المخالفة الميدانية', 'قبل المعالجة')}
                                    ${renderCard(photoUrl2, 2, 'التوثيق الإضافي / التصحيحي', 'بعد الإجراء')}
                                </div>
                            </div>
                            `;
                        })()}

                        <div class="violation-view-quick-edit" style="border: 2px dashed #cbd5e1; border-radius: 12px; padding: 16px; margin-top: 8px; background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);">
                            <h4 style="font-weight: 700; color: #334155; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px; font-size: 1rem;">
                                <i class="fas fa-pen-to-square text-indigo-600"></i>
                                تعديل من هذه الشاشة
                            </h4>
                            <p style="font-size: 0.8rem; color: #64748b; margin: 0 0 12px 0;">يمكنك تحديث الشدة والحالة والنصوص أدناه ثم الحفظ دون فتح النموذج الكامل.</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label for="violation-view-q-severity" class="block text-sm font-semibold text-gray-700 mb-1">الشدة</label>
                                    <select id="violation-view-q-severity" class="form-input" style="width:100%;">
                                        <option value="عالية" ${qSev === 'عالية' ? 'selected' : ''}>عالية</option>
                                        <option value="متوسطة" ${qSev === 'متوسطة' ? 'selected' : ''}>متوسطة</option>
                                        <option value="منخضة" ${qSev === 'منخضة' || qSev === 'منخفضة' ? 'selected' : ''}>منخضة</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="violation-view-q-status" class="block text-sm font-semibold text-gray-700 mb-1">الحالة</label>
                                    <select id="violation-view-q-status" class="form-input" style="width:100%;">
                                        <option value="قيد المراجعة" ${qStat === 'قيد المراجعة' ? 'selected' : ''}>قيد المراجعة</option>
                                        <option value="محلول" ${qStat === 'محلول' ? 'selected' : ''}>محلول</option>
                                        <option value="غير محلول" ${qStat === 'غير محلول' ? 'selected' : ''}>غير محلول</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="violation-view-q-details" class="block text-sm font-semibold text-gray-700 mb-1">تفاصيل المخالفة</label>
                                <textarea id="violation-view-q-details" class="form-input" rows="3" style="width:100%; resize: vertical;">${Utils.escapeHTML(violation.violationDetails || '')}</textarea>
                            </div>
                            <div class="mb-3">
                                <label for="violation-view-q-action" class="block text-sm font-semibold text-gray-700 mb-1">الإجراء المتخذ</label>
                                <textarea id="violation-view-q-action" class="form-input" rows="3" style="width:100%; resize: vertical;">${Utils.escapeHTML(violation.actionTaken || '')}</textarea>
                            </div>
                            <button type="button" id="violation-view-quick-save" class="btn-primary" style="width: 100%; justify-content: center; display: inline-flex; align-items: center; gap: 8px;">
                                <i class="fas fa-save"></i>
                                حفظ التعديلات السريعة
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer violation-view-actions-footer" style="background: #f8fafc; padding: 16px 24px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end;">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 10px 18px; border-radius: 10px;">إغلاق</button>
                    ${typeof EmailDispatch !== 'undefined' ? EmailDispatch.renderFooterButtonHtml('violations') : ''}
                    <button type="button" class="btn-primary" onclick='Violations.printViolationProfessional(${this._escapeIdForHandler(violation.id)})' style="background: linear-gradient(135deg, #0f766e, #0d9488); padding: 10px 18px; border-radius: 10px;">
                        <i class="fas fa-print ml-2"></i>طباعة منسّقة
                    </button>
                    <button type="button" class="btn-primary" onclick='Violations.downloadViolationReport(${this._escapeIdForHandler(violation.id)}, this)' style="background: linear-gradient(135deg, #10b981, #059669); padding: 10px 18px; border-radius: 10px;">
                        <i class="fas fa-file-download ml-2"></i>تحميل PDF مباشر
                    </button>
                    <button type="button" class="btn-primary" onclick='Violations.showViolationForm(${this._escapeIdForHandler(violation.id)}); this.closest(".modal-overlay").remove();' style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 10px 18px; border-radius: 10px;">
                        <i class="fas fa-sliders-h ml-2"></i>تعديل كامل (جميع الحقول)
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        if (typeof EmailDispatch !== 'undefined') {
            EmailDispatch.bindFooterButtons(modal, { moduleKey: 'violations', record: violation, recordId: violation.id });
        }
        modal.querySelector('#violation-view-quick-save')?.addEventListener('click', async () => {
            await this.saveViolationQuickEditsFromView(violation.id, modal);
        });
        if (typeof Utils.hydrateDriveProxyImages === 'function') {
            Utils.hydrateDriveProxyImages(modal, {
                onFetchFail: (img) => {
                    try {
                        img.onerror = null;
                        img.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';
                    } catch (e) { /* ignore */ }
                }
            });
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async saveViolationQuickEditsFromView(id, viewModal) {
        const severity = viewModal.querySelector('#violation-view-q-severity')?.value?.trim() || '';
        const status = viewModal.querySelector('#violation-view-q-status')?.value?.trim() || '';
        const violationDetails = viewModal.querySelector('#violation-view-q-details')?.value?.trim() || '';
        const actionTaken = viewModal.querySelector('#violation-view-q-action')?.value?.trim() || '';
        const saveBtn = viewModal.querySelector('#violation-view-quick-save');
        if (!AppState.appData?.violations) {
            Notification.error('لا توجد بيانات مخالفات.');
            return;
        }
        const idx = AppState.appData.violations.findIndex(v => v.id === id);
        if (idx === -1) {
            Notification.error('تعذّر العثور على المخالفة.');
            return;
        }
        const prevHtml = saveBtn?.innerHTML;
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الحفظ...';
        }
        try {
            AppState.appData.violations[idx] = {
                ...AppState.appData.violations[idx],
                severity,
                status,
                violationDetails,
                actionTaken,
                updatedAt: new Date().toISOString()
            };
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }
            let remoteOk = true;
            try {
                if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.autoSave) {
                    const saveRes = await GoogleIntegration.autoSave('Violations', AppState.appData.violations);
                    if (saveRes && saveRes.success === false) remoteOk = false;
                }
            } catch (err) {
                remoteOk = false;
                if (AppState.debugMode) Utils.safeWarn('خطأ في حفظ قاعدة SQL:', err);
            }
            if (!remoteOk) {
                Notification.warning('تم الحفظ محلياً لكن فشل الحفظ في قاعدة SQL');
            } else {
                try { localStorage.setItem('violations_last_sync', String(Date.now())); } catch (eLs) { /* ignore */ }
            }
            Notification.success('تم حفظ التعديلات السريعة بنجاح');
            viewModal.remove();
            await this.viewViolation(id);
            try {
                const activeTab = document.querySelector('#violations-section .tabs-container .tab-btn.active')?.dataset?.tab || 'all';
                const listEl = document.getElementById('violations-list');
                if (listEl) {
                    if (activeTab === 'all') listEl.innerHTML = this.renderViolationsList();
                    else if (activeTab === 'employees') listEl.innerHTML = this.renderEmployeeViolationsList();
                    else if (activeTab === 'contractors') listEl.innerHTML = this.renderContractorViolationsList();
                }
                if (activeTab === 'all') {
                    const statsEl = document.getElementById('violations-stats-cards');
                    if (statsEl) statsEl.outerHTML = this.renderAllViolationsStats();
                }
            } catch (re) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('تحديث قائمة المخالفات بعد الحفظ السريع:', re);
            }
        } catch (error) {
            Utils.safeError('خطأ في الحفظ السريع للمخالفة:', error);
            Notification.error('فشل الحفظ: ' + (error.message || String(error)));
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerHTML = prevHtml || '<i class="fas fa-save ml-2"></i> حفظ التعديلات السريعة';
            }
        }
    },

    _buildViolationReportTableHtml(violation) {
        const v = this.normalizeViolationRecord(violation) || violation;
        const esc = (value, fallback = '—') => Utils.escapeHTML(String(value == null || value === '' ? fallback : value));
        const isContractor = v.personType === 'contractor' || !!v.contractorName;

        const title = isContractor ? 'تقرير رصد وتوثيق مخالفة مقاول' : 'تقرير رصد وتوثيق مخالفة موظف';
        const fineVal = Number(this.getEffectiveFineAmount(v)) || 0;
        const personHistory = typeof this.getPersonViolationHistory === 'function' ? this.getPersonViolationHistory(v, v.id) : null;
        const strikeBadgeText = personHistory?.strikeBadgeText || `المخالفة ${v.violationSequenceInMonth || 1}`;

        const formattedDate = v.violationDate ? Utils.formatDate(v.violationDate) : '—';
        const resolvedTimeStr = typeof this.getResolvedViolationTime === 'function' ? this.getResolvedViolationTime(v) : (v.violationTime || '');
        const formattedTime = resolvedTimeStr ? this.formatViolationTime(resolvedTimeStr) : '';

        let resolvedPhoto = '';
        if (v.photo && typeof v.photo === 'string' && v.photo.startsWith('data:image/')) {
            resolvedPhoto = v.photo;
        } else if (v.photo) {
            const pUrl = this.processPhoto(v.photo);
            resolvedPhoto = pUrl ? this.convertGoogleDriveLinkToPrintable(pUrl) : '';
        }

        return `
            ${this.getIsoPrintHeaderHtml(title, subtitle, 'DOC-HSE-VIO-REC-01', 'Rev. 03', 'سري وداخلي')}

            <div class="summary-cards-row">
                <div class="kpi-stat-card accent-red">
                    <div class="kpi-card-label">رقم المخالفة / الكود</div>
                    <div class="kpi-card-value" style="color: #991b1b; font-size: 14px;">${esc(v.isoCode || v.id || '—')}</div>
                </div>
                <div class="kpi-stat-card accent-amber">
                    <div class="kpi-card-label">تاريخ وتوقيت المخالفة</div>
                    <div class="kpi-card-value" style="color: #92400e; font-size: 13px; display: flex; align-items: center; justify-content: center; flex-wrap: nowrap; gap: 4px; white-space: nowrap;">
                        <bdi dir="ltr" style="font-weight: 700; color: #92400e;">${formattedDate}</bdi>
                        ${formattedTime ? `
                            <span style="color: #d97706; margin: 0 4px; opacity: 0.7; font-weight: bold;">|</span>
                            <span style="display: inline-flex; align-items: center; color: #b45309; font-weight: 700; font-size: 12px;">
                                <i class="far fa-clock ml-1" style="font-size: 11px;"></i>
                                <bdi dir="rtl">${formattedTime}</bdi>
                            </span>
                        ` : (v.shift ? `
                            <span style="color: #d97706; margin: 0 4px; opacity: 0.7; font-weight: bold;">|</span>
                            <span style="display: inline-flex; align-items: center; color: #b45309; font-weight: 700; font-size: 11.5px;">
                                <i class="fas fa-sun ml-1" style="font-size: 11px;"></i>
                                <bdi>${esc(v.shift)}</bdi>
                            </span>
                        ` : `
                            <span style="color: #d97706; margin: 0 4px; opacity: 0.7; font-weight: bold;">|</span>
                            <span style="display: inline-flex; align-items: center; color: #92400e; font-weight: 600; font-size: 11px;">
                                <i class="far fa-clock ml-1" style="font-size: 11px;"></i>
                                <bdi>جولة تفتيش</bdi>
                            </span>
                        `)}
                    </div>
                </div>
                <div class="kpi-stat-card ${v.severity === 'عالية' ? 'accent-red' : v.severity === 'متوسطة' ? 'accent-amber' : 'accent-blue'}">
                    <div class="kpi-card-label">درجة الشدة</div>
                    <div class="kpi-card-value" style="font-size: 15px; color: ${v.severity === 'عالية' ? '#b91c1c' : v.severity === 'متوسطة' ? '#d97706' : '#2563eb'};">
                        ${esc(v.severity || '—')}
                    </div>
                </div>
                <div class="kpi-stat-card ${v.status === 'محلول' ? 'accent-green' : 'accent-red'}">
                    <div class="kpi-card-label">حالة المخالفة</div>
                    <div class="kpi-card-value" style="font-size: 15px; color: ${v.status === 'محلول' ? '#047857' : '#b91c1c'};">
                        ${esc(v.status || '—')}
                    </div>
                </div>
                <div class="kpi-stat-card accent-green">
                    <div class="kpi-card-label">القيمة المالية للغرامة</div>
                    <div class="kpi-card-value" style="color: #166534; font-size: 15px;">${this.formatFineAmount(fineVal)}</div>
                </div>
                <div class="kpi-stat-card ${(personHistory?.strikeLevel >= 3) ? 'accent-red' : (personHistory?.strikeLevel === 2) ? 'accent-amber' : 'accent-blue'}">
                    <div class="kpi-card-label">تكرار المخالفة للشخص</div>
                    <div class="kpi-card-value" style="color: ${(personHistory?.strikeLevel >= 3) ? '#991b1b' : (personHistory?.strikeLevel === 2) ? '#92400e' : '#1e3a8a'}; font-size: 13px; font-weight: 800; white-space: nowrap;">${esc(strikeBadgeText)}</div>
                </div>
            </div>

            <!-- بيانات المخالف -->
            <div class="info-section-block">
                <div class="info-section-header">
                    <i class="fas ${isContractor ? 'fa-hard-hat' : 'fa-user-tie'}"></i>
                    ${isContractor ? 'بيانات المقاول والعامل المخالف' : 'بيانات الموظف المخالف'}
                </div>
                <div class="info-grid-2">
                    ${isContractor ? `
                        <div class="info-cell">
                            <span class="info-cell-label">اسم شركة المقاولات</span>
                            <span class="info-cell-value">${esc(v.contractorName)}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">كود / معرف المقاول</span>
                            <span class="info-cell-value" dir="ltr" style="text-align: right;"><bdi>${esc(this.getCleanContractorCode(v))}</bdi></span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">اسم العامل المخالف</span>
                            <span class="info-cell-value" style="color: #991b1b; font-weight: 900;">${esc(v.contractorWorker || v.employeeName || v.contractorName)}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">الوظيفة / المهنة</span>
                            <span class="info-cell-value">${esc(v.contractorPosition || 'عامل مقاول')}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">الإدارة التابع له المقاول</span>
                            <span class="info-cell-value">${esc(v.contractorDepartment || '—')}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">نوع السجل</span>
                            <span class="info-cell-value">مخالفة مقاول معتمد</span>
                        </div>
                    ` : `
                        <div class="info-cell">
                            <span class="info-cell-label">اسم الموظف</span>
                            <span class="info-cell-value" style="color: #991b1b; font-weight: 900;">${esc(v.employeeName)}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">الرقم / الكود الوظيفي</span>
                            <span class="info-cell-value" dir="ltr" style="text-align: right;"><bdi>${esc(v.employeeCode || v.employeeNumber || '—')}</bdi></span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">المسمى الوظيفي</span>
                            <span class="info-cell-value">${esc(v.employeePosition || '—')}</span>
                        </div>
                        <div class="info-cell">
                            <span class="info-cell-label">الإدارة / القسم التابع له</span>
                            <span class="info-cell-value">${esc(v.employeeDepartment || '—')}</span>
                        </div>
                    `}
                </div>
            </div>

            <!-- تفاصيل واقعة المخالفة -->
            <div class="info-section-block">
                <div class="info-section-header">
                    <i class="fas fa-exclamation-circle"></i>
                    بيانات واقعة المخالفة والإجراء المتخذ
                </div>
                <div class="info-grid-2">
                    <div class="info-cell">
                        <span class="info-cell-label">المصنع / المنشأة</span>
                        <span class="info-cell-value" dir="auto" style="font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif;"><bdi>${esc(this.formatLocationPlace(v.violationLocation) || 'مصنع ICAPP')}</bdi></span>
                    </div>
                    <div class="info-cell">
                        <span class="info-cell-label">المكان المحدد داخل الموقع</span>
                        <span class="info-cell-value" dir="auto" style="font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif;"><bdi>${esc(this.formatLocationPlace(v.violationPlace))}</bdi></span>
                    </div>
                    <div class="info-cell">
                        <span class="info-cell-label">تصنيف المخالفة</span>
                        <span class="info-cell-value" style="color: #991b1b; font-weight: 800;">${esc(v.violationType || '—')}</span>
                    </div>
                    <div class="info-cell">
                        <span class="info-cell-label">كود نوع المخالفة</span>
                        <span class="info-cell-value" dir="ltr" style="font-family: monospace, inherit; font-weight: 900; color: #1e3a8a;"><bdi>${esc(this.getCleanViolationTypeCode(v))}</bdi></span>
                    </div>
                    <div class="info-cell">
                        <span class="info-cell-label">السبب الجذري (RCA)</span>
                        <span class="info-cell-value" style="color: #0f766e; font-weight: 800;"><bdi>${esc(v.rootCause || 'سلوك غير آمن (Unsafe Act)')}</bdi></span>
                    </div>
                    ${v.violationDetails ? `
                        <div class="info-cell info-cell-wide">
                            <span class="info-cell-label">الوصف التفصيلي لواقعة المخالفة</span>
                            <span class="info-cell-value" style="white-space: pre-wrap; line-height: 1.5;">${esc(v.violationDetails)}</span>
                        </div>
                    ` : ''}
                    ${v.actionTaken ? `
                        <div class="info-cell info-cell-wide">
                            <span class="info-cell-label">الإجراء الفوري المتخذ / الجزاء الموقع</span>
                            <span class="info-cell-value" style="white-space: pre-wrap; line-height: 1.5; color: #047857; font-weight: 800;">${esc(v.actionTaken)}</span>
                        </div>
                    ` : ''}
                </div>
            </div>

            <!-- التوثيق الفوتوغرافي -->
            ${resolvedPhoto ? `
                <div class="info-section-block">
                    <div class="info-section-header">
                        <i class="fas fa-camera"></i>
                        التوثيق المصور للمخالفة الميدانية
                    </div>
                    <div style="padding: 10px; text-align: center; background: #f8fafc;">
                        <img src="${esc(resolvedPhoto, '')}" alt="صورة المخالفة" style="max-height: 180px; max-width: 95%; object-fit: contain; border: 1.5px solid #cbd5e1; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);" onerror="this.closest('.info-section-block').style.display='none';">
                    </div>
                </div>
            ` : ''}

            <!-- صندوق التوقيعات الثلاثي المعتمد -->
            <div class="signatures-grid">
                <div class="sig-card">
                    <div class="sig-card-title">مرتكب المخالفة / ممثل المقاول</div>
                    <div class="sig-card-name">إقرار بالعلم وتعهد بعدم التكرار</div>
                    <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                </div>
                <div class="sig-card">
                    <div class="sig-card-title">مشرف / ضابط السلامة الميداني</div>
                    <div class="sig-card-name">المحرر والراصد الميداني</div>
                    <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                </div>
                <div class="sig-card">
                    <div class="sig-card-title">الاعتماد الرسمي للجزاء</div>
                    <div class="sig-card-name">مدير إدارة السلامة والصحة المهنية والبيئة</div>
                    <div class="sig-line-area">الاعتماد والختم: ............................</div>
                </div>
            </div>

            ${this.getIsoPrintFooterHtml('DOC-HSE-VIO-REC-01', 'Rev. 03', 'ISO 45001:2018 (Clause 10.2)')}
        `;
    },

    _generateViolationPrintDocumentHtml(violation, documentTitle) {
        const v = this.normalizeViolationRecord(violation) || violation;
        const inner = this._buildViolationReportTableHtml(v);
        return `<div class="report-page portrait">${inner}</div>`;
    },

    async _completeViolationReportPrint(htmlContent, fileName = 'تقرير_المخالفة.pdf') {
        return this.openIsoPrintWindow('تقرير المخالفة', htmlContent, false, '', fileName);
    },

    async printViolationProfessional(id) {
        const violation = AppState.appData?.violations?.find(v => v.id === id);
        if (!violation) {
            Notification.error('المخالفة غير موجودة');
            return;
        }
        try {
            Loading.show('جاري إعداد وثيقة المخالفة...');
            const normalized = this.normalizeViolationRecord(violation) || violation;
            const isContractor = normalized.personType === 'contractor' || !!normalized.contractorName;
            const documentTitle = isContractor ? 'تقرير مخالفة مقاول' : 'تقرير مخالفة موظف';
            const reportPhoto = await this._resolveViolationReportPhoto_(normalized.photo);
            const reportViolation = { ...normalized, photo: reportPhoto };
            const htmlContent = this._generateViolationPrintDocumentHtml(reportViolation, documentTitle);
            const subject = isContractor
                ? (normalized.contractorName || normalized.contractorWorker)
                : normalized.employeeName;
            const reportCode = normalized.isoCode || normalized.id || 'سجل';
            const fileName = `تقرير_مخالفة_${this._safeViolationReportFilePart(subject)}_${this._safeViolationReportFilePart(reportCode)}.pdf`;
            this.openIsoPrintWindow(documentTitle, htmlContent, false, '', fileName);
        } catch (error) {
            Utils.safeError('خطأ في إعداد طباعة المخالفة:', error);
            Notification.error('فشل في إعداد الطباعة: ' + (error.message || ''));
        } finally {
            Loading.hide();
        }
    },

    _safeViolationReportFilePart(value, fallback = 'سجل') {
        const cleaned = String(value || fallback)
            .trim()
            .replace(/[\u0000-\u001f<>:"/\\|?*]+/g, '_')
            .replace(/\s+/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_+|_+$/g, '');
        return cleaned || fallback;
    },

    _readViolationReportImageBlob_(blob) {
        return new Promise((resolve) => {
            if (!blob || !String(blob.type || '').toLowerCase().startsWith('image/')) {
                resolve('');
                return;
            }
            try {
                const reader = new FileReader();
                reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
                reader.onerror = () => resolve('');
                reader.readAsDataURL(blob);
            } catch (_error) {
                resolve('');
            }
        });
    },

    async _resolveViolationReportPhoto_(photo) {
        if (!photo) return '';
        const raw = typeof photo === 'object' ? (this.getPhotoSource(photo) || photo.photo || photo.url || photo.image || '') : photo;
        if (!raw) return '';
        if (typeof raw === 'string' && raw.startsWith('data:image/')) return raw;

        const source = this.processPhoto(raw) || String(raw).trim();
        if (/^data:image\//i.test(source)) return source;

        // استخراج معرّف Google Drive لتحويله فوراً إلى Base64 Data URI لضمان ظهوره في PDF والطباعة
        const fileId = (typeof Utils !== 'undefined' && typeof Utils.extractDriveFileId === 'function')
            ? Utils.extractDriveFileId(source)
            : (source.match(/\/d\/([a-zA-Z0-9_-]+)/) || source.match(/id=([a-zA-Z0-9_-]+)/))?.[1];

        if (fileId && typeof Utils !== 'undefined' && typeof Utils.fetchDriveImageDataUri === 'function') {
            try {
                const dataUri = await Utils.fetchDriveImageDataUri(fileId, { force: true, requireDataUri: true });
                if (dataUri && /^data:image\//i.test(dataUri)) {
                    return dataUri;
                }
            } catch (_err) { /* fallback to fetch below */ }
        }

        // محاولة جلب الصورة مباشرة وتحويلها إلى Base64 Data URI
        const fetchSource = source.startsWith('//') ? ('https:' + source) : source;
        if (/^(https?:|blob:)/i.test(fetchSource) && typeof fetch === 'function') {
            try {
                const response = await fetch(fetchSource, { method: 'GET', credentials: 'omit', mode: 'cors' });
                if (response.ok) {
                    const dataUri = await this._readViolationReportImageBlob_(await response.blob());
                    if (dataUri) return dataUri;
                }
            } catch (_error) { /* fallback below */ }
        }

        return this.convertGoogleDriveLinkToPrintable(source);
    },

    async downloadViolationReport(id, triggerButton = null) {
        const violation = AppState.appData?.violations?.find(v => v.id === id);
        if (!violation) {
            Notification.error('المخالفة غير موجودة');
            return false;
        }

        const normalized = this.normalizeViolationRecord(violation) || violation;
        const isContractor = normalized.personType === 'contractor' || !!normalized.contractorName;
        const originalButtonHtml = triggerButton?.innerHTML || '';
        try {
            if (triggerButton) {
                triggerButton.disabled = true;
                triggerButton.setAttribute('aria-busy', 'true');
                triggerButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            }
            Loading.show('جاري إنشاء وتحميل تقرير المخالفة (PDF)...');
            const documentTitle = isContractor ? 'تقرير مخالفة مقاول' : 'تقرير مخالفة موظف';
            const reportPhoto = await this._resolveViolationReportPhoto_(normalized.photo);
            const reportViolation = { ...normalized, photo: reportPhoto };
            const htmlContent = this._generateViolationPrintDocumentHtml(reportViolation, documentTitle);
            const subject = isContractor
                ? (normalized.contractorName || normalized.contractorWorker)
                : normalized.employeeName;
            const reportCode = normalized.isoCode || normalized.id || 'سجل';
            const reportDate = normalized.violationDate
                ? String(normalized.violationDate).slice(0, 10)
                : new Date().toISOString().slice(0, 10);
            const fileName = [
                'تقرير_مخالفة',
                this._safeViolationReportFilePart(subject, isContractor ? 'مقاول' : 'موظف'),
                this._safeViolationReportFilePart(reportCode),
                this._safeViolationReportFilePart(reportDate)
            ].join('_') + '.pdf';
            const downloaded = await this.downloadIsoReportAsPdf(documentTitle, htmlContent, fileName, false);
            return downloaded;
        } catch (error) {
            Utils.safeError('خطأ في تحميل تقرير المخالفة PDF:', error);
            Notification.error('فشل تحميل تقرير المخالفة: ' + (error.message || ''));
            return false;
        } finally {
            Loading.hide();
            if (triggerButton) {
                triggerButton.disabled = false;
                triggerButton.removeAttribute('aria-busy');
                triggerButton.innerHTML = originalButtonHtml || '<i class="fas fa-file-download"></i>';
            }
        }
    },

    async exportPDF(id, triggerButton = null) {
        return this.downloadViolationReport(id, triggerButton);
    },

    // ===== Blacklist Register Functions =====
    /**
     * تحميل بيانات Blacklist من قاعدة SQL
     */
    async loadBlacklistDataAsync() {
        try {
            // التأكد من وجود AppState و GoogleIntegration
            if (typeof AppState === 'undefined' || !AppState.appData) {
                AppState.appData = {};
            }
            if (!AppState.appData.blacklistRegister) {
                AppState.appData.blacklistRegister = [];
            }

            // التحقق من تفعيل Google Integration
            const isGoogleEnabled = AppState.googleConfig?.appsScript?.enabled && AppState.googleConfig?.appsScript?.scriptUrl;
            const isGoogleIntegrationAvailable = typeof GoogleIntegration !== 'undefined' && typeof GoogleIntegration.sendRequest === 'function';

            if (!isGoogleEnabled || !isGoogleIntegrationAvailable) {
                // إذا لم يكن Google Integration متاحاً، استخدام البيانات المحلية
                if (AppState.debugMode) {
                    Utils.safeLog('⚠️ Google Integration غير متاح - استخدام البيانات المحلية فقط');
                }
                return;
            }

            // تحميل البيانات من قاعدة SQL (بدون عرض مؤشر تحميل - الواجهة تُعرض أولاً)
            const result = await GoogleIntegration.sendRequest({
                action: 'readFromSheet',
                data: {
                    sheetName: 'Blacklist_Register',
                    spreadsheetId: AppState.googleConfig?.sheets?.spreadsheetId
                }
            }).catch(error => {
                Utils.safeWarn('⚠️ تعذر تحميل بيانات Blacklist من قاعدة SQL:', error);
                return { success: false, data: [] };
            });

            let dataUpdated = false;
            if (result && result.success && Array.isArray(result.data)) {
                AppState.appData.blacklistRegister = result.data;
                dataUpdated = true;
                if (AppState.debugMode) {
                    Utils.safeLog(`✅ تم تحميل ${result.data.length} سجل Blacklist من قاعدة SQL`);
                }
            } else {
                // التأكد من وجود مصفوفة فارغة إذا لم يتم تحميل البيانات
                if (!AppState.appData.blacklistRegister) {
                    AppState.appData.blacklistRegister = [];
                }
            }

            // حفظ البيانات محلياً بعد التحميل
            if (dataUpdated && typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                try {
                    window.DataManager.save();
                } catch (saveError) {
                    if (AppState.debugMode) {
                        Utils.safeWarn('⚠️ خطأ في حفظ البيانات محلياً:', saveError);
                    }
                }
            }
        } catch (error) {
            Utils.safeError('❌ خطأ في تحميل بيانات Blacklist:', error);
            // التأكد من وجود مصفوفة فارغة في حالة الخطأ
            if (!AppState.appData.blacklistRegister) {
                AppState.appData.blacklistRegister = [];
            }
        }
    },

    /**
     * تحديث عرض Blacklist بعد تحميل البيانات
     */
    refreshBlacklistDisplay() {
        const contentContainer = document.getElementById('violations-tab-content');
        if (!contentContainer) return;

        // التحقق من أن التبويب النشط هو blacklist
        const activeTab = document.querySelector('.tab-btn.active[data-tab="blacklist"]');
        if (!activeTab) return;

        try {
            // تحديث الإحصائيات - البحث عن container الإحصائيات
            const cardBody = contentContainer.querySelector('.card-body');
            if (cardBody) {
                // البحث عن grid container للإحصائيات (قد يكون بأي من الصيغ)
                const statsContainer = cardBody.querySelector('.grid.grid-cols-1') || 
                                      cardBody.querySelector('.grid') ||
                                      cardBody.querySelector('[class*="grid-cols"]');
                if (statsContainer && statsContainer.parentElement) {
                    statsContainer.outerHTML = this.renderBlacklistStats();
                } else {
                    // إذا لم نجد container، نبحث عن أول div في card-body ونستبدله
                    const firstGrid = cardBody.querySelector('div > div.grid');
                    if (firstGrid) {
                        firstGrid.outerHTML = this.renderBlacklistStats();
                    }
                }
            }

            // تحديث الكروت
            const cardsContainer = document.getElementById('blacklist-cards-container');
            if (cardsContainer) {
                cardsContainer.innerHTML = this.renderBlacklistCards();
            }

            // تحديث الجدول
            const tableContainer = document.getElementById('blacklist-table-container');
            if (tableContainer) {
                tableContainer.innerHTML = this.renderBlacklistTable();
            }

            // إعادة إعداد Event Listeners
            this.setupBlacklistEventListeners();
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في تحديث عرض Blacklist:', error);
        }
    },

    renderBlacklistTab() {
        return `
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <h2 class="card-title">
                            <i class="fas fa-user-slash ml-2"></i>
                            سجل الممنوعين من الدخول – Blacklist
                        </h2>
                        <button id="blacklist-add-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            تسجيل ممنوع من الدخول جديد
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <!-- إحصائيات سريعة -->
                    ${this.renderBlacklistStats()}
                    
                    <!-- كروت عرض البيانات -->
                    <div id="blacklist-cards-container" class="mb-6">
                        ${this.renderBlacklistCards()}
                    </div>
                    
                    <!-- جدول عرض البيانات -->
                    <div id="blacklist-table-container">
                        ${this.renderBlacklistTable()}
                    </div>
                </div>
            </div>
        `;
    },

    renderBlacklistStats() {
        const blacklistRecords = AppState.appData?.blacklistRegister || [];
        const totalCount = blacklistRecords.length;
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();
        const thisMonthCount = blacklistRecords.filter(r => {
            if (!r.banDate) return false;
            const date = new Date(r.banDate);
            return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
        }).length;

        // حساب عدد المصانع/المواقع الفريدة
        const uniqueFactoryLocation = new Set();
        blacklistRecords.forEach(r => {
            if (r.factory && r.location) {
                uniqueFactoryLocation.add(`${r.factory} - ${r.location}`);
            } else if (r.factory) {
                uniqueFactoryLocation.add(r.factory);
            } else if (r.location) {
                uniqueFactoryLocation.add(r.location);
            }
        });
        const factoryLocationCount = uniqueFactoryLocation.size;

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div class="stat-card blacklist-stat-card blacklist-stat-total" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border: none; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3), 0 2px 4px -1px rgba(220, 38, 38, 0.2); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(220, 38, 38, 0.4), 0 4px 6px -2px rgba(220, 38, 38, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(220, 38, 38, 0.3), 0 2px 4px -1px rgba(220, 38, 38, 0.2)';">
                    <div class="stat-icon" style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <i class="fas fa-user-slash"></i>
                    </div>
                    <div class="stat-content" style="flex: 1;">
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${typeof totalCount === 'number' ? totalCount.toLocaleString('en-US') : totalCount}</h3>
                        <p class="stat-label" style="font-size: 1rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; letter-spacing: 0.3px;">إجمالي الممنوعين</p>
                    </div>
                </div>
                <div class="stat-card blacklist-stat-card blacklist-stat-month" style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); border: none; box-shadow: 0 4px 6px -1px rgba(234, 88, 12, 0.3), 0 2px 4px -1px rgba(234, 88, 12, 0.2); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(234, 88, 12, 0.4), 0 4px 6px -2px rgba(234, 88, 12, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(234, 88, 12, 0.3), 0 2px 4px -1px rgba(234, 88, 12, 0.2)';">
                    <div class="stat-icon" style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="stat-content" style="flex: 1;">
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${typeof thisMonthCount === 'number' ? thisMonthCount.toLocaleString('en-US') : thisMonthCount}</h3>
                        <p class="stat-label" style="font-size: 1rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; letter-spacing: 0.3px;">هذا الشهر</p>
                    </div>
                </div>
                <div class="stat-card blacklist-stat-card blacklist-stat-details" style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%); border: none; box-shadow: 0 4px 6px -1px rgba(217, 119, 6, 0.3), 0 2px 4px -1px rgba(217, 119, 6, 0.2); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(217, 119, 6, 0.4), 0 4px 6px -2px rgba(217, 119, 6, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(217, 119, 6, 0.3), 0 2px 4px -1px rgba(217, 119, 6, 0.2)';">
                    <div class="stat-icon" style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="stat-content" style="flex: 1;">
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${blacklistRecords.filter(r => r.banReason && r.banReason.length > 50).length.toLocaleString('en-US')}</h3>
                        <p class="stat-label" style="font-size: 1rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; letter-spacing: 0.3px;">ممنوعين مع تفاصيل</p>
                    </div>
                </div>
                <div class="stat-card blacklist-stat-card blacklist-stat-factory-location" style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border: none; box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.3), 0 2px 4px -1px rgba(124, 58, 237, 0.2); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(124, 58, 237, 0.4), 0 4px 6px -2px rgba(124, 58, 237, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(124, 58, 237, 0.3), 0 2px 4px -1px rgba(124, 58, 237, 0.2)';">
                    <div class="stat-icon" style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <i class="fas fa-industry"></i>
                    </div>
                    <div class="stat-content" style="flex: 1;">
                        <h3 class="stat-value" style="font-size: 2.5rem; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.2; letter-spacing: -0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${typeof factoryLocationCount === 'number' ? factoryLocationCount.toLocaleString('en-US') : factoryLocationCount}</h3>
                        <p class="stat-label" style="font-size: 1rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; letter-spacing: 0.3px;">المصنع - الموقع</p>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * معالجة وعرض الصور بشكل صحيح (Base64 أو URL)
     * @param {string} photoData - بيانات الصورة (Base64 أو URL)
     * @returns {string|null} - رابط صالح للاستخدام في img src
     */
    getPhotoSource(photoData) {
        if (typeof Utils !== 'undefined' && typeof Utils.extractImageSourceCandidate === 'function') {
            return Utils.extractImageSourceCandidate(photoData);
        }
        if (!photoData) {
            return '';
        }
        return typeof photoData === 'string' ? photoData : '';
    },

    normalizeGoogleDrivePhotoUrl(url) {
        if (typeof Utils !== 'undefined' && typeof Utils.normalizeGoogleDriveImageUrl === 'function') {
            return Utils.normalizeGoogleDriveImageUrl(url);
        }
        return String(url || '').trim();
    },

    processPhoto(photoData) {
        if (typeof Utils !== 'undefined' && typeof Utils.normalizeImageSource === 'function') {
            const normalized = Utils.normalizeImageSource(photoData);
            if (normalized) {
                return normalized;
            }
        }

        const rawPhoto = this.getPhotoSource(photoData);
        if (!rawPhoto) {
            return null;
        }

        let trimmed = String(rawPhoto).trim().replace(/^['"`]+|['"`]+$/g, '');
        if (!trimmed) {
            return null;
        }

        if (trimmed.startsWith('blob:')) {
            return trimmed;
        }

        if (/^data:image\//i.test(trimmed)) {
            const commaIndex = trimmed.indexOf(',');
            if (commaIndex === -1) {
                return trimmed.replace(/\s+/g, '');
            }

            const header = trimmed.slice(0, commaIndex).replace(/\s+/g, '');
            const payload = trimmed.slice(commaIndex + 1).replace(/\s+/g, '');
            return payload ? `${header},${payload}` : null;
        }

        if (/^https?:\/\//i.test(trimmed)) {
            return this.normalizeGoogleDrivePhotoUrl(trimmed);
        }

        const compactBase64 = trimmed.replace(/\s+/g, '');
        if (compactBase64.length > 100 && /^[A-Za-z0-9+/=]+$/.test(compactBase64.substring(0, Math.min(120, compactBase64.length)))) {
            return 'data:image/jpeg;base64,' + compactBase64;
        }

        if (AppState.debugMode) {
            console.warn('⚠️ صورة غير صالحة:', trimmed.substring(0, 100));
        }
        return null;
    },

    _onBlacklistCardPhotoError(img) {
        try {
            if (!img) return;
            img.onerror = null;
            const d = document.createElement('div');
            d.className = 'w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200 dark:border-red-800';
            d.innerHTML = '<i class="fas fa-user text-red-500 dark:text-red-400 text-2xl"></i>';
            img.replaceWith(d);
        } catch (e) { /* ignore */ }
    },

    _onBlacklistTablePhotoError(img) {
        try {
            if (!img) return;
            img.onerror = null;
            img.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2212%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';
        } catch (e) { /* ignore */ }
    },

    _hydrateBlacklistDrivePhotos() {
        try {
            if (typeof Utils.hydrateDriveProxyImages !== 'function') return;
            const fail = (img) => {
                if (!img) return;
                const cls = img.className || '';
                if (cls.indexOf('blacklist-table-photo') !== -1) {
                    this._onBlacklistTablePhotoError(img);
                } else if (cls.indexOf('blacklist-detail-photo') !== -1) {
                    this._onBlacklistTablePhotoError(img);
                } else if (cls.indexOf('blacklist-form-photo') !== -1) {
                    this._onBlacklistTablePhotoError(img);
                } else {
                    this._onBlacklistCardPhotoError(img);
                }
            };
            const cards = document.getElementById('blacklist-cards-container');
            const table = document.getElementById('blacklist-table');
            if (cards) Utils.hydrateDriveProxyImages(cards, { onFetchFail: fail });
            if (table) Utils.hydrateDriveProxyImages(table, { onFetchFail: fail });
        } catch (e) { /* ignore */ }
    },

    renderBlacklistCards() {
        const blacklistRecords = AppState.appData?.blacklistRegister || [];
        if (blacklistRecords.length === 0) {
            return `
                <div class="empty-state py-8">
                    <i class="fas fa-user-slash text-gray-400 text-5xl mb-4"></i>
                    <p class="text-gray-500 text-lg">لا توجد سجلات ممنوعين من الدخول</p>
                    <p class="text-gray-400 text-sm mt-2">انقر على "تسجيل ممنوع من الدخول جديد" لإضافة سجل جديد</p>
                </div>
            `;
        }

        const sortedRecords = [...blacklistRecords].sort((a, b) => {
            const dateA = new Date(a.banDate || a.createdAt || 0);
            const dateB = new Date(b.banDate || b.createdAt || 0);
            return dateB - dateA;
        });

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${sortedRecords.map(record => {
                    const photoUrl = this.processPhoto(record);
                    const disp = photoUrl && typeof Utils.resolveDriveAwareImgDisplay === 'function'
                        ? Utils.resolveDriveAwareImgDisplay(photoUrl)
                        : { canonical: photoUrl || '', displaySrc: photoUrl || '', needsProxy: false, proxyFileId: '' };
                    const imgSrc = disp.canonical ? disp.displaySrc : '';
                    const proxyAttr = typeof Utils.driveProxyImgAttrs === 'function' ? Utils.driveProxyImgAttrs(disp) : '';
                    return `
                    <div class="content-card blacklist-card" style="position: relative; overflow: hidden;">
                        <div class="absolute top-0 right-0 w-20 h-20 bg-red-100 dark:bg-red-900/20 opacity-10 rounded-bl-full"></div>
                        <div class="relative z-10">
                            <div class="p-4">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex items-center gap-3">
                                        ${photoUrl ? `
                                            <img src="${Utils.escapeHTML(imgSrc)}" alt="صورة"${proxyAttr}
                                                data-photo-url="${Utils.escapeHTML(photoUrl)}"
                                                class="blacklist-card-photo w-16 h-16 rounded-full object-cover border-2 border-red-200 dark:border-red-800 cursor-pointer shadow-sm"
                                                onclick="Violations.viewBlacklistPhoto(this.dataset.photoUrl)"
                                                title="انقر لعرض الصورة"
                                                onerror="Violations._onBlacklistCardPhotoError(this)">
                                        ` : `
                                            <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200 dark:border-red-800">
                                                <i class="fas fa-user text-red-500 dark:text-red-400 text-2xl"></i>
                                            </div>
                                        `}
                                        <div>
                                            <h3 class="font-bold text-gray-800 dark:text-gray-100 text-lg">${Utils.escapeHTML(record.fullName || 'غير محدد')}</h3>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">#${record.serialNumber || '-'}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <button onclick="Violations.editBlacklistRecord('${record.id}')" 
                                            class="btn-icon btn-icon-warning text-xs" title="تعديل">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="Violations.deleteBlacklistRecord('${record.id}')" 
                                            class="btn-icon btn-icon-danger text-xs" title="حذف">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="space-y-2 text-sm">
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-id-card text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">رقم البطاقة:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(record.idNumber || '-')}</span>
                                    </div>
                                    ${record.job ? `
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-briefcase text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">الوظيفة:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(record.job)}</span>
                                    </div>
                                    ` : ''}
                                    ${record.contractor ? `
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-building text-cyan-500 dark:text-cyan-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">الشركة - المقاول:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(record.contractor)}</span>
                                    </div>
                                    ` : ''}
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-industry text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">المصنع:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(record.factory || '-')}</span>
                                    </div>
                                    ${record.location ? `
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-map-marker-alt text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">الموقع:</span>
                                        <span class="font-semibold text-gray-800 dark:text-gray-200">${Utils.escapeHTML(record.location)}</span>
                                    </div>
                                    ` : ''}
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-calendar text-red-500 dark:text-red-400 w-4"></i>
                                        <span class="text-gray-600 dark:text-gray-400">تاريخ المنع:</span>
                                        <span class="font-semibold text-red-600 dark:text-red-400">${record.banDate ? Utils.formatDate(record.banDate) : '-'}</span>
                                    </div>
                                    ${record.banReason ? `
                                    <div class="pt-2 border-t border-red-100 dark:border-red-900/50">
                                        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">سبب المنع:</p>
                                        <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">${Utils.escapeHTML(record.banReason)}</p>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                            <div class="bg-red-50 dark:bg-red-900/20 px-4 py-2 border-t border-red-100 dark:border-red-900/30 flex items-center justify-between text-xs">
                                <span class="text-gray-600 dark:text-gray-400">
                                    <i class="fas fa-user-edit ml-1 text-red-500 dark:text-red-400"></i>
                                    ${Utils.escapeHTML(record.editor || 'غير محدد')}
                                </span>
                                ${record.bannedBy ? `
                                <span class="text-gray-600 dark:text-gray-400">
                                    <i class="fas fa-user-shield ml-1 text-red-500 dark:text-red-400"></i>
                                    ${Utils.escapeHTML(record.bannedBy)}
                                </span>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;}).join('')}
            </div>
        `;
    },

    async showBlacklistForm(blacklistData = null) {
        const isEdit = !!blacklistData;

        // التأكد من تحميل إعدادات النماذج
        if (typeof Permissions !== 'undefined' && typeof Permissions.ensureFormSettingsState === 'function') {
            try {
                await Permissions.ensureFormSettingsState();
            } catch (error) {
                Utils.safeWarn('⚠️ خطأ في تحميل إعدادات النماذج:', error);
            }
        }

        const blacklistRecords = AppState.appData?.blacklistRegister || [];
        const nextSerial = blacklistRecords.length > 0
            ? Math.max(...blacklistRecords.map(r => parseInt(r.serialNumber) || 0)) + 1
            : 1;

        // استخدام نفس نظام تحميل المواقع والأماكن المستخدم في violations
        const sites = this.getSiteOptions();
        const siteOptions = sites.map(site =>
            `<option value="${Utils.escapeHTML(site.name)}" data-site-id="${site.id}" ${blacklistData?.factory === site.name || blacklistData?.factoryId === site.id ? 'selected' : ''}>${Utils.escapeHTML(site.name)}</option>`
        ).join('');

        // تحميل الإدارات
        const settings = AppState.appData?.formSettings || {};
        const departments = settings.departments || [];
        // تحويل الإدارات إلى قائمة للـ datalist (اسم فقط)
        const departmentList = departments.map(dept => {
            // إذا كان dept كائن، نأخذ name، وإذا كان نصًا، نستخدمه مباشرة
            return typeof dept === 'object' ? dept.name : dept;
        }).filter(Boolean);
        const departmentOptions = departmentList.map(dept =>
            `<option value="${Utils.escapeHTML(dept)}"></option>`
        ).join('');

        // الحصول على الأماكن حسب المصنع المحدد
        const selectedSiteId = blacklistData?.factoryId || sites.find(s => s.name === blacklistData?.factory)?.id || '';
        const placeOptions = selectedSiteId ? this.getPlaceOptions(selectedSiteId).map(place =>
            `<option value="${Utils.escapeHTML(place.name)}" data-place-id="${place.id}" ${blacklistData?.location === place.name || blacklistData?.locationId === place.id ? 'selected' : ''}>${Utils.escapeHTML(place.name)}</option>`
        ).join('') : '<option value="">-- اختر الموقع أولاً --</option>';

        // الحصول على المستخدم الحالي
        const currentUser = AppState.currentUser || { name: 'غير محدد', email: '' };

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-user-slash ml-2 text-red-600"></i>
                        ${isEdit ? 'تعديل بيانات الممنوع من الدخول' : 'تسجيل ممنوع من الدخول جديد'}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" title="إغلاق">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.renderBlacklistFormContent(blacklistData, nextSerial, siteOptions, placeOptions, departmentOptions, currentUser)}
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Setup form event listeners (async)
        this.setupBlacklistFormInModal(modal, blacklistData).catch(error => {
            Utils.safeWarn('⚠️ خطأ في إعداد نموذج Blacklist:', error);
        });

        if (typeof Utils.hydrateDriveProxyImages === 'function') {
            Utils.hydrateDriveProxyImages(modal, {
                onFetchFail: (img) => this._onBlacklistTablePhotoError(img)
            });
        }

        // إغلاق النموذج عند النقر خارجه
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // إغلاق النموذج عند الضغط على ESC
        const handleEscape = (e) => {
            if (e.key === 'Escape' && document.body.contains(modal)) {
                modal.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    },

    renderBlacklistFormContent(blacklistData, nextSerial, siteOptions, placeOptions, departmentOptions, currentUser) {
        const isEdit = !!blacklistData;
        const previewPhotoUrl = this.processPhoto(blacklistData);
        const previewDisp = previewPhotoUrl && typeof Utils.resolveDriveAwareImgDisplay === 'function'
            ? Utils.resolveDriveAwareImgDisplay(previewPhotoUrl)
            : { canonical: previewPhotoUrl || '', displaySrc: previewPhotoUrl || '', needsProxy: false, proxyFileId: '' };
        const previewImgSrc = previewDisp.canonical ? previewDisp.displaySrc : '';
        const previewProxyAttr = typeof Utils.driveProxyImgAttrs === 'function' ? Utils.driveProxyImgAttrs(previewDisp) : '';
        return `
            <form id="blacklist-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- م (رقم مسلسل) -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-hashtag ml-2 text-blue-600"></i>
                            م (رقم مسلسل)
                        </label>
                        <input type="text" id="blacklist-serial" class="form-input" 
                            value="${isEdit ? (blacklistData.serialNumber || nextSerial) : nextSerial}" 
                            readonly>
                    </div>

                    <!-- تاريخ المنع * -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-calendar ml-2 text-red-600"></i>
                            تاريخ المنع *
                        </label>
                        <input type="date" id="blacklist-ban-date" required class="form-input" 
                            value="${blacklistData?.banDate ? new Date(blacklistData.banDate).toISOString().slice(0, 10) : ''}">
                    </div>

                    <!-- المصنع * -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-industry ml-2 text-gray-600"></i>
                            المصنع *
                        </label>
                        <select id="blacklist-factory" required class="form-input">
                            <option value="">-- اختر المصنع --</option>
                            ${siteOptions}
                        </select>
                    </div>

                    <!-- الموقع * -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-map-marker-alt ml-2 text-green-600"></i>
                            الموقع *
                        </label>
                        <select id="blacklist-location" required class="form-input">
                            <option value="">-- اختر الموقع --</option>
                            ${placeOptions}
                        </select>
                    </div>

                    <!-- الاسم رباعي * -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-user ml-2 text-purple-600"></i>
                            الاسم رباعي *
                        </label>
                        <input type="text" id="blacklist-name" required class="form-input" 
                            value="${Utils.escapeHTML(blacklistData?.fullName || '')}" 
                            placeholder="الاسم الكامل">
                    </div>

                    <!-- رقم البطاقة الشخصية * -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-id-card ml-2 text-orange-600"></i>
                            رقم البطاقة الشخصية *
                        </label>
                        <input type="text" id="blacklist-id-number" required class="form-input" 
                            value="${Utils.escapeHTML(blacklistData?.idNumber || '')}" 
                            placeholder="رقم البطاقة">
                    </div>

                    <!-- الوظيفة -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-briefcase ml-2 text-indigo-600"></i>
                            الوظيفة
                        </label>
                        <input type="text" id="blacklist-job" class="form-input" 
                            value="${Utils.escapeHTML(blacklistData?.job || '')}" 
                            placeholder="الوظيفة">
                    </div>

                    <!-- الشركة - المقاول -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-building ml-2 text-cyan-600"></i>
                            الشركة - المقاول
                        </label>
                        <input type="text" id="blacklist-contractor" class="form-input" 
                            list="blacklist-contractors-list" 
                            value="${Utils.escapeHTML(blacklistData?.contractor || '')}" 
                            placeholder="اختر أو اكتب اسم الشركة/المقاول">
                        <datalist id="blacklist-contractors-list">
                            <!-- سيتم تحميل المقاولين ديناميكياً -->
                        </datalist>
                    </div>

                    <!-- الإدارة التابع لها -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-building ml-2 text-teal-600"></i>
                            الإدارة التابع لها
                        </label>
                        <input type="text" id="blacklist-department" class="form-input" 
                            list="blacklist-departments-list" 
                            value="${Utils.escapeHTML(blacklistData?.department || '')}" 
                            placeholder="اختر أو اكتب الإدارة">
                        <datalist id="blacklist-departments-list">
                            ${departmentOptions}
                        </datalist>
                    </div>

                    <!-- القائم بالمنع -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-user-shield ml-2 text-yellow-600"></i>
                            القائم بالمنع
                        </label>
                        <input type="text" id="blacklist-banned-by" class="form-input" 
                            value="${Utils.escapeHTML(blacklistData?.bannedBy || '')}" 
                            placeholder="اسم القائم بالمنع">
                    </div>

                    <!-- محرر البيانات -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-user-edit ml-2 text-gray-600"></i>
                            محرر البيانات
                        </label>
                        <input type="text" id="blacklist-editor" class="form-input" 
                            value="${Utils.escapeHTML(blacklistData?.editor || currentUser.name)}" 
                            readonly>
                    </div>

                    <!-- الصورة الشخصية -->
                    <div class="md:col-span-2 lg:col-span-3">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-image ml-2"></i>
                            الصورة الشخصية
                        </label>
                        <input type="file" id="blacklist-photo-input" accept="image/*" class="form-input">
                        <div id="blacklist-photo-preview" class="mt-2 ${previewPhotoUrl ? '' : 'hidden'}">
                            <img src="${previewImgSrc ? Utils.escapeHTML(previewImgSrc) : ''}" alt="صورة شخصية"${previewProxyAttr}
                                class="blacklist-form-photo w-32 h-32 object-cover rounded border" id="blacklist-photo-img">
                            <button type="button" onclick="const blPhotoInput = document.getElementById('blacklist-photo-input'); if (blPhotoInput) blPhotoInput.value=''; const blPhotoPreview = document.getElementById('blacklist-photo-preview'); if (blPhotoPreview) blPhotoPreview.classList.add('hidden');" 
                                class="mt-2 text-sm text-red-600 hover:text-red-800">
                                <i class="fas fa-trash ml-1"></i>حذف الصورة
                            </button>
                        </div>
                    </div>

                    <!-- سبب المنع * -->
                    <div class="md:col-span-2 lg:col-span-3">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-exclamation-triangle ml-2 text-red-600"></i>
                            سبب المنع *
                        </label>
                        <textarea id="blacklist-ban-reason" required class="form-input" rows="3" 
                            placeholder="سبب منع الدخول">${Utils.escapeHTML(blacklistData?.banReason || '')}</textarea>
                    </div>

                    <!-- ملاحظات عامة -->
                    <div class="md:col-span-2 lg:col-span-3">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-sticky-note ml-2 text-gray-600"></i>
                            ملاحظات عامة
                        </label>
                        <textarea id="blacklist-notes" class="form-input" rows="3" 
                            placeholder="ملاحظات إضافية">${Utils.escapeHTML(blacklistData?.notes || '')}</textarea>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-4 pt-4 border-t">
                    <button type="button" id="blacklist-cancel-btn" class="btn-secondary">
                        <i class="fas fa-times ml-2"></i>إلغاء
                    </button>
                    <button type="submit" id="blacklist-submit-btn" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>${isEdit ? 'حفظ التعديلات' : 'تسجيل'}
                    </button>
                </div>
            </form>
        `;
    },

    async setupBlacklistFormInModal(modal, blacklistData) {
        const isEdit = !!blacklistData;
        const form = modal.querySelector('#blacklist-form');
        if (form) {
            form.dataset.editId = isEdit ? blacklistData.id : '';
        }

        // معالج النموذج
        if (form) {
            form.addEventListener('submit', (e) => this.handleBlacklistSubmit(e));
        }

        // معالج إلغاء النموذج
        const cancelBtn = modal.querySelector('#blacklist-cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                modal.remove();
            });
        }

        // معالج رفع الصورة
        const photoInput = modal.querySelector('#blacklist-photo-input');
        if (photoInput) {
            photoInput.addEventListener('change', (e) => this.handleBlacklistPhotoUpload(e));
        }

        // تحميل قائمة المقاولين في datalist
        const contractorInput = modal.querySelector('#blacklist-contractor');
        const contractorsDatalist = modal.querySelector('#blacklist-contractors-list');
        if (contractorInput && contractorsDatalist) {
            try {
                // الحصول على قائمة المقاولين
                let contractors = [];
                
                // محاولة استخدام getAllContractorsForModules
                if (typeof Contractors !== 'undefined' && typeof Contractors.getAllContractorsForModules === 'function') {
                    contractors = Contractors.getAllContractorsForModules() || [];
                }
                
                // ✅ تحسين: بديل: استخدام AppState (بما في ذلك المعتمدين) - مباشرة بدون تأخير
                if (contractors.length === 0) {
                    // دمج المقاولين النشطين فقط من مصادر مختلفة
                    const allContractors = [
                        ...(AppState.appData?.approvedContractors || []),
                        ...(AppState.appData?.contractors || [])
                    ].filter(c => c && c.isActive !== 'inactive' && c.isActive !== false && c.isActive !== 'false' && c.isActive !== 'FALSE');
                    // إزالة التكرار بناءً على ID
                    const uniqueContractors = Array.from(
                        new Map(allContractors.map(c => [c.id || c.contractorId, c])).values()
                    );
                    contractors = uniqueContractors
                        .filter(c => c && (c.name || c.companyName || c.contractorName))
                        .map(c => ({
                            id: c.id || c.contractorId || '',
                            name: (c.name || c.companyName || c.contractorName || '').trim()
                        }))
                        .filter(c => c.name && c.name !== 'غير معروف')
                        .sort((a, b) => a.name.localeCompare(b.name, 'ar', { sensitivity: 'base' }));
                }

                // إضافة المقاولين إلى datalist (اسم المقاول فقط بدون الإدارة)
                contractorsDatalist.innerHTML = contractors.map(c => 
                    `<option value="${Utils.escapeHTML(c.name)}" data-contractor-id="${c.id || ''}"></option>`
                ).join('');

                // التأكد من أن قيمة المقاول في الحقل هي اسم المقاول فقط (بدون الإدارة)
                if (blacklistData?.contractor) {
                    // إذا كانت القيمة تحتوي على " - " (فاصل بين المقاول والإدارة)، نأخذ الجزء الأول فقط
                    const contractorValue = blacklistData.contractor.split(' - ')[0].trim();
                    contractorInput.value = contractorValue;
                }
            } catch (error) {
                Utils.safeWarn('⚠️ خطأ في تحميل قائمة المقاولين:', error);
            }
        }

        // معالج تغيير المصنع (لتحميل الأماكن)
        const factorySelect = modal.querySelector('#blacklist-factory');
        if (factorySelect) {
            factorySelect.addEventListener('change', async (e) => {
                const selectedOption = e.target.selectedOptions[0];
                const siteId = selectedOption?.dataset.siteId || selectedOption?.value;
                await this.loadBlacklistPlaces(siteId);
            });

            // تحميل الأماكن عند فتح النموذج للتعديل
            if (isEdit && blacklistData?.factoryId) {
                const siteId = blacklistData.factoryId;
                try {
                    await this.loadBlacklistPlaces(siteId);
                    // تحديد الموقع بعد تحميله
                    setTimeout(() => {
                        const locationSelect = modal.querySelector('#blacklist-location');
                        if (locationSelect && blacklistData?.location) {
                            locationSelect.value = blacklistData.location;
                        }
                    }, 100);
                } catch (error) {
                    Utils.safeWarn('⚠️ خطأ في تحميل الأماكن:', error);
                }
            }
        }
    },


    renderBlacklistTable() {
        const blacklistRecords = AppState.appData?.blacklistRegister || [];
        const sortedRecords = [...blacklistRecords].sort((a, b) => {
            const dateA = new Date(a.banDate || a.createdAt || 0);
            const dateB = new Date(b.banDate || b.createdAt || 0);
            return dateB - dateA;
        });

        if (sortedRecords.length === 0) {
            return `
                <div class="mt-6">
                    <div class="empty-state">
                        <i class="fas fa-user-slash text-gray-400 text-4xl mb-4"></i>
                        <p class="text-gray-500">لا توجد سجلات ممنوعين من الدخول</p>
                    </div>
                </div>
            `;
        }

        return `
            <div class="mt-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-800">
                        <i class="fas fa-list ml-2"></i>قائمة الممنوعين من الدخول
                    </h3>
                    <div class="flex items-center gap-2">
                        <input type="text" id="blacklist-search" class="form-input" 
                            placeholder="بحث..." style="width: 250px;">
                        <button id="blacklist-export-pdf" class="btn-secondary">
                            <i class="fas fa-file-pdf ml-2"></i>PDF
                        </button>
                        <button id="blacklist-export-excel" class="btn-secondary">
                            <i class="fas fa-file-excel ml-2"></i>Excel
                        </button>
                    </div>
                </div>
                <div class="table-wrapper" style="overflow-x: auto;">
                    <table class="data-table" id="blacklist-table">
                        <thead>
                            <tr>
                        <th>م</th>
                        <th>تاريخ المنع</th>
                        <th>المصنع</th>
                        <th>الموقع</th>
                        <th>الاسم رباعي</th>
                        <th>رقم البطاقة</th>
                        <th>الوظيفة</th>
                        <th>الشركة - المقاول</th>
                        <th>الإدارة</th>
                        <th>القائم بالمنع</th>
                        <th>محرر البيانات</th>
                        <th>الصورة</th>
                        <th>سبب المنع</th>
                        <th>ملاحظات</th>
                        <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody id="blacklist-table-body">
                            ${sortedRecords.map(record => {
                                const photoUrl = this.processPhoto(record);
                                const disp = photoUrl && typeof Utils.resolveDriveAwareImgDisplay === 'function'
                                    ? Utils.resolveDriveAwareImgDisplay(photoUrl)
                                    : { canonical: photoUrl || '', displaySrc: photoUrl || '', needsProxy: false, proxyFileId: '' };
                                const imgSrc = disp.canonical ? disp.displaySrc : '';
                                const proxyAttr = typeof Utils.driveProxyImgAttrs === 'function' ? Utils.driveProxyImgAttrs(disp) : '';
                                return `
                                <tr>
                                    <td>${record.serialNumber || '-'}</td>
                                    <td>${record.banDate ? Utils.formatDate(record.banDate) : '-'}</td>
                                    <td>${Utils.escapeHTML(record.factory || '-')}</td>
                                    <td>${Utils.escapeHTML(record.location || '-')}</td>
                                    <td>${Utils.escapeHTML(record.fullName || '-')}</td>
                                    <td>${Utils.escapeHTML(record.idNumber || '-')}</td>
                                    <td>${Utils.escapeHTML(record.job || '-')}</td>
                                    <td>${Utils.escapeHTML(record.contractor || '-')}</td>
                                    <td>${Utils.escapeHTML(record.department || '-')}</td>
                                    <td>${Utils.escapeHTML(record.bannedBy || '-')}</td>
                                    <td>${Utils.escapeHTML(record.editor || '-')}</td>
                                    <td>
                                        ${photoUrl ? 
                `<img src="${Utils.escapeHTML(imgSrc)}" alt="صورة"${proxyAttr} class="blacklist-table-photo w-12 h-12 object-cover rounded cursor-pointer"
                                                data-photo-url="${Utils.escapeHTML(photoUrl)}"
                                                onclick="Violations.viewBlacklistPhoto(this.dataset.photoUrl)" title="انقر لعرض الصورة"
                                                onerror="Violations._onBlacklistTablePhotoError(this)">` 
                : '-'}
                                    </td>
                                    <td class="max-w-xs truncate" title="${Utils.escapeHTML(record.banReason || '')}">
                                        ${Utils.escapeHTML((record.banReason || '-').substring(0, 50))}${(record.banReason || '').length > 50 ? '...' : ''}
                                    </td>
                                    <td class="max-w-xs truncate" title="${Utils.escapeHTML(record.notes || '')}">
                                        ${Utils.escapeHTML((record.notes || '-').substring(0, 30))}${(record.notes || '').length > 30 ? '...' : ''}
                                    </td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button onclick="Violations.viewBlacklistDetails('${record.id}')" 
                                                class="btn-icon btn-icon-info" title="عرض التفاصيل">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button onclick="Violations.editBlacklistRecord('${record.id}')" 
                                                class="btn-icon btn-icon-warning" title="تعديل">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button onclick="Violations.deleteBlacklistRecord('${record.id}')" 
                                                class="btn-icon btn-icon-danger" title="حذف">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;}).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    async setupBlacklistEventListeners() {
        setTimeout(async () => {
            // التأكد من تحميل البيانات
            if (!AppState.appData.blacklistRegister) {
                AppState.appData.blacklistRegister = [];
            }

            // التأكد من تحميل إعدادات النماذج
            if (typeof Permissions !== 'undefined' && typeof Permissions.ensureFormSettingsState === 'function') {
                try {
                    await Permissions.ensureFormSettingsState();
                } catch (error) {
                    Utils.safeWarn('⚠️ خطأ في تحميل إعدادات النماذج:', error);
                }
            }

            // معالج نموذج التسجيل (فقط للنموذج الموجود في الصفحة الرئيسية، ليس modal)
            const form = document.getElementById('blacklist-form');
            if (form && !form.closest('.modal-overlay')) {
                // إزالة event listener القديم إن وجد
                const newForm = form.cloneNode(true);
                form.parentNode.replaceChild(newForm, form);
                newForm.addEventListener('submit', (e) => this.handleBlacklistSubmit(e));
            }

            // معالج رفع الصورة (فقط إذا كان موجوداً في الصفحة الرئيسية)
            const photoInput = document.getElementById('blacklist-photo-input');
            if (photoInput && !photoInput.closest('.modal-overlay')) {
                photoInput.addEventListener('change', (e) => this.handleBlacklistPhotoUpload(e));
            }

            // معالج البحث
            const searchInput = document.getElementById('blacklist-search');
            if (searchInput) {
                // إزالة event listeners القديمة
                const newSearchInput = searchInput.cloneNode(true);
                searchInput.parentNode.replaceChild(newSearchInput, searchInput);
                newSearchInput.addEventListener('input', (e) => this.filterBlacklistTable(e.target.value));
            }

            // ✅ إضافة معالج زر التسجيل (مهم جداً)
            const addBtn = document.getElementById('blacklist-add-btn');
            if (addBtn) {
                // التحقق من أن listener لم يتم إضافته مسبقاً
                if (!addBtn.dataset.listenerAttached) {
                    addBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        try {
                            this.showBlacklistForm();
                        } catch (error) {
                            Utils.safeError('خطأ في فتح نموذج Blacklist:', error);
                            Notification.error('حدث خطأ أثناء فتح النموذج. يرجى المحاولة مرة أخرى.');
                        }
                    });
                    addBtn.dataset.listenerAttached = 'true';
                    if (AppState.debugMode) {
                        Utils.safeLog('✅ تم ربط زر "تسجيل ممنوع من الدخول جديد" بنجاح');
                    }
                } else {
                    if (AppState.debugMode) {
                        Utils.safeLog('ℹ️ زر "تسجيل ممنوع من الدخول جديد" مربوط مسبقاً');
                    }
                }
            } else {
                if (AppState.debugMode) {
                    Utils.safeWarn('⚠️ زر "blacklist-add-btn" غير موجود في DOM');
                }
            }

            // معالج تغيير المصنع (فقط إذا كان موجوداً في الصفحة الرئيسية)
            const factorySelect = document.getElementById('blacklist-factory');
            if (factorySelect && !factorySelect.closest('.modal-overlay')) {
                factorySelect.addEventListener('change', async (e) => {
                    const selectedOption = e.target.selectedOptions[0];
                    const siteId = selectedOption?.dataset.siteId || selectedOption?.value;
                    await this.loadBlacklistPlaces(siteId);
                });
            }

            // معالجات التصدير
            const exportPdfBtn = document.getElementById('blacklist-export-pdf');
            if (exportPdfBtn) {
                const newExportPdfBtn = exportPdfBtn.cloneNode(true);
                exportPdfBtn.parentNode.replaceChild(newExportPdfBtn, exportPdfBtn);
                newExportPdfBtn.addEventListener('click', () => this.exportBlacklistToPDF());
            }

            const exportExcelBtn = document.getElementById('blacklist-export-excel');
            if (exportExcelBtn) {
                const newExportExcelBtn = exportExcelBtn.cloneNode(true);
                exportExcelBtn.parentNode.replaceChild(newExportExcelBtn, exportExcelBtn);
                newExportExcelBtn.addEventListener('click', () => this.exportBlacklistToExcel());
            }

            this._hydrateBlacklistDrivePhotos();
        }, 100);
    },

    async handleBlacklistSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const isEdit = !!form.dataset.editId;

        // معالجة الصورة
        let photo = isEdit ?
            (AppState.appData?.blacklistRegister?.find(r => r.id === form.dataset.editId)?.photo || '') : '';

        // البحث عن photoInput داخل modal
        const modal = form.closest('.modal-overlay');
        const photoInput = modal ? modal.querySelector('#blacklist-photo-input') : document.getElementById('blacklist-photo-input');
        if (photoInput?.files?.[0]) {
            const file = photoInput.files[0];
            if (file.size > 2 * 1024 * 1024) {
                Notification.error('حجم الصورة كبير جداً. الحد الأقصى 2MB');
                return;
            }
            try {
                photo = await this.convertImageToBase64(file);
            } catch (err) {
                if (AppState.debugMode) Utils.safeWarn('خطأ في تحويل الصورة:', err);
            }
        }

        // الحصول على IDs للمواقع (من داخل modal)
        const factorySelect = modal ? modal.querySelector('#blacklist-factory') : document.getElementById('blacklist-factory');
        const locationSelect = modal ? modal.querySelector('#blacklist-location') : document.getElementById('blacklist-location');

        const factoryOption = factorySelect?.selectedOptions[0];
        const locationOption = locationSelect?.selectedOptions[0];

        // الحصول على باقي الحقول
        const getFieldValue = (id) => {
            const field = modal ? modal.querySelector(`#${id}`) : document.getElementById(id);
            return field?.value || '';
        };

        const formData = {
            id: form.dataset.editId || Utils.generateId('BLACKLIST'),
            serialNumber: getFieldValue('blacklist-serial'),
            factory: factorySelect?.value || '',
            factoryId: factoryOption?.dataset.siteId || '',
            location: locationSelect?.value || '',
            locationId: locationOption?.dataset.placeId || '',
            fullName: getFieldValue('blacklist-name'),
            idNumber: getFieldValue('blacklist-id-number'),
            photo: photo,
            job: getFieldValue('blacklist-job'),
            contractor: (getFieldValue('blacklist-contractor') || '').trim().split(' - ')[0], // اسم المقاول فقط (بدون الإدارة)
            department: getFieldValue('blacklist-department'),
            banReason: getFieldValue('blacklist-ban-reason'),
            banDate: getFieldValue('blacklist-ban-date'),
            bannedBy: getFieldValue('blacklist-banned-by'),
            editor: getFieldValue('blacklist-editor'),
            notes: getFieldValue('blacklist-notes'),
            createdAt: isEdit ?
                (AppState.appData?.blacklistRegister?.find(r => r.id === form.dataset.editId)?.createdAt || new Date().toISOString()) :
                new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // رفع الصورة إذا كانت Base64
        if (photo && photo.startsWith('data:')) {
            try {
                const uploadResult = await GoogleIntegration.uploadFileToDrive?.(
                    photo,
                    `blacklist_${formData.id}_${Date.now()}.jpg`,
                    'image/jpeg',
                    'Blacklist_Register'
                );
                if (uploadResult?.success && (uploadResult.directLink || uploadResult.shareableLink)) {
                    formData.photo = uploadResult.directLink || uploadResult.shareableLink;
                    if (AppState.debugMode) console.log('✅ تم رفع الصورة بنجاح:', formData.photo);
                } else {
                    // إذا فشل الرفع، نحتفظ بـ Base64 كحل مؤقت
                    if (AppState.debugMode) console.warn('⚠️ فشل في رفع الصورة، سيتم الاحتفاظ بـ Base64');
                    Notification.warning('فشل في رفع الصورة إلى Drive. سيتم حفظ الصورة مؤقتاً.');
                }
            } catch (err) {
                if (AppState.debugMode) Utils.safeWarn('❌ خطأ في رفع الصورة:', err);
                Notification.error('خطأ في رفع الصورة: ' + err.message);
                // نحتفظ بـ Base64 في حالة الفشل
            }
        }

        await this.saveBlacklistRecord(formData, isEdit);
    },

    async saveBlacklistRecord(recordData, isEdit) {
        Loading.show();
        try {
            if (!AppState.appData.blacklistRegister) {
                AppState.appData.blacklistRegister = [];
            }

            if (isEdit) {
                const index = AppState.appData.blacklistRegister.findIndex(r => r.id === recordData.id);
                if (index !== -1) {
                    AppState.appData.blacklistRegister[index] = recordData;
                } else {
                    AppState.appData.blacklistRegister.push(recordData);
                }
            } else {
                AppState.appData.blacklistRegister.push(recordData);
            }

            // حفظ محلياً
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            // حفظ في قاعدة SQL
            try {
                await GoogleIntegration.autoSave('Blacklist_Register', AppState.appData.blacklistRegister);
            } catch (err) {
                if (AppState.debugMode) Utils.safeWarn('خطأ في حفظ قاعدة SQL:', err);
                Notification.warning('تم الحفظ محلياً لكن فشل الحفظ في قاعدة SQL');
            }

            Loading.hide();
            Notification.success(`تم ${isEdit ? 'تحديث' : 'تسجيل'} السجل بنجاح`);

            // إغلاق النموذج إذا كان مفتوحاً
            const existingModal = document.querySelector('.modal-overlay');
            if (existingModal && existingModal.querySelector('#blacklist-form')) {
                existingModal.remove();
            }

            // تحديث الكروت والجدول
            const cardsContainer = document.getElementById('blacklist-cards-container');
            if (cardsContainer) {
                cardsContainer.innerHTML = this.renderBlacklistCards();
                this.setupBlacklistEventListeners();
            }

            const tableContainer = document.getElementById('blacklist-table-container');
            if (tableContainer) {
                tableContainer.innerHTML = this.renderBlacklistTable();
                this.setupBlacklistEventListeners();
            }

            // تحديث الإحصائيات
            const cardBody = document.querySelector('#violations-tab-content .card-body');
            if (cardBody) {
                const existingStats = cardBody.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
                if (existingStats) {
                    existingStats.outerHTML = this.renderBlacklistStats();
                }
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في حفظ السجل:', error);
            Notification.error('فشل في حفظ السجل: ' + error.message);
        }
    },

    handleBlacklistPhotoUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            // البحث داخل modal أولاً
            const modal = document.querySelector('.modal-overlay');
            const preview = modal ? modal.querySelector('#blacklist-photo-preview') : document.getElementById('blacklist-photo-preview');
            const img = modal ? modal.querySelector('#blacklist-photo-img') : document.getElementById('blacklist-photo-img');
            if (preview && img) {
                img.src = event.target.result;
                preview.classList.remove('hidden');
            }
        };
        reader.readAsDataURL(file);
    },

    async loadBlacklistPlaces(siteId) {
        try {
            // التأكد من تحميل إعدادات النماذج
            if (typeof Permissions !== 'undefined' && typeof Permissions.ensureFormSettingsState === 'function') {
                await Permissions.ensureFormSettingsState();
            }

            // البحث عن locationSelect داخل modal أولاً، ثم في document
            const modal = document.querySelector('.modal-overlay');
            const locationSelect = modal ? modal.querySelector('#blacklist-location') : document.getElementById('blacklist-location');
            if (!locationSelect) return;

            locationSelect.innerHTML = '<option value="">-- اختر الموقع --</option>';

            const places = this.getPlaceOptions(siteId);

            places.forEach(place => {
                const option = document.createElement('option');
                option.value = place.name;
                option.dataset.placeId = place.id;
                option.textContent = place.name;
                locationSelect.appendChild(option);
            });
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في تحميل الأماكن:', error);
        }
    },


    filterBlacklistTable(searchTerm) {
        const tbody = document.getElementById('blacklist-table-body');
        if (!tbody) return;

        const rows = tbody.querySelectorAll('tr');
        const term = searchTerm.toLowerCase();

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    },

    editBlacklistRecord(recordId) {
        const record = AppState.appData?.blacklistRegister?.find(r => r.id === recordId);
        if (!record) {
            Notification.error('السجل غير موجود');
            return;
        }

        this.showBlacklistForm(record);
    },

    async deleteBlacklistRecord(recordId) {
        if (!confirm('هل أنت متأكد من حذف هذا السجل؟')) return;

        Loading.show();
        try {
            if (AppState.appData?.blacklistRegister) {
                AppState.appData.blacklistRegister = AppState.appData.blacklistRegister.filter(r => r.id !== recordId);
            }

            // حفظ محلياً
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            // حفظ في قاعدة SQL
            try {
                await GoogleIntegration.autoSave('Blacklist_Register', AppState.appData.blacklistRegister);
            } catch (err) {
                if (AppState.debugMode) Utils.safeWarn('خطأ في حفظ قاعدة SQL:', err);
                Notification.warning('تم الحذف محلياً لكن فشل الحفظ في قاعدة SQL');
            }

            Loading.hide();
            Notification.success('تم حذف السجل بنجاح');

            // إعادة تحميل التبويب
            const activeTabBtn = document.querySelector('.tab-btn.active[data-tab="blacklist"]');
            if (activeTabBtn) {
                await this.switchTab('blacklist');
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في حذف السجل:', error);
            Notification.error('فشل في حذف السجل: ' + error.message);
        }
    },

    viewBlacklistPhoto(photoUrl) {
        if (!photoUrl) {
            Notification.error('لا توجد صورة');
            return;
        }

        // ✅ معالجة الصورة بشكل صحيح (تحويل الروابط القديمة إذا لزم)
        const processedUrl = this.processPhoto(photoUrl);
        if (!processedUrl) {
            Notification.error('رابط الصورة غير صالح');
            return;
        }

        const openPhotoModal = (src) => {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">الصورة الشخصية</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <img src="${Utils.escapeHTML(src)}" alt="صورة شخصية" style="width: 100%; max-height: 70vh; object-fit: contain;"
                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23666%22 font-family=%22sans-serif%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3Eفشل تحميل الصورة%3C/text%3E%3C/svg%3E';">
                </div>
            </div>
        `;
            document.body.appendChild(modal);
        };

        const disp = typeof Utils.resolveDriveAwareImgDisplay === 'function'
            ? Utils.resolveDriveAwareImgDisplay(processedUrl)
            : { needsProxy: false, proxyFileId: '' };
        if (disp.needsProxy && typeof Utils.fetchDriveImageDataUri === 'function') {
            Utils.fetchDriveImageDataUri(disp.proxyFileId).then((dataUri) => {
                if (dataUri) openPhotoModal(dataUri);
                else Notification.error('تعذر تحميل الصورة من الخادم');
            }).catch(() => Notification.error('تعذر تحميل الصورة'));
            return;
        }

        openPhotoModal(processedUrl);
    },

    viewBlacklistDetails(recordId) {
        const record = AppState.appData?.blacklistRegister?.find(r => r.id === recordId);
        if (!record) {
            Notification.error('السجل غير موجود');
            return;
        }

        // ✅ معالجة الصورة بشكل صحيح
        const photoUrl = this.processPhoto(record);
        const photoDisp = photoUrl && typeof Utils.resolveDriveAwareImgDisplay === 'function'
            ? Utils.resolveDriveAwareImgDisplay(photoUrl)
            : { canonical: photoUrl || '', displaySrc: photoUrl || '', needsProxy: false, proxyFileId: '' };
        const photoImgSrc = photoDisp.canonical ? photoDisp.displaySrc : '';
        const photoProxyAttr = typeof Utils.driveProxyImgAttrs === 'function' ? Utils.driveProxyImgAttrs(photoDisp) : '';

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-user-slash ml-2"></i>
                        تفاصيل سجل الممنوع من الدخول
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="blacklist-details-content">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-semibold text-gray-600">الرقم التسلسلي</label>
                            <p class="text-gray-800">${Utils.escapeHTML(record.serialNumber || '-')}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">تاريخ المنع</label>
                            <p class="text-gray-800">${record.banDate ? Utils.formatDate(record.banDate) : '-'}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">المصنع</label>
                            <p class="text-gray-800">${Utils.escapeHTML(record.factory || '-')}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">الموقع</label>
                            <p class="text-gray-800">${Utils.escapeHTML(record.location || '-')}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">الاسم رباعي</label>
                            <p class="text-gray-800">${Utils.escapeHTML(record.fullName || '-')}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">رقم البطاقة</label>
                            <p class="text-gray-800">${Utils.escapeHTML(record.idNumber || '-')}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">الوظيفة</label>
                            <p class="text-gray-800">${Utils.escapeHTML(record.job || '-')}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">الشركة - المقاول</label>
                            <p class="text-gray-800">${Utils.escapeHTML(record.contractor || '-')}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">الإدارة</label>
                            <p class="text-gray-800">${Utils.escapeHTML(record.department || '-')}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">القائم بالمنع</label>
                            <p class="text-gray-800">${Utils.escapeHTML(record.bannedBy || '-')}</p>
                        </div>
                        <div>
                            <label class="text-sm font-semibold text-gray-600">محرر البيانات</label>
                            <p class="text-gray-800">${Utils.escapeHTML(record.editor || '-')}</p>
                        </div>
                        ${record.createdAt ? `
                        <div>
                            <label class="text-sm font-semibold text-gray-600">تاريخ الإنشاء</label>
                            <p class="text-gray-800">${Utils.formatDateTime(record.createdAt)}</p>
                        </div>
                        ` : ''}
                        ${record.updatedAt ? `
                        <div>
                            <label class="text-sm font-semibold text-gray-600">تاريخ آخر تحديث</label>
                            <p class="text-gray-800">${Utils.formatDateTime(record.updatedAt)}</p>
                        </div>
                        ` : ''}
                    </div>
                    ${photoUrl ? `
                    <div class="mt-4">
                        <label class="text-sm font-semibold text-gray-600 mb-2 block">الصورة الشخصية</label>
                        <div class="flex justify-center">
                            <img src="${Utils.escapeHTML(photoImgSrc)}" alt="صورة شخصية"${photoProxyAttr}
                                class="blacklist-detail-photo max-w-xs max-h-64 object-cover rounded-lg cursor-pointer border-2 border-gray-200"
                                data-photo-url="${Utils.escapeHTML(photoUrl)}"
                                onclick="Violations.viewBlacklistPhoto(this.dataset.photoUrl)"
                                title="انقر لعرض الصورة بحجم كامل"
                                onerror="Violations._onBlacklistTablePhotoError(this)">
                        </div>
                    </div>
                    ` : ''}
                    <div class="mt-4">
                        <label class="text-sm font-semibold text-gray-600 mb-2 block">سبب المنع</label>
                        <p class="text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-200 whitespace-pre-wrap">${Utils.escapeHTML(record.banReason || '-')}</p>
                    </div>
                    ${record.notes ? `
                    <div class="mt-4">
                        <label class="text-sm font-semibold text-gray-600 mb-2 block">ملاحظات</label>
                        <p class="text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-200 whitespace-pre-wrap">${Utils.escapeHTML(record.notes)}</p>
                    </div>
                    ` : ''}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="Violations.printBlacklistDetails('${recordId}')">
                        <i class="fas fa-print ml-2"></i>طباعة
                    </button>
                    ${typeof EmailDispatch !== 'undefined' ? EmailDispatch.renderFooterButtonHtml('violations.blacklist') : ''}
                    <button type="button" class="btn-warning" onclick="Violations.editBlacklistRecord('${recordId}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>تعديل
                    </button>
                    <button type="button" class="btn-danger" onclick="if(confirm('هل أنت متأكد من حذف هذا السجل؟')) { Violations.deleteBlacklistRecord('${recordId}'); this.closest('.modal-overlay').remove(); }">
                        <i class="fas fa-trash ml-2"></i>حذف
                    </button>
                    <button type="button" class="btn-primary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        if (typeof EmailDispatch !== 'undefined') {
            EmailDispatch.bindFooterButtons(modal, {
                moduleKey: 'violations.blacklist',
                record: {
                    ...record,
                    name: record.fullName || '',
                    nationalId: record.idNumber || '',
                    reason: record.banReason || '',
                    date: record.banDate || record.createdAt || ''
                },
                recordId: record.id || recordId || ''
            });
        }
        if (typeof Utils.hydrateDriveProxyImages === 'function') {
            Utils.hydrateDriveProxyImages(modal, {
                onFetchFail: (img) => this._onBlacklistTablePhotoError(img)
            });
        }
    },

    async printBlacklistDetails(recordId) {
        const record = AppState.appData?.blacklistRegister?.find(r => r.id === recordId);
        if (!record) {
            Notification.error('السجل غير موجود');
            return;
        }

        try {
            Loading.show('جاري إعداد وثيقة أمر المنع (ISO 45001)...');

            const photoSource = record.photo || record.image || record.photoUrl || '';
            const resolvedPhoto = await this._resolveViolationReportPhoto_(photoSource);
            const title = 'أمر منع إداري من دخول المنشأة ومواقع العمل';
            const subtitle = 'Blacklist Ban Order — إجراء أمني وسلامة مهنية مشدد';

            const content = `
                <div class="report-page portrait">
                    ${this.getIsoPrintHeaderHtml(title, subtitle, 'DOC-HSE-VIO-BLK-01', 'Rev. 03', 'سري للغاية')}

                    <div style="background: #fef2f2; border: 2px solid #b91c1c; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; color: #991b1b; font-weight: 800; font-size: 11.5px; text-align: center;">
                        <i class="fas fa-exclamation-triangle ml-2"></i>
                        قرار إداري ملزم: يُمنع المذكور أدناه منعاً باتاً من دخول جميع مصانع ومواقع الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP) لمخالفته معايير السلامة والأمن الصناعي
                    </div>

                    <div class="summary-cards-row">
                        <div class="kpi-stat-card accent-red">
                            <div class="kpi-card-label">الرقم التسلسلي للمنع</div>
                            <div class="kpi-card-value" style="color: #991b1b; font-size: 14px;">${Utils.escapeHTML(record.serialNumber || record.id || '-')}</div>
                        </div>
                        <div class="kpi-stat-card accent-amber">
                            <div class="kpi-card-label">تاريخ المنع</div>
                            <div class="kpi-card-value" style="color: #92400e; font-size: 14px;">${record.banDate ? Utils.formatDate(record.banDate) : '-'}</div>
                        </div>
                        <div class="kpi-stat-card accent-blue">
                            <div class="kpi-card-label">المصنع المعني</div>
                            <div class="kpi-card-value" style="color: #1e3a8a; font-size: 14px;">${Utils.escapeHTML(record.factory || '-')}</div>
                        </div>
                        <div class="kpi-stat-card accent-green">
                            <div class="kpi-card-label">الموقع المحدد</div>
                            <div class="kpi-card-value" style="color: #047857; font-size: 14px;">${Utils.escapeHTML(record.location || '-')}</div>
                        </div>
                    </div>

                    <!-- بيانات الشخص الممنوع -->
                    <div class="info-section-block">
                        <div class="info-section-header">
                            <i class="fas fa-user-slash"></i>
                            بيانات وهوية الشخص الممنوع من الدخول
                        </div>
                        <div class="info-grid-2">
                            <div class="info-cell">
                                <span class="info-cell-label">الاسم رباعي</span>
                                <span class="info-cell-value" style="color: #991b1b; font-weight: 900; font-size: 12px;">${Utils.escapeHTML(record.fullName || '-')}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">رقم بطاقة الرقم القومي</span>
                                <span class="info-cell-value" style="font-family: monospace, inherit; font-weight: 900;">${Utils.escapeHTML(record.idNumber || '-')}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">الوظيفة / المهنة</span>
                                <span class="info-cell-value">${Utils.escapeHTML(record.job || '-')}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">الشركة التابع لها - المقاول</span>
                                <span class="info-cell-value">${Utils.escapeHTML(record.contractor || '-')}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">الإدارة / القسم</span>
                                <span class="info-cell-value">${Utils.escapeHTML(record.department || '-')}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">القائم بالمنع</span>
                                <span class="info-cell-value">${Utils.escapeHTML(record.bannedBy || '-')}</span>
                            </div>
                        </div>
                    </div>

                    <!-- الصورة الشخصية -->
                    ${resolvedPhoto ? `
                        <div class="info-section-block">
                            <div class="info-section-header">
                                <i class="fas fa-id-card"></i>
                                الصورة الشخصية للشخص الممنوع
                            </div>
                            <div style="padding: 10px; text-align: center; background: #f8fafc;">
                                <img src="${Utils.escapeHTML(resolvedPhoto)}" alt="صورة شخصية" style="max-height: 180px; max-width: 95%; object-fit: contain; border: 1.5px solid #cbd5e1; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);" onerror="this.closest('.info-section-block').style.display='none';">
                            </div>
                        </div>
                    ` : ''}

                    <!-- أسباب وتفاصيل قرار المنع -->
                    <div class="info-section-block">
                        <div class="info-section-header">
                            <i class="fas fa-file-alt"></i>
                            أسباب وحيثيات قرار المنع الإداري
                        </div>
                        <div class="info-grid-2">
                            <div class="info-cell info-cell-wide">
                                <span class="info-cell-label">سبب المنع والمخالفة المرتكبة</span>
                                <span class="info-cell-value" style="white-space: pre-wrap; line-height: 1.5; color: #b91c1c;">${Utils.escapeHTML(record.banReason || '-')}</span>
                            </div>
                            ${record.notes ? `
                                <div class="info-cell info-cell-wide">
                                    <span class="info-cell-label">ملاحظات أمنية وإدارية</span>
                                    <span class="info-cell-value" style="white-space: pre-wrap; line-height: 1.5;">${Utils.escapeHTML(record.notes)}</span>
                                </div>
                            ` : ''}
                            <div class="info-cell">
                                <span class="info-cell-label">محرر البيانات</span>
                                <span class="info-cell-value">${Utils.escapeHTML(record.editor || '-')}</span>
                            </div>
                            <div class="info-cell">
                                <span class="info-cell-label">تاريخ تحرير السجل</span>
                                <span class="info-cell-value">${record.createdAt ? Utils.formatDateTime(record.createdAt) : '-'}</span>
                            </div>
                        </div>
                    </div>

                    <!-- التوقيعات والاعتمادات -->
                    <div class="signatures-grid">
                        <div class="sig-card">
                            <div class="sig-card-title">أمن المنشآت والحراسات</div>
                            <div class="sig-card-name">مسؤول التنفيذ الميداني بالبوابات</div>
                            <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">إدارة السلامة والصحة المهنية</div>
                            <div class="sig-card-name">مُصدر قرار المنع والتدقيق</div>
                            <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                        </div>
                        <div class="sig-card">
                            <div class="sig-card-title">الاعتماد الإداري النهائي</div>
                            <div class="sig-card-name">المدير العام للمصنع / الإدارة العليا</div>
                            <div class="sig-line-area">الاعتماد والختم: ............................</div>
                        </div>
                    </div>

                    ${this.getIsoPrintFooterHtml('DOC-HSE-VIO-BLK-01', 'Rev. 03', 'ISO 45001:2018 (Clause 8.1.4)')}
                </div>
            `;

            Loading.hide();

            const pdfFileName = `أمر_منع_${Utils.escapeHTML(record.fullName || 'شخص')}_${new Date().toISOString().slice(0, 10)}.pdf`;
            this.openIsoPrintWindow(title, content, false, '', pdfFileName);
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في إعداد طباعة أمر المنع:', error);
            Notification.error('فشل في إعداد الطباعة: ' + error.message);
        }
    },

    async exportBlacklistToPDF() {
        try {
            const blacklistRecords = AppState.appData?.blacklistRegister || [];
            if (blacklistRecords.length === 0) {
                Notification.warning('لا توجد بيانات للتصدير');
                return;
            }

            Loading.show('جاري إنشاء سجل الممنوعين من الدخول (ISO 45001)...');

            const title = 'سجل الأشخاص والجهات الممنوعة من دخول المنشأة';
            const subtitle = 'Master Blacklist Register — قائمة الحظر الأمني والسلامة المهنية';

            // إحصائيات
            const totalCount = blacklistRecords.length;
            const uniqueFactories = new Set(blacklistRecords.map(r => r.factory).filter(Boolean)).size;
            const uniqueContractors = new Set(blacklistRecords.map(r => r.contractor).filter(Boolean)).size;

            // تقسيم الصفحات بنظام .report-page landscape
            const pagesData = this._paginateViolationsList(blacklistRecords, 8, 11);
            const totalPages = pagesData.length;

            const pagesHtml = pagesData.map((pageRecords, pageIdx) => {
                const pageNum = pageIdx + 1;
                const isFirstPage = pageNum === 1;
                const isLastPage = pageNum === totalPages;

                const rowsHtml = pageRecords.map((r, rIdx) => {
                    const globalIdx = (pageIdx === 0 ? 0 : 8 + (pageIdx - 1) * 11) + rIdx + 1;
                    return `
                        <tr>
                            <td style="font-weight: 700;">${globalIdx}</td>
                            <td>${r.banDate ? Utils.formatDate(r.banDate) : '-'}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(r.factory || '-')}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(r.location || '-')}</td>
                            <td style="font-weight: 800; text-align: right; color: #991b1b;">${Utils.escapeHTML(r.fullName || '-')}</td>
                            <td style="font-family: monospace, inherit; font-size: 9.5px;">${Utils.escapeHTML(r.idNumber || '-')}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(r.job || '-')}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(r.contractor || '-')}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(r.department || '-')}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(r.bannedBy || '-')}</td>
                            <td style="text-align: right; font-size: 9.5px; line-height: 1.35; white-space: normal; word-break: break-word;">${Utils.escapeHTML(r.banReason || '-')}</td>
                        </tr>
                    `;
                }).join('');

                return `
                    <div class="report-page landscape">
                        ${this.getIsoPrintHeaderHtml(
                            title,
                            isFirstPage ? subtitle : `تابع جدول ${title} — استكمال البيانات`,
                            'DOC-HSE-VIO-BLK-REG-01',
                            'Rev. 03',
                            'سري للغاية'
                        )}

                        ${isFirstPage ? `
                            <div class="summary-cards-row">
                                <div class="kpi-stat-card accent-red">
                                    <div class="kpi-card-label">إجمالي الأشخاص الممنوعين</div>
                                    <div class="kpi-card-value" style="color: #991b1b;">${totalCount}</div>
                                </div>
                                <div class="kpi-stat-card accent-blue">
                                    <div class="kpi-card-label">المصانع والمواقع المعنية</div>
                                    <div class="kpi-card-value" style="color: #1e3a8a;">${uniqueFactories}</div>
                                </div>
                                <div class="kpi-stat-card accent-amber">
                                    <div class="kpi-card-label">الشركات والمقاولون</div>
                                    <div class="kpi-card-value" style="color: #92400e;">${uniqueContractors}</div>
                                </div>
                                <div class="kpi-stat-card accent-green">
                                    <div class="kpi-card-label">تاريخ استخراج السجل</div>
                                    <div class="kpi-card-value" style="color: #047857; font-size: 14px;">${Utils.formatDate(new Date())}</div>
                                </div>
                            </div>
                        ` : ''}

                        <table class="iso-table">
                            <thead>
                                <tr>
                                    <th style="width: 32px;">م</th>
                                    <th style="width: 75px;">تاريخ المنع</th>
                                    <th>المصنع</th>
                                    <th>الموقع</th>
                                    <th>الاسم رباعي</th>
                                    <th>رقم البطاقة</th>
                                    <th>الوظيفة</th>
                                    <th>الشركة - المقاول</th>
                                    <th>الإدارة</th>
                                    <th>القائم بالمنع</th>
                                    <th>سبب المنع</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>

                        ${isLastPage ? `
                            <div class="signatures-grid">
                                <div class="sig-card">
                                    <div class="sig-card-title">مسؤول أمن البوابات والمنشآت</div>
                                    <div class="sig-card-name">التنفيذ الميداني وإخطار الحراسات</div>
                                    <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">مشرف السلامة والصحة المهنية</div>
                                    <div class="sig-card-name">المراجعة والتدقيق والربط النظامي</div>
                                    <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">مدير عام السلامة والأمن الصناعي</div>
                                    <div class="sig-card-name">الاعتماد الرسمي لقائمة الحظر</div>
                                    <div class="sig-line-area">الاعتماد والختم: ............................</div>
                                </div>
                            </div>

                            ${this.getIsoPrintFooterHtml('DOC-HSE-VIO-BLK-REG-01', 'Rev. 03', 'ISO 45001:2018 (Clause 8.1.4)')}
                        ` : ''}

                        <div class="page-counter-footer">صفحة ${pageNum} من ${totalPages}</div>
                    </div>
                `;
            }).join('');

            Loading.hide();

            const fileName = `سجل_الممنوعين_من_الدخول_${new Date().toISOString().slice(0, 10)}.pdf`;
            await this.downloadIsoReportAsPdf(title, pagesHtml, fileName, true);
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في تصدير سجل الممنوعين PDF:', error);
            Notification.error('فشل في تصدير PDF: ' + error.message);
        }
    },

        exportBlacklistToExcel() {
        try {
            const blacklistRecords = AppState.appData?.blacklistRegister || [];
            if (blacklistRecords.length === 0) {
                Notification.warning('لا توجد بيانات للتصدير');
                return;
            }

            Loading.show('جاري إنشاء ملف Excel...');

            if (typeof XLSX === 'undefined') {
                Loading.hide();
                Notification.error('مكتبة Excel غير متاحة. يرجى التأكد من تحميل مكتبة SheetJS');
                return;
            }

            // تحضير البيانات
            const excelData = blacklistRecords.map(record => ({
                'م': record.serialNumber || '',
                'تاريخ المنع': record.banDate ? Utils.formatDate(record.banDate) : '',
                'المصنع': record.factory || '',
                'الموقع': record.location || '',
                'الاسم رباعي': record.fullName || '',
                'رقم البطاقة': record.idNumber || '',
                'الوظيفة': record.job || '',
                'الشركة - المقاول': record.contractor || '',
                'الإدارة': record.department || '',
                'القائم بالمنع': record.bannedBy || '',
                'محرر البيانات': record.editor || '',
                'سبب المنع': record.banReason || '',
                'ملاحظات': record.notes || '',
                'تاريخ الإنشاء': record.createdAt ? Utils.formatDateTime(record.createdAt) : '',
                'تاريخ آخر تحديث': record.updatedAt ? Utils.formatDateTime(record.updatedAt) : ''
            }));

            // إنشاء workbook
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(excelData);

            // تحديد عرض الأعمدة
            const columnWidths = [
                { wch: 8 },   // م
                { wch: 12 },  // تاريخ المنع
                { wch: 15 },  // المصنع
                { wch: 15 },  // الموقع
                { wch: 25 },  // الاسم رباعي
                { wch: 15 },  // رقم البطاقة
                { wch: 20 },  // الوظيفة
                { wch: 20 },  // الشركة - المقاول
                { wch: 15 },  // الإدارة
                { wch: 20 },  // القائم بالمنع
                { wch: 20 },  // محرر البيانات
                { wch: 40 },  // سبب المنع
                { wch: 40 },  // ملاحظات
                { wch: 18 },  // تاريخ الإنشاء
                { wch: 18 }   // تاريخ آخر تحديث
            ];
            worksheet['!cols'] = columnWidths;

            // إضافة ورقة العمل إلى الكتاب
            XLSX.utils.book_append_sheet(workbook, worksheet, 'قائمة الممنوعين');

            // حفظ الملف
            const date = new Date().toISOString().slice(0, 10);
            const fileName = `قائمة_الممنوعين_من_الدخول_${date}.xlsx`;
            XLSX.writeFile(workbook, fileName);

            Loading.hide();
            Notification.success('تم تصدير البيانات إلى Excel بنجاح');
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في تصدير Excel:', error);
            Notification.error('فشل في تصدير Excel: ' + error.message);
        }
    },
    // ===== دوال التنسيق الموحدة لمديول المخالفات طبقاً لـ ISO 45001 =====

    /**
     * تحويل روابط Google Drive إلى روابط صور قابلة للعرض والطباعة
     */
    convertGoogleDriveLinkToPrintable(link) {
        if (!link) return '';
        if (typeof window.__convertGoogleDriveUrl === 'function') {
            link = window.__convertGoogleDriveUrl(link);
        }
        if (link.startsWith('data:image/')) {
            return link;
        }
        if (link.includes('drive.google.com/thumbnail')) {
            return link;
        }
        const fileIdMatch = link.match(/\/d\/([a-zA-Z0-9_-]+)/) || link.match(/id=([a-zA-Z0-9_-]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
            return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w800`;
        }
        return link;
    },

    /**
     * الأنماط والقواعد المشتركة لطباعة وتصدير جميع نماذج وتقارير المخالفات (ISO 45001)
     */
    getIsoPrintCommonStyles(isLandscape = false) {
        return `
            :root {
                --brand-primary: #991b1b;
                --brand-navy: #0f172a;
                --brand-green: #047857;
                --brand-red: #b91c1c;
                --brand-amber: #d97706;
                --border-color: #cbd5e1;
            }
            * {
                box-sizing: border-box;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            body {
                font-family: 'Cairo', system-ui, -apple-system, sans-serif;
                margin: 0;
                padding: 0;
                background: #f8fafc;
                color: #0f172a;
                line-height: 1.5;
                direction: rtl;
            }
            .no-print-bar {
                position: sticky;
                top: 0;
                z-index: 9999;
                background: #0f172a;
                color: #ffffff;
                padding: 12px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
                border-bottom: 3px solid #dc2626;
            }
            .no-print-bar .brand-badge {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .no-print-bar .pill-tag {
                background: #dc2626;
                color: #ffffff;
                padding: 4px 10px;
                border-radius: 6px;
                font-weight: 800;
                font-size: 11px;
                letter-spacing: 0.5px;
            }
            .no-print-bar .title-text {
                font-size: 13.5px;
                font-weight: 800;
            }
            .no-print-bar .action-buttons {
                display: flex;
                gap: 10px;
                align-items: center;
            }
            .btn-direct-download {
                padding: 8px 18px;
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(5,150,105,0.35);
            }
            .btn-direct-download:hover { background: #047857; }
            .btn-print {
                padding: 8px 18px;
                background: #2563eb;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(37,99,235,0.4);
            }
            .btn-print:hover { background: #1d4ed8; }
            .btn-close {
                padding: 8px 16px;
                background: #475569;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
            }
            .btn-close:hover { background: #334155; }

            .report-page-container {
                max-width: ${isLandscape ? '1180px' : '920px'};
                margin: 22px auto 40px auto;
                background: #ffffff;
                padding: 12px 16px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
                border: 1px solid #e2e8f0;
            }
            .report-page {
                box-sizing: border-box;
                width: 100%;
                min-height: ${isLandscape ? '740px' : '1080px'};
                padding: 16px 20px;
                background: #ffffff;
                page-break-after: always;
                break-after: page;
            }
            .report-page:last-child {
                page-break-after: auto;
                break-after: auto;
            }

            .iso-print-header {
                display: grid;
                grid-template-columns: 240px 1fr 210px;
                border: 2px solid #0f172a;
                border-top: 5px solid #991b1b;
                border-radius: 8px;
                overflow: hidden;
                background: #ffffff;
                margin-bottom: 14px;
            }
            .iso-box-brand {
                padding: 10px 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-left: 1.5px solid #0f172a;
                background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                gap: 4px;
                text-align: center;
            }
            .iso-print-logo {
                max-height: 46px;
                max-width: 130px;
                object-fit: contain;
                margin-bottom: 2px;
            }
            .iso-company-title {
                font-size: 10.5px;
                font-weight: 900;
                color: #0f172a;
                line-height: 1.3;
            }
            .iso-dept-title {
                font-size: 9.5px;
                font-weight: 800;
                color: #991b1b;
                line-height: 1.25;
            }

            .iso-box-title {
                padding: 10px 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                background: #ffffff;
            }
            .iso-main-title {
                margin: 0;
                font-size: 15.5px;
                font-weight: 900;
                color: #991b1b;
                line-height: 1.3;
            }
            .iso-sub-title {
                font-size: 10px;
                font-weight: 700;
                color: #475569;
                margin-top: 3px;
            }
            .iso-badge-std {
                display: inline-block;
                margin-top: 5px;
                background: #fef2f2;
                color: #b91c1c;
                border: 1px solid #fecaca;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 9px;
                font-weight: 800;
            }

            .iso-box-meta {
                padding: 8px 12px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-right: 1.5px solid #0f172a;
                background: #f8fafc;
                gap: 3px;
            }
            .meta-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px dashed #cbd5e1;
                padding-bottom: 2px;
                font-size: 10px;
            }
            .meta-row:last-child { border-bottom: none; }
            .meta-row span { color: #64748b; font-weight: 700; }
            .meta-row strong { color: #0f172a; font-family: monospace, inherit; font-size: 10px; }

            .summary-cards-row {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 14px;
            }
            .kpi-stat-card {
                flex: 1 1 140px;
                padding: 10px 12px;
                border-radius: 8px;
                border: 1.5px solid #cbd5e1;
                background: #f8fafc;
            }
            .kpi-stat-card.accent-red { background: #fef2f2; border-color: #fecaca; }
            .kpi-stat-card.accent-blue { background: #eff6ff; border-color: #bfdbfe; }
            .kpi-stat-card.accent-amber { background: #fffbeb; border-color: #fde68a; }
            .kpi-stat-card.accent-green { background: #ecfdf5; border-color: #a7f3d0; }
            .kpi-card-label {
                font-size: 10px;
                font-weight: 700;
                color: #64748b;
                margin-bottom: 4px;
            }
            .kpi-card-value {
                font-size: 18px;
                font-weight: 900;
                color: #0f172a;
                line-height: 1.1;
            }

            .info-section-block {
                border: 1.5px solid #cbd5e1;
                border-radius: 8px;
                margin-bottom: 12px;
                overflow: hidden;
                background: #ffffff;
                page-break-inside: avoid;
            }
            .info-section-header {
                background: #f1f5f9;
                color: #0f172a;
                font-size: 11px;
                font-weight: 900;
                padding: 6px 12px;
                border-bottom: 1.5px solid #cbd5e1;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .info-section-header i { color: #991b1b; }
            .info-grid-2 {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            .info-grid-4 {
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
            }
            .info-cell {
                padding: 6px 10px;
                border-bottom: 1px solid #e2e8f0;
                border-left: 1px solid #e2e8f0;
            }
            .info-cell-wide {
                grid-column: 1 / -1;
            }
            .info-cell-label {
                font-size: 9.5px;
                color: #64748b;
                font-weight: 700;
                margin-bottom: 2px;
                display: block;
            }
            .info-cell-value {
                font-size: 11px;
                font-weight: 800;
                color: #0f172a;
                line-height: 1.35;
                word-break: normal;
                overflow-wrap: break-word;
            }
            .info-cell-value.danger { color: #b91c1c; }
            .info-cell-value.success { color: #047857; }
            .info-cell-value.money { color: #166534; font-size: 13px; font-weight: 900; }

            .iso-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 8px;
                margin-bottom: 12px;
                font-size: 10.5px;
            }
            .iso-table th {
                background: #991b1b;
                color: #ffffff;
                padding: 7px 6px;
                font-weight: 800;
                border: 1px solid #7f1d1d;
                text-align: center;
            }
            .iso-table td {
                padding: 6px 6px;
                border: 1px solid #cbd5e1;
                text-align: center;
                color: #0f172a;
            }
            .iso-table tr:nth-child(even) td {
                background: #fef2f2;
            }

            .signatures-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin-top: 14px;
                page-break-inside: avoid;
            }
            .sig-card {
                border: 1.5px solid #cbd5e1;
                border-radius: 6px;
                padding: 8px 10px;
                background: #f8fafc;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 90px;
            }
            .sig-card-title {
                font-size: 10px;
                font-weight: 800;
                color: #991b1b;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 3px;
                margin-bottom: 4px;
                text-align: center;
            }
            .sig-card-name {
                font-size: 10px;
                font-weight: 800;
                color: #0f172a;
                text-align: center;
            }
            .sig-line-area {
                margin-top: 14px;
                border-top: 1.5px dashed #64748b;
                padding-top: 3px;
                text-align: center;
                font-size: 8.5px;
                color: #64748b;
                font-weight: 700;
            }

            .iso-footer-strip {
                margin-top: 14px;
                border: 1.5px solid #0f172a;
                border-radius: 6px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: nowrap;
                white-space: nowrap;
                gap: 8px;
                padding: 5px 12px;
                background: #f8fafc;
                font-size: 8.5px;
                font-weight: 800;
                color: #334155;
                page-break-inside: avoid;
            }
            .iso-footer-strip span {
                white-space: nowrap;
                display: inline-flex;
                align-items: center;
                gap: 3px;
                flex-shrink: 0;
            }
            .iso-footer-strip span strong {
                color: #0f172a;
                font-family: monospace, inherit;
                white-space: nowrap;
            }
            .portal-unified-footer {
                margin-top: 8px;
                text-align: center;
                font-size: 8.5px;
                color: #64748b;
                line-height: 1.45;
                page-break-inside: avoid;
            }
            .portal-unified-footer strong {
                color: #991b1b;
                font-weight: 800;
            }
            .page-counter-footer {
                text-align: center;
                font-size: 9px;
                font-weight: 700;
                color: #64748b;
                margin-top: 6px;
            }

            @media print {
                body {
                    background: #ffffff !important;
                    padding: 0 !important;
                }
                .no-print-bar {
                    display: none !important;
                }
                .report-page-container {
                    max-width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    border: none !important;
                    box-shadow: none !important;
                }
                .report-page {
                    min-height: auto !important;
                    padding: 4mm 6mm !important;
                    page-break-after: always !important;
                    break-after: page !important;
                }
                .report-page:last-child {
                    page-break-after: auto !important;
                    break-after: auto !important;
                }
                @page {
                    size: ${isLandscape ? 'A4 landscape' : 'A4 portrait'};
                    margin: 8mm 10mm 8mm 10mm;
                }
            }
        `;
    },

    /**
     * ترويسة ISO 45001 المعتمدة لجميع نماذج وتقارير المخالفات
     */
    getIsoPrintHeaderHtml(title, subtitle, docCode, revision = 'Rev. 03', classification = 'سري وداخلي') {
        let logoSrc = '/icons/icapp-logo.png';
        if (typeof window !== 'undefined' && window.location) {
            if (window.location.protocol === 'file:') {
                logoSrc = 'icons/icapp-logo.png';
            } else if (window.location.origin && window.location.origin !== 'null') {
                logoSrc = `${window.location.origin}/icons/icapp-logo.png`;
            }
        }
        if (typeof AppState !== 'undefined' && (AppState.companyLogo || AppState.companySettings?.logo)) {
            const configuredLogo = AppState.companyLogo || AppState.companySettings?.logo;
            if (configuredLogo) logoSrc = this.convertGoogleDriveLinkToPrintable(configuredLogo);
        }
        const logoFallback = 'icons/icon-192x192.png';
        const now = new Date();
        const releaseDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

        return `
            <div class="iso-print-header">
                <div class="iso-box-brand">
                    <img src="${logoSrc}" alt="شعار ICAPP" class="iso-print-logo" onerror="this.onerror=null; this.src='${logoFallback}';">
                    <div class="iso-company-title">الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP)</div>
                    <div class="iso-dept-title">إدارة السلامة والصحة المهنية والبيئة</div>
                </div>

                <div class="iso-box-title">
                    <h1 class="iso-main-title">${Utils.escapeHTML(title)}</h1>
                    <div class="iso-sub-title">${Utils.escapeHTML(subtitle)}</div>
                    <div class="iso-badge-std">معتمد طبقاً للمواصفة ISO 45001:2018 & ISO 9001:2015</div>
                </div>

                <div class="iso-box-meta">
                    <div class="meta-row">
                        <span>كود الوثيقة:</span>
                        <strong>${Utils.escapeHTML(docCode)}</strong>
                    </div>
                    <div class="meta-row">
                        <span>رقم الإصدار:</span>
                        <strong>${Utils.escapeHTML(revision)}</strong>
                    </div>
                    <div class="meta-row">
                        <span>تاريخ الاعتماد:</span>
                        <strong>${releaseDate}</strong>
                    </div>
                    <div class="meta-row">
                        <span>درجة السرية:</span>
                        <strong style="color: #047857;">${Utils.escapeHTML(classification)}</strong>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * تذييل ISO 45001 المعتمد لجميع نماذج وتقارير المخالفات
     */
    getIsoPrintFooterHtml(docCode, revision = 'Rev. 03', standard = 'ISO 45001:2018 (Clause 10.2)') {
        // اختصار مرجعية التوثيق لتكون في سطر واحد دون إطالة تسبب نزول النص للأسفل
        let cleanStandard = String(standard || 'ISO 45001:2018 (Clause 10.2)').trim();
        cleanStandard = cleanStandard
            .replace(/\(Clause\s+([\d.\s&,]+)[^)]*\)/i, '(Clause $1)')
            .replace(/\s{2,}/g, ' ');

        return `
            <div class="iso-footer-strip" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; white-space: nowrap; gap: 8px;">
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">كود الوثيقة: <strong style="white-space: nowrap;">${Utils.escapeHTML(docCode)}</strong></span>
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">رقم الإصدار: <strong style="white-space: nowrap;">${Utils.escapeHTML(revision)}</strong></span>
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">مرجعية التوثيق: <strong dir="ltr" style="white-space: nowrap;">${Utils.escapeHTML(cleanStandard)}</strong></span>
                <span style="white-space: nowrap; display: inline-flex; align-items: center; gap: 3px; flex-shrink: 0;">نظام الجودة: <strong style="white-space: nowrap;">ICAPP HSE MS</strong></span>
            </div>
            <footer class="portal-unified-footer">
                <div><strong>الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP)</strong> • منظومة إدارة السلامة والصحة المهنية المتكاملة © 2026</div>
                <div>وثيقة رسمية معتمدة صادرة إلكترونياً من البوابة الرقمية للسلامة والصحة المهنية (ICAPP SafetyHub) • صالحة للتدقيق والمراجعة الإدارية والقانونية</div>
            </footer>
        `;
    },

    /**
     * فتح نافذة معاينة وطباعة النموذج بنظام A4 مع شريط تحكم علوي يتيح التحميل المباشر والطباعة
     */
    openIsoPrintWindow(title, htmlBody, isLandscape = false, customStyle = '', directDownloadFileName = '') {
        const safeDlName = directDownloadFileName || `${String(title).replace(/[^\w\u0600-\u06FF.-]/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
        const fullHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Utils.escapeHTML(title)} — الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        ${this.getIsoPrintCommonStyles(isLandscape)}
        ${customStyle}
    </style>
</head>
<body>
    <div class="no-print-bar">
        <div class="brand-badge">
            <span class="pill-tag">ICAPP SAFETY HUB</span>
            <span class="title-text">${Utils.escapeHTML(title)}</span>
        </div>
        <div class="action-buttons">
            <button class="btn-direct-download" id="dl-pdf-top-btn" onclick="directDownloadReportPdf()">
                <i class="fas fa-file-arrow-down"></i> تحميل التقرير (PDF)
            </button>
            <button class="btn-print" onclick="window.print()">
                <i class="fas fa-print"></i> طباعة المستند
            </button>
            <button class="btn-close" onclick="window.close()">
                <i class="fas fa-times"></i> إغلاق
            </button>
        </div>
    </div>
    <div class="report-page-container">
        ${htmlBody}
    </div>
    <script>
        async function directDownloadReportPdf() {
            var btn = document.getElementById('dl-pdf-top-btn');
            var originalText = btn ? btn.innerHTML : '';
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
            }
            try {
                if (window.opener && window.opener.Utils && typeof window.opener.Utils.downloadHtmlAsPdf === 'function') {
                    var container = document.querySelector('.report-page-container');
                    var targetHtml = container ? container.outerHTML : document.body.innerHTML;
                    var ok = await window.opener.Utils.downloadHtmlAsPdf(targetHtml, ${JSON.stringify(safeDlName)}, {
                        landscape: ${isLandscape ? 'true' : 'false'},
                        title: ${JSON.stringify(title)}
                    });
                    if (ok) {
                        if (btn) {
                            btn.disabled = false;
                            btn.innerHTML = '<i class="fas fa-check"></i> تم التحميل!';
                            setTimeout(function() { btn.innerHTML = originalText; }, 2500);
                        }
                        return;
                    }
                }
                window.print();
            } catch (err) {
                console.warn('Direct PDF download error, fallback to print:', err);
                window.print();
            } finally {
                if (btn) {
                    btn.disabled = false;
                    setTimeout(function() { btn.innerHTML = originalText; }, 2500);
                }
            }
        }
    </script>
</body>
</html>`;

        const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');
        if (!printWindow) {
            Notification.error('يرجى السماح بالنوافذ المنبثقة لمعاينة التقرير');
            return false;
        }
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 15000);
        return true;
    },

    /**
     * تحميل تقرير ISO 45001 كملف PDF مباشرة دون إجبار المستخدم على وضع الطباعة
     */
    async downloadIsoReportAsPdf(title, htmlBody, fileName = '', isLandscape = false, customStyle = '') {
        const docFileName = fileName || `${String(title).replace(/[^\w\u0600-\u06FF.-]/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
        const fullHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Utils.escapeHTML(title)} — الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        ${this.getIsoPrintCommonStyles(isLandscape)}
        ${customStyle}
    </style>
</head>
<body>
    <div class="report-page-container">
        ${htmlBody}
    </div>
</body>
</html>`;

        if (typeof Utils !== 'undefined' && typeof Utils.downloadHtmlAsPdf === 'function') {
            try {
                const downloaded = await Utils.downloadHtmlAsPdf(fullHtml, docFileName, {
                    landscape: isLandscape,
                    title
                });
                if (downloaded) {
                    Notification.success(`تم تحميل ملف PDF بنجاح: ${docFileName}`);
                    return true;
                }
            } catch (err) {
                Utils.safeWarn('فشل التحميل المباشر لتقرير المخالفات:', err);
            }
        }

        // في حال تعذر التصدير المباشر يتم فتح نافذة المعاينة والطباعة
        return this.openIsoPrintWindow(title, htmlBody, isLandscape, customStyle, docFileName);
    },

    /**
     * تقسيم مصفوفة سجلات إلى صفحات لمنع تراكم المحتوى والصفحات البيضاء
     */
    _paginateViolationsList(items, firstPageLimit = 8, subsequentLimit = 12) {
        if (!items || items.length === 0) return [];
        const pages = [];
        const copy = [...items];
        pages.push(copy.splice(0, firstPageLimit));
        while (copy.length > 0) {
            pages.push(copy.splice(0, subsequentLimit));
        }
        return pages;
    },

    /**
     * نافذة حوار تصدير السجل العام للمخالفات مع فلاتر كاملة (ISO 45001)
     */
    showAllViolationsReportDialog(defaultPersonType = '') {
        const existing = document.getElementById('all-violations-report-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'all-violations-report-modal';

        const now = new Date();
        const monthOptions = [];
        for (let i = 0; i < 12; i++) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            const label = d.toLocaleDateString('ar-SA-u-nu-latn', { year: 'numeric', month: 'long' });
            monthOptions.push(`<option value="${val}"${i === 0 ? ' selected' : ''}>${label}</option>`);
        }

        modal.innerHTML = `
            <div class="modal-content" style="max-width: 540px;">
                <div class="modal-header" style="background: linear-gradient(135deg, #991b1b, #7f1d1d); color: white;">
                    <h3 class="text-lg font-bold flex items-center gap-2">
                        <i class="fas fa-file-pdf"></i>
                        تصدير سجل المخالفات العام (ISO 45001)
                    </h3>
                    <button type="button" class="modal-close text-white hover:text-gray-200" data-action="close">&times;</button>
                </div>
                <div class="modal-body p-6 space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">نطاق المخالفات المطلوب تضمينها:</label>
                        <select id="all-viol-scope-select" class="form-input w-full">
                            <option value="all"${!defaultPersonType ? ' selected' : ''}>جميع المخالفات (موظفين + مقاولين)</option>
                            <option value="employee"${defaultPersonType === 'employee' ? ' selected' : ''}>مخالفات الموظفين فقط</option>
                            <option value="contractor"${defaultPersonType === 'contractor' ? ' selected' : ''}>مخالفات المقاولين فقط</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">نطاق الفترة الزمنية:</label>
                        <div class="space-y-2">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="all-viol-range-type" value="all" checked>
                                <span>جميع السجلات المسجلة</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="all-viol-range-type" value="month">
                                <span>شهر محدد</span>
                            </label>
                            <div class="mr-6">
                                <select id="all-viol-month-select" class="form-input w-full text-sm" disabled>
                                    ${monthOptions.join('')}
                                </select>
                            </div>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="all-viol-range-type" value="custom">
                                <span>فترة مخصصة (من / إلى)</span>
                            </label>
                            <div class="mr-6 grid grid-cols-2 gap-2">
                                <div>
                                    <label class="block text-xs text-gray-600 mb-1">من تاريخ:</label>
                                    <input type="date" id="all-viol-from-date" class="form-input w-full text-sm" disabled>
                                </div>
                                <div>
                                    <label class="block text-xs text-gray-600 mb-1">إلى تاريخ:</label>
                                    <input type="date" id="all-viol-to-date" class="form-input w-full text-sm" disabled>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">درجة الشدة:</label>
                            <select id="all-viol-severity-select" class="form-input w-full text-sm">
                                <option value="">الكل (جميع الدرجات)</option>
                                <option value="عالية">عالية فقط</option>
                                <option value="متوسطة">متوسطة فقط</option>
                                <option value="منخفضة">منخفضة فقط</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">حالة المعالجة:</label>
                            <select id="all-viol-status-select" class="form-input w-full text-sm">
                                <option value="">الكل (جميع الحالات)</option>
                                <option value="محلول">محلول فقط</option>
                                <option value="قيد المراجعة">قيد المراجعة فقط</option>
                                <option value="مفتوح">غير محلول / مفتوح</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">صيغة الإخراج والتصدير:</label>
                        <div class="flex items-center gap-6">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="all-viol-format" value="pdf" checked>
                                <span class="font-medium text-red-700"><i class="fas fa-file-pdf ml-1"></i>PDF معتمد ISO</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="all-viol-format" value="excel">
                                <span class="font-medium text-green-700"><i class="fas fa-file-excel ml-1"></i>Excel (.xlsx)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="modal-footer flex items-center justify-between p-4 bg-gray-50 border-t">
                    <button type="button" class="btn-secondary" data-action="close">إلغاء</button>
                    <div class="flex items-center gap-2">
                        <button type="button" class="btn-primary" id="all-viol-preview-btn" style="background: linear-gradient(135deg, #1e3a8a, #0f172a);">
                            <i class="fas fa-eye ml-1"></i>
                            معاينة وطباعة
                        </button>
                        <button type="button" class="btn-primary" id="all-viol-generate-btn" style="background: linear-gradient(135deg, #059669, #047857);">
                            <i class="fas fa-file-download ml-1"></i>
                            تحميل مباشر
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const close = () => modal.remove();
        modal.querySelector('.modal-close')?.addEventListener('click', close);
        modal.querySelector('[data-action="close"]')?.addEventListener('click', close);
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

        const rangeRadios = modal.querySelectorAll('input[name="all-viol-range-type"]');
        const monthSelect = modal.querySelector('#all-viol-month-select');
        const fromInput = modal.querySelector('#all-viol-from-date');
        const toInput = modal.querySelector('#all-viol-to-date');

        const updateRangeState = () => {
            const val = modal.querySelector('input[name="all-viol-range-type"]:checked')?.value || 'all';
            monthSelect.disabled = val !== 'month';
            fromInput.disabled = val !== 'custom';
            toInput.disabled = val !== 'custom';
        };
        rangeRadios.forEach(r => r.addEventListener('change', updateRangeState));

        const handleExport = async (isDirectDownload) => {
            const scope = modal.querySelector('#all-viol-scope-select')?.value || 'all';
            const rangeType = modal.querySelector('input[name="all-viol-range-type"]:checked')?.value || 'all';
            const month = monthSelect?.value || '';
            const fromDate = fromInput?.value || '';
            const toDate = toInput?.value || '';
            const severity = modal.querySelector('#all-viol-severity-select')?.value || '';
            const status = modal.querySelector('#all-viol-status-select')?.value || '';
            const exportFormat = modal.querySelector('input[name="all-viol-format"]:checked')?.value || 'pdf';

            if (rangeType === 'custom') {
                if (!fromDate || !toDate) {
                    Notification.warning('يرجى تحديد تاريخ البداية وتاريخ النهاية');
                    return;
                }
                if (new Date(fromDate) > new Date(toDate)) {
                    Notification.warning('تاريخ البداية يجب أن يكون قبل تاريخ النهاية');
                    return;
                }
            }

            close();
            await this.generateAllViolationsReport({
                personType: scope,
                dateRangeType: rangeType,
                month,
                fromDate,
                toDate,
                severity,
                status,
                exportFormat,
                directDownload: isDirectDownload
            });
        };

        modal.querySelector('#all-viol-preview-btn')?.addEventListener('click', () => handleExport(false));
        modal.querySelector('#all-viol-generate-btn')?.addEventListener('click', () => handleExport(true));
    },

    /**
     * إنشاء تقرير السجل العام لمخالفات السلامة والصحة المهنية (ISO 45001)
     */
    async generateAllViolationsReport(filters = {}) {
        const {
            personType = 'all',
            dateRangeType = 'all',
            month = '',
            fromDate = '',
            toDate = '',
            severity = '',
            status = '',
            exportFormat = 'pdf',
            directDownload = true
        } = filters;

        try {
            Loading.show('جاري استخراج وتجميع بيانات المخالفات...');

            let records = (AppState.appData?.violations || [])
                .map(v => this.normalizeViolationRecord(v))
                .filter(Boolean);

            // تصفية حسب الشخص
            if (personType === 'employee') {
                records = records.filter(v => v.employeeName || v.personType === 'employee' || (!v.contractorName && v.employeeName));
            } else if (personType === 'contractor') {
                records = records.filter(v => v.contractorName || v.contractorCode || v.contractorId || v.personType === 'contractor');
            }

            // تصفية حسب الفترة
            let periodText = 'كافة السجلات المسجلة بالمنظومة';
            if (dateRangeType === 'month' && month) {
                const [y, m] = month.split('-');
                records = records.filter(v => {
                    if (!v.violationDate) return false;
                    const d = new Date(v.violationDate);
                    return d.getFullYear() === parseInt(y, 10) && (d.getMonth() + 1) === parseInt(m, 10);
                });
                const dObj = new Date(parseInt(y, 10), parseInt(m, 10) - 1, 1);
                periodText = dObj.toLocaleDateString('ar-SA-u-nu-latn', { year: 'numeric', month: 'long' });
            } else if (dateRangeType === 'custom' && fromDate && toDate) {
                const start = new Date(fromDate); start.setHours(0,0,0,0);
                const end = new Date(toDate); end.setHours(23,59,59,999);
                records = records.filter(v => {
                    if (!v.violationDate) return false;
                    const d = new Date(v.violationDate);
                    return d >= start && d <= end;
                });
                periodText = `من ${Utils.formatDate(fromDate)} إلى ${Utils.formatDate(toDate)}`;
            }

            // تصفية حسب الشدة
            if (severity) {
                records = records.filter(v => String(v.severity || '').trim() === severity);
            }

            // تصفية حسب الحالة
            if (status) {
                if (status === 'مفتوح') {
                    records = records.filter(v => String(v.status || '').trim() !== 'محلول');
                } else {
                    records = records.filter(v => String(v.status || '').trim() === status);
                }
            }

            if (records.length === 0) {
                Loading.hide();
                Notification.warning('لا توجد مخالفات مسجلة تطابق محددات التصفية المختارة');
                return;
            }

            // ترتيب السجلات تنازلياً حسب التاريخ
            records.sort((a, b) => new Date(b.violationDate || 0) - new Date(a.violationDate || 0));

            // تحديد اسم التقرير
            const scopeTitle = personType === 'employee' ? 'مخالفات الموظفين' : personType === 'contractor' ? 'مخالفات المقاولين' : 'السجل العام للمخالفات';
            const reportTitle = `سجل ${scopeTitle} وإجراءات التصحيح`;

            if (exportFormat === 'excel') {
                this.exportAllViolationsToExcel_(records, scopeTitle, periodText);
                Loading.hide();
                return;
            }

            // إحصائيات المؤشرات
            const totalCount = records.length;
            const highCount = records.filter(v => String(v.severity || '').trim() === 'عالية').length;
            const medCount = records.filter(v => String(v.severity || '').trim() === 'متوسطة').length;
            const lowCount = records.filter(v => String(v.severity || '').trim() === 'منخفضة').length;
            const resolvedCount = records.filter(v => String(v.status || '').trim() === 'محلول').length;
            const openCount = totalCount - resolvedCount;
            const resolutionRate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;
            const totalFines = records.reduce((sum, v) => sum + (Number(this.getEffectiveFineAmount(v)) || 0), 0);

            // تقسيم الصفحات بنظام .report-page landscape
            const pagesData = this._paginateViolationsList(records, 8, 11);
            const totalPages = pagesData.length;

            const pagesHtml = pagesData.map((pageRecords, pageIdx) => {
                const pageNum = pageIdx + 1;
                const isFirstPage = pageNum === 1;
                const isLastPage = pageNum === totalPages;

                const rowsHtml = pageRecords.map((v, rIdx) => {
                    const globalIdx = (pageIdx === 0 ? 0 : 8 + (pageIdx - 1) * 11) + rIdx + 1;
                    const isCon = v.personType === 'contractor' || !!v.contractorName;
                    const subjectName = isCon ? (v.contractorName || v.contractorWorker || 'مقاول') : (v.employeeName || 'موظف');
                    const fineVal = Number(this.getEffectiveFineAmount(v)) || 0;

                    return `
                        <tr>
                            <td style="font-weight: 700;">${globalIdx}</td>
                            <td style="font-weight: 800; text-align: right;">
                                <i class="fas ${isCon ? 'fa-hard-hat text-amber-600' : 'fa-user-tie text-blue-600'} ml-1"></i>
                                ${Utils.escapeHTML(subjectName)}
                            </td>
                            <td style="font-size: 9.5px;">${isCon ? 'مقاول' : 'موظف'}</td>
                            <td style="font-size: 9.5px;">${Utils.escapeHTML(v.violationLocation || '-')}</td>
                            <td style="font-weight: 700; text-align: right;">${Utils.escapeHTML(v.violationType || '-')}</td>
                            <td>${v.violationDate ? Utils.formatDate(v.violationDate) : '-'}</td>
                            <td>
                                <span style="font-weight: 800; color: ${v.severity === 'عالية' ? '#b91c1c' : v.severity === 'متوسطة' ? '#d97706' : '#2563eb'};">
                                    ${Utils.escapeHTML(v.severity || '-')}
                                </span>
                            </td>
                            <td style="font-weight: 800; color: #166534;">${this.formatFineAmount(fineVal)}</td>
                            <td style="text-align: right; font-size: 9.5px; line-height: 1.35; white-space: normal; word-break: break-word;">${Utils.escapeHTML(v.actionTaken || '-')}</td>
                            <td>
                                <span style="font-weight: 800; color: ${v.status === 'محلول' ? '#047857' : '#b91c1c'};">
                                    ${Utils.escapeHTML(v.status || '-')}
                                </span>
                            </td>
                        </tr>
                    `;
                }).join('');

                return `
                    <div class="report-page landscape">
                        ${this.getIsoPrintHeaderHtml(
                            reportTitle,
                            isFirstPage ? 'سجل رسمي موثق لحالات عدم المطابقة والإجراءات التصحيحية الميدانية' : `تابع جدول ${reportTitle} — استكمال البيانات`,
                            'DOC-HSE-VIO-REG-01',
                            'Rev. 03',
                            'سري وداخلي'
                        )}

                        ${isFirstPage ? `
                            <div style="display: flex; justify-content: space-between; align-items: center; background: #fff7ed; border-right: 4px solid #ea580c; border-radius: 6px; padding: 6px 12px; margin-bottom: 10px; font-size: 11px;">
                                <div><strong style="color: #9a3412;">نطاق التقرير والفترة:</strong> <span style="color: #0f172a; font-weight: 700;">${Utils.escapeHTML(periodText)}</span></div>
                                <div><strong style="color: #9a3412;">تاريخ التصدير:</strong> ${Utils.formatDate(new Date())}</div>
                            </div>

                            <div class="summary-cards-row">
                                <div class="kpi-stat-card accent-red">
                                    <div class="kpi-card-label">إجمالي المخالفات</div>
                                    <div class="kpi-card-value" style="color: #991b1b;">${totalCount}</div>
                                </div>
                                <div class="kpi-stat-card accent-amber">
                                    <div class="kpi-card-label">الشدة (عالية / متوسطة / منخفضة)</div>
                                    <div class="kpi-card-value" style="color: #92400e; font-size: 15px;">${highCount} / ${medCount} / ${lowCount}</div>
                                </div>
                                <div class="kpi-stat-card accent-green">
                                    <div class="kpi-card-label">معدل الحل والإغلاق</div>
                                    <div class="kpi-card-value" style="color: #065f46;">${resolutionRate}% <small style="font-size: 11px; font-weight: 700;">(${resolvedCount} محلول / ${openCount} مفتوح)</small></div>
                                </div>
                                <div class="kpi-stat-card accent-blue">
                                    <div class="kpi-card-label">إجمالي الغرامات المالية</div>
                                    <div class="kpi-card-value" style="color: #1e3a8a; font-size: 16px;">${this.formatFineAmount(totalFines)}</div>
                                </div>
                            </div>
                        ` : ''}

                        <table class="iso-table">
                            <thead>
                                <tr>
                                    <th style="width: 32px;">#</th>
                                    <th>اسم المخالف</th>
                                    <th style="width: 65px;">الصفة</th>
                                    <th>الموقع / المصنع</th>
                                    <th>نوع المخالفة</th>
                                    <th style="width: 75px;">التاريخ</th>
                                    <th style="width: 60px;">الشدة</th>
                                    <th style="width: 85px;">الغرامة</th>
                                    <th>الإجراء المتخذ</th>
                                    <th style="width: 65px;">الحالة</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>

                        ${isLastPage ? `
                            <div class="signatures-grid">
                                <div class="sig-card">
                                    <div class="sig-card-title">مسؤول الرصد الميداني وإدخال البيانات</div>
                                    <div class="sig-card-name">مشرف السلامة والصحة المهنية</div>
                                    <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">المراجعة والتدقيق الإداري</div>
                                    <div class="sig-card-name">رئيس قسم السلامة والصحة المهنية</div>
                                    <div class="sig-line-area">الاسم والتوقيع: ............................</div>
                                </div>
                                <div class="sig-card">
                                    <div class="sig-card-title">الاعتماد الرسمي</div>
                                    <div class="sig-card-name">مدير إدارة السلامة والصحة المهنية والبيئة</div>
                                    <div class="sig-line-area">الاعتماد والختم: ............................</div>
                                </div>
                            </div>

                            ${this.getIsoPrintFooterHtml('DOC-HSE-VIO-REG-01', 'Rev. 03', 'ISO 45001:2018 (Clause 9.1 & 10.2)')}
                        ` : ''}

                        <div class="page-counter-footer">صفحة ${pageNum} من ${totalPages}</div>
                    </div>
                `;
            }).join('');

            Loading.hide();

            const fileName = `${String(reportTitle).replace(/[^\w\u0600-\u06FF.-]/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;

            if (directDownload) {
                await this.downloadIsoReportAsPdf(reportTitle, pagesHtml, fileName, true);
            } else {
                this.openIsoPrintWindow(reportTitle, pagesHtml, true, '', fileName);
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في استخراج تقرير سجل المخالفات:', error);
            Notification.error('فشل إنشاء تقرير سجل المخالفات: ' + error.message);
        }
    },

    /**
     * تصدير سجل المخالفات إلى ملف Excel متعدد الأوراق:
     * ورقة 1: سجل المخالفات التفصيلي مع الأسباب الجذرية ومستوى التكرار (Strike)
     * ورقة 2: ملخص المقاولين مع معدل الإغلاق وتصنيف الخطورة
     * ورقة 3: تحليل الأسباب الجذرية (RCA) مع نسب التكرار
     */
    exportAllViolationsToExcel_(violations, targetName = '', periodInfo = '') {
        if (typeof XLSX === 'undefined') {
            Notification.error('مكتبة Excel غير متوفرة. يرجى تحديث الصفحة والمحاولة ثانية.');
            return false;
        }

        if (!Array.isArray(violations) || violations.length === 0) {
            Notification.warning('لا توجد مخالفات لتصديرها');
            return false;
        }

        // 1. ورقة سجل المخالفات التفصيلي
        const excelData = violations.map((v, idx) => {
            const isCon = (v.personType === 'contractor' || !!v.contractorName);
            const hist = this.getPersonViolationHistory(v, v.id);
            const strikeText = hist.totalCount === 0
                ? 'المخالفة الأولى'
                : (hist.totalCount === 1 ? 'مخالفة ثانية (مكرر)' : `تكرار حرج (${hist.totalCount + 1} مخالفات)`);

            return {
                '#': idx + 1,
                'اسم المخالف': v.employeeName || v.contractorWorker || v.contractorName || '',
                'الصفة': isCon ? 'مقاول' : 'موظف',
                'الكود الوظيفي / كود المقاول': v.employeeCode || v.employeeNumber || v.contractorCode || v.contractorId || '',
                'المقاول / جهة العمل': isCon ? (v.contractorName || '') : (v.employeeDepartment || ''),
                'نوع المخالفة': v.violationType || '',
                'السبب الجذري (RCA)': v.rootCause || 'غير محدد',
                'تاريخ المخالفة': v.violationDate ? Utils.formatDate(v.violationDate) : '',
                'وقت المخالفة': v.violationTime || '',
                'المصنع / الموقع': v.violationLocation || '',
                'مكان المخالفة': v.violationPlace || '',
                'درجة الشدة': v.severity || '',
                'القيمة المالية': Number(this.getEffectiveFineAmount(v)) || 0,
                'حالة المخالفة': v.status || '',
                'سجل التكرار (Strike)': strikeText,
                'تسلسل المخالفة بالشهر': v.violationSequenceInMonth || '',
                'الإجراء المتخذ': v.actionTaken || '',
                'تفاصيل المخالفة': v.violationDetails || ''
            };
        });

        // 2. ورقة ملخص المقاولين
        const contractorMap = {};
        violations.forEach(v => {
            const isCon = (v.personType === 'contractor' || !!v.contractorName);
            if (!isCon) return;
            const conName = String(v.contractorName || 'مقاول عام / غير محدد').trim();
            if (!contractorMap[conName]) {
                contractorMap[conName] = {
                    name: conName,
                    total: 0,
                    high: 0,
                    medium: 0,
                    low: 0,
                    unresolved: 0,
                    resolved: 0,
                    fines: 0,
                    rcaCounts: {},
                    typeCounts: {}
                };
            }
            const c = contractorMap[conName];
            c.total++;
            const sev = String(v.severity || '').trim();
            if (sev === 'عالية') c.high++;
            else if (sev === 'متوسطة') c.medium++;
            else if (sev === 'منخفضة') c.low++;

            const st = String(v.status || '').trim();
            if (st === 'محلول') c.resolved++;
            else c.unresolved++;

            c.fines += Number(this.getEffectiveFineAmount(v)) || 0;

            const rca = String(v.rootCause || 'غير محدد').trim();
            c.rcaCounts[rca] = (c.rcaCounts[rca] || 0) + 1;

            const tp = String(v.violationType || 'غير محدد').trim();
            c.typeCounts[tp] = (c.typeCounts[tp] || 0) + 1;
        });

        const contractorSummaryData = Object.values(contractorMap)
            .sort((a, b) => b.total - a.total || b.high - a.high)
            .map((c, idx) => {
                const topRca = Object.entries(c.rcaCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
                const topType = Object.entries(c.typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
                let riskRating = '🟢 منخفض';
                if (c.high >= 2 || c.total >= 5) {
                    riskRating = '🚨 حرج';
                } else if (c.high === 1 || c.total >= 2) {
                    riskRating = '⚠️ متوسط';
                }
                const resolutionRate = c.total > 0 ? `${Math.round((c.resolved / c.total) * 100)}%` : '0%';

                return {
                    '#': idx + 1,
                    'اسم المقاول': c.name,
                    'إجمالي المخالفات': c.total,
                    'عالية الشدة': c.high,
                    'متوسطة الشدة': c.medium,
                    'منخفضة الشدة': c.low,
                    'غير المحلولة': c.unresolved,
                    'معدل الإغلاق': resolutionRate,
                    'إجمالي الغرامات': c.fines,
                    'السبب الجذري الشائع': topRca,
                    'المخالفة الأكثر تكراراً': topType,
                    'تصنيف المخاطر': riskRating
                };
            });

        // 3. ورقة تحليل الأسباب الجذرية (RCA)
        const rcaMap = {};
        violations.forEach(v => {
            const rca = String(v.rootCause || 'غير محدد').trim();
            if (!rcaMap[rca]) {
                rcaMap[rca] = {
                    category: rca,
                    count: 0,
                    high: 0,
                    resolved: 0,
                    unresolved: 0,
                    fines: 0
                };
            }
            const r = rcaMap[rca];
            r.count++;
            if (String(v.severity || '').trim() === 'عالية') r.high++;
            if (String(v.status || '').trim() === 'محلول') r.resolved++;
            else r.unresolved++;
            r.fines += Number(this.getEffectiveFineAmount(v)) || 0;
        });

        const totalV = violations.length || 1;
        const rcaSummaryData = Object.values(rcaMap)
            .sort((a, b) => b.count - a.count)
            .map((r, idx) => ({
                '#': idx + 1,
                'تصنيف السبب الجذري (RCA)': r.category,
                'عدد المخالفات': r.count,
                'النسبة المئوية': `${((r.count / totalV) * 100).toFixed(1)}%`,
                'عالية الشدة': r.high,
                'محلولة': r.resolved,
                'غير محلولة': r.unresolved,
                'إجمالي الغرامات المالية': r.fines
            }));

        const wb = XLSX.utils.book_new();

        // Sheet 1: سجل المخالفات
        const ws1 = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(wb, ws1, 'سجل المخالفات');

        // Sheet 2: ملخص المقاولين
        if (contractorSummaryData.length > 0) {
            const ws2 = XLSX.utils.json_to_sheet(contractorSummaryData);
            XLSX.utils.book_append_sheet(wb, ws2, 'ملخص المقاولين');
        }

        // Sheet 3: تحليل الأسباب الجذرية RCA
        const ws3 = XLSX.utils.json_to_sheet(rcaSummaryData);
        XLSX.utils.book_append_sheet(wb, ws3, 'الأسباب الجذرية RCA');

        const dateStr = new Date().toISOString().slice(0, 10);
        const fileName = `سجل_${targetName || 'المخالفات'}_${dateStr}.xlsx`;
        XLSX.writeFile(wb, fileName);
        Notification.success('تم تصدير سجل المخالفات إلى Excel بنجاح (مع ملخص المقاولين والأسباب الجذرية RCA)');
        return true;
    },

    /**
     * تصدير المخالفات المفلترة المعروضة حالياً إلى Excel مباشرة
     */
    exportCurrentFilteredViolationsToExcel() {
        const violations = this.getFilteredViolations();
        if (!violations || violations.length === 0) {
            Notification.warning('لا توجد مخالفات مسجلة أو مطابقة للفلاتر الحالية لتصديرها');
            return;
        }

        const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'all';
        let scopeName = 'المخالفات_العام';
        if (activeTab === 'employees') scopeName = 'مخالفات_الموظفين';
        else if (activeTab === 'contractors') scopeName = 'مخالفات_المقاولين';

        this.exportAllViolationsToExcel_(violations, scopeName, 'السجلات الحالية المفلترة');
    },

};

// ===== Export module to global scope =====
// تصدير الموديول إلى window فوراً لضمان توافره
(function () {
    'use strict';
    try {
        if (typeof window !== 'undefined' && typeof Violations !== 'undefined') {
            window.Violations = Violations;

            // إشعار عند تحميل الموديول بنجاح
            if (typeof AppState !== 'undefined' && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ Violations module loaded and available on window.Violations');
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تصدير Violations:', error);
        // محاولة التصدير مرة أخرى حتى في حالة الخطأ
        if (typeof window !== 'undefined' && typeof Violations !== 'undefined') {
            try {
                window.Violations = Violations;
            } catch (e) {
                console.error('❌ فشل تصدير Violations:', e);
            }
        }
    }
})();

// استخدام الثوابت من contractors.js لتجنب التكرار
// CONTRACTOR_EVALUATION_DEFAULT_ITEMS موجود في contractors.js
// CONTRACTOR_APPROVAL_REQUIREMENTS_DEFAULT موجود في contractors.js
// جميع الثوابت المتعلقة بالمقاولين موجودة في contractors.js
